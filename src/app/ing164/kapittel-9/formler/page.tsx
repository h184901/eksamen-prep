"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Formler</h2>

      <FormulaClickCallout />

      <h3 className="font-semibold text-lg mt-6 mb-3">Kinematikk ved konstant vinkelakselerasjon</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="rotKinW" />
        <F id="rotKinTheta" />
        <F id="rotKinW2" />
        <F id="rotKinSnitt" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Lineær ↔ vinkelsammenheng</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <F id="vRomega" />
        <F id="aTanRalpha" />
        <F id="aRadOmega" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Treghetsmoment og rotasjonsenergi</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="treghetsmomentDef" />
        <F id="EkRot" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Treghetsmoment for vanlige former</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <F id="Idisk" />
        <F id="Iring" />
        <F id="IstavSenter" />
        <F id="IstavEnde" />
        <F id="IkuleMassiv" />
        <F id="IkuleHul" />
      </div>

      <h3 className="font-semibold text-lg mt-8 mb-3">Parallellakse-teoremet</h3>
      <F id="parallellakse" />

      {/* Når bruker du hva? */}
      <div className="mt-10">
        <h3 className="font-semibold text-lg mb-4">Når bruker du hva?</h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--card-border)]/40">
                <th className="py-3 px-4 text-left font-semibold">Situasjon</th>
                <th className="py-3 px-4 text-left font-semibold">Formel</th>
                <th className="py-3 px-4 text-left font-semibold">Merk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr className="bg-[var(--card)]">
                <td className="py-3 px-4">Konstant α, finn ω eller θ</td>
                <td className="py-3 px-4"><InlineLatex latex="\omega = \omega_0 + \alpha t" /> eller <InlineLatex latex="\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" /></td>
                <td className="py-3 px-4 text-[var(--muted)]">Analog med lineær kinematikk</td>
              </tr>
              <tr className="bg-[var(--card)]/60">
                <td className="py-3 px-4">Finn linjefart fra ω</td>
                <td className="py-3 px-4"><InlineLatex latex="v = r\omega" /></td>
                <td className="py-3 px-4 text-[var(--muted)]">ω må være i rad/s</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="py-3 px-4">Standardform (disk, ring, stav, kule)</td>
                <td className="py-3 px-4">Tabellverdi for <InlineLatex latex="I" /></td>
                <td className="py-3 px-4 text-[var(--muted)]">Sjekk riktig akse!</td>
              </tr>
              <tr className="bg-[var(--card)]/60">
                <td className="py-3 px-4">Akse forskjøvet fra CM</td>
                <td className="py-3 px-4"><InlineLatex latex="I_P = I_{CM} + Md^2" /></td>
                <td className="py-3 px-4 text-[var(--muted)]">Utgangspunkt MÅ være CM</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="py-3 px-4">Sammensatt legeme</td>
                <td className="py-3 px-4"><InlineLatex latex="I_\text{tot} = I_1 + I_2 + \ldots" /></td>
                <td className="py-3 px-4 text-[var(--muted)]">Kun om SAMME akse</td>
              </tr>
              <tr className="bg-[var(--card)]/60">
                <td className="py-3 px-4">Rotasjonsenergi</td>
                <td className="py-3 px-4"><InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I\omega^2" /></td>
                <td className="py-3 px-4 text-[var(--muted)]">Analog med <InlineLatex latex="\tfrac{1}{2}mv^2" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
