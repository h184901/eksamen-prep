"use client";

import { useProgress } from "@/components/ProgressProvider";

interface ProgressTrackerProps {
  pageKeyPrefix: string;
  sections: string[];
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProgressTracker({
  pageKeyPrefix,
  sections,
}: ProgressTrackerProps) {
  const { ready, isCompleted, toggle } = useProgress();

  const items = sections.map((label) => {
    const slug = slugify(label);
    const pageKey = `${pageKeyPrefix}/${slug}`;
    return { label, pageKey, done: isCompleted(pageKey) };
  });

  const completedCount = items.filter((i) => i.done).length;
  const total = items.length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  if (!ready) {
    return (
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 my-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Fremgang</h3>
        <span className="text-sm text-[var(--muted)]">
          {completedCount}/{total} fullført
        </span>
      </div>

      <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.pageKey}>
            <button
              onClick={() => toggle(item.pageKey)}
              className="flex items-center gap-3 w-full text-left text-sm py-1 group"
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${
                  item.done
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-neutral-300 dark:border-neutral-600 group-hover:border-[var(--accent)]"
                }`}
              >
                {item.done && (
                  <svg
                    className="w-3 h-3"
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
              <span
                className={
                  item.done ? "line-through text-[var(--muted)]" : ""
                }
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
