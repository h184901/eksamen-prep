"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import type { Egb339CourseWeek } from "@/lib/egb339-course";
import { IconArrowRight, IconCheck, IconPlay } from "./icons";

/**
 * The landing page's primary action: continue where you left off.
 * Uses the same Postgres-backed progress keys as the rest of the course.
 */
export default function Egb339ContinueCard({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const { ready, authed, loadError, isCompleted } = useProgress();
  const total = weeks.length;
  const done = weeks.filter((week) => isCompleted(week.pageKey)).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const next = weeks.find((week) => !isCompleted(week.pageKey));
  const available = ready && authed && !loadError;

  const href = !available ? weeks[0]?.href ?? "/egb339/uker" : next ? next.href : "/egb339/oppsummering";
  const label = !available ? "Start med emne 1" : next ? (done === 0 ? "Start studiet" : "Fortsett studiet") : "Repeter med hurtigarket";
  const supporting = !available ? weeks[0]?.title : next ? `Uke ${next.week} · ${next.title}` : "Alle emner er fullført";

  return <section className="egb-continue-card" aria-labelledby="egb-continue-heading">
    <div className="egb-continue-info">
      <h2 id="egb-continue-heading">{available && next ? "Neste emne for deg" : "Kom i gang"}</h2>
      <p className="egb-continue-progress-text" role="status">
        {!ready ? "Laster fremgang…" : loadError ? "Fremgang er utilgjengelig akkurat nå." : !authed ? "Logg inn for å spore fremgangen din." : `${done} av ${total} emner fullført`}
      </p>
      <div className="egb-continue-bar" role="progressbar" aria-label="Fullførte EGB339-emner" aria-valuemin={0} aria-valuemax={100} aria-valuenow={available ? percent : 0}>
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
