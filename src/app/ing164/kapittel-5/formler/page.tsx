"use client";

import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";

export default function FormlerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-6">Formler</h2>

      <FormulaClickCallout />

      <div className="grid sm:grid-cols-2 gap-3">
        <F id="newton1" titleOverride="Likevekt (N1L)" description="For legemer i ro eller konstant fart" />
        <F id="newton2" titleOverride="Dynamikk (N2L)" description="For legemer som akselererer" />
        <F id="glidefriksjon" />
        <F id="hvilefriksjon" />
        <F id="sirkelARad" />
        <F id="sentripetalkraft" />
      </div>

      <h3 className="font-semibold text-lg mt-6 mb-3">Nyttige resultater for skråplan</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <F id="skraplanAksel" />
        <F id="skraplanFriksjon" />
        <F id="skraplanNormal" />
        <F id="kritiskVinkel" />
      </div>

      <h3 className="font-semibold text-lg mt-6 mb-3">Atwood-maskin</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <F id="atwoodA" />
        <F id="atwoodT" />
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
