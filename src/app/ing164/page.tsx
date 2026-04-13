"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  chapters,
  categoryLabels,
  categoryDescriptions,
  SECTIONS_PER_CHAPTER,
  type Chapter,
} from "@/lib/chapters";

const categoryOrder: Chapter["category"][] = [
  "bevegelse",
  "mekanikk",
  "rotasjon",
  "em",
];

const categoryStyles: Record<
  Chapter["category"],
  {
    border: string;
    badge: string;
    accent: string;
    progressBar: string;
    progressBg: string;
    chevron: string;
    headerHover: string;
  }
> = {
  bevegelse: {
    border: "border-physics-400/30 hover:border-physics-400/60",
    badge:
      "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400",
    accent: "text-physics-600 dark:text-physics-400",
    progressBar: "bg-physics-500",
    progressBg: "bg-physics-100 dark:bg-physics-900/30",
    chevron: "text-physics-500",
    headerHover: "hover:bg-physics-50/50 dark:hover:bg-physics-950/20",
  },
  mekanikk: {
    border: "border-physics-500/30 hover:border-physics-500/60",
    badge:
      "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400",
    accent: "text-physics-600 dark:text-physics-400",
    progressBar: "bg-physics-500",
    progressBg: "bg-physics-100 dark:bg-physics-900/30",
    chevron: "text-physics-500",
    headerHover: "hover:bg-physics-50/50 dark:hover:bg-physics-950/20",
  },
  rotasjon: {
    border: "border-physics-500/30 hover:border-physics-500/60",
    badge:
      "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400",
    accent: "text-physics-600 dark:text-physics-400",
    progressBar: "bg-physics-500",
    progressBg: "bg-physics-100 dark:bg-physics-900/30",
    chevron: "text-physics-500",
    headerHover: "hover:bg-physics-50/50 dark:hover:bg-physics-950/20",
  },
  em: {
    border: "border-network-500/30 hover:border-network-500/60",
    badge:
      "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
    accent: "text-network-600 dark:text-network-400",
    progressBar: "bg-network-500",
    progressBg: "bg-network-100 dark:bg-network-900/30",
    chevron: "text-network-500",
    headerHover: "hover:bg-network-50/50 dark:hover:bg-network-950/20",
  },
};

const categoryChapterRange: Record<Chapter["category"], string> = {
  bevegelse: "Kap 2–3",
  mekanikk: "Kap 4–8",
  rotasjon: "Kap 9–10",
  em: "Kap 21–29",
};

function useGroupProgress(chapterIds: number[]) {
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [mounted, setMounted] = useState(false);
  const idsKey = chapterIds.join(",");

  useEffect(() => {
    setMounted(true);
    const ids = idsKey.split(",").map(Number);
    let totalCompleted = 0;
    const totalSections = ids.reduce((sum, id) => {
      const ch = chapters.find((c) => c.id === id);
      return sum + (ch?.sectionCount ?? SECTIONS_PER_CHAPTER);
    }, 0);

    for (const id of ids) {
      const stored = localStorage.getItem(`progress-ch${id}`);
      if (stored) {
        try {
          const arr = JSON.parse(stored);
          totalCompleted += Array.isArray(arr) ? arr.length : 0;
        } catch {
          // ignore corrupted data
        }
      }
    }

    setProgress({ completed: totalCompleted, total: totalSections });
  }, [idsKey]);

  if (!mounted) return { completed: 0, total: 1, percent: 0, mounted: false };

  const percent =
    progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;
  return { ...progress, percent, mounted: true };
}

function useChapterProgress(chapter: Chapter) {
  const [completed, setCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);
  const total = chapter.sectionCount ?? SECTIONS_PER_CHAPTER;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(`progress-ch${chapter.id}`);
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        setCompleted(Array.isArray(arr) ? arr.length : 0);
      } catch {
        // ignore
      }
    }
  }, [chapter.id]);

  if (!mounted) return { completed: 0, total, percent: 0, mounted: false };

  const percent = Math.round((completed / total) * 100);
  return { completed, total, percent, mounted: true };
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const styles = categoryStyles[chapter.category];
  const { completed, total, percent, mounted } = useChapterProgress(chapter);
  const hasContent = true; // all chapters have content

  return (
    <Link
      href={`/ing164/${chapter.slug}`}
      className={`group rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${styles.border}`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className={`text-xs font-bold ${styles.accent}`}>
          Kapittel {chapter.id}
        </p>
        {hasContent ? (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Innhold
          </span>
        ) : (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500">
            Kommer
          </span>
        )}
      </div>
      <h3 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
        {chapter.title}
      </h3>
      <p className="text-sm text-[var(--muted)] mb-3">{chapter.description}</p>

      {/* Mini progress bar */}
      <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
          style={{ width: mounted ? `${percent}%` : "0%" }}
        />
      </div>
      {mounted && (
        <p className="text-[11px] text-[var(--muted)] mt-1">
          {completed}/{total} seksjoner fullført
        </p>
      )}
    </Link>
  );
}

function CollapsibleSection({
  category,
  label,
  chapters: cats,
}: {
  category: Chapter["category"];
  label: string;
  chapters: Chapter[];
}) {
  const [open, setOpen] = useState(false);
  const styles = categoryStyles[category];
  const chapterIds = cats.map((c) => c.id);
  const { percent, completed, total, mounted } = useGroupProgress(chapterIds);

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${styles.headerHover}`}
      >
        {/* Chevron */}
        <svg
          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${styles.chevron} ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-bold">{label}</h2>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${styles.badge}`}
            >
              {categoryChapterRange[category]}
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] line-clamp-1">
            {categoryDescriptions[category]}
          </p>
        </div>

        {/* Group progress */}
        <div className="shrink-0 w-32 hidden sm:block">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[var(--muted)]">
              {mounted ? `${percent}%` : "—"}
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              {mounted ? `${completed}/${total}` : ""}
            </span>
          </div>
          <div
            className={`h-2 rounded-full overflow-hidden ${styles.progressBg}`}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
              style={{ width: mounted ? `${percent}%` : "0%" }}
            />
          </div>
        </div>
      </button>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1">
          {/* Mobile progress (hidden on sm+) */}
          <div className="sm:hidden mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[var(--muted)]">
                Fremgang
              </span>
              <span className="text-xs text-[var(--muted)]">
                {mounted ? `${completed}/${total} (${percent}%)` : "—"}
              </span>
            </div>
            <div
              className={`h-2 rounded-full overflow-hidden ${styles.progressBg}`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
                style={{ width: mounted ? `${percent}%` : "0%" }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cats.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ING164Page() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    chapters: chapters.filter((c) => c.category === cat),
  }));

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">ING164 Fysikk</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">ING164 Fysikk</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          University Physics (Young & Freedman). Mekanikk, bølger,
          elektrisitet og magnetisme. Velg et kapittel for å begynne.
        </p>
      </div>

      {/* Verktøy */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/ing164/formelark"
          className="group relative overflow-hidden rounded-xl border-2 border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Komplett formelark
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Alle formler fra alle kapitler organisert etter tema. Filtrer etter
            emne og søk raskt opp det du trenger.
          </p>
        </Link>
        <Link
          href="/ing164/eksamen"
          className="group relative overflow-hidden rounded-xl border-2 border-red-400/40 hover:border-red-400/80 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold text-lg mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            Eksamensøving
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Alle oppgaver fra tidligere eksamener med fullstendige løsninger.
            Tidtaker for øvingseksamen inkludert.
          </p>
        </Link>
      </div>

      {/* Collapsible chapter groups */}
      <div className="space-y-4">
        {grouped.map(({ category, label, chapters: cats }) => (
          <CollapsibleSection
            key={category}
            category={category}
            label={label}
            chapters={cats}
          />
        ))}
      </div>
    </div>
  );
}
