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

      {/* ============================================================ */}
      {/*  7. SOMMERVILLE: HVA VIL TESTING SI – STRATEGISK            */}
      {/* ============================================================ */}
      <section id="testing-strategisk" className="scroll-mt-32">
        <TheorySummary
          title="Hva vil testing si — strategisk perspektiv (Sommerville kap. 9)"
          mustKnow={[
            "Testing kan ALDRI bevise fravær av feil — kun øke vår tillit til at systemet virker",
            "«Programvaretesting er en prosess der du kjører programmet med simulerte brukerdata for å observere om det oppfører seg som forventet»",
            "Funksjonell testing = sjekker hva systemet GJØR. Ikke-funksjonell testing = HVORDAN det gjør det (ytelse, sikkerhet, brukervennlighet)",
            "Testing alene er ikke nok — kombiner ALLTID med code reviews/inspeksjoner",
            "Validering: «Bygger vi riktig produkt?» — Verifisering: «Bygger vi produktet riktig?»",
          ]}
        >
          <p>
            Sommerville (kap. 9) skiller mellom <strong>verifisering</strong> (vi følger spesifikasjonen)
            og <strong>validering</strong> (spesifikasjonen er det kunden faktisk vil ha). Testing
            bidrar til begge, men på fundamentalt forskjellige måter.
          </p>

          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 p-5 my-5 rounded-lg">
            <p className="font-bold text-violet-700 dark:text-violet-400 mb-2">
              Dijkstras klassiske utsagn
            </p>
            <p className="italic text-sm leading-relaxed">
              «Testing kan vise at det <em>finnes</em> feil i et program, men aldri at programmet er
              feilfritt.» En vellykket test er en test som <strong>finner</strong> en feil. Vi
              tester for å øke tilliten — vi beviser ikke korrekthet.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Sommervilles definisjon</h3>
          <blockquote className="border-l-4 border-amber-400 pl-4 my-4 text-sm italic">
            «Programvaretesting er en prosess der du kjører programmet med simulerte brukerdata
            for å observere om det oppfører seg som forventet, og for å oppdage feil og
            mangler.»
          </blockquote>

          <h3 className="text-lg font-bold mt-6 mb-3">Funksjonell vs ikke-funksjonell testing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Funksjonell testing</p>
              <p className="text-sm mb-2">
                Sjekker at systemet gjør <em>det som er spesifisert</em>. Test ut fra brukstilfeller,
                user stories, kravspesifikasjon.
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-[var(--muted)]">
                <li>«Når jeg trykker «Bestill», legges varen i ordren»</li>
                <li>«Login med feil passord gir feilmelding»</li>
                <li>«Saldo trekkes med riktig beløp»</li>
              </ul>
            </div>
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Ikke-funksjonell testing</p>
              <p className="text-sm mb-2">
                Sjekker <em>hvordan</em> systemet oppfører seg: kvalitetsegenskaper.
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-[var(--muted)]">
                <li>Ytelse (response time &lt; 200 ms)</li>
                <li>Last/skalering (1000 samtidige brukere)</li>
                <li>Sikkerhet (motstå SQL-injection)</li>
                <li>Brukervennlighet, tilgjengelighet</li>
                <li>Pålitelighet, gjenoppretting etter feil</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvorfor testing alene ikke holder</h3>
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="text-sm leading-relaxed">
              Mange feil er <strong>logiske misforståelser</strong> eller <strong>arkitekturproblemer</strong>{" "}
              som tester ikke fanger — koden gjør «det riktige» ifølge spesifikasjonen, men spesifikasjonen
              er feil. Det er derfor Sommerville understreker at testing må kombineres med:
            </p>
            <ul className="text-sm mt-2 list-disc list-inside space-y-1">
              <li><strong>Code reviews / inspeksjoner</strong> — andre menneskers øyne</li>
              <li><strong>Statiske analyseverktøy</strong> — finn nullpekere, ubrukt kode, sikkerhetshull</li>
              <li><strong>Pair programming</strong> (XP) — kontinuerlig review</li>
              <li><strong>Akseptansetesting</strong> med kunde — er dette virkelig det de ville ha?</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  8. DE 4 NIVÅENE AV FUNKSJONELL TESTING                      */}
      {/* ============================================================ */}
      <section id="testnivaaer" className="scroll-mt-32">
        <TheorySummary
          title="De 4 nivåene av funksjonell testing"
          mustKnow={[
            "Unit testing — programmereren tester én klasse/metode isolert",
            "Feature testing — flere enheter integreres for å teste en hel egenskap (user story)",
            "System testing — hele systemet end-to-end, alle pathways",
            "Release testing — egen test i produksjonslignende miljø: «godt nok å lansere?»",
            "Hvert nivå har EGEN aktør, EGEN timing og EGEN gransking",
          ]}
        >
          <p>
            Sommerville beskriver fire nivåer av funksjonell testing. De henger sammen som lag
            i en pyramide: mange små, raske tester nederst — få store, dyre tester øverst.
          </p>

          {/* Test-nivå pyramide SVG */}
          <div className="my-6 flex justify-center">
            <svg viewBox="0 0 480 320" className="max-w-md w-full" role="img" aria-label="Pyramide av testnivåer">
              <defs>
                <linearGradient id="grad-unit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="grad-feat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="grad-sys" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fdba74" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="grad-rel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              {/* Pyramide-lag */}
              <polygon points="180,30 300,30 320,90 160,90" fill="url(#grad-rel)" stroke="#b91c1c" strokeWidth="1.5" />
              <polygon points="160,90 320,90 350,170 130,170" fill="url(#grad-sys)" stroke="#c2410c" strokeWidth="1.5" />
              <polygon points="130,170 350,170 380,240 100,240" fill="url(#grad-feat)" stroke="#b45309" strokeWidth="1.5" />
              <polygon points="100,240 380,240 410,310 70,310" fill="url(#grad-unit)" stroke="#15803d" strokeWidth="1.5" />
              {/* Etiketter */}
              <text x="240" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">Release</text>
              <text x="240" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">System</text>
              <text x="240" y="210" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">Feature</text>
              <text x="240" y="285" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">Unit</text>
              {/* Aksepiler */}
              <text x="430" y="60" fontSize="10" fill="#6b7280">Få, dyre</text>
              <text x="430" y="305" fontSize="10" fill="#6b7280">Mange, billige</text>
              <line x1="425" y1="70" x2="425" y2="295" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <polygon points="0,0 6,3 0,6" fill="#6b7280" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sysdev-50 dark:bg-sysdev-950/30">
                  <th className="text-left px-3 py-2 border border-[var(--card-border)]">Nivå</th>
                  <th className="text-left px-3 py-2 border border-[var(--card-border)]">Hvem tester</th>
                  <th className="text-left px-3 py-2 border border-[var(--card-border)]">Når</th>
                  <th className="text-left px-3 py-2 border border-[var(--card-border)]">Eksempel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold text-green-700 dark:text-green-400">Unit</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Programmereren selv</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Kontinuerlig (TDD-syklus)</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]"><code>StigeSpill.kastTerning()</code> returnerer 1–6</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold text-amber-700 dark:text-amber-400">Feature</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Utviklerteam (ofte automatisert)</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Når en user story er ferdig</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">«Spille en hel runde stigespill med 3 spillere»</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold text-orange-700 dark:text-orange-400">System</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Eget testteam / utviklerteam</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Slutt av iterasjon / sprint</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Hele app — fra meny → spill → highscore → avslutt</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold text-red-700 dark:text-red-400">Release</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Eget release-team / kunde</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Før en faktisk lansering</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Kjøre i staging på ekte mobiler — godkjent for App Store?</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Detaljer per nivå</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">1. Unit testing (enhetstesting)</p>
              <p className="text-sm mt-1">
                Programmereren tester én <em>isolert</em> kodeenhet — gjerne én metode eller én
                klasse. Bruk testdoubles (mocks/stubs) for å fjerne avhengigheter til andre
                klasser. Skal være rask: hele suiten kjøres på sekunder.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400">2. Feature testing (egenskapstesting)</p>
              <p className="text-sm mt-1">
                Flere enheter er nå satt sammen og tester en hel <em>egenskap</em> (typisk en user
                story). Sjekker at klassene snakker riktig sammen. Mocker fortsatt eksterne tjenester
                (database, API), men ekte logikk i mellom.
              </p>
            </div>
            <div className="rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 p-4">
              <p className="font-bold text-orange-700 dark:text-orange-400">3. System testing</p>
              <p className="text-sm mt-1">
                Hele systemet kjøres som en helhet — alle <em>end-to-end pathways</em> testes,
                også uventede kombinasjoner av features. Bruker (helst) ekte database og ekte
                eksterne tjenester i testmiljø.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
              <p className="font-bold text-red-700 dark:text-red-400">4. Release testing</p>
              <p className="text-sm mt-1">
                Tester systemet i et <em>produksjonslignende</em> miljø, ofte med ekte data.
                Spørsmålet er ikke «virker det?» men «er det <em>godt nok</em> å lansere?» Inkluderer
                ofte ytelsestesting og brukbarhetstesting.
              </p>
            </div>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  9. EQUIVALENCE PARTITIONING & BOUNDARY VALUE ANALYSIS       */}
      {/* ============================================================ */}
      <section id="equivalence-boundary" className="scroll-mt-32">
        <TheorySummary
          title="Equivalence partitioning og boundary value analysis"
          mustKnow={[
            "Equivalence partitioning: del input i grupper hvor systemet behandler alle verdier likt — én test per gruppe holder",
            "Boundary value analysis: feilene gjemmer seg på grensene → test akkurat på, like under og like over",
            "Off-by-one er den klassiske buggen — derfor er disse teknikkene så effektive",
            "For input «1–100»: test 0, 1, 2, 50, 99, 100, 101 (7 verdier dekker 99 % av feilkilder)",
            "Vanlig feil: tro at «en verdi i midten» er nok. Den finner aldri grensefeil",
          ]}
        >
          <p>
            Sommerville (kap. 9.2) presenterer to klassiske teknikker for å velge testdata
            <em> systematisk</em> i stedet for tilfeldig. Begge bygger på samme observasjon:
            programmer feiler oftest på <strong>spesifikke områder</strong> av input, ikke
            tilfeldig.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Equivalence partitioning</h3>
          <p>
            Del input i <em>partisjoner</em> der systemet behandler alle verdier likt. Hvis koden
            virker for én verdi i en partisjon, virker den (sannsynligvis) for alle andre verdier
            i samme partisjon.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Eksempel: en metode som godtar tall 1–100
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Partisjon A (ugyldig, lav)</strong>: tall &lt; 1 → forventet: kast unntak</li>
              <li><strong>Partisjon B (gyldig)</strong>: tall i [1, 100] → forventet: aksept</li>
              <li><strong>Partisjon C (ugyldig, høy)</strong>: tall &gt; 100 → forventet: kast unntak</li>
            </ul>
            <p className="text-sm mt-3">
              Én test fra hver partisjon (f.eks. <code>-5</code>, <code>50</code>, <code>200</code>)
              dekker den «brede» logikken.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Boundary value analysis</h3>
          <p>
            Bugs liker grensene. Tenk hvor mange ganger du har skrevet <code>i &lt; n</code> når
            du mente <code>i &lt;= n</code>. Test derfor verdier <em>akkurat på</em> grensen, og
            verdier like over og like under.
          </p>

          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
              Eksempel: input 1–100
            </p>
            <div className="text-sm">
              <p className="mb-2">Test disse verdiene:</p>
              <div className="flex flex-wrap gap-2">
                {["0 (under)", "1 (grense)", "2 (innenfor)", "50 (midt)", "99 (innenfor)", "100 (grense)", "101 (over)"].map((v) => (
                  <span key={v} className="px-2 py-1 rounded bg-white/80 dark:bg-neutral-900/90 border border-purple-300 dark:border-purple-700 text-xs font-mono">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">JUnit-eksempel</h3>
          <pre className="bg-neutral-100 dark:bg-neutral-900 border border-[var(--card-border)] rounded-lg p-4 text-xs overflow-x-auto"><code>{`class AldersgrenseTest {

    private final Billett billett = new Billett();

    // Equivalence partitioning — én verdi pr. gruppe
    @Test void barnUnder12FaarBarnebillett() {
        assertEquals("Barn", billett.kategori(8));
    }
    @Test void voksenFaarVoksenbillett() {
        assertEquals("Voksen", billett.kategori(35));
    }
    @Test void honnoerOver67() {
        assertEquals("Honnør", billett.kategori(80));
    }

    // Boundary value analysis — grenser mellom kategoriene
    @ParameterizedTest
    @CsvSource({
        "11, Barn",     // siste år som barn
        "12, Voksen",   // første dag som voksen
        "66, Voksen",   // siste år som voksen
        "67, Honnør"    // første dag som honnør
    })
    void grenserMellomKategorier(int alder, String forventet) {
        assertEquals(forventet, billett.kategori(alder));
    }

    // Ugyldige inputs
    @Test void negativAlderKaster() {
        assertThrows(IllegalArgumentException.class, () -> billett.kategori(-1));
    }
}`}</code></pre>

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse</p>
            <p className="text-sm">
              «Jeg tester med <code>50</code> og det funker — da er metoden grei.» Nei. Verdien
              <code> 50</code> er <em>typisk</em> og finner aldri off-by-one. Test alltid grensene.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  10. USER TESTING — ALPHA, BETA, ACCEPTANCE                  */}
      {/* ============================================================ */}
      <section id="user-testing" className="scroll-mt-32">
        <TheorySummary
          title="User testing — Alpha, Beta og Acceptance"
          mustKnow={[
            "Alpha testing: utvalgte INTERNE brukere tester i utviklingsmiljø",
            "Beta testing: utvalgte EKSTERNE brukere tester før release",
            "Acceptance testing: KUNDEN bekrefter at systemet oppfyller kravene (kontraktuelt)",
            "I smidig kontekst kan alpha/beta skje per sprint, ikke bare før første lansering",
          ]}
        >
          <p>
            Sommerville (kap. 9.3) skiller mellom tre typer testing der <em>brukere</em> — ikke
            utviklere — er aktørene. Dette er testing som hjelper med <strong>validering</strong>:
            er dette virkelig det kunden ville ha?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Alpha</p>
              <p className="text-xs text-[var(--muted)] mb-2">INTERNT — kontrollert miljø</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Testes av interne brukere (ofte annet team i samme firma)</li>
                <li>Skjer i utviklingsmiljøet</li>
                <li>Utviklerne sitter ved siden av og observerer</li>
                <li>Tidlig — kan finne grunnleggende UX-feil</li>
              </ul>
            </div>
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Beta</p>
              <p className="text-xs text-[var(--muted)] mb-2">EKSTERNT — ekte miljø</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Testes av utvalgte eksterne brukere/kunder</li>
                <li>Skjer på brukerens egne maskiner</li>
                <li>Avdekker feil som bare oppstår «in the wild»</li>
                <li>Eksempel: Spotify-betatest, WhatsApp Beta</li>
              </ul>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Acceptance</p>
              <p className="text-xs text-[var(--muted)] mb-2">KUNDEN — kontraktuell</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Kunden kjører forhåndsavtalte testscenarioer</li>
                <li>Sjekker at krav er oppfylt</li>
                <li>«Bestått» = kunden tar over og betaler</li>
                <li>Sentralt i fastpris-/oppdragskontrakter</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
              I smidig kontekst
            </p>
            <p className="text-sm leading-relaxed">
              Tradisjonelt skjer alpha/beta én gang før release. I Scrum/XP gjør vi i prinsippet
              <strong> alpha-testing per sprint</strong> via demo / sprint review (interne stakeholders),
              og kan ha <strong>kontinuerlig beta</strong> via feature flags / A-B-testing. Acceptance
              testing utføres ofte per user story av Product Owner.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  11. PERFORMANCE OG LOAD TESTING                             */}
      {/* ============================================================ */}
      <section id="performance-testing" className="scroll-mt-32">
        <TheorySummary
          title="Performance- og load-testing"
          mustKnow={[
            "Performance testing: hvor raskt svarer systemet under normal last?",
            "Load testing: hva skjer ved forventet eller forhøyet last (mange samtidige brukere)?",
            "Stress testing: presser systemet over kapasitet for å se HVOR det knekker",
            "Verktøy: JMeter, Gatling, k6, Locust",
          ]}
        >
          <p>
            Dette er <em>ikke-funksjonell</em> testing. Et system kan være funksjonelt korrekt og
            likevel ubrukelig hvis det tar 10 sekunder å svare. Sommerville understreker at
            ytelseskrav skal testes systematisk, ikke bare «det føles raskt».
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Performance</p>
              <p className="text-sm">Hvor lang tid tar én forespørsel under <em>normal</em> last? F.eks. «søk skal returnere innen 200 ms».</p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Load</p>
              <p className="text-sm">Holder systemet på 500 samtidige brukere? 5000? Vi simulerer «vanlig dårlig dag».</p>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">Stress</p>
              <p className="text-sm">Vi pusher systemet til kollaps for å se HVOR det knekker, og om det <em>recovers</em> etterpå.</p>
            </div>
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-violet-700 dark:text-violet-400 mb-2">
              Hvorfor det er viktig
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Brukeropplevelse</strong>: Amazon: 100 ms forsinkelse = 1 % salgsfall.</li>
              <li><strong>Skalering</strong>: vet du om du må kjøpe mer kapasitet før Black Friday?</li>
              <li><strong>Pålitelighet</strong>: oppdager memory leaks, deadlocks som først kommer under last.</li>
            </ul>
          </div>

          <p className="text-sm">
            Typiske verktøy: <code>JMeter</code> (Apache, GUI + script), <code>Gatling</code> (Scala-basert,
            populær i CI), <code>k6</code> (moderne, JavaScript), <code>Locust</code> (Python).
          </p>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  12. SECURITY TESTING                                        */}
      {/* ============================================================ */}
      <section id="security-testing" className="scroll-mt-32">
        <TheorySummary
          title="Security testing"
          mustKnow={[
            "Security testing er vanskelig fordi du tester for ting systemet IKKE skal gjøre",
            "Bruk en risk-based approach: hva er mest verdifullt og mest utsatt?",
            "«Tenk som en angriper» — input fuzzing, prøv kjente angrepsmønstre",
            "Bruk OWASP Top 10 som sjekkliste for web-applikasjoner",
          ]}
        >
          <p>
            Vanlig testing sjekker at systemet gjør det det <em>skal</em>. Sikkerhetstesting
            sjekker at systemet <em>ikke</em> gjør ting det ikke skal — og det er et uendelig
            stort rom av muligheter. Derfor er metoden helt annerledes.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Risk-based approach</h3>
          <p>
            Du kan ikke teste «alt». Identifiser i stedet:
          </p>
          <ol className="text-sm list-decimal list-inside space-y-1 my-3">
            <li><strong>Aktiva</strong>: hva er verdifullt? (brukerdata, betalingsinfo, IP)</li>
            <li><strong>Trusler</strong>: hvem vil ha tak i det? (kriminelle, konkurrenter, innsidere)</li>
            <li><strong>Sårbarheter</strong>: hvor er angrepsoverflaten? (login, fil-opplasting, API)</li>
            <li>Test der risiko = aktiva × trussel × sårbarhet er størst.</li>
          </ol>

          <h3 className="text-lg font-bold mt-6 mb-3">«Tenk som en angriper»</h3>
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 my-4 rounded-lg">
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Input fuzzing</strong>: send tilfeldige, store, malformede data — sjekk om noe krasjer eller lekker info.</li>
              <li><strong>Kjente angrepsmønstre</strong>: prøv SQL-injection (<code>{`' OR 1=1 --`}</code>), XSS (<code>&lt;script&gt;</code>), path traversal (<code>../../etc/passwd</code>).</li>
              <li><strong>Privilege escalation</strong>: kan en vanlig bruker få admin-rettigheter ved å manipulere requests?</li>
              <li><strong>Brute force</strong>: er det rate-limiting på login?</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">OWASP Top 10 (kort)</h3>
          <p className="text-sm mb-2">
            Open Web Application Security Project gir en oppdatert liste over de 10 vanligste
            sårbarhetene i webapplikasjoner. Bruk den som sjekkliste:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-3 text-xs">
            {[
              "A01: Broken Access Control",
              "A02: Cryptographic Failures",
              "A03: Injection (SQL, NoSQL, OS)",
              "A04: Insecure Design",
              "A05: Security Misconfiguration",
              "A06: Vulnerable & Outdated Components",
              "A07: Identification & Authentication Failures",
              "A08: Software & Data Integrity Failures",
              "A09: Security Logging & Monitoring Failures",
              "A10: Server-Side Request Forgery (SSRF)",
            ].map((item) => (
              <div key={item} className="px-3 py-2 rounded border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                {item}
              </div>
            ))}
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  13. CODE REVIEWS — KOMPLEMENTÆRT TIL TESTING               */}
      {/* ============================================================ */}
      <section id="code-reviews" className="scroll-mt-32">
        <TheorySummary
          title="Code reviews — komplementært til testing"
          mustKnow={[
            "Testing finner ikke alle feil. Code reviews finner feil som er UMULIG å teste — designvalg, misforståelser, kodelukt",
            "En typisk PR-flyt: utvikler pusher branch → åpner pull request → reviewers kommenterer → endringer → godkjent → merge",
            "Pair programming (XP) er kontinuerlig code review",
            "Code review + automatisert testing = høy tillit til koden",
          ]}
        >
          <p>
            Sommerville understreker gjentatte ganger at <strong>tester finner feil i koden — men
            ikke feil i designen</strong>. En misforstått user story, et arkitekturvalg som låser
            deg fast, en navnekonvensjon som forvirrer fremtidige utviklere — ingen test fanger
            dette. Det krever et annet menneske som leser koden.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Hva en code review fanger som tester ikke gjør</h3>
          <ul className="text-sm space-y-1 list-disc list-inside my-3">
            <li>Misforstått krav («nei, det skal være alle <em>aktive</em> kunder, ikke alle»)</li>
            <li>Brudd på SOLID/GRASP, dårlig kohesjon, høy kobling</li>
            <li>Sikkerhetshull som tester ikke leter etter</li>
            <li>Manglende edge cases — reviewer foreslår «hva med tom liste?»</li>
            <li>Lesbarhet, navngivning, dokumentasjon</li>
            <li>Kunnskapsdeling — hele teamet vet hvordan koden virker</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">Typisk pull request-flyt</h3>

          {/* Code review flow SVG */}
          <div className="my-6 flex justify-center">
            <svg viewBox="0 0 720 200" className="max-w-3xl w-full" role="img" aria-label="Code review-flyt">
              {/* Steg-bokser */}
              <g>
                <rect x="10" y="60" width="120" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="70" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">1. Push branch</text>
                <text x="70" y="102" textAnchor="middle" fontSize="9" fill="#3730a3">git push origin feature/x</text>
              </g>
              <g>
                <rect x="155" y="60" width="120" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="215" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">2. Åpne PR</text>
                <text x="215" y="102" textAnchor="middle" fontSize="9" fill="#78350f">tittel + beskrivelse</text>
              </g>
              <g>
                <rect x="300" y="60" width="120" height="60" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
                <text x="360" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">3. Review</text>
                <text x="360" y="97" textAnchor="middle" fontSize="9" fill="#4c1d95">kommentarer</text>
                <text x="360" y="110" textAnchor="middle" fontSize="9" fill="#4c1d95">+ CI kjører</text>
              </g>
              <g>
                <rect x="445" y="60" width="120" height="60" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                <text x="505" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">4. Endringer</text>
                <text x="505" y="102" textAnchor="middle" fontSize="9" fill="#7f1d1d">push nye commits</text>
              </g>
              <g>
                <rect x="590" y="60" width="120" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
                <text x="650" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">5. Merge</text>
                <text x="650" y="102" textAnchor="middle" fontSize="9" fill="#166534">til main</text>
              </g>

              {/* Piler */}
              <defs>
                <marker id="arr-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0,0 6,3 0,6" fill="#475569" />
                </marker>
              </defs>
              <line x1="130" y1="90" x2="155" y2="90" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
              <line x1="275" y1="90" x2="300" y2="90" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
              <line x1="420" y1="90" x2="445" y2="90" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-blue)" />
              <line x1="565" y1="90" x2="590" y2="90" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-blue)" />

              {/* Loop tilbake til review */}
              <path d="M 505 120 Q 505 165 360 165 Q 300 165 300 120" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="4 3" markerEnd="url(#arr-blue)" />
              <text x="400" y="180" textAnchor="middle" fontSize="9" fill="#64748b">ny runde til godkjent</text>
            </svg>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Verktøy</h3>
          <ul className="text-sm space-y-1 list-disc list-inside my-3">
            <li><strong>GitHub Pull Requests</strong> — line-kommentarer, suggestions, required reviewers</li>
            <li><strong>GitLab Merge Requests</strong> — tilsvarende, integrert med pipelines</li>
            <li><strong>Bitbucket / Azure DevOps</strong> — alternativer i andre økosystemer</li>
            <li><strong>Gerrit</strong> — populært i Google/Android, mer formell flow</li>
          </ul>

          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">
              Pair programming = kontinuerlig review
            </p>
            <p className="text-sm leading-relaxed">
              I XP setter to utviklere seg sammen og koder mens den ene observerer/foreslår. Det
              ER en code review — bare i sanntid. Forskning (Williams &amp; Kessler) viser at det gir
              like god kvalitet som etterfølgende code reviews, men raskere kunnskapsdeling.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
              Den vinnende kombinasjonen
            </p>
            <p className="text-sm">
              <strong>Automatisert testing</strong> (fanger regresjoner, bekrefter eksisterende
              oppførsel) <strong>+ code review</strong> (fanger design og misforståelser){" "}
              <strong>+ statisk analyse</strong> (fanger «mekaniske» feil) = høy tillit til koden.
              Ingen av delene alene holder.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  14. TESTAUTOMATISERING — ARRANGE / ACT / ASSERT             */}
      {/* ============================================================ */}
      <section id="arrange-act-assert" className="scroll-mt-32">
        <TheorySummary
          title="Testautomatisering — Arrange / Act / Assert"
          mustKnow={[
            "Standardstrukturen for unit tests: Arrange → Act → Assert (AAA)",
            "Arrange: sett opp data og avhengigheter (gjerne med testdoubles)",
            "Act: kjør den ENE metoden som testes",
            "Assert: sjekk at resultatet er som forventet",
            "Regresjonstesting = kjør HELE testsuiten etter hver endring for å fange ting som ble ødelagt",
          ]}
        >
          <p>
            Når du skriver en unit test, struktur den i tre adskilte deler. Det gjør tester
            lett-leselige og lett å vedlikeholde. Mønsteret kalles <strong>AAA</strong>:{" "}
            <em>Arrange, Act, Assert</em>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">1. Arrange</p>
              <p className="text-sm">
                Sett opp objektene, dataene og avhengighetene som testen trenger. Inject mocks
                eller stubs der det trengs.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">2. Act</p>
              <p className="text-sm">
                Kjør <em>én</em> metode — det du faktisk vil teste. Bare én linje, helst.
              </p>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1">3. Assert</p>
              <p className="text-sm">
                Sjekk at resultatet matcher det forventede. Bruk{" "}
                <code>assertEquals</code>, <code>assertTrue</code>, <code>assertThrows</code> osv.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">JUnit-eksempel: stigespill</h3>
          <pre className="bg-neutral-100 dark:bg-neutral-900 border border-[var(--card-border)] rounded-lg p-4 text-xs overflow-x-auto"><code>{`class StigeSpillTest {

    @Test
    void spillerSomLanderPaaStigeKlatrerOpp() {
        // ARRANGE
        Brett brett = new Brett();
        brett.leggTilStige(3, 22);                  // stige fra 3 til 22
        Spiller erlend = new Spiller("Erlend");
        Terning fastTerning = new FastTerning(3);   // stub som alltid gir 3
        StigeSpill spill = new StigeSpill(brett, fastTerning, List.of(erlend));

        // ACT
        spill.taTur(erlend);

        // ASSERT
        assertEquals(22, erlend.getPosisjon(),
            "Erlend skulle ha klatret opp stigen fra 3 til 22");
    }

    @Test
    void spillerVinnerNaarHanLanderPaaRute100() {
        // ARRANGE
        Brett brett = new Brett();
        Spiller erlend = new Spiller("Erlend");
        erlend.flyttTil(94);
        Terning fastTerning = new FastTerning(6);
        StigeSpill spill = new StigeSpill(brett, fastTerning, List.of(erlend));

        // ACT
        spill.taTur(erlend);

        // ASSERT
        assertEquals(100, erlend.getPosisjon());
        assertTrue(spill.erFerdig());
        assertEquals(erlend, spill.getVinner());
    }
}`}</code></pre>

          <h3 className="text-lg font-bold mt-6 mb-3">Regresjonstesting</h3>
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 p-4 my-4 rounded-lg">
            <p className="text-sm leading-relaxed">
              <strong>Regresjon</strong> = «noe som virket før, virker ikke lenger.» Den verste
              typen feil, fordi du ikke vet at du har laget den. Løsningen er enkel: kjør{" "}
              <em>hele</em> testsuiten etter hver endring (lokalt + i CI). Hvis du fanger
              regresjoner umiddelbart kan du fikse dem mens konteksten er fersk.
            </p>
            <ul className="text-sm mt-2 list-disc list-inside space-y-1">
              <li>Unit-suite kjøres typisk lokalt før commit (sekunder)</li>
              <li>Hele suiten (inkl. integrasjon) kjøres i CI ved push (minutter)</li>
              <li>Failed run = kan ikke merge til main</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  15. TEST-KOBLINGER TIL SOLID OG GRASP                      */}
      {/* ============================================================ */}
      <section id="solid-grasp-koblinger" className="scroll-mt-32">
        <TheorySummary
          title="Test-koblinger til SOLID og GRASP"
          mustKnow={[
            "Vanskelige tester = ofte symptom på dårlig design",
            "SRP (én ansvar pr. klasse) gir små, fokuserte tester",
            "DIP (avheng av abstraksjoner) gjør mocking mulig",
            "High Cohesion gir tester som tester ÉN ting om gangen",
            "Hvis du trenger MANGE testdoubles, bryter koden sannsynligvis SOLID",
          ]}
        >
          <p>
            Et viktig poeng som ofte overses: TDD og god design henger uløselig sammen. Hvis
            koden er <em>vanskelig å teste</em>, er det nesten alltid fordi den bryter et
            SOLID/GRASP-prinsipp. Tester gir derfor designtilbakemelding.
          </p>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sysdev-50 dark:bg-sysdev-950/30">
                  <th className="text-left px-3 py-2 border border-[var(--card-border)]">Prinsipp</th>
                  <th className="text-left px-3 py-2 border border-[var(--card-border)]">Hvordan det hjelper testing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">SRP — Single Responsibility</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Klasser med ÉN grunn til å endres er enklere å teste — du tester ett ansvar, ikke fem.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">OCP — Open/Closed</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Du legger til nye testtilfeller uten å måtte endre eksisterende klasser/tester.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">LSP — Liskov Substitution</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Subklasser kan testes med samme testene som superklassen.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">ISP — Interface Segregation</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Små grensesnitt = enkle å mocke. Slipper å implementere 20 metoder for å teste én.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">DIP — Dependency Inversion</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Klassen avhenger av interfaces, ikke konkrete klasser → du kan injecte mocks/stubs i test.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">High Cohesion (GRASP)</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Klasse som gjør én ting godt → tester blir korte og handler om én ting.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-[var(--card-border)] font-semibold">Low Coupling (GRASP)</td>
                  <td className="px-3 py-2 border border-[var(--card-border)]">Få avhengigheter → få testdoubles trengs.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
              Tommelfingerregel
            </p>
            <p className="text-sm leading-relaxed">
              Hvis testen din krever 6 mocks og 50 linjer setup, er det <em>ikke</em> testen som
              er problemet — det er klassen du tester som har for mange ansvar / for mye kobling.
              Refaktorer klassen. God design = enkel testing.
            </p>
          </div>
        </TheorySummary>
      </section>
    </div>
  );
}
