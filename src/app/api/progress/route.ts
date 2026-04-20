import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserProgress, setPageProgress } from "@/lib/progress";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  }
  const url = new URL(req.url);
  const prefix = url.searchParams.get("prefix") ?? undefined;
  try {
    const rows = await getUserProgress(session.userId, prefix);
    return NextResponse.json({ rows });
  } catch (err) {
    console.error("getUserProgress failed", err);
    return NextResponse.json({ rows: [] }, { status: 200 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  }
  let body: { pageKey?: unknown; completed?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    // body stays empty
  }
  const pageKey =
    typeof body?.pageKey === "string" ? body.pageKey.trim() : "";
  const completed = Boolean(body?.completed);
  if (!pageKey || pageKey.length > 255) {
    return NextResponse.json({ error: "invalid pageKey" }, { status: 400 });
  }
  try {
    await setPageProgress(session.userId, pageKey, completed);
    return NextResponse.json({ ok: true, pageKey, completed });
  } catch (err) {
    console.error("setPageProgress failed", err);
    return NextResponse.json(
      { error: "Kunne ikke lagre fremgang." },
      { status: 500 },
    );
  }
}
