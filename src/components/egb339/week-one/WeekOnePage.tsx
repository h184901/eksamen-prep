import Image from "next/image";
import Link from "next/link";
import Egb339Markdown from "../Egb339Markdown";
import MathText from "../pilot/Egb339Math";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import { PilotBreadcrumb, PilotEntryNav } from "../pilot/Egb339PilotShell";
import { getEgb339Concept } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { WEEK_ONE_PROMPTS, WEEK_ONE_WARMUP } from "@/lib/egb339-week-one";
import { RobotSystemDiagram, KinematicChainDiagram } from "./WeekOneDiagrams";
import { WeekOneConditionalCheck, WeekOneFrameExplorer, WeekOneMatrixExplorer } from "./WeekOneExplorers";
import { WeekOneJumpNavigation } from "./WeekOneNavigation";
import WeekOneDisclosure from "./WeekOneDisclosure";

export default function WeekOnePage() {
  const python = getEgb339Concept("python-control-flow-and-collections")!;
  const autograder = getEgb339Concept("public-and-private-autograder-tests")!;
  const warmup = getEgb339AssessmentSolution(WEEK_ONE_WARMUP)!;

  return <>
    <PilotBreadcrumb title="Introduction" week={1} />
    <article className="egb-pilot-article egb-week-one">
      <section id="introduction" data-week-one-section>
        <header className="egb-week-heading">
          <h1>Week 1: Introduction</h1>
          <p>Fra en fysisk robot til koordinater, matematikk og kode.</p>
        </header>
        <div className="egb-week-opening">
          <figure className="egb-week-robot-image">
            {/* This protected asset needs the browser session; the optimizer fetch has no cookie. */}
            <Image src="/egb339/week-1/panda-swift.png" width={1382} height={759} alt="Panda-manipulator i Swift: fast base, leddelt arm og en griper ytterst." priority unoptimized />
            <figcaption>Panda-modell i Robotics Toolbox / Swift. Modellillustrasjon, ikke et foto eller kursets Dobot. <a href="#kilder">Kilde og lisens</a>.</figcaption>
          </figure>
          <div>
            <h2>Hva må roboten vite?</h2>
            <p>For å gripe en gjenstand må roboten vite hvor gjenstanden er, hvordan griperen skal vende og hvilke ledd som må beveges.</p>
            <p>EGB339 kobler disse spørsmålene sammen: først pose og kinematikk, deretter bevegelse og robot vision. Python lar deg regne på modellene og kontrollere dem.</p>
            <p className="egb-pilot-small">Denne uken etablerer begrepene. De fullstendige transformasjonene kommer i Week 2 og 3.</p>
          </div>
        </div>
      </section>

      <WeekOneJumpNavigation />

      <section id="what-is-robotics" data-week-one-section>
        <span id="ukeinnhold" className="egb-week-anchor" />
        <div className="egb-pilot-prose">
          <h2>What is robotics?</h2>
          <p>En robot kombinerer fysisk mekanikk med måling og programmerbar styring. En manipulator flytter et verktøy gjennom en kjede av ledd og stive lenker. En mobil robot flytter også selve basen.</p>
          <p>QUTs introduksjon viser en arm med kamera som skal håndtere et objekt. Kameraet gir informasjon om scenen; motorene utfører bevegelsen. Mellom dem trenger vi en modell som gjør målingen om til en handling.</p>
        </div>
        <RobotSystemDiagram />
        <div className="egb-week-explanation-pair">
          <div><h3>Måling er ikke bevegelse</h3><p>En sensor beskriver det roboten observerer. En aktuator påvirker den fysiske verden. Styringen bruker målingene til å velge eller korrigere handlingen.</p></div>
          <div><h3>En modell er ikke hele roboten</h3><p>Geometrien beskriver hvor lenkene og verktøyet er. Den beskriver ikke alene friksjon, motorkrefter eller feil i kameramålingen.</p></div>
        </div>
        <div className="egb-pilot-prose"><h3>Ledd, lenker og end-effector</h3><p>Et ledd tillater relativ bevegelse mellom lenker. End-effector er verktøyet ytterst, for eksempel en griper. En frihetsgrad er én uavhengig bevegelsesvariabel; de to roterende leddene nedenfor gir to leddvinkler.</p></div>
        <KinematicChainDiagram />
        <p className="egb-pilot-prose">I <Link href="/egb339/uker/uke-4">Week 4</Link> bruker vi leddvinklene til å beregne verktøyets pose. Her er målet bare å kunne identifisere base, ledd, lenker og verktøy.</p>
      </section>

      <section id="coordinate-frames" data-week-one-section>
        <span id="leksjoner" className="egb-week-anchor" />
        <div className="egb-pilot-prose">
          <h2>Coordinate frames</h2>
          <p>«To enheter til høyre» trenger en referanse. En koordinatramme gir et origo og akser å måle langs. Et punkt kan derfor ha ulike koordinater uten å ha flyttet seg.</p>
          <h3 id="position-and-orientation">Posisjon og orientering er forskjellige</h3>
          <p>Posisjon forteller hvor origo ligger. Orientering forteller hvilken vei aksene peker. Sammen beskriver de en <em>pose</em>. Et punkt har posisjon; et stivt objekt har også orientering.</p>
          <p><span className="egb-week-frame-a">A er den faste referanserammen.</span> <span className="egb-week-frame-b">B følger objektet.</span> Vi skriver <MathText inline>{String.raw`{}^Ap`}</MathText> for koordinatene til P målt i A, og <MathText inline>{String.raw`{}^Bp`}</MathText> for koordinatene til det samme punktet målt i B.</p>
        </div>
        <WeekOneFrameExplorer />
        <div className="egb-pilot-prose egb-week-worked" id="frame-example">
          <h3>Worked example: bare translasjon</h3>
          <p>Eget innføringseksempel, ikke en QUT-fasit. B ligger én enhet til høyre og to opp fra A. Aksene peker samme vei. Punktet har B-koordinater (2, 1).</p>
          <ol className="egb-week-calculation-steps">
            <li><strong>Beskriv det som er kjent.</strong> Ingen rotasjon betyr at rotasjonsmatrisen er identiteten.
              <MathText>{String.raw`{}^AR_B=I,\qquad {}^At_B=\begin{bmatrix}1\\2\end{bmatrix},\qquad {}^Bp=\begin{bmatrix}2\\1\end{bmatrix}`}</MathText>
            </li>
            <li><strong>Regn fra B til A.</strong> Først behold retningen, deretter legg til avstanden mellom origoene.
              <MathText>{String.raw`{}^Ap=I\begin{bmatrix}2\\1\end{bmatrix}+\begin{bmatrix}1\\2\end{bmatrix}=\begin{bmatrix}2+1\\1+2\end{bmatrix}=\begin{bmatrix}3\\3\end{bmatrix}`}</MathText>
            </li>
            <li><strong>Kontroller motsatt vei.</strong> Trekk fra den samme translasjonen. Vi skal få tilbake de opprinnelige koordinatene.
              <MathText>{String.raw`{}^Bp=\begin{bmatrix}3\\3\end{bmatrix}-\begin{bmatrix}1\\2\end{bmatrix}=\begin{bmatrix}2\\1\end{bmatrix}`}</MathText>
            </li>
          </ol>
          <p>Trykk «Nullstill» i utforskeren for disse tallene. Velg deretter «P står stille» og flytt B. Punktet skal bli stående, selv om B-koordinatene endres.</p>
          <h3>Flere rammer danner en kjede</h3>
          <p>QUTs introduksjon kobler rammer som tilhører roboten og arbeidsobjektet. Mellomrammen må passe når transformasjoner settes sammen:</p>
          <MathText>{String.raw`{}^AT_C={}^AT_B\,{}^BT_C`}</MathText>
          <p>Et punkt i C uttrykkes først i B, deretter i A. Den høyre faktoren virker først på kolonnevektoren. <Link href="/egb339/temaer/se-2-homogeneous-transformations">SE(2)-leksjonen</Link> viser den fullstendige regningen; <Link href="/egb339/temaer/pose-graphs">pose graphs</Link> viser forbindelsene mellom flere rammer.</p>
        </div>
      </section>

      <section id="foundations" data-week-one-section>
        <div className="egb-pilot-prose">
          <h2>Vectors and matrices</h2>
          <p>En kolonnevektor samler koordinater. En matrise kan beskrive hvordan disse koordinatene kombineres til nye koordinater. Derfor holder det ikke å gjenkjenne tallene: du må også lese form og rekkefølge.</p>
          <MathText>{String.raw`(m\times n)(n\times p)\longrightarrow(m\times p)`}</MathText>
          <p>De indre dimensjonene må være like. Hvert element i resultatet er et skalarprodukt mellom én rad i venstre matrise og én kolonne i høyre.</p>
          <h3 id="matrix-example">Worked example: QUT warmup Q15</h3>
          <p>Dette er vanlige tallmatriser, ikke rotasjonsmatriser. Begynn med øverste venstre element og følg beregningen gjennom alle fire.</p>
        </div>
        <WeekOneMatrixExplorer />
        <p className="egb-week-notice" data-state="warning"><strong>Trykkfeil i QUT-eksemplet:</strong> PDF-side 6 viser første rad som [12, 14]. Rad–kolonne-regningen gir [19, 22]. Andre rad er [43, 50]. Den eksisterende <a href="#solution-q15">Q15-gjennomgangen</a> forklarer kontrollen.</p>
      </section>

      <section id="python" data-week-one-section className="egb-pilot-prose">
        <h2>Python foundations</h2>
        <Egb339Markdown content={python.body} headingOffset={1} />
        <WeekOneConditionalCheck />
        <div role="group" aria-label="Fullføring: Python foundations"><Egb339PilotProgress pageKey="egb339/tema/python-control-flow-and-collections" /></div>
      </section>

      <section id="autograder" data-week-one-section className="egb-pilot-prose">
        <h2>Public and private tests</h2>
        <Egb339Markdown content={autograder.body} headingOffset={1} />
        <div role="group" aria-label="Fullføring: Public and private tests"><Egb339PilotProgress pageKey="egb339/tema/public-and-private-autograder-tests" /></div>
      </section>

      <section id="practical" data-week-one-section className="egb-pilot-prose">
        <h2>Practical preparation</h2>
        <p>Tutorials og practicals starter i Week 2, ifølge QUTs Week 1-forelesning, side 53. Denne delen er forberedelse, ikke et eget offisielt Week 1-labsett.</p>
        <ol className="egb-week-preparation">
          <li>Finn QUTs startfil og offentlige tester for warmup. Kontroller at du har riktig filnavn og funksjonssignaturer før du begynner.</li>
          <li>Bruk kursmiljøet fra <Link href="/egb339/ressurser">praktiske ressurser</Link>. Kontroller at Python og NumPy kan importeres. Følg oppsettet i Python Refresher fra Week 2.</li>
          <li>Skill mellom simulering og fysisk robot: <Link href="/egb339/temaer/coppeliasim">CoppeliaSim</Link> og <Link href="/egb339/temaer/dobot-magician">Dobot Magician</Link> brukes senere. Denne nettsidens figurer sender ingen kommandoer til en robot.</li>
        </ol>
      </section>

      <section id="oppgaver" data-week-one-section>
        <div className="egb-pilot-prose">
          <h2>Exercises and solutions</h2>
          <p>Bruk den frivillige warmupen til å kontrollere grunnlaget. Q1–Q7 trener Python og inngår i practical i Week 2. Q8–Q15 trener NumPy og inngår i practical i Week 3; du kan se dem som en forhåndsvisning nå.</p>
          <p className="egb-week-notice" data-state="warning">Startfilen <code>assignment1_0.py</code> mangler i det lokale kildesettet. Q1, Q4 og Q10 har derfor ikke verifiserbar eksakt fasit her. Ordlyden om nedre grense i Q3 er også uklar. Begrensningene står i løsningene.</p>
          <nav className="egb-week-question-index" aria-label="Warmup-spørsmål">{warmup.parts.map((part) => <a key={part.id} href={`#warmup-${part.id}`}>{part.id.toUpperCase()}</a>)}</nav>
        </div>
        {[{ title: "Python: Q1–Q7", parts: warmup.parts.slice(0, 7) }, { title: "NumPy: Q8–Q15", parts: warmup.parts.slice(7) }].map((group) => <div className="egb-week-exercise-group egb-pilot-prose" key={group.title}>
          <h3>{group.title}</h3>
          {group.parts.map((part) => <section className="egb-week-exercise" id={`warmup-${part.id}`} key={part.id} aria-labelledby={`warmup-${part.id}-title`}>
            <h4 id={`warmup-${part.id}-title`}>{part.title}</h4>
            <p>{WEEK_ONE_PROMPTS[part.id]}</p>
            <WeekOneDisclosure id={`solution-${part.id}`} title={part.id.toUpperCase()}>
              {part.missingSourceDetail && <p className="egb-week-notice" data-state="warning"><strong>Kildedetalj mangler.</strong> Eksakt svar kan ikke verifiseres ennå.</p>}
              <Egb339Markdown content={part.content} headingOffset={1} />
            </WeekOneDisclosure>
          </section>)}
        </div>)}
      </section>

      <section id="assessment" data-week-one-section className="egb-pilot-prose">
        <span id="vurderinger" className="egb-week-anchor" />
        <h2>Assessment and next week</h2>
        <p><Link href="/egb339/vurderinger/assessment-1-0-warmup-to-gradescope">Assessment 1.0: Warmup to Gradescope</Link> er frivillig og gir 0 poeng. Gjennomgangen over er den samme som på assessment-siden, ikke et ekstra oppgavesett. Fullføring lagres på samme assessment.</p>
        <div role="group" aria-label="Fullføring: Warmup"><Egb339PilotProgress pageKey={`egb339/vurdering/${WEEK_ONE_WARMUP}`} /></div>
        <p>I <Link href="/egb339/uker/uke-2">Week 2</Link> kobles lineær algebra til SO(2) og SE(2). Dette brukes i <Link href="/egb339/vurderinger/assessment-1-1-position-and-orientation-in-2d">Assessment 1.1: Position and orientation in 2D</Link>. Det er en pensumkobling, ikke en innleveringsfrist.</p>
        <p>Det anvendte prosjektet krever både kode og muntlig forklaring av robotkinematikken. Vurderingskoden skal være ditt eget arbeid og skal ikke publiseres offentlig. Kontroller gjeldende QUT-regler for GenAI, kildehenvisninger og de muntlige komponentene på <Link href="/egb339/vurderinger">vurderingsoversikten</Link>.</p>
        <h3 id="kilder">Kilder og videre lesing</h3>
        <ul className="egb-week-sources">
          <li><strong>QUT, EGB339 Lecture Week 1 (2026):</strong> side 11 og 13 om manipulator/kamera/ledd; side 14 om rammer; side 53 om oppstart av tutorials/practicals. Originalfigurene ligger i kursmaterialet; system- og kjedediagrammet her er egne skisser.</li>
          <li><strong>Corke, Robotics, Vision and Control, 3. utgave (Python), 2023:</strong> kapittel 1 og seksjon 2.1.1–2.1.2. Figur 2.4–2.6 forklarer objektfaste rammer og koordinater. Utforskeren er en egen interaktiv fremstilling av denne fagmodellen.</li>
          <li><strong>QUT, Warmup to Gradescope:</strong> PDF-side 1–6. {warmup.scope}</li>
          <li><strong>Robotics Toolbox for Python:</strong> <a href="https://github.com/petercorke/robotics-toolbox-python/blob/main/docs/figs/swift.png">Panda-figuren fra dokumentasjonen</a>, <code>examples/teach.py</code> og <code>models/ETS/Planar2.py</code>. Bildet er uendret og distribueres med <a href={"/egb339/week-1/robotics-toolbox-LICENSE.txt"}>MIT-lisensen</a> (© 2020 jhavl).</li>
        </ul>
        <h3>Avslutt Week 1</h3>
        <p>Kan du skille punkt fra pose, lese et koordinatrammenavn og følge ett matriseprodukt? Marker uken når du er klar. Uke, temaer og warmup har separate fullføringsmerker.</p>
        <div role="group" aria-label="Fullføring: Week 1"><Egb339PilotProgress pageKey="egb339/uke/uke-1" /></div>
        <PilotEntryNav previous={{ href: "/egb339", title: "Kursplan", pageKey: "egb339" }} next={{ href: "/egb339/uker/uke-2", title: "Week 2: Lineær algebra og 2D-pose", pageKey: "egb339/uke/uke-2" }} />
      </section>
    </article>
  </>;
}
