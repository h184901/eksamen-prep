import Link from "next/link";
import type { ReactNode } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  className?: string;
}

// Shared page header for DAT110 pages: breadcrumb + eyebrow + fluid H1 + lead.
// The clamp() H1 keeps the heading from over-weighting the narrow 1000–1250px
// viewport band; the network-blue eyebrow is the DAT110 accent signal.
export default function Dat110PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  className = "",
}: Props) {
  return (
    <header className={`mb-10 ${className}`}>
      <nav
        aria-label="Brødsmuler"
        className="flex items-center gap-2 text-sm text-[var(--muted)] mb-5 flex-wrap"
      >
        {crumbs.map((c, i) => (
          <span key={`${c.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-neutral-400 dark:text-neutral-600">
                /
              </span>
            )}
            {c.href ? (
              <Link
                href={c.href}
                className="hover:text-[var(--foreground)] transition-colors"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-neutral-700 dark:text-neutral-200">
                {c.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-network-600 dark:text-network-400 mb-2">
          {eyebrow}
        </p>
      )}

      <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-50 text-balance">
        {title}
      </h1>

      {lead && (
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
          {lead}
        </p>
      )}
    </header>
  );
}
