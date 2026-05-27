import Link from "next/link";
import { getExamSummaries } from "@/lib/dat110-vault/loader";

export const metadata = {
  title: "Eksamenssimulering — DAT110",
};

// Map "01"/"05"/"06" → norsk månedsnavn (samme konvensjon som /dat110/eksamen).
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

function examPeriodCaption(year: number, session: string): string {
  return `${sessionLabel(session)} ${year}`;
}

export default function EksamenSimHubPage() {
  const exams = getExamSummaries();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Brødsmuler */}
      <nav
        aria-label="Brødsmuler"
        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-wrap"
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
        <span className="text-neutral-700 dark:text-neutral-200">
          Eksamenssimulering
        </span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
          Eksamenssimulering
        </h1>
        <p className="text-neutral-700 dark:text-neutral-200 max-w-3xl">
          Velg en eksamen, ta 4 timer uten å se på fasit. Når du er ferdig, gå
          til den fulle eksamen-siden for å sjekke svarene. Bruk gjerne{" "}
          <strong>«Vis løsning»</strong>-accordion på enkelt-oppgaver først hvis
          du står helt fast.
        </p>
      </header>

      <div
        role="note"
        className="mb-8 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/20 px-4 py-3 text-sm text-amber-900 dark:text-amber-100"
      >
        <strong>Anbefalt bruk:</strong> sett 4 timer på timer-appen din, åpne
        eksamen under, og skriv svarene for hånd eller i et eget dokument. Ikke
        klikk «Vis løsning» før tiden er ute.
      </div>

      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        Velg eksamen å simulere
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {exams.map((exam) => {
          const isReconstructed = exam.reconstructedFromSensor === true;
          return (
            <Link
              key={exam.slug}
              href={`/dat110/oving/eksamen-sim/${exam.slug}`}
              className={`group relative rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${
                isReconstructed
                  ? "border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600"
                  : "border-rose-300 dark:border-rose-700 hover:border-rose-400 dark:hover:border-rose-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    isReconstructed
                      ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200"
                      : "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200"
                  }`}
                >
                  {isReconstructed ? "Rekonstruert" : "Sim-modus"}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {exam.questionCount} oppgaver · {exam.totalWeight} %
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-neutral-50 group-hover:text-[var(--accent)] transition-colors">
                {examPeriodCaption(exam.year, exam.session)}
              </h3>
              <p className="text-sm text-[var(--muted)] line-clamp-2">
                {exam.displayLabel}
              </p>
              <p className="mt-3 text-xs font-semibold text-rose-700 dark:text-rose-300">
                Start 4-timers økt →
              </p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/40 p-4">
        <h3 className="font-bold text-sm mb-2 text-neutral-900 dark:text-neutral-50">
          Hvordan sim-modus skiller seg fra vanlig eksamen-side
        </h3>
        <ul className="text-xs text-[var(--muted)] list-disc list-inside space-y-1">
          <li>
            Alle løsninger er lukket som standard — samme som ordinær eksamen-
            side, men her er det poenget å la dem være lukket hele økten.
          </li>
          <li>
            Ingen timer, ingen scoring, ingen lagring — du har full kontroll på
            din egen tid og notater.
          </li>
          <li>
            Etter økten: gå til den fulle eksamen-siden via lenken nederst på
            sim-siden for å kryss-sjekke svar mot fasit.
          </li>
        </ul>
      </div>
    </div>
  );
}
