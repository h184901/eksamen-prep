import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { issueCode, revokeAccess, sameOrigin } from "@/lib/access";
import { sql } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
async function authorize() {
  const session = await getSession();
  return !session ? json({ error: "Unauthenticated" }, 401) : session.role !== "admin" ? json({ error: "Forbidden" }, 403) : null;
}
export async function GET() {
  const denied = await authorize();
  if (denied) return denied;
  const { rows } = await sql`SELECT u.id, u.username, a.active FROM access_accounts a JOIN users u ON u.id = a.user_id WHERE a.role = 'member' ORDER BY u.username`;
  return json({ members: rows });
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  const denied = await authorize();
  if (denied) return denied;
  try {
    const body = await req.json();
    if (body.action === "issue" && typeof body.username === "string") return json(await issueCode(body.username));
    if (body.action === "revoke" && Number.isSafeInteger(body.userId) && body.userId > 0) {
      await revokeAccess(body.userId); return json({ ok: true });
    }
    return json({ error: "Ugyldig forespørsel." }, 400);
  } catch { return json({ error: "Kunne ikke endre tilgang. Bruk 2–32 tegn i navnet: bokstaver, tall, - eller _." }, 400); }
}
