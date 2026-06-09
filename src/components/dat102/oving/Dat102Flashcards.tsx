"use client";

import { useMemo, useState } from "react";
import type { FlashcardDataset, OvingFlashcard, SelfMark } from "./oving-types";
import Dat102OvingFilters, { type FilterGroup } from "./Dat102OvingFilters";
import Dat102LearnMoreLinks, { Dat102SourceTag } from "./Dat102LearnMoreLinks";
import Dat102ProgressSummary, { type TopicTally } from "./Dat102ProgressSummary";

type Phase = "select" | "running" | "done";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Dat102Flashcards({ dataset }: { dataset: FlashcardDataset }) {
  const [phase, setPhase] = useState<Phase>("select");
  const [topic, setTopic] = useState<string | null>(null);

  const [active, setActive] = useState<OvingFlashcard[]>([]);
  const [marks, setMarks] = useState<SelfMark[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pool = useMemo(
    () => dataset.items.filter((c) => !topic || c.topic === topic),
    [dataset.items, topic]
  );

  const filterGroups: FilterGroup[] = [
    { key: "topic", label: "Tema", facets: dataset.topicFacets, selected: topic, onSelect: setTopic },
  ];

  const start = () => {
    const items = shuffle(pool);
    setActive(items);
    setMarks(new Array(items.length).fill(null));
    setCurrent(0);
    setFlipped(false);
    setPhase("running");
  };

  const mark = (m: Exclude<SelfMark, null>) => {
    setMarks((prev) => {
      const next = [...prev];
      next[current] = m;
      return next;
    });
    advance();
  };

  const advance = () => {
    if (current < active.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
    } else {
      setPhase("done");
    }
  };

  const resetToSelect = () => {
    setActive([]);
    setMarks([]);
    setCurrent(0);
    setFlipped(false);
    setPhase("select");
  };

  const reshuffle = () => {
    const items = shuffle(active);
    setActive(items);
    setMarks(new Array(items.length).fill(null));
    setCurrent(0);
    setFlipped(false);
  };

  const reviewOnly = () => {
    const review = active.filter((_, i) => marks[i] === "review");
    if (review.length === 0) return;
    setActive(shuffle(review));
    setMarks(new Array(review.length).fill(null));
    setCurrent(0);
    setFlipped(false);
    setPhase("running");
  };

  // ---- select ----
  if (phase === "select") {
    return (
      <div className="space-y-6">
        <Dat102OvingFilters groups={filterGroups} />
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">{pool.length}</span>{" "}
            kort i utvalget.
          </p>
          <button
            type="button"
            onClick={start}
            disabled={pool.length === 0}
            className="px-5 py-2.5 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start kortstokk
          </button>
        </div>
      </div>
    );
  }

  // ---- done ----
  if (phase === "done") {
    const known = marks.filter((m) => m === "known").length;
    const tallies = new Map<string, TopicTally>();
    active.forEach((c, i) => {
      const t = tallies.get(c.topic) ?? { slug: c.topic, label: c.topicLabel, wrong: 0, total: 0 };
      t.total += 1;
      if (marks[i] !== "known") t.wrong += 1;
      tallies.set(c.topic, t);
    });
    const weak = [...tallies.values()].filter((t) => t.wrong > 0).sort((a, b) => b.wrong - a.wrong);
    const reviewCount = active.length - known;

    return (
      <Dat102ProgressSummary
        scoreLabel="Kan"
        score={known}
        total={active.length}
        weakTopics={weak}
        nextStep={
          <span>
            Ta en quizrunde på de samme temaene for å teste at du forstår dem,
            ikke bare kjenner dem igjen.
          </span>
        }
        actions={
          <>
            <button
              type="button"
              onClick={reshuffle}
              className="px-6 py-3 rounded-lg border-2 border-dat102-400 bg-dat102-50 dark:bg-dat102-950/20 text-dat102-700 dark:text-dat102-300 font-semibold text-sm hover:bg-dat102-100 dark:hover:bg-dat102-950/40 transition-colors"
            >
              Stokk om igjen
            </button>
            {reviewCount > 0 && (
              <button
                type="button"
                onClick={reviewOnly}
                className="px-6 py-3 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
              >
                Øv på «må øve mer» ({reviewCount})
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
    );
  }

  // ---- running ----
  const card = active[current];
  const knownSoFar = marks.slice(0, current).filter((m) => m === "known").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-300">
        <span>Kort {current + 1} av {active.length}</span>
        <span className="px-2 py-0.5 rounded-full bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border border-dat102-200 dark:border-dat102-900">
          {card.topicLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "Vis spørsmål" : "Vis svar"}
        className="w-full min-h-[14rem] rounded-2xl border-2 border-dat102-300 dark:border-dat102-700 bg-white dark:bg-neutral-900/50 px-6 py-8 text-left transition-colors hover:border-dat102-400 flex flex-col"
      >
        <span className="text-[10px] font-bold uppercase tracking-wide text-dat102-600 dark:text-dat102-400 mb-3">
          {flipped ? "Svar" : "Spørsmål"} · klikk for å snu
        </span>
        <span className="text-lg leading-relaxed text-neutral-900 dark:text-neutral-50 whitespace-pre-wrap flex-1">
          {flipped ? card.back : card.front}
        </span>
      </button>

      {flipped && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
          <Dat102LearnMoreLinks links={card.learnMoreLinks} />
          <Dat102SourceTag source={card.source} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => mark("known")}
          className="px-4 py-3 rounded-lg border-2 border-green-400 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 font-semibold text-sm hover:bg-green-100 dark:hover:bg-green-950/40 transition-colors"
        >
          ✓ Kan denne
        </button>
        <button
          type="button"
          onClick={() => mark("review")}
          className="px-4 py-3 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
        >
          Må øve mer
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>Kan så langt: {knownSoFar}</span>
        <button type="button" onClick={resetToSelect} className="underline hover:text-neutral-700 dark:hover:text-neutral-200">
          Avbryt
        </button>
      </div>
    </div>
  );
}
