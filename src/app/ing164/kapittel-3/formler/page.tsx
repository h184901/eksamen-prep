"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Bevegelse i 2D og 3D</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mb-3">Vektorer og bevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="posisjonsVektor" />
        <F id="vektorFart" />
        <F id="fartsStorrelse" />
        <F id="vektorAksel" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Prosjektilbevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="skrattKastVx0" />
        <F id="skrattKastVy0" />
        <F id="skrattKastX" />
        <F id="skrattKastY" />
        <F id="skrattKastVx" />
        <F id="frittFallV" />
        <F id="frittFallV2" />
        <F id="rekkeviddeR" />
        <F id="maksHoyde" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Sirkelbevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="sentripetalA" />
        <F id="banefart" />
        <F id="sentripetalT" />
        <F id="baneaksel" />
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
                <td className="py-2 pr-4">Startfart-komponenter</td>
                <td className="py-2 pr-4">Trigonometri</td>
                <td className="py-2"><InlineLatex latex="v_{0x} = v_0\cos\alpha" />, <InlineLatex latex="v_{0y} = v_0\sin\alpha" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Tid til toppunkt</td>
                <td className="py-2 pr-4">Sett <InlineLatex latex="v_y = 0" /></td>
                <td className="py-2"><InlineLatex latex="t = v_{0y}/g" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Maks høyde</td>
                <td className="py-2 pr-4">Sett inn <InlineLatex latex="t_{\text{topp}}" /></td>
                <td className="py-2">Eller: <InlineLatex latex="v_y^2 = 0" /> → løs for y</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Tid til landing</td>
                <td className="py-2 pr-4">Sett <InlineLatex latex="y = 0" /></td>
                <td className="py-2">Løs andregradsligning, forkast negativ t</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Fart ved et punkt</td>
                <td className="py-2 pr-4"><InlineLatex latex="v = \sqrt{v_x^2+v_y^2}" /></td>
                <td className="py-2">Vinkel: <InlineLatex latex="\alpha = \tan^{-1}|v_y/v_x|" /></td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Sentripetaakselerasjon</td>
                <td className="py-2 pr-4"><InlineLatex latex="a = v^2/R" /></td>
                <td className="py-2">Alltid mot sentrum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
