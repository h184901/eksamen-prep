"use client";

import { useState } from "react";

const subChapters = [
  { id: "6.1", title: "Introduksjon til linklaget", desc: "Linklaget i protokollstakken, tjenester det tilbyr, forskjell pa punkt-til-punkt og kringkastingslinker" },
  { id: "6.2", title: "Feildeteksjon og korreksjon", desc: "Paritetsbit, checksum, CRC (Cyclic Redundancy Check) — hvordan feil oppdages og rettes" },
  { id: "6.3", title: "Multiple-access-protokoller", desc: "Kanalpartisjonering (TDMA/FDMA), ALOHA, CSMA, CSMA/CD — kollisjonshandtering" },
  { id: "6.4", title: "Ethernet, MAC-adresser, ARP og switch", desc: "Ethernet-rammeformat, MAC-adresser (48-bit), ARP-protokollen, switch self-learning og forwardingtabell" },
  { id: "6.6", title: "Data-senter nettverk", desc: "Topologi i data-sentre, load balancing, hierarkisk vs fat-tree-arkitektur" },
  { id: "6.7", title: "Et webforespørsel-scenario fra A til A", desc: "Komplett gjennomgang: DHCP, ARP, DNS, TCP, HTTP — alle lag i aksjon" },
];

export default function CN6TeoriPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Linklaget</h2>
        <p className="text-[var(--muted)] text-sm mb-6">CN 6.1–6.8 — MAC-adresser, ARP, Ethernet, switch-laring og DHCP</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {subChapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActive(active === ch.id ? null : ch.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              active === ch.id
                ? "bg-network-600 text-white border-network-600 shadow-sm"
                : "bg-[var(--card)] border-[var(--card-border)] hover:border-network-400 text-[var(--foreground)]"
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
              className="text-left rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-network-400/60 transition-all hover:shadow-sm"
            >
              <p className="text-xs font-bold text-network-600 dark:text-network-400 mb-1">{ch.id}</p>
              <p className="font-semibold text-sm mb-1">{ch.title}</p>
              <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        subChapters.map((ch) =>
          active === ch.id ? (
            <div key={ch.id} className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-network-600 dark:text-network-400">{ch.id}</p>
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
