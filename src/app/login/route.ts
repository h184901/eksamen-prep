import { loginHtml } from "@/lib/login-html";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(req: Request) { return loginHtml(new URL(req.url)); }
