import Link from "next/link";
import PilotAssessment from "@/components/egb339/pilot/PilotAssessment";
import { notFound } from "next/navigation";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339PilotProgress from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import Egb339AssessmentSolutions from "@/components/egb339/Egb339AssessmentSolutions";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { getAdjacentEgb339Entry, getEgb339Assessment, getEgb339Assessments } from "@/lib/egb339-vault/loader";

export function generateStaticParams() { return getEgb339Assessments().map((entry) => ({ slug: entry.slug })); }
export default async function Egb339AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Assessment(slug);
  if (!entry) notFound();
  if (slug === "assessment-1-1-position-and-orientation-in-2d") return <PilotAssessment entry={entry} />;
  const adjacent = getAdjacentEgb339Entry(getEgb339Assessments(), slug);
  const solution = getEgb339AssessmentSolution(slug);
  return <>
    <PilotBreadcrumb title={entry.title} section={{ href: "/egb339/vurderinger", title: "Assessments" }} />
    <article className="egb-pilot-article egb-pilot-prose">
      <header className="egb-pilot-lesson-header"><h1>{entry.title}</h1><p>{entry.summary}</p>
        <p className="egb-pilot-small">Vurderingsuke: {entry.week}. Pensum: {solution?.weeks.map((week, index) => <span key={week}>{index > 0 && ", "}<Link href={"/egb339/uker/uke-" + week}>uke {week}</Link></span>)}.</p>
        <nav aria-label="På denne vurderingssiden"><a href="#oppgavekrav">Krav og oversikt</a>{solution && <a href="#losningsforslag">Løsningsgjennomgang ({solution.parts.length} deler)</a>}</nav>
      </header>
      <p className="egb-pilot-small">Behold funksjonssignaturene, bygg en generell løsning og verifiser med egne input. Studentens leveringskode publiseres ikke her.</p>
      <section id="oppgavekrav"><Egb339Markdown content={entry.body} /></section>
      {solution && <Egb339AssessmentSolutions solution={solution} />}
      <Egb339PilotProgress pageKey={"egb339/vurdering/" + slug} />
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </article>
  </>;
}
