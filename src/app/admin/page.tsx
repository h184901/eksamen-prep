import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import AccessManager from "./AccessManager";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") notFound();
  return <section className="mx-auto max-w-2xl space-y-6"><header><h1 className="text-3xl font-bold">Administrer tilgang</h1><p className="mt-2 text-[var(--muted)]">Én personlig sekssifret kode per person, uten utløpsdato. Bare du kan opprette eller sperre tilgang.</p></header><AccessManager /></section>;
}
