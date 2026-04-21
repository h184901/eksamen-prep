"use client";

import { useState } from "react";

const mockJobs = [
  { id: 1, user_id: "user_alice", title: "Maling av stue", price: 18000, status: "sendt" },
  { id: 2, user_id: "user_bob", title: "Totalrenovering bad", price: 285000, status: "akseptert" },
  { id: 3, user_id: "user_alice", title: "Bytte gulv kjøkken", price: 45000, status: "utkast" },
  { id: 4, user_id: "user_carol", title: "Takomlegging", price: 95000, status: "sendt" },
  { id: 5, user_id: "user_bob", title: "Nytt kjøkken", price: 140000, status: "utkast" },
  { id: 6, user_id: "user_alice", title: "Flisearbeid terrasse", price: 62000, status: "sendt" },
];

type UserId = "user_alice" | "user_bob" | "user_carol";

export default function RLSDemo() {
  const [rlsOn, setRlsOn] = useState(true);
  const [activeUser, setActiveUser] = useState<UserId>("user_alice");

  const visibleRows = rlsOn
    ? mockJobs.filter((j) => j.user_id === activeUser)
    : mockJobs;

  const hiddenCount = mockJobs.length - visibleRows.length;

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      {/* Kontroller */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-neutral-50 dark:bg-neutral-900/50 border-b border-[var(--card-border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[var(--muted)]">Pålogget bruker:</span>
          {(["user_alice", "user_bob", "user_carol"] as UserId[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setActiveUser(u)}
              className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                activeUser === u
                  ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                  : "border-[var(--card-border)] hover:border-akseptert-400/60"
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <span
            className={`text-xs font-bold ${rlsOn ? "text-emerald-600 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`}
          >
            RLS: {rlsOn ? "PÅ" : "AV"}
          </span>
          <button
            type="button"
            onClick={() => setRlsOn((v) => !v)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              rlsOn ? "bg-emerald-500" : "bg-red-500"
            }`}
            aria-pressed={rlsOn}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                rlsOn ? "translate-x-6" : ""
              }`}
            />
          </button>
        </label>
      </div>

      {/* Query */}
      <div className="p-4 border-b border-[var(--card-border)]">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
          Spørring som kjøres fra {activeUser}s nettleser
        </p>
        <pre className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-[12px] font-mono overflow-x-auto">
          <code>SELECT id, user_id, title, price, status FROM jobs;</code>
        </pre>
      </div>

      {/* Resultat */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
            Rader klienten får tilbake
          </p>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
              rlsOn
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
            }`}
          >
            {visibleRows.length} rader{hiddenCount > 0 ? ` (${hiddenCount} skjult av RLS)` : ""}
          </span>
        </div>

        <div className="rounded-lg border border-[var(--card-border)] overflow-hidden">
          <table className="min-w-full text-xs">
            <thead className="bg-neutral-100 dark:bg-neutral-900 text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">id</th>
                <th className="px-3 py-2 text-left font-semibold">user_id</th>
                <th className="px-3 py-2 text-left font-semibold">title</th>
                <th className="px-3 py-2 text-right font-semibold">price</th>
                <th className="px-3 py-2 text-left font-semibold">status</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {mockJobs.map((j) => {
                const visible = visibleRows.includes(j);
                const mine = j.user_id === activeUser;
                return (
                  <tr
                    key={j.id}
                    className={`border-t border-[var(--card-border)] transition-all ${
                      visible
                        ? mine
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20"
                          : "bg-amber-50/50 dark:bg-amber-950/20"
                        : "opacity-20"
                    }`}
                  >
                    <td className="px-3 py-1.5">{j.id}</td>
                    <td className="px-3 py-1.5">{j.user_id}</td>
                    <td className="px-3 py-1.5">{j.title}</td>
                    <td className="px-3 py-1.5 text-right">{j.price.toLocaleString("nb-NO")}</td>
                    <td className="px-3 py-1.5">{j.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!rlsOn ? (
          <div className="mt-3 rounded-lg border-2 border-red-400/60 bg-red-50/70 dark:bg-red-950/30 p-3 text-sm">
            <p className="font-bold text-red-700 dark:text-red-300 mb-1">
              ⚠ Datalekkasje
            </p>
            <p className="text-red-800 dark:text-red-200">
              {activeUser} ser jobbene til alle andre brukere også. Hvis Akseptert hadde
              brukt <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> på klienten uten RLS, ville
              hvem som helst kunne laste ned hele tabellen.
            </p>
          </div>
        ) : (
          <div className="mt-3 rounded-lg border-2 border-emerald-400/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-3 text-sm">
            <p className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">
              ✓ Row Level Security virker
            </p>
            <p className="text-emerald-800 dark:text-emerald-200">
              Postgres kjenner til hvem som er pålogget via JWT-en fra Supabase Auth, og
              skjærer bort radene der <code>user_id != auth.uid()</code>.
            </p>
          </div>
        )}

        <details className="mt-3">
          <summary className="text-xs font-bold cursor-pointer text-akseptert-600 dark:text-akseptert-300">
            Slik ser RLS-policyen ut i Postgres
          </summary>
          <pre className="mt-2 bg-neutral-950 text-neutral-100 rounded-lg p-3 text-[12px] font-mono overflow-x-auto">
            <code className="whitespace-pre">{`-- Slå på RLS for tabellen
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Regel: en bruker kan bare SELECTe egne rader
CREATE POLICY "jobs_select_own" ON jobs
  FOR SELECT
  USING (user_id = auth.uid());

-- Regel: en bruker kan bare INSERT-e rader med sitt eget user_id
CREATE POLICY "jobs_insert_own" ON jobs
  FOR INSERT
  WITH CHECK (user_id = auth.uid());`}</code>
          </pre>
        </details>
      </div>
    </div>
  );
}
