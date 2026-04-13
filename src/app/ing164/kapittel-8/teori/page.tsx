"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { ImpulseVisualizer, CollisionVisualizer, BallisticPendulumVisualizer } from "../visualizations";

export default function Kapittel8Teori() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      {/* 8.1 Bevegelsesmengde og kraftimpuls */}
      <TheorySummary
        title="8.1 Bevegelsesmengde og kraftimpuls"
        mustKnow={[
          "Bevegelsesmengde: p = mv (vektor!)",
          "Newtons 2. lov: ΣF = dp/dt",
          "Kraftimpuls: J = ΣF · Δt (konstant kraft) eller J = ∫F dt (variabel kraft)",
          "Impuls-momentum-teoremet: J = Δp = p₂ − p₁",
          "Husk retning! Velg positiv retning FØR du setter inn tall",
        ]}
      >
        <p>
          <strong>Bevegelsesmengde</strong> (lineært moment) er produktet av masse og hastighet.
          Det er en <em>vektor</em> — retningen er viktig!
        </p>

        <FormulaBox
          latex="\vec{p} = m\vec{v}"
          title="Bevegelsesmengde"
          variant="gold"
          description="Enhet: kg·m/s. Retning = samme som hastighetsretningen."
        />

        <p className="mt-4">
          Newtons andre lov kan skrives som endring i bevegelsesmengde over tid:
        </p>

        <FormulaBox
          latex="\sum \vec{F} = \frac{d\vec{p}}{dt}"
          title="Newtons 2. lov — momentform"
          variant="gold"
          description="Summen av krefter = endringsrate for bevegelsesmengde."
        />

        <p className="mt-4">
          <strong>Kraftimpuls</strong> er kraftens virkning over tid. Når en kraft virker i et kort
          tidsrom <InlineLatex latex="\Delta t" />, gir den et «dytt» som endrer bevegelsesmengden:
        </p>

        <FormulaBox
          latex="\vec{J} = \sum\vec{F} \cdot \Delta t = \Delta\vec{p} = \vec{p}_2 - \vec{p}_1"
          title="Impuls-momentum-teoremet"
          variant="gold"
          description="Kraftimpuls = endring i bevegelsesmengde. Gjelder alltid!"
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Intuisjon</p>
          <p>
            Tenk på det slik: en stor kraft i kort tid gir samme impuls som en liten kraft over lang tid.
            Derfor gjør det mindre vondt å hoppe ned på en myk matte (lang kontakttid → lav kraft) enn
            på betong (kort kontakttid → høy kraft), selv om <InlineLatex latex="\Delta p" /> er lik!
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil!</p>
          <p>
            Mange glemmer retningen når ballen spretter tilbake. Hvis en ball treffer veggen med
            <InlineLatex latex="v_1 = +30\;\text{m/s}" /> og spretter tilbake med
            <InlineLatex latex="v_2 = -20\;\text{m/s}" />, er
            <InlineLatex latex="\Delta p = m(v_2 - v_1) = m(-20-30) = -50m" />, IKKE <InlineLatex latex="m(20-30)" />.
          </p>
        </div>
      </TheorySummary>

      <ImpulseVisualizer />

      {/* 8.2 Bevaring av bevegelsesmengde */}
      <TheorySummary
        title="8.2 Bevaring av bevegelsesmengde"
        mustKnow={[
          "Bevaring: Når ΣF_ytre = 0, er total p bevart",
          "Gjelder komponentvis: px og py bevares uavhengig",
          "Gjelder også når ytre krefter er mye svakere enn støtkreftene",
          "Følger fra Newtons 3. lov: F_AB = −F_BA → indre krefter kansellerer",
        ]}
      >
        <p>
          Fra Newtons 3. lov: kreftene mellom to legemer er like store og motsatt rettet.
          Det betyr at de indre kreftene i et system alltid summerer til null:
        </p>

        <FormulaBox
          latex="\vec{F}_{AB} = -\vec{F}_{BA} \;\Rightarrow\; \frac{d}{dt}(\vec{p}_A + \vec{p}_B) = 0"
          title="Bevegelsesmengden er bevart"
          variant="gold"
        />

        <FormulaBox
          latex="\vec{p}_{\text{total,før}} = \vec{p}_{\text{total,etter}}"
          title="Bevaringsloven"
          variant="gold"
          description="Når summen av ytre krefter er null, er systemets totale bevegelsesmengde konstant."
        />

        <p className="mt-4">
          I en kollisjon er støtkreftene (indre krefter) typisk <em>mye</em> større enn ytre
          krefter som tyngden. Derfor er bevegelsesmengden <strong>tilnærmet bevart</strong> under
          selve kollisjonen, selv om ytre krefter virker.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">2D kollisjoner</p>
          <p>
            Bevegelsesmengden bevares <strong>komponentvis</strong>. I en 2D-kollisjon
            setter du opp to ligninger:
          </p>
          <div className="mt-2 space-y-1">
            <p>x-retning: <InlineLatex latex="\sum m_i v_{ix,\text{før}} = \sum m_i v_{ix,\text{etter}}" /></p>
            <p>y-retning: <InlineLatex latex="\sum m_i v_{iy,\text{før}} = \sum m_i v_{iy,\text{etter}}" /></p>
          </div>
        </div>
      </TheorySummary>

      {/* 8.3 Inelastiske kollisjoner */}
      <TheorySummary
        title="8.3 Inelastiske kollisjoner"
        mustKnow={[
          "Fullstendig inelastisk: legemene henger sammen → felles hastighet v₂",
          "Bevegelsesmengde er ALLTID bevart i kollisjoner (uansett type)",
          "Kinetisk energi er IKKE bevart i inelastiske kollisjoner",
          "Fullstendig inelastisk = størst mulig energitap",
          "Ballistisk pendel: to-stegs problem (p-bevaring + energibevaring)",
        ]}
      >
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4">p bevart?</th>
                <th className="text-left py-2 pr-4">E<sub>K</sub> bevart?</th>
                <th className="text-left py-2">Kjennetegn</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-semibold">Elastisk</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2">Spretter fra hverandre (billardkuler, atomkjerner)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-semibold">Inelastisk</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2 pr-4 text-red-600 dark:text-red-400">Nei ✗</td>
                <td className="py-2">Noe energi tapt til varme/deformasjon</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Fullst. inelastisk</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2 pr-4 text-red-600 dark:text-red-400">Nei ✗ (maks tap)</td>
                <td className="py-2">Henger sammen, felles hastighet</td>
              </tr>
            </tbody>
          </table>
        </div>

        <FormulaBox
          latex="(m_A + m_B)\,v_2 = m_A v_{A1} + m_B v_{B1}"
          title="Fullstendig inelastisk kollisjon"
          variant="gold"
          description="Legemene henger sammen etter støtet → én felles hastighet v₂."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Ballistisk pendel — Klassiker!</p>
          <p>
            En kule fester seg i en kloss som henger i tau. <strong>To-stegs problem:</strong>
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li><strong>Under støtet:</strong> Bevegelsesmengde bevart (energi IKKE bevart)</li>
            <li><strong>Etter støtet:</strong> Mekanisk energi bevart (bevegelsesmengde IKKE bevart — snorkraft!)</li>
          </ol>
        </div>

        <FormulaBox
          latex="v_0 = \frac{M + m}{m}\sqrt{2gh}"
          title="Ballistisk pendel — kulens startfart"
          variant="gold"
          description="Kombiner p-bevaring under støt med energibevaring under svingen."
        />
      </TheorySummary>

      <BallisticPendulumVisualizer />

      {/* 8.4 Elastiske kollisjoner */}
      <TheorySummary
        title="8.4 Elastiske kollisjoner"
        mustKnow={[
          "Elastisk: BÅDE p og E_K er bevart → to ligninger, to ukjente",
          "1D: Resulterer i to ligninger som kan løses algebraisk",
          "Triviell løsning (ingenting skjer) forkastes alltid",
          "Spesialtilfeller: lik masse → hastigheter bytter; m_A >> m_B → A upåvirket",
        ]}
      >
        <p>
          I en elastisk kollisjon er <strong>både</strong> bevegelsesmengde og kinetisk energi bevart.
          Dette gir et ligningssystem med to ligninger:
        </p>

        <FormulaBox
          latex="\begin{cases} m_A v_{A1} + m_B v_{B1} = m_A v_{A2} + m_B v_{B2} \\ \tfrac{1}{2}m_A v_{A1}^2 + \tfrac{1}{2}m_B v_{B1}^2 = \tfrac{1}{2}m_A v_{A2}^2 + \tfrac{1}{2}m_B v_{B2}^2 \end{cases}"
          title="Elastisk 1D-kollisjon — to ligninger"
          variant="gold"
          description="Løs for v_A2 og v_B2. Forkast den trivielle løsningen."
        />

        <p className="mt-4">De generelle løsningene for 1D elastisk kollisjon er:</p>

        <FormulaBox
          latex="v_{A2} = \frac{m_A - m_B}{m_A + m_B}\,v_{A1} + \frac{2m_B}{m_A + m_B}\,v_{B1}"
          title="Hastighet A etter elastisk kollisjon"
          variant="blue"
        />

        <FormulaBox
          latex="v_{B2} = \frac{2m_A}{m_A + m_B}\,v_{A1} + \frac{m_B - m_A}{m_A + m_B}\,v_{B1}"
          title="Hastighet B etter elastisk kollisjon"
          variant="blue"
        />

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Spesialtilfeller</p>
          <ul className="space-y-2">
            <li>
              <strong>Like masser</strong> (<InlineLatex latex="m_A = m_B" />): Hastighetene <em>bytter</em>!
              <InlineLatex latex="v_{A2} = v_{B1}" /> og <InlineLatex latex="v_{B2} = v_{A1}" />
            </li>
            <li>
              <strong>B i ro</strong> (<InlineLatex latex="v_{B1} = 0" />), <strong>like masser</strong>:
              A stopper, B fortsetter med A sin fart. (Newtons vugge!)
            </li>
            <li>
              <strong>A mye tyngre</strong> (<InlineLatex latex="m_A \gg m_B" />):
              A nesten upåvirket, B «spretter» vekk med nesten dobbel fart.
            </li>
          </ul>
        </div>
      </TheorySummary>

      <CollisionVisualizer />

      {/* 8.5 Massesenter */}
      <TheorySummary
        title="8.5 Massesenter"
        mustKnow={[
          "Massesenter: x_cm = Σ(m_i·x_i) / Σm_i",
          "Massesenteret oppfører seg som om all masse er samlet der",
          "ΣF_ytre = M·a_cm (Newtons 2. lov for systemet)",
          "Massesenteret fortsetter i samme bane ved intern sprengning",
          "Bruk symmetri når mulig for å forenkle",
        ]}
      >
        <p>
          <strong>Massesenteret</strong> er det massevektede gjennomsnittet av alle posisjonene i
          et system. Det er punktet der du kan tenke at «all massen er samlet».
        </p>

        <FormulaBox
          latex="\vec{r}_{cm} = \frac{\sum m_i \vec{r}_i}{\sum m_i} = \frac{m_1\vec{r}_1 + m_2\vec{r}_2 + \cdots}{m_1 + m_2 + \cdots}"
          title="Massesenterets posisjon"
          variant="gold"
        />

        <FormulaBox
          latex="\vec{v}_{cm} = \frac{\sum m_i \vec{v}_i}{M} \qquad \vec{a}_{cm} = \frac{\sum m_i \vec{a}_i}{M}"
          title="Massesenterets fart og akselerasjon"
          variant="blue"
        />

        <FormulaBox
          latex="\sum \vec{F}_{\text{ytre}} = M\,\vec{a}_{cm}"
          title="Newtons 2. lov for et system"
          variant="gold"
          description="Massesenteret akselereres kun av ytre krefter. Indre krefter kansellerer (Newtons 3. lov)."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksempel — Sprengning!</p>
          <p>
            Et prosjektil eksploderer i to deler i luften. Selv om delene flyr i vilt forskjellige
            retninger, fortsetter <em>massesenteret</em> på den opprinnelige parabelbanen.
            Ytre kraft (tyngden) er uendret, så <InlineLatex latex="\vec{a}_{cm} = \vec{g}" /> hele tiden.
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
