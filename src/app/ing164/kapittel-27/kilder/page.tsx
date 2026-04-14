import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 27: Magnetisk felt og krefter.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Magnetism, Magnetic Field Force, Right Hand Rule, Ampere's Law, Torque, Solenoid"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=csMqfwJRjCs"
          duration="52 min"
          covers="Hele kapittelet"
          description="Omfattende gjennomgang av magnetisme: magnetfelt, magnetisk kraft pa ladde partikler (F = qvB sin theta), hoyrehandsregelen, kraft pa stromforende leder, dreiemoment pa stroemsloeyfe, og bevegelse i magnetfelt. Mange gjennomgatte oppgaver."
        />

        <VideoResource
          title="Physics 2 — Basic Introduction"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=rHgKLIYcZOI"
          duration="57 min"
          covers="Magnetisk kraft — oversikt (27.1–27.3)"
          description="Bred introduksjon som inkluderer magnetisk kraft pa ladde partikler, Lorentz-kraften, og sirkelbevegelse i magnetfelt. Gir kontekst for hele elektromagnetisme-emnet."
        />

        <VideoResource
          title="Classical Physics — Magnetic Fields and Forces"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave sine videoer om magnetfelt, magnetisk kraft, hoyrehandsregelen, og bevegelse av ladde partikler i magnetfelt. Korte videoer med gode animasjoner."
        />
      </div>
    </div>
  );
}
