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
// SVG-helpere
// ============================================================================

function Arrowheads() {
  return (
    <defs>
      <marker id="arrow-red-k9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 9.1 — Buelengde, radianer, grader
  // ==========================================================================
  "9.1": {
    title: "Buelengde, vinkel i radianer og grader",
    difficulty: "lett",
    pageRef: "s. 322",
    problem: (
      <div className="space-y-2">
        <p>
          <strong>(a)</strong> Hvilken vinkel i radianer spennes ut av en bue med lengde{" "}
          <InlineLatex latex="1{,}57\;\text{m}" /> på en sirkel med radius{" "}
          <InlineLatex latex="2{,}45\;\text{m}" />? Hva er vinkelen i grader?{" "}
          <strong>(b)</strong> En bue på <InlineLatex latex="13{,}3\;\text{cm}" /> langs omkretsen av en
          sirkel spenner ut en vinkel på <InlineLatex latex="125°" />. Hva er radien?{" "}
          <strong>(c)</strong> Vinkelen mellom to radier i en sirkel med radius{" "}
          <InlineLatex latex="1{,}60\;\text{m}" /> er <InlineLatex latex="0{,}800\;\text{rad}" />. Hvor
          lang bue spennes ut av radiene?
        </p>
        <svg viewBox="0 0 300 180" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <circle cx="150" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="150" y1="100" x2="220" y2="100" stroke="#3b82f6" strokeWidth="2" />
          <line x1="150" y1="100" x2="185" y2="40" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 220 100 A 70 70 0 0 0 185 40" fill="none" stroke="#ef4444" strokeWidth="3" />
          <text x="200" y="75" fontSize="12" fill="#ef4444" fontWeight="bold">s</text>
          <text x="180" y="115" fontSize="11" fill="#3b82f6">r</text>
          <text x="165" y="90" fontSize="11" fill="currentColor">θ</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="s = 1{,}57\;\text{m}" />, <InlineLatex latex="r = 2{,}45\;\text{m}" /></li>
        <li>(b) <InlineLatex latex="s = 0{,}133\;\text{m}" />, <InlineLatex latex="\theta = 125°" /></li>
        <li>(c) <InlineLatex latex="r = 1{,}60\;\text{m}" />, <InlineLatex latex="\theta = 0{,}800\;\text{rad}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Vinkelen <InlineLatex latex="\theta" /> i rad og grader</li>
        <li>(b) Radien <InlineLatex latex="r" /></li>
        <li>(c) Buelengden <InlineLatex latex="s" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Grunnrelasjonen mellom buelengde, radius og vinkel (i radianer) er{" "}
        <InlineLatex latex="s = r\theta" />. Denne formelen krever{" "}
        <strong>radianer, ikke grader</strong>. Konvertering: <InlineLatex latex="180° = \pi\;\text{rad}" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Løs <InlineLatex latex="s = r\theta" /> for den ukjente variabelen i hvert tilfelle.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            I (b) må grader gjøres om til radianer først:{" "}
            <InlineLatex latex="\theta_{\text{rad}} = \theta_{°} \cdot \pi/180" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Radianen er definert slik at en bue som er like lang som
          radien spenner ut 1 rad. Fra denne definisjonen følger den grunnleggende relasjonen{" "}
          <InlineLatex latex="s = r\theta" /> — men kun når <InlineLatex latex="\theta" /> er
          i radianer. Dette er fordi en full omkrets <InlineLatex latex="s = 2\pi r" /> skal
          tilsvare <InlineLatex latex="\theta = 2\pi" /> rad. Konverteringen mellom grader og
          radianer følger av <InlineLatex latex="360° = 2\pi\;\text{rad}" />, altså{" "}
          <InlineLatex latex="1\;\text{rad} = 180°/\pi \approx 57{,}3°" />.
        </p>

        <p className="font-semibold">(a) Finn vinkelen</p>
        <p>
          <strong>Originalformel</strong> (gjelder bare når <InlineLatex latex="\theta" /> er i
          radianer):
        </p>
        <FormulaBox latex="s = r\theta" variant="blue" />
        <p>
          Vi kjenner bue og radius og skal finne vinkelen, så vi løser algebraisk for{" "}
          <InlineLatex latex="\theta" />:
        </p>
        <FormulaBox latex="\theta = \frac{s}{r}" variant="blue" />
        <p>Sett inn tall:</p>
        <FormulaBox latex="\theta = \frac{s}{r} = \frac{1{,}57}{2{,}45} = 0{,}641\;\text{rad}" variant="blue" />
        <p>
          Konverter til grader ved å gange med <InlineLatex latex="180°/\pi" />:
        </p>
        <FormulaBox latex="\theta = 0{,}641\;\text{rad} \cdot \frac{180°}{\pi} = \boxed{\,36{,}7°\,}" variant="gold" />

        <p className="font-semibold">(b) Finn radien</p>
        <p>
          Her er vinkelen gitt i grader, så vi må først konvertere til radianer — ellers gir{" "}
          <InlineLatex latex="s = r\theta" /> feil svar:
        </p>
        <FormulaBox latex="\theta = 125° \cdot \frac{\pi}{180°} = 2{,}182\;\text{rad}" variant="blue" />
        <p>
          Løs <InlineLatex latex="s = r\theta" /> for r:
        </p>
        <FormulaBox latex="r = \frac{s}{\theta}" variant="blue" />
        <FormulaBox latex="r = \frac{s}{\theta} = \frac{0{,}133}{2{,}182} = \boxed{\,0{,}0609\;\text{m} = 6{,}09\;\text{cm}\,}" variant="gold" />

        <p className="font-semibold">(c) Finn buelengden</p>
        <p>
          Vinkelen er allerede i radianer, så vi kan sette rett inn i originalformelen{" "}
          <InlineLatex latex="s = r\theta" />:
        </p>
        <FormulaBox latex="s = r\theta = 1{,}60 \cdot 0{,}800 = \boxed{\,1{,}28\;\text{m}\,}" variant="gold" />

        <p>
          <strong>Fysisk tolkning:</strong> En vinkel på 0,8 rad er ca 46° — litt mindre enn
          en kvartsirkel, så buen 1,28 m er litt mindre enn en kvartsirkel av omkretsen{" "}
          <InlineLatex latex="2\pi \cdot 1{,}60 \approx 10{,}05\;\text{m}" />, som stemmer
          (10,05/4 ≈ 2,51 m er kvart, så 1,28 m ligger under det).
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Formelen <InlineLatex latex="s = r\theta" /> er grunnleggende for all rotasjonsmekanikk. Konverter
        alltid grader til radianer før du bruker den — vinkelen må være i radianer.
      </p>
    ),
  },

  // ==========================================================================
  // 9.2 — Flypropell, rpm
  // ==========================================================================
  "9.2": {
    title: "Flypropell — rpm til rad/s",
    difficulty: "lett",
    pageRef: "s. 322",
    problem: (
      <div className="space-y-2">
        <p>
          En flypropell roterer med <InlineLatex latex="1860\;\text{rpm}" />.{" "}
          <strong>(a)</strong> Beregn vinkelhastigheten i rad/s.{" "}
          <strong>(b)</strong> Hvor mange sekunder bruker propellen til å rotere{" "}
          <InlineLatex latex="40°" />?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Turtall: <InlineLatex latex="n = 1860\;\text{rpm}" /></li>
        <li>Vinkel: <InlineLatex latex="\theta = 40°" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Vinkelhastighet <InlineLatex latex="\omega" /> i rad/s</li>
        <li>(b) Tid <InlineLatex latex="t" /> for å rotere 40°</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Konverter rpm (omdreininger per minutt) til rad/s ved <InlineLatex latex="\omega = n\cdot 2\pi/60" />.
        Siden <InlineLatex latex="\omega" /> er konstant, gjelder{" "}
        <InlineLatex latex="\theta = \omega t" /> (konverter grader til radianer først!).
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            1 omdreining = <InlineLatex latex="2\pi" /> rad, og 1 min = 60 s.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Vinkelhastigheten{" "}
          <InlineLatex latex="\omega = d\theta/dt" /> måler hvor raskt vinkelen endrer seg. I
          SI-systemet er enheten rad/s, men i praksis oppgis turtall ofte i <em>rpm</em>{" "}
          (revolutions per minute = omdreininger per minutt). For å bruke rotasjonskinematikken
          må vi konvertere til rad/s. Siden 1 omdreining = <InlineLatex latex="2\pi" /> rad og
          1 min = 60 s, får vi den universelle konverteringsformelen:
        </p>
        <FormulaBox latex="\omega\;[\text{rad/s}] = n\;[\text{rpm}] \cdot \frac{2\pi}{60} = n \cdot \frac{\pi}{30}" variant="blue" />

        <p className="font-semibold">(a) Vinkelhastighet</p>
        <p>Sett inn <InlineLatex latex="n = 1860" /> med eksplisitt enhetsmultiplikasjon:</p>
        <FormulaBox
          latex="\omega = 1860\;\frac{\text{rev}}{\text{min}} \cdot \frac{2\pi\;\text{rad}}{1\;\text{rev}} \cdot \frac{1\;\text{min}}{60\;\text{s}} = \boxed{\,194{,}8\;\text{rad/s}\,}"
          variant="gold"
        />

        <p className="font-semibold">(b) Tid for 40°</p>
        <p>
          <strong>Originalformel</strong> for konstant vinkelhastighet (analogt med{" "}
          <InlineLatex latex="x = vt" />):
        </p>
        <FormulaBox latex="\theta = \omega t" variant="blue" />
        <p>
          Vi skal finne tiden, så vi løser for t:
        </p>
        <FormulaBox latex="t = \frac{\theta}{\omega}" variant="blue" />
        <p>
          Men denne formelen krever at <InlineLatex latex="\theta" /> er i radianer (fordi{" "}
          <InlineLatex latex="\omega" /> er i rad/s). Konverter 40° til radianer først:
        </p>
        <FormulaBox latex="\theta = 40° \cdot \frac{\pi}{180°} = 0{,}6981\;\text{rad}" variant="blue" />
        <FormulaBox
          latex="t = \frac{\theta}{\omega} = \frac{0{,}6981}{194{,}8} = \boxed{\,3{,}58\cdot 10^{-3}\;\text{s} = 3{,}58\;\text{ms}\,}"
          variant="gold"
        />
        <p>
          <strong>Fysisk tolkning:</strong> 3,58 ms er en svært kort tid — som forventet når
          propellen roterer nesten 200 rad/s. Til sammenligning bruker en mekanisk klokkevisere
          ett minutt på 6° — propellen er altså flere størrelsesordener raskere.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Standard konvertering: <InlineLatex latex="\omega_{\text{rad/s}} = n_{\text{rpm}} \cdot \dfrac{2\pi}{60} = n \cdot \dfrac{\pi}{30}" />.
        Dette er en av de vanligste konverteringene i eksamensoppgaver.
      </p>
    ),
  },

  // ==========================================================================
  // 9.4 — Fan blade CALC
  // ==========================================================================
  "9.4": {
    title: "Viftevinge — tidsvarierende vinkelhastighet",
    difficulty: "middels",
    pageRef: "s. 322",
    problem: (
      <div className="space-y-2">
        <p>
          En viftevinge har vinkelhastighet gitt ved{" "}
          <InlineLatex latex="\omega_z(t) = \gamma - \beta t^2" />, der{" "}
          <InlineLatex latex="\gamma = 4{,}85\;\text{rad/s}" /> og{" "}
          <InlineLatex latex="\beta = 0{,}792\;\text{rad/s}^3" />.
        </p>
        <p>
          <strong>(a)</strong> Beregn vinkelakselerasjonen som funksjon av tid.{" "}
          <strong>(b)</strong> Beregn den momentane vinkelakselerasjonen{" "}
          <InlineLatex latex="\alpha_z" /> ved <InlineLatex latex="t = 3{,}50\;\text{s}" /> og den
          gjennomsnittlige <InlineLatex latex="\alpha_{\text{av-z}}" /> for intervallet{" "}
          <InlineLatex latex="t = 0" /> til <InlineLatex latex="t = 3{,}50\;\text{s}" />. Sammenlign.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\omega_z(t) = \gamma - \beta t^2" /></li>
        <li><InlineLatex latex="\gamma = 4{,}85\;\text{rad/s}" /></li>
        <li><InlineLatex latex="\beta = 0{,}792\;\text{rad/s}^3" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="\alpha_z(t)" /></li>
        <li>(b) <InlineLatex latex="\alpha_z(3{,}50\;\text{s})" /> og <InlineLatex latex="\alpha_{\text{av-z}}" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Vinkelakselerasjonen er den deriverte: <InlineLatex latex="\alpha_z = d\omega_z/dt" />.
        Gjennomsnittlig akselerasjon er <InlineLatex latex="\alpha_{\text{av-z}} = \Delta\omega_z/\Delta t" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Deriver <InlineLatex latex="-\beta t^2" /> mhp. t.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Rotasjonsbevegelse er analog til rettlinjet bevegelse:{" "}
          <InlineLatex latex="x \to \theta" />, <InlineLatex latex="v \to \omega" />,{" "}
          <InlineLatex latex="a \to \alpha" />. Akkurat som{" "}
          <InlineLatex latex="a = dv/dt" /> i lineær bevegelse, gjelder her:
        </p>
        <FormulaBox latex="\alpha_z = \frac{d\omega_z}{dt}" variant="blue" />
        <p>
          <strong>Viktig:</strong> Dette er <em>momentan</em> vinkelakselerasjon — gyldig hvert
          øyeblikk, selv når <InlineLatex latex="\alpha" /> ikke er konstant. Dersom{" "}
          <InlineLatex latex="\omega(t)" /> IKKE er lineær, kan vi ikke bruke de fire
          konstant-<InlineLatex latex="\alpha" />-kinematikkformlene — vi må deriver/integrere.
        </p>

        <p className="font-semibold">(a) Derivér ω(t)</p>
        <p>
          Vi har <InlineLatex latex="\omega_z(t) = \gamma - \beta t^2" />.{" "}
          <InlineLatex latex="\gamma" /> er konstant og deriveres til 0. Effektregelen gir{" "}
          <InlineLatex latex="d(t^2)/dt = 2t" />:
        </p>
        <FormulaBox latex="\alpha_z(t) = \frac{d\omega_z}{dt} = \boxed{\,-2\beta t = -(1{,}584\;\text{rad/s}^3)\,t\,}" variant="gold" />

        <p className="font-semibold">(b) Ved t = 3,50 s</p>
        <p>Sett inn tallene i uttrykket fra (a):</p>
        <FormulaBox latex="\alpha_z(3{,}50) = -2(0{,}792)(3{,}50) = \boxed{\,-5{,}54\;\text{rad/s}^2\,}" variant="gold" />

        <p className="font-semibold">Gjennomsnittlig akselerasjon</p>
        <p>
          <strong>Originalformel</strong> for gjennomsnittlig vinkelakselerasjon:
        </p>
        <FormulaBox latex="\alpha_{\text{av-z}} = \frac{\omega_z(t_2) - \omega_z(t_1)}{t_2 - t_1}" variant="blue" />
        <p>
          Vi må altså finne <InlineLatex latex="\omega" /> ved starten og slutten av
          intervallet, ved å evaluere den originale <InlineLatex latex="\omega(t)" />:
        </p>
        <FormulaBox latex="\omega_z(0) = \gamma = 4{,}85\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\omega_z(3{,}50) = 4{,}85 - 0{,}792(3{,}50)^2 = -4{,}85\;\text{rad/s}" variant="blue" />
        <FormulaBox
          latex="\alpha_{\text{av-z}} = \frac{\Delta\omega_z}{\Delta t} = \frac{-4{,}85 - 4{,}85}{3{,}50} = \boxed{\,-2{,}77\;\text{rad/s}^2\,}"
          variant="gold"
        />

        <p>
          <strong>Fysisk tolkning:</strong> De to verdiene er ulike fordi{" "}
          <InlineLatex latex="\alpha" /> ikke er konstant — den øker lineært med tiden. Momentan
          ved t = 3,50 s er nettopp dobbelt av gjennomsnittet:{" "}
          <InlineLatex latex="\alpha_z(3{,}50) = 2 \alpha_{\text{av}}" />, som stemmer for en
          lineær <InlineLatex latex="\alpha(t)" /> (gjennomsnitt av null og en verdi er halve
          verdien). At <InlineLatex latex="\omega" /> skifter fortegn midt i intervallet
          forteller oss at viften faktisk stopper og begynner å rotere motsatt vei.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når <InlineLatex latex="\omega(t)" /> ikke er lineær, er <InlineLatex latex="\alpha" />{" "}
        <em>ikke</em> konstant. Kinematikkformlene for konstant α gjelder ikke — du må deriver/integrere.
        Gjennomsnittlig akselerasjon er ikke det samme som gjennomsnittet av endepunktsverdiene.
      </p>
    ),
  },

  // ==========================================================================
  // 9.5 — Merry-go-round CALC
  // ==========================================================================
  "9.5": {
    title: "Karusell — θ(t) gir ω(t)",
    difficulty: "middels",
    pageRef: "s. 322",
    problem: (
      <div>
        <p>
          En karusell roterer slik at{" "}
          <InlineLatex latex="\theta(t) = \gamma t + \beta t^3" /> med{" "}
          <InlineLatex latex="\gamma = 0{,}428\;\text{rad/s}" /> og{" "}
          <InlineLatex latex="\beta = 1{,}00\cdot 10^{-2}\;\text{rad/s}^3" />.
        </p>
        <p className="mt-2">
          <strong>(a)</strong> Beregn <InlineLatex latex="\omega_z(t)" />.{" "}
          <strong>(b)</strong> Initialverdien av <InlineLatex latex="\omega" />.{" "}
          <strong>(c)</strong> <InlineLatex latex="\omega_z(4{,}55\;\text{s})" /> og{" "}
          <InlineLatex latex="\omega_{\text{av-z}}" /> for intervallet 0 til 4,55 s. Vis at{" "}
          <InlineLatex latex="\omega_{\text{av-z}}" /> <em>ikke</em> er gjennomsnittet av{" "}
          endepunktsverdiene.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\theta(t) = \gamma t + \beta t^3" /></li>
        <li><InlineLatex latex="\gamma = 0{,}428\;\text{rad/s}" /></li>
        <li><InlineLatex latex="\beta = 1{,}00\cdot 10^{-2}\;\text{rad/s}^3" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\omega_z(t)" />, <InlineLatex latex="\omega_z(0)" />, <InlineLatex latex="\omega_z(4{,}55)" /></li>
        <li><InlineLatex latex="\omega_{\text{av-z}}" /> fra 0 til 4,55 s</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk <InlineLatex latex="\omega_z = d\theta/dt" />. Gjennomsnittlig{" "}
        <InlineLatex latex="\omega" /> er <InlineLatex latex="\Delta\theta/\Delta t" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Derivér <InlineLatex latex="\beta t^3" />: blir <InlineLatex latex="3\beta t^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> I rotasjonskinematikk er de tre sentrale variablene analoge med
          lineære størrelser: vinkelposisjon <InlineLatex latex="\theta" /> (tilsvarer{" "}
          <InlineLatex latex="x" />), vinkelhastighet <InlineLatex latex="\omega = d\theta/dt" />{" "}
          (tilsvarer <InlineLatex latex="v = dx/dt" />) og vinkelakselerasjon{" "}
          <InlineLatex latex="\alpha = d\omega/dt" /> (tilsvarer <InlineLatex latex="a = dv/dt" />).
          Når vi har posisjonsfunksjonen <InlineLatex latex="\theta(t)" /> får vi alltid hastigheten
          ved å derivere — aldri ved å "dele på tid", fordi det bare fungerer når bevegelsen er lineær.
        </p>

        <p className="font-semibold mt-4">(a) Finn ω(t) fra θ(t)</p>
        <p>
          <strong>Originalformel</strong> (definisjonen av momentan vinkelhastighet):
        </p>
        <FormulaBox latex="\omega_z(t) = \frac{d\theta}{dt}" variant="blue" />
        <p>
          Vi bruker denne fordi <InlineLatex latex="\theta(t)" /> ikke er lineær i t (har{" "}
          <InlineLatex latex="t^3" />-ledd), så <InlineLatex latex="\omega" /> varierer med tiden og
          kan ikke finnes ved <InlineLatex latex="\Delta\theta/\Delta t" /> for et vilkårlig øyeblikk.
          Effektregelen gir <InlineLatex latex="d(t)/dt = 1" /> og{" "}
          <InlineLatex latex="d(t^3)/dt = 3t^2" />:
        </p>
        <FormulaBox latex="\omega_z(t) = \frac{d}{dt}(\gamma t + \beta t^3) = \boxed{\,\gamma + 3\beta t^2\,}" variant="gold" />
        <p>Enhetssjekk: <InlineLatex latex="[\gamma] = \text{rad/s}" /> og <InlineLatex latex="[\beta t^2] = (\text{rad/s}^3)\cdot \text{s}^2 = \text{rad/s}" /> — stemmer.</p>

        <p className="font-semibold mt-4">(b) Initial ω</p>
        <p>Sett t = 0 inn i uttrykket fra (a). <InlineLatex latex="t^2" />-leddet blir null:</p>
        <FormulaBox latex="\omega_z(0) = \gamma + 3\beta(0)^2 = \gamma = \boxed{\,0{,}428\;\text{rad/s}\,}" variant="gold" />
        <p>Dette viser hvorfor konstanten <InlineLatex latex="\gamma" /> tolkes som starthastigheten.</p>

        <p className="font-semibold mt-4">(c) Momentan ω ved t = 4,55 s</p>
        <p>Sett inn tall i formelen fra (a) steg for steg:</p>
        <FormulaBox
          latex="\omega_z(4{,}55) = 0{,}428 + 3(1{,}00\cdot 10^{-2})(4{,}55)^2"
          variant="blue"
        />
        <FormulaBox
          latex="= 0{,}428 + 0{,}03 \cdot 20{,}7 = 0{,}428 + 0{,}621 = \boxed{\,1{,}049\;\text{rad/s}\,}"
          variant="gold"
        />

        <p className="font-semibold mt-4">Gjennomsnittlig ω — hvorfor integrere og ikke bare snitte?</p>
        <p>
          <strong>Originalformel</strong> for gjennomsnittlig vinkelhastighet (definisjon):
        </p>
        <FormulaBox latex="\omega_{\text{av-z}} = \frac{\Delta\theta}{\Delta t} = \frac{\theta(t_2) - \theta(t_1)}{t_2 - t_1}" variant="blue" />
        <p>
          Denne formelen bruker <em>den faktiske endringen i vinkel</em>, som igjen er lik{" "}
          integralet av <InlineLatex latex="\omega(t)" /> over intervallet. Vi bruker altså
          posisjonsfunksjonen direkte, ikke snittet av endepunktsverdiene:
        </p>
        <FormulaBox latex="\theta(4{,}55) = 0{,}428(4{,}55) + 1{,}00\cdot 10^{-2}(4{,}55)^3 = 1{,}948 + 0{,}942 = 2{,}890\;\text{rad}" variant="blue" />
        <FormulaBox latex="\theta(0) = 0" variant="blue" />
        <FormulaBox
          latex="\omega_{\text{av-z}} = \frac{2{,}890 - 0}{4{,}55 - 0} = \boxed{\,0{,}635\;\text{rad/s}\,}"
          variant="gold"
        />

        <p>
          <strong>Fysisk tolkning:</strong> Snittet av endepunktsverdiene er{" "}
          <InlineLatex latex="(0{,}428 + 1{,}049)/2 = 0{,}739\;\text{rad/s}" />, mens det <em>faktiske</em>{" "}
          gjennomsnittet er 0,635 rad/s — lavere. Grunnen: <InlineLatex latex="\omega(t) = \gamma + 3\beta t^2" />{" "}
          vokser som <InlineLatex latex="t^2" />, altså tregt i starten og raskt mot slutten. Karusellen
          bruker derfor størstedelen av tiden på lave hastigheter, og det drar gjennomsnittet ned.
          Analogt med lineær kinematikk: snitt av endepunktsverdier gir riktig gjennomsnitt kun når
          hastigheten endres lineært (konstant akselerasjon).
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Middelverdi av en funksjon over et intervall er <em>integralet delt på lengden</em>, ikke
        gjennomsnittet av endepunktene. Det er bare like for lineære funksjoner.
      </p>
    ),
  },

  // ==========================================================================
  // 9.9 — Sykkelhjul konstant α
  // ==========================================================================
  "9.9": {
    title: "Sykkelhjul — konstant α",
    difficulty: "lett",
    pageRef: "s. 323",
    problem: (
      <div>
        <p>
          Et sykkelhjul har initial vinkelhastighet <InlineLatex latex="\omega_0 = 1{,}35\;\text{rad/s}" />.
        </p>
        <p className="mt-2">
          <strong>(a)</strong> Hvis <InlineLatex latex="\alpha = 0{,}310\;\text{rad/s}^2" /> er
          konstant, hva er <InlineLatex latex="\omega" /> ved{" "}
          <InlineLatex latex="t = 2{,}65\;\text{s}" />?{" "}
          <strong>(b)</strong> Hvor stor vinkel har hjulet rotert mellom{" "}
          <InlineLatex latex="t = 0" /> og <InlineLatex latex="t = 2{,}65\;\text{s}" />?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\omega_0 = 1{,}35\;\text{rad/s}" /></li>
        <li><InlineLatex latex="\alpha = 0{,}310\;\text{rad/s}^2" /></li>
        <li><InlineLatex latex="t = 2{,}65\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="\omega(2{,}65)" /></li>
        <li>(b) <InlineLatex latex="\Delta\theta" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Ren rotasjonskinematikk med konstant α — bruk formlene analoge til lineær kinematikk:{" "}
        <InlineLatex latex="\omega = \omega_0 + \alpha t" /> og{" "}
        <InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Dette er analogt med <InlineLatex latex="v = v_0 + at" /> og{" "} <InlineLatex latex="\Delta x = v_0 t + \tfrac{1}{2}at^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når vinkelakselerasjonen er <em>konstant</em>, gjelder de fire
          kinematikkligningene for rotasjon — helt analogt med rettlinjet bevegelse med konstant
          akselerasjon. Erstatt <InlineLatex latex="x \to \theta" />,{" "}
          <InlineLatex latex="v \to \omega" />, <InlineLatex latex="a \to \alpha" />, så ser
          du umiddelbart likhetene. Disse gjelder <strong>bare når α er konstant</strong> — hvis α
          varierer med tiden må vi integrere (som i oppg. 9.4 og 9.5).
        </p>
        <FormulaBox latex="\omega = \omega_0 + \alpha t" variant="blue" />
        <FormulaBox latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" variant="blue" />
        <FormulaBox latex="\omega^2 = \omega_0^2 + 2\alpha\Delta\theta" variant="blue" />
        <FormulaBox latex="\Delta\theta = \tfrac{1}{2}(\omega_0 + \omega)t" variant="blue" />

        <p className="font-semibold mt-4">(a) Vinkelhastighet ved t = 2,65 s</p>
        <p>
          Vi kjenner <InlineLatex latex="\omega_0" />, <InlineLatex latex="\alpha" /> og t, og
          skal finne ω. Formelen <InlineLatex latex="\omega = \omega_0 + \alpha t" /> passer
          perfekt — den kobler akkurat de fire størrelsene uten å involvere den ukjente
          Δθ. Analogien til lineær er <InlineLatex latex="v = v_0 + at" />:
        </p>
        <FormulaBox latex="\omega = \omega_0 + \alpha t" variant="blue" />
        <FormulaBox
          latex="\omega = 1{,}35 + 0{,}310 \cdot 2{,}65 = 1{,}35 + 0{,}8215 = \boxed{\,2{,}17\;\text{rad/s}\,}"
          variant="gold"
        />
        <p>
          Begge ledd er positive, så hjulet akselererer i samme retning det allerede roterer —
          vinkelhastigheten vokser, som forventet.
        </p>

        <p className="font-semibold mt-4">(b) Vinkel rotert</p>
        <p>
          Vi har <InlineLatex latex="\omega_0" />, α og t — ukjent er Δθ. Formelen{" "}
          <InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" /> inneholder
          akkurat disse fire og er direkte analog med <InlineLatex latex="\Delta x = v_0 t + \tfrac{1}{2}at^2" />:
        </p>
        <FormulaBox latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" variant="blue" />
        <FormulaBox
          latex="\Delta\theta = 1{,}35 \cdot 2{,}65 + \tfrac{1}{2}(0{,}310)(2{,}65)^2 = 3{,}578 + 1{,}088"
          variant="blue"
        />
        <FormulaBox latex="\Delta\theta = \boxed{\,4{,}67\;\text{rad}\,}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> 4,67 rad ≈ 268° — altså litt mer enn 3/4 omdreining.
          Vi kan kontrollere med <InlineLatex latex="\omega^2 = \omega_0^2 + 2\alpha\Delta\theta" />:{" "}
          <InlineLatex latex="\omega = \sqrt{1{,}35^2 + 2(0{,}310)(4{,}67)} = \sqrt{1{,}823 + 2{,}895} = 2{,}17" />{" "}
          rad/s. Stemmer med (a) — konsistens!
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Kinematikkformlene for rotasjon er identiske med rettlinjet kinematikk — bare erstatt{" "}
        <InlineLatex latex="x \to \theta" />, <InlineLatex latex="v \to \omega" />,{" "}
        <InlineLatex latex="a \to \alpha" />.
      </p>
    ),
  },

  // ==========================================================================
  // 9.14 — Sagblad
  // ==========================================================================
  "9.14": {
    title: "Sirkelsagblad — α og vinkel",
    difficulty: "lett",
    pageRef: "s. 323",
    problem: (
      <div>
        <p>
          Et sirkelsagblad med diameter <InlineLatex latex="0{,}180\;\text{m}" /> starter fra ro. På
          <InlineLatex latex="\,6{,}35\;\text{s}" /> akselererer det med konstant α til{" "}
          <InlineLatex latex="\omega = 148\;\text{rad/s}" />.
        </p>
        <p className="mt-2">Finn α og vinkelen bladet har rotert.</p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\omega_0 = 0" /> (fra ro)</li>
        <li><InlineLatex latex="\omega = 148\;\text{rad/s}" /></li>
        <li><InlineLatex latex="t = 6{,}35\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Vinkelakselerasjon <InlineLatex latex="\alpha" /></li>
        <li>Vinkel <InlineLatex latex="\Delta\theta" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Med <InlineLatex latex="\omega_0 = 0" /> er{" "}
        <InlineLatex latex="\alpha = \omega/t" /> og{" "}
        <InlineLatex latex="\Delta\theta = \tfrac{1}{2}\omega t" /> (middelverdi av ω ganger t).
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Bruk <InlineLatex latex="\omega = \omega_0 + \alpha t" /> og{" "}<InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Vi har et tilfelle med konstant vinkelakselerasjon og starthastighet
          null. Alle fire rotasjonskinematikkformlene gjelder — vi velger den som kobler de størrelsene
          vi kjenner og den vi vil finne, uten å introdusere nye ukjente. Dette er samme tankesett som
          i rettlinjet bevegelse: «lag en tabell over hva du vet og hva du vil ha, og velg formelen som
          matcher».
        </p>

        <p className="font-semibold mt-4">Finn vinkelakselerasjonen α</p>
        <p>
          <strong>Originalformel</strong> (analog med <InlineLatex latex="v = v_0 + at" />):
        </p>
        <FormulaBox latex="\omega = \omega_0 + \alpha t" variant="blue" />
        <p>
          Vi kjenner <InlineLatex latex="\omega, \omega_0, t" /> og vil finne α, så vi løser algebraisk
          for α:
        </p>
        <FormulaBox latex="\alpha = \frac{\omega - \omega_0}{t}" variant="blue" />
        <p>
          Med <InlineLatex latex="\omega_0 = 0" /> (fra ro) forenkles dette til{" "}
          <InlineLatex latex="\alpha = \omega/t" />:
        </p>
        <FormulaBox
          latex="\alpha = \frac{148 - 0}{6{,}35} = \boxed{\,23{,}3\;\text{rad/s}^2\,}"
          variant="gold"
        />

        <p className="font-semibold mt-4">Finn vinkelen Δθ</p>
        <p>
          Nå som vi kjenner α, kan vi bruke{" "}
          <InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" />. Alternativt —{" "}
          og <em>bedre</em> pedagogisk — kan vi bruke formelen som <em>unngår</em> α som mellomsteg.
          Når <InlineLatex latex="\omega_0 = 0" /> gir <InlineLatex latex="\Delta\theta = \tfrac{1}{2}(\omega_0 + \omega)t = \tfrac{1}{2}\omega t" />{" "}
          (gjennomsnittshastigheten ganger tid):
        </p>
        <FormulaBox latex="\Delta\theta = \tfrac{1}{2}(\omega_0 + \omega)t = \tfrac{1}{2}\omega t" variant="blue" />
        <FormulaBox
          latex="\Delta\theta = \tfrac{1}{2}(148)(6{,}35) = \boxed{\,470\;\text{rad}\,}"
          variant="gold"
        />
        <p>
          Eller ekvivalent med α-formelen:{" "}
          <InlineLatex latex="\Delta\theta = \tfrac{1}{2}(23{,}3)(6{,}35)^2 = 470" /> rad. Samme svar.
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> 470 rad / <InlineLatex latex="2\pi" /> ≈ 74,8
          omdreininger. Bladets kant (r = 0,090 m) har til slutt lineær fart{" "}
          <InlineLatex latex="v = r\omega = 0{,}090 \cdot 148 \approx 13{,}3" /> m/s — ca 48 km/t.
          Derfor bremser aldri et sirkelsagblad momentant: rotasjonsenergien er betydelig.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når <InlineLatex latex="\omega_0 = 0" /> er kinematikken enkel — velg formelen som ikke
        inneholder den ukjente størrelsen, og løs direkte.
      </p>
    ),
  },

  // ==========================================================================
  // 9.16 — Slipestein, to faser
  // ==========================================================================
  "9.16": {
    title: "Slipestein — to faser (akselerasjon + retardasjon)",
    difficulty: "middels",
    pageRef: "s. 323",
    problem: (
      <div>
        <p>
          Ved <InlineLatex latex="t = 0" /> har en slipestein vinkelhastighet{" "}
          <InlineLatex latex="\omega_0 = 27{,}0\;\text{rad/s}" />. Den har konstant α ={" "}
          <InlineLatex latex="31{,}0\;\text{rad/s}^2" /> inntil en sikring går ved{" "}
          <InlineLatex latex="t = 2{,}50\;\text{s}" />. Deretter roterer den 430 rad mens den
          retarderer jevnt til stillstand.
        </p>
        <p className="mt-2">
          <strong>(a)</strong> Totalvinkel fra <InlineLatex latex="t=0" /> til stillstand.{" "}
          <strong>(b)</strong> Når stopper den? <strong>(c)</strong> α i retardasjonsfasen.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Fase 1: <InlineLatex latex="\omega_0 = 27{,}0\;\text{rad/s}" />, <InlineLatex latex="\alpha_1 = 31{,}0\;\text{rad/s}^2" />, <InlineLatex latex="t_1 = 2{,}50\;\text{s}" /></li>
        <li>Fase 2: <InlineLatex latex="\Delta\theta_2 = 430\;\text{rad}" />, sluttet <InlineLatex latex="\omega = 0" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="\Delta\theta_{\text{tot}}" /></li>
        <li>(b) Total tid <InlineLatex latex="t_{\text{tot}}" /></li>
        <li>(c) <InlineLatex latex="\alpha_2" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Del opp i to faser. Fase 1: akselerasjon. Fase 2: retardasjon med kjent startshastighet og
        vinkel (430 rad). Bruk forskjellige kinematikkformler per fase.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Finn først <InlineLatex latex="\omega_1" /> (ω ved t = 2,50 s) og <InlineLatex latex="\Delta\theta_1" /> (vinkel i fase 1).</p>,
      },
      {
        label: "Hint 2",
        content: <p className="text-sm">I fase 2 er <InlineLatex latex="\omega_1" /> kjent og slutthastighet 0. Bruk <InlineLatex latex="\omega^2 = \omega_1^2 + 2\alpha_2\Delta\theta_2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> En bevegelse med <em>to faser</em> med ulik konstant α må
          behandles som to separate problemer. Vi kan IKKE bruke én formel over hele tidsintervallet,
          fordi α er ikke konstant — den skifter verdi ved t = 2,50 s. Strategien er:
          (1) løs fase 1 med de kjente verdiene fra t = 0, (2) bruk sluttilstanden i fase 1 som
          starttilstand for fase 2. Fortegn er viktig: <InlineLatex latex="\alpha_2" /> blir negativ
          fordi retningen er motsatt av ω.
        </p>

        <p className="font-semibold mt-4">Fase 1 (0 → 2,50 s): akselerasjon</p>
        <p>
          <strong>Originalformler</strong> (analogt med lineær kinematikk):
        </p>
        <FormulaBox latex="\omega_1 = \omega_0 + \alpha_1 t_1" variant="blue" />
        <FormulaBox latex="\Delta\theta_1 = \omega_0 t_1 + \tfrac{1}{2}\alpha_1 t_1^2" variant="blue" />
        <p>Slutthastighet etter fase 1:</p>
        <FormulaBox latex="\omega_1 = 27{,}0 + 31{,}0 \cdot 2{,}50 = 27{,}0 + 77{,}5 = 104{,}5\;\text{rad/s}" variant="blue" />
        <p>Vinkel rotert i fase 1:</p>
        <FormulaBox
          latex="\Delta\theta_1 = 27{,}0 \cdot 2{,}50 + \tfrac{1}{2}(31{,}0)(2{,}50)^2 = 67{,}5 + 96{,}88 = 164{,}4\;\text{rad}"
          variant="blue"
        />

        <p className="font-semibold mt-4">(a) Totalvinkel fra start til stillstand</p>
        <p>Fase 1 ga 164,4 rad, fase 2 ga 430 rad (gitt). Summér:</p>
        <FormulaBox
          latex="\Delta\theta_{\text{tot}} = \Delta\theta_1 + \Delta\theta_2 = 164{,}4 + 430 = \boxed{\,594\;\text{rad}\,}"
          variant="gold"
        />

        <p className="font-semibold mt-4">(c) Retardasjonen α₂</p>
        <p>
          I fase 2 kjenner vi <InlineLatex latex="\omega_1 = 104{,}5" /> (starthastighet),{" "}
          <InlineLatex latex="\omega = 0" /> (slutt — stopper), og{" "}
          <InlineLatex latex="\Delta\theta_2 = 430" /> rad. Vi kjenner IKKE tiden. Formelen{" "}
          <InlineLatex latex="\omega^2 = \omega_1^2 + 2\alpha_2\Delta\theta_2" /> passer perfekt —
          den inneholder akkurat disse fire:
        </p>
        <FormulaBox latex="\omega^2 = \omega_1^2 + 2\alpha_2\Delta\theta_2" variant="blue" />
        <p>Løs for <InlineLatex latex="\alpha_2" /> med ω = 0:</p>
        <FormulaBox latex="\alpha_2 = -\frac{\omega_1^2}{2\Delta\theta_2}" variant="blue" />
        <FormulaBox
          latex="\alpha_2 = -\frac{(104{,}5)^2}{2 \cdot 430} = -\frac{10920}{860} = \boxed{\,-12{,}7\;\text{rad/s}^2\,}"
          variant="gold"
        />
        <p>
          Negativt fortegn bekrefter at <InlineLatex latex="\alpha_2" /> peker motsatt av{" "}
          <InlineLatex latex="\omega" /> (retardasjon) — konsistent med at slipesteinen bremses.
        </p>

        <p className="font-semibold mt-4">(b) Total tid</p>
        <p>Fase 2-tid: bruk <InlineLatex latex="\omega = \omega_1 + \alpha_2 t_2" />, løs for t₂:</p>
        <FormulaBox latex="t_2 = \frac{\omega - \omega_1}{\alpha_2} = \frac{0 - 104{,}5}{-12{,}7} = 8{,}23\;\text{s}" variant="blue" />
        <p>Begge fortegn er negative, så t₂ blir positiv — det må den, siden tid ikke kan være negativ.</p>
        <FormulaBox latex="t_{\text{tot}} = t_1 + t_2 = 2{,}50 + 8{,}23 = \boxed{\,10{,}7\;\text{s}\,}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Retardasjonsfasen er mye lengre enn akselerasjonsfasen
          (8,23 s vs 2,50 s), fordi |α₂| ≈ 12,7 er mindre enn α₁ = 31,0 — slipesteinen mister fart
          saktere enn den ble satt opp i fart.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Todelt bevegelse: analyser én fase om gangen. Slutthastigheten i fase 1 blir{" "}
        startshastigheten i fase 2. Klassisk eksamensoppgave.
      </p>
    ),
  },

  // ==========================================================================
  // 9.20 — Compact Disc
  // ==========================================================================
  "9.20": {
    title: "CD-plate — varierende ω for konstant v",
    difficulty: "middels",
    pageRef: "s. 323",
    problem: (
      <div>
        <p>
          En CD har indre radius <InlineLatex latex="r_1 = 25{,}0\;\text{mm}" /> og ytre radius{" "}
          <InlineLatex latex="r_2 = 58{,}0\;\text{mm}" /> for musikksporet. Sporet leses med konstant
          lineær fart <InlineLatex latex="v = 1{,}25\;\text{m/s}" />.
        </p>
        <p className="mt-2">
          <strong>(a)</strong> Vinkelfart innerst og ytterst?{" "}
          <strong>(b)</strong> Sporlengde for 74,0 min avspilling.{" "}
          <strong>(c)</strong> Gjennomsnittlig α.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="r_1 = 0{,}0250\;\text{m},\;r_2 = 0{,}0580\;\text{m}" /></li>
        <li><InlineLatex latex="v = 1{,}25\;\text{m/s}" /></li>
        <li><InlineLatex latex="T = 74{,}0\;\text{min} = 4440\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\omega_1, \omega_2" /></li>
        <li>Sporlengde L</li>
        <li>Gjennomsnittlig α</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Relasjonen <InlineLatex latex="v = r\omega" /> gir at ω synker når r øker (siden v er
        konstant). Sporlengden er <InlineLatex latex="L = vT" />. Gjennomsnittlig{" "}
        <InlineLatex latex="\alpha = \Delta\omega/\Delta t" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Siden <InlineLatex latex="v" /> er konstant, blir <InlineLatex latex="\omega" /> mindre når radien r øker.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Koblingen mellom lineær og rotasjonsbevegelse kommer fra buelengde-
          formelen <InlineLatex latex="s = r\theta" />. Deriverer vi med hensyn på tiden (med r
          konstant for et fast punkt på legemet) får vi <InlineLatex latex="v = r\omega" />.
          Dette er en av de mest brukte broene mellom lineær og rotasjon. På en CD leser laseren med{" "}
          <em>konstant lineær fart</em> — og siden r varierer langs sporet (fra 25 mm innerst til 58 mm
          ytterst), må ω synke når r øker for å holde v konstant. Dette er motsatt av en platespiller,
          som har konstant ω.
        </p>

        <p className="font-semibold mt-4">(a) Vinkelfart innerst og ytterst</p>
        <p>
          <strong>Originalformel</strong> (tangentiell fart på en sirkelbane):
        </p>
        <FormulaBox latex="v = r\omega" variant="blue" />
        <p>Vi kjenner v og r, vil ha ω. Løs for ω:</p>
        <FormulaBox latex="\omega = \frac{v}{r}" variant="blue" />
        <FormulaBox
          latex="\omega_1 = \frac{v}{r_1} = \frac{1{,}25}{0{,}0250} = \boxed{\,50{,}0\;\text{rad/s}\,}"
          variant="gold"
        />
        <FormulaBox
          latex="\omega_2 = \frac{v}{r_2} = \frac{1{,}25}{0{,}0580} = \boxed{\,21{,}6\;\text{rad/s}\,}"
          variant="gold"
        />
        <p>
          Enhetssjekk: <InlineLatex latex="\text{m/s} / \text{m} = 1/\text{s} = \text{rad/s}" />{" "}
          (radianer er dimensjonsløse). CDen snurrer altså mer enn dobbelt så fort i starten
          (innerst) som på slutten (ytterst) — motsatt av hva mange tror.
        </p>

        <p className="font-semibold mt-4">(b) Total sporlengde</p>
        <p>
          Med konstant lineærfart og total tid T er sporlengden rett og slett{" "}
          <InlineLatex latex="L = vT" /> — lineærfart er per definisjon meter per sekund.
          Konverter 74 min til sekunder først:
        </p>
        <FormulaBox latex="T = 74{,}0 \cdot 60 = 4440\;\text{s}" variant="blue" />
        <FormulaBox latex="L = vT = 1{,}25 \cdot 4440 = \boxed{\,5550\;\text{m} = 5{,}55\;\text{km}\,}" variant="gold" />
        <p>Over 5 km spor på en liten disk — imponerende tetthet!</p>

        <p className="font-semibold mt-4">(c) Gjennomsnittlig vinkelakselerasjon</p>
        <p>
          <strong>Originalformel</strong> (definisjon av gjennomsnittlig α):
        </p>
        <FormulaBox latex="\alpha_{\text{av}} = \frac{\Delta\omega}{\Delta t} = \frac{\omega_2 - \omega_1}{T}" variant="blue" />
        <FormulaBox
          latex="\alpha_{\text{av}} = \frac{21{,}6 - 50{,}0}{4440} = \frac{-28{,}4}{4440} = \boxed{\,-6{,}39\cdot 10^{-3}\;\text{rad/s}^2\,}"
          variant="gold"
        />
        <p>
          <strong>Fortegn og tolkning:</strong> Negativt α betyr at ω avtar — hvilket er
          korrekt, siden CDen saktner ned som funksjon av tid (laseren beveger seg utover).
          Verdien er svært liten fordi endringen skjer over en lang periode (over en time).
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        For konstant lineær lesefart må ω synke når sporet beveger seg utover. Negativ α betyr at{" "}
        ω avtar — det er ikke en "feil" at den er negativ.
      </p>
    ),
  },

  // ==========================================================================
  // 9.21 — Radial akselerasjon etter 2 omdreininger
  // ==========================================================================
  "9.21": {
    title: "Hjul — radial akselerasjon etter 2 omdreininger",
    difficulty: "middels",
    pageRef: "s. 323",
    problem: (
      <p>
        Et hjul med diameter <InlineLatex latex="20{,}0\;\text{cm}" /> starter fra ro og roterer med
        konstant <InlineLatex latex="\alpha = 3{,}50\;\text{rad/s}^2" />. Beregn radial akselerasjon
        på kanten rett etter 2. omdreining, både fra{" "}
        <strong>(a)</strong> <InlineLatex latex="a_{\text{rad}} = \omega^2 r" /> og{" "}
        <strong>(b)</strong> <InlineLatex latex="a_{\text{rad}} = v^2/r" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="r = 0{,}100\;\text{m}" /></li>
        <li><InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="\alpha = 3{,}50\;\text{rad/s}^2" /></li>
        <li><InlineLatex latex="\Delta\theta = 2 \cdot 2\pi = 4\pi\;\text{rad}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Radial akselerasjon <InlineLatex latex="a_{\text{rad}}" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Finn først <InlineLatex latex="\omega" /> etter 4π rad via{" "}
        <InlineLatex latex="\omega^2 = \omega_0^2 + 2\alpha\Delta\theta" />. Så bruk
        formelen for radial akselerasjon.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">De to formlene skal gi nøyaktig samme svar — <InlineLatex latex="v = r\omega" /> knytter dem sammen.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Radial (sentripetal) akselerasjon er den komponenten av
          akselerasjonen som peker inn mot sentrum og holder et punkt i sirkelbevegelse. For et
          punkt på kanten av et roterende hjul er den koblet både til lineær fart v (langs tangenten)
          og vinkelhastighet ω gjennom <InlineLatex latex="v = r\omega" />. Derfor kan{" "}
          <InlineLatex latex="a_{\text{rad}}" /> skrives på to ekvivalente måter:{" "}
          <InlineLatex latex="a_{\text{rad}} = v^2/r = r\omega^2" />. De må gi samme svar — velg den
          formen som bruker de størrelsene du allerede kjenner.
        </p>

        <p className="font-semibold mt-4">Steg 1 — Finn ω etter 2 omdreininger</p>
        <p>
          Siden α er konstant og vi kjenner <InlineLatex latex="\omega_0 = 0" />, α og Δθ (men ikke
          tid), passer formelen <InlineLatex latex="\omega^2 = \omega_0^2 + 2\alpha\Delta\theta" />{" "}
          perfekt — den inneholder akkurat disse fire. Ingen grunn til å regne ut tid først.
        </p>
        <FormulaBox latex="\omega^2 = \omega_0^2 + 2\alpha\Delta\theta" variant="blue" />
        <p>Konverter 2 omdreininger til radianer: <InlineLatex latex="\Delta\theta = 2 \cdot 2\pi = 4\pi" /> rad.</p>
        <FormulaBox latex="\omega^2 = 0 + 2(3{,}50)(4\pi) = 28\pi = 87{,}96\;(\text{rad/s})^2" variant="blue" />
        <FormulaBox latex="\omega = \sqrt{87{,}96} = 9{,}38\;\text{rad/s}" variant="blue" />

        <p className="font-semibold mt-4">(a) Med <InlineLatex latex="a_{\text{rad}} = \omega^2 r" /></p>
        <p>
          <strong>Originalformel</strong> — direkte fra definisjonen av sentripetal akselerasjon når
          ω er kjent:
        </p>
        <FormulaBox latex="a_{\text{rad}} = \omega^2 r" variant="blue" />
        <p>Vi bruker denne fordi vi allerede har <InlineLatex latex="\omega^2" /> uten å ta kvadratrot:</p>
        <FormulaBox
          latex="a_{\text{rad}} = 87{,}96 \cdot 0{,}100 = \boxed{\,8{,}80\;\text{m/s}^2\,}"
          variant="gold"
        />

        <p className="font-semibold mt-4">(b) Med <InlineLatex latex="a_{\text{rad}} = v^2/r" /></p>
        <p>Finn først v fra <InlineLatex latex="v = r\omega" />:</p>
        <FormulaBox latex="v = r\omega = 0{,}100 \cdot 9{,}38 = 0{,}938\;\text{m/s}" variant="blue" />
        <p>Deretter <InlineLatex latex="a_{\text{rad}}" />:</p>
        <FormulaBox latex="a_{\text{rad}} = \frac{v^2}{r}" variant="blue" />
        <FormulaBox
          latex="a_{\text{rad}} = \frac{(0{,}938)^2}{0{,}100} = \frac{0{,}880}{0{,}100} = \boxed{\,8{,}80\;\text{m/s}^2\,}"
          variant="gold"
        />

        <p>
          <strong>Hvorfor samme svar?</strong> Formlene er identiske algebraisk:{" "}
          <InlineLatex latex="v^2/r = (r\omega)^2/r = r\omega^2" />. De uttrykker samme fysikk ulikt.
          Dette er en nyttig sjekk: hvis de to metodene gir ulike svar, er det en feil et sted.
          Enhetssjekk: <InlineLatex latex="(\text{rad/s})^2 \cdot \text{m} = \text{m/s}^2" /> —
          stemmer.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <InlineLatex latex="a_{\text{rad}} = \omega^2 r = v^2/r" /> — to uttrykk for samme ting. Bruk
        formen som passer best med det du vet.
      </p>
    ),
  },

  // ==========================================================================
  // 9.23 — Sirkelsag fart på kant
  // ==========================================================================
  "9.23": {
    title: "Sirkelsag — lineær fart på kanten",
    difficulty: "lett",
    pageRef: "s. 323",
    problem: (
      <p>
        Bladet på en elektrisk sag roterer med <InlineLatex latex="2600\;\text{rpm}" />. Estimer
        diameteren til en typisk sag brukt i husbygging (f.eks. 18 cm). Hva er lineærfarten på kanten
        i m/s?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="n = 2600\;\text{rpm}" /></li>
        <li>Diameter <InlineLatex latex="D \approx 0{,}18\;\text{m}" />, så <InlineLatex latex="r \approx 0{,}09\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Lineær fart <InlineLatex latex="v" /> på kanten</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Konverter rpm til rad/s, og bruk <InlineLatex latex="v = r\omega" />.
      </p>
    ),
    hints: [{ label: "Hint 1", content: <p className="text-sm"><InlineLatex latex="\omega = n \cdot 2\pi/60" />.</p> }],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> For et punkt på kanten av et roterende legeme er lineær fart
          (tangentiell fart) gitt ved <InlineLatex latex="v = r\omega" />. Denne formelen kommer
          direkte fra buelengdeformelen <InlineLatex latex="s = r\theta" /> — derivert med hensyn
          på tiden (med konstant r) gir <InlineLatex latex="ds/dt = r\, d\theta/dt" />, altså{" "}
          <InlineLatex latex="v = r\omega" />. Husk: <InlineLatex latex="\omega" /> må være i rad/s,
          ikke rpm — ellers får vi feil enhet.
        </p>

        <p className="font-semibold mt-4">Steg 1 — Konverter rpm til rad/s</p>
        <p>
          <strong>Originalformel</strong> for konvertering:
        </p>
        <FormulaBox latex="\omega = n \cdot \frac{2\pi}{60}" variant="blue" />
        <p>
          Grunnlaget: 1 omdreining = <InlineLatex latex="2\pi" /> rad og 1 min = 60 s, så faktoren
          er <InlineLatex latex="2\pi/60" />.
        </p>
        <FormulaBox latex="\omega = 2600 \cdot \frac{2\pi}{60} = 2600 \cdot 0{,}1047 = 272{,}3\;\text{rad/s}" variant="blue" />

        <p className="font-semibold mt-4">Steg 2 — Finn lineærfart på kanten</p>
        <p>
          <strong>Originalformel</strong> (kobling lineær ↔ rotasjon):
        </p>
        <FormulaBox latex="v = r\omega" variant="blue" />
        <p>
          Vi bruker denne direkte — ingen algebraisk omforming nødvendig. Radien er halve
          diameteren: <InlineLatex latex="r = D/2 = 0{,}18/2 = 0{,}09" /> m.
        </p>
        <FormulaBox
          latex="v = 0{,}09 \cdot 272{,}3 = \boxed{\,24{,}5\;\text{m/s}\,}"
          variant="gold"
        />
        <p>
          Enhetssjekk: <InlineLatex latex="\text{m} \cdot \text{rad/s} = \text{m/s}" /> (radianer
          er dimensjonsløse). Omregnet: 24,5 m/s · 3,6 ≈ 88 km/t — nesten motorveifart på kanten!
          Derfor er sirkelsager så farlige: masseløse tenner treffer treverket med enorm lineærfart.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <InlineLatex latex="v = r\omega" /> gir lineær fart på kanten. Høye rpm gir store linjefarter selv for små hjul.
      </p>
    ),
  },

  // ==========================================================================
  // 9.25 — Sentrifuge
  // ==========================================================================
  "9.25": {
    title: "Sentrifuge — 2600 g ved 4330 rpm",
    difficulty: "middels",
    pageRef: "s. 323",
    problem: (
      <p>
        En reklame hevder at en sentrifuge opptar bare <InlineLatex latex="0{,}127\;\text{m}" />{" "}
        benkeplass og kan produsere <InlineLatex latex="a_{\text{rad}} = 2600g" /> for en
        2600 g-prøve ved <InlineLatex latex="4330\;\text{rpm}" />. Finn radien. Er påstanden
        realistisk?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="a_{\text{rad}} = 2600g = 2600 \cdot 9{,}81 = 25\,506\;\text{m/s}^2" /></li>
        <li><InlineLatex latex="n = 4330\;\text{rpm}" /></li>
        <li>Benkeplass <InlineLatex latex="0{,}127\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Radien <InlineLatex latex="r" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk <InlineLatex latex="a_{\text{rad}} = \omega^2 r" />. Løs for r.
      </p>
    ),
    hints: [{ label: "Hint 1", content: <p className="text-sm">Konverter 4330 rpm til rad/s først.</p> }],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Sentripetal akselerasjon i en sirkelbevegelse er kraften som
          «trekker» et legeme inn mot sentrum. Formelen{" "}
          <InlineLatex latex="a_{\text{rad}} = \omega^2 r = v^2/r" /> viser at akselerasjonen øker
          lineært med r for gitt ω — men i en sentrifuge ønsker man <em>stor</em> akselerasjon ved
          <em>liten</em> radius, derfor må ω være svært høy. Uttrykket «2600 g» er en praktisk måte
          å angi akselerasjon i enheter av tyngdeakselerasjon: <InlineLatex latex="a = N \cdot g" />.
        </p>

        <p className="font-semibold mt-4">Steg 1 — Gjør om 2600 g til m/s²</p>
        <FormulaBox
          latex="a_{\text{rad}} = 2600 g = 2600 \cdot 9{,}81 = 25\,506\;\text{m/s}^2"
          variant="blue"
        />
        <p>
          Altså ca 25 000 m/s² — 2600 ganger tyngdeakselerasjonen. Umulig å oppnå uten en
          sentrifuge.
        </p>

        <p className="font-semibold mt-4">Steg 2 — Konverter rpm til rad/s</p>
        <FormulaBox latex="\omega = n \cdot \frac{2\pi}{60}" variant="blue" />
        <FormulaBox latex="\omega = 4330 \cdot \frac{2\pi}{60} = 453{,}4\;\text{rad/s}" variant="blue" />

        <p className="font-semibold mt-4">Steg 3 — Finn radien</p>
        <p>
          <strong>Originalformel</strong> for sentripetal akselerasjon:
        </p>
        <FormulaBox latex="a_{\text{rad}} = \omega^2 r" variant="blue" />
        <p>Vi kjenner <InlineLatex latex="a_{\text{rad}}" /> og ω, vil finne r. Løs algebraisk:</p>
        <FormulaBox latex="r = \frac{a_{\text{rad}}}{\omega^2}" variant="blue" />
        <FormulaBox
          latex="r = \frac{25\,506}{(453{,}4)^2} = \frac{25\,506}{205\,571} = \boxed{\,0{,}124\;\text{m}\,}"
          variant="gold"
        />
        <p>
          Enhetssjekk: <InlineLatex latex="\frac{\text{m/s}^2}{(\text{rad/s})^2} = \text{m}" />{" "}
          (radianer er dimensjonsløse) — stemmer.
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Radien er 12,4 cm, altså diameter ≈ 24,8 cm. Selve
          sentrifugen er dermed noe bredere (pga motor og kapping) men 12,7 cm benkeplass henviser
          trolig til radien eller en noe konservativ margin. Påstanden er{" "}
          <strong>realistisk</strong>: selv i et kompakt apparat kan man oppnå tusener av g ved
          svært høye rpm. Dette er prinsippet bak ultrasentrifuger i biokjemien.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når du ser <InlineLatex latex="a_{\text{rad}} = Ng" /> er det akselerasjonen i enheter av g. Konverter
        først til m/s², så bruk <InlineLatex latex="a_{\text{rad}} = \omega^2 r" />.
      </p>
    ),
  },

  // ==========================================================================
  // 9.30 — Fire kuler i et kvadrat
  // ==========================================================================
  "9.30": {
    title: "Fire kuler — I om tre forskjellige akser",
    difficulty: "middels",
    pageRef: "s. 324",
    problem: (
      <div className="space-y-2">
        <p>
          Fire små kuler, hver <InlineLatex latex="m = 0{,}200\;\text{kg}" />, i hjørnene av et
          kvadrat med side <InlineLatex latex="a = 0{,}400\;\text{m}" />, koblet med masseløse
          staver. Finn I om aksen{" "}
          <strong>(a)</strong> gjennom O vinkelrett på planet,{" "}
          <strong>(b)</strong> langs linjen AB som deler to motstående sider,{" "}
          <strong>(c)</strong> gjennom de to diagonalt motstående kulene (oppe venstre + nede høyre)
          gjennom O.
        </p>
        <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <line x1="40" y1="110" x2="240" y2="110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="30" y="115" fontSize="12" fill="#f59e0b">A</text>
          <text x="245" y="115" fontSize="12" fill="#f59e0b">B</text>
          <rect x="70" y="40" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="70" cy="40" r="10" fill="#3b82f6" />
          <circle cx="210" cy="40" r="10" fill="#3b82f6" />
          <circle cx="70" cy="180" r="10" fill="#3b82f6" />
          <circle cx="210" cy="180" r="10" fill="#3b82f6" />
          <circle cx="140" cy="110" r="3" fill="currentColor" />
          <text x="145" y="125" fontSize="10" fill="currentColor">O</text>
          <text x="140" y="30" fontSize="10" textAnchor="middle" fill="currentColor">0,400 m</text>
          <text x="240" y="110" fontSize="10" fill="currentColor"> </text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 0{,}200\;\text{kg}" /> per kule (4 kuler)</li>
        <li><InlineLatex latex="a = 0{,}400\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p className="text-sm">I om tre forskjellige akser</p>,
    strategy: (
      <p className="text-sm">
        <InlineLatex latex="I = \sum m_i r_i^2" />. Nøkkelen er å finne avstanden{" "}
        <InlineLatex latex="r_i" /> fra hver kule til aksen. Avstand fra sentrum til hjørne:{" "}
        <InlineLatex latex="a\sqrt{2}/2 = a/\sqrt{2}" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">(a) Alle fire er i samme avstand fra aksen. (b) To kuler er på aksen → de bidrar ikke. (c) To kuler ligger på aksen.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Treghetsmomentet I er et mål på hvor motstandsdyktig et legeme er
          mot vinkelakselerasjon — rotasjonsanalogen til massen m i <InlineLatex latex="F = ma" />.
          For et system av diskrete masser er{" "}
          <InlineLatex latex="I = \sum_i m_i r_i^2" />, der <InlineLatex latex="r_i" /> er{" "}
          <em>vinkelrett</em> avstand fra masse <InlineLatex latex="m_i" /> til rotasjonsaksen.
          Viktige observasjoner: (1) I avhenger sterkt av aksen — samme objekt kan ha vidt forskjellig
          I om ulike akser; (2) masser <em>på</em> aksen bidrar ikke (r = 0); (3) faktoren{" "}
          <InlineLatex latex="r^2" /> gjør at massene langt unna dominerer.
        </p>
        <FormulaBox latex="I = \sum_i m_i r_i^2" variant="blue" />

        <p className="font-semibold mt-4">(a) Akse gjennom O, vinkelrett på planet</p>
        <p>
          Aksen går gjennom midtpunktet i kvadratet og står vinkelrett på planet. Alle fire kuler
          er da i samme avstand fra aksen — diagonalen fra sentrum til hjørne. Bruk Pythagoras på
          halvparten av diagonalen:
        </p>
        <FormulaBox latex="r = \sqrt{(a/2)^2 + (a/2)^2} = \frac{a}{\sqrt{2}}" variant="blue" />
        <p>Med a = 0,400 m: <InlineLatex latex="r = 0{,}400/\sqrt{2} = 0{,}283" /> m. Sett inn i I-formelen:</p>
        <FormulaBox latex="I_a = \sum_i m_i r_i^2 = 4 m \left(\frac{a}{\sqrt{2}}\right)^2 = 4m \cdot \frac{a^2}{2} = 2 m a^2" variant="blue" />
        <FormulaBox
          latex="I_a = 2(0{,}200)(0{,}400)^2 = 2 \cdot 0{,}200 \cdot 0{,}160 = \boxed{\,0{,}0640\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />

        <p className="font-semibold mt-4">(b) Akse AB (gjennom midtpunktene av to motstående sider)</p>
        <p>
          Aksen går horisontalt gjennom sentrum. Hver kule er i avstand a/2 = 0,200 m fra aksen
          (halvparten av siden). Alle fire bidrar likt:
        </p>
        <FormulaBox latex="I_b = 4 m (a/2)^2 = m a^2" variant="blue" />
        <FormulaBox
          latex="I_b = (0{,}200)(0{,}400)^2 \cdot \frac{4}{4} = 4 \cdot 0{,}200 \cdot 0{,}0400 = \boxed{\,0{,}0320\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />

        <p className="font-semibold mt-4">(c) Akse gjennom to diagonalt motstående kuler</p>
        <p>
          Aksen går fra en kule til den diagonalt motsatte. To kuler ligger <em>på</em> aksen
          (r = 0 og bidrar ikke). De to andre kulene ligger vinkelrett på aksen i avstand lik
          halve diagonalen, altså <InlineLatex latex="r = a/\sqrt{2}" />:
        </p>
        <FormulaBox latex="I_c = 2 m \left(\frac{a}{\sqrt{2}}\right)^2 + 2 m (0)^2 = m a^2" variant="blue" />
        <FormulaBox
          latex="I_c = 2(0{,}200) \cdot \frac{(0{,}400)^2}{2} = 2 \cdot 0{,}200 \cdot 0{,}0800 = \boxed{\,0{,}0320\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />

        <p>
          <strong>Fysisk tolkning:</strong> <InlineLatex latex="I_a = 2 I_b = 2 I_c" /> — dobbelt
          så stort om vinkelrett-akse som om de to andre aksene. Grunnen: om vinkelrett-aksen er
          <em>alle</em> fire kuler like langt unna, mens om de andre aksene ligger halvparten
          nærme (eller på) aksen. Analog: en ballerina som trekker armene inn reduserer I; strekker
          hun dem ut øker I. Samme mengde masse, ulik I — avhenger av plasseringen.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <InlineLatex latex="I" /> avhenger av både massene og hvor de er plassert <em>i forhold til aksen</em>.
        Kuler som ligger på aksen bidrar ingenting. Samme objekt har ulikt I om ulike akser.
      </p>
    ),
  },

  // ==========================================================================
  // 9.31 — Table 9.2 objects
  // ==========================================================================
  "9.31": {
    title: "Treghetsmomenter fra tabell — stav, kule, sylinder",
    difficulty: "middels",
    pageRef: "s. 324",
    problem: (
      <div>
        <p>Beregn I for følgende uniforme objekter om de angitte aksene:</p>
        <p className="mt-2">
          <strong>(a)</strong> Tynn stav, <InlineLatex latex="m=2{,}80\;\text{kg}" />,{" "}
          <InlineLatex latex="L=60{,}0\;\text{cm}" />, om akse (i) gjennom én ende, (ii) gjennom sentrum,
          (iii) langs staven.
        </p>
        <p>
          <strong>(b)</strong> Kule, <InlineLatex latex="m=5{,}00\;\text{kg}" />, diameter 20 cm, om akse gjennom sentrum: (i) massiv, (ii) tynnvegget hul.
        </p>
        <p>
          <strong>(c)</strong> Sylinder, <InlineLatex latex="m=8{,}50\;\text{kg}" />,{" "}
          <InlineLatex latex="L=27{,}0\;\text{cm}" />, diameter 12 cm, om sentralaksen: (i) tynnvegget hul, (ii) massiv.
        </p>
      </div>
    ),
    knowns: <p className="text-sm">Se oppgaven over (samt Table 9.2 i læreboken).</p>,
    unknowns: <p className="text-sm">Treghetsmomentet I i kg·m² i hvert tilfelle.</p>,
    strategy: (
      <p className="text-sm">
        Bruk tabellformlene. Stav: <InlineLatex latex="I = \tfrac{1}{12}mL^2" /> (gjennom sentrum),{" "}
        <InlineLatex latex="\tfrac{1}{3}mL^2" /> (gjennom ende). Massiv kule:{" "}
        <InlineLatex latex="\tfrac{2}{5}mR^2" />. Tynn kuleskall: <InlineLatex latex="\tfrac{2}{3}mR^2" />.
        Massiv sylinder: <InlineLatex latex="\tfrac{1}{2}mR^2" />. Tynn sylinderskall:{" "}
        <InlineLatex latex="mR^2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Staven roterer om en akse langs seg selv? Da er <InlineLatex latex="r = 0" /> for alle masseelementer → <InlineLatex latex="I \approx 0" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> For kontinuerlige legemer er{" "}
          <InlineLatex latex="I = \int r^2\,dm" />, som kan være vanskelig å integrere for
          vilkårlige former. Derfor har læreboken en tabell (Table 9.2) med ferdige resultater for
          standardformer. Nøkkelen er å gjenkjenne formen og{" "}
          <em>hvilken akse</em> formelen gjelder om — en og samme form har ulik I om ulike akser.
          Felles form: <InlineLatex latex="I = c \cdot M R^2" /> (eller <InlineLatex latex="ML^2" />),
          der c er en geometrisk faktor som sier hvor langt ute massen er fordelt.
        </p>

        <p className="font-semibold mt-4">(a) Tynn stav — L = 0,600 m, M = 2,80 kg</p>
        <p>
          (i) Om akse gjennom <strong>én ende</strong>, vinkelrett på staven. Formel fra tabell:
        </p>
        <FormulaBox latex="I = \tfrac{1}{3}ML^2" variant="blue" />
        <p>
          Denne er større enn gjennom-midten-formelen fordi massen i gjennomsnitt er lengre unna
          aksen. Sett inn:
        </p>
        <FormulaBox
          latex="I = \tfrac{1}{3}(2{,}80)(0{,}600)^2 = \tfrac{1}{3}(2{,}80)(0{,}360) = \boxed{\,0{,}336\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
        <p>(ii) Om akse gjennom <strong>sentrum</strong>, vinkelrett på staven:</p>
        <FormulaBox latex="I = \tfrac{1}{12}ML^2" variant="blue" />
        <FormulaBox
          latex="I = \tfrac{1}{12}(2{,}80)(0{,}600)^2 = \tfrac{1}{12}(2{,}80)(0{,}360) = \boxed{\,0{,}0840\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
        <p>
          Legg merke til: <InlineLatex latex="I_{\text{ende}} = 4 I_{\text{sentrum}}" />. Dette
          stemmer med parallellakseteoremet:{" "}
          <InlineLatex latex="I_{\text{ende}} = I_{\text{sentrum}} + M(L/2)^2 = \tfrac{1}{12}ML^2 + \tfrac{1}{4}ML^2 = \tfrac{1}{3}ML^2" />.
        </p>
        <p>(iii) Om aksen <strong>langs staven</strong>: alle masseelementer ligger nær aksen (r ≈ 0 for en tynn stav):</p>
        <FormulaBox latex="I \approx \boxed{\,0\;\;(\text{tynn stav om egen lengdeakse})\,}" variant="gold" />

        <p className="font-semibold mt-4">(b) Kule — R = 0,100 m, M = 5,00 kg</p>
        <p>(i) Massiv kule om akse gjennom sentrum:</p>
        <FormulaBox latex="I = \tfrac{2}{5}MR^2" variant="blue" />
        <FormulaBox
          latex="I = \tfrac{2}{5}(5{,}00)(0{,}100)^2 = 0{,}400 \cdot 0{,}0100 \cdot 5 = \boxed{\,0{,}0200\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
        <p>(ii) Tynn hul kuleskall (all masse på radius R):</p>
        <FormulaBox latex="I = \tfrac{2}{3}MR^2" variant="blue" />
        <FormulaBox
          latex="I = \tfrac{2}{3}(5{,}00)(0{,}100)^2 = \boxed{\,0{,}0333\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
        <p>
          Hul skall &gt; massiv kule (2/3 &gt; 2/5) fordi all massen ligger lengst mulig ute fra
          aksen, mens i den massive kulen er mye av massen lengre inn.
        </p>

        <p className="font-semibold mt-4">(c) Sylinder — R = 0,060 m, M = 8,50 kg</p>
        <p>(i) Tynn hul sylinder (ring) om sentralaksen — all masse på radius R:</p>
        <FormulaBox latex="I = MR^2" variant="blue" />
        <FormulaBox
          latex="I = 8{,}50 \cdot (0{,}060)^2 = 8{,}50 \cdot 0{,}00360 = \boxed{\,0{,}0306\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
        <p>(ii) Massiv sylinder om sentralaksen:</p>
        <FormulaBox latex="I = \tfrac{1}{2}MR^2" variant="blue" />
        <FormulaBox
          latex="I = \tfrac{1}{2}(8{,}50)(0{,}060)^2 = \boxed{\,0{,}0153\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
        <p>
          <strong>Mønster:</strong> Alle formler har formen{" "}
          <InlineLatex latex="I = c \cdot MR^2" />. Faktoren c stiger med hvor mye masse som er
          plassert langt ute: punktmasse/ring (c = 1) &gt; kuleskall (2/3) &gt; sylinder (1/2) &gt;
          massiv kule (2/5). Husk c-verdiene — de er kritiske for eksamen.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Alle standardformlene har formen <InlineLatex latex="I = (\text{tallfaktor}) \cdot M R^2" /> (eller{" "}
        <InlineLatex latex="ML^2" />). Tallfaktoren forteller hvor massen er fordelt: mer ute på kanten → større faktor.
      </p>
    ),
  },

  // ==========================================================================
  // 9.33 — Stav med baller (kulevekter)
  // ==========================================================================
  "9.33": {
    title: "Stav med kuler i endene — I om ulike akser",
    difficulty: "middels",
    pageRef: "s. 324",
    problem: (
      <div>
        <p>
          En stav med <InlineLatex latex="L=2{,}00\;\text{m}" />, <InlineLatex latex="M=4{,}00\;\text{kg}" />, med to{" "}
          kuler (<InlineLatex latex="m_b=0{,}300\;\text{kg}" /> hver) limt til endene. Finn I om akse:
        </p>
        <p className="mt-2">
          <strong>(a)</strong> vinkelrett på staven gjennom sentrum,{" "}
          <strong>(b)</strong> vinkelrett på staven gjennom én av kulene,{" "}
          <strong>(c)</strong> parallell med staven gjennom begge kulene,{" "}
          <strong>(d)</strong> parallell med staven og 0,500 m fra den.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Stav: <InlineLatex latex="M=4{,}00\;\text{kg}" />, <InlineLatex latex="L=2{,}00\;\text{m}" /></li>
        <li>Kuler: <InlineLatex latex="m_b = 0{,}300\;\text{kg}" /> hver, i endene</li>
      </ul>
    ),
    unknowns: <p className="text-sm">I om fire akser (a-d)</p>,
    strategy: (
      <p className="text-sm">
        Treghetsmomenter er additive: <InlineLatex latex="I_{\text{tot}} = I_{\text{stav}} + I_{\text{kuler}}" />.
        Bruk standardformler for stav og punktmasse, og parallellakseteorem der det trengs.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Kulene er punktmasser: <InlineLatex latex="I_{\text{punkt}} = m r^2" /> der <InlineLatex latex="r" /> er avstand til aksen.</p>,
      },
      {
        label: "Hint 2",
        content: <p className="text-sm">I (b): Bruk parallellakseteoremet for staven: <InlineLatex latex="I = \tfrac{1}{12}ML^2 + M(L/2)^2 = \tfrac{1}{3}ML^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Akse gjennom sentrum, vinkelrett på staven</strong></p>
        <FormulaBox latex="I_{\text{stav}} = \tfrac{1}{12}ML^2 = \tfrac{1}{12}(4{,}00)(2{,}00)^2 = 1{,}333\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I_{\text{kuler}} = 2 m_b (L/2)^2 = 2(0{,}300)(1)^2 = 0{,}600\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I_a = 1{,}333 + 0{,}600 = \boxed{\,1{,}93\;\text{kg}\cdot\text{m}^2\,}" variant="gold" />

        <p><strong>(b) Akse gjennom én kule (vinkelrett)</strong></p>
        <FormulaBox latex="I_{\text{stav}} = \tfrac{1}{3}ML^2 = \tfrac{1}{3}(4{,}00)(2{,}00)^2 = 5{,}333\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I_{\text{andre kule}} = m_b L^2 = 0{,}300(2{,}00)^2 = 1{,}200\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I_b = 5{,}333 + 0 + 1{,}200 = \boxed{\,6{,}53\;\text{kg}\cdot\text{m}^2\,}" variant="gold" />

        <p><strong>(c) Akse langs staven gjennom begge kulene</strong></p>
        <p className="text-sm">For tynn stav og punktmasser langs aksen er <InlineLatex latex="r = 0" />.</p>
        <FormulaBox latex="I_c = \boxed{\,0\,}" variant="gold" />

        <p><strong>(d) Akse parallell med staven, 0,500 m unna</strong></p>
        <p className="text-sm">Alle masseelementer er nå i avstand 0,500 m fra aksen:</p>
        <FormulaBox
          latex="I_d = (M + 2m_b)(0{,}500)^2 = (4{,}00 + 0{,}600)(0{,}250) = \boxed{\,1{,}15\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Sammensatte legemer: bruk <InlineLatex latex="I_{\text{tot}} = \sum I_i" /> om samme akse. Kuler i
        endene øker I betydelig ved rotasjon om sentrum.
      </p>
    ),
  },

  // ==========================================================================
  // 9.35 — Vognhjul
  // ==========================================================================
  "9.35": {
    title: "Vognhjul — felg + 8 eiker",
    difficulty: "middels",
    pageRef: "s. 324",
    problem: (
      <div className="space-y-2">
        <p>
          Et vognhjul med felg-radius <InlineLatex latex="R = 0{,}300\;\text{m}" />, felgmasse{" "}
          <InlineLatex latex="m_f = 1{,}48\;\text{kg}" />, og 8 eiker (hver 0,300 m lang, masse 0,300 kg
          per eike). Finn I om aksen gjennom sentrum, vinkelrett på hjulet.
        </p>
        <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto block">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#92400e" strokeWidth="6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 100 + 80 * Math.cos(rad);
            const y2 = 100 + 80 * Math.sin(rad);
            return <line key={angle} x1="100" y1="100" x2={x2} y2={y2} stroke="#92400e" strokeWidth="2" />;
          })}
          <circle cx="100" cy="100" r="6" fill="#92400e" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Felg: <InlineLatex latex="m_f = 1{,}48\;\text{kg}" />, <InlineLatex latex="R = 0{,}300\;\text{m}" /></li>
        <li>Eike: <InlineLatex latex="m_e = 0{,}300\;\text{kg}" />, <InlineLatex latex="L = 0{,}300\;\text{m}" />, 8 stk</li>
      </ul>
    ),
    unknowns: <p className="text-sm">Totalt I om hjulets sentrum</p>,
    strategy: (
      <p className="text-sm">
        Felgen er som en ring: <InlineLatex latex="I_f = m_f R^2" />. Hver eike er en stav gjennom
        endepunktet: <InlineLatex latex="I_e = \tfrac{1}{3}m_e L^2" />. Summér.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Summér bidrag: ett felgbidrag + 8 eikebidrag.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I_f = m_f R^2 = 1{,}48 \cdot (0{,}300)^2 = 0{,}1332\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I_e = \tfrac{1}{3}m_e L^2 = \tfrac{1}{3}(0{,}300)(0{,}300)^2 = 0{,}00900\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox
          latex="I = I_f + 8 I_e = 0{,}1332 + 8 \cdot 0{,}00900 = \boxed{\,0{,}205\;\text{kg}\cdot\text{m}^2\,}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Sammensatte legemer: dekomponér i standardkomponenter, finn I for hver om samme akse, og summer.
      </p>
    ),
  },

  // ==========================================================================
  // 9.45 — Flywheel max energy
  // ==========================================================================
  "9.45": {
    title: "Energilagring i svinghjul",
    difficulty: "middels",
    pageRef: "s. 324",
    problem: (
      <p>
        Energi skal lagres i et svinghjul (massiv skive) med <InlineLatex latex="m = 70{,}0\;\text{kg}" />,{" "}
        <InlineLatex latex="R = 1{,}20\;\text{m}" />. For å unngå brudd må{" "}
        <InlineLatex latex="a_{\text{rad,maks}} = 3500\;\text{m/s}^2" /> på kanten. Hva er maksimal
        lagret kinetisk energi?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 70{,}0\;\text{kg}" />, <InlineLatex latex="R = 1{,}20\;\text{m}" /></li>
        <li><InlineLatex latex="a_{\text{rad,maks}} = 3500\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p className="text-sm">Maksimal <InlineLatex latex="K_{\text{rot}}" /></p>,
    strategy: (
      <p className="text-sm">
        Fra <InlineLatex latex="a_{\text{rad}} = \omega^2 R" /> finner du ω. Bruk{" "}
        <InlineLatex latex="K = \tfrac{1}{2}I\omega^2" /> med{" "}
        <InlineLatex latex="I = \tfrac{1}{2}mR^2" /> for massiv skive.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm"><InlineLatex latex="\omega^2 = a_{\text{rad}}/R" />. Sett det direkte inn i K.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\omega^2 = \frac{a_{\text{rad}}}{R} = \frac{3500}{1{,}20} = 2917\;(\text{rad/s})^2" variant="blue" />
        <FormulaBox latex="I = \tfrac{1}{2}mR^2 = \tfrac{1}{2}(70{,}0)(1{,}20)^2 = 50{,}4\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox
          latex="K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(50{,}4)(2917) = \boxed{\,7{,}35\cdot 10^4\;\text{J}\,}"
          variant="gold"
        />
        <p className="text-sm">Alternativt: <InlineLatex latex="K = \tfrac{1}{4}m\,a_{\text{rad}} R = \tfrac{1}{4}mv^2" /> der <InlineLatex latex="v = \sqrt{a_{\text{rad}} R}" />.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Svinghjul lagrer mye energi ved høy ω. Konstruksjonens styrke setter grensen:{" "}
        <InlineLatex latex="\omega_{\text{maks}}^2 = a_{\text{rad,maks}}/R" />.
      </p>
    ),
  },

  // ==========================================================================
  // 9.48 — Pulley/bøtte ratio
  // ==========================================================================
  "9.48": {
    title: "Trinse og bøtte — I for lik energifordeling",
    difficulty: "middels",
    pageRef: "s. 325",
    problem: (
      <p>
        En bøtte (masse <InlineLatex latex="m" />) henger i et tau rundt en jevn trinse (radius{" "}
        <InlineLatex latex="R" />) på en friksjonsløs aksel. Hvilken I må trinsen ha for at den alltid
        skal ha halvparten så stor <InlineLatex latex="K" /> som bøtta?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Bøtte med masse <InlineLatex latex="m" />, fart <InlineLatex latex="v" /></li>
        <li>Trinse med radius <InlineLatex latex="R" /> og ukjent I</li>
        <li>Krav: <InlineLatex latex="K_{\text{trinse}} = \tfrac{1}{2}K_{\text{bøtte}}" /></li>
      </ul>
    ),
    unknowns: <p className="text-sm"><InlineLatex latex="I" /> uttrykt ved <InlineLatex latex="m, R" /></p>,
    strategy: (
      <p className="text-sm">
        Tauets fart = bøttens fart = <InlineLatex latex="v = R\omega" />. Sett opp{" "}
        <InlineLatex latex="K_{\text{trinse}} = \tfrac{1}{2}K_{\text{bøtte}}" /> og løs for I.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm"><InlineLatex latex="K_{\text{trinse}} = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}I(v/R)^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="K_{\text{bøtte}} = \tfrac{1}{2}mv^2" variant="blue" />
        <FormulaBox latex="K_{\text{trinse}} = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}I\frac{v^2}{R^2}" variant="blue" />
        <FormulaBox latex="\tfrac{1}{2}I\frac{v^2}{R^2} = \tfrac{1}{2}\cdot\tfrac{1}{2}mv^2" variant="blue" />
        <FormulaBox latex="I = \boxed{\,\tfrac{1}{2}mR^2\,}" variant="gold" />
        <p className="text-sm">
          Interessant: det er nøyaktig I for en <em>massiv skive</em>. Så det <em>naturlige</em>{" "}
          valget av trinse (massiv disk) gir halvparten så mye energi i trinsen som i bøtta.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Koblingen <InlineLatex latex="v = R\omega" /> lar oss uttrykke <InlineLatex latex="K_{\text{rot}}" />{" "}
        med <InlineLatex latex="v" /> i stedet for ω.
      </p>
    ),
  },

  // ==========================================================================
  // 9.51 — Parallell-akseteoremet
  // ==========================================================================
  "9.51": {
    title: "Balsatrekule vs. blyskall — parallellakseteorem",
    difficulty: "middels",
    pageRef: "s. 325",
    problem: (
      <p>
        Om hvilken akse vil en uniform balsakule ha samme I som en tynnvegget, hul blykule med samme
        masse og radius (der blyens akse går gjennom diameteren)?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Blyskall om diameter: <InlineLatex latex="I_{\text{Pb}} = \tfrac{2}{3}mR^2" /></li>
        <li>Massiv balsakule om diameter: <InlineLatex latex="I_{\text{cm}} = \tfrac{2}{5}mR^2" /></li>
      </ul>
    ),
    unknowns: <p className="text-sm">Avstand <InlineLatex latex="d" /> for akse parallell med diameter i balsakulen.</p>,
    strategy: (
      <p className="text-sm">
        Bruk parallellakseteoremet på balsakulen: <InlineLatex latex="I = I_{\text{cm}} + md^2" />.
        Sett lik <InlineLatex latex="\tfrac{2}{3}mR^2" /> og løs for d.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm"><InlineLatex latex="\tfrac{2}{5}mR^2 + md^2 = \tfrac{2}{3}mR^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\tfrac{2}{5}mR^2 + md^2 = \tfrac{2}{3}mR^2" variant="blue" />
        <FormulaBox latex="d^2 = R^2\left(\tfrac{2}{3} - \tfrac{2}{5}\right) = R^2 \cdot \tfrac{4}{15}" variant="blue" />
        <FormulaBox latex="d = R\sqrt{\tfrac{4}{15}} = \boxed{\,0{,}516\,R\,}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Parallellakseteoremet: <InlineLatex latex="I_P = I_{\text{cm}} + Md^2" />. Gjelder bare når{" "}
        <InlineLatex latex="I_{\text{cm}}" /> er I om <em>parallell akse gjennom CM</em> — ikke
        vilkårlig startakse.
      </p>
    ),
  },

  // ==========================================================================
  // 9.64 — Mars vs. Earth
  // ==========================================================================
  "9.64": {
    title: "Fallende masse roterer trommel — Mars vs. Jorden",
    difficulty: "middels",
    pageRef: "s. 326",
    problem: (
      <div>
        <p>
          Et system: masse <InlineLatex latex="m = 15{,}0\;\text{kg}" /> faller, tau rundt en jevn
          tromme gir roterende K. Friksjonsfri aksel. Alle fra ro.
        </p>
        <p className="mt-2">
          På jorden (<InlineLatex latex="g_J = 9{,}81\;\text{m/s}^2" />): m faller 6,00 m og gir tromma
          300 J kinetisk energi.
        </p>
        <p className="mt-2">
          <strong>(a)</strong> På Mars (<InlineLatex latex="g_M = 3{,}71\;\text{m/s}^2" />): hvor langt må
          m falle for å gi samme 300 J?{" "}
          <strong>(b)</strong> Hvor fort går m akkurat idet tromma har fått 300 J på Mars?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 15{,}0\;\text{kg}" /></li>
        <li>Jorden: <InlineLatex latex="h_J = 6{,}00\;\text{m}" />, <InlineLatex latex="K_{\text{trommel,J}} = 300\;\text{J}" /></li>
        <li>Konstant forhold <InlineLatex latex="K_{\text{trommel}}/K_{\text{totalt}}" /> siden trinsegeometri er den samme</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Fallhøyde <InlineLatex latex="h_M" /> på Mars</li>
        <li>(b) Fart <InlineLatex latex="v_M" /> på Mars når tromma har 300 J</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Energibevaring: <InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + K_{\text{trommel}}" />. Forholdet{" "}
        <InlineLatex latex="K_{\text{trommel}}/\tfrac{1}{2}mv^2" /> bestemmes av geometri (I/(mR²)) og er det
        samme på Mars. Finn den på jorden først.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">På jorden: finn <InlineLatex latex="\tfrac{1}{2}mv_J^2 = mg_J h_J - 300" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p className="text-sm">Siden forholdet mellom trinsens og bøttens K er geometrisk, er det likt på Mars.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Fra jordeksperimentet: finn forholdet</strong></p>
        <FormulaBox
          latex="mg_J h_J = \tfrac{1}{2}mv_J^2 + 300 \;\Rightarrow\; \tfrac{1}{2}mv_J^2 = 15(9{,}81)(6) - 300 = 882{,}9 - 300 = 582{,}9\;\text{J}"
          variant="blue"
        />
        <FormulaBox latex="\frac{K_{\text{trommel}}}{K_{\text{bøtte}}} = \frac{300}{582{,}9} = 0{,}5147" variant="blue" />

        <p><strong>(a) Mars — samme forhold</strong></p>
        <p className="text-sm">
          Siden <InlineLatex latex="K_{\text{trommel}} = 300\;\text{J}" />, er{" "}
          <InlineLatex latex="K_{\text{bøtte}} = 300/0{,}5147 = 582{,}9\;\text{J}" />. Totalt:{" "}
          <InlineLatex latex="K_{\text{tot}} = 882{,}9\;\text{J}" />.
        </p>
        <FormulaBox
          latex="h_M = \frac{K_{\text{tot}}}{mg_M} = \frac{882{,}9}{15{,}0 \cdot 3{,}71} = \boxed{\,15{,}9\;\text{m}\,}"
          variant="gold"
        />

        <p><strong>(b) Farten på Mars</strong></p>
        <FormulaBox
          latex="v_M = \sqrt{\frac{2 K_{\text{bøtte}}}{m}} = \sqrt{\frac{2 \cdot 582{,}9}{15{,}0}} = \boxed{\,8{,}82\;\text{m/s}\,}"
          variant="gold"
        />
        <p className="text-sm">Samme som på jorden — fordi K samme, m samme → v samme. Bare høyden endres med g.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Geometriske forhold (som I vs. mR²) er gravitasjonsuavhengige. Derfor er farten til bøtta den
        samme når trommelen har lik K — men høyden nødvendig avhenger av g.
      </p>
    ),
  },

  // ==========================================================================
  // 9.77 — Atwood med trinse
  // ==========================================================================
  "9.77": {
    title: "Energimetode: blokk A over bord, blokk B faller, trinse med I",
    difficulty: "vanskelig",
    pageRef: "s. 326",
    problem: (
      <p>
        Trinse med radius <InlineLatex latex="R" /> og treghetsmoment <InlineLatex latex="I" />,
        friksjonsløs aksel. Tauet glir ikke. Blokk A (<InlineLatex latex="m_A" />) på bord med
        kinetisk friksjonskoeffisient <InlineLatex latex="\mu_k" />. Blokk B (<InlineLatex latex="m_B" />) henger
        og faller. Bruk energimetoden til å finne farten til B som funksjon av avstand d.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m_A, m_B, R, I, \mu_k" /></li>
        <li>B faller avstand <InlineLatex latex="d" /> (A flyttes også d horisontalt)</li>
        <li>Tauet glir ikke: <InlineLatex latex="v = R\omega" /></li>
      </ul>
    ),
    unknowns: <p className="text-sm">Farten <InlineLatex latex="v" /> som funksjon av d</p>,
    strategy: (
      <p className="text-sm">
        Energiregnskap: arbeid av tyngde på B − arbeid av friksjon på A = total K (trinse + A + B).
        Bruk <InlineLatex latex="v_A = v_B = v" /> (tauet ikke-tøybart) og{" "}
        <InlineLatex latex="\omega = v/R" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Friksjonsarbeidet: <InlineLatex latex="W_f = -\mu_k m_A g d" /> (negativt).</p>,
      },
      {
        label: "Hint 2",
        content: <p className="text-sm">Total K: <InlineLatex latex="\tfrac{1}{2}(m_A + m_B)v^2 + \tfrac{1}{2}I(v/R)^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Energibevaring (inkludert friksjonstap)</strong></p>
        <FormulaBox
          latex="m_B g d - \mu_k m_A g d = \tfrac{1}{2}m_A v^2 + \tfrac{1}{2}m_B v^2 + \tfrac{1}{2}I\frac{v^2}{R^2}"
          variant="blue"
        />
        <FormulaBox
          latex="g d(m_B - \mu_k m_A) = \tfrac{1}{2}v^2\!\left(m_A + m_B + \frac{I}{R^2}\right)"
          variant="blue"
        />
        <FormulaBox
          latex="v = \boxed{\,\sqrt{\dfrac{2 g d(m_B - \mu_k m_A)}{m_A + m_B + I/R^2}}\,}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Energimetoden gir direkte v(d) uten å finne akselerasjonen først. Trinsens I bidrar som{" "}
        "ekstra effektiv masse" <InlineLatex latex="I/R^2" /> i nevneren.
      </p>
    ),
  },

  // ==========================================================================
  // 9.78 — Fallblokk og kjent I
  // ==========================================================================
  "9.78": {
    title: "Energibevaring med trinse — fart rett før støt",
    difficulty: "middels",
    pageRef: "s. 327",
    problem: (
      <p>
        Trinse med <InlineLatex latex="R = 0{,}160\;\text{m}" /> og{" "}
        <InlineLatex latex="I = 0{,}380\;\text{kg}\cdot\text{m}^2" />. Tauet glir ikke. En blokk på{" "}
        <InlineLatex latex="m_1 = 4{,}00\;\text{kg}" /> henger på ene siden og en annen på{" "}
        <InlineLatex latex="m_2 = 2{,}00\;\text{kg}" /> henger på andre siden. Blokken på 4,00 kg
        starter 5,00 m over gulvet. Finn farten rett før den treffer.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="R = 0{,}160\;\text{m}" />, <InlineLatex latex="I = 0{,}380\;\text{kg}\cdot\text{m}^2" /></li>
        <li><InlineLatex latex="m_1 = 4{,}00\;\text{kg}" /> faller <InlineLatex latex="h = 5{,}00\;\text{m}" /></li>
        <li><InlineLatex latex="m_2 = 2{,}00\;\text{kg}" /> stiger samme høyde</li>
      </ul>
    ),
    unknowns: <p className="text-sm">Farten <InlineLatex latex="v" /> til blokkene rett før støt</p>,
    strategy: (
      <p className="text-sm">
        Energibevaring: <InlineLatex latex="\Delta U_{\text{tot}} = \Delta K_{\text{tot}}" />. Netto
        tap av potensiell energi er <InlineLatex latex="(m_1 - m_2)gh" />. Kinetisk energi er{" "}
        <InlineLatex latex="\tfrac{1}{2}(m_1+m_2)v^2 + \tfrac{1}{2}I(v/R)^2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">Begge blokkene har samme fart v (fordi tauet ikke glir og lengden er konstant).</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox
          latex="(m_1 - m_2)gh = \tfrac{1}{2}(m_1 + m_2)v^2 + \tfrac{1}{2}I\frac{v^2}{R^2}"
          variant="blue"
        />
        <FormulaBox latex="(4-2)(9{,}81)(5) = 98{,}1\;\text{J}" variant="blue" />
        <FormulaBox
          latex="v^2 = \frac{2(m_1 - m_2)gh}{m_1 + m_2 + I/R^2}"
          variant="blue"
        />
        <FormulaBox
          latex="I/R^2 = 0{,}380/(0{,}160)^2 = 14{,}84\;\text{kg}"
          variant="blue"
        />
        <FormulaBox
          latex="v^2 = \frac{2 \cdot 98{,}1}{4 + 2 + 14{,}84} = \frac{196{,}2}{20{,}84} = 9{,}41"
          variant="blue"
        />
        <FormulaBox latex="v = \boxed{\,3{,}07\;\text{m/s}\,}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Atwood-maskin med ekte trinse: trinsen "lagrer" kinetisk energi, så farten blir lavere enn om
        trinsen var masseløs.
      </p>
    ),
  },

  // ==========================================================================
  // 9.79 — To sveisede skiver
  // ==========================================================================
  "9.79": {
    title: "To sveisede skiver — I og energi",
    difficulty: "vanskelig",
    pageRef: "s. 327",
    problem: (
      <div>
        <p>
          To metallplater er sveiset sammen og montert på felles friksjonsløs aksel:{" "}
          <InlineLatex latex="R_1 = 2{,}55\;\text{cm},\;M_1 = 0{,}85\;\text{kg}" /> og{" "}
          <InlineLatex latex="R_2 = 5{,}02\;\text{cm},\;M_2 = 1{,}58\;\text{kg}" />.
        </p>
        <p className="mt-2">
          <strong>(a)</strong> Totalt <InlineLatex latex="I" />.{" "}
          <strong>(b)</strong> En 1,50 kg blokk henger i et tau rundt den lille skiven, faller 2,03 m.
          Farten rett før gulvet?{" "}
          <strong>(c)</strong> Samme, men tau rundt den store. Hvilken case gir størst v? Forklar.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Små skive: <InlineLatex latex="R_1 = 0{,}0255\;\text{m},\;M_1 = 0{,}85\;\text{kg}" /></li>
        <li>Stor skive: <InlineLatex latex="R_2 = 0{,}0502\;\text{m},\;M_2 = 1{,}58\;\text{kg}" /></li>
        <li>Blokk: <InlineLatex latex="m = 1{,}50\;\text{kg}" />, <InlineLatex latex="h = 2{,}03\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p className="text-sm">(a) I, (b) v₁ (liten), (c) v₂ (stor)</p>,
    strategy: (
      <p className="text-sm">
        Massive skiver: <InlineLatex latex="I = \tfrac{1}{2}MR^2" />. Energibevaring:{" "}
        <InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" /> der{" "}
        <InlineLatex latex="v = R\omega" /> avhenger av hvilken skive tauet er på.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p className="text-sm">ω er samme for begge skivene (de er sveiset sammen), men v på tauet = R·ω der R avhenger av hvilken skive.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Totalt I</strong></p>
        <FormulaBox latex="I_1 = \tfrac{1}{2}M_1 R_1^2 = \tfrac{1}{2}(0{,}85)(0{,}0255)^2 = 2{,}76\cdot 10^{-4}\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I_2 = \tfrac{1}{2}M_2 R_2^2 = \tfrac{1}{2}(1{,}58)(0{,}0502)^2 = 1{,}991\cdot 10^{-3}\;\text{kg}\cdot\text{m}^2" variant="blue" />
        <FormulaBox latex="I = I_1 + I_2 = \boxed{\,2{,}27\cdot 10^{-3}\;\text{kg}\cdot\text{m}^2\,}" variant="gold" />

        <p><strong>(b) Tau på liten skive (R = R₁)</strong></p>
        <FormulaBox
          latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\frac{v^2}{R_1^2}"
          variant="blue"
        />
        <FormulaBox
          latex="v^2 = \frac{2 m g h}{m + I/R_1^2} = \frac{2(1{,}50)(9{,}81)(2{,}03)}{1{,}50 + 2{,}27\cdot 10^{-3}/(0{,}0255)^2}"
          variant="blue"
        />
        <FormulaBox
          latex="v^2 = \frac{59{,}73}{1{,}50 + 3{,}49} = 11{,}97 \Rightarrow \boxed{\,v_1 = 3{,}46\;\text{m/s}\,}"
          variant="gold"
        />

        <p><strong>(c) Tau på stor skive (R = R₂)</strong></p>
        <FormulaBox
          latex="v^2 = \frac{2 m g h}{m + I/R_2^2} = \frac{59{,}73}{1{,}50 + 0{,}901} = 24{,}88"
          variant="blue"
        />
        <FormulaBox latex="\boxed{\,v_2 = 4{,}99\;\text{m/s}\,}" variant="gold" />

        <p className="text-sm">
          <strong>Konklusjon:</strong> Når tauet er på den store skiven, blir v større — fordi samme
          falldistanse h gir mindre vinkelbevegelse (ω = v/R₂ er mindre enn v/R₁), så mindre energi
          går til rotasjon, og mer til blokkens translasjon.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når du har sveisede skiver: I summeres, men <em>hvilken radius</em> tauet er på bestemmer
        forholdet mellom v og ω.
      </p>
    ),
  },
};
