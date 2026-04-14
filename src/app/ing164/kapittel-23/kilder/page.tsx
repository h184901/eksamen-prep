import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 23: Elektrisk potensial.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Electric Potential Energy"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=KoZ61FujkRk"
          duration="30 min"
          covers="Potensiell energi og potensial (23.1–23.2)"
          description="Elektrisk potensiell energi mellom ladninger (U = kq1q2/r), elektrisk potensial (V = kQ/r), og spenningsforskjell. Gjennomgatte oppgaver med punktladninger og parallelle plater."
        />

        <VideoResource
          title="Physics 2 — Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=rHgKLIYcZOI"
          duration="57 min"
          covers="Elektrisk potensial — del av helheten (23.1–23.4)"
          description="Bred introduksjon som inkluderer elektrisk potensial, spenning, ekvipotensialflater, og sammenhengen mellom E-felt og potensial. Gir god kontekst for hele emnet."
        />

        <VideoResource
          title="Classical Physics — Electric Potential"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave forklarer elektrisk potensial, spenning, ekvipotensiallinjer, og arbeid utfort av elektriske krefter. Kort og konsist med gode illustrasjoner."
        />
      </div>
    </div>
  );
}
