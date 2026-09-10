import Link from "next/link";
import { getEgb339ConceptsByTrack } from "@/lib/egb339-vault/loader";
import { EGB339_TRACKS, egb339DisplaySummary, egb339DisplayTitle } from "@/lib/egb339";
import { EGB339_ARCHIVED_TOPICS, EGB339_COURSE_ORDER } from "@/lib/egb339-course";
import { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";

export default function Egb339TopicsPage() {
  const order: readonly string[] = EGB339_COURSE_ORDER.flatMap((week) => [...week.topics]);
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header">
      <h1>Temaer og faglige sammenhenger</h1>
      <p>Et oppslagsregister på tvers av ukene. Bruk <Link href="/egb339">kursplanen</Link> for kronologisk lesing.</p>
      <nav aria-label="Fagspor i kunnskapskartet">{EGB339_TRACKS.map((track) => <a key={track.id} href={"#" + track.id}>{track.label}</a>)}</nav>
    </header>
    {EGB339_TRACKS.map((track) => <section key={track.id} id={track.id} data-track={track.id}>
      <h2>{track.label}</h2><p>{track.description}</p>
      <ul className="egb-study-index">{getEgb339ConceptsByTrack(track.id).sort((a, b) => (order.indexOf(a.slug) < 0 ? 999 : order.indexOf(a.slug)) - (order.indexOf(b.slug) < 0 ? 999 : order.indexOf(b.slug))).map((entry) => <li key={entry.slug}>
        <div><PilotStatus pageKey={"egb339/tema/" + entry.slug} short /><Link href={entry.route}>{egb339DisplayTitle(entry)}</Link></div>
        <p>{egb339DisplaySummary(entry)}</p>
        <small>{(EGB339_ARCHIVED_TOPICS as readonly string[]).includes(entry.slug) ? "Tidligere fagkart – beholdt som referanse" : order.includes(entry.slug) ? "Uke " + EGB339_COURSE_ORDER.find((week) => (week.topics as readonly string[]).includes(entry.slug))?.week : "Referanse"}</small>
      </li>)}</ul>
    </section>)}
  </article>;
}
