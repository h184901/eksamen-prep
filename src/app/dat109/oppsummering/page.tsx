"use client";

import Link from "next/link";

export default function OppsummeringPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppsummering</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Oppsummering</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Komplett sammendrag av alle konsepter, sjekklister for eksamen og
          hurtigreferanse for UML-notasjon, SOLID, GRASP og utviklingsmetoder.
        </p>
      </div>

      {/* Placeholder content */}
      <div className="rounded-xl border-2 border-dashed border-amber-300 dark:border-amber-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her kommer UML-notasjonsoversikt, SOLID/GRASP-jukselapp, sjekklister
          for eksamen, og hurtigreferanse for Scrum/XP/TDD/AUP.
        </p>
      </div>
    </div>
  );
}
