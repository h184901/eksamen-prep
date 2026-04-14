"use client";

import { useState } from "react";

export default function DS4FormlerPage() {
  const [visForklaring, setVisForklaring] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Nøkkelkonsepter og formlar</h1>
      <p className="text-[var(--muted)] mb-6 text-sm">
        DS Kapittel 4 — Viktige formlar, omgrep og «når brukar du kva»-guide
      </p>

      {/* ── RDP-FORMELEN ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span>
          RDP — Relative Delay Penalty (Stretch)
        </h2>

        <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-5 mb-4">
          <div className="text-center mb-4">
            <div className="inline-block bg-white dark:bg-gray-900 rounded-xl px-8 py-4 border border-yellow-300 shadow-sm">
              <div className="text-2xl font-bold text-center font-mono text-blue-700 dark:text-blue-300">
                RDP = D<sub>overlay</sub> / D<sub>nettverk</sub>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Variablar:</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><strong>D_overlay</strong> — forsinkinga langs overlay-stigen mellom to noder</li>
                <li><strong>D_nettverk</strong> — forsinkinga langs den beste fysiske nettverksstigen</li>
                <li><strong>RDP = 1.0</strong> — perfekt, ingen overhead</li>
                <li><strong>RDP &gt; 1.0</strong> — overlay-stigen er lenger enn optimal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Korleis berekne:</h4>
              <ol className="space-y-1 text-[var(--muted)] list-decimal list-inside text-xs">
                <li>Finn overlay-stigen mellom noder A og B (følg overlay-kantar)</li>
                <li>Summer alle fysiske lenkje-forsinkelsar langs overlay-stigen</li>
                <li>Finn beste fysiske sti mellom A og B direkte</li>
                <li>Del overlay-forsinkelse på nettverks-forsinkelse</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h4 className="font-semibold mb-3">Rekneeksempel (frå forelesinga)</h4>
          <p className="text-sm text-[var(--muted)] mb-3">
            Nettverk: A(1)-Ra, Ra(7)-Rb, Rb(1)-B, Ra(30)-Re, Re(20)-Rc, Re(1)-E,
            Rc(5)-Rd, Rc(1)-C, Rd(1)-D, Rb(40)-Rd
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 font-mono text-xs">
            <p className="text-blue-600 font-bold mb-2">RDP for B til C:</p>
            <p className="text-[var(--muted)]">Overlay-sti: B→Rb→Ra→Re→E→Re→Rc→Rd→D→Rd→Rc→C</p>
            <p className="text-[var(--muted)]">= 1+7+30+1+1+20+5+1+1+5+1 = <strong className="text-red-600">73</strong></p>
            <p className="text-[var(--muted)] mt-2">Nettverks-sti: B→Rb→Rd→Rc→C</p>
            <p className="text-[var(--muted)]">= 1+40+5+1 = <strong className="text-green-600">47</strong></p>
            <p className="text-blue-600 font-bold mt-2">RDP = 73 / 47 ≈ 1.55</p>
          </div>
        </div>
      </section>

      {/* ── ALM-KOSTNADAR ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span>
          ALM-kostnadar: 3 metrikkar
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl border-2 border-red-300 dark:border-red-700 bg-[var(--card)] p-4">
            <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">Link Stress</h3>
            <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3 text-center mb-3">
              <p className="text-sm font-mono font-bold">S(l) = antal ganger lenkje l kryssast</p>
            </div>
            <p className="text-xs text-[var(--muted)]">
              Tell kor mange ganger ein fysisk lenkje ⟨u,v⟩ kryssast av alle overlay-meldingane.
              Høgt stressnivå = lenkja er flaskehals.
            </p>
          </div>

          <div className="rounded-xl border-2 border-yellow-300 dark:border-yellow-700 bg-[var(--card)] p-4">
            <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Stretch / RDP</h3>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-3 text-center mb-3">
              <p className="text-sm font-mono font-bold">RDP = D_ALM / D_nett</p>
            </div>
            <p className="text-xs text-[var(--muted)]">
              Lokalt mål mellom to noder. Viser kor mykje lenger overlay-stigen er
              samanlikna med den optimale fysiske stigen.
            </p>
          </div>

          <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-[var(--card)] p-4">
            <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">Tree Cost</h3>
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-center mb-3">
              <p className="text-sm font-mono font-bold">C(T) = sum av alle lenkje-kostnadar i T</p>
            </div>
            <p className="text-xs text-[var(--muted)]">
              Globalt mål for heile treet. Summen av alle forsinkingane i spanntreet.
              Målet: minimum spanntre (MST).
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h4 className="font-semibold mb-3">Tree Cost — Rekneeksempel (frå forelesinga)</h4>
          <p className="text-xs text-[var(--muted)] mb-3">
            Overlay-nettverk med 5 prosessar A, B, C, D, E og kantane:
            A-B=9, A-E=32, A-C=52, A-D=47, B-E=39, B-C=62, B-D=37, E-C=22, E-D=27, E-A=32, C-D=7
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-950/30">
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Spanntre</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Kantar</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Kostnad</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Merknad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Tre 1</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">A-B(9) + B-E(39) + E-D(27) + D-C(7)</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono">82</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]"></td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/20">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-medium text-green-700 dark:text-green-300">Tre 2 (MST)</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">A-B(9) + A-E(32) + E-C(22) + C-D(7)</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono font-bold text-green-700">70</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-green-700 dark:text-green-300">Minimum!</td>
                </tr>
                <tr>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Tre 3</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">A-B(9) + A-E(32) + E-C(22) + B-D(49)</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono">112</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FLOODING ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</span>
          Flooding-basert multicast — meldingstal
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-[var(--card)] p-5">
            <h3 className="font-bold mb-3">Strukturert nettverk</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                <p className="text-sm font-bold font-mono text-blue-700 dark:text-blue-300">Tre: M = N - 1</p>
                <p className="text-xs text-[var(--muted)] mt-1">(optimalt — kvar node besøkt éin gong)</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-3 text-center">
                <p className="text-sm font-bold font-mono text-orange-700 dark:text-orange-300">Fullt mesh: M = ½ · N · (N-1)</p>
                <p className="text-xs text-[var(--muted)] mt-1">(worst-case)</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-[var(--card)] p-5">
            <h3 className="font-bold mb-3">Ustrukturert nettverk (Random Graph)</h3>
            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 text-center mb-3">
              <p className="text-sm font-bold font-mono text-purple-700 dark:text-purple-300">M = ½ · N · (N-1) · p_edge</p>
            </div>
            <p className="text-xs text-[var(--muted)]">
              <strong>p_edge</strong> = sannsyn for at to noder er knytt saman.
              Høgare p_edge = fleire kantar = fleire meldingar = dyrare.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h4 className="font-semibold mb-3">Rekneeksempel (frå øvingsoppgåve)</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 dark:bg-gray-900/30 rounded p-3">
              <p className="font-medium mb-2">Oppg 1: N=100000 noder, p=0.2</p>
              <div className="font-mono text-xs text-[var(--muted)] space-y-1">
                <p>M = ½ · 100000 · 99999 · 0.2</p>
                <p>M = ½ · 100000 · 99999 · 0.2</p>
                <p className="text-green-600 font-bold">M ≈ 999 990 000 meldingar</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/30 rounded p-3">
              <p className="font-medium mb-2">Oppg 2: Tre vs mesh (N=500)</p>
              <div className="font-mono text-xs text-[var(--muted)] space-y-1">
                <p>Tre: M = 500 - 1 = <strong>499</strong></p>
                <p>Mesh: M = ½ · 500 · 499 = <strong>124 750</strong></p>
                <p className="text-blue-600 font-bold">Totalt: 499 + 124 750 = 125 249</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MQTT QOS ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">4</span>
          MQTT QoS — Samanlikning
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left">QoS</th>
                <th className="px-4 py-3 text-left">Leveringsgaranti</th>
                <th className="px-4 py-3 text-left">Handshake</th>
                <th className="px-4 py-3 text-left">Lagring</th>
                <th className="px-4 py-3 text-left">Overhead</th>
                <th className="px-4 py-3 text-left">Brukstilfelle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)] bg-[var(--card)]">
                <td className="px-4 py-3">
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded font-bold text-xs">QoS 0</span>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">At-most-once (maks éin gong)</td>
                <td className="px-4 py-3 text-[var(--muted)] font-mono text-xs">PUBLISH</td>
                <td className="px-4 py-3 text-[var(--muted)]">Ingen</td>
                <td className="px-4 py-3 text-[var(--muted)]">Minst</td>
                <td className="px-4 py-3 text-[var(--muted)]">Sensor-telemetri (ok å miste)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)] bg-[var(--card)]">
                <td className="px-4 py-3">
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded font-bold text-xs">QoS 1</span>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">At-least-once (minst éin gong)</td>
                <td className="px-4 py-3 text-[var(--muted)] font-mono text-xs">PUBLISH → PUBACK</td>
                <td className="px-4 py-3 text-[var(--muted)]">Til PUBACK</td>
                <td className="px-4 py-3 text-[var(--muted)]">Middels</td>
                <td className="px-4 py-3 text-[var(--muted)]">Dørsensar, kritisk tilstand</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="px-4 py-3">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded font-bold text-xs">QoS 2</span>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">Exactly-once (nøyaktig éin gong)</td>
                <td className="px-4 py-3 text-[var(--muted)] font-mono text-xs">PUBLISH→PUBREC→PUBREL→PUBCOMP</td>
                <td className="px-4 py-3 text-[var(--muted)]">Til PUBCOMP</td>
                <td className="px-4 py-3 text-[var(--muted)]">Mest</td>
                <td className="px-4 py-3 text-[var(--muted)]">Finansielle transaksjonar, alarmar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── ANTI-ENTROPY ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">5</span>
          Gossip / Anti-entropy — Formlar
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              model: "Pull",
              formula: "p_{i+1} = (p_i)²",
              color: "border-blue-400",
              bg: "bg-blue-50 dark:bg-blue-950/20",
              forklaring: "Mottakeleg nabo (S) tek kontakt med tilfeldig nabo. Effektivt seint i prosessen.",
            },
            {
              model: "Push",
              formula: "p_{i+1} = p_i · (1 - 1/n)^{n(1-p_i)}",
              color: "border-green-400",
              bg: "bg-green-50 dark:bg-green-950/20",
              forklaring: "Infisert nabo (I) sender til tilfeldig nabo. Effektivt tidleg i prosessen.",
            },
            {
              model: "Push-Pull",
              formula: "p_{i+1} = p_push · p_pull",
              color: "border-purple-400",
              bg: "bg-purple-50 dark:bg-purple-950/20",
              forklaring: "Kombinerer begge. Raskast konvergens totalt sett.",
            },
          ].map((m) => (
            <div key={m.model} className={`rounded-xl border-2 ${m.color} ${m.bg} p-4`}>
              <h3 className="font-bold mb-2">{m.model}</h3>
              <div className="bg-white dark:bg-gray-900 rounded p-2 text-center font-mono text-sm mb-3">
                {m.formula}
              </div>
              <p className="text-xs text-[var(--muted)]">{m.forklaring}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h4 className="font-semibold mb-3">Rekneeksempel (frå professorens øvingsoppgåve)</h4>
          <p className="text-xs text-[var(--muted)] mb-3">
            Distribuert system med 1000 noder. Runde i: Infiserte = 400, Mottakelege = 600, Fjerna = 0.
            p_i = 400/1000 = 0.4, n = 1000
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-3">
              <p className="font-bold text-blue-600 mb-1">Pull:</p>
              <p className="text-[var(--muted)]">p_i+1 = (0.4)² = 0.16</p>
              <p className="text-[var(--muted)]">16% forblir mottakeleg</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
              <p className="font-bold text-green-600 mb-1">Push:</p>
              <p className="text-[var(--muted)]">p_i+1 = 0.4·(1-1/1000)^(1000·0.6)</p>
              <p className="text-[var(--muted)]">= 0.4·(0.999)^600 ≈ 0.4·0.549 ≈ 0.22</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 rounded p-3">
              <p className="font-bold text-purple-600 mb-1">Push-Pull:</p>
              <p className="text-[var(--muted)]">p_i+1 = 0.22 · 0.16 = 0.035</p>
              <p className="text-[var(--muted)]">Berre 3.5% forblir mottakeleg!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NÅR BRUKER DU KVA ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">!</span>
          Når brukar du kva — guide
        </h2>

        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-amber-100 dark:bg-amber-900/30">
                  <th className="border border-amber-300 px-3 py-2 text-left">Situasjon</th>
                  <th className="border border-amber-300 px-3 py-2 text-left">Bruk</th>
                  <th className="border border-amber-300 px-3 py-2 text-left">Kvifor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { situation: "Finn overlay-forsinkelse mellom to noder", bruk: "Sum alle lenkjeforsinkelsar langs overlay-stigen", kvifor: "Følg overlay-kantane, ikkje kortaste fysiske sti" },
                  { situation: "Samanlikn overlay vs fysisk sti", bruk: "RDP = D_overlay / D_nett", kvifor: "RDP < 1 er umogleg, RDP = 1 er perfekt" },
                  { situation: "Finn beste spanntre for overlay", bruk: "Kruskal / Prim MST-algoritme", kvifor: "Minimér sum av alle kantforsinkelsar" },
                  { situation: "IoT-sensor, tap er ok", bruk: "MQTT QoS 0", kvifor: "Lavast overhead, data kjem inn kontinuerleg" },
                  { situation: "Kritisk tilstand-endring", bruk: "MQTT QoS 1", kvifor: "Meldinga kjem fram, applikasjon forkastas duplikat via ID" },
                  { situation: "Finansiell transaksjon / alarm", bruk: "MQTT QoS 2", kvifor: "Nøyaktig éin gong — duplikat kan gi feil handling" },
                  { situation: "Kan ikkje skilje krasja fra tapt svar", bruk: "RPC-feilklasse 3 eller 4", kvifor: "At-least-once vs at-most-once semantikk — bruk idempotente kall" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-amber-50/50 dark:bg-amber-950/10" : "bg-white dark:bg-gray-900"}>
                    <td className="border border-amber-200 dark:border-amber-800 px-3 py-2 text-[var(--muted)]">{row.situation}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-3 py-2 font-medium">{row.bruk}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-3 py-2 text-[var(--muted)] text-xs">{row.kvifor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
