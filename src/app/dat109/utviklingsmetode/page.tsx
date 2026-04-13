"use client";

import Link from "next/link";

export default function UtviklingsmetodePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Utviklingsmetode</span>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-2 inline-block">
          ~20% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">Utviklingsmetode</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Scrum, Extreme Programming, TDD, CI/CD, AUP og smidig utvikling.
          Fra 2023 er dette flervalg på eksamen.
        </p>
      </div>

      {/* Placeholder content */}
      <div className="rounded-xl border-2 border-dashed border-sysdev-300 dark:border-sysdev-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her kommer teori og flervalgsdrilling for Scrum (roller, artefakter,
          seremonier), XP-praksiser, TDD-syklusen, CI/CD-pipelines, AUP-faser
          og DevOps-prinsipper.
        </p>
      </div>
    </div>
  );
}
