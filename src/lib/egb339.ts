import type { Egb339Entry, Egb339Track } from "./egb339-vault/types";

export const EGB339_TRACKS: Array<{
  id: Egb339Track;
  label: string;
  description: string;
  accent: string;
  surface: string;
}> = [
  {
    id: "foundations",
    label: "Verktøy og grunnlag",
    description: "Python, NumPy, lineær algebra og autograder-strategi.",
    accent: "text-sky-700 dark:text-sky-300",
    surface: "border-sky-300/60 bg-sky-50/60 dark:border-sky-800 dark:bg-sky-950/25",
  },
  {
    id: "kinematics",
    label: "Pose og kinematikk",
    description: "Rammer, transformasjoner, FK, IK og Jacobianer.",
    accent: "text-robotics-700 dark:text-robotics-300",
    surface:
      "border-robotics-300/60 bg-robotics-50/70 dark:border-robotics-800 dark:bg-robotics-950/30",
  },
  {
    id: "motion",
    label: "Bevegelsesplanlegging",
    description: "Interpolasjon, hastighetsprofiler og kollisjonsmargin.",
    accent: "text-amber-700 dark:text-amber-300",
    surface:
      "border-amber-300/60 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/25",
  },
  {
    id: "vision",
    label: "Robot vision",
    description: "Bilder, segmentering, farge, form og homografier.",
    accent: "text-fuchsia-700 dark:text-fuchsia-300",
    surface:
      "border-fuchsia-300/60 bg-fuchsia-50/60 dark:border-fuchsia-800 dark:bg-fuchsia-950/25",
  },
];

const WEEK_TITLES: Record<string, string> = {
  "uke-1": "Emneintroduksjon og kinematisk tankegang",
  "uke-2": "Lineær algebra og 2D-pose",
  "uke-3": "NumPy og 3D-pose",
  "uke-4": "Forward kinematics",
  "uke-5": "Inverse kinematics",
  "uke-6": "Robotens Jacobian",
  "uke-7": "Bevegelsesplanlegging",
  "uke-8": "Bilder og bildebehandling",
};

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
  return WEEK_SUMMARIES[entry.slug] ?? entry.summary;
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
