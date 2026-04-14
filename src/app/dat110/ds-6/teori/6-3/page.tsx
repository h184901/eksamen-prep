"use client";

import Link from "next/link";

export default function DS6_3Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.3 DHT og Chord</span>
      </div>

      <h1 className="text-2xl font-bold">6.3 DHT og Chord</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Distribuerte hashtabeller og Chord-protokollen: ring-topologi, fingertabeller og nøkkelansvar.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om DHT, Chord-ringen og fingertabeller.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          ← 6.2 Strukturert navngiving
        </Link>
        <Link href="/dat110/ds-6/teori/6-4" className="hover:text-[var(--accent)] text-sm">
          6.4 Attributtbasert navngiving →
        </Link>
      </div>
    </div>
  );
}
