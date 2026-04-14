"use client";

import Link from "next/link";

export default function DS1_3Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-1/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.3 Typer distribuerte systemer</span>
      </div>

      <h1 className="text-2xl font-bold">1.3 Typer distribuerte systemer</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Oversikt over klient-server-arkitektur, peer-to-peer-systemer og hybride tilnærminger.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om klient-server, P2P og hybride distribuerte systemer.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-1/teori/1-2" className="hover:text-[var(--accent)] text-sm">
          ← 1.2 Design-mål
        </Link>
        <div />
      </div>
    </div>
  );
}
