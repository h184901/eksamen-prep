"use client";

import React from "react";
import InlineLatex from "@/components/InlineLatex";
import FormulaBox from "@/components/FormulaBox";

export interface ExerciseContent {
  title: string;
  difficulty: "lett" | "middels" | "vanskelig";
  pageRef: string;
  problem: React.ReactNode;
  knowns: React.ReactNode;
  unknowns: React.ReactNode;
  strategy: React.ReactNode;
  hints: { label: string; content: React.ReactNode }[];
  solution: React.ReactNode;
  alternativeSolution?: React.ReactNode;
  summary: React.ReactNode;
}

// ============================================================================
// SVG-DIAGRAMMER (gjenbrukes på tvers av oppgaver)
// ============================================================================

function ArrowMarker({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill={color} />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 23.1 — Arbeid på q2 mellom to punkt
  // ==========================================================================
  "23.1": {
    title: "Arbeid gjort av elektrisk kraft mellom to punkter",
    difficulty: "lett",
    pageRef: "s. 800",
    problem: (
      <div className="space-y-2">
        <p>
          En punktladning <InlineLatex latex="q_1 = +2{,}10\;\mu\text{C}" /> holdes fast i origo.
          En andre punktladning <InlineLatex latex="q_2 = -4{,}60\;\mu\text{C}" /> flyttes fra punktet{" "}
          <InlineLatex latex="(x,y) = (0{,}150\;\text{m},\, 0)" /> til punktet{" "}
          <InlineLatex latex="(x,y) = (0{,}250\;\text{m},\, 0{,}270\;\text{m})" />.
        </p>
        <p>Hvor mye arbeid gjør den elektriske kraften på <InlineLatex latex="q_2" /> under denne forflytningen?</p>
        <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-231" color="#3b82f6" />
          {/* Akser */}
          <line x1="30" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="60" y1="30" x2="60" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <text x="375" y="215" fontSize="11" fill="currentColor" opacity="0.6">x</text>
          <text x="50" y="35" fontSize="11" fill="currentColor" opacity="0.6">y</text>
          {/* q1 i origo */}
          <circle cx="60" cy="200" r="14" fill="#ef4444" />
          <text x="60" y="205" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">+</text>
          <text x="60" y="225" textAnchor="middle" fontSize="11" fill="currentColor">q₁</text>
          {/* punkt a */}
          <circle cx="170" cy="200" r="10" fill="#3b82f6" />
          <text x="170" y="204" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">−</text>
          <text x="170" y="220" textAnchor="middle" fontSize="10" fill="currentColor">a: (0,150; 0)</text>
          {/* punkt b */}
          <circle cx="280" cy="75" r="10" fill="#3b82f6" />
          <text x="280" y="79" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">−</text>
          <text x="280" y="60" textAnchor="middle" fontSize="10" fill="currentColor">b: (0,250; 0,270)</text>
          {/* bane */}
          <line x1="170" y1="200" x2="280" y2="75" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arr-231)" />
          {/* r_a */}
          <text x="115" y="195" textAnchor="middle" fontSize="10" fill="#ef4444">r<tspan dy="3" fontSize="8">a</tspan><tspan dy="-3"> = 0,150 m</tspan></text>
          {/* r_b */}
          <line x1="60" y1="200" x2="280" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <text x="185" y="135" fontSize="10" fill="#ef4444">r<tspan dy="3" fontSize="8">b</tspan><tspan dy="-3"> ≈ 0,368 m</tspan></text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = +2{,}10\;\mu\text{C}" /> (fast i origo)</li>
        <li><InlineLatex latex="q_2 = -4{,}60\;\mu\text{C}" /> (flyttes)</li>
        <li>Startpunkt a: <InlineLatex latex="(0{,}150\;\text{m},\, 0)" /></li>
        <li>Sluttpunkt b: <InlineLatex latex="(0{,}250\;\text{m},\, 0{,}270\;\text{m})" /></li>
        <li><InlineLatex latex="k = 8{,}99 \cdot 10^{9}\;\text{N}\!\cdot\!\text{m}^2/\text{C}^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Arbeidet <InlineLatex latex="W_{a\to b}" /> utført av den elektriske kraften på <InlineLatex latex="q_2" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Den elektriske kraften mellom to punktladninger er <strong>konservativ</strong>. Arbeidet den gjør
          avhenger bare av start- og sluttpunkt, og er knyttet til endring i potensiell energi gjennom:
        </p>
        <FormulaBox latex="W_{a\to b} = U_a - U_b" variant="blue" />
        <p>
          Vi regner ut <InlineLatex latex="U_a" /> og <InlineLatex latex="U_b" /> med formelen{" "}
          <InlineLatex latex="U = kq_1q_2/r" /> og tar differansen.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Bruk <InlineLatex latex="U(r) = \dfrac{kq_1 q_2}{r}" /> og at
            arbeidet utført av elektrisk kraft er <InlineLatex latex="W = -\Delta U = U_a - U_b" />.
            Husk å ta med fortegn på begge ladninger!
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Avstanden til punkt b fra origo er <InlineLatex latex="r_b = \sqrt{(0{,}250)^2 + (0{,}270)^2}\;\text{m}" />.
            Regn ut begge potensielle energier før du tar differansen — da unngår du fortegnsrot.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Den elektriske kraften mellom to punktladninger
          er en <em>konservativ</em> kraft (akkurat som gravitasjon). Det betyr at arbeidet den gjør
          bare avhenger av start- og sluttpunkt — ikke av banen. Dette er den store fordelen med
          å introdusere potensiell energi <InlineLatex latex="U" />: vi kan svare uten å integrere
          kraft langs banen. Sammenhengen mellom arbeid og potensiell energi for en konservativ
          kraft er:
        </p>
        <FormulaBox latex="W_{a\to b} = -\Delta U = U_a - U_b" variant="blue" />
        <p>
          For to punktladninger er den elektriske potensielle energien (med <InlineLatex latex="U(\infty)=0" />):
        </p>
        <FormulaBox latex="U(r) = \dfrac{k q_1 q_2}{r}" variant="blue" />
        <p>
          <strong>Hvorfor denne formelen og ikke <InlineLatex latex="W = Fd" />?</strong>{" "}
          Coulomb-kraften er <em>ikke</em> konstant — den avtar som <InlineLatex latex="1/r^2" /> når
          avstanden øker. <InlineLatex latex="W = Fd" /> gjelder bare for konstant kraft. Med varierende
          kraft måtte vi egentlig integrert <InlineLatex latex="W = \int \vec F \cdot d\vec r" />, men
          siden kraften er konservativ har vi allerede gjort jobben én gang for alle og fått
          <InlineLatex latex="\;U(r) = kq_1q_2/r" />. Bonus: banen spiller ingen rolle — vi trenger ikke
          engang vite formen på banen fra a til b.
        </p>

        <p className="font-semibold mt-4">Steg 1: Finn avstandene fra q₁ (origo) til punkt a og b</p>
        <p>
          Siden <InlineLatex latex="q_1" /> er i origo, er <InlineLatex latex="r_a" /> bare x-koordinaten
          til punkt a, mens <InlineLatex latex="r_b" /> beregnes med Pythagoras
          (<InlineLatex latex="r = \sqrt{x^2 + y^2}" />):
        </p>
        <FormulaBox latex="r_a = 0{,}150\;\text{m}" variant="blue" />
        <FormulaBox latex="r_b = \sqrt{(0{,}250)^2 + (0{,}270)^2} = \sqrt{0{,}1354}\;\text{m} = 0{,}3680\;\text{m}" variant="blue" />
        <p>
          Merk at <InlineLatex latex="r_b > r_a" />: ladningen flyttes <em>lenger bort</em> fra
          <InlineLatex latex="\;q_1" />. Det kommer til å bety at <InlineLatex latex="|U_b| < |U_a|" /> —
          potensiell energi blir «tynnere» med større avstand.
        </p>

        <p className="font-semibold mt-4">Steg 2: Fortegnsanalyse av produktet k·q₁·q₂</p>
        <p>
          Dette er et kritisk steg — her avgjøres fortegnet på hele svaret. Vi har
          <InlineLatex latex="\;q_1 > 0" /> og <InlineLatex latex="q_2 < 0" />, så produktet{" "}
          <InlineLatex latex="q_1 q_2 < 0" />. Dette er konsistent med at ulike ladninger
          <em>tiltrekker</em> hverandre — det er «bundet» konfigurasjon der U er negativ (man må
          tilføre energi for å rive dem fra hverandre).
        </p>
        <FormulaBox
          latex="k q_1 q_2 = (8{,}99\cdot10^{9})(2{,}10\cdot10^{-6})(-4{,}60\cdot10^{-6}) = -8{,}68\cdot10^{-2}\;\text{J}\!\cdot\!\text{m}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: Regn ut U_a og U_b</p>
        <FormulaBox latex="U_a = \dfrac{k q_1 q_2}{r_a} = \dfrac{-8{,}68\cdot10^{-2}}{0{,}150} = -0{,}579\;\text{J}" variant="blue" />
        <FormulaBox latex="U_b = \dfrac{k q_1 q_2}{r_b} = \dfrac{-8{,}68\cdot10^{-2}}{0{,}3680} = -0{,}2360\;\text{J}" variant="blue" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{(N·m}^2/\text{C}^2\text{)} \cdot \text{C}^2 / \text{m} = \text{N·m} = \text{J}" />. ✓
        </p>

        <p className="font-semibold mt-4">Steg 4: Arbeidet = U_a − U_b</p>
        <p>
          Nå er vi klare til å bruke <InlineLatex latex="W = U_a - U_b" />. Begge potensialer er negative,
          men <InlineLatex latex="U_a" /> er <em>mer</em> negativ enn <InlineLatex latex="U_b" /> (fordi
          <InlineLatex latex="\;1/r_a > 1/r_b" /> og produktet er negativt):
        </p>
        <FormulaBox latex="W_{a\to b} = U_a - U_b = -0{,}579 - (-0{,}2360) = -0{,}343\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_{a\to b} = \boxed{-0{,}343\;\text{J}}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Svaret er negativt. Det gir mening:{" "}
          <InlineLatex latex="q_2" /> blir flyttet <em>mot</em> den tiltrekkende kraften
          (kraften trekker mot <InlineLatex latex="q_1" />, forflytningen går utover). Noen{" "}
          <em>annen</em> kraft (f.eks. hånd/ytre agens) må ha gjort positivt arbeid
          <InlineLatex latex="\;W_{\text{ytre}} = +0{,}343\;\text{J}" /> for å dra dem fra hverandre.
          Den elektriske kraften selv «mistet energi» til systemet — derfor øker U
          (blir mindre negativ) og <InlineLatex latex="W_E < 0" />. Størrelsesorden 0,34 J tilsvarer
          energien i ~1 sek LED-pære — ikke ubetydelig på skala av mikrocoulomb!
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Arbeidet er negativt fordi ladningene er <strong>motsatt signert</strong> (tiltrekkende) og avstanden øker —
        da øker <InlineLatex latex="U" /> (blir mindre negativ), og arbeidet utført av feltkraften blir negativt.
        Legg merke til: Man trenger <em>ikke</em> vite banen mellom a og b — bare start og slutt, fordi kraften er konservativ.
      </p>
    ),
  },

  // ==========================================================================
  // 23.5 — To ladede kuler, energibevaring
  // ==========================================================================
  "23.5": {
    title: "Ladet kule som skytes mot en annen — energibevaring",
    difficulty: "middels",
    pageRef: "s. 801",
    problem: (
      <div className="space-y-2">
        <p>
          En liten metallkule med nettoladning <InlineLatex latex="q_1 = -2{,}60\;\mu\text{C}" /> holdes stille.
          En annen metallkule med ladning <InlineLatex latex="q_2 = -7{,}50\;\mu\text{C}" /> og masse{" "}
          <InlineLatex latex="1{,}50\;\text{g}" /> skytes mot <InlineLatex latex="q_1" />. Når kulene er{" "}
          <InlineLatex latex="0{,}800\;\text{m}" /> fra hverandre har <InlineLatex latex="q_2" /> fart{" "}
          <InlineLatex latex="22{,}0\;\text{m/s}" /> mot <InlineLatex latex="q_1" />.
          Behandle kulene som punktladninger og se bort fra tyngdekraft.
        </p>
        <p>
          <strong>(a)</strong> Hva er farten til <InlineLatex latex="q_2" /> når kulene er{" "}
          <InlineLatex latex="0{,}420\;\text{m}" /> fra hverandre?<br />
          <strong>(b)</strong> Hvor nær kommer <InlineLatex latex="q_2" /> ved <InlineLatex latex="q_1" />?
        </p>
        <svg viewBox="0 0 460 140" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-235" color="#3b82f6" />
          {/* q2 */}
          <circle cx="80" cy="80" r="18" fill="#ef4444" />
          <text x="80" y="85" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">−</text>
          <text x="80" y="115" textAnchor="middle" fontSize="11" fill="currentColor">q₂</text>
          <text x="80" y="128" textAnchor="middle" fontSize="10" fill="currentColor">−7,50 μC</text>
          {/* v-pil */}
          <line x1="105" y1="60" x2="170" y2="60" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-235)" />
          <text x="137" y="50" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">v = 22,0 m/s</text>
          {/* q1 */}
          <circle cx="380" cy="80" r="16" fill="#ef4444" />
          <text x="380" y="85" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">−</text>
          <text x="380" y="115" textAnchor="middle" fontSize="11" fill="currentColor">q₁</text>
          <text x="380" y="128" textAnchor="middle" fontSize="10" fill="currentColor">−2,60 μC (fast)</text>
          {/* avstand */}
          <line x1="98" y1="80" x2="364" y2="80" stroke="currentColor" strokeDasharray="4 3" opacity="0.5" />
          <text x="230" y="76" textAnchor="middle" fontSize="11" fill="currentColor">0,800 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = -2{,}60\;\mu\text{C}" /> (fast)</li>
        <li><InlineLatex latex="q_2 = -7{,}50\;\mu\text{C}" />, <InlineLatex latex="m = 1{,}50\;\text{g} = 1{,}50\cdot10^{-3}\;\text{kg}" /></li>
        <li>Ved <InlineLatex latex="r_1 = 0{,}800\;\text{m}" />: <InlineLatex latex="v_1 = 22{,}0\;\text{m/s}" /></li>
        <li>Tyngdekraften kan ignoreres</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Farten <InlineLatex latex="v_2" /> ved <InlineLatex latex="r_2 = 0{,}420\;\text{m}" /></li>
        <li>(b) Minste avstand <InlineLatex latex="r_{\min}" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Kun den (konservative) elektrostatiske kraften virker, så <strong>mekanisk energi er bevart</strong>:
        </p>
        <FormulaBox latex="\tfrac{1}{2}mv_1^2 + U_1 = \tfrac{1}{2}mv_2^2 + U_2" variant="blue" />
        <p>
          Med <InlineLatex latex="U = kq_1 q_2/r" />. Begge ladninger er negative, så <InlineLatex latex="q_1 q_2 > 0" />
          {" "}og <InlineLatex latex="U > 0" /> (frastøtende — som en fjær!). Ved minste avstand er{" "}
          <InlineLatex latex="v = 0" />.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Sett opp energibevaring: <InlineLatex latex="\tfrac{1}{2}mv^2 + \dfrac{kq_1q_2}{r}" /> er konstant.
            Ved minste avstand: kulen har stanset et øyeblikk (snur), så <InlineLatex latex="v = 0" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Siden begge ladninger er negative, er <InlineLatex latex="q_1 q_2 = (+2{,}60)(+7{,}50)\cdot10^{-12}" />{" "}
            med positivt fortegn (frastøtende potensial). Regn først ut <InlineLatex latex="kq_1q_2" /> én gang —
            det gjenbrukes for alle <InlineLatex latex="U" />-verdier.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Når to ladninger beveger seg mot hverandre og ingen
          andre krefter virker (tyngdekraft ignorert, ikke friksjon), er den elektrostatiske kraften
          den eneste. Den er <em>konservativ</em>, så <strong>mekanisk energi er bevart</strong>:
          summen av kinetisk og potensiell energi er konstant hele tiden.
        </p>
        <FormulaBox latex="E_{\text{mek}} = \tfrac{1}{2}mv^2 + U(r) = \text{konstant}" variant="blue" />
        <p>
          For to punktladninger er <InlineLatex latex="U(r) = kq_1q_2/r" />. Med to negative ladninger
          blir <InlineLatex latex="q_1 q_2 > 0" />, og derfor er <InlineLatex latex="U > 0" /> — ladningene
          frastøter, så det er en «potensialfjær» som motarbeider bevegelsen innover (analog til å
          presse en fjær sammen).
        </p>
        <p>
          <strong>Hvorfor energibevaring og ikke Newtons 2. lov direkte?</strong> Kraften{" "}
          <InlineLatex latex="F = kq_1q_2/r^2" /> er ikke konstant (akselerasjonen endrer seg med avstanden),
          så vi kan ikke bruke <InlineLatex latex="v_2^2 = v_1^2 + 2a\Delta r" /> med et fast{" "}
          <InlineLatex latex="a" />. Energibevaring lar oss hoppe direkte fra «tilstand 1» til
          «tilstand 2» uten å holde styr på tiden eller banen imellom.
        </p>

        <p className="font-semibold mt-4">Steg 1: Beregn konstanten k·q₁·q₂</p>
        <p>
          Begge ladninger er negative, så produktet er <em>positivt</em> — systemet frastøter:
        </p>
        <FormulaBox
          latex="k q_1 q_2 = (8{,}99\cdot10^{9})(-2{,}60\cdot10^{-6})(-7{,}50\cdot10^{-6}) = +0{,}1753\;\text{J}\!\cdot\!\text{m}"
          variant="blue"
        />
        <p className="italic text-[var(--muted)]">
          Fortegnsanalyse: <InlineLatex latex="(-)(-)=(+)" />, så U blir positiv. Frastøting → U øker når r
          minker → kinetisk energi må synke når kulene nærmer seg.
        </p>

        <p className="font-semibold mt-4">Steg 2: (a) Regn ut U₁ og U₂ (ved r=0,420 m)</p>
        <FormulaBox latex="U_1 = \dfrac{0{,}1753}{0{,}800} = +0{,}2191\;\text{J}" variant="blue" />
        <FormulaBox latex="U_2 = \dfrac{0{,}1753}{0{,}420} = +0{,}4174\;\text{J}" variant="blue" />
        <p>
          Merk at <InlineLatex latex="U_2 > U_1" /> (avstanden er mindre). Derfor <em>må</em> kinetisk
          energi synke — noe annet ville brutt energibevaring.
        </p>

        <p className="font-semibold mt-4">Steg 3: Løs energibevaring for v₂</p>
        <p>
          Startformelen: <InlineLatex latex="\tfrac{1}{2}mv_1^2 + U_1 = \tfrac{1}{2}mv_2^2 + U_2" />.
          Algebraisk omforming — flytt U-leddene til høyre side av likhetstegnet:
        </p>
        <FormulaBox latex="\tfrac{1}{2}mv_2^2 = \tfrac{1}{2}mv_1^2 + U_1 - U_2" variant="blue" />
        <FormulaBox
          latex="\tfrac{1}{2}(1{,}50\cdot10^{-3})v_2^2 = \tfrac{1}{2}(1{,}50\cdot10^{-3})(22{,}0)^2 + 0{,}2191 - 0{,}4174"
          variant="blue"
        />
        <FormulaBox latex="\tfrac{1}{2}(1{,}50\cdot10^{-3})v_2^2 = 0{,}3630 - 0{,}1983 = 0{,}1647\;\text{J}" variant="blue" />
        <FormulaBox latex="v_2^2 = \dfrac{2(0{,}1647)}{1{,}50\cdot10^{-3}} = 219{,}6\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v_2 = \boxed{14{,}8\;\text{m/s}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\sqrt{\text{J/kg}} = \sqrt{\text{m}^2/\text{s}^2} = \text{m/s}" />. ✓
          Rimelighetssjekk: Farten har sunket fra 22 til 15 m/s — det er i riktig retning (kulen bremses).
        </p>

        <p className="font-semibold mt-4">Steg 4: (b) Finn minste avstand</p>
        <p>
          <strong>Hvilken betingelse definerer <InlineLatex latex="r_{\min}" />?</strong> Ved vendepunktet
          snur kulen retning — og for en brøkdel av et sekund står den stille, så{" "}
          <InlineLatex latex="v = 0" />. (Dette er nøyaktig samme prinsipp som når du kaster en ball rett
          opp: på toppen er farten null et øyeblikk før den snur.)
        </p>
        <p>
          Setter <InlineLatex latex="v = 0" /> inn i energibevaringen mellom tilstand 1 og{" "}
          <InlineLatex latex="r_{\min}" />:
        </p>
        <FormulaBox latex="\tfrac{1}{2}mv_1^2 + U_1 = 0 + \dfrac{kq_1q_2}{r_{\min}}" variant="blue" />
        <p>
          Algebraisk omforming — løs for <InlineLatex latex="r_{\min}" />:
        </p>
        <FormulaBox latex="r_{\min} = \dfrac{kq_1q_2}{\tfrac{1}{2}mv_1^2 + U_1} = \dfrac{kq_1q_2}{E_{\text{tot}}}" variant="blue" />
        <FormulaBox latex="E_{\text{tot}} = 0{,}3630 + 0{,}2191 = 0{,}5821\;\text{J}" variant="blue" />
        <FormulaBox latex="r_{\min} = \dfrac{k q_1 q_2}{E_{\text{tot}}} = \dfrac{0{,}1753}{0{,}5821}" variant="blue" />
        <FormulaBox latex="\boxed{r_{\min} = \boxed{0{,}301\;\text{m}}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Kulen kommer 0,301 m fra <InlineLatex latex="q_1" /> — mellom
          startposisjonen (0,800 m) og den tidligere målte posisjonen (0,420 m, fart 14,8 m/s). Ved
          denne avstanden er «fjæren» (den elektrostatiske frastøtingen) sterk nok til å stoppe kulen
          helt. Deretter snur den og akselererer tilbake — men det er en annen fase av problemet.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når to <strong>like signerte</strong> ladninger nærmer seg hverandre, fungerer E-feltet som en usynlig fjær:
        kinetisk energi lagres som potensiell energi. Ved «snupunktet» (vendepunktet) har all kinetisk energi blitt{" "}
        <InlineLatex latex="U" />. Energibevaring gjør at vi kan løse oppgaven uten å vite akselerasjon eller tid!
      </p>
    ),
  },

  // ==========================================================================
  // 23.6 — DNA basepar (A-T)
  // ==========================================================================
  "23.6": {
    title: "Bindingsenergi i DNA (adenin–tymin) — BIO",
    difficulty: "vanskelig",
    pageRef: "s. 801",
    problem: (
      <div className="space-y-2">
        <p>
          <strong>Energi i DNA-baseparing.</strong> Beregn den elektriske potensielle energien
          i adenin–tymin-bindingen (A–T). Bruk samme modell som i oppgave 21.18: to parallelle
          ladningskombinasjoner O—H—N og N—H—N, der hver ladning er{" "}
          <InlineLatex latex="\pm e" /> og avstanden H…N (mellom nærmeste H og motsatt molekyls N) er{" "}
          <InlineLatex latex="0{,}110\;\text{nm}" />. Totallengder er gitt i figuren (O…N = 0,280 nm og N…N = 0,300 nm).
        </p>
        <p>
          <strong>(a)</strong> Finn potensiell energi i A–T-bindingen.<br />
          <strong>(b)</strong> Sammenlign med den potensielle energien mellom proton og elektron i hydrogenatomet
          (avstand <InlineLatex latex="r_H = 0{,}0529\;\text{nm}" />).
        </p>
        <svg viewBox="0 0 520 200" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          {/* O-H-N rad */}
          <text x="20" y="55" fontSize="12" fill="currentColor" fontWeight="bold">O—H—N:</text>
          <circle cx="110" cy="50" r="12" fill="#ef4444" /><text x="110" y="54" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">−</text>
          <text x="110" y="30" textAnchor="middle" fontSize="10" fill="currentColor">O (tymin)</text>
          <circle cx="245" cy="50" r="12" fill="#3b82f6" /><text x="245" y="54" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">+</text>
          <text x="245" y="30" textAnchor="middle" fontSize="10" fill="currentColor">H</text>
          <circle cx="335" cy="50" r="12" fill="#ef4444" /><text x="335" y="54" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">−</text>
          <text x="335" y="30" textAnchor="middle" fontSize="10" fill="currentColor">N (adenin)</text>
          <line x1="120" y1="65" x2="335" y2="65" stroke="currentColor" opacity="0.4" strokeDasharray="3 2" />
          <text x="225" y="78" textAnchor="middle" fontSize="10" fill="currentColor">0,280 nm</text>
          <text x="290" y="95" textAnchor="middle" fontSize="10" fill="#ef4444">H…N = 0,110 nm</text>
          {/* N-H-N rad */}
          <text x="20" y="145" fontSize="12" fill="currentColor" fontWeight="bold">N—H—N:</text>
          <circle cx="110" cy="140" r="12" fill="#ef4444" /><text x="110" y="144" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">−</text>
          <text x="110" y="120" textAnchor="middle" fontSize="10" fill="currentColor">N (tymin)</text>
          <circle cx="223" cy="140" r="12" fill="#3b82f6" /><text x="223" y="144" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">+</text>
          <text x="223" y="120" textAnchor="middle" fontSize="10" fill="currentColor">H</text>
          <circle cx="335" cy="140" r="12" fill="#ef4444" /><text x="335" y="144" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">−</text>
          <text x="335" y="120" textAnchor="middle" fontSize="10" fill="currentColor">N (adenin)</text>
          <line x1="120" y1="155" x2="335" y2="155" stroke="currentColor" opacity="0.4" strokeDasharray="3 2" />
          <text x="225" y="170" textAnchor="middle" fontSize="10" fill="currentColor">0,300 nm</text>
          <text x="290" y="187" textAnchor="middle" fontSize="10" fill="#ef4444">H…N = 0,110 nm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Hver ladning: <InlineLatex latex="\pm e = \pm 1{,}602\cdot10^{-19}\;\text{C}" /></li>
        <li>O—H—N: total avstand 0,280 nm, H…N-bro = 0,110 nm (så O…H = 0,170 nm)</li>
        <li>N—H—N: total avstand 0,300 nm, H…N-bro = 0,110 nm (så N…H = 0,190 nm)</li>
        <li><InlineLatex latex="ke^2 = 2{,}307\cdot10^{-28}\;\text{J}\!\cdot\!\text{m} = 1{,}44\;\text{eV}\cdot\text{nm}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="U_{AT}" /> — bindingsenergi mellom A og T</li>
        <li>(b) Forholdet til hydrogenets <InlineLatex latex="U_H" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Bindingsenergien mellom A og T er summen av alle <em>krysspar</em> — dvs. alle par der den ene ladningen
          tilhører tymin og den andre adenin. Ladninger innad i samme molekyl teller ikke (de holder molekylet sammen,
          men er ikke del av A–T-interaksjonen).
        </p>
        <FormulaBox latex="U_{AT} = \sum_{i\in T,\, j\in A} \dfrac{k\,q_i q_j}{r_{ij}}" variant="blue" />
        <p>
          Tymin-ladningene: O⁻ og H⁺ (i O—H—N), samt N⁻ og H⁺ (i N—H—N).
          Adenin-ladningene: N⁻ (i begge radene).
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Bruk <InlineLatex latex="U = kq_1q_2/r" /> på hvert <em>krysspar</em> og summer.
            Det er fire bidrag totalt: to i O—H—N og to i N—H—N.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Faktoriser ut <InlineLatex latex="ke^2" />. Uttrykk alt i nm slik at faktoren{" "}
            <InlineLatex latex="ke^2 = 1{,}44\;\text{eV}\cdot\text{nm}" /> gir svaret direkte i elektronvolt!
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p className="text-sm">
            Krysspar i O—H—N: (O⁻ av T ↔ N⁻ av A, avstand 0,280 nm) og (H⁺ av T ↔ N⁻ av A, avstand 0,110 nm).
            Krysspar i N—H—N: (N⁻ av T ↔ N⁻ av A, 0,300 nm) og (H⁺ av T ↔ N⁻ av A, 0,110 nm).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Når vi har flere punktladninger er den totale
          elektrostatiske energien summen over <em>alle unike par</em>:
        </p>
        <FormulaBox latex="U_{\text{tot}} = \sum_{i<j} \dfrac{k q_i q_j}{r_{ij}}" variant="blue" />
        <p>
          Men oppgaven spør spesifikt om <em>bindingsenergien</em> mellom A og T — altså energien som
          holder de to molekylene sammen. Da skal vi bare ta med par der den ene ladningen tilhører A
          og den andre T (kryssparene). Ladninger innad i samme molekyl inngår i molekylets egen interne
          energi og kansellerer ut når vi sammenligner «sammen» vs. «uendelig adskilt».
        </p>
        <p>
          <strong>Hvorfor ikke bare bruke dipoltilnærming?</strong> Med så små avstander
          (<InlineLatex latex="r \sim 0{,}1" /> nm, sammenlignbart med ladningsavstanden innad i dipolen)
          bryter dipoltilnærmingen <InlineLatex latex="U \propto 1/r^3" /> sammen. Vi må regne hvert
          krysspar eksplisitt.
        </p>
        <p>
          <strong>Smart triks:</strong> Siden alle ladninger er <InlineLatex latex="\pm e" />, kan vi
          faktorisere ut <InlineLatex latex="ke^2" />. Bruker vi nm for avstand, gjør
          <InlineLatex latex="\;ke^2 = 1{,}44\;\text{eV}\cdot\text{nm}" /> at svaret kommer direkte i eV
          — standardenhet i atomfysikk.
        </p>

        <p className="font-semibold mt-4">Steg 1: Identifiser krysspar og fortegn</p>
        <p>
          Fortegnet på hvert bidrag bestemmes av produktet <InlineLatex latex="q_i q_j" />:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>O⁻ (tymin) … N⁻ (adenin): like fortegn → <InlineLatex latex="(-)(-)=(+)" /> → frastøting,
          <InlineLatex latex="\;+ke^2/r" /></li>
          <li>H⁺ (tymin) … N⁻ (adenin): motsatte fortegn → <InlineLatex latex="(+)(-)=(-)" /> → tiltrekking,
          <InlineLatex latex="\;-ke^2/r" /></li>
          <li>N⁻ (tymin) … N⁻ (adenin): like → <InlineLatex latex="\;+ke^2/r" /></li>
          <li>H⁺ (tymin) … N⁻ (adenin): motsatte → <InlineLatex latex="\;-ke^2/r" /></li>
        </ul>

        <p className="font-semibold mt-4">Steg 2: Sett opp summen</p>
        <p>
          For hvert krysspar er avstanden lest fra figuren. Faktoriser <InlineLatex latex="ke^2" /> ut:
        </p>
        <FormulaBox
          latex="U_{AT} = ke^2\!\left[\dfrac{1}{0{,}280\;\text{nm}} - \dfrac{1}{0{,}110\;\text{nm}} + \dfrac{1}{0{,}300\;\text{nm}} - \dfrac{1}{0{,}110\;\text{nm}}\right]"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: Beregn klammeparentesen (i nm⁻¹)</p>
        <FormulaBox latex="3{,}571 - 9{,}091 + 3{,}333 - 9{,}091 = -11{,}28\;\text{nm}^{-1}" variant="blue" />
        <p>
          Summen er <em>negativ</em> fordi tiltrekningsleddene (H⁺…N⁻, små avstander
          <InlineLatex latex="\;0{,}110" /> nm → store bidrag) dominerer over frastøtningsleddene (større
          avstander, mindre bidrag). Dette er nøkkelen til bindingen!
        </p>

        <p className="font-semibold mt-4">Steg 4: Multiplisér med ke²</p>
        <FormulaBox latex="U_{AT} = (1{,}44\;\text{eV}\!\cdot\!\text{nm})(-11{,}28\;\text{nm}^{-1}) = -16{,}2\;\text{eV}" variant="blue" />
        <FormulaBox latex="\boxed{U_{AT} = \boxed{-16{,}2\;\text{eV}} \approx -2{,}60\cdot10^{-18}\;\text{J}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="(\text{eV}\!\cdot\!\text{nm}) \cdot \text{nm}^{-1} = \text{eV}" />. ✓
        </p>

        <p className="font-semibold mt-4">Steg 5: (b) Sammenlign med hydrogen</p>
        <p>
          I hydrogenatomet er det bare <em>ett</em> par: proton (+e) og elektron (−e) på avstand{" "}
          <InlineLatex latex="r_H" />. Fortegnet: <InlineLatex latex="(+)(-)=(-)" /> → tiltrekkende →{" "}
          <InlineLatex latex="U < 0" />:
        </p>
        <FormulaBox latex="U_H = -\dfrac{ke^2}{r_H} = -\dfrac{1{,}44\;\text{eV}\!\cdot\!\text{nm}}{0{,}0529\;\text{nm}} = -27{,}2\;\text{eV}" variant="blue" />
        <FormulaBox latex="\dfrac{|U_{AT}|}{|U_H|} = \dfrac{16{,}2}{27{,}2} \approx 0{,}60" variant="blue" />
        <p>
          <strong>Fysisk tolkning:</strong> A–T-bindingen er omtrent <strong>60 %</strong> så sterk som
          proton–elektron-bindingen i hydrogen. Det er mye mindre enn en kovalent binding (~4,5 eV per
          mol H₂ → ~5 eV per binding), men fortsatt betydelig sterkere enn termisk energi ved kroppstemperatur
          (<InlineLatex latex="k_B T \approx 0{,}026" /> eV). Dette er akkurat den balansen DNA trenger:
          stabilt nok til å lagre informasjon, men svakt nok til å «unnzippes» av enzymer ved
          replikasjon. Tre hydrogenbindinger (G–C-par) gir enda sterkere feste.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        DNA holdes sammen av elektrostatiske bindinger mellom dipolladninger i basene — ikke av noen «ny» kraft.
        Hvert A–T-basepar har bindingsenergi omkring <InlineLatex latex="-16\;\text{eV}" />, mye mindre enn en
        kovalent binding, men stor nok til å holde heliksen stabil ved kroppstemperatur. Merk: Når du summerer
        krysspar, teller du IKKE bidragene innad i samme molekyl.
      </p>
    ),
  },

  // ==========================================================================
  // 23.7 — To protoner mot hverandre, max-kraft
  // ==========================================================================
  "23.7": {
    title: "To protoner mot hverandre — maksimal elektrisk kraft",
    difficulty: "middels",
    pageRef: "s. 801",
    problem: (
      <div className="space-y-2">
        <p>
          To protoner, som starter flere meter fra hverandre, sendes direkte mot hverandre med farten{" "}
          <InlineLatex latex="2{,}00\cdot10^{5}\;\text{m/s}" /> (målt relativt til jorden).
        </p>
        <p>Finn den maksimale elektriske kraften som disse protonene utøver på hverandre.</p>
        <svg viewBox="0 0 460 120" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-237a" color="#3b82f6" />
          <ArrowMarker id="arr-237b" color="#3b82f6" />
          {/* p1 */}
          <circle cx="80" cy="60" r="16" fill="#ef4444" />
          <text x="80" y="65" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">+</text>
          <text x="80" y="95" textAnchor="middle" fontSize="11" fill="currentColor">p₁</text>
          <line x1="100" y1="40" x2="160" y2="40" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-237a)" />
          <text x="130" y="30" textAnchor="middle" fontSize="10" fill="#3b82f6">v = 2,00·10⁵ m/s</text>
          {/* p2 */}
          <circle cx="380" cy="60" r="16" fill="#ef4444" />
          <text x="380" y="65" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">+</text>
          <text x="380" y="95" textAnchor="middle" fontSize="11" fill="currentColor">p₂</text>
          <line x1="360" y1="40" x2="300" y2="40" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-237b)" />
          <text x="330" y="30" textAnchor="middle" fontSize="10" fill="#3b82f6">v = 2,00·10⁵ m/s</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m_p = 1{,}673\cdot10^{-27}\;\text{kg}" />, <InlineLatex latex="q_p = +e = 1{,}602\cdot10^{-19}\;\text{C}" /></li>
        <li>Startfart hver: <InlineLatex latex="v_0 = 2{,}00\cdot10^{5}\;\text{m/s}" /></li>
        <li>Starter «flere meter fra hverandre» (praktisk uendelig avstand, <InlineLatex latex="U \approx 0" />)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Maksimal elektrisk kraft <InlineLatex latex="F_{\max}" /> de utøver på hverandre</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Kraften <InlineLatex latex="F = ke^2/r^2" /> er størst når avstanden er minst —
          altså ved <strong>vendepunktet</strong> der begge protoner står stille et øyeblikk
          (totalimpuls er null, så begge stopper samtidig ved symmetri).
        </p>
        <p>
          Finn <InlineLatex latex="r_{\min}" /> med energibevaring, og sett så inn i Coulombs lov.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            «Maksimal kraft» betyr minimal avstand. Begge protoner har samme masse og fart i motsatt retning,
            så totalimpulsen er null. Ved minste avstand må begge ha hastighet null (av symmetri + impulsbevaring).
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Energibevaring: <InlineLatex latex="2 \cdot \tfrac{1}{2}m_p v_0^2 = \dfrac{ke^2}{r_{\min}}" />.
            Så bruk <InlineLatex latex="F_{\max} = ke^2/r_{\min}^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> «Maksimal kraft» er ikke gitt direkte i oppgaven —
          vi må oversette den til et fysisk vilkår. Fra Coulombs lov (kap. 21):
        </p>
        <FormulaBox latex="F(r) = \dfrac{k e^2}{r^2}" variant="blue" />
        <p>
          Siden <InlineLatex latex="F \propto 1/r^2" /> er den <strong>maksimal når r er minimal</strong>.
          Så spørsmålet «hva er <InlineLatex latex="F_{\max}" />?» blir «hva er <InlineLatex latex="r_{\min}" />?».
        </p>
        <p>
          <strong>Hvilken betingelse definerer <InlineLatex latex="r_{\min}" />?</strong> Ved vendepunktet har
          begge protoner <em>stanset</em> et øyeblikk. Men hvorfor begge samtidig? To bevaringslover:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Impulsbevaring:</strong> Totalimpulsen er null i starten (like masser, motsatte
            hastigheter), og intern Coulomb-kraft bevarer den. Så{" "}
            <InlineLatex latex="m_p v_1 + m_p v_2 = 0" /> hele tiden → ved likhet i masser betyr dette
            at <InlineLatex latex="v_1 = -v_2" /> til enhver tid. Når <InlineLatex latex="v_1 = 0" />,
            må <InlineLatex latex="v_2 = 0" /> også.
          </li>
          <li>
            <strong>Energibevaring:</strong> Siden eneste kraft er konservativ, er mekanisk energi bevart.
            Alt vi trenger er starttilstand og slutt­tilstand:
          </li>
        </ul>
        <FormulaBox latex="\underbrace{K_1 + K_2 + U_1}_{\text{start}} = \underbrace{0 + 0 + U(r_{\min})}_{\text{vendepunkt}}" variant="blue" />
        <p>
          Med <InlineLatex latex="U(r) = ke^2/r" /> (positive ladninger → frastøting → U &gt; 0) og
          <InlineLatex latex="\;U_1 \approx 0" /> (start «flere meter unna»).
        </p>

        <p className="font-semibold mt-4">Steg 1: Total kinetisk energi ved start</p>
        <p>
          Begge protoner bidrar med <InlineLatex latex="\tfrac{1}{2}m_p v_0^2" /> hver, så total K er
          dobbelt — og med samme fart forenkles dette til <InlineLatex latex="m_p v_0^2" />:
        </p>
        <FormulaBox
          latex="K_{\text{tot}} = 2\!\cdot\!\tfrac{1}{2}m_p v_0^2 = m_p v_0^2 = (1{,}673\cdot10^{-27})(2{,}00\cdot10^{5})^2 = 6{,}69\cdot10^{-17}\;\text{J}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 2: Energibevaring → minste avstand</p>
        <p>
          Ved <InlineLatex latex="r_{\min}" /> er <InlineLatex latex="v = 0" /> for begge (fra impulsbevaring
          + symmetri); all kinetisk energi er blitt potensiell. Algebraisk omforming — løs for{" "}
          <InlineLatex latex="r_{\min}" />:
        </p>
        <FormulaBox latex="\dfrac{ke^2}{r_{\min}} = K_{\text{tot}} \;\Rightarrow\; r_{\min} = \dfrac{ke^2}{K_{\text{tot}}}" variant="blue" />
        <FormulaBox
          latex="r_{\min} = \dfrac{ke^2}{K_{\text{tot}}} = \dfrac{(8{,}99\cdot10^{9})(1{,}602\cdot10^{-19})^2}{6{,}69\cdot10^{-17}} = 3{,}45\cdot10^{-12}\;\text{m}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: Sett inn i Coulombs lov</p>
        <p>
          Nå som <InlineLatex latex="r_{\min}" /> er kjent, bruker vi Coulombs lov direkte:
        </p>
        <FormulaBox
          latex="F_{\max} = \dfrac{ke^2}{r_{\min}^2} = \dfrac{2{,}307\cdot10^{-28}}{(3{,}45\cdot10^{-12})^2} = \dfrac{2{,}307\cdot10^{-28}}{1{,}191\cdot10^{-23}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{F_{\max} = \boxed{1{,}94\cdot10^{-5}\;\text{N}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="(\text{N·m}^2/\text{C}^2) \cdot \text{C}^2 / \text{m}^2 = \text{N}" />. ✓
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> <InlineLatex latex="F_{\max} \approx 19\;\mu\text{N}" /> kan
          virke lite, men protonets masse er <InlineLatex latex="\sim 10^{-27}" /> kg, så akselerasjonen
          er <InlineLatex latex="F/m \sim 10^{22}" /> m/s² — absurd stort på makroskala. Avstanden{" "}
          <InlineLatex latex="r_{\min} \approx 3{,}5\;\text{pm}" /> er likevel tusen ganger større enn
          protonets egen radius (~1 fm) og mye større enn rekkevidden til kjernekraften. Det er kun
          Coulomb som virker — protonene «speiler tilbake» uten å fusjonere. (Fusjon krever farter
          mer enn <InlineLatex latex="10^{6}" /> m/s for å bringe dem innenfor ~1 fm.)
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Knepet: Bruk energibevaring til å finne <InlineLatex latex="r_{\min}" />, og Coulomb til å finne{" "}
        <InlineLatex latex="F_{\max}" />. Merk at både impulsbevaring og energibevaring er nødvendig —
        impulsen forteller at begge stopper samtidig, energibevaringen gir avstanden. Typisk kombinasjon
        i «to-objektproblemer» med samme masse og motsatt fart.
      </p>
    ),
  },

  // ==========================================================================
  // 23.8 — Tre ladninger i likesidet trekant
  // ==========================================================================
  "23.8": {
    title: "Tre like ladninger i likesidet trekant — total Ep",
    difficulty: "lett",
    pageRef: "s. 801",
    problem: (
      <div className="space-y-2">
        <p>
          Tre like ladninger på <InlineLatex latex="1{,}40\;\mu\text{C}" /> er plassert i hjørnene av en
          likesidet trekant med sider <InlineLatex latex="0{,}300\;\text{m}" />. Hva er den potensielle
          energien til systemet? (Ta <InlineLatex latex="U = 0" /> når ladningene er uendelig langt fra hverandre.)
        </p>
        <svg viewBox="0 0 320 260" className="w-full max-w-sm mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <polygon points="160,40 80,200 240,200" fill="none" stroke="currentColor" opacity="0.5" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="160" cy="40" r="14" fill="#ef4444" /><text x="160" y="45" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">+</text>
          <text x="160" y="25" textAnchor="middle" fontSize="11" fill="currentColor">q₁</text>
          <circle cx="80" cy="200" r="14" fill="#ef4444" /><text x="80" y="205" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">+</text>
          <text x="70" y="225" textAnchor="middle" fontSize="11" fill="currentColor">q₂</text>
          <circle cx="240" cy="200" r="14" fill="#ef4444" /><text x="240" y="205" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">+</text>
          <text x="250" y="225" textAnchor="middle" fontSize="11" fill="currentColor">q₃</text>
          <text x="105" y="125" fontSize="10" fill="currentColor" opacity="0.7">0,300 m</text>
          <text x="200" y="125" fontSize="10" fill="currentColor" opacity="0.7">0,300 m</text>
          <text x="160" y="220" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">0,300 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = q_2 = q_3 = q = +1{,}40\;\mu\text{C}" /></li>
        <li>Sidelengde: <InlineLatex latex="d = 0{,}300\;\text{m}" /></li>
        <li><InlineLatex latex="U_\infty = 0" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Total potensiell energi <InlineLatex latex="U_{\text{tot}}" /> i systemet</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Potensiell energi i et system av punktladninger er summen over <strong>alle unike par</strong>:
        </p>
        <FormulaBox latex="U_{\text{tot}} = \sum_{i<j}\dfrac{k q_i q_j}{r_{ij}}" variant="blue" />
        <p>
          Med tre ladninger er det tre par: (1,2), (1,3), (2,3). Alle par har samme avstand og samme
          ladninger, så formelen forenkles til <InlineLatex latex="U_{\text{tot}} = 3 \cdot kq^2/d" />.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Viktig: Summer bare over <em>unike par</em>, ikke alle ordnede kombinasjoner.
            For tre ladninger: 3 par, ikke 6.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Siden alle ladninger er like (samme fortegn), blir <InlineLatex latex="U > 0" /> — dette er
            den energien som kreves for å sette systemet sammen fra uendelig.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> For to punktladninger er den elektrostatiske
          potensielle energien (med <InlineLatex latex="U(\infty)=0" />):
        </p>
        <FormulaBox latex="U_{ij} = \dfrac{k q_i q_j}{r_{ij}}" variant="blue" />
        <p>
          For et system av <em>flere</em> ladninger tolker vi <InlineLatex latex="U" /> som <strong>arbeidet
          som kreves for å sette sammen konfigurasjonen</strong> fra uendelig. Første ladning koster ingenting
          (ingen andre ladninger rundt). Andre ladning påvirkes av første. Tredje påvirkes av de to første,
          osv. Resultatet er en sum over <em>alle unike par</em>:
        </p>
        <FormulaBox latex="U_{\text{tot}} = \sum_{i<j} \dfrac{k q_i q_j}{r_{ij}}" variant="blue" />
        <p>
          <strong>Hvorfor unike par, ikke alle ordnede kombinasjoner?</strong> Paret (1,2) er det samme
          som (2,1) fysisk — de representerer samme interaksjon. Hvis vi summerte både
          (1,2) og (2,1) ville vi telt hver interaksjon to ganger. For n ladninger er antall
          unike par <InlineLatex latex="\binom{n}{2} = n(n-1)/2" />. For <InlineLatex latex="n=3" />: tre par.
        </p>
        <p>
          <strong>Hvorfor ikke bare <InlineLatex latex="U = kqV" />?</strong> Det ville blande sammen
          to forskjellige ting. Potensialet <InlineLatex latex="V" /> i ett punkt er opprinnelig definert
          i fravær av ladningen vi snakker om. I et allerede sammensatt system er hver ladning del av
          feltet — å multiplisere alle ladninger med alle V-verdier og dele på 2 er faktisk ekvivalent
          med parsummen (<InlineLatex latex="U = \tfrac{1}{2}\sum_i q_i V_i" />), men her er parsummen direkte.
        </p>

        <p className="font-semibold mt-4">Steg 1: Sett opp summen</p>
        <p>
          Trekanten har 3 hjørner, altså <InlineLatex latex="\binom{3}{2} = 3" /> par: (1,2), (1,3), (2,3).
          Alle ladninger er like (<InlineLatex latex="q_1=q_2=q_3=q" />), og alle avstander er like
          (<InlineLatex latex="r_{12}=r_{13}=r_{23}=d" /> — likesidet trekant). Derfor er alle tre ledd
          identiske:
        </p>
        <FormulaBox latex="U_{\text{tot}} = \dfrac{kq_1q_2}{r_{12}} + \dfrac{kq_1q_3}{r_{13}} + \dfrac{kq_2q_3}{r_{23}} = 3\cdot\dfrac{k q^2}{d}" variant="blue" />
        <p>
          <strong>Fortegnsanalyse:</strong> Alle ladninger er positive, så
          <InlineLatex latex="\;q_i q_j > 0" /> for alle par. Det betyr <InlineLatex latex="U > 0" /> —
          det koster energi å sette sammen et system av like ladninger (de vil gjerne fra hverandre).
        </p>

        <p className="font-semibold mt-4">Steg 2: Beregn ett par</p>
        <FormulaBox
          latex="\dfrac{k q^2}{d} = \dfrac{(8{,}99\cdot10^{9})(1{,}40\cdot10^{-6})^2}{0{,}300}"
          variant="blue"
        />
        <FormulaBox
          latex="= \dfrac{(8{,}99\cdot10^{9})(1{,}96\cdot10^{-12})}{0{,}300} = \dfrac{1{,}762\cdot10^{-2}}{0{,}300} = 5{,}873\cdot10^{-2}\;\text{J}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: Multiplisér med 3 (tre par)</p>
        <FormulaBox latex="U_{\text{tot}} = 3 \cdot 5{,}873\cdot10^{-2}\;\text{J} = 0{,}1762\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{U_{\text{tot}} = \boxed{0{,}176\;\text{J}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="(\text{N·m}^2/\text{C}^2) \cdot \text{C}^2 / \text{m} = \text{N·m} = \text{J}" />. ✓
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> 0,176 J er energien som ble «puttet inn» da vi stilte de
          tre ladningene opp fra uendelig. Hvis vi slipper dem alle samtidig fra ro, vil de fly fra
          hverandre, og etter lang tid vil all <InlineLatex latex="U" /> være omgjort til kinetisk
          energi (<InlineLatex latex="K_{\text{tot}} = 0{,}176" /> J, fordelt etter impulsbevaring). Merk
          at trekantens plassering ikke påvirker U — bare avstander og ladninger betyr noe.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Energien til å samle n ladninger fra uendelig er summen over alle{" "}
        <InlineLatex latex="\binom{n}{2}" /> unike par. For tre like ladninger i likesidet trekant:
        {" "}<InlineLatex latex="U = 3kq^2/d" />. Energien er <em>positiv</em> fordi ladningene frastøter
        hverandre, og det kreves arbeid å bringe dem sammen.
      </p>
    ),
  },

  // ==========================================================================
  // 23.13 — Partikkel gjennom potensialforskjell, fart ved B
  // ==========================================================================
  "23.13": {
    title: "Fart etter å ha krysset en potensialforskjell",
    difficulty: "lett",
    pageRef: "s. 801",
    problem: (
      <div className="space-y-2">
        <p>
          En liten partikkel har ladning <InlineLatex latex="q = -5{,}70\;\mu\text{C}" /> og masse{" "}
          <InlineLatex latex="m = 2{,}70\cdot10^{-4}\;\text{kg}" />. Den beveger seg fra punkt A
          (der <InlineLatex latex="V_A = +270\;\text{V}" />) til punkt B (der <InlineLatex latex="V_B = +830\;\text{V}" />).
          Elektrisk kraft er den eneste kraften som virker. Partikkelen har fart{" "}
          <InlineLatex latex="v_A = 5{,}90\;\text{m/s}" /> ved A.
        </p>
        <p>Hva er farten ved B? Er partikkelen raskere eller tregere ved B?</p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q = -5{,}70\;\mu\text{C} = -5{,}70\cdot10^{-6}\;\text{C}" /></li>
        <li><InlineLatex latex="m = 2{,}70\cdot10^{-4}\;\text{kg}" /></li>
        <li><InlineLatex latex="V_A = +270\;\text{V}" />, <InlineLatex latex="V_B = +830\;\text{V}" /></li>
        <li><InlineLatex latex="v_A = 5{,}90\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Farten <InlineLatex latex="v_B" /> og om partikkelen øker eller reduserer fart</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Kun elektrisk (konservativ) kraft virker, så <strong>mekanisk energi er bevart</strong>. For en
          ladning i et felt skrives energien som:
        </p>
        <FormulaBox latex="\tfrac{1}{2}m v_A^2 + qV_A = \tfrac{1}{2}m v_B^2 + qV_B" variant="blue" />
        <p>
          Løs for <InlineLatex latex="v_B" />. Viktig: for <strong>negativ</strong> ladning, jo
          høyere <InlineLatex latex="V" />, desto lavere <InlineLatex latex="U = qV" /> — så kinetisk energi øker!
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Energibevaring: <InlineLatex latex="\tfrac{1}{2}m v^2 + qV = \text{konstant}" />. Merk{" "}
            <InlineLatex latex="U = qV" />, så fortegn på q må med.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Tenk først kvalitativt: partikkelen er negativ og flyttes mot høyere V. Potensiell
            energi <InlineLatex latex="qV" /> blir <em>mer negativ</em> → kinetisk energi må øke.
            Så partikkelen er raskere ved B.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Potensial <InlineLatex latex="V" /> er definert som
          potensiell energi per enhet testladning. Så for en ladning <InlineLatex latex="q" /> i et punkt
          med potensial <InlineLatex latex="V" /> er potensiell energi:
        </p>
        <FormulaBox latex="U = qV" variant="blue" />
        <p>
          Når eneste kraft er elektrisk (konservativ), er mekanisk energi bevart:
        </p>
        <FormulaBox latex="\tfrac{1}{2}m v_A^2 + qV_A = \tfrac{1}{2}m v_B^2 + qV_B" variant="blue" />
        <p>
          <strong>Hvorfor fungerer denne formelen for en partikkel som beveger seg i et felt, og ikke
          formelen <InlineLatex latex="U = kq_1q_2/r" />?</strong> Forskjellen er hva «kilden» til feltet
          er. Her er potensialet <InlineLatex latex="V" /> gitt ved hvert punkt — vi vet ikke nødvendigvis
          hvilken ladningsfordeling som produserer det, og bryr oss ikke. Partikkelens egen ladning{" "}
          <InlineLatex latex="q" /> føler feltet som et potensial-landskap. <InlineLatex latex="U = kq_1q_2/r" />{" "}
          gjelder eksplisitt for to punktladninger; <InlineLatex latex="U = qV" /> gjelder generelt for en
          ladning i et vilkårlig eksternt potensialfelt.
        </p>
        <p>
          <strong>Kvalitativ analyse før tall:</strong> Partikkelen er <em>negativ</em>
          (<InlineLatex latex="q = -5{,}70" /> μC) og flyttes mot <em>høyere</em> V (270 → 830 V). Da blir{" "}
          <InlineLatex latex="U = qV" /> <em>mer negativ</em> (både q og ΔV er negative i det relevante
          fortegnsmønsteret når man ser på <InlineLatex latex="qV_B" /> vs <InlineLatex latex="qV_A" />).
          Siden <InlineLatex latex="U" /> synker, må kinetisk energi <em>øke</em>. Altså forventer vi{" "}
          <InlineLatex latex="v_B > v_A" />. Huskeregel: negative ladninger «faller oppover» i potensialet.
        </p>

        <p className="font-semibold mt-4">Steg 1: Algebraisk omforming — løs for v_B</p>
        <p>
          Flytt kinetisk-ledd til høyre, potensial-ledd til venstre, for å få <InlineLatex latex="v_B^2" /> isolert:
        </p>
        <FormulaBox latex="\tfrac{1}{2}m v_B^2 = \tfrac{1}{2}m v_A^2 + qV_A - qV_B = \tfrac{1}{2}m v_A^2 + q(V_A - V_B)" variant="blue" />

        <p className="font-semibold mt-4">Steg 2: Regn ut hvert ledd — pass på fortegn</p>
        <FormulaBox latex="\tfrac{1}{2}m v_A^2 = \tfrac{1}{2}(2{,}70\cdot10^{-4})(5{,}90)^2 = 4{,}70\cdot10^{-3}\;\text{J}" variant="blue" />
        <p>
          For arbeidsleddet <InlineLatex latex="q(V_A - V_B)" />: q er negativ,
          <InlineLatex latex="\;V_A - V_B = -560\;\text{V}" /> (også negativ). To negative =
          positiv:
        </p>
        <FormulaBox latex="q(V_A - V_B) = (-5{,}70\cdot10^{-6})(270 - 830) = (-5{,}70\cdot10^{-6})(-560) = +3{,}19\cdot10^{-3}\;\text{J}" variant="blue" />
        <p>
          Positivt ledd → kinetisk energi øker → raskere. (Dette er akkurat hva den kvalitative analysen
          spådde.)
        </p>

        <p className="font-semibold mt-4">Steg 3: Sett sammen og løs</p>
        <FormulaBox latex="\tfrac{1}{2}m v_B^2 = 4{,}70\cdot10^{-3} + 3{,}19\cdot10^{-3} = 7{,}89\cdot10^{-3}\;\text{J}" variant="blue" />
        <FormulaBox latex="v_B^2 = \dfrac{2(7{,}89\cdot10^{-3})}{2{,}70\cdot10^{-4}} = 58{,}44\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v_B = \boxed{7{,}64\;\text{m/s}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\sqrt{\text{J/kg}} = \sqrt{\text{m}^2/\text{s}^2} = \text{m/s}" />. ✓
        </p>

        <p className="font-semibold mt-4">Steg 4: Raskere eller tregere?</p>
        <p>
          <InlineLatex latex="v_B = 7{,}64 > 5{,}90 = v_A" /> — partikkelen er <strong>raskere ved B</strong>.
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Den negative partikkelen vinner energi når den beveger seg
          mot høyere V. For en <em>positiv</em> ladning ville det vært omvendt: den ville bremset når V
          stiger, og akselerert når V synker. Huskeregelen «positive ladninger faller mot lav V, negative
          mot høy V» er direkte konsekvens av <InlineLatex latex="U = qV" />: systemet søker minimum U, og
          fortegnet på q avgjør om det betyr høy eller lav V. Farten gikk fra 5,90 til 7,64 m/s — ikke
          relativistisk, så vår klassiske beskrivelse er gyldig.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Gulregel: <strong>positive ladninger «faller» mot lavere V</strong> (taper <InlineLatex latex="U" />,
        vinner <InlineLatex latex="K" />), <strong>negative «faller» mot høyere V</strong>.
        Alltid sjekk energibevaring: <InlineLatex latex="\tfrac{1}{2}mv^2 + qV = \text{konst}" />.
        Feil her er ofte at man glemmer fortegnet på q.
      </p>
    ),
  },

  // ==========================================================================
  // 23.14 — Ladning i uniformt felt, arbeid og potensial
  // ==========================================================================
  "23.14": {
    title: "Ladning akselereres av uniformt felt — arbeid, potensial, E-felt",
    difficulty: "middels",
    pageRef: "s. 801",
    problem: (
      <div className="space-y-2">
        <p>
          En partikkel med ladning <InlineLatex latex="q = +4{,}20\;\text{nC}" /> er i et uniformt elektrisk felt
          <InlineLatex latex="\vec E" /> rettet mot venstre. Partikkelen slippes fra ro og beveger seg mot venstre.
          Etter en forflytning på <InlineLatex latex="d = 6{,}00\;\text{cm}" /> er dens kinetiske energi{" "}
          <InlineLatex latex="K = 2{,}20\cdot10^{-6}\;\text{J}" />.
        </p>
        <p>
          Finn <strong>(a)</strong> arbeidet utført av den elektriske kraften,<br />
          <strong>(b)</strong> potensialet i startpunktet relativt til sluttpunktet,<br />
          <strong>(c)</strong> størrelsen på <InlineLatex latex="\vec E" />.
        </p>
        <svg viewBox="0 0 420 130" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-2314E" color="#f59e0b" />
          <ArrowMarker id="arr-2314v" color="#3b82f6" />
          {/* felt-piler */}
          <line x1="330" y1="30" x2="100" y2="30" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arr-2314E)" />
          <line x1="330" y1="55" x2="100" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arr-2314E)" />
          <line x1="330" y1="100" x2="100" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arr-2314E)" />
          <text x="215" y="15" textAnchor="middle" fontSize="11" fill="#f59e0b" fontWeight="bold">E</text>
          {/* q start */}
          <circle cx="300" cy="75" r="12" fill="#ef4444" />
          <text x="300" y="79" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">+</text>
          <text x="300" y="120" textAnchor="middle" fontSize="10" fill="currentColor">start (ro)</text>
          {/* q slutt */}
          <circle cx="150" cy="75" r="12" fill="#10b981" />
          <text x="150" y="79" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">+</text>
          <text x="150" y="120" textAnchor="middle" fontSize="10" fill="currentColor">etter 6 cm</text>
          {/* v */}
          <line x1="290" y1="75" x2="170" y2="75" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#arr-2314v)" />
          <text x="230" y="70" textAnchor="middle" fontSize="10" fill="#3b82f6">v</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q = +4{,}20\;\text{nC} = 4{,}20\cdot10^{-9}\;\text{C}" /></li>
        <li><InlineLatex latex="d = 6{,}00\;\text{cm} = 0{,}0600\;\text{m}" /> (mot venstre)</li>
        <li><InlineLatex latex="K_0 = 0" /> (starter fra ro), <InlineLatex latex="K_f = 2{,}20\cdot10^{-6}\;\text{J}" /></li>
        <li><InlineLatex latex="\vec E" /> rettet mot venstre, uniformt</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="W_E" /> — arbeid utført av elektrisk kraft</li>
        <li>(b) <InlineLatex latex="V_{\text{start}} - V_{\text{slutt}}" /></li>
        <li>(c) <InlineLatex latex="|\vec E|" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          (a) Arbeid-energi-setningen: <InlineLatex latex="W_{\text{netto}} = \Delta K" />. Siden kun elektrisk
          kraft virker: <InlineLatex latex="W_E = K_f - K_0" />.
        </p>
        <p>
          (b) Sammenheng mellom arbeid og potensialforskjell: <InlineLatex latex="W_E = q(V_{\text{start}} - V_{\text{slutt}})" />.
        </p>
        <p>
          (c) I uniformt felt: <InlineLatex latex="V_{\text{start}} - V_{\text{slutt}} = E\cdot d" /> (siden{" "}
          forflytningen er parallell med <InlineLatex latex="\vec E" />).
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            (a) Bruk arbeid-energi-setningen. Siden eneste kraft er <InlineLatex latex="\vec F_E" />,
            er arbeidet lik endringen i kinetisk energi.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            (b) Husk definisjonen <InlineLatex latex="W_E = q(V_a - V_b)" />. Løs for potensialforskjellen.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p className="text-sm">
            (c) I uniformt felt: <InlineLatex latex="V_a - V_b = E\cdot d" /> når du beveger deg
            <em> i feltets retning</em>. Partikkelen er positiv og beveger seg mot venstre (samme
            retning som E), så den beveger seg mot lavere potensial (som er logisk!).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Denne oppgaven knytter sammen tre ideer som ofte
          behandles separat: arbeid-energi, arbeid-potensialforskjell, og potensialforskjell-felt. Vi må
          bruke alle tre i rekkefølge.
        </p>
        <p>
          <strong>Originalformler:</strong>
        </p>
        <FormulaBox latex="W_{\text{netto}} = \Delta K = K_f - K_0 \quad\text{(arbeid-energi-setningen)}" variant="blue" />
        <FormulaBox latex="W_E = q(V_a - V_b) \quad\text{(arbeid og potensial)}" variant="blue" />
        <FormulaBox latex="V_a - V_b = \int_a^b \vec E \cdot d\vec l \quad\text{(potensial fra felt)}" variant="blue" />
        <p>
          For et <em>uniformt</em> felt parallelt med forflytningen reduseres integralet til
          <InlineLatex latex="\;V_a - V_b = E\,d" />.
        </p>
        <p>
          <strong>Hvorfor kan vi bruke <InlineLatex latex="V_a - V_b = Ed" /> her?</strong> Problemet sier
          eksplisitt at feltet er <em>uniformt</em>, og forflytningen er parallell med feltet (begge mot
          venstre). I dette spesialtilfellet er integralet enkelt: konstant integrand ganger lengde. For
          et ikke-uniformt felt (som rundt en punktladning) måtte vi integrert eksplisitt — da virker
          ikke <InlineLatex latex="V/d = E" /> som snarvei (jf. oppg. 23.22).
        </p>

        <p className="font-semibold mt-4">(a) Arbeidet utført av elektrisk kraft</p>
        <p>
          Oppgaven sier at eneste kraft er den elektriske, så hele arbeid-energi-setningen handler om
          elektrisk arbeid: <InlineLatex latex="W_E = W_{\text{netto}} = \Delta K" />.
          Partikkelen starter i ro (<InlineLatex latex="K_0 = 0" />):
        </p>
        <FormulaBox latex="W_E = K_f - K_0 = 2{,}20\cdot10^{-6} - 0 = 2{,}20\cdot10^{-6}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_E = \boxed{+2{,}20\cdot10^{-6}\;\text{J}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Fortegnssjekk: <InlineLatex latex="W_E > 0" /> fordi partikkelen akselereres — kraft og
          forflytning peker i samme retning (begge mot venstre). ✓
        </p>

        <p className="font-semibold mt-4">(b) Potensialforskjell start − slutt</p>
        <p>
          Bruk <InlineLatex latex="W_E = q(V_{\text{start}} - V_{\text{slutt}})" /> og løs algebraisk for
          potensialforskjellen:
        </p>
        <FormulaBox latex="W_E = q(V_{\text{start}} - V_{\text{slutt}}) \;\Rightarrow\; V_{\text{start}} - V_{\text{slutt}} = \dfrac{W_E}{q}" variant="blue" />
        <FormulaBox latex="= \dfrac{2{,}20\cdot10^{-6}}{4{,}20\cdot10^{-9}} = 523{,}8\;\text{V}" variant="blue" />
        <FormulaBox latex="\boxed{V_{\text{start}} - V_{\text{slutt}} = \boxed{+524\;\text{V}}}" variant="gold" />
        <p>
          <strong>Fortegnsanalyse:</strong> Positiv verdi betyr at <strong>startpunktet er på høyere
          potensial</strong> — som seg bør, siden den positive partikkelen «faller» mot lavere V (akkurat
          som en ball faller mot lavere gravitasjonspotensial).
        </p>
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{J}/\text{C} = \text{V}" />. ✓
        </p>

        <p className="font-semibold mt-4">(c) Størrelsen på E-feltet</p>
        <p>
          For uniformt felt parallelt med forflytningen:
        </p>
        <FormulaBox latex="V_{\text{start}} - V_{\text{slutt}} = E\cdot d \;\Rightarrow\; |\vec E| = \dfrac{V_{\text{start}} - V_{\text{slutt}}}{d}" variant="blue" />
        <FormulaBox latex="|\vec E| = \dfrac{523{,}8\;\text{V}}{0{,}0600\;\text{m}}" variant="blue" />
        <FormulaBox latex="\boxed{|\vec E| = \boxed{8{,}73\cdot10^{3}\;\text{V/m}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{V}/\text{m}" /> er standardenheten for E-felt. ✓
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Et felt på 8,7 kV/m er moderat — tilsvarer en typisk spenning
          på 500 V over 6 cm. Tre ulike fysiske størrelser (arbeid, potensial, felt) viser seg å være
          proporsjonale i dette uniforme-felt-spesialtilfellet:
          <InlineLatex latex="\;W_E = qEd" />,
          <InlineLatex latex="\;\Delta V = Ed" />,
          <InlineLatex latex="\;F = qE" />. Å se hvordan de henger sammen er ofte halvparten av en
          eksamensoppgave!
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Tre steg som henger sammen: Arbeid-energi → arbeid–potensial → potensial–felt.
        Huskeregel: <InlineLatex latex="W = q\Delta V" /> og i uniformt felt{" "}
        <InlineLatex latex="\Delta V = -\vec E\cdot\vec d" /> (fortegnet avhenger av retning).
        Sjekk alltid kvalitativt: positive ladninger akselererer mot lavere V.
      </p>
    ),
  },

  // ==========================================================================
  // 23.15 — Arbeid i uniformt felt med ulike retninger
  // ==========================================================================
  "23.15": {
    title: "Arbeid i uniformt vertikalt felt — ulike retninger",
    difficulty: "middels",
    pageRef: "s. 802",
    problem: (
      <div className="space-y-2">
        <p>
          En ladning <InlineLatex latex="q = 30{,}0\;\text{nC}" /> plasseres i et uniformt elektrisk felt rettet
          <em> vertikalt oppover</em> med størrelse <InlineLatex latex="E = 3{,}60\cdot10^{4}\;\text{V/m}" />.
          Hva arbeid gjør den elektriske kraften når ladningen flytter seg
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-1">
          <li><InlineLatex latex="0{,}490\;\text{m}" /> mot høyre,</li>
          <li><InlineLatex latex="0{,}700\;\text{m}" /> oppover,</li>
          <li><InlineLatex latex="2{,}80\;\text{m}" /> i vinkel <InlineLatex latex="45{,}0°" /> nedover fra horisontalen?</li>
        </ol>
        <svg viewBox="0 0 380 220" className="w-full max-w-sm mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-2315E" color="#f59e0b" />
          <ArrowMarker id="arr-2315a" color="#3b82f6" />
          <ArrowMarker id="arr-2315b" color="#10b981" />
          <ArrowMarker id="arr-2315c" color="#ef4444" />
          {/* E field */}
          <line x1="40" y1="200" x2="40" y2="40" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arr-2315E)" />
          <line x1="80" y1="200" x2="80" y2="40" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arr-2315E)" />
          <text x="60" y="25" textAnchor="middle" fontSize="12" fill="#f59e0b" fontWeight="bold">E ↑</text>
          {/* q */}
          <circle cx="190" cy="140" r="12" fill="#ef4444" />
          <text x="190" y="144" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">+</text>
          {/* a: høyre */}
          <line x1="200" y1="140" x2="280" y2="140" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-2315a)" />
          <text x="240" y="135" fontSize="10" fill="#3b82f6">(a) høyre</text>
          {/* b: opp */}
          <line x1="190" y1="130" x2="190" y2="70" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arr-2315b)" />
          <text x="195" y="100" fontSize="10" fill="#10b981">(b) opp</text>
          {/* c: 45° ned */}
          <line x1="200" y1="150" x2="310" y2="205" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" markerEnd="url(#arr-2315c)" />
          <text x="250" y="200" fontSize="10" fill="#ef4444">(c) 45° ned</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q = +30{,}0\;\text{nC} = 3{,}00\cdot10^{-8}\;\text{C}" /></li>
        <li><InlineLatex latex="\vec E = 3{,}60\cdot10^{4}\;\text{V/m}" /> vertikalt oppover</li>
        <li>Tre forflytninger: 0,490 m høyre; 0,700 m opp; 2,80 m i 45° nedover</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Arbeidet <InlineLatex latex="W" /> utført av elektrisk kraft i hvert tilfelle</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Siden feltet er uniformt, er kraften <InlineLatex latex="\vec F = q\vec E" /> også konstant. Da er
          arbeidet enkelt å regne ut som skalarprodukt:
        </p>
        <FormulaBox latex="W = \vec F \cdot \vec d = qE\,d\cos\theta" variant="blue" />
        <p>
          der <InlineLatex latex="\theta" /> er vinkelen mellom <InlineLatex latex="\vec E" /> (som er vertikalt opp)
          og forflytningen <InlineLatex latex="\vec d" />.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Regn først ut <InlineLatex latex="qE = F" /> (konstant kraft oppover). Så bruk{" "}
            <InlineLatex latex="W = F\cdot \Delta y" /> hvor <InlineLatex latex="\Delta y" /> er
            den <em>vertikale</em> komponenten av forflytningen.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Horisontal forflytning gir <InlineLatex latex="W = 0" /> (kraft ⊥ forflytning).
            Forflytning nedover gir negativt arbeid (kraft oppover, forflytning ned).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Siden feltet er <em>uniformt</em>, er kraften
          <InlineLatex latex="\;\vec F = q\vec E" /> konstant både i størrelse og retning. Da er
          arbeidet gitt av det velkjente skalarproduktet:
        </p>
        <FormulaBox latex="W = \vec F \cdot \vec d = F\,d\cos\theta" variant="blue" />
        <p>
          der <InlineLatex latex="\theta" /> er vinkelen mellom <InlineLatex latex="\vec F" /> og{" "}
          <InlineLatex latex="\vec d" />. Siden feltet (og dermed kraften) er vertikal, avhenger arbeidet
          kun av den <em>vertikale</em> komponenten av forflytningen. Horisontal bevegelse i vertikalt
          felt gir null arbeid — uansett hvor langt du går sidelengs!
        </p>
        <p>
          <strong>Hvorfor trenger vi ikke integrere?</strong> I et generelt felt ville{" "}
          <InlineLatex latex="W = \int \vec F \cdot d\vec l" />. Men når <InlineLatex latex="\vec F" /> er
          konstant kan vi trekke den ut av integralet, og integralet av <InlineLatex latex="d\vec l" /> er
          bare totalforflytningen <InlineLatex latex="\vec d" />. Det er derfor <InlineLatex latex="W = F d \cos\theta" />
          fungerer her.
        </p>
        <p>
          <strong>Snarvei for vertikalt felt:</strong>{" "}
          <InlineLatex latex="W = F_y \Delta y = qE \Delta y" />, der <InlineLatex latex="\Delta y" /> er
          den vertikale komponenten av forflytningen (positiv opp, negativ ned). Denne formen er lettere
          enn å regne vinkler.
        </p>

        <p className="font-semibold mt-4">Felleskalkyle: F = qE</p>
        <FormulaBox latex="F = qE = (3{,}00\cdot10^{-8})(3{,}60\cdot10^{4}) = 1{,}08\cdot10^{-3}\;\text{N} \text{ (oppover)}" variant="blue" />
        <p>
          Positiv ladning i felt pekende opp → kraft oppover.
        </p>

        <p className="font-semibold mt-4">(a) 0,490 m mot høyre</p>
        <p>
          Kraften er vertikal, forflytningen er horisontal:{" "}
          <InlineLatex latex="\vec F \perp \vec d" /> (<InlineLatex latex="\theta=90°" />). Vertikal komponent av
          forflytningen <InlineLatex latex="\Delta y = 0" />. Derfor:
        </p>
        <FormulaBox latex="W_a = Fd\cos 90° = F\cdot\Delta y = F\cdot 0" variant="blue" />
        <FormulaBox latex="\boxed{W_a = \boxed{0}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Dette er ikke bare «null fordi regnemåten gir null» — den
          elektriske kraften har ingen påvirkning på energien når partikkelen beveger seg sidelengs,
          akkurat som tyngdekraften ikke gjør arbeid på et objekt som ruller horisontalt.
        </p>

        <p className="font-semibold mt-4">(b) 0,700 m oppover</p>
        <p>
          Forflytning og kraft peker samme vei (<InlineLatex latex="\theta=0°" />,{" "}
          <InlineLatex latex="\cos 0°=1" />). Hele forflytningen bidrar:
        </p>
        <FormulaBox latex="W_b = F\cdot d\cos 0° = Fd = (1{,}08\cdot10^{-3})(0{,}700) = 7{,}56\cdot10^{-4}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_b = \boxed{+7{,}56\cdot10^{-4}\;\text{J}}}" variant="gold" />
        <p>
          <strong>Fortegnssjekk:</strong> Positiv fordi kraft og forflytning er parallelle. Den elektriske
          kraften leverer energi til ladningen — den akselereres.
        </p>

        <p className="font-semibold mt-4">(c) 2,80 m i 45° nedover fra horisontalen</p>
        <p>
          Her er det lettest å finne den vertikale komponenten direkte. «45° nedover fra horisontalen»
          betyr at banen går ned og til siden med like stor vertikal og horisontal komponent:
        </p>
        <FormulaBox latex="\Delta y = -d\sin 45° = -2{,}80\cdot 0{,}7071 = -1{,}980\;\text{m}" variant="blue" />
        <p>
          Minus-tegnet er viktig: <InlineLatex latex="\Delta y < 0" /> fordi forflytningen har komponent
          nedover. Arbeidet blir:
        </p>
        <FormulaBox latex="W_c = F \cdot \Delta y = (1{,}08\cdot10^{-3})(-1{,}980) = -2{,}14\cdot10^{-3}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_c = \boxed{-2{,}14\cdot10^{-3}\;\text{J}}}" variant="gold" />
        <p>
          <strong>Fortegnssjekk:</strong> Negativ fordi kraft (oppover) og vertikal komponent av forflytning
          (nedover) er motsatte. Alternativ regning med <InlineLatex latex="\cos\theta" />: vinkelen mellom
          <InlineLatex latex="\vec F" /> (opp) og <InlineLatex latex="\vec d" /> (45° under horisontalen) er
          <InlineLatex latex="\;90° + 45° = 135°" />, og <InlineLatex latex="\cos 135° = -0{,}7071" />. Da:
          <InlineLatex latex="\;W = Fd\cos 135° = (1{,}08\cdot10^{-3})(2{,}80)(-0{,}7071) = -2{,}14\cdot10^{-3}\;\text{J}" />. ✓
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Ladningen bruker energi på å bevege seg «nedover mot kraften».
          Den taper kinetisk energi tilsvarende — eller sagt annerledes: dens potensielle energi
          <InlineLatex latex="\;U = qV" /> øker. Nøkkelen i hele oppgaven: i uniformt felt teller bare
          <em>komponenten</em> av forflytningen langs feltet. Pythagoras-lignende oppskrift:{" "}
          del opp forflytningen og bruk komponenter.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Nøkkelinnsikt: I et <strong>uniformt</strong> felt bryr arbeidet seg kun om den <em>komponenten</em> av
        forflytningen som ligger langs feltlinjene. Horisontal bevegelse i vertikalt felt gir nøyaktig null
        arbeid — uansett hvor langt du går! Dette er en direkte konsekvens av at{" "}
        <InlineLatex latex="\vec F\cdot\vec d = Fd\cos\theta" />.
      </p>
    ),
  },

  // ==========================================================================
  // 23.19 — Potensial i to punkt, arbeid
  // ==========================================================================
  "23.19": {
    title: "Potensial i punkter A og B fra to ladninger",
    difficulty: "middels",
    pageRef: "s. 802",
    problem: (
      <div className="space-y-2">
        <p>
          To punktladninger <InlineLatex latex="q_1 = +2{,}00\;\text{nC}" /> og{" "}
          <InlineLatex latex="q_2 = -6{,}10\;\text{nC}" /> er <InlineLatex latex="0{,}100\;\text{m}" /> fra hverandre.
          Punkt A ligger midt mellom dem; punkt B er <InlineLatex latex="0{,}080\;\text{m}" /> fra{" "}
          <InlineLatex latex="q_1" /> og <InlineLatex latex="0{,}060\;\text{m}" /> fra <InlineLatex latex="q_2" />{" "}
          (Fig. E23.19). Ta <InlineLatex latex="V = 0" /> i uendelig.
        </p>
        <p>
          Finn <strong>(a)</strong> potensialet i A; <strong>(b)</strong> potensialet i B;
          <strong>(c)</strong> arbeidet utført av E-feltet på en ladning <InlineLatex latex="3{,}00\;\text{nC}" />{" "}
          som beveger seg fra B til A.
        </p>
        <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          {/* q1 */}
          <circle cx="80" cy="180" r="14" fill="#ef4444" />
          <text x="80" y="184" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">+</text>
          <text x="80" y="210" textAnchor="middle" fontSize="11" fill="currentColor">q₁ = +2,00 nC</text>
          {/* q2 */}
          <circle cx="320" cy="180" r="14" fill="#3b82f6" />
          <text x="320" y="184" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">−</text>
          <text x="320" y="210" textAnchor="middle" fontSize="11" fill="currentColor">q₂ = −6,10 nC</text>
          {/* line connecting */}
          <line x1="95" y1="180" x2="305" y2="180" stroke="currentColor" opacity="0.3" />
          {/* A midpoint */}
          <circle cx="200" cy="180" r="6" fill="#f59e0b" />
          <text x="200" y="200" textAnchor="middle" fontSize="11" fill="#f59e0b" fontWeight="bold">A</text>
          {/* B above */}
          <circle cx="255" cy="90" r="6" fill="#10b981" />
          <text x="255" y="80" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="bold">B</text>
          {/* B to q1 */}
          <line x1="85" y1="175" x2="250" y2="90" stroke="currentColor" opacity="0.5" strokeDasharray="3 2" />
          <text x="140" y="130" fontSize="10" fill="currentColor" opacity="0.7">0,080 m</text>
          {/* B to q2 */}
          <line x1="315" y1="175" x2="260" y2="90" stroke="currentColor" opacity="0.5" strokeDasharray="3 2" />
          <text x="305" y="130" fontSize="10" fill="currentColor" opacity="0.7">0,060 m</text>
          {/* distance q1-q2 */}
          <text x="200" y="173" textAnchor="middle" fontSize="10" fill="currentColor">0,100 m</text>
          <text x="140" y="195" fontSize="10" fill="currentColor">0,050 m</text>
          <text x="235" y="195" fontSize="10" fill="currentColor">0,050 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = +2{,}00\;\text{nC}" />, <InlineLatex latex="q_2 = -6{,}10\;\text{nC}" /></li>
        <li>Avstand mellom q₁ og q₂: <InlineLatex latex="0{,}100\;\text{m}" /></li>
        <li>A: midt mellom ( <InlineLatex latex="r_{1A} = r_{2A} = 0{,}050\;\text{m}" /> )</li>
        <li>B: <InlineLatex latex="r_{1B} = 0{,}080\;\text{m}" />, <InlineLatex latex="r_{2B} = 0{,}060\;\text{m}" /></li>
        <li>Ladning som flyttes: <InlineLatex latex="q_3 = +3{,}00\;\text{nC}" />, fra B til A</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="V_A" /></li>
        <li>(b) <InlineLatex latex="V_B" /></li>
        <li>(c) <InlineLatex latex="W_{B\to A}" /> utført av E-feltet på q₃</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Potensialet fra flere punktladninger er rett og slett en <strong>skalar sum</strong>:
        </p>
        <FormulaBox latex="V = \sum_i \dfrac{k q_i}{r_i}" variant="blue" />
        <p>
          Ingen vektorer — bare tall med fortegn! Deretter brukes{" "}
          <InlineLatex latex="W_E = q_3 (V_{\text{start}} - V_{\text{slutt}})" />{" "}
          for (c).
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            (a) og (b): For hvert punkt, regn ut <InlineLatex latex="kq_1/r_1" /> og <InlineLatex latex="kq_2/r_2" />
            separat (med fortegn på ladningene!) og legg sammen.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            (c): <InlineLatex latex="W_E = q_3(V_B - V_A)" /> når ladningen går fra B til A.
            Alternativt <InlineLatex latex="W_E = -\Delta U = -q_3(V_A - V_B)" />. Dobbeltsjekk fortegnet!
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Potensialet fra en punktladning (med
          <InlineLatex latex="\;V(\infty)=0" />) er:
        </p>
        <FormulaBox latex="V(r) = \dfrac{kq}{r}" variant="blue" />
        <p>
          For flere ladninger bruker vi <em>superposisjonsprinsippet</em>: totalpotensialet i et punkt er
          summen av potensialene fra hver ladning:
        </p>
        <FormulaBox latex="V_{\text{tot}} = \sum_i \dfrac{k q_i}{r_i}" variant="blue" />
        <p>
          <strong>Hvorfor er dette mye enklere enn å summere E-felt?</strong> E-felt er vektorer — man
          må dekomponere i x- og y-komponenter og Pythagorisere summen. Potensial er en <em>skalar</em>:
          bare legg sammen tall med riktig fortegn. Dette er en av potensialets største styrker, og hvorfor
          vi ofte regner V først og utleder E etterpå.
        </p>
        <p>
          For arbeidet vi regner i (c) bruker vi sammenhengen mellom arbeid og potensialforskjell (se
          23.14):
        </p>
        <FormulaBox latex="W_E = q_3(V_{\text{start}} - V_{\text{slutt}})" variant="blue" />

        <p className="font-semibold mt-4">(a) Potensialet i A</p>
        <p>
          A ligger midt mellom <InlineLatex latex="q_1" /> og <InlineLatex latex="q_2" />, så{" "}
          <InlineLatex latex="r_{1A} = r_{2A} = 0{,}050" /> m. Begge ledd har samme nevner, så vi kan
          faktorisere:
        </p>
        <FormulaBox
          latex="V_A = \dfrac{k q_1}{0{,}050} + \dfrac{k q_2}{0{,}050} = \dfrac{k}{0{,}050}(q_1 + q_2)"
          variant="blue"
        />
        <p>
          <strong>Fortegnsanalyse:</strong> <InlineLatex latex="q_1 + q_2 = +2{,}00 - 6{,}10 = -4{,}10" /> nC.
          Sumladningen er <em>negativ</em> — dominert av <InlineLatex latex="q_2" />. Altså forventer vi{" "}
          <InlineLatex latex="V_A < 0" />:
        </p>
        <FormulaBox
          latex="= \dfrac{8{,}99\cdot10^{9}}{0{,}050}\big(2{,}00 - 6{,}10\big)\cdot10^{-9} = (1{,}798\cdot10^{11})(-4{,}10\cdot10^{-9})"
          variant="blue"
        />
        <FormulaBox latex="\boxed{V_A = \boxed{-737\;\text{V}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="(\text{N·m}^2/\text{C}^2)\cdot\text{C}/\text{m} = \text{N·m}/\text{C} = \text{J/C} = \text{V}" />. ✓
        </p>

        <p className="font-semibold mt-4">(b) Potensialet i B</p>
        <p>
          Nå har de to leddene <em>forskjellige</em> nevnere (B er ikke ekvidistant fra de to ladningene),
          så vi regner hver for seg:
        </p>
        <FormulaBox latex="V_B = \dfrac{k q_1}{0{,}080} + \dfrac{k q_2}{0{,}060}" variant="blue" />
        <FormulaBox
          latex="= \dfrac{(8{,}99\cdot10^{9})(2{,}00\cdot10^{-9})}{0{,}080} + \dfrac{(8{,}99\cdot10^{9})(-6{,}10\cdot10^{-9})}{0{,}060}"
          variant="blue"
        />
        <FormulaBox latex="= 224{,}8\;\text{V} + (-914{,}0)\;\text{V} = -689{,}2\;\text{V}" variant="blue" />
        <FormulaBox latex="\boxed{V_B = \boxed{-689\;\text{V}}}" variant="gold" />
        <p>
          Igjen negativt, men <em>mindre</em> negativt enn <InlineLatex latex="V_A" />. Det betyr
          <InlineLatex latex="\;V_B > V_A" /> (B er på «høyere» potensial enn A). Dette vil bli viktig i
          neste delspørsmål.
        </p>

        <p className="font-semibold mt-4">(c) Arbeid fra B til A</p>
        <p>
          Bruk <InlineLatex latex="W_E = q_3(V_{\text{start}} - V_{\text{slutt}})" /> der start er B og slutt
          er A:
        </p>
        <FormulaBox latex="W_E = q_3(V_B - V_A)" variant="blue" />
        <FormulaBox latex="W_E = (3{,}00\cdot10^{-9})\big(-689{,}2 - (-737{,}2)\big) = (3{,}00\cdot10^{-9})(48{,}0)" variant="blue" />
        <FormulaBox latex="\boxed{W_E = \boxed{+1{,}44\cdot10^{-7}\;\text{J}}}" variant="gold" />
        <p>
          <strong>Fortegnsanalyse:</strong> Differansen <InlineLatex latex="V_B - V_A = +48" /> V er positiv
          (B er høyere V enn A). Ladningen er positiv (<InlineLatex latex="q_3 > 0" />). Produktet blir
          positivt → feltet gjør positivt arbeid.
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Positivt arbeid betyr at feltet <em>hjalp</em> ladningen fra B
          til A — som gir mening siden den positive ladningen «faller» fra høyere V (B) til lavere V (A),
          akkurat som en ball faller fra større høyde. Bevares mekanisk energi, ville <InlineLatex latex="q_3" />
          akselerert (fått kinetisk energi <InlineLatex latex="1{,}44\cdot10^{-7}" /> J). Merk hvor mye
          enklere dette var enn å regne kraft integrert langs banen — det er potensialets vakre styrke!
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Fordelen med potensial: det er en <strong>skalar</strong>. Ingen vektorkomponenter — bare adder{" "}
        <InlineLatex latex="kq_i/r_i" /> med fortegn! Perfekt for arbeidsberegninger:{" "}
        <InlineLatex latex="W_E = q(V_a - V_b)" />. Sjekk fortegnet til slutt ved å spørre:
        «faller den positive ladningen?» → W &gt; 0.
      </p>
    ),
  },

  // ==========================================================================
  // 23.20 — Elektron akselereres og bremses
  // ==========================================================================
  "23.20": {
    title: "Potensialforskjell som akselererer/bremser et elektron",
    difficulty: "middels",
    pageRef: "s. 802",
    problem: (
      <div className="space-y-2">
        <p>
          <strong>(a)</strong> Et elektron skal akselereres fra{" "}
          <InlineLatex latex="v_i = 2{,}50\cdot10^{6}\;\text{m/s}" /> til{" "}
          <InlineLatex latex="v_f = 8{,}50\cdot10^{6}\;\text{m/s}" />. Gjennom hvilken potensialforskjell må
          elektronet passere?
        </p>
        <p>
          <strong>(b)</strong> Gjennom hvilken potensialforskjell må elektronet passere hvis det skal
          bremses fra <InlineLatex latex="8{,}50\cdot10^{6}\;\text{m/s}" /> til stillstand?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m_e = 9{,}109\cdot10^{-31}\;\text{kg}" />, <InlineLatex latex="q_e = -e = -1{,}602\cdot10^{-19}\;\text{C}" /></li>
        <li>(a) fra <InlineLatex latex="2{,}50\cdot10^{6}" /> til <InlineLatex latex="8{,}50\cdot10^{6}\;\text{m/s}" /></li>
        <li>(b) fra <InlineLatex latex="8{,}50\cdot10^{6}\;\text{m/s}" /> til 0</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Potensialforskjellen <InlineLatex latex="\Delta V = V_f - V_i" /> elektronet må passere</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Energibevaring: <InlineLatex latex="\tfrac{1}{2}mv_i^2 + qV_i = \tfrac{1}{2}mv_f^2 + qV_f" />.
        </p>
        <p>
          Løs for <InlineLatex latex="\Delta V = V_f - V_i" />:
        </p>
        <FormulaBox latex="\Delta V = \dfrac{m(v_i^2 - v_f^2)}{2q} \;=\; \dfrac{-\Delta K}{q}" variant="blue" />
        <p>
          For elektron er <InlineLatex latex="q<0" />, så fortegn bytter. Husk: negative ladninger
          akselereres når de går fra lav til <em>høy</em> V.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Arbeid-energi: <InlineLatex latex="W_E = \Delta K = -q\Delta V" />. For elektron{" "}
            <InlineLatex latex="q = -e" />, så <InlineLatex latex="\Delta K = e\Delta V" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Hvis elektronet skal speede opp, må <InlineLatex latex="\Delta K > 0" />, som betyr{" "}
            <InlineLatex latex="\Delta V > 0" /> (går mot høyere V).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Energibevaring for en ladning i et potensialfelt:
        </p>
        <FormulaBox latex="\tfrac{1}{2}mv_i^2 + qV_i = \tfrac{1}{2}mv_f^2 + qV_f" variant="blue" />
        <p>
          Algebraisk omforming gir sammenhengen mellom endring i kinetisk energi og potensialforskjell
          (<InlineLatex latex="\Delta V = V_f - V_i" />):
        </p>
        <FormulaBox latex="\Delta K = K_f - K_i = -q\,\Delta V = -q(V_f - V_i)" variant="blue" />
        <p>
          <strong>Spesialtilfellet elektron:</strong> For et elektron er <InlineLatex latex="q = -e" />,
          så <InlineLatex latex="-q = +e" />. Da blir:
        </p>
        <FormulaBox latex="\Delta K = e\,\Delta V \quad\text{(for elektron)}" variant="blue" />
        <p>
          <strong>Hvorfor det positive tegnet?</strong> Det «to minus gir pluss»-tegnet er essensen: et
          elektron taper energi når det beveger seg mot lavere V (da er <InlineLatex latex="\Delta V < 0" />, og{" "}
          <InlineLatex latex="\Delta K < 0" />), og vinner energi når det beveger seg mot høyere V. Dette
          er motsatt av en positiv ladning — en av de viktigste intuisjonene i elektrisitetslæren.
        </p>
        <p>
          <strong>Hvorfor bruker vi energibevaring og ikke F=ma?</strong> Vi vet ikke hvor lang strekning
          akselerasjonen skjer over, eller om feltet er uniformt. Energibevaring trenger bare start og
          slutt — ikke detaljer om mellomliggende tilstand.
        </p>

        <p className="font-semibold mt-4">(a) Akselerasjon fra 2,50 → 8,50 Mm/s</p>
        <p>
          Regn først ut <InlineLatex latex="\Delta K" /> (hvor mye kinetisk energi elektronet skal vinne):
        </p>
        <FormulaBox latex="\Delta K = \tfrac{1}{2}m(v_f^2 - v_i^2)" variant="blue" />
        <FormulaBox
          latex="= \tfrac{1}{2}(9{,}109\cdot10^{-31})\big[(8{,}50\cdot10^{6})^2 - (2{,}50\cdot10^{6})^2\big]"
          variant="blue"
        />
        <FormulaBox latex="= \tfrac{1}{2}(9{,}109\cdot10^{-31})(6{,}60\cdot10^{13}) = 3{,}006\cdot10^{-17}\;\text{J}" variant="blue" />
        <p>
          Positiv <InlineLatex latex="\Delta K" /> (skal jo akselereres). Nå løser vi{" "}
          <InlineLatex latex="\Delta K = e\Delta V" /> for <InlineLatex latex="\Delta V" />:
        </p>
        <FormulaBox latex="\Delta V = \dfrac{\Delta K}{e}" variant="blue" />
        <FormulaBox
          latex="= \dfrac{3{,}006\cdot10^{-17}}{1{,}602\cdot10^{-19}} \approx +188\;\text{V}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{\Delta V_{(a)} = \boxed{+188\;\text{V}}\;(\text{høyere V i sluttpunkt})}" variant="gold" />
        <p>
          <strong>Fortegnstolkning:</strong> <InlineLatex latex="\Delta V > 0" /> betyr{" "}
          <InlineLatex latex="V_f > V_i" /> — elektronet har gått fra lavere til høyere potensial. Dette er
          mønsteret «negative ladninger akselereres mot høy V». I et elektronkanon-oppsett vil lavere V
          være en katode, høyere V være en anode.
        </p>
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{J}/\text{C} = \text{V}" />. ✓
        </p>

        <p className="font-semibold mt-4">(b) Bremsing fra 8,50 Mm/s → 0</p>
        <p>
          Nå skal elektronet <em>tape</em> kinetisk energi, så{" "}
          <InlineLatex latex="\Delta K < 0" />:
        </p>
        <FormulaBox
          latex="\Delta K = \tfrac{1}{2}m(v_f^2 - v_i^2) = \tfrac{1}{2}(9{,}109\cdot10^{-31})(0 - (8{,}50\cdot10^{6})^2) = -3{,}291\cdot10^{-17}\;\text{J}"
          variant="blue"
        />
        <FormulaBox
          latex="\Delta V = \dfrac{\Delta K}{e} = \dfrac{-3{,}291\cdot10^{-17}}{1{,}602\cdot10^{-19}} \approx -206\;\text{V}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{\Delta V_{(b)} = \boxed{-206\;\text{V}}\;(\text{lavere V i sluttpunkt})}" variant="gold" />
        <p>
          <strong>Fortegnstolkning:</strong> <InlineLatex latex="\Delta V < 0" /> betyr elektronet måtte
          «klatre» til lavere V. For elektron er dette «motbakke»: potensiell energi{" "}
          <InlineLatex latex="U = qV = (-e)V" /> øker når V synker, så kinetisk energi må synke
          tilsvarende. Derfor bremses det ned.
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Legg merke til at størrelsen på ΔV er litt forskjellig i de
          to delene (188 V vs 206 V) selv om begge involverer elektronet ved 8,50 Mm/s. Det er fordi
          spranget fra <em>lav</em> fart til 8,50 Mm/s krever mindre energi enn spranget fra <em>null</em>
          til 8,50 Mm/s — fordi kinetisk energi er kvadratisk i farten. Typisk oppsett som brukes i
          CRT-rør, TV-skjermer og elektronmikroskoper: lav V akselererer, høy V bremser (eller omvendt,
          avhengig av hvilken elektrode).
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Standard «potensialforskjell-per-energi»-oppgave. Nøkkel: for elektron er{" "}
        <InlineLatex latex="\Delta K = e\Delta V" /> (pluss-tegn fordi to minus gir pluss).
        Positivt <InlineLatex latex="\Delta V" /> speeder opp elektronet (motsatt for proton!).
      </p>
    ),
  },

  // ==========================================================================
  // 23.22 — Avstand og ladning fra V og E
  // ==========================================================================
  "23.22": {
    title: "Finn avstand og ladning fra V og E ved samme punkt",
    difficulty: "lett",
    pageRef: "s. 802",
    problem: (
      <div className="space-y-2">
        <p>
          I en bestemt avstand fra en punktladning er potensialet og den elektriske feltstyrken{" "}
          <InlineLatex latex="4{,}98\;\text{V}" /> og <InlineLatex latex="16{,}2\;\text{V/m}" /> respektivt
          (med <InlineLatex latex="V=0" /> i uendelig).
        </p>
        <p>
          <strong>(a)</strong> Hva er avstanden til punktladningen?<br />
          <strong>(b)</strong> Hva er størrelsen på ladningen?<br />
          <strong>(c)</strong> Peker E-feltet mot eller vekk fra ladningen?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="V = 4{,}98\;\text{V}" /></li>
        <li><InlineLatex latex="E = 16{,}2\;\text{V/m}" /></li>
        <li>Punktladning (ikke fordelt), <InlineLatex latex="V(\infty)=0" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="r" /> — avstand til ladningen</li>
        <li>(b) <InlineLatex latex="|q|" /></li>
        <li>(c) Retningen til <InlineLatex latex="\vec E" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          For en punktladning: <InlineLatex latex="V = kq/r" /> og <InlineLatex latex="E = k|q|/r^2" />.
          Nøkkeltriks:
        </p>
        <FormulaBox latex="\dfrac{V}{E} = \dfrac{kq/r}{k|q|/r^2} = r \cdot \text{sign}(q)" variant="blue" />
        <p>
          så avstanden er <InlineLatex latex="r = V/E" /> (med tegn: her er V positivt → q positivt).
          Deretter finner du <InlineLatex latex="|q|" /> fra enten V eller E.
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Del <InlineLatex latex="V" /> på <InlineLatex latex="E" /> — da kanselleres{" "}
            <InlineLatex latex="k|q|" /> og du får avstanden direkte!
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            (c) Tegn på V: hvis <InlineLatex latex="V>0" />, er ladningen positiv (siden{" "}
            <InlineLatex latex="V=kq/r" /> og <InlineLatex latex="r>0" />). E-feltet peker{" "}
            <em>vekk fra</em> positive ladninger.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Her kommer en fristelse vi må motstå: kan vi ikke bare
          bruke <InlineLatex latex="E = V/d" /> og få <InlineLatex latex="d = V/E" /> rett ut? <strong>Nei</strong>,
          og det er verdt å forstå hvorfor:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <InlineLatex latex="E = V/d" /> gjelder KUN i et <em>uniformt</em> elektrisk felt
            (f.eks. mellom to store parallelle plater). Da er E konstant og V varierer lineært
            med posisjonen, så <InlineLatex latex="E = \Delta V/\Delta d" />.
          </li>
          <li>
            Rundt en <em>punktladning</em> er feltet <strong>ikke uniformt</strong> — det avtar som
            <InlineLatex latex="\;1/r^2" />, mens potensialet avtar som <InlineLatex latex="1/r" />.
            De to avtar i ulik takt, så forholdet <InlineLatex latex="V/E" /> er ikke konstant og
            svarer ikke til noen fast «platedistanse».
          </li>
        </ul>
        <p>
          For en punktladning er de riktige originalformlene:
        </p>
        <FormulaBox latex="V(r) = \dfrac{kq}{r},\qquad E(r) = \dfrac{k|q|}{r^2}" variant="blue" />
        <p>
          der <InlineLatex latex="k = 8{,}99\times 10^{9}\;\text{N·m}^2/\text{C}^2" />. At V har tegn (kan være
          negativt for <InlineLatex latex="q<0" />) mens E er definert med <InlineLatex latex="|q|" /> her, er
          viktig — det skal vi bruke i (c).
        </p>

        <p className="font-semibold mt-4">(a) Avstand — hvorfor V/E gir r</p>
        <p>
          Vi har to ukjente (r og q) og to ligninger. Del V på E:
        </p>
        <FormulaBox latex="\dfrac{V}{E} = \dfrac{kq/r}{k|q|/r^2} = \dfrac{q}{|q|}\cdot r" variant="blue" />
        <p>
          Legg merke til triks­et: <InlineLatex latex="k" /> kanselleres, og
          <InlineLatex latex="\;(1/r)/(1/r^2) = r" />. Faktoren <InlineLatex latex="q/|q|" /> er
          <InlineLatex latex="\;+1" /> for positiv q og <InlineLatex latex="-1" /> for negativ q — altså
          gir fortegnet på <InlineLatex latex="V/E" /> direkte ladningens fortegn. Siden V er
          <strong> positivt</strong> her, er q positiv, og dermed <InlineLatex latex="V/E = r" /> (uten
          fortegnsproblem).
        </p>
        <FormulaBox latex="r = \dfrac{V}{E} = \dfrac{4{,}98\;\text{V}}{16{,}2\;\text{V/m}}" variant="blue" />
        <FormulaBox latex="\boxed{r = \boxed{0{,}307\;\text{m}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{V}/(\text{V/m}) = \text{m}" />. ✓
        </p>

        <p className="font-semibold mt-4">(b) Ladning — velg formel og løs</p>
        <p>
          Nå som r er kjent kan vi bruke <em>enten</em> V- eller E-uttrykket. Vi velger V-ligningen (ett
          færre r å kvadrere, så mindre avrundingsfeil):
        </p>
        <FormulaBox latex="V = \dfrac{k|q|}{r}\;\Rightarrow\;|q| = \dfrac{V\,r}{k}" variant="blue" />
        <FormulaBox latex="|q| = \dfrac{(4{,}98)(0{,}307)}{8{,}99\times 10^{9}} = \dfrac{1{,}531}{8{,}99\times 10^{9}}" variant="blue" />
        <FormulaBox latex="|q| = 1{,}703\times 10^{-10}\;\text{C}" variant="blue" />
        <FormulaBox latex="\boxed{|q| = \boxed{170\;\text{pC}} \approx 0{,}170\;\text{nC}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Kryss­sjekk med E-ligningen:
          <InlineLatex latex="\;|q| = Er^2/k = (16{,}2)(0{,}307)^2/(8{,}99\times 10^{9}) \approx 1{,}70\times 10^{-10}\;\text{C}" />
          — samme verdi. ✓
        </p>

        <p className="font-semibold mt-4">(c) Retning — fra fortegnet til V</p>
        <p>
          Siden <InlineLatex latex="V = +4{,}98\;\text{V} > 0" /> og
          <InlineLatex latex="\;V = kq/r" /> med <InlineLatex latex="r>0" />, må <InlineLatex latex="q>0" />.
          Konvensjonen er at <InlineLatex latex="\vec E" /> peker i retningen en positiv testladning ville
          akselerere. Rundt en positiv ladning blir testladningen frastøtt — altså
          peker <InlineLatex latex="\vec E" /> <strong>vekk fra</strong> ladningen (radielt utover).
        </p>

        <p>
          <strong>Fysisk tolkning:</strong> 170 pC er en veldig liten ladning — tilsvarer ca.
          <InlineLatex latex="\;10^{9}" /> elementærladninger, men bare femtomol. 30 cm unna gir den likevel
          et felt på 16 V/m (omtrent som feltet under en høyspentlinje på bakkenivå). Nøkkelen i oppgaven er
          forholdet <InlineLatex latex="V/E = r" /> — en snarvei som bare virker for punktladning
          (eller eksternt felt fra sfærisk symmetrisk ladning), fordi den utnytter den spesifikke
          <InlineLatex latex="\;1/r" /> vs. <InlineLatex latex="1/r^2" />-strukturen.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Smart snarvei: <InlineLatex latex="V/E = r" /> for punktladninger. Kan brukes til å finne avstanden
        uten å vite ladningen, og omvendt til å finne ladningen uten å vite avstanden først. Bruk fortegnet
        på V til å bestemme fortegnet på q.
      </p>
    ),
  },

  // ==========================================================================
  // 23.52 — Proton og alfa, max fart og akselerasjon
  // ==========================================================================
  "23.52": {
    title: "Proton og alfapartikkel slippes fra ro — max fart og akselerasjon",
    difficulty: "vanskelig",
    pageRef: "s. 804",
    problem: (
      <div className="space-y-2">
        <p>
          Et proton og en alfapartikkel slippes fra ro når de er{" "}
          <InlineLatex latex="0{,}225\;\text{nm}" /> fra hverandre. Alfapartikkelen (heliumkjerne) har
          i praksis fire ganger massen og to ganger ladningen til et proton.
        </p>
        <p>
          Finn maksimal fart og maksimal akselerasjon for hver av disse partiklene.
          Når opptrer maksima: like etter utslipp eller etter lang tid?
        </p>
        <svg viewBox="0 0 460 130" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-2352p" color="#3b82f6" />
          <ArrowMarker id="arr-2352a" color="#3b82f6" />
          {/* proton */}
          <circle cx="80" cy="65" r="12" fill="#ef4444" />
          <text x="80" y="69" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">+</text>
          <text x="80" y="100" textAnchor="middle" fontSize="10" fill="currentColor">proton (m, +e)</text>
          {/* v_p */}
          <line x1="68" y1="45" x2="10" y2="45" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-2352p)" />
          <text x="40" y="35" textAnchor="middle" fontSize="10" fill="#3b82f6">v<tspan dy="3" fontSize="8">p</tspan></text>
          {/* alpha */}
          <circle cx="380" cy="65" r="16" fill="#ef4444" />
          <text x="380" y="69" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">+</text>
          <text x="380" y="100" textAnchor="middle" fontSize="10" fill="currentColor">alfa (4m, +2e)</text>
          {/* v_alpha */}
          <line x1="395" y1="45" x2="450" y2="45" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-2352a)" />
          <text x="420" y="35" textAnchor="middle" fontSize="10" fill="#3b82f6">v_α</text>
          <line x1="95" y1="65" x2="364" y2="65" stroke="currentColor" opacity="0.3" strokeDasharray="3 2" />
          <text x="230" y="60" textAnchor="middle" fontSize="10" fill="currentColor">0,225 nm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Proton: <InlineLatex latex="m_p = 1{,}673\cdot10^{-27}\;\text{kg}" />, <InlineLatex latex="q_p = +e" /></li>
        <li>Alfa: <InlineLatex latex="m_\alpha = 4 m_p = 6{,}69\cdot10^{-27}\;\text{kg}" />, <InlineLatex latex="q_\alpha = +2e" /></li>
        <li>Startavstand <InlineLatex latex="r_0 = 0{,}225\;\text{nm} = 2{,}25\cdot10^{-10}\;\text{m}" /></li>
        <li>Begge starter fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Maksimal fart <InlineLatex latex="v_p^{\max}" /> og <InlineLatex latex="v_\alpha^{\max}" /></li>
        <li>Maksimal akselerasjon <InlineLatex latex="a_p^{\max}" /> og <InlineLatex latex="a_\alpha^{\max}" /></li>
        <li>Når maksima inntreffer</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          To konserveringslover er sentrale:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Impuls</strong>: <InlineLatex latex="0 = m_p v_p - m_\alpha v_\alpha \Rightarrow v_p = 4 v_\alpha" /></li>
          <li><strong>Energi</strong>: <InlineLatex latex="U_0 = K_p + K_\alpha" /> (når <InlineLatex latex="r\to\infty" />)</li>
        </ul>
        <p>
          Maksimal fart nåes ved <InlineLatex latex="r\to\infty" /> (all U blir K). Maksimal akselerasjon
          er ved t=0 (kraft størst når r er minst).
        </p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Totalimpuls er 0 (startet fra ro). Fortegn: proton og alfa beveger seg i motsatt retning.
            <InlineLatex latex="m_p v_p = m_\alpha v_\alpha \Rightarrow v_p = 4v_\alpha" /> (fordi{" "}
            <InlineLatex latex="m_\alpha = 4m_p" />).
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Sett <InlineLatex latex="v_p = 4v_\alpha" /> inn i energibevaring:{" "}
            <InlineLatex latex="\tfrac{1}{2}m_p(4v_\alpha)^2 + \tfrac{1}{2}(4m_p)v_\alpha^2 = U_0" />.
            Det gir <InlineLatex latex="10 m_p v_\alpha^2 = U_0" />.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p className="text-sm">
            Maksimal akselerasjon: Newtons 2. lov med Coulombs kraft ved startavstand:{" "}
            <InlineLatex latex="a = F/m = k\,q_p q_\alpha / (m\,r_0^2)" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Kort teoretisk bakgrunn:</strong> Dette er et to-partikkel-problem med to bevaringslover
          i spill samtidig. Systemet er isolert (ingen ytre krefter), så både <em>impuls</em> og
          <em> energi</em> bevares. Coulomb-kraften er konservativ, og ladningene har samme fortegn
          (frastøter hverandre).
        </p>
        <p>
          <strong>Impulsbevaring:</strong> Totalimpulsen er null i starten (begge i ro). Ingen ytre krefter
          → totalimpulsen forblir null hele tiden:
        </p>
        <FormulaBox latex="m_p \vec v_p + m_\alpha \vec v_\alpha = 0 \;\Rightarrow\; m_p v_p = m_\alpha v_\alpha" variant="blue" />
        <p>
          Med <InlineLatex latex="m_\alpha = 4m_p" /> får vi{" "}
          <InlineLatex latex="v_p = 4 v_\alpha" /> (protonet beveger seg 4× raskere fordi det har 1/4 av
          massen).
        </p>
        <p>
          <strong>Energibevaring:</strong>
        </p>
        <FormulaBox latex="K_i + U_i = K_f + U_f" variant="blue" />
        <p>
          Med <InlineLatex latex="K_i = 0" /> (fra ro) og{" "}
          <InlineLatex latex="U = kq_p q_\alpha/r" />:
        </p>
        <FormulaBox latex="0 + \dfrac{kq_p q_\alpha}{r_0} = \tfrac{1}{2}m_p v_p^2 + \tfrac{1}{2}m_\alpha v_\alpha^2 + \dfrac{kq_p q_\alpha}{r}" variant="blue" />
        <p>
          <strong>Når er fart maksimal? Når er akselerasjon maksimal?</strong> To forskjellige spørsmål,
          to forskjellige svar:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Maks fart:</strong> Akselerasjonen <InlineLatex latex="a = F/m = kq_pq_\alpha/(mr^2)" />{" "}
            er alltid i retning «mot partenariat-partikkelen» — dvs. i bevegelsesretningen. Partikkelene
            bremses aldri opp — de fortsetter å akselerere så lenge de føler kraften. Men kraften minker
            med <InlineLatex latex="1/r^2" />, så ved <InlineLatex latex="r\to\infty" /> har de all
            potensiell energi blitt kinetisk og farten stabiliseres. Altså: <InlineLatex latex="v_{\max}" />
            nåes ved <InlineLatex latex="r = \infty" />.
          </li>
          <li>
            <strong>Maks akselerasjon:</strong> Siden <InlineLatex latex="F \propto 1/r^2" /> er kraften
            størst når r er minst — dvs. <em>ved start</em> (<InlineLatex latex="r = r_0" />).
          </li>
        </ul>

        <p className="font-semibold mt-4">Steg 1: Startenergi U₀</p>
        <p>
          Med <InlineLatex latex="q_p = +e" /> og <InlineLatex latex="q_\alpha = +2e" />, begge positive:
        </p>
        <FormulaBox
          latex="U_0 = \dfrac{k q_p q_\alpha}{r_0} = \dfrac{k(e)(2e)}{r_0} = \dfrac{2ke^2}{r_0}"
          variant="blue"
        />
        <FormulaBox
          latex="= \dfrac{2(8{,}99\cdot10^{9})(1{,}602\cdot10^{-19})^2}{2{,}25\cdot10^{-10}} = 2{,}051\cdot10^{-18}\;\text{J}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 2: Impulsbevaring</p>
        <FormulaBox latex="m_p v_p = m_\alpha v_\alpha \;\Rightarrow\; v_p = \dfrac{m_\alpha}{m_p} v_\alpha = 4 v_\alpha" variant="blue" />

        <p className="font-semibold mt-4">Steg 3: Energibevaring (r → ∞)</p>
        <p>
          Ved <InlineLatex latex="r\to\infty" /> er <InlineLatex latex="U \to 0" />, så all U₀ har blitt K:
        </p>
        <FormulaBox latex="U_0 = \tfrac{1}{2}m_p v_p^2 + \tfrac{1}{2}m_\alpha v_\alpha^2" variant="blue" />
        <p>
          Substituer <InlineLatex latex="v_p = 4v_\alpha" /> og <InlineLatex latex="m_\alpha = 4m_p" />:
        </p>
        <FormulaBox latex="\tfrac{1}{2}m_p(4v_\alpha)^2 + \tfrac{1}{2}(4m_p)v_\alpha^2 = U_0" variant="blue" />
        <FormulaBox latex="8 m_p v_\alpha^2 + 2 m_p v_\alpha^2 = 10 m_p v_\alpha^2 = U_0" variant="blue" />
        <p>
          Løs for <InlineLatex latex="v_\alpha" />:
        </p>
        <FormulaBox
          latex="v_\alpha^{\max} = \sqrt{\dfrac{U_0}{10 m_p}} = \sqrt{\dfrac{2{,}051\cdot10^{-18}}{10(1{,}673\cdot10^{-27})}} = \sqrt{1{,}226\cdot10^{8}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{v_\alpha^{\max} = \boxed{1{,}11\cdot10^{4}\;\text{m/s}}}" variant="gold" />
        <FormulaBox latex="\boxed{v_p^{\max} = 4 v_\alpha^{\max} = \boxed{4{,}43\cdot10^{4}\;\text{m/s}}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Kryss­sjekk: <InlineLatex latex="K_p + K_\alpha = \tfrac{1}{2}m_p(4{,}43\cdot10^4)^2 + \tfrac{1}{2}(4m_p)(1{,}11\cdot10^4)^2 \approx 2{,}05\cdot10^{-18}" /> J,
          samsvarer med U₀. ✓
        </p>

        <p className="font-semibold mt-4">Steg 4: Maksimal akselerasjon (ved t=0)</p>
        <p>
          Bruk Coulombs lov for kraften ved startavstanden <InlineLatex latex="r_0" />:
        </p>
        <FormulaBox
          latex="F_0 = \dfrac{k q_p q_\alpha}{r_0^2} = \dfrac{2ke^2}{r_0^2} = \dfrac{2(8{,}99\cdot10^9)(1{,}602\cdot10^{-19})^2}{(2{,}25\cdot10^{-10})^2}"
          variant="blue"
        />
        <FormulaBox latex="= 9{,}11\cdot10^{-9}\;\text{N}" variant="blue" />
        <p>
          Samme kraft virker på begge (Newtons 3. lov), men de har ulik masse, så akselerasjonene
          <InlineLatex latex="\;a = F/m" /> er forskjellige:
        </p>
        <FormulaBox
          latex="a_p^{\max} = \dfrac{F_0}{m_p} = \dfrac{9{,}11\cdot10^{-9}}{1{,}673\cdot10^{-27}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{a_p^{\max} = \boxed{5{,}45\cdot10^{18}\;\text{m/s}^2}}" variant="gold" />
        <FormulaBox
          latex="a_\alpha^{\max} = \dfrac{F_0}{m_\alpha} = \dfrac{9{,}11\cdot10^{-9}}{6{,}69\cdot10^{-27}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{a_\alpha^{\max} = \boxed{1{,}36\cdot10^{18}\;\text{m/s}^2}}" variant="gold" />
        <p>
          Forholdet: <InlineLatex latex="a_p/a_\alpha = m_\alpha/m_p = 4" />. Lettere partikkel får
          større akselerasjon ved samme kraft — nøyaktig som forventet.
        </p>

        <p className="font-semibold mt-4">Steg 5: Når?</p>
        <p>
          <strong>Max fart:</strong> etter lang tid (når <InlineLatex latex="r\to\infty" />, all U→K).
          <br />
          <strong>Max akselerasjon:</strong> like etter utslipp (når r er minst og kraften er størst).
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Partikkelene starter i ro, men med potensiell energi lagret i
          Coulomb-feltet. Denne energien omdannes gradvis til kinetisk mens de flyr fra hverandre. Kraften
          avtar med avstanden (<InlineLatex latex="1/r^2" />), så akselerasjonen synker hele tiden — men
          farten fortsetter likevel å øke (bare saktere og saktere) mot asymptotiske verdier ved uendelig.
          Akselerasjonen <InlineLatex latex="\sim 10^{18}" /> m/s² er vanvittig, men kraften er bare
          <InlineLatex latex="\sim 10^{-8}" /> N — igjen typisk: enorme akselerasjoner på mikroskopiske
          partikler fordi massen er ubetydelig.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Klassisk «to-partikkel frastøtning fra ro»: impulsbevaring kobler hastighetene
        (<InlineLatex latex="v_p/v_\alpha = m_\alpha/m_p" />), energibevaring gir størrelsen.
        Maks <em>kraft</em> er ved start (minste r), maks <em>fart</em> ved uendelig (all U→K).
        To separate grenseverdier — ikke bland dem!
      </p>
    ),
  },

  // ==========================================================================
  // 23.57 — Ionisk krystall (NaCl-celle)
  // ==========================================================================
  "23.57": {
    title: "Potensiell energi i ionisk krystall (NaCl-celle)",
    difficulty: "vanskelig",
    pageRef: "s. 804",
    problem: (
      <div className="space-y-2">
        <p>
          Figur P23.57 viser åtte punktladninger plassert i hjørnene av en kube med sider{" "}
          <InlineLatex latex="d" />. Ladningene er <InlineLatex latex="+q" /> og <InlineLatex latex="-q" />{" "}
          som vist (alternerende, som i NaCl-krystallen der Na⁺ og Cl⁻ sitter vekselvis).
        </p>
        <p>
          <strong>(a)</strong> Beregn den potensielle energien <InlineLatex latex="U" /> av arrangementet.{" "}
          (Ta <InlineLatex latex="U=0" /> når ladningene er uendelig langt fra hverandre.)<br />
          <strong>(b)</strong> Du skulle ha funnet at <InlineLatex latex="U < 0" />. Forklar sammenhengen
          mellom dette og at slike ioniske krystaller eksisterer i naturen.
        </p>
        <svg viewBox="0 0 320 300" className="w-full max-w-sm mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          {/* kube */}
          <polygon points="60,220 60,90 180,60 180,190" fill="none" stroke="currentColor" opacity="0.4" strokeWidth="1" />
          <polygon points="180,60 180,190 300,160 300,30" fill="none" stroke="currentColor" opacity="0.4" strokeWidth="1" />
          <polygon points="60,220 180,190 300,160" fill="none" stroke="currentColor" opacity="0.4" strokeWidth="1" />
          <line x1="60" y1="90" x2="180" y2="60" stroke="currentColor" opacity="0.4" />
          <line x1="180" y1="60" x2="300" y2="30" stroke="currentColor" opacity="0.4" />
          <line x1="60" y1="90" x2="300" y2="30" stroke="currentColor" opacity="0.4" strokeDasharray="2 2" />
          {/* 8 punkter, alternerende */}
          <circle cx="60" cy="220" r="10" fill="#ef4444" /><text x="60" y="224" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">+</text>
          <circle cx="60" cy="90" r="10" fill="#3b82f6" /><text x="60" y="94" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">−</text>
          <circle cx="180" cy="60" r="10" fill="#ef4444" /><text x="180" y="64" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">+</text>
          <circle cx="180" cy="190" r="10" fill="#3b82f6" /><text x="180" y="194" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">−</text>
          <circle cx="300" cy="30" r="10" fill="#3b82f6" /><text x="300" y="34" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">−</text>
          <circle cx="300" cy="160" r="10" fill="#ef4444" /><text x="300" y="164" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">+</text>
          <line x1="60" y1="220" x2="180" y2="190" stroke="currentColor" opacity="0.4" />
          <line x1="180" y1="190" x2="300" y2="160" stroke="currentColor" opacity="0.4" />
          {/* side-merking */}
          <text x="105" y="160" fontSize="10" fill="currentColor" opacity="0.7">d</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>8 ladninger <InlineLatex latex="\pm q" /> i hjørnene av en kube</li>
        <li>Sidelengde: <InlineLatex latex="d" /></li>
        <li>Ladningene alternerer slik at hvert hjørne sin nærmeste nabo har motsatt tegn</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="U" /> — samlet potensiell energi</li>
        <li>(b) Tolkning: hvorfor er <InlineLatex latex="U<0" /> forenlig med at krystallen eksisterer?</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Vi må summere over alle unike par av hjørner. En kube har{" "}
          <InlineLatex latex="\binom{8}{2} = 28" /> par, som grupperes etter avstand:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>12 kanter</strong> (avstand <InlineLatex latex="d" />): motsatt fortegn → bidrar negativt</li>
          <li><strong>12 flatediagonaler</strong> (<InlineLatex latex="d\sqrt{2}" />): samme fortegn → bidrar positivt</li>
          <li><strong>4 romdiagonaler</strong> (<InlineLatex latex="d\sqrt{3}" />): motsatt fortegn → bidrar negativt</li>
        </ul>
        <FormulaBox
          latex="U = \dfrac{kq^2}{d}\left[-12 + \dfrac{12}{\sqrt{2}} - \dfrac{4}{\sqrt{3}}\right]"
          variant="blue"
        />
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Antall par = C(8,2) = 28. Del dem opp etter avstand: 12 kanter, 12 flatediagonaler, 4 romdiagonaler.
            Sjekk at <InlineLatex latex="12+12+4 = 28" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Ladninger langs én kant er alltid motsatt tegn (fordi naboer alternerer). Langs flatediagonal
            (to steg i alternering) → samme tegn. Langs romdiagonal (tre steg) → motsatt tegn.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p className="text-sm">
            Regn ut <InlineLatex latex="12/\sqrt{2} = 6\sqrt{2} = 8{,}485" /> og{" "}
            <InlineLatex latex="4/\sqrt{3} \approx 2{,}309" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold">Steg 1: Klassifisér de 28 parene</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Kanter (avstand <InlineLatex latex="d" />, motsatt tegn): 12 par. Bidrar{" "}
            <InlineLatex latex="12 \cdot k(+q)(-q)/d = -12 kq^2/d" />.
          </li>
          <li>
            Flatediagonaler (<InlineLatex latex="d\sqrt 2" />, samme tegn): 12 par. Bidrar{" "}
            <InlineLatex latex="12 \cdot kq^2/(d\sqrt 2) = +12 kq^2/(d\sqrt 2)" />.
          </li>
          <li>
            Romdiagonaler (<InlineLatex latex="d\sqrt 3" />, motsatt tegn): 4 par. Bidrar{" "}
            <InlineLatex latex="-4 kq^2/(d\sqrt 3)" />.
          </li>
        </ul>

        <p className="font-semibold">Steg 2: Sett sammen</p>
        <FormulaBox
          latex="U = \dfrac{kq^2}{d}\left[-12 + \dfrac{12}{\sqrt 2} - \dfrac{4}{\sqrt 3}\right]"
          variant="blue"
        />

        <p className="font-semibold">Steg 3: Regn ut klammeparentesen</p>
        <FormulaBox latex="-12 + 8{,}485 - 2{,}309 = -5{,}824" variant="blue" />

        <p className="font-semibold">Steg 4: Endelig uttrykk</p>
        <FormulaBox latex="\boxed{U = \boxed{-5{,}824\,\dfrac{kq^2}{d}}}" variant="gold" />

        <p className="font-semibold">(b) Tolkning</p>
        <p>
          <InlineLatex latex="U < 0" /> betyr at arrangementet har <em>lavere</em> energi enn når
          ladningene er uendelig fra hverandre. Systemet er altså <strong>bundet</strong>:
          du må tilføre energi <InlineLatex latex="|U|" /> for å rive krystallen fra hverandre.
          Det er grunnen til at ioniske krystaller (NaCl, KCl osv.) finnes stabilt i naturen!
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Dette er en mini-versjon av <strong>Madelungs konstant</strong> (5,824 for NaCl-kubecellen uten
        nabocellers bidrag). Merk hvordan du må være systematisk med avstander og fortegn. For hele
        NaCl-krystallen (uendelig gitter) er Madelung-konstanten ≈ 1,747 per ionepar, og{" "}
        <InlineLatex latex="U_{\text{tot}} = -M\,ke^2/d" /> gir riktig bindingsenergi.
      </p>
    ),
  },

  // ==========================================================================
  // 23.62 — Geiger-teller
  // ==========================================================================
  "23.62": {
    title: "Geiger-teller — potensialforskjell for gitt E i mellomrommet",
    difficulty: "middels",
    pageRef: "s. 805",
    problem: (
      <div className="space-y-2">
        <p>
          En Geiger-teller oppdager stråling ved at en tynn tråd på aksen i en hul metallsylinder
          settes på høy potensial relativt til sylinderveggen (Fig. P23.62). Radius på sentraltråden er{" "}
          <InlineLatex latex="a = 145\;\mu\text{m}" />, og radius på sylinderen er{" "}
          <InlineLatex latex="b = 1{,}80\;\text{cm}" />.
        </p>
        <p>
          Hvilken potensialforskjell <InlineLatex latex="V_{ab}" /> mellom tråd og sylinder gir en
          feltstyrke på <InlineLatex latex="E = 2{,}00\cdot10^{4}\;\text{V/m}" /> i avstand{" "}
          <InlineLatex latex="r = 1{,}20\;\text{cm}" /> fra aksen?
        </p>
        <svg viewBox="0 0 360 220" className="w-full max-w-sm mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          {/* ytre sylinder */}
          <ellipse cx="180" cy="110" rx="140" ry="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          {/* indre tråd */}
          <line x1="180" y1="30" x2="180" y2="190" stroke="#ef4444" strokeWidth="2" />
          {/* pkt r */}
          <circle cx="220" cy="110" r="5" fill="#f59e0b" />
          <text x="230" y="108" fontSize="11" fill="#f59e0b">r = 1,20 cm</text>
          {/* labels */}
          <text x="180" y="20" textAnchor="middle" fontSize="10" fill="#ef4444">a = 145 μm (tråd)</text>
          <text x="180" y="210" textAnchor="middle" fontSize="10" fill="currentColor">b = 1,80 cm (sylinder)</text>
          {/* E-pil */}
          <ArrowMarker id="arr-2362" color="#3b82f6" />
          <line x1="195" y1="110" x2="215" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-2362)" />
          <text x="205" y="103" textAnchor="middle" fontSize="10" fill="#3b82f6">E</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="a = 145\;\mu\text{m} = 1{,}45\cdot10^{-4}\;\text{m}" /></li>
        <li><InlineLatex latex="b = 1{,}80\;\text{cm} = 0{,}0180\;\text{m}" /></li>
        <li><InlineLatex latex="E(r) = 2{,}00\cdot10^{4}\;\text{V/m}" /> ved <InlineLatex latex="r = 1{,}20\;\text{cm}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Potensialforskjellen <InlineLatex latex="V_{ab}" /> mellom tråd og sylinder</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          For koaksialsylinder (resultat fra oppgave 23.61):
        </p>
        <FormulaBox latex="E(r) = \dfrac{V_{ab}}{\ln(b/a)}\cdot\dfrac{1}{r}" variant="blue" />
        <p>
          Løs for <InlineLatex latex="V_{ab}" />:
        </p>
        <FormulaBox latex="V_{ab} = E(r)\cdot r\cdot \ln(b/a)" variant="blue" />
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Feltet mellom to koaksiale sylindre er <em>ikke</em> uniformt — det varierer som <InlineLatex latex="1/r" />.
            Bruk resultatet fra oppg. 23.61.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            <InlineLatex latex="V_{ab} = \lambda/(2\pi\varepsilon_0) \cdot \ln(b/a)" />, og{" "}
            <InlineLatex latex="E(r) = \lambda/(2\pi\varepsilon_0 r)" />. Deling eliminerer λ og gir formelen.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p className="text-sm">
            Regn ut <InlineLatex latex="\ln(b/a) = \ln(0{,}0180/1{,}45\cdot10^{-4}) = \ln(124{,}1)" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold">Steg 1: Formelen fra 23.61</p>
        <FormulaBox latex="E(r) = \dfrac{V_{ab}}{\ln(b/a)}\cdot\dfrac{1}{r}" variant="blue" />

        <p className="font-semibold">Steg 2: Regn ut ln(b/a)</p>
        <FormulaBox latex="\dfrac{b}{a} = \dfrac{0{,}0180}{1{,}45\cdot10^{-4}} = 124{,}1" variant="blue" />
        <FormulaBox latex="\ln(124{,}1) = 4{,}821" variant="blue" />

        <p className="font-semibold">Steg 3: Løs for V_ab</p>
        <FormulaBox latex="V_{ab} = E(r)\cdot r\cdot \ln(b/a)" variant="blue" />
        <FormulaBox latex="= (2{,}00\cdot10^{4})(0{,}0120)(4{,}821)" variant="blue" />
        <FormulaBox latex="= 240\cdot 4{,}821" variant="blue" />
        <FormulaBox latex="\boxed{V_{ab} = \boxed{1{,}16\cdot10^{3}\;\text{V}} \approx 1160\;\text{V}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Feltet i koaksialgeometri varierer som <InlineLatex latex="1/r" />, så det er størst nær tråden —
        som er akkurat der det er behov for sterkt felt for å ionisere gass. Nøkkelformelen:{" "}
        <InlineLatex latex="E(r) = V_{ab}/[r\ln(b/a)]" />. Bruker også for koaksialkabler og
        elektrostatiske filtere (oppg. 23.65).
      </p>
    ),
  },

  // ==========================================================================
  // 23.63 — CRT-deflektering
  // ==========================================================================
  "23.63": {
    title: "Elektronavbøyning i katodestrålerør (CRT)",
    difficulty: "vanskelig",
    pageRef: "s. 805",
    problem: (
      <div className="space-y-2">
        <p>
          I et katodestrålerør skytes et elektron med starthastighet{" "}
          <InlineLatex latex="v_0 = 6{,}50\cdot10^{6}\;\text{m/s}" /> langs aksen midt mellom to
          avbøyningsplater (Fig. P23.63). Potensialforskjellen er{" "}
          <InlineLatex latex="22{,}0\;\text{V}" />, og den <em>nedre</em> plata er på høyere potensial.
          Plateavstand <InlineLatex latex="2{,}0\;\text{cm}" />, platelengde <InlineLatex latex="6{,}0\;\text{cm}" />,
          og skjermen er <InlineLatex latex="12{,}0\;\text{cm}" /> lenger unna enden av platene.
        </p>
        <p>
          <strong>(a)</strong> Hva er kraften (størrelse og retning) på elektronet mellom platene?<br />
          <strong>(b)</strong> Hva er akselerasjonen?<br />
          <strong>(c)</strong> Hvor langt under aksen er elektronet ved enden av platene?<br />
          <strong>(d)</strong> Hvilken vinkel med aksen har elektronet når det forlater platene?<br />
          <strong>(e)</strong> Hvor langt under aksen treffer det skjermen?
        </p>
        <svg viewBox="0 0 480 200" className="w-full max-w-md mx-auto my-2" xmlns="http://www.w3.org/2000/svg">
          <ArrowMarker id="arr-2363" color="#3b82f6" />
          <ArrowMarker id="arr-2363F" color="#ef4444" />
          {/* plates */}
          <rect x="80" y="40" width="160" height="8" fill="#94a3b8" />
          <rect x="80" y="120" width="160" height="8" fill="#94a3b8" />
          <text x="160" y="30" textAnchor="middle" fontSize="10" fill="currentColor">øvre plate (lavere V)</text>
          <text x="160" y="150" textAnchor="middle" fontSize="10" fill="currentColor">nedre plate (+, høyere V)</text>
          {/* midlinje */}
          <line x1="20" y1="85" x2="460" y2="85" stroke="currentColor" opacity="0.3" strokeDasharray="4 3" />
          {/* electron */}
          <circle cx="40" cy="85" r="6" fill="#ef4444" />
          <line x1="50" y1="85" x2="100" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-2363)" />
          <text x="75" y="80" textAnchor="middle" fontSize="10" fill="#3b82f6">v₀</text>
          {/* bane (ned) */}
          <path d="M 80 85 Q 160 95, 240 125" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="240" y1="125" x2="440" y2="175" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-2363)" />
          {/* skjerm */}
          <line x1="440" y1="30" x2="440" y2="185" stroke="#10b981" strokeWidth="3" />
          <text x="445" y="25" fontSize="10" fill="#10b981">skjerm S</text>
          {/* mål */}
          <text x="160" y="180" textAnchor="middle" fontSize="10" fill="currentColor">6,0 cm</text>
          <text x="340" y="190" textAnchor="middle" fontSize="10" fill="currentColor">12,0 cm</text>
          <text x="250" y="65" fontSize="10" fill="currentColor">2,0 cm</text>
          {/* F-pil */}
          <line x1="160" y1="70" x2="160" y2="110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr-2363F)" />
          <text x="170" y="95" fontSize="10" fill="#ef4444">F</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="v_0 = 6{,}50\cdot10^{6}\;\text{m/s}" /></li>
        <li>Potensialforskjell: <InlineLatex latex="\Delta V = 22{,}0\;\text{V}" /></li>
        <li>Plateavstand <InlineLatex latex="d = 2{,}0\;\text{cm} = 0{,}020\;\text{m}" /></li>
        <li>Platelengde <InlineLatex latex="L_1 = 6{,}0\;\text{cm} = 0{,}060\;\text{m}" /></li>
        <li>Avstand ende-plate → skjerm: <InlineLatex latex="L_2 = 12{,}0\;\text{cm} = 0{,}120\;\text{m}" /></li>
        <li>Nedre plate på høyere V (så E peker opp, F på elektron peker ned)</li>
        <li><InlineLatex latex="m_e = 9{,}109\cdot10^{-31}\;\text{kg}" />, <InlineLatex latex="e = 1{,}602\cdot10^{-19}\;\text{C}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Kraft F</li>
        <li>(b) Akselerasjon a</li>
        <li>(c) Vertikal forflytning y₁ ved enden av platene</li>
        <li>(d) Utgangsvinkel θ</li>
        <li>(e) Total vertikal forflytning y_total på skjermen</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Klassisk <strong>skråtkastproblem</strong>: horisontal bevegelse med konstant <InlineLatex latex="v_x=v_0" />,
          vertikal bevegelse med konstant akselerasjon mellom platene, deretter rettlinjet mot skjerm.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Mellom platene: <InlineLatex latex="E = \Delta V/d" />, <InlineLatex latex="F = eE" />, <InlineLatex latex="a = F/m_e" /></li>
          <li>Tid mellom plater: <InlineLatex latex="t_1 = L_1/v_0" />; y₁ = ½a·t₁², v_y = a·t₁</li>
          <li>Etter plater (rettlinjet): y₂ = v_y·t₂ med t₂ = L₂/v₀</li>
        </ul>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Retning: nedre plate er på høyere V, så E peker opp. Elektron (−) → F = −eE peker ned.
            Elektronet blir trukket <em>ned</em> mot nedre (positive) plate.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Tid mellom plater: <InlineLatex latex="t_1 = L_1/v_0" />. Vertikal forflytning{" "}
            <InlineLatex latex="y_1 = \tfrac{1}{2}at_1^2" />.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p className="text-sm">
            Etter platene: akselerasjon = 0 (forutsatt at feltet ikke rekker utenfor).
            Fartsretning endres ikke, men forflytning fortsetter: <InlineLatex latex="y_2 = v_y t_2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold">(a) Kraft mellom platene</p>
        <FormulaBox latex="E = \dfrac{\Delta V}{d} = \dfrac{22{,}0}{0{,}020} = 1100\;\text{V/m}" variant="blue" />
        <FormulaBox latex="F = eE = (1{,}602\cdot10^{-19})(1100) = 1{,}76\cdot10^{-16}\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F = \boxed{1{,}76\cdot10^{-16}\;\text{N}}\;\text{(ned, mot nedre plate)}}" variant="gold" />

        <p className="font-semibold">(b) Akselerasjon</p>
        <FormulaBox
          latex="a = \dfrac{F}{m_e} = \dfrac{1{,}76\cdot10^{-16}}{9{,}109\cdot10^{-31}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{a = \boxed{1{,}93\cdot10^{14}\;\text{m/s}^{2}}\;\text{(nedover)}}" variant="gold" />

        <p className="font-semibold">(c) Forflytning y₁ ved enden av platene</p>
        <FormulaBox latex="t_1 = \dfrac{L_1}{v_0} = \dfrac{0{,}060}{6{,}50\cdot10^{6}} = 9{,}23\cdot10^{-9}\;\text{s}" variant="blue" />
        <FormulaBox latex="y_1 = \tfrac{1}{2}a t_1^2 = \tfrac{1}{2}(1{,}93\cdot10^{14})(9{,}23\cdot10^{-9})^2" variant="blue" />
        <FormulaBox latex="= \tfrac{1}{2}(1{,}93\cdot10^{14})(8{,}52\cdot10^{-17}) = 8{,}23\cdot10^{-3}\;\text{m}" variant="blue" />
        <FormulaBox latex="\boxed{y_1 = \boxed{0{,}823\;\text{cm}}\;\text{(under aksen)}}" variant="gold" />

        <p className="font-semibold">(d) Utgangsvinkel θ</p>
        <FormulaBox latex="v_y = a t_1 = (1{,}93\cdot10^{14})(9{,}23\cdot10^{-9}) = 1{,}78\cdot10^{6}\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\tan\theta = \dfrac{v_y}{v_0} = \dfrac{1{,}78\cdot10^{6}}{6{,}50\cdot10^{6}} = 0{,}2745" variant="blue" />
        <FormulaBox latex="\boxed{\theta = \boxed{15{,}3°}\;\text{(under aksen)}}" variant="gold" />

        <p className="font-semibold">(e) Totalt under aksen på skjermen</p>
        <FormulaBox latex="t_2 = \dfrac{L_2}{v_0} = \dfrac{0{,}120}{6{,}50\cdot10^{6}} = 1{,}846\cdot10^{-8}\;\text{s}" variant="blue" />
        <FormulaBox latex="y_2 = v_y t_2 = (1{,}78\cdot10^{6})(1{,}846\cdot10^{-8}) = 3{,}29\cdot10^{-2}\;\text{m} = 3{,}29\;\text{cm}" variant="blue" />
        <FormulaBox latex="y_{\text{total}} = y_1 + y_2 = 0{,}823 + 3{,}29 = 4{,}12\;\text{cm}" variant="blue" />
        <FormulaBox latex="\boxed{y_{\text{total}} = \boxed{4{,}12\;\text{cm}}\;\text{(under aksen)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        CRT-deflektering er bare <strong>skrått kast</strong> med elektrisk «gravitasjon» mellom platene,
        deretter rettlinjet mot skjermen. Alltid to faser: (1) mellom plater med akselerasjon,
        (2) rett strek etter platene. Sjekk retning på kraft via feltlinjer: E går fra+ til − plate,
        F på elektron er motsatt.
      </p>
    ),
  },

  // ==========================================================================
  // 23.75 — Alfapartikkel mot blyatom, closest approach
  // ==========================================================================
  "23.75": {
    title: "Alfapartikkel mot blykjerne — avstand ved nærmeste punkt",
    difficulty: "middels",
    pageRef: "s. 806",
    problem: (
      <div className="space-y-2">
        <p>
          En alfapartikkel med kinetisk energi <InlineLatex latex="K_0 = 9{,}50\;\text{MeV}" /> (målt langt unna)
          kolliderer direkte mot hode med en blykjerne som står stille. Hva er den minste avstanden mellom
          disse partiklene? Anta at blykjernen blir stående, og behandle begge som punktladninger.
          Atomnummer for bly er <InlineLatex latex="Z_{Pb} = 82" />, og alfapartikkelen er en heliumkjerne med{" "}
          <InlineLatex latex="Z_\alpha = 2" />.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Kinetisk energi langt unna: <InlineLatex latex="K_0 = 9{,}50\;\text{MeV} = 9{,}50\cdot10^{6}\cdot 1{,}602\cdot10^{-19}\;\text{J} = 1{,}522\cdot10^{-12}\;\text{J}" /></li>
        <li>Ladninger: <InlineLatex latex="q_\alpha = +2e" />, <InlineLatex latex="q_{Pb} = +82e" /></li>
        <li>Blykjernen står stille</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Minste avstand <InlineLatex latex="r_{\min}" /> (distance of closest approach)</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2 text-sm">
        <p>
          Ved nærmeste punkt er alfapartikkelens fart et øyeblikk null (den snur).
          Energibevaring: all kinetisk energi langt unna → potensiell energi ved <InlineLatex latex="r_{\min}" />:
        </p>
        <FormulaBox latex="K_0 = \dfrac{k q_\alpha q_{Pb}}{r_{\min}} = \dfrac{k(2e)(82e)}{r_{\min}}" variant="blue" />
        <FormulaBox latex="r_{\min} = \dfrac{164\, ke^2}{K_0}" variant="blue" />
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Langt unna er <InlineLatex latex="U\to 0" />, så all mekanisk energi er kinetisk.
            Ved <InlineLatex latex="r_{\min}" /> stopper partikkelen et øyeblikk (speilende i direkte front-mot-front-kollisjon).
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Konvertér MeV → J: <InlineLatex latex="1\;\text{MeV} = 1{,}602\cdot10^{-13}\;\text{J}" />.
            Eller behold alt i eV og bruk <InlineLatex latex="ke^2 = 1{,}44\;\text{eV}\cdot\text{nm}" /> for snarvei.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold">Steg 1: Energibevaring</p>
        <FormulaBox latex="K_0 + 0 = 0 + \dfrac{k q_\alpha q_{Pb}}{r_{\min}}" variant="blue" />
        <FormulaBox latex="r_{\min} = \dfrac{k q_\alpha q_{Pb}}{K_0} = \dfrac{k(2e)(82e)}{K_0} = \dfrac{164\,ke^2}{K_0}" variant="blue" />

        <p className="font-semibold">Steg 2: K₀ i joule</p>
        <FormulaBox latex="K_0 = 9{,}50\cdot10^{6}\cdot 1{,}602\cdot10^{-19}\;\text{J} = 1{,}522\cdot10^{-12}\;\text{J}" variant="blue" />

        <p className="font-semibold">Steg 3: Regn ut r_min</p>
        <FormulaBox
          latex="r_{\min} = \dfrac{164\,(8{,}99\cdot10^{9})(1{,}602\cdot10^{-19})^2}{1{,}522\cdot10^{-12}}"
          variant="blue"
        />
        <FormulaBox
          latex="= \dfrac{164 \cdot 2{,}307\cdot10^{-28}}{1{,}522\cdot10^{-12}} = \dfrac{3{,}783\cdot10^{-26}}{1{,}522\cdot10^{-12}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{r_{\min} = \boxed{2{,}49\cdot10^{-14}\;\text{m}} \approx 24{,}9\;\text{fm}}" variant="gold" />
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2 text-sm">
        <p>Alternativ med eV-enheter (unngår enhetsomgjøringer):</p>
        <FormulaBox latex="r_{\min} = \dfrac{164 \cdot ke^2}{K_0} = \dfrac{164 \cdot 1{,}44\;\text{eV}\cdot\text{nm}}{9{,}50\cdot10^{6}\;\text{eV}}" variant="blue" />
        <FormulaBox latex="= \dfrac{236{,}2}{9{,}50\cdot10^{6}}\;\text{nm} = 2{,}49\cdot10^{-5}\;\text{nm} = 24{,}9\;\text{fm}" variant="blue" />
        <p>Samme svar — viser hvordan eV-enheter forenkler atomfysikk-problemer.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Klassisk Rutherford-scattering-problem. Nøkkel: ved <InlineLatex latex="r_{\min}" /> har hele den
        kinetiske energien blitt til potensiell energi (front-kollisjon → fart = 0). Legg merke til at{" "}
        <InlineLatex latex="r_{\min} \sim 25\;\text{fm}" /> er større enn blykjernen (~8 fm), så alfapartikkelen
        berører aldri kjernen — den bare kjennes ved Coulomb-repulsjon. Det er denne innsikten som ga
        Rutherford mulighet til å «se» atomkjernen i 1911!
      </p>
    ),
  },
};
