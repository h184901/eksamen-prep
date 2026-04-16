"use client";

export default function FormulaClickCallout({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      role="note"
      className={`rounded-xl border-2 border-dashed border-[var(--accent)] bg-[var(--accent)]/10 dark:bg-[var(--accent)]/15 p-4 md:p-5 mb-6 flex items-start gap-3 md:gap-4 ${className}`}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-sm"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="22"
          height="22"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-base md:text-lg mb-1 text-[var(--foreground)]">
          Trykk på en formel for å se forklaring, enheter og når du skal bruke
          den
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Formler med et{" "}
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[var(--accent)] text-[var(--accent)] align-middle">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>{" "}
          info-ikon er klikkbare. Der får du hva formelen betyr fysisk, alle
          variabler med enheter (f.eks Coulomb (C), Joule (J)), når du skal
          bruke den — og når du må bruke en annen formel i stedet.
        </p>
      </div>
    </div>
  );
}
