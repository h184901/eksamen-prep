"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Kapittel 21</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox
          latex="F_e = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}"
          title="Coulombs lov"
          variant="gold"
        />
        <FormulaBox
          latex="\vec{E} = \frac{\vec{F}_0}{q_0}"
          title="Definisjon av E-felt"
          variant="gold"
        />
        <FormulaBox
          latex="E = \frac{1}{4\pi\varepsilon_0} \frac{|q|}{r^2}"
          title="E-felt fra punktladning"
          variant="gold"
        />
        <FormulaBox
          latex="\vec{F}_e = q\vec{E}"
          title="Kraft på ladning i E-felt"
          variant="gold"
        />
        <FormulaBox
          latex="k = \frac{1}{4\pi\varepsilon_0} = 8{,}99 \cdot 10^9 \;\text{Nm}^2/\text{C}^2"
          title="Coulombs konstant"
          variant="blue"
        />
        <FormulaBox
          latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{C}^2/\text{Nm}^2"
          title="Vakuumpermittivitet"
          variant="blue"
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
                <td className="py-2 pr-4">Kraften mellom to ladninger</td>
                <td className="py-2 pr-4">Coulombs lov</td>
                <td className="py-2">Bestem retning fra fortegn</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">E-felt fra en punktladning</td>
                <td className="py-2 pr-4"><InlineLatex latex="E = kq/r^2" /></td>
                <td className="py-2">Retning: bort fra +, mot −</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">E-felt fra flere ladninger</td>
                <td className="py-2 pr-4">Superposisjon</td>
                <td className="py-2">Beregn x- og y-komponent separat</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Kraft på ladning i kjent felt</td>
                <td className="py-2 pr-4"><InlineLatex latex="F = qE" /></td>
                <td className="py-2">Akselerasjon: a = F/m</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Bevegelse i uniformt felt</td>
                <td className="py-2 pr-4">Kinematikk + F = qE</td>
                <td className="py-2">Samme som prosjektil-bevegelse!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
