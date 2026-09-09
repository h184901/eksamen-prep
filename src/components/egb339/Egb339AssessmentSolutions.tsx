import Link from "next/link";
import Egb339Markdown from "./Egb339Markdown";
import type { Egb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";

export default function Egb339AssessmentSolutions({ solution }: { solution: Egb339AssessmentSolution }) {
  return (
    <section id="losningsforslag" className="mt-10 scroll-mt-24 border-t border-[var(--card-border)] pt-8" aria-labelledby="assessment-solutions-heading">
      <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Forstå fremgangsmåten</p>
      <h2 id="assessment-solutions-heading" className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">Løsningsgjennomgang</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{solution.scope}</p>
      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Kildegrunnlag: {solution.source}</p>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Pensumuker for gjennomgangen">
        {solution.weeks.map((week) => (
          <Link key={week} href={`/egb339/uker/uke-${week}`} className="rounded-full border border-robotics-200 bg-robotics-50 px-3 py-1 text-sm font-semibold text-robotics-800 hover:underline dark:border-robotics-800 dark:bg-robotics-950/50 dark:text-robotics-200">
            Uke {week} →
          </Link>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {solution.parts.map((part) => (
          <details key={part.id} id={`solution-${part.id}`} className="group scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-neutral-950 transition-colors hover:bg-robotics-50/60 marker:content-none dark:text-neutral-100 dark:hover:bg-robotics-950/25 sm:px-6">
              <h3 className="text-base font-semibold">{part.title}</h3>
              <span aria-hidden="true" className="text-xl leading-none text-robotics-600 transition-transform group-open:rotate-45 dark:text-robotics-300">+</span>
            </summary>
            <div className="border-t border-[var(--card-border)] bg-slate-50/60 px-5 pb-6 pt-2 dark:bg-slate-950/25 sm:px-6">
              {part.missingSourceDetail && (
                <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">Kildedetalj mangler — eksakt svar kan ikke verifiseres ennå.</p>
              )}
              <Egb339Markdown content={part.content} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
