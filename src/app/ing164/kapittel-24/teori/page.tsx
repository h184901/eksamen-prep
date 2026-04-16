"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { CapacitorCalculator, SeriesParallelCalculator } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      {/* 24.1 Kondensatorer og kapasitans */}
      <TheorySummary
        title="24.1 Kondensatorer og kapasitans"
        mustKnow={[
          "En kondensator er to ledere adskilt av en isolator (eller vakuum)",
          "Kapasitans C = Q/V_{ab} — måles i Farad (F)",
          "Platekondensator: C = ε₀A/d",
          "Kapasitansen avhenger kun av geometri, ikke av Q eller V",
          "E-felt mellom platene: E = σ/ε₀ = V/d (uniformt felt)",
        ]}
      >
        <p>
          To ledere adskilt av en isolator (eller vakuum) kalles en <strong>kondensator</strong>.
          Når den ene lederen har ladning +Q og den andre −Q, definerer vi kondensatorens kapasitans:
        </p>

        <FormulaBox
          latex="C = \frac{Q}{V_{ab}}"
          title="Definisjon av kapasitans"
          variant="gold"
          description="C i Farad (F = C/V). Q er ladningen på den positive platen. V_{ab} er potensialforskjellen (spenningen) mellom platene."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor C = Q/V?</p>
          <p className="text-sm">
            Kapasitans måler <strong>hvor mye ladning en kondensator klarer å lagre per volt</strong>.
            En stor C betyr at du kan lagre mye ladning uten at spenningen blir stor. For en
            platekondensator: <InlineLatex latex="C = \varepsilon_0 A/d" /> — større plater og
            kortere avstand gir høyere kapasitans. Dobler du arealet, dobler du lagringsevnen.
            Halverer du avstanden, dobler du den også. Geometrien styrer alt.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Vannkranen</p>
          <p className="text-sm">
            Tenk på en kondensator som en <strong>vannbeholder</strong>. Platens areal er som
            tankens diameter — en videre tank lagrer mer vann for samme vannhøyde. Avstanden mellom
            platene er som tankens lave vegg — jo kortere vei vannet trenger å stige, jo lettere er
            det å fylle tanken. Spenningen er som vanntrykket, ladningen er som vannvolumet.
            En stor kondensator er en bred, lav beholder: den lagrer mye vann (ladning) uten høyt
            trykk (spenning).
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 21 og 23</p>
          <p className="text-sm">
            Fra kap. 21 vet vi at overflateladningstettheten <InlineLatex latex="\sigma = Q/A" /> gir
            et E-felt <InlineLatex latex="E = \sigma/\varepsilon_0" /> mellom to parallelle
            ladede plater. Fra kap. 23 vet vi at for et uniformt felt gjelder
            {" "}<InlineLatex latex="V_{ab} = E \cdot d" />. Setter vi disse sammen:
          </p>
          <div className="mt-2 text-sm">
            <InlineLatex latex="C = \frac{Q}{V_{ab}} = \frac{Q}{Ed} = \frac{Q}{(\sigma/\varepsilon_0)d} = \frac{Q\varepsilon_0}{(Q/A)d} = \varepsilon_0 \frac{A}{d}" />
          </div>
          <p className="text-sm mt-2">Formelen for platekondensatoren følger direkte fra det du allerede kan!</p>
        </div>

        <p className="mt-4">
          For to parallelle plater med areal A og innbyrdes avstand d (i vakuum):
        </p>
        <FormulaBox
          latex="C = \varepsilon_0 \frac{A}{d}"
          title="Platekondensator (vakuum)"
          variant="gold"
          description="ε₀ = 8,854 · 10⁻¹² C²/Nm² er vakuumpermittiviteten. A er platens areal. d er avstanden mellom platene."
        />

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>"Kapasitansen avhenger av Q og V"</strong> — NEI. C avhenger kun av
              <em> geometri</em> (plateareal, avstand, dielektrikum). Hvis du lader opp kondensatoren
              mer, øker Q og V proporsjonalt slik at C = Q/V forblir konstant.
            </li>
            <li>
              <strong>"En ladet kondensator har netto ladning"</strong> — NEI. Totalladningen er null.
              Den ene platen har +Q og den andre har −Q. Kondensatoren separerer ladning, den skaper
              den ikke.
            </li>
            <li>
              <strong>"1 Farad er en normal kondensator"</strong> — NEI. 1 F er enormt! Typiske
              kondensatorer er i området pF–µF. 1 pF = 10⁻¹² F, 1 nF = 10⁻⁹ F, 1 µF = 10⁻⁶ F.
            </li>
          </ul>
        </div>

        <p className="mt-4">
          <strong>E-feltet</strong> mellom parallelle plater er uniformt og gitt ved:
        </p>
        <FormulaBox
          latex="E = \frac{V_{ab}}{d} = \frac{\sigma}{\varepsilon_0}"
          variant="blue"
          description="E-feltet peker fra positiv til negativ plate. Gjelder for ideelle parallelle plater (kant-effekter neglisjeres)."
        />

        <div className="mt-6">
          <CapacitorCalculator />
        </div>
      </TheorySummary>

      {/* 24.2 Kondensatorer i serie og parallell */}
      <TheorySummary
        title="24.2 Kondensatorer i serie og parallell"
        mustKnow={[
          "Serie: Lik ladning Q på alle kondensatorer, spenningen fordeles — 1/C_tot = Σ1/Cᵢ",
          "Parallell: Lik spenning V på alle kondensatorer, ladningen fordeles — C_tot = ΣCᵢ",
          "To kondensatorer i serie: C_tot = C₁C₂/(C₁+C₂)",
          "Formlene er OMVENDT av motstander — forstå HVORFOR",
          "Kunne kombinere serie og parallell i sammensatte nettverk",
        ]}
      >
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er formlene omvendt av motstander?</p>
          <p className="text-sm">
            Intuisjonen: kapasitans er proporsjonal med <em>areal</em> og omvendt proporsjonal med
            <em> avstand</em>.
          </p>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              <strong>Parallell:</strong> Platene legges effektivt side om side → totalt areal øker
              → C øker. Akkurat som motstander i <em>serie</em> (motstand øker med lengde).
            </li>
            <li>
              <strong>Serie:</strong> Gapet mellom platene blir effektivt større (to gap i strekk)
              → C synker. Akkurat som motstander i <em>parallell</em> (motstand synker).
            </li>
          </ul>
          <p className="text-sm mt-2 font-medium">
            Kondensatorer og motstander er speilbilder av hverandre i serie/parallell!
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Vannbeholdere</p>
          <p className="text-sm">
            <strong>Parallell</strong> = to brede bøtter satt ved siden av hverandre og koblet
            sammen i bunnen. Samme vanntrykk (spenning) i begge, men totalt volum (ladning) er
            summen. <strong>Serie</strong> = to bøtter stablet oppå hverandre med hull i mellom.
            Det totale vannsøylen (spenningen) fordeles på begge — lagringskapasiteten synker.
          </p>
        </div>

        <p className="font-medium mt-2">Seriekobling</p>
        <p className="text-sm mt-1">
          Kondensatorer i <strong>serie</strong> har <strong>lik ladning Q</strong> på alle kondensatorer.
          Spenningen fordeles: <InlineLatex latex="V_{ab} = V_1 + V_2 + \cdots" />
        </p>

        <FormulaBox
          latex="\frac{1}{C_\text{tot}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots + \frac{1}{C_n}"
          title="Kondensatorer i serie"
          variant="gold"
          description="Totalkapasitansen i serie er alltid MINDRE enn den minste enkeltkapasitansen."
        />

        <p className="font-medium mt-4">Parallellkobling</p>
        <p className="text-sm mt-1">
          Kondensatorer i <strong>parallell</strong> har <strong>lik spenning V</strong>.
          Ladningen fordeles: <InlineLatex latex="Q_\text{tot} = Q_1 + Q_2 + \cdots" />
        </p>

        <FormulaBox
          latex="C_\text{tot} = C_1 + C_2 + \cdots + C_n"
          title="Kondensatorer i parallell"
          variant="gold"
          description="Totalkapasitansen i parallell er summen av alle enkeltkapasitansene."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: To kondensatorer i serie</p>
          <p className="text-sm">
            For nøyaktig to kondensatorer i serie finnes det en rask formel du bør huske til eksamen:
          </p>
          <div className="mt-2">
            <InlineLatex latex="C_\text{tot} = \frac{C_1 C_2}{C_1 + C_2}" />
          </div>
          <p className="text-sm mt-2">
            Denne er rask å bruke når du har to kondensatorer. For tre eller flere: bruk
            summeformelen med inversene.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>"Kondensatorer i serie har lik spenning"</strong> — NEI, de har lik
              <em> ladning</em>. Spenningen fordeles i omvendt forhold til kapasitansen:
              den minste kondensatoren får størst spenning.
            </li>
            <li>
              <strong>"Kondensatorer i parallell har lik ladning"</strong> — NEI, de har lik
              <em> spenning</em>. Ladningen fordeles i direkte forhold til kapasitansen:
              den største kondensatoren lagrer mest ladning.
            </li>
            <li>
              <strong>"Serie gir større totalkapasitans"</strong> — NEI. Serie gir alltid
              <em> mindre</em> totalkapasitans enn den minste enkeltkapasitansen.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng: Huskeregel serie vs. parallell</p>
          <div className="text-sm overflow-x-auto">
            <table className="w-full mt-1 text-left border-collapse">
              <thead>
                <tr>
                  <th className="pr-4 pb-1 font-semibold"></th>
                  <th className="pr-4 pb-1 font-semibold">Kondensatorer</th>
                  <th className="pb-1 font-semibold">Motstander</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr>
                  <td className="pr-4 py-0.5 font-medium">Serie</td>
                  <td className="pr-4 py-0.5">Addér inversene (1/C)</td>
                  <td className="py-0.5">Addér direkte (R)</td>
                </tr>
                <tr>
                  <td className="pr-4 py-0.5 font-medium">Parallell</td>
                  <td className="pr-4 py-0.5">Addér direkte (C)</td>
                  <td className="py-0.5">Addér inversene (1/R)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <SeriesParallelCalculator />
        </div>
      </TheorySummary>

      {/* 24.3 Energilagring */}
      <TheorySummary
        title="24.3 Energilagring i kondensatorer og elektrisk-felt-energi"
        mustKnow={[
          "Lagret energi: E_p = Q²/2C = ½CV² = ½QV",
          "Velg formel basert på hva som er konstant i oppgaven",
          "Energitetthet i E-felt: u = ½ε₀E² (J/m³)",
          "Energien lagres i det elektriske FELTET, ikke på platene",
        ]}
      >
        <p>
          Den lagrede energien i en kondensator er lik det arbeidet vi må utføre for å lade den opp.
          Denne energien kan hentes ut raskt — brukes i blitz, laserpulser, defibrillatorer og
          railguns.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvor er energien egentlig lagret?</p>
          <p className="text-sm">
            Energien lagres i <strong>det elektriske feltet mellom platene</strong>, ikke på selve
            platene. Dette er en dyp innsikt: tomt rom med et elektrisk felt inneholder energi!
            Energitettheten er <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> — dette
            gjelder for <em>alle</em> elektriske felt overalt i universet, ikke bare inne i
            kondensatorer. Elektromagnetiske bølger (lys, radiobølger) bærer energi nettopp fordi
            de bærer elektriske og magnetiske felt gjennom rommet.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Den spente fjæren</p>
          <p className="text-sm">
            En kondensator er som en spent fjær. En fjær lagrer elastisk potensiell energi når du
            tøyer den — mer tøying, mer energi. En kondensator lagrer elektrisk energi når du lader
            den opp — mer ladning, mer energi. Begge frigjør energien plutselig: fjæren slippes,
            kondensatoren kobles til en krets. En kameraets blits er akkurat dette: energien som er
            bygget opp sakte i kondensatoren frigjøres på mikrosekunder som et intenst lysglimt.
          </p>
        </div>

        <FormulaBox
          latex="E_p = \frac{Q^2}{2C} = \frac{1}{2}CV^2 = \frac{1}{2}QV"
          title="Potensiell energi lagret i kondensator"
          variant="gold"
          description="Tre ekvivalente uttrykk. Velg det som passer til de kjente størrelsene i oppgaven."
        />

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kap. 23: Hvilken formel velger du?</p>
          <ul className="text-sm space-y-1 mt-1">
            <li><strong><InlineLatex latex="E_p = \frac{1}{2}CV^2" /></strong> — bruk når spenningen V er kjent (f.eks. koblet til batteri)</li>
            <li><strong><InlineLatex latex="E_p = \frac{Q^2}{2C}" /></strong> — bruk når ladningen Q er kjent (f.eks. frakoblet batteri, Q er konstant)</li>
            <li><strong><InlineLatex latex="E_p = \frac{1}{2}QV" /></strong> — bruk sjelden, men nyttig i utledninger</li>
          </ul>
          <p className="text-sm mt-2">
            Energien tilsvarer arbeidet som er gjort for å flytte ladning fra én plate til den andre
            mot det voksende elektriske feltet. Fra kap. 23: dette er integralet av dW = V dq fra 0
            til Q, som gir nettopp <InlineLatex latex="\frac{1}{2}QV" />.
          </p>
        </div>

        <p className="mt-4">
          Energien er lagret i <strong>det elektriske feltet</strong> mellom platene.
          Vi definerer energitetthet (energi per volum):
        </p>

        <FormulaBox
          latex="u = \frac{E_p}{V_\text{olum}} = \frac{1}{2}\varepsilon_0 E^2"
          title="Energitetthet i elektrisk felt"
          variant="gold"
          description="u har enhet J/m³. Gjelder generelt for ALLE elektriske felt, ikke bare i kondensatorer."
        />

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng: Utledning av energitetthet</p>
          <p className="text-sm">
            For en platekondensator er volumet mellom platene{" "}
            <InlineLatex latex="V_\text{olum} = A \cdot d" />.
            Vi setter inn <InlineLatex latex="C = \varepsilon_0 A/d" /> og{" "}
            <InlineLatex latex="V_{ab} = E \cdot d" /> i <InlineLatex latex="\frac{1}{2}CV_{ab}^2" />:
          </p>
          <div className="mt-2 text-sm">
            <InlineLatex latex="E_p = \frac{1}{2} \cdot \varepsilon_0\frac{A}{d} \cdot (Ed)^2 = \frac{1}{2}\varepsilon_0 E^2 \cdot Ad = u \cdot V_\text{olum}" />
          </div>
          <p className="text-sm mt-2">
            Energitettheten <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> gjelder ikke
            bare for kondensatorer — den er en fundamental egenskap ved elektriske felt.
          </p>
        </div>
      </TheorySummary>

      {/* 24.4 Dielektrikum */}
      <TheorySummary
        title="24.4 Dielektrikum"
        mustKnow={[
          "Dielektrikumkonstanten κ = C/C₀ (alltid ≥ 1, κ = 1 for vakuum)",
          "Dielektrikum øker kapasitansen: C = κC₀ = κε₀A/d = εA/d",
          "Dielektrikum reduserer E-feltet: E = E₀/κ",
          "Permittivitet: ε = κε₀",
          "Indusert overflateladning: Qᵢ = Q(1 − 1/κ)",
          "Energitetthet med dielektrikum: u = ½κε₀E² = ½εE²",
        ]}
      >
        <p>
          Mellom platene på en kondensator kan det være et isolerende materiale (<strong>dielektrikum</strong>)
          istedet for vakuum. Et dielektrikum gir tre praktiske fordeler:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
          <li>Hindrer at platene kommer i kontakt og kortslutter kondensatoren</li>
          <li>Gjør det mulig å tåle større spenning uten elektrisk gjennomslag</li>
          <li>Øker kapasitansen med faktor κ (kappa), kalt <strong>dielektrikumkonstanten</strong></li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor øker dielektrikum kapasitansen?</p>
          <p className="text-sm">
            Dielektrikummaterialet består av molekyler med positive og negative ladninger.
            Når det plasseres i det elektriske feltet, <strong>polariseres</strong> molekylene:
            de retter seg slik at negative ender peker mot den positive platen og positive ender
            peker mot den negative platen. Dette skaper et <em>indusert elektrisk felt</em> som
            delvis motvirker det opprinnelige feltet mellom platene. Resultatet: E-feltet (og
            dermed spenningen V = Ed) reduseres med faktor κ for samme ladning Q. Siden
            C = Q/V øker da C med faktor κ.
          </p>
          <p className="text-sm mt-2">
            Formelt: dielektrikumet skaper en indusert overflateladning{" "}
            <InlineLatex latex="\sigma_i" /> som delvis kansellerer{" "}
            <InlineLatex latex="\sigma" /> fra platene.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Solkrem som isolasjon</p>
          <p className="text-sm">
            Å sette inn et dielektrikum er som å legge et teppe av polare molekyler mellom platene.
            Hvert molekyl er som en liten magnet med en positiv og en negativ ende. I feltet
            snur de seg alle i samme retning og danner en "skjerm" som demper det opprinnelige
            feltet. Jo mer polar materialet er (høy κ), jo mer effektiv er skjermingen, og jo
            større blir kapasitansen. Vann har κ ≈ 80 og er svært effektivt — men upraktisk å ha
            mellom kondensatorplatene!
          </p>
        </div>

        <FormulaBox
          latex="\kappa = \frac{C}{C_0}"
          title="Dielektrikumkonstanten (relativ permittivitet)"
          variant="gold"
          description="κ er forholdet mellom kapasitansen med og uten dielektrikum. κ = 1 for vakuum, κ > 1 for alle materialer."
        />

        <FormulaBox
          latex="C = \kappa C_0 = \kappa\varepsilon_0 \frac{A}{d} = \varepsilon\frac{A}{d}"
          title="Kapasitans med dielektrikum"
          variant="gold"
          description="Med dielektrikum erstatter vi ε₀ med ε = κε₀ i alle formler."
        />

        <p className="mt-4">
          <strong>E-feltet og spenningen</strong> reduseres med faktor κ for fast ladning Q:
        </p>
        <FormulaBox
          latex="E = \frac{E_0}{\kappa} \qquad V = \frac{V_0}{\kappa}"
          variant="blue"
          description="Gjelder når kondensatoren er ladet og deretter frakoblet spenningskilden (Q er konstant)."
        />

        <p className="mt-4">
          Den <strong>induserte overflateladningen</strong> på dielektrikumets flater:
        </p>
        <FormulaBox
          latex="Q_i = Q\!\left(1 - \frac{1}{\kappa}\right)"
          variant="blue"
          description="Indusert ladning — alltid mindre enn den frie ladningen Q. Motvirker E-feltet delvis. For vakuum (κ=1) er Qᵢ = 0."
        />

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>"Dielektrikumet skaper ny ladning"</strong> — NEI. Det omfordeler
              eksisterende ladning inni materialet. Netto ladning på dielektrikumet er alltid null
              (like mye indusert + og − ladning).
            </li>
            <li>
              <strong>"κ kan være mindre enn 1"</strong> — NEI. κ ≥ 1 alltid. Vakuum har κ = 1
              (laveste mulige), alle andre materialer har κ {`>`} 1. Et dielektrikum kan aldri
              <em> redusere</em> kapasitansen.
            </li>
            <li>
              <strong>"Å sette inn et dielektrikum øker alltid energien"</strong> — FEIL. Det
              avhenger av situasjonen. Hvis batteriet er koblet til (V konstant): energien øker
              (κ ganger). Hvis kondensatoren er frakoblet (Q konstant): energien reduseres (1/κ).
              Forstå hva som er konstant i oppgaven!
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Permittivitet og oppdaterte formler</p>
          <p className="text-sm">Med dielektrikum bytter vi ut <InlineLatex latex="\varepsilon_0" /> med <InlineLatex latex="\varepsilon = \kappa\varepsilon_0" /> i alle formler:</p>
          <ul className="text-sm mt-2 space-y-1">
            <li><InlineLatex latex="C = \varepsilon \frac{A}{d}" /></li>
            <li><InlineLatex latex="u = \frac{1}{2}\varepsilon E^2 = \frac{1}{2}\kappa\varepsilon_0 E^2" /></li>
            <li><InlineLatex latex="E = \frac{\sigma - \sigma_i}{\varepsilon_0} = \frac{\sigma}{\kappa\varepsilon_0} = \frac{\sigma}{\varepsilon}" /></li>
          </ul>
          <p className="text-sm mt-3 font-medium">Eksempler på κ-verdier:</p>
          <ul className="text-sm mt-1 space-y-0.5">
            <li>Vakuum: κ = 1 (eksakt)</li>
            <li>Luft: κ ≈ 1,00059 (nesten som vakuum)</li>
            <li>Papir: κ ≈ 3,7</li>
            <li>Mylar-plast: κ ≈ 3,1</li>
            <li>Vann (20 °C): κ ≈ 80,4</li>
            <li>Strontiumtitanat: κ ≈ 310</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng: Gjennomslags-spenning</p>
          <p className="text-sm">
            Alle isolatorer har en <strong>gjennomslags-feltstyrke</strong> — et maksimalt E-felt
            de tåler før de leder strøm. Luft bryter ned ved E ≈ 3 MV/m (lynet!). Et dielektrikum
            kan tåle mye høyere E-felt enn luft. Dermed kan kondensatoren lades til høyere spenning
            uten gjennomslag, i tillegg til at κ gir høyere kapasitans. Dobbel gevinst.
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
