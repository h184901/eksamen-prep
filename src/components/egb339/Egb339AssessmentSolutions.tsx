"use client";

import Link from "next/link";
import Egb339LangMarkdown from "./Egb339LangMarkdown";
import PilotSolutionLinks from "./pilot/PilotSolutionLinks";
import type { Egb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import type { Egb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { T } from "./T";

export default function Egb339AssessmentSolutions({ solution, solutionEn }: { solution: Egb339AssessmentSolution; solutionEn?: Egb339AssessmentSolutionEn | null }) {
  const { lang } = useEgb339Lang();
  const scope = lang === "en" ? solutionEn?.scope ?? solution.scope : solution.scope;
  const source = lang === "en" ? solutionEn?.source ?? solution.source : solution.source;
  return <section id="losningsforslag" aria-labelledby="assessment-solutions-heading">
    <h2 id="assessment-solutions-heading">{ui(lang, "walkthroughParts")}</h2>
    <p>{scope}</p><p className="egb-pilot-source"><T no="Kildegrunnlag:" en="Source material:" /> {source}</p>
    <p className="egb-pilot-small"><T no="Pensumuker:" en="Curriculum weeks:" /> {solution.weeks.map((week, i) => <span key={week}>{i > 0 && ", "}<Link href={"/egb339/uker/uke-" + week}>{ui(lang, "weekOf")} {week}</Link></span>)}</p>
    <PilotSolutionLinks parts={solution.parts.map((part) => ({ id: part.id, title: lang === "en" ? solutionEn?.parts[part.id]?.title ?? part.title : part.title }))} />
    {solution.parts.map((part) => <details key={part.id} id={"solution-" + part.id} className="egb-pilot-solution">
      <summary>{lang === "en" ? solutionEn?.parts[part.id]?.title ?? part.title : part.title}</summary>
      {part.missingSourceDetail && <p className="egb-study-source-warning"><T no="Kildedetalj mangler — eksakt svar kan ikke verifiseres ennå." en="Source detail missing — the exact answer cannot be verified yet." /></p>}
      <Egb339LangMarkdown no={part.content} en={solutionEn?.parts[part.id]?.content} />
    </details>)}
  </section>;
}