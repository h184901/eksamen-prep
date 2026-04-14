"use client";

import Link from "next/link";

export default function CN4_2Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.2 IPv4: datagram, adressering og CIDR</span>
      </div>

      <h1 className="text-2xl font-bold">4.2 IPv4: datagram, adressering og CIDR</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Gjennomgang av IPv4-datagrammets header-felt, fragmentering, subnetting og longest-prefix match.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om IPv4 header-felt, fragmentering, subnetting og longest-prefix match.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/4-1" className="hover:text-[var(--accent)] text-sm">
          ← 4.1 Oversikt over nettverkslaget
        </Link>
        <Link href="/dat110/cn-4/teori/4-3" className="hover:text-[var(--accent)] text-sm">
          4.3 NAT →
        </Link>
      </div>
    </div>
  );
}
