import Link from "next/link";
import type { ReactNode } from "react";
import { parseWikilink, wikilinkToHref } from "@/lib/dat102-vault/wikilink-resolver";
import { COMING_SOON_TITLE, isLiveDat102Href } from "./dat102-links";

// "Kommer snart"-rendering for lenker mot ruter som først bygges i Phase 2/3
// (/dat102/oving/*, /dat102/eksamen/*). Stiplet understrek + tooltip; aldri 404.
export function Dat102ComingSoon({ children }: { children: ReactNode }) {
  return (
    <span
      title={COMING_SOON_TITLE}
      aria-disabled="true"
      className="text-neutral-500 dark:text-neutral-400 underline decoration-dashed decoration-neutral-400/70 underline-offset-2 cursor-help"
    >
      {children}
    </span>
  );
}

export const dat102LinkClass =
  "text-dat102-700 dark:text-dat102-300 font-medium underline-offset-2 hover:underline";

// Rendrer ett wikilink-mål til riktig element: intern lenke, coming-soon
// eller italic stub. Gjenbrukes av Dat102WikilinkText (server-side).
export function Dat102WikilinkTarget({
  target,
  label,
}: {
  target: string;
  label?: string;
}) {
  const parsed = parseWikilink(`[[${target}]]`) ?? { target, section: undefined };
  const text = label ?? parsed.alias ?? parsed.target;
  const href = wikilinkToHref(parsed.target, parsed.section);
  if (!href) return <em className="text-[var(--muted)]">{text}</em>;
  if (!isLiveDat102Href(href)) return <Dat102ComingSoon>{text}</Dat102ComingSoon>;
  return (
    <Link href={href} className={dat102LinkClass}>
      {text}
    </Link>
  );
}

interface Props {
  text: string;
  className?: string;
}

// Rendrer en tekststreng med [[wikilinks]] som interne DAT102-lenker.
//   [[Hashing]]                          → /dat102/begreper|temaer-lenke via alias
//   [[concepts/quicksort|Quicksort]]     → eksakt rute med visningsnavn
//   [[Oblig2]]                           → coming-soon (ruten bygges i Phase 2)
//   [[noe uoppløselig]]                  → italic stub, aldri broken route
// Server-komponent (resolveren leser vault-indeksen ved import).
export default function Dat102WikilinkText({ text, className = "" }: Props) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const parsed = parseWikilink(part);
        if (!parsed) return <span key={i}>{part}</span>;
        return (
          <Dat102WikilinkTarget
            key={i}
            target={
              parsed.section ? `${parsed.target}#${parsed.section}` : parsed.target
            }
            label={parsed.alias}
          />
        );
      })}
    </span>
  );
}
