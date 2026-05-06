"use client";

import { useState, useMemo } from "react";
import type { QuizQuestion, QuizTopic } from "@/lib/quiz-types";
import { shuffleArray, shuffleQuestion } from "@/lib/quiz-types";
import QuizCard from "./QuizCard";
import QuizResults from "./QuizResults";
import TopicSelector from "./TopicSelector";

type QuizPhase = "select" | "running" | "done";

interface QuizRunnerProps {
  /** Alle spørsmål, gruppert per tema. Komponenten filtrerer/shuffler selv. */
  allQuestions: QuizQuestion[];
}

export default function QuizRunner({ allQuestions }: QuizRunnerProps) {
  const [phase, setPhase] = useState<QuizPhase>("select");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Telle spørsmål per tema for TopicSelector
  const questionCount = useMemo(() => {
    const count = {} as Record<QuizTopic, number>;
    for (const q of allQuestions) {
      count[q.topic] = (count[q.topic] || 0) + 1;
    }
    return count;
  }, [allQuestions]);

  const handleStart = (
    selectedTopics: QuizTopic[],
    options: { onlyRealExams: boolean; targetCount: number; shuffle: boolean }
  ) => {
    let pool = allQuestions.filter((q) => selectedTopics.includes(q.topic));
    if (options.onlyRealExams) {
      pool = pool.filter((q) => q.source !== "generated");
    }

    let questions = options.shuffle ? shuffleArray(pool) : pool;
    questions = questions.slice(0, options.targetCount);
    if (options.shuffle) {
      questions = questions.map(shuffleQuestion);
    }

    setActiveQuestions(questions);
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setPhase("running");
  };

  const handleAnswer = (selectedIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = selectedIndex;
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
    setActiveQuestions(activeQuestions.map(shuffleQuestion));
    setPhase("running");
  };

  const handleRetryWrong = () => {
    const wrong = activeQuestions.filter((q, i) => answers[i] !== q.correctIndex);
    if (wrong.length === 0) return;
    setActiveQuestions(wrong.map(shuffleQuestion));
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

  // Score hittil
  const correctSoFar = answers.slice(0, currentIndex + 1).filter((a, i) => a !== null && a === activeQuestions[i].correctIndex).length;
  const answeredSoFar = answers.slice(0, currentIndex + 1).filter((a) => a !== null).length;

  if (phase === "select") {
    return <TopicSelector questionCount={questionCount} onStart={handleStart} />;
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

  // phase === "running"
  const currentQuestion = activeQuestions[currentIndex];
  const progress = ((currentIndex + (answers[currentIndex] !== null ? 1 : 0)) / activeQuestions.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-sysdev-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-[var(--muted)] font-medium whitespace-nowrap">
          Score: <span className="font-bold text-sysdev-600 dark:text-sysdev-400">{correctSoFar}</span>
          {answeredSoFar > 0 && <span className="text-[var(--muted)]"> / {answeredSoFar}</span>}
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
        onClick={handleBack}
        className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] underline"
      >
        ← Avbryt og tilbake til temavalg
      </button>
    </div>
  );
}
