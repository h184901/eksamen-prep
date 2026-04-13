"use client";

import Link from "next/link";
import { useState } from "react";

function Card({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>
      {children}
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-2 font-mono text-sm text-blue-800 dark:text-blue-300 my-2">
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
      <span className="font-bold">Tips: </span>{children}
    </div>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return !show
    ? <button onClick={() => setShow(true)} className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 mt-2">Vis svar</button>
    : <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-3 text-sm mt-2">{children}</div>;
}

/* Chord Finger Table Calculator */
function ChordCalculator() {
  const [m, setM] = useState(5);
  const [serversInput, setServersInput] = useState("1,5,10,15,20,29");
  const [showLookup, setShowLookup] = useState(false);
  const [lookupFrom, setLookupFrom] = useState(1);
  const [lookupKey, setLookupKey] = useState(18);

  const maxAddr = Math.pow(2, m);

  // Parse servers
  const servers = serversInput
    .split(",")
    .map(s => parseInt(s.trim()))
    .filter(s => !isNaN(s) && s >= 0 && s < maxAddr)
    .sort((a, b) => a - b);

  // Find successor
  function findSucc(id: number, nodes: number[]): number {
    const modId = ((id % maxAddr) + maxAddr) % maxAddr;
    for (const n of nodes) {
      if (n >= modId) return n;
    }
    return nodes[0]; // wrap
  }

  // Build finger table
  function buildFT(node: number) {
    const table: { i: number; start: number; succ: number }[] = [];
    for (let i = 1; i <= m; i++) {
      const start = (node + Math.pow(2, i - 1)) % maxAddr;
      const succ = findSucc(start, servers);
      table.push({ i, start, succ });
    }
    return table;
  }

  // Key responsibility
  function getResponsible(key: number): number {
    const modKey = ((key % maxAddr) + maxAddr) % maxAddr;
    return findSucc(modKey, servers);
  }

  // Lookup simulation
  function lookup(from: number, key: number): { node: number; reason: string }[] {
    const steps: { node: number; reason: string }[] = [];
    let current = from;
    const visited = new Set<number>();

    for (let iter = 0; iter < m + 2; iter++) {
      if (visited.has(current)) break;
      visited.add(current);
      steps.push({ node: current, reason: `Sjekker node ${current}` });

      const succ = findSucc(current + 1, servers);

      // Check if key is between current and successor (clockwise)
      const inRange = current < succ
        ? key > current && key <= succ
        : key > current || key <= succ;

      if (inRange) {
        steps.push({ node: succ, reason: `succ(${current})=${succ}, ${current}<${key}≤${succ} → FUNNET!` });
        return steps;
      }

      // Find highest predecessor in finger table
      const ft = buildFT(current);
      let best = -1;
      let bestNode = current;

      for (const entry of ft) {
        const fn = entry.succ;
        // fn is in (current, key) clockwise?
        const inRange2 = current < key
          ? fn > current && fn < key
          : fn > current || fn < key;

        if (inRange2 && entry.i > best) {
          best = entry.i;
          bestNode = fn;
        }
      }

      if (bestNode === current) {
        steps.push({ node: succ, reason: `Ingen bedre finger, bruker succ=${succ}` });
        return steps;
      }

      steps.push({ node: bestNode, reason: `Høyeste finger <${key}: FT[${best}]=${bestNode} → hopper til ${bestNode}` });
      current = bestNode;
    }

    return steps;
  }

  const allFTs = servers.map(s => ({ server: s, ft: buildFT(s) }));
  const lookupSteps = showLookup ? lookup(lookupFrom, lookupKey) : [];

  return (
    <div className="space-y-4">
      {/* Config */}
      <div className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-3">Konfigurer Chord-ringen</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">m (bits, adresserom 2^m = {maxAddr})</label>
            <input
              type="range" min={3} max={6} value={m}
              onChange={e => setM(Number(e.target.value))}
              className="w-full accent-network-500"
            />
            <span className="font-mono text-sm">m={m}, adresser 0–{maxAddr - 1}</span>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Servere (kommaseparert)</label>
            <input
              type="text" value={serversInput}
              onChange={e => setServersInput(e.target.value)}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono"
            />
            <span className="text-xs text-[var(--muted)]">Gyldige servere: {servers.join(", ")}</span>
          </div>
        </div>

        {/* Ring visualization */}
        <div className="flex justify-center mb-2">
          <svg viewBox="-120 -120 240 240" className="w-64 h-64">
            <circle cx="0" cy="0" r="90" fill="none" stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-700" />
            {Array.from({ length: maxAddr }, (_, i) => {
              const angle = (i / maxAddr) * 2 * Math.PI - Math.PI / 2;
              const x = 90 * Math.cos(angle);
              const y = 90 * Math.sin(angle);
              const isServer = servers.includes(i);
              return (
                <g key={i}>
                  {isServer && (
                    <>
                      <circle cx={x} cy={y} r={6} fill="var(--network-500, #3b82f6)" />
                      <text
                        x={x * 1.25} y={y * 1.25 + 3}
                        textAnchor="middle"
                        fontSize="9"
                        fill="currentColor"
                        className="text-[var(--foreground)]"
                      >
                        {i}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Finger tables */}
      <div className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-3">Fingertabeller</h3>
        <p className="text-sm text-[var(--muted)] mb-3">
          FT[i] = succ((server + 2^(i-1)) mod {maxAddr})
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[var(--card-border)] rounded-lg overflow-hidden">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-2 py-2 text-left">Server</th>
                {Array.from({ length: m }, (_, i) => (
                  <th key={i} className="px-2 py-2 text-center">i={i+1} (+{Math.pow(2,i)})</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFTs.map(({ server, ft }, si) => (
                <tr key={server} className={si % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-2 py-2 font-bold text-network-600 dark:text-network-400">{server}</td>
                  {ft.map(({ i, start, succ }) => (
                    <td key={i} className="px-2 py-2 text-center">
                      <span className="text-[var(--muted)]">succ({start})=</span>
                      <span className="font-bold">{succ}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key responsibility */}
      <div className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-3">Nøkkelansvar</h3>
        <p className="text-sm text-[var(--muted)] mb-2">pred(server) &lt; nøkkel ≤ server (sirkulært)</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {Array.from({ length: maxAddr }, (_, k) => {
            const responsible = getResponsible(k);
            const isServer = servers.includes(k);
            return (
              <div
                key={k}
                className={`rounded-lg text-center py-2 text-xs ${
                  isServer
                    ? "bg-network-500 text-white font-bold"
                    : "bg-neutral-100 dark:bg-neutral-800"
                }`}
              >
                <p>{k}</p>
                <p className={`text-xs ${isServer ? "text-network-100" : "text-[var(--muted)]"}`}>→{responsible}</p>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">Blå = server. Grå tall viser ansvarlig server for hver nøkkel.</p>
      </div>

      {/* Lookup simulator */}
      <div className="rounded-xl border-2 border-red-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-3">Nøkkeloppslag-simulator</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">Start fra server</label>
            <select
              value={lookupFrom}
              onChange={e => { setLookupFrom(Number(e.target.value)); setShowLookup(false); }}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm"
            >
              {servers.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Nøkkel å finne</label>
            <input
              type="number" min={0} max={maxAddr - 1} value={lookupKey}
              onChange={e => { setLookupKey(Number(e.target.value)); setShowLookup(false); }}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono"
            />
          </div>
        </div>
        <button
          onClick={() => setShowLookup(true)}
          className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
        >
          Kjør oppslag
        </button>

        {showLookup && (
          <div className="mt-4 space-y-2">
            {lookupSteps.map((step, i) => {
              const isFinal = step.reason.includes("FUNNET");
              return (
                <div
                  key={i}
                  className={`rounded-lg px-4 py-2 text-sm flex items-center gap-3 ${
                    isFinal
                      ? "bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-400"
                      : i === 0
                        ? "bg-network-100 dark:bg-network-950/30 border border-network-400"
                        : "bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700"
                  }`}
                >
                  <span className={`font-mono font-bold text-lg min-w-[32px] text-center ${isFinal ? "text-emerald-700 dark:text-emerald-400" : "text-network-600 dark:text-network-400"}`}>
                    {step.node}
                  </span>
                  <span className="text-[var(--muted)] text-xs">{step.reason}</span>
                </div>
              );
            })}
            <p className="text-xs text-[var(--muted)]">
              Ansvarlig server (direkte): <strong>{getResponsible(lookupKey)}</strong>.
              {`O(log ${servers.length}) = O(${Math.ceil(Math.log2(servers.length || 1))}) hopp forventes.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChordPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span>DHT og Chord</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">DHT og Chord</h1>
      <p className="text-[var(--muted)] mb-8">Distribuert hash-tabell, Chord-ringen, fingertabeller, nøkkelansvar og O(log N) oppslag — alltid 15% av eksamen</p>

      {/* Teori */}
      <h2 className="text-xl font-bold mb-4">1. Hva er DHT?</h2>

      <Card color="gold">
        <h3 className="font-bold mb-2">Distribuert Hash-tabell — intuisjonen</h3>
        <p className="text-sm">En DHT er et <strong>skalerbart, distribuert lagrings- og oppslagssystem</strong>. Tenk på det som en Google-oversetter som er spredt over tusenvis av datamaskiner uten noen sentral koordinator.</p>
        <div className="mt-2 space-y-1 text-sm">
          <p>Nøkler → hash → ID i ring → lagres på serveren med nærmeste ID</p>
          <p>Chord er en spesifikk DHT med <strong>ring-topologi</strong></p>
        </div>
      </Card>

      <Card color="blue">
        <h3 className="font-bold mb-3">Grunnleggende Chord-konsepter</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3">
            <span className="font-bold text-blue-700 dark:text-blue-400 min-w-[140px]">Adresserom</span>
            <span>2^m identifikatorer (0 til 2^m - 1). m = antall bits.</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-700 dark:text-blue-400 min-w-[140px]">Successor succ(k)</span>
            <span>Den serveren med minste ID ≥ k (sirkulært)</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-700 dark:text-blue-400 min-w-[140px]">Nøkkelansvar</span>
            <span>Nøkkel k tilhører server s hvis pred(s) &lt; k ≤ s</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-700 dark:text-blue-400 min-w-[140px]">Fingertabell</span>
            <span>m oppslag: FT[i] = succ(n + 2^(i-1)) — gir O(log N) søk</span>
          </div>
        </div>
      </Card>

      <h2 className="text-xl font-bold mb-4 mt-8">2. Fingertabell — formel og beregning</h2>

      <Card color="gold">
        <h3 className="font-bold mb-2">Fremgangsmåte for fingertabell (eksamen)</h3>
        <Formula>FT_n[i] = succ((n + 2^(i-1)) mod 2^m)   for i = 1, 2, ..., m</Formula>
        <div className="text-sm space-y-2 mt-2">
          <p><strong>Eksempel:</strong> m=5, servere=[1,5,10,15,20,29], n=1</p>
          <div className="overflow-x-auto">
            <table className="text-xs font-mono border border-amber-200 dark:border-amber-800 rounded-lg overflow-hidden">
              <thead className="bg-amber-100 dark:bg-amber-900/30">
                <tr>
                  <th className="px-2 py-1">i</th>
                  <th className="px-2 py-1">n+2^(i-1)</th>
                  <th className="px-2 py-1">mod 32</th>
                  <th className="px-2 py-1">succ()</th>
                </tr>
              </thead>
              <tbody>
                {[[1,1+1,2,5],[2,1+2,3,5],[3,1+4,5,5],[4,1+8,9,10],[5,1+16,17,20]].map(([i,raw,mod,succ]) => (
                  <tr key={i} className="border-t border-amber-200 dark:border-amber-800">
                    <td className="px-2 py-1">{i}</td>
                    <td className="px-2 py-1">1+{Math.pow(2,i-1)}={raw}</td>
                    <td className="px-2 py-1">{mod}</td>
                    <td className="px-2 py-1 font-bold text-network-600 dark:text-network-400">{succ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>FT_1 = [5, 5, 5, 10, 20]</p>
        </div>
      </Card>

      <h2 className="text-xl font-bold mb-4 mt-8">3. Oppslagsalgoritmen — runde for runde</h2>

      <Card color="blue">
        <h3 className="font-bold mb-2">Algoritme (pseudokode)</h3>
        <div className="text-sm space-y-1">
          <p className="font-mono">n.findSuccessor(key):</p>
          <p className="font-mono ml-4">if key in (n, successor(n)]:</p>
          <p className="font-mono ml-8">return successor(n)  ← FUNNET</p>
          <p className="font-mono ml-4">else:</p>
          <p className="font-mono ml-8">p = closestPrecedingNode(key)</p>
          <p className="font-mono ml-8">return p.findSuccessor(key)  ← HOPP</p>
          <p className="font-mono mt-2">closestPrecedingNode(key):</p>
          <p className="font-mono ml-4">for i = m downTo 1:</p>
          <p className="font-mono ml-8">if FT[i] in (n, key):</p>
          <p className="font-mono ml-12">return FT[i]  ← høyeste finger &lt; key</p>
          <p className="font-mono ml-4">return n</p>
        </div>
      </Card>

      <div className="rounded-xl border-2 border-red-400/40 bg-[var(--card)] p-5 my-4">
        <h3 className="font-bold mb-3">Eksempel: Finn nøkkel=18 fra server 1 (m=5, servere=1,5,10,15,20,29)</h3>
        <div className="space-y-2 text-sm">
          {[
            {
              runde: "Runde 1 (n=1)",
              check: "succ(1)=5. Er 1 < 18 ≤ 5? Nei.",
              action: "Søk i FT_1 baklengs: FT[5]=20 (1<20<18? Nei). FT[4]=10 (1<10<18? Ja!) → hopp til 10",
              highlight: "→ Hopper til 10",
            },
            {
              runde: "Runde 2 (n=10)",
              check: "succ(10)=15. Er 10 < 18 ≤ 15? Nei.",
              action: "Søk FT_10 baklengs: FT[5]=29 (10<29<18? Nei). FT[4]=20 (10<20<18? Nei). FT[3]=15 (10<15<18? Ja!) → hopp til 15",
              highlight: "→ Hopper til 15",
            },
            {
              runde: "Runde 3 (n=15)",
              check: "succ(15)=20. Er 15 < 18 ≤ 20? JA!",
              action: "Returnerer 20",
              highlight: "→ SVAR: Server 20 er ansvarlig for nøkkel 18",
              isFinal: true,
            },
          ].map(({ runde, check, action, highlight, isFinal }) => (
            <div key={runde} className={`rounded-lg p-3 border ${isFinal ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400" : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"}`}>
              <p className={`font-bold mb-1 ${isFinal ? "text-emerald-700 dark:text-emerald-400" : "text-network-600 dark:text-network-400"}`}>{runde}</p>
              <p className="text-xs text-[var(--muted)]">{check}</p>
              <p className="text-xs text-[var(--muted)]">{action}</p>
              <p className={`text-xs font-bold mt-1 ${isFinal ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 mt-8">4. Interaktiv Chord-kalkulator</h2>
      <p className="text-sm text-[var(--muted)] mb-4">Konfigurer din egen Chord-ring og se fingertabeller, nøkkelansvar og oppslag beregnet automatisk!</p>

      <ChordCalculator />

      <h2 className="text-xl font-bold mb-4 mt-8">5. Oppsummering — hva sensoren forventer</h2>

      <Card color="gold">
        <h3 className="font-bold mb-3">Eksamen Chord-oppgave — alltid 15%</h3>
        <div className="space-y-2 text-sm">
          <div>
            <p className="font-bold">a) Fingertabeller for alle servere:</p>
            <p className="text-xs text-[var(--muted)]">Vis utregningen: n, n+2^(i-1), mod 2^m, succ() = svar. Gjør dette for hvert i fra 1 til m, for hver server.</p>
          </div>
          <div>
            <p className="font-bold">b) Nøkkelansvar:</p>
            <p className="text-xs text-[var(--muted)]">Regel: pred(server) &lt; nøkkel ≤ server. List hvilken server er ansvarlig for hver gitt nøkkel.</p>
          </div>
          <div>
            <p className="font-bold">c) Nøkkeloppslag — runde for runde:</p>
            <p className="text-xs text-[var(--muted)]">Vis ALLE steg. For hvert steg: (1) Sjekk succ(n), (2) Søk FT baklengs etter høyeste finger &lt; nøkkel, (3) Hopp eller returner.</p>
          </div>
          <div>
            <p className="font-bold">d/e) Replikering og fingertabellens formål:</p>
            <p className="text-xs text-[var(--muted)]">Replikering: feiltoleranse, skalerbarhet, ytelse, tilgjengelighet. Fingertabell: O(log N) søketid.</p>
          </div>
        </div>
      </Card>

      <Tip>Chord er alltid 15% av eksamen og alltid lik struktur. Øv fingertabell-beregning til det er automatisk. En feil i fingertabellen kan feilkaskade gjennom b) og c)!</Tip>

      {/* Øvingsoppgaver */}
      <h2 className="text-xl font-bold mb-4 mt-8">6. Øvingsoppgaver</h2>

      <div className="space-y-4">
        {[
          {
            q: "Chord-ring: m=4 bits, servere: 1, 6, 11, 15. Bygg fingertabell for server 6.",
            a: (
              <div>
                <p>Adresserom: 0–15 (2^4=16). succ((6+2^(i-1)) mod 16):</p>
                <p>i=1: succ(7)=11</p>
                <p>i=2: succ(8)=11</p>
                <p>i=3: succ(10)=11</p>
                <p>i=4: succ(14)=15</p>
                <p className="font-bold mt-1">FT_6 = [11, 11, 11, 15]</p>
              </div>
            ),
          },
          {
            q: "Chord-ring: m=5 bits, servere: 3, 12, 21, 31. Hvilken server er ansvarlig for nøklene 0, 4, 13, 22, 31?",
            a: (
              <div>
                <p>Regel: finn server s slik at pred(s) &lt; nøkkel ≤ s (sirkulært, pred(3)=31).</p>
                <p>0: 31 &lt; 0 ≤ 3 (sirkulært) → Server 3</p>
                <p>4: 3 &lt; 4 ≤ 12 → Server 12</p>
                <p>13: 12 &lt; 13 ≤ 21 → Server 21</p>
                <p>22: 21 &lt; 22 ≤ 31 → Server 31</p>
                <p>31: 21 &lt; 31 ≤ 31 → Server 31</p>
              </div>
            ),
          },
          {
            q: "Chord m=5, servere: 3, 12, 21, 31. Utfør oppslag for nøkkel 15 fra server 3. Vis alle runder.",
            a: (
              <div>
                <p><strong>FT_3:</strong> FT[1]=12, FT[2]=12, FT[3]=12, FT[4]=12, FT[5]=succ(19)=21</p>
                <p className="mt-1"><strong>Runde 1 (n=3):</strong> succ=12. 3&lt;15≤12? Nei. Søk FT baklengs: FT[5]=21 (3&lt;21&lt;15? Nei). FT[4]=12 (3&lt;12&lt;15? Ja!) → hopp til 12</p>
                <p className="mt-1"><strong>Runde 2 (n=12):</strong> succ=21. 12&lt;15≤21? Ja! → <strong>Server 21 er ansvarlig</strong></p>
                <p className="text-xs text-[var(--muted)] mt-1">2 runder. O(log 4) ≈ 2 hopp forventet.</p>
              </div>
            ),
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-2">Oppgave {i + 1}</p>
            <p className="text-sm text-[var(--muted)] mb-3">{q}</p>
            <Answer>{a}</Answer>
          </div>
        ))}
      </div>
    </div>
  );
}
