// Type-safe accessors for DAT110 vault data.
// JSON is generated/validated by scripts/sync-dat110-vault.mjs and lives in
// src/data/dat110-vault/.

import conceptsData from "@/data/dat110-vault/concepts-tier1.json";
import topicsData from "@/data/dat110-vault/topics-tier1.json";
import examsIndex from "@/data/dat110-vault/exams-index.json";
import wikilinkIndex from "@/data/dat110-vault/_wikilink-index.json";
import metaData from "@/data/dat110-vault/_meta.json";
import quizzesData from "@/data/dat110-vault/quizzes.json";
import type {
  DAT110Concept,
  DAT110Exam,
  DAT110QuizQuestion,
  DAT110Topic,
  DAT110VaultMeta,
} from "./types";

const concepts = (conceptsData as { concepts: DAT110Concept[] }).concepts;
const topics = (topicsData as { topics: DAT110Topic[] }).topics;
const routes = (wikilinkIndex as { routes: Record<string, string> }).routes;
const meta = metaData as DAT110VaultMeta;
const quizzes = (
  quizzesData as unknown as { questions: DAT110QuizQuestion[] }
).questions;

export function getAllQuizQuestions(): DAT110QuizQuestion[] {
  return quizzes;
}

// Exams are loaded lazily per slug to avoid bundling all exam JSONs into every
// page. Each exam JSON is ~30-40 KB, so we read it from src/data/dat110-vault/exams/
// at server-component time.
const examsList = (examsIndex as {
  exams: Array<{
    slug: string;
    year: number;
    session: string;
    displayLabel: string;
    pairStatus: string;
    reconstructedFromSensor: boolean;
    questionCount: number;
    totalWeight: number;
  }>;
}).exams;

export function getAllConceptSlugs(): string[] {
  return concepts.map((c) => c.slug);
}

export function getAllTopicSlugs(): string[] {
  return topics.map((t) => t.slug);
}

export function getAllExamSlugs(): string[] {
  return examsList.map((e) => e.slug);
}

export function getExamSummaries() {
  return examsList;
}

export function getConceptBySlug(slug: string): DAT110Concept | null {
  return concepts.find((c) => c.slug === slug) ?? null;
}

export function getTopicBySlug(slug: string): DAT110Topic | null {
  return topics.find((t) => t.slug === slug) ?? null;
}

// Sync server-side import for exam JSON. Slug is validated against the index
// to keep dynamic-import scope tight.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function getExamBySlug(slug: string): DAT110Exam | null {
  if (!examsList.some((e) => e.slug === slug)) return null;
  const path = join(
    process.cwd(),
    "src",
    "data",
    "dat110-vault",
    "exams",
    `${slug}.json`
  );
  try {
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw) as DAT110Exam;
  } catch {
    return null;
  }
}

export function getMeta(): DAT110VaultMeta {
  return meta;
}

export function resolveWikilinkRoute(target: string): string | null {
  return routes[target] ?? null;
}
