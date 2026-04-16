"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Formler</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Faraday og Lenz</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="faraday" />
        <F id="faradayN" />
        <F id="fluks" />
        <F id="lenz" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">EMF i bevegelige ledere og generatorer</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="BLv" />
        <F id="ACgen" />
        <F id="ACgenMax" />
        <F id="diskDynamo" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Effekt og generell EMF</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="effektEMF" />
        <F id="generellEMF" />
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
                <th className="text-left py-2">Kommentar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">B-felt endres over tid</td>
                <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = -N \cdot A\cos\varphi \cdot \frac{dB}{dt}" /></td>
                <td className="py-2">A og φ er konstante</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Areal endres (glidende stav)</td>
                <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = BLv" /></td>
                <td className="py-2">B konstant, A = Lx</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Spole roterer i konstant B</td>
                <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = NAB\omega\sin(\omega t)" /></td>
                <td className="py-2">Vekselstrøm!</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Roterende skive</td>
                <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = \tfrac{1}{2}\omega BR^2" /></td>
                <td className="py-2">Likestrøm</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Retning på indusert strøm</td>
                <td className="py-2 pr-4">Lenz&apos; lov</td>
                <td className="py-2">Motvirker årsaken</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
