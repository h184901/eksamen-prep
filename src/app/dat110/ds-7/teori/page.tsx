"use client";

import Link from "next/link";

const subChapters = [
  { id: "7.1", slug: "7-1", title: "Introduksjon til replikering", desc: "Hvorfor replisere: ytelse, feiltoleranse, tilgjengelighet. Utfordring: konsistens" },
  { id: "7.2", slug: "7-2", title: "Data-sentrerte konsistensmodeller", desc: "Strict, sequential, causal og eventual consistency — styrker og svakheter" },
  { id: "7.3", slug: "7-3", title: "Klient-sentrerte konsistensmodeller", desc: "Monotonic reads/writes, read-your-writes, writes-follow-reads" },
  { id: "7.5", slug: "7-5", title: "Konsistensprotokoller", desc: "Primary-based, replikerte write-protokoller, quorum (NR + NW > N)" },
];

export default function DS7TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Konsistens og replikering</h2>
        <p className="text-[var(--muted)] text-sm">DS 7 — Konsistensmodeller, replikering og quorum-protokoller</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-7/teori/${ch.slug}`}
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
