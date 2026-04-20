import { NextResponse } from "next/server";
import { listUsernames } from "@/lib/progress";

export const runtime = "nodejs";

export async function GET() {
  try {
    const usernames = await listUsernames();
    return NextResponse.json({ usernames });
  } catch (err) {
    console.error("listUsernames failed", err);
    return NextResponse.json({ usernames: [] });
  }
}
