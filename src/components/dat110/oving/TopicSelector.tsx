"use client";

import { useMemo, useState } from "react";
import type { DAT110QuizSourceKind, VaultTema } from "@/lib/dat110-quiz-types";
import { QUIZ_TOPICS_DAT110 } from "@/lib/dat110-quiz-topics";

export interface QuizStartOptions {
  selectedTopics: VaultTema[];
  sourceFilter: Set<DAT110QuizSourceKind>;
  targetCount: number;
  shuffle: boolean;
  allOrNothing: boolean;
}

interface Props {
  questionCountByTopic: Record<string, number>;
  questionCountBySource: Record<DAT110QuizSourceKind, number>;
  onStart: (opts: QuizStartOptions) => void;
}

// Friendly oppgave-titler — matches /dat110/page.tsx examOppgaver titles.
const OPPG_LABELS: Record<number, { title: string; weight: string }> = {
  1: { title: "Flervalg", weight: "10%" },
  3: { title: "Forsinkelser", weight: "10%" },
  5: { title: "Ruting", weight: "10%" },
  6: { title: "ARP og Switch", weight: "10%" },
  7: { title: "DS-teori", weight: "5%" },
  8: { title: "Overlay og multicast", weight: "10%" },
  9: { title: "Konsistens og klokker", weight: "10%" },
  10: { title: "DHT/Chord", weight: "15%" },
};

const SOURCE_LABELS: Record<
  DAT110QuizSourceKind,
  { label: string; comingNote?: string }
> = {
  exam: { label: "📋 Tidligere DAT110-eksamener" },
  canvas: { label: "📋 Canvas-quizer", comingNote: "kommer i P1" },
  generated: { label: "✏️ Genererte spørsmål" },
};

export default function TopicSelector({
  questionCountByTopic,
  questionCountBySource,
  onStart,
}: Props) {
  const [selectedTopics, setSelectedTopics] = useState<Set<VaultTema>>(
    new Set()
  );
  const [sourceFilter, setSourceFilter] = useState<Set<DAT110QuizSourceKind>>(
    () => {
      const s = new Set<DAT110QuizSourceKind>();
      // Default: enable any source that has >= 1 question.
      (["exam", "canvas", "generated"] as const).forEach((k) => {
        if ((questionCountBySource[k] || 0) > 0) s.add(k);
      });
      return s;
    }
  );
  const [shuffle, setShuffle] = useState(true);
  const [allOrNothing, setAllOrNothing] = useState(true);

  // Groups: oppgave-nummer → temaer. Hide groups whose temaer have 0 questions.
  const groups = useMemo(() => {
    const byOppg = new Map<number, typeof QUIZ_TOPICS_DAT110>();
    for (const t of QUIZ_TOPICS_DAT110) {
      const arr = byOppg.get(t.examQuestionNumber) ?? [];
      arr.push(t);
      byOppg.set(t.examQuestionNumber, arr);
    }
    return [...byOppg.entries()]
      .sort(([a], [b]) => a - b)
      .map(([oppg, temaer]) => ({ oppg, temaer }));
  }, []);

  const totalAvailable = useMemo(() => {
    return [...selectedTopics].reduce(
      (sum, t) => sum + (questionCountByTopic[t] || 0),
      0
    );
  }, [selectedTopics, questionCountByTopic]);

  const [targetCount, setTargetCount] = useState(10);

  const toggleTopic = (id: VaultTema) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    const all = new Set<VaultTema>();
    QUIZ_TOPICS_DAT110.forEach((t) => {
      if ((questionCountByTopic[t.id] || 0) > 0) all.add(t.id);
    });
    setSelectedTopics(all);
  };

  const selectNone = () => setSelectedTopics(new Set());

  const selectTier1 = () => {
    const tier1 = new Set<VaultTema>();
    QUIZ_TOPICS_DAT110.forEach((t) => {
      if (t.tier === 1 && (questionCountByTopic[t.id] || 0) > 0)
        tier1.add(t.id);
    });
    setSelectedTopics(tier1);
  };

  const selectGroup = (oppg: number) => {
    const inGroup = QUIZ_TOPICS_DAT110.filter(
      (t) =>
        t.examQuestionNumber === oppg && (questionCountByTopic[t.id] || 0) > 0
    ).map((t) => t.id);
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      const allSet = inGroup.every((id) => next.has(id));
      if (allSet) inGroup.forEach((id) => next.delete(id));
      else inGroup.forEach((id) => next.add(id));
      return next;
    });
  };

  const toggleSource = (k: DAT110QuizSourceKind) => {
    setSourceFilter((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const canStart = selectedTopics.size > 0 && totalAvailable > 0;
  const effectiveCount = Math.min(targetCount, totalAvailable || 5);
  const maxSlider = Math.max(50, totalAvailable);

  return (
    <div className="space-y-6">
      {/* Hurtigvalg */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={selectAll}
          className="px-3 py-1.5 rounded-lg text-sm border border-network-400 text-network-700 dark:text-network-300 hover:bg-network-50 dark:hover:bg-network-950/30"
        >
          Velg alle
        </button>
        <button
          type="button"
          onClick={selectNone}
          className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
        >
          Fjern alle
        </button>
        <button
          type="button"
          onClick={selectTier1}
          className="px-3 py-1.5 rounded-lg text-sm border border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
        >
          Tier 1
        </button>
        {groups.map(({ oppg }) => (
          <button
            key={`g-${oppg}`}
            type="button"
            onClick={() => selectGroup(oppg)}
            className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            Oppg {oppg}
          </button>
        ))}
      </div>

      {/* Topic groups */}
      <div className="space-y-5">
        {groups.map(({ oppg, temaer }) => {
          const label = OPPG_LABELS[oppg];
          return (
            <div key={oppg}>
              <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-3">
                Oppgave {oppg}
                {label ? ` — ${label.title} (${label.weight})` : ""}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {temaer.map((t) => {
                  const count = questionCountByTopic[t.id] || 0;
                  const isSelected = selectedTopics.has(t.id);
                  const disabled = count === 0;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => !disabled && toggleTopic(t.id)}
                      disabled={disabled}
                      className={[
                        "text-left rounded-lg border-2 p-4 transition-all",
                        isSelected
                          ? "border-network-500 bg-network-50 dark:bg-network-950/30"
                          : disabled
                            ? "border-neutral-200 dark:border-neutral-800 opacity-40 cursor-not-allowed"
                            : "border-neutral-300 dark:border-neutral-700 hover:border-network-300 hover:bg-network-50/30 dark:hover:bg-network-950/10",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg flex-shrink-0">
                            {t.emoji}
                          </span>
                          <span className="font-bold text-sm text-neutral-900 dark:text-neutral-50">
                            {t.label}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-network-600 dark:text-network-300 flex-shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-2">
                        {t.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p
                          className={
                            disabled
                              ? "text-xs text-neutral-500"
                              : "text-xs font-medium text-network-600 dark:text-network-300"
                          }
                        >
                          {disabled
                            ? "Ingen spørsmål ennå"
                            : `${count} spørsmål tilgjengelig`}
                        </p>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {t.chapterTag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Innstillinger */}
      <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-neutral-50">
          Innstillinger
        </h3>

        {/* Antall */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-200">
            Antall spørsmål:{" "}
            <span className="font-bold">{effectiveCount}</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
              (av {totalAvailable} tilgjengelige fra valgte temaer)
            </span>
          </label>
          <input
            type="range"
            min={5}
            max={maxSlider}
            step={1}
            value={targetCount}
            onChange={(e) => setTargetCount(Number(e.target.value))}
            className="w-full accent-network-500"
          />
          <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            <span>5</span>
            <span>{maxSlider}</span>
          </div>
        </div>

        {/* Kildefilter */}
        <div>
          <p className="text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-200">
            Kilde
          </p>
          <div className="space-y-1.5">
            {(["exam", "canvas", "generated"] as const).map((k) => {
              const count = questionCountBySource[k] || 0;
              const disabled = count === 0;
              const checked = sourceFilter.has(k);
              const meta = SOURCE_LABELS[k];
              return (
                <label
                  key={k}
                  className={[
                    "flex items-center gap-2 text-sm",
                    disabled
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleSource(k)}
                    className="accent-network-500"
                  />
                  <span className="text-neutral-800 dark:text-neutral-100">
                    {meta.label}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {disabled && meta.comingNote
                      ? `(0 — ${meta.comingNote})`
                      : `(${count} tilgjengelig)`}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Shuffle + all-or-nothing */}
        <label className="flex items-center gap-2 text-sm cursor-pointer text-neutral-800 dark:text-neutral-100">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className="accent-network-500"
          />
          <span>Shuffle spørsmål og svaralternativer (anbefalt)</span>
        </label>

        <label className="flex items-center gap-2 text-sm cursor-pointer text-neutral-800 dark:text-neutral-100">
          <input
            type="checkbox"
            checked={allOrNothing}
            onChange={(e) => setAllOrNothing(e.target.checked)}
            className="accent-network-500"
          />
          <span>
            Alt-eller-ingenting-scoring på «velg alle som passer»-spørsmål
          </span>
        </label>
      </div>

      {/* Start */}
      <button
        type="button"
        onClick={() =>
          onStart({
            selectedTopics: [...selectedTopics],
            sourceFilter: new Set(sourceFilter),
            targetCount: effectiveCount,
            shuffle,
            allOrNothing,
          })
        }
        disabled={!canStart}
        className="w-full px-6 py-4 rounded-lg bg-network-500 hover:bg-network-600 text-white font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {selectedTopics.size === 0
          ? "Velg minst ett tema for å starte"
          : totalAvailable === 0
            ? "Ingen spørsmål i utvalget"
            : `🚀 Start quiz (${effectiveCount} spørsmål)`}
      </button>
    </div>
  );
}
