"use client";

import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/lib/quiz-types";
import { getTopicInfo } from "@/lib/quiz-types";

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  /** Kalles når brukeren har svart, med valgt index og om det var riktig */
  onAnswer: (selectedIndex: number, correct: boolean) => void;
  /** Kalles når brukeren går videre til neste */
  onNext: () => void;
  /** Skjul "kilde"-info (for ren testing). Default true (vis kilde) */
  showSource?: boolean;
}

/**
 * Et enkelt flervalgsspørsmål med:
 * - Spørsmålstekst og alternativer
 * - Klikk for å velge — låser umiddelbart
 * - Svaret AVSLØRES KUN ETTER at brukeren har valgt
 * - Ingen hint i nummer eller titler
 */
export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  showSource = true,
}: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // Reset state når spørsmålet endres
  useEffect(() => {
    setSelected(null);
  }, [question.id]);

  const answered = selected !== null;
  const correct = selected === question.correctIndex;
  const topicInfo = getTopicInfo(question.topic);

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    onAnswer(i, i === question.correctIndex);
  };

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-sm">
      {/* Topp: progresjon, ingen hint i nummer */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-[var(--muted)]">
          Spørsmål {questionNumber} av {totalQuestions}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400">
            {topicInfo.emoji} {topicInfo.label.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Selve spørsmålet */}
      <p className="text-base font-medium mb-5 leading-relaxed">{question.question}</p>

      {/* Alternativer */}
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;

          let classes = "w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all flex items-start gap-3 ";

          if (!answered) {
            classes += "border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/30 dark:hover:bg-sysdev-950/20 cursor-pointer";
          } else if (isCorrect) {
            classes += "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 cursor-default";
          } else if (isSelected && !isCorrect) {
            classes += "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 cursor-default";
          } else {
            classes += "border-[var(--card-border)] opacity-50 cursor-default";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={classes}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {answered && isCorrect && (
                <span className="text-green-600 dark:text-green-400 text-lg flex-shrink-0">✓</span>
              )}
              {answered && isSelected && !isCorrect && (
                <span className="text-red-600 dark:text-red-400 text-lg flex-shrink-0">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Svar-feedback */}
      {answered && (
        <div className="mt-5 space-y-3">
          {/* Hovedfeedback */}
          <div
            className={`rounded-lg border p-4 ${
              correct
                ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20"
                : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20"
            }`}
          >
            <p className="font-bold text-sm mb-2">
              {correct ? "✓ Riktig!" : `✗ Feil — riktig svar var ${String.fromCharCode(65 + question.correctIndex)}`}
            </p>
            <p className="text-sm leading-relaxed">{question.explanation}</p>
          </div>

          {/* Per-alternativ "hvorfor feil" hvis tilgjengelig og brukeren valgte feil */}
          {!correct && question.whyWrong && question.whyWrong[selected!] && (
            <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-semibold text-sm mb-1 text-amber-700 dark:text-amber-400">
                Hvorfor ditt svar var feil:
              </p>
              <p className="text-sm">{question.whyWrong[selected!]}</p>
            </div>
          )}

          {/* Kilde-info */}
          {showSource && (question.source || question.pensumRef) && (
            <div className="text-xs text-[var(--muted)] flex flex-wrap gap-3">
              {question.source && question.source !== "generated" && (
                <span>📋 Fra eksamen {question.source}</span>
              )}
              {question.source === "generated" && (
                <span>✏️ Generert (basert på pensum)</span>
              )}
              {question.pensumRef && <span>📚 {question.pensumRef}</span>}
            </div>
          )}

          {/* Neste-knapp */}
          <button
            onClick={onNext}
            className="w-full mt-3 px-6 py-3 rounded-lg bg-sysdev-500 hover:bg-sysdev-600 text-white font-semibold text-sm transition-colors"
          >
            {questionNumber < totalQuestions ? "Neste spørsmål →" : "Se resultat →"}
          </button>
        </div>
      )}
    </div>
  );
}
