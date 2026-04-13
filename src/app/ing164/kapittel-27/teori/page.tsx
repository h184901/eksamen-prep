"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { LorentzForceCalculator, CircularMotionVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Magnetisk felt og krefter</h2>

      {/* 27.1 Magnetisme */}
      <TheorySummary
        title="27.1 Magnetisme og magnetfelt"
        mustKnow={[
          "Alle magneter har to poler: nordpol og sørpol",
          "Like poler frastøter, ulike poler tiltrekker",
          "Magnetiske poler opptrer alltid i par — man kan ikke isolere én pol (ingen magnetiske monopoler)",
          "Jordkloden er en stor magnet (geografisk nordpol ≈ magnetisk sørpol)",
          "Feltlinjer er lukkede kurver — de starter og slutter ikke",
        ]}
      >
        <p>
          Alle permanente magneter har to poler: <strong>nordpol (N)</strong> og <strong>sørpol (S)</strong>.
          Like poler frastøter hverandre, ulike poler tiltrekker — akkurat som elektriske ladninger,
          men med en viktig forskjell: man kan <em>aldri</em> separere polene. Bryter du en magnet i to,
          får du to mindre magneter, hver med N og S.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er B et vektorfelt?</p>
          <p className="text-sm">
            Akkurat som E-feltet, har magnetfeltet <strong>både størrelse og retning</strong> i hvert punkt i rommet.
            Men her slutter likheten: E-felt «starter» på positive ladninger og «slutter» på negative — de er åpne
            kurver. Magnetiske feltlinjer har derimot <strong>ingen start eller slutt</strong>; de er alltid
            lukkede sløyfer. Utenfor en magnet går de fra N til S, men inne i magneten fortsetter de fra S tilbake
            til N. Det finnes ingen «magnetisk monopol» som kan fungere som kilde eller sluk for B-feltet.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Vindmønstre rundt Jorden</p>
          <p className="text-sm">
            Tenk på B-feltlinjene som vindstrømmene rundt Jordens poler. Luften sirkulerer i lukkede
            sløyfer — den «starter» ikke et sted og «dør» ikke et annet sted. På samme måte sirkulerer
            magnetfeltlinjene i lukkede baner. Tettere «vindstrømer» (tettere feltlinjer) betyr sterkere
            felt, akkurat som tett pakket luft betyr sterk vind.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse: Feltlinjer slutter ved polene</p>
          <p className="text-sm">
            Mange tror at magnetfeltlinjer starter ved nordpolen og slutter ved sørpolen — dette er feil!
            Feltlinjene går fra N til S <em>utenfor</em> magneten, men de <em>fortsetter</em> gjennom magneten
            fra S tilbake til N. De er alltid lukkede kurver. Dette er en fundamental forskjell fra E-felt.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 21: E-felt vs. B-felt</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-1 pr-4">Elektrisk felt (kap. 21)</th>
                  <th className="text-left py-1">Magnetisk felt (kap. 27)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Kilde: elektriske ladninger</td>
                  <td className="py-1">Kilde: bevegede ladninger / strømmer</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Enkeltladninger finnes (+, −)</td>
                  <td className="py-1">Enkeltpoler finnes IKKE</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Feltlinjer: åpne kurver (+ → −)</td>
                  <td className="py-1">Feltlinjer: alltid lukkede sløyfer</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">Enhet: N/C = V/m</td>
                  <td className="py-1">Enhet: Tesla (T) = Vs/m²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-2 text-sm">
          <strong>Feltlinjekonvensjon i 2D:</strong> En prikk (·) betyr at feltet peker <em>ut av arket</em> mot deg
          (tenk: spissen på en pil). Et kryss (×) betyr at feltet peker <em>inn i arket</em> bort fra deg (tenk: halen på en pil).
        </p>
      </TheorySummary>

      {/* 27.2 Lorentzkraften */}
      <TheorySummary
        title="27.2 Magnetisk kraft på en ladet partikkel — Lorentzkraften"
        mustKnow={[
          "Magnetisk kraft: F = qv × B (kryssproduktet!)",
          "Størrelse: F = |q|vB sin θ",
          "Kraften er ALLTID vinkelrett på både v og B",
          "Retning: Høyrehåndsregel (for positiv ladning); snu for negativ",
          "Enhet for B: Tesla (T) = N·s/(C·m)",
          "Magnetkraften gjør ALDRI arbeid — den endrer retning, ikke fart",
        ]}
      >
        <p>
          Eksperimenter viser at det virker <strong>magnetiske krefter på ladede partikler som
          beveger seg i magnetfelt</strong>. Den totale kraften (elektrisk + magnetisk) kalles
          <strong> Lorentzkraften</strong>:
        </p>

        <FormulaBox
          latex="\vec{F} = q(\vec{E} + \vec{v} \times \vec{B})"
          title="Lorentzkraften (full form)"
          variant="gold"
          description="Summen av elektrisk kraft (qE) og magnetisk kraft (qv×B). I felt uten E-felt reduseres dette til F = qv×B."
        />

        <FormulaBox
          latex="\vec{F}_m = q\vec{v} \times \vec{B}"
          title="Magnetisk kraft alene"
          variant="gold"
          description="Kryssproduktet gir en kraft vinkelrett på BÅDE v og B. Retning fra høyrehåndsregelen."
        />

        <FormulaBox
          latex="F_m = |q| v B \sin\theta"
          title="Størrelsen av magnetkraften"
          variant="gold"
          description="θ er vinkelen mellom v og B. Maks kraft når θ = 90° (v ⊥ B). Null kraft når θ = 0° (v ∥ B)."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor kryssproduktet?</p>
          <p className="text-sm">
            Magnetkraften er <em>fundamentalt annerledes</em> enn elektrisk kraft. F = qE virker langs E-feltet.
            Men magnetkraften er alltid <strong>vinkelrett på begge</strong> v og B — og nettopp dette
            gjenspeiles i kryssproduktet. F = qvBsinθ forteller deg at: (1) kraften er null når partikkelen
            er i ro (v = 0), (2) kraften er null når v er parallell med B (sinθ = 0), og (3) kraften er
            maksimal når v er vinkelrett på B (sinθ = 1). Kryssproduktet pakker alt dette inn i én elegant formel.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Analogi: Sidevindens effekt på et fly</p>
          <p className="text-sm">
            Tenk på magnetfeltet som en sterk sidevind og partikkelen som et fly. Sidevinden gjør ikke
            flyet raskere eller saktere — den <em>avleder</em> det til siden. Det er nøyaktig slik B-feltet
            virker på bevegde ladninger: det endrer <strong>retningen</strong> av bevegelsen, aldri
            <strong> farten</strong>. Derav gjør magnetkraften aldri arbeid.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: Høyrehåndsregel for F = qv × B</p>
          <ol className="text-sm space-y-1">
            <li>1. Pek de fire fingrene i retning <strong>v</strong> (partikkelens fart)</li>
            <li>2. Bøy fingrene mot <strong>B</strong> (magnetfeltets retning)</li>
            <li>3. Tommelen peker i retning <strong>F</strong> for <em>positiv</em> ladning</li>
            <li>4. For <strong>negativ</strong> ladning: snu kraften 180° (F peker motsatt vei)</li>
          </ol>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>«Magnetkraften gjør arbeid»</strong> — Feil! Fordi F alltid er vinkelrett på v,
              er <InlineLatex latex="W = \vec{F} \cdot d\vec{s} = 0" /> alltid. Magnetkraften kan
              aldri endre kinetisk energi eller fart — bare retning.
            </li>
            <li>
              <strong>«En stillestående ladet partikkel kjenner magnetkraft»</strong> — Feil! F = qv×B
              krever at v ≠ 0. En ladet partikkel i ro i et rent B-felt opplever <em>ingen</em> kraft.
            </li>
            <li>
              <strong>«B-feltet gjør det samme som E-feltet»</strong> — Feil! E-felt akselererer partikler
              langs feltlinjene og gjør arbeid. B-felt avleder partikler vinkelrett og gjør null arbeid.
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 21: Elektrisk vs. magnetisk kraft</p>
          <p className="text-sm">
            I kap. 21 lærte vi <InlineLatex latex="\vec{F} = q\vec{E}" /> — kraften virker <em>langs</em> E-feltet,
            gjør arbeid, og kan endre kinetisk energi. Her i kap. 27 er kraften <em>vinkelrett</em> på B (og v),
            gjør null arbeid, og kan bare endre retning. De to feltene utfyller hverandre og kombineres i
            Lorentzkraften.
          </p>
        </div>

        {/* Inline visualisering */}
        <LorentzForceCalculator />
      </TheorySummary>

      {/* 27.3 Magnetiske feltlinjer og magnetisk fluks */}
      <TheorySummary
        title="27.3 Magnetiske feltlinjer og magnetisk fluks"
        mustKnow={[
          "Feltlinjer: alltid lukkede kurver, aldri start eller slutt",
          "Utenfor magneten: N → S. Inne i magneten: S → N",
          "Magnetisk fluks: Φ_B = BA cos φ",
          "Enhet for fluks: Weber (Wb) = T·m²",
          "Konvensjon: · = ut av arket, × = inn i arket",
        ]}
      >
        <p>
          Magnetfelt kan representeres med <strong>magnetiske feltlinjer</strong>.
          De er overalt parallelle med <InlineLatex latex="\vec{B}" />, og tettere linjer betyr
          sterkere felt.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Feltlinjekonvensjon</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Prikker (·)</strong> = magnetfeltet peker <strong>ut av arket</strong> (mot deg) — tenk spissen på en pil</li>
            <li>• <strong>Kryss (×)</strong> = magnetfeltet peker <strong>inn i arket</strong> (bort fra deg) — tenk halen på en pil</li>
            <li>• Huskeregel: prikk = pilspiss kommer mot deg, kryss = pilhale forsvinner fra deg</li>
          </ul>
        </div>

        <p className="mt-4"><strong>Magnetisk fluks</strong> gjennom en flate med areal A:</p>

        <FormulaBox
          latex="\Phi_B = B_\perp A = BA\cos\varphi"
          title="Magnetisk fluks"
          variant="gold"
          description="φ er vinkelen mellom B og flatens normalvektor. Enhet: Weber (Wb) = T·m². Maksimal fluks når B er vinkelrett på flaten (φ = 0)."
        />

        <p className="mt-2">
          Når B varierer over flaten: <InlineLatex latex="\Phi_B = \int B_\perp \, dA = \int B\cos\varphi \, dA" />
        </p>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Analogi: Fluks som «hvor mye felt» som går gjennom</p>
          <p className="text-sm">
            Tenk på magnetisk fluks som antall feltlinjer som passerer gjennom en flate. Hold en ramme
            rett mot feltet (vinkelrett) → flest feltlinjer, maksimal fluks. Vipp rammen sideveis
            → færre feltlinjer passerer gjennom → fluks × cos(φ) avtar. Vipp den 90° → ingen feltlinjer
            passerer gjennom → fluks = 0. Dette er akkurat hva cos(φ)-leddet beskriver.
          </p>
        </div>
      </TheorySummary>

      {/* 27.4 Bevegelse av ladede partikler */}
      <TheorySummary
        title="27.4 Bevegelse av ladede partikler i magnetfelt"
        mustKnow={[
          "v ⊥ B → sirkelbane med radius r = mv/(|q|B)",
          "Syklotronperiode: T = 2πm/(|q|B) — uavhengig av v!",
          "Vinkelfart: ω = |q|B/m (syklotronfrekvens)",
          "v ikke ⊥ B → spiralbane (heliks): r = mv⊥/(|q|B), v∥ endres ikke",
        ]}
      >
        <p>
          Siden magnetkraften alltid står vinkelrett på farten, kan den ikke endre fartens
          <em> verdi</em> — bare fartens <em>retning</em>. Når <InlineLatex latex="\vec{v} \perp \vec{B}" />,
          følger ladningen en <strong>sirkelbane</strong>.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor blir banen sirkelformet?</p>
          <p className="text-sm">
            Magnetkraften F er alltid vinkelrett på v (fra kryssproduktet). Det betyr at farten aldri
            øker eller minsker — bare retningen endres. Og en kraft som hele tiden er vinkelrett på
            bevegelsesretningen er nettopp <em>sentripetalkraften</em> vi kjenner fra kap. 5.
            Magnetkraften tar rollen som snoren i «ball på snor»-eksempelet: den holder partikkelen
            i en sirkel. Fra <InlineLatex latex="|q|vB = \frac{mv^2}{r}" /> finner vi radien.
          </p>
        </div>

        <p className="mt-2">Fra Newtons 2. lov med sentripetalkraft:</p>
        <FormulaBox
          latex="|q|vB = m\frac{v^2}{r} \quad \Rightarrow \quad r = \frac{mv}{|q|B}"
          title="Radius i sirkelbane (syklotronradius)"
          variant="gold"
          description="Større masse eller fart → større radius. Sterkere felt eller mer ladning → mindre radius."
        />

        <FormulaBox
          latex="\omega = \frac{v}{r} = \frac{|q|B}{m}"
          title="Syklotronfrekvens (vinkelfart)"
          variant="blue"
          description="Bemerk: ω er uavhengig av farten v! Alle partikler med lik q/m roterer med samme frekvens."
        />

        <FormulaBox
          latex="T = \frac{2\pi r}{v} = \frac{2\pi m}{|q|B}"
          title="Omløpsperiode"
          variant="blue"
          description="Perioden er uavhengig av v! Raskere partikler lager større sirkler, men bruker like lang tid."
        />

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse: «Perioden avhenger av farten»</p>
          <p className="text-sm">
            Intuitivt høres det ut som at raskere partikler bør bruke kortere tid på én omgang. Men se på
            formlene: raskere partikkel → større radius r = mv/(|q|B). Omfanget av sirkelen (2πr) vokser
            proporsjonalt med v. Dermed kansellerer v-ene seg: T = 2πr/v = 2πm/(|q|B). Perioden avhenger
            kun av masse, ladning og feltstyrke — ikke av fart. <strong>Dette er syklotronprinsippet</strong>,
            grunnlaget for partikkelakseleratorer.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Analogi: Ball på snor</p>
          <p className="text-sm">
            En ball på en snor svingt rundt i horisontalplanet: snoren trekker alltid innover, vinkelrett
            på bevegelsen. Snoren gjør ikke arbeid (den endrer ikke farten), men holder ballen i sirkel.
            Magnetkraften spiller nøyaktig samme rolle som snoren — den er sentripetalkraften som holder
            den ladede partikkelen i sirkelbanen.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Spiralbane (heliks)</p>
          <p className="text-sm">
            Dersom <InlineLatex latex="\vec{v}" /> ikke er vinkelrett på <InlineLatex latex="\vec{B}" />,
            dekomponerer vi farten:
          </p>
          <ul className="text-sm mt-2 space-y-1">
            <li>• <InlineLatex latex="v_\perp = v\sin\alpha" /> — vinkelrett på B, gir sirkulær bevegelse med radius <InlineLatex latex="r = mv_\perp/(|q|B)" /></li>
            <li>• <InlineLatex latex="v_\parallel = v\cos\alpha" /> — parallell med B, endres ikke (ingen magnetkraft)</li>
          </ul>
          <p className="text-sm mt-2">
            Resultatet er en <strong>spiralbane (heliks)</strong> — den ladede partikkelen skrur seg som
            en skrue langs B-feltlinjene. Dette er grunnen til at partikler i Jordens magnetfelt
            «fanges» og slynges langs feltlinjene mot polene.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 5: Sentripetalkraft</p>
          <p className="text-sm">
            I kap. 5 lærte vi at enhver kraft vinkelrett på bevegelsen gir sirkelbevegelse med
            <InlineLatex latex="F = mv^2/r" />. Der var det snorkraften eller normalkraften som sørget
            for dette. Her er det magnetkraften. Analysen er identisk — magnetkraften inn i høyreside
            av Newtons 2. lov gir oss radien.
          </p>
        </div>

        {/* Inline visualisering */}
        <CircularMotionVisualizer />
      </TheorySummary>

      {/* 27.5 Anvendelser */}
      <TheorySummary
        title="27.5 Anvendelser: Fartsvelger og massespektrometer"
        mustKnow={[
          "Fartsvelger: v = E/B når Fe = Fm (elektrisk og magnetisk kraft balanserer)",
          "Massespektrometer: R = mv/(qB') → bestem masse m",
          "Syklotron: partikler akselereres i halvkirkler, T uavhengig av v",
        ]}
      >
        <p>
          <strong>Fartsvelger:</strong> E-felt og B-felt er orientert vinkelrett på hverandre
          og på partikkelens fart. Bare partikler med én bestemt fart v passerer uavbøyd.
          Når elektrisk og magnetisk kraft balanserer:
        </p>
        <FormulaBox
          latex="qE = qvB \quad \Rightarrow \quad v = \frac{E}{B}"
          title="Fartsvelger"
          variant="gold"
          description="Bare partikler med denne farten passerer uavbøyd. Uavhengig av masse og ladning!"
        />

        <p className="mt-4">
          <strong>Massespektrometer:</strong> Partikler med kjent fart (fra fartsvelger) sendes inn
          i et nytt magnetfelt B&apos;. De følger en sirkelbane med radius:
        </p>
        <FormulaBox
          latex="R = \frac{mv}{qB'}"
          variant="blue"
          description="R kan måles, v er kjent fra fartsvelgeren, q = e (kjent), B' er kjent → m kan beregnes eksakt."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk anvendelse: Massespektrometri i hverdagen</p>
          <p className="text-sm">
            Massespektrometere brukes til å identifisere kjemiske stoffer ved å måle massen til ioniserte
            molekyler. Legemiddelindustrien bruker det for å verifisere renheten til medisiner. I kriminalteknisk
            etterforskning brukes det til å identifisere ukjente substanser. Prinsippet er alltid det samme:
            ioneradius i B-felt avslører massen.
          </p>
        </div>
      </TheorySummary>

      {/* 27.6 Magnetkraft på strømførende leder */}
      <TheorySummary
        title="27.6 Magnetkraft på en strømførende leder"
        mustKnow={[
          "Kraft på strømførende leder: F = IlB sin θ",
          "Vektorform: F = Il × B",
          "l-vektoren peker i strømretningen",
          "Retning: Høyrehåndsregel (pek fingrene i strømretningen, bøy mot B)",
          "Utledet fra Lorentzkraften på individuelle ladninger",
        ]}
      >
        <p>
          Inne i en strømførende leder har vi ladninger q som beveger seg med driftsfart <InlineLatex latex="v_d" />.
          I et magnetfelt virker det magnetkrefter på hver enkelt ladning, og summen av alle disse
          kreftene gir en netto kraft på selve lederen.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor F = IL × B? — Utledning fra Lorentzkraften</p>
          <p className="text-sm">
            Strøm <em>er</em> bevegde ladninger. I en leder av lengde L med tverrsnitt A og
            ladningskonsentrasjon n har vi totalt <InlineLatex latex="N = nAL" /> ladninger. Hver
            enkelt ladning kjenner magnetkraft <InlineLatex latex="f = qv_d B\sin\theta" />.
            Total kraft: <InlineLatex latex="F = Nf = nAL \cdot qv_d B\sin\theta" />.
            Men <InlineLatex latex="I = nqv_d A" />, så vi får direkte:
            <InlineLatex latex="F = ILB\sin\theta" />. Strøm er rett og slett en samling av bevegde ladninger —
            Lorentzkraften er grunnformelen bak alt.
          </p>
        </div>

        <FormulaBox
          latex="F_m = IlB\sin\theta"
          title="Magnetkraft på strømførende leder"
          variant="gold"
          description="I = strøm (A), l = lederens lengde (m), B = feltstyrke (T), θ = vinkel mellom strømretning og B."
        />

        <FormulaBox
          latex="\vec{F}_m = I\vec{l} \times \vec{B}"
          title="Vektorform"
          variant="gold"
          description="l-vektoren peker i strømretningen. Kraften er vinkelrett på både strøm og felt. Bruk høyrehåndsregelen."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Analogi: Prinsippet bak elektriske motorer</p>
          <p className="text-sm">
            En strømførende leder i et magnetfelt skyves av magnetkraften. Dette er nøyaktig prinsippet
            bak alle elektriske motorer: en strømsløyfe i et magnetfelt får et dreiemoment som setter den
            i rotasjon. Neste gang du bruker en elektrisk vifte, en elefon eller en elbil — du ser kap. 27
            i praksis.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 28: To parallelle ledere</p>
          <p className="text-sm">
            I kap. 28 bruker vi F = IL × B på to parallelle, strømførende ledere. Leder 1 skaper et
            magnetfelt (kap. 28) som leder 2 befinner seg i. Leder 2 opplever da kraften F = IL × B
            fra dette feltet. Resultatet: parallelle strømmer i <em>samme</em> retning tiltrekker hverandre,
            i <em>motsatt</em> retning frastøter de hverandre.
          </p>
        </div>
      </TheorySummary>

      {/* 27.7 Kraftmoment og magnetisk dipol */}
      <TheorySummary
        title="27.7 Kraftmoment på en strømsløyfe — magnetisk dipol"
        mustKnow={[
          "Magnetisk dipolmoment: μ = NIA (N = antall vindinger)",
          "Dreiemoment: τ = μ × B, størrelse τ = NIABsinθ",
          "Stabil likevekt: μ parallell med B (θ = 0, τ = 0)",
          "Potensiell energi: U = −μ·B = −μBcosθ",
          "Analogi: elektrisk dipol i E-felt oppfører seg likt",
        ]}
      >
        <p>
          En rektangulær strømsløyfe med areal A og strøm I i et magnetfelt B opplever et
          <strong> dreiemoment (kraftmoment)</strong> som prøver å vri sløyfen slik at
          sløyfens plan er vinkelrett på B.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Intuisjon: Magnetisk dipolmoment</p>
          <p className="text-sm">
            En strømsløyfe oppfører seg som en liten magnet — en <strong>magnetisk dipol</strong>. Den har en
            nordpol (der feltlinjene peker ut) og en sørpol (der de peker inn), bestemt av
            høyrehåndsregelen for strøm i sløyfen. Styrken på denne «lille magneten» beskrives av
            det magnetiske dipolmomentet μ = NIA. Jo større areal, jo sterkere strøm, jo flere
            vindinger — jo sterkere magnet.
          </p>
        </div>

        <FormulaBox
          latex="\mu = NIA"
          title="Magnetisk dipolmoment"
          variant="gold"
          description="N = antall vindinger, I = strøm (A), A = areal av sløyfen (m²). Enhet: A·m²."
        />

        <FormulaBox
          latex="\tau = NIAB\sin\theta = \mu B\sin\theta"
          title="Dreiemoment på strømsløyfe"
          variant="gold"
          description="θ er vinkelen mellom dipolmomentvektoren μ og magnetfeltet B. Maks dreiemoment når μ ⊥ B."
        />

        <FormulaBox
          latex="\vec{\tau} = \vec{\mu} \times \vec{B}"
          title="Dreiemoment — vektorform"
          variant="blue"
          description="Dreimomentet er alltid vinkelrett på dipolmomentet og feltet."
        />

        <FormulaBox
          latex="U = -\vec{\mu} \cdot \vec{B} = -\mu B\cos\theta"
          title="Potensiell energi til magnetisk dipol"
          variant="blue"
          description="Lavest energi når μ er parallell med B (θ = 0). Høyest energi når μ er antiparallell med B (θ = 180°)."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Analogi: Kompassnål</p>
          <p className="text-sm">
            En kompassnål er en magnetisk dipol. Jordens magnetfelt utøver et dreiemoment som vrir nåla
            til å peke mot nord (der μ og B er parallelle). Dreimomentet er null når nåla peker riktig,
            og størst når nåla er vinkelrett på feltet. En strømsløyfe i et B-felt oppfører seg
            identisk — den «vil» rette seg inn langs feltlinjene.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 21: Elektrisk dipol i E-felt</p>
          <p className="text-sm">
            I kap. 21 har en elektrisk dipol med moment p i et elektrisk felt E et dreiemoment
            <InlineLatex latex="\tau = pE\sin\theta" /> og potensiell energi <InlineLatex latex="U = -pE\cos\theta" />.
            Sammenligningen med den magnetiske dipolen er slående:
          </p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-1 pr-4">Elektrisk dipol (kap. 21)</th>
                  <th className="text-left py-1">Magnetisk dipol (kap. 27)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4"><InlineLatex latex="\vec{p} = q\vec{d}" /></td>
                  <td className="py-1"><InlineLatex latex="\vec{\mu} = NIA\hat{n}" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4"><InlineLatex latex="\vec{\tau} = \vec{p} \times \vec{E}" /></td>
                  <td className="py-1"><InlineLatex latex="\vec{\tau} = \vec{\mu} \times \vec{B}" /></td>
                </tr>
                <tr>
                  <td className="py-1 pr-4"><InlineLatex latex="U = -\vec{p} \cdot \vec{E}" /></td>
                  <td className="py-1"><InlineLatex latex="U = -\vec{\mu} \cdot \vec{B}" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-2">
            Matematikken er identisk! Bare bytt ut p med μ og E med B.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse: Sløyfen «skyves» av B-feltet</p>
          <p className="text-sm">
            B-feltet gir <em>ikke</em> en netto translasjonskraft på en strømsløyfe i et jevnt felt —
            kreftene på motsatte sider kansellerer hverandre som nettokraft. Det som oppstår er et
            rent <strong>dreiemoment</strong> som vrir sløyfen. I et <em>ikke-jevnt</em> felt vil det
            i tillegg oppstå en netto kraft (det er slik magneter tiltrekker hverandre).
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
