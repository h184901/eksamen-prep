"use client";

import { useState } from "react";
import Link from "next/link";

const FAILURE_TYPES = [
  {
    name: "Crash failure",
    norsk: "Krasjfeil",
    color: "bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700",
    headerColor: "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200",
    description: "Serveren stopper helt, men fungerte korrekt inntil den stoppet. Ingenting høres fra den etterpå.",
    example: "Operativsystemet krasjer (BSoD). Etter reboot er alt OK — men serveren svarte ikke mens den var nede.",
    severity: 1,
  },
  {
    name: "Omission failure",
    norsk: "Utelatelsesfeil",
    color: "bg-orange-100 dark:bg-orange-900/40 border-orange-300 dark:border-orange-700",
    headerColor: "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200",
    description: "Serveren svarer ikke på forespørsler. To varianter: receive-omission (fikk ikke meldingen) og send-omission (klarte ikke sende svar).",
    example: "Receive-omission: ingen tråd lytter på porten. Send-omission: send-buffer er fullt, pakken droppes.",
    severity: 2,
  },
  {
    name: "Timing failure",
    norsk: "Tidsfeil",
    color: "bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-700",
    headerColor: "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200",
    description: "Svaret kommer utenfor den spesifiserte tidsrammen — enten for sent (performance failure) eller for tidlig.",
    example: "Videostrøm som buffrer: serveren leverer data for sakte (for sent), eller for raskt slik at mottakers buffer flommer over.",
    severity: 3,
  },
  {
    name: "Response failure",
    norsk: "Responsfeil",
    color: "bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700",
    headerColor: "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200",
    description: "Svaret er galt. To varianter: value failure (feil verdi) og state-transition failure (feil tilstandsovergang).",
    example: "Søkemotor som returnerer irrelevante sider (value failure). En server som ikke gjenkjenner en melding og tar standardhandlinger den aldri burde ha tatt.",
    severity: 4,
  },
  {
    name: "Byzantine / Arbitrary failure",
    norsk: "Bysantinsk feil",
    color: "bg-gray-100 dark:bg-gray-900/40 border-gray-400 dark:border-gray-600",
    headerColor: "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
    description: "Vilkårlig oppførsel: serveren kan produsere hvilken som helst output til hvilken som helst tid — inkludert bevisst sabotasje. Verste tilfellet.",
    example: "En kompromittert server som sender falske stemmer i en konsensus-protokoll. Klienten kan ikke skille korrekte fra ukorrekte svar.",
    severity: 5,
  },
];

const DEPENDABILITY = [
  { term: "Tilgjengelighet (Availability)", desc: "Sannsynligheten for at systemet er operativt akkurat nå. Høy tilgjengelighet = systemet er sjelden nede.", metric: "A = MTTF / (MTTF + MTTR)" },
  { term: "Pålitelighet (Reliability)", desc: "Evnen til å kjøre kontinuerlig uten feil. Defineres over et tidsintervall, ikke et øyeblikk. Et system som aldri krasjer men slås av to uker i august har høy pålitelighet men lav tilgjengelighet.", metric: "R(t) = e^{-zt}" },
  { term: "Sikkerhet (Safety)", desc: "Når systemet midlertidig svikter, skjer det ingen katastrofe. Kritisk for atomanlegg, flykontroll osv.", metric: "" },
  { term: "Vedlikeholdbarhet (Maintainability)", desc: "Hvor lett et havarert system kan repareres. Høy vedlikeholdbarhet gir implisitt høy tilgjengelighet.", metric: "" },
];

const REDUNDANCY = [
  { type: "Informasjonsredundans", icon: "🔢", desc: "Ekstra bits legges til for å oppdage/korrigere feil. Eksempel: Hamming-kode, CRC, paritetsbits.", ex: "Hamming-kode i RAM, CRC i Ethernet-rammer" },
  { type: "Tidsredundans", icon: "⏱️", desc: "Operasjonen gjøres om igjen hvis noe gikk galt. Fungerer best mot transiente feil.", ex: "TCP retransmisjon, idempotente RPC-kall" },
  { type: "Fysisk redundans", icon: "🖥️", desc: "Ekstra utstyr eller prosesser legges til. Systemet tåler tap av noen komponenter.", ex: "RAID-disk, Triple Modular Redundancy (TMR), repliserte servere" },
];

export default function DS8_1Page() {
  const [activeType, setActiveType] = useState(0);
  const [showHierarchy, setShowHierarchy] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.1 Introduksjon til feiltoleranse</span>
      </div>

      <h1 className="text-2xl font-bold">8.1 Introduksjon til feiltoleranse</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Et distribuert system er forventet å tolerere delfeil — at noen komponenter svikter mens resten fortsetter å fungere. Her dekker vi grunnbegrepene, feiltypene og hvordan redundans er løsningen.
      </p>

      {/* Eksamensvarsel */}
      <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4">
        <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Eksamensgaranti — Feiltyper</p>
        <p className="text-sm text-red-700 dark:text-red-300">
          Eksamen mai-2024 oppg. 1g: <em>&ldquo;The type of failure where a server fails to respond to incoming requests&rdquo;</em> → Svar: <strong>Omission failure</strong>. Lær alle 5 typer og hierarkiet utenat.
        </p>
      </div>

      {/* Fault → Error → Failure kjeden */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Fault → Error → Failure-kjeden</h2>
        <p className="text-[var(--muted)] mb-4">
          Det er viktig å skille mellom tre begreper som ofte blandes:
        </p>
        <div className="flex flex-col sm:flex-row gap-1 items-stretch mb-4">
          {[
            { label: "Fault (årsak)", desc: "Den underliggende årsaken. Eks: programvarebug, slitt kabel, dårlig vær som forstyrrer signal.", color: "bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700" },
            { label: "→", desc: "", color: "hidden sm:flex items-center justify-center text-2xl text-[var(--muted)]" },
            { label: "Error (tilstand)", desc: "En del av systemtilstanden som kan føre til feil. Eks: en korrupt pakke er på vei til mottaker.", color: "bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700" },
            { label: "→", desc: "", color: "hidden sm:flex items-center justify-center text-2xl text-[var(--muted)]" },
            { label: "Failure (observert feil)", desc: "Systemet leverer ikke tjenesten det lovet. Eks: programmet krasjer, feil svar returneres.", color: "bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700" },
          ].map((item, i) =>
            item.desc === "" ? (
              <div key={i} className="hidden sm:flex items-center justify-center text-2xl text-[var(--muted)] px-1">→</div>
            ) : (
              <div key={i} className={`flex-1 rounded-xl p-4 border ${item.color}`}>
                <p className="font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-xs text-[var(--muted)]">{item.desc}</p>
              </div>
            )
          )}
        </div>
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 text-sm">
          <p className="font-medium mb-1">Eksempel — programmerings-bug som feil-kjede:</p>
          <p className="text-[var(--muted)]">
            <strong>Fault:</strong> programmerer skriver feil kode (bug) →{" "}
            <strong>Error:</strong> programmet kjører inn i feil kodesti →{" "}
            <strong>Failure:</strong> programmet krasjer (synlig for brukeren).
          </p>
        </div>
      </section>

      {/* Feilklassifisering: transient/intermittent/permanent */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Feilklassifisering</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { type: "Transient", desc: "Oppstår én gang og forsvinner. Gjentatt operasjon fungerer. Eks: fugl som flyr gjennom mikrobølgebjelke.", tip: "Lettest å håndtere — bare prøv igjen." },
            { type: "Intermittent", desc: "Oppstår, forsvinner, dukker opp igjen. Vanskeligst å diagnostisere — «doktoren viser opp, og alt ser fint ut».", tip: "Vanskeligst — svekket kontakt, temperaturavhengig." },
            { type: "Permanent", desc: "Vedvarer til komponenten byttes ut. Utbrente chips, programvarebug, diskhodefeil.", tip: "Krever utskifting / reparasjon." },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">{item.type}</p>
              <p className="text-sm text-[var(--muted)] mb-2">{item.desc}</p>
              <p className="text-xs italic text-[var(--muted)]">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pålitelighet (Dependability) */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Pålitelighet (Dependability)</h2>
        <p className="text-[var(--muted)] mb-4 text-sm">
          Dependability er et samlebegrep for krav til et pålitelig distribuert system. Det inkluderer fire egenskaper:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEPENDABILITY.map((d) => (
            <div key={d.term} className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">{d.term}</p>
              <p className="text-sm text-[var(--muted)]">{d.desc}</p>
              {d.metric && (
                <p className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 rounded px-2 py-1 inline-block">{d.metric}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 text-sm">
          <p className="font-medium mb-1">Merk forskjellen: Tilgjengelighet vs Pålitelighet</p>
          <p className="text-[var(--muted)]">
            Et system som krasjer i gjennomsnitt 1 ms per time har tilgjengelighet &gt; 99,9999%, men er svært upålitelig (krasjer 8760 ganger/år). Et system som aldri krasjer men stenges ned to uker i august har høy pålitelighet men bare 96% tilgjengelighet.
          </p>
        </div>
      </section>

      {/* Interaktiv: feiltype-hierarki */}
      <section>
        <h2 className="text-xl font-semibold mb-1 text-blue-600 dark:text-blue-400">Feiltype-hierarkiet (DS kap. 8, Fig. 8.2)</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Feiltypene danner et hierarki — crash er det minst alvorlige (og lettest å håndtere), Byzantine er det verste. Klikk på en feiltype for å lære mer.
        </p>

        {/* Hierarki SVG */}
        <div className="mb-4">
          <button
            onClick={() => setShowHierarchy(!showHierarchy)}
            className="text-sm text-blue-600 dark:text-blue-400 underline mb-2"
          >
            {showHierarchy ? "Skjul" : "Vis"} hierarki-diagram
          </button>
          {showHierarchy && (
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
              <svg viewBox="0 0 560 180" className="w-full max-w-2xl mx-auto">
                {/* Nesting boxes */}
                <rect x="10" y="10" width="540" height="160" rx="12" fill="#7C3AED" fillOpacity="0.12" stroke="#7C3AED" strokeWidth="1.5"/>
                <text x="280" y="26" textAnchor="middle" fontSize="11" fill="#7C3AED" fontWeight="bold">Byzantine (vilkårlig)</text>
                <rect x="30" y="32" width="500" height="130" rx="10" fill="#9333EA" fillOpacity="0.10" stroke="#9333EA" strokeWidth="1.2"/>
                <text x="280" y="47" textAnchor="middle" fontSize="11" fill="#9333EA" fontWeight="bold">Response failure (feil svar)</text>
                <rect x="55" y="54" width="450" height="100" rx="8" fill="#EAB308" fillOpacity="0.10" stroke="#EAB308" strokeWidth="1.2"/>
                <text x="280" y="68" textAnchor="middle" fontSize="11" fill="#D97706" fontWeight="bold">Timing failure (for sent/tidlig)</text>
                <rect x="80" y="76" width="400" height="72" rx="7" fill="#F97316" fillOpacity="0.10" stroke="#F97316" strokeWidth="1.2"/>
                <text x="280" y="90" textAnchor="middle" fontSize="11" fill="#EA580C" fontWeight="bold">Omission failure (svarer ikke)</text>
                <rect x="110" y="98" width="340" height="44" rx="6" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="1.5"/>
                <text x="280" y="125" textAnchor="middle" fontSize="12" fill="#DC2626" fontWeight="bold">Crash failure (stopper)</text>
                <text x="280" y="138" textAnchor="middle" fontSize="10" fill="#DC2626">Minst alvorlig — lettest å tolerere</text>
              </svg>
              <p className="text-xs text-center text-[var(--muted)] mt-1">Crash ⊂ Omission ⊂ Timing ⊂ Response ⊂ Byzantine</p>
            </div>
          )}
        </div>

        {/* Interaktive kort */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FAILURE_TYPES.map((ft, i) => (
            <button
              key={ft.name}
              onClick={() => setActiveType(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                activeType === i
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                  : "bg-[var(--card)] border-[var(--card-border)] text-[var(--foreground)] hover:border-blue-400"
              }`}
            >
              {ft.name}
            </button>
          ))}
        </div>

        {/* Aktivt kort */}
        <div className={`rounded-xl border-2 p-5 transition-all ${FAILURE_TYPES[activeType].color}`}>
          <div className={`rounded-lg px-3 py-1.5 inline-block mb-3 ${FAILURE_TYPES[activeType].headerColor}`}>
            <span className="font-semibold text-sm">Alvorlighetsgrad {FAILURE_TYPES[activeType].severity}/5 — {FAILURE_TYPES[activeType].norsk}</span>
          </div>
          <p className="text-sm mb-3 text-[var(--foreground)]">{FAILURE_TYPES[activeType].description}</p>
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
            <p className="text-xs font-semibold text-[var(--muted)] mb-1">EKSEMPEL</p>
            <p className="text-sm text-[var(--foreground)]">{FAILURE_TYPES[activeType].example}</p>
          </div>
          {activeType === 1 && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded bg-white/60 dark:bg-black/20 p-2">
                <p className="font-semibold">Receive-omission</p>
                <p className="text-[var(--muted)]">Serveren mottok aldri forespørselen. Endrer ikke serverens tilstand.</p>
              </div>
              <div className="rounded bg-white/60 dark:bg-black/20 p-2">
                <p className="font-semibold">Send-omission</p>
                <p className="text-[var(--muted)]">Serveren utførte jobben men klarte ikke sende svar. Serverens tilstand er endret.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Redundans */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Redundans — den universelle løsningen</h2>
        <p className="text-[var(--muted)] mb-4 text-sm">
          Den grunnleggende teknikken for å maskere feil er redundans: å legge til noe ekstra. Tre typer:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {REDUNDANCY.map((r) => (
            <div key={r.type} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="text-2xl mb-2">{r.icon}</p>
              <p className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">{r.type}</p>
              <p className="text-xs text-[var(--muted)] mb-2">{r.desc}</p>
              <p className="text-xs italic text-[var(--muted)]">Eks: {r.ex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Synkrone vs asynkrone systemer */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Synkrone vs. asynkrone systemer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold mb-2">Synkront system</p>
            <p className="text-[var(--muted)]">Prosesshastighetene og meldingsleveringstider er begrenset. Hvis Q ikke svarer innen fristen, kan P konkludere at Q har krasjet.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold mb-2">Asynkront system</p>
            <p className="text-[var(--muted)]">Ingen garantier om timing. P kan ikke si om Q har krasjet eller bare er treg. Praktiske systemer er <em>delvis synkrone</em>: timeouts fungerer vanligvis, men ikke alltid.</p>
          </div>
        </div>
      </section>

      {/* Oppsummering */}
      <section className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
          <li>Definere fault, error og failure — og relasjonen mellom dem</li>
          <li>De 5 feiltypene med korrekte norske/engelske navn og beskrivelse</li>
          <li>Hierarkiet: crash ⊂ omission ⊂ timing ⊂ response ⊂ Byzantine</li>
          <li>Skillet mellom de 4 dependability-egenskapene</li>
          <li>De 3 redundanstypene med eksempler</li>
          <li>Omission failure = svarer ikke (eksamen-favoritt!)</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-8/teori/8-2" className="hover:text-[var(--accent)] text-sm">
          8.2 Prosessresistens →
        </Link>
      </div>
    </div>
  );
}
