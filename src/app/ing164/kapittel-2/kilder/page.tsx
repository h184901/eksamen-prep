import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 2: Rettlinjet bevegelse.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Physics - Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=-6IgkG5yZfo&list=PL0o_zxa4K1BU6wPPLDsoTj1_wEf0LSNeR"
          duration="41 min"
          covers="Hele kapittelet"
          description="Omfattende introduksjon til kinematikk i 1D. Dekker forflytning vs. avstand, hastighet vs. fart, gjennomsnittlig og momentan hastighet, akselerasjon, og de kinematiske likningene med gjennomgåtte eksempler."
        />

        <VideoResource
          title="Kinematics In One Dimension"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=jJGwTt2c2pE"
          duration="1 t 52 min"
          covers="Hele kapittelet — dybdegjennomgang"
          description="Fullstendig gjennomgang av rettlinjet bevegelse: skalarer vs. vektorer, forflytning, hastighet, akselerasjon, fritt fall, og en mengde oppgaver med steg-for-steg-løsninger. Perfekt for grundig repetisjon."
        />

        <VideoResource
          title="Classical Physics — Kinematics"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave sin spilleliste for klassisk fysikk starter med kinematikk: horisontal bevegelse, vertikal bevegelse (fritt fall), og kinematiske likninger — korte, konsise videoer med klar pedagogikk."
        />
      </div>
    </div>
  );
}
