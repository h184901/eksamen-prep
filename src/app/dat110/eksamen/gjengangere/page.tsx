import Link from "next/link";
import type { ExamPatternsDataset } from "@/lib/dat110-vault/types";
import patternsData from "@/data/dat110-vault/exam-patterns.json";
import QSlotTable from "@/components/dat110/eksamen/QSlotTable";
import PatternCard from "@/components/dat110/eksamen/PatternCard";

// /dat110/eksamen/gjengangere — Layer B aggregert oversikt over hva som
// gjentar seg på tvers av de 5 komplette DAT110-eksamen-parene (2022, 2023,
// 2024-01, 2024-05, 2025-01). Data leses fra hand-curated
// src/data/dat110-vault/exam-patterns.json (P1.E-scope).
//
// Server component — ingen client-state. All "frequency"-data er manuelt
// kuratert basert på vault-notatene exam-patterns/recurring-questions.md,
// exam-patterns/concept-frequency.md, exam-patterns/sensorveiledning-themes.md.

const data: ExamPatternsDataset = patternsData as ExamPatternsDataset;

export const metadata = {
  title: "Gjengangere — DAT110 Eksamen",
  description:
    "Hva gjentar seg på DAT110-eksamen — Q-slot-oversikt, top-konsepter, og pattern-cards med lenker til konkrete eksempler.",
};

function tierBadge(tier: number): string {
  switch (tier) {
    case 1:
      return "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200";
    case 2:
      return "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200";
    case 3:
      return "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200";
    default:
      return "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300";
  }
}

export default function GjengangerePage() {
  const { qslots, topConcepts, patterns } = data;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6 flex-wrap">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span>/</span>
        <Link href="/dat110/eksamen" className="hover:text-[var(--accent)]">
          Eksamen
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Gjengangere</span>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
        Gjengangere
      </h1>
      <p className="text-[var(--muted)] max-w-3xl mb-8">
        Aggregert oversikt over hva som faktisk gjentar seg på DAT110-eksamen
        på tvers av de fem tilgjengelige eksamen-parene (2022, 2023, 2024-01,
        2024-05, 2025-01). Bruk dette som strategisk guide: hvilke oppgaver
        er mest stabile, hvilke konsepter dukker opp i ALLE år, og hvor finner
        du konkrete eksempler.
      </p>

      {/* Q-slot oversikt */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
          Typisk eksamen-struktur
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-3xl mb-4">
          10 oppgaver med fast vektfordeling (Q1–Q6 og Q8–Q9 er 10%, Q7 er 5%,
          Q10 er 15% — totalt 100%). Tabellen viser tema-fokus og
          stabilitets-vurdering per slot, med direkte lenker til konkrete
          oppgaver i hver av de 5 eksamenene.
        </p>
        <QSlotTable qslots={qslots} />
      </section>

      {/* Top concepts */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
          Top konsepter på tvers av eksamen
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-3xl mb-4">
          Konsepter sortert etter frekvens på tvers av eksamen +
          sensorveiledning + Canvas-quiz (23 kilder totalt). Tier 1 = dukker
          opp i ALLE 5 eksamen-år. Tier 2 = 4/5 år. Klikk for å åpne
          begrepssiden.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topConcepts.map((c) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-mono text-xs text-[var(--muted)]">
                    #{c.rank}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${tierBadge(c.tier)}`}
                  >
                    Tier {c.tier}
                  </span>
                </div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {c.label}
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{c.note}</p>
              </>
            );
            if (c.href) {
              return (
                <Link
                  key={c.slug}
                  href={c.href}
                  className="block rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[var(--card)] p-3 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm transition-all"
                >
                  {inner}
                </Link>
              );
            }
            return (
              <div
                key={c.slug}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30 p-3"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pattern cards */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
          Gjentakende mønstre — pattern cards
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-3xl mb-5">
          Hvert kort beskriver ett mønster som dukker opp gjentatte ganger.
          Følg "Se eksempel"-lenkene for konkrete oppgaver, "Les mer" for
          dyptgående begreps-sider, og "Øv på dette" for øvingshub.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {patterns.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
      </section>

      {/* Methode-disclaimer */}
      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/40 p-4 mb-6">
        <h3 className="font-bold text-sm mb-2 text-neutral-900 dark:text-neutral-50">
          Om datagrunnlaget
        </h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Aggregering basert på 5 komplette eksamen-par (oppgave + sensor) fra
          2022, 2023, 2024-01, 2024-05 og 2025-01. Stabilitets-tags som "5/5
          år" refererer til denne basen. Konsept-frekvens skanner i tillegg
          12 Canvas-quizzer og 6 sensorveiledninger. Aggregeringen er
          coverage/signal-analyse, ikke personlig prestasjons-vurdering.
          Detaljerte oppgaver finner du ved å følge eksempel-lenkene til hver
          eksamen.
        </p>
      </div>
    </div>
  );
}
