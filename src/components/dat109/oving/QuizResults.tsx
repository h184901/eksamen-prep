"use client";

import type { QuizQuestion } from "@/lib/quiz-types";
import { getTopicInfo } from "@/lib/quiz-types";

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: (number | null)[];
  onRetry: () => void;
  onRetryWrong: () => void;
  onBack: () => void;
}

/**
 * Resultatside etter en quiz.
 * Viser score, prosent, og oversikt over alle spørsmål med riktige/gale svar.
 */
export default function QuizResults({
  questions,
  answers,
  onRetry,
  onRetryWrong,
  onBack,
}: QuizResultsProps) {
  const correct = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const total = questions.length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrong = questions.filter((_, i) => answers[i] !== questions[i].correctIndex);

  // Gradering basert på prosent
  let gradeLabel = "F";
  let gradeColor = "text-red-600 dark:text-red-400";
  let gradeBg = "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
  if (percent >= 90) {
    gradeLabel = "A";
    gradeColor = "text-green-700 dark:text-green-400";
    gradeBg = "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700";
  } else if (percent >= 80) {
    gradeLabel = "B";
    gradeColor = "text-emerald-700 dark:text-emerald-400";
    gradeBg = "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700";
  } else if (percent >= 60) {
    gradeLabel = "C";
    gradeColor = "text-yellow-700 dark:text-yellow-400";
    gradeBg = "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 dark:border-yellow-700";
  } else if (percent >= 50) {
    gradeLabel = "D";
    gradeColor = "text-orange-700 dark:text-orange-400";
    gradeBg = "bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700";
  } else if (percent >= 40) {
    gradeLabel = "E";
    gradeColor = "text-amber-700 dark:text-amber-400";
    gradeBg = "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700";
  }

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className={`rounded-xl border-2 p-6 text-center ${gradeBg}`}>
        <div className={`text-6xl font-bold mb-2 ${gradeColor}`}>{gradeLabel}</div>
        <p className="text-2xl font-bold mb-1">
          {correct} / {total}
        </p>
        <p className="text-lg text-[var(--muted)]">{percent}% riktig</p>
      </div>

      {/* Action buttons */}
      <div className="grid sm:grid-cols-3 gap-3">
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-lg border-2 border-sysdev-400 bg-sysdev-50 dark:bg-sysdev-950/20 text-sysdev-700 dark:text-sysdev-400 font-semibold text-sm hover:bg-sysdev-100 dark:hover:bg-sysdev-950/40 transition-colors"
        >
          🔄 Prøv samme quiz igjen
        </button>
        {wrong.length > 0 && (
          <button
            onClick={onRetryWrong}
            className="px-6 py-3 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
          >
            🎯 Drill bare feil ({wrong.length})
          </button>
        )}
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border-2 border-[var(--card-border)] bg-[var(--card)] font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          ← Tilbake til temavalg
        </button>
      </div>

      {/* Detaljert gjennomgang */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h3 className="font-bold text-lg mb-4">Gjennomgang</h3>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            const topicInfo = getTopicInfo(q.topic);
            return (
              <details
                key={q.id}
                className={`rounded-lg border p-3 ${
                  isCorrect
                    ? "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10"
                    : "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10"
                }`}
              >
                <summary className="cursor-pointer text-sm font-medium">
                  <span className={isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}>
                    {isCorrect ? "✓" : "✗"}
                  </span>{" "}
                  Spørsmål {i + 1}{" "}
                  <span className="text-xs text-[var(--muted)] ml-2">
                    {topicInfo.emoji} {topicInfo.label.split(" ")[0]}
                  </span>
                  <span className="text-xs text-[var(--muted)] ml-2">— {q.question.slice(0, 80)}{q.question.length > 80 ? "..." : ""}</span>
                </summary>
                <div className="mt-3 pl-5 space-y-2 text-sm">
                  <p className="font-medium">{q.question}</p>
                  <div className="space-y-1">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className={`px-3 py-1.5 rounded ${
                          j === q.correctIndex
                            ? "bg-green-100 dark:bg-green-900/30 font-semibold"
                            : j === userAnswer
                              ? "bg-red-100 dark:bg-red-900/30"
                              : "text-[var(--muted)]"
                        }`}
                      >
                        <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + j)}</span>
                        {opt}
                        {j === q.correctIndex && <span className="text-green-700 dark:text-green-400 ml-2">← riktig</span>}
                        {j === userAnswer && j !== q.correctIndex && <span className="text-red-700 dark:text-red-400 ml-2">← ditt svar</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 p-3 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-800 dark:text-blue-300">{q.explanation}</p>
                  </div>
                  {!isCorrect && q.whyWrong && userAnswer !== null && q.whyWrong[userAnswer] && (
                    <div className="mt-2 p-3 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-amber-800 dark:text-amber-300">
                        <strong>Hvorfor ditt svar var feil:</strong> {q.whyWrong[userAnswer]}
                      </p>
                    </div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
