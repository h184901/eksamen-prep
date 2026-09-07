export type Egb339Track = "foundations" | "kinematics" | "motion" | "vision";

export type Egb339EntryKind =
  | "week"
  | "assessment"
  | "resource"
  | "concept"
  | "entity"
  | "topic";

export interface Egb339Entry {
  slug: string;
  title: string;
  kind: Egb339EntryKind;
  route: string;
  week: string;
  updated: string;
  tags: string[];
  track: Egb339Track;
  summary: string;
  sources: string[];
  body: string;
}

export interface Egb339Meta {
  generatedAt: string;
  source: string;
  counts: {
    weeks: number;
    concepts: number;
    assessments: number;
    resources: number;
  };
  latestWeek: number;
  unresolvedLinks: string[];
}
