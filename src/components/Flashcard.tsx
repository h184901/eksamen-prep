"use client";

import { useState } from "react";

interface FlashcardProps {
  front: string;
  back: string;
}

export default function Flashcard({ front, back }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="w-full text-left rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-5 transition-all hover:shadow-md cursor-pointer min-h-[120px]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
          {flipped ? "Svar" : "Spørsmål"}
        </span>
        <span className="text-xs text-[var(--muted)]">Klikk for å snu</span>
      </div>
      <p className={`text-sm leading-relaxed ${flipped ? "text-green-700 dark:text-green-400" : ""}`}>
        {flipped ? back : front}
      </p>
    </button>
  );
}

export function FlashcardDeck({ cards }: { cards: FlashcardProps[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index];

  return (
    <div className="space-y-3">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full text-left rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-6 transition-all hover:shadow-md cursor-pointer min-h-[140px]"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            {flipped ? "Svar" : "Spørsmål"}
          </span>
          <span className="text-xs text-[var(--muted)]">
            {index + 1} / {cards.length}
          </span>
        </div>
        <p className={`text-sm leading-relaxed ${flipped ? "text-green-700 dark:text-green-400" : ""}`}>
          {flipped ? card.back : card.front}
        </p>
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => { setIndex((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); }}
          disabled={cards.length <= 1}
          className="flex-1 text-sm py-2 rounded-lg border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 disabled:opacity-40"
        >
          Forrige
        </button>
        <button
          onClick={() => { setIndex((i) => (i + 1) % cards.length); setFlipped(false); }}
          disabled={cards.length <= 1}
          className="flex-1 text-sm py-2 rounded-lg border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 disabled:opacity-40"
        >
          Neste
        </button>
      </div>
    </div>
  );
}
