"use client";

import Link from "next/link";

export default function DS1_2Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-1/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.2 Design-mål</span>
      </div>

      <h1 className="text-2xl font-bold">1.2 Design-mål</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        De 8 transparenstypene, åpenhet og skalerbarhet som sentrale design-mål for distribuerte systemer.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om de 8 transparenstypene, åpenhet og skalerbarhet.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-1/teori/1-1" className="hover:text-[var(--accent)] text-sm">
          ← 1.1 Definisjon og eksempler
        </Link>
        <Link href="/dat110/ds-1/teori/1-3" className="hover:text-[var(--accent)] text-sm">
          1.3 Typer distribuerte systemer →
        </Link>
      </div>
    </div>
  );
}
