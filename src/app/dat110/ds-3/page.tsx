"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-3")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/ds-3/teori",
    title: "Teori",
    description:
      "Prosesser vs tråder, flertrådede servere (thread-per-request, thread pool), virtualisering, klient/server-design og kode-migrasjon.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/ds-3/formler",
    title: "Formler",
    description:
      "Sammenligningstabeller for prosesser vs tråder, servermønstre (iterativ, flertrå), virtualiseringstyper og migrasjonsformer.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-3/oppgaver",
    title: "Oppgaver",
    description:
      "Velg riktig servermønster for et scenario, forklar fordeler med tråder vs prosesser, beskriv kode-migrasjon og eksamensoppgaver.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-3/visualiseringer",
    title: "Visualiseringer",
    description:
      "Animert sammenligning av iterativ vs flertrå server, virtualiseringslagmodell og kode-migrasjon med tilstandskomponenter.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "3.1 Prosesser i distribuerte systemer — oppstart og kommunikasjon",
  "3.1 Tråder — lettere enn prosesser, delt minnerom",
  "3.1 Flertrådede servere — thread-per-request og thread pool",
  "3.1 Server-clustering og lastbalansering",
  "3.2 Virtualisering — typer (full, para, prosess-VM) og relevans for DS",
  "3.2 Containere og mikrotjenester (oversikt)",
  "3.3 Klienter — tynne vs tykke klienter, brukergrensesnitt",
  "3.3 Servere — concurrent vs iterative, tilstandsløse vs tilstandsfulle",
  "3.4 Kode-migrasjon — svak vs sterk mobilitet, push vs pull",
];

export default function DS3Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Prosesser og tråder er de grunnleggende utførselsenhetene i distribuerte
        systemer. Her lærer du forskjellen mellom dem, hvordan{" "}
        <strong>flertrådede servere</strong> håndterer mange samtidige
        klienter, og hva <strong>kode-migrasjon</strong> innebærer i
        distribuerte omgivelser.
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
          Eksamenstips for DS-3
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Tråder deler adresserom — raskere kontekstbytte men fare for race conditions</li>
          <li>▸ Thread pool: fordeler — unngår overhead av å opprette ny tråd per request</li>
          <li>▸ Tilstandsløse servere er lettere å skalere — forklar hvorfor</li>
          <li>▸ Kode-migrasjon: svak mobilitet (bare kode), sterk mobilitet (kode + tilstand + ressurser)</li>
        </ul>
      </div>
    </div>
  );
}
