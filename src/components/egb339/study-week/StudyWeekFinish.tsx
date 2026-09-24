"use client";

import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import { PilotEntryNav, type PilotNavLink } from "../pilot/PilotNav";
import { egb339WeekSubject } from "@/lib/egb339";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";

interface Props {
  number: number;
  pageKey: string;
  previous: PilotNavLink | null;
  next: PilotNavLink | null;
}

/** Week page footer: completion control and previous/next topic navigation. */
export default function StudyWeekFinish({ number, pageKey, previous, next }: Props) {
  const { lang } = useEgb339Lang();
  const subject = egb339WeekSubject(number)!;
  const title = lang === "en" ? subject.titleEn : subject.title;
  return <footer className="egb-pilot-prose egb-week-finish">
    <h2>{ui(lang, "completeTopicPrefix")} {title}</h2>
    <p>{ui(lang, "topicMarkNote")} ({ui(lang, "weekOf")} {number}) {lang === "en"
      ? "is separate from subtopics and assessments. Mark it when you have worked through the material and checked the exercises you are working on."
      : "er separat fra temaer og assessments. Marker når du har gjennomgått stoffet og kontrollert oppgavene du arbeider med."}</p>
    <Egb339PilotProgress pageKey={pageKey} />
    <PilotEntryNav previous={previous} next={next} />
  </footer>;
}
