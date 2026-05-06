"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function TDDPage() {
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
        <span className="text-[var(--foreground)]">TDD</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Test-drevet utvikling (TDD)</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Red → Green → Refactor-syklusen, krav til testbare enheter, testdoubles og
        testpyramiden. Et av de mest populære eksamenstemaene.
      </p>

      {/* ============================================================ */}
      {/*  6. TEST-DREVET UTVIKLING (TDD)                             */}
      {/* ============================================================ */}
      <section id="tdd" className="scroll-mt-32">
        <TheorySummary
          title="Test-drevet utvikling (TDD)"
          mustKnow={[
            "TDD = skriv testen FØR koden",
            "Red-Green-Refactor-syklusen",
            "Red: skriv feilende test → Green: skriv enkleste kode → Refactor: forbedre",
            "Krav til enheter: små, uavhengige, testbare, ett ansvar",
            "Testdoubles: Dummy, Stub, Mock, Simulering",
            "Fordeler: automatisk testbar, rask tilbakemelding, tester = dokumentasjon",
          ]}
        >
          <p>
            TDD er en av de mest populære eksamenstemaene (spurt i 2020, 2021, 2022 og inkludert
            i flervalg fra 2023). Kent Beck sier: <em>&ldquo;Kode uten test eksisterer ikke.&rdquo;</em>
          </p>

          {/* Red-Green-Refactor visuelt */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-5 my-5 rounded-lg">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-4 text-lg text-center">
              Red → Green → Refactor
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
                <p className="text-2xl mb-2">1. RED</p>
                <p className="font-bold text-red-700 dark:text-red-400 mb-1">Skriv feilende test</p>
                <p className="text-xs text-[var(--muted)]">
                  Skriv en test for funksjonaliteten du vil lage. Testen skal FEILE fordi
                  koden ikke er skrevet ennå.
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                <p className="text-2xl mb-2">2. GREEN</p>
                <p className="font-bold text-green-700 dark:text-green-400 mb-1">Skriv enkleste kode</p>
                <p className="text-xs text-[var(--muted)]">
                  Skriv den enklest mulige koden som gjør at testen PASSERER.
                  Ikke overtenk — bare gjør testen grønn.
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700">
                <p className="text-2xl mb-2">3. REFACTOR</p>
                <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">Forbedre koden</p>
                <p className="text-xs text-[var(--muted)]">
                  Rydd opp, fjern duplikater, gjør koden lesbar.
                  Kjør testene igjen for å verifisere at alt fortsatt virker.
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-[var(--muted)] mt-3">
              Gjenta for neste funksjonalitet. Syklustid: sekunder til minutter.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Krav til testbare enheter</h3>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Små</strong> — test én ting om gangen</li>
              <li><strong>Uavhengige</strong> — ingen avhengigheter mellom tester</li>
              <li><strong>Testbare</strong> — kan kjøres automatisk</li>
              <li><strong>Konsistent oppførsel</strong> — samme resultat hver gang</li>
              <li><strong>Ett ansvar</strong> — SRP (Single Responsibility Principle)</li>
              <li><strong>Ingen sirkulære avhengigheter</strong></li>
              <li><strong>Veldefinerte avhengigheter</strong></li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Testdoubles (erstatninger for ekte avhengigheter)</h3>
          <ComparisonTable
            headers={["Type", "Hva gjør den?", "Eksempel"]}
            rows={[
              ["Dummy", "Tom implementasjon, brukes bare for å fylle parameterlister", "Et tomt objekt sendt inn for å unngå NullPointerException"],
              ["Stub", "Returnerer forhåndsdefinerte verdier", "En stub som alltid returnerer \"OK\" fra en API"],
              ["Mock", "Simulerer oppførsel og verifiserer at metoder ble kalt", "Verifiser at sendEmail() ble kalt med riktig mottaker"],
              ["Simulering", "Full kopi av det reelle systemet", "En in-memory database som oppfører seg som den ekte"],
            ]}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Fordeler og ulemper</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Fordeler</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Koden blir automatisk testbar</li>
                <li>Rask tilbakemelding</li>
                <li>God testdekning</li>
                <li>Fremmer enkel design</li>
                <li>Tester fungerer som dokumentasjon</li>
                <li>Feilsøking enklere (vet hva som feilet)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">Ulemper</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Tar lengre tid i starten</li>
                <li>Krever disiplin</li>
                <li>Noen ting vanskelig å teste (UI, databaser)</li>
                <li>Testene må vedlikeholdes</li>
                <li>Kan føre til for mye fokus på å passere tester</li>
                <li>Ikke alt egner seg for TDD</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Testpyramiden (Mike Cohn)</p>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-20 text-right font-mono text-xs">10%</span>
                <div className="h-6 bg-red-200 dark:bg-red-900/40 rounded flex items-center px-2 text-xs" style={{ width: "30%" }}>System/UI-tester</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-right font-mono text-xs">20%</span>
                <div className="h-6 bg-amber-200 dark:bg-amber-900/40 rounded flex items-center px-2 text-xs" style={{ width: "50%" }}>Feature-tester</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-right font-mono text-xs">70%</span>
                <div className="h-6 bg-green-200 dark:bg-green-900/40 rounded flex items-center px-2 text-xs" style={{ width: "80%" }}>Enhetstester</div>
              </div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              70% bør være enkle enhetstester, 20% feature-tester, kun 10% tunge system/UI-tester.
            </p>
          </div>
        </TheorySummary>
      </section>
    </div>
  );
}
