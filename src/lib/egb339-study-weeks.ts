import { EGB339_COURSE_ORDER, type Egb339CourseWeek } from "./egb339-course";
import { WEEK_ONE_SECTIONS, WEEK_ONE_SECTION_TITLES } from "./egb339-week-one";
import { egb339Title } from "./egb339-titles";

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

const shortTitlesEn: Record<string, string> = {
  "linear-algebra-for-robotics": "Linear algebra", "reference-frames": "Frames",
  "so-2-rotation-matrices": "SO(2)", "se-2-homogeneous-transformations": "SE(2)",
  "numpy-arrays-and-matrix-operations": "NumPy", "so-3-rotation-matrices": "SO(3)",
  "rotation-composition-in-3d": "Rotation order", "se-3-homogeneous-transformations": "SE(3)", "pose-graphs": "Pose graphs",
  "kinematic-chains-and-joints": "Joints and links", "forward-kinematics": "Forward kinematics", "joint-angle-mapping": "Joint mapping",
  "atan2-and-inverse-trigonometry": "atan2", "inverse-kinematics": "Inverse kinematics",
  "robot-workspace-and-ik-solution-branches": "Workspace and branches", "optimization-based-inverse-kinematics": "Numerical IK",
  "partial-derivatives-for-robotics": "Partial derivatives", "robot-jacobian": "Jacobian", "differential-kinematics-and-local-linearisation": "Linearisation",
  "robot-motion-interpolation": "Paths", "trapezoidal-motion-profiles": "Velocity profiles", "point-to-segment-distance-and-obstacle-clearance": "Clearance",
  "digital-image-representation": "Pixels", "image-histograms-and-thresholding": "Histogram and threshold",
  "monadic-and-dyadic-image-operations": "Image operations", "colour-normalization-and-chromaticity": "Colour",
  "shape-descriptors-from-area-and-perimeter": "Shape", "planar-homographies": "Homography", "image-representation-and-processing": "From image to robot",
};

const FIXED_SECTIONS = [
  { id: "practical", no: "Practical og fagkilder", en: "Practical and sources", shortNo: "Practical", shortEn: "Practical" },
  { id: "oppgaver", no: "Oppgaver og løsninger", en: "Exercises and solutions", shortNo: "Oppgaver", shortEn: "Exercises" },
  { id: "vurderinger", no: "Assessments", en: "Assessments", shortNo: "Assessment", shortEn: "Assessment" },
] as const;

export function egb339WeekSections(week: Egb339CourseWeek, lang: "no" | "en" = "no"): Egb339WeekSection[] {
  if (week.week === 1) return WEEK_ONE_SECTIONS.map((section) => {
    const titles = WEEK_ONE_SECTION_TITLES[section.id];
    return {
      id: section.id,
      title: titles?.[lang] ?? section.title,
      short: titles?.[lang === "no" ? "shortNo" : "shortEn"] ?? section.short,
      ...("pageKey" in section ? { pageKey: section.pageKey } : {}),
    };
  });
  return [
    ...week.topics.map((topic) => {
      const id = topic.href.split("/").at(-1)!;
      const shorts = lang === "en" ? shortTitlesEn : shortTitles;
      return { id, title: egb339Title(id, lang) ?? topic.title, short: shorts[id] ?? egb339Title(id, lang) ?? topic.title, pageKey: topic.pageKey };
    }),
    ...FIXED_SECTIONS.map((section) => ({ id: section.id, title: section[lang], short: section[lang === "no" ? "shortNo" : "shortEn"] })),
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
