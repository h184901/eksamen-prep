import Link from "next/link";
import Egb339Markdown from "./Egb339Markdown";
import Egb339ProblemVisual from "./Egb339ProblemVisual";
import type { Egb339Problem } from "@/lib/egb339-problems";

interface Props {
  week: number;
  problems: Egb339Problem[];
}

const verificationLabel: Record<Egb339Problem["verification"], string> = {
  official: "Kontrollert mot QUT-fasit",
  derived: "Egen utregning",
  open: "Åpen praktisk oppgave",
};

const verificationTone: Record<Egb339Problem["verification"], string> = {
  official: "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
  derived: "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200",
  open: "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
};

export default function Egb339WeekProblems({ week, problems }: Props) {
  return (
    <section className="mt-12 border-t border-[var(--card-border)] pt-10" aria-labelledby="week-problems-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Øv aktivt</p>
          <h2 id="week-problems-heading" className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Oppgaver og løsningsforslag
          </h2>
        </div>
        {problems.length > 0 && (
          <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-1 text-sm font-semibold text-[var(--muted)]">
            {problems.length} {problems.length === 1 ? "oppgave" : "oppgaver"}
          </span>
        )}
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Forsøk oppgaven selv før du åpner løsningen. Temalenkene tar deg til teorien du trenger underveis.
      </p>

      {problems.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-[var(--card-border)] bg-[var(--card)] p-6 text-sm leading-6 text-[var(--muted)]">
          Uke {week} har ikke et eget tutorialsett i kursmaterialet. De ukentlige regneoppgavene starter i uke 2.
        </div>
      ) : (
        <div className="mt-7 space-y-6">
          {problems.map((problem, index) => (
            <article key={problem.id} id={problem.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm">
              <div className="border-b border-[var(--card-border)] p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">
                      Oppgave {index + 1}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-neutral-950 dark:text-white">{problem.title}</h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    PDF-side {problem.sourcePage}{problem.sourcePageEnd ? `–${problem.sourcePageEnd}` : ""}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Kilde: {problem.source}</p>

                <div className="mt-4 flex flex-wrap gap-2" aria-label="Relevante temaer">
                  {problem.topics.map((entry) => (
                    <Link key={entry.href} href={entry.href} className="rounded-full border border-robotics-200 bg-robotics-50 px-2.5 py-1 text-xs font-semibold text-robotics-800 transition-colors hover:border-robotics-400 hover:bg-robotics-100 dark:border-robotics-800 dark:bg-robotics-950/50 dark:text-robotics-200 dark:hover:border-robotics-600">
                      {entry.label} →
                    </Link>
                  ))}
                </div>

                {problem.visual && <div className="mt-5"><Egb339ProblemVisual kind={problem.visual} /></div>}

                <div className="mt-5">
                  <Egb339Markdown content={problem.prompt} />
                </div>
              </div>

              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-neutral-900 transition-colors hover:bg-robotics-50/60 marker:content-none dark:text-neutral-100 dark:hover:bg-robotics-950/25 sm:px-6">
                  <span>Vis løsning og fasit</span>
                  <span aria-hidden="true" className="text-xl leading-none text-robotics-600 transition-transform group-open:rotate-45 dark:text-robotics-300">+</span>
                </summary>
                <div className="border-t border-[var(--card-border)] bg-slate-50/60 px-5 py-6 dark:bg-slate-950/25 sm:px-6">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${verificationTone[problem.verification]}`}>
                    {verificationLabel[problem.verification]}
                  </span>
                  <div className="mt-4">
                    <Egb339Markdown content={problem.solution} />
                  </div>
                  <div className="mt-6 rounded-xl border-l-4 border-robotics-500 bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
                    <p className="text-xs font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Svar</p>
                    <Egb339Markdown content={problem.answer} />
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
