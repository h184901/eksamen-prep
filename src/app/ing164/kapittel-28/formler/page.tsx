"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Kapittel 28</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">B-felt fra ladning i bevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="BladningSt" />
        <F id="BladningVektor" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Biot-Savarts lov og vanlige geometrier</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="biotSavart" />
        <F id="Bleder" />
        <F id="Bspole" />
        <F id="Bsolenoid" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Kraft mellom ledere og konstanter</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="FparallelL" />
        <F id="mu0Konst" />
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
                <td className="py-2 pr-4">B-felt fra en ladet partikkel</td>
                <td className="py-2 pr-4"><InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></td>
                <td className="py-2">φ mellom v og retning til punktet</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">B-felt fra et strømelement</td>
                <td className="py-2 pr-4"><InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\sin\varphi}{r^2}" /></td>
                <td className="py-2">Må integreres for totalt felt</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">B-felt fra lang rett leder</td>
                <td className="py-2 pr-4"><InlineLatex latex="B = \frac{\mu_0 I}{2\pi r}" /></td>
                <td className="py-2">r = vinkelrett avstand. Felt i sirkler.</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">B-felt inne i solenoid</td>
                <td className="py-2 pr-4"><InlineLatex latex="B = \mu_0 n I" /></td>
                <td className="py-2">n = viklinger per lengde</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Kraft mellom to ledere</td>
                <td className="py-2 pr-4"><InlineLatex latex="F/L = \frac{\mu_0 II'}{2\pi r}" /></td>
                <td className="py-2">Lik retning → tiltrekker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
