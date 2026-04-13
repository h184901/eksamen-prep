"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 29)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-29/teori",
    title: "Teori",
    description:
      "Faradays lov, Lenz' lov og EMF fra leder i bevegelse — forklart med intuisjon, analogier og steg-for-steg.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-29/formler",
    title: "Formler",
    description:
      "Alle formler for elektromagnetisk induksjon med forklaringer, fargekoding og en «når bruker du hva»-guide.",
    color: "border-amber-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-29/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-29/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv Faraday-kalkulator, stav-på-skinner-simulator og vekselstrømgenerator — juster parametere og se resultatene live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "29.1 Induksjonsforsøk — hva er elektromagnetisk induksjon?",
  "29.2 Faradays lov — ε = −dΦ_B/dt",
  "29.3 Lenz' lov — retningen på indusert strøm",
  "29.4 EMF fra leder i bevegelse — ε = vBL og vekselstrømgenerator",
];

export default function Kapittel29Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 29 handler om <strong>elektromagnetisk induksjon</strong> — hvordan endring i
        magnetisk fluks induserer en elektromotorisk spenning (EMF), hva Lenz&apos; lov sier om
        retningen på den induserte strømmen, og hvordan bevegelige ledere i magnetfelt er grunnlaget
        for generatorer og vekselstrøm.
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
