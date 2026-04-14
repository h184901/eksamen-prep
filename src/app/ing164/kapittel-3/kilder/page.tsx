import VideoResource from "@/components/VideoResource";

export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer og andre ressurser for kapittel 3: Bevegelse i 2D og 3D.
        </p>
      </div>

      <div className="space-y-4">
        <VideoResource
          title="Projectile Motion Formulas — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=8NLzuURxFwY"
          duration="28 min"
          covers="Prosjektilbevegelse (3.1–3.3)"
          description="Alle formlene for prosjektilbevegelse: maksimal hoyde, rekkevidde, utskytningsvinkel, flytid, og slutthastighet. Gjennomgatte eksempler med tydelig steg-for-steg-metode."
        />

        <VideoResource
          title="Centripetal Acceleration & Centripetal Force"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=ZbLirQuT9uU"
          duration="14 min"
          covers="Sirkelbevegelse (3.4)"
          description="Sentripetalakselerasjon og sentripetalkraft for jevn sirkelbevegelse: formler, retning, og oppgaver med losning."
        />

        <VideoResource
          title="Uniform Circular Motion — Physics"
          channel="The Organic Chemistry Tutor"
          url="https://www.youtube.com/watch?v=K9zIjUeI32k"
          duration="17 min"
          covers="Sirkelbevegelse (3.4)"
          description="Jevn sirkelbevegelse i detalj: periode, frekvens, vinkelhastighet, og sammenhengen mellom lineaer og vinkelstorrelser. Flere oppgaver med forklaring."
        />

        <VideoResource
          title="Classical Physics — Projectile Motion"
          channel="Professor Dave Explains"
          url="https://www.youtube.com/playlist?list=PLybg94GvOJ9HjfcQeJcNzLUFxa4m3i7FW"
          covers="Hele kapittelet"
          description="Professor Dave dekker vektorer, vektorkomponenter, prosjektilbevegelse og sirkelbevegelse som del av sin klassisk-fysikk-spilleliste. Korte, fokuserte videoer med god forklaring."
        />
      </div>
    </div>
  );
}
