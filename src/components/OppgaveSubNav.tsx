"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Oversikt", suffix: "" },
  { label: "Tidligere oppgaver", suffix: "/tidligere" },
  { label: "Øving", suffix: "/oving" },
];

export default function OppgaveSubNav({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 mb-8 overflow-x-auto pb-1 border-b border-[var(--card-border)]">
      {tabs.map((tab) => {
        const href = basePath + tab.suffix;
        const isActive =
          tab.suffix === ""
            ? pathname === basePath
            : pathname.startsWith(href);

        return (
          <Link
            key={tab.suffix}
            href={href}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
              isActive
                ? "bg-[var(--card)] text-[var(--foreground)] border border-b-0 border-[var(--card-border)] -mb-px"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
