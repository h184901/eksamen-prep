import {
  modelleringPages,
  ooaOodPages,
  utviklingsmetodePages,
  oopPages,
} from "@/lib/dat109-subpages";

export const CHAPTER_SECTION_SLUGS = [
  "teori",
  "formler",
  "oppgaver",
  "visualiseringer",
] as const;

// DAT107-totaler regnes direkte i `src/app/dat107/page.tsx` fra
// `area.topics.length` per area. Hver page key (`dat107/<area>/<topic>`)
// settes manuelt via CompletionToggle, så det trengs ingen sentral
// helper her — DAT107 har ikke samme uniforme section-struktur som de
// andre fagene.

export function ing164ChapterPrefix(chapterSlug: string): string {
  return `ing164/${chapterSlug}`;
}

export function dat110ChapterPrefix(chapterSlug: string): string {
  return `dat110/${chapterSlug}`;
}

export function dat109TopicKey(topicId: string, segment: string): string {
  return `dat109/${topicId}/${segment}`;
}

const dat109TopicSegments: Record<string, string[]> = {
  modellering: modelleringPages.filter((p) => p.segment).map((p) => p.segment),
  "ooa-ood": ooaOodPages.filter((p) => p.segment).map((p) => p.segment),
  utviklingsmetode: utviklingsmetodePages
    .filter((p) => p.segment)
    .map((p) => p.segment),
  oop: oopPages.filter((p) => p.segment).map((p) => p.segment),
};

export function getDat109TopicSegments(topicId: string): string[] {
  return dat109TopicSegments[topicId] ?? [];
}

export function countCompletedByPrefix(
  completed: Set<string>,
  prefix: string,
): number {
  let n = 0;
  for (const key of completed) {
    if (key.startsWith(prefix + "/")) n++;
  }
  return n;
}

export interface SubjectProgressTotals {
  completed: number;
  total: number;
  percent: number;
}

export function ing164ChapterTotals(
  completed: Set<string>,
  chapterSlug: string,
  sectionCount: number,
): SubjectProgressTotals {
  const total = sectionCount;
  const done = countCompletedByPrefix(completed, ing164ChapterPrefix(chapterSlug));
  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}

export function ing164GroupTotals(
  completed: Set<string>,
  chapterSlugs: { slug: string; sectionCount: number }[],
): SubjectProgressTotals {
  let total = 0;
  let done = 0;
  for (const ch of chapterSlugs) {
    total += ch.sectionCount;
    done += countCompletedByPrefix(completed, ing164ChapterPrefix(ch.slug));
  }
  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}

export function dat110ChapterTotals(
  completed: Set<string>,
  chapterSlug: string,
  sectionCount: number,
): SubjectProgressTotals {
  const total = sectionCount;
  const done = countCompletedByPrefix(completed, dat110ChapterPrefix(chapterSlug));
  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}

export function dat110GroupTotals(
  completed: Set<string>,
  chapterSlugs: { slug: string; sectionCount: number }[],
): SubjectProgressTotals {
  let total = 0;
  let done = 0;
  for (const ch of chapterSlugs) {
    total += ch.sectionCount;
    done += countCompletedByPrefix(completed, dat110ChapterPrefix(ch.slug));
  }
  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}

export function dat109TopicTotals(
  completed: Set<string>,
  topicId: string,
  sectionCount: number,
): SubjectProgressTotals {
  const total = sectionCount;
  let done = 0;
  for (const seg of getDat109TopicSegments(topicId)) {
    if (completed.has(dat109TopicKey(topicId, seg))) done++;
  }
  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}
