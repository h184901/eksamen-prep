import Link from "next/link";
import type { DAT110Exam } from "@/lib/dat110-vault/types";
import ExamQuestionCard from "@/components/dat110/ExamQuestionCard";
import ReconstructedExamBanner from "@/components/dat110/ReconstructedExamBanner";

interface Props {
  exam: DAT110Exam;
}

// Map exam.session → norsk månedsnavn (samme konvensjon som ExamPageLayout).
function sessionLabel(session: string): string {
  switch (session) {
    case "01":
      return "Januar";
    case "05":
      return "Mai";
    case "06":
      return "Juni";
    default:
      return session;
  }
}

// "Sim-modus"-visning av en eksamen:
//   - Brødsmuler peker tilbake til /dat110/oving/eksamen-sim
//   - Stor 4-timers-bannermerknad øverst
//   - Reuse ExamQuestionCard (løsninger er allerede lukket som standard)
//   - Footer-CTA til /dat110/eksamen/[slug] for cross-check etter økten
//
// Vi modifiserer IKKE ExamPageLayout — i stedet duplikerer vi minimal struktur
// her slik at "sim-modus"-narrativet er tydelig (4-timer, fasit-skjult, ingen
// timer/scoring). Ingen client-state, ingen lagring.
export default function ExamSimulationLayout({ exam }: Props) {
  const isReconstructed = exam.reconstructedFromSensor === true;
  const friendlyPeriod = `${sessionLabel(exam.session)} ${exam.year}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav
        aria-label="Brødsmuler"
        className="mb-4 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110/oving" className="hover:text-[var(--accent)]">
          Øving
        </Link>
        <span aria-hidden>/</span>
        <Link
          href="/dat110/oving/eksamen-sim"
          className="hover:text-[var(--accent)]"
        >
          Eksamenssimulering
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">
          {friendlyPeriod}
        </span>
      </nav>

      {isReconstructed && exam.bannerWarning && (
        <ReconstructedExamBanner warning={exam.bannerWarning} />
      )}

      <header className="mb-6">
        <div className="flex items-baseline gap-2 flex-wrap mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-100 uppercase tracking-wide">
            Sim-modus
          </span>
          {isReconstructed ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 uppercase tracking-wide">
              Rekonstruert
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-100 uppercase tracking-wide">
              Offisiell · komplett
            </span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
            sesjon: {exam.session}-{exam.year}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
            {exam.questions.length} oppgaver · {exam.totalWeight} %
          </span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {exam.displayLabel}
        </h1>
      </header>

      <aside
        role="note"
        className="mb-6 rounded-xl border border-rose-300 dark:border-rose-700 bg-rose-50/60 dark:bg-rose-950/20 px-4 py-3 text-sm text-rose-900 dark:text-rose-100"
      >
        <p className="font-semibold mb-1">Anbefalt: 4 timer uten fasit</p>
        <p>
          Start en timer på 4 timer. Skriv svar i et eget dokument eller for
          hånd. Alle <strong>«Vis løsning»</strong>-bokser er lukket som
          standard — la dem være det. Hvis du står helt fast på én enkelt
          oppgave, kan du åpne <em>én</em> løsning som hint, men prøv først.
        </p>
      </aside>

      {exam.questions.length > 0 && (
        <nav
          aria-label="Hopp til oppgave"
          className="mb-8 flex flex-wrap gap-2"
        >
          {exam.questions.map((q) => (
            <a
              key={q.number}
              href={`#oppg-${q.number}`}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
            >
              Q{q.number} ({q.weightPercent}%)
            </a>
          ))}
        </nav>
      )}

      <div>
        {exam.questions.map((q) => (
          <ExamQuestionCard key={q.number} question={q} />
        ))}
      </div>

      <section className="mt-10 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
        <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-2">
          Ferdig? Sjekk fasit på full eksamen-siden
        </h2>
        <p className="text-sm text-emerald-900/90 dark:text-emerald-100/90 mb-3">
          Gå til den fulle eksamen-siden for å se sensorveiledningens svar med
          kort begrunnelse og vanlige feil. Sammenlikne med dine egne svar og
          noter ned hva du må repetere.
        </p>
        <Link
          href={`/dat110/eksamen/${exam.slug}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
        >
          Åpne full eksamen-side ({friendlyPeriod}) →
        </Link>
      </section>

      <footer className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
        <p>
          Sim-modus lagrer ingenting — ingen timer, ingen scoring, ingen
          state. Bare en rolig studie-visning av oppgavene.
        </p>
      </footer>
    </div>
  );
}
