import { NextResponse } from "next/server";
import { signSession, sessionCookieOptions, SESSION_MAX_AGE } from "@/lib/auth";
import { normalizeUsername, upsertUser } from "@/lib/progress";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { username?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    // body stays empty — treated as invalid below
  }
  const rawUsername = typeof body?.username === "string" ? body.username : "";
  const username = normalizeUsername(rawUsername);
  if (!username) {
    return NextResponse.json(
      {
        error:
          "Ugyldig brukernavn. Bruk 2–32 tegn: små bokstaver, tall, - eller _.",
      },
      { status: 400 },
    );
  }

  try {
    const user = await upsertUser(username);
    const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
    const token = await signSession({
      userId: user.id,
      username: user.username,
      exp,
    });
    const res = NextResponse.json({
      ok: true,
      user: { username: user.username },
    });
    res.cookies.set({ ...sessionCookieOptions(), value: token });
    return res;
  } catch (err) {
    console.error("login failed", err);
    return NextResponse.json(
      { error: "Kunne ikke logge inn. Prøv igjen senere." },
      { status: 500 },
    );
  }
}
