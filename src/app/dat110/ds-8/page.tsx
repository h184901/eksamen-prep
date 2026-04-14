"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-8")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/ds-8/teori",
    title: "Teori",
    description:
      "Feiltyper (crash, omission, timing, Byzantine), Byzantine feiltoleranse og 3k+1-regelen, RPC feilklasser, flat vs hierarkisk gruppe, pålitelig multicast og checkpointing.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/ds-8/formler",
    title: "Formler",
    description:
      "Byzantine-betingelsen (N ≥ 3k+1), RPC feilklasse-oversikt, reliable multicast-protokoller og checkpointing vs message logging.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-8/oppgaver",
    title: "Oppgaver",
    description:
      "Klassifiser feiltyper i et scenario, beregn nødvendig antall noder for Byzantine toleranse, forklar recovery-strategier og eksamensoppgaver.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-8/visualiseringer",
    title: "Visualiseringer",
    description:
      "Byzantine general-problemet animert, feilklasse-hierarki interaktivt og checkpointing vs rollback-recovery illustrert.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "8.1 Introduksjon til feiltoleranse — hva er en feil?",
  "8.2 Feilmodeller — crash failure, omission, timing, Byzantine (vilkårlig)",
  "8.2 Byzantine feiltoleranse — generalproblem og 3k+1-regelen",
  "8.3 Pålitelig klient-server-kommunikasjon — RPC feilklasser (5 typer)",
  "8.4 Pålitelig gruppekommununikasjon — flat og hierarkisk gruppe",
  "8.4 Pålitelig multicast — FIFO- og kausal levering",
  "8.5 Failure masking gjennom redundans",
  "8.6 Recovery — checkpointing og meldingslogging",
  "8.6 Stabile lagringsmedier og rollback recovery",
];

export default function DS8Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Feiltoleranse handler om å lage systemer som <strong>fortsetter å
        fungere</strong> selv når komponenter feiler. Her lærer du
        feilklassifisering fra enkle krasj til ondsinnet{" "}
        <strong>Byzantine-adferd</strong>, og teknikker som checkpointing og
        redundans for å gjenopprette korrekt tilstand.
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
          Eksamenstips for DS-8
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Byzantine-betingelsen: for å tolerere k Byzantine-feil trengs N ≥ 3k+1 noder</li>
          <li>▸ RPC feilklasser (5): normal, server krasjer (to typer), nettverk, klient krasjer — kjenn alle</li>
          <li>▸ Flat gruppe vs hierarkisk gruppe — hvilken er mest skalerbar og hvorfor?</li>
          <li>▸ Checkpointing: koordinert vs ukoordinert — hva er domino-effekten?</li>
        </ul>
      </div>
    </div>
  );
}
