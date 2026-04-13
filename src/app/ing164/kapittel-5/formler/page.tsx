"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-6">Formler</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        <FormulaBox
          latex="\sum F_x = 0, \quad \sum F_y = 0"
          title="Likevekt (N1L)"
          variant="gold"
          description="For legemer i ro eller konstant fart"
        />
        <FormulaBox
          latex="\sum F_x = ma_x, \quad \sum F_y = ma_y"
          title="Dynamikk (N2L)"
          variant="gold"
          description="For legemer som akselererer"
        />
        <FormulaBox
          latex="R = \mu_k N \quad (\text{glidning})"
          title="Glidefriksjon"
          variant="gold"
        />
        <FormulaBox
          latex="R \leq \mu_s N \quad (\text{hvile})"
          title="Maks hvilefriksjon"
          variant="gold"
        />
        <FormulaBox
          latex="a_\perp = \frac{v^2}{R}"
          title="Sentripetalakselerasjon"
          variant="gold"
        />
        <FormulaBox
          latex="\sum F = m\frac{v^2}{R}"
          title="Sentripetalkraft"
          variant="gold"
          description="Nettokraften inn mot sentrum"
        />
      </div>

      <h3 className="font-semibold text-lg mt-6 mb-3">Nyttige resultater for skråplan</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <FormulaBox
          latex="a = g\sin\alpha \quad (\text{uten friksjon})"
          title="Akselerasjon ned skråplan"
          variant="blue"
        />
        <FormulaBox
          latex="a = g(\sin\alpha - \mu_k\cos\alpha)"
          title="Med glidefriksjon nedover"
          variant="blue"
        />
        <FormulaBox
          latex="N = mg\cos\alpha"
          title="Normalkraft på skråplan"
          variant="blue"
        />
        <FormulaBox
          latex="\alpha_{\text{kritisk}} = \tan^{-1}(\mu_s)"
          title="Kritisk vinkel"
          variant="blue"
          description="Vinkelen der legemet begynner å gli"
        />
      </div>

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
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">I ro / konstant fart</td>
                <td className="py-2"><InlineLatex latex="\sum F = 0" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Akselerasjon langs rett linje</td>
                <td className="py-2"><InlineLatex latex="\sum F = ma" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Skråplan</td>
                <td className="py-2">Dekomponer G: <InlineLatex latex="mg\sin\alpha" /> langs, <InlineLatex latex="mg\cos\alpha" /> normalt</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Friksjon</td>
                <td className="py-2"><InlineLatex latex="R = \mu N" /> (finn N fra FBD først!)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Sirkelbevegelse</td>
                <td className="py-2"><InlineLatex latex="\sum F = mv^2/R" /> (inn mot sentrum)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
