"use client";

import { useState } from "react";

type Mode = "server" | "client";

export default function ServerClientToggle() {
  const [mode, setMode] = useState<Mode>("server");
  const [count, setCount] = useState(0);

  const isServer = mode === "server";

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      <div className="flex items-center gap-1 p-1.5 bg-neutral-100 dark:bg-neutral-900 border-b border-[var(--card-border)]">
        <button
          type="button"
          onClick={() => setMode("server")}
          className={`flex-1 text-xs font-bold px-3 py-2 rounded transition-colors ${
            isServer
              ? "bg-akseptert-500 text-white"
              : "text-[var(--muted)] hover:bg-neutral-200 dark:hover:bg-neutral-800"
          }`}
        >
          Server Component (standard)
        </button>
        <button
          type="button"
          onClick={() => setMode("client")}
          className={`flex-1 text-xs font-bold px-3 py-2 rounded transition-colors ${
            !isServer
              ? "bg-akseptert-500 text-white"
              : "text-[var(--muted)] hover:bg-neutral-200 dark:hover:bg-neutral-800"
          }`}
        >
          &quot;use client&quot;
        </button>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="p-4 border-b md:border-b-0 md:border-r border-[var(--card-border)]">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
            Koden
          </p>
          <pre className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-[12px] font-mono overflow-x-auto">
            <code className="whitespace-pre">
              {isServer
                ? `// app/page.tsx
// (ingen "use client")

import fs from "node:fs";

export default async function Page() {
  // Kan lese fil-systemet,
  // snakke direkte med DB,
  // bruke env-secrets.
  const data = await db.query(...);

  return <div>{data.title}</div>;
}`
                : `"use client";

import { useState } from "react";

export default function Page() {
  // Kan bruke hooks, lytte på klikk,
  // tilgang til window/localStorage.
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c+1)}>
      {count}
    </button>
  );
}`}
            </code>
          </pre>
        </div>

        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
            Live i nettleseren
          </p>
          <div className="rounded-lg border border-dashed border-[var(--card-border)] p-4 bg-neutral-50 dark:bg-neutral-900 min-h-[140px] flex flex-col items-center justify-center">
            {isServer ? (
              <>
                <div className="text-center">
                  <p className="text-sm font-bold mb-1">
                    «Hei fra serveren»
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    HTML-en ble tegnet på serveren. Knappen under kan ikke
                    reagere på klikk — det finnes ingen JavaScript her.
                  </p>
                  <button
                    type="button"
                    disabled
                    className="mt-3 px-4 py-2 rounded-lg bg-neutral-300 dark:bg-neutral-700 text-neutral-500 text-xs cursor-not-allowed"
                  >
                    Klikk meg (virker ikke)
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold mb-1">Klient-komponent</p>
                <p className="text-xs text-[var(--muted)] text-center mb-3">
                  Hydrert i nettleseren med useState. Klikket virker:
                </p>
                <button
                  type="button"
                  onClick={() => setCount((c) => c + 1)}
                  className="px-4 py-2 rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white text-sm font-semibold"
                >
                  Klikket: {count}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-akseptert-50/60 dark:bg-akseptert-950/30 border-t border-akseptert-400/30 grid sm:grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-bold text-akseptert-700 dark:text-akseptert-200 mb-1">
            {isServer ? "Server Component kan:" : "Client Component kan:"}
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-[var(--foreground)]/85">
            {isServer ? (
              <>
                <li>Lese fs, database, env-variabler</li>
                <li>Være async og awaite</li>
                <li>Holde hemmeligheter unna klient</li>
                <li>Sende mindre JS til nettleseren</li>
              </>
            ) : (
              <>
                <li>Bruke useState, useEffect, useRef</li>
                <li>Lytte på onClick, onChange osv.</li>
                <li>Snakke med window, localStorage</li>
                <li>Oppdatere UI reaktivt</li>
              </>
            )}
          </ul>
        </div>
        <div>
          <p className="font-bold text-akseptert-700 dark:text-akseptert-200 mb-1">
            Men IKKE:
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-[var(--foreground)]/85">
            {isServer ? (
              <>
                <li>Bruke hooks (useState m.m.)</li>
                <li>Reagere på klikk eller input</li>
                <li>Lese window eller localStorage</li>
              </>
            ) : (
              <>
                <li>Lese fs eller databasen direkte</li>
                <li>Lese env-hemmeligheter</li>
                <li>Være async (returnere Promise)</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
