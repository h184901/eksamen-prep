import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 29: Elektromagnetisk induksjon.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Faraday's & Lenz's Law of Electromagnetic Induction, Induced EMF, Magnetic Flux, Transformers"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=jz92oOkJFNA"
          duration="45 min"
          covers="Hele kapittelet"
          description="Komplett gjennomgang av elektromagnetisk induksjon: magnetisk fluks, Faradays lov (EMF = -d(phi)/dt), Lenz' lov (retningsbestemmelse), indusert EMF i bevegelig leder, og transformatorer. Mange gjennomgatte oppgaver."
        />

        <VideoResource
          title="Magnetic Flux — Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=HnHZ0o8JlMs"
          duration="12 min"
          covers="Magnetisk fluks (29.1)"
          description="Magnetisk fluks (Phi = B * A * cos theta): definisjon, beregning for ulike vinkler mellom felt og flate, og sammenhengen med Faradays lov. Oppgaver med steg-for-steg-losning."
        />

        <VideoResource
          title="Maxwell's Equations, Electromagnetic Waves, Displacement Current, & Poynting Vector"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=mOEFTX9DAEw"
          duration="40 min"
          covers="Maxwells likninger — utvidet perspektiv (29.4)"
          description="Maxwells likninger samler all elektromagnetisme: Gauss' lover, Faradays lov, og Ampere-Maxwells lov. Gir et helhetlig bilde av sammenhengen mellom elektriske og magnetiske felt."
        />

        <VideoResource
          title="Classical Physics — Electromagnetic Induction"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave forklarer Faradays lov, Lenz' lov, induktans, og RL-kretser. Gode animasjoner som viser hvordan endring i magnetisk fluks induserer EMF."
        />
      </div>
    </div>
  );
}
