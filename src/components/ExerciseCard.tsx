"use client";

import { useState } from "react";

interface Hint {
  label: string;
  content: React.ReactNode;
}

interface ExerciseCardProps {
  number: number;
  title: string;
  difficulty?: "lett" | "middels" | "vanskelig";
  problem: React.ReactNode;
  hints?: Hint[];
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
  solution,
  source,
}: ExerciseCardProps) {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

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
