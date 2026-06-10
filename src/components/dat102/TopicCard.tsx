import Link from "next/link";

export interface TopicCardProps {
  index: number; // semesterposisjon 1..14
  slug: string;
  title: string;
  description: string;
  conceptCount: number;
  practiceCount: number; // quiz + drills (kommer i Phase 2)
  examSubqCount: number;
  obligCount: number;
  lectureRefs: { code: string; anchor: string }[];
  chapters: string[];
}

// Temakort på /dat102/temaer. Hele hovedflaten lenker til temasiden;
// forelesningschipsene nederst lenker til pensum-ankrene (derfor div + Link,
// ikke nested links).
export default function TopicCard({
  index,
  slug,
  title,
  description,
  conceptCount,
  practiceCount,
  examSubqCount,
  obligCount,
  lectureRefs,
  chapters,
}: TopicCardProps) {
  const metaParts: string[] = [
    `${conceptCount} begrep${conceptCount === 1 ? "" : "er"}`,
  ];
  if (practiceCount > 0) metaParts.push(`${practiceCount} øvingsoppgaver`);
  if (examSubqCount > 0) metaParts.push(`${examSubqCount} eksamensdeloppgaver`);
  if (obligCount > 0)
    metaParts.push(`${obligCount} oblig${obligCount === 1 ? "" : "er"}`);

  return (
    <div className="flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden transition-all hover:border-dat102-400/70 hover:shadow-md">
      <Link href={`/dat102/temaer/${slug}`} className="group flex-1 px-5 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold w-6 h-6 rounded-full bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300 flex items-center justify-center flex-shrink-0">
            {index}
          </span>
          <h3 className="font-semibold leading-snug text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 mb-2.5">
          {description}
        </p>
        <p className="text-xs text-[var(--muted)]">{metaParts.join(" · ")}</p>
      </Link>
      {(lectureRefs.length > 0 || chapters.length > 0) && (
        <div className="px-5 pb-4 pt-1 flex flex-wrap items-center gap-1.5 border-t border-[var(--card-border)]/60 mt-auto">
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
          {chapters.length > 0 && (
            <span className="text-[11px] text-[var(--muted)] ml-auto">
              Kap. {chapters.join(", ")}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
