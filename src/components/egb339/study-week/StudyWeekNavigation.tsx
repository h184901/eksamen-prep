"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import TutorButton from "@/components/AITutor/TutorButton";
import { PilotStatus } from "../pilot/Egb339PilotProgress";
import type { Egb339CourseWeek } from "@/lib/egb339-course";
import { egb339AssessmentAnchor, egb339WeekSections, type Egb339WeekSection } from "@/lib/egb339-study-weeks";

const sectionSelector = "[data-week-one-section], [data-egb-week-section]";
function hashTarget() {
  const raw = window.location.hash.slice(1);
  try { return document.getElementById(decodeURIComponent(raw)); }
  catch { return document.getElementById(raw); }
}

function useActiveSection(pathname: string) {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // A lazy lesson can replace its initial markup. Measure live sections,
      // not detached nodes from before the interactive guide mounted.
      const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
      const jump = document.querySelector<HTMLElement>(".egb-week-jump");
      const line = jump && getComputedStyle(jump).position === "sticky" ? 64 + jump.offsetHeight + 24 : 100;
      const reached = sections.filter((section) => section.getBoundingClientRect().top <= line);
      setActive(reached.at(-1)?.id ?? sections[0]?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const fromHash = () => {
      const section = hashTarget()?.closest<HTMLElement>(sectionSelector);
      if (section) setActive(section.id);
    };
    update();
    fromHash();
    // Native scrolling is the source of truth; one bounded measurement per frame,
    // with React updating only when the section identity actually changes.
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("egb339:sections-ready", schedule);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("egb339:sections-ready", schedule);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [pathname]);
  return active;
}

export function StudyWeekJumpNavigation({ sections, label = "På denne ukesiden" }: { sections: Egb339WeekSection[]; label?: string }) {
  const pathname = usePathname();
  const active = useActiveSection(pathname);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    let routeState: unknown = window.history.state;
    const preserveRoute = () => {
      if (window.location.pathname !== pathname) return;
      if (window.history.state !== null) routeState = window.history.state;
      else if (routeState) window.history.replaceState(routeState, "");
    };
    const nav = navigation.current;
    const shell = nav?.closest<HTMLElement>(".egb339-pilot");
    const measure = () => shell?.style.setProperty("--week-anchor-offset", `${64 + (nav?.offsetHeight ?? 72) + 20}px`);
    measure();
    const observer = new ResizeObserver(measure);
    if (nav) observer.observe(nav);
    const frame = requestAnimationFrame(() => hashTarget()?.scrollIntoView({ block: "start", behavior: "instant" }));
    window.addEventListener("hashchange", preserveRoute);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      shell?.style.removeProperty("--week-anchor-offset");
      window.removeEventListener("hashchange", preserveRoute);
    };
  }, [pathname]);
  return <nav ref={navigation} className="egb-week-jump" aria-label={label}>
    {sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{section.short}</a>)}
  </nav>;
}

export default function StudyWeekCourseNavigation({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const pathname = usePathname();
  const active = useActiveSection(pathname);
  const { ready, authed, loadError, isCompleted } = useProgress();
  const currentWeek = weeks.find((week) => week.href === pathname || week.topics.some((topic) => topic.href === pathname));
  const topics = currentWeek?.topics ?? weeks.flatMap((week) => week.topics);
  const done = topics.filter((topic) => isCompleted(topic.pageKey)).length;
  const navigation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = navigation.current;
    const current = container?.querySelector<HTMLElement>('[data-current-week="true"], [aria-current="page"]');
    if (!container || !current) return;
    // Reveal the current week once on route entry, never follow article scrolling.
    const box = container.getBoundingClientRect(), item = current.getBoundingClientRect();
    if (item.top < box.top || item.bottom > box.bottom) container.scrollTop += item.top - box.top - 8;
  }, [pathname]);
  return <aside className="egb-pilot-sidebar egb-week-sidebar">
    <nav aria-label="EGB339 kurs og progresjon">
      <Link href="/egb339" className="egb-pilot-course-title" aria-current={pathname === "/egb339" ? "page" : undefined}>EGB339</Link>
      <p className="egb-pilot-small">Introduction to Robotics</p>
      <p className="egb-week-sidebar-progress" role="status">{!ready ? "Laster fremgang…" : !authed || loadError ? "Fremgang er utilgjengelig" : `${currentWeek ? `Uke ${currentWeek.week}` : "Kurset"}: ${done} av ${topics.length} temaer fullført`}</p>
      <div className="egb-pilot-weeks" ref={navigation} tabIndex={0} aria-label="Alle uker og temaer">
        {weeks.map((week) => <section className="egb-week-nav-group" key={week.week} aria-labelledby={`week-nav-${week.week}`}>
          <h2 id={`week-nav-${week.week}`} data-current-week={currentWeek?.week === week.week}><Link href={week.href} aria-current={week.href === pathname ? "page" : undefined}>Week {week.week}<PilotStatus pageKey={week.pageKey} short /></Link></h2>
          <ul>
            {egb339WeekSections(week).map((section) => {
              const current = week.href === pathname && active === section.id;
              const topicPage = week.topics.some((topic) => topic.pageKey === section.pageKey && topic.href === pathname);
              return <li key={section.id} className={section.id === "vurderinger" || section.id === "oppgaver" ? "egb-week-nav-assessment" : undefined}>
                <Link href={`${week.href}#${section.id}`} aria-current={current ? "location" : topicPage ? "page" : undefined}>
                  {section.pageKey ? <PilotStatus pageKey={section.pageKey} short current={current || topicPage} /> : <span className="egb-week-reading-marker" aria-hidden="true">{current ? "●" : ""}</span>}
                  <span>{section.title}</span>
                </Link>
              </li>;
            })}
            {week.week !== 1 && week.assessments.map((assessment) => <li key={assessment.href} className="egb-week-nav-assessment">
              <Link href={`${week.href}#${egb339AssessmentAnchor(assessment.href.split("/").at(-1)!)}`} aria-current={pathname === assessment.href ? "page" : undefined}><PilotStatus pageKey={assessment.pageKey} short /><span>{assessment.title}</span></Link>
            </li>)}
          </ul>
        </section>)}
      </div>
      <ul className="egb-pilot-reference-nav">
        {[["/egb339/vurderinger", "Assessments"], ["/egb339/oppsummering", "Hurtigark og formler"], ["/egb339/ressurser", "Praktiske ressurser"], ["/egb339/temaer", "Fagregister"]].map(([href, title]) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined}>{title}</Link></li>)}
      </ul>
      <div className="egb-week-tutor"><TutorButton /></div>
    </nav>
  </aside>;
}
