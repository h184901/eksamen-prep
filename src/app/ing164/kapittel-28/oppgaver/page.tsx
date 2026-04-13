"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Kapittel 28</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-bold mt-8 mb-4">Oppgavestrategier</h3>

      <div className="space-y-6">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: B-felt fra en ladning i bevegelse (28.1)</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Tegn situasjonen: ladning med fart <InlineLatex latex="\vec{v}" />, punkt P, avstand r.</li>
            <li><strong>2.</strong> Finn vinkelen φ mellom <InlineLatex latex="\vec{v}" /> og <InlineLatex latex="\hat{r}" /> (retning fra ladning til P).</li>
            <li><strong>3.</strong> Beregn størrelse: <InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></li>
            <li><strong>4.</strong> Bestem retning: Bruk høyrehåndsregelen (<InlineLatex latex="\vec{v} \times \hat{r}" />).
              For positiv ladning peker fingrene fra v mot r̂, tommel gir B-retning.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Biot-Savart (28.2-28.3)</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Identifiser geometrien: rett leder, sirkulær sløyfe, etc.</li>
            <li><strong>2.</strong> For et enkelt element: bruk <InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin\varphi}{r^2}" /></li>
            <li><strong>3.</strong> For lang rett leder: bruk direkte <InlineLatex latex="B = \frac{\mu_0 I}{2\pi r}" /></li>
            <li><strong>4.</strong> Husk at r er <em>vinkelrett</em> avstand for lang leder.</li>
          </ol>
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Vanlig feil:</p>
            <p className="text-sm">Blander r i Biot-Savart (avstand fra element til punkt) med r i lang-leder-formelen (vinkelrett avstand). De er forskjellige!</p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Kraft mellom parallelle ledere (28.4)</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Identifiser strømmene <InlineLatex latex="I" /> og <InlineLatex latex="I'" />, og avstand r.</li>
            <li><strong>2.</strong> Bruk <InlineLatex latex="F_m/L = \mu_0 II'/(2\pi r)" /> for kraft per lengdeenhet.</li>
            <li><strong>3.</strong> Bestem retning:
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Samme retning → <strong>tiltrekker</strong></li>
                <li>• Motsatt retning → <strong>frastøter</strong></li>
              </ul>
            </li>
            <li><strong>4.</strong> For total kraft: <InlineLatex latex="F = (F/L) \cdot L" /></li>
          </ol>
        </div>
      </div>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-bold mt-10 mb-4">Gjennomgåtte eksempler</h3>

      <ExerciseCard
        number={1}
        title="To protoner i bevegelse — elektrisk og magnetisk kraft"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              To protoner beveger seg i <em>motsatte retninger</em> langs x-aksen med fart{" "}
              <InlineLatex latex="v" />. Avstanden mellom dem er <InlineLatex latex="r" /> (langs y-aksen).
            </p>
            <p className="mt-2">
              a) Finn den elektriske kraften mellom protonene.
            </p>
            <p>
              b) Finn B-feltet som det nederste protonet skaper ved det øverste.
            </p>
            <p>
              c) Finn den magnetiske kraften på det øverste protonet.
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Elektrisk kraft: Coulombs lov med <InlineLatex latex="q = e" />.</p> },
          { label: "Hint 2", content: <p>B-felt: Det nederste protonet beveger seg i +x, og punktet er i +y-retning. Vinkelen φ = 90°.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Elektrisk kraft:</strong></p>
            <FormulaBox
              latex="F_e = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} \quad \text{(i y-retningen, frastøtende)}"
              variant="gold"
            />

            <p><strong>b) B-felt fra det nederste protonet:</strong></p>
            <p className="text-sm">
              Det nederste protonet beveger seg i +x-retning. Punktet (der det øverste protonet er) ligger
              i +y-retning, altså φ = 90°.
            </p>
            <FormulaBox
              latex="B = \frac{\mu_0}{4\pi}\frac{ev}{r^2}"
              variant="gold"
            />

            <p><strong>c) Magnetisk kraft:</strong></p>
            <p className="text-sm">
              Det øverste protonet har fart i −x-retning og er i B-feltet fra det nederste:
            </p>
            <FormulaBox
              latex="F_m = qvB = e \cdot v \cdot \frac{\mu_0}{4\pi}\frac{ev}{r^2} = \frac{\mu_0}{4\pi}\frac{e^2 v^2}{r^2}"
              variant="gold"
            />
            <p className="text-sm">
              Retning: <strong>tiltrekkende</strong> (mot det andre protonet) — altså <em>motsatt</em> av den elektriske kraften.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Elektrisk kraft frastøter, magnetisk kraft tiltrekker.
              Men for ladninger med <InlineLatex latex="v \ll c" /> er <InlineLatex latex="F_m \ll F_e" /> (den magnetiske kraften er mye svakere).</p>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Feltbidrag fra et strømelement (Biot-Savart)"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kobbertråd fører strøm <InlineLatex latex="I = 125\;\text{A}" />.
              Vi ser på et lite element med lengde <InlineLatex latex="dl = 0{,}01\;\text{m} = 1\;\text{cm}" />.
              Finn feltbidraget <InlineLatex latex="dB" /> i et punkt P som er{" "}
              <InlineLatex latex="r = 1{,}2\;\text{m}" /> unna elementet:
            </p>
            <p className="mt-2">a) Punktet P ligger rett ut fra lederen (φ = 90°).</p>
            <p>b) Punktet P ligger 30° fra lederens retning (φ = 30°).</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bruk <InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin\varphi}{r^2}" /></p> },
          { label: "Hint 2", content: <p>Husk: <InlineLatex latex="\mu_0/(4\pi) = 10^{-7}\;\text{T·m/A}" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) φ = 90°:</strong></p>
            <FormulaBox
              latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 90°}{r^2} = 10^{-7} \cdot \frac{125 \cdot 0{,}01 \cdot 1}{1{,}2^2} = \underline{\underline{8{,}7 \times 10^{-8}\;\text{T}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: ut av arket (høyrehåndsregelen: dl × r̂).</p>

            <p><strong>b) φ = 30°:</strong></p>
            <FormulaBox
              latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 30°}{r^2} = 10^{-7} \cdot \frac{125 \cdot 0{,}01 \cdot 0{,}5}{1{,}2^2} = \underline{\underline{4{,}3 \times 10^{-8}\;\text{T}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> sin φ-faktoren er avgjørende. Ved φ = 30° er feltet halvparten av φ = 90°.
              Ved φ = 0° (langs lederen) er feltet null.</p>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Avstand fra lang rett leder for gitt B-felt"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En lang, rett strømførende leder fører <InlineLatex latex="I = 1{,}0\;\text{A}" />.
              Vi måler magnetfeltet til <InlineLatex latex="B = 0{,}5 \times 10^{-4}\;\text{T}" />.
            </p>
            <p className="mt-2">
              Hvor langt unna lederen er vi?
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Bruk <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> og løs for r.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Løsning:</strong></p>
            <p className="text-sm">Vi løser <InlineLatex latex="B = \mu_0 I / (2\pi r)" /> for r:</p>
            <FormulaBox
              latex="r = \frac{\mu_0 I}{2\pi B} = \frac{4\pi \times 10^{-7} \cdot 1{,}0}{2\pi \cdot 0{,}5 \times 10^{-4}} = 4 \times 10^{-3}\;\text{m} = \underline{\underline{4\;\text{mm}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Vi kan omforme formelen for å finne avstand.
              Legg merke til at 4 mm er svært nært lederen — magnetfeltet fra en vanlig leder er ganske svakt.</p>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Kraft mellom parallelle superledere"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              To rette, parallelle superledere plasseres med innbyrdes avstand{" "}
              <InlineLatex latex="r = 4{,}5\;\text{mm}" />. De fører lik strøm{" "}
              <InlineLatex latex="I = 15\,000\;\text{A}" /> i <em>motsatte</em> retninger.
            </p>
            <p className="mt-2">Hva er magnetkraften per lengdeenhet?</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Bruk <InlineLatex latex="F_m/L = \mu_0 II'/(2\pi r)" />. Husk å konvertere mm til m.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <FormulaBox
              latex="\frac{F_m}{L} = \frac{\mu_0 I \cdot I'}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 15000 \cdot 15000}{2\pi \cdot 4{,}5 \times 10^{-3}} = \underline{\underline{1{,}0 \times 10^4\;\text{N/m}}}"
              variant="gold"
            />
            <p className="text-sm">
              Siden strømmene er i <strong>motsatte retninger</strong>, er kraften <strong>frastøtende</strong>.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> 10 kN per meter er en enorm kraft!
              Med superledere som fører store strømmer, blir de magnetiske kreftene svært betydelige.
              Superledermagnetene i LHC (CERN) må designes for å tåle slike krefter.</p>
          </div>
        }
      />

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-bold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Magnetfelt fra en ladning"
        difficulty="lett"
        source="Oppgave 28.1"
        problem={
          <div>
            <p>
              Et proton (<InlineLatex latex="q = 1{,}60 \times 10^{-19}\;\text{C}" />) beveger seg med
              fart <InlineLatex latex="v = 4{,}0 \times 10^6\;\text{m/s}" /> i +x-retning.
            </p>
            <p className="mt-2">
              Finn magnetfeltet (størrelse og retning) i et punkt som ligger 0,50 m fra protonet i:
            </p>
            <p>a) +y-retning (φ = 90°)</p>
            <p>b) en retning som danner 45° med x-aksen</p>
            <p>c) +x-retning (φ = 0°)</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bruk <InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" />. Sett inn r = 0,50 m.</p> },
          { label: "Hint 2", content: <p>For retning: <InlineLatex latex="\vec{v} \times \hat{r}" />. Bruk høyrehåndsregelen.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) φ = 90°:</strong></p>
            <FormulaBox
              latex="B = 10^{-7} \cdot \frac{1{,}60 \times 10^{-19} \cdot 4{,}0 \times 10^6 \cdot \sin 90°}{0{,}50^2} = \underline{\underline{2{,}56 \times 10^{-19}\;\text{T}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: <InlineLatex latex="\hat{x} \times \hat{y} = \hat{z}" /> → i −z-retning (inn i arket).</p>

            <p><strong>b) φ = 45°:</strong></p>
            <FormulaBox
              latex="B = 10^{-7} \cdot \frac{1{,}60 \times 10^{-19} \cdot 4{,}0 \times 10^6 \cdot \sin 45°}{0{,}50^2} = \underline{\underline{1{,}81 \times 10^{-19}\;\text{T}}}"
              variant="gold"
            />

            <p><strong>c) φ = 0°:</strong></p>
            <p className="text-sm"><InlineLatex latex="\sin 0° = 0 \Rightarrow B = 0" />. Ingen felt langs bevegelsesretningen!</p>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Biot-Savart fra et strømelement"
        difficulty="lett"
        source="Oppgave 28.11"
        problem={
          <div>
            <p>
              Et kort stykke av en ledning bærer strøm <InlineLatex latex="I = 10{,}0\;\text{A}" />.
              Elementet <InlineLatex latex="dl = 0{,}50\;\text{mm} = 5{,}0 \times 10^{-4}\;\text{m}" />{" "}
              peker i +y-retning. Finn <InlineLatex latex="d\vec{B}" /> i punktet{" "}
              <InlineLatex latex="(x, y, z) = (2{,}0\;\text{m},\, 0,\, 0)" />.
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>dl er i +y, r̂ er i +x (fra elementet til punktet). φ = 90°.</p> },
          { label: "Hint 2", content: <p><InlineLatex latex="\hat{y} \times \hat{x} = -\hat{z}" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <p className="text-sm"><InlineLatex latex="d\vec{l} = dl\,\hat{y}" />, <InlineLatex latex="\hat{r} = \hat{x}" />, <InlineLatex latex="r = 2{,}0\;\text{m}" />, <InlineLatex latex="\varphi = 90°" /></p>
            <FormulaBox
              latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 90°}{r^2} = 10^{-7}\cdot\frac{10{,}0 \cdot 5{,}0\times10^{-4}}{(2{,}0)^2} = \underline{\underline{1{,}25 \times 10^{-10}\;\text{T}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: <InlineLatex latex="\hat{y}\times\hat{x} = -\hat{z}" /> → feltet peker i <strong>−z-retning</strong> (inn i arket).</p>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Magnetfelt fra lang rett ledning"
        difficulty="lett"
        source="Oppgave 28.19"
        problem={
          <div>
            <p>
              En lang, rett ledning fører strøm <InlineLatex latex="I = 4{,}00\;\text{A}" />.
              Finn magnetfeltet i avstand <InlineLatex latex="r = 0{,}10\;\text{m}" /> fra ledningen.
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Bruk direkte: <InlineLatex latex="B = \mu_0 I/(2\pi r)" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <FormulaBox
              latex="B = \frac{\mu_0 I}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 4{,}00}{2\pi \cdot 0{,}10} = \underline{\underline{8{,}0 \times 10^{-6}\;\text{T} = 8{,}0\;\mu\text{T}}}"
              variant="gold"
            />
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Kraft mellom parallelle ledere"
        difficulty="middels"
        source="Oppgave 28.27"
        problem={
          <div>
            <p>
              To parallelle ledere med avstand <InlineLatex latex="r = 0{,}40\;\text{m}" /> fører strømmer{" "}
              <InlineLatex latex="I_1 = 5{,}0\;\text{A}" /> og <InlineLatex latex="I_2 = 2{,}0\;\text{A}" /> i
              samme retning. Lederne er <InlineLatex latex="L = 3{,}0\;\text{m}" /> lange.
            </p>
            <p className="mt-2">
              a) Finn kraften mellom dem.
            </p>
            <p>
              b) Er kraften tiltrekkende eller frastøtende?
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Finn kraft per lengdeenhet først, gang med L.</p> },
          { label: "Hint 2", content: <p>Samme strømretning → tiltrekkende.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Kraft:</strong></p>
            <FormulaBox
              latex="F = \frac{\mu_0 I_1 I_2}{2\pi r} \cdot L = \frac{4\pi \times 10^{-7} \cdot 5{,}0 \cdot 2{,}0}{2\pi \cdot 0{,}40} \cdot 3{,}0 = \underline{\underline{1{,}5 \times 10^{-5}\;\text{N} = 15\;\mu\text{N}}}"
              variant="gold"
            />
            <p><strong>b)</strong> Strømmene er i <strong>samme retning</strong>, så kraften er <strong>tiltrekkende</strong>.</p>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Superposisjon av B-felt fra to ledere"
        difficulty="vanskelig"
        source="Problem 28.61"
        problem={
          <div>
            <p>
              To lange, parallelle ledere er atskilt med avstand <InlineLatex latex="d" />.
              De fører strømmer <InlineLatex latex="I_1" /> og <InlineLatex latex="I_2" /> i <em>motsatte</em> retninger.
            </p>
            <p className="mt-2">
              Finn magnetfeltet i et punkt P som ligger midt mellom de to lederne.
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Hvert B-felt er <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> med <InlineLatex latex="r = d/2" />.</p> },
          { label: "Hint 2", content: <p>Bruk superposisjon: siden strømmene er i motsatte retninger, peker begge B-feltene i <em>samme</em> retning i punktet midt mellom. Legg dem sammen!</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p className="text-sm">
              I punktet midt mellom er avstanden fra begge lederne <InlineLatex latex="r = d/2" />.
            </p>
            <p className="text-sm">
              Høyrehåndsregelen viser at B-feltene fra begge lederne peker i <strong>samme retning</strong> i midtpunktet
              (motsatte strømmer gir felt som adderer):
            </p>
            <FormulaBox
              latex="B_{\text{tot}} = B_1 + B_2 = \frac{\mu_0 I_1}{2\pi(d/2)} + \frac{\mu_0 I_2}{2\pi(d/2)} = \frac{\mu_0(I_1 + I_2)}{\pi d}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> For to ledere med <em>motsatte</em> strømmer adderer B-feltene i midten.
              Hadde strømmene vært i <em>samme</em> retning, ville de subtrahert (pekt i motsatte retninger i midtpunktet).</p>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-bold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-6">
        <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Eksamenstips — Kapittel 28</p>
        <ul className="text-sm space-y-1">
          <li>• <strong>Lang rett leder</strong> er den vanligste oppgavetypen — ha <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> i fingrene</li>
          <li>• <strong>Kraft mellom ledere</strong> dukker ofte opp — husk å sjekke retningen (same/opposite)</li>
          <li>• <strong>Biot-Savart for et element</strong> kan komme — pass på vinkelen φ</li>
          <li>• <strong>Superposisjon</strong> av felt fra flere ledere — tegn retningene nøye!</li>
          <li>• Husk: <InlineLatex latex="\mu_0/(4\pi) = 10^{-7}" /> for rask regning</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Eksamenstype: B-felt og kraft med parallelle ledere"
        difficulty="middels"
        source="Eksamenstype"
        problem={
          <div>
            <p>
              Tre lange, parallelle ledere er plassert i et plan. Leder A og C er adskilt med 10 cm
              og fører begge <InlineLatex latex="I_A = I_C = 5{,}0\;\text{A}" /> oppover.
              Leder B er midt mellom (5 cm fra hver) og fører <InlineLatex latex="I_B = 10{,}0\;\text{A}" /> nedover.
            </p>
            <p className="mt-2">
              a) Finn det totale magnetfeltet i leder B sin posisjon (fra A og C).
            </p>
            <p>b) Finn kraft per lengdeenhet på leder B.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Finn B fra A og B fra C separat. Begge har r = 5 cm.</p> },
          { label: "Hint 2", content: <p>A fører strøm oppover, C fører strøm oppover. Bruk høyrehåndsregelen for å finne B-retning ved B sin posisjon.</p> },
          { label: "Hint 3", content: <p>Kraft per lengdeenhet: <InlineLatex latex="F/L = I_B \cdot B_{\text{tot}}" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) B-felt ved leder B:</strong></p>
            <p className="text-sm">
              B fra leder A ved B (r = 0,05 m):
            </p>
            <FormulaBox
              latex="B_A = \frac{\mu_0 I_A}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 5{,}0}{2\pi \cdot 0{,}05} = 2{,}0 \times 10^{-5}\;\text{T}"
              variant="blue"
            />
            <p className="text-sm">
              B fra leder C ved B (r = 0,05 m) er like stort. Høyrehåndsregelen viser at begge peker
              i <strong>samme retning</strong> ved B sin posisjon (begge har oppover strøm, og B er mellom dem).
            </p>
            <FormulaBox
              latex="B_{\text{tot}} = B_A + B_C = 2 \times 2{,}0 \times 10^{-5} = \underline{\underline{4{,}0 \times 10^{-5}\;\text{T}}}"
              variant="gold"
            />

            <p><strong>b) Kraft per lengdeenhet på B:</strong></p>
            <FormulaBox
              latex="\frac{F}{L} = I_B \cdot B_{\text{tot}} = 10{,}0 \cdot 4{,}0 \times 10^{-5} = \underline{\underline{4{,}0 \times 10^{-4}\;\text{N/m}}}"
              variant="gold"
            />
            <p className="text-sm">
              Retning: Bruk <InlineLatex latex="\vec{F} = I\vec{l} \times \vec{B}" />. Kraften er vinkelrett på
              B-feltet og strømretningen i B. Leder B (med motsatt strøm) frastøtes fra begge sidene.
            </p>
          </div>
        }
      />
    </div>
  );
}
