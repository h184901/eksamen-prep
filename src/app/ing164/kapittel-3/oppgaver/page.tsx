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
            <p><strong>a) Koordinater ved t = 2,0 s:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="x = 2{,}0 - 0{,}25(4) = 1{,}0\;\text{m}" />,{" "}
              <InlineLatex latex="y = 2{,}0 + 0{,}025(8) = 2{,}2\;\text{m}" />
            </p>
            <FormulaBox latex="r = \sqrt{1{,}0^2 + 2{,}2^2} = \underline{\underline{2{,}42\;\text{m}}}" variant="gold" />

            <p><strong>b) Forflytning og gjennomsnittsfart:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="\vec{r}_0 = 2{,}0\hat{i}" /> m,{" "}
              <InlineLatex latex="\vec{r}_2 = 1{,}0\hat{i} + 2{,}2\hat{j}" /> m
            </p>
            <FormulaBox latex="\Delta\vec{r} = -1{,}0\hat{i} + 2{,}2\hat{j} \;\;\text{[m]}" variant="blue" />
            <FormulaBox latex="\vec{\bar{v}} = \frac{\Delta\vec{r}}{2{,}0} = \underline{\underline{-0{,}50\hat{i} + 1{,}1\hat{j} \;\;\text{[m/s]}}}" variant="gold" />

            <p><strong>c) Momentanfart:</strong></p>
            <FormulaBox latex="\vec{v} = (-0{,}50t)\hat{i} + (1{,}0 + 0{,}075t^2)\hat{j} \;\;\text{[m/s]}" variant="blue" />
            <p className="text-sm">
              Ved t = 2,0 s: <InlineLatex latex="\vec{v} = \underline{\underline{-1{,}0\hat{i} + 1{,}3\hat{j}}}" /> m/s
            </p>
            <FormulaBox latex="v = \sqrt{1{,}0^2 + 1{,}3^2} = \underline{\underline{1{,}64\;\text{m/s}}}" variant="gold" />

            <p><strong>d) Akselerasjon ved t = 2,0 s:</strong></p>
            <FormulaBox latex="\vec{a} = -0{,}50\hat{i} + 0{,}15t\hat{j} \;\;\text{[m/s}^2\text{]}" variant="blue" />
            <p className="text-sm">
              Ved t = 2,0 s: <InlineLatex latex="\vec{a} = \underline{\underline{-0{,}50\hat{i} + 0{,}30\hat{j}}}" /> m/s²
            </p>
            <FormulaBox latex="a = \sqrt{0{,}50^2 + 0{,}30^2} = \underline{\underline{0{,}58\;\text{m/s}^2}}" variant="gold" />

            <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D: deriver hver komponent separat. Farten er tangent til banen. Størrelsen finnes alltid med Pytagoras.</p>
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
            <p><strong>Hva vet vi?</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_{0x} = 9{,}0\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_{0y} = 0" />,{" "}
              <InlineLatex latex="t = 0{,}50\;\text{s}" />
            </p>

            <p><strong>a) Posisjon:</strong></p>
            <FormulaBox latex="x = 9{,}0 \cdot 0{,}50 = \underline{\underline{4{,}5\;\text{m}}}" variant="gold" />
            <FormulaBox latex="y = 0 - \tfrac{1}{2}(9{,}81)(0{,}50)^2 = \underline{\underline{-1{,}23\;\text{m}}}" variant="gold" />
            <FormulaBox latex="r = \sqrt{4{,}5^2 + 1{,}23^2} = \underline{\underline{4{,}67\;\text{m}}}" variant="blue" />

            <p><strong>b) Fart:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_x = 9{,}0\;\text{m/s}" /> (konstant),{" "}
              <InlineLatex latex="v_y = -9{,}81 \cdot 0{,}50 = -4{,}91\;\text{m/s}" />
            </p>
            <FormulaBox latex="v = \sqrt{9{,}0^2 + 4{,}91^2} = \underline{\underline{10{,}2\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{4{,}91}{9{,}0}\right) = \underline{\underline{28{,}6°}}\;\text{under horisontal}" variant="gold" />

            <p className="mt-2"><strong>Hva lærte vi?</strong> Med horisontal start: v₀ᵧ = 0, men legemet akselererer nedover pga. tyngdekraften. x-farten er konstant hele tiden.</p>
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
            <p><strong>Dekomposisjon:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_{0x} = 37{,}0 \cos 53{,}1° = 22{,}2\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_{0y} = 37{,}0 \sin 53{,}1° = 29{,}6\;\text{m/s}" />
            </p>

            <p><strong>a) Ved t = 2,00 s:</strong></p>
            <FormulaBox latex="x = 22{,}2 \cdot 2{,}00 = \underline{\underline{44{,}4\;\text{m}}}" variant="gold" />
            <FormulaBox latex="y = 29{,}6 \cdot 2{,}00 - 4{,}905 \cdot 4{,}00 = \underline{\underline{39{,}6\;\text{m}}}" variant="gold" />
            <p className="text-sm">
              <InlineLatex latex="v_x = 22{,}2\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_y = 29{,}6 - 9{,}81 \cdot 2{,}00 = 9{,}98\;\text{m/s}" />
            </p>
            <FormulaBox latex="v = \sqrt{22{,}2^2 + 9{,}98^2} = \underline{\underline{24{,}3\;\text{m/s}}}" variant="gold" />

            <p><strong>b) Toppunkt (<InlineLatex latex="v_y = 0" />):</strong></p>
            <FormulaBox latex="t = \frac{29{,}6}{9{,}81} = \underline{\underline{3{,}02\;\text{s}}}" variant="gold" />
            <FormulaBox latex="y_{\max} = 29{,}6 \cdot 3{,}02 - 4{,}905 \cdot 3{,}02^2 = \underline{\underline{44{,}7\;\text{m}}}" variant="gold" />

            <p><strong>c) Landing (y = 0):</strong></p>
            <FormulaBox latex="t(29{,}6 - 4{,}905t) = 0 \;\Rightarrow\; t = 0 \;\text{eller}\; t = \frac{29{,}6}{4{,}905} = \underline{\underline{6{,}0\;\text{s}}}" variant="blue" />
            <FormulaBox latex="x = 22{,}2 \cdot 6{,}0 = \underline{\underline{134\;\text{m}}}" variant="gold" />

            <p className="mt-2"><strong>Hva lærte vi?</strong> Alltid dekomponér startfarten. Toppunkt: vᵧ = 0. Tiden i luft = 2 × tid til toppunkt (kun fra bakkenivå). Merk symmetrien.</p>
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
            <p><strong>a) Sentripetaakselerasjon:</strong></p>
            <FormulaBox latex="a = \frac{v^2}{R} = \frac{3{,}0^2}{8{,}0} = \underline{\underline{1{,}13\;\text{m/s}^2}}" variant="gold" />
            <p className="text-sm">Rettet mot sirkelsenter.</p>

            <p><strong>b) Omløpstid:</strong></p>
            <FormulaBox latex="T = \frac{2\pi R}{v} = \frac{2\pi \cdot 8{,}0}{3{,}0} = \underline{\underline{16{,}8\;\text{s}}}" variant="gold" />
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
            <p><strong>Fart ved t = 2,0 s:</strong></p>
            <p className="text-sm"><InlineLatex latex="v(2{,}0) = 1{,}0 + 0{,}50 \cdot 2{,}0 = 2{,}0\;\text{m/s}" /></p>

            <p><strong>Normalakselerasjon (sentripetal):</strong></p>
            <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{2{,}0^2}{2{,}0} = \underline{\underline{2{,}0\;\text{m/s}^2}}" variant="gold" />

            <p><strong>Baneakselerasjon (tangentiell):</strong></p>
            <FormulaBox latex="a_\parallel = \frac{dv}{dt} = \underline{\underline{0{,}50\;\text{m/s}^2}}" variant="gold" />

            <p><strong>Total akselerasjon:</strong></p>
            <FormulaBox latex="a = \sqrt{2{,}0^2 + 0{,}50^2} = \underline{\underline{2{,}06\;\text{m/s}^2}}" variant="gold" />

            <p className="text-sm">
              Vinkel fra normalen: <InlineLatex latex="\alpha = \tan^{-1}(0{,}50/2{,}0) = \underline{\underline{14°}}" />
            </p>

            <p className="mt-2"><strong>Hva lærte vi?</strong> Når farten varierer i sirkelbevegelse, har du to akselerasjonskomponenter. Den normale endrer retning, den tangentielle endrer fartens størrelse.</p>
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
            <p><strong>Dekomposisjon:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_{0x} = 25\cos 70° = 8{,}55\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_{0y} = 25\sin 70° = 23{,}49\;\text{m/s}" />
            </p>

            <p><strong>a) Toppunkt (<InlineLatex latex="v_y = 0" />):</strong></p>
            <FormulaBox latex="t_{\text{topp}} = \frac{23{,}49}{9{,}81} = 2{,}39\;\text{s}" variant="blue" />
            <FormulaBox latex="y_{\max} = 23{,}49(2{,}39) - 4{,}905(2{,}39)^2 = \underline{\underline{28{,}1\;\text{m}}}" variant="gold" />

            <p><strong>b) Landing (y = −30 m):</strong></p>
            <FormulaBox latex="-30 = 23{,}49t - 4{,}905t^2" variant="blue" />
            <p className="text-sm">
              Andregradsformelen: <InlineLatex latex="t = -1{,}05" /> s (forkastes) eller <InlineLatex latex="\underline{\underline{t = 5{,}84\;\text{s}}}" />
            </p>
            <FormulaBox latex="x = 8{,}55 \cdot 5{,}84 = \underline{\underline{49{,}9\;\text{m}}}" variant="gold" />

            <p><strong>c) Fart ved landing:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_x = 8{,}55\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_y = 23{,}49 - 9{,}81(5{,}84) = -33{,}8\;\text{m/s}" />
            </p>
            <FormulaBox latex="v = \sqrt{8{,}55^2 + 33{,}8^2} = \underline{\underline{34{,}9\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{33{,}8}{8{,}55}\right) = \underline{\underline{75{,}8°}}\;\text{under horisontal}" variant="gold" />

            <p><strong>d) Alternativ vinkel:</strong></p>
            <p className="text-sm">
              Ja! Ved å løse baneligningen for den alternative vinkelen får man{" "}
              <InlineLatex latex="\alpha_0 = -11°" /> (11° under horisontalplanet). Man kan altså
              kaste steinen <em>nedover</em> med 11° og treffe samme punkt.
            </p>

            <p className="mt-2"><strong>Hva lærte vi?</strong> Når landingshøyden ≠ starthøyden, må du sette y = riktig verdi (her −30 m). To ulike vinkler kan gi samme treffpunkt.</p>
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
            <p><strong>Fart ved t = 5,0 s:</strong></p>
            <p className="text-sm"><InlineLatex latex="v(5{,}0) = 5{,}0 - 0{,}10 \cdot 5{,}0 = 4{,}5\;\text{m/s}" /></p>

            <p><strong>Normalkomponent (sentripetal):</strong></p>
            <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{4{,}5^2}{2{,}0} = \underline{\underline{10{,}1\;\text{m/s}^2}}" variant="gold" />
            <p className="text-sm">Rettet mot sentrum av sirkelen.</p>

            <p><strong>Parallellkomponent (tangentiell):</strong></p>
            <FormulaBox latex="a_\parallel = \frac{dv}{dt} = \underline{\underline{-0{,}10\;\text{m/s}^2}}" variant="gold" />
            <p className="text-sm">Negativ → legemet bremser opp (farten minker).</p>
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
            <p><strong>Startfart:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_{0x} = 20\cos 30° = 17{,}3\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_{0y} = 20\sin 30° = 10{,}0\;\text{m/s}" />
            </p>

            <p><strong>a) Maks høyde:</strong></p>
            <FormulaBox latex="y_{\max} = \frac{v_{0y}^2}{2g} = \frac{100}{19{,}62} = \underline{\underline{5{,}10\;\text{m}}}" variant="gold" />

            <p><strong>b) Flytid (y₀ = 0, lander ved y = 0):</strong></p>
            <FormulaBox latex="t = \frac{2v_{0y}}{g} = \frac{20}{9{,}81} = \underline{\underline{2{,}04\;\text{s}}}" variant="gold" />

            <p><strong>c) Rekkevidde:</strong></p>
            <FormulaBox latex="R = v_{0x} \cdot t = 17{,}3 \cdot 2{,}04 = \underline{\underline{35{,}3\;\text{m}}}" variant="gold" />
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
            <p><strong>Dekomposisjon:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_{0x} = 65{,}0\cos 35° = 53{,}2\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_{0y} = 65{,}0\sin 35° = 37{,}3\;\text{m/s}" />
            </p>

            <p><strong>a) Landing (y = −115 m):</strong></p>
            <FormulaBox latex="-115 = 37{,}3t - 4{,}905t^2" variant="blue" />
            <FormulaBox latex="4{,}905t^2 - 37{,}3t - 115 = 0" variant="blue" />
            <p className="text-sm">
              <InlineLatex latex="t = -2{,}36" /> s (forkastes) eller <InlineLatex latex="\underline{\underline{t = 9{,}96\;\text{s}}}" />
            </p>
            <FormulaBox latex="X = v_{0x} \cdot t = 53{,}2 \cdot 9{,}96 = \underline{\underline{530\;\text{m}}}" variant="gold" />

            <p><strong>b) Fart ved landing:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_x = 53{,}2\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_y = 37{,}3 - 9{,}81(9{,}96) = -60{,}4\;\text{m/s}" />
            </p>
            <FormulaBox latex="v = \sqrt{53{,}2^2 + 60{,}4^2} = \underline{\underline{80{,}5\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="\theta = \tan^{-1}\!\left(\frac{60{,}4}{53{,}2}\right) = \underline{\underline{48{,}6°}}\;\text{under horisontal}" variant="gold" />

            <p><strong>c) Maks høyde over bakkenivå:</strong></p>
            <FormulaBox latex="t_{\text{topp}} = \frac{37{,}3}{9{,}81} = 3{,}80\;\text{s}" variant="blue" />
            <FormulaBox latex="y_{\text{over origo}} = \frac{37{,}3^2}{2(9{,}81)} = 70{,}9\;\text{m}" variant="blue" />
            <FormulaBox latex="h_{\max} = 115 + 70{,}9 = \underline{\underline{186\;\text{m over bakkenivå}}}" variant="gold" />

            <p><strong>d) Eksplosjon i toppunkt:</strong></p>
            <p className="text-sm">
              I toppunktet: <InlineLatex latex="v_x = 53{,}2\;\text{m/s}" />, <InlineLatex latex="v_y = 0" />.
            </p>
            <p className="text-sm">
              Del 1 faller loddrett (<InlineLatex latex="v_{x1} = 0" />). Bevaring av bevegelsesmengde:
            </p>
            <FormulaBox latex="m \cdot v_{0x} = \frac{m}{2} \cdot 0 + \frac{m}{2} \cdot V_{x2} \;\Rightarrow\; V_{x2} = 2v_{0x} = 106{,}5\;\text{m/s}" variant="blue" />
            <p className="text-sm">
              Del 2 starter ved høyde 186 m over bakken med <InlineLatex latex="V_{x2} = 106{,}5" /> m/s, <InlineLatex latex="V_{y2} = 0" />.
            </p>
            <FormulaBox latex="t_{\text{fall}} = \sqrt{\frac{2 \cdot 186}{9{,}81}} = 6{,}16\;\text{s}" variant="blue" />
            <p className="text-sm">
              x-posisjon av toppunkt: <InlineLatex latex="x_{\text{topp}} = 53{,}2 \cdot 3{,}80 = 202\;\text{m}" />
            </p>
            <FormulaBox latex="x_{\text{del2}} = 202 + 106{,}5 \cdot 6{,}16 = \underline{\underline{858\;\text{m fra klippefoten}}}" variant="gold" />

            <p className="mt-2"><strong>Hva lærte vi?</strong> Denne oppgaven kombinerer prosjektilbevegelse med bevaring av bevegelsesmengde. I toppunktet er vᵧ = 0, kun horisontal fart. Etter eksplosjonen behandles del 2 som et nytt prosjektil.</p>
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
            <p><strong>a) Vis at v₀ = 7,0 m/s:</strong></p>
            <p className="text-sm">
              Fra x-likningen: <InlineLatex latex="t = x/(v_0\cos\theta)" />. Sett inn i y-likningen:
            </p>
            <FormulaBox latex="y = x\tan\theta - \frac{gx^2}{2v_0^2\cos^2\theta}" variant="blue" />
            <p className="text-sm">
              Med x = 4,0 m, y = 0,90 m, θ = 50°:
            </p>
            <FormulaBox latex="v_0 = \sqrt{\frac{-gx^2}{2\cos^2\theta\,(y - x\tan\theta)}} = \underline{\underline{7{,}0\;\text{m/s}}} \;\checkmark" variant="gold" />

            <p><strong>b) Kinetisk energi ved kurven:</strong></p>
            <p className="text-sm">Bruker energibevaring (tyngdekraften er konservativ):</p>
            <FormulaBox latex="E_K = \tfrac{1}{2}mv_0^2 - mg\Delta y = \tfrac{1}{2}(0{,}600)(7{,}0)^2 - (0{,}600)(9{,}81)(0{,}90)" variant="blue" />
            <FormulaBox latex="E_K = 14{,}7 - 5{,}3 = \underline{\underline{9{,}4\;\text{J}}}" variant="gold" />

            <p><strong>c) Maks høyde over bakken:</strong></p>
            <FormulaBox latex="t_{\text{topp}} = \frac{v_0\sin 50°}{g} = \frac{7{,}0 \cdot 0{,}766}{9{,}81} = 0{,}547\;\text{s}" variant="blue" />
            <FormulaBox latex="y_{\text{over kast}} = v_0\sin 50° \cdot t - \tfrac{1}{2}gt^2 = 1{,}47\;\text{m}" variant="blue" />
            <FormulaBox latex="h = 2{,}1 + 1{,}47 = \underline{\underline{3{,}6\;\text{m over bakken}}}" variant="gold" />

            <p className="mt-2"><strong>Hva lærte vi?</strong> «Vis at»-oppgaver krever at du finner uttrykket algebraisk. Energibevaring er et effektivt alternativ til kinematikk for å finne fart.</p>
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
            <p><strong>a) Falltid:</strong></p>
            <FormulaBox latex="t = \sqrt{\frac{2y_0}{g}} = \sqrt{\frac{2 \cdot 2{,}0}{9{,}81}} = 0{,}639\;\text{s}" variant="blue" />
            <FormulaBox latex="x = v_x \cdot t = 7{,}3 \cdot 0{,}639 = \underline{\underline{4{,}7\;\text{m}}}" variant="gold" />

            <p><strong>b) Bevegelsesmengde:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="v_y = gt = 9{,}81 \cdot 0{,}639 = 6{,}27\;\text{m/s}" />
            </p>
            <FormulaBox latex="v = \sqrt{7{,}3^2 + 6{,}27^2} = 9{,}6\;\text{m/s}" variant="blue" />
            <FormulaBox latex="p = mv = 5{,}2 \cdot 9{,}6 = \underline{\underline{50\;\text{kg·m/s}}}" variant="gold" />
          </div>
        }
      />
    </div>
  );
}
