"use client";

function FormulaBox({ label, formula, color, children }: {
  label: string;
  formula: string;
  color: "gold" | "blue" | "red" | "green";
  children?: React.ReactNode;
}) {
  const colors = {
    gold:  "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
    blue:  "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
    red:   "border-red-400 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400 bg-green-50 dark:bg-green-950/20",
  };
  const labelColors = {
    gold:  "bg-amber-400 text-white",
    blue:  "bg-blue-500 text-white",
    red:   "bg-red-500 text-white",
    green: "bg-green-600 text-white",
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
      <span className="font-mono font-bold text-blue-700 dark:text-blue-400 min-w-[80px]">{sym}</span>
      <span className="text-[var(--muted)]">{meaning}</span>
    </div>
  );
}

export default function DS7FormlerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Formler — Konsistens og replikering</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        DS Kapittel 7 — Quorum-regler, konsistensmodeller, CAP-teoremet og klient-sentrerte garantier
      </p>

      {/* ── Hurtigoversikt ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">!</span>
          Hurtigreferanse
        </h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/20">
                <th className="text-left p-3 border border-[var(--card-border)]">Spørsmål</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Svar / Formel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hvilke quorumkrav MÅ alltid holde?", "NR + NW > N  og  NW > N/2"],
                ["Hva sikrer NR + NW > N?", "Lese- og skrivekvorum overlapper alltid — ingen staleness"],
                ["Hva sikrer NW > N/2?", "To skrivinger kan ikke skje på disjunkte kvorumsett — unngår write-write konflikt"],
                ["Hva sier CAP?", "Umulig å ha alle tre: Consistency, Availability, Partition tolerance"],
                ["Sterkeste konsistensmodell?", "Strict consistency — absolutt tidsordering"],
                ["Svakeste 'nyttige' modell?", "Eventual consistency — alle replika konvergerer til slutt"],
                ["Hva er monotone reads (MR)?", "Klient ser aldri eldre versjon etter å ha lest nyere"],
                ["Hva er read-your-writes (RYW)?", "Klient ser alltid sine egne skrivinger ved etterfølgende lesing"],
              ].map(([question, answer]) => (
                <tr key={question} className="border-b border-[var(--card-border)]">
                  <td className="p-3 border border-[var(--card-border)]">{question}</td>
                  <td className="p-3 font-mono text-xs text-blue-700 dark:text-blue-300 border border-[var(--card-border)]">{answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Quorum-regler ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span>
          Quorum-regler
        </h2>

        <FormulaBox label="Quorumsbetingelse — VIKTIGST" formula="NR + NW > N   og   NW > N/2" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="N" meaning="Totalt antall replika i systemet" />
            <VarRow sym="NR" meaning="Antall replika som MÅ svare for en lesing (read quorum)" />
            <VarRow sym="NW" meaning="Antall replika som MÅ bekrefte for en skriving (write quorum)" />
            <VarRow sym="NR + NW > N" meaning="Lese- og skrivekvorum overlapper alltid — leser alltid siste versjon" />
            <VarRow sym="NW > N/2" meaning="Kun ett skrivekvorum kan eksistere — forhindrer split-brain" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Eksempel (N=5):</p>
            <p>NR=3, NW=3: 3+3=6 &gt; 5 ✓  og  3 &gt; 2.5 ✓ — gyldig</p>
            <p>NR=2, NW=2: 2+2=4 ≯ 5 ✗ — UGYLDIG, kan lese uten å nå siste skriving</p>
            <p>NR=1, NW=5: 1+5=6 &gt; 5 ✓  og  5 &gt; 2.5 ✓ — gyldig (men treg skriving)</p>
          </div>
        </FormulaBox>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-3">Ytelses-tradeoffs med quorum</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">Lese-optimalisert</p>
              <p className="font-mono">NR=1, NW=N</p>
              <p className="text-[var(--muted)] mt-1">Rask lesing, treg skriving. Bruk der lesing dominerer.</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">Balansert</p>
              <p className="font-mono">NR = NW = ⌊N/2⌋+1</p>
              <p className="text-[var(--muted)] mt-1">Kompromiss mellom lese- og skriveytelse.</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">Skrive-optimalisert</p>
              <p className="font-mono">NR=N, NW=1</p>
              <p className="text-[var(--muted)] mt-1">Rask skriving, treg lesing. Sjelden ønsket.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Konsistensmodeller ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span>
          Konsistensmodell-hierarki
        </h2>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-4 text-center">Sterkest → Svakest</h3>
          <div className="space-y-2">
            {[
              {
                name: "Strict Consistency",
                rule: "Absolutt tidsordering — enhver lesing returnerer siste skriving globalt",
                color: "bg-red-500",
                detail: "Krever perfekt klokkesynkronisering. Umulig i distribuerte systemer i praksis.",
              },
              {
                name: "Sequential Consistency",
                rule: "Alle prosesser ser samme sekvens av operasjoner, men ikke nødvendigvis i vegg-klokke-tid",
                color: "bg-orange-500",
                detail: "Lamport-modellen. Oppnåelig, men dyrt — krever global koordinering.",
              },
              {
                name: "Causal Consistency",
                rule: "Kausalt relaterte skrivinger sees i riktig rekkefølge. Uavhengige skrivinger kan sees i ulik rekkefølge.",
                color: "bg-yellow-500",
                detail: "Bruker vektorklokker for å spore kausalitet. Mer praktisk enn sequential.",
              },
              {
                name: "Eventual Consistency",
                rule: "Alle replika konvergerer til samme verdi — gitt at ingen nye skrivinger skjer",
                color: "bg-green-500",
                detail: "Brukes i DNS, Amazon DynamoDB, Cassandra. Høy tilgjengelighet, lav latens.",
              },
            ].map((model) => (
              <div key={model.name} className="flex items-start gap-3 rounded-lg bg-white dark:bg-neutral-900 border border-[var(--card-border)] p-3">
                <div className={`${model.color} text-white rounded px-2 py-0.5 text-xs font-bold shrink-0 mt-0.5`}>
                  {model.name.split(" ")[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{model.name}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{model.rule}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5 italic">{model.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-xs text-[var(--muted)]">
            Strict ⊃ Sequential ⊃ Causal ⊃ Eventual
            <span className="ml-2 text-blue-600 dark:text-blue-400">(hvert sett er et subset av modellen under)</span>
          </div>
        </div>
      </section>

      {/* ── CAP-teoremet ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</span>
          CAP-teoremet
        </h2>

        <FormulaBox label="CAP-teoremet — Brewers teorem" formula="Et distribuert system kan kun garantere 2 av 3: C, A, P" color="red">
          <div className="grid sm:grid-cols-3 gap-3 mt-2 text-xs">
            <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
              <p className="font-bold text-red-700 dark:text-red-400 mb-1">C — Consistency</p>
              <p className="text-[var(--muted)]">Alle noder ser samme data til enhver tid. Enhver lesing returnerer den siste skrivingen.</p>
            </div>
            <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
              <p className="font-bold text-red-700 dark:text-red-400 mb-1">A — Availability</p>
              <p className="text-[var(--muted)]">Enhver forespørsel til en ikke-krasjet node mottar alltid et svar (ikke nødvendigvis oppdatert).</p>
            </div>
            <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
              <p className="font-bold text-red-700 dark:text-red-400 mb-1">P — Partition tolerance</p>
              <p className="text-[var(--muted)]">Systemet fortsetter å fungere selv om meldinger mellom noder går tapt (nettverkspartisjon).</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-white dark:bg-neutral-900 border border-[var(--card-border)] p-3 text-xs">
            <p className="font-bold mb-2">Praktiske valg:</p>
            <div className="space-y-1 text-[var(--muted)]">
              <p><strong>CP (C+P):</strong> Konsistens prioriteres — blokkerer ved partisjon. Eks: HBase, Zookeeper</p>
              <p><strong>AP (A+P):</strong> Tilgjengelighet prioriteres — returnerer mulig utdatert data. Eks: Cassandra, DynamoDB</p>
              <p><strong>CA (C+A):</strong> Eksisterer kun uten partisjon — ikke mulig i ekte distribuerte systemer</p>
            </div>
          </div>
        </FormulaBox>
      </section>

      {/* ── Klient-sentrerte garantier ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">4</span>
          Klient-sentrerte konsistensgarantier
        </h2>

        <div className="space-y-3">
          {[
            {
              abbr: "MR",
              name: "Monotone Reads",
              rule: "Hvis en klient leser verdi x, vil påfølgende lesinger aldri returnere en eldre versjon av x",
              example: "Klient leser alder=25 fra replika A. Flyttes til replika B — får ALDRI alder=24 tilbake.",
              color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
              labelColor: "bg-blue-500 text-white",
            },
            {
              abbr: "MW",
              name: "Monotone Writes",
              rule: "Skrivinger fra en klient propageres i riktig rekkefølge til alle replika",
              example: "Klient skriver x=1, deretter x=2. Ingen replika ser x=2 før x=1 er ankommet.",
              color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
              labelColor: "bg-blue-500 text-white",
            },
            {
              abbr: "RYW",
              name: "Read-Your-Writes",
              rule: "En klient ser alltid effekten av sine egne skrivinger ved etterfølgende lesinger",
              example: "Klient oppdaterer profilbilde, leser deretter profil — ser alltid det nye bildet.",
              color: "border-green-400 bg-green-50 dark:bg-green-950/20",
              labelColor: "bg-green-600 text-white",
            },
            {
              abbr: "WFR",
              name: "Writes-Follow-Reads",
              rule: "Skriving etter en lesing propageres til alle replika som har den leste versjonen eller nyere",
              example: "Klient leser versjon v av x, skriver deretter y. Skrivingen av y anerkjenner versjon v av x.",
              color: "border-green-400 bg-green-50 dark:bg-green-950/20",
              labelColor: "bg-green-600 text-white",
            },
          ].map((g) => (
            <div key={g.abbr} className={`rounded-xl border-2 ${g.color} overflow-hidden`}>
              <div className={`${g.labelColor} px-4 py-1.5 text-xs font-bold uppercase tracking-wide`}>
                {g.abbr} — {g.name}
              </div>
              <div className="px-5 py-3">
                <p className="text-sm font-medium mb-2">{g.rule}</p>
                <p className="text-xs text-[var(--muted)] italic">Eksempel: {g.example}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Replikeringsstrategier ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">5</span>
          Replikeringsstrategier
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/20">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Strategi</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Konsistens</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Tilgjengelighet</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Brukstilfelle</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Primary-backup", "Sterk (synkron) / Svakere (asynkron)", "Moderat — avhengig av primary", "Databaser, RDBMS"],
                ["Chain replication", "Sterk — head skriver, tail leser", "God — leser fra tail", "Lagring med sterk konsistens"],
                ["Quorum-basert", "Konfigurerbar via NR og NW", "God — tolererer N-NW feil", "Distribuerte datalagre"],
                ["Eventual consistency", "Svak — konvergerer til slutt", "Meget god — ingen koordinering", "DNS, sosiale medier, CDN"],
              ].map(([strategy, consistency, avail, usecase]) => (
                <tr key={strategy} className="border-b border-[var(--card-border)]">
                  <td className="px-3 py-2 border border-[var(--card-border)] font-medium">{strategy}</td>
                  <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{consistency}</td>
                  <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{avail}</td>
                  <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{usecase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Vanlige feil ── */}
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">!</span>
          Vanlige eksamenfeil
        </h2>
        <div className="rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-5">
          <ul className="space-y-3 text-sm">
            {[
              "CAP: man velger 2 av 3, men P (partition tolerance) er i praksis alltid nødvendig i ekte distribuerte systemer — valget er egentlig mellom C og A ved partisjon.",
              "NW > N/2 er et EGET krav, ikke avledet fra NR + NW > N. Begge må kontrolleres separat.",
              "Eventual consistency garanterer IKKE at replika er synkroniserte til enhver tid — bare at de vil bli det gitt ingen nye skrivinger.",
              "Monotone Reads (MR) og Read-Your-Writes (RYW) er klient-sentrerte — de gjelder per klient, ikke globalt.",
              "Strict consistency er ikke det samme som sequential consistency — strict krever absolutt tidsordering.",
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
