import Link from "next/link";
import React from "react";

export default function SubPageHeader({
  title,
  subtitle,
  badge,
  lead,
  icon,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  lead?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-4">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/akseptert" className="hover:text-[var(--accent)]">
          Akseptert
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{title}</span>
      </div>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-akseptert-500/15 border border-akseptert-500/30 flex items-center justify-center text-akseptert-600 dark:text-akseptert-300 shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[var(--muted)] mt-0.5">{subtitle}</p>
          )}
        </div>
        {badge && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200">
            {badge}
          </span>
        )}
      </div>
      {lead && <div className="text-[var(--muted)] max-w-2xl">{lead}</div>}
    </div>
  );
}
