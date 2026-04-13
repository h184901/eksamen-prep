"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { ProjectileSimulator, CircularMotionVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Bevegelse i 2D og 3D</h2>

      {/* 3.1 Posisjons- og fartsvektorer */}
      <TheorySummary
        title="3.1 Posisjons- og fartsvektorer"
        mustKnow={[
          "Posisjonsvektoren r⃗ = xî + yĵ + zk̂",
          "Momentanfart v⃗ = dr⃗/dt (tangent til banen)",
          "Fartens størrelse: v = √(vₓ² + vᵧ²)",
          "Komponentform: vₓ = dx/dt, vᵧ = dy/dt",
        ]}
      >
        <p>
          I to og tre dimensjoner beskriver vi bevegelsen med <strong>vektorer</strong>.
          Posisjonen til et legeme angis med en posisjonsvektoren fra origo:
        </p>

        <FormulaBox
          latex="\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}"
          title="Posisjonsvektoren"
          variant="gold"
          description="x, y, z er koordinatene i et kartesisk koordinatsystem."
        />

        <p className="mt-4">
          <strong>Gjennomsnittsfarten</strong> er endringen i posisjonsvektoren delt på tidsintervallet:
        </p>
        <FormulaBox
          latex="\vec{\bar{v}} = \frac{\Delta\vec{r}}{\Delta t} = \frac{\vec{r}_2 - \vec{r}_1}{t_2 - t_1}"
          title="Gjennomsnittsfart (vektor)"
          variant="blue"
        />

        <FormulaBox
          latex="\vec{v} = \frac{d\vec{r}}{dt} = \frac{dx}{dt}\hat{i} + \frac{dy}{dt}\hat{j} = v_x\hat{i} + v_y\hat{j}"
          title="Momentanfart"
          variant="gold"
          description="Momentanfarten er tangent til banen i hvert punkt."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig geometrisk egenskap</p>
          <p>
            Fartsvektoren <InlineLatex latex="\vec{v}" /> er alltid <strong>tangent til banen</strong>.
            Fartens størrelse (skalar):
          </p>
          <div className="mt-2">
            <InlineLatex latex="v = |\vec{v}| = \sqrt{v_x^2 + v_y^2 + v_z^2}" />
          </div>
        </div>
      </TheorySummary>

      {/* 3.2 Akselerasjonsvektoren */}
      <TheorySummary
        title="3.2 Akselerasjonsvektoren"
        mustKnow={[
          "a⃗ = dv⃗/dt = d²r⃗/dt²",
          "Akselerasjon oppstår når farten endrer verdi, retning, eller begge",
          "a∥ (parallell) → fartsendring, a⊥ (normal) → retningsendring",
          "Konstant fart + kurvet bane → akselerasjon (retningsendring!)",
        ]}
      >
        <FormulaBox
          latex="\vec{a} = \frac{d\vec{v}}{dt} = a_x\hat{i} + a_y\hat{j}"
          title="Momentanakselerasjon"
          variant="gold"
          description="Komponentvis: aₓ = dvₓ/dt = d²x/dt², aᵧ = dvᵧ/dt = d²y/dt²."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tre årsaker til akselerasjon</p>
          <p className="text-sm">Et legeme har akselerasjon dersom farten endrer:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
            <li><strong>Verdi</strong> (legemet akselererer eller bremser langs banen)</li>
            <li><strong>Retning</strong> (legemet endrer kurs — selv med konstant fart!)</li>
            <li><strong>Både verdi og retning</strong> (mest generelle tilfelle)</li>
          </ol>
        </div>

        <p className="mt-4">
          Det er nyttig å dekomponere akselerasjonen i to komponenter:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <InlineLatex latex="a_\parallel" /> — <strong>parallelt</strong> med farten → endrer fartens <em>størrelse</em>
          </li>
          <li>
            <InlineLatex latex="a_\perp" /> — <strong>normalt</strong> på farten → endrer fartens <em>retning</em>
          </li>
        </ul>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig intuisjon</p>
          <ul className="space-y-1 text-sm">
            <li>• Konstant fart langs rett linje: <InlineLatex latex="\vec{a} = 0" /></li>
            <li>• Konstant fart langs kurve: <InlineLatex latex="\vec{a} \perp \vec{v}" /> (kun retningsendring)</li>
            <li>• Økende fart langs kurve: <InlineLatex latex="\vec{a}" /> har komponent fremover + innover</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 3.3 Prosjektilbevegelse */}
      <TheorySummary
        title="3.3 Prosjektilbevegelse"
        mustKnow={[
          "Prosjektilbevegelse = to uavhengige bevegelser: horisontal (a = 0) + vertikal (a = −g)",
          "v₀ₓ = v₀ cos α₀, v₀ᵧ = v₀ sin α₀",
          "Horisontal: vₓ = v₀ₓ (konstant!), x = v₀ₓ · t",
          "Vertikal: vᵧ = v₀ᵧ − gt, y = y₀ + v₀ᵧt − ½gt²",
          "Banen er en parabel",
          "Toppunkt: vᵧ = 0, Landing: y = 0",
        ]}
      >
        <p>
          Prosjektilbevegelse er bevegelse under påvirkning av <strong>kun tyngdekraften</strong>
          (ingen luftmotstand). Nøkkelen er å <strong>dekomponere</strong> bevegelsen i to
          uavhengige retninger:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">x-retning (horisontal)</th>
                <th className="text-left py-2">y-retning (vertikal)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4"><InlineLatex latex="a_x = 0" /></td>
                <td className="py-2"><InlineLatex latex="a_y = -g" /></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4"><InlineLatex latex="v_x = v_{0x}" /> (konstant)</td>
                <td className="py-2"><InlineLatex latex="v_y = v_{0y} - gt" /></td>
              </tr>
              <tr>
                <td className="py-2 pr-4"><InlineLatex latex="x = x_0 + v_{0x}\,t" /></td>
                <td className="py-2"><InlineLatex latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <FormulaBox
          latex="v_{0x} = v_0 \cos\alpha_0, \quad v_{0y} = v_0 \sin\alpha_0"
          title="Dekomposisjon av startfart"
          variant="gold"
          description="Bruk trigonometri til å finne komponentene av startfarten."
        />

        <FormulaBox
          latex="y = \frac{v_{0y}}{v_{0x}}\,x - \frac{g}{2v_{0x}^2}\,x^2"
          title="Baneligning (parabel)"
          variant="blue"
          description="Eliminerer t for å finne y som funksjon av x. Gjelder fra origo."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Sentrale resultater</p>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Toppunkt:</strong> <InlineLatex latex="v_y = 0 \;\Rightarrow\; t_{\text{topp}} = v_{0y}/g" /></li>
            <li>• <strong>Maks høyde:</strong> <InlineLatex latex="y_{\max} = y_0 + v_{0y}^2/(2g)" /></li>
            <li>• <strong>Landing (y = 0):</strong> Løs <InlineLatex latex="y_0 + v_{0y}t - \tfrac{1}{2}gt^2 = 0" /> for t</li>
            <li>• <strong>Rekkevidde (fra y₀ = 0):</strong> <InlineLatex latex="R = v_0^2 \sin(2\alpha_0)/g" /></li>
            <li>• <strong>Maks rekkevidde:</strong> ved <InlineLatex latex="\alpha_0 = 45°" /> (kun fra bakkenivå)</li>
          </ul>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil!</p>
          <ul className="space-y-1 text-sm">
            <li>• Glemmer at vₓ er konstant (ingen horisontal akselerasjon!)</li>
            <li>• Bruker v₀ istedenfor v₀ₓ eller v₀ᵧ — dekomponér alltid først</li>
            <li>• Glemmer å sette y₀ ≠ 0 når skuddet/kastet er fra en høyde</li>
            <li>• Blander grader og radianer i trigonometriske funksjoner</li>
          </ul>
        </div>

        {/* Inline simulator for prosjektilbevegelse */}
        <ProjectileSimulator />
      </TheorySummary>

      {/* 3.4 Sirkelbevegelse */}
      <TheorySummary
        title="3.4 Sirkelbevegelse"
        mustKnow={[
          "Sentripetaakselerasjon: a = v²/R (rettet mot sentrum)",
          "Alternativ form: a = 4π²R/T²",
          "Farten v = 2πR/T",
          "Ved konstant fart: akselerasjon ⊥ fart (bare retningsendring)",
          "Variabel fart: a⊥ = v²/R (sentripetal) + a∥ = dv/dt (tangentiell)",
        ]}
      >
        <p>
          Når et legeme beveger seg langs en sirkel med radius <InlineLatex latex="R" />,
          har det <strong>alltid akselerasjon</strong> — selv om farten er konstant.
          Akselerasjonen skyldes <em>retningsendringen</em>.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Geometrisk utledning</p>
          <p className="text-sm">
            Professorens argument: Trekanten dannet av <InlineLatex latex="\Delta\vec{r}" /> og
            trekanten dannet av <InlineLatex latex="\Delta\vec{v}" /> er <strong>geometrisk like</strong>.
            Derfor:
          </p>
          <div className="mt-2 text-sm">
            <InlineLatex latex="\frac{|\Delta\vec{v}|}{v} = \frac{|\Delta\vec{r}|}{R} \;\Rightarrow\; a = \frac{v}{R} \cdot \frac{|\Delta\vec{r}|}{\Delta t} = \frac{v^2}{R}" />
          </div>
        </div>

        <FormulaBox
          latex="a = \frac{v^2}{R}"
          title="Sentripetaakselerasjon"
          variant="gold"
          description="Akselerasjonen peker alltid mot sirkelsenter. Enhet: m/s²."
        />

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="v = \frac{2\pi R}{T}"
            title="Banefart"
            variant="blue"
            description="T = omløpstid (perioden)."
          />
          <FormulaBox
            latex="a = \frac{4\pi^2 R}{T^2}"
            title="Sentripetaakselerasjon (med T)"
            variant="blue"
            description="Nyttig når omløpstiden er gitt."
          />
        </div>

        <h4 className="font-semibold mt-6 mb-2">Sirkelbevegelse med variabel fart</h4>
        <p>
          Når farten endrer seg langs sirkelbanen, har akselerasjonen <strong>to komponenter</strong>:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="a_\perp = \frac{v^2}{R}"
            title="Normalakselerasjon (sentripetal)"
            variant="gold"
            description="Endrer retning. Peker mot sentrum."
          />
          <FormulaBox
            latex="a_\parallel = \frac{d|\vec{v}|}{dt}"
            title="Baneakselerasjon (tangentiell)"
            variant="gold"
            description="Endrer fartens størrelse. Langs banen."
          />
        </div>
        <FormulaBox
          latex="a = \sqrt{a_\perp^2 + a_\parallel^2}"
          title="Total akselerasjon"
          variant="blue"
        />

        {/* Inline visualizer for sirkelbevegelse */}
        <CircularMotionVisualizer />
      </TheorySummary>
    </div>
  );
}
