"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          Vis løsning
        </button>
      ) : (
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 p-4 text-sm space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700 px-4 py-2 font-mono text-sm text-neutral-800 dark:text-neutral-300 my-2">
      {children}
    </div>
  );
}

function ExamYear({
  year,
  title,
  children,
}: {
  year: string;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {year}
          </span>
          <span className="font-bold">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

/* Chord-ring SVG */
function ChordRing({
  m,
  nodes,
  highlight,
}: {
  m: number;
  nodes: number[];
  highlight?: number;
}) {
  const total = Math.pow(2, m);
  const cx = 140;
  const cy = 140;
  const r = 110;

  const posToXY = (pos: number) => {
    const angle = (pos / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const labelXY = (pos: number) => {
    const angle = (pos / total) * 2 * Math.PI - Math.PI / 2;
    const lr = r + 20;
    return {
      x: cx + lr * Math.cos(angle),
      y: cy + lr * Math.sin(angle),
    };
  };

  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 280 280" className="w-full max-w-xs" fill="none">
        {/* Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Tick-marks for all positions (subtle) */}
        {Array.from({ length: total }, (_, i) => {
          const { x, y } = posToXY(i);
          const inner = { x: cx + (r - 5) * Math.cos((i / total) * 2 * Math.PI - Math.PI / 2), y: cy + (r - 5) * Math.sin((i / total) * 2 * Math.PI - Math.PI / 2) };
          if (nodes.includes(i)) return null;
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={x}
              y2={y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* Node circles */}
        {nodes.map((n) => {
          const { x, y } = posToXY(n);
          const lbl = labelXY(n);
          const isHighlight = n === highlight;
          return (
            <g key={n}>
              <circle
                cx={x}
                cy={y}
                r={14}
                fill={isHighlight ? "#3b82f6" : "#1e293b"}
                stroke={isHighlight ? "#93c5fd" : "#3b82f6"}
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="white"
              >
                {n}
              </text>
              <text
                x={lbl.x}
                y={lbl.y + 4}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Fingertabell som HTML */
function FingerTable({
  node,
  m,
  mod,
  rows,
}: {
  node: number;
  m: number;
  mod: number;
  rows: { i: number; start: number; succ: number }[];
}) {
  return (
    <div className="overflow-x-auto">
      <p className="text-xs font-bold text-[var(--muted)] mb-1">
        Fingertabell for node {node} (m={m}, 2^m={mod})
      </p>
      <table className="text-xs border-collapse w-full max-w-sm">
        <thead>
          <tr className="bg-blue-100 dark:bg-blue-900/30">
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1 text-left">
              i
            </th>
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1 text-left">
              start = (n + 2^(i−1)) mod 2^m
            </th>
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1 text-left">
              FT[i] = succ(start)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.i}
              className="even:bg-neutral-50 dark:even:bg-neutral-800/20"
            >
              <td className="border border-blue-200 dark:border-blue-700 px-3 py-1 font-mono">
                {row.i}
              </td>
              <td className="border border-blue-200 dark:border-blue-700 px-3 py-1 font-mono">
                ({node} + {Math.pow(2, row.i - 1)}) mod {mod} = {row.start}
              </td>
              <td className="border border-blue-200 dark:border-blue-700 px-3 py-1 font-mono font-bold text-blue-700 dark:text-blue-400">
                {row.succ}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* succ-hjelper */
function succ(k: number, nodes: number[], mod: number): number {
  k = ((k % mod) + mod) % mod;
  const sorted = [...nodes].sort((a, b) => a - b);
  const found = sorted.find((n) => n >= k);
  return found !== undefined ? found : sorted[0];
}

/* Bygg fingertabell-rader */
function buildFT(n: number, m: number, nodes: number[]) {
  const mod = Math.pow(2, m);
  return Array.from({ length: m }, (_, idx) => {
    const i = idx + 1;
    const start = (n + Math.pow(2, i - 1)) % mod;
    return { i, start, succ: succ(start, nodes, mod) };
  });
}

export default function Oppg10Tidligere() {
  const nodes2025 = [0, 9, 17, 30];
  const nodes2024mai = [1, 5, 10, 15, 20, 29];
  const nodes2024jan = [0, 9, 17, 30];
  const nodes2022 = [1, 6, 11, 15];

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Oppgave 10 er identisk strukturert hvert år: m=5 (eller m=4 i 2022),
        en liste med noder, og tre deloppgaver — fingertabeller, nøkkelansvar,
        og oppslagssporing.
      </p>

      {/* Jan 2025 */}
      <ExamYear year="Jan 2025" title="Oppgave 10 — DHT/Chord">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>m = 5</strong> (ring med 32 posisjoner, 0–31)
          </p>
          <p>
            <strong>Noder:</strong> 0, 9, 17, 30
          </p>
        </div>

        <ChordRing m={5} nodes={nodes2025} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Beregn fingertabeller for alle fire servere.
            </p>
            <Answer>
              <div className="space-y-4">
                <FingerTable
                  node={0}
                  m={5}
                  mod={32}
                  rows={buildFT(0, 5, nodes2025)}
                />
                <FingerTable
                  node={9}
                  m={5}
                  mod={32}
                  rows={buildFT(9, 5, nodes2025)}
                />
                <FingerTable
                  node={17}
                  m={5}
                  mod={32}
                  rows={buildFT(17, 5, nodes2025)}
                />
                <FingerTable
                  node={30}
                  m={5}
                  mod={32}
                  rows={buildFT(30, 5, nodes2025)}
                />
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">
                succ(k) = første node ≥ k i klokkeretning. Wrap rundt til node
                0 hvis k {'>'} 30.
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Hvilken server er ansvarlig for nøkler 2, 5, 19, 30?
            </p>
            <Answer>
              <Formula>
                Nøkkel k → succ(k) = første node ≥ k
                <br />
                Nøkkel 2 → succ(2) = 9 (første node ≥ 2)
                <br />
                Nøkkel 5 → succ(5) = 9 (første node ≥ 5)
                <br />
                Nøkkel 19 → succ(19) = 30 (første node ≥ 19)
                <br />
                Nøkkel 30 → succ(30) = 30 (node 30 eksisterer)
              </Formula>
              <p>
                <strong>Svar:</strong> 2 → node 9, 5 → node 9, 19 → node 30,
                30 → node 30.
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Spor oppslaget for nøkkel 12, startet fra node 0.
            </p>
            <Answer>
              <p>Fingertabell for node 0 (relevante oppføringer):</p>
              <Formula>
                FT[1] = succ(1) = 9
                <br />
                FT[2] = succ(2) = 9
                <br />
                FT[3] = succ(4) = 9
                <br />
                FT[4] = succ(8) = 9
                <br />
                FT[5] = succ(16) = 17
              </Formula>
              <p>Nøkkel = 12. Ansvarlig node = succ(12) = 17.</p>
              <p>
                <strong>Steg 1 (node 0):</strong> Finn største FT-oppføring ≤
                12. FT[4]=9 ≤ 12. Hopp til node 9.
              </p>
              <p>
                <strong>Steg 2 (node 9):</strong> succ(9) = 17 ≥ 12, så node 9
                kan videresende direkte til 17.
              </p>
              <p>
                <strong>Resultat:</strong> 0 → 9 → 17 (2 hopp). Node 17 eier
                nøkkel 12.
              </p>
              <p className="text-xs text-[var(--muted)]">
                Merk: når succ(gjeldende node) ≥ nøkkel, er vi fremme — neste
                node eier nøkkelen.
              </p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">
            Eksamenstips:{" "}
          </span>
          <span className="text-amber-800 dark:text-amber-300">
            Skriv alltid beregningen (n + 2^(i−1)) mod 32 eksplisitt i
            fingertabellen — sensor gir delpoeng for riktig metode selv om
            sluttsvaret er feil.
          </span>
        </div>
      </ExamYear>

      {/* Mai 2024 */}
      <ExamYear year="Mai 2024" title="Oppgave 10 — DHT/Chord">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>m = 5</strong> (ring med 32 posisjoner, 0–31)
          </p>
          <p>
            <strong>Noder:</strong> 1, 5, 10, 15, 20, 29
          </p>
        </div>

        <ChordRing m={5} nodes={nodes2024mai} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Beregn fingertabeller for alle servere.
            </p>
            <Answer>
              <div className="space-y-4">
                {nodes2024mai.map((n) => (
                  <FingerTable
                    key={n}
                    node={n}
                    m={5}
                    mod={32}
                    rows={buildFT(n, 5, nodes2024mai)}
                  />
                ))}
              </div>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Hvilken server er ansvarlig for nøkler 3, 7, 18, 28?
            </p>
            <Answer>
              <Formula>
                Nøkkel 3 → succ(3) = 5
                <br />
                Nøkkel 7 → succ(7) = 10
                <br />
                Nøkkel 18 → succ(18) = 20
                <br />
                Nøkkel 28 → succ(28) = 29
              </Formula>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Spor oppslag for nøkkel 26, startet fra node 1.
            </p>
            <Answer>
              <p>Ansvarlig node: succ(26) = 29.</p>
              <Formula>
                Node 1, FT[5] = succ(1+16) = succ(17) = 20
                <br />
                Node 1, FT[4] = succ(1+8) = succ(9) = 10
                <br />
                Finn største FT ≤ 26: FT[5]=20 ≤ 26 → hopp til 20
                <br />
                Node 20: succ(20) = 29 ≥ 26 → 29 eier nøkkelen
              </Formula>
              <p>
                <strong>Resultat:</strong> 1 → 20 → 29 (2 hopp).
              </p>
            </Answer>
          </div>
        </div>
      </ExamYear>

      {/* Jan 2024 */}
      <ExamYear year="Jan 2024" title="Oppgave 10 — DHT/Chord">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>m = 5</strong>, <strong>Noder:</strong> 0, 9, 17, 30
            (identisk topologi som Jan 2025)
          </p>
        </div>

        <ChordRing m={5} nodes={nodes2024jan} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Fingertabeller — samme som Jan 2025 (identiske noder).
            </p>
            <Answer>
              <div className="space-y-4">
                {nodes2024jan.map((n) => (
                  <FingerTable
                    key={n}
                    node={n}
                    m={5}
                    mod={32}
                    rows={buildFT(n, 5, nodes2024jan)}
                  />
                ))}
              </div>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Nøkkelansvar for 8, 10, 20, 31?
            </p>
            <Answer>
              <Formula>
                Nøkkel 8 → succ(8) = 9
                <br />
                Nøkkel 10 → succ(10) = 17
                <br />
                Nøkkel 20 → succ(20) = 30
                <br />
                Nøkkel 31 → succ(31) = 0 (wrap rundt)
              </Formula>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Oppslag for nøkkel 25 fra node 9.
            </p>
            <Answer>
              <p>Ansvarlig node: succ(25) = 30.</p>
              <Formula>
                Node 9 sin FT:
                <br />
                FT[1] = succ(10) = 17
                <br />
                FT[2] = succ(11) = 17
                <br />
                FT[3] = succ(13) = 17
                <br />
                FT[4] = succ(17) = 17
                <br />
                FT[5] = succ(25) = 30
              </Formula>
              <p>Største FT ≤ 25: FT[5]=30 {'>'} 25? Nei, FT[4]=17 ≤ 25.</p>
              <p>Hopp til node 17.</p>
              <p>
                Node 17: succ(17) = 17. Sjekk om 30 = succ(25). FT[5] =
                succ(17+16 mod 32) = succ(1) = 9. Finn FT ≤ 25: FT[3]=succ(21)=30. Hopp til 30.
              </p>
              <p>
                <strong>Resultat:</strong> 9 → 17 → 30 (2 hopp).
              </p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">
            Mønster:{" "}
          </span>
          <span className="text-amber-800 dark:text-amber-300">
            Jan 2024 og Jan 2025 bruker identisk nettverkstopologi (0, 9, 17,
            30). Lær disse fingertabellene utenat.
          </span>
        </div>
      </ExamYear>

      {/* 2022 */}
      <ExamYear year="2022" title="Oppgave 10 — DHT/Chord (m=4)">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>m = 4</strong> (ring med 16 posisjoner, 0–15)
          </p>
          <p>
            <strong>Noder:</strong> 1, 6, 11, 15
          </p>
        </div>

        <ChordRing m={4} nodes={nodes2022} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Fingertabeller for alle noder.
            </p>
            <Answer>
              <div className="space-y-4">
                {nodes2022.map((n) => (
                  <FingerTable
                    key={n}
                    node={n}
                    m={4}
                    mod={16}
                    rows={buildFT(n, 4, nodes2022)}
                  />
                ))}
              </div>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Nøkkelansvar for 3, 7, 12, 0?
            </p>
            <Answer>
              <Formula>
                Nøkkel 3 → succ(3) = 6
                <br />
                Nøkkel 7 → succ(7) = 11
                <br />
                Nøkkel 12 → succ(12) = 15
                <br />
                Nøkkel 0 → succ(0) = 1
              </Formula>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Oppslag for nøkkel 13 fra node 1.
            </p>
            <Answer>
              <p>Ansvarlig node: succ(13) = 15.</p>
              <Formula>
                Node 1 sin FT (m=4):
                <br />
                FT[1] = succ(2) = 6
                <br />
                FT[2] = succ(3) = 6
                <br />
                FT[3] = succ(5) = 6
                <br />
                FT[4] = succ(9) = 11
              </Formula>
              <p>
                Største FT ≤ 13: FT[4]=11 ≤ 13. Hopp til node 11.
              </p>
              <p>
                Node 11: succ(11) = 11. FT[1]=succ(12)=15 {'>'} 13? Nei, 15 er ikke ≤ 13. FT[3]=succ(15 mod 16)=succ(15)=15 {'>'} 13. FT[2]=succ(13)=15.
              </p>
              <p>
                Hopp til node 15. Node 15 er ansvarlig for nøkkel 13.
              </p>
              <p>
                <strong>Resultat:</strong> 1 → 11 → 15 (2 hopp).
              </p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-blue-700 dark:text-blue-400">
            Merk:{" "}
          </span>
          <span className="text-blue-800 dark:text-blue-300">
            2022-eksamen bruker m=4 (16 posisjoner), mens nyere eksamener
            bruker m=5 (32 posisjoner). Metoden er identisk — kun ringstørrelsen
            endres.
          </span>
        </div>
      </ExamYear>
    </div>
  );
}
