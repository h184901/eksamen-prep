import enSolutionsData from "@/data/egb339-vault/en-solutions.json";

/** English translations of the assessment walkthroughs, keyed by assessment slug. */
export interface Egb339AssessmentSolutionEn {
  source?: string;
  scope?: string;
  parts: Record<string, { title: string; content: string }>;
}

const translations = enSolutionsData as Record<string, Egb339AssessmentSolutionEn>;

/** English variant of an assessment walkthrough; undefined fields fall back to Norwegian. */
export function getEgb339AssessmentSolutionEn(slug: string): Egb339AssessmentSolutionEn | null {
  return translations[slug] ?? null;
}

export function getEgb339AssessmentSolutionEnSlugs(): string[] {
  return Object.keys(translations);
}
