"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS7_1Page() {
  const [capSelected, setCapSelected] = useState<"CA" | "CP" | "AP">("CP");

  const capDescriptions = {
    CA: {
      label: "CA — Konsistens + Tilgjengelighet",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
      text: "Mulig kun uten nettverkspartisjoner. Eksempel: enkelt-node database (PostgreSQL uten replikering). Ikke realistisk for ekte distribuerte systemer.",
    },
    CP: {
      label: "CP — Konsistens + Partisjonstoleransse",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      text: "Ved partisjon vil systemet nekte forespørsler heller enn å returnere inkonsistente data. Eksempel: HBase, Zookeeper, banksystemer. Konsistens prioriteres foran tilgjengelighet.",
    },
    AP: {
      label: "AP — Tilgjengelighet + Partisjonstoleransse",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      text: "Systemet svarer alltid, men kan gi utdaterte data ved partisjon. Eksempel: DNS, Cassandra, DynamoDB, CouchDB. Eventual consistency er typisk.",
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-7/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">7.1 Introduksjon til replikering</span>
      </div>

      <h1 className="text-2xl font-bold">7.1 Introduksjon til replikering</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Motivasjon for replikering — ytelse, feiltoleranse og tilgjengelighet — og den fundamentale utfordringen: konsistens mellom replikaer.
      </p>

      {/* Hva du MÅ kunne */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Hva du MÅ kunne</h2>
        <ul className="space-y-1 text-sm list-disc list-inside text-[var(--foreground)]">
          <li>De tre grunnene til replikering (ytelse, feiltoleranse, tilgjengelighet)</li>
          <li>Hva som menes med konsistens i sammenheng med replikering</li>
          <li>Trade-off mellom tight og loose consistency</li>
          <li>CAP-teoremet: hva C, A og P betyr og at man kun kan velge 2 av 3</li>
          <li>Eksempler på systemer i hver CAP-kategori</li>
        </ul>
      </div>

      {/* Seksjon 1: Hvorfor replisere? */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hvorfor replisere?</h2>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Replikering betyr å lagre kopier (replikaer) av de samme dataene på flere noder i et distribuert system.
          Det gjøres av tre grunner:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              num: "1",
              title: "Ytelse",
              color: "border-blue-400 dark:border-blue-600",
              titleColor: "text-blue-600 dark:text-blue-400",
              desc: "Brukere i ulike regioner kan lese fra sin nærmeste replikanode. Færre nettverkshops gir lavere latens. Leselast fordeles over mange noder.",
              example: "Eks: CDN (Content Delivery Network) cacher websider nær brukerne.",
            },
            {
              num: "2",
              title: "Feiltoleranse",
              color: "border-blue-400 dark:border-blue-600",
              titleColor: "text-blue-600 dark:text-blue-400",
              desc: "Dersom én node krasjer, kan systemet fortsette å fungere fra en annen replikanode. Data er ikke tapt.",
              example: "Eks: En database med 3 replikaer tåler at én server svikter.",
            },
            {
              num: "3",
              title: "Tilgjengelighet (Availability)",
              color: "border-blue-400 dark:border-blue-600",
              titleColor: "text-blue-600 dark:text-blue-400",
              desc: "Systemet kan betjene forespørsler selv under nettverkspartisjoner eller servervedlikehold. Høyere oppetid (uptime).",
              example: "Eks: DNS har replikaer over hele verden — alltid tilgjengelig.",
            },
          ].map((item) => (
            <div key={item.num} className={`rounded-lg border-2 ${item.color} p-4 bg-[var(--card)]`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                  {item.num}
                </span>
                <h3 className={`font-semibold ${item.titleColor}`}>{item.title}</h3>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2">{item.desc}</p>
              <p className="text-xs text-[var(--muted)] italic">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seksjon 2: Konsistensutfordringen + SVG */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Den fundamentale utfordringen: Konsistens</h2>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Replikering skaper et problem: <strong>når data oppdateres på én replikanode, er de andre replikaene midlertidig utdaterte</strong>.
          Dette kalles inkonsistens. Propagering av oppdateringer tar tid, og i mellomtiden kan ulike klienter
          se ulike verdier på samme dataelement.
        </p>

        {/* SVG-diagram */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="text-sm font-semibold mb-4 text-[var(--muted)]">Replikering og konsistensutfordring</h3>
          <svg viewBox="0 0 600 260" className="w-full max-w-2xl mx-auto">
            {/* Klient */}
            <rect x="10" y="100" width="90" height="60" rx="8" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <text x="55" y="132" textAnchor="middle" fontSize="12" fill="currentColor">Klient</text>
            <text x="55" y="148" textAnchor="middle" fontSize="10" fill="#6b7280">skriver x=5</text>

            {/* Pil til Replikanode 1 (primary) */}
            <line x1="100" y1="130" x2="190" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)"/>

            {/* Replikanode 1 (primary) */}
            <rect x="190" y="60" width="110" height="60" rx="8" fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
            <text x="245" y="88" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="bold">Replikanode 1</text>
            <text x="245" y="106" textAnchor="middle" fontSize="11" fill="currentColor">(primær)</text>
            <text x="245" y="122" textAnchor="middle" fontSize="10" fill="#22c55e">x = 5 ✓</text>

            {/* Propagering til node 2 */}
            <line x1="300" y1="90" x2="400" y2="65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrowAmber)"/>
            <text x="350" y="60" textAnchor="middle" fontSize="9" fill="#f59e0b">propageringsdelay</text>

            {/* Propagering til node 3 */}
            <line x1="300" y1="110" x2="400" y2="185" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrowAmber)"/>

            {/* Replikanode 2 (utdatert) */}
            <rect x="400" y="30" width="110" height="60" rx="8" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <text x="455" y="58" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">Replikanode 2</text>
            <text x="455" y="76" textAnchor="middle" fontSize="11" fill="currentColor">(sekundær)</text>
            <text x="455" y="92" textAnchor="middle" fontSize="10" fill="#ef4444">x = 3 (gammel!)</text>

            {/* Replikanode 3 (utdatert) */}
            <rect x="400" y="155" width="110" height="60" rx="8" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <text x="455" y="183" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">Replikanode 3</text>
            <text x="455" y="201" textAnchor="middle" fontSize="11" fill="currentColor">(sekundær)</text>
            <text x="455" y="217" textAnchor="middle" fontSize="10" fill="#ef4444">x = 3 (gammel!)</text>

            {/* Klient 2 leser utdatert */}
            <rect x="510" y="100" width="80" height="60" rx="8" fill="none" stroke="#6b7280" strokeWidth="1.5"/>
            <text x="550" y="128" textAnchor="middle" fontSize="11" fill="currentColor">Klient 2</text>
            <text x="550" y="144" textAnchor="middle" fontSize="10" fill="#ef4444">leser x=3!</text>
            <line x1="510" y1="120" x2="460" y2="88" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,2"/>

            {/* Markerer */}
            <defs>
              <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
              </marker>
              <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
              </marker>
            </defs>
          </svg>
          <p className="text-xs text-[var(--muted)] text-center mt-2">
            Klient 1 oppdaterer x=5 på primær, men node 2 og 3 er ennå ikke oppdatert. Klient 2 leser gammel verdi.
          </p>
        </div>
      </section>

      {/* Seksjon 3: Tight vs Loose Consistency */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Trade-off: Tight vs. Loose Consistency</h2>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Det finnes et fundamentalt trade-off i replikerte systemer:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-5">
            <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Tight Consistency (Sterk)</h3>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Alle replikaer er alltid synkronisert</li>
              <li>Enhver lesing returnerer siste skrevne verdi</li>
              <li>Krever koordinering ved hver skriving</li>
              <li><strong>Kostbar:</strong> høy latens, lav gjennomstrømning</li>
              <li>Eksempel: bankkontoer, transaksjoner</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-5">
            <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Loose Consistency (Svak)</h3>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Replikaer kan midlertidig divergere</li>
              <li>Oppdateringer propageres asynkront</li>
              <li>Ingen koordinering nødvendig</li>
              <li><strong>Billig:</strong> lav latens, høy gjennomstrømning</li>
              <li>Eksempel: DNS, sosiale medier, e-post</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <strong className="text-amber-700 dark:text-amber-400">Kjerneinnsikt:</strong>{" "}
          Jo sterkere konsistensgarantier, jo høyere overhead. Systemdesign handler om å velge riktig punkt på dette spekteret for applikasjonens behov.
        </div>
      </section>

      {/* Seksjon 4: CAP-teoremet */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">CAP-teoremet</h2>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          CAP-teoremet (Brewer, 2000) er et av de viktigste resultatene innen distribuerte systemer.
          Det sier at et distribuert system kun kan garantere <strong>2 av 3</strong> egenskaper samtidig:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              letter: "C",
              name: "Consistency",
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-100 dark:bg-blue-900/40",
              desc: "Alle klienter ser den samme versjonen av data på samme tid. Enhver lesing returnerer den siste skrevne verdien.",
            },
            {
              letter: "A",
              name: "Availability",
              color: "text-green-600 dark:text-green-400",
              bg: "bg-green-100 dark:bg-green-900/40",
              desc: "Enhver forespørsel til en levende node får alltid et svar (ikke nødvendigvis det siste). Systemet er alltid operativt.",
            },
            {
              letter: "P",
              name: "Partition Tolerance",
              color: "text-purple-600 dark:text-purple-400",
              bg: "bg-purple-100 dark:bg-purple-900/40",
              desc: "Systemet fortsetter å fungere selv om kommunikasjonen mellom noder feiler (nettverkspartisjon). Nødvendig i alle reelle DS.",
            },
          ].map((item) => (
            <div key={item.letter} className={`rounded-lg p-4 ${item.bg}`}>
              <div className={`text-3xl font-black ${item.color} mb-1`}>{item.letter}</div>
              <div className="font-semibold text-sm mb-2">{item.name}</div>
              <p className="text-xs text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interaktiv CAP */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-5">
          <h3 className="font-semibold mb-3 text-sm">Interaktiv CAP-utforsker — velg kombinasjon:</h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {(["CA", "CP", "AP"] as const).map((combo) => (
              <button
                key={combo}
                onClick={() => setCapSelected(combo)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  capSelected === combo
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                {combo}
              </button>
            ))}
          </div>
          <div className={`rounded-lg border p-4 ${capDescriptions[capSelected].bg}`}>
            <p className={`font-semibold mb-2 ${capDescriptions[capSelected].color}`}>
              {capDescriptions[capSelected].label}
            </p>
            <p className="text-sm text-[var(--muted)]">{capDescriptions[capSelected].text}</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3">
            <strong>Merk:</strong> I praksis er P (partisjonstoleransse) alltid nødvendig i distribuerte systemer — nettverkspartisjoner skjer alltid.
            Valget er derfor mellom CP og AP.
          </p>
        </div>
      </section>

      {/* Seksjon 5: Konkrete eksempler */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Eksempler: Når trenger du hva?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">System</th>
                <th className="text-left py-2 pr-4 font-semibold">CAP-valg</th>
                <th className="text-left py-2 pr-4 font-semibold">Konsistens</th>
                <th className="text-left py-2 font-semibold">Hvorfor</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                {
                  sys: "DNS",
                  cap: "AP",
                  cons: "Eventual",
                  why: "Tilgjengelighet viktigst. Utdaterte oppslag er OK.",
                },
                {
                  sys: "Bankkonto",
                  cap: "CP",
                  cons: "Sterk/Sekvensiell",
                  why: "Inkonsistens kan føre til doble uttak — ikke akseptabelt.",
                },
                {
                  sys: "Amazon DynamoDB",
                  cap: "AP (justerbar)",
                  cons: "Eventual (default)",
                  why: "Tilgjengelighet og skalerbarhet. Kan konfigureres til sterkere.",
                },
                {
                  sys: "Cassandra",
                  cap: "AP",
                  cons: "Eventual",
                  why: "Høy skrivegjennomstrømning og tilgjengelighet.",
                },
                {
                  sys: "Zookeeper",
                  cap: "CP",
                  cons: "Sekvensiell",
                  why: "Brukes til koordinering — konsistens er kritisk.",
                },
                {
                  sys: "Sosiale medier (likes)",
                  cap: "AP",
                  cons: "Eventual",
                  why: "Det er OK om noen ser 999 likes mens du ser 1001.",
                },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4 font-medium text-[var(--foreground)]">{row.sys}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      row.cap === "CP"
                        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400"
                        : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                    }`}>
                      {row.cap}
                    </span>
                  </td>
                  <td className="py-2 pr-4">{row.cons}</td>
                  <td className="py-2">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5">
        <h2 className="font-semibold text-red-700 dark:text-red-400 mb-3">Vanlige feil</h2>
        <ul className="space-y-2 text-sm text-[var(--muted)] list-disc list-inside">
          <li>Tro at du kan ha alle tre C, A og P — du kan kun velge 2.</li>
          <li>Glemme at P (partisjonstoleransse) alltid er nødvendig — valget er reelt sett CP vs AP.</li>
          <li>Forveksle "tilgjengelighet" (availability) med "noder er oppe" — A i CAP betyr at <em>svar alltid gis</em>.</li>
          <li>Tro at "eventual consistency" er dårlig — for mange systemer er det det riktige valget.</li>
        </ul>
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <strong className="text-amber-700 dark:text-amber-400">Eksamenstips (Oppg. 9, 2025):</strong>{" "}
        Oppgave 9c i 2025-eksamen spør om "forskjellen mellom datasentrert og klientsentrert konsistens". Start med å forklare at datasentrert gjelder systemets samlede garantier (se 7.2), mens klientsentrert gjelder en enkelt klients opplevelse (se 7.3). CAP kan komme som flervalg (Oppg. 1) — husk: "A replicated-write protocol based on majority voting" = quorum (Oppg. 1i, 2024).
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-7/teori/7-2" className="hover:text-[var(--accent)] text-sm">
          7.2 Data-sentrerte konsistensmodeller →
        </Link>
      </div>
    </div>
  );
}
