"use client";

import { useMemo, useState } from "react";
import type {
  DAT110QuizQuestion,
  DAT110QuizSourceKind,
  VaultTema,
} from "@/lib/dat110-quiz-types";
import { sourceKindOf, indicesEqual } from "@/lib/dat110-quiz-types";
import { useDat110Lang } from "@/lib/dat110-language";
import { getLocalizedQuizQuestion, quizUi } from "@/lib/dat110-language/quiz-i18n";
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

// A fixed option permutation, e.g. [2,0,3,1]. Stored per active question so the
// option order is stable across language toggles (only the text changes).
function shuffleOrder(n: number): number[] {
  return shuffle(Array.from({ length: n }, (_, i) => i));
}

function identityOrder(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

// Apply a stored option permutation to a question, remapping correctIndices and
// optionExplanations so scoring stays valid. Applied AFTER localization, at
// render time, so the displayed question always matches the current language.
function applyOrder(
  q: DAT110QuizQuestion,
  order: number[],
): DAT110QuizQuestion {
  const options = order.map((i) => q.options[i]);
  const correctIndices = q.correctIndices
    .map((c) => order.indexOf(c))
    .sort((a, b) => a - b);
  const optionExplanations = q.optionExplanations
    ? q.optionExplanations.map((e) => ({
        ...e,
        optionIndex: order.indexOf(e.optionIndex),
      }))
    : undefined;
  return { ...q, options, correctIndices, optionExplanations };
}

export default function QuizRunner({ allQuestions }: Props) {
  // Live language — the entire quiz (selection, questions, feedback, results)
  // re-localizes immediately when the toggle changes, with no reload and no
  // loss of answers (option order is fixed in `orders`, independent of text).
  const { lang } = useDat110Lang();
  const ui = quizUi(lang);
  const [phase, setPhase] = useState<Phase>("select");
  // Base (Norwegian) questions in original option order + a fixed option
  // permutation per question. Localization happens at render.
  const [activeBase, setActiveBase] = useState<DAT110QuizQuestion[]>([]);
  const [orders, setOrders] = useState<number[][]>([]);
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

  // Per-topic × per-source counts so the selector can show the count that
  // matches the actual filtered pool (topic ∩ source), not just the topic sum.
  const questionCountByTopicSource = useMemo(() => {
    const m: Record<string, Record<DAT110QuizSourceKind, number>> = {};
    for (const q of allQuestions) {
      const row = m[q.topic] ?? { exam: 0, canvas: 0, generated: 0 };
      row[sourceKindOf(q.source)] += 1;
      m[q.topic] = row;
    }
    return m;
  }, [allQuestions]);

  // The questions as displayed: localized to the current language and ordered
  // by the stored permutation. Recomputed whenever the language toggles.
  const displayQuestions = useMemo(
    () =>
      activeBase.map((q, i) =>
        applyOrder(getLocalizedQuizQuestion(q, lang), orders[i]),
      ),
    [activeBase, orders, lang],
  );

  const handleStart = (opts: QuizStartOptions) => {
    const topicSet = new Set<VaultTema>(opts.selectedTopics);
    let pool = allQuestions.filter(
      (q) =>
        topicSet.has(q.topic as VaultTema) &&
        opts.sourceFilter.has(sourceKindOf(q.source))
    );
    if (opts.shuffle) pool = shuffle(pool);
    pool = pool.slice(0, opts.targetCount);
    const newOrders = pool.map((q) =>
      opts.shuffle ? shuffleOrder(q.options.length) : identityOrder(q.options.length),
    );

    setActiveBase(pool);
    setOrders(newOrders);
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
    if (currentIndex < activeBase.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase("done");
    }
  };

  const handleRetry = () => {
    setOrders(activeBase.map((q) => shuffleOrder(q.options.length)));
    setAnswers(new Array(activeBase.length).fill(null));
    setCurrentIndex(0);
    setPhase("running");
  };

  const handleRetryWrong = () => {
    const wrongIdx = displayQuestions
      .map((dq, i) => ({ dq, i }))
      .filter(({ dq, i }) => {
        const a = answers[i];
        if (!a) return true;
        return !indicesEqual(a, dq.correctIndices);
      })
      .map(({ i }) => i);
    if (wrongIdx.length === 0) return;
    const wrongBase = wrongIdx.map((i) => activeBase[i]);
    setActiveBase(wrongBase);
    setOrders(wrongBase.map((q) => shuffleOrder(q.options.length)));
    setAnswers(new Array(wrongBase.length).fill(null));
    setCurrentIndex(0);
    setPhase("running");
  };

  const handleBack = () => {
    setActiveBase([]);
    setOrders([]);
    setAnswers([]);
    setCurrentIndex(0);
    setPhase("select");
  };

  if (phase === "select") {
    return (
      <TopicSelector
        questionCountByTopic={questionCountByTopic}
        questionCountBySource={questionCountBySource}
        questionCountByTopicSource={questionCountByTopicSource}
        onStart={handleStart}
        lang={lang}
      />
    );
  }

  if (phase === "done") {
    return (
      <QuizResults
        questions={displayQuestions}
        answers={answers}
        onRetry={handleRetry}
        onRetryWrong={handleRetryWrong}
        onBack={handleBack}
        lang={lang}
      />
    );
  }

  const currentQuestion = displayQuestions[currentIndex];
  const answered = answers[currentIndex] !== null;
  const correctSoFar = answers
    .slice(0, currentIndex + 1)
    .filter((a, i) => {
      if (!a) return false;
      const corr = [...displayQuestions[i].correctIndices].sort();
      const got = [...a].sort();
      return (
        corr.length === got.length && corr.every((c, k) => c === got[k])
      );
    }).length;
  const answeredCount = answers
    .slice(0, currentIndex + 1)
    .filter((a) => a !== null).length;
  const progress =
    ((currentIndex + (answered ? 1 : 0)) / displayQuestions.length) * 100;

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
          {ui.score}{" "}
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
        totalQuestions={displayQuestions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        lang={lang}
      />

      <button
        type="button"
        onClick={handleBack}
        className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline"
      >
        {ui.cancelBack}
      </button>
    </div>
  );
}
