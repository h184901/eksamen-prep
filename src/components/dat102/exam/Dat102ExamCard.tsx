import Link from "next/link";
import type { ExamCardData } from "@/lib/dat102-vault/exam-adapter";
import { ExamLevelBadge } from "./Dat102ExamStatusBadge";

// Ett kort i eksamen-oversikten. Viser session, status (ærlig badge),
// oppgavetall, kilde-status og de viktigste temaene.
export default function Dat102ExamCard({ exam }: { exam: ExamCardData }) {
  const scanned = exam.statusCounts.scanned_only;
  const partial = exam.statusCounts.partial;
  const sourceNote =
    scanned > 0
      ? `${scanned} deloppgave${scanned === 1 ? "" : "r"} kun skannet`
      : partial > 0
        ? `${partial} deloppgave${partial === 1 ? "" : "r"} delvis`
        : "Tekst og løsning tilgjengelig";

  return (
    <Link
      href={`/dat102/eksamen/${exam.slug}`}
      className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-dat102-400/70 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
          {exam.displayLabel}
        </h3>
        <ExamLevelBadge status={exam.status} />
      </div>
      <p className="text-xs text-[var(--muted)] mb-2">
        {exam.questionCount} oppgaver · {exam.subquestionCount} deloppgaver ·{" "}
        {sourceNote}
      </p>
      {exam.topics.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {exam.topics.slice(0, 4).map((t) => (
            <span
              key={t.slug}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border border-dat102-200 dark:border-dat102-900"
            >
              {t.label}
            </span>
          ))}
          {exam.topics.length > 4 && (
            <span className="text-[11px] text-[var(--muted)] self-center">
              +{exam.topics.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
