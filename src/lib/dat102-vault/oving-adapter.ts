// Server-side adapter: turns the raw dat102-vault question-bank JSON into
// client-ready datasets for the øving (practice) runners.
//
// Responsibilities:
//   - enrich each item with its topic's display label (so client runners never
//     import the fs-backed loader)
//   - compute filter facets (topic / type / difficulty / category) with counts
//   - keep everything plain & serializable for the server→client prop boundary
//
// No new source data is written here — only re-shaping of existing JSON.

import {
  getAllDrills,
  getAllFlashcards,
  getAllMatchingPairs,
  getAllQuizQuestions,
  getAllTopics,
} from "./loader";
import type {
  DrillDataset,
  Facet,
  FlashcardDataset,
  MatchingDataset,
  OvingOverview,
  QuizDataset,
} from "@/components/dat102/oving/oving-types";

// ---- labels ----------------------------------------------------------------

function stripPrefix(raw: string): string {
  return raw.replace(/^(Topic|Concept):\s*/i, "").trim();
}

const topicLabelBySlug = new Map(
  getAllTopics().map((t) => [t.slug, stripPrefix(t.title)])
);
function topicLabel(slug: string): string {
  return topicLabelBySlug.get(slug) ?? slug;
}

const QUIZ_TYPE_LABEL: Record<string, string> = {
  multiple_choice: "Flervalg",
  multiple_select: "Flere riktige",
  true_false: "Sant/usant",
  short_answer_selfcheck: "Selvsjekk",
};

const DRILL_TYPE_LABEL: Record<string, string> = {
  calculation: "Beregning",
  trace: "Tracing",
  code_reading: "Kodelesing",
  short_answer: "Kortsvar",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Lett",
  medium: "Middels",
  hard: "Vanskelig",
};

const CATEGORY_LABEL: Record<string, string> = {
  "term-definition": "Begrep → definisjon",
  "algorithm-complexity": "Algoritme → kompleksitet",
  "adt-operations": "ADT → operasjoner",
  "structure-use": "Struktur → bruk",
};

// ---- facet helpers ---------------------------------------------------------

// Build facets in a stable, label-ordered way. `order` (when given) fixes the
// sequence (e.g. easy→medium→hard); otherwise topic facets follow the
// canonical topic order from the vault.
function facetsFrom<T>(
  items: T[],
  key: (t: T) => string,
  label: (v: string) => string,
  order?: string[]
): Facet[] {
  const counts = new Map<string, number>();
  for (const it of items) {
    const v = key(it);
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const values = [...counts.keys()];
  if (order) {
    values.sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 1e9 : ai) - (bi === -1 ? 1e9 : bi);
    });
  } else {
    values.sort((a, b) => label(a).localeCompare(label(b), "nb"));
  }
  return values.map((v) => ({ value: v, label: label(v), count: counts.get(v)! }));
}

// Topic order = canonical vault topic order (matches /dat102/temaer).
const TOPIC_ORDER = getAllTopics().map((t) => t.slug);
const DIFF_ORDER = ["easy", "medium", "hard"];

function topicFacets<T extends { topic: string }>(items: T[]): Facet[] {
  return facetsFrom(items, (t) => t.topic, topicLabel, TOPIC_ORDER);
}

// ---- datasets --------------------------------------------------------------

export function getQuizDataset(): QuizDataset {
  const items = getAllQuizQuestions().map((q) => ({
    ...q,
    topicLabel: topicLabel(q.topic),
  }));
  return {
    items,
    topicFacets: topicFacets(items),
    typeFacets: facetsFrom(items, (q) => q.qtype, (v) => QUIZ_TYPE_LABEL[v] ?? v),
    difficultyFacets: facetsFrom(
      items,
      (q) => q.difficulty,
      (v) => DIFFICULTY_LABEL[v] ?? v,
      DIFF_ORDER
    ),
  };
}

export function getFlashcardDataset(): FlashcardDataset {
  const items = getAllFlashcards().map((f) => ({
    ...f,
    topicLabel: topicLabel(f.topic),
  }));
  return { items, topicFacets: topicFacets(items) };
}

export function getMatchingDataset(): MatchingDataset {
  const items = getAllMatchingPairs().map((p) => ({
    ...p,
    topicLabel: topicLabel(p.topic),
  }));
  return {
    items,
    topicFacets: topicFacets(items),
    categoryFacets: facetsFrom(
      items,
      (p) => p.category,
      (v) => CATEGORY_LABEL[v] ?? v
    ),
  };
}

export function getDrillDataset(): DrillDataset {
  const items = getAllDrills().map((d) => ({
    ...d,
    topicLabel: topicLabel(d.topic),
  }));
  return {
    items,
    topicFacets: topicFacets(items),
    typeFacets: facetsFrom(items, (d) => d.qtype, (v) => DRILL_TYPE_LABEL[v] ?? v),
    difficultyFacets: facetsFrom(
      items,
      (d) => d.difficulty,
      (v) => DIFFICULTY_LABEL[v] ?? v,
      DIFF_ORDER
    ),
  };
}

export function getOvingOverview(): OvingOverview {
  const quiz = getAllQuizQuestions();
  const cards = getAllFlashcards();
  const pairs = getAllMatchingPairs();
  const drills = getAllDrills();
  const topics = new Set<string>();
  for (const x of [...quiz, ...cards, ...pairs, ...drills]) topics.add(x.topic);
  return {
    quizCount: quiz.length,
    flashcardCount: cards.length,
    matchingCount: pairs.length,
    drillCount: drills.length,
    topicsCovered: topics.size,
  };
}
