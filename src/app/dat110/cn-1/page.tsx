"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-1")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/cn-1/teori",
    title: "Teori",
    description:
      "Internett-arkitektur (edge, core, access), TCP/IP 5-lagsmodell, kapsling, forsinkelsestyper og pakkeswitching vs kretsswitching.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/dat110/cn-1/formler",
    title: "Formler",
    description:
      "Alle nøkkelformler for forsinkelse, trafikkintensitet og gjennomstrømning — med forklaringer og «når bruker du hva»-guide.",
    color: "border-cyan-400",
    icon: "🧮",
  },
  {
    href: "/dat110/cn-1/oppgaver",
    title: "Oppgaver",
    description:
      "Professorens øvingsoppgaver med løsninger, eksamensoppgaver fra 2024 og 2025, og selvgenererte oppgaver i eksamensstil.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/cn-1/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv forsinkelseskalkulator og TCP/IP-lagmodell — endre parametere og se forsinkelsene beregnet live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "1.1 Hva er internett? — nøtt-og-bolt-perspektivet",
  "1.2 Nettverkskanten (hosts, applikasjoner, aksessnettverk)",
  "1.3 Nettverkskjernen — pakkeswitching og kretsswitching",
  "1.4 Forsinkelse, tap og gjennomstrømning",
  "1.5 Protokolllag og tjenestemodeller",
  "1.6 Angrep på nettverk (oversikt)",
  "1.7 Historikk om internett og datanettverk",
];

export default function CN1Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Dette kapittelet gir deg grunnlaget for hele faget. Du lærer hva internett
        er bygget av, hvordan protokollstakken organiserer kommunikasjon i lag,
        og — viktigst for eksamen — hvordan du beregner{" "}
        <strong>forsinkelser</strong> og <strong>gjennomstrømning</strong> i et
        pakkeswitchet nettverk.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`block rounded-xl border-2 ${page.color} bg-[var(--card)] p-5 hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{page.icon}</span>
              <h2 className="font-bold text-lg">{page.title}</h2>
            </div>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Temaer i dette kapittelet</h2>
        <ul className="space-y-2">
          {temaer.map((tema) => (
            <li key={tema} className="flex items-start gap-2 text-sm">
              <span className="text-blue-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
          Eksamenstips for CN-1
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Eksamen 2025 (oppgave 3): beregning av nodeforsinkelse over 2 hopp</li>
          <li>▸ Eksamen 2024: gjennomstrømning og flaskehalspunkt med 4 servere/klienter</li>
          <li>▸ Trafikkintensitet La/R og hva som skjer når den nærmer seg 1 er typisk flervalg</li>
          <li>▸ Kjenner du TCP/IP-lagene og hva hvert lag heter på datagramnivå er du godt rustet</li>
        </ul>
      </div>
    </div>
  );
}
