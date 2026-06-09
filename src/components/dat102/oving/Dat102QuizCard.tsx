"use client";

import { useEffect, useMemo, useState } from "react";
import type { OvingQuiz, SelfMark } from "./oving-types";
import Dat102QuizFeedback from "./Dat102QuizFeedback";
import Dat102LearnMoreLinks, { Dat102SourceTag } from "./Dat102LearnMoreLinks";

export interface QuizAnswer {
  correct: boolean;
  selected: number[];
  selfMark?: SelfMark;
}

interface Props {
  question: OvingQuiz;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (a: QuizAnswer) => void;
  onNext: () => void;
}

function setEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, i) => v === sb[i]);
}

// Ett quizspørsmål. Flervalg/sant-usant låser på klikk; flere-riktige bruker
// "Bekreft svar" + set-likhet; selvsjekk viser fasit og lar deg gradere selv.
export default function Dat102QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: Props) {
  const isMulti = question.qtype === "multiple_select";
  const isSelfCheck = question.qtype === "short_answer_selfcheck";

  const [tentative, setTentative] = useState<Set<number>>(new Set());
  const [locked, setLocked] = useState<number[] | null>(null);
  // selvsjekk-flyt
  const [revealed, setRevealed] = useState(false);
  const [selfMark, setSelfMark] = useState<SelfMark>(null);

  useEffect(() => {
    setTentative(new Set());
    setLocked(null);
    setRevealed(false);
    setSelfMark(null);
  }, [question.id]);

  const correctSorted = useMemo(
    () => [...question.correctIndices].sort((a, b) => a - b),
    [question.correctIndices]
  );
  const isCorrect = locked ? setEqual(locked, correctSorted) : false;

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
      onAnswer({ correct: setEqual(arr, correctSorted), selected: arr });
    }
  };

  const handleConfirm = () => {
    if (locked !== null || tentative.size === 0) return;
    const arr = [...tentative].sort((a, b) => a - b);
    setLocked(arr);
    onAnswer({ correct: setEqual(arr, correctSorted), selected: arr });
  };

  const handleSelfGrade = (mark: Exclude<SelfMark, null>) => {
    if (selfMark !== null) return;
    setSelfMark(mark);
    onAnswer({ correct: mark === "known", selected: [], selfMark: mark });
  };

  const answered = isSelfCheck ? selfMark !== null : locked !== null;

  return (
    <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          Spørsmål {questionNumber} av {totalQuestions}
          {isMulti && (
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
              Velg alle som passer
            </span>
          )}
          {isSelfCheck && (
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-dat102-100 dark:bg-dat102-900/40 text-dat102-700 dark:text-dat102-300">
              Selvsjekk
            </span>
          )}
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border border-dat102-200 dark:border-dat102-900">
          {question.topicLabel}
        </span>
      </div>

      {/* Spørsmålstekst */}
      <p className="text-base font-medium mb-4 leading-relaxed whitespace-pre-wrap text-neutral-900 dark:text-neutral-50">
        {question.question}
      </p>

      {/* Selvsjekk-modus */}
      {isSelfCheck ? (
        <div className="space-y-3">
          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="w-full px-6 py-3 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors"
            >
              Vis fasit
            </button>
          ) : (
            <>
              <div className="rounded-lg border border-dat102-300 dark:border-dat102-700 bg-dat102-50 dark:bg-dat102-950/20 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-dat102-700 dark:text-dat102-300 mb-1.5">
                  Forventet svar
                </p>
                <p className="text-sm leading-relaxed text-neutral-900 dark:text-neutral-50 whitespace-pre-wrap">
                  {question.selfCheck?.expectedAnswer}
                </p>
                {question.explanationCorrect &&
                  question.explanationCorrect !==
                    question.selfCheck?.expectedAnswer && (
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 mt-2">
                      {question.explanationCorrect}
                    </p>
                  )}
              </div>
              <Dat102LearnMoreLinks links={question.learnMoreLinks} />
              <Dat102SourceTag source={question.source} />

              {selfMark === null ? (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSelfGrade("known")}
                    className="px-4 py-2.5 rounded-lg border-2 border-green-400 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 font-semibold text-sm hover:bg-green-100 dark:hover:bg-green-950/40 transition-colors"
                  >
                    ✓ Jeg klarte den
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelfGrade("review")}
                    className="px-4 py-2.5 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
                  >
                    Må øve mer
                  </button>
                </div>
              ) : (
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 pt-1">
                  {selfMark === "known" ? "Markert som mestret ✓" : "Markert til repetisjon"}
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        /* Flervalg / sant-usant / flere-riktige */
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
                ? "border-dat102-500 bg-dat102-50 dark:bg-dat102-950/30 cursor-pointer"
                : "border-neutral-300 dark:border-neutral-700 hover:border-dat102-400 hover:bg-dat102-50/30 dark:hover:bg-dat102-950/20 cursor-pointer";
            } else if (optIsCorrect) {
              classes +=
                "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 cursor-default";
            } else if (isInLocked) {
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
                  {isMulti && (
                    <span className="font-mono text-xs text-neutral-500 mr-1">
                      {String.fromCharCode(65 + i)}.
                    </span>
                  )}
                  {opt}
                </span>
                {lockedIn && optIsCorrect && (
                  <span className="text-green-600 dark:text-green-400 text-lg flex-shrink-0">✓</span>
                )}
                {lockedIn && isInLocked && !optIsCorrect && (
                  <span className="text-red-600 dark:text-red-400 text-lg flex-shrink-0">✗</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Bekreft-knapp for flere-riktige (før lock) */}
      {isMulti && locked === null && (
        <button
          type="button"
          onClick={handleConfirm}
          disabled={tentative.size === 0}
          className="mt-4 w-full px-6 py-3 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {tentative.size === 0 ? "Velg minst ett alternativ" : `Bekreft svar (${tentative.size} valgt)`}
        </button>
      )}

      {/* Feedback for flervalg/flere-riktige/sant-usant */}
      {!isSelfCheck && locked !== null && (
        <Dat102QuizFeedback question={question} locked={locked} isCorrect={isCorrect} />
      )}

      {/* Neste-knapp */}
      {answered && (
        <button
          type="button"
          onClick={onNext}
          className="w-full mt-4 px-6 py-3 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors"
        >
          {questionNumber < totalQuestions ? "Neste spørsmål" : "Se resultat"}
        </button>
      )}
    </div>
  );
}
