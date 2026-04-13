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
        <p>
          Fortegnskonvensjon (høyrehåndsregelen): Krum fingrene i rotasjonsretningen — tommelen peker langs <InlineLatex latex="\omega" />-vektoren. Mot klokka (sett fra positiv akse) gir <InlineLatex latex="\omega > 0" />.
        </p>
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
        <div className="grid sm:grid-cols-2 gap-3">
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
        <p>
          <strong>Nøkkelinnsikt:</strong> Alle punkter på et stivt legeme har <em>samme</em> <InlineLatex latex="\omega" /> og <InlineLatex latex="\alpha" />, men ulik lineær fart <InlineLatex latex="v" /> — punkter lenger fra aksen beveger seg raskere.
        </p>
      </TheorySummary>

      <TheorySummary
        title="9.4 Treghetsmoment og rotasjonsenergi"
        mustKnow={[
          "I = Σ m_i r_i² er rotasjonens svar på masse",
          "Kinetisk rotasjonsenergi: K = ½Iω²",
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
        <p>
          Kinetisk rotasjonsenergi: <InlineLatex latex="K_\text{rot} = \tfrac{1}{2}I\omega^2" /> — analogt med <InlineLatex latex="K = \tfrac{1}{2}mv^2" />.
        </p>
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
        <p>
          Merk: <InlineLatex latex="I_{CM}" /> er alltid den <em>minste</em> verdien. Enhver forskyvning av aksen <em>øker</em> I med <InlineLatex latex="Md^2" />. Eksempel: Tynn stav om senter har <InlineLatex latex="I = \tfrac{1}{12}ML^2" />, om enden: <InlineLatex latex="I = \tfrac{1}{12}ML^2 + M(\tfrac{L}{2})^2 = \tfrac{1}{3}ML^2" />.
        </p>
      </TheorySummary>

      {/* Inline visualisering: parallellakse-teoremet */}
      <ParallelAxisVisualizer />
    </div>
  );
}
