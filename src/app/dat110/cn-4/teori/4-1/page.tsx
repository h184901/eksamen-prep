"use client";

import Link from "next/link";

export default function CN4_1Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.1 Oversikt over nettverkslaget</span>
      </div>

      <h1 className="text-2xl font-bold">4.1 Oversikt over nettverkslaget</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Introduksjon til nettverkslagets rolle: forskjellen mellom dataplan og kontrollplan, samt forwarding kontra routing.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om dataplan vs kontrollplan, forwarding vs routing, og nettverkslagets overordnede arkitektur.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/cn-4/teori/4-2" className="hover:text-[var(--accent)] text-sm">
          4.2 IPv4: datagram, adressering og CIDR →
        </Link>
      </div>
    </div>
  );
}
