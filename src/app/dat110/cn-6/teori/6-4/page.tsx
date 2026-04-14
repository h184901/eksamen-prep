"use client";

import Link from "next/link";

export default function CN6_4Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.4 Ethernet, MAC, ARP og switch</span>
      </div>

      <h1 className="text-2xl font-bold">6.4 Ethernet, MAC, ARP og switch</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Ethernet-rammeformatet, MAC-adressering, ARP-protokollen og how switches lærer seg topologien (self-learning).
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om Ethernet-rammeformat, ARP og self-learning switches.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-3" className="hover:text-[var(--accent)] text-sm">
          ← 6.3 Multiple-access-protokoller
        </Link>
        <Link href="/dat110/cn-6/teori/6-6" className="hover:text-[var(--accent)] text-sm">
          6.6 Data-senter nettverk →
        </Link>
      </div>
    </div>
  );
}
