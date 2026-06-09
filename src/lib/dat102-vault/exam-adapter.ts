// Server-side adapter for the DAT102 exam + oblig pages.
// Enriches the index/oblig JSON with human topic/concept labels and aggregate
// status counts. No new source data — only re-shaping of existing vault JSON.

import {
  getAllConcepts,
  getAllExamSlugs,
  getAllTopics,
  getExamBySlug,
  getExamSummaries,
  getObliger,
} from "./loader";
import type {
  DAT102ExamIndexEntry,
  DAT102Oblig,
  ExamItemStatus,
  SourceRef,
} from "./types";

function stripPrefix(raw: string): string {
  return raw.replace(/^(Topic|Concept):\s*/i, "").trim();
}

const topicLabelBySlug = new Map(
  getAllTopics().map((t) => [t.slug, stripPrefix(t.title)])
);
const conceptLabelBySlug = new Map(
  getAllConcepts().map((c) => [c.slug, stripPrefix(c.title)])
);

export function topicLabel(slug: string): string {
  return topicLabelBySlug.get(slug) ?? slug;
}
export function conceptLabel(slug: string): string {
  return conceptLabelBySlug.get(slug) ?? slug;
}

// Kanonisk temarekkefølge (matcher /dat102/temaer) for stabil sortering.
const TOPIC_ORDER = getAllTopics().map((t) => t.slug);
function orderTopics(slugs: string[]): string[] {
  return [...new Set(slugs)].sort((a, b) => {
    const ai = TOPIC_ORDER.indexOf(a);
    const bi = TOPIC_ORDER.indexOf(b);
    return (ai === -1 ? 1e9 : ai) - (bi === -1 ? 1e9 : bi);
  });
}

// ---- exam overview ----------------------------------------------------------

export interface ExamCardData extends DAT102ExamIndexEntry {
  topics: { slug: string; label: string }[];
}

export interface ExamOverviewData {
  exams: ExamCardData[];
  totals: {
    examCount: number;
    questionCount: number;
    subquestionCount: number;
    completeExams: number;
    partialExams: number;
    subqStatus: Record<ExamItemStatus, number>;
  };
}

export function getExamOverviewData(): ExamOverviewData {
  const summaries = getExamSummaries();
  const subqStatus: Record<ExamItemStatus, number> = {
    complete: 0,
    partial: 0,
    scanned_only: 0,
    missing_solution: 0,
  };
  let questionCount = 0;
  let subquestionCount = 0;
  let completeExams = 0;
  let partialExams = 0;

  const exams: ExamCardData[] = summaries.map((s) => {
    questionCount += s.questionCount;
    subquestionCount += s.subquestionCount;
    if (s.status === "complete") completeExams += 1;
    else partialExams += 1;
    for (const k of Object.keys(subqStatus) as ExamItemStatus[]) {
      subqStatus[k] += s.statusCounts[k] ?? 0;
    }
    // distinct topics from the full exam
    const exam = getExamBySlug(s.slug);
    const topicSlugs = orderTopics(exam ? exam.questions.map((q) => q.topic) : []);
    return {
      ...s,
      topics: topicSlugs.map((slug) => ({ slug, label: topicLabel(slug) })),
    };
  });

  return {
    exams,
    totals: {
      examCount: summaries.length,
      questionCount,
      subquestionCount,
      completeExams,
      partialExams,
      subqStatus,
    },
  };
}

export function getAllExamSlugsList(): string[] {
  return getAllExamSlugs();
}

// ---- obliger ----------------------------------------------------------------

export interface ObligView extends DAT102Oblig {
  topics: { slug: string; label: string }[];
  concepts: { slug: string; label: string }[];
  // buildsOn dedupet på label+pages (datasettet har enkelte duplikater).
  sources: SourceRef[];
}

function dedupeSources(refs: SourceRef[]): SourceRef[] {
  const seen = new Set<string>();
  const out: SourceRef[] = [];
  for (const r of refs) {
    const key = `${r.label}|${r.pages ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

export function getObligerView(): ObligView[] {
  return getObliger().map((o) => ({
    ...o,
    topics: orderTopics(o.topicSlugs).map((slug) => ({ slug, label: topicLabel(slug) })),
    concepts: o.conceptSlugs.map((slug) => ({ slug, label: conceptLabel(slug) })),
    sources: dedupeSources(o.buildsOn),
  }));
}
