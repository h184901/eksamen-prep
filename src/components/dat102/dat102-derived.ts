// Deriverte visnings-data for DAT102-sidene: semesterrekkefølge på temaer,
// tellinger per tema/begrep og tema↔forelesning-kobling. Alt beregnes én gang
// ved modul-init fra Phase 0-dataene (server-only — loader leser fra disk).

import {
  getAllConcepts,
  getAllDrills,
  getAllExamSlugs,
  getAllFlashcards,
  getAllMatchingPairs,
  getAllQuizQuestions,
  getAllTopics,
  getExamBySlug,
  getObliger,
  getSyllabus,
} from "@/lib/dat102-vault/loader";
import type { DAT102Concept, DAT102Topic } from "@/lib/dat102-vault/types";
import { displayTitle } from "./md-utils";

export interface TopicLectureRef {
  code: string;
  anchor: string;
}

export interface TopicStats {
  conceptCount: number;
  quizCount: number;
  flashcardCount: number;
  drillCount: number;
  matchingCount: number;
  obligCount: number;
  examSubqCount: number;
  lectureRefs: TopicLectureRef[];
  chapters: string[];
}

const topics = getAllTopics();
const concepts = getAllConcepts();
const syllabus = getSyllabus();

// Semesterrekkefølge: temaets første forekomst i forelesningsrekka.
const firstLectureIndex = new Map<string, number>();
syllabus.lectures.forEach((lec, i) => {
  for (const slug of lec.topicSlugs) {
    if (!firstLectureIndex.has(slug)) firstLectureIndex.set(slug, i);
  }
});

const ordered = topics.slice().sort((a, b) => {
  const ai = firstLectureIndex.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
  const bi = firstLectureIndex.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
  if (ai !== bi) return ai - bi;
  return displayTitle(a.title).localeCompare(displayTitle(b.title), "nb");
});

export function getOrderedTopics(): DAT102Topic[] {
  return ordered;
}

const topicTitleBySlug = new Map(
  topics.map((t) => [t.slug, displayTitle(t.title)])
);

export function topicTitle(slug: string): string {
  return topicTitleBySlug.get(slug) ?? slug;
}

// Begrepets primær-tema (første relaterte tema); brukes til gruppering.
export function primaryTopicSlug(c: DAT102Concept): string | null {
  return c.relatedTopics[0]?.slug ?? null;
}

function buildTopicStats(): Map<string, TopicStats> {
  const stats = new Map<string, TopicStats>();
  const get = (slug: string): TopicStats => {
    let s = stats.get(slug);
    if (!s) {
      s = {
        conceptCount: 0,
        quizCount: 0,
        flashcardCount: 0,
        drillCount: 0,
        matchingCount: 0,
        obligCount: 0,
        examSubqCount: 0,
        lectureRefs: [],
        chapters: [],
      };
      stats.set(slug, s);
    }
    return s;
  };

  // Begreper per tema: union av temaets kuraterte relatedConcepts og
  // begrepenes egne relatedTopics-tilbakekoblinger.
  const conceptSlugsByTopic = new Map<string, Set<string>>();
  for (const t of topics) {
    const set = new Set<string>(t.relatedConcepts.map((c) => c.slug));
    conceptSlugsByTopic.set(t.slug, set);
  }
  for (const c of concepts) {
    for (const rt of c.relatedTopics) {
      conceptSlugsByTopic.get(rt.slug)?.add(c.slug);
    }
  }
  for (const [slug, set] of conceptSlugsByTopic) {
    get(slug).conceptCount = set.size;
  }

  for (const q of getAllQuizQuestions()) get(q.topic).quizCount++;
  for (const f of getAllFlashcards()) get(f.topic).flashcardCount++;
  for (const d of getAllDrills()) get(d.topic).drillCount++;
  for (const p of getAllMatchingPairs()) get(p.topic).matchingCount++;
  for (const o of getObliger()) {
    for (const slug of o.topicSlugs) get(slug).obligCount++;
  }
  for (const examSlug of getAllExamSlugs()) {
    const exam = getExamBySlug(examSlug);
    if (!exam) continue;
    for (const q of exam.questions) {
      get(q.topic).examSubqCount += q.subquestions.length;
    }
  }

  for (const lec of syllabus.lectures) {
    if (lec.code === "—") continue;
    for (const slug of lec.topicSlugs) {
      const s = get(slug);
      s.lectureRefs.push({ code: lec.code, anchor: lec.anchor });
      if (lec.chapters && !s.chapters.includes(lec.chapters)) {
        s.chapters.push(lec.chapters);
      }
    }
  }

  return stats;
}

const topicStats = buildTopicStats();

export function getTopicStats(slug: string): TopicStats {
  return (
    topicStats.get(slug) ?? {
      conceptCount: 0,
      quizCount: 0,
      flashcardCount: 0,
      drillCount: 0,
      matchingCount: 0,
      obligCount: 0,
      examSubqCount: 0,
      lectureRefs: [],
      chapters: [],
    }
  );
}

// Tellinger for ett begrep (brukes i "øving kommer"-panelet på begrepssider).
export function conceptPracticeCounts(slug: string): {
  quizCount: number;
  drillCount: number;
  flashcardCount: number;
} {
  return {
    quizCount: getAllQuizQuestions().filter((q) =>
      q.conceptSlugs.includes(slug)
    ).length,
    drillCount: getAllDrills().filter((d) => d.conceptSlugs.includes(slug))
      .length,
    flashcardCount: getAllFlashcards().filter((f) =>
      f.conceptSlugs.includes(slug)
    ).length,
  };
}
