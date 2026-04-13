"use client";

import { useEffect, useState } from "react";

interface ProgressTrackerProps {
  chapterId: number;
  sections: string[];
}

function getStorageKey(chapterId: number) {
  return `progress-ch${chapterId}`;
}

export default function ProgressTracker({
  chapterId,
  sections,
}: ProgressTrackerProps) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(getStorageKey(chapterId));
    if (stored) {
      setCompleted(new Set(JSON.parse(stored)));
    }
  }, [chapterId]);

  const toggle = (index: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      localStorage.setItem(getStorageKey(chapterId), JSON.stringify([...next]));
      return next;
    });
  };

  const progress = sections.length > 0 ? (completed.size / sections.length) * 100 : 0;

  if (!mounted) {
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
          {completed.size}/{sections.length} fullført
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Checklist */}
      <ul className="space-y-2">
        {sections.map((section, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex items-center gap-3 w-full text-left text-sm py-1 group"
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${
                  completed.has(i)
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-neutral-300 dark:border-neutral-600 group-hover:border-[var(--accent)]"
                }`}
              >
                {completed.has(i) && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={completed.has(i) ? "line-through text-[var(--muted)]" : ""}>
                {section}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
