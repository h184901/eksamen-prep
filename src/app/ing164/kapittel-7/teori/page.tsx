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
          "Potensiell energi: E_p = mgy",
          "Arbeid utført av tyngden: W_mg = mgy₁ − mgy₂ = −ΔE_p",
          "Nullnivå kan velges fritt — kun høydeforskjeller betyr noe",
          "Kun tyngden gjør arbeid → E_k + E_p = konstant",
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
            <InlineLatex latex="E_p = mgy" />
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            HVORFOR er E_p = mgy?
          </p>
          <p className="text-sm">
            Tenk på det slik: for å løfte en kloss med masse <InlineLatex latex="m" /> opp en høyde{" "}
            <InlineLatex latex="y" /> med <em>konstant</em> fart, må du utøve en kraft{" "}
            <InlineLatex latex="F = mg" /> oppover. Arbeidet du gjør er{" "}
            <InlineLatex latex="W_\text{du} = F \cdot s = mg \cdot y" />. Denne energien &laquo;lagres&raquo; i
            posisjonen — den kan hentes tilbake som kinetisk energi når klossen slippes. Derfor:
            <InlineLatex latex="\;E_p = mgy" />.
          </p>
          <p className="text-sm mt-2">
            Formelen er bare gyldig når <InlineLatex latex="g" /> kan antas konstant (vanligvis nær jordas
            overflate). Lengre ute i universet bruker vi <InlineLatex latex="E_p = -GMm/r" /> — men det er
            ikke pensum her.
          </p>
        </div>

        <p className="mt-4">
          Sammenhengen mellom tyngdens arbeid og potensiell energi:
        </p>
        <FormulaBox
          latex="W_{mg} = E_{p,1} - E_{p,2} = -\Delta E_p"
          variant="blue"
          description="Tyngden gjør positivt arbeid når E_p minker (legemet faller)."
        />

        {/* Matematikk-sjekk for W_mg = -ΔE_p */}
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Matematikk-sjekk: hvorfor er det &laquo;start minus slutt&raquo;?
          </p>
          <p className="text-sm mb-2">
            Δ betyr vanligvis &laquo;slutt − start&raquo;, så hvorfor plutselig &laquo;start − slutt&raquo; her?
            Minustegnet foran Δ snur rekkefølgen:
          </p>
          <div className="bg-white/60 dark:bg-black/30 rounded p-3 my-2 font-mono text-sm space-y-1.5">
            <div>1. Definisjon: &nbsp;&nbsp;<InlineLatex latex="\Delta E_p = E_{p,2} - E_{p,1}" /></div>
            <div>2. Grunnregel: &nbsp;<InlineLatex latex="W_{mg} = -\Delta E_p" /></div>
            <div>3. Sett inn: &nbsp;&nbsp;&nbsp;&nbsp;<InlineLatex latex="W_{mg} = -(E_{p,2} - E_{p,1})" /></div>
            <div>4. Fordel: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<InlineLatex latex="W_{mg} = E_{p,1} - E_{p,2}" /> (start − slutt)</div>
          </div>
          <p className="text-sm mt-2">
            <strong>Tolk det fysisk:</strong> Når legemet faller, er <InlineLatex latex="E_{p,1} > E_{p,2}" /> →
            W_mg positivt ✓. Når legemet stiger, er <InlineLatex latex="E_{p,1} < E_{p,2}" /> → W_mg negativt ✓.
            Tyngden &laquo;betaler ut&raquo; positivt arbeid når klossen synker, og &laquo;tar inn&raquo; arbeid når den
            stiger.
          </p>
        </div>

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
          description="E_k + E_p = konstant. Kinetisk energi og potensiell energi kan omformes til hverandre."
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

        {/* SVG: Samme høydeforskjell → samme sluttfart */}
        <div className="my-6">
          <p className="text-sm font-semibold text-[var(--muted)] mb-3 text-center">
            Banen er irrelevant — kun Δy bestemmer sluttfarten
          </p>
          <div className="flex justify-center">
            <svg viewBox="0 0 520 240" className="w-full max-w-2xl">
              <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3">
                <line x1="40" y1="200" x2="480" y2="200" strokeDasharray="3 3" />
                <line x1="40" y1="50" x2="480" y2="50" strokeDasharray="3 3" />
              </g>
              <text x="25" y="55" className="fill-current text-[10px]">y₁ (topp)</text>
              <text x="25" y="205" className="fill-current text-[10px]">y₂ (bunn)</text>

              {/* Bane A: rett skråplan */}
              <line x1="80" y1="50" x2="180" y2="200" stroke="#3b82f6" strokeWidth="2.5" />
              <circle cx="80" cy="50" r="7" fill="#3b82f6" />
              <text x="110" y="130" fill="#3b82f6" className="text-[11px] font-semibold">A: skråplan</text>

              {/* Bane B: kurvet bakke */}
              <path d="M 230 50 Q 205 120 255 160 T 320 200" stroke="#10b981" strokeWidth="2.5" fill="none" />
              <circle cx="230" cy="50" r="7" fill="#10b981" />
              <text x="265" y="130" fill="#10b981" className="text-[11px] font-semibold">B: kurve</text>

              {/* Bane C: trinnvis */}
              <polyline points="380,50 400,50 400,120 430,120 430,200 470,200"
                        stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <circle cx="380" cy="50" r="7" fill="#f59e0b" />
              <text x="395" y="170" fill="#f59e0b" className="text-[11px] font-semibold">C: trapp</text>

              <text x="260" y="228" textAnchor="middle" className="fill-current text-[12px] font-semibold">
                v₂ = √(2g·Δy) — samme svar for alle tre (friksjonsfritt)
              </text>
            </svg>
          </div>
        </div>

        {/* Vanlige feil / misforståelser */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-1.5">
            <li>
              • <strong>&laquo;E_p = mgh der h er høyden over bakken&raquo;</strong> — Nesten, men h må være målt over
              <em> nullnivået du har valgt</em>. Bakken kan være nullnivået, men du kan også velge topp-punktet
              eller et hvilket som helst annet sted.
            </li>
            <li>
              • <strong>&laquo;Energibevaring gjelder bare rett opp-ned&raquo;</strong> — Nei! Den gjelder langs enhver
              friksjonsfri bane — kurvet, skråplan, berg-og-dal-bane. Så lenge kun tyngden og normalkraften
              gjør arbeid, er E_k + E_p bevart.
            </li>
            <li>
              • <strong>&laquo;Normalkraften gjør arbeid&raquo;</strong> — Aldri på en bane der den står vinkelrett på
              bevegelsen. Derfor kan vi ignorere den i energiregnestykket.
            </li>
            <li>
              • <strong>&laquo;Friksjon bare gjør W negativt&raquo;</strong> — I retning av bevegelsen, ja. Men
              i energi<em>bevaringen</em> bidrar friksjon alltid med et negativt <InlineLatex latex="W_\text{andre}" /> —
              det reduserer sluttfarten.
            </li>
          </ul>
        </div>

        {/* Oppgavestrategi */}
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Oppgavestrategi — energimetoden</p>
          <ol className="list-decimal ml-5 text-sm space-y-1">
            <li>Velg <strong>nullnivå</strong> for y (gjerne i det laveste punktet).</li>
            <li>Identifiser <strong>starttilstand</strong> (1) og <strong>sluttilstand</strong> (2): hva er v og y?</li>
            <li>List opp andre krefter som gjør arbeid (friksjon? ytre dytt?). Det går inn i <InlineLatex latex="W_\text{andre}" />.</li>
            <li>Sett opp <InlineLatex latex="\tfrac{1}{2}mv_1^2 + mgy_1 + W_\text{andre} = \tfrac{1}{2}mv_2^2 + mgy_2" />.</li>
            <li>Løs for ukjent. Sjekk enheter (J) og rimelighet (v ≥ 0).</li>
          </ol>
          <p className="text-sm mt-2">
            <strong>Når du skal velge energi vs. Newton:</strong> Hvis oppgaven spør om <em>fart ved posisjon</em> →
            energi. Hvis den spør om <em>tid eller akselerasjon</em> → Newton (kap. 4-5).
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — ball på hylle</p>
          <p className="text-sm">
            Tenk på en ball som ligger på en høy hylle. Du gjorde arbeid for å løfte den dit — den energien er
            &laquo;lagret&raquo; i posisjonen. Når du dytter den av, blir den lagrede energien omformet til fart
            (kinetisk energi). Det er hele essensen av E_p = mgy: <em>høy plassering = lagret fallpotensial</em>.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 my-4">
          <p className="font-semibold mb-2">Eksterne ressurser</p>
          <ul className="text-sm space-y-1">
            <li>
              <a href="https://www.khanacademy.org/science/physics/work-and-energy/work-and-energy-tutorial/v/conservation-of-energy"
                 target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 dark:text-blue-400 hover:underline">
                Khan Academy — Conservation of Energy
              </a>
            </li>
            <li>
              <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/pegrav.html"
                 target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 dark:text-blue-400 hover:underline">
                HyperPhysics — Gravitational Potential Energy
              </a>
            </li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
