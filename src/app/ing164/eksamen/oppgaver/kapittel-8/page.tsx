"use client";

import { useState } from "react";
import Link from "next/link";
import CollapsibleSection from "@/components/CollapsibleSection";

const sections = [
  {
    id: "8.1",
    title: "Bevegelsesmengde og kraftimpuls",
    exercises: ["8.1", "8.3", "8.5", "8.7", "8.8", "8.9", "8.10", "8.11"],
  },
  {
    id: "8.2",
    title: "Bevaring av bevegelsesmengde",
    exercises: ["8.16", "8.20", "8.21", "8.24", "8.27", "8.30"],
  },
  {
    id: "8.3",
    title: "Kollisjoner",
    exercises: ["8.33", "8.36", "8.37", "8.41", "8.42", "8.43"],
  },
  {
    id: "8.4",
    title: "Elastiske kollisjoner",
    exercises: ["8.46", "8.48"],
  },
  {
    id: "8.5",
    title: "Massesenter",
    exercises: ["8.52", "8.54", "8.56", "8.58", "8.59"],
  },
  {
    id: "problems",
    title: "Problems",
    exercises: ["8.64", "8.65", "8.69", "8.79", "8.81", "8.83", "8.85", "8.88", "8.92", "8.96"],
  },
];

export default function Kapittel8OppgaverPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

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
          <span className="text-[var(--foreground)]">Kapittel 8</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Kapittel 8 — Bevegelsesmengde, kraftimpuls og kollisjoner</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics sortert etter delkapittel. Velg en seksjon og deretter en oppgave.
        </p>
        <Link href="/ing164/kapittel-8/teori" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          Les teori for kapittel 8
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

      {/* Selected exercise placeholder */}
      {selectedExercise && (
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
