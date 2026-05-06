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
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
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
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[badgeColor]}`}
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

/* ── Exam question ── */
export function ExamQuestion({
  year,
  title,
  description,
  code,
  note,
}: {
  year: string;
  title: string;
  description: string;
  code: string;
  note?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl border-2 border-amber-400/40 bg-amber-50/50 dark:bg-amber-950/10 p-5">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">
          Eksamen {year}
        </span>
      </div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted)] mb-3">{description}</p>
      <button
        onClick={() => setShow((s) => !s)}
        className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline"
      >
        {show ? "Skjul løsning" : "Vis løsning"}
      </button>
      {show && (
        <div className="mt-3 space-y-3">
          <Code code={code} />
          {note && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm text-blue-800 dark:text-blue-300">
              <strong>Merknad:</strong> {note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Rule card ── */
export function RuleCard({
  uml,
  java,
  tip,
}: {
  uml: string;
  java: string;
  tip?: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--card-border)]">
        <div className="p-4">
          <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
            UML-diagram
          </div>
          <div className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 rounded p-2 whitespace-pre-wrap">
            {uml}
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
            Java-kode
          </div>
          <Code code={java} />
        </div>
      </div>
      {tip && (
        <div className="px-4 py-2 border-t border-[var(--card-border)] bg-sysdev-50/50 dark:bg-sysdev-950/10 text-xs text-sysdev-700 dark:text-sysdev-400">
          <strong>Tips:</strong> {tip}
        </div>
      )}
    </div>
  );
}
