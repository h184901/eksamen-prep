"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  getQuizTopicInfo,
  TOPIC_COLOR_PILL,
} from "@/lib/dat110-quiz-topics";
import VaultMarkdown from "@/components/dat110/VaultMarkdown";
import {
  type CalculationDrill,
  DIFFICULTY_LABEL,
  DIFFICULTY_PILL,
} from "./calculation-types";

interface Props {
  drill: CalculationDrill;
  position: number;
  total: number;
}

// Drill card with hidden self-graded "Vis løsning"-accordion. NO autograder.
// User reads prompt, attempts on paper, then expands accordion to compare.
export default function CalculationDrillCard({ drill, position, total }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const topicInfo = getQuizTopicInfo(drill.topic);

  // Collapse accordion when the drill changes (next/prev).
  useEffect(() => {
    setOpen(false);
  }, [drill.id]);

  return (
    <article className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          Oppgave {position} av {total}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {topicInfo && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${TOPIC_COLOR_PILL[topicInfo.color]}`}
            >
              <span aria-hidden>{topicInfo.emoji}</span>
              <span>{topicInfo.label}</span>
            </span>
          )}
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${DIFFICULTY_PILL[drill.difficulty]}`}
          >
            {DIFFICULTY_LABEL[drill.difficulty]}
          </span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
        {drill.title}
      </h2>

      {/* Prompt — markdown so tables/code/math work */}
      <div className="mb-4">
        <VaultMarkdown content={drill.prompt} />
      </div>

      {drill.figureNote && (
        <div className="mb-4 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
          <span className="font-semibold">Merk: </span>
          {drill.figureNote}
        </div>
      )}

      {/* Solution accordion */}
      <div className="mt-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-emerald-800 dark:text-emerald-100 hover:bg-emerald-100/40 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="text-emerald-600 dark:text-emerald-400">
              {open ? "▼" : "▶"}
            </span>
            <span>{open ? "Skjul løsning" : "Vis løsning"}</span>
          </span>
          {!open && (
            <span className="text-xs text-emerald-600 dark:text-emerald-300 opacity-70">
              prøv selv først
            </span>
          )}
        </button>
        {open && (
          <div
            id={panelId}
            role="region"
            aria-label="Løsning"
            className="px-4 pb-4 pt-3 border-t border-emerald-200 dark:border-emerald-800/60 space-y-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-2">
                Forventede steg
              </p>
              <ol className="ml-5 list-decimal space-y-1.5 text-sm text-neutral-800 dark:text-neutral-100">
                {drill.expectedSteps.map((step, i) => (
                  <li key={i}>
                    <VaultMarkdown content={step} />
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg bg-white dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-1">
                Fasit
              </p>
              <div className="text-base font-semibold text-emerald-900 dark:text-emerald-100">
                <VaultMarkdown content={drill.finalAnswer} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Learn more links (always visible — drives discovery to concept pages) */}
      {drill.learnMoreLinks.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
            Les mer
          </p>
          <div className="flex flex-wrap gap-2">
            {drill.learnMoreLinks.map((l, i) => (
              <Link
                key={`${l.kind}-${l.slug}-${i}`}
                href={l.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                <span aria-hidden>→</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
