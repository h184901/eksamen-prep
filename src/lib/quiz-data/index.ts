/**
 * Aggregator for ALLE quiz-spørsmål.
 * Importeres av QuizRunner for å vise spørsmål.
 */

import type { QuizQuestion } from "@/lib/quiz-types";
import { EXAM_QUESTIONS } from "./exam-extracted";
import { GENERATED_QUESTIONS } from "./generated";

export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...EXAM_QUESTIONS,
  ...GENERATED_QUESTIONS,
];

export { EXAM_QUESTIONS, GENERATED_QUESTIONS };
