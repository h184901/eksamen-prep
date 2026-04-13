"use client";

import TheorySummary from "@/components/TheorySummary";
import InlineLatex from "@/components/InlineLatex";
import { TorqueCalculator, RollingWithoutSlipping, AngularMomentumVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      <TheorySummary
        title="10.1 Kraftmoment (dreiemoment / torque)"
        mustKnow={[
          "τ = rF sin φ — kraftmoment avhenger av kraft, arm og vinkel",
          "Alternativt: τ = (momentarm) × F, der momentarm = r sin φ",
          "Fortegn: mot klokka = positiv, med klokka = negativ",
          "Kraftmoment er rotasjonens svar på kraft",
        ]}
        defaultOpen
      >
        <p className="mb-3">
          <strong>Kraftmoment</strong> (torque) <InlineLatex latex="\tau" /> er det som får et legeme til å rotere, akkurat som kraft <InlineLatex latex="F" /> får det til å akselerere lineært. Definisjonen er:
        </p>
        <p className="mb-3 text-center">
          <InlineLatex latex="\tau = rF\sin\phi" />
        </p>
        <p className="mb-3">
          der <InlineLatex latex="r" /> er avstanden fra rotasjonsaksen til angrepspunktet, <InlineLatex latex="F" /> er kraften, og <InlineLatex latex="\phi" /> er vinkelen mellom <InlineLatex latex="\vec{r}" /> og <InlineLatex latex="\vec{F}" />.
        </p>
        <p>
          <strong>Nøkkelinnsikt:</strong> Bare kraftkomponenten <em>vinkelrett</em> på armen bidrar til rotasjon. En kraft langs armen (φ = 0° eller 180°) gir null dreiemoment — tenk dørhåndtak vs. å dytte rett mot hengslet!
        </p>
      </TheorySummary>

      <TorqueCalculator />

      <TheorySummary
        title="10.2 Newtons 2. lov for rotasjon"
        mustKnow={[
          "Στ = Iα — summen av kraftmomentene bestemmer vinkelakselerasjonen",
          "Analogt med ΣF = ma for lineær bevegelse",
          "Bruk samme fremgangsmåte som for Newtons 2. lov: frilegemediagram, summer τ, sett lik Iα",
        ]}
      >
        <p className="mb-3">
          Newtons andre lov for rotasjon er <InlineLatex latex="\sum\tau = I\alpha" />, som er direkte analog med <InlineLatex latex="\sum F = ma" />. Strategien er den samme:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Tegn frilegemediagram med alle krefter</li>
          <li>Velg rotasjonsakse</li>
          <li>Beregn <InlineLatex latex="\tau" /> fra hver kraft (med fortegn!)</li>
          <li>Summer til <InlineLatex latex="\sum\tau" /> og sett lik <InlineLatex latex="I\alpha" /></li>
          <li>Løs for ukjent (<InlineLatex latex="\alpha" />, <InlineLatex latex="F" />, eller annet)</li>
        </ol>
        <p>
          <strong>Viktig detalj:</strong> Tyngdekraften virker i massesenteret. Normalkraft og friksjon virker i kontaktpunktet.
        </p>
      </TheorySummary>

      <TheorySummary
        title="10.3 Rulling uten glidning"
        mustKnow={[
          "v_CM = Rω — betingelse for rulling uten glidning",
          "Kontaktpunktet har null hastighet (momentant)",
          "Total kinetisk energi: K = ½mv²_CM + ½Iω²",
          "Statisk friksjon driver rullingen — IKKE kinetisk",
        ]}
      >
        <p className="mb-3">
          Et objekt som ruller uten å gli har en spesiell sammenheng mellom <InlineLatex latex="v_{CM}" /> og <InlineLatex latex="\omega" />:
        </p>
        <p className="mb-3 text-center font-semibold">
          <InlineLatex latex="v_{CM} = R\omega" />
        </p>
        <p className="mb-3">
          <strong>Hastighet på ulike punkter:</strong> Kontaktpunktet har <InlineLatex latex="v = 0" /> (momentan stillstand), massesenteret har <InlineLatex latex="v = v_{CM}" />, og toppen har <InlineLatex latex="v = 2v_{CM}" />.
        </p>
        <p className="mb-3">
          <strong>Energi ved rulling:</strong> <InlineLatex latex="K_\text{tot} = \tfrac{1}{2}mv_{CM}^2 + \tfrac{1}{2}I\omega^2" />. For en disk: <InlineLatex latex="K = \tfrac{3}{4}mv_{CM}^2" />, for en ring: <InlineLatex latex="K = mv_{CM}^2" />.
        </p>
        <p>
          <strong>Friksjon:</strong> Det er <em>statisk</em> friksjon som sørger for rulling uten glidning. Den gjør ingen arbeid (kontaktpunktet har <InlineLatex latex="v = 0" />), men den skaper kraftmomentet som gir vinkelakselerasjon.
        </p>
      </TheorySummary>

      <RollingWithoutSlipping />

      <TheorySummary
        title="10.4 Arbeid og effekt i rotasjon"
        mustKnow={[
          "W = τ Δθ — arbeid utført av et konstant kraftmoment",
          "P = τω — effekt i rotasjon",
          "Arbeid-energi-teoremet: W_tot = ΔK_rot = ½Iω² − ½Iω₀²",
        ]}
      >
        <p className="mb-3">
          Akkurat som lineært arbeid er <InlineLatex latex="W = F \cdot d" />, er rotasjonsarbeid <InlineLatex latex="W = \tau \cdot \Delta\theta" />. Effekten er <InlineLatex latex="P = \tau\omega" />.
        </p>
        <p>
          Arbeid-energi-teoremet fungerer også her: det totale arbeidet utført av alle kraftmomenter er lik endringen i rotasjonsenergi.
        </p>
      </TheorySummary>

      <TheorySummary
        title="10.5 Angulært moment (dreieimpuls)"
        mustKnow={[
          "L = r × mv for en partikkel (vektorprodukt!)",
          "L = Iω for et stivt legeme",
          "τ = dL/dt — kraftmoment er endringsrate av angulært moment",
          "Analogt med F = dp/dt for lineær bevegelse",
        ]}
      >
        <p className="mb-3">
          <strong>Angulært moment</strong> (dreieimpuls) er rotasjonens svar på lineær bevegelsesmengde. For en partikkel: <InlineLatex latex="\vec{L} = \vec{r} \times m\vec{v}" />, med størrelse <InlineLatex latex="|\vec{L}| = rmv\sin\phi" />.
        </p>
        <p className="mb-3">
          For et stivt legeme som roterer om en fast akse: <InlineLatex latex="L = I\omega" />.
        </p>
        <p>
          Sammenhengen med kraftmoment: <InlineLatex latex="\sum\vec{\tau} = \frac{d\vec{L}}{dt}" />, analogt med <InlineLatex latex="\vec{F} = \frac{d\vec{p}}{dt}" />. Dersom <InlineLatex latex="I" /> er konstant gir dette <InlineLatex latex="\sum\tau = I\alpha" /> som vi kjenner fra 10.2.
        </p>
      </TheorySummary>

      <TheorySummary
        title="10.6 Bevaring av angulært moment"
        mustKnow={[
          "Hvis Στ_ext = 0, er L = Iω = konstant",
          "I₁ω₁ = I₂ω₂ — brukes for å finne ny ω når I endres",
          "Kinetisk energi er IKKE bevart ved endring av I",
          "Eksempler: piruett, kollaps av stjerner, syklende som snur hjul",
        ]}
      >
        <p className="mb-3">
          Dersom summen av ytre kraftmoment på et system er null, er angulært moment bevart:
        </p>
        <p className="mb-3 text-center font-semibold">
          <InlineLatex latex="\sum\tau_\text{ext} = 0 \implies L = I\omega = \text{konstant}" />
        </p>
        <p className="mb-3">
          <strong>Konsekvens:</strong> Når <InlineLatex latex="I" /> minker, MÅ <InlineLatex latex="\omega" /> øke (og omvendt). Kunstløperen som trekker armene inn spinner fortere!
        </p>
        <p>
          <strong>OBS:</strong> Selv om <InlineLatex latex="L" /> er bevart, er <InlineLatex latex="K_\text{rot}" /> generelt IKKE bevart. Når kunstløperen trekker armene inn gjør hun arbeid, og <InlineLatex latex="K" /> øker.
        </p>
      </TheorySummary>

      <AngularMomentumVisualizer />
    </div>
  );
}
