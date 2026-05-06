"use client";

import Link from "next/link";
import FlashcardDeck from "@/components/dat109/oving/FlashcardDeck";
import { FLASHCARDS } from "@/lib/quiz-data/flashcards";

export default function FlashcardsPage() {
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
        <span className="text-[var(--foreground)]">Flashcards</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Begrep på forsiden, forklaring på baksiden. Klikk på kortet for å snu det. Marker som
          &laquo;Kan dette&raquo; eller &laquo;Øv mer&raquo;. Status lagres lokalt.
        </p>
      </div>

      {FLASHCARDS.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 p-8 text-center">
          <p className="text-2xl mb-2">📭</p>
          <p className="font-bold mb-1">Ingen flashcards ennå</p>
          <p className="text-sm text-[var(--muted)]">Innholdet er under generering.</p>
        </div>
      ) : (
        <FlashcardDeck allCards={FLASHCARDS} />
      )}
    </div>
  );
}
