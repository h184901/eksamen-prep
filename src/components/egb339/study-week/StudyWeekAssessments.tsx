"use client";

import Link from "next/link";
import Egb339LangMarkdown from "../Egb339LangMarkdown";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";
import { egb339AssessmentAnchor } from "@/lib/egb339-study-weeks";
import { egb339Title } from "@/lib/egb339-titles";
import { egb339WeekSubject } from "@/lib/egb339";
import type { Egb339CourseWeek } from "@/lib/egb339-course";
import type { Egb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import type { Egb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";

export interface StudyWeekAssessmentData {
  slug: string;
  href: string;
  pageKey: string;
  entryTitle: string;
  solution: Egb339AssessmentSolution;
  solutionEn: Egb339AssessmentSolutionEn | null;
}

export default function StudyWeekAssessments({ week, assessments }: { week: Egb339CourseWeek; assessments: StudyWeekAssessmentData[] }) {
  const { lang } = useEgb339Lang();
  const subject = egb339WeekSubject(week.week)!;
  const weekTitle = lang === "en" ? subject.titleEn : subject.title;
  return <section id="vurderinger" data-egb-week-section className="egb-week-assessments">
    <h2>{ui(lang, "assessmentsForTopicPrefix")} {weekTitle}</h2>
    <p className="egb-pilot-prose">{ui(lang, "assessmentsForTopicNote")} {ui(lang, "weekOf")} {week.week}{ui(lang, "assessmentsForTopicNote2")}</p>
    <nav className="egb-week-assessment-index" aria-label={ui(lang, "assessmentInThisWeek")}>
      {assessments.map((data) => <a key={data.href} href={`#${egb339AssessmentAnchor(data.slug)}`}>{egb339Title(data.slug, lang) ?? data.entryTitle}</a>)}
    </nav>
    {assessments.map((data) => {
      const anchor = egb339AssessmentAnchor(data.slug);
      const scope = lang === "en" ? data.solutionEn?.scope ?? data.solution.scope : data.solution.scope;
      const source = lang === "en" ? data.solutionEn?.source ?? data.solution.source : data.solution.source;
      const title = egb339Title(data.slug, lang) ?? data.entryTitle;
      return <section key={data.slug} id={anchor} className="egb-week-assessment egb-pilot-prose">
        <h3>{title}</h3>
        <p>{scope}</p>
        <p className="egb-pilot-source">{source}</p>
        <p><Link href={data.href}>{ui(lang, "openAssessmentPage")}</Link></p>
        {data.solution.parts.map((part) => {
          const partEn = data.solutionEn?.parts[part.id];
          const partTitle = lang === "en" ? partEn?.title ?? part.title : part.title;
          return <div key={part.id} className="egb-week-assessment-part">
            <h4>{partTitle}</h4>
            <WeekOneDisclosure id={`${anchor}-solution-${part.id}`} title={`${title}: ${partTitle}`}>
              {part.missingSourceDetail && <p className="egb-week-notice" data-state="warning">{ui(lang, "missingSourceDetail")}</p>}
              <Egb339LangMarkdown no={part.content} en={partEn?.content} headingOffset={3} studyLinks />
              <p className="egb-pilot-small"><Link href={`${data.href}#solution-${part.id}`}>{ui(lang, "openPartOnAssessmentPage")}</Link></p>
            </WeekOneDisclosure>
          </div>;
        })}
        <Egb339PilotProgress pageKey={data.pageKey} />
      </section>;
    })}
  </section>;
}
