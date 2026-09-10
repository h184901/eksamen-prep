"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useProgress } from "@/components/ProgressProvider";
import { EGB339_PILOT, type Egb339CourseWeek } from "@/lib/egb339-course";
import { PilotStatus } from "./Egb339PilotProgress";

export default function Egb339CourseNavigation({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const pathname = usePathname();
  const { ready, authed, loadError } = useProgress();
  const weekNavigation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = weekNavigation.current;
    const current = container?.querySelector('[aria-current="page"]');
    if (!container || !current) return;
    let mounted = true;
    const reveal = () => {
      if (!mounted || !current.getClientRects().length) return;
      const item = current.getBoundingClientRect(), box = container.getBoundingClientRect();
      // Scroll only the course navigation, never steal a lesson's deep-link position.
      if (item.top < box.top) container.scrollTop += item.top - box.top - 8;
      else if (item.bottom > box.bottom) container.scrollTop += item.bottom - box.bottom + 8;
    };
    reveal();
    // Font loading and desktop resizing can change wrapping after the first paint.
    void document.fonts.ready.then(reveal);
    const resize = new ResizeObserver(reveal);
    resize.observe(container);
    resize.observe(current);
    return () => { mounted = false; resize.disconnect(); };
  }, [pathname, ready, authed, loadError]);
  const assessmentWeek = weeks.find((week) => week.assessments.some((entry) => entry.href === pathname))?.week;
  return <aside className="egb-pilot-sidebar">
    <nav aria-label="EGB339 kurs og progresjon">
      <Link href={EGB339_PILOT.course} className="egb-pilot-course-title" aria-current={pathname === EGB339_PILOT.course ? "page" : undefined}>EGB339</Link>
      <p className="egb-pilot-small">Introduction to Robotics</p>
      <Link href={EGB339_PILOT.course}>Kursplan</Link>
      <div className="egb-pilot-weeks" ref={weekNavigation}>
        {weeks.map((week) => {
          const active = week.href === pathname || week.topics.some((topic) => topic.href === pathname) ||
            week.week === assessmentWeek;
          return <details key={`${pathname}-${week.week}`} open={active || ((pathname === EGB339_PILOT.course || pathname === "/egb339/studieplan") && week.week === 2)}>
            <summary><span>Uke {week.week}</span><PilotStatus pageKey={week.pageKey} short /></summary>
            <p className="egb-pilot-week-label">{week.title}</p>
            <ul>
              {week.topics.map((topic) => <li key={topic.href}>
                <Link href={topic.href} aria-current={pathname === topic.href ? "page" : undefined}>
                  <PilotStatus pageKey={topic.pageKey} short current={pathname === topic.href} />
                  <span>{topic.title}</span>
                </Link>
              </li>)}
              <li><Link href={week.href} className="egb-pilot-week-link" aria-current={pathname === week.href ? "page" : undefined}>Oppgaver og ukeoversikt</Link></li>
              {week.assessments.map((assessment) => <li key={assessment.href}><Link href={assessment.href} aria-current={pathname === assessment.href ? "page" : undefined}>
                <PilotStatus pageKey={assessment.pageKey} short current={pathname === assessment.href} /><span>{assessment.title}</span>
              </Link></li>)}
            </ul>
          </details>;
        })}
      </div>
      <ul className="egb-pilot-reference-nav">
        {[["/egb339/vurderinger", "Assessments"], ["/egb339/oppsummering", "Hurtigark og formler"], ["/egb339/temaer", "Faglige sammenhenger"], ["/egb339/ressurser", "Praktiske ressurser"]].map(([href, title]) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined}>{title}</Link></li>)}
      </ul>
    </nav>
  </aside>;
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
    <p className="egb-pilot-course-progress">{!ready ? "Laster fremgang…" : !authed || loadError ? "Fremgang er utilgjengelig." : `${completedWeeks} av ${weeks.length} uker markert fullført.`} Uker og temaer har separate fullføringsmerker.</p>
    {ready && authed && !loadError && next && <p>Neste ufullførte tema: <Link href={next.href}>{next.title}</Link></p>}
    {ready && authed && !loadError && !next && <p>Alle temaene i leseløpet er markert fullført. Du finner ukens oppgaver og assessments under hver uke.</p>}
    <div role="group" className="egb-pilot-syllabus-controls" aria-label="Vis uker i kursplanen">
      <button type="button" onClick={() => setOpenWeeks(new Set(weeks.map((week) => week.week)))}>Vis alle uker</button>
      <button type="button" onClick={() => setOpenWeeks(new Set())}>Lukk alle uker</button>
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
        <summary><span>Uke {week.week}<strong>{week.title}</strong></span><PilotStatus pageKey={week.pageKey} /></summary>
        <div className="egb-pilot-syllabus-body">
          <ol>{week.topics.map((topic) => <li key={topic.href}>
            <PilotStatus pageKey={topic.pageKey} short /><Link href={topic.href}>{topic.title}</Link>
          </li>)}</ol>
          <p><Link href={week.href}>Ukens oppgaver og kilder</Link></p>
          {week.assessments.length > 0 && <><h3>Assessments som bruker dette stoffet</h3>
            <ul>{week.assessments.map((assessment) => <li key={assessment.href}><PilotStatus pageKey={assessment.pageKey} short /><Link href={assessment.href}>{assessment.title}</Link></li>)}</ul>
            <p className="egb-pilot-small">Pensumkobling, ikke innleveringsuke. Se vurderingssiden for krav.</p>
          </>}
        </div>
      </details>)}
    </div>
  </>;
}
