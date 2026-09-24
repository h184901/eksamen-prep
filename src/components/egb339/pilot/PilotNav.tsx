"use client";

import Link from "next/link";
import { EGB339_PILOT } from "@/lib/egb339-course";
import { egb339WeekSubject } from "@/lib/egb339";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { IconArrowLeft, IconArrowRight } from "../icons";

export interface PilotNavLink {
  href: string;
  title: string;
  titleEn?: string;
  pageKey: string;
}

export function PilotSkipLink() {
  const { lang } = useEgb339Lang();
  return <a className="egb-pilot-skip" href="#egb-lesson">{ui(lang, "skipToLesson")}</a>;
}

export function PilotBreadcrumb({ title, titleEn, week, section }: { title: string; titleEn?: string; week?: number; section?: { href: string; title: string; titleEn?: string } }) {
  const { lang } = useEgb339Lang();
  const subject = week !== undefined ? egb339WeekSubject(week) : null;
  const subjectTitle = subject ? (lang === "en" ? subject.titleEn : subject.title) : null;
  const pageTitle = lang === "en" ? titleEn ?? title : title;
  // Week pages pass the subject as the page title; don't repeat it as a crumb.
  const subjectIsPage = subjectTitle !== null && (subjectTitle === pageTitle || subject?.title === title);
  return <nav className="egb-pilot-breadcrumb" aria-label={ui(lang, "breadcrumb")}>
    <Link href={EGB339_PILOT.course}>EGB339</Link><span aria-hidden="true">/</span>
    {subject && !subjectIsPage && <><Link href={`/egb339/uker/uke-${week}`}>{subjectTitle}</Link><span aria-hidden="true">/</span></>}
    {section && <><Link href={section.href}>{lang === "en" ? section.titleEn ?? section.title : section.title}</Link><span aria-hidden="true">/</span></>}
    <span aria-current="page">{pageTitle}</span>
  </nav>;
}

export function PilotEntryNav({ previous, next }: { previous: PilotNavLink | null; next: PilotNavLink | null }) {
  const { lang } = useEgb339Lang();
  return <nav className="egb-pilot-entry-nav" aria-label={ui(lang, "prevNextAria")}>
    <div>{previous && <Link href={previous.href} className="egb-entry-card" data-direction="previous">
      <IconArrowLeft />
      <span className="egb-entry-text"><span>{ui(lang, "previous")}</span><strong>{lang === "en" ? previous.titleEn ?? previous.title : previous.title}</strong></span>
    </Link>}</div>
    <div>{next && <Link href={next.href} className="egb-entry-card" data-direction="next">
      <span className="egb-entry-text"><span>{ui(lang, "next")}</span><strong>{lang === "en" ? next.titleEn ?? next.title : next.title}</strong></span>
      <IconArrowRight />
    </Link>}</div>
  </nav>;
}
