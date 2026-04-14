"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

// ---- Interaktiv forsinkelseskalkulator ----
function ForsinkelsesKalkulator() {
  const [L, setL] = useState(1000);       // pakkelengde i bits
  const [R, setR] = useState(1000000);    // linjekapasitet i bps (1 Mbps)
  const [d, setD] = useState(10000);      // avstand i meter
  const [s, setS] = useState(2e8);        // signalhastighet m/s
  const [dproc, setDproc] = useState(0.002); // behandlingsforsinkelse s
  const [dqueue, setDqueue] = useState(0.01); // koforsinkelse s

  const dtrans = L / R;
  const dprop = d / s;
  const dnodal = dproc + dqueue + dtrans + dprop;

  const fmt = (v: number) => {
    if (v >= 1) return v.toFixed(4) + " s";
    if (v >= 1e-3) return (v * 1e3).toFixed(4) + " ms";
    if (v >= 1e-6) return (v * 1e6).toFixed(4) + " \u00b5s";
    return (v * 1e9).toFixed(4) + " ns";
  };

  const total = dnodal;
  const maxBar = Math.max(dtrans, dprop, dproc, dqueue, 0.0001);
  const bars = [
    { label: "d_proc", val: dproc, color: "bg-purple-500", tooltip: "Behandlingsforsinkelse" },
    { label: "d_queue", val: dqueue, color: "bg-orange-500", tooltip: "Koforsinkelse" },
    { label: "d_trans", val: dtrans, color: "bg-blue-500", tooltip: "Sendingsforsinkelse = L/R" },
    { label: "d_prop", val: dprop, color: "bg-green-500", tooltip: "Forplantningsforsinkelse = d/s" },
  ];

  return (
    <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 space-y-4">
      <h3 className="font-bold text-network-600 dark:text-network-400">Interaktiv forsinkelseskalkulator</h3>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">
              L: Pakkelengde = <strong>{L.toLocaleString()} bits</strong>
            </label>
            <input type="range" min="100" max="100000" step="100" value={L}
              onChange={e => setL(Number(e.target.value))}
              className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-[var(--muted)]"><span>100 bits</span><span>100 000 bits</span></div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              R: Linjekapasitet = <strong>{(R/1e6).toFixed(1)} Mbps</strong>
            </label>
            <input type="range" min="100000" max="1000000000" step="100000" value={R}
              onChange={e => setR(Number(e.target.value))}
              className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-[var(--muted)]"><span>0.1 Mbps</span><span>1 Gbps</span></div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              d: Avstand = <strong>{d.toLocaleString()} m</strong>
            </label>
            <input type="range" min="100" max="10000000" step="100" value={d}
              onChange={e => setD(Number(e.target.value))}
              className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-[var(--muted)]"><span>100 m</span><span>10 000 km</span></div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">
              s: Signalhastighet = <strong>{(s/1e8).toFixed(1)} &times;10&#8308; m/s</strong>
            </label>
            <input type="range" min="1e8" max="3e8" step="1e7" value={s}
              onChange={e => setS(Number(e.target.value))}
              className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-[var(--muted)]"><span>1&times;10&#8308; m/s</span><span>3&times;10&#8308; m/s</span></div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              d_proc: Behandling = <strong>{(dproc*1000).toFixed(1)} ms</strong>
            </label>
            <input type="range" min="0" max="0.01" step="0.0001" value={dproc}
              onChange={e => setDproc(Number(e.target.value))}
              className="w-full accent-purple-500" />
            <div className="flex justify-between text-xs text-[var(--muted)]"><span>0 ms</span><span>10 ms</span></div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              d_queue: Ko = <strong>{(dqueue*1000).toFixed(1)} ms</strong>
            </label>
            <input type="range" min="0" max="0.1" step="0.001" value={dqueue}
              onChange={e => setDqueue(Number(e.target.value))}
              className="w-full accent-orange-500" />
            <div className="flex justify-between text-xs text-[var(--muted)]"><span>0 ms</span><span>100 ms</span></div>
          </div>
        </div>
      </div>

      {/* Resultater */}
      <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-[var(--card-border)] p-3 space-y-2">
        <p className="text-xs font-bold text-[var(--muted)] mb-2">Resultater:</p>
        {bars.map(b => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-xs font-mono w-20 shrink-0 text-[var(--muted)]">{b.label}</span>
            <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded h-4">
              <div
                className={`h-4 rounded ${b.color} transition-all`}
                style={{ width: `${Math.min((b.val / maxBar) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs font-mono w-24 text-right shrink-0">{fmt(b.val)}</span>
          </div>
        ))}
        <div className="border-t border-[var(--card-border)] pt-2 mt-2 flex items-center justify-between">
          <span className="text-sm font-bold">d_nodal (total)</span>
          <span className="text-sm font-bold text-network-600 dark:text-network-400">{fmt(total)}</span>
        </div>
      </div>

      <p className="text-xs text-[var(--muted)]">
        Prototip: endre parametrene og se hvordan hver forsinkelsestype bidrar til totalen.
        Legg merke til at hoy avstand dominerer forplantningsforsinkelsen, mens
        lav linjekapasitet dominerer sendingsforsinkelsen.
      </p>
    </div>
  );
}

// ---- Trafikkintensitet visualisering ----
function TrafikkintensitetVis() {
  const [La_R, setLa_R] = useState(0.5);

  const getQueueColor = (val: number) => {
    if (val < 0.3) return "text-green-600 dark:text-green-400";
    if (val < 0.7) return "text-yellow-600 dark:text-yellow-400";
    if (val < 0.95) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getQueueDescription = (val: number) => {
    if (val < 0.3) return "Svart lite ko. Lav forsinkelse.";
    if (val < 0.7) return "Moderat ko. Merkbar forsinkelse.";
    if (val < 0.95) return "Stor ko! Hoy forsinkelse.";
    if (val < 1.0) return "KRITISK: Ko vokser mot uendelig!";
    return "OVERSKUDD: Pakker tapes! La/R > 1 er uakseptabelt.";
  };

  return (
    <div className="rounded-xl border-2 border-orange-400/60 bg-orange-50 dark:bg-orange-950/20 p-4 space-y-3">
      <h3 className="font-bold text-orange-700 dark:text-orange-400">Trafikkintensitet La/R</h3>

      <div>
        <label className="block text-xs font-medium mb-1">
          Trafikkintensitet (La/R) = <strong className={getQueueColor(La_R)}>{La_R.toFixed(2)}</strong>
        </label>
        <input type="range" min="0" max="1.05" step="0.01" value={La_R}
          onChange={e => setLa_R(Number(e.target.value))}
          className="w-full accent-orange-500" />
        <div className="flex justify-between text-xs text-[var(--muted)]"><span>0 (ingen trafikk)</span><span>1.05 (overskudd)</span></div>
      </div>

      {/* Ko-visualisering */}
      <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-orange-200 dark:border-orange-800 p-3">
        <div className="flex items-end gap-1 h-16 mb-2">
          {Array.from({ length: 20 }, (_, i) => {
            const prob = Math.min(Math.pow(La_R * 20, i * 0.3) * 0.1, 1);
            const height = Math.min(La_R >= 1 ? 1 : Math.pow(La_R, 3) * (i / 10), 1);
            return (
              <div key={i} className="flex-1 bg-orange-400 dark:bg-orange-600 rounded-t transition-all"
                style={{ height: `${height * 100}%` }} />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)]">
          <span>Tid &rarr;</span>
          <span className={`font-bold ${getQueueColor(La_R)}`}>{getQueueDescription(La_R)}</span>
        </div>
      </div>

      <div className="text-sm space-y-1 text-[var(--muted)]">
        <p><strong className="text-green-700 dark:text-green-400">La/R &lt; 1:</strong> Ko er stabil og liten. Gjennomsnittlig forsinkelse er liten.</p>
        <p><strong className="text-orange-700 dark:text-orange-400">La/R &rarr; 1:</strong> Ko vokser eksponentielt. Forsinkelse mot uendelig.</p>
        <p><strong className="text-red-700 dark:text-red-400">La/R &gt; 1:</strong> Pakker ankommer raskere enn de kan sendes. <em>Tap er uunngAelig.</em></p>
      </div>
    </div>
  );
}

export default function CN1_4Page() {
  const [showEksempel1, setShowEksempel1] = useState(false);
  const [showEksempel2, setShowEksempel2] = useState(false);
  const [showEksempel3, setShowEksempel3] = useState(false);
  const [showEksempel4, setShowEksempel4] = useState(false);
  const [showAnalogi, setShowAnalogi] = useState(false);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.4 Forsinkelse, tap og gjennomstromning</span>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">1.4 Forsinkelse, tap og gjennomstromning</h1>
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white">EKSAMEN ALLTID</span>
        </div>
        <p className="text-[var(--muted)] max-w-2xl">
          Dette er det viktigste delkapittelet i hele CN-1. Forsinkelsesberegning er
          <strong> oppgave 3 pA ALLE eksamener</strong> (jan 2025, mai 2024, alle tidligere).
          Du MA kunne alle fire formler, nAr du bruker dem, og typiske fallgruver.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne (eksamen)</h3>
        <ul className="space-y-1">
          {[
            "Alle fire forsinkelsestyper: d_proc, d_queue, d_trans = L/R, d_prop = d/s",
            "Total nodalforsinkelse: d_nodal = d_proc + d_queue + d_trans + d_prop",
            "Ende-til-ende forsinkelse over N hopp med ulike linker",
            "Trafikkintensitet La/R og hva som skjer nAr den nArmer seg 1",
            "Gjennomstromning (throughput) og flaskehals-konseptet",
            "Forskjellen mellom sendingsforsinkelse og forplantningsforsinkelse!",
            "Maksimalt antall pakker per sekund = R/L",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* De fire forsinkelsestypene */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          De fire forsinkelsestypene
        </h2>

        <FormulaBox
          latex="d_{nodal} = d_{proc} + d_{queue} + d_{trans} + d_{prop}"
          title="Total nodalforsinkelse ved en ruter"
          variant="gold"
          description="Summen av alle fire forsinkelseskomponenter ved en enkelt node (ruter eller vert)."
        />

        <div className="space-y-3">
          {[
            {
              nr: "1",
              navn: "Behandlingsforsinkelse",
              symbol: "d_proc",
              formel: null,
              farge: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
              tfarge: "text-purple-700 dark:text-purple-400",
              forklaring: "Tid rutere bruker pA A undersoke pakke-headeren, sjekke for bitfeil og bestemme hvilken utgangslink pakken skal sendes pA. Typisk mikrosekunder. Oftest neglisjerbar eller gitt direkte i oppgaven.",
              husk: "d_proc er GITT i oppgaven, du trenger ikke beregne den.",
            },
            {
              nr: "2",
              navn: "Koforsinkelse",
              symbol: "d_queue",
              formel: null,
              farge: "border-orange-400/60 bg-orange-50 dark:bg-orange-950/20",
              tfarge: "text-orange-700 dark:text-orange-400",
              forklaring: "Tid pakken venter i utgangskov pA A bli transmittert. Avhenger av trafikknivA. NAt mange pakker ankommer samtidig, m\u00e5 pakker vente. Best beskrevet av trafikkintensiteten La/R.",
              husk: "d_queue er GITT i oppgaven eller angis via trafikkintensitet. Du beregner den ikke direkte.",
            },
            {
              nr: "3",
              navn: "Sendingsforsinkelse (transmisjonsforsinkelse)",
              symbol: "d_trans = L/R",
              formel: "d_{trans} = \\frac{L}{R}",
              farge: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
              tfarge: "text-blue-700 dark:text-blue-400",
              forklaring: "Tid det tar A skyve ALLE bits av pakken ut pA linken. Tenk pA det som 'pumping' av bits ut pA kabelen. Avhenger kun av pakkelengden L og linjekapasiteten R, IKKE av avstand.",
              husk: "d_trans = L/R. L i bits, R i bits/sekund. Avstand spiller INGEN rolle.",
            },
            {
              nr: "4",
              navn: "Forplantningsforsinkelse (propagasjonsforsinkelse)",
              symbol: "d_prop = d/s",
              formel: "d_{prop} = \\frac{d}{s}",
              farge: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
              tfarge: "text-green-700 dark:text-green-400",
              forklaring: "Tid det tar for ett bit A reise fra kilde til mAl. Avhenger kun av den fysiske avstanden d og signalhastigheten s i mediet. Linjekapasiteten R spiller INGEN rolle.",
              husk: "d_prop = d/s. d i meter, s typisk 2\u00d710\u2078 m/s. Pakkelengde spiller INGEN rolle.",
            },
          ].map((type) => (
            <div key={type.nr} className={`rounded-xl border-2 p-4 ${type.farge}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className={`text-xs font-bold ${type.tfarge}`}>Type {type.nr}</span>
                  <h3 className={`font-bold ${type.tfarge}`}>{type.navn}</h3>
                  <code className="text-sm font-mono">{type.symbol}</code>
                </div>
                {type.formel && (
                  <div className="text-right">
                    <InlineLatex latex={type.formel} />
                  </div>
                )}
              </div>
              <p className="text-sm text-[var(--muted)]">{type.forklaring}</p>
              <div className="mt-2 rounded-lg bg-white/60 dark:bg-neutral-900/40 px-3 py-1.5 text-xs">
                <span className="font-bold">Husk: </span>{type.husk}
              </div>
            </div>
          ))}
        </div>

        {/* Analogi: karavane pA motorvei */}
        <button
          onClick={() => setShowAnalogi(!showAnalogi)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Analogi: karavane pA motorvei (forklarer d_trans vs d_prop)</span>
          <span>{showAnalogi ? "▲" : "▼"}</span>
        </button>
        {showAnalogi && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-3">
            <p className="font-bold">Tenk pA en karavane pA motorvei:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-bold text-blue-700 dark:text-blue-400 text-xs mb-1">d_trans = L/R (sendingsforsinkelse)</p>
                <p className="text-xs text-[var(--muted)]">
                  Tenk deg en bompstasjon der biler stopper for A betale.
                  <strong> d_trans</strong> = tid det tar for ALLE bilene i karavanen
                  A kjore gjennom bomstasjonen.
                  Avhenger av antall biler (L = pakkelengde) og hastigheten bomstasjonen
                  betjener dem (R = linjekapasitet). Avstand til destinasjon er irrelevant.
                </p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                <p className="font-bold text-green-700 dark:text-green-400 text-xs mb-1">d_prop = d/s (forplantningsforsinkelse)</p>
                <p className="text-xs text-[var(--muted)]">
                  <strong>d_prop</strong> = tid det tar for en bil A kj\u00f8re fra bomstasjonen
                  til destinasjonen (f.eks. Bergen til Oslo).
                  Avhenger av avstand og kjorehasigheten pA motorveien.
                  Antall biler (pakkelengde) er irrelevant.
                </p>
              </div>
            </div>
            <p className="text-[var(--muted)] text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded p-2">
              <strong>Viktig:</strong> d_trans og d_prop avhenger av HELT ULIKE parametere!
              d_trans: L og R (ingen avstand). d_prop: d og s (ingen pakkelengde eller kapasitet).
              Dette er den vanligste konfundereringen pA eksamen.
            </p>
          </div>
        )}
      </section>

      {/* Interaktiv kalkulator */}
      <section>
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400 mb-3">
          Interaktiv kalkulator
        </h2>
        <ForsinkelsesKalkulator />
      </section>

      {/* Eksamenseksempler */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Gjennomgatte eksempler
        </h2>

        {/* Eksempel 1: Fra forelesning */}
        <button
          onClick={() => setShowEksempel1(!showEksempel1)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Eksempel 1: Beregn nodalforsinkelse (fra forelesning)</span>
          <span>{showEksempel1 ? "▲" : "▼"}</span>
        </button>
        {showEksempel1 && (
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm space-y-3">
            <p className="font-bold">Gitt:</p>
            <ul className="list-disc list-inside ml-4 text-[var(--muted)] space-y-0.5">
              <li>R = 100 Mbps = 100 &times; 10&sup6; bps</li>
              <li>L = 10 000 bits</li>
              <li>d = 5 000 meter</li>
              <li>s = 2 &times; 10&#8308; m/s</li>
              <li>d_proc = 100 &micro;s = 0,0001 s</li>
              <li>d_queue = 20 ms = 0,020 s</li>
            </ul>

            <p className="font-bold">Beregning steg for steg:</p>

            <div className="space-y-2">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-blue-700 dark:text-blue-400">Steg 1: Sendingsforsinkelse</p>
                <p className="font-mono text-xs mt-1">d_trans = L/R = 10 000 / 100 000 000 = 0,0001 s = 0,1 ms</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-green-700 dark:text-green-400">Steg 2: Forplantningsforsinkelse</p>
                <p className="font-mono text-xs mt-1">d_prop = d/s = 5 000 / (2 &times; 10&#8308;) = 0,000025 s = 0,025 ms</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-purple-700 dark:text-purple-400">Steg 3: Total nodalforsinkelse</p>
                <p className="font-mono text-xs mt-1">d_nodal = 0,1 ms + 0,025 ms + 0,1 ms (proc) + 20 ms (queue)</p>
                <p className="font-mono text-xs">d_nodal = 20,225 ms</p>
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 p-2 text-xs">
              <strong>Observasjon:</strong> Koforsinkelsen (20 ms) dominerer fullstendig! Dette er typisk i virkelige nettverk under last.
            </div>
          </div>
        )}

        {/* Eksempel 2: Eksamen jan 2025, oppgave 3 */}
        <button
          onClick={() => setShowEksempel2(!showEksempel2)}
          className="w-full text-left px-4 py-3 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 flex items-center justify-between text-sm font-medium"
        >
          <span>Eksempel 2: Eksamen januar 2025, oppgave 3 (fullstendig losning)</span>
          <span>{showEksempel2 ? "▲" : "▼"}</span>
        </button>
        {showEksempel2 && (
          <div className="rounded-xl border-2 border-red-400/60 bg-red-50 dark:bg-red-950/20 p-4 text-sm space-y-4">
            <p className="font-bold text-red-700 dark:text-red-400">Oppgavetekst (eksamen 07.01.2025, oppgave 3):</p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 text-xs space-y-1">
              <p>Nettverk med rutere R1, R2 og tre verter H1, H2, H3.</p>
              <p>Link mellom R1 og R2:</p>
              <ul className="list-disc list-inside ml-4">
                <li>R = 1 000 000 = 10&sup6; bps</li>
                <li>d = 10 000 = 10&#8308; meter</li>
                <li>s = 5 &times; 10&#8308; m/s</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-bold">a) L = 1000 bits. Hva er sendingsforsinkelsen pA R1&rarr;R2?</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs">
                <p>d_trans = L/R = 1000 / 10&sup6; = 0,001 s = 1 ms</p>
              </div>

              <p className="font-bold">b) d_proc = 0,002 s, d_queue = 0,01 s. Beregn nodalforsinkelse ved R1.</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p>d_trans = L/R = 1000 / 10&sup6; = 0,001 s = 1 ms</p>
                <p>d_prop = d/s = 10 000 / (5 &times; 10&#8308;) = 0,00002 s = 0,02 ms</p>
                <p>d_nodal = d_proc + d_queue + d_trans + d_prop</p>
                <p>d_nodal = 0,002 + 0,01 + 0,001 + 0,00002</p>
                <p className="text-green-600 dark:text-green-400 font-bold">d_nodal = 0,01302 s = 13,02 ms</p>
              </div>

              <p className="font-bold">c) Ende-til-ende forsinkelse H1 &rarr; H3 (alle hopp like som R1, L=1000 bits).</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p className="text-[var(--muted)]">// Ruten H1 -&gt; R1 -&gt; R2 -&gt; H3 (3 hopp = 3 noder)</p>
                <p>d_e2e = 3 &times; d_nodal (siden alle hopp er like)</p>
                <p>d_e2e = 3 &times; 0,01302 = 0,03906 s = 39,06 ms</p>
                <p className="text-green-600 dark:text-green-400 font-bold">d_e2e &approx; 39,1 ms</p>
              </div>

              <p className="font-bold">d) Hvem er flaskehalsen? H1/H2&rarr;R1: 50 Mbps, R1&rarr;R2: 100 Mbps, R2&rarr;H3: 10 Mbps.</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p>Gjennomstromning = min(50 Mbps, 100 Mbps, 10 Mbps)</p>
                <p className="text-green-600 dark:text-green-400 font-bold">= 10 Mbps</p>
                <p className="text-[var(--muted)]">Flaskehalsen er R2&rarr;H3-linken (10 Mbps).</p>
              </div>
            </div>
          </div>
        )}

        {/* Eksempel 3: Store-and-forward */}
        <button
          onClick={() => setShowEksempel3(!showEksempel3)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Eksempel 3: Store-and-forward &mdash; maks pakker per sekund</span>
          <span>{showEksempel3 ? "▲" : "▼"}</span>
        </button>
        {showEksempel3 && (
          <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 text-sm space-y-3">
            <p className="font-bold">Fra forelesningsovelse:</p>
            <p>L = 4000 bits, R = 1 Mbps. Hva er maks antall pakker per sekund?</p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
              <p>d_trans per pakke = L/R = 4000 / 1 000 000 = 0,004 s</p>
              <p>Pakker per sekund = 1 / d_trans = 1 / 0,004</p>
              <p className="text-green-600 dark:text-green-400 font-bold">= 250 pakker/s</p>
            </div>
            <p className="text-[var(--muted)] text-xs">
              Generell formel: maks pakker/s = R/L. Dette er linjekapasiteten delt pA pakkelengden.
            </p>
          </div>
        )}

        {/* Eksempel 4: Gjennomstromning med delt link */}
        <button
          onClick={() => setShowEksempel4(!showEksempel4)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Eksempel 4: Gjennomstromning med delt flaskehalsnett (eksamen mai 2024)</span>
          <span>{showEksempel4 ? "▲" : "▼"}</span>
        </button>
        {showEksempel4 && (
          <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm space-y-3">
            <p className="font-bold">Fra eksamen mai 2024 (og gjentatt i 2025-formatet):</p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 text-xs">
              <p>4 servere (S1-S4) &rarr; R1 &rarr; R2 &rarr; 4 klienter (C1-C4)</p>
              <p>R_S = 80 Mbps (server-linker), R = 100 Mbps (delt R1-R2), R_C = 40 Mbps (klient-linker)</p>
            </div>

            <div className="space-y-2">
              <p className="font-bold">a) Maks ende-til-ende gjennomstromning:</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p className="text-[var(--muted)]">// Delt midtlink: R/4 = 100/4 = 25 Mbps per tilkobling</p>
                <p>Gjennomstromning per par = min(R_S, R/4, R_C)</p>
                <p>= min(80 Mbps, 25 Mbps, 40 Mbps)</p>
                <p className="text-green-600 dark:text-green-400 font-bold">= 25 Mbps per tilkobling</p>
              </div>

              <p className="font-bold">b) Flaskehalsen:</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs">
                <p className="text-green-600 dark:text-green-400 font-bold">Midtlinken R1-R2 (25 Mbps per forbindelse)</p>
              </div>

              <p className="font-bold">c) Linkutnyttelse for serverlinker (R_S):</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p>Serverne sender med maks gjennomstromning = 25 Mbps</p>
                <p>Utnyttelse = 25 / 80 = 0,3125 &approx; 31,25%</p>
              </div>

              <p className="font-bold">d) Linkutnyttelse for klientlinker (R_C):</p>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs space-y-0.5">
                <p>Klientene mottar med maks gjennomstromning = 25 Mbps</p>
                <p>Utnyttelse = 25 / 40 = 0,625 = 62,5%</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Trafikkintensitet */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Trafikkintensitet og koforsinkelse
        </h2>

        <FormulaBox
          latex="\text{Trafikkintensitet} = \frac{La}{R}"
          title="Trafikkintensitet"
          variant="gold"
          description="L = gjennomsnittlig pakkelengde (bits), a = gjennomsnittlig ankomstrate (pakker/s), R = linjekapasitet (bps)"
        />

        <TrafikkintensitetVis />
      </section>

      {/* Gjennomstromning */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Gjennomstromning og flaskehals
        </h2>

        <FormulaBox
          latex="\text{Gjennomstromning} = \min(R_1, R_2, \ldots, R_N)"
          title="Ende-til-ende gjennomstromning"
          variant="blue"
          description="Gjennomstromningen begrenses av den smaleste linken pA hele stien (flaskehalsen)."
        />

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm space-y-3">
          <h3 className="font-bold text-blue-700 dark:text-blue-400">Delt flaskehalsnett</h3>
          <p className="text-[var(--muted)]">
            NAt N tilkoblinger deler en flaskehalsnett med kapasitet R, fAr hver tilkobling R/N
            (forutsatt rettferdig deling). Dette er kjernen i eksamensoppgave 3b-d.
          </p>
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs">
            <p>N tilkoblinger deler link R bps</p>
            <p>Gjennomstromning per tilkobling = min(R_s, R/N, R_c)</p>
          </div>
          <p className="text-[var(--muted)] text-xs">
            I praksis er flaskehalsen oftest enten server-linken (R_s) eller klient-linken (R_c),
            IKKE kjernenettet (R), fordi kjernenettet typisk har mye storre kapasitet.
            Se eksempel 4 over for detaljert regning.
          </p>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
          Vanlige feil pA eksamen
        </h2>
        <div className="space-y-2">
          {[
            {
              feil: "Blander d_trans og d_prop",
              losning: "d_trans = L/R avhenger av pakkelengde og kapasitet, IKKE avstand. d_prop = d/s avhenger av avstand, IKKE pakkelengde eller kapasitet.",
            },
            {
              feil: "Glemmer at alle bits mA sendes for sendingsforsinkelsen er ferdig",
              losning: "d_trans er tiden for A pumpe ALLE L bits ut pA linken. Det er ikke tid til forste bit, men tid til siste bit.",
            },
            {
              feil: "Multipliserer bare d_trans med N hopp og glemmer d_prop",
              losning: "Ende-til-ende forsinkelse inkluderer ALLE fire typer for HVERT hopp: d_e2e = sum over alle noder av (d_proc + d_queue + d_trans + d_prop).",
            },
            {
              feil: "Glemmer A dele midtlink pA N tilkoblinger",
              losning: "NAr N tilkoblinger deler et felles linksegment, fAr hver forbindelse kun R/N av kapasiteten.",
            },
            {
              feil: "Glemmer enhetskonvertering",
              losning: "Sjekk alltid at L er i bits (ikke bytes!), R er i bps, d er i meter. 1 byte = 8 bits. 1 Mbps = 10\u2076 bps.",
            },
          ].map(({ feil, losning }) => (
            <div key={feil} className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 text-sm">
              <p className="font-bold text-red-700 dark:text-red-400">&#9747; Feil: {feil}</p>
              <p className="text-[var(--muted)] mt-1">&#10003; Riktig: {losning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Oppgave 3 er alltid forsinkelse/gjennomstromning. Typisk struktur: a) beregn d_trans,
          b) beregn nodalforsinkelse, c) beregn ende-til-ende, d) finn flaskehals/gjennomstromning.
          Skriv alltid alle mellomregninger. Feil i del a) bor ikke spre seg til b)-d) hvis du
          bruker riktig metode. Se ogsa: <Link href="/dat110/eksamenoving" className="underline text-amber-700 dark:text-amber-400 hover:text-amber-600">Eksamensovingsseksjon</Link>.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori/1-3"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          &larr; 1.3 Nettverkskjernen
        </Link>
        <Link
          href="/dat110/cn-1/teori/1-5"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          1.5 Protokolllag &rarr;
        </Link>
      </div>
    </div>
  );
}
