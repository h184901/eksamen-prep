import Link from "next/link";
import Egb339Markdown from "../Egb339Markdown";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";
import { getEgb339Assessment } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { egb339AssessmentAnchor } from "@/lib/egb339-study-weeks";
import type { Egb339CourseWeek } from "@/lib/egb339-course";

export default function StudyWeekAssessments({ week }: { week: Egb339CourseWeek }) {
  return <section id="vurderinger" data-egb-week-section className="egb-week-assessments">
    <h2>Assessments som bruker Week {week.week}</h2>
    <p className="egb-pilot-prose">Dette er pensumkoblinger, ikke innleveringsuker. Gjennomgangene under er de samme som på vurderingssidene. Fullføringsmerket gjelder hele assessmenten, også når den bruker stoff fra flere uker.</p>
    <nav className="egb-week-assessment-index" aria-label="Assessment i denne uken">
      {week.assessments.map((link) => <a key={link.href} href={`#${egb339AssessmentAnchor(link.href.split("/").at(-1)!)}`}>{link.title}</a>)}
    </nav>
    {week.assessments.map((link) => {
      const slug = link.href.split("/").at(-1)!;
      const entry = getEgb339Assessment(slug)!;
      const solution = getEgb339AssessmentSolution(slug)!;
      const anchor = egb339AssessmentAnchor(slug);
      return <section key={slug} id={anchor} className="egb-week-assessment egb-pilot-prose">
        <h3>{entry.title}</h3>
        <p>{solution.scope}</p>
        <p className="egb-pilot-source">{solution.source}</p>
        <p><Link href={link.href}>Oppgavebeskrivelse, krav og innlevering</Link></p>
        {solution.parts.map((part) => <div key={part.id} className="egb-week-assessment-part">
          <h4>{part.title}</h4>
          <WeekOneDisclosure id={`${anchor}-solution-${part.id}`} title={`${link.title}: ${part.title}`}>
            {part.missingSourceDetail && <p className="egb-week-notice" data-state="warning">Kildedetalj mangler. Eksakt svar kan ikke verifiseres uten den angitte startfilen.</p>}
            <Egb339Markdown content={part.content} headingOffset={3} studyLinks />
            <p className="egb-pilot-small"><Link href={`${link.href}#solution-${part.id}`}>Åpne denne delen på assessment-siden</Link></p>
          </WeekOneDisclosure>
        </div>)}
        <Egb339PilotProgress pageKey={link.pageKey} />
      </section>;
    })}
  </section>;
}
