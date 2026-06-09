import Link from "next/link";
import type { ReactNode } from "react";
import Dat102Badge from "./Dat102Badge";
import { COMING_SOON_TITLE } from "./dat102-links";

interface Props {
  href: string;
  title: string;
  description: string;
  icon?: string;
  meta?: ReactNode;
  // Rute som ikke er bygget ennå (Phase 2/3): kortet vises, men er ikke klikkbart.
  disabled?: boolean;
  disabledNote?: string;
}

// Generelt navigasjonskort med cyan/teal-hover. `disabled` brukes for
// Øving/Eksamen-inngangene som først bygges i Phase 2/3.
export default function Dat102Card({
  href,
  title,
  description,
  icon,
  meta,
  disabled = false,
  disabledNote = "Kommer snart",
}: Props) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="flex items-center gap-2 min-w-0">
          {icon && (
            <span className="text-xl flex-shrink-0" aria-hidden>
              {icon}
            </span>
          )}
          <span
            className={`font-semibold leading-snug ${
              disabled
                ? "text-neutral-500 dark:text-neutral-400"
                : "text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300"
            } transition-colors`}
          >
            {title}
          </span>
        </span>
        {disabled ? (
          <Dat102Badge tone="soon">{disabledNote}</Dat102Badge>
        ) : (
          <span
            aria-hidden
            className="text-[var(--muted)] group-hover:text-dat102-600 dark:group-hover:text-dat102-400 transition-colors"
          >
            →
          </span>
        )}
      </div>
      <p
        className={`text-sm leading-relaxed ${
          disabled
            ? "text-neutral-400 dark:text-neutral-500"
            : "text-[var(--muted)]"
        }`}
      >
        {description}
      </p>
      {meta && (
        <div className="mt-2.5 text-xs text-[var(--muted)]">{meta}</div>
      )}
    </>
  );

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        title={COMING_SOON_TITLE}
        className="rounded-xl border border-dashed border-[var(--card-border)] bg-[var(--card)] px-5 py-4 cursor-not-allowed select-none"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-dat102-400/70 hover:shadow-md hover:-translate-y-0.5 block"
    >
      {inner}
    </Link>
  );
}
