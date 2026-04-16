"use client";

import FormulaBox from "@/components/FormulaBox";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import {
  posisjonsVektor,
  vektorFart,
  fartsStorrelse,
  vektorAksel,
  skrattKastKomp,
  skrattKastBevegelse,
  frittFall,
  rekkeviddeR,
  sirkel,
  sentripetalT,
  baneaksel,
} from "@/data/ing164/formula-metadata";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler — Bevegelse i 2D og 3D</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mb-3">Vektorer og bevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}" title="Posisjonsvektoren" variant="blue" {...posisjonsVektor} />
        <FormulaBox latex="\vec{v} = \frac{d\vec{r}}{dt} = v_x\hat{i} + v_y\hat{j}" title="Momentanfart" variant="gold" {...vektorFart} />
        <FormulaBox latex="v = \sqrt{v_x^2 + v_y^2}" title="Fartens størrelse" variant="blue" {...fartsStorrelse} />
        <FormulaBox latex="\vec{a} = \frac{d\vec{v}}{dt} = a_x\hat{i} + a_y\hat{j}" title="Akselerasjon" variant="gold" {...vektorAksel} />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Prosjektilbevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="v_{0x} = v_0\cos\alpha_0" title="Horisontal startfart" variant="gold" {...skrattKastKomp} />
        <FormulaBox latex="v_{0y} = v_0\sin\alpha_0" title="Vertikal startfart" variant="gold" {...skrattKastKomp} />
        <FormulaBox latex="x = x_0 + v_{0x}\,t" title="Horisontal posisjon" variant="gold" {...skrattKastBevegelse} />
        <FormulaBox latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2" title="Vertikal posisjon" variant="gold" {...skrattKastBevegelse} />
        <FormulaBox latex="v_x = v_{0x}" title="Horisontal fart (konstant)" variant="blue" {...skrattKastBevegelse} />
        <FormulaBox latex="v_y = v_{0y} - gt" title="Vertikal fart" variant="gold" {...frittFall} />
        <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y-y_0)" title="Fart–posisjon (vertikal)" variant="gold" {...frittFall} />
        <FormulaBox latex="R = \frac{v_0^2 \sin 2\alpha_0}{g}" title="Rekkevidde (fra bakkenivå)" variant="blue" {...rekkeviddeR} />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Sirkelbevegelse</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormulaBox latex="a = \frac{v^2}{R}" title="Sentripetaakselerasjon" variant="gold" {...sirkel} />
        <FormulaBox latex="v = \frac{2\pi R}{T}" title="Banefart" variant="gold" {...sirkel} />
        <FormulaBox latex="a = \frac{4\pi^2 R}{T^2}" title="Sentripetal med omløpstid" variant="blue" {...sentripetalT} />
        <FormulaBox latex="a_\parallel = \frac{d|\vec{v}|}{dt}" title="Baneakselerasjon" variant="blue" {...baneaksel} />
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
