"use client";

import type { DAT110QuizQuestion } from "@/lib/dat110-quiz-types";
import { displaySourceTag, indicesEqual } from "@/lib/dat110-quiz-types";
import { getQuizTopicInfo, localizeQuizTopic } from "@/lib/dat110-quiz-topics";
import LearnMoreLinks from "@/components/dat110/LearnMoreLinks";
import type { Dat110Lang } from "@/lib/dat110-language/useDat110Lang";
import { quizUi } from "@/lib/dat110-language/quiz-i18n";

interface Props {
  questions: DAT110QuizQuestion[];
  answers: (number[] | null)[];
  onRetry: () => void;
  onRetryWrong: () => void;
  onBack: () => void;
  lang: Dat110Lang;
}

function gradeFromPercent(percent: number) {
  if (percent >= 90)
    return {
      label: "A",
      color: "text-green-700 dark:text-green-300",
      bg: "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700",
    };
  if (percent >= 80)
    return {
      label: "B",
      color: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700",
    };
  if (percent >= 60)
    return {
      label: "C",
      color: "text-yellow-700 dark:text-yellow-300",
      bg: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 dark:border-yellow-700",
    };
  if (percent >= 50)
    return {
      label: "D",
      color: "text-orange-700 dark:text-orange-300",
      bg: "bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700",
    };
  if (percent >= 40)
    return {
      label: "E",
      color: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700",
    };
  return {
    label: "F",
    color: "text-red-700 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700",
  };
}

export default function QuizResults({
  questions,
  answers,
  onRetry,
  onRetryWrong,
  onBack,
  lang,
}: Props) {
  const ui = quizUi(lang);
  const correctCount = questions.filter((q, i) => {
    const a = answers[i];
    if (!a) return false;
    return indicesEqual(a, q.correctIndices);
  }).length;
  const total = questions.length;
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const grade = gradeFromPercent(percent);
  const wrongCount = total - correctCount;

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className={`rounded-xl border-2 p-6 text-center ${grade.bg}`}>
        <div className={`text-6xl font-bold mb-2 ${grade.color}`}>
          {grade.label}
        </div>
        <p className="text-2xl font-bold mb-1 text-neutral-900 dark:text-neutral-50">
          {correctCount} / {total}
        </p>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          {ui.percentCorrect(percent)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="grid sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-3 rounded-lg border-2 border-network-400 bg-network-50 dark:bg-network-950/20 text-network-700 dark:text-network-300 font-semibold text-sm hover:bg-network-100 dark:hover:bg-network-950/40 transition-colors"
        >
          {ui.retrySame}
        </button>
        {wrongCount > 0 && (
          <button
            type="button"
            onClick={onRetryWrong}
            className="px-6 py-3 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
          >
            {ui.drillWrong(wrongCount)}
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          {ui.backToTopics}
        </button>
      </div>

      {/* Gjennomgang */}
      <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-6">
        <h3 className="font-bold text-lg mb-4 text-neutral-900 dark:text-neutral-50">
          {ui.review}
        </h3>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const userAnswer = answers[i] || [];
            const correct = indicesEqual(userAnswer, q.correctIndices);
            const baseTopicInfo = getQuizTopicInfo(q.topic);
            const topicInfo = baseTopicInfo
              ? localizeQuizTopic(baseTopicInfo, lang)
              : undefined;
            const expByIndex = new Map<number, string>();
            (q.optionExplanations || []).forEach((e) =>
              expByIndex.set(e.optionIndex, e.shortExplanation)
            );
            return (
              <details
                key={q.id}
                className={
                  correct
                    ? "rounded-lg border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10 p-3"
                    : "rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-3"
                }
              >
                <summary className="cursor-pointer text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  <span
                    className={
                      correct
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }
                  >
                    {correct ? "✓" : "✗"}
                  </span>{" "}
                  {ui.questionN(i + 1)}
                  {topicInfo && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
                      {topicInfo.emoji} {topicInfo.label}
                    </span>
                  )}
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
                    — {q.question.slice(0, 80)}
                    {q.question.length > 80 ? "…" : ""}
                  </span>
                </summary>
                <div className="mt-3 pl-5 space-y-2 text-sm">
                  <p className="font-medium whitespace-pre-wrap text-neutral-900 dark:text-neutral-50">
                    {q.question}
                  </p>
                  <div className="space-y-1">
                    {q.options.map((opt, j) => {
                      const isCorrect = q.correctIndices.includes(j);
                      const isUserPick = userAnswer.includes(j);
                      const cls = isCorrect
                        ? "bg-green-100 dark:bg-green-900/30 font-semibold"
                        : isUserPick
                          ? "bg-red-100 dark:bg-red-900/30"
                          : "text-neutral-600 dark:text-neutral-300";
                      return (
                        <div
                          key={j}
                          className={`px-3 py-1.5 rounded text-neutral-900 dark:text-neutral-50 ${cls}`}
                        >
                          <span className="font-mono text-xs mr-2">
                            {String.fromCharCode(65 + j)}
                          </span>
                          {opt}
                          {isCorrect && (
                            <span className="text-green-700 dark:text-green-300 ml-2">
                              {ui.isCorrectTag}
                            </span>
                          )}
                          {isUserPick && !isCorrect && (
                            <span className="text-red-700 dark:text-red-300 ml-2">
                              {ui.yourAnswerTag}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 p-3 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-900 dark:text-blue-200">
                      {q.explanationCorrect}
                    </p>
                  </div>
                  {!correct &&
                    userAnswer
                      .filter(
                        (k) =>
                          !q.correctIndices.includes(k) && expByIndex.has(k)
                      )
                      .map((k) => (
                        <div
                          key={k}
                          className="p-3 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                        >
                          <p className="text-xs text-amber-900 dark:text-amber-200">
                            <strong>
                              {ui.optionWasWrong(String.fromCharCode(65 + k))}
                            </strong>{" "}
                            {expByIndex.get(k)}
                          </p>
                        </div>
                      ))}
                  {q.learnMoreLinks && q.learnMoreLinks.length > 0 && (
                    <LearnMoreLinks links={q.learnMoreLinks} />
                  )}
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    {displaySourceTag(q.source)}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
