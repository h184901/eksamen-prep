"use client";

import Link from "next/link";

export default function CN6_3Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.3 Multiple-access-protokoller</span>
      </div>

      <h1 className="text-2xl font-bold">6.3 Multiple-access-protokoller</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Protokoller for delt medium: ALOHA (slotted og pure), CSMA og CSMA/CD brukt i Ethernet.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om ALOHA og CSMA/CD multiple-access-protokoller.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          ← 6.2 Feildeteksjon og korreksjon
        </Link>
        <Link href="/dat110/cn-6/teori/6-4" className="hover:text-[var(--accent)] text-sm">
          6.4 Ethernet, MAC, ARP og switch →
        </Link>
      </div>
    </div>
  );
}
