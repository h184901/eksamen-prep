import Link from "next/link";
import type { DAT110Concept } from "@/lib/dat110-vault/types";
import VaultMarkdown from "./VaultMarkdown";
import SourcesAndGroundingExpandable from "./SourcesAndGroundingExpandable";

interface Props {
  concept: DAT110Concept;
}

export default function ConceptPageLayout({ concept }: Props) {
  const hasRelated =
    concept.relatedConcepts.length > 0 || concept.relatedTopics.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav
        aria-label="Brødsmuler"
        className="mb-6 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-500 dark:text-neutral-400">Begreper</span>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">{concept.slug}</span>
      </nav>

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 uppercase tracking-wide">
          Begrep
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
          tema: {concept.tema}
        </span>
      </div>

      <article>
        <VaultMarkdown content={concept.body} />
      </article>

      {hasRelated && (
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            Relatert
          </h3>
          <div className="flex flex-wrap gap-2">
            {concept.relatedTopics.map((t) => (
              <Link
                key={`topic-${t.slug}`}
                href={t.route}
                className="px-3 py-1.5 rounded-full border border-blue-300 dark:border-blue-700 text-sm text-blue-800 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              >
                Tema: {t.slug}
              </Link>
            ))}
            {concept.relatedConcepts.map((c) => (
              <Link
                key={`concept-${c.slug}`}
                href={c.route}
                className="px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
              >
                {c.slug}
              </Link>
            ))}
          </div>
        </div>
      )}

      <SourcesAndGroundingExpandable sources={concept.supportedBy} />
    </div>
  );
}
