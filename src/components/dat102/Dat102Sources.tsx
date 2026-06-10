"use client";

import { useState } from "react";
import type { SourceRef } from "@/lib/dat102-vault/types";

interface Props {
  sources: SourceRef[];
}

// Ekspanderbart "Kilder og grunnlag"-panel for DAT102 begrep/tema-sider.
// Viser kun `label` (+ sidetall) — `internalPath` er provenance-metadata og
// skal aldri rendres i UI.
export default function Dat102Sources({ sources }: Props) {
  const [open, setOpen] = useState(false);
  if (sources.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="dat102-sources-list"
        className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/40 rounded-xl transition-colors flex items-center justify-between"
      >
        <span>Kilder og grunnlag ({sources.length})</span>
        <span aria-hidden className="text-neutral-500 dark:text-neutral-400">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <ul
          id="dat102-sources-list"
          className="px-4 pb-4 space-y-2 text-sm border-t border-neutral-200 dark:border-neutral-800 pt-3"
        >
          {sources.map((src, i) => (
            <li
              key={`${src.label}-${i}`}
              className="flex items-baseline gap-2 flex-wrap text-neutral-700 dark:text-neutral-200"
            >
              <span
                aria-hidden
                className="w-1.5 h-1.5 rounded-full bg-dat102-500 flex-shrink-0 translate-y-[-1px]"
              />
              <span>{src.label}</span>
              {/* pages-verdien er allerede "s. "-prefikset i data — vis verbatim */}
              {src.pages && (
                <span className="text-neutral-500 dark:text-neutral-400">
                  — {src.pages}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
