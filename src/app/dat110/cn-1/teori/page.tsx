"use client";

import Link from "next/link";

const subChapters = [
  { id: "1.1", slug: "1-1", title: "Hva er internett?", desc: "Nøtt-og-bolt vs tjenesteperspektivet, protokoller, standarder og internettarkitektur" },
  { id: "1.2", slug: "1-2", title: "Nettverkskanten", desc: "Endesystemer (hosts), aksessnettverk (DSL, kabel, fiber, WiFi) og fysiske medier" },
  { id: "1.3", slug: "1-3", title: "Nettverkskjernen", desc: "Pakkeswitching vs kretsswitching, store-and-forward, ISP-hierarkiet og IXP" },
  { id: "1.4", slug: "1-4", title: "Forsinkelse, tap og gjennomstrømning", desc: "De fire forsinkelsestypene, trafikkintensitet La/R, ende-til-ende forsinkelse og flaskehals — ALLTID på eksamen" },
  { id: "1.5", slug: "1-5", title: "Protokolllag og tjenestemodeller", desc: "TCP/IP 5-lagsmodell vs OSI 7-lag, kapsling (encapsulation) og PDU-navn per lag" },
  { id: "1.6", slug: "1-6", title: "Angrep på nettverk", desc: "Malware, DoS/DDoS, packet sniffing og IP spoofing — oversikt" },
  { id: "1.7", slug: "1-7", title: "Historikk", desc: "Fra ARPANET til dagens internett — nettverkets utvikling" },
];

export default function CN1TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Nettverksintroduksjon og metrikker</h2>
        <p className="text-[var(--muted)] text-sm">CN 1.1–1.7 — Internett-arkitektur, protokollstakken, forsinkelser og gjennomstrømning</p>
      </div>

      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">Delkapittel 1.4 (forsinkelser) er det viktigste — det kommer ALLTID som oppgave 3 på eksamen.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/cn-1/teori/${ch.slug}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-network-400/60 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-bold text-network-600 dark:text-network-400 mb-1">{ch.id}</p>
            <p className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{ch.title}</p>
            <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
          </Link>
        ))}
      </div>

      <div className="text-sm text-[var(--muted)] flex items-center gap-2">
        <span>Se også:</span>
        <Link href="/dat110/eksamenoving/oppg-3" className="text-network-600 dark:text-network-400 hover:underline">Oppg 3 — Forsinkelser</Link>
        <span>·</span>
        <Link href="/dat110/cn-1/formler" className="text-network-600 dark:text-network-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
