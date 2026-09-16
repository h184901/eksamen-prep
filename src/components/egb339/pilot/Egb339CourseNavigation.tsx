"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { type Egb339CourseWeek } from "@/lib/egb339-course";
import { PilotStatus } from "./Egb339PilotProgress";
import WeekOneCourseNavigation from "../week-one/WeekOneNavigation";
import { egb339StudyHref } from "@/lib/egb339-study-weeks";

export default function Egb339CourseNavigation({ weeks }: { weeks: Egb339CourseWeek[] }) {
  return <WeekOneCourseNavigation weeks={weeks} />;
}

export function Egb339Syllabus({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const { ready, authed, loadError, isCompleted } = useProgress();
  const [openWeeks, setOpenWeeks] = useState(() => new Set([2]));
  useEffect(() => {
    const reveal = () => {
      const match = window.location.hash.match(/^#uke-(\d+)$/);
      if (!match) return;
      const week = Number(match[1]);
      setOpenWeeks((previous) => new Set([...previous, week]));
      requestAnimationFrame(() => document.getElementById(`uke-${week}`)?.scrollIntoView({ block: "start" }));
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  const next = weeks.flatMap((week) => week.topics).find((topic) => !isCompleted(topic.pageKey));
  const completedWeeks = weeks.filter((week) => isCompleted(week.pageKey)).length;
  return <>
    <p className="egb-pilot-course-progress">{!ready ? "Laster fremgang…" : !authed || loadError ? "Fremgang er utilgjengelig." : `${completedWeeks} av ${weeks.length} emner markert fullført.`} Emner og temaer har separate fullføringsmerker.</p>
    {ready && authed && !loadError && next && <p>Neste ufullførte tema: <Link href={egb339StudyHref(next.href)}>{next.title}</Link></p>}
    {ready && authed && !loadError && !next && <p>Alle temaene i leseløpet er markert fullført. Du finner oppgavene og assessments under hvert emne.</p>}
    <div role="group" className="egb-pilot-syllabus-controls" aria-label="Vis emner i kursplanen">
      <button type="button" onClick={() => setOpenWeeks(new Set(weeks.map((week) => week.week)))}>Vis alle emner</button>
      <button type="button" onClick={() => setOpenWeeks(new Set())}>Lukk alle emner</button>
    </div>
    <div className="egb-pilot-syllabus">
      {weeks.map((week) => <details key={week.week} id={`uke-${week.week}`} open={openWeeks.has(week.week)} onToggle={(event) => {
        const open = event.currentTarget.open;
        setOpenWeeks((previous) => {
          if (previous.has(week.week) === open) return previous;
          const next = new Set(previous);
          if (open) next.add(week.week); else next.delete(week.week);
          return next;
        });
      }}>
        <summary><span className="egb-syllabus-title"><span className="egb-syllabus-meta">Uke {week.week}</span><strong>{week.title}</strong></span><PilotStatus pageKey={week.pageKey} /></summary>
        <div className="egb-pilot-syllabus-body">
          <ol>{week.topics.map((topic) => <li key={topic.href}>
            <PilotStatus pageKey={topic.pageKey} short /><Link href={egb339StudyHref(topic.href)}>{topic.title}</Link>
          </li>)}</ol>
          <p><Link href={week.href}>Åpne hele emnesiden</Link></p>
          {week.assessments.length > 0 && <><h3>Assessments som bruker dette stoffet</h3>
            <ul>{week.assessments.map((assessment) => <li key={assessment.href}><PilotStatus pageKey={assessment.pageKey} short /><Link href={assessment.href}>{assessment.title}</Link></li>)}</ul>
            <p className="egb-pilot-small">Pensumkobling, ikke innleveringsuke. Se vurderingssiden for krav.</p>
          </>}
        </div>
      </details>)}
    </div>
  </>;
}
