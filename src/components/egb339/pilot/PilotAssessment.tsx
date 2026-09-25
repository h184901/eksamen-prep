import Link from "next/link";
import type { Egb339Entry } from "@/lib/egb339-vault/types";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { getEgb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import { getEgb339En } from "@/lib/egb339-vault/loader";
import { EGB339_PILOT } from "@/lib/egb339-course";
import Egb339LangMarkdown from "../Egb339LangMarkdown";
import Egb339AssessmentSolutions from "../Egb339AssessmentSolutions";
import { PilotBreadcrumb, PilotEntryNav } from "./Egb339PilotShell";
import Egb339PilotProgress from "./Egb339PilotProgress";
import { T } from "../T";
import LangBlock from "../LangBlock";
import { EGB339_UI } from "@/lib/egb339-language/ui";

export default function PilotAssessment({ entry }: { entry: Egb339Entry }) {
  const solution = getEgb339AssessmentSolution(entry.slug);
  if (!solution) throw new Error("Assessment 1.1 walkthrough missing");
  const en = getEgb339En(entry.slug);
  return <>
    <PilotBreadcrumb title="Assessment 1.1" week={2} />
    <article className="egb-pilot-article egb-pilot-prose">
      <header className="egb-pilot-lesson-header">
        <h1><T no="Assessment 1.1: posisjon og orientering i 2D" en="Assessment 1.1: position and orientation in 2D" /></h1>
        <p><T no="Fra roterte akser til generelle funksjoner for SO(2) og SE(2)." en="From rotated axes to general functions for SO(2) and SE(2)." /></p>
        <p className="egb-pilot-small"><T no={EGB339_UI.curriculumLabel.no} en={EGB339_UI.curriculumLabel.en} />: <T no={EGB339_UI.weekOf.no} en={EGB339_UI.weekOf.en} /> 2. <T no={EGB339_UI.assessmentWeekLabel.no} en={EGB339_UI.assessmentWeekLabel.en} />: {entry.week}.</p>
        <nav aria-label="I denne vurderingen"><a href="#oppgavekrav"><T no="Krav" en="Requirements" /></a><a href="#losningsforslag"><T no="Gjennomgang" en="Walkthrough" /></a><Link href={EGB339_PILOT.lesson}><T no="SE(2)-leksjonen" en="The SE(2) lesson" /></Link></nav>
      </header>
      <LangBlock
        no={<>Q4 bygger transformasjonen fra <Link href={`${EGB339_PILOT.lesson}#homogene-koordinater`}>leksjonens matriseform</Link>. Q5 bruker <Link href={`${EGB339_PILOT.lesson}#invers`}>inversen</Link>.</>}
        en={<>Q4 builds the transformation from <Link href={`${EGB339_PILOT.lesson}#homogene-koordinater`}>the lesson's matrix form</Link>. Q5 uses <Link href={`${EGB339_PILOT.lesson}#invers`}>the inverse</Link>.</>}
      />
      <section id="oppgavekrav">
        <Egb339LangMarkdown no={entry.body} en={en?.body} />
      </section>
      <Egb339AssessmentSolutions solution={solution} solutionEn={getEgb339AssessmentSolutionEn(entry.slug)} />
      <Egb339PilotProgress pageKey={`egb339/vurdering/${entry.slug}`} />
      <PilotEntryNav previous={{ href: EGB339_PILOT.lesson, title: "SE(2): rotasjon og translasjon", titleEn: "SE(2): rotation and translation", pageKey: "" }} next={{ href: "/egb339/vurderinger/assessment-1-2-position-and-orientation-in-3d", title: "Assessment 1.2: posisjon og orientering i 3D", titleEn: "Assessment 1.2: position and orientation in 3D", pageKey: "" }} />
    </article>
  </>;
}
