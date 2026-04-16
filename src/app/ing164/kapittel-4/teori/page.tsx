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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er kraft en vektor?</p>
          <p className="text-sm">
            Tenk på det praktisk: en kraft på 10 N oppover og en kraft på 10 N nedover er ikke det samme — de virker i
            motsatte retninger og opphever hverandre. En temperatur på 20 °C oppover og 20 °C nedover gir ingen mening
            (temperatur er en skalar — ingen retning). Retning er det som gjør en størrelse til en vektor, og krefter
            har alltid en retning.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">To typer krefter</p>
          <p><strong>Kontaktkrefter:</strong> Virker ved direkte kontakt mellom legemer (normalkraft, friksjon, snordrag).</p>
          <p className="mt-1"><strong>Fjernkrefter:</strong> Virker over avstand uten kontakt (tyngdekraft, elektrisk kraft, magnetisk kraft).</p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — Tauvogning</p>
          <p className="text-sm">
            To lag i tauvogning. Lag A drar med 500 N mot vest, lag B drar med 400 N mot øst.
            Den resulterende kraftsummen er 100 N mot vest. Nettokraften er summen av
            <em> alle</em> kreftene — og siden de peker i ulike retninger, er vektoraddisjon nødvendig.
            Hadde vi bare addert tallene (500 + 400 = 900 N) ville vi mistet all informasjon om retning.
          </p>
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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er dette ikke åpenbart?</p>
          <p className="text-sm">
            Aristoteles mente at objekter naturlig hviler — at du alltid trenger en kraft for å holde noe i bevegelse.
            Det er feil, men det <em>ser</em> slik ut i hverdagen fordi friksjon alltid er til stede.
            Newton innså at friksjon er en kraft. Fjern all friksjon, og et bevegelig legeme
            vil holde seg i bevegelse <em>for alltid</em>. Loven definerer hva det betyr at det <em>ikke</em> virker en netto kraft.
          </p>
        </div>

        <p>
          Denne egenskapen kalles <strong>treghet</strong> — et legemes manglende evne til å endre fart
          uten at det virker en netto kraft på det.
        </p>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogier — Treghet i praksis</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>Hockeypuck på is:</strong> Nesten ingen friksjon → pucken glir lenge med nesten konstant fart.
              I verdensrommet (null friksjon) ville den glid i rett linje for alltid.
            </li>
            <li>
              <strong>Duketriks:</strong> Du rykker duken kjapt bort, men tallerknene blir liggende.
              Tallerknene &laquo;ønsker ikke&raquo; å endre tilstanden sin (hviletilstand) på grunn av treghet.
              Rykket må skje raskt nok til at frisksjonen fra duken ikke rekker å akselerere tallerknene.
            </li>
            <li>
              <strong>Buss som bremser:</strong> Du lener fremover. Bussen bremser (netto kraft bakover på deg
              fra setet/sko), men kroppen din &laquo;vil&raquo; fortsette fremover.
            </li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser — N1L</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>&laquo;Hvile er den naturlige tilstanden&raquo;:</strong> Feil. Konstant fart (inkludert null fart)
              er den naturlige tilstanden. Hvile er bare et spesialtilfelle av N1L der <InlineLatex latex="v = 0" />.
            </li>
            <li>
              <strong>&laquo;Et legeme i bevegelse må ha en kraft som skyver det fremover&raquo;:</strong> Feil — dette er
              Aristoteles sin feil. Et legeme i bevegelse <em>uten</em> netto kraft fortsetter bare å bevege seg.
              Motorkraften på en bil kompenserer friksjon og luftmotstand, men den skaper ikke bevegelsen i seg selv.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kapittel 2</p>
          <p className="text-sm">
            I kapittel 2 lærte du at konstant fart betyr null akselerasjon (<InlineLatex latex="a = 0" /> når
            <InlineLatex latex=" \Delta v = 0" />). Newtons første lov er årsaken til dette:
            ingen netto kraft ⟹ ingen akselerasjon ⟹ konstant fart. N1L gir deg den fysiske begrunnelsen
            bak kinematikken fra kap. 2.
          </p>
        </div>

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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor F = ma og ikke F = mv?</p>
          <p className="text-sm">
            Kraft forårsaker <em>endring</em> i bevegelse, ikke bevegelsen i seg selv. En konstant kraft
            gir konstant akselerasjon — farten øker jevnt, ikke farten holder seg konstant.
            Hvis <InlineLatex latex="F = mv" /> hadde vært riktig, ville en stein som faller med konstant fart
            kreve en konstant kraft for å opprettholde farten — men vi vet at en konstant fart betyr null netto kraft (N1L).
            <InlineLatex latex=" F = m\Delta v / \Delta t = ma" /> er riktig fordi kraft er det som <em>endrer</em> farten.
          </p>
        </div>

        <FormulaBox
          latex="\sum \vec{F} = m\vec{a}"
          title="Newtons 2. lov"
          variant="gold"
          description="Den viktigste likningen i mekanikk! m er legemets masse (konstant)."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — Handlekurv i butikken</p>
          <p className="text-sm">
            Du skyver en tom handlekurv og en full handlekurv med samme kraft.
            Den tomme akselererer mye raskere. Samme kraft (<InlineLatex latex="F" />), ulik masse (<InlineLatex latex="m" />)
            → ulik akselerasjon (<InlineLatex latex="a = F/m" />).
            Vil du ha samme akselerasjon for begge, må du skyve den fulle mye hardere.
            Dette er intuisjonen bak <InlineLatex latex="\sum F = ma" />.
          </p>
        </div>

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

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser — N2L</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>&laquo;Akselerasjonen peker i bevegelsesretningen&raquo;:</strong> Feil. Akselerasjonen
              peker i retningen av <em>nettokraften</em>. Kaster du en ball oppover, peker akselerasjonen
              nedover (mot jorda) selv om bevegelsen er oppover.
            </li>
            <li>
              <strong>&laquo;Hvis a = 0 finnes det ingen krefter&raquo;:</strong> Feil. Det finnes ingen
              <em> netto</em> kraft. Mange krefter kan virke på legemet og fremdeles summere til null.
            </li>
            <li>
              <strong>&laquo;F = ma gjelder alltid&raquo;:</strong> Bare når massen er konstant.
              For en rakett som forbruker drivstoff gjelder en mer generell form.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips — N2L er en vektorlikning</p>
          <p className="text-sm">
            <InlineLatex latex="\sum \vec{F} = m\vec{a}" /> er én vektorlikning som egentlig er to (eller tre)
            skalare likninger — én per komponentretning.
            <strong> Skill alltid ut x- og y-retningene!</strong> En kraft på 30 N i 45° har komponentene
            <InlineLatex latex=" F_x = 30\cos 45° \approx 21{,}2\;\text{N}" /> og
            <InlineLatex latex=" F_y = 30\sin 45° \approx 21{,}2\;\text{N}" />.
            Aldri sett inn 30 N direkte i én komponentlikning.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med andre kapitler</p>
          <p className="text-sm">
            <strong>Kap. 5</strong> handler nesten utelukkende om å anvende N2L på realistiske situasjoner
            (skråplan, tau, frikisjonsoppgaver). <strong>Kap. 6</strong> integrerer N2L langs en strekning og
            gir arbeids-energi-teoremet: <InlineLatex latex="W_{\text{netto}} = \Delta E_k" />.
            Hele mekanikken er bygget på denne ene likningen.
          </p>
        </div>

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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er dette skillet viktig?</p>
          <p className="text-sm">
            Masse er det som bestemmer treghet (motstand mot akselerasjon). Tyngde er bare en kraft — en
            spesiell kraft som avhenger av gravitasjonsfeltet der du befinner deg.
            På månen er <InlineLatex latex="g \approx 1{,}6\;\text{m/s}^2" />, så en person med masse 70 kg
            veier bare <InlineLatex latex="70 \times 1{,}6 = 112\;\text{N}" /> der — men å akselerere personen
            krever like mye kraft som på jorda, fordi massen er den samme.
          </p>
        </div>

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

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — Astronaut på månen</p>
          <p className="text-sm">
            En astronaut med masse 80 kg veier på jorda <InlineLatex latex="80 \times 9{,}81 \approx 785\;\text{N}" />.
            På månen veier hen bare <InlineLatex latex="80 \times 1{,}6 = 128\;\text{N}" /> — lett å hoppe!
            Men vil astronauten kaste en baseball, krever det like mye arm-kraft som på jorda,
            fordi ballens masse (treghet) er uendret. &laquo;Vekten&raquo; du løfter endrer seg, men
            &laquo;tyngdekraften&raquo; du skyver mot er den samme.
          </p>
        </div>

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

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 21 (Elektrisitet)</p>
          <p className="text-sm">
            Gravitasjonskraften <InlineLatex latex="F_g = Gm_1m_2/r^2" /> og den elektriske
            Coulomb-kraften <InlineLatex latex="F_e = kq_1q_2/r^2" /> har <em>nøyaktig samme matematiske form</em> — begge
            faller av som <InlineLatex latex="1/r^2" />. Masse spiller samme rolle i gravitasjon som ladning
            i elektrisitet. Det er ingen tilfeldighet: begge er fundamentale egenskaper ved et objekt som
            bestemmer hvor sterkt det kopler til et felt.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse — &laquo;Vekt&raquo; i dagligtale</p>
          <p className="text-sm">
            I dagligtale sier vi &laquo;jeg veier 70 kg&raquo;. I fysikk er dette galt — 70 kg er massen din.
            Vekten (tyngden) er en kraft og måles i Newton: <InlineLatex latex="G = 70 \times 9{,}81 \approx 687\;\text{N}" />.
            I eksamensoppgaver: les oppgaven nøye. &laquo;En kloss med masse 5 kg&raquo; vs.
            &laquo;en kloss som veier 5 kg&raquo; — siste betyr at tyngden er 5 N, og massen er
            <InlineLatex latex=" 5/9{,}81 \approx 0{,}51\;\text{kg}" />.
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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er N3L ikke åpenbart?</p>
          <p className="text-sm">
            Intuitivt tenker vi: &laquo;Det er jo jeg som presser på veggen, ikke veggen på meg.&raquo;
            Men kraft oppstår alltid i par — du kan ikke ha en ensidig vekselvirkning.
            Kreftene virker på <em>ulike</em> legemer, og det er grunnen til at de ikke kansellerer.
            Normalkraften du kjenner fra gulvet er veggkraften som virker på deg — den oppstår
            fordi du presser på gulvet. Uten deg, ingen normalkraft.
          </p>
        </div>

        <FormulaBox
          latex="\vec{F}_{AB} = -\vec{F}_{BA}"
          title="Newtons 3. lov (kraft–motkraft-par)"
          variant="gold"
          description="F_AB = kraften fra A på B. F_BA = kraften fra B på A. De er like store, men motsatt rettet."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogier — N3L overalt</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>Du presser på en vegg:</strong> Veggen presser tilbake på deg med like stor kraft.
              Veggen beveger seg ikke fordi den er festet til bygget — men du vil skli bakover
              uten friksjon fra gulvet.
            </li>
            <li>
              <strong>Du står på gulvet:</strong> Du drar gulvet ned med tyngdekraften, gulvet drar deg opp
              med normalkraften. Du dytter gulvet ned med føttene (kontaktkraft), gulvet dytter
              deg opp med normalkraft. To separate N3L-par!
            </li>
            <li>
              <strong>Rakett i verdensrommet:</strong> Raketten dytter eksosen bakover, eksosen dytter
              raketten fremover (N3L). Ingen luft trengs — kraften virker mellom raketten og
              eksosen, ikke mellom raketten og luften.
            </li>
          </ul>
        </div>

        <p className="mt-3">
          <strong>Eksempel:</strong> Når du sparker en fotball, virker skoen med en kraft på ballen (<InlineLatex latex="\vec{F}_{AB}" />).
          Samtidig virker ballen med en like stor kraft tilbake på skoen (<InlineLatex latex="\vec{F}_{BA}" />).
        </p>

        <p className="mt-3">
          <strong>Eksempel (eple og jord):</strong> Jorda drar eplet ned med tyngdekraften (<InlineLatex latex="\vec{F}_{BA}" />).
          Eplet drar jorda opp med en like stor kraft (<InlineLatex latex="\vec{F}_{AB}" />).
          Jorda akselererer bare umerkelig fordi dens masse er enorm.
        </p>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips — Identifiser N3L-par</p>
          <p className="text-sm">
            Spør deg selv: <em>&laquo;Hvilke to legemer samhandler?&raquo;</em> Et N3L-par er alltid mellom
            eksakt to legemer A og B:
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Kraft: A på B → motkraft: B på A</li>
            <li>Begge er samme type kraft (begge gravitasjon, eller begge kontakt)</li>
            <li>De to kreftene virker <strong>aldri på samme legeme</strong></li>
            <li>De er alltid like store og motsatt rettet</li>
          </ul>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser — N3L</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>&laquo;Kraft og motkraft kansellerer hverandre&raquo;:</strong> NEI — de virker på
              <em> ulike</em> legemer og påvirker hvert legeme for seg. Det er bare krefter på
              <em> samme</em> legeme som kan kansellere.
            </li>
            <li>
              <strong>&laquo;Det større legemet utøver mer kraft&raquo;:</strong> Feil. Jorda og eplet
              påvirker hverandre med nøyaktig like stor kraft. Jorda akselererer bare umerkelig
              fordi massen er enorm (<InlineLatex latex="a = F/m" />).
            </li>
            <li>
              <strong>&laquo;N = mg er et N3L-par&raquo;:</strong> Feil — normalkraft og tyngde virker
              begge på <em>samme</em> legeme og er ikke et N3L-par. At <InlineLatex latex="N = mg" /> på
              flatt underlag følger fra N2L med <InlineLatex latex="\sum F_y = 0" />.
            </li>
          </ul>
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

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er FBD uunnværlig?</p>
          <p className="text-sm">
            FBD-en tvinger deg til å tenke systematisk: hvilke legemer samhandler med dette legemet?
            Hvilke krefter oppstår da? Uten FBD er det lett å glemme en kraft (f.eks. normalkraften)
            eller inkludere en kraft som ikke virker på legemet (f.eks. en kraft legemet utøver på noe annet).
            Eksperter tegner FBD-er fordi det fungerer — ikke fordi det er obligatorisk.
          </p>
        </div>

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

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips — God FBD-teknikk</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>Isoler legemet:</strong> Tegn et boksdiagram (eller en prikk) som representerer legemet.
              Alt utenfor boksen = omgivelsene. Identifiser hva som er i kontakt med boksen.
            </li>
            <li>
              <strong>Kreftene som virker på legemet:</strong> For hvert objekt i kontakt med legemet, legg til en kraft.
              Pluss alltid tyngdekraften (<InlineLatex latex="G = mg" /> nedover).
            </li>
            <li>
              <strong>Velg smart koordinatsystem:</strong> Legg gjerne én akse parallelt med akselerasjonen
              (f.eks. langs skråplanet). Det reduserer antall komponenter du må dekomponere.
            </li>
            <li>
              <strong>Merk kreftene tydelig:</strong> Skriv hva kraften er (<InlineLatex latex="N, G, f_k, T" /> etc.)
              og retningen. Feil tegning av retning er en vanlig kildefeil.
            </li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige FBD-feil</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <strong>Glemme normalkraften:</strong> Når et legeme hviler på en flate, virker alltid en
              normalkraft vinkelrett ut fra flaten. Den er ikke alltid lik <InlineLatex latex="mg" />
              (f.eks. på et skråplan eller ved akselerasjon).
            </li>
            <li>
              <strong>Tegne &laquo;ma&raquo; som en kraft:</strong> <InlineLatex latex="ma" /> er ikke en kraft —
              det er produktet av masse og akselerasjon. Det skal stå på høyre side av
              <InlineLatex latex=" \sum F = ma" />, ikke tegnes som en pil i FBD-en.
            </li>
            <li>
              <strong>Inkludere krefter legemet utøver:</strong> Tegn bare krefter som virker <em>på</em> legemet,
              ikke krefter legemet utøver på andre (de hører til i et annet FBD, for et annet legeme).
            </li>
            <li>
              <strong>Feil fortegn:</strong> Vær konsistent med koordinatsystemet. Bestem en positiv retning
              og hold deg til den gjennom hele oppgaven.
            </li>
          </ul>
        </div>

        {/* Visualisering innebygd i teorien */}
        <FrittLegemeDiagram />
      </TheorySummary>
    </div>
  );
}
