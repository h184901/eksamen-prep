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
    </div>
  );
}
