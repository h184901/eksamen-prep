"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  snittfart,
  momentanfart,
  snittaksel,
  momentanaksel,
  konstAkselV,
  konstAkselX,
  konstAkselV2,
  konstAkselSnitt,
  frittFall,
  varAksel,
} from "@/data/ing164/formula-metadata";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="\bar{v} = \frac{\Delta x}{\Delta t}" title="Gjennomsnittsfart" variant="blue" {...snittfart} />
        <FormulaBox latex="v = \frac{dx}{dt}" title="Momentanfart" variant="gold" {...momentanfart} />
        <FormulaBox latex="\bar{a} = \frac{\Delta v}{\Delta t}" title="Gjennomsnittlig akselerasjon" variant="blue" {...snittaksel} />
        <FormulaBox latex="a = \frac{dv}{dt} = \frac{d^2x}{dt^2}" title="Momentanakselerasjon" variant="gold" {...momentanaksel} />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Konstant akselerasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="v = v_0 + at" title="Likning 1 (mangler x)" variant="gold" {...konstAkselV} />
        <FormulaBox latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" title="Likning 2 (mangler v)" variant="gold" {...konstAkselX} />
        <FormulaBox latex="v^2 = v_0^2 + 2a(x - x_0)" title="Likning 3 (mangler t)" variant="gold" {...konstAkselV2} />
        <FormulaBox latex="x - x_0 = \tfrac{1}{2}(v_0 + v)\,t" title="Likning 4 (mangler a)" variant="gold" {...konstAkselSnitt} />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Fritt fall (y-akse oppover)</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="v_y = v_{0y} - gt" title="Fart (fritt fall)" variant="gold" {...frittFall} />
        <FormulaBox latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2" title="Posisjon (fritt fall)" variant="gold" {...frittFall} />
        <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y - y_0)" title="Fart–posisjon (fritt fall)" variant="gold" {...frittFall} />
        <FormulaBox
          latex="g = 9{,}81\;\text{m/s}^2"
          title="Tyngdeakselerasjon"
          variant="blue"
          conceptExplanation="Tyngdeakselerasjonen ved jordoverflaten. Gjelder for fritt fall og er den samme uavhengig av masse (Galileos eksperiment)."
          variables={[{ symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 ved havnivå" }]}
          whenToUse="Alltid i fritt fall-oppgaver. Bruk 9,81 m/s² med mindre oppgaven spesifiserer annet."
        />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Varierende akselerasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="v(t) = v_0 + \int_0^t a(t')\,dt'" title="Fart ved integrasjon" variant="gold" {...varAksel} />
        <FormulaBox latex="x(t) = x_0 + \int_0^t v(t')\,dt'" title="Posisjon ved integrasjon" variant="gold" {...varAksel} />
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
                <td className="py-2 pr-4">Gjennomsnittsfart over et intervall</td>
                <td className="py-2 pr-4"><InlineLatex latex="\bar{v} = \Delta x / \Delta t" /></td>
                <td className="py-2">Sekant i x-t-grafen</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Øyeblikkelig fart</td>
                <td className="py-2 pr-4">Deriver <InlineLatex latex="x(t)" /></td>
                <td className="py-2">Tangent i x-t-grafen</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Konstant akselerasjon</td>
                <td className="py-2 pr-4">De 4 likningene</td>
                <td className="py-2">Velg ut fra kjent/ukjent</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fritt fall</td>
                <td className="py-2 pr-4">Samme med <InlineLatex latex="a = -g" /></td>
                <td className="py-2">Velg y-akse oppover</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Varierende akselerasjon</td>
                <td className="py-2 pr-4">Integrasjon</td>
                <td className="py-2">Kan IKKE bruke de 4 likningene</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
