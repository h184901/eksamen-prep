"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 4)!;

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-4/teori",
    title: "Teori",
    description:
      "Newtons tre lover, kraft og vekselvirkning, masse og tyngde, fritt-legeme-diagrammer — med intuisjon og eksempler.",
    border: "border-orange-400",
    bg: "hover:bg-orange-50 dark:hover:bg-orange-950/20",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-4/formler",
    title: "Formler",
    description:
      "Alle nøkkelformler med forklaring: ΣF = ma, G = mg, kraftdekomponering, kraft–motkraft. Inkludert «når bruker du hva»-tabell.",
    border: "border-yellow-400",
    bg: "hover:bg-yellow-50 dark:hover:bg-yellow-950/20",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-4/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler fra forelesning, øvingsoppgaver fra oblig, og eksamensoppgaver med fullstendige løsninger.",
    border: "border-red-400",
    bg: "hover:bg-red-50 dark:hover:bg-red-950/20",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-4/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktive simulatorer: kraftdekomponering med slider, masse vs. tyngde (jord og måne), og fritt-legeme-diagram for ulike scenarioer.",
    border: "border-blue-400",
    bg: "hover:bg-blue-50 dark:hover:bg-blue-950/20",
    icon: "📊",
  },
];

const temaer = [
  "4.1 Kraft og vekselvirkning — kontakt- og fjernkrefter",
  "4.2 Newtons første lov — treghetsloven (ΣF = 0 ↔ v = konstant)",
  "4.3 Newtons andre lov — ΣF = ma, komponentform",
  "4.4 Masse og tyngde — G = mg, forskjellen mellom masse og tyngde",
  "4.5 Newtons tredje lov — kraft–motkraft-par",
  "4.6 Fritt-legeme-diagrammer — fremgangsmåte og teknikk",
];

export default function Kapittel4Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <p className="text-[var(--muted)] mt-4 mb-8 max-w-2xl">
        Kapittel 4 introduserer Newtons tre lover — selve grunnlaget for klassisk mekanikk.
        Du lærer å tegne fritt-legeme-diagrammer, dekomponere krefter og sette opp
        bevegelseslikninger for ett eller flere legemer. Dette er det viktigste kapittelet
        i pensum — nesten alle mekanikkoppgaver på eksamen bruker disse lovene.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`rounded-xl border-2 ${page.border} ${page.bg} bg-[var(--card)] p-5 transition-colors block`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{page.icon}</span>
              <h2 className="text-lg font-bold">{page.title}</h2>
            </div>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="font-semibold text-lg mb-3">Temaer i dette kapittelet</h2>
        <ul className="space-y-2">
          {temaer.map((tema) => (
            <li key={tema} className="flex items-start gap-2 text-sm">
              <span className="text-[var(--accent)] mt-0.5">•</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
