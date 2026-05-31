"use client";

import { useId, useState } from "react";
import type { ExamSolution } from "@/lib/dat110-vault/types";
import { localizedText, type Dat110Lang } from "@/lib/dat110-language";
import VaultMarkdown from "./VaultMarkdown";
import LearnMoreLinks from "./LearnMoreLinks";

interface Props {
  solution: ExamSolution;
  triggerLabel?: string;
  // Optional: localizes only the accordion chrome (labels/headings), never the
  // solution body. Defaults to Norwegian, so non-DAT110-exam callers are unchanged.
  lang?: Dat110Lang;
}

// Solution accordion for exam questions / subquestions.
// Hard requirement: collapsed by default — user must actively click to reveal.
// Keyboard: Enter/Space toggle (native button); Esc on the button closes the panel.
export default function SolutionAccordion({
  solution,
  triggerLabel,
  lang = "no",
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closedLabel =
    triggerLabel ?? localizedText("Vis løsning", "Show solution", lang);

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className="mt-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKeyDown}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left px-4 py-2.5 text-sm font-medium text-emerald-800 dark:text-emerald-100 hover:bg-emerald-100/40 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden className="text-emerald-600 dark:text-emerald-400">
            {open ? "▼" : "▶"}
          </span>
          <span>
            {open
              ? localizedText("Skjul løsning", "Hide solution", lang)
              : closedLabel}
          </span>
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-label={localizedText("Løsning", "Solution", lang)}
          className="px-4 pb-4 pt-2 border-t border-emerald-200 dark:border-emerald-800/60"
        >
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-2">
              {localizedText("Svar", "Answer", lang)}
            </p>
            <VaultMarkdown content={solution.expectedAnswer} />
          </div>
          {solution.shortReasoning && (
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-2">
                {localizedText("Kort begrunnelse", "Short reasoning", lang)}
              </p>
              <VaultMarkdown content={solution.shortReasoning} />
            </div>
          )}
          {Array.isArray(solution.commonMistakes) &&
            solution.commonMistakes.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-2">
                  {localizedText("Vanlige feil", "Common mistakes", lang)}
                </p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
                  {solution.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          {solution.learnMoreLinks && solution.learnMoreLinks.length > 0 && (
            <LearnMoreLinks
              links={solution.learnMoreLinks}
              label={localizedText("Les mer", "Learn more", lang)}
            />
          )}
        </div>
      )}
    </div>
  );
}
