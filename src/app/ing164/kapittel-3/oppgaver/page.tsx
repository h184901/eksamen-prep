"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Bevegelse i 2D og 3D</h2>

      {/* ── Oppgavestrategier ── */}
      <h3 className="text-xl font-semibold mt-2 mb-4">Oppgavestrategier</h3>

      <div className="space-y-6">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Oppskrift: Prosjektilbevegelse</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Velg koordinatsystem:</strong> x horisontalt, y vertikalt opp, origo i startpunktet.</li>
            <li><strong>Dekomponér startfarten:</strong> <InlineLatex latex="v_{0x} = v_0\cos\alpha_0" />, <InlineLatex latex="v_{0y} = v_0\sin\alpha_0" />.</li>
            <li><strong>Skriv opp likningene</strong> for begge retninger separat.</li>
            <li><strong>Identifiser hva oppgaven spør om:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Toppunkt → sett <InlineLatex latex="v_y = 0" /></li>
                <li>Landing → sett <InlineLatex latex="y = 0" /> (eller annen landingshøyde)</li>
                <li>Fart → finn <InlineLatex latex="v_x" /> og <InlineLatex latex="v_y" />, bruk Pytagoras</li>
              </ul>
            </li>
            <li><strong>Husk:</strong> Tiden t er den <em>samme</em> i x- og y-retning — det er koblingen.</li>
            <li><strong>Sjekk svaret:</strong> Er fortegn, enheter og størrelsesorden rimelige?</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Sjekkliste: Sirkelbevegelse</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Er farten <strong>konstant</strong>? → Kun sentripetal: <InlineLatex latex="a = v^2/R" />.</li>
            <li>Varierer farten? → To komponenter: <InlineLatex latex="a_\perp = v^2/R" /> + <InlineLatex latex="a_\parallel = dv/dt" />.</li>
            <li>Er omløpstiden gitt? → Bruk <InlineLatex latex="v = 2\pi R/T" /> og <InlineLatex latex="a = 4\pi^2 R/T^2" />.</li>
            <li>Total akselerasjon: <InlineLatex latex="a = \sqrt{a_\perp^2 + a_\parallel^2}" />.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Glemmer at vₓ er konstant i prosjektilbevegelse</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Bruker v₀ direkte istedenfor å dekomponere til v₀ₓ og v₀ᵧ</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Tror akselerasjon = 0 i toppunktet (a = −g hele tiden!)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Glemmer at sirkelbevegelse med konstant fart HAR akselerasjon</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Blander radianer og grader i kalkulasjoner</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Gjennomgåtte eksempler ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Gjennomgåtte eksempler</h3>

      {/* Eksempel 1: Robot på Mars */}
      <ExerciseCard
        number={1}
        title="Robot på Mars (vektorbevegelse)"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>En robot beveger seg i xy-planet på Mars. Posisjonen er:</p>
            <FormulaBox latex="x = 2{,}0 - 0{,}25t^2 \;\;\text{[m]}, \quad y = 1{,}0t + 0{,}025t^3 \;\;\text{[m]}" variant="blue" />
            <p className="mt-2">a) Finn koordinatene og avstanden fra origo ved t = 2,0 s.</p>
            <p>b) Finn forflytningen og gjennomsnittsfarten fra t = 0 til t = 2,0 s.</p>
            <p>c) Finn momentanfarten (vektor og størrelse) ved t = 2,0 s.</p>
            <p>d) Finn akselerasjonen ved t = 2,0 s.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Sett t = 2,0 inn i x(t) og y(t) for posisjon. Deriver for fart.</p> },
          { label: "Hint 2", content: <p>Fart: v⃗ = (dx/dt)î + (dy/dt)ĵ. Akselerasjon: a⃗ = (dv_x/dt)î + (dv_y/dt)ĵ.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="x(t) = 2{,}0 - 0{,}25t^2" /> m — x-posisjon som funksjon av tid</li>
                <li><InlineLatex latex="y(t) = 1{,}0t + 0{,}025t^3" /> m — y-posisjon som funksjon av tid</li>
                <li><InlineLatex latex="t = 2{,}0\;\text{s}" /> — tidspunktet vi evaluerer ved</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Koordinater <InlineLatex latex="(x, y)" /> og avstand <InlineLatex latex="r" /> fra origo ved t = 2,0 s</li>
                <li>b) Forflytningsvektor <InlineLatex latex="\Delta\vec{r}" /> og gjennomsnittsfart <InlineLatex latex="\bar{v}" /></li>
                <li>c) Momentanfartsvektor <InlineLatex latex="\vec{v}" /> og størrelse v ved t = 2,0 s</li>
                <li>d) Akselerasjonsvektor <InlineLatex latex="\vec{a}" /> og størrelse a ved t = 2,0 s</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">I 2D bevegelse behandler vi x og y fullstendig uavhengig. Farten er den tidsderiverte av posisjonen, og akselerasjonen er den tidsderiverte av farten. Størrelsen på en vektor finnes alltid med Pytagoras: <InlineLatex latex="|\vec{A}| = \sqrt{A_x^2 + A_y^2}" />.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Koordinater ved t = 2,0 s (del a)</p>
            <p className="text-sm">Setter t = 2,0 s direkte inn i posisjonsfunksjonene.</p>
            <FormulaBox latex="x = 2{,}0 - 0{,}25(2{,}0)^2 = 2{,}0 - 1{,}0 = 1{,}0\;\text{m}" variant="blue" />
            <FormulaBox latex="y = 1{,}0(2{,}0) + 0{,}025(2{,}0)^3 = 2{,}0 + 0{,}20 = 2{,}2\;\text{m}" variant="blue" />
            <p className="text-sm">Avstand fra origo bruker Pytagoras.</p>
            <FormulaBox latex="r = \sqrt{(1{,}0)^2 + (2{,}2)^2} = \sqrt{1{,}0 + 4{,}84} = \sqrt{5{,}84} = \underline{\underline{2{,}42\;\text{m}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 2: Forflytning og gjennomsnittsfart (del b)</p>
            <p className="text-sm">Forflytningen er posisjonen ved t = 2,0 s minus posisjonen ved t = 0.</p>
            <FormulaBox latex="\vec{r}_0 = 2{,}0\hat{i} + 0\hat{j} \;\;\text{m}, \quad \vec{r}_2 = 1{,}0\hat{i} + 2{,}2\hat{j} \;\;\text{m}" variant="blue" />
            <p className="text-sm">Forflytningsvektoren er differansen, og gjennomsnittsfart er forflytning delt på tid.</p>
            <FormulaBox latex="\Delta\vec{r} = \vec{r}_2 - \vec{r}_0 = -1{,}0\hat{i} + 2{,}2\hat{j} \;\;\text{m}" variant="blue" />
            <FormulaBox latex="\vec{\bar{v}} = \frac{\Delta\vec{r}}{\Delta t} = \frac{-1{,}0\hat{i} + 2{,}2\hat{j}}{2{,}0} = \underline{\underline{-0{,}50\hat{i} + 1{,}1\hat{j} \;\;\text{m/s}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Momentanfart ved t = 2,0 s (del c)</p>
            <p className="text-sm">Momentanfarten er den tidsderiverte av posisjonen: <InlineLatex latex="\vec{v} = \frac{d\vec{r}}{dt}" />.</p>
            <FormulaBox latex="\vec{v}(t) = \frac{dx}{dt}\hat{i} + \frac{dy}{dt}\hat{j} = (-0{,}50t)\hat{i} + (1{,}0 + 0{,}075t^2)\hat{j} \;\;\text{m/s}" variant="blue" />
            <p className="text-sm">Setter t = 2,0 s inn i fartsuttrykket.</p>
            <FormulaBox latex="\vec{v}(2{,}0) = -1{,}0\hat{i} + 1{,}3\hat{j} \;\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v = \sqrt{(-1{,}0)^2 + (1{,}3)^2} = \sqrt{2{,}69} = \underline{\underline{1{,}64\;\text{m/s}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 4: Akselerasjon ved t = 2,0 s (del d)</p>
            <p className="text-sm">Akselerasjonen er den tidsderiverte av farten: <InlineLatex latex="\vec{a} = \frac{d\vec{v}}{dt}" />.</p>
            <FormulaBox latex="\vec{a}(t) = \frac{dv_x}{dt}\hat{i} + \frac{dv_y}{dt}\hat{j} = -0{,}50\hat{i} + 0{,}15t\hat{j} \;\;\text{m/s}^2" variant="blue" />
            <p className="text-sm">Setter t = 2,0 s inn.</p>
            <FormulaBox latex="\vec{a}(2{,}0) = -0{,}50\hat{i} + 0{,}30\hat{j} \;\;\text{m/s}^2" variant="blue" />
            <FormulaBox latex="a = \sqrt{(-0{,}50)^2 + (0{,}30)^2} = \sqrt{0{,}34} = \underline{\underline{0{,}58\;\text{m/s}^2}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } r = \underline{\underline{2{,}42\;\text{m}}} \quad \text{b) } \vec{\bar{v}} = \underline{\underline{-0{,}50\hat{i} + 1{,}1\hat{j}\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\text{c) } v = \underline{\underline{1{,}64\;\text{m/s}}} \quad \text{d) } a = \underline{\underline{0{,}58\;\text{m/s}^2}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">I 2D bevegelse: deriver hver komponent separat og uavhengig. Farten er alltid tangent til banen. Størrelsen på enhver vektor — posisjon, fart, akselerasjon — finnes med Pytagoras. Dette er den generelle teknikken for alle vektorfunksjoner av tid.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 2: Motorsykkel (horisontalt skråkast) */}
      <ExerciseCard
        number={2}
        title="Motorsykkel — Horisontal startfart"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En motorsykkel kjører utfor en kant med horisontal fart{" "}
              <InlineLatex latex="v_0 = 9{,}0" /> m/s (ingen vertikal startfart).
            </p>
            <p className="mt-2">a) Finn posisjon og avstand fra origo etter t = 0,50 s.</p>
            <p>b) Finn fart (størrelse og retning) etter t = 0,50 s.</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Horisontal start: v₀ₓ = 9,0 m/s, v₀ᵧ = 0. Prosjektillikningene gjelder.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_{0x} = 9{,}0\;\text{m/s}" /> — horisontal startfart</li>
                <li><InlineLatex latex="v_{0y} = 0\;\text{m/s}" /> — ingen vertikal startfart (horisontal avgang)</li>
                <li><InlineLatex latex="t = 0{,}50\;\text{s}" /> — tidspunktet vi spør om</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Koordinater <InlineLatex latex="(x, y)" /> og avstand r fra origo etter 0,50 s</li>
                <li>b) Fartens størrelse v og retning (vinkel med horisontal) etter 0,50 s</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Dette er et horisontalt skråkast (særtilfelle av prosjektilbevegelse). x-retning: jevn bevegelse med konstant fart <InlineLatex latex="v_{0x}" />. y-retning: fri fallbevegelse fra ro. Vi bruker <InlineLatex latex="x = v_{0x}t" /> og <InlineLatex latex="y = -\tfrac{1}{2}gt^2" /> (negativ siden y er nedover).</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Posisjon etter t = 0,50 s (del a)</p>
            <p className="text-sm">Horisontal posisjon: jevn bevegelse siden det ikke virker noen horisontal kraft.</p>
            <FormulaBox latex="x = v_{0x} \cdot t = 9{,}0 \cdot 0{,}50 = \underline{\underline{4{,}5\;\text{m}}}" variant="gold" />
            <p className="text-sm">Vertikal posisjon: fri fallbevegelse nedover (negativ y-retning).</p>
            <FormulaBox latex="y = -\tfrac{1}{2}g t^2 = -\tfrac{1}{2}(9{,}81)(0{,}50)^2 = \underline{\underline{-1{,}23\;\text{m}}}" variant="gold" />
            <p className="text-sm">Avstand fra startpunktet (origo) beregnes med Pytagoras.</p>
            <FormulaBox latex="r = \sqrt{x^2 + y^2} = \sqrt{(4{,}5)^2 + (1{,}23)^2} = \sqrt{20{,}25 + 1{,}51} = \underline{\underline{4{,}67\;\text{m}}}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Fart etter t = 0,50 s (del b)</p>
            <p className="text-sm">Horisontalfarten er uendret (ingen horisontal kraft), vertikalfarten øker pga. tyngdekraften.</p>
            <FormulaBox latex="v_x = v_{0x} = 9{,}0\;\text{m/s} \quad v_y = -g\,t = -9{,}81 \cdot 0{,}50 = -4{,}91\;\text{m/s}" variant="blue" />
            <p className="text-sm">Totalfarten og retningen finner vi med Pytagoras og arctan.</p>
            <FormulaBox latex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{(9{,}0)^2 + (4{,}91)^2} = \underline{\underline{10{,}2\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{|v_y|}{v_x}\right) = \tan^{-1}\!\left(\frac{4{,}91}{9{,}0}\right) = \underline{\underline{28{,}6°\;\text{under horisontal}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } x = 4{,}5\;\text{m},\; y = -1{,}23\;\text{m},\; r = \underline{\underline{4{,}67\;\text{m}}}" variant="gold" />
            <FormulaBox latex="\text{b) } v = \underline{\underline{10{,}2\;\text{m/s}}},\; 28{,}6° \text{ under horisontal}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Med horisontal start er <InlineLatex latex="v_{0y} = 0" />, men legemet akselererer nedover pga. tyngdekraften fra første stund. Den horisontale farten er konstant hele flyturen — det er et grunnprinsipp i prosjektilbevegelse. Retningen av fartsvektor finner vi alltid med arctan av komponentene.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 3: Baseball (skrå startfart) */}
      <ExerciseCard
        number={3}
        title="Baseball — Skrå startfart"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En baseball slås av gårde med fart <InlineLatex latex="v_0 = 37{,}0" /> m/s i vinkel{" "}
              <InlineLatex latex="\alpha_0 = 53{,}1°" /> med horisontalen.
            </p>
            <p className="mt-2">a) Finn posisjon og fart etter t = 2,00 s.</p>
            <p>b) Finn høyeste punkt og tidspunktet.</p>
            <p>c) Finn hvor ballen treffer bakken (y = 0).</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Dekomponér: v₀ₓ = v₀ cos α₀, v₀ᵧ = v₀ sin α₀.</p> },
          { label: "Hint 2", content: <p>Toppunkt: vᵧ = 0. Landing: y = 0 → løs for t (forkast t = 0).</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_0 = 37{,}0\;\text{m/s}" /> — startfart</li>
                <li><InlineLatex latex="\alpha_0 = 53{,}1°" /> — startvinkel over horisontal</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
                <li>Startes fra bakken: <InlineLatex latex="y_0 = 0" /></li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Posisjon <InlineLatex latex="(x, y)" /> og fart v ved t = 2,00 s</li>
                <li>b) Maksimal høyde <InlineLatex latex="y_{\max}" /> og tidspunktet <InlineLatex latex="t_{\text{topp}}" /></li>
                <li>c) Horisontal rekkevidde X (der y = 0 igjen) og landingstidspunkt</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Alltid start med dekomposisjon av startfarten. Deretter bruker vi de tre prosjektillikningene: <InlineLatex latex="x = v_{0x}t" />, <InlineLatex latex="y = v_{0y}t - \tfrac{1}{2}gt^2" />, <InlineLatex latex="v_y = v_{0y} - gt" />. Toppunkt: sett <InlineLatex latex="v_y = 0" />. Landing: sett <InlineLatex latex="y = 0" /> og løs andregradslikning.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Dekomposisjon av startfart</p>
            <p className="text-sm">Startfarten deles i en horisontal og en vertikal komponent ved hjelp av trigonometri.</p>
            <FormulaBox latex="v_{0x} = v_0 \cos\alpha_0 = 37{,}0\cos 53{,}1° = 22{,}2\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v_{0y} = v_0 \sin\alpha_0 = 37{,}0\sin 53{,}1° = 29{,}6\;\text{m/s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Posisjon og fart ved t = 2,00 s (del a)</p>
            <p className="text-sm">Bruker kinematikklikningene i hver retning separat.</p>
            <FormulaBox latex="x = v_{0x}\,t = 22{,}2 \cdot 2{,}00 = \underline{\underline{44{,}4\;\text{m}}}" variant="gold" />
            <FormulaBox latex="y = v_{0y}\,t - \tfrac{1}{2}g t^2 = 29{,}6(2{,}00) - \tfrac{1}{2}(9{,}81)(2{,}00)^2 = 59{,}2 - 19{,}6 = \underline{\underline{39{,}6\;\text{m}}}" variant="gold" />
            <p className="text-sm">Fartskomponentene ved t = 2,00 s:</p>
            <FormulaBox latex="v_x = v_{0x} = 22{,}2\;\text{m/s}, \quad v_y = v_{0y} - gt = 29{,}6 - 9{,}81(2{,}00) = 9{,}98\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{(22{,}2)^2 + (9{,}98)^2} = \underline{\underline{24{,}3\;\text{m/s}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Toppunktet (del b)</p>
            <p className="text-sm">I toppunktet er den vertikale fartkomponenten null: <InlineLatex latex="v_y = 0" />.</p>
            <FormulaBox latex="0 = v_{0y} - g\,t_{\text{topp}} \;\Rightarrow\; t_{\text{topp}} = \frac{v_{0y}}{g} = \frac{29{,}6}{9{,}81} = \underline{\underline{3{,}02\;\text{s}}}" variant="blue" />
            <FormulaBox latex="y_{\max} = v_{0y}\,t_{\text{topp}} - \tfrac{1}{2}g\,t_{\text{topp}}^2 = 29{,}6(3{,}02) - \tfrac{1}{2}(9{,}81)(3{,}02)^2 = \underline{\underline{44{,}7\;\text{m}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 4: Landingspunktet (del c)</p>
            <p className="text-sm">Setter <InlineLatex latex="y = 0" /> og løser andregradslikningen (forkaster t = 0 som er starttidspunktet).</p>
            <FormulaBox latex="0 = v_{0y}\,t - \tfrac{1}{2}g\,t^2 = t\!\left(v_{0y} - \tfrac{1}{2}g\,t\right)" variant="blue" />
            <FormulaBox latex="t = \frac{2\,v_{0y}}{g} = \frac{2(29{,}6)}{9{,}81} = \underline{\underline{6{,}0\;\text{s}}}" variant="gold" />
            <FormulaBox latex="X = v_{0x} \cdot t = 22{,}2 \cdot 6{,}0 = \underline{\underline{134\;\text{m}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } x=44{,}4\;\text{m},\;y=39{,}6\;\text{m},\;v=\underline{\underline{24{,}3\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\text{b) } t_{\text{topp}}=3{,}02\;\text{s},\;y_{\max}=\underline{\underline{44{,}7\;\text{m}}}" variant="gold" />
            <FormulaBox latex="\text{c) } t=6{,}0\;\text{s},\;X=\underline{\underline{134\;\text{m}}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Alltid dekomponér startfarten — det er det første steget i enhver prosjektiloppgave. Toppunktet finnes ved å sette <InlineLatex latex="v_y = 0" />. Når ballen starter og lander i samme høyde, er flytiden nøyaktig <InlineLatex latex="t = 2v_{0y}/g" /> og landingstiden er dobbelt toppunktstiden — merk den elegante symmetrien i bevegelsen.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 4: Sirkelbevegelse med konstant fart */}
      <ExerciseCard
        number={4}
        title="Sirkelbevegelse med konstant fart"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et legeme beveger seg med konstant fart <InlineLatex latex="v = 3{,}0" /> m/s i en
              sirkel med radius <InlineLatex latex="R = 8{,}0" /> m.
            </p>
            <p className="mt-2">a) Finn sentripetaakselerasjonen.</p>
            <p>b) Finn omløpstiden.</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Bruk a = v²/R og T = 2πR/v.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v = 3{,}0\;\text{m/s}" /> — banefart (konstant)</li>
                <li><InlineLatex latex="R = 8{,}0\;\text{m}" /> — radius av sirkelbanen</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Sentripetaakselerasjonen <InlineLatex latex="a_\perp" /></li>
                <li>b) Omløpstiden <InlineLatex latex="T" /></li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Når farten er konstant i sirkelbevegelse, er det kun sentripetaakselerasjon (normal på banen, rettet mot sentrum): <InlineLatex latex="a = v^2/R" />. Omløpstiden er omkretsen delt på farten: <InlineLatex latex="T = 2\pi R / v" />. Det finnes ingen tangentiell akselerasjon siden farten ikke endrer seg.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Sentripetaakselerasjon (del a)</p>
            <p className="text-sm">Selv med konstant fart har legemet akselerasjon fordi retningen stadig endrer seg — dette er sentripetaakselerasjonen rettet mot sirkelsenter.</p>
            <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{(3{,}0)^2}{8{,}0} = \frac{9{,}0}{8{,}0} = \underline{\underline{1{,}13\;\text{m/s}^2\;\text{(mot senter)}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 2: Omløpstid (del b)</p>
            <p className="text-sm">Omløpstiden er den tiden det tar å tilbakelegge én hel sirkelomkrets <InlineLatex latex="(2\pi R)" /> med fart v.</p>
            <FormulaBox latex="T = \frac{2\pi R}{v} = \frac{2\pi \cdot 8{,}0}{3{,}0} = \frac{50{,}3}{3{,}0} = \underline{\underline{16{,}8\;\text{s}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } a_\perp = \underline{\underline{1{,}13\;\text{m/s}^2}} \quad \text{b) } T = \underline{\underline{16{,}8\;\text{s}}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">En vanlig misforståelse er at konstant fart betyr null akselerasjon. Feil! Sirkelbevegelse med konstant fart HAR akselerasjon fordi retningen endres. Akselerasjonen peker alltid inn mot sentrum og kalles sentripetal (av latin: «som søker sentrum»). Størrelsen er alltid <InlineLatex latex="v^2/R" />.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 5: Sirkelbevegelse med variabel fart */}
      <ExerciseCard
        number={5}
        title="Sirkelbevegelse med variabel fart"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et legeme beveger seg i en sirkel med radius <InlineLatex latex="R = 2{,}0" /> m.
              Banefarten varierer: <InlineLatex latex="v(t) = 1{,}0 + 0{,}50\,t" /> m/s.
            </p>
            <p className="mt-2">
              Finn total akselerasjon (størrelse og retning mhp. normalen) ved t = 2,0 s.
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>To komponenter: a⊥ = v²/R og a∥ = dv/dt. Bruk Pytagoras for total.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="R = 2{,}0\;\text{m}" /> — radius av sirkelbanen</li>
                <li><InlineLatex latex="v(t) = 1{,}0 + 0{,}50\,t\;\text{m/s}" /> — banefart som funksjon av tid (varierer!)</li>
                <li><InlineLatex latex="t = 2{,}0\;\text{s}" /> — tidspunktet vi evaluerer ved</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Total akselerasjon <InlineLatex latex="a" /> (størrelse) ved t = 2,0 s</li>
                <li>Vinkel mellom totalakselerasjonen og normalen til banen</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Når farten varierer i sirkelbevegelse, har vi <em>to</em> akselerasjonskomponenter: (1) normalkomponenten <InlineLatex latex="a_\perp = v^2/R" /> rettet mot sentrum (endrer retning), og (2) tangentiellkomponenten <InlineLatex latex="a_\parallel = dv/dt" /> langs banen (endrer størrelse). Totalakselerasjonen finnes med Pytagoras, og vinkelen med arctan.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Banefart ved t = 2,0 s</p>
            <p className="text-sm">Setter inn i fartsfunksjonen for å finne øyeblikksfarten.</p>
            <FormulaBox latex="v(2{,}0) = 1{,}0 + 0{,}50 \cdot 2{,}0 = 1{,}0 + 1{,}0 = 2{,}0\;\text{m/s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Normalakselerasjon (sentripetal)</p>
            <p className="text-sm">Normalakselerasjonen avhenger av øyeblikksfarten og radien, og peker mot sirkelsenter.</p>
            <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{(2{,}0)^2}{2{,}0} = \frac{4{,}0}{2{,}0} = \underline{\underline{2{,}0\;\text{m/s}^2\;\text{(mot sentrum)}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Tangentiell akselerasjon</p>
            <p className="text-sm">Den tangentielle akselerasjonen er den tidsderiverte av banefarten — konstant her.</p>
            <FormulaBox latex="a_\parallel = \frac{dv}{dt} = \frac{d}{dt}(1{,}0 + 0{,}50\,t) = \underline{\underline{0{,}50\;\text{m/s}^2\;\text{(langs banen)}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 4: Totalakselerasjon og vinkel</p>
            <p className="text-sm">De to komponentene er vinkelrette på hverandre, så vi bruker Pytagoras og arctan.</p>
            <FormulaBox latex="a = \sqrt{a_\perp^2 + a_\parallel^2} = \sqrt{(2{,}0)^2 + (0{,}50)^2} = \sqrt{4{,}25} = \underline{\underline{2{,}06\;\text{m/s}^2}}" variant="gold" />
            <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{a_\parallel}{a_\perp}\right) = \tan^{-1}\!\left(\frac{0{,}50}{2{,}0}\right) = \underline{\underline{14°\;\text{fra normalen}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="a = \underline{\underline{2{,}06\;\text{m/s}^2}},\;\;14° \text{ fra normalen (innover)}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Når farten varierer i sirkelbevegelse, har du <em>to</em> akselerasjonskomponenter som er vinkelrette på hverandre: den normale endrer retning (sentripetal), den tangentielle endrer fartens størrelse. Totalakselerasjon = Pytagoras. Sammenlignet med konstant fart (kun normal) er dette det generelle tilfellet.</p>
            </div>
          </div>
        }
      />

      {/* ── Øvingsoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      {/* Oblig 1 Oppg 2 */}
      <ExerciseCard
        number={1}
        title="Stein kastet fra stup"
        difficulty="middels"
        source="Oblig 1, Oppgave 2"
        problem={
          <div>
            <p>
              En stein kastes skrått oppover fra toppen av et bratt stup. Nedenfor er
              landskapet flatt, 30 m lavere enn toppen. Startfart <InlineLatex latex="v_0 = 25" /> m/s,
              vinkel <InlineLatex latex="\alpha_0 = 70°" /> med horisontalplanet.
            </p>
            <p className="mt-2">a) Hvor høyt over utgangspunktet er steinen i det høyeste punktet?</p>
            <p>b) Hvor lang tid tar det før steinen treffer bakken? Hvor treffer den?</p>
            <p>c) Fartens verdi og retning idet den treffer bakken.</p>
            <p>d) Finnes en annen vinkel med samme v₀ som treffer samme punkt?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Origo i startpunktet. Bakken er y = −30 m.</p> },
          { label: "Hint 2", content: <p>For d): bruk baneligningen og løs for α₀. To vinkler gir samme x for gitt y.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_0 = 25\;\text{m/s}" /> — startfart</li>
                <li><InlineLatex latex="\alpha_0 = 70°" /> — startvinkel over horisontal</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
                <li>Bakken er 30 m lavere enn startpunktet: <InlineLatex latex="y_{\text{bakke}} = -30\;\text{m}" /></li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Maksimal høyde over startpunktet</li>
                <li>b) Tid til landing og horisontal avstand fra stupet</li>
                <li>c) Fartens størrelse og retning ved landing</li>
                <li>d) Om det finnes en alternativ startvinkel som gir samme treffpunkt</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Vi plasserer origo i startpunktet. Bakken er da ved <InlineLatex latex="y = -30\;\text{m}" />. Toppunkt: sett <InlineLatex latex="v_y = 0" />. Landing: sett <InlineLatex latex="y = -30" /> m og løs andregradslikning. For d) bruker vi den generelle baneligningen som inneholder <InlineLatex latex="\tan\alpha_0" /> og løser for den alternative vinkelen.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Dekomposisjon av startfart</p>
            <p className="text-sm">Splitter startfarten i horisontal og vertikal komponent.</p>
            <FormulaBox latex="v_{0x} = 25\cos 70° = 8{,}55\;\text{m/s}, \quad v_{0y} = 25\sin 70° = 23{,}49\;\text{m/s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Høyeste punkt (del a)</p>
            <p className="text-sm">I toppunktet er <InlineLatex latex="v_y = 0" />, og vi bruker kinematikklikning for y-retning.</p>
            <FormulaBox latex="t_{\text{topp}} = \frac{v_{0y}}{g} = \frac{23{,}49}{9{,}81} = 2{,}39\;\text{s}" variant="blue" />
            <FormulaBox latex="y_{\max} = v_{0y}\,t_{\text{topp}} - \tfrac{1}{2}g\,t_{\text{topp}}^2 = 23{,}49(2{,}39) - 4{,}905(2{,}39)^2 = \underline{\underline{28{,}1\;\text{m over startpunktet}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Landingstid og horisontal avstand (del b)</p>
            <p className="text-sm">Setter <InlineLatex latex="y = -30\;\text{m}" /> og løser andregradslikningen. Den negative roten forkastes.</p>
            <FormulaBox latex="-30 = 23{,}49\,t - 4{,}905\,t^2 \;\Longrightarrow\; 4{,}905t^2 - 23{,}49t - 30 = 0" variant="blue" />
            <FormulaBox latex="t = \frac{23{,}49 + \sqrt{(23{,}49)^2 + 4(4{,}905)(30)}}{2(4{,}905)} = \underline{\underline{5{,}84\;\text{s}}}" variant="gold" />
            <FormulaBox latex="x = v_{0x} \cdot t = 8{,}55 \cdot 5{,}84 = \underline{\underline{49{,}9\;\text{m from stupet}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 4: Fart og retning ved landing (del c)</p>
            <p className="text-sm">Beregner fartskomponentene ved landingstidspunktet t = 5,84 s.</p>
            <FormulaBox latex="v_x = v_{0x} = 8{,}55\;\text{m/s}, \quad v_y = v_{0y} - g\,t = 23{,}49 - 9{,}81(5{,}84) = -33{,}8\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v = \sqrt{(8{,}55)^2 + (33{,}8)^2} = \underline{\underline{34{,}9\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{33{,}8}{8{,}55}\right) = \underline{\underline{75{,}8°\;\text{under horisontal}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 5: Alternativ startvinkel (del d)</p>
            <p className="text-sm">Baneligningen er en andregradslikning i <InlineLatex latex="\tan\alpha_0" /> — to vinkler kan gi samme treffpunkt.</p>
            <FormulaBox latex="y = x\tan\alpha_0 - \frac{g x^2}{2v_0^2\cos^2\alpha_0}" variant="blue" />
            <p className="text-sm">Med x = 49,9 m og y = −30 m gir løsingen to vinkler: <InlineLatex latex="\alpha_0 = 70°" /> (den opprinnelige) og <InlineLatex latex="\alpha_0 \approx -11°" /> (11° under horisontal).</p>
            <p className="text-sm">Ja — man kan kaste steinen 11° <em>nedover</em> og treffe nøyaktig samme punkt.</p>

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } y_{\max} = \underline{\underline{28{,}1\;\text{m}}} \quad \text{b) } t = 5{,}84\;\text{s},\; x = \underline{\underline{49{,}9\;\text{m}}}" variant="gold" />
            <FormulaBox latex="\text{c) } v = \underline{\underline{34{,}9\;\text{m/s}}},\; 75{,}8° \text{ under horisontal} \quad \text{d) } \alpha_0 \approx -11°" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Nøkkelteknikk: når startpunkt og landingspunkt er på forskjellig høyde, setter vi y lik den faktiske landingshøyden (her −30 m) — ikke y = 0. Andregradslikningen gir to tidspunkter; forkast alltid det negative. Baneligningen er en andregradslikning i <InlineLatex latex="\tan\alpha_0" />, noe som forklarer at to ulike vinkler kan gi samme treffpunkt.</p>
            </div>
          </div>
        }
      />

      {/* Oblig 1 Oppg 3b — Sirkelbevegelse */}
      <ExerciseCard
        number={2}
        title="Sirkelbevegelse med bremseakselerasjon"
        difficulty="middels"
        source="Oblig 1, Oppgave 3b"
        problem={
          <div>
            <p>
              Et legeme beveger seg med urviseren i en sirkelbane med radius{" "}
              <InlineLatex latex="R = 2{,}0" /> m. Banefarten varierer:
            </p>
            <FormulaBox latex="v(t) = 5{,}0 - 0{,}10\,t \;\;\text{[m/s]}" variant="blue" />
            <p className="mt-2">
              Regn ut akselerasjonens normalkomponent og parallellkomponent etter 5,0 s.
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Finn v(5,0 s), deretter a⊥ = v²/R og a∥ = dv/dt.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="R = 2{,}0\;\text{m}" /> — radius av sirkelbanen</li>
                <li><InlineLatex latex="v(t) = 5{,}0 - 0{,}10\,t\;\text{m/s}" /> — banefart (avtar lineært med tid)</li>
                <li><InlineLatex latex="t = 5{,}0\;\text{s}" /> — tidspunktet vi evaluerer ved</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Normalkomponent <InlineLatex latex="a_\perp" /> (sentripetal akselerasjon) ved t = 5,0 s</li>
                <li>Parallellkomponent <InlineLatex latex="a_\parallel" /> (tangentiell akselerasjon) ved t = 5,0 s</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Siden farten varierer er det to akselerasjonskomponenter. Normalkomponenten (vinkelrett på banen, mot sentrum) er <InlineLatex latex="a_\perp = v^2/R" /> der vi bruker momentanfarten v(5,0). Parallellkomponenten (langs banen) er <InlineLatex latex="a_\parallel = dv/dt" /> — den forteller om legemet akselererer eller bremser.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Banefart ved t = 5,0 s</p>
            <p className="text-sm">Setter t = 5,0 s inn i fartsfunksjonen.</p>
            <FormulaBox latex="v(5{,}0) = 5{,}0 - 0{,}10 \cdot 5{,}0 = 5{,}0 - 0{,}50 = 4{,}5\;\text{m/s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Normalkomponent (sentripetal)</p>
            <p className="text-sm">Normalakselerasjonen er alltid rettet mot sirkelsenter og avhenger av øyeblikksfarten.</p>
            <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{(4{,}5)^2}{2{,}0} = \frac{20{,}25}{2{,}0} = \underline{\underline{10{,}1\;\text{m/s}^2\;\text{(mot sentrum)}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Parallellkomponent (tangentiell)</p>
            <p className="text-sm">Tangentialakselerasjonen er den tidsderiverte av banefarten. Negativ verdi betyr at legemet bremser.</p>
            <FormulaBox latex="a_\parallel = \frac{dv}{dt} = \frac{d}{dt}(5{,}0 - 0{,}10\,t) = \underline{\underline{-0{,}10\;\text{m/s}^2\;\text{(bremser)}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="a_\perp = \underline{\underline{10{,}1\;\text{m/s}^2}} \quad a_\parallel = \underline{\underline{-0{,}10\;\text{m/s}^2}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Negativt fortegn på <InlineLatex latex="a_\parallel" /> betyr at legemet bremser opp — farten minker med 0,10 m/s per sekund. Legg merke til at normalkomponenten (10,1 m/s²) er mye større enn parallellkomponenten (0,10 m/s²) her, noe som er typisk for sirkelbevegelse med moderat fart. Fortegnsvalg for <InlineLatex latex="a_\parallel" /> følger av om farten øker (+) eller minker (−).</p>
            </div>
          </div>
        }
      />

      {/* Selvlaget oppgave */}
      <ExerciseCard
        number={3}
        title="Fotball sparkes skrått"
        difficulty="lett"
        problem={
          <div>
            <p>
              En fotball sparkes fra bakken med fart 20 m/s i vinkel 30° med horisontalen.
            </p>
            <p className="mt-2">a) Finn maks høyde.</p>
            <p>b) Finn total flytid.</p>
            <p>c) Finn rekkevidden.</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>y₀ = 0. Startfartkomponenter: v₀ₓ = 20 cos 30° ≈ 17,3 m/s, v₀ᵧ = 20 sin 30° = 10 m/s.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_0 = 20\;\text{m/s}" /> — startfart</li>
                <li><InlineLatex latex="\alpha_0 = 30°" /> — startvinkel over horisontal</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
                <li>Startes fra og lander i bakkenivå: <InlineLatex latex="y_0 = 0" /></li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Maksimal høyde <InlineLatex latex="y_{\max}" /></li>
                <li>b) Total flytid <InlineLatex latex="T" /></li>
                <li>c) Rekkevidde <InlineLatex latex="R" /> (horisontal avstand til landing)</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Standard prosjektilbevegelse fra bakkenivå. Dekomponér startfarten, finn toppunkt ved <InlineLatex latex="v_y = 0" />, flytid ved <InlineLatex latex="y = 0" /> (symmetri gir <InlineLatex latex="T = 2v_{0y}/g" />), og rekkevidde som <InlineLatex latex="R = v_{0x} \cdot T" />.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Dekomposisjon av startfart</p>
            <p className="text-sm">Splitter startfarten i horisontal og vertikal komponent med trigonometri.</p>
            <FormulaBox latex="v_{0x} = v_0\cos 30° = 20 \cdot \tfrac{\sqrt{3}}{2} = 17{,}3\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v_{0y} = v_0\sin 30° = 20 \cdot \tfrac{1}{2} = 10{,}0\;\text{m/s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Maksimal høyde (del a)</p>
            <p className="text-sm">I toppunktet er <InlineLatex latex="v_y = 0" />. Vi bruker <InlineLatex latex="v_y^2 = v_{0y}^2 - 2g\,y_{\max}" /> løst for <InlineLatex latex="y_{\max}" />.</p>
            <FormulaBox latex="y_{\max} = \frac{v_{0y}^2}{2g} = \frac{(10{,}0)^2}{2(9{,}81)} = \frac{100}{19{,}62} = \underline{\underline{5{,}10\;\text{m}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Total flytid (del b)</p>
            <p className="text-sm">Siden start- og landingshøyde er like (y₀ = 0), er flytiden eksakt dobbelt av toppunktstiden.</p>
            <FormulaBox latex="T = \frac{2\,v_{0y}}{g} = \frac{2 \cdot 10{,}0}{9{,}81} = \underline{\underline{2{,}04\;\text{s}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 4: Rekkevidde (del c)</p>
            <p className="text-sm">Rekkevidden er horisontal fart ganget med total flytid.</p>
            <FormulaBox latex="R = v_{0x} \cdot T = 17{,}3 \cdot 2{,}04 = \underline{\underline{35{,}3\;\text{m}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } y_{\max} = \underline{\underline{5{,}10\;\text{m}}} \quad \text{b) } T = \underline{\underline{2{,}04\;\text{s}}} \quad \text{c) } R = \underline{\underline{35{,}3\;\text{m}}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Dette er grunnoppgaven i prosjektilbevegelse. Nøkkelen er å skille x og y fullstendig: y-retning gir tid (via toppunkt eller landing), x-retning gir horisontal avstand. Formlene <InlineLatex latex="y_{\max} = v_{0y}^2/(2g)" /> og <InlineLatex latex="T = 2v_{0y}/g" /> gjelder kun når start og landing er i samme høyde.</p>
            </div>
          </div>
        }
      />

      {/* ── Eksamensoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 3</p>
        <ul className="space-y-1 text-sm">
          <li>• <strong>Prosjektilbevegelse er det klart hyppigste temaet</strong> på eksamen — alle eksamener har minst én slik oppgave</li>
          <li>• Typisk: skråkast fra høyde, finn tid, posisjon, fart, vinkel</li>
          <li>• Avansert: kombinert med bevegelsesmengde (eksplosjon i toppunkt)</li>
          <li>• Sirkelbevegelse kan dukke opp som del av kraftoppgaver (kap. 5)</li>
        </ul>
      </div>

      {/* Eksamen Høst 2023 Oppg 1 */}
      <ExerciseCard
        number={1}
        title="Prosjektil fra klippetopp"
        difficulty="vanskelig"
        source="Eksamen Høst 2023"
        problem={
          <div>
            <p>
              Et prosjektil skytes ut 115 m over bakkenivå med fart{" "}
              <InlineLatex latex="v_0 = 65{,}0" /> m/s i vinkel 35,0° over horisontalen.
            </p>
            <p className="mt-2">a) Hvor lang tid tar det før prosjektilet treffer punkt P på bakkenivå? Bestem lengden X.</p>
            <p>b) Fartens størrelse og vinkel med bakken idet det treffer P.</p>
            <p>c) Prosjektilets maksimale høyde over bakkenivå.</p>
            <p>d) Prosjektilet sprenges i to like deler i toppunktet. Den ene faller loddrett ned. Hvor treffer den andre delen bakken?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Origo i skuddpunktet: y₀ = 0, bakken er ved y = −115 m.</p> },
          { label: "Hint 2", content: <p>I d): bruk bevaring av bevegelsesmengde i toppunktet. Del 1: vₓ = 0 → del 2: Vₓ = 2v₀ₓ.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_0 = 65{,}0\;\text{m/s}" /> — startfart</li>
                <li><InlineLatex latex="\alpha_0 = 35{,}0°" /> — startvinkel over horisontal</li>
                <li><InlineLatex latex="h = 115\;\text{m}" /> — høyde over bakkenivå ved avfyring</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
                <li>Origo i avfyringspunktet: bakken er ved <InlineLatex latex="y = -115\;\text{m}" /></li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Tid t til bakken og horisontal avstand X</li>
                <li>b) Fartens størrelse v og vinkel med bakken ved landing</li>
                <li>c) Maks høyde over bakkenivå (ikke over avfyringspunktet)</li>
                <li>d) Landingssted for del 2 etter eksplosjon i toppunktet</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Origo i avfyringspunktet → bakke ved y = −115 m. For d) bruker vi bevaring av bevegelsesmengde i toppunktet: i toppunktet er <InlineLatex latex="v_y = 0" />, så all bevegelsesmengde er horisontal. Del 1 stopper (<InlineLatex latex="v_{x1} = 0" />), og bevegelsesmengde overføres til del 2.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Dekomposisjon av startfart</p>
            <p className="text-sm">Splitter startfarten i horisontal og vertikal komponent.</p>
            <FormulaBox latex="v_{0x} = 65{,}0\cos 35{,}0° = 53{,}2\;\text{m/s}, \quad v_{0y} = 65{,}0\sin 35{,}0° = 37{,}3\;\text{m/s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Landingstid og rekkevidde (del a)</p>
            <p className="text-sm">Setter <InlineLatex latex="y = -115\;\text{m}" /> og løser andregradslikningen. Negativ rot forkastes.</p>
            <FormulaBox latex="-115 = 37{,}3\,t - 4{,}905\,t^2 \;\Longrightarrow\; 4{,}905t^2 - 37{,}3t - 115 = 0" variant="blue" />
            <FormulaBox latex="t = \frac{37{,}3 + \sqrt{(37{,}3)^2 + 4(4{,}905)(115)}}{2(4{,}905)} = \underline{\underline{9{,}96\;\text{s}}}" variant="gold" />
            <FormulaBox latex="X = v_{0x} \cdot t = 53{,}2 \cdot 9{,}96 = \underline{\underline{530\;\text{m}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Fart og vinkel ved landing (del b)</p>
            <p className="text-sm">Beregner fartskomponentene ved t = 9,96 s og finner størrelse og vinkel.</p>
            <FormulaBox latex="v_x = 53{,}2\;\text{m/s}, \quad v_y = 37{,}3 - 9{,}81(9{,}96) = -60{,}4\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v = \sqrt{(53{,}2)^2 + (60{,}4)^2} = \underline{\underline{80{,}5\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\theta = \tan^{-1}\!\left(\frac{60{,}4}{53{,}2}\right) = \underline{\underline{48{,}6°\;\text{under horisontal}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 4: Maks høyde over bakkenivå (del c)</p>
            <p className="text-sm">Toppunktet er der <InlineLatex latex="v_y = 0" />. Maks høyde over bakkenivå = høyde over origo + klippehøyde.</p>
            <FormulaBox latex="t_{\text{topp}} = \frac{v_{0y}}{g} = \frac{37{,}3}{9{,}81} = 3{,}80\;\text{s}" variant="blue" />
            <FormulaBox latex="y_{\text{over avfyring}} = 37{,}3(3{,}80) - 4{,}905(3{,}80)^2 = 141{,}7 - 70{,}8 = 70{,}9\;\text{m}" variant="blue" />
            <FormulaBox latex="h_{\max} = 115 + 70{,}9 = \underline{\underline{186\;\text{m over bakkenivå}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 5: Eksplosjon i toppunktet (del d)</p>
            <p className="text-sm">I toppunktet er <InlineLatex latex="v_y = 0" />, altså har prosjektilet kun horisontal fart <InlineLatex latex="v_{0x} = 53{,}2\;\text{m/s}" />. Bevaring av bevegelsesmengde (del 1 faller loddrett, dvs. <InlineLatex latex="v_{x1} = 0" />):</p>
            <FormulaBox latex="m\,v_{0x} = \frac{m}{2}\cdot 0 + \frac{m}{2}\cdot V_{x2} \;\Longrightarrow\; V_{x2} = 2\,v_{0x} = 2(53{,}2) = 106{,}4\;\text{m/s}" variant="blue" />
            <p className="text-sm">Del 2 starter fra toppunktet (186 m over bakken) med horisontal fart 106,4 m/s og null vertikalfart.</p>
            <FormulaBox latex="t_{\text{fall}} = \sqrt{\frac{2\,h_{\max}}{g}} = \sqrt{\frac{2(186)}{9{,}81}} = \sqrt{37{,}9} = 6{,}16\;\text{s}" variant="blue" />
            <p className="text-sm">x-posisjon i toppunktet (fra avfyringsstedet): <InlineLatex latex="x_{\text{topp}} = v_{0x} \cdot t_{\text{topp}} = 53{,}2 \cdot 3{,}80 = 202\;\text{m}" /></p>
            <FormulaBox latex="x_{\text{del 2}} = x_{\text{topp}} + V_{x2} \cdot t_{\text{fall}} = 202 + 106{,}4 \cdot 6{,}16 = \underline{\underline{858\;\text{m fra klippefoten}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } t=9{,}96\;\text{s},\;X=\underline{\underline{530\;\text{m}}} \quad \text{b) } v=\underline{\underline{80{,}5\;\text{m/s}}},\;48{,}6°" variant="gold" />
            <FormulaBox latex="\text{c) } h_{\max}=\underline{\underline{186\;\text{m}}} \quad \text{d) } x_{\text{del 2}}=\underline{\underline{858\;\text{m}}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Dette er en typisk vanskelig eksamensoppgave som kobler prosjektilbevegelse med bevaring av bevegelsesmengde. Nøkkelinsikt for del d): i toppunktet er <InlineLatex latex="v_y = 0" />, så all bevegelsesmengde er horisontal. Når del 1 stopper horisontalt, må del 2 ta dobbel horisontal fart. Etter eksplosjonen er del 2 et nytt prosjektil som starter fra toppunktet.</p>
            </div>
          </div>
        }
      />

      {/* Eksamen Vår 2023 Oppg 1 */}
      <ExerciseCard
        number={2}
        title="Basketballkast"
        difficulty="middels"
        source="Eksamen Vår 2023"
        problem={
          <div>
            <p>
              En basketballspiller kaster ballen (masse 600 g) mot kurven med vinkel{" "}
              <InlineLatex latex="\theta = 50°" />. Kurven er 4,0 m horisontalt unna og 0,90 m
              høyere enn kasthøyden.
            </p>
            <p className="mt-2">a) Vis at startfarten <InlineLatex latex="v_0 = 7{,}0" /> m/s.</p>
            <p>b) Hva er ballens kinetiske energi når den treffer kurven?</p>
            <p>c) Hva er ballens maksimale høyde over bakken? (Kastes fra 2,1 m.)</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>I a): skriv x- og y-ligningene, eliminer t, og løs for v₀.</p> },
          { label: "Hint 2", content: <p>I b): bruk energibevaring: E_K = ½mv₀² − mgΔy.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="\theta = 50°" /> — kastvinkel over horisontal</li>
                <li><InlineLatex latex="m = 0{,}600\;\text{kg}" /> — ballens masse</li>
                <li><InlineLatex latex="x = 4{,}0\;\text{m}" /> — horisontal avstand til kurven</li>
                <li><InlineLatex latex="\Delta y = 0{,}90\;\text{m}" /> — kurven er 0,90 m høyere enn kasthøyden</li>
                <li><InlineLatex latex="h_{\text{kast}} = 2{,}1\;\text{m}" /> — kasthøyde over bakken (for del c)</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /></li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Bevis at <InlineLatex latex="v_0 = 7{,}0\;\text{m/s}" /> er nødvendig startfart</li>
                <li>b) Kinetisk energi <InlineLatex latex="E_K" /> ved kurven</li>
                <li>c) Maksimal høyde over bakken</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">For a): eliminer t fra x-likningen og sett inn i y-likningen → baneligningen. Løs for <InlineLatex latex="v_0" />. For b): energibevaring er mer elegant enn kinematikk — vi trenger ikke finne farten v ved kurven eksplisitt. For c): finn toppunkttid og beregn y-posisjon over bakken.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Bevis v₀ = 7,0 m/s (del a)</p>
            <p className="text-sm">Fra x-likningen henter vi t, setter inn i y-likningen og løser for v₀.</p>
            <FormulaBox latex="x = v_0\cos\theta \cdot t \;\Longrightarrow\; t = \frac{x}{v_0\cos\theta}" variant="blue" />
            <p className="text-sm">Setter inn i y-likningen <InlineLatex latex="y = v_0\sin\theta \cdot t - \tfrac{1}{2}g t^2" />:</p>
            <FormulaBox latex="y = x\tan\theta - \frac{g\,x^2}{2\,v_0^2\cos^2\theta}" variant="blue" />
            <p className="text-sm">Løser for <InlineLatex latex="v_0" /> med x = 4,0 m, y = 0,90 m, θ = 50°:</p>
            <FormulaBox latex="v_0 = \sqrt{\frac{-g\,x^2}{2\cos^2\theta\,(y - x\tan\theta)}} = \sqrt{\frac{-(9{,}81)(4{,}0)^2}{2\cos^2 50°\,(0{,}90 - 4{,}0\tan 50°)}} = \underline{\underline{7{,}0\;\text{m/s}}} \;\checkmark" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 2: Kinetisk energi ved kurven (del b)</p>
            <p className="text-sm">Vi bruker energibevaring — tyngdekraften er konservativ, og kinetisk energi minus potensiell energiøkning gir kinetisk energi ved kurven.</p>
            <FormulaBox latex="E_{K,\text{kurve}} = \frac{1}{2}m v_0^2 - mg\Delta y" variant="blue" />
            <FormulaBox latex="E_{K,\text{kurve}} = \frac{1}{2}(0{,}600)(7{,}0)^2 - (0{,}600)(9{,}81)(0{,}90) = 14{,}7 - 5{,}30 = \underline{\underline{9{,}4\;\text{J}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Maks høyde over bakken (del c)</p>
            <p className="text-sm">Toppunktet er der <InlineLatex latex="v_y = 0" />. Finn toppunktstid og høyde over kastnivå, legg til kasthøyde.</p>
            <FormulaBox latex="t_{\text{topp}} = \frac{v_0\sin\theta}{g} = \frac{7{,}0\sin 50°}{9{,}81} = \frac{5{,}36}{9{,}81} = 0{,}547\;\text{s}" variant="blue" />
            <FormulaBox latex="\Delta y_{\text{topp}} = v_0\sin\theta \cdot t_{\text{topp}} - \tfrac{1}{2}g\,t_{\text{topp}}^2 = 5{,}36(0{,}547) - 4{,}905(0{,}547)^2 = 2{,}93 - 1{,}47 = 1{,}46\;\text{m}" variant="blue" />
            <FormulaBox latex="h_{\max} = h_{\text{kast}} + \Delta y_{\text{topp}} = 2{,}1 + 1{,}46 = \underline{\underline{3{,}6\;\text{m over bakken}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } v_0 = \underline{\underline{7{,}0\;\text{m/s}}} \;\checkmark \quad \text{b) } E_K = \underline{\underline{9{,}4\;\text{J}}} \quad \text{c) } h_{\max} = \underline{\underline{3{,}6\;\text{m}}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">«Vis at»-oppgaver krever at du utleder resultatet algebraisk — ikke bare setter inn og regner. Baneligningen er et kraftig verktøy for å finne startfart gitt treffpunkt. Energibevaring er et elegant alternativ til kinematikk for å finne fart på et annet punkt — unngår å løse for tid eksplisitt.</p>
            </div>
          </div>
        }
      />

      {/* Eksamen Høst 2023 Oppg 3d — Bowlingkule */}
      <ExerciseCard
        number={3}
        title="Bowlingkule i fritt fall fra kant"
        difficulty="middels"
        source="Eksamen Høst 2023"
        problem={
          <div>
            <p>
              En bowlingkule (5,2 kg) ruller utfor en 2,0 m høy kant med horisontal fart 7,3 m/s
              og er i fritt fall før den lander.
            </p>
            <p className="mt-2">a) Hvor langt fra kanten treffer kula bakken?</p>
            <p>b) Hva er kulas bevegelsesmengde ved landing?</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Horisontal start (v₀ᵧ = 0). Finn falltid fra y₀ = 2,0 m.</p> },
        ]}
        solution={
          <div className="space-y-3">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="m = 5{,}2\;\text{kg}" /> — kulens masse</li>
                <li><InlineLatex latex="v_{0x} = 7{,}3\;\text{m/s}" /> — horisontal startfart</li>
                <li><InlineLatex latex="v_{0y} = 0\;\text{m/s}" /> — ingen vertikal startfart (horisontal avgang)</li>
                <li><InlineLatex latex="y_0 = 2{,}0\;\text{m}" /> — høyde over bakken ved avgang</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Horisontal avstand x fra kanten til landingsstedet</li>
                <li>b) Bevegelsesmengde <InlineLatex latex="\vec{p} = m\vec{v}" /> ved landing (størrelse)</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Horisontalt skråkast: <InlineLatex latex="v_{0y} = 0" />. Finn falltid fra fri fallbevegelse (<InlineLatex latex="y_0 = \tfrac{1}{2}g t^2" />), bruk t til å finne horisontal avstand. Bevegelsesmengden er <InlineLatex latex="p = mv" /> der v er totalfarten ved landing.</p>
            </div>

            {/* Steg 4: Løsning */}
            <p className="font-semibold text-sm">Steg 1: Falltid (del a)</p>
            <p className="text-sm">Vertikalt: kula faller fra hvile gjennom y₀ = 2,0 m. Vi løser den frie falllikningen for t.</p>
            <FormulaBox latex="y_0 = \tfrac{1}{2}g\,t^2 \;\Longrightarrow\; t = \sqrt{\frac{2\,y_0}{g}} = \sqrt{\frac{2(2{,}0)}{9{,}81}} = \sqrt{0{,}408} = 0{,}639\;\text{s}" variant="blue" />

            <p className="font-semibold text-sm mt-2">Steg 2: Horisontal avstand</p>
            <p className="text-sm">Horisontal avstand er lik horisontal fart ganget med falltiden.</p>
            <FormulaBox latex="x = v_{0x} \cdot t = 7{,}3 \cdot 0{,}639 = \underline{\underline{4{,}7\;\text{m fra kanten}}}" variant="gold" />

            <p className="font-semibold text-sm mt-2">Steg 3: Bevegelsesmengde ved landing (del b)</p>
            <p className="text-sm">Finn fartskomponentene ved landing, deretter totalfart og bevegelsesmengde.</p>
            <FormulaBox latex="v_x = 7{,}3\;\text{m/s} \quad v_y = g\,t = 9{,}81 \cdot 0{,}639 = 6{,}27\;\text{m/s}" variant="blue" />
            <FormulaBox latex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{(7{,}3)^2 + (6{,}27)^2} = \sqrt{53{,}3 + 39{,}3} = \sqrt{92{,}6} = 9{,}62\;\text{m/s}" variant="blue" />
            <FormulaBox latex="p = mv = 5{,}2 \cdot 9{,}62 = \underline{\underline{50\;\text{kg·m/s}}}" variant="gold" />

            {/* Steg 5: Svar */}
            <p className="font-semibold text-sm mt-2">Svar</p>
            <FormulaBox latex="\text{a) } x = \underline{\underline{4{,}7\;\text{m}}} \quad \text{b) } p = \underline{\underline{50\;\text{kg·m/s}}}" variant="gold" />

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Det horisontale skråkastet er et vanlig eksamenscenario: legemet forlater en kant/hylle med horisontal fart. Nøkkelsteg: (1) finn falltid fra fri fall, (2) bruk t til horisontal avstand, (3) finn vertikalfart ved landing og bruk Pytagoras for totalfart. Bevegelsesmengden er alltid <InlineLatex latex="p = mv" /> med totalfartens størrelse.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
