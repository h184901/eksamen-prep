"use client";

import { useState } from "react";

const subChapters = [
  { id: "3.1", title: "Trader og prosesser", desc: "Forskjell pa prosesser og trader, multithrading-modeller, trader i distribuerte systemer" },
  { id: "3.2", title: "Virtualisering", desc: "Prosessvirtualisering vs systemvirtualisering, hypervisors, containere og hvorfor det er relevant for DS" },
  { id: "3.3", title: "Klient-design", desc: "Thin client vs fat client, nettverkstransparens pa klientsiden, brukergrensesnitt-distribusjon" },
  { id: "3.4", title: "Server-design", desc: "Iterativ vs concurrent server, thread-per-request og thread pool, stateful vs stateless, server-klynger" },
  { id: "3.5", title: "Kode-migrasjon", desc: "Hvorfor flytte kode? Kodesegment, datasegment og utforelsessegment. Svak vs sterk mobilitet" },
];

export default function DS3TeoriPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Prosesser og trader</h2>
        <p className="text-[var(--muted)] text-sm mb-6">DS 3 — Trader, virtualisering, klient/server-design og kode-migrasjon</p>
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
