"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Kapittel 28</h2>

      <CollapsibleSection title="Oppgavestrategier">
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
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
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
      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Vår 2017, Høst 2016</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Ikke direkte dekket</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 28</p>
        </Link>
      </div>
    </div>
  );
}
