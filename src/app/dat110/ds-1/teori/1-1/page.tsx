"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS1_1Page() {
  const [showMiddlewareDetails, setShowMiddlewareDetails] = useState(false);
  const [showLamport, setShowLamport] = useState(false);
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const examples = [
    {
      id: "google",
      tittel: "Google Mail (Gmail)",
      kategori: "Nettverksbasert system",
      beskrivelse:
        "Bak kulissene kjorer Gmail pa titusenvis av servere spredt over hele verden. Nar du logger inn ser du ett enkelt grensesnitt — du vet ikke hvilken server som lagrer e-postene dine, eller om det er 10 kopier av dem. Det er distribuert transparens i praksis.",
    },
    {
      id: "cdn",
      tittel: "Akamai CDN (400 000+ servere)",
      kategori: "Nettverksbasert system",
      beskrivelse:
        "Nar du besøker nytimes.com, leveres bildene fra en server naer deg — kanskje i Oslo. Akamai har kopiert innholdet til servere over hele verden. Du ser ett nettsted, men faktisk snakker du med den naermeste av hundretusener av servere.",
    },
    {
      id: "bittorrent",
      tittel: "BitTorrent",
      kategori: "Peer-to-peer system",
      beskrivelse:
        "Ingen sentral server eier filene. Alle deltakere (peers) er bade klienter og servere. Nar du laster ned en fil, henter du ulike deler fra ulike maskiner rundt om i verden — men det framstar som en enkelt nedlasting.",
    },
    {
      id: "iot",
      tittel: "Smart hjem / IoT",
      kategori: "Pervasivt system",
      beskrivelse:
        "En smart termostat, lyskontroller, sikkerhetskamera og dørlas kommuniserer med hverandre og med skyen. Systemet oppforer seg som ett samlet hjem-automatiseringssystem, selv om det er dusinvis av autonome enheter involvert.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.1 Definisjon og eksempler</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.1 Definisjon og eksempler</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Hva er egentlig et distribuert system? Van Steen og Tanenbaum gir oss en presis definisjon,
          og vi ser pa de to grunnleggende kjennetegnene — autonome noder og enhetlig framtoning — samt
          middleware-laget som gjor det hele mulig.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Gjengi Tanenbaums definisjon pa distribuerte systemer ord for ord",
            "Forklare de to kjennetegnene: autonome noder og enhetlig framtoning",
            "Forklare hva middleware er og hvilken rolle det spiller",
            "Gi konkrete eksempler pa distribuerte systemer og klassifisere dem",
            "Forklare forskjellen pa et distribuert og et desentralisert system",
            "Forklare hvorfor distribuerte systemer er vanskelige (partielle feil, ingen global klokke)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Definisjonen */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Den offisielle definisjonen
        </h2>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 p-6">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-1 uppercase tracking-wide">
            Van Steen &amp; Tanenbaum, 4. utgave
          </p>
          <blockquote className="text-lg font-bold text-blue-900 dark:text-blue-100 leading-relaxed italic">
            &ldquo;A distributed system is a collection of autonomous computing elements that appears
            to its users as a single coherent system.&rdquo;
          </blockquote>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
            Coulouris et al. (2012) definerer det litt annerledes: &ldquo;One in which hardware or software
            components located at networked computers communicate and coordinate their actions only by
            passing messages.&rdquo; — Begge definisjoner er gyldige pa eksamen.
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/10 px-4 py-3 text-sm">
          <span className="font-bold text-blue-700 dark:text-blue-400">Leslie Lamports beromte sitat: </span>
          <button
            onClick={() => setShowLamport(!showLamport)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showLamport ? "skjul" : "vis"}
          </button>
          {showLamport && (
            <p className="mt-2 italic text-[var(--muted)]">
              &ldquo;A distributed system is one in which the failure of a computer you didn&apos;t even know
              existed can render your own computer unusable.&rdquo; — Dette fanger essensen av utfordringen:
              skjulte avhengigheter og partielle feil.
            </p>
          )}
        </div>
      </section>

      {/* De to kjennetegnene */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          De to kjennetegnene
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Definisjonen inneholder to kritiske egenskaper. Begge er like viktige — og begge skaper
          egne utfordringer.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Kjennetegn 1 */}
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">1</span>
              <h3 className="font-bold text-blue-700 dark:text-blue-400">Samling av autonome noder</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Nodene kan vaere alt: PC-er, mobiltelefoner, smartklokker, sensorer, servere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Hver node handler <strong>uavhengig</strong> — de har sin egen CPU, minne og klokke</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Ingen <strong>global klokke</strong>: noder ma synkronisere og koordinere seg via meldinger</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">&#8594;</span>
                <span><strong>Gruppemedlemskap</strong>: apent eller lukket system, med adgangskontroll og autentisering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Noder kan vaere organisert i <strong>overlay-nettverk</strong>: strukturerte (trad, ring) eller ustrukturerte</span>
              </li>
            </ul>
          </div>

          {/* Kjennetegn 2 */}
          <div className="rounded-xl border-2 border-indigo-400/60 bg-indigo-50 dark:bg-indigo-950/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold shrink-0">2</span>
              <h3 className="font-bold text-indigo-700 dark:text-indigo-400">Framstar som ett samlet system</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Brukere og applikasjoner ser ett samlet, koherent system — ikke en haug med maskiner</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0 mt-0.5">&#8594;</span>
                <span>En sluttbruker kan ikke se <em>hvor</em> en beregning utfores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0 mt-0.5">&#8594;</span>
                <span><em>Hvor</em> data er lagret er irrelevant for applikasjonen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Om data er replikert eller ikke er fullstendig skjult</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0 mt-0.5">&#8594;</span>
                <span>Nokkelord: <strong>distribusjonstransparens</strong> — skjule distribusjonen</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SVG-diagram: noder + middleware + applikasjoner */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h3 className="font-bold mb-4 text-sm text-center">Arkitektur: Noder, middleware og applikasjoner</h3>
          <svg viewBox="0 0 700 260" className="w-full max-w-2xl mx-auto" aria-label="Diagram over distribuert system med middleware">
            {/* Bakgrunn */}
            <rect x="0" y="0" width="700" height="260" fill="none" />

            {/* Appl-laget */}
            <text x="350" y="22" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.6">Applikasjoner</text>
            <rect x="30" y="30" width="120" height="36" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="90" y="52" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="600">App A</text>
            <rect x="290" y="30" width="120" height="36" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="350" y="52" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="600">App B</text>
            <rect x="550" y="30" width="120" height="36" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="610" y="52" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="600">App C</text>

            {/* Piler ned til middleware */}
            <line x1="90" y1="66" x2="90" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2"/>
            <line x1="350" y1="66" x2="350" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2"/>
            <line x1="610" y1="66" x2="610" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2"/>

            {/* Middleware-lag (spans alle noder) */}
            <rect x="10" y="100" width="680" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="350" y="120" textAnchor="middle" fontSize="12" fill="#4338ca" fontWeight="700">Distribuert systemlag (Middleware)</text>
            <text x="350" y="138" textAnchor="middle" fontSize="10" fill="#6366f1">Samme grensesnitt overalt — skjuler heterogenitet og distribusjon</text>

            {/* Piler ned til OS */}
            <line x1="90" y1="150" x2="90" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2"/>
            <line x1="350" y1="150" x2="350" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2"/>
            <line x1="610" y1="150" x2="610" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2"/>

            {/* OS-lag */}
            <rect x="30" y="180" width="120" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
            <text x="90" y="198" textAnchor="middle" fontSize="10" fill="#475569">Lokal OS 1</text>
            <text x="90" y="211" textAnchor="middle" fontSize="9" fill="#94a3b8">Datamaskin 1</text>
            <rect x="290" y="180" width="120" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
            <text x="350" y="198" textAnchor="middle" fontSize="10" fill="#475569">Lokal OS 2</text>
            <text x="350" y="211" textAnchor="middle" fontSize="9" fill="#94a3b8">Datamaskin 2</text>
            <rect x="550" y="180" width="120" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
            <text x="610" y="198" textAnchor="middle" fontSize="10" fill="#475569">Lokal OS 3</text>
            <text x="610" y="211" textAnchor="middle" fontSize="9" fill="#94a3b8">Datamaskin 3</text>

            {/* Nettverk */}
            <line x1="10" y1="235" x2="690" y2="235" stroke="#94a3b8" strokeWidth="2"/>
            <text x="350" y="252" textAnchor="middle" fontSize="11" fill="#64748b">Nettverk</text>
            <line x1="90" y1="216" x2="90" y2="235" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="350" y1="216" x2="350" y2="235" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="610" y1="216" x2="610" y2="235" stroke="#94a3b8" strokeWidth="1.5"/>
          </svg>
          <p className="text-xs text-[var(--muted)] text-center mt-2">
            Middleware-laget gir alle applikasjoner <em>samme grensesnitt</em>, uavhengig av maskinvare og OS under.
          </p>
        </div>
      </section>

      {/* Middleware */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Middleware — &quot;OS-et&quot; for distribuerte systemer
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Middleware er programvarelaget som sitter <em>mellom</em> det lokale operativsystemet og
          applikasjonene. Det er limet som holder et distribuert system sammen.
        </p>

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Hva middleware gir oss:</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              {
                tittel: "Ressursstyring",
                innhold: "Administrerer og gir tilgang til delte ressurser pa tvers av noder",
                ikon: "&#9881;",
              },
              {
                tittel: "Inter-applikasjons-kommunikasjon",
                innhold: "RPC (Remote Procedure Call) og MOM (Message Oriented Middleware) for applikasjoner a snakke med hverandre",
                ikon: "&#8644;",
              },
              {
                tittel: "Feilhanding og gjenoppretting",
                innhold: "Skjuler feil og gjenoppretter automatisk — applikasjonen merker ingenting",
                ikon: "&#128737;",
              },
              {
                tittel: "Sikkerhetstjenester",
                innhold: "Autentisering, autorisasjon og kryptering pa tvers av noder",
                ikon: "&#128274;",
              },
            ].map((t) => (
              <div key={t.tittel} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
                <p className="font-bold text-blue-700 dark:text-blue-400 text-xs mb-1">
                  <span dangerouslySetInnerHTML={{ __html: t.ikon }} /> {t.tittel}
                </p>
                <p className="text-xs text-[var(--muted)]">{t.innhold}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowMiddlewareDetails(!showMiddlewareDetails)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Eksempler pa kjente middleware-systemer</span>
          <span>{showMiddlewareDetails ? "▲" : "▼"}</span>
        </button>
        {showMiddlewareDetails && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { navn: "gRPC / REST APIs", type: "RPC-middleware", beskr: "Lar prosesser kalle funksjoner pa fjerne servere som om de var lokale" },
                { navn: "Apache Kafka", type: "Meldingskø (MOM)", beskr: "Asynkron meldingsutveksling mellom tjenester — produsenter og konsumenter er frakoblet" },
                { navn: "CORBA / Java RMI", type: "Objektmiddleware", beskr: "Eksponerer objekter over nettverket — klienten kaller metoder pa fjerne objekter" },
                { navn: "Kubernetes / Docker Swarm", type: "Orkestreringsmiddleware", beskr: "Administrerer containere pa tvers av mange noder som ett system" },
              ].map((m) => (
                <div key={m.navn} className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 p-3">
                  <p className="font-bold text-sm">{m.navn}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{m.type}</p>
                  <p className="text-xs text-[var(--muted)]">{m.beskr}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Distribuert vs desentralisert */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Distribuert vs. desentralisert system
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Van Steen &amp; Tanenbaum gjor et viktig skille som mange blander:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold"></th>
                <th className="text-left py-2 pr-4 font-semibold text-blue-600 dark:text-blue-400">Distribuert system</th>
                <th className="text-left py-2 font-semibold text-indigo-600 dark:text-indigo-400">Desentralisert system</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {[
                ["Hvorfor spredt?", "Tilstrekkelig (sufficiency) — nok til formalet", "Nodvendig (necessity) — ma vaere spredt"],
                ["Eksempel", "Google Mail: spredt for skalerbarhet", "Blockchain: spredt av tillit-arsaker"],
                ["Typisk driver", "Ekspansivt syn: service som ma skalere", "Integrativt syn: eksisterende systemer kobles"],
                ["Kompleksitet", "Kan vaere enkel der det er mulig", "Alltid kompleks pga. krav om spredning"],
              ].map(([rad, dist, desent]) => (
                <tr key={rad}>
                  <td className="py-2 pr-4 font-medium text-xs text-[var(--muted)]">{rad}</td>
                  <td className="py-2 pr-4 text-xs">{dist}</td>
                  <td className="py-2 text-xs">{desent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--muted)] bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800/40">
          <strong>Bokas poeng:</strong> Desentralisering er aldri et mal i seg selv. Vi bor spre prosesser og ressurser
          bare i den grad det er <em>tilstrekkelig</em> for formalet. Jo mindre spredning, jo bedre. Unntaket er nar
          spredning er strengt nodvendig (federated learning, blockchain, geografisk overvaking).
        </p>
      </section>

      {/* Eksempler interaktivt */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Eksempler pa distribuerte systemer
        </h2>
        <p className="text-sm text-[var(--muted)]">Klikk pa et eksempel for a se hvordan det oppfyller definisjonen:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {examples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveExample(activeExample === ex.id ? null : ex.id)}
              className={`text-left rounded-xl border-2 p-4 transition-all ${
                activeExample === ex.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-[var(--card-border)] bg-[var(--card)] hover:border-blue-300"
              }`}
            >
              <p className="font-bold text-sm">{ex.tittel}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{ex.kategori}</p>
              {activeExample === ex.id && (
                <p className="text-xs text-[var(--muted)] mt-3 leading-relaxed">{ex.beskrivelse}</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Utfordringer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Hvorfor er distribuerte systemer vanskelige?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              tittel: "Partielle feil",
              farge: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
              tittelfarge: "text-red-700 dark:text-red-400",
              innhold:
                "En komponent kan feile mens resten fungerer. Feilsøking er ekstremt vanskelig — nettverket kan nappe en melding, en server kan henge, en node kan krasje. Og systemet som helhet later som ingenting har skjedd.",
            },
            {
              tittel: "Ingen global klokke",
              farge: "border-orange-400/60 bg-orange-50 dark:bg-orange-950/20",
              tittelfarge: "text-orange-700 dark:text-orange-400",
              innhold:
                "Noder har sine egne klokker som avviker fra hverandre. Nar skjedde hendelse A — for eller etter hendelse B? Dette krevet egne koordineringsprotokoller (Lamport-klokker, vektorklokker).",
            },
            {
              tittel: "Uforutsette avhengigheter",
              farge: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
              tittelfarge: "text-purple-700 dark:text-purple-400",
              innhold:
                "Nodene er programmatisk koblet sammen pa mater som kan vaere umulige a forutse. En feil i en tjeneste kan a kaste ned en annen tjeneste som tilsynelatende er urelatert.",
            },
            {
              tittel: "Sikkerhet",
              farge: "border-gray-400/60 bg-gray-50 dark:bg-gray-950/20",
              tittelfarge: "text-gray-700 dark:text-gray-400",
              innhold:
                "Systemet krysser administrative grenser og er tilgjengelig fra hele verden. Autentisering og autorisasjon ma haandteres pa tvers av noder som kanskje ikke stoler pa hverandre.",
            },
          ].map((k) => (
            <div key={k.tittel} className={`rounded-xl border-2 p-4 ${k.farge}`}>
              <h3 className={`font-bold mb-2 ${k.tittelfarge}`}>{k.tittel}</h3>
              <p className="text-sm text-[var(--muted)]">{k.innhold}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vanlige feil */}
      <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
        <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Vanlige feil pa eksamen</h3>
        <ul className="space-y-2 text-sm">
          {[
            "Blander distribuert og desentralisert: distribuert = tilstrekkelig spredning, desentralisert = nodvendig spredning",
            'Si at internett "er" et distribuert system — internett er infrastrukturen UNDER distribuerte systemer',
            "Glemme at middleware er det som gjor ett-system-illusjonen mulig — det er ikke bare et nett",
            "Tro at sentraliserte losninger alltid er darlige — DNS er logisk sentralisert men fysisk distribuert og fungerer utmerket",
          ].map((feil) => (
            <li key={feil} className="flex items-start gap-2">
              <span className="text-red-500 shrink-0 mt-0.5 font-bold">!</span>
              <span>{feil}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Oppgave 1 (flervalg) tester gjerne definisjoner. Du bor kunne gjengi definisjonen pa distribuerte systemer
          nesten ord for ord. Legg merke til begge delene: <em>autonome noder</em> OG <em>framstar som ett system</em>.
          Pa 2024-eksamen spurte oppgave 1h om IaaS (Infrastructure as a Service) — cloud-klassifisering er
          sentralt for DS-1.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link
          href="/dat110/ds-1/teori/1-2"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          1.2 Design-mål &rarr;
        </Link>
      </div>
    </div>
  );
}
