import type { ExamQuestion } from "@/lib/dat110-vault/types";
import type { Dat110Lang } from "@/lib/dat110-language";
import VaultMarkdown from "./VaultMarkdown";
import SolutionAccordion from "./SolutionAccordion";
import LearnMoreLinks from "./LearnMoreLinks";
import ExamChordRingFigure from "./diagrams/ExamChordRingFigure";

interface Props {
  question: ExamQuestion;
  examSlug?: string;
  // Optional: localizes only the card chrome (labels), never the question prompt
  // or solution body. Defaults to Norwegian, so the exam-sim and DAT109 callers
  // that omit it render exactly as before. (Type-only import keeps this shared
  // component free of any runtime coupling to the DAT110 language store.)
  lang?: Dat110Lang;
}

// Noen rekonstruerte eksamener lagrer en oppgavetekst som den engelske originalen
// etterfulgt av den norske oversettelsen, atskilt med en blank linje:
//   "<engelsk spørsmål>\n\n<norsk spørsmål>".
// Nettsiden viser eksamensinnhold på norsk, så når vi gjenkjenner akkurat denne
// formen rendrer vi kun den norske halvdelen (unngår at spørsmålet vises to ganger
// på to språk). Rent engelske oppgaver (f.eks. Canvas-MCQ-ene i oppgave 1) har
// ingen norsk blokk og røres ikke. Sjekken er bevisst konservativ: blokken rett
// etter den engelske må være norsk *prosa* (ikke en kode-/tabell-blokk, som i
// "Compute …\n\nP1: s1, a …"), slik at vi aldri fjerner et rent engelsk spørsmål.
function preferNorwegianExamPrompt(text: string): string {
  if (!text.includes("\n\n")) return text;
  const paras = text.split("\n\n");
  const head = paras[0];
  const next = paras[1] ?? "";
  const hasAeoa = (s: string) => /[æøåÆØÅ]/.test(s);
  const noWords =
    /\b(hvilke|hvilken|hva|hvorfor|forklar|beregn|hvordan|på|kort|finn|anta|oppgave|spørsmål|som|ikke|den|det|de|er|og|deres|mellom|et|en)\b/i;
  const enWords =
    /\b(what|which|how|why|when|where|explain|describe|briefly|list|sketch|compute|resolve|assume|consider|suppose|at what|in the|the |this task|some of|when the|are|is)\b/i;
  const headEnglish = !hasAeoa(head) && enWords.test(head) && !noWords.test(head);
  const nextIsCodeOrTable =
    /^\s*[`|>]/.test(next) || /^[A-Za-z0-9_().+\-]+:\s/.test(next.trim());
  const nextNorwegianProse =
    (hasAeoa(next) || noWords.test(next)) && !nextIsCodeOrTable;
  return headEnglish && nextNorwegianProse ? paras.slice(1).join("\n\n") : text;
}

// Pedagogiske figurer KUN for oppgaver der ring-strukturen er fullt spesifisert
// i oppgavetekst/sensorveiledning (ikke gjettet). Originaltopologier som bare
// finnes i PDF beholder sin tekstlige figur-merknad — se ExamQuestionCard.
function ExamQuestionFigure({
  examSlug,
  number,
}: {
  examSlug: string;
  number: number;
}) {
  if (examSlug === "dat110-eksamen-06-2025" && number === 10) {
    return (
      <ExamChordRingFigure
        m={5}
        nodes={[5, 15, 23, 27]}
        caption="Chord-ring (m = 5, id-rom 0–31) med server-replikaer på 5, 15, 23 og 27."
      />
    );
  }
  if (examSlug === "dat110-eksamen-05-2024" && number === 10) {
    return (
      <ExamChordRingFigure
        m={5}
        nodes={[0, 9, 17, 30]}
        caption="Chord-ring (id-rom 0–31) med fire noder på 0, 9, 17 og 30."
      />
    );
  }
  return null;
}

// One exam question card. Renders the question prompt, optional figureNote
// caveat, and either a single solution accordion (when no subquestions) OR
// per-subquestion accordions (each collapsed by default).
//
// SourceRefs are NEVER shown inline — they live in the data for grounding only
// and can surface via expandable "Kilder og grunnlag" on concept/topic pages.
export default function ExamQuestionCard({
  question,
  examSlug,
  lang = "no",
}: Props) {
  const hasSubs = Array.isArray(question.subquestions) && question.subquestions.length > 0;
  const t = (no: string, en: string) => (lang === "en" ? en : no);

  return (
    <section
      id={`oppg-${question.number}`}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 md:p-6 mb-6 shadow-sm scroll-mt-24"
    >
      <header className="mb-3 flex items-baseline gap-3 flex-wrap">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          {t("Oppgave", "Question")} {question.number}
        </h2>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
          {question.weightPercent} %
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100">
          {t("tema", "topic")}: {question.topic}
        </span>
      </header>

      <div className="mb-4 text-neutral-800 dark:text-neutral-100">
        <VaultMarkdown content={preferNorwegianExamPrompt(question.prompt)} />
      </div>

      {question.figureNote && (
        <aside
          className="mb-4 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20 text-sm text-amber-900 dark:text-amber-100"
          role="note"
        >
          <strong className="font-semibold">
            {t("Figur-merknad", "Figure note")}:
          </strong>{" "}
          {question.figureNote}
        </aside>
      )}

      {/* Pedagogisk figur der strukturen er trygt utledbar fra data. */}
      {examSlug && (
        <ExamQuestionFigure examSlug={examSlug} number={question.number} />
      )}

      {/* Question-level solution (only when no subquestions). */}
      {!hasSubs && question.solution && (
        <SolutionAccordion solution={question.solution} lang={lang} />
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
                <VaultMarkdown content={preferNorwegianExamPrompt(sub.prompt)} />
              </div>
              <SolutionAccordion solution={sub.solution} lang={lang} />
            </div>
          ))}
        </div>
      )}

      {/* Question-level learnMoreLinks at the bottom of the card. */}
      {question.learnMoreLinks && question.learnMoreLinks.length > 0 && (
        <LearnMoreLinks
          links={question.learnMoreLinks}
          label={t("Les mer om dette emnet", "Learn more about this topic")}
        />
      )}
    </section>
  );
}
