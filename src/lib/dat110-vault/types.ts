// DAT110 vault → web data types.
// Populated by scripts/sync-dat110-vault.mjs from /home/skjold/ObsidianVault/DAT110.
// P0a uses concept + topic types only; quiz + exam types defined here so P0b/P0c can pick them up.

export type VaultTema =
  | "01-introduksjon-og-metrics"
  | "02-protocol-layering-og-sockets"
  | "03-mom-overlay"
  | "04-naming-og-chord-dht"
  | "05-processes-and-threads"
  | "06-transport-services"
  | "07-coordination"
  | "08-consistency-replication"
  | "09-fault-tolerance"
  | "10-network-layer"
  | "11-link-layer"
  | "12-iot-mqtt"
  | "13-cloud-virtualization"
  | "14-network-security";

export interface ResolvedSlugRef {
  slug: string;
  route: string;
}

// SourceRef: vault grounding for a concept/topic/quiz/exam answer.
// NEVER rendered inline in quiz UI. Used in expandable "Kilder og grunnlag" on concept/topic pages.
export type SourceVisibility = "public" | "internal" | "local-only";

export interface SourceRef {
  slug: string;
  title: string;
  role: string;
  visibility: SourceVisibility;
  pageOrSection?: string;
}

export interface DAT110Concept {
  slug: string;
  tema: string;
  status: "drafted" | "reviewed";
  title: string;
  sections: string[];
  supportedBy: SourceRef[];
  relatedConcepts: ResolvedSlugRef[];
  relatedTopics: ResolvedSlugRef[];
  body: string;
  created: string;
}

export interface DAT110Topic {
  slug: string;
  tema: string;
  status: "drafted" | "reviewed";
  title: string;
  sections: string[];
  supportedBy: SourceRef[];
  relatedConcepts: ResolvedSlugRef[];
  relatedTopics: ResolvedSlugRef[];
  body: string;
  created: string;
}

// LearnMoreLink: pedagogical link shown in quiz/exam UI after answer.
// ALWAYS points to a DAT110 web page (never to a vault source-note).
export interface LearnMoreLink {
  label: string;
  href: string;
  kind: "concept" | "topic" | "exam-pattern" | "eksamen";
  slug: string;
}

export interface OptionExplanation {
  optionIndex: number;
  isCorrect: boolean;
  shortExplanation: string;
}

export type DAT110QuizSource =
  | { kind: "canvas-quiz"; taskNumber: number; questionNumber: number }
  | { kind: "exam"; year: number; session: string; questionNumber: number }
  | {
      kind: "reconstructed-exam";
      year: number;
      session: string;
      questionNumber: number;
      warning: true;
    }
  | { kind: "generated"; basedOn: string; manuallyReviewed: boolean };

export type DAT110QuizTopic = VaultTema;

// English translation of a quiz question's *text* fields. Held in a separate
// id-keyed JSON map (src/lib/dat110-language/quiz-translations-en.json), NOT
// embedded in the generated quizzes.json, so it survives vault re-sync.
// Structural fields (correctIndices, qtype, optionIndex/isCorrect, learnMoreLinks,
// source, …) are language-neutral and always come from the base question.
// options[] must be the same length and order as the base options so
// option-shuffle and scoring stay valid; if it isn't, the localizer falls back
// to Norwegian. optionExplanations is a positional string[] aligned 1:1 with the
// base optionExplanations (English shortExplanation only).
export interface DAT110QuizTranslation {
  question: string;
  options: string[];
  explanationCorrect: string;
  explanationIncorrect?: string;
  optionExplanations?: string[];
}

export interface DAT110QuizQuestion {
  id: string;
  topic: DAT110QuizTopic;
  conceptSlugs: string[];
  source: DAT110QuizSource;
  question: string;
  qtype: "multiple_choice" | "multiple_answers";
  options: string[];
  correctIndices: number[];
  explanationCorrect: string;
  explanationIncorrect?: string;
  optionExplanations?: OptionExplanation[];
  learnMoreLinks: LearnMoreLink[];
  sourceRefs: SourceRef[];
  relatedConcepts: string[];
  relatedExamPatterns: string[];
  difficulty?: "easy" | "medium" | "hard";
  weight?: number;
}

export interface ExamSolution {
  expectedAnswer: string;
  shortReasoning: string;
  fullSensorTemplate?: string;
  commonMistakes?: string[];
  learnMoreLinks?: LearnMoreLink[];
}

export interface ExamSubquestion {
  letter: string;
  prompt: string;
  qtype?: "mcq" | "short-answer" | "calculation" | "free-text";
  options?: string[];
  solution: ExamSolution;
  learnMoreLinks?: LearnMoreLink[];
}

export interface ExamQuestion {
  number: number;
  weightPercent: number;
  topic: DAT110QuizTopic;
  conceptSlugs: string[];
  prompt: string;
  // When subquestions[] is present, each subquestion carries its own solution,
  // and the question-level `solution` is optional (synthesis/preamble only).
  subquestions?: ExamSubquestion[];
  solution?: ExamSolution;
  learnMoreLinks: LearnMoreLink[];
  sourceRefs: SourceRef[];
  relatedExamPatterns: string[];
  // Note when a figure/diagram from the PDF could not be reproduced losslessly
  // in text/Markdown form. Rendered as a caveat under the question prompt.
  figureNote?: string;
}

export interface DAT110Exam {
  slug: string;
  year: number;
  session: string;
  displayLabel: string;
  pairStatus: "complete" | "reconstructed_from_incomplete_pair";
  officialPdfMissing?: boolean;
  reconstructedFromSensor?: boolean;
  bannerWarning?: string;
  sensorSlug: string;
  questions: ExamQuestion[];
  totalWeight: number;
}

export interface DAT110ExamPattern {
  slug: string;
  scope: string;
  title: string;
  body: string;
}

export interface DAT110VaultMeta {
  syncedAt: string;
  vaultPath: string;
  counts: {
    conceptsTier1: number;
    topicsTier1: number;
    sourcesScanned: number;
    sourcesFilteredLocalOnly: number;
    wikilinkRoutes: number;
    unmappedWikilinksInBodies?: number;
    exams?: number;
  };
}

// ---- ExamPattern (P1.E gjengangere-side) ----------------------------------
// Hand-curated dataset i src/data/dat110-vault/exam-patterns.json — IKKE
// regenerert av sync-skriptet. Driver /dat110/eksamen/gjengangere.

export interface ExamPatternExampleLink {
  label: string;
  href: string;
}

export interface ExamPatternLearnMoreLink {
  label: string;
  href: string;
}

export interface ExamPatternQSlot {
  number: number;
  title: string;
  weightPercent: number;
  stability: string;
  topicFocus: string;
  description: string;
  examples: ExamPatternExampleLink[];
}

export interface ExamPatternTopConcept {
  rank: number;
  slug: string;
  label: string;
  kind: "concept" | "topic";
  tier: 1 | 2 | 3 | 4 | 5;
  note: string;
  href: string | null;
}

export interface ExamPatternCard {
  slug: string;
  title: string;
  weightHint: string;
  stabilityTag: string;
  description: string;
  examples: ExamPatternExampleLink[];
  learnMore: ExamPatternLearnMoreLink[];
  practiceHref?: string;
}

export interface ExamPatternsDataset {
  _doc?: string;
  qslots: ExamPatternQSlot[];
  topConcepts: ExamPatternTopConcept[];
  patterns: ExamPatternCard[];
}
