"use client";

import { useMemo, useState } from "react";
import type { DrillDataset, OvingDrill, SelfMark } from "./oving-types";
import Dat102OvingFilters, { type FilterGroup } from "./Dat102OvingFilters";
import Dat102LearnMoreLinks, { Dat102SourceTag } from "./Dat102LearnMoreLinks";
import Dat102ProgressSummary, { type TopicTally } from "./Dat102ProgressSummary";

type Phase = "select" | "running" | "done";

const TYPE_LABEL: Record<string, string> = {
  calculation: "Beregning",
  trace: "Tracing",
  code_reading: "Kodelesing",
  short_answer: "Kortsvar",
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Dat102Drills({ dataset }: { dataset: DrillDataset }) {
  const [phase, setPhase] = useState<Phase>("select");
  const [topic, setTopic] = useState<string | null>(null);
  const [qtype, setQtype] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const [active, setActive] = useState<OvingDrill[]>([]);
  const [marks, setMarks] = useState<SelfMark[]>([]);
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const pool = useMemo(
    () =>
      dataset.items.filter(
        (d) =>
          (!topic || d.topic === topic) &&
          (!qtype || d.qtype === qtype) &&
          (!difficulty || d.difficulty === difficulty)
      ),
    [dataset.items, topic, qtype, difficulty]
  );

  const filterGroups: FilterGroup[] = [
    { key: "topic", label: "Tema", facets: dataset.topicFacets, selected: topic, onSelect: setTopic },
    { key: "type", label: "Type", facets: dataset.typeFacets, selected: qtype, onSelect: setQtype },
    { key: "difficulty", label: "Vanskelighet", facets: dataset.difficultyFacets, selected: difficulty, onSelect: setDifficulty },
  ];

  const start = () => {
    const items = shuffle(pool);
    setActive(items);
    setMarks(new Array(items.length).fill(null));
    setCurrent(0);
    setShowHint(false);
    setShowSolution(false);
    setPhase("running");
  };

  const resetToSelect = () => {
    setPhase("select");
    setActive([]);
    setMarks([]);
    setCurrent(0);
  };

  const mark = (m: Exclude<SelfMark, null>) => {
    setMarks((prev) => {
      const next = [...prev];
      next[current] = m;
      return next;
    });
    if (current < active.length - 1) {
      setCurrent(current + 1);
      setShowHint(false);
      setShowSolution(false);
    } else {
      setPhase("done");
    }
  };

  // ---- select ----
  if (phase === "select") {
    return (
      <div className="space-y-6">
        <Dat102OvingFilters groups={filterGroups} />
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">{pool.length}</span>{" "}
            drills i utvalget.
          </p>
          <button
            type="button"
            onClick={start}
            disabled={pool.length === 0}
            className="px-5 py-2.5 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start drills
          </button>
        </div>
      </div>
    );
  }

  // ---- done ----
  if (phase === "done") {
    const solved = marks.filter((m) => m === "known").length;
    const tallies = new Map<string, TopicTally>();
    active.forEach((d, i) => {
      const t = tallies.get(d.topic) ?? { slug: d.topic, label: d.topicLabel, wrong: 0, total: 0 };
      t.total += 1;
      if (marks[i] !== "known") t.wrong += 1;
      tallies.set(d.topic, t);
    });
    const weak = [...tallies.values()].filter((t) => t.wrong > 0).sort((a, b) => b.wrong - a.wrong);

    return (
      <Dat102ProgressSummary
        scoreLabel="Klarte"
        score={solved}
        total={active.length}
        weakTopics={weak}
        nextStep={<span>Tracing sitter best med repetisjon — kjør de samme drillene igjen om noen dager.</span>}
        actions={
          <>
            <button
              type="button"
              onClick={start}
              className="px-6 py-3 rounded-lg border-2 border-dat102-400 bg-dat102-50 dark:bg-dat102-950/20 text-dat102-700 dark:text-dat102-300 font-semibold text-sm hover:bg-dat102-100 dark:hover:bg-dat102-950/40 transition-colors"
            >
              Kjør igjen
            </button>
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
  const d = active[current];
  const hasHint = d.expectedSteps.length > 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-300">
        <span>Drill {current + 1} av {active.length}</span>
        <span className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            {TYPE_LABEL[d.qtype] ?? d.qtype}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border border-dat102-200 dark:border-dat102-900">
            {d.topicLabel}
          </span>
        </span>
      </div>

      <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 sm:p-6">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{d.title}</h2>
        <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-100 whitespace-pre-wrap mb-4">
          {d.prompt}
        </p>

        {/* Figur-merknad: oppgaven viser til en figur som ikke kan gjengis som tekst */}
        {d.figureNote && (
          <div className="mb-4 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
            <span aria-hidden>🖼️ </span>
            {d.figureNote}
          </div>
        )}

        {/* Hint = første steg i den faktiske løsningen (ikke oppdiktet) */}
        {hasHint && (
          showHint ? (
            <div className="mb-3 rounded-lg border border-dat102-200 dark:border-dat102-800 bg-dat102-50/60 dark:bg-dat102-950/20 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-dat102-700 dark:text-dat102-300 mb-1">
                Hint — første steg
              </p>
              <p className="text-sm text-neutral-800 dark:text-neutral-100">{d.expectedSteps[0]}</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="mb-3 text-sm font-medium text-dat102-700 dark:text-dat102-300 hover:underline underline-offset-2"
            >
              Vis hint
            </button>
          )
        )}

        {/* Stegvis løsning + fasit */}
        {showSolution ? (
          <div className="space-y-3">
            <div className="rounded-lg border border-dat102-300 dark:border-dat102-700 bg-dat102-50 dark:bg-dat102-950/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-dat102-700 dark:text-dat102-300 mb-2">
                Stegvis løsning
              </p>
              <ol className="space-y-1.5 ml-5 list-decimal text-sm text-neutral-800 dark:text-neutral-100">
                {d.expectedSteps.map((s, i) => (
                  <li key={i} className="whitespace-pre-wrap">{s}</li>
                ))}
              </ol>
              {d.finalAnswer && (
                <p className="mt-3 pt-3 border-t border-dat102-200 dark:border-dat102-800 text-sm">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-50">Svar: </span>
                  <span className="font-mono text-dat102-700 dark:text-dat102-300">{d.finalAnswer}</span>
                </p>
              )}
            </div>
            <Dat102LearnMoreLinks links={d.learnMoreLinks} />
            {d.source && <Dat102SourceTag source={d.source} />}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => mark("known")}
                className="px-4 py-2.5 rounded-lg border-2 border-green-400 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 font-semibold text-sm hover:bg-green-100 dark:hover:bg-green-950/40 transition-colors"
              >
                ✓ Jeg klarte den
              </button>
              <button
                type="button"
                onClick={() => mark("review")}
                className="px-4 py-2.5 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
              >
                Må øve mer
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowSolution(true)}
            className="w-full px-6 py-3 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors"
          >
            Vis stegvis løsning
          </button>
        )}
      </div>

      <button type="button" onClick={resetToSelect} className="text-xs text-neutral-500 dark:text-neutral-400 underline hover:text-neutral-700 dark:hover:text-neutral-200">
        Avbryt og gå tilbake til utvalg
      </button>
    </div>
  );
}
