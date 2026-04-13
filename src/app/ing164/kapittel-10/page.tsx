"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 10)!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/ing164/kapittel-10/teori",
    title: "Teori",
    description:
      "Kraftmoment, Newtons 2. lov for rotasjon, rulling uten glidning, arbeid og effekt, angulært moment og bevaring — forklart med intuisjon og analogier.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/ing164/kapittel-10/formler",
    title: "Formler",
    description:
      "Alle formler for rotasjonsdynamikk med forklaringer, fargekoding og en «når bruker du hva»-guide.",
    color: "border-amber-400",
    icon: "🧮",
  },
  {
    href: "/ing164/kapittel-10/oppgaver",
    title: "Oppgaver",
    description:
      "Oppgavestrategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/ing164/kapittel-10/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktive simulatorer for kraftmoment, rulling uten glidning og bevaring av angulært moment — juster parametere og se resultatet live.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "10.1 Kraftmoment (dreiemoment / torque): τ = rF sin φ",
  "10.2 Newtons 2. lov for rotasjon: Στ = Iα",
  "10.3 Rulling uten glidning: v_CM = Rω, K_tot = ½mv² + ½Iω²",
  "10.4 Arbeid og effekt i rotasjon: W = τΔθ, P = τω",
  "10.5 Angulært moment: L = Iω, τ = dL/dt",
  "10.6 Bevaring av angulært moment: I₁ω₁ = I₂ω₂",
];

export default function Kapittel10Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 10 handler om <strong>dynamikk i rotasjonsbevegelse</strong> — kreftene og energien bak rotasjon. Du lærer å bruke kraftmoment og Newtons 2. lov for rotasjon, analysere rulling uten glidning, og forstå bevaring av angulært moment. Dette er direkte eksamensstoff!
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
