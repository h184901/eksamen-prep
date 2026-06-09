// DAT102 vault → web data types.
// Populated by scripts/sync-dat102-vault.mjs from /home/skjold/ObsidianVault/DAT102.
// Mirrors the dat110-vault pattern, adapted to the DAT102 question-bank schema
// (processed/reviewed/question-bank/reports/schema-spec.md).
//
// Phase 0 scope: data + loader only. No routes/UI consume these yet.

// ---- Shared ----------------------------------------------------------------

// Reviewed-layer topic slugs (14). Doubles as future route segments
// (/dat102/temaer/<slug>).
export type DAT102TopicSlug =
  | "asymptotic-analysis"
  | "bag-adt"
  | "recursion"
  | "sorting"
  | "stacks-and-queues"
  | "lists"
  | "searching"
  | "dictionaries-and-hashing"
  | "trees"
  | "binary-search-trees"
  | "balanced-trees"
  | "heaps-and-priority-queues"
  | "graphs"
  | "testing-junit";

export interface ResolvedSlugRef {
  slug: string;
  route: string;
}

// Grounding reference. `label` is the only student-facing part (shown in
// expandable "Kilder og grunnlag" sections). `internalPath` is vault-relative
// provenance metadata and must never be rendered directly in UI.
export interface SourceRef {
  label: string;
  internalPath: string;
  pages?: string;
}

// Pedagogical navigation link shown in quiz/exam feedback ("Les mer").
export interface LearnMoreLink {
  label: string;
  href: string;
  kind: "concept" | "topic" | "exam" | "exam-pattern" | "oblig" | "pensum";
  slug: string;
}

// Clean, student-facing source tag for quiz/drill cards
// (e.g. "Eksamen V2023" / "Pensum (F09)"). Never raw paths.
export interface ItemSource {
  kind: "exam" | "generated";
  label: string;
}

// ---- Concepts & topics ------------------------------------------------------

export interface DAT102Concept {
  slug: string;
  title: string;
  status: "reviewed";
  supportedBy: SourceRef[];
  relatedConcepts: ResolvedSlugRef[];
  relatedTopics: ResolvedSlugRef[];
  // Markdown body with wikilinks pre-resolved to /dat102/... links and
  // unmapped targets rendered as italic stubs. "Relaterte"/"Sources" sections
  // are stripped (data lives in the structured fields above).
  body: string;
  // Internal: complexity/values the source only shows as figures. Never
  // rendered; used by validators and (later) the AI-tutor deny-list.
  qaPendingNotes: string[];
  created: string;
}

export interface DAT102Topic {
  slug: DAT102TopicSlug | string;
  title: string;
  status: "reviewed";
  supportedBy: SourceRef[];
  relatedConcepts: ResolvedSlugRef[];
  relatedTopics: ResolvedSlugRef[];
  body: string;
  qaPendingNotes: string[];
  created: string;
}

// ---- Syllabus / pensum -------------------------------------------------------

export interface SyllabusWeekRow {
  week: string;
  dates: string;
  tuesday: string;
  lab: string;
  thursday: string;
  oblig: string;
}

export interface SyllabusChapterRow {
  chapters: string;
  topicSlugs: string[];
}

export interface SyllabusLecture {
  week: string;
  code: string; // "F01", "F11a", "F18b", "—"
  anchor: string; // "f01" ... unique pensum-page anchor
  title: string;
  chapters: string;
  topicSlugs: string[];
  pages: number | null;
  sourceSlug: string; // structured source slug (internal provenance)
}

export interface DAT102Syllabus {
  intro: string;
  weeks: SyllabusWeekRow[];
  chapterMap: SyllabusChapterRow[];
  lectures: SyllabusLecture[];
}

// ---- Obliger -----------------------------------------------------------------

export type ObligStatus =
  | "full_text_available"
  | "partial"
  | "index_only"
  | "missing_source";

export interface DAT102Oblig {
  id: string; // "oblig1" ... "oblig5", "oblig4-prove", "godkjent-prove"
  anchor: string; // route anchor on /dat102/oving/obliger
  title: string;
  deadline: string;
  weeks: string;
  themes: string;
  status: ObligStatus;
  statusNote: string;
  canvasAssignmentId: string | null;
  topicSlugs: string[];
  conceptSlugs: string[];
  buildsOn: SourceRef[];
  hasSolution: boolean;
}

// ---- Quiz ---------------------------------------------------------------------

export type DAT102QuizType =
  | "multiple_choice" // single correct index
  | "multiple_select" // >=2 correct indices, all-or-nothing scoring
  | "true_false"
  | "short_answer_selfcheck"; // no options; reveal expected answer + self-grade

export interface OptionExplanation {
  optionIndex: number;
  isCorrect: boolean;
  shortExplanation: string;
}

export interface DAT102QuizQuestion {
  id: string; // stable, e.g. "dat102-q-001"
  topic: DAT102TopicSlug | string;
  conceptSlugs: string[];
  difficulty: "easy" | "medium" | "hard";
  qtype: DAT102QuizType;
  question: string;
  options: string[]; // empty for short_answer_selfcheck
  correctIndices: number[]; // empty for short_answer_selfcheck
  selfCheck: { expectedAnswer: string } | null; // set iff short_answer_selfcheck
  explanationCorrect: string;
  explanationIncorrect: string;
  optionExplanations: OptionExplanation[];
  learnMoreLinks: LearnMoreLink[];
  source: ItemSource;
  sourceMeta: { refs: SourceRef[] };
}

// ---- Flashcards / matching / drills -------------------------------------------

export interface DAT102Flashcard {
  id: string;
  topic: DAT102TopicSlug | string;
  conceptSlugs: string[];
  front: string;
  back: string;
  learnMoreLinks: LearnMoreLink[];
  source: ItemSource;
  sourceMeta: { refs: SourceRef[] };
}

export type MatchingCategory =
  | "term-definition"
  | "algorithm-complexity"
  | "adt-operations"
  | "structure-use";

export interface DAT102MatchingPair {
  id: string;
  category: MatchingCategory;
  topic: DAT102TopicSlug | string;
  left: string;
  right: string;
  learnMoreLinks: LearnMoreLink[];
  sourceMeta: { refs: SourceRef[] };
}

export type DAT102DrillType =
  | "trace"
  | "calculation"
  | "code_reading"
  | "short_answer";

export interface DAT102Drill {
  id: string;
  topic: DAT102TopicSlug | string;
  conceptSlugs: string[];
  title: string;
  qtype: DAT102DrillType;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  expectedSteps: string[];
  finalAnswer: string;
  figureNote: string | null;
  learnMoreLinks: LearnMoreLink[];
  source: ItemSource;
  sourceMeta: { refs: SourceRef[] };
}

// ---- Exams ----------------------------------------------------------------------

export type ExamItemStatus =
  | "complete"
  | "partial"
  | "scanned_only"
  | "missing_solution";

export interface ExamSolution {
  expectedAnswer: string;
  shortReasoning: string;
  commonMistakes: string[];
}

export interface ExamSubquestion {
  letter: string | null; // null = the question has no sub-lettering
  qtype: string; // single-choice | trace | code-reading | free-text | short-answer | multiple-answer | true-false
  points: number | null;
  prompt: string;
  status: ExamItemStatus;
  // null when status === "scanned_only" (no fabricated solutions).
  solution: ExamSolution | null;
  figureNote: string | null;
  learnMoreLinks: LearnMoreLink[];
  sourceMeta: { refs: SourceRef[] };
}

export interface DAT102ExamQuestion {
  number: number;
  anchor: string; // "oppg-6"
  points: number | null; // sum of subquestion points where known
  topic: DAT102TopicSlug | string;
  conceptSlugs: string[];
  subquestions: ExamSubquestion[];
}

export interface DAT102Exam {
  slug: string; // session slug: "2024-vaar", "2025-jan", ...
  year: number;
  session: "vaar" | "jan";
  displayLabel: string; // "Vår 2024"
  summary: string; // one-line intro from the reviewed exam index
  sessionNote: string | null; // scanned/partial caveats, shown as banner text
  status: "complete" | "partial";
  statusCounts: Record<ExamItemStatus, number>;
  questionCount: number;
  subquestionCount: number;
  questions: DAT102ExamQuestion[];
}

export interface DAT102ExamIndexEntry {
  slug: string;
  year: number;
  session: "vaar" | "jan";
  displayLabel: string;
  summary: string;
  sessionNote: string | null;
  status: "complete" | "partial";
  statusCounts: Record<ExamItemStatus, number>;
  questionCount: number;
  subquestionCount: number;
}

// ---- Exam patterns ---------------------------------------------------------------

export interface DAT102ExamPattern {
  slug: string; // "recurring-questions" | "concept-frequency" | "question-type-catalog"
  title: string;
  sessionsCovered: string[];
  body: string; // pre-resolved markdown
}

// ---- Wikilink index / meta ---------------------------------------------------------

export interface DAT102WikilinkIndex {
  // vault target -> web route ("concepts/quicksort" -> "/dat102/begreper/quicksort")
  routes: Record<string, string>;
  // normalized human alias -> vault target ("hashing" -> "topics/dictionaries-and-hashing")
  aliases: Record<string, string>;
  // normalized anchor key -> full href ("oblig2" -> "/dat102/oving/obliger#oblig2")
  anchors: Record<string, string>;
}

export interface DAT102VaultMeta {
  syncedAt: string;
  vaultPath: string;
  counts: {
    concepts: number;
    topics: number;
    quizQuestions: number;
    flashcards: number;
    matchingPairs: number;
    drills: number;
    exams: number;
    examQuestions: number;
    examSubquestions: number;
    obliger: number;
    examPatterns: number;
    lectures: number;
    wikilinkRoutes: number;
    wikilinkAliases: number;
    wikilinkAnchors: number;
    bodyWikilinksResolved: number;
    bodyWikilinksStubbed: number;
  };
}
