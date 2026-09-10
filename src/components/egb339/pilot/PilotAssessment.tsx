import Link from "next/link";
import type { Egb339Entry } from "@/lib/egb339-vault/types";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { EGB339_PILOT } from "@/lib/egb339-course";
import Egb339Markdown from "../Egb339Markdown";
import { PilotBreadcrumb, PilotEntryNav } from "./Egb339PilotShell";
import Egb339PilotProgress from "./Egb339PilotProgress";
import PilotSolutionLinks from "./PilotSolutionLinks";

export default function PilotAssessment({ entry }: { entry: Egb339Entry }) {
  const solution = getEgb339AssessmentSolution(entry.slug);
  if (!solution) throw new Error("Assessment 1.1 walkthrough missing");
  return <>
    <PilotBreadcrumb title="Assessment 1.1" week={2} />
    <article className="egb-pilot-article egb-pilot-prose">
      <header className="egb-pilot-lesson-header">
        <h1>Assessment 1.1: posisjon og orientering i 2D</h1>
        <p>Fra roterte akser til generelle funksjoner for SO(2) og SE(2).</p>
        <p className="egb-pilot-small">Pensum: uke 2. Vurderingsuke: {entry.week}.</p>
        <nav aria-label="I denne vurderingen"><a href="#oppgavekrav">Krav</a><a href="#losningsforslag">Gjennomgang</a><Link href={EGB339_PILOT.lesson}>SE(2)-leksjonen</Link></nav>
      </header>
      <p>Q4 bygger transformasjonen fra <Link href={`${EGB339_PILOT.lesson}#homogene-koordinater`}>leksjonens matriseform</Link>. Q5 bruker <Link href={`${EGB339_PILOT.lesson}#invers`}>inversen</Link>.</p>
      <section id="oppgavekrav">
        <Egb339Markdown content={entry.body} />
      </section>
      <section id="losningsforslag">
        <h2>Løsningsgjennomgang</h2>
        <p>{solution.scope}</p>
        <p className="egb-pilot-source">Kildegrunnlag: {solution.source}</p>
        <PilotSolutionLinks parts={solution.parts.map(({ id, title }) => ({ id, title }))} />
        {solution.parts.map((part) => <details id={`solution-${part.id}`} key={part.id} className="egb-pilot-solution">
          <summary>{part.title}</summary>
          <Egb339Markdown content={part.content} />
        </details>)}
      </section>
      <Egb339PilotProgress pageKey={`egb339/vurdering/${entry.slug}`} />
      <PilotEntryNav previous={{ href: EGB339_PILOT.lesson, title: "SE(2): rotasjon og translasjon", pageKey: "" }} next={{ href: "/egb339/vurderinger/assessment-1-2-position-and-orientation-in-3d", title: "Assessment 1.2: posisjon og orientering i 3D", pageKey: "" }} />
    </article>
  </>;
}
