"use client";

import Link from "next/link";
import ExamSimulator from "@/components/dat109/oving/ExamSimulator";
import { EXAM_SETS } from "@/lib/quiz-data/exams";

export default function EksamenSimPage() {
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
        <span className="text-[var(--foreground)]">Eksamenssimulering</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Eksamenssimulering</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Ta en hel tidligere DAT109-eksamen under realistisk tidspress. 4 timer, automatisk
          innlevering når tiden går ut, fasit + selvvurdering når du har levert.
        </p>
      </div>

      <ExamSimulator exams={EXAM_SETS} />
    </div>
  );
}
