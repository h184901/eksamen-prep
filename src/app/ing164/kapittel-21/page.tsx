"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 21)!;

const subPages = [
  {
    href: "/ing164/kapittel-21/teori",
    title: "Teori",
    description: "Elektrisk ladning, Coulombs lov, E-felt og feltlinjer",
    color: "border-blue-400/40 hover:border-blue-400",
  },
  {
    href: "/ing164/kapittel-21/formler",
    title: "Formler",
    description: "Alle formler samlet med forklaring av når du bruker hva",
    color: "border-amber-400/40 hover:border-amber-400",
  },
  {
    href: "/ing164/kapittel-21/oppgaver",
    title: "Oppgaver",
    description: "Strategier, eksempler, øving og eksamensoppgaver",
    color: "border-green-400/40 hover:border-green-400",
  },
  {
    href: "/ing164/kapittel-21/visualiseringer",
    title: "Visualiseringer",
    description: "Interaktive figurer for Coulombs lov og E-felt",
    color: "border-purple-400/40 hover:border-purple-400",
  },
];

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel21Oversikt() {
  return (
    <>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <p className="text-[var(--muted)] mt-6 mb-6">
        Dette kapittelet dekker elektrisk ladning og de elektriske kreftene mellom ladede
        partikler. Du lærer Coulombs lov, begrepet elektrisk felt, og hvordan feltlinjer
        visualiserer feltets styrke og retning.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`group rounded-xl border-2 bg-[var(--card)] p-6 transition-all hover:shadow-md hover:-translate-y-0.5 ${page.color}`}
          >
            <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">
              {page.title}
            </h3>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h3 className="font-semibold mb-3">Temaer i dette kapittelet</h3>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          <li><strong className="text-[var(--foreground)]">21.1</strong> — Elektrisk ladning: typer, bevaring og kvantisering</li>
          <li><strong className="text-[var(--foreground)]">21.3</strong> — Coulombs lov og superposisjon</li>
          <li><strong className="text-[var(--foreground)]">21.4</strong> — Elektrisk felt og elektriske krefter</li>
          <li><strong className="text-[var(--foreground)]">21.6</strong> — Elektriske feltlinjer</li>
        </ul>
      </div>
    </>
  );
}
