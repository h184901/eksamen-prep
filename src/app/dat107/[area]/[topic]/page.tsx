import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dat107Areas, getDAT107Topic } from "@/lib/dat107";
import Markdown from "@/components/Markdown";

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
  const next = index < area.topics.length - 1 ? area.topics[index + 1] : null;

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

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="text-xs uppercase tracking-wide font-bold text-dat107-600 dark:text-dat107-400 mb-3">
              {area.shortTitle}
            </p>
            <nav className="space-y-1">
              {area.topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/dat107/${area.slug}/${t.slug}`}
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    t.slug === topic.slug
                      ? "bg-dat107-500/15 text-dat107-700 dark:text-dat107-300 font-semibold"
                      : "text-[var(--muted)] hover:bg-dat107-500/5 hover:text-[var(--foreground)]"
                  }`}
                >
                  {t.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <Markdown content={content} />

          <div className="mt-12 pt-6 border-t border-[var(--card-border)] grid sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/dat107/${area.slug}/${prev.slug}`}
                className="group rounded-xl border border-[var(--card-border)] hover:border-dat107-500/50 bg-[var(--card)] p-4 transition-colors"
              >
                <p className="text-xs text-[var(--muted)] mb-1">← Forrige</p>
                <p className="font-semibold group-hover:text-dat107-600 dark:group-hover:text-dat107-400">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/dat107/${area.slug}/${next.slug}`}
                className="group rounded-xl border border-[var(--card-border)] hover:border-dat107-500/50 bg-[var(--card)] p-4 transition-colors text-right"
              >
                <p className="text-xs text-[var(--muted)] mb-1">Neste →</p>
                <p className="font-semibold group-hover:text-dat107-600 dark:group-hover:text-dat107-400">
                  {next.title}
                </p>
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
