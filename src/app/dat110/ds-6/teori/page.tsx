"use client";

import Link from "next/link";

const subChapters = [
  { id: "6.1", slug: "6-1", title: "Flat navngiving", desc: "Broadcasting, forwarding pointers, home-based, DHT — ulike tilnærminger til flat navneløsning" },
  { id: "6.2", slug: "6-2", title: "Strukturert navngiving", desc: "Hierarkisk navnerom, navneoppløsning, DNS som eksempel" },
  { id: "6.3", slug: "6-3", title: "DHT og Chord", desc: "Chord-ringen, fingertabeller, succ(n + 2^(i-1)), nøkkelansvar og O(log N) oppslag" },
  { id: "6.4", slug: "6-4", title: "Attributtbasert navngiving", desc: "LDAP, directory services, søkebasert navneoppløsning" },
];

export default function DS6TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Navngiving og Chord DHT</h2>
        <p className="text-[var(--muted)] text-sm">DS 6 — Flat navngiving, DHT, Chord-ring, fingertabeller og navneoppløsning</p>
      </div>

      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">DHT/Chord er oppgave 10 (15 %) — den tyngste enkeltoppgaven. Øv mye på fingertabeller og nøkkeloppslag.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-6/teori/${ch.slug}`}
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
        <Link href="/dat110/eksamenoving/oppg-10" className="text-blue-600 dark:text-blue-400 hover:underline">Oppg 10 — DHT/Chord</Link>
        <span>·</span>
        <Link href="/dat110/ds-6/formler" className="text-blue-600 dark:text-blue-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
