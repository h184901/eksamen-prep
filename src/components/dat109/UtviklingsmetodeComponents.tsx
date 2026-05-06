"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Flervalgsquiz-komponent                                           */
/* ------------------------------------------------------------------ */
export interface QuizOption {
  label: string;
  text: string;
}
interface QuizQuestionProps {
  id: number;
  question: string;
  options: QuizOption[];
  correctIndex: number;
  explanation: string;
  source?: string;
}

export function QuizQuestion({ id, question, options, correctIndex, explanation, source }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 text-xs font-bold shrink-0">
          {id}
        </span>
        <div>
          <p className="font-semibold leading-snug">{question}</p>
          {source && <p className="text-xs text-[var(--muted)] mt-1">{source}</p>}
        </div>
      </div>
      <div className="space-y-2 ml-10">
        {options.map((opt, i) => {
          let ring = "border-[var(--card-border)] hover:border-sysdev-400";
          let bg = "bg-transparent";
          if (answered) {
            if (i === correctIndex) {
              ring = "border-green-500";
              bg = "bg-green-50 dark:bg-green-950/20";
            } else if (i === selected && i !== correctIndex) {
              ring = "border-red-400";
              bg = "bg-red-50 dark:bg-red-950/20";
            } else {
              ring = "border-[var(--card-border)] opacity-50";
            }
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${ring} ${bg}`}
            >
              <span className="font-semibold mr-2">{opt.label})</span>
              {opt.text}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mt-3 ml-10 p-3 rounded-lg text-sm ${selected === correctIndex ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"}`}>
          <p className="font-semibold mb-1">
            {selected === correctIndex ? "Riktig!" : `Feil — riktig svar er ${options[correctIndex].label})`}
          </p>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison-tabell-komponent                                       */
/* ------------------------------------------------------------------ */
export function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 bg-sysdev-50 dark:bg-sysdev-950/30 border border-[var(--card-border)] font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 border border-[var(--card-border)] align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
