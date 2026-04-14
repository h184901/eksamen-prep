"use client";

import Link from "next/link";

const subChapters = [
  { id: "8.1", slug: "8-1", title: "Introduksjon til feiltoleranse", desc: "Feiltyper: crash, omission, timing, Byzantine. Avhengighet og pålitelighet" },
  { id: "8.2", slug: "8-2", title: "Prosessresistens", desc: "Flat vs hierarkisk grupper, Byzantine feiltoleranse, 3k+1-regelen" },
  { id: "8.3", slug: "8-3", title: "Pålitelig kommunikasjon og RPC-feil", desc: "De 5 RPC-feilklassene: klient finner ikke server, request lost, server crash, reply lost, klient crash" },
  { id: "8.4", slug: "8-4", title: "Feilgjenoppretting", desc: "Checkpoint-basert recovery, rollback, logging" },
  { id: "8.5", slug: "8-5", title: "Distribuert commit", desc: "Two-Phase Commit (2PC) og Three-Phase Commit (3PC)" },
];

export default function DS8TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Feiltoleranse</h2>
        <p className="text-[var(--muted)] text-sm">DS 8 — Feiltyper, Byzantine, RPC-feilklasser, recovery og distribuert commit</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-8/teori/${ch.slug}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/60 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{ch.id}</p>
            <p className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{ch.title}</p>
            <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
          </Link>
        ))}
      </div>

      <div className="text-sm text-[var(--muted)] flex items-center gap-2">
        <span>Se også:</span>
        <Link href="/dat110/eksamenoving/oppg-9" className="text-blue-600 dark:text-blue-400 hover:underline">Oppg 9 — Konsistens og klokker</Link>
      </div>
    </div>
  );
}
