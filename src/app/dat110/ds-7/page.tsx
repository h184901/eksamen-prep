"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-7")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/ds-7/teori",
    title: "Teori",
    description:
      "Data-sentrerte konsistensmodeller (strict, sequential, causal), klient-sentrerte modeller (monotonic reads/writes, read-your-writes), primary-based og quorum-replikering.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/ds-7/formler",
    title: "Formler",
    description:
      "Quorum-betingelse N_R + N_W > N, skrive-quorum N_W > N/2, replikeringsprotokoll-oversikt og konsistensmodellhierarki.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-7/oppgaver",
    title: "Oppgaver",
    description:
      "Klassifiser operasjoner etter konsistensmodell, beregn gyldige quorum-konfigurasjoner og eksamensspørsmål om replikeringsstrategier.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-7/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv quorum-kalkulator, konsistensmodell-sammenligning med eksempelscenarioer og primary-backup replikering animert.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "7.1 Introduksjon til konsistens og replikering",
  "7.2 Data-sentrerte konsistensmodeller — strict, linearizable, sequential",
  "7.2 Kausal konsistens og FIFO-konsistens",
  "7.3 Klient-sentrerte konsistensmodeller — monotonic reads, monotonic writes",
  "7.3 Read-your-writes og writes-follow-reads",
  "7.4 Replikasjonshåndtering — primary-based (primary-backup, local-write)",
  "7.4 Replikerte write-protokoller — active replication",
  "7.5 Quorum-basert protokoll — N_R + N_W > N og N_W > N/2",
];

export default function DS7Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Replikering øker tilgjengeligheten og ytelsen, men skaper
        konsistensutfordringer: hvilke garantier kan vi gi om at alle kopier er
        like? Her lærer du spekteret fra <strong>strict konsistens</strong> til
        svakere modeller, og protokoller som{" "}
        <strong>quorum-basert replikering</strong> for å balansere ytelse og
        korrekthet.
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
          Eksamenstips for DS-7
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Quorum: N_R + N_W &gt; N hindrer read-write konflikter; N_W &gt; N/2 hindrer write-write</li>
          <li>▸ Klient-sentrerte modeller: hvilke garantier gis og for hvem (bare den samme klienten)</li>
          <li>▸ Primary-backup: skriver kun til primær, lesing kan gå til replikaer — svekker konsistens</li>
          <li>▸ Sequential vs causal konsistens: kausal tillater mer parallellisme</li>
        </ul>
      </div>
    </div>
  );
}
