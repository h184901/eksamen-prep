"use client";

import { useState, useMemo, useEffect } from "react";
import type { Flashcard, QuizTopic } from "@/lib/quiz-types";
import { QUIZ_TOPICS, shuffleArray, getTopicInfo } from "@/lib/quiz-types";

interface FlashcardDeckProps {
  allCards: Flashcard[];
}

type CardStatus = "new" | "knows" | "practice";

const STORAGE_KEY = "dat109-flashcard-status-v1";

interface CardState {
  status: CardStatus;
  lastReviewed?: number;
}

function loadStatus(): Record<string, CardState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStatus(state: Record<string, CardState>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export default function FlashcardDeck({ allCards }: FlashcardDeckProps) {
  const [selectedTopics, setSelectedTopics] = useState<Set<QuizTopic>>(new Set());
  const [filterMode, setFilterMode] = useState<"all" | "practice" | "new">("all");
  const [started, setStarted] = useState(false);
  const [activeCards, setActiveCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, CardState>>({});

  useEffect(() => {
    setStatusMap(loadStatus());
  }, []);

  const cardsPerTopic = useMemo(() => {
    const count = {} as Record<QuizTopic, number>;
    for (const c of allCards) count[c.topic] = (count[c.topic] || 0) + 1;
    return count;
  }, [allCards]);

  const toggleTopic = (t: QuizTopic) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const handleStart = () => {
    let pool = allCards.filter((c) => selectedTopics.has(c.topic));
    if (filterMode === "practice") {
      pool = pool.filter((c) => statusMap[c.id]?.status === "practice");
    } else if (filterMode === "new") {
      pool = pool.filter((c) => !statusMap[c.id] || statusMap[c.id]?.status === "new");
    }
    if (pool.length === 0) return;
    setActiveCards(shuffleArray(pool));
    setCurrentIndex(0);
    setFlipped(false);
    setStarted(true);
  };

  const markCard = (status: CardStatus) => {
    if (currentIndex >= activeCards.length) return;
    const id = activeCards[currentIndex].id;
    const newStatus: Record<string, CardState> = {
      ...statusMap,
      [id]: { status, lastReviewed: Date.now() },
    };
    setStatusMap(newStatus);
    saveStatus(newStatus);
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      setStarted(false);
    }
  };

  const handleBack = () => {
    setStarted(false);
    setActiveCards([]);
    setCurrentIndex(0);
    setFlipped(false);
  };

  // Stats per tema
  const overallStats = useMemo(() => {
    const total = allCards.length;
    const knows = allCards.filter((c) => statusMap[c.id]?.status === "knows").length;
    const practice = allCards.filter((c) => statusMap[c.id]?.status === "practice").length;
    const newCount = total - knows - practice;
    return { total, knows, practice, new: newCount };
  }, [allCards, statusMap]);

  if (started && activeCards.length > 0) {
    const card = activeCards[currentIndex];
    const topicInfo = getTopicInfo(card.topic);
    return (
      <div className="space-y-4">
        {/* Header with progress */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--muted)]">
            Kort {currentIndex + 1} av {activeCards.length}
          </div>
          <button
            onClick={handleBack}
            className="text-xs text-[var(--muted)] underline hover:text-[var(--foreground)]"
          >
            ← Avbryt
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-sysdev-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / activeCards.length) * 100}%` }}
          />
        </div>

        {/* The card itself — clickable to flip */}
        <button
          onClick={() => setFlipped(!flipped)}
          className="w-full min-h-[280px] rounded-xl border-2 border-sysdev-300 dark:border-sysdev-700 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/40 dark:to-emerald-950/40 p-8 text-left flex flex-col justify-between transition-all hover:shadow-lg cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-sysdev-600 dark:text-sysdev-400 font-medium">
              {topicInfo.emoji} {topicInfo.label.split(" ")[0]}
            </span>
            <span className="text-[var(--muted)]">{flipped ? "BAKSIDE" : "FORSIDE"}</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-4 my-4">
            <p className={`text-lg leading-relaxed ${flipped ? "text-neutral-800 dark:text-neutral-100" : "text-2xl font-bold text-sysdev-700 dark:text-sysdev-300"}`}>
              {flipped ? card.back : card.front}
            </p>
          </div>
          <p className="text-xs text-center text-[var(--muted)] italic">
            {flipped ? "Klikk for å snu tilbake til forsiden" : "Klikk for å se svaret"}
          </p>
        </button>

        {/* Action buttons */}
        {flipped && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => markCard("practice")}
              className="px-6 py-3 rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 font-bold text-sm hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
            >
              🎯 Øv mer
            </button>
            <button
              onClick={() => markCard("knows")}
              className="px-6 py-3 rounded-lg border-2 border-green-400 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-bold text-sm hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
            >
              ✓ Kan dette
            </button>
          </div>
        )}
        {!flipped && (
          <div className="text-center text-sm text-[var(--muted)]">
            Klikk på kortet for å snu det og se svaret
          </div>
        )}
      </div>
    );
  }

  // Topic selection
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-center">
          <p className="text-2xl font-bold">{overallStats.total}</p>
          <p className="text-xs text-[var(--muted)]">Totalt</p>
        </div>
        <div className="rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{overallStats.new}</p>
          <p className="text-xs text-[var(--muted)]">Ikke sett</p>
        </div>
        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{overallStats.practice}</p>
          <p className="text-xs text-[var(--muted)]">Øv mer</p>
        </div>
        <div className="rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-3 text-center">
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">{overallStats.knows}</p>
          <p className="text-xs text-[var(--muted)]">Kan</p>
        </div>
      </div>

      {/* Topic selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Velg temaer</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTopics(new Set(QUIZ_TOPICS.map((t) => t.id)))}
              className="text-xs px-2 py-1 rounded border border-sysdev-400 text-sysdev-700 dark:text-sysdev-400 hover:bg-sysdev-50 dark:hover:bg-sysdev-950/30"
            >
              Velg alle
            </button>
            <button
              onClick={() => setSelectedTopics(new Set())}
              className="text-xs px-2 py-1 rounded border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            >
              Fjern alle
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {QUIZ_TOPICS.map((t) => {
            const count = cardsPerTopic[t.id] || 0;
            const isSelected = selectedTopics.has(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleTopic(t.id)}
                disabled={count === 0}
                className={`text-left rounded-lg border-2 p-3 text-sm transition-all ${
                  isSelected
                    ? "border-sysdev-500 bg-sysdev-50 dark:bg-sysdev-950/30"
                    : count === 0
                      ? "border-[var(--card-border)] opacity-40 cursor-not-allowed"
                      : "border-[var(--card-border)] hover:border-sysdev-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">
                    {t.emoji} {t.label.split(" ")[0]}
                  </span>
                  {isSelected && <span className="text-sysdev-600 dark:text-sysdev-400">✓</span>}
                </div>
                <p className="text-xs text-[var(--muted)]">{count} kort</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter mode */}
      <div>
        <h3 className="font-bold mb-2">Filtrer kort</h3>
        <div className="grid grid-cols-3 gap-2">
          {(["all", "new", "practice"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${
                filterMode === mode
                  ? "border-sysdev-500 bg-sysdev-50 dark:bg-sysdev-950/30 text-sysdev-700 dark:text-sysdev-400"
                  : "border-[var(--card-border)] hover:border-sysdev-300"
              }`}
            >
              {mode === "all" && "Alle"}
              {mode === "new" && "🆕 Ikke sett"}
              {mode === "practice" && "🎯 Øv mer"}
            </button>
          ))}
        </div>
      </div>

      {/* Start */}
      <button
        onClick={handleStart}
        disabled={selectedTopics.size === 0}
        className="w-full px-6 py-4 rounded-lg bg-sysdev-500 hover:bg-sysdev-600 text-white font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🃏 Start flashcard-økt
      </button>
    </div>
  );
}
