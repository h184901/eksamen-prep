"use client";

import type { OvingQuiz } from "./oving-types";
import Dat102LearnMoreLinks, { Dat102SourceTag } from "./Dat102LearnMoreLinks";

interface Props {
  question: OvingQuiz;
  // De valgte alternativ-indeksene (tom for selvsjekk).
  locked: number[];
  isCorrect: boolean;
}

// Feedback-blokken som vises etter at et quizsvar er låst.
// Krav: ved BÅDE riktig og feil skal brukeren få forklaring + "Les mer"-lenker.
// Ved feil: hvorfor det valgte svaret er feil (optionExplanations), pluss
// riktig forklaring. Kilder/wikilinks vises uansett.
export default function Dat102QuizFeedback({ question, locked, isCorrect }: Props) {
  const correctSorted = [...question.correctIndices].sort((a, b) => a - b);
  const correctLetters = correctSorted
    .map((i) => String.fromCharCode(65 + i))
    .join(", ");

  // whyWrong: forklaring for de alternativene brukeren valgte som er feil.
  const expByIndex = new Map<number, string>();
  for (const e of question.optionExplanations || []) {
    expByIndex.set(e.optionIndex, e.shortExplanation);
  }
  const wrongPicked = locked.filter(
    (i) => !correctSorted.includes(i) && expByIndex.has(i)
  );

  return (
    <div className="mt-5 space-y-3">
      {/* Hovedfeedback — riktig/feil + forklaring (begge tilfeller) */}
      <div
        className={
          isCorrect
            ? "rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4"
            : "rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4"
        }
      >
        <p className="font-bold text-sm mb-2 text-neutral-900 dark:text-neutral-50">
          {isCorrect ? "✓ Riktig!" : `✗ Ikke helt — riktig: ${correctLetters}`}
        </p>
        <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-100">
          {question.explanationCorrect}
        </p>
        {!isCorrect &&
          question.explanationIncorrect &&
          question.explanationIncorrect !== question.explanationCorrect && (
            <p className="text-sm leading-relaxed mt-2 text-neutral-700 dark:text-neutral-200">
              {question.explanationIncorrect}
            </p>
          )}
      </div>

      {/* Hvorfor dine valg var feil (per valgt feil-alternativ) */}
      {wrongPicked.length > 0 && (
        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="font-semibold text-sm mb-2 text-amber-800 dark:text-amber-200">
            Hvorfor dine valg var feil
          </p>
          <ul className="space-y-1.5">
            {wrongPicked.map((i) => (
              <li key={i} className="text-sm text-neutral-800 dark:text-neutral-100">
                <span className="font-mono text-xs mr-1">
                  {String.fromCharCode(65 + i)}.
                </span>
                {expByIndex.get(i)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Les mer — wikilinks/learnMore (vises ved både riktig og feil) */}
      <Dat102LearnMoreLinks links={question.learnMoreLinks} />

      {/* Kilde-tag (aldri rå sourceRefs) */}
      <Dat102SourceTag source={question.source} />
    </div>
  );
}
