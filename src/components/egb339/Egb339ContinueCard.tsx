"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import type { Egb339CourseWeek } from "@/lib/egb339-course";
import { egb339WeekSubject } from "@/lib/egb339";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { IconArrowRight, IconCheck, IconPlay } from "./icons";

/**
 * The landing page's primary action: continue where you left off.
 * Uses the same Postgres-backed progress keys as the rest of the course.
 */
export default function Egb339ContinueCard({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const { ready, authed, loadError, isCompleted } = useProgress();
  const { lang } = useEgb339Lang();
  const total = weeks.length;
  const done = weeks.filter((week) => isCompleted(week.pageKey)).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const next = weeks.find((week) => !isCompleted(week.pageKey));
  const available = ready && authed && !loadError;

  const href = !available ? weeks[0]?.href ?? "/egb339/uker" : next ? next.href : "/egb339/oppsummering";
  const label = !available ? ui(lang, "startTopic1") : next ? (done === 0 ? ui(lang, "startStudying") : ui(lang, "continueStudying")) : ui(lang, "reviewCheatsheet");
  const weekTitle = (week: number) => {
    const subject = egb339WeekSubject(week);
    return lang === "en" ? subject?.titleEn ?? "" : subject?.title ?? "";
  };
  const supporting = !available ? weeks[0] ? weekTitle(weeks[0].week) : "" : next ? `${ui(lang, "weekOf")} ${next.week} · ${weekTitle(next.week)}` : ui(lang, "allTopicsCompleted");

  return <section className="egb-continue-card" aria-labelledby="egb-continue-heading">
    <div className="egb-continue-info">
      <h2 id="egb-continue-heading">{available && next ? ui(lang, "continueHeading") : ui(lang, "getStartedHeading")}</h2>
      <p className="egb-continue-progress-text" role="status">
        {!ready ? ui(lang, "loadingProgress") : loadError ? ui(lang, "progressUnavailableLong") : !authed ? ui(lang, "loginToTrack") : `${done} / ${total} ${ui(lang, "topicsOfTotal")}`}
      </p>
      <div className="egb-continue-bar" role="progressbar" aria-label={ui(lang, "progressBarAria")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={available ? percent : 0}>
        <span style={{ width: `${available ? percent : 0}%` }} />
      </div>
    </div>
    <Link href={href} className="egb-continue-action">
      {available && !next ? <IconCheck /> : <IconPlay />}
      <span className="egb-continue-action-text">
        <span className="egb-continue-action-label">{label}</span>
        <span className="egb-continue-action-support">{supporting}</span>
      </span>
      <IconArrowRight />
    </Link>
  </section>;
}
