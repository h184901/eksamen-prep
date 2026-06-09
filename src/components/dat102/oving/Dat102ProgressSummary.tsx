import Link from "next/link";

export interface TopicTally {
  slug: string;
  label: string;
  wrong: number;
  total: number;
}

interface Props {
  // Hovedtall (f.eks. quiz score eller flashcards "kan").
  scoreLabel: string;
  score: number;
  total: number;
  // Per-tema-svakheter → lenke til temaside. Sortert utenfor.
  weakTopics: TopicTally[];
  // Tekstlig anbefaling om neste steg.
  nextStep?: React.ReactNode;
  // Knapperad (retry/reset/back) injiseres av runneren.
  actions?: React.ReactNode;
}

function gradeFromPercent(p: number) {
  if (p >= 90) return { label: "A", cls: "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700" };
  if (p >= 80) return { label: "B", cls: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700" };
  if (p >= 60) return { label: "C", cls: "text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 dark:border-yellow-700" };
  if (p >= 50) return { label: "D", cls: "text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700" };
  if (p >= 40) return { label: "E", cls: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700" };
  return { label: "F", cls: "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700" };
}

// Felles resultat-/oppsummeringskort for quiz og flashcards/drills.
// Viser score + (for quiz) karakter, svake temaer med lenker, anbefalt neste
// steg og en knapperad.
export default function Dat102ProgressSummary({
  scoreLabel,
  score,
  total,
  weakTopics,
  nextStep,
  actions,
}: Props) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const grade = gradeFromPercent(percent);

  return (
    <div className="space-y-6">
      <div className={`rounded-xl border-2 p-6 text-center ${grade.cls}`}>
        <div className="text-6xl font-bold mb-2">{grade.label}</div>
        <p className="text-2xl font-bold mb-1 text-neutral-900 dark:text-neutral-50">
          {score} / {total}
        </p>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          {scoreLabel} · {percent}%
        </p>
      </div>

      {actions && <div className="grid sm:grid-cols-3 gap-3">{actions}</div>}

      {weakTopics.length > 0 && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-50 mb-3">
            Temaer å pusse på
          </h3>
          <ul className="space-y-2">
            {weakTopics.map((t) => (
              <li
                key={t.slug}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <Link
                  href={`/dat102/temaer/${t.slug}`}
                  className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
                >
                  {t.label}
                </Link>
                <span className="text-xs text-[var(--muted)] whitespace-nowrap">
                  {t.wrong} av {t.total} feil
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nextStep && (
        <div className="rounded-xl border border-dat102-200 dark:border-dat102-900 bg-dat102-50/50 dark:bg-dat102-950/30 p-5 text-sm text-neutral-700 dark:text-neutral-200">
          <p className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
            Anbefalt neste steg
          </p>
          {nextStep}
        </div>
      )}
    </div>
  );
}
