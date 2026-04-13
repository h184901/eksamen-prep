"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 23)!;

const subPages = [
  {
    href: "/ing164/kapittel-23/teori",
    title: "Teori",
    description: "Potensiell energi, elektrisk potensial og ekvipotensialflater",
    color: "border-blue-400/40 hover:border-blue-400",
  },
  {
    href: "/ing164/kapittel-23/formler",
    title: "Formler",
    description: "Alle formler samlet med forklaring av når du bruker hva",
    color: "border-amber-400/40 hover:border-amber-400",
  },
  {
    href: "/ing164/kapittel-23/oppgaver",
    title: "Oppgaver",
    description: "Strategier, eksempler, øving og eksamensoppgaver",
    color: "border-green-400/40 hover:border-green-400",
  },
  {
    href: "/ing164/kapittel-23/visualiseringer",
    title: "Visualiseringer",
    description: "Interaktive figurer for potensial og energibevaring",
    color: "border-purple-400/40 hover:border-purple-400",
  },
];

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel23Oversikt() {
  return (
    <>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <p className="text-[var(--muted)] mt-6 mb-6">
        Dette kapittelet handler om elektrisk potensial — en skalarstor som gjør det mye enklere
        å beregne energi og arbeid i elektriske felt. Du lærer sammenhengen mellom potensiell energi
        og potensial, og bruker energibevaring til å finne farten til ladede partikler.
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
          <li><strong className="text-[var(--foreground)]">23.1</strong> — Elektrisk potensiell energi og arbeid utført av elektrisk kraft</li>
          <li><strong className="text-[var(--foreground)]">23.2</strong> — Elektrisk potensial (V) og potensialforskjell (spenning)</li>
          <li><strong className="text-[var(--foreground)]">23.2</strong> — Potensial fra punktladninger og superposisjon</li>
          <li><strong className="text-[var(--foreground)]">23.2</strong> — Elektronvolt (eV) som energienhet</li>
          <li><strong className="text-[var(--foreground)]">23.2</strong> — Sammenheng mellom E-felt og potensial: E = V/d</li>
        </ul>
      </div>
    </>
  );
}
