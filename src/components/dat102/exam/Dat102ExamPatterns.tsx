import Link from "next/link";
import type { DAT102ExamPattern } from "@/lib/dat102-vault/types";
import Dat102Badge from "../Dat102Badge";
import Dat102Section from "../Dat102Section";
import Dat102Markdown from "../Dat102Markdown";

interface Props {
  patterns: DAT102ExamPattern[];
}

// Rekkefølge + kort innramming per mønster. Titlene tas fra dataene.
const ORDER = ["recurring-questions", "concept-frequency", "question-type-catalog"];
const INTRO: Record<string, string> = {
  "recurring-questions": "Hvilke temaer dukker opp på tvers av sesjoner.",
  "concept-frequency": "Hvor ofte hvert begrep er observert i oppgavetekst eller løsning.",
  "question-type-catalog": "Hvilke oppgaveformater du møter, og i hvilke sesjoner.",
};

export default function Dat102ExamPatterns({ patterns }: Props) {
  const ordered = [...patterns].sort(
    (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)
  );

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Dat102Badge tone="ny">Ny</Dat102Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            DAT102 · Gjengangere
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Gjengangere og mønstre
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          Hva som går igjen på tvers av eksamenssesjonene — temaer, begreper og
          oppgaveformater. Grunnlaget er lesing av alle åtte sesjonene
          (2020–2026); der enkeltobservasjoner er tynne, sier mønstrene det selv.
        </p>
      </div>

      {/* Prioritering: hvordan bruke gjengangerne */}
      <div className="rounded-xl border border-dat102-200 dark:border-dat102-900 bg-dat102-50/50 dark:bg-dat102-950/30 px-5 py-4 mb-8">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
          Prioriteringsliste til eksamenslesing
        </h2>
        <ol className="ml-5 list-decimal space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
          <li>Begynn med temaene øverst i sesjon × tema-matrisen — de er nesten alltid med.</li>
          <li>Pugg Tier 1-begrepene under konsept-frekvens; de bærer flest poeng.</li>
          <li>Øv på oppgaveformatene i katalogen — særlig tracing, Big-O og koding.</li>
          <li>Test deg på <Link href="/dat102/oving/quiz" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline">quiz</Link> og <Link href="/dat102/oving/drills" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline">drills</Link> for de samme temaene.</li>
        </ol>
      </div>

      {ordered.map((p) => (
        <Dat102Section
          key={p.slug}
          eyebrow={`Grunnlag: ${p.sessionsCovered.length} sesjoner`}
          title={p.title}
          description={INTRO[p.slug]}
        >
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4">
            <Dat102Markdown content={p.body} />
          </div>
        </Dat102Section>
      ))}

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link href="/dat102/eksamen" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
          ← Alle eksamener
        </Link>
        <Link href="/dat102/temaer" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
          Temaer
        </Link>
        <Link href="/dat102/oving" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
          Øving
        </Link>
      </div>
    </div>
  );
}
