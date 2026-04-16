"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  FqvB,
  rSirkelB,
  syklotronfrekvens,
  fluks,
  fartsvelger,
  FlB,
  FlBVektor,
} from "@/data/ing164/formula-metadata";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Kapittel 27</h2>

      <FormulaClickCallout />

      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox
          latex="\vec{F}_m = q\vec{v} \times \vec{B}"
          title="Magnetisk kraft (vektor)"
          variant="gold"
          {...FqvB}
        />
        <FormulaBox
          latex="F_m = |q|vB\sin\theta"
          title="Magnetisk kraft (størrelse)"
          variant="gold"
          {...FqvB}
        />
        <FormulaBox
          latex="r = \frac{mv}{|q|B}"
          title="Sirkelradius i B-felt"
          variant="gold"
          {...rSirkelB}
        />
        <FormulaBox
          latex="\omega = \frac{|q|B}{m}"
          title="Syklotronfrekvens"
          variant="gold"
          {...syklotronfrekvens}
        />
        <FormulaBox
          latex="\Phi_B = BA\cos\varphi"
          title="Magnetisk fluks"
          variant="gold"
          {...fluks}
        />
        <FormulaBox
          latex="v = \frac{E}{B}"
          title="Fartsvelger"
          variant="blue"
          {...fartsvelger}
        />
        <FormulaBox
          latex="F_m = IlB\sin\theta"
          title="Kraft på strømførende leder"
          variant="gold"
          {...FlB}
        />
        <FormulaBox
          latex="\vec{F}_m = I\vec{l} \times \vec{B}"
          title="Kraft på leder (vektor)"
          variant="gold"
          {...FlBVektor}
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
                <td className="py-2">Balanse mellom Fe og Fm</td>
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
