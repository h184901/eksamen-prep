import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  dat107Areas,
  getDAT107Topic,
  type DAT107Accent,
  type DAT107Area,
  type DAT107Topic,
} from "@/lib/dat107";
import Markdown from "@/components/Markdown";
import VisitTracker from "@/components/dat107/VisitTracker";

export function generateStaticParams() {
  return dat107Areas.flatMap((a) =>
    a.topics.map((t) => ({ area: a.slug, topic: t.slug })),
  );
}

function readTopic(areaSlug: string, file: string): string | null {
  const full = path.join(
    process.cwd(),
    "src",
    "content",
    "dat107",
    areaSlug,
    file,
  );
  try {
    return fs.readFileSync(full, "utf8");
  } catch {
    return null;
  }
}

function buildSideNavGroups(
  area: DAT107Area,
): Array<{ title?: string; topics: DAT107Topic[] }> {
  if (!area.phases || area.phases.length === 0) {
    return [{ topics: area.topics }];
  }
  const groups: Array<{ title?: string; topics: DAT107Topic[] }> = [];
  const covered = new Set<string>();
  for (const phase of area.phases) {
    const topics = phase.topicSlugs
      .map((s) => area.topics.find((t) => t.slug === s))
      .filter((t): t is DAT107Topic => !!t);
    topics.forEach((t) => covered.add(t.slug));
    if (topics.length > 0) groups.push({ title: phase.title, topics });
  }
  const leftover = area.topics.filter((t) => !covered.has(t.slug));
  if (leftover.length > 0) groups.push({ title: "Mer", topics: leftover });
  return groups;
}

type TopicAccent = {
  shortTitle: string;
  pill: string;
  trackPill: string;
  activeItem: string;
  hoverItem: string;
  hoverBorder: string;
  hoverText: string;
};

function topicAccent(accent: DAT107Accent): TopicAccent {
  switch (accent) {
    case "amber":
      return {
        shortTitle: "text-amber-700 dark:text-amber-300",
        pill:
          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
        trackPill:
          "bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-400/40",
        activeItem:
          "bg-amber-500/15 text-amber-800 dark:text-amber-200 font-semibold",
        hoverItem:
          "text-[var(--muted)] hover:bg-amber-500/5 hover:text-[var(--foreground)]",
        hoverBorder: "hover:border-amber-500/50",
        hoverText:
          "group-hover:text-amber-700 dark:group-hover:text-amber-300",
      };
    case "red":
      return {
        shortTitle: "text-red-700 dark:text-red-300",
        pill: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
        trackPill:
          "bg-red-500/15 text-red-800 dark:text-red-200 border border-red-400/40",
        activeItem:
          "bg-red-500/15 text-red-800 dark:text-red-200 font-semibold",
        hoverItem:
          "text-[var(--muted)] hover:bg-red-500/5 hover:text-[var(--foreground)]",
        hoverBorder: "hover:border-red-500/50",
        hoverText: "group-hover:text-red-700 dark:group-hover:text-red-300",
      };
    default:
      return {
        shortTitle: "text-dat107-600 dark:text-dat107-400",
        pill:
          "bg-dat107-100 text-dat107-700 dark:bg-dat107-900/40 dark:text-dat107-200",
        trackPill:
          "bg-dat107-500/15 text-dat107-700 dark:text-dat107-200 border border-dat107-400/40",
        activeItem:
          "bg-dat107-500/15 text-dat107-700 dark:text-dat107-300 font-semibold",
        hoverItem:
          "text-[var(--muted)] hover:bg-dat107-500/5 hover:text-[var(--foreground)]",
        hoverBorder: "hover:border-dat107-500/50",
        hoverText:
          "group-hover:text-dat107-600 dark:group-hover:text-dat107-400",
      };
  }
}

export default async function DAT107TopicPage({
  params,
}: {
  params: Promise<{ area: string; topic: string }>;
}) {
  const { area: areaSlug, topic: topicSlug } = await params;
  const found = getDAT107Topic(areaSlug, topicSlug);
  if (!found) notFound();
  const { area, topic } = found;

  const content = readTopic(area.slug, topic.file);
  if (content === null) notFound();

  const index = area.topics.findIndex((t) => t.slug === topic.slug);
  const prev = index > 0 ? area.topics[index - 1] : null;
  const next =
    index < area.topics.length - 1 ? area.topics[index + 1] : null;

  const navGroups = buildSideNavGroups(area);
  const a = topicAccent(area.accent ?? "purple");

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <Link href="/dat107" className="hover:text-[var(--accent)]">
            DAT107
          </Link>
          <span>/</span>
          <Link
            href={`/dat107/${area.slug}`}
            className="hover:text-[var(--accent)]"
          >
            {area.title}
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{topic.title}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p
              className={`text-xs uppercase tracking-wide font-bold mb-3 ${a.shortTitle}`}
            >
              {area.shortTitle}
            </p>
            <nav className="space-y-4">
              {navGroups.map((group, gi) => (
                <div key={gi}>
                  {group.title && (
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted)] mb-1.5 px-3">
                      {group.title}
                    </p>
                  )}
                  <div className="space-y-0.5">
                    {group.topics.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/dat107/${area.slug}/${t.slug}`}
                        className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          t.slug === topic.slug ? a.activeItem : a.hoverItem
                        }`}
                      >
                        {t.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <VisitTracker areaSlug={area.slug} topicSlug={topic.slug} />
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs uppercase tracking-wide font-bold ${a.shortTitle}`}
            >
              {area.shortTitle}
            </span>
            {area.weight && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.pill}`}
              >
                {area.weight}
              </span>
            )}
            {area.trackLabel && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.trackPill}`}
              >
                {area.trackLabel}
              </span>
            )}
          </div>
          {topic.description && (
            <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
              {topic.description}
            </p>
          )}
          <Markdown content={content} />

          <div className="mt-12 pt-6 border-t border-[var(--card-border)] grid sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/dat107/${area.slug}/${prev.slug}`}
                className={`group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-colors ${a.hoverBorder}`}
              >
                <p className="text-xs text-[var(--muted)] mb-1">← Forrige</p>
                <p className={`font-semibold ${a.hoverText}`}>{prev.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/dat107/${area.slug}/${next.slug}`}
                className={`group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-colors text-right ${a.hoverBorder}`}
              >
                <p className="text-xs text-[var(--muted)] mb-1">Neste →</p>
                <p className={`font-semibold ${a.hoverText}`}>{next.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
