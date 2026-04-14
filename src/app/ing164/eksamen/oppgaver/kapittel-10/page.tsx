"use client";

import { useState } from "react";
import Link from "next/link";
import CollapsibleSection from "@/components/CollapsibleSection";

const sections = [
  {
    id: "10.1",
    title: "Dreiemoment",
    exercises: ["10.1", "10.2", "10.3", "10.4"],
  },
  {
    id: "10.2",
    title: "Dreiemoment og vinkelakselerasjon",
    exercises: ["10.9", "10.10", "10.11", "10.14"],
  },
  {
    id: "10.3",
    title: "Stive legemer i likevekt",
    exercises: ["10.21", "10.22", "10.23", "10.24", "10.30"],
  },
  {
    id: "10.4",
    title: "Rulling",
    exercises: ["10.32", "10.33", "10.35", "10.36"],
  },
  {
    id: "10.5",
    title: "Arbeid og effekt i rotasjon",
    exercises: ["10.37", "10.38", "10.39"],
  },
  {
    id: "10.6",
    title: "Spinn (angulært moment)",
    exercises: ["10.42", "10.45", "10.46", "10.47", "10.50"],
  },
  {
    id: "problems",
    title: "Problems",
    exercises: ["10.58", "10.61", "10.64", "10.65", "10.66", "10.69", "10.74", "10.79", "10.87"],
  },
];

export default function Kapittel10OppgaverPage() {
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
          <span className="text-[var(--foreground)]">Kapittel 10</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Kapittel 10 — Dynamikk i rotasjonsbevegelse</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics sortert etter delkapittel. Velg en seksjon og deretter en oppgave.
        </p>
        <Link href="/ing164/kapittel-10/teori" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          Les teori for kapittel 10
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
