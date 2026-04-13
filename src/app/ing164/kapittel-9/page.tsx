"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 9)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-9/teori",
    title: "Teori",
    description:
      "Vinkelhastighet, vinkelakselerasjon, kinematikk, treghetsmoment og parallellakse-teoremet — forklart med intuisjon og analogier til lineær bevegelse.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-9/formler",
    title: "Formler",
    description:
      "Alle formler for rotasjonsbevegelse med fargekoding, forklaringer og en «når bruker du hva»-guide.",
    color: "border-amber-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-9/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-9/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv analogi-tabell, treghetsmoment-visualisering og parallellakse-teoremet — juster parametere og se resultatet live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "9.1 Vinkelhastighet og vinkelakselerasjon",
  "9.2 Rotasjon med konstant vinkelakselerasjon",
  "9.3 Sammenheng mellom lineær og vinkelstørrelser",
  "9.4 Treghetsmoment og rotasjonsenergi",
  "9.5 Parallellakse-teoremet",
];

export default function Kapittel9Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 9 handler om <strong>rotasjon av stive legemer</strong> — den
        andre grunnleggende bevegelsesformen i mekanikk. Du lærer å beskrive
        rotasjon med vinkelstørrelser, beregne treghetsmoment for ulike
        geometrier, og bruke parallellakse-teoremet. Alt er analogt med lineær
        bevegelse!
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

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="font-bold text-lg mb-4">Temaer i dette kapittelet</h2>
        <ul className="space-y-2">
          {temaer.map((tema) => (
            <li key={tema} className="flex items-start gap-2 text-sm">
              <span className="text-orange-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
