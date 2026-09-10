import Link from "next/link";
import { notFound } from "next/navigation";
import SE2Lesson from "@/components/egb339/pilot/SE2Lesson";
import PlanarKinematicsLesson from "@/components/egb339/pilot/PlanarKinematicsLesson";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339PilotProgress, { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import { getEgb339Concept, getEgb339Concepts } from "@/lib/egb339-vault/loader";
import { EGB339_COURSE_ORDER, egb339LessonNeighbours } from "@/lib/egb339-course";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { egb339DisplaySummary, egb339DisplayTitle } from "@/lib/egb339";

export function generateStaticParams() { return getEgb339Concepts().map((entry) => ({ slug: entry.slug })); }
export default async function Egb339TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Concept(slug);
  if (!entry) notFound();
  if (slug === "se-2-homogeneous-transformations") return <SE2Lesson />;
  const week = EGB339_COURSE_ORDER.find((row) => (row.topics as readonly string[]).includes(slug))?.week;
  const adjacent = egb339LessonNeighbours(slug);
  const assessments = getEgb339Course().find((row) => row.week === week)?.assessments ?? [];
  const pageKey = "egb339/tema/" + slug;
  const planarMode = slug === "forward-kinematics" ? "fk" : slug === "inverse-kinematics" ? "ik" : null;
  // Imported summaries repeat the opening definition verbatim. Keep the full,
  // linked definition in the article, not a second plain-text copy in the header.
  const repeatsDefinition = /^\s*\[!definition\]/i.test(entry.summary) && /^>\s*\[!definition\]/i.test(entry.body);
  // Insert the worked lab after the definition and first theory section, retaining every source paragraph.
  const split = planarMode ? entry.body.indexOf("\n## ", entry.body.indexOf("\n## ") + 1) : -1;
  return <>
    <PilotBreadcrumb title={egb339DisplayTitle(entry)} week={week} section={week ? undefined : { href: "/egb339/temaer", title: "Referanser" }} />
    <article className="egb-pilot-article">
      <header className="egb-pilot-lesson-header">
        <h1>{egb339DisplayTitle(entry)}</h1>{!repeatsDefinition && <p>{egb339DisplaySummary(entry)}</p>}
        <PilotStatus pageKey={pageKey} />
        {planarMode && <nav aria-label="I denne leksjonen"><a href="#planar-modell">Modell</a><a href="#laboratorium">Robot og matriser</a><a href="#regneeksempel">Regneeksempel</a><a href="#prov-selv">Prøv selv</a><a href="#modell-assessment">Assessment-kobling</a></nav>}
      </header>
      <div className="egb-pilot-prose"><Egb339Markdown content={split >= 0 ? entry.body.slice(0, split) : entry.body} /></div>
      {planarMode && <PlanarKinematicsLesson mode={planarMode} />}
      {split >= 0 && <div className="egb-pilot-prose"><Egb339Markdown content={entry.body.slice(split)} /></div>}
      {assessments.length > 0 && <section className="egb-pilot-prose" id="assessment"><h2>Oppgaver og assessment</h2>
        <p><Link href={"/egb339/uker/uke-" + week + "#oppgaver"}>Regneoppgaver og løsningsforslag for uke {week}</Link></p>
        <ul className="egb-study-link-list">{assessments.map((assessment) => <li key={assessment.href}><Link href={assessment.href + "#losningsforslag"}>{assessment.title}</Link></li>)}</ul>
        <p className="egb-pilot-small">Assessmentene bruker ukens stoff sammen med andre emner; vurderingsuke og pensumuke er ikke nødvendigvis like.</p>
      </section>}
      <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={pageKey} />
        <Egb339EntryNav previous={adjacent.previous ? getEgb339Concept(adjacent.previous) : null} next={adjacent.next ? getEgb339Concept(adjacent.next) : null} />
        {!week && <p><Link href="/egb339/temaer">Tilbake til fagregisteret</Link></p>}
      </div>
    </article>
  </>;
}
