"use client";

import TheorySummary from "@/components/TheorySummary";
import InlineLatex from "@/components/InlineLatex";
import { LinearRotationalAnalogy, MomentOfInertiaVisualizer, ParallelAxisVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      <TheorySummary
        title="9.1 Vinkelhastighet og vinkelakselerasjon"
        mustKnow={[
          "Vinkelposisjon θ måles i radianer (1 omdreining = 2π rad)",
          "Gjennomsnittlig vinkelhastighet: ω_gj = Δθ/Δt",
          "Momentan vinkelhastighet: ω = dθ/dt",
          "Vinkelakselerasjon: α = dω/dt = d²θ/dt²",
          "Positiv ω: mot klokka (sett fra +z), negativ: med klokka",
        ]}
        defaultOpen
      >
        <p className="mb-3">
          Rotasjon er den andre grunnleggende bevegelsesformen i mekanikk. Mens lineær bevegelse beskrives av posisjon <InlineLatex latex="x" />, hastighet <InlineLatex latex="v" /> og akselerasjon <InlineLatex latex="a" />, beskrives rotasjon av <strong>vinkelposisjon</strong> <InlineLatex latex="\theta" />, <strong>vinkelhastighet</strong> <InlineLatex latex="\omega" /> og <strong>vinkelakselerasjon</strong> <InlineLatex latex="\alpha" />.
        </p>
        <p className="mb-3">
          <strong>Viktig:</strong> Vinkler MÅ oppgis i <strong>radianer</strong> i alle formler. Omregning: <InlineLatex latex="1 \text{ rev} = 2\pi \text{ rad} = 360°" />. Enheten <InlineLatex latex="\text{rad}" /> er dimensjonsløs, men vi skriver den for klarhet.
        </p>
        <p className="mb-4">
          Fortegnskonvensjon (høyrehåndsregelen): Krum fingrene i rotasjonsretningen — tommelen peker langs <InlineLatex latex="\omega" />-vektoren. Mot klokka (sett fra positiv akse) gir <InlineLatex latex="\omega > 0" />.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor radianer og ikke grader?</p>
          <p className="text-sm mb-2">
            Radianer er den <em>eneste</em> vinkelmålingen der relasjonene <InlineLatex latex="s = r\theta" />, <InlineLatex latex="v = r\omega" /> og <InlineLatex latex="a = r\alpha" /> gjelder direkte uten omregningsfaktorer. Dersom du brukte grader, ville alle disse formlene fått ekstra faktorer av <InlineLatex latex="\pi/180" />. Radianer er naturlig fordi de definerer vinkelen som forholdet mellom buelengde og radius — og det er et rent tall (dimensjonsløst).
          </p>
          <p className="text-sm">
            Oppsummert: radianer kobler rotasjonsbevegelse sømløst til lineær bevegelse. Det er ikke et valg — det er et krav for at formlene skal stemme.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: klokka</p>
          <p className="text-sm mb-2">
            Sekundviseren på en klokke har vinkelhastighet <InlineLatex latex="\omega = \frac{2\pi}{60} \approx 0{,}105 \text{ rad/s}" />. Alle punkter på viseren — fra midten til tuppen — har <em>nøyaktig samme</em> <InlineLatex latex="\omega" />. Men tuppen av viseren beveger seg raskere enn rotpunktet, fordi <InlineLatex latex="v = r\omega" /> øker med <InlineLatex latex="r" />.
          </p>
          <p className="text-sm">
            Et punkt 3 cm fra sentrum har linjefart <InlineLatex latex="v = 0{,}03 \cdot 0{,}105 \approx 3{,}1 \text{ mm/s}" />. Dobler du radiusen, dobler du linjefarten — mens <InlineLatex latex="\omega" /> forblir uendret for begge punkter.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>
              <strong>«rad/s er ikke dimensjonsløst»</strong> — jo, radianer er dimensjonsløse. Vi skriver «rad» kun for å minne oss på at det er en vinkel. Enhetsmessig er <InlineLatex latex="[\omega] = \text{s}^{-1}" />.
            </li>
            <li>
              <strong>«Positiv ω betyr at legemet spinner raskere»</strong> — nei! Fortegnet på <InlineLatex latex="\omega" /> angir <em>retning</em>, ikke størrelse. Positivt betyr mot klokka (konvensjon), negativt betyr med klokka. Farten er <InlineLatex latex="|\omega|" />.
            </li>
            <li>
              <strong>«θ i grader gir omtrent riktig svar»</strong> — nei, det gir alltid feil svar i formler. Konverter alltid til radianer FØR du setter inn i formler.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kapittel 2</p>
          <p className="text-sm">
            Disse størrelsene er de eksakte rotasjonsanaloge til posisjon, hastighet og akselerasjon fra rettlinjet bevegelse. Hele matematikken fra kapittel 2 gjelder på nytt, bare med nye symboler. Hvert konsept fra lineær kinematikk har en rotasjonstvilling: <InlineLatex latex="x \leftrightarrow \theta" />, <InlineLatex latex="v \leftrightarrow \omega" />, <InlineLatex latex="a \leftrightarrow \alpha" />. Lær deg denne oversettelsen, og du kan bruke all tidligere kunnskap direkte i rotasjonsproblemer.
          </p>
        </div>
      </TheorySummary>

      <TheorySummary
        title="9.2 Rotasjon med konstant vinkelakselerasjon"
        mustKnow={[
          "Kinematikkformlene er identiske med lineær bevegelse — bare bytt ut x→θ, v→ω, a→α",
          "Bruk samme problemløsningsstrategi som ved rettlinjet bevegelse",
        ]}
      >
        <p className="mb-3">
          Når <InlineLatex latex="\alpha" /> er konstant, får vi fire kinematikkligninger som er <strong>helt analoge</strong> med dem for rettlinjet bevegelse med konstant <InlineLatex latex="a" />:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg text-sm">
            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Lineær</p>
            <p><InlineLatex latex="v = v_0 + at" /></p>
            <p><InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" /></p>
            <p><InlineLatex latex="v^2 = v_0^2 + 2a(x-x_0)" /></p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg text-sm">
            <p className="font-semibold text-orange-600 dark:text-orange-400 mb-1">Rotasjon</p>
            <p><InlineLatex latex="\omega = \omega_0 + \alpha t" /></p>
            <p><InlineLatex latex="\theta = \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2" /></p>
            <p><InlineLatex latex="\omega^2 = \omega_0^2 + 2\alpha(\theta-\theta_0)" /></p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er formlene identiske?</p>
          <p className="text-sm">
            Fordi matematikken er den samme. Både <InlineLatex latex="a = \text{konst.}" /> og <InlineLatex latex="\alpha = \text{konst.}" /> fører til en andregrads differensialligning av samme form. Løsningen er alltid en andregradsfunksjon i tid. Fysikken er ulik — ett er translasjon, ett er rotasjon — men den underliggende matematiske strukturen er identisk. Dette er ikke en tilfeldighet: det er en dyp symmetri mellom de to bevegelsesformene.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: Oversettelsesguide</p>
          <p className="text-sm mb-2">
            Alltid når du støter på et rotasjonskinematikk-problem: oversett det mentalt til et lineært problem med samme tall, løs det lineært, og oversett svaret tilbake. Nøkkelbytte:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm font-mono">
            <div>x &nbsp;→&nbsp; θ</div>
            <div>v &nbsp;→&nbsp; ω</div>
            <div>a &nbsp;→&nbsp; α</div>
            <div>m &nbsp;→&nbsp; I</div>
          </div>
          <p className="text-sm mt-2">
            Denne strategien fungerer begge veier. Ser du et lineær-problem der du kan tenke på det som rotasjon, gjør det — det gir deg ofte en bedre intuitiv forståelse.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse</p>
          <p className="text-sm">
            <strong>«Jeg trenger nye formler for rotasjon»</strong> — nei! Du kan alle formlene allerede fra kapittel 2. Bytt symboler og du er ferdig. Mange studenter pugger rotasjonsformlene separat og dobler arbeidsmengden unødvendig. Forstå sammenhengen én gang — så trenger du aldri pugge dem.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kjennetegn i oppgaveteksten (rotasjonskinematikk)</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>«omdreininger per minutt / rev/min / rpm» → må konverteres til rad/s (<InlineLatex latex="\omega = 2\pi \cdot \text{rpm}/60" />)</li>
            <li>«konstant vinkelakselerasjon», «konstant bremsing», «jevn oppbremsing» → bruk de fire kinematikkligningene</li>
            <li>«fra ro», «i ro» → <InlineLatex latex="\omega_0 = 0" /></li>
            <li>«stopper», «kommer til stillstand» → <InlineLatex latex="\omega = 0" /></li>
            <li>«hvor mange omdreininger» → finn <InlineLatex latex="\Delta\theta" /> og del på <InlineLatex latex="2\pi" /></li>
          </ul>
        </div>
      </TheorySummary>

      {/* Inline visualisering: analogitabellen passer godt her */}
      <LinearRotationalAnalogy />

      <TheorySummary
        title="9.3 Sammenheng mellom lineær og vinkelstørrelser"
        mustKnow={[
          "v = rω — linjefart er avstand fra akse ganger vinkelhastighet",
          "a_tan = rα — tangentiell akselerasjon",
          "a_rad = v²/r = rω² — sentripetalakselerasjon (mot sentrum)",
        ]}
      >
        <p className="mb-3">
          Et punkt på et roterende legeme i avstand <InlineLatex latex="r" /> fra aksen har lineær fart <InlineLatex latex="v = r\omega" />. Dette knytter lineær og rotasjonsbevegelse sammen.
        </p>
        <p className="mb-3">
          Akselerasjonen har to komponenter: <InlineLatex latex="a_\text{tan} = r\alpha" /> (langs tangenten, endrer farten) og <InlineLatex latex="a_\text{rad} = r\omega^2" /> (mot sentrum, endrer retningen). Totalakselerasjonen er <InlineLatex latex="a = \sqrt{a_\text{tan}^2 + a_\text{rad}^2}" />.
        </p>
        <p className="mb-4">
          <strong>Nøkkelinnsikt:</strong> Alle punkter på et stivt legeme har <em>samme</em> <InlineLatex latex="\omega" /> og <InlineLatex latex="\alpha" />, men ulik lineær fart <InlineLatex latex="v" /> — punkter lenger fra aksen beveger seg raskere.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er v = rω?</p>
          <p className="text-sm">
            Et punkt i avstand <InlineLatex latex="r" /> fra rotasjonsaksen tilbakelegger buelengde <InlineLatex latex="s = r\theta" /> (per definisjon av radianer). Deriverer vi begge sider med hensyn til tid: <InlineLatex latex="\frac{ds}{dt} = r \cdot \frac{d\theta}{dt}" />, det vil si <InlineLatex latex="v = r\omega" />. Jo lenger fra aksen punktet er, jo raskere beveger det seg lineært — selv om alle punkter roterer med <em>samme</em> <InlineLatex latex="\omega" />. Dette er ikke en definisjon, men en konsekvens av geometrien.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: karusellen</p>
          <p className="text-sm mb-2">
            På en karusell roterer alle passasjerene med samme <InlineLatex latex="\omega" />. Men barn som sitter ytterst (stor <InlineLatex latex="r" />) beveger seg raskere enn de som sitter nærmest sentrum (liten <InlineLatex latex="r" />). Samme prinsipp gjelder vinylplater, vindmøller, og hjul: alle punkter roterer i takt, men ytterste punktene har størst lineær fart.
          </p>
          <p className="text-sm">
            Sykkelpedaler og tannhjul utnytter nettopp dette: store tannhjul gir høy linjefart på kjeden, selv med lav vinkelhastighet.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>
              <strong>«Alle punkter på et stivt legeme har samme hastighet»</strong> — NEI. De har samme <InlineLatex latex="\omega" />, men ulik linjefart <InlineLatex latex="v = r\omega" />. Hastigheten (som vektor) varierer i både størrelse og retning fra punkt til punkt.
            </li>
            <li>
              <strong>«Sentripetalakselerasjon bremser legemet»</strong> — NEI. <InlineLatex latex="a_\text{rad}" /> peker alltid mot sentrum, vinkelrett på hastigheten. Den endrer <em>retning</em>, ikke fart. Kun <InlineLatex latex="a_\text{tan}" /> endrer farten.
            </li>
            <li>
              <strong>«Hvis ω er konstant, er det ingen akselerasjon»</strong> — NEI. Selv ved konstant <InlineLatex latex="\omega" /> eksisterer sentripetalakselerasjonen <InlineLatex latex="a_\text{rad} = r\omega^2 \neq 0" />. Det er bare <InlineLatex latex="a_\text{tan} = 0" /> når <InlineLatex latex="\alpha = 0" />.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: to akselerationskomponenter</p>
          <p className="text-sm mb-2">
            Sjekk alltid om du trenger én eller begge komponenter:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Konstant <InlineLatex latex="\omega" /> (ingen vinkelakselerasjon): kun <InlineLatex latex="a_\text{rad} = r\omega^2" /> — legemet roterer jevnt, men har sentripetalakselerasjon</li>
            <li>Tiltagende/avtakende rotasjon: begge komponenter — <InlineLatex latex="a_\text{tan} = r\alpha" /> og <InlineLatex latex="a_\text{rad} = r\omega^2" /> — totalakselerasjon: <InlineLatex latex="a = \sqrt{a_\text{tan}^2 + a_\text{rad}^2}" /></li>
          </ul>
        </div>
      </TheorySummary>

      <TheorySummary
        title="9.4 Treghetsmoment og rotasjonsenergi"
        mustKnow={[
          "I = Σ m_i r_i² er rotasjonens svar på masse",
          "Kinetisk rotasjonsenergi: E_k = ½Iω²",
          "I avhenger av massefordelingen OG valg av rotasjonsakse",
          "Kjenn formlene for disk, ring, stav, kule!",
        ]}
      >
        <p className="mb-3">
          <strong>Treghetsmoment</strong> <InlineLatex latex="I" /> er rotasjonens svar på masse — det beskriver hvor vanskelig det er å endre rotasjonstilstanden. Definisjonen er <InlineLatex latex="I = \sum m_i r_i^2" />, der <InlineLatex latex="r_i" /> er avstand fra masse <InlineLatex latex="m_i" /> til rotasjonsaksen.
        </p>
        <p className="mb-3">
          <strong>Hvorfor I og ikke bare m?</strong> Masse i seg selv er ikke nok — det spiller også rolle <em>hvor</em> massen er. En ring og en disk med samme masse har forskjellig I fordi massen er fordelt ulikt relativt til aksen. Ringen har all masse i maksimal avstand, og er dermed tyngre å rotere.
        </p>
        <p className="mb-4">
          Kinetisk rotasjonsenergi: <InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I\omega^2" /> — analogt med <InlineLatex latex="E_k = \tfrac{1}{2}mv^2" />.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor I = Σmr² og ikke bare m?</p>
          <p className="text-sm mb-2">
            Masse forteller deg motstanden mot <em>lineær</em> akselerasjon: <InlineLatex latex="F = ma" />. For rotasjon er det ikke bare massen som bestemmer motstanden — det er massen <em>og</em> hvor den befinner seg i forhold til aksen. En liten masse langt fra aksen er vanskeligere å rotere enn den samme massen nær aksen. Kvadratet <InlineLatex latex="r^2" /> i <InlineLatex latex="I = \sum m_i r_i^2" /> gjenspeiler nettopp dette: dobbler du radien, firedobler du bidraget til treghetsmomentet.
          </p>
          <p className="text-sm">
            Intuisjon: treghetsmomentet er den roterende ekvivalenten til masse, og det avhenger av massefordelingen relativt til rotasjonsaksen — ikke bare den totale massen.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Utledning av <InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I\omega^2" /></p>
          <p className="text-sm mb-2">
            Tenk deg det stive legemet som <em>mange</em> små masseelementer <InlineLatex latex="m_i" />, hver i avstand <InlineLatex latex="r_i" /> fra rotasjonsaksen. Hver partikkel har linjefart <InlineLatex latex="v_i = r_i \omega" /> (fordi legemet er stivt, alle har samme ω). Den totale kinetiske energien er summen av partikkelbidragene:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="E_k = \sum_i \tfrac{1}{2} m_i v_i^2 = \sum_i \tfrac{1}{2} m_i (r_i \omega)^2 = \tfrac{1}{2} \omega^2 \sum_i m_i r_i^2" />
          </p>
          <p className="text-sm mb-2">
            Siden <InlineLatex latex="\omega" /> er <em>felles</em> for alle partikler, kan vi faktorisere det ut. Det som gjenstår i summen er nøyaktig definisjonen på treghetsmomentet:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="I \equiv \sum_i m_i r_i^2 \implies E_{k,\text{rot}} = \tfrac{1}{2} I \omega^2" />
          </p>
          <p className="text-sm">
            Dette viser at <InlineLatex latex="I" /> <em>ikke er tilfeldig definert</em> — den er akkurat den størrelsen som gjør energiformelen enkel, akkurat som masse er definert slik at <InlineLatex latex="E_k = \tfrac{1}{2}mv^2" />.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">FELLE: I er IKKE en fast egenskap ved legemet</p>
          <p className="text-sm mb-2">
            Masse <InlineLatex latex="m" /> er en egenskap ved objektet alene — den endres ikke uansett hvor du måler. <strong>Treghetsmoment er noe helt annet:</strong> <InlineLatex latex="I" /> avhenger av <em>hvilken akse</em> du roterer legemet om. Samme stav kan ha tre ulike treghetsmomenter, avhengig av aksen:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside mb-2">
            <li>Akse gjennom senter, vinkelrett på staven: <InlineLatex latex="I = \tfrac{1}{12}ML^2" /></li>
            <li>Akse gjennom endepunktet, vinkelrett på staven: <InlineLatex latex="I = \tfrac{1}{3}ML^2" /> (fire ganger større!)</li>
            <li>Akse langs staven (rotasjon om egen lengdeakse): <InlineLatex latex="I \approx 0" /> for tynn stav</li>
          </ul>
          <p className="text-sm">
            <strong>Lærdom:</strong> Når du slår opp en formel for I, må du alltid kontrollere <em>hvilken akse</em> den gjelder for. En formel uten aksespesifikasjon er ubrukelig. Og: samme legeme roterer annerledes rundt kant vs midtpunkt — fordi I endres, ikke fordi massen endres.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: kunstløperen og baseballbattet</p>
          <p className="text-sm mb-2">
            En kunstløper med armene ut har stort I og spinner sakte. Trekker løperen armene inn, minker I dramatisk og spinnen øker (bevaring av dreiemoment, se kap. 10). Massen er den samme — det er <em>fordelingen</em> som endres.
          </p>
          <p className="text-sm">
            Et baseballbat holdt ved enden (stor r, stor I) er tyngre å svinge enn det samme battet holdt kortere opp (såkalt «choke up»). Profesjonelle batter bruker dette bevisst for å justere tregheten.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>
              <strong>«Tyngre objekt = vanskeligere å rotere»</strong> — ikke alltid. En tynn ring og en solid disk kan ha samme masse, men ulik I. Ringen er vanskeligere å rotere om sin akse fordi all masse er langt fra sentrum.
            </li>
            <li>
              <strong>«I er en egenskap ved objektet alene»</strong> — NEI. <InlineLatex latex="I" /> avhenger av hvilken akse du roterer om. Samme objekt har forskjellig <InlineLatex latex="I" /> avhengig av aksevalget. En stav har <InlineLatex latex="I = \frac{1}{12}ML^2" /> om senteret og <InlineLatex latex="I = \frac{1}{3}ML^2" /> om enden.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: Standard treghetsmoment — lær disse utenat</p>
          <div className="overflow-x-auto">
            <table className="text-sm w-full mt-1 border-collapse">
              <thead>
                <tr className="border-b border-green-200 dark:border-green-700">
                  <th className="text-left py-1 pr-4 font-semibold">Legeme</th>
                  <th className="text-left py-1 pr-4 font-semibold">Akse</th>
                  <th className="text-left py-1 font-semibold">I</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr className="border-b border-green-100 dark:border-green-900">
                  <td className="py-1 pr-4">Solid disk / sylinder</td>
                  <td className="py-1 pr-4">Symmetriaksen</td>
                  <td className="py-1"><InlineLatex latex="\frac{1}{2}MR^2" /></td>
                </tr>
                <tr className="border-b border-green-100 dark:border-green-900">
                  <td className="py-1 pr-4">Tynn ring / hul sylinder</td>
                  <td className="py-1 pr-4">Symmetriaksen</td>
                  <td className="py-1"><InlineLatex latex="MR^2" /></td>
                </tr>
                <tr className="border-b border-green-100 dark:border-green-900">
                  <td className="py-1 pr-4">Solid kule</td>
                  <td className="py-1 pr-4">Diameter</td>
                  <td className="py-1"><InlineLatex latex="\frac{2}{5}MR^2" /></td>
                </tr>
                <tr className="border-b border-green-100 dark:border-green-900">
                  <td className="py-1 pr-4">Tynn stav</td>
                  <td className="py-1 pr-4">Om senteret, ⊥ staven</td>
                  <td className="py-1"><InlineLatex latex="\frac{1}{12}ML^2" /></td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">Tynn stav</td>
                  <td className="py-1 pr-4">Om enden, ⊥ staven</td>
                  <td className="py-1"><InlineLatex latex="\frac{1}{3}ML^2" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 6–7: energi ved rulling</p>
          <p className="text-sm">
            <InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I\omega^2" /> er direkte analogt med <InlineLatex latex="E_k = \tfrac{1}{2}mv^2" /> fra kapittel 6. Når et objekt ruller uten å gli, har det <em>begge</em> former for kinetisk energi simultaneously: <InlineLatex latex="E_{k,\text{tot}} = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" />. Dette er avgjørende i energibevaringsproblemer med rullende legemer — du kan ikke glemme rotasjonsleddet!
          </p>
        </div>

        {/* SVG: I for stav (midt vs ende), sylinder, disk */}
        <div className="my-4">
          <p className="text-sm font-semibold mb-2">Visuell oversikt: treghetsmoment for ulike akser</p>
          <svg viewBox="0 0 640 220" className="w-full">
            {/* Stav om midten */}
            <g>
              <line x1="30" y1="60" x2="170" y2="60" stroke="currentColor" strokeWidth="5" />
              <circle cx="100" cy="60" r="4" fill="#8b5cf6" />
              <line x1="100" y1="40" x2="100" y2="80" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="100" y="100" textAnchor="middle" className="fill-current text-xs">Stav om senter</text>
              <text x="100" y="115" textAnchor="middle" className="fill-current text-xs" fill="#8b5cf6">I = (1/12) M L²</text>
            </g>
            {/* Stav om enden */}
            <g>
              <line x1="200" y1="60" x2="340" y2="60" stroke="currentColor" strokeWidth="5" />
              <circle cx="200" cy="60" r="4" fill="#ef4444" />
              <line x1="200" y1="40" x2="200" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="270" y="100" textAnchor="middle" className="fill-current text-xs">Stav om enden</text>
              <text x="270" y="115" textAnchor="middle" className="fill-current text-xs" fill="#ef4444">I = (1/3) M L² (4× større!)</text>
            </g>
            {/* Solid sylinder */}
            <g>
              <ellipse cx="420" cy="55" rx="40" ry="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="380" y1="55" x2="380" y2="80" stroke="currentColor" strokeWidth="1.5" />
              <line x1="460" y1="55" x2="460" y2="80" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="420" cy="80" rx="40" ry="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="420" y1="30" x2="420" y2="100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="420" y="125" textAnchor="middle" className="fill-current text-xs">Solid sylinder</text>
              <text x="420" y="140" textAnchor="middle" className="fill-current text-xs" fill="#3b82f6">I = (1/2) M R²</text>
            </g>
            {/* Sirkelskive */}
            <g>
              <circle cx="560" cy="67" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="560" cy="67" r="3" fill="#10b981" />
              <line x1="560" y1="27" x2="560" y2="107" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="560" y="125" textAnchor="middle" className="fill-current text-xs">Sirkelskive</text>
              <text x="560" y="140" textAnchor="middle" className="fill-current text-xs" fill="#10b981">I = (1/2) M R²</text>
            </g>
            {/* Tynn ring */}
            <g>
              <ellipse cx="150" cy="180" rx="40" ry="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <line x1="150" y1="160" x2="150" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="150" y="215" textAnchor="middle" className="fill-current text-xs" fill="#f59e0b">Tynn ring: I = M R² (all masse ytterst)</text>
            </g>
            {/* Solid kule */}
            <g>
              <circle cx="380" cy="180" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="380" cy="180" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="380" y1="158" x2="380" y2="202" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="380" y="215" textAnchor="middle" className="fill-current text-xs" fill="#8b5cf6">Solid kule: I = (2/5) M R²</text>
            </g>
          </svg>
          <p className="text-xs mt-1 italic opacity-75 text-center">
            Stiplede linjer viser rotasjonsaksen. Samme stav har 4× større I om enden enn om midten — samme masse, ulik fordeling!
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kjennetegn i oppgaveteksten</p>
          <p className="text-sm mb-2">
            Se etter disse ordene — da skal du tenke på treghetsmoment og rotasjonsenergi:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>«roterer om», «spinnende», «dreier» → rotasjonsbevegelse, trenger <InlineLatex latex="I" /></li>
            <li>«kinetisk energi av rotasjon», «rotasjonsenergi» → <InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I\omega^2" /></li>
            <li>«treghetsmoment om aksen» → slå opp riktig formel, merk aksen</li>
            <li>«stiv stav», «uniform skive», «hul sylinder» → signaliserer at du skal bruke standard-formel (tabell)</li>
            <li>«gjennom senteret», «gjennom endepunktet» → angir hvilken akse du skal bruke</li>
          </ul>
        </div>
      </TheorySummary>

      {/* Inline visualisering: treghetsmoment for ulike former */}
      <MomentOfInertiaVisualizer />

      <TheorySummary
        title="9.5 Parallellakse-teoremet"
        mustKnow={[
          "I_P = I_CM + Md² — treghetsmoment om vilkårlig parallell akse",
          "I er alltid minst om en akse gjennom massesenteret",
          "d er avstanden mellom CM-aksen og den nye aksen",
        ]}
      >
        <p className="mb-3">
          Parallellakse-teoremet lar deg beregne <InlineLatex latex="I" /> om en vilkårlig akse hvis du kjenner <InlineLatex latex="I_{CM}" /> om en parallell akse gjennom massesenteret:
        </p>
        <p className="mb-3 text-center font-semibold">
          <InlineLatex latex="I_P = I_{CM} + Md^2" />
        </p>
        <p className="mb-4">
          Merk: <InlineLatex latex="I_{CM}" /> er alltid den <em>minste</em> verdien. Enhver forskyvning av aksen <em>øker</em> I med <InlineLatex latex="Md^2" />. Eksempel: Tynn stav om senter har <InlineLatex latex="I = \tfrac{1}{12}ML^2" />, om enden: <InlineLatex latex="I = \tfrac{1}{12}ML^2 + M(\tfrac{L}{2})^2 = \tfrac{1}{3}ML^2" />.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor fungerer teoremet?</p>
          <p className="text-sm mb-2">
            Teoremet utledes ved å utvide summen for treghetsmomentet. La <InlineLatex latex="\mathbf{r}'" /> være posisjonen til hvert masseelement relativt til massesenteret, og la den nye aksen være forskjøvet en avstand <InlineLatex latex="d" />. Da er <InlineLatex latex="I_P = \sum m_i |\mathbf{r}'_i + \mathbf{d}|^2" />. Kryssled av typen <InlineLatex latex="\sum m_i \mathbf{r}'_i" /> forsvinner fordi dette er definisjonen på massesenteret (lik null i CM-systemet). Det gjenstår <InlineLatex latex="I_{CM} + Md^2" />.
          </p>
          <p className="text-sm">
            Konsekvens: <InlineLatex latex="I_{CM}" /> er alltid <em>minimumsverdien</em> for treghetsmoment. Enhver annen parallell akse gir <InlineLatex latex="I \geq I_{CM}" />.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Full utledning av parallellaksesetningen</p>
          <p className="text-sm mb-2">
            La den nye aksen P være parallell med en akse gjennom CM, forskjøvet med vektor <InlineLatex latex="\vec{d}" />. Posisjonen til partikkel <InlineLatex latex="i" /> relativt til CM er <InlineLatex latex="\vec{r}_i'" />, og relativt til P er <InlineLatex latex="\vec{r}_i = \vec{r}_i' - \vec{d}" /> (i planet vinkelrett på aksen).
          </p>
          <p className="text-sm mb-2">Treghetsmomentet om P er:</p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="I_P = \sum_i m_i |\vec{r}_i' - \vec{d}|^2 = \sum_i m_i \left(|\vec{r}_i'|^2 - 2\vec{r}_i' \cdot \vec{d} + |\vec{d}|^2\right)" />
          </p>
          <p className="text-sm mb-2">Del opp i tre ledd:</p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="I_P = \underbrace{\sum_i m_i |\vec{r}_i'|^2}_{=\,I_{CM}} - 2\vec{d} \cdot \underbrace{\sum_i m_i \vec{r}_i'}_{=\,\vec{0}\;(\text{CM-def.})} + |\vec{d}|^2 \underbrace{\sum_i m_i}_{=\,M}" />
          </p>
          <p className="text-sm mb-2">
            Mellomleddet forsvinner fordi <InlineLatex latex="\sum m_i \vec{r}_i' / M" /> er per definisjon CM-posisjonen målt <em>fra</em> CM — som selvsagt er null. Resultat:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="\boxed{I_P = I_{CM} + Md^2}" />
          </p>
          <p className="text-sm">
            Matematikken viser hvorfor CM er spesiell: det er <em>det eneste</em> referansepunktet der mellomleddet kansellerer — og dermed eneste aksen som gir minimum I.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: å snurre en sopelime</p>
          <p className="text-sm">
            Det er langt lettere å snurre en sopelime om dens midtpunkt (minimum I) enn om et av endepunktene (I forsterket med <InlineLatex latex="Md^2" />). Massesenteret er det «naturlige» rotasjonspunktet fordi det gir lavest treghetsmoment — og dermed minst motstand mot rotasjon. Planeter og stjerner roterer om sine massesentre av samme grunn.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse</p>
          <p className="text-sm mb-2">
            <strong>«Parallellakse-teoremet gjelder mellom to vilkårlige parallelle akser»</strong> — NEI. Én av aksene <em>må</em> gå gjennom massesenteret. Formelen <InlineLatex latex="I_P = I_{CM} + Md^2" /> gjelder kun når du regner fra CM-aksen. Du kan ikke hoppe direkte mellom to vilkårlige akser uten å gå via massesenteret.
          </p>
          <p className="text-sm">
            Korrekt fremgangsmåte for to akser A og B (ingen er CM): finn <InlineLatex latex="I_{CM}" /> fra enten A eller B, deretter: <InlineLatex latex="I_A = I_{CM} + Md_A^2" /> og <InlineLatex latex="I_B = I_{CM} + Md_B^2" />.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk eksamenstips</p>
          <p className="text-sm mb-2">
            På eksamen gis det ofte <InlineLatex latex="I_{CM}" /> og du skal finne <InlineLatex latex="I" /> om en annen akse — legg bare til <InlineLatex latex="Md^2" />. Eller omvendt: du får <InlineLatex latex="I" /> om en ytterakse og skal finne <InlineLatex latex="I_{CM}" /> — trekk fra <InlineLatex latex="Md^2" />.
          </p>
          <p className="text-sm">
            Eksempel: stav om enden er <InlineLatex latex="\frac{1}{3}ML^2" />. Vil du ha <InlineLatex latex="I_{CM}" />? Massesenteret er i midten, avstand <InlineLatex latex="d = L/2" />. Da er <InlineLatex latex="I_{CM} = \frac{1}{3}ML^2 - M\!\left(\frac{L}{2}\right)^2 = \frac{1}{3}ML^2 - \frac{1}{4}ML^2 = \frac{1}{12}ML^2" />. Stemmer med tabellen!
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kjennetegn i oppgaveteksten</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>«parallellaksesetning», «Steiners sats» → direkte henvisning</li>
            <li>«roterer om endepunktet», «akse gjennom hjørnet», «henger i et punkt» → aksen er <em>ikke</em> gjennom CM → bruk <InlineLatex latex="I = I_{CM} + Md^2" /></li>
            <li>«fysisk pendel», «stav som svinger om enden» → typiske tilfeller der du må flytte aksen fra CM til opphengspunktet</li>
            <li>Du får oppgitt avstand <InlineLatex latex="d" /> fra CM til nytt opphengspunkt → åpenbart signal</li>
          </ul>
        </div>
      </TheorySummary>

      {/* Inline visualisering: parallellakse-teoremet */}
      <ParallelAxisVisualizer />
    </div>
  );
}
