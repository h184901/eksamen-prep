import Link from "next/link";
import Assessment21Guide, { ASSESSMENT21_SLUG } from "@/components/egb339/assessment-guide/Assessment21Guide";
import PilotAssessment from "@/components/egb339/pilot/PilotAssessment";
import { notFound } from "next/navigation";
import Egb339LangMarkdown from "@/components/egb339/Egb339LangMarkdown";
import Egb339PilotProgress from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import Egb339AssessmentSolutions from "@/components/egb339/Egb339AssessmentSolutions";
import { T } from "@/components/egb339/T";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { getEgb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import { getAdjacentEgb339Entry, getEgb339Assessment, getEgb339Assessments, getEgb339En } from "@/lib/egb339-vault/loader";
import { egb339Title } from "@/lib/egb339-titles";
import { EGB339_UI } from "@/lib/egb339-language/ui";

export function generateStaticParams() { return getEgb339Assessments().map((entry) => ({ slug: entry.slug })); }
export default async function Egb339AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Assessment(slug);
  if (!entry) notFound();
  if (slug === ASSESSMENT21_SLUG) return <Assessment21Guide />;
  if (slug === "assessment-1-1-position-and-orientation-in-2d") return <PilotAssessment entry={entry} />;
  const adjacent = getAdjacentEgb339Entry(getEgb339Assessments(), slug);
  const solution = getEgb339AssessmentSolution(slug);
  const solutionEn = getEgb339AssessmentSolutionEn(slug);
  const en = getEgb339En(slug);
  const titleNo = egb339Title(slug, "no") ?? entry.title;
  const titleEn = egb339Title(slug, "en") ?? entry.title;
  return <>
    <PilotBreadcrumb title={entry.title} section={{ href: "/egb339/vurderinger", title: "Assessments" }} />
    <article className="egb-pilot-article egb-pilot-prose">
      <header className="egb-pilot-lesson-header"><h1><T no={titleNo} en={titleEn} /></h1><p><T no={entry.summary} en={en?.summary} /></p>
        <p className="egb-pilot-small"><T no={EGB339_UI.assessmentWeekLabel.no} en={EGB339_UI.assessmentWeekLabel.en} />: {entry.week}. <T no={EGB339_UI.curriculumLabel.no} en={EGB339_UI.curriculumLabel.en} />: {solution?.weeks.map((week, index) => <span key={week}>{index > 0 && ", "}<Link href={"/egb339/uker/uke-" + week}><T no={EGB339_UI.weekOf.no} en={EGB339_UI.weekOf.en} /> {week}</Link></span>)}.</p>
        <nav aria-label="På denne vurderingssiden"><a href="#oppgavekrav"><T no={EGB339_UI.requirementsOverview.no} en={EGB339_UI.requirementsOverview.en} /></a>{solution && <a href="#losningsforslag"><T no={EGB339_UI.walkthroughParts.no} en={EGB339_UI.walkthroughParts.en} /> ({solution.parts.length} <T no={EGB339_UI.walkthroughPartsSuffix.no} en={EGB339_UI.walkthroughPartsSuffix.en} />)</a>}</nav>
      </header>
      <p className="egb-pilot-small"><T no={EGB339_UI.keepSignatures.no} en={EGB339_UI.keepSignatures.en} /></p>
      <section id="oppgavekrav"><Egb339LangMarkdown no={entry.body} en={en?.body} /></section>
      {solution && <Egb339AssessmentSolutions solution={solution} solutionEn={solutionEn} />}
      <Egb339PilotProgress pageKey={"egb339/vurdering/" + slug} />
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </article>
  </>;
}