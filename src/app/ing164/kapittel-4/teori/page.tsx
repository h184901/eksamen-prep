"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { KraftDekomponering, TyngdeKalkulator, FrittLegemeDiagram } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Teorisammendrag — Newtons lover</h2>

      {/* 4.1 Kraft og vekselvirkning */}
      <TheorySummary
        title="4.1 Kraft og vekselvirkning"
        mustKnow={[
          "Kraft er en vektorstørrelse — har både verdi (N) og retning",
          "Kontaktkrefter virker ved kontakt, fjernkrefter virker over avstand",
          "Krefter dekomponeres i x-, y- og z-komponenter",
          "Summen av alle krefter: ΣF = F₁ + F₂ + ... + Fₙ (vektorsum)",
        ]}
      >
        <p>
          Krefter kan være <strong>tiltrekkende</strong> eller <strong>frastøtende</strong> (trekke/skyve).
          Siden krefter har både verdi og retning, er de <strong>vektorer</strong> og adderes som vektorer.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">To typer krefter</p>
          <p><strong>Kontaktkrefter:</strong> Virker ved direkte kontakt mellom legemer (normalkraft, friksjon, snordrag).</p>
          <p className="mt-1"><strong>Fjernkrefter:</strong> Virker over avstand uten kontakt (tyngdekraft, elektrisk kraft, magnetisk kraft).</p>
        </div>

        <p>
          Måleenheten for kraft er <strong>Newton</strong> (N). Krefter dekomponerer vi ofte i x-, y-
          og z-komponenter:
        </p>
        <FormulaBox
          latex="\vec{F} = F_x\,\hat{x} + F_y\,\hat{y}, \quad F_x = F\cos\theta, \quad F_y = F\sin\theta"
          title="Kraftdekomponering"
          variant="gold"
          description="θ er vinkelen mellom kraftvektoren og x-aksen."
        />

        {/* Visualisering innebygd i teorien */}
        <KraftDekomponering />
      </TheorySummary>

      {/* 4.2 Newtons første lov */}
      <TheorySummary
        title="4.2 Newtons første lov (treghetsloven)"
        mustKnow={[
          "ΣF = 0 ⟹ legemet har konstant fart (inkludert v = 0)",
          "Treghet: et legemes motstand mot å endre bevegelsestilstand",
          "Gjelder i inertialreferanserammer (ikke-akselererende)",
          "Ingen kraft trengs for å opprettholde konstant fart!",
        ]}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Newtons 1. lov</p>
          <p>
            Når kraftsummen på et legeme er null, vil legemet bevege seg med
            rettlinjet konstant fart (ingen akselerasjon). Farten kan også være null.
          </p>
        </div>

        <p>
          Denne egenskapen kalles <strong>treghet</strong> — et legemes manglende evne til å endre fart
          uten at det virker en netto kraft på det.
        </p>

        <p className="mt-3">
          <strong>Eksempel:</strong> En hockeypuck på friksjonsløs is. Ligger den i ro, forblir den i ro
          (<InlineLatex latex="N = G" />, ingen netto kraft). Beveger den seg med konstant fart{" "}
          <InlineLatex latex="v" />, fortsetter den med samme fart i samme retning.
        </p>

        <p className="mt-3">
          <strong>Eksempel:</strong> Du kjører rettlinjet med konstant fart 100 km/h på motorveien.
          Hvor stor er kraftsummen på bilen? Svar: <InlineLatex latex="\sum\vec{F} = 0" />.
          Og på sjåføren? Også <InlineLatex latex="\sum\vec{F} = 0" />.
          Motorkraften balanserer friksjon og luftmotstand eksakt.
        </p>

        <FormulaBox
          latex="\sum \vec{F} = 0 \;\Longleftrightarrow\; \vec{v} = \text{konstant}"
          title="Newtons 1. lov"
          variant="gold"
        />
      </TheorySummary>

      {/* 4.3 Newtons andre lov */}
      <TheorySummary
        title="4.3 Newtons andre lov"
        mustKnow={[
          "ΣF = ma — kraftsummen er proporsjonal med akselerasjonen",
          "1 N = 1 kg · m/s² (kraften som gir 1 kg en akselerasjon på 1 m/s²)",
          "På komponentform: ΣFx = max, ΣFy = may, ΣFz = maz",
          "Gjelder bare når massen er konstant",
        ]}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Newtons 2. lov</p>
          <p>
            Når kraftsummen på et legeme er <em>ikke</em> null, vil legemet akselerere.
            Kraftsummen er proporsjonal med akselerasjonen.
          </p>
        </div>

        <FormulaBox
          latex="\sum \vec{F} = m\vec{a}"
          title="Newtons 2. lov"
          variant="gold"
          description="Den viktigste likningen i mekanikk! m er legemets masse (konstant)."
        />

        <p className="mt-3">
          Masse er et mål for hvor mye stoff et legeme inneholder. Måles i <strong>kg</strong>.
        </p>

        <p className="mt-3">
          <strong>På komponentform</strong> (dette er slik vi løser oppgaver!):
        </p>
        <FormulaBox
          latex="\sum F_x = ma_x, \qquad \sum F_y = ma_y, \qquad \sum F_z = ma_z"
          title="Komponentform"
          variant="gold"
          description="Vi setter opp én likning for hver retning. Dette er nøkkelen til å løse alle Newton-oppgaver."
        />

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Viktig begrensning</p>
          <p className="text-sm">
            <InlineLatex latex="\sum\vec{F} = m\vec{a}" /> gjelder bare når massen er <strong>konstant</strong>.
            Moteksempler: vannvåpe, rakett (massen endres fordi masse forlater systemet).
          </p>
        </div>
      </TheorySummary>

      {/* 4.4 Masse og tyngde */}
      <TheorySummary
        title="4.4 Masse og tyngde"
        mustKnow={[
          "Masse (m, kg) er en egenskap — lik overalt i universet",
          "Tyngde (G, N) er gravitasjonskraften — avhenger av hvor du er",
          "G = mg, der g = 9,81 m/s² ved havoverflaten",
          "Tyngde varierer med sted (breddegrad, høyde), masse gjør det ikke",
        ]}
      >
        <p>
          <strong>Masse</strong> er en egenskap som forteller noe om et legemes treghet. Måles i kg.
        </p>
        <p className="mt-2">
          <strong>Tyngde</strong> er tyngdekraften som virker på et legeme. Måles i N.
          Den virker på alle legemer med masse, uansett om de er i ro eller i bevegelse.
        </p>

        <FormulaBox
          latex="G = mg"
          title="Tyngdekraft"
          variant="gold"
          description="G er tyngdekraften (N), m er massen (kg), g er tyngdeakselerasjonen (m/s²)."
        />

        <p className="mt-3">
          Ved havoverflaten: <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" />.
          Varierer noe med breddegrad. <InlineLatex latex="g" /> blir mindre når vi beveger oss oppover
          i atmosfæren. På månen er <InlineLatex latex="g = 1{,}6\;\text{m/s}^2" />.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Masse vs. tyngde — Nøkkelforskjell</p>
          <p className="text-sm">
            Tyngden til et legeme varierer fra sted til sted.
            Massen til et legeme er den <strong>samme alle steder</strong>.
          </p>
          <p className="text-sm mt-1">
            Eksempel: &ldquo;Alle&rdquo; kan på månen løfte en person på 100 kg.
            Men det å <em>viste</em> (akselerere) personen er like slitsomt på månen som på jorda — treghet avhenger av masse, ikke tyngde!
          </p>
        </div>

        {/* Visualisering innebygd i teorien */}
        <TyngdeKalkulator />
      </TheorySummary>

      {/* 4.5 Newtons tredje lov */}
      <TheorySummary
        title="4.5 Newtons tredje lov (kraft–motkraft)"
        mustKnow={[
          "F_AB = −F_BA — kraft og motkraft er like store og motsatt rettet",
          "Kraft og motkraft virker på ULIKE legemer (aldri på samme!)",
          "Kraft og motkraft er alltid av samme type (gravitasjon↔gravitasjon, kontakt↔kontakt)",
          "Et legeme kan ikke utøve kraft på seg selv",
        ]}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Newtons 3. lov</p>
          <p>
            Når legeme A virker på legeme B med en kraft, vil B virke tilbake på
            legeme A med en like stor, motsatt rettet kraft. Kreftene virker på <em>hvert sitt legeme</em>.
          </p>
        </div>

        <FormulaBox
          latex="\vec{F}_{AB} = -\vec{F}_{BA}"
          title="Newtons 3. lov (kraft–motkraft-par)"
          variant="gold"
          description="F_AB = kraften fra A på B. F_BA = kraften fra B på A. De er like store, men motsatt rettet."
        />

        <p className="mt-3">
          <strong>Eksempel:</strong> Når du sparker en fotball, virker skoen med en kraft på ballen (<InlineLatex latex="\vec{F}_{AB}" />).
          Samtidig virker ballen med en like stor kraft tilbake på skoen (<InlineLatex latex="\vec{F}_{BA}" />).
        </p>

        <p className="mt-3">
          <strong>Eksempel (eple og jord):</strong> Jorda drar eplet ned med tyngdekraften (<InlineLatex latex="\vec{F}_{BA}" />).
          Eplet drar jorda opp med en like stor kraft (<InlineLatex latex="\vec{F}_{AB}" />).
          Jorda akselererer bare umerkelig fordi dens masse er enorm.
        </p>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Typisk feil: &ldquo;N = mg er N3L&rdquo;</p>
          <p className="text-sm">
            Normalkraft <InlineLatex latex="N" /> og tyngde <InlineLatex latex="G = mg" /> er IKKE et kraft-motkraft-par!
            De virker begge på <em>samme</em> legeme. Kraft-motkraft virker alltid på <em>ulike</em> legemer.
          </p>
          <p className="text-sm mt-1">
            At <InlineLatex latex="N = mg" /> på en flat overflate følger fra N1L (<InlineLatex latex="\sum F_y = 0" />), ikke N3L.
          </p>
        </div>
      </TheorySummary>

      {/* 4.6 Fritt-legeme-diagrammer */}
      <TheorySummary
        title="4.6 Fritt-legeme-diagrammer"
        mustKnow={[
          "N1L og N2L gjelder for ETT legeme om gangen",
          "Tegn legemet isolert med ALLE krefter som virker PÅ det",
          "Velg koordinatsystem, dekomponer krefter, anvend ΣF = ma",
          "Flere legemer → ett FBD per legeme, koble med N3L",
        ]}
      >
        <p>
          Newtons første og andre lov gjelder for <strong>ett legeme</strong> om gangen.
          Ved å tegne dette legemet isolert sammen med alle kreftene som virker på det,
          blir det lettere å løse oppgaven. Vi har da tegnet et <strong>fritt-legeme-diagram</strong> (FBD).
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Oppskrift for fritt-legeme-diagram</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Tegn figur av situasjonen</li>
            <li>Velg legemet du vil studere — tegn det isolert</li>
            <li>Tegn inn <strong>alle krefter</strong> som virker <em>på</em> legemet</li>
            <li>Velg koordinatsystem, dekomponer kreftene</li>
            <li>Anvend <InlineLatex latex="\sum F_x = ma_x" /> og <InlineLatex latex="\sum F_y = ma_y" /></li>
            <li>Løs likningene</li>
            <li>Vurder svaret — er det rimelig?</li>
          </ol>
        </div>

        {/* Visualisering innebygd i teorien */}
        <FrittLegemeDiagram />
      </TheorySummary>
    </div>
  );
}
