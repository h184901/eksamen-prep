import Link from "next/link";
import Egb339Markdown from "./Egb339Markdown";
import Egb339ProblemVisual from "./Egb339ProblemVisual";
import type { Egb339Problem } from "@/lib/egb339-problems";

const verificationLabel: Record<Egb339Problem["verification"], string> = {
  official: "Kontrollert mot QUT-fasit", corrected: "QUT-fasit med forklart rettelse",
  derived: "Egen utregning", open: "Åpen praktisk oppgave",
};
export default function Egb339WeekProblems({ week, problems }: { week: number; problems: Egb339Problem[] }) {
  return <section id="oppgaver" className="egb-study-problems" aria-labelledby="week-problems-heading">
    <h2 id="week-problems-heading">Oppgaver og løsningsforslag</h2>
    <p>Forsøk oppgaven før du åpner løsningen. Temalenkene tar deg til teorien du trenger.</p>
    {problems.length === 0 && <p>Uke {week} har ikke et eget tutorialsett i kursmaterialet. De ukentlige regneoppgavene starter i uke 2.</p>}
    {problems.map((problem, index) => <article key={problem.id} id={problem.id} className="egb-study-problem">
      <h3>{index + 1}. {problem.title}</h3>
      <p className="egb-pilot-source">Kilde: {problem.source} · PDF-side {problem.sourcePage}{problem.sourcePageEnd ? "–" + problem.sourcePageEnd : ""}</p>
      <nav className="egb-study-inline-links" aria-label="Relevante temaer">{problem.topics.map((entry) => <Link key={entry.href} href={entry.href}>{entry.label}</Link>)}</nav>
      {problem.visual && <Egb339ProblemVisual kind={problem.visual} />}
      <Egb339Markdown content={problem.prompt} />
      <details className="egb-pilot-solution">
        <summary>Vis løsning og fasit</summary>
        <p className={problem.verification === "corrected" ? "egb-study-source-warning" : "egb-pilot-source"}>{verificationLabel[problem.verification]}</p>
        <Egb339Markdown content={problem.solution} headingOffset={1} />
        <section className="egb-study-answer"><h4>Fasit</h4><Egb339Markdown content={problem.answer} /></section>
      </details>
    </article>)}
  </section>;
}
