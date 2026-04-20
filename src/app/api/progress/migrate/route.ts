import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { bulkInsertProgress } from "@/lib/progress";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  }
  let body: { pageKeys?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    // body stays empty
  }
  const pageKeys = Array.isArray(body?.pageKeys)
    ? (body.pageKeys.filter(
        (k): k is string => typeof k === "string",
      ) as string[])
    : [];
  try {
    const inserted = await bulkInsertProgress(session.userId, pageKeys);
    return NextResponse.json({ ok: true, inserted });
  } catch (err) {
    console.error("bulkInsertProgress failed", err);
    return NextResponse.json(
      { error: "Kunne ikke migrere fremgang." },
      { status: 500 },
    );
  }
}
