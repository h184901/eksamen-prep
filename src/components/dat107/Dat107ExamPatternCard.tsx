import type { ReactNode } from "react";

export type Dat107ExamPatternKind =
  | "exam"
  | "pitfall"
  | "strategy"
  | "checkpoint";

export interface Dat107ExamPatternCardProps {
  kind?: Dat107ExamPatternKind;
  title: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
  items?: ReactNode[];
  className?: string;
}

const patternStyles: Record<
  Dat107ExamPatternKind,
  {
    label: string;
    wrap: string;
    iconWrap: string;
    title: string;
    marker: string;
    icon: ReactNode;
  }
> = {
  exam: {
    label: "Typisk eksamensoppgave",
    wrap: "border-amber-300/70 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-700/50 dark:from-amber-950/30 dark:to-orange-950/20",
    iconWrap: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200",
    title: "text-amber-800 dark:text-amber-200",
    marker: "text-amber-600 dark:text-amber-300",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6L19 8.4V19a2 2 0 01-2 2z" />
    ),
  },
  pitfall: {
    label: "Felle",
    wrap: "border-red-300/70 bg-red-50/70 dark:border-red-700/50 dark:bg-red-950/30",
    iconWrap: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200",
    title: "text-red-800 dark:text-red-200",
    marker: "text-red-600 dark:text-red-300",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 4.3L2.8 17.4A2 2 0 004.5 20h15a2 2 0 001.7-2.6L13.7 4.3a2 2 0 00-3.4 0z" />
    ),
  },
  strategy: {
    label: "Strategi",
    wrap: "border-emerald-300/70 bg-emerald-50/70 dark:border-emerald-700/50 dark:bg-emerald-950/30",
    iconWrap: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200",
    title: "text-emerald-800 dark:text-emerald-200",
    marker: "text-emerald-600 dark:text-emerald-300",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  checkpoint: {
    label: "Sjekkpunkt",
    wrap: "border-dat107-300/70 bg-dat107-50/70 dark:border-dat107-700/50 dark:bg-dat107-950/30",
    iconWrap: "bg-dat107-100 text-dat107-700 dark:bg-dat107-900/50 dark:text-dat107-200",
    title: "text-dat107-800 dark:text-dat107-200",
    marker: "text-dat107-600 dark:text-dat107-300",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
};

export function Dat107ExamPatternCard({
  kind = "exam",
  title,
  eyebrow,
  children,
  items,
  className = "",
}: Dat107ExamPatternCardProps) {
  const style = patternStyles[kind];

  return (
    <section className={`my-5 rounded-xl border p-5 ${style.wrap} ${className}`}>
      <div className="mb-3 flex items-start gap-3">
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.iconWrap}`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            {style.icon}
          </svg>
        </span>
        <div>
          <p className={`text-xs font-bold uppercase tracking-wide ${style.title}`}>
            {eyebrow ?? style.label}
          </p>
          <h3 className="mt-1 text-lg font-bold leading-snug">{title}</h3>
        </div>
      </div>

      {children && (
        <div className="text-sm leading-relaxed text-[var(--foreground)]/90">
          {children}
        </div>
      )}

      {items && items.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span aria-hidden className={`shrink-0 font-bold ${style.marker}`}>
                -
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
