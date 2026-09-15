import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import AssessmentGuideClient from "./AssessmentGuideClient";
import Egb339Markdown from "../Egb339Markdown";
import Egb339AssessmentSolutions from "../Egb339AssessmentSolutions";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import Egb339EntryNav from "../Egb339EntryNav";
import { PilotBreadcrumb } from "../pilot/Egb339PilotShell";
import { StudyWeekJumpNavigation } from "../study-week/StudyWeekNavigation";
import { getAdjacentEgb339Entry, getEgb339Assessment, getEgb339Assessments } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
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
  return <>
    <PilotBreadcrumb title="Assessment 2.1" section={{ href: "/egb339/vurderinger", title: "Assessments" }} />
    <article className="egb-pilot-article egb-assessment-guide">
      <header className="egb-pilot-lesson-header">
        <h1>Assessment 2.1: fra bildepunkt til tastetrykk</h1>
        <p>Følg SPACE gjennom den innleverte Python-koden, og øv til den muntlige demonstrasjonen.</p>
        <p className="egb-pilot-small">2137 registrerte hendelser · 15 <code>move_arm</code>-kommandoer · 17,5 sekunder faste pauser. Opptak med testrobot, ikke sensordata fra CoppeliaSim.</p>
        <p><a className="egb-guide-download" href="/egb339/assessment-2-1/oral-presentation-guide.docx" download>Last ned Word-guiden (.docx)</a></p>
      </header>
      <StudyWeekJumpNavigation sections={sections} label="I Assessment 2.1-guiden" />
      <AssessmentGuideClient html={html} />
      <section id="oppgavekrav" data-egb-week-section className="egb-pilot-prose">
        <h2>Oppgavekrav og innlevering</h2>
        <p>Den personlige SPACE-guiden over er et studieeksempel, ikke en ny oppgavetekst. Her beholdes kurskravene og den opprinnelige gjennomgangen.</p>
        <p className="egb-pilot-small">Vurderingsuke: {entry.week}. <Link href="/egb339/vurderinger">Alle assessments</Link>.</p>
        <Egb339Markdown content={entry.body} headingOffset={1} />
      </section>
      <div className="egb-pilot-prose"><Egb339AssessmentSolutions solution={solution} />
        <Egb339PilotProgress pageKey={`egb339/vurdering/${entry.slug}`} />
        <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
      </div>
    </article>
  </>;
}
