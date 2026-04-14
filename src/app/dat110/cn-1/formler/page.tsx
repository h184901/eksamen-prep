"use client";

function FormulaBox({ title, formula, desc, level = "primary" }: { title: string; formula: string; desc: string; level?: "primary" | "secondary" }) {
  const bg = level === "primary"
    ? "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20"
    : "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20";
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${bg}`}>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="font-mono text-lg font-bold text-center my-2 py-2 bg-white/60 dark:bg-neutral-900/40 rounded-lg">{formula}</p>
      <p className="text-sm text-[var(--muted)]">{desc}</p>
    </div>
  );
}

function VarTable({ vars }: { vars: { symbol: string; name: string; unit: string }[] }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            <th className="px-3 py-2 text-left">Symbol</th>
            <th className="px-3 py-2 text-left">Betydning</th>
            <th className="px-3 py-2 text-left">Enhet</th>
          </tr>
        </thead>
        <tbody>
          {vars.map(({ symbol, name, unit }, i) => (
            <tr key={symbol} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
              <td className="px-3 py-2 font-mono font-bold">{symbol}</td>
              <td className="px-3 py-2">{name}</td>
              <td className="px-3 py-2 text-[var(--muted)]">{unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CN1FormlerPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Formler: Nettverksmetrikker</h2>
      <p className="text-[var(--muted)] max-w-2xl">
        Disse formlene er de viktigste i hele CN-delen av faget. Forsinkelsesberegning
        kommer pa ALLE eksamener.
      </p>

      <h3 className="text-lg font-bold mt-6">Variabler</h3>
      <VarTable vars={[
        { symbol: "L", name: "Pakkelengde", unit: "bits" },
        { symbol: "R", name: "Linjekapasitet (bandbredde)", unit: "bits/s (bps)" },
        { symbol: "d", name: "Fysisk avstand mellom noder", unit: "meter (m)" },
        { symbol: "s", name: "Signalhastighet i mediet", unit: "m/s" },
        { symbol: "a", name: "Gjennomsnittlig ankomstrate", unit: "pakker/s" },
        { symbol: "N", name: "Antall linker pa stien", unit: "stk" },
      ]} />

      <h3 className="text-lg font-bold mt-8">Forsinkelsesformler</h3>

      <FormulaBox
        title="Sendingsforsinkelse (transmission delay)"
        formula="d_trans = L / R"
        desc="Tid for a presse alle bits i pakken ut pa linken. L i bits, R i bits/s."
      />

      <FormulaBox
        title="Forplantningsforsinkelse (propagation delay)"
        formula="d_prop = d / s"
        desc="Tid for en bit a reise fysisk fra sender til mottaker. d i meter, s i m/s."
      />

      <FormulaBox
        title="Total nodalforsinkelse"
        formula="d_nodal = d_proc + d_queue + d_trans + d_prop"
        desc="Sum av alle fire forsinkelsestyper ved en enkelt node (ruter)."
      />

      <FormulaBox
        title="Ende-til-ende forsinkelse"
        formula="d_e2e = sum over alle N linker av (d_trans + d_prop) per link"
        desc="Total forsinkelse over hele stien. Inkluder d_proc og d_queue hvis oppgitt."
        level="secondary"
      />

      <h3 className="text-lg font-bold mt-8">Trafikkintensitet og gjennomstromning</h3>

      <FormulaBox
        title="Trafikkintensitet"
        formula="I = La / R"
        desc="L = pakkelengde, a = ankomstrate, R = linjekapasitet. Nar I → 1 eksploderer koforsinkelsen. I > 1 betyr pakketap."
      />

      <FormulaBox
        title="Gjennomstromning (throughput)"
        formula="Throughput = min(R_1, R_2, ..., R_N)"
        desc="Gjennomstromningen bestemmes av flaskehalsen — den smaleste linken pa stien."
      />

      <FormulaBox
        title="Gjennomstromning med delt link"
        formula="Per tilkobling = R_delt / N_tilkoblinger"
        desc="Nar N tilkoblinger deler en kjernelink med kapasitet R, far hver R/N (rettferdig deling)."
        level="secondary"
      />

      <h3 className="text-lg font-bold mt-8">Nar bruker du hva?</h3>
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 font-bold min-w-[160px]">Spor om tid:</span>
            <span>Bruk d_trans = L/R og d_prop = d/s. Legg sammen over alle hopp.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-500 font-bold min-w-[160px]">Spor om hastighet:</span>
            <span>Bruk throughput = min(alle R-verdier). Sjekk om delt link.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-500 font-bold min-w-[160px]">Spor om pakketap:</span>
            <span>Beregn La/R. Hvis &gt; 1 → pakketap.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-500 font-bold min-w-[160px]">Flere pakker:</span>
            <span>Forste pakke: alle d_trans + alle d_prop. Neste pakker: + L/R per pakke (pipelining).</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-5 mt-6">
        <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Vanlige feil pa eksamen</h3>
        <ul className="text-sm space-y-1 text-red-900 dark:text-red-200">
          <li>* Glemmer a konvertere enheter (KB til bits: gang med 8000 eller 8192)</li>
          <li>* Blander d_trans og d_prop — helt ulike ting!</li>
          <li>* Glemmer at det er N linker, ikke N-1, mellom sender og mottaker via N-1 rutere</li>
          <li>* Glemmer store-and-forward: pakken ma mottas HELT for den videresendes</li>
          <li>* Mangler enhet pa svaret (s, ms, us)</li>
        </ul>
      </div>
    </div>
  );
}
