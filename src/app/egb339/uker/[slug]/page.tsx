import Link from "next/link";
import { notFound } from "next/navigation";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339PilotProgress from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import Egb339WeekProblems from "@/components/egb339/Egb339WeekProblems";
import SE2Explorer from "@/components/egb339/pilot/SE2Explorer";
import PlanarArmExplorer from "@/components/egb339/PlanarArmExplorer";
import { getEgb339ProblemsForWeek } from "@/lib/egb339-problems";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { getAdjacentEgb339Entry, getEgb339Week, getEgb339Weeks } from "@/lib/egb339-vault/loader";
import { egb339DisplaySummary, egb339DisplayTitle } from "@/lib/egb339";
import WeekOnePage from "@/components/egb339/week-one/WeekOnePage";

export function generateStaticParams() { return getEgb339Weeks().map((week) => ({ slug: week.slug })); }
export default async function Egb339WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const week = getEgb339Week(slug);
  if (!week) notFound();
  if (slug === "uke-1") return <WeekOnePage />;
  const number = Number(week.week);
  const adjacent = getAdjacentEgb339Entry(getEgb339Weeks(), slug);
  const courseWeek = getEgb339Course().find((row) => row.week === number);
  const problems = getEgb339ProblemsForWeek(number);
  return <>
    <PilotBreadcrumb title={"Uke " + number} />
    <article className="egb-pilot-article">
      <header className="egb-pilot-lesson-header"><h1>Uke {number}: {egb339DisplayTitle(week)}</h1><p>{egb339DisplaySummary(week)}</p>
        <nav aria-label="På denne ukesiden"><a href="#leksjoner">Leksjoner</a><a href="#ukeinnhold">Ukeinnhold og kilder</a><a href="#oppgaver">Oppgaver og løsninger ({problems.length})</a>{[2, 3, 4, 5].includes(number) && <a href="#laboratorium">Laboratorium</a>}<a href="#vurderinger">Assessments</a></nav>
      </header>
      <section className="egb-pilot-prose" id="leksjoner"><h2>Les i denne rekkefølgen</h2>
        <ol className="egb-study-numbered">{courseWeek?.topics.map((topic) => <li key={topic.href}><Link href={topic.href}>{topic.title}</Link></li>)}</ol>
      </section>
      <section id="ukeinnhold" className="egb-pilot-prose"><Egb339Markdown content={week.body} /></section>
      <div className="egb-pilot-prose"><Egb339WeekProblems week={number} problems={problems} /></div>
      {[2, 3].includes(number) && <section id="laboratorium"><h2>Koordinatrammer i planet</h2><p>2D-grunnlaget for homogene transformasjoner. Se <Link href="/egb339/temaer/se-2-homogeneous-transformations#regneeksempel">hele SE(2)-regneeksemplet</Link>. Uke 3 utvider teorien til tre dimensjoner.</p><SE2Explorer /></section>}
      {[4, 5].includes(number) && <section id="laboratorium"><PlanarArmExplorer initialMode={number === 5 ? "ik" : "fk"} /><p><Link href={number === 5 ? "/egb339/temaer/inverse-kinematics#regneeksempel" : "/egb339/temaer/forward-kinematics#regneeksempel"}>Åpne hele regneeksemplet med mellomregninger</Link></p></section>}
      <section id="vurderinger" className="egb-pilot-prose"><h2>Assessments som bruker ukens stoff</h2>
        <ul className="egb-study-link-list">{courseWeek?.assessments.map((entry) => <li key={entry.href}><Link href={entry.href + "#losningsforslag"}>{entry.title}</Link></li>)}</ul>
        <p className="egb-pilot-small">Dette er pensumkoblinger. Se assessment-siden for innleveringsuke og krav.</p>
      </section>
      <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={"egb339/uke/" + slug} /><Egb339EntryNav previous={adjacent.previous} next={adjacent.next} /></div>
    </article>
  </>;
}
