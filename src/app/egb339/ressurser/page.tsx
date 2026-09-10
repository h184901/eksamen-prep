import Link from "next/link";
import { getEgb339Resources } from "@/lib/egb339-vault/loader";
import { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";
export default function Egb339ResourcesPage() {
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header"><h1>Simulator, oppsett og arbeidsflyt</h1><p>Praktiske guider. Miljøspesifikke parametere holdes atskilt fra selve kinematikkmodellen.</p></header>
    <ul className="egb-study-index">{getEgb339Resources().map((entry) => <li key={entry.slug}><div><PilotStatus pageKey={"egb339/ressurs/" + entry.slug} short /><Link href={entry.route}>{entry.title}</Link></div><p>{entry.summary}</p><small>Uke {entry.week || "—"}</small></li>)}</ul>
  </article>;
}
