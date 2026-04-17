"use client";

import { useEffect, useRef, useState } from "react";
import katex from "katex";
import FormulaDetailModal, {
  FormulaDetailData,
  FormulaVariable,
  RelatedFormula,
} from "./FormulaDetailModal";
import { useOptionalTutor } from "./AITutor";

export type { FormulaVariable, RelatedFormula, FormulaDetailData };

interface FormulaBoxProps {
  latex: string;
  title?: string;
  variant?: "gold" | "blue";
  description?: string;
  conceptExplanation?: string;
  whenToUse?: string;
  whenNotToUse?: string;
  alternativForms?: RelatedFormula[];
  variables?: FormulaVariable[];
  derivation?: string;
  relatedFormulas?: RelatedFormula[];
  commonMistakes?: string[];
}

export default function FormulaBox({
  latex,
  title,
  variant = "gold",
  description,
  conceptExplanation,
  whenToUse,
  whenNotToUse,
  alternativForms,
  variables,
  derivation,
  relatedFormulas,
  commonMistakes,
}: FormulaBoxProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const tutor = useOptionalTutor();

  const askTutor = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    tutor?.askAboutFormula(latex, title);
  };

  const hasDetails = Boolean(
    conceptExplanation ||
      whenToUse ||
      whenNotToUse ||
      (variables && variables.length) ||
      (alternativForms && alternativForms.length) ||
      derivation ||
      (relatedFormulas && relatedFormulas.length) ||
      (commonMistakes && commonMistakes.length),
  );

  useEffect(() => {
    if (mathRef.current) {
      katex.render(latex, mathRef.current, {
        displayMode: true,
        throwOnError: false,
        trust: true,
      });
    }
  }, [latex]);

  const accentHeader =
    variant === "gold"
      ? "text-amber-700 dark:text-amber-400"
      : "text-blue-700 dark:text-blue-400";
  const accentBadge =
    variant === "gold"
      ? "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-400 dark:border-amber-600"
      : "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-400 dark:border-blue-600";

  const content = (
    <>
      {hasDetails && (
        <span
          className={`absolute top-2 right-2 inline-flex items-center justify-center w-6 h-6 rounded-full border ${accentBadge} text-[10px] font-bold shadow-sm`}
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>
      )}
      {title && (
        <h4
          className={`text-sm font-semibold mb-2 pr-8 ${accentHeader}`}
        >
          {title}
        </h4>
      )}
      <div
        ref={mathRef}
        className={`text-center overflow-x-auto py-2 ${!title && hasDetails ? "pr-8" : ""}`}
      />
      {description && (
        <p className="text-sm text-[var(--muted)] mt-2">{description}</p>
      )}
      {hasDetails && (
        <div
          className={`flex items-center justify-end gap-1 text-xs font-medium mt-2 ${accentHeader}`}
        >
          <span>Klikk for detaljer</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      )}
    </>
  );

  const baseClasses = `rounded-xl p-4 my-4 relative ${
    variant === "gold" ? "formula-box-gold" : "formula-box-blue"
  }`;

  if (!hasDetails) {
    return <div className={baseClasses}>{content}</div>;
  }

  const detailData: FormulaDetailData = {
    latex,
    title,
    variant,
    description,
    conceptExplanation,
    whenToUse,
    whenNotToUse,
    alternativForms,
    variables,
    derivation,
    relatedFormulas,
    commonMistakes,
  };

  const handleOpenDetails = () => setOpen(true);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpenDetails}
        onKeyDown={handleKeyDown}
        aria-haspopup="dialog"
        aria-label={`Vis detaljer${title ? ` om ${title}` : ""}`}
        className={`${baseClasses} block w-full text-left cursor-pointer transition-all duration-150 ease-out hover:shadow-lg hover:-translate-y-0.5 hover:brightness-[1.02] active:translate-y-0 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]`}
      >
        {content}
        {tutor && (
          <button
            type="button"
            onClick={askTutor}
            aria-label={`Forklar ${title ?? "formelen"} med AI-tutor`}
            className="formula-explain-btn"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            </svg>
            <span>Forklar med AI</span>
          </button>
        )}
      </div>
      <FormulaDetailModal
        open={open}
        onClose={() => setOpen(false)}
        data={detailData}
      />
    </>
  );
}
