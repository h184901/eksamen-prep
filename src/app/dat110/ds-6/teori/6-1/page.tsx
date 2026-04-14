"use client";

import Link from "next/link";

export default function DS6_1Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.1 Flat navngiving</span>
      </div>

      <h1 className="text-2xl font-bold">6.1 Flat navngiving</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Navngiving uten struktur: broadcasting, forwarding pointers og DHT som løsninger på oppslagsproblemet.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om flat navngiving, broadcasting og forwarding pointers.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          6.2 Strukturert navngiving →
        </Link>
      </div>
    </div>
  );
}
