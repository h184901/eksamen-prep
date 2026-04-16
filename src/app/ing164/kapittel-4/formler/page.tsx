"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Formler — Newtons lover</h2>

      <FormulaClickCallout />

      <div className="grid sm:grid-cols-2 gap-3">
        <F id="newton2" />
        <F id="tyngdekraft" />
        <F id="komponentForm" />
        <F id="newton3" />
        <F id="newton1" />
      </div>

      <F id="kraftdekomp" />

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-4">
        <h3 className="font-semibold text-lg mb-3">Når bruker du hva?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Situasjon</th>
                <th className="text-left py-2">Nøkkellikning</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Legeme i ro eller konstant fart</td>
                <td className="py-2"><InlineLatex latex="\sum F = 0" /> (N1L)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Legeme akselererer</td>
                <td className="py-2"><InlineLatex latex="\sum F = ma" /> (N2L)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Finne tyngdekraft</td>
                <td className="py-2"><InlineLatex latex="G = mg" /></td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Koble krefter mellom to legemer</td>
                <td className="py-2"><InlineLatex latex="\vec{F}_{AB} = -\vec{F}_{BA}" /> (N3L)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
