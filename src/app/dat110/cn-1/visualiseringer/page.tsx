"use client";

import { useState } from "react";

function DelayCalculator() {
  const [L, setL] = useState(1500);
  const [LUnit, setLUnit] = useState<"bytes" | "bits">("bytes");
  const [R, setR] = useState(10);
  const [RUnit, setRUnit] = useState<"Mbps" | "kbps" | "Gbps">("Mbps");
  const [d, setD] = useState(100);
  const [dUnit, setDUnit] = useState<"km" | "m">("km");
  const [s, setS] = useState(2e8);
  const [dProc, setDProc] = useState(0);
  const [dQueue, setDQueue] = useState(0);
  const [hops, setHops] = useState(1);

  const Lbits = LUnit === "bytes" ? L * 8 : L;
  const Rbps = RUnit === "Mbps" ? R * 1e6 : RUnit === "kbps" ? R * 1e3 : R * 1e9;
  const dMeters = dUnit === "km" ? d * 1000 : d;

  const dTrans = Rbps > 0 ? Lbits / Rbps : 0;
  const dProp = s > 0 ? dMeters / s : 0;
  const dNodal = dProc / 1000 + dQueue / 1000 + dTrans + dProp;
  const dE2E = hops * (dTrans + dProp) + (hops > 1 ? (hops - 1) * dProc / 1000 : 0);

  function fmt(val: number): string {
    if (val === 0) return "0";
    if (val >= 1) return val.toFixed(4) + " s";
    if (val >= 0.001) return (val * 1000).toFixed(3) + " ms";
    if (val >= 0.000001) return (val * 1e6).toFixed(2) + " us";
    return val.toExponential(3) + " s";
  }

  return (
    <div className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-6 space-y-5">
      <h3 className="font-bold text-lg">Forsinkelseskalkulator</h3>
      <p className="text-sm text-[var(--muted)]">
        Endre verdiene og se alle forsinkelser beregnet automatisk.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Pakkelengde (L)</label>
          <div className="flex gap-2">
            <input type="number" min={1} value={L} onChange={e => setL(Number(e.target.value))}
              className="flex-1 rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono" />
            <select value={LUnit} onChange={e => setLUnit(e.target.value as typeof LUnit)}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-2 py-1.5 text-sm">
              <option value="bytes">bytes</option>
              <option value="bits">bits</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Linjekapasitet (R)</label>
          <div className="flex gap-2">
            <input type="number" min={0.001} step={0.1} value={R} onChange={e => setR(Number(e.target.value))}
              className="flex-1 rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono" />
            <select value={RUnit} onChange={e => setRUnit(e.target.value as typeof RUnit)}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-2 py-1.5 text-sm">
              <option value="kbps">kbps</option>
              <option value="Mbps">Mbps</option>
              <option value="Gbps">Gbps</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Avstand (d)</label>
          <div className="flex gap-2">
            <input type="number" min={0} value={d} onChange={e => setD(Number(e.target.value))}
              className="flex-1 rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono" />
            <select value={dUnit} onChange={e => setDUnit(e.target.value as typeof dUnit)}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-2 py-1.5 text-sm">
              <option value="km">km</option>
              <option value="m">m</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Signalhastighet (s) [m/s]</label>
          <input type="number" min={1} value={s} onChange={e => setS(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono" />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">d_proc [ms]</label>
          <input type="number" min={0} step={0.1} value={dProc} onChange={e => setDProc(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono" />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">d_queue [ms]</label>
          <input type="number" min={0} step={0.1} value={dQueue} onChange={e => setDQueue(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Antall linker (hopp)</label>
        <input type="range" min={1} max={10} value={hops} onChange={e => setHops(Number(e.target.value))}
          className="w-full accent-network-500" />
        <span className="text-sm font-mono">{hops} link(er) ({hops - 1} ruter{hops > 2 ? "e" : ""})</span>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Sendingsforsinkelse (d_trans = L/R)</p>
          <p className="font-mono text-lg font-bold mt-1">{fmt(dTrans)}</p>
          <p className="font-mono text-xs text-[var(--muted)]">{Lbits} bits / {Rbps.toExponential(2)} bps</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <p className="text-xs font-medium text-green-600 dark:text-green-400">Forplantningsforsinkelse (d_prop = d/s)</p>
          <p className="font-mono text-lg font-bold mt-1">{fmt(dProp)}</p>
          <p className="font-mono text-xs text-[var(--muted)]">{dMeters} m / {s.toExponential(2)} m/s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Nodalforsinkelse (d_nodal)</p>
          <p className="font-mono text-lg font-bold mt-1">{fmt(dNodal)}</p>
          <p className="font-mono text-xs text-[var(--muted)]">d_proc + d_queue + d_trans + d_prop</p>
        </div>
        <div className="rounded-lg bg-network-50 dark:bg-network-950/20 border border-network-200 dark:border-network-800 p-4">
          <p className="text-xs font-medium text-network-600 dark:text-network-400">Ende-til-ende ({hops} link{hops > 1 ? "er" : ""})</p>
          <p className="font-mono text-lg font-bold mt-1">{fmt(dE2E)}</p>
          <p className="font-mono text-xs text-[var(--muted)]">{hops} x (d_trans + d_prop){hops > 1 ? ` + ${hops-1} x d_proc` : ""}</p>
        </div>
      </div>
    </div>
  );
}

function LayerModel() {
  const [hover, setHover] = useState<number | null>(null);
  const layers = [
    { id: 5, name: "Applikasjon", color: "bg-purple-100 dark:bg-purple-900/30 border-purple-400", proto: "HTTP, DNS, FTP, SMTP", pdu: "Melding", detail: "Brukerdata. Prosess-til-prosess kommunikasjon via porter." },
    { id: 4, name: "Transport", color: "bg-blue-100 dark:bg-blue-900/30 border-blue-400", proto: "TCP, UDP", pdu: "Segment", detail: "Multipleksing, palitelig levering (TCP), sekvensnummer, flytkontroll." },
    { id: 3, name: "Nettverk", color: "bg-green-100 dark:bg-green-900/30 border-green-400", proto: "IP, ICMP", pdu: "Datagram", detail: "IP-adresser, rutevalg, fragmentering. Beste-innsats, ingen garanti." },
    { id: 2, name: "Link", color: "bg-orange-100 dark:bg-orange-900/30 border-orange-400", proto: "Ethernet, WiFi", pdu: "Ramme", detail: "MAC-adresser, feildeteksjon (CRC), tilgang til delt medium." },
    { id: 1, name: "Fysisk", color: "bg-red-100 dark:bg-red-900/30 border-red-400", proto: "Fiber, kopper, radio", pdu: "Bits", detail: "Spenningsniva, modulasjon, bitrate pA det fysiske mediet." },
  ];

  return (
    <div className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-6">
      <h3 className="font-bold text-lg mb-2">TCP/IP 5-lagsmodell</h3>
      <p className="text-sm text-[var(--muted)] mb-4">Hold musepekeren over et lag for detaljer.</p>
      <div className="space-y-2 max-w-xl mx-auto">
        {layers.map(layer => (
          <div
            key={layer.id}
            onMouseEnter={() => setHover(layer.id)}
            onMouseLeave={() => setHover(null)}
            className={`rounded-xl border-2 p-4 transition-all cursor-pointer ${layer.color} ${hover === layer.id ? "shadow-lg scale-[1.02]" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg w-6 text-center">{layer.id}</span>
                <span className="font-bold">{layer.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--muted)]">{layer.proto}</span>
                <span className="block text-xs font-mono font-bold">{layer.pdu}</span>
              </div>
            </div>
            {hover === layer.id && (
              <p className="text-sm text-[var(--muted)] mt-2 border-t border-current/10 pt-2">{layer.detail}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
          <p className="font-bold mb-1">Host</p>
          <p className="text-[var(--muted)]">Lag 1–5</p>
        </div>
        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
          <p className="font-bold mb-1">Ruter</p>
          <p className="text-[var(--muted)]">Lag 1–3</p>
        </div>
        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
          <p className="font-bold mb-1">Switch</p>
          <p className="text-[var(--muted)]">Lag 1–2</p>
        </div>
      </div>
    </div>
  );
}

export default function CN1VisualiseringerPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Visualiseringer: Nettverksmetrikker</h2>
      <p className="text-[var(--muted)] max-w-2xl">
        Interaktive verktoy for a forstA forsinkelser og lagmodellen.
      </p>

      <DelayCalculator />
      <LayerModel />
    </div>
  );
}
