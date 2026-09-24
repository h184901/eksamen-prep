import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Assessment21Source from "./Assessment21Source";
import Egb339LangMarkdown from "../Egb339LangMarkdown";
import { T } from "../T";
import Egb339AssessmentSolutions from "../Egb339AssessmentSolutions";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import Egb339EntryNav from "../Egb339EntryNav";
import { PilotBreadcrumb } from "../pilot/Egb339PilotShell";
import { StudyWeekJumpNavigation } from "../study-week/StudyWeekNavigation";
import { getAdjacentEgb339Entry, getEgb339Assessment, getEgb339Assessments, getEgb339En } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { getEgb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import "@/app/egb339/assessment-guide.css";

export const ASSESSMENT21_SLUG = "assessment-2-1-simulation-and-oral-demonstration";

export default function Assessment21Guide() {
  const entry = getEgb339Assessment(ASSESSMENT21_SLUG)!;
  const adjacent = getAdjacentEgb339Entry(getEgb339Assessments(), entry.slug);
  const solution = getEgb339AssessmentSolution(entry.slug)!;
  const html = fs.readFileSync(path.join(process.cwd(), "src/content/egb339/assessment-2-1/guide.html"), "utf8");
  const sections = [
    ["execution", "Følg SPACE"], ["derivation", "Utledninger"], ["interactive", "Tall per tast"],
    ["code", "Kodeoppslag"], ["oral", "Norske spørsmål"], ["word-guide", "Word og muntlig"],
    ["syllabus", "Pensum"], ["oppgavekrav", "Oppgavekrav"], ["losningsforslag", "Gjennomgang"],
  ].map(([id, title]) => ({ id, title, short: title }));
  const sectionsEn = [
    ["original-guide", "Original guide"], ["oppgavekrav", "Requirements"], ["losningsforslag", "Walkthrough"],
  ].map(([id, title]) => ({ id, title, short: title }));
  return <>
    <PilotBreadcrumb title="Assessment 2.1" section={{ href: "/egb339/vurderinger", title: "Assessments" }} />
    <article className="egb-pilot-article egb-assessment-guide">
      <header className="egb-pilot-lesson-header">
        <h1><T no="Assessment 2.1: fra bildepunkt til tastetrykk" en="Assessment 2.1: from image point to key press" /></h1>
        <p><T no="Følg SPACE gjennom den innleverte Python-koden, og øv til den muntlige demonstrasjonen." en="Follow SPACE through the submitted Python code and prepare for the oral demonstration." /></p>
        <p className="egb-pilot-small"><T no="2137 registrerte hendelser · 15" en="2137 recorded events · 15" /> <code>move_arm</code><T no="-kommandoer · 17,5 sekunder faste pauser. Opptak med testrobot, ikke sensordata fra CoppeliaSim." en=" commands · 17.5 seconds of fixed waits. Recorded with a test robot, not CoppeliaSim sensor data." /></p>
        <p><a className="egb-guide-download" href="/egb339/assessment-2-1/oral-presentation-guide.docx" download><T no="Last ned Word-guiden (.docx)" en="Download the original Norwegian Word guide (.docx)" /></a></p>
      </header>
      <StudyWeekJumpNavigation sectionsNo={sections} sectionsEn={sectionsEn} label="I Assessment 2.1-guiden" labelEn="In the Assessment 2.1 guide" />
      <Assessment21Source html={html} />
      <section id="oppgavekrav" data-egb-week-section className="egb-pilot-prose">
        <h2><T no="Oppgavekrav og innlevering" en="Requirements and submission" /></h2>
        <p><T no="Den personlige SPACE-guiden over er et studieeksempel, ikke en ny oppgavetekst. Her beholdes kurskravene og den opprinnelige gjennomgangen." en="The original SPACE guide is a study example, not a new task specification. The course requirements and existing walkthrough are retained here." /></p>
        <p className="egb-pilot-small"><T no="Vurderingsuke:" en="Assessment week:" /> {entry.week}. <Link href="/egb339/vurderinger"><T no="Alle assessments" en="All assessments" /></Link>.</p>
        <Egb339LangMarkdown no={entry.body} en={getEgb339En(entry.slug)?.body} headingOffset={1} />
      </section>
      <div className="egb-pilot-prose"><Egb339AssessmentSolutions solution={solution} solutionEn={getEgb339AssessmentSolutionEn(ASSESSMENT21_SLUG)} />
        <Egb339PilotProgress pageKey={`egb339/vurdering/${entry.slug}`} />
        <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
      </div>
    </article>
  </>;
}
