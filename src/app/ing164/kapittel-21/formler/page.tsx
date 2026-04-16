"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Kapittel 21</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Kraft mellom ladninger</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="coulomb" />
        <F id="eKraft" />
        <F id="coulombKonst" />
        <F id="eps0Konst" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Elektrisk felt</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="eFieldDef" />
        <F id="eFieldPunkt" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Spesielle ladningsfordelinger</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="eLinje" />
        <F id="ePlan" />
        <F id="eKule" />
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
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">E-felt fra lang linje</td>
                <td className="py-2 pr-4"><InlineLatex latex="E = \lambda/(2\pi\varepsilon_0 r)" /></td>
                <td className="py-2">λ = linjeladning (C/m)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">E-felt fra uendelig plan</td>
                <td className="py-2 pr-4"><InlineLatex latex="E = \sigma/(2\varepsilon_0)" /></td>
                <td className="py-2">Uavhengig av avstand!</td>
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
