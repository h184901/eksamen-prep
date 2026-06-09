import Link from "next/link";
import type { LearnMoreLink } from "@/lib/dat102-vault/types";
import { COMING_SOON_TITLE, isLiveDat102Href } from "../dat102-links";

interface Props {
  links: LearnMoreLink[];
  label?: string;
}

// "Les mer"-lenker i quiz/drill/flashcard/matching-feedback.
// Live Phase 1/2-ruter blir blå cyan-piller; lenker mot ubygde ruter
// (/dat102/eksamen/*, /dat102/oving/obliger) vises som disabled stub med
// tooltip — aldri 404. Tomt input → ingenting rendres (krasjer ikke).
export default function Dat102LearnMoreLinks({ links, label = "Les mer" }: Props) {
  if (!links || links.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l, i) => {
          const key = `${l.kind}-${l.slug}-${i}`;
          if (!isLiveDat102Href(l.href)) {
            return (
              <span
                key={key}
                title={COMING_SOON_TITLE}
                aria-disabled="true"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/60 border border-dashed border-neutral-300 dark:border-neutral-700 cursor-help"
              >
                <span aria-hidden>🔒</span>
                <span>{l.label}</span>
                <span className="text-[10px] uppercase tracking-wide">(snart)</span>
              </span>
            );
          }
          return (
            <Link
              key={key}
              href={l.href}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-dat102-700 dark:text-dat102-300 bg-dat102-50 dark:bg-dat102-950/40 border border-dat102-200 dark:border-dat102-800/70 hover:bg-dat102-100 dark:hover:bg-dat102-900/40 transition-colors"
            >
              <span aria-hidden>→</span>
              <span>{l.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Liten kilde-tag for quiz/drill/flashcard-feedback. Aldri rå sourceRefs.
export function Dat102SourceTag({
  source,
}: {
  source: { kind: "exam" | "generated"; label: string };
}) {
  return (
    <div className="text-xs text-neutral-500 dark:text-neutral-400">
      <span aria-hidden>{source.kind === "exam" ? "📋 " : "✏️ "}</span>
      {source.label}
    </div>
  );
}
