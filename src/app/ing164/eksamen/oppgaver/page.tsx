"use client";

import { useState } from "react";
import Link from "next/link";

const chapterGroups = [
  {
    category: "Bevegelse",
    color: "physics",
    chapters: [
      { id: 2, title: "Rettlinjet bevegelse", topics: ["Forflytning", "Hastighet", "Akselerasjon", "Fritt fall"], count: 30 },
      { id: 3, title: "Bevegelse i 2D og 3D", topics: ["Vektorer", "Prosjektilbevegelse", "Sirkelbevegelse"], count: 17 },
    ],
  },
  {
    category: "Mekanikk",
    color: "physics",
    chapters: [
      { id: 4, title: "Newtons lover", topics: ["Kraft", "F = ma", "Frilegmediagram"], count: 24 },
      { id: 5, title: "Anvendelse av Newtons lover", topics: ["Friksjon", "Skraplan", "Sentripetalkraft"], count: 28 },
      { id: 6, title: "Arbeid og kinetisk energi", topics: ["Arbeid", "KE", "Arbeid-energi-teoremet"], count: 29 },
      { id: 7, title: "Potensiell energi", topics: ["Gravitasjonell PE", "Elastisk PE", "Energibevaring"], count: 7 },
      { id: 8, title: "Bevegelsesmengde", topics: ["Impuls", "Kollisjoner", "Massesenter"], count: 39 },
    ],
  },
  {
    category: "Rotasjon",
    color: "physics",
    chapters: [
      { id: 9, title: "Rotasjon av stive legemer", topics: ["Vinkelkinematikk", "Treghetsmoment"], count: 22 },
      { id: 10, title: "Dynamikk i rotasjonsbevegelse", topics: ["Dreiemoment", "Spinn", "Rotasjonsenergi"], count: 33 },
    ],
  },
  {
    category: "Elektrisitet & Magnetisme",
    color: "network",
    chapters: [
      { id: 21, title: "Elektrisk ladning og felt", topics: ["Coulombs lov", "E-felt", "Feltlinjer"], count: 18 },
      { id: 23, title: "Elektrisk potensial", topics: ["Spenning", "Potensiell energi", "Ekvipotensial"], count: 16 },
      { id: 24, title: "Kapasitans og dielektrika", topics: ["Kondensatorer", "Serie/parallell", "Dielektrikum"], count: 16 },
      { id: 27, title: "Magnetisk felt og krefter", topics: ["Lorentz-kraft", "Hoyrehandsregelen"], count: 14 },
      { id: 28, title: "Kilder til magnetfelt", topics: ["Biot-Savart", "Amperes lov", "Solenoid"], count: 11 },
      { id: 29, title: "Elektromagnetisk induksjon", topics: ["Faradays lov", "Lenz' lov", "Induktans"], count: 12 },
    ],
  },
];

export default function OppgaverPage() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  return (
    <div>
      {/* Breadcrumb & header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <Link href="/ing164/eksamen" className="hover:text-[var(--accent)]">Eksamensøving</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Oppgaver fra boken</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Oppgaver fra boken</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Utvalgte oppgaver fra University Physics (Young & Freedman) sortert
          etter kapittel. Velg et kapittel for å se oppgaver med hint og
          fullstendige løsningsforslag.
        </p>
      </div>

      {/* Chapter selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedChapter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedChapter === null
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"
          }`}
        >
          Alle kapitler
        </button>
        {chapterGroups.flatMap((g) =>
          g.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(selectedChapter === ch.id ? null : ch.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChapter === ch.id
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"
              }`}
            >
              Kap {ch.id}
            </button>
          ))
        )}
      </div>

      {/* Chapter groups */}
      <div className="space-y-8">
        {chapterGroups.map((group) => {
          const visibleChapters = group.chapters.filter(
            (ch) => !selectedChapter || selectedChapter === ch.id
          );
          if (visibleChapters.length === 0) return null;

          return (
            <div key={group.category}>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                {group.category}
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    group.color === "network"
                      ? "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400"
                      : "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400"
                  }`}
                >
                  {visibleChapters.length} kap
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleChapters.map((ch) => (
                  <Link
                    key={ch.id}
                    href={`/ing164/eksamen/oppgaver/kapittel-${ch.id}`}
                    className={`group rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                      group.color === "network"
                        ? "border-network-400/20 bg-network-50/20 dark:bg-network-950/10 hover:border-network-400/50"
                        : "border-physics-400/20 bg-physics-50/20 dark:bg-physics-950/10 hover:border-physics-400/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-bold ${
                          group.color === "network"
                            ? "text-network-600 dark:text-network-400"
                            : "text-physics-600 dark:text-physics-400"
                        }`}
                      >
                        Kapittel {ch.id}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">{ch.count} oppgaver</span>
                    </div>
                    <h3 className="font-semibold mb-2">{ch.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ch.topics.map((t) => (
                        <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-[var(--background)] text-[var(--muted)]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] group-hover:underline">
                      Se oppgaver
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
