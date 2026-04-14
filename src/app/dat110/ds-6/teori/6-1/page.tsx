"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS6_1Page() {
  const [activeTab, setActiveTab] = useState<"broadcasting" | "forwarding" | "home" | "dht">("broadcasting");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.1 Flat navngiving</span>
      </div>

      <h1 className="text-2xl font-bold">6.1 Flat navngiving</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Flat navngiving bruker identifikatorer uten struktur — for eksempel MAC-adresser eller UUID-er. Utfordringen er:
        gitt et flatt navn, hvordan finner vi enheten? Dette kapittelet dekker fire løsningsstrategier.
      </p>

      {/* Grunnbegreper */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Grunnbegreper</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { term: "Navn (Name)", def: "Bit-streng eller tegn som refererer til en entitet" },
            { term: "Entitet (Entity)", def: "Alt som kan navngis: ressurser (filer, skrivere), prosesser, brukere" },
            { term: "Adresse (Address)", def: "Adressen til et tilgangspunkt (access point) der entiteten finnes" },
            { term: "Identifikator", def: "Et navn som entydig identifiserer én entitet, og ikke gjenbrukes" },
          ].map(({ term, def }) => (
            <div key={term} className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3">
              <span className="font-semibold text-blue-700 dark:text-blue-300">{term}: </span>
              <span className="text-sm text-[var(--foreground)]">{def}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 p-4">
          <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Flat navngiving — kjennetegn:</p>
          <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
            <li>Identifikatorer uten struktur eller mening (f.eks. <code>A3:4F:2B:77:D1:22</code>)</li>
            <li>Sier ingenting om where entiteten befinner seg</li>
            <li>Krever spesielle mekanismer for å finne en entitet</li>
          </ul>
        </div>
      </section>

      {/* Fire løsninger - faner */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Fire løsningsstrategier</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "broadcasting", label: "1. Broadcasting/Multicasting" },
            { key: "forwarding", label: "2. Forwarding Pointers" },
            { key: "home", label: "3. Home-based" },
            { key: "dht", label: "4. DHT" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "broadcasting" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Broadcasting og Multicasting</h3>
              <p className="text-sm text-[var(--foreground)] mb-3">
                <strong>Ide:</strong> Kringkast identifikatoren til alle noder. Den aktuelle entiteten svarer med sin nåværende adresse.
              </p>
              <p className="text-sm text-[var(--muted)] mb-2">
                <strong>Eksempel — ARP (Address Resolution Protocol):</strong>
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 text-sm font-mono mb-3">
                <p>1. H1 sender ARP-kringkast: &quot;Hvem er 192.168.52.2?&quot;</p>
                <p>2. Alle mottar meldingen</p>
                <p>3. H2 (192.168.52.2) svarer: &quot;Jeg er det! MAC: 03-CA-4B-2C-13-8A&quot;</p>
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-3">
                <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Problemer:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
                  <li><strong>Skalerer ikke</strong> utover lokalnett (LAN)</li>
                  <li>Krever at alle prosesser lytter til innkommende forespørsler</li>
                  <li>Sløser båndbredde — alle mottar meldingen, selv om de fleste ikke trenger den</li>
                </ul>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">Multicasting (forbedring):</p>
                <p className="text-sm text-[var(--foreground)]">
                  Sender kun til en multicast-gruppe i stedet for alle. En multicast-adresse kan brukes som en lokasjonstjeneste
                  for flere entiteter, eller til å finne nærmeste replika av en entitet.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "forwarding" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Forwarding Pointers (Videresendings-pekere)</h3>
              <p className="text-sm text-[var(--foreground)] mb-3">
                <strong>Ide:</strong> Når en entitet flytter, legger den igjen en peker (referanse) til sin neste lokasjon.
                Klienten følger kjeden av pekere til den når den aktuelle lokasjonen.
              </p>

              {/* SVG-diagram */}
              <div className="my-4 flex justify-center">
                <svg width="520" height="120" viewBox="0 0 520 120" className="max-w-full">
                  {/* Gamle lokasjoner */}
                  {[
                    { x: 30, label: "Gammel\nlokasjon 1", color: "#93c5fd" },
                    { x: 150, label: "Gammel\nlokasjon 2", color: "#93c5fd" },
                    { x: 270, label: "Gammel\nlokasjon 3", color: "#93c5fd" },
                    { x: 390, label: "Nåværende\nlokasjon", color: "#3b82f6" },
                  ].map(({ x, label, color }, i) => (
                    <g key={i}>
                      <rect x={x} y={30} width={90} height={50} rx="8" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
                      {label.split("\n").map((line, j) => (
                        <text key={j} x={x + 45} y={52 + j * 16} textAnchor="middle" fontSize="11" fill="currentColor">{line}</text>
                      ))}
                    </g>
                  ))}
                  {/* Piler */}
                  {[120, 240, 360].map((x, i) => (
                    <g key={i}>
                      <line x1={x} y1={55} x2={x + 28} y2={55} stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                    </g>
                  ))}
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                    </marker>
                  </defs>
                  {/* Klient */}
                  <rect x="0" y="90" width="60" height="25" rx="4" fill="#1d4ed8" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="1.5" />
                  <text x="30" y="106" textAnchor="middle" fontSize="11" fill="currentColor">Klient</text>
                  <line x1="30" y1="90" x2="30" y2="80" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="4,2" />
                </svg>
              </div>
              <p className="text-xs text-[var(--muted)] text-center mb-3">Klienten starter ved gammel lokasjon 1 og følger pekerkjeden til nåværende lokasjon</p>

              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-3">
                <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Problemer:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
                  <li><strong>Geografisk skalerbarhet:</strong> Mellomlokasjoner må holde pekerne i live</li>
                  <li><strong>Ytelse:</strong> Lange kjeder gir lange oppslags-forsinkelser</li>
                  <li><strong>Feiltoleranse:</strong> En brutt lenke i kjeden betyr at entiteten ikke kan nås</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Home-based Approach (Hjemme-basert tilnærming)</h3>
              <p className="text-sm text-[var(--foreground)] mb-3">
                <strong>Ide:</strong> En fast &quot;hjemmeagent&quot; holder alltid oversikt over entitetens nåværende lokasjon.
                Klienter kontakter alltid hjemmet først. Analogt til <strong>Mobile IP</strong>.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 mb-3 text-sm">
                <p className="font-semibold mb-1">Steg-for-steg:</p>
                <ol className="list-decimal list-inside space-y-1 text-[var(--foreground)]">
                  <li>Entiteten registrerer hjemmeadresse i namningstjenesten</li>
                  <li>Hjemmeagenten sporer entitetens nåværende (utenlandske) adresse</li>
                  <li>Klienten kontakter hjemmet og får den nåværende adressen</li>
                  <li>Klienten kommuniserer direkte med entitetens nåværende lokasjon</li>
                </ol>
              </div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">Mobile IP-analogi:</p>
              <p className="text-sm text-[var(--foreground)] mb-3">
                Når du reiser fra Norge til Japan med mobiltelefon, vet hjemmenettverket ditt (i Norge) alltid
                hvilken basestasjon du er tilknyttet i Japan. Innkommende anrop rutes via hjemlandet.
              </p>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-3">
                <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Problemer:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
                  <li>Hjemmeadressen må eksistere så lenge entiteten lever</li>
                  <li>Fast hjemme-adresse er en byrde hvis entiteten flytter permanent</li>
                  <li>Dårlig geografisk skalerbarhet (entiteten kan være ved siden av klienten, men trafikk går via hjemlandet)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dht" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Distribuert Hashtabell (DHT) — Introduksjon</h3>
              <p className="text-sm text-[var(--foreground)] mb-3">
                DHT er den foretrukne løsningen for stor-skala distribuerte systemer. Den kombinerer hashingprinsippet med
                en peer-to-peer ring-topologi for å gi effektivt, desentralisert navneoppslag.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-300 dark:border-green-700 p-3 text-center">
                  <p className="font-bold text-green-700 dark:text-green-400 text-lg">O(log N)</p>
                  <p className="text-xs text-[var(--muted)]">Oppslag-kompleksitet</p>
                </div>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 p-3 text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-400 text-lg">Desentralisert</p>
                  <p className="text-xs text-[var(--muted)]">Ingen enkelt tjener</p>
                </div>
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-300 dark:border-purple-700 p-3 text-center">
                  <p className="font-bold text-purple-700 dark:text-purple-400 text-lg">Feiltolerant</p>
                  <p className="text-xs text-[var(--muted)]">Tåler node-feil</p>
                </div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Chord er den viktigste DHT-protokollen i dette faget — den dekkes i detalj i 6.3.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Sammenligningstabellen */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Sammenligning av metoder</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/40">
                <th className="border border-blue-200 dark:border-blue-700 px-3 py-2 text-left text-blue-800 dark:text-blue-200">Metode</th>
                <th className="border border-blue-200 dark:border-blue-700 px-3 py-2 text-left text-blue-800 dark:text-blue-200">Skalering</th>
                <th className="border border-blue-200 dark:border-blue-700 px-3 py-2 text-left text-blue-800 dark:text-blue-200">Feiltolerance</th>
                <th className="border border-blue-200 dark:border-blue-700 px-3 py-2 text-left text-blue-800 dark:text-blue-200">Ytelse</th>
                <th className="border border-blue-200 dark:border-blue-700 px-3 py-2 text-left text-blue-800 dark:text-blue-200">Brukstilfelle</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metode: "Broadcasting", skalering: "Kun LAN", feil: "God", ytelse: "O(N) trafikk", bruk: "ARP" },
                { metode: "Multicasting", skalering: "Begrenset", feil: "Middels", ytelse: "Bedre enn broadcast", bruk: "Lokasjonstjeneste" },
                { metode: "Forwarding Pointers", skalering: "Middels", feil: "Svak (brutte lenker)", ytelse: "O(hopp)", bruk: "Mobilitet" },
                { metode: "Home-based", skalering: "Middels", feil: "Avh. av hjemtjener", ytelse: "2 hopp minimum", bruk: "Mobile IP" },
                { metode: "DHT (Chord)", skalering: "Meget god", feil: "Meget god", ytelse: "O(log N)", bruk: "P2P, fil-deling" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-blue-50/30 dark:bg-blue-950/10"}>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-medium">{row.metode}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{row.skalering}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{row.feil}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{row.ytelse}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{row.bruk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
          <li>Forklare hva flat navngiving er og hvorfor det krever spesielle mekanismer</li>
          <li>Beskrive broadcasting og ARP — og hvorfor det ikke skalerer</li>
          <li>Forklare forwarding pointers og deres tre problemer (geografi, ytelse, feiltoleranse)</li>
          <li>Forklare home-based approach og Mobile IP-analogien</li>
          <li>Forklare DHT som den foretrukne løsningen med O(log N) oppslag</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          6.2 Strukturert navngiving →
        </Link>
      </div>
    </div>
  );
}
