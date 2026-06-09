import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

// Konsistent seksjonsrytme for DAT102-sider: liten eyebrow + H2 + valgfri
// beskrivelse, deretter innhold. Samme mønster som Dat110Section.
export default function Dat102Section({
  eyebrow,
  title,
  description,
  actions,
  children,
  className = "",
}: Props) {
  return (
    <section className={`mb-12 ${className}`}>
      <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
              {eyebrow}
            </p>
          )}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
