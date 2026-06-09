"use client";

import { useId, useState } from "react";
import type { ExamSolution } from "@/lib/dat102-vault/types";

interface Props {
  solution: ExamSolution;
}

// Løsnings-accordion for eksamensdeloppgaver. Kollapset som standard — brukeren
// må aktivt klikke for å avsløre fasit. Viser Svar / Kort begrunnelse /
// Vanlige feil. (DAT110 SolutionAccordion-mønster, cyan/teal.)
export default function Dat102SolutionAccordion({ solution }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-3 rounded-xl border border-dat102-200 dark:border-dat102-800/60 bg-dat102-50/40 dark:bg-dat102-950/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.preventDefault();
            setOpen(false);
          }
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left px-4 py-2.5 text-sm font-medium text-dat102-800 dark:text-dat102-100 hover:bg-dat102-100/40 dark:hover:bg-dat102-900/30 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-dat102-500 focus-visible:ring-offset-1"
      >
        <span aria-hidden className="text-dat102-600 dark:text-dat102-400">
          {open ? "▼" : "▶"}
        </span>
        <span>{open ? "Skjul løsning" : "Vis løsning"}</span>
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="Løsning"
          className="px-4 pb-4 pt-2 border-t border-dat102-200 dark:border-dat102-800/60 space-y-3"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-dat102-700 dark:text-dat102-300 mb-1">
              Svar
            </p>
            <p className="text-sm leading-relaxed text-neutral-900 dark:text-neutral-50 whitespace-pre-wrap">
              {solution.expectedAnswer}
            </p>
          </div>
          {solution.shortReasoning && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-1">
                Kort begrunnelse
              </p>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap">
                {solution.shortReasoning}
              </p>
            </div>
          )}
          {Array.isArray(solution.commonMistakes) && solution.commonMistakes.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-1">
                Vanlige feil
              </p>
              <ul className="ml-5 list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
                {solution.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
