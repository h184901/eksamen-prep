"use client";

import Link from "next/link";

export default function DS7_5Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-7/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">7.5 Konsistensprotokoller</span>
      </div>

      <h1 className="text-2xl font-bold">7.5 Konsistensprotokoller</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Protokoller for å håndheve konsistens: primary-based replikering og quorum-basert tilnærming (NR + NW &gt; N).
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om primary-based replikering og quorum-protokoller.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-7/teori/7-3" className="hover:text-[var(--accent)] text-sm">
          ← 7.3 Klient-sentrerte konsistensmodeller
        </Link>
        <div />
      </div>
    </div>
  );
}
