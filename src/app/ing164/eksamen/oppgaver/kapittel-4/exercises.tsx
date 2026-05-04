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

function TheoryBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-300 mb-1">
        Teori: {title}
      </p>
      <div className="text-sm text-indigo-900 dark:text-indigo-100">{children}</div>
    </div>
  );
}

function Pitfall({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-1">
        Vanlig feil
      </p>
      <div className="text-sm text-rose-900 dark:text-rose-100">{children}</div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="font-semibold text-sm">
        <span className="inline-block w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold leading-6 text-center mr-2">
          {n}
        </span>
        {title}
      </p>
      <div className="mt-2 ml-8 text-sm space-y-2">{children}</div>
    </div>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 4 (matcher University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  "4.1": {
    title: "To hunder drar i tau",
    difficulty: "middels",
    pageRef: "s. 152",
    problem: (
      <p>
        To hunder drar horisontalt i tau som er festet til en stolpe; vinkelen mellom tauene er 51,0°.
        Hvis Rover utøver 288 N kraft og Fido utøver 324 N kraft, finn størrelsen til den resulterende
        kraften og vinkelen den danner med Rovers tau.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Rovers kraft: <InlineLatex latex="F_R=288\;\text{N}" /></li>
        <li>Fidos kraft: <InlineLatex latex="F_F=324\;\text{N}" /></li>
        <li>Vinkel mellom tauene: 51,0°</li>
        <li>Begge tau festet i samme punkt (stolpen)</li>
      </ul>
    ),
    unknowns: <p>Resultantens størrelse <InlineLatex latex="|\vec F|" /> og retning (vinkel fra Rovers tau).</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vektor­sum av to krefter">
          <p>
            Når to krefter virker i samme punkt, finnes resultanten ved å summere komponentene
            langs et felles koordinat­system. Velg den ene aksen langs én av kreftene for å forenkle:
          </p>
          <FormulaBox variant="gold" latex="\vec R=\vec F_1+\vec F_2" />
          <FormulaBox latex="|\vec R|=\sqrt{R_x^2+R_y^2},\quad \theta=\arctan\dfrac{R_y}{R_x}" />
          <p>
            Velger Rovers tau langs +x, da har Fido en vinkel 51° fra +x.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Velg +x langs Rovers tau. Da er <InlineLatex latex="F_R" /> ren x-komponent.</p> },
      { label: "Hint 2", content: <p>Fido bidrar både x- og y-komponenter: <InlineLatex latex="F_F\cos 51°" /> langs x og <InlineLatex latex="F_F\sin 51°" /> langs y.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Sett +x langs Rovers tau, så dekomponer Fido og summér.</p>
        <Step n={1} title="Dekomponering av kreftene">
          <FormulaBox latex="F_{Rx}=288\;\text{N},\;F_{Ry}=0" />
          <FormulaBox latex="F_{Fx}=324\cos 51°=324(0{,}6293)=203{,}9\;\text{N}" />
          <FormulaBox latex="F_{Fy}=324\sin 51°=324(0{,}7771)=251{,}8\;\text{N}" />
        </Step>
        <Step n={2} title="Sum­komponentene">
          <FormulaBox latex="R_x=288+203{,}9=491{,}9\;\text{N}" />
          <FormulaBox latex="R_y=0+251{,}8=251{,}8\;\text{N}" />
        </Step>
        <Step n={3} title="Resultantens størrelse">
          <FormulaBox latex="|\vec R|=\sqrt{(491{,}9)^2+(251{,}8)^2}=\sqrt{241\,966+63\,403}=\sqrt{305\,369}" />
          <FormulaBox latex="|\vec R|=552{,}6\;\text{N}" />
          <FormulaBox variant="gold" latex="|\vec R|\approx 553\;\text{N}" />
        </Step>
        <Step n={4} title="Resultantens retning">
          <FormulaBox latex="\theta=\arctan\dfrac{251{,}8}{491{,}9}=\arctan(0{,}5119)=27{,}1°" />
          <FormulaBox variant="gold" latex="\theta\approx 27{,}1°\text{ fra Rovers tau, mot Fido}" />
        </Step>
        <Pitfall>
          <strong>Pass på vinkel­konvensjonen.</strong> «Vinkel fra Rovers tau» er ikke det samme som
          «vinkel halvveis mellom tauene». Resultanten ligger nærmere det <em>sterkeste</em> tauet —
          her Fidos (324 &gt; 288), men i denne oppgaven bare 27° fra Rover fordi Fido bidrar mest
          langs samme retning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Hadde tauene vært parallelle (vinkel 0°), ville resultanten vært
          288+324=612 N. Med 51° mellom dem, mister vi ~10 % av total «pull-styrke» til
          motvirkende sideveis komponenter. Dette er hvorfor vinkler mellom tau betyr noe i
          praktisk tau­trekking og bjelke­montering.
        </p>
      </div>
    ),
    summary: <p>Vektor­sum: velg én akse langs én vektor, dekomponer den andre, summér og bruk Pythagoras + arctan.</p>,
  },

  "4.2": {
    title: "SUV i gjørma — tre horisontale tau (Fig E4.2)",
    difficulty: "middels",
    pageRef: "s. 152",
    problem: (
      <p>
        For å trekke en SUV ut av gjørma, drar arbeids­menn i tre horisontale tau med trekk­vektorer
        slik som vist i Fig. E4.2: 788 N langs en linje 32° vest for nord, 985 N langs en linje 31° øst
        for nord, og 411 N langs en linje 53° øst for sør. (a) Finn x- og y-komponentene av hver av de
        tre trekkene. (b) Bruk komponentene til å finne størrelsen og retningen av resultanten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec F_1=788\;\text{N}" />, 32° vest for nord</li>
        <li><InlineLatex latex="\vec F_2=985\;\text{N}" />, 31° øst for nord</li>
        <li><InlineLatex latex="\vec F_3=411\;\text{N}" />, 53° øst for sør</li>
        <li>Alle tau er horisontale (samme plan)</li>
      </ul>
    ),
    unknowns: <p>(a) Komponenter <InlineLatex latex="(F_x, F_y)" /> for hver vektor. (b) Resultantens størrelse og retning.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Kompass­retninger og koordinater">
          <p>
            Standard konvensjon: <InlineLatex latex="+x" /> øst, <InlineLatex latex="+y" /> nord.
            Vinkler oppgis ofte fra nord eller sør med kvalifikatorene «øst for» eller «vest for».
          </p>
          <ul className="list-disc pl-5 space-y-0.5 mt-2">
            <li>«θ vest for nord» ⇒ <InlineLatex latex="F_x=-F\sin\theta,\;F_y=+F\cos\theta" /></li>
            <li>«θ øst for nord» ⇒ <InlineLatex latex="F_x=+F\sin\theta,\;F_y=+F\cos\theta" /></li>
            <li>«θ øst for sør» ⇒ <InlineLatex latex="F_x=+F\sin\theta,\;F_y=-F\cos\theta" /></li>
            <li>«θ vest for sør» ⇒ <InlineLatex latex="F_x=-F\sin\theta,\;F_y=-F\cos\theta" /></li>
          </ul>
          <p className="text-sm mt-2">Nøkkel: vinkelen <em>fra</em> nord/sør gjør at <InlineLatex latex="\sin" /> tilhører øst/vest-retningen.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn ett kompass først, plasser hver vektor og marker vinkelen mot riktig hovedretning.</p> },
      { label: "Hint 2", content: <p>Når vinkelen er gitt fra nord eller sør, tilhører <InlineLatex latex="\cos" /> nord-syd-aksen og <InlineLatex latex="\sin" /> øst-vest-aksen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Konsekvent koordinatsystem (+x øst, +y nord), så dekomponer.</p>
        <Step n={1} title="(a) Vektor 1: 32° vest for nord">
          <FormulaBox latex="F_{1x}=-788\sin 32°=-788(0{,}5299)=-417{,}6\;\text{N}" />
          <FormulaBox latex="F_{1y}=+788\cos 32°=+788(0{,}8480)=+668{,}3\;\text{N}" />
        </Step>
        <Step n={2} title="(a) Vektor 2: 31° øst for nord">
          <FormulaBox latex="F_{2x}=+985\sin 31°=+985(0{,}5150)=+507{,}3\;\text{N}" />
          <FormulaBox latex="F_{2y}=+985\cos 31°=+985(0{,}8572)=+844{,}3\;\text{N}" />
        </Step>
        <Step n={3} title="(a) Vektor 3: 53° øst for sør">
          <FormulaBox latex="F_{3x}=+411\sin 53°=+411(0{,}7986)=+328{,}2\;\text{N}" />
          <FormulaBox latex="F_{3y}=-411\cos 53°=-411(0{,}6018)=-247{,}3\;\text{N}" />
        </Step>
        <Step n={4} title="(b) Resultant — sum av komponenter">
          <FormulaBox latex="R_x=-417{,}6+507{,}3+328{,}2=+417{,}9\;\text{N}" />
          <FormulaBox latex="R_y=+668{,}3+844{,}3-247{,}3=+1265\;\text{N}" />
        </Step>
        <Step n={5} title="(b) Størrelse og retning">
          <FormulaBox latex="|\vec R|=\sqrt{(417{,}9)^2+(1265)^2}=\sqrt{174\,640+1\,600\,225}=\sqrt{1\,774\,865}" />
          <FormulaBox latex="|\vec R|=1332\;\text{N}\approx 1{,}33\;\text{kN}" />
          <FormulaBox latex="\theta=\arctan\dfrac{R_x}{R_y}=\arctan\dfrac{417{,}9}{1265}=18{,}3°" />
          <FormulaBox variant="gold" latex="|\vec R|\approx 1{,}33\;\text{kN, retning } 18{,}3°\text{ øst for nord}" />
        </Step>
        <Pitfall>
          <strong>Tegn alltid en grov skisse først.</strong> Det er svært lett å bytte sin og cos
          når vinkelen er målt fra nord/sør i stedet for fra øst (x-aksen). Sjekk fortegnet på
          komponentene mot kvadrant­diagrammet før du regner.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: De to nord­over-vektorene (F_1 og F_2) bidrar mest til netto trekkraft
          fordi de stort sett peker samme vei. F_3, som peker mot sør-øst, virker mot dem og reduserer
          netto-y. I praksis ville arbeids­mennene plassert tauene mer parallelt med ønsket trekkretning.
        </p>
      </div>
    ),
    summary: <p>Vektor-sum med kompass­retninger: konsekvent valg av akser, dekomponering med riktig sin/cos, så summering komponentvis.</p>,
  },

  "4.4": {
    title: "Drager kuffert opp lasterampe",
    difficulty: "middels",
    pageRef: "s. 152",
    problem: (
      <p>
        En mann drar en kuffert opp lasterampe på en flytte­bil. Rampen har en hellings­vinkel 20,0°,
        og mannen drar oppover med en kraft <InlineLatex latex="\vec F" /> hvis retning danner en vinkel
        30,0° med rampen (Fig. E4.4). (a) Hvor stor må <InlineLatex latex="\vec F" /> være for at
        komponenten <InlineLatex latex="F_x" /> langs rampen skal være 90,0 N? (b) Hvor stor blir da
        komponenten <InlineLatex latex="F_y" /> vinkelrett på rampen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Rampens hellings­vinkel: 20,0° (irrelevant for komponent­regning her)</li>
        <li>Vinkel mellom <InlineLatex latex="\vec F" /> og rampens overflate: 30,0°</li>
        <li>Komponent langs rampen: <InlineLatex latex="F_x=90{,}0\;\text{N}" /></li>
      </ul>
    ),
    unknowns: <p>(a) Total kraft <InlineLatex latex="|\vec F|" />. (b) Komponent vinkelrett rampen, <InlineLatex latex="F_y" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Lokale akser langs en rampe">
          <p>
            Når en kraft virker på et objekt på en skrå overflate, lønner det seg å velge akser
            <em>langs</em> og <em>vinkelrett</em> rampen — ikke horisontale/vertikale akser. Da
            blir komponentene:
          </p>
          <FormulaBox variant="gold" latex="F_\parallel=F\cos\theta,\quad F_\perp=F\sin\theta" />
          <p>
            der θ er vinkelen mellom <InlineLatex latex="\vec F" /> og rampe­overflaten. Rampens
            hellingsvinkel (20°) er irrelevant for forholdet mellom F og dens komponenter — den
            bestemmer bare hvor «horisontalen» ligger i forhold til lokal akse.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vinkelen 30° er målt mellom F og rampen, ikke mellom F og horisontalen. Bruk rampens lokale x-akse (langs).</p> },
      { label: "Hint 2", content: <p>Når F_x er gitt, finn F via F = F_x/cos 30°.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Bruk rampens egne akser: x langs, y vinkelrett.</p>
        <Step n={1} title="(a) Total kraft fra langs-komponenten">
          <FormulaBox latex="F_x=F\cos 30°=90{,}0\;\text{N}" />
          <FormulaBox latex="F=\dfrac{90{,}0}{\cos 30°}=\dfrac{90{,}0}{0{,}8660}=103{,}9\;\text{N}" />
          <FormulaBox variant="gold" latex="F\approx 104\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Vinkelrett komponent">
          <FormulaBox latex="F_y=F\sin 30°=103{,}9(0{,}5000)=52{,}0\;\text{N}" />
          <FormulaBox variant="gold" latex="F_y\approx 52{,}0\;\text{N (vekk fra rampen)}" />
        </Step>
        <Pitfall>
          <strong>Rampens hellingsvinkel (20°) er en distraktor her.</strong> Vinkelen mellom F og
          rampen (30°) er det eneste som teller for å regne ut komponentene. Hellingen 20° ville
          bare være relevant hvis du skulle regne tyngdekraften eller normalkraften.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: F_y peker bort fra rampen, og «letter» kufferten — det reduserer
          normalkraften fra rampen og dermed friksjonen. Dette er hvorfor man instinktivt drar
          oppover i en vinkel når man trekker tunge ting opp en rampe.
        </p>
      </div>
    ),
    summary: <p>Kraft­dekomponering langs lokale akser (rampens egne): cos for komponent langs, sin for vinkelrett.</p>,
  },

  "4.5": {
    title: "Krefter F1 og F2 — resultant",
    difficulty: "lett",
    pageRef: "s. 152",
    problem: (
      <p>
        Krefter <InlineLatex latex="\vec F_1" /> og <InlineLatex latex="\vec F_2" /> virker i ett punkt.
        <InlineLatex latex="\;F_1=8{,}00\;\text{N}" />, retning 64,0° over x-aksen i 2. kvadrant.
        <InlineLatex latex="\;F_2=5{,}40\;\text{N}" />, retning 53,9° under x-aksen i 3. kvadrant.
        (a) Hva er x- og y-komponentene av resultanten? (b) Hva er størrelsen av resultanten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F_1=8{,}00\;\text{N}" />, 64,0° over x-aksen i 2. kvadrant</li>
        <li><InlineLatex latex="F_2=5{,}40\;\text{N}" />, 53,9° under x-aksen i 3. kvadrant</li>
        <li>«Vinkel over/under x-aksen» er målt opp/ned fra negativ x-akse</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="(R_x, R_y)" />. (b) <InlineLatex latex="|\vec R|" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Kvadranter og fortegn">
          <p>
            De fire kvadrantene har faste fortegn­regler for komponentene:
          </p>
          <ul className="list-disc pl-5 space-y-0.5 mt-2">
            <li>1. kvadrant (oppe-høyre): <InlineLatex latex="x&gt;0,\,y&gt;0" /></li>
            <li>2. kvadrant (oppe-venstre): <InlineLatex latex="x&lt;0,\,y&gt;0" /></li>
            <li>3. kvadrant (nede-venstre): <InlineLatex latex="x&lt;0,\,y&lt;0" /></li>
            <li>4. kvadrant (nede-høyre): <InlineLatex latex="x&gt;0,\,y&lt;0" /></li>
          </ul>
          <p className="mt-2">
            For en vektor i kvadrant n med vinkel θ <em>fra negativ x-akse</em> (slik som her):
          </p>
          <FormulaBox latex="|F_x|=F\cos\theta,\;|F_y|=F\sin\theta" />
          <p className="text-sm">Fortegn settes etter kvadrant­regelen.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn vektorene i et koordinatsystem først. 2. kvadrant: x negativ, y positiv. 3. kvadrant: begge negative.</p> },
      { label: "Hint 2", content: <p>Vinkelen er målt fra <em>negativ</em> x-aksen (siden kvadrantene 2 og 3 ligger venstre for y-aksen).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Bruk fortegns­regelen for kvadrantene, så summér.</p>
        <Step n={1} title="Komponenter for F_1 (2. kvadrant, 64° over neg. x)">
          <FormulaBox latex="F_{1x}=-F_1\cos 64°=-8{,}00(0{,}4384)=-3{,}51\;\text{N}" />
          <FormulaBox latex="F_{1y}=+F_1\sin 64°=+8{,}00(0{,}8988)=+7{,}19\;\text{N}" />
        </Step>
        <Step n={2} title="Komponenter for F_2 (3. kvadrant, 53,9° under neg. x)">
          <FormulaBox latex="F_{2x}=-F_2\cos 53{,}9°=-5{,}40(0{,}5892)=-3{,}18\;\text{N}" />
          <FormulaBox latex="F_{2y}=-F_2\sin 53{,}9°=-5{,}40(0{,}8080)=-4{,}36\;\text{N}" />
        </Step>
        <Step n={3} title="(a) Resultantens komponenter">
          <FormulaBox latex="R_x=-3{,}51-3{,}18=-6{,}69\;\text{N}" />
          <FormulaBox latex="R_y=+7{,}19-4{,}36=+2{,}83\;\text{N}" />
          <FormulaBox variant="gold" latex="R_x=-6{,}69\;\text{N},\;R_y=+2{,}83\;\text{N}" />
        </Step>
        <Step n={4} title="(b) Størrelse">
          <FormulaBox latex="|\vec R|=\sqrt{(-6{,}69)^2+(2{,}83)^2}=\sqrt{44{,}76+8{,}009}=\sqrt{52{,}77}" />
          <FormulaBox variant="gold" latex="|\vec R|\approx 7{,}26\;\text{N (i 2. kvadrant)}" />
        </Step>
        <Pitfall>
          <strong>Den vanligste feilen er å forvirre kvadrantene.</strong> Hvis du skriver
          <InlineLatex latex="F_x=F\cos\theta" /> uten å tenke på fortegn, vil 2. og 3. kvadrant
          gi feil svar. Tegn alltid en skisse først.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Resultanten ligger i 2. kvadrant (negativ x, positiv y) — som forventet
          siden begge kreftene har negativ x-komponent og F_1 sin positive y dominerer F_2 sin
          negative y. Vinkelen <InlineLatex latex="\theta_R=180°-\arctan(2{,}83/6{,}69)=180°-22{,}9°=157{,}1°" />
          fra +x-aksen.
        </p>
      </div>
    ),
    summary: <p>Vektor­sum med kvadranter: tegn skisse, fastsett fortegn, så regn komponenter og bruk Pythagoras.</p>,
  },

  "4.6": {
    title: "Elektron akselereres i TV-rør",
    difficulty: "lett",
    pageRef: "s. 152",
    problem: (
      <p>
        Et elektron (masse <InlineLatex latex="9{,}11\times 10^{-31}\;\text{kg}" />) forlater den ene
        enden av et TV-bilderør med null initial­fart og kjører i en rett linje mot akselerasjons­gitteret
        som er 1,80 cm unna. Det når gitteret med fart <InlineLatex latex="3{,}00\times 10^{6}\;\text{m/s}" />.
        Hvis akselerasjons­kraften er konstant, beregn (a) akselerasjonen, (b) tiden til å nå gitteret,
        (c) netto­kraften (i newton). Se bort fra tyngdekraft på elektronet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Elektron­masse: <InlineLatex latex="m=9{,}11\times 10^{-31}\;\text{kg}" /></li>
        <li>Tilbakelagt avstand: <InlineLatex latex="d=1{,}80\;\text{cm}=1{,}80\times 10^{-2}\;\text{m}" /></li>
        <li>Slutt­fart: <InlineLatex latex="v=3{,}00\times 10^{6}\;\text{m/s}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=0" /></li>
        <li>Konstant kraft (konstant akselerasjon)</li>
      </ul>
    ),
    unknowns: <p>(a) Akselerasjon a. (b) Tid t. (c) Netto­kraft F (i N).</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Konstant akselerasjon + Newtons andre lov">
          <p>
            Konstant kraft ⇒ konstant akselerasjon ⇒ standard kinematikk gjelder:
          </p>
          <FormulaBox variant="gold" latex="v^2=v_0^2+2ad,\quad v=v_0+at" />
          <p>
            Newton 2 binder kraft til akselerasjon for konstant masse:
          </p>
          <FormulaBox variant="gold" latex="\sum\vec F=m\vec a" />
          <p>
            Tyngdekraft på et elektron er <InlineLatex latex="\;m_e g\sim 10^{-29}\;\text{N}" /> —
            forsvinnende liten og ignoreres her.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Med <InlineLatex latex="v_0=0" />: <InlineLatex latex="\;v^2=2ad" /> er enklest for (a).</p> },
      { label: "Hint 2", content: <p>For (b): bruk <InlineLatex latex="\;t=v/a" />. For (c): direkte <InlineLatex latex="\;F=ma" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Standard kinematikk og Newton 2 — straight­forward når akselerasjonen er konstant.</p>
        <Step n={1} title="(a) Akselerasjon">
          <FormulaBox latex="v^2=2ad\Rightarrow a=\dfrac{v^2}{2d}=\dfrac{(3{,}00\times 10^6)^2}{2(1{,}80\times 10^{-2})}" />
          <FormulaBox latex="a=\dfrac{9{,}00\times 10^{12}}{3{,}60\times 10^{-2}}=2{,}50\times 10^{14}\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a\approx 2{,}50\times 10^{14}\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(b) Tid">
          <FormulaBox latex="t=\dfrac{v}{a}=\dfrac{3{,}00\times 10^6}{2{,}50\times 10^{14}}=1{,}20\times 10^{-8}\;\text{s}" />
          <FormulaBox variant="gold" latex="t\approx 12{,}0\;\text{ns}" />
        </Step>
        <Step n={3} title="(c) Netto­kraft">
          <FormulaBox latex="F=ma=(9{,}11\times 10^{-31})(2{,}50\times 10^{14})=2{,}28\times 10^{-16}\;\text{N}" />
          <FormulaBox variant="gold" latex="F\approx 2{,}28\times 10^{-16}\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Akselerasjon ≠ kraft.</strong> Den enorme akselerasjonen (~10²⁵ g!) skyldes
          elektronets utrolig lille masse — kraften som produserer den er likevel mikroskopisk.
          Newton 2 sier: like akselerasjon krever like F/m, ikke like F.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Den elektriske kraften som styrer elektronet kommer fra et anode-katode
          spennings­fall i bilde­røret. Energien som overføres til ett elektron er
          <InlineLatex latex="\;\tfrac12 mv^2\approx 4{,}10\times 10^{-18}\;\text{J}\approx 25{,}6\;\text{eV}" /> —
          en gigantisk faktor under et typisk TV-spennings­fall (10–25 kV), som elektronene faktisk
          vil oppleve flere ganger underveis. Dette tilsvarer en mye høyere fart enn 3×10⁶ m/s i
          ekte TV-rør (nær lysfart, så relativistiske effekter kommer inn).
        </p>
      </div>
    ),
    summary: <p>Liten masse + middels kraft = enorm akselerasjon. Standard kinematikk + Newton 2.</p>,
  },

  "4.7": {
    title: "Skøyteløper bremses jevnt",
    difficulty: "lett",
    pageRef: "s. 152",
    problem: (
      <p>
        En 68,5 kg skøyteløper i 2,40 m/s på ru horisontal is bremses jevnt til ro på 3,52 s pga friksjon.
        Hvilken friksjons­kraft virker på skøyteløperen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=68{,}5\;\text{kg}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=2{,}40\;\text{m/s}" /></li>
        <li>Slutt­fart: <InlineLatex latex="v=0\;\text{m/s}" /></li>
        <li>Bremse­tid: <InlineLatex latex="t=3{,}52\;\text{s}" /></li>
        <li>Konstant friksjon (konstant akselerasjon)</li>
      </ul>
    ),
    unknowns: <p>Friksjons­kraftens størrelse og retning.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Newton 2 i 1D med jevn brems">
          <p>
            Når en konstant kraft virker i én dimensjon, gir Newton 2:
          </p>
          <FormulaBox variant="gold" latex="F_\text{netto}=ma,\;\;a=\dfrac{\Delta v}{\Delta t}" />
          <p>
            Negativ <InlineLatex latex="a" /> betyr at akselerasjonen peker motsatt
            bevegelses­retningen — typisk for friksjon på horisontalt underlag der friksjon er
            eneste horisontale kraft.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Definér +x i bevegelsens retning, så blir <InlineLatex latex="v_0=+2{,}40" /> og <InlineLatex latex="v=0" />.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="\Delta v=v-v_0=-2{,}40" /> ⇒ negativ a ⇒ friksjon mot bevegelsen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Beregn akselerasjonen, så Newton 2 gir kraften.</p>
        <Step n={1} title="Akselerasjon (jevn brems)">
          <FormulaBox latex="a=\dfrac{v-v_0}{t}=\dfrac{0-2{,}40}{3{,}52}=-0{,}682\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Friksjons­kraft via Newton 2">
          <FormulaBox latex="F=ma=68{,}5(-0{,}682)=-46{,}7\;\text{N}" />
          <FormulaBox variant="gold" latex="|F|\approx 46{,}7\;\text{N (rettet mot bevegelsen)}" />
        </Step>
        <Pitfall>
          <strong>Negativt fortegn betyr retning, ikke størrelse.</strong> Si aldri «kraften er
          −46,7 N» som om det var en mindre verdi enn 46 N — fortegnet sier bare at den peker
          mot −x. Størrelsen er 46,7 N.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Friksjons­koeffisienten μ_k mellom skøyte­blader og is kan estimeres her:
          <InlineLatex latex="\;\mu_k=F/(mg)=46{,}7/(68{,}5\cdot 9{,}80)=0{,}0696" /> — typisk for is
          (μ_k ≈ 0,02–0,1 avhengig av temperatur og hastighet). Dette er hvorfor skøyteløpere
          glir så langt — friksjonen er en størrelses­orden mindre enn på asfalt.
        </p>
      </div>
    ),
    summary: <p>Bremsing fra konstant a: <InlineLatex latex="a=\Delta v/\Delta t" />, så <InlineLatex latex="F=ma" />.</p>,
  },

  "4.9": {
    title: "Kasse på friksjons­fri dam",
    difficulty: "lett",
    pageRef: "s. 152",
    problem: (
      <p>
        En kasse hviler på en frossen dam, som vi behandler som friksjons­fritt horisontalt underlag.
        Hvis en fisker drar horisontalt med 50,0 N og kassen får akselerasjon 3,60 m/s², hva er massen
        til kassen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Horisontal kraft: <InlineLatex latex="F=50{,}0\;\text{N}" /></li>
        <li>Akselerasjon: <InlineLatex latex="a=3{,}60\;\text{m/s}^2" /></li>
        <li>Friksjons­fritt underlag (ingen motkraft i horisontal retning)</li>
      </ul>
    ),
    unknowns: <p>Massen <InlineLatex latex="m" /> til kassen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Newton 2 brukt baklengs">
          <p>
            Vanligvis bruker vi <InlineLatex latex="F=ma" /> for å finne F når a er kjent. Her
            kjenner vi både F og a, og isolerer m:
          </p>
          <FormulaBox variant="gold" latex="m=\dfrac{F_\text{netto}}{a}" />
          <p>
            Friksjons­fritt ⇒ den horisontale F er hele netto­kraften (vertikalen balanseres av
            normal­kraft mot tyngde, så bidrar 0 i x).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bare horisontal kraft betyr noe — friksjons­fritt eliminerer alle motkrefter i bevegelses­retningen.</p> },
      { label: "Hint 2", content: <p>Sjekk enheter: N/(m/s²) = kg, så svaret blir automatisk i kg.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Newton 2 isolert for masse — ett enkelt regne­steg.</p>
        <Step n={1} title="Anvend Newton 2">
          <FormulaBox latex="\sum F_x=ma\Rightarrow m=\dfrac{F}{a}=\dfrac{50{,}0}{3{,}60}=13{,}89\;\text{kg}" />
          <FormulaBox variant="gold" latex="m\approx 13{,}9\;\text{kg}" />
        </Step>
        <Pitfall>
          <strong>Hadde det vært friksjon, ville svaret blitt et annet.</strong> Friksjons­fritt er en
          idealisering — på ekte is virker en liten friksjons­kraft mot bevegelsen, og netto­kraften
          ville vært F − f, ikke bare F. Da ville den «effektive» massen virke større enn den er.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 13,9 kg er en realistisk masse for en lett kasse — passer med en frosset
          dam-scenario der fiskeren prøver å trekke utstyr/fangst. Hadde kassen veid 50 kg, ville
          samme kraft gitt akselerasjon 1,0 m/s² — proporsjonalt med 1/m som forventet.
        </p>
      </div>
    ),
    summary: <p>Newton 2 invertert: <InlineLatex latex="m=F/a" /> når både kraft og akselerasjon er kjent.</p>,
  },

  "4.10": {
    title: "Havne­arbeider skyver isblokk",
    difficulty: "middels",
    pageRef: "s. 152",
    problem: (
      <p>
        En havne­arbeider skyver med konstant 80,0 N på en isblokk på et glatt horisontalt gulv.
        Friksjon ignoreres. Blokken starter fra ro og beveger seg 11,0 m på 5,00 s. (a) Hva er massen
        til isblokken? (b) Hvis arbeideren slutter å skyve på slutten av 5,00 s, hvor langt går
        blokken i de neste 5,00 s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Skyve­kraft: <InlineLatex latex="F=80{,}0\;\text{N}" /></li>
        <li>Tilbakelagt avstand: <InlineLatex latex="d=11{,}0\;\text{m}" /></li>
        <li>Tid: <InlineLatex latex="t=5{,}00\;\text{s}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=0" /></li>
        <li>Friksjons­fritt gulv</li>
      </ul>
    ),
    unknowns: <p>(a) Massen m. (b) Avstand i de neste 5,00 s etter at kraften slutter.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To-fase bevegelse: kraftpåført, så friksjons­fri glidning">
          <p>
            <strong>Fase 1 (0 ≤ t ≤ 5 s):</strong> konstant kraft ⇒ konstant a ⇒ kinematikk fra ro:
          </p>
          <FormulaBox latex="d=\tfrac12 at^2,\quad v=at" />
          <p>
            <strong>Fase 2 (t ≥ 5 s):</strong> kraften forsvinner. Friksjons­fritt ⇒ ingen netto
            horisontal kraft ⇒ <em>konstant fart</em> (Newton 1!):
          </p>
          <FormulaBox variant="gold" latex="d_\text{fase 2}=v_5\cdot t" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a): finn først a fra <InlineLatex latex="d=\tfrac12 at^2" />, så m fra Newton 2.</p> },
      { label: "Hint 2", content: <p>For (b): finn farten ved t=5 s, så bruk <InlineLatex latex="d=vt" /> i fase 2 (Newton 1: ingen kraft = konstant fart).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Fase 1: kinematikk fra ro + Newton 2. Fase 2: Newton 1 ⇒ konstant fart.</p>
        <Step n={1} title="(a) Akselerasjon i fase 1">
          <FormulaBox latex="d=\tfrac12 at^2\Rightarrow a=\dfrac{2d}{t^2}=\dfrac{2(11{,}0)}{(5{,}00)^2}=\dfrac{22{,}0}{25{,}0}=0{,}880\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(a) Masse fra Newton 2">
          <FormulaBox latex="m=\dfrac{F}{a}=\dfrac{80{,}0}{0{,}880}=90{,}9\;\text{kg}" />
          <FormulaBox variant="gold" latex="m\approx 90{,}9\;\text{kg}" />
        </Step>
        <Step n={3} title="(b) Fart ved slutten av fase 1">
          <FormulaBox latex="v_5=at=0{,}880(5{,}00)=4{,}40\;\text{m/s}" />
        </Step>
        <Step n={4} title="(b) Avstand i fase 2 (kraft = 0)">
          <p>Friksjons­fritt + ingen kraft ⇒ Newton 1: blokken fortsetter med 4,40 m/s.</p>
          <FormulaBox latex="d_\text{ekstra}=v_5\cdot t=4{,}40(5{,}00)=22{,}0\;\text{m}" />
          <FormulaBox variant="gold" latex="d_\text{ekstra}=22{,}0\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Newton 1 er ikke en triviell konsekvens av Newton 2.</strong> Mange tror at uten
          kraft må alt bremses opp — det er Aristoteles, ikke Newton. Newton 1 sier: i fravær av
          netto kraft, fortsetter et legeme med samme fart i samme retning. Friksjons­fritt er
          nøkkelen her.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: At blokken går dobbelt så langt i fase 2 (22 m vs 11 m i fase 1) er
          ikke tilfeldig — i fase 1 starter den fra null fart og bygger opp; gjennomsnitts­fart i
          fase 1 er v_5/2 = 2,20 m/s. I fase 2 holder den konstant 4,40 m/s. Ratioen mellom
          gjennomsnitts­fart er 1:2, akkurat som distanse­ratio.
        </p>
      </div>
    ),
    summary: <p>Fase 1 (akselerasjon under kraft) + fase 2 (konstant fart uten kraft) — Newton 1 og 2 i samspill.</p>,
  },

  "4.12": {
    title: "Kasse på lager­gulv",
    difficulty: "lett",
    pageRef: "s. 152",
    problem: (
      <p>
        En kasse med masse 32,0 kg står først stille på et lager­gulv som virker friksjons­fritt. Den
        utsettes deretter for en konstant horisontal kraft 140 N. (a) Hva er akselerasjonen?
        (b) Hvor langt går kassen på 13,0 s? (c) Hva er farten på slutten av 13,0 s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=32{,}0\;\text{kg}" /></li>
        <li>Konstant horisontal kraft: <InlineLatex latex="F=140\;\text{N}" /></li>
        <li>Tid: <InlineLatex latex="t=13{,}0\;\text{s}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=0" /></li>
        <li>Friksjons­fritt gulv</li>
      </ul>
    ),
    unknowns: <p>(a) Akselerasjon a. (b) Avstand d på 13 s. (c) Slutt­fart v.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Newton 2 + kinematikk fra ro">
          <p>Konstant kraft + konstant masse ⇒ konstant a. Standard «pakke» av formler:</p>
          <FormulaBox variant="gold" latex="a=\dfrac{F}{m}" />
          <FormulaBox latex="d=\tfrac12 at^2,\quad v=at\quad(\text{når } v_0=0)" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Trinnvis: Newton 2 først, så kinematikk. Ikke kombinere alt i én ligning.</p> },
      { label: "Hint 2", content: <p>Med <InlineLatex latex="v_0=0" /> blir formlene enkle: <InlineLatex latex="\;d=\tfrac12 at^2" /> og <InlineLatex latex="v=at" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Newton 2 gir a, så kinematikk for d og v.</p>
        <Step n={1} title="(a) Akselerasjon">
          <FormulaBox latex="a=\dfrac{F}{m}=\dfrac{140}{32{,}0}=4{,}375\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a\approx 4{,}38\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(b) Avstand etter 13,0 s">
          <FormulaBox latex="d=\tfrac12 at^2=\tfrac12(4{,}375)(13{,}0)^2=\tfrac12(4{,}375)(169)=369{,}7\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 370\;\text{m}" />
        </Step>
        <Step n={3} title="(c) Slutt­fart">
          <FormulaBox latex="v=at=4{,}375(13{,}0)=56{,}88\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 56{,}9\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Sjekk konsistensen mellom d, v og t.</strong> For konstant a fra ro gjelder
          <InlineLatex latex="\;d=\bar{v}\cdot t=\tfrac12 v\cdot t" />, dvs. 0,5·56,9·13 = 369,9 m ✓.
          Hvis svar­ene dine ikke tilfreds­stiller dette, har du regnet feil et sted.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 56,9 m/s ≈ 205 km/t er ekstremt høyt for en kasse på lager­gulv. Dette
          er bare matematisk realistisk hvis lageret er enormt langt og friksjons­fritt — i
          virkeligheten ville luftmotstand alene begrenset farten betydelig. Oppgaven er en
          rendyrket Newton 2-illustrasjon.
        </p>
      </div>
    ),
    summary: <p>Standard sekvens: <InlineLatex latex="F\to a\to d,v" /> via kinematikk fra ro.</p>,
  },

  "4.16": {
    title: "Astronaut­sekkens vekt på månen",
    difficulty: "lett",
    pageRef: "s. 153",
    problem: (
      <p>
        En astronauts ryggsekk veier 17,4 N på jorda men bare 3,95 N på overflaten av en måne.
        (a) Hva er akselerasjonen pga gravitasjon på denne månen? (b) Hva er massen til ryggsekken
        på denne månen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt på Jorden: <InlineLatex latex="W_J=17{,}4\;\text{N}" /></li>
        <li>Vekt på månen: <InlineLatex latex="W_m=3{,}95\;\text{N}" /></li>
        <li>Tyngde­akselerasjon på Jorden: <InlineLatex latex="g_J=9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="g_m" /> på månen. (b) Massen på månen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Masse vs. vekt — fundamental forskjell">
          <p>
            <strong>Masse</strong> er en iboende egenskap ved et legeme — uavhengig av hvor i
            universet det befinner seg. Måles i kg.
          </p>
          <p>
            <strong>Vekt</strong> er kraften tyngde­feltet utøver på et legeme:
            <InlineLatex latex="\;W=mg" />. Avhenger av lokal g. Måles i newton.
          </p>
          <FormulaBox variant="gold" latex="W=mg\Rightarrow m=\dfrac{W}{g},\;g=\dfrac{W}{m}" />
          <p>
            Forhold mellom to himmel­legemer: <InlineLatex latex="\;W_2/W_1=g_2/g_1" /> (samme masse).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Massen er den samme på både Jorden og månen — det er fakta. Bruk Jordens vekt og g_J for å finne den.</p> },
      { label: "Hint 2", content: <p>Med kjent masse: <InlineLatex latex="g_m=W_m/m" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Først finn massen (invariant), så bruk månens vekt for å finne g_m.</p>
        <Step n={1} title="Masse fra Jordens vekt">
          <FormulaBox latex="m=\dfrac{W_J}{g_J}=\dfrac{17{,}4}{9{,}80}=1{,}776\;\text{kg}" />
          <p>Denne massen gjelder overalt — også på månen.</p>
        </Step>
        <Step n={2} title="(a) Tyngde­akselerasjon på månen">
          <FormulaBox latex="g_m=\dfrac{W_m}{m}=\dfrac{3{,}95}{1{,}776}=2{,}22\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="g_m\approx 2{,}22\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(b) Massen på månen">
          <p>Massen er en invariant fysisk størrelse — den endrer seg ikke når man flytter på legemet.</p>
          <FormulaBox variant="gold" latex="m_\text{måne}=m_\text{Jorden}=1{,}78\;\text{kg}" />
        </Step>
        <Pitfall>
          <strong>«Hvor mye veier du på månen?» er en ulydig spørsmåls­formulering.</strong> Vekt
          endrer seg, men <em>masse</em> ikke. Når noen sier «jeg veier 70 kg», mener de egentlig
          «min masse er 70 kg» — på månen ville samme person fortsatt ha 70 kg masse, men bare
          ~115 N vekt (vs. 686 N på Jorden).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: <InlineLatex latex="g_m/g_J=2{,}22/9{,}80=0{,}227" />, dvs. ca. 1/4,4.
          Dette ligger litt over Jordens egen måne (g = 1,62 m/s², ca. 1/6,1) — fra konteksten
          oppgaven angir er det en hypotetisk måne med større tyngde­felt, kanskje en stor måne
          som Ganymed eller Titan.
        </p>
      </div>
    ),
    summary: <p>Masse er invariant; vekt skalerer med lokal g. Bruk Jordens data til å finne masse, så lokal vekt for å finne ny g.</p>,
  },

  "4.17": {
    title: "Superman kaster stein",
    difficulty: "lett",
    pageRef: "s. 153",
    problem: (
      <p>
        Superman kaster en 1650 N stein på en motstander. Hvilken horisontal kraft må Superman utøve
        på steinen for å gi den en horisontal akselerasjon på 13,6 m/s²?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt på Jorden: <InlineLatex latex="W=1650\;\text{N}" /></li>
        <li>Ønsket horisontal akselerasjon: <InlineLatex latex="a=13{,}6\;\text{m/s}^2" /></li>
        <li>g = 9,80 m/s²</li>
      </ul>
    ),
    unknowns: <p>Horisontal kraft F som Superman må utøve.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Når oppgaver gir vekt — finn massen først">
          <p>
            Newton 2 krever <em>masse</em>, ikke vekt. Når oppgaven oppgir vekt på Jorden, må du
            først regne ut massen via:
          </p>
          <FormulaBox variant="gold" latex="m=\dfrac{W}{g}" />
          <p>
            Deretter er F=ma rett fram. Pass på: vekt og kraft har samme enhet (N), men det
            betyr ikke at de er like.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Først: masse fra vekt. Bruk Jordens g siden steinen ligger på Jorden.</p> },
      { label: "Hint 2", content: <p>Tyngdekraften virker vertikalt — den horisontale F må overvinne <em>masse­treghet</em>, ikke vekt.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vekt → masse → Newton 2 for horisontal kraft.</p>
        <Step n={1} title="Masse fra vekt">
          <FormulaBox latex="m=\dfrac{W}{g}=\dfrac{1650}{9{,}80}=168{,}4\;\text{kg}" />
        </Step>
        <Step n={2} title="Horisontal kraft via Newton 2">
          <FormulaBox latex="F=ma=168{,}4(13{,}6)=2290\;\text{N}" />
          <FormulaBox variant="gold" latex="F\approx 2{,}29\;\text{kN}" />
        </Step>
        <Pitfall>
          <strong>Forveksle aldri vekt og kraft i Newton 2.</strong> Hvis du satt
          <InlineLatex latex="\;F=Wa/g" /> uten å innse at <InlineLatex latex="W/g=m" />, ville du
          faktisk få samme svar — men du går glipp av forståelsen. <InlineLatex latex="F=ma" /> krever
          <em>masse</em>; vekt er bare ett spesifikt eksempel på en kraft (tyngdekraften).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 2,29 kN er ca. 1,4× steinens vekt. Det er et helt vanlig forhold når man
          ønsker akselerasjon på størrelses­orden g — uansett om kraften er horisontal eller
          vertikal, må den være sammenlignbar med tyngdekraften for å gi merkbar akselerasjon.
        </p>
      </div>
    ),
    summary: <p>Vekt → masse (via g) → Newton 2 for ønsket akselerasjon.</p>,
  },

  "4.19": {
    title: "Vannmelon på Io",
    difficulty: "lett",
    pageRef: "s. 153",
    problem: (
      <p>
        På overflaten av Jupiters måne Io er akselerasjonen pga gravitasjon
        <InlineLatex latex="\;g=1{,}81\;\text{m/s}^2" />. En vannmelon veier 48,0 N på Jordens overflate.
        (a) Hva er vannmelons masse på Jorden? (b) Hva ville være massen og vekten på Io?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt på Jorden: <InlineLatex latex="W_J=48{,}0\;\text{N}" /></li>
        <li>Tyngde­akselerasjon på Io: <InlineLatex latex="g_\text{Io}=1{,}81\;\text{m/s}^2" /></li>
        <li>Tyngde­akselerasjon på Jorden: <InlineLatex latex="g_J=9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>(a) Massen m på Jorden. (b) Massen og vekten på Io.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Masse vs. vekt — repetisjon">
          <p>
            Masse er invariant. Vekt skalerer lineært med g:
          </p>
          <FormulaBox variant="gold" latex="m=W/g\;\;\text{(invariant)},\;\;W=mg\;\;\text{(lokal)}" />
          <p>
            Når man flytter fra Jorden til Io, er masse­tallet identisk; vekten endres med
            forholdet <InlineLatex latex="\;g_\text{Io}/g_J" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Masse på Jorden = masse på Io = masse i vekt­løs tilstand. Bare g endrer seg.</p> },
      { label: "Hint 2", content: <p>Snarvei: <InlineLatex latex="\;W_\text{Io}=W_J\cdot g_\text{Io}/g_J" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Standard masse-vekt-konvertering.</p>
        <Step n={1} title="(a) Masse">
          <FormulaBox latex="m=\dfrac{W_J}{g_J}=\dfrac{48{,}0}{9{,}80}=4{,}898\;\text{kg}" />
          <FormulaBox variant="gold" latex="m\approx 4{,}90\;\text{kg}" />
        </Step>
        <Step n={2} title="(b) Masse og vekt på Io">
          <p>Masse er invariant: <InlineLatex latex="\;m_\text{Io}=4{,}90\;\text{kg}" /> (uendret).</p>
          <FormulaBox latex="W_\text{Io}=m\cdot g_\text{Io}=4{,}898(1{,}81)=8{,}865\;\text{N}" />
          <FormulaBox variant="gold" latex="W_\text{Io}\approx 8{,}87\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>«Massen ble lavere på Io» er feil.</strong> Massen kan kun endres ved å fysisk
          legge til eller fjerne materie. Å reise fra Jorden til Io endrer omgivelsene (g), ikke
          legemets substans.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: På Io ville vannmelonen «føles» som ca. 0,9 kg på Jorden — ca. 1/5,4
          av sin opprinnelige vekt. Io har omtrent samme størrelse som Jordens måne, og denne
          tyngde­reduksjonen er typisk for små kropper med passe­tett kjerne.
        </p>
      </div>
    ),
    summary: <p>Masse er invariant overalt; vekt skalerer med lokal g via <InlineLatex latex="W=mg" />.</p>,
  },

  "4.21": {
    title: "BIO Sprinter — start fra blokker",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        Sprinter i verdens­klasse kan akselerere ut av start­blokkene med en akselerasjon som er
        nesten horisontal og har størrelse 15 m/s². Hvor stor horisontal kraft må en 45 kg sprinter
        utøve på start­blokkene for å gi denne akselerasjonen? Hvilken kropp utøver kraften som
        driver sprinteren: blokkene eller sprinteren selv?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Sprinter­masse: <InlineLatex latex="m=45\;\text{kg}" /></li>
        <li>Horisontal akselerasjon ut av blokk: <InlineLatex latex="a=15\;\text{m/s}^2" /></li>
        <li>Akselerasjon nesten ren horisontal (ignorer vertikal komponent)</li>
      </ul>
    ),
    unknowns: <p>(a) Kraft F sprinteren må utøve på blokkene. (b) Hvilken kropp utøver kraften som driver sprinteren?</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Newtons tredje lov — handling og motvirkning">
          <p>
            Kraft­par mellom to legemer A og B er alltid like store og motsatt rettet:
          </p>
          <FormulaBox variant="gold" latex="\vec F_\text{A på B}=-\vec F_\text{B på A}" />
          <p>
            Disse to kreftene <strong>virker på forskjellige legemer</strong> — derfor opphever
            de seg ikke. Sprinteren skyver blokkene bakover; blokkene skyver sprinteren framover.
            Det er sistnevnte som driver sprinteren — sprinterens <em>egen</em> kraft virker på
            blokkene, ikke på sprinteren selv.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a): Newton 2 på sprinteren — F = ma. Men hvilken kraft? Den blokkene utøver på sprinteren er den som skal sette inn.</p> },
      { label: "Hint 2", content: <p>For (b): Newton 3-paret er sprinter ↔ blokker. Sprinteren kan ikke skyve seg selv framover; det må komme fra noe ekstern.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Newton 2 gir kraftens størrelse; Newton 3 forteller hvilken kropp som utøver den.</p>
        <Step n={1} title="(a) Kraft­størrelse via Newton 2">
          <FormulaBox latex="F_\text{netto}=ma=45(15)=675\;\text{N}" />
          <FormulaBox variant="gold" latex="F=675\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Hvilken kropp driver sprinteren?">
          <p>
            Sprinteren skyver blokkene <strong>bakover</strong> med 675 N. Per Newton 3 skyver
            blokkene sprinteren <strong>framover</strong> med samme størrelse, 675 N.
          </p>
          <FormulaBox variant="gold" latex="\text{Blokkene driver sprinteren med 675 N framover.}" />
        </Step>
        <Pitfall>
          <strong>«Egen kraft» kan aldri akselerere deg selv.</strong> En vanlig feil er å si at
          sprinteren skyver seg selv framover. Newton 3 forbyr dette: alle interne krefter er
          handle-/motvirknings­par som kanselleres internt. Du trenger noe <em>eksternt</em> å
          dytte mot — bakken, blokkene, vannet, luften.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 675 N er omtrent 1,5× sprinterens vekt (45·9,8=441 N). Det er hvorfor
          start­blokker har spisse, ru overflater — de må kunne overføre kraft &gt; 1× kropps­vekten
          uten å gli. Hadde blokkene vært glatte (lav friksjon), kunne sprinteren ikke utøve nok
          horisontal kraft og ville bare gli bakover.
        </p>
      </div>
    ),
    summary: <p>Newton 3: «driv­kraften» kommer fra det du skyver mot, ikke fra deg selv.</p>,
  },

  "4.23": {
    title: "To kasser A + B i kontakt (Fig E4.23)",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        Kasser A og B står ved siden av hverandre på et friksjons­fritt horisontalt underlag (Fig. E4.23).
        Kasse A har masse 25,0 kg og kasse B har masse 8,0 kg. En horisontal kraft 100 N utøves på kasse A.
        Hva er kraften som A utøver på B?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse kasse A: <InlineLatex latex="m_A=25{,}0\;\text{kg}" /></li>
        <li>Masse kasse B: <InlineLatex latex="m_B=8{,}0\;\text{kg}" /></li>
        <li>Påført kraft på A: <InlineLatex latex="F=100\;\text{N}" /> horisontalt</li>
        <li>Friksjons­fritt underlag</li>
        <li>A og B er i kontakt og beveger seg sammen</li>
      </ul>
    ),
    unknowns: <p>Kraften <InlineLatex latex="F_{AB}" /> som A utøver på B.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="System­vs.-enkelt­legeme-analyse">
          <p>
            <strong>Trinn 1:</strong> Behandle A+B som ett system. Eksterne krefter (her: 100 N
            på A) gir felles akselerasjon:
          </p>
          <FormulaBox variant="gold" latex="a=\dfrac{F_\text{ekstern}}{m_A+m_B}" />
          <p>
            <strong>Trinn 2:</strong> Analyser ett legeme alene. Den indre kontakt­kraften som
            akselererer B er det vi søker:
          </p>
          <FormulaBox latex="F_{AB}=m_B\cdot a" />
          <p>
            Newton 3: <InlineLatex latex="\;F_{BA}=-F_{AB}" /> (B skyver A bakover med samme
            størrelse).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Felles akselerasjon: total kraft på systemet delt på total masse.</p> },
      { label: "Hint 2", content: <p>For å finne <InlineLatex latex="F_{AB}" />: betrakt B alene. Den eneste horisontale kraften på B er kontakt­kraften fra A.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">System­analyse for a, så Newton 2 på B alene for indre kraft.</p>
        <Step n={1} title="System: felles akselerasjon">
          <FormulaBox latex="a=\dfrac{F}{m_A+m_B}=\dfrac{100}{25{,}0+8{,}0}=\dfrac{100}{33{,}0}=3{,}03\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Newton 2 på B alene">
          <p>Eneste horisontale kraft på B er <InlineLatex latex="F_{AB}" /> (fra A):</p>
          <FormulaBox latex="F_{AB}=m_B\cdot a=8{,}0(3{,}03)=24{,}2\;\text{N}" />
          <FormulaBox variant="gold" latex="F_{AB}\approx 24{,}2\;\text{N}" />
        </Step>
        <Step n={3} title="Sjekk: Newton 2 på A alene">
          <p>Krefter på A: +100 N (ekstern) og <InlineLatex latex="-F_{BA}=-24{,}2\;\text{N}" /> (fra B):</p>
          <FormulaBox latex="F_\text{netto, A}=100-24{,}2=75{,}8\;\text{N}=m_A\cdot a=25{,}0(3{,}03)=75{,}8\;\text{N}\;\checkmark" />
        </Step>
        <Pitfall>
          <strong>Kraften A utøver på B er ikke 100 N.</strong> En vanlig feil er å tenke at hele
          den ytre kraften «pumper igjennom» kontaktet. Nei: 100 N akselererer hele systemet (33
          kg), mens bare en mindre del av denne kraften (24,2 N) er nødvendig for å akselerere
          B (8 kg) alene.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Forholdet <InlineLatex latex="\;F_{AB}/F=8/(25+8)=8/33=0{,}242" /> —
          B mottar nøyaktig den brøkdelen av kraften som tilsvarer dens andel av total masse.
          Dette er en generell regel for kjeder av legemer i kontakt.
        </p>
      </div>
    ),
    summary: <p>To-legeme-system: total kraft / total masse for a, så kraft per legeme = m_legeme · a.</p>,
  },

  "4.25": {
    title: "Student hopper fra springbrett",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        En 45 kg student hopper av et høyt sviktstup. Hva er akselerasjonen til Jorda mot studenten,
        gitt at studenten har akselerasjon 9,8 m/s² mot Jorda? Bruk <InlineLatex latex="6{,}0\times 10^{24}\;\text{kg}" />
        for Jordens masse, og forutsetter at netto­kraft på Jorda er tyngde­kraften som studenten utøver på den.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Student­masse: <InlineLatex latex="m_S=45\;\text{kg}" /></li>
        <li>Jord­masse: <InlineLatex latex="m_J=6{,}0\times 10^{24}\;\text{kg}" /></li>
        <li>Studentens akselerasjon mot Jorden: <InlineLatex latex="a_S=9{,}8\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Jordens akselerasjon <InlineLatex latex="a_J" /> mot studenten.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Newton 3 mellom ujevne partnere">
          <p>
            Tyngdekraften mellom student og Jord er et Newton 3-par:
          </p>
          <FormulaBox variant="gold" latex="\vec F_\text{J på S}=-\vec F_\text{S på J}" />
          <p>
            Begge har samme størrelse F. Men akselerasjonen er
            <InlineLatex latex="\;a=F/m" />, så forholdet mellom akselerasjonene er
            <InlineLatex latex="\;a_S/a_J=m_J/m_S" /> — invertert masse­forhold.
          </p>
          <p>
            Resultatet: tyngste partner får forsvinnende liten akselerasjon. Det er hvorfor
            «Jorden faller mot deg» ikke er observerbart.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Beregn først kraften studenten utøver: F = m_S · g = m_S · a_S.</p> },
      { label: "Hint 2", content: <p>Newton 3: Jorden opplever samme kraft. Bruk så a_J = F / m_J.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Newton 3 gir lik kraft på begge; m_J er enorm ⇒ a_J forsvinnende liten.</p>
        <Step n={1} title="Tyngdekraften studenten utøver på Jorden">
          <FormulaBox latex="F=m_S\cdot g=45(9{,}8)=441\;\text{N}" />
        </Step>
        <Step n={2} title="Jordens akselerasjon (Newton 2)">
          <FormulaBox latex="a_J=\dfrac{F}{m_J}=\dfrac{441}{6{,}0\times 10^{24}}=7{,}35\times 10^{-23}\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a_J\approx 7{,}4\times 10^{-23}\;\text{m/s}^2" />
        </Step>
        <Pitfall>
          <strong>Newton 3 betyr ikke lik akselerasjon — bare lik kraft.</strong> Hvis du tror at
          to legemer som skyver hverandre må få samme akselerasjon, har du blandet sammen Newton
          3 med en feilforestilling. Akselerasjonen er <InlineLatex latex="F/m" />; ulik masse
          gir ulik a selv ved lik kraft.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Jordens forskyvning under hele falltiden (~1 s) er
          <InlineLatex latex="\;\tfrac12 a_J t^2 \sim 4\times 10^{-23}\;\text{m}" /> — mye mindre
          enn én proton-radius (10⁻¹⁵ m). Dette er hvorfor vi i praksis behandler Jorden som
          uendelig massiv: dens respons er fundamentalt umålelig. På den annen side ville to
          like masser (f.eks. binær­stjerner) opplever <em>like store</em> akselerasjoner i
          motsatte retninger.
        </p>
      </div>
    ),
    summary: <p>Newton 3 gir like kraft­størrelser; ulike masser gir omvendt proporsjonale akselerasjoner.</p>,
  },

  "4.26": {
    title: "FBD blokk på blokk (Fig E4.26)",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        Du drar horisontalt på blokk B i Fig. E4.26, slik at både A (på toppen) og B (under) beveger seg
        sammen som én enhet. For dette beveget systemet, lag et nøye merket frilegeme­diagram av
        blokk A hvis (a) bordet er friksjons­fritt og (b) det er friksjon mellom blokk B og bordet, og
        trekket er like stort som friksjons­kraften på B fra bordet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>A ligger oppå B; B ligger på bordet</li>
        <li>Trekk­kraft virker horisontalt på B</li>
        <li>A og B beveger seg sammen (samme akselerasjon)</li>
      </ul>
    ),
    unknowns: <p>FBD for A i to ulike friksjons­scenarier (a) og (b).</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Frilegeme­diagram (FBD) — to-blokk-system">
          <p>
            For å tegne FBD: identifiser alle krefter <em>som virker på legemet</em>, ikke krefter
            legemet utøver på andre. På den øvre blokken A virker:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Tyngdekraft fra Jorden: <InlineLatex latex="\;m_A g" /> nedover</li>
            <li>Normalkraft fra B: <InlineLatex latex="\;N" /> oppover</li>
            <li>Eventuell friksjon fra B: horisontalt</li>
          </ul>
          <p>
            <strong>Nøkkel:</strong> A blir <em>aldri</em> berørt av bordet eller trekk­kraften
            direkte — bare via B. Derfor opptrer disse aldri på FBD for A.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a): hva må trekke A horisontalt? Bare A skal akselerere — så trengs det en horisontal kraft på A.</p> },
      { label: "Hint 2", content: <p>For (b): er det netto akselerasjon? Hvis a=0, hvilken horisontal kraft trengs på A? Newton 1 gir svaret.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">FBD for A i to scenarier — ser hvordan friksjons­behovet endres med systemets akselerasjon.</p>
        <Step n={1} title="(a) Friksjons­fritt bord — systemet akselererer">
          <p>
            Bord er friksjons­fritt ⇒ trekk­kraften alene gir akselerasjon
            <InlineLatex latex="\;a=F_\text{trekk}/(m_A+m_B)" />. Begge blokkene har samme a.
          </p>
          <p><strong>Krefter på A (FBD):</strong></p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\;\vec W_A=m_A g" /> nedover (tyngde)</li>
            <li><InlineLatex latex="\;\vec N" /> oppover fra B (normalkraft)</li>
            <li><InlineLatex latex="\;\vec f_{BA}" /> horisontalt i bevegelses­retningen (friksjon fra B)</li>
          </ul>
          <p>
            Friksjonen mellom A og B er den eneste mekanismen som kan akselerere A — uten den ville
            B bare gli ut under A.
          </p>
        </Step>
        <Step n={2} title="(b) Friksjon B-bord lik trekk-kraft — systemet i likevekt">
          <p>
            Netto horisontal kraft på systemet = trekk − friksjon = 0 ⇒ a = 0 (Newton 1: konstant
            fart eller hvile).
          </p>
          <p><strong>Krefter på A (FBD):</strong></p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\;\vec W_A=m_A g" /> nedover</li>
            <li><InlineLatex latex="\;\vec N" /> oppover fra B</li>
            <li><strong>Ingen friksjon</strong> mellom A og B (a=0 ⇒ ingen horisontal kraft trengs på A)</li>
          </ul>
          <FormulaBox variant="gold" latex="\text{(a) friksjon på A driver bevegelse; (b) ingen friksjon mellom A og B}" />
        </Step>
        <Pitfall>
          <strong>Friksjon mellom to bevegende flater er ikke alltid kinetisk.</strong> I tilfelle
          (a) er det <em>statisk friksjon</em> som virker mellom A og B (ingen relativ glidning;
          de beveger seg sammen). Statisk friksjon justerer seg automatisk til hva som trengs —
          her: akkurat <InlineLatex latex="\;m_A\cdot a" />.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Hvis trekk­kraften blir for stor i (a), vil statisk friksjon mellom A
          og B ikke klare å holde dem sammen, og A vil gli bakover på B. Maks tillatt akselerasjon
          uten glidning er <InlineLatex latex="\;a_\text{max}=\mu_s g" /> der μ_s er statisk
          friksjons­koeffisient mellom A og B.
        </p>
      </div>
    ),
    summary: <p>FBD krever å holde rede på <em>hvilket</em> legeme du analyserer. Indre kontaktkrefter (her: friksjon A↔B) avhenger av om systemet akselererer.</p>,
  },

  "4.27": {
    title: "FBD for kasser A og B",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        Kasser A og B står ved siden av hverandre i ro på et friksjons­fritt horisontalt gulv. Massene er
        <InlineLatex latex="\;m_A" /> og <InlineLatex latex="m_B" />. En horisontal kraft <InlineLatex latex="\vec F" />
        utøves på kasse A og de to kassene beveger seg av sted mot høyre. (a) Tegn frilegeme­diagrammer for
        hver av A og B. (b) Hvis F er mindre enn samlet vekt av de to kassene, vil dette føre til at
        kassene beveger seg? Forklar.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kasser A og B i ro side ved side, A til venstre for B</li>
        <li>Massene <InlineLatex latex="m_A,\;m_B" /></li>
        <li>Horisontal trekk­kraft <InlineLatex latex="\vec F" /> på A, mot høyre</li>
        <li>Friksjons­fritt gulv</li>
      </ul>
    ),
    unknowns: <p>(a) FBD for A og B. (b) Bevegelse hvis F mindre enn samlet vekt?</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="FBD for to-blokk-system + ortogonalitet">
          <p>
            For hvert legeme: tegn alle krefter <em>som virker på det</em>. Newton 3 binder
            kontakt­kreftene mellom A og B sammen:
          </p>
          <FormulaBox variant="gold" latex="\vec F_{AB}=-\vec F_{BA}" />
          <p>
            Kraftens retning bestemmer hvilken akse den virker på. Vertikal vekt påvirker ikke
            horisontal bevegelse (de er ortogonale) — derfor er F's størrelse i forhold til vekten
            irrelevant for spørsmålet om bevegelse.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn x- og y-akse, listfør alle krefter med riktig retning.</p> },
      { label: "Hint 2", content: <p>Vertikal og horisontal er uavhengige akser — sammenligning av F med vekt er meningsløs i fri­krops-analyse.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">FBD per blokk + Newton 3 i kontakt­flaten.</p>
        <Step n={1} title="(a) FBD for A">
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\;\vec W_A=m_A g" /> nedover (tyngde fra Jorden)</li>
            <li><InlineLatex latex="\;\vec N_A" /> oppover (normalkraft fra gulv)</li>
            <li><InlineLatex latex="\;\vec F" /> mot høyre (ekstern trekk­kraft)</li>
            <li><InlineLatex latex="\;\vec F_{BA}" /> mot venstre (kontakt­kraft fra B på A)</li>
          </ul>
        </Step>
        <Step n={2} title="(a) FBD for B">
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\;\vec W_B=m_B g" /> nedover</li>
            <li><InlineLatex latex="\;\vec N_B" /> oppover (normalkraft fra gulv)</li>
            <li><InlineLatex latex="\;\vec F_{AB}" /> mot høyre (kontakt­kraft fra A på B)</li>
          </ul>
          <p>Newton 3-par: <InlineLatex latex="\;\vec F_{AB}=-\vec F_{BA}" />.</p>
        </Step>
        <Step n={3} title="(b) Vil systemet bevege seg hvis F &lt; total vekt?">
          <p>
            Total vekt <InlineLatex latex="\;(m_A+m_B)g" /> virker <em>vertikalt</em>. F virker
            <em>horisontalt</em>. Vertikal balanseres av normalkraftene fra gulvet. Friksjons­fritt
            gulv ⇒ <strong>ingen horisontal motkraft</strong> ⇒ enhver F &gt; 0 gir akselerasjon
            <InlineLatex latex="\;a=F/(m_A+m_B)" />.
          </p>
          <FormulaBox variant="gold" latex="\text{Ja, kassene beveger seg uansett om F er større eller mindre enn den vertikale vekten.}" />
        </Step>
        <Pitfall>
          <strong>Sammenligne ortogonale kraft­størrelser er meningsløs.</strong> Spørsmålet «er
          F &lt; vekt?» blander to uavhengige akser. Tenk på det som å spørre «er hastigheten
          mindre enn temperaturen?» — det er ulike fysiske størrelser med ingen direkte
          sammenligning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Det er friksjon — ikke vekt — som typisk hindrer bevegelse på et
          horisontalt underlag. På virkelige gulv ville systemet bare bevege seg hvis F overstiger
          maks statisk friksjon, <InlineLatex latex="\;F&gt;\mu_s(m_A+m_B)g" />. Friksjons­fri
          idealisering setter denne terskelen til 0.
        </p>
      </div>
    ),
    summary: <p>FBD per blokk; Newton 3 i kontakt­flaten; friksjons­fritt ⇒ enhver horisontal kraft gir bevegelse.</p>,
  },

  "4.30": {
    title: "Stol på gulv — FBD og normalkraft",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        En stol med masse 13,5 kg sitter på det horisontale gulvet; gulvet er ikke friksjons­fritt.
        Du skyver på stolen med en kraft <InlineLatex latex="F=35{,}0\;\text{N}" /> som er rettet i en
        vinkel 38,0° under horisontalen, og stolen sklir langs gulvet. (a) Tegn et nøye merket
        frilegeme­diagram for stolen. (b) Bruk diagrammet og Newtons lover til å regne ut normal­kraften
        som gulvet utøver på stolen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Stol­masse: <InlineLatex latex="m=13{,}5\;\text{kg}" /></li>
        <li>Skyvekraft: <InlineLatex latex="F=35{,}0\;\text{N}" /></li>
        <li>Vinkel under horisontalen: 38,0°</li>
        <li>Stolen sklir (kinetisk friksjon, men her trenger vi bare N)</li>
      </ul>
    ),
    unknowns: <p>(a) FBD for stolen. (b) Normal­kraften N fra gulvet.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vertikal balanse + vinkel-rettet kraft">
          <p>
            Når en kraft virker i en vinkel under horisontalen, bidrar dens vertikale komponent
            til å presse legemet mot underlaget — og <em>øker</em> normal­kraften:
          </p>
          <FormulaBox variant="gold" latex="N=mg+F\sin\theta\quad(\theta\text{ under horisontal})" />
          <p>
            Hadde kraften isteden vært over horisontalen, hadde den vertikale komponenten <em>løftet</em>
            stolen, og N ville blitt redusert: <InlineLatex latex="\;N=mg-F\sin\theta" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Akselerasjonen er bare horisontal (stolen sklir på gulvet) ⇒ vertikal sum av krefter = 0.</p> },
      { label: "Hint 2", content: <p>F sin 38° er den vertikale komponenten — peker nedover når kraften går «under horisontal».</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">FBD så vertikal balanse for N.</p>
        <Step n={1} title="(a) FBD for stolen">
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\;\vec W=mg" /> nedover (tyngde)</li>
            <li><InlineLatex latex="\;\vec N" /> oppover (normalkraft fra gulv)</li>
            <li><InlineLatex latex="\;\vec F" /> retning 38° under horisontal — komponentene er
              <InlineLatex latex="\;F_x=F\cos 38°" /> mot høyre og
              <InlineLatex latex="\;F_y=-F\sin 38°" /> nedover</li>
            <li><InlineLatex latex="\;\vec f_k=\mu_k N" /> mot venstre (kinetisk friksjon)</li>
          </ul>
        </Step>
        <Step n={2} title="(b) Vertikal balanse — ingen vertikal akselerasjon">
          <FormulaBox latex="\sum F_y=N-mg-F\sin 38°=0" />
          <FormulaBox latex="N=mg+F\sin 38°" />
          <FormulaBox latex="N=13{,}5(9{,}80)+35{,}0\sin 38°=132{,}3+35{,}0(0{,}6157)" />
          <FormulaBox latex="N=132{,}3+21{,}55=153{,}9\;\text{N}" />
          <FormulaBox variant="gold" latex="N\approx 154\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>N er ikke alltid lik mg.</strong> En vanlig snarvei er å skrive N = mg uansett.
          Det stemmer bare når ingen andre vertikale krefter virker på legemet. Her øker N med
          21,5 N pga skyve­kraftens nedover-komponent — det øker også friksjonen merkbart.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Hadde du isteden trukket stolen i samme vinkel <em>over</em>
          horisontalen, ville N = mg − F sin 38° = 110,8 N — friksjonen ville da vært
          (110,8/153,9) = 72 % av nåværende, og stolen ville glidd mye lettere. Dette er hvorfor
          møblerings­bransjen anbefaler å løfte/trekke ting framfor å skyve dem.
        </p>
      </div>
    ),
    summary: <p>Vinklet kraft påvirker N: under horisontalen ⇒ N øker; over horisontalen ⇒ N minker.</p>,
  },

  "4.32": {
    title: "CP Vekt på Planet X",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        Du har akkurat landet på Planet X. Du slipper en 100 g ball fra ro fra en høyde 13,5 m og måler
        at det tar 2,10 s å nå bakken. Ignorer kraft fra atmosfæren på ballen. Hva veier 100 g-ballen på
        overflaten av Planet X?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Ball­masse: <InlineLatex latex="m=100\;\text{g}=0{,}100\;\text{kg}" /></li>
        <li>Slipphøyde: <InlineLatex latex="h=13{,}5\;\text{m}" /></li>
        <li>Falltid: <InlineLatex latex="t=2{,}10\;\text{s}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=0" /> (slippes fra ro)</li>
        <li>Atmosfære­motstand ignoreres</li>
      </ul>
    ),
    unknowns: <p>Vekt W til ballen på Planet X.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Måle lokal g via fritt fall">
          <p>
            Et fritt fall fra ro følger <InlineLatex latex="\;h=\tfrac12 gt^2" />, der g er den
            lokale tyngde­akselerasjonen. Det gir oss en operasjonell metode for å måle g på
            ukjente planeter:
          </p>
          <FormulaBox variant="gold" latex="g_\text{lokal}=\dfrac{2h}{t^2}" />
          <p>Så følger vekt fra <InlineLatex latex="\;W=mg" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bruk fri-falls-formelen baklengs for å finne g_X.</p> },
      { label: "Hint 2", content: <p>Med g_X kjent: vekten er bare m·g_X, akkurat som på Jorden men med ny g.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Falltid → g_X → vekt.</p>
        <Step n={1} title="Tyngde­akselerasjon på Planet X">
          <FormulaBox latex="h=\tfrac12 g_X t^2\Rightarrow g_X=\dfrac{2h}{t^2}=\dfrac{2(13{,}5)}{(2{,}10)^2}=\dfrac{27{,}0}{4{,}41}" />
          <FormulaBox latex="g_X=6{,}12\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Vekt på Planet X">
          <FormulaBox latex="W=mg_X=0{,}100(6{,}12)=0{,}612\;\text{N}" />
          <FormulaBox variant="gold" latex="W\approx 0{,}612\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Vekten er en kraft, ikke en masse.</strong> Mange er fristet til å oppgi svaret
          som «100 g», men oppgaven spør eksplisitt etter vekten — som er kraften (i newton)
          tyngdefeltet utøver på ballen.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: g_X = 6,12 m/s² er ca. 62 % av Jordens g. Dette ligner på Mars
          (3,71 m/s²) eller Venus (8,87 m/s²) — det vil avhenge av planetens masse og radius via
          <InlineLatex latex="\;g=GM/R^2" />. Mottak fra fritt fall er den enkleste in-situ-måten
          å karakterisere et nytt himmel­legeme.
        </p>
      </div>
    ),
    summary: <p>Fritt fall gir lokal g: <InlineLatex latex="g=2h/t^2" />. Deretter <InlineLatex latex="W=mg" />.</p>,
  },

  "4.33": {
    title: "Bøtte med vann opp i tau",
    difficulty: "middels",
    pageRef: "s. 153",
    problem: (
      <p>
        En 4,40 kg bøtte med vann akselereres oppover ved en lett, tøyelig snor med brudd­styrke 74,0 N.
        Hvis bøtta starter fra ro, hva er minste tid for å heve bøtta vertikalt 14,0 m uten å bryte snora?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=4{,}40\;\text{kg}" /></li>
        <li>Brudd­spenning: <InlineLatex latex="T_\text{max}=74{,}0\;\text{N}" /></li>
        <li>Hev­høyde: <InlineLatex latex="h=14{,}0\;\text{m}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=0" /></li>
        <li>Lett, tøyelig (= ideelt) snor — masse­løs, urekkelig</li>
      </ul>
    ),
    unknowns: <p>Minste tid for å heve bøtta uten å bryte snora.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Spenning og vekt — maks tillatt akselerasjon">
          <p>
            For en bøtte i akselerasjon oppover, gir Newton 2 (med +y opp):
          </p>
          <FormulaBox variant="gold" latex="T-mg=ma\Rightarrow T=m(g+a)" />
          <p>
            Maks T ⇒ maks a. For raskeste mulig løft (uten å bryte snora) settes
            <InlineLatex latex="\;T=T_\text{max}" />. Standard kinematikk fra ro gir så
            tiden:
          </p>
          <FormulaBox latex="h=\tfrac12 at^2\Rightarrow t=\sqrt{\dfrac{2h}{a}}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Snora bryter ved T &gt; 74 N. Maksimal tillatt akselerasjon kommer ved T = 74 N (akkurat på grensen).</p> },
      { label: "Hint 2", content: <p>Beregn først a_max fra <InlineLatex latex="T_\text{max}-mg=ma_\text{max}" />, så bruk kinematikk for tiden.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Maks T → maks a → min t via kinematikk fra ro.</p>
        <Step n={1} title="Maks akselerasjon">
          <FormulaBox latex="T_\text{max}-mg=ma_\text{max}" />
          <FormulaBox latex="a_\text{max}=\dfrac{T_\text{max}-mg}{m}=\dfrac{74{,}0-(4{,}40)(9{,}80)}{4{,}40}" />
          <FormulaBox latex="a_\text{max}=\dfrac{74{,}0-43{,}12}{4{,}40}=\dfrac{30{,}88}{4{,}40}=7{,}018\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Min tid via kinematikk fra ro">
          <FormulaBox latex="t=\sqrt{\dfrac{2h}{a_\text{max}}}=\sqrt{\dfrac{2(14{,}0)}{7{,}018}}=\sqrt{3{,}99}=2{,}00\;\text{s}" />
          <FormulaBox variant="gold" latex="t_\text{min}\approx 2{,}00\;\text{s}" />
        </Step>
        <Step n={3} title="Sjekk: slutt­fart">
          <FormulaBox latex="v=a_\text{max}\cdot t=7{,}018(2{,}00)=14{,}04\;\text{m/s}" />
          <p className="text-sm">Det betyr ca. 50 km/t — bøtta beveger seg svært raskt på slutten.</p>
        </Step>
        <Pitfall>
          <strong>Glem ikke å trekke fra vekten i T-formelen.</strong> Ved akselerasjon oppover
          er <InlineLatex latex="\;T=m(g+a)" />, ikke bare ma. Hvis du bare hadde regnet
          <InlineLatex latex="\;a=T/m=74/4{,}4=16{,}8\;\text{m/s}^2" />, ville svaret blitt 1,29
          s — feil med 36 %.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Brudd­styrken 74 N tilsvarer akkurat 1,71× bøttens vekt — så snora kan
          tåle bare 71 % over statisk last. Dette er hvorfor man må heve med <em>jevn</em> kraft
          uten rykk: en plutselig akselerasjon kan multiplisere kraften langt over T_max momentant.
        </p>
      </div>
    ),
    summary: <p>Spenning oppover: <InlineLatex latex="T-mg=ma" />. Maks T → maks a → min løfte­tid.</p>,
  },

  "4.35": {
    title: "Voksne og barn skyver vogn (Fig P4.35)",
    difficulty: "vanskelig",
    pageRef: "s. 154",
    problem: (
      <p>
        To voksne og et barn vil skyve en hjult vogn i +x-retning som vist i Fig. P4.35. De to voksne
        skyver med horisontale krefter <InlineLatex latex="\vec F_1=100\;\text{N}" /> ved 60° over +x og
        <InlineLatex latex="\;\vec F_2=140\;\text{N}" /> ved 30° under +x. Se bort fra friksjon.
        (a) Finn størrelsen og retningen til den minste kraften som barnet bør utøve. (b) Hvis barnet
        utøver minimum kraften beregnet i (a), akselerer vogna 2,0 m/s² i +x-retning. Hva er vognens vekt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec F_1=100\;\text{N}" />, 60° over +x</li>
        <li><InlineLatex latex="\vec F_2=140\;\text{N}" />, 30° under +x</li>
        <li>Akselerasjon: <InlineLatex latex="\vec a=2{,}0\;\text{m/s}^2" /> i +x</li>
        <li>Friksjons­fritt; ingen y-akselerasjon</li>
        <li>g = 9,80 m/s²</li>
      </ul>
    ),
    unknowns: <p>(a) Minste kraft barnet må utøve (størrelse + retning). (b) Vognens vekt.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="«Min kraft» = bare det som trengs for å gi rett bevegelse">
          <p>
            Akselerasjonen er <em>ren +x</em> — ingen y-akselerasjon. Krav fra Newton 2:
          </p>
          <FormulaBox variant="gold" latex="\sum F_y=0,\quad \sum F_x=ma" />
          <p>
            For at <InlineLatex latex="\;\sum F_y=0" />, må barnet kansellere de voksnes netto
            y-komponent. Dette gir <em>minste</em> mulig barn­kraft (en større kraft ville også
            bidra unødig i x-retning).
          </p>
          <p>
            Når barn­kraften er bestemt, gir x-balansen vognens masse, og dermed vekten.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Dekomponer F_1 og F_2 i x og y. F_1 har positiv y; F_2 har negativ y.</p> },
      { label: "Hint 2", content: <p>Barnets minste kraft er ren y-komponent (ingen unødig x-bidrag) — i motsatt retning av nettoen fra de voksne.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Dekomponering, så y-balanse for barnet, så x-balanse for masse.</p>
        <Step n={1} title="Komponenter for de voksne">
          <FormulaBox latex="F_{1x}=100\cos 60°=100(0{,}500)=50{,}0\;\text{N}" />
          <FormulaBox latex="F_{1y}=+100\sin 60°=+100(0{,}866)=+86{,}6\;\text{N}" />
          <FormulaBox latex="F_{2x}=140\cos 30°=140(0{,}866)=121{,}2\;\text{N}" />
          <FormulaBox latex="F_{2y}=-140\sin 30°=-140(0{,}500)=-70{,}0\;\text{N}" />
        </Step>
        <Step n={2} title="(a) Barnets kraft — y-balanse">
          <FormulaBox latex="\sum F_y=F_{1y}+F_{2y}+F_\text{barn,y}=0" />
          <FormulaBox latex="86{,}6-70{,}0+F_\text{barn,y}=0\Rightarrow F_\text{barn,y}=-16{,}6\;\text{N}" />
          <p>Barnet bør utøve kraften ren y — minste størrelse:</p>
          <FormulaBox variant="gold" latex="F_\text{barn}=16{,}6\;\text{N i -y-retning (motsatt av netto fra voksne)}" />
        </Step>
        <Step n={3} title="(b) Vognens masse fra x-balanse">
          <FormulaBox latex="\sum F_x=F_{1x}+F_{2x}+F_\text{barn,x}=50{,}0+121{,}2+0=171{,}2\;\text{N}" />
          <FormulaBox latex="m=\dfrac{\sum F_x}{a}=\dfrac{171{,}2}{2{,}0}=85{,}6\;\text{kg}" />
        </Step>
        <Step n={4} title="(b) Vognens vekt">
          <FormulaBox latex="W=mg=85{,}6(9{,}80)=839\;\text{N}" />
          <FormulaBox variant="gold" latex="W\approx 839\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>«Minste kraft» betyr ikke «minste samlede sum».</strong> Hvis barnet hadde dratt
          med en kraft i en annen vinkel (f.eks. delvis +x), ville |F_barn| måtte vært større for
          å holde y-balanse. Minste kraft­størrelse kommer ved ren motvirknings­retning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Barnet bidrar 0 % til frem­drift, men er essensiell for at bevegelsen
          skal være ren langs +x. Hadde barnet ikke vært der, ville vognen avveke fra +x-retningen
          og aksele­rere skrått. Dette illustrerer hvorfor selv små «hjelpe­kreftene» kan være
          avgjørende for kontroll i vektor­problemer.
        </p>
      </div>
    ),
    summary: <p>«Minste kraft» kommer ved ren motvirknings­retning. Vektor­balanse i x og y separat gir både kraft og masse.</p>,
  },

  "4.49": {
    title: "CP CALC: Rakett-objekt med F=15,5·t",
    difficulty: "vanskelig",
    pageRef: "s. 155",
    problem: (
      <p>
        Et mysteriøst rakett-drevet objekt med masse 49,5 kg ligger først i ro i midten av en horisontal,
        friksjons­fri is­dekket innsjø. En kraft rettet østover med størrelse <InlineLatex latex="F(t)=(15{,}5\;\text{N/s})t" />
        anvendes. Hvor langt går objektet på de første 4,25 s etter at kraften er anvendt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=49{,}5\;\text{kg}" /></li>
        <li>Kraft: <InlineLatex latex="F(t)=(15{,}5\;\text{N/s})t" /></li>
        <li>Tid: <InlineLatex latex="t=4{,}25\;\text{s}" /></li>
        <li>Initial­tilstand: i ro ved origo</li>
        <li>Friksjons­fri is</li>
      </ul>
    ),
    unknowns: <p>Avstand objektet har gått etter 4,25 s.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Tids­avhengig kraft — integrér to ganger">
          <p>
            Når <InlineLatex latex="\;F=F(t)" /> ikke er konstant, er heller ikke akselerasjonen
            konstant. Newton 2 gir
            <InlineLatex latex="\;a(t)=F(t)/m" />, og avstand finnes ved doble integrasjon:
          </p>
          <FormulaBox variant="gold" latex="v(t)=v_0+\int_0^t a(t')\,dt',\;\;x(t)=x_0+\int_0^t v(t')\,dt'" />
          <p>
            For en lineær kraft i t blir <InlineLatex latex="a\propto t" />, så
            <InlineLatex latex="\;v\propto t^2" /> og <InlineLatex latex="\;x\propto t^3" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Newton 2: <InlineLatex latex="a(t)=F(t)/m=(15{,}5/49{,}5)t=0{,}3131\,t" />.</p> },
      { label: "Hint 2", content: <p>Integrér: <InlineLatex latex="\int t\,dt=t^2/2" />, <InlineLatex latex="\int t^2 dt=t^3/3" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Newton 2 → akselerasjon → integrér to ganger.</p>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a(t)=\dfrac{F(t)}{m}=\dfrac{15{,}5\,t}{49{,}5}=0{,}3131\,t\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Hastighet (start fra ro)">
          <FormulaBox latex="v(t)=\int_0^t 0{,}3131\,t'\,dt'=0{,}3131\cdot\dfrac{t^2}{2}=0{,}1566\,t^2\;\text{m/s}" />
        </Step>
        <Step n={3} title="Posisjon (start fra origo)">
          <FormulaBox latex="x(t)=\int_0^t 0{,}1566\,t'^2\,dt'=0{,}1566\cdot\dfrac{t^3}{3}=0{,}0522\,t^3\;\text{m}" />
        </Step>
        <Step n={4} title="Sett inn t=4,25 s">
          <FormulaBox latex="x(4{,}25)=0{,}0522\cdot(4{,}25)^3=0{,}0522(76{,}77)=4{,}007\;\text{m}" />
          <FormulaBox variant="gold" latex="x\approx 4{,}01\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Bruk ikke standard kinematikk her.</strong> Formler som
          <InlineLatex latex="\;x=\tfrac12 at^2" /> forutsetter <em>konstant</em> a. Med
          <InlineLatex latex="\;a\propto t" /> blir riktig posisjon t³/3 (ikke t²/2). Forholdet
          (1/3)/(1/2) = 2/3 — så feil­svar ville vært 50 % for stort.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Ved t=4,25 s er kraften
          <InlineLatex latex="\;F=15{,}5(4{,}25)=65{,}9\;\text{N}" /> og hastigheten
          <InlineLatex latex="\;v=0{,}1566(4{,}25)^2=2{,}83\;\text{m/s}" />. Kraften vokser lineært
          fordi denne typen «mystisk rakett» har drivstoffs­strøm proporsjonal med tid — typisk
          for moderne raketter under start­fase, der drivstoff­ventiler åpnes gradvis.
        </p>
      </div>
    ),
    summary: <p>Tids­avhengig kraft: <InlineLatex latex="\;F(t)/m=a(t)" />, integrér to ganger med fri start­betingelser.</p>,
  },

  "4.52": {
    title: "CALC: trenings­helikopter — netto kraft",
    difficulty: "vanskelig",
    pageRef: "s. 155",
    problem: (
      <p>
        Posisjonen til et trenings­helikopter (vekt <InlineLatex latex="2{,}75\times 10^{5}\;\text{N}" />)
        i en test er gitt av <InlineLatex latex="\;\vec r=(0{,}020\;\text{m/s}^3)t^3\,\hat i+(2{,}2\;\text{m/s})t\,\hat j-(0{,}060\;\text{m/s}^2)t^2\,\hat k" />.
        Finn netto kraft på helikopteret ved <InlineLatex latex="\;t=5{,}0\;\text{s}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt: <InlineLatex latex="W=2{,}75\times 10^5\;\text{N}" /></li>
        <li><InlineLatex latex="\vec r(t)=(0{,}020\,t^3)\hat i+(2{,}2\,t)\hat j-(0{,}060\,t^2)\hat k\;\text{m}" /></li>
        <li>Tids­punkt: <InlineLatex latex="\;t=5{,}0\;\text{s}" /></li>
        <li>g = 9,80 m/s²</li>
      </ul>
    ),
    unknowns: <p>Netto kraft <InlineLatex latex="\vec F" /> på helikopteret ved t=5,0 s.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vektor­akselerasjon → vektor­kraft">
          <p>
            For et legeme i 3D er Newton 2 en vektor­ligning:
          </p>
          <FormulaBox variant="gold" latex="\vec F_\text{netto}=m\vec a,\quad \vec a=\dfrac{d^2\vec r}{dt^2}" />
          <p>
            Deriver hver komponent av <InlineLatex latex="\;\vec r(t)" /> to ganger for å få
            <InlineLatex latex="\;\vec a(t)" />, så multipliser med m. Massen finnes fra vekten:
            <InlineLatex latex="\;m=W/g" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver komponentvis: <InlineLatex latex="d^2(t^n)/dt^2=n(n-1)t^{n-2}" />.</p> },
      { label: "Hint 2", content: <p>Konstant- og lineær­ledd i r forsvinner ved andre derivasjon — bare t² og t³ overlever.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vekt → masse → andre derivert → kraft.</p>
        <Step n={1} title="Masse">
          <FormulaBox latex="m=\dfrac{W}{g}=\dfrac{2{,}75\times 10^5}{9{,}80}=2{,}806\times 10^4\;\text{kg}\approx 28\,061\;\text{kg}" />
        </Step>
        <Step n={2} title="Hastighet (1. derivasjon)">
          <FormulaBox latex="\vec v(t)=\dfrac{d\vec r}{dt}=(0{,}060\,t^2)\hat i+(2{,}2)\hat j-(0{,}120\,t)\hat k" />
        </Step>
        <Step n={3} title="Akselerasjon (2. derivasjon)">
          <FormulaBox latex="\vec a(t)=\dfrac{d\vec v}{dt}=(0{,}120\,t)\hat i+(0)\hat j-(0{,}120)\hat k" />
          <FormulaBox latex="\vec a(5{,}0)=(0{,}600)\hat i+0\hat j-(0{,}120)\hat k\;\text{m/s}^2" />
        </Step>
        <Step n={4} title="Netto kraft via Newton 2">
          <FormulaBox latex="\vec F=m\vec a=28\,061[(0{,}600)\hat i-(0{,}120)\hat k]" />
          <FormulaBox latex="\vec F=(1{,}68\times 10^4)\hat i-(3{,}37\times 10^3)\hat k\;\text{N}" />
          <FormulaBox latex="|\vec F|=\sqrt{(1{,}68\times 10^4)^2+(3{,}37\times 10^3)^2}\approx 1{,}72\times 10^4\;\text{N}" />
          <FormulaBox variant="gold" latex="|\vec F|\approx 1{,}72\times 10^4\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>«Netto kraft» inkluderer alle krefter — også tyngde.</strong> Det vi har regnet
          ut er netto vektor­kraft, ikke bare motor­løftet. For å finne motor­kraften alene måtte
          vi legge til <InlineLatex latex="\;+W\hat k" /> (vekt mot −k, så motoren må kompensere
          + dra opp). Men oppgaven ber om netto kraft, og det er hva vi har levert.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Ved t=5 s akselererer helikopteret horisontalt i +x (fra rotor­tilt) og
          ned i −z (mister noe høyde). Den konstante hastighet i +y (2,2 m/s) krever ingen netto
          kraft — er bare drift. Slike kompliserte 3D-akselerasjons­profiler brukes typisk i
          flight-test for kvalifisering av nye helikopter­modeller.
        </p>
      </div>
    ),
    summary: <p>3D Newton 2: deriver <InlineLatex latex="\vec r" /> to ganger, multipliser med m. Vekt brukes til å finne masse.</p>,
  },

  "4.56": {
    title: "CALC: posisjons­avhengig kraft",
    difficulty: "vanskelig",
    pageRef: "s. 155",
    problem: (
      <p>
        Et objekt med masse m er i likevekt ved origo. Ved <InlineLatex latex="t=0" /> anvendes en ny kraft
        <InlineLatex latex="\;\vec F(t)" /> med komponenter <InlineLatex latex="F_x(t)=k_1+k_2y" />,
        <InlineLatex latex="\;F_y(t)=k_3 t" />, hvor <InlineLatex latex="k_1,k_2,k_3" /> er konstanter.
        Beregn posisjon og hastighet som funksjoner av tid.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse m, start­tilstand: i ro ved origo (alle koordinater og hastigheter null ved t=0)</li>
        <li><InlineLatex latex="F_x(t)=k_1+k_2 y" /> (avhenger av y!)</li>
        <li><InlineLatex latex="F_y(t)=k_3 t" /></li>
        <li>k_1, k_2, k_3 er konstanter</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="\vec r(t)" /> og <InlineLatex latex="\vec v(t)" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Koblede komponenter — løs y først">
          <p>
            <InlineLatex latex="F_x" /> avhenger av <em>y</em>, men <InlineLatex latex="F_y" /> avhenger
            <em>kun av t</em>. Det betyr at y kan løses uavhengig (rent integrasjons­problem), og
            deretter substituert inn i x-ligningen.
          </p>
          <FormulaBox variant="gold" latex="\text{Løsnings­strategi: y(t) først,\;substitutér inn i a_x,\;integrér x.}" />
          <p>
            Generelt: når kraften avhenger av <em>posisjon</em> (ikke bare tid), trengs ofte koblede
            differensial­ligninger. Her er koblingen ensrettet (x avhenger av y, men ikke omvendt),
            så det er løsbart i lukket form.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For y: rett-fram dobbelt integrasjon av <InlineLatex latex="\;a_y=k_3 t/m" />.</p> },
      { label: "Hint 2", content: <p>For x: substitutér uttrykket for y(t) inn i <InlineLatex latex="\;a_x=(k_1+k_2 y)/m" />, så integrér.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">y er rent tids­avhengig ⇒ integrér først; substitusér så i x.</p>
        <Step n={1} title="y-komponent: dobbel integrasjon">
          <FormulaBox latex="a_y=\dfrac{F_y}{m}=\dfrac{k_3 t}{m}" />
          <FormulaBox latex="v_y=\int_0^t a_y\,dt'=\dfrac{k_3 t^2}{2m}" />
          <FormulaBox latex="y=\int_0^t v_y\,dt'=\dfrac{k_3 t^3}{6m}" />
        </Step>
        <Step n={2} title="Substituér y(t) inn i a_x">
          <FormulaBox latex="a_x=\dfrac{k_1+k_2 y}{m}=\dfrac{k_1}{m}+\dfrac{k_2}{m}\cdot\dfrac{k_3 t^3}{6m}=\dfrac{k_1}{m}+\dfrac{k_2 k_3}{6m^2}t^3" />
        </Step>
        <Step n={3} title="x-komponent: dobbel integrasjon">
          <FormulaBox latex="v_x=\int_0^t a_x\,dt'=\dfrac{k_1}{m}t+\dfrac{k_2 k_3}{6m^2}\cdot\dfrac{t^4}{4}=\dfrac{k_1}{m}t+\dfrac{k_2 k_3}{24 m^2}t^4" />
          <FormulaBox latex="x=\int_0^t v_x\,dt'=\dfrac{k_1}{2m}t^2+\dfrac{k_2 k_3}{120 m^2}t^5" />
        </Step>
        <Step n={4} title="Samlet svar">
          <FormulaBox variant="gold" latex="\vec r(t)=\left[\dfrac{k_1}{2m}t^2+\dfrac{k_2 k_3}{120 m^2}t^5\right]\hat i+\dfrac{k_3 t^3}{6m}\hat j" />
          <FormulaBox variant="gold" latex="\vec v(t)=\left[\dfrac{k_1}{m}t+\dfrac{k_2 k_3}{24 m^2}t^4\right]\hat i+\dfrac{k_3 t^2}{2m}\hat j" />
        </Step>
        <Pitfall>
          <strong>Bruk ikke standard kinematikk for posisjons­avhengig kraft.</strong> Hadde
          k_2 = 0, ville x-bevegelsen vært enkel konstant-akselerasjon (k_1/m). Men k_2y-leddet
          gjør a_x tids­avhengig (via y(t)), og kun integrasjon kan håndtere det. Det er typisk
          for harmoniske svinginger (fjær­krefter), men her uten gjenoppretting.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Hvis k_2 og k_3 har samme fortegn, vil x-bevegelsen <em>akselerere
          hurtigere</em> enn ren konstant-kraft, fordi y vokser positivt med t³ og «mater»
          x-akselerasjonen via k_2y-leddet. Dette er en grov modell for koblede systemer som
          ladede partikler i gradient­felt eller fluiddynamiske svinginger.
        </p>
      </div>
    ),
    summary: <p>Posisjons­avhengig kraft: løs den frie komponenten først (her y), så substitusér inn i den koblede komponenten (x).</p>,
  },
};
