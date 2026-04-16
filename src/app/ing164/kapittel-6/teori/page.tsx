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

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Hvorfor cos φ? — geometrien bak prikkproduktet</p>
          <p className="text-sm">
            Arbeid spør: &laquo;hvor mye av kraften virker <em>langs</em> bevegelsesretningen?&raquo;
            Hvis du drar en slede i en vinkel, er det bare komponenten <InlineLatex latex="F_\parallel = F\cos\varphi" /> som
            faktisk dytter sleden fremover — den vinkelrette komponenten <InlineLatex latex="F_\perp = F\sin\varphi" /> forsøker
            bare å løfte sleden. Derfor: <InlineLatex latex="W = F_\parallel \cdot s = (F\cos\varphi) \cdot s" />.
            Du kan også se det omvendt: projiser forflytningen <InlineLatex latex="s" /> på kraftretningen og få
            <InlineLatex latex="s\cos\varphi" /> — samme svar. Denne &laquo;projeksjon-egenskapen&raquo; er hele essensen i prikkproduktet.
          </p>
        </div>

        {/* SVG: Arbeid for ulike vinkler */}
        <div className="my-6">
          <p className="text-sm font-semibold text-[var(--muted)] mb-3 text-center">Fortegnet til arbeid bestemmes av vinkelen</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 600 220" className="w-full max-w-2xl">
              {/* Ground */}
              <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4">
                <line x1="20" y1="170" x2="580" y2="170" />
              </g>

              {/* Case 1: φ = 0 (W > 0) */}
              <g>
                <rect x="60" y="140" width="50" height="30" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                {/* Forflytning pil */}
                <line x1="110" y1="155" x2="175" y2="155" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                <text x="140" y="148" textAnchor="middle" className="fill-current text-[10px]">s</text>
                {/* Kraft pil (samme retning) */}
                <line x1="60" y1="125" x2="125" y2="125" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                <text x="92" y="118" textAnchor="middle" fill="#10b981" className="text-[10px] font-semibold">F</text>
                <text x="100" y="195" textAnchor="middle" className="fill-current text-[11px] font-semibold">φ = 0°</text>
                <text x="100" y="210" textAnchor="middle" fill="#10b981" className="text-[11px] font-bold">W &gt; 0</text>
              </g>

              {/* Case 2: φ = 90° (W = 0) */}
              <g>
                <rect x="260" y="140" width="50" height="30" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="310" y1="155" x2="375" y2="155" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                <text x="340" y="148" textAnchor="middle" className="fill-current text-[10px]">s</text>
                {/* Kraft loddrett */}
                <line x1="285" y1="140" x2="285" y2="90" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-amber)" />
                <text x="270" y="110" textAnchor="middle" fill="#f59e0b" className="text-[10px] font-semibold">F</text>
                <text x="300" y="195" textAnchor="middle" className="fill-current text-[11px] font-semibold">φ = 90°</text>
                <text x="300" y="210" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-bold">W = 0</text>
              </g>

              {/* Case 3: φ = 180° (W < 0) */}
              <g>
                <rect x="460" y="140" width="50" height="30" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="510" y1="155" x2="575" y2="155" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                <text x="542" y="148" textAnchor="middle" className="fill-current text-[10px]">s</text>
                {/* Kraft motsatt */}
                <line x1="515" y1="125" x2="450" y2="125" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
                <text x="482" y="118" textAnchor="middle" fill="#ef4444" className="text-[10px] font-semibold">F</text>
                <text x="500" y="195" textAnchor="middle" className="fill-current text-[11px] font-semibold">φ = 180°</text>
                <text x="500" y="210" textAnchor="middle" fill="#ef4444" className="text-[11px] font-bold">W &lt; 0</text>
              </g>

              <defs>
                <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
                </marker>
                <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#10b981" />
                </marker>
                <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#f59e0b" />
                </marker>
                <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-xs text-[var(--muted)] text-center mt-2 italic">
            Kraftvektor (farget) og forflytningsvektor (grå). Det er vinkelen mellom dem som gir fortegnet.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Konkrete eksempler fra hverdagen</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Du bærer en sekk bortover</strong>: Du løfter den med en kraft oppover, men beveger deg horisontalt. φ = 90° → du gjør <em>null</em> arbeid på sekken (selv om musklene dine sliter). Forvirrende, men fysisk korrekt!</li>
            <li>• <strong>Dytter en bil i gir</strong>: Kraften er nesten horisontal, forflytningen er horisontal → φ ≈ 0° → maksimalt positivt arbeid.</li>
            <li>• <strong>Bremser en bil</strong>: Friksjonen fra bremsene peker motsatt bevegelsen → φ = 180° → W &lt; 0 (energi fjernes, bilen stopper).</li>
            <li>• <strong>Kurvekjøring (konstant fart)</strong>: Sentripetalkraften peker alltid vinkelrett mot bevegelsen → W = 0 per runde. Det er derfor farten ikke endres i en jevn sirkelbevegelse!</li>
          </ul>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Typiske misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>&laquo;Muskelsliter = arbeid&raquo;</strong>: Fysisk arbeid krever forflytning. Å holde en tung koffert stille gir null arbeid, selv om du blir sliten (musklene dine bruker kjemisk energi internt).</li>
            <li>• <strong>Bruker massen i stedet for kraften</strong>: <InlineLatex latex="W = F\cdot s" />, ikke <InlineLatex latex="m\cdot s" />. Tyngden er <InlineLatex latex="F = mg" />.</li>
            <li>• <strong>Glemmer fortegnet</strong>: Friksjonsarbeid er ALLTID negativt, selv om du regner &laquo;bare tallet&raquo;. Ta med minus i energiregnskapet!</li>
            <li>• <strong>Summerer krefter først</strong>: Du kan regne <InlineLatex latex="W_\text{tot} = \sum W_i" /> (arbeid per kraft) ELLER <InlineLatex latex="W_\text{tot} = F_\text{netto}\cdot s" />, men ikke miks.</li>
          </ul>
        </div>

        <p className="mt-4">
          <strong>Forskjell: <InlineLatex latex="W_\text{tot}" />, <InlineLatex latex="W_\text{netto}" />, og <InlineLatex latex="W_{\text{enkeltkraft}}" />:</strong>{" "}
          <InlineLatex latex="W_{\text{enkeltkraft}}" /> er arbeidet fra én bestemt kraft (f.eks. bare tyngden).
          <InlineLatex latex="W_\text{tot}" /> (også kalt <InlineLatex latex="W_\text{netto}" />) er summen av arbeid fra ALLE krefter,
          og det er dette som står i arbeid-energi-teoremet. Pass på: <InlineLatex latex="W_\text{tot} \neq W_{\text{mg}}" /> hvis
          andre krefter også virker.
        </p>

        {/* Inline visualization */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-[var(--muted)] mb-2">Prøv selv — arbeidskalkulator:</p>
          <WorkCalculator />
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">📚 Videre lesning — arbeid</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.khanacademy.org/science/physics/work-and-energy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy: Work and Energy</a></li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/work.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics: Work</a></li>
            <li>• <a href="https://www.feynmanlectures.caltech.edu/I_13.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Feynman Lectures Vol I, kap 13: Work and Potential Energy</a></li>
          </ul>
        </div>
      </TheorySummary>

      {/* 6.2 Arbeid og kinetisk energi */}
      <TheorySummary
        title="6.2 Arbeid og kinetisk energi"
        mustKnow={[
          "Kinetisk energi: E_k = ½mv²",
          "Arbeid-energi-teoremet: W_tot = ΔE_k = ½mv₂² − ½mv₁²",
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
            <InlineLatex latex="E_k = \tfrac{1}{2}mv^2" />
          </div>
        </div>

        <FormulaBox
          latex="W_{\text{tot}} = \Delta E_k = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2"
          title="Arbeid-energi-teoremet"
          variant="gold"
          description="Det totale arbeidet utført på et legeme er lik endringen i kinetisk energi."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tolkning av arbeid-energi-teoremet</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <InlineLatex latex="W_{\text{tot}} > 0" /> → <InlineLatex latex="E_k" /> øker → farten øker</li>
            <li>• <InlineLatex latex="W_{\text{tot}} = 0" /> → <InlineLatex latex="E_k" /> uendret → farten er konstant</li>
            <li>• <InlineLatex latex="W_{\text{tot}} < 0" /> → <InlineLatex latex="E_k" /> minker → farten minker</li>
          </ul>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Hvorfor <InlineLatex latex="\tfrac{1}{2}mv^2" />? — ikke <InlineLatex latex="mv" /> eller <InlineLatex latex="mv^3" /></p>
          <p className="text-sm mb-2">
            Utledningen bestemmer formen helt tvangmessig. Fra Newtons 2. lov <InlineLatex latex="F = m\,dv/dt" /> og
            <InlineLatex latex="dx = v\,dt" /> får vi <InlineLatex latex="F\,dx = mv\,dv" />. Integrerer vi begge sider:
          </p>
          <div className="text-center">
            <InlineLatex latex="W = \int F\,dx = \int_{v_1}^{v_2} mv\,dv = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" />
          </div>
          <p className="text-sm mt-2">
            Kvadratet kommer fra integrasjonen av <InlineLatex latex="v" />. <strong>Konsekvens:</strong> Å doble farten
            firedobler energien (<InlineLatex latex="2^2 = 4" />). Dette er grunnen til at bremselengden i en bil
            firedobles når farten dobles — det er fire ganger så mye energi som må fjernes av friksjonen!
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon: &laquo;energi inn = endring i bevegelsesenergi&raquo;</p>
          <p className="text-sm">
            Tenk på <InlineLatex latex="E_k" /> som et mål på &laquo;hvor mye bevegelse som er lagret&raquo; i objektet.
            Hver gang du gjør positivt arbeid, pumper du mer bevegelse inn. Hver gang kreftene gjør negativt arbeid
            (som friksjon), tapper du ut bevegelse. Arbeid-energi-teoremet er bokholderiet for denne prosessen.
            Det er et av fysikkens mest kraftfulle verktøy fordi det kobler direkte krefter til fart — uten å måtte
            gå via tid (slik Newtons 2. lov krever).
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Typiske misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Blander <InlineLatex latex="v_2 - v_1" /> med <InlineLatex latex="v_2^2 - v_1^2" /></strong>: Du MÅ kvadrere hver fart <em>før</em> du trekker fra. <InlineLatex latex="(5^2 - 3^2) = 25 - 9 = 16" />, ikke <InlineLatex latex="(5-3)^2 = 4" />.</li>
            <li>• <strong>Glemmer totalt arbeid</strong>: Arbeid-energi-teoremet bruker <InlineLatex latex="W_\text{tot}" />, ikke arbeidet fra én kraft. Inkludér ALLE krefter (tyngden, friksjon, normalkraft, drag, osv.)</li>
            <li>• <strong>Bruker <InlineLatex latex="E_k" /> som vektor</strong>: Kinetisk energi er en SKALAR. Den har ingen retning, kan ikke være negativ, og endres kun av arbeid — ikke av retningsendring.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng til andre kapitler</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Kap 7:</strong> Når arbeidet kommer fra en konservativ kraft, kan vi definere potensiell energi <InlineLatex latex="E_p" /> og få <InlineLatex latex="E_k + E_p = \text{konst}" />.</li>
            <li>• <strong>Kap 8:</strong> Arbeid gir oss energi; kraftimpuls <InlineLatex latex="J = \int F\,dt" /> gir oss bevegelsesmengde. Sammenlign: <InlineLatex latex="W = \int F\,ds" /> vs <InlineLatex latex="J = \int F\,dt" />.</li>
            <li>• <strong>Kap 10 (rotasjon):</strong> Analogien er <InlineLatex latex="W_{\text{rot}} = \tau\,\theta" /> og <InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I\omega^2" /> — samme struktur!</li>
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

        {/* SVG: Areal under F(x)-kurve = arbeid */}
        <div className="my-6">
          <p className="text-sm font-semibold text-[var(--muted)] mb-3 text-center">Geometrisk tolkning: arbeid = arealet under F(x)-kurven</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 420 260" className="w-full max-w-lg">
              {/* Axes */}
              <g stroke="currentColor" strokeWidth="1.5" fill="none">
                <line x1="50" y1="220" x2="400" y2="220" />
                <line x1="50" y1="220" x2="50" y2="30" />
              </g>
              {/* Axis labels */}
              <text x="395" y="240" className="fill-current text-[11px]" textAnchor="end">x</text>
              <text x="40" y="40" className="fill-current text-[11px]" textAnchor="end">F(x)</text>

              {/* Shaded area (area under curve) */}
              <path
                d="M 100 220 L 100 180 Q 160 90, 220 130 T 340 110 L 340 220 Z"
                fill="#f59e0b"
                opacity="0.3"
              />

              {/* Curve F(x) */}
              <path
                d="M 100 180 Q 160 90, 220 130 T 340 110"
                stroke="#f59e0b"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Boundary lines */}
              <line x1="100" y1="220" x2="100" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
              <line x1="340" y1="220" x2="340" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />

              {/* Tick labels */}
              <text x="100" y="240" textAnchor="middle" className="fill-current text-[11px]">x₁</text>
              <text x="340" y="240" textAnchor="middle" className="fill-current text-[11px]">x₂</text>

              {/* W = area label */}
              <text x="220" y="175" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">W = ∫F dx</text>
              <text x="220" y="200" textAnchor="middle" className="fill-current text-[10px]" opacity="0.7">(arealet her)</text>
            </svg>
          </div>
          <p className="text-xs text-[var(--muted)] text-center mt-2 italic">
            Når kraften varierer, blir arbeidet arealet under kurven mellom <InlineLatex latex="x_1" /> og <InlineLatex latex="x_2" />.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Intuisjon — hvorfor integrasjon?</p>
          <p className="text-sm">
            Hvis kraften var konstant, kunne vi bare regne <InlineLatex latex="W = F\cdot s" /> — et
            rektangel med høyde <InlineLatex latex="F" /> og bredde <InlineLatex latex="s" />.
            Når kraften varierer, må vi tenke oss rektangelet erstattet av en uregelmessig figur: vi deler opp
            i tusenvis av tynne strimler (hver med bredde <InlineLatex latex="dx" /> og høyde <InlineLatex latex="F(x)" />)
            og summerer arealene. Det er akkurat det integralet gjør. Hver strimmel er &laquo;mikroarbeidet&raquo; <InlineLatex latex="dW = F(x)\,dx" />.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hvorfor <InlineLatex latex="\tfrac{1}{2}kx^2" /> for fjær?</p>
          <p className="text-sm mb-2">
            Fjærkraften øker lineært: jo mer du strekker, jo hardere dytter fjæra tilbake. Gjennomsnittskraften
            fra 0 til x er <InlineLatex latex="\bar F = \tfrac{1}{2}kx" /> (halvveis mellom 0 og kx).
            Arbeidet er gjennomsnittskraft × forflytning:
          </p>
          <div className="text-center">
            <InlineLatex latex="W = \bar F \cdot x = \tfrac{1}{2}kx \cdot x = \tfrac{1}{2}kx^2" />
          </div>
          <p className="text-sm mt-2">
            Geometrisk: <InlineLatex latex="F(x) = kx" /> er en rett linje fra (0,0) til (x, kx).
            Arealet under denne er en trekant med grunnlinje <InlineLatex latex="x" /> og høyde <InlineLatex latex="kx" />,
            dvs. <InlineLatex latex="\tfrac{1}{2}\cdot x \cdot kx = \tfrac{1}{2}kx^2" />. Samme svar.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Typiske misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Bruker <InlineLatex latex="F_{\max}\cdot x" /> for fjær</strong>: NEI! Fjærkraften varierer fra 0 til <InlineLatex latex="kx" />. Det riktige er <InlineLatex latex="\tfrac{1}{2}kx^2" />.</li>
            <li>• <strong>Glemmer fortegn på fjærkraften</strong>: Hookes lov er formelt <InlineLatex latex="F_{\text{fjær}} = -kx" /> fordi kraften motvirker forlengelsen. I arbeidet på fjæra (å strekke den) bruker vi <InlineLatex latex="F_{\text{ytre}} = +kx" />.</li>
            <li>• <strong>Regner bare sluttpunktet</strong>: Arbeidet er en forskjell: <InlineLatex latex="\tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2" />. Hvis fjæra allerede var strukket i <InlineLatex latex="x_1" />, må du trekke fra!</li>
          </ul>
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

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Hvorfor hastighet inngår i effekt</p>
          <p className="text-sm mb-2">
            <InlineLatex latex="P = F\cdot v" /> sier: &laquo;å levere en kraft mens du allerede beveger deg fort krever mer effekt enn å levere den samme kraften sakte.&raquo;
            Intuitivt: samme arbeid på kortere tid = høyere effekt. Og fart er &laquo;forflytning per tid&raquo;.
          </p>
          <p className="text-sm">
            <strong>Konsekvens:</strong> En bilmotor leverer maksimal kraft ved lav fart (fra start), men maksimal
            effekt ved høyere fart. Dette er grunnen til at biler har gir — for å tilpasse turtall og dreiemoment
            slik at hjulene får riktig kraft ved ulike hastigheter.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogier</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Båndsag vs håndsag</strong>: Håndsag har lav <InlineLatex latex="v" /> → lav effekt, tar lang tid. Båndsag har høy <InlineLatex latex="v" /> → høy effekt, kutter raskt. Samme kraft på tann, helt ulik effekt.</li>
            <li>• <strong>Løpe vs gå trapper</strong>: Samme arbeid (<InlineLatex latex="W = mgh" />), men å løpe gjør det på kortere tid → høyere effekt → du blir andpusten.</li>
            <li>• <strong>Lyspære vs hårføner</strong>: 60 W lyspære omsetter 60 J/s til lys+varme. En 2000 W hårføner bruker 33 ganger mer energi per sekund.</li>
            <li>• <strong>Sykling oppoverbakke</strong>: Profesjonelle syklister leverer ~400 W i maks. For å holde samme fart i oppoverbakke må du levere <InlineLatex latex="P = mgv\sin\theta" /> — jo brattere bakke, jo høyere <InlineLatex latex="\theta" />, jo mer effekt.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Typiske misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Blander effekt og energi</strong>: Effekt (W) er RATE. Energi (J) er total. 60 W lyspære som lyser i 1 time bruker <InlineLatex latex="60 \cdot 3600 = 216\,000" /> J energi.</li>
            <li>• <strong>kWh = kW per time</strong>: NEI! kWh er &laquo;kilowatt ganger time&raquo; = energienhet. Ikke deling.</li>
            <li>• <strong>Glemmer <InlineLatex latex="\cos\varphi" /> i <InlineLatex latex="P = F\cdot v" /></strong>: Den fulle formelen er <InlineLatex latex="P = Fv\cos\varphi" />. Hvis kraft og hastighet ikke er parallelle, må du ta vinkelen med.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng til rotasjon (kap 10)</p>
          <p className="text-sm">
            For rotasjon er effekten <InlineLatex latex="P = \tau\cdot\omega" /> (dreiemoment ganger vinkelfart).
            Dette er det &laquo;motorytelsesdiagrammet&raquo; viser: dreiemoment <InlineLatex latex="\tau" />-kurve og
            effekt <InlineLatex latex="P" />-kurve som funksjon av turtall <InlineLatex latex="\omega" />.
          </p>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">📚 Videre lesning — effekt og energi</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.khanacademy.org/science/physics/work-and-energy/work-and-energy-tutorial/a/what-is-power" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy: Power</a></li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/pow.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics: Power</a></li>
            <li>• <a href="https://www.youtube.com/@veritasium" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Veritasium (YouTube) — kraftfulle fysikkforklaringer</a></li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
