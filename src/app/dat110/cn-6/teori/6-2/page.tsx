"use client";

import Link from "next/link";
import { useState } from "react";

const CRC_STEPS = [
  {
    label: "Steg 1: Data = 1011, Generator G = 1001 (r=3 bits). Legg til r=3 nuller: D = 1011000",
    bits: "1011 000",
    highlight: "",
    forklaring: "Vi har data D = 1011 og generatorpolynomet G = 1001 med grad r = 3. Legg til r nuller bak dataene for å gjøre plass til CRC-bitene.",
  },
  {
    label: "Steg 2: Del 1011000 på 1001 (modulo-2 divisjon)",
    bits: "1011 000 ÷ 1001",
    forklaring: "Modulo-2 divisjon er XOR uten bæring. Vi tar de første r+1=4 bitene av dividenden og XOR-er med divisoren.",
  },
  {
    label: "Steg 3: 1011 XOR 1001 = 0010 — ta ned neste bit → 0100",
    bits: "1011 XOR 1001 = 0010 → 0100",
    forklaring: "XOR av 1011 og 1001: 1⊕1=0, 0⊕0=0, 1⊕0=1, 1⊕1=0 → 0010. Ta ned neste bit (0): 00100.",
  },
  {
    label: "Steg 4: 0010 < 1001, ta ned neste bit → 0100",
    bits: "0010 < 1001 → bring down → 0100",
    forklaring: "Siden 0010 er mindre enn divisoren 1001, tar vi ned neste bit (0) og får 0100.",
  },
  {
    label: "Steg 5: 0100 < 1001, ta ned neste bit → 1000",
    bits: "0100 < 1001 → bring down → 1000",
    forklaring: "0100 er fremdeles < 1001. Ta ned siste bit (0): 01000.",
  },
  {
    label: "Steg 6: 1000 < 1001 (ingen flere bits). Rest = 011 (3 bits) — dette er CRC!",
    bits: "Rest = 011 → CRC = 011",
    forklaring: "Vi er ferdig. Resten er 011 (3 bits, lik r). Senderen appender denne til dataene: 1011 011.",
  },
  {
    label: "Steg 7: Send 1011011. Mottaker deler på G=1001. Rest=000 → ingen feil!",
    bits: "1011011 ÷ 1001 → Rest = 000 ✓",
    forklaring: "Mottaker XOR-dividerer hele rammen på G. Hvis resten er 0 → ingen feil. Hvis ikke-null → feil detektert!",
  },
];

export default function CN6_2Page() {
  const [crcStep, setCrcStep] = useState(0);
  const [showParityTable, setShowParityTable] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.2 Feildeteksjon og korreksjon</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">6.2 Feildeteksjon og korreksjon</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Bitfeil oppstår når bits flippet under overføring. Linklaget bruker tre teknikker for å oppdage slike feil: paritetsbits, internett-checksum og CRC. Av disse er CRC det kraftigste og mest brukte i praksis.
        </p>
      </div>

      {/* Intuisjon */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Intuisjonen bak feildeteksjon</h2>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
          <p className="text-sm text-[var(--muted)]">
            Tenk på feildeteksjon som et kontrollsiffer på et bankkort eller ISBN-nummer. Avsenderen legger til ekstra bits (<strong>EDC — Error Detection and Correction bits</strong>) til dataene. Mottakeren sjekker om de ekstra bitene stemmer overens med de mottatte dataene. Om noe ikke stemmer, vet mottakeren at det har oppstått en feil.
          </p>
          <div className="mt-3 font-mono text-sm bg-[var(--card)] border border-[var(--card-border)] rounded p-3">
            <div className="flex gap-4">
              <div>
                <div className="text-xs text-[var(--muted)] mb-1">Sendt</div>
                <div className="flex gap-1">
                  <span className="bg-blue-500/20 px-2 py-1 rounded">D (data)</span>
                  <span className="bg-amber-500/20 px-2 py-1 rounded">EDC</span>
                </div>
              </div>
              <div className="flex items-center text-[var(--muted)]">→ kanal med støy →</div>
              <div>
                <div className="text-xs text-[var(--muted)] mb-1">Mottatt</div>
                <div className="flex gap-1">
                  <span className="bg-blue-500/20 px-2 py-1 rounded">D' (mulig feil)</span>
                  <span className="bg-amber-500/20 px-2 py-1 rounded">EDC'</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paritetsbits */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Teknikk 1: Paritetsbits</h2>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">Enkel paritet (Single parity bit)</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Legg til én paritet-bit slik at antall 1-ere i rammen blir partall (even parity) eller oddetall (odd parity). Svært enkelt, men oppdager bare <strong>én</strong> bitfeil — to feil kansellerer hverandre.
          </p>
          <div className="font-mono text-sm bg-[var(--card)] border border-[var(--card-border)] rounded p-3">
            <div>Data: 1011011</div>
            <div>Antall 1-ere: 5 (oddetall)</div>
            <div>Even parity bit: <span className="text-amber-500 font-bold">1</span></div>
            <div>Sendt: 1011011<span className="text-amber-500">1</span> → 6 enere = partall ✓</div>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">2D paritet (Two-dimensional parity)</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Organiser bits i et rutenett. Beregn paritetsbits for <strong>hver rad og kolonne</strong>. Dette kan oppdage OG korrigere enkeltbitfeil, og oppdage (men ikke korrigere) dobbeltbitfeil.
          </p>
          <button
            onClick={() => setShowParityTable(!showParityTable)}
            className="text-sm text-[var(--accent)] hover:underline mb-3"
          >
            {showParityTable ? "▲ Skjul eksempel" : "▼ Vis 2D-paritet eksempel"}
          </button>
          {showParityTable && (
            <div className="overflow-x-auto">
              <table className="font-mono text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="border border-[var(--card-border)] px-3 py-1 text-[var(--muted)]">Rad</th>
                    <th className="border border-[var(--card-border)] px-3 py-1">b1</th>
                    <th className="border border-[var(--card-border)] px-3 py-1">b2</th>
                    <th className="border border-[var(--card-border)] px-3 py-1">b3</th>
                    <th className="border border-[var(--card-border)] px-3 py-1">b4</th>
                    <th className="border border-[var(--card-border)] px-3 py-1 bg-amber-500/20">Paritet</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Rad 1", "1", "0", "1", "1", "1"],
                    ["Rad 2", "0", "1", "1", "0", "0"],
                    ["Rad 3", "1", "1", "0", "1", "1"],
                    ["Rad 4", "0", "0", "1", "1", "0"],
                  ].map((rad) => (
                    <tr key={rad[0]}>
                      {rad.map((celle, i) => (
                        <td key={i} className={`border border-[var(--card-border)] px-3 py-1 text-center ${i === 5 ? "bg-amber-500/20" : ""}`}>
                          {celle}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-amber-500/20">
                    <td className="border border-[var(--card-border)] px-3 py-1 text-[var(--muted)]">Kolparitet</td>
                    <td className="border border-[var(--card-border)] px-3 py-1 text-center">0</td>
                    <td className="border border-[var(--card-border)] px-3 py-1 text-center">0</td>
                    <td className="border border-[var(--card-border)] px-3 py-1 text-center">1</td>
                    <td className="border border-[var(--card-border)] px-3 py-1 text-center">1</td>
                    <td className="border border-[var(--card-border)] px-3 py-1 text-center">—</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-[var(--muted)] mt-2">
                Om en bit flippet, vil feil rad-paritet OG feil kolonne-paritet avsløre eksakt posisjon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Internett-checksum */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Teknikk 2: Internett-checksum</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-3">
            Brukt av TCP, UDP og IP (ikke av linklaget, men viktig å kjenne til). Behandler data som en sekvens av 16-bits heltall og summerer dem (med overflyt lagt tilbake). Checksummen er bitkomplementet av summen.
          </p>
          <div className="font-mono text-sm bg-[var(--card)] border border-[var(--card-border)] rounded p-3 space-y-1">
            <div>Segment: [0110011001100000] + [0101010101010101] + [1000111100001100]</div>
            <div>Sum: 0110011001100000 + 0101010101010101 = 1011101110110101</div>
            <div>+ 1000111100001100 = 0100101011000010 (med overflyt tilbake)</div>
            <div>Checksum = komplement = <span className="text-amber-500">1011010100111101</span></div>
          </div>
          <p className="text-sm text-[var(--muted)] mt-2">
            Mottakeren summerer alle 16-bits ord inkludert checksum — resultatet skal være 1111111111111111.
          </p>
        </div>
      </section>

      {/* CRC */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Teknikk 3: CRC — Cyclic Redundancy Check</h2>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
          <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Hvorfor CRC?</p>
          <p className="text-sm text-[var(--muted)]">
            CRC er den sterkeste av de tre teknikkene og brukes i Ethernet, WiFi og de fleste moderne linklager. CRC kan oppdage <strong>burst-feil</strong> (mange bits i rad flippet) av lengde opp til r bits, og alle enkelt- og dobbeltbitfeil.
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5 space-y-3">
          <h3 className="font-semibold">CRC-konseptet</h3>
          <p className="text-sm text-[var(--muted)]">
            Avsender og mottaker er enige om et <strong>generatorpolynom G</strong> med r+1 bits. Avsenderen beregner r CRC-bits slik at den utvidede meldingen (D appended med CRC) er delelig med G (i modulo-2 aritmetikk). Mottakeren deler mottatt ramme på G — hvis resten er 0, ingen feil.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Modulo-2 aritmetikk</h4>
              <p className="text-sm text-[var(--muted)] mb-2">XOR uten bæring eller lån:</p>
              <div className="font-mono text-sm space-y-1">
                <div>1 ⊕ 1 = 0</div>
                <div>1 ⊕ 0 = 1</div>
                <div>0 ⊕ 1 = 1</div>
                <div>0 ⊕ 0 = 0</div>
              </div>
            </div>
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Nøkkelbegreper</h4>
              <ul className="text-sm text-[var(--muted)] space-y-1">
                <li><strong>D</strong> = databitene</li>
                <li><strong>G</strong> = generatorpolynom (r+1 bits)</li>
                <li><strong>r</strong> = graden av G = antall CRC-bits</li>
                <li><strong>CRC</strong> = resten av D·2ʳ ÷ G</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interaktivt CRC-eksempel */}
        <div className="bg-[var(--card)] border-2 border-blue-500/40 rounded-xl p-6">
          <h3 className="font-bold mb-1">Interaktivt CRC-eksempel</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            Data D = 1011, Generator G = 1001 (r = 3). Trykk "Neste steg" for å se beregningen steg for steg.
          </p>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4 mb-4 min-h-[120px]">
            <div className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">
              {CRC_STEPS[crcStep].label}
            </div>
            <div className="font-mono text-lg mb-3 text-amber-500">{CRC_STEPS[crcStep].bits}</div>
            <div className="text-sm text-[var(--muted)]">{CRC_STEPS[crcStep].forklaring}</div>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setCrcStep(Math.max(0, crcStep - 1))}
              disabled={crcStep === 0}
              className="px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm disabled:opacity-40 hover:border-[var(--accent)] transition-colors"
            >
              ← Forrige
            </button>
            <span className="text-sm text-[var(--muted)]">Steg {crcStep + 1} av {CRC_STEPS.length}</span>
            <button
              onClick={() => setCrcStep(Math.min(CRC_STEPS.length - 1, crcStep + 1))}
              disabled={crcStep === CRC_STEPS.length - 1}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-40 hover:bg-blue-700 transition-colors"
            >
              Neste →
            </button>
            <button
              onClick={() => setCrcStep(0)}
              className="text-sm text-[var(--muted)] hover:text-[var(--accent)] ml-auto"
            >
              ↺ Start på nytt
            </button>
          </div>
          <div className="flex gap-1 mt-3">
            {CRC_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCrcStep(i)}
                className={`h-2 flex-1 rounded-full transition-colors ${i === crcStep ? "bg-blue-500" : i < crcStep ? "bg-blue-500/40" : "bg-[var(--card-border)]"}`}
              />
            ))}
          </div>
        </div>

        {/* CRC oppsummering */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">Hva CRC kan oppdage</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { type: "Alle enkeltbitfeil", status: "✓ Alltid", farve: "text-green-500" },
              { type: "Alle dobbeltbitfeil", status: "✓ Alltid", farve: "text-green-500" },
              { type: "Burst-feil (≤ r bits)", status: "✓ Alltid", farve: "text-green-500" },
              { type: "Burst-feil (= r+1 bits)", status: "≈ Nesten alltid", farve: "text-amber-500" },
              { type: "Burst-feil (> r+1 bits)", status: "Med sannsynlighet 1-2⁻ʳ", farve: "text-amber-500" },
            ].map((r) => (
              <div key={r.type} className="border border-[var(--card-border)] rounded-lg p-3 text-sm">
                <div className="font-semibold mb-1">{r.type}</div>
                <div className={r.farve}>{r.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sammenligning */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Sammenligning av teknikkene</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border border-[var(--card-border)] px-4 py-2 text-left">Teknikk</th>
                <th className="border border-[var(--card-border)] px-4 py-2 text-left">Overhead</th>
                <th className="border border-[var(--card-border)] px-4 py-2 text-left">Oppdager</th>
                <th className="border border-[var(--card-border)] px-4 py-2 text-left">Brukt i</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Enkel paritet", "1 bit", "Enkeltbitfeil (50% av dobbelt)", "Noen eldre systemer"],
                ["2D paritet", "√n bits", "Alle enkeltbitfeil + kan korrigere", "Minnechips (DRAM ECC)"],
                ["Internett-checksum", "16 bits", "Mange feil, men svakere enn CRC", "TCP, UDP, IP-header"],
                ["CRC (32-bit)", "32 bits", "Burst-feil ≤ 32 bits, alle 1/2-bitfeil", "Ethernet, WiFi, USB, ZIP"],
              ].map((r) => (
                <tr key={r[0]} className="hover:bg-[var(--card)] transition-colors">
                  <td className="border border-[var(--card-border)] px-4 py-2 font-semibold">{r[0]}</td>
                  <td className="border border-[var(--card-border)] px-4 py-2">{r[1]}</td>
                  <td className="border border-[var(--card-border)] px-4 py-2">{r[2]}</td>
                  <td className="border border-[var(--card-border)] px-4 py-2 text-[var(--muted)]">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Eksamen-tips */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Eksamentips</h2>
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-5">
          <ul className="space-y-2 text-sm">
            {[
              "Kan du CRC-beregning for hånd? Øv på eksempelet over — modulo-2 divisjon er XOR uten bæring.",
              "Generatorpolynomet G må alltid starte og slutte med 1.",
              "CRC-bitene er resten av D·2ʳ dividert med G (modulo-2). Husk å legge til r nuller!",
              "Mottaker kjører samme divisjon — rest=0 betyr ingen feil, rest≠0 betyr feil.",
              "CRC er sterkere enn checksum fordi det fanger burst-feil. Checksum kan misse feil som CRC ville fanget.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 font-bold shrink-0">★</span>
                <span className="text-[var(--muted)]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-1" className="hover:text-[var(--accent)] text-sm">
          ← 6.1 Introduksjon til linklaget
        </Link>
        <Link href="/dat110/cn-6/teori/6-3" className="hover:text-[var(--accent)] text-sm">
          6.3 Multiple-access-protokoller →
        </Link>
      </div>
    </div>
  );
}
