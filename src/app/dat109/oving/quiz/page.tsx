"use client";

import Link from "next/link";
import QuizRunner from "@/components/dat109/oving/QuizRunner";
import { ALL_QUIZ_QUESTIONS } from "@/lib/quiz-data";

export default function QuizPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/oving" className="hover:text-[var(--accent)]">Øving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Flervalg-quiz</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Flervalg-quiz</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Velg temaer du vil testes i. Du får både ekte eksamensspørsmål (V2023+V2024) og
          generert innhold. Forklaringer vises ETTER du har svart — aldri før.
        </p>
      </div>

      <QuizRunner allQuestions={ALL_QUIZ_QUESTIONS} />
    </div>
  );
}
