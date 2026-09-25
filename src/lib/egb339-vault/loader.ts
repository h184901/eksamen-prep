import weeksData from "@/data/egb339-vault/weeks.json";
import conceptsData from "@/data/egb339-vault/concepts.json";
import assessmentsData from "@/data/egb339-vault/assessments.json";
import resourcesData from "@/data/egb339-vault/resources.json";
import metaData from "@/data/egb339-vault/_meta.json";
import enData from "@/data/egb339-vault/en.json";
import nbData from "@/data/egb339-vault/nb.json";
import { EGB339_TITLES } from "../egb339-titles";
import type { Egb339Entry, Egb339Meta, Egb339Track } from "./types";

const meta = metaData as Egb339Meta;

/** English translations and Norwegian text overrides, keyed by slug. */
export interface Egb339EntryTranslation {
  title?: string;
  summary?: string;
  body?: string;
}

const enTranslations = (enData as { translations: Record<string, Egb339EntryTranslation> }).translations;
const nbOverrides = (nbData as { overrides: Record<string, Egb339EntryTranslation> }).overrides;

// Legacy vault links often retain their English target title in otherwise
// Norwegian prose. Replace only title links, not contextual descriptions or URLs.
function localizeInternalTitles(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\((\/egb339\/[^)\s]+)\)/g, (link, label: string, href: string) => {
    const slug = href.split(/[?#]/)[0].split("/").at(-1) ?? "";
    const titles = EGB339_TITLES[slug];
    if (!titles) return link;
    if (href.startsWith("/egb339/uker/") && /^Week\s+\d+\s*[-–]/i.test(label)) {
      const week = label.match(/\d+/)?.[0];
      return `[Uke ${week} – ${titles.no}](${href})`;
    }
    const normalize = (text: string) => text.toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
    return normalize(label) === normalize(titles.en) ? `[${titles.no}](${href})` : link;
  });
}

const withNorwegianText = (entry: Egb339Entry): Egb339Entry => {
  const text = { ...entry, ...nbOverrides[entry.slug] };
  return { ...text, summary: localizeInternalTitles(text.summary), body: localizeInternalTitles(text.body) };
};
const weeks = (weeksData as { weeks: Egb339Entry[] }).weeks.map(withNorwegianText);
const concepts = (conceptsData as { concepts: Egb339Entry[] }).concepts.map(withNorwegianText);
const assessments = (assessmentsData as { assessments: Egb339Entry[] }).assessments.map(withNorwegianText);
const resources = (resourcesData as { resources: Egb339Entry[] }).resources.map(withNorwegianText);

/** English variant of an entry's text fields; undefined fields fall back to the authored Norwegian. */
export function getEgb339En(slug: string): Egb339EntryTranslation | null {
  return enTranslations[slug] ?? null;
}

/** Norwegian title override for entries whose authored title is English. */
export function getEgb339NbTitle(slug: string): string | null {
  return nbOverrides[slug]?.title ?? null;
}

/** All slugs that must have English translations (validator coverage source). */
export function getEgb339TranslatableSlugs(): string[] {
  return [...weeks, ...concepts, ...assessments, ...resources].map((entry) => entry.slug);
}


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
