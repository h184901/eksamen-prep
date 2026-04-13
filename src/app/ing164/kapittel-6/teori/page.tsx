"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { WorkCalculator, WorkEnergyVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      {/* 6.1 Arbeid */}
      <TheorySummary
        title="6.1 Arbeid"
        mustKnow={[
          "Arbeid W = F · s · cos φ (kraft ganger forflytning ganger cosinus til vinkelen mellom dem)",
          "W = F⃗ · s⃗ (prikkprodukt i vektorform)",
          "Positivt arbeid når φ < 90°, null når φ = 90°, negativt når φ > 90°",
          "Enhet: 1 J (joule) = 1 N·m",
          "Beregn arbeid fra HVER kraft separat, og summer til totalt arbeid",
        ]}
      >
        <p>
          <strong>Arbeid</strong> er et mål på energioverføring via en kraft som virker over en forflytning.
          Når en konstant kraft <InlineLatex latex="\vec{F}" /> virker på et legeme som forflyttes en
          strekning <InlineLatex latex="\vec{s}" />, er arbeidet:
        </p>

        <FormulaBox
          latex="W = F \cdot s \cdot \cos\varphi"
          title="Arbeid (konstant kraft)"
          variant="gold"
          description="φ er vinkelen mellom kraftretningen og forflytningsretningen. Enhet: joule (J) = N·m."
        />

        <p className="mt-4">
          I <strong>vektorform</strong> med prikkprodukt:
        </p>
        <FormulaBox
          latex="W = \vec{F} \cdot \vec{s} = F_x s_x + F_y s_y + F_z s_z"
          title="Arbeid (vektorform)"
          variant="blue"
          description="Prikkproduktet gir en skalar — ingen retning, bare tall."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Fortegnregler for arbeid</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <InlineLatex latex="0 < \varphi < 90°" /> → <strong>Positivt arbeid</strong> (kraft dytter med bevegelsen)</li>
            <li>• <InlineLatex latex="\varphi = 90°" /> → <strong>Arbeid = 0</strong> (kraft vinkelrett på bevegelsen)</li>
            <li>• <InlineLatex latex="90° < \varphi \leq 180°" /> → <strong>Negativt arbeid</strong> (kraft motvirker bevegelsen)</li>
          </ul>
        </div>

        <p className="mt-4">
          <strong>Viktig innsikt:</strong> Gravitasjon og normalkraft gjør <em>null</em> arbeid på horisontal
          forflytning fordi de er vinkelrette på bevegelsesretningen (cos 90° = 0). Friksjon gjør alltid
          <em> negativt</em> arbeid fordi den peker motsatt bevegelsesretningen (cos 180° = −1).
        </p>

        {/* Inline visualization */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-[var(--muted)] mb-2">Prøv selv — arbeidskalkulator:</p>
          <WorkCalculator />
        </div>
      </TheorySummary>

      {/* 6.2 Arbeid og kinetisk energi */}
      <TheorySummary
        title="6.2 Arbeid og kinetisk energi"
        mustKnow={[
          "Kinetisk energi: E_K = ½mv²",
          "Arbeid-energi-teoremet: W_tot = ΔE_K = ½mv₂² − ½mv₁²",
          "Positivt totalt arbeid → farten øker, negativt → farten minker",
          "Arbeid-energi-teoremet gjelder for ALLE typer krefter",
        ]}
      >
        <p>
          <strong>Utledning:</strong> Vi starter med Newtons 2. lov <InlineLatex latex="\Sigma F = ma" /> og
          kinematikk-sammenhengen <InlineLatex latex="v_2^2 - v_1^2 = 2as" />, som gir <InlineLatex latex="as = \tfrac{1}{2}v_2^2 - \tfrac{1}{2}v_1^2" />.
          Multipliser med m:
        </p>

        <FormulaBox
          latex="W_{\text{tot}} = \Sigma F \cdot s = mas = m\!\left(\tfrac{1}{2}v_2^2 - \tfrac{1}{2}v_1^2\right) = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2"
          variant="blue"
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Definisjon</p>
          <p>
            Et legeme med masse <InlineLatex latex="m" /> og fart <InlineLatex latex="v" /> har <strong>kinetisk energi</strong>:
          </p>
          <div className="mt-2">
            <InlineLatex latex="E_K = \tfrac{1}{2}mv^2" />
          </div>
        </div>

        <FormulaBox
          latex="W_{\text{tot}} = \Delta E_K = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2"
          title="Arbeid-energi-teoremet"
          variant="gold"
          description="Det totale arbeidet utført på et legeme er lik endringen i kinetisk energi."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tolkning av arbeid-energi-teoremet</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <InlineLatex latex="W_{\text{tot}} > 0" /> → <InlineLatex latex="E_K" /> øker → farten øker</li>
            <li>• <InlineLatex latex="W_{\text{tot}} = 0" /> → <InlineLatex latex="E_K" /> uendret → farten er konstant</li>
            <li>• <InlineLatex latex="W_{\text{tot}} < 0" /> → <InlineLatex latex="E_K" /> minker → farten minker</li>
          </ul>
        </div>

        {/* Inline visualization */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-[var(--muted)] mb-2">Prøv selv — arbeid-energi-teoremet:</p>
          <WorkEnergyVisualizer />
        </div>
      </TheorySummary>

      {/* 6.3 Varierende krefter */}
      <TheorySummary
        title="6.3 Arbeid ved varierende krefter"
        mustKnow={[
          "Arbeid = integral av kraft langs banen: W = ∫F(x)dx",
          "Geometrisk: arbeidet er arealet under F(x)-kurven",
          "Hookes lov: F = kx (fjærkraft)",
          "Arbeid ved strekking av fjær: W = ½kx₂² − ½kx₁²",
          "Arbeid-energi-teoremet gjelder OGSÅ for varierende krefter",
        ]}
      >
        <p>
          Når kraften <InlineLatex latex="F = F(x)" /> varierer langs forflytningen, kan vi ikke bare
          multiplisere F med s. I stedet deler vi strekningen i mange små intervaller <InlineLatex latex="\Delta x" /> der
          kraften er tilnærmet konstant, og lar <InlineLatex latex="\Delta x \to 0" />:
        </p>

        <FormulaBox
          latex="W = \int_{x_1}^{x_2} F(x)\,dx"
          title="Arbeid ved varierende kraft"
          variant="gold"
          description="Geometrisk tolkning: Arealet under F(x)-kurven mellom x₁ og x₂."
        />

        <p className="mt-4">
          <strong>Hookes lov</strong> beskriver kraften som trengs for å strekke eller komprimere en fjær:
        </p>
        <FormulaBox
          latex="F = kx"
          title="Hookes lov"
          variant="blue"
          description="k er fjærkonstanten (N/m), x er fjærens forlengelse/komprimering fra likevekt."
        />

        <p className="mt-4">Arbeidet med å strekke en fjær fra <InlineLatex latex="x_1" /> til <InlineLatex latex="x_2" />:</p>
        <FormulaBox
          latex="W = \int_{x_1}^{x_2} kx\,dx = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2"
          title="Arbeid på fjær"
          variant="gold"
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Også for varierende krefter!</p>
          <p>
            Professoren viste eksplisitt at arbeid-energi-teoremet også gjelder for varierende krefter.
            Utledningen bruker <InlineLatex latex="F = m\frac{dv}{dt}" /> og <InlineLatex latex="dx = v\,dt" />,
            som gir <InlineLatex latex="W = \int m\,v\,dv = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" />.
          </p>
        </div>
      </TheorySummary>

      {/* 6.4 Effekt */}
      <TheorySummary
        title="6.4 Effekt"
        mustKnow={[
          "Effekt er arbeid per tid: P = ΔW/Δt",
          "Momentaneffekt: P = dW/dt",
          "Effekt via kraft og hastighet: P = F⃗ · v⃗",
          "Enhet: 1 W (watt) = 1 J/s",
          "1 hk = 746 W, 1 kWh = 3,6 · 10⁶ J",
        ]}
      >
        <p>
          <strong>Effekt</strong> er et mål for hvor raskt arbeid utføres. Hvis et arbeid <InlineLatex latex="\Delta W" /> utføres
          i løpet av tiden <InlineLatex latex="\Delta t" />:
        </p>

        <FormulaBox
          latex="\bar{P} = \frac{\Delta W}{\Delta t}"
          title="Gjennomsnittlig effekt"
          variant="gold"
          description="Enhet: watt (W) = J/s"
        />

        <FormulaBox
          latex="P = \frac{dW}{dt}"
          title="Momentaneffekt"
          variant="blue"
        />

        <p className="mt-4">
          Svært nyttig sammenheng — effekt uttrykt via kraft og hastighet:
        </p>
        <FormulaBox
          latex="P = \vec{F} \cdot \vec{v}"
          title="Effekt = kraft · hastighet"
          variant="gold"
          description="Utledet fra P = dW/dt = F · ds/dt = F · v. Svært viktig formel!"
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Enheter for effekt og energi</p>
          <ul className="space-y-1 text-sm">
            <li>• 1 watt (W) = 1 J/s</li>
            <li>• 1 hestekraft (hk) = 746 W</li>
            <li>• 1 kWh = 1000 W · 3600 s = <InlineLatex latex="3{,}6 \cdot 10^6\;\text{J}" /></li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
