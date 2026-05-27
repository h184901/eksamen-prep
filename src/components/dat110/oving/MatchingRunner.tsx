"use client";

import { useEffect, useMemo, useState } from "react";
import type { MatchingPair } from "./matching-types";
import {
  QUIZ_TOPICS_DAT110,
  TOPIC_COLOR_PILL,
} from "@/lib/dat110-quiz-topics";
import type { VaultTema } from "@/lib/dat110-vault/types";
import LearnMoreLinks from "@/components/dat110/LearnMoreLinks";

type Phase = "select" | "running" | "done";

interface Props {
  pairs: MatchingPair[];
}

// Fisher-Yates shuffle.
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Match-status per pair-id i en runde.
type PairStatus = "pending" | "matched" | "wrong";

interface RoundState {
  pairs: MatchingPair[];
  /** Status per left-id. */
  leftStatus: Map<string, PairStatus>;
  /** Status per right-id. */
  rightStatus: Map<string, PairStatus>;
  /** Antall riktige svar i første forsøk per pair-id. */
  firstTryCorrect: Set<string>;
  /** Totalt antall feile forsøk gjennom runden. */
  wrongAttempts: number;
}

export default function MatchingRunner({ pairs }: Props) {
  const allTopics = useMemo(() => {
    const present = new Set<VaultTema>();
    pairs.forEach((p) => present.add(p.topic));
    return QUIZ_TOPICS_DAT110.filter((t) => present.has(t.id));
  }, [pairs]);

  const pairCountByTopic = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of pairs) m[p.topic] = (m[p.topic] || 0) + 1;
    return m;
  }, [pairs]);

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedTopics, setSelectedTopics] = useState<Set<VaultTema>>(
    () => new Set(allTopics.map((t) => t.id))
  );
  const [roundSize, setRoundSize] = useState(8);
  const [round, setRound] = useState<RoundState | null>(null);
  const [rightOrder, setRightOrder] = useState<MatchingPair[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    kind: "correct" | "wrong";
    pair: MatchingPair;
  } | null>(null);
  // ID for siste «wrong»-par så vi kan tilbakestille markering etter en kort visning.
  const [shakeId, setShakeId] = useState<string | null>(null);

  const matchedCount = useMemo(() => {
    if (!round) return 0;
    let n = 0;
    round.leftStatus.forEach((s) => {
      if (s === "matched") n += 1;
    });
    return n;
  }, [round]);

  // Auto-clear shake (wrong) markering etter 700ms.
  useEffect(() => {
    if (!shakeId) return;
    const t = setTimeout(() => setShakeId(null), 700);
    return () => clearTimeout(t);
  }, [shakeId]);

  // Auto-clear feedback (riktig/feil banner) etter 1800ms.
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 1800);
    return () => clearTimeout(t);
  }, [feedback]);

  // Når alle matchet → gå til done-fasen.
  useEffect(() => {
    if (!round) return;
    if (matchedCount === round.pairs.length && round.pairs.length > 0) {
      const t = setTimeout(() => setPhase("done"), 600);
      return () => clearTimeout(t);
    }
  }, [matchedCount, round]);

  const filteredPool = useMemo(() => {
    return pairs.filter((p) => selectedTopics.has(p.topic));
  }, [pairs, selectedTopics]);

  const effectiveSize = Math.min(roundSize, filteredPool.length || roundSize);
  const canStart = filteredPool.length > 0;

  const handleStart = () => {
    const chosen = shuffle(filteredPool).slice(0, effectiveSize);
    const leftStatus = new Map<string, PairStatus>();
    const rightStatus = new Map<string, PairStatus>();
    chosen.forEach((p) => {
      leftStatus.set(p.id, "pending");
      rightStatus.set(p.id, "pending");
    });
    setRound({
      pairs: chosen,
      leftStatus,
      rightStatus,
      firstTryCorrect: new Set(),
      wrongAttempts: 0,
    });
    setRightOrder(shuffle(chosen));
    setSelectedLeftId(null);
    setFeedback(null);
    setShakeId(null);
    setPhase("running");
  };

  const handleBack = () => {
    setRound(null);
    setSelectedLeftId(null);
    setFeedback(null);
    setShakeId(null);
    setPhase("select");
  };

  const handleRetry = () => {
    // Ny runde med samme størrelse og topic-utvalg.
    handleStart();
  };

  const handleClickLeft = (pairId: string) => {
    if (!round) return;
    if (round.leftStatus.get(pairId) === "matched") return;
    setSelectedLeftId((prev) => (prev === pairId ? null : pairId));
  };

  const handleClickRight = (pairId: string) => {
    if (!round) return;
    if (!selectedLeftId) return;
    if (round.rightStatus.get(pairId) === "matched") return;

    const leftId = selectedLeftId;
    const pair = round.pairs.find((p) => p.id === leftId);
    if (!pair) return;

    if (leftId === pairId) {
      // Riktig match.
      const newLeft = new Map(round.leftStatus);
      const newRight = new Map(round.rightStatus);
      newLeft.set(leftId, "matched");
      newRight.set(pairId, "matched");
      const firstTry = new Set(round.firstTryCorrect);
      // Førsteforsøk-riktig = ingen wrong-status i runden for denne pair-id.
      // Vi sporer via en separat counter; her: hvis ikke tidligere markert wrong, ok.
      // Bruk shakeId-historikk er ikke pålitelig — i stedet sjekk om left/right tidligere var "wrong".
      if (
        round.leftStatus.get(leftId) !== "wrong" &&
        round.rightStatus.get(pairId) !== "wrong"
      ) {
        firstTry.add(leftId);
      }
      setRound({
        ...round,
        leftStatus: newLeft,
        rightStatus: newRight,
        firstTryCorrect: firstTry,
      });
      setFeedback({ kind: "correct", pair });
      setSelectedLeftId(null);
    } else {
      // Feil match — marker begge midlertidig.
      const newLeft = new Map(round.leftStatus);
      const newRight = new Map(round.rightStatus);
      newLeft.set(leftId, "wrong");
      newRight.set(pairId, "wrong");
      setRound({
        ...round,
        leftStatus: newLeft,
        rightStatus: newRight,
        wrongAttempts: round.wrongAttempts + 1,
      });
      setFeedback({ kind: "wrong", pair });
      setShakeId(`${leftId}|${pairId}`);
      setSelectedLeftId(null);

      // Etter 700ms tilbakestill wrong → pending så brukeren kan prøve igjen.
      setTimeout(() => {
        setRound((curr) => {
          if (!curr) return curr;
          const l = new Map(curr.leftStatus);
          const r = new Map(curr.rightStatus);
          if (l.get(leftId) === "wrong") l.set(leftId, "pending");
          if (r.get(pairId) === "wrong") r.set(pairId, "pending");
          return { ...curr, leftStatus: l, rightStatus: r };
        });
      }, 700);
    }
  };

  const toggleTopic = (id: VaultTema) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllTopics = () =>
    setSelectedTopics(new Set(allTopics.map((t) => t.id)));
  const clearTopics = () => setSelectedTopics(new Set());

  // ----- Render -----------------------------------------------------------

  if (phase === "select") {
    return (
      <div className="space-y-6">
        {/* Hurtigvalg */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={selectAllTopics}
            className="px-3 py-1.5 rounded-lg text-sm border border-purple-400 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30"
          >
            Velg alle temaer
          </button>
          <button
            type="button"
            onClick={clearTopics}
            className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            Fjern alle
          </button>
        </div>

        {/* Topic-piller */}
        <div>
          <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-3">
            Temaer
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTopics.map((t) => {
              const count = pairCountByTopic[t.id] || 0;
              const isSelected = selectedTopics.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTopic(t.id)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm transition-all",
                    isSelected
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-neutral-900 dark:text-neutral-50"
                      : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:border-purple-300 hover:bg-purple-50/40 dark:hover:bg-purple-950/10",
                  ].join(" ")}
                >
                  <span aria-hidden>{t.emoji}</span>
                  <span className="font-semibold">{t.label}</span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${TOPIC_COLOR_PILL[t.color]}`}
                  >
                    {count}
                  </span>
                  {isSelected && (
                    <span
                      className="text-purple-600 dark:text-purple-300"
                      aria-hidden
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Innstillinger */}
        <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 space-y-4">
          <h3 className="font-bold text-neutral-900 dark:text-neutral-50">
            Innstillinger
          </h3>
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-200">
              Par per runde:{" "}
              <span className="font-bold">{effectiveSize}</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
                (av {filteredPool.length} tilgjengelige i utvalget)
              </span>
            </label>
            <input
              type="range"
              min={4}
              max={Math.max(10, Math.min(12, filteredPool.length || 10))}
              step={1}
              value={roundSize}
              onChange={(e) => setRoundSize(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>4</span>
              <span>{Math.max(10, Math.min(12, filteredPool.length || 10))}</span>
            </div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Tips: hold rundene små (6–8 par) — det er lettere å spotte
            confusables når begge sider får plass på skjermen.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStart}
          disabled={!canStart}
          className="w-full px-6 py-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!canStart
            ? "Velg minst ett tema for å starte"
            : `🔗 Start runde (${effectiveSize} par)`}
        </button>
      </div>
    );
  }

  if (phase === "done" && round) {
    const total = round.pairs.length;
    const firstTry = round.firstTryCorrect.size;
    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50/60 dark:bg-purple-950/20 p-6 text-center">
          <p className="text-sm uppercase tracking-wider text-purple-700 dark:text-purple-300 font-bold mb-2">
            Runde fullført
          </p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            {firstTry} / {total} riktig på første forsøk
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">
            Totalt {round.wrongAttempts} feilaktige forsøk underveis.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5">
          <h3 className="font-bold mb-3 text-neutral-900 dark:text-neutral-50">
            Repetér parene fra runden
          </h3>
          <ul className="space-y-3">
            {round.pairs.map((p) => (
              <li
                key={p.id}
                className="border-l-4 border-purple-300 dark:border-purple-700 pl-3"
              >
                <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">
                  {p.left}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-200">
                  {p.right}
                </p>
                {p.learnMoreLinks && p.learnMoreLinks.length > 0 && (
                  <LearnMoreLinks links={p.learnMoreLinks} label="Les mer" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="flex-1 min-w-[12rem] px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold text-sm transition-colors"
          >
            🔄 Ny runde
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 min-w-[12rem] px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 font-semibold text-sm transition-colors"
          >
            ← Tilbake til temavalg
          </button>
        </div>
      </div>
    );
  }

  if (phase === "running" && round) {
    return (
      <div className="space-y-4">
        {/* Progress + score */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{
                width: `${(matchedCount / round.pairs.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-300 font-medium whitespace-nowrap">
            Matchet:{" "}
            <span className="font-bold text-purple-700 dark:text-purple-300">
              {matchedCount}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {" "}
              / {round.pairs.length}
            </span>
          </div>
        </div>

        {/* Feedback banner — kort flash */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={
              feedback.kind === "correct"
                ? "rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-3 text-sm text-green-900 dark:text-green-100"
                : "rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-3 text-sm text-red-900 dark:text-red-100"
            }
          >
            {feedback.kind === "correct" ? (
              <>
                ✓ Riktig — <strong>{feedback.pair.left}</strong>
              </>
            ) : (
              <>✗ Ikke helt — prøv en annen kombinasjon.</>
            )}
          </div>
        )}

        {/* Instruksjon */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Trykk på et begrep til venstre, så på definisjonen til høyre som
          passer. Riktig par blir grønt; feil par tilbakestilles automatisk.
        </p>

        {/* To-kolonne layout. På mobil: stacked. */}
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Venstre — begreper */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              Begrep
            </h3>
            {round.pairs.map((p) => {
              const status = round.leftStatus.get(p.id) ?? "pending";
              const isSelected = selectedLeftId === p.id;
              const isMatched = status === "matched";
              const isWrong = status === "wrong";

              let classes =
                "w-full text-left px-3 py-3 rounded-lg border-2 text-sm transition-all flex items-start gap-2 ";
              if (isMatched) {
                classes +=
                  "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 cursor-default";
              } else if (isWrong) {
                classes +=
                  "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 cursor-default";
              } else if (isSelected) {
                classes +=
                  "border-purple-500 bg-purple-50 dark:bg-purple-950/30 cursor-pointer";
              } else {
                classes +=
                  "border-neutral-300 dark:border-neutral-700 hover:border-purple-400 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 cursor-pointer";
              }

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleClickLeft(p.id)}
                  disabled={isMatched}
                  className={classes}
                  aria-pressed={isSelected}
                >
                  <span className="flex-1 font-semibold text-neutral-900 dark:text-neutral-50">
                    {p.left}
                  </span>
                  {isMatched && (
                    <span
                      aria-hidden
                      className="text-green-600 dark:text-green-400 text-lg flex-shrink-0"
                    >
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span
                      aria-hidden
                      className="text-red-600 dark:text-red-400 text-lg flex-shrink-0"
                    >
                      ✗
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Høyre — definisjoner (shuffled) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
              Definisjon
            </h3>
            {rightOrder.map((p) => {
              const status = round.rightStatus.get(p.id) ?? "pending";
              const isMatched = status === "matched";
              const isWrong = status === "wrong";
              const canPick =
                selectedLeftId !== null && !isMatched && !isWrong;

              let classes =
                "w-full text-left px-3 py-3 rounded-lg border-2 text-sm transition-all flex items-start gap-2 ";
              if (isMatched) {
                classes +=
                  "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30 cursor-default";
              } else if (isWrong) {
                classes +=
                  "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 cursor-default";
              } else if (canPick) {
                classes +=
                  "border-neutral-300 dark:border-neutral-700 hover:border-purple-400 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 cursor-pointer";
              } else {
                classes +=
                  "border-neutral-300 dark:border-neutral-700 opacity-70 cursor-not-allowed";
              }

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleClickRight(p.id)}
                  disabled={isMatched || !selectedLeftId}
                  className={classes}
                >
                  <span className="flex-1 text-neutral-800 dark:text-neutral-100 leading-snug">
                    {p.right}
                  </span>
                  {isMatched && (
                    <span
                      aria-hidden
                      className="text-green-600 dark:text-green-400 text-lg flex-shrink-0"
                    >
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span
                      aria-hidden
                      className="text-red-600 dark:text-red-400 text-lg flex-shrink-0"
                    >
                      ✗
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleBack}
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline"
        >
          ← Avbryt og tilbake til temavalg
        </button>
      </div>
    );
  }

  return null;
}
