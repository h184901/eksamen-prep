/**
 * Type-definisjoner for DAT109 øvings- og læringssystem.
 * Brukes av: quiz, flashcards, matching, eksamenssimulering.
 */

export type QuizTopic =
  | "oop-fundamenter"
  | "uml"
  | "solid"
  | "grasp"
  | "utformingsprinsipper"
  | "modellering"
  | "scrum"
  | "xp"
  | "tdd"
  | "ci-cd-devops"
  | "aup"
  | "kanban"
  | "arkitektur"
  | "oop-java";

export type QuizSource =
  | "H2020"
  | "V2021"
  | "V2022"
  | "KontH2022"
  | "V2023"
  | "KontH2023"
  | "V2024"
  | "generated";

export type QuizDifficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  source: QuizSource;
  question: string;
  options: string[];
  correctIndex: number;
  /** Forklaring på HVORFOR riktig svar er riktig (vises etter svar uansett) */
  explanation: string;
  /** Per-alternativ forklaring på hvorfor det er feil. Indeksert som options. Hvis undefined eller tom, vises bare generell explanation. */
  whyWrong?: string[];
  difficulty?: QuizDifficulty;
  /** Pensumreferanse (f.eks. "F06 slide 70", "Sommerville kap 4", "V2024 oppg 2.5") */
  pensumRef?: string;
}

export interface Flashcard {
  id: string;
  topic: QuizTopic;
  /** Begrep/spørsmål — vises forsiden */
  front: string;
  /** Forklaring/svar — vises baksiden */
  back: string;
  difficulty?: QuizDifficulty;
}

export interface MatchingPair {
  id: string;
  /** Venstre side (begrep eller scenario) */
  left: string;
  /** Høyre side (definisjon eller riktig svar) */
  right: string;
  /** Hvorfor matcher disse sammen */
  whyMatch?: string;
}

export interface MatchingSet {
  id: string;
  topic: QuizTopic;
  title: string;
  description: string;
  pairs: MatchingPair[];
}

/** Eksamen som kan simuleres */
export interface ExamSet {
  id: string;
  year: string;
  label: string;
  description: string;
  /** Tidsboks i minutter (faktisk eksamen er 240 min = 4 timer) */
  durationMinutes: number;
  /** Spørsmål i eksamen, i rekkefølge */
  questions: QuizQuestion[];
  /** Open question parts som ikke er flervalg */
  openParts?: ExamOpenPart[];
}

export interface ExamOpenPart {
  id: string;
  number: string; // "1", "1a", "4b" etc.
  weight: string; // "40%", "20%"
  durationMinutes: number; // forventet tidsbruk
  title: string;
  description: string;
  /** Beskrivelse av forventet svar (modellsvar) */
  expectedAnswer: string;
  /** Sjekkliste for selvgrading */
  rubric: string[];
}

/** Topic metadata for UI */
export interface QuizTopicInfo {
  id: QuizTopic;
  label: string;
  description: string;
  /** Knytter til hvilken eksamenoppgave (1, 2, 3, eller 4) */
  examQuestionNumber: 1 | 2 | 3 | 4;
  examWeight: string; // "40%", "20%"
  color: string; // tailwind farge
  emoji: string;
}

export const QUIZ_TOPICS: QuizTopicInfo[] = [
  // Oppgave 1 (40%) — Modellering
  { id: "modellering", label: "Modellering (use case, domene, sekvens)", description: "Brukstilfellemodell, domenemodell og sekvensdiagram. Kjernekonsepter for oppgave 1.", examQuestionNumber: 1, examWeight: "40%", color: "rose", emoji: "🧩" },

  // Oppgave 2 (20%) — OOA/OOD
  { id: "oop-fundamenter", label: "OOP-fundamenter (Booch-egenskaper)", description: "De 7 OO-egenskapene, klasse vs objekt, essensielle OOP-prinsipper. V2024-tema.", examQuestionNumber: 2, examWeight: "20%", color: "violet", emoji: "🎯" },
  { id: "uml", label: "UML-grunnlag og formål", description: "Hvilke diagrammer finnes, hva viser de, fordeler. V2024-tema.", examQuestionNumber: 2, examWeight: "20%", color: "blue", emoji: "📐" },
  { id: "solid", label: "SOLID-prinsippene", description: "Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion.", examQuestionNumber: 2, examWeight: "20%", color: "emerald", emoji: "🧱" },
  { id: "grasp", label: "GRASP-mønstrene", description: "Information Expert, Creator, Controller, Low Coupling, High Cohesion, m.fl.", examQuestionNumber: 2, examWeight: "20%", color: "teal", emoji: "🧠" },
  { id: "utformingsprinsipper", label: "Utformingsprinsipper (KISS, YAGNI, spesialisering)", description: "Komposisjon vs aggregering vs spesialisering, KISS, YAGNI, tilstandshierarki.", examQuestionNumber: 2, examWeight: "20%", color: "purple", emoji: "🛠️" },

  // Oppgave 3 (20%) — Utviklingsmetode
  { id: "scrum", label: "Scrum", description: "Roller, artefakter, sprint, seremonier — vanligste eksamenstema.", examQuestionNumber: 3, examWeight: "20%", color: "blue", emoji: "🔄" },
  { id: "xp", label: "Extreme Programming (XP)", description: "5 verdier, 12 praksiser, parprogrammering.", examQuestionNumber: 3, examWeight: "20%", color: "purple", emoji: "👥" },
  { id: "tdd", label: "TDD og testing", description: "Red-Green-Refactor, test doubles, equivalence partitioning, alpha/beta.", examQuestionNumber: 3, examWeight: "20%", color: "green", emoji: "🧪" },
  { id: "ci-cd-devops", label: "CI/CD og DevOps", description: "Continuous Integration / Delivery / Deployment, DevOps-bærebjelker, IaC.", examQuestionNumber: 3, examWeight: "20%", color: "orange", emoji: "🚀" },
  { id: "aup", label: "AUP (Agile Unified Process)", description: "4 faser × 7 disipliner, AUP+Scrum.", examQuestionNumber: 3, examWeight: "20%", color: "amber", emoji: "📊" },
  { id: "kanban", label: "Kanban", description: "WIP-limits, pull-basert, sammenligning med Scrum.", examQuestionNumber: 3, examWeight: "20%", color: "cyan", emoji: "📋" },
  { id: "arkitektur", label: "Software arkitektur", description: "Sommerville kap 4 — quality attributes, lagdelt, distribusjon. Sannsynlig eksamenstema.", examQuestionNumber: 3, examWeight: "20%", color: "indigo", emoji: "🏛️" },

  // Oppgave 4 (20%) — OOP-java
  { id: "oop-java", label: "OOP — Java fra UML", description: "Skriv klasser fra klassediagram, implementer metoder fra sekvensdiagram. Oppgave 4.", examQuestionNumber: 4, examWeight: "20%", color: "red", emoji: "☕" },
];

export function getTopicInfo(topic: QuizTopic): QuizTopicInfo {
  const info = QUIZ_TOPICS.find((t) => t.id === topic);
  if (!info) throw new Error(`Unknown topic: ${topic}`);
  return info;
}

/** Shuffle utility — Fisher-Yates */
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Shuffle quiz options (and adjust correctIndex/whyWrong accordingly) */
export function shuffleQuestion(q: QuizQuestion): QuizQuestion {
  const indices = q.options.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);
  const newOptions = shuffledIndices.map((i) => q.options[i]);
  const newCorrectIndex = shuffledIndices.indexOf(q.correctIndex);
  const newWhyWrong = q.whyWrong
    ? shuffledIndices.map((i) => q.whyWrong![i])
    : undefined;
  return {
    ...q,
    options: newOptions,
    correctIndex: newCorrectIndex,
    whyWrong: newWhyWrong,
  };
}
