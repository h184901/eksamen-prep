"use client";

function FormulaBox({ label, formula, color, children }: {
  label: string;
  formula: string;
  color: "gold" | "blue" | "red" | "green" | "network";
  children?: React.ReactNode;
}) {
  const colors = {
    gold:    "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
    blue:    "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
    red:     "border-red-400 bg-red-50 dark:bg-red-950/20",
    green:   "border-green-400 bg-green-50 dark:bg-green-950/20",
    network: "border-network-400 bg-network-50 dark:bg-network-950/20",
  };
  const labelColors = {
    gold:    "bg-amber-400 text-white",
    blue:    "bg-blue-500 text-white",
    red:     "bg-red-500 text-white",
    green:   "bg-green-600 text-white",
    network: "bg-network-600 text-white",
  };
  return (
    <div className={`rounded-xl border-2 ${colors[color]} overflow-hidden my-4`}>
      <div className={`${labelColors[color]} px-4 py-1.5 text-xs font-bold uppercase tracking-wide`}>{label}</div>
      <div className="px-5 py-4">
        <div className="font-mono text-base font-bold text-center mb-3 bg-white dark:bg-neutral-900 rounded-lg py-3 border border-[var(--card-border)]">
          {formula}
        </div>
        {children}
      </div>
    </div>
  );
}

function VarRow({ sym, meaning }: { sym: string; meaning: string }) {
  return (
    <div className="flex gap-3 text-sm py-1 border-b border-[var(--card-border)] last:border-0">
      <span className="font-mono font-bold text-network-700 dark:text-network-300 min-w-[130px]">{sym}</span>
      <span className="text-[var(--muted)]">{meaning}</span>
    </div>
  );
}

export default function CN3FormlerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Formler — Transportlaget</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        CN Kapittel 3 — TCP-throughput, RTT-estimering, utnyttelsesgrad, vindusbasert feil-kontroll og congestion control
      </p>

      {/* ── Hurtigoversikt ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Rask oversikt — «Når bruker du hva?»</h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-network-50 dark:bg-network-950/20">
                <th className="text-left p-3 border border-[var(--card-border)]">Situasjon</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Formel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Estimert TCP-throughput", "≈ (MSS/RTT) · (1/√L)"],
                ["Estimere RTT (EWMA)", "EstimatedRTT = (1−α)·EstimatedRTT + α·SampleRTT"],
                ["RTT-variasjon (DevRTT)", "DevRTT = (1−β)·DevRTT + β·|SampleRTT − EstimatedRTT|"],
                ["Timeout-intervall", "TimeoutInterval = EstimatedRTT + 4·DevRTT"],
                ["Utnyttelsesgrad (utilization)", "U = (L/R) / (RTT + L/R)"],
                ["GBN vindu (window size)", "W ≤ 2^k − 1  (k = sekvensnummer-bits)"],
                ["SR vindu (window size)", "W ≤ 2^(k−1)  (halvparten av sekvensnummerrommet)"],
                ["AIMD: øk cwnd per ACK (CA)", "cwnd += MSS²/cwnd"],
                ["AIMD: kutt ved pakketap (Reno)", "ssthresh = cwnd/2, cwnd = ssthresh"],
              ].map(([situation, formula]) => (
                <tr key={situation} className="border-b border-[var(--card-border)]">
                  <td className="p-3 border border-[var(--card-border)]">{situation}</td>
                  <td className="p-3 font-mono text-xs text-network-700 dark:text-network-300 border border-[var(--card-border)]">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── TCP throughput ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">TCP-throughput</h2>

        <FormulaBox label="TCP-gjennomstrømning — approksimering" formula="Throughput ≈ (MSS / RTT) · (1 / √L)" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="Throughput" meaning="Gjennomsnittlig throughput i bytes/sek" />
            <VarRow sym="MSS" meaning="Maximum Segment Size — maksimal TCP-segmentstørrelse" />
            <VarRow sym="RTT" meaning="Round-Trip Time" />
            <VarRow sym="L" meaning="Pakketapssannsynlighet (0 < L < 1)" />
            <VarRow sym="1/√L" meaning="Throughput synker med kvadratroten av tapssannsynligheten" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Intuisjon:</p>
            <p>Jo lavere tapssannsynlighet (L) og jo kortere RTT, jo høyere throughput. TCP begrenses av nettverkstap — AIMD-algoritmen reduserer cwnd ved tap.</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── RTT-estimering ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">RTT-estimering og timeout</h2>

        <FormulaBox label="EstimatedRTT — eksponentiell vektet gjennomsnitt (EWMA)" formula="EstimatedRTT = (1−α)·EstimatedRTT + α·SampleRTT" color="network">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="α" meaning="Vektfaktor for nye målinger — standard α = 0.125 (1/8)" />
            <VarRow sym="SampleRTT" meaning="Sist målte RTT for ett segment" />
            <VarRow sym="EstimatedRTT" meaning="Glidende gjennomsnitt av RTT" />
            <VarRow sym="(1−α)" meaning="0.875 — vekten av historisk gjennomsnitt" />
          </div>
          <div className="rounded-lg bg-network-100 dark:bg-network-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Eksempel (α=0.125):</p>
            <p>EstimatedRTT = 80 ms, SampleRTT = 100 ms</p>
            <p className="font-mono">Ny EstimatedRTT = 0.875·80 + 0.125·100 = 70 + 12.5 = 82.5 ms</p>
          </div>
        </FormulaBox>

        <FormulaBox label="DevRTT — RTT-variasjon" formula="DevRTT = (1−β)·DevRTT + β·|SampleRTT − EstimatedRTT|" color="blue">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="β" meaning="Vektfaktor for variasjon — standard β = 0.25 (1/4)" />
            <VarRow sym="|SampleRTT − EstimatedRTT|" meaning="Absolutt avvik mellom siste måling og estimat" />
            <VarRow sym="DevRTT" meaning="Eksponentiell vektet gjennomsnitt av RTT-variasjon" />
          </div>
        </FormulaBox>

        <FormulaBox label="TimeoutInterval — TCP retransmission timeout" formula="TimeoutInterval = EstimatedRTT + 4·DevRTT" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="EstimatedRTT" meaning="Gjennomsnittlig RTT" />
            <VarRow sym="4·DevRTT" meaning="Sikkerhetsmargin — 4 standardavvik-ekvivalenter" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Intuisjon:</p>
            <p>Timeout settes høyere enn forventet RTT for å unngå unødvendige retransmisjoner. Jo mer variabel RTT (høy DevRTT), jo høyere timeout-margin.</p>
            <p className="mt-1">Etter timeout: TimeoutInterval dobles (exponential backoff)!</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── Utnyttelsesgrad ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Utnyttelsesgrad (Utilization)</h2>

        <FormulaBox label="Link-utnyttelsesgrad" formula="U = (L/R) / (RTT + L/R)" color="green">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="U" meaning="Utnyttelsesgrad — andel av linken som faktisk brukes (0–1)" />
            <VarRow sym="L" meaning="Pakkestørrelse i bits" />
            <VarRow sym="R" meaning="Linkkapasitet / båndbredde i bps" />
            <VarRow sym="L/R" meaning="Overforingstid — tid for å sende pakken" />
            <VarRow sym="RTT" meaning="Round-trip time" />
          </div>
          <div className="rounded-lg bg-green-100 dark:bg-green-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Stop-and-wait: U = (L/R) / (RTT + L/R)</p>
            <p>Med pipeline og vindusst. W: U_pipeline = W·(L/R) / (RTT + L/R)</p>
            <p className="mt-1 font-mono">Eksempel: L=1000b, R=1 Gbps, RTT=30ms → L/R=0.001ms → U ≈ 0.0033% (nesten ingenting!)</p>
          </div>
        </FormulaBox>

        <FormulaBox label="Pipeline-utnyttelse med vindu W" formula="U_pipeline = W · (L/R) / (RTT + L/R)" color="blue">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="W" meaning="Vindusst. — antall ubekreftede segmenter som kan sendes" />
          </div>
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">For full utnyttelse (U=1): W ≥ RTT/( L/R ) + 1</p>
            <p>Eksempel: RTT=30ms, L/R=1ms → trenger W ≥ 31 segmenter i transit</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── GBN vs SR ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">GBN vs. SR — vindustørrelsesregler</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormulaBox label="Go-Back-N (GBN) vindusregel" formula="W_GBN ≤ 2^k − 1" color="blue">
            <div className="space-y-0.5 mb-3">
              <VarRow sym="k" meaning="Antall bits i sekvensnummerfeltet" />
              <VarRow sym="2^k" meaning="Totalt sekvensnummerrom" />
              <VarRow sym="2^k − 1" meaning="Maks vindu — reserverer ett nummer for å skille fullstendig vindu fra tomt" />
            </div>
            <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2 text-xs">
              <p className="font-bold mb-1">Eksempel (k=3):</p>
              <p>Sekvensnr: 0–7 (8 numre), W_max = 7</p>
              <p className="mt-1">Ved tap: retransmitter ALT fra tapte segment (go back to N).</p>
            </div>
          </FormulaBox>

          <FormulaBox label="Selective Repeat (SR) vindusregel" formula="W_SR ≤ 2^(k−1)" color="green">
            <div className="space-y-0.5 mb-3">
              <VarRow sym="k" meaning="Antall bits i sekvensnummerfeltet" />
              <VarRow sym="2^(k−1)" meaning="Maks vindu = halvparten av sekvensnummerrommet" />
            </div>
            <div className="rounded-lg bg-green-100 dark:bg-green-900/30 px-3 py-2 text-xs">
              <p className="font-bold mb-1">Eksempel (k=3):</p>
              <p>Sekvensnr: 0–7 (8 numre), W_max = 4</p>
              <p className="mt-1">Kun tapte segmenter retransmitteres. Mottaker buffrer seg-ut-av-rekkefølge.</p>
            </div>
          </FormulaBox>
        </div>

        <div className="rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-5 mt-2">
          <h3 className="font-semibold mb-3">GBN vs. SR — sammenligning</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">GBN</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">SR</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Maks vindu (k=3)", "7 (2^k − 1)", "4 (2^(k−1))"],
                  ["Retransmisjon ved tap", "Alle fra tapt segment", "Kun tapte segment(er)"],
                  ["Mottaker-buffer", "Nei — kaster out-of-order", "Ja — buffrer out-of-order"],
                  ["Overhead", "Høyere ved tap", "Lavere — effektiv"],
                  ["Implementasjonskompleksitet", "Enklere", "Mer kompleks"],
                ].map(([prop, gbn, sr]) => (
                  <tr key={prop} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-medium">{prop}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs font-mono text-blue-700 dark:text-blue-300">{gbn}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs font-mono text-green-700 dark:text-green-300">{sr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Congestion Control ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">TCP Congestion Control — AIMD</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-5">
            <h3 className="font-bold mb-3 text-amber-700 dark:text-amber-400">Slow Start (SS)</h3>
            <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 font-mono text-sm text-center mb-3 border border-[var(--card-border)]">
              cwnd += MSS per ACK (dobling per RTT)
            </div>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <p>Start: cwnd = 1 MSS</p>
              <p>Per ACK: cwnd += 1 MSS → eksponentiell vekst</p>
              <p>Stopper når cwnd ≥ ssthresh</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5">
            <h3 className="font-bold mb-3 text-blue-700 dark:text-blue-400">Congestion Avoidance (CA)</h3>
            <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 font-mono text-sm text-center mb-3 border border-[var(--card-border)]">
              cwnd += MSS² / cwnd per ACK (lineær)
            </div>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <p>Aktiv når cwnd ≥ ssthresh</p>
              <p>Effekt: cwnd øker med ca. 1 MSS per RTT</p>
              <p>Forsiktig lineær økning — nærmer seg kapasiteten</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950/20 p-5">
            <h3 className="font-bold mb-3 text-red-700 dark:text-red-400">Tap via timeout (Tahoe og Reno)</h3>
            <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 font-mono text-sm text-center mb-3 border border-[var(--card-border)]">
              ssthresh = cwnd/2, cwnd = 1 MSS
            </div>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <p>Timeout indikerer alvorlig tap — back to square one</p>
              <p>ssthresh settes til halvparten av cwnd</p>
              <p>cwnd reset til 1 MSS — ny slow start</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-orange-400 bg-orange-50 dark:bg-orange-950/20 p-5">
            <h3 className="font-bold mb-3 text-orange-700 dark:text-orange-400">Tap via 3x duplikat ACK (Reno)</h3>
            <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 font-mono text-sm text-center mb-3 border border-[var(--card-border)]">
              ssthresh = cwnd/2, cwnd = ssthresh
            </div>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <p>3 duplikat ACK = mild indikasjon på tap (noe kom frem)</p>
              <p>Fast Retransmit: retransmitter uten å vente på timeout</p>
              <p>cwnd settes til ssthresh (ikke 1) — halvering, ikke reset</p>
              <p className="text-orange-600 dark:text-orange-400">TCP Tahoe: resetter cwnd=1 (ingen fast recovery)</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-5 mt-4">
          <h3 className="font-semibold mb-3">Tilstandsmaskin — TCP Reno</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="border border-[var(--card-border)] px-3 py-2">Tilstand</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Hendelse</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Handling</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Neste tilstand</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Slow Start", "ACK mottatt", "cwnd += MSS", "SS (eller CA hvis cwnd≥ssthresh)"],
                  ["Slow Start", "cwnd ≥ ssthresh", "—", "Congestion Avoidance"],
                  ["Slow Start", "Timeout", "ssthresh=cwnd/2, cwnd=1", "Slow Start"],
                  ["Cong. Avoidance", "ACK mottatt", "cwnd += MSS²/cwnd", "Congestion Avoidance"],
                  ["Cong. Avoidance", "3 dup. ACK", "ssthresh=cwnd/2, cwnd=ssthresh", "Fast Recovery"],
                  ["Cong. Avoidance", "Timeout", "ssthresh=cwnd/2, cwnd=1", "Slow Start"],
                  ["Fast Recovery", "Ny ACK", "cwnd = ssthresh", "Congestion Avoidance"],
                  ["Fast Recovery", "Timeout", "ssthresh=cwnd/2, cwnd=1", "Slow Start"],
                ].map(([state, event, action, next], i) => (
                  <tr key={i} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-medium">{state}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-[var(--muted)]">{event}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] font-mono text-network-700 dark:text-network-300">{action}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-[var(--muted)]">{next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Vanlige feil ── */}
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Vanlige eksamenfeil</h2>
        <div className="rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-5">
          <ul className="space-y-3 text-sm">
            {[
              "GBN vindu: W ≤ 2^k − 1, IKKE 2^k. Med k=3 bits: max 7 (ikke 8). Husk å trekke fra 1.",
              "SR vindu: W ≤ 2^(k−1). Med k=3 bits: max 4. Halvparten av sekvensnummerrommet.",
              "TCP Tahoe vs Reno: Tahoe setter cwnd=1 ved 3 duplikat ACK. Reno setter cwnd=ssthresh (fast recovery).",
              "DevRTT er EWMA av absoluttverdien — aldri negativ. |SampleRTT − EstimatedRTT|, ikke signed.",
              "TimeoutInterval = EstimatedRTT + 4·DevRTT. Faktoren er 4, ikke 2 eller 3.",
              "Utnyttelsesgrad: tell overforingstid L/R i TELLER og i NEVNER. U = (L/R) / (RTT + L/R).",
              "RTT-estimering: α=0.125, β=0.25 — lær disse to konstantene utenat.",
            ].map((feil, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 shrink-0 font-bold">!</span>
                <span>{feil}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
