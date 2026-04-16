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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor trenger vi vektorer?</p>
          <p className="text-sm">
            Fysikken eksisterer i 2D og 3D — skalarer er ikke nok. Hvis du sier «bilen beveger seg
            80 km/t», vet du ingenting om <em>kursen</em>. Navigasjon, kast, elektriske felt og krefter
            har alle en <strong>retning</strong> som er fysisk avgjørende. Vektorer pakker størrelse
            og retning i én matematisk enhet, og lar oss addere, subtraktere og dekomponere
            bevegelse langs vilkårlige akser.
          </p>
        </div>

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

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — GPS vs. avstand</p>
          <p className="text-sm">
            Tenk på GPS-koordinater kontra veikilometeret på dashbordet. Kilometertelleren (skalar)
            forteller deg <em>hvor langt</em> du har kjørt. GPS-en (vektor) forteller deg
            <em> nøyaktig hvor du er</em> — retning inkludert. Hvis du kjører 10 km i en sirkel,
            er den tilbakelagte distansen 10 km, men posisjonsvektoren er null fordi du endte der
            du startet. Vektoren fanger den informasjonen skalaren mister.
          </p>
        </div>

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

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>«Jeg kan addere vektormagnituder direkte»</strong> — NEI. Hvis
              <InlineLatex latex="\vec{A}" /> har størrelse 3 og <InlineLatex latex="\vec{B}" /> har
              størrelse 4, er <InlineLatex latex="|\vec{A}+\vec{B}|" /> ikke nødvendigvis 7.
              Det er 5 bare dersom vektorene er parallelle. Dekomponér alltid til komponenter
              før du adderer.
            </li>
            <li>
              <strong>«Farten og hastigheten er det samme»</strong> — Hastighet (<InlineLatex latex="\vec{v}" />)
              er en vektor; fart (<InlineLatex latex="v = |\vec{v}|" />) er en skalar. En bil
              som kjører 80 km/t nordover og en som kjører 80 km/t sørover har samme fart men
              motsatt hastighet.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips — vektortrekanten</p>
          <ul className="space-y-1 text-sm list-disc list-inside">
            <li>Tegn alltid vektortrekanten før du regner — det avslører geometrien umiddelbart.</li>
            <li>
              Velg aksene smart: legg gjerne én akse langs bevegelsesretningen (f.eks. langs
              skråplanet), da blir én komponent null og ligningene enklere.
            </li>
            <li>Sjekk fortegn: definer positiv retning konsistent gjennom hele oppgaven.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 4–5</p>
          <p className="text-sm">
            Krafter er også vektorer (kap. 4–5). Teknikken du lærer her — dekomponere en vektor
            i <InlineLatex latex="x" />- og <InlineLatex latex="y" />-komponenter og behandle
            dem uavhengig — er <em>nøyaktig samme teknikk</em> du bruker for å analysere
            kreftene på et legeme. Newtons 2. lov gjelder komponentvis:
            <InlineLatex latex="\sum F_x = ma_x" /> og <InlineLatex latex="\sum F_y = ma_y" />.
            Mestre vektordekomposisjon her, og kap. 4–5 faller på plass.
          </p>
        </div>

        {/* SVG: Posisjons- og fartsvektor langs en 2D-bane */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 420 300" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Akser */}
            <line x1="40" y1="260" x2="400" y2="260" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="40" y2="260" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="400,260 392,256 392,264" fill="currentColor" />
            <polygon points="40,30 36,38 44,38" fill="currentColor" />
            <text x="405" y="265" className="fill-current text-xs">x</text>
            <text x="25" y="28" className="fill-current text-xs">y</text>
            <text x="30" y="270" className="fill-current text-xs">O</text>

            {/* Bane (kurve) */}
            <path d="M 80,230 Q 180,80 350,180" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeDasharray="2,3" />

            {/* Posisjonsvektor r */}
            <line x1="40" y1="260" x2="220" y2="110" stroke="#ef4444" strokeWidth="2.5" />
            <polygon points="220,110 212,112 217,119" fill="#ef4444" />
            <text x="120" y="175" className="fill-current text-xs font-semibold" fill="#ef4444">r⃗</text>

            {/* Punkt P */}
            <circle cx="220" cy="110" r="5" fill="#3b82f6" />
            <text x="228" y="105" className="fill-current text-xs">P</text>

            {/* Fartsvektor v (tangent til banen i P) */}
            <line x1="220" y1="110" x2="300" y2="85" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="300,85 292,86 295,93" fill="#10b981" />
            <text x="270" y="80" className="fill-current text-xs font-semibold" fill="#10b981">v⃗</text>

            {/* Komponenter av r: x og y */}
            <line x1="40" y1="110" x2="220" y2="110" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="220" y1="260" x2="220" y2="110" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
            <text x="130" y="103" className="fill-current text-xs" fill="#8b5cf6">x</text>
            <text x="228" y="190" className="fill-current text-xs" fill="#8b5cf6">y</text>

            <text x="210" y="290" textAnchor="middle" className="fill-current text-xs">Posisjonsvektor r⃗ og fartsvektor v⃗ (tangent til banen)</text>
          </svg>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon: Hvorfor er v⃗ tangent?</p>
          <p className="text-sm">
            Tenk på en veldig kort tidsbit <InlineLatex latex="\Delta t" />. Da er forflytningen
            <InlineLatex latex="\Delta \vec{r}" /> en <em>korde</em> som skjærer banen mellom to nærliggende
            punkter. Når <InlineLatex latex="\Delta t \to 0" />, glir korden over i tangenten i punktet.
            <InlineLatex latex="\vec{v} = d\vec{r}/dt" /> er derfor alltid tangent til banen — uansett hvor
            krumt den svinger seg.
          </p>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">Videre lesning</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.khanacademy.org/science/physics" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy — Two-dimensional motion</a></li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics — Motion in two dimensions</a></li>
            <li>• <a href="https://www.youtube.com/@3blue1brown" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">3Blue1Brown — Essence of Linear Algebra (vektorer visuelt)</a></li>
          </ul>
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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
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

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — rattet og gasspedalen</p>
          <p className="text-sm">
            I en bil kontrollerer <strong>gasspedalen</strong> den tangentielle akselerasjonen
            (<InlineLatex latex="a_\parallel" />) — den endrer <em>farten</em>. <strong>Rattet</strong>
            kontrollerer normalakselerasjonen (<InlineLatex latex="a_\perp" />) — den endrer
            <em> retningen</em> uten å endre farten. Hvis du kjører i rundkjøring med konstant
            speedometer-verdi, bruker du bare rattet: <InlineLatex latex="a_\parallel = 0" />,
            men <InlineLatex latex="a_\perp \neq 0" />. Du akselererer!
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig intuisjon</p>
          <ul className="space-y-1 text-sm">
            <li>• Konstant fart langs rett linje: <InlineLatex latex="\vec{a} = 0" /></li>
            <li>• Konstant fart langs kurve: <InlineLatex latex="\vec{a} \perp \vec{v}" /> (kun retningsendring)</li>
            <li>• Økende fart langs kurve: <InlineLatex latex="\vec{a}" /> har komponent fremover + innover</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>«Konstant fart betyr ingen akselerasjon»</strong> — NEI. Akselerasjon er
              endring i <em>hastighetsvektoren</em>, ikke i farten (skalaren). Et legeme i
              sirkulær bevegelse med konstant fart har akselerasjon fordi retningen endres
              hvert eneste øyeblikk.
            </li>
            <li>
              <strong>«Akselerasjon peker alltid fremover»</strong> — NEI. Akselerasjonen kan
              peke i hvilken som helst retning avhengig av bevegelsen. Ved bremsemanøver
              peker den bakover; i en sving peker den innover.
            </li>
          </ul>
        </div>

        {/* SVG: Baneakselerasjon vs. sentripetalakselerasjon */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 440 300" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Buet bane */}
            <path d="M 50,250 Q 220,50 400,200" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeDasharray="2,3" />

            {/* Punkt P1 — kun a_parallell (rett linje) */}
            <circle cx="100" cy="212" r="5" fill="#ef4444" />
            <text x="85" y="225" className="fill-current text-xs">P₁</text>
            {/* v tangent, a parallell */}
            <line x1="100" y1="212" x2="155" y2="158" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="155,158 147,159 150,166" fill="#10b981" />
            <text x="160" y="155" className="fill-current text-xs" fill="#10b981">v⃗</text>
            <line x1="100" y1="212" x2="130" y2="183" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="130,183 122,184 125,191" fill="#f59e0b" />
            <text x="104" y="195" className="fill-current text-xs" fill="#f59e0b">a⃗∥</text>

            {/* Punkt P2 — kun a_perpendikulær */}
            <circle cx="230" cy="80" r="5" fill="#ef4444" />
            <text x="233" y="73" className="fill-current text-xs">P₂</text>
            <line x1="230" y1="80" x2="290" y2="95" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="290,95 282,92 283,99" fill="#10b981" />
            <text x="293" y="95" className="fill-current text-xs" fill="#10b981">v⃗</text>
            <line x1="230" y1="80" x2="245" y2="135" stroke="#8b5cf6" strokeWidth="2" />
            <polygon points="245,135 239,129 247,127" fill="#8b5cf6" />
            <text x="250" y="130" className="fill-current text-xs" fill="#8b5cf6">a⃗⊥</text>

            {/* Punkt P3 — både a_parallell og a_perp */}
            <circle cx="350" cy="150" r="5" fill="#ef4444" />
            <text x="355" y="145" className="fill-current text-xs">P₃</text>
            <line x1="350" y1="150" x2="400" y2="178" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="400,178 392,177 396,184" fill="#10b981" />
            <text x="405" y="178" className="fill-current text-xs" fill="#10b981">v⃗</text>
            {/* Tangentiell (a∥) */}
            <line x1="350" y1="150" x2="380" y2="167" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="380,167 373,166 375,173" fill="#f59e0b" />
            {/* Normal (a⊥) — peker inn mot krumningssenteret */}
            <line x1="350" y1="150" x2="335" y2="190" stroke="#8b5cf6" strokeWidth="2" />
            <polygon points="335,190 332,183 340,183" fill="#8b5cf6" />
            {/* Resultant */}
            <line x1="350" y1="150" x2="365" y2="207" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3,2" />
            <text x="370" y="210" className="fill-current text-xs" fill="#ef4444">a⃗</text>

            {/* Legende */}
            <text x="60" y="275" className="fill-current text-xs" fill="#f59e0b">a⃗∥: endrer fartens størrelse</text>
            <text x="240" y="275" className="fill-current text-xs" fill="#8b5cf6">a⃗⊥: endrer fartens retning</text>
            <text x="220" y="295" textAnchor="middle" className="fill-current text-xs">Dekomposisjon av akselerasjonen langs banen</text>
          </svg>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Sammenheng: kap. 5, 9 og 10</p>
          <p className="text-sm">
            Skillet mellom baneakselerasjon (<InlineLatex latex="a_\parallel" />) og sentripetalakselerasjon
            (<InlineLatex latex="a_\perp" />) er fundamentalt for flere senere kapitler:
          </p>
          <ul className="space-y-1 text-sm mt-2 list-disc list-inside">
            <li><strong>Kap. 5:</strong> <InlineLatex latex="a_\perp" /> krever sentripetalkraft (<InlineLatex latex="F = mv^2/r" />).</li>
            <li><strong>Kap. 9:</strong> <InlineLatex latex="a_\parallel = r\alpha" /> og <InlineLatex latex="a_\perp = r\omega^2" /> ved rotasjon.</li>
            <li><strong>Kap. 10:</strong> Kraftmoment endrer <InlineLatex latex="\omega" /> (analogt til <InlineLatex latex="a_\parallel" />).</li>
          </ul>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Praktisk trick</p>
          <p className="text-sm">
            For å finne <InlineLatex latex="a_\parallel" /> og <InlineLatex latex="a_\perp" /> kan du bruke:
          </p>
          <ul className="space-y-1 text-sm mt-2">
            <li>• <InlineLatex latex="a_\parallel = \frac{\vec{a}\cdot\vec{v}}{|\vec{v}|}" /> (projeksjonen av <InlineLatex latex="\vec{a}" /> på <InlineLatex latex="\vec{v}" />)</li>
            <li>• <InlineLatex latex="a_\perp = \sqrt{|\vec{a}|^2 - a_\parallel^2}" /></li>
          </ul>
          <p className="text-sm mt-2">
            Alternativt: <InlineLatex latex="a_\parallel = \frac{d|\vec{v}|}{dt}" /> (endringsraten til
            fartens størrelse) og <InlineLatex latex="a_\perp = v^2/R" /> hvor R er den <em>øyeblikkelige
            krumningsradiusen</em>.
          </p>
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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor kan vi splitte i x og y?</p>
          <p className="text-sm">
            Tyngdekraften virker <em>utelukkende</em> i y-retningen. Den har ingen horisontal
            komponent. Newtons 2. lov gjelder uavhengig per akse:
            <InlineLatex latex="\sum F_x = ma_x" /> gir <InlineLatex latex="a_x = 0" /> (ingen
            horisontal kraft), og <InlineLatex latex="\sum F_y = -mg" /> gir
            <InlineLatex latex="a_y = -g" />. Siden de to ligningene ikke kobler x og y til
            hverandre (de deler bare tidsvariabelen <InlineLatex latex="t" />), kan vi løse dem
            helt separat. Dette er selve fundamentet for analysen.
          </p>
        </div>

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

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — ball fra et tog</p>
          <p className="text-sm">
            Tenk deg at du slipper en ball rett ned fra et tog i fart. Fra <em>togets</em> perspektiv
            faller ballen rett ned — du er i ro i forhold til toget, og det ser ut som et vanlig
            vertikalt fall. For en observatør som <em>står stille</em> på perrongen, kombineres
            togets horisontale hastighet med ballens vertikale fall: resultatet er en parabel.
            Begge observatørene er enige om at ballen lander rett under utslippspunktet
            (i togperspektivet), men den horisontale bevegelsen er usynlig for togreisende
            nettopp fordi den er <strong>uavhengig</strong> av det vertikale fallet.
          </p>
        </div>

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

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>«Tyngre gjenstander faller raskere»</strong> — NEI. Uten luftmotstand har
              alle legemer nøyaktig samme akselerasjon <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" />
              uavhengig av masse. En kula og en fjær sluppet i vakuum treffer gulvet samtidig.
              (Galileo demonstrerte dette fra Pisatårnet.)
            </li>
            <li>
              <strong>«I toppunktet er hele hastigheten null»</strong> — NEI. Bare
              <em>den vertikale</em> komponenten er null: <InlineLatex latex="v_y = 0" />.
              Den horisontale farten <InlineLatex latex="v_x = v_{0x}" /> er konstant gjennom
              hele banen — aldri null (med mindre kastet var rett opp).
            </li>
            <li>
              <strong>«Jeg kan bruke v₀ direkte i formlene»</strong> — NEI. Dekomponér alltid
              til <InlineLatex latex="v_{0x}" /> og <InlineLatex latex="v_{0y}" /> før du setter
              inn. Å blande disse er den vanligste regnefeil i prosjektiloppgaver.
            </li>
            <li>
              Glemmer å sette y₀ ≠ 0 når kastet skjer fra en høyde over bakken.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips — fremgangsmåte</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Tegn en figur. Merk av startpunkt, hastighetsvektor og vinkel.</li>
            <li>Finn <InlineLatex latex="v_{0x}" /> og <InlineLatex latex="v_{0y}" /> med cos/sin.</li>
            <li>List kjente størrelser separat for x og y — to kolonner på arket.</li>
            <li>Identifiser hvilken ukjent du søker og i hvilken retning den hører hjemme.</li>
            <li>Bruk tidsvariabelen <InlineLatex latex="t" /> som bro mellom de to retningene.</li>
            <li>Sjekk enhet og fortegn i svaret.</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 2</p>
          <p className="text-sm">
            Prosjektilbevegelse er ikke nytt stoff — det er kap. 2 brukt to ganger samtidig:
          </p>
          <ul className="space-y-1 text-sm mt-2 list-disc list-inside">
            <li>
              <strong>x-retning:</strong> kap. 2 med <InlineLatex latex="a = 0" /> — jevn
              hastighet (likformig bevegelse).
            </li>
            <li>
              <strong>y-retning:</strong> kap. 2 med <InlineLatex latex="a = -g" /> — konstant
              akselerasjon nedover (fritt fall).
            </li>
          </ul>
          <p className="text-sm mt-2">
            Alle formler fra kap. 2 (<InlineLatex latex="v = v_0 + at" />,
            <InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" />, osv.) gjelder
            uendret — bare innsatt riktig komponent og riktig akselerasjon.
          </p>
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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor peker akselerasjonen innover?</p>
          <p className="text-sm">
            Fartsvektoren er tangent til sirkelen og endrer retning hele veien. Akselerasjon er
            <em> endring</em> i hastighetsvektoren. Tenk på to tidspunkter rett etter hverandre:
            <InlineLatex latex="\vec{v}_1" /> peker litt til venstre for oppover, og
            <InlineLatex latex="\vec{v}_2" /> peker litt mer til venstre. Differansen
            <InlineLatex latex="\Delta\vec{v} = \vec{v}_2 - \vec{v}_1" /> peker <em>inn mot sentrum</em>
            av sirkelen — dette er geometrisk uunngåelig uansett hvilke to punkter du velger.
            Sentripetaakselerasjon er ikke en kraft i seg selv; det er et kinematisk resultat av
            det å bevege seg langs en sirkel.
          </p>
        </div>

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

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — bilen i svingen</p>
          <p className="text-sm">
            Når en bil tar en sving, <em>føler</em> passasjerene seg presset utover mot
            bildøren. Dette er ikke en ekte kraft — det er treghetsfølelsen du opplever fordi
            kroppen din vil fortsette rett frem (Newtons 1. lov). Den <em>reelle</em> kraften
            er friksjonskraften fra veien som dytter bilen (og deg) <strong>innover</strong> mot
            kurvesenteret. Uten den frissen ville bilen kjørt rett ut i grøften. Akselerasjonen
            er sentripetal — mot sentrum — og den kraften som forårsaker den peker samme vei.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>«Sentrifugalkraft eksisterer»</strong> — NEI (i treghetsrammer). Det
              finnes ingen utoverpekende kraft på legemet i et inertielt referansesystem. Det
              du kaller sentrifugalkraft er en <em>fiktiv kraft</em> som bare dukker opp i
              akselererende (ikke-inertielle) referansesystemer, for eksempel inne i den
              roterende bilen. I fysikkoppgaver på kap. 3–5 jobber vi alltid i inertielle
              rammer — sentrifugalkraft er forbudt.
            </li>
            <li>
              <strong>«Konstant fart betyr ingen akselerasjon»</strong> — NEI. Som forklart
              over: fartens størrelse er konstant, men <em>retningen</em> endres kontinuerlig.
              Hastighetsvektoren endrer seg, og det er definisjonen av akselerasjon.
            </li>
            <li>
              <strong>«Sentripetaakselerasjon og sentripetalkraft er det samme»</strong> — NEI.
              Akselerasjonen er kinematisk (<InlineLatex latex="a = v^2/R" />). Kraften som
              gir opphav til den er en reell kraft (friksjon, gravitasjon, normalkraft, snorspenning
              etc.) — Newtons 2. lov kobler dem: <InlineLatex latex="F = ma = mv^2/R" />.
            </li>
          </ul>
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

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 5 og kap. 9</p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Kap. 5 — Dynamikk i sirkelbevegelse:</strong> Her i kap. 3 finner vi
              akselerasjonen kinematisk (<InlineLatex latex="a = v^2/R" />). I kap. 5 bruker
              vi Newtons 2. lov til å finne hvilken <em>kraft</em> som gir opphav til denne
              akselerasjonen: <InlineLatex latex="\sum F = ma = \frac{mv^2}{R}" />. Typiske
              eksempler: snor, gravitasjon, normalkraft fra en veibane.
            </li>
            <li>
              <strong>Kap. 9 — Rotasjonsbevegelse:</strong> Sirkelbevegelse er starten på
              rotasjonskinematikk. Vinkelhastigheten <InlineLatex latex="\omega" /> og
              vinkelakselerasjonen <InlineLatex latex="\alpha" /> i kap. 9 er de rotatoriske
              analogene til <InlineLatex latex="v" /> og <InlineLatex latex="a" /> her.
              Sammenhengen er: <InlineLatex latex="v = \omega R" /> og
              <InlineLatex latex="a_\perp = \omega^2 R" />.
            </li>
          </ul>
        </div>

        {/* Inline visualizer for sirkelbevegelse */}
        <CircularMotionVisualizer />
      </TheorySummary>
    </div>
  );
}
