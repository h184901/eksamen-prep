"use client";

import Link from "next/link";

const oppgaver = [
  { id: 1, label: "Oppg 1", title: "Flervalg", weight: "10%", color: "emerald" },
  { id: 2, label: "Oppg 2", title: "Oblig-prosjekt", weight: "10%", color: "purple" },
  { id: 3, label: "Oppg 3", title: "Forsinkelser", weight: "10%", color: "network" },
  { id: 4, label: "Oppg 4", title: "Protokoller", weight: "10%", color: "network" },
  { id: 5, label: "Oppg 5", title: "Ruting", weight: "10%", color: "network" },
  { id: 6, label: "Oppg 6", title: "ARP og Switch", weight: "10%", color: "network" },
  { id: 7, label: "Oppg 7", title: "DS-teori", weight: "5%", color: "blue" },
  { id: 8, label: "Oppg 8", title: "Overlay og multicast", weight: "10%", color: "blue" },
  { id: 9, label: "Oppg 9", title: "Konsistens og klokker", weight: "10%", color: "blue" },
  { id: 10, label: "Oppg 10", title: "DHT/Chord", weight: "15%", color: "blue" },
];

const colorStyles: Record<string, string> = {
  emerald: "border-emerald-400/40 hover:border-emerald-400/80 text-emerald-600 dark:text-emerald-400",
  purple: "border-purple-400/40 hover:border-purple-400/80 text-purple-600 dark:text-purple-400",
  network: "border-network-400/40 hover:border-network-400/80 text-network-600 dark:text-network-400",
  blue: "border-blue-400/40 hover:border-blue-400/80 text-blue-600 dark:text-blue-400",
};

export default function EksamenPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamensoppgaver</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Eksamensoppgaver</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-6">
        Alle eksamensoppgaver fra 2022–2025 er nå organisert etter oppgavetype
        under Eksamensøving. Velg en oppgavetype nedenfor for å se tidligere
        eksamensoppgaver med trinnvise løsninger.
      </p>

      <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-5 mb-8">
        <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
          Nytt oppsett
        </h3>
        <p className="text-sm text-emerald-900 dark:text-emerald-200">
          Eksamensoppgavene er nå sortert etter oppgavetype i stedet for år.
          Dette gjør det lettere å øve systematisk — du ser alle varianter av
          samme oppgavetype samlet, med mønstergjenkjenning og felles strategier.
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <Link
            href="/dat110/eksamenoving/eksamensoppgaver"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors"
          >
            Grundig eksamensgjennomgang
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/dat110/eksamenoving"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
          >
            Gå til Eksamensøving
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Tidligere oppgaver etter type</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {oppgaver.map((oppg) => (
          <Link
            key={oppg.id}
            href={`/dat110/eksamenoving/oppg-${oppg.id}/tidligere`}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl border-2 bg-[var(--card)] transition-all hover:shadow-md ${colorStyles[oppg.color]}`}
          >
            <div className="text-right">
              <p className="text-xs font-bold">{oppg.weight}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold opacity-70">{oppg.label}</p>
              <p className="font-bold">{oppg.title}</p>
            </div>
            <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 p-4">
        <h3 className="font-bold text-sm mb-2">Eksamensår dekket</h3>
        <div className="flex flex-wrap gap-2">
          {["2022", "Jan 2024", "Mai 2024", "Jan 2025"].map((year) => (
            <span key={year} className="text-xs font-bold px-3 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
              {year}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">
          Alle oppgaver har fullstendige løsningsforslag med steg-for-steg
          forklaringer, formler og eksamenstips.
        </p>
      </div>
    </div>
  );
}
