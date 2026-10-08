import { NextResponse } from "next/server";
import { createSession, sessionCookieOptions } from "@/lib/auth";
import { findCodeAccount, findAdminAccount, loginAllowed, safeNext, sameOrigin } from "@/lib/access";
export async function handleLogin(req: Request, admin = false) {
  const isForm = req.headers.get("content-type")?.includes("application/x-www-form-urlencoded");
  const respond = (status: number, next = "/", token?: string) => {
    const response = isForm
      ? NextResponse.redirect(new URL(token ? next : `${admin ? "/admin/login" : "/login"}?error=1`, req.url), 303)
      : NextResponse.json(token ? { ok: true, next } : { error: status === 429 ? "For mange forsøk. Vent 15 minutter." : "Innlogging mislyktes." }, { status });
    response.headers.set("Cache-Control", "private, no-store");
    if (token) response.cookies.set({ ...sessionCookieOptions(), value: token });
    if (status === 429) response.headers.set("Retry-After", "900");
    return response;
  };
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (Number(req.headers.get("content-length") || 0) > 4096) return respond(401);
  try {
    const body = isForm ? Object.fromEntries(await req.formData()) : await req.json();
    const username = typeof body.username === "string" ? body.username : "";
    const code = typeof body.code === "string" ? body.code.trim() : "";
    if (!await loginAllowed(req, admin ? username : code, admin)) return respond(429);
    const grant = admin ? await findAdminAccount(username, typeof body.password === "string" ? body.password : "") : await findCodeAccount(code);
    if (grant === null) return respond(401);
    return respond(200, safeNext(body.next || (admin ? "/admin" : "/")), await createSession(grant));
  } catch {
    // Never log credential bodies, database URLs or thrown SQL values.
    return respond(503);
  }
}
