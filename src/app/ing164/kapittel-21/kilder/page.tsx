import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 21: Elektrisk ladning og felt.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Electric Charge — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=VD009jiZreo"
          duration="15 min"
          covers="Elektrisk ladning (21.1)"
          description="Grunnleggende om elektrisk ladning: positive og negative ladninger, elementaerladning, ladningsbevaring, ledere og isolatorer, og indusert ladning."
        />

        <VideoResource
          title="Coulomb's Law — Net Electric Force & Point Charges"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=kCp5yYjo9zE"
          duration="35 min"
          covers="Coulombs lov (21.2–21.3)"
          description="Coulombs lov (F = kq1q2/r^2): beregning av elektrisk kraft mellom punktladninger, nettokraft fra flere ladninger, og vektoraddisjon av krefter. Mange oppgaver med steg-for-steg-losning."
        />

        <VideoResource
          title="Electric Flux, Gauss's Law & Electric Fields"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=q1eor6oIuUo"
          duration="12 min"
          covers="Elektrisk felt og feltlinjer (21.4)"
          description="Elektrisk felt (E = kQ/r^2), elektrisk fluks, og Gauss' lov. Beregning av felt fra punktladninger og ladningsfordelinger, og feltlinjediagrammer."
        />

        <VideoResource
          title="Physics 2 — Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=rHgKLIYcZOI"
          duration="57 min"
          covers="Hele E&M-kapittelet — oversikt"
          description="Bred introduksjon til elektrisitet og magnetisme: elektrisk kraft, elektrisk felt, elektrisk potensial, og Gauss' lov. Gir god oversikt over hele emnet for deg som onsker en samlet gjennomgang."
        />
      </div>
    </div>
  );
}
