"use client";

import { useState } from "react";
import Link from "next/link";

const RPC_FAILURES = [
  {
    id: 1,
    scenario: "Klienten kan ikke lokalisere serveren",
    cause: "Server er nede eller har fått ny IP-adresse",
    exception: "EXCEPTION kastes til klienten",
    semantics: "Enkel abort — klienten vet at ingenting skjedde",
    color: "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: 2,
    scenario: "Request fra klient til server gikk tapt",
    cause: "Pakketap i nettet, buffer fullt",
    exception: "Klienten venter... timeout",
    semantics: "Klienten prøver igjen — safe fordi ingen request nådde frem",
    color: "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20",
  },
  {
    id: 3,
    scenario: "Server krasjer etter å ha mottatt request",
    cause: "Server-feil under prosessering",
    exception: "Klienten vet ikke om operasjonen ble utført eller ikke",
    semantics: "At-least-once? At-most-once? Exactly-once? — Avhenger av design",
    color: "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20",
    critical: true,
  },
  {
    id: 4,
    scenario: "Reply fra server til klient gikk tapt",
    cause: "Pakketap i returretning",
    exception: "Klienten tror server krasjet og prøver igjen",
    semantics: "Problemet: operasjonen ble utført! Ny forespørsel = duplikat-problem",
    color: "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20",
    critical: true,
  },
  {
    id: 5,
    scenario: "Klienten krasjer etter å ha sendt request",
    cause: "Klientfeil — orphan computation",
    exception: "Serveren bruker ressurser på en beregning ingen vil ha",
    semantics: "Server trenger mekanisme for å oppdage/terminere orphans",
    color: "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20",
  },
];

type Semantics = "at-least-once" | "at-most-once" | "exactly-once";

const SEMANTICS: Record<Semantics, { label: string; desc: string; how: string; useCase: string; color: string }> = {
  "at-least-once": {
    label: "At-least-once",
    desc: "Operasjonen utføres én eller flere ganger. Klienten prøver igjen ved timeout.",
    how: "Klienten sender igjen og igjen til den får svar. Server dedupliserer ikke.",
    useCase: "Idempotente operasjoner: lesing, oppdatering av fast verdi. IKKE overføring av penger.",
    color: "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20",
  },
  "at-most-once": {
    label: "At-most-once",
    desc: "Operasjonen utføres null eller én gang. Server husker utførte operasjoner og filtrerer duplikater.",
    how: "Server holder en tabell med nylige request-IDer. Duplikat? Send cachedsvar.",
    useCase: "Bankoverføringer, ordre-plassering — operasjoner som ikke skal gjentas.",
    color: "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20",
  },
  "exactly-once": {
    label: "Exactly-once",
    desc: "Operasjonen utføres nøyaktig én gang. Svært vanskelig å garantere i et distribuert system med vilkårlige feil.",
    how: "Krever transaksjoner med distribuert commit (2PC), persistent logging, og deduplisering.",
    useCase: "Idealet — men dyreste å implementere. Krever mye overhead.",
    color: "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20",
  },
};

const MULTICAST_TYPES = [
  { name: "Reliable multicast", ordering: "Ingen", totalOrder: false, desc: "All-or-nothing levering til alle korrekte gruppemedlemmer, men ingen garantier om rekkefølge." },
  { name: "FIFO multicast", ordering: "FIFO-ordnet", totalOrder: false, desc: "Meldinger fra samme sender leveres i senderekkefølge." },
  { name: "Causal multicast", ordering: "Kausal-ordnet", totalOrder: false, desc: "Kausal rekkefølge respekteres (vektor-klokker)." },
  { name: "Atomic multicast", ordering: "Ingen", totalOrder: true, desc: "All-or-nothing + totalt ordnet levering til alle." },
];

const TIMELINE_STEPS = [
  { time: 0, label: "Klient sender request", who: "client", lost: false },
  { time: 1, label: "Request ankommer server", who: "server", lost: false },
  { time: 2, label: "Server utfører operasjon", who: "server", lost: false },
  { time: 3, label: "Server sender reply (TAPT!)", who: "server", lost: true },
  { time: 4, label: "Klient timeout — prøver igjen", who: "client", lost: false },
  { time: 5, label: "Duplikat request ankommer server", who: "server", lost: false },
];

export default function DS8_3Page() {
  const [activeFailure, setActiveFailure] = useState(0);
  const [activeSemantics, setActiveSemantics] = useState<Semantics>("at-most-once");
  const [timelineStep, setTimelineStep] = useState(0);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.3 Pålitelig kommunikasjon og RPC-feil</span>
      </div>

      <h1 className="text-2xl font-bold">8.3 Pålitelig kommunikasjon og RPC-feil</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Pålitelig kommunikasjon er fundamentalt for feiltoleranse. Her dekker vi punkt-til-punkt pålitelighet, pålitelig multicast, og de 5 feilklassene i RPC-kall.
      </p>

      {/* Punkt-til-punkt */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Punkt-til-punkt pålitelig kommunikasjon</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-3">
            TCP er det klassiske eksemplet på pålitelig punkt-til-punkt kommunikasjon. TCP garanterer:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
            {[
              { icon: "✓", label: "Feiloppdagelse", desc: "Checksums på alle pakker" },
              { icon: "✓", label: "Retransmisjon", desc: "Tapte pakker sendes på nytt" },
              { icon: "✓", label: "Rekkefølge", desc: "Pakker leveres i senderekkefølge" },
              { icon: "✓", label: "Flow control", desc: "Tilpasser hastighet til mottaker" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-1">{item.icon}</p>
                <p className="font-medium text-xs mb-1">{item.label}</p>
                <p className="text-xs text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)] mt-3">
            Men TCP løser bare <em>kommunikasjons</em>-pålitelighet — ikke prosessfeil. Hvis serveren krasjer etter å ha mottatt en melding, hjelper ikke TCP.
          </p>
        </div>
      </section>

      {/* Pålitelig multicast */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Pålitelig multicast</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          I en prosessgruppe ønsker vi at alle meldinger leveres til <em>alle</em> korrekte gruppemedlemmer, eller til ingen. Dette kalles <strong>pålitelig multicast</strong>.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 dark:bg-blue-900/30">
              <tr>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Type multicast</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Meldingsordning</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Totalt ordnet?</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Beskrivelse</th>
              </tr>
            </thead>
            <tbody>
              {MULTICAST_TYPES.map((m, i) => (
                <tr key={m.name} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}>
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 text-[var(--muted)]">{m.ordering}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${m.totalOrder ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
                      {m.totalOrder ? "Ja" : "Nei"}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--muted)] text-xs">{m.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 text-sm">
          <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Atomisk multicast</p>
          <p className="text-[var(--muted)]">
            <strong>Atomisk multicast</strong> = reliable + totalt ordnet levering. All-or-nothing prinsippet: enten mottar alle korrekte prosesser meldingen, eller ingen gjør det. Fundamentalt for aktiv replikering og distribuert commit.
          </p>
        </div>
      </section>

      {/* RPC-feilklasser */}
      <section>
        <h2 className="text-xl font-semibold mb-1 text-blue-600 dark:text-blue-400">De 5 RPC-feilklassene</h2>
        <p className="text-sm text-[var(--muted)] mb-1">
          For detaljert gjennomgang av RPC-feil, se også{" "}
          <Link href="/dat110/ds-4/teori/4-2" className="text-blue-600 dark:text-blue-400 underline">4.2 RPC-feilklasser</Link>.
        </p>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på en feilklasse for å se scenario, årsak og semantikk:
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {RPC_FAILURES.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFailure(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeFailure === i
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                  : `bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400 ${f.critical ? "text-red-600 dark:text-red-400" : ""}`
              }`}
            >
              {f.critical && activeFailure !== i && "⚠ "}Klasse {f.id}
            </button>
          ))}
        </div>

        <div className={`rounded-xl border-2 p-5 transition-all ${RPC_FAILURES[activeFailure].color}`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-[var(--muted)] mb-0.5">FEILKLASSE {RPC_FAILURES[activeFailure].id}</p>
              <p className="font-semibold text-base">{RPC_FAILURES[activeFailure].scenario}</p>
            </div>
            {RPC_FAILURES[activeFailure].critical && (
              <span className="shrink-0 ml-2 px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium">Vanskeligst</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-white/60 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">ÅRSAK</p>
              <p>{RPC_FAILURES[activeFailure].cause}</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">KLIENTOPPLEVELSE</p>
              <p>{RPC_FAILURES[activeFailure].exception}</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">SEMANTIKK</p>
              <p>{RPC_FAILURES[activeFailure].semantics}</p>
            </div>
          </div>
        </div>

        {/* Interaktiv tidslinje for klasse 4 */}
        <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h3 className="font-semibold mb-2 text-sm">Interaktiv tidslinje — Klasse 4: tapt reply (steg for steg)</h3>
          <div className="flex gap-2 mb-4 flex-wrap">
            {TIMELINE_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setTimelineStep(i)}
                className={`px-2 py-1 rounded text-xs border transition-all ${
                  timelineStep === i
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                t={s.time}
              </button>
            ))}
          </div>
          {/* Tidslinje-SVG */}
          <div className="rounded-xl bg-[var(--background)] border border-[var(--card-border)] p-4 mb-3">
            <svg viewBox="0 0 400 90" className="w-full max-w-lg mx-auto">
              {/* Klient-linje */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="#3B82F6" strokeWidth="1.5"/>
              <text x="5" y="24" fontSize="9" fill="#3B82F6" fontWeight="bold">Klient</text>
              {/* Server-linje */}
              <line x1="40" y1="70" x2="380" y2="70" stroke="#10B981" strokeWidth="1.5"/>
              <text x="5" y="74" fontSize="9" fill="#10B981" fontWeight="bold">Server</text>

              {TIMELINE_STEPS.slice(0, timelineStep + 1).map((s, i) => {
                const x = 60 + i * 52;
                const y1 = s.who === "client" ? 20 : 70;
                const y2 = s.who === "client" ? 70 : 20;
                return (
                  <g key={i}>
                    {i > 0 && (
                      <line
                        x1={60 + (i - 1) * 52}
                        y1={TIMELINE_STEPS[i - 1].who === "client" ? 20 : 70}
                        x2={x}
                        y2={y1}
                        stroke={s.lost ? "#EF4444" : "#6B7280"}
                        strokeWidth="1"
                        strokeDasharray={s.lost ? "3,2" : "none"}
                      />
                    )}
                    <circle cx={x} cy={y1} r="4" fill={s.lost ? "#EF4444" : s.who === "client" ? "#3B82F6" : "#10B981"}/>
                    {s.lost && (
                      <text x={x + 6} y={y1 - 4} fontSize="8" fill="#EF4444">TAPT</text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
            <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">t={TIMELINE_STEPS[timelineStep].time}: {TIMELINE_STEPS[timelineStep].label}</p>
            {timelineStep === 5 && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Problemet: operasjonen ble allerede utført! Uten deduplication kjøres den igjen. Løsning: at-most-once semantikk med request-ID tabell.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* RPC-semantikk */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">RPC-leveringsgarantier</h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          {(Object.keys(SEMANTICS) as Semantics[]).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSemantics(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                activeSemantics === s
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                  : "bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {SEMANTICS[s].label}
            </button>
          ))}
        </div>
        <div className={`rounded-xl border-2 p-5 transition-all ${SEMANTICS[activeSemantics].color}`}>
          <p className="font-semibold text-base mb-2">{SEMANTICS[activeSemantics].label}</p>
          <p className="text-sm mb-3 text-[var(--foreground)]">{SEMANTICS[activeSemantics].desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-white/60 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">IMPLEMENTASJON</p>
              <p>{SEMANTICS[activeSemantics].how}</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">BRUKSTILFELLE</p>
              <p>{SEMANTICS[activeSemantics].useCase}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Idempotente operasjoner */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Idempotente operasjoner</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            En operasjon er <strong>idempotent</strong> hvis den kan utføres gjentatte ganger med samme effekt som én gang. For idempotente operasjoner er at-least-once semantikk trygt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Idempotente (trygt med at-least-once)</p>
              <ul className="text-[var(--muted)] space-y-1 list-disc list-inside">
                <li>Les en fil (<code>read(file)</code>)</li>
                <li>Sett en verdi til X (<code>set(x, 5)</code>)</li>
                <li>Søk i en database</li>
                <li>DELETE med spesifikk ID</li>
              </ul>
            </div>
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
              <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Ikke-idempotente (krever at-most-once)</p>
              <ul className="text-[var(--muted)] space-y-1 list-disc list-inside">
                <li>Overfør 100kr (<code>transfer(100)</code>)</li>
                <li>Inkrement counter (<code>x++</code>)</li>
                <li>Legg til element i liste</li>
                <li>Send e-post</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oppsummering */}
      <section className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
          <li>TCP som pålitelig punkt-til-punkt kommunikasjon (retransmisjon, ordning, feiloppdagelse)</li>
          <li>De 5 RPC-feilklassene — spesielt klasse 3 (server krasjer) og 4 (reply tapt)</li>
          <li>At-least-once: prøv igjen, safe kun for idempotente operasjoner</li>
          <li>At-most-once: server husker request-IDer, filtrerer duplikater</li>
          <li>Exactly-once: idealet, krever transaksjoner og 2PC</li>
          <li>Idempotente vs ikke-idempotente operasjoner</li>
          <li>Atomisk multicast = all-or-nothing + totalt ordnet levering</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-8/teori/8-2" className="hover:text-[var(--accent)] text-sm">← 8.2 Prosessresistens</Link>
        <Link href="/dat110/ds-8/teori/8-4" className="hover:text-[var(--accent)] text-sm">8.4 Feilgjenoppretting →</Link>
      </div>
    </div>
  );
}
