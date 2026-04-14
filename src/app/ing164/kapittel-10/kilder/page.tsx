import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 10: Dynamikk i rotasjonsbevegelse.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Torque — Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=jg4e8W44_E4"
          duration="25 min"
          covers="Dreiemoment (10.1–10.2)"
          description="Grundig introduksjon til dreiemoment (tau = r * F * sin(theta)): definisjon, retning (hoyrehandsregelen), fortegn, og beregning av nettomoment. Mange gjennomgatte oppgaver."
        />

        <VideoResource
          title="Rotational Dynamics — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=dbvr-L5rxdg"
          duration="18 min"
          covers="Newtons 2. lov for rotasjon (10.2–10.3)"
          description="Newtons 2. lov for rotasjon (tau_netto = I * alpha): sammenhengen mellom netto dreiemoment, treghetsmoment og vinkelakselerasjon. Oppgaver med trinser, ruller og snorer."
        />

        <VideoResource
          title="Angular Momentum — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=WzjIMuf-yuo"
          duration="16 min"
          covers="Spinn og bevaring av spinnet (10.3–10.4)"
          description="Spinn (L = I * omega): definisjon, retning, og prinsippet om bevaring av spinn. Klassiske eksempler som isskoyteloyer som trekker inn armene, og snurrende hjul."
        />

        <VideoResource
          title="Rotational Power, Work, and Energy"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=KbYejyiRsFw"
          duration="14 min"
          covers="Arbeid og effekt i rotasjon (10.2)"
          description="Arbeid utfort av dreiemoment (W = tau * theta), rotasjonseffekt (P = tau * omega), og arbeid-energi-teoremet for rotasjon. Oppgaver som kobler lineaer og rotasjonsbevegelse."
        />

        <VideoResource
          title="Work Done By a Constant Torque"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=-DPthKuQGyQ"
          duration="10 min"
          covers="Arbeid ved konstant dreiemoment (10.2)"
          description="Beregning av arbeid utfort av et konstant dreiemoment: W = tau * delta-theta, med oppgaver som kombinerer rotasjonsenergi og arbeid."
        />
      </div>
    </div>
  );
}
