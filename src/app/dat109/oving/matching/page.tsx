"use client";

import Link from "next/link";
import MatchingGame from "@/components/dat109/oving/MatchingGame";
import { MATCHING_SETS } from "@/lib/quiz-data/matching";

export default function MatchingPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/oving" className="hover:text-[var(--accent)]">Øving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Matching</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Matching-øvelse</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Koble begreper til riktige definisjoner. Trener gjenkjenning av prinsipper, mønstre,
          roller og UML-symboler — perfekt for flervalg-oppgaver der du skal kjenne igjen
          definisjoner.
        </p>
      </div>

      {MATCHING_SETS.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 p-8 text-center">
          <p className="text-2xl mb-2">📭</p>
          <p className="font-bold mb-1">Ingen matching-sett ennå</p>
          <p className="text-sm text-[var(--muted)]">Innholdet er under generering.</p>
        </div>
      ) : (
        <MatchingGame allSets={MATCHING_SETS} />
      )}
    </div>
  );
}
