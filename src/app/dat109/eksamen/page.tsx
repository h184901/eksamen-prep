"use client";

import Link from "next/link";

export default function EksamenPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamen</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Eksamen</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle tidligere eksamener (2020–2024) med fullstendige
          løsningsforslag og forklaringer. Inkluderer både ordinære
          eksamener og konteeksamener.
        </p>
      </div>

      {/* Tilgjengelige eksamener */}
      <h2 className="text-xl font-bold mb-4">Tilgjengelige eksamener</h2>
      <div className="space-y-3 mb-10">
        {[
          { year: "Vår 2024", file: "DAT109 - Eksamen vår 2024 full versjon.docx", type: "Ordinær" },
          { year: "Høst 2023", file: "DAT109 - Konteeksamen høst 2023.docx", type: "Konte" },
          { year: "Vår 2023", file: "DAT109 - Eksamen vår 2023 - nytt løsningsforslag.pdf", type: "Ordinær + fasit" },
          { year: "2022", file: "DAT109 - Eksamen 2022.pdf", type: "Ordinær" },
          { year: "2022", file: "DAT109 - Kontinuasjonseksamen 2022.pdf", type: "Konte" },
          { year: "2021", file: "DAT109 - Eksamen 2021 Løsning.pdf", type: "Fasit" },
          { year: "Høst 2020", file: "DAT109 - Eksamen høst 2020 - løsning.pdf", type: "Ordinær + fasit" },
        ].map((exam) => (
          <div
            key={exam.file}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{exam.year}</p>
              <p className="text-sm text-[var(--muted)]">{exam.type}</p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              Kommer
            </span>
          </div>
        ))}
      </div>

      {/* Placeholder */}
      <div className="rounded-xl border-2 border-dashed border-red-300 dark:border-red-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Fullstendige løsningsforslag kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Hver eksamen vil bli gjennomgått oppgave for oppgave med
          fullstendige løsningsforslag, forklaringer og alternative
          tilnærminger.
        </p>
      </div>
    </div>
  );
}
