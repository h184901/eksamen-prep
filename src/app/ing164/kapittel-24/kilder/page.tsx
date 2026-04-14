import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 24: Kapasitans og dielektrika.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Capacitors — Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=BimpNou0orc"
          duration="28 min"
          covers="Kapasitans og kondensatorer (24.1–24.2)"
          description="Grunnleggende om kondensatorer: kapasitans (C = Q/V), parallellplatekondensator (C = epsilon_0 * A/d), serie- og parallellkobling, og beregning av ekvivalent kapasitans. Mange oppgaver."
        />

        <VideoResource
          title="Dielectrics & Capacitors — Capacitance, Voltage & Electric Field"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=HmZ4iK1T1bg"
          duration="14 min"
          covers="Dielektrika (24.3–24.4)"
          description="Dielektriske materialer i kondensatorer: dielektrisk konstant (kappa), hvordan dielektrikum oker kapasitans, og effekten pa spenning og elektrisk felt. Oppgaver med og uten dielektrikum."
        />

        <VideoResource
          title="How To Solve Any Circuit Problem With Capacitors In Series and Parallel"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=MrGMinKRmAw"
          duration="33 min"
          covers="Serie- og parallellkobling (24.2)"
          description="Systematisk metode for a lose kapasitans-kretser: identifisering av serie- og parallellkoblinger, trinnvis forenkling, og beregning av ladning og spenning over hver kondensator."
        />
      </div>
    </div>
  );
}
