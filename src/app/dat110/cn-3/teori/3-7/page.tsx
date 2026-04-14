"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">*</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// Interaktiv cwnd-graf
function CWNDGraph() {
  const [showReno, setShowReno] = useState(true);

  // Simulert cwnd over tid for TCP Reno
  // Faser: slow start → CA → dupACK event → fast recovery
  const renoData = [
    // Slow start fra cwnd=1
    { t: 0, cwnd: 1, fase: "SS" },
    { t: 1, cwnd: 2, fase: "SS" },
    { t: 2, cwnd: 4, fase: "SS" },
    { t: 3, cwnd: 8, fase: "SS" }, // ssthresh=8 → CA
    { t: 4, cwnd: 9, fase: "CA" },
    { t: 5, cwnd: 10, fase: "CA" },
    { t: 6, cwnd: 11, fase: "CA" },
    { t: 7, cwnd: 12, fase: "CA" }, // 3 dup-ACK: ssthresh=6, cwnd=6+3=9 (Reno: fast recovery)
    { t: 8, cwnd: 7, fase: "FR" }, // fast retransmit/recovery
    { t: 9, cwnd: 7, fase: "CA" },
    { t: 10, cwnd: 8, fase: "CA" },
    { t: 11, cwnd: 9, fase: "CA" }, // timeout: ssthresh=4, cwnd=1
    { t: 12, cwnd: 1, fase: "SS" },
    { t: 13, cwnd: 2, fase: "SS" },
    { t: 14, cwnd: 4, fase: "SS" }, // ssthresh=4 → CA
    { t: 15, cwnd: 5, fase: "CA" },
    { t: 16, cwnd: 6, fase: "CA" },
  ];

  const tahoeData = [
    { t: 0, cwnd: 1, fase: "SS" },
    { t: 1, cwnd: 2, fase: "SS" },
    { t: 2, cwnd: 4, fase: "SS" },
    { t: 3, cwnd: 8, fase: "SS" },
    { t: 4, cwnd: 9, fase: "CA" },
    { t: 5, cwnd: 10, fase: "CA" },
    { t: 6, cwnd: 11, fase: "CA" },
    { t: 7, cwnd: 12, fase: "CA" }, // 3 dup-ACK: ssthresh=6, cwnd=1 (Tahoe: tilbake til SS)
    { t: 8, cwnd: 1, fase: "SS" },
    { t: 9, cwnd: 2, fase: "SS" },
    { t: 10, cwnd: 4, fase: "SS" },
    { t: 11, cwnd: 6, fase: "SS" }, // ssthresh=6 → CA
    { t: 12, cwnd: 7, fase: "CA" },
    { t: 13, cwnd: 8, fase: "CA" },
    { t: 14, cwnd: 9, fase: "CA" },
    { t: 15, cwnd: 10, fase: "CA" },
    { t: 16, cwnd: 11, fase: "CA" },
  ];

  const data = showReno ? renoData : tahoeData;
  const maxT = 16;
  const maxCwnd = 14;
  const W = 400;
  const H = 180;
  const padL = 40;
  const padB = 30;
  const padT = 10;
  const plotW = W - padL - 20;
  const plotH = H - padB - padT;

  const tx = (t: number) => padL + (t / maxT) * plotW;
  const cy = (c: number) => padT + plotH - (c / maxCwnd) * plotH;

  const polyline = data.map(d => `${tx(d.t)},${cy(d.cwnd)}`).join(" ");

  const ssthreshY = cy(8);
  const ssthresh2Y = cy(6);
  const ssthresh3Y = cy(4);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-sm">cwnd over tid (interaktiv)</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setShowReno(true)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${showReno ? "bg-blue-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] text-[var(--foreground)]"}`}
          >
            TCP Reno
          </button>
          <button
            onClick={() => setShowReno(false)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!showReno ? "bg-red-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] text-[var(--foreground)]"}`}
          >
            TCP Tahoe
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* Bakgrunn */}
        <rect x={padL} y={padT} width={plotW} height={plotH} fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-neutral-700"/>

        {/* Rutenett */}
        {[2, 4, 6, 8, 10, 12].map(c => (
          <line key={c} x1={padL} y1={cy(c)} x2={padL + plotW} y2={cy(c)} stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-neutral-800"/>
        ))}

        {/* ssthresh-linjer */}
        <line x1={padL} y1={ssthreshY} x2={padL + plotW} y2={ssthreshY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3"/>
        <text x={padL - 5} y={ssthreshY + 3} textAnchor="end" fontSize="8" fill="#f59e0b">8</text>

        {/* Fase-bakgrunner */}
        <rect x={padL} y={padT} width={tx(3) - padL} height={plotH} fill="#dcfce7" opacity="0.3"/>
        <text x={(padL + tx(3)) / 2} y={padT + 10} textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold">SS</text>

        <rect x={tx(3)} y={padT} width={showReno ? tx(7) - tx(3) : tx(7) - tx(3)} height={plotH} fill="#dbeafe" opacity="0.3"/>
        <text x={(tx(3) + tx(7)) / 2} y={padT + 10} textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="bold">CA</text>

        {showReno ? (
          <>
            <rect x={tx(7)} y={padT} width={tx(9) - tx(7)} height={plotH} fill="#fce7f3" opacity="0.5"/>
            <text x={(tx(7) + tx(9)) / 2} y={padT + 10} textAnchor="middle" fontSize="7" fill="#db2777" fontWeight="bold">FR</text>
          </>
        ) : (
          <rect x={tx(7)} y={padT} width={tx(11) - tx(7)} height={plotH} fill="#dcfce7" opacity="0.3"/>
        )}

        {/* Hendelse-merker */}
        <line x1={tx(7)} y1={padT} x2={tx(7)} y2={padT + plotH} stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2"/>
        <text x={tx(7)} y={padT - 2} textAnchor="middle" fontSize="7" fill="#ef4444">{showReno ? "3dup-ACK" : "3dup-ACK"}</text>

        {showReno && (
          <>
            <line x1={tx(11)} y1={padT} x2={tx(11)} y2={padT + plotH} stroke="#7c3aed" strokeWidth="1" strokeDasharray="3,2"/>
            <text x={tx(11)} y={padT - 2} textAnchor="middle" fontSize="7" fill="#7c3aed">timeout</text>
          </>
        )}

        {/* cwnd-kurve */}
        <polyline points={polyline} fill="none" stroke={showReno ? "#2563eb" : "#dc2626"} strokeWidth="2" strokeLinejoin="round"/>

        {/* Punkt-markorer */}
        {data.map((d, i) => (
          <circle key={i} cx={tx(d.t)} cy={cy(d.cwnd)} r="3" fill={showReno ? "#2563eb" : "#dc2626"}/>
        ))}

        {/* Akser */}
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#64748b" strokeWidth="1.5"/>
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#64748b" strokeWidth="1.5"/>

        {/* Akse-labels */}
        <text x={padL + plotW / 2} y={H - 5} textAnchor="middle" fontSize="9" fill="#64748b">Tid (RTT)</text>
        <text x="10" y={padT + plotH / 2} textAnchor="middle" fontSize="9" fill="#64748b" transform={`rotate(-90,10,${padT + plotH / 2})`}>cwnd (MSS)</text>

        {/* Y-akse tall */}
        {[2, 4, 6, 8, 10, 12].map(c => (
          <text key={c} x={padL - 4} y={cy(c) + 3} textAnchor="end" fontSize="8" fill="#94a3b8">{c}</text>
        ))}

        {/* X-akse tall */}
        {[0, 4, 8, 12, 16].map(t => (
          <text key={t} x={tx(t)} y={padT + plotH + 12} textAnchor="middle" fontSize="8" fill="#94a3b8">{t}</text>
        ))}
      </svg>

      <div className="flex flex-wrap gap-3 mt-2 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-200"></div><span>Slow Start (SS)</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-200"></div><span>Congestion Avoidance (CA)</span></div>
        {showReno && <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-pink-200"></div><span>Fast Recovery (FR) — kun Reno</span></div>}
        <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-amber-400"></div><span>ssthresh</span></div>
      </div>
    </div>
  );
}

export default function CN3Teori37Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.7 TCP metningskontroll</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.7 — EKSAMENSKRITISK</p>
        <h1 className="text-2xl font-bold mb-2">TCP Metningskontroll</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          TCP-metningskontroll er en av de mest elegante algoritmene i datanettverk. AIMD,
          slow start og congestion avoidance jobber sammen for a finne maksimal senderate
          uten a overmette nettverket. Grafen over cwnd over tid er eksamensklassiker.
        </p>
      </div>

      <MustKnow items={[
        "AIMD: Additive Increase (+1 MSS per RTT i CA), Multiplicative Decrease (halver ved tap)",
        "Slow Start: cwnd dobles per RTT (eksponentiell vekst), starter fra 1 MSS",
        "ssthresh: terskel mellom Slow Start og Congestion Avoidance",
        "Tre metningssignaler: timeout (alvorlig), 3 duplikat-ACKer (mildere)",
        "TCP Reno vs Tahoe: Reno har Fast Recovery ved 3 dup-ACK, Tahoe tilbake til SS",
        "Fast Retransmit: retransmitter ved 3 dup-ACKer UTEN a vente pa timeout",
        "Tegn cwnd-grafen med riktige faser og hendelser",
      ]} />

      <Section title="1. Oversikt — de tre fasene" defaultOpen={true}>
        <div className="grid sm:grid-cols-3 gap-3">
          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">Slow Start (SS)</h4>
            <p className="text-xs text-[var(--muted)]">Start fra cwnd=1 MSS. Dobles per RTT (eksponentiell vekst). Fortsetter til cwnd = ssthresh.</p>
            <div className="mt-2 rounded bg-green-100 dark:bg-green-900/30 p-1 text-xs font-mono text-center">
              cwnd += 1 per ACK<br/>(= *2 per RTT)
            </div>
          </Card>
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Congestion Avoidance (CA)</h4>
            <p className="text-xs text-[var(--muted)]">Nar cwnd &ge; ssthresh. Lineaer vekst (+1 MSS per RTT). Forsiktig probing av nettverkskapasitet.</p>
            <div className="mt-2 rounded bg-blue-100 dark:bg-blue-900/30 p-1 text-xs font-mono text-center">
              cwnd += 1/cwnd per ACK<br/>(= +1 MSS per RTT)
            </div>
          </Card>
          <Card color="red">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">Metningshendelse</h4>
            <p className="text-xs text-[var(--muted)]">Tap detektert → reducer cwnd. To typer: timeout (alvorlig) og 3 duplikat-ACKer (mildere).</p>
            <div className="mt-2 rounded bg-red-100 dark:bg-red-900/30 p-1 text-xs font-mono text-center">
              timeout: cwnd=1<br/>3-dup: cwnd=ssthresh
            </div>
          </Card>
        </div>
      </Section>

      <Section title="2. AIMD — det sentrale prinsippet" defaultOpen={true}>
        <Card color="gold">
          <h4 className="font-bold mb-2">Additive Increase, Multiplicative Decrease</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-sm text-green-700 dark:text-green-400">Additive Increase (AI)</p>
              <p className="text-sm mt-1">I congestion avoidance-fasen: oek cwnd med 1 MSS per RTT. Lineaer vekst = forsiktig "sondering" etter kapasitet.</p>
              <div className="mt-2 font-mono text-xs bg-green-100 dark:bg-green-900/30 p-2 rounded">
                cwnd = cwnd + MSS * (MSS / cwnd)<br/>
                (per ACK mottatt)
              </div>
            </div>
            <div>
              <p className="font-bold text-sm text-red-700 dark:text-red-400">Multiplicative Decrease (MD)</p>
              <p className="text-sm mt-1">Ved metningsdeteksjon: halver cwnd (eller nullstill til 1 ved timeout). Halvering er raskere nedregulering enn lineaer.</p>
              <div className="mt-2 font-mono text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded">
                3 dup-ACK: cwnd = cwnd/2<br/>
                timeout: cwnd = 1
              </div>
            </div>
          </div>
          <p className="text-sm mt-3 font-bold">Hvorfor AIMD er rettferdig:</p>
          <p className="text-sm text-[var(--muted)]">AIMD konvergerer mot likelig fordeling mellom TCP-flyter som deler en link. Matematisk sett "vandrer" de to flytene mot likepunktet langs en stier mot og fra den "rettferdige linjen".</p>
        </Card>
      </Section>

      <Section title="3. ssthresh — terskelen" defaultOpen={true}>
        <Card color="network">
          <h4 className="font-bold mb-2">ssthresh (Slow Start Threshold)</h4>
          <p className="text-sm">ssthresh er terskelen som styrer om TCP er i Slow Start eller Congestion Avoidance:</p>
          <div className="mt-2 space-y-1 text-sm">
            <p>Hvis <code className="font-mono bg-cyan-100 dark:bg-cyan-900/30 px-1 rounded">cwnd &lt; ssthresh</code> → Slow Start (dobling)</p>
            <p>Hvis <code className="font-mono bg-cyan-100 dark:bg-cyan-900/30 px-1 rounded">cwnd &ge; ssthresh</code> → Congestion Avoidance (+1/RTT)</p>
          </div>
        </Card>

        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Hendelse</th>
                <th className="px-3 py-2 text-left text-amber-700 dark:text-amber-400">ssthresh settes til</th>
                <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-400">cwnd settes til</th>
                <th className="px-3 py-2 text-left">Neste fase</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Timeout", "cwnd / 2", "1 MSS", "Slow Start"],
                ["3 duplikat-ACKer (Tahoe)", "cwnd / 2", "1 MSS", "Slow Start"],
                ["3 duplikat-ACKer (Reno)", "cwnd / 2", "ssthresh + 3", "Fast Recovery → CA"],
                ["cwnd = ssthresh (ingen tap)", "uendret", "uendret", "Congestion Avoidance"],
              ].map(([hend, sst, cw, fase], i) => (
                <tr key={hend} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-bold text-xs text-red-600 dark:text-red-400">{hend}</td>
                  <td className="px-3 py-2 text-xs text-amber-700 dark:text-amber-400 font-mono">{sst}</td>
                  <td className="px-3 py-2 text-xs text-blue-700 dark:text-blue-400 font-mono">{cw}</td>
                  <td className="px-3 py-2 text-xs text-green-700 dark:text-green-400">{fase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Interaktiv cwnd-graf" defaultOpen={true}>
        <CWNDGraph />
      </Section>

      <Section title="5. TCP Reno vs TCP Tahoe" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">TCP Tahoe (eldre)</h4>
            <p className="text-sm font-bold">Reaksjon pa 3 duplikat-ACKer:</p>
            <ul className="text-sm text-[var(--muted)] mt-2 space-y-1 list-disc list-inside">
              <li>ssthresh = cwnd / 2</li>
              <li>cwnd = 1 MSS</li>
              <li>Gaar tilbake til Slow Start</li>
            </ul>
            <div className="mt-2 rounded bg-blue-100 dark:bg-blue-900/30 p-2 text-xs">
              Enklere, men mer aggressiv nedregulering. Tar lenger tid a gjenopprette etter mildt tap.
            </div>
          </Card>
          <Card color="network">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">TCP Reno (moderne)</h4>
            <p className="text-sm font-bold">Reaksjon pa 3 duplikat-ACKer:</p>
            <ul className="text-sm text-[var(--muted)] mt-2 space-y-1 list-disc list-inside">
              <li>ssthresh = cwnd / 2</li>
              <li>cwnd = ssthresh + 3 (Fast Recovery)</li>
              <li>Retransmitter tapt segment umiddelbart</li>
              <li>Nar ny ACK ankommer: cwnd = ssthresh → CA</li>
            </ul>
            <div className="mt-2 rounded bg-cyan-100 dark:bg-cyan-900/30 p-2 text-xs">
              Bedre ytelse: Fast Recovery unngaar full Slow Start ved mildt tap. Standard i de fleste OS.
            </div>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Fast Retransmit — ikke vent pa timeout!</h4>
          <p className="text-sm">Nar senderen mottar <strong>3 duplikat-ACKer</strong> (d.v.s. 4 ACKer med samme sekvensnummer), tolkes dette som at et spesifikt segment er tapt. Senderen retransmitterer det umiddelbart uten a vente pa timeout-intervallet.</p>
          <div className="mt-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2 text-xs">
            <strong>Hvorfor 3 duplikat-ACKer?</strong> Mottakeren sender ACK(n) for hvert segment som ankommer etter n. 3 duplikater indikerer at segmentet etter det forventede er tapt. Timeout indikerer typisk mer alvorlig metning (mange pakker tapt).
          </div>
        </Card>
      </Section>

      <Section title="6. TCP Gjennomstromning (throughput)">
        <FormulaBox
          latex="\text{throughput} \approx \frac{0.75 \cdot W}{RTT}"
          title="TCP gjennomstromning (forenklet)"
          variant="gold"
          description="W = maksimal vindusstorrelse (MSS). Gjennomstromningen varierer mellom W/2 og W grunnet saktedansen."
        />

        <FormulaBox
          latex="\text{throughput} = \frac{1.22 \cdot MSS}{RTT \cdot \sqrt{L}}"
          title="TCP gjennomstromning — Mathis-formel (mer presis)"
          variant="blue"
          description="L = pakketap-sannsynlighet. Hoyere tap → lavere gjennomstromning. Basis for kapasitetsplanlegging."
        />

        <Card color="network">
          <h4 className="font-bold mb-2">Hva begrenser TCP-gjennomstromning i praksis?</h4>
          <div className="space-y-1 text-sm">
            <p>Effektivt sendervindu = min(cwnd, rwnd)</p>
            <p><strong>cwnd</strong> begrenses av: metningskontroll (AIMD)</p>
            <p><strong>rwnd</strong> begrenses av: mottakerens buffer</p>
            <p className="text-[var(--muted)] text-xs mt-1">Pa moderne raskt LAN med stor rwnd er cwnd typisk bindende. Pa trege WAN-linker kan rwnd vaere bindende.</p>
          </div>
        </Card>
      </Section>

      <Section title="7. Eksamen — klassiske sporsmaal">
        <div className="space-y-3">
          <Card color="red">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Typisk eksamensoppgave: Trace cwnd</h4>
            <div className="text-sm space-y-2">
              <p><strong>Oppgave:</strong> TCP Reno starter med cwnd=1, ssthresh=8. Beskriv cwnd for RTT 1-10 om alt gar bra til RTT 7 der 3 dup-ACKer mottas.</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p>RTT 1: cwnd=1 (SS, &lt;ssthresh=8)</p>
                <p>RTT 2: cwnd=2 (SS)</p>
                <p>RTT 3: cwnd=4 (SS)</p>
                <p>RTT 4: cwnd=8 (SS, cwnd=ssthresh → overgang)</p>
                <p>RTT 5: cwnd=9 (CA, +1)</p>
                <p>RTT 6: cwnd=10 (CA)</p>
                <p>RTT 7: cwnd=11 (CA) → 3 dup-ACK mottas!</p>
                <p className="text-red-600">  → ssthresh = 11/2 ≈ 5, cwnd = 5+3 = 8 (FR, Reno)</p>
                <p>RTT 8: cwnd=6 (ny ACK for tapt seg → CA fra 5)</p>
                <p>RTT 9: cwnd=6 (CA)</p>
                <p>RTT 10: cwnd=7 (CA)</p>
              </div>
            </div>
          </Card>

          <Card color="gold">
            <h4 className="font-bold mb-2">Husk: Reno vs Tahoe ved 3 dup-ACKer</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
                <p className="font-bold text-blue-600 dark:text-blue-400">TCP Tahoe</p>
                <p className="text-[var(--muted)]">ssthresh = cwnd/2; cwnd = 1; → Slow Start</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
                <p className="font-bold text-cyan-600 dark:text-cyan-400">TCP Reno</p>
                <p className="text-[var(--muted)]">ssthresh = cwnd/2; cwnd = ssthresh+3; → Fast Recovery → CA</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Lenker til videre oving</h4>
          <div className="flex flex-wrap gap-2">
            <Link href="/dat110/eksamenoving/oppg-4" className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
              Eksamenoving oppgave 4 (protokoller)
            </Link>
            <Link href="/dat110/cn-3/formler" className="px-3 py-1.5 rounded-lg border border-cyan-400 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-sm font-medium transition-colors">
              CN-3 Formler
            </Link>
          </div>
        </div>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori/3-6" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 3.6 Metningskontroll-prinsipper
        </Link>
        <Link href="/dat110/cn-3/teori" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          Tilbake til oversikt
        </Link>
      </div>
    </div>
  );
}
