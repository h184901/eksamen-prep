import Egb339WeekProblems from "../Egb339WeekProblems";
import Egb339PilotProgress from "../pilot/Egb339PilotProgress";
import { PilotBreadcrumb } from "../pilot/Egb339PilotShell";
import type { PilotNavLink } from "../pilot/PilotNav";
import { SE2LessonContent } from "../pilot/SE2Lesson";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { getEgb339Concept, getEgb339En, getEgb339Resource, getEgb339Week } from "@/lib/egb339-vault/loader";
import { getEgb339ProblemsForWeek } from "@/lib/egb339-problems";
import { getEgb339ProblemEn } from "@/lib/egb339-problems-en";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { getEgb339AssessmentSolutionEn } from "@/lib/egb339-assessment-solutions-en";
import { egb339WeekSections } from "@/lib/egb339-study-weeks";
import { egb339DisplayTitle, egb339WeekSubject } from "@/lib/egb339";
import { egb339Title } from "@/lib/egb339-titles";
import { T } from "../T";
import { StudyWeekJumpNavigation } from "./StudyWeekNavigation";
import StudyWeekAssessments, { type StudyWeekAssessmentData } from "./StudyWeekAssessments";
import StudyWeekHeader from "./StudyWeekHeader";
import StudyWeekPractical from "./StudyWeekPractical";
import StudyWeekFinish from "./StudyWeekFinish";
import { FrameExplanation2d, FrameExplanation3d, PointSegmentNote, MatrixExplorerIntro } from "./StudyWeekProse";
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
  const topics = week.topics.map((topic) => getEgb339Concept(topic.href.split("/").at(-1)!)!);
  const learning = EGB339_WEEK_LEARNING[number];
  const problems = getEgb339ProblemsForWeek(number);
  const problemsEn: Record<string, NonNullable<ReturnType<typeof getEgb339ProblemEn>>> = {};
  for (const problem of problems) {
    const en = getEgb339ProblemEn(problem.id);
    if (en) problemsEn[problem.id] = en;
  }
  const assessments: StudyWeekAssessmentData[] = week.assessments.map((link) => {
    const slug = link.href.split("/").at(-1)!;
    return { slug, href: link.href, pageKey: link.pageKey, entryTitle: link.title, solution: getEgb339AssessmentSolution(slug)!, solutionEn: getEgb339AssessmentSolutionEn(slug) };
  });
  const navLink = (weekNumber: number): PilotNavLink | null => {
    const subject = egb339WeekSubject(weekNumber);
    if (!subject) return null;
    return { href: `/egb339/uker/${subject.slug}`, title: subject.title, titleEn: subject.titleEn, pageKey: `egb339/uke/${subject.slug}` };
  };
  return <>
    <PilotBreadcrumb title={egb339DisplayTitle(entry)} titleEn={egb339WeekSubject(number)?.titleEn} week={number} />
    <article className="egb-pilot-article egb-week-study" data-study-week={number}>
      <StudyWeekHeader number={number} topicCount={week.topics.length} problemCount={problems.length} assessmentCount={week.assessments.length} purpose={learning.purpose} purposeEn={learning.purposeEn} />
      <StudyWeekJumpNavigation sectionsNo={egb339WeekSections(week, "no")} sectionsEn={egb339WeekSections(week, "en")} />
      <span id="leksjoner" className="egb-week-anchor" />
      {topics.map((topic) => <section key={topic.slug} id={topic.slug} data-egb-week-section className="egb-week-topic">
        <h2><T no={egb339Title(topic.slug, "no") ?? topic.title} en={egb339Title(topic.slug, "en") ?? topic.title} /></h2>
        {topic.slug === "se-2-homogeneous-transformations" ? <><span id="laboratorium" className="egb-week-anchor" /><SE2LessonContent embedded /></> : <>
          {topic.slug === "reference-frames" && <FrameExplanation2d />}
          <StudyTopicText no={topic.body} en={getEgb339En(topic.slug)?.body}>
            {topic.slug === "linear-algebra-for-robotics" && <MatrixExplorerIntro />}
            {topic.slug === "rotation-composition-in-3d" && <><span id="laboratorium" className="egb-week-anchor" /><SpatialRotationExample /></>}
            {topic.slug === "kinematic-chains-and-joints" && <KinematicChainFigure />}
            {topic.slug === "forward-kinematics" && <PlanarKinematicsLesson mode="fk" embedded />}
            {topic.slug === "inverse-kinematics" && <PlanarKinematicsLesson mode="ik" embedded />}
            {topic.slug === "optimization-based-inverse-kinematics" && <UnreachableOptimizationExample />}
            {topic.slug === "robot-jacobian" && <JacobianExample />}
            {topic.slug === "robot-motion-interpolation" && <MotionComparison />}
            {topic.slug === "trapezoidal-motion-profiles" && <MotionProfileExample />}
            {topic.slug === "point-to-segment-distance-and-obstacle-clearance" && <div className="egb-pilot-prose"><Egb339ProblemVisual kind="point-segment" /><PointSegmentNote /></div>}
            {topic.slug === "digital-image-representation" && <><HighwayFigure /><ImageArrayExample /></>}
            {topic.slug === "image-histograms-and-thresholding" && <HistogramFigure />}
            {topic.slug === "monadic-and-dyadic-image-operations" && <ImageSubtractionFigure />}
            {topic.slug === "planar-homographies" && <HomographyExample />}
          </StudyTopicText>
          {topic.slug === "se-3-homogeneous-transformations" && <FrameExplanation3d />}
        </>}
        <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={`egb339/tema/${topic.slug}`} /></div>
      </section>)}
      <StudyWeekPractical number={number} learning={learning} resourceNo={number === 4 ? getEgb339Resource("coppeliasim-forward-kinematics-practical")!.body : undefined} resourceEn={number === 4 ? getEgb339En("coppeliasim-forward-kinematics-practical")?.body : undefined} />
      <div className="egb-pilot-prose">
        <Egb339WeekProblems week={number} problems={problems} problemsEn={problemsEn} longForm />
      </div>
      <StudyWeekAssessments week={week} assessments={assessments} />
      <StudyWeekFinish number={number} pageKey={week.pageKey} previous={navLink(number - 1)} next={navLink(number + 1)} />
    </article>
  </>;
}
