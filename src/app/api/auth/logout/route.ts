import { NextResponse } from "next/server";
import { SESSION_COOKIE, revokeSession, sessionCookieOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { sameOrigin } from "@/lib/access";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  let revoked = true;
  try { if (token) await revokeSession(token); }
  catch { revoked = false; }
  const res = NextResponse.json(revoked ? { ok: true } : { error: "Server session revocation failed; browser session cleared.", browserSessionCleared: true }, { status: revoked ? 200 : 503 });
  res.headers.set("Cache-Control", "private, no-store");
  // Clear the local credential even during a database outage, but report that
  // server revocation was not confirmed instead of claiming a successful logout.
  res.cookies.set({
    ...sessionCookieOptions(),
    name: SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}
