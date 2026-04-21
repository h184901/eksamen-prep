import React from "react";

export type CalloutKind = "info" | "tips" | "viktig" | "felle" | "eksempel" | "kjernen";

const styles: Record<
  CalloutKind,
  { wrap: string; title: string; icon: React.ReactNode; label: string }
> = {
  info: {
    wrap: "border-sky-300/60 bg-sky-50/70 dark:border-sky-700/50 dark:bg-sky-950/30",
    title: "text-sky-700 dark:text-sky-300",
    label: "Info",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M11 12h1v4h1" />
      </svg>
    ),
  },
  tips: {
    wrap: "border-emerald-300/60 bg-emerald-50/70 dark:border-emerald-700/50 dark:bg-emerald-950/30",
    title: "text-emerald-700 dark:text-emerald-300",
    label: "Tips",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  viktig: {
    wrap: "border-akseptert-400/60 bg-akseptert-50 dark:border-akseptert-500/40 dark:bg-akseptert-950/40",
    title: "text-akseptert-700 dark:text-akseptert-200",
    label: "Viktig",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  felle: {
    wrap: "border-red-300/60 bg-red-50/70 dark:border-red-700/50 dark:bg-red-950/30",
    title: "text-red-700 dark:text-red-300",
    label: "Vanlig felle",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  eksempel: {
    wrap: "border-amber-300/60 bg-amber-50/70 dark:border-amber-700/50 dark:bg-amber-950/30",
    title: "text-amber-700 dark:text-amber-300",
    label: "Eksempel",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  kjernen: {
    wrap: "border-akseptert-400/50 bg-gradient-to-br from-akseptert-50 to-indigo-50 dark:from-akseptert-900/40 dark:to-indigo-950/30 dark:border-akseptert-500/40",
    title: "text-akseptert-700 dark:text-akseptert-200",
    label: "Kjernen",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

export default function Callout({
  kind,
  title,
  children,
}: {
  kind: CalloutKind;
  title?: string;
  children: React.ReactNode;
}) {
  const s = styles[kind];
  return (
    <div className={`rounded-xl border-2 ${s.wrap} p-5 my-4`}>
      <div className={`flex items-center gap-2 mb-2 ${s.title}`}>
        {s.icon}
        <h4 className="font-bold text-sm uppercase tracking-wide">
          {title ?? s.label}
        </h4>
      </div>
      <div className="space-y-2 text-sm leading-relaxed text-[var(--foreground)]/90">
        {children}
      </div>
    </div>
  );
}
