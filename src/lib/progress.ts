import { sql } from "@/lib/db";

const USERNAME_RE = /^[a-z0-9](?:[a-z0-9_-]{0,30}[a-z0-9])?$/;

export function normalizeUsername(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length < 2 || trimmed.length > 32) return null;
  if (!USERNAME_RE.test(trimmed)) return null;
  return trimmed;
}

export interface DbUser {
  id: number;
  username: string;
}

export async function findUser(username: string): Promise<DbUser | null> {
  const { rows } = await sql<DbUser>`
    SELECT id, username FROM users WHERE username = ${username} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function upsertUser(username: string): Promise<DbUser> {
  const { rows } = await sql<DbUser>`
    INSERT INTO users (username)
    VALUES (${username})
    ON CONFLICT (username) DO UPDATE SET username = EXCLUDED.username
    RETURNING id, username
  `;
  return rows[0];
}

export async function listUsernames(): Promise<string[]> {
  const { rows } = await sql<{ username: string }>`
    SELECT username FROM users ORDER BY username ASC
  `;
  return rows.map((r: { username: string }) => r.username);
}

export interface ProgressRow {
  page_key: string;
  completed_at: string;
}

export async function getUserProgress(
  userId: number,
  prefix?: string,
): Promise<ProgressRow[]> {
  if (prefix && prefix.length > 0) {
    const like = `${prefix}%`;
    const { rows } = await sql<ProgressRow>`
      SELECT page_key, completed_at FROM page_progress
      WHERE user_id = ${userId} AND page_key LIKE ${like}
    `;
    return rows;
  }
  const { rows } = await sql<ProgressRow>`
    SELECT page_key, completed_at FROM page_progress WHERE user_id = ${userId}
  `;
  return rows;
}

export async function setPageProgress(
  userId: number,
  pageKey: string,
  completed: boolean,
): Promise<void> {
  if (completed) {
    await sql`
      INSERT INTO page_progress (user_id, page_key)
      VALUES (${userId}, ${pageKey})
      ON CONFLICT (user_id, page_key) DO NOTHING
    `;
  } else {
    await sql`
      DELETE FROM page_progress
      WHERE user_id = ${userId} AND page_key = ${pageKey}
    `;
  }
}

export async function bulkInsertProgress(
  userId: number,
  pageKeys: string[],
): Promise<number> {
  const unique = Array.from(new Set(pageKeys)).filter(
    (k) => typeof k === "string" && k.length > 0 && k.length <= 255,
  );
  if (unique.length === 0) return 0;
  let count = 0;
  for (const key of unique) {
    const res = await sql`
      INSERT INTO page_progress (user_id, page_key)
      VALUES (${userId}, ${key})
      ON CONFLICT (user_id, page_key) DO NOTHING
    `;
    count += res.rowCount ?? 0;
  }
  return count;
}
