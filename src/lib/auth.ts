import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "eksamen-auth";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 180;

export interface Session {
  userId: number;
  username: string;
  exp: number;
}

function getSecret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "SESSION_SECRET mangler eller er for kort (minst 32 tegn). Generer med `openssl rand -hex 32` og legg i .env.local + Vercel env.",
    );
  }
  return new TextEncoder().encode(s);
}

function toBase64Url(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const s = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

async function hmac(data: Uint8Array): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    getSecret() as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, data as BufferSource);
  return new Uint8Array(sig);
}

export async function signSession(session: Session): Promise<string> {
  const payload = JSON.stringify(session);
  const payloadBytes = new TextEncoder().encode(payload);
  const sig = await hmac(payloadBytes);
  return `${toBase64Url(payloadBytes)}.${toBase64Url(sig)}`;
}

export async function verifySession(token: string): Promise<Session | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  try {
    const payloadBytes = fromBase64Url(parts[0]);
    const sig = fromBase64Url(parts[1]);
    const expected = await hmac(payloadBytes);
    if (expected.length !== sig.length) return null;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ sig[i];
    if (diff !== 0) return null;
    const raw = JSON.parse(new TextDecoder().decode(payloadBytes)) as unknown;
    if (
      !raw ||
      typeof raw !== "object" ||
      typeof (raw as Session).userId !== "number" ||
      typeof (raw as Session).username !== "string" ||
      typeof (raw as Session).exp !== "number"
    ) {
      return null;
    }
    const session = raw as Session;
    if (Date.now() / 1000 > session.exp) return null;
    return session;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function getSessionFromRequest(
  req: NextRequest,
): Promise<Session | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

// Usernames are normalized to lowercase in src/lib/progress.ts, so the stored
// form is always "erlend". A literal "Erlend" would never match a real session.
export const AKSEPTERT_ALLOWED_USERNAME = "erlend";

export function isAkseptertUser(session: Session | null): boolean {
  return session?.username === AKSEPTERT_ALLOWED_USERNAME;
}
