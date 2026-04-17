"use client";

import { useState } from "react";
import Link from "next/link";
import CollapsibleSection from "@/components/CollapsibleSection";
import OppgavetekstBox from "@/components/OppgavetekstBox";
import { exercises, type ExerciseContent } from "./exercises";

const sections = [
  {
    id: "24.1",
    title: "Kondensatorer og kapasitans",
    exercises: ["24.1", "24.2", "24.5", "24.6"],
  },
  {
    id: "24.2",
    title: "Kondensatorer i serie og parallell",
    exercises: ["24.14", "24.21"],
  },
  {
    id: "24.3",
    title: "Energi i kondensatorer",
    exercises: ["24.23", "24.25"],
  },
  {
    id: "24.4",
    title: "Dielektrika",
    exercises: ["24.31", "24.32", "24.39", "24.42"],
  },
  {
    id: "problems",
    title: "Problems",
    exercises: ["24.45", "24.47", "24.64"],
  },
];

const difficultyStyles: Record<ExerciseContent["difficulty"], string> = {
  lett: "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700",
  middels: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700",
  vanskelig: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700",
};

function ExerciseView({ id, data, onClose }: { id: string; data: ExerciseContent; onClose: () => void }) {
  const [visibleHints, setVisibleHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);

  return (
    <div className="mt-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold">Oppgave {id}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyStyles[data.difficulty]}`}>
              {data.difficulty}
            </span>
            <span className="text-xs text-[var(--muted)]">University Physics, {data.pageRef}</span>
          </div>
          <p className="text-sm text-[var(--muted)] mt-1">{data.title}</p>
        </div>
        <button
          onClick={onClose}
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] px-3 py-1 rounded-lg border border-[var(--card-border)] hover:border-[var(--accent)]/50"
        >
          Lukk
        </button>
      </div>

      {/* Oppgavetekst */}
      <div className="mb-4">
        <OppgavetekstBox copyLabel={id}>{data.problem}</OppgavetekstBox>
      </div>

      {/* Hva vet vi / Hva skal vi finne */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva vet vi?</p>
          <div className="text-sm">{data.knowns}</div>
        </div>
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Hva skal vi finne?</p>
          <div className="text-sm">{data.unknowns}</div>
        </div>
      </div>

      {/* Strategi */}
      <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 mb-4">
        <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Strategi</p>
        <div className="text-sm">{data.strategy}</div>
      </div>

      {/* Hint */}
      {data.hints.length > 0 && (
        <div className="rounded-lg bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-amber-700 dark:text-amber-400">Hint</p>
            <div className="flex gap-2">
              {visibleHints > 0 && (
                <button
                  onClick={() => setVisibleHints(0)}
                  className="text-xs px-2 py-1 rounded border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/20"
                >
                  Skjul alle
                </button>
              )}
              {visibleHints < data.hints.length && (
                <button
                  onClick={() => setVisibleHints(visibleHints + 1)}
                  className="text-xs px-2 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium"
                >
                  Vis {visibleHints === 0 ? "hint" : "neste hint"} ({visibleHints + 1}/{data.hints.length})
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {data.hints.slice(0, visibleHints).map((hint, idx) => (
              <div key={idx} className="rounded border border-amber-200 dark:border-amber-800 bg-white/70 dark:bg-black/20 p-3">
                <p className="text-xs uppercase tracking-wide font-semibold text-amber-700 dark:text-amber-400 mb-1">
                  {hint.label}
                </p>
                <div className="text-sm">{hint.content}</div>
              </div>
            ))}
            {visibleHints === 0 && (
              <p className="text-xs text-[var(--muted)] italic">
                Prøv først selv. Klikk for å vise hint ett etter ett.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Løsning */}
      <div className="mb-4">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="w-full rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/15 text-[var(--accent)] font-medium py-2.5 px-4 flex items-center justify-between"
        >
          <span>{showSolution ? "Skjul" : "Vis"} fullstendig løsning</span>
          <span className="text-sm">{showSolution ? "▲" : "▼"}</span>
        </button>
        {showSolution && (
          <div className="mt-3 rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-4">
            <p className="font-semibold mb-3">Løsning</p>
            <div className="space-y-2 text-sm">{data.solution}</div>
          </div>
        )}
      </div>

      {/* Alternativ løsning */}
      {data.alternativeSolution && (
        <div className="mb-4">
          <button
            onClick={() => setShowAlternative(!showAlternative)}
            className="w-full rounded-lg border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-medium py-2 px-4 flex items-center justify-between text-sm"
          >
            <span>{showAlternative ? "Skjul" : "Vis"} alternativ tilnærming</span>
            <span>{showAlternative ? "▲" : "▼"}</span>
          </button>
          {showAlternative && (
            <div className="mt-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Alternativ tilnærming</p>
              <div className="text-sm">{data.alternativeSolution}</div>
            </div>
          )}
        </div>
      )}

      {/* Hva lærte vi */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
        <div className="text-sm">{data.summary}</div>
      </div>
    </div>
  );
}

export default function Kapittel24OppgaverPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const selectedData = selectedExercise ? exercises[selectedExercise] : null;

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
          <span className="text-[var(--foreground)]">Kapittel 24</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Kapittel 24 — Kapasitans og dielektrika</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics sortert etter delkapittel. Velg en seksjon og deretter en oppgave.
        </p>
        <Link href="/ing164/kapittel-24/teori" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          Les teori for kapittel 24
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
      {selectedExercise && selectedData && (
        <ExerciseView
          key={selectedExercise}
          id={selectedExercise}
          data={selectedData}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {selectedExercise && !selectedData && (
        <div className="mt-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Oppgave {selectedExercise}</h3>
            <button onClick={() => setSelectedExercise(null)} className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">Lukk</button>
          </div>
          <div className="rounded-lg border-2 border-dashed border-[var(--card-border)] p-8 text-center">
            <p className="text-[var(--muted)] font-medium">Oppgavetekst og løsning kommer snart</p>
            <p className="text-xs text-[var(--muted)] mt-1">Oppgave {selectedExercise} fra University Physics</p>
          </div>
        </div>
      )}
    </div>
  );
}
