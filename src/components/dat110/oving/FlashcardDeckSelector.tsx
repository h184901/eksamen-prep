"use client";

import type {
  FlashcardTopicInfo,
  FlashcardTopicSlug,
} from "./flashcard-types";
import { FLASHCARD_TOPIC_PILL } from "./flashcard-types";

interface Props {
  topics: FlashcardTopicInfo[];
  selected: Set<FlashcardTopicSlug>;
  countsByTopic: Record<string, number>;
  onToggle: (slug: FlashcardTopicSlug) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

// Pill multi-select for filtering flashcards by topic. Mobile-first stacking:
// pills wrap; bulk-action buttons stack below on narrow screens.
export default function FlashcardDeckSelector({
  topics,
  selected,
  countsByTopic,
  onToggle,
  onSelectAll,
  onClear,
}: Props) {
  return (
    <div className="space-y-3" aria-label="Filtrer flashcards på temaer">
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => {
          const isOn = selected.has(t.slug);
          const pillCls = FLASHCARD_TOPIC_PILL[t.color];
          const count = countsByTopic[t.slug] || 0;
          return (
            <button
              key={t.slug}
              type="button"
              onClick={() => onToggle(t.slug)}
              aria-pressed={isOn}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border-2 transition-colors min-h-[40px] ${
                isOn ? pillCls.active : pillCls.idle
              }`}
            >
              <span aria-hidden>{t.emoji}</span>
              <span>{t.label}</span>
              <span className="text-xs font-mono opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={onSelectAll}
          className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Velg alle
        </button>
        <button
          type="button"
          onClick={onClear}
          className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Tøm
        </button>
        <span className="ml-auto self-center text-neutral-500 dark:text-neutral-400">
          {selected.size} av {topics.length} temaer valgt
        </span>
      </div>
    </div>
  );
}
