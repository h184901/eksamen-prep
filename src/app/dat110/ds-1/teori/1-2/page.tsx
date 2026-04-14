"use client";

import { useState } from "react";
import Link from "next/link";

const transparensTyper = [
  {
    id: "access",
    navn: "Access transparency",
    norsk: "Aksess-transparens",
    beskrivelse: "Skjuler forskjeller i datarepresentasjon og maten objekter tilgjengeliggjores pa",
    eksempel:
      "En Windows-klient og en Linux-server kan utveksle data uten a maatte haandtere endianness, tegnkoding eller filnavnkonvensjoner manuelt. Middleware haandterer konverteringen.",
    hukommelse: "ACCESS = skjuler HOW du faar tilgang (format og representasjon)",
  },
  {
    id: "location",
    navn: "Location transparency",
    norsk: "Lokasjon-transparens",
    beskrivelse: "Skjuler hvor et objekt befinner seg fysisk",
    eksempel:
      "URL-en https://www.example.com avslorer ingenting om hvilken server (eller hvilket land) innholdet er lagret pa. Du vet ikke om serveren er i Oslo, Dublin eller Singapore.",
    hukommelse: "LOCATION = skjuler WHERE — du vet ikke stedet",
  },
  {
    id: "relocation",
    navn: "Relocation transparency",
    norsk: "Relokasjon-transparens",
    beskrivelse: "Skjuler at et objekt kan flyttes til en annen lokasjon mens det er i bruk",
    eksempel:
      "En cloud-tjeneste kan flytte en VM fra ett datasenter til et annet under vedlikehold. Brukeren merker ingenting — tilkoblingen opprettholdes. Svart viktig i cloud computing.",
    hukommelse: "RELOCATION = systemet (ikke brukeren) bestemmer flytten, skjult for bruker",
  },
  {
    id: "migration",
    navn: "Migration transparency",
    norsk: "Migrasjon-transparens",
    beskrivelse: "Skjuler at et objekt kan flytte seg til en annen lokasjon pa brukerens initiativ",
    eksempel:
      "Mobiltelefoni: du vandrer fra en basestasjon til en annen mens du snakker. Samtalen avbrytes ikke. Ogsa: sporings- og sporingssystemer der enheten bevisst er mobile.",
    hukommelse: "MIGRATION = BRUKEREN (eller enheten) initierer flytten — skjult for motparten",
  },
  {
    id: "replication",
    navn: "Replication transparency",
    norsk: "Replikering-transparens",
    beskrivelse: "Skjuler at et objekt er replikert (finnes i flere kopier)",
    eksempel:
      "En distribuert database kan ha 5 kopier av en tabell pa forskjellige servere. Applikasjonen leser og skriver som om det bare er en database. Replikeringen er usynlig.",
    hukommelse: "REPLICATION = skjuler at det finnes FLERE KOPIER av ressursen",
  },
  {
    id: "concurrency",
    navn: "Concurrency transparency",
    norsk: "Samtidighets-transparens",
    beskrivelse: "Skjuler at en ressurs kan deles av flere uavhengige brukere samtidig",
    eksempel:
      "To brukere redigerer delte dokumenter i Google Docs, eller to applikasjoner leser/skriver til samme database. Ingen av dem ser den andres operasjoner — kun konsistente tilstander.",
    hukommelse: "CONCURRENCY = skjuler DELING — ressursen ser ut som din alene",
  },
  {
    id: "failure",
    navn: "Failure transparency",
    norsk: "Feil-transparens",
    beskrivelse: "Skjuler feil og gjenoppretting i et objekt",
    eksempel:
      "En webserver krasjer, en annen overtar umiddelbart. Brukeren opplever et lite forsinkelse, men far til slutt svar — ingen synlig feil. Vanskeligst a oppna i praksis.",
    hukommelse: "FAILURE = skjuler at noe GIKK GALT og ble fikset",
  },
];

export default function DS1_2Page() {
  const [activeTransparens, setActiveTransparens] = useState<string | null>(null);
  const [activeGoal, setActiveGoal] = useState<string>("transparens");
  const [showScalingTechniques, setShowScalingTechniques] = useState(false);

  const goals = [
    { id: "ressursdeling", label: "Ressursdeling" },
    { id: "transparens", label: "Transparens" },
    { id: "appenhet", label: "Apenhet" },
    { id: "skalerbarhet", label: "Skalerbarhet" },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.2 Design-mål</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.2 Design-mål</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Bare fordi man <em>kan</em> bygge et distribuert system, betyr det ikke at man <em>bor</em> gjore det.
          Det ma vaere verdt innsatsen. Her er de fire design-malene som gjor distribusjon meningsfull —
          og de 7 transparenstypene du MÅ kunne pa eksamen.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Ramse opp og forklare de 4 design-malene: ressursdeling, transparens, apenhet, skalerbarhet",
            "Forklare ALLE 7 transparenstyper med eksempler (failure, location, migration, osv.)",
            "Skille mellom location transparency og migration/relocation transparency",
            "Forklare IDL og hva interoperabilitet og portabilitet betyr",
            "Forklare de 3 skalerbarhetsdimensjonene: storrelse, geografisk, administrativ",
            "Kjenne de 3 teknikkene for skalerbarhet: partisjonering, replikering, caching",
            "Forklare policy vs. mechanism-prinsippet i apne systemer",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Oversikt over de 4 malene */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          De fire design-malene
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Klikk pa hvert mal for detaljer:
        </p>

        {/* Faner */}
        <div className="flex flex-wrap gap-2">
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGoal(g.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeGoal === g.id
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Innhold per fane */}
        {activeGoal === "ressursdeling" && (
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3 text-sm">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-base">Ressursdeling (Resource sharing)</h3>
            <p>
              Et viktig mal er a gjore det enkelt for brukere og applikasjoner a fa tilgang til og dele
              ressurser pa tvers av nettverket. Ressurser kan vaere alt: skrivere, lagring, data, filer,
              tjenester og nettverk.
            </p>
            <p className="text-[var(--muted)]">
              <strong>Okonomisk motivasjon:</strong> Det er billigere a ha ett hoykvalitets lagringsanlegg delt
              av mange enn at alle ma kjope sitt eget. Ressursdeling muliggjor ogsa samarbeid pa tvers av
              geografiske og organisatoriske grenser.
            </p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
              <p className="font-bold text-xs mb-1">Eksempler:</p>
              <ul className="space-y-1 text-xs text-[var(--muted)]">
                <li>&#8226; BitTorrent: alle deltakere deler bandbredde og lagring</li>
                <li>&#8226; Dropbox/Google Drive: delt mappe tilgjengelig fra alle enheter</li>
                <li>&#8226; AWS S3: delt objektlagring for millioner av applikasjoner</li>
                <li>&#8226; Skriverdeling pa et kontornettverk (klassisk eksempel)</li>
              </ul>
            </div>
          </div>
        )}

        {activeGoal === "transparens" && (
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3 text-sm">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-base">Transparens (Distribution transparency)</h3>
            <p>
              Et viktig mal er a skjule det faktum at prosesser og ressurser er fysisk distribuert pa
              tvers av mange maskiner. Distribusjonen skal vaere <strong>usynlig</strong> (transparent) for
              sluttbrukere og applikasjoner.
            </p>
            <p className="text-[var(--muted)]">
              Realisert via middleware-laget. Det finnes 7 forskjellige typer transparens — se tabellen nedenfor.
              <strong> NB:</strong> Full transparens er umulig og kanskje ikke engang onsket (se grenser for transparens).
            </p>
          </div>
        )}

        {activeGoal === "appenhet" && (
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3 text-sm">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-base">Apenhet (Openness)</h3>
            <p>
              Et apent distribuert system er et system som tilbyr komponenter som lett kan brukes av eller
              integreres i andre systemer. Et apent system bor ogsa selv bestå av komponenter som stammer
              fra andre steder.
            </p>
            <div className="space-y-2">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
                <p className="font-bold text-xs mb-1">IDL — Interface Definition Language</p>
                <p className="text-xs text-[var(--muted)]">
                  Komponenter eksponerer grensesnitt definert i et IDL. Et IDL beskriver <em>syntaksen</em>
                  (funksjoner, parametre, returverdier) — men sjelden semantikken (naturlig sprak).
                  Eksempel: Protobuf (gRPC), WSDL (SOAP), OpenAPI/Swagger.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { begrep: "Interoperabilitet", forklaring: "To implementasjoner fra ulike leverandorer kan samarbeide ved a folge en felles standard" },
                  { begrep: "Portabilitet", forklaring: "En applikasjon laget for system A kan kjores uten endringer pa system B som implementerer samme grensesnitt" },
                  { begrep: "Utvidbarhet", forklaring: "Nye komponenter kan lett legges til eller gamle byttes ut uten a pavirke resten av systemet" },
                  { begrep: "Policy vs. mekanisme", forklaring: "Systemet tilbyr mekanismer (HVA det kan gjore); brukeren velger policy (HVORDAN det brukes)" },
                ].map((b) => (
                  <div key={b.begrep} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-2">
                    <p className="font-bold text-xs text-blue-700 dark:text-blue-400">{b.begrep}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">{b.forklaring}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeGoal === "skalerbarhet" && (
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3 text-sm">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-base">Skalerbarhet (Scalability)</h3>
            <p>
              Et skalerbart system kan vokse uten at ytelsen forringes merkbart. Skalerbarhet
              males langs tre dimensjoner (Neuman, 1994):
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  dim: "Størrelse",
                  engelsk: "Size scalability",
                  innhold: "Legge til flere brukere og ressurser uten at ytelsen degraderes merkbart. Flaskehalser: CPU, lagring, nettverk.",
                },
                {
                  dim: "Geografisk",
                  engelsk: "Geographical scalability",
                  innhold: "Brukere og ressurser spredt geografisk, men forsinkelse er ikke merkbar. Problem: synkron kommunikasjon fungerer darlig over WAN.",
                },
                {
                  dim: "Administrativ",
                  engelsk: "Administrative scalability",
                  innhold: "System kan fortsatt administreres selv om det spenner over mange uavhengige organisasjoner. Vanskeligst — krevet tillit og policy-avtaler.",
                },
              ].map((d) => (
                <div key={d.dim} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
                  <p className="font-bold text-sm text-blue-700 dark:text-blue-400">{d.dim}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-500 mb-1 italic">{d.engelsk}</p>
                  <p className="text-xs text-[var(--muted)]">{d.innhold}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowScalingTechniques(!showScalingTechniques)}
              className="w-full text-left px-3 py-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-neutral-900/30 text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 flex items-center justify-between"
            >
              <span>Teknikker for skalerbarhet</span>
              <span>{showScalingTechniques ? "▲" : "▼"}</span>
            </button>
            {showScalingTechniques && (
              <div className="space-y-2 text-xs">
                {[
                  {
                    teknikk: "Partisjonering og distribusjon",
                    forklaring: "Del opp en stor komponent i mindre deler og spre dem. Eksempel: DNS deler navnerommet inn i soner. Internettets web-dokumenter er spredt pa hundrevis av millioner av servere.",
                  },
                  {
                    teknikk: "Replikering",
                    forklaring: "Ha flere kopier av en ressurs. Oker tilgjengelighet og ytelse. Problemet: konsistens — nar en kopi oppdateres ma alle oppdateres, noe som er vanskelig og kostbart.",
                  },
                  {
                    teknikk: "Caching",
                    forklaring: "En form for replikering, men beslutningen tas av klienten (ikke eieren). En kopi lagres naer brukeren. Problem: foreldet data (stale data) hvis originalen endres.",
                  },
                  {
                    teknikk: "Skjule kommunikasjonslatens",
                    forklaring: "Bruk asynkron kommunikasjon. Klienten sender foresprsel og gjor annet arbeid mens den venter pa svar. Alternativt: flytt deler av beregningen til klienten (JavaScript, form-validering).",
                  },
                ].map((t) => (
                  <div key={t.teknikk} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
                    <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">{t.teknikk}</p>
                    <p className="text-[var(--muted)]">{t.forklaring}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Transparenstyper — stor tabell */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          De 7 transparenstypene — interaktiv gjennomgang
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Dette er det viktigste du ma pugge fra kapittel 1. Klikk pa hver type for full forklaring og
          eksempel. Tabellen viser ISO-definisjonen (samme som boka).
        </p>

        {/* Oversiktstabell */}
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50 dark:bg-blue-950/30">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-blue-700 dark:text-blue-400 w-36">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-blue-700 dark:text-blue-400">Hva skjules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {transparensTyper.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setActiveTransparens(activeTransparens === t.id ? null : t.id)}
                  className={`cursor-pointer transition-colors ${
                    activeTransparens === t.id
                      ? "bg-blue-50 dark:bg-blue-950/30"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-bold text-xs">{t.norsk}</span>
                    <br />
                    <span className="text-xs text-[var(--muted)] italic">{t.navn}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs">{t.beskrivelse}</p>
                    {activeTransparens === t.id && (
                      <div className="mt-3 space-y-2">
                        <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-3">
                          <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">Eksempel:</p>
                          <p className="text-xs text-[var(--muted)]">{t.eksempel}</p>
                        </div>
                        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-2">
                          <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Huskeregel: </p>
                          <p className="text-xs text-amber-700 dark:text-amber-300">{t.hukommelse}</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Migration vs Relocation — klassisk eksamensfelfall */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Klassisk forvirring: Location vs. Migration vs. Relocation
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 text-sm">Location</h3>
            <p className="text-xs text-[var(--muted)] mb-2">Skjuler <strong>HVOR</strong> objektet er akkurat na.</p>
            <p className="text-xs font-mono bg-white/60 dark:bg-neutral-900/40 rounded p-2">
              URL: https://example.com<br/>
              → Ingen ide om server er i Oslo eller Tokyo
            </p>
          </div>
          <div className="rounded-xl border-2 border-indigo-400/60 bg-indigo-50 dark:bg-indigo-950/20 p-4">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-sm">Relocation</h3>
            <p className="text-xs text-[var(--muted)] mb-2">Skjuler at <strong>SYSTEMET</strong> flytter objektet mens det er i bruk.</p>
            <p className="text-xs font-mono bg-white/60 dark:bg-neutral-900/40 rounded p-2">
              AWS flytter VM fra eu-west-1<br/>
              til eu-north-1 under vedlikehold.<br/>
              Bruker merker ingenting.
            </p>
          </div>
          <div className="rounded-xl border-2 border-purple-400/60 bg-purple-50 dark:bg-purple-950/20 p-4">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2 text-sm">Migration</h3>
            <p className="text-xs text-[var(--muted)] mb-2">Skjuler at <strong>BRUKEREN</strong> (eller enheten) beveger seg.</p>
            <p className="text-xs font-mono bg-white/60 dark:bg-neutral-900/40 rounded p-2">
              Du snakker i telefonen og<br/>
              beveger deg mellom baser.<br/>
              Samtalen avbrytes ikke.
            </p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 text-sm">Vanlige feil</h3>
          <ul className="space-y-1 text-sm text-[var(--muted)]">
            <li><span className="text-red-500 font-bold">!</span> Blander migration og relocation: huske at migration = brukeren/enheten beveges, relocation = ressursen flyttes av systemet</li>
            <li><span className="text-red-500 font-bold">!</span> Glemme at failure transparency er umulig a oppna fullt ut (nettverkspartisjon, CAP-teoremet)</li>
            <li><span className="text-red-500 font-bold">!</span> Tro at "persistence transparency" er en av de 7 — boka nevner 7, ikke 8 (persistence er ikke i ISO-listen i boka)</li>
          </ul>
        </div>
      </section>

      {/* Apenhet: IDL og policy/mechanism */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Apenhet i detalj: IDL og policy vs. mekanisme
        </h2>

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-4">
          <div>
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">IDL — Interface Definition Language</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Et IDL lar deg beskrive et grensesnitt pa en sprak-uavhengig mate. Enhver som implementerer
              grensesnittet kan snakke med enhver som bruker det — uavhengig av programmeringssprak,
              OS eller arkitektur.
            </p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 font-mono text-xs p-3 border border-blue-200 dark:border-blue-800/40">
              <p className="text-green-600 dark:text-green-400">// Eksempel: Protobuf IDL (brukt av gRPC)</p>
              <p className="mt-1">service UserService {"{"}</p>
              <p className="ml-4">rpc GetUser (UserRequest) returns (UserResponse);</p>
              <p>{"}"}</p>
              <p className="mt-1">message UserRequest {"{"} string user_id = 1; {"}"}</p>
              <p className="text-green-600 dark:text-green-400 mt-1">// Kan brukes fra Java, Python, Go, C++ osv.</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Policy vs. mekanisme</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
                <p className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-1">MEKANISME (mechanism)</p>
                <p className="text-xs text-[var(--muted)]">
                  HVA systemet kan gjore. F.eks. en nettleser kan lagre dokumenter i cache — det er mekanismen.
                </p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
                <p className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-1">POLICY (policy)</p>
                <p className="text-xs text-[var(--muted)]">
                  HVORDAN mekanismen brukes. F.eks. hvilke dokumenter lagres? Hvor lenge? Hvem kan se dem?
                  Brukeren/admin bestemmer.
                </p>
              </div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              Et godt eksempel: Web-caching i nettlesere. Nettleseren tilbyr <em>mekanismen</em> (lagre dokumenter);
              brukeren setter <em>policy</em> (cache i 24 timer, max 50 MB, aldri krypterte sider). Dette gjor systemet fleksibelt.
            </p>
          </div>
        </div>
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          De 7 transparenstypene er et klassisk eksamenssporsmal. Du bor kunne ramse opp alle 7 og gi
          et eksempel pa hver. Vanskeligst a skille: location (objektet er pa ukjent sted), relocation
          (systemet flytter objektet, skjult for deg), migration (enheten/brukeren beger seg, skjult for motparten).
          Pa 2025-eksamen spurte oppgave 1g om &ldquo;rapid elasticity&rdquo; — det er en cloud-egenskap relatert til
          skalerbarhet.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/ds-1/teori/1-1"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          &larr; 1.1 Definisjon og eksempler
        </Link>
        <Link
          href="/dat110/ds-1/teori/1-3"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          1.3 Typer distribuerte systemer &rarr;
        </Link>
      </div>
    </div>
  );
}
