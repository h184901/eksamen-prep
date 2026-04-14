"use client";

import Link from "next/link";

const subChapters = [
  { id: "3.1", slug: "3-1", title: "Transportlagstjenester og multipleksing", desc: "Logisk kommunikasjon mellom prosesser, multipleksing/demultipleksing og port-adressering" },
  { id: "3.2", slug: "3-2", title: "UDP — connectionless transport", desc: "UDP-segmentformat, checksum-beregning, fordeler over TCP og bruksområder" },
  { id: "3.3", slug: "3-3", title: "Pålitelig dataoverføring (rdt)", desc: "Fra rdt 1.0 til 3.0 steg for steg, Go-Back-N vs Selective Repeat — svært eksamensrelevant" },
  { id: "3.4", slug: "3-4", title: "TCP — segmentstruktur og pålitelighet", desc: "TCP-segmentet, sekvensnummer, ACK, 3-veis handshake, timeout og retransmisjon" },
  { id: "3.5", slug: "3-5", title: "TCP — flytkontroll", desc: "Mottaksvindu (rwnd), forskjell på flytkontroll og metningskontroll, connection management" },
  { id: "3.6", slug: "3-6", title: "Metningskontroll: prinsipper", desc: "Hva er metning? Årsaker og kostnader, nettverksassistert vs ende-til-ende" },
  { id: "3.7", slug: "3-7", title: "TCP metningskontroll", desc: "AIMD, slow start, congestion avoidance, fast retransmit, ssthresh, Reno vs Tahoe" },
];

export default function CN3TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Transportlaget</h2>
        <p className="text-[var(--muted)] text-sm">CN 3.1–3.7 — UDP, TCP, pålitelig overføring, flytkontroll og metningskontroll</p>
      </div>

      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">Transportlaget testes alltid i oppgave 4 (protokoller). TCP-header, rdt-protokollene og metningskontroll er gjengangere.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/cn-3/teori/${ch.slug}`}
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
        <Link href="/dat110/eksamenoving/oppg-4" className="text-network-600 dark:text-network-400 hover:underline">Oppg 4 — Protokoller</Link>
        <span>·</span>
        <Link href="/dat110/cn-3/formler" className="text-network-600 dark:text-network-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
