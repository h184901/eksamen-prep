import Link from "next/link";
import type { DAT102Exam } from "@/lib/dat102-vault/types";
import { topicLabel } from "@/lib/dat102-vault/exam-adapter";
import Dat102Breadcrumbs from "../Dat102Breadcrumbs";
import { ExamLevelBadge } from "./Dat102ExamStatusBadge";
import Dat102ExamQuestionCard from "./Dat102ExamQuestionCard";

interface Props {
  exam: DAT102Exam;
}

// Ærlig status-note per eksamen-nivå. Tekstene er forhåndsdefinert (ikke
// avhengig av at sessionNote finnes) slik at vi aldri later som skannet/delvis
// er komplett.
function statusNote(exam: DAT102Exam): { tone: "ok" | "warn"; text: string } {
  const scanned = exam.statusCounts.scanned_only;
  if (exam.status === "complete") {
    return {
      tone: "ok",
      text: "Denne eksamenen er segmentert med tilgjengelig tekst og løsning på alle deloppgaver.",
    };
  }
  if (scanned > 0) {
    return {
      tone: "warn",
      text: "Deler av denne eksamenen er bevart som skannet/PDF-materiale; full tekst og løsning er ikke tilgjengelig for alle oppgaver ennå.",
    };
  }
  return {
    tone: "warn",
    text: "Denne eksamenen er delvis segmentert; noen deloppgaver eller løsninger kan mangle (tydelig merket per oppgave).",
  };
}

export default function Dat102ExamDetail({ exam }: Props) {
  const note = statusNote(exam);

  return (
    <div className="max-w-3xl mx-auto">
      <Dat102Breadcrumbs
        trail={[
          { label: "Eksamen", href: "/dat102/eksamen" },
          { label: exam.displayLabel },
        ]}
      />

      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <ExamLevelBadge status={exam.status} />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            {exam.questionCount} oppgaver · {exam.subquestionCount} deloppgaver
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Eksamen {exam.displayLabel}
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">{exam.summary}</p>
      </header>

      {/* Ærlig status-note */}
      <div
        className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
          note.tone === "ok"
            ? "border-green-200 dark:border-green-800/60 bg-green-50/50 dark:bg-green-950/20 text-green-900 dark:text-green-100"
            : "border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100"
        }`}
      >
        {note.text}
        {exam.sessionNote && (
          <p className="mt-1.5 text-[13px] opacity-90">{exam.sessionNote}</p>
        )}
      </div>

      {/* Hopp-til-oppgave-rad */}
      <nav aria-label="Oppgaver" className="mb-8 flex flex-wrap gap-1.5">
        {exam.questions.map((q) => (
          <a
            key={q.anchor}
            href={`#${q.anchor}`}
            className="text-xs font-mono font-medium px-2.5 py-1 rounded-full border bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border-dat102-200 dark:border-dat102-900 hover:bg-dat102-100 dark:hover:bg-dat102-900/60 transition-colors"
          >
            Oppg {q.number}
          </a>
        ))}
      </nav>

      {exam.questions.map((q) => (
        <Dat102ExamQuestionCard
          key={q.anchor}
          question={q}
          topicLabel={topicLabel(q.topic)}
        />
      ))}

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <Link
          href="/dat102/eksamen"
          className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
        >
          ← Alle eksamener
        </Link>
        <Link
          href="/dat102/eksamen/gjengangere"
          className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
        >
          Gjengangere →
        </Link>
      </div>
    </div>
  );
}
