import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 4: Newtons lover.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Newton's Law of Motion — First, Second & Third — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=g550H4e5FCY"
          duration="38 min"
          covers="Hele kapittelet"
          description="Grundig gjennomgang av alle tre Newtons lover: treghetsloven (1. lov), F = ma (2. lov), og aksjon-reaksjon (3. lov). Mange eksempler med frilegmediagram, akselerasjon, og kraftberegninger."
        />

        <VideoResource
          title="Normal Force Physics Problems"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=uyJTwljKSJ4"
          duration="21 min"
          covers="Normalkraft og frilegmediagram (4.2–4.4)"
          description="Normalkraft i ulike situasjoner: horisontalt plan, i heis (akselererende system), skraplan, og med pasatte krefter. Steg-for-steg-losning med frilegmediagram."
        />

        <VideoResource
          title="Contact Forces Between Two Blocks — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=Iin29KFE4So"
          duration="15 min"
          covers="Newtons 3. lov — kontaktkrefter (4.3–4.4)"
          description="Kontaktkrefter mellom klosser som skyves: aksjon-reaksjon-par, system vs. enkelt-objekt-analyse, og hvordan lose oppgaver med flere legemer."
        />

        <VideoResource
          title="Classical Physics — Newton's Laws"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave sine videoer om Newtons lover, masse, vekt, og frilegmediagram. Klar og konsis forklaring av konseptene med visuelle illustrasjoner."
        />
      </div>
    </div>
  );
}
