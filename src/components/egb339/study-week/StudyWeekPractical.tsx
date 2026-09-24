"use client";

import Link from "next/link";
import Egb339LangMarkdown from "../Egb339LangMarkdown";
import MathText from "../pilot/Egb339Math";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import type { Egb339WeekLearning } from "@/lib/egb339-week-learning";

interface Props {
  number: number;
  learning: Egb339WeekLearning;
  resourceNo?: string;
  resourceEn?: string | null;
}

/** The "Practical og fagkilder / Practical and sources" week section. */
export default function StudyWeekPractical({ number, learning, resourceNo, resourceEn }: Props) {
  const { lang } = useEgb339Lang();
  return <section id="practical" data-egb-week-section className="egb-pilot-prose">
    <span id="ukeinnhold" className="egb-week-anchor" />
    <h2>{ui(lang, "sectionPractical")}</h2>
    <Egb339LangMarkdown no={learning.practical} en={learning.practicalEn} />
    {number === 4 && resourceNo && <>
      <Egb339LangMarkdown no={resourceNo} en={resourceEn} headingOffset={1} studyLinks />
      <p className="egb-week-notice" data-state="warning">{lang === "en"
        ? "The practical model uses L₀ = 138, L₁ = 135, L₂ = 147, L₃ = 60 and L₄ = 80 mm. Assessment 1.3 has different tool parameters. Do not mix the models."
        : "Practical-modellen bruker L₀ = 138, L₁ = 135, L₂ = 147, L₃ = 60 og L₄ = 80 mm. Assessment 1.3 har andre verktøyparametere. Ikke bland modellene."}</p>
      <p><Link href="/egb339/ressurser/coppeliasim-setup">{lang === "en" ? "CoppeliaSim: installation and connection" : "CoppeliaSim: installasjon og tilkobling"}</Link></p>
    </>}
    {number === 6 && <p className="egb-week-notice" data-state="warning">{lang === "en"
      ? <>Source deviation: the lecture file Lecture Week 6-1.py has <MathText inline>{String.raw`\cos(\theta_1)`}</MathText> in both the x and y rows. The board shows <MathText inline>{String.raw`\sin(\theta_1)`}</MathText> in the y row. Use the geometrically correct FK model before SymPy differentiates; automatic differentiation does not repair an incorrect input model.</>
      : <>Kildeavvik: forelesningsfilen Lecture Week 6-1.py har <MathText inline>{String.raw`\cos(\theta_1)`}</MathText> i både x- og y-raden. Tavlen viser <MathText inline>{String.raw`\sin(\theta_1)`}</MathText> i y-raden. Bruk den geometrisk riktige FK-modellen før SymPy deriverer; automatisk derivasjon retter ikke en feil inputmodell.</>}</p>}
    <ul className="egb-week-sources">
      {(lang === "en" ? learning.sourcesEn : learning.sources).map((source) => <li key={source}><Egb339LangMarkdown no={source} /></li>)}
    </ul>
    <p><Link href="/egb339/ressurser">{lang === "en" ? "Practical resources and tools" : "Praktiske ressurser og verktøy"}</Link></p>
  </section>;
}
