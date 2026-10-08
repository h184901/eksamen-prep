import { test, expect } from "@playwright/test";
const platformHeaders: Record<string, string> = process.env.VERCEL_QA_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_QA_BYPASS } : {};

// Run against a protected Vercel preview/production URL, never a local server.
// A dedicated admin-created QA account is required for authenticated tests.
test("username alone cannot create an account or log in", async ({ request }) => {
  const response = await request.post("/api/auth/login", { data: { username: "arbitrary-new-user" } });
  expect(response.status()).toBe(401);
  expect(response.headers()["set-cookie"]).toBeUndefined();
});

test("anonymous requests cannot enumerate people or read course content", async ({ request }) => {
  for (const path of ["/api/auth/users", "/api/admin/access", "/api/progress", "/api/chat"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(401);
  }
  const response = await request.get("/egb339", { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toContain("/login");
});

test("old username-only cookies and untrusted redirects are rejected", async ({ request }) => {
  const response = await request.get("/egb339", {
    headers: { Cookie: "eksamen-auth=old.payload" }, maxRedirects: 0,
  });
  expect(response.status()).toBe(307);
  const page = await request.get("/login?next=//evil.example");
  expect(await page.text()).not.toContain('value="//evil.example"');
});

test("native login works without client bundles and never lists usernames", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByLabel("Din sekssifrede kode")).toBeVisible();
  expect(await page.locator('script[src]').count()).toBe(0);
  await page.getByLabel("Din sekssifrede kode").fill("000000");
  await page.getByRole("button", { name: "Logg inn", exact: true }).click();
  await expect(page.getByRole("alert")).toBeVisible();
});

test("cross-origin credential submissions cannot create sessions", async ({ request }) => {
  const response = await request.post("/api/auth/login", {
    headers: { Origin: "https://evil.example" }, data: { code: "123456" },
  });
  expect(response.status()).toBe(403);
  expect(response.headers()["set-cookie"]).toBeUndefined();
});

test("anonymous client bundles and image assets are blocked", async ({ request }) => {
  for (const path of ["/_next/static/chunks/example.js", "/_next/image?url=%2Fegb339%2Fweek10%2Fcolour-channels.png&w=640&q=75", "/egb339/week10/colour-channels.png"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(401);
  }
});

test("RSC and segment-prefetch alternate paths cannot bypass authorization", async ({ request }) => {
  for (const path of ["/egb339.rsc", "/egb339.segments/_tree.segment.rsc", "/egb339?_rsc=security-qa"]) {
    const response = await request.get(path, { maxRedirects: 0, headers: { RSC: "1", "Next-Router-Prefetch": "1" } });
    expect([401, 307]).toContain(response.status());
    expect(await response.text()).not.toContain("PickAndPlaceRobot");
  }
});

// Opt in only on a staging deployment with a dedicated admin. These tests issue
// and revoke a disposable member; never point them at the owner's real account.
test("reissuing a member code invalidates old credentials and sessions", async ({ playwright, baseURL }) => {
  test.skip(!process.env.PRIVATE_ACCESS_QA_ADMIN_TOKEN || process.env.PRIVATE_ACCESS_QA_ALLOW_WRITES !== "staging", "Requires explicit staging write permission");
  const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { ...platformHeaders, Cookie: `eksamen-auth-v2=${process.env.PRIVATE_ACCESS_QA_ADMIN_TOKEN}` } });
  const member = await playwright.request.newContext({ baseURL, extraHTTPHeaders: platformHeaders });
  let userId: number | undefined;
  try {
    const username = `qa_${Date.now().toString(36)}`;
    const first = await admin.post("/api/admin/access", { data: { action: "issue", username } });
    expect(first.status()).toBe(200);
    const { code } = await first.json();
    const people = await admin.get("/api/admin/access");
    const { members } = await people.json();
    userId = members.find((account: { username: string }) => account.username === username)?.id;
    expect(userId).toBeDefined();
    const login = await member.post("/api/auth/login", { data: { code } });
    expect(login.status()).toBe(200);
    expect((await member.get("/api/auth/me")).status()).toBe(200);
    const progress = await member.post("/api/progress", { data: { pageKey: "private-access-qa", completed: true } });
    expect(progress.status()).toBe(200);
    expect((await member.get("/api/admin/access")).status()).toBe(403);
    expect((await member.post("/api/admin/access", { data: { action: "issue", username: "never-created" } })).status()).toBe(403);
    const second = await admin.post("/api/admin/access", { data: { action: "issue", username } });
    expect(second.status()).toBe(200);
    const replacement = (await second.json()).code;
    expect(replacement !== code).toBe(true);
    expect((await member.get("/api/auth/me")).status()).toBe(401);
    expect((await member.post("/api/auth/login", { data: { code } })).status()).toBe(401);
    expect((await member.post("/api/auth/login", { data: { code: replacement } })).status()).toBe(200);
    const retained = await member.get("/api/progress?prefix=private-access-qa");
    expect(retained.status()).toBe(200);
    expect((await retained.json()).rows).toEqual(expect.arrayContaining([expect.objectContaining({ page_key: "private-access-qa", completed_at: expect.any(String) })]));
    // Exercise an actually emitted bundle: a fabricated missing JS path is not
    // evidence that real course bundles are gated.
    const page = await member.get("/egb339");
    expect(page.status()).toBe(200);
    const html = await page.text();
    const bundle = html.match(/src="([^\"]*\/_next\/static\/[^\"]+\.js[^\"]*)"/)?.[1]?.replaceAll("&amp;", "&");
    expect(bundle).toBeDefined();
    expect((await member.get(bundle!)).status()).toBe(200);
    const imagePath = "/egb339/week10/colour-channels.png";
    expect((await member.get(imagePath)).status()).toBe(200);
    const anon = await playwright.request.newContext({ baseURL, extraHTTPHeaders: platformHeaders });
    try {
      expect((await anon.get(bundle!, { maxRedirects: 0 })).status()).toBe(401);
      expect((await anon.get(imagePath, { maxRedirects: 0 })).status()).toBe(401);
      const rsc = await anon.get("/egb339?_rsc=qa", { maxRedirects: 0, headers: { RSC: "1", "Next-Router-Prefetch": "1" } });
      expect(rsc.status()).toBe(307);
      expect(rsc.headers().location).toContain("/login");
      expect((await rsc.text())).not.toContain("PickAndPlaceRobot");
    } finally { await anon.dispose(); }
    const revoke = await admin.post("/api/admin/access", { data: { action: "revoke", userId } });
    expect(revoke.status()).toBe(200);
    expect((await member.get("/api/auth/me")).status()).toBe(401);
    expect((await member.get(imagePath, { maxRedirects: 0 })).status()).toBe(401);
    expect((await member.get(bundle!, { maxRedirects: 0 })).status()).toBe(401);
  } finally {
    if (userId !== undefined) await admin.post("/api/admin/access", { data: { action: "revoke", userId } });
    await member.dispose();
    await admin.dispose();
  }
});

test("strong admin credentials create an admin session", async ({ playwright, baseURL }) => {
  test.skip(!process.env.PRIVATE_ACCESS_QA_ADMIN_PASSWORD || process.env.PRIVATE_ACCESS_QA_ALLOW_WRITES !== "staging", "Requires dedicated staging admin credentials");
  const admin = await playwright.request.newContext({ baseURL, extraHTTPHeaders: platformHeaders });
  try {
    const response = await admin.post("/api/auth/admin-login", { data: { username: process.env.PRIVATE_ACCESS_QA_ADMIN_USERNAME || "erlend", password: process.env.PRIVATE_ACCESS_QA_ADMIN_PASSWORD } });
    expect(response.status()).toBe(200);
    const flags = response.headers()["set-cookie"] || "";
    // Boolean assertions avoid printing bearer credentials in failure reports.
    expect(/;\s*HttpOnly(?:;|$)/i.test(flags)).toBe(true);
    expect(/;\s*Secure(?:;|$)/i.test(flags)).toBe(true);
    expect(/;\s*SameSite=lax(?:;|$)/i.test(flags)).toBe(true);
    expect((await admin.get("/api/admin/access")).status()).toBe(200);
    expect((await (await admin.get("/api/auth/me")).json()).user.role).toBe("admin");
    const savedCookie = (await admin.storageState()).cookies.find(cookie => cookie.name === "eksamen-auth-v2")?.value;
    expect(savedCookie !== undefined).toBe(true);
    const logout = await admin.post("/api/auth/logout");
    expect(logout.status()).toBe(200);
    expect((await admin.get("/api/auth/me")).status()).toBe(401);
    // A copied old cookie is rejected by the DB, not merely removed locally.
    expect((await admin.get("/api/auth/me", { headers: { Cookie: `eksamen-auth-v2=${savedCookie}` } })).status()).toBe(401);
  } finally { await admin.post("/api/auth/logout"); await admin.dispose(); }
});

test("attempt throttling persists across independent request contexts", async ({ playwright, baseURL }) => {
  test.skip(process.env.PRIVATE_ACCESS_QA_ALLOW_WRITES !== "staging", "Consumes staging rate buckets; do not run on production");
  const first = await playwright.request.newContext({ baseURL, extraHTTPHeaders: platformHeaders });
  const second = await playwright.request.newContext({ baseURL, extraHTTPHeaders: platformHeaders });
  try {
    let limited = false;
    for (let attempt = 0; attempt < 6; attempt++) {
      const response = await first.post("/api/auth/login", { data: { code: "000000" } });
      expect([401, 429]).toContain(response.status());
      if (response.status() === 429) { limited = true; break; }
    }
    expect(limited).toBe(true);
    const response = await second.post("/api/auth/login", { data: { code: "000000" } });
    expect(response.status()).toBe(429);
    expect(response.headers()["retry-after"]).toBe("900");
  } finally { await first.dispose(); await second.dispose(); }
});

test("admin browser can load the protected manager and log out", async ({ page }) => {
  test.skip(!process.env.PRIVATE_ACCESS_QA_ADMIN_PASSWORD || process.env.PRIVATE_ACCESS_QA_ALLOW_WRITES !== "staging", "Requires explicit staging login permission");
  try {
  await page.goto("/admin/login");
  await page.getByLabel("Admin-brukernavn", { exact: true }).fill(process.env.PRIVATE_ACCESS_QA_ADMIN_USERNAME || "erlend");
  await page.getByLabel("Admin-passord", { exact: true }).fill(process.env.PRIVATE_ACCESS_QA_ADMIN_PASSWORD!);
  await page.getByRole("button", { name: "Logg inn", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Administrer tilgang", exact: true })).toBeVisible();
  await expect(page.getByLabel("Navn / eksisterende brukernavn", { exact: true })).toBeVisible();
  // A platform outage is not proof that our logout handler expired the cookie.
  await page.route("**/api/auth/logout", route => route.fulfill({ status: 503, contentType: "application/json", body: '{"error":"temporarily unavailable"}' }));
  await page.getByRole("button", { name: "Logg ut", exact: true }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Utlogging mislyktes" })).toBeVisible();
  await expect(page).toHaveURL(/\/admin$/);
  await page.unroute("**/api/auth/logout");
  await page.getByRole("button", { name: "Logg ut", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Administrator", exact: true })).toBeVisible();
  } finally {
    await page.unroute("**/api/auth/logout");
    await page.request.post("/api/auth/logout");
  }
});
