"use client";

import Link from "next/link";
import { PilotStatus } from "./pilot/Egb339PilotProgress";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { IconArrowRight, IconFlask } from "./icons";

export interface TopicRow {
  week: number;
  href: string;
  pageKey: string;
  titleNo: string;
  titleEn: string;
  purposeNo: string;
  purposeEn: string;
  interactiveNo: string;
  interactiveEn: string;
  topicCount: number;
  problemCount: number;
  assessmentCount: number;
}

/** The landing page's clean topic overview, rendered in the active language. */
export default function Egb339TopicList({ rows }: { rows: TopicRow[] }) {
  const { lang } = useEgb339Lang();
  return <ol className="egb-topic-list">
    {rows.map((row) => <li key={row.week}>
      <Link href={row.href} className="egb-topic-row">
        <span className="egb-topic-number" aria-hidden="true">{row.week}</span>
        <span className="egb-topic-main">
          <span className="egb-topic-title"><span className="sr-only">{ui(lang, "weekOf")} {row.week}: </span>{lang === "en" ? row.titleEn : row.titleNo}</span>
          <span className="egb-topic-purpose">{lang === "en" ? row.purposeEn : row.purposeNo}</span>
          <span className="egb-topic-meta">
            <span className="egb-pill">{row.topicCount} {ui(lang, "pillTopics")}</span>
            {row.problemCount > 0 && <span className="egb-pill">{row.problemCount} {ui(lang, "pillProblems")}</span>}
            {row.assessmentCount > 0 && <span className="egb-pill">{row.assessmentCount} {row.assessmentCount === 1 ? ui(lang, "pillAssessment") : ui(lang, "pillAssessments")}</span>}
            <span className="egb-pill egb-pill-interactive"><IconFlask />{lang === "en" ? row.interactiveEn : row.interactiveNo}</span>
          </span>
        </span>
        <PilotStatus pageKey={row.pageKey} short />
        <IconArrowRight className="egb-topic-arrow" />
      </Link>
    </li>)}
  </ol>;
}
