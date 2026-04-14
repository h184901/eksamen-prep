import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 5: Anvendelse av Newtons lover.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Static & Kinetic Friction, Tension, Normal Force, Inclined Plane & Pulley System Problems"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=pL2YfC-22Uc"
          duration="46 min"
          covers="Friksjon og skraplan (5.1–5.3)"
          description="Alt om friksjon og skraplan: statisk vs. kinetisk friksjon, friksjonskoeffisienter, skraplan med og uten friksjon, trinser, tau og snordrag. Mange oppgaver med frilegmediagram og steg-for-steg-losning."
        />

        <VideoResource
          title="Centripetal Force Physics Problems"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=ZZx3mYNk2wg"
          duration="20 min"
          covers="Sirkelbevegelse og sentripetalkraft (5.4)"
          description="Sentripetalkraft i praksis: hva gir sentripetalkraften i ulike situasjoner (friksjon, snorspenning, gravitasjon), beregning av maks fart i sving, og minste fart i looping."
        />

        <VideoResource
          title="Banked Turn Physics Problems"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=FWXT-IzgbP0"
          duration="14 min"
          covers="Dosert sving (5.4)"
          description="Doserte svinger med og uten friksjon: hvordan skrastilt veibane gir sentripetalkraft, utledning av idealvinkel, og oppgaver med friksjon i dosert sving."
        />

        <VideoResource
          title="Static Friction and Circular Motion"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=dMgyy95uJUg"
          duration="10 min"
          covers="Friksjon i sirkelbevegelse (5.3–5.4)"
          description="Nar statisk friksjon er sentripetalkraften: bilsving pa flat vei, maks hastighet uten skrens, og sammenhengen mellom friksjonskoeffisient og svingradius."
        />
      </div>
    </div>
  );
}
