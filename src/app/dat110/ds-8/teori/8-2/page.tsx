"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";

export default function DS8_2Page() {
  const [byzantineK, setByzantineK] = useState(1);
  const [showProof, setShowProof] = useState(false);
  const [groupTab, setGroupTab] = useState<"flat" | "hierarchical">("flat");
  const [votingStep, setVotingStep] = useState(0);

  const minProcesses = 3 * byzantineK + 1;
  const correctProcesses = minProcesses - byzantineK;
  const neededMajority = 2 * byzantineK + 1;

  const votingSteps = [
    {
      label: "Initiell tilstand",
      desc: `${minProcesses} prosesser totalt, k=${byzantineK} kan svikte Byzantine. Klienten sender verdi til primær P.`,
    },
    {
      label: "Runde 1 — Primær sender",
      desc: `P sender sin verdi til alle ${minProcesses - 1} backups. Er P feilaktig, kan den sende ulike verdier til ulike backups.`,
    },
    {
      label: "Runde 2 — Backups videresender",
      desc: `Hver backup Bi sender videre det den mottok til alle de andre backups. Nå har alle mottatt ${minProcesses - 1} verdier.`,
    },
    {
      label: "Voting — majority()",
      desc: `Hver backup kjører majority() på mottatte verdier. Med ${minProcesses} prosesser og k=${byzantineK} feilaktige: korrekte backups mottar minst ${neededMajority} identiske korrekte verdier → konsensus.`,
    },
    {
      label: "Resultat",
      desc: `Byzantine agreement oppnådd! Alle ${correctProcesses} korrekte prosesser er enige om samme verdi, til tross for at ${byzantineK} prosess${byzantineK > 1 ? "er" : ""} kan oppføre seg vilkårlig.`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.2 Prosessresistens</span>
      </div>

      <h1 className="text-2xl font-bold">8.2 Prosessresistens</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Prosessresistens handler om å gjøre et distribuert system robust ved å organisere identiske prosesser i grupper. Nøkkelbegrepet er Byzantine feiltoleranse og 3k+1-regelen.
      </p>

      {/* Eksamensvarsler */}
      <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4">
        <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Eksamensgaranti — Prosessresistens</p>
        <p className="text-sm text-red-700 dark:text-red-300">
          Eksamen jan-2025 oppg. 1i: <em>&ldquo;Process resilience = organize identical processes into a group&rdquo;</em>. Kjernestoff: prosessgrupper, 3k+1-regelen for Byzantine-feil, flat vs hierarkisk gruppe.
        </p>
      </div>

      {/* Grunnkonsept */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Prosessgrupper — grunnideen</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Grunnideen: replikér prosessen N ganger og organiser dem i en <strong>gruppe</strong>. En melding til gruppen mottas av alle medlemmer. Hvis én krasjer, kan de andre ta over. Fra klientens perspektiv ser gruppen ut som én enkelt logisk prosess.
        </p>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm">
          <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">k-feil-tolerant gruppe</p>
          <p className="text-[var(--muted)]">
            Et system er <strong>k-feil-tolerant</strong> hvis det kan overleve feil i k komponenter og fortsatt møte spesifikasjonene sine.
            For <em>crash-feil</em>: trenger k+1 prosesser (én er nok til å svare).
            For <em>Byzantine-feil</em>: trenger 2k+1 prosesser (for voting) — men som vi skal se, krever dette faktisk 3k+1.
          </p>
        </div>
      </section>

      {/* Flat vs hierarkisk */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Gruppeorganisering: flat vs hierarkisk</h2>
        <div className="flex gap-2 mb-4">
          {(["flat", "hierarchical"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setGroupTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                groupTab === tab
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                  : "bg-[var(--card)] border-[var(--card-border)] text-[var(--foreground)] hover:border-blue-400"
              }`}
            >
              {tab === "flat" ? "Flat gruppe" : "Hierarkisk gruppe"}
            </button>
          ))}
        </div>

        {groupTab === "flat" ? (
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <svg viewBox="0 0 180 170" className="w-44 shrink-0">
                {/* Dashed circle for group boundary */}
                <circle cx="90" cy="90" r="72" fill="none" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4,3" strokeOpacity="0.5"/>
                {[
                  [90, 28], [147, 65], [130, 145], [50, 145], [33, 65],
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="19" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.5"/>
                    <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#3B82F6" fontWeight="bold">P{i+1}</text>
                  </g>
                ))}
                {/* Lines between all pairs */}
                {[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,3],[2,4],[3,4],[1,4]].map(([a,b],i) => {
                  const pts = [[90,28],[147,65],[130,145],[50,145],[33,65]];
                  return <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.35"/>;
                })}
              </svg>
              <div className="flex-1 text-sm">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Flat gruppe</p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
                    <p className="font-medium text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                    <ul className="text-[var(--muted)] space-y-0.5 list-disc list-inside">
                      <li>Ingen single point of failure</li>
                      <li>Symmetrisk — alle prosesser likeverdige</li>
                      <li>Brukes i P2P og active replication</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                    <p className="font-medium text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                    <ul className="text-[var(--muted)] space-y-0.5 list-disc list-inside">
                      <li>Koordinering er krevende</li>
                      <li>Mer overhead — må stemme for alle beslutninger</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <svg viewBox="0 0 180 170" className="w-44 shrink-0">
                <circle cx="90" cy="30" r="22" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                <text x="90" y="28" textAnchor="middle" fontSize="9" fill="#1D4ED8" fontWeight="bold">KOOR-</text>
                <text x="90" y="38" textAnchor="middle" fontSize="9" fill="#1D4ED8" fontWeight="bold">DINATOR</text>
                {[28, 78, 128, 158].map((cx, i) => (
                  <g key={i}>
                    <line x1="90" y1="52" x2={cx} y2="115" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.6"/>
                    <circle cx={cx} cy="130" r="18" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.2"/>
                    <text x={cx} y="134" textAnchor="middle" fontSize="10" fill="#3B82F6">W{i+1}</text>
                  </g>
                ))}
              </svg>
              <div className="flex-1 text-sm">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Hierarkisk gruppe</p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
                    <p className="font-medium text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                    <ul className="text-[var(--muted)] space-y-0.5 list-disc list-inside">
                      <li>Raske beslutninger — koordinator bestemmer</li>
                      <li>Enklere å implementere</li>
                      <li>Brukes i primary-backup replikering</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                    <p className="font-medium text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                    <ul className="text-[var(--muted)] space-y-0.5 list-disc list-inside">
                      <li>Koordinator = single point of failure</li>
                      <li>Krasjer koordinator: trenger leder-valg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Replikeringsstrategier */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Replikeringsstrategier</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Primary-backup (passiv)</p>
            <p className="text-[var(--muted)] mb-2">Én primær håndterer alle skriveroperasjoner og videresender oppdateringer til backups. Backup tar over ved krasj. Hierarkisk struktur.</p>
            <p className="text-xs italic text-[var(--muted)]">Brukt i: databaser, NFS, klassiske fail-over systemer.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Active replication (aktiv)</p>
            <p className="text-[var(--muted)] mb-2">Alle replikaer utfører alle operasjoner. Flat gruppe — ingen SPOF. Krever totalt ordnet multicast for konsistens.</p>
            <p className="text-xs italic text-[var(--muted)]">Brukt i: Byzantine fault-tolerante systemer, blockchain, quorum-protokoller.</p>
          </div>
        </div>
      </section>

      {/* TMR */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Triple Modular Redundancy (TMR)</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <p className="text-sm text-[var(--muted)] mb-3">
            Klassisk hardware-redundansmetode: komponenten replikeres 3 ganger, og en <strong>voter</strong>-krets (stemmeteller) velger majoritetssvaret. Én komponentfeil maskeres helt.
          </p>
          <svg viewBox="0 0 420 130" className="w-full max-w-lg mx-auto mb-2">
            <text x="10" y="64" fontSize="11" fill="currentColor">Input</text>
            <line x1="52" y1="63" x2="75" y2="63" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="75" y1="28" x2="75" y2="98" stroke="currentColor" strokeWidth="1"/>
            {[28, 63, 98].map((y, i) => (
              <g key={i}>
                <line x1="75" y1={y} x2="105" y2={y} stroke="currentColor" strokeWidth="1"/>
                <rect x="105" y={y - 10} width="80" height="20" rx="4" fill="#3B82F6" fillOpacity={i === 1 ? 0.35 : 0.15} stroke="#3B82F6" strokeWidth="1.2"/>
                <text x="145" y={y + 4} textAnchor="middle" fontSize="10" fill="#3B82F6">
                  {i === 1 ? "Komp 2 (feil?)" : `Komp ${i+1} (OK)`}
                </text>
                <line x1="185" y1={y} x2="220" y2={y} stroke="currentColor" strokeWidth="1"/>
              </g>
            ))}
            <line x1="220" y1="28" x2="248" y2="63" stroke="currentColor" strokeWidth="1"/>
            <line x1="220" y1="63" x2="248" y2="63" stroke="currentColor" strokeWidth="1"/>
            <line x1="220" y1="98" x2="248" y2="63" stroke="currentColor" strokeWidth="1"/>
            <rect x="248" y="50" width="65" height="26" rx="6" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5"/>
            <text x="280" y="66" textAnchor="middle" fontSize="11" fill="#10B981" fontWeight="bold">VOTER</text>
            <line x1="313" y1="63" x2="355" y2="63" stroke="currentColor" strokeWidth="1.5"/>
            <text x="358" y="67" fontSize="11" fill="currentColor">Output</text>
          </svg>
          <p className="text-xs text-center text-[var(--muted)]">Output = flertallssvar. Én feilaktig komponent maskeres.</p>
        </div>
      </section>

      {/* Byzantine feiltoleranse */}
      <section>
        <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4 mb-5">
          <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Eksamens-kritisk: Byzantine feiltoleranse og 3k+1</p>
          <p className="text-sm text-red-700 dark:text-red-300">Gjenganger i oppg. 1 og 9 på eksamen. Lær 3k+1-regelen og intuisjonen bak den.</p>
        </div>

        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Byzantine feiltoleranse</h2>

        {/* Generalenes problem */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mb-4">
          <h3 className="font-semibold mb-2">The Byzantine Generals Problem — analogien</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Bysantinske hærenheter omringer en by. Generalene kommuniserer kun via sendebud. Noen generaler er forrædere som sender motstridende ordrer til ulike allierte. De lojale generalene må bli enige om én strategi (angrep/retrett) — og nok lojale generaler må eksistere til at de kan overtrumfe forræderne.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Distribuert system-mapping</p>
              <ul className="text-[var(--muted)] space-y-1 list-disc list-inside">
                <li>Generaler → prosesser/servere</li>
                <li>Forrædere → Byzantine-feilaktige prosesser</li>
                <li>Strategi → konsensus-verdi</li>
                <li>Sendebud → nettverksmeldinger</li>
              </ul>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Byzantine Agreement-krav</p>
              <ul className="text-[var(--muted)] space-y-1 list-disc list-inside">
                <li><strong>BA1:</strong> Alle korrekte backups lagrer samme verdi</li>
                <li><strong>BA2:</strong> Dersom primæren er korrekt, lagrer alle korrekte backups nøyaktig det primæren sendte</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3k+1-formelen */}
        <FormulaBox
          latex="n \\geq 3k + 1"
          title="3k+1-regelen — Byzantine feiltoleranse"
          variant="blue"
          description="For å tolerere k Byzantine-feilaktige prosesser trenger vi minst 3k+1 prosesser totalt i gruppen."
        />

        {/* Interaktiv kalkulator */}
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5 mb-4">
          <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Interaktiv kalkulator — sett k</h3>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <label className="text-sm font-medium">k (Byzantine-feil som tolereres):</label>
            <input
              type="range"
              min={1}
              max={5}
              value={byzantineK}
              onChange={(e) => setByzantineK(Number(e.target.value))}
              className="w-32 accent-blue-600"
            />
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">k = {byzantineK}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-3">
            <div className="rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 p-3">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{minProcesses}</p>
              <p className="text-xs text-[var(--muted)]">Min. prosesser (3k+1)</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 p-3">
              <p className="text-2xl font-bold text-red-500">{byzantineK}</p>
              <p className="text-xs text-[var(--muted)]">Maks Byzantine-feil (k)</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 p-3">
              <p className="text-2xl font-bold text-green-600">{correctProcesses}</p>
              <p className="text-xs text-[var(--muted)]">Korrekte prosesser</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 p-3">
              <p className="text-2xl font-bold text-purple-600">{neededMajority}</p>
              <p className="text-xs text-[var(--muted)]">Nødvendig majoritet (2k+1)</p>
            </div>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Med k={byzantineK}: {minProcesses} prosesser totalt, {correctProcesses} korrekte og {byzantineK} Byzantine-feilaktige. De korrekte trenger {neededMajority} stemmer (2k+1) for å ha majoritet over de {byzantineK} feilaktige.
          </p>
        </div>

        {/* Bevis-intuisjon */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Bevis-intuisjon: hvorfor akkurat 3k+1?</h3>
            <button
              onClick={() => setShowProof(!showProof)}
              className="text-sm text-blue-600 dark:text-blue-400 underline"
            >
              {showProof ? "Skjul" : "Vis forklaring"}
            </button>
          </div>
          {showProof && (
            <div className="text-sm text-[var(--muted)] space-y-3">
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Hvorfor 3k ikke er nok (k=1, n=3):</p>
                <p>Primær P er feilaktig og sender T til B1 og F til B2. Etter runde 2 har B1 verdiene {"{T, F}"} og B2 verdiene {"{T, F}"}. Ingen kan ta en majoritetsbeslutning — umulig å vite hvem som lyger.</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
                <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Med 4 prosesser (3k+1=4, k=1):</p>
                <p>P sender T til B1, F til B2, T til B3. Etter runde 2 mottar B1 og B3: {"{T, T, F}"} → majoritet T. B2 mottar {"{T, F, T}"} → majoritet T. Alle korrekte backups er enige!</p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Generell intuisjon:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>De k Byzantine-prosessene kan sende maks k falske stemmer</li>
                  <li>Vi trenger at korrekte prosesser har majoritet: 2k+1 stemmer</li>
                  <li>Totalt: k (feil) + 2k+1 (korrekte) = <strong>3k+1</strong></li>
                  <li>Av de 3k+1: kun k er feilaktige, 2k+1 er korrekte og «vinner» votingen</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Tabell */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 dark:bg-blue-900/30">
              <tr>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">k (Byzantine-feil)</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Min. prosesser (3k+1)</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Korrekte (2k+1)</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Praktisk eksempel</th>
              </tr>
            </thead>
            <tbody>
              {[
                [1, 4, 3, "Blockchain med 4 noder"],
                [2, 7, 5, "PBFT standard oppsett"],
                [3, 10, 7, "Større fault-tolerant system"],
                [4, 13, 9, "—"],
                [5, 16, 11, "—"],
              ].map(([k, n, c, ex], i) => (
                <tr key={k} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}>
                  <td className="p-3 font-mono">{k}</td>
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{n}</td>
                  <td className="p-3 font-mono">{c}</td>
                  <td className="p-3 text-[var(--muted)] text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Steg-for-steg visualisering */}
        <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Steg-for-steg: Byzantine voting-protokoll (k=1, n=4)</h3>
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5">
          <div className="flex gap-2 flex-wrap mb-4">
            {votingSteps.map((s, i) => (
              <button
                key={i}
                onClick={() => setVotingStep(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  votingStep === i
                    ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                {i + 1}. {s.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 p-4 min-h-[80px]">
            <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">{votingSteps[votingStep].label}</p>
            <p className="text-sm text-[var(--muted)]">{votingSteps[votingStep].desc}</p>
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => setVotingStep(Math.max(0, votingStep - 1))}
              disabled={votingStep === 0}
              className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400"
            >
              ← Forrige
            </button>
            <span className="text-xs text-[var(--muted)] self-center">Steg {votingStep + 1} av {votingSteps.length}</span>
            <button
              onClick={() => setVotingStep(Math.min(votingSteps.length - 1, votingStep + 1))}
              disabled={votingStep === votingSteps.length - 1}
              className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400"
            >
              Neste →
            </button>
          </div>
        </div>
      </section>

      {/* Oppsummering */}
      <section className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
          <li>Prosessresistens = organisere identiske prosesser i en gruppe</li>
          <li>Flat gruppe: ingen leder, alle likeverdige, ingen SPOF</li>
          <li>Hierarkisk gruppe: koordinator + arbeidere, raskere, men SPOF</li>
          <li>Primary-backup (passiv) vs active replication (aktiv)</li>
          <li>TMR: triple modular redundancy med voter — tåler én feil</li>
          <li><strong>3k+1-regelen</strong>: for k Byzantine-feil trengs minst 3k+1 prosesser</li>
          <li>Byzantine agreement BA1 og BA2</li>
          <li>Intuisjon: k feil + (2k+1) korrekte = 3k+1 totalt</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-8/teori/8-1" className="hover:text-[var(--accent)] text-sm">← 8.1 Introduksjon til feiltoleranse</Link>
        <Link href="/dat110/ds-8/teori/8-3" className="hover:text-[var(--accent)] text-sm">8.3 Pålitelig kommunikasjon →</Link>
      </div>
    </div>
  );
}
