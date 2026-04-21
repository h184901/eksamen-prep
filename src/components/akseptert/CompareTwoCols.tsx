import React from "react";

export default function CompareTwoCols({
  leftTitle,
  rightTitle,
  leftSubtitle,
  rightSubtitle,
  left,
  right,
}: {
  leftTitle: string;
  rightTitle: string;
  leftSubtitle?: string;
  rightSubtitle?: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-4">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
            {leftTitle}
          </span>
          {leftSubtitle && (
            <span className="text-[11px] text-[var(--muted)]">{leftSubtitle}</span>
          )}
        </div>
        <div className="text-sm">{left}</div>
      </div>
      <div className="rounded-xl border border-akseptert-400/40 bg-akseptert-50/40 dark:bg-akseptert-950/20 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200">
            {rightTitle}
          </span>
          {rightSubtitle && (
            <span className="text-[11px] text-[var(--muted)]">{rightSubtitle}</span>
          )}
        </div>
        <div className="text-sm">{right}</div>
      </div>
    </div>
  );
}
