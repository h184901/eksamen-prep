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
          <text x="115" y="195" textAnchor="middle" fontSize="10" fill="#ef4444">r_a = 0,150 m</text>
          {/* r_b */}
          <line x1="60" y1="200" x2="280" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <text x="185" y="135" fontSize="10" fill="#ef4444">r_b ≈ 0,368 m</text>
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
        <p className="font-semibold">Steg 1: Finn avstandene fra q₁ (origo) til punkt a og b</p>
        <p>
          Siden <InlineLatex latex="q_1" /> er i origo, er <InlineLatex latex="r_a" /> bare x-koordinaten
          til punkt a, mens <InlineLatex latex="r_b" /> beregnes med Pythagoras:
        </p>
        <FormulaBox latex="r_a = 0{,}150\;\text{m}" variant="blue" />
        <FormulaBox latex="r_b = \sqrt{(0{,}250)^2 + (0{,}270)^2} = \sqrt{0{,}1354}\;\text{m} = 0{,}3680\;\text{m}" variant="blue" />

        <p className="font-semibold">Steg 2: Beregn produktet k·q₁·q₂</p>
        <p>
          Siden <InlineLatex latex="q_1 > 0" /> og <InlineLatex latex="q_2 < 0" />, blir produktet negativt —
          dette reflekterer at ladningene tiltrekker hverandre:
        </p>
        <FormulaBox
          latex="k q_1 q_2 = (8{,}99\cdot10^{9})(2{,}10\cdot10^{-6})(-4{,}60\cdot10^{-6}) = -8{,}68\cdot10^{-2}\;\text{J}\!\cdot\!\text{m}"
          variant="blue"
        />

        <p className="font-semibold">Steg 3: Regn ut U_a og U_b</p>
        <FormulaBox latex="U_a = \dfrac{k q_1 q_2}{r_a} = \dfrac{-8{,}68\cdot10^{-2}}{0{,}150} = -0{,}579\;\text{J}" variant="blue" />
        <FormulaBox latex="U_b = \dfrac{k q_1 q_2}{r_b} = \dfrac{-8{,}68\cdot10^{-2}}{0{,}3680} = -0{,}2360\;\text{J}" variant="blue" />

        <p className="font-semibold">Steg 4: Arbeidet = U_a − U_b</p>
        <p>
          Ladningen flyttes vekk fra <InlineLatex latex="q_1" /> (større r → <InlineLatex latex="U_b" /> er mindre negativ).
          Siden ladningene tiltrekker hverandre, må vi utføre arbeid <em>mot</em> feltet for å dra dem fra hverandre,
          og den elektriske kraften gjør derfor <strong>negativt</strong> arbeid:
        </p>
        <FormulaBox latex="W_{a\to b} = U_a - U_b = -0{,}579 - (-0{,}2360) = -0{,}343\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_{a\to b} = \underline{\underline{-0{,}343\;\text{J}}}}" variant="gold" />
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
        <p className="font-semibold">Steg 1: Beregn konstanten k·q₁·q₂</p>
        <p>
          Begge ladninger er negative, så produktet er <em>positivt</em> — systemet frastøter:
        </p>
        <FormulaBox
          latex="k q_1 q_2 = (8{,}99\cdot10^{9})(-2{,}60\cdot10^{-6})(-7{,}50\cdot10^{-6}) = +0{,}1753\;\text{J}\!\cdot\!\text{m}"
          variant="blue"
        />

        <p className="font-semibold">Steg 2: (a) Regn ut U₁ og U₂ (ved r=0,420 m)</p>
        <FormulaBox latex="U_1 = \dfrac{0{,}1753}{0{,}800} = +0{,}2191\;\text{J}" variant="blue" />
        <FormulaBox latex="U_2 = \dfrac{0{,}1753}{0{,}420} = +0{,}4174\;\text{J}" variant="blue" />

        <p className="font-semibold">Steg 3: Løs energibevaring for v₂</p>
        <p>
          Kinetisk energi må <em>synke</em> når <InlineLatex latex="U" /> øker (kulen nærmer seg den andre ladningen):
        </p>
        <FormulaBox latex="\tfrac{1}{2}mv_2^2 = \tfrac{1}{2}mv_1^2 + U_1 - U_2" variant="blue" />
        <FormulaBox
          latex="\tfrac{1}{2}(1{,}50\cdot10^{-3})v_2^2 = \tfrac{1}{2}(1{,}50\cdot10^{-3})(22{,}0)^2 + 0{,}2191 - 0{,}4174"
          variant="blue"
        />
        <FormulaBox latex="\tfrac{1}{2}(1{,}50\cdot10^{-3})v_2^2 = 0{,}3630 - 0{,}1983 = 0{,}1647\;\text{J}" variant="blue" />
        <FormulaBox latex="v_2^2 = \dfrac{2(0{,}1647)}{1{,}50\cdot10^{-3}} = 219{,}6\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v_2 = \underline{\underline{14{,}8\;\text{m/s}}}}" variant="gold" />

        <p className="font-semibold">Steg 4: (b) Finn minste avstand</p>
        <p>
          Ved <InlineLatex latex="r_{\min}" /> er <InlineLatex latex="v = 0" />. All kinetisk energi + potensiell ved start
          blir omgjort til potensiell energi:
        </p>
        <FormulaBox latex="\tfrac{1}{2}mv_1^2 + U_1 = 0 + \dfrac{kq_1q_2}{r_{\min}}" variant="blue" />
        <FormulaBox latex="E_{\text{tot}} = 0{,}3630 + 0{,}2191 = 0{,}5821\;\text{J}" variant="blue" />
        <FormulaBox latex="r_{\min} = \dfrac{k q_1 q_2}{E_{\text{tot}}} = \dfrac{0{,}1753}{0{,}5821}" variant="blue" />
        <FormulaBox latex="\boxed{r_{\min} = \underline{\underline{0{,}301\;\text{m}}}}" variant="gold" />
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
        <p className="font-semibold">Steg 1: Identifiser krysspar og fortegn</p>
        <p>
          O⁻…N⁻ og N⁻…N⁻ gir <em>positivt</em> bidrag (likhetsfrastøting, <InlineLatex latex="+ke^2/r" />).
          H⁺…N⁻ gir <em>negativt</em> bidrag (tiltrekking, <InlineLatex latex="-ke^2/r" />).
        </p>

        <p className="font-semibold">Steg 2: Sett opp summen</p>
        <FormulaBox
          latex="U_{AT} = ke^2\!\left[\dfrac{1}{0{,}280\;\text{nm}} - \dfrac{1}{0{,}110\;\text{nm}} + \dfrac{1}{0{,}300\;\text{nm}} - \dfrac{1}{0{,}110\;\text{nm}}\right]"
          variant="blue"
        />

        <p className="font-semibold">Steg 3: Beregn klammeparentesen (i nm⁻¹)</p>
        <FormulaBox latex="3{,}571 - 9{,}091 + 3{,}333 - 9{,}091 = -11{,}28\;\text{nm}^{-1}" variant="blue" />

        <p className="font-semibold">Steg 4: Multiplisér med ke²</p>
        <FormulaBox latex="U_{AT} = (1{,}44\;\text{eV}\!\cdot\!\text{nm})(-11{,}28\;\text{nm}^{-1}) = -16{,}2\;\text{eV}" variant="blue" />
        <FormulaBox latex="\boxed{U_{AT} = \underline{\underline{-16{,}2\;\text{eV}}} \approx -2{,}60\cdot10^{-18}\;\text{J}}" variant="gold" />

        <p className="font-semibold">Steg 5: (b) Sammenlign med hydrogen</p>
        <FormulaBox latex="U_H = -\dfrac{ke^2}{r_H} = -\dfrac{1{,}44\;\text{eV}\!\cdot\!\text{nm}}{0{,}0529\;\text{nm}} = -27{,}2\;\text{eV}" variant="blue" />
        <FormulaBox latex="\dfrac{|U_{AT}|}{|U_H|} = \dfrac{16{,}2}{27{,}2} \approx 0{,}60" variant="blue" />
        <p>
          A–T-bindingen er altså omtrent <strong>60 %</strong> så sterk som proton–elektron-bindingen i hydrogen.
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
        <p className="font-semibold">Steg 1: Total kinetisk energi ved start</p>
        <p>
          Siden begge protoner har samme fart, og <InlineLatex latex="U \approx 0" /> langt unna:
        </p>
        <FormulaBox
          latex="K_{\text{tot}} = 2\!\cdot\!\tfrac{1}{2}m_p v_0^2 = m_p v_0^2 = (1{,}673\cdot10^{-27})(2{,}00\cdot10^{5})^2 = 6{,}69\cdot10^{-17}\;\text{J}"
          variant="blue"
        />

        <p className="font-semibold">Steg 2: Energibevaring → minste avstand</p>
        <p>
          Ved <InlineLatex latex="r_{\min}" /> er <InlineLatex latex="v = 0" /> for begge; all kinetisk energi
          er blitt potensiell:
        </p>
        <FormulaBox latex="\dfrac{ke^2}{r_{\min}} = K_{\text{tot}}" variant="blue" />
        <FormulaBox
          latex="r_{\min} = \dfrac{ke^2}{K_{\text{tot}}} = \dfrac{(8{,}99\cdot10^{9})(1{,}602\cdot10^{-19})^2}{6{,}69\cdot10^{-17}} = 3{,}45\cdot10^{-12}\;\text{m}"
          variant="blue"
        />

        <p className="font-semibold">Steg 3: Sett inn i Coulombs lov</p>
        <FormulaBox
          latex="F_{\max} = \dfrac{ke^2}{r_{\min}^2} = \dfrac{2{,}307\cdot10^{-28}}{(3{,}45\cdot10^{-12})^2} = \dfrac{2{,}307\cdot10^{-28}}{1{,}191\cdot10^{-23}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{F_{\max} = \underline{\underline{1{,}94\cdot10^{-5}\;\text{N}}}}" variant="gold" />
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
        <p className="font-semibold">Steg 1: Sett opp summen</p>
        <p>Alle tre par er identiske, så:</p>
        <FormulaBox latex="U_{\text{tot}} = 3\cdot\dfrac{k q^2}{d}" variant="blue" />

        <p className="font-semibold">Steg 2: Beregn ett par</p>
        <FormulaBox
          latex="\dfrac{k q^2}{d} = \dfrac{(8{,}99\cdot10^{9})(1{,}40\cdot10^{-6})^2}{0{,}300}"
          variant="blue"
        />
        <FormulaBox
          latex="= \dfrac{(8{,}99\cdot10^{9})(1{,}96\cdot10^{-12})}{0{,}300} = \dfrac{1{,}762\cdot10^{-2}}{0{,}300} = 5{,}873\cdot10^{-2}\;\text{J}"
          variant="blue"
        />

        <p className="font-semibold">Steg 3: Multiplisér med 3 (tre par)</p>
        <FormulaBox latex="U_{\text{tot}} = 3 \cdot 5{,}873\cdot10^{-2}\;\text{J} = 0{,}1762\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{U_{\text{tot}} = \underline{\underline{0{,}176\;\text{J}}}}" variant="gold" />
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
        <p className="font-semibold">Steg 1: Energiligning</p>
        <FormulaBox latex="\tfrac{1}{2}m v_B^2 = \tfrac{1}{2}m v_A^2 + q(V_A - V_B)" variant="blue" />

        <p className="font-semibold">Steg 2: Regn ut hvert ledd</p>
        <FormulaBox latex="\tfrac{1}{2}m v_A^2 = \tfrac{1}{2}(2{,}70\cdot10^{-4})(5{,}90)^2 = 4{,}70\cdot10^{-3}\;\text{J}" variant="blue" />
        <FormulaBox latex="q(V_A - V_B) = (-5{,}70\cdot10^{-6})(270 - 830) = (-5{,}70\cdot10^{-6})(-560) = +3{,}19\cdot10^{-3}\;\text{J}" variant="blue" />

        <p className="font-semibold">Steg 3: Sett sammen</p>
        <FormulaBox latex="\tfrac{1}{2}m v_B^2 = 4{,}70\cdot10^{-3} + 3{,}19\cdot10^{-3} = 7{,}89\cdot10^{-3}\;\text{J}" variant="blue" />
        <FormulaBox latex="v_B^2 = \dfrac{2(7{,}89\cdot10^{-3})}{2{,}70\cdot10^{-4}} = 58{,}44\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v_B = \underline{\underline{7{,}64\;\text{m/s}}}}" variant="gold" />

        <p className="font-semibold">Steg 4: Raskere eller tregere?</p>
        <p>
          <InlineLatex latex="v_B > v_A" /> — partikkelen er <strong>raskere ved B</strong>.
          Årsak: negativ ladning vinner energi når den beveger seg mot høyere V (potensiell
          energi <InlineLatex latex="qV" /> blir mer negativ, kinetisk energi øker tilsvarende).
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
        <p className="font-semibold">(a) Arbeidet utført av elektrisk kraft</p>
        <p>Fra arbeid-energi-setningen (eneste kraft er elektrisk):</p>
        <FormulaBox latex="W_E = K_f - K_0 = 2{,}20\cdot10^{-6} - 0 = 2{,}20\cdot10^{-6}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_E = \underline{\underline{+2{,}20\cdot10^{-6}\;\text{J}}}}" variant="gold" />

        <p className="font-semibold">(b) Potensialforskjell start − slutt</p>
        <FormulaBox latex="W_E = q(V_{\text{start}} - V_{\text{slutt}}) \;\Rightarrow\; V_{\text{start}} - V_{\text{slutt}} = \dfrac{W_E}{q}" variant="blue" />
        <FormulaBox latex="= \dfrac{2{,}20\cdot10^{-6}}{4{,}20\cdot10^{-9}} = 523{,}8\;\text{V}" variant="blue" />
        <FormulaBox latex="\boxed{V_{\text{start}} - V_{\text{slutt}} = \underline{\underline{+524\;\text{V}}}}" variant="gold" />
        <p>
          Positiv verdi betyr at <strong>startpunktet er på høyere potensial</strong> — som seg bør,
          siden den positive partikkelen «faller» mot lavere V.
        </p>

        <p className="font-semibold">(c) Størrelsen på E-feltet</p>
        <p>
          For uniformt felt parallelt med forflytningen:
        </p>
        <FormulaBox latex="|\vec E| = \dfrac{V_{\text{start}} - V_{\text{slutt}}}{d} = \dfrac{523{,}8\;\text{V}}{0{,}0600\;\text{m}}" variant="blue" />
        <FormulaBox latex="\boxed{|\vec E| = \underline{\underline{8{,}73\cdot10^{3}\;\text{V/m}}}}" variant="gold" />
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
        <p className="font-semibold">Felleskalkyle: F = qE</p>
        <FormulaBox latex="F = qE = (3{,}00\cdot10^{-8})(3{,}60\cdot10^{4}) = 1{,}08\cdot10^{-3}\;\text{N} \text{ (oppover)}" variant="blue" />

        <p className="font-semibold">(a) 0,490 m mot høyre</p>
        <p><InlineLatex latex="\vec F" /> er loddrett på forflytningen (<InlineLatex latex="\theta=90°" />):</p>
        <FormulaBox latex="\boxed{W_a = \underline{\underline{0}}}" variant="gold" />

        <p className="font-semibold">(b) 0,700 m oppover</p>
        <p><InlineLatex latex="\vec F" /> er i samme retning som forflytningen (<InlineLatex latex="\theta=0°" />):</p>
        <FormulaBox latex="W_b = Fd = (1{,}08\cdot10^{-3})(0{,}700) = 7{,}56\cdot10^{-4}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_b = \underline{\underline{+7{,}56\cdot10^{-4}\;\text{J}}}}" variant="gold" />

        <p className="font-semibold">(c) 2,80 m i 45° nedover fra horisontalen</p>
        <p>
          Vertikal komponent av forflytning: <InlineLatex latex="\Delta y = -d\sin 45° = -2{,}80\cdot 0{,}7071 = -1{,}980\;\text{m}" /> (negativ = nedover).
        </p>
        <FormulaBox latex="W_c = F \cdot \Delta y = (1{,}08\cdot10^{-3})(-1{,}980) = -2{,}14\cdot10^{-3}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_c = \underline{\underline{-2{,}14\cdot10^{-3}\;\text{J}}}}" variant="gold" />
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
        <p className="font-semibold">(a) Potensialet i A</p>
        <FormulaBox
          latex="V_A = \dfrac{k q_1}{0{,}050} + \dfrac{k q_2}{0{,}050} = \dfrac{k}{0{,}050}(q_1 + q_2)"
          variant="blue"
        />
        <FormulaBox
          latex="= \dfrac{8{,}99\cdot10^{9}}{0{,}050}\big(2{,}00 - 6{,}10\big)\cdot10^{-9} = (1{,}798\cdot10^{11})(-4{,}10\cdot10^{-9})"
          variant="blue"
        />
        <FormulaBox latex="\boxed{V_A = \underline{\underline{-737\;\text{V}}}}" variant="gold" />

        <p className="font-semibold">(b) Potensialet i B</p>
        <FormulaBox latex="V_B = \dfrac{k q_1}{0{,}080} + \dfrac{k q_2}{0{,}060}" variant="blue" />
        <FormulaBox
          latex="= \dfrac{(8{,}99\cdot10^{9})(2{,}00\cdot10^{-9})}{0{,}080} + \dfrac{(8{,}99\cdot10^{9})(-6{,}10\cdot10^{-9})}{0{,}060}"
          variant="blue"
        />
        <FormulaBox latex="= 224{,}8\;\text{V} + (-914{,}0)\;\text{V} = -689{,}2\;\text{V}" variant="blue" />
        <FormulaBox latex="\boxed{V_B = \underline{\underline{-689\;\text{V}}}}" variant="gold" />

        <p className="font-semibold">(c) Arbeid fra B til A</p>
        <p>
          Arbeid utført av E-feltet: <InlineLatex latex="W_E = q_3(V_B - V_A)" />{" "}
          (startpunkt minus sluttpunkt):
        </p>
        <FormulaBox latex="W_E = (3{,}00\cdot10^{-9})\big(-689{,}2 - (-737{,}2)\big) = (3{,}00\cdot10^{-9})(48{,}0)" variant="blue" />
        <FormulaBox latex="\boxed{W_E = \underline{\underline{+1{,}44\cdot10^{-7}\;\text{J}}}}" variant="gold" />
        <p>
          Positivt arbeid betyr at feltet <em>hjalp</em> ladningen fra B til A — som gir mening siden
          den positive ladningen går fra høyere (B) til lavere (A) potensial.
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
        <p className="font-semibold">(a) Akselerasjon fra 2,50 → 8,50 Mm/s</p>
        <FormulaBox latex="\Delta K = \tfrac{1}{2}m(v_f^2 - v_i^2)" variant="blue" />
        <FormulaBox
          latex="= \tfrac{1}{2}(9{,}109\cdot10^{-31})\big[(8{,}50\cdot10^{6})^2 - (2{,}50\cdot10^{6})^2\big]"
          variant="blue"
        />
        <FormulaBox latex="= \tfrac{1}{2}(9{,}109\cdot10^{-31})(6{,}60\cdot10^{13}) = 3{,}006\cdot10^{-17}\;\text{J}" variant="blue" />
        <p>
          For elektron: <InlineLatex latex="\Delta K = e\Delta V" />, så:
        </p>
        <FormulaBox
          latex="\Delta V = \dfrac{\Delta K}{e} = \dfrac{3{,}006\cdot10^{-17}}{1{,}602\cdot10^{-19}} \approx +188\;\text{V}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{\Delta V_{(a)} = \underline{\underline{+188\;\text{V}}}\;(\text{høyere V i sluttpunkt})}" variant="gold" />

        <p className="font-semibold">(b) Bremsing fra 8,50 Mm/s → 0</p>
        <FormulaBox
          latex="\Delta K = \tfrac{1}{2}m(0 - v_i^2) = -\tfrac{1}{2}(9{,}109\cdot10^{-31})(8{,}50\cdot10^{6})^2 = -3{,}291\cdot10^{-17}\;\text{J}"
          variant="blue"
        />
        <FormulaBox
          latex="\Delta V = \dfrac{-3{,}291\cdot10^{-17}}{1{,}602\cdot10^{-19}} \approx -206\;\text{V}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{\Delta V_{(b)} = \underline{\underline{-206\;\text{V}}}\;(\text{lavere V i sluttpunkt})}" variant="gold" />
        <p>
          Elektronet tapes fart fordi det må klatre mot «elektrisk motbakke» — dvs. at{" "}
          <InlineLatex latex="U = qV" /> øker for negativ ladning når V synker.
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
        <p className="font-semibold">(a) Avstand</p>
        <FormulaBox latex="r = \dfrac{V}{E} = \dfrac{4{,}98\;\text{V}}{16{,}2\;\text{V/m}}" variant="blue" />
        <FormulaBox latex="\boxed{r = \underline{\underline{0{,}307\;\text{m}}}}" variant="gold" />

        <p className="font-semibold">(b) Ladning</p>
        <FormulaBox latex="|q| = \dfrac{V r}{k} = \dfrac{(4{,}98)(0{,}307)}{8{,}99\cdot10^{9}}" variant="blue" />
        <FormulaBox latex="= \dfrac{1{,}531}{8{,}99\cdot10^{9}} = 1{,}703\cdot10^{-10}\;\text{C}" variant="blue" />
        <FormulaBox latex="\boxed{|q| = \underline{\underline{170\;\text{pC}}} \approx 0{,}170\;\text{nC}}" variant="gold" />

        <p className="font-semibold">(c) Retning</p>
        <p>
          Siden <InlineLatex latex="V = +4{,}98\;\text{V} > 0" />, er <InlineLatex latex="q" /> <strong>positiv</strong>.
          Derfor peker <InlineLatex latex="\vec E" /> <strong>vekk fra</strong> ladningen.
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
          <text x="40" y="35" textAnchor="middle" fontSize="10" fill="#3b82f6">v_p</text>
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
        <p className="font-semibold">Steg 1: Startenergi U₀</p>
        <FormulaBox
          latex="U_0 = \dfrac{k q_p q_\alpha}{r_0} = \dfrac{k(e)(2e)}{r_0} = \dfrac{2ke^2}{r_0}"
          variant="blue"
        />
        <FormulaBox
          latex="= \dfrac{2(8{,}99\cdot10^{9})(1{,}602\cdot10^{-19})^2}{2{,}25\cdot10^{-10}} = 2{,}051\cdot10^{-18}\;\text{J}"
          variant="blue"
        />

        <p className="font-semibold">Steg 2: Impulsbevaring</p>
        <FormulaBox latex="m_p v_p = m_\alpha v_\alpha \;\Rightarrow\; v_p = 4 v_\alpha" variant="blue" />

        <p className="font-semibold">Steg 3: Energibevaring (r → ∞)</p>
        <FormulaBox latex="\tfrac{1}{2}m_p(4v_\alpha)^2 + \tfrac{1}{2}(4m_p)v_\alpha^2 = U_0" variant="blue" />
        <FormulaBox latex="8 m_p v_\alpha^2 + 2 m_p v_\alpha^2 = 10 m_p v_\alpha^2 = U_0" variant="blue" />
        <FormulaBox
          latex="v_\alpha^{\max} = \sqrt{\dfrac{U_0}{10 m_p}} = \sqrt{\dfrac{2{,}051\cdot10^{-18}}{10(1{,}673\cdot10^{-27})}} = \sqrt{1{,}226\cdot10^{8}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{v_\alpha^{\max} = \underline{\underline{1{,}11\cdot10^{4}\;\text{m/s}}}}" variant="gold" />
        <FormulaBox latex="\boxed{v_p^{\max} = 4 v_\alpha^{\max} = \underline{\underline{4{,}43\cdot10^{4}\;\text{m/s}}}}" variant="gold" />

        <p className="font-semibold">Steg 4: Maksimal akselerasjon (ved t=0)</p>
        <FormulaBox
          latex="F_0 = \dfrac{k q_p q_\alpha}{r_0^2} = \dfrac{2ke^2}{r_0^2} = \dfrac{2(8{,}99\cdot10^9)(1{,}602\cdot10^{-19})^2}{(2{,}25\cdot10^{-10})^2}"
          variant="blue"
        />
        <FormulaBox latex="= 9{,}11\cdot10^{-9}\;\text{N}" variant="blue" />
        <FormulaBox
          latex="a_p^{\max} = \dfrac{F_0}{m_p} = \dfrac{9{,}11\cdot10^{-9}}{1{,}673\cdot10^{-27}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{a_p^{\max} = \underline{\underline{5{,}45\cdot10^{18}\;\text{m/s}^2}}}" variant="gold" />
        <FormulaBox
          latex="a_\alpha^{\max} = \dfrac{F_0}{m_\alpha} = \dfrac{9{,}11\cdot10^{-9}}{6{,}69\cdot10^{-27}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{a_\alpha^{\max} = \underline{\underline{1{,}36\cdot10^{18}\;\text{m/s}^2}}}" variant="gold" />

        <p className="font-semibold">Steg 5: Når?</p>
        <p>
          <strong>Max fart:</strong> etter lang tid (når <InlineLatex latex="r\to\infty" />, all U→K).
          <br />
          <strong>Max akselerasjon:</strong> like etter utslipp (når r er minst og kraften er størst).
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
        <FormulaBox latex="\boxed{U = \underline{\underline{-5{,}824\,\dfrac{kq^2}{d}}}}" variant="gold" />

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
        <FormulaBox latex="\boxed{V_{ab} = \underline{\underline{1{,}16\cdot10^{3}\;\text{V}}} \approx 1160\;\text{V}}" variant="gold" />
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
        <FormulaBox latex="\boxed{F = \underline{\underline{1{,}76\cdot10^{-16}\;\text{N}}}\;\text{(ned, mot nedre plate)}}" variant="gold" />

        <p className="font-semibold">(b) Akselerasjon</p>
        <FormulaBox
          latex="a = \dfrac{F}{m_e} = \dfrac{1{,}76\cdot10^{-16}}{9{,}109\cdot10^{-31}}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{a = \underline{\underline{1{,}93\cdot10^{14}\;\text{m/s}^{2}}}\;\text{(nedover)}}" variant="gold" />

        <p className="font-semibold">(c) Forflytning y₁ ved enden av platene</p>
        <FormulaBox latex="t_1 = \dfrac{L_1}{v_0} = \dfrac{0{,}060}{6{,}50\cdot10^{6}} = 9{,}23\cdot10^{-9}\;\text{s}" variant="blue" />
        <FormulaBox latex="y_1 = \tfrac{1}{2}a t_1^2 = \tfrac{1}{2}(1{,}93\cdot10^{14})(9{,}23\cdot10^{-9})^2" variant="blue" />
        <FormulaBox latex="= \tfrac{1}{2}(1{,}93\cdot10^{14})(8{,}52\cdot10^{-17}) = 8{,}23\cdot10^{-3}\;\text{m}" variant="blue" />
        <FormulaBox latex="\boxed{y_1 = \underline{\underline{0{,}823\;\text{cm}}}\;\text{(under aksen)}}" variant="gold" />

        <p className="font-semibold">(d) Utgangsvinkel θ</p>
        <FormulaBox latex="v_y = a t_1 = (1{,}93\cdot10^{14})(9{,}23\cdot10^{-9}) = 1{,}78\cdot10^{6}\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\tan\theta = \dfrac{v_y}{v_0} = \dfrac{1{,}78\cdot10^{6}}{6{,}50\cdot10^{6}} = 0{,}2745" variant="blue" />
        <FormulaBox latex="\boxed{\theta = \underline{\underline{15{,}3°}}\;\text{(under aksen)}}" variant="gold" />

        <p className="font-semibold">(e) Totalt under aksen på skjermen</p>
        <FormulaBox latex="t_2 = \dfrac{L_2}{v_0} = \dfrac{0{,}120}{6{,}50\cdot10^{6}} = 1{,}846\cdot10^{-8}\;\text{s}" variant="blue" />
        <FormulaBox latex="y_2 = v_y t_2 = (1{,}78\cdot10^{6})(1{,}846\cdot10^{-8}) = 3{,}29\cdot10^{-2}\;\text{m} = 3{,}29\;\text{cm}" variant="blue" />
        <FormulaBox latex="y_{\text{total}} = y_1 + y_2 = 0{,}823 + 3{,}29 = 4{,}12\;\text{cm}" variant="blue" />
        <FormulaBox latex="\boxed{y_{\text{total}} = \underline{\underline{4{,}12\;\text{cm}}}\;\text{(under aksen)}}" variant="gold" />
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
        <FormulaBox latex="\boxed{r_{\min} = \underline{\underline{2{,}49\cdot10^{-14}\;\text{m}}} \approx 24{,}9\;\text{fm}}" variant="gold" />
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
