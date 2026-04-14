"use client";

import Link from "next/link";

const subChapters = [
  { id: "4.1", slug: "4-1", title: "Kommunikasjonsgrunnlag", desc: "Persistent vs transient, synkron vs asynkron kommunikasjon, kommunikasjonsstilar" },
  { id: "4.2", slug: "4-2", title: "RPC — Remote Procedure Call", desc: "RPC-mekanismen, stub/skeleton, marshalling, asynkron og deferred synchronous RPC, 5 feilklasser" },
  { id: "4.3", slug: "4-3", title: "MQTT og meldingsorientert kommunikasjon", desc: "MQTT publish-subscribe, QoS-nivåer (0, 1, 2), meldingskøer" },
  { id: "4.4", slug: "4-4", title: "Multicast og overlay-nettverk", desc: "Application-Level Multicast (ALM), overlay-nettverk, RDP-beregning, gossip-protokoller" },
];

export default function DS4TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Kommunikasjon i distribuerte systemer</h2>
        <p className="text-[var(--muted)] text-sm">DS 4 — RPC, MQTT, publish-subscribe, overlay-nettverk og multicast</p>
      </div>

      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">RPC-feilklassene (oppg 9) og overlay/multicast med RDP (oppg 8) kommer alltid.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-4/teori/${ch.slug}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/60 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{ch.id}</p>
            <p className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{ch.title}</p>
            <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
          </Link>
        ))}
      </div>

      <div className="text-sm text-[var(--muted)] flex flex-wrap items-center gap-2">
        <span>Se også:</span>
        <Link href="/dat110/eksamenoving/oppg-7" className="text-blue-600 dark:text-blue-400 hover:underline">Oppg 7 — DS-teori</Link>
        <span>·</span>
        <Link href="/dat110/eksamenoving/oppg-8" className="text-blue-600 dark:text-blue-400 hover:underline">Oppg 8 — Overlay</Link>
      </div>
    </div>
  );
}
