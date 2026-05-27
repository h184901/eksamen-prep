import Link from "next/link";
import type { DAT110Exam, SourceRef } from "@/lib/dat110-vault/types";
import ExamQuestionCard from "./ExamQuestionCard";
import ReconstructedExamBanner from "./ReconstructedExamBanner";
import SourcesAndGroundingExpandable from "./SourcesAndGroundingExpandable";

interface Props {
  exam: DAT110Exam;
}

// Map exam.session ("01" | "05" | "06") to a human-readable Norwegian period label.
function sessionLabel(session: string): string {
  switch (session) {
    case "01":
      return "Januar";
    case "05":
      return "Mai";
    case "06":
      return "Juni";
    default:
      return session;
  }
}

// Build a deduped union of sourceRefs across all questions for the page-level
// "Kilder og grunnlag" expandable. Local-only entries are filtered defensively
// (SourcesAndGroundingExpandable also filters).
function buildPageSourceRefs(exam: DAT110Exam): SourceRef[] {
  const seen = new Map<string, SourceRef>();
  for (const q of exam.questions) {
    if (!Array.isArray(q.sourceRefs)) continue;
    for (const s of q.sourceRefs) {
      if (!seen.has(s.slug)) {
        // Strip pageOrSection at page level — too granular for cross-question view.
        seen.set(s.slug, {
          slug: s.slug,
          title: s.title,
          role: s.role,
          visibility: s.visibility,
        });
      }
    }
  }
  return Array.from(seen.values());
}

export default function ExamPageLayout({ exam }: Props) {
  const isReconstructed = exam.reconstructedFromSensor === true;
  const friendlyPeriod = `${sessionLabel(exam.session)} ${exam.year}`;
  const pageSourceRefs = buildPageSourceRefs(exam);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav
        aria-label="Brødsmuler"
        className="mb-4 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-500 dark:text-neutral-400">Eksamen</span>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">{friendlyPeriod}</span>
      </nav>

      {isReconstructed && exam.bannerWarning && (
        <ReconstructedExamBanner warning={exam.bannerWarning} />
      )}

      <header className="mb-6">
        <div className="flex items-baseline gap-2 flex-wrap mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-100 uppercase tracking-wide">
            Eksamen
          </span>
          {isReconstructed ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 uppercase tracking-wide">
              Rekonstruert
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-100 uppercase tracking-wide">
              Offisiell · komplett
            </span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
            sesjon: {exam.session}-{exam.year}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
            {exam.questions.length} oppgaver · {exam.totalWeight} %
          </span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {exam.displayLabel}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Hver oppgave har en{" "}
          <strong className="text-neutral-800 dark:text-neutral-100">
            &laquo;Vis løsning&raquo;
          </strong>{" "}
          som er lukket som standard. Tenk gjennom svaret før du åpner løsningen.
        </p>
      </header>

      {exam.questions.length > 0 && (
        <nav
          aria-label="Hopp til oppgave"
          className="mb-8 flex flex-wrap gap-2"
        >
          {exam.questions.map((q) => (
            <a
              key={q.number}
              href={`#oppg-${q.number}`}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
            >
              Q{q.number} ({q.weightPercent}%)
            </a>
          ))}
        </nav>
      )}

      <div>
        {exam.questions.map((q) => (
          <ExamQuestionCard key={q.number} question={q} />
        ))}
      </div>

      <SourcesAndGroundingExpandable sources={pageSourceRefs} />

      <footer className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
        <p>
          Sensorveiledning brukt som autoritativ kilde for løsningene. Original
          PDF og full sensor-tekst tilgjengelig lokalt, ikke publisert på web.
        </p>
      </footer>
    </div>
  );
}
