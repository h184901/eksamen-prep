"use client";

import { useState } from "react";
import type { SourceRef } from "@/lib/dat110-vault/types";
import { localizedText, type Dat110Lang } from "@/lib/dat110-language";

interface Props {
  sources: SourceRef[];
  // Optional: localizes only the chrome label. Defaults to Norwegian, so the
  // concept/topic pages that omit it are unchanged.
  lang?: Dat110Lang;
}

// Expandable "Kilder og grunnlag" panel for concept/topic pages.
// Collapsed by default. Defensively filters local-only sources (the sync pipeline
// also filters, but this is a second line of defense).
export default function SourcesAndGroundingExpandable({
  sources,
  lang = "no",
}: Props) {
  const [open, setOpen] = useState(false);
  const visible = sources.filter((s) => s.visibility !== "local-only");

  if (visible.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="sources-and-grounding-list"
        className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/40 rounded-xl transition-colors flex items-center justify-between"
      >
        <span>
          {localizedText("Kilder og grunnlag", "Sources and basis", lang)} (
          {visible.length})
        </span>
        <span aria-hidden className="text-neutral-500 dark:text-neutral-400">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <ul
          id="sources-and-grounding-list"
          className="px-4 pb-4 space-y-2 text-sm border-t border-neutral-200 dark:border-neutral-800 pt-3"
        >
          {visible.map((src) => (
            <li
              key={src.slug}
              className="flex items-baseline gap-2 flex-wrap text-neutral-700 dark:text-neutral-200"
            >
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 uppercase tracking-wide whitespace-nowrap">
                {src.role}
              </span>
              <span>{src.title}</span>
              {src.pageOrSection && (
                <span className="text-neutral-500 dark:text-neutral-400">
                  — {src.pageOrSection}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
