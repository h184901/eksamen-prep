import { createHmac } from "node:crypto";
import { expect, test, type Page } from "@playwright/test";
import weeks from "../../src/data/egb339-vault/weeks.json";
import concepts from "../../src/data/egb339-vault/concepts.json";
import assessments from "../../src/data/egb339-vault/assessments.json";
import resources from "../../src/data/egb339-vault/resources.json";

const BASE = "http://127.0.0.1:3138";
let unexpectedProgressWrites: string[] = [];
const routes = [
  "/egb339", "/egb339/uker", "/egb339/studieplan", "/egb339/vurderinger",
  "/egb339/temaer", "/egb339/ressurser", "/egb339/oppsummering",
  ...weeks.weeks.map(entry => entry.route),
  ...assessments.assessments.map(entry => entry.route),
  ...concepts.concepts.map(entry => entry.route),
  ...resources.resources.map(entry => entry.route),
];

function signedSession() {
  const payload = Buffer.from(JSON.stringify({
    userId: -339, username: "qa", exp: Math.floor(Date.now() / 1000) + 3600,
  }));
  const signature = createHmac("sha256", process.env.EGB339_QA_SESSION_SECRET!)
    .update(payload).digest();
  return `${payload.toString("base64url")}.${signature.toString("base64url")}`;
}

async function open(page: Page, route: string, lang: "no" | "en" = "no") {
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  expect(response?.status(), route).toBe(200);
  await expect(page.locator("#egb-lesson h1"), route).toHaveCount(1);
  await expect(page.locator(`.egb-pilot-sidebar`), route).toBeVisible();
  await expect(page.locator('html'), route).toHaveAttribute("lang", lang === "en" ? "en" : "nb");
  await expect(page.locator('[aria-label="EGB339 språk / language"]:visible button[aria-pressed="true"]'), route)
    .toContainText(lang === "en" ? "EN" : "NO");
}

test.beforeEach(async ({ context }) => {
  unexpectedProgressWrites = [];
  await context.addCookies([{ name: "eksamen-auth", value: signedSession(), url: BASE }]);
  // The local QA server has no Postgres. Supply deterministic empty progress;
  // the real storage-failure response is tested by the existing pilot validator.
  await context.route("**/api/progress", route => {
    if (route.request().method() !== "GET") {
      unexpectedProgressWrites.push(route.request().method());
      return route.fulfill({ status: 405, body: "QA does not write progress" });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ rows: [] }) });
  });
});

test.afterEach(() => {
  expect(unexpectedProgressWrites, "Browser QA unexpectedly attempted to write progress").toEqual([]);
});

for (const lang of ["no", "en"] as const) {
  test(`all 69 EGB339 routes load at 390px in ${lang}`, async ({ page }) => {
    test.setTimeout(180000);
    await page.setViewportSize({ width: 390, height: 844 });
    if (lang === "en") await page.addInitScript(() => localStorage.setItem("egb339-lang", "en"));
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error" || message.type() === "warning") errors.push(message.text());
    });
    page.on("response", response => {
      if (response.status() >= 400 && !response.url().includes("/api/progress")) {
        errors.push(`${response.status()} ${response.url()}`);
      }
    });
    for (const route of routes) {
      await test.step(route, async () => {
        await open(page, route, lang);
        if (route.endsWith("assessment-2-1-simulation-and-oral-demonstration") && lang === "no") {
          await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
        }
        const geometry = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          width: document.documentElement.clientWidth,
          badImages: [...document.querySelectorAll<HTMLImageElement>("#egb-lesson img")]
            .filter(img => img.complete && Boolean(img.currentSrc) && !img.naturalWidth).map(img => img.src),
        }));
        expect(geometry.scroll, `${route} overflows at 390px`).toBeLessThanOrEqual(geometry.width + 1);
        expect(geometry.badImages, `${route} has broken loaded images`).toEqual([]);
        await expect(page.locator(".katex-error")).toHaveCount(0);
      });
    }
    expect(errors).toEqual([]);
  });
}

test("320px layout, keyboard sidebar, section navigation and previous/next", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const n of [1, 3, 4, 7, 8]) {
    await open(page, `/egb339/uker/uke-${n}`);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, `week ${n} overflows at 320px`).toBeLessThanOrEqual(clientWidth + 1);
  }
  const nav = page.getByRole("button", { name: "Kursnavigasjon" });
  await nav.click();
  await expect(nav).toHaveAttribute("aria-expanded", "true");
  const disclosure = page.locator("#egb-week-button-8");
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Space");
  await expect(disclosure).toHaveAttribute("aria-expanded", "true");
  await page.locator("#egb-week-panel-8 a").first().click();
  await expect(nav).toHaveAttribute("aria-expanded", "false");
  await page.locator('.egb-entry-card[data-direction="previous"]').click();
  await expect(page).toHaveURL(/\/egb339\/uker\/uke-7/);
  const menu = page.getByRole("button", { name: "Meny" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(`#${await menu.getAttribute("aria-controls")}`)).toBeVisible();
});

test("language persists, updates document language, and does not leak to another subject", async ({ page }) => {
  await open(page, "/egb339/uker/uke-4");
  await page.locator('[aria-label="EGB339 språk / language"]:visible').getByRole("button", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await open(page, "/egb339/vurderinger", "en");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/dat102", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("lang", "nb");
  await expect(page.locator("[data-tutor-trigger]")).toBeVisible();
});

test("math and Python solutions are typeset, highlighted and copyable", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page, "/egb339/uker/uke-4");
  const solution = page.locator("#solution-w4-prac-display-fk");
  await solution.getByRole("button", { name: /Vis løsning/ }).click();
  await expect(solution.locator(".egb-code-block")).toBeVisible();
  await expect(solution.locator(".egb-code-language")).toHaveText("python");
  expect(await solution.locator('[class*="egb-tok-"]').count()).toBeGreaterThan(3);
  await expect(page.locator(".katex-error")).toHaveCount(0);
  const source = await solution.locator(".egb-code-body").innerText();
  await solution.locator(".egb-code-copy").click();
  await expect(solution.locator(".egb-code-copy")).toContainText("Kopiert");
  expect((await page.evaluate(() => navigator.clipboard.readText())).trim()).toBe(source.trim());
});

test("assessment 2.1 keeps the source guide available without mixing English copy", async ({ page }) => {
  const route = "/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration";
  const guideDataRequests: string[] = [];
  page.on("request", request => {
    if (request.url().endsWith("/egb339/assessment-2-1/guide-data.json")) guideDataRequests.push(request.url());
  });
  await page.addInitScript(() => localStorage.setItem("egb339-lang", "en"));
  await open(page, route, "en");
  await expect(page.locator("#egb-lesson h1")).toContainText("from image point to key press");
  await expect(page.locator("#original-guide")).toContainText("Original Norwegian interactive guide");
  await expect(page.locator(".egb-guide-content")).toHaveCount(0);
  expect(guideDataRequests).toHaveLength(0);
  const button = page.getByRole("button", { name: "Open original guide" });
  await button.click();
  await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
  expect(guideDataRequests).toHaveLength(1);
  await expect(page.locator('#egb-guide-original')).toHaveAttribute("lang", "nb");
  await expect(page.locator('#oppgavekrav')).toContainText("Requirements and submission");
  const docx = await page.request.get("/egb339/assessment-2-1/oral-presentation-guide.docx");
  expect(docx.status()).toBe(200);
  expect((await docx.body()).subarray(0, 2).toString()).toBe("PK");
  const guideAssets = await page.locator('#egb-guide-original img[src^="/egb339/"]').evaluateAll(images =>
    images.map(image => image.getAttribute("src")!),
  );
  for (const src of guideAssets) {
    const asset = await page.request.get(src);
    expect(asset.status(), src).toBe(200);
    expect(asset.headers()["content-type"], src).toMatch(/^image\//);
  }
  await page.goto(route + "#interactive", { waitUntil: "domcontentloaded" });
  await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator("#interactive")).toBeAttached();
  await page.goto(route + "#overview", { waitUntil: "domcontentloaded" });
  await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator("#overview")).toBeAttached();
  await page.locator('[aria-label="EGB339 språk / language"]:visible').getByRole("button", { name: "Norsk" }).click();
  await page.goto(route + "#interactive", { waitUntil: "domcontentloaded" });
  await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
  await page.locator('[aria-label="EGB339 språk / language"]:visible').getByRole("button", { name: "English" }).click();
  await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
});

test("original guide retries its data fetch after failure", async ({ page }) => {
  let fail = true;
  await page.route("**/egb339/assessment-2-1/guide-data.json", route => {
    if (fail) return route.abort();
    return route.continue();
  });
  await open(page, "/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration");
  await expect(page.locator(".egb-guide-load-error")).toBeVisible();
  fail = false;
  await page.getByRole("button", { name: "Prøv igjen" }).click();
  await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
});

test("shared header works on other subjects and tutor remains scoped", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of ["/dat102", "/dat110", "/dat109", "/ing164"]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, `${route}: shared header introduced overflow`).toBeLessThanOrEqual(clientWidth + 1);
    await expect(page.locator("[data-tutor-trigger]")).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Logg ut" })).toBeVisible();
});

test("light and dark themes preserve controls and contrast on mobile and desktop", async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await open(page, "/egb339/uker/uke-4");
    const theme = page.getByRole("button", { name: /Bytt til (lyst|mørkt) tema/ }).filter({ visible: true });
    const initial = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    await theme.click();
    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(!initial);
    const contrast = await page.evaluate(() => {
      const rgb = (value: string) => value.match(/[\d.]+/g)!.slice(0, 3).map(Number);
      const luminance = (value: string) => rgb(value).map(channel => {
        const fraction = channel / 255;
        return fraction <= 0.04045 ? fraction / 12.92 : ((fraction + 0.055) / 1.055) ** 2.4;
      }).reduce((value, channel, index) => value + channel * [0.2126, 0.7152, 0.0722][index], 0);
      const background = luminance(getComputedStyle(document.body).backgroundColor);
      const ratio = (element: Element) => {
        const foreground = luminance(getComputedStyle(element).color);
        return (Math.max(background, foreground) + 0.05) / (Math.min(background, foreground) + 0.05);
      };
      return {
        heading: ratio(document.querySelector("#egb-lesson h1")!),
        sidebar: ratio(document.querySelector(".egb-week-sidebar-progress")!),
      };
    });
    expect(contrast.heading).toBeGreaterThanOrEqual(4.5);
    expect(contrast.sidebar).toBeGreaterThanOrEqual(4.5);
    await page.reload();
    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(!initial);
    await expect(page.locator(".katex-error")).toHaveCount(0);
    await expect(page.locator("#egb-week-button-4")).toBeAttached();
  }
});

test("header and content fit phone, tablet and desktop widths", async ({ page }) => {
  test.setTimeout(90000);
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ["/egb339", "/egb339/uker/uke-3", "/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration"]) {
      await open(page, route);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  }
});

test("visible EGB339 internal routes, fragments and study assets resolve", async ({ page }) => {
  test.setTimeout(360000);
  const seen = new Set<string>();
  const crossPageFragments = new Set<string>();
  for (const route of routes) {
    await open(page, route);
    if (route.endsWith("assessment-2-1-simulation-and-oral-demonstration")) {
      await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
    }
    const links = await page.locator('#egb-lesson a[href^="/egb339"], #egb-lesson a[href^="#"]').evaluateAll(anchors =>
      anchors.map(anchor => anchor.getAttribute("href")!),
    );
    for (const href of links) {
      const target = new URL(href, BASE + route);
      if (target.pathname === route && target.hash) {
        await expect(page.locator(`[id=${JSON.stringify(decodeURIComponent(target.hash.slice(1)))}]`), `${route} → ${href}`).toHaveCount(1);
      } else if (target.pathname.startsWith("/egb339")) {
        seen.add(target.pathname);
        if (target.hash && routes.includes(target.pathname)) {
          crossPageFragments.add(target.pathname + target.hash);
        }
      }
    }
  }
  for (const target of seen) {
    const response = await page.request.get(target);
    expect(response.status(), target).toBe(200);
  }
  const fragmentsByPath = new Map<string, Set<string>>();
  for (const target of crossPageFragments) {
    const { pathname, hash } = new URL(target, BASE);
    fragmentsByPath.set(pathname, new Set([...(fragmentsByPath.get(pathname) ?? []), decodeURIComponent(hash.slice(1))]));
  }
  for (const [pathname, fragments] of fragmentsByPath) {
    await open(page, pathname);
    if (pathname.endsWith("assessment-2-1-simulation-and-oral-demonstration")) {
      await expect(page.locator('.egb-guide-content[data-ready="true"]')).toBeVisible({ timeout: 20000 });
    }
    for (const id of fragments) {
      await expect(page.locator(`[id=${JSON.stringify(id)}]`), `${pathname}#${id}`).toHaveCount(1);
    }
  }
  expect(seen.size).toBeGreaterThan(65);
});
