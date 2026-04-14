import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 9: Rotasjon av stive legemer.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Rotational Motion — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=WQ9AH2S8B6Y"
          duration="25 min"
          covers="Hele kapittelet — oversikt"
          description="Bred introduksjon til rotasjonsbevegelse: vinkelhastighet, vinkelakselerasjon, omregning mellom grader og radianer, periode og frekvens, og sammenhengen mellom lineaere og vinkelstorrelser."
        />

        <VideoResource
          title="Rotational Kinematics — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=0El-DqrCTZM"
          duration="20 min"
          covers="Rotasjonskinematikk (9.1–9.2)"
          description="De kinematiske likningene for rotasjon: omega = omega_0 + alpha*t, theta = omega_0*t + 1/2*alpha*t^2, osv. Analogi med lineaer kinematikk og mange oppgaver med losning."
        />

        <VideoResource
          title="Inertia — Basic Introduction, Torque, Angular Acceleration"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=Ic_wFYu8xVs"
          duration="22 min"
          covers="Treghetsmoment (9.3–9.4)"
          description="Treghetsmoment (I) for ulike geometrier: stav, sylinder, kule, ring. Tabell over treghetsmomenter, og hvordan I avhenger av massefordeling og rotasjonsakse."
        />

        <VideoResource
          title="Parallel Axis Theorem & Moment of Inertia"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=JrkimXqnCLw"
          duration="12 min"
          covers="Parallellakse-teoremet (9.4)"
          description="Parallellakse-teoremet (I = I_cm + Md^2): hvordan beregne treghetsmoment om en akse som ikke gar gjennom massesenteret. Gjennomgatte eksempler med stav og sylinder."
        />

        <VideoResource
          title="Rotational Kinetic Energy"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=REIP2mf6sIQ"
          duration="15 min"
          covers="Rotasjonsenergi (9.4)"
          description="Rotasjonskinetisk energi (KE = 1/2 * I * omega^2): beregning for ulike objekter, og total kinetisk energi for et objekt som bade roterer og translerer (ruller uten a gli)."
        />
      </div>
    </div>
  );
}
