"use client";

import Link from "next/link";

export default function DS8_5Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.5 Distribuert commit</span>
      </div>

      <h1 className="text-2xl font-bold">8.5 Distribuert commit</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Protokoller for distribuert commit: Two-Phase Commit (2PC) og Three-Phase Commit (3PC) for atomisk transaksjonsavslutning.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om 2PC og 3PC for distribuert commit.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-8/teori/8-4" className="hover:text-[var(--accent)] text-sm">
          ← 8.4 Feilgjenoppretting
        </Link>
        <div />
      </div>
    </div>
  );
}
