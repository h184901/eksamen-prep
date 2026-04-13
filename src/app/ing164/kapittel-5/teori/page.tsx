"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { SkraplanSimulator, FriksjonVisualiser, SirkelbevegelsSimulator } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-6">Teorisammendrag</h2>

      {/* 5.1 Partikler i likevekt */}
      <TheorySummary
        title="5.1 Anvendelse av N1L: Partikler i likevekt"
        mustKnow={[
          "ΣF = 0 betyr at legemet har konstant fart (eller er i ro)",
          "Sett opp ΣFx = 0 og ΣFy = 0 for å finne ukjente krefter",
          "Strategi: figur → FBD → koordinatsystem → likninger → løs → vurder",
          "I et masseløst tau er snordraget likt overalt",
        ]}
      >
        <p>
          Når kraftsummen er null, er legemet i <strong>likevekt</strong> — det beveger seg med konstant
          fart (som kan være null). Dette gir oss et kraftig verktøy for å finne ukjente krefter.
        </p>

        <FormulaBox
          latex="\sum\vec{F} = 0 \;\Longleftrightarrow\; \vec{v} = \text{konstant}"
          title="Likevektsbetingelsen"
          variant="gold"
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Løsningsstrategi</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Tegn figur av situasjonen</li>
            <li>Fritt-legeme-diagram for alle legemer</li>
            <li>Tegn inn alle krefter som virker på legemene</li>
            <li>Velg koordinatsystem, dekomponer kreftene</li>
            <li>Anvend Newtons første lov: <InlineLatex latex="\sum F_x = 0" /> og <InlineLatex latex="\sum F_y = 0" /></li>
            <li>Løs likningene</li>
            <li>Vurder svaret</li>
          </ol>
        </div>

        <p className="mt-3">
          <strong>Viktig om snordrag i tau:</strong> I et masseløst tau er snordraget likt i begge ender.
          I et tau med masse øker snordraget fra bunn til topp (tauet bærer sin egen vekt).
        </p>
      </TheorySummary>

      {/* 5.2 Partikkeldynamikk */}
      <TheorySummary
        title="5.2 Anvendelse av N2L: Partikkeldynamikk"
        mustKnow={[
          "ΣF = ma brukes når legemet akselererer",
          "Samme FBD-strategi som likevekt, men sett ΣF = ma i stedet for 0",
          "Kombiner med kinematikk (kap. 2) for å finne fart, posisjon etc.",
          "Kraft kan variere med tiden — bruk derivasjon",
        ]}
      >
        <p>
          Når kraftsummen ikke er null, akselererer legemet. Vi bruker{" "}
          <InlineLatex latex="\sum\vec{F} = m\vec{a}" /> i kombinasjon med kinematikkens likninger
          for å finne akselerasjon, fart og posisjon.
        </p>

        <FormulaBox
          latex="\sum\vec{F} = m\vec{a} \;\Longrightarrow\; \vec{a} = \frac{\sum\vec{F}}{m}"
          title="Dynamikklikningen"
          variant="gold"
        />

        <p className="mt-3">
          <strong>Viktig:</strong> Hvis kraften varierer med tiden, varierer også akselerasjonen.
          Da kan vi bruke derivasjon for å finne akselerasjonen ved et bestemt tidspunkt.
        </p>
      </TheorySummary>

      {/* 5.3 Friksjonskrefter */}
      <TheorySummary
        title="5.3 Friksjonskrefter"
        mustKnow={[
          "Friksjonskoeffisienten μ = R/N (forholdet mellom friksjon og normalkraft)",
          "Glidefriksjon: R = μk·N (konstant under glidning)",
          "Hvilefriksjon: R ≤ μs·N (tilpasser seg, maks μs·N)",
          "Alltid μs > μk — det er tyngre å løsne noe enn å holde det i bevegelse",
          "Friksjon virker alltid MOTSATT bevegelsesretningen",
        ]}
      >
        <p>
          Friksjon oppstår mellom to flater i kontakt. Den virker alltid <strong>motsatt</strong>{" "}
          bevegelsesretningen (eller retningen legemet ville beveget seg).
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">To typer friksjon</p>
          <p>
            <strong>Hvilefriksjon (statisk):</strong> Når legemet er i ro. Tilpasser seg den påførte kraften
            opp til en maksverdi: <InlineLatex latex="R \leq \mu_s N" />.
          </p>
          <p className="mt-1">
            <strong>Glidefriksjon (kinetisk):</strong> Når legemet glir. Konstant verdi:{" "}
            <InlineLatex latex="R = \mu_k N" />.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="R = \mu_k N"
            title="Glidefriksjon"
            variant="gold"
            description="Konstant under bevegelse"
          />
          <FormulaBox
            latex="R \leq \mu_s N"
            title="Hvilefriksjon (maks)"
            variant="gold"
            description="Tilpasser seg opp til denne verdien"
          />
        </div>

        <FormulaBox
          latex="\mu = \frac{R}{N}"
          title="Friksjonskoeffisient"
          variant="blue"
          description="μs (statisk) er alltid litt høyere enn μk (kinetisk). Dimensjonsløst tall."
        />

        <p className="mt-3">
          <strong>Rullefriksjon:</strong> Hjul som ruller gir også motstand (rullefriksjon), men denne er
          typisk mye mindre enn glidefriksjon. Friksjonskoeffisienten for rulling (<InlineLatex latex="\mu_r" />)
          er ofte svært liten.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Luftmotstand og væskemotstand</p>
          <p className="text-sm">
            Legemer som beveger seg i væske eller gass møter motstand som virker mot fartsretningen.
            Motstanden øker med farten:
          </p>
          <p className="text-sm mt-1">
            Liten hastighet: <InlineLatex latex="L \approx kv" /> (lineær).
            Stor hastighet: <InlineLatex latex="L \approx Dv^2" /> (kvadratisk).
          </p>
          <p className="text-sm mt-1">
            Når motstanden balanserer tyngden, har vi nådd <strong>terminalfarten</strong>:{" "}
            <InlineLatex latex="v_T = mg/k" />.
          </p>
        </div>

        {/* Friksjon-visualisering inline i teorien */}
        <FriksjonVisualiser />
      </TheorySummary>

      {/* Skråplan-simulator: naturlig sted etter N2L og friksjon er introdusert */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Bruk simulatoren under for å se hvordan kreftene på skråplanet endrer seg:
        </p>
        <SkraplanSimulator />
      </div>

      {/* 5.4 Sirkelbevegelse */}
      <TheorySummary
        title="5.4 Dynamikk i sirkelbevegelse"
        mustKnow={[
          "Sentripetalakselerasjon: a⊥ = v²/R (peker alltid inn mot sentrum)",
          "ΣF = mv²/R — nettokraften inn mot sentrum gir sirkelbevegelse",
          "Det finnes ingen 'sentrifugalkraft' — det er tregheten som gir følelsen",
          "I topp av loop: N og G peker begge ned; i bunn: N opp, G ned",
        ]}
      >
        <p>
          For et legeme i sirkelbevegelse med konstant fart er akselerasjonen rettet inn mot sentrum
          (sentripetalakselerasjon). Newtons 2. lov gir da at nettokraften også peker inn mot sentrum.
        </p>

        <FormulaBox
          latex="a_\perp = \frac{v^2}{R}, \qquad \sum F = m\frac{v^2}{R} \;\;\text{(inn mot sentrum)}"
          title="Sentripetalakselerasjon og -kraft"
          variant="gold"
          description="R = sirkelbevegelsens radius, v = banefarten. ΣF peker ALLTID inn mot sentrum."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Vertikal sirkelbevegelse</p>
          <p className="text-sm">
            <strong>I topp av loop:</strong> Både N og G peker ned (mot sentrum).{" "}
            <InlineLatex latex="mg + N = mv^2/r" /> → <InlineLatex latex="N = m(v^2/r - g)" />.
          </p>
          <p className="text-sm mt-1">
            <strong>I bunn av loop:</strong> N peker opp (mot sentrum), G ned.{" "}
            <InlineLatex latex="N - mg = mv^2/r" /> → <InlineLatex latex="N = m(v^2/r + g)" />.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="v = \frac{s}{T} = \frac{2\pi R}{T}"
            title="Banefart og omløpstid"
            variant="blue"
          />
          <FormulaBox
            latex="v_{\min,\text{topp}} = \sqrt{gR}"
            title="Min. fart i topp av loop"
            variant="blue"
            description="For å opprettholde kontakt (N = 0)"
          />
        </div>

        <p className="mt-3">
          <strong>Dossert sving:</strong> Ved å helle veibanen i en sving (dossering med vinkel β) kan
          normalkraftens horisontale komponent bidra til sentripetalkraften. Ved en bestemt fart er
          friksjonen null: <InlineLatex latex="v = \sqrt{gr\tan\beta}" />.
        </p>

        {/* Sirkel-simulator inline */}
        <SirkelbevegelsSimulator />
      </TheorySummary>
    </div>
  );
}
