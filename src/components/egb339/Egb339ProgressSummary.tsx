"use client";

import { useProgress } from "@/components/ProgressProvider";

export default function Egb339ProgressSummary({ totalWeeks }: { totalWeeks: number }) {
  const { ready, completed } = useProgress();
  let done = 0;
  for (const key of completed) {
    if (key.startsWith("egb339/uke/")) done += 1;
  }
  const percent = totalWeeks ? Math.round((done / totalWeeks) * 100) : 0;

  return (
    <div className="rounded-2xl border border-robotics-300/60 bg-white/85 p-5 shadow-sm dark:border-robotics-800 dark:bg-neutral-950/90">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-robotics-700 dark:text-robotics-300">Semesterfremgang</p>
          <p className="mt-1 text-3xl font-bold text-neutral-950 dark:text-white">
            {ready ? `${done}/${totalWeeks}` : "—"}
          </p>
        </div>
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          {ready ? `${percent} %` : "Laster"}
        </p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-robotics-100 dark:bg-robotics-950">
        <div
          className="h-full rounded-full bg-gradient-to-r from-robotics-500 to-cyan-400 transition-all duration-500"
          style={{ width: ready ? `${percent}%` : "0%" }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
        Merk en ukeside som fullført når du kan forklare hovedideen uten å lese svaret.
      </p>
    </div>
  );
}
