"use client";

import { egb339WeekSubject } from "@/lib/egb339";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { IconFlask } from "../icons";

interface Props {
  number: number;
  topicCount: number;
  problemCount: number;
  assessmentCount: number;
  purpose: string;
  purposeEn: string;
}

/** Week page header: kicker, subject title, purpose and content pills. */
export default function StudyWeekHeader({ number, topicCount, problemCount, assessmentCount, purpose, purposeEn }: Props) {
  const { lang } = useEgb339Lang();
  const subject = egb339WeekSubject(number)!;
  return <header className="egb-week-heading">
    <p className="egb-week-kicker">{ui(lang, "weekOf")} {number} {ui(lang, "weekOfTotal")} · EGB339</p>
    <h1>{lang === "en" ? subject.titleEn : subject.title}</h1>
    <p className="egb-pilot-prose">{lang === "en" ? purposeEn : purpose}</p>
    <ul className="egb-week-meta" aria-label={ui(lang, "topicContentsAria")}>
      <li className="egb-pill">{topicCount} {ui(lang, "pillTopics")}</li>
      {problemCount > 0 && <li className="egb-pill">{problemCount} {ui(lang, "pillProblems")}</li>}
      {assessmentCount > 0 && <li className="egb-pill">{assessmentCount} {assessmentCount === 1 ? ui(lang, "pillAssessment") : ui(lang, "pillAssessments")}</li>}
      <li className="egb-pill egb-pill-interactive"><IconFlask />{lang === "en" ? subject.interactiveEn : subject.interactive}</li>
    </ul>
  </header>;
}
