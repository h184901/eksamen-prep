import type { ReactNode } from "react";

type RuleTone = "purple" | "sky" | "emerald" | "amber" | "red" | "neutral";

export interface Dat107RuleItem {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  tone?: RuleTone;
}

export interface Dat107RuleGridProps {
  title?: ReactNode;
  intro?: ReactNode;
  rules: Dat107RuleItem[];
  columns?: 2 | 3;
  className?: string;
}

const toneClasses: Record<RuleTone, { card: string; title: string; badge: string }> = {
  purple: {
    card: "border-dat107-300/70 bg-dat107-50/70 dark:border-dat107-700/50 dark:bg-dat107-950/30",
    title: "text-dat107-700 dark:text-dat107-300",
    badge: "bg-dat107-100 text-dat107-700 dark:bg-dat107-900/50 dark:text-dat107-200",
  },
  sky: {
    card: "border-sky-300/70 bg-sky-50/70 dark:border-sky-700/50 dark:bg-sky-950/30",
    title: "text-sky-700 dark:text-sky-300",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200",
  },
  emerald: {
    card: "border-emerald-300/70 bg-emerald-50/70 dark:border-emerald-700/50 dark:bg-emerald-950/30",
    title: "text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200",
  },
  amber: {
    card: "border-amber-300/70 bg-amber-50/70 dark:border-amber-700/50 dark:bg-amber-950/30",
    title: "text-amber-700 dark:text-amber-300",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200",
  },
  red: {
    card: "border-red-300/70 bg-red-50/70 dark:border-red-700/50 dark:bg-red-950/30",
    title: "text-red-700 dark:text-red-300",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200",
  },
  neutral: {
    card: "border-[var(--card-border)] bg-[var(--card)]",
    title: "text-[var(--foreground)]",
    badge: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
  },
};

export function Dat107RuleGrid({
  title,
  intro,
  rules,
  columns = 3,
  className = "",
}: Dat107RuleGridProps) {
  const gridClass =
    columns === 2 ? "grid gap-3 sm:grid-cols-2" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`my-6 ${className}`}>
      {(title || intro) && (
        <div className="mb-3">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {intro && (
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              {intro}
            </p>
          )}
        </div>
      )}

      <div className={gridClass}>
        {rules.map((rule, index) => {
          const tone = toneClasses[rule.tone ?? "purple"];
          return (
            <div
              key={rule.id ?? `${String(rule.title)}-${index}`}
              className={`rounded-lg border p-4 ${tone.card}`}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h4 className={`text-sm font-bold ${tone.title}`}>
                  {rule.title}
                </h4>
                {rule.badge && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}
                  >
                    {rule.badge}
                  </span>
                )}
              </div>
              {rule.description && (
                <div className="text-sm leading-relaxed text-[var(--foreground)]/85">
                  {rule.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
