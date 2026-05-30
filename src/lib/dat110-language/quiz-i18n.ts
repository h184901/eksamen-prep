import type { DAT110QuizQuestion } from "@/lib/dat110-vault/types";
import type { Dat110Lang } from "./useDat110Lang";
import { QUIZ_EN } from "./quiz-translations-en";

// ---------------------------------------------------------------------------
// Content localization
// ---------------------------------------------------------------------------

// Returns the question with English text fields swapped in when lang === "en"
// and a complete English translation exists (looked up by id in QUIZ_EN).
// Otherwise returns the question unchanged (Norwegian — the default).
// Defensive: if the English options[] length doesn't match the base, fall back
// silently to Norwegian so option shuffling and index-based scoring never break.
export function getLocalizedQuizQuestion(
  q: DAT110QuizQuestion,
  lang: Dat110Lang,
): DAT110QuizQuestion {
  if (lang !== "en") return q;
  const en = QUIZ_EN[q.id];
  if (!en) return q;
  if (!Array.isArray(en.options) || en.options.length !== q.options.length) {
    return q;
  }
  // Rebuild optionExplanations from the base (optionIndex/isCorrect) with the
  // English shortExplanation by position. Only when the counts line up — else
  // keep the base Norwegian explanations rather than risk a mismatch.
  const optionExplanations =
    q.optionExplanations &&
    en.optionExplanations &&
    en.optionExplanations.length === q.optionExplanations.length
      ? q.optionExplanations.map((base, i) => ({
          ...base,
          shortExplanation: en.optionExplanations![i],
        }))
      : q.optionExplanations;
  return {
    ...q,
    question: en.question,
    options: en.options,
    explanationCorrect: en.explanationCorrect,
    explanationIncorrect: en.explanationIncorrect ?? q.explanationIncorrect,
    optionExplanations,
  };
}

// True when the question has a usable English translation. Used to surface a
// quiet "still Norwegian" note rather than rendering as broken.
export function hasEnglishTranslation(q: DAT110QuizQuestion): boolean {
  const en = QUIZ_EN[q.id];
  return Boolean(en && en.options?.length === q.options.length);
}

// ---------------------------------------------------------------------------
// UI labels
// ---------------------------------------------------------------------------

export interface QuizUiLabels {
  // page header
  pageTitle: string;
  pageIntro: string;
  crumbHome: string;
  crumbOving: string;
  crumbQuiz: string;
  // runner
  score: string;
  cancelBack: string;
  partiallyEnglishNote: string;
  // card
  questionOf: (n: number, total: number) => string;
  selectAllThatApply: string;
  confirmHint: string;
  confirmAnswer: (n: number) => string;
  correct: string;
  notQuite: (letters: string) => string;
  wrong: (letters: string) => string;
  whyChoicesWrong: string;
  nextQuestion: string;
  seeResults: string;
  // results
  percentCorrect: (p: number) => string;
  retrySame: string;
  drillWrong: (n: number) => string;
  backToTopics: string;
  review: string;
  questionN: (n: number) => string;
  isCorrectTag: string;
  yourAnswerTag: string;
  optionWasWrong: (letter: string) => string;
  // topic selector chrome
  selectAllTopics: string;
  clearAll: string;
  coreTopics: string;
  groupShort: (n: number) => string;
  groupHeading: (n: number) => string;
  noQuestionsYet: string;
  questionsAvailable: (n: number) => string;
  settings: string;
  numberOfQuestionsLabel: string;
  ofAvailable: (n: number) => string;
  source: string;
  available: (n: number) => string;
  shuffleOption: string;
  allOrNothingOption: string;
  startSelectTopic: string;
  startNoQuestions: string;
  startQuiz: (n: number) => string;
  sourceExam: string;
  sourceCanvas: string;
  sourceGenerated: string;
  // OPPG (exam-task) titles, by number
  oppgTitles: Record<number, string>;
}

const NO: QuizUiLabels = {
  pageTitle: "Flervalg-quiz",
  pageIntro:
    "Velg temaer og kilder du vil testes i. Forklaringer og «Les mer»-lenker vises ETTER du har svart — aldri før. På «velg alle som passer»-spørsmål må du klikke «Bekreft svar» når du er ferdig.",
  crumbHome: "Hjem",
  crumbOving: "Øving",
  crumbQuiz: "Flervalg-quiz",
  score: "Score:",
  cancelBack: "← Avbryt og tilbake til temavalg",
  partiallyEnglishNote:
    "Engelsk modus: noen spørsmål er ennå ikke oversatt og vises på norsk.",
  questionOf: (n, total) => `Spørsmål ${n} av ${total}`,
  selectAllThatApply: "Velg alle som passer",
  confirmHint: "Velg minst ett alternativ for å bekrefte",
  confirmAnswer: (n) => `✓ Bekreft svar (${n} valgt)`,
  correct: "✓ Riktig!",
  notQuite: (letters) => `✗ Ikke helt — riktig: ${letters}`,
  wrong: (letters) => `✗ Feil — riktig var ${letters}`,
  whyChoicesWrong: "Hvorfor dine valg var feil:",
  nextQuestion: "Neste spørsmål →",
  seeResults: "Se resultat →",
  percentCorrect: (p) => `${p}% riktig`,
  retrySame: "🔄 Prøv samme quiz igjen",
  drillWrong: (n) => `🎯 Drill bare feil (${n})`,
  backToTopics: "← Tilbake til temavalg",
  review: "Gjennomgang",
  questionN: (n) => `Spørsmål ${n}`,
  isCorrectTag: "← riktig",
  yourAnswerTag: "← ditt svar",
  optionWasWrong: (letter) => `${letter} var feil:`,
  selectAllTopics: "Velg alle",
  clearAll: "Fjern alle",
  coreTopics: "Kjernetemaer",
  groupShort: (n) => `Oppg ${n}`,
  groupHeading: (n) => `Oppgave ${n}`,
  noQuestionsYet: "Ingen spørsmål ennå",
  questionsAvailable: (n) => `${n} spørsmål tilgjengelig`,
  settings: "Innstillinger",
  numberOfQuestionsLabel: "Antall spørsmål:",
  ofAvailable: (n) => `(av ${n} tilgjengelige fra valgte temaer og kilder)`,
  source: "Kilde",
  available: (n) => `(${n} tilgjengelig)`,
  shuffleOption: "Shuffle spørsmål og svaralternativer (anbefalt)",
  allOrNothingOption:
    "Alt-eller-ingenting-scoring på «velg alle som passer»-spørsmål",
  startSelectTopic: "Velg minst ett tema for å starte",
  startNoQuestions: "Ingen spørsmål i utvalget",
  startQuiz: (n) => `🚀 Start quiz (${n} spørsmål)`,
  sourceExam: "📋 Tidligere DAT110-eksamener",
  sourceCanvas: "📋 Canvas-quizer",
  sourceGenerated: "✏️ Genererte spørsmål",
  oppgTitles: {
    1: "Flervalg",
    3: "Forsinkelser",
    5: "Ruting",
    6: "ARP og Switch",
    7: "DS-teori",
    8: "Overlay og multicast",
    9: "Konsistens og klokker",
    10: "DHT/Chord",
  },
};

const EN: QuizUiLabels = {
  pageTitle: "Multiple-choice quiz",
  pageIntro:
    "Pick the topics and sources you want to be tested on. Explanations and “Learn more” links appear AFTER you answer — never before. On “select all that apply” questions, click “Submit answer” when you're done.",
  crumbHome: "Home",
  crumbOving: "Practice",
  crumbQuiz: "Multiple-choice quiz",
  score: "Score:",
  cancelBack: "← Cancel and back to topic selection",
  partiallyEnglishNote:
    "English mode: some questions are not translated yet and are shown in Norwegian.",
  questionOf: (n, total) => `Question ${n} of ${total}`,
  selectAllThatApply: "Select all that apply",
  confirmHint: "Select at least one option to confirm",
  confirmAnswer: (n) => `✓ Submit answer (${n} selected)`,
  correct: "✓ Correct!",
  notQuite: (letters) => `✗ Not quite — correct: ${letters}`,
  wrong: (letters) => `✗ Wrong — correct was ${letters}`,
  whyChoicesWrong: "Why your choices were wrong:",
  nextQuestion: "Next question →",
  seeResults: "See results →",
  percentCorrect: (p) => `${p}% correct`,
  retrySame: "🔄 Retry the same quiz",
  drillWrong: (n) => `🎯 Drill only the wrong ones (${n})`,
  backToTopics: "← Back to topic selection",
  review: "Review",
  questionN: (n) => `Question ${n}`,
  isCorrectTag: "← correct",
  yourAnswerTag: "← your answer",
  optionWasWrong: (letter) => `${letter} was wrong:`,
  selectAllTopics: "Select all",
  clearAll: "Clear all",
  coreTopics: "Core topics",
  groupShort: (n) => `Q ${n}`,
  groupHeading: (n) => `Exam question ${n}`,
  noQuestionsYet: "No questions yet",
  questionsAvailable: (n) => `${n} questions available`,
  settings: "Settings",
  numberOfQuestionsLabel: "Number of questions:",
  ofAvailable: (n) => `(of ${n} available from the selected topics and sources)`,
  source: "Source",
  available: (n) => `(${n} available)`,
  shuffleOption: "Shuffle questions and answer options (recommended)",
  allOrNothingOption:
    "All-or-nothing scoring on “select all that apply” questions",
  startSelectTopic: "Select at least one topic to start",
  startNoQuestions: "No questions in the selection",
  startQuiz: (n) => `🚀 Start quiz (${n} questions)`,
  sourceExam: "📋 Past DAT110 exams",
  sourceCanvas: "📋 Canvas quizzes",
  sourceGenerated: "✏️ Generated questions",
  oppgTitles: {
    1: "Multiple choice",
    3: "Delays",
    5: "Routing",
    6: "ARP and switching",
    7: "DS theory",
    8: "Overlay and multicast",
    9: "Consistency and clocks",
    10: "DHT/Chord",
  },
};

export function quizUi(lang: Dat110Lang): QuizUiLabels {
  return lang === "en" ? EN : NO;
}
