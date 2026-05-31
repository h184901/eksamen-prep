"use client";

import Link from "next/link";
import { useState } from "react";
import { useDat110Lang, localizedText } from "@/lib/dat110-language";
import Dat110GradualNote from "@/components/dat110/Dat110GradualNote";
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
import Dat110PageHeader from "@/components/dat110/Dat110PageHeader";

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

// ───────── Eksamenstruktur (06-2025 primær + eldre i accordion) ─────────

type ExamColor = "network" | "blue" | "purple";

const examColorStyles: Record<ExamColor, { border: string; badge: string; dot: string }> = {
  network: {
    border: "hover:border-network-400",
    badge: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-300",
    dot: "bg-network-500",
  },
  blue: {
    border: "hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  purple: {
    border: "hover:border-purple-400",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    dot: "bg-purple-500",
  },
};

// Topic-slug → kort norsk etikett + fargespor (brukes i eldre-eksamen-accordion).
const TOPIC_META: Record<string, { label: string; color: ExamColor }> = {
  "01-introduksjon-og-metrics": { label: "Metrics og forsinkelser", color: "network" },
  "02-protocol-layering-og-sockets": { label: "Lagdeling og protokoller", color: "network" },
  "03-mom-overlay": { label: "MOM og overlay-multicast", color: "blue" },
  "04-naming-og-chord-dht": { label: "Naming og Chord DHT", color: "blue" },
  "05-processes-and-threads": { label: "Prosesser, tråder og RPC", color: "purple" },
  "07-coordination": { label: "Koordinering og klokker", color: "blue" },
  "08-consistency-replication": { label: "Konsistens og replikering", color: "blue" },
  "10-network-layer": { label: "Nettverkslag (IP og ruting)", color: "network" },
  "11-link-layer": { label: "Lenkelag (ARP og switch)", color: "network" },
  "12-iot-mqtt": { label: "IoT og MQTT", color: "network" },
};

const EKSAMEN_06_2025_SLUG = "dat110-eksamen-06-2025";

// 06-2025-strukturen, rekonstruert fra sensorveiledningen (samme rekkefølge som eksamenssiden).
const eksamen062025: { n: number; weight: string; title: string; desc: string; color: ExamColor }[] = [
  { n: 1, weight: "10%", title: "Flervalg (MCQ-mix)", desc: "Blandede flervalgsspørsmål på tvers av pensum — link-, transport- og nettverkslag.", color: "network" },
  { n: 2, weight: "10%", title: "Chord DHT-prosjekt", desc: "Prosjekt 3: applikasjonsprotokoll, adresserom og meldingsutveksling i ChordDHT.", color: "blue" },
  { n: 3, weight: "10%", title: "Metrics og forsinkelser", desc: "Beregn forsinkelser på lenken R1↔R2 ut fra rate, distanse og pakkelengde.", color: "network" },
  { n: 4, weight: "10%", title: "HTTP og applikasjonslag", desc: "HTTP-lag, request-header-felter, entity-body-format og PUT-metoden.", color: "network" },
  { n: 5, weight: "10%", title: "Lenkelag: ARP og switch", desc: "Hub vs switch vs ruter, ARP-query og switch-læring i et lokalnett.", color: "network" },
  { n: 6, weight: "10%", title: "Nettverkslag og ruting", desc: "Routing vs forwarding, distance-vector vs link-state, CIDR og longest-prefix-match.", color: "network" },
  { n: 7, weight: "5%", title: "RPC (synkron/asynkron)", desc: "Gjør om synkron RPC til asynkron server og ikke-blokkerende klienter.", color: "purple" },
  { n: 8, weight: "10%", title: "Overlay-multicast", desc: "Bygg overlay-multicast-tre for fem prosesser og beregn kostnad ut fra delays.", color: "blue" },
  { n: 9, weight: "10%", title: "Vector clocks og koordinering", desc: "Lost-request-håndtering, vector-clock-beregning og brudd på causal consistency.", color: "blue" },
  { n: 10, weight: "15%", title: "Chord DHT (finger-tabeller)", desc: "m=5-adresserom, finger-tabeller, ansvarlig server og nøkkeloppslag.", color: "blue" },
];

interface TidligereExam {
  slug: string;
  label: string;
  defaultOpen?: boolean;
  oppgaver: { n: number; weight: string; topic: string }[];
}

// Eldre eksamensformater — kompakt oppgavefordeling per sett
// (speiler src/data/dat110-vault/exams/*.json; historiske sett er uforanderlige).
const tidligereEksamener: TidligereExam[] = [
  {
    slug: "dat110-eksamen-01-2025",
    label: "Januar 2025",
    defaultOpen: true,
    oppgaver: [
      { n: 1, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 2, weight: "10%", topic: "05-processes-and-threads" },
      { n: 3, weight: "10%", topic: "01-introduksjon-og-metrics" },
      { n: 4, weight: "10%", topic: "10-network-layer" },
      { n: 5, weight: "10%", topic: "10-network-layer" },
      { n: 6, weight: "10%", topic: "11-link-layer" },
      { n: 7, weight: "5%", topic: "05-processes-and-threads" },
      { n: 8, weight: "10%", topic: "03-mom-overlay" },
      { n: 9, weight: "10%", topic: "07-coordination" },
      { n: 10, weight: "15%", topic: "04-naming-og-chord-dht" },
    ],
  },
  {
    slug: "dat110-eksamen-05-2024",
    label: "Mai 2024",
    oppgaver: [
      { n: 1, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 2, weight: "10%", topic: "04-naming-og-chord-dht" },
      { n: 3, weight: "10%", topic: "01-introduksjon-og-metrics" },
      { n: 4, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 5, weight: "10%", topic: "10-network-layer" },
      { n: 6, weight: "10%", topic: "10-network-layer" },
      { n: 7, weight: "5%", topic: "05-processes-and-threads" },
      { n: 8, weight: "10%", topic: "03-mom-overlay" },
      { n: 9, weight: "10%", topic: "08-consistency-replication" },
      { n: 10, weight: "15%", topic: "04-naming-og-chord-dht" },
    ],
  },
  {
    slug: "dat110-eksamen-01-2024",
    label: "Januar 2024",
    oppgaver: [
      { n: 1, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 2, weight: "10%", topic: "05-processes-and-threads" },
      { n: 3, weight: "10%", topic: "01-introduksjon-og-metrics" },
      { n: 4, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 5, weight: "10%", topic: "10-network-layer" },
      { n: 6, weight: "10%", topic: "11-link-layer" },
      { n: 7, weight: "5%", topic: "05-processes-and-threads" },
      { n: 8, weight: "10%", topic: "03-mom-overlay" },
      { n: 9, weight: "10%", topic: "07-coordination" },
      { n: 10, weight: "15%", topic: "04-naming-og-chord-dht" },
    ],
  },
  {
    slug: "dat110-eksamen-05-2023",
    label: "Mai 2023",
    oppgaver: [
      { n: 1, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 2, weight: "10%", topic: "04-naming-og-chord-dht" },
      { n: 3, weight: "10%", topic: "01-introduksjon-og-metrics" },
      { n: 4, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 5, weight: "10%", topic: "11-link-layer" },
      { n: 6, weight: "10%", topic: "10-network-layer" },
      { n: 7, weight: "5%", topic: "01-introduksjon-og-metrics" },
      { n: 8, weight: "10%", topic: "03-mom-overlay" },
      { n: 9, weight: "10%", topic: "07-coordination" },
      { n: 10, weight: "15%", topic: "04-naming-og-chord-dht" },
    ],
  },
  {
    slug: "dat110-eksamen-05-2022",
    label: "Mai 2022",
    oppgaver: [
      { n: 1, weight: "10%", topic: "02-protocol-layering-og-sockets" },
      { n: 2, weight: "10%", topic: "12-iot-mqtt" },
      { n: 3, weight: "10%", topic: "10-network-layer" },
      { n: 4, weight: "10%", topic: "10-network-layer" },
      { n: 5, weight: "10%", topic: "11-link-layer" },
      { n: 6, weight: "10%", topic: "10-network-layer" },
      { n: 7, weight: "5%", topic: "05-processes-and-threads" },
      { n: 8, weight: "10%", topic: "03-mom-overlay" },
      { n: 9, weight: "10%", topic: "08-consistency-replication" },
      { n: 10, weight: "15%", topic: "04-naming-og-chord-dht" },
    ],
  },
];

function EksamenstrukturPrimary() {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-network-50/40 dark:bg-network-950/20 p-5 sm:p-6 mb-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-network-600 dark:text-network-400 mb-1.5">
          Eksamenformat
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Nyeste eksamensstruktur: juni 2025
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 max-w-3xl leading-relaxed">
          Den nyeste eksamenen er ofte best startpunkt for forventet oppbygning, mens tidligere år
          viser variasjoner du fortsatt bør øve på.
        </p>
        <p className="mt-3 inline-flex items-start gap-2 rounded-lg border border-amber-300/70 dark:border-amber-700/50 bg-amber-50/70 dark:bg-amber-950/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
          <span aria-hidden>ℹ️</span>
          <span>
            Merk: 06-2025-oppgaveteksten er rekonstruert fra sensorveiledning fordi original
            oppgave-PDF mangler.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-5">
        {eksamen062025.map((o) => {
          const styles = examColorStyles[o.color];
          return (
            <Link
              key={o.n}
              href={`/dat110/eksamen/${EKSAMEN_06_2025_SLUG}#oppg-${o.n}`}
              className={`group rounded-xl border border-[var(--card-border)] p-3 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${styles.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-300">
                  Oppg {o.n}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                  {o.weight}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors text-neutral-900 dark:text-neutral-50">
                {o.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3">
                {o.desc}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/dat110/eksamen/${EKSAMEN_06_2025_SLUG}`}
          className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg bg-network-500 hover:bg-network-600 text-white transition-colors"
        >
          Åpne juni 2025-eksamen →
        </Link>
        <Link
          href="/dat110/eksamen"
          className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg border border-network-400 text-network-700 dark:text-network-300 hover:bg-network-50 dark:hover:bg-network-950/30 transition-colors"
        >
          Se alle eksamener →
        </Link>
        <Link
          href="/dat110/eksamen/gjengangere"
          className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg border border-network-400 text-network-700 dark:text-network-300 hover:bg-network-50 dark:hover:bg-network-950/30 transition-colors"
        >
          Se gjengangere →
        </Link>
        <Link
          href="/dat110/huskeark"
          className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg border border-network-400 text-network-700 dark:text-network-300 hover:bg-network-50 dark:hover:bg-network-950/30 transition-colors"
        >
          Eksamen-huskeark →
        </Link>
      </div>
    </section>
  );
}

function TidligereAccordionItem({ exam }: { exam: TidligereExam }) {
  const [open, setOpen] = useState(exam.defaultOpen ?? false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40"
      >
        <svg
          className={`w-4 h-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-50">
          {exam.label}
        </span>
        <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
          {exam.oppgaver.length} oppgaver · 100 %
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1">
          <ul className="grid sm:grid-cols-2 gap-1.5 mb-3">
            {exam.oppgaver.map((o) => {
              const meta = TOPIC_META[o.topic] ?? { label: o.topic, color: "network" as ExamColor };
              const styles = examColorStyles[meta.color];
              return (
                <li
                  key={o.n}
                  className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-200"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`} aria-hidden />
                  <span className="font-semibold w-14 shrink-0">Oppg {o.n}</span>
                  <span className="w-10 shrink-0 text-neutral-500 dark:text-neutral-400">
                    {o.weight}
                  </span>
                  <span className="min-w-0 truncate">{meta.label}</span>
                </li>
              );
            })}
          </ul>
          <Link
            href={`/dat110/eksamen/${exam.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-network-700 dark:text-network-300 hover:underline"
          >
            Åpne {exam.label}-eksamen →
          </Link>
        </div>
      )}
    </div>
  );
}

function TidligereEksamensformater() {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
          Variasjon over år
        </p>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Tidligere eksamensformater
        </h2>
      </div>
      <div className="space-y-2.5">
        {tidligereEksamener.map((exam) => (
          <TidligereAccordionItem key={exam.slug} exam={exam} />
        ))}
      </div>
    </section>
  );
}

// ───────── Aktiv øving-banner ─────────

function AktivOvingBanner() {
  return (
    <Link
      href="/dat110/oving"
      className="group block rounded-2xl border border-network-200 dark:border-network-900 bg-network-50/50 dark:bg-network-950/25 p-6 mb-12 shadow-sm transition-all hover:shadow-md hover:border-network-300 dark:hover:border-network-700"
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
            Flervalg-quiz med feedback og «Les mer»-lenker — pluss eksamenssim,
            flashcards, matching, regneøving og eksamensdrill. Alle modusene er klare å bruke.
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

// ───────── Begreper du bør kunne ─────────

const BEGREPER_LINKS: {
  label: string;
  href: string;
  desc: string;
  kind: "Begrep" | "Tema";
}[] = [
  { label: "Chord-ring", href: "/dat110/begreper/chord-ring", desc: "Ring, successor-regel og finger-table", kind: "Begrep" },
  { label: "RPC", href: "/dat110/begreper/rpc", desc: "At-most-once vs at-least-once", kind: "Begrep" },
  { label: "Forsinkelser", href: "/dat110/begreper/delays", desc: "De fire delay-komponentene", kind: "Begrep" },
  { label: "IPv4-adressering", href: "/dat110/begreper/ipv4-addressing", desc: "CIDR, subnett og prefiks", kind: "Begrep" },
  { label: "Vector clocks", href: "/dat110/begreper/vector-clocks", desc: "Kausalitet og samtidighet", kind: "Begrep" },
  { label: "Konsistensmodeller", href: "/dat110/begreper/consistency-models", desc: "Sekvensiell vs eventual", kind: "Begrep" },
  { label: "Feilmodeller", href: "/dat110/begreper/fault-models", desc: "Crash, omission og byzantine", kind: "Begrep" },
  { label: "Overlay multicast / gossip", href: "/dat110/temaer/overlay-and-gossip", desc: "ALM, gossip og anti-entropy", kind: "Tema" },
];

function BegreperSection() {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
          Oppslagsverk
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Begreper du bør kunne
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 max-w-3xl leading-relaxed">
          DAT110-eksamen tester ofte presis forståelse av begreper. Start med de sentrale
          begrepene, og bruk dem som oppslagsverk mens du løser quiz og eksamensoppgaver.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/dat110/begreper"
            className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Se alle 23 begreper →
          </Link>
          <Link
            href="/dat110/temaer"
            className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg border border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            Bla i temaer →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {BEGREPER_LINKS.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-blue-400 dark:hover:border-blue-600"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-50 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors min-w-0 truncate">
                {b.label}
              </h3>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shrink-0">
                {b.kind}
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">{b.desc}</p>
          </Link>
        ))}
      </div>
    </section>
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
    conceptHref: "/dat110/temaer/logical-clocks",
    conceptLabel: "Tema: Logiske klokker",
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
    conceptHref: "/dat110/temaer/fault-tolerance",
    conceptLabel: "Tema: Fault tolerance",
    examOppgNumber: 9,
    color: "rose",
  },
];

const NOKKEL_CARD_STYLES: Record<NokkelTema["color"], { border: string; pillBg: string }> = {
  blue: { border: "hover:border-blue-400 dark:hover:border-blue-600", pillBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  teal: { border: "hover:border-teal-400 dark:hover:border-teal-600", pillBg: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  network: { border: "hover:border-network-400 dark:hover:border-network-600", pillBg: "bg-network-100 text-network-700 dark:bg-network-900/40 dark:text-network-300" },
  purple: { border: "hover:border-purple-400 dark:hover:border-purple-600", pillBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  amber: { border: "hover:border-amber-400 dark:hover:border-amber-600", pillBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" },
  rose: { border: "hover:border-rose-400 dark:hover:border-rose-600", pillBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
};

function NokkelTemaer() {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
          Maks poeng
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Nøkkeltemaer
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 max-w-3xl leading-relaxed">
          Sentrale temaer kalibrert mot eksamen-mønsteret fra 2022–2025. Vekt-prosent og kapittel-referanser per tema.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {NOKKELTEMAER.map((t) => {
          const styles = NOKKEL_CARD_STYLES[t.color];
          return (
            <div
              key={t.title}
              className={`group rounded-xl border border-[var(--card-border)] p-5 shadow-sm transition-all hover:shadow-md bg-[var(--card)] ${styles.border}`}
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
                  🎯 Åpne quiz →
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
    <section className="mb-12">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
          Bla i pensum
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Referansemateriell
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Tidligere eksamener — live */}
        <Link
          href="/dat110/eksamen"
          className="group block rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-red-300 dark:hover:border-red-700"
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
            Seks eksamener (2022–2025) ligger ute med komplette løsninger fra sensorveiledningene.
          </p>
        </Link>

        {/* Oppsummering — live */}
        <Link
          href="/dat110/oppsummering"
          className="group block rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-amber-300 dark:hover:border-amber-700"
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
          className="block rounded-xl border border-[var(--card-border)] bg-neutral-50/60 dark:bg-neutral-900/30 p-5 opacity-70 cursor-not-allowed"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center text-xl">
              🗂
            </div>
            <h3 className="font-bold text-base text-neutral-600 dark:text-neutral-300">
              Pensum og rammeverk
            </h3>
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              Kommer senere
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
  const { lang } = useDat110Lang();
  const t = (no: string, en: string) => localizedText(no, en, lang);
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    chapters: dat110Chapters.filter((c) => c.category === cat),
  }));

  return (
    <div>
      <Dat110PageHeader
        crumbs={[{ label: t("Hjem", "Home"), href: "/" }, { label: "DAT110" }]}
        eyebrow={t("DAT110 · Nettverksteknologi", "DAT110 · Networking")}
        title={t(
          "Nettverksteknologi og distribuerte systemer",
          "Networking and distributed systems",
        )}
        lead={t(
          "To bøker — Computer Networking (Kurose & Ross) og Distributed Systems (Van Steen & Tanenbaum). Eksamen er 10 oppgaver à 4 timer; mønsteret fra 2022–2025 er stabilt.",
          "Two books — Computer Networking (Kurose & Ross) and Distributed Systems (Van Steen & Tanenbaum). The exam is 10 questions over 4 hours; the pattern from 2022–2025 is stable.",
        )}
      />

      <Dat110GradualNote className="mb-6" />

      {/* Eksamenstruktur — 06-2025 primær (alltid synlig) */}
      <EksamenstrukturPrimary />

      {/* Tidligere eksamensformater (accordion) */}
      <TidligereEksamensformater />

      {/* Aktiv øving-banner */}
      <AktivOvingBanner />

      {/* Begreper du bør kunne (etter aktiv øving, før nøkkeltemaer) */}
      <BegreperSection />

      {/* Nøkkeltemaer */}
      <NokkelTemaer />

      {/* Referansemateriell */}
      <ReferanseMateriell />

      {/* Hurtigtilgang */}
      <Hurtigtilgang />

      {/* Kapittel-grupper (kapittel-skall fra før — beholdes urørt) */}
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        {t("Bla i kapitler", "Browse chapters")}
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
