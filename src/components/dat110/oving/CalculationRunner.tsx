"use client";

import { useMemo, useState } from "react";
import type { VaultTema } from "@/lib/dat110-vault/types";
import {
  getQuizTopicInfo,
  TOPIC_COLOR_PILL,
} from "@/lib/dat110-quiz-topics";
import {
  type CalculationDifficulty,
  type CalculationDrill,
  DIFFICULTY_LABEL,
  DIFFICULTY_ORDER,
  DIFFICULTY_PILL,
} from "./calculation-types";
import CalculationDrillCard from "./CalculationDrill";

interface Props {
  drills: CalculationDrill[];
}

const ALL_DIFFICULTIES: CalculationDifficulty[] = ["easy", "medium", "hard"];

export default function CalculationRunner({ drills }: Props) {
  // All distinct topics that occur in dataset, in tema-id order.
  const allTopics = useMemo(() => {
    const set = new Set<VaultTema>();
    for (const d of drills) set.add(d.topic);
    return Array.from(set).sort();
  }, [drills]);

  const [selectedTopics, setSelectedTopics] = useState<Set<VaultTema>>(
    () => new Set(allTopics)
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<CalculationDifficulty>
  >(() => new Set(ALL_DIFFICULTIES));
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    const out = drills.filter(
      (d) => selectedTopics.has(d.topic) && selectedDifficulties.has(d.difficulty)
    );
    out.sort((a, b) => {
      const da = DIFFICULTY_ORDER[a.difficulty];
      const db = DIFFICULTY_ORDER[b.difficulty];
      if (da !== db) return da - db;
      return a.title.localeCompare(b.title, "no");
    });
    return out;
  }, [drills, selectedTopics, selectedDifficulties]);

  // Clamp index when filter shrinks.
  const safeIndex = filtered.length === 0 ? 0 : Math.min(index, filtered.length - 1);
  if (safeIndex !== index) {
    // Defer to next render to avoid setState-in-render warning.
    queueMicrotask(() => setIndex(safeIndex));
  }
  const current = filtered[safeIndex];

  const toggleTopic = (t: VaultTema) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
    setIndex(0);
  };

  const toggleDifficulty = (d: CalculationDifficulty) => {
    setSelectedDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
    setIndex(0);
  };

  const selectAllTopics = () => {
    setSelectedTopics(new Set(allTopics));
    setIndex(0);
  };
  const selectAllDifficulties = () => {
    setSelectedDifficulties(new Set(ALL_DIFFICULTIES));
    setIndex(0);
  };

  const handlePrev = () => {
    if (safeIndex > 0) setIndex(safeIndex - 1);
  };
  const handleNext = () => {
    if (safeIndex < filtered.length - 1) setIndex(safeIndex + 1);
  };

  const countsByDifficulty = useMemo(() => {
    const m: Record<CalculationDifficulty, number> = {
      easy: 0,
      medium: 0,
      hard: 0,
    };
    for (const d of drills) m[d.difficulty] += 1;
    return m;
  }, [drills]);

  const countsByTopic = useMemo(() => {
    const m: Record<string, number> = {};
    for (const d of drills) m[d.topic] = (m[d.topic] || 0) + 1;
    return m;
  }, [drills]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-4 sm:p-5 space-y-4">
        {/* Topic filter */}
        <div>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-200">
              Tema
            </h2>
            <button
              type="button"
              onClick={selectAllTopics}
              className="text-xs text-blue-700 dark:text-blue-300 hover:underline"
            >
              Velg alle
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTopics.map((t) => {
              const info = getQuizTopicInfo(t);
              const active = selectedTopics.has(t);
              const count = countsByTopic[t] || 0;
              const baseClass = active
                ? info
                  ? TOPIC_COLOR_PILL[info.color]
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
                : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400";
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTopic(t)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    active
                      ? "border-transparent"
                      : "border-neutral-300 dark:border-neutral-700"
                  } ${baseClass}`}
                  aria-pressed={active}
                >
                  {info && <span aria-hidden>{info.emoji}</span>}
                  <span>{info?.label ?? t}</span>
                  <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty filter */}
        <div>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-200">
              Vanskelighet
            </h2>
            <button
              type="button"
              onClick={selectAllDifficulties}
              className="text-xs text-blue-700 dark:text-blue-300 hover:underline"
            >
              Velg alle
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_DIFFICULTIES.map((d) => {
              const active = selectedDifficulties.has(d);
              const count = countsByDifficulty[d];
              const pillClass = active
                ? DIFFICULTY_PILL[d]
                : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400";
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDifficulty(d)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    active
                      ? "border-transparent"
                      : "border-neutral-300 dark:border-neutral-700"
                  } ${pillClass}`}
                  aria-pressed={active}
                >
                  <span>{DIFFICULTY_LABEL[d]}</span>
                  <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Drill view */}
      {!current ? (
        <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20 p-5 text-sm text-amber-800 dark:text-amber-200">
          Ingen drills matcher dine filtere. Slå på flere tema eller vanskelighetsgrader.
        </div>
      ) : (
        <>
          <CalculationDrillCard
            drill={current}
            position={safeIndex + 1}
            total={filtered.length}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Forrige
            </button>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {safeIndex + 1} / {filtered.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={safeIndex >= filtered.length - 1}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Neste →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
