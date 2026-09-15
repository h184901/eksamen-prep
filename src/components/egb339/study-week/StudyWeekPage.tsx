import Link from "next/link";
import Egb339Markdown from "../Egb339Markdown";
import Egb339WeekProblems from "../Egb339WeekProblems";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import { PilotBreadcrumb, PilotEntryNav } from "../pilot/Egb339PilotShell";
import { SE2LessonContent } from "../pilot/SE2Lesson";
import { WeekOneMatrixExplorer } from "../week-one/WeekOneExplorers";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { getEgb339Concept, getEgb339Resource, getEgb339Week } from "@/lib/egb339-vault/loader";
import { getEgb339ProblemsForWeek } from "@/lib/egb339-problems";
import { egb339WeekSections } from "@/lib/egb339-study-weeks";
import { egb339DisplayTitle } from "@/lib/egb339";
import { StudyWeekJumpNavigation } from "./StudyWeekNavigation";
import StudyWeekAssessments from "./StudyWeekAssessments";
import StudyFigure from "./StudyFigure";
import SpatialRotationExample from "./SpatialRotationExample";
import { EGB339_WEEK_LEARNING } from "@/lib/egb339-week-learning";
import StudyTopicText from "./StudyTopicText";
import PlanarKinematicsLesson from "../pilot/PlanarKinematicsLesson";
import KinematicChainFigure from "./KinematicChainFigure";
import UnreachableOptimizationExample from "./UnreachableOptimizationExample";
import JacobianExample from "./JacobianExample";
import MotionComparison from "./MotionComparison";
import ImageArrayExample from "./ImageArrayExample";
import { MotionProfileExample, HighwayFigure, HistogramFigure, ImageSubtractionFigure, HomographyExample } from "./WeekSourceExamples";
import Egb339ProblemVisual from "../Egb339ProblemVisual";

export default function StudyWeekPage({ number }: { number: number }) {
  const weeks = getEgb339Course();
  const week = weeks.find((entry) => entry.week === number)!;
  const entry = getEgb339Week(`uke-${number}`)!;
  const sections = egb339WeekSections(week);
  const topics = week.topics.map((topic) => getEgb339Concept(topic.href.split("/").at(-1)!)!);
  const learning = EGB339_WEEK_LEARNING[number];
  return <>
    <PilotBreadcrumb title={egb339DisplayTitle(entry)} week={number} />
    <article className="egb-pilot-article egb-week-study" data-study-week={number}>
      <header className="egb-week-heading">
        <h1>Week {number}: {egb339DisplayTitle(entry)}</h1>
        <p className="egb-pilot-prose">{learning.purpose}</p>
      </header>
      <StudyWeekJumpNavigation sections={sections} />
      <span id="leksjoner" className="egb-week-anchor" />
      {topics.map((topic) => <section key={topic.slug} id={topic.slug} data-egb-week-section className="egb-week-topic">
        <h2>{week.topics.find((link) => link.href === topic.route)!.title}</h2>
        {topic.slug === "se-2-homogeneous-transformations" ? <><span id="laboratorium" className="egb-week-anchor" /><SE2LessonContent embedded /></> : <>
          {topic.slug === "reference-frames" && <div className="egb-week-figure-explanation">
            <StudyFigure src="/egb339/study-figures/rtb-transforms2d.png" width={640} height={480} alt="Robotics Toolbox viser rammene A, B og C med ulike origoer; C er også rotert." source="Robotics Toolbox, transforms2d.png (MIT)" sourceHref="/egb339/study-figures/robotics-toolbox-LICENSE.txt">Les først hvor hvert origo ligger, så hvilken vei aksene peker. Originalplottet har egne aksefarger; de betyr ikke riktig eller feil.</StudyFigure>
            <div><h3>Et origo og to retninger</h3><p>A og B har parallelle akser, men ulike origoer. C har både et annet origo og en annen orientering. Posisjon alene beskriver derfor ikke en ramme.</p><p>I laben nedenfor brukes <span className="egb-week-frame-a">blå A</span> og <span className="egb-week-frame-b">lilla B</span> konsekvent. Bokstavene avgjør hvilken ramme vi mener.</p></div>
          </div>}
          <StudyTopicText body={topic.body}>
            {topic.slug === "linear-algebra-for-robotics" && <div className="egb-pilot-prose"><h3>Følg ett rad–kolonne-produkt</h3><p>Q15 fra warmupen knytter fire skalarprodukter til én matrise. Velg et resultatelement og følg rad A og kolonne B.</p><WeekOneMatrixExplorer /></div>}
            {topic.slug === "rotation-composition-in-3d" && <><span id="laboratorium" className="egb-week-anchor" /><SpatialRotationExample /></>}
            {topic.slug === "kinematic-chains-and-joints" && <KinematicChainFigure />}
            {topic.slug === "forward-kinematics" && <PlanarKinematicsLesson mode="fk" embedded />}
            {topic.slug === "inverse-kinematics" && <PlanarKinematicsLesson mode="ik" embedded />}
            {topic.slug === "optimization-based-inverse-kinematics" && <UnreachableOptimizationExample />}
            {topic.slug === "robot-jacobian" && <JacobianExample />}
            {topic.slug === "robot-motion-interpolation" && <MotionComparison />}
            {topic.slug === "trapezoidal-motion-profiles" && <MotionProfileExample />}
            {topic.slug === "point-to-segment-distance-and-obstacle-clearance" && <div className="egb-pilot-prose"><Egb339ProblemVisual kind="point-segment" /><p>Projeksjonen C kan ligge utenfor segmentet. Da er nærmeste endepunkt løsningen. For en lenke med null lengde beregnes avstanden direkte til endepunktet.</p></div>}
            {topic.slug === "digital-image-representation" && <><HighwayFigure /><ImageArrayExample /></>}
            {topic.slug === "image-histograms-and-thresholding" && <HistogramFigure />}
            {topic.slug === "monadic-and-dyadic-image-operations" && <ImageSubtractionFigure />}
            {topic.slug === "planar-homographies" && <HomographyExample />}
          </StudyTopicText>
          {topic.slug === "se-3-homogeneous-transformations" && <div className="egb-week-figure-explanation">
            <StudyFigure src="/egb339/study-figures/rtb-transforms3d.png" width={640} height={480} alt="Tre tredimensjonale koordinatrammer A, B og C tegnet med Robotics Toolbox." source="Robotics Toolbox, transforms3d.png (MIT)" sourceHref="/egb339/study-figures/robotics-toolbox-LICENSE.txt">En pose har både et origo og tre basisretninger. Originalfigurens aksefarger er ikke statusmarkeringer.</StudyFigure>
            <div><h3>Tre kolonner og ett origo</h3><p>Rotasjonsblokken angir de tre aksene. Siste kolonne angir origoets posisjon i referanserammen. Begge må tolkes i samme referanse før et punkt transformeres.</p><p>Rammene i denne dokumentasjonsfiguren er illustrasjoner. Bruk oppgitte QUT-transformasjoner når du løser tutorialen.</p></div>
          </div>}
        </>}
        <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={`egb339/tema/${topic.slug}`} /></div>
      </section>)}
      <section id="practical" data-egb-week-section className="egb-pilot-prose">
        <span id="ukeinnhold" className="egb-week-anchor" />
        <h2>Practical og fagkilder</h2>
        <p>{learning.practical}</p>
        {number === 4 && <><Egb339Markdown content={getEgb339Resource("coppeliasim-forward-kinematics-practical")!.body} headingOffset={1} studyLinks /><p className="egb-week-notice" data-state="warning">Practical-modellen bruker L₀ = 138, L₁ = 135, L₂ = 147, L₃ = 60 og L₄ = 80 mm. Assessment 1.3 har andre verktøyparametere. Ikke bland modellene.</p><p><Link href="/egb339/ressurser/coppeliasim-setup">CoppeliaSim: installasjon og tilkobling</Link></p></>}
        {number === 6 && <p className="egb-week-notice" data-state="warning">Kildeavvik: forelesningsfilen Lecture Week 6-1.py har cos(θ₁) i både x- og y-raden. Tavlen viser sin(θ₁) i y-raden. Bruk den geometrisk riktige FK-modellen før SymPy deriverer; automatisk derivasjon retter ikke en feil inputmodell.</p>}
        <ul className="egb-week-sources">
          {learning.sources.map((source) => <li key={source}>{source}</li>)}
        </ul>
        <p><Link href="/egb339/ressurser">Praktiske ressurser og verktøy</Link></p>
      </section>
      <div className="egb-pilot-prose">
        <Egb339WeekProblems week={number} problems={getEgb339ProblemsForWeek(number)} longForm />
      </div>
      <StudyWeekAssessments week={week} />
      <footer className="egb-pilot-prose egb-week-finish">
        <h2>Fullfør Week {number}</h2>
        <p>Ukens merke er separat fra temaer og assessments. Marker når du har gjennomgått stoffet og kontrollert oppgavene du arbeider med.</p>
        <Egb339PilotProgress pageKey={week.pageKey} />
        <PilotEntryNav previous={weeks.find((row) => row.week === number - 1) ?? null} next={weeks.find((row) => row.week === number + 1) ?? null} />
      </footer>
    </article>
  </>;
}
