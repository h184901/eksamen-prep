import React from "react";

export function Section({
  id,
  step,
  title,
  subtitle,
  children,
}: {
  id?: string;
  step?: number | string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className="flex items-baseline gap-3 mb-2">
        {step !== undefined && (
          <span className="text-xs font-bold tracking-widest text-akseptert-600 dark:text-akseptert-300 uppercase">
            Steg {step}
          </span>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-1 text-akseptert-700 dark:text-akseptert-200">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--muted)] mb-4">{subtitle}</p>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Sandbox({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-akseptert-400/40 bg-gradient-to-br from-akseptert-50/70 to-indigo-50/30 dark:from-akseptert-950/30 dark:to-indigo-950/20 p-5 my-4">
      <div className="flex items-center gap-2 mb-1">
        <svg
          className="w-5 h-5 text-akseptert-600 dark:text-akseptert-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-bold text-akseptert-700 dark:text-akseptert-200">
          Prøv selv — {title}
        </h3>
      </div>
      {description && (
        <p className="text-sm text-[var(--muted)] mb-3">{description}</p>
      )}
      <div>{children}</div>
    </div>
  );
}
