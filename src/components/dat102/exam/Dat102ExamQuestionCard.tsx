import type {
  DAT102ExamQuestion,
  ExamSubquestion,
  SourceRef,
} from "@/lib/dat102-vault/types";
import Dat102SolutionAccordion from "./Dat102SolutionAccordion";
import { ItemStatusBadge } from "./Dat102ExamStatusBadge";
import Dat102LearnMoreLinks from "../oving/Dat102LearnMoreLinks";
import Dat102Sources from "../Dat102Sources";

interface Props {
  question: DAT102ExamQuestion;
  topicLabel: string;
}

function dedupeRefs(refs: SourceRef[]): SourceRef[] {
  const seen = new Set<string>();
  const out: SourceRef[] = [];
  for (const r of refs) {
    const key = `${r.label}|${r.pages ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

// Ærlig løsnings-/status-blokk per deloppgave.
function SubSolution({ sub }: { sub: ExamSubquestion }) {
  if (sub.solution) return <Dat102SolutionAccordion solution={sub.solution} />;
  // Ingen løsning: vær ærlig om hvorfor, dikt aldri opp.
  const msg =
    sub.status === "scanned_only"
      ? "Kun skannet materiale — oppgavetekst og løsning er ikke tilgjengelig som tekst ennå."
      : "Løsning mangler / ikke segmentert ennå.";
  return (
    <div className="mt-3 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/40 px-4 py-2.5 text-sm text-[var(--muted)]">
      <span aria-hidden>🔒 </span>
      {msg}
    </div>
  );
}

// Ett eksamensoppgavekort med per-deloppgave-status, løsnings-accordion (eller
// ærlig "mangler"-note), figur-merknad, learnMore og samlet kildesammendrag.
export default function Dat102ExamQuestionCard({ question, topicLabel }: Props) {
  const allRefs = dedupeRefs(
    question.subquestions.flatMap((s) => s.sourceMeta?.refs ?? [])
  );

  return (
    <section
      id={question.anchor}
      className="scroll-mt-24 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 md:p-6 mb-6 shadow-sm"
    >
      <header className="mb-4 flex items-baseline gap-3 flex-wrap">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Oppgave {question.number}
        </h2>
        {question.points !== null && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
            {question.points} p
          </span>
        )}
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-dat102-100 dark:bg-dat102-900/40 text-dat102-700 dark:text-dat102-300">
          {topicLabel}
        </span>
      </header>

      <div className="space-y-5">
        {question.subquestions.map((sub, i) => (
          <div
            key={sub.letter ?? `sub-${i}`}
            id={`${question.anchor}-${sub.letter ?? i + 1}`}
            className="scroll-mt-24 rounded-xl border border-neutral-200 dark:border-neutral-800/60 bg-neutral-50/60 dark:bg-neutral-900/40 p-4"
          >
            <div className="mb-2 flex items-center gap-2 flex-wrap">
              {sub.letter && (
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">
                  {sub.letter})
                </span>
              )}
              {sub.qtype && (
                <span className="text-[10px] uppercase tracking-wide font-semibold text-neutral-500 dark:text-neutral-400">
                  {sub.qtype}
                </span>
              )}
              {sub.points !== null && (
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  {sub.points} p
                </span>
              )}
              <span className="ml-auto">
                <ItemStatusBadge status={sub.status} />
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-100 whitespace-pre-wrap">
              {sub.prompt}
            </p>

            {sub.figureNote && (
              <aside
                role="note"
                className="mt-3 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20 text-sm text-amber-900 dark:text-amber-100"
              >
                <strong className="font-semibold">🖼️ Figur-merknad:</strong>{" "}
                {sub.figureNote}
              </aside>
            )}

            <SubSolution sub={sub} />

            {sub.learnMoreLinks && sub.learnMoreLinks.length > 0 && (
              <Dat102LearnMoreLinks links={sub.learnMoreLinks} />
            )}
          </div>
        ))}
      </div>

      {allRefs.length > 0 && <Dat102Sources sources={allRefs} />}
    </section>
  );
}
