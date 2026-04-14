"use client";

import Link from "next/link";

export default function CN6_2Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.2 Feildeteksjon og korreksjon</span>
      </div>

      <h1 className="text-2xl font-bold">6.2 Feildeteksjon og korreksjon</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Teknikker for å oppdage og korrigere feil i overføringen: paritetsbits og syklisk redundanskontroll (CRC).
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om paritetsbits og CRC for feildeteksjon.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-1" className="hover:text-[var(--accent)] text-sm">
          ← 6.1 Introduksjon til linklaget
        </Link>
        <Link href="/dat110/cn-6/teori/6-3" className="hover:text-[var(--accent)] text-sm">
          6.3 Multiple-access-protokoller →
        </Link>
      </div>
    </div>
  );
}
