"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { LongWireFieldVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Kilder til magnetfelt</h2>

      {/* 28.1 Magnetfelt til en ladning i bevegelse */}
      <TheorySummary
        title="28.1 Magnetfelt til en ladning i bevegelse"
        mustKnow={[
          "En ladet partikkel i bevegelse skaper et magnetfelt rundt seg",
          "Feltstyrken avhenger av ladning, fart, avstand og vinkel",
          "B = (μ₀/4π) · |q|v sin φ / r²",
          "Feltlinjene er sirkler rundt fartsvektoren (høyrehåndsregelen)",
          "μ₀ = 4π × 10⁻⁷ T·m/A (permeabiliteten i vakuum)",
        ]}
        defaultOpen
      >
        <p>
          I kapittel 27 så vi at et magnetfelt virker en <em>kraft</em> på en ladet partikkel i bevegelse.
          Nå snur vi perspektivet: <strong>en ladet partikkel i bevegelse er selv en kilde til magnetfelt</strong>.
        </p>

        <p className="mt-3">
          Eksperimenter viser at en ladning <InlineLatex latex="q" /> som beveger seg med konstant fart{" "}
          <InlineLatex latex="\vec{v}" /> skaper et magnetfelt <InlineLatex latex="\vec{B}" /> i rommet
          rundt seg. Feltet har størrelse:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0}{4\pi} \cdot \frac{|q|v\sin\varphi}{r^2}"
          title="B-felt fra ladning i bevegelse"
          variant="gold"
          description="φ er vinkelen mellom v og retningsvektoren r̂ (fra ladningen til punktet). r er avstanden."
        />

        <p className="mt-3">På vektorform:</p>
        <FormulaBox
          latex="\vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{q\vec{v} \times \hat{r}}{r^2}"
          title="B-felt (vektorform)"
          variant="gold"
          description="Kryssproduktet v × r̂ gir retning vinkelrett på både v og r̂. Retning: høyrehåndsregelen."
        />

        <p className="mt-3">
          Her er <InlineLatex latex="\mu_0 = 4\pi \times 10^{-7}\;\text{T·m/A}" /> <strong>permeabiliteten i vakuum</strong> —
          magnetismens svar på <InlineLatex latex="\varepsilon_0" /> i elektrostatikk.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Analogi: Coulombs lov ↔ magnetfelt fra ladning</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-1 pr-4">Elektrisk (kap 21)</th>
                  <th className="text-left py-1">Magnetisk (kap 28)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4"><InlineLatex latex="E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}" /></td>
                  <td className="py-1"><InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Avhenger av q og r</td>
                  <td className="py-1">Avhenger av q, v, r og vinkel φ</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">Radialt felt (utover/innover)</td>
                  <td className="py-1">Sirkulært felt (rundt v-retning)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Viktige spesialtilfeller</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>φ = 90°</strong> (vinkelrett på v): B er <em>maksimal</em></li>
            <li>• <strong>φ = 0° eller 180°</strong> (langs v): B = 0, <em>ingen felt foran/bak ladningen</em></li>
            <li>• Feltet avtar som <InlineLatex latex="1/r^2" />, akkurat som Coulombs lov</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 28.2 Magnetfelt fra et strømelement — Biot-Savarts lov */}
      <TheorySummary
        title="28.2 Magnetfelt fra et strømelement — Biot-Savarts lov"
        mustKnow={[
          "Strøm = mange ladninger i bevegelse → lederen lager magnetfelt",
          "Biot-Savarts lov: dB = (μ₀/4π) · I dl sin φ / r²",
          "Totalt felt: integrer (summer) bidragene fra hele lederen",
          "Retning: dl × r̂ (høyrehåndsregelen)",
        ]}
      >
        <p>
          I en strømførende leder er det ladninger i bevegelse. Derfor skaper lederen et magnetfelt rundt seg.
          Vi deler lederen inn i små elementer med lengde <InlineLatex latex="d\vec{l}" />.
        </p>

        <p className="mt-3">
          Hvert element bidrar med et lite felt <InlineLatex latex="d\vec{B}" />. Total ladning i elementet
          er <InlineLatex latex="dQ = nqA\,dl" /> (n = ladningskonsentrasjon, A = tverrsnitt). Siden{" "}
          <InlineLatex latex="nqv_dA = I" />, får vi:
        </p>

        <FormulaBox
          latex="dB = \frac{\mu_0}{4\pi} \cdot \frac{I\,dl\,\sin\varphi}{r^2}"
          title="Biot-Savarts lov (størrelse)"
          variant="gold"
          description="dl = lengde av strømelementet, r = avstand til punktet, φ = vinkel mellom dl og r̂."
        />

        <FormulaBox
          latex="d\vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{I\,d\vec{l} \times \hat{r}}{r^2}"
          title="Biot-Savarts lov (vektorform)"
          variant="gold"
          description="Retningen gis av kryssproduktet dl × r̂. Dette er den fundamentale loven for B fra strøm."
        />

        <p className="mt-3">For å finne det totale magnetfeltet fra hele lederen, integrerer vi over alle elementer:</p>
        <FormulaBox
          latex="\vec{B} = \frac{\mu_0}{4\pi} \int \frac{I\,d\vec{l} \times \hat{r}}{r^2}"
          title="Totalt B-felt fra en leder"
          variant="blue"
          description="Integrasjonen summerer bidragene fra alle strømelementer langs lederen."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Slik bruker du Biot-Savarts lov</p>
          <ol className="text-sm space-y-1">
            <li>1. Identifiser strømelementet <InlineLatex latex="d\vec{l}" /> og retningen</li>
            <li>2. Finn avstanden <InlineLatex latex="r" /> og retningsvektoren <InlineLatex latex="\hat{r}" /> til punktet</li>
            <li>3. Finn vinkelen <InlineLatex latex="\varphi" /> mellom <InlineLatex latex="d\vec{l}" /> og <InlineLatex latex="\hat{r}" /></li>
            <li>4. Regn ut <InlineLatex latex="dB" /> og bestem retningen med høyrehåndsregelen</li>
            <li>5. Integrer for å finne totalt felt</li>
          </ol>
        </div>
      </TheorySummary>

      {/* 28.3 Magnetfelt fra en rett strømførende leder */}
      <TheorySummary
        title="28.3 Magnetfelt fra en rett strømførende leder"
        mustKnow={[
          "Lang rett leder: B = μ₀I / (2πr)",
          "Feltet avtar som 1/r (ikke 1/r² som for punktladning!)",
          "Feltlinjene er konsentriske sirkler rundt lederen",
          "Retning: Høyrehåndsregelen — tommel langs I, fingrene krummer i B-retning",
        ]}
      >
        <p>
          Ved å bruke Biot-Savarts lov på en rett leder med lengde <InlineLatex latex="2a" /> finner vi
          feltet i avstand <InlineLatex latex="x" /> fra midten:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0 I}{4\pi} \cdot \frac{2a}{x\sqrt{x^2 + a^2}}"
          title="Endelig rett leder"
          variant="blue"
          description="a = halve lengden av lederen, x = vinkelrett avstand fra lederen."
        />

        <p className="mt-3">
          For en <strong>uendelig lang</strong> leder (<InlineLatex latex="a \gg x" />) forenkles dette til:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0 I}{2\pi r}"
          title="Uendelig lang rett leder"
          variant="gold"
          description="r = vinkelrett avstand fra lederen. Dette er formelen du bruker mest!"
        />

        {/* Inline visualization: B-felt rundt lang rett leder */}
        <LongWireFieldVisualizer />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Høyrehåndsregelen for rett leder</p>
          <ol className="text-sm space-y-1">
            <li>1. Pek <strong>tommelen</strong> i strømretningen I</li>
            <li>2. <strong>Fingrene krummer</strong> i retningen til B-feltlinjene</li>
            <li>3. Feltlinjene er <strong>konsentriske sirkler</strong> rundt lederen</li>
          </ol>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Merk: 1/r vs. 1/r²</p>
          <p className="text-sm">
            B-feltet fra en lang rett leder avtar som <InlineLatex latex="1/r" />, ikke{" "}
            <InlineLatex latex="1/r^2" />. Dette er fordi vi summerer bidragene fra <em>uendelig mange</em>{" "}
            strømelementer langs lederen. Sammenlign med E-feltet fra en uendelig lang linjeladning:{" "}
            <InlineLatex latex="E = \lambda/(2\pi\varepsilon_0 r)" /> — samme <InlineLatex latex="1/r" />-avhengighet!
          </p>
        </div>
      </TheorySummary>

      {/* 28.4 Krefter mellom parallelle ledere */}
      <TheorySummary
        title="28.4 Krefter mellom parallelle ledere"
        mustKnow={[
          "Kraft per lengdeenhet: F/L = μ₀II′ / (2πr)",
          "Samme strømretning → tiltrekkende kraft",
          "Motsatt strømretning → frastøtende kraft",
          "Definisjonen av Ampere er basert på denne kraften",
        ]}
      >
        <p>
          To parallelle strømførende ledere påvirker hverandre magnetisk. Den ene lederen skaper et
          B-felt, og den andre lederen (med strøm i B-feltet) opplever en kraft.
        </p>

        <p className="mt-3">
          Leder 1 med strøm <InlineLatex latex="I" /> lager et felt{" "}
          <InlineLatex latex="B = \mu_0 I / (2\pi r)" /> ved leder 2.
          Kraften på leder 2 (med strøm <InlineLatex latex="I'" /> og lengde <InlineLatex latex="L" />) blir:
        </p>

        <FormulaBox
          latex="\frac{F_m}{L} = \frac{\mu_0 I I'}{2\pi r}"
          title="Kraft per lengdeenhet mellom parallelle ledere"
          variant="gold"
          description="r = avstand mellom lederne, I og I' = strømmene. Tiltrekkende for lik strømretning."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Retning på kraften</p>
          <ul className="text-sm space-y-2">
            <li>• <strong>Samme strømretning:</strong> Lederne <span className="text-green-600 dark:text-green-400 font-semibold">tiltrekker</span> hverandre</li>
            <li>• <strong>Motsatt strømretning:</strong> Lederne <span className="text-red-600 dark:text-red-400 font-semibold">frastøter</span> hverandre</li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Definisjonen av Ampere</p>
          <p className="text-sm">
            Denne kraften brukes til å definere enheten <strong>Ampere</strong>: To uendelig lange parallelle ledere
            med 1 meters avstand, som fører lik strøm, definerer 1 Ampere når den magnetiske kraften
            per lengdeenhet er nøyaktig <InlineLatex latex="F_m/L = 2 \times 10^{-7}\;\text{N/m}" />.
            Dermed følger også: <InlineLatex latex="1\;\text{C} = 1\;\text{A} \cdot 1\;\text{s}" />.
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
