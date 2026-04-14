import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 7: Potensiell energi og energibevaring.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Kinetic Energy and Potential Energy"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=DyaVgHGssos"
          duration="18 min"
          covers="Gravitasjonell potensiell energi (7.1–7.2)"
          description="Introduksjon til gravitasjonell potensiell energi (U = mgh), konvertering mellom kinetisk og potensiell energi, og bevaring av mekanisk energi. Flere gjennomgatte eksempler."
        />

        <VideoResource
          title="Hooke's Law and Elastic Potential Energy"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=k3JRvaI-Oeo"
          duration="30 min"
          covers="Elastisk potensiell energi og fjerkraft (7.2–7.3)"
          description="Hookes lov (F = -kx), elastisk potensiell energi (U = 1/2 kx^2), fjerkonstant, og arbeid utfort av en fjer. Gjennomgatte oppgaver med fjaerer kombinert med energibevaring."
        />

        <VideoResource
          title="Conservation of Energy — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=DyaVgHGssos"
          duration="18 min"
          covers="Energibevaring (7.1–7.4)"
          description="Prinsippet om bevaring av mekanisk energi: KE + PE = konstant (uten friksjon). Overgang mellom gravitasjonell og kinetisk energi, og oppgaver med hoyde, fart og energibalanse."
        />

        <VideoResource
          title="Classical Physics — Conservation of Energy"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave sine videoer om konservative krefter, potensiell energi, og energibevaring. Gir god intuisjon for hvorfor energi er bevart i lukkede systemer."
        />
      </div>
    </div>
  );
}
