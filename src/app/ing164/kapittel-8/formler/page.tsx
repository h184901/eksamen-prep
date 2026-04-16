"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function Kapittel8Formler() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formelsamling</h2>

      <FormulaClickCallout />

      <div className="space-y-3">
        <F id="bevegelsesmengde" />
        <F id="impulsMom" />
        <F id="avgFraImpuls" />
        <F id="bevaringP" />
        <F id="inelastisk" />
        <F id="ballistiskPendel" />
        <F id="elastiskA" />
        <F id="elastiskB" />
        <F id="massesenter" />
        <F id="vCM" />
        <F id="N2LSystem" />
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
                <td className="py-2">p-bevaring baklengs (<InlineLatex latex="p_\text{total}" /> = konstant)</td>
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
