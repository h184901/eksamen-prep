"use client";

import Link from "next/link";

const subChapters = [
  { id: "3.1", slug: "3-1", title: "Tråder og prosesser", desc: "Forskjell på prosesser og tråder, multitrådingsmodeller i distribuerte systemer" },
  { id: "3.2", slug: "3-2", title: "Virtualisering", desc: "Prosess- vs systemvirtualisering, hypervisors, containere" },
  { id: "3.3", slug: "3-3", title: "Klient-design", desc: "Thin vs fat client, nettverkstransparens, brukergrensesnitt-distribusjon" },
  { id: "3.4", slug: "3-4", title: "Server-design", desc: "Iterativ vs concurrent, thread-per-request og thread pool, stateful vs stateless" },
  { id: "3.5", slug: "3-5", title: "Kode-migrasjon", desc: "Hvorfor flytte kode? Kode/data/utførelses-segment, svak vs sterk mobilitet" },
];

export default function DS3TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Prosesser og tråder</h2>
        <p className="text-[var(--muted)] text-sm">DS 3 — Tråder, virtualisering, klient/server-design og kode-migrasjon</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-3/teori/${ch.slug}`}
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
        <Link href="/dat110/eksamenoving/oppg-7" className="text-blue-600 dark:text-blue-400 hover:underline">Oppg 7 — DS-teori</Link>
      </div>
    </div>
  );
}
