import Link from "next/link";
import { getEgb339Assessments } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";

export default function Egb339AssessmentsPage() {
  const entries = getEgb339Assessments();
  const groups = [
    { title: "Vurderingsoversikter", description: "Samlede krav og vurderingsform.", entries: entries.filter((entry) => !/Assessment\s+\d+\.\d+/i.test(entry.title)) },
    { title: "Assessment 1 · Problem-solving tasks", description: "Generelle Python-funksjoner testet med offentlige og private tester.", entries: entries.filter((entry) => /^Assessment\s+1\./i.test(entry.title)) },
    { title: "Assessment 2 · Applied project", description: "Fra simulert Dobot til fysisk robot. 2.3 og 2.4 legges til når detaljsidene publiseres.", entries: entries.filter((entry) => /^Assessment\s+2\./i.test(entry.title)) },
  ];
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header"><h1>Assessments og innleveringsstøtte</h1><p>Krav, matematikk og teststrategi. Eksempeldata er til kontroll; implementasjonene må være generelle.</p></header>
    <section aria-labelledby="assessment-weights-heading"><h2 id="assessment-weights-heading">Dette teller i sluttkarakteren</h2>
      <dl className="egb-study-weights">
        <div><dt>Assessment 1 · 20 %</dt><dd>Korte programmeringsoppgaver: 10 % robotikk og 10 % computer vision.</dd></div>
        <div><dt>Assessment 2 · 45 %</dt><dd>Anvendt prosjekt i fire deler, fra simulering til fysisk robot og vision-guided pick-and-place.</dd></div>
        <div><dt>Skriftlig eksamen · 35 %</dt><dd>Tester både robotikk- og computer-vision-delen av emnet.</dd></div>
      </dl>
      <p className="egb-study-source-warning"><strong>Viva-regel:</strong> Generativ AI kan brukes kritisk og deklarert i forberedelsen, men ikke under de personlige muntlige delene i Assessment 2.1 og 2.3.</p>
    </section>
    {groups.map((group) => <section key={group.title}><h2>{group.title}</h2><p>{group.description}</p>
      <ul className="egb-study-index">{group.entries.map((entry) => <li key={entry.slug}>
        <div><PilotStatus pageKey={"egb339/vurdering/" + entry.slug} short /><Link href={entry.route}>{entry.title}</Link></div><p>{entry.summary}</p>
        <p className="egb-pilot-small">Pensum: {getEgb339AssessmentSolution(entry.slug)?.weeks.map((week, i) => <span key={week}>{i > 0 && ", "}<Link href={"/egb339/uker/uke-" + week}>uke {week}</Link></span>)}. Vurderingsuke: {entry.week}.</p>
      </li>)}</ul>
    </section>)}
  </article>;
}
