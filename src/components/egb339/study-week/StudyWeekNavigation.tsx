"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { PilotStatus } from "../pilot/Egb339PilotProgress";
import type { Egb339CourseWeek } from "@/lib/egb339-course";
import { egb339WeekSections, type Egb339WeekSection } from "@/lib/egb339-study-weeks";
import { egb339WeekSubject } from "@/lib/egb339";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { IconBookOpen, IconChevronDown, IconClipboardCheck, IconFlask, IconMenu, IconSigma } from "../icons";

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

export function StudyWeekJumpNavigation({ sectionsNo, sectionsEn, label }: { sectionsNo: Egb339WeekSection[]; sectionsEn?: Egb339WeekSection[]; label?: string }) {
  const { lang } = useEgb339Lang();
  const sections = lang === "en" && sectionsEn ? sectionsEn : sectionsNo;
  const ariaLabel = label ?? ui(lang, "onThisPage");
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
  return <nav ref={navigation} className="egb-week-jump" aria-label={ariaLabel}>
    {sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{section.short}</a>)}
  </nav>;
}

const REFERENCE_LINKS = [
  { href: "/egb339/vurderinger", key: "referenceAssessments", Icon: IconClipboardCheck },
  { href: "/egb339/oppsummering", key: "referenceCheatsheet", Icon: IconSigma },
  { href: "/egb339/ressurser", key: "referenceResources", Icon: IconFlask },
  { href: "/egb339/temaer", key: "referenceIndex", Icon: IconBookOpen },
] as const;

export default function StudyWeekCourseNavigation({ weeks }: { weeks: Egb339CourseWeek[] }) {
  const pathname = usePathname();
  const active = useActiveSection(pathname);
  const { lang } = useEgb339Lang();
  const { ready, authed, loadError, isCompleted } = useProgress();
  const currentWeek = weeks.find((week) => week.href === pathname || week.topics.some((topic) => topic.href === pathname));
  const topics = currentWeek?.topics ?? weeks.flatMap((week) => week.topics);
  const done = topics.filter((topic) => isCompleted(topic.pageKey)).length;
  // Accordion state: the current topic starts expanded; others stay collapsed
  // until requested. Several topics may be open at once.
  const [openWeeks, setOpenWeeks] = useState<ReadonlySet<number>>(() => new Set(currentWeek ? [currentWeek.week] : []));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigation = useRef<HTMLOListElement>(null);
  useEffect(() => {
    // Route entry: close the mobile panel and reveal the current topic once.
    setMobileOpen(false);
    if (currentWeek) setOpenWeeks((previous) => previous.has(currentWeek.week) ? previous : new Set([...previous, currentWeek.week]));
  }, [pathname, currentWeek]);
  useEffect(() => {
    const container = navigation.current;
    const current = container?.querySelector<HTMLElement>('[data-current-week="true"], [aria-current="page"]');
    if (!container || !current) return;
    // Reveal the current topic once on route entry, never follow article scrolling.
    const box = container.getBoundingClientRect(), item = current.getBoundingClientRect();
    if (item.top < box.top || item.bottom > box.bottom) container.scrollTop += item.top - box.top - 8;
  }, [pathname]);
  const toggleWeek = (week: number) => setOpenWeeks((previous) => {
    const next = new Set(previous);
    if (next.has(week)) next.delete(week); else next.add(week);
    return next;
  });
  const weekTitle = (week: number) => {
    const subject = egb339WeekSubject(week);
    return lang === "en" ? subject?.titleEn ?? "" : subject?.title ?? "";
  };
  return <aside className="egb-pilot-sidebar egb-week-sidebar">
    <nav aria-label={ui(lang, "courseNavigation")}>
      <Link href="/egb339" className="egb-pilot-course-title" aria-current={pathname === "/egb339" ? "page" : undefined}>EGB339</Link>
      <p className="egb-pilot-small">Introduction to Robotics</p>
      <p className="egb-week-sidebar-progress" role="status">{!ready ? ui(lang, "loadingProgress") : !authed || loadError ? ui(lang, "progressUnavailable") : `${currentWeek ? weekTitle(currentWeek.week) : ui(lang, "wholeCourse")}: ${lang === "en" ? `${done} of ${topics.length} subtopics completed` : `${done} av ${topics.length} temaer fullført`}`}</p>
      <button type="button" className="egb-week-nav-toggle" aria-expanded={mobileOpen} aria-controls="egb-course-topics" onClick={() => setMobileOpen((open) => !open)}>
        <IconMenu />
        <span className="egb-week-nav-toggle-text">
          <span>{ui(lang, "courseNavigationToggle")}</span>
          {currentWeek && <span className="egb-week-nav-toggle-current">{weekTitle(currentWeek.week)}</span>}
        </span>
        <IconChevronDown className="egb-week-chevron" />
      </button>
      <div className="egb-week-nav-panel" id="egb-course-topics" data-mobile-open={mobileOpen} onClick={(event) => {
        // Any navigation from the panel (same-page anchors included) dismisses the mobile panel.
        if ((event.target as HTMLElement).closest("a")) setMobileOpen(false);
      }}>
        <ol className="egb-week-accordion" ref={navigation} tabIndex={0} aria-label={ui(lang, "allTopicsAria")}>
          {weeks.map((week) => {
            const open = openWeeks.has(week.week);
            const isCurrent = currentWeek?.week === week.week;
            return <li key={week.week} className="egb-week-accordion-item" data-current-week={isCurrent}>
              <div className="egb-week-accordion-header">
                <button type="button" id={`egb-week-button-${week.week}`} className="egb-week-accordion-toggle" aria-expanded={open} aria-controls={`egb-week-panel-${week.week}`} aria-label={weekTitle(week.week)} onClick={() => toggleWeek(week.week)}>
                  <IconChevronDown className="egb-week-chevron" />
                </button>
                <Link href={week.href} className="egb-week-accordion-link" aria-current={week.href === pathname ? "page" : undefined}>
                  <span className="egb-week-accordion-meta">{ui(lang, "weekOf")} {week.week}</span>
                  <span className="egb-week-accordion-name">{weekTitle(week.week)}</span>
                </Link>
                <PilotStatus pageKey={week.pageKey} short />
              </div>
              <div id={`egb-week-panel-${week.week}`} role="region" aria-labelledby={`egb-week-button-${week.week}`} hidden={!open}>
                <ul className="egb-week-accordion-sections">
                  {egb339WeekSections(week, lang).map((section) => {
                    const current = week.href === pathname && active === section.id;
                    const topicPage = week.topics.some((topic) => topic.pageKey === section.pageKey && topic.href === pathname);
                    return <li key={section.id} className={section.id === "vurderinger" || section.id === "oppgaver" ? "egb-week-nav-assessment" : undefined}>
                      <Link href={`${week.href}#${section.id}`} aria-current={current ? "location" : topicPage ? "page" : undefined}>
                        {section.pageKey ? <PilotStatus pageKey={section.pageKey} short current={current || topicPage} /> : <span className="egb-week-reading-marker" aria-hidden="true">{current ? "●" : ""}</span>}
                        <span>{section.title}</span>
                      </Link>
                    </li>;
                  })}
                </ul>
              </div>
            </li>;
          })}
        </ol>
        <ul className="egb-pilot-reference-nav">
          {REFERENCE_LINKS.map(({ href, key, Icon }) => <li key={href}><Link href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}><Icon /><span>{ui(lang, key)}</span></Link></li>)}
        </ul>
      </div>
    </nav>
  </aside>;
}
