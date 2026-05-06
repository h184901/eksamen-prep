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
    </div>
  );
}
