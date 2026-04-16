"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  bevegelsesmengde,
  impulsMom,
  avgFraImpuls,
  bevaringP,
  inelastisk,
  ballistiskPendel,
  elastisk,
  massesenter,
  N2LSystem,
} from "@/data/ing164/formula-metadata";

export default function Kapittel8Formler() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formelsamling</h2>

      <FormulaClickCallout />

      <div className="space-y-3">
        <FormulaBox
          latex="\vec{p} = m\vec{v}"
          title="Bevegelsesmengde"
          variant="gold"
          description="Enhet: kg·m/s. Vektor — retningen er viktig!"
          {...bevegelsesmengde}
        />
        <FormulaBox
          latex="\vec{J} = \sum\vec{F}\,\Delta t = \Delta\vec{p}"
          title="Impuls-momentum-teoremet"
          variant="gold"
          description="Kraftimpuls = endring i bevegelsesmengde."
          {...impulsMom}
        />
        <FormulaBox
          latex="\bar{F} = \frac{\Delta p}{\Delta t} = \frac{m(v_2 - v_1)}{\Delta t}"
          title="Gjennomsnittlig kraft fra impuls"
          variant="blue"
          description="Brukes ofte: finn kraften fra kontakttid og hastighetsendring."
          {...avgFraImpuls}
        />
        <FormulaBox
          latex="\vec{p}_{\text{total,før}} = \vec{p}_{\text{total,etter}}"
          title="Bevaring av bevegelsesmengde"
          variant="gold"
          description="Gjelder når ΣF_ytre = 0 (eller ΣF_ytre << støtkreftene)."
          {...bevaringP}
        />
        <FormulaBox
          latex="(m_A + m_B)\,v_2 = m_A v_{A1} + m_B v_{B1}"
          title="Fullstendig inelastisk kollisjon"
          variant="gold"
          description="Felles hastighet v₂ etter støt."
          {...inelastisk}
        />
        <FormulaBox
          latex="v_0 = \frac{M + m}{m}\sqrt{2gh}"
          title="Ballistisk pendel"
          variant="gold"
          description="Kulefart fra høyden kloss+kule svinger opp til."
          {...ballistiskPendel}
        />
        <FormulaBox
          latex="v_{A2} = \frac{m_A - m_B}{m_A + m_B}\,v_{A1} + \frac{2m_B}{m_A + m_B}\,v_{B1}"
          title="Elastisk kollisjon — hastighet A etter"
          variant="blue"
          description="Gjelder 1D elastisk kollisjon. Kombiner med formelen for v_B2."
          {...elastisk}
        />
        <FormulaBox
          latex="v_{B2} = \frac{2m_A}{m_A + m_B}\,v_{A1} + \frac{m_B - m_A}{m_A + m_B}\,v_{B1}"
          title="Elastisk kollisjon — hastighet B etter"
          variant="blue"
          {...elastisk}
        />
        <FormulaBox
          latex="\vec{r}_{cm} = \frac{\sum m_i \vec{r}_i}{\sum m_i}"
          title="Massesenter"
          variant="blue"
          description="Det massevektede gjennomsnittspunktet."
          {...massesenter}
        />
        <FormulaBox
          latex="\sum \vec{F}_{\text{ytre}} = M\vec{a}_{cm}"
          title="Newtons 2. lov for system"
          variant="gold"
          description="Systemet som helhet oppfører seg som en partikkel i massesenteret."
          {...N2LSystem}
        />
      </div>

      {/* Når bruker du hva */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-8">
        <h3 className="font-semibold text-lg mb-3">Når bruker du hva?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Situasjon</th>
                <th className="text-left py-2">Formel / Prinsipp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Kort støt / treff: finn kraft eller hastighetsendring</td>
                <td className="py-2"><InlineLatex latex="J = F\Delta t = \Delta p" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">To ting krasjer og henger sammen</td>
                <td className="py-2">Fullstendig inelastisk: <InlineLatex latex="(m_A+m_B)v_2 = m_Av_{A1} + m_Bv_{B1}" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">To ting spretter fra hverandre, ingen energitap</td>
                <td className="py-2">Elastisk: p-bevaring + E<sub>k</sub>-bevaring</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Kule treffer kloss i tau → svinger opp</td>
                <td className="py-2">Ballistisk pendel (to steg!)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Noe eksploderer / sprenges i deler</td>
                <td className="py-2">p-bevaring baklengs (p<sub>total</sub> = konstant)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">2D-kollisjon: finn ukjente hastigheter</td>
                <td className="py-2">p-bevaring i x og y separat, deretter Pythagoras</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Finn tyngdepunkt / balansepunkt</td>
                <td className="py-2">Massesenter: <InlineLatex latex="x_{cm} = \sum m_ix_i/\sum m_i" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hurtigguide: kollisjonstyper */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-6">
        <h3 className="font-semibold text-lg mb-3">Kollisjonstyper — hurtigguide</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4">p bevart?</th>
                <th className="text-left py-2 pr-4">E<sub>k</sub> bevart?</th>
                <th className="text-left py-2">Ligninger du trenger</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-semibold text-green-600 dark:text-green-400">Elastisk</td>
                <td className="py-2 pr-4">Ja ✓</td>
                <td className="py-2 pr-4">Ja ✓</td>
                <td className="py-2">2 ligninger → 2 ukjente (v<sub>A2</sub>, v<sub>B2</sub>)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-semibold text-amber-600 dark:text-amber-400">Inelastisk</td>
                <td className="py-2 pr-4">Ja ✓</td>
                <td className="py-2 pr-4">Nei ✗</td>
                <td className="py-2">1 ligning med ekstra info (e.g. retning gitt)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-red-600 dark:text-red-400">Fullst. inelastisk</td>
                <td className="py-2 pr-4">Ja ✓</td>
                <td className="py-2 pr-4">Nei ✗ (maks tap)</td>
                <td className="py-2">1 ligning → 1 ukjent (v<sub>2</sub> = felles)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
