"use client";

import Link from "next/link";
import { useState } from "react";

/* ────────────────────────────────────────────────────────────
   Chord Calculator — migrated and enhanced from /dat110/chord/
   ──────────────────────────────────────────────────────────── */
function ChordCalculator() {
  const [m, setM] = useState(5);
  const [serversInput, setServersInput] = useState("1,5,17,19,25");
  const [showLookup, setShowLookup] = useState(false);
  const [lookupFrom, setLookupFrom] = useState(1);
  const [lookupKey, setLookupKey] = useState(23);
  const [highlightNode, setHighlightNode] = useState<number | null>(null);

  const maxAddr = Math.pow(2, m);

  // Parse servers
  const servers = serversInput
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((s) => !isNaN(s) && s >= 0 && s < maxAddr)
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

  // Lookup simulation (professor's algorithm: check succ first, then FT backwards)
  function lookup(from: number, key: number): { node: number; reason: string; isFinal: boolean }[] {
    const steps: { node: number; reason: string; isFinal: boolean }[] = [];
    let current = from;
    const visited = new Set<number>();

    steps.push({ node: current, reason: `Start fra node ${current}`, isFinal: false });

    for (let iter = 0; iter < m + 3; iter++) {
      if (visited.has(current)) break;
      visited.add(current);

      const succ = findSucc(current + 1, servers);

      // Check if key is between current and successor (clockwise, exclusive current, inclusive succ)
      const inRange =
        current < succ
          ? key > current && key <= succ
          : key > current || key <= succ;

      if (inRange) {
        steps.push({
          node: succ,
          reason: `n=${current}: ${current} < ${key} ≤ succ(${current})=${succ} → FUNNET! Ansvarlig: ${succ}`,
          isFinal: true,
        });
        return steps;
      }

      // Find highest predecessor in finger table (backwards)
      const ft = buildFT(current);
      let bestIdx = -1;
      let bestNode = -1;

      for (const entry of ft) {
        const fn = entry.succ;
        // fn is in (current, key) clockwise (exclusive both ends)?
        const inRange2 =
          current < key
            ? fn > current && fn < key
            : fn > current || fn < key;

        if (inRange2 && entry.i > bestIdx) {
          bestIdx = entry.i;
          bestNode = fn;
        }
      }

      if (bestNode === -1 || bestNode === current) {
        // No better finger found — use succ
        steps.push({
          node: succ,
          reason: `n=${current}: ingen bedre finger funnet, bruker succ=${succ}`,
          isFinal: false,
        });
        current = succ;
      } else {
        steps.push({
          node: bestNode,
          reason: `n=${current}: høyeste finger < ${key} er FT[${bestIdx}]=${bestNode} → hopper`,
          isFinal: false,
        });
        current = bestNode;
      }
    }

    return steps;
  }

  const allFTs = servers.map((s) => ({ server: s, ft: buildFT(s) }));
  const lookupSteps = showLookup ? lookup(lookupFrom, lookupKey) : [];
  const finalAnswer = lookupSteps.find((s) => s.isFinal);

  return (
    <div className="space-y-5">
      {/* ── Config ── */}
      <div className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-4 text-lg">Konfigurer Chord-ringen</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="text-sm font-medium block mb-1">
              m = {m} bits (adresserom: 2^{m} = {maxAddr} posisjoner, 0–{maxAddr - 1})
            </label>
            <input
              type="range"
              min={3}
              max={6}
              value={m}
              onChange={(e) => { setM(Number(e.target.value)); setShowLookup(false); }}
              className="w-full accent-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Servere (kommaseparert)</label>
            <input
              type="text"
              value={serversInput}
              onChange={(e) => { setServersInput(e.target.value); setShowLookup(false); }}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono"
            />
            <span className="text-xs text-[var(--muted)]">Gyldige: {servers.join(", ")}</span>
          </div>
        </div>

        {/* Ring visualization */}
        <div className="flex justify-center">
          <svg viewBox="-130 -130 260 260" className="w-72 h-72">
            {/* Ring */}
            <circle cx="0" cy="0" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300 dark:text-neutral-700" />

            {/* Tick marks for servers */}
            {servers.map((id) => {
              const angle = (id / maxAddr) * 2 * Math.PI - Math.PI / 2;
              const x1 = 97 * Math.cos(angle);
              const y1 = 97 * Math.sin(angle);
              const x2 = 103 * Math.cos(angle);
              const y2 = 103 * Math.sin(angle);
              return (
                <line key={id} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="currentColor" strokeWidth="2" className="text-blue-500" />
              );
            })}

            {/* Lookup path arrows */}
            {showLookup && lookupSteps.length > 1 &&
              lookupSteps.slice(0, -1).map((step, i) => {
                const next = lookupSteps[i + 1];
                const a1 = (step.node / maxAddr) * 2 * Math.PI - Math.PI / 2;
                const a2 = (next.node / maxAddr) * 2 * Math.PI - Math.PI / 2;
                const x1 = 100 * Math.cos(a1);
                const y1 = 100 * Math.sin(a1);
                const x2 = 100 * Math.cos(a2);
                const y2 = 100 * Math.sin(a2);
                const color = next.isFinal ? "#10b981" : "#3b82f6";
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={color} strokeWidth="2" strokeDasharray="4,2"
                    markerEnd="url(#arrowhead)" opacity="0.8" />
                );
              })
            }

            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#3b82f6" />
              </marker>
            </defs>

            {/* Key position */}
            {showLookup && (() => {
              const angle = (lookupKey / maxAddr) * 2 * Math.PI - Math.PI / 2;
              const x = 115 * Math.cos(angle);
              const y = 115 * Math.sin(angle);
              return (
                <g>
                  <circle cx={100 * Math.cos(angle)} cy={100 * Math.sin(angle)} r="5"
                    fill="#f59e0b" opacity="0.8" />
                  <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="bold">
                    k={lookupKey}
                  </text>
                </g>
              );
            })()}

            {/* Server nodes */}
            {Array.from({ length: maxAddr }, (_, i) => {
              const angle = (i / maxAddr) * 2 * Math.PI - Math.PI / 2;
              const x = 100 * Math.cos(angle);
              const y = 100 * Math.sin(angle);
              const isServer = servers.includes(i);
              const isStart = showLookup && i === lookupFrom;
              const isFinalNode = finalAnswer && i === finalAnswer.node;
              const isInPath = showLookup && lookupSteps.some((s) => s.node === i);

              if (!isServer) return null;

              return (
                <g key={i}
                  className="cursor-pointer"
                  onClick={() => setHighlightNode(highlightNode === i ? null : i)}
                >
                  <circle
                    cx={x} cy={y} r={isFinalNode ? 9 : isStart ? 8 : 7}
                    fill={
                      isFinalNode ? "#10b981"
                        : isStart ? "#f59e0b"
                          : isInPath ? "#6366f1"
                            : "#3b82f6"
                    }
                    stroke={highlightNode === i ? "white" : "none"}
                    strokeWidth="2"
                  />
                  <text
                    x={x * 1.28} y={y * 1.28 + 3}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill="currentColor"
                    className="text-[var(--foreground)]"
                  >
                    {i}
                  </text>
                </g>
              );
            })}

            {/* Center label */}
            <text x="0" y="4" textAnchor="middle" fontSize="10" fill="currentColor"
              className="text-[var(--muted)]">m={m}</text>
          </svg>
        </div>

        <div className="flex gap-4 justify-center text-xs text-[var(--muted)] mt-1">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> Server</span>
          {showLookup && <><span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-amber-400"></span> Start</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span> Svar</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-indigo-500"></span> På ruten</span></>}
        </div>
      </div>

      {/* ── Finger Tables ── */}
      <div className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-1 text-lg">Fingertabeller</h3>
        <p className="text-sm text-[var(--muted)] mb-3 font-mono">
          FT[i] = succ((server + 2^(i-1)) mod {maxAddr})
        </p>
        {servers.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Ingen gyldige servere. Sjekk input.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-[var(--card-border)] rounded-lg overflow-hidden">
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-2 py-2 text-left sticky left-0 bg-neutral-100 dark:bg-neutral-800">Server</th>
                  {Array.from({ length: m }, (_, i) => (
                    <th key={i} className="px-2 py-2 text-center whitespace-nowrap">
                      i={i + 1} (+{Math.pow(2, i)})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFTs.map(({ server, ft }, si) => (
                  <tr
                    key={server}
                    className={`${si % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"} cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10`}
                    onClick={() => setHighlightNode(highlightNode === server ? null : server)}
                  >
                    <td className="px-2 py-2 font-bold text-blue-600 dark:text-blue-400 sticky left-0 bg-inherit">{server}</td>
                    {ft.map(({ i, start, succ }) => (
                      <td key={i} className="px-2 py-2 text-center whitespace-nowrap">
                        <span className="text-[var(--muted)]">succ({start})=</span>
                        <span className="font-bold">{succ}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Key Responsibility ── */}
      <div className="rounded-xl border-2 border-amber-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-1 text-lg">Nøkkelansvar</h3>
        <p className="text-sm text-[var(--muted)] mb-3">pred(server) {"<"} nøkkel ≤ server (sirkulært)</p>
        {servers.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Ingen gyldige servere.</p>
        ) : (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-1.5">
              {Array.from({ length: maxAddr }, (_, k) => {
                const responsible = getResponsible(k);
                const isServer = servers.includes(k);
                const isLookupKey = showLookup && k === lookupKey;
                return (
                  <div
                    key={k}
                    className={`rounded-lg text-center py-1.5 text-xs border transition-colors ${
                      isLookupKey
                        ? "bg-amber-400 text-white font-bold border-amber-500"
                        : isServer
                          ? "bg-blue-500 text-white font-bold border-blue-600"
                          : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    <p className="font-bold">{k}</p>
                    <p className={`text-xs ${isServer || isLookupKey ? "opacity-80" : "text-[var(--muted)]"}`}>
                      →{responsible}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              Blå = server (ansvarlig for nøkler i sin region). Grå = nøkkel (pil viser ansvarlig server).
              {showLookup && ` Gul = søkt nøkkel k=${lookupKey}.`}
            </p>
          </>
        )}
      </div>

      {/* ── Lookup Simulator ── */}
      <div className="rounded-xl border-2 border-emerald-400/40 bg-[var(--card)] p-5">
        <h3 className="font-bold mb-3 text-lg">Nøkkeloppslag-simulator</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">Start fra server</label>
            <select
              value={lookupFrom}
              onChange={(e) => { setLookupFrom(Number(e.target.value)); setShowLookup(false); }}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm"
            >
              {servers.map((s) => (
                <option key={s} value={s}>
                  Node {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Nøkkel å finne (0–{maxAddr - 1})</label>
            <input
              type="number"
              min={0}
              max={maxAddr - 1}
              value={lookupKey}
              onChange={(e) => { setLookupKey(Number(e.target.value)); setShowLookup(false); }}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-mono"
            />
          </div>
        </div>
        <button
          onClick={() => setShowLookup(true)}
          className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors"
        >
          Kjør oppslag
        </button>

        {showLookup && (
          <div className="mt-5 space-y-2">
            <p className="text-sm font-medium mb-3">
              Oppslagsruter for k={lookupKey} fra node {lookupFrom}:
            </p>
            {lookupSteps.map((step, i) => {
              const isFinal = step.isFinal;
              const isStart = i === 0;
              return (
                <div
                  key={i}
                  className={`rounded-lg px-4 py-2.5 text-sm flex items-start gap-3 ${
                    isFinal
                      ? "bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-400"
                      : isStart
                        ? "bg-amber-50 dark:bg-amber-950/20 border border-amber-400"
                        : "bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700"
                  }`}
                >
                  <span
                    className={`font-mono font-bold text-lg min-w-[40px] text-center rounded-lg ${
                      isFinal
                        ? "text-emerald-700 dark:text-emerald-400"
                        : isStart
                          ? "text-amber-700 dark:text-amber-400"
                          : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {i + 1}.
                  </span>
                  <div>
                    <span className="font-bold font-mono text-base">n={step.node}</span>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{step.reason}</p>
                  </div>
                </div>
              );
            })}

            {finalAnswer && (
              <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-400 px-4 py-3">
                <p className="font-bold text-emerald-700 dark:text-emerald-400">
                  Ansvarlig server: {finalAnswer.node}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Direkte: succ({lookupKey}) = {getResponsible(lookupKey)}.
                  Antall hopp: {lookupSteps.length - 1}.
                  Forventet O(log {servers.length}) ≈ {Math.ceil(Math.log2(servers.length || 1))} hopp.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
export default function DS6VisualiseringerPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/ds-6" className="hover:text-[var(--accent)]">DS-6</Link>
        <span>/</span>
        <span>Visualiseringer</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Interaktiv Chord-kalkulator</h1>
      <p className="text-[var(--muted)] mb-2">
        Konfigurer din egen Chord-ring og se fingertabeller, nøkkelansvar og oppslag beregnet automatisk og visualisert i sanntid.
      </p>

      <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 px-4 py-3 mb-6 text-sm text-blue-800 dark:text-blue-300">
        <span className="font-bold">Brukertips: </span>
        Sett inn professorens eksempel (m=5, noder 1,5,17,19,25) og test oppslagene fra øvingsoppgavene.
        Klikk på en server i ringen eller tabellen for å fremheve den.
      </div>

      <ChordCalculator />
    </div>
  );
}
