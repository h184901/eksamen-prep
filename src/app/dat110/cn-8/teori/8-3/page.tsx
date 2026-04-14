"use client";

import Link from "next/link";

export default function CN8_3Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.3 Offentlig-nøkkel kryptering</span>
      </div>

      <h1 className="text-2xl font-bold">8.3 Offentlig-nøkkel kryptering</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Asymmetrisk kryptering med offentlig og privat nøkkel: RSA-algoritmen og hvordan den løser nøkkelfordelingsproblemet.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om offentlig-nøkkel kryptering og RSA.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-2" className="hover:text-[var(--accent)] text-sm">
          ← 8.2 Symmetrisk kryptering
        </Link>
        <Link href="/dat110/cn-8/teori/8-4" className="hover:text-[var(--accent)] text-sm">
          8.4 Autentisering →
        </Link>
      </div>
    </div>
  );
}
