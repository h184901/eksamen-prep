import { NextResponse } from "next/server";
import { listUsernames } from "@/lib/progress";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const usernames = await listUsernames();
    return NextResponse.json({ usernames });
  } catch (err) {
    console.error("listUsernames failed", err);
    return NextResponse.json({ usernames: [] });
  }
}
