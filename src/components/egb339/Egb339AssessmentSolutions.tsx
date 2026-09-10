import Link from "next/link";
import Egb339Markdown from "./Egb339Markdown";
import PilotSolutionLinks from "./pilot/PilotSolutionLinks";
import type { Egb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";

export default function Egb339AssessmentSolutions({ solution }: { solution: Egb339AssessmentSolution }) {
  return <section id="losningsforslag" aria-labelledby="assessment-solutions-heading">
    <h2 id="assessment-solutions-heading">Løsningsgjennomgang</h2>
    <p>{solution.scope}</p><p className="egb-pilot-source">Kildegrunnlag: {solution.source}</p>
    <p className="egb-pilot-small">Pensumuker: {solution.weeks.map((week, i) => <span key={week}>{i > 0 && ", "}<Link href={"/egb339/uker/uke-" + week}>uke {week}</Link></span>)}</p>
    <PilotSolutionLinks parts={solution.parts.map(({ id, title }) => ({ id, title }))} />
    {solution.parts.map((part) => <details key={part.id} id={"solution-" + part.id} className="egb-pilot-solution">
      <summary>{part.title}</summary>
      {part.missingSourceDetail && <p className="egb-study-source-warning">Kildedetalj mangler — eksakt svar kan ikke verifiseres ennå.</p>}
      <Egb339Markdown content={part.content} />
    </details>)}
  </section>;
}
