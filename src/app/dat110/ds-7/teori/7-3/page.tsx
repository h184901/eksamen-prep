"use client";

import { useState } from "react";
import Link from "next/link";

type Guarantee =
  | "monotonic_reads"
  | "monotonic_writes"
  | "read_your_writes"
  | "writes_follow_reads";

const guaranteeInfo: Record<
  Guarantee,
  {
    name: string;
    notation: string;
    definition: string;
    intuition: string;
    scenario: string;
    violation: string;
    example: string;
    wsNotation: string;
    color: string;
    lightBg: string;
    border: string;
  }
> = {
  monotonic_reads: {
    name: "Monotonic Reads",
    notation: "MR",
    definition:
      "Hvis en prosess leser verdien av dataelement x, vil alle påfølgende leseoperasjoner på x alltid returnere den samme verdien eller en nyere verdi.",
    intuition:
      'Tid går bare fremover. Hvis du har sett versjon v av en fil, skal du aldri plutselig se en eldre versjon. "Aldri gå bakover i tid."',
    scenario:
      "Klient kobler til Replika1, leser e-post-versjon 42. Kobler til Replika2 — skal se versjon 42 eller nyere, aldri versjon 38.",
    violation:
      "Klient leser e-post-liste på Replika1, ser 42 meldinger. Kobler til Replika2 (utdatert), ser 38 meldinger. BRUDD!",
    example: "E-postklient: du skal aldri se færre e-poster enn sist gang.",
    wsNotation: "Hvis W(x_1) er lest, og W(x_2) skjer etterpå, gjelder: x_2 ≥ x_1",
    color: "text-blue-600 dark:text-blue-400",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-300 dark:border-blue-700",
  },
  monotonic_writes: {
    name: "Monotonic Writes",
    notation: "MW",
    definition:
      "Skriveoperasjoner fra samme prosess utføres i den rekkefølgen de ble sendt. W(x)₁ før W(x)₂ betyr at W(x)₁ er propagert til alle replikaer FØR W(x)₂ propageres.",
    intuition:
      "Dine egne skrivinger utføres i riktig rekkefølge. Hvis du oppdaterer en fil to ganger, skal alle servere se oppdatering 1 FØR oppdatering 2.",
    scenario:
      "Klient skriver versjon 1 av et dokument (W(x)₁), deretter versjon 2 (W(x)₂). Alle replikaer MÅ se versjon 1 før versjon 2.",
    violation:
      "Replika3 mottar W(x)₂ (versjon 2) uten å ha mottatt W(x)₁ (versjon 1). Overskriver feil data. BRUDD!",
    example: "Oppdatering av konfigfil: patch 1 MÅ komme før patch 2.",
    wsNotation:
      "W(x_1; x_2): W(x_1) er utført på alle replikaer FØR W(x_2) utføres.",
    color: "text-purple-600 dark:text-purple-400",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-300 dark:border-purple-700",
  },
  read_your_writes: {
    name: "Read Your Writes",
    notation: "RYW",
    definition:
      "Effekten av en skriveoperasjon vil alltid ses av etterfølgende leseoperasjoner fra samme prosess. Klienten ser alltid sine egne skrivinger.",
    intuition:
      'Når du lagrer noe, ser du det lagrede resultatet — ikke en gammel versjon. Dette er nesten alltid det vi forventer av et system. "Hva jeg skriver, leser jeg."',
    scenario:
      "Klient oppdaterer profilbilde på Replika1 (W(x)=nytt bilde). Kobler til Replika2 — må se det nye bildet, ikke det gamle.",
    violation:
      "Du oppdaterer profilbilde, navigerer til profilen din, og ser det gamle bildet. BRUDD!",
    example:
      "Facebook: etter at du poster en status, ser du din egen status i nyhetsfeedede.",
    wsNotation:
      "For samme prosess: W(x_i) → R(x_j) der j ≥ i (leser alltid versjon ≥ den du skrev)",
    color: "text-green-600 dark:text-green-400",
    lightBg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-300 dark:border-green-700",
  },
  writes_follow_reads: {
    name: "Writes Follow Reads",
    notation: "WFR",
    definition:
      "En skriveoperasjon etter en leseoperasjon er garantert å se verdien lest, eller en nyere verdi. Kalles også 'session causality'.",
    intuition:
      "Hvis du leser noe og deretter skriver basert på det du leste, skal din skriving propageres etter det du leste. Du kan ikke skrive 'basert på x=5' til en replika som ennå ikke har sett x=5.",
    scenario:
      "Klient leser x=5 fra Replika1. Skriver y=x+1=6. Denne skrivingen propageres kun til replikaer som allerede har x=5.",
    violation:
      "Klient leser x=5, skriver y=6. Men Replika2 mottar y=6 uten å ha sett x=5 — ser nå y=6 uten kontekst. BRUDD!",
    example:
      "Wiki: du leser artikkelversjon 10, redigerer. Din redigering propageres kun etter versjon 10 er propagert.",
    wsNotation:
      "R(x_i) → W(y_j): alle replikaer som ser W(y_j) har allerede sett W(x_i)",
    color: "text-orange-600 dark:text-orange-400",
    lightBg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-300 dark:border-orange-700",
  },
};

type ScenarioStep = {
  actor: string;
  action: string;
  replica: string;
  value: string;
  ok: boolean;
  reason?: string;
};

const replicaScenarios: Record<Guarantee, { steps: ScenarioStep[]; guaranteeOk: boolean }> = {
  monotonic_reads: {
    steps: [
      { actor: "Klient", action: "Kobler til Replika1", replica: "Replika1 (oppdatert)", value: "Leser e-post: 42 meldinger", ok: true },
      { actor: "Klient", action: "Bytter til Replika2 (utdatert)", replica: "Replika2 (gammel)", value: "Leser e-post: 38 meldinger", ok: false, reason: "Ser eldre verdi enn sist! Bryter Monotonic Reads." },
      { actor: "System", action: "MR-garanti: synkroniser", replica: "Replika2 (oppdatert)", value: "Leser e-post: 42+ meldinger", ok: true },
    ],
    guaranteeOk: false,
  },
  monotonic_writes: {
    steps: [
      { actor: "Klient", action: "Skriver W(x)=versjon1", replica: "Replika1", value: "v1 lagret", ok: true },
      { actor: "Klient", action: "Skriver W(x)=versjon2", replica: "Replika1", value: "v2 lagret", ok: true },
      { actor: "Replika2", action: "Mottar kun versjon2", replica: "Replika2 (feil)", value: "Ser v2 uten v1!", ok: false, reason: "MW-garanti brutt: v1 MÅ propageres før v2." },
    ],
    guaranteeOk: false,
  },
  read_your_writes: {
    steps: [
      { actor: "Klient", action: "Oppdaterer profilbilde", replica: "Replika1", value: "W(bilde)=nytt.jpg", ok: true },
      { actor: "Klient", action: "Kobler til Replika2 (utdatert)", replica: "Replika2", value: "R(bilde)=gammelt.jpg", ok: false, reason: "Klienten ser ikke sin egen skriving — RYW brutt!" },
      { actor: "System", action: "RYW-garanti: videresend klient til riktig replika", replica: "Replika1 eller oppdatert", value: "R(bilde)=nytt.jpg", ok: true },
    ],
    guaranteeOk: false,
  },
  writes_follow_reads: {
    steps: [
      { actor: "Klient", action: "Leser x=5 fra Replika1", replica: "Replika1", value: "R(x)=5", ok: true },
      { actor: "Klient", action: "Beregner og skriver y=6", replica: "Replika1", value: "W(y)=6 (basert på x=5)", ok: true },
      { actor: "Replika2", action: "Mottar W(y)=6 uten x=5", replica: "Replika2", value: "Ser y=6, men x=3 (gammel)", ok: false, reason: "WFR brutt: y=6 propagert til replika som ikke har sett x=5." },
    ],
    guaranteeOk: false,
  },
};

export default function DS7_3Page() {
  const [activeGuarantee, setActiveGuarantee] = useState<Guarantee>("monotonic_reads");
  const guarantees: Guarantee[] = [
    "monotonic_reads",
    "monotonic_writes",
    "read_your_writes",
    "writes_follow_reads",
  ];

  const info = guaranteeInfo[activeGuarantee];
  const scenario = replicaScenarios[activeGuarantee];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-7/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">7.3 Klient-sentrerte konsistensmodeller</span>
      </div>

      <h1 className="text-2xl font-bold">7.3 Klient-sentrerte konsistensmodeller</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Datasentrerte modeller (7.2) ser på systemet som helhet. Klientsentrerte modeller fokuserer på
        <strong> én enkelt klients opplevelse</strong> — spesielt viktig i systemer med eventual consistency
        der klienter kan koble til ulike replikaer.
      </p>

      {/* Kontekst */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kontekst: Hvorfor trenger vi dette?</h2>
        <p className="text-sm text-[var(--muted)]">
          Mange systemer bruker eventual consistency (DNS, Cassandra, DynamoDB) for ytelse. Men brukerne forventer likevel visse minimale garantier.
          En mobilklient som bytter mellom WiFi og 4G kobler til forskjellige replikaer — og kan plutselig se utdaterte data.
          Klientsentrerte modeller gir garantier for <em>én klients</em> sekvens av operasjoner, uten å kreve sterk global konsistens.
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--muted)]">
          <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400">Eventual Consistency (system)</span>
          <span>+</span>
          <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">Klientsentrerte garantier</span>
          <span>=</span>
          <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400">Brukervennlig system</span>
        </div>
      </div>

      {/* Hva du MÅ kunne */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Hva du MÅ kunne</h2>
        <ul className="space-y-1 text-sm list-disc list-inside text-[var(--foreground)]">
          <li>Definisjonen av alle 4 garantier (MR, MW, RYW, WFR)</li>
          <li>Konkret eksempel på brudd på hver garanti</li>
          <li>WS-notasjon: W(x₁; x₂) betyr x₁ er propagert til alle replikaer før x₂ utføres</li>
          <li>Forskjellen mellom datasentrert (7.2) og klientsentrert (7.3) konsistens</li>
        </ul>
      </div>

      {/* Eksamensfokus */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <strong className="text-amber-700 dark:text-amber-400">Eksamensfokus (Oppg. 9c, 2025):</strong>{" "}
        "Beskriv kort forskjellen mellom datasentrert og klientsentrert konsistens." — Svar: Datasentrert (7.2) handler om
        systemets globale garantier (hva alle prosesser kan observere). Klientsentrert (7.3) handler om én klients
        opplevde sekvens av operasjoner, spesielt ved replikaskifter i eventual consistency-systemer.
      </div>

      {/* Interaktiv garanti-utforsker */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">De 4 klientsentrerte garantiene</h2>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {guarantees.map((g) => {
            const gi = guaranteeInfo[g];
            return (
              <button
                key={g}
                onClick={() => setActiveGuarantee(g)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all text-left ${
                  activeGuarantee === g
                    ? `${gi.lightBg} ${gi.color} ${gi.border}`
                    : "border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                <div className="font-bold">{gi.notation}</div>
                <div className="text-xs opacity-80 mt-0.5">{gi.name}</div>
              </button>
            );
          })}
        </div>

        {/* Garanti-detaljer */}
        <div className={`rounded-xl border-2 ${info.border} ${info.lightBg} p-6 space-y-4`}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-2xl font-black ${info.color}`}>{info.notation}</span>
              <h3 className={`text-lg font-bold ${info.color}`}>{info.name}</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Definisjon</span>
              <p className="text-sm text-[var(--foreground)] mt-1 leading-relaxed">{info.definition}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Intuisjon</span>
              <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed italic">{info.intuition}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Scenario</p>
              <p className="text-xs text-[var(--muted)]">{info.scenario}</p>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Brudd (violation)</p>
              <p className="text-xs text-[var(--muted)]">{info.violation}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">Konkret eksempel</p>
              <p className="text-xs text-[var(--foreground)]">{info.example}</p>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">WS-notasjon</p>
              <p className="text-xs font-mono text-[var(--foreground)]">{info.wsNotation}</p>
            </div>
          </div>
        </div>

        {/* Interaktivt replika-scenario */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h3 className="font-semibold text-sm mb-4">Trinn-for-trinn: klient bytter replika</h3>
          <div className="space-y-3">
            {scenario.steps.map((step, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${
                step.ok
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20"
                  : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20"
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  step.ok ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}>
                  {step.ok ? i + 1 : "!"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="text-xs font-semibold text-[var(--foreground)]">{step.actor}</span>
                    <span className="text-xs text-[var(--muted)]">{step.action}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                      {step.replica}
                    </span>
                  </div>
                  <p className={`text-xs ${step.ok ? "text-[var(--muted)]" : "text-red-600 dark:text-red-400 font-medium"}`}>
                    {step.value}
                  </p>
                  {step.reason && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1 italic">{step.reason}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WS-notasjonsforklaring */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">WS-notasjon (Write-Set notation)</h2>
        <p className="text-sm text-[var(--muted)]">
          Boken bruker en spesiell notasjon for å beskrive skrivinger og deres relasjoner:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Notasjon</th>
                <th className="text-left py-2 pr-4 font-semibold">Betyr</th>
                <th className="text-left py-2 font-semibold">Brukes i</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                { notation: "W(x_i)", means: "Skriving nr. i til variabel x", used: "Alle garantier" },
                { notation: "W(x_1; x_2)", means: "W(x_1) er relevant for W(x_2): x_1 er propagert til alle replikaer der x_2 utføres", used: "MR, MW, WFR" },
                { notation: "R(x_i; x_j)", means: "Lesing returnerer versjon j, relevant for tidligere versjon i", used: "MR, RYW" },
                { notation: "W(x_j | W(x_i))", means: "W(x_j) avhenger av W(x_i) (kausalt)", used: "WFR" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400">{row.notation}</td>
                  <td className="py-2 pr-4">{row.means}</td>
                  <td className="py-2">{row.used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sammenligningstabellen */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Sammenligningstabellen</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-3 font-semibold">Garanti</th>
                <th className="text-left py-2 pr-3 font-semibold">Forkortelse</th>
                <th className="text-left py-2 pr-3 font-semibold">Garanterer</th>
                <th className="text-left py-2 pr-3 font-semibold">Konkret eksempel</th>
                <th className="text-left py-2 font-semibold">Brudd-eksempel</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                {
                  name: "Monotonic Reads",
                  short: "MR",
                  color: "text-blue-600 dark:text-blue-400",
                  guarantees: "Leser aldri eldre data enn sist",
                  example: "E-post: ser aldri færre meldinger enn sist",
                  violation: "Kobler til gammel replika, ser eldre e-post",
                },
                {
                  name: "Monotonic Writes",
                  short: "MW",
                  color: "text-purple-600 dark:text-purple-400",
                  guarantees: "Egne skrivinger propageres i riktig rekkefølge",
                  example: "Patch 1 kommer alltid før patch 2",
                  violation: "Patch 2 overskriver innhold uten patch 1",
                },
                {
                  name: "Read Your Writes",
                  short: "RYW",
                  color: "text-green-600 dark:text-green-400",
                  guarantees: "Ser alltid dine egne skrivinger",
                  example: "Ser eget profilbilde etter oppdatering",
                  violation: "Ser gammelt bilde etter du lagret nytt",
                },
                {
                  name: "Writes Follow Reads",
                  short: "WFR",
                  color: "text-orange-600 dark:text-orange-400",
                  guarantees: "Skriving etter lesing reflekterer lest data",
                  example: "Wiki-redigering basert på versjon 10 propageres etter v10",
                  violation: "Redigering propageres til replika uten versjon 10",
                },
              ].map((row) => (
                <tr key={row.short} className="border-b border-[var(--card-border)]">
                  <td className={`py-2 pr-3 font-semibold ${row.color}`}>{row.name}</td>
                  <td className={`py-2 pr-3 font-bold ${row.color}`}>{row.short}</td>
                  <td className="py-2 pr-3">{row.guarantees}</td>
                  <td className="py-2 pr-3 text-xs">{row.example}</td>
                  <td className="py-2 text-xs text-red-500">{row.violation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Datasentrert vs. Klientsentrert */}
      <section className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400">Datasentrert vs. Klientsentrert — for eksamen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-4">
            <h3 className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">Datasentrert (7.2)</h3>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Systemets globale garantier</li>
              <li>Handler om hva ALLE prosesser kan observere</li>
              <li>Modeller: strict, sequential, causal, eventual</li>
              <li>Krever koordinering mellom alle noder</li>
              <li>Eks: "Alle prosesser ser samme rekkefølge" (sequential)</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-4">
            <h3 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">Klientsentrert (7.3)</h3>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>En enkelt klients opplevelse</li>
              <li>Handler om hva ÉN klient ser over tid</li>
              <li>Garantier: MR, MW, RYW, WFR</li>
              <li>Kompatibelt med eventual consistency</li>
              <li>Eks: "Du ser alltid dine egne skrivinger" (RYW)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5">
        <h2 className="font-semibold text-red-700 dark:text-red-400 mb-3">Vanlige feil</h2>
        <ul className="space-y-2 text-sm text-[var(--muted)] list-disc list-inside">
          <li>Forveksle Monotonic Reads (leserekkefølge) med Read Your Writes (egne skrivinger).</li>
          <li>Tro at klientsentrerte garantier krever global konsistens — de er designet for eventual consistency.</li>
          <li>Glemme at WFR (Writes Follow Reads) handler om kausal avhengighet mellom lese- og skriveoperasjoner.</li>
          <li>Forveksle MW (skriveordning) med RYW (se egne skrivinger) — MW handler om ORDER mellom skrivinger, RYW om VISIBILITY.</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-7/teori/7-2" className="hover:text-[var(--accent)] text-sm">
          ← 7.2 Data-sentrerte konsistensmodeller
        </Link>
        <Link href="/dat110/ds-7/teori/7-5" className="hover:text-[var(--accent)] text-sm">
          7.5 Konsistensprotokoller →
        </Link>
      </div>
    </div>
  );
}
