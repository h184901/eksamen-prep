"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function AUPPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/utviklingsmetode" className="hover:text-[var(--accent)]">Utviklingsmetode</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">AUP</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">AUP — Agile Unified Process</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        AUPs fire faser og syv disipliner — det overordnede rammeverket Atle bruker i kurset,
        og hvordan det kombineres med Scrum-sprinter i byggefasen.
      </p>

      {/* ============================================================ */}
      {/*  9. AUP (AGILE UNIFIED PROCESS)                             */}
      {/* ============================================================ */}
      <section id="aup" className="scroll-mt-32">
        <TheorySummary
          title="AUP — Agile Unified Process"
          mustKnow={[
            "AUP = forenklet, smidig versjon av RUP (Rational Unified Process)",
            "4 faser: Oppstart → Utdypning → Bygging → Overlevering",
            "7 disipliner som jobbes med gjennom alle fasene",
            "AUP kombineres gjerne med Scrum i byggefasen",
            "Formål: flate ut kostnadskurven for endringer",
          ]}
        >
          <p>
            AUP er den utviklingsmetoden Atle bruker som <strong>overordnet rammeverk</strong> i kurset.
            Den kombinerer strukturen fra tradisjonell RUP med smidige praksiser fra XP og Scrum.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De 4 fasene</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400">1. Oppstart (Inception)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Definer prosjektets <strong>omfang</strong></li>
                <li>Lag <strong>kostnadsestimat</strong> og tidsplan</li>
                <li>Kartlegg <strong>risikoer</strong></li>
                <li>Lag overordnet kravspesifikasjon og brukstilfellemodell</li>
                <li>Bestem <strong>gjennomførbarhet</strong> — skal vi gjøre dette?</li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400">2. Utdypning (Elaboration)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Gå dypere inn i kravene</li>
                <li>Identifiser og <strong>valider arkitekturen</strong></li>
                <li>Håndter <strong>teknisk risiko</strong></li>
                <li>Bygg en kjørbar <strong>arkitekturprototype</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">3. Bygging (Construction)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Hovedfasen</strong> — her skjer selve kodingen</li>
                <li>Modellér, bygg og test systemet iterativt</li>
                <li>Bruk <strong>TDD og kontinuerlig integrasjon</strong></li>
                <li>Lever inkrementelt med <strong>Scrum-sprinter</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 p-4">
              <p className="font-bold text-orange-700 dark:text-orange-400">4. Overlevering (Transition)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Systemtesting</strong> og brukertesting</li>
                <li>Fikse de siste feilene</li>
                <li><strong>Utrulling</strong> til produksjon</li>
                <li>Opplæring og dokumentasjon</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 7 disiplinene</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Disse jobbes med <strong>kontinuerlig gjennom alle fasene</strong>, med varierende
            intensitet. RUP har 9 disipliner — AUP forenkler til 7.
          </p>

          <ComparisonTable
            headers={["Disiplin", "Hva?"]}
            rows={[
              ["1. Modellering", "Forstå problemet og designe løsningen. Smidig modellering (AMDD) — skisser på tavlen, ikke hundrevis av dokumenter."],
              ["2. Implementering", "Selve kodingen — gjøre modellene om til kjørbart system."],
              ["3. Test", "Testing gjennom hele livssyklusen — ikke bare til slutt."],
              ["4. Utrulling (Deployment)", "Sørge for at programvaren leveres. Hyppig levering av fungerende programvare."],
              ["5. Konfigurasjonshåndtering", "Versjonskontroll (Git) — holde styr på kodeendringer."],
              ["6. Prosjektledelse", "Styre risikoer, planlegge iterasjoner, fjerne hindringer."],
              ["7. Miljø (Environment)", "Sikre at teamet har riktige verktøy og retningslinjer."],
            ]}
          />

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">AUP + Scrum (slik det brukes i praksis)</p>
            <p className="text-sm">
              AUP gir det <strong>overordnede rammeverket</strong> med faser og milepæler,
              mens Scrum brukes <strong>innenfor byggefasen</strong> for å organisere sprinter
              og daglig arbeid. AUP svarer på &ldquo;hvilken fase er vi i?&rdquo;, Scrum svarer
              på &ldquo;hva gjør vi denne uken?&rdquo;.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Nøkkelprinsipper</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Hold det enkelt</strong> — fokus på mennesker og samarbeid, ikke prosesser</li>
              <li><strong>Active Stakeholder Participation</strong> — kunden kan ikke forsvinne etter kravspek</li>
              <li><strong>Kravhåndtering i en stabel</strong> — krav prioriteres i en liste som kan endres</li>
              <li><strong>Flat ut kostnadskurven</strong> — endringer sent i prosjektet skal ikke være dyre</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  INCEPTION (OPPSTART) I DETALJ                              */}
      {/* ============================================================ */}
      <section id="inception-detalj" className="scroll-mt-32">
        <TheorySummary
          title="Inception (Oppstart) i detalj — alle 7 disipliner"
          defaultOpen={false}
          mustKnow={[
            "Mål: enighet om omfang, første kravspek, kostnadsestimat, risikoanalyse",
            "Alle 7 disipliner er aktive — men på et OVERORDNET nivå",
            "Risiko = sannsynlighet × konsekvens — kartlegges før vi går videre",
            "Slutter med Lifecycle Objective Milestone (LOM)",
          ]}
        >
          <p>
            Oppstartsfasen er <strong>kort, men kritisk</strong>. Her bestemmer vi om prosjektet er
            verdt å gjennomføre i det hele tatt. Vi gjør lite koding — men mye samtaler med
            interessenter, skisser, prototyper og analyse av risiko. Tenk på det som en{" "}
            <em>mulighetsstudie</em>: vi vil ha nok informasjon til å si &ldquo;ja, vi går videre&rdquo;
            eller &ldquo;nei, dette blir for risikabelt&rdquo;.
          </p>

          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 my-4">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Mål for Inception</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Enighet om omfang</strong> — hva er innenfor og hva er utenfor?</li>
              <li><strong>Første kravspesifikasjon</strong> — overordnede brukstilfeller</li>
              <li><strong>Kostnadsestimat</strong> og foreløpig tidsplan</li>
              <li><strong>Risikoidentifikasjon</strong> — tekniske, forretningsmessige, ressurser</li>
              <li><strong>Gjennomførbarhet</strong> — kan vi faktisk gjøre dette?</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 7 disiplinene i Inception</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">1. Modellering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Overordnet kravspesifisering (de viktigste brukstilfellene)</li>
                <li>Overordnet arkitektur — første skisse av lag og komponenter</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">2. Implementering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Prototyping av brukergrensesnitt — &ldquo;sketches&rdquo; og wireframes</li>
                <li>Prototyping av tekniske løsninger — viser at det er mulig</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">3. Testing</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Overordnet testplan</li>
                <li>Sjekk prosjekt-produkt — gir det verdi?</li>
                <li>Sjekk modellene — henger de logisk sammen?</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">4. Utrulling</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Finn leverings-&ldquo;vindu&rdquo; — når skal kunden få produktet?</li>
                <li>Start planlegging av utrulling — hosting, miljø, brukere</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">5. Konfigurasjonsstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Lag konfigurasjonsmiljø — Git-repo, branching-strategi</li>
                <li>Plasser produkter under versjonskontroll fra dag én</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">6. Prosjektstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Begynn lagbygging — hvem skal være med, hvilken kompetanse trengs?</li>
                <li>Høynivå prosjektplan — milepæler og faser</li>
                <li>Detaljert plan for kommende iterasjon</li>
                <li>Håndter risikoer — registrer i risikologg</li>
                <li>Få støtte fra interessenter — &ldquo;buy-in&rdquo; fra ledelsen</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">7. Miljø</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Lag utviklingsmiljø — IDE, byggskript, CI-server</li>
                <li>Finn prosjektkategori — internt, kundeprosjekt, åpen kildekode?</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Ferdig-kriterier (LOM — Lifecycle Objective Milestone)</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Interessentene er enige i prosjektets omfang og kostnadsestimat</li>
              <li>Krav er forstått — primære brukstilfeller er identifisert</li>
              <li>Risiko er identifisert og første mottiltak er planlagt</li>
              <li>Faseplan for resten av prosjektet er på plass</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Risikohåndtering — kort</h3>
          <p>
            Risiko kartlegges som <strong>sannsynlighet × konsekvens</strong>. Hver risiko får en
            &ldquo;score&rdquo;, og de viktigste prioriteres med konkrete{" "}
            <strong>mottiltak</strong> (forebyggende) og <strong>responsplaner</strong> (hva gjør vi
            hvis det skjer?). Risikologgen oppdateres gjennom hele prosjektet, men spesielt tungt i
            Inception og Elaboration.
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-[var(--card-border)]">
              <thead className="bg-neutral-100 dark:bg-neutral-900">
                <tr>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Risiko</th>
                  <th className="text-center p-2 border-b border-[var(--card-border)]">Sanns.</th>
                  <th className="text-center p-2 border-b border-[var(--card-border)]">Kons.</th>
                  <th className="text-center p-2 border-b border-[var(--card-border)]">Score</th>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Mottiltak</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="p-2">Ny teknologi feiler</td>
                  <td className="text-center p-2">3</td>
                  <td className="text-center p-2">5</td>
                  <td className="text-center p-2 font-bold text-red-600">15</td>
                  <td className="p-2">Bygg PoC i Elaboration</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="p-2">Nøkkelutvikler slutter</td>
                  <td className="text-center p-2">2</td>
                  <td className="text-center p-2">4</td>
                  <td className="text-center p-2 font-bold text-amber-600">8</td>
                  <td className="p-2">Pair programming, kodestandarder</td>
                </tr>
                <tr>
                  <td className="p-2">Krav endres mye</td>
                  <td className="text-center p-2">5</td>
                  <td className="text-center p-2">2</td>
                  <td className="text-center p-2 font-bold text-amber-600">10</td>
                  <td className="p-2">Korte sprinter, jevnlig demo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  ELABORATION (UTDYPNING) I DETALJ                           */}
      {/* ============================================================ */}
      <section id="elaboration-detalj" className="scroll-mt-32">
        <TheorySummary
          title="Elaboration (Utdypning) i detalj — alle 7 disipliner"
          defaultOpen={false}
          mustKnow={[
            "Mål: stabil visjon, stabil arkitektur, akseptert risiko, gjennomføringsplan",
            "Den viktigste leveransen er en KJØRBAR arkitekturprototype",
            "Slutter med Lifecycle Architecture Milestone (LAM)",
            "Etter Elaboration er det meste av teknisk risiko håndtert",
          ]}
        >
          <p>
            Utdypning handler om å <strong>fjerne usikkerhet</strong>. Vi går fra &ldquo;vi tror dette
            er mulig&rdquo; til &ldquo;vi har bevist det med en kjørbar prototype&rdquo;. Arkitekturen
            må stå på beina sine før vi går inn i den dyre Construction-fasen — endringer i
            arkitektur er billige nå, dyre senere.
          </p>

          <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4 my-4">
            <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Mål for Elaboration</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Stabil visjon</strong> — alle er enige om hva produktet skal være</li>
              <li><strong>Stabil arkitektur</strong> — bevist gjennom kjørende prototype</li>
              <li><strong>Risikoakseptanse</strong> — gjenværende risiko er akseptabel</li>
              <li><strong>Gjennomføringsplan</strong> — detaljert plan for Construction</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 7 disiplinene i Elaboration</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">1. Modellering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Identifiser teknisk risiko — hvilke deler er vanskeligst?</li>
                <li>Modellere arkitektur — komponentdiagram, distribusjonsdiagram</li>
                <li>Prototyping av UI — mer detaljerte skisser</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">2. Implementering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Vis at arkitekturen fungerer</strong> — bygg en Proof of Concept</li>
                <li>Den vertikale skiven: UI → logikk → DB skal kjøre ende-til-ende</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">3. Testing</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Valider arkitekturen — test ytelse, sikkerhet, integrasjoner</li>
                <li>Utvikle første testmodell — testtilfeller og strategi</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">4. Utrulling</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Oppdater utrullingsplanen — hvilke miljøer, når, hvordan?</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">5. Konfigurasjonsstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Legg <em>alt</em> under konfigurasjonshåndtering — også dokumenter, modeller, skript</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">6. Prosjektstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Bygg team — fyll opp roller</li>
                <li>Beskytt team — fjern hindringer</li>
                <li>Skaff ressurser — verktøy, lisenser, miljøer</li>
                <li>Håndter risikoer — oppdater risikologgen</li>
                <li>Oppdater plan for resterende faser</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">7. Miljø</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Videreutvikle utviklingsmiljøet — CI-pipeline, testdata</li>
                <li>Tilpass prosessmateriale — sjekklister, maler, kodestandarder</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er arkitekturprototype så viktig?</p>
            <p className="text-sm">
              En arkitekturprototype er en <strong>kjørbar vertikal skive</strong> — ikke bare
              boksdiagrammer på tavlen. Den beviser at de mest risikofylte tekniske valgene
              fungerer i praksis: at databasen tåler lasten, at autentisering virker, at klient og
              server snakker sammen. <strong>Hvis arkitekturen ikke holder vann nå, koster det
              titalls ganger mer å fikse i Construction.</strong> Dette er kjernen i å &ldquo;flate
              ut kostnadskurven&rdquo;.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Ferdig-kriterier (LAM — Lifecycle Architecture Milestone)</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Arkitekturen er stabil og bevist gjennom kjørende prototype</li>
              <li>Hovedkrav er detaljert spesifisert</li>
              <li>Plan for Construction er detaljert og godkjent</li>
              <li>Resterende risikoer er akseptable</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  CONSTRUCTION (BYGGING) I DETALJ                            */}
      {/* ============================================================ */}
      <section id="construction-detalj" className="scroll-mt-32">
        <TheorySummary
          title="Construction (Bygging) i detalj — alle 7 disipliner"
          defaultOpen={false}
          mustKnow={[
            "Mål: beta-versjon, komplett kodebase, test-suite",
            "Dette er HOVEDFASEN — mest tid og mest penger brukes her",
            "Scrum-sprinter (typisk 2 uker) styrer hverdagen",
            "TDD og kontinuerlig integrasjon er nesten obligatorisk",
            "Slutter med Initial Operational Capability Milestone (IOC)",
          ]}
        >
          <p>
            I Construction skjer <em>selve byggingen</em>. Arkitekturen er stabil, kravene er
            forstått — nå skal vi produsere kode i et jevnt tempo, sprint etter sprint. Dette er
            der AUP og Scrum smelter sammen: AUP gir den ytre rytmen, Scrum gir den indre.
          </p>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4 my-4">
            <p className="font-bold text-green-700 dark:text-green-400 mb-2">Mål for Construction</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Beta-versjon</strong> — fungerende system klart for testing av sluttbrukere</li>
              <li><strong>Komplett kodebase</strong> — alle planlagte features er implementert</li>
              <li><strong>Test-suite</strong> — automatiserte tester på enhets-, integrasjons- og systemnivå</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 7 disiplinene i Construction</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">1. Modellering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Analysemodell — fortsetter å utdypes når nye krav dukker opp</li>
                <li>Utformingsmodell — klassediagram, sekvensdiagram for nye features</li>
                <li>Dokumenter utformingsvalg — &ldquo;hvorfor valgte vi denne løsningen?&rdquo;</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">2. Implementering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Test først (TDD)</strong> — Red → Green → Refactor</li>
                <li>Bygg kontinuerlig — CI-server kjører tester ved hver commit</li>
                <li>Videreutvikle domenemodellen i kode</li>
                <li>Videreutvikle UI</li>
                <li>Bygg dataskjema og migrasjonsskript</li>
                <li>Lag grensesnitt til eksisterende systemer</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">3. Testing</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Test programvaren — enhetstest, integrasjonstest, regresjonstest</li>
                <li>Videreutvikle testmodellen — nye testtilfeller for nye features</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">4. Utrulling</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Lag installasjonsskript</li>
                <li>Skriv leveransenotater (release notes)</li>
                <li>Skriv applikasjonsdokumentasjon</li>
                <li>Oppdater utrullingsplanen</li>
                <li>Rull ut til testmiljø — for kunden å se på</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">5. Konfigurasjonsstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Kontinuerlig versjonskontroll — <strong>commit/push minst daglig</strong></li>
                <li>Branch-strategi følges — feature branches → PR → main</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">6. Prosjektstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Håndter laget — fjern hindringer, fasiliter sprint-seremonier</li>
                <li>Håndter risiko — oppdater risikologgen sprint for sprint</li>
                <li>Oppdater plan — burndown, velocity, scope-justeringer</li>
                <li>&ldquo;Lukk&rdquo; fasen mot slutten — verifiser at IOC-kriterier er oppfylt</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">7. Miljø</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Støtt laget — verktøy, lisenser, hardware</li>
                <li>Lag arbeidsmiljø — fysisk og digitalt</li>
                <li>Lag treningsmiljø — for ny utviklere som hopper på</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">AUP + Scrum-kobling i Construction</p>
            <p className="text-sm mb-2">
              Hele Construction-fasen kjøres typisk som en serie <strong>Scrum-sprinter</strong>{" "}
              (1-4 uker, oftest 2). Hver sprint leverer en potensielt utrullbar inkrement.
              AUP-disiplinene sklir naturlig inn i Scrum-rytmen:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Sprint planning</strong> = prosjektstyring + modellering</li>
              <li><strong>Daily standup</strong> = prosjektstyring (fjerne hindringer)</li>
              <li><strong>Hver dag</strong> = implementering + testing + konfigurasjonsstyring</li>
              <li><strong>Sprint review</strong> = utrulling (til testmiljø) + interessenter ser produktet</li>
              <li><strong>Sprint retrospective</strong> = miljø + prosjektstyring (forbedring av prosess)</li>
            </ul>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">TDD og kontinuerlig integrasjon — kobling</p>
            <p className="text-sm">
              <strong>TDD</strong> tvinger utviklerne til å tenke på kravene først, og gir et
              sikkerhetsnett mot regresjoner. <strong>Kontinuerlig integrasjon</strong> betyr at hver
              commit utløser bygg + testkjøring på CI-serveren — feil oppdages innen minutter, ikke
              uker. Sammen gjør disse at vi <em>kan</em> levere fungerende programvare hver sprint
              uten å bryte sammen i en feilsøkingsdød i siste fase.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  TRANSITION (OVERLEVERING) I DETALJ                         */}
      {/* ============================================================ */}
      <section id="transition-detalj" className="scroll-mt-32">
        <TheorySummary
          title="Transition (Overlevering) i detalj — alle 7 disipliner"
          defaultOpen={false}
          mustKnow={[
            "Mål: ferdig produkt i produksjon, opplærte brukere, komplett dokumentasjon",
            "Beta-testing → akseptansetesting → produksjon",
            "Implementering handler nå om feilretting og optimalisering, IKKE nye features",
            "Slutter med Product Release Milestone (PRM)",
          ]}
        >
          <p>
            Transition er &ldquo;siste sving&rdquo;. Beta-versjonen fra Construction settes ut til
            ekte brukere, vi finner og fikser det som dukker opp i produksjon, og vi sørger for at
            organisasjonen som skal eie systemet faktisk kan bruke det. Nye features lages ikke
            her — bare optimalisering og polering.
          </p>

          <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 p-4 my-4">
            <p className="font-bold text-orange-700 dark:text-orange-400 mb-2">Mål for Transition</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Ferdig produkt i produksjon</strong> — kunden bruker det daglig</li>
              <li><strong>Opplæring</strong> av sluttbrukere og driftspersonell</li>
              <li><strong>Komplett dokumentasjon</strong> — bruker, drift, vedlikehold</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 7 disiplinene i Transition</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">1. Modellering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Ferdiggjøring av modeller — sluttversjon av domene-, sekvens- og klassediagram</li>
                <li>Ferdiggjøring av overordnet dokumentasjon</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">2. Implementering</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Fjern lus (debug) — feil som dukker opp i beta- og akseptansetest</li>
                <li>Optimalisering — ytelse, minnebruk, responstid</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">3. Testing</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Valider systemet — full systemtesting under realistiske forhold</li>
                <li>Valider dokumentasjonen — stemmer den med det faktiske systemet?</li>
                <li>Ferdiggjøring av testmodellen</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">4. Utrulling</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Ferdiggjør utrullingspakke — installasjonsskript, konfigurasjonsfiler</li>
                <li>Ferdig dokumentasjon — bruker, drift, API</li>
                <li>Kunngjøring av utrulling — kommunikasjon til alle brukere</li>
                <li>Trening av brukere — kurs, video, &ldquo;floorwalking&rdquo;</li>
                <li><strong>Rull ut til produksjon</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">5. Konfigurasjonsstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Alt arbeid (kode, dokumenter, skript, modeller) under versjonskontroll</li>
                <li>Tagg release-versjonen — sporbar tilbake til hver bygg</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">6. Prosjektstyring</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Håndter team — sluttmøter, feiring, evaluering</li>
                <li>Avslutt fasen — formell overlevering</li>
                <li>Initier neste prosjektsyklus — planlegg eventuell videreutvikling</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">7. Miljø</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Definer support — hvem tar over driftsansvaret?</li>
                <li>Oppdater lisenser — sikre at alt er lovlig i produksjon</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
            <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Beta-testing vs akseptansetesting</p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>
                <strong>Beta-testing:</strong> en utvalgt gruppe ekte brukere prøver systemet i sitt
                eget miljø. Hensikten er å finne feil som ikke dukker opp i kontrollert testmiljø
                — uventede bruksmønstre, ytelse på ekte data, kulturelle/språklige problemer.
              </li>
              <li>
                <strong>Akseptansetesting:</strong> kunden kjører forhåndsdefinerte testtilfeller
                for å bekrefte at systemet oppfyller kontrakten. Hvis akseptansetesten består,
                signerer kunden — og prosjektet er formelt overlevert.
              </li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  AUP-DISIPLINENE GJENNOM ALLE FASER (HEATMAP)              */}
      {/* ============================================================ */}
      <section id="disiplin-heatmap" className="scroll-mt-32">
        <TheorySummary
          title="AUP-disiplinene gjennom alle faser (heatmap)"
          mustKnow={[
            "Modellering: tung tidlig, lett senere",
            "Implementering: lett tidlig, eksploderer i Construction",
            "Testing: middels gjennom hele",
            "Utrulling: lett tidlig, tung i Transition",
            "Konfigurasjonsstyring og prosjektstyring: konstant gjennom hele",
          ]}
        >
          <p>
            Alle 7 disipliner pågår i alle 4 faser — men <em>intensiteten</em> varierer kraftig.
            Dette heatmappet viser hvor mye tyngde hver disiplin har i hver fase. Mørkere farge =
            mer aktivitet.
          </p>

          <div className="overflow-x-auto my-6">
            <svg viewBox="0 0 720 360" className="w-full max-w-3xl mx-auto" role="img" aria-label="AUP heatmap — disiplin per fase">
              {/* Fase-overskrifter */}
              {["Inception", "Elaboration", "Construction", "Transition"].map((phase, i) => (
                <text
                  key={phase}
                  x={220 + i * 110}
                  y={28}
                  textAnchor="middle"
                  className="fill-current text-sm font-bold"
                >
                  {phase}
                </text>
              ))}

              {/* Disiplin-rader */}
              {[
                { name: "Modellering",          values: [4, 5, 2, 1] },
                { name: "Implementering",       values: [1, 2, 5, 2] },
                { name: "Testing",              values: [2, 3, 4, 4] },
                { name: "Utrulling",            values: [1, 2, 3, 5] },
                { name: "Konfigurasjonsstyring",values: [3, 3, 3, 3] },
                { name: "Prosjektstyring",      values: [4, 3, 3, 3] },
                { name: "Miljø",                values: [5, 3, 2, 2] },
              ].map((row, rowIdx) => (
                <g key={row.name}>
                  <text
                    x={170}
                    y={70 + rowIdx * 40}
                    textAnchor="end"
                    className="fill-current text-xs"
                  >
                    {row.name}
                  </text>
                  {row.values.map((v, colIdx) => {
                    // Map 1-5 to opacity
                    const opacity = 0.15 + (v - 1) * 0.20;
                    return (
                      <g key={colIdx}>
                        <rect
                          x={180 + colIdx * 110}
                          y={50 + rowIdx * 40}
                          width={90}
                          height={30}
                          fill="#a855f7"
                          fillOpacity={opacity}
                          stroke="#a855f7"
                          strokeOpacity={0.4}
                        />
                        <text
                          x={225 + colIdx * 110}
                          y={70 + rowIdx * 40}
                          textAnchor="middle"
                          className="fill-current text-xs font-semibold"
                        >
                          {v}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}

              {/* Forklaring */}
              <text x={180} y={345} className="fill-current text-xs">
                Skala 1 (lavt) → 5 (høyt) — relativ intensitet
              </text>
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Modellering</strong>: tung i
              Inception og Elaboration når vi skal forstå problemet og finne arkitektur. Avtar
              naturlig når koden tar over som dokumentasjon.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Implementering</strong>:
              eksploderer i Construction. I Inception lager vi bare wireframes; i Elaboration en
              prototype; i Construction bygger vi alt.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Testing</strong>: jevn
              gjennom hele, med en topp i Transition (systemtest, beta, akseptanse).
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Utrulling</strong>: lett
              planlegging tidlig, sterk topp i Transition når vi faktisk ruller ut til produksjon.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Konfigurasjonsstyring</strong>:
              konstant — Git brukes hver dag fra dag én til siste release.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Prosjektstyring</strong>:
              konstant, med en liten topp tidlig (planlegging) og slutten (avslutning).
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm md:col-span-2">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Miljø</strong>: tung i
              Inception når vi setter opp utviklingsmiljø og verktøy. Etterpå mest vedlikehold.
            </div>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  AUP + SCRUM KOMBINASJON                                    */}
      {/* ============================================================ */}
      <section id="aup-scrum" className="scroll-mt-32">
        <TheorySummary
          title="AUP + Scrum-kombinasjon i praksis"
          mustKnow={[
            "AUP gir fasene og milepælene; Scrum styrer hverdagen i Construction",
            "Sprint-rytmen passer naturlig inn i Construction-fasen",
            "AUP-rapportering: fase, milepæl, risiko. Scrum-rapportering: velocity, burndown",
            "AUP svarer på 'hvilken fase?', Scrum svarer på 'hva gjør vi denne uken?'",
          ]}
        >
          <p>
            En klassisk misforståelse er at AUP og Scrum konkurrerer. De gjør ikke det — de jobber
            på <em>forskjellige nivåer</em>. AUP er det <strong>strategiske</strong> rammeverket
            (måneder), Scrum er det <strong>operative</strong> rammeverket (uker/dager).
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Slik fungerer det i praksis</h3>
          <ul className="list-disc list-inside text-sm space-y-1 my-3">
            <li>Inception og Elaboration kjøres typisk som <em>én eller to lengre iterasjoner</em>, ikke som klassiske Scrum-sprinter</li>
            <li>Construction kjøres som en <strong>serie Scrum-sprinter</strong> (1-4 uker)</li>
            <li>Transition kan være én avsluttende sprint + bug-fix periode</li>
            <li>Hver fase har en <strong>milepæl</strong> som må nås før vi går videre — milepælen er det AUP-spesifikke ansvaret</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvordan rapportere på AUP-nivå mens man gjør Scrum?</h3>
          <ul className="list-disc list-inside text-sm space-y-1 my-3">
            <li><strong>Daglig:</strong> Scrum-standup (intern)</li>
            <li><strong>Hver sprint (2 uker):</strong> Sprint review med produkteier — &ldquo;hva er bygget?&rdquo;</li>
            <li><strong>Hver fase (måneder):</strong> Milepælsmøte med interessenter — &ldquo;er vi klare for neste fase?&rdquo;</li>
            <li>Scrum-velocity og burndown brukes til å justere AUP-faseplanen</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">Eksempel: 6-måneders prosjekt</h3>
          <p className="text-sm mb-3">
            Anta vi har 6 måneder, et team på 5 utviklere, og skal bygge en bookingapp.
          </p>

          <div className="overflow-x-auto my-6">
            <svg viewBox="0 0 760 220" className="w-full max-w-3xl mx-auto" role="img" aria-label="AUP-timeline med Scrum-sprinter">
              {/* Tidsakse */}
              <line x1="40" y1="180" x2="720" y2="180" stroke="currentColor" strokeWidth="1" />
              {[0, 1, 2, 3, 4, 5, 6].map((m) => (
                <g key={m}>
                  <line x1={40 + m * 113} y1="178" x2={40 + m * 113} y2="186" stroke="currentColor" />
                  <text x={40 + m * 113} y={200} textAnchor="middle" className="fill-current text-xs">
                    Mnd {m}
                  </text>
                </g>
              ))}

              {/* Faser */}
              <rect x="40"  y="60" width="113" height="40" fill="#3b82f6" fillOpacity="0.7" />
              <text x="96"  y="85" textAnchor="middle" className="fill-white text-xs font-bold">Inception</text>
              <text x="96"  y="100" textAnchor="middle" className="fill-white text-[10px]">1 mnd</text>

              <rect x="153" y="60" width="226" height="40" fill="#a855f7" fillOpacity="0.7" />
              <text x="266" y="85" textAnchor="middle" className="fill-white text-xs font-bold">Elaboration</text>
              <text x="266" y="100" textAnchor="middle" className="fill-white text-[10px]">2 mnd</text>

              <rect x="379" y="60" width="282" height="40" fill="#22c55e" fillOpacity="0.7" />
              <text x="520" y="85" textAnchor="middle" className="fill-white text-xs font-bold">Construction</text>
              <text x="520" y="100" textAnchor="middle" className="fill-white text-[10px]">2,5 mnd · 5 sprinter á 2 uker</text>

              <rect x="661" y="60" width="56"  height="40" fill="#f97316" fillOpacity="0.7" />
              <text x="689" y="85" textAnchor="middle" className="fill-white text-[10px] font-bold">Trans.</text>
              <text x="689" y="100" textAnchor="middle" className="fill-white text-[9px]">0,5 mnd</text>

              {/* Sprinter i Construction */}
              {[0, 1, 2, 3, 4].map((s) => (
                <g key={s}>
                  <rect
                    x={379 + s * 56.4}
                    y={120}
                    width={52}
                    height={20}
                    fill="#16a34a"
                    fillOpacity={0.5}
                    stroke="#16a34a"
                  />
                  <text
                    x={405 + s * 56.4}
                    y={134}
                    textAnchor="middle"
                    className="fill-white text-[10px] font-bold"
                  >
                    S{s + 1}
                  </text>
                </g>
              ))}

              {/* Milepæler */}
              <g>
                <circle cx="153" cy="50" r="6" fill="#3b82f6" />
                <text x="153" y="40" textAnchor="middle" className="fill-current text-[10px] font-bold">LOM</text>
              </g>
              <g>
                <circle cx="379" cy="50" r="6" fill="#a855f7" />
                <text x="379" y="40" textAnchor="middle" className="fill-current text-[10px] font-bold">LAM</text>
              </g>
              <g>
                <circle cx="661" cy="50" r="6" fill="#22c55e" />
                <text x="661" y="40" textAnchor="middle" className="fill-current text-[10px] font-bold">IOC</text>
              </g>
              <g>
                <circle cx="717" cy="50" r="6" fill="#f97316" />
                <text x="717" y="40" textAnchor="middle" className="fill-current text-[10px] font-bold">PRM</text>
              </g>

              {/* Forklaring */}
              <text x="40" y="20" className="fill-current text-xs font-bold">
                AUP-faser (øverst) + Scrum-sprinter i Construction (under)
              </text>
              <text x="40" y="160" className="fill-current text-[10px]">
                LOM = Lifecycle Objective · LAM = Lifecycle Architecture · IOC = Initial Operational Capability · PRM = Product Release
              </text>
            </svg>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Praktisk konsekvens for prosjektstyring</p>
            <p className="text-sm">
              Som prosjektleder kan du si til styringsgruppen &ldquo;vi er midt i Construction, sprint
              3 av 5, alle milepælskriterier ser ut til å bli oppfylt&rdquo;. Som scrum master sier
              du til teamet &ldquo;vi har 8 user stories i sprinten, dagens standup er 09:30&rdquo;.
              Begge utsagn er sanne samtidig.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  12 AGILE PRAKSISER I AUP                                   */}
      {/* ============================================================ */}
      <section id="agile-praksiser" className="scroll-mt-32">
        <TheorySummary
          title="12 Agile praksiser i AUP (fra F15)"
          mustKnow={[
            "AUP henter de fleste praksisene direkte fra XP",
            "Praksisene støtter målet om å flate ut kostnadskurven",
            "Hver praksis er rimelig alene, men kraftig når de kombineres",
          ]}
        >
          <p>
            AUP arver mye fra XP (Extreme Programming). Atle ramser opp 12 praksiser i F15 som
            kjernen av det smidige tankesettet AUP bygger på. De er alle <em>billige</em> tiltak
            som tilsammen flater ut kostnadskurven for endringer.
          </p>

          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">1. Planleggingsspillet</p>
              <p className="text-sm mt-1">
                Kunde og utviklere planlegger sammen — kunden bestemmer prioritet, utviklere
                bestemmer tidsestimat. Ingen part overstyrer den andre.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">2. Korte leveranser</p>
              <p className="text-sm mt-1">
                Lever fungerende programvare hyppig (uker, ikke måneder). Reduserer risiko og gir
                rask tilbakemelding.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">3. Metaforer</p>
              <p className="text-sm mt-1">
                Bruk felles språkbilder som beskriver systemet (&ldquo;handlevogn&rdquo;,
                &ldquo;bibliotek&rdquo;). Gjør at kunde og utviklere forstår hverandre.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">4. Enkel utforming</p>
              <p className="text-sm mt-1">
                Den enkleste løsningen som fungerer akkurat nå — ikke spekulér i fremtidige
                behov. YAGNI: &ldquo;You Ain&apos;t Gonna Need It&rdquo;.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">5. Testing</p>
              <p className="text-sm mt-1">
                Automatiserte tester på alle nivåer — enhets-, integrasjons-, system-,
                aksept-tester. Gjør refaktorering trygt.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">6. Ombygging (refaktorering)</p>
              <p className="text-sm mt-1">
                Kontinuerlig forbedring av kodestruktur uten å endre oppførsel. Holder
                kodebasen ren og fleksibel.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">7. Pair programming</p>
              <p className="text-sm mt-1">
                To utviklere ved samme tastatur. Bedre kvalitet, kunnskapsdeling, færre feil.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">8. Kollektivt eierskap</p>
              <p className="text-sm mt-1">
                Alle eier all koden. Hvem som helst kan endre hva som helst — ingen
                &ldquo;kongedømmer&rdquo;.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">9. Kontinuerlig integrering</p>
              <p className="text-sm mt-1">
                Kode integreres i hovedlinjen flere ganger om dagen — ikke ukesvis med &ldquo;merge
                hell&rdquo;. CI-server bygger og tester ved hver push.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">10. 40-timers arbeidsuke</p>
              <p className="text-sm mt-1">
                Bærekraftig tempo. Trette utviklere lager flere feil enn de fikser. Overtid
                som regel = mistet produktivitet, ikke vunnet.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">11. On-site kunde</p>
              <p className="text-sm mt-1">
                Kunderepresentant tilgjengelig hele tiden — &ldquo;hvor er kunden når vi har
                spørsmål?&rdquo; Kort feedback-loop.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">12. Kodestandarder</p>
              <p className="text-sm mt-1">
                Felles regler for navngiving, formatering, struktur. Gjør at kollektivt eierskap
                fungerer i praksis — koden ser lik ut uavhengig av forfatter.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er praksisene viktige i AUP?</p>
            <p className="text-sm">
              Hver praksis alene er bare en god vane. Men sammen lager de et system som{" "}
              <strong>tåler endringer</strong>: testing fanger feil, refaktorering holder koden
              ren, kontinuerlig integrasjon hindrer divergens, pair programming + kollektivt
              eierskap gjør at &ldquo;buss-faktoren&rdquo; ikke knekker prosjektet. Dette er
              motoren som gjør at AUP klarer å levere fungerende programvare i hver iterasjon —
              og dermed flate ut den fryktede kostnadskurven for endringer.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  RISIKOHÅNDTERING I DYBDEN (F09)                            */}
      {/* ============================================================ */}
      <section id="risikohandtering-dybde" className="scroll-mt-32">
        <TheorySummary
          title="Risikohåndtering i dybden — Inception og videre"
          defaultOpen={false}
          mustKnow={[
            "Risiko = sannsynlighet × konsekvens — alltid begge faktorer",
            "Risikoer angripes TIDLIG og KONTINUERLIG — ikke når de detoneres",
            "Risikoliste oppdateres gjennom hele prosjektet, ikke bare i Inception",
            "Kategorier: mennesker, planer, tredjepart, krav, arkitektur, kompetanse",
            "&laquo;If you don't actively attack the risks, they will actively attack you&raquo;",
          ]}
        >
          <p>
            Atle bruker en hel forelesning (F09) på risikohåndtering fordi det er{" "}
            <strong>kjernen i hvorfor Inception og Elaboration eksisterer</strong>. Hele poenget med
            å bruke tid før Construction er å oppdage og avskaffe risikoer mens de er billige å
            håndtere. Ordet <em>risiko</em> kommer fra italiensk <em>risicare</em> — &laquo;å utsette seg
            for fare&raquo;. I programvareutvikling betyr det: muligheten for å feile på en oppgave.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvorfor risikohåndtering er så viktig i AUP</h3>
          <p className="text-sm">
            I utviklingsprosjekt må vi ofte gjøre ting som <strong>ikke har vært gjort før</strong> —
            enten av oss eller noen andre. Det skaper usikkerhet. Noen risikoer er
            &laquo;showstoppers&raquo; (prosjektet dør hvis de slår til), andre forsinker prosessen.
            AUP-filosofien: angrip dem aktivt, eller de angriper deg.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Den overordnede risikohåndteringsprosessen</h3>
          <ol className="list-decimal list-inside text-sm space-y-1 my-3">
            <li><strong>Identifiser</strong> risikoer — &laquo;hva kan gå galt?&raquo; (brainstorming, sjekklister, erfaringer)</li>
            <li><strong>Analyser</strong> risikoene — sannsynlighet og konsekvens for hver</li>
            <li><strong>Prioriter</strong> risikoene — score fra sannsynlighet × konsekvens</li>
            <li><strong>Kontroller</strong> risikoene — planlegg mottiltak, finn løsninger, monitorer</li>
          </ol>

          <h3 className="text-lg font-bold mt-6 mb-3">Vanlige risikofaktorer (Atles liste)</h3>
          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Mennesker</strong>: nøkkelutvikler
              slutter, sykdom, dårlig samarbeid, lave ferdigheter — den vanligste typen risiko.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Urealistisk plan</strong>: for
              ambisiøst omfang, for korte tidsfrister, undervurdering av kompleksitet.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Tredjeparts programvare</strong>:
              biblioteker som ikke fungerer som dokumentert, breaking changes, manglende støtte.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Misforståtte krav</strong>:
              kunden mente noe annet enn det vi forsto. Demper med jevnlig demo og On-site customer.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Feil arkitektur</strong>:
              arkitekturen tåler ikke produksjonslast, sikkerhetshull, dårlig skalering. Demper med PoC.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Overvurderte ferdigheter</strong>:
              teamet trodde de kunne mer enn de faktisk kunne. Demper med pair programming og prototyper.
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Risikomatrise — slik prioriterer Atle</h3>
          <p className="text-sm mb-3">
            Hver risiko plottes i et 3×3-rutenett. Score fra 1 (lav) til 5 (svært høy). Risikoer
            i øvre høyre hjørne er de farligste — angrip dem først.
          </p>

          <div className="overflow-x-auto my-4">
            <svg viewBox="0 0 480 360" className="w-full max-w-xl mx-auto" role="img" aria-label="Risikomatrise 3×3">
              <text x="240" y="20" textAnchor="middle" className="fill-current text-sm font-bold">
                Risikomatrise — Sannsynlighet × Konsekvens
              </text>

              {/* Y-akse label */}
              <text x="20" y="180" textAnchor="middle" className="fill-current text-xs font-bold" transform="rotate(-90 20 180)">
                Sannsynlighet →
              </text>

              {/* X-akse label */}
              <text x="280" y="350" textAnchor="middle" className="fill-current text-xs font-bold">
                Konsekvens →
              </text>

              {/* Cells: 3 rows × 3 cols. Row 0 = Stor, Row 2 = Liten */}
              {[
                { r: 0, label: "Stor" },
                { r: 1, label: "Middels" },
                { r: 2, label: "Liten" },
              ].map((row) => (
                <text key={row.r} x={75} y={90 + row.r * 70} textAnchor="end" className="fill-current text-xs font-semibold">
                  {row.label}
                </text>
              ))}
              {[
                { c: 0, label: "Lite" },
                { c: 1, label: "Middels" },
                { c: 2, label: "Stor" },
              ].map((col) => (
                <text key={col.c} x={130 + col.c * 100} y={325} textAnchor="middle" className="fill-current text-xs font-semibold">
                  {col.label}
                </text>
              ))}

              {/* Cells with color coding */}
              {[
                { r: 0, c: 0, score: "Middels 2", color: "#facc15" },
                { r: 0, c: 1, score: "Høy 3", color: "#fb923c" },
                { r: 0, c: 2, score: "Svært høy 5", color: "#ef4444" },
                { r: 1, c: 0, score: "Lav 1", color: "#86efac" },
                { r: 1, c: 1, score: "Middels 2", color: "#facc15" },
                { r: 1, c: 2, score: "Høy 3", color: "#fb923c" },
                { r: 2, c: 0, score: "Lav 1", color: "#86efac" },
                { r: 2, c: 1, score: "Lav 1", color: "#86efac" },
                { r: 2, c: 2, score: "Middels 2", color: "#facc15" },
              ].map((cell) => (
                <g key={`${cell.r}-${cell.c}`}>
                  <rect
                    x={80 + cell.c * 100}
                    y={60 + cell.r * 70}
                    width={100}
                    height={70}
                    fill={cell.color}
                    fillOpacity="0.6"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  />
                  <text
                    x={130 + cell.c * 100}
                    y={100 + cell.r * 70}
                    textAnchor="middle"
                    className="fill-current text-[11px] font-bold"
                  >
                    {cell.score}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Risikolisten — fast format</h3>
          <p className="text-sm mb-3">
            Atle anbefaler en enkel tabell med fem kolonner. Holdes oppdatert sprint for sprint.
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-[var(--card-border)]">
              <thead className="bg-neutral-100 dark:bg-neutral-900">
                <tr>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Beskrivelse</th>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Sannsynlighet</th>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Konsekvens</th>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Tiltak</th>
                  <th className="text-left p-2 border-b border-[var(--card-border)]">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="p-2">Bookingsystem-API er ustabilt</td>
                  <td className="p-2">Stor</td>
                  <td className="p-2">Stor</td>
                  <td className="p-2">PoC i Elaboration, fallback-løsning planlagt</td>
                  <td className="p-2 text-amber-600">Aktiv</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="p-2">Designer slutter etter sprint 2</td>
                  <td className="p-2">Middels</td>
                  <td className="p-2">Middels</td>
                  <td className="p-2">Designsystem dokumentert, andre team kan ta over</td>
                  <td className="p-2 text-green-600">Avhjulpet</td>
                </tr>
                <tr>
                  <td className="p-2">Krav om GDPR oversett</td>
                  <td className="p-2">Liten</td>
                  <td className="p-2">Stor</td>
                  <td className="p-2">Sjekkliste i sprint review, jurist konsultert</td>
                  <td className="p-2 text-green-600">Lukket</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hvor passer dette inn i AUP-fasene?</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Inception</strong>: opprett risikoliste, kategoriser, første prioritering. Tunge risikoer styrer hva Elaboration skal angripe.</li>
              <li><strong>Elaboration</strong>: angriper de største tekniske risikoene gjennom PoC og arkitekturprototype.</li>
              <li><strong>Construction</strong>: oppdater risikoliste hver sprint, ny risiko legges til, lukkede fjernes.</li>
              <li><strong>Transition</strong>: fokus på drift- og sikkerhetsrisikoer (lisens, support, ytelse i produksjon).</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  ARKITEKTUR I AUP (F10)                                      */}
      {/* ============================================================ */}
      <section id="arkitektur-i-aup" className="scroll-mt-32">
        <TheorySummary
          title="Arkitektur i AUP — fra Elaboration til kjørbart system (F10)"
          defaultOpen={false}
          mustKnow={[
            "Arkitektur = de strukturelle valgene som er DYRE å endre senere",
            "Software Architecture Document (SAD) — sentralt arkitekturdokument",
            "Arkitekten er knutepunktet mellom prosjektledelse, utviklere og interessenter",
            "5 visninger på arkitekturen: brukstilfelle, logisk, prosess, implementasjon, utrulling",
            "Arkitekturen MÅ valideres med en kjørbar prototype — ikke bare bokser på tavlen",
          ]}
        >
          <p>
            Arkitekturarbeidet i AUP konsentreres i Elaboration, men har konsekvenser gjennom hele
            livssyklusen. Atle definerer arkitektur som <em>valgene rundt organiseringen av
            systemet</em> — strukturelle elementer (pakker, klasser, grensesnitt), hvordan de
            samarbeider, hvordan grupper settes sammen til delsystem, og hvilken{" "}
            <strong>arkitektonisk stil</strong> systemet bygger på (lagdelt, mikroservices, hexagonal
            osv.).
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Hva omfatter arkitektur?</h3>
          <ul className="list-disc list-inside text-sm space-y-1 my-3">
            <li><strong>Bruk</strong> av systemet — hvordan brukerne interagerer</li>
            <li><strong>Funksjonalitet</strong> — hvilke kapabiliteter</li>
            <li><strong>Ytelse</strong> — responstid, gjennomstrømning</li>
            <li><strong>Smidighet</strong> — hvor lett er det å endre?</li>
            <li><strong>Gjenbruk</strong> — eksisterende komponenter utnyttes</li>
            <li><strong>Forståelse</strong> — kan nye utviklere sette seg inn?</li>
            <li><strong>Økonomiske og teknologiske vurderinger</strong></li>
            <li><strong>Estetiske hensyn</strong> — ja, også her</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">De 5 visningene på arkitekturen</h3>
          <p className="text-sm mb-3">
            Arkitektur er kompleks og må sees fra flere vinkler. Atle bruker disse fem visningene
            (basert på Kruchten 4+1):
          </p>

          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400">1. Brukstilfelle-visning</p>
              <p className="text-sm mt-1">
                Binder bruken av systemet (kravene) sammen med hvordan ting er løst. Tar utgangspunkt
                i et sentralt brukstilfelle og viser hvordan det realiseres gjennom alle lag.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400">2. Logisk visning</p>
              <p className="text-sm mt-1">
                Den logiske oppbyggingen — lagdeling, pakker, klasser, designmønster. Dette er
                klasse- og pakkediagrammer.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">3. Prosess-visning</p>
              <p className="text-sm mt-1">
                Parallellitet, synkronisering, tråder, asynkron kommunikasjon. Viktig for systemer
                med høy last eller sanntidskrav.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400">4. Implementasjons-visning</p>
              <p className="text-sm mt-1">
                Hvordan kildekoden er organisert i utviklingsmiljøet. Mappestruktur, byggskript,
                modulgrenser. Nyttig for vedlikehold og videreutvikling.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50 dark:bg-rose-950/20 p-4 md:col-span-2">
              <p className="font-bold text-rose-700 dark:text-rose-400">5. Utrullings-visning (Deployment)</p>
              <p className="text-sm mt-1">
                Den fysiske utrullingen — hvilke noder kjører hvilke komponenter, hvilke nettverk
                snakker de over, hvor ligger databasene. Avgjørende for drift.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Software Architecture Document (SAD)</h3>
          <p className="text-sm">
            SAD er det sentrale arkitekturdokumentet i AUP. Det beskriver hvilke løsninger man har
            valgt for de arkitektonisk sentrale kravene — men det er <strong>kun et dokument</strong>.
            Like viktig er at valg og retningslinjer omsettes til en <em>kjørbar
            arkitekturprototype</em>, og at dokumentet til enhver tid er i samsvar med det realiserte
            systemet.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Når lages SAD?</p>
            <p className="text-sm">
              Skissér tidlig i prosjektet — hvordan ting <em>skal</em> løses. Men <strong>full
              ferdigstilling kan vente til litt senere</strong> for å unngå at man holder mange
              artefakter i sync uten gevinst. Pragmatisk: skisseversjon fra Inception, første
              komplette versjon ved slutten av Elaboration, oppdateres gjennom Construction.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Arkitekt-rollen</h3>
          <p className="text-sm mb-3">
            Arkitekten leder og koordinerer tekniske aktiviteter og artefakter. Mens andre roller
            har spesifikt ansvar, har arkitekten <strong>stor bredde</strong> og deltar i mange
            aktiviteter.
          </p>

          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Erfaring</strong> — både i
              problemdomenet og løsningsdomenet. Sterk teknisk kompetanse er en forutsetning.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Lederegenskaper</strong> —
              utgjør lederteamet sammen med prosjektlederen, ansvar for tekniske problemstillinger.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Kommunikasjon</strong> — for å
              få tillit, overtale, motivere, rettlede. Avhengig av naturlig respekt.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Målrettet og resultatorientert</strong>{" "}
              — den drivende kraften teknisk. Må ofte ta sub-optimale valg for å komme videre.
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Arkitektens aktiviteter gjennom faser</h3>
          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">I oppstarten (Inception)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Få opp kandidatarkitektur(er)</li>
                <li>Eventuelt små prototyper for å teste ut ting</li>
                <li>Identifisere arkitektonisk sentrale krav</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">I forkant av utviklingen (Elaboration)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Forfatte arkitektur-dokumentet (SAD)</li>
                <li>Komme opp med gode løsninger på alle problemstillinger</li>
                <li>Sørge for at arkitekturen valideres gjennom kjørbar prototype</li>
                <li>Prioritere brukstilfeller basert på risiko</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">Under utviklingen (Construction)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Holde et øye med og rettlede implementasjonen</li>
                <li>Justere og forfine arkitekturen basert på erfaringer</li>
                <li>Identifisere design-mekanismer og design-elementer</li>
                <li>Strukturere implementasjonsmodellen (kildekodens organisering)</li>
                <li>Utvikle og håndheve retningslinjer for design og programmering</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Eksempel: Pensjonsprosjektet i NAV</p>
            <p className="text-sm">
              Atle nevner pensjonsprosjektet som Norges største utviklingsprosjekt. De brukte{" "}
              <strong>wiki (Confluence) for arkitekturdokumentasjon</strong>, hadde formelle kurs for
              opplæring av nye, og fulgte opp at arkitekturen ble fulgt gjennom både{" "}
              <em>manuelle reviews</em>, <em>automatiserte sjekker</em> og <em>automatisert
              testing</em>. Modellen er at arkitektur uten håndhevelse blir bare ord på papir.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  SCRUM-ARTEFAKTER I AUP-BYGGEFASE (F11)                     */}
      {/* ============================================================ */}
      <section id="scrum-artefakter-i-aup" className="scroll-mt-32">
        <TheorySummary
          title="Scrum-artefakter i AUP-byggefase (F11)"
          defaultOpen={false}
          mustKnow={[
            "Product backlog: alle oppgaver — prioritert rekkefølge — User Stories / Use Cases",
            "Sprint backlog: oppgavene for kommende sprint — alle skal være SMÅ",
            "Inkrement: det som er gjort i sprinten — verdi som er skapt",
            "Burndown: brukt tid mot estimat (ikke virkelig tid)",
            "Scrum-tavle: To do → Doing → Done — fysisk eller digitalt",
          ]}
        >
          <p>
            I AUPs byggefase er Scrum den valgte operasjonsmodellen. Atle (F11) understreker at
            Scrum-artefaktene <strong>brukes i hele prosessen</strong> — ikke bare i et enkelt
            møte. La oss gå gjennom de fire kjerne-artefaktene og hvordan de spiller sammen med
            AUP-disiplinene.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">1. Product Backlog</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm mb-2">
              <strong>Alle oppgavene</strong> i produktet, i <strong>prioritert rekkefølge</strong>.
              Funksjoner formuleres ofte som <em>User Stories</em> eller <em>Use Cases</em>.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Eies av Produkteier — han bestemmer prioritet</li>
              <li>Kan inneholde funksjonelle krav, ikke-funksjonelle krav, feilrettinger, teknisk gjeld</li>
              <li>Lever — endres når kunnskap øker, krav endres, ny innsikt kommer</li>
              <li>I AUP-perspektiv: backloggen er output fra Modellering-disiplinen</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">2. Sprint Backlog</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm mb-2">
              <strong>Alle oppgavene</strong> som teamet har forpliktet seg til i kommende sprint.
              Oppgavene skal være <strong>små</strong> — typisk 1-8 timers arbeid hver.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Eies av utviklerteamet — de bestemmer hva de kan klare</li>
              <li>Tas fra toppen av Product Backlog</li>
              <li>Brytes ned i konkrete tekniske oppgaver under Sprint Planning</li>
              <li>Endres normalt ikke under sprinten</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">3. Inkrement</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm mb-2">
              <strong>Det som er gjort</strong> — verdien som er skapt i sprinten. En potensielt
              utrullbar versjon av produktet.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Demonstreres for produkteier i Sprint Review</li>
              <li>Skal følge &laquo;Definition of Done&raquo;</li>
              <li>I AUP-perspektiv: dette er output fra Implementering + Testing-disiplinene</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">4. Burndown Chart</h3>
          <p className="text-sm mb-3">
            Viser <strong>brukt tid mot estimat</strong> — ikke mot virkelig tid. Når en oppgave
            flyttes til Done, trekkes <em>de estimerte timene</em> fra grafen, uavhengig av hvor
            mye tid som faktisk gikk med.
          </p>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-3">
            <p className="text-sm font-semibold mb-2">Atles eksempel — DAT109-prosjektet</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>10 studiepoeng = 13 timer/uke per student</li>
              <li>Minus forelesning (3 t) + essay (1 t) + møter (1 t) = <strong>8 timer reell utvikling</strong></li>
              <li>Et team på 6 personer kan planlegge oppgaver tilsvarende <strong>48 timer/uke</strong></li>
              <li>Hvis estimat var 2 t men faktisk gikk 1 t: trekk <strong>2 t</strong> fra grafen (vi måler estimat)</li>
              <li>Hvis estimat var 1 t men faktisk gikk 2 t: trekk <strong>1 t</strong> fra grafen</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Scrum-tavla — flyt gjennom kolonner</h3>
          <div className="overflow-x-auto my-4">
            <svg viewBox="0 0 720 280" className="w-full max-w-3xl mx-auto" role="img" aria-label="Scrum-tavle">
              <text x="360" y="22" textAnchor="middle" className="fill-current text-sm font-bold">
                Scrum-tavle: flyten av oppgaver
              </text>

              {/* Product backlog */}
              <rect x="20" y="50" width="140" height="200" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" />
              <text x="90" y="72" textAnchor="middle" className="fill-current text-xs font-bold">Product Backlog</text>
              <text x="90" y="88" textAnchor="middle" className="fill-current text-[10px]">(ikke alltid på tavlen)</text>
              {[0, 1, 2, 3, 4].map((i) => (
                <rect key={i} x={30} y={100 + i * 28} width={120} height={20} fill="#a855f7" fillOpacity={0.4} />
              ))}

              {/* Sprint backlog: To do */}
              <rect x="180" y="50" width="160" height="200" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" />
              <text x="260" y="72" textAnchor="middle" className="fill-current text-xs font-bold">To do</text>
              <text x="260" y="88" textAnchor="middle" className="fill-current text-[10px]">(Sprint backlog)</text>
              {[0, 1, 2].map((i) => (
                <rect key={i} x={195} y={100 + i * 28} width={130} height={20} fill="#3b82f6" fillOpacity={0.4} />
              ))}

              {/* Doing */}
              <rect x="360" y="50" width="160" height="200" fill="#facc15" fillOpacity="0.15" stroke="#eab308" />
              <text x="440" y="72" textAnchor="middle" className="fill-current text-xs font-bold">Doing</text>
              {[0, 1].map((i) => (
                <rect key={i} x={375} y={100 + i * 28} width={130} height={20} fill="#eab308" fillOpacity={0.5} />
              ))}

              {/* Done */}
              <rect x="540" y="50" width="160" height="200" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" />
              <text x="620" y="72" textAnchor="middle" className="fill-current text-xs font-bold">Done</text>
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={555} y={100 + i * 28} width={130} height={20} fill="#22c55e" fillOpacity={0.5} />
              ))}

              {/* Arrows */}
              <text x="170" y="160" textAnchor="middle" className="fill-current text-lg">→</text>
              <text x="350" y="160" textAnchor="middle" className="fill-current text-lg">→</text>
              <text x="530" y="160" textAnchor="middle" className="fill-current text-lg">→</text>

              <text x="360" y="272" textAnchor="middle" className="fill-current text-[10px]">
                Oppgaver flytter seg til høyre. Når alle er i Done, er sprinten ferdig.
              </text>
            </svg>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Sprint-prosessen</h3>
          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">1. Sprint Planning</strong>: hva
              tar vi inn fra Product Backlog? Estimering, breakdown.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">2. Daily Scrum</strong>: hver
              dag, 15 min, &laquo;hva gjorde jeg, hva gjør jeg, har jeg hindringer?&raquo;
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">3. Utføring</strong>: koding,
              testing, samarbeid. Tavla oppdateres kontinuerlig.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">4. Sprint Review</strong>:
              demo for produkteier, inkrementet vurderes — er det verdi?
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm md:col-span-2">
              <strong className="text-sysdev-600 dark:text-sysdev-400">5. Sprint Retrospective</strong>:
              hvordan gikk det? Hva fungerte? Hva kan vi gjøre annerledes? Konkrete tiltak til neste
              sprint.
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Atles regler for kodeversjonering (F11)</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Velg et system som passer prosjektet (Git for de fleste)</li>
              <li>Hold koden i versjonskontroll, men <strong>ikke genererte filer</strong></li>
              <li>Forsikre deg om at filene du jobber på er <strong>siste versjon</strong></li>
              <li>Ikke sjekk ut mer enn det du arbeider med</li>
              <li><strong>Sjekk inn så fort som mulig</strong>, men ikke før koden kompilerer og testene er OK</li>
              <li>Inspiser endringene før innsjekking — bruk <code>git diff</code></li>
              <li><strong>Sjekk inn ofte</strong> — hver innsjekking gir en mulighet for tilbakerulling</li>
              <li>Lag gode kommentarer, gjerne med referanse til oppgave-nummer</li>
              <li>Utviklere skal kun sjekke inn <strong>sine egne</strong> endringer</li>
              <li>Bruk <code>.gitignore</code> for filer som ikke skal sjekkes inn</li>
              <li>Forsikre deg om at <strong>alle avhengigheter</strong> er med</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  AGILE MANIFESTET — VERDIER OG PRINSIPPER (F15)            */}
      {/* ============================================================ */}
      <section id="agile-manifest" className="scroll-mt-32">
        <TheorySummary
          title="Agile-manifestet — verdier og 12 prinsipper (F15)"
          defaultOpen={false}
          mustKnow={[
            "4 verdier — venstresiden er viktigere enn høyresiden, men begge teller",
            "12 prinsipper utdyper verdiene konkret",
            "Manifestet kom i 2001 etter en lang utvikling: Spiralmodell (1988) → Scrum (1993) → XP (1999) → AUP (1999)",
            "AUP er bygget direkte på disse verdiene og prinsippene",
          ]}
        >
          <p>
            AUP er smidig fordi den bygger på <strong>Manifestet for smidig
            programvareutvikling</strong> (2001). Manifestet er foundation-en — Scrum, XP, AUP og
            DA er <em>operasjonaliseringer</em> av det samme tankesettet. Atle dedikerer hele F15 til
            å forankre AUP i manifestet.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De 4 verdiene</h3>
          <p className="text-sm mb-3">
            Skrives som &laquo;X <strong>fremfor</strong> Y&raquo;. Begge sider har verdi, men venstresiden
            har <em>mer</em> verdi.
          </p>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">
                1. Personer og samspill <em>fremfor</em> prosesser og verktøy
              </p>
              <p className="text-sm mt-1">
                Mennesker bygger programvare, ikke prosesser. Et godt team med dårlige verktøy slår
                et dårlig team med beste verktøy.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">
                2. Programvare som virker <em>fremfor</em> omfattende dokumentasjon
              </p>
              <p className="text-sm mt-1">
                Dokumentasjon er bra, men det er ikke målet. Målet er fungerende programvare — det er
                det kunden betaler for.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">
                3. Samarbeid med kunden <em>fremfor</em> kontraktsforhandlinger
              </p>
              <p className="text-sm mt-1">
                Kontrakter er nødvendige, men kan ikke erstatte dialog. Når noe går galt, løser
                samarbeid — ikke jus.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">
                4. Å reagere på endringer <em>fremfor</em> å følge en plan
              </p>
              <p className="text-sm mt-1">
                Planer er nyttige, men virkeligheten endrer seg. Smidighet betyr å tilpasse planen
                når ny informasjon kommer.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 12 prinsippene</h3>

          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">1. Tilfredsstill kunden</strong>{" "}
              gjennom tidlige og kontinuerlige leveranser av programvare som har verdi.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">2. Velkommen endringer</strong>{" "}
              i krav, selv sent i utviklingen — bruk dem til konkurransefortrinn.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">3. Lever fungerende programvare hyppig</strong>{" "}
              — uker, ikke måneder. Jo oftere, desto bedre.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">4. Forretning og utviklere</strong>{" "}
              må arbeide sammen daglig gjennom hele prosjektet.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">5. Bygg rundt motiverte personer</strong>{" "}
              — gi miljø og støtte, stol på at de får jobben gjort.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">6. Snakk ansikt til ansikt</strong>{" "}
              — den mest effektive måten å formidle informasjon innad i et team.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">7. Fungerende programvare</strong>{" "}
              er det primære målet på fremdrift — ikke linjer kode eller antall sider dokumentasjon.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">8. Bærekraftig tempo</strong>{" "}
              — sponsorer, utviklere og brukere bør kunne opprettholde et jevnt tempo hele tiden.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">9. Teknisk kvalitet</strong>{" "}
              og godt design fremmer smidighet — dårlig kode bremser endringer.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">10. Enkelhet</strong>{" "}
              — kunsten å maksimere mengden arbeid som ikke blir gjort — er essensielt.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">11. Selvstyrte team</strong>{" "}
              produserer de beste arkitekturer, krav og design.
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">12. Reflekter regelmessig</strong>{" "}
              — teamet justerer adferden sin for å bli mer effektivt.
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Tidslinjen — fra spiralmodell til AUP</h3>
          <div className="overflow-x-auto my-6">
            <svg viewBox="0 0 760 200" className="w-full max-w-3xl mx-auto" role="img" aria-label="Smidige metoder gjennom tiden">
              <line x1="40" y1="120" x2="720" y2="120" stroke="currentColor" strokeWidth="1.5" />

              {[
                { year: "1988", label: "Spiralmodell", x: 80 },
                { year: "1991", label: "RAD", x: 160 },
                { year: "1993", label: "Scrum", x: 250 },
                { year: "1994", label: "DSDM", x: 320 },
                { year: "1999", label: "XP / FDD", x: 420 },
                { year: "1999", label: "RUP / AUP", x: 510 },
                { year: "2001", label: "Manifestet", x: 600 },
                { year: "2003", label: "Lean", x: 680 },
              ].map((item) => (
                <g key={`${item.year}-${item.label}`}>
                  <circle cx={item.x} cy={120} r="6" fill="#a855f7" />
                  <line x1={item.x} y1={114} x2={item.x} y2={70} stroke="currentColor" strokeOpacity={0.4} />
                  <text x={item.x} y={62} textAnchor="middle" className="fill-current text-[11px] font-bold">
                    {item.label}
                  </text>
                  <text x={item.x} y={145} textAnchor="middle" className="fill-current text-[10px]">
                    {item.year}
                  </text>
                </g>
              ))}

              <text x="380" y="180" textAnchor="middle" className="fill-current text-xs font-bold">
                AUP står på skuldrene av manifestet og alle metodene som kom før det
              </text>
            </svg>
          </div>

          <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
            <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
              Hvordan AUP konkret operasjonaliserer manifestet
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Verdi 1 (personer) → AUP fremmer pair programming, on-site customer, daily Scrum</li>
              <li>Verdi 2 (fungerende programvare) → AUP gir <em>kjørbare leveranser</em> hver iterasjon</li>
              <li>Verdi 3 (samarbeid) → Active Stakeholder Participation gjennom hele prosjektet</li>
              <li>Verdi 4 (endringer) → Korte sprinter, prioritert backlog, jevnlig demo</li>
              <li>Prinsipp 9 (teknisk kvalitet) → TDD, refaktorering, kodestandarder</li>
              <li>Prinsipp 10 (enkelhet) → KISS, YAGNI, &laquo;den enkleste løsningen som fungerer akkurat nå&raquo;</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  TESTNIVÅER I AUP (F15)                                      */}
      {/* ============================================================ */}
      <section id="testnivaer-i-aup" className="scroll-mt-32">
        <TheorySummary
          title="Testnivåer i AUP — fra enhet til akseptanse (F15)"
          defaultOpen={false}
          mustKnow={[
            "Testing er en disiplin som pågår GJENNOM HELE livssyklusen — ikke bare i Transition",
            "Fire hovednivåer: enhet, integrasjon, system, akseptanse",
            "Hvit boks (kjenner koden) vs svart boks (kjenner ikke koden)",
            "Jo tidligere en feil finnes, desto billigere er den å fikse",
            "Testbarhet er en arkitekturegenskap — designprinsipper (GRASP, SOLID) gir testbar kode",
          ]}
        >
          <p>
            Testing er en av AUPs syv disipliner, og Atle (F15) understreker at den er aktiv{" "}
            <strong>gjennom alle fire faser</strong> — ikke bare i Transition. Forskjellen er hva
            som testes når. Målet med testing er enkelt: <em>finne feil i programmet</em>. En feil
            betyr at programmet ikke gjør det som kreves av det.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Strukturen på en test</h3>
          <p className="text-sm mb-3">En test består vanligvis av tre deler:</p>
          <ol className="list-decimal list-inside text-sm space-y-1 my-3">
            <li><strong>Forventet resultat</strong> — hva skal vi få?</li>
            <li><strong>Hva vi skal teste</strong> — testkode eller beskrivelse av hva vi gjør</li>
            <li><strong>Resultat</strong> — det faktiske resultatet, som sammenlignes med forventet</li>
          </ol>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvit boks vs svart boks</h3>
          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400">Hvit boks</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Tester <strong>kjenner</strong> koden</li>
                <li>Prøver å teste mest mulig av <em>kodestiene</em></li>
                <li><strong>Kodedekning</strong> er viktig metrikk</li>
                <li>Brukes på enhets- og integrasjonsnivå</li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400">Svart boks</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Tester <strong>kjenner ikke</strong> koden</li>
                <li>Sender input, sjekker output</li>
                <li>Brukes på system- og akseptansenivå</li>
                <li>Tar utgangspunkt i kravspesifikasjonen</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De fire testnivåene</h3>

          <div className="overflow-x-auto my-6">
            <svg viewBox="0 0 480 360" className="w-full max-w-md mx-auto" role="img" aria-label="Testpyramide">
              <text x="240" y="22" textAnchor="middle" className="fill-current text-sm font-bold">
                Testpyramiden — fra mange små til få store
              </text>

              {/* Akseptanse — toppen */}
              <polygon points="200,55 280,55 290,105 190,105" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" />
              <text x="240" y="85" textAnchor="middle" className="fill-white text-xs font-bold">Akseptanse</text>

              {/* System */}
              <polygon points="170,105 310,105 320,165 160,165" fill="#fb923c" fillOpacity="0.6" stroke="#fb923c" />
              <text x="240" y="140" textAnchor="middle" className="fill-white text-xs font-bold">System</text>

              {/* Integrasjon */}
              <polygon points="135,165 345,165 360,235 120,235" fill="#facc15" fillOpacity="0.6" stroke="#eab308" />
              <text x="240" y="205" textAnchor="middle" className="fill-current text-xs font-bold">Integrasjon</text>

              {/* Enhet */}
              <polygon points="90,235 390,235 410,310 70,310" fill="#22c55e" fillOpacity="0.6" stroke="#22c55e" />
              <text x="240" y="280" textAnchor="middle" className="fill-white text-sm font-bold">Enhet</text>

              <text x="240" y="345" textAnchor="middle" className="fill-current text-[10px]">
                Mange enhetstester (rask) → få akseptansetester (treig, viktig)
              </text>
            </svg>
          </div>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">Enhetstest</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Tester en <strong>isolert enhet</strong> i systemet (typisk en metode/klasse)</li>
                <li>Omgivelsene mockes — eller bruker stabile, allerede testede enheter</li>
                <li>Tar utgangspunkt i spesifikasjonen for enheten</li>
                <li><strong>Hvit boks</strong>-testing</li>
                <li><strong>Alltid automatisert</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">Integrasjonstest</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Tester en del av systemet — enheter integrert med omgivelsene</li>
                <li>Tar utgangspunkt i spesifikasjonen for enheten</li>
                <li><strong>Hvit boks</strong>-testing</li>
                <li><strong>Nesten alltid automatisert</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">Systemtest</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Tester hele systemet</li>
                <li>Tar utgangspunkt i kravspesifikasjonen</li>
                <li>I AUP: tester på <strong>brukstilfeller</strong> og <strong>ikke-funksjonelle krav</strong></li>
                <li>Husk ikke-funksjonelle krav: belastning, oppetid, hastighet</li>
                <li>Vanligvis <strong>svart boks</strong></li>
                <li>Ofte manuelle, men stadig mer automatisering</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <p className="font-bold text-sysdev-600 dark:text-sysdev-400">Akseptansetest</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>En <strong>systemtest</strong> som viser om produktet aksepteres av kunden</li>
                <li>Utføres vanligvis av en <strong>uavhengig part</strong></li>
                <li>Kontraktsmessig viktig — bestått test = godkjent leveranse</li>
                <li>Foregår i Transition-fasen</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Feilfinning og debugging</h3>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="text-sm">
              Når en feil oppdages, må den <strong>registreres</strong> — den er en ny oppgave i
              backloggen som må prioriteres på linje med andre oppgaver. Det kan være vanskelig å
              finne en feil; en <strong>debugger er et uvurderlig verktøy</strong>. Når feilen er
              funnet, må den rettes — og <em>en regresjonstest legges til</em> så den ikke kommer
              tilbake.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Testbarhet — en arkitekturegenskap</h3>
          <p className="text-sm mb-3">
            Testbarhet er ikke noe man legger til etterpå — det er et resultat av god arkitektur og
            godt design. Atle anbefaler å tenke testbarhet allerede i:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 my-3">
            <li><strong>Valg av arkitektur</strong> — kan komponentene testes isolert?</li>
            <li><strong>Utforming av løsning</strong> — er ansvar adskilt? Kan vi mocke?</li>
          </ul>

          <p className="text-sm">
            <strong>GRASP og SOLID</strong> er utformingsprinsippene som gir testbar kode. Krav til
            enhetene som skal være lett å enhetsteste:
          </p>
          <div className="grid md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Små</strong> — én ting om gangen
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Uavhengige</strong> — minimal
              kobling
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Testbare</strong> — input → output
              er forutsigbart
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Deterministiske</strong> —
              oppfører seg likt hver gang
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Enkelt ansvar</strong> — har
              kun én grunn til å endres
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-3 text-sm">
              <strong className="text-sysdev-600 dark:text-sysdev-400">Veldefinerte avhengigheter</strong>{" "}
              — ingen sirkulære
            </div>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">
              Hva gode utformingsprinsipper gir oss
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Mer <strong>forståelig</strong> kode</li>
              <li>Mer <strong>fleksibel</strong> kode</li>
              <li>Mer <strong>vedlikeholdbar</strong> kode</li>
              <li>Mer <strong>testbar</strong> kode</li>
              <li><strong>Enklere</strong> kode</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  EKSAMENSTRENING — TYPISKE AUP-SPØRSMÅL                      */}
      {/* ============================================================ */}
      <section id="aup-eksamenstrening" className="scroll-mt-32">
        <TheorySummary
          title="Eksamenstrening — typiske AUP-spørsmål"
          defaultOpen={false}
          mustKnow={[
            "Atle elsker spørsmål om FASER vs DISIPLINER — vit forskjellen",
            "Spørsmål om hvor i AUP en spesifikk aktivitet hører hjemme er vanlig",
            "Spørsmål om Scrum + AUP koblingen kommer ofte",
            "Risikohåndtering blir nesten alltid spurt om",
          ]}
        >
          <p>
            Eksamen i DAT109 har et eget oppgave (Oppg 3) for utviklingsmetode, og AUP er sentralt.
            Her er typiske spørsmålstyper Erlend bør være forberedt på.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Spørsmålstype 1 — Fase vs disiplin</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm font-semibold mb-2">Eksempelspørsmål:</p>
            <p className="text-sm italic mb-3">
              &laquo;Forklar forskjellen mellom faser og disipliner i AUP. Gi to eksempler på aktiviteter
              under disiplinen Modellering, og angi i hvilken fase de er mest aktive.&raquo;
            </p>
            <p className="text-sm font-semibold mb-1">Mal for svar:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Faser</strong> = tidsmessige oppdelinger (Inception → Elaboration → Construction → Transition). En fase har en milepæl.</li>
              <li><strong>Disipliner</strong> = aktivitetsområder som pågår <em>på tvers</em> av fasene, men med ulik intensitet.</li>
              <li>Eksempel 1: <em>Overordnet kravspesifisering</em> — mest aktiv i <strong>Inception</strong>.</li>
              <li>Eksempel 2: <em>Modellering av arkitektur</em> — mest aktiv i <strong>Elaboration</strong>.</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Spørsmålstype 2 — Plassering av aktivitet</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm font-semibold mb-2">Eksempelspørsmål:</p>
            <p className="text-sm italic mb-3">
              &laquo;I hvilken fase i AUP ville du plassere arbeidet med å bygge en arkitekturprototype?
              Begrunn svaret.&raquo;
            </p>
            <p className="text-sm font-semibold mb-1">Svar:</p>
            <p className="text-sm">
              <strong>Elaboration</strong>. Hovedmålet med Elaboration er å bevise at arkitekturen
              fungerer gjennom en kjørbar prototype, slik at vi kan akseptere risiko og gå inn i
              Construction med trygghet. Hvis arkitekturen ikke holder vann i Elaboration, koster
              det titalls ganger mer å fikse i Construction — kostnadskurven flates ut.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Spørsmålstype 3 — Scrum + AUP koblingen</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm font-semibold mb-2">Eksempelspørsmål:</p>
            <p className="text-sm italic mb-3">
              &laquo;Beskriv hvordan AUP og Scrum kombineres i et typisk prosjekt.&raquo;
            </p>
            <p className="text-sm font-semibold mb-1">Mal for svar:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>AUP = <strong>strategisk</strong> rammeverk (måneder), gir faser og milepæler</li>
              <li>Scrum = <strong>operativt</strong> rammeverk (uker/dager), styrer hverdagen</li>
              <li>Inception/Elaboration kjøres som <em>lengre iterasjoner</em></li>
              <li>Construction kjøres som en <em>serie Scrum-sprinter</em> (typisk 2 uker)</li>
              <li>Transition kan være én avsluttende sprint + bug-fix</li>
              <li>AUP-disiplinene fordeles naturlig på Scrum-seremoniene</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Spørsmålstype 4 — Risikohåndtering</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm font-semibold mb-2">Eksempelspørsmål:</p>
            <p className="text-sm italic mb-3">
              &laquo;Forklar hvordan risikohåndtering håndteres i AUP, og hvilken rolle den spiller i
              Inception-fasen.&raquo;
            </p>
            <p className="text-sm font-semibold mb-1">Mal for svar:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Risiko = <strong>sannsynlighet × konsekvens</strong></li>
              <li>Prosessen: identifiser → analyser → prioriter → kontroller</li>
              <li>I Inception: kartlegging og første prioritering — risikoene styrer Elaboration</li>
              <li>Tunge tekniske risikoer angripes med PoC i Elaboration</li>
              <li>Risikolisten oppdateres sprint for sprint i Construction</li>
              <li>&laquo;If you don&apos;t actively attack the risks, they will actively attack you&raquo;</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Spørsmålstype 5 — Disipliner i en spesifikk fase</h3>
          <div className="rounded-lg border border-[var(--card-border)] p-4 my-3">
            <p className="text-sm font-semibold mb-2">Eksempelspørsmål:</p>
            <p className="text-sm italic mb-3">
              &laquo;Beskriv aktivitetene under disiplinen Implementering i Construction-fasen.&raquo;
            </p>
            <p className="text-sm font-semibold mb-1">Sjekkliste-svar:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Test først (TDD) — Red → Green → Refactor</li>
              <li>Bygg kontinuerlig — CI-server kjører tester ved hver commit</li>
              <li>Videreutvikle domenemodellen i kode</li>
              <li>Videreutvikle UI</li>
              <li>Bygg dataskjema og migrasjonsskript</li>
              <li>Lag grensesnitt til eksisterende system</li>
              <li>Skriv skript for datakonvertering</li>
            </ul>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Atles favoritt-eksamenstema</p>
            <p className="text-sm">
              Erlend bør særlig være forberedt på spørsmål som kombinerer flere temaer:
              &laquo;<em>Hvordan bidrar TDD til AUPs mål om å flate ut kostnadskurven?</em>&raquo; eller
              &laquo;<em>Hvilken disiplin spiller størst rolle i Transition, og hvorfor?</em>&raquo;.
              Slike kombinasjonsspørsmål belønner studenten som forstår <strong>sammenhengene</strong>
              {" "}— ikke bare definisjonene.
            </p>
          </div>
        </TheorySummary>
      </section>
    </div>
  );
}
