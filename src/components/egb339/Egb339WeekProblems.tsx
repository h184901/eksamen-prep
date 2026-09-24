"use client";

import Link from "next/link";
import Egb339LangMarkdown from "./Egb339LangMarkdown";
import Egb339ProblemVisual from "./Egb339ProblemVisual";
import type { Egb339Problem } from "@/lib/egb339-problems";
import type { Egb339ProblemEn } from "@/lib/egb339-problems-en";
import WeekOneDisclosure from "./week-one/WeekOneDisclosure";
import { egb339StudyHref } from "@/lib/egb339-study-weeks";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";

function ProblemSolution({ id, title, longForm, children }: { id: string; title: string; longForm: boolean; children: React.ReactNode }) {
  const { lang } = useEgb339Lang();
  if (longForm) return <WeekOneDisclosure id={`solution-${id}`} title={title}>{children}</WeekOneDisclosure>;
  return <details className="egb-pilot-solution"><summary>{ui(lang, "showSolutionAndAnswer")}</summary>{children}</details>;
}

export default function Egb339WeekProblems({ week, problems, problemsEn = {}, longForm = false }: { week: number; problems: Egb339Problem[]; problemsEn?: Record<string, Egb339ProblemEn>; longForm?: boolean }) {
  const { lang } = useEgb339Lang();
  const verificationLabel: Record<Egb339Problem["verification"], string> = {
    official: ui(lang, "verificationOfficial"), corrected: ui(lang, "verificationCorrected"),
    derived: ui(lang, "verificationDerived"), open: ui(lang, "verificationOpen"),
  };
  return <section id="oppgaver" data-egb-week-section={longForm ? true : undefined} className="egb-study-problems" aria-labelledby="week-problems-heading">
    <h2 id="week-problems-heading">{ui(lang, "sectionProblems")}</h2>
    <p>{ui(lang, "tryBeforeSolution")}</p>
    {problems.length === 0 && <p>{ui(lang, "noProblemSet")}</p>}
    {problems.map((problem, index) => {
      const en = problemsEn[problem.id];
      const title = lang === "en" ? en?.title ?? problem.title : problem.title;
      return <article key={problem.id} id={problem.id} className="egb-study-problem">
        <h3>{index + 1}. {title}</h3>
        <p className="egb-pilot-source">{ui(lang, "sourceLabel")}: {problem.source} · {ui(lang, "pdfPage")} {problem.sourcePage}{problem.sourcePageEnd ? "–" + problem.sourcePageEnd : ""}</p>
        <nav className="egb-study-inline-links" aria-label={ui(lang, "relevantTopics")}>{problem.topics.map((entry) => <Link key={entry.href} href={longForm ? egb339StudyHref(entry.href) : entry.href}>{entry.label}</Link>)}</nav>
        {problem.visual && <Egb339ProblemVisual kind={problem.visual} />}
        <Egb339LangMarkdown no={problem.prompt} en={en?.prompt} studyLinks={longForm} />
        <ProblemSolution id={problem.id} title={title} longForm={longForm}>
          <p className={problem.verification === "corrected" ? "egb-study-source-warning" : "egb-pilot-source"}>{verificationLabel[problem.verification]}</p>
          <Egb339LangMarkdown no={problem.solution} en={en?.solution} headingOffset={longForm ? 2 : 1} studyLinks={longForm} />
          <section className="egb-study-answer"><h4>{ui(lang, "answerKey")}</h4><Egb339LangMarkdown no={problem.answer} en={en?.answer} /></section>
        </ProblemSolution>
      </article>;
    })}
  </section>;
}
