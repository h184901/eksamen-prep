"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";

interface WeekStep {
  slug: string;
  route: string;
  week: string;
}

export default function Egb339NextStep({ weeks }: { weeks: WeekStep[] }) {
  const { ready, completed } = useProgress();
  const nextWeek = weeks.find(
    (week) => !completed.has(`egb339/uke/${week.slug}`),
  );
  const completedWeeks = weeks.filter((week) =>
    completed.has(`egb339/uke/${week.slug}`),
  ).length;

  const href = ready && !nextWeek ? "/egb339/oppsummering" : nextWeek?.route ?? weeks[0]?.route ?? "/egb339/uker";
  const label = !ready
    ? "Finn neste steg"
    : !nextWeek
      ? "Repeter med hurtigarket"
      : completedWeeks === 0
        ? `Start med uke ${nextWeek.week}`
        : `Fortsett med uke ${nextWeek.week}`;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-robotics-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-robotics-800 dark:bg-robotics-400 dark:text-robotics-950 dark:hover:bg-robotics-300"
    >
      {label} <span aria-hidden>→</span>
    </Link>
  );
}
