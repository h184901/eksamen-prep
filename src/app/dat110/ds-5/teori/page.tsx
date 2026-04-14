"use client";

import Link from "next/link";

const subChapters = [
  { id: "5.2", slug: "5-2", title: "Logiske klokker", desc: "Happens-before, Lamport-klokker (skalare), vektorklokker — regler for lokal hendelse, send og mottak" },
  { id: "5.3", slug: "5-3", title: "Gjensidig utelukkelse (mutex)", desc: "Distribuert mutex, Ricart-Agrawala-algoritmen, token-baserte løsninger" },
  { id: "5.4", slug: "5-4", title: "Ledervalg", desc: "Bully-algoritmen (høyeste ID vinner) og ring-algoritmen" },
];

export default function DS5TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Koordinering</h2>
        <p className="text-[var(--muted)] text-sm">DS 5 — Logiske klokker, vektorklokker, mutex og ledervalg</p>
      </div>

      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">Vektorklokker kommer alltid i oppgave 9 — øv på steg-for-steg-beregning med 3–4 prosesser.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-5/teori/${ch.slug}`}
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
