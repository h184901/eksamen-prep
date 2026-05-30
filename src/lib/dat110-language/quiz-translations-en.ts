import type { DAT110QuizTranslation } from "@/lib/dat110-vault/types";
import data from "./quiz-translations-en.json";

// Hand-authored English translations for DAT110 quiz questions, keyed by the
// question `id` in quizzes.json. Stored as JSON (not embedded in quizzes.json)
// so it survives `npm run sync:dat110-vault`, which regenerates quizzes.json
// from the vault. Coverage is verified by scripts/validate-quiz-translations.mjs
// (all ids present, option + optionExplanation counts match the base).
//
// optionExplanations is a positional string[] aligned 1:1 with the base
// question's optionExplanations; getLocalizedQuizQuestion rebuilds the full
// objects, taking optionIndex/isCorrect from the base.
export const QUIZ_EN: Record<string, DAT110QuizTranslation> =
  data as Record<string, DAT110QuizTranslation>;
