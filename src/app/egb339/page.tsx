import Link from "next/link";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { getEgb339Week } from "@/lib/egb339-vault/loader";
import { getEgb339ProblemsForWeek } from "@/lib/egb339-problems";
import { EGB339_WEEK_LEARNING } from "@/lib/egb339-week-learning";
import { egb339DisplaySummary, egb339WeekSubject } from "@/lib/egb339";
import { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";
import Egb339ContinueCard from "@/components/egb339/Egb339ContinueCard";
import { IconArrowRight, IconBookOpen, IconClipboardCheck, IconFlask, IconSigma } from "@/components/egb339/icons";

const TOOLS = [
  { href: "/egb339/uker/uke-2#laboratorium", title: "SE(2)-laboratoriet", description: "Koordinatrammer og homogene transformasjoner i 2D." },
  { href: "/egb339/uker/uke-4#laboratorium", title: "FK-laboratoriet", description: "Dra i leddene og se end-effektoren til 2R-roboten." },
  { href: "/egb339/uker/uke-5#laboratorium", title: "IK-laboratoriet", description: "Finn leddvinkler til et målpunkt — begge grener." },
  { href: "/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration", title: "Assessment 2.1-guiden", description: "Følg SPACE fra bildepunkt til tastetrykk." },
] as const;

export default function Egb339Page() {
  const weeks = getEgb339Course();
  return <article className="egb-pilot-article egb-course-home">
    <header className="egb-course-hero">
      <p className="egb-course-kicker">EGB339 · QUT · Semester 2 · 12 cp</p>
      <h1>Introduction to Robotics</h1>
      <p className="egb-course-lede">Fra koordinatrammer til robotbevegelse og robot vision. Åtte emner bygger steg for steg opp til forward og inverse kinematics, Jacobian, bevegelsesplanlegging og bildebehandling.</p>
    </header>

    <Egb339ContinueCard weeks={weeks} />

    <section aria-labelledby="topics-heading">
      <h2 id="topics-heading">Emneoversikt</h2>
      <p>Emnene leses i rekkefølge — hvert emne bygger på det forrige. Åpne et emne for leksjoner, interaktive laboratorier, oppgaver og assessment-koblinger.</p>
      <ol className="egb-topic-list">
        {weeks.map((week) => {
          const entry = getEgb339Week(`uke-${week.week}`)!;
          const subject = egb339WeekSubject(week.week)!;
          const purpose = EGB339_WEEK_LEARNING[week.week]?.purpose ?? egb339DisplaySummary(entry);
          const problems = getEgb339ProblemsForWeek(week.week).length;
          return <li key={week.week}>
            <Link href={week.href} className="egb-topic-row">
              <span className="egb-topic-number" aria-hidden="true">{week.week}</span>
              <span className="egb-topic-main">
                <span className="egb-topic-title"><span className="sr-only">Uke {week.week}: </span>{week.title}</span>
                <span className="egb-topic-purpose">{purpose}</span>
                <span className="egb-topic-meta">
                  <span className="egb-pill">{week.topics.length} temaer</span>
                  {problems > 0 && <span className="egb-pill">{problems} oppgaver</span>}
                  {week.assessments.length > 0 && <span className="egb-pill">{week.assessments.length} {week.assessments.length === 1 ? "assessment" : "assessments"}</span>}
                  <span className="egb-pill egb-pill-interactive"><IconFlask />{subject.interactive}</span>
                </span>
              </span>
              <PilotStatus pageKey={week.pageKey} short />
              <IconArrowRight className="egb-topic-arrow" />
            </Link>
          </li>;
        })}
      </ol>
    </section>

    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading">Interaktive robotverktøy</h2>
      <p>Utforsk modellene direkte — endre parametere og se hva som skjer.</p>
      <ul className="egb-tool-list">
        {TOOLS.map((tool) => <li key={tool.href}>
          <Link href={tool.href}>
            <IconFlask />
            <span className="egb-tool-text">
              <span className="egb-tool-title">{tool.title}</span>
              <span className="egb-tool-description">{tool.description}</span>
            </span>
            <IconArrowRight />
          </Link>
        </li>)}
      </ul>
    </section>

    <section aria-labelledby="assessments-heading">
      <h2 id="assessments-heading">Vurderinger</h2>
      <p>Assessment 1 (problem-solving) teller 20 %, Assessment 2 (anvendt prosjekt) 45 % og den skriftlige eksamenen 35 %. Hver emneside viser hvilke assessments som bruker stoffet.</p>
      <p><Link className="egb-course-link" href="/egb339/vurderinger"><IconClipboardCheck />Åpne vurderingsoversikten<IconArrowRight /></Link></p>
    </section>

    <section aria-labelledby="more-heading">
      <h2 id="more-heading">Repetisjon og oppslag</h2>
      <ul className="egb-course-link-list">
        <li><Link href="/egb339/oppsummering"><IconSigma />Hurtigark og formler<span>Kjerneformlene fra alle åtte emner.</span></Link></li>
        <li><Link href="/egb339/temaer"><IconBookOpen />Fagregister<span>Slå opp begreper på tvers av emnene.</span></Link></li>
        <li><Link href="/egb339/ressurser"><IconFlask />Praktiske ressurser<span>Simulator, oppsett og praktiske guider.</span></Link></li>
      </ul>
    </section>
  </article>;
}
