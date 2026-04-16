"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  EPgrav,
  Wtyngde,
  EbevaringSimple,
  EbevaringFull,
  vSqrt2gh,
  potEnergi,
} from "@/data/ing164/formula-metadata";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox
          latex="E_p = mgy"
          title="Gravitasjonell potensiell energi"
          variant="gold"
          {...EPgrav}
        />
        <FormulaBox
          latex="W_{mg} = mgy_1 - mgy_2 = -\Delta E_p"
          title="Arbeid av tyngden"
          variant="gold"
          {...Wtyngde}
        />
        <FormulaBox
          latex="\tfrac{1}{2}mv_1^2 + mgy_1 = \tfrac{1}{2}mv_2^2 + mgy_2"
          title="Bevaring av mekanisk energi"
          variant="gold"
          {...EbevaringSimple}
        />
        <FormulaBox
          latex="\tfrac{1}{2}mv_1^2 + mgy_1 + W_{\text{andre}} = \tfrac{1}{2}mv_2^2 + mgy_2"
          title="Med andre krefter"
          variant="gold"
          {...EbevaringFull}
        />
        <FormulaBox
          latex="E_k + E_p = \text{konstant}"
          title="Energibevaring (forenklet)"
          variant="blue"
          description="Gjelder kun når ingen andre krefter enn tyngden gjør arbeid."
          {...potEnergi}
        />
        <FormulaBox
          latex="v = \sqrt{2g(y_1 - y_2)}"
          title="Fart fra høydefall (start fra ro)"
          variant="blue"
          description="Nyttig snarvei når v₁ = 0 og ingen friksjon."
          {...vSqrt2gh}
        />
      </div>

      {/* Når bruker du hva? */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-6">
        <h3 className="font-semibold text-lg mb-4">Når bruker du hva?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Situasjon</th>
                <th className="text-left py-2 pr-4">Bruk…</th>
                <th className="text-left py-2">Husk…</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Friksjonsfritt, kun tyngde</td>
                <td className="py-2 pr-4">Bevaring: E₁ = E₂</td>
                <td className="py-2">Banen spiller ingen rolle!</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Friksjon eller ytre kraft</td>
                <td className="py-2 pr-4">Utvidet: E₁ + W<sub>andre</sub> = E₂</td>
                <td className="py-2">W<sub>friksjon</sub> er alltid negativ</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fart fra fri fall / høydeforskjell</td>
                <td className="py-2 pr-4"><InlineLatex latex="v = \sqrt{2gh}" /></td>
                <td className="py-2">Gjelder kun når v₁ = 0</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Prosjektil — maks høyde</td>
                <td className="py-2 pr-4">Energibevaring</td>
                <td className="py-2">v₂ = v<sub>x</sub> = v₀ cos &alpha; (toppen)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Kurve / skateboard</td>
                <td className="py-2 pr-4">Bevaring (N gjør null arbeid)</td>
                <td className="py-2">Kun h = R − R cos &theta; teller</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
