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
        <F id="snittfart" />
        <F id="momentanfart" />
        <F id="snittaksel" />
        <F id="momentanaksel" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Konstant akselerasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="konstAkselV" />
        <F id="konstAkselX" />
        <F id="konstAkselV2" />
        <F id="konstAkselSnitt" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Fritt fall (y-akse oppover)</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="frittFallV" />
        <F id="frittFallY" />
        <F id="frittFallV2" />
        <F id="gKonstant" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Varierende akselerasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="varAkselV" />
        <F id="varAkselX" />
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
