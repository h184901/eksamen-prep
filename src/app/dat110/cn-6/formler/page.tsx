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
      <span className="font-mono font-bold text-network-700 dark:text-network-300 min-w-[150px]">{sym}</span>
      <span className="text-[var(--muted)]">{meaning}</span>
    </div>
  );
}

export default function CN6FormlerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Formler — Linklaget</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        CN Kapittel 6 — CRC, ALOHA-effektivitet, CSMA/CD, binær eksponentiell backoff og Ethernet-rammeformat
      </p>

      {/* ── Hurtigoversikt ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Rask oversikt — «Når bruker du hva?»</h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-network-50 dark:bg-network-950/20">
                <th className="text-left p-3 border border-[var(--card-border)]">Situasjon</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Formel / Tall</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Beregn CRC-rest (FCS)", "R = remainder(D · 2^r / G)  i GF(2) aritmetikk"],
                ["Sjekk CRC ved mottak", "T = D·2^r + R — del T på G — rest = 0 → ingen feil"],
                ["Pure ALOHA max effektivitet", "1/(2e) ≈ 0.184 ≈ 18%"],
                ["Slotted ALOHA max effektivitet", "1/e ≈ 0.368 ≈ 37%"],
                ["CSMA/CD min. rammelengde", "minFrameSize = 2 · d_prop · R"],
                ["Binary exp. backoff, n-te kollisjon", "K ∈ {0, 1, ..., 2^n − 1} (max n=10)"],
                ["Ethernet ramme minimum", "64 bytes (512 bits)"],
                ["Ethernet ramme maksimum", "1518 bytes (1522 med VLAN-tag)"],
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

      {/* ── CRC ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">CRC — Cyclic Redundancy Check</h2>

        <FormulaBox label="CRC — beregning av rest" formula="R = remainder( D · 2^r , G )" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="D" meaning="Data-bitene som skal sendes (uten CRC-bits)" />
            <VarRow sym="r" meaning="Graden av generatorpolynomiet G — antall CRC-bits som legges til" />
            <VarRow sym="G" meaning="Generatorpolynom — divisor (avtalt mellom sender og mottaker)" />
            <VarRow sym="R" meaning="CRC-rest — de r ekstra bitene som legges til etter dataene" />
            <VarRow sym="D · 2^r" meaning="Databelterne med r nuller lagt til på slutten — gjør plass for R" />
            <VarRow sym="GF(2) aritmetikk" meaning="Alle beregninger i binær mods 2: XOR istedet for subtraksjon" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-2">Fremgangsmåte:</p>
            <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
              <li>Ta data D og legg til r nuller (D·2^r)</li>
              <li>Del D·2^r på G med XOR-divisjon (ikke vanlig divisjon)</li>
              <li>Resten R er CRC-kodene</li>
              <li>Send T = D·2^r XOR R (dvs. dataene + CRC)</li>
              <li>Mottaker: del T på G — rest = 0 betyr ingen feil</li>
            </ol>
          </div>
        </FormulaBox>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-3">CRC XOR-divisjon — eksempel</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-bold mb-2">Gitt: D=101110, G=1001 (r=3)</p>
              <div className="bg-neutral-900 text-green-300 rounded-lg p-3 font-mono space-y-1">
                <p>D·2^3 = 101110000</p>
                <p>Diviser 101110000 med 1001:</p>
                <p>101110000</p>
                <p>XOR 1001</p>
                <p className="border-t border-green-700">= 000110000</p>
                <p className="text-yellow-300">... (fortsett til 3 bit gjenstår)</p>
                <p>Rest R = 011</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-2">Sender T = D·2^3 XOR R:</p>
              <div className="bg-neutral-900 text-green-300 rounded-lg p-3 font-mono space-y-1">
                <p>T = 101110000 XOR 011</p>
                <p>T = 101110011</p>
                <p className="text-yellow-300 mt-2">Mottaker sjekk:</p>
                <p>101110011 / 1001</p>
                <p>Rest = 000 → OK!</p>
              </div>
              <p className="text-[var(--muted)] mt-2">Enhver enkeltbitfeil endrer resten til ≠ 0.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALOHA ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">ALOHA — kanaleffektivitet</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormulaBox label="Pure ALOHA — max effektivitet" formula="η_max = 1/(2e) ≈ 0.184 ≈ 18%" color="blue">
            <div className="space-y-0.5 mb-3">
              <VarRow sym="e" meaning="Eulers tall ≈ 2.718" />
              <VarRow sym="1/(2e)" meaning="Maks utnyttelse — best case når alle sender med sanns. 1/(2e)" />
              <VarRow sym="Koll.vindu" meaning="2·t_p — dobbelt rammelengde (sender UND FORE og ETTER sending)" />
            </div>
            <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2 text-xs">
              <p>Pure ALOHA: send når du vil. Kollisjon = vent tilfeldig, prøv igjen.</p>
              <p className="mt-1">Kollisjonssannsynlighet er dobbelt av slotted ALOHA fordi ramme kan kollidere med rammer fra forrige OG neste slot.</p>
            </div>
          </FormulaBox>

          <FormulaBox label="Slotted ALOHA — max effektivitet" formula="η_max = 1/e ≈ 0.368 ≈ 37%" color="green">
            <div className="space-y-0.5 mb-3">
              <VarRow sym="e" meaning="Eulers tall ≈ 2.718" />
              <VarRow sym="1/e" meaning="Dobbelt så effektiv som pure ALOHA" />
              <VarRow sym="Koll.vindu" meaning="1·t_p — kun innenfor sin egen slot" />
            </div>
            <div className="rounded-lg bg-green-100 dark:bg-green-900/30 px-3 py-2 text-xs">
              <p>Slotted ALOHA: synkroniserte tidslucier — sender kun ved slot-start.</p>
              <p className="mt-1">Halverer kollisjonssannsynligheten sammenlignet med pure ALOHA.</p>
            </div>
          </FormulaBox>
        </div>

        <div className="rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-5 mt-2">
          <h3 className="font-semibold mb-3">ALOHA-sammenligning</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Protokoll</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Max effektivitet</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Kollisjonssannsynlighet</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Krav</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pure ALOHA", "18.4%", "Høy — 2·t_p vindu", "Ingen synkronisering"],
                  ["Slotted ALOHA", "36.8%", "Lavere — 1·t_p vindu", "Synkroniserte klokker"],
                  ["CSMA (ingen CD)", "Bedre", "Lytter før sending", "Half-duplex medium"],
                  ["CSMA/CD (Ethernet)", "Nær 100% ved lav belastn.", "Avbryter ved kollisjoner", "Fysisk kollisjonsdeteksjon"],
                ].map(([protocol, eff, col, req]) => (
                  <tr key={protocol} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-medium">{protocol}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] font-mono text-xs text-green-700 dark:text-green-300">{eff}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{col}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CSMA/CD ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">CSMA/CD — minimumsrammelengde</h2>

        <FormulaBox label="CSMA/CD — minimumsramme" formula="minFrameSize = 2 · d_prop · R" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="minFrameSize" meaning="Minimumsrammelengde i bits — garanterer kollisjonsdeteksjon" />
            <VarRow sym="d_prop" meaning="Propagasjonsforsinkelse én vei (sekunder)" />
            <VarRow sym="R" meaning="Datarate / linkkapasitet (bps)" />
            <VarRow sym="2 · d_prop" meaning="Worst-case: sender akkurat før mottakers signal ankommer (RTT)" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Intuisjon:</p>
            <p>Sender A sender bit. Bit når B rett før B sender. B detekterer kollisjon og sender jamlsignal. Jamsignalet MÅ nå A før A er ferdig med å sende.</p>
            <p className="mt-2">For 10 Mbps Ethernet: d_prop = 25.6 μs (100m kabel), minFrame = 2·25.6·10^-6·10^7 = 512 bits = 64 bytes</p>
          </div>
        </FormulaBox>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-3">CSMA/CD-algoritmen</h3>
          <ol className="text-sm space-y-2 text-[var(--muted)]">
            <li><span className="font-bold text-blue-700 dark:text-blue-300">1. Sense:</span> Er kanalen ledig? Hvis opptatt, vent til ledig (CSMA).</li>
            <li><span className="font-bold text-blue-700 dark:text-blue-300">2. Send:</span> Start sending av ramme.</li>
            <li><span className="font-bold text-blue-700 dark:text-blue-300">3. Detect:</span> Detekteres kollisjon mens vi sender? (CD)</li>
            <li><span className="font-bold text-blue-700 dark:text-blue-300">4. Abort + Jam:</span> Stopp sending, send 48-bit jamsignal (forsterker kollisjonssignal).</li>
            <li><span className="font-bold text-blue-700 dark:text-blue-300">5. Backoff:</span> Vent K · 512 bit-tider, gå til steg 1.</li>
          </ol>
        </div>
      </section>

      {/* ── Binary exponential backoff ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Binær eksponentiell backoff</h2>

        <FormulaBox label="Backoff — ventetid etter n-te kollisjon" formula="K ∈ {0, 1, ..., 2^n − 1}  (velges tilfeldig)" color="network">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="n" meaning="Antall kollisjoner for denne rammen (i denne runden)" />
            <VarRow sym="K" meaning="Tilfeldig valgt ventetall fra uniformfordeling over {0, ..., 2^n−1}" />
            <VarRow sym="Ventetid" meaning="K · 512 bit-tider (for 10 Mbps Ethernet)" />
            <VarRow sym="Max n" meaning="n capes ved 10 — maks intervall {0, ..., 1023}" />
            <VarRow sym="Max forsøk" meaning="Rammen kastes etter 16 mislykkede forsøk" />
          </div>
          <div className="rounded-lg bg-network-100 dark:bg-network-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-2">Venteintervall per kollisjon:</p>
            <div className="font-mono grid grid-cols-5 gap-1 text-[var(--muted)]">
              {[
                ["n=1", "{0,1}"],
                ["n=2", "{0..3}"],
                ["n=3", "{0..7}"],
                ["n=4", "{0..15}"],
                ["n=10", "{0..1023}"],
              ].map(([n, range]) => (
                <div key={n} className="bg-white dark:bg-neutral-900 rounded p-1.5 border border-[var(--card-border)] text-center">
                  <p className="text-blue-600 dark:text-blue-400">{n}</p>
                  <p>{range}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[var(--muted)]">Intuisjon: eksponentiell økning i venteintervall reduserer sannsynligheten for gjentatte kollisjoner. Adaptivt til nettverksbelastning.</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── Ethernet-ramme ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Ethernet-rammeformat</h2>

        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-5 my-4">
          <h3 className="font-bold mb-4">Ethernet II (DIX) rammestruktur</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {[
                { field: "Preamble", bytes: "7", color: "bg-gray-200 dark:bg-gray-700" },
                { field: "SFD", bytes: "1", color: "bg-gray-200 dark:bg-gray-700" },
                { field: "Dest. MAC", bytes: "6", color: "bg-blue-200 dark:bg-blue-800" },
                { field: "Src. MAC", bytes: "6", color: "bg-blue-200 dark:bg-blue-800" },
                { field: "Type/Len", bytes: "2", color: "bg-yellow-200 dark:bg-yellow-800" },
                { field: "Data (payload)", bytes: "46–1500", color: "bg-green-200 dark:bg-green-800" },
                { field: "FCS (CRC)", bytes: "4", color: "bg-red-200 dark:bg-red-800" },
              ].map(({ field, bytes, color }) => (
                <div key={field} className={`${color} border border-neutral-300 dark:border-neutral-600 p-2 text-center`}
                  style={{ minWidth: `${Math.max(60, bytes.length * 8 + 40)}px` }}>
                  <p className="text-xs font-bold">{field}</p>
                  <p className="text-xs text-[var(--muted)]">{bytes}B</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-bold mb-2">Feltbeskrivelser:</p>
              <div className="space-y-1 text-[var(--muted)]">
                <p><strong>Preamble (7B):</strong> 10101010 × 7 — synkronisering</p>
                <p><strong>SFD (1B):</strong> 10101011 — Start Frame Delimiter</p>
                <p><strong>Dest./Src. MAC (6B):</strong> 48-bit MAC-adresse</p>
                <p><strong>Type/Length (2B):</strong> ≥1536 = EtherType (IPv4=0x0800)</p>
                <p><strong>Data (46–1500B):</strong> payload — paddes til min 46B</p>
                <p><strong>FCS (4B):</strong> 32-bit CRC-kontrollsum</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-2">Rammelengder:</p>
              <div className="space-y-1 font-mono text-[var(--muted)]">
                <p>Min ramme: 6+6+2+46+4 = <strong className="text-green-600">64 bytes</strong></p>
                <p>Max ramme: 6+6+2+1500+4 = <strong className="text-blue-600">1518 bytes</strong></p>
                <p>Med VLAN-tag (802.1Q): <strong className="text-blue-600">1522 bytes</strong></p>
                <p>Inkl. preamble+SFD: 64+8 = <strong>72 bytes</strong> på wire</p>
              </div>
              <div className="mt-2 rounded bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-2">
                <p className="text-red-700 dark:text-red-400 font-bold">Min 64 bytes = 512 bits</p>
                <p className="text-[var(--muted)]">Kreves for CSMA/CD — rammen MÅ sendes lang nok til at kollisjon kan detekteres</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vanlige feil ── */}
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Vanlige eksamenfeil</h2>
        <div className="rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-5">
          <ul className="space-y-3 text-sm">
            {[
              "CRC bruker XOR (modulo-2 aritmetikk) — IKKE vanlig divisjon. 1+1=0, ingen carry i GF(2).",
              "Pure ALOHA = 1/(2e) ≈ 18%, Slotted ALOHA = 1/e ≈ 37%. Lær begge brøker og desimaler utenat.",
              "CSMA/CD minimumsramme: 2 · d_prop · R. Ikke bare d_prop — det er retur-RTT som kreves.",
              "Backoff etter n-te kollisjon: K ∈ {0, ..., 2^n − 1}. Etter 1. kollisjon: {0,1}, etter 2.: {0,1,2,3}.",
              "Ethernet payload: min 46 bytes (paddes opp). Ramme min 64 bytes. Preamble er IKKE del av rammen i IEEE 802.3.",
              "FCS (4 bytes) er CRC-32, ikke CRC-16. Ethernet-headeren er totalt 6+6+2 = 14 bytes.",
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
