"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  C,
  koblingC,
  dielektrikum,
  energitetthet,
  indusertQ,
} from "@/data/ing164/formula-metadata";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox
          latex="C = \frac{Q}{V_{ab}}"
          title="Definisjon av kapasitans"
          variant="gold"
          {...C}
        />
        <FormulaBox
          latex="C = \varepsilon_0 \frac{A}{d}"
          title="Platekondensator (vakuum)"
          variant="gold"
          {...C}
        />
        <FormulaBox
          latex="\frac{1}{C_\text{tot}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots"
          title="Kondensatorer i serie"
          variant="gold"
          {...koblingC}
        />
        <FormulaBox
          latex="C_\text{tot} = C_1 + C_2 + \cdots"
          title="Kondensatorer i parallell"
          variant="gold"
          {...koblingC}
        />
        <FormulaBox
          latex="E_p = \frac{Q^2}{2C} = \frac{1}{2}CV^2 = \frac{1}{2}QV"
          title="Lagret energi"
          variant="gold"
          {...C}
        />
        <FormulaBox
          latex="u = \frac{1}{2}\varepsilon_0 E^2"
          title="Energitetthet i E-felt"
          variant="gold"
          {...energitetthet}
        />
        <FormulaBox
          latex="K = \frac{C}{C_0}, \quad \varepsilon = K\varepsilon_0"
          title="Dielektrikumkonstant og permittivitet"
          variant="blue"
          {...dielektrikum}
        />
        <FormulaBox
          latex="Q_i = Q\!\left(1 - \frac{1}{K}\right)"
          title="Indusert ladning"
          variant="blue"
          {...indusertQ}
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
                <td className="py-2 pr-4"><InlineLatex latex="E_p = \frac{1}{2}CV^2" /></td>
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
