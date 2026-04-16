"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import katex from "katex";
import InlineLatex from "./InlineLatex";

export interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  unitName?: string;
}

export interface RelatedFormula {
  latex: string;
  label: string;
}

export interface FormulaDetailData {
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

interface FormulaDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: FormulaDetailData;
}

function BigLatex({ latex }: { latex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        displayMode: true,
        throwOnError: false,
        trust: true,
      });
    }
  }, [latex]);
  return <div ref={ref} className="text-center overflow-x-auto py-2" />;
}

export default function FormulaDetailModal({
  open,
  onClose,
  data,
}: FormulaDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const variant = data.variant ?? "gold";
  const accentText =
    variant === "gold"
      ? "text-amber-700 dark:text-amber-400"
      : "text-blue-700 dark:text-blue-400";
  const accentBorder =
    variant === "gold"
      ? "border-amber-400 dark:border-amber-600"
      : "border-blue-400 dark:border-blue-600";
  const accentBg =
    variant === "gold"
      ? "bg-amber-50 dark:bg-amber-950/40"
      : "bg-blue-50 dark:bg-blue-950/40";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="formula-detail-backdrop"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.button
            type="button"
            aria-label="Lukk detaljer"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="formula-detail-title"
            className={`relative w-full md:max-w-2xl md:mx-4 max-h-[90vh] flex flex-col rounded-t-2xl md:rounded-2xl border-2 ${accentBorder} ${accentBg} shadow-2xl overflow-hidden`}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex-shrink-0 flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-[var(--card-border)]">
              <div className="flex-1 min-w-0">
                {data.title && (
                  <h3
                    id="formula-detail-title"
                    className={`text-xs font-bold uppercase tracking-wider ${accentText} mb-1`}
                  >
                    {data.title}
                  </h3>
                )}
                <BigLatex latex={data.latex} />
                {data.description && (
                  <p className="text-sm text-[var(--muted)] mt-1">
                    {data.description}
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Lukk"
                className="shrink-0 rounded-full w-9 h-9 flex items-center justify-center border border-[var(--card-border)] bg-[var(--card)] hover:bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-5">
              {data.conceptExplanation && (
                <section>
                  <SectionHeader color={accentText} icon="bulb">
                    Hva betyr formelen?
                  </SectionHeader>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    {data.conceptExplanation}
                  </p>
                </section>
              )}

              {data.variables && data.variables.length > 0 && (
                <section>
                  <SectionHeader color={accentText} icon="vars">
                    Variabler og enheter
                  </SectionHeader>
                  <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--card-border)] bg-[var(--background)]/50">
                          <th className="text-left py-2 px-3 font-semibold">
                            Symbol
                          </th>
                          <th className="text-left py-2 px-3 font-semibold">
                            Betyr
                          </th>
                          <th className="text-left py-2 px-3 font-semibold">
                            Enhet
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.variables.map((v, i) => (
                          <tr
                            key={i}
                            className="border-b border-[var(--card-border)] last:border-0"
                          >
                            <td className="py-2 px-3 align-top whitespace-nowrap">
                              <InlineLatex latex={v.symbol} />
                            </td>
                            <td className="py-2 px-3 align-top">{v.name}</td>
                            <td className="py-2 px-3 align-top whitespace-nowrap">
                              <span className="font-mono text-[var(--foreground)]">
                                {v.unit}
                              </span>
                              {v.unitName && (
                                <span className="text-[var(--muted)] ml-1">
                                  ({v.unitName})
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {data.whenToUse && (
                <section>
                  <SectionHeader
                    color="text-emerald-700 dark:text-emerald-400"
                    icon="check"
                  >
                    Bruk denne når…
                  </SectionHeader>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    {data.whenToUse}
                  </p>
                </section>
              )}

              {data.whenNotToUse && (
                <section>
                  <SectionHeader
                    color="text-rose-700 dark:text-rose-400"
                    icon="cross"
                  >
                    Ikke bruk når…
                  </SectionHeader>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    {data.whenNotToUse}
                  </p>
                </section>
              )}

              {data.alternativForms && data.alternativForms.length > 0 && (
                <section>
                  <SectionHeader color={accentText} icon="swap">
                    Andre former av samme formel
                  </SectionHeader>
                  <ul className="space-y-2">
                    {data.alternativForms.map((f, i) => (
                      <li
                        key={i}
                        className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3"
                      >
                        <div className="text-xs text-[var(--muted)] mb-1">
                          {f.label}
                        </div>
                        <div className="overflow-x-auto">
                          <InlineLatex latex={f.latex} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.derivation && (
                <section>
                  <SectionHeader color={accentText} icon="book">
                    Utledning / intuisjon
                  </SectionHeader>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                    {data.derivation}
                  </p>
                </section>
              )}

              {data.commonMistakes && data.commonMistakes.length > 0 && (
                <section>
                  <SectionHeader
                    color="text-amber-700 dark:text-amber-400"
                    icon="warn"
                  >
                    Vanlige feil
                  </SectionHeader>
                  <ul className="list-disc list-inside text-sm space-y-1 marker:text-amber-500">
                    {data.commonMistakes.map((m, i) => (
                      <li key={i} className="text-[var(--foreground)]">
                        {m}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.relatedFormulas && data.relatedFormulas.length > 0 && (
                <section>
                  <SectionHeader color={accentText} icon="link">
                    Relaterte formler
                  </SectionHeader>
                  <ul className="space-y-2">
                    {data.relatedFormulas.map((f, i) => (
                      <li
                        key={i}
                        className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3"
                      >
                        <div className="text-xs text-[var(--muted)] mb-1">
                          {f.label}
                        </div>
                        <div className="overflow-x-auto">
                          <InlineLatex latex={f.latex} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function SectionHeader({
  children,
  color,
  icon,
}: {
  children: React.ReactNode;
  color: string;
  icon: "bulb" | "vars" | "check" | "cross" | "swap" | "book" | "warn" | "link";
}) {
  return (
    <h4
      className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2 ${color}`}
    >
      <Icon kind={icon} />
      {children}
    </h4>
  );
}

function Icon({
  kind,
}: {
  kind: "bulb" | "vars" | "check" | "cross" | "swap" | "book" | "warn" | "link";
}) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        </svg>
      );
    case "vars":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case "swap":
      return (
        <svg {...common}>
          <path d="M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
          <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
        </svg>
      );
    case "warn":
      return (
        <svg {...common}>
          <path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" />
        </svg>
      );
  }
}
