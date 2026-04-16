"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 7)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-7/teori",
    title: "Teori",
    description:
      "Gravitasjonell potensiell energi, bevaring av mekanisk energi og den utvidede energiligningen — forklart med intuisjon og analogier.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-7/formler",
    title: "Formler",
    description:
      "Alle formler for potensiell energi og energibevaring med fargekoding og «når bruker du hva»-guide.",
    color: "border-amber-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-7/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-7/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktive simulatorer for energibevaring — juster parametere og se E_p og E_k bytte mellom hverandre live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "7.1 Gravitasjonell potensiell energi — E_p = mgy",
  "7.1 Arbeid utført av tyngden — W_mg = −ΔE_p",
  "7.1 Bevaring av mekanisk energi — E_k + E_p = konstant",
  "7.1 Utvidet energiligning — med friksjon og andre krefter",
  "7.1 Banen er irrelevant — kun høydeforskjellen teller",
  "7.1 Normalkraftens arbeid er alltid null",
];

export default function Kapittel7Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 7 handler om <strong>potensiell energi og energibevaring</strong> — ett av
        de kraftigste verktøyene i mekanikken. Du lærer å løse oppgaver om høyde, fart og
        friksjon uten å trenge kinematikk, og å forstå hvorfor energi alltid bevares.
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
