import Link from "next/link";
import { getSession, isAkseptertUser } from "@/lib/auth";
import TutorTriggerButton from "@/components/TutorTriggerButton";
import StudyPlanRoadmap from "@/components/home/StudyPlanRoadmap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HomePage() {
  const session = await getSession();
  const showAkseptert = isAkseptertUser(session);

  return (
    <div>
      {/* ───── Hero ───── */}
      <section className="pt-6 pb-10 sm:pt-10 sm:pb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
          Dataingeniør · HVL Bergen
        </p>
        <h1 className="text-[clamp(1.875rem,4.5vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-50 mb-4 text-balance">
          Eksamensøving for dataingeniør
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
          Interaktive forklaringer, ekte tidligere eksamener og målrettet drill —
          organisert etter studieløpet. Velg semester og fag.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#studieplan"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold text-sm px-5 py-2.5 transition-colors shadow-sm"
          >
            Velg semester og fag
            <span aria-hidden>→</span>
          </Link>
          <TutorTriggerButton className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] hover:border-neutral-400 dark:hover:border-neutral-600 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm px-4 py-2.5 transition-colors">
            <span aria-hidden>🤖</span>
            Spør tutor
          </TutorTriggerButton>
        </div>
      </section>

      {/* ───── Studieløp-roadmap (1.–3. år → semestre → fag) ───── */}
      <StudyPlanRoadmap />

      {/* ───── Akseptert (kun for akseptert-brukere) ───── */}
      {showAkseptert && (
        <section className="mb-16" aria-labelledby="akseptert-heading">
          <div className="flex items-center gap-3 mb-3">
            <h2
              id="akseptert-heading"
              className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
            >
              Ekstra
            </h2>
            <span className="h-px flex-1 bg-[var(--card-border)]" aria-hidden />
          </div>
          <Link
            href="/akseptert"
            className="group flex flex-col rounded-xl border border-akseptert-200 dark:border-akseptert-900 bg-[var(--card)] overflow-hidden transition-shadow hover:shadow-md sm:max-w-md"
          >
            <div className="h-1 bg-akseptert-500" aria-hidden />
            <div className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  Akseptert
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-akseptert-100 dark:bg-akseptert-900/40 text-akseptert-700 dark:text-akseptert-200">
                  Masterclass
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1 leading-tight tracking-tight text-akseptert-700 dark:text-akseptert-300">
                SaaS Masterclass
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Next.js, React, TypeScript og Tailwind fra scratch — bygging av Akseptert.no.
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* ───── Footer stripe ───── */}
      {/* pb clears the global floating Tutor-FAB (fixed bottom-5 right-5) so it
          doesn't cover the fag-nav links. */}
      <footer className="border-t border-[var(--card-border)] pt-6 pb-4 mb-20 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--muted)]">
          <p>
            Bygget for HVL Bergen-eksamen · Øvingsframgang lagres automatisk · Ingen tracking
          </p>
          <p className="flex items-center gap-3">
            <Link href="/dat102" className="hover:text-[var(--foreground)] transition-colors">
              DAT102
            </Link>
            <span aria-hidden>·</span>
            <Link href="/dat107" className="hover:text-[var(--foreground)] transition-colors">
              DAT107
            </Link>
            <span aria-hidden>·</span>
            <Link href="/dat109" className="hover:text-[var(--foreground)] transition-colors">
              DAT109
            </Link>
            <span aria-hidden>·</span>
            <Link href="/dat110" className="hover:text-[var(--foreground)] transition-colors">
              DAT110
            </Link>
            <span aria-hidden>·</span>
            <Link href="/ing164" className="hover:text-[var(--foreground)] transition-colors">
              ING164
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
