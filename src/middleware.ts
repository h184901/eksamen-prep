import { NextResponse, type NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (["/login", "/admin/login", "/api/auth/login", "/api/auth/admin-login", "/api/auth/logout"].includes(path)) return NextResponse.next();
  // No course content lives in CSS/fonts. JS, JSON, images and source maps are gated.
  if (path.startsWith("/_next/static/") && /\.(css|woff2?|ttf|otf)$/.test(path)) return NextResponse.next();
  let session;
  try { session = await getSessionFromRequest(req); }
  catch { return NextResponse.json({ error: "Access temporarily unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
  if (!session) {
    if (path.startsWith("/api/") || path.startsWith("/_next/") || /\.[a-z0-9]+$/i.test(path)) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
    }
    const url = new URL(path.startsWith("/admin") ? "/admin/login" : "/login", req.url);
    url.searchParams.set("next", path + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
  if ((path.startsWith("/admin") || path.startsWith("/api/admin/")) && session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
export const config = { matcher: ["/:path*"], runtime: "nodejs" };
