"use client";

import { useProgress } from "@/components/ProgressProvider";

export default function CompletionToggle({ pageKey }: { pageKey: string }) {
  const { ready, isCompleted, toggle } = useProgress();
  const done = isCompleted(pageKey);

  return (
    <div
      role="region"
      aria-label="Fullført-status for denne siden"
      className={`mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
        done
          ? "border-emerald-400/50 bg-emerald-50/70 dark:bg-emerald-950/30 dark:border-emerald-500/40"
          : "border-[var(--card-border)] bg-[var(--card)]"
      }`}
    >
      <div className="flex items-center gap-2 text-sm">
        <span
          aria-hidden
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
            done
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-neutral-300 dark:border-neutral-600"
          }`}
        >
          {done && (
            <svg
              className="h-3.5 w-3.5"
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
        <span className="font-semibold">
          {!ready
            ? "Laster fremgang…"
            : done
              ? "Fullført"
              : "Ikke fullført"}
        </span>
      </div>
      <button
        type="button"
        disabled={!ready}
        onClick={() => toggle(pageKey)}
        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          done
            ? "border-emerald-400/50 bg-white text-emerald-700 hover:bg-emerald-50 dark:bg-neutral-900 dark:text-emerald-200 dark:hover:bg-emerald-950/40"
            : "border-dat107-400/50 bg-dat107-500/10 text-dat107-700 hover:bg-dat107-500/20 dark:text-dat107-200"
        }`}
      >
        {done ? "Merk som ikke fullført" : "Merk som fullført"}
      </button>
    </div>
  );
}
