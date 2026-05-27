import type { ExamQuestion } from "@/lib/dat110-vault/types";
import VaultMarkdown from "./VaultMarkdown";
import SolutionAccordion from "./SolutionAccordion";
import LearnMoreLinks from "./LearnMoreLinks";

interface Props {
  question: ExamQuestion;
}

// One exam question card. Renders the question prompt, optional figureNote
// caveat, and either a single solution accordion (when no subquestions) OR
// per-subquestion accordions (each collapsed by default).
//
// SourceRefs are NEVER shown inline — they live in the data for grounding only
// and can surface via expandable "Kilder og grunnlag" on concept/topic pages.
export default function ExamQuestionCard({ question }: Props) {
  const hasSubs = Array.isArray(question.subquestions) && question.subquestions.length > 0;

  return (
    <section
      id={`oppg-${question.number}`}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 md:p-6 mb-6 shadow-sm scroll-mt-24"
    >
      <header className="mb-3 flex items-baseline gap-3 flex-wrap">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Oppgave {question.number}
        </h2>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
          {question.weightPercent} %
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100">
          tema: {question.topic}
        </span>
      </header>

      <div className="mb-4 text-neutral-800 dark:text-neutral-100">
        <VaultMarkdown content={question.prompt} />
      </div>

      {question.figureNote && (
        <aside
          className="mb-4 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20 text-sm text-amber-900 dark:text-amber-100"
          role="note"
        >
          <strong className="font-semibold">Figur-merknad:</strong>{" "}
          {question.figureNote}
        </aside>
      )}

      {/* Question-level solution (only when no subquestions). */}
      {!hasSubs && question.solution && (
        <SolutionAccordion solution={question.solution} />
      )}

      {/* Per-subquestion solutions. */}
      {hasSubs && (
        <div className="mt-5 space-y-5">
          {question.subquestions!.map((sub) => (
            <div
              key={sub.letter}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800/60 bg-neutral-50/60 dark:bg-neutral-900/40 p-4"
            >
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">
                  {sub.letter})
                </span>
                {sub.qtype && (
                  <span className="text-[10px] uppercase tracking-wide font-semibold text-neutral-500 dark:text-neutral-400">
                    {sub.qtype}
                  </span>
                )}
              </div>
              <div className="text-neutral-800 dark:text-neutral-100">
                <VaultMarkdown content={sub.prompt} />
              </div>
              <SolutionAccordion solution={sub.solution} />
            </div>
          ))}
        </div>
      )}

      {/* Question-level learnMoreLinks at the bottom of the card. */}
      {question.learnMoreLinks && question.learnMoreLinks.length > 0 && (
        <LearnMoreLinks
          links={question.learnMoreLinks}
          label="Les mer om dette emnet"
        />
      )}
    </section>
  );
}
