"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-5")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/ds-5/teori",
    title: "Teori",
    description:
      "Fysiske og logiske klokker, Lamport-klokker, vektorklokker, happens-before relasjon, gjensidig utelukkelse (mutex), distribuerte mutex-algoritmer og ledervalg (bully og ring).",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/ds-5/formler",
    title: "Formler",
    description:
      "Lamport-klokkeoppdateringsregler, vektorklokke-komparasjon, Ricart-Agrawala-algoritmen, bully-algoritme steg for steg og ring-ledervalg.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-5/oppgaver",
    title: "Oppgaver",
    description:
      "Spor Lamport-klokker gjennom en meldingsutveksling, sammenlign vektorklokker, simuler mutex-forespørsler og kjør ledervalg for hånd.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-5/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv Lamport-klokke-animasjon med meldingsutveksling, vektorklokke-tableau og bully-algoritme steg for steg.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "5.1 Klokkesynchronisering — fysiske klokker og NTP",
  "5.2 Logiske klokker — Lamport-klokker og happens-before relasjonen (→)",
  "5.2 Vektorklokker — kausal orden og samtidighet",
  "5.3 Gjensidig utelukkelse (mutex) — sentralisert, distribuert og token-ring",
  "5.3 Ricart-Agrawala-algoritmen for distribuert mutex",
  "5.4 Ledervalg — behov og algoritmer",
  "5.4 Bully-algoritmen — den høyeste ID-en vinner",
  "5.4 Ring-algoritmen — token sendes rundt i en logisk ring",
];

export default function DS5Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        I et distribuert system finnes det ingen global klokke — hvert noder har
        sin egen tid. Her lærer du <strong>Lamport-klokker</strong> og{" "}
        <strong>vektorklokker</strong> for å ordne hendelser, og algoritmer for{" "}
        <strong>gjensidig utelukkelse</strong> og{" "}
        <strong>ledervalg</strong> som koordinerer nodene.
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
          Eksamenstips for DS-5
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Lamport-klokker: ved mottak → C = max(lokal, mottatt) + 1</li>
          <li>▸ Vektorklokker kan påvise kausalitet; Lamport kan ikke — forklar forskjellen</li>
          <li>▸ Bully-algoritme: hva skjer når en node kommer tilbake etter utfall?</li>
          <li>▸ Mutex-algoritmer: kjenn antall meldinger som kreves (Ricart-Agrawala: 2(N-1))</li>
          <li>▸ Koordineringskapittelet er hyppig på eksamen — øv på å spore klokker gjennom diagram</li>
        </ul>
      </div>
    </div>
  );
}
