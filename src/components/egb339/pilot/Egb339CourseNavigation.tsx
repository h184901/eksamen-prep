"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { type Egb339CourseWeek } from "@/lib/egb339-course";
import { egb339WeekSubject } from "@/lib/egb339";
import { egb339Title } from "@/lib/egb339-titles";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { PilotStatus } from "./Egb339PilotProgress";
import WeekOneCourseNavigation from "../week-one/WeekOneNavigation";
import { egb339StudyHref } from "@/lib/egb339-study-weeks";

export default function Egb339CourseNavigation({ weeks }: { weeks: Egb339CourseWeek[] }) {
  return <WeekOneCourseNavigation weeks={weeks} />;
}

export function Egb339Syllabus({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const { ready, authed, loadError, isCompleted } = useProgress();
  const { lang } = useEgb339Lang();
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
  const weekTitle = (week: number) => {
    const subject = egb339WeekSubject(week);
    return lang === "en" ? subject?.titleEn ?? "" : subject?.title ?? "";
  };
  return <>
    <p className="egb-pilot-course-progress">{!ready ? ui(lang, "loadingProgress") : !authed || loadError ? ui(lang, "progressUnavailableLong") : `${completedWeeks} / ${weeks.length} ${ui(lang, "topicsMarkedCompleted")}.`} {ui(lang, "separateMarks")}</p>
    {ready && authed && !loadError && next && <p>{ui(lang, "nextUnfinished")}: <Link href={egb339StudyHref(next.href)}>{egb339Title(next.href.split("/").at(-1)!, lang) ?? next.title}</Link></p>}
    {ready && authed && !loadError && !next && <p>{ui(lang, "allRead")}</p>}
    <div role="group" className="egb-pilot-syllabus-controls" aria-label={ui(lang, "showTopicsAria")}>
      <button type="button" onClick={() => setOpenWeeks(new Set(weeks.map((week) => week.week)))}>{ui(lang, "showAllTopics")}</button>
      <button type="button" onClick={() => setOpenWeeks(new Set())}>{ui(lang, "hideAllTopics")}</button>
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
        <summary><span className="egb-syllabus-title"><span className="egb-syllabus-meta">{ui(lang, "weekOf")} {week.week}</span><strong>{weekTitle(week.week)}</strong></span><PilotStatus pageKey={week.pageKey} /></summary>
        <div className="egb-pilot-syllabus-body">
          <ol>{week.topics.map((topic) => <li key={topic.href}>
            <PilotStatus pageKey={topic.pageKey} short /><Link href={egb339StudyHref(topic.href)}>{egb339Title(topic.href.split("/").at(-1)!, lang) ?? topic.title}</Link>
          </li>)}</ol>
          <p><Link href={week.href}>{ui(lang, "openFullTopic")}</Link></p>
          {week.assessments.length > 0 && <><h3>{ui(lang, "assessmentsUsingThis")}</h3>
            <ul>{week.assessments.map((assessment) => <li key={assessment.href}><PilotStatus pageKey={assessment.pageKey} short /><Link href={assessment.href}>{egb339Title(assessment.href.split("/").at(-1)!, lang) ?? assessment.title}</Link></li>)}</ul>
            <p className="egb-pilot-small">{ui(lang, "curriculumNote")}</p>
          </>}
        </div>
      </details>)}
    </div>
  </>;
}
