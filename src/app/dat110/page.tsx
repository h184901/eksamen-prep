"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  dat110Chapters,
  categoryLabels,
  categoryDescriptions,
  categoryChapterRange,
  SECTIONS_PER_CHAPTER,
  type DAT110Chapter,
} from "@/lib/dat110-chapters";

const categoryOrder: DAT110Chapter["category"][] = ["cn", "ds"];

const categoryStyles: Record<
  DAT110Chapter["category"],
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
  cn: {
    border: "border-network-400/30 hover:border-network-400/60",
    badge:
      "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
    accent: "text-network-600 dark:text-network-400",
    progressBar: "bg-network-500",
    progressBg: "bg-network-100 dark:bg-network-900/30",
    chevron: "text-network-500",
    headerHover: "hover:bg-network-50/50 dark:hover:bg-network-950/20",
  },
  ds: {
    border: "border-blue-400/30 hover:border-blue-400/60",
    badge:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    accent: "text-blue-600 dark:text-blue-400",
    progressBar: "bg-blue-500",
    progressBg: "bg-blue-100 dark:bg-blue-900/30",
    chevron: "text-blue-500",
    headerHover: "hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
  },
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
      const ch = dat110Chapters.find((c) => c.id === id);
      return sum + (ch?.sectionCount ?? SECTIONS_PER_CHAPTER);
    }, 0);

    for (const id of ids) {
      const stored = localStorage.getItem(`dat110-progress-ch${id}`);
      if (stored) {
        try {
          const arr = JSON.parse(stored);
          totalCompleted += Array.isArray(arr) ? arr.length : 0;
        } catch {
          // ignore
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

function useChapterProgress(chapter: DAT110Chapter) {
  const [completed, setCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);
  const total = chapter.sectionCount ?? SECTIONS_PER_CHAPTER;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(`dat110-progress-ch${chapter.id}`);
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

function ChapterCard({ chapter }: { chapter: DAT110Chapter }) {
  const styles = categoryStyles[chapter.category];
  const { completed, total, percent, mounted } = useChapterProgress(chapter);

  return (
    <Link
      href={`/dat110/${chapter.slug}`}
      className={`group rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${styles.border}`}
    >
      <p className={`text-xs font-bold mb-1 ${styles.accent}`}>
        {chapter.bookRef}
      </p>
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
  category: DAT110Chapter["category"];
  label: string;
  chapters: DAT110Chapter[];
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
        <svg
          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${styles.chevron} ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

        <div className="shrink-0 w-32 hidden sm:block">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[var(--muted)]">
              {mounted ? `${percent}%` : "\u2014"}
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

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1">
          <div className="sm:hidden mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[var(--muted)]">
                Fremgang
              </span>
              <span className="text-xs text-[var(--muted)]">
                {mounted ? `${completed}/${total} (${percent}%)` : "\u2014"}
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

const examOppgaver = [
  { id: 1, label: "Oppg 1", title: "Flervalg", weight: "10%", description: "10 flervalgsspørsmål fra hele pensum", chapters: "Alle kapitler", color: "emerald" },
  { id: 2, label: "Oppg 2", title: "Oblig-prosjekt", weight: "10%", description: "Arkitektur og konsepter fra obliger", chapters: "Prosjekt 1\u20133", color: "purple" },
  { id: 3, label: "Oppg 3", title: "Forsinkelser", weight: "10%", description: "Beregn forsinkelser i nettverk", chapters: "CN 1", color: "network" },
  { id: 4, label: "Oppg 4", title: "Protokoller", weight: "10%", description: "TCP, UDP, IP-header og segmentering", chapters: "CN 3\u20134", color: "network" },
  { id: 5, label: "Oppg 5", title: "Ruting", weight: "10%", description: "CIDR, subnett, avstandsvektor", chapters: "CN 4\u20135", color: "network" },
  { id: 6, label: "Oppg 6", title: "ARP og Switch", weight: "10%", description: "ARP-tabell, switch-læring", chapters: "CN 6", color: "network" },
  { id: 7, label: "Oppg 7", title: "DS-teori", weight: "5%", description: "Serverdesign, transparens, RPC-konsepter", chapters: "DS 3\u20134", color: "blue" },
  { id: 8, label: "Oppg 8", title: "Overlay og multicast", weight: "10%", description: "Overlay-nettverk, RDP, multicast-trær", chapters: "DS 4", color: "blue" },
  { id: 9, label: "Oppg 9", title: "Konsistens og klokker", weight: "10%", description: "Vektorklokker, replikering, feiltoleranse", chapters: "DS 5, 7, 8", color: "blue" },
  { id: 10, label: "Oppg 10", title: "DHT/Chord", weight: "15%", description: "Chord-ring, fingertabeller, nøkkeloppslag", chapters: "DS 6", color: "blue" },
];

const oppgaveColorStyles: Record<string, { border: string; badge: string }> = {
  emerald: {
    border: "border-emerald-400/30 hover:border-emerald-400/60",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  purple: {
    border: "border-purple-400/30 hover:border-purple-400/60",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  network: {
    border: "border-network-400/30 hover:border-network-400/60",
    badge: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
  },
  blue: {
    border: "border-blue-400/30 hover:border-blue-400/60",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

function ExamPracticeSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-5 text-left transition-colors hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
      >
        <svg
          className={`w-5 h-5 shrink-0 transition-transform duration-200 text-emerald-500 ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-bold">Eksamensøving</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              10 oppgavetyper
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] line-clamp-1">
            Øv på hver oppgavetype med quiz, flashcards og lenker til relevant teori
          </p>
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {examOppgaver.map((oppg) => {
              const styles = oppgaveColorStyles[oppg.color];
              return (
                <Link
                  key={oppg.id}
                  href={`/dat110/eksamenoving/oppg-${oppg.id}`}
                  className={`group rounded-xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${styles.border}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                      {oppg.weight}
                    </span>
                    <span className="text-[10px] text-[var(--muted)]">{oppg.chapters}</span>
                  </div>
                  <p className="text-xs font-bold text-[var(--muted)] mb-0.5">{oppg.label}</p>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {oppg.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2">{oppg.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DAT110Page() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    chapters: dat110Chapters.filter((c) => c.category === cat),
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
          <span className="text-[var(--foreground)]">DAT110 Nettverksteknologi</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">DAT110 Nettverksteknologi</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          To bøker: Computer Networking (Kurose & Ross) og Distributed Systems
          (Van Steen & Tanenbaum). Nettverksprotokoller, distribuerte systemer,
          Chord DHT og feiltoleranse.
        </p>
      </div>

      {/* Verktøy */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/dat110/eksamenoving"
          className="group relative overflow-hidden rounded-xl border-2 border-emerald-400/40 hover:border-emerald-400/80 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Eksamensøving
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Alt du trenger: oppgavetyper, oppsummering, eksamensoppgaver med løsninger, flashcards og quiz
          </p>
        </Link>
        <Link
          href="/dat110/obliger"
          className="group relative overflow-hidden rounded-xl border-2 border-purple-400/40 hover:border-purple-400/80 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Obliger
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Obligatoriske prosjekter med forklaring og eksamen-relevante konsepter
          </p>
        </Link>
      </div>

      {/* Eksamensøving */}
      <ExamPracticeSection />

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
