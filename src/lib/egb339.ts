import type { Egb339Entry, Egb339Track } from "./egb339-vault/types";

export const EGB339_TRACKS: Array<{
  id: Egb339Track;
  label: string;
  description: string;
  accent: string;
  surface: string;
  interactive: string;
}> = [
  {
    id: "foundations",
    label: "Verktøy og grunnlag",
    description: "Python, NumPy, lineær algebra og autograder-strategi.",
    accent: "text-sky-700 dark:text-sky-300",
    surface: "border-sky-300/60 bg-sky-50/60 dark:border-sky-800 dark:bg-sky-950/25",
    interactive: "hover:border-sky-500 dark:hover:border-sky-400",
  },
  {
    id: "kinematics",
    label: "Pose og kinematikk",
    description: "Rammer, transformasjoner, FK, IK og Jacobianer.",
    accent: "text-robotics-700 dark:text-robotics-300",
    surface:
      "border-robotics-300/60 bg-robotics-50/70 dark:border-robotics-800 dark:bg-robotics-950/30",
    interactive: "hover:border-robotics-500 dark:hover:border-robotics-400",
  },
  {
    id: "motion",
    label: "Bevegelsesplanlegging",
    description: "Interpolasjon, hastighetsprofiler og kollisjonsmargin.",
    accent: "text-amber-700 dark:text-amber-300",
    surface:
      "border-amber-300/60 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/25",
    interactive: "hover:border-amber-500 dark:hover:border-amber-400",
  },
  {
    id: "vision",
    label: "Robot vision",
    description: "Bilder, segmentering, farge, form og homografier.",
    accent: "text-fuchsia-700 dark:text-fuchsia-300",
    surface:
      "border-fuchsia-300/60 bg-fuchsia-50/60 dark:border-fuchsia-800 dark:bg-fuchsia-950/25",
    interactive: "hover:border-fuchsia-500 dark:hover:border-fuchsia-400",
  },
];

/**
 * Single source of truth for the eight course topics. The subject name is the
 * primary label everywhere (sidebar, headings, breadcrumbs, cards); the week
 * number is secondary metadata. Titles follow the QUT source documents.
 */
export interface Egb339WeekSubject {
  week: number;
  slug: string;
  title: string;
  titleEn: string;
  /** Short label for the interactive lab or explorer on the week page. */
  interactive: string;
  interactiveEn: string;
}

export const EGB339_WEEK_SUBJECTS: readonly Egb339WeekSubject[] = [
  { week: 1, slug: "uke-1", title: "Introduksjon til robotikk", titleEn: "Introduction to Robotics", interactive: "Ramme- og matriseutforsker", interactiveEn: "Frame and matrix explorer" },
  { week: 2, slug: "uke-2", title: "Lineær algebra og 2D-pose", titleEn: "Linear Algebra and 2D Pose", interactive: "SE(2)-laboratorium", interactiveEn: "SE(2) lab" },
  { week: 3, slug: "uke-3", title: "NumPy og 3D-pose", titleEn: "NumPy and 3D Pose", interactive: "3D-rotasjonslaboratorium", interactiveEn: "3D rotation lab" },
  { week: 4, slug: "uke-4", title: "Forward kinematics", titleEn: "Forward Kinematics", interactive: "FK-laboratorium", interactiveEn: "FK lab" },
  { week: 5, slug: "uke-5", title: "Inverse kinematics", titleEn: "Inverse Kinematics", interactive: "IK-laboratorium", interactiveEn: "IK lab" },
  { week: 6, slug: "uke-6", title: "Robot Jacobian", titleEn: "Robot Jacobian", interactive: "Jacobian-eksempel", interactiveEn: "Jacobian example" },
  { week: 7, slug: "uke-7", title: "Bevegelsesplanlegging", titleEn: "Motion Planning", interactive: "Banesammenligning", interactiveEn: "Path comparison" },
  { week: 8, slug: "uke-8", title: "Bilder og bildebehandling", titleEn: "Images and Image Processing", interactive: "Bildeeksempler", interactiveEn: "Image examples" },
] as const;

export function egb339WeekSubject(week: number): Egb339WeekSubject | null {
  return EGB339_WEEK_SUBJECTS.find((subject) => subject.week === week) ?? null;
}

export function egb339WeekSubjectTitle(week: number): string {
  return egb339WeekSubject(week)?.title ?? `Uke ${week}`;
}

const WEEK_TITLES: Record<string, string> = Object.fromEntries(
  EGB339_WEEK_SUBJECTS.map((subject) => [subject.slug, subject.title]),
);

const WEEK_SUMMARIES: Record<string, string> = {
  "uke-7":
    "Planlegg både hvor og når roboten beveger seg. Kartesisk interpolasjon gir en rett verktøybane og krever IK i hvert punkt; leddinterpolasjon er enklere, men gir vanligvis en krum bane. Kontroller hastighetsprofil og hindringsavstand langs hele bevegelsen.",
  "uke-8":
    "Behandle bilder som numeriske arrayer. Hold bildekoordinater (u, v) atskilt fra NumPy-indeksering [v, u], bruk histogrammer og terskling til segmentering, og kontroller datatype før bildearitmetikk.",
};

export function egb339DisplayTitle(entry: Egb339Entry): string {
  return WEEK_TITLES[entry.slug] ?? entry.title.replace(/^Week\s+\d+\s*[–-]\s*/i, "");
}

export function egb339DisplaySummary(entry: Egb339Entry): string {
  return (WEEK_SUMMARIES[entry.slug] ?? entry.summary)
    .replace(/^\s*(?:>\s*)?\[![a-z-]+\]\s*/i, "");
}

export function egb339WeekNumber(entry: Egb339Entry): number | null {
  const first = entry.week.match(/\d+/)?.[0];
  return first ? Number(first) : null;
}

export function egb339TrackLabel(track: Egb339Track): string {
  return EGB339_TRACKS.find((item) => item.id === track)?.label ?? track;
}

export function assessmentCode(entry: Egb339Entry): string {
  return entry.title.match(/Assessment\s+([0-9]+(?:\.[0-9]+)?)/i)?.[1] ?? "Oversikt";
}
