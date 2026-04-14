"use client";

import { useState } from "react";
import Link from "next/link";

interface Hint {
  label: string;
  content: React.ReactNode;
}

interface FormulaHint {
  subQuestion: string;
  formulas: React.ReactNode;
}

interface RelevantChapter {
  href: string;
  title: string;
}

interface ExerciseCardProps {
  number: number;
  title: string;
  difficulty?: "lett" | "middels" | "vanskelig";
  problem: React.ReactNode;
  hints?: Hint[];
  formulaHints?: FormulaHint[];
  relevantChapters?: RelevantChapter[];
  solution: React.ReactNode;
  source?: string;
}

const difficultyColors = {
  lett: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  middels: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  vanskelig: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function ExerciseCard({
  number,
  title,
  difficulty,
  problem,
  hints = [],
  formulaHints = [],
  relevantChapters = [],
  solution,
  source,
}: ExerciseCardProps) {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [revealedFormulas, setRevealedFormulas] = useState<Set<number>>(new Set());

  const toggleFormula = (i: number) => {
    setRevealedFormulas((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">
            {number}
          </span>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {difficulty && (
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[difficulty]}`}
            >
              {difficulty}
            </span>
          )}
          {source && (
            <span className="text-xs text-[var(--muted)] bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">
              {source}
            </span>
          )}
        </div>
      </div>

      {/* Problem */}
      <div className="mb-4 leading-relaxed">{problem}</div>

      {/* Relevant chapters */}
      {relevantChapters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-[var(--muted)] font-medium">Les opp:</span>
          {relevantChapters.map((ch, i) => (
            <Link
              key={i}
              href={ch.href}
              className="text-xs px-2.5 py-1 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              {ch.title}
            </Link>
          ))}
        </div>
      )}

      {/* Hints */}
      {hints.length > 0 && (
        <div className="space-y-2 mb-4">
          {hints.map((hint, i) => (
            <div key={i}>
              {i < revealedHints ? (
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    {hint.label}
                  </p>
                  <div className="text-sm">{hint.content}</div>
                </div>
              ) : i === revealedHints ? (
                <button
                  onClick={() => setRevealedHints(revealedHints + 1)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Vis {hint.label.toLowerCase()}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Formula hints per sub-question */}
      {formulaHints.length > 0 && (
        <div className="space-y-2 mb-4">
          {formulaHints.map((fh, i) => (
            <div key={i}>
              <button
                onClick={() => toggleFormula(i)}
                className="flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:underline font-medium"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Formler for {fh.subQuestion}
              </button>
              {revealedFormulas.has(i) && (
                <div className="mt-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                    Formler du trenger for {fh.subQuestion}
                  </p>
                  <div className="text-sm">{fh.formulas}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Solution toggle */}
      <div className="border-t border-[var(--card-border)] pt-4">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showSolution ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {showSolution ? "Skjul løsning" : "Vis løsning"}
        </button>
        {showSolution && (
          <div className="mt-4 pl-4 border-l-2 border-[var(--accent)] space-y-3">
            {solution}
          </div>
        )}
      </div>
    </div>
  );
}
