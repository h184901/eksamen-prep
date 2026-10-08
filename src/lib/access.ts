import { createHmac, randomInt, scryptSync, timingSafeEqual } from "node:crypto";
import { sql } from "@/lib/db";
import { normalizeUsername } from "@/lib/progress";
import type { CredentialGrant } from "@/lib/auth";

function pepper(): string {
  const value = process.env.ACCESS_CODE_PEPPER || process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("Access secret is missing");
  return value;
}
export function privateDigest(value: string): string {
  return createHmac("sha256", pepper()).update(value).digest("hex");
}
export function safeNext(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || /[\\\r\n]/.test(value)) return "/";
  try {
    const u = new URL(value, "https://local.invalid");
    if (u.origin !== "https://local.invalid" || u.pathname === "/login" || u.pathname === "/admin/login") return "/";
    return u.pathname + u.search;
  } catch { return "/"; }
}
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (req.headers.get("sec-fetch-site") === "cross-site") return false;
  return !origin || origin === new URL(req.url).origin;
}
export async function consumeAttempt(bucket: string, maximum: number): Promise<boolean> {
  const { rows } = await sql<{ attempts: number }>`
    INSERT INTO auth_rate_buckets (bucket_hash, attempts, expires_at)
    VALUES (${privateDigest("rate:" + bucket)}, 1, now() + interval '15 minutes')
    ON CONFLICT (bucket_hash) DO UPDATE SET
      attempts = CASE WHEN auth_rate_buckets.expires_at <= now() THEN 1 ELSE auth_rate_buckets.attempts + 1 END,
      expires_at = CASE WHEN auth_rate_buckets.expires_at <= now() THEN now() + interval '15 minutes' ELSE auth_rate_buckets.expires_at END
    RETURNING attempts
  `;
  return rows[0].attempts <= maximum;
}
export async function loginAllowed(req: Request, credential: string, admin = false): Promise<boolean> {
  const ip = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipAllowed = await consumeAttempt(`${admin ? "admin" : "member"}:ip:${ip}`, 5);
  if (!ipAllowed) return false;
  const globalAllowed = await consumeAttempt(`${admin ? "admin" : "member"}:global`, admin ? 10 : 40);
  if (!globalAllowed) return false;
  return consumeAttempt(`${admin ? "admin" : "member"}:credential:${credential.slice(0, 128)}`, 5);
}
export async function findCodeAccount(code: string): Promise<CredentialGrant | null> {
  if (!/^\d{6}$/.test(code) || code === "000000") return null;
  const { rows } = await sql<CredentialGrant>`
    SELECT user_id AS "userId", generation FROM access_accounts
    WHERE code_hash = ${privateDigest("code:" + code)} AND role = 'member' AND active = true LIMIT 1
  `;
  return rows[0] ?? null;
}
export async function findAdminAccount(username: string, password: string): Promise<CredentialGrant | null> {
  const expectedName = process.env.ADMIN_USERNAME || "erlend";
  const [scheme, salt, hash] = (process.env.ADMIN_PASSWORD_HASH || "").split(":");
  if (scheme !== "scrypt" || !/^[a-f0-9]{32}$/.test(salt || "") || !/^[a-f0-9]{128}$/.test(hash || "")) throw new Error("Admin credentials missing");
  if (password.length > 256) return null;
  const correct = timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(hash, "hex"));
  if (!correct || username.trim().toLowerCase() !== expectedName) return null;
  const { rows } = await sql<CredentialGrant>`
    SELECT a.user_id AS "userId", a.generation FROM access_accounts a JOIN users u ON u.id = a.user_id
    WHERE u.username = ${expectedName} AND a.role = 'admin' AND a.active = true LIMIT 1
  `;
  return rows[0] ?? null;
}
export async function issueCode(rawName: string): Promise<{ username: string; code: string }> {
  const username = normalizeUsername(rawName);
  if (!username || username === (process.env.ADMIN_USERNAME || "erlend")) throw new Error("Invalid member name");
  // No expiry. Keep every issued digest, even after replacement/revocation.
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = randomInt(1, 1_000_000).toString().padStart(6, "0");
    try {
      const result = await sql`
        WITH reservation AS (
          INSERT INTO issued_access_codes (code_hash)
          VALUES (${privateDigest("code:" + code)})
          ON CONFLICT (code_hash) DO NOTHING RETURNING code_hash
        ), person AS (
          INSERT INTO users (username) SELECT ${username} FROM reservation
          ON CONFLICT (username) DO UPDATE SET username = EXCLUDED.username RETURNING id
        )
        INSERT INTO access_accounts (user_id, role, code_hash, active)
        SELECT person.id, 'member', reservation.code_hash, true FROM person CROSS JOIN reservation
        ON CONFLICT (user_id) DO UPDATE SET code_hash = EXCLUDED.code_hash,
          active = true, generation = access_accounts.generation + 1
        WHERE access_accounts.role = 'member'
          AND access_accounts.code_hash IS DISTINCT FROM EXCLUDED.code_hash
      `;
      // Zero rows means an admin (never modified) or any previously used code.
      // The reservation and account change are one atomic SQL statement.
      if (result.rowCount !== 1) continue;
      return { username, code };
    } catch (error) {
      if ((error as { code?: string }).code !== "23505") throw error;
    }
  }
  throw new Error("Could not generate a unique code");
}
export async function revokeAccess(userId: number): Promise<void> {
  await sql`UPDATE access_accounts SET active = false, generation = generation + 1 WHERE user_id = ${userId} AND role = 'member'`;
}
