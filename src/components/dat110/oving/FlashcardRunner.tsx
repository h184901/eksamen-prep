"use client";

import { useEffect, useMemo, useState } from "react";
import Flashcard from "./Flashcard";
import FlashcardDeckSelector from "./FlashcardDeckSelector";
import type {
  Flashcard as FlashcardData,
  FlashcardTopicSlug,
} from "./flashcard-types";
import { FLASHCARD_TOPICS } from "./flashcard-types";

interface Props {
  cards: FlashcardData[];
}

// Driver for the flashcards mode. Holds:
//  - selected topic filter (default: all)
//  - current index into the active deck
//  - flipped state for the current card
//
// No spaced-repetition / persistence yet — keeps the surface small. "Kan/vet
// ikke" is a per-card toggle that just records into local state and surfaces
// a count in the footer; values reset when the filter changes (intentional
// for v1 — full SRS is a later iteration).
export default function FlashcardRunner({ cards }: Props) {
  const allTopics: FlashcardTopicSlug[] = useMemo(
    () => FLASHCARD_TOPICS.map((t) => t.slug),
    []
  );

  const [selected, setSelected] = useState<Set<FlashcardTopicSlug>>(
    () => new Set(allTopics)
  );
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  // Per-card "kan" mark — keyed by card id.
  const [known, setKnown] = useState<Set<string>>(new Set());

  const countsByTopic = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of cards) m[c.topic] = (m[c.topic] || 0) + 1;
    return m;
  }, [cards]);

  const activeDeck = useMemo(
    () => cards.filter((c) => selected.has(c.topic)),
    [cards, selected]
  );

  // When the active deck changes (filter toggle), clamp index and unflip.
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [selected]);

  const toggleTopic = (slug: FlashcardTopicSlug) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(allTopics));
  const clearAll = () => setSelected(new Set());

  const goPrev = () => {
    if (activeDeck.length === 0) return;
    setFlipped(false);
    setIndex((i) => (i - 1 + activeDeck.length) % activeDeck.length);
  };
  const goNext = () => {
    if (activeDeck.length === 0) return;
    setFlipped(false);
    setIndex((i) => (i + 1) % activeDeck.length);
  };
  const flip = () => setFlipped((f) => !f);

  const toggleKnown = (id: string) => {
    setKnown((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Reset known marks when filter changes — counts only make sense within a
  // session of the same deck.
  useEffect(() => {
    setKnown(new Set());
  }, [selected]);

  if (activeDeck.length === 0) {
    return (
      <div className="space-y-5">
        <FlashcardDeckSelector
          topics={FLASHCARD_TOPICS}
          selected={selected}
          countsByTopic={countsByTopic}
          onToggle={toggleTopic}
          onSelectAll={selectAll}
          onClear={clearAll}
        />
        <div className="rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/40 dark:bg-neutral-900/30 p-8 text-center">
          <p className="text-base font-medium text-neutral-700 dark:text-neutral-200">
            Ingen temaer valgt
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Velg minst ett tema over for å starte drillen.
          </p>
        </div>
      </div>
    );
  }

  const current = activeDeck[index];
  const isKnown = known.has(current.id);

  return (
    <div className="space-y-5">
      <FlashcardDeckSelector
        topics={FLASHCARD_TOPICS}
        selected={selected}
        countsByTopic={countsByTopic}
        onToggle={toggleTopic}
        onSelectAll={selectAll}
        onClear={clearAll}
      />

      <Flashcard
        // key forces fade-to-front when card changes
        key={current.id}
        card={current}
        flipped={flipped}
        onFlip={flip}
        index={index}
        total={activeDeck.length}
      />

      {/* Nav row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={goPrev}
          className="px-4 py-3 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 text-sm font-semibold text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors min-h-[44px]"
        >
          ← Forrige
        </button>
        <button
          type="button"
          onClick={() => toggleKnown(current.id)}
          disabled={!flipped}
          className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-colors min-h-[44px] ${
            isKnown
              ? "border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200"
              : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-pressed={isKnown}
          title={
            flipped
              ? "Marker dette kortet som 'kan' i denne økten"
              : "Snu kortet først for å markere"
          }
        >
          {isKnown ? "✓ Markert som kan" : "Marker som kan"}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="px-4 py-3 rounded-lg bg-network-500 hover:bg-network-600 text-white font-semibold text-sm transition-colors min-h-[44px]"
        >
          Neste →
        </button>
      </div>

      {/* Footer counters */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 flex-wrap gap-2">
        <span>
          Posisjon{" "}
          <span className="font-semibold text-neutral-700 dark:text-neutral-200">
            {index + 1}
          </span>{" "}
          / {activeDeck.length}
        </span>
        <span>
          Markert som kan i økten:{" "}
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">
            {known.size}
          </span>{" "}
          / {activeDeck.length}
        </span>
      </div>
    </div>
  );
}
