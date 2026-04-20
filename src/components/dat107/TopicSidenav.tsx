"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";

interface NavTopic {
  slug: string;
  title: string;
}

interface NavGroup {
  title?: string;
  topics: NavTopic[];
}

interface TopicSidenavProps {
  areaSlug: string;
  currentTopicSlug: string;
  shortTitle: string;
  groups: NavGroup[];
  classes: {
    shortTitle: string;
    activeItem: string;
    hoverItem: string;
  };
}

export default function TopicSidenav({
  areaSlug,
  currentTopicSlug,
  shortTitle,
  groups,
  classes,
}: TopicSidenavProps) {
  const { isCompleted } = useProgress();

  return (
    <div className="sticky top-20 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
      <p
        className={`text-xs uppercase tracking-wide font-bold mb-3 ${classes.shortTitle}`}
      >
        {shortTitle}
      </p>
      <nav className="space-y-4">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.title && (
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted)] mb-1.5 px-3">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.topics.map((t) => {
                const done = isCompleted(`dat107/${areaSlug}/${t.slug}`);
                const active = t.slug === currentTopicSlug;
                return (
                  <Link
                    key={t.slug}
                    href={`/dat107/${areaSlug}/${t.slug}`}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      active ? classes.activeItem : classes.hoverItem
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        done
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-neutral-300 dark:border-neutral-600"
                      }`}
                    >
                      {done && (
                        <svg
                          className="h-2.5 w-2.5"
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
                      )}
                    </span>
                    <span className="truncate">{t.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
