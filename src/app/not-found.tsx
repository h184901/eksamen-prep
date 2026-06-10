import Link from "next/link";

// Norsk 404 for hele nettstedet (erstatter Next.js' engelske standard).
export default function NotFound() {
  return (
    <div className="py-16 sm:py-24 max-w-md mx-auto text-center">
      <p className="text-6xl mb-5" aria-hidden>
        🧭
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
        Siden finnes ikke
      </h1>
      <p className="text-[var(--muted)] leading-relaxed mb-8">
        Lenken kan være feil, eller siden er ikke bygget ennå. Gå tilbake til
        studieløpet og finn faget derfra.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold text-sm px-5 py-2.5 transition-colors"
        >
          Til hjem
        </Link>
        <Link
          href="/dat102"
          className="inline-flex items-center rounded-lg border border-[var(--card-border)] hover:border-dat102-400 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm px-4 py-2.5 transition-colors"
        >
          DAT102
        </Link>
        <Link
          href="/dat110"
          className="inline-flex items-center rounded-lg border border-[var(--card-border)] hover:border-network-400 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm px-4 py-2.5 transition-colors"
        >
          DAT110
        </Link>
      </div>
    </div>
  );
}
