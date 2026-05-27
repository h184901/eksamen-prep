import Link from "next/link";
import QuizRunner from "@/components/dat110/oving/QuizRunner";
import { getAllQuizQuestions } from "@/lib/dat110-vault/loader";

export const metadata = {
  title: "Flervalg-quiz — DAT110",
};

// /dat110/oving hub is implemented in P0c.3; until then the "Øving"-crumb is
// plain text. We keep the route '/dat110/oving/quiz' so we can hot-link from
// the landing redesign (P0c.4) without touching this file again.
export default function QuizPage() {
  const allQuestions = getAllQuizQuestions();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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
        <span className="text-neutral-500 dark:text-neutral-400">Øving</span>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">
          Flervalg-quiz
        </span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
          Flervalg-quiz
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl">
          Velg temaer og kilder du vil testes i. Forklaringer og «Les
          mer»-lenker vises ETTER du har svart — aldri før. På «velg alle som
          passer»-spørsmål må du klikke «Bekreft svar» når du er ferdig.
        </p>
      </header>

      <QuizRunner allQuestions={allQuestions} />
    </div>
  );
}
