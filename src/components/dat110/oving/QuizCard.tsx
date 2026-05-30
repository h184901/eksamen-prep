"use client";

import { useEffect, useMemo, useState } from "react";
import type { DAT110QuizQuestion } from "@/lib/dat110-quiz-types";
import {
  displaySourceTag,
  indicesEqual,
} from "@/lib/dat110-quiz-types";
import {
  getQuizTopicInfo,
  localizeQuizTopic,
  TOPIC_COLOR_PILL,
} from "@/lib/dat110-quiz-topics";
import LearnMoreLinks from "@/components/dat110/LearnMoreLinks";
import type { Dat110Lang } from "@/lib/dat110-language/useDat110Lang";
import { quizUi, hasEnglishTranslation } from "@/lib/dat110-language/quiz-i18n";

interface Props {
  question: DAT110QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  // Called when user has locked in their answer.
  onAnswer: (selectedIndices: number[]) => void;
  // Called when user clicks "Neste"/"Se resultat" after reading feedback.
  onNext: () => void;
  lang: Dat110Lang;
}

// Quiz card med DAT110-tilpasninger:
//  - multiple_choice: klikk på alternativ låser umiddelbart (DAT109-mønster).
//  - multiple_answers: brukeren krysser av flere; eksplisitt "Bekreft svar" låser.
//  - Etter lock: grønn for riktig, rosa for valgt-men-feil, opacity-50 for øvrige.
//    For multiple_answers vises missed-correct med amber outline.
//  - Feedback-card: explanationCorrect + ev. per-option-forklaring + learnMoreLinks.
//  - Source tag (én linje): "📋 Mai 2024 oppg N" / "✏️ Generert (pensum)".
//  - sourceRefs renders ALDRI inline.
export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  lang,
}: Props) {
  const ui = quizUi(lang);
  // English mode, but this specific question has no English translation yet:
  // the runner has rendered the Norwegian text — surface a quiet note.
  const untranslated = lang === "en" && !hasEnglishTranslation(question);
  const [tentative, setTentative] = useState<Set<number>>(new Set());
  const [locked, setLocked] = useState<number[] | null>(null);

  // Reset state når neste spørsmål monteres.
  useEffect(() => {
    setTentative(new Set());
    setLocked(null);
  }, [question.id]);

  const isMulti = question.qtype === "multiple_answers";
  const baseTopicInfo = getQuizTopicInfo(question.topic);
  const topicInfo = baseTopicInfo
    ? localizeQuizTopic(baseTopicInfo, lang)
    : undefined;
  const correctSorted = useMemo(
    () => [...question.correctIndices].sort((a, b) => a - b),
    [question.correctIndices]
  );
  const isCorrect = locked ? indicesEqual(locked, correctSorted) : false;

  const handleClickOption = (i: number) => {
    if (locked !== null) return;
    if (isMulti) {
      setTentative((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
    } else {
      const arr = [i];
      setLocked(arr);
      onAnswer(arr);
    }
  };

  const handleConfirm = () => {
    if (locked !== null) return;
    if (tentative.size === 0) return;
    const arr = [...tentative].sort((a, b) => a - b);
    setLocked(arr);
    onAnswer(arr);
  };

  // Per-option explanation by index, hvis tilgjengelig.
  const expByIndex = useMemo(() => {
    const m = new Map<number, string>();
    (question.optionExplanations || []).forEach((e) =>
      m.set(e.optionIndex, e.shortExplanation)
    );
    return m;
  }, [question.optionExplanations]);

  const correctLetters = correctSorted
    .map((i) => String.fromCharCode(65 + i))
    .join(", ");

  return (
    <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          {ui.questionOf(questionNumber, totalQuestions)}
          {isMulti && (
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
              {ui.selectAllThatApply}
            </span>
          )}
        </div>
        {topicInfo && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${TOPIC_COLOR_PILL[topicInfo.color]}`}
          >
            {topicInfo.emoji} {topicInfo.label}
          </span>
        )}
      </div>

      {/* Question text */}
      <p className="text-base font-medium mb-1 leading-relaxed whitespace-pre-wrap text-neutral-900 dark:text-neutral-50">
        {question.question}
      </p>
      {untranslated && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 italic">
          {ui.partiallyEnglishNote}
        </p>
      )}
      {!untranslated && <div className="mb-4" />}

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const lockedIn = locked !== null;
          const isInLocked = lockedIn && locked!.includes(i);
          const isInTentative = !lockedIn && tentative.has(i);
          const optIsCorrect = correctSorted.includes(i);

          let classes =
            "w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all flex items-start gap-3 ";

          if (!lockedIn) {
            classes += isInTentative
              ? "border-network-500 bg-network-50 dark:bg-network-950/30 cursor-pointer"
              : "border-neutral-300 dark:border-neutral-700 hover:border-network-400 hover:bg-network-50/30 dark:hover:bg-network-950/20 cursor-pointer";
          } else if (optIsCorrect) {
            // riktig — alltid grønn etter lock
            classes +=
              "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 cursor-default";
          } else if (isInLocked) {
            // valgt men feil
            classes +=
              "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 cursor-default";
          } else {
            classes +=
              "border-neutral-300 dark:border-neutral-700 opacity-50 cursor-default";
          }

          const indicator = isMulti ? (
            <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 border-current flex items-center justify-center text-xs font-bold">
              {(isInLocked || isInTentative) && "✓"}
            </span>
          ) : (
            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold">
              {String.fromCharCode(65 + i)}
            </span>
          );

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClickOption(i)}
              disabled={lockedIn}
              className={classes}
            >
              {indicator}
              <span className="flex-1 text-neutral-900 dark:text-neutral-50">
                {isMulti ? (
                  <>
                    <span className="font-mono text-xs text-neutral-500 mr-1">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </>
                ) : (
                  opt
                )}
              </span>
              {lockedIn && optIsCorrect && (
                <span className="text-green-600 dark:text-green-400 text-lg flex-shrink-0">
                  ✓
                </span>
              )}
              {lockedIn && isInLocked && !optIsCorrect && (
                <span className="text-red-600 dark:text-red-400 text-lg flex-shrink-0">
                  ✗
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bekreft-knapp for multi-answer (vises kun før lock) */}
      {isMulti && locked === null && (
        <button
          type="button"
          onClick={handleConfirm}
          disabled={tentative.size === 0}
          className="mt-4 w-full px-6 py-3 rounded-lg bg-network-500 hover:bg-network-600 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {tentative.size === 0
            ? ui.confirmHint
            : ui.confirmAnswer(tentative.size)}
        </button>
      )}

      {/* Feedback (etter lock) */}
      {locked !== null && (
        <div className="mt-5 space-y-3">
          {/* Hovedfeedback */}
          <div
            className={
              isCorrect
                ? "rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4"
                : "rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4"
            }
          >
            <p className="font-bold text-sm mb-2 text-neutral-900 dark:text-neutral-50">
              {isCorrect
                ? ui.correct
                : isMulti
                  ? ui.notQuite(correctLetters)
                  : ui.wrong(correctLetters)}
            </p>
            <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-100">
              {question.explanationCorrect}
            </p>
            {!isCorrect && question.explanationIncorrect && (
              <p className="text-sm leading-relaxed mt-2 text-neutral-700 dark:text-neutral-200">
                {question.explanationIncorrect}
              </p>
            )}
          </div>

          {/* Per-option-forklaring for valgte-men-feile (én amber-card hvis 1, ellers en liste) */}
          {!isCorrect &&
            (() => {
              const wrongPicked = locked!.filter(
                (i) => !correctSorted.includes(i) && expByIndex.has(i)
              );
              if (wrongPicked.length === 0) return null;
              return (
                <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4">
                  <p className="font-semibold text-sm mb-2 text-amber-800 dark:text-amber-200">
                    {ui.whyChoicesWrong}
                  </p>
                  <ul className="space-y-1.5">
                    {wrongPicked.map((i) => (
                      <li
                        key={i}
                        className="text-sm text-neutral-800 dark:text-neutral-100"
                      >
                        <span className="font-mono text-xs mr-1">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {expByIndex.get(i)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

          {/* learnMoreLinks (blå piller, gjenbruker P0b-komponenten) */}
          {question.learnMoreLinks && question.learnMoreLinks.length > 0 && (
            <LearnMoreLinks links={question.learnMoreLinks} />
          )}

          {/* Source tag — pen visning, aldri raw sourceRefs */}
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {displaySourceTag(question.source)}
          </div>

          {/* Neste-knapp */}
          <button
            type="button"
            onClick={onNext}
            className="w-full mt-2 px-6 py-3 rounded-lg bg-network-500 hover:bg-network-600 text-white font-semibold text-sm transition-colors"
          >
            {questionNumber < totalQuestions
              ? ui.nextQuestion
              : ui.seeResults}
          </button>
        </div>
      )}
    </div>
  );
}
