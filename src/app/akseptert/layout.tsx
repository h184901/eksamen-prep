import { notFound } from "next/navigation";
import { getSession, isAkseptertUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AkseptertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!isAkseptertUser(session)) {
    notFound();
  }
  return <>{children}</>;
}
