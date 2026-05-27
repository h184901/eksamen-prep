"use client";

import Link from "next/link";
import { useState } from "react";
import {
  dat110Chapters,
  categoryLabels,
  categoryDescriptions,
  categoryChapterRange,
  SECTIONS_PER_CHAPTER,
  type DAT110Chapter,
} from "@/lib/dat110-chapters";
import { useProgress } from "@/components/ProgressProvider";
import {
  dat110ChapterTotals,
  dat110GroupTotals,
} from "@/lib/subject-progress";

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

function useGroupProgress(cats: DAT110Chapter[]) {
  const { ready, completed } = useProgress();
  const slugs = cats.map((c) => ({
    slug: c.slug,
    sectionCount: c.sectionCount ?? SECTIONS_PER_CHAPTER,
  }));
  const totals = dat110GroupTotals(completed, slugs);
  return { ...totals, mounted: ready };
}

function useChapterProgress(chapter: DAT110Chapter) {
  const { ready, completed } = useProgress();
  const total = chapter.sectionCount ?? SECTIONS_PER_CHAPTER;
  const totals = dat110ChapterTotals(completed, chapter.slug, total);
  return { ...totals, mounted: ready };
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
      <h3 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors text-neutral-900 dark:text-neutral-50">
        {chapter.title}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
        {chapter.description}
      </p>
      <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
          style={{ width: mounted ? `${percent}%` : "0%" }}
        />
      </div>
      {mounted && (
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
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
  const { percent, completed, total, mounted } = useGroupProgress(cats);

  return (
    <section className="rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-[var(--card)] overflow-hidden">
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
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {label}
            </h2>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${styles.badge}`}
            >
              {categoryChapterRange[category]}
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-1">
            {categoryDescriptions[category]}
          </p>
        </div>

        <div className="shrink-0 w-32 hidden sm:block">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              {mounted ? `${percent}%` : "—"}
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
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
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Fremgang
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
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

// ───────── Eksamenformat-strip (alltid synlig) ─────────

const examOppgaver = [
  { id: 1, label: "Oppg 1", title: "Flervalg", weight: "10%", description: "10 flervalgsspørsmål fra hele pensum", chapters: "Alle kapitler", color: "emerald" },
  { id: 2, label: "Oppg 2", title: "Oblig-prosjekt", weight: "10%", description: "Arkitektur og konsepter fra obliger", chapters: "Prosjekt 1–3", color: "purple" },
  { id: 3, label: "Oppg 3", title: "Forsinkelser", weight: "10%", description: "Beregn forsinkelser i nettverk", chapters: "CN 1", color: "network" },
  { id: 4, label: "Oppg 4", title: "Protokoller", weight: "10%", description: "TCP, UDP, IP-header og segmentering", chapters: "CN 3–4", color: "network" },
  { id: 5, label: "Oppg 5", title: "Ruting", weight: "10%", description: "CIDR, subnett, avstandsvektor", chapters: "CN 4–5", color: "network" },
  { id: 6, label: "Oppg 6", title: "ARP og Switch", weight: "10%", description: "ARP-tabell, switch-læring", chapters: "CN 6", color: "network" },
  { id: 7, label: "Oppg 7", title: "DS-teori", weight: "5%", description: "Serverdesign, transparens, RPC-konsepter", chapters: "DS 3–4", color: "blue" },
  { id: 8, label: "Oppg 8", title: "Overlay og multicast", weight: "10%", description: "Overlay-nettverk, RDP, multicast-trær", chapters: "DS 4", color: "blue" },
  { id: 9, label: "Oppg 9", title: "Konsistens og klokker", weight: "10%", description: "Vektorklokker, replikering, feiltoleranse", chapters: "DS 5, 7, 8", color: "blue" },
  { id: 10, label: "Oppg 10", title: "DHT/Chord", weight: "15%", description: "Chord-ring, fingertabeller, nøkkeloppslag", chapters: "DS 6", color: "blue" },
];

const oppgaveColorStyles: Record<string, { border: string; badge: string }> = {
  emerald: {
    border: "border-emerald-400/30 hover:border-emerald-400/60",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  purple: {
    border: "border-purple-400/30 hover:border-purple-400/60",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  network: {
    border: "border-network-400/30 hover:border-network-400/60",
    badge: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-300",
  },
  blue: {
    border: "border-blue-400/30 hover:border-blue-400/60",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
};

function ExamFormatStrip() {
  return (
    <section className="rounded-2xl border border-network-300 dark:border-network-700 bg-gradient-to-br from-network-50 to-blue-50 dark:from-network-950/40 dark:to-blue-950/40 p-5 mb-10">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
            Eksamenformat — 10 oppgaver, 4 timer
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-1">
            Mønsteret fra 2022–2025 er stabilt. Klikk en oppgavetype for å se tidligere varianter med løsninger.
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-200 dark:bg-network-900/60 text-network-800 dark:text-network-100">
          Alltid synlig
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {examOppgaver.map((oppg) => {
          const styles = oppgaveColorStyles[oppg.color];
          return (
            <Link
              key={oppg.id}
              href={`/dat110/eksamenoving/oppg-${oppg.id}`}
              className={`group rounded-xl border-2 p-3 transition-all hover:shadow-md hover:-translate-y-0.5 bg-white dark:bg-neutral-900/60 ${styles.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                  {oppg.weight}
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  {oppg.chapters}
                </span>
              </div>
              <p className="text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-0.5">
                {oppg.label}
              </p>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors text-neutral-900 dark:text-neutral-50">
                {oppg.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">
                {oppg.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ───────── Aktiv øving-banner ─────────

function AktivOvingBanner() {
  return (
    <Link
      href="/dat110/oving"
      className="group block rounded-2xl border-2 border-network-400 dark:border-network-600 bg-gradient-to-br from-network-50 via-blue-50 to-teal-50 dark:from-network-950/50 dark:via-blue-950/50 dark:to-teal-950/50 p-6 mb-10 transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0" aria-hidden>
          🎯
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-neutral-50 group-hover:text-network-700 dark:group-hover:text-network-300 transition-colors">
            Aktiv øving — hovedverktøy mot eksamen
          </h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-3">
            Flervalg-quiz med feedback og «Les mer»-lenker. Eksamenssim, flashcards,
            matching, regneøving og eksamensdrill kommer i P1/P2.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-network-100 dark:bg-network-900/40 text-network-800 dark:text-network-200">
              🎯 Quiz
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300">
              ⏱️ Eksamensim
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              🃏 Flashcards
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
              🔗 Matching
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              🧮 Regneøving
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
              🔥 Eksamensdrill
            </span>
          </div>
        </div>
        <div className="hidden sm:block flex-shrink-0 text-sm font-bold text-network-700 dark:text-network-300 group-hover:translate-x-1 transition-transform">
          Start øving →
        </div>
      </div>
    </Link>
  );
}

// ───────── Nøkkeltemaer (Tier 1) ─────────

interface NokkelTema {
  emoji: string;
  title: string;
  description: string;
  weight: string;
  oppgRef: string;
  chapterTag: string;
  badge?: string;
  conceptHref: string | null;
  conceptLabel: string;
  examOppgNumber: number;
  color: "blue" | "teal" | "network" | "purple" | "amber" | "rose";
}

const NOKKELTEMAER: NokkelTema[] = [
  {
    emoji: "🔗",
    title: "Chord DHT",
    description: "Ring, successor-regel, finger-table, O(log N)-lookup. Kjernen i Prosjekt 3 og Oppg 10.",
    weight: "15%",
    oppgRef: "Oppg 10",
    chapterTag: "DS 6",
    badge: "Mest poeng",
    conceptHref: "/dat110/temaer/chord-dht",
    conceptLabel: "Tema: Chord DHT",
    examOppgNumber: 10,
    color: "blue",
  },
  {
    emoji: "🌳",
    title: "Overlay og multicast",
    description: "Application-layer multicast vs IP-multicast, overlay-tre, gossip-protokoller.",
    weight: "10%",
    oppgRef: "Oppg 8",
    chapterTag: "DS 4",
    conceptHref: "/dat110/temaer/overlay-and-gossip",
    conceptLabel: "Tema: Overlay og gossip",
    examOppgNumber: 8,
    color: "teal",
  },
  {
    emoji: "⏱️",
    title: "Delay og throughput",
    description: "Fire forsinkelses-komponenter, bottleneck-link. Regneoppgaver hvert år.",
    weight: "10%",
    oppgRef: "Oppg 3",
    chapterTag: "CN 1",
    conceptHref: "/dat110/begreper/delays",
    conceptLabel: "Begrep: Delays",
    examOppgNumber: 3,
    color: "network",
  },
  {
    emoji: "🌐",
    title: "IP, forwarding og subnetting",
    description: "IPv4-adresser, CIDR-blokker, longest-prefix-match, ARP. Tre eksamen-oppgaver kombinert.",
    weight: "30% kombinert",
    oppgRef: "Oppg 4–6",
    chapterTag: "CN 4–6",
    badge: "Størst kapittelomfang",
    conceptHref: "/dat110/begreper/subnetting",
    conceptLabel: "Begrep: Subnetting",
    examOppgNumber: 5,
    color: "network",
  },
  {
    emoji: "🔄",
    title: "RPC og failure handling",
    description: "At-most-once, at-least-once, failure-modeller. Tanenbaum-taksonomien.",
    weight: "5%",
    oppgRef: "Oppg 7",
    chapterTag: "DS 1, 3",
    conceptHref: "/dat110/begreper/rpc",
    conceptLabel: "Begrep: RPC",
    examOppgNumber: 7,
    color: "purple",
  },
  {
    emoji: "🕐",
    title: "Vector clocks og consistency",
    description: "Lamport vs vector clocks, sekvensiell vs eventual consistency, quorum.",
    weight: "10%",
    oppgRef: "Oppg 9",
    chapterTag: "DS 5, 7",
    conceptHref: null,
    conceptLabel: "Konseptside kommer i P1",
    examOppgNumber: 9,
    color: "amber",
  },
  {
    emoji: "🛡️",
    title: "Fault tolerance",
    description: "Replikering for FT, 3k+1-regelen, Paxos-intuisjon. Ofte sammen med Oppg 9.",
    weight: "—",
    oppgRef: "Oppg 9",
    chapterTag: "DS 8",
    conceptHref: null,
    conceptLabel: "Konseptside kommer i P1",
    examOppgNumber: 9,
    color: "rose",
  },
];

const NOKKEL_CARD_STYLES: Record<NokkelTema["color"], { border: string; pillBg: string }> = {
  blue: { border: "border-blue-300 dark:border-blue-700 hover:border-blue-400", pillBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  teal: { border: "border-teal-300 dark:border-teal-700 hover:border-teal-400", pillBg: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  network: { border: "border-network-300 dark:border-network-700 hover:border-network-400", pillBg: "bg-network-100 text-network-700 dark:bg-network-900/40 dark:text-network-300" },
  purple: { border: "border-purple-300 dark:border-purple-700 hover:border-purple-400", pillBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  amber: { border: "border-amber-300 dark:border-amber-700 hover:border-amber-400", pillBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" },
  rose: { border: "border-rose-300 dark:border-rose-700 hover:border-rose-400", pillBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
};

function NokkelTemaer() {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          Nøkkeltemaer — dette gir mest poeng
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
          Tier 1-temaer kalibrert mot eksamen-mønsteret fra 2022–2025. Vekt-prosent og kapittel-referanser per tema.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {NOKKELTEMAER.map((t) => {
          const styles = NOKKEL_CARD_STYLES[t.color];
          return (
            <div
              key={t.title}
              className={`group rounded-xl border-2 p-5 transition-all hover:shadow-md bg-white dark:bg-neutral-900/60 ${styles.border}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl flex-shrink-0" aria-hidden>
                    {t.emoji}
                  </span>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50 leading-tight">
                    {t.title}
                  </h3>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.pillBg}`}>
                  {t.weight}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                  {t.oppgRef}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                  {t.chapterTag}
                </span>
                {t.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
                    ⭐ {t.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-4">
                {t.description}
              </p>

              {/* Concept link (eller gap-note) */}
              <div className="mb-3 text-xs">
                {t.conceptHref ? (
                  <Link
                    href={t.conceptHref}
                    className="text-blue-700 dark:text-blue-300 hover:underline"
                  >
                    📚 {t.conceptLabel} →
                  </Link>
                ) : (
                  <span className="italic text-neutral-500 dark:text-neutral-400">
                    📚 {t.conceptLabel}
                  </span>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Link
                  href="/dat110/oving/quiz"
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-network-500 hover:bg-network-600 text-white transition-colors"
                >
                  🎯 Øv på dette →
                </Link>
                <Link
                  href={`/dat110/eksamen/dat110-eksamen-05-2024#oppg-${t.examOppgNumber}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-network-400 text-network-700 dark:text-network-300 hover:bg-network-50 dark:hover:bg-network-950/30 transition-colors"
                >
                  📋 Se i eksamen →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ───────── Referansemateriell ─────────

function ReferanseMateriell() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        📚 Referansemateriell
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Tidligere eksamener — live */}
        <Link
          href="/dat110/eksamen"
          className="group block rounded-xl border-2 border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20 p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 flex items-center justify-center text-xl">
              📋
            </div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
              Tidligere eksamener
            </h3>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">
            V2024 ligger ute med komplette løsninger fra sensorveiledning. Flere år kommer i P1.
          </p>
        </Link>

        {/* Oppsummering — live */}
        <Link
          href="/dat110/oppsummering"
          className="group block rounded-xl border-2 border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 flex items-center justify-center text-xl">
              📚
            </div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              Oppsummering
            </h3>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">
            Kompakt teori-oversikt på tvers av alle kapitler. Bra for repetisjon kvelden før.
          </p>
        </Link>

        {/* Pensum og rammeverk — disabled, side mangler */}
        <div
          aria-disabled
          className="block rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 p-5 opacity-70 cursor-not-allowed"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center text-xl">
              🗂
            </div>
            <h3 className="font-bold text-base text-neutral-600 dark:text-neutral-300">
              Pensum og rammeverk
            </h3>
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              Kommer i P1
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Bøker, artikler og kursforventninger — manuelt skrevet side (ikke pensum-PDFene).
          </p>
        </div>
      </div>
    </section>
  );
}

// ───────── Hurtigtilgang (dempet) ─────────

function Hurtigtilgang() {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-neutral-600 dark:text-neutral-300">
        Hurtigtilgang
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <Link
          href="/dat110/eksamenoving"
          className="group flex items-center gap-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-3 transition-all hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20"
        >
          <span className="text-xl" aria-hidden>📒</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">
              Eksamensøving (per oppgavetype)
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Eksisterende per-oppgave-skall med tidligere varianter.
            </p>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">→</span>
        </Link>
        <Link
          href="/dat110/obliger"
          className="group flex items-center gap-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-3 transition-all hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50/40 dark:hover:bg-purple-950/20"
        >
          <span className="text-xl" aria-hidden>📂</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">
              Obliger (Prosjekt 1–3)
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Arkitektur og konsepter fra obligatoriske oppgaver.
            </p>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">→</span>
        </Link>
      </div>
    </section>
  );
}

// ───────── Page ─────────

export default function DAT110Page() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    chapters: dat110Chapters.filter((c) => c.category === cat),
  }));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-neutral-700 dark:text-neutral-200">
            DAT110 Nettverksteknologi
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
          DAT110 Nettverksteknologi
        </h1>
        <p className="text-neutral-700 dark:text-neutral-200 max-w-3xl">
          Distribuerte systemer og nettverksprotokoller. To bøker: Computer Networking
          (Kurose & Ross) og Distributed Systems (Van Steen & Tanenbaum). Eksamen er
          10 oppgaver à 4 timer, mønsteret fra 2022–2025 er stabilt.
        </p>
      </div>

      {/* Eksamenformat (alltid synlig) */}
      <ExamFormatStrip />

      {/* Aktiv øving-banner */}
      <AktivOvingBanner />

      {/* Nøkkeltemaer */}
      <NokkelTemaer />

      {/* Referansemateriell */}
      <ReferanseMateriell />

      {/* Hurtigtilgang */}
      <Hurtigtilgang />

      {/* Kapittel-grupper (kapittel-skall fra før — beholdes urørt) */}
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        Bla i kapitler
      </h2>
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
