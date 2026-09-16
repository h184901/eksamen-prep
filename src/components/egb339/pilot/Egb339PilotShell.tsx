import Link from "next/link";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { EGB339_PILOT, type Egb339CourseLink } from "@/lib/egb339-course";
import { egb339WeekSubjectTitle } from "@/lib/egb339";
import { IconArrowLeft, IconArrowRight } from "../icons";
import Egb339CourseNavigation from "./Egb339CourseNavigation";

export default function Egb339PilotShell({ children }: { children: React.ReactNode }) {
  return <div className="egb339-pilot">
    <a className="egb-pilot-skip" href="#egb-lesson">Hopp til leksjonen</a>
    <Egb339CourseNavigation weeks={getEgb339Course()} />
    <div id="egb-lesson" tabIndex={-1} className="egb-pilot-content">{children}</div>
  </div>;
}

export function PilotBreadcrumb({ title, week, section }: { title: string; week?: number; section?: { href: string; title: string } }) {
  const subject = week !== undefined ? egb339WeekSubjectTitle(week) : null;
  // Week pages pass the subject as the page title; don't repeat it as a crumb.
  const subjectIsPage = subject !== null && subject === title;
  return <nav className="egb-pilot-breadcrumb" aria-label="Brødsmuler">
    <Link href={EGB339_PILOT.course}>EGB339</Link><span aria-hidden="true">/</span>
    {subject && !subjectIsPage && <><Link href={`/egb339/uker/uke-${week}`}>{subject}</Link><span aria-hidden="true">/</span></>}
    {section && <><Link href={section.href}>{section.title}</Link><span aria-hidden="true">/</span></>}
    <span aria-current="page">{title}</span>
  </nav>;
}

export function PilotEntryNav({ previous, next }: { previous: Egb339CourseLink | null; next: Egb339CourseLink | null }) {
  return <nav className="egb-pilot-entry-nav" aria-label="Forrige og neste side">
    <div>{previous && <Link href={previous.href} className="egb-entry-card" data-direction="previous">
      <IconArrowLeft />
      <span className="egb-entry-text"><span>Forrige</span><strong>{previous.title}</strong></span>
    </Link>}</div>
    <div>{next && <Link href={next.href} className="egb-entry-card" data-direction="next">
      <span className="egb-entry-text"><span>Neste</span><strong>{next.title}</strong></span>
      <IconArrowRight />
    </Link>}</div>
  </nav>;
}
