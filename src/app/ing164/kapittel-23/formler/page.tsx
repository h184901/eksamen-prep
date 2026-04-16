"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Elektrisk potensial</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Potensiell energi</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="EpUniform" />
        <F id="EpLadninger" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Elektrisk potensial</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="VDef" />
        <F id="VPunkt" />
        <F id="Vab" />
        <F id="EVd" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Energibevaring og enheter</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="ElektrostEbev" />
        <F id="eVoltUnit" />
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
                <td className="py-2">Eller: W = −ΔE_p</td>
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
