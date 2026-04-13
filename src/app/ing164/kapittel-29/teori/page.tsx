"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { FaradayCalculator, MovingConductorVisualizer, ACGeneratorVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Teorisammendrag</h2>

      {/* 29.1 Induksjonsforsøk */}
      <TheorySummary
        title="29.1 Induksjonsforsøk"
        mustKnow={[
          "Endring i magnetisk fluks gjennom en strømsløyfe induserer en EMF",
          "Det spiller ingen rolle HVORDAN fluksen endres — resultatet er det samme",
          "Tre måter å endre fluks: endre B, endre A, eller endre vinkel φ",
          "Konstant B gjennom en sløyfe gir null EMF — bare ENDRINGEN teller",
        ]}
        defaultOpen
      >
        <p>
          Faraday og Henry oppdaget uavhengig av hverandre på 1830-tallet at endringer i magnetfelt
          kan skape elektrisk strøm. Flere forsøk med strømsløyfer plassert i magnetfelt viser det samme:
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hvorfor induseres EMF?</p>
          <p className="text-sm">
            En endring i magnetisk fluks <InlineLatex latex="\Phi_B" /> gjennom en strømsløyfe skaper en
            elektromotorisk spenning (EMF) <InlineLatex latex="\mathcal{E}" /> i sløyfen. Det er ikke
            selve B-feltet som gir EMF — det er <em>endringen</em>. Tenk på det slik: det er bevegelsen
            til en magnet, ikke magneten i seg selv, som driver strøm.
          </p>
        </div>

        <p className="mt-3">
          Husker du magnetisk fluks fra kapittel 27?{" "}
          <InlineLatex latex="\Phi_B = BA\cos\varphi" />, der φ er vinkelen mellom{" "}
          <InlineLatex latex="\vec{B}" /> og normalvektoren til flaten. For å endre fluksen kan vi:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Endre feltstyrken B</strong> — f.eks. flytte en magnet nærmere/lenger bort</li>
          <li><strong>Endre strømsløyfens areal A</strong> — f.eks. en stav som glir langs skinner</li>
          <li><strong>Endre vinkelen φ</strong> mellom felt og strømsløyfe — f.eks. rotere sløyfen</li>
        </ul>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på magnetisk fluks som «antall feltlinjer som stikker gjennom sløyfen». Hvis du skyver
            flere feltlinjer gjennom (øker Φ), kjemper sløyfen imot ved å lage sin egen strøm som
            motvirker endringen — akkurat som en fjær som motarbeider kompresjon. Stopper du å skyve,
            stopper motstanden.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Vanlig misforståelse</p>
          <p className="text-sm">
            «Et magnetfelt gjennom en sløyfe gir EMF» — <strong>NEI!</strong> Det er et{" "}
            <em>endring</em> i magnetisk fluks som gir EMF. Et konstant B-felt gjennom en ubevegelig
            sløyfe gir absolutt null EMF. Magneten må flytte seg (eller sløyfen må bevege seg, eller
            feltet må variere) for at induksjon skal skje.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap 21–28</p>
          <p className="text-sm">
            Dette lukker sirkelen: bevegelige ladninger (strøm) lager B-felt (kap 28), og et endret
            B-felt lager E-felt (Faraday, dette kapittelet). Elektrisitet og magnetisme er to sider av
            samme mynt — det er Maxwells ligninger som forener dem til elektromagnetisme.
          </p>
        </div>
      </TheorySummary>

      {/* Faraday Calculator visualization embedded here */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Utforsk Faradays lov interaktivt — juster B, areal og vinkel og se fluksendring og indusert EMF:
        </p>
        <FaradayCalculator />
      </div>

      {/* 29.2 Faradays lov */}
      <TheorySummary
        title="29.2 Faradays lov"
        mustKnow={[
          "Faradays lov: ε = −dΦ_B/dt",
          "For N vindinger: ε = −N · dΦ_B/dt",
          "Minustegnet uttrykker Lenz' lov (neste seksjon)",
          "Enheter: [ε] = V, [Φ] = Wb, [dΦ/dt] = Wb/s = V",
          "EMF er en spenning (energi per ladning), ikke en kraft",
        ]}
      >
        <p>
          Faraday oppsummerte alle forsøk med elektromagnetisk induksjon i én lov:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -\frac{d\Phi_B}{dt}"
          title="Faradays lov"
          variant="gold"
          description="Den induserte EMF-en er lik den negative tidsderiverte av magnetisk fluks gjennom sløyfen."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hvorfor dΦ/dt og ikke bare Φ?</p>
          <p className="text-sm">
            EMF-en avhenger av <em>hvor raskt</em> fluksen endrer seg, ikke av hvor stor den er.
            En enorm fluks gjennom en sløyfe som ikke endrer seg → null EMF. En liten fluks som endrer
            seg raskt → stor EMF. Parallellen til mekanikk: kraft er <InlineLatex latex="dE/dx" />, ikke
            energien selv.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Vanlig misforståelse: «EMF er en kraft»</p>
          <p className="text-sm">
            Navnet «elektromotorisk kraft» er misvisende — EMF er <strong>ikke</strong> en kraft.
            Det er en spenning (volt = joule per coulomb), altså energi per ladningsenhet. Tenk på det
            som et batteris spenning: det driver strøm, men er ikke selv en kraft.
          </p>
        </div>

        <p className="mt-3">
          Dersom strømsløyfen er en <strong>spole med N vindinger</strong>:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -N\frac{d\Phi_B}{dt}"
          title="Faradays lov for spole med N vindinger"
          variant="gold"
          description="Hver vinding bidrar med sin fluksendring. N vindinger gir N ganger så stor EMF."
        />

        <p className="mt-3">
          Siden <InlineLatex latex="\Phi_B = BA\cos\varphi" />, kan vi skrive:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -N\frac{d}{dt}(BA\cos\varphi)"
          variant="blue"
          description="Nå ser vi tydelig: fluksen endres hvis B endres, A endres, eller φ endres."
        />

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Praktisk tips: Tre måter å indusere EMF</p>
          <ul className="text-sm space-y-1 mt-1 list-disc list-inside">
            <li><strong>Beveg en magnet</strong> mot/fra en spole → B gjennom spolen endres</li>
            <li><strong>Endre arealet</strong> til sløyfen (f.eks. en glidende stav på skinner) → A endres</li>
            <li><strong>Roter sløyfen</strong> i et konstant B-felt → vinkel φ = ωt endres → sinusformet EMF</li>
          </ul>
          <p className="text-sm mt-2">
            Alle tre gir <InlineLatex latex="d\Phi_B/dt \neq 0" /> og dermed indusert EMF.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Retning på indusert EMF — fire steg</p>
          <ol className="text-sm space-y-1">
            <li>1. Velg en positiv retning for arealvektoren <InlineLatex latex="\hat{n}" /></li>
            <li>2. Bruk <InlineLatex latex="\vec{B}" /> og <InlineLatex latex="\hat{n}" /> til å finne fortegnet til <InlineLatex latex="\Phi_B" /> og <InlineLatex latex="d\Phi_B/dt" /></li>
            <li>3. Bestem fortegnet til <InlineLatex latex="\mathcal{E}" /> fra Faradays lov</li>
            <li>4. Bestem strømretning: positiv <InlineLatex latex="\mathcal{E}" /> → strøm i positiv retning (høyrehåndsregel)</li>
          </ol>
        </div>
      </TheorySummary>

      {/* 29.3 Lenz' lov */}
      <TheorySummary
        title="29.3 Lenz' lov"
        mustKnow={[
          "Lenz' lov: Induserte effekter motvirker alltid sin årsak",
          "Øker fluks → indusert strøm lager felt som motvirker økningen",
          "Minker fluks → indusert strøm lager felt som prøver å opprettholde fluksen",
          "Den induserte strømmen motvirker ENDRINGEN i fluks, ikke selve B-feltet",
          "Lenz' lov er en konsekvens av energibevaring",
        ]}
      >
        <p>
          Minustegnet i Faradays lov (<InlineLatex latex="\mathcal{E} = -d\Phi_B/dt" />) har en
          dyp fysisk betydning som kalles <strong>Lenz&apos; lov</strong>:
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 text-center text-lg">
            Retningen på alle effekter av magnetisk induksjon vil være slik at de <em>motvirker</em> sin årsak.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hvorfor det negative fortegnet? — Energibevaring</p>
          <p className="text-sm">
            Lenz&apos; lov er egentlig energibevaring i forkledning. Tenk deg det motsatte: at den induserte
            strømmen <em>forsterket</em> fluksendringen. Da ville en liten endring gi mer strøm → mer fluks →
            mer strøm → mer fluks... En uendelig energisyklus uten noen energikilde — perpetuum mobile!
            Minustegnet hindrer dette. For å skape induksjon <em>må</em> du gjøre mekanisk arbeid mot
            den motrettede kraften.
          </p>
        </div>

        <p className="mt-3">Praktisk betyr Lenz&apos; lov:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Fluks øker</strong> (f.eks. B-felt inn i sløyfen øker):
            → Indusert strøm lager B-felt <em>ut av</em> sløyfen (motvirker økningen)
            → Strøm <em>mot</em> klokka (sett fra B-retning)
          </li>
          <li>
            <strong>Fluks minker</strong> (f.eks. B-felt inn i sløyfen minker):
            → Indusert strøm lager B-felt <em>inn i</em> sløyfen (prøver å opprettholde)
            → Strøm <em>med</em> klokka
          </li>
        </ul>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Hverdagsanalogi — honning</p>
          <p className="text-sm">
            Lenz&apos; lov er som å skyve noe gjennom honning: den motarbeider alltid bevegelsen din.
            Skyv en magnet mot en spole → spolen «blir» en magnet som dytter tilbake.
            Trekk magneten bort → spolen «blir» en magnet som trekker mot deg. Det er
            alltid motstand, aldri hjelp — akkurat som honning.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi for å finne strømretning</p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Spør: øker eller minker fluksen gjennom sløyfen?</li>
            <li>Det induserte B-feltet motvirker <em>endringen</em>: øker Φ → B<sub>ind</sub> motsatt. Minker Φ → B<sub>ind</sub> samme retning</li>
            <li>Bruk høyrehåndsregelen: krøll fingrene i strømretningen → tommelen peker i B<sub>ind</sub>-retningen</li>
          </ol>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Vanlig misforståelse</p>
          <p className="text-sm">
            «Den induserte strømmen motvirker B-feltet» — <strong>NEI!</strong> Den motvirker{" "}
            <em>endringen</em> i fluks. Hvis B-feltet avtar, lager den induserte strømmen et felt i{" "}
            <em>samme</em> retning som B for å prøve å opprettholde fluksen. Den hjelper altså B
            i det tilfellet, men motvirker <em>reduksjonen</em>.
          </p>
        </div>
      </TheorySummary>

      {/* Moving Conductor visualization embedded */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Se Lenz&apos; lov i aksjon — staven beveger seg og induserer strøm:
        </p>
        <MovingConductorVisualizer />
      </div>

      {/* 29.4 EMF fra leder i bevegelse */}
      <TheorySummary
        title="29.4 EMF fra leder i bevegelse (bevegelig EMF)"
        mustKnow={[
          "Rett leder med fart v i felt B: ε = vBL (gjelder når v ⊥ B ⊥ L)",
          "Utledning: magnetisk kraft F = qvB driver ladninger langs lederen",
          "Effekt: P = ε²/R = B²L²v²/R (energi fra mekanisk arbeid)",
          "Faradays diskdynamo: ε = ½ωBR²",
          "Roterende spole: ε = NABω sin(ωt) — grunnlaget for vekselstrøm",
        ]}
      >
        <p>
          Anta at en rett lederstav med lengde L beveger seg med fart v vinkelrett på et uniformt
          magnetfelt B (som peker inn i arket). Ladningene i staven opplever en magnetisk kraft{" "}
          <InlineLatex latex="\vec{F} = q\vec{v} \times \vec{B}" />, som skyver dem langs staven.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hvorfor oppstår det en spenning?</p>
          <p className="text-sm">
            Den magnetiske kraften <InlineLatex latex="F = qvB" /> skiller positive og negative ladninger
            i den bevegelige lederen — akkurat som et batteri skiller ladninger kjemisk. Lederen «blir»
            et batteri så lenge den beveger seg. Stopper bevegelsen, stopper ladningsseparasjonen og
            dermed spenningen. Dette er kjernen i alle elektriske generatorer.
          </p>
        </div>

        <FormulaBox
          latex="\mathcal{E} = vBL"
          title="Bevegelig EMF — rett leder"
          variant="gold"
          description="v = lederens fart, B = feltstyrke, L = lederens lengde. Gjelder når v ⊥ B ⊥ L."
        />

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Analogi — kraftverkets generator</p>
          <p className="text-sm">
            En metallstav som glir på skinner i et B-felt er i prinsippet en elektrisk generator.
            Skyv staven → strøm flyter i kretsen. Det er akkurat slik kraftverk virker, men med
            roterende spoler i stedet for glidende staver. Mekanisk energi (fra vann, damp, vind)
            → elektrisk energi via induksjon.
          </p>
        </div>

        <p className="mt-3">
          Dette resultatet er helt konsistent med Faradays lov. Arealet til kretsen øker med{" "}
          <InlineLatex latex="dA/dt = Lv" />, så:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -\frac{d\Phi_B}{dt} = -B\frac{dA}{dt} = -BLv"
          variant="blue"
          description="Faraday og kraftanalysen gir nøyaktig samme svar — bevegelig EMF er Faradays lov anvendt på en bevegelig leder."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Sammenheng: To tilnærminger, samme svar</p>
          <p className="text-sm">
            <InlineLatex latex="\mathcal{E} = BLv" /> (fra kraftanalyse) og{" "}
            <InlineLatex latex="\mathcal{E} = -d\Phi_B/dt" /> (Faraday) gir identisk resultat.
            Dette er ikke tilfeldig — bevegelig EMF <em>er</em> Faradays lov. Det viser at Faradays lov
            er universell: uansett årsak til fluksendringen, gir den alltid riktig EMF.
          </p>
        </div>

        <p className="mt-3">
          Dersom staven er koblet til en krets med resistans R, flyter strøm og det gjøres arbeid:
        </p>

        <FormulaBox
          latex="P = \frac{\mathcal{E}^2}{R} = \frac{B^2L^2v^2}{R}"
          title="Effekt i kretsen"
          variant="blue"
          description="Energien kommer fra det mekaniske arbeidet som gjøres for å holde staven i bevegelse mot den magnetiske bremsekreftens motstand."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Roterende spole → Vekselstrøm</p>
          <p className="text-sm">
            En spole med N vindinger, areal A, roterer med vinkelfart ω i et uniformt felt B.
            Vinkelen endres som <InlineLatex latex="\varphi = \omega t" />, som gir:
          </p>
          <FormulaBox
            latex="\mathcal{E} = NAB\omega\sin(\omega t) = \mathcal{E}_0\sin(\omega t)"
            title="Vekselstrømgenerator"
            variant="gold"
            description="Sinusformet spenning med amplitude ε₀ = NABω — dette er grunnlaget for all vekselstrøm (AC)."
          />
          <p className="text-sm mt-2">
            EMF er størst når spolen er parallell med B-feltet (φ = 90°, sin = 1), og null når spolen
            er vinkelrett på B (φ = 0°, sin = 0) — intuitivt fordi fluksen endres raskest halvveis.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Faradays diskdynamo — likestrøm</p>
          <p className="text-sm">
            En metallskive (radius R) roterer med konstant vinkelfart ω i et uniformt magnetfelt B.
            Hvert punkt på skiven beveger seg med fart v = ωr, og integrert fra sentrum til kanten:
          </p>
          <FormulaBox
            latex="\mathcal{E} = \int_0^R \omega r B\,dr = \frac{1}{2}\omega B R^2"
            title="Faradays diskdynamo"
            variant="gold"
            description="Gir konstant likestrøm (DC) — vinkelen mellom v og B er konstant overalt, så EMF-en varierer ikke med tid."
          />
        </div>
      </TheorySummary>

      {/* AC Generator visualization embedded */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Utforsk vekselstrømgeneratoren — juster N, B, radius og ω og se EMF-kurven:
        </p>
        <ACGeneratorVisualizer />
      </div>

      {/* 29.5 Selv-induksjon og induktans */}
      <TheorySummary
        title="29.5 Selv-induksjon og induktans"
        mustKnow={[
          "Selv-induksjon: en spole som motvirker endringer i sin egen strøm",
          "ε = −L · dI/dt (induktansen L måler motstanden mot strømendring)",
          "For solenoid: L = μ₀n²Al (proporsjonal med n², tverrsnitt og lengde)",
          "Energi lagret i induktor: U = ½LI² (lagret i magnetfeltet)",
          "Induktorer blokkerer ENDRINGER i strøm, ikke likestrøm i seg selv",
        ]}
      >
        <p>
          Hittil har vi sett at en <em>ytre</em> fluksendring induserer EMF i en krets.
          Men en spole som fører en varierende strøm skaper et B-felt som endres — og dette
          endrede B-feltet gjennom <em>spolen selv</em> induserer en EMF i spolen. Dette kalles{" "}
          <strong>selv-induksjon</strong>.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hvorfor induktans?</p>
          <p className="text-sm">
            En spole som fører en strøm I skaper et B-felt gjennom seg selv. Fluksen er proporsjonal
            med I: <InlineLatex latex="\Phi_B = LI" />. Endres I, endres Φ, og Faradays lov gir en
            selv-indusert EMF. Induktansen L måler <em>hvor sterkt</em> spolen motvirker strømendring.
            Stor L → sterk motstand mot endring. Liten L → svak motstand.
          </p>
        </div>

        <FormulaBox
          latex="\mathcal{E} = -L\frac{dI}{dt}"
          title="Selv-induksjon"
          variant="gold"
          description="L = induktans [henry, H]. Minustegnet (Lenz' lov): EMF-en motvirker strømendringen. Øker I → EMF motvirker økningen."
        />

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Analogi — induktans er treghet for strøm</p>
          <p className="text-sm">
            Induktans er nøyaktig som treghetsmoment (eller masse) — men for strøm. Sammenlign:
          </p>
          <div className="mt-2 text-sm font-mono grid grid-cols-2 gap-x-4">
            <span className="font-semibold">Mekanikk</span>
            <span className="font-semibold">Elektromagnetisme</span>
            <span>Masse m → treghet</span>
            <span>Induktans L → elektrisk treghet</span>
            <span>Fart v</span>
            <span>Strøm I</span>
            <span>Kraft F = ma</span>
            <span>EMF <InlineLatex latex="\mathcal{E} = L\,dI/dt" /></span>
            <span>Kin. energi ½mv²</span>
            <span>Lagret energi ½LI²</span>
          </div>
          <p className="text-sm mt-2">
            Akkurat som en tung ball er vanskelig å stoppe, er en stor induktans vanskelig å
            «stoppe» raskt — den kjemper imot.
          </p>
        </div>

        <p className="mt-3">
          For en <strong>solenoid</strong> med n vindinger per meter, tverrsnitt A og lengde l:
        </p>

        <FormulaBox
          latex="L = \mu_0 n^2 A l"
          title="Induktans for solenoid"
          variant="blue"
          description="n = vindinger per meter, A = tverrsnitt [m²], l = lengde [m]. Merk: L ∝ n² — dobler du vindingstallet, firedobler du induktansen."
        />

        <p className="mt-3">
          Energien lagret i induktoren (i magnetfeltet) er:
        </p>

        <FormulaBox
          latex="U = \frac{1}{2}LI^2"
          title="Energi lagret i induktor"
          variant="gold"
          description="Analog til ½CV² for en kondensator. Energien er lagret i magnetfeltet inne i spolen."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Sammenheng med kap 24 — Kondensator vs. induktor</p>
          <div className="text-sm mt-1 grid grid-cols-2 gap-x-4">
            <span className="font-semibold">Kondensator (kap 24)</span>
            <span className="font-semibold">Induktor (kap 29)</span>
            <span>Kapasitans C</span>
            <span>Induktans L</span>
            <span>Lagrer energi i E-felt</span>
            <span>Lagrer energi i B-felt</span>
            <span><InlineLatex latex="U = \tfrac{1}{2}CV^2" /></span>
            <span><InlineLatex latex="U = \tfrac{1}{2}LI^2" /></span>
            <span>Motvirker spenningsendring</span>
            <span>Motvirker strømendring</span>
            <span><InlineLatex latex="I = C\,dV/dt" /></span>
            <span><InlineLatex latex="\mathcal{E} = -L\,dI/dt" /></span>
          </div>
          <p className="text-sm mt-2">
            De er duale størrelser — to sider av den elektromagnetiske mynten.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Vanlig misforståelse: «Induktorer blokkerer strøm»</p>
          <p className="text-sm">
            Induktorer blokkerer <strong>ikke</strong> strøm — de blokkerer <em>endringer</em> i strøm.
            Likestrøm (DC) flyter fritt gjennom en induktor (den er bare en ledning med motstand ≈ 0).
            Det er raten <InlineLatex latex="dI/dt" /> som skaper den motvirkende EMF-en.
            En konstant DC gir <InlineLatex latex="dI/dt = 0" /> → ingen selv-indusert EMF.
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
