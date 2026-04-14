"use client";

import Link from "next/link";

export default function DS7_1Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-7/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">7.1 Introduksjon til replikering</span>
      </div>

      <h1 className="text-2xl font-bold">7.1 Introduksjon til replikering</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Motivasjon for replikering: ytelse, feiltoleranse og konsistens — og spenningen mellom dem.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om replikeringens rolle for ytelse, feiltoleranse og konsistens.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-7/teori/7-2" className="hover:text-[var(--accent)] text-sm">
          7.2 Data-sentrerte konsistensmodeller →
        </Link>
      </div>
    </div>
  );
}
