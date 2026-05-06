"use client";

import { useState } from "react";

/* ── Collapsible section ── */
export function Section({
  title,
  badge,
  badgeColor = "sysdev",
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    sysdev:
      "bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base">{title}</span>
            {badge && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[badgeColor] ?? colors.sysdev}`}
              >
                {badge}
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

/* ── Code block ── */
export function Code({ code, lang = "java" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative rounded-lg bg-neutral-900 dark:bg-neutral-950 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800/60 border-b border-neutral-700">
        <span className="text-xs font-mono text-neutral-400">{lang}</span>
        <button
          onClick={copy}
          className="text-xs text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? "Kopiert!" : "Kopier"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Show/hide solution ── */
export function Solution({
  children,
  label = "Vis løsning",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow((s) => !s)}
        className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline"
      >
        {show ? "Skjul løsning" : label}
      </button>
      {show && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

/* ── Multiple choice question ── */
export function MCQ({
  q,
  options,
  correct,
  explanation,
}: {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
      <p className="text-sm font-medium mb-3">{q}</p>
      <div className="space-y-1.5">
        {options.map((opt, i) => (
          <div
            key={i}
            className={`text-sm rounded-lg px-3 py-2 border transition-colors ${
              revealed && i === correct
                ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-medium"
                : "border-transparent bg-neutral-50 dark:bg-neutral-800/50 text-[var(--muted)]"
            }`}
          >
            <span className="font-mono text-xs mr-2">
              {String.fromCharCode(97 + i)})
            </span>
            {opt}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => setRevealed((r) => !r)}
          className="text-xs font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline"
        >
          {revealed ? "Skjul svar" : "Vis svar"}
        </button>
        {revealed && explanation && (
          <span className="text-xs text-[var(--muted)]">{explanation}</span>
        )}
      </div>
    </div>
  );
}
