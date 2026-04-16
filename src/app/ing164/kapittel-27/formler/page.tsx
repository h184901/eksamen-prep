"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Kapittel 27</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Magnetisk kraft på ladning</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="FqvBVektor" />
        <F id="FqvBStorrelse" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Bevegelse i magnetfelt</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="rSirkelB" />
        <F id="omegaSyklotron" />
        <F id="TSyklotron" />
        <F id="fartsvelger" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Magnetisk fluks</h3>
      <F id="fluks" />

      <h3 className="font-semibold text-lg mt-8 mb-3">Kraft på strømførende leder</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="FlBVektor" />
        <F id="FlBStorrelse" />
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
                <td className="py-2 pr-4">Kraft på ladet partikkel i B-felt</td>
                <td className="py-2 pr-4"><InlineLatex latex="F = |q|vB\sin\theta" /></td>
                <td className="py-2">Retning: høyrehåndsregelen</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Sirkelbane-radius</td>
                <td className="py-2 pr-4"><InlineLatex latex="r = mv/(|q|B)" /></td>
                <td className="py-2">Bruk v⊥ hvis farten ikke er vinkelrett på B</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fart i fartsvelger</td>
                <td className="py-2 pr-4"><InlineLatex latex="v = E/B" /></td>
                <td className="py-2">Balanse mellom F_e og F_m</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Kraft på strømførende leder</td>
                <td className="py-2 pr-4"><InlineLatex latex="F = IlB\sin\theta" /></td>
                <td className="py-2">θ er mellom I-retning og B</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Magnetisk fluks</td>
                <td className="py-2 pr-4"><InlineLatex latex="\Phi_B = BA\cos\varphi" /></td>
                <td className="py-2">φ er mellom B og normalen til flaten</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
