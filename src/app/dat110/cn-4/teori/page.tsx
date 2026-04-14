"use client";

import Link from "next/link";

const subChapters = [
  { id: "4.1", slug: "4-1", title: "Oversikt over nettverkslaget", desc: "Dataplan vs kontrollplan, forwarding vs routing, nettverkslagets tjenester" },
  { id: "4.2", slug: "4-2", title: "IPv4: datagram, adressering og CIDR", desc: "IPv4-header (alle felt), fragmentering, CIDR-notasjon, subnetting og longest-prefix match" },
  { id: "4.3", slug: "4-3", title: "NAT — Network Address Translation", desc: "Hvordan NAT fungerer, oversettingstabell, port-mapping, fordeler og ulemper" },
  { id: "4.5", slug: "4-5", title: "Rutealgoritmer", desc: "Link-state (Dijkstra) vs avstandsvektor (Bellman-Ford), konvergens og count-to-infinity" },
  { id: "5.2", slug: "5-2", title: "Rutingprotokoller i praksis", desc: "OSPF (intra-AS, link-state) og BGP (inter-AS, path-vector), autonome systemer" },
  { id: "5.4", slug: "5-4", title: "ICMP", desc: "ICMP-meldingstyper, traceroute, ping og feilrapportering i nettverkslaget" },
  { id: "5.6", slug: "5-6", title: "SDN — Software-Defined Networking", desc: "Sentralisert kontrollplan, OpenFlow, match+action (kursorisk)" },
];

export default function CN4TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Nettverkslaget</h2>
        <p className="text-[var(--muted)] text-sm">CN 4–5 — IPv4, CIDR, NAT, rutealgoritmer, OSPF, BGP og ICMP</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/cn-4/teori/${ch.slug}`}
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
        <Link href="/dat110/eksamenoving/oppg-5" className="text-network-600 dark:text-network-400 hover:underline">Oppg 5 — Ruting</Link>
        <span>·</span>
        <Link href="/dat110/cn-4/formler" className="text-network-600 dark:text-network-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
