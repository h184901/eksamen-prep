"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import TutorButton from "@/components/AITutor/TutorButton";
import { PilotStatus } from "../pilot/Egb339PilotProgress";
import type { Egb339CourseWeek } from "@/lib/egb339-course";
import { WEEK_ONE_ROUTE, WEEK_ONE_SECTIONS } from "@/lib/egb339-week-one";

/** Read nine boundaries at most once per animation frame; hashes change only on navigation. */
function useActiveSection() {
  const [active, setActive] = useState<string>("introduction");
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-week-one-section]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = 164;
      const reached = sections.filter((section) => section.getBoundingClientRect().top <= readingLine);
      setActive(reached.at(-1)?.id ?? "introduction");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const fromHash = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      const section = target?.closest<HTMLElement>("[data-week-one-section]");
      if (section) setActive(section.id);
    };
    // Whole-section intersection skips the reading line when sections have a gap.
    // Native scrolling (including keyboard and same-hash links) is the source of truth.
    update();
    fromHash();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);
  return active;
}

export function WeekOneJumpNavigation() {
  const active = useActiveSection();
  useEffect(() => {
    // Native fragment navigation creates a null history entry. Next's router
    // ignores that entry on Back after a client-side lesson change. Carry the
    // current route's opaque state without depending on Next's private fields.
    let routeState: unknown = window.history.state;
    const preserveRoute = () => {
      if (window.location.pathname !== WEEK_ONE_ROUTE) return;
      if (window.history.state !== null) routeState = window.history.state;
      else if (routeState) window.history.replaceState(routeState, "");
    };
    // A restored client route may mount at the top even though its URL has a
    // fragment. Restore that learning section after its DOM has committed.
    const target = document.getElementById(window.location.hash.slice(1));
    const frame = requestAnimationFrame(() => target?.scrollIntoView({ block: "start", behavior: "instant" }));
    window.addEventListener("hashchange", preserveRoute);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", preserveRoute);
    };
  }, []);
  return <nav className="egb-week-jump" aria-label="På denne ukesiden">
    {WEEK_ONE_SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{section.short}</a>)}
  </nav>;
}

export default function WeekOneCourseNavigation({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const active = useActiveSection();
  const { ready, authed, loadError, isCompleted } = useProgress();
  const topics = weeks[0].topics;
  const done = topics.filter((topic) => isCompleted(topic.pageKey)).length;
  return <aside className="egb-pilot-sidebar egb-week-sidebar">
    <nav aria-label="EGB339 kurs og progresjon">
      <Link href="/egb339" className="egb-pilot-course-title">EGB339</Link>
      <p className="egb-pilot-small">Introduction to Robotics</p>
      <p className="egb-week-sidebar-progress" role="status">{!ready ? "Laster fremgang…" : !authed || loadError ? "Fremgang er utilgjengelig" : `Uke 1: ${done} av ${topics.length} temaer fullført`}</p>
      <div className="egb-pilot-weeks" tabIndex={0} aria-label="Alle uker og temaer">
        {weeks.map((week) => <section className="egb-week-nav-group" key={week.week} aria-labelledby={`week-nav-${week.week}`}>
          <h2 id={`week-nav-${week.week}`}><Link href={week.href} aria-current={week.week === 1 ? "page" : undefined}>Week {week.week}<PilotStatus pageKey={week.pageKey} short /></Link></h2>
          <ul>
            {week.week === 1 ? WEEK_ONE_SECTIONS.map((section) => <li key={section.id}>
              <a href={`${WEEK_ONE_ROUTE}#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
                {"pageKey" in section ? <PilotStatus pageKey={section.pageKey} short current={active === section.id} /> : <span className="egb-week-reading-marker" aria-hidden="true">{active === section.id ? "●" : ""}</span>}
                <span>{section.title}</span>
              </a>
            </li>) : week.topics.map((topic) => <li key={topic.href}><Link href={topic.href}><PilotStatus pageKey={topic.pageKey} short /><span>{topic.title}</span></Link></li>)}
            {week.week !== 1 && <li className="egb-week-nav-assessment"><Link href={week.href + "#oppgaver"}>Oppgaver og løsninger</Link></li>}
            {week.week !== 1 && week.assessments.map((assessment) => <li key={assessment.href} className="egb-week-nav-assessment"><Link href={assessment.href}><PilotStatus pageKey={assessment.pageKey} short /><span>{assessment.title}</span></Link></li>)}
          </ul>
        </section>)}
      </div>
      <ul className="egb-pilot-reference-nav">
        <li><Link href="/egb339/vurderinger">Assessments</Link></li>
        <li><Link href="/egb339/oppsummering">Hurtigark og formler</Link></li>
        <li><Link href="/egb339/ressurser">Praktiske ressurser</Link></li>
      </ul>
      <div className="egb-week-tutor"><TutorButton /></div>
    </nav>
  </aside>;
}
