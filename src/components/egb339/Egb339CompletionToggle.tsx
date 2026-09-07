"use client";

import { useProgress } from "@/components/ProgressProvider";

export default function Egb339CompletionToggle({ pageKey }: { pageKey: string }) {
  const { ready, isCompleted, toggle } = useProgress();
  const done = isCompleted(pageKey);

  return (
    <div
      className={`mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 ${
        done
          ? "border-emerald-400/60 bg-emerald-50/70 dark:border-emerald-600/50 dark:bg-emerald-950/30"
          : "border-robotics-200 bg-robotics-50/40 dark:border-robotics-900 dark:bg-robotics-950/20"
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
            done
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-robotics-400 text-robotics-700 dark:text-robotics-300"
          }`}
        >
          {done ? "✓" : ""}
        </span>
        {!ready ? "Laster fremgang…" : done ? "Fullført" : "Ikke fullført"}
      </div>
      <button
        type="button"
        disabled={!ready}
        onClick={() => toggle(pageKey)}
        className="rounded-lg border border-robotics-400/60 bg-white px-3 py-1.5 text-sm font-semibold text-robotics-800 transition-colors hover:bg-robotics-50 disabled:opacity-50 dark:bg-neutral-950 dark:text-robotics-200 dark:hover:bg-robotics-950/50"
      >
        {done ? "Angre" : "Merk som fullført"}
      </button>
    </div>
  );
}
