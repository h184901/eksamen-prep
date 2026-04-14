"use client";

import { useState } from "react";
import Link from "next/link";

const obliger = [
  {
    id: "oblig1",
    title: "Oblig 1",
    description: "Kinematikk, Newtons lover og friksjon",
    chapters: "Kap 2–5",
    topics: ["Rettlinjet bevegelse", "Prosjektilbevegelse", "Newtons lover", "Friksjon og skraplan"],
    color: "physics",
  },
  {
    id: "oblig2",
    title: "Oblig 2",
    description: "Arbeid, energi, bevegelsesmengde og rotasjon",
    chapters: "Kap 6–10",
    topics: ["Arbeid og kinetisk energi", "Energibevaring", "Kollisjoner", "Treghetsmoment", "Dreiemoment"],
    color: "physics",
  },
  {
    id: "oblig3",
    title: "Oblig 3",
    description: "Elektrisitet og magnetisme",
    chapters: "Kap 21–29",
    topics: ["Coulombs lov", "Elektrisk felt", "Potensial", "Kapasitans", "Magnetfelt", "Induksjon"],
    color: "network",
  },
];

export default function ObligerPage() {
  const [selected, setSelected] = useState<string | null>(null);

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
          <span className="text-[var(--foreground)]">Obliger</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Obligatoriske oppgaver</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle oppgavene fra de tre obligatoriske innleveringene med fullstendige
          løsningsforslag, formelhenvisninger og lenker til relevant teori.
        </p>
      </div>

      {/* Oblig selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {obliger.map((ob) => (
          <button
            key={ob.id}
            onClick={() => setSelected(selected === ob.id ? null : ob.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === ob.id
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)] hover:border-[var(--accent)]"
            }`}
          >
            {ob.title}
          </button>
        ))}
      </div>

      {/* Oblig cards */}
      <div className="space-y-6">
        {obliger
          .filter((ob) => !selected || selected === ob.id)
          .map((ob) => (
            <div
              key={ob.id}
              className={`rounded-xl border-2 p-6 transition-all ${
                ob.color === "network"
                  ? "border-network-400/30 bg-gradient-to-br from-network-50/30 to-blue-50/30 dark:from-network-950/20 dark:to-blue-950/20"
                  : "border-physics-400/30 bg-gradient-to-br from-physics-50/30 to-orange-50/30 dark:from-physics-950/20 dark:to-orange-950/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">{ob.title}</h2>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      ob.color === "network"
                        ? "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400"
                        : "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400"
                    }`}
                  >
                    {ob.chapters}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">{ob.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {ob.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--card)] border border-[var(--card-border)] text-[var(--muted)]"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Placeholder for exercises */}
              <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-8 text-center">
                <p className="text-lg font-semibold text-[var(--muted)] mb-1">Oppgaver kommer snart</p>
                <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                  Her vil du finne alle oppgavene fra {ob.title.toLowerCase()} med
                  hint, formler og fullstendige losningsforslag.
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
