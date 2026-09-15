import { EGB339_COURSE_ORDER, type Egb339CourseWeek } from "./egb339-course";
import { WEEK_ONE_SECTIONS } from "./egb339-week-one";

export interface Egb339WeekSection { id: string; title: string; short: string; pageKey?: string }

const shortTitles: Record<string, string> = {
  "linear-algebra-for-robotics": "Lineær algebra", "reference-frames": "Rammer",
  "so-2-rotation-matrices": "SO(2)", "se-2-homogeneous-transformations": "SE(2)",
  "numpy-arrays-and-matrix-operations": "NumPy", "so-3-rotation-matrices": "SO(3)",
  "rotation-composition-in-3d": "Rotasjonsorden", "se-3-homogeneous-transformations": "SE(3)", "pose-graphs": "Posegrafer",
  "kinematic-chains-and-joints": "Ledd og lenker", "forward-kinematics": "Forward kinematics", "joint-angle-mapping": "Leddmapping",
  "atan2-and-inverse-trigonometry": "atan2", "inverse-kinematics": "Inverse kinematics",
  "robot-workspace-and-ik-solution-branches": "Arbeidsrom og grener", "optimization-based-inverse-kinematics": "Numerisk IK",
  "partial-derivatives-for-robotics": "Partiellderivasjon", "robot-jacobian": "Jacobian", "differential-kinematics-and-local-linearisation": "Linearisering",
  "robot-motion-interpolation": "Baner", "trapezoidal-motion-profiles": "Hastighetsprofiler", "point-to-segment-distance-and-obstacle-clearance": "Klaring",
  "digital-image-representation": "Piksler", "image-histograms-and-thresholding": "Histogram og terskel",
  "monadic-and-dyadic-image-operations": "Bildeoperasjoner", "colour-normalization-and-chromaticity": "Farge",
  "shape-descriptors-from-area-and-perimeter": "Form", "planar-homographies": "Homografi", "image-representation-and-processing": "Fra bilde til robot",
};

export function egb339WeekSections(week: Egb339CourseWeek): Egb339WeekSection[] {
  if (week.week === 1) return [...WEEK_ONE_SECTIONS];
  return [
    ...week.topics.map((topic) => {
      const id = topic.href.split("/").at(-1)!;
      return { id, title: topic.title, short: shortTitles[id] ?? topic.title, pageKey: topic.pageKey };
    }),
    { id: "practical", title: "Practical og fagkilder", short: "Practical" },
    { id: "oppgaver", title: "Oppgaver og løsninger", short: "Oppgaver" },
    { id: "vurderinger", title: "Assessments", short: "Assessment" },
  ];
}

/** Only canonical topic URLs are remapped. Existing topic fragments remain valid. */
export function egb339StudyHref(href: string): string {
  const match = href.match(/^\/egb339\/temaer\/([^/#?]+)$/);
  if (!match) return href;
  const slug = match[1];
  const week = EGB339_COURSE_ORDER.find((row) => (row.topics as readonly string[]).includes(slug));
  if (!week) return href;
  const anchor = week.week === 1 ? WEEK_ONE_SECTIONS.find((section) => "pageKey" in section && section.pageKey === `egb339/tema/${slug}`)?.id : slug;
  return anchor ? `/egb339/uker/uke-${week.week}#${anchor}` : href;
}

export function egb339AssessmentAnchor(slug: string) { return `assessment-${slug.replace(/^assessment-/, "")}`; }
