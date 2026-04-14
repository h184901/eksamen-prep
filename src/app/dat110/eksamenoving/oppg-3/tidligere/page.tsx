"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button onClick={() => setShow(true)} className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 transition-colors">
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

function ExamYear({ year, children }: { year: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
            {year}
          </span>
          <span className="font-bold">Oppgave 3 — Forsinkelser</span>
        </div>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

export default function Oppg3Tidligere() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Oppgave 3 har nesten identisk struktur hvert år: et nettverk med rutere og verter,
        der du beregner sendingsforsinkelse, nodalforsinkelse, ende-til-ende-forsinkelse og
        identifiserer flaskehalsen.
      </p>

      {/* 2025 */}
      <ExamYear year="Jan 2025">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Nettverk:</strong> H1, H2 → R1 → R2 → H3</p>
          <p>R = 10⁶ bits/s, d = 10⁴ m, s = 5×10⁸ m/s, L = 10³ bits</p>
          <p>d_proc = 0.002 s, d_queue = 0.01 s</p>
        </div>

        {/* Nettverksillustrasjon */}
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
          <svg viewBox="0 0 400 140" className="w-full max-w-md" fill="none">
            <circle cx="50" cy="40" r="20" stroke="currentColor" strokeWidth="2" className="text-network-500" />
            <text x="50" y="45" textAnchor="middle" className="text-xs fill-current" fontSize="12">H1</text>
            <circle cx="50" cy="100" r="20" stroke="currentColor" strokeWidth="2" className="text-network-500" />
            <text x="50" y="105" textAnchor="middle" className="text-xs fill-current" fontSize="12">H2</text>
            <circle cx="170" cy="70" r="22" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
            <text x="170" y="75" textAnchor="middle" className="text-xs fill-current font-bold" fontSize="12">R1</text>
            <circle cx="280" cy="70" r="22" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
            <text x="280" y="75" textAnchor="middle" className="text-xs fill-current font-bold" fontSize="12">R2</text>
            <circle cx="380" cy="70" r="20" stroke="currentColor" strokeWidth="2" className="text-network-500" />
            <text x="380" y="75" textAnchor="middle" className="text-xs fill-current" fontSize="12">H3</text>
            <line x1="70" y1="45" x2="148" y2="65" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
            <line x1="70" y1="95" x2="148" y2="75" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
            <line x1="192" y1="70" x2="258" y2="70" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
            <line x1="302" y1="70" x2="360" y2="70" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Hva er sendingsforsinkelsen mellom R1 og R2?</p>
            <Answer>
              <Formula>d_trans = L / R = 10³ / 10⁶ = 0.001 s = 1 ms</Formula>
              <p><strong>Svar: 0.001 sekunder (1 ms)</strong></p>
              <p className="text-xs text-[var(--muted)]">Husk: sendingsforsinkelse avhenger KUN av pakkestørrelse og linkkapasitet, ikke avstand.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">b) Beregn nodalforsinkelsen ved R1 for pakke til R2.</p>
            <Answer>
              <Formula>
                d_prop = d/s = 10⁴ / (5×10⁸) = 0.00002 s<br/>
                d_nodal = d_proc + d_queue + d_trans + d_prop<br/>
                d_nodal = 0.002 + 0.01 + 0.001 + 0.00002 = 0.01302 s
              </Formula>
              <p><strong>Svar: 0.01302 sekunder ≈ 13 ms</strong></p>
              <p className="text-xs text-[var(--muted)]">Strategi: skriv opp alle fire forsinkelsene, beregn de du mangler, summer.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">c) Ende-til-ende-forsinkelse fra H1 til H3 (via R1, R2). Anta alle noder har samme forsinkelser.</p>
            <Answer>
              <Formula>d_e2e = 3 × d_nodal = 3 × 0.01302 = 0.03906 s</Formula>
              <p><strong>Svar: 0.03906 sekunder ≈ 39 ms</strong></p>
              <p className="text-xs text-[var(--muted)]">3 noder (H1, R1, R2) har nodalforsinkelse. H3 er mottaker og har ingen nodalforsinkelse.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">d) Gitt ulike linkkapasiteter: H1→R1 (50 Mbps), R1→R2 (100 Mbps), R2→H3 (10 Mbps). Hva er flaskehalsen?</p>
            <Answer>
              <p><strong>Svar: R2→H3-linken (10 Mbps)</strong></p>
              <p>Gjennomstrømning = min(50, 100, 10) = 10 Mbps. Den tregeste linken bestemmer.</p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Tips: </span>
          <span className="text-amber-800 dark:text-amber-300">Denne oppgaven er ren beregning. Skriv ned alle kjente verdier først, bruk formlene mekanisk, og dobbeltsjekk enhetene.</span>
        </div>
      </ExamYear>

      {/* Jan 2024 */}
      <ExamYear year="Jan 2024">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Nettverk:</strong> H1, H2 → R1 → R2 → H3 (samme topologi)</p>
          <p>R = 10⁵ bits/s, d = 10⁴ m, s = 2×10⁸ m/s, L = 10⁴ bits</p>
          <p>d_proc = 0.005 s, d_queue = 0.02 s</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Sendingsforsinkelse for L = 10⁴ bits?</p>
            <Answer>
              <Formula>d_trans = L / R = 10⁴ / 10⁵ = 0.1 s</Formula>
              <p><strong>Svar: 0.1 sekunder (100 ms)</strong></p>
            </Answer>
          </div>
          <div>
            <p className="font-semibold text-sm">b) Nodalforsinkelse ved R1?</p>
            <Answer>
              <Formula>
                d_prop = 10⁴ / (2×10⁸) = 0.00005 s<br/>
                d_nodal = 0.005 + 0.02 + 0.1 + 0.00005 = 0.12505 s
              </Formula>
              <p><strong>Svar: 0.12505 sekunder ≈ 125 ms</strong></p>
            </Answer>
          </div>
          <div>
            <p className="font-semibold text-sm">c) Ende-til-ende H1→H3?</p>
            <Answer>
              <Formula>d_e2e = 3 × 0.12505 = 0.37515 s</Formula>
              <p><strong>Svar: 0.37515 sekunder ≈ 375 ms</strong></p>
            </Answer>
          </div>
        </div>
      </ExamYear>

      {/* Mai 2024 */}
      <ExamYear year="Mai 2024">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Nettverk:</strong> 4 servere S1–S4, 4 klienter C1–C4, 2 rutere R1–R2</p>
          <p>Delt link R1↔R2 = 100 Mbps, server-linker Rs = 80 Mbps, klient-linker Rc = 40 Mbps</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Maksimal gjennomstrømning per klient-server-par?</p>
            <Answer>
              <p>Gjennomstrømning = min(Rs, R_delt/N, Rc) = min(80, 100/4, 40) = min(80, 25, 40) = <strong>25 Mbps</strong></p>
              <p className="text-xs text-[var(--muted)]">4 par deler linken R1↔R2, så hver får 100/4 = 25 Mbps.</p>
            </Answer>
          </div>
          <div>
            <p className="font-semibold text-sm">b) Identifiser flaskehalsen.</p>
            <Answer>
              <p><strong>R1↔R2-linken</strong> er flaskehalsen (25 Mbps per par &lt; Rs og Rc).</p>
            </Answer>
          </div>
        </div>
      </ExamYear>

      {/* 2022 */}
      <ExamYear year="2022">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Nettverk:</strong> Samme topologi som 2025 (H1, H2 → R1 → R2 → H3)</p>
          <p>R = 10⁶ bits/s, d = 10⁴ m, s = 5×10⁸ m/s, L = 10³ bits</p>
          <p>d_proc = 0.002 s, d_queue = 0.01 s</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">Identiske verdier som 2025-eksamen — se løsningen der.</p>
            <p className="text-xs text-[var(--muted)]">Svar: d_trans = 1 ms, d_nodal = 13.02 ms, d_e2e = 39.06 ms, flaskehals = 10 Mbps-link.</p>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster: </span>
          <span className="text-amber-800 dark:text-amber-300">Oppgaven bruker nesten identiske verdier hvert år — kun tallene endres. Lær formelen, ikke tallene.</span>
        </div>
      </ExamYear>
    </div>
  );
}
