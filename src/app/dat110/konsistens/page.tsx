"use client";

import Link from "next/link";

export default function KonsistensPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Koordinering og konsistens</span>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400 mb-2 inline-block">
          Oppg 9 (~10%)
        </span>
        <h1 className="text-3xl font-bold mb-2">Koordinering, konsistens og feiltoleranse</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Logiske og fysiske klokker, vektorklokker, konsistensmodeller,
          replikering, Byzantine-feiltoleranse og RPC-feil.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her kommer Lamport-klokker, vektorklokker med interaktiv simulator,
          konsistensmodeller (data-centric vs client-centric), primary-based vs
          quorum-replikering, Byzantine fault tolerance (3k+1), flat vs hierarkisk
          gruppe, og de 5 RPC-feilklassene.
        </p>
      </div>
    </div>
  );
}
