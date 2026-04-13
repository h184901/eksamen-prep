"use client";

import { useState } from "react";

interface TheorySummaryProps {
  title: string;
  children: React.ReactNode;
  mustKnow?: string[];
  defaultOpen?: boolean;
}

export default function TheorySummary({
  title,
  children,
  mustKnow,
  defaultOpen = true,
}: TheorySummaryProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4">
          <div className="prose dark:prose-invert max-w-none leading-relaxed">
            {children}
          </div>

          {mustKnow && mustKnow.length > 0 && (
            <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">
                Du MÅ kunne:
              </h4>
              <ul className="space-y-1">
                {mustKnow.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
