"use client";

import { useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function QuizQuestion({
  question,
  options,
  correctIndex,
  explanation,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === correctIndex;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
      <p className="font-medium text-sm mb-4">{question}</p>
      <div className="space-y-2 mb-3">
        {options.map((option, i) => {
          let style = "border-[var(--card-border)] hover:border-network-400/60";
          if (answered) {
            if (i === correctIndex)
              style = "border-green-500 bg-green-50 dark:bg-green-950/20";
            else if (i === selected)
              style = "border-red-500 bg-red-50 dark:bg-red-950/20";
            else style = "border-[var(--card-border)] opacity-50";
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border-2 transition-all ${style} ${
                !answered ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="font-mono text-xs mr-2 text-[var(--muted)]">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`rounded-lg p-3 text-sm ${
            correct
              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40"
              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40"
          }`}
        >
          <p className="font-bold mb-1">
            {correct ? "Riktig!" : "Feil!"}
          </p>
          <p className="text-[var(--muted)]">{explanation}</p>
        </div>
      )}
    </div>
  );
}

export function QuizSet({ questions }: { questions: QuizQuestionProps[] }) {
  const [score, setScore] = useState<Record<number, boolean>>({});
  const answered = Object.keys(score).length;
  const correctCount = Object.values(score).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <QuizQuestionTracked
          key={i}
          index={i}
          {...q}
          onAnswer={(correct) =>
            setScore((s) => ({ ...s, [i]: correct }))
          }
        />
      ))}
      {answered === questions.length && (
        <div className="rounded-xl border-2 border-network-400/40 bg-network-50 dark:bg-network-950/20 p-4 text-center">
          <p className="font-bold text-lg">
            {correctCount} / {questions.length} riktige
          </p>
          <p className="text-sm text-[var(--muted)]">
            {correctCount === questions.length
              ? "Perfekt! Du kan dette!"
              : correctCount >= questions.length * 0.7
                ? "Bra jobba! Les gjennom det du bomma paa."
                : "Ov litt mer, og prov igjen!"}
          </p>
        </div>
      )}
    </div>
  );
}

function QuizQuestionTracked({
  index,
  onAnswer,
  ...props
}: QuizQuestionProps & { index: number; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === props.correctIndex;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    onAnswer(i === props.correctIndex);
  };

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
      <p className="text-xs font-bold text-[var(--muted)] mb-2">
        Sporsmol {index + 1}
      </p>
      <p className="font-medium text-sm mb-4">{props.question}</p>
      <div className="space-y-2 mb-3">
        {props.options.map((option, i) => {
          let style = "border-[var(--card-border)] hover:border-network-400/60";
          if (answered) {
            if (i === props.correctIndex)
              style = "border-green-500 bg-green-50 dark:bg-green-950/20";
            else if (i === selected)
              style = "border-red-500 bg-red-50 dark:bg-red-950/20";
            else style = "border-[var(--card-border)] opacity-50";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border-2 transition-all ${style} ${
                !answered ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="font-mono text-xs mr-2 text-[var(--muted)]">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`rounded-lg p-3 text-sm ${
            correct
              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40"
              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40"
          }`}
        >
          <p className="font-bold mb-1">{correct ? "Riktig!" : "Feil!"}</p>
          <p className="text-[var(--muted)]">{props.explanation}</p>
        </div>
      )}
    </div>
  );
}
