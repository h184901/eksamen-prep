"use client";

import { useState } from "react";

const subChapters = [
  { id: "8.1", title: "Introduksjon til feiltoleranse", desc: "Hva er feiltoleranse? Feiltyper: crash, omission, timing, arbitrary (Byzantine). Avhengighet og palitelighet" },
  { id: "8.2", title: "Prosessresistens", desc: "Flat vs hierarkisk gruppeorganisering, Byzantine feiltoleranse, 3k+1-regelen for a tolerere k feil" },
  { id: "8.3", title: "Palitelig kommunikasjon og RPC-feil", desc: "De 5 RPC-feilklassene: klient finner ikke server, request lost, server crash, reply lost, klient crash" },
  { id: "8.4", title: "Feilgjenoppretting (recovery)", desc: "Checkpoint-basert recovery, rollback, logging — hvordan distribuerte systemer gjenopprettes etter feil" },
  { id: "8.5", title: "Distribuert commit", desc: "Two-Phase Commit (2PC) og Three-Phase Commit (3PC) — koordinering av distribuerte transaksjoner" },
];

export default function DS8TeoriPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Feiltoleranse</h2>
        <p className="text-[var(--muted)] text-sm mb-6">DS 8 — Feiltyper, Byzantine feiltoleranse, RPC-feilklasser, recovery og distribuert commit</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {subChapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActive(active === ch.id ? null : ch.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              active === ch.id
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400 text-[var(--foreground)]"
            }`}
          >
            {ch.id}
          </button>
        ))}
      </div>

      {active === null ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {subChapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActive(ch.id)}
              className="text-left rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-blue-400/60 transition-all hover:shadow-sm"
            >
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{ch.id}</p>
              <p className="font-semibold text-sm mb-1">{ch.title}</p>
              <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        subChapters.map((ch) =>
          active === ch.id ? (
            <div key={ch.id} className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{ch.id}</p>
                  <h3 className="text-lg font-bold">{ch.title}</h3>
                </div>
                <button onClick={() => setActive(null)} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  Alle delkapitler
                </button>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">{ch.desc}</p>
              <div className="rounded-lg border-2 border-dashed border-[var(--card-border)] p-8 text-center">
                <p className="text-[var(--muted)] font-medium">Innhold kommer snart</p>
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
