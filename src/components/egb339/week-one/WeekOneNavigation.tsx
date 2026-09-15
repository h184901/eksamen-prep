"use client";

import { WEEK_ONE_SECTIONS } from "@/lib/egb339-week-one";
import { StudyWeekJumpNavigation } from "../study-week/StudyWeekNavigation";

export { default } from "../study-week/StudyWeekNavigation";

/** The pilot API stays stable; all weeks now use its navigation system. */
export function WeekOneJumpNavigation() {
  return <StudyWeekJumpNavigation sections={[...WEEK_ONE_SECTIONS]} />;
}
