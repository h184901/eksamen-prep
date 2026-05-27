// Local types for regneøving (calculation drills). Kept LOCAL to this feature
// per agent boundary — vault-types.ts is owned by another agent.
// Mirrors shape of src/data/dat110-vault/calculation-drills.json.

import type { VaultTema } from "@/lib/dat110-vault/types";

export type CalculationDifficulty = "easy" | "medium" | "hard";

export interface CalculationLearnMoreLink {
  label: string;
  href: string;
  kind: "concept" | "topic" | "exam-pattern" | "eksamen";
  slug: string;
}

export interface CalculationDrill {
  id: string;
  topic: VaultTema;
  title: string;
  difficulty: CalculationDifficulty;
  prompt: string;
  expectedSteps: string[];
  finalAnswer: string;
  learnMoreLinks: CalculationLearnMoreLink[];
  figureNote?: string;
}

export interface CalculationDrillsDataset {
  _doc?: string;
  drills: CalculationDrill[];
}

export const DIFFICULTY_ORDER: Record<CalculationDifficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

export const DIFFICULTY_LABEL: Record<CalculationDifficulty, string> = {
  easy: "Lett",
  medium: "Middels",
  hard: "Vanskelig",
};

// Tailwind classes (static strings — JIT-friendly).
export const DIFFICULTY_PILL: Record<CalculationDifficulty, string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  medium:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  hard: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};
