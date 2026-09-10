/** Curated reading order. References existing entries; never owns their content or completion. */
export const EGB339_PILOT = {
  course: "/egb339",
  lesson: "/egb339/temaer/se-2-homogeneous-transformations",
  assessment: "/egb339/vurderinger/assessment-1-1-position-and-orientation-in-2d",
} as const;

export function isEgb339PilotRoute(pathname: string) {
  return Object.values(EGB339_PILOT).some((route) => route === pathname);
}

export const EGB339_COURSE_ORDER = [
  { week: 1, topics: ["python-control-flow-and-collections", "public-and-private-autograder-tests"] },
  { week: 2, topics: ["linear-algebra-for-robotics", "reference-frames", "so-2-rotation-matrices", "se-2-homogeneous-transformations"] },
  { week: 3, topics: ["numpy-arrays-and-matrix-operations", "so-3-rotation-matrices", "rotation-composition-in-3d", "se-3-homogeneous-transformations", "pose-graphs"] },
  { week: 4, topics: ["kinematic-chains-and-joints", "forward-kinematics", "joint-angle-mapping"] },
  { week: 5, topics: ["atan2-and-inverse-trigonometry", "inverse-kinematics", "robot-workspace-and-ik-solution-branches", "optimization-based-inverse-kinematics"] },
  { week: 6, topics: ["partial-derivatives-for-robotics", "robot-jacobian", "differential-kinematics-and-local-linearisation"] },
  { week: 7, topics: ["robot-motion-interpolation", "trapezoidal-motion-profiles", "point-to-segment-distance-and-obstacle-clearance"] },
  { week: 8, topics: ["digital-image-representation", "image-histograms-and-thresholding", "monadic-and-dyadic-image-operations", "colour-normalization-and-chromaticity", "shape-descriptors-from-area-and-perimeter", "planar-homographies", "image-representation-and-processing"] },
] as const;

// Still reachable through the topic index; not extra steps in the week 1–8 learning path.
export const EGB339_REFERENCE_TOPICS = [
  "coppeliasim", "dobot-magician", "position-orientation-and-robot-kinematics",
  "egb339-weeks-1-8-robotics-and-vision-foundations", "keyboard-coordinate-mapping-and-safe-key-presses",
] as const;
export const EGB339_ARCHIVED_TOPICS = [
  "egb339-weeks-1-5-robotics-foundations", "egb339-weeks-1-6-robotics-foundations",
] as const;

export interface Egb339CourseLink {
  href: string;
  title: string;
  pageKey: string;
}
export interface Egb339CourseWeek extends Egb339CourseLink {
  week: number;
  topics: Egb339CourseLink[];
  assessments: Egb339CourseLink[];
}

export function egb339LessonNeighbours(slug: string) {
  const order: readonly string[] = EGB339_COURSE_ORDER.flatMap((week) => [...week.topics]);
  const index = order.indexOf(slug);
  return { previous: index > 0 ? order[index - 1] : null, next: index >= 0 ? order[index + 1] ?? null : null };
}
