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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• To protoner, ladning <InlineLatex latex="q = e = 1{,}60 \times 10^{-19}\;\text{C}" /></li>
                <li>• Beveger seg i <em>motsatte</em> retninger langs x-aksen med fart <InlineLatex latex="v" /></li>
                <li>• Avstand mellom dem (langs y-aksen): <InlineLatex latex="r" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Den elektriske kraften mellom protonene</li>
                <li>b) B-feltet som det nederste protonet skaper ved det øverste</li>
                <li>c) Den magnetiske kraften på det øverste protonet</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                a) Bruk Coulombs lov for elektrisk kraft mellom to punktladninger.
                b) Bruk Biot-Savart for en bevegelig ladning — vinkelen φ er 90° siden v er langs x og r er langs y.
                c) Bruk <InlineLatex latex="\vec{F} = q\vec{v} \times \vec{B}" /> på det øverste protonet i feltet fra det nederste.
                Sammenlign deretter størrelsene <InlineLatex latex="F_e" /> og <InlineLatex latex="F_m" /> for å se hva som dominerer.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — a) Elektrisk kraft (Coulombs lov):</strong></p>
            <p className="text-sm">To like ladninger frastøter hverandre. Kraften peker langs y-aksen:</p>
            <FormulaBox
              latex="F_e = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — b) B-felt fra det nederste protonet:</strong></p>
            <p className="text-sm">
              Det nederste protonet beveger seg i +x-retning. Punktet der det øverste protonet er, ligger
              i +y-retning fra det nederste. Dermed er vinkelen <InlineLatex latex="\varphi = 90°" /> mellom <InlineLatex latex="\vec{v}" /> og <InlineLatex latex="\hat{r}" />.
            </p>
            <FormulaBox
              latex="B = \frac{\mu_0}{4\pi}\frac{ev\sin 90°}{r^2} = \frac{\mu_0}{4\pi}\frac{ev}{r^2}"
              variant="blue"
            />
            <p className="text-sm">
              Retning: <InlineLatex latex="\hat{x} \times \hat{y} = \hat{z}" /> → B-feltet peker i +z-retning (ut av arket).
            </p>

            <p className="text-sm"><strong>Steg 3 — c) Magnetisk kraft på det øverste protonet:</strong></p>
            <p className="text-sm">
              Det øverste protonet beveger seg i −x-retning (motsatt av det nederste) og befinner seg i B-feltet (i +z):
              <InlineLatex latex="\vec{F}_m = e\vec{v} \times \vec{B} = e(-v\hat{x}) \times (B\hat{z})" />.
            </p>
            <FormulaBox
              latex="F_m = evB = e \cdot v \cdot \frac{\mu_0}{4\pi}\frac{ev}{r^2} = \frac{\mu_0}{4\pi}\frac{e^2 v^2}{r^2}"
              variant="blue"
            />
            <p className="text-sm">
              Retning: <InlineLatex latex="(-\hat{x}) \times \hat{z} = \hat{y}" /> — dvs. i −y-retning (nedover, <strong>mot</strong> det andre protonet), altså <strong>tiltrekkende</strong>.
            </p>

            <p className="text-sm"><strong>Steg 4 — Sammenlign kreftene:</strong></p>
            <FormulaBox
              latex="\frac{F_m}{F_e} = \frac{\mu_0 e^2 v^2 / (4\pi r^2)}{e^2 / (4\pi\varepsilon_0 r^2)} = \mu_0\varepsilon_0 v^2 = \frac{v^2}{c^2}"
              variant="blue"
            />

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="F_e = \frac{e^2}{4\pi\varepsilon_0 r^2} \quad(\text{frastøtende}), \quad B = \frac{\mu_0 ev}{4\pi r^2}, \quad F_m = \frac{\mu_0 e^2 v^2}{4\pi r^2} \quad(\text{tiltrekkende})"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Elektrisk kraft frastøter, magnetisk kraft tiltrekker — de virker i <em>motsatte retninger</em> her.
                Forholdet <InlineLatex latex="F_m/F_e = v^2/c^2" /> viser at for ladninger med <InlineLatex latex="v \ll c" /> er magnetkraften
                enormt mye svakere enn den elektriske. Magnetisme er i bunn og grunn et relativistisk fenomen!
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Strøm: <InlineLatex latex="I = 125\;\text{A}" /></li>
                <li>• Elementlengde: <InlineLatex latex="dl = 0{,}01\;\text{m}" /></li>
                <li>• Avstand til punkt P: <InlineLatex latex="r = 1{,}2\;\text{m}" /></li>
                <li>• a) Vinkel: <InlineLatex latex="\varphi = 90°" /> &nbsp;&nbsp; b) Vinkel: <InlineLatex latex="\varphi = 30°" /></li>
                <li>• Konstant: <InlineLatex latex="\mu_0/(4\pi) = 10^{-7}\;\text{T·m/A}" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Feltbidraget <InlineLatex latex="dB" /> fra strømelementet for begge vinklene.</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Bruk Biot-Savart for et enkelt strømelement:
                <InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin\varphi}{r^2}" />.
                Her er φ vinkelen mellom <InlineLatex latex="d\vec{l}" /> (strømretningen) og <InlineLatex latex="\hat{r}" /> (retning mot P).
                <InlineLatex latex="\sin\varphi" />-faktoren forteller oss at feltet er størst når vi er rett til siden (<InlineLatex latex="\varphi = 90°" />) og null langs strømretningen (<InlineLatex latex="\varphi = 0°" />).
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Sett inn i Biot-Savart, φ = 90°:</strong></p>
            <FormulaBox
              latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 90°}{r^2} = 10^{-7} \cdot \frac{125 \cdot 0{,}01 \cdot 1}{(1{,}2)^2}"
              variant="blue"
            />
            <FormulaBox
              latex="dB = 10^{-7} \cdot \frac{1{,}25}{1{,}44} = \underline{\underline{8{,}7 \times 10^{-8}\;\text{T}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: ut av arket (høyrehåndsregelen: <InlineLatex latex="d\vec{l} \times \hat{r}" />).</p>

            <p className="text-sm"><strong>Steg 2 — Sett inn i Biot-Savart, φ = 30°:</strong></p>
            <FormulaBox
              latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 30°}{r^2} = 10^{-7} \cdot \frac{125 \cdot 0{,}01 \cdot 0{,}5}{(1{,}2)^2}"
              variant="blue"
            />
            <FormulaBox
              latex="dB = 10^{-7} \cdot \frac{0{,}625}{1{,}44} = \underline{\underline{4{,}3 \times 10^{-8}\;\text{T}}}"
              variant="gold"
            />

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="dB_{90°} = \underline{\underline{8{,}7 \times 10^{-8}\;\text{T}}} \qquad dB_{30°} = \underline{\underline{4{,}3 \times 10^{-8}\;\text{T}}}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                <InlineLatex latex="\sin\varphi" />-faktoren er avgjørende i Biot-Savart. Ved <InlineLatex latex="\varphi = 30°" /> er
                feltet nøyaktig halvparten av <InlineLatex latex="\varphi = 90°" /> (<InlineLatex latex="\sin 30° = 0{,}5" />).
                Ved <InlineLatex latex="\varphi = 0°" /> (langs strømretningen) er feltet alltid <strong>null</strong>.
                Dette er fordi magnetfeltet aldri har noen komponent langs bevegelsesretningen til ladningene.
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Strøm: <InlineLatex latex="I = 1{,}0\;\text{A}" /></li>
                <li>• Magnetfelt: <InlineLatex latex="B = 0{,}5 \times 10^{-4}\;\text{T} = 5{,}0 \times 10^{-5}\;\text{T}" /></li>
                <li>• Lang, rett leder (kan bruke formelen for uendelig lang leder)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Avstanden <InlineLatex latex="r" /> fra lederen til målepunktet.</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                For en lang, rett leder gjelder <InlineLatex latex="B = \mu_0 I / (2\pi r)" />.
                Vi kjenner <InlineLatex latex="B" /> og <InlineLatex latex="I" />, og løser algebraisk for <InlineLatex latex="r" />.
                Dette er omvendt av den typiske oppgaven — men formelen er den samme, bare omstilt.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Løs <InlineLatex latex="B = \mu_0 I / (2\pi r)" /> for r:</strong></p>
            <FormulaBox
              latex="r = \frac{\mu_0 I}{2\pi B}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — Sett inn tallverdiene:</strong></p>
            <FormulaBox
              latex="r = \frac{4\pi \times 10^{-7} \cdot 1{,}0}{2\pi \cdot 5{,}0 \times 10^{-5}} = \frac{4\pi \times 10^{-7}}{2\pi \cdot 5{,}0 \times 10^{-5}} = \frac{4 \times 10^{-7}}{2 \cdot 5{,}0 \times 10^{-5}}"
              variant="blue"
            />
            <FormulaBox
              latex="r = \frac{4 \times 10^{-7}}{1{,}0 \times 10^{-4}} = 4 \times 10^{-3}\;\text{m} = \underline{\underline{4\;\text{mm}}}"
              variant="gold"
            />

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="r = \underline{\underline{4\;\text{mm} = 4 \times 10^{-3}\;\text{m}}}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Formelen <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> kan brukes til å finne enhver av de tre størrelsene
                (<InlineLatex latex="B" />, <InlineLatex latex="I" /> eller <InlineLatex latex="r" />) når de to andre er kjent.
                4 mm er svært nært lederen — magnetfeltet fra en hverdagsleder (1 A) er ganske svakt, og
                du må komme veldig nært for å oppleve det oppgitte feltstyrken på <InlineLatex latex="0{,}5\;\mu\text{T}" />.
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Avstand mellom lederne: <InlineLatex latex="r = 4{,}5\;\text{mm} = 4{,}5 \times 10^{-3}\;\text{m}" /></li>
                <li>• Strøm i begge lederne: <InlineLatex latex="I = I' = 15\,000\;\text{A}" /></li>
                <li>• Strømmene er i <em>motsatte</em> retninger</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Magnetkraften per lengdeenhet <InlineLatex latex="F_m/L" /> mellom lederne, og retningen (tiltrekkende/frastøtende).</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Leder 1 skaper et magnetfelt ved leder 2. Leder 2 bærer strøm i dette feltet og opplever en kraft.
                Formelen <InlineLatex latex="F_m/L = \mu_0 II'/(2\pi r)" /> oppsummerer dette direkte.
                Husk: <strong>samme strømretning → tiltrekkende</strong>, <strong>motsatt strømretning → frastøtende</strong>.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Sett inn i formelen for kraft per lengdeenhet:</strong></p>
            <FormulaBox
              latex="\frac{F_m}{L} = \frac{\mu_0 I \cdot I'}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 15\,000 \cdot 15\,000}{2\pi \cdot 4{,}5 \times 10^{-3}}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — Regn ut teller og nevner:</strong></p>
            <FormulaBox
              latex="\frac{F_m}{L} = \frac{4\pi \times 10^{-7} \cdot 2{,}25 \times 10^{8}}{2\pi \cdot 4{,}5 \times 10^{-3}} = \frac{2 \times 10^{-7} \cdot 2{,}25 \times 10^{8}}{4{,}5 \times 10^{-3}} = \underline{\underline{1{,}0 \times 10^{4}\;\text{N/m}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 3 — Bestem retning:</strong></p>
            <p className="text-sm">
              Siden strømmene er i <strong>motsatte retninger</strong>, er kraften <strong>frastøtende</strong>
              (lederne prøver å skyve hverandre bort).
            </p>

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="\frac{F_m}{L} = \underline{\underline{1{,}0 \times 10^4\;\text{N/m} = 10\;\text{kN/m}}} \quad \text{(frastøtende)}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                10 kN per meter er en <em>enorm</em> kraft — tilsvarende vekten av en tonn per meter leder!
                Store strømmer (som i superledere) gir massive magnetiske krefter.
                Superledermagnetene i LHC ved CERN fører strømmer på rundt 11 000 A og må
                konstrueres spesielt for å tåle disse kreftene uten å brekke.
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Ladning: <InlineLatex latex="q = e = 1{,}60 \times 10^{-19}\;\text{C}" /></li>
                <li>• Fart: <InlineLatex latex="v = 4{,}0 \times 10^6\;\text{m/s}" /> i +x-retning</li>
                <li>• Avstand: <InlineLatex latex="r = 0{,}50\;\text{m}" /></li>
                <li>• a) Punkt i +y (<InlineLatex latex="\varphi = 90°" />), b) 45° fra x-aksen (<InlineLatex latex="\varphi = 45°" />), c) Punkt i +x (<InlineLatex latex="\varphi = 0°" />)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Magnetfeltets størrelse og retning i de tre punktene.</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                En bevegelig ladning lager et magnetfelt: <InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" />.
                Her er φ vinkelen mellom <InlineLatex latex="\vec{v}" /> og <InlineLatex latex="\hat{r}" /> (peker fra ladning mot P).
                Sett inn for hvert tilfelle. For retning: <InlineLatex latex="\vec{v} \times \hat{r}" /> med høyrehåndsregelen.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Felles faktor:</strong></p>
            <FormulaBox
              latex="\frac{\mu_0}{4\pi}\frac{|q|v}{r^2} = 10^{-7} \cdot \frac{1{,}60 \times 10^{-19} \cdot 4{,}0 \times 10^6}{(0{,}50)^2} = 10^{-7} \cdot \frac{6{,}4 \times 10^{-13}}{0{,}25} = 2{,}56 \times 10^{-19}\;\text{T}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — a) φ = 90°, punkt i +y-retning:</strong></p>
            <FormulaBox
              latex="B = 2{,}56 \times 10^{-19} \cdot \sin 90° = \underline{\underline{2{,}56 \times 10^{-19}\;\text{T}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: <InlineLatex latex="\hat{x} \times \hat{y} = \hat{z}" /> → i +z-retning (ut av arket for et proton i +x).</p>

            <p className="text-sm"><strong>Steg 3 — b) φ = 45°:</strong></p>
            <FormulaBox
              latex="B = 2{,}56 \times 10^{-19} \cdot \sin 45° = 2{,}56 \times 10^{-19} \cdot \frac{\sqrt{2}}{2} = \underline{\underline{1{,}81 \times 10^{-19}\;\text{T}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 4 — c) φ = 0°, punkt i +x-retning (langs v):</strong></p>
            <FormulaBox
              latex="B = 2{,}56 \times 10^{-19} \cdot \sin 0° = \underline{\underline{0}}"
              variant="gold"
            />
            <p className="text-sm">Langs bevegelsesretningen er det <strong>aldri</strong> noe magnetfelt fra en bevegelig ladning.</p>

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="B_{90°} = \underline{\underline{2{,}56 \times 10^{-19}\;\text{T}}}, \quad B_{45°} = \underline{\underline{1{,}81 \times 10^{-19}\;\text{T}}}, \quad B_{0°} = \underline{\underline{0}}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Magnetfeltet fra en bevegelig ladning er <em>ikke</em> likt i alle retninger (ulikt det elektriske feltet).
                Det er sterkest vinkelrett på bevegelsesretningen og null rett foran/bak.
                Feltlinjene er konsentriske sirkler rundt bevegelsesretningen — akkurat som for en strømleder.
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Strøm: <InlineLatex latex="I = 10{,}0\;\text{A}" /></li>
                <li>• Elementlengde: <InlineLatex latex="dl = 5{,}0 \times 10^{-4}\;\text{m}" /> i +y-retning</li>
                <li>• Punkt P: <InlineLatex latex="(2{,}0\;\text{m},\, 0,\, 0)" /> → avstand <InlineLatex latex="r = 2{,}0\;\text{m}" /></li>
                <li>• Retning fra element til P: <InlineLatex latex="\hat{r} = +\hat{x}" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Feltbidraget <InlineLatex latex="d\vec{B}" /> (størrelse og retning) i punkt P fra strømelementet.</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Bruk Biot-Savart: <InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin\varphi}{r^2}" />.
                Elementet peker i +y og retningen til P er +x → vinkelen mellom dem er 90°, så <InlineLatex latex="\sin\varphi = 1" />.
                For retning bruker vi <InlineLatex latex="d\vec{l} \times \hat{r} = \hat{y} \times \hat{x}" />.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Identifiser vinkelen:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="d\vec{l} = dl\,\hat{y}" />, <InlineLatex latex="\hat{r} = \hat{x}" />, vinkel mellom dem: <InlineLatex latex="\varphi = 90°" />.
            </p>

            <p className="text-sm"><strong>Steg 2 — Beregn størrelsen:</strong></p>
            <FormulaBox
              latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 90°}{r^2} = 10^{-7} \cdot \frac{10{,}0 \cdot 5{,}0 \times 10^{-4} \cdot 1}{(2{,}0)^2}"
              variant="blue"
            />
            <FormulaBox
              latex="dB = 10^{-7} \cdot \frac{5{,}0 \times 10^{-3}}{4{,}0} = \underline{\underline{1{,}25 \times 10^{-10}\;\text{T}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 3 — Bestem retning:</strong></p>
            <FormulaBox
              latex="d\vec{l} \times \hat{r} = \hat{y} \times \hat{x} = -\hat{z}"
              variant="blue"
            />
            <p className="text-sm">Feltet peker i <strong>−z-retning</strong> (inn i arket).</p>

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="d\vec{B} = \underline{\underline{1{,}25 \times 10^{-10}\;\text{T}}} \text{ i } -\hat{z}\text{-retning (inn i arket)}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Kryssprodukt-regelen <InlineLatex latex="d\vec{l} \times \hat{r}" /> gir alltid retningen til <InlineLatex latex="d\vec{B}" />.
                Husk: <InlineLatex latex="\hat{y} \times \hat{x} = -\hat{z}" /> (merk minusen — rekkefølgen i kryssprodukt er viktig!).
                Biot-Savart er det grunnleggende prinsippet som alt annet (Ampères lov, formelen for lang leder) er derivert fra.
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Strøm: <InlineLatex latex="I = 4{,}00\;\text{A}" /></li>
                <li>• Avstand: <InlineLatex latex="r = 0{,}10\;\text{m}" /></li>
                <li>• Lang, rett leder (kan bruke Ampères lov / integrert Biot-Savart)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Magnetfeltet <InlineLatex latex="B" /> i avstand 0,10 m fra ledningen.</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                For en uendelig lang, rett leder gir Ampères lov (med sirkulær Ampère-sløyfe rundt lederen):
                <InlineLatex latex="B = \mu_0 I/(2\pi r)" />.
                Her er <InlineLatex latex="r" /> den <em>vinkelrette</em> avstanden fra lederen til feltvektoren.
                Feltlinjene er konsentriske sirkler rundt lederen.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Skriv opp formelen og sett inn:</strong></p>
            <FormulaBox
              latex="B = \frac{\mu_0 I}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 4{,}00}{2\pi \cdot 0{,}10}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — Forenkle:</strong></p>
            <FormulaBox
              latex="B = \frac{4 \times 10^{-7} \cdot 4{,}00}{2 \cdot 0{,}10} = \frac{16 \times 10^{-7}}{0{,}20} = \underline{\underline{8{,}0 \times 10^{-6}\;\text{T} = 8{,}0\;\mu\text{T}}}"
              variant="gold"
            />

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="B = \underline{\underline{8{,}0 \times 10^{-6}\;\text{T} = 8{,}0\;\mu\text{T}}}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Formelen <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> er hjørnestenen i beregninger med lange, rette ledere.
                Husk at den <em>kun</em> gjelder for ideelt uendelig lange ledere, men fungerer som en god
                tilnærming når avstanden til lederen er mye mindre enn lederens lengde.
                Jordens magnetfelt er ca. <InlineLatex latex="50\;\mu\text{T}" /> — dvs. denne lederen skaper
                omtrent <InlineLatex latex="1/6" /> av jordas felt på 10 cm avstand.
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Avstand mellom lederne: <InlineLatex latex="r = 0{,}40\;\text{m}" /></li>
                <li>• Strøm i leder 1: <InlineLatex latex="I_1 = 5{,}0\;\text{A}" /></li>
                <li>• Strøm i leder 2: <InlineLatex latex="I_2 = 2{,}0\;\text{A}" /></li>
                <li>• Strømmene er i <em>samme retning</em></li>
                <li>• Lederenes lengde: <InlineLatex latex="L = 3{,}0\;\text{m}" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Total kraft mellom lederne</li>
                <li>b) Retning på kraften (tiltrekkende eller frastøtende)</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Finn først kraft per lengdeenhet: <InlineLatex latex="F/L = \mu_0 I_1 I_2/(2\pi r)" />.
                Gang deretter med <InlineLatex latex="L" /> for å få total kraft.
                For retning: ledere med strøm i <strong>samme retning tiltrekker</strong> hverandre
                (motsatt retning frastøter — tenk: to strømmer «vil» gå parallelt).
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — Kraft per lengdeenhet:</strong></p>
            <FormulaBox
              latex="\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 5{,}0 \cdot 2{,}0}{2\pi \cdot 0{,}40} = \frac{4 \times 10^{-7} \cdot 10{,}0}{2 \cdot 0{,}40} = 5{,}0 \times 10^{-6}\;\text{N/m}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — Total kraft:</strong></p>
            <FormulaBox
              latex="F = \frac{F}{L} \cdot L = 5{,}0 \times 10^{-6}\;\text{N/m} \cdot 3{,}0\;\text{m} = \underline{\underline{1{,}5 \times 10^{-5}\;\text{N} = 15\;\mu\text{N}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 3 — Retning:</strong></p>
            <p className="text-sm">
              Strømmene er i <strong>samme retning</strong> → kraften er <strong>tiltrekkende</strong>.
            </p>

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="F = \underline{\underline{1{,}5 \times 10^{-5}\;\text{N} = 15\;\mu\text{N}}} \quad \text{(tiltrekkende)}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Kraften mellom ledere avhenger av begge strømmene og avstanden.
                Tommelregel for retning: <strong>S</strong>amme retning → <strong>S</strong>uger (tiltrekker);
                <strong>M</strong>otsatt retning → <strong>M</strong>otstøter (frastøter).
                Merk at 15 μN er en svært liten kraft for normale strømnivåer — nettopp derfor bruker
                SI-systemet store strømmer (1 A definisjonen var basert på 2×10⁻⁷ N/m ved 1 m avstand).
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• To lange, parallelle ledere med innbyrdes avstand <InlineLatex latex="d" /></li>
                <li>• Leder 1 fører <InlineLatex latex="I_1" />, leder 2 fører <InlineLatex latex="I_2" /></li>
                <li>• Strømmene er i <em>motsatte</em> retninger</li>
                <li>• Punkt P er midt mellom lederne</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Det totale magnetfeltet <InlineLatex latex="B_\text{tot}" /> i punkt P (midtpunktet).</p>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Bruk superposisjon: finn B-bidraget fra hver leder separat, og legg dem vektorielt sammen.
                Nøkkelen er å bruke høyrehåndsregelen for å bestemme <em>retningen</em> på hvert bidrag i midtpunktet —
                dette avgjør om feltene adderer eller subtraherer.
                Avstand fra hver leder til P er <InlineLatex latex="r = d/2" />.
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — B-felt fra leder 1 i P:</strong></p>
            <FormulaBox
              latex="B_1 = \frac{\mu_0 I_1}{2\pi (d/2)} = \frac{\mu_0 I_1}{\pi d}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — B-felt fra leder 2 i P:</strong></p>
            <FormulaBox
              latex="B_2 = \frac{\mu_0 I_2}{2\pi (d/2)} = \frac{\mu_0 I_2}{\pi d}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 3 — Bestem retning med høyrehåndsregelen:</strong></p>
            <p className="text-sm">
              La leder 1 ha strøm oppover og leder 2 ha strøm nedover (motsatt).
              I midtpunktet peker B fra leder 1 ut av arket, og B fra leder 2 peker <em>også</em> ut av arket.
              Feltene peker altså i <strong>samme retning</strong> og adderer!
            </p>

            <p className="text-sm"><strong>Steg 4 — Summer bidragene:</strong></p>
            <FormulaBox
              latex="B_{\text{tot}} = B_1 + B_2 = \frac{\mu_0 I_1}{\pi d} + \frac{\mu_0 I_2}{\pi d} = \frac{\mu_0(I_1 + I_2)}{\pi d}"
              variant="blue"
            />

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="B_{\text{tot}} = \underline{\underline{\frac{\mu_0(I_1 + I_2)}{\pi d}}}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                For to ledere med <em>motsatte</em> strømmer <strong>adderer</strong> B-feltene i midtpunktet.
                Hadde strømmene vært i <em>samme</em> retning, ville feltene pekt i <em>motsatte</em> retninger i midten
                og subtrahert: <InlineLatex latex="B_\text{tot} = \mu_0|I_1-I_2|/(\pi d)" />.
                Dette er nøyaktig analogt til elektriske felt fra to ladninger: liknamn frastøter
                (subtraherer felt langs midtlinja), uliknamn tiltrekker (adderer).
              </p>
            </div>
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
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>• Tre parallelle ledere A, B, C i et plan</li>
                <li>• A og C: <InlineLatex latex="I_A = I_C = 5{,}0\;\text{A}" /> oppover, adskilt med 10 cm</li>
                <li>• B: <InlineLatex latex="I_B = 10{,}0\;\text{A}" /> nedover, midt mellom A og C</li>
                <li>• Avstand fra A til B og fra C til B: <InlineLatex latex="r = 5{,}0\;\text{cm} = 0{,}05\;\text{m}" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Totalt magnetfelt ved leder B sin posisjon (fra A og C)</li>
                <li>b) Kraft per lengdeenhet på leder B</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Bruk superposisjon for B-feltet fra A og C i B sin posisjon.
                Høyrehåndsregelen bestemmer om feltene adderer eller subtraherer.
                Deretter brukes <InlineLatex latex="F/L = I_B \cdot B_\text{tot}" /> for kraft per lengdeenhet
                (dette er ekvivalent med <InlineLatex latex="\mu_0 I_B I/(2\pi r)" /> for en lang leder i et uniformt felt).
              </p>
            </div>

            {/* Løsning */}
            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm"><strong>Steg 1 — B fra leder A i B sin posisjon (r = 0,05 m):</strong></p>
            <FormulaBox
              latex="B_A = \frac{\mu_0 I_A}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 5{,}0}{2\pi \cdot 0{,}05} = \frac{4 \times 10^{-7} \cdot 5{,}0}{2 \cdot 0{,}05} = 2{,}0 \times 10^{-5}\;\text{T}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — B fra leder C (symmetri gir likt bidrag):</strong></p>
            <FormulaBox
              latex="B_C = \frac{\mu_0 I_C}{2\pi r} = 2{,}0 \times 10^{-5}\;\text{T} \quad \text{(identisk med } B_A \text{)}"
              variant="blue"
            />
            <p className="text-sm">
              Høyrehåndsregelen: A har strøm oppover, B er til høyre for A → <InlineLatex latex="B_A" /> peker nedover ved B.
              C har strøm oppover, B er til venstre for C → <InlineLatex latex="B_C" /> peker <em>også</em> nedover ved B.
              Feltene peker i <strong>samme retning</strong> og adderer.
            </p>

            <p className="text-sm"><strong>Steg 3 — Totalt felt i B sin posisjon:</strong></p>
            <FormulaBox
              latex="B_{\text{tot}} = B_A + B_C = 2{,}0 \times 10^{-5} + 2{,}0 \times 10^{-5} = \underline{\underline{4{,}0 \times 10^{-5}\;\text{T}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 4 — Kraft per lengdeenhet på B:</strong></p>
            <p className="text-sm">
              Bruk <InlineLatex latex="F/L = I_B \cdot B_\text{tot}" /> (leder B bærer strøm <InlineLatex latex="I_B" /> i et felt <InlineLatex latex="B_\text{tot}" />):
            </p>
            <FormulaBox
              latex="\frac{F}{L} = I_B \cdot B_{\text{tot}} = 10{,}0\;\text{A} \cdot 4{,}0 \times 10^{-5}\;\text{T} = \underline{\underline{4{,}0 \times 10^{-4}\;\text{N/m}}}"
              variant="gold"
            />
            <p className="text-sm">
              Retning: Bruk <InlineLatex latex="\vec{F} = I\vec{l} \times \vec{B}" />.
              B har strøm nedover, feltet peker nedover → kraften er vinkelrett på begge.
              Leder B frastøtes symmetrisk fra begge sidene (nettokraft = 0 i horisontal retning!),
              men opplever den beregnede kraften per lengdeenhet fra hver av A og C.
            </p>

            {/* Svar */}
            <p className="font-semibold text-sm">Svar</p>
            <FormulaBox
              latex="B_{\text{tot}} = \underline{\underline{4{,}0 \times 10^{-5}\;\text{T}}}, \qquad \frac{F}{L} = \underline{\underline{4{,}0 \times 10^{-4}\;\text{N/m}}}"
              variant="gold"
            />

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Dette er en typisk eksamensoppgave som kombinerer superposisjon, høyrehåndsregel og kraftberegning.
                Nøkkelen er alltid å <strong>bestemme retningen med høyrehåndsregelen</strong> før du adderer.
                Symmetri kan utnyttes: A og C er symmetrisk plassert, så bidragene er like store.
                Merk at den totale nettokraften på B er <em>null</em> i horisontal retning (symmetri),
                men B opplever krefter fra begge lederne enkeltvis.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}
