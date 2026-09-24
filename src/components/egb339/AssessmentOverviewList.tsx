"use client";

import Link from "next/link";
import { PilotStatus } from "./pilot/Egb339PilotProgress";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";

export interface AssessmentOverviewRow {
  slug: string;
  href: string;
  pageKey: string;
  titleNo: string;
  titleEn: string | null;
  summaryNo: string;
  summaryEn: string | null;
  weeks: number[];
  week: string;
}

/** The assessments overview entry list, rendered in the active language. */
export default function AssessmentOverviewList({ rows }: { rows: AssessmentOverviewRow[] }) {
  const { lang } = useEgb339Lang();
  return <ul className="egb-study-index">
    {rows.map((row) => <li key={row.slug}>
      <div><PilotStatus pageKey={row.pageKey} short /><Link href={row.href}>{lang === "en" ? row.titleEn ?? row.titleNo : row.titleNo}</Link></div>
      <p>{lang === "en" ? row.summaryEn ?? row.summaryNo : row.summaryNo}</p>
      <p className="egb-pilot-small">{ui(lang, "curriculumLabel")}: {row.weeks.map((week, i) => <span key={week}>{i > 0 && ", "}<Link href={"/egb339/uker/uke-" + week}>{ui(lang, "weekOf")} {week}</Link></span>)}. {ui(lang, "assessmentWeekLabel")}: {row.week}.</p>
    </li>)}
  </ul>;
}