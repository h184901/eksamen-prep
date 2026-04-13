"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Formler — Newtons lover</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        <FormulaBox
          latex="\sum \vec{F} = m\vec{a}"
          title="Newtons 2. lov"
          variant="gold"
          description="Den fundamentale likningen i mekanikk"
        />
        <FormulaBox
          latex="G = mg"
          title="Tyngdekraft"
          variant="gold"
          description="g = 9,81 m/s² ved havoverflaten"
        />
        <FormulaBox
          latex="\sum F_x = ma_x, \quad \sum F_y = ma_y"
          title="Komponentform"
          variant="gold"
          description="Slik løser vi oppgavene i praksis"
        />
        <FormulaBox
          latex="\vec{F}_{AB} = -\vec{F}_{BA}"
          title="Newtons 3. lov"
          variant="gold"
          description="Kraft og motkraft — like store, motsatt rettet, på ulike legemer"
        />
      </div>

      <FormulaBox
        latex="F_x = F\cos\theta, \quad F_y = F\sin\theta, \quad F = \sqrt{F_x^2 + F_y^2}"
        title="Kraftdekomponering og sammensetning"
        variant="blue"
        description="θ er vinkelen med x-aksen. Brukes til å splitte en kraft i komponenter, eller finne resultanten."
      />

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
