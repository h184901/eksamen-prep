"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";
import {
  DomainMonopol,
  DomainMaxMummelmann,
  DomainEksamen,
} from "@/components/dat109/UmlDiagrams";

export default function DomenePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/modellering" className="hover:text-[var(--accent)]">Modellering</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Domenemodell</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Domenemodell</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Konseptuelt klassediagram fra virkeligheten — klasser, attributter, assosiasjoner og
          multiplisitet. Oppgave 1b på eksamen.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          DOMENEMODELL
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="2. Domenemodell (klassediagram for analyse)"
        mustKnow={[
          "Finne konseptuelle klasser fra substantiv i oppgaveteksten",
          "Tegne klasser med attributter — ALDRI med metoder",
          "Tegne assosiasjoner med korrekt multiplisitet",
          "Forskjellen mellom assosiasjon, aggregering, komposisjon og arv",
          "Bruke arv/generalisering der det er tydelige undertyper",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Hva er en domenemodell?</h3>
        <p>
          En domenemodell er et <strong>klassediagram med konseptuelle klasser</strong> som
          representerer den <strong>virkelige verden</strong>, ikke programvare. Den viser
          objekter, attributter og relasjoner fra problemdomenet.
        </p>

        {/* Domenemodell vs utformingsmodell */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Domenemodell vs. Utformingsmodell</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Domenemodell (oppgave 1b)</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Konsepter fra virkeligheten</li>
                <li><strong>Ingen metoder</strong></li>
                <li>Bare klassenavn, attributter, assosiasjoner</li>
                <li>Multiplisitet på alle assosiasjoner</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Utformingsmodell (oppgave 4)</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Programvare-klasser</li>
                <li><strong>Med metoder</strong></li>
                <li>Synlighet (+, -, #), datatyper</li>
                <li>Navigasjonspiler (retning)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            Professorens eksplisitte regel (2021-fasit):
          </h4>
          <p className="text-sm italic">
            «En domenemodell gir et statisk bilde av den verden som vi skal modellere og seinere
            programmere og derfor er det <strong>ingen metoder i domenemodellen</strong>.»
          </p>
        </div>

        {/* Hvordan finne klasser */}
        <h3 className="text-lg font-bold">Hvordan finne konseptuelle klasser</h3>
        <p>
          Professorens metode (fra Larman): <strong>finn substantivene</strong> i oppgaveteksten!
          Understrek alle substantiver — disse er sterke kandidater for klasser.
        </p>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Eksempel: Substantiv-analyse for Skyjo (eksamen 2024)
          </h4>
          <p className="text-sm mb-2">
            «<u>Spillet</u> er et <u>kortspill</u> som spilles av 2 til 8 <u>spillere</u>.
            <u>Spillet</u> går over flere <u>omganger</u>. <u>Spillet</u> inneholder 150 <u>kort</u>
            med et tall som er <u>poeng</u>. En <u>blokk</u> for å notere poeng.
            <u>Kastehaugen</u>.»
          </p>
          <p className="text-sm font-semibold">
            Klasser: Spill, Spiller, Kort, Kortstokk/Kastehaug, Omgang, Poengblokk
          </p>
        </div>

        {/* Assosiasjonstyper */}
        <h3 className="text-lg font-bold">Assosiasjonstyper</h3>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 p-3 my-3">
          <p className="text-sm">
            <strong>Atles regel:</strong> aggregering og komposisjon hører normalt
            <strong> ikke</strong> hjemme i domenemodellen — disse hører til
            <strong> utformingsmodell og DCD</strong>. I domenemodellen bruker du vanlig
            assosiasjon (strek) med multiplisitet, og spesialisering der det er tydelige
            undertyper. Tabellen under viser likevel alle fire — slik at du kjenner igjen
            symbolene når du møter dem i utformingsmodeller.
          </p>
        </div>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Type</th>
                <th className="text-left py-2 pr-4 font-semibold">Symbol</th>
                <th className="text-left py-2 font-semibold">Beskrivelse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-medium">Enkel assosiasjon</td>
                <td className="py-2 pr-4">Strek (———)</td>
                <td className="py-2">To klasser er relatert. Brukes oftest.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Aggregering</td>
                <td className="py-2 pr-4">Åpen diamant (◇———)</td>
                <td className="py-2">«Har»-relasjon. Delene kan eksistere uavhengig.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Komposisjon</td>
                <td className="py-2 pr-4">Fylt diamant (◆———)</td>
                <td className="py-2">Sterk «eier»-relasjon. Delene forsvinner hvis helheten slettes. F.eks. Brett ◆— Rute.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Arv/generalisering</td>
                <td className="py-2 pr-4">Trekant-pil (△)</td>
                <td className="py-2">«Er-en»-relasjon. Subklasser arver fra superklasse. F.eks. StartRute arver fra Rute.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Multiplisitet */}
        <h3 className="text-lg font-bold">Multiplisitet</h3>
        <p className="mb-2">
          <strong>Alltid påkrevd!</strong> Professoren trekker for manglende multiplisitet.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Notasjon</th>
                <th className="text-left py-2 font-semibold">Betydning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr><td className="py-1.5 pr-4 font-mono">1</td><td className="py-1.5">Nøyaktig én</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">*</td><td className="py-1.5">Null til mange (0..∞)</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">0..1</td><td className="py-1.5">Null eller én</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">1..*</td><td className="py-1.5">Én eller flere</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">2..8</td><td className="py-1.5">Mellom to og åtte</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">40</td><td className="py-1.5">Nøyaktig 40</td></tr>
            </tbody>
          </table>
        </div>

        {/* Når bruke arv */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Når bruke arv i domenemodellen?</h4>
          <p className="text-sm mb-2">Professorens retningslinjer (F06):</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Subklassen har <strong>ekstra attributter</strong></li>
            <li>Subklassen har <strong>ekstra assosiasjoner</strong></li>
            <li>Subklassen <strong>oppfører seg annerledes</strong></li>
            <li>Subklassen representerer noe <strong>konseptuelt ulikt</strong></li>
          </ul>
          <p className="text-sm mt-2 text-[var(--muted)]">
            I mange spilloppgaver på eksamen trenger du IKKE arv i domenemodellen. Bruk det kun
            hvis det er tydelige undertyper (f.eks. ulike rutetyper i Monopol).
          </p>
        </div>

        {/* Oppskrift */}
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Steg-for-steg: Slik lager du domenemodellen på eksamen
          </h4>
          <ol className="text-sm list-decimal list-inside space-y-2">
            <li><strong>Understrek alle substantiver</strong> i oppgaveteksten — dette er klassekandidater.</li>
            <li><strong>Filtrer:</strong> Fjern trivielle ting (tall, farger) som bør være attributter, ikke klasser.</li>
            <li><strong>Legg til attributter</strong> på hver klasse (egenskaper som navn, verdi, pris).</li>
            <li><strong>Tegn assosiasjoner</strong> mellom klassene. Spør: «Må systemet huske denne relasjonen?»</li>
            <li><strong>Legg til multiplisitet</strong> på ALLE assosiasjoner.</li>
            <li><strong>Vurder arv</strong> bare hvis det er tydelige undertyper.</li>
            <li><strong>Sjekk konsistens</strong> med brukstilfellebeskrivelsen — alle konsepter bør være med.</li>
          </ol>
        </div>

        {/* ── Eksempel: Monopol domenemodell ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel: Monopol — domenemodell (endelig versjon)</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra F05–F06 — utviklet over 3 iterasjoner</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <DomainMonopol />
          </div>
          <div className="mt-3 text-sm space-y-2">
            <p><strong>Klasser:</strong> Monopol, Brett, Spiller, Kopp, Terning, Brikke, Rute (abstrakt) med subklasser StartRute, VanligRute, InntektsskattRute, DeSettesIFengselRute, SkjøteRute (abstrakt) med subklasser EiendomRute, JernbaneRute, OffentligRute.</p>
            <p><strong>Nøkkelpunkter:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 text-sm">
              <li>Brett eier 40 Ruter (komposisjon, 1:40)</li>
              <li>Kopp er «ren fabrikkering» — finnes ikke i virkeligheten</li>
              <li>Arv brukt for rutetyper (de har ulik oppførsel)</li>
              <li>SkjøteRute har ekstra assosiasjon Eier → Spiller (0..1:*)</li>
            </ul>
          </div>
        </div>

        {/* ── Eksempel: Max Mümmelmann domenemodell ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Max Mümmelmann (vår 2023)</h3>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Professorens domenemodell — fasit</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <DomainMaxMummelmann />
          </div>
          <div className="mt-3 text-sm">
            <p><strong>Klasser:</strong> MaxMummelmann, Brett, Rute, Spiller, Kort, Terning, Brikke</p>
            <p className="mt-1"><strong>Attributter:</strong> Terning.verdi, Kort.nummer, Spiller.navn</p>
            <p className="mt-1"><strong>Multiplisitet:</strong> 2..4 spillere, 0..6 kort per spiller, 8 ruter på brettet</p>
          </div>
        </div>

        {/* ── Eksempel: Eksamenssystem domenemodell ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Eksamenssystem (2020)</h3>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Professorens domenemodell — fasit</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <DomainEksamen />
          </div>
          <div className="mt-3 text-sm">
            <p><strong>8 klasser:</strong> Lærer, Student, Oppgave, Eksamen, Spørsmål, Svaralternativ, Besvarelse, Svar</p>
            <p className="mt-1">Merk: Svar (det studenten gir, med kryss:boolsk) vs Svaralternativ (mulige valg, med riktig:boolsk).</p>
          </div>
        </div>

        {/* Vanlige feil */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">Vanlige feil</h4>
          <ul className="text-sm space-y-1.5">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Metoder i domenemodellen</strong> — aldri! Domenemodellen er analyse, ikke design.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Manglende multiplisitet</strong> — professoren trekker for dette. Alle assosiasjoner MÅ ha multiplisitet.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>For få klasser</strong> — du har sannsynligvis oversett substantiver i teksten.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>For mange klasser</strong> — trivielle ting som «tall», «farge», «tekst» er attributter, ikke klasser.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Bruker fremmednøkler</strong> som attributter i stedet for assosiasjonslinjer — dette er OOAD, ikke database.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Inkonsistens</strong> med brukstilfellebeskrivelsen — alle konsepter nevnt i brukstilfellene bør finnes i domenemodellen.</span>
            </li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          SPESIALISERING — ATLES REGEL
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="3. Spesialisering i domenemodellen — Atles regel"
        mustKnow={[
          "Domenemodell: bruk vanlig assosiasjon + multiplisitet, og spesialisering ved tydelige undertyper",
          "IKKE bruk aggregering/komposisjon i domenemodell — det hører til utformingsmodell/DCD",
          "Spesialisering brukes kun når subklassene faktisk er ulike (oppførsel, attributter, assosiasjoner)",
          "Et størrelses-attributt (Small/Medium/Large) er IKKE en spesialisering",
        ]}
      >
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-2">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            KRITISK regel fra professor Atle Geitung
          </h4>
          <p className="text-sm">
            Atle sier eksplisitt: i <strong>domenemodellen</strong> skal du normalt
            <strong> IKKE bruke aggregering eller komposisjon</strong>. Disse hører til
            <strong> utformingsmodell og DCD</strong>. I domenemodellen bruker du
            <strong> vanlige assosiasjoner med multiplisitet</strong> og
            <strong> SPESIALISERING (arv)</strong> der subklassene faktisk er ulike.
          </p>
          <p className="text-sm mt-2">
            Bruker du komposisjon eller aggregering i domenemodellen uten klar grunn, kan
            det <strong>koste deg poeng på eksamen</strong>.
          </p>
        </div>

        <h3 className="text-lg font-bold mt-4">Hva er spesialisering?</h3>
        <p>
          <strong>Spesialisering</strong> (også kalt <em>generalisering</em> eller arv) er en
          <strong> «er-en»-relasjon</strong>: subklassen ER en variant av superklassen, men har
          noe ekstra eller annerledes. UML-symbolet er en
          <strong> åpen trekant</strong> som peker fra subklassen mot superklassen.
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3 text-sm">UML-symbol: åpen trekant peker mot superklassen</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <SpesialiseringSvg />
          </div>
        </div>

        <h3 className="text-lg font-bold">Når BRUKER du spesialisering i domenemodellen?</h3>
        <p className="text-sm mb-2">
          Atles retningslinjer fra F06 — bruk spesialisering hvis <strong>minst én</strong> av
          disse stemmer:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Subklassen har <strong>ekstra attributter</strong> som superklassen ikke har.</li>
          <li>Subklassen har <strong>ekstra assosiasjoner</strong> til andre klasser.</li>
          <li>Subklassen <strong>oppfører seg annerledes</strong> (polymorfi — samme metode, ulik effekt).</li>
          <li>Subklassen representerer noe <strong>konseptuelt ulikt</strong> i problemdomenet.</li>
        </ul>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Klassisk eksempel — Monopol (RIKTIG bruk)
          </h4>
          <p className="text-sm mb-2">
            <code>Rute</code> er abstrakt. Subklassene <code>StartRute</code>,
            <code> VanligRute</code>, <code>InntektsskattRute</code>, <code>SkjøteRute</code>
            er spesialiseringer — fordi de <strong>oppfører seg helt forskjellig</strong>
            når en spiller lander på dem:
          </p>
          <ul className="text-sm list-disc list-inside space-y-0.5">
            <li><code>StartRute</code> → spilleren får 4000 kr.</li>
            <li><code>InntektsskattRute</code> → spilleren betaler 10 % skatt.</li>
            <li><code>SkjøteRute</code> → spilleren kan kjøpe eller betale leie.</li>
            <li><code>VanligRute</code> → ingenting skjer.</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Polymorfi-test:</strong> kan vi tenke oss en metode <code>landetPå(Spiller)</code> som
            har <em>ulik kropp per subklasse</em>? Ja → spesialisering er riktig.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            Anti-eksempel — IKKE bruk spesialisering her
          </h4>
          <p className="text-sm mb-2">
            Et kortspill der kort kan være «små», «mellomstore» eller «store». Det er
            fristende å lage <code>SmallCard</code>, <code>MediumCard</code>,
            <code> LargeCard</code> — men det er FEIL.
          </p>
          <ul className="text-sm list-disc list-inside space-y-0.5">
            <li>De har samme attributter.</li>
            <li>De har ingen ulik oppførsel — størrelse er bare en verdi.</li>
            <li>De er ikke konseptuelt ulike — det er samme type kort.</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Riktig:</strong> én klasse <code>Kort</code> med attributtet
            <code> størrelse: Størrelse</code> (enum eller verdi).
          </p>
        </div>

        <h3 className="text-lg font-bold">Ja-bruk vs nei-bruk — sjekkliste</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Situasjon</th>
                <th className="text-left py-2 font-semibold">Bruk spesialisering?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4">Subklassen har et felt superklassen ikke har</td>
                <td className="py-2 text-green-700 dark:text-green-400 font-semibold">JA</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Subklassen har en relasjon superklassen ikke har</td>
                <td className="py-2 text-green-700 dark:text-green-400 font-semibold">JA</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Samme metode skal gjøre ulik ting per subtype</td>
                <td className="py-2 text-green-700 dark:text-green-400 font-semibold">JA</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Forskjellen er bare en attributtverdi (str, farge, navn)</td>
                <td className="py-2 text-red-700 dark:text-red-400 font-semibold">NEI — bruk attributt</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Forskjellen er en tilstand objektet skifter mellom over tid</td>
                <td className="py-2 text-red-700 dark:text-red-400 font-semibold">NEI — bruk tilstandshierarki/enum</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">«Det føles fint å ha mange klasser»</td>
                <td className="py-2 text-red-700 dark:text-red-400 font-semibold">NEI (bryter KISS/YAGNI)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">
            Sammendrag — hva du tegner i domenemodell
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>Vanlig assosiasjon (strek)</strong> + multiplisitet — standardvalget.</li>
            <li><strong>Spesialisering (åpen trekant)</strong> — når subklassene er reelt ulike.</li>
            <li><strong>Aggregering/komposisjon (diamanter)</strong> — kun unntaksvis, og kun hvis levetid eller eierskap er <em>kritisk</em> for forståelsen. Hører normalt i utformingsmodell.</li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}

/* ── SVG: Spesialisering — Rute med subklasser (illustrerer åpen trekant) ── */
function SpesialiseringSvg() {
  const stroke = "#22c55e";
  return (
    <svg viewBox="0 0 480 240" className="w-full max-w-md mx-auto" role="img" aria-label="Spesialisering — Rute med subklasser">
      {/* Superklasse */}
      <g>
        <rect x={180} y={10} width={120} height={50} fill="#faf5ff" stroke="#a855f7" strokeWidth={1.5} rx={3} />
        <rect x={180} y={10} width={120} height={24} fill="#f3e8ff" stroke="#a855f7" strokeWidth={1.5} rx={3} />
        <rect x={180.75} y={28} width={118.5} height={6} fill="#f3e8ff" />
        <line x1={180} y1={34} x2={300} y2={34} stroke="#a855f7" strokeWidth={1} />
        <text x={240} y={26} textAnchor="middle" fontSize={11} fontWeight={700} fontStyle="italic" fill="currentColor">
          <tspan fontSize={9} fontWeight={400}>{"«abstract» "}</tspan>Rute
        </text>
        <text x={186} y={50} fontSize={10} fill="currentColor">navn</text>
      </g>

      {/* Subklasser */}
      <g>
        <rect x={20} y={170} width={120} height={26} fill="#f0fdf4" stroke={stroke} strokeWidth={1.5} rx={3} />
        <text x={80} y={188} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">StartRute</text>
      </g>
      <g>
        <rect x={180} y={170} width={120} height={26} fill="#f0fdf4" stroke={stroke} strokeWidth={1.5} rx={3} />
        <text x={240} y={188} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">VanligRute</text>
      </g>
      <g>
        <rect x={340} y={170} width={120} height={26} fill="#f0fdf4" stroke={stroke} strokeWidth={1.5} rx={3} />
        <text x={400} y={188} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">FengselRute</text>
      </g>

      {/* Arv-pil med åpen trekant */}
      <line x1={240} y1={60} x2={240} y2={95} stroke={stroke} strokeWidth={1.5} />
      <polygon points="240,95 230,113 250,113" fill="white" stroke={stroke} strokeWidth={1.5} />
      {/* Buss */}
      <line x1={240} y1={113} x2={240} y2={135} stroke={stroke} strokeWidth={1.5} />
      <line x1={80} y1={135} x2={400} y2={135} stroke={stroke} strokeWidth={1.5} />
      <line x1={80} y1={135} x2={80} y2={170} stroke={stroke} strokeWidth={1.5} />
      <line x1={240} y1={135} x2={240} y2={170} stroke={stroke} strokeWidth={1.5} />
      <line x1={400} y1={135} x2={400} y2={170} stroke={stroke} strokeWidth={1.5} />

      {/* Forklaring */}
      <text x={240} y={222} textAnchor="middle" fontSize={10} fill="currentColor" fontStyle="italic">
        Åpen trekant peker mot superklassen — leses som «er-en»
      </text>
    </svg>
  );
}
