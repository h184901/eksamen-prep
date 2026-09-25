import Link from "next/link";
import { notFound } from "next/navigation";
import SE2Lesson from "@/components/egb339/pilot/SE2Lesson";
import PlanarKinematicsLesson from "@/components/egb339/pilot/PlanarKinematicsLesson";
import Egb339LangMarkdown from "@/components/egb339/Egb339LangMarkdown";
import Egb339PilotProgress, { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import { T } from "@/components/egb339/T";
import LangBlock from "@/components/egb339/LangBlock";
import { getEgb339Concept, getEgb339Concepts, getEgb339En } from "@/lib/egb339-vault/loader";
import { EGB339_COURSE_ORDER, egb339LessonNeighbours } from "@/lib/egb339-course";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { egb339DisplaySummary, egb339DisplayTitle } from "@/lib/egb339";
import { egb339Title } from "@/lib/egb339-titles";
import { EGB339_UI, ui } from "@/lib/egb339-language/ui";

export function generateStaticParams() { return getEgb339Concepts().map((entry) => ({ slug: entry.slug })); }
export default async function Egb339TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Concept(slug);
  if (!entry) notFound();
  if (slug === "se-2-homogeneous-transformations") return <SE2Lesson />;
  const week = EGB339_COURSE_ORDER.find((row) => (row.topics as readonly string[]).includes(slug))?.week;
  const adjacent = egb339LessonNeighbours(slug);
  const assessments = getEgb339Course().find((row) => row.week === week)?.assessments ?? [];
  const pageKey = "egb339/tema/" + slug;
  const planarMode = slug === "forward-kinematics" ? "fk" : slug === "inverse-kinematics" ? "ik" : null;
  const en = getEgb339En(slug);
  const titleNo = egb339Title(slug, "no") ?? egb339DisplayTitle(entry);
  const titleEn = egb339Title(slug, "en") ?? egb339DisplayTitle(entry);
  // Imported summaries repeat the opening definition verbatim. Keep the full,
  // linked definition in the article, not a second plain-text copy in the header.
  const repeatsDefinition = /^\s*\[!definition\]/i.test(entry.summary) && /^>\s*\[!definition\]/i.test(entry.body);
  // Insert the worked lab after the definition and first theory section, retaining every source paragraph.
  // The English body mirrors the Norwegian heading structure, so split each language at its own second "## ".
  const splitNo = planarMode ? entry.body.indexOf("\n## ", entry.body.indexOf("\n## ") + 1) : -1;
  const splitEn = planarMode && en?.body ? en.body.indexOf("\n## ", en.body.indexOf("\n## ") + 1) : -1;
  return <>
    <PilotBreadcrumb title={egb339DisplayTitle(entry)} week={week} section={week ? undefined : { href: "/egb339/temaer", title: "Referanser" }} />
    <article className="egb-pilot-article">
      <header className="egb-pilot-lesson-header">
        <h1><T no={titleNo} en={titleEn} /></h1>{!repeatsDefinition && <p><T no={egb339DisplaySummary(entry)} en={en?.summary ?? egb339DisplaySummary(entry)} /></p>}
        <PilotStatus pageKey={pageKey} />
        {planarMode && <LangBlock
          no={<nav aria-label={ui("no", "inThisLesson")}><a href="#planar-modell">Modell</a><a href="#laboratorium">Robot og matriser</a><a href="#regneeksempel">Regneeksempel</a><a href="#prov-selv">Prøv selv</a><a href="#modell-assessment">Assessment-kobling</a></nav>}
          en={<nav aria-label={ui("en", "inThisLesson")}><a href="#planar-modell">Model</a><a href="#laboratorium">Robot and matrices</a><a href="#regneeksempel">Worked example</a><a href="#prov-selv">Try it yourself</a><a href="#modell-assessment">Assessment link</a></nav>}
        />}
      </header>
      {slug === "keyboard-coordinate-mapping-and-safe-key-presses" && <p className="egb-pilot-prose"><Link href="/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration#interactive"><T no="Assessment 2.1: følg hver SPACE-tast fra piksel til robotmål" en="Assessment 2.1: trace each SPACE key from pixel to robot target" /></Link></p>}
      <div className="egb-pilot-prose"><Egb339LangMarkdown no={splitNo >= 0 ? entry.body.slice(0, splitNo) : entry.body} en={en?.body ? (splitEn >= 0 ? en.body.slice(0, splitEn) : en.body) : undefined} /></div>
      {planarMode && <PlanarKinematicsLesson mode={planarMode} />}
      {splitNo >= 0 && <div className="egb-pilot-prose"><Egb339LangMarkdown no={entry.body.slice(splitNo)} en={en?.body && splitEn >= 0 ? en.body.slice(splitEn) : undefined} /></div>}
      {assessments.length > 0 && <section className="egb-pilot-prose" id="assessment"><h2><T no={EGB339_UI.tasksAndAssessment.no} en={EGB339_UI.tasksAndAssessment.en} /></h2>
        <p><Link href={"/egb339/uker/uke-" + week + "#oppgaver"}><T no={EGB339_UI.exercisesForWeek.no + " " + week} en={EGB339_UI.exercisesForWeek.en + " " + week} /></Link></p>
        <ul className="egb-study-link-list">{assessments.map((assessment) => <li key={assessment.href}><Link href={assessment.href + "#losningsforslag"}>{assessment.title}</Link></li>)}</ul>
        <p className="egb-pilot-small"><T no={EGB339_UI.assessmentNote.no} en={EGB339_UI.assessmentNote.en} /></p>
      </section>}
      <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={pageKey} />
        <Egb339EntryNav previous={adjacent.previous ? getEgb339Concept(adjacent.previous) : null} next={adjacent.next ? getEgb339Concept(adjacent.next) : null} />
        {!week && <p><Link href="/egb339/temaer"><T no={EGB339_UI.backToIndex.no} en={EGB339_UI.backToIndex.en} /></Link></p>}
      </div>
    </article>
  </>;
}
