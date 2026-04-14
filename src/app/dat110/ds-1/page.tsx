"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-1")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/ds-1/teori",
    title: "Teori",
    description:
      "Definisjon av distribuerte systemer, de 8 transparenstypene, skalerbarhetsdimensjoner, arkitekturtyper (klient-server, P2P, hybrid) og middleware.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/ds-1/formler",
    title: "Formler",
    description:
      "Sammenligningstabeller for arkitekturtyper, transparensoversikt med eksempler, og design-mål med motsetninger (skalerbarhet vs konsistens).",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-1/oppgaver",
    title: "Oppgaver",
    description:
      "Identifiser transparenstyper i et scenario, sammenlign P2P og klient-server, forklar design-målkonflikter og flervalgsoppgaver fra eksamen.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-1/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv arkitekturdiagram som viser klient-server vs P2P, transparenstyper forklart med scenarieeksempler og middleware-lagmodell.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "1.1 Definisjon av distribuerte systemer — en samling uavhengige noder",
  "1.2 Design-mål — ressursdeling, åpenhet, skalerbarhet, feiltoleranse",
  "1.3 Transparenstyper — access, location, migration, replication, concurrency, failure, performance, scaling",
  "1.4 Typer distribuerte systemer — beregnings-, informasjons- og pervasive systemer",
  "2.1 Arkitekturstiler — klient-server, P2P, hybrid",
  "2.2 Middleware — hva det er og hva det gir",
  "2.3 Sentraliserte, desentraliserte og hybride arkitekturer",
  "2.4 Systemarktitektur i praksis — web og fil-deling som eksempler",
];

export default function DS1Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Distribuerte systemer er datamaskiner som samarbeider over et nettverk
        og fremstår som ett sammenhengende system for brukeren. Her legger vi
        grunnlaget: <strong>hva er et distribuert system</strong>, hva er de
        viktige <strong>design-målene</strong>, og hvilke{" "}
        <strong>arkitekturtyper</strong> finnes det?
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
              <span className="text-network-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
          Eksamenstips for DS-1
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ De 8 transparenstypene er klassisk flervalg — lær hva hver type skjuler for brukeren</li>
          <li>▸ Skalerbarhet: tre dimensjoner — størrelse, geografisk og administrativ skalering</li>
          <li>▸ Mellomvare (middleware) — hva det er og hvorfor det letter utvikling av DS</li>
          <li>▸ Klient-server vs P2P: kjenn fordeler, ulemper og typiske brukstilfeller for begge</li>
        </ul>
      </div>
    </div>
  );
}
