"use client";

import Link from "next/link";

interface PlaceholderItem {
  label: string;
  hint?: string;
}

interface PlaceholderPageProps {
  /** Brødsmuler øverst på siden */
  breadcrumb: { label: string; href?: string }[];
  /** Sidetittel */
  title: string;
  /** Kort intro-setning under tittelen */
  description: string;
  /** Hvilken eksamensvekt dette emnet har (f.eks. "Del av oppgave 2") */
  examWeight?: string;
  /** "NY" badge etc. */
  badge?: string;
  /**
   * Punktliste over hva som skal fylles inn på denne siden.
   * Brukes som "TODO" til Prompt 3 / Prompt 4.
   */
  todoItems: PlaceholderItem[];
  /** Hvor i pensum dette kommer fra (semesterplan, forelesning, eksamen) */
  pensumKilder: string[];
  /** Eventuelle relaterte sider å lenke til */
  relatedLinks?: { label: string; href: string }[];
}

/**
 * Konsistent placeholder-side for nye undersider.
 * Brukes i Prompt 2 — innhold fylles inn i Prompt 3.
 */
export default function PlaceholderPage({
  breadcrumb,
  title,
  description,
  examWeight,
  badge,
  todoItems,
  pensumKilder,
  relatedLinks,
}: PlaceholderPageProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[var(--accent)]">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[var(--foreground)]">{crumb.label}</span>
            )}
            {i < breadcrumb.length - 1 && <span>/</span>}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {examWeight && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400">
              {examWeight}
            </span>
          )}
          {badge && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              {badge}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-[var(--muted)] max-w-2xl">{description}</p>
      </div>

      {/* Placeholder banner */}
      <div className="rounded-xl border-2 border-dashed border-amber-400/60 bg-amber-50/50 dark:bg-amber-950/20 p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">🚧</span>
          <div>
            <h2 className="font-bold text-base text-amber-700 dark:text-amber-400 mb-1">
              Denne siden fylles inn i neste steg
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Strukturen er klar — innholdet skrives i prompt 3. Plassholderen
              under viser nøyaktig hva som skal dekkes på denne siden.
            </p>
          </div>
        </div>
      </div>

      {/* TODO list */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">📋 Innhold som skal fylles inn</h2>
        <ul className="space-y-3">
          {todoItems.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                {item.hint && (
                  <p className="text-xs text-[var(--muted)] mt-1">{item.hint}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pensum-kilder */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-5 mb-6">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
          📚 Hentet fra
        </h3>
        <ul className="space-y-1">
          {pensumKilder.map((k, i) => (
            <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300">
              • {k}
            </li>
          ))}
        </ul>
      </div>

      {/* Related links */}
      {relatedLinks && relatedLinks.length > 0 && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h3 className="font-bold text-sm mb-3">🔗 Relaterte sider</h3>
          <div className="flex flex-wrap gap-2">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
