import Link from "next/link";
import type { ExamOverviewData } from "@/lib/dat102-vault/exam-adapter";
import Dat102Section from "../Dat102Section";
import Dat102Badge from "../Dat102Badge";
import Dat102ExamCard from "./Dat102ExamCard";

interface Props {
  data: ExamOverviewData;
}

// Eksamen-oversikt: nøkkeltall + ærlig status-fordeling + kort til hver eksamen.
export default function Dat102ExamOverview({ data }: Props) {
  const { exams, totals } = data;
  const stats: { label: string; value: string }[] = [
    { label: "Eksamenssett", value: String(totals.examCount) },
    { label: "Oppgaver", value: String(totals.questionCount) },
    { label: "Deloppgaver", value: String(totals.subquestionCount) },
    {
      label: "Komplette / delvise sett",
      value: `${totals.completeExams} / ${totals.partialExams}`,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Dat102Badge tone="ny">Ny</Dat102Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            DAT102 · Eksamen
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Tidligere eksamener
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          {totals.examCount} eksamenssett fra 2020–2026, segmentert oppgave for
          oppgave. Noen sett er bevart som skannet materiale uten full tekst —
          det er tydelig merket, så du vet hva som finnes.
        </p>
      </div>

      {/* Nøkkeltall */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3"
          >
            <p className="text-2xl font-bold text-dat102-700 dark:text-dat102-300">
              {s.value}
            </p>
            <p className="text-xs text-[var(--muted)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Ærlig deloppgave-status-fordeling */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
          Deloppgave-status ({totals.subquestionCount} totalt)
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          <span className="text-neutral-700 dark:text-neutral-200">
            <span className="font-semibold text-green-700 dark:text-green-300">
              {totals.subqStatus.complete}
            </span>{" "}
            komplette
          </span>
          <span className="text-neutral-700 dark:text-neutral-200">
            <span className="font-semibold text-amber-700 dark:text-amber-300">
              {totals.subqStatus.partial}
            </span>{" "}
            delvise
          </span>
          <span className="text-neutral-700 dark:text-neutral-200">
            <span className="font-semibold text-neutral-500 dark:text-neutral-400">
              {totals.subqStatus.scanned_only}
            </span>{" "}
            kun skannet
          </span>
          <span className="text-neutral-700 dark:text-neutral-200">
            <span className="font-semibold text-neutral-500 dark:text-neutral-400">
              {totals.subqStatus.missing_solution}
            </span>{" "}
            mangler løsning
          </span>
        </div>
      </div>

      {/* Snarvei til gjengangere */}
      <Link
        href="/dat102/eksamen/gjengangere"
        className="group flex items-center justify-between gap-3 rounded-xl border border-dat102-200 dark:border-dat102-900 bg-dat102-50/50 dark:bg-dat102-950/30 px-5 py-4 mb-8 transition-colors hover:border-dat102-400/70"
      >
        <span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
            Gjengangere og mønstre
          </span>
          <span className="block text-sm text-[var(--muted)]">
            Hvilke temaer og oppgavetyper går igjen — og hva du bør prioritere.
          </span>
        </span>
        <span aria-hidden className="text-dat102-600 dark:text-dat102-400 text-xl">
          →
        </span>
      </Link>

      <Dat102Section eyebrow="Alle sett" title="Velg en eksamen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <Dat102ExamCard key={exam.slug} exam={exam} />
          ))}
        </div>
      </Dat102Section>
    </div>
  );
}
