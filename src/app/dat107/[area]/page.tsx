import Link from "next/link";
import { notFound } from "next/navigation";
import {
  dat107Areas,
  getDAT107Area,
  type DAT107Area,
  type DAT107AreaIntroSection,
  type DAT107Accent,
  type DAT107Topic,
} from "@/lib/dat107";

export function generateStaticParams() {
  return dat107Areas.map((a) => ({ area: a.slug }));
}

const accentStyles: Record<
  NonNullable<DAT107AreaIntroSection["accent"]>,
  string
> = {
  purple:
    "border-dat107-400/40 bg-gradient-to-br from-dat107-50 to-fuchsia-50 dark:from-dat107-950/60 dark:to-fuchsia-950/40 dark:border-dat107-500/40",
  sky:
    "border-sky-300/50 bg-sky-50/70 dark:bg-sky-950/25 dark:border-sky-700/40",
  emerald:
    "border-emerald-300/50 bg-emerald-50/70 dark:bg-emerald-950/25 dark:border-emerald-700/40",
  amber:
    "border-amber-300/50 bg-amber-50/70 dark:bg-amber-950/25 dark:border-amber-700/40",
  fuchsia:
    "border-fuchsia-300/50 bg-fuchsia-50/70 dark:bg-fuchsia-950/25 dark:border-fuchsia-700/40",
};

const accentTitleStyles: Record<
  NonNullable<DAT107AreaIntroSection["accent"]>,
  string
> = {
  purple: "text-dat107-700 dark:text-dat107-300",
  sky: "text-sky-700 dark:text-sky-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  amber: "text-amber-700 dark:text-amber-300",
  fuchsia: "text-fuchsia-700 dark:text-fuchsia-300",
};

type AreaAccentClasses = {
  headerText: string;
  pill: string;
  trackPill: string;
  mustKnowWrap: string;
  mustKnowTitle: string;
  mustKnowArrow: string;
  examFocusWrap: string;
  examFocusTitle: string;
  examFocusDiamond: string;
  phaseTitle: string;
  cardBorder: string;
  cardHoverText: string;
  cardIndexBg: string;
};

function areaAccentClasses(accent: DAT107Accent): AreaAccentClasses {
  switch (accent) {
    case "amber":
      return {
        headerText: "text-amber-700 dark:text-amber-300",
        pill:
          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
        trackPill:
          "bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-400/40",
        mustKnowWrap:
          "border-amber-300/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-orange-950/40 dark:border-amber-500/40",
        mustKnowTitle: "text-amber-800 dark:text-amber-200",
        mustKnowArrow: "text-amber-700 dark:text-amber-300",
        examFocusWrap:
          "border-amber-400/60 bg-amber-50/80 dark:bg-amber-950/40 dark:border-amber-600/50",
        examFocusTitle: "text-amber-800 dark:text-amber-200",
        examFocusDiamond: "text-amber-700 dark:text-amber-300",
        phaseTitle: "text-amber-700 dark:text-amber-300",
        cardBorder: "border-amber-500/30 hover:border-amber-500/60",
        cardHoverText:
          "group-hover:text-amber-700 dark:group-hover:text-amber-300",
        cardIndexBg:
          "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200",
      };
    case "red":
      return {
        headerText: "text-red-700 dark:text-red-300",
        pill: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
        trackPill:
          "bg-red-500/15 text-red-800 dark:text-red-200 border border-red-400/40",
        mustKnowWrap:
          "border-red-300/50 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/60 dark:to-pink-950/40 dark:border-red-500/40",
        mustKnowTitle: "text-red-800 dark:text-red-200",
        mustKnowArrow: "text-red-700 dark:text-red-300",
        examFocusWrap:
          "border-red-400/60 bg-red-50/80 dark:bg-red-950/40 dark:border-red-600/50",
        examFocusTitle: "text-red-800 dark:text-red-200",
        examFocusDiamond: "text-red-700 dark:text-red-300",
        phaseTitle: "text-red-700 dark:text-red-300",
        cardBorder: "border-red-500/30 hover:border-red-500/60",
        cardHoverText:
          "group-hover:text-red-700 dark:group-hover:text-red-300",
        cardIndexBg:
          "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200",
      };
    default:
      return {
        headerText: "text-dat107-700 dark:text-dat107-300",
        pill:
          "bg-dat107-100 text-dat107-700 dark:bg-dat107-900/40 dark:text-dat107-200",
        trackPill:
          "bg-dat107-500/15 text-dat107-700 dark:text-dat107-200 border border-dat107-400/40",
        mustKnowWrap:
          "border-dat107-400/40 bg-gradient-to-br from-dat107-50 to-fuchsia-50 dark:from-dat107-950/70 dark:to-fuchsia-950/50 dark:border-dat107-500/50",
        mustKnowTitle: "text-dat107-700 dark:text-dat107-300",
        mustKnowArrow: "text-dat107-600 dark:text-dat107-300",
        examFocusWrap:
          "border-amber-300/60 bg-amber-50/70 dark:bg-amber-950/30 dark:border-amber-700/50",
        examFocusTitle: "text-amber-800 dark:text-amber-200",
        examFocusDiamond: "text-amber-700 dark:text-amber-300",
        phaseTitle: "text-dat107-700 dark:text-dat107-300",
        cardBorder: "border-dat107-500/30 hover:border-dat107-500/60",
        cardHoverText:
          "group-hover:text-dat107-600 dark:group-hover:text-dat107-300",
        cardIndexBg:
          "bg-dat107-100 dark:bg-dat107-900/40 text-dat107-700 dark:text-dat107-200",
      };
  }
}

function TopicCard({
  area,
  topic,
  index,
  accent,
}: {
  area: DAT107Area;
  topic: DAT107Topic;
  index: number;
  accent: AreaAccentClasses;
}) {
  return (
    <Link
      href={`/dat107/${area.slug}/${topic.slug}`}
      className={`group rounded-xl border-2 bg-[var(--card)] p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${accent.cardBorder}`}
    >
      <div className="flex items-start gap-3 mb-2">
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${accent.cardIndexBg}`}
        >
          {index}
        </span>
        <h3
          className={`font-bold leading-snug transition-colors ${accent.cardHoverText}`}
        >
          {topic.title}
        </h3>
      </div>
      <p className="text-sm text-[var(--muted)] pl-11">{topic.description}</p>
    </Link>
  );
}

function PhaseGroup({
  area,
  title,
  description,
  topics,
  startIndex,
  accent,
}: {
  area: DAT107Area;
  title: string;
  description?: string;
  topics: DAT107Topic[];
  startIndex: number;
  accent: AreaAccentClasses;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-3 flex-wrap">
        <h3 className={`text-lg font-bold ${accent.phaseTitle}`}>{title}</h3>
        {description && (
          <p className="text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <TopicCard
            key={topic.slug}
            area={area}
            topic={topic}
            index={startIndex + i}
            accent={accent}
          />
        ))}
      </div>
    </section>
  );
}

export default async function DAT107AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = getDAT107Area(areaSlug);
  if (!area) notFound();

  const accent = areaAccentClasses(area.accent ?? "purple");

  const phaseTopics: Array<{
    title: string;
    description?: string;
    topics: DAT107Topic[];
  }> = [];
  const coveredSlugs = new Set<string>();

  if (area.phases && area.phases.length > 0) {
    for (const phase of area.phases) {
      const topics = phase.topicSlugs
        .map((slug) => area.topics.find((t) => t.slug === slug))
        .filter((t): t is DAT107Topic => !!t);
      topics.forEach((t) => coveredSlugs.add(t.slug));
      if (topics.length > 0) {
        phaseTopics.push({
          title: phase.title,
          description: phase.description,
          topics,
        });
      }
    }
    const leftover = area.topics.filter((t) => !coveredSlugs.has(t.slug));
    if (leftover.length > 0) {
      phaseTopics.push({ title: "Mer", topics: leftover });
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <Link href="/dat107" className="hover:text-[var(--accent)]">
            DAT107
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{area.title}</span>
        </div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {area.weight && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.pill}`}
            >
              {area.weight} av eksamen
            </span>
          )}
          {area.trackLabel && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.trackPill}`}
            >
              {area.trackLabel}
            </span>
          )}
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${accent.headerText}`}>
          {area.title}
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          {area.longDescription}
        </p>
      </div>

      {area.intro && area.intro.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {area.intro.map((section, i) => {
            const a = section.accent ?? "purple";
            return (
              <div
                key={i}
                className={`rounded-xl border-2 ${accentStyles[a]} p-5`}
              >
                <h3
                  className={`font-bold text-sm uppercase tracking-wide mb-2 ${accentTitleStyles[a]}`}
                >
                  {section.title}
                </h3>
                <p className="text-sm text-neutral-800 dark:text-neutral-100 leading-relaxed">
                  {section.body}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {area.mustKnow && area.mustKnow.length > 0 && (
        <div className={`mb-6 rounded-xl border-2 p-6 ${accent.mustKnowWrap}`}>
          <div className="flex items-center gap-2 mb-3">
            <svg
              className={`w-5 h-5 ${accent.mustKnowTitle}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className={`font-bold text-lg ${accent.mustKnowTitle}`}>
              Dette må du kunne
            </h2>
          </div>
          <ul className="space-y-1.5">
            {area.mustKnow.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-neutral-800 dark:text-neutral-100"
              >
                <span className={`font-bold shrink-0 ${accent.mustKnowArrow}`}>
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {area.examFocus && area.examFocus.length > 0 && (
        <div className={`mb-10 rounded-xl border-2 p-6 ${accent.examFocusWrap}`}>
          <div className="flex items-center gap-2 mb-3">
            <svg
              className={`w-5 h-5 ${accent.examFocusTitle}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m4-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className={`font-bold text-lg ${accent.examFocusTitle}`}>
              Typiske eksamensoppgaver
            </h2>
          </div>
          <ul className="space-y-1.5">
            {area.examFocus.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-neutral-800 dark:text-neutral-100"
              >
                <span className={`font-bold shrink-0 ${accent.examFocusDiamond}`}>
                  ◆
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {phaseTopics.length > 0 ? (
        (() => {
          let runningIndex = 1;
          return (
            <>
              <h2 className="text-xl font-bold mb-4">Temaer</h2>
              {phaseTopics.map((group, gi) => {
                const start = runningIndex;
                runningIndex += group.topics.length;
                return (
                  <PhaseGroup
                    key={gi}
                    area={area}
                    title={group.title}
                    description={group.description}
                    topics={group.topics}
                    startIndex={start}
                    accent={accent}
                  />
                );
              })}
            </>
          );
        })()
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Temaer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {area.topics.map((topic, i) => (
              <TopicCard
                key={topic.slug}
                area={area}
                topic={topic}
                index={i + 1}
                accent={accent}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
