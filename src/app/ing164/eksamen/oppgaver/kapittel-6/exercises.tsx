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
      <marker id="arrow-red-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#a855f7" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 6
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 6.1 — Skyve bok på bord
  // ==========================================================================
  "6.1": {
    title: "Arbeid fra flere krefter på bok",
    difficulty: "lett",
    pageRef: "s. 198",
    problem: (
      <div className="space-y-2">
        <p>
          Du skyver en fysikkbok 1,50{"\u00A0"}m langs et horisontalt bord med
          en horisontal kraft på 2,40{"\u00A0"}N. Friksjonen motvirker bevegelsen
          med 0,600{"\u00A0"}N. Hvor mye arbeid utfører (a) din kraft, (b)
          friksjonen, (c) normalkraften, (d) gravitasjonen og (e) nettokraften?
        </p>
        <svg viewBox="0 0 360 140" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* floor */}
          <line x1="20" y1="100" x2="340" y2="100" stroke="currentColor" strokeWidth="2" />
          {/* book */}
          <rect x="140" y="70" width="60" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="170" y="90" fontSize="10" textAnchor="middle" fill="#92400e">bok</text>
          {/* push force */}
          <line x1="210" y1="85" x2="260" y2="85" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-blue-k6)" />
          <text x="265" y="82" fontSize="11" fill="#3b82f6">F = 2,40 N</text>
          {/* friction */}
          <line x1="140" y1="85" x2="105" y2="85" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-k6)" />
          <text x="70" y="82" fontSize="11" fill="#ef4444">f = 0,60 N</text>
          {/* displacement */}
          <line x1="170" y1="115" x2="260" y2="115" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-green-k6)" />
          <text x="215" y="130" fontSize="10" fill="#10b981" textAnchor="middle">d = 1,50 m</text>
          {/* weight */}
          <line x1="170" y1="70" x2="170" y2="45" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple-k6)" transform="rotate(180 170 57)" />
          <text x="175" y="40" fontSize="10" fill="#a855f7">mg</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Forskyvning: <InlineLatex latex="d=1{,}50\;\text{m}" /></li>
        <li>Skyvekraft: <InlineLatex latex="F=2{,}40\;\text{N}" /> (horisontal)</li>
        <li>Friksjon: <InlineLatex latex="f=0{,}600\;\text{N}" /></li>
        <li>Bevegelse horisontalt, ingen vertikal bevegelse</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid utført av hver kraft: <InlineLatex latex="W_F,W_f,W_n,W_g,W_\text{tot}" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <p>
          Bruk definisjonen av arbeid utført av en konstant kraft langs en rett
          forskyvning. Vinkelen mellom kraft og forskyvning bestemmer om arbeidet
          er positivt, negativt eller null.
        </p>
        <TheoryBox title="Arbeid utført av en konstant kraft">
          <p>
            Arbeid er skalarproduktet av kraft og forskyvning:
          </p>
          <FormulaBox latex="W = \vec F \cdot \vec s = F\,s\cos\phi" variant="gold" />
          <p className="mt-1">
            <InlineLatex latex="\phi" /> er vinkelen mellom kraftvektoren og
            forskyvningsvektoren. Tre nyttige spesialtilfeller:
          </p>
          <ul className="list-disc pl-5 text-xs mt-1">
            <li><InlineLatex latex="\phi=0^\circ" />: kraft i bevegelsesretning → <InlineLatex latex="W=Fs>0" /></li>
            <li><InlineLatex latex="\phi=180^\circ" />: kraft mot bevegelsen → <InlineLatex latex="W=-Fs<0" /></li>
            <li><InlineLatex latex="\phi=90^\circ" />: kraft vinkelrett på bevegelse → <InlineLatex latex="W=0" /></li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Den horisontale forskyvningen er <InlineLatex latex="s=1{,}50\;\text{m}" />. Alle vertikale krefter står vinkelrett på bevegelsen.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Totalarbeidet kan enten finnes ved summen av alle arbeid, eller ved nettokraften: <InlineLatex latex="W_\text{tot}=F_\text{net}\cdot s" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Arbeid er et skalart mål på energioverføringen fra en
          kraft til et objekt. Definisjonen for konstant kraft langs en rett forskyvning er
          skalarproduktet mellom kraft- og forskyvningsvektoren. Bare komponenten av kraften
          som er <em>parallell</em> med bevegelsen bidrar — vinkelrette komponenter gir
          null arbeid.
        </p>
        <FormulaBox latex="W = \vec F \cdot \vec s = F\,s\cos\phi" variant="blue" />
        <p>
          Her er <InlineLatex latex="\phi" /> vinkelen mellom kraftvektoren og
          forskyvningsvektoren. Tegnet på arbeidet forteller om kraften tilfører
          energi (<InlineLatex latex="\phi<90^\circ" />) eller tapper energi
          (<InlineLatex latex="\phi>90^\circ" />).
        </p>

        <p className="font-semibold">(a) Arbeid fra skyvekraften</p>
        <p>
          Skyvekraften peker i samme retning som bevegelsen, så{" "}
          <InlineLatex latex="\phi=0^\circ" /> og <InlineLatex latex="\cos 0^\circ=1" />.
          Dette er tilfellet der kraften tilfører maksimal energi per lengdeenhet.
        </p>
        <FormulaBox latex="W_F = F\,s\cos 0^\circ = (2{,}40\;\text{N})(1{,}50\;\text{m})(1) = 3{,}60\;\text{J}" variant="blue" />

        <p className="font-semibold">(b) Arbeid fra friksjon</p>
        <p>
          Kinetisk friksjon virker alltid <em>mot</em> bevegelsen, så{" "}
          <InlineLatex latex="\phi=180^\circ" /> og{" "}
          <InlineLatex latex="\cos 180^\circ=-1" />. Friksjonen fjerner energi fra
          boken (omgjør den til varme).
        </p>
        <FormulaBox latex="W_f = f\,s\cos 180^\circ = -(0{,}600\;\text{N})(1{,}50\;\text{m}) = -0{,}900\;\text{J}" variant="blue" />

        <p className="font-semibold">(c, d) Arbeid fra normalkraft og tyngdekraft</p>
        <p>
          Begge kreftene er vertikale, mens forskyvningen er horisontal. Vinkelen er
          <InlineLatex latex="\,\phi=90^\circ" /> og{" "}
          <InlineLatex latex="\cos 90^\circ=0" />. Bevegelsen er <em>vinkelrett</em>{" "}
          på kraftretningen, så disse kreftene overfører ingen energi til boken.
        </p>
        <FormulaBox latex="W_n = W_g = F\,s\cos 90^\circ = 0" variant="blue" />

        <p className="font-semibold">(e) Totalt arbeid</p>
        <p>
          Siden arbeid er en skalar kan vi ganske enkelt <em>summere</em> bidragene.
          Alternativt kan vi bruke at totalarbeidet også er lik nettokraften ganget
          med forskyvningen, <InlineLatex latex="W_\text{tot}=F_\text{net}\cdot s" /> —
          en konsekvens av at arbeidsbegrepet er lineært i kraften.
        </p>
        <FormulaBox latex="W_\text{tot} = W_F + W_f + W_n + W_g = 3{,}60 + (-0{,}900) + 0 + 0" variant="blue" />
        <FormulaBox latex="W_\text{tot}=W_F+W_f+W_n+W_g=3{,}60-0{,}900=\boxed{2{,}70\;\text{J}}" variant="gold" />
        <p>
          <strong>Sjekk:</strong> Nettokraft horisontalt er{" "}
          <InlineLatex latex="F_\text{net}=2{,}40-0{,}60=1{,}80\;\text{N}" />, og{" "}
          <InlineLatex latex="(1{,}80)(1{,}50)=2{,}70\;\text{J}" /> ✓. Størrelsesorden
          er rimelig for å skyve en bok et par meter.
        </p>
      </div>
    ),
    summary: (
      <p>
        Arbeid skilles fra kraft: bare komponenten <em>langs forskyvningen</em>
        teller. Vertikale krefter på en horisontal bevegelse gjør aldri arbeid.
        Totalarbeidet er lik nettokraft ganger forskyvning.
      </p>
    ),
  },

  // ==========================================================================
  // 6.2 — Tauebilen
  // ==========================================================================
  "6.2": {
    title: "Arbeid fra taukraft under vinkel",
    difficulty: "lett",
    pageRef: "s. 199",
    problem: (
      <div className="space-y-2">
        <p>
          En tauebil trekker en bil 5,00{"\u00A0"}km horisontalt ved hjelp av
          en kabel med strekk 850{"\u00A0"}N. (a) Hvor mye arbeid utfører kabelen
          på bilen hvis den trekker horisontalt? (b) Hvis kabelen er 35° over
          horisontalen? (c) Hvor mye arbeid utfører kabelen på tauebilen i (a)
          og (b)? (d) Hvor mye arbeid utfører tyngdekraften på bilen i (a)?
        </p>
        <svg viewBox="0 0 360 140" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <line x1="20" y1="100" x2="340" y2="100" stroke="currentColor" strokeWidth="2" />
          {/* tow truck */}
          <rect x="30" y="60" width="70" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="65" y="85" fontSize="10" textAnchor="middle" fill="#1e40af">tauebil</text>
          {/* car */}
          <rect x="230" y="70" width="60" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="260" y="90" fontSize="10" textAnchor="middle" fill="#92400e">bil</text>
          {/* cable at 35 deg */}
          <line x1="100" y1="70" x2="230" y2="82" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
          <line x1="230" y1="82" x2="170" y2="60" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-k6)" />
          <text x="160" y="55" fontSize="10" fill="#ef4444">T=850 N, 35°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="s=5{,}00\;\text{km}=5000\;\text{m}" /></li>
        <li><InlineLatex latex="T=850\;\text{N}" /></li>
        <li>Vinkler: 0° (a) og 35° (b)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid fra kabelen på bilen i (a) og (b)</li>
        <li>Arbeid fra kabelen på tauebilen</li>
        <li>Arbeid fra tyngdekraften på bilen</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <p>
          Bruk <InlineLatex latex="W=Ts\cos\phi" />. Kabelen utøver motsatt
          rettet kraft på tauebilen (Newtons 3. lov) — men bevegelsen er den
          samme; tegnet på <InlineLatex latex="\cos\phi" /> endrer seg.
        </p>
        <TheoryBox title="Newtons 3. lov og arbeid">
          <p>
            En kabel trekker begge endene mot hverandre med samme strekk{" "}
            <InlineLatex latex="T" />. På tauebilen peker strekket{" "}
            <em>bakover</em> (mot bilen som taues), mens tauebilen beveger seg
            fremover — altså motvirker kabelen bevegelsen til tauebilen.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>På tauebilen er vinkelen 180° (horisontal drag) eller <InlineLatex latex="180^\circ-35^\circ=145^\circ" /> (med vinkel).</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Grunnligningen er den samme som i 6.1 —{" "}
          <InlineLatex latex="W = \vec F\cdot\vec s = F\,s\cos\phi" />. Her er den ene
          subtiliteten at et tau virker med <em>samme</em> strekk i begge ender
          (Newtons 3. lov), men fordi retningen kabelen trekker er ulik for tauebil
          og bil, blir vinkelen <InlineLatex latex="\phi" /> forskjellig.
        </p>
        <FormulaBox latex="W = F\,s\cos\phi" variant="blue" />

        <p className="font-semibold">(a) Horisontal kabel på bilen</p>
        <p>
          Kabelen trekker bilen fremover, samme retning som bevegelsen:{" "}
          <InlineLatex latex="\phi=0^\circ" />, <InlineLatex latex="\cos\phi=1" />.
        </p>
        <FormulaBox latex="W = T\,s\cos 0^\circ = (850\;\text{N})(5000\;\text{m})(1)" variant="blue" />
        <FormulaBox latex="W=Ts=850\cdot 5000=\boxed{4{,}25\times 10^6\;\text{J}}" variant="gold" />

        <p className="font-semibold">(b) Kabel 35° over horisontalen</p>
        <p>
          Nå har strekket både en horisontal og en vertikal komponent, men bilen
          beveger seg bare horisontalt. Bare den horisontale komponenten{" "}
          <InlineLatex latex="T\cos 35^\circ" /> bidrar til arbeidet.
        </p>
        <FormulaBox latex="W = T\,s\cos 35^\circ = (850)(5000)(0{,}8192)" variant="blue" />
        <FormulaBox latex="W=Ts\cos 35^\circ=850\cdot 5000\cdot 0{,}8192=\boxed{3{,}48\times 10^6\;\text{J}}" variant="gold" />
        <p className="italic text-xs">
          At <InlineLatex latex="\cos 35^\circ\approx 0{,}82" /> betyr at ca 18 % av
          kraften "kastes bort" vertikalt — det bidrar bare til å presse bilen
          oppover, ikke fremover.
        </p>

        <p className="font-semibold">(c) Arbeid på tauebilen</p>
        <p>
          Newtons 3. lov: hvis kabelen trekker bilen fremover med strekk{" "}
          <InlineLatex latex="T" />, trekker den tauebilen <em>bakover</em> med samme
          strekk. Men tauebilen beveger seg <em>fremover</em>. Vinkelen er derfor{" "}
          <InlineLatex latex="180^\circ" /> i (a) og{" "}
          <InlineLatex latex="180^\circ-35^\circ=145^\circ" /> i (b). Merk at{" "}
          <InlineLatex latex="\cos 145^\circ=-\cos 35^\circ" />.
        </p>
        <FormulaBox latex="W_a=-4{,}25\times 10^6\;\text{J},\quad W_b=-3{,}48\times 10^6\;\text{J}" variant="blue" />

        <p className="font-semibold">(d) Tyngdekraften på bilen i (a)</p>
        <p>
          Tyngdekraften er vertikal, forskyvningen horisontal →{" "}
          <InlineLatex latex="\phi=90^\circ" />, og{" "}
          <InlineLatex latex="\cos 90^\circ=0" />.
        </p>
        <FormulaBox latex="W_g=mg\cdot s\cdot\cos 90^\circ = 0" variant="blue" />
        <p>
          <strong>Fysisk tolkning:</strong> Det totale arbeidet kabelen gjør på{" "}
          <em>systemet</em> (bil + tauebil) er null — energi overføres fra tauebilens
          motor via kabelen til bilen, men kabelen i seg selv lagrer ikke energi.
        </p>
      </div>
    ),
    summary: (
      <p>
        Arbeid fra en ekstern kraft avhenger av <em>vinkelen</em> mellom kraft og
        forskyvning, ikke av hvilken gjenstand som "utfører" kraften. Kabler
        gjør like mye og motsatt arbeid på begge ender (men på ulike objekter
        som flytter seg ulikt).
      </p>
    ),
  },

  // ==========================================================================
  // 6.3 — Skyve kasse med friksjon
  // ==========================================================================
  "6.3": {
    title: "Arbeid på kasse ved konstant hastighet",
    difficulty: "lett",
    pageRef: "s. 199",
    problem: (
      <p>
        En fabrikkarbeider skyver en 30,0{"\u00A0"}kg kasse 4,5{"\u00A0"}m
        langs et horisontalt gulv med konstant hastighet ved å skyve horisontalt.
        Kinetisk friksjonskoeffisient er 0,25. (a) Hvor stor kraft må arbeideren
        bruke? (b) Hvor mye arbeid utfører denne kraften? (c) Hvor mye arbeid
        utfører friksjonen? (d) Normalkraften? Tyngdekraften? (e) Totalt arbeid?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=30{,}0\;\text{kg}" />, <InlineLatex latex="s=4{,}5\;\text{m}" />, <InlineLatex latex="\mu_k=0{,}25" /></li>
        <li>Konstant hastighet: <InlineLatex latex="a=0" /></li>
      </ul>
    ),
    unknowns: <p>Nødvendig kraft og arbeid fra hver enkelt kraft samt totalt arbeid.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Konstant hastighet betyr likevekt (<InlineLatex latex="\sum F=0" />).
          Da balanserer skyvekraften friksjonen helt.
        </p>
        <TheoryBox title="Kinetisk friksjon">
          <FormulaBox latex="f_k=\mu_k\,n" variant="blue" />
          <p>
            Normalkraften <InlineLatex latex="n=mg" /> på vannrett gulv.
            Friksjonen virker <em>motsatt</em> bevegelsen og er{" "}
            <em>uavhengig av hastighet</em> (så lenge objektet glir).
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor blir totalarbeid null?">
          <p>
            Fra arbeid-energi-teoremet:{" "}
            <InlineLatex latex="W_\text{tot}=\Delta KE" />. Konstant hastighet{" "}
            ⟹ <InlineLatex latex="\Delta KE=0" /> ⟹{" "}
            <InlineLatex latex="W_\text{tot}=0" />. Dette er en kraftig
            konsistenssjekk!
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Finn først <InlineLatex latex="F=f_k=\mu_k mg" />, så regn ut arbeidene.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> "Konstant hastighet" er et kodeord fra Newtons 1.
          lov: summen av alle krefter er null (<InlineLatex latex="\sum\vec F=\vec 0" />).
          For kinetisk friksjon gjelder <InlineLatex latex="f_k=\mu_k n" />, der{" "}
          <InlineLatex latex="n" /> er normalkraften. På horisontalt gulv uten andre
          vertikale krefter er <InlineLatex latex="n=mg" />.
        </p>
        <FormulaBox latex="\sum F_x = 0,\quad f_k = \mu_k n,\quad n = mg" variant="blue" />

        <p className="font-semibold">(a) Nødvendig skyvekraft</p>
        <p>
          Newton i x-retning: <InlineLatex latex="F - f_k = 0\;\Rightarrow\; F = f_k = \mu_k m g" />.
          Denne sammenhengen sier at skyvekraften er <em>akkurat</em> lik friksjonen —
          hverken mer eller mindre — ellers ville boksen akselerert.
        </p>
        <FormulaBox latex="F = \mu_k m g" variant="blue" />
        <FormulaBox latex="F=\mu_k mg=(0{,}25)(30{,}0)(9{,}80)=\boxed{73{,}5\;\text{N}}" variant="gold" />

        <p className="font-semibold">(b) Arbeid fra skyvekraften</p>
        <p>
          Kraften er horisontal og i bevegelsesretningen (<InlineLatex latex="\phi=0^\circ" />):
        </p>
        <FormulaBox latex="W_F = F\,s\cos 0^\circ = F\,s" variant="blue" />
        <FormulaBox latex="W_F=Fs=(73{,}5)(4{,}5)=\boxed{331\;\text{J}}" variant="blue" />

        <p className="font-semibold">(c) Arbeid fra friksjonen</p>
        <p>
          Friksjonen har samme størrelse som skyvekraften, men peker motsatt:{" "}
          <InlineLatex latex="\phi=180^\circ" />.
        </p>
        <FormulaBox latex="W_f = f_k\,s\cos 180^\circ = -f_k\,s" variant="blue" />
        <FormulaBox latex="W_f=-fs=-(73{,}5)(4{,}5)=\boxed{-331\;\text{J}}" variant="blue" />

        <p className="font-semibold">(d) Normalkraft og tyngdekraft</p>
        <p>
          Begge er vinkelrette på den horisontale forskyvningen:{" "}
          <InlineLatex latex="W_n=W_g=0" />.
        </p>

        <p className="font-semibold">(e) Totalt arbeid</p>
        <p>
          Arbeid-energi-teoremet sier at{" "}
          <InlineLatex latex="W_\text{tot}=\Delta K" />. Konstant hastighet betyr{" "}
          <InlineLatex latex="\Delta K=0" />, så vi <em>forventer</em> at totalarbeidet
          er null. Dette er en kraftfull konsistenssjekk.
        </p>
        <FormulaBox latex="W_\text{tot}=331-331+0+0=\boxed{0\;\text{J}}" variant="gold" />
        <p className="italic text-xs">
          Selv om individuelle krefter gjør mye arbeid (±331 J), balanserer de hverandre
          presist — skyvekraften tilfører 331 J som friksjonen umiddelbart omgjør til
          varme.
        </p>
      </div>
    ),
    summary: (
      <p>
        "Konstant hastighet" er et kodeord for <InlineLatex latex="\sum F=0" />{" "}
        <em>og</em> <InlineLatex latex="W_\text{tot}=0" />. Individuelle krefter kan gjøre
        mye arbeid, men netto blir null når KE ikke endres.
      </p>
    ),
  },

  // ==========================================================================
  // 6.5 — Maler klatrer opp stige
  // ==========================================================================
  "6.5": {
    title: "Arbeid fra tyngdekraften på maler som klatrer",
    difficulty: "lett",
    pageRef: "s. 199",
    problem: (
      <div className="space-y-2">
        <p>
          En 75,0{"\u00A0"}kg maler klatrer opp en 2,75{"\u00A0"}m stige som
          lener seg mot en vertikal vegg. Stigen danner 30,0° med veggen. (a)
          Hvor mye arbeid utfører tyngdekraften på maleren? (b) Avhenger svaret
          av om han klatrer med konstant fart eller akselererer?
        </p>
        <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          {/* floor & wall */}
          <line x1="20" y1="180" x2="260" y2="180" stroke="currentColor" strokeWidth="2" />
          <line x1="220" y1="180" x2="220" y2="40" stroke="currentColor" strokeWidth="2" />
          {/* ladder */}
          <line x1="70" y1="180" x2="220" y2="50" stroke="#f59e0b" strokeWidth="3" />
          <text x="115" y="110" fontSize="10" fill="#f59e0b">L=2,75 m</text>
          {/* height */}
          <line x1="215" y1="180" x2="215" y2="50" stroke="#10b981" strokeWidth="1" strokeDasharray="4" />
          <text x="235" y="120" fontSize="10" fill="#10b981">h</text>
          {/* angle at top */}
          <text x="200" y="65" fontSize="10" fill="#3b82f6">30°</text>
          {/* painter */}
          <circle cx="140" cy="120" r="6" fill="#a855f7" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=75{,}0\;\text{kg}" />, <InlineLatex latex="L=2{,}75\;\text{m}" /></li>
        <li>Vinkel mellom stigen og veggen: 30°</li>
      </ul>
    ),
    unknowns: <p>Arbeid utført av tyngdekraften under hele oppstigningen.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Tyngdekraften gir bare arbeid gjennom vertikal forskyvning. Stigen er
          2,75 m lang og danner 30° med veggen (altså 60° med gulvet), så
          høydeforskjellen er <InlineLatex latex="h=L\cos 30^\circ" />.
        </p>
        <TheoryBox title="Arbeid av tyngdekraften — kun vertikal forskyvning teller">
          <p>
            For en vertikal forskyvning <InlineLatex latex="\Delta y" /> (positivt
            oppover):
          </p>
          <FormulaBox latex="W_g=-mg\,\Delta y" variant="gold" />
          <p className="mt-1">
            Minus fordi gravitasjonen peker nedover, mens forskyvningen er
            oppover. Dette er en <em>konservativ kraft</em> — arbeidet
            avhenger bare av endepunktene, ikke av banen eller farten.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Vinkelen mellom stigen og <em>veggen</em> er 30°. Vertikal komponent av forskyvningen: <InlineLatex latex="L\cos 30^\circ" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Tyngdekraften <InlineLatex latex="\vec F_g = -mg\hat\jmath" />{" "}
          peker rett nedover. Arbeidet fra en konstant kraft er{" "}
          <InlineLatex latex="W = \vec F\cdot\vec s" />, og skalarproduktet gir at
          bare komponenten av forskyvningen <em>parallell</em> med kraften teller.
          For tyngdekraften betyr det at bare <em>vertikal</em> forskyvning bidrar —
          horisontal bevegelse gir null arbeid.
        </p>
        <FormulaBox latex="W_g = \vec F_g\cdot\vec s = -mg\,\Delta y" variant="blue" />
        <p>
          Minustegnet kommer fra at kraft peker ned mens <InlineLatex latex="\Delta y" />{" "}
          er positivt opp. Tyngdekraften er en <em>konservativ</em> kraft — arbeidet
          avhenger kun av endepunktene, ikke av banen eller farten. Dette er
          forspillet til potensiell energi i kapittel 7.
        </p>

        <p className="font-semibold">(a) Finn høydeendringen</p>
        <p>
          Stigen har lengde <InlineLatex latex="L=2{,}75\;\text{m}" /> og danner{" "}
          <InlineLatex latex="30^\circ" /> med <em>veggen</em> (ikke gulvet). Da er
          vinkelen til <em>vertikalen</em> lik <InlineLatex latex="30^\circ" />, så
          den vertikale komponenten av stigen er{" "}
          <InlineLatex latex="L\cos 30^\circ" />. Litt geometri løser dette for oss.
        </p>
        <FormulaBox latex="\Delta y = L\cos 30^\circ" variant="blue" />
        <FormulaBox latex="\Delta y=L\cos 30^\circ=(2{,}75)(0{,}866)=2{,}382\;\text{m}" variant="blue" />

        <p className="font-semibold">Arbeid av tyngdekraften</p>
        <p>
          Nå bruker vi formelen for arbeidet. Maleren <em>stiger</em>, så{" "}
          <InlineLatex latex="\Delta y>0" /> og <InlineLatex latex="W_g<0" /> —
          tyngdekraften motvirker bevegelsen og tar energi fra maleren.
        </p>
        <FormulaBox latex="W_g=-mg\,\Delta y=-(75{,}0)(9{,}80)(2{,}382)=\boxed{-1{,}75\times 10^3\;\text{J}}" variant="gold" />

        <p className="font-semibold">(b) Avhengighet av bevegelsesmåte</p>
        <p>
          <strong>Nei.</strong> Fordi tyngdekraften er konservativ, avhenger{" "}
          <InlineLatex latex="W_g" /> kun av høydedifferansen{" "}
          <InlineLatex latex="\Delta y" />. Om maleren sprinter opp på 2 sekunder
          eller kryper på 5 minutter — arbeidet er det samme{" "}
          <InlineLatex latex="-1{,}75\;\text{kJ}" />. Dette er helt annerledes enn
          f.eks. friksjon, der arbeidet avhenger av den totale banelengden.
        </p>
        <p className="italic text-xs">
          Størrelsesorden: ~1,7 kJ for å løfte en person ~2,4 m er rimelig — ca
          energien i en banan.
        </p>
      </div>
    ),
    summary: (
      <p>
        Gravitasjonen er en konservativ kraft —{" "}
        <InlineLatex latex="W_g=-mg\,\Delta y" /> uavhengig av fart eller sti.
        Dette blir sentralt i kapittel 7 (potensiell energi).
      </p>
    ),
  },

  // ==========================================================================
  // 6.6 — To taubåter
  // ==========================================================================
  "6.6": {
    title: "To taubåter trekker supertanker",
    difficulty: "middels",
    pageRef: "s. 199",
    problem: (
      <p>
        To taubåter trekker en skadet supertanker. Hver båt utøver en konstant
        kraft på 1,80 × 10⁶ N — den ene 14° vest for nord, den andre 14° øst
        for nord — mens de trekker tankeren 0,75 km rett nord. Hva er det
        totale arbeidet de utfører på tankeren?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F_1=F_2=1{,}80\times 10^6\;\text{N}" />, begge 14° fra nord</li>
        <li><InlineLatex latex="s=750\;\text{m}" /> nord</li>
      </ul>
    ),
    unknowns: <p>Totalt arbeid fra begge båter.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Bevegelsen er rett nord. Øst/vest-komponentene av kraftene kansellerer
          hverandre, nord-komponentene legger seg sammen.
        </p>
        <TheoryBox title="Arbeid er skalart — summér enten krefter eller arbeid">
          <p>To ekvivalente strategier:</p>
          <ul className="list-disc pl-5">
            <li>Finn nettokraften i bevegelsesretningen, multipliser med s.</li>
            <li>Regn ut arbeidet fra hver kraft separat, summer.</li>
          </ul>
          <p>Begge gir samme svar siden arbeid er en skalar.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk <InlineLatex latex="W=Fs\cos 14^\circ" /> for hver båt, eller nettokraft.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Arbeidet fra flere krefter på samme objekt er en
          skalar — det betyr vi enten (1) finner nettokraften og multipliserer med
          forskyvningen, eller (2) regner ut arbeidet fra hver kraft separat og
          summerer. Begge metoder gir samme svar siden både{" "}
          <InlineLatex latex="W" /> og vektorkomponentene er lineære i kraften.
        </p>
        <FormulaBox latex="W_\text{tot} = \sum_i \vec F_i\cdot\vec s = \left(\sum_i \vec F_i\right)\cdot\vec s" variant="blue" />
        <p>
          Her har vi to symmetriske krefter 14° på hver side av bevegelsesretningen
          (nord). Komponenten <em>på tvers</em> (øst/vest) kansellerer; bare
          komponenten langs nord bidrar. Forskyvningen er 750 m nord.
        </p>
        <p>
          Merk: <InlineLatex latex="s=0{,}75\;\text{km}=750\;\text{m}" /> (regn alltid
          i SI-enheter — N × m gir joule direkte).
        </p>

        <p className="font-semibold">Arbeid per båt</p>
        <p>
          Hver kraft gjør arbeid <InlineLatex latex="W_i = F\,s\cos 14^\circ" />.
          Kosinus for små vinkler er nær 1, så det meste av kraften går faktisk i
          nord-retning — men ikke alt.
        </p>
        <FormulaBox latex="W_i = F\,s\cos 14^\circ" variant="blue" />
        <FormulaBox latex="W_i=F\,s\cos 14^\circ=(1{,}80\times 10^6)(750)(0{,}9703)=1{,}310\times 10^9\;\text{J}" variant="blue" />

        <p className="font-semibold">Totalt arbeid</p>
        <p>
          Siden begge båtene gjør identisk arbeid (identiske krefter, samme vinkel,
          samme forskyvning), er totalen bare dobbelt så mye:
        </p>
        <FormulaBox latex="W_\text{tot}=2W_i=\boxed{2{,}62\times 10^9\;\text{J}}" variant="gold" />
        <p className="italic text-xs">
          Sjekk via nettokraft: øst/vest-komponentene kanselleres, nord-komponent
          per båt er <InlineLatex latex="F\cos 14^\circ" />, nettokraft nord er{" "}
          <InlineLatex latex="2F\cos 14^\circ" />, og multiplisert med 750 m gir
          samme 2,62 × 10⁹ J ✓.
        </p>
      </div>
    ),
    summary: (
      <p>
        Når kun én retning er interessant, bidrar bare den komponenten som er{" "}
        <em>langs</em> forskyvningen. Vinkelrette komponenter gir ingen arbeid.
      </p>
    ),
  },

  // ==========================================================================
  // 6.8 — Skyve skrått nedover
  // ==========================================================================
  "6.8": {
    title: "Kassa skjøvet ned skrått — effekt på friksjon",
    difficulty: "middels",
    pageRef: "s. 199",
    problem: (
      <p>
        Samme oppgave som 6.3, men arbeideren skyver 30° <em>under</em> horisontalen
        (nedover inn i gulvet). (a) Hvilken kraft trengs nå for konstant
        hastighet? (b) Hvor mye arbeid utfører denne kraften over 4,5 m?
        (c) Friksjonen? (d) Normalkraft og tyngdekraft? (e) Totalt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=30{,}0\;\text{kg}" />, <InlineLatex latex="\mu_k=0{,}25" />, <InlineLatex latex="s=4{,}5\;\text{m}" /></li>
        <li>Kraften peker 30° under horisontal</li>
        <li>Konstant hastighet</li>
      </ul>
    ),
    unknowns: <p>Kraften og alle arbeid.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Når du skyver <em>nedover</em>, øker normalkraften fordi den vertikale
          komponenten av skyvekraften presser ekstra mot gulvet. Da øker også
          friksjonen → større kraft kreves.
        </p>
        <TheoryBox title="Normalkraft endrer seg når kraft har vertikal komponent">
          <p>Newton i y-retning (ingen vertikal bevegelse):</p>
          <FormulaBox latex="n=mg+F\sin\theta" variant="blue" />
          <p>der <InlineLatex latex="\theta" /> er vinkelen under horisontalen. Så:</p>
          <FormulaBox latex="f_k=\mu_k n=\mu_k(mg+F\sin\theta)" variant="blue" />
          <p className="mt-1">
            Konstant hastighet i x: <InlineLatex latex="F\cos\theta=f_k" />. Løs
            for <InlineLatex latex="F" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Skriv opp Newtons 2. lov i begge retninger, med <InlineLatex latex="a=0" />.</p> },
      { label: "Hint 2", content: <p>Løs for F fra <InlineLatex latex="F\cos\theta=\mu_k(mg+F\sin\theta)" />.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når en skyvekraft danner vinkel{" "}
          <InlineLatex latex="\theta" /> <em>under</em> horisontalen, har den både en
          horisontal komponent <InlineLatex latex="F\cos\theta" /> (som skyver
          fremover) og en vertikal komponent <InlineLatex latex="F\sin\theta" /> (som
          presser <em>nedover</em> i gulvet). Den vertikale komponenten øker
          normalkraften, og siden <InlineLatex latex="f_k=\mu_k n" />, øker også
          friksjonen — det blir tyngre å skyve. Dette er fundamentalt en bruk av
          Newtons 2. lov i begge retninger.
        </p>

        <p className="font-semibold">Sett opp Newton i begge retninger</p>
        <p>
          Konstant hastighet betyr <InlineLatex latex="a_x=a_y=0" />. Vi får to
          ligninger:
        </p>
        <FormulaBox latex="\sum F_x = F\cos\theta - f_k = 0" variant="blue" />
        <FormulaBox latex="\sum F_y = n - mg - F\sin\theta = 0 \;\Rightarrow\; n = mg + F\sin\theta" variant="blue" />
        <p>
          Kombinert med <InlineLatex latex="f_k=\mu_k n" /> får vi ett ukjent{" "}
          <InlineLatex latex="F" /> i én ligning, som vi kan løse algebraisk.
        </p>

        <p className="font-semibold">(a) Algebraisk omforming</p>
        <p>
          Sett inn <InlineLatex latex="n" /> i friksjonsligningen, og løs for{" "}
          <InlineLatex latex="F" />:
        </p>
        <FormulaBox latex="F\cos\theta = \mu_k(mg + F\sin\theta)" variant="blue" />
        <FormulaBox latex="F(\cos\theta - \mu_k\sin\theta) = \mu_k m g" variant="blue" />
        <FormulaBox latex="F=\frac{\mu_k mg}{\cos\theta-\mu_k\sin\theta}" variant="blue" />
        <FormulaBox latex="F=\frac{(0{,}25)(30{,}0)(9{,}80)}{0{,}866-(0{,}25)(0{,}500)}=\frac{73{,}5}{0{,}741}=\boxed{99{,}2\;\text{N}}" variant="gold" />
        <p className="italic text-xs">
          Større enn 73,5 N i 6.3 — pga økt friksjon fra økt normalkraft (ca 35 %
          ekstra kraft trengs).
        </p>

        <p className="font-semibold">(b) Arbeid fra skyvekraften</p>
        <p>
          Skyvekraften har vinkel <InlineLatex latex="\theta=30^\circ" /> under
          horisontalen, men forskyvningen er horisontal. Det er altså vinkelen
          mellom kraft og forskyvning som teller — så <InlineLatex latex="\phi=30^\circ" />:
        </p>
        <FormulaBox latex="W_F = F\,s\cos 30^\circ" variant="blue" />
        <FormulaBox latex="W_F=Fs\cos 30^\circ=(99{,}2)(4{,}5)(0{,}866)=\boxed{386\;\text{J}}" variant="blue" />

        <p className="font-semibold">(c) Arbeid fra friksjon</p>
        <p>
          Friksjonen motvirker bevegelsen. Fra likevekt vet vi at{" "}
          <InlineLatex latex="f_k=F\cos\theta" />, altså lik den horisontale
          komponenten av skyvekraften.
        </p>
        <FormulaBox latex="W_f=-f_k s=-(F\cos\theta)s=-(99{,}2)(0{,}866)(4{,}5)=\boxed{-386\;\text{J}}" variant="blue" />
        <p className="italic text-xs">
          Like stort som skyvekraftens arbeid (fordi bare horisontal komponent av F
          bidrar), med motsatt fortegn — nødvendig for konstant hastighet.
        </p>

        <p className="font-semibold">(d) Normalkraft og tyngdekraft</p>
        <p>Begge vinkelrett på den horisontale forskyvningen, altså null arbeid.</p>

        <p className="font-semibold">(e) Totalt arbeid</p>
        <p>
          Arbeid-energi igjen: konstant hastighet{" "}
          <InlineLatex latex="\Rightarrow W_\text{tot}=0" />.
        </p>
        <FormulaBox latex="W_\text{tot}=386-386=\boxed{0\;\text{J}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Skyv skrått nedover → press ekstra mot gulvet → mer friksjon → mer kraft
        kreves. Lærdom: <em>vinkelen på kraften påvirker normalkraften</em> og
        dermed friksjonen.
      </p>
    ),
  },

  // ==========================================================================
  // 6.19 — Glidende bok (arbeid-energi)
  // ==========================================================================
  "6.19": {
    title: "Arbeid-energi på glidende bok",
    difficulty: "lett",
    pageRef: "s. 200",
    problem: (
      <p>
        En 1,50{"\u00A0"}kg bok glir langs en ru horisontal flate. I punkt A
        har den farten 3,21 m/s, i punkt B er den nede i 1,25 m/s. (a) Hvor
        mye arbeid ble gjort på boken fra A til B? (b) Dersom −0,750 J gjøres
        fra B til C, hva er farten ved C? (c) Hva om det gjøres +0,750 J?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1{,}50\;\text{kg}" /></li>
        <li><InlineLatex latex="v_A=3{,}21\;\text{m/s},\; v_B=1{,}25\;\text{m/s}" /></li>
        <li>Arbeid B→C: ±0,750 J</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="W_{A\to B},\;v_C" /> i begge deloppgaver.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid-energi-teoremet">
          <p>
            Nettoarbeidet på et objekt er lik endringen i kinetisk energi:
          </p>
          <FormulaBox latex="W_\text{tot}=\Delta KE = \tfrac12 m v_f^2 - \tfrac12 m v_i^2" variant="gold" />
          <p className="mt-1">
            Dette er det mest brukbare verktøyet i kapittel 6 — når du vet to av
            tre størrelser (<InlineLatex latex="v_i,v_f,W" />), finner du den
            tredje direkte.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>(b) + (c): <InlineLatex latex="W_{BC}=\tfrac12 m v_C^2-\tfrac12 m v_B^2" />, løs for <InlineLatex latex="v_C" />.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Arbeid-energi-teoremet er ett av de mest kraftfulle
          verktøyene i mekanikken. Det sier at <em>nettoarbeidet</em> på et objekt er
          lik endringen i kinetisk energi — uansett hvor mange krefter som virker og
          hvor komplisert banen er. Vi trenger ikke å vite hver enkelt kraft, bare
          sumvirkningen. Her bryr vi oss ikke om hvor lang tid det tok eller hvor
          langt boken beveget seg — bare start- og sluttfarten.
        </p>
        <FormulaBox latex="W_\text{tot}=\Delta K = \tfrac12 m v_f^2 - \tfrac12 m v_i^2" variant="blue" />
        <p>
          <strong>Hvorfor denne formelen?</strong> Vi kunne prøvd Newton's 2. lov, men
          vi kjenner verken akselerasjonen, kraften eller tiden separat. Arbeid-energi
          omgår alt dette. Merk også fortegnskonvensjonen: positivt nettoarbeid øker
          KE, negativt arbeid (som fra friksjon) fjerner KE.
        </p>

        <p className="font-semibold">(a) Arbeid fra A til B</p>
        <p>
          Boken går saktere i B enn i A — altså har KE minket, og nettoarbeidet må
          være <em>negativt</em>. Dette stemmer med at friksjonen er den eneste
          horisontale kraften som arbeider (den motvirker bevegelsen). Vi sett bare
          inn i formelen.
        </p>
        <FormulaBox latex="W_{AB}=\tfrac12 m(v_B^2-v_A^2)" variant="blue" />
        <FormulaBox latex="W_{AB}=\tfrac12(1{,}50)[(1{,}25)^2-(3{,}21)^2]=\tfrac12(1{,}50)(1{,}5625-10{,}304)=\boxed{-6{,}56\;\text{J}}" variant="gold" />
        <p className="italic text-xs">
          Enhet: kg·m²/s² = J ✓. Negativt tegn = friksjon fjerner energi, i tråd med
          vår forventning.
        </p>

        <p className="font-semibold">(b) B → C med W = −0,750 J</p>
        <p>
          Vi kjenner nå <InlineLatex latex="v_B" /> og{" "}
          <InlineLatex latex="W_{BC}" />. Omformer teoremet for{" "}
          <InlineLatex latex="v_C" />: <InlineLatex latex="W_{BC}=\tfrac12 m v_C^2-\tfrac12 m v_B^2" />{" "}
          gir <InlineLatex latex="v_C^2=v_B^2+2W_{BC}/m" />.
        </p>
        <FormulaBox latex="v_C=\sqrt{v_B^2+\tfrac{2W_{BC}}{m}}=\sqrt{1{,}5625+\tfrac{-1{,}50}{1{,}50}}=\sqrt{0{,}5625}=\boxed{0{,}750\;\text{m/s}}" variant="blue" />
        <p className="italic text-xs">
          Negativt W → redusert fart, som forventet. Merk: hvis{" "}
          <InlineLatex latex="2W/m < -v_B^2" />, ville bok en stoppet før C.
        </p>

        <p className="font-semibold">(c) B → C med W = +0,750 J</p>
        <p>
          Samme formel, men nå med positivt arbeid — kanskje noen skyver bok en i
          samme retning den beveger seg. Da øker KE og dermed farten.
        </p>
        <FormulaBox latex="v_C=\sqrt{1{,}5625+1{,}00}=\sqrt{2{,}5625}=\boxed{1{,}60\;\text{m/s}}" variant="blue" />
        <p className="italic text-xs">
          Fortegnsanalyse: samme mengde arbeid, motsatt tegn → veldig forskjellig
          sluttfart. Det er <em>fortegnet</em> som bestemmer om energi tilføres eller
          fjernes.
        </p>
      </div>
    ),
    summary: (
      <p>
        Arbeid-energi-teoremet lar deg hoppe over kinematikk når du ikke
        bryr deg om tid eller forskyvning — bare energi-balansen teller.
      </p>
    ),
  },

  // ==========================================================================
  // 6.20 — Spark på fotball
  // ==========================================================================
  "6.20": {
    title: "Kontaktavstand for fotballspark",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        En 0,420{"\u00A0"}kg fotball er i utgangspunktet i fart 2,00 m/s. En
        spiller sparker ballen med en konstant kraft på 40,0 N i samme retning
        som ballen beveger seg. Over hvor stor avstand må foten være i kontakt
        med ballen for at farten skal øke til 6,00 m/s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=0{,}420\;\text{kg}" /></li>
        <li><InlineLatex latex="v_i=2{,}00\;\text{m/s},\;v_f=6{,}00\;\text{m/s}" /></li>
        <li><InlineLatex latex="F=40{,}0\;\text{N}" /> i bevegelsesretningen</li>
      </ul>
    ),
    unknowns: <p>Avstand <InlineLatex latex="d" /> som foten er i kontakt med ballen.</p>,
    strategy: (
      <p>
        Arbeid-energi direkte: <InlineLatex latex="Fd=\Delta KE" />, siden F
        og forskyvning er i samme retning.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Løs <InlineLatex latex="d=\Delta KE/F" />.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Her kombinerer vi to originalformler. Arbeid av en
          konstant kraft som virker i bevegelsesretningen er{" "}
          <InlineLatex latex="W=Fd\cos 0^\circ=Fd" />. Arbeid-energi-teoremet sier at
          nettoarbeidet er lik endringen i kinetisk energi. Siden foten er eneste
          kraft som gjør arbeid på ballen i denne modellen (vi neglisjerer tyngdekraft
          — sparket er veldig kort), gjelder <InlineLatex latex="Fd=\Delta K" />.
        </p>
        <FormulaBox latex="W=Fd\cos\phi,\qquad W_\text{tot}=\Delta K = \tfrac12 m v_f^2-\tfrac12 m v_i^2" variant="blue" />
        <p>
          <strong>Hvorfor ikke Newton's 2. lov?</strong> Vi kunne i prinsippet brukt{" "}
          <InlineLatex latex="F=ma" /> og <InlineLatex latex="v_f^2=v_i^2+2ad" />, men
          arbeid-energi gir oss avstanden direkte fra energibalansen uten å gå veien
          om akselerasjon.
        </p>

        <Step n={1} title="Endring i kinetisk energi">
          <p>
            Ballen akselererer fra 2,00 m/s til 6,00 m/s under sparket. Bruk:{" "}
            <InlineLatex latex="\Delta K=\tfrac12 m(v_f^2-v_i^2)" />. Merk at det er{" "}
            <em>kvadratene</em> som teller — dobling av farten firedobler KE.
          </p>
          <FormulaBox latex="\Delta K=\tfrac12(0{,}420)(6^2-2^2)=\tfrac12(0{,}420)(32)=6{,}72\;\text{J}" variant="blue" />
        </Step>
        <Step n={2} title="Omform og løs for avstand">
          <p>
            Sett arbeidet lik <InlineLatex latex="\Delta K" /> og løs for d:
          </p>
          <FormulaBox latex="Fd=\Delta K\;\Rightarrow\;d=\frac{\Delta K}{F}" variant="blue" />
          <FormulaBox latex="d=\frac{\Delta K}{F}=\frac{6{,}72}{40{,}0}=\boxed{0{,}168\;\text{m}}" variant="gold" />
          <p className="italic text-xs">
            Enhetssjekk: J/N = (N·m)/N = m ✓. Størrelsesorden: 17 cm kontaktlengde er
            realistisk for et ordentlig spark.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Kort kontaktavstand kan levere stor fart-endring med en stor kraft — og vice versa.</p>,
  },

  // ==========================================================================
  // 6.24 — Geparden
  // ==========================================================================
  "6.24": {
    title: "Kinetisk energi av gepard",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        Voksne geparder, de raskeste av de store kattene, har masse ca 70{"\u00A0"}kg
        og er målt til opptil 32 m/s. (a) Hvor mange joule er den kinetiske
        energien til en slik gepard? (b) Med hvilken faktor vil KE endre seg
        om farten ble doblet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=70\;\text{kg},\;v=32\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>KE og skaleringsfaktor ved doblet fart.</p>,
    strategy: (
      <TheoryBox title="KE er kvadratisk i fart">
        <FormulaBox latex="KE=\tfrac12 mv^2" variant="gold" />
        <p>
          Hvis farten dobles blir KE{" "}
          <InlineLatex latex="2^2=4" /> ganger så stor. Hvis farten tredobles,
          blir KE ni ganger så stor. Dette er hvorfor fartsgrenser reduserer
          kollisjonsskader dramatisk.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Sett bare inn tallene.</p> }],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Kinetisk energi er energien som et objekt har i
          kraft av sin bevegelse. Grunnformelen kan utledes fra arbeid-energi-teoremet
          ved å integrere <InlineLatex latex="F=ma" /> langs banen, og resultatet er
          at kun masse og fart bestemmer KE — uansett retning eller sti.
        </p>
        <FormulaBox latex="K = \tfrac12 m v^2" variant="blue" />
        <p>
          <strong>Sentral innsikt:</strong> KE er <em>kvadratisk</em> i fart og
          <em> lineær</em> i masse. Dette gir en asymmetri som dukker opp i mange
          oppgaver: fartsendring er mye dyrere energisk enn masseendring. Enheten er
          joule (<InlineLatex latex="\text{J}=\text{kg}\cdot\text{m}^2/\text{s}^2" />).
        </p>

        <Step n={1} title="(a) Kinetisk energi">
          <p>
            Ren innsetting i <InlineLatex latex="K=\tfrac12 mv^2" />. Regn ut{" "}
            <InlineLatex latex="v^2" /> først for å unngå feil:{" "}
            <InlineLatex latex="32^2=1024" />.
          </p>
          <FormulaBox latex="K=\tfrac12(70)(32)^2=\tfrac12(70)(1024)=\boxed{3{,}58\times 10^4\;\text{J}}" variant="gold" />
          <p className="italic text-xs">
            Enhet: kg · (m/s)² = kg·m²/s² = J ✓. Størrelsesorden: ~36 kJ er
            sammenlignbart med et lite personbil-sammenstøt ved lav fart, eller
            energien i ~1 g sukker.
          </p>
        </Step>
        <Step n={2} title="(b) Effekten av å doble farten">
          <p>
            Algebraisk omforming er nøkkelen her. Sett{" "}
            <InlineLatex latex="v\to 2v" /> inn i formelen og sammenlign:
          </p>
          <FormulaBox latex="K'=\tfrac12 m(2v)^2=\tfrac12 m\cdot 4v^2=4\cdot\tfrac12 mv^2=4K" variant="blue" />
          <p>
            <strong>Faktor 4</strong>. Fortegn og tolkning: doblet fart = firedobbel
            energi = lengre bremselengde og mer destruktiv kollisjon. Dette er den
            fysiske begrunnelsen for fartsgrenser.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Dobler du farten, firedobles den kinetiske energien — en praktisk intuisjon.</p>,
  },

  // ==========================================================================
  // 6.25 — Typiske kinetiske energier
  // ==========================================================================
  "6.25": {
    title: "Sammenligning av kinetiske energier",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <div className="space-y-2">
        <p>Regn ut kinetisk energi av:</p>
        <ul className="list-disc pl-5">
          <li>(a) Elektron i hydrogenatomet: <InlineLatex latex="m=9{,}11\times 10^{-31}\;\text{kg},\;v=2{,}2\times 10^6\;\text{m/s}" /></li>
          <li>(b) Jogger: <InlineLatex latex="m=55\;\text{kg},\;v=7{,}5\;\text{km/t}" /></li>
          <li>(c) Tennisball: <InlineLatex latex="m=57\;\text{g},\;v=36\;\text{m/s}" /></li>
        </ul>
      </div>
    ),
    knowns: <p>Se oppgaveteksten.</p>,
    unknowns: <p>KE i hver deloppgave.</p>,
    strategy: (
      <p>
        Bruk <InlineLatex latex="KE=\tfrac12 mv^2" /> etter konvertering til
        SI-enheter (m/s og kg).
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>7,5 km/t = 2,083 m/s; 57 g = 0,057 kg.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Vi bruker samme originalformel{" "}
          <InlineLatex latex="K=\tfrac12 mv^2" /> tre ganger, men oppgaven handler
          egentlig om <em>enhetskonvertering</em> og <em>størrelsesordener</em>. En
          vanlig fallgruve er å sette inn tall uten å først konvertere til SI-enheter
          (kg og m/s). Joule er definert som <InlineLatex latex="1\;\text{J}=1\;\text{kg}\cdot\text{m}^2/\text{s}^2" />,
          så innsetting i andre enheter gir gale tall.
        </p>
        <FormulaBox latex="K=\tfrac12 m v^2\quad\text{(alltid i kg og m/s)}" variant="blue" />
        <p>
          <strong>Konverteringer:</strong>{" "}
          <InlineLatex latex="1\;\text{km/t}=\tfrac{1000}{3600}\;\text{m/s}=0{,}2778\;\text{m/s}" />,{" "}
          <InlineLatex latex="1\;\text{g}=10^{-3}\;\text{kg}" />. Alltid gjør det før
          innsetting.
        </p>

        <Step n={1} title="(a) Elektron i hydrogenatomet">
          <p>
            Masse og fart er allerede i SI. Kvadrer farten først:{" "}
            <InlineLatex latex="(2{,}2\times 10^6)^2=4{,}84\times 10^{12}" />. Vær
            nøye med eksponent-aritmetikk.
          </p>
          <FormulaBox latex="K=\tfrac12(9{,}11\times 10^{-31})(2{,}2\times 10^6)^2=\boxed{2{,}2\times 10^{-18}\;\text{J}}" variant="blue" />
          <p className="italic text-xs">
            Enhet: kg · (m/s)² = J ✓. Størrelsesorden: på kvantenivå er KE typisk{" "}
            <InlineLatex latex="\sim 10^{-18}" /> J eller ~10 eV. Dette er den
            naturlige energiskalaen for atomfysikk.
          </p>
        </Step>
        <Step n={2} title="(b) Jogger">
          <p>
            Konverter først: <InlineLatex latex="7{,}5\;\text{km/t}=7{,}5/3{,}6=2{,}083\;\text{m/s}" />.
            Hvis vi hadde satt inn 7,5 direkte, ville svaret blitt ca 1550 J — 13
            ganger for stort!
          </p>
          <FormulaBox latex="K=\tfrac12(55)(2{,}083)^2=\boxed{119\;\text{J}}" variant="blue" />
          <p className="italic text-xs">
            Størrelsesorden: ~100 J er typisk for en voksen som går/jogger rolig.
          </p>
        </Step>
        <Step n={3} title="(c) Tennisball">
          <p>
            Konverter: <InlineLatex latex="57\;\text{g}=0{,}057\;\text{kg}" />. Høy
            fart kompenserer delvis for liten masse.
          </p>
          <FormulaBox latex="K=\tfrac12(0{,}057)(36)^2=\boxed{36{,}9\;\text{J}}" variant="blue" />
          <p className="italic text-xs">
            Fysisk tolkning: tennisballen har ca 1/3 av joggerens KE, men er over
            1000 ganger lettere. Det er fartens kvadrat som kompenserer.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Få følelse for typiske KE-størrelser: atomer har ~10⁻¹⁸ J, menneskelige skalaer ~10²–10³ J.</p>,
  },

  // ==========================================================================
  // 6.26 — Meteorkrater
  // ==========================================================================
  "6.26": {
    title: "Energien fra Meteor Crater",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        For ca 50 000 år siden traff en meteor jorden ved dagens Flagstaff,
        Arizona. Anslag fra 2005: masse <InlineLatex latex="1{,}4\times 10^8\;\text{kg}" />, fart 12 km/s.
        (a) Hvor mye KE traff bakken? (b) Hvordan sammenligner det med en 1,0
        megatonn atombombe? (1 tonn TNT = <InlineLatex latex="4{,}184\times 10^9\;\text{J}" />)
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1{,}4\times 10^8\;\text{kg},\;v=1{,}2\times 10^4\;\text{m/s}" /></li>
        <li>1 megatonn TNT = <InlineLatex latex="10^6\times 4{,}184\times 10^9=4{,}184\times 10^{15}\;\text{J}" /></li>
      </ul>
    ),
    unknowns: <p>KE og ratio til 1 megatonn bombe.</p>,
    strategy: <p>Regn ut KE, deriver ratio.</p>,
    hints: [{ label: "Hint", content: <p>Hold styr på eksponenter.</p> }],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Selv om meteoren hadde både stor masse og høy fart
          er fremgangsmåten den samme som for en tennisball —{" "}
          <InlineLatex latex="K=\tfrac12 mv^2" />. Denne oppgaven er en øvelse i
          størrelsesordener: å bygge intuisjon for hvor stor energi bevegelige
          himmellegemer har. Vi sammenligner så med en menneskeskalert
          referanseenergi (1 megatonn TNT) for å ramme inn tallet.
        </p>
        <FormulaBox latex="K=\tfrac12 m v^2" variant="blue" />
        <p>
          <strong>Hvorfor joule og megatonn?</strong> Joule er SI-enheten, men
          gigantiske energier rapporteres ofte i ekvivalente tonn TNT for å gi
          menneskelig forståelig skala. Omregningsfaktoren{" "}
          <InlineLatex latex="1\;\text{t TNT}=4{,}184\times 10^9\;\text{J}" /> er en
          kjent konstant.
        </p>

        <Step n={1} title="(a) Kinetisk energi av meteoren">
          <p>
            Begge verdier er allerede i SI. Vær nøye med eksponenter:{" "}
            <InlineLatex latex="(1{,}2\times 10^4)^2=1{,}44\times 10^8" />, så{" "}
            <InlineLatex latex="\tfrac12\cdot 1{,}4\times 10^8\cdot 1{,}44\times 10^8=1{,}008\times 10^{16}" />.
          </p>
          <FormulaBox latex="K=\tfrac12(1{,}4\times 10^8)(1{,}2\times 10^4)^2=\boxed{1{,}01\times 10^{16}\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Sammenligning med 1 MT-bombe">
          <p>
            Først konverter 1 megatonn TNT til joule:{" "}
            <InlineLatex latex="1\;\text{MT}=10^6\cdot 4{,}184\times 10^9=4{,}184\times 10^{15}\;\text{J}" />.
            Deretter regner vi forholdet — ren divisjon.
          </p>
          <FormulaBox latex="\frac{K}{E_\text{1MT}}=\frac{1{,}01\times 10^{16}}{4{,}184\times 10^{15}}\approx\boxed{2{,}4}" variant="blue" />
          <p>Altså ca 2,4 megatonn — mer enn dobbelt så mye som en 1 MT-bombe.</p>
          <p className="italic text-xs">
            Fysisk tolkning: Meteor Crater er 1,2 km bred og 170 m dyp — konsistent
            med et nedslag på flere megatonn. Til sammenligning er Hiroshima-bomben
            ~0,015 MT, altså meteoren var ~160× kraftigere.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Store masser × høy fart gir enorm KE — meteornedslag er atomvåpenlignende i energi.</p>,
  },

  // ==========================================================================
  // 6.28 — Vannmelon fra tak
  // ==========================================================================
  "6.28": {
    title: "Vannmelon i fritt fall",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        En 4,80 kg vannmelon slippes fra toppen av en 25,0 m høy bygning og
        er i tilnærmet fritt fall. (a) Arbeid av gravitasjonen? (b) Like før
        den treffer: (i) KE, (ii) fart? (c) Hvilke deler ville endret seg med
        luftmotstand?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=4{,}80\;\text{kg},\;h=25{,}0\;\text{m}" /></li>
        <li><InlineLatex latex="v_0=0" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="W_g,\;KE_f,\;v_f" /></p>,
    strategy: (
      <p>
        Bare gravitasjonen arbeider (uten luftmotstand). Bruk arbeid-energi:{" "}
        <InlineLatex latex="W_g=\Delta KE" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="W_g=mgh" /> (positivt siden kraft og forskyvning er ned).</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er en grunnmur-oppgave som kombinerer tre
          ideer: arbeid av en konstant kraft (tyngdekraften), arbeid-energi-teoremet,
          og konsekvensen for fart. Tyngdekraften er en konstant vektor nedover, så{" "}
          <InlineLatex latex="W_g=\vec F_g\cdot\vec s" /> reduseres til{" "}
          <InlineLatex latex="W_g=mg\Delta y" /> når forskyvningen er nedover (samme
          retning som kraften gir positivt arbeid).
        </p>
        <FormulaBox latex="W_g = \vec F_g\cdot\vec s = mg\,h\quad(\text{fall nedover}),\qquad W_\text{tot}=\Delta K" variant="blue" />
        <p>
          <strong>Hvorfor arbeid-energi og ikke kinematikk?</strong> Vi kunne brukt{" "}
          <InlineLatex latex="v_f^2=v_0^2+2gh" />, men arbeid-energi er mer generelt:
          det fungerer også hvis banen ikke er rett ned (f.eks. en sklie).
          Gravitasjonen er <em>konservativ</em>, så bare høydeforskjellen teller.
        </p>

        <Step n={1} title="(a) Arbeid av tyngdekraften">
          <p>
            Kraft og forskyvning peker begge nedover: vinkel 0°, cos 0° = 1, altså{" "}
            <InlineLatex latex="W_g=+mgh" /> (positivt). Ren innsetting:
          </p>
          <FormulaBox latex="W_g=mgh=(4{,}80)(9{,}80)(25{,}0)=\boxed{1180\;\text{J}}" variant="gold" />
          <p className="italic text-xs">
            Enhet: kg · m/s² · m = kg·m²/s² = J ✓. Størrelsesorden: ~1 kJ er energien
            i en god sjokoladebit.
          </p>
        </Step>
        <Step n={2} title="(b) KE og fart ved bakken">
          <p>
            Siden tyngdekraften er eneste kraft som gjør arbeid i fritt fall, er{" "}
            <InlineLatex latex="W_\text{tot}=W_g" />. Vannmelonen starter fra ro, så{" "}
            <InlineLatex latex="\Delta K=K_f-0=K_f" />. Dermed blir hele arbeidet
            omgjort til KE.
          </p>
          <FormulaBox latex="K_f=W_g=1180\;\text{J}" variant="blue" />
          <p>
            For farten omformer vi <InlineLatex latex="K_f=\tfrac12 mv_f^2" /> til{" "}
            <InlineLatex latex="v_f=\sqrt{2K_f/m}" />. Eller enklere: sett{" "}
            <InlineLatex latex="\tfrac12 mv_f^2=mgh" /> og løs — massen faller ut, og
            vi får <InlineLatex latex="v_f=\sqrt{2gh}" />.
          </p>
          <FormulaBox latex="v_f=\sqrt{2gh}=\sqrt{2(9{,}80)(25)}=\boxed{22{,}1\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">
            Enhet: <InlineLatex latex="\sqrt{\text{m/s}^2\cdot\text{m}}=\text{m/s}" /> ✓.
            22 m/s ≈ 80 km/t — ikke noe en vannmelon tåler.
          </p>
        </Step>
        <Step n={3} title="(c) Hvordan endrer luftmotstand svarene?">
          <p>
            Med luftmotstand er det to krefter som gjør arbeid: tyngdekraften{" "}
            (fortsatt positivt, <InlineLatex latex="+mgh" />) og luftmotstanden (alltid
            motsatt bevegelsen, altså <em>negativt</em> arbeid).
          </p>
          <ul className="list-disc pl-5">
            <li>(a) er <em>uendret</em> — <InlineLatex latex="W_g" /> avhenger bare av høydeforskjellen.</li>
            <li>(b) KE blir <em>mindre</em> fordi <InlineLatex latex="W_\text{tot}=W_g+W_\text{luft}<W_g" />, og dermed blir farten også mindre.</li>
          </ul>
          <p className="italic text-xs">
            Dette er et viktig skille: arbeid av enkeltkrefter er uavhengig, men{" "}
            <em>nettoarbeidet</em> er summen og det er det som bestemmer ΔK.
          </p>
        </Step>
      </div>
    ),
    summary: <p>I fritt fall: hele <InlineLatex latex="mgh" /> blir til KE. Luftmotstand "stjeler" energi og reduserer farten.</p>,
  },

  // ==========================================================================
  // 6.31 — Stoppedistanse (utledning)
  // ==========================================================================
  "6.31": {
    title: "Utledning av bremselengde",
    difficulty: "middels",
    pageRef: "s. 201",
    problem: (
      <p>
        En bil kjører på flat vei med fart <InlineLatex latex="v_0" /> når
        bremsene låser seg. Dekkene glir. (a) Bruk arbeid-energi til å finne
        bremselengden i form av <InlineLatex latex="v_0,g,\mu_k" />. (b) Faktoren
        bremselengden endrer seg med hvis: (i) <InlineLatex latex="\mu_k" />{" "}
        dobles, (ii) <InlineLatex latex="v_0" /> dobles, (iii) begge dobles.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Fart ved låsing: <InlineLatex latex="v_0" /></li>
        <li>Kinetisk friksjonskoeffisient: <InlineLatex latex="\mu_k" /></li>
      </ul>
    ),
    unknowns: <p>Minimum bremselengde <InlineLatex latex="d" /> og skaleringsfaktorer.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Eneste kraft som gjør arbeid er kinetisk friksjon. Bilen starter med
          KE og stopper (KE = 0), så <InlineLatex latex="W_f=-\Delta KE" />.
        </p>
        <TheoryBox title="Utledning">
          <p>
            Normalkraft på flat vei: <InlineLatex latex="n=mg" />. Kinetisk
            friksjon: <InlineLatex latex="f=\mu_k mg" />. Friksjonen motvirker
            bevegelsen, så:
          </p>
          <FormulaBox latex="W_f=-f\,d=-\mu_k m g\,d" variant="blue" />
          <p>Arbeid-energi: <InlineLatex latex="W_f=0-\tfrac12 m v_0^2" />, altså:</p>
          <FormulaBox latex="-\mu_k m g\,d = -\tfrac12 m v_0^2 \;\Rightarrow\; d=\frac{v_0^2}{2\mu_k g}" variant="gold" />
          <p className="mt-1 italic">
            Legg merke til: massen <em>faller ut</em>! En buss og en bil har
            samme bremselengde (med samme <InlineLatex latex="\mu_k" />). Farten
            går i <em>kvadratet</em> — dette er grunnen til at høy fart er så
            farlig.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk kun friksjonsarbeid; normalkraft og tyngdekraft står vinkelrett på bevegelsen.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Her utleder vi en symbolsk formel, ikke et tall. To
          originalformler samspiller: arbeid-energi-teoremet og arbeid av konstant
          kraft (friksjon). Friksjonen er eneste kraft som gjør arbeid (normalkraft
          og tyngdekraft er vinkelrette på bevegelsen). Bilen stopper, så sluttfarten
          er 0.
        </p>
        <FormulaBox latex="W_\text{tot}=\Delta K,\qquad f_k=\mu_k n,\qquad n=mg" variant="blue" />
        <p>
          <strong>Hvorfor arbeid-energi?</strong> Vi kunne brukt Newton's 2. lov med{" "}
          <InlineLatex latex="a=-\mu_k g" /> og{" "}
          <InlineLatex latex="v_f^2=v_0^2+2ad" />, men arbeid-energi gjør det samme
          på færre linjer og ringer inn det viktige: <em>bilens KE må dissiperes av
          friksjonens arbeid</em>.
        </p>

        <Step n={1} title="Arbeid av friksjon">
          <p>
            Friksjon virker i motsatt retning av bevegelsen —{" "}
            <InlineLatex latex="\phi=180^\circ" />, <InlineLatex latex="\cos\phi=-1" />.
            På flat vei er <InlineLatex latex="n=mg" /> (fra likevekt vertikalt).
            Kombinert:
          </p>
          <FormulaBox latex="W_f=f_k\,d\cos 180^\circ=-\mu_k m g\,d" variant="blue" />
        </Step>
        <Step n={2} title="Arbeid-energi og algebraisk omforming">
          <p>
            Bilen starter med KE <InlineLatex latex="\tfrac12 mv_0^2" /> og ender med
            0. Sett arbeidet lik ΔK og løs for d:
          </p>
          <FormulaBox latex="W_f=\Delta K \;\Rightarrow\; -\mu_k m g\,d=0-\tfrac12 m v_0^2" variant="blue" />
          <FormulaBox latex="\mu_k m g\,d=\tfrac12 m v_0^2\;\Rightarrow\; d=\frac{v_0^2}{2\mu_k g}" variant="blue" />
          <p>
            <strong>Massen forsvant!</strong> En loaded 18-wheeler og en smart-bil har
            samme bremselengde ved samme hastighet og samme{" "}
            <InlineLatex latex="\mu_k" />. Et kontraintuitivt, men kraftfullt
            resultat.
          </p>
          <FormulaBox latex="\boxed{d=\frac{v_0^2}{2\mu_k g}}" variant="gold" />
          <p className="italic text-xs">
            Enhetssjekk:{" "}
            <InlineLatex latex="\frac{(\text{m/s})^2}{\text{m/s}^2}=\text{m}" /> ✓.
          </p>
        </Step>
        <Step n={3} title="(b) Skaleringsanalyse">
          <p>
            Vi ser direkte på formelen <InlineLatex latex="d\propto v_0^2/\mu_k" />:
          </p>
          <ul className="list-disc pl-5">
            <li>(i) <InlineLatex latex="\mu_k\to 2\mu_k" />: <InlineLatex latex="d\to d/2" /> (halvparten). Lineær i nevner.</li>
            <li>(ii) <InlineLatex latex="v_0\to 2v_0" />: <InlineLatex latex="d\to (2)^2 d=4d" /> (firedobles). Kvadratisk i teller.</li>
            <li>(iii) Begge dobles: <InlineLatex latex="d\to \tfrac{4}{2}d=2d" /> (dobles).</li>
          </ul>
          <p className="italic text-xs">
            Fysisk tolkning: dette er hvorfor våt vei (redusert{" "}
            <InlineLatex latex="\mu_k" />) kombinert med høy fart er dobbelt farlig —
            bremselengden eksploderer.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Bremselengde <em>skalerer kvadratisk med fart</em> og lineært (invers)
        med friksjon. Ett av fysikkens viktigste trafikkprinsipper.
      </p>
    ),
  },

  // ==========================================================================
  // 6.32 — Leg press (fjær)
  // ==========================================================================
  "6.32": {
    title: "Arbeid på fjær — leg press",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <p>
        På treningen presser du mot en plattform som komprimerer to parallelle
        fjærer. Du utfører 80,0 J når du komprimerer fjærene 0,200 m fra
        ukomprimert lengde. (a) Hvor stor kraft må du holde i denne posisjonen?
        (b) Hvor mye mer arbeid må du gjøre for å komprimere 0,200 m til, og
        hvilken maksimal kraft må du utøve?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="W_1=80{,}0\;\text{J}" /> for <InlineLatex latex="x_1=0{,}200\;\text{m}" /></li>
        <li>Totale fjærer virker med effektiv konstant <InlineLatex latex="k" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F" /> i <InlineLatex latex="x=0{,}200\;\text{m}" /></li>
        <li>Ekstraarbeid til <InlineLatex latex="x=0{,}400\;\text{m}" />, og maksimal kraft</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid på ideell fjær (Hookes lov)">
          <p>Kraften fra fjæren er <InlineLatex latex="F=kx" /> (restkraft). For å komprimere brukeren må levere arbeid:</p>
          <FormulaBox latex="W=\int_0^x F\,dx=\int_0^x k x'\,dx'=\tfrac12 k x^2" variant="gold" />
          <p className="mt-1">
            Arbeidet er <em>kvadratisk</em> i forskyvning — dobler du
            kompresjonen, firedobler du den lagrede energien, men
            <em> trenger dobbelt så mye kraft ved endepunktet</em>.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Finn <InlineLatex latex="k" /> fra <InlineLatex latex="W_1=\tfrac12 k x_1^2" />.</p> },
      { label: "Hint 2", content: <p>Ekstraarbeid: <InlineLatex latex="\tfrac12 k(x_2^2-x_1^2)" /> med <InlineLatex latex="x_2=0{,}400" />.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> En ideell fjær følger Hookes lov —{" "}
          <InlineLatex latex="F=kx" />, der x er fravik fra naturlig lengde.
          Fjærkraften er <em>ikke konstant</em>, så vi kan <em>ikke</em> bruke{" "}
          <InlineLatex latex="W=Fd" />. Vi må integrere:{" "}
          <InlineLatex latex="W=\int_0^x F(x')\,dx'=\int_0^x kx'\,dx'=\tfrac12 kx^2" />.
          Geometrisk: arbeidet er arealet av en trekant under F-x-linjen.
        </p>
        <FormulaBox latex="F_\text{fjær}=kx,\qquad W_\text{bruker}=\tfrac12 k x^2" variant="blue" />
        <p>
          <strong>Hvorfor ikke F·d?</strong> Fordi kraften varierer lineært fra 0 til
          kx mens du komprimerer fra 0 til x. Gjennomsnittlig kraft er{" "}
          <InlineLatex latex="\tfrac12 kx" />, og arbeid = (gjsn. kraft) · (avstand) =
          <InlineLatex latex="\tfrac12 kx\cdot x=\tfrac12 kx^2" />. Det er samme
          resultat, bare utledet uten integrasjon.
        </p>

        <Step n={1} title="Finn fjærkonstanten">
          <p>
            Vi vet at <InlineLatex latex="W_1=80\;\text{J}" /> ved{" "}
            <InlineLatex latex="x_1=0{,}200\;\text{m}" />. Omform{" "}
            <InlineLatex latex="W=\tfrac12 kx^2" /> til{" "}
            <InlineLatex latex="k=2W/x^2" />.
          </p>
          <FormulaBox latex="k=\frac{2W_1}{x_1^2}=\frac{2(80)}{(0{,}200)^2}=\frac{160}{0{,}04}=4000\;\text{N/m}" variant="blue" />
          <p className="italic text-xs">
            Enhet: J/m² = N·m/m² = N/m ✓.
          </p>
        </Step>
        <Step n={2} title="(a) Kraft ved x = 0,200 m">
          <p>
            Nå bruker vi Hookes lov direkte — kraften fjæren utøver i akkurat dette
            punktet. Dette er <em>øyeblikkelig</em> kraft, ikke gjennomsnitt.
          </p>
          <FormulaBox latex="F_1=kx_1=(4000)(0{,}200)=\boxed{800\;\text{N}}" variant="gold" />
          <p className="italic text-xs">
            Sjekk: arbeid pr. lengde bør være halve maks-kraften:{" "}
            <InlineLatex latex="W/x=80/0{,}2=400\;\text{N}=F/2" /> ✓.
          </p>
        </Step>
        <Step n={3} title="(b) Ekstraarbeid fra x=0,200 til x=0,400 m">
          <p>
            Ekstraarbeidet er arbeidet fra <InlineLatex latex="x_1" /> til{" "}
            <InlineLatex latex="x_2=0{,}400\;\text{m}" />. Bruk enten{" "}
            <InlineLatex latex="W=\tfrac12 k x_2^2-\tfrac12 k x_1^2" />, eller
            integrer fra <InlineLatex latex="x_1" /> til <InlineLatex latex="x_2" />:{" "}
            resultatet er det samme.
          </p>
          <FormulaBox latex="W_\text{ekstra}=\tfrac12 k(x_2^2-x_1^2)=\tfrac12(4000)(0{,}16-0{,}04)=\boxed{240\;\text{J}}" variant="gold" />
          <p className="italic text-xs">
            <strong>Pedagogisk viktig:</strong> De første 20 cm tok 80 J, de neste
            20 cm tok 240 J — <em>tre ganger mer</em>. Det er den kvadratiske
            avhengigheten: samme lengdeintervall, men ved høyere gjennomsnittlig
            kraft.
          </p>
        </Step>
        <Step n={4} title="Maksimal kraft">
          <FormulaBox latex="F_\text{max}=kx_2=(4000)(0{,}400)=\boxed{1600\;\text{N}}" variant="gold" />
          <p className="italic text-xs">
            Fortegn/tolkning: nøyaktig dobbelt av <InlineLatex latex="F_1" /> fordi
            vi har doblet kompresjonen — kraft er <em>lineær</em> i x mens arbeid er
            kvadratisk.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Fjærarbeid er kvadratisk: de siste 20 cm krever <em>tre ganger</em>{" "}
        mer arbeid enn de første 20 cm. Bruk <InlineLatex latex="W=\tfrac12 kx^2" /> og Hookes
        lov direkte.
      </p>
    ),
  },

  // ==========================================================================
  // 6.33 — Tre masser på fjærer
  // ==========================================================================
  "6.33": {
    title: "Tre masser hengt fra fjærer",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <p>
        Tre identiske 8,50 kg masser henger i tre identiske fjærer stablet
        vertikalt over hverandre. Hver fjær har <InlineLatex latex="k=7{,}80\;\text{kN/m}" />{" "}
        og naturlig lengde 12,0 cm. Hvor lange blir fjærene nå?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=8{,}50\;\text{kg}" />, tre stk</li>
        <li><InlineLatex latex="k=7800\;\text{N/m}" />, naturlig lengde 0,120 m</li>
      </ul>
    ),
    unknowns: <p>Lengden til hver fjær i likevekt.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Isoler hver fjær: strekket i en fjær er lik vekten av alt som henger
          under den. Så lengden er <InlineLatex latex="L_0+kx/k=L_0+F/k" /> der{" "}
          <InlineLatex latex="F" /> er last.
        </p>
        <TheoryBox title="Hookes lov for fjærstrekk">
          <FormulaBox latex="F=k\Delta L\;\Rightarrow\;\Delta L=F/k" variant="blue" />
          <p>
            Kritisk innsikt: <em>hver fjær bærer forskjellig last</em>. Den
            nederste bærer bare én masse; den øverste bærer tre.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Sjekk: øverste fjær bærer tre masser, nederste bærer én.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Oppgaven kombinerer Newton's 1. lov (likevekt) med
          Hookes lov. Det kritiske grepet er å bruke <em>friksjonslegeme-analyse</em>{" "}
          på hver fjær: snitt systemet og spør "hva henger under denne fjæren?". Den
          nederste fjæren bærer bare én masse, den midterste to, og den øverste
          tre. Dette stemmer med Newton's 3. lov: fjær og last trekker hverandre
          med like store, motsatte krefter.
        </p>
        <FormulaBox latex="F_\text{fjær}=k\,\Delta L \quad(\text{Hookes lov}),\qquad \sum\vec F=0 \quad(\text{likevekt})" variant="blue" />
        <p>
          <strong>Hvorfor fungerer denne tankegangen?</strong> I likevekt må strekket
          i hver fjær balansere vekten av alt som henger <em>under</em> den. Det gir
          oss direkte kraften, og dermed strekket{" "}
          <InlineLatex latex="\Delta L=F/k" />.
        </p>

        <Step n={1} title="Last på hver fjær (nedenfra og opp)">
          <p>
            Nummerer fjærene slik at 1 er øverst, 3 er nederst:
          </p>
          <ul className="list-disc pl-5">
            <li>Fjær 3 (nederst) bærer én masse: <InlineLatex latex="F_3=mg=(8{,}50)(9{,}80)=83{,}3\;\text{N}" />.</li>
            <li>Fjær 2 (midten) bærer to masser: <InlineLatex latex="F_2=2mg=166{,}6\;\text{N}" />.</li>
            <li>Fjær 1 (øverst) bærer tre masser: <InlineLatex latex="F_1=3mg=249{,}9\;\text{N}" />.</li>
          </ul>
          <p className="italic text-xs">
            Dette tilsvarer hvordan en mast holdes oppe av en kabel: jo lenger nede du
            ser, jo mindre bærer elementet.
          </p>
        </Step>
        <Step n={2} title="Hookes lov: fra kraft til strekk">
          <p>
            Omform <InlineLatex latex="F=k\Delta L" /> til{" "}
            <InlineLatex latex="\Delta L=F/k" />. Lengden blir naturlig lengde pluss
            strekket: <InlineLatex latex="L_i=L_0+\Delta L_i" />.
          </p>
          <FormulaBox latex="\Delta L_i=\frac{F_i}{k},\quad L_i=0{,}120+\Delta L_i" variant="blue" />
          <ul className="list-disc pl-5">
            <li>Nederste: <InlineLatex latex="0{,}120+83{,}3/7800=\boxed{0{,}131\;\text{m}}" /></li>
            <li>Midterste: <InlineLatex latex="0{,}120+166{,}6/7800=\boxed{0{,}141\;\text{m}}" /></li>
            <li>Øverste: <InlineLatex latex="0{,}120+249{,}9/7800=\boxed{0{,}152\;\text{m}}" /></li>
          </ul>
          <p className="italic text-xs">
            Enhetssjekk: N/(N/m) = m ✓. Strekkene er 1,07 cm, 2,14 cm og 3,20 cm —
            en aritmetisk progresjon, som forventet siden lasten vokser lineært.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Øverste fjær strekkes mest siden den bærer hele stabelen.
        Problemløsningsteknikken: isoler én bit om gangen nedenfra, eller
        start som system — likeverdige svar.
      </p>
    ),
  },

  // ==========================================================================
  // 6.34 — Variabel kraft, graf
  // ==========================================================================
  "6.34": {
    title: "Arbeid fra variabel kraft (graf)",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <div className="space-y-2">
        <p>
          Et barn trekker en 10,0 kg slede på is med en kraft parallell med
          x-aksen. Grafen viser <InlineLatex latex="F_x(x)" />: 10 N fra 0 til
          8 m, lineær nedgang til 0 ved 12 m. Finn arbeidet når sleden beveger
          seg (a) 0–8 m, (b) 8–12 m, (c) 0–12 m.
        </p>
        <svg viewBox="0 0 320 160" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="30" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="130" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <text x="310" y="135" fontSize="10">x (m)</text>
          <text x="10" y="25" fontSize="10">F (N)</text>
          {/* F = 10 from 0..8 */}
          <line x1="30" y1="50" x2="190" y2="50" stroke="#3b82f6" strokeWidth="2.5" />
          {/* linear down to 0 at x=12 */}
          <line x1="190" y1="50" x2="270" y2="130" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="100" y="45" fontSize="10" fill="#3b82f6">F=10 N</text>
          <text x="30" y="145" fontSize="9">0</text>
          <text x="190" y="145" fontSize="9">8</text>
          <text x="270" y="145" fontSize="9">12</text>
          <text x="25" y="54" fontSize="9">10</text>
        </svg>
      </div>
    ),
    knowns: <p>Grafen over.</p>,
    unknowns: <p>Arbeidet i hvert intervall og totalt.</p>,
    strategy: (
      <TheoryBox title="Arbeid = arealet under F-x-kurven">
        <FormulaBox latex="W=\int_{x_1}^{x_2}F_x(x)\,dx" variant="gold" />
        <p>
          Geometrisk tolkning: areal under F-x-grafen. Rektangler, trekanter
          og trapeser gir raske løsninger uten integrasjon.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>0–8 m: rektangel. 8–12 m: trekant med høyde 10 og bredde 4.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Den generelle definisjonen av arbeid for en kraft
          som varierer med posisjonen er integralet{" "}
          <InlineLatex latex="W=\int_{x_1}^{x_2}F_x(x)\,dx" />. Geometrisk tolkning:
          arbeidet er arealet under <InlineLatex latex="F_x" />-x-grafen mellom
          grensene. Hvis kraften er konstant, reduseres dette til rektangel-areal{" "}
          <InlineLatex latex="F\cdot\Delta x" /> — det klassiske tilfellet.
        </p>
        <FormulaBox latex="W = \int_{x_1}^{x_2}F_x(x)\,dx \;=\;\text{areal under }F_x(x)" variant="blue" />
        <p>
          <strong>Hvorfor integral og ikke F·d?</strong> Fordi <InlineLatex latex="F_x" />{" "}
          endrer seg med x. Kraft fra 0 til 8 m er konstant (rektangel), men fra 8
          til 12 m avtar lineært til null (trekant). Vi slipper eksplisitt integrasjon
          ved å bruke geometri — rektangel- og trekantareal er standardformler.
        </p>

        <Step n={1} title="(a) 0 til 8 m — rektangel">
          <p>
            F konstant 10 N over 8 m → rektangel med bredde 8 og høyde 10:
          </p>
          <FormulaBox latex="W_a=\int_0^8 10\,dx=10\cdot 8=(10)(8)=\boxed{80\;\text{J}}" variant="blue" />
          <p className="italic text-xs">
            Enhet: N·m = J ✓. Positivt arbeid → KE øker → sleden akselererer.
          </p>
        </Step>
        <Step n={2} title="(b) 8 til 12 m — trekant">
          <p>
            F avtar lineært fra 10 N til 0 over 4 m. Dette er en rettvinklet trekant
            med kateter 4 og 10. Areal = halvparten av basis gange høyde:
          </p>
          <FormulaBox latex="W_b=\tfrac12\cdot\text{basis}\cdot\text{høyde}=\tfrac12(4)(10)=\boxed{20\;\text{J}}" variant="blue" />
          <p className="italic text-xs">
            Alternativt: gjennomsnittskraften er (10+0)/2 = 5 N, × 4 m = 20 J. Samme
            svar.
          </p>
        </Step>
        <Step n={3} title="(c) Totalt arbeid 0 til 12 m">
          <p>
            Integralet er additivt over sammenhengende intervaller:{" "}
            <InlineLatex latex="\int_0^{12}=\int_0^8+\int_8^{12}" />. Bare summer.
          </p>
          <FormulaBox latex="W_c=W_a+W_b=80+20=\boxed{100\;\text{J}}" variant="gold" />
          <p className="italic text-xs">
            Tolkning: sleden har fått 100 J kinetisk energi over 12 m. Hvis vi kjenner
            massen (10 kg) kan vi finne sluttfarten:{" "}
            <InlineLatex latex="v=\sqrt{2(100)/10}=4{,}47\;\text{m/s}" />.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        For variable krefter: arbeid = areal under F-x-grafen. Ofte kan
        du slippe unna integrasjon med enkel geometri.
      </p>
    ),
  },

  // ==========================================================================
  // 6.37 — Boks inn i fjær
  // ==========================================================================
  "6.37": {
    title: "Boks presses mot fjær — maks kompresjon",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <p>
        En 6,0 kg boks med fart 3,0 m/s på en glatt horisontal flate støter
        inn i en lett fjær med <InlineLatex latex="k=75\;\text{N/cm}=7500\;\text{N/m}" />.
        Bruk arbeid-energi til å finne maksimal kompresjon.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=6{,}0\;\text{kg},\;v=3{,}0\;\text{m/s}" /></li>
        <li><InlineLatex latex="k=7500\;\text{N/m}" />, glatt flate</li>
      </ul>
    ),
    unknowns: <p>Maksimal kompresjon <InlineLatex latex="x_\text{max}" />.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Ved maksimal kompresjon er boksen i ro et øyeblikk. All KE er
          "omgjort" til fjærarbeid.
        </p>
        <TheoryBox title="Energibevaring i fjær">
          <p>Arbeid-energi med bare fjær som gjør arbeid:</p>
          <FormulaBox latex="\tfrac12 mv^2=\tfrac12 k x_\text{max}^2\;\Rightarrow\;x_\text{max}=v\sqrt{\frac{m}{k}}" variant="gold" />
          <p className="mt-1">
            Denne formelen ser vi igjen i harmoniske svingninger — det er samme
            fysikk.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [{ label: "Hint", content: <p>Sett <InlineLatex latex="KE_i=\tfrac12 k x^2" />.</p> }],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er klassisk energioverføring KE → fjær.
          Boksen starter med ren kinetisk energi <InlineLatex latex="\tfrac12 mv^2" />{" "}
          og stopper et øyeblikk ved maks kompresjon — altså KE = 0 på det
          tidspunktet. I mellomtiden har fjæren gjort negativt arbeid på boksen{" "}
          <InlineLatex latex="W_\text{fjær}=-\tfrac12 k x_\text{max}^2" /> (negativt
          fordi fjærkraft og bevegelse peker motsatt under kompresjonen).
        </p>
        <FormulaBox latex="W_\text{tot}=\Delta K,\qquad W_\text{fjær}=-\tfrac12 k x^2" variant="blue" />
        <p>
          <strong>Hvorfor fungerer dette?</strong> Glatt flate → ingen friksjon →
          fjæren er eneste kraft som gjør arbeid (normalkraft og tyngdekraft står
          vinkelrett på bevegelsen). Arbeid-energi gir da:{" "}
          <InlineLatex latex="-\tfrac12 kx^2=0-\tfrac12 mv^2" />, som er ekvivalent
          med energibevaring mellom KE og fjær-PE.
        </p>

        <Step n={1} title="Sett opp energibalansen">
          <p>
            Ved maks kompresjon er boksen i ro:{" "}
            <InlineLatex latex="\Delta K=0-\tfrac12 mv^2=-\tfrac12 mv^2" />. Sett{" "}
            <InlineLatex latex="W_\text{fjær}=\Delta K" />:
          </p>
          <FormulaBox latex="-\tfrac12 kx^2=-\tfrac12 mv^2 \;\Rightarrow\; \tfrac12 mv^2=\tfrac12 kx^2" variant="blue" />
          <p>
            Minustegnene kansellerer. Fysisk tolkning: all KE konverteres til elastisk
            energi lagret i fjæren.
          </p>
          <FormulaBox latex="\tfrac12(6{,}0)(3{,}0)^2=\tfrac12(7500)x^2\;\Rightarrow\; 27=3750\,x^2" variant="blue" />
        </Step>
        <Step n={2} title="Algebraisk omforming og tall">
          <p>
            Løs for <InlineLatex latex="x" />:{" "}
            <InlineLatex latex="x=\sqrt{mv^2/k}=v\sqrt{m/k}" />. Denne formelen dukker
            opp igjen i harmonisk svingning (vinkelfrekvens{" "}
            <InlineLatex latex="\omega=\sqrt{k/m}" />).
          </p>
          <FormulaBox latex="x=\sqrt{27/3750}=\sqrt{0{,}0072}=\boxed{0{,}0849\;\text{m}=8{,}49\;\text{cm}}" variant="gold" />
          <p className="italic text-xs">
            Enhetssjekk: <InlineLatex latex="\sqrt{\text{kg}\cdot(\text{m/s})^2/(\text{N/m})}=\sqrt{\text{J/(N/m)}}=\sqrt{\text{m}^2}=\text{m}" /> ✓.
            Størrelsesorden: 8,5 cm kompresjon er rimelig for en middels stiv fjær.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Energibevaring på ideell fjær: KE ↔ fjærarbeid. Glatt flate lar hele KE gå til fjæren.</p>,
  },

  // ==========================================================================
  // 6.44 — Bil med variabel F
  // ==========================================================================
  "6.44": {
    title: "Fart av modellbil med F(x)",
    difficulty: "middels",
    pageRef: "s. 203",
    problem: (
      <p>
        En 2,0 kg modellbil starter i ro ved <InlineLatex latex="x=0" />.
        Nettokraften er gitt ved <InlineLatex latex="F(x)=k_1 x" /> med{" "}
        <InlineLatex latex="k_1=0{,}5\;\text{N/m}" /> for <InlineLatex latex="0\le x\le 4" />{" "}
        m, og deretter konstant <InlineLatex latex="F=2{,}0\;\text{N}" /> fra{" "}
        <InlineLatex latex="x=4" /> til <InlineLatex latex="x=7\;\text{m}" />.
        Finn farten ved (a) <InlineLatex latex="x=3\;\text{m}" />, (b){" "}
        <InlineLatex latex="x=4\;\text{m}" />, (c) <InlineLatex latex="x=7\;\text{m}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}0\;\text{kg},\;v_0=0" /></li>
        <li>Nettokraft F(x) variabel</li>
      </ul>
    ),
    unknowns: <p>Fart på tre punkter.</p>,
    strategy: (
      <p>
        Arbeid-energi: <InlineLatex latex="\tfrac12 mv^2=\int_0^x F\,dx'" /> fra{" "}
        0. Bruk passende integraler eller arealberegning.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>For <InlineLatex latex="0..x\;(x<4)" />: areal av trekant <InlineLatex latex="\tfrac12 k_1 x^2" />. Så konstant.</p> },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Kraften endrer seg med posisjon —{" "}
          <InlineLatex latex="F(x)=k_1 x" /> for <InlineLatex latex="x\le 4" /> og
          konstant etterpå. Siden F ikke er konstant, må vi integrere for den første
          delen. Arbeid-energi gir farten direkte fra totalarbeidet:{" "}
          <InlineLatex latex="W_\text{tot}=\tfrac12 mv^2-0" />, slik at{" "}
          <InlineLatex latex="v=\sqrt{2W/m}" />.
        </p>
        <FormulaBox latex="W=\int_{0}^{x}F(x')\,dx',\qquad \tfrac12 mv^2=W" variant="blue" />
        <p>
          <strong>Hvorfor arbeid-energi og ikke Newton?</strong> Vi kunne løst{" "}
          <InlineLatex latex="ma=k_1 x" /> som en differensialligning, men det ville
          vært lineær harmonisk fysikk — overkill. Arealmetoden er raskere og
          visuelt intuitiv.
        </p>

        <Step n={1} title="(a) ved x = 3 m (i den lineære sonen)">
          <p>
            Kraften er <InlineLatex latex="F(x)=0{,}5\,x" /> i denne sonen. Integralet
            fra 0 til 3 er trekant-arealet med basis 3 og høyde{" "}
            <InlineLatex latex="0{,}5\cdot 3=1{,}5" />:
          </p>
          <FormulaBox latex="W=\int_0^3 k_1 x'\,dx'=\tfrac12 k_1 x^2=\tfrac12(0{,}5)(3)^2=2{,}25\;\text{J}" variant="blue" />
          <FormulaBox latex="v=\sqrt{2W/m}=\sqrt{2(2{,}25)/2}=\sqrt{2{,}25}=\boxed{1{,}50\;\text{m/s}}" variant="blue" />
          <p className="italic text-xs">
            Samme struktur som fjærarbeid — fordi{" "}
            <InlineLatex latex="F\propto x" /> gir trekant-areal.
          </p>
        </Step>
        <Step n={2} title="(b) ved x = 4 m (slutten av lineær sone)">
          <FormulaBox latex="W=\tfrac12(0{,}5)(4)^2=4{,}0\;\text{J}\;\Rightarrow\; v=\sqrt{2(4{,}0)/2}=\sqrt{4{,}0}=\boxed{2{,}00\;\text{m/s}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) ved x = 7 m (ut av konstant-sone)">
          <p>
            Del integralet i to: fra 0 til 4 m (lineær, = 4 J) og fra 4 til 7 m
            (konstant F = 2 N over 3 m, rektangel = 6 J). Summer:
          </p>
          <FormulaBox latex="W=4{,}0+(2{,}0)(3)=10{,}0\;\text{J}\;\Rightarrow\; v=\sqrt{2(10)/2}=\sqrt{10}=\boxed{3{,}16\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">
            Fartvekst: 1,5 → 2,0 → 3,16 m/s viser hvordan v skalerer med{" "}
            <InlineLatex latex="\sqrt{W}" />, ikke W direkte.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Strategi: del integralet opp etter regioner og summer arbeidet. Arbeid-energi gir farten umiddelbart.</p>,
  },

  // ==========================================================================
  // 6.45 — Waterpark-slede
  // ==========================================================================
  "6.45": {
    title: "Slede skutt av komprimert fjær",
    difficulty: "middels",
    pageRef: "s. 203",
    problem: (
      <p>
        I en vannpark skytes sleder langs en glatt flate av en komprimert fjær
        med <InlineLatex latex="k=40{,}0\;\text{N/cm}=4000\;\text{N/m}" />. En
        slede med rytter (samlet masse 70,0 kg) presses mot fjæren og
        komprimerer den 0,375 m. Fra ro — hvor rask er sleden når (a) fjæren
        er tilbake til naturlig lengde, (b) fjæren fortsatt er komprimert 0,200 m?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="k=4000\;\text{N/m},\;x_i=0{,}375\;\text{m}" /></li>
        <li><InlineLatex latex="m=70{,}0\;\text{kg}" />, glatt flate</li>
      </ul>
    ),
    unknowns: <p>Fart i to posisjoner.</p>,
    strategy: (
      <p>
        Arbeid-energi med fjær: KE = arbeid av fjæren. Arbeidet fra start til
        kompresjon <InlineLatex latex="x" /> er{" "}
        <InlineLatex latex="\tfrac12 k(x_i^2-x^2)" />.
      </p>
    ),
    hints: [{ label: "Hint", content: <p>(b) fjæren er fortsatt komprimert — bare en del av PE er frigjort.</p> }],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Naturlig lengde (x=0)">
          <FormulaBox latex="\tfrac12 k x_i^2=\tfrac12(4000)(0{,}375)^2=281{,}25\;\text{J}" variant="blue" />
          <FormulaBox latex="v=\sqrt{2W/m}=\sqrt{2(281{,}25)/70}=\boxed{2{,}83\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Fortsatt komprimert 0,200 m">
          <FormulaBox latex="W=\tfrac12 k(x_i^2-x^2)=\tfrac12(4000)(0{,}375^2-0{,}200^2)=201{,}25\;\text{J}" variant="blue" />
          <FormulaBox latex="v=\sqrt{2(201{,}25)/70}=\boxed{2{,}40\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>En fjær som er delvis uthulet har enda PE igjen. Regn ut det arbeidet som <em>faktisk</em> er levert.</p>,
  },

  // ==========================================================================
  // 6.47 — 100 W-pære
  // ==========================================================================
  "6.47": {
    title: "Effekt, energi og fart for KE-ekvivalent",
    difficulty: "lett",
    pageRef: "s. 203",
    problem: (
      <p>
        Hvor mange joule bruker en 100 W-lyspære per time? Hvor raskt må en
        70 kg person løpe for å ha den samme kinetiske energien?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="P=100\;\text{W},\;t=3600\;\text{s}" /></li>
        <li><InlineLatex latex="m=70\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: <p>Energi og fart.</p>,
    strategy: (
      <TheoryBox title="Effekt og energi">
        <FormulaBox latex="E=Pt,\quad v=\sqrt{2KE/m}" variant="gold" />
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Energi på én time">
          <FormulaBox latex="E=(100)(3600)=\boxed{3{,}6\times 10^5\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="Matchende fart">
          <FormulaBox latex="v=\sqrt{2(3{,}6\times 10^5)/70}=\sqrt{10286}=\boxed{101\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">Ca 364 km/t — langt over menneskelig fart. Et håndgripelig bevis for hvor mye energi en pære faktisk bruker.</p>
        </Step>
      </div>
    ),
    summary: <p>Effekt × tid = energi. Lyspæren bruker like mye energi på én time som en menneskelig kropp ville hatt ved 101 m/s.</p>,
  },

  // ==========================================================================
  // 6.50 — Magnetar
  // ==========================================================================
  "6.50": {
    title: "Kraftforhold mellom magnetar og sol",
    difficulty: "lett",
    pageRef: "s. 204",
    problem: (
      <p>
        En magnetar slapp i 0,20 s ut like mye energi som solen gjør på 250 000
        år. Hvis P er solens gjennomsnittseffekt, hva er magnetarens
        gjennomsnittseffekt (i termer av P)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Magnetar: <InlineLatex latex="E=P\cdot t_\odot" /> med <InlineLatex latex="t_\odot=250\,000\;\text{år}" /></li>
        <li>Utløpstid: <InlineLatex latex="\Delta t=0{,}20\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="P_\text{mag}/P" /></p>,
    strategy: (
      <p>
        Effekt = energi/tid. Magnetaren slipper solens 250 000 år av energi på
        0,20 s.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Konverter år til sekunder: 1 år ≈ 3,156 × 10⁷ s.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Tid i sekunder">
          <FormulaBox latex="t_\odot=(2{,}5\times 10^5)(3{,}156\times 10^7)=7{,}89\times 10^{12}\;\text{s}" variant="blue" />
        </Step>
        <Step n={2} title="Effektforhold">
          <FormulaBox latex="\frac{P_\text{mag}}{P}=\frac{t_\odot}{\Delta t}=\frac{7{,}89\times 10^{12}}{0{,}20}=\boxed{3{,}9\times 10^{13}\,P}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Effekt er <em>rate</em>: komprimer lik energi i kortere tid → stor effekt. Magnetarer er nær solens evigvarende effekt × 4 × 10¹³.</p>,
  },

  // ==========================================================================
  // 6.54 — Heisens kapasitet
  // ==========================================================================
  "6.54": {
    title: "Maks passasjerer i heis med effektgrense",
    difficulty: "middels",
    pageRef: "s. 204",
    problem: (
      <p>
        En heis har masse 600 kg (uten passasjerer). Den skal stige 20,0 m
        (5 etasjer) på 16,0 s med konstant fart. Motoren leverer maks 40 hp.
        Hvor mange passasjerer (ca 65 kg hver) kan være med?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m_0=600\;\text{kg},\;h=20{,}0\;\text{m},\;t=16{,}0\;\text{s}" /></li>
        <li><InlineLatex latex="P_\text{max}=40\;\text{hp}=40\cdot 746=29840\;\text{W}" /></li>
        <li><InlineLatex latex="m_p=65\;\text{kg}" /> per passasjer</li>
      </ul>
    ),
    unknowns: <p>Antall passasjerer <InlineLatex latex="N" />.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Konstant fart → kraft fra motor = total vekt.
        </p>
        <TheoryBox title="Effekt og hastighet">
          <FormulaBox latex="P=Fv" variant="gold" />
          <p>For konstant fart: <InlineLatex latex="v=h/t" /> og <InlineLatex latex="F=(m_0+Nm_p)g" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Fart <InlineLatex latex="v=20/16=1{,}25\;\text{m/s}" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Sett opp ligningen">
          <FormulaBox latex="P_\text{max}=(m_0+Nm_p)gv" variant="blue" />
        </Step>
        <Step n={2} title="Løs for N">
          <FormulaBox latex="N=\frac{P_\text{max}/(gv)-m_0}{m_p}=\frac{29840/(9{,}80\cdot 1{,}25)-600}{65}" variant="blue" />
          <FormulaBox latex="=\frac{2436{,}7-600}{65}=\frac{1836{,}7}{65}\approx 28{,}3" variant="blue" />
          <p>Altså <strong>maks 28 passasjerer</strong>.</p>
        </Step>
      </div>
    ),
    summary: <p>Effekt setter grenser: <InlineLatex latex="P=Fv" />. Konstant fart betyr kraft = samlet vekt.</p>,
  },

  // ==========================================================================
  // 6.55 — Skitrekk
  // ==========================================================================
  "6.55": {
    title: "Effektbehov for skitrekk",
    difficulty: "middels",
    pageRef: "s. 204",
    problem: (
      <p>
        En skitrekk går opp et 15° skråplan på 300 m. Tauet går med
        12,0 km/t og drar 50 personer samtidig, med gjennomsnittlig masse 70,0 kg.
        Estimer nødvendig effekt.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\theta=15^\circ,\;v=12{,}0\;\text{km/t}=3{,}33\;\text{m/s}" /></li>
        <li><InlineLatex latex="N=50,\;m=70\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: <p>Nødvendig effekt.</p>,
    strategy: (
      <p>
        Konstant fart på skråplan: tauet må balansere vektens komponent ned
        skråplanet. Effekt = kraft × fart.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Kraft pr person: <InlineLatex latex="F_1=mg\sin\theta" />. Total kraft: <InlineLatex latex="NF_1" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Kraft langs tauet">
          <FormulaBox latex="F=Nmg\sin\theta=50(70)(9{,}80)\sin 15^\circ=50(70)(9{,}80)(0{,}2588)=8881\;\text{N}" variant="blue" />
        </Step>
        <Step n={2} title="Effekt">
          <FormulaBox latex="P=Fv=(8881)(3{,}33)=\boxed{2{,}96\times 10^4\;\text{W}\;\approx 29{,}6\;\text{kW}}" variant="gold" />
          <p className="italic text-xs">Eller ~40 hp. Realistisk størrelse for en mellomstor skitrekk.</p>
        </Step>
      </div>
    ),
    summary: <p>For oppadgående bevegelse på skråplan: trekker skal balansere <InlineLatex latex="mg\sin\theta" /> — den andre gravitasjonskomponenten bæres av underlaget.</p>,
  },

  // ==========================================================================
  // 6.58 — Fjærgevær
  // ==========================================================================
  "6.58": {
    title: "Kompresjon av fjær i leketøysgevær",
    difficulty: "middels",
    pageRef: "s. 205",
    problem: (
      <p>
        Et fjærgevær har <InlineLatex latex="k=400\;\text{N/m}" />. Rettet rett
        opp kaster det en 0,0600 kg pil 6,00 m opp (fra fjærens utlaste
        endeposisjon). Neglisjer luftmotstand, friksjon og fjærmasse. Hva er
        kompresjonen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="k=400\;\text{N/m},\;m=0{,}0600\;\text{kg},\;h=6{,}00\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Kompresjon <InlineLatex latex="x" />.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Energibevaring: fjærenergien → KE → potensiell energi oppe (men
          husk at pilen også stiger <InlineLatex latex="x" /> mer enn fjærens
          utløste lengde før den er fri).
        </p>
        <TheoryBox title="Energibevaring med fjær + gravitasjon">
          <p>Fra start (komprimert, i ro) til toppunkt (i ro):</p>
          <FormulaBox latex="\tfrac12 k x^2=mg(h+x)" variant="gold" />
          <p className="mt-1">
            Merk: høyden er fra utløst endeposisjon til toppunkt, men pilen
            stiger også <InlineLatex latex="x" /> under utløsningen.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Kvadratisk ligning i x. Regn først ut mg og sett opp.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Sett opp ligningen">
          <FormulaBox latex="\tfrac12(400)x^2=0{,}0600(9{,}80)(6+x)=0{,}588(6+x)" variant="blue" />
          <FormulaBox latex="200x^2-0{,}588x-3{,}528=0" variant="blue" />
        </Step>
        <Step n={2} title="Løs med abc-formelen">
          <FormulaBox latex="x=\frac{0{,}588+\sqrt{0{,}588^2+4(200)(3{,}528)}}{2(200)}=\frac{0{,}588+53{,}11}{400}=\boxed{0{,}134\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Glem ikke å ta med <em>selve fjærkompresjonen</em> i total høydeendring.
        Energibevaring er rask og trygg her.
      </p>
    ),
  },

  // ==========================================================================
  // 6.59 — Isblokk på skråplan
  // ==========================================================================
  "6.59": {
    title: "Sluttfart av isblokk ned friksjonsløst skråplan",
    difficulty: "lett",
    pageRef: "s. 205",
    problem: (
      <p>
        En 2,00 kg isblokk glir 1,35 m ned et friksjonsløst skråplan
        på 36,9°. Starter fra ro. Sluttfart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}00\;\text{kg},\;s=1{,}35\;\text{m},\;\theta=36{,}9^\circ" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart.</p>,
    strategy: (
      <p>
        Kun gravitasjonen gjør arbeid (glatt skråplan). Høydeendringen er{" "}
        <InlineLatex latex="h=s\sin\theta" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="\tfrac12 mv^2=mgs\sin\theta\Rightarrow v=\sqrt{2gs\sin\theta}" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Fart fra energi">
          <FormulaBox latex="v=\sqrt{2(9{,}80)(1{,}35)\sin 36{,}9^\circ}=\sqrt{26{,}46\cdot 0{,}6}=\boxed{3{,}98\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>For glatte skråplan: <InlineLatex latex="v=\sqrt{2g h}" /> med <InlineLatex latex="h=s\sin\theta" />. Massen faller ut.</p>,
  },

  // ==========================================================================
  // 6.60 — lagt som 6.59 alternativ (sjekk liste)
  // ==========================================================================
  // (problems)

  // ==========================================================================
  // 6.67 — Baseball-pitcher
  // ==========================================================================
  "6.67": {
    title: "Arbeid pitcher utøver på ball",
    difficulty: "lett",
    pageRef: "s. 206",
    problem: (
      <p>
        En trent pitcher kaster en baseball (masse 0,145 kg) i nær 100 mi/t
        (44,7 m/s). Hvor mye arbeid gjør han på ballen (kroppsbevegelsene
        neglisjeres)?
      </p>
    ),
    knowns: <p><InlineLatex latex="m=0{,}145\;\text{kg},\;v=44{,}7\;\text{m/s}" />, starter fra ro.</p>,
    unknowns: <p>Arbeid <InlineLatex latex="W" />.</p>,
    strategy: <p>Arbeid-energi: <InlineLatex latex="W=\tfrac12 mv^2" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Beregning">
          <FormulaBox latex="W=\tfrac12(0{,}145)(44{,}7)^2=\boxed{145\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Arbeid-energi gir den enkleste utregningen når start- og sluttfart er kjent.</p>,
  },

  // ==========================================================================
  // 6.71 — Pumpe
  // ==========================================================================
  "6.71": {
    title: "Effektbehov for vannpumpe",
    difficulty: "vanskelig",
    pageRef: "s. 206",
    problem: (
      <p>
        En pumpe løfter 800 kg vann per minutt fra en 14,0 m dyp brønn, og
        slenger det ut med fart 18,0 m/s. (a) Arbeid pr. minutt for
        løftet? (b) Arbeid pr. minutt for KE-delen? (c) Effektbehov?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\Delta m/\Delta t=800/60\;\text{kg/s}" /></li>
        <li><InlineLatex latex="h=14{,}0\;\text{m},\;v=18{,}0\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>Arbeid per minutt (to deler) og effekt.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          To arbeidsdeler: løftet mot gravitasjon og kinetisk energi ved utløp.
          Effekt = total energi pr. tid.
        </p>
        <TheoryBox title="To oppgaver for pumpa">
          <FormulaBox latex="W_\text{lift}=mgh,\quad W_\text{KE}=\tfrac12 m v^2" variant="blue" />
          <p>Tidsgjennomsnittlig effekt: <InlineLatex latex="P=(W_\text{lift}+W_\text{KE})/\Delta t" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk <InlineLatex latex="\Delta t=60\;\text{s}" /> for "per minutt".</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Løfte-arbeid">
          <FormulaBox latex="W_\text{lift}=(800)(9{,}80)(14{,}0)=\boxed{1{,}098\times 10^5\;\text{J}}" variant="blue" />
        </Step>
        <Step n={2} title="(b) KE-arbeid">
          <FormulaBox latex="W_\text{KE}=\tfrac12(800)(18{,}0)^2=\boxed{1{,}296\times 10^5\;\text{J}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Effekt">
          <FormulaBox latex="P=\frac{W_\text{lift}+W_\text{KE}}{60}=\frac{2{,}394\times 10^5}{60}=\boxed{3{,}99\times 10^3\;\text{W}\approx 4{,}0\;\text{kW}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Når det flyter masse: fordel energien mellom løft (PE) og fart (KE), summer og del på tid.</p>,
  },

  // ==========================================================================
  // 6.75 — Kloss med friksjon, dratt horisontalt
  // ==========================================================================
  "6.75": {
    title: "Sluttfart av kloss dratt mot friksjon",
    difficulty: "middels",
    pageRef: "s. 207",
    problem: (
      <p>
        En 4,00 kg treklosss på et stålbord har <InlineLatex latex="\mu_k=0{,}300" />.
        Klossen er i ro. Du drar med en horisontal kraft 25,0 N i 3,00 s, langs
        1,50 m. Hva er sluttfarten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=4{,}00\;\text{kg},\;\mu_k=0{,}300,\;F=25{,}0\;\text{N}" /></li>
        <li><InlineLatex latex="s=1{,}50\;\text{m},\;v_0=0" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart.</p>,
    strategy: (
      <p>
        Bruk arbeid-energi med begge horisontale krefter.{" "}
        <InlineLatex latex="f_k=\mu_k mg" /> motvirker bevegelsen.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="W_\text{tot}=(F-f_k)s=\tfrac12 mv^2" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Krefter">
          <FormulaBox latex="f_k=\mu_k mg=(0{,}300)(4{,}00)(9{,}80)=11{,}76\;\text{N}" variant="blue" />
          <FormulaBox latex="F_\text{net}=F-f_k=25{,}0-11{,}76=13{,}24\;\text{N}" variant="blue" />
        </Step>
        <Step n={2} title="Fart">
          <FormulaBox latex="v=\sqrt{\frac{2F_\text{net}s}{m}}=\sqrt{\frac{2(13{,}24)(1{,}50)}{4{,}00}}=\sqrt{9{,}93}=\boxed{3{,}15\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>For horisontal bevegelse med friksjon: bruk <em>nettokraft</em> × avstand i arbeid-energi-teoremet.</p>,
  },

  // ==========================================================================
  // 6.81 — Fjær med friksjon etter
  // ==========================================================================
  "6.81": {
    title: "Kloss på fjær → glidende friksjon",
    difficulty: "vanskelig",
    pageRef: "s. 207",
    problem: (
      <p>
        En 2,50 kg kloss presser en fjær (<InlineLatex latex="k=250\;\text{N/m}" />)
        0,150 m. Fjæren slipper. Etterpå glir klossen langs en horisontal flate
        med <InlineLatex latex="\mu_k=0{,}300" />. Hvor langt beveger den seg
        før den stopper (målt fra der fjæren er ukomprimert)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}50\;\text{kg},\;k=250\;\text{N/m}" /></li>
        <li><InlineLatex latex="x=0{,}150\;\text{m},\;\mu_k=0{,}300" /></li>
      </ul>
    ),
    unknowns: <p>Avstand til stopp.</p>,
    strategy: (
      <p>
        All fjærenergi blir dissippert av friksjonen:{" "}
        <InlineLatex latex="\tfrac12 k x^2=\mu_k m g\,d" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Sett fjærarbeid lik friksjonsarbeid over avstanden d.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Energibalanse">
          <FormulaBox latex="\tfrac12 k x^2=\mu_k m g d\;\Rightarrow\; d=\frac{k x^2}{2\mu_k m g}" variant="gold" />
        </Step>
        <Step n={2} title="Numerikk">
          <FormulaBox latex="d=\frac{(250)(0{,}150)^2}{2(0{,}300)(2{,}50)(9{,}80)}=\frac{5{,}625}{14{,}7}=\boxed{0{,}383\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Friksjon som dissipatør: lik all tilgjengelig energi med arbeidet friksjonen gjør over distansen.</p>,
  },

  // ==========================================================================
  // 6.82 — Sykkel opp bakke
  // ==========================================================================
  "6.82": {
    title: "Effektbehov for syklist opp bakke",
    difficulty: "middels",
    pageRef: "s. 207",
    problem: (
      <p>
        En syklist (totalmasse 75,0 kg) kjører med 4,00 m/s opp en jevn bakke
        som stiger 4,00°. Rullemotstand og luftmotstand tilsvarer en
        konstant motkraft på 20,0 N. Hvilken effekt leverer syklisten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=75{,}0\;\text{kg},\;v=4{,}00\;\text{m/s},\;\theta=4{,}00^\circ" /></li>
        <li>Motstand: 20,0 N</li>
      </ul>
    ),
    unknowns: <p>Effekt.</p>,
    strategy: <p>Konstant fart → kraften fra syklisten er lik motstand + gravitasjonskomponent.</p>,
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="F=mg\sin\theta+f" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Nettokraft syklisten gir">
          <FormulaBox latex="F=mg\sin\theta+20=(75)(9{,}80)(0{,}0698)+20=51{,}30+20=71{,}30\;\text{N}" variant="blue" />
        </Step>
        <Step n={2} title="Effekt">
          <FormulaBox latex="P=Fv=(71{,}30)(4{,}00)=\boxed{285\;\text{W}}" variant="gold" />
          <p className="italic text-xs">Ca 0,38 hp — realistisk for amatørsyklist.</p>
        </Step>
      </div>
    ),
    summary: <p>Bakken og friksjon legger seg sammen i nødvendig kraft. P = Fv gir effekten.</p>,
  },

  // ==========================================================================
  // 6.85 — Toutgange
  // ==========================================================================
  "6.85": {
    title: "Effektbehov for akselererende bil",
    difficulty: "vanskelig",
    pageRef: "s. 208",
    problem: (
      <p>
        En 1500 kg bil akselererer fra hvile til 25 m/s på 8,0 s. Neglisjer
        friksjon/luftmotstand. (a) Arbeid som motoren må levere? (b) Gjennomsnittlig
        effekt? (c) Øyeblikkelig effekt ved sluttfart, antatt konstant nettokraft?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1500\;\text{kg},\;v_0=0,\;v_f=25\;\text{m/s},\;t=8{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Arbeid, gjennomsnitts-effekt, maks-effekt.</p>,
    strategy: (
      <p>
        Arbeid-energi for (a). Gjennomsnittseffekt: arbeid/tid. Øyeblikkelig
        effekt ved endelig fart: <InlineLatex latex="P=Fv_f" />, der{" "}
        <InlineLatex latex="F=ma" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="a=v_f/t" /> siden konstant akselerasjon fra hvile.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Arbeid">
          <FormulaBox latex="W=\tfrac12 mv_f^2=\tfrac12(1500)(25)^2=\boxed{4{,}69\times 10^5\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Gjennomsnittseffekt">
          <FormulaBox latex="P_\text{gj}=W/t=4{,}69\times 10^5/8{,}0=\boxed{5{,}86\times 10^4\;\text{W}\approx 78{,}6\;\text{hp}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Øyeblikkelig effekt ved sluttfart">
          <FormulaBox latex="a=25/8{,}0=3{,}125\;\text{m/s}^2" variant="blue" />
          <FormulaBox latex="F=ma=(1500)(3{,}125)=4688\;\text{N}" variant="blue" />
          <FormulaBox latex="P=Fv_f=(4688)(25)=\boxed{1{,}17\times 10^5\;\text{W}\approx 157\;\text{hp}}" variant="gold" />
          <p className="italic text-xs">Merk: øyeblikkelig effekt ved sluttfart er <em>dobbelt</em> av gjennomsnittet — fordi effekten vokser lineært med farten under konstant akselerasjon.</p>
        </Step>
      </div>
    ),
    summary: <p>Under konstant akselerasjon: <InlineLatex latex="P_\text{øy}(t)=Fv(t)=F\cdot at" /> vokser lineært; gjennomsnittet er halvparten av toppen.</p>,
  },
};
