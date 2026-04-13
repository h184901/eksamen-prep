"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { EnergyConservationVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      {/* 7.1 Gravitasjonell potensiell energi */}
      <TheorySummary
        title="7.1 Gravitasjonell potensiell energi"
        mustKnow={[
          "Potensiell energi: E_P = mgy",
          "Arbeid utført av tyngden: W_mg = mgy₁ − mgy₂ = −ΔE_P",
          "Nullnivå kan velges fritt — kun høydeforskjeller betyr noe",
          "Kun tyngden gjør arbeid → E_K + E_P = konstant",
          "Med andre krefter: ½mv₁² + mgy₁ + W_andre = ½mv₂² + mgy₂",
          "Banen er irrelevant — kun høydeforskjellen Δy teller",
        ]}
      >
        <p>
          Arbeidet utført av tyngden på et legeme som beveger seg fra høyde <InlineLatex latex="y_1" /> til
          høyde <InlineLatex latex="y_2" />:
        </p>

        <FormulaBox
          latex="W_{mg} = mg(y_1 - y_2) = mgy_1 - mgy_2"
          title="Arbeid utført av tyngden"
          variant="blue"
          description="Positiv når legemet synker (y₁ > y₂), negativ når det stiger."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Definisjon</p>
          <p>
            <strong>Gravitasjonell potensiell energi</strong> for et legeme med masse <InlineLatex latex="m" /> i
            høyde <InlineLatex latex="y" /> over nullnivået:
          </p>
          <div className="mt-2 text-center">
            <InlineLatex latex="E_P = mgy" />
          </div>
        </div>

        <p className="mt-4">
          Sammenhengen mellom tyngdens arbeid og potensiell energi:
        </p>
        <FormulaBox
          latex="W_{mg} = E_{P1} - E_{P2} = -\Delta E_P"
          variant="blue"
          description="Tyngden gjør positivt arbeid når E_P minker (legemet faller)."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Nullnivå — fritt valg!</p>
          <p className="text-sm">
            Nullnivået for y kan velges fritt — bare <strong>høydeforskjellen</strong> har fysisk
            betydning. Velg nullnivå der det gjør beregningen enklest (ofte i bunnen eller
            ved startpunktet).
          </p>
        </div>

        <p className="mt-4">
          <strong>Bevaring av mekanisk energi:</strong> Når <em>kun tyngden</em> gjør arbeid (ingen friksjon, ingen ytre krefter),
          bruker vi arbeid-energi-teoremet og får:
        </p>

        <FormulaBox
          latex="\tfrac{1}{2}mv_1^2 + mgy_1 = \tfrac{1}{2}mv_2^2 + mgy_2"
          title="Bevaring av mekanisk energi"
          variant="gold"
          description="E_K + E_P = konstant. Kinetisk energi og potensiell energi kan omformes til hverandre."
        />

        <EnergyConservationVisualizer />

        <p className="mt-4">
          Når <strong>andre krefter</strong> også gjør arbeid (friksjon, ytre krefter, fjær osv.):
        </p>

        <FormulaBox
          latex="\tfrac{1}{2}mv_1^2 + mgy_1 + W_{\text{andre}} = \tfrac{1}{2}mv_2^2 + mgy_2"
          title="Utvidet energiligning"
          variant="gold"
          description="W_andre inkluderer arbeid fra friksjon, ytre krefter, osv. Friksjon gir alltid negativt W_andre."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Banen er irrelevant!</p>
          <p className="text-sm">
            Tyngdens arbeid avhenger <strong>kun av høydeforskjellen &Delta;y</strong>, ikke av hvilken
            bane legemet følger. Dette er fordi <InlineLatex latex="W_{mg} = -mg\hat{\jmath} \cdot (\Delta x\hat{\imath} + \Delta y\hat{\jmath}) = -mg\Delta y" />.
            Derfor fungerer energibevaring langs kurver, skråplan, og vilkårlige baner — så lenge det er friksjonsfritt.
          </p>
        </div>

        <p className="mt-4">
          <strong>Normalkraftens arbeid</strong> er alltid null fordi den er vinkelrett på bevegelsesretningen.
          Derfor: på friksjonsfrie kurver og skråplan kan vi bruke ren energibevaring!
        </p>
      </TheorySummary>
    </div>
  );
}
