"use client";

import { useState } from "react";

type SectionKey =
  | "kommunikasjon"
  | "rpc"
  | "asynkron"
  | "feil"
  | "mqtt"
  | "overlay"
  | "gossip";

const sections: { key: SectionKey; title: string; section: string }[] = [
  { key: "kommunikasjon", title: "Kommunikasjonsstilar", section: "4.1" },
  { key: "rpc", title: "RPC — Remote Procedure Call", section: "4.2" },
  { key: "asynkron", title: "Asynkron og Deferred Synchronous RPC", section: "4.2" },
  { key: "feil", title: "RPC-feilklasser (5 typer)", section: "4.2" },
  { key: "mqtt", title: "MQTT og QoS-nivaer", section: "4.3" },
  { key: "overlay", title: "Overlay-nettverk og ALM", section: "4.4" },
  { key: "gossip", title: "Gossip-protokoller", section: "4.4" },
];

export default function DS4TeoriPage() {
  const [active, setActive] = useState<SectionKey>("kommunikasjon");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Teori: Kommunikasjon i distribuerte systemer</h1>
      <p className="text-[var(--muted)] mb-6 text-sm">
        DS Kapittel 4 — Van Steen &amp; Tanenbaum 4. utg.
      </p>

      {/* Seksjonsnavigasjon */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              active === s.key
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-[var(--card)] border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-blue-400"
            }`}
          >
            <span className="font-bold text-xs mr-1">{s.section}</span>
            {s.title}
          </button>
        ))}
      </div>

      {/* ── KOMMUNIKASJONSSTILAR ── */}
      {active === "kommunikasjon" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Kommunikasjonsstilar
            </h2>
            <p className="text-[var(--muted)] mb-4">
              Distribuerte systemer kommuniserer på ulike måtar. Dei to viktigaste dimensjonane
              er <strong>persistent vs. transient</strong> og <strong>synkron vs. asynkron</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Persistent kommunikasjon</h3>
                <p className="text-sm text-[var(--muted)]">
                  Meldinga lagrast av mellomvaren så lenge det tek å levere ho til mottakaren.
                  Sendar og mottakar treng IKKJE vere oppe samstundes.
                  <br /><br />
                  <strong>Eksempel:</strong> MQTT, e-post, meldingskø-system (ActiveMQ, RabbitMQ).
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 p-4">
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Transient kommunikasjon</h3>
                <p className="text-sm text-[var(--muted)]">
                  Meldinga lagrast berre medan sendar og mottakar begge køyrer.
                  Viss mottakaren er nede, misses meldinga.
                  <br /><br />
                  <strong>Eksempel:</strong> Tradisjonell RPC, TCP-socket-kall.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">Synkron kommunikasjon</h3>
                <p className="text-sm text-[var(--muted)]">
                  Sendar <strong>blokkerer</strong> til forespørselen er akseptert, levert eller ferdigbehandla.
                  Ulike synkroniseringspunkt gir ulike garantiar.
                  <br /><br />
                  <strong>Eksempel:</strong> Tradisjonell (synkron) RPC.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Asynkron kommunikasjon</h3>
                <p className="text-sm text-[var(--muted)]">
                  Sendar <strong>held fram</strong> umiddelbart etter å ha sendt meldinga utan å vente på svar.
                  <br /><br />
                  <strong>Eksempel:</strong> Asynkron RPC, MQTT publish.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
              <h3 className="font-semibold mb-3">Kommunikasjonsmønster</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-950/30">
                      <th className="border border-[var(--card-border)] px-3 py-2 text-left">Mønster</th>
                      <th className="border border-[var(--card-border)] px-3 py-2 text-left">Beskriving</th>
                      <th className="border border-[var(--card-border)] px-3 py-2 text-left">Eksempel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Request-Reply</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Klient sender, server svarar. Tett kopla i tid.</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">RPC, HTTP REST</td>
                    </tr>
                    <tr>
                      <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Publish-Subscribe</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Produsentar publiserer til emne; abonnentar mottek. Laust kopla.</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">MQTT, Kafka</td>
                    </tr>
                    <tr>
                      <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Pipeline</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Data flyt gjennom ei sekvens av prosessar.</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Stream-prosessering</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── RPC ── */}
      {active === "rpc" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Remote Procedure Call (RPC)
            </h2>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 mb-6">
              <p className="text-sm font-medium">
                <strong>Kjerneide:</strong> Eit kall til ein fjernprosedyre skal sjå ut
                som eit lokalt prosedurekall frå synsvinkelen til <em>bade</em> kallaren og kallée.
                Dette er <strong>tilgangstransparens</strong>.
              </p>
            </div>

            <h3 className="font-bold mb-3">RPC-arkitektur: Stubs og Marshalling</h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Sidan klient og server kan vere på ulike maskiner med ulik maskinarkitektur,
              operativsystem og programmeringsspråk, trengst det mekanismar for å:
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-2 mb-6 list-none">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">▸</span>
                <span><strong>Marshalling:</strong> Pakke parametrar til eit nøytralt binært format for sending over nettet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">▸</span>
                <span><strong>Unmarshalling:</strong> Pakke opp parametrane frå det binære formatet på mottakarsida.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">▸</span>
                <span><strong>Klient-stub:</strong> Ein prosedyre som ser ut som den eigentlege fjerntjenesta. Klienten kaller denne.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">▸</span>
                <span><strong>Server-stub (skeleton):</strong> Ser ut som ein kallande klient for serveren. Kallar den lokale implementasjonen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">▸</span>
                <span><strong>IDL (Interface Definition Language):</strong> Formelt grensesnitt som beskriv prosedyren — brukt til å autogenerere stubs.</span>
              </li>
            </ul>

            {/* RPC-flytdiagram */}
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-[var(--card-border)] p-4 mb-6">
              <h4 className="font-semibold mb-3 text-center">RPC-kallflyt (synkron)</h4>
              <div className="flex flex-col items-center gap-1 text-xs font-mono">
                <div className="flex items-center gap-2 w-full max-w-lg">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded px-3 py-2 text-center flex-1">Klientapplikasjon<br/><span className="text-[10px]">kaller stub</span></div>
                  <div className="text-gray-400">→</div>
                  <div className="bg-blue-200 dark:bg-blue-800/40 text-blue-900 dark:text-blue-100 rounded px-3 py-2 text-center flex-1">Klient-stub<br/><span className="text-[10px]">marshalling</span></div>
                </div>
                <div className="text-gray-400 text-center">↓ TCP/IP-nettverk</div>
                <div className="flex items-center gap-2 w-full max-w-lg flex-row-reverse">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded px-3 py-2 text-center flex-1">Serverimplementasjon<br/><span className="text-[10px]">utfører kallet</span></div>
                  <div className="text-gray-400">←</div>
                  <div className="bg-green-200 dark:bg-green-800/40 text-green-900 dark:text-green-100 rounded px-3 py-2 text-center flex-1">Server-stub<br/><span className="text-[10px]">unmarshalling</span></div>
                </div>
                <div className="text-gray-400 text-center text-xs mt-1">
                  (svaret reiser tilbake i omvendt rekkefølge)
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-3">Tradisjonell (Synkron) RPC</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              I tradisjonell RPC <strong>blokkerer prosessen</strong> til operasjonen er fullført.
              Prosessane er synkroniserte i tid.
            </p>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-800/40 p-4 mb-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded px-2 py-1 mb-1">Klient</div>
                  <div className="text-xs text-[var(--muted)]">Blokkerer</div>
                  <div className="text-xs text-[var(--muted)]">og ventar</div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs">→ Request (REQ) →</div>
                  <div className="w-full h-px bg-gray-400"></div>
                  <div className="text-xs">← Reply (REP) ←</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded px-2 py-1 mb-1">Server</div>
                  <div className="text-xs text-[var(--muted)]">Prosesserer</div>
                  <div className="text-xs text-[var(--muted)]">og svarar</div>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-3">Multicast RPC</h3>
            <p className="text-sm text-[var(--muted)] mb-2">
              Ein RPC-forespørsel sendast til <em>multiple</em> RPC-serverar.
              Brukt ved parallell prosessering av rekneintensive oppgåver.
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-1 ml-4">
              <li>▸ Passordknekking</li>
              <li>▸ Krypteringsanalyse ved utømmande søk</li>
              <li>▸ Søk etter filer med bestemt tekstmønster</li>
              <li>▸ Finne primtall (RSA-kryptonøkkelalgoritme)</li>
            </ul>

            <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Java RMI — RPC i praksis</h4>
              <p className="text-sm text-[var(--muted)]">
                Java Remote Method Invocation (RMI) er Javas implementasjon av RPC.
                Krev at begge prosessar køyrer i JVM-miljø. Brukar eit objekt-register
                (RMI Registry) der referansar til fjernobjekt lagrast og kan hentast.
              </p>
              <ul className="text-xs text-[var(--muted)] mt-2 space-y-1">
                <li>▸ Server: definerer grensesnitt (extends Remote), implementerer, registrerer</li>
                <li>▸ Klient: slår opp i registry, kallar metoden med normal metodekall-syntaks</li>
                <li>▸ Stubs genererast dynamisk ved køyretid (JRMP)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── ASYNKRON RPC ── */}
      {active === "asynkron" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Asynkron og Deferred Synchronous RPC
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Asynkron RPC er utforma for å kvi seg av med den strenge forespørsel-svar-åtferda
              til tradisjonell RPC, og la klienten halde fram utan å vente på svar frå serveren.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border-2 border-blue-300 dark:border-blue-700 p-4">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-sm">Tradisjonell (Synkron) RPC</h3>
                <p className="text-xs text-[var(--muted)] mb-2">Klienten ventar til heile kallet er ferdig.</p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs font-mono">
                  <div className="text-blue-600">Klient ventar</div>
                  <div>→ Request</div>
                  <div className="text-green-600">Server: kaller lokal prosedyre</div>
                  <div>← Reply</div>
                  <div className="text-blue-600">Klient held fram</div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-purple-300 dark:border-purple-700 p-4">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 text-sm">Asynkron RPC (one-way)</h3>
                <p className="text-xs text-[var(--muted)] mb-2">Klienten ventar berre på aksept (ACK), ikkje resultat.</p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs font-mono">
                  <div className="text-blue-600">Klient ventar på aksept</div>
                  <div>→ Request</div>
                  <div>← Accept request</div>
                  <div className="text-blue-600">Klient held fram</div>
                  <div className="text-green-600">Server: kaller lokal prosedyre</div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-green-300 dark:border-green-700 p-4">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2 text-sm">Deferred Synchronous RPC</h3>
                <p className="text-xs text-[var(--muted)] mb-2">Kombinerer to asynkrone RPC-ar. Resultat via callback.</p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs font-mono">
                  <div className="text-blue-600">Klient ventar på aksept</div>
                  <div>→ Request</div>
                  <div>← Accept</div>
                  <div className="text-blue-600">Klient reknar vidare</div>
                  <div className="text-green-600">Server: utfører</div>
                  <div>← Return results (callback)</div>
                  <div>→ Acknowledge</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Deferred Synchronous RPC — nærare forklaring</h4>
              <ul className="text-sm text-[var(--muted)] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">1.</span>
                  <span>Det <em>første</em> asynkrone kallet vel prosedyren som skal utførast og sender parametrar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">2.</span>
                  <span>I mellomtida kan kallaren halde fram med eige arbeid (parallell kjøring).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">3.</span>
                  <span>Det <em>andre</em> asynkrone kallet returnerer resultata til klienten via ein <strong>callback-funksjon</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">!</span>
                  <span>Krev <strong>multiple trådar</strong> på klientsida for å handtere callback samstundes som klienten køyrer.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Message-Oriented Middleware (MOM)</h4>
              <p className="text-sm text-[var(--muted)] mb-2">
                To svakheiter ved RPC motiverer MOM:
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-1">
                <li>▸ <strong>Tett kopla i tid:</strong> Både sendar og mottakar må kjøre samstundes</li>
                <li>▸ <strong>Blokkerende:</strong> Tradisjonell RPC er synkron</li>
              </ul>
              <p className="text-sm text-[var(--muted)] mt-2">
                MOM løyser dette med <strong>asykron persistent kommunikasjon</strong> via
                mellomvare-nivå-køar. Applikasjonar kommuniserer ved å sette inn meldingar
                i spesifikke køar. Produsentar og konsumentar er laust kopla i tid.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── RPC-FEILKLASSER ── */}
      {active === "feil" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
              RPC-feilklasser — 5 typar
            </h2>
            <p className="text-[var(--muted)] mb-6">
              I motsetnad til lokale prosedurekall kan RPC feile på fleire måtar grunna
              nettverksproblem og krasj. Det finst <strong>5 feilklassar</strong> du MÅ kunne.
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: "Klienten finn ikkje serveren",
                  eng: "Client cannot locate server",
                  color: "border-red-500 bg-red-50 dark:bg-red-950/20",
                  titleColor: "text-red-700 dark:text-red-300",
                  aarsak: "Serveren er nede, har endra adresse, eller er ikkje registrert i nameserveren.",
                  handling: "Klienten mottek ein feilmelding (exception). Klienten kan prøve igjen eller avslutte.",
                  eksempel: "Klienten prøvar å kalle update() på ein server som er reboota.",
                },
                {
                  num: 2,
                  title: "Forespørselsmelding tapt",
                  eng: "Lost request message",
                  color: "border-orange-500 bg-orange-50 dark:bg-orange-950/20",
                  titleColor: "text-orange-700 dark:text-orange-300",
                  aarsak: "Nettverkspakken med RPC-forespørselen kjem ikkje fram.",
                  handling: "Klient-stubben har ein timeout og sender forespørselen på nytt (retransmit). Serveren er uvitande.",
                  eksempel: "Pakken droppast i eit overbelasta nettverk.",
                },
                {
                  num: 3,
                  title: "Serveren krasjar",
                  eng: "Server crash",
                  color: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
                  titleColor: "text-yellow-700 dark:text-yellow-300",
                  aarsak: "Serveren krasjar enten (a) etter at kallet er utført men før svar sendast, eller (b) under utføring.",
                  handling: "Klienten veit ikkje kva som skjedde. Kan: (1) sende på nytt — risikerer dobbel utføring. (2) gje opp — tapte kall. Semantikk: at-least-once eller at-most-once.",
                  eksempel: "Serveren krasjar etter å ha trekt pengar frå konto men før kvitteringa sendast.",
                },
                {
                  num: 4,
                  title: "Svarmelding tapt",
                  eng: "Lost reply message",
                  color: "border-blue-500 bg-blue-50 dark:bg-blue-950/20",
                  titleColor: "text-blue-700 dark:text-blue-300",
                  aarsak: "Kallet er utført på serveren, men svaret kjem ikkje fram til klienten.",
                  handling: "Som server-krasj: klienten veit ikkje om kallet vart utført. Ny sending risikerer dobbel utføring. Nøkkel: bruk sekvensnummer for idempotente operasjonar.",
                  eksempel: "Svaret droppast av ein overbelasta ruter mellom server og klient.",
                },
                {
                  num: 5,
                  title: "Klienten krasjar",
                  eng: "Client crash",
                  color: "border-purple-500 bg-purple-50 dark:bg-purple-950/20",
                  titleColor: "text-purple-700 dark:text-purple-300",
                  aarsak: "Klienten krasjar medan han ventar på svar frå serveren.",
                  handling: "Serveren har utført (eller held på å utføre) eit kall for ein klient som ikkje lenger finst. Desse kallresultata kallast foreldra (orphans). Løysingar: extermination, reincarnation, expiration.",
                  eksempel: "Klienten krasjar under ein lang database-transaksjon.",
                },
              ].map((feil) => (
                <div key={feil.num} className={`rounded-lg border-l-4 ${feil.color} p-4`}>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white dark:bg-gray-800 border border-[var(--card-border)] w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                      {feil.num}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${feil.titleColor} mb-0.5`}>{feil.title}</h3>
                      <p className="text-xs text-[var(--muted)] italic mb-2">{feil.eng}</p>
                      <div className="grid sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="font-semibold">Årsak:</span>{" "}
                          <span className="text-[var(--muted)]">{feil.aarsak}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Handling:</span>{" "}
                          <span className="text-[var(--muted)]">{feil.handling}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Eksempel:</span>{" "}
                          <span className="text-[var(--muted)]">{feil.eksempel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 p-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Husetips for eksamen</h4>
              <p className="text-sm text-[var(--muted)]">
                Husk sekvensen: <strong>Finn server → Send forespørsel → Server utfører → Send svar → Klient mottek</strong>.
                Feil kan skje på kvart steg. Feilklasse 3 (server krasjar) er den vanskelegaste
                fordi klienten ikkje kan skilje mellom «kallet vart utført» og «kallet vart ikkje utført».
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── MQTT ── */}
      {active === "mqtt" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              MQTT — MQ Telemetry Transport
            </h2>

            <p className="text-[var(--muted)] mb-4">
              MQTT er ein lettvekts meldingskø- og transportprotokoll eiga for
              Machine-to-Machine (M2M), trådlause sensornettverk (WSN) og IoT-senarier.
              Han køyrer over TCP/IP.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Kommunikasjonsmodell", value: "Asynkron, persistent" },
                { label: "Mønster", value: "Publish/Subscribe" },
                { label: "Transport", value: "TCP/IP" },
                { label: "Kopling", value: "Laus (tid og rom)" },
                { label: "Broker", value: "Mellommann for emne" },
                { label: "Portnum", value: "1883 (MQTT), 8883 (MQTTS)" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
                  <div className="text-xs text-[var(--muted)]">{item.label}</div>
                  <div className="font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>

            <h3 className="font-bold mb-3">MQTT-modell</h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              MQTT dekoplerer dataprodusentar (publisher) frå datakonsumentar (subscriber)
              via <strong>emne (topics)</strong> som fungerer som meldingskøar.
              Ein <strong>broker</strong> (server) handterer alle tilkoplingar og distribuerer meldingar.
            </p>

            <div className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 mb-6">
              <div className="flex gap-4">
                <div className="rounded bg-blue-200 dark:bg-blue-800 px-3 py-2 text-sm text-center font-medium">
                  Publisher<br/><span className="text-xs font-normal">Temperatursensor</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs text-[var(--muted)]">PUBLISH</span>
                  <span className="text-lg">→</span>
                </div>
                <div className="rounded bg-green-200 dark:bg-green-800 px-3 py-2 text-sm text-center font-medium">
                  Broker<br/><span className="text-xs font-normal">HiveMQ / Mosquitto</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg">→</span>
                  <span className="text-xs text-[var(--muted)]">PUBLISH</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded bg-purple-200 dark:bg-purple-800 px-3 py-1 text-xs text-center">Subscriber 1</div>
                  <div className="rounded bg-purple-200 dark:bg-purple-800 px-3 py-1 text-xs text-center">Subscriber 2</div>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] text-center">
                Emne (topic) = «temperature» | Broker lagrar og distribuerer
              </p>
            </div>

            <h3 className="font-bold mb-3">MQTT QoS-nivåar</h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              MQTT tilbyr tre leveringskvalitetsnivå på toppen av TCP/IP.
              Sjølv om TCP er påliteleg, kan ei TCP-tilkopling bryte saman og meldingar i
              transitt kan gå tapt. MQTT legg til 3 QoS-nivå for å handtere dette.
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 dark:bg-red-950/20 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-red-700 dark:text-red-300">QoS nivå 0 — At-most-once («fire-and-forget»)</h4>
                  <span className="text-xs bg-red-200 dark:bg-red-800 px-2 py-0.5 rounded">Best effort</span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">
                  Meldinga sendast éin gong utan bekreftelse. Kan gå tapt eller dupliserast.
                </p>
                <div className="text-xs font-mono bg-white dark:bg-gray-900 rounded p-2">
                  Klient → PUBLISH(QoS=0) → Server → PUBLISH → Subscriber<br/>
                  (ingen ACK, ingen lagring)
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">
                  <strong>Brukstilfelle:</strong> Temperatursensordata som publiserast regelmessig.
                  Tap av enkeltmålingar er ikkje kritisk.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300">QoS nivå 1 — At-least-once</h4>
                  <span className="text-xs bg-yellow-200 dark:bg-yellow-800 px-2 py-0.5 rounded">Garantert, kan duplikat</span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">
                  Meldinga er garantert å kome fram, men kan leverast fleire gonger (duplikat).
                  Klienten sender på nytt viss ingen PUBACK kjem i tide.
                </p>
                <div className="text-xs font-mono bg-white dark:bg-gray-900 rounded p-2">
                  1. Klient lagrar melding<br/>
                  2. PUBLISH(QoS=1) → Server lagrar<br/>
                  3. Server publiserer til abonnentar<br/>
                  4. Server slettar<br/>
                  5. ← PUBACK<br/>
                  6. Klient slettar melding
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">
                  <strong>Brukstilfelle:</strong> Dørsensar som skal rapportere tilstandsendringar (open/lukka).
                  Applikasjonar forkastas duplikat via message-ID.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-green-400 bg-green-50 dark:bg-green-950/20 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-green-700 dark:text-green-300">QoS nivå 2 — Exactly-once</h4>
                  <span className="text-xs bg-green-200 dark:bg-green-800 px-2 py-0.5 rounded">Høgast garanti</span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">
                  Høgaste nivå — leverast nøyaktig éin gong. Kombinerer at-least-once og at-most-once.
                  Krev 4-trinns handshake: PUBLISH → PUBREC → PUBREL → PUBCOMP.
                </p>
                <div className="text-xs font-mono bg-white dark:bg-gray-900 rounded p-2">
                  1. Klient lagrar<br/>
                  2. PUBLISH(QoS=2) → Server lagrar<br/>
                  3. Server publiserer til abonnentar<br/>
                  4. ← PUBREC (received)<br/>
                  5. → PUBREL (release)<br/>
                  6. Server slettar → ← PUBCOMP (complete)<br/>
                  7. Klient slettar
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">
                  <strong>Brukstilfelle:</strong> Applikasjonar der duplikathendingar kan føre til
                  feil handlingar, t.d. utløyse alarm.
                </p>
              </div>
            </div>

            <h3 className="font-bold mb-3">MQTT — Andre viktige konsept</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[var(--card-border)] p-4">
                <h4 className="font-semibold mb-2">Topic wildcards</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/</code> — emnenivåseparator: building/floor-1/sensors/temperature</li>
                  <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">+</code> — enkelt-nivå-wildcard: building/+/sensors (eit nivå)</li>
                  <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">#</code> — fleirnivå-wildcard: building/floor-1/# (alle undernivå)</li>
                  <li className="text-red-500">NB: # MÅ vere siste teikn i emne-stringen!</li>
                </ul>
              </div>
              <div className="rounded-lg border border-[var(--card-border)] p-4">
                <h4 className="font-semibold mb-2">Retained messages &amp; Will</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li><strong>Retained:</strong> Broker lagrar siste melding for eit emne. Nye abonnentar mottek ho straks.</li>
                  <li><strong>Will-melding:</strong> Klienten spesifiserer ei «testament»-melding i CONNECT. Viss klienten bryt uventa tilkoplinga, sender broker will-meldinga til alle abonnentar.</li>
                  <li><strong>Clean session = 0:</strong> Brokeren hugsar subscriptions etter fråkopling (durable).</li>
                  <li><strong>Clean session = 1:</strong> Ny session kvar gong (transient).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── OVERLAY / ALM ── */}
      {active === "overlay" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Overlay-nettverk og Application-Level Multicast (ALM)
            </h2>

            <p className="text-[var(--muted)] mb-4">
              Eit <strong>overlay-nettverk</strong> er eit logisk nettverk bygd på toppen av
              det fysiske nettverket. Nodane er prosessar som kommuniserer via det fysiske
              nettverket, men overlay-topologien kan vere heilt annleis.
            </p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 p-4 mb-6">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Application-Level Multicast (ALM)</h3>
              <p className="text-sm text-[var(--muted)] mb-2">
                ALM organiserer noder i eit overlay-nettverk og bruker dette til å
                spre (multicast) data til alle noder — utan å trenge IP-multicast-støtte
                i nettverksinfrastrukturen.
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-1">
                <li>▸ <strong>Trestruktur:</strong> Unike (overlay) stigar mellom kvart nodepar</li>
                <li>▸ <strong>Mesh-nettverk:</strong> Kvar node har fleire naboanar og fleire stigar (krev ruting)</li>
                <li>▸ <strong>Brukstilfelle:</strong> P2P-innhaldsdeling, replikert servar-oppdateringar, streaming</li>
              </ul>
            </div>

            <h3 className="font-bold mb-4">ALM-kostnadar: 3 metrikkar</h3>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 dark:bg-red-950/20 p-4">
                <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">1. Link Stress (lenkestress)</h4>
                <p className="text-sm text-[var(--muted)] mb-2">
                  Kor mange gonger kryssar ein ALM-melding same fysiske lenkje?
                </p>
                <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                  <p className="font-medium mb-1">Eksempel (frå forelesinga):</p>
                  <p className="text-[var(--muted)]">
                    Melding frå A til D i overlay-nettverket (A→B→E→C→D og A→B→D):
                  </p>
                  <ul className="text-[var(--muted)] mt-1 space-y-0.5 font-mono text-xs">
                    <li>⟨Ra,Rb⟩ = 2 (kryssast to gonger)</li>
                    <li>⟨Ra,Re⟩ = 1</li>
                    <li>⟨Re,Rc⟩ = 1</li>
                    <li>⟨Rc,Rd⟩ = 1</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-4">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">2. Stretch / Relative Delay Penalty (RDP)</h4>
                <p className="text-sm text-[var(--muted)] mb-2">
                  Forholdet mellom forsinkinga på overlay-stigen og forsinkinga på den beste
                  fysiske stigen mellom dei to nodane.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded p-3 font-mono text-xs mb-2">
                  <p className="text-blue-600 font-bold">RDP = overlay-sti-forsinkelse / beste nettverksnivå-forsinkelse</p>
                  <p className="mt-1 text-[var(--muted)]">RDP = 1.0 betyr ingen overhead (perfekt)</p>
                  <p className="text-[var(--muted)]">RDP = 2.0 betyr dobbel forsinkelse samanlikna med optimal</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded p-3 text-xs">
                  <p className="font-medium mb-1">Eksempel frå forelesinga (B til C):</p>
                  <p className="text-[var(--muted)]">Overlay-sti: B→Rb→Ra→Re→E→Re→Rc→Rd→D→Rd→Rc→C = <strong>73</strong></p>
                  <p className="text-[var(--muted)]">Nettverkssti: B→Rb→Rd→Rc→C = <strong>47</strong></p>
                  <p className="text-green-600 font-semibold">RDP = 73/47 ≈ 1.55</p>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-green-400 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">3. Tree Cost (trekostnad)</h4>
                <p className="text-sm text-[var(--muted)] mb-2">
                  Global metrikk: summen av alle lenkekostnadar i det valde spanntreet
                  for overlay-nettverket. Målet er å finne <strong>minimum spanntre</strong>.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded p-3 text-xs">
                  <p className="font-medium mb-1">Eksempel frå forelesinga (5 noder A,B,C,D,E):</p>
                  <ul className="text-[var(--muted)] space-y-0.5">
                    <li>Tre 1: A-B(9) + B-E(39) + E-D(27) + D-C(7) = <strong>kostnad 82</strong></li>
                    <li>Tre 2: A-B(9) + A-E(32) + E-C(22) + C-D(7) = <strong>kostnad 70</strong> (MST!)</li>
                    <li>Tre 3: A-B(9) + A-E(32) + E-C(22) + B-D(49) = <strong>kostnad 112</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-3">Flooding-basert multicast</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              P sender ei melding <em>m</em> til kvar av sine naboanar. Kvar nabo
              vidaresender meldinga, bortsett frå til P, og berre viss naboen ikkje
              har sett <em>m</em> tidlegare.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-900/30 p-4 text-sm">
                <h4 className="font-semibold mb-2">Strukturert nettverk</h4>
                <ul className="text-[var(--muted)] space-y-1 text-xs">
                  <li>▸ Tre: M = N-1 meldingar (optimalt)</li>
                  <li>▸ Fullt koplat mesh: M = ½ · N · (N-1) (worst-case)</li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-900/30 p-4 text-sm">
                <h4 className="font-semibold mb-2">Ustrukturert nettverk (Random Graph)</h4>
                <ul className="text-[var(--muted)] space-y-1 text-xs">
                  <li>▸ p_edge = sannsynet for at to noder er knytt saman</li>
                  <li>▸ M = ½ · N · (N-1) · p_edge</li>
                  <li>▸ Fleire kantar → dyrare multicast</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── GOSSIP ── */}
      {active === "gossip" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Gossip-baserte protokollar (epidemiske protokollar)
            </h2>

            <p className="text-[var(--muted)] mb-4">
              Gossip-protokollar er inspirert av korleis sjukdomar spreier seg.
              I distribuerte system er målet å <strong>spreie informasjon</strong>
              (ikkje stoppe det). Kvar node informerer eit tilfeldig utval av naboar
              i kvar runde — slik rykte spreier seg.
            </p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 p-4 mb-6">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Terminologi (frå epidemiologi)</h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <div className="rounded-full w-10 h-10 bg-red-200 dark:bg-red-800 mx-auto mb-1 flex items-center justify-center font-bold text-red-800 dark:text-red-200">I</div>
                  <div className="font-semibold">Infective</div>
                  <div className="text-xs text-[var(--muted)]">Har oppdateringa og spreier ho</div>
                </div>
                <div className="text-center">
                  <div className="rounded-full w-10 h-10 bg-yellow-200 dark:bg-yellow-800 mx-auto mb-1 flex items-center justify-center font-bold text-yellow-800 dark:text-yellow-200">S</div>
                  <div className="font-semibold">Susceptible</div>
                  <div className="text-xs text-[var(--muted)]">Har ikkje oppdateringa enno</div>
                </div>
                <div className="text-center">
                  <div className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 mx-auto mb-1 flex items-center justify-center font-bold">R</div>
                  <div className="font-semibold">Removed</div>
                  <div className="text-xs text-[var(--muted)]">Har fått oppdateringa, spreier ikkje lenger</div>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-4">To variantar</h3>

            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Anti-entropy</h4>
                <p className="text-sm text-[var(--muted)] mb-3">
                  Kvar node vel eit tilfeldig peer og synkroniserer. Garanterer at alle noder
                  til slutt får oppdateringa. Tre modellar:
                </p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-white dark:bg-gray-900 rounded p-2">
                    <div className="font-bold text-blue-600 mb-1">Push</div>
                    <p className="text-[var(--muted)]">
                      p_i+1 = p_i · (1 - 1/n)^(n(1-p_i))<br/>
                      Infektert sender til tilfeldig nabo
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded p-2">
                    <div className="font-bold text-green-600 mb-1">Pull</div>
                    <p className="text-[var(--muted)]">
                      p_i+1 = (p_i)²<br/>
                      Mottakeleg spør tilfeldig nabo
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded p-2">
                    <div className="font-bold text-purple-600 mb-1">Push-Pull</div>
                    <p className="text-[var(--muted)]">
                      p_i+1 = Push × Pull<br/>
                      Begge retningar samstundes
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] mt-3">
                  <strong>p_i</strong> = brøkdelen av infiserte noder i runde i.
                  Push er effektivt tidleg (mange infiserte sender).
                  Pull er effektivt seint (mange søker etter oppdatering).
                  Push-pull er raskast totalt sett.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Rumor spreading (ryktespredning)</h4>
                <p className="text-sm text-[var(--muted)]">
                  Ein infisert node tek kontakt med ein tilfeldig nabo.
                  Viss naboen allereie er infisert, stoppar noden å spreie med sannsynet 1/k.
                  Raskare enn anti-entropy men garanterer IKKJE 100% dekning.
                  Eigna for oppdateringar der det er ok at nokre noder ikkje får ho.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
