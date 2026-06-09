"use client";

import { useMemo, useState } from "react";
import type { QuizDataset, OvingQuiz } from "./oving-types";
import Dat102OvingFilters, { type FilterGroup } from "./Dat102OvingFilters";
import Dat102QuizCard, { type QuizAnswer } from "./Dat102QuizCard";
import Dat102ProgressSummary, { type TopicTally } from "./Dat102ProgressSummary";
import Dat102LearnMoreLinks, { Dat102SourceTag } from "./Dat102LearnMoreLinks";

type Phase = "select" | "running" | "done";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Dat102QuizRunner({ dataset }: { dataset: QuizDataset }) {
  const [phase, setPhase] = useState<Phase>("select");
  const [topic, setTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [qtype, setQtype] = useState<string | null>(null);

  const [active, setActive] = useState<OvingQuiz[]>([]);
  const [answers, setAnswers] = useState<(QuizAnswer | null)[]>([]);
  const [current, setCurrent] = useState(0);

  const pool = useMemo(
    () =>
      dataset.items.filter(
        (q) =>
          (!topic || q.topic === topic) &&
          (!difficulty || q.difficulty === difficulty) &&
          (!qtype || q.qtype === qtype)
      ),
    [dataset.items, topic, difficulty, qtype]
  );

  const filterGroups: FilterGroup[] = [
    { key: "topic", label: "Tema", facets: dataset.topicFacets, selected: topic, onSelect: setTopic },
    { key: "difficulty", label: "Vanskelighet", facets: dataset.difficultyFacets, selected: difficulty, onSelect: setDifficulty },
    { key: "type", label: "Type", facets: dataset.typeFacets, selected: qtype, onSelect: setQtype },
  ];

  const start = (shuffled: boolean) => {
    const items = shuffled ? shuffle(pool) : pool;
    setActive(items);
    setAnswers(new Array(items.length).fill(null));
    setCurrent(0);
    setPhase("running");
  };

  const handleAnswer = (a: QuizAnswer) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = a;
      return next;
    });
  };

  const handleNext = () => {
    if (current < active.length - 1) setCurrent(current + 1);
    else setPhase("done");
  };

  const resetToSelect = () => {
    setActive([]);
    setAnswers([]);
    setCurrent(0);
    setPhase("select");
  };

  const retrySame = () => {
    setActive(shuffle(active));
    setAnswers(new Array(active.length).fill(null));
    setCurrent(0);
    setPhase("running");
  };

  const retryWrong = () => {
    const wrong = active.filter((_, i) => !answers[i]?.correct);
    if (wrong.length === 0) return;
    setActive(shuffle(wrong));
    setAnswers(new Array(wrong.length).fill(null));
    setCurrent(0);
    setPhase("running");
  };

  // ---- select ----
  if (phase === "select") {
    return (
      <div className="space-y-6">
        <Dat102OvingFilters groups={filterGroups} />
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">
              {pool.length}
            </span>{" "}
            spørsmål i utvalget.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => start(true)}
              disabled={pool.length === 0}
              className="px-5 py-2.5 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start quiz (tilfeldig rekkefølge)
            </button>
            <button
              type="button"
              onClick={() => start(false)}
              disabled={pool.length === 0}
              className="px-5 py-2.5 rounded-lg border border-dat102-400 text-dat102-700 dark:text-dat102-300 font-semibold text-sm hover:bg-dat102-50 dark:hover:bg-dat102-950/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I rekkefølge
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- done (results) ----
  if (phase === "done") {
    const score = answers.filter((a) => a?.correct).length;
    const tallies = new Map<string, TopicTally>();
    active.forEach((q, i) => {
      const t = tallies.get(q.topic) ?? { slug: q.topic, label: q.topicLabel, wrong: 0, total: 0 };
      t.total += 1;
      if (!answers[i]?.correct) t.wrong += 1;
      tallies.set(q.topic, t);
    });
    const weak = [...tallies.values()].filter((t) => t.wrong > 0).sort((a, b) => b.wrong - a.wrong);
    const wrongCount = active.length - score;

    return (
      <div className="space-y-6">
        <Dat102ProgressSummary
          scoreLabel="Riktige"
          score={score}
          total={active.length}
          weakTopics={weak}
          nextStep={
            weak.length > 0 ? (
              <span>
                Repeter de svakeste temaene over, og prøv «øv på feil» for en
                fokusert runde. Drills og flashcards på samme tema sitter ofte
                bedre etter en quizrunde.
              </span>
            ) : (
              <span>
                Sterk runde! Prøv et nytt tema, eller ta en{" "}
                <a href="/dat102/oving/drills" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline">
                  drill-økt
                </a>{" "}
                for å øve tracing og beregning.
              </span>
            )
          }
          actions={
            <>
              <button
                type="button"
                onClick={retrySame}
                className="px-6 py-3 rounded-lg border-2 border-dat102-400 bg-dat102-50 dark:bg-dat102-950/20 text-dat102-700 dark:text-dat102-300 font-semibold text-sm hover:bg-dat102-100 dark:hover:bg-dat102-950/40 transition-colors"
              >
                Prøv på nytt
              </button>
              {wrongCount > 0 && (
                <button
                  type="button"
                  onClick={retryWrong}
                  className="px-6 py-3 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
                >
                  Øv på feil ({wrongCount})
                </button>
              )}
              <button
                type="button"
                onClick={resetToSelect}
                className="px-6 py-3 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                Nytt utvalg
              </button>
            </>
          }
        />

        {/* Gjennomgang */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h3 className="font-bold text-lg mb-4 text-neutral-900 dark:text-neutral-50">
            Gjennomgang
          </h3>
          <div className="space-y-3">
            {active.map((q, i) => (
              <QuizReviewRow key={q.id} q={q} answer={answers[i]} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---- running ----
  const answered = answers[current] !== null;
  const progress = ((current + (answered ? 1 : 0)) / active.length) * 100;
  const correctSoFar = answers.slice(0, current + 1).filter((a) => a?.correct).length;
  const answeredCount = answers.slice(0, current + 1).filter((a) => a !== null).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div className="h-full bg-dat102-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs text-neutral-600 dark:text-neutral-300 font-medium whitespace-nowrap">
          Riktig{" "}
          <span className="font-bold text-dat102-600 dark:text-dat102-300">{correctSoFar}</span>
          {answeredCount > 0 && (
            <span className="text-neutral-500 dark:text-neutral-400"> / {answeredCount}</span>
          )}
        </div>
      </div>

      <Dat102QuizCard
        key={active[current].id}
        question={active[current]}
        questionNumber={current + 1}
        totalQuestions={active.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />

      <button
        type="button"
        onClick={resetToSelect}
        className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline"
      >
        Avbryt og gå tilbake til utvalg
      </button>
    </div>
  );
}

// Kompakt gjennomgangsrad per spørsmål i resultatvisningen.
function QuizReviewRow({
  q,
  answer,
  index,
}: {
  q: OvingQuiz;
  answer: QuizAnswer | null;
  index: number;
}) {
  const correct = !!answer?.correct;
  const isSelfCheck = q.qtype === "short_answer_selfcheck";
  const picked = answer?.selected ?? [];
  const expByIndex = new Map<number, string>();
  for (const e of q.optionExplanations || []) expByIndex.set(e.optionIndex, e.shortExplanation);

  return (
    <details
      className={
        correct
          ? "rounded-lg border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10 p-3"
          : "rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-3"
      }
    >
      <summary className="cursor-pointer text-sm font-medium text-neutral-900 dark:text-neutral-50">
        <span className={correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
          {correct ? "✓" : "✗"}
        </span>{" "}
        Spørsmål {index}
        <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
          — {q.question.slice(0, 72)}
          {q.question.length > 72 ? "…" : ""}
        </span>
      </summary>
      <div className="mt-3 pl-5 space-y-2 text-sm">
        <p className="font-medium whitespace-pre-wrap text-neutral-900 dark:text-neutral-50">{q.question}</p>

        {isSelfCheck ? (
          <div className="p-3 rounded bg-dat102-50 dark:bg-dat102-950/20 border border-dat102-200 dark:border-dat102-800">
            <p className="text-xs text-neutral-800 dark:text-neutral-100">
              <strong>Fasit:</strong> {q.selfCheck?.expectedAnswer}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Du markerte: {answer?.selfMark === "known" ? "mestret" : "må øve mer"}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {q.options.map((opt, j) => {
              const isCorrect = q.correctIndices.includes(j);
              const isUserPick = picked.includes(j);
              const cls = isCorrect
                ? "bg-green-100 dark:bg-green-900/30 font-semibold"
                : isUserPick
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "text-neutral-600 dark:text-neutral-300";
              return (
                <div key={j} className={`px-3 py-1.5 rounded text-neutral-900 dark:text-neutral-50 ${cls}`}>
                  <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + j)}</span>
                  {opt}
                  {isCorrect && <span className="text-green-700 dark:text-green-300 ml-2">✓ riktig</span>}
                  {isUserPick && !isCorrect && <span className="text-red-700 dark:text-red-300 ml-2">ditt svar</span>}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-2 p-3 rounded bg-dat102-50 dark:bg-dat102-950/30 border border-dat102-200 dark:border-dat102-800">
          <p className="text-xs text-neutral-800 dark:text-neutral-100">{q.explanationCorrect}</p>
        </div>

        {!correct &&
          picked
            .filter((k) => !q.correctIndices.includes(k) && expByIndex.has(k))
            .map((k) => (
              <div key={k} className="p-3 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-900 dark:text-amber-200">
                  <strong>Alternativ {String.fromCharCode(65 + k)} var feil:</strong> {expByIndex.get(k)}
                </p>
              </div>
            ))}

        <Dat102LearnMoreLinks links={q.learnMoreLinks} />
        <Dat102SourceTag source={q.source} />
      </div>
    </details>
  );
}
