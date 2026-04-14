"use client";

import { useState } from "react";
import Link from "next/link";
import CollapsibleSection from "@/components/CollapsibleSection";

const sections = [
  { id: "3.1", title: "Posisjon og hastighet i 2D/3D", exercises: ["3.1", "3.3", "3.4"] },
  { id: "3.2", title: "Akselerasjon i 2D/3D", exercises: ["3.5", "3.7", "3.8"] },
  { id: "3.3", title: "Prosjektilbevegelse", exercises: ["3.9", "3.10", "3.16", "3.17", "3.21"] },
  { id: "3.4", title: "Sirkelbevegelse", exercises: ["3.25", "3.28", "3.31"] },
  { id: "problems", title: "Problems", exercises: ["3.46", "3.48", "3.61"] },
];

export default function Kapittel3OppgaverPage() {
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
          <span className="text-[var(--foreground)]">Kapittel 3</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Kapittel 3 — Bevegelse i 2D og 3D</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics sortert etter delkapittel. Velg en seksjon og deretter en oppgave.
        </p>
        <Link href="/ing164/kapittel-3/teori" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          Les teori for kapittel 3
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
            {section.exercises.length === 0 ? (
              <p className="text-sm text-[var(--muted)] italic">Ingen oppgaver for dette delkapittelet</p>
            ) : (
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
