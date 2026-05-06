"use client";

import { useState, useMemo, useEffect } from "react";
import type { MatchingSet } from "@/lib/quiz-types";
import { shuffleArray, getTopicInfo } from "@/lib/quiz-types";

interface MatchingGameProps {
  allSets: MatchingSet[];
}

type Side = "left" | "right";

export default function MatchingGame({ allSets }: MatchingGameProps) {
  const [activeSetId, setActiveSetId] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set()); // pair IDs
  const [selected, setSelected] = useState<{ side: Side; pairId: string } | null>(null);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState<{ pairId: string; correct: boolean } | null>(null);

  const activeSet = allSets.find((s) => s.id === activeSetId) || null;

  // Shuffle each side independently
  const leftItems = useMemo(() => {
    if (!activeSet) return [];
    return shuffleArray(activeSet.pairs);
  }, [activeSet]);

  const rightItems = useMemo(() => {
    if (!activeSet) return [];
    return shuffleArray(activeSet.pairs);
  }, [activeSet]);

  // Reset on set change
  useEffect(() => {
    setMatched(new Set());
    setSelected(null);
    setErrors(0);
    setFeedback(null);
  }, [activeSetId]);

  const handleClick = (side: Side, pairId: string) => {
    if (matched.has(pairId)) return;
    if (!selected) {
      setSelected({ side, pairId });
      setFeedback(null);
      return;
    }

    if (selected.side === side) {
      // Switch selection on same side
      setSelected({ side, pairId });
      setFeedback(null);
      return;
    }

    // Two different sides selected — check match
    if (selected.pairId === pairId) {
      // MATCH!
      setMatched((prev) => new Set(prev).add(pairId));
      setFeedback({ pairId, correct: true });
      setSelected(null);
      setTimeout(() => setFeedback(null), 1200);
    } else {
      // Wrong match
      setErrors(errors + 1);
      setFeedback({ pairId: selected.pairId, correct: false });
      setSelected(null);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const isComplete = activeSet && matched.size === activeSet.pairs.length;

  if (!activeSet) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Velg matching-sett</h2>
        <p className="text-sm text-[var(--muted)] mb-2">
          Koble begrepene på venstre side til riktig definisjon på høyre side. Trener
          gjenkjenning av prinsipper, mønstre og roller.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {allSets.map((set) => {
            const topicInfo = getTopicInfo(set.topic);
            return (
              <button
                key={set.id}
                onClick={() => setActiveSetId(set.id)}
                className="text-left rounded-lg border-2 border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/30 dark:hover:bg-sysdev-950/20 p-4 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{topicInfo.emoji}</span>
                  <span className="font-bold">{set.title}</span>
                </div>
                <p className="text-xs text-[var(--muted)] mb-2">{set.description}</p>
                <p className="text-xs font-medium text-sysdev-600 dark:text-sysdev-400">{set.pairs.length} par å matche</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">{activeSet.title}</h2>
          <p className="text-xs text-[var(--muted)]">{activeSet.description}</p>
        </div>
        <button
          onClick={() => setActiveSetId(null)}
          className="text-xs text-[var(--muted)] underline hover:text-[var(--foreground)]"
        >
          ← Bytt sett
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
        <span>
          ✓ Matchet: <strong>{matched.size}</strong> / {activeSet.pairs.length}
        </span>
        <span>
          ✗ Feil: <strong className="text-red-600 dark:text-red-400">{errors}</strong>
        </span>
        {selected && (
          <span className="text-xs text-sysdev-600 dark:text-sysdev-400">Klikk på {selected.side === "left" ? "høyre" : "venstre"} side for å matche</span>
        )}
      </div>

      {/* Match grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Left side */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-[var(--muted)]">Begrep</h3>
          {leftItems.map((pair) => {
            const isMatched = matched.has(pair.id);
            const isSelected = selected?.side === "left" && selected.pairId === pair.id;
            const isFeedback = feedback?.pairId === pair.id;

            let classes = "w-full text-left p-3 rounded-lg border-2 text-sm transition-all ";
            if (isMatched) classes += "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 opacity-70 cursor-default";
            else if (isSelected) classes += "border-sysdev-500 bg-sysdev-100 dark:bg-sysdev-950/40";
            else if (isFeedback && !feedback?.correct) classes += "border-red-500 bg-red-50 dark:bg-red-950/30 animate-pulse";
            else classes += "border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/30 dark:hover:bg-sysdev-950/10 cursor-pointer";

            return (
              <button
                key={pair.id}
                onClick={() => handleClick("left", pair.id)}
                disabled={isMatched}
                className={classes}
              >
                {pair.left}
                {isMatched && <span className="ml-2 text-green-600 dark:text-green-400">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-[var(--muted)]">Definisjon</h3>
          {rightItems.map((pair) => {
            const isMatched = matched.has(pair.id);
            const isSelected = selected?.side === "right" && selected.pairId === pair.id;

            let classes = "w-full text-left p-3 rounded-lg border-2 text-sm transition-all ";
            if (isMatched) classes += "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 opacity-70 cursor-default";
            else if (isSelected) classes += "border-sysdev-500 bg-sysdev-100 dark:bg-sysdev-950/40";
            else classes += "border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/30 dark:hover:bg-sysdev-950/10 cursor-pointer";

            return (
              <button
                key={pair.id}
                onClick={() => handleClick("right", pair.id)}
                disabled={isMatched}
                className={classes}
              >
                {pair.right}
                {isMatched && <span className="ml-2 text-green-600 dark:text-green-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Complete */}
      {isComplete && (
        <div className="rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-950/30 p-6 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-400">Alle matchet!</p>
          <p className="text-sm mt-1">{errors === 0 ? "Perfekt — null feil!" : `${errors} feil underveis.`}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => setActiveSetId(activeSet.id)}
              className="px-4 py-2 rounded-lg border-2 border-sysdev-400 bg-sysdev-50 dark:bg-sysdev-950/30 text-sysdev-700 dark:text-sysdev-400 font-semibold text-sm"
            >
              🔄 Spill samme igjen
            </button>
            <button
              onClick={() => setActiveSetId(null)}
              className="px-4 py-2 rounded-lg border-2 border-[var(--card-border)] font-semibold text-sm"
            >
              📚 Velg annet sett
            </button>
          </div>
          {/* Vis hvorfor matchene henger sammen */}
          <details className="text-left mt-4">
            <summary className="cursor-pointer text-sm font-medium">Vis forklaringer</summary>
            <div className="mt-3 space-y-2">
              {activeSet.pairs.map((p) => (
                <div key={p.id} className="text-sm border-l-2 border-sysdev-400 pl-3 py-1">
                  <p>
                    <strong>{p.left}</strong> ↔ <em>{p.right}</em>
                  </p>
                  {p.whyMatch && <p className="text-xs text-[var(--muted)] mt-1">{p.whyMatch}</p>}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
