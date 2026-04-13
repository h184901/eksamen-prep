"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 2)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-2/teori",
    title: "Teori",
    description:
      "Forflytning, momentanfart, akselerasjon, konstant akselerasjon, fritt fall og integrasjon — forklart med intuisjon og analogier.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-2/formler",
    title: "Formler",
    description:
      "Alle formler for rettlinjet bevegelse med forklaringer, fargekoding og en «når bruker du hva»-guide.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-2/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-2/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktive grafer og simulatorer — juster parametere og se bevegelsen live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "2.1 Forflytning, tid og gjennomsnittsfart",
  "2.2 Momentanfart",
  "2.3 Gjennomsnittlig og momentan akselerasjon",
  "2.4 Bevegelse med konstant akselerasjon",
  "2.5 Legemer i fritt fall",
  "2.6 Fart og posisjon ved integrasjon",
];

export default function Kapittel2Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 2 handler om <strong>rettlinjet bevegelse</strong> — bevegelse
        langs en rett linje. Du lærer å beskrive posisjon, hastighet og
        akselerasjon matematisk, løse oppgaver med konstant akselerasjon og
        fritt fall, og integrere for varierende akselerasjon.
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
