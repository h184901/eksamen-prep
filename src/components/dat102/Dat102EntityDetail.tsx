import Link from "next/link";
import type { ReactNode } from "react";
import type { SourceRef } from "@/lib/dat102-vault/types";
import Dat102Badge from "./Dat102Badge";
import Dat102Breadcrumbs from "./Dat102Breadcrumbs";
import Dat102Markdown from "./Dat102Markdown";
import Dat102Sources from "./Dat102Sources";
import { Dat102ComingSoon } from "./Dat102WikilinkText";

export interface RelatedLink {
  title: string;
  route: string;
}

export interface PracticeCounts {
  quizCount: number;
  drillCount: number;
  flashcardCount: number;
  examSubqCount: number;
}

interface Props {
  kind: "topic" | "concept";
  title: string;
  slug: string;
  body: string;
  supportedBy: SourceRef[];
  relatedTopics: RelatedLink[];
  relatedConcepts: RelatedLink[];
  lectureRefs?: { code: string; anchor: string }[];
  practice: PracticeCounts;
  diagram?: ReactNode;
}

// Felles detalj-layout for tema- og begrepssider: brødsmuler, badges, tittel,
// vault-markdown, valgfritt diagram, relaterte lenker (med visningstitler),
// "øv på dette"-panel (coming soon i Phase 1) og kildepanel.
export default function Dat102EntityDetail({
  kind,
  title,
  slug,
  body,
  supportedBy,
  relatedTopics,
  relatedConcepts,
  lectureRefs = [],
  practice,
  diagram,
}: Props) {
  const hasRelated = relatedTopics.length > 0 || relatedConcepts.length > 0;
  // Live øvingslenker (Phase 2). Eksamensdeloppgaver er fortsatt coming-soon (Phase 3).
  const practiceLinks: { label: string; href: string }[] = [];
  if (practice.quizCount > 0)
    practiceLinks.push({ label: `${practice.quizCount} quizspørsmål`, href: "/dat102/oving/quiz" });
  if (practice.flashcardCount > 0)
    practiceLinks.push({ label: `${practice.flashcardCount} flashcards`, href: "/dat102/oving/flashcards" });
  if (practice.drillCount > 0)
    practiceLinks.push({ label: `${practice.drillCount} drills`, href: "/dat102/oving/drills" });

  return (
    <div className="max-w-3xl mx-auto py-2">
      <Dat102Breadcrumbs
        trail={[
          kind === "topic"
            ? { label: "Temaer", href: "/dat102/temaer" }
            : { label: "Begreper", href: "/dat102/begreper" },
          { label: slug },
        ]}
      />

      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <Dat102Badge tone={kind === "topic" ? "topic" : "concept"}>
          {kind === "topic" ? "Tema" : "Begrep"}
        </Dat102Badge>
        {lectureRefs.map((l) => (
          <Link
            key={l.anchor}
            href={`/dat102/pensum#${l.anchor}`}
            className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border-dat102-200 dark:border-dat102-900 hover:bg-dat102-100 dark:hover:bg-dat102-900/60 transition-colors"
            title={`Gå til ${l.code} i pensumplanen`}
          >
            {l.code}
          </Link>
        ))}
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-6 text-balance">
        {title}
      </h1>

      <article>
        <Dat102Markdown content={body} />
      </article>

      {diagram && <div className="mt-8">{diagram}</div>}

      {hasRelated && (
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            Relatert
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((t) => (
              <Link
                key={`topic-${t.route}`}
                href={t.route}
                className="px-3 py-1.5 rounded-full border border-dat102-300 dark:border-dat102-700 text-sm text-dat102-800 dark:text-dat102-200 hover:bg-dat102-50 dark:hover:bg-dat102-950/40 transition-colors"
              >
                Tema: {t.title}
              </Link>
            ))}
            {relatedConcepts.map((c) => (
              <Link
                key={`concept-${c.route}`}
                href={c.route}
                className="px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {(practiceLinks.length > 0 || practice.examSubqCount > 0) && (
        <div className="mt-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4">
          <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2.5">
            Øv på dette
          </h2>
          <div className="flex flex-wrap gap-2">
            {practiceLinks.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-dat102-700 dark:text-dat102-300 bg-dat102-50 dark:bg-dat102-950/40 border border-dat102-200 dark:border-dat102-800/70 hover:bg-dat102-100 dark:hover:bg-dat102-900/40 transition-colors"
              >
                <span aria-hidden>→</span>
                {p.label}
              </Link>
            ))}
            {practice.examSubqCount > 0 && (
              <span className="text-sm self-center text-[var(--muted)]">
                <Dat102ComingSoon>
                  {practice.examSubqCount} eksamensdeloppgaver
                </Dat102ComingSoon>{" "}
                <span className="text-xs">(Phase 3)</span>
              </span>
            )}
          </div>
        </div>
      )}

      <Dat102Sources sources={supportedBy} />
    </div>
  );
}
