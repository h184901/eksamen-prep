"use client";

import { useState, useEffect, useRef } from "react";
import type { ExamSet } from "@/lib/quiz-types";
import QuizCard from "./QuizCard";
import QuizResults from "./QuizResults";

interface ExamSimulatorProps {
  exams: ExamSet[];
}

type Phase = "select" | "running" | "submitted" | "review";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function ExamSimulator({ exams }: ExamSimulatorProps) {
  const [phase, setPhase] = useState<Phase>("select");
  const [activeExam, setActiveExam] = useState<ExamSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [openShown, setOpenShown] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (phase !== "running") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase("submitted");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  const startExam = (exam: ExamSet) => {
    setActiveExam(exam);
    setCurrentIndex(0);
    setAnswers(new Array(exam.questions.length).fill(null));
    setSecondsLeft(exam.durationMinutes * 60);
    setOpenShown(new Set());
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
    if (!activeExam) return;
    if (currentIndex < activeExam.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase("submitted");
    }
  };

  const handleSubmitEarly = () => {
    if (!confirm("Er du sikker på at du vil levere nå? Du kan ikke gå tilbake.")) return;
    setPhase("submitted");
  };

  const handleReset = () => {
    setActiveExam(null);
    setCurrentIndex(0);
    setAnswers([]);
    setSecondsLeft(0);
    setOpenShown(new Set());
    setPhase("select");
  };

  // Selection screen
  if (phase === "select" || !activeExam) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-5">
          <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">📋 Slik fungerer eksamenssimulering</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Du har <strong>4 timer</strong> (240 min) — samme som ekte eksamen</li>
            <li>Tidtakeren teller ned, og leverer automatisk hvis tiden går ut</li>
            <li>Flervalg-spørsmålene retter seg automatisk</li>
            <li>Åpne oppgaver (oppgave 1 og 4) får du sjekkliste å selv-rate mot</li>
            <li>Ingen pauser, ingen hjelp — som ekte eksamen</li>
            <li>Tips: bruk denne 1–2 ganger før eksamen, siste gang nær eksamen-dagen</li>
          </ul>
        </div>

        <h2 className="text-xl font-bold">Velg eksamen å simulere</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => startExam(exam)}
              className="text-left rounded-xl border-2 border-[var(--card-border)] hover:border-sysdev-400 p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-lg font-bold">{exam.label}</span>
                <span className="text-xs text-[var(--muted)]">{exam.year}</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-3">{exam.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  ⏱️ {exam.durationMinutes} min
                </span>
                <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                  📝 {exam.questions.length} flervalg
                </span>
                {exam.openParts && exam.openParts.length > 0 && (
                  <span className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    ✏️ {exam.openParts.length} åpen{exam.openParts.length === 1 ? "" : "e"} oppg
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Submitted — show results
  if (phase === "submitted" || phase === "review") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-sysdev-400 bg-sysdev-50 dark:bg-sysdev-950/20 p-5">
          <h2 className="font-bold text-xl mb-2">📋 Eksamen levert!</h2>
          <p className="text-sm">Du svarte på {answers.filter((a) => a !== null).length} av {activeExam.questions.length} flervalgsspørsmål.</p>
          {secondsLeft === 0 && (
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">⏱️ Tiden gikk ut.</p>
          )}
        </div>

        <QuizResults
          questions={activeExam.questions}
          answers={answers}
          onRetry={() => startExam(activeExam)}
          onRetryWrong={() => {
            // Restart med bare gale spørsmål
            const wrong = activeExam.questions.filter((q, i) => answers[i] !== q.correctIndex);
            if (wrong.length === 0) return;
            const wrongExam: ExamSet = { ...activeExam, questions: wrong };
            startExam(wrongExam);
          }}
          onBack={handleReset}
        />

        {/* Open parts (selv-vurdering) */}
        {activeExam.openParts && activeExam.openParts.length > 0 && (
          <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-5">
            <h3 className="font-bold mb-3">✏️ Åpne oppgaver — selvvurdering</h3>
            <p className="text-sm mb-3">Disse er ikke flervalg — du må vurdere svaret ditt mot fasiten.</p>
            <div className="space-y-3">
              {activeExam.openParts.map((part) => {
                const shown = openShown.has(part.id);
                return (
                  <div key={part.id} className="rounded-lg border border-amber-300 dark:border-amber-700 bg-white/50 dark:bg-neutral-900/50 p-4">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="font-bold">Oppgave {part.number} — {part.title}</h4>
                      <span className="text-xs text-[var(--muted)]">{part.weight} • {part.durationMinutes} min</span>
                    </div>
                    <p className="text-sm mb-3">{part.description}</p>
                    {!shown ? (
                      <button
                        onClick={() => setOpenShown((prev) => new Set(prev).add(part.id))}
                        className="text-sm font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline"
                      >
                        Vis modellsvar og sjekkliste →
                      </button>
                    ) : (
                      <div className="space-y-3 mt-3">
                        <div className="rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3 text-sm">
                          <p className="font-semibold mb-1 text-blue-700 dark:text-blue-400">📖 Forventet svar</p>
                          <p>{part.expectedAnswer}</p>
                        </div>
                        <div className="rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
                          <p className="font-semibold mb-2 text-emerald-700 dark:text-emerald-400">✅ Sjekkliste — vurder ditt svar</p>
                          <ul className="space-y-1">
                            {part.rubric.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <input type="checkbox" className="mt-0.5 accent-emerald-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Running phase
  const currentQuestion = activeExam.questions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const lowTime = secondsLeft < 600; // siste 10 min

  return (
    <div className="space-y-4">
      {/* Top bar with timer */}
      <div className={`sticky top-0 z-30 -mx-4 px-4 py-3 backdrop-blur-md border-b ${lowTime ? "bg-red-50/80 dark:bg-red-950/50 border-red-300 dark:border-red-700" : "bg-[var(--background)]/95 border-[var(--card-border)]"}`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[var(--muted)]">Eksamen</p>
            <p className="font-bold text-sm">{activeExam.label}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[var(--muted)]">⏱️ Tid igjen</p>
            <p className={`font-mono text-2xl font-bold ${lowTime ? "text-red-600 dark:text-red-400 animate-pulse" : ""}`}>
              {formatTime(secondsLeft)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--muted)]">Svart på</p>
            <p className="font-bold text-sm">
              {answeredCount} / {activeExam.questions.length}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmitEarly}
          className="text-xs text-red-600 dark:text-red-400 underline mt-2"
        >
          🚪 Lever tidlig
        </button>
      </div>

      {/* Question — usingsame UI as quiz, but without showing feedback */}
      <ExamQuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={activeExam.questions.length}
        currentAnswer={answers[currentIndex]}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrev={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
        canPrev={currentIndex > 0}
        isLast={currentIndex === activeExam.questions.length - 1}
      />

      {/* Question grid for jumping */}
      <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3">
        <p className="text-xs text-[var(--muted)] mb-2">Hopp til spørsmål:</p>
        <div className="flex flex-wrap gap-1.5">
          {activeExam.questions.map((_, i) => {
            const answered = answers[i] !== null;
            const current = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded text-xs font-bold ${
                  current
                    ? "ring-2 ring-sysdev-500 bg-sysdev-100 dark:bg-sysdev-950/40"
                    : answered
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-neutral-100 dark:bg-neutral-800 text-[var(--muted)]"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Spesialisert eksamen-spørsmålskort — viser IKKE feedback under eksamen */
function ExamQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onNext,
  onPrev,
  canPrev,
  isLast,
}: {
  question: import("@/lib/quiz-types").QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer: number | null;
  onAnswer: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canPrev: boolean;
  isLast: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
      <p className="text-xs text-[var(--muted)] mb-3">
        Spørsmål {questionNumber} av {totalQuestions}
      </p>
      <p className="text-base font-medium mb-5 leading-relaxed">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all flex items-start gap-3 ${
              i === currentAnswer
                ? "border-sysdev-500 bg-sysdev-50 dark:bg-sysdev-950/30"
                : "border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/30 dark:hover:bg-sysdev-950/10"
            }`}
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold">
              {String.fromCharCode(65 + i)}
            </span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className="px-4 py-2 rounded-lg border-2 border-[var(--card-border)] text-sm font-medium disabled:opacity-30"
        >
          ← Forrige
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-lg bg-sysdev-500 text-white font-semibold text-sm"
        >
          {isLast ? "Lever eksamen →" : "Neste →"}
        </button>
      </div>
    </div>
  );
}
