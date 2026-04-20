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
// Gjenbrukbare pedagogiske blokker
// ============================================================================

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
// SVG-helpere
// ============================================================================

function Arrowheads() {
  return (
    <defs>
      <marker id="arrow-red-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 28
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 28.1 — Biot-Savart for bevegelig ladning
  // ==========================================================================
  "28.1": {
    title: "Magnetfelt fra bevegelig punktladning",
    difficulty: "lett",
    pageRef: "s. 928",
    problem: (
      <div className="space-y-2">
        <p>
          En positiv ladning <InlineLatex latex="q=4{,}80\;\mu\text{C}" /> beveger seg langs +x-aksen med fart
          <InlineLatex latex="\;v=6{,}50\times 10^{5}\;\text{m/s}" />. Finn magnetfeltet i et punkt 0,500 m langs +y-aksen
          i det øyeblikket ladningen er i origo.
        </p>
        <svg viewBox="0 0 260 140" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <line x1="20" y1="100" x2="240" y2="100" stroke="#6b7280" />
          <line x1="130" y1="130" x2="130" y2="20" stroke="#6b7280" />
          <text x="245" y="105" fontSize="10" fill="#6b7280">x</text>
          <text x="118" y="18" fontSize="10" fill="#6b7280">y</text>
          <circle cx="130" cy="100" r="5" fill="#ef4444" />
          <text x="115" y="115" fontSize="10" fill="#ef4444">q</text>
          <line x1="130" y1="100" x2="180" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k28)" />
          <text x="185" y="105" fontSize="10" fill="#ef4444">v</text>
          <circle cx="130" cy="40" r="3" fill="#3b82f6" />
          <text x="138" y="42" fontSize="10" fill="#3b82f6">P (0; 0,5 m)</text>
          <line x1="130" y1="100" x2="130" y2="43" stroke="#10b981" strokeDasharray="2 2" />
          <text x="138" y="70" fontSize="10" fill="#10b981">r</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=4{,}80\times 10^{-6}\;\text{C}" /></li>
        <li><InlineLatex latex="\vec v=6{,}50\times 10^{5}\,\hat i\;\text{m/s}" /></li>
        <li><InlineLatex latex="\vec r=0{,}500\,\hat j\;\text{m}" /> (fra ladning til felt­punkt)</li>
      </ul>
    ),
    unknowns: <p>Magnetfeltet <InlineLatex latex="\vec B" /> i punkt P.</p>,
    strategy: (
      <TheoryBox title="Biot-Savart for punktladning">
        <p>
          Magnetfeltet fra en bevegelig punktladning: <InlineLatex latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\vec v\times\hat r}{r^2}" />.
          Kryssproduktet gir retningen (høyrehåndsregel), <InlineLatex latex="\mu_0=4\pi\times 10^{-7}\;\text{T·m/A}" /> slik at
          <InlineLatex latex="\;\mu_0/(4\pi)=10^{-7}" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\hat r=\hat j" /> her, og <InlineLatex latex="\hat i\times\hat j=\hat k" />.</p> },
      { label: "Hint 2", content: <p>B peker derfor i +z-retning.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Hvorfor har bevegelige ladninger magnetfelt?">
          <p>
            En stasjonær ladning lager bare et elektrisk felt. Så snart ladningen beveger seg, følger det med et
            magnetfelt — dette er en direkte konsekvens av relativitets­teorien: det elektriske feltet «blandes»
            med et magnetfelt når vi skifter referanseramme. Biot-Savart gir oss formelen for denne effekten for
            en enkelt punkt­ladning:
          </p>
          <FormulaBox latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\times\hat r}{r^2}" />
          <p>
            Merk at <InlineLatex latex="\hat r" /> er enhetsvektoren <em>fra ladningen til feltpunktet</em> — altså i hvilken
            retning vi kikker. Kryssproduktet <InlineLatex latex="\vec v\times\hat r" /> gir både retningen på B
            (høyrehåndsregel: pek fingrene langs v, krøll dem mot r̂, tommelen viser B) og en faktor
            <InlineLatex latex="\sin\theta" /> — feltet er null hvis man ser rett på ladningen langs bevegelses­retningen.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor denne formelen og ikke Coulomb?">
          <p>
            Studentens typiske forvirring: «Kan jeg ikke bare bruke Coulombs lov og justere litt?» Nei. Coulomb
            (<InlineLatex latex="E=kq/r^2" />) beskriver et <em>radielt</em> felt som peker langs <InlineLatex latex="\hat r" />.
            Magnetfeltet fra en bevegelig ladning peker derimot <em>vinkelrett</em> på både <InlineLatex latex="\vec v" /> og
            <InlineLatex latex="\;\hat r" /> — det krever et kryssprodukt, noe Coulomb­formelen ikke har.
          </p>
          <p className="mt-2">
            Derfor har Biot-Savart <em>samme</em> <InlineLatex latex="1/r^2" />-avhengighet som Coulomb (fordi den er
            «samme slags» avstandslov for en punktkilde), men har i tillegg en geometrisk faktor
            <InlineLatex latex="\;\vec v\times\hat r" /> som tar seg av både retningen og vinkelen. Dette er den
            <em> samme</em> formelen vi vil integrere opp til å dekke rette ledere (28.11), sløyfer (28.19) og solenoider (28.20)
            — men for én punkt­ladning bruker vi den direkte.
          </p>
        </TheoryBox>
        <p className="mt-2">
          Her er <InlineLatex latex="\vec v" /> langs +x og feltpunktet P er langs +y, altså vinkelrett. Da er
          <InlineLatex latex="\;\sin\theta=1" /> og vi får maksimal effekt av Biot-Savart. Strategien er:
          (1) bestem retningen fra kryss­produktet, (2) beregn størrelsen fra formelen.
        </p>
        <Step n={1} title="Retning via kryssprodukt (høyrehåndsregel)">
          <p>
            Ladningen er i origo, feltpunkt P ligger ved <InlineLatex latex="(0;\,0{,}5;\,0)" /> m. Dermed er
            <InlineLatex latex="\;\vec r=0{,}5\,\hat j" /> og enhets­vektoren <InlineLatex latex="\hat r=\hat j" />.
            Med <InlineLatex latex="\vec v=v\hat i" /> får vi:
          </p>
          <FormulaBox latex="\vec v\times\hat r=v\hat i\times\hat j=v\hat k" />
          <p>
            Vi brukte standard­identiteten <InlineLatex latex="\hat i\times\hat j=\hat k" /> (høyrehånds­koordinat­system).
            Feltet peker altså rett opp av arket, langs +z.
          </p>
          <p>
            <strong>Fysisk høyrehåndsregel­sjekk:</strong> pek høyre pekefinger langs <InlineLatex latex="\vec v" /> (+x),
            krøll langfingeren mot <InlineLatex latex="\hat r" /> (+y). Tommelen peker da ut av arket (+z). For positiv
            ladning peker B langs tommelen; hadde ladningen vært <em>negativ</em> ville feltet pekt motsatt (−z).
          </p>
        </Step>
        <Step n={2} title="Størrelse fra Biot-Savart">
          <p>
            Originalformelen (vektor):
          </p>
          <FormulaBox variant="blue" latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\times\hat r}{r^2}" />
          <p>
            Vi tar størrelsen: siden <InlineLatex latex="|\vec v\times\hat r|=v\sin\theta" /> og
            <InlineLatex latex="\sin\theta=1" /> her (v ⟂ r), forenkles formelen til:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0}{4\pi}\dfrac{qv\sin\theta}{r^2}=\dfrac{\mu_0}{4\pi}\dfrac{qv}{r^2}" />
          <p>
            Ingen algebraisk omforming er nødvendig — formelen gir allerede B direkte. Vi bruker
            <InlineLatex latex="\;\mu_0/(4\pi)=10^{-7}\;\text{T·m/A}" /> (det er nettopp slik
            <InlineLatex latex="\mu_0" /> er valgt at dette blir en pen tierpotens). Sett inn tallene:
          </p>
          <FormulaBox latex="B=10^{-7}\cdot\dfrac{(4{,}80\times 10^{-6})(6{,}50\times 10^{5})}{(0{,}500)^2}" />
          <FormulaBox latex="B=10^{-7}\cdot\dfrac{3{,}12}{0{,}25}\approx 1{,}25\times 10^{-6}\;\text{T}" />
          <FormulaBox variant="gold" latex="\boxed{\;\vec B\approx 1{,}25\;\mu\text{T}\,\hat k\;}" />
          <p>
            <strong>Enhetssjekk:</strong> [T·m/A] · [C] · [m/s] / [m²] = [T·m/A] · [A·s] · [m/s] / [m²]
            = [T·m/A] · [A/m] = [T]. ✓ (Her brukte vi at 1 C/s = 1 A.)
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 1,25 μT er ca. 2 % av jord­magnet­feltet (~50 μT). Én ladning som beveger seg gir med andre ord
          et bitte­lite felt — det er derfor vi i praksis trenger <em>strømmer</em> (milliarder av bevegelige elektroner)
          for å få målbare magnetfelt. Dette bygger broen til de neste opp­gavene med rette ledere.
        </p>
      </div>
    ),
    summary: (
      <p>
        Bevegelige ladninger lager magnetfelt. Retningen bestemmes av
        <InlineLatex latex="\;\vec v\times\hat r" />, størrelsen faller som <InlineLatex latex="1/r^2" />, akkurat som Coulomb-felt —
        men rettet vinkelrett på både v og r.
      </p>
    ),
  },

  // ==========================================================================
  // 28.5 — B-felt fra ladning, annen geometri
  // ==========================================================================
  "28.5": {
    title: "Felt fra ladning på y-aksen",
    difficulty: "middels",
    pageRef: "s. 929",
    problem: (
      <p>
        En positiv ladning <InlineLatex latex="q=+8{,}00\;\mu\text{C}" /> befinner seg i punktet <InlineLatex latex="(0;\,0{,}300;\,0)" /> m
        og beveger seg langs +x-aksen med fart <InlineLatex latex="v=9{,}00\times 10^{4}\;\text{m/s}" />. Finn magnetfeltet den lager
        i origo.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=+8{,}00\times 10^{-6}\;\text{C}" />, <InlineLatex latex="v=9{,}00\times 10^{4}\;\text{m/s}" /> langs +x</li>
        <li>Ladningen ved <InlineLatex latex="(0;\,0{,}300;\,0)" /> m, feltpunkt i origo</li>
      </ul>
    ),
    unknowns: <p>Magnetfelt <InlineLatex latex="\vec B" /> i origo.</p>,
    strategy: (
      <TheoryBox title="Retningen på r̂ betyr alt">
        <p>
          <InlineLatex latex="\vec r" /> går fra <em>kilden</em> til <em>feltpunktet</em>. Her peker den fra
          <InlineLatex latex="\;(0;0{,}3;0)" /> til origo, altså i <InlineLatex latex="-\hat j" />-retning.
          <InlineLatex latex="\;\hat i\times(-\hat j)=-\hat k" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Feltet peker i <InlineLatex latex="-\hat k" /> (inn i arket).</p> }],
    solution: (
      <div>
        <TheoryBox title="r̂ går ALLTID fra kilden til feltpunktet">
          <p>
            Dette er den klassiske fellen i Biot-Savart: <InlineLatex latex="\hat r" /> peker alltid <em>fra kilden
            (ladning/strøm­element) til punktet der vi vil vite feltet</em> — ikke omvendt. Speiler man retningen, får
            feltet feil fortegn. Vi skal bruke nøyaktig samme formel som i 28.1:
          </p>
          <FormulaBox variant="blue" latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\times\hat r}{r^2}" />
          <p>
            <strong>Hvorfor samme formel?</strong> Biot-Savart for en punktladning er uavhengig av hvor vi plasserer koordinat­systemet.
            Det er ikke behov for «en ny formel for feltpunkt på y-aksen» — det eneste som endres er hvilken vei
            <InlineLatex latex="\;\hat r" /> peker, og dette er hele poenget med vektor­formalismen. Å bytte geometri betyr bare
            å bytte ut enhetsvektorene, ikke formelen.
          </p>
          <p className="mt-2">
            Geometri her: ladningen ligger på y-aksen ved <InlineLatex latex="(0;\,0{,}3;\,0)" />, feltpunktet er origo.
            Vektoren «fra kilde til feltpunkt» er <InlineLatex latex="(0,0,0)-(0,0{,}3,0)=(0,-0{,}3,0)" />, altså
            peker <InlineLatex latex="\hat r" /> i <InlineLatex latex="-\hat j" />-retning. I 28.1 pekte den motsatt vei
            fordi feltpunktet der lå <em>over</em> ladningen; her ligger det <em>under</em>.
          </p>
        </TheoryBox>
        <Step n={1} title="Retning fra kryssproduktet">
          <p>
            Med <InlineLatex latex="\vec v=v\hat i" /> og <InlineLatex latex="\hat r=-\hat j" />:
          </p>
          <FormulaBox latex="\vec v\times\hat r=v\,\hat i\times(-\hat j)=-v(\hat i\times\hat j)=-v\,\hat k" />
          <p>
            Vi brukte at kryssprodukt er lineært i begge argumentene (minustegnet kan trekkes ut), samt identiteten
            <InlineLatex latex="\;\hat i\times\hat j=\hat k" />. Feltet peker altså i
            <InlineLatex latex="\;-\hat k" />, dvs. <em>inn i arket</em>.
          </p>
          <p>
            <strong>Høyrehåndsregel­sjekk:</strong> pek høyre pekefinger langs +x (v), krøll langfingeren mot −y (r̂).
            Tommelen peker nå inn i arket — dette er motsatt av 28.1 nettopp fordi vi nå ser ladningen «ovenfra».
            Bytter vi side av banen, snur B retning, men formelen er identisk.
          </p>
        </Step>
        <Step n={2} title="Størrelse (bruk samme formel, tallene endres)">
          <p>
            Vi tar størrelsen av Biot-Savart (ingen algebraisk omforming — den er allerede løst for B):
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0}{4\pi}\dfrac{qv\sin\theta}{r^2}" />
          <p>
            Avstanden er <InlineLatex latex="r=0{,}300\;\text{m}" /> og
            <InlineLatex latex="\;\sin\theta=1" /> (v ⟂ r). Sett inn:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0}{4\pi}\dfrac{qv}{r^2}=10^{-7}\cdot\dfrac{(8{,}00\times 10^{-6})(9{,}00\times 10^{4})}{(0{,}300)^2}" />
          <FormulaBox latex="B=10^{-7}\cdot\dfrac{0{,}720}{0{,}090}=10^{-7}\cdot 8{,}00" />
          <FormulaBox variant="gold" latex="\vec B\approx -8{,}00\times 10^{-7}\;\text{T}\,\hat k=0{,}800\,\mu\text{T (i -z)}" />
          <p>
            <strong>Enhetssjekk:</strong> identisk med 28.1 — Biot-Savart gir alltid T når du setter inn SI.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk: 0,8 μT — fortsatt mye mindre enn jordens felt. Merk også at størrelsen avhenger bare av <em>avstand</em>
          og fart, ikke av hvilken side vi er på; det er retningen som skifter fortegn. Dette blir viktig når vi senere
          legger sammen felt fra flere ladninger/ledere — fortegn avgjør om de forsterker eller kanselerer.
        </p>
      </div>
    ),
    summary: (
      <p>
        Alltid trekk <InlineLatex latex="\vec r" /> <em>fra kilden til feltpunktet</em>. Tegnet på kryssproduktet
        bestemmer deretter retningen til <InlineLatex latex="\vec B" />.
      </p>
    ),
  },

  // ==========================================================================
  // 28.6 — Kraft mellom to bevegende ladninger
  // ==========================================================================
  "28.6": {
    title: "Magnetisk kraft mellom to bevegelige ladninger",
    difficulty: "vanskelig",
    pageRef: "s. 929",
    problem: (
      <p>
        Ladning <InlineLatex latex="q_1=+4{,}00\;\mu\text{C}" /> er i origo og beveger seg langs +x med <InlineLatex latex="v_1=3{,}00\times 10^{5}\;\text{m/s}" />.
        Ladning <InlineLatex latex="q_2=+4{,}00\;\mu\text{C}" /> er i <InlineLatex latex="(0;\,0{,}200;\,0)" /> m og beveger seg langs +y med <InlineLatex latex="v_2=3{,}00\times 10^{5}\;\text{m/s}" />.
        Finn den magnetiske kraften <InlineLatex latex="q_1" /> utøver på <InlineLatex latex="q_2" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Ladninger, posisjoner og hastigheter som oppgitt</li>
      </ul>
    ),
    unknowns: <p>Magnetisk kraft <InlineLatex latex="\vec F" /> fra 1 på 2.</p>,
    strategy: (
      <TheoryBox title="To steg: finn B av q1 ved q2, så F = qv × B">
        <p>
          Først: B-feltet fra <InlineLatex latex="q_1" /> i posisjonen til <InlineLatex latex="q_2" />. Så: Lorentzkraften på <InlineLatex latex="q_2" />:
          <InlineLatex latex="\;\vec F=q_2\vec v_2\times\vec B" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Som i 28.1: <InlineLatex latex="\hat r=\hat j" />, <InlineLatex latex="\vec B" /> i +z.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="\hat j\times\hat k=\hat i" />, så kraften peker i +x.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="To-stegs-oppskrift: B først, så F">
          <p>
            Magnetiske krefter mellom to bevegelige punkt­ladninger er alltid en «Biot-Savart + Lorentz»-oppgave.
            Kombinasjonen av to formler er grunnen til at dette er en vanskelig oppgave:
          </p>
          <FormulaBox variant="blue" latex="\text{(1) Biot-Savart:}\quad \vec B=\dfrac{\mu_0}{4\pi}\dfrac{q_1\,\vec v_1\times\hat r}{r^2}" />
          <FormulaBox variant="blue" latex="\text{(2) Lorentz:}\quad \vec F=q_2\,\vec v_2\times\vec B" />
          <p>
            Ladning 1 (kilden) lager et B-felt i posisjonen til ladning 2. Ladning 2 er en bevegelig ladning i et B-felt
            og kjenner derfor en Lorentz-kraft. Vi må bruke <em>feltet</em> som mellomledd — det finnes ingen
            «direkte» avstandsformel for kraften slik som Coulomb.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor ikke en Coulomb-lignende kraftformel?">
          <p>
            Studentens naturlige spørsmål: «Hvorfor ikke bare en formel <InlineLatex latex="F=kq_1q_2/r^2" /> for magnetiske
            krefter?» Tre grunner:
          </p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>Kraften avhenger av <em>fartene</em> til begge ladninger — ikke bare ladning og avstand.</li>
            <li>Kraften er <em>ikke</em> rettet langs forbindelses­linjen (kryssproduktet gir en retning vinkelrett).</li>
            <li><InlineLatex latex="\vec F_{12}\ne -\vec F_{21}" /> generelt — Newtons 3. lov «brytes tilsynelatende» for magnetisme
              mellom to punkt­ladninger. (Det repareres først når vi tar med impuls lagret i selve feltet.)</li>
          </ul>
          <p className="mt-2">
            Derfor finnes ingen enkeltkilde-kraftformel. Vi <em>må</em> gå via feltet: (1) hvilket magnetfelt lager
            <InlineLatex latex="\;q_1" /> der <InlineLatex latex="q_2" /> er? (2) Hva er Lorentz­kraften på
            <InlineLatex latex="\;q_2" /> i det feltet? Dette er alltid to­stegs­strukturen.
          </p>
        </TheoryBox>
        <Step n={1} title="Steg 1 — B-feltet fra q1 i posisjonen til q2">
          <p>
            <strong>Hvorfor Biot-Savart og ikke Ampère her?</strong> Ampères lov krever kontinuerlig strøm med god symmetri.
            Vi har én enkelt bevegelig punkt­ladning — det er ingen symmetri å bruke. Biot-Savart er den eneste formelen
            som passer for en bevegelig punkt­ladning.
          </p>
          <p>
            Geometrien er identisk 28.1: ladning i origo, felt­punkt langs +y (ved <InlineLatex latex="(0;0{,}2;0)" /> m), hastighet langs +x. Derfor er
            <InlineLatex latex="\hat r=\hat j" />, <InlineLatex latex="\hat i\times\hat j=\hat k" />, og feltet peker i +z:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0}{4\pi}\dfrac{q_1 v_1}{r^2}=10^{-7}\dfrac{(4\times 10^{-6})(3\times 10^{5})}{(0{,}2)^2}" />
          <FormulaBox latex="B=10^{-7}\cdot\dfrac{1{,}2}{0{,}04}=10^{-7}\cdot 30=3{,}00\times 10^{-6}\;\text{T}" />
          <p>Retning: +z (ut av arket) ved høyre­hånds­regel.</p>
        </Step>
        <Step n={2} title="Steg 2 — Lorentzkraft på q2">
          <p>
            Originalformelen er Lorentz for en bevegelig punkt­ladning i et B-felt:
          </p>
          <FormulaBox variant="blue" latex="\vec F=q\,\vec v\times\vec B" />
          <p>
            <strong>Hvorfor ikke «<InlineLatex latex="F=qE" />»?</strong> Det er kraften fra et <em>elektrisk</em> felt. Vi har nettopp regnet ut
            et <em>magnetisk</em> felt, og den rette formelen er da <InlineLatex latex="\vec F=q\vec v\times\vec B" />.
            Merk også at kraften er null hvis ladningen står stille eller beveger seg parallelt med B — magnetisme
            virker bare på <em>bevegelige</em> ladninger.
          </p>
          <p>
            Ladning 2 beveger seg langs +y (altså <InlineLatex latex="\vec v_2=v_2\hat j" />) i feltet
            <InlineLatex latex="\vec B=B\hat k" />. Sett inn:
          </p>
          <FormulaBox latex="\vec F=q_2\,\vec v_2\times\vec B=q_2 v_2 B\,(\hat j\times\hat k)=q_2 v_2 B\,\hat i" />
          <p>
            Vi brukte den syklige identi­teten <InlineLatex latex="\hat j\times\hat k=\hat i" />. Kraften peker altså i +x
            (mot ladning 1 sin bevegelses­retning). Tall inn:
          </p>
          <FormulaBox latex="F=q_2 v_2 B=(4\times 10^{-6})(3\times 10^{5})(3\times 10^{-6})" />
          <FormulaBox latex="F=3{,}6\times 10^{-6}\;\text{N}" />
          <FormulaBox variant="gold" latex="\boxed{\;\vec F\approx 3{,}6\,\mu\text{N}\,\hat i\;}" />
          <p>
            <strong>Enhetssjekk:</strong> [C]·[m/s]·[T] = [A·s]·[m/s]·[N/(A·m)] = [N] ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk: et par mikronewton — veldig lite. Til sammenligning er den elektriske (Coulomb-)kraften mellom de
          samme ladningene ~ 3,6 N, altså én million ganger større. Magnetisme er relativistisk svak i sammenligning
          med elektrisitet — men når ladningene organiseres i strømmer, blir effekten målbar.
        </p>
      </div>
    ),
    summary: (
      <p>
        Magnetiske krefter mellom bevegelige ladninger krever to skritt: (i) Biot-Savart gir feltet,
        (ii) Lorentz-loven gir kraften. Legg merke til at <InlineLatex latex="\vec F_{12}" /> er ikke alltid
        motsatt <InlineLatex latex="\vec F_{21}" /> i magnetiske systemer!
      </p>
    ),
  },

  // ==========================================================================
  // 28.11 — Lang rett leder
  // ==========================================================================
  "28.11": {
    title: "Magnetfelt fra lang rett leder",
    difficulty: "lett",
    pageRef: "s. 934",
    problem: (
      <div className="space-y-2">
        <p>
          En lang rett ledning fører strøm <InlineLatex latex="I=10{,}0\;\text{A}" />. Finn størrelsen av magnetfeltet
          5,00 cm fra ledningen.
        </p>
        <svg viewBox="0 0 240 120" className="w-full max-w-xs mx-auto">
          <Arrowheads />
          <line x1="120" y1="10" x2="120" y2="110" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red-k28)" />
          <text x="125" y="25" fontSize="10" fill="#ef4444">I</text>
          <circle cx="120" cy="60" r="40" fill="none" stroke="#3b82f6" strokeDasharray="3 2" />
          <text x="170" y="60" fontSize="10" fill="#3b82f6">B</text>
          <line x1="120" y1="60" x2="160" y2="60" stroke="#10b981" strokeDasharray="2 2" />
          <text x="135" y="55" fontSize="10" fill="#10b981">r</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="I=10{,}0\;\text{A}" />, <InlineLatex latex="r=0{,}0500\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Magnetfelt <InlineLatex latex="B" /> ved 5 cm.</p>,
    strategy: (
      <TheoryBox title="Formel for B rundt en rett leder">
        <p>
          <InlineLatex latex="B=\dfrac{\mu_0 I}{2\pi r}" />. Utledet fra Ampère eller Biot-Savart.
          Retningen følger høyrehåndsregelen: tommel langs strømmen, fingrene rundt i feltretningen.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p><InlineLatex latex="\mu_0/(2\pi)=2\times 10^{-7}\;\text{T·m/A}" />.</p> }],
    solution: (
      <div>
        <TheoryBox title="Hvorfor 1/r for en lang rett leder?">
          <p>
            En lang, rett leder har to nøkkel­symmetrier: (i) <em>translasjons­invariant</em> langs tråden —
            feltet kan ikke avhenge av hvor langs tråden vi står, og (ii) <em>rotasjons­invariant</em> rundt tråden — feltet
            kan bare avhenge av avstanden r. Det er denne symmetrien som gjør at man kan utlede:
          </p>
          <FormulaBox variant="blue" latex="B=\dfrac{\mu_0 I}{2\pi r}" />
          <p>
            Formelen kan utledes på to måter: (a) integrer Biot-Savart langs hele den uendelig lange tråden, eller
            (b) bruk Ampère (se 28.27). Begge gir samme svar. Retning: høyre­hånds­regelen — tommel langs I,
            fingrene krøller seg rundt i B-retningen. Feltet avtar som <InlineLatex latex="1/r" />, ikke
            <InlineLatex latex="1/r^2" /> som for en punktladning, fordi vi «summerer» bidrag fra uendelig mange
            strøm­elementer langs en én­dimensjonal tråd.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor denne formelen og ikke Biot-Savart direkte?">
          <p>
            Studentens naturlige spørsmål: «Vi brukte jo Biot-Savart for punkt­ladninger — hvorfor ikke her?» Svaret er at
            vi teknisk sett <em>kunne</em> integrere Biot-Savart for hvert strøm­element
            <InlineLatex latex="\;d\vec B=\dfrac{\mu_0}{4\pi}\dfrac{I\,d\vec l\times\hat r}{r^2}" /> langs hele tråden —
            men integralet er slitsomt (trigonometriske substitusjoner). Ampères lov + sylinder­symmetri gjør integralet
            <em>trivielt</em>: vi slipper å integrere i det hele tatt.
          </p>
          <p className="mt-2">
            Derfor er <InlineLatex latex="B=\mu_0 I/(2\pi r)" /> den <em>ferdig­utledete</em> formelen vi bruker for enhver
            lang rett leder. Faktoren <InlineLatex latex="2\pi" /> kommer fra omkretsen <InlineLatex latex="2\pi r" /> av den
            amperiske sirkel­sløyfen. Dette er viktig å huske når vi senere sammenligner med sløyfe­sentret (28.19) — der
            har nevneren <InlineLatex latex="2R" />, ikke <InlineLatex latex="2\pi R" />, fordi geometrien er helt annerledes.
          </p>
        </TheoryBox>
        <Step n={1} title="Velg riktig formel og sett inn">
          <p>
            Ingen algebraisk om­forming er nødvendig her — formelen er allerede løst for B som funksjon av I og r.
            Originalformelen:
          </p>
          <FormulaBox variant="blue" latex="B=\dfrac{\mu_0 I}{2\pi r}" />
          <p>
            Det smarte trikset er å samle <InlineLatex latex="\mu_0" /> og <InlineLatex latex="2\pi" /> til én konstant.
            Dette går bra fordi <InlineLatex latex="\mu_0=4\pi\times 10^{-7}" /> er akkurat konstruert slik:
          </p>
          <FormulaBox latex="\dfrac{\mu_0}{2\pi}=\dfrac{4\pi\times 10^{-7}}{2\pi}=2\times 10^{-7}\;\text{T·m/A}" />
          <p>Det gjør regningen penere:</p>
          <FormulaBox latex="B=\dfrac{\mu_0 I}{2\pi r}=(2\times 10^{-7})\dfrac{10{,}0}{0{,}0500}" />
        </Step>
        <Step n={2} title="Regn ut">
          <FormulaBox latex="B=2\times 10^{-7}\cdot 200=4{,}00\times 10^{-5}\;\text{T}" />
          <FormulaBox variant="gold" latex="B=4{,}00\times 10^{-5}\;\text{T}=40{,}0\;\mu\text{T}" />
          <p>
            <strong>Enhetssjekk:</strong> [T·m/A]·[A]/[m] = [T] ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 40 μT er nesten på størrelse med jordens magnet­felt (~50 μT). Derfor merker en kompass­nål tydelig
          når du legger en strøm­førende ledning nær den — det var nettopp Ørsteds oppdagelse (1820) som startet hele
          elektro­magnetismen. Husk: feltet avtar som <InlineLatex latex="1/r" />, så dobler du avstanden halveres feltet.
        </p>
      </div>
    ),
    summary: (
      <p>
        B-feltet rundt en rett leder faller som <InlineLatex latex="1/r" /> (ikke <InlineLatex latex="1/r^2" /> som for punktladning!),
        fordi lederen er uendelig lang. Feltlinjene danner konsentriske sirkler.
      </p>
    ),
  },

  // ==========================================================================
  // 28.19 — Sirkulær sløyfe
  // ==========================================================================
  "28.19": {
    title: "Felt i senter av sirkulær sløyfe",
    difficulty: "lett",
    pageRef: "s. 937",
    problem: (
      <p>
        En sirkulær strømsløyfe har radius <InlineLatex latex="R=5{,}00\;\text{cm}" /> og fører strøm <InlineLatex latex="I=5{,}00\;\text{A}" />.
        Finn magnetfeltet i sirkelens senter.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="R=0{,}0500\;\text{m}" />, <InlineLatex latex="I=5{,}00\;\text{A}" /></li>
      </ul>
    ),
    unknowns: <p>Feltet i senter.</p>,
    strategy: (
      <TheoryBox title="Biot-Savart integrert over sløyfen">
        <p>
          For én sløyfe: <InlineLatex latex="B=\dfrac{\mu_0 I}{2R}" /> i senter.
          For <InlineLatex latex="N" /> tettpakkede vindinger: multipliser med <InlineLatex latex="N" />.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <TheoryBox title="Biot-Savart langs en sirkulær sløyfe">
          <p>
            For en sirkulær sløyfe kan vi ikke bruke Ampère direkte (det er ikke nok symmetri til å gjøre integralet
            trivielt utenfor aksen). Vi må integrere Biot-Savart langs hele sløyfen. Start­punktet er formelen
            for et strøm­element:
          </p>
          <FormulaBox variant="blue" latex="d\vec B=\dfrac{\mu_0}{4\pi}\dfrac{I\,d\vec l\times\hat r}{r^2}" />
          <p>
            I senter er alle bidragene dB samme retning (langs akse­retningen), avstanden er konstant <InlineLatex latex="r=R" />,
            og <InlineLatex latex="d\vec l\perp\hat r" /> overalt slik at <InlineLatex latex="|d\vec l\times\hat r|=dl" />.
            Vi kan derfor <em>direkte</em> dra størrelsene ut av integralet:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0 I}{4\pi R^2}\oint dl=\dfrac{\mu_0 I}{4\pi R^2}\cdot 2\pi R=\dfrac{\mu_0 I}{2R}" />
          <p>
            Legg merke til den algebraiske omformingen: omkretsen <InlineLatex latex="2\pi R" /> kanselerer delvis med
            <InlineLatex latex="\;4\pi R^2" /> i nevneren, og vi sitter igjen med <InlineLatex latex="2R" /> i nevneren.
            Retning: høyre­hånds­regel — krum fingrene i strømretningen og tommelen viser B-retningen langs aksen.
            For <InlineLatex latex="N" /> tett­pakkede vindinger multipliserer vi med <InlineLatex latex="N" />.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor 2R og ikke 2πR i nevneren?">
          <p>
            Dette er en klassisk eksamens­felle. For <em>rett leder</em> var formelen
            <InlineLatex latex="\;B=\mu_0 I/(2\pi r)" />, men for <em>sløyfe­senter</em> er den
            <InlineLatex latex="\;B=\mu_0 I/(2R) " />. Hva er forskjellen?
          </p>
          <ul className="list-disc pl-5 space-y-0.5 mt-1">
            <li>
              <strong>Rett leder (Ampère):</strong> <InlineLatex latex="2\pi" /> kommer fra omkretsen av den <em>amperiske sløyfen</em>
              (en sirkel rundt tråden).
            </li>
            <li>
              <strong>Sløyfe­senter (Biot-Savart):</strong> <InlineLatex latex="2\pi" /> dukker opp i <em>teller</em> som omkretsen
              av selve sløyfen, men <InlineLatex latex="4\pi" /> fra Biot-Savart-forkonstanten er i nevner. Forkortelse gir
              faktor <InlineLatex latex="1/2" />.
            </li>
          </ul>
          <p className="mt-2">
            Med andre ord: to helt ulike geometriske utledninger, to forskjellige konstanter. Det er <em>ikke</em> en
            trykkfeil! Studentens instinkt om å «bare bruke rett-leder-formelen» gir feil svar med faktor <InlineLatex latex="\pi" />.
          </p>
        </TheoryBox>
        <Step n={1} title="Velg riktig formel — sløyfesenter">
          <p>
            Originalformelen for feltet i senter av én sløyfe (N = 1):
          </p>
          <FormulaBox variant="blue" latex="B=\dfrac{\mu_0 I}{2R}" />
          <p>
            Ingen algebraisk omforming nødvendig — formelen gir B direkte. Sett inn
            <InlineLatex latex="\;R=0{,}0500" /> m og <InlineLatex latex="\;I=5{,}00" /> A:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0 I}{2R}=(4\pi\times 10^{-7})\dfrac{5{,}00}{2\cdot 0{,}0500}" />
        </Step>
        <Step n={2} title="Regn">
          <FormulaBox latex="B=(4\pi\times 10^{-7})\cdot 50=200\pi\times 10^{-7}\;\text{T}" />
          <FormulaBox variant="gold" latex="B\approx 6{,}28\times 10^{-5}\;\text{T}=62{,}8\;\mu\text{T}" />
          <p>
            <strong>Enhetssjekk:</strong> [T·m/A]·[A]/[m] = [T] ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: ~63 μT, omtrent som jordens felt. Merk at formelen har <InlineLatex latex="2R" /> i nevneren
          (ikke <InlineLatex latex="2\pi R" /> som hos rett leder) — en typisk eksamens­felle. Intuisjonen er at i senter
          legger alle strøm­bidragene seg sammen konstruktivt, så pakkes det mye felt inn på lite volum.
        </p>
      </div>
    ),
    summary: (
      <p>
        Sirkulær sløyfe gir sterkest felt i senter, rettet langs aksen (høyrehåndsregelen).
        Husk: <InlineLatex latex="\mu_0 I/(2R)" />, ikke <InlineLatex latex="2\pi R" /> i nevner.
      </p>
    ),
  },

  // ==========================================================================
  // 28.20 — Solenoide
  // ==========================================================================
  "28.20": {
    title: "Magnetfelt inne i solenoide",
    difficulty: "lett",
    pageRef: "s. 940",
    problem: (
      <p>
        En lang solenoide har 2000 vindinger per meter og fører strøm <InlineLatex latex="I=5{,}0\;\text{A}" />.
        Finn magnetfeltet nær senter av solenoiden.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="n=2000\;\text{vindinger/m}" /></li>
        <li><InlineLatex latex="I=5{,}0\;\text{A}" /></li>
      </ul>
    ),
    unknowns: <p>Felt <InlineLatex latex="B" /> inne i solenoiden.</p>,
    strategy: (
      <TheoryBox title="Idealisert solenoide">
        <p>
          <InlineLatex latex="B=\mu_0 n I" /> inne, <InlineLatex latex="B\approx 0" /> utenfor.
          Uavhengig av radius — så lenge solenoiden er lang sammenlignet med diameteren.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <TheoryBox title="Solenoiden — et «magnetisk kondensator­felt»">
          <p>
            En solenoide er en tett vikla sylinder­spole. I grensen av uendelig lang solenoide er feltet helt jevnt
            inne og tilnærmet null utenfor — akkurat som det elektriske feltet mellom platene i en parallell­plate­kondensator.
            Dette gjør solenoiden svært kraftig og forutsigbar.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor Ampère og ikke Biot-Savart for sløyfene?">
          <p>
            Studentens naturlige spørsmål: «Hvorfor ikke bruke <InlineLatex latex="B=\mu_0 I/(2R)" /> for hver sløyfe og
            summere?» Det ville i prinsippet fungere, men krever et vanskelig integral over <em>alle</em> sløyfene. I stedet
            utnytter vi symmetrien: en lang solenoide er translasjons­invariant langs aksen, og feltet utenfor er ≈ 0 (feltene
            fra nabo­vindinger opphever hverandre utenfor). Da blir Ampère lett.
          </p>
          <p className="mt-2">
            Originalformelen er Ampères lov:
          </p>
          <FormulaBox variant="blue" latex="\oint\vec B\cdot d\vec l=\mu_0\,I_\text{enc}" />
          <p>
            Vi velger en rektangulær sløyfe der én langside ligger <em>inne</em> i solenoiden (parallell med aksen,
            lengde L), motsatt langside ligger langt utenfor (der B ≈ 0), og kort­sidene er vinkelrett på B (så
            <InlineLatex latex="\;\vec B\cdot d\vec l=0" /> der). Bare innsiden bidrar:
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=B\,L+0+0+0=B\,L" />
          <p>
            Den innkapslede strømmen er antall vindinger innenfor sløyfen, ganger I:
            <InlineLatex latex="\;I_\text{enc}=(nL)\,I" />, hvor n er vindinger per meter. Sett sammen:
          </p>
          <FormulaBox latex="B\,L=\mu_0(nL)I" />
          <p>
            <strong>Algebraisk omforming:</strong> L står på begge sider og faller ut. Vi står igjen med:
          </p>
          <FormulaBox variant="blue" latex="B=\mu_0 n I" />
          <p>
            Merk at formelen er uavhengig av radius og av posisjonen inne i solenoiden — så lenge vi er langt fra endene.
            Det er nettopp fordi L kanselleres at radius forsvinner. Retning: høyre­hånds­regelen, fingrene krøller i
            strømretningen rundt vindingene, tommel langs B.
          </p>
        </TheoryBox>
        <Step n={1} title="Sett inn i originalformelen">
          <p>
            Formelen er allerede løst med hensyn til B, så vi setter bare inn. Vindinger per meter: n = 2000, I = 5,0 A:
          </p>
          <FormulaBox latex="B=\mu_0 n I=(4\pi\times 10^{-7})(2000)(5{,}0)" />
        </Step>
        <Step n={2} title="Beregn">
          <FormulaBox latex="B=(4\pi\times 10^{-7})\cdot 10\,000=4\pi\times 10^{-3}\;\text{T}" />
          <FormulaBox variant="gold" latex="B\approx 1{,}26\times 10^{-2}\;\text{T}=12{,}6\;\text{mT}" />
          <p>
            <strong>Enhetssjekk:</strong> [T·m/A]·[1/m]·[A] = [T] ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 12,6 mT er ca. 250 ganger sterkere enn jordens felt — en typisk solenoide gir allerede et
          betydelig felt, og MR-maskiner (supraledende solenoider) kan komme opp i ~1,5–3 T. For å øke feltet kan vi øke
          enten strømmen eller vindings­tettheten; å gjøre solenoiden større hjelper <em>ikke</em> (radius­uavhengig).
        </p>
      </div>
    ),
    summary: (
      <p>
        Solenoiden er et magnetisk «kondensatorfelt» — jevnt inne, null utenfor. Dette gjør
        den til hjørnesteinen i elektromagneter og MR-maskiner.
      </p>
    ),
  },

  // ==========================================================================
  // 28.21 — Toroide
  // ==========================================================================
  "28.21": {
    title: "Magnetfelt i en toroide",
    difficulty: "middels",
    pageRef: "s. 941",
    problem: (
      <p>
        En toroide har 600 vindinger, fører strøm 8,00 A og har middelradius 0,150 m.
        Finn magnetfeltet inne i toroiden langs midtaksen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="N=600,\;I=8{,}00\;\text{A},\;r=0{,}150\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>B i senterlinjen.</p>,
    strategy: (
      <TheoryBox title="Ampère på sirkel inne i toroiden">
        <p>
          <InlineLatex latex="\oint\vec B\cdot d\vec l=B\cdot 2\pi r=\mu_0 NI" />
          gir <InlineLatex latex="B=\dfrac{\mu_0 NI}{2\pi r}" />.
          Ser lik ut som rett leder, men med <InlineLatex latex="NI" /> i stedet for <InlineLatex latex="I" />.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <TheoryBox title="Toroide = bøyd solenoide">
          <p>
            En toroide er en solenoide bøyd tilbake til seg selv (smultringform). Symmetrien er nå rotasjons­invariant
            rundt aksen, og vi kan bruke Ampère på en sirkulær sløyfe med radius r inne i toroiden (konsentrisk med aksen):
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=B\cdot 2\pi r=\mu_0\,I_\text{enc}=\mu_0 NI" />
          <p>
            Hver av de <InlineLatex latex="N" /> vindingene krysser gjennom sløyfen én gang, så den innkapslede strømmen
            er <InlineLatex latex="NI" />. Løsning med hensyn på B gir originalformelen:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0 NI}{2\pi r}" />
          <p>
            Ser nesten ut som «lang rett leder» (<InlineLatex latex="\mu_0 I/2\pi r" />) — og det er ingen tilfeldighet:
            rotasjons­symmetrien er den samme. Men her er den innkapslede strømmen forsterket med faktor N, og feltet
            varierer svakt <InlineLatex latex="(\sim 1/r)" /> over tverrsnittet av smultringen. Utenfor toroiden er
            <InlineLatex latex="\;I_\text{enc}=0" /> (hver vikling går både ut og inn), så B ≈ 0.
          </p>
        </TheoryBox>
        <Step n={1} title="Algebraisk omforming av Ampère">
          <p>
            Fra <InlineLatex latex="B\cdot 2\pi r=\mu_0 NI" /> løser vi for B:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0 N I}{2\pi r}=\dfrac{\mu_0}{2\pi}\cdot\dfrac{NI}{r}" />
          <p>Med <InlineLatex latex="\mu_0/(2\pi)=2\times 10^{-7}" />:</p>
          <FormulaBox latex="B=(2\times 10^{-7})\dfrac{600\cdot 8{,}00}{0{,}150}" />
        </Step>
        <Step n={2} title="Regn">
          <FormulaBox latex="B=(2\times 10^{-7})\dfrac{4800}{0{,}150}=(2\times 10^{-7})\cdot 32\,000" />
          <FormulaBox variant="gold" latex="B\approx 6{,}40\times 10^{-3}\;\text{T}=6{,}40\;\text{mT}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk: 6,4 mT — sammenlignbart med en solenoide. Toroiden har den store fordelen at praktisk talt all magnetisk
          fluks er lukket inne i smult­ringen. Derfor brukes toroidale spoler i transformatorer (liten streufluks)
          og i fusjonsreaktorer (tokamak), der feltet skal holde på et plasma.
        </p>
      </div>
    ),
    summary: (
      <p>
        Toroide = bøyd solenoide. Feltet er konsentrert inne (<InlineLatex latex="B\sim 1/r" /> varierer litt
        over tverrsnittet) og null utenfor. Brukes i transformatorer og fusjonsreaktorer.
      </p>
    ),
  },

  // ==========================================================================
  // 28.27 — Ampère for rett leder
  // ==========================================================================
  "28.27": {
    title: "Ampère's lov — lang rett leder",
    difficulty: "middels",
    pageRef: "s. 943",
    problem: (
      <p>
        Bruk Ampères lov til å utlede uttrykket <InlineLatex latex="B=\mu_0 I/(2\pi r)" /> for en lang rett leder.
        Diskutér kort valg av amperisk sløyfe.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Lang rett leder med strøm <InlineLatex latex="I" /></li>
        <li>Sylindersymmetri</li>
      </ul>
    ),
    unknowns: <p>B som funksjon av r (utledning).</p>,
    strategy: (
      <TheoryBox title="Ampère: ∮ B · dl = μ₀I_enc">
        <p>
          Velg amperisk sløyfe der B er konstant og parallell med dl: en sirkel konsentrisk med lederen.
          Symmetrien (rotasjons­invarians + translasjons­invarians) garanterer dette.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <TheoryBox title="Ampères lov — den magnetiske Gauss">
          <p>
            Ampères lov er for magnet­feltet hva Gauss-loven er for elektrisk felt: et kraftfullt verktøy
            <em> når</em> symmetri­en er god nok. Loven sier at linje­integralet av B langs en lukket sløyfe er
            proporsjonalt med den strømmen sløyfen omslutter:
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=\mu_0\,I_\text{enc}" />
          <p>
            Strategi­oppskriften: (1) identifiser symmetrien (rett leder ⇒ sylinder­symmetri), (2) velg en «amperisk sløyfe»
            der B er konstant i størrelse og parallell (eller vinkelrett) på <InlineLatex latex="d\vec l" /> hele veien,
            (3) regn integralet trivielt, (4) tell opp innkapslet strøm, (5) løs for B.
          </p>
        </TheoryBox>
        <Step n={1} title="Symmetri­argument — valg av amperisk sløyfe">
          <p>
            Lederen er uendelig lang og rett. Derfor må B bare avhenge av avstanden r (rotasjons­symmetri rundt tråden),
            og B må stå vinkelrett på tråden (kan ikke ha komponent langs strømmen — det ville bryte
            speilings­symmetrien). Disse argumentene betyr at <InlineLatex latex="\vec B" /> overalt må følge
            <em>konsentriske sirkler</em> rundt tråden, med konstant størrelse på hver sirkel.
          </p>
          <p>
            Vi velger derfor en <em>sirkel</em> med radius r, konsentrisk med tråden, som amperisk sløyfe. Da er
            <InlineLatex latex="\vec B\parallel d\vec l" /> overalt på sløyfen, og B er konstant.
          </p>
        </Step>
        <Step n={2} title="Linjeintegral forenkles">
          <p>
            Siden <InlineLatex latex="\vec B\parallel d\vec l" /> blir prikk­produktet bare produktet av lengdene:
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=\oint B\,dl=B\oint dl=B\cdot 2\pi r" />
          <p>
            Vi flytter B utenfor integralet fordi den er konstant, og <InlineLatex latex="\oint dl" /> er bare omkretsen
            av sirkelen, <InlineLatex latex="2\pi r" />.
          </p>
        </Step>
        <Step n={3} title="Ampère og løs for B">
          <p>
            Sløyfen omslutter hele strømmen: <InlineLatex latex="I_\text{enc}=I" />. Sett inn i Ampère:
          </p>
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I" />
          <p>Løs algebraisk for B ved å dele på <InlineLatex latex="2\pi r" />:</p>
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I\Rightarrow \boxed{\;B=\dfrac{\mu_0 I}{2\pi r}\;}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: det er sylinder­symmetrien — ikke Ampère i seg selv — som gjør jobben. Ampère er alltid sann,
          men nyttig bare når symmetri lar oss trekke B utenfor integralet. For vil­kårlig form (f.eks. en endelig rett
          leder) må man gå tilbake til Biot-Savart.
        </p>
      </div>
    ),
    summary: (
      <p>
        Ampère er kraftig ved symmetri: velg sløyfen slik at <InlineLatex latex="\vec B\cdot d\vec l" /> er trivielt.
        Uten symmetri får integralet krumme former — bruk da Biot-Savart i stedet.
      </p>
    ),
  },

  // ==========================================================================
  // 28.29 — Koaksial kabel
  // ==========================================================================
  "28.29": {
    title: "Koaksialkabel (indre og ytre leder)",
    difficulty: "middels",
    pageRef: "s. 944",
    problem: (
      <p>
        En koaksialkabel har en tynn indre leder som fører <InlineLatex latex="+I" /> og en ytre, sylindrisk skjerm som fører <InlineLatex latex="-I" />.
        Radius inne er <InlineLatex latex="a" />, skjermen ved <InlineLatex latex="b" />. Finn B for (a) <InlineLatex latex="a<r<b" />
        og (b) <InlineLatex latex="r>b" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Strøm +I i indre, -I i ytre leder</li>
      </ul>
    ),
    unknowns: <p>B mellom lederne og utenfor.</p>,
    strategy: (
      <TheoryBox title="Ampère: bare innkapslet strøm teller">
        <p>
          Bruk en sirkulær amperisk sløyfe med radius <InlineLatex latex="r" />. Summen av strømmen <em>innenfor</em>
          sløyfen bestemmer feltet. Strøm utenfor sløyfen bidrar ikke (selv om den lager felt, netto gjennom sløyfen er null).
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Mellom: bare +I er innkapslet. Utenfor: +I − I = 0.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Ampère: det er bare innkapslet strøm som teller">
          <p>
            Nøkkel­innsikten i Ampères lov er at bare strøm som faktisk går <em>gjennom</em> den amperiske sløyfen bidrar:
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=\mu_0\,I_\text{enc}" />
          <p>
            Ytre ledere lager også felt, men bidragene deres til <InlineLatex latex="\oint\vec B\cdot d\vec l" /> summerer seg til null
            rundt en sløyfe som ikke omslutter dem. Altså kan vi ignorere dem helt når vi regner på en konsentrisk sirkel­sløyfe.
            Det er nettopp dette som gjør koaksial­kabelen så elegant å analysere.
          </p>
          <p className="mt-2">
            Strategien er identisk for begge del­oppgavene: velg en sirkulær sløyfe med radius r konsentrisk med kabelen, tell opp
            hvilken strøm som er <em>innenfor</em> sløyfen, og løs Ampère.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Mellom lederne (a &lt; r &lt; b)">
          <p>
            Sløyfen med radius r ligger <em>utenfor</em> den indre lederen, men <em>innenfor</em> skjermen.
            Altså innkapsler vi bare +I. Ved sylinder­symmetri (samme argument som 28.27):
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=B\cdot 2\pi r=\mu_0\,I_\text{enc}=\mu_0 I" />
          <p>Løs for B:</p>
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I\Rightarrow B=\dfrac{\mu_0 I}{2\pi r}" />
          <p>
            Dette er nøyaktig samme felt som om bare den indre lederen eksisterte alene. Skjermen har ikke virkning på feltet
            mellom lederne.
          </p>
        </Step>
        <Step n={2} title="(b) Utenfor kabelen (r &gt; b)">
          <p>
            Nå omslutter sløyfen <em>både</em> den indre lederen (strøm +I) og skjermen (strøm −I). Innkapslet netto strøm er:
          </p>
          <FormulaBox latex="I_\text{enc}=(+I)+(-I)=0" />
          <p>Sett inn i Ampère:</p>
          <FormulaBox variant="gold" latex="B\cdot 2\pi r=\mu_0(I-I)=0\Rightarrow \boxed{\;B=0\;}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: utenfor koaksial­kabelen er det ikke noe magnetfelt overhodet. Derfor brukes koaks til å overføre
          signaler uten å stråle ut elektromagnetiske forstyrrelser (EMI), og omvendt — kabelen er heller ikke følsom for ytre
          felt. Dette er selve grunnprinsippet bak antenne­kabler, Ethernet (koaks­varianten), og avskjermede instrumentkabler.
        </p>
      </div>
    ),
    summary: (
      <p>
        Koaksialkabel skjermer effektivt: utenfor skjermen er det null magnetfelt.
        Derfor brukes de til signaler som er følsomme for elektromagnetiske forstyrrelser.
      </p>
    ),
  },

  // ==========================================================================
  // 28.30 — Tykk leder, jevn strømtetthet
  // ==========================================================================
  "28.30": {
    title: "B inne i leder med jevn strømtetthet",
    difficulty: "middels",
    pageRef: "s. 944",
    problem: (
      <p>
        En lang sylindrisk leder med radius <InlineLatex latex="R" /> fører total strøm <InlineLatex latex="I" /> jevnt fordelt over tverrsnittet.
        Finn magnetfeltet som funksjon av radius for (a) <InlineLatex latex="r<R" />, (b) <InlineLatex latex="r>R" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Lang sylindrisk leder, radius <InlineLatex latex="R" />, total strøm <InlineLatex latex="I" /></li>
        <li>Jevn strømtetthet <InlineLatex latex="J=I/(\pi R^2)" /></li>
      </ul>
    ),
    unknowns: <p>B som funksjon av r.</p>,
    strategy: (
      <TheoryBox title="Kapsle strøm proporsjonalt med areal">
        <p>
          Innenfor lederen: andelen strøm som er innkapslet er <InlineLatex latex="I_\text{enc}=I(r/R)^2" />
          (fordi areal <InlineLatex latex="\pi r^2" /> vs. <InlineLatex latex="\pi R^2" />).
          Utenfor: all strømmen er innkapslet.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <TheoryBox title="Jevn strømtetthet og Ampère">
          <p>
            Når strømmen er <em>jevnt fordelt</em> over tverr­snittet, tvinger Ampères lov oss til å regne ut hvor stor andel
            av strømmen som ligger innenfor den amperiske sløyfen. Strøm­tettheten er konstant:
          </p>
          <FormulaBox latex="J=\dfrac{I}{A}=\dfrac{I}{\pi R^2}" />
          <p>
            Inne i lederen øker innkapslet strøm kvadratisk med r (fordi arealet øker som <InlineLatex latex="\pi r^2" />).
            Utenfor lederen er hele strømmen innkapslet, så feltet oppfører seg som fra en rett leder. Originalformelen
            (Ampère) er:
          </p>
          <FormulaBox latex="\oint\vec B\cdot d\vec l=B\cdot 2\pi r=\mu_0\,I_\text{enc}" />
          <p>
            Hele utfordringen ligger i å regne ut <InlineLatex latex="I_\text{enc}(r)" /> riktig for hver region.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Inne i lederen (r &lt; R)">
          <p>
            Den innkapslede strømmen er proporsjonal med arealet av sløyfen:
          </p>
          <FormulaBox latex="I_\text{enc}=J\cdot\pi r^2=\dfrac{I}{\pi R^2}\cdot\pi r^2=I\dfrac{r^2}{R^2}" />
          <p>Sett inn i Ampère og løs for B:</p>
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I\dfrac{r^2}{R^2}\Rightarrow B=\dfrac{\mu_0 I\,r}{2\pi R^2}" />
          <p>
            Feltet er altså <strong>lineært</strong> i r inne i lederen, og er null på aksen. Dette er sym­metrisk: det er like
            mye strøm på alle sider av aksen, så bidragene kanselleres helt der.
          </p>
        </Step>
        <Step n={2} title="(b) Utenfor lederen (r &gt; R)">
          <p>
            Sløyfen om­slutter hele strømmen, <InlineLatex latex="I_\text{enc}=I" />. Resultatet er identisk med en uendelig tynn rett leder:
          </p>
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I" />
          <FormulaBox variant="gold" latex="B=\dfrac{\mu_0 I}{2\pi r}" />
          <p>Feltet avtar som <InlineLatex latex="1/r" /> — som en rett leder.</p>
        </Step>
        <Step n={3} title="Sjekk kontinuitet ved r = R">
          <p>
            En viktig validerings­teknikk: de to uttrykkene må være like på grensen. Sett r = R i begge:
          </p>
          <FormulaBox latex="\text{Inne: }\dfrac{\mu_0 I R}{2\pi R^2}=\dfrac{\mu_0 I}{2\pi R}=\text{ute ved }r=R" />
          <p className="italic text-[var(--muted)]">Feltet er kontinuerlig, som forventet.</p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: B vokser lineært fra 0 på aksen til maks på overflaten <InlineLatex latex="(r=R)" />,
          og avtar så som <InlineLatex latex="1/r" /> utenfor. Dette speiler hvordan gravitasjonen inne i en jord-lignende
          kule vokser lineært med avstand fra senter, for så å avta som <InlineLatex latex="1/r^2" /> utenfor.
          Symmetri­argumentene er nesten identiske.
        </p>
      </div>
    ),
    summary: (
      <p>
        Feltet vokser lineært fra null på aksen til maks ved overflaten, så avtar som <InlineLatex latex="1/r" /> utenfor.
        Samme topologi som ladning fordelt i kule — bare rotert.
      </p>
    ),
  },

  // ==========================================================================
  // 28.61 — To parallelle ledere
  // ==========================================================================
  "28.61": {
    title: "Kraft mellom to parallelle ledere",
    difficulty: "vanskelig",
    pageRef: "s. 948",
    problem: (
      <div className="space-y-2">
        <p>
          To lange parallelle ledere står 0,400 m fra hverandre. Den ene fører 8,00 A, den andre 5,00 A,
          i samme retning. (a) Hva er kraften per meter mellom dem? (b) Er den tiltrekkende eller frastøtende?
          (c) Hva blir magnetfeltet midt mellom dem?
        </p>
        <svg viewBox="0 0 260 120" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <line x1="60" y1="15" x2="60" y2="105" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red-k28)" />
          <line x1="200" y1="15" x2="200" y2="105" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue-k28)" />
          <text x="45" y="25" fontSize="10" fill="#ef4444">I1 = 8 A</text>
          <text x="180" y="25" fontSize="10" fill="#3b82f6">I2 = 5 A</text>
          <line x1="65" y1="60" x2="195" y2="60" stroke="#10b981" strokeDasharray="3 2" />
          <text x="115" y="55" fontSize="10" fill="#10b981">r = 0,4 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="I_1=8{,}00\;\text{A},\;I_2=5{,}00\;\text{A}" />, samme retning</li>
        <li><InlineLatex latex="r=0{,}400\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Kraft per meter, retning, og B midt mellom.</p>,
    strategy: (
      <TheoryBox title="Parallelle ledere tiltrekker hverandre når strømmene går samme vei">
        <p>
          Hver leder lager et felt som den andre sitter i. Kraft per meter:
          <InlineLatex latex="\;F/L=\dfrac{\mu_0 I_1 I_2}{2\pi r}" />. Samme retning ⇒ tiltrekning.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Midtveis: feltene fra de to lederne peker i <em>motsatt</em> retning og kanselleres delvis.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Kraft mellom parallelle ledere — hvor kommer formelen fra?">
          <p>
            Dette er et klassisk «kombinasjon»-problem: felt fra én leder + Lorentz­kraft på strømmen i den andre.
            Vi starter med to originalformler vi allerede har:
          </p>
          <FormulaBox latex="\text{(i) Felt fra rett leder:}\quad B=\dfrac{\mu_0 I}{2\pi r}" />
          <FormulaBox latex="\text{(ii) Kraft på strømførende leder i B-felt:}\quad \vec F=I\,\vec L\times\vec B" />
          <p>
            Leder 1 lager et felt <InlineLatex latex="B_1=\mu_0 I_1/(2\pi r)" /> i posisjonen til leder 2. Leder 2 fører strøm
            <InlineLatex latex="\;I_2" /> og kjenner derfor en kraft per lengde <InlineLatex latex="F/L=I_2 B_1" />
            (fordi strømmen står vinkelrett på feltet). Kombinert:
          </p>
          <FormulaBox latex="\dfrac{F}{L}=I_2 B_1=I_2\cdot\dfrac{\mu_0 I_1}{2\pi r}=\dfrac{\mu_0 I_1 I_2}{2\pi r}" />
          <p>
            Retnings­regelen: bruk høyrehånd på B-feltet fra leder 1, så høyre­hånds­regelen på Lorentz-kraften.
            Resultatet er enkelt: <em>samme</em> strømretning ⇒ <strong>tiltrekning</strong>; motsatt ⇒ frastøtning.
            Faktisk er dette den historiske definisjonen av ampere: den strømmen som i to uendelig lange parallelle ledere,
            1 m fra hverandre, gir <InlineLatex latex="2\times 10^{-7}" /> N/m.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Kraft per meter — sett inn i kombinert formel">
          <p>
            Med <InlineLatex latex="\mu_0/(2\pi)=2\times 10^{-7}" /> og tallene gitt:
          </p>
          <FormulaBox latex="\dfrac{F}{L}=\dfrac{\mu_0 I_1 I_2}{2\pi r}=(2\times 10^{-7})\dfrac{8{,}00\cdot 5{,}00}{0{,}400}" />
          <FormulaBox latex="\dfrac{F}{L}=(2\times 10^{-7})\cdot 100=2{,}00\times 10^{-5}\;\text{N/m}" />
        </Step>
        <Step n={2} title="(b) Retning — tiltrekkende eller frastøtende?">
          <p>
            Strømmene går samme vei. Med høyre­hånds­regelen: feltet fra leder 1 ved leder 2 peker én vei, og kraften
            <InlineLatex latex="\;I_2\vec L\times\vec B" /> peker <em>mot</em> leder 1. Symmetrisk gjelder motsatt vei.
          </p>
          <p>Konklusjon: parallelle strømmer (samme retning) ⇒ <strong>tiltrekkende</strong>.</p>
        </Step>
        <Step n={3} title="(c) Felt midt mellom lederne — superposisjon">
          <p>
            Midt imellom er avstanden fra hver leder <InlineLatex latex="r_1=r_2=0{,}200\;\text{m}" />.
            Siden strømmene går samme vei, peker feltet fra leder 1 midt mellom én vei (si inn i arket), og feltet fra
            leder 2 peker <em>motsatt</em> vei (ut av arket) — høyre­hånds­regelen fra hver sin side. Altså trekker vi
            fra, ikke legger til:
          </p>
          <FormulaBox latex="B_\text{netto}=B_1-B_2=\dfrac{\mu_0}{2\pi(0{,}2)}(I_1-I_2)" />
          <p>
            Med <InlineLatex latex="\mu_0/(2\pi\cdot 0{,}2)=(2\times 10^{-7})/0{,}2=10^{-6}" />:
          </p>
          <FormulaBox latex="B=\dfrac{\mu_0}{2\pi(0{,}2)}(I_1-I_2)=(10^{-6})(8{,}00-5{,}00)=3{,}00\;\mu\text{T}" />
          <FormulaBox variant="gold" latex="\boxed{\;F/L=2{,}00\times 10^{-5}\,\text{N/m (tiltrekkende)},\;B=3{,}00\,\mu\text{T}\;}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 20 μN/m er mikroskopisk — vi merker det ikke til daglig, men i sterkt strøm­førende parallelle
          samle­skinner kan det bli betydelig. Husk: hvis strømmene hadde gått <em>motsatt</em> vei, ville kraften vært
          frastøtende <em>og</em> feltet midt mellom ville vært summen <InlineLatex latex="(B_1+B_2)" /> i stedet for differansen.
          Fortegn og retning er alfa og omega i E&amp;M.
        </p>
      </div>
    ),
    summary: (
      <p>
        Strømmer i samme retning tiltrekker; motsatte strømmer frastøter. Denne effekten definerer SI-enheten ampere.
        Mellom lederne peker feltene motsatt og delsammensmeltes.
      </p>
    ),
  },
};
