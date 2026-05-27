"use client";

import Link from "next/link";
import type { Flashcard as FlashcardData } from "./flashcard-types";
import { getFlashcardTopicInfo } from "./flashcard-types";

interface Props {
  card: FlashcardData;
  // True after the user has pressed "Vis svar" — back side is revealed.
  flipped: boolean;
  onFlip: () => void;
  index: number;
  total: number;
}

// Single flashcard with front/back states. Front side: prompt + "Vis svar".
// Back side: answer + learnMoreLinks. Flip uses a simple cross-fade (no 3D
// rotation) so it works reliably across browsers and respects reduced-motion.
export default function Flashcard({ card, flipped, onFlip, index, total }: Props) {
  const topic = getFlashcardTopicInfo(card.topic);

  return (
    <div
      className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 shadow-sm overflow-hidden"
      aria-live="polite"
    >
      {/* Header: position + topic */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 flex-wrap">
        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          Kort {index + 1} / {total}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
          {topic.emoji} {topic.label}
        </span>
      </div>

      {/* Body — cross-fade between front and back */}
      <div className="relative min-h-[18rem] sm:min-h-[20rem]">
        {/* Front */}
        <div
          aria-hidden={flipped}
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-opacity duration-300 ${
            flipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            Spørsmål
          </p>
          <p className="text-xl sm:text-2xl font-semibold leading-snug text-neutral-900 dark:text-neutral-50 max-w-2xl">
            {card.front}
          </p>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          className={`absolute inset-0 flex flex-col p-6 sm:p-8 transition-opacity duration-300 ${
            flipped ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-network-700 dark:text-network-300 mb-3">
            Svar
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-800 dark:text-neutral-100 whitespace-pre-wrap">
            {card.back}
          </p>

          {card.learnMoreLinks && card.learnMoreLinks.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
                Les mer
              </p>
              <div className="flex flex-wrap gap-2">
                {card.learnMoreLinks.map((link, i) => (
                  <Link
                    key={`${link.href}-${i}`}
                    href={link.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/40 underline underline-offset-2 transition-colors"
                  >
                    <span aria-hidden>→</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action: Vis svar / hint that you can use Neste */}
      {!flipped && (
        <div className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
          <button
            type="button"
            onClick={onFlip}
            className="w-full px-6 py-3 rounded-lg bg-network-500 hover:bg-network-600 text-white font-semibold text-sm transition-colors"
          >
            Vis svar
          </button>
        </div>
      )}
    </div>
  );
}
