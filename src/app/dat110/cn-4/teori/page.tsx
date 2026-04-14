"use client";

import { useState } from "react";

const subChapters = [
  { id: "4.1", title: "Oversikt over nettverkslaget", desc: "Dataplan vs kontrollplan, forwarding vs routing, nettverkslagets tjenester" },
  { id: "4.2", title: "IPv4: datagramformat, adressering og CIDR", desc: "IPv4-header (alle felt), fragmentering, CIDR-notasjon, subnetting og longest-prefix match" },
  { id: "4.3", title: "NAT — Network Address Translation", desc: "Hvordan NAT fungerer, NAT-oversettingstabell, fordeler og ulemper, port-mapping" },
  { id: "4.5", title: "Rutealgoritmer", desc: "Link-state (Dijkstra) vs avstandsvektor (Bellman-Ford), konvergens, count-to-infinity og poisoned reverse" },
  { id: "5.2", title: "Rutingprotokoller i praksis", desc: "OSPF (intra-AS, link-state) og BGP (inter-AS, path-vector), autonome systemer" },
  { id: "5.4", title: "ICMP — Internet Control Message Protocol", desc: "ICMP-meldingstyper, traceroute, ping, feilrapportering i nettverkslaget" },
  { id: "5.6", title: "SDN — Software-Defined Networking", desc: "Sentralisert kontrollplan, OpenFlow-konseptet, match+action-regler (kursorisk)" },
];

export default function CN4TeoriPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Nettverkslaget</h2>
        <p className="text-[var(--muted)] text-sm mb-6">CN 4–5 — IPv4, CIDR, NAT, rutealgoritmer, OSPF, BGP og ICMP</p>
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
