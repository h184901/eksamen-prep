import { handleLogin } from "@/lib/login-handler";
export const runtime = "nodejs";
export function POST(req: Request) { return handleLogin(req, true); }
