"use client";

import { useMemo, useState } from "react";
import type { DAT110QuizSourceKind, VaultTema } from "@/lib/dat110-quiz-types";
import { QUIZ_TOPICS_DAT110, localizeQuizTopic } from "@/lib/dat110-quiz-topics";
import type { Dat110Lang } from "@/lib/dat110-language/useDat110Lang";
import { quizUi } from "@/lib/dat110-language/quiz-i18n";

export interface QuizStartOptions {
  selectedTopics: VaultTema[];
  sourceFilter: Set<DAT110QuizSourceKind>;
  targetCount: number;
  shuffle: boolean;
  allOrNothing: boolean;
}

interface Props {
  questionCountByTopic: Record<string, number>;
  questionCountBySource: Record<DAT110QuizSourceKind, number>;
  questionCountByTopicSource: Record<
    string,
    Record<DAT110QuizSourceKind, number>
  >;
  onStart: (opts: QuizStartOptions) => void;
  lang: Dat110Lang;
}

// Exam-task weights — language-neutral. Titles come from quizUi().oppgTitles.
const OPPG_WEIGHTS: Record<number, string> = {
  1: "10%",
  3: "10%",
  5: "10%",
  6: "10%",
  7: "5%",
  8: "10%",
  9: "10%",
  10: "15%",
};

const SOURCE_LABEL_KEY: Record<
  DAT110QuizSourceKind,
  "sourceExam" | "sourceCanvas" | "sourceGenerated"
> = {
  exam: "sourceExam",
  canvas: "sourceCanvas",
  generated: "sourceGenerated",
};

export default function TopicSelector({
  questionCountByTopic,
  questionCountBySource,
  questionCountByTopicSource,
  onStart,
  lang,
}: Props) {
  const ui = quizUi(lang);
  const [selectedTopics, setSelectedTopics] = useState<Set<VaultTema>>(
    new Set()
  );
  const [sourceFilter, setSourceFilter] = useState<Set<DAT110QuizSourceKind>>(
    () => {
      const s = new Set<DAT110QuizSourceKind>();
      // Default: enable any source that has >= 1 question.
      (["exam", "canvas", "generated"] as const).forEach((k) => {
        if ((questionCountBySource[k] || 0) > 0) s.add(k);
      });
      return s;
    }
  );
  const [shuffle, setShuffle] = useState(true);
  const [allOrNothing, setAllOrNothing] = useState(true);

  // Groups: oppgave-nummer → temaer. Hide groups whose temaer have 0 questions.
  const groups = useMemo(() => {
    const byOppg = new Map<number, typeof QUIZ_TOPICS_DAT110>();
    for (const t of QUIZ_TOPICS_DAT110) {
      const arr = byOppg.get(t.examQuestionNumber) ?? [];
      arr.push(t);
      byOppg.set(t.examQuestionNumber, arr);
    }
    return [...byOppg.entries()]
      .sort(([a], [b]) => a - b)
      .map(([oppg, temaer]) => ({ oppg, temaer }));
  }, []);

  // Count only questions matching BOTH the selected topics AND the selected
  // sources — so the number matches the actual quiz pool the engine builds.
  const totalAvailable = useMemo(() => {
    let sum = 0;
    for (const t of selectedTopics) {
      const bySrc = questionCountByTopicSource[t];
      if (!bySrc) continue;
      for (const k of sourceFilter) sum += bySrc[k] || 0;
    }
    return sum;
  }, [selectedTopics, sourceFilter, questionCountByTopicSource]);

  const [targetCount, setTargetCount] = useState(10);

  const toggleTopic = (id: VaultTema) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    const all = new Set<VaultTema>();
    QUIZ_TOPICS_DAT110.forEach((t) => {
      if ((questionCountByTopic[t.id] || 0) > 0) all.add(t.id);
    });
    setSelectedTopics(all);
  };

  const selectNone = () => setSelectedTopics(new Set());

  const selectTier1 = () => {
    const tier1 = new Set<VaultTema>();
    QUIZ_TOPICS_DAT110.forEach((t) => {
      if (t.tier === 1 && (questionCountByTopic[t.id] || 0) > 0)
        tier1.add(t.id);
    });
    setSelectedTopics(tier1);
  };

  const selectGroup = (oppg: number) => {
    const inGroup = QUIZ_TOPICS_DAT110.filter(
      (t) =>
        t.examQuestionNumber === oppg && (questionCountByTopic[t.id] || 0) > 0
    ).map((t) => t.id);
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      const allSet = inGroup.every((id) => next.has(id));
      if (allSet) inGroup.forEach((id) => next.delete(id));
      else inGroup.forEach((id) => next.add(id));
      return next;
    });
  };

  const toggleSource = (k: DAT110QuizSourceKind) => {
    setSourceFilter((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const canStart = selectedTopics.size > 0 && totalAvailable > 0;
  const effectiveCount = Math.min(targetCount, totalAvailable || 5);
  const maxSlider = Math.max(50, totalAvailable);

  return (
    <div className="space-y-6">
      {/* Hurtigvalg */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={selectAll}
          className="px-3 py-1.5 rounded-lg text-sm border border-network-400 text-network-700 dark:text-network-300 hover:bg-network-50 dark:hover:bg-network-950/30"
        >
          {ui.selectAllTopics}
        </button>
        <button
          type="button"
          onClick={selectNone}
          className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
        >
          {ui.clearAll}
        </button>
        <button
          type="button"
          onClick={selectTier1}
          className="px-3 py-1.5 rounded-lg text-sm border border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
        >
          {ui.coreTopics}
        </button>
        {groups.map(({ oppg }) => (
          <button
            key={`g-${oppg}`}
            type="button"
            onClick={() => selectGroup(oppg)}
            className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            {ui.groupShort(oppg)}
          </button>
        ))}
      </div>

      {/* Topic groups */}
      <div className="space-y-5">
        {groups.map(({ oppg, temaer }) => {
          const title = ui.oppgTitles[oppg];
          const weight = OPPG_WEIGHTS[oppg];
          return (
            <div key={oppg}>
              <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-3">
                {ui.groupHeading(oppg)}
                {title ? ` — ${title}${weight ? ` (${weight})` : ""}` : ""}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {temaer.map((base) => {
                  const t = localizeQuizTopic(base, lang);
                  const count = questionCountByTopic[t.id] || 0;
                  const isSelected = selectedTopics.has(t.id);
                  const disabled = count === 0;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => !disabled && toggleTopic(t.id)}
                      disabled={disabled}
                      className={[
                        "text-left rounded-lg border-2 p-4 transition-all",
                        isSelected
                          ? "border-network-500 bg-network-50 dark:bg-network-950/30"
                          : disabled
                            ? "border-neutral-200 dark:border-neutral-800 opacity-40 cursor-not-allowed"
                            : "border-neutral-300 dark:border-neutral-700 hover:border-network-300 hover:bg-network-50/30 dark:hover:bg-network-950/10",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg flex-shrink-0">
                            {t.emoji}
                          </span>
                          <span className="font-bold text-sm text-neutral-900 dark:text-neutral-50">
                            {t.label}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-network-600 dark:text-network-300 flex-shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-2">
                        {t.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p
                          className={
                            disabled
                              ? "text-xs text-neutral-500"
                              : "text-xs font-medium text-network-600 dark:text-network-300"
                          }
                        >
                          {disabled
                            ? ui.noQuestionsYet
                            : ui.questionsAvailable(count)}
                        </p>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {t.chapterTag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Innstillinger */}
      <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-neutral-50">
          {ui.settings}
        </h3>

        {/* Antall */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-200">
            {ui.numberOfQuestionsLabel}{" "}
            <span className="font-bold">{effectiveCount}</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
              {ui.ofAvailable(totalAvailable)}
            </span>
          </label>
          <input
            type="range"
            min={5}
            max={maxSlider}
            step={1}
            value={targetCount}
            onChange={(e) => setTargetCount(Number(e.target.value))}
            className="w-full accent-network-500"
          />
          <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            <span>5</span>
            <span>{maxSlider}</span>
          </div>
        </div>

        {/* Kildefilter */}
        <div>
          <p className="text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-200">
            {ui.source}
          </p>
          <div className="space-y-1.5">
            {(["exam", "canvas", "generated"] as const).map((k) => {
              const count = questionCountBySource[k] || 0;
              const disabled = count === 0;
              const checked = sourceFilter.has(k);
              return (
                <label
                  key={k}
                  className={[
                    "flex items-center gap-2 text-sm",
                    disabled
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleSource(k)}
                    className="accent-network-500"
                  />
                  <span className="text-neutral-800 dark:text-neutral-100">
                    {ui[SOURCE_LABEL_KEY[k]]}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {ui.available(count)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Shuffle + all-or-nothing */}
        <label className="flex items-center gap-2 text-sm cursor-pointer text-neutral-800 dark:text-neutral-100">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className="accent-network-500"
          />
          <span>{ui.shuffleOption}</span>
        </label>

        <label className="flex items-center gap-2 text-sm cursor-pointer text-neutral-800 dark:text-neutral-100">
          <input
            type="checkbox"
            checked={allOrNothing}
            onChange={(e) => setAllOrNothing(e.target.checked)}
            className="accent-network-500"
          />
          <span>{ui.allOrNothingOption}</span>
        </label>
      </div>

      {/* Start */}
      <button
        type="button"
        onClick={() =>
          onStart({
            selectedTopics: [...selectedTopics],
            sourceFilter: new Set(sourceFilter),
            targetCount: effectiveCount,
            shuffle,
            allOrNothing,
          })
        }
        disabled={!canStart}
        className="w-full px-6 py-4 rounded-lg bg-network-500 hover:bg-network-600 text-white font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {selectedTopics.size === 0
          ? ui.startSelectTopic
          : totalAvailable === 0
            ? ui.startNoQuestions
            : ui.startQuiz(effectiveCount)}
      </button>
    </div>
  );
}
