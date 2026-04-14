"use client";

import Link from "next/link";

export default function DS8_1Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.1 Introduksjon til feiltoleranse</span>
      </div>

      <h1 className="text-2xl font-bold">8.1 Introduksjon til feiltoleranse</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Feiltyper i distribuerte systemer (crash, omission, Byzantine) og grunnleggende begreper om pålitelighet og tilgjengelighet.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om feiltyper og pålitelighet i distribuerte systemer.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-8/teori/8-2" className="hover:text-[var(--accent)] text-sm">
          8.2 Prosessresistens →
        </Link>
      </div>
    </div>
  );
}
