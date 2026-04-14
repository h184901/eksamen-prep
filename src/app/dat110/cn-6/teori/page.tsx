"use client";

import Link from "next/link";

const subChapters = [
  { id: "6.1", slug: "6-1", title: "Introduksjon til linklaget", desc: "Linklaget i protokollstakken, tjenester, punkt-til-punkt vs kringkastingslinker" },
  { id: "6.2", slug: "6-2", title: "Feildeteksjon og korreksjon", desc: "Paritetsbit, checksum, CRC (Cyclic Redundancy Check)" },
  { id: "6.3", slug: "6-3", title: "Multiple-access-protokoller", desc: "TDMA/FDMA, ALOHA, CSMA/CD — kollisjonshandtering" },
  { id: "6.4", slug: "6-4", title: "Ethernet, MAC, ARP og switch", desc: "Ethernet-ramme, MAC-adresser (48-bit), ARP-protokollen, switch self-learning" },
  { id: "6.6", slug: "6-6", title: "Data-senter nettverk", desc: "Topologi, load balancing, hierarkisk vs fat-tree" },
  { id: "6.7", slug: "6-7", title: "Et webforespørsel-scenario", desc: "Komplett gjennomgang: DHCP → ARP → DNS → TCP → HTTP — alle lag i aksjon" },
];

export default function CN6TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Linklaget</h2>
        <p className="text-[var(--muted)] text-sm">CN 6.1–6.8 — MAC-adresser, ARP, Ethernet, switch-læring og DHCP</p>
      </div>

      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">ARP-tabell og switch self-learning kommer alltid i oppgave 6. Øv på steg-for-steg-scenarier.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/cn-6/teori/${ch.slug}`}
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
        <Link href="/dat110/eksamenoving/oppg-6" className="text-network-600 dark:text-network-400 hover:underline">Oppg 6 — ARP og Switch</Link>
        <span>·</span>
        <Link href="/dat110/cn-6/formler" className="text-network-600 dark:text-network-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
