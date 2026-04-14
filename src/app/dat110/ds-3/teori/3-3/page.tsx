"use client";

import Link from "next/link";

export default function DS3_3Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-3/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">3.3 Klient-design</span>
      </div>

      <h1 className="text-2xl font-bold">3.3 Klient-design</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Klient-arkitektur: thin client versus fat client og avveininger mellom lokal prosessering og server-avhengighet.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om thin vs fat client-design.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-3/teori/3-2" className="hover:text-[var(--accent)] text-sm">
          ← 3.2 Virtualisering
        </Link>
        <Link href="/dat110/ds-3/teori/3-4" className="hover:text-[var(--accent)] text-sm">
          3.4 Server-design →
        </Link>
      </div>
    </div>
  );
}
