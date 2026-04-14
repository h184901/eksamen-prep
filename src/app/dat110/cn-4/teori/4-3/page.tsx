"use client";

import Link from "next/link";

export default function CN4_3Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.3 NAT</span>
      </div>

      <h1 className="text-2xl font-bold">4.3 NAT</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Network Address Translation: oversettingstabell og port-mapping for å dele én offentlig IP-adresse mellom mange enheter.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om NAT-oversettingstabell og port-mapping.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/4-2" className="hover:text-[var(--accent)] text-sm">
          ← 4.2 IPv4: datagram, adressering og CIDR
        </Link>
        <Link href="/dat110/cn-4/teori/4-5" className="hover:text-[var(--accent)] text-sm">
          4.5 Rutealgoritmer →
        </Link>
      </div>
    </div>
  );
}
