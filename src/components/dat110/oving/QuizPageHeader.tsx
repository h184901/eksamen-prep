"use client";

import Link from "next/link";
import { useDat110Lang } from "@/lib/dat110-language/useDat110Lang";
import { quizUi } from "@/lib/dat110-language/quiz-i18n";

// Breadcrumb + title + intro for the quiz page. Language-aware: Norwegian by
// default, English when DAT110 language = English. Client component because the
// language preference lives in localStorage.
export default function QuizPageHeader() {
  const { lang } = useDat110Lang();
  const ui = quizUi(lang);

  return (
    <>
      <nav
        aria-label="Brødsmuler"
        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          {ui.crumbHome}
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-500 dark:text-neutral-400">
          {ui.crumbOving}
        </span>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">
          {ui.crumbQuiz}
        </span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
          {ui.pageTitle}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl">
          {ui.pageIntro}
        </p>
      </header>
    </>
  );
}
