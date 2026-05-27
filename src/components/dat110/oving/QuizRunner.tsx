"use client";

import { useMemo, useState } from "react";
import type {
  DAT110QuizQuestion,
  DAT110QuizSourceKind,
  VaultTema,
} from "@/lib/dat110-quiz-types";
import { sourceKindOf } from "@/lib/dat110-quiz-types";
import TopicSelector, {
  type QuizStartOptions,
} from "./TopicSelector";
import QuizCard from "./QuizCard";
import QuizResults from "./QuizResults";

type Phase = "select" | "running" | "done";

interface Props {
  allQuestions: DAT110QuizQuestion[];
}

// Fisher-Yates shuffle.
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Shuffle option order in a question and remap correctIndices + optionExplanations.
function shuffleQuestionOptions(q: DAT110QuizQuestion): DAT110QuizQuestion {
  const order = shuffle(q.options.map((_, i) => i));
  const newOptions = order.map((i) => q.options[i]);
  const newCorrect = q.correctIndices
    .map((c) => order.indexOf(c))
    .sort((a, b) => a - b);
  const newExpl = q.optionExplanations
    ? q.optionExplanations.map((e) => ({
        ...e,
        optionIndex: order.indexOf(e.optionIndex),
      }))
    : undefined;
  return {
    ...q,
    options: newOptions,
    correctIndices: newCorrect,
    optionExplanations: newExpl,
  };
}

export default function QuizRunner({ allQuestions }: Props) {
  const [phase, setPhase] = useState<Phase>("select");
  const [activeQuestions, setActiveQuestions] = useState<DAT110QuizQuestion[]>(
    []
  );
  const [answers, setAnswers] = useState<(number[] | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const questionCountByTopic = useMemo(() => {
    const m: Record<string, number> = {};
    for (const q of allQuestions) m[q.topic] = (m[q.topic] || 0) + 1;
    return m;
  }, [allQuestions]);

  const questionCountBySource = useMemo(() => {
    const m: Record<DAT110QuizSourceKind, number> = {
      exam: 0,
      canvas: 0,
      generated: 0,
    };
    for (const q of allQuestions) m[sourceKindOf(q.source)] += 1;
    return m;
  }, [allQuestions]);

  const handleStart = (opts: QuizStartOptions) => {
    const topicSet = new Set<VaultTema>(opts.selectedTopics);
    let pool = allQuestions.filter(
      (q) =>
        topicSet.has(q.topic as VaultTema) &&
        opts.sourceFilter.has(sourceKindOf(q.source))
    );
    if (opts.shuffle) pool = shuffle(pool);
    pool = pool.slice(0, opts.targetCount);
    if (opts.shuffle) pool = pool.map(shuffleQuestionOptions);

    setActiveQuestions(pool);
    setAnswers(new Array(pool.length).fill(null));
    setCurrentIndex(0);
    setPhase("running");
  };

  const handleAnswer = (selectedIndices: number[]) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = selectedIndices;
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase("done");
    }
  };

  const handleRetry = () => {
    setAnswers(new Array(activeQuestions.length).fill(null));
    setCurrentIndex(0);
    setActiveQuestions(activeQuestions.map(shuffleQuestionOptions));
    setPhase("running");
  };

  const handleRetryWrong = () => {
    const wrong = activeQuestions.filter((q, i) => {
      const a = answers[i];
      if (!a) return true;
      const correct = [...q.correctIndices].sort((x, y) => x - y);
      const got = [...a].sort((x, y) => x - y);
      return (
        correct.length !== got.length ||
        correct.some((c, k) => c !== got[k])
      );
    });
    if (wrong.length === 0) return;
    setActiveQuestions(wrong.map(shuffleQuestionOptions));
    setAnswers(new Array(wrong.length).fill(null));
    setCurrentIndex(0);
    setPhase("running");
  };

  const handleBack = () => {
    setActiveQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setPhase("select");
  };

  if (phase === "select") {
    return (
      <TopicSelector
        questionCountByTopic={questionCountByTopic}
        questionCountBySource={questionCountBySource}
        onStart={handleStart}
      />
    );
  }

  if (phase === "done") {
    return (
      <QuizResults
        questions={activeQuestions}
        answers={answers}
        onRetry={handleRetry}
        onRetryWrong={handleRetryWrong}
        onBack={handleBack}
      />
    );
  }

  const currentQuestion = activeQuestions[currentIndex];
  const answered = answers[currentIndex] !== null;
  const correctSoFar = answers
    .slice(0, currentIndex + 1)
    .filter((a, i) => {
      if (!a) return false;
      const corr = [...activeQuestions[i].correctIndices].sort();
      const got = [...a].sort();
      return (
        corr.length === got.length && corr.every((c, k) => c === got[k])
      );
    }).length;
  const answeredCount = answers
    .slice(0, currentIndex + 1)
    .filter((a) => a !== null).length;
  const progress =
    ((currentIndex + (answered ? 1 : 0)) / activeQuestions.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress + score */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-network-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-neutral-600 dark:text-neutral-300 font-medium whitespace-nowrap">
          Score:{" "}
          <span className="font-bold text-network-600 dark:text-network-300">
            {correctSoFar}
          </span>
          {answeredCount > 0 && (
            <span className="text-neutral-500 dark:text-neutral-400">
              {" "}
              / {answeredCount}
            </span>
          )}
        </div>
      </div>

      <QuizCard
        key={currentQuestion.id}
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={activeQuestions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />

      <button
        type="button"
        onClick={handleBack}
        className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline"
      >
        ← Avbryt og tilbake til temavalg
      </button>
    </div>
  );
}
