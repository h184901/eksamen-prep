"use client";

import { useState } from "react";
import type { QuizTopic } from "@/lib/quiz-types";
import { QUIZ_TOPICS } from "@/lib/quiz-types";

interface TopicSelectorProps {
  /** Antall spørsmål per tema */
  questionCount: Record<QuizTopic, number>;
  /** Kalles når brukeren klikker "Start" */
  onStart: (selectedTopics: QuizTopic[], options: { onlyRealExams: boolean; targetCount: number; shuffle: boolean }) => void;
  /** Skjul "kun ekte eksamen"-toggle (for sider som ikke har generated questions) */
  hideRealExamToggle?: boolean;
}

const TOPIC_GROUPS = [
  { label: "Oppgave 1 — Modellering (40%)", number: 1, color: "rose" },
  { label: "Oppgave 2 — OOA og OOD (20%)", number: 2, color: "violet" },
  { label: "Oppgave 3 — Utviklingsmetode (20%)", number: 3, color: "blue" },
  { label: "Oppgave 4 — OOP / Java fra UML (20%)", number: 4, color: "red" },
] as const;

export default function TopicSelector({ questionCount, onStart, hideRealExamToggle = false }: TopicSelectorProps) {
  const [selected, setSelected] = useState<Set<QuizTopic>>(new Set());
  const [onlyRealExams, setOnlyRealExams] = useState(false);
  const [targetCount, setTargetCount] = useState(15);
  const [shuffle, setShuffle] = useState(true);

  const toggleTopic = (topic: QuizTopic) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(QUIZ_TOPICS.map((t) => t.id)));
  const selectNone = () => setSelected(new Set());
  const selectGroup = (groupNumber: number) => {
    const groupTopics = QUIZ_TOPICS.filter((t) => t.examQuestionNumber === groupNumber).map((t) => t.id);
    setSelected((prev) => {
      const next = new Set(prev);
      const allSelected = groupTopics.every((t) => next.has(t));
      if (allSelected) {
        groupTopics.forEach((t) => next.delete(t));
      } else {
        groupTopics.forEach((t) => next.add(t));
      }
      return next;
    });
  };

  const totalAvailable = Array.from(selected).reduce((sum, t) => sum + (questionCount[t] || 0), 0);

  return (
    <div className="space-y-6">
      {/* Hurtigvalg */}
      <div className="flex flex-wrap gap-2">
        <button onClick={selectAll} className="px-3 py-1.5 rounded-lg text-sm border border-sysdev-400 text-sysdev-700 dark:text-sysdev-400 hover:bg-sysdev-50 dark:hover:bg-sysdev-950/30">
          Velg alle
        </button>
        <button onClick={selectNone} className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
          Fjern alle
        </button>
        {TOPIC_GROUPS.map((g) => (
          <button
            key={g.number}
            onClick={() => selectGroup(g.number)}
            className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
          >
            Oppgave {g.number}
          </button>
        ))}
      </div>

      {/* Topics gruppert per eksamenoppgave */}
      <div className="space-y-5">
        {TOPIC_GROUPS.map((group) => {
          const topicsInGroup = QUIZ_TOPICS.filter((t) => t.examQuestionNumber === group.number);
          return (
            <div key={group.number}>
              <h3 className="text-sm font-bold text-[var(--muted)] uppercase tracking-wider mb-3">{group.label}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topicsInGroup.map((topic) => {
                  const isSelected = selected.has(topic.id);
                  const count = questionCount[topic.id] || 0;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      disabled={count === 0}
                      className={`text-left rounded-lg border-2 p-4 transition-all ${
                        isSelected
                          ? "border-sysdev-500 bg-sysdev-50 dark:bg-sysdev-950/30"
                          : count === 0
                            ? "border-[var(--card-border)] opacity-40 cursor-not-allowed"
                            : "border-[var(--card-border)] hover:border-sysdev-300 hover:bg-sysdev-50/30 dark:hover:bg-sysdev-950/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{topic.emoji}</span>
                          <span className="font-bold text-sm">{topic.label}</span>
                        </div>
                        {isSelected && <span className="text-sysdev-600 dark:text-sysdev-400">✓</span>}
                      </div>
                      <p className="text-xs text-[var(--muted)] mb-2">{topic.description}</p>
                      <p className={`text-xs font-medium ${count === 0 ? "text-red-500" : "text-sysdev-600 dark:text-sysdev-400"}`}>
                        {count === 0 ? "Ingen spørsmål ennå" : `${count} spørsmål tilgjengelig`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Innstillinger */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
        <h3 className="font-bold">Innstillinger</h3>

        <div>
          <label className="block text-sm font-medium mb-2">
            Antall spørsmål: <span className="font-bold">{targetCount}</span>
            <span className="text-xs text-[var(--muted)] ml-2">
              (av {totalAvailable} tilgjengelige fra valgte temaer)
            </span>
          </label>
          <input
            type="range"
            min={5}
            max={Math.max(50, totalAvailable)}
            step={5}
            value={targetCount}
            onChange={(e) => setTargetCount(Number(e.target.value))}
            className="w-full accent-sysdev-500"
          />
          <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
            <span>5</span>
            <span>{Math.max(50, totalAvailable)}</span>
          </div>
        </div>

        {!hideRealExamToggle && (
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={onlyRealExams}
              onChange={(e) => setOnlyRealExams(e.target.checked)}
              className="accent-sysdev-500"
            />
            <span>Bare ekte eksamensspørsmål (V2023+, høyest relevans)</span>
          </label>
        )}

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className="accent-sysdev-500"
          />
          <span>Shuffle spørsmål og svaralternativer (anbefalt)</span>
        </label>
      </div>

      {/* Start */}
      <button
        onClick={() =>
          onStart(Array.from(selected), { onlyRealExams, targetCount, shuffle })
        }
        disabled={selected.size === 0 || totalAvailable === 0}
        className="w-full px-6 py-4 rounded-lg bg-sysdev-500 hover:bg-sysdev-600 text-white font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {selected.size === 0
          ? "Velg minst ett tema for å starte"
          : `🚀 Start quiz (${Math.min(targetCount, totalAvailable)} spørsmål)`}
      </button>
    </div>
  );
}
