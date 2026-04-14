import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 8: Bevegelsesmengde og kollisjoner.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Introduction to Impulse & Momentum"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=hODlmGK7pl8"
          duration="20 min"
          covers="Impuls og bevegelsesmengde (8.1–8.2)"
          description="Grunnleggende introduksjon til bevegelsesmengde (p = mv) og impuls (J = F * delta-t). Sammenhengen mellom impuls og endring i bevegelsesmengde, med gjennomgatte oppgaver."
        />

        <VideoResource
          title="Conservation of Momentum — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=Fp7D5D8Bqjc"
          duration="22 min"
          covers="Bevaring av bevegelsesmengde (8.2–8.3)"
          description="Prinsippet om bevaring av bevegelsesmengde: nar ytre krefter er null. Beregning av hastigheter for og etter kollisjoner med steg-for-steg-eksempler."
        />

        <VideoResource
          title="Elastic Collisions In One Dimension"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=CFbo_nBdBco"
          duration="17 min"
          covers="Elastiske kollisjoner (8.3)"
          description="Elastiske kollisjoner i 1D: bade kinetisk energi og bevegelsesmengde er bevart. Snarveisformel for slutthastigheter og gjennomgatte oppgaver."
        />

        <VideoResource
          title="Inelastic Collision Physics Problems"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=C1XuwHLacao"
          duration="15 min"
          covers="Uelastiske kollisjoner (8.3)"
          description="Uelastiske kollisjoner: objekter som kleber seg sammen etter kollisjon. Beregning av felles slutthastighet, tap av kinetisk energi, og ballistic pendel-oppgaver."
        />

        <VideoResource
          title="Elastic Collisions In Two Dimensions"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=9YRgHikdcqs"
          duration="13 min"
          covers="2D-kollisjoner (8.4)"
          description="Kollisjoner i to dimensjoner: bevaring av bevegelsesmengde i bade x- og y-retning, vektoroppdeling, og beregning av utgangsvinkler etter kollisjon."
        />

        <VideoResource
          title="Impulse Momentum Theorem — Physics Problems"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=1WIECGg71WY"
          duration="16 min"
          covers="Impuls-bevegelsesmengde-teoremet (8.1)"
          description="Impuls-bevegelsesmengde-teoremet i praksis: gjennomsnittskraft, kontakttid, endring i bevegelsesmengde, og kraft-tid-diagrammer med oppgaver."
        />
      </div>
    </div>
  );
}
