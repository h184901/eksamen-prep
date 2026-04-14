"use client";

import { useState } from "react";
import Link from "next/link";

const DOMINO_STEPS = [
  {
    label: "Utgangspunkt",
    desc: "Tre prosesser P1, P2, P3 med ukoordinerte checkpoints. Meldinger sendes mellom prosessene.",
    p1: 2, p2: 2, p3: 2,
    highlight: null as null | string,
  },
  {
    label: "P3 krasjer",
    desc: "P3 krasjer etter sin siste checkpoint. Systemet prøver å rulle P3 tilbake til siste checkpoint.",
    p1: 2, p2: 2, p3: 1,
    highlight: "p3-crash",
  },
  {
    label: "P3 rollback avslører inkonsistens",
    desc: "P3's siste checkpoint ble lagret etter P3 mottok en melding fra P2. Men P2 har ingen record på at den sendte den meldingen! Vi må rulle P2 tilbake også.",
    p1: 2, p2: 1, p3: 0,
    highlight: "p2-rollback",
  },
  {
    label: "P2 rollback avslører ny inkonsistens",
    desc: "P2's forrige checkpoint ble lagret etter P2 mottok en melding fra P1. P1's siste checkpoint registrerer ikke at den sendte denne meldingen. P1 må også rulles tilbake!",
    p1: 1, p2: 0, p3: 0,
    highlight: "p1-rollback",
  },
  {
    label: "Domino-effekten — initialtilstand",
    desc: "Alle prosesser er nå tilbake til initialtilstanden! Alt arbeid siden systemstart er tapt. Dette er domino-effekten (cascading rollback).",
    p1: 0, p2: 0, p3: 0,
    highlight: "all-initial",
  },
];

const MSG_LOG_COMPARE = [
  {
    type: "Pessimistisk logging",
    safety: "Høy",
    performance: "Lav",
    desc: "Logg meldingen til stabil lagring FØR den leveres til applikasjonen. Ingen orphans noensinne.",
    tradeoff: "Stor ytelseskostnad — disk-IO på hver melding",
    color: "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20",
  },
  {
    type: "Optimistisk logging",
    safety: "Lav",
    performance: "Høy",
    desc: "Lever meldingen umiddelbart og logg asynkront. Anta at feil sjelden oppstår.",
    tradeoff: "Kan skape orphan-prosesser ved krasj — mer kompleks recovery",
    color: "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20",
  },
];

export default function DS8_4Page() {
  const [dominoStep, setDominoStep] = useState(0);
  const [activeCheckpoint, setActiveCheckpoint] = useState<"independent" | "coordinated">("coordinated");
  const [activeLogging, setActiveLogging] = useState(0);

  const step = DOMINO_STEPS[dominoStep];

  const getCheckpointColor = (proc: number, checkpointIdx: number) => {
    if (proc === 0) { // P1
      return checkpointIdx <= step.p1 ? "fill-blue-500" : "fill-gray-300 dark:fill-gray-600";
    } else if (proc === 1) { // P2
      return checkpointIdx <= step.p2 ? "fill-green-500" : "fill-gray-300 dark:fill-gray-600";
    } else { // P3
      return checkpointIdx <= step.p3 ? "fill-purple-500" : "fill-gray-300 dark:fill-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.4 Feilgjenoppretting</span>
      </div>

      <h1 className="text-2xl font-bold">8.4 Feilgjenoppretting</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Feilgjenoppretting handler om å bringe systemet tilbake til en korrekt tilstand etter en feil. To strategier: bakover-gjenoppretting (rollback til checkpoint) og fremover-gjenoppretting (korriger og fortsett).
      </p>

      {/* Backward vs Forward */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">To tilnærminger til feilgjenoppretting</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">↩</span>
              <p className="font-semibold text-blue-700 dark:text-blue-300">Bakover-gjenoppretting (Backward Recovery)</p>
            </div>
            <p className="text-sm text-[var(--muted)] mb-3">
              Bruk systemet til forrige <strong>checkpoint</strong> (lagret korrekt tilstand). Rull tilbake til dette punktet og fortsett derfra.
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside mb-3">
              <li>Krever periodisk snapshot av tilstand</li>
              <li>Generelt anvendelig — uavhengig av applikasjon</li>
              <li>Kan integreres som middleware-tjeneste</li>
            </ul>
            <p className="text-xs bg-blue-100 dark:bg-blue-900/40 rounded px-2 py-1">
              Eksempel: TCP retransmisjon (ruller tilbake til «pakken ikke sendt»), databasetransaksjon rollback
            </p>
          </div>
          <div className="rounded-xl border-2 border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">→</span>
              <p className="font-semibold text-orange-700 dark:text-orange-300">Fremover-gjenoppretting (Forward Recovery)</p>
            </div>
            <p className="text-sm text-[var(--muted)] mb-3">
              Bring systemet til en <em>ny</em> korrekt tilstand framover i tid. Krever at man <strong>vet på forhånd</strong> hvilke feil kan oppstå.
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside mb-3">
              <li>Raskere — ingen rollback-kostnad</li>
              <li>Krever domenekunnskap om mulige feil</li>
              <li>Noen tilstander kan aldri rulles tilbake</li>
            </ul>
            <p className="text-xs bg-orange-100 dark:bg-orange-900/40 rounded px-2 py-1">
              Eksempel: Erasure correction codes (rekonstruer tapt pakke fra andre pakker)
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3 text-sm text-[var(--muted)]">
          <strong>Viktig begrensning:</strong> Bakover-gjenoppretting fungerer ikke alltid. Eksempel: hvis en feilaktig ATM-maskin ga ut 1000kr, kan vi ikke «rulle tilbake» pengene. Noen handlinger er irreversible.
        </div>
      </section>

      {/* Checkpoint-basert gjenoppretting */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Checkpoint-basert gjenoppretting</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          For bakover-gjenoppretting trenger vi å lagre en <strong>konsistent global tilstand</strong> — et distributed snapshot der alle prosessers lagrede tilstander er konsistente med hverandre.
        </p>

        <div className="flex gap-2 mb-4">
          {(["independent", "coordinated"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCheckpoint(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                activeCheckpoint === tab
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                  : "bg-[var(--card)] border-[var(--card-border)] text-[var(--foreground)] hover:border-blue-400"
              }`}
            >
              {tab === "independent" ? "Uavhengig checkpointing" : "Koordinert checkpointing"}
            </button>
          ))}
        </div>

        {activeCheckpoint === "coordinated" ? (
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5">
            <p className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Koordinert checkpointing</p>
            <p className="text-sm text-[var(--muted)] mb-4">
              Alle prosesser synkroniserer for å ta checkpoint samtidig. Garanterer automatisk global konsistens. Implementeres som en to-fase protokoll:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
              <div className="rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Fase 1 — Forberedelse</p>
                <ol className="space-y-1 list-decimal list-inside text-[var(--muted)]">
                  <li>Koordinator sender CHECKPOINT-REQUEST til alle</li>
                  <li>Hver prosess tar lokal checkpoint</li>
                  <li>Kø alle innkommende meldinger</li>
                  <li>Send ACK til koordinator</li>
                </ol>
              </div>
              <div className="rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Fase 2 — Ferdigstilling</p>
                <ol className="space-y-1 list-decimal list-inside text-[var(--muted)]">
                  <li>Koordinator mottar alle ACK</li>
                  <li>Koordinator sender CHECKPOINT-DONE</li>
                  <li>Prosessene fortsetter normalt</li>
                  <li>Køde meldinger behandles</li>
                </ol>
              </div>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm">
              <p className="font-medium text-green-700 dark:text-green-400 mb-1">Fordel</p>
              <p className="text-[var(--muted)]">Lagret tilstand er automatisk globalt konsistent — ingen domino-effekt. Enklere å implementere recovery.</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 p-5">
            <p className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Uavhengig checkpointing</p>
            <p className="text-sm text-[var(--muted)] mb-4">
              Hver prosess tar checkpoint uavhengig uten koordinering. Enkelt å implementere — men kan føre til den fryktede <strong>domino-effekten</strong>.
            </p>
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm mb-3">
              <p className="font-medium text-red-700 dark:text-red-400 mb-1">Problem: Domino-effekten (cascading rollback)</p>
              <p className="text-[var(--muted)]">Prosessenes checkpoints er ikke konsistente med hverandre. Recovery etter en krasj kan kreve at alle prosesser rulles tilbake helt til initialtilstanden.</p>
            </div>
          </div>
        )}
      </section>

      {/* Domino-effekten — interaktiv */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Domino-effekten — steg for steg</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Se hva som skjer ved uavhengig checkpointing når P3 krasjer:
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          {/* SVG diagram */}
          <div className="rounded-xl bg-[var(--background)] border border-[var(--card-border)] p-4 mb-4">
            <svg viewBox="0 0 500 160" className="w-full max-w-2xl mx-auto">
              {/* Aksene */}
              {[
                { label: "P1", y: 30, color: "#3B82F6", checkpoints: [1, 2] },
                { label: "P2", y: 80, color: "#10B981", checkpoints: [1, 2] },
                { label: "P3", y: 130, color: "#A855F7", checkpoints: [1, 2] },
              ].map((proc, pi) => {
                const checkpointX = [100, 230];
                const currentCp = pi === 0 ? step.p1 : pi === 1 ? step.p2 : step.p3;
                return (
                  <g key={pi}>
                    <text x="15" y={proc.y + 4} fontSize="10" fill={proc.color} fontWeight="bold">{proc.label}</text>
                    {/* Linje */}
                    <line x1="40" y1={proc.y} x2={currentCp === 0 ? 60 : (currentCp === 1 ? 160 : 400)} y2={proc.y} stroke={proc.color} strokeWidth="2"/>
                    {/* Grayed-out del */}
                    {currentCp < 2 && (
                      <line x1={currentCp === 0 ? 60 : 160} y1={proc.y} x2={400} y2={proc.y} stroke={proc.color} strokeWidth="2" strokeOpacity="0.25" strokeDasharray="4,3"/>
                    )}
                    {/* Checkpoints */}
                    {checkpointX.map((cx, ci) => (
                      <g key={ci}>
                        <rect x={cx - 5} y={proc.y - 14} width="10" height="18" rx="2"
                          fill={ci + 1 <= currentCp ? proc.color : "#9CA3AF"}
                          fillOpacity={ci + 1 <= currentCp ? 0.8 : 0.3}
                        />
                        <text x={cx} y={proc.y + 22} textAnchor="middle" fontSize="8" fill={ci + 1 <= currentCp ? proc.color : "#9CA3AF"}>CP{ci + 1}</text>
                      </g>
                    ))}
                    {/* Crash marker for P3 */}
                    {pi === 2 && dominoStep >= 1 && (
                      <g>
                        <text x="385" y={proc.y + 4} fontSize="14" fill="#EF4444">✕</text>
                      </g>
                    )}
                  </g>
                );
              })}
              {/* Meldingspiler */}
              {dominoStep < 2 && (
                <g>
                  <line x1="170" y1="30" x2="220" y2="78" stroke="#6B7280" strokeWidth="1" markerEnd="url(#arrow)"/>
                  <line x1="250" y1="80" x2="300" y2="128" stroke="#6B7280" strokeWidth="1" markerEnd="url(#arrow)"/>
                </g>
              )}
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#6B7280"/>
                </marker>
              </defs>
              {/* Recovery line */}
              {step.highlight === "all-initial" && (
                <g>
                  <line x1="60" y1="10" x2="60" y2="150" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,2"/>
                  <text x="62" y="12" fontSize="9" fill="#EF4444" fontWeight="bold">Recovery line (initialtilstand!)</text>
                </g>
              )}
            </svg>
          </div>

          {/* Steg-kontroller */}
          <div className="flex gap-2 flex-wrap mb-3">
            {DOMINO_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setDominoStep(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  dominoStep === i
                    ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                    : "bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                {i + 1}. {s.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-[var(--background)] border border-[var(--card-border)] p-4">
            <p className={`font-semibold mb-1 ${step.highlight === "all-initial" ? "text-red-600 dark:text-red-400" : "text-blue-700 dark:text-blue-300"}`}>
              {step.label}
            </p>
            <p className="text-sm text-[var(--muted)]">{step.desc}</p>
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => setDominoStep(Math.max(0, dominoStep - 1))}
              disabled={dominoStep === 0}
              className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40"
            >
              ← Forrige
            </button>
            <span className="text-xs text-[var(--muted)] self-center">Steg {dominoStep + 1} av {DOMINO_STEPS.length}</span>
            <button
              onClick={() => setDominoStep(Math.min(DOMINO_STEPS.length - 1, dominoStep + 1))}
              disabled={dominoStep === DOMINO_STEPS.length - 1}
              className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40"
            >
              Neste →
            </button>
          </div>
        </div>
      </section>

      {/* Message logging */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Meldingslogging</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          I stedet for mange dyre checkpoints kan vi logge alle meldinger. Ved krasj: start fra siste checkpoint og <em>replay</em> alle loggede meldinger frem til krasjtidspunktet.
        </p>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 text-sm mb-4">
          <p className="font-medium mb-2">Orphan-prosesser</p>
          <p className="text-[var(--muted)]">
            Et <strong>orphan</strong> er en prosess som overlever krasjet til en annen prosess, men hvis tilstand er inkonsistent med den krasjede prosessens recovery-tilstand. For eksempel: prosess Q sendte melding m3 til R basert på melding m2 den fikk fra P. Hvis m2 ikke ble logget og P krasjer og gjenopptar fra checkpoint, vil m3 aldri bli sendt på nytt — R er nå i en inkonsistent tilstand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MSG_LOG_COMPARE.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveLogging(i)}
              className={`rounded-xl border-2 p-5 text-left transition-all ${
                activeLogging === i
                  ? m.color + " ring-2 ring-blue-500"
                  : "border-[var(--card-border)] bg-[var(--card)]"
              }`}
            >
              <p className="font-semibold mb-2">{m.type}</p>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Sikkerhet: {m.safety}</span>
                <span className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Ytelse: {m.performance}</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2">{m.desc}</p>
              <p className="text-xs italic text-[var(--muted)]">Avveiing: {m.tradeoff}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Sammenligningstabell */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Sammenligning: checkpoint vs meldingslogging</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 dark:bg-blue-900/30">
              <tr>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Egenskap</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Checkpoint alene</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Checkpoint + logging</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Recovery-punkt", "Siste checkpoint", "Siste checkpoint + replay"],
                ["Tap av arbeid", "Alt siden siste checkpoint", "Minimalt — logger alt mellom"],
                ["Overhead", "Stor checkpoint-kostnad", "Løpende logg-kostnad + sjeldnere checkpoints"],
                ["Kompleksitet", "Moderat", "Høy (orphan-håndtering)"],
                ["Koordinering", "Koordinert anbefales", "Fungerer med uavhengig"],
              ].map(([prop, cp, both], i) => (
                <tr key={prop} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}>
                  <td className="p-3 font-medium">{prop}</td>
                  <td className="p-3 text-[var(--muted)]">{cp}</td>
                  <td className="p-3 text-[var(--muted)]">{both}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Oppsummering */}
      <section className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
          <li>Bakover-gjenoppretting: rollback til checkpoint, generelt anvendelig</li>
          <li>Fremover-gjenoppretting: korriger fremover, krever domenekunnskap</li>
          <li>Konsistent global tilstand = recovery line</li>
          <li>Uavhengig checkpointing: enkel, men risikerer domino-effekten</li>
          <li>Koordinert checkpointing: 2-fase protokoll, garanterer konsistens</li>
          <li>Domino-effekten: cascading rollback helt til initialtilstand</li>
          <li>Pessimistisk logging: logg FØR levering — ingen orphans, dyr</li>
          <li>Optimistisk logging: logg asynkront — rask, men mulige orphans</li>
          <li>Orphan-prosess: inkonsistent tilstand etter recovery</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-8/teori/8-3" className="hover:text-[var(--accent)] text-sm">← 8.3 Pålitelig kommunikasjon</Link>
        <Link href="/dat110/ds-8/teori/8-5" className="hover:text-[var(--accent)] text-sm">8.5 Distribuert commit →</Link>
      </div>
    </div>
  );
}
