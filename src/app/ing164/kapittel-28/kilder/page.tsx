import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 28: Kilder til magnetfelt.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Magnetism, Magnetic Field Force, Right Hand Rule, Ampere's Law, Torque, Solenoid"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=csMqfwJRjCs"
          duration="52 min"
          covers="Hele kapittelet"
          description="Dekker ogsa kilder til magnetfelt: Amperes lov, magnetfelt fra rett leder (B = mu_0 * I / 2*pi*r), magnetfelt i solenoide (B = mu_0 * n * I), og kraft mellom parallelle ledere. Steg-for-steg-oppgaver."
        />

        <VideoResource
          title="Biot-Savart Law"
          channel="Khan Academy"
          url="https://www.khanacademy.org/science/electromagnetism/x4352f0cb3cc997f5:why-are-magnets-magnetic-and-why-are-other-things-not/x4352f0cb3cc997f5:magnetism-of-wires/v/biot-savart-law-vector-form"
          duration="15 min"
          covers="Biot-Savarts lov (28.1–28.2)"
          description="Khan Academy forklarer Biot-Savarts lov i vektorform: beregning av magnetfelt fra et stromelement, retningsbestemmelse med kryssproduktet, og integrasjon langs en stroemfoerende leder."
        />

        <VideoResource
          title="Classical Physics — Sources of Magnetic Field"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave dekker Biot-Savarts lov, Amperes lov, solenoider, og toroider. Forklarer nar man bruker hvilken lov avhengig av symmetri."
        />
      </div>
    </div>
  );
}
