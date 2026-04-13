"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 5)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-5/teori",
    title: "Teori",
    description:
      "Likevekt (N1L), partikkeldynamikk (N2L), friksjonskrefter (statisk og kinetisk) og dynamikk i sirkelbevegelse — forklart med intuisjon og FBD-strategi.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-5/formler",
    title: "Formler",
    description:
      "Alle formler for Newtons lover, friksjon, skråplan og sirkelbevegelse med fargekoding og en «når bruker du hva»-guide.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-5/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler (skråplan, Atwood, friksjon, sirkelbevegelse), øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-5/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktive simulatorer — juster vinkel og friksjon på skråplan, se friksjonskurven live, og utforsk sentripetalkrefter i sirkelbevegelse.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "5.1 Anvendelse av N1L: Partikler i likevekt",
  "5.2 Anvendelse av N2L: Partikkeldynamikk",
  "5.3 Friksjonskrefter (statisk og kinetisk)",
  "5.4 Dynamikk i sirkelbevegelse",
];

export default function Kapittel5Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 5 handler om <strong>anvendelse av Newtons lover</strong> —
        hvordan du systematisk bruker N1L og N2L til å analysere krefter i
        reelle situasjoner: skråplan, friksjon, tau og trinsesystemer, og
        sirkelbevegelse.
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
