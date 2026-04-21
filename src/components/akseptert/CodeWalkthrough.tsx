"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

export interface Annotation {
  // 1-indexed. Støtter en enkelt linje eller område (from..to).
  line: number;
  toLine?: number;
  title: string;
  explanation: React.ReactNode;
}

interface CodeWalkthroughProps {
  code: string;
  language?: string;
  title?: string;
  annotations: Annotation[];
  source?: "live" | "fallback";
  fullPath?: string;
  highlightOnly?: boolean; // skjul panelet, bare vis markering — sjelden brukt
  initialIndex?: number;
}

const langAccent: Record<string, string> = {
  tsx: "text-akseptert-300",
  ts: "text-akseptert-300",
  typescript: "text-akseptert-300",
  jsx: "text-cyan-300",
  js: "text-yellow-300",
  javascript: "text-yellow-300",
  html: "text-orange-300",
  css: "text-pink-300",
  java: "text-orange-300",
  json: "text-teal-300",
  bash: "text-neutral-300",
};

export default function CodeWalkthrough({
  code,
  language = "tsx",
  title,
  annotations,
  source = "live",
  fullPath,
  initialIndex = 0,
}: CodeWalkthroughProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Bygg en lookup fra linjenummer → annotasjonsindeks
  const lineToAnnotation = useMemo(() => {
    const map = new Map<number, number>();
    annotations.forEach((a, i) => {
      const to = a.toLine ?? a.line;
      for (let l = a.line; l <= to; l++) {
        if (!map.has(l)) map.set(l, i);
      }
    });
    return map;
  }, [annotations]);

  const lines = useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);
  const active = annotations[activeIndex];
  const accent = langAccent[language.toLowerCase()] ?? "text-akseptert-300";

  const containerRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const targetLine = active.line;
    const lineEl = containerRef.current?.querySelector<HTMLElement>(
      `[data-line="${targetLine}"]`,
    );
    lineEl?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex, active]);

  function goTo(idx: number) {
    setActiveIndex(Math.max(0, Math.min(annotations.length - 1, idx)));
  }

  function handleLineClick(line: number) {
    const idx = lineToAnnotation.get(line);
    if (idx !== undefined) setActiveIndex(idx);
  }

  return (
    <div className="rounded-xl border border-akseptert-400/40 overflow-hidden bg-[var(--card)] my-4">
      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-xs font-mono ${accent}`}>
            {title ?? language}
          </span>
          {fullPath && (
            <span className="text-[10px] font-mono text-neutral-500 truncate hidden sm:inline">
              {fullPath.replace(/^.*handverker-ai\//, "handverker-ai/")}
            </span>
          )}
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
            source === "live"
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {source === "live" ? "LIVE (fs)" : "SNAPSHOT"}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_20rem]">
        <pre
          ref={containerRef}
          className="bg-neutral-950 text-neutral-100 py-3 overflow-auto text-[12.5px] leading-relaxed max-h-[560px]"
        >
          <code className="block">
            {lines.map((rawLine, i) => {
              const lineNum = i + 1;
              const annIdx = lineToAnnotation.get(lineNum);
              const isActive = active && active.line === lineNum;
              const isInActive =
                active &&
                lineNum >= active.line &&
                lineNum <= (active.toLine ?? active.line);
              const hasAnnotation = annIdx !== undefined;

              return (
                <span
                  key={i}
                  data-line={lineNum}
                  onClick={() => hasAnnotation && handleLineClick(lineNum)}
                  className={`flex transition-colors ${
                    isInActive
                      ? "bg-akseptert-500/20 border-l-[3px] border-akseptert-400"
                      : hasAnnotation
                        ? "border-l-[3px] border-akseptert-400/30 hover:bg-akseptert-500/10 cursor-pointer"
                        : "border-l-[3px] border-transparent"
                  }`}
                >
                  <span
                    className={`inline-block w-12 text-right pr-3 select-none shrink-0 font-mono ${
                      isActive ? "text-akseptert-300 font-bold" : "text-neutral-600"
                    }`}
                  >
                    {hasAnnotation && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-akseptert-400 mr-1" />
                    )}
                    {lineNum}
                  </span>
                  <span className="pr-4 whitespace-pre">
                    {rawLine === "" ? " " : rawLine}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>

        {/* Explanation panel */}
        <aside className="border-l border-akseptert-400/30 bg-gradient-to-br from-akseptert-50/80 to-indigo-50/40 dark:from-akseptert-950/40 dark:to-indigo-950/20 p-4 flex flex-col">
          {active ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wide text-akseptert-600 dark:text-akseptert-300">
                  Forklaring {activeIndex + 1} / {annotations.length}
                </span>
                <span className="text-[10px] font-mono text-[var(--muted)]">
                  linje {active.line}
                  {active.toLine && active.toLine !== active.line
                    ? `–${active.toLine}`
                    : ""}
                </span>
              </div>
              <h4 className="font-bold text-sm text-akseptert-700 dark:text-akseptert-200 mb-2">
                {active.title}
              </h4>
              <div className="flex-1 text-sm text-[var(--foreground)]/90 leading-relaxed space-y-2 overflow-y-auto max-h-[440px] pr-1">
                {active.explanation}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-akseptert-400/30">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="text-xs px-2.5 py-1 rounded border border-[var(--card-border)] disabled:opacity-40 hover:bg-akseptert-100 dark:hover:bg-akseptert-900/40"
                >
                  ← Forrige
                </button>
                <span className="text-[10px] text-[var(--muted)]">
                  klikk en blå linje
                </span>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === annotations.length - 1}
                  className="text-xs px-2.5 py-1 rounded bg-akseptert-500 hover:bg-akseptert-600 text-white disabled:opacity-40"
                >
                  Neste →
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              Klikk en uthevet linje for å se en forklaring.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
