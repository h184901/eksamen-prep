"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subPages = [
  { segment: "", label: "Oversikt" },
  { segment: "teori", label: "Teori" },
  { segment: "formler", label: "Formler" },
  { segment: "oppgaver", label: "Oppgaver" },
  { segment: "visualiseringer", label: "Visualiseringer" },
];

interface ChapterSubNavProps {
  basePath: string;
}

export default function ChapterSubNav({ basePath }: ChapterSubNavProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--card-border)] -mx-4 px-4 mb-8">
      <nav
        className="flex gap-1 overflow-x-auto scrollbar-hide py-2"
        aria-label="Undersider"
      >
        {subPages.map((page) => {
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
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
              }`}
            >
              {page.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
