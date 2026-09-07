import weeksData from "@/data/egb339-vault/weeks.json";
import conceptsData from "@/data/egb339-vault/concepts.json";
import assessmentsData from "@/data/egb339-vault/assessments.json";
import resourcesData from "@/data/egb339-vault/resources.json";
import metaData from "@/data/egb339-vault/_meta.json";
import type { Egb339Entry, Egb339Meta, Egb339Track } from "./types";

const weeks = (weeksData as { weeks: Egb339Entry[] }).weeks;
const concepts = (conceptsData as { concepts: Egb339Entry[] }).concepts;
const assessments = (assessmentsData as { assessments: Egb339Entry[] }).assessments;
const resources = (resourcesData as { resources: Egb339Entry[] }).resources;
const meta = metaData as Egb339Meta;

export function getEgb339Weeks(): Egb339Entry[] {
  return weeks;
}

export function getEgb339Week(slug: string): Egb339Entry | null {
  return weeks.find((entry) => entry.slug === slug) ?? null;
}

export function getEgb339Concepts(): Egb339Entry[] {
  return concepts;
}

export function getEgb339Concept(slug: string): Egb339Entry | null {
  return concepts.find((entry) => entry.slug === slug) ?? null;
}

export function getEgb339ConceptsByTrack(track: Egb339Track): Egb339Entry[] {
  return concepts.filter((entry) => entry.track === track);
}

export function getEgb339Assessments(): Egb339Entry[] {
  return assessments;
}

export function getEgb339Assessment(slug: string): Egb339Entry | null {
  return assessments.find((entry) => entry.slug === slug) ?? null;
}

export function getEgb339Resources(): Egb339Entry[] {
  return resources;
}

export function getEgb339Resource(slug: string): Egb339Entry | null {
  return resources.find((entry) => entry.slug === slug) ?? null;
}

export function getEgb339Meta(): Egb339Meta {
  return meta;
}

export function getAdjacentEgb339Entry(
  entries: Egb339Entry[],
  slug: string,
): { previous: Egb339Entry | null; next: Egb339Entry | null } {
  const index = entries.findIndex((entry) => entry.slug === slug);
  return {
    previous: index > 0 ? entries[index - 1] : null,
    next: index >= 0 && index < entries.length - 1 ? entries[index + 1] : null,
  };
}
