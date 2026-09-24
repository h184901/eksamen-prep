import { notFound } from "next/navigation";
import Link from "next/link";
import Egb339LangMarkdown from "@/components/egb339/Egb339LangMarkdown";
import Egb339PilotProgress from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import { T } from "@/components/egb339/T";
import { getAdjacentEgb339Entry, getEgb339En, getEgb339Resource, getEgb339Resources } from "@/lib/egb339-vault/loader";
import { egb339Title } from "@/lib/egb339-titles";
export function generateStaticParams() { return getEgb339Resources().map((entry) => ({ slug: entry.slug })); }
export default async function Egb339ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Resource(slug);
  if (!entry) notFound();
  const adjacent = getAdjacentEgb339Entry(getEgb339Resources(), slug);
  const en = getEgb339En(slug);
  const titleNo = egb339Title(slug, "no") ?? entry.title;
  const titleEn = egb339Title(slug, "en") ?? entry.title;
  return <><PilotBreadcrumb title={entry.title} section={{ href: "/egb339/ressurser", title: "Praktisk" }} />
    <article className="egb-pilot-article egb-pilot-prose">
      <header className="egb-pilot-lesson-header"><h1><T no={titleNo} en={titleEn} /></h1><p><T no={entry.summary} en={en?.summary} /></p><p className="egb-pilot-small"><T no={"Praktisk guide · uke " + entry.week} en={"Practical guide · week " + entry.week} /></p></header>
      <Egb339LangMarkdown no={entry.body} en={en?.body} />
      {slug === "robot-word-typing-practical" && <p><Link href="/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration">Åpne Assessment 2.1-guiden: SPACE, robotvisning, linje for linje og muntlig øving</Link></p>}
      <Egb339PilotProgress pageKey={"egb339/ressurs/" + entry.slug} />
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </article>
  </>;
}