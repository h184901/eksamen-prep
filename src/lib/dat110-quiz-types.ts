// DAT110 quiz type re-exports + filter/display helpers.
// Underlying types live in @/lib/dat110-vault/types so quiz components and
// the vault sync pipeline share a single source of truth.

import type {
  DAT110QuizQuestion,
  DAT110QuizSource,
  LearnMoreLink,
  OptionExplanation,
  SourceRef,
  VaultTema,
} from "@/lib/dat110-vault/types";

export type {
  DAT110QuizQuestion,
  DAT110QuizSource,
  LearnMoreLink,
  OptionExplanation,
  SourceRef,
  VaultTema,
};

// Source-filter UI-kind. Both real exams and (future) reconstructed-exam
// items bundle together under "exam".
export type DAT110QuizSourceKind = "exam" | "canvas" | "generated";

export function sourceKindOf(s: DAT110QuizSource): DAT110QuizSourceKind {
  switch (s.kind) {
    case "exam":
    case "reconstructed-exam":
      return "exam";
    case "canvas-quiz":
      return "canvas";
    case "generated":
      return "generated";
  }
}

function monthLabel(session: string): string {
  switch (session) {
    case "01":
      return "Januar";
    case "05":
      return "Mai";
    case "06":
      return "Juni";
    default:
      return session;
  }
}

// Display tag for the quiz feedback card. Never exposes Obsidian-paths,
// vault-slugs, or raw sourceRefs — only clean human-readable labels.
export function displaySourceTag(s: DAT110QuizSource): string {
  switch (s.kind) {
    case "exam":
      return `📋 ${monthLabel(s.session)} ${s.year} oppg ${s.questionNumber}`;
    case "reconstructed-exam":
      return `📋 Rekonstruert ${monthLabel(s.session)} ${s.year} oppg ${s.questionNumber}`;
    case "canvas-quiz":
      return `📋 Canvas Task ${s.taskNumber}`;
    case "generated":
      return `✏️ Generert (pensum)`;
  }
}

// Set-equality for multiple-answer scoring (alt-eller-ingenting).
export function indicesEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = new Set(a);
  for (const i of b) if (!sa.has(i)) return false;
  return true;
}
