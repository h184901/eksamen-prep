import Link from "next/link";
import type { LearnMoreLink } from "@/lib/dat110-vault/types";

interface Props {
  links: LearnMoreLink[];
  label?: string;
}

// Pedagogical "Les mer"-links rendered as inline blue buttons.
// Used in quiz feedback (P0c) and exam solution accordions (P0b).
// Always points to a DAT110 web page; never to a vault source-note.
export default function LearnMoreLinks({ links, label = "Les mer" }: Props) {
  if (!links || links.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l, i) => (
          <Link
            key={`${l.kind}-${l.slug}-${i}`}
            href={l.href}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            <span aria-hidden>→</span>
            <span>{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
