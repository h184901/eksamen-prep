"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 28)!;

const subPages = [
  {
    href: "/ing164/kapittel-28/teori",
    title: "Teori",
    description: "Biot-Savarts lov, B-felt fra ladning i bevegelse og fra strømledere",
    color: "border-blue-400/40 hover:border-blue-400",
  },
  {
    href: "/ing164/kapittel-28/formler",
    title: "Formler",
    description: "Alle formler samlet med forklaring av når du bruker hva",
    color: "border-amber-400/40 hover:border-amber-400",
  },
  {
    href: "/ing164/kapittel-28/oppgaver",
    title: "Oppgaver",
    description: "Strategier, eksempler, øving og eksamensoppgaver",
    color: "border-green-400/40 hover:border-green-400",
  },
  {
    href: "/ing164/kapittel-28/visualiseringer",
    title: "Visualiseringer",
    description: "Interaktive figurer for Biot-Savart, lange ledere og parallelle ledere",
    color: "border-purple-400/40 hover:border-purple-400",
  },
];

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel28Oversikt() {
  return (
    <>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <p className="text-[var(--muted)] mt-6 mb-6">
        Dette kapittelet handler om kilder til magnetfelt. Du lærer hvordan bevegde ladninger og
        strømførende ledere skaper magnetfelt, Biot-Savarts lov, feltformelen for en lang rett
        leder, og kraften mellom parallelle strømledere.
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
          <li><strong className="text-[var(--foreground)]">28.1</strong> — Magnetfelt fra en ladet partikkel i bevegelse</li>
          <li><strong className="text-[var(--foreground)]">28.2</strong> — Magnetfelt fra et strømelement — Biot-Savarts lov</li>
          <li><strong className="text-[var(--foreground)]">28.3</strong> — Magnetfelt fra en rett strømførende leder</li>
          <li><strong className="text-[var(--foreground)]">28.4</strong> — Krefter mellom parallelle strømledere og definisjonen av Ampere</li>
        </ul>
      </div>
    </>
  );
}
