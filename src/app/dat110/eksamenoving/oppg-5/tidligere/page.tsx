"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 transition-colors"
        >
          Vis løsning
        </button>
      ) : (
        <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-4 text-sm space-y-2">
          {children}
        </div>
      )}
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
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
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

/* Reusable network SVG: 4 rutere i linje med kostnader */
function NetworkDiagram({
  costs,
}: {
  costs: [number, number, number, number];
}) {
  const [c12, c23, c34, c14] = costs;
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 480 130" className="w-full max-w-lg" fill="none">
        {/* Rutere */}
        {[
          { cx: 60, cy: 65, label: "R1" },
          { cx: 180, cy: 65, label: "R2" },
          { cx: 300, cy: 65, label: "R3" },
          { cx: 420, cy: 65, label: "R4" },
        ].map(({ cx, cy, label }) => (
          <g key={label}>
            <circle
              cx={cx}
              cy={cy}
              r={24}
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
            />
            <text
              x={cx}
              y={cy + 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="bold"
              className="fill-current"
            >
              {label}
            </text>
          </g>
        ))}

        {/* Linjer */}
        <line
          x1="84"
          y1="65"
          x2="156"
          y2="65"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <line
          x1="204"
          y1="65"
          x2="276"
          y2="65"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <line
          x1="324"
          y1="65"
          x2="396"
          y2="65"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Kostnader */}
        <text
          x="120"
          y="50"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#f59e0b"
        >
          {c12}
        </text>
        <text
          x="240"
          y="50"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#f59e0b"
        >
          {c23}
        </text>
        <text
          x="360"
          y="50"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#f59e0b"
        >
          {c34}
        </text>
      </svg>
    </div>
  );
}

/* DV-tabell som HTML */
function DVTable({
  node,
  rows,
}: {
  node: string;
  rows: { dest: string; cost: string; via: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <p className="text-xs font-bold text-[var(--muted)] mb-1">
        Avstandsvektor hos {node}
      </p>
      <table className="text-xs border-collapse w-full max-w-xs">
        <thead>
          <tr className="bg-network-100 dark:bg-network-900/30">
            <th className="border border-network-200 dark:border-network-700 px-3 py-1 text-left">
              Mål
            </th>
            <th className="border border-network-200 dark:border-network-700 px-3 py-1 text-left">
              Kostnad
            </th>
            <th className="border border-network-200 dark:border-network-700 px-3 py-1 text-left">
              Via
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.dest} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
              <td className="border border-network-200 dark:border-network-700 px-3 py-1 font-mono">
                {r.dest}
              </td>
              <td className="border border-network-200 dark:border-network-700 px-3 py-1 font-mono">
                {r.cost}
              </td>
              <td className="border border-network-200 dark:border-network-700 px-3 py-1 font-mono">
                {r.via}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Oppg5Tidligere() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Oppgave 5 har nesten identisk struktur hvert år: et nettverk R1–R2–R3–R4
        med linkkostnader, der du initialiserer avstandsvektortabeller og anvender
        Bellman-Ford. Kun tallene endres.
      </p>

      {/* Jan 2025 */}
      <ExamYear year="Jan 2025" title="Oppgave 5 — Ruting (avstandsvektoralgoritmen)">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>Nettverk:</strong> R1 — R2 — R3 — R4 (linjelinje)
          </p>
          <p>
            Kostnader: c(R1,R2) = 5, c(R2,R3) = 2, c(R3,R4) = 1, direkte
            c(R1,R4) = 8
          </p>
        </div>

        <NetworkDiagram costs={[5, 2, 1, 8]} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Hva er den billigste stien fra R1 til R4 og hva er kostnaden?
            </p>
            <Answer>
              <p>
                <strong>Mulige stier:</strong>
              </p>
              <Formula>
                R1 → R2 → R3 → R4: kost = 5 + 2 + 1 = 8
                <br />
                R1 → R4 direkte: kost = 8
              </Formula>
              <p>
                <strong>Svar:</strong> Begge stier koster 8. Billigste sti: R1 →
                R2 → R3 → R4 (eller direkte, samme kostnad).
              </p>
              <p className="text-xs text-[var(--muted)]">
                Sjekk alltid alle alternative stier — DV vil konvergere til
                minimumsverdien.
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Sett opp den initielle avstandsvektortabellen for alle rutere.
            </p>
            <Answer>
              <p className="text-xs text-[var(--muted)] mb-2">
                Initial: 0 til seg selv, direkte linkkostnad til naboer, ∞ til
                alle andre.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <DVTable
                  node="R1"
                  rows={[
                    { dest: "R1", cost: "0", via: "—" },
                    { dest: "R2", cost: "5", via: "R2" },
                    { dest: "R3", cost: "∞", via: "—" },
                    { dest: "R4", cost: "8", via: "R4" },
                  ]}
                />
                <DVTable
                  node="R2"
                  rows={[
                    { dest: "R1", cost: "5", via: "R1" },
                    { dest: "R2", cost: "0", via: "—" },
                    { dest: "R3", cost: "2", via: "R3" },
                    { dest: "R4", cost: "∞", via: "—" },
                  ]}
                />
                <DVTable
                  node="R3"
                  rows={[
                    { dest: "R1", cost: "∞", via: "—" },
                    { dest: "R2", cost: "2", via: "R2" },
                    { dest: "R3", cost: "0", via: "—" },
                    { dest: "R4", cost: "1", via: "R4" },
                  ]}
                />
                <DVTable
                  node="R4"
                  rows={[
                    { dest: "R1", cost: "8", via: "R1" },
                    { dest: "R2", cost: "∞", via: "—" },
                    { dest: "R3", cost: "1", via: "R3" },
                    { dest: "R4", cost: "0", via: "—" },
                  ]}
                />
              </div>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) R1 mottar avstandsvektoren fra R3 (via R2). Oppdater R1s tabell.
            </p>
            <Answer>
              <p>
                R3 har sendt: D_R3(R1)=∞, D_R3(R2)=2, D_R3(R3)=0, D_R3(R4)=1
              </p>
              <p>R1 anvender Bellman-Ford via alle naboer (R2 og R4):</p>
              <Formula>
                D_R1(R3) = min[c(R1,R2)+D_R2(R3), c(R1,R4)+D_R4(R3)]
                <br />
                = min[5+2, 8+1] = min[7, 9] = 7 via R2
                <br />
                D_R1(R4) = min[c(R1,R2)+D_R2(R4), c(R1,R4)+D_R4(R4)]
                <br />
                = min[5+∞, 8+0] = min[∞, 8] = 8 via R4 (uendret)
              </Formula>
              <DVTable
                node="R1 (oppdatert)"
                rows={[
                  { dest: "R1", cost: "0", via: "—" },
                  { dest: "R2", cost: "5", via: "R2" },
                  { dest: "R3", cost: "7", via: "R2" },
                  { dest: "R4", cost: "8", via: "R4" },
                ]}
              />
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              d) Hva er R4s avstandsvektor etter første runde med oppdateringer?
            </p>
            <Answer>
              <p>
                R4 mottar fra R1: D_R1(R2)=5. Fra R3: D_R3(R2)=2, D_R3(R1)=∞.
              </p>
              <Formula>
                D_R4(R2) = min[c(R4,R3)+D_R3(R2), c(R4,R1)+D_R1(R2)]
                <br />
                = min[1+2, 8+5] = min[3, 13] = 3 via R3
                <br />
                D_R4(R1) = min[c(R4,R3)+D_R3(R1), c(R4,R1)+D_R1(R1)]
                <br />
                = min[1+∞, 8+0] = 8 via R1
              </Formula>
              <DVTable
                node="R4 (etter runde 1)"
                rows={[
                  { dest: "R1", cost: "8", via: "R1" },
                  { dest: "R2", cost: "3", via: "R3" },
                  { dest: "R3", cost: "1", via: "R3" },
                  { dest: "R4", cost: "0", via: "—" },
                ]}
              />
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">
            Eksamenstips:{" "}
          </span>
          <span className="text-amber-800 dark:text-amber-300">
            Skriv alltid ned Bellman-Ford-ligningen eksplisitt — da ser sensor at
            du forstår metoden, ikke bare gjetter svaret.
          </span>
        </div>
      </ExamYear>

      {/* Mai 2024 */}
      <ExamYear year="Mai 2024" title="Oppgave 5 — Ruting (avstandsvektoralgoritmen)">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>Nettverk:</strong> R1 — R2 — R3 — R4
          </p>
          <p>
            Kostnader: c(R1,R2) = 8, c(R2,R3) = 2, c(R3,R4) = 1, c(R1,R4) = 5
          </p>
        </div>

        <NetworkDiagram costs={[8, 2, 1, 5]} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Billigste sti fra R1 til R4?
            </p>
            <Answer>
              <Formula>
                R1 → R2 → R3 → R4: 8 + 2 + 1 = 11
                <br />
                R1 → R4 direkte: 5
              </Formula>
              <p>
                <strong>Svar: R1 → R4 direkte, kostnad 5.</strong>
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Initielle avstandsvektortabeller for alle rutere.
            </p>
            <Answer>
              <div className="grid sm:grid-cols-2 gap-3">
                <DVTable
                  node="R1"
                  rows={[
                    { dest: "R1", cost: "0", via: "—" },
                    { dest: "R2", cost: "8", via: "R2" },
                    { dest: "R3", cost: "∞", via: "—" },
                    { dest: "R4", cost: "5", via: "R4" },
                  ]}
                />
                <DVTable
                  node="R2"
                  rows={[
                    { dest: "R1", cost: "8", via: "R1" },
                    { dest: "R2", cost: "0", via: "—" },
                    { dest: "R3", cost: "2", via: "R3" },
                    { dest: "R4", cost: "∞", via: "—" },
                  ]}
                />
                <DVTable
                  node="R3"
                  rows={[
                    { dest: "R1", cost: "∞", via: "—" },
                    { dest: "R2", cost: "2", via: "R2" },
                    { dest: "R3", cost: "0", via: "—" },
                    { dest: "R4", cost: "1", via: "R4" },
                  ]}
                />
                <DVTable
                  node="R4"
                  rows={[
                    { dest: "R1", cost: "5", via: "R1" },
                    { dest: "R2", cost: "∞", via: "—" },
                    { dest: "R3", cost: "1", via: "R3" },
                    { dest: "R4", cost: "0", via: "—" },
                  ]}
                />
              </div>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Oppdater R1s tabell etter å ha mottatt DVer fra R2 og R4.
            </p>
            <Answer>
              <Formula>
                D_R1(R3) = min[c(R1,R2)+D_R2(R3), c(R1,R4)+D_R4(R3)]
                <br />
                = min[8+2, 5+1] = min[10, 6] = 6 via R4
                <br />
                D_R1(R4) = min[8+∞, 5+0] = 5 via R4 (uendret)
              </Formula>
              <DVTable
                node="R1 (oppdatert)"
                rows={[
                  { dest: "R1", cost: "0", via: "—" },
                  { dest: "R2", cost: "8", via: "R2" },
                  { dest: "R3", cost: "6", via: "R4" },
                  { dest: "R4", cost: "5", via: "R4" },
                ]}
              />
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              d) R4s avstandsvektor etter første runde.
            </p>
            <Answer>
              <Formula>
                D_R4(R2) = min[c(R4,R3)+D_R3(R2), c(R4,R1)+D_R1(R2)]
                <br />
                = min[1+2, 5+8] = min[3, 13] = 3 via R3
                <br />
                D_R4(R1) = min[c(R4,R3)+D_R3(R1), c(R4,R1)+0]
                <br />
                = min[1+∞, 5+0] = 5 via R1
              </Formula>
              <DVTable
                node="R4 (etter runde 1)"
                rows={[
                  { dest: "R1", cost: "5", via: "R1" },
                  { dest: "R2", cost: "3", via: "R3" },
                  { dest: "R3", cost: "1", via: "R3" },
                  { dest: "R4", cost: "0", via: "—" },
                ]}
              />
            </Answer>
          </div>
        </div>
      </ExamYear>

      {/* Jan 2024 */}
      <ExamYear year="Jan 2024" title="Oppgave 5 — Ruting (avstandsvektoralgoritmen)">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p>
            <strong>Nettverk:</strong> R1 — R2 — R3 — R4
          </p>
          <p>
            Kostnader: c(R1,R2) = 7, c(R2,R3) = 1, c(R3,R4) = 1, c(R1,R4) = 5
          </p>
        </div>

        <NetworkDiagram costs={[7, 1, 1, 5]} />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-sm">
              a) Billigste sti fra R1 til R4?
            </p>
            <Answer>
              <Formula>
                R1 → R2 → R3 → R4: 7 + 1 + 1 = 9
                <br />
                R1 → R4 direkte: 5
              </Formula>
              <p>
                <strong>Svar: R1 → R4 direkte, kostnad 5.</strong>
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Initielle avstandsvektortabeller.
            </p>
            <Answer>
              <div className="grid sm:grid-cols-2 gap-3">
                <DVTable
                  node="R1"
                  rows={[
                    { dest: "R1", cost: "0", via: "—" },
                    { dest: "R2", cost: "7", via: "R2" },
                    { dest: "R3", cost: "∞", via: "—" },
                    { dest: "R4", cost: "5", via: "R4" },
                  ]}
                />
                <DVTable
                  node="R2"
                  rows={[
                    { dest: "R1", cost: "7", via: "R1" },
                    { dest: "R2", cost: "0", via: "—" },
                    { dest: "R3", cost: "1", via: "R3" },
                    { dest: "R4", cost: "∞", via: "—" },
                  ]}
                />
                <DVTable
                  node="R3"
                  rows={[
                    { dest: "R1", cost: "∞", via: "—" },
                    { dest: "R2", cost: "1", via: "R2" },
                    { dest: "R3", cost: "0", via: "—" },
                    { dest: "R4", cost: "1", via: "R4" },
                  ]}
                />
                <DVTable
                  node="R4"
                  rows={[
                    { dest: "R1", cost: "5", via: "R1" },
                    { dest: "R2", cost: "∞", via: "—" },
                    { dest: "R3", cost: "1", via: "R3" },
                    { dest: "R4", cost: "0", via: "—" },
                  ]}
                />
              </div>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Oppdater R1 etter å ha mottatt DVer fra naboer.
            </p>
            <Answer>
              <Formula>
                D_R1(R3) = min[c(R1,R2)+D_R2(R3), c(R1,R4)+D_R4(R3)]
                <br />
                = min[7+1, 5+1] = min[8, 6] = 6 via R4
                <br />
                D_R1(R4) = min[7+∞, 5+0] = 5 via R4 (uendret)
              </Formula>
              <DVTable
                node="R1 (oppdatert)"
                rows={[
                  { dest: "R1", cost: "0", via: "—" },
                  { dest: "R2", cost: "7", via: "R2" },
                  { dest: "R3", cost: "6", via: "R4" },
                  { dest: "R4", cost: "5", via: "R4" },
                ]}
              />
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              d) R4s avstandsvektor etter første runde.
            </p>
            <Answer>
              <Formula>
                D_R4(R2) = min[c(R4,R3)+D_R3(R2), c(R4,R1)+D_R1(R2)]
                <br />
                = min[1+1, 5+7] = min[2, 12] = 2 via R3
                <br />
                D_R4(R1) = min[1+∞, 5+0] = 5 via R1 (uendret)
              </Formula>
              <DVTable
                node="R4 (etter runde 1)"
                rows={[
                  { dest: "R1", cost: "5", via: "R1" },
                  { dest: "R2", cost: "2", via: "R3" },
                  { dest: "R3", cost: "1", via: "R3" },
                  { dest: "R4", cost: "0", via: "—" },
                ]}
              />
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">
            Mønster:{" "}
          </span>
          <span className="text-amber-800 dark:text-amber-300">
            Alle tre år bruker R1–R4 med direkte link R1↔R4. Lær å se raskt om
            den direkte lenken er billigere enn veien via R2 og R3.
          </span>
        </div>
      </ExamYear>
    </div>
  );
}
