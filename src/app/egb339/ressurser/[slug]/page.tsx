import { notFound } from "next/navigation";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339PilotProgress from "@/components/egb339/pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "@/components/egb339/pilot/Egb339PilotShell";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import { getAdjacentEgb339Entry, getEgb339Resource, getEgb339Resources } from "@/lib/egb339-vault/loader";
export function generateStaticParams() { return getEgb339Resources().map((entry) => ({ slug: entry.slug })); }
export default async function Egb339ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Resource(slug);
  if (!entry) notFound();
  const adjacent = getAdjacentEgb339Entry(getEgb339Resources(), slug);
  return <><PilotBreadcrumb title={entry.title} section={{ href: "/egb339/ressurser", title: "Praktisk" }} />
    <article className="egb-pilot-article egb-pilot-prose">
      <header className="egb-pilot-lesson-header"><h1>{entry.title}</h1><p>{entry.summary}</p><p className="egb-pilot-small">Praktisk guide · uke {entry.week}</p></header>
      <Egb339Markdown content={entry.body} />
      <Egb339PilotProgress pageKey={"egb339/ressurs/" + entry.slug} />
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </article>
  </>;
}
