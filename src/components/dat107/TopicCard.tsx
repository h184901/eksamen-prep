"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import type { DAT107Topic } from "@/lib/dat107";

export interface TopicCardAccent {
  cardBorder: string;
  cardHoverText: string;
  cardIndexBg: string;
}

export default function TopicCard({
  areaSlug,
  topic,
  index,
  accent,
}: {
  areaSlug: string;
  topic: DAT107Topic;
  index: number;
  accent: TopicCardAccent;
}) {
  const { isCompleted } = useProgress();
  const done = isCompleted(`dat107/${areaSlug}/${topic.slug}`);

  return (
    <Link
      href={`/dat107/${areaSlug}/${topic.slug}`}
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
        {done && (
          <span
            title="Fullført"
            className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--muted)] pl-11">{topic.description}</p>
    </Link>
  );
}
