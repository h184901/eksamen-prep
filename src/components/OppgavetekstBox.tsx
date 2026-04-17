"use client";

import React, { useRef, useState } from "react";
import { copyExerciseText } from "@/lib/copy-exercise";

interface Props {
  children: React.ReactNode;
  /** Optional label prepended to the copied text, e.g. "Oppgave 23.14" */
  copyLabel?: string;
}

export default function OppgavetekstBox({ children, copyLabel }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const el = contentRef.current;
    if (!el) return;
    const prefix = copyLabel ? `Oppgavetekst (${copyLabel}):` : undefined;
    const ok = await copyExerciseText(el, prefix);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="rounded-lg bg-[var(--background)] border border-[var(--card-border)] p-4">
      <div className="flex items-center justify-between mb-2 gap-2">
        <p className="font-semibold text-sm text-[var(--accent)]">
          Oppgavetekst
        </p>
        <button
          type="button"
          onClick={onCopy}
          title="Kopier oppgavetekst (for å lime inn i AI-tutor)"
          aria-label="Kopier oppgavetekst"
          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon />
              Kopiert
            </>
          ) : (
            <>
              <CopyIcon />
              Kopier
            </>
          )}
        </button>
      </div>
      <div ref={contentRef} className="text-sm space-y-2">
        {children}
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
