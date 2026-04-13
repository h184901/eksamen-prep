"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { FaradayCalculator, MovingConductorVisualizer, ACGeneratorVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Teorisammendrag</h2>

      {/* 29.1 Induksjonsforsøk */}
      <TheorySummary
        title="29.1 Induksjonsforsøk"
        mustKnow={[
          "Endring i magnetisk fluks gjennom en strømsløyfe induserer en EMF",
          "Det spiller ingen rolle HOW fluksen endres — resultatet er det samme",
          "Tre måter å endre fluks: endre B, endre A, eller endre vinkel φ",
        ]}
        defaultOpen
      >
        <p>
          Flere forsøk med strømsløyfer plassert i magnetfelt viser det samme:
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 text-center">
            Når magnetisk fluks <InlineLatex latex="\Phi_B" /> gjennom strømsløyfen varierer,
            induseres en elektromotorisk spenning (EMF) <InlineLatex latex="\mathcal{E}" /> i strømsløyfen.
          </p>
        </div>

        <p className="mt-3">
          Husker du magnetisk fluks fra kapittel 27?{" "}
          <InlineLatex latex="\Phi_B = BA\cos\varphi" />, der φ er vinkelen mellom <InlineLatex latex="\vec{B}" />{" "}
          og normalvektoren til flaten. For å endre fluksen kan vi:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Endre feltstyrken B</strong> — f.eks. flytte en magnet nærmere/lenger bort</li>
          <li><strong>Endre strømsløyfens areal A</strong> — f.eks. en stav som glir langs skinner</li>
          <li><strong>Endre vinkelen φ</strong> mellom felt og strømsløyfe — f.eks. rotere sløyfen</li>
        </ul>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Analogi: Batteri vs. indusert EMF</p>
          <p className="text-sm">
            Et batteri gir en <em>konstant</em> EMF (likestrøm). Induksjon gir en EMF som varierer
            over tid — den eksisterer bare så lenge fluksen <em>endres</em>. Stopper endringen, stopper EMF-en.
          </p>
        </div>
      </TheorySummary>

      {/* Faraday Calculator visualization embedded here */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Utforsk Faradays lov interaktivt — juster B, areal og vinkel og se fluksendring og indusert EMF:
        </p>
        <FaradayCalculator />
      </div>

      {/* 29.2 Faradays lov */}
      <TheorySummary
        title="29.2 Faradays lov"
        mustKnow={[
          "Faradays lov: ε = −dΦ_B/dt",
          "For N vindinger: ε = −N · dΦ_B/dt",
          "Minustegnet: Lenz' lov (neste seksjon)",
          "Enheter: [ε] = V, [Φ] = Wb, [dΦ/dt] = Wb/s = V",
        ]}
      >
        <p>
          Faraday oppsummerte alle forsøk med elektromagnetisk induksjon i én lov:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -\frac{d\Phi_B}{dt}"
          title="Faradays lov"
          variant="gold"
          description="Den induserte EMF-en er lik den negative tidsderiverte av magnetisk fluks gjennom sløyfen."
        />

        <p className="mt-3">
          Dersom strømsløyfen er en <strong>spole med N vindinger</strong>:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -N\frac{d\Phi_B}{dt}"
          title="Faradays lov for spole med N vindinger"
          variant="gold"
          description="Hver vinding bidrar med sin fluksendring. N vindinger gir N ganger så stor EMF."
        />

        <p className="mt-3">
          Siden <InlineLatex latex="\Phi_B = BA\cos\varphi" />, kan vi skrive:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -N\frac{d}{dt}(BA\cos\varphi)"
          variant="blue"
          description="Nå ser vi tydelig: fluksen endres hvis B endres, A endres, eller φ endres."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Retning på indusert ems — fire steg</p>
          <ol className="text-sm space-y-1">
            <li>1. Velg en positiv retning for arealvektoren <InlineLatex latex="\vec{A}" /></li>
            <li>2. Bruk <InlineLatex latex="\vec{A}" /> og <InlineLatex latex="\vec{B}" /> til å finne fortegnet til <InlineLatex latex="\Phi_B" /> og <InlineLatex latex="d\Phi_B/dt" /></li>
            <li>3. Bestem fortegnet til <InlineLatex latex="\mathcal{E}" /></li>
            <li>4. Bestem strømretning ved høyrehåndsregelen</li>
          </ol>
        </div>
      </TheorySummary>

      {/* 29.3 Lenz' lov */}
      <TheorySummary
        title="29.3 Lenz' lov"
        mustKnow={[
          "Lenz' lov: Retningen på alle effekter av magnetisk induksjon motvirker sin årsak",
          "Øker fluks → indusert strøm lager felt som motvirker økningen",
          "Minker fluks → indusert strøm lager felt som prøver å opprettholde fluksen",
          "Lenz' lov er en konsekvens av energibevaring",
        ]}
      >
        <p>
          Minustegnet i Faradays lov (<InlineLatex latex="\mathcal{E} = -d\Phi_B/dt" />) har en
          dyp fysisk betydning som kalles <strong>Lenz&apos; lov</strong>:
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 text-center text-lg">
            Retningen på alle effekter av magnetisk induksjon vil være slik at de <em>motvirker</em> sin årsak.
          </p>
        </div>

        <p className="mt-3">Praktisk betyr dette:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Fluks øker</strong> (f.eks. B-felt inn i sløyfen øker):
            → Indusert strøm lager B-felt <em>ut av</em> sløyfen (motvirker økningen)
            → Strøm <em>mot</em> klokka (sett fra B-retning)
          </li>
          <li>
            <strong>Fluks minker</strong> (f.eks. B-felt inn i sløyfen minker):
            → Indusert strøm lager B-felt <em>inn i</em> sløyfen (prøver å opprettholde)
            → Strøm <em>med</em> klokka
          </li>
        </ul>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hvorfor Lenz&apos; lov? — Energibevaring</p>
          <p className="text-sm">
            Tenk deg det motsatte: at den induserte strømmen <em>forsterket</em> fluksendringen.
            Da ville en liten endring gi mer strøm, som gir mer fluks, som gir mer strøm...
            En uendelig energisyklus uten kilde! Det bryter med energibevaring.
            Lenz&apos; lov sikrer at induksjonen alltid <em>bremser</em> endringen.
          </p>
        </div>
      </TheorySummary>

      {/* Moving Conductor visualization embedded */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Se Lenz&apos; lov i aksjon — staven beveger seg og induserer strøm:
        </p>
        <MovingConductorVisualizer />
      </div>

      {/* 29.4 Ems fra leder i bevegelse */}
      <TheorySummary
        title="29.4 EMF fra leder i bevegelse"
        mustKnow={[
          "Rett leder med fart v i felt B: ε = vBL",
          "Utledning: F_m = qvB på ladningene i lederen → spenningsforskjell V = vBL",
          "Generelt: ε = ∮(v × B) · dl",
          "Effekt: P = ε²/R = B²L²v²/R",
          "Faradays diskdynamo: ε = ½ωBR²",
        ]}
      >
        <p>
          Anta at en rett lederstav med lengde L beveger seg med fart v vinkelrett på et uniformt
          magnetfelt B (som peker inn i arket). Ladningene i staven opplever en magnetisk kraft{" "}
          <InlineLatex latex="\vec{F}_m = q\vec{v} \times \vec{B}" />, som skyver dem langs staven.
        </p>

        <p className="mt-3">
          Dette skaper en spenningsforskjell mellom stavens ender:
        </p>

        <FormulaBox
          latex="\mathcal{E} = vBL"
          title="EMF for rett leder i bevegelse"
          variant="gold"
          description="v = lederens fart, B = feltstyrke, L = lederens lengde. Gjelder når v ⊥ B ⊥ L."
        />

        <p className="mt-3">
          Dette resultatet er helt konsistent med Faradays lov: arealet endres med{" "}
          <InlineLatex latex="dA/dt = L \cdot dx/dt = Lv" />, så:
        </p>

        <FormulaBox
          latex="\mathcal{E} = -\frac{d\Phi_B}{dt} = -B\frac{dA}{dt} = -BL\frac{dx}{dt} = -BLv"
          variant="blue"
          description="Faraday gir nøyaktig samme resultat som kraftanalysen!"
        />

        <p className="mt-3">
          Dersom staven har resistans R (eller er koblet til en krets med resistans R):
        </p>

        <FormulaBox
          latex="P = \frac{\mathcal{E}^2}{R} = \frac{B^2L^2v^2}{R}"
          title="Effekt dissipert i kretsen"
          variant="blue"
          description="Energien kommer fra arbeidet som utføres for å holde staven i bevegelse."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Faradays diskdynamo</p>
          <p className="text-sm">
            En metallskive (radius R) roterer med konstant vinkelfart ω i et uniformt magnetfelt B.
            Kun den radielle linjen fra sentrum til kanten bidrar til EMF-en (tangentiell bevegelse, v = ωr):
          </p>
          <FormulaBox
            latex="\mathcal{E} = \int_0^R \omega r B\,dr = \frac{1}{2}\omega B R^2"
            title="Faradays diskdynamo"
            variant="gold"
            description="Denne gir konstant likestrøm (ikke vekselstrøm), fordi vinkelen mellom v og B er konstant."
          />
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Roterende spole → Vekselstrøm</p>
          <p className="text-sm">
            En spole med N vindinger, areal A, roterer med vinkelfart ω i et uniformt felt B.
            Vinkelen endres som <InlineLatex latex="\varphi = \omega t" />, som gir:
          </p>
          <FormulaBox
            latex="\mathcal{E} = NAB\omega\sin(\omega t)"
            title="Vekselstrømgenerator"
            variant="gold"
            description="Sinusformet spenning — grunnlaget for vekselstrøm (AC)."
          />
        </div>
      </TheorySummary>

      {/* AC Generator visualization embedded */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Utforsk vekselstrømgeneratoren — juster N, B, radius og ω og se EMF-kurven:
        </p>
        <ACGeneratorVisualizer />
      </div>
    </div>
  );
}
