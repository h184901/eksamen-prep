import Link from "next/link";
import type { ExamPatternCard } from "@/lib/dat110-vault/types";

// Pattern-card for /dat110/eksamen/gjengangere.
// Viser ett gjentakende eksamen-mønster med:
//  - tittel + vekt-hint + stabilitets-tag
//  - kort beskrivelse
//  - "Se eksempel" anchor-lenker til konkrete oppgaver i eksamen-rutene
//  - "Les mer" lenker til concept/topic-sider
//  - valgfri "Øv på dette"-lenke til /dat110/oving
interface Props {
  pattern: ExamPatternCard;
}

export default function PatternCard({ pattern }: Props) {
  return (
    <article className="rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-[var(--card)] p-5 hover:shadow-md transition-shadow">
      <header className="mb-3">
        <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
          <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-50">
            {pattern.title}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 whitespace-nowrap">
            {pattern.stabilityTag}
          </span>
        </div>
        <p className="text-xs font-mono text-[var(--muted)]">
          {pattern.weightHint}
        </p>
      </header>

      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
        {pattern.description}
      </p>

      {pattern.examples.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-1.5">
            Se eksempel
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pattern.examples.map((ex) => (
              <Link
                key={ex.href}
                href={ex.href}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
              >
                {ex.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {pattern.learnMore.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-1.5">
            Les mer
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pattern.learnMore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                <span aria-hidden>→</span>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {pattern.practiceHref && (
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href={pattern.practiceHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
          >
            <span aria-hidden>▶</span>
            Øv på dette
          </Link>
        </div>
      )}
    </article>
  );
}
