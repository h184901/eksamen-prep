"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <div className="grid md:grid-cols-2 gap-4">
        <F id="EPgrav" />
        <F id="EPfjaer" />
        <F id="Wtyngde" />
        <F id="EbevaringSimple" />
        <F id="EbevaringFull" />
        <F id="energibevaringKort" />
        <F id="vSqrt2gh" />
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
                <td className="py-2 pr-4">Bevaring: <InlineLatex latex="E_1 = E_2" /></td>
                <td className="py-2">Banen spiller ingen rolle!</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Friksjon eller ytre kraft</td>
                <td className="py-2 pr-4">Utvidet: <InlineLatex latex="E_1 + W_\text{andre} = E_2" /></td>
                <td className="py-2"><InlineLatex latex="W_\text{friksjon}" /> er alltid negativ</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fart fra fri fall / høydeforskjell</td>
                <td className="py-2 pr-4"><InlineLatex latex="v = \sqrt{2gh}" /></td>
                <td className="py-2">Gjelder kun når v₁ = 0</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Prosjektil — maks høyde</td>
                <td className="py-2 pr-4">Energibevaring</td>
                <td className="py-2"><InlineLatex latex="v_2 = v_x = v_0\cos\alpha" /> (toppen)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Kurve / skateboard</td>
                <td className="py-2 pr-4">Bevaring (N gjør null arbeid)</td>
                <td className="py-2">Kun <InlineLatex latex="h = R - R\cos\theta" /> teller</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
