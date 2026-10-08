import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { sql } from "@/lib/db";

// A new name + opaque tokens invalidate ALL former username-only cookies.
export const SESSION_COOKIE = "eksamen-auth-v2";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
export interface Session { userId: number; username: string; role: "member" | "admin"; }
// Capture the generation that was actually authenticated. Never upgrade a
// credential checked before revocation/reissue to the account's new generation.
export interface CredentialGrant { userId: number; generation: number; }
export function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
export async function createSession(grant: CredentialGrant): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const { rowCount } = await sql`
    INSERT INTO auth_sessions (token_hash, user_id, generation, expires_at)
    SELECT ${tokenHash(token)}, user_id, generation, now() + interval '30 days'
    FROM access_accounts WHERE user_id = ${grant.userId} AND active = true
      AND generation = ${grant.generation}
  `;
  if (rowCount !== 1) throw new Error("Access is not active");
  return token;
}
export async function verifySession(token: string): Promise<Session | null> {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const { rows } = await sql<Session>`
    SELECT u.id AS "userId", u.username, a.role
    FROM auth_sessions s JOIN access_accounts a ON a.user_id = s.user_id
    JOIN users u ON u.id = a.user_id
    WHERE s.token_hash = ${tokenHash(token)} AND s.expires_at > now()
      AND a.active = true AND a.generation = s.generation LIMIT 1
  `;
  return rows[0] ?? null;
}
export function sessionCookieOptions() {
  return { name: SESSION_COOKIE, httpOnly: true, sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_MAX_AGE };
}
export async function getSessionFromRequest(req: NextRequest): Promise<Session | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return token ? verifySession(token) : null;
}
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? verifySession(token) : null;
}
export async function revokeSession(token: string): Promise<void> {
  if (/^[a-f0-9]{64}$/.test(token)) await sql`DELETE FROM auth_sessions WHERE token_hash = ${tokenHash(token)}`;
}
export const AKSEPTERT_ALLOWED_USERNAME = "erlend";
export function isAkseptertUser(session: Session | null): boolean {
  return session?.role === "admin" && session.username === AKSEPTERT_ALLOWED_USERNAME;
}
