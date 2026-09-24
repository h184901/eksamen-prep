"use client";

import { WEEK_ONE_SECTIONS, WEEK_ONE_SECTION_TITLES } from "@/lib/egb339-week-one";
import { StudyWeekJumpNavigation } from "../study-week/StudyWeekNavigation";

export { default } from "../study-week/StudyWeekNavigation";

/** The pilot API stays stable; all weeks now use its navigation system. */
export function WeekOneJumpNavigation() {
  const build = (lang: "no" | "en") => WEEK_ONE_SECTIONS.map((section) => {
    const titles = WEEK_ONE_SECTION_TITLES[section.id];
    return { id: section.id, title: titles?.[lang] ?? section.title, short: titles?.[lang === "no" ? "shortNo" : "shortEn"] ?? section.short };
  });
  return <StudyWeekJumpNavigation sectionsNo={build("no")} sectionsEn={build("en")} />;
}
