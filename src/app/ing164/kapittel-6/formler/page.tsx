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
        <F id="arbeidKonst" />
        <F id="arbeidVektor" />
        <F id="kinEnergi" />
        <F id="WEteorem" />
        <F id="arbeidVar" />
        <F id="arbeidFjaer" />
        <F id="effekt" />
        <F id="hookes" />
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
                <th className="text-left py-2">Husk…</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Arbeid fra en kraft</td>
                <td className="py-2 pr-4"><InlineLatex latex="W = Fs\cos\varphi" /></td>
                <td className="py-2">Bestem vinkelen mellom F og s</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Arbeid med vektorer</td>
                <td className="py-2 pr-4">Prikkprodukt</td>
                <td className="py-2">Multipliser komponent for komponent</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fart etter arbeid er utført</td>
                <td className="py-2 pr-4">Arbeid-energi-teoremet</td>
                <td className="py-2"><InlineLatex latex="v_2 = \sqrt{2W_{\text{tot}}/m + v_1^2}" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Arbeid mot varierende kraft</td>
                <td className="py-2 pr-4">Integralet</td>
                <td className="py-2">Areal under F(x)-kurven</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Arbeid på fjær</td>
                <td className="py-2 pr-4"><InlineLatex latex="W = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2" /></td>
                <td className="py-2">Hookes lov: F = kx</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Effekt / motorytelse</td>
                <td className="py-2 pr-4"><InlineLatex latex="P = F \cdot v" /></td>
                <td className="py-2">Gjelder for konstant fart</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
