// Type-safe accessors for DAT102 vault data.
// JSON is generated/validated by scripts/sync-dat102-vault.mjs and lives in
// src/data/dat102-vault/. Mirrors src/lib/dat110-vault/loader.ts.
//
// Phase 0: no routes/UI consume this yet; it exists so the data contract is
// compiled and type-checked from day one.

import conceptsData from "@/data/dat102-vault/concepts.json";
import topicsData from "@/data/dat102-vault/topics.json";
import syllabusData from "@/data/dat102-vault/syllabus.json";
import obligerData from "@/data/dat102-vault/obliger.json";
import quizzesData from "@/data/dat102-vault/quizzes.json";
import flashcardsData from "@/data/dat102-vault/flashcards.json";
import matchingData from "@/data/dat102-vault/matching.json";
import drillsData from "@/data/dat102-vault/drills.json";
import examPatternsData from "@/data/dat102-vault/exam-patterns.json";
import examsIndexData from "@/data/dat102-vault/exams-index.json";
import wikilinkIndexData from "@/data/dat102-vault/_wikilink-index.json";
import metaData from "@/data/dat102-vault/_meta.json";

import { readFileSync } from "node:fs";
import { join } from "node:path";

import type {
  DAT102Concept,
  DAT102Drill,
  DAT102Exam,
  DAT102ExamIndexEntry,
  DAT102ExamPattern,
  DAT102Flashcard,
  DAT102MatchingPair,
  DAT102Oblig,
  DAT102QuizQuestion,
  DAT102Syllabus,
  DAT102Topic,
  DAT102VaultMeta,
  DAT102WikilinkIndex,
} from "./types";

const concepts = (conceptsData as { concepts: DAT102Concept[] }).concepts;
const topics = (topicsData as { topics: DAT102Topic[] }).topics;
const syllabus = syllabusData as DAT102Syllabus;
const obliger = (obligerData as { obliger: DAT102Oblig[] }).obliger;
const quizzes = (quizzesData as unknown as { questions: DAT102QuizQuestion[] })
  .questions;
const flashcards = (flashcardsData as unknown as { cards: DAT102Flashcard[] })
  .cards;
const matching = (matchingData as unknown as { pairs: DAT102MatchingPair[] })
  .pairs;
const drills = (drillsData as unknown as { drills: DAT102Drill[] }).drills;
const examPatterns = (examPatternsData as { patterns: DAT102ExamPattern[] })
  .patterns;
const examsIndex = (examsIndexData as { exams: DAT102ExamIndexEntry[] }).exams;
const wikilinkIndex = wikilinkIndexData as DAT102WikilinkIndex;
const meta = metaData as DAT102VaultMeta;

export function getAllConcepts(): DAT102Concept[] {
  return concepts;
}

export function getConceptBySlug(slug: string): DAT102Concept | null {
  return concepts.find((c) => c.slug === slug) ?? null;
}

export function getAllTopics(): DAT102Topic[] {
  return topics;
}

export function getTopicBySlug(slug: string): DAT102Topic | null {
  return topics.find((t) => t.slug === slug) ?? null;
}

export function getSyllabus(): DAT102Syllabus {
  return syllabus;
}

export function getObliger(): DAT102Oblig[] {
  return obliger;
}

export function getAllQuizQuestions(): DAT102QuizQuestion[] {
  return quizzes;
}

export function getAllFlashcards(): DAT102Flashcard[] {
  return flashcards;
}

export function getAllMatchingPairs(): DAT102MatchingPair[] {
  return matching;
}

export function getAllDrills(): DAT102Drill[] {
  return drills;
}

export function getExamPatterns(): DAT102ExamPattern[] {
  return examPatterns;
}

export function getExamSummaries(): DAT102ExamIndexEntry[] {
  return examsIndex;
}

export function getAllExamSlugs(): string[] {
  return examsIndex.map((e) => e.slug);
}

// Exams are loaded lazily per slug to avoid bundling all exam JSONs into every
// page (same pattern as dat110-vault). Slug is validated against the index.
export function getExamBySlug(slug: string): DAT102Exam | null {
  if (!examsIndex.some((e) => e.slug === slug)) return null;
  const path = join(
    process.cwd(),
    "src",
    "data",
    "dat102-vault",
    "exams",
    `${slug}.json`
  );
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as DAT102Exam;
  } catch {
    return null;
  }
}

export function getMeta(): DAT102VaultMeta {
  return meta;
}

export function getWikilinkIndex(): DAT102WikilinkIndex {
  return wikilinkIndex;
}

export function resolveWikilinkRoute(target: string): string | null {
  return wikilinkIndex.routes[target] ?? null;
}
