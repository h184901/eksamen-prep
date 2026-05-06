"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useProgress } from "@/components/ProgressProvider";

export interface SubPage {
  segment: string; // empty string = root/overview page
  label: string;
  badge?: string;
}

interface DAT109SubNavProps {
  basePath: string; // e.g. "/dat109/modellering"
  pages: SubPage[];
}

/**
 * Sticky tabbed sub-navigation for DAT109 hovedområder.
 * Hver hovedside (modellering, ooa-ood, utviklingsmetode, oop, eksamen)
 * eksporterer sin egen pages-array og render denne komponenten øverst.
 *
 * Markerer automatisk inneværende underside som fullført når brukeren besøker
 * den, så lenge den er en sporbar segment (ikke "oversikt").
 */
export default function DAT109SubNav({ basePath, pages }: DAT109SubNavProps) {
  const pathname = usePathname();
  const { ready, authed, markCompleted } = useProgress();

  useEffect(() => {
    if (!ready || !authed) return;
    const topicId = basePath.replace(/^\/+|\/+$/g, "").split("/")[1];
    if (!topicId) return;
    if (pathname === basePath) return;
    if (!pathname.startsWith(basePath + "/")) return;
    const rest = pathname.slice(basePath.length + 1);
    const segment = rest.split("/")[0];
    if (!segment) return;
    if (!pages.some((p) => p.segment === segment)) return;
    void markCompleted(`dat109/${topicId}/${segment}`);
  }, [pathname, basePath, ready, authed, markCompleted, pages]);

  return (
    <div className="sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--card-border)] -mx-4 px-4 mb-8">
      <nav
        className="flex gap-1 overflow-x-auto scrollbar-hide py-2"
        aria-label="Undersider"
      >
        {pages.map((page) => {
          const href = page.segment
            ? `${basePath}/${page.segment}`
            : basePath;
          const isActive = page.segment
            ? pathname === href || pathname.startsWith(href + "/")
            : pathname === basePath;

          return (
            <Link
              key={page.segment || "oversikt"}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-sysdev-500 text-white shadow-sm"
                  : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
              }`}
            >
              <span>{page.label}</span>
              {page.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {page.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
