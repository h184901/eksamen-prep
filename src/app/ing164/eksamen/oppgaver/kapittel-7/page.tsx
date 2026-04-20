"use client";

import { useState } from "react";
import Link from "next/link";
import CollapsibleSection from "@/components/CollapsibleSection";
import OppgavetekstBox from "@/components/OppgavetekstBox";
import { exercises, ExerciseContent } from "./exercises";

const sections = [
  {
    id: "7.1",
    title: "Gravitasjonell og elastisk potensiell energi",
    exercises: ["7.1", "7.5", "7.9", "7.12", "7.13"],
  },
  {
    id: "problems",
    title: "Problems",
    exercises: ["7.37", "7.54"],
  },
];

const difficultyBadge: Record<ExerciseContent["difficulty"], string> = {
  lett: "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700",
  middels: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700",
  vanskelig: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700",
};

function ExerciseDisplay({ exercise, id }: { exercise: ExerciseContent; id: string }) {
  const [visibleHints, setVisibleHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-[var(--card-border)]">
        <h3 className="text-xl font-semibold">Oppgave {id}</h3>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyBadge[exercise.difficulty]}`}
        >
          {exercise.difficulty}
        </span>
        <span className="text-xs text-[var(--muted)]">{exercise.pageRef}</span>
        <span className="text-sm text-[var(--muted)] italic ml-auto">{exercise.title}</span>
      </div>

      {/* Problem */}
      <OppgavetekstBox copyLabel={id}>{exercise.problem}</OppgavetekstBox>

      {/* Hva vet vi / Hva skal vi finne */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-300">Hva vet vi?</p>
          <div className="text-sm">{exercise.knowns}</div>
        </div>
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
          <p className="font-semibold text-sm mb-2 text-purple-700 dark:text-purple-300">Hva skal vi finne?</p>
          <div className="text-sm">{exercise.unknowns}</div>
        </div>
      </div>

      {/* Strategi */}
      <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
        <p className="font-semibold text-sm mb-1 text-green-700 dark:text-green-300">Strategi</p>
        <div className="text-sm">{exercise.strategy}</div>
      </div>

      {/* Hints */}
      <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
        <p className="font-semibold text-sm mb-2">Hint</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {exercise.hints.map((_, idx) => (
            <button
              key={idx}
              disabled={idx > visibleHints}
              onClick={() => setVisibleHints(Math.max(visibleHints, idx + 1))}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                idx < visibleHints
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--background)] text-[var(--muted)] border border-[var(--card-border)] hover:border-[var(--accent)]/50"
              }`}
            >
              Vis {exercise.hints[idx].label}
            </button>
          ))}
          {visibleHints > 0 && (
            <button
              onClick={() => setVisibleHints(0)}
              className="px-3 py-1 rounded-md text-xs text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Skjul alle
            </button>
          )}
        </div>
        <div className="space-y-2">
          {exercise.hints.slice(0, visibleHints).map((hint, idx) => (
            <div
              key={idx}
              className="rounded-md bg-[var(--background)] border-l-4 border-[var(--accent)] p-2 text-sm"
            >
              <p className="font-semibold text-xs text-[var(--accent)] mb-1">{hint.label}</p>
              {hint.content}
            </div>
          ))}
        </div>
      </div>

      {/* Løsning */}
      <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-sm">Løsning</p>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-3 py-1 rounded-md text-xs font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          >
            {showSolution ? "Skjul løsning" : "Vis løsning"}
          </button>
        </div>
        {showSolution && (
          <div className="pt-2 border-t border-[var(--card-border)] text-sm">{exercise.solution}</div>
        )}
      </div>

      {/* Alternativ løsning */}
      {exercise.alternativeSolution && (
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">Alternativ løsning</p>
            <button
              onClick={() => setShowAlternative(!showAlternative)}
              className="px-3 py-1 rounded-md text-xs font-semibold bg-[var(--background)] text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              {showAlternative ? "Skjul" : "Vis alternativ"}
            </button>
          </div>
          {showAlternative && (
            <div className="pt-2 border-t border-[var(--card-border)] text-sm">
              {exercise.alternativeSolution}
            </div>
          )}
        </div>
      )}

      {/* Hva lærte vi */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
        <p className="font-semibold text-sm mb-1 text-amber-700 dark:text-amber-300">Hva lærte vi?</p>
        <div className="text-sm">{exercise.summary}</div>
      </div>
    </div>
  );
}

export default function Kapittel7OppgaverPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const selected = selectedExercise ? exercises[selectedExercise] : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <Link href="/ing164/eksamen" className="hover:text-[var(--accent)]">Eksamensøving</Link>
          <span>/</span>
          <Link href="/ing164/eksamen/oppgaver" className="hover:text-[var(--accent)]">Oppgaver fra boken</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Kapittel 7</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Kapittel 7 — Potensiell energi og energibevaring</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics sortert etter delkapittel. Velg en seksjon og deretter en oppgave.
        </p>
        <Link href="/ing164/kapittel-7/teori" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          Les teori for kapittel 7
        </Link>
      </div>

      {/* Sub-chapter sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <CollapsibleSection
            key={section.id}
            title={section.id === "problems" || section.id === "challenge" ? section.title : `${section.id} — ${section.title}`}
            defaultOpen={false}
          >
            {section.exercises.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {section.exercises.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setSelectedExercise(selectedExercise === ex ? null : ex)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedExercise === ex
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--background)] text-[var(--muted)] border border-[var(--card-border)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--muted)]">Ingen oppgaver for dette delkapittelet.</p>
            )}
          </CollapsibleSection>
        ))}
      </div>

      {/* Selected exercise */}
      {selectedExercise && (
        <div className="mt-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <div className="flex items-center justify-end mb-3">
            <button
              onClick={() => setSelectedExercise(null)}
              className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Lukk
            </button>
          </div>
          {selected ? (
            <ExerciseDisplay key={selectedExercise} exercise={selected} id={selectedExercise} />
          ) : (
            <div className="rounded-lg border-2 border-dashed border-[var(--card-border)] p-8 text-center">
              <p className="text-[var(--muted)] font-medium">Oppgavetekst og løsning kommer snart</p>
              <p className="text-xs text-[var(--muted)] mt-1">Oppgave {selectedExercise} fra University Physics</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
