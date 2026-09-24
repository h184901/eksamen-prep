import enProblemsData from "@/data/egb339-vault/en-problems.json";
import { getEgb339AssessmentSolutionEn } from "./egb339-assessment-solutions-en";

/** English translations of the weekly problems, keyed by problem id. */
export interface Egb339ProblemEn {
  title?: string;
  prompt?: string;
  solution?: string;
  answer?: string;
}

const translations = enProblemsData as Record<string, Egb339ProblemEn>;

/** The warmup practical problems are synthesized from the warmup walkthrough;
 *  their English variants are synthesized the same way. */
function synthesizedWarmupEn(id: string): Egb339ProblemEn | null {
  const week = id === "w2-prac-warmup" ? 2 : id === "w3-prac-warmup" ? 3 : null;
  if (!week) return null;
  const warmup = getEgb339AssessmentSolutionEn("assessment-1-0-warmup-to-gradescope");
  if (!warmup) return null;
  const parts = Object.entries(warmup.parts);
  const selected = week === 2 ? parts.slice(0, 7) : parts.slice(7);
  return {
    title: week === 2 ? "Practical: Python refresher (warmup Q1–Q7)" : "Practical: NumPy (warmup Q8–Q15)",
    prompt: `The practical refers to ${week === 2 ? "Q1–Q7" : "Q8–Q15"} in [Warmup to Gradescope](/egb339/vurderinger/assessment-1-0-warmup-to-gradescope#losningsforslag). Work through each function, and check both the result and the return type. See the individual part below for the task requirements and the calculation.`,
    solution: `${warmup.scope}\n\n${selected.map(([id, part]) => `## ${part.title}\n\n${part.content}`).join("\n\n")}\n\nSource: ${warmup.source}`,
    answer: `The functions must give the results and return shapes explained for each part. ${week === 2 ? "Q1 and Q4 are missing docstring details, and Q3 has unclear boundary wording" : "Q10 is missing the arithmetic expression from the docstring"}; this cannot be marked as fully QUT-verified without the starter file.`,
  };
}

/** English variant of a problem's text fields; undefined fields fall back to Norwegian. */
export function getEgb339ProblemEn(id: string): Egb339ProblemEn | null {
  return translations[id] ?? synthesizedWarmupEn(id);
}

export function getEgb339ProblemEnIds(): string[] {
  return Object.keys(translations);
}
