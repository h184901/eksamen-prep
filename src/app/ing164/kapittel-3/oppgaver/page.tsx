"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Bevegelse i 2D og 3D</h2>

      {/* ── Oppgavestrategier ── */}
      <CollapsibleSection title="Oppgavestrategier">
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
      </CollapsibleSection>

      {/* ── Gjennomgåtte eksempler ── */}
      <CollapsibleSection title="Eksempler fra timen">

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

      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Vår 2023, Høst 2023</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 1, oppgave 2</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-3" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 3</p>
        </Link>
      </div>
    </div>
  );
}
