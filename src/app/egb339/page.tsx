import Link from "next/link";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { getEgb339Week, getEgb339En } from "@/lib/egb339-vault/loader";
import { getEgb339ProblemsForWeek } from "@/lib/egb339-problems";
import { EGB339_WEEK_LEARNING } from "@/lib/egb339-week-learning";
import { egb339DisplaySummary, egb339WeekSubject } from "@/lib/egb339";
import { T } from "@/components/egb339/T";
import Egb339ContinueCard from "@/components/egb339/Egb339ContinueCard";
import Egb339TopicList, { type TopicRow } from "@/components/egb339/Egb339TopicList";
import { EGB339_UI } from "@/lib/egb339-language/ui";
import { IconArrowRight, IconBookOpen, IconClipboardCheck, IconFlask, IconSigma } from "@/components/egb339/icons";

const TOOLS = [
  { href: "/egb339/uker/uke-2#laboratorium", title: EGB339_UI.toolSe2Title, description: EGB339_UI.toolSe2Description },
  { href: "/egb339/uker/uke-4#laboratorium", title: EGB339_UI.toolFkTitle, description: EGB339_UI.toolFkDescription },
  { href: "/egb339/uker/uke-5#laboratorium", title: EGB339_UI.toolIkTitle, description: EGB339_UI.toolIkDescription },
  { href: "/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration", title: EGB339_UI.toolGuideTitle, description: EGB339_UI.toolGuideDescription },
] as const;

export default function Egb339Page() {
  const weeks = getEgb339Course();
  const rows: TopicRow[] = weeks.map((week) => {
    const entry = getEgb339Week(`uke-${week.week}`)!;
    const subject = egb339WeekSubject(week.week)!;
    const learning = EGB339_WEEK_LEARNING[week.week];
    const en = getEgb339En(entry.slug);
    return {
      week: week.week,
      href: week.href,
      pageKey: week.pageKey,
      titleNo: subject.title,
      titleEn: subject.titleEn,
      purposeNo: learning?.purpose ?? egb339DisplaySummary(entry),
      purposeEn: learning?.purposeEn ?? en?.summary ?? egb339DisplaySummary(entry),
      interactiveNo: subject.interactive,
      interactiveEn: subject.interactiveEn,
      topicCount: week.topics.length,
      problemCount: getEgb339ProblemsForWeek(week.week).length,
      assessmentCount: week.assessments.length,
    };
  });
  return <article className="egb-pilot-article egb-course-home">
    <header className="egb-course-hero">
      <p className="egb-course-kicker"><T no={EGB339_UI.landingKicker.no} en={EGB339_UI.landingKicker.en} /></p>
      <h1>Introduction to Robotics</h1>
      <p className="egb-course-lede"><T no={EGB339_UI.landingLede.no} en={EGB339_UI.landingLede.en} /></p>
    </header>

    <Egb339ContinueCard weeks={weeks} />

    <section aria-labelledby="topics-heading">
      <h2 id="topics-heading"><T no={EGB339_UI.topicsHeading.no} en={EGB339_UI.topicsHeading.en} /></h2>
      <p><T no={EGB339_UI.topicsIntro.no} en={EGB339_UI.topicsIntro.en} /></p>
      <Egb339TopicList rows={rows} />
    </section>

    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading"><T no={EGB339_UI.toolsHeading.no} en={EGB339_UI.toolsHeading.en} /></h2>
      <p><T no={EGB339_UI.toolsIntro.no} en={EGB339_UI.toolsIntro.en} /></p>
      <ul className="egb-tool-list">
        {TOOLS.map((tool) => <li key={tool.href}>
          <Link href={tool.href}>
            <IconFlask />
            <span className="egb-tool-text">
              <span className="egb-tool-title"><T no={tool.title.no} en={tool.title.en} /></span>
              <span className="egb-tool-description"><T no={tool.description.no} en={tool.description.en} /></span>
            </span>
            <IconArrowRight />
          </Link>
        </li>)}
      </ul>
    </section>

    <section aria-labelledby="assessments-heading">
      <h2 id="assessments-heading"><T no={EGB339_UI.assessmentsHeading.no} en={EGB339_UI.assessmentsHeading.en} /></h2>
      <p><T no={EGB339_UI.assessmentsIntro.no} en={EGB339_UI.assessmentsIntro.en} /></p>
      <p><Link className="egb-course-link" href="/egb339/vurderinger"><IconClipboardCheck /><T no={EGB339_UI.openAssessments.no} en={EGB339_UI.openAssessments.en} /><IconArrowRight /></Link></p>
    </section>

    <section aria-labelledby="more-heading">
      <h2 id="more-heading"><T no={EGB339_UI.moreHeading.no} en={EGB339_UI.moreHeading.en} /></h2>
      <ul className="egb-course-link-list">
        <li><Link href="/egb339/oppsummering"><IconSigma /><T no={EGB339_UI.cheatsheetLink.no} en={EGB339_UI.cheatsheetLink.en} /><span><T no={EGB339_UI.cheatsheetDescription.no} en={EGB339_UI.cheatsheetDescription.en} /></span></Link></li>
        <li><Link href="/egb339/temaer"><IconBookOpen /><T no={EGB339_UI.indexLink.no} en={EGB339_UI.indexLink.en} /><span><T no={EGB339_UI.indexDescription.no} en={EGB339_UI.indexDescription.en} /></span></Link></li>
        <li><Link href="/egb339/ressurser"><IconFlask /><T no={EGB339_UI.resourcesLink.no} en={EGB339_UI.resourcesLink.en} /><span><T no={EGB339_UI.resourcesDescription.no} en={EGB339_UI.resourcesDescription.en} /></span></Link></li>
      </ul>
    </section>
  </article>;
}
