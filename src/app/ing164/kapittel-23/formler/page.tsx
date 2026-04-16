"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  EpUniform,
  Uladninger,
  V,
  Vab,
  ElektrostEbev,
  EVd,
  eVoltUnit,
} from "@/data/ing164/formula-metadata";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Elektrisk potensial</h2>

      <FormulaClickCallout />

      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox
          latex="E_p = q_0 E y"
          title="Pot. energi (uniformt felt)"
          variant="gold"
          {...EpUniform}
        />
        <FormulaBox
          latex="E_p = \frac{1}{4\pi\varepsilon_0}\frac{q_0 q}{r}"
          title="Pot. energi (punktladninger)"
          variant="gold"
          {...Uladninger}
        />
        <FormulaBox
          latex="V = \frac{E_p}{q_0}"
          title="Elektrisk potensial"
          variant="gold"
          {...V}
        />
        <FormulaBox
          latex="V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}"
          title="Potensial fra punktladning"
          variant="gold"
          {...V}
        />
        <FormulaBox
          latex="V_{ab} = V_a - V_b = -\frac{\Delta E_p}{q_0}"
          title="Potensialforskjell (spenning)"
          variant="gold"
          {...Vab}
        />
        <FormulaBox
          latex="E_{k,1} + E_{p,1} = E_{k,2} + E_{p,2}"
          title="Energibevaring"
          variant="gold"
          {...ElektrostEbev}
        />
        <FormulaBox
          latex="E = \frac{V}{d}"
          title="E-felt mellom plater"
          variant="blue"
          {...EVd}
        />
        <FormulaBox
          latex="1\;\text{eV} = 1{,}60 \cdot 10^{-19}\;\text{J}"
          title="Elektronvolt"
          variant="blue"
          {...eVoltUnit}
        />
      </div>

      {/* Når bruker du hva? */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-6">
        <h3 className="font-semibold text-lg mb-4">Når bruker du hva?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Du vil finne…</th>
                <th className="text-left py-2 pr-4">Bruk…</th>
                <th className="text-left py-2">Tips</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Potensial fra punktladninger</td>
                <td className="py-2 pr-4"><InlineLatex latex="V = kq/r" /></td>
                <td className="py-2">Summer skalarer — ingen vektorer!</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fart av ladet partikkel</td>
                <td className="py-2 pr-4">Energibevaring</td>
                <td className="py-2"><InlineLatex latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Arbeid for å flytte ladning</td>
                <td className="py-2 pr-4"><InlineLatex latex="W = q_0(V_a - V_b)" /></td>
                <td className="py-2">Eller: W = −ΔEp</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">E-felt mellom plater</td>
                <td className="py-2 pr-4"><InlineLatex latex="E = V/d" /></td>
                <td className="py-2">V = spenningen, d = avstand</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Potensiell energi mellom ladninger</td>
                <td className="py-2 pr-4"><InlineLatex latex="E_p = kq_1q_2/r" /></td>
                <td className="py-2">Bruk fortegn! + → frastøtning</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
