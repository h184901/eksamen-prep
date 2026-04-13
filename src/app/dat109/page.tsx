"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { topics, type Topic } from "@/lib/dat109-topics";

function useTopicProgress(topic: Topic) {
  const [completed, setCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);
  const total = topic.sectionCount;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(`progress-dat109-${topic.id}`);
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        setCompleted(Array.isArray(arr) ? arr.length : 0);
      } catch {
        // ignore
      }
    }
  }, [topic.id]);

  if (!mounted || total === 0)
    return { completed: 0, total, percent: 0, mounted };

  const percent = Math.round((completed / total) * 100);
  return { completed, total, percent, mounted: true };
}

const iconMap: Record<string, React.ReactNode> = {
  diagram: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  layers: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
    </svg>
  ),
  cycle: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  clipboard: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function TopicCard({ topic }: { topic: Topic }) {
  const { completed, total, percent, mounted } = useTopicProgress(topic);

  return (
    <Link
      href={`/dat109/${topic.slug}`}
      className="group rounded-xl border-2 border-sysdev-500/30 hover:border-sysdev-500/60 bg-[var(--card)] p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-600 dark:text-sysdev-400 flex items-center justify-center">
          {iconMap[topic.icon]}
        </div>
        {topic.weight && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400">
            {topic.weight}
          </span>
        )}
      </div>
      <h3 className="font-bold text-lg mb-1 group-hover:text-sysdev-600 dark:group-hover:text-sysdev-400 transition-colors">
        {topic.title}
      </h3>
      <p className="text-sm text-[var(--muted)] mb-4">{topic.description}</p>

      {total > 0 && (
        <>
          <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-sysdev-500 transition-all duration-500"
              style={{ width: mounted ? `${percent}%` : "0%" }}
            />
          </div>
          {mounted && (
            <p className="text-[11px] text-[var(--muted)] mt-1">
              {completed}/{total} seksjoner fullført
            </p>
          )}
        </>
      )}
    </Link>
  );
}

export default function DAT109Page() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">DAT109 Systemutvikling</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">DAT109 Systemutvikling</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Objektorientert analyse og design, UML-modellering, smidige
          utviklingsmetoder og Java-programmering fra UML-diagrammer.
        </p>
      </div>

      {/* Eksamenformat */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mb-10">
        <h2 className="font-bold text-lg mb-3 text-sysdev-700 dark:text-sysdev-400">
          Eksamenformat
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Skriftlig eksamen med 4 oppgaver. Fra 2023 er oppgave 2 og 3
          flervalg. Oppgave 1 (modellering) og 4 (Java fra UML) er alltid
          samme type.
        </p>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { label: "Oppgave 1", topic: "Modellering", pct: "40%" },
            { label: "Oppgave 2", topic: "OOA/OOD", pct: "20%" },
            { label: "Oppgave 3", topic: "Utviklingsmetode", pct: "20%" },
            { label: "Oppgave 4", topic: "OOP (Java)", pct: "20%" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-sysdev-200 dark:border-sysdev-800/40 p-3 text-center"
            >
              <p className="text-xs font-medium text-[var(--muted)] mb-1">
                {item.label}
              </p>
              <p className="font-bold text-sm">{item.topic}</p>
              <p className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mt-1">
                {item.pct}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emner */}
      <h2 className="text-xl font-bold mb-4">Emner</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {topics.slice(0, 4).map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Verktøy */}
      <h2 className="text-xl font-bold mb-4">Verktøy</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {topics.slice(4).map((topic) => (
          <Link
            key={topic.id}
            href={`/dat109/${topic.slug}`}
            className={`group relative overflow-hidden rounded-xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
              topic.id === "oppsummering"
                ? "border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20"
                : "border-red-400/40 hover:border-red-400/80 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/20"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  topic.id === "oppsummering"
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                }`}
              >
                {iconMap[topic.icon]}
              </div>
              <h3
                className={`font-bold text-lg transition-colors ${
                  topic.id === "oppsummering"
                    ? "group-hover:text-amber-600 dark:group-hover:text-amber-400"
                    : "group-hover:text-red-600 dark:group-hover:text-red-400"
                }`}
              >
                {topic.title}
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)]">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
