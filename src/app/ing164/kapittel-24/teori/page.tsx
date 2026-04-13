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

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig innsikt</p>
          <p>
            Kapasitansen <InlineLatex latex="C" /> er en <strong>geometrisk egenskap</strong> — den
            avhenger kun av kondensatorens form, størrelse og materiale mellom platene.
            Den avhenger <em>ikke</em> av ladning Q eller spenning V.
          </p>
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

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Typiske størrelser</p>
          <p className="text-sm">1 Farad er enormt! Typiske kondensatorer har kapasitanser i:</p>
          <ul className="text-sm mt-1 space-y-0.5">
            <li>• pikofarad: 1 pF = 10⁻¹² F</li>
            <li>• nanofarad: 1 nF = 10⁻⁹ F</li>
            <li>• mikrofarad: 1 µF = 10⁻⁶ F</li>
          </ul>
        </div>

        <p className="mt-4">
          <strong>E-feltet</strong> mellom parallelle plater er uniformt og gitt ved:
        </p>
        <FormulaBox
          latex="E = \frac{V_{ab}}{d}"
          variant="blue"
          description="E-feltet peker fra positiv til negativ plate."
        />

        <div className="mt-6">
          <CapacitorCalculator />
        </div>
      </TheorySummary>

      {/* 24.2 Kondensatorer i serie og parallell */}
      <TheorySummary
        title="24.2 Kondensatorer i serie og parallell"
        mustKnow={[
          "Serie: Lik ladning Q, spenningen fordeles, 1/C_tot = 1/C₁ + 1/C₂ + ...",
          "Parallell: Lik spenning V, ladningen fordeles, C_tot = C₁ + C₂ + ...",
          "Kunne kombinere serie og parallell i sammensatte nettverk",
        ]}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Seriekobling</p>
          <p>
            Kondensatorer i <strong>serie</strong> har <strong>lik ladning Q</strong> på alle plater.
            Spenningen fordeles: <InlineLatex latex="V_{ab} = V_1 + V_2 + \cdots" />
          </p>
        </div>

        <FormulaBox
          latex="\frac{1}{C_\text{tot}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots + \frac{1}{C_n}"
          title="Kondensatorer i serie"
          variant="gold"
          description="Totalkapasitansen i serie er alltid MINDRE enn den minste enkeltkapasitansen."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Parallellkobling</p>
          <p>
            Kondensatorer i <strong>parallell</strong> har <strong>lik spenning V</strong>.
            Ladningen fordeles: <InlineLatex latex="Q_\text{tot} = Q_1 + Q_2 + \cdots" />
          </p>
        </div>

        <FormulaBox
          latex="C_\text{tot} = C_1 + C_2 + \cdots + C_n"
          title="Kondensatorer i parallell"
          variant="gold"
          description="Totalkapasitansen i parallell er summen av alle enkeltkapasitansene."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Huskeregel: Motsetninger</p>
          <p className="text-sm">
            Kondensatorer i serie oppfører seg <strong>motsatt</strong> av motstander i serie:
          </p>
          <ul className="text-sm mt-1 space-y-0.5">
            <li>• Kondensatorer i serie → addér inversene (som motstander i parallell)</li>
            <li>• Kondensatorer i parallell → addér direkte (som motstander i serie)</li>
          </ul>
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
          "Energitetthet i E-felt: u = ½ε₀E²",
          "Energien lagres i det elektriske feltet mellom platene",
        ]}
      >
        <p>
          Den lagrede energien i en kondensator er lik det arbeidet vi må utføre for å lade den opp.
          Denne energien kan hentes ut raskt — brukes i blitz, laserpuls, defibrillatorer etc.
        </p>

        <FormulaBox
          latex="E_p = \frac{Q^2}{2C} = \frac{1}{2}CV^2 = \frac{1}{2}QV"
          title="Potensiell energi lagret i kondensator"
          variant="gold"
          description="Tre ekvivalente uttrykk. Velg det som passer til de kjente størrelsene."
        />

        <p className="mt-4">
          Energien er egentlig lagret i <strong>det elektriske feltet</strong> mellom platene.
          Vi definerer energitetthet (energi per volum):
        </p>

        <FormulaBox
          latex="u = \frac{E_p}{V_\text{olum}} = \frac{1}{2}\varepsilon_0 E^2"
          title="Energitetthet i elektrisk felt"
          variant="gold"
          description="u har enhet J/m³. Gjelder generelt for ALLE elektriske felt, ikke bare i kondensatorer."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig kobling</p>
          <p className="text-sm">
            For en platekondensator er volumet mellom platene <InlineLatex latex="V_\text{olum} = A \cdot d" />.
            Setter vi inn <InlineLatex latex="C = \varepsilon_0 A/d" /> og <InlineLatex latex="V_{ab} = E \cdot d" /> i
            {" "}<InlineLatex latex="\frac{1}{2}CV_{ab}^2" />, får vi nettopp <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> ganger volumet.
          </p>
        </div>
      </TheorySummary>

      {/* 24.4 Dielektrikum */}
      <TheorySummary
        title="24.4 Dielektrikum"
        mustKnow={[
          "Dielektrikumkonstanten K = C/C₀ (alltid ≥ 1)",
          "Dielektrikum øker kapasitansen med faktor K",
          "Dielektrikum reduserer E-feltet: E = E₀/K",
          "Permittivitet: ε = Kε₀",
          "Indusert ladning: Q_i = Q(1 − 1/K)",
        ]}
      >
        <p>
          Mellom platene på en kondensator kan det være et isolerende materiale (<strong>dielektrikum</strong>)
          istedet for vakuum. Et dielektrikum gir tre fordeler:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Hindrer at platene kommer i kontakt med hverandre</li>
          <li>Gjør det mulig å oppnå større spenning uten overslag</li>
          <li>Gjør at kondensatoren får <strong>større kapasitans</strong></li>
        </ul>

        <FormulaBox
          latex="K = \frac{C}{C_0}"
          title="Dielektrikumkonstanten"
          variant="gold"
          description="K er forholdet mellom kapasitansen med og uten dielektrikum. K = 1 for vakuum, K > 1 ellers."
        />

        <p className="mt-4">
          <strong>Indusert ladning og polarisering:</strong> Når vi setter et dielektrikum inn mellom
          platene på en ladet kondensator (frakoblet spenningskilde), er ladningen Q den samme,
          men spenningen synker til <InlineLatex latex="V = V_0/K" />.
        </p>

        <FormulaBox
          latex="E = \frac{E_0}{K} = \frac{\sigma - \sigma_i}{\varepsilon_0}"
          variant="blue"
          description="E-feltet reduseres med faktor K pga. polarisering av dielektrikumet."
        />

        <p className="mt-4">
          Den <strong>induserte ladningen</strong> på dielektrikumets overflate:
        </p>
        <FormulaBox
          latex="Q_i = Q\!\left(1 - \frac{1}{K}\right)"
          variant="blue"
          description="Indusert ladning — mindre enn den frie ladningen Q, motvirker E-feltet delvis."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Permittivitet</p>
          <p>Dielektrikumets elektriske permittivitet er:</p>
          <div className="mt-2">
            <InlineLatex latex="\varepsilon = K\varepsilon_0" />
          </div>
          <p className="text-sm mt-2">
            Med dielektrikum bytter vi ut <InlineLatex latex="\varepsilon_0" /> med <InlineLatex latex="\varepsilon" /> i alle formler:
          </p>
          <ul className="text-sm mt-1 space-y-0.5">
            <li>• <InlineLatex latex="C = K C_0 = K\varepsilon_0 \frac{A}{d} = \varepsilon \frac{A}{d}" /></li>
            <li>• <InlineLatex latex="u = \frac{1}{2}\varepsilon E^2 = \frac{1}{2}K\varepsilon_0 E^2" /></li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
