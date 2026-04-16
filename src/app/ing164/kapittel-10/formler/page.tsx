"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Kraftmoment og Newtons 2. lov for rotasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="tauDef" />
        <F id="tauIalpha" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Rulling uten glidning</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="rullingVel" />
        <F id="rullingAksel" />
        <F id="EkTot" />
        <F id="diskSkraplanA" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Arbeid og effekt i rotasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="rotArbeid" />
        <F id="rotEffekt" />
        <F id="rotWEteorem" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Angulært moment</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="Lpartikkel" />
        <F id="Lstivt" />
        <F id="tauDLDt" />
        <F id="Lbevaring" />
      </div>

      {/* Når bruker du hva? */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-8">
        <h3 className="font-bold text-lg mb-4">Når bruker du hva?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="py-2 px-3 text-left font-semibold">Situasjon</th>
                <th className="py-2 px-3 text-left font-semibold">Verktøy</th>
                <th className="py-2 px-3 text-left font-semibold">Formel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 px-3">Finne vinkelakselerasjon α fra krefter</td>
                <td className="py-2 px-3 text-amber-600 dark:text-amber-400">Newtons 2. lov (rot.)</td>
                <td className="py-2 px-3 font-mono text-xs"><InlineLatex latex="\sum\tau = I\alpha" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3">Finne fart etter å ha rullet ned en høyde</td>
                <td className="py-2 px-3 text-green-600 dark:text-green-400">Energibevaring</td>
                <td className="py-2 px-3 font-mono text-xs"><InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3">I endre seg, finne ny ω</td>
                <td className="py-2 px-3 text-blue-600 dark:text-blue-400">L-bevaring</td>
                <td className="py-2 px-3 font-mono text-xs"><InlineLatex latex="I_1\omega_1 = I_2\omega_2" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3">Finne akselerasjon ved rulling</td>
                <td className="py-2 px-3 text-amber-600 dark:text-amber-400">ΣF = ma + Στ = Iα + a=Rα</td>
                <td className="py-2 px-3 font-mono text-xs">3 ligninger, 3 ukjente</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Finne arbeid utført av kraftmoment</td>
                <td className="py-2 px-3 text-amber-600 dark:text-amber-400">Rotasjonsarbeid</td>
                <td className="py-2 px-3 font-mono text-xs"><InlineLatex latex="W = \tau\Delta\theta" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3">Finne τ(t) når ω(t) er gitt</td>
                <td className="py-2 px-3 text-blue-600 dark:text-blue-400">τ = dL/dt</td>
                <td className="py-2 px-3 font-mono text-xs"><InlineLatex latex="\tau = I\frac{d\omega}{dt}" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
