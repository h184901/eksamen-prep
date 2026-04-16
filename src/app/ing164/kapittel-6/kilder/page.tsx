import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 6: Arbeid og kinetisk energi.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Kinetic Energy and Potential Energy"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=DyaVgHGssos"
          duration="18 min"
          covers="Kinetisk energi og arbeid-energi-teoremet (6.1–6.3)"
          description="Grundig introduksjon til kinetisk og potensiell energi: definisjoner, formler (E_k = 1/2 mv^2), arbeid-energi-teoremet, og beregning av arbeid utfort av krefter. Flere gjennomgatte eksempler."
        />

        <VideoResource
          title="Work, Energy, & Power — Formulas and Equations"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=w4QFJb9a8vo"
          duration="3 t"
          covers="Hele kapittelet — omfattende"
          description="Omfattende gjennomgang av arbeid, energi og effekt: W = Fd cos(theta), arbeid-energi-teoremet, arbeid utfort av variabel kraft, effekt P = W/t, og mange oppgaver i ulike vanskelighetsgrader."
        />

        <VideoResource
          title="Classical Physics — Work and Energy"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Korte, konsise videoer om arbeid, kinetisk energi, og arbeid-energi-teoremet. Professor Dave forklarer konseptene intuitivt med gode visualiseringer."
        />
      </div>
    </div>
  );
}
