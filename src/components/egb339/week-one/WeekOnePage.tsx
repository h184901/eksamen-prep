"use client";

import Image from "next/image";
import Link from "next/link";
import Egb339LangMarkdown from "../Egb339LangMarkdown";
import MathText from "../pilot/Egb339Math";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import { PilotBreadcrumb, PilotEntryNav } from "../pilot/Egb339PilotShell";
import { getEgb339Concept, getEgb339En } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { getEgb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import { egb339WeekSubject } from "@/lib/egb339";
import { WEEK_ONE_PROMPTS, WEEK_ONE_PROMPTS_EN, WEEK_ONE_SECTIONS, WEEK_ONE_SECTION_TITLES, WEEK_ONE_WARMUP } from "@/lib/egb339-week-one";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { RobotSystemDiagram, KinematicChainDiagram } from "./WeekOneDiagrams";
import { WeekOneConditionalCheck, WeekOneFrameExplorer, WeekOneMatrixExplorer } from "./WeekOneExplorers";
import { WeekOneJumpNavigation } from "./WeekOneNavigation";
import WeekOneDisclosure from "./WeekOneDisclosure";
import { IconFlask } from "../icons";

export default function WeekOnePage() {
  const { lang } = useEgb339Lang();
  const en = lang === "en";
  const python = getEgb339Concept("python-control-flow-and-collections")!;
  const autograder = getEgb339Concept("public-and-private-autograder-tests")!;
  const warmup = getEgb339AssessmentSolution(WEEK_ONE_WARMUP)!;
  const warmupEn = getEgb339AssessmentSolutionEn(WEEK_ONE_WARMUP);
  const sectionTitle = (id: string) => WEEK_ONE_SECTION_TITLES[id]?.[lang] ?? id;
  const subject = egb339WeekSubject(1)!;

  return <>
    <PilotBreadcrumb title={subject.title} titleEn={subject.titleEn} week={1} />
    <article className="egb-pilot-article egb-week-one">
      <section id="introduction" data-week-one-section>
        <header className="egb-week-heading">
          <p className="egb-week-kicker">{ui(lang, "weekOf")} 1 {ui(lang, "weekOfTotal")} · EGB339</p>
          <h1>{en ? subject.titleEn : subject.title}</h1>
          <p>{en ? "From a physical robot to coordinates, mathematics and code." : "Fra en fysisk robot til koordinater, matematikk og kode."}</p>
          <ul className="egb-week-meta" aria-label={ui(lang, "topicContentsAria")}>
            <li className="egb-pill">{WEEK_ONE_SECTIONS.filter((section) => "pageKey" in section).length} {ui(lang, "pillTopics")}</li>
            <li className="egb-pill">{warmup.parts.length} {en ? "warmup exercises" : "warmup-oppgaver"}</li>
            <li className="egb-pill">1 assessment</li>
            <li className="egb-pill egb-pill-interactive"><IconFlask />{en ? subject.interactiveEn : subject.interactive}</li>
          </ul>
        </header>
        <div className="egb-week-opening">
          <figure className="egb-week-robot-image">
            {/* This protected asset needs the browser session; the optimizer fetch has no cookie. */}
            <Image src="/egb339/week-1/panda-swift.png" width={1382} height={759} alt={en ? "Panda manipulator in Swift: fixed base, jointed arm and a gripper at the end." : "Panda-manipulator i Swift: fast base, leddelt arm og en griper ytterst."} priority unoptimized />
            <figcaption>{en ? <>Panda model in Robotics Toolbox / Swift. Model illustration, not a photo or the course's Dobot. <a href="#kilder">Source and license</a>.</> : <>Panda-modell i Robotics Toolbox / Swift. Modellillustrasjon, ikke et foto eller kursets Dobot. <a href="#kilder">Kilde og lisens</a>.</>}</figcaption>
          </figure>
          <div>
            <h2>{en ? "What must the robot know?" : "Hva må roboten vite?"}</h2>
            <p>{en ? "To grasp an object, the robot must know where the object is, how the gripper should be oriented and which joints must move." : "For å gripe en gjenstand må roboten vite hvor gjenstanden er, hvordan griperen skal vende og hvilke ledd som må beveges."}</p>
            <p>{en ? "EGB339 connects these questions: first pose and kinematics, then motion and robot vision. Python lets you compute on the models and control them." : "EGB339 kobler disse spørsmålene sammen: først pose og kinematikk, deretter bevegelse og robot vision. Python lar deg regne på modellene og kontrollere dem."}</p>
            <p className="egb-pilot-small">{en ? <>This week establishes the concepts. The complete transformations come in <Link href="/egb339/uker/uke-2">Linear Algebra and 2D Pose</Link> (week 2) and <Link href="/egb339/uker/uke-3">NumPy and 3D Pose</Link> (week 3).</> : <>Denne uken etablerer begrepene. De fullstendige transformasjonene kommer i <Link href="/egb339/uker/uke-2">Lineær algebra og 2D-pose</Link> (uke 2) og <Link href="/egb339/uker/uke-3">NumPy og 3D-pose</Link> (uke 3).</>}</p>
          </div>
        </div>
      </section>

      <WeekOneJumpNavigation />

      <section id="what-is-robotics" data-week-one-section>
        <span id="ukeinnhold" className="egb-week-anchor" />
        <div className="egb-pilot-prose">
          <h2>{sectionTitle("what-is-robotics")}</h2>
          <p>{en ? "A robot combines physical mechanics with sensing and programmable control. A manipulator moves a tool through a chain of joints and rigid links. A mobile robot also moves its own base." : "En robot kombinerer fysisk mekanikk med måling og programmerbar styring. En manipulator flytter et verktøy gjennom en kjede av ledd og stive lenker. En mobil robot flytter også selve basen."}</p>
          <p>{en ? "QUT's introduction shows an arm with a camera that has to handle an object. The camera provides information about the scene; the motors perform the motion. In between we need a model that turns the measurement into an action." : "QUTs introduksjon viser en arm med kamera som skal håndtere et objekt. Kameraet gir informasjon om scenen; motorene utfører bevegelsen. Mellom dem trenger vi en modell som gjør målingen om til en handling."}</p>
        </div>
        <RobotSystemDiagram />
        <div className="egb-week-explanation-pair">
          <div><h3>{en ? "Sensing is not motion" : "Måling er ikke bevegelse"}</h3><p>{en ? "A sensor describes what the robot observes. An actuator affects the physical world. The controller uses the measurements to choose or correct the action." : "En sensor beskriver det roboten observerer. En aktuator påvirker den fysiske verden. Styringen bruker målingene til å velge eller korrigere handlingen."}</p></div>
          <div><h3>{en ? "A model is not the whole robot" : "En modell er ikke hele roboten"}</h3><p>{en ? "The geometry describes where the links and the tool are. It does not by itself describe friction, motor forces or errors in the camera measurement." : "Geometrien beskriver hvor lenkene og verktøyet er. Den beskriver ikke alene friksjon, motorkrefter eller feil i kameramålingen."}</p></div>
        </div>
        <div className="egb-pilot-prose"><h3>{en ? "Joints, links and end effector" : "Ledd, lenker og end-effector"}</h3><p>{en ? "A joint allows relative motion between links. The end effector is the tool at the far end, for example a gripper. A degree of freedom is one independent motion variable; the two revolute joints below give two joint angles." : "Et ledd tillater relativ bevegelse mellom lenker. End-effector er verktøyet ytterst, for eksempel en griper. En frihetsgrad er én uavhengig bevegelsesvariabel; de to roterende leddene nedenfor gir to leddvinkler."}</p></div>
        <KinematicChainDiagram />
        <p className="egb-pilot-prose">{en ? <>In <Link href="/egb339/uker/uke-4">Forward Kinematics</Link> (week 4) we use the joint angles to compute the tool's pose. Here the goal is only to identify base, joints, links and tool.</> : <>I <Link href="/egb339/uker/uke-4">Forward kinematics</Link> (uke 4) bruker vi leddvinklene til å beregne verktøyets pose. Her er målet bare å kunne identifisere base, ledd, lenker og verktøy.</>}</p>
      </section>

      <section id="coordinate-frames" data-week-one-section>
        <span id="leksjoner" className="egb-week-anchor" />
        <div className="egb-pilot-prose">
          <h2>{sectionTitle("coordinate-frames")}</h2>
          <p>{en ? "“Two units to the right” needs a reference. A coordinate frame provides an origin and axes to measure along. A point can therefore have different coordinates without having moved." : "«To enheter til høyre» trenger en referanse. En koordinatramme gir et origo og akser å måle langs. Et punkt kan derfor ha ulike koordinater uten å ha flyttet seg."}</p>
          <h3 id="position-and-orientation">{en ? "Position and orientation are different" : "Posisjon og orientering er forskjellige"}</h3>
          <p>{en ? <>Position tells where the origin sits. Orientation tells which way the axes point. Together they describe a <em>pose</em>. A point has position; a rigid object also has orientation.</> : <>Posisjon forteller hvor origo ligger. Orientering forteller hvilken vei aksene peker. Sammen beskriver de en <em>pose</em>. Et punkt har posisjon; et stivt objekt har også orientering.</>}</p>
          <p>{en ? <><span className="egb-week-frame-a">A is the fixed reference frame.</span> <span className="egb-week-frame-b">B follows the object.</span> We write <MathText inline>{String.raw`{}^Ap`}</MathText> for the coordinates of P measured in A, and <MathText inline>{String.raw`{}^Bp`}</MathText> for the coordinates of the same point measured in B.</> : <><span className="egb-week-frame-a">A er den faste referanserammen.</span> <span className="egb-week-frame-b">B følger objektet.</span> Vi skriver <MathText inline>{String.raw`{}^Ap`}</MathText> for koordinatene til P målt i A, og <MathText inline>{String.raw`{}^Bp`}</MathText> for koordinatene til det samme punktet målt i B.</>}</p>
        </div>
        <WeekOneFrameExplorer />
        <div className="egb-pilot-prose egb-week-worked" id="frame-example">
          <h3>{en ? "Worked example: translation only" : "Worked example: bare translasjon"}</h3>
          <p>{en ? "Our own introductory example, not a QUT answer key. B sits one unit to the right and two up from A. The axes point the same way. The point has B-coordinates (2, 1)." : "Eget innføringseksempel, ikke en QUT-fasit. B ligger én enhet til høyre og to opp fra A. Aksene peker samme vei. Punktet har B-koordinater (2, 1)."}</p>
          <ol className="egb-week-calculation-steps">
            <li><strong>{en ? "Describe what is known." : "Beskriv det som er kjent."}</strong> {en ? "No rotation means the rotation matrix is the identity." : "Ingen rotasjon betyr at rotasjonsmatrisen er identiteten."}
              <MathText>{String.raw`{}^AR_B=I,\qquad {}^At_B=\begin{bmatrix}1\\2\end{bmatrix},\qquad {}^Bp=\begin{bmatrix}2\\1\end{bmatrix}`}</MathText>
            </li>
            <li><strong>{en ? "Compute from B to A." : "Regn fra B til A."}</strong> {en ? "First keep the direction, then add the distance between the origins." : "Først behold retningen, deretter legg til avstanden mellom origoene."}
              <MathText>{String.raw`{}^Ap=I\begin{bmatrix}2\\1\end{bmatrix}+\begin{bmatrix}1\\2\end{bmatrix}=\begin{bmatrix}2+1\\1+2\end{bmatrix}=\begin{bmatrix}3\\3\end{bmatrix}`}</MathText>
            </li>
            <li><strong>{en ? "Check the other way." : "Kontroller motsatt vei."}</strong> {en ? "Subtract the same translation. We should get the original coordinates back." : "Trekk fra den samme translasjonen. Vi skal få tilbake de opprinnelige koordinatene."}
              <MathText>{String.raw`{}^Bp=\begin{bmatrix}3\\3\end{bmatrix}-\begin{bmatrix}1\\2\end{bmatrix}=\begin{bmatrix}2\\1\end{bmatrix}`}</MathText>
            </li>
          </ol>
          <p>{en ? "Press “Reset” in the explorer for these numbers. Then choose “P stays still” and move B. The point should stay put even though the B-coordinates change." : "Trykk «Nullstill» i utforskeren for disse tallene. Velg deretter «P står stille» og flytt B. Punktet skal bli stående, selv om B-koordinatene endres."}</p>
          <h3>{en ? "Several frames form a chain" : "Flere rammer danner en kjede"}</h3>
          <p>{en ? "QUT's introduction connects frames belonging to the robot and the work object. The middle frame must match when transformations are composed:" : "QUTs introduksjon kobler rammer som tilhører roboten og arbeidsobjektet. Mellomrammen må passe når transformasjoner settes sammen:"}</p>
          <MathText>{String.raw`{}^AT_C={}^AT_B\,{}^BT_C`}</MathText>
          <p>{en ? <>A point in C is expressed first in B, then in A. The right-hand factor acts first on the column vector. The <Link href="/egb339/temaer/se-2-homogeneous-transformations">SE(2) lesson</Link> shows the full calculation; <Link href="/egb339/temaer/pose-graphs">pose graphs</Link> show the connections between several frames.</> : <>Et punkt i C uttrykkes først i B, deretter i A. Den høyre faktoren virker først på kolonnevektoren. <Link href="/egb339/temaer/se-2-homogeneous-transformations">SE(2)-leksjonen</Link> viser den fullstendige regningen; <Link href="/egb339/temaer/pose-graphs">pose graphs</Link> viser forbindelsene mellom flere rammer.</>}</p>
        </div>
      </section>

      <section id="foundations" data-week-one-section>
        <div className="egb-pilot-prose">
          <h2>{sectionTitle("foundations")}</h2>
          <p>{en ? "A column vector collects coordinates. A matrix can describe how these coordinates are combined into new coordinates. Recognising the numbers is therefore not enough: you must also read the shape and the order." : "En kolonnevektor samler koordinater. En matrise kan beskrive hvordan disse koordinatene kombineres til nye koordinater. Derfor holder det ikke å gjenkjenne tallene: du må også lese form og rekkefølge."}</p>
          <MathText>{String.raw`(m\times n)(n\times p)\longrightarrow(m\times p)`}</MathText>
          <p>{en ? "The inner dimensions must be equal. Every element in the result is a dot product between one row in the left matrix and one column in the right." : "De indre dimensjonene må være like. Hvert element i resultatet er et skalarprodukt mellom én rad i venstre matrise og én kolonne i høyre."}</p>
          <h3 id="matrix-example">{en ? "Worked example: QUT warmup Q15" : "Worked example: QUT warmup Q15"}</h3>
          <p>{en ? "These are ordinary number matrices, not rotation matrices. Start with the top-left element and follow the calculation through all four." : "Dette er vanlige tallmatriser, ikke rotasjonsmatriser. Begynn med øverste venstre element og følg beregningen gjennom alle fire."}</p>
        </div>
        <WeekOneMatrixExplorer />
        <p className="egb-week-notice" data-state="warning">{en ? <><strong>Typo in the QUT example:</strong> PDF page 6 shows the first row as [12, 14]. The row–column calculation gives [19, 22]. The second row is [43, 50]. The existing <a href="#solution-q15">Q15 walkthrough</a> explains the check.</> : <><strong>Trykkfeil i QUT-eksemplet:</strong> PDF-side 6 viser første rad som [12, 14]. Rad–kolonne-regningen gir [19, 22]. Andre rad er [43, 50]. Den eksisterende <a href="#solution-q15">Q15-gjennomgangen</a> forklarer kontrollen.</>}</p>
      </section>

      <section id="python" data-week-one-section className="egb-pilot-prose">
        <h2>{sectionTitle("python")}</h2>
        <Egb339LangMarkdown no={python.body} en={getEgb339En("python-control-flow-and-collections")?.body} headingOffset={1} />
        <WeekOneConditionalCheck />
        <div role="group" aria-label={en ? "Completion: Python foundations" : "Fullføring: Python foundations"}><Egb339PilotProgress pageKey="egb339/tema/python-control-flow-and-collections" /></div>
      </section>

      <section id="autograder" data-week-one-section className="egb-pilot-prose">
        <h2>{sectionTitle("autograder")}</h2>
        <Egb339LangMarkdown no={autograder.body} en={getEgb339En("public-and-private-autograder-tests")?.body} headingOffset={1} />
        <div role="group" aria-label={en ? "Completion: Public and private tests" : "Fullføring: Public and private tests"}><Egb339PilotProgress pageKey="egb339/tema/public-and-private-autograder-tests" /></div>
      </section>

      <section id="practical" data-week-one-section className="egb-pilot-prose">
        <h2>{sectionTitle("practical")}</h2>
        <p>{en ? "Tutorials and practicals start in week 2, according to QUT's Week 1 lecture, page 53. This part is preparation, not an official week 1 lab set of its own." : "Tutorials og practicals starter i uke 2, ifølge QUTs Week 1-forelesning, side 53. Denne delen er forberedelse, ikke et eget offisielt uke 1-labsett."}</p>
        <ol className="egb-week-preparation">
          <li>{en ? "Find QUT's starter file and public tests for the warmup. Check that you have the right file name and function signatures before you begin." : "Finn QUTs startfil og offentlige tester for warmup. Kontroller at du har riktig filnavn og funksjonssignaturer før du begynner."}</li>
          <li>{en ? <>Use the course environment from <Link href="/egb339/ressurser">practical resources</Link>. Check that Python and NumPy can be imported. Follow the setup in Python Refresher from week 2.</> : <>Bruk kursmiljøet fra <Link href="/egb339/ressurser">praktiske ressurser</Link>. Kontroller at Python og NumPy kan importeres. Følg oppsettet i Python Refresher fra uke 2.</>}</li>
          <li>{en ? <>Separate simulation from the physical robot: <Link href="/egb339/temaer/coppeliasim">CoppeliaSim</Link> and <Link href="/egb339/temaer/dobot-magician">Dobot Magician</Link> are used later. This website's figures send no commands to a robot.</> : <>Skill mellom simulering og fysisk robot: <Link href="/egb339/temaer/coppeliasim">CoppeliaSim</Link> og <Link href="/egb339/temaer/dobot-magician">Dobot Magician</Link> brukes senere. Denne nettsidens figurer sender ingen kommandoer til en robot.</>}</li>
        </ol>
      </section>

      <section id="oppgaver" data-week-one-section>
        <div className="egb-pilot-prose">
          <h2>{sectionTitle("oppgaver")}</h2>
          <p>{en ? "Use the voluntary warmup to check the foundation. Q1–Q7 train Python and belong to the practical in week 2. Q8–Q15 train NumPy and belong to the practical in week 3; you can treat them as a preview now." : "Bruk den frivillige warmupen til å kontrollere grunnlaget. Q1–Q7 trener Python og inngår i practical i uke 2. Q8–Q15 trener NumPy og inngår i practical i uke 3; du kan se dem som en forhåndsvisning nå."}</p>
          <p className="egb-week-notice" data-state="warning">{en ? <>The starter file <code>assignment1_0.py</code> is missing from the local source set. Q1, Q4 and Q10 therefore have no verifiable exact answer key here. The wording about the lower bound in Q3 is also unclear. The limitations are noted in the solutions.</> : <>Startfilen <code>assignment1_0.py</code> mangler i det lokale kildesettet. Q1, Q4 og Q10 har derfor ikke verifiserbar eksakt fasit her. Ordlyden om nedre grense i Q3 er også uklar. Begrensningene står i løsningene.</>}</p>
          <nav className="egb-week-question-index" aria-label={en ? "Warmup questions" : "Warmup-spørsmål"}>{warmup.parts.map((part) => <a key={part.id} href={`#warmup-${part.id}`}>{part.id.toUpperCase()}</a>)}</nav>
        </div>
        {[{ title: "Python: Q1–Q7", parts: warmup.parts.slice(0, 7) }, { title: "NumPy: Q8–Q15", parts: warmup.parts.slice(7) }].map((group) => <div className="egb-week-exercise-group egb-pilot-prose" key={group.title}>
          <h3>{group.title}</h3>
          {group.parts.map((part) => <section className="egb-week-exercise" id={`warmup-${part.id}`} key={part.id} aria-labelledby={`warmup-${part.id}-title`}>
            <h4 id={`warmup-${part.id}-title`}>{en ? warmupEn?.parts[part.id]?.title ?? part.title : part.title}</h4>
            <p>{en ? WEEK_ONE_PROMPTS_EN[part.id] : WEEK_ONE_PROMPTS[part.id]}</p>
            <WeekOneDisclosure id={`solution-${part.id}`} title={part.id.toUpperCase()}>
              {part.missingSourceDetail && <p className="egb-week-notice" data-state="warning"><strong>{en ? "Source detail missing." : "Kildedetalj mangler."}</strong> {en ? "The exact answer cannot be verified yet." : "Eksakt svar kan ikke verifiseres ennå."}</p>}
              <Egb339LangMarkdown no={part.content} en={warmupEn?.parts[part.id]?.content} headingOffset={1} />
            </WeekOneDisclosure>
          </section>)}
        </div>)}
      </section>

      <section id="assessment" data-week-one-section className="egb-pilot-prose">
        <span id="vurderinger" className="egb-week-anchor" />
        <h2>{sectionTitle("assessment")}</h2>
        <p>{en ? <><Link href="/egb339/vurderinger/assessment-1-0-warmup-to-gradescope">Assessment 1.0: Warmup to Gradescope</Link> is voluntary and gives 0 points. The walkthrough above is the same as on the assessment page, not an extra exercise set. Completion is stored on the same assessment.</> : <><Link href="/egb339/vurderinger/assessment-1-0-warmup-to-gradescope">Assessment 1.0: Warmup to Gradescope</Link> er frivillig og gir 0 poeng. Gjennomgangen over er den samme som på assessment-siden, ikke et ekstra oppgavesett. Fullføring lagres på samme assessment.</>}</p>
        <div role="group" aria-label={en ? "Completion: Warmup" : "Fullføring: Warmup"}><Egb339PilotProgress pageKey={`egb339/vurdering/${WEEK_ONE_WARMUP}`} /></div>
        <p>{en ? <>In <Link href="/egb339/uker/uke-2">Linear Algebra and 2D Pose</Link> (week 2), linear algebra is connected to SO(2) and SE(2). This is used in <Link href="/egb339/vurderinger/assessment-1-1-position-and-orientation-in-2d">Assessment 1.1: Position and orientation in 2D</Link>. It is a curriculum link, not a submission deadline.</> : <>I <Link href="/egb339/uker/uke-2">Lineær algebra og 2D-pose</Link> (uke 2) kobles lineær algebra til SO(2) og SE(2). Dette brukes i <Link href="/egb339/vurderinger/assessment-1-1-position-and-orientation-in-2d">Assessment 1.1: Position and orientation in 2D</Link>. Det er en pensumkobling, ikke en innleveringsfrist.</>}</p>
        <p>{en ? <>The applied project requires both code and an oral explanation of the robot kinematics. The assessment code must be your own work and must not be published publicly. Check the current QUT rules for GenAI, citations and the oral components on <Link href="/egb339/vurderinger">the assessment overview</Link>.</> : <>Det anvendte prosjektet krever både kode og muntlig forklaring av robotkinematikken. Vurderingskoden skal være ditt eget arbeid og skal ikke publiseres offentlig. Kontroller gjeldende QUT-regler for GenAI, kildehenvisninger og de muntlige komponentene på <Link href="/egb339/vurderinger">vurderingsoversikten</Link>.</>}</p>
        <h3 id="kilder">{en ? "Sources and further reading" : "Kilder og videre lesing"}</h3>
        <ul className="egb-week-sources">
          <li>{en ? <><strong>QUT, EGB339 Lecture Week 1 (2026):</strong> page 11 and 13 on manipulator/camera/joints; page 14 on frames; page 53 on the start of tutorials/practicals. The original figures are in the course material; the system and chain diagrams here are our own sketches.</> : <><strong>QUT, EGB339 Lecture Week 1 (2026):</strong> side 11 og 13 om manipulator/kamera/ledd; side 14 om rammer; side 53 om oppstart av tutorials/practicals. Originalfigurene ligger i kursmaterialet; system- og kjedediagrammet her er egne skisser.</>}</li>
          <li>{en ? <><strong>Corke, Robotics, Vision and Control, 3rd edition (Python), 2023:</strong> chapter 1 and section 2.1.1–2.1.2. Figures 2.4–2.6 explain body-fixed frames and coordinates. The explorer is our own interactive presentation of this subject model.</> : <><strong>Corke, Robotics, Vision and Control, 3. utgave (Python), 2023:</strong> kapittel 1 og seksjon 2.1.1–2.1.2. Figur 2.4–2.6 forklarer objektfaste rammer og koordinater. Utforskeren er en egen interaktiv fremstilling av denne fagmodellen.</>}</li>
          <li><strong>QUT, Warmup to Gradescope:</strong> {en ? "PDF pages 1–6." : "PDF-side 1–6."} {en ? warmupEn?.scope ?? warmup.scope : warmup.scope}</li>
          <li>{en ? <><strong>Robotics Toolbox for Python:</strong> <a href="https://github.com/petercorke/robotics-toolbox-python/blob/main/docs/figs/swift.png">the Panda figure from the documentation</a>, <code>examples/teach.py</code> and <code>models/ETS/Planar2.py</code>. The image is unchanged and distributed with <a href={"/egb339/week-1/robotics-toolbox-LICENSE.txt"}>the MIT license</a> (© 2020 jhavl).</> : <><strong>Robotics Toolbox for Python:</strong> <a href="https://github.com/petercorke/robotics-toolbox-python/blob/main/docs/figs/swift.png">Panda-figuren fra dokumentasjonen</a>, <code>examples/teach.py</code> og <code>models/ETS/Planar2.py</code>. Bildet er uendret og distribueres med <a href={"/egb339/week-1/robotics-toolbox-LICENSE.txt"}>MIT-lisensen</a> (© 2020 jhavl).</>}</li>
        </ul>
        <h3>{en ? `Complete ${subject.titleEn}` : `Fullfør ${subject.title}`}</h3>
        <p>{en ? "Can you tell a point from a pose, read a coordinate frame name and follow one matrix product? Mark the topic (week 1) when you are ready. Topic, subtopics and warmup have separate completion marks." : "Kan du skille punkt fra pose, lese et koordinatrammenavn og følge ett matriseprodukt? Marker emnet (uke 1) når du er klar. Emne, temaer og warmup har separate fullføringsmerker."}</p>
        <div role="group" aria-label={en ? `Completion: ${subject.titleEn}` : `Fullføring: ${subject.title}`}><Egb339PilotProgress pageKey="egb339/uke/uke-1" /></div>
        <PilotEntryNav previous={{ href: "/egb339", title: "Kursoversikt", titleEn: "Course overview", pageKey: "egb339" }} next={{ href: "/egb339/uker/uke-2", title: "Lineær algebra og 2D-pose", titleEn: "Linear Algebra and 2D Pose", pageKey: "egb339/uke/uke-2" }} />
      </section>
    </article>
  </>;
}
