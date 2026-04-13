"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { LorentzForceCalculator, CircularMotionVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Magnetisk felt og krefter</h2>

      {/* 27.1 Magnetisme */}
      <TheorySummary
        title="27.1 Magnetisme"
        mustKnow={[
          "Alle magneter har to poler: nordpol og sørpol",
          "Like poler frastøter, ulike poler tiltrekker",
          "Magnetiske poler opptrer alltid i par — man kan ikke isolere én pol",
          "Jordkloden er en stor magnet (geografisk nordpol ≈ magnetisk sørpol)",
        ]}
      >
        <p>
          Alle permanente magneter har to poler: <strong>nordpol (N)</strong> og <strong>sørpol (S)</strong>.
          Like poler frastøter hverandre, ulike poler tiltrekker — akkurat som elektriske ladninger,
          men med en viktig forskjell: man kan <em>aldri</em> separere polene. Bryter du en magnet i to,
          får du to mindre magneter, hver med N og S.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Analogi: Elektrisitet vs. magnetisme</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-1 pr-4">Elektrisitet</th>
                  <th className="text-left py-1">Magnetisme</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Positiv/negativ ladning</td>
                  <td className="py-1">Nordpol/sørpol</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Enkeltladninger finnes</td>
                  <td className="py-1">Enkeltpoler finnes IKKE</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">Felt: E (N/C)</td>
                  <td className="py-1">Felt: B (Tesla)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4">
          <strong>Magnetfelt:</strong> Området rundt en magnet hvor det virker magnetiske krefter kalles et
          magnetfelt. Feltets retning er den retningen nordpolen på en kompassnål peker.
        </p>
      </TheorySummary>

      {/* 27.2 Magnetfelt */}
      <TheorySummary
        title="27.2 Magnetfelt og magnetisk kraft på ladede partikler"
        mustKnow={[
          "Magnetisk kraft: F = qv × B (kryssproduktet!)",
          "Størrelse: F = |q|vB sin θ",
          "Kraften er ALLTID vinkelrett på både v og B",
          "Retning: Høyrehåndsregel (for positiv ladning)",
          "Enhet for B: Tesla (T) = N/(C·m/s) = Ns/(C·m)",
        ]}
      >
        <p>
          Eksperimenter viser at det virker <strong>magnetiske krefter på ladede partikler som
          beveger seg i magnetfelt</strong>. Kraften er:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Proporsjonal med ladningens verdi |q|</li>
          <li>Proporsjonal med normalkomponenten av farten (den delen som er vinkelrett på B)</li>
        </ul>

        <FormulaBox
          latex="\vec{F}_m = q\vec{v} \times \vec{B}"
          title="Magnetisk kraft (Lorentzkraften)"
          variant="gold"
          description="Kryssproduktet gir en kraft vinkelrett på BÅDE v og B. Retning fra høyrehåndsregelen."
        />

        <FormulaBox
          latex="F_m = |q| v B \sin\theta"
          title="Størrelsen av magnetkraften"
          variant="gold"
          description="θ er vinkelen mellom v og B. Maks kraft når θ = 90° (v ⊥ B). Null kraft når θ = 0° (v ∥ B)."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Høyrehåndsregelen</p>
          <ol className="text-sm space-y-1">
            <li>1. Pek fingrene i retning <strong>v</strong> (partikkelens fart)</li>
            <li>2. Bøy fingrene mot <strong>B</strong> (magnetfeltets retning)</li>
            <li>3. Tommelen peker i retning <strong>F</strong> (kraften) for <em>positiv</em> ladning</li>
            <li>4. For negativ ladning: <strong>snu retningen</strong></li>
          </ol>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig: Magnetkraften gjør IKKE arbeid</p>
          <p className="text-sm">
            Siden kraften alltid står vinkelrett på farten, endrer den bare <em>retningen</em> — aldri
            <em> farten</em> (kinetisk energi). Magnetkraften gjør derfor null arbeid: <InlineLatex latex="W = 0" />.
          </p>
        </div>

        {/* Inline visualisering */}
        <LorentzForceCalculator />
      </TheorySummary>

      {/* 27.3 Magnetiske feltlinjer og magnetisk fluks */}
      <TheorySummary
        title="27.3 Magnetiske feltlinjer og magnetisk fluks"
        mustKnow={[
          "Feltlinjer: alltid parallelle med B, fra N til S utenfor magneten",
          "Magnetiske feltlinjer er lukkede kurver (ingen start/slutt)",
          "Magnetisk fluks: Φ_B = BA cos φ",
          "Enhet for fluks: Weber (Wb) = T·m²",
          "Konvensjon: · = ut av arket, × = inn i arket",
        ]}
      >
        <p>
          Magnetfelt kan representeres med <strong>magnetiske feltlinjer</strong>.
          De er overalt parallelle med <InlineLatex latex="\vec{B}" />.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Feltlinjekonvensjon</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Prikker (·)</strong> = magnetfeltet peker <strong>ut av arket</strong> (mot deg)</li>
            <li>• <strong>Kryss (×)</strong> = magnetfeltet peker <strong>inn i arket</strong> (bort fra deg)</li>
            <li>• Tenk på en pil: <em>spissen</em> (·) = mot deg, <em>halen</em> (×) = bort fra deg</li>
          </ul>
        </div>

        <p className="mt-4"><strong>Magnetisk fluks</strong> gjennom en flate med areal A:</p>

        <FormulaBox
          latex="\Phi_B = B_\perp A = BA\cos\varphi"
          title="Magnetisk fluks"
          variant="gold"
          description="φ er vinkelen mellom B og flatens normalvektor. Enhet: Weber (Wb) = T·m²."
        />

        <p className="mt-2">
          Når B varierer over flaten: <InlineLatex latex="\Phi_B = \int B_\perp \, dA = \int B\cos\varphi \, dA" />
        </p>
      </TheorySummary>

      {/* 27.4 Bevegelse av ladede partikler */}
      <TheorySummary
        title="27.4 Bevegelse av ladede partikler i magnetfelt"
        mustKnow={[
          "v ⊥ B → sirkelbane med radius r = mv/(|q|B)",
          "Vinkelfart: ω = |q|B/m (uavhengig av v!)",
          "v ikke ⊥ B → spiralbane (heliks)",
          "Parallell komponent v∥ endres ikke",
        ]}
      >
        <p>
          Siden magnetkraften alltid står vinkelrett på farten, kan den ikke endre fartens
          <em> verdi</em> — bare fartens <em>retning</em>. Når <InlineLatex latex="\vec{v} \perp \vec{B}" />,
          følger ladningen en <strong>sirkelbane</strong>.
        </p>

        <p className="mt-2">Fra Newtons 2. lov med sentripetalkraft:</p>
        <FormulaBox
          latex="|q|vB = m\frac{v^2}{r} \quad \Rightarrow \quad r = \frac{mv}{|q|B}"
          title="Radius i sirkelbane"
          variant="gold"
          description="Større masse eller fart → større radius. Sterkere felt eller mer ladning → mindre radius."
        />

        <FormulaBox
          latex="\omega = \frac{v}{r} = \frac{|q|B}{m}"
          title="Syklotronfrekvens (vinkelfart)"
          variant="blue"
          description="Bemerk: ω er uavhengig av farten v! Alle partikler med lik q/m roterer med samme frekvens."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Spiralbane (heliks)</p>
          <p className="text-sm">
            Dersom <InlineLatex latex="\vec{v}" /> ikke er vinkelrett på <InlineLatex latex="\vec{B}" />,
            dekomponerer vi: <InlineLatex latex="v_\perp" /> (gir sirkelbane) og <InlineLatex latex="v_\parallel" /> (endres ikke).
            Resultatet er en spiralbane med radius <InlineLatex latex="r = mv_\perp / (|q|B)" />.
          </p>
        </div>

        {/* Inline visualisering */}
        <CircularMotionVisualizer />
      </TheorySummary>

      {/* 27.5 Anvendelser */}
      <TheorySummary
        title="27.5 Anvendelser: Fartsvelger og massespektrometer"
        mustKnow={[
          "Fartsvelger: v = E/B når Fe = Fm",
          "Massespektrometer: R = mv/(qB') → bestem masse m",
        ]}
      >
        <p><strong>Fartsvelger:</strong> E-felt og B-felt står vinkelrett på hverandre og på partikkelens fart.
          Når den elektriske og magnetiske kraften balanserer:
        </p>
        <FormulaBox
          latex="qE = qvB \quad \Rightarrow \quad v = \frac{E}{B}"
          title="Fartsvelger"
          variant="gold"
          description="Bare partikler med denne farten passerer uavbøyd. Uavhengig av masse og ladning!"
        />

        <p className="mt-4">
          <strong>Massespektrometer:</strong> Partikler med kjent fart (fra fartsvelger) sendes inn
          i et nytt magnetfelt B&apos;. De følger en sirkelbane med radius:
        </p>
        <FormulaBox
          latex="R = \frac{mv}{qB'}"
          variant="blue"
          description="R kan måles, v er kjent, q = e, B' er kjent → m kan beregnes."
        />
      </TheorySummary>

      {/* 27.6 Magnetkraft på strømførende leder */}
      <TheorySummary
        title="27.6 Magnetkraft på en strømførende leder"
        mustKnow={[
          "Kraft på strømførende leder: F = IlB sin θ",
          "Vektorform: F = Il × B",
          "l-vektoren peker i strømretningen",
          "Retning: Høyrehåndsregelen (pek fingrene i strømretningen)",
        ]}
      >
        <p>
          Inne i en strømførende leder har vi ladninger q som beveger seg med driftsfart <InlineLatex latex="v_d" />.
          I et magnetfelt virker det magnetkrefter på lederen.
        </p>

        <FormulaBox
          latex="F_m = IlB\sin\theta"
          title="Magnetkraft på strømførende leder"
          variant="gold"
          description="I = strøm, l = lederens lengde, B = feltstyrke, θ = vinkel mellom l og B."
        />

        <FormulaBox
          latex="\vec{F}_m = I\vec{l} \times \vec{B}"
          title="Vektorform"
          variant="gold"
          description="l-vektoren peker i strømretningen. Kraften er vinkelrett på både strøm og felt."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Utledning fra Lorentzkraften</p>
          <p className="text-sm">
            Antall ladninger i lederen: <InlineLatex latex="N = nAl" /> (n = ladningskonsentrasjon).
            Total kraft = N · kraft per ladning: <InlineLatex latex="F = (nAlqv_d)B\sin\theta = (nqv_d)(AlB\sin\theta)" />.
            Siden <InlineLatex latex="I = nqv_dA" />, får vi <InlineLatex latex="F = IlB\sin\theta" />.
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
