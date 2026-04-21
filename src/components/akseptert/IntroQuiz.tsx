"use client";

import { useState } from "react";

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function IntroQuiz({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const allAnswered = Object.keys(answers).length === questions.length;
  const correctCount = Object.entries(answers).filter(
    ([i, v]) => questions[Number(i)].correctIndex === v,
  ).length;

  return (
    <div className="space-y-4 my-4">
      {questions.map((q, i) => {
        const selected = answers[i];
        const answered = selected !== undefined;
        const correct = selected === q.correctIndex;
        return (
          <div
            key={i}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
          >
            <p className="text-xs font-bold text-akseptert-600 dark:text-akseptert-300 mb-2">
              Spørsmål {i + 1} av {questions.length}
            </p>
            <p className="font-medium text-sm mb-4">{q.question}</p>
            <div className="space-y-2 mb-3">
              {q.options.map((opt, oi) => {
                let style = "border-[var(--card-border)] hover:border-akseptert-400/60";
                if (answered) {
                  if (oi === q.correctIndex)
                    style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20";
                  else if (oi === selected)
                    style = "border-red-500 bg-red-50 dark:bg-red-950/20";
                  else style = "border-[var(--card-border)] opacity-50";
                }
                return (
                  <button
                    type="button"
                    key={oi}
                    onClick={() =>
                      !answered && setAnswers((a) => ({ ...a, [i]: oi }))
                    }
                    disabled={answered}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border-2 transition-all ${style} ${
                      answered ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <span className="font-mono text-xs mr-2 text-[var(--muted)]">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div
                className={`rounded-lg p-3 text-sm ${
                  correct
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40"
                    : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40"
                }`}
              >
                <p className="font-bold mb-1">{correct ? "Riktig!" : "Feil!"}</p>
                <p className="text-[var(--muted)]">{q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
      {allAnswered && (
        <div className="rounded-xl border-2 border-akseptert-400/50 bg-akseptert-50 dark:bg-akseptert-950/30 p-5 text-center">
          <p className="font-bold text-xl mb-1">
            {correctCount} / {questions.length} riktige
          </p>
          <p className="text-sm text-[var(--muted)]">
            {correctCount === questions.length
              ? "Alt perfekt. Du er klar for neste steg."
              : correctCount >= Math.ceil(questions.length * 0.7)
                ? "Bra! Se over de du bommet på."
                : "Les gjennom seksjonene igjen og prøv på nytt."}
          </p>
        </div>
      )}
    </div>
  );
}
