import Link from "next/link";
import { getEgb339Weeks } from "@/lib/egb339-vault/loader";
import {
  egb339DisplaySummary,
  egb339DisplayTitle,
  egb339TrackLabel,
} from "@/lib/egb339";
import { getEgb339ProblemCount } from "@/lib/egb339-problems";

export default function Egb339WeeksPage() {
  const weeks = getEgb339Weeks();
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Semesteret</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">Uke for uke</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Modulene følger kursrekkefølgen. Nye uker dukker opp her etter at materialet er ingestet i EGB339-wikien og synket til nettstedet.
      </p>

      <div className="relative mt-9 space-y-4 before:absolute before:bottom-5 before:left-[27px] before:top-5 before:w-px before:bg-robotics-200 dark:before:bg-robotics-900">
        {weeks.map((week) => (
          <Link key={week.slug} href={week.route} className="group relative grid grid-cols-[56px_1fr] gap-4">
            <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--background)] bg-robotics-700 text-sm font-bold text-white shadow-sm">
              {week.week}
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-all group-hover:border-robotics-400 group-hover:shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-robotics-700 dark:text-robotics-300">{egb339TrackLabel(week.track)}</span>
                <span className="text-sm text-[var(--muted)]">
                  Uke {week.week} · {getEgb339ProblemCount(Number(week.week))} oppgaver
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-neutral-950 dark:text-white">{egb339DisplayTitle(week)}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-700 dark:text-neutral-200">{egb339DisplaySummary(week)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
