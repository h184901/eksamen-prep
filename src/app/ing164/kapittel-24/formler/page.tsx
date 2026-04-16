"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Kapasitans</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="CDef" />
        <F id="Cplate" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Kobling av kondensatorer</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="CSerie" />
        <F id="CParallell" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Energi</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="EpC" />
        <F id="energitetthet" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Dielektrika</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="dielektrikum" />
        <F id="indusertQ" />
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
                <td className="py-2 pr-4">Kapasitans fra Q og V</td>
                <td className="py-2 pr-4"><InlineLatex latex="C = Q/V" /></td>
                <td className="py-2">Q er ladningen på ÉN plate</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Kapasitans fra geometri</td>
                <td className="py-2 pr-4"><InlineLatex latex="C = \varepsilon_0 A/d" /></td>
                <td className="py-2">A i m², d i m</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Total C i serie</td>
                <td className="py-2 pr-4">Addér inversene</td>
                <td className="py-2">Q er lik, V fordeles</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Total C i parallell</td>
                <td className="py-2 pr-4">Addér direkte</td>
                <td className="py-2">V er lik, Q fordeles</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Lagret energi</td>
                <td className="py-2 pr-4"><InlineLatex latex="E_p = \tfrac{1}{2}CV^2" /></td>
                <td className="py-2">Tre likeverdige uttrykk — velg etter kjente</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Effekt av dielektrikum</td>
                <td className="py-2 pr-4"><InlineLatex latex="C = KC_0" /></td>
                <td className="py-2">Bytt ε₀ → ε = Kε₀</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
