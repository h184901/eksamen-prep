"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 3)!;

const subPages = [
  {
    href: "/ing164/kapittel-3/teori",
    title: "Teori",
    description: "Posisjonsvektorer, akselerasjon, prosjektilbevegelse og sirkelbevegelse",
    color: "border-blue-400/40 hover:border-blue-400",
  },
  {
    href: "/ing164/kapittel-3/formler",
    title: "Formler",
    description: "Alle formler samlet med forklaring av når du bruker hva",
    color: "border-amber-400/40 hover:border-amber-400",
  },
  {
    href: "/ing164/kapittel-3/oppgaver",
    title: "Oppgaver",
    description: "Strategier, eksempler, øving og eksamensoppgaver",
    color: "border-green-400/40 hover:border-green-400",
  },
  {
    href: "/ing164/kapittel-3/visualiseringer",
    title: "Visualiseringer",
    description: "Interaktive simulatorer for prosjektilbevegelse og sirkelbevegelse",
    color: "border-purple-400/40 hover:border-purple-400",
  },
];

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel3Oversikt() {
  return (
    <>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <p className="text-[var(--muted)] mt-6 mb-6">
        Dette kapittelet utvider kinematikken fra én til to og tre dimensjoner ved hjelp av
        vektorer. Du lærer å beskrive posisjon, fart og akselerasjon som vektorer, analysere
        prosjektilbevegelse ved å dekomponere i to uavhengige retninger, og forstå
        sentripetaakselerasjon i sirkelbevegelse.
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
          <li><strong className="text-[var(--foreground)]">3.1</strong> — Posisjons- og fartsvektorer</li>
          <li><strong className="text-[var(--foreground)]">3.2</strong> — Akselerasjonsvektoren</li>
          <li><strong className="text-[var(--foreground)]">3.3</strong> — Prosjektilbevegelse</li>
          <li><strong className="text-[var(--foreground)]">3.4</strong> — Sirkelbevegelse med konstant og variabel fart</li>
        </ul>
      </div>
    </>
  );
}
