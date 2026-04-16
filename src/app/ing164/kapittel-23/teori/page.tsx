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

        {/* KRYSTALLKLAR ALGEBRA: Hvorfor blir det a minus b? */}
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Matematikk-sjekk: hvorfor blir det &laquo;a minus b&raquo;?
          </p>
          <p className="text-sm mb-2">
            Mange blir forvirret av at vi plutselig regner <em>start minus slutt</em> (a − b) i stedet for
            <em> slutt minus start</em> (b − a) som vanlig for Δ. Her er algebraen eksplisitt:
          </p>
          <div className="bg-white/60 dark:bg-black/30 rounded p-3 my-2 font-mono text-sm space-y-1.5">
            <div>1. Definisjon av Δ: &nbsp;&nbsp;<InlineLatex latex="\Delta E_p = E_{p,b} - E_{p,a}" /> &nbsp;(slutt − start)</div>
            <div>2. Grunnregel: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<InlineLatex latex="W_{a\to b} = -\Delta E_p" /></div>
            <div>3. Sett inn Δ: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<InlineLatex latex="W_{a\to b} = -(E_{p,b} - E_{p,a})" /></div>
            <div>4. Fordel minustegnet: <InlineLatex latex="W_{a\to b} = E_{p,a} - E_{p,b}" /> &nbsp;(start − slutt!)</div>
          </div>
          <p className="text-sm mt-2">
            Samme regnestykke gjelder for spenning:{" "}
            <InlineLatex latex="V_{ab} = -\Delta V = -(V_b - V_a) = V_a - V_b" />. Minustegnet &laquo;snur&raquo;
            alltid rekkefølgen, slik at du regner <strong>start minus slutt</strong>.
          </p>
          <p className="text-sm mt-2">
            <strong>Huskeregel:</strong> Når du ser <InlineLatex latex="V_{ab}" /> eller{" "}
            <InlineLatex latex="W_{a\to b}" />, er bokstav-rekkefølgen (a, b) det som skal stå i subtraksjonen —
            altså <em>a først</em>, ikke slutt først.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">To typer arbeid — pass på fortegnet!</p>
          <p className="text-sm mb-2">
            Når en ladning flyttes mellom to punkter finnes det <strong>to</strong> relevante arbeid.
            De er like store, men har motsatt fortegn:
          </p>
          <div className="mt-2 space-y-2">
            <div>
              <InlineLatex latex="W_\text{elfelt} = -\Delta E_p" />
              <span className="text-sm ml-2 text-[var(--muted)]">— arbeid utført <em>av</em> det elektriske feltet selv</span>
            </div>
            <div>
              <InlineLatex latex="W_\text{ytre} = \Delta E_p = q\,\Delta V" />
              <span className="text-sm ml-2 text-[var(--muted)]">— arbeid en <em>ytre</em> kraft må gjøre for å flytte ladningen mot feltet</span>
            </div>
          </div>
          <p className="text-sm mt-2">
            Det første er feltets eget arbeid (kraften følger feltet). Det andre er arbeidet du selv må tilføre
            (mot feltet) for å flytte ladningen kvasi-statisk. De er like store, men skiller seg på fortegn:{" "}
            <InlineLatex latex="W_\text{ytre} = -W_\text{elfelt}" />.
          </p>
        </div>

        {/* KRITISK: Sammenligningstabell for W, ΔE_p, V_ab, ΔV */}
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            MASTER-TABELL: W, ΔE_p, V_ab og ΔV — forstå forskjellene!
          </p>
          <p className="text-sm mb-3">
            Dette er det som forveksles MEST på eksamen. Memorer disse fortegnsreglene:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-purple-300 dark:border-purple-700">
                  <th className="text-left py-1.5 pr-2 font-semibold">Størrelse</th>
                  <th className="text-left py-1.5 pr-2 font-semibold">Definisjon / formel</th>
                  <th className="text-left py-1.5 font-semibold">Fortegn når ladning går fra a (høy V) til b (lav V)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-200 dark:divide-purple-800">
                <tr>
                  <td className="py-1.5 pr-2 font-mono"><InlineLatex latex="W_\text{felt}" /></td>
                  <td className="py-1.5 pr-2"><InlineLatex latex="= q(V_a - V_b) = -\Delta E_p" /></td>
                  <td className="py-1.5 text-green-700 dark:text-green-400">positiv for q &gt; 0 (feltet «hjelper»)</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2 font-mono"><InlineLatex latex="W_\text{ytre}" /></td>
                  <td className="py-1.5 pr-2"><InlineLatex latex="= q(V_b - V_a) = +\Delta E_p" /></td>
                  <td className="py-1.5 text-red-700 dark:text-red-400">negativ for q &gt; 0 (du slipper å jobbe)</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2 font-mono"><InlineLatex latex="V_{ab}" /></td>
                  <td className="py-1.5 pr-2"><InlineLatex latex="= V_a - V_b" /> (spenning)</td>
                  <td className="py-1.5 text-green-700 dark:text-green-400">positiv (per definisjon av a, b)</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2 font-mono"><InlineLatex latex="\Delta V" /></td>
                  <td className="py-1.5 pr-2"><InlineLatex latex="= V_b - V_a = -V_{ab}" /></td>
                  <td className="py-1.5 text-red-700 dark:text-red-400">negativ (V synker når vi går fra a til b)</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2 font-mono"><InlineLatex latex="\Delta E_p" /></td>
                  <td className="py-1.5 pr-2"><InlineLatex latex="= E_{p,b} - E_{p,a} = q\,\Delta V" /></td>
                  <td className="py-1.5 text-red-700 dark:text-red-400">negativ for q &gt; 0 (E_p synker)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white/60 dark:bg-black/30 rounded p-2 text-xs">
            <p className="font-semibold mb-1">Huskeregel:</p>
            <ul className="space-y-0.5">
              <li>• <strong>V_ab</strong> bruker <em>bindestrek mellom bokstavene</em>: V<em>a</em>−V<em>b</em> (a minus b)</li>
              <li>• <strong>ΔV</strong> er alltid <em>slutt minus start</em>: V_b − V_a</li>
              <li>• <strong>ΔV = −V_ab</strong> (motsatt fortegn!)</li>
              <li>• <strong>W_felt</strong> = positivt når q &gt; 0 «ruller nedover» fra høy V til lav V (naturlig retning)</li>
              <li>• <strong>W_ytre</strong> = negativt i samme situasjon — du trenger ikke jobbe, feltet gjør jobben</li>
            </ul>
          </div>
        </div>

        {/* Dobbel-sjekk: konkret eksempel med tall */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Konkret eksempel på fortegnsreglene</p>
          <p className="text-sm mb-2">
            Anta <InlineLatex latex="V_a = 100\,\text{V}" />, <InlineLatex latex="V_b = 20\,\text{V}" /> og{" "}
            <InlineLatex latex="q = +2\,\mu\text{C}" />. Ladningen flyttes fra a til b.
          </p>
          <ul className="text-sm space-y-1">
            <li>• <InlineLatex latex="V_{ab} = V_a - V_b = 80\,\text{V}" /> (positiv spenning)</li>
            <li>• <InlineLatex latex="\Delta V = V_b - V_a = -80\,\text{V}" /> (potensialet synker)</li>
            <li>• <InlineLatex latex="W_\text{felt} = q V_{ab} = 2 \cdot 10^{-6} \cdot 80 = +160\,\mu\text{J}" /> (feltet gjør positivt arbeid)</li>
            <li>• <InlineLatex latex="\Delta E_p = q\,\Delta V = -160\,\mu\text{J}" /> (energien synker)</li>
            <li>• <InlineLatex latex="W_\text{ytre} = +\Delta E_p = -160\,\mu\text{J}" /> (du får energi — feltet jobber for deg)</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Sjekk:</strong> Positiv ladning ruller «nedover» i potensial → feltet gjør positivt arbeid →
            ladningens E_p synker → ladningen får kinetisk energi (ΔE_k = +160 μJ hvis i ro initielt).
          </p>
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

        {/* FELLE-VARSEL: Uniformt felt vs punktladning */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">
            ⚠ Felle-varsel — uniformt felt vs. punktladning
          </p>
          <p className="text-sm mb-2">
            Dette er den <strong>vanligste feilen</strong> studenter gjør på eksamen i kap. 23. Formlene
            for uniformt felt og punktladning ser like ut, men de gjelder <em>helt forskjellige</em> situasjoner:
          </p>
          <div className="overflow-x-auto my-3">
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-red-300 dark:border-red-800">
                  <th className="text-left py-1.5 pr-2 font-semibold">Situasjon</th>
                  <th className="text-left py-1.5 pr-2 font-semibold">Riktige formler</th>
                  <th className="text-left py-1.5 font-semibold">Kjennetegn i oppgaveteksten</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-200 dark:divide-red-800">
                <tr>
                  <td className="py-1.5 pr-2 font-semibold">Uniformt felt<br/>(parallelle plater)</td>
                  <td className="py-1.5 pr-2">
                    <InlineLatex latex="E_p = q_0 E y" /><br/>
                    <InlineLatex latex="V = E y" /><br/>
                    <InlineLatex latex="E = V/d" /><br/>
                    <InlineLatex latex="W = q E d" />
                  </td>
                  <td className="py-1.5 text-xs">
                    &laquo;parallel plates&raquo;, &laquo;parallelle plater&raquo;, &laquo;uniform field&raquo;,
                    &laquo;konstant E-felt&raquo;, &laquo;plate-kondensator&raquo;, angitt <em>avstand d</em> mellom plater.
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2 font-semibold">Punktladning</td>
                  <td className="py-1.5 pr-2">
                    <InlineLatex latex="E_p = \frac{kq_1q_2}{r}" /><br/>
                    <InlineLatex latex="V = \frac{kq}{r}" /><br/>
                    <InlineLatex latex="E = \frac{kq}{r^2}" /><br/>
                    <InlineLatex latex="r = \sqrt{x^2+y^2}" />
                  </td>
                  <td className="py-1.5 text-xs">
                    &laquo;point charge&raquo;, &laquo;punktladning&raquo;, &laquo;ladet partikkel/kule&raquo;,
                    ladning angis med posisjon (x, y) eller avstand <em>r</em>, ofte flere ladninger i geometriske
                    mønstre.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-3 font-semibold">
            ALDRI bruk formler med &laquo;y&raquo; eller &laquo;d&raquo; (som <InlineLatex latex="E_p = qEy" />{" "}
            eller <InlineLatex latex="E = V/d" />) når du regner på punktladninger. Disse gjelder <em>kun</em> i
            uniformt felt mellom parallelle plater.
          </p>
          <p className="text-sm mt-2">
            For punktladninger MÅ du bruke formler med &laquo;r&raquo; i nevneren, og husk Pytagoras
            (<InlineLatex latex="r = \sqrt{\Delta x^2 + \Delta y^2}" />) hvis ladningen beveger seg i 2D.
          </p>
          <p className="text-sm mt-2">
            <strong>Matematisk grunn:</strong> Feltet fra parallelle plater er konstant, så
            <InlineLatex latex="\int E\,dy = Ey" /> (lineær i y). Feltet fra en punktladning faller som
            <InlineLatex latex="1/r^2" />, så integralet gir <InlineLatex latex="1/r" /> — helt annen
            avstandsavhengighet.
          </p>
        </div>

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
