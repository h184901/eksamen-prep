import Link from "next/link";
import type { ObligView } from "@/lib/dat102-vault/exam-adapter";
import type { ObligStatus } from "@/lib/dat102-vault/types";
import Dat102Badge, { type Dat102BadgeTone } from "../Dat102Badge";
import Dat102Sources from "../Dat102Sources";

const STATUS: Record<ObligStatus, { label: string; tone: Dat102BadgeTone; note: string }> = {
  full_text_available: {
    label: "Fulltekst",
    tone: "ny",
    note: "Full oppgavetekst er tilgjengelig.",
  },
  partial: {
    label: "Delvis",
    tone: "warn",
    note: "Bare deler av materialet finnes — se merknad under.",
  },
  index_only: {
    label: "Kun oversikt",
    tone: "neutral",
    note: "Bare indeks/metadata er tilgjengelig, ikke full oppgavetekst.",
  },
  missing_source: {
    label: "Mangler kilde",
    tone: "soon",
    note: "Selve oppgaveteksten finnes ikke i materialet — kun tema/metadata.",
  },
};

// Øvingslenker per oblig. Vi har ikke dyp tema-filtrering på øvingssidene ennå,
// så vi lenker til øvingsmodusene + temasidene (som har egne øvingsinnganger).
const PRACTICE: { href: string; label: string }[] = [
  { href: "/dat102/oving/quiz", label: "Quiz" },
  { href: "/dat102/oving/drills", label: "Drills" },
  { href: "/dat102/oving/flashcards", label: "Flashcards" },
  { href: "/dat102/oving/matching", label: "Matching" },
];

export default function Dat102ObligCard({ oblig }: { oblig: ObligView }) {
  const status = STATUS[oblig.status];
  const hasDeadline = oblig.deadline && oblig.deadline !== "—";
  const hasWeeks = oblig.weeks && oblig.weeks !== "—";

  return (
    <section
      id={oblig.anchor}
      className="scroll-mt-24 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h2 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">
          {oblig.title}
        </h2>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {oblig.hasSolution && <Dat102Badge tone="concept">+ løsning</Dat102Badge>}
          <Dat102Badge tone={status.tone}>{status.label}</Dat102Badge>
        </div>
      </div>

      {(hasDeadline || hasWeeks) && (
        <p className="text-xs text-[var(--muted)] mb-2">
          {hasDeadline && <>Frist {oblig.deadline}</>}
          {hasDeadline && hasWeeks && " · "}
          {hasWeeks && <>uke {oblig.weeks}</>}
        </p>
      )}

      {oblig.themes && (
        <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed mb-2">
          {oblig.themes}
        </p>
      )}

      {/* Ærlig status-note (alltid; ekstra detalj hvis statusNote finnes) */}
      <div
        className={`text-xs rounded-lg px-3 py-2 mb-3 ${
          oblig.status === "full_text_available"
            ? "bg-green-50/60 dark:bg-green-950/20 text-green-800 dark:text-green-200"
            : "bg-amber-50/60 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200"
        }`}
      >
        {status.note}
        {oblig.statusNote && <span className="opacity-90"> ({oblig.statusNote})</span>}
      </div>

      {/* Temaer */}
      {oblig.topics.length > 0 && (
        <div className="mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
            Temaer
          </p>
          <div className="flex flex-wrap gap-1.5">
            {oblig.topics.map((t) => (
              <Link
                key={t.slug}
                href={`/dat102/temaer/${t.slug}`}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border border-dat102-200 dark:border-dat102-900 hover:bg-dat102-100 dark:hover:bg-dat102-900/60 transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Begreper */}
      {oblig.concepts.length > 0 && (
        <div className="mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
            Begreper
          </p>
          <div className="flex flex-wrap gap-1.5">
            {oblig.concepts.map((c) => (
              <Link
                key={c.slug}
                href={`/dat102/begreper/${c.slug}`}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Øvingslenker */}
      <div className="mb-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
          Øv på temaene
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PRACTICE.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-dat102-300 dark:border-dat102-700 text-dat102-700 dark:text-dat102-300 hover:bg-dat102-50 dark:hover:bg-dat102-950/40 transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      {oblig.sources.length > 0 && <Dat102Sources sources={oblig.sources} />}
    </section>
  );
}
