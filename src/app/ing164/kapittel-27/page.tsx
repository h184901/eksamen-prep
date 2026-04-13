"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 27)!;

const subPages = [
  {
    href: "/ing164/kapittel-27/teori",
    title: "Teori",
    description: "Magnetisme, Lorentzkraften, magnetisk fluks og sirkelbaner",
    color: "border-blue-400/40 hover:border-blue-400",
  },
  {
    href: "/ing164/kapittel-27/formler",
    title: "Formler",
    description: "Alle formler samlet med forklaring av når du bruker hva",
    color: "border-amber-400/40 hover:border-amber-400",
  },
  {
    href: "/ing164/kapittel-27/oppgaver",
    title: "Oppgaver",
    description: "Strategier, eksempler, øving og eksamensoppgaver",
    color: "border-green-400/40 hover:border-green-400",
  },
  {
    href: "/ing164/kapittel-27/visualiseringer",
    title: "Visualiseringer",
    description: "Interaktive figurer for Lorentzkraft og sirkelbane i magnetfelt",
    color: "border-purple-400/40 hover:border-purple-400",
  },
];

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel27Oversikt() {
  return (
    <>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <p className="text-[var(--muted)] mt-6 mb-6">
        Dette kapittelet dekker magnetisk felt og krefter. Du lærer om Lorentzkraften på ladede
        partikler, sirkelbaner og spiralbaner i magnetfelt, fartsvelgere, massespektrometre og
        magnetkraften på strømførende ledere.
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
          <li><strong className="text-[var(--foreground)]">27.1</strong> — Magnetisme: poler, felt og analogi med elektrisitet</li>
          <li><strong className="text-[var(--foreground)]">27.2</strong> — Magnetisk kraft på ladede partikler (Lorentzkraften)</li>
          <li><strong className="text-[var(--foreground)]">27.3</strong> — Magnetiske feltlinjer og magnetisk fluks</li>
          <li><strong className="text-[var(--foreground)]">27.4</strong> — Bevegelse av ladede partikler: sirkelbane og spiralbane</li>
          <li><strong className="text-[var(--foreground)]">27.5</strong> — Fartsvelger og massespektrometer</li>
          <li><strong className="text-[var(--foreground)]">27.6</strong> — Magnetkraft på strømførende ledere</li>
        </ul>
      </div>
    </>
  );
}
