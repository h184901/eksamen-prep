import Link from "next/link";
import type { DAT110Topic } from "@/lib/dat110-vault/types";
import VaultMarkdown from "./VaultMarkdown";
import SourcesAndGroundingExpandable from "./SourcesAndGroundingExpandable";

interface Props {
  topic: DAT110Topic;
}

export default function TopicPageLayout({ topic }: Props) {
  const hasRelated =
    topic.relatedConcepts.length > 0 || topic.relatedTopics.length > 0;

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
        <span className="text-neutral-500 dark:text-neutral-400">Temaer</span>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">{topic.slug}</span>
      </nav>

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100 uppercase tracking-wide">
          Tema
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
          tema: {topic.tema}
        </span>
      </div>

      <article>
        <VaultMarkdown content={topic.body} />
      </article>

      {hasRelated && (
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            Relatert
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((t) => (
              <Link
                key={`topic-${t.slug}`}
                href={t.route}
                className="px-3 py-1.5 rounded-full border border-purple-300 dark:border-purple-700 text-sm text-purple-800 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
              >
                Tema: {t.slug}
              </Link>
            ))}
            {topic.relatedConcepts.map((c) => (
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

      <SourcesAndGroundingExpandable sources={topic.supportedBy} />
    </div>
  );
}
