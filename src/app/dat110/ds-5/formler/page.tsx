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

function RuleBox({ number, rule, explanation, color }: {
  number: string; rule: string; explanation: string; color: string;
}) {
  return (
    <div className={`rounded-xl border-2 ${color} p-4`}>
      <div className="flex items-start gap-3">
        <span className="font-bold text-lg min-w-[2.5rem]">{number}</span>
        <div>
          <div className="font-mono text-sm font-bold bg-white dark:bg-neutral-900 rounded px-3 py-1.5 mb-2 border border-[var(--card-border)]">
            {rule}
          </div>
          <p className="text-xs text-[var(--muted)]">{explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default function DS5FormlerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Formler — Koordinering</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        DS Kapittel 5 — Lamport-klokker, vektorklokker, happens-before og gjensidig utelukkelse
      </p>

      {/* ── Hurtigoversikt ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">!</span>
          Hurtigreferanse — Når bruker du hva?
        </h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/20">
                <th className="text-left p-3 border border-[var(--card-border)]">Situasjon</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Bruk</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Resultat</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sjekk om hendelse a skjedde før b", "Lamport-klokke: LC(a) < LC(b)?", "Nei — LC(a) < LC(b) er nødvendig, men ikke tilstrekkelig"],
                ["Sjekk kausal rekkefølge sikkert", "Vektorklokke: VC(a) ≤ VC(b)?", "Ja — VC(a) ≤ VC(b) ⟺ a →  b"],
                ["Koordiner tilgang til delt ressurs (distribuert)", "Ricart-Agrawala algoritme", "2(N-1) meldinger per kritisk seksjon"],
                ["Koordiner tilgang via ring", "Token ring algoritme", "1 til N-1 meldinger (avh. av plassering)"],
                ["Finn leder i distribuert system", "Bully-algoritme eller ring-ledervalg", "Bully: O(N²), Ring: O(N²) worst-case"],
              ].map(([situation, bruk, resultat]) => (
                <tr key={situation} className="border-b border-[var(--card-border)]">
                  <td className="p-3 border border-[var(--card-border)]">{situation}</td>
                  <td className="p-3 font-mono text-xs text-blue-700 dark:text-blue-300 border border-[var(--card-border)]">{bruk}</td>
                  <td className="p-3 text-xs text-[var(--muted)] border border-[var(--card-border)]">{resultat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Happens-before ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span>
          Happens-before relasjon ( → )
        </h2>

        <FormulaBox label="Happens-before — definisjon" formula="a → b  (a skjer kausallt før b)" color="gold">
          <p className="text-xs text-[var(--muted)] mb-3">Tre regler definerer happens-before:</p>
          <div className="space-y-2">
            <RuleBox
              number="HB1"
              rule="a og b er i samme prosess, og a skjer før b"
              explanation="Lokal rekkefølge: innen én prosess er tidslinja total. Alle hendelser i en prosess er ordnet."
              color="border-amber-300 bg-amber-50/50 dark:bg-amber-950/10"
            />
            <RuleBox
              number="HB2"
              rule="a = send(m)  og  b = receive(m)"
              explanation="Sending happens-before mottak: meldingen må sendes før den kan mottas — selv om klokkene er synkroniserte."
              color="border-amber-300 bg-amber-50/50 dark:bg-amber-950/10"
            />
            <RuleBox
              number="HB3"
              rule="a → c  og  c → b  ⟹  a → b  (transitivitet)"
              explanation="Kausal kjede: hvis a påvirket c, og c påvirket b, så påvirket a også b indirekte."
              color="border-amber-300 bg-amber-50/50 dark:bg-amber-950/10"
            />
          </div>
          <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-3 py-2 text-xs">
            <span className="font-bold text-red-700 dark:text-red-400">Konkurrerende hendelser: </span>
            Hvis verken a → b eller b → a gjelder, er a og b <em>konkurrerende</em> (concurrent) — de skjedde uavhengig.
          </div>
        </FormulaBox>
      </section>

      {/* ── Lamport-klokkeregler ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span>
          Lamport-klokke — tre regler
        </h2>

        <div className="space-y-3">
          <RuleBox
            number="LC1"
            rule="LC := LC + 1  (før hver lokal hendelse)"
            explanation="Før prosessen utfører en intern hendelse (ikke send/receive), økes den lokale telleren med 1."
            color="border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          />
          <RuleBox
            number="LC2"
            rule="Send: LC := LC + 1, send(m, LC)"
            explanation="Inkrementer klokken, deretter send meldingen med den nye klokkeverdien vedlagt."
            color="border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          />
          <RuleBox
            number="LC3"
            rule="Receive(m, ts): LC := max(LC, ts) + 1"
            explanation="Ved mottak: sett klokken til maks av lokal klokke og tidsstempelet i meldingen, legg deretter til 1. Dette sikrer at receive alltid skjer etter send."
            color="border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          />
        </div>

        <div className="mt-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm">
          <p className="font-bold mb-1">Viktig begrensning:</p>
          <p>
            LC(a) &lt; LC(b) <em>impliserer ikke</em> at a → b. Lamport-klokker gir kun en
            nødvendig betingelse. For å avgjøre kausalitet sikkert, bruk vektorklokker.
          </p>
          <p className="mt-2 font-mono text-xs">
            a → b ⟹ LC(a) &lt; LC(b)  [sant alltid]<br />
            LC(a) &lt; LC(b) ⟹ a → b  [IKKE nødvendigvis sant]
          </p>
        </div>
      </section>

      {/* ── Vektorklokkeregler ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</span>
          Vektorklokke — tre regler
        </h2>

        <FormulaBox label="Vektorklokke — notasjon" formula="VC[i] = (c₁, c₂, ..., cₙ)  — én teller per prosess" color="blue">
          <p className="text-xs text-[var(--muted)]">N prosesser → N-dimensjonal vektor. Prosess i vedlikeholder VC[i] der VC[i][j] = prosess i sin kjennskap til prosess j sin klokke.</p>
        </FormulaBox>

        <div className="space-y-3">
          <RuleBox
            number="VC1"
            rule="Lokal hendelse: VC[i][i] := VC[i][i] + 1"
            explanation="Kun prosess i sin egen teller økes ved lokale hendelser. Alle andre teller forblir uendret."
            color="border-green-400 bg-green-50 dark:bg-green-950/20"
          />
          <RuleBox
            number="VC2"
            rule="Send: VC[i][i] += 1, send(m, VC[i])"
            explanation="Inkrementer egen teller, send deretter meldingen med hele vektoren vedlagt."
            color="border-green-400 bg-green-50 dark:bg-green-950/20"
          />
          <RuleBox
            number="VC3"
            rule="Receive(m, VCm): VC[i][k] := max(VC[i][k], VCm[k]) for alle k, deretter VC[i][i] += 1"
            explanation="For hvert element: ta max av lokal og mottatt verdi. Deretter inkrementer egen teller for receive-hendelsen."
            color="border-green-400 bg-green-50 dark:bg-green-950/20"
          />
        </div>

        <FormulaBox label="Kausalitetssjekk — vektorklokker" formula="a → b  ⟺  VC(a) ≤ VC(b)  og  VC(a) ≠ VC(b)" color="gold">
          <div className="space-y-0.5">
            <VarRow sym="VC(a) ≤ VC(b)" meaning="Alle elementer i VC(a) er ≤ tilsvarende element i VC(b)" />
            <VarRow sym="VC(a) = VC(b)" meaning="Vektorene er identiske — betyr samtidighet (concurrent)" />
            <VarRow sym="Concurrent" meaning="Verken VC(a) ≤ VC(b) eller VC(b) ≤ VC(a) — uavhengige hendelser" />
          </div>
          <div className="mt-3 rounded-lg bg-green-100 dark:bg-green-900/30 px-3 py-2 text-xs">
            <p className="font-bold">Eksempel:</p>
            <p>VC(a) = (2,1,0), VC(b) = (3,2,1) → 2≤3, 1≤2, 0≤1 → VC(a) ≤ VC(b) → a → b</p>
            <p className="mt-1">VC(a) = (2,1,0), VC(b) = (1,2,0) → 2&gt;1 første element → IKKE a → b, concurrent!</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── Gjensidig utelukkelse ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">4</span>
          Gjensidig utelukkelse — meldingskompleksitet
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormulaBox label="Ricart-Agrawala — VIKTIGST" formula="2(N − 1) meldinger per CS-tilgang" color="gold">
            <div className="space-y-0.5">
              <VarRow sym="N" meaning="Antall prosesser i det distribuerte systemet" />
              <VarRow sym="N-1" meaning="Antall prosesser som må sende REQUEST til" />
              <VarRow sym="2(N-1)" meaning="(N-1) REQUEST + (N-1) REPLY = totalt" />
            </div>
            <div className="mt-3 text-xs bg-amber-100 dark:bg-amber-900/30 rounded p-2">
              <p className="font-bold mb-1">Protokoll:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-[var(--muted)]">
                <li>Send REQUEST(ts, pid) til alle N-1 andre prosesser</li>
                <li>Vent til alle N-1 REPLY er mottatt</li>
                <li>Utfør kritisk seksjon (CS)</li>
                <li>Send REPLY til alle ventende prosesser</li>
              </ol>
            </div>
          </FormulaBox>

          <FormulaBox label="Token Ring — meldingskompleksitet" formula="1 til N−1 meldinger (avh. av plassering)" color="blue">
            <div className="space-y-0.5">
              <VarRow sym="Best case" meaning="1 melding — prosessen rett foran har tokenet" />
              <VarRow sym="Worst case" meaning="N-1 meldinger — tokenet akkurat passert" />
              <VarRow sym="Overhead" meaning="Token sirkulerer kontinuerlig selv når ingen vil inn i CS" />
            </div>
            <div className="mt-3 text-xs bg-blue-100 dark:bg-blue-900/30 rounded p-2">
              <p className="font-bold mb-1">Token ring vs. Ricart-Agrawala:</p>
              <ul className="text-[var(--muted)] space-y-0.5">
                <li>Token ring: lavere overhead ved høy konkurranse</li>
                <li>Ricart-Agrawala: alltid 2(N-1), uavhengig av konkurranse</li>
              </ul>
            </div>
          </FormulaBox>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mt-4">
          <h3 className="font-semibold mb-3">Sammenligning — gjensidig utelukkelse</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-950/20">
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Algoritme</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Meldinger per CS</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Feiltoleranse</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Sentralisert?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Sentralisert koordinator", "3 (REQUEST + GRANT + RELEASE)", "Nei — single point of failure", "Ja"],
                  ["Ricart-Agrawala", "2(N-1)", "Nei — prosess-krasj blokkerer", "Nei"],
                  ["Token ring", "1 til N-1", "Nei — tapt token blokkerer", "Nei"],
                ].map(([alg, msg, fault, central]) => (
                  <tr key={alg} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-medium">{alg}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] font-mono text-xs text-blue-700 dark:text-blue-300">{msg}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{fault}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{central}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Ledervalg ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">5</span>
          Ledervalg — kompleksitet
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4">
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">Bully-algoritme</h3>
            <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 font-mono text-sm text-center mb-3 border border-[var(--card-border)]">
              O(N²) meldinger worst-case
            </div>
            <ol className="text-xs text-[var(--muted)] space-y-1 list-decimal list-inside">
              <li>Prosess P sender ELECTION til alle prosesser med høyere ID</li>
              <li>Prosesser med høyere ID svarer OK og starter sin egen ELECTION</li>
              <li>Prosessen som ikke får svar innen timeout erklærer seg COORDINATOR</li>
              <li>Sender COORDINATOR-melding til alle</li>
            </ol>
          </div>

          <div className="rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20 p-4">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-3">Ring-ledervalg (Chang-Roberts)</h3>
            <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 font-mono text-sm text-center mb-3 border border-[var(--card-border)]">
              O(N²) worst-case, O(N log N) avg
            </div>
            <ol className="text-xs text-[var(--muted)] space-y-1 list-decimal list-inside">
              <li>Hver prosess sender sin ID til neste i ringen</li>
              <li>Videresend kun hvis mottatt ID er høyere enn lokal ID</li>
              <li>Prosessen som mottar sin egen ID er valgt leder</li>
              <li>Send LEADER-melding rundt ringen</li>
            </ol>
          </div>
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
              "Lamport LC(a) < LC(b) betyr IKKE a → b. Det er kun en nødvendig betingelse, ikke tilstrekkelig. Bruk vektorklokker for kausalitetsbevis.",
              "LC3: husk å legge til 1 ETTER max(). Formelen er max(LC, ts) + 1, ikke max(LC+1, ts).",
              "VC3: ta max av ALLE elementer, deretter inkrementer kun VC[i][i] for receive-hendelsen.",
              "Ricart-Agrawala: 2(N-1) totalt, ikke N-1. Begge REQUEST og REPLY telles.",
              "Token ring: meldingsantallet varierer (1 til N-1), ikke fast. Avhenger av avstand til token.",
              "Happens-before er en partiell orden, ikke total — to hendelser kan være concurrent (verken a→b eller b→a).",
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
