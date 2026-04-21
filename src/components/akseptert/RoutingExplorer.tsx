"use client";

import { useState } from "react";

interface FileNode {
  path: string;
  url: string;
  kind: "layout" | "page" | "loading" | "error" | "route";
  explanation: string;
}

const files: FileNode[] = [
  {
    path: "app/layout.tsx",
    url: "(omslutter alle sider)",
    kind: "layout",
    explanation:
      "Rot-layout. Definerer <html> og <body>, wrappers som ClerkProvider, og alt som skal være likt på hver side (Navbar, Footer). Kjører rundt ALLE andre sider.",
  },
  {
    path: "app/page.tsx",
    url: "/",
    kind: "page",
    explanation:
      "Forsiden. page.tsx i rot-mappen blir rot-URL-en. Akseptert har landingssiden her.",
  },
  {
    path: "app/dashboard/page.tsx",
    url: "/dashboard",
    kind: "page",
    explanation:
      "Dashboardet. Mappe-navnet blir URL-segment. dashboard/ → /dashboard.",
  },
  {
    path: "app/dashboard/ny/page.tsx",
    url: "/dashboard/ny",
    kind: "page",
    explanation:
      "Ny befaring-siden. Nestet mappe = nestet URL. Her klikker brukeren «Generer».",
  },
  {
    path: "app/dashboard/layout.tsx",
    url: "(omslutter dashboard-sider)",
    kind: "layout",
    explanation:
      "Dashboard-spesifikt layout (sidebar etc.). Wrapper alle sider under /dashboard, men ikke /pricing e.l.",
  },
  {
    path: "app/tilbud/[id]/page.tsx",
    url: "/tilbud/abc123",
    kind: "page",
    explanation:
      "Dynamisk rute. [id] fanger enhver verdi i det segmentet. Brukes for å vise ett spesifikt tilbud — id-en leses som prop i komponenten.",
  },
  {
    path: "app/api/webhook/route.ts",
    url: "POST /api/webhook",
    kind: "route",
    explanation:
      "API-endepunkt. route.ts (ikke page.tsx) eksponerer en HTTP-rute. Brukes for Stripe-webhooks, mail-inbound osv.",
  },
  {
    path: "app/not-found.tsx",
    url: "(404-sider)",
    kind: "error",
    explanation:
      "Spesialfil: vises når en rute ikke finnes. Tilsvarer Spring sin ErrorController.",
  },
];

const kindBadge: Record<FileNode["kind"], { label: string; class: string }> = {
  layout: {
    label: "layout",
    class: "bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200",
  },
  page: {
    label: "page",
    class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  },
  loading: {
    label: "loading",
    class: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  },
  error: {
    label: "error",
    class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200",
  },
  route: {
    label: "route",
    class: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200",
  },
};

export default function RoutingExplorer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = files[selectedIdx];

  return (
    <div className="grid md:grid-cols-[18rem_1fr] gap-4">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-2 max-h-[360px] overflow-y-auto">
        {files.map((f, i) => (
          <button
            type="button"
            key={f.path}
            onClick={() => setSelectedIdx(i)}
            className={`w-full text-left text-xs font-mono py-1.5 px-2 rounded transition-colors flex items-center justify-between gap-2 ${
              selectedIdx === i
                ? "bg-akseptert-500/15 text-akseptert-700 dark:text-akseptert-200"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
          >
            <span className="truncate">{f.path}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${kindBadge[f.kind].class}`}>
              {kindBadge[f.kind].label}
            </span>
          </button>
        ))}
      </div>

      <div>
        <div className="rounded-xl border border-akseptert-400/40 bg-akseptert-50/60 dark:bg-akseptert-950/30 p-4 mb-3">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              Fil
            </span>
            <code className="text-xs font-mono">{selected.path}</code>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              URL
            </span>
            <code className="text-xs font-mono text-akseptert-600 dark:text-akseptert-300">
              {selected.url}
            </code>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <p className="text-sm">{selected.explanation}</p>
        </div>
      </div>
    </div>
  );
}
