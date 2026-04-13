"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 24)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-24/teori",
    title: "Teori",
    description:
      "Kondensatorer, kapasitans, serie- og parallellkobling, energilagring og dielektrikum — forklart med intuisjon og analogier.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-24/formler",
    title: "Formler",
    description:
      "Alle formler for kapasitans og dielektrikum med forklaringer, fargekoding og en «når bruker du hva»-guide.",
    color: "border-amber-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-24/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-24/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv platekondensator-kalkulator og serie/parallell-simulator — juster parametere og se resultatene live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "24.1 Kondensatorer og kapasitans",
  "24.2 Kondensatorer i serie og parallell",
  "24.3 Energilagring i kondensatorer og elektrisk-felt-energi",
  "24.4 Dielektrikum",
];

export default function Kapittel24Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 24 handler om <strong>kapasitans og dielektrikum</strong> — hvordan
        kondensatorer lagrer ladning og energi, reglene for serie- og parallellkobling,
        og hva som skjer når vi fyller rommet mellom platene med et isolerende materiale.
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
