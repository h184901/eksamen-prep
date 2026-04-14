"use client";

import { useState } from "react";

const subChapters = [
  { id: "3.1", title: "Transportlagstjenester og multipleksing", desc: "Multipleksing/demultipleksing, port-adressering, forskjell på nettverkslagets og transportlagets ansvar" },
  { id: "3.2", title: "UDP — connectionless transport", desc: "UDP-segmentformat, checksum-beregning, bruksomrader og fordeler over TCP" },
  { id: "3.3", title: "Palitelig dataoverforing", desc: "rdt 1.0, 2.0, 2.1, 2.2, 3.0 — steg-for-steg utvikling av en palitelig protokoll. Go-Back-N vs Selective Repeat" },
  { id: "3.4", title: "TCP — segmentstruktur og palitelighet", desc: "TCP-segmentformat, sekvensnummer, ACK, 3-veis handshake, timeout og retransmisjon" },
  { id: "3.5", title: "TCP — flytkontroll og metningskontroll", desc: "Mottaksvindu (rwnd), AIMD, slow start, congestion avoidance, fast retransmit/recovery" },
  { id: "3.6", title: "Metningskontroll: prinsipper", desc: "Hvorfor metningskontroll er nodvendig, forskjell pa flytkontroll og metningskontroll, nettverksassistert vs ende-til-ende" },
  { id: "3.7", title: "TCP metningskontroll", desc: "Detaljert AIMD-oppforsel, ssthresh, TCP Reno vs TCP Tahoe, TCP CUBIC (kursorisk)" },
];

export default function CN3TeoriPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Transportlaget</h2>
        <p className="text-[var(--muted)] text-sm mb-6">CN 3.1–3.7 — UDP, TCP, palitelig overforing, flytkontroll og metningskontroll</p>
      </div>

      {/* Delkapittel-navigasjon */}
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
