"use client";

import { useMemo, useState } from "react";
import type { MatchingDataset, OvingMatch } from "./oving-types";
import Dat102OvingFilters, { type FilterGroup } from "./Dat102OvingFilters";
import Dat102LearnMoreLinks from "./Dat102LearnMoreLinks";

type Phase = "select" | "playing" | "done";
const ROUND_SIZE = 6;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Dat102MatchingGame({ dataset }: { dataset: MatchingDataset }) {
  const [phase, setPhase] = useState<Phase>("select");
  const [topic, setTopic] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const [queue, setQueue] = useState<OvingMatch[]>([]); // gjenstående par etter denne runden
  const [board, setBoard] = useState<OvingMatch[]>([]); // par i gjeldende runde
  const [rights, setRights] = useState<OvingMatch[]>([]); // høyresiden, stokket
  const [selLeft, setSelLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null); // "leftId:rightId" som blinker rødt
  const [lastMatched, setLastMatched] = useState<OvingMatch | null>(null);

  const [totalMatched, setTotalMatched] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const pool = useMemo(
    () =>
      dataset.items.filter(
        (p) => (!topic || p.topic === topic) && (!category || p.category === category)
      ),
    [dataset.items, topic, category]
  );

  const filterGroups: FilterGroup[] = [
    { key: "topic", label: "Tema", facets: dataset.topicFacets, selected: topic, onSelect: setTopic },
    { key: "category", label: "Kategori", facets: dataset.categoryFacets, selected: category, onSelect: setCategory },
  ];

  const dealBoard = (source: OvingMatch[]) => {
    const next = source.slice(0, ROUND_SIZE);
    setBoard(next);
    setRights(shuffle(next));
    setQueue(source.slice(ROUND_SIZE));
    setMatched(new Set());
    setSelLeft(null);
    setWrongPair(null);
    setLastMatched(null);
  };

  const start = () => {
    const shuffled = shuffle(pool);
    setTotalMatched(0);
    setAttempts(0);
    setWrongAttempts(0);
    dealBoard(shuffled);
    setPhase("playing");
  };

  const resetToSelect = () => {
    setPhase("select");
    setBoard([]);
    setRights([]);
    setQueue([]);
    setMatched(new Set());
    setSelLeft(null);
    setLastMatched(null);
  };

  const handleLeft = (id: string) => {
    if (matched.has(id)) return;
    setSelLeft((cur) => (cur === id ? null : id));
    setWrongPair(null);
  };

  const handleRight = (rightId: string) => {
    if (!selLeft || matched.has(rightId)) return;
    setAttempts((n) => n + 1);
    if (selLeft === rightId) {
      const pair = board.find((p) => p.id === rightId) ?? null;
      const nextMatched = new Set(matched);
      nextMatched.add(rightId);
      setMatched(nextMatched);
      setSelLeft(null);
      setLastMatched(pair);
      setTotalMatched((n) => n + 1);
      if (nextMatched.size === board.length) {
        // runde ferdig
        if (queue.length === 0) {
          setPhase("done");
        }
      }
    } else {
      setWrongPair(`${selLeft}:${rightId}`);
      setWrongAttempts((n) => n + 1);
      setTimeout(() => setWrongPair(null), 600);
    }
  };

  const nextRound = () => dealBoard(queue);

  // ---- select ----
  if (phase === "select") {
    return (
      <div className="space-y-6">
        <Dat102OvingFilters groups={filterGroups} />
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">{pool.length}</span>{" "}
            par i utvalget — spilles {ROUND_SIZE} om gangen.
          </p>
          <button
            type="button"
            onClick={start}
            disabled={pool.length === 0}
            className="px-5 py-2.5 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start matching
          </button>
        </div>
      </div>
    );
  }

  // ---- done ----
  if (phase === "done") {
    const accuracy = attempts > 0 ? Math.round((totalMatched / attempts) * 100) : 100;
    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-dat102-300 dark:border-dat102-700 bg-dat102-50 dark:bg-dat102-950/20 p-6 text-center">
          <div className="text-5xl font-bold mb-2 text-dat102-700 dark:text-dat102-300">
            {totalMatched}
          </div>
          <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">par matchet</p>
          <p className="text-sm text-[var(--muted)] mt-1">
            {attempts} forsøk · {wrongAttempts} bom · {accuracy}% treff
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={start}
            className="px-6 py-3 rounded-lg border-2 border-dat102-400 bg-dat102-50 dark:bg-dat102-950/20 text-dat102-700 dark:text-dat102-300 font-semibold text-sm hover:bg-dat102-100 dark:hover:bg-dat102-950/40 transition-colors"
          >
            Spill igjen (stokk om)
          </button>
          <button
            type="button"
            onClick={resetToSelect}
            className="px-6 py-3 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
          >
            Nytt utvalg
          </button>
        </div>
      </div>
    );
  }

  // ---- playing ----
  const roundDone = matched.size === board.length;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-300">
        <span>
          Matchet {matched.size}/{board.length} i runden · {totalMatched} totalt
        </span>
        <button type="button" onClick={resetToSelect} className="underline hover:text-neutral-700 dark:hover:text-neutral-200">
          Avbryt
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* Venstre: begrep/term */}
        <div className="space-y-2">
          {board.map((p) => {
            const isMatched = matched.has(p.id);
            const isSel = selLeft === p.id;
            const isWrong = wrongPair?.startsWith(`${p.id}:`);
            return (
              <button
                key={p.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleLeft(p.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm transition-all min-h-[3.5rem] ${
                  isMatched
                    ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 text-neutral-500 dark:text-neutral-400 cursor-default"
                    : isWrong
                      ? "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30"
                      : isSel
                        ? "border-dat102-500 bg-dat102-50 dark:bg-dat102-950/40"
                        : "border-neutral-300 dark:border-neutral-700 hover:border-dat102-400 cursor-pointer"
                }`}
              >
                <span className="text-neutral-900 dark:text-neutral-50">{p.left}</span>
                {isMatched && <span className="ml-1 text-green-600 dark:text-green-400">✓</span>}
              </button>
            );
          })}
        </div>
        {/* Høyre: definisjon/svar (stokket) */}
        <div className="space-y-2">
          {rights.map((p) => {
            const isMatched = matched.has(p.id);
            const isWrong = wrongPair?.endsWith(`:${p.id}`);
            return (
              <button
                key={p.id}
                type="button"
                disabled={isMatched || !selLeft}
                onClick={() => handleRight(p.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm transition-all min-h-[3.5rem] ${
                  isMatched
                    ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 text-neutral-500 dark:text-neutral-400 cursor-default"
                    : isWrong
                      ? "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30"
                      : selLeft
                        ? "border-neutral-300 dark:border-neutral-700 hover:border-dat102-400 cursor-pointer"
                        : "border-neutral-200 dark:border-neutral-800 opacity-70 cursor-default"
                }`}
              >
                <span className="text-neutral-900 dark:text-neutral-50">{p.right}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback for siste match: par + kilder/wikilinks */}
      {lastMatched && (
        <div className="rounded-xl border border-dat102-200 dark:border-dat102-900 bg-dat102-50/50 dark:bg-dat102-950/20 p-4">
          <p className="text-sm text-neutral-900 dark:text-neutral-50">
            <span className="font-semibold">{lastMatched.left}</span>
            <span className="text-dat102-600 dark:text-dat102-400 mx-1.5" aria-hidden>↔</span>
            {lastMatched.right}
          </p>
          <Dat102LearnMoreLinks links={lastMatched.learnMoreLinks} />
        </div>
      )}

      {/* Rundeslutt-knapp når det er flere runder igjen */}
      {roundDone && queue.length > 0 && (
        <button
          type="button"
          onClick={nextRound}
          className="w-full px-6 py-3 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm transition-colors"
        >
          Neste runde ({queue.length} par igjen)
        </button>
      )}
    </div>
  );
}
