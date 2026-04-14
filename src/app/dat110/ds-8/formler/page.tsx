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

function PhaseBox({ phase, title, messages, description, color }: {
  phase: string; title: string; messages: string; description: string; color: string;
}) {
  return (
    <div className={`rounded-lg border-2 ${color} p-3`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-lg">{phase}</span>
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <div className="font-mono text-xs bg-white dark:bg-neutral-900 rounded px-2 py-1 mb-2 border border-[var(--card-border)]">
        {messages}
      </div>
      <p className="text-xs text-[var(--muted)]">{description}</p>
    </div>
  );
}

export default function DS8FormlerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Formler — Feiltoleranse</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        DS Kapittel 8 — Byzantine feil, feiltype-hierarki, 2PC, 3PC og tilgjengelighetsformler
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
                <th className="text-left p-3 border border-[var(--card-border)]">Svar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Min. noder for å tolerere k Byzantine feil?", "N ≥ 3k + 1"],
                ["Min. noder for k crash-feil?", "N ≥ 2k + 1 (vanlig quorum)"],
                ["Hva er blocking i 2PC?", "Deltakernode kan blokkere hvis koordinator krasjer etter PREPARE men før COMMIT/ABORT"],
                ["Hva løser 3PC?", "Fjerner blocking ved å legge til en mellomfase (PRE-COMMIT) som kan finne konsensus uten koordinator"],
                ["Availability-formel?", "A = MTTF / (MTTF + MTTR)"],
                ["Hva er MTTF?", "Mean Time To Failure — forventet tid mellom feil"],
                ["Hva er MTTR?", "Mean Time To Repair — forventet tid for å reparere"],
                ["Sterkeste feiltype?", "Byzantine — prosess kan oppføre seg vilkårlig og ondsinnet"],
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

      {/* ── Byzantine ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span>
          Byzantine feil — 3k+1-regelen
        </h2>

        <FormulaBox label="Byzantine feiltoleranse — VIKTIGST" formula="N ≥ 3k + 1" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="N" meaning="Totalt antall prosesser/noder i systemet" />
            <VarRow sym="k" meaning="Antall Byzantine-feilende prosesser som tolereres" />
            <VarRow sym="3k+1" meaning="Minimum noder slik at ærlige noder fortsatt kan nå konsensus" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-2">Eksempler:</p>
            <div className="grid sm:grid-cols-3 gap-2 font-mono">
              <div className="bg-white dark:bg-neutral-900 rounded p-2 text-center border border-[var(--card-border)]">
                <p className="text-[var(--muted)]">k=1</p>
                <p className="font-bold">N ≥ 4</p>
              </div>
              <div className="bg-white dark:bg-neutral-900 rounded p-2 text-center border border-[var(--card-border)]">
                <p className="text-[var(--muted)]">k=2</p>
                <p className="font-bold">N ≥ 7</p>
              </div>
              <div className="bg-white dark:bg-neutral-900 rounded p-2 text-center border border-[var(--card-border)]">
                <p className="text-[var(--muted)]">k=3</p>
                <p className="font-bold">N ≥ 10</p>
              </div>
            </div>
            <p className="mt-2 text-[var(--muted)]">Intuisjon: av N noder er k Byzantine. Vi trenger 2k+1 ærlige som kan nå flertall blant 3k+1 totalt. Med N=3k, har vi k Byzantine + 2k ærlige, men 2k er ikke flertall blant 3k.</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── Feiltype-hierarki ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span>
          Feiltype-hierarki
        </h2>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-4 text-center">Svakest → Sterkest (hvert nivå inkluderer alt over)</h3>
          <div className="space-y-2">
            {[
              {
                name: "Crash failure",
                desc: "Prosessen slutter å svare permanent. Enkleste feiltype å håndtere.",
                color: "bg-green-500",
                subset: "⊂",
              },
              {
                name: "Omission failure",
                desc: "Prosessen unnlater å sende/motta noen meldinger (sender/receive omission).",
                color: "bg-yellow-500",
                subset: "⊂",
              },
              {
                name: "Timing failure",
                desc: "Prosessen svarer, men utenfor den tillatte tidsrammen (for tidlig eller for sent).",
                color: "bg-orange-500",
                subset: "⊂",
              },
              {
                name: "Response failure",
                desc: "Prosessen sender feil svar — feil verdi eller feil kontrollflyt.",
                color: "bg-red-500",
                subset: "⊂",
              },
              {
                name: "Byzantine (arbitrary) failure",
                desc: "Prosessen kan oppføre seg fullstendig vilkårlig — inkl. ondsinnet atferd, løgn og manipulasjon.",
                color: "bg-red-800",
                subset: "",
              },
            ].map((f, i) => (
              <div key={f.name}>
                <div className="flex items-start gap-3 rounded-lg bg-white dark:bg-neutral-900 border border-[var(--card-border)] p-3">
                  <div className={`${f.color} text-white rounded px-2 py-0.5 text-xs font-bold shrink-0 mt-0.5 min-w-[60px] text-center`}>
                    Nivå {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{f.desc}</p>
                  </div>
                </div>
                {f.subset && (
                  <div className="text-center text-blue-500 font-bold text-lg my-0.5">⊂</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-white dark:bg-neutral-900 border border-[var(--card-border)] p-3 text-xs">
            <p className="font-bold text-center mb-1">crash ⊂ omission ⊂ timing ⊂ response ⊂ Byzantine</p>
            <p className="text-[var(--muted)] text-center">Et crash-tolerant system er ikke nødvendigvis Byzantine-tolerant, men et Byzantine-tolerant system tåler alle lavere feiltyper.</p>
          </div>
        </div>
      </section>

      {/* ── 2PC ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</span>
          Two-Phase Commit (2PC)
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <PhaseBox
            phase="Fase 1"
            title="Voting Phase (PREPARE)"
            messages="Koordinator → alle: PREPARE\nDeltaker → koordinator: VOTE-COMMIT eller VOTE-ABORT"
            description="Koordinatoren spør alle deltakere om de er klare til å committe. Deltakerne logger og stemmer."
            color="border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          />
          <PhaseBox
            phase="Fase 2"
            title="Completion Phase (COMMIT/ABORT)"
            messages="Koordinator → alle: GLOBAL-COMMIT eller GLOBAL-ABORT\nDeltaker → koordinator: ACK"
            description="Basert på alle stemmer: hvis alle stemte COMMIT → GLOBAL-COMMIT, ellers GLOBAL-ABORT."
            color="border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          />
        </div>

        <div className="rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4 mt-3">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">2PC problem: Blocking</h3>
          <p className="text-sm text-[var(--muted)]">
            Hvis koordinatoren krasjer etter å ha sendt PREPARE, men før COMMIT/ABORT, sitter deltakerne låst
            i PREPARED-tilstand. De vet ikke om de skal committe eller abortere — og kan ikke bestemme det
            uten koordinatoren. Transaksjonen er blokkert.
          </p>
          <div className="mt-3 font-mono text-xs bg-white dark:bg-neutral-900 rounded p-3 border border-[var(--card-border)]">
            <p className="text-[var(--muted)]">Meldinger totalt: 2N (N PREPARE + N ACK/COMMIT)</p>
            <p className="text-[var(--muted)]">Runder: 2 (én per fase)</p>
          </div>
        </div>
      </section>

      {/* ── 3PC ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">4</span>
          Three-Phase Commit (3PC)
        </h2>

        <div className="grid sm:grid-cols-3 gap-3 my-4">
          <PhaseBox
            phase="Fase 1"
            title="Voting (PREPARE)"
            messages="PREPARE →\n← VOTE-COMMIT / VOTE-ABORT"
            description="Deltakere stemmer. Ingen er forpliktet ennå."
            color="border-green-400 bg-green-50 dark:bg-green-950/20"
          />
          <PhaseBox
            phase="Fase 2"
            title="Pre-commit (PRE-COMMIT)"
            messages="PRE-COMMIT →\n← ACK"
            description="Koordinator sender PRE-COMMIT. Alle vet nå at alle har stemt COMMIT."
            color="border-green-400 bg-green-50 dark:bg-green-950/20"
          />
          <PhaseBox
            phase="Fase 3"
            title="Commit (GLOBAL-COMMIT)"
            messages="GLOBAL-COMMIT →\n← ACK"
            description="Endelig commit. Deltakere kan nå committe autonomt etter PRE-COMMIT."
            color="border-green-400 bg-green-50 dark:bg-green-950/20"
          />
        </div>

        <div className="rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4 mt-3">
          <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">3PC fordel: Non-blocking</h3>
          <p className="text-sm text-[var(--muted)]">
            PRE-COMMIT-fasen sikrer at deltakerne vet om alle andre har stemt. Hvis koordinatoren krasjer etter PRE-COMMIT,
            kan deltakerne samarbeide og committe uten koordinatoren. Løser blokkerings-problemet i 2PC.
          </p>
          <p className="text-xs text-[var(--muted)] mt-2 italic">
            Merk: 3PC er ikke Byzantine-tolerant — virker kun for crash-feil. Fungerer ikke under nettverkspartisjoner.
          </p>
        </div>
      </section>

      {/* ── Tilgjengelighet ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">5</span>
          Availability (tilgjengelighet)
        </h2>

        <FormulaBox label="Availability-formel" formula="A = MTTF / (MTTF + MTTR)" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="A" meaning="Availability — andel tid systemet er tilgjengelig (0 til 1, eller prosent)" />
            <VarRow sym="MTTF" meaning="Mean Time To Failure — forventet tid mellom to feil (timer, dager)" />
            <VarRow sym="MTTR" meaning="Mean Time To Repair — forventet tid for å reparere etter feil" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-2">Eksempelberegning:</p>
            <p className="font-mono">MTTF = 1000 timer, MTTR = 10 timer</p>
            <p className="font-mono">A = 1000 / (1000 + 10) = 1000/1010 ≈ 0.99 = 99%</p>
          </div>
        </FormulaBox>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-3">Tilgjengelighetsnivåer ("nines")</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900/30">
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Availability</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Nedetid per år</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Nedetid per måned</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Navn</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["90%", "36.5 dager", "73 timer", "One nine"],
                  ["99%", "3.65 dager", "7.3 timer", "Two nines"],
                  ["99.9%", "8.76 timer", "44 min", "Three nines"],
                  ["99.99%", "52.6 min", "4.4 min", "Four nines"],
                  ["99.999%", "5.26 min", "26 sek", "Five nines"],
                ].map(([avail, yearly, monthly, name]) => (
                  <tr key={avail} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-mono font-bold text-blue-700 dark:text-blue-300">{avail}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs">{yearly}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs">{monthly}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              "Byzantine regelen er N ≥ 3k+1, ikke 2k+1. Med 2k+1 kan vi tolerere crash-feil, men ikke Byzantine feil.",
              "2PC er blocking — dette er designfeil, ikke implementasjonsfeil. 3PC løser dette for crash-feil.",
              "3PC er IKKE Byzantine-tolerant. Det hjelper kun mot crash-feil og virker ikke under nettverkspartisjoner.",
              "Feiltype-hierarkiet: hvert nivå inkluderer alle lavere. Byzantine-tolerant ⟹ tolererer alle lavere feiltyper.",
              "MTTF og MTTR: availability er alltid mellom 0 og 1. Jo lavere MTTR, jo høyere tilgjengelighet.",
              "I 2PC stemmer alle deltakere — en enkelt VOTE-ABORT er nok til global abort. Koordinatoren kan ikke overstyre.",
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
