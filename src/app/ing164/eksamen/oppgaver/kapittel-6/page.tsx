"use client";

import { useState } from "react";
import Link from "next/link";
import CollapsibleSection from "@/components/CollapsibleSection";

const sections = [
  { id: "6.1", title: "Arbeid", exercises: ["6.1", "6.2", "6.3", "6.5", "6.6", "6.8"] },
  { id: "6.2", title: "Kinetisk energi og arbeid-energi-teoremet", exercises: ["6.19", "6.20", "6.24", "6.25", "6.26", "6.28", "6.31"] },
  { id: "6.3", title: "Arbeid og energi med varierende krefter", exercises: ["6.32", "6.33", "6.34", "6.37", "6.44", "6.45"] },
  { id: "6.4", title: "Effekt", exercises: ["6.47", "6.50", "6.54", "6.55"] },
  { id: "problems", title: "Problems", exercises: ["6.58", "6.59", "6.67", "6.71", "6.75", "6.81", "6.82", "6.85"] },
];

export default function Kapittel6OppgaverPage() {
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
          <span className="text-[var(--foreground)]">Kapittel 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Kapittel 6 — Arbeid og kinetisk energi</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics sortert etter delkapittel. Velg en seksjon og deretter en oppgave.
        </p>
        <Link href="/ing164/kapittel-6/teori" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          Les teori for kapittel 6
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
