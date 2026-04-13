"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { PotentialVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Elektrisk potensial</h2>

      {/* 23.1 Elektrisk potensiell energi */}
      <TheorySummary
        title="23.1 Elektrisk potensiell energi"
        mustKnow={[
          "Arbeid utført av elektrisk kraft: W = −ΔEp",
          "Potensiell energi i uniformt felt: Ep = q₀Ey",
          "Potensiell energi mellom to punktladninger: Ep = kq₁q₂/r",
          "Energibevaring: Ek1 + Ep1 = Ek2 + Ep2",
          "Forskjellen på potensiell energi og potensial",
        ]}
      >
        <p>
          <strong>Analogi:</strong> Akkurat som gravitasjonen gjør arbeid når en masse faller,
          gjør det elektriske feltet arbeid når en ladning beveger seg i feltet.
          I begge tilfeller endres den <strong>potensielle energien</strong>.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Arbeid og potensiell energi</p>
          <p>
            Når elektriske krefter flytter en ladning fra punkt a til punkt b, gjør de et arbeid:
          </p>
          <div className="mt-2">
            <InlineLatex latex="W_{a \to b} = \int_a^b \vec{F}_e \cdot d\vec{l}" />
          </div>
          <p className="mt-2">
            Sammenhengen mellom arbeid og potensiell energi:
          </p>
          <div className="mt-1">
            <InlineLatex latex="W_{a \to b} = -\Delta E_p = -(E_{p,b} - E_{p,a})" />
          </div>
        </div>

        <h4 className="font-semibold mt-6 mb-2">Uniformt felt</h4>
        <p>
          I et uniformt elektrisk felt (f.eks. mellom parallelle plater) er den potensielle
          energien til en ladning <InlineLatex latex="q_0" />:
        </p>
        <FormulaBox
          latex="E_p = q_0 E y"
          title="Potensiell energi i uniformt felt"
          variant="gold"
          description="y er avstanden fra et fritt valgt nullnivå, målt i retning MOT feltretningen (oppover hvis feltet peker nedover)."
        />

        <p className="mt-4">
          Arbeid utført av feltet:
        </p>
        <FormulaBox
          latex="W_{a \to b} = -\Delta E_p = -(q_0 E y_b - q_0 E y_a) = q_0 E(y_a - y_b)"
          variant="blue"
        />

        <h4 className="font-semibold mt-6 mb-2">Energibevaring</h4>
        <p>
          Når <em>bare</em> elektriske krefter gjør arbeid, er den totale mekaniske energien bevart:
        </p>
        <FormulaBox
          latex="E_{k,1} + E_{p,1} = E_{k,2} + E_{p,2}"
          title="Energibevaring"
          variant="gold"
          description="Total mekanisk energi (kinetisk + potensiell) er bevart når bare konservative krefter gjør arbeid."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Sammenheng med mekanikk</p>
          <p className="text-sm">
            Dette er <strong>nøyaktig det samme prinsippet</strong> som gravitasjonell energibevaring
            fra kap. 7! Der hadde vi <InlineLatex latex="E_p = mgy" />. Her har vi{" "}
            <InlineLatex latex="E_p = q_0 E y" />. Erstatt mg med q₀E — resten er identisk.
          </p>
        </div>

        <h4 className="font-semibold mt-6 mb-2">Potensiell energi mellom to punktladninger</h4>
        <p>
          For to punktladninger q og q₀ i avstand r:
        </p>
        <FormulaBox
          latex="E_p = \frac{1}{4\pi\varepsilon_0}\frac{q_0\, q}{r}"
          title="Potensiell energi mellom to punktladninger"
          variant="gold"
          description="Nullnivå: Ep = 0 når r → ∞. Positiv Ep: like ladninger (frastøtning). Negativ Ep: ulike ladninger (tiltrekning)."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fortegnregel for Ep</p>
          <ul className="space-y-1 text-sm">
            <li>• Like ladninger (begge + eller begge −): <strong>Ep &gt; 0</strong> — systemet «vil» bort fra hverandre</li>
            <li>• Ulike ladninger (+ og −): <strong>Ep &lt; 0</strong> — systemet er bundet sammen</li>
            <li>• Her bruker vi <em>ikke</em> absoluttverdien — fortegnet på ladningene gir Ep riktig fortegn!</li>
          </ul>
        </div>

        <p className="mt-4">
          For <strong>flere ladninger</strong>: Summer bidragene fra alle par:
        </p>
        <FormulaBox
          latex="E_p = \frac{q_0}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1} + \frac{q_2}{r_2} + \cdots + \frac{q_k}{r_k}\right)"
          variant="blue"
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor fungerer det slik?</p>
          <p className="text-sm">
            Potensiell energi handler om <strong>posisjon i et kraftfelt</strong>. Akkurat som en stein
            på en hylle har gravitasjonell potensiell energi fordi tyngdekraften kan gjøre arbeid
            dersom steinen faller, har en ladning i et E-felt potensiell energi fordi den elektriske kraften
            kan gjøre arbeid dersom ladningen beveger seg.
          </p>
          <p className="text-sm mt-2">
            <strong>Nøkkelinnsikt:</strong> Arbeidet feltet gjør er <em>uavhengig av banen</em> —
            det avhenger bare av start- og sluttpunkt. Dette er definisjonen på en <em>konservativ kraft</em>,
            og det er nettopp derfor vi kan definere en potensiell energi.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på en ball på en bakke. Høyden tilsvarer potensialet. Ballen ruller naturlig fra høyt
            til lavt — den mister potensiell energi og får kinetisk energi. En <strong>positiv ladning</strong>
            i et E-felt oppfører seg på samme måte: den «ruller nedover» fra høyt til lavt potensial.
          </p>
          <p className="text-sm mt-2">
            En <strong>negativ ladning</strong> er som en heliumballong — den «stiger oppover» fra lavt til
            høyt potensial, fordi kraften på den er motsatt av feltretningen.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Positiv Ep betyr at ladningen er tiltrukket»</strong> — Feil! Positiv Ep mellom to ladninger betyr at de <em>frastøter</em> hverandre (like ladninger). Negativ Ep betyr tiltrekning.</li>
            <li>• <strong>«Ep mellom to ladninger bruker absoluttverdier»</strong> — Nei! Her bruker vi ladningene <em>med fortegn</em>: <InlineLatex latex="E_p = kq_1q_2/r" />. Fortegnet gir oss informasjon om tiltrekning/frastøtning.</li>
            <li>• <strong>«Arbeidet av feltet er positivt når Ep øker»</strong> — Tvert imot! <InlineLatex latex="W = -\Delta E_p" />. Når feltet gjør positivt arbeid, <em>synker</em> den potensielle energien.</li>
            <li>• <strong>«Energibevaring gjelder bare for gravitasjon»</strong> — Nei! <InlineLatex latex="E_k + E_p = \text{konstant}" /> gjelder for alle konservative krefter, inkludert den elektriske.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips for energioppgaver</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Bruk energibevaring!</strong> Det er nesten alltid enklere enn å bruke krefter og kinematikk</li>
            <li>• <strong>Definer nullnivå</strong> — for punktladninger er <InlineLatex latex="E_p = 0" /> ved <InlineLatex latex="r \to \infty" />. For plater velger du selv.</li>
            <li>• <strong>Husk fortegnene</strong> — sett inn ladninger med fortegn i <InlineLatex latex="E_p = kq_1q_2/r" /></li>
            <li>• <strong>Sjekk svaret:</strong> Like ladninger som nærmer seg → Ep øker (du må tilføre energi). Ulike ladninger som nærmer seg → Ep synker (de tiltrekkes, energi frigis).</li>
            <li>• <strong>Flere ladninger:</strong> Summer energien for alle <em>par</em> av ladninger. Med 3 ladninger har du 3 par.</li>
          </ul>
        </div>
      </TheorySummary>

      {/* Visualisering inline for forståelse */}
      <PotentialVisualizer />

      {/* 23.2 Elektrisk potensial */}
      <TheorySummary
        title="23.2 Elektrisk potensial"
        mustKnow={[
          "Definisjon: V = Ep/q₀ (potensiell energi per enhet ladning)",
          "Enhet: Volt (V) = J/C",
          "Punktladning: V = kq/r",
          "Potensialforskjell = spenning: Vab = Va − Vb",
          "Sammenheng E og V: E = V/y (uniformt felt)",
          "Elektronvolt: 1 eV = 1,60 · 10⁻¹⁹ J",
        ]}
      >
        <p>
          <strong>Elektrisk potensial</strong> er potensiell energi per enhet ladning.
          Mens potensiell energi avhenger av testladningen q₀, er potensial en egenskap
          ved selve feltet — uavhengig av hvilken ladning vi plasserer der.
        </p>

        <FormulaBox
          latex="V = \frac{E_p}{q_0} \qquad \left[\frac{\text{J}}{\text{C}} = \text{V (Volt)}\right]"
          title="Definisjon av elektrisk potensial"
          variant="gold"
          description="V er en skalar — ingen retning! Mye enklere å jobbe med enn E-feltet."
        />

        <h4 className="font-semibold mt-6 mb-2">Potensial i ulike situasjoner</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="rounded-lg border border-[var(--card-border)] p-4">
            <h5 className="font-semibold text-sm mb-2">Uniformt felt</h5>
            <FormulaBox latex="V = Ey" variant="blue" />
            <p className="text-xs text-[var(--muted)]">y måles mot feltretningen</p>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] p-4">
            <h5 className="font-semibold text-sm mb-2">Punktladning</h5>
            <FormulaBox latex="V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}" variant="blue" />
            <p className="text-xs text-[var(--muted)]">q med fortegn! V = 0 ved r → ∞</p>
          </div>
        </div>

        <p>
          For <strong>flere punktladninger</strong> (superposisjon — enklere enn for E-felt fordi V er en skalar!):
        </p>
        <FormulaBox
          latex="V = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1} + \frac{q_2}{r_2} + \cdots + \frac{q_k}{r_k}\right)"
          title="Potensial fra flere punktladninger"
          variant="gold"
          description="Bare summer — ingen vektordekomponering nødvendig!"
        />

        <h4 className="font-semibold mt-6 mb-2">Potensialforskjell (spenning)</h4>
        <p>
          <strong>Potensialforskjellen</strong> mellom punktene a og b kalles <strong>spenningen</strong>:
        </p>
        <FormulaBox
          latex="V_{ab} = V_a - V_b = -\frac{\Delta E_p}{q_0} = \frac{W_{a \to b}}{q_0}"
          title="Potensialforskjell / Spenning"
          variant="gold"
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng mellom E og V</p>
          <p>I et uniformt felt:</p>
          <div className="mt-1">
            <InlineLatex latex="V = Ey \;\Rightarrow\; E = \frac{V}{y}" />
          </div>
          <p className="mt-2">
            Derfor er <InlineLatex latex="\text{N/C} = \text{V/m}" /> — to likeverdige enheter for E-felt!
          </p>
        </div>

        <h4 className="font-semibold mt-6 mb-2">Elektronvolt (eV)</h4>
        <p>
          <strong>Elektronvolt</strong> er energiendringen et elektron får ved å bevege seg
          gjennom en potensialforskjell på 1 Volt:
        </p>
        <FormulaBox
          latex="1\;\text{eV} = e \cdot 1\;\text{V} = 1{,}60 \cdot 10^{-19}\;\text{J}"
          title="Elektronvolt"
          variant="blue"
          description="En praktisk energienhet for atomær/subatomær fysikk. Ep = V · q₀."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor trenger vi potensial (V) i tillegg til Ep?</p>
          <p className="text-sm">
            Potensiell energi (<InlineLatex latex="E_p" />) avhenger av <em>begge</em> ladningene —
            kildeladningen og testladningen. Potensial (<InlineLatex latex="V" />) avhenger bare av
            kildeladningen og posisjonen. Det er en egenskap ved <strong>feltet selv</strong>,
            akkurat som E-feltet.
          </p>
          <p className="text-sm mt-2">
            <strong>Stor fordel:</strong> V er en <em>skalar</em> — den har ingen retning! Mens du må
            dekomponere E-feltet i x- og y-komponenter, kan du bare summere potensialverdier direkte.
            Superposisjon for V er derfor mye enklere enn for E.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — potensial som «høyde»</p>
          <p className="text-sm">
            Elektrisk potensial er som <strong>høyde over havet</strong> på et topografisk kart.
            Høye fjell = høyt potensial (ved positive ladninger), daler = lavt potensial (ved negative ladninger).
            Ekvipotensialflater er som høydekoter — linjer som forbinder punkter med samme «høyde».
          </p>
          <p className="text-sm mt-2">
            E-feltet er da «helningen» på terrenget — det peker alltid «rett nedover» fra høyt til lavt potensial,
            vinkelrett på høydekotene. Og <strong>spenningen</strong> (potensialforskjellen) er høydeforskjellen
            mellom to punkter — det er den som bestemmer om en «ball» (ladning) vil rulle.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«V = 0 betyr E = 0»</strong> — Absolutt ikke! V kan være null der E er sterk (f.eks. midtpunktet mellom to like store, ulike ladninger). V og E er relatert via derivasjon, ikke likhet.</li>
            <li>• <strong>«E = 0 betyr V = 0»</strong> — Heller ikke! E kan være null i et punkt der V har en ekstremverdi (sadelpunkt). Eksempel: midtpunktet mellom to like positive ladninger har E = 0 men V &gt; 0.</li>
            <li>• <strong>«Spenning betyr potensial»</strong> — Spenning er <em>forskjellen</em> i potensial: <InlineLatex latex="V_{ab} = V_a - V_b" />. Det er forskjellen som driver strøm og gjør arbeid.</li>
            <li>• <strong>«En ladning beveger seg alltid mot lavere V»</strong> — Bare for positive ladninger! Negative ladninger beveger seg mot <em>høyere</em> V (tenk på elektron i et batteri).</li>
            <li>• <strong>«eV er en enhet for spenning»</strong> — Nei! Elektronvolt er en <em>energienhet</em>. Navnet er forvirrende, men 1 eV = energi et elektron får gjennom 1 V potensialforskjell.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips for potensialoppgaver</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>V fra flere ladninger:</strong> Bare summer <InlineLatex latex="V = kq_1/r_1 + kq_2/r_2 + \ldots" /> — ingen vektorer!</li>
            <li>• <strong>Finn E fra V:</strong> I uniformt felt: <InlineLatex latex="E = V_{ab}/d" />. Generelt: <InlineLatex latex="E = -dV/dr" /></li>
            <li>• <strong>Energiberegning:</strong> <InlineLatex latex="\Delta E_k = q \cdot \Delta V" />. Bruk dette til å finne fart etter akselerasjon gjennom en spenning.</li>
            <li>• <strong>Ekvipotensialflater:</strong> E står alltid vinkelrett på ekvipotensialflatene, og peker mot lavere V</li>
            <li>• <strong>Sjekk enhetene:</strong> V/m = N/C. Hvis du ender opp med en annen enhet for E, har du gjort en feil.</li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
