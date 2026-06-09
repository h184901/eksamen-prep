// Client-safe types for the DAT102 øving (practice) runners.
// Only type-only imports from the vault types (erased at build) — no loader/fs,
// so these are safe to import into "use client" components.

import type {
  DAT102Drill,
  DAT102Flashcard,
  DAT102MatchingPair,
  DAT102QuizQuestion,
} from "@/lib/dat102-vault/types";

// A filter option: machine value + human label + how many items carry it.
export interface Facet {
  value: string;
  label: string;
  count: number;
}

// Items are enriched with their topic's display label on the server so the
// runners never need the (fs-backed) loader.
export type WithTopicLabel<T> = T & { topicLabel: string };

export type OvingQuiz = WithTopicLabel<DAT102QuizQuestion>;
export type OvingFlashcard = WithTopicLabel<DAT102Flashcard>;
export type OvingMatch = WithTopicLabel<DAT102MatchingPair>;
export type OvingDrill = WithTopicLabel<DAT102Drill>;

export interface QuizDataset {
  items: OvingQuiz[];
  topicFacets: Facet[];
  typeFacets: Facet[];
  difficultyFacets: Facet[];
}

export interface FlashcardDataset {
  items: OvingFlashcard[];
  topicFacets: Facet[];
}

export interface MatchingDataset {
  items: OvingMatch[];
  topicFacets: Facet[];
  categoryFacets: Facet[];
}

export interface DrillDataset {
  items: OvingDrill[];
  topicFacets: Facet[];
  typeFacets: Facet[];
  difficultyFacets: Facet[];
}

export interface OvingOverview {
  quizCount: number;
  flashcardCount: number;
  matchingCount: number;
  drillCount: number;
  topicsCovered: number;
}

// Local self-grade marks (flashcards/drills) — kept in component state only.
export type SelfMark = "known" | "review" | null;
