"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

interface FormulaBoxProps {
  latex: string;
  title?: string;
  variant?: "gold" | "blue";
  description?: string;
}

export default function FormulaBox({
  latex,
  title,
  variant = "gold",
  description,
}: FormulaBoxProps) {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current) {
      katex.render(latex, mathRef.current, {
        displayMode: true,
        throwOnError: false,
        trust: true,
      });
    }
  }, [latex]);

  return (
    <div
      className={`rounded-xl p-4 my-4 ${
        variant === "gold" ? "formula-box-gold" : "formula-box-blue"
      }`}
    >
      {title && (
        <h4
          className={`text-sm font-semibold mb-2 ${
            variant === "gold"
              ? "text-amber-700 dark:text-amber-400"
              : "text-blue-700 dark:text-blue-400"
          }`}
        >
          {title}
        </h4>
      )}
      <div ref={mathRef} className="text-center overflow-x-auto py-2" />
      {description && (
        <p className="text-sm text-[var(--muted)] mt-2">{description}</p>
      )}
    </div>
  );
}
