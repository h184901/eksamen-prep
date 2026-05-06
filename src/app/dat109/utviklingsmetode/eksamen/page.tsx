"use client";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";
import { QuizQuestion } from "@/components/dat109/UtviklingsmetodeComponents";
import Link from "next/link";

export default function EksamenDrillingPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/utviklingsmetode" className="hover:text-[var(--accent)]">Utviklingsmetode</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamendrilling</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Eksamendrilling — Oppgave 3</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Alle flervalgsoppgaver fra eksamen 2023 (oppgave 3). Komplett V2024-drilling kommer i neste innholdsoppdatering.
      </p>

      {/* === EKSISTERENDE V2023-FLERVALG === */}
      <QuizQuestion
        id={1}
        question="Hva leveres på slutten av hver sprint i Scrum?"
        options={[
          { label: "a", text: "Testdokumenter" },
          { label: "b", text: "Arkitekturbeskrivelse" },
          { label: "c", text: "Et inkrement mot ferdig produkt" },
          { label: "d", text: "Wireframes for neste sprint" },
        ]}
        correctIndex={2}
        explanation="I Scrum leveres et potensielt leverbart inkrement — fungerende, testet programvare. Ikke dokumenter, wireframes eller arkitektur."
        source="Eksamen 2023, oppgave 3.1"
      />

      <QuizQuestion
        id={2}
        question="På hvilket grunnlag bør oppgavene i produktkøen prioriteres?"
        options={[
          { label: "a", text: "Verdien av oppgavene som leveres" },
          { label: "b", text: "Kompleksiteten til oppgavene" },
          { label: "c", text: "Størrelsen på oppgavene" },
          { label: "d", text: "Risikoen knyttet til oppgavene" },
        ]}
        correctIndex={0}
        explanation="Scrum prioriterer etter forretningsmessig verdi — det som gir mest verdi til kunden bygges først. Ikke etter kompleksitet, størrelse eller risiko alene."
        source="Eksamen 2023, oppgave 3.2"
      />

      <QuizQuestion
        id={3}
        question="Har Scrum en dedikert test-rolle?"
        options={[
          { label: "a", text: "Ja, det er Scrum Masterens ansvar" },
          { label: "b", text: "Nei" },
          { label: "c", text: "Ja, testlederen er en del av teamet" },
          { label: "d", text: "Ja, produkteieren tester" },
        ]}
        correctIndex={1}
        explanation="Scrum har kun tre roller: Produkteier, Scrum Master og Utviklingsteam. Testing er hele teamets felles ansvar — ingen dedikert testrolle."
        source="Eksamen 2023, oppgave 3.4"
      />

      <QuizQuestion
        id={4}
        question="Teamet innser at de har for mange oppgaver i sprinten. Hva bør de gjøre?"
        options={[
          { label: "a", text: "Jobbe overtid for å rekke alt" },
          { label: "b", text: "Utvide teamet med flere utviklere" },
          { label: "c", text: "Kutte på kvaliteten for å rekke tidsfristen" },
          { label: "d", text: "Diskutere med kunden for å endre produktkøen" },
        ]}
        correctIndex={3}
        explanation="I Scrum snakker man med Produkteier for å re-prioritere. Man jobber aldri overtid, utvider teamet midt i sprint, eller kutter kvalitet."
        source="Eksamen 2023, oppgave 3.5"
      />

      <QuizQuestion
        id={5}
        question="Når er en sprint ferdig i Scrum?"
        options={[
          { label: "a", text: "Når alle oppgavene er fullført" },
          { label: "b", text: "Når Scrum Master bestemmer det" },
          { label: "c", text: "Når produkteieren godkjenner inkrementet" },
          { label: "d", text: "Når tidsboksen utløper" },
        ]}
        correctIndex={3}
        explanation="Sprinten er ferdig når tidsboksen utløper — uavhengig av om alle oppgavene er fullført. Uferdig arbeid flyttes tilbake til Product Backlog. Det er hele poenget med tidsboksing."
        source="Eksamen 2023, oppgave 3.6"
      />

      <QuizQuestion
        id={6}
        question="Hvilken er IKKE en XP-verdi?"
        options={[
          { label: "a", text: "Enkelhet" },
          { label: "b", text: "Mot" },
          { label: "c", text: "Dokumentasjon" },
          { label: "d", text: "Tilbakemelding" },
          { label: "e", text: "Respekt" },
        ]}
        correctIndex={2}
        explanation="XPs 5 verdier er: Enkelhet, Kommunikasjon, Tilbakemelding, Respekt og Mot. Dokumentasjon er IKKE en av dem."
        source="Eksamen 2023, oppgave 3.7"
      />

      <QuizQuestion
        id={7}
        question="Hva mener vi med et tverrfunksjonelt utviklingslag?"
        options={[
          { label: "a", text: "Hvert teammedlem mestrer alle teknologier" },
          { label: "b", text: "Teamet har separate grupper for frontend og backend" },
          { label: "c", text: "Teamet roterer oppgaver daglig" },
          { label: "d", text: "Teamet har en ekstern testgruppe" },
          { label: "e", text: "Laget bør ha all kompetanse som er nødvendig for å levere det ferdige inkrementet" },
        ]}
        correctIndex={4}
        explanation="Tverrfunksjonelt betyr at teamet SOM HELHET har all kompetanse som trengs. Ikke at hvert enkelt medlem er tverrfunksjonelt."
        source="Eksamen 2023, oppgave 3.8"
      />

      <QuizQuestion
        id={8}
        question="Hva viser et nedbrenningsdiagram (burndown chart)?"
        options={[
          { label: "a", text: "Prosjektets totale fremdrift" },
          { label: "b", text: "Mengde gjenstående arbeid i forhold til tid" },
          { label: "c", text: "Lagets hastighet (velocity)" },
          { label: "d", text: "Antall feil funnet per sprint" },
        ]}
        correctIndex={1}
        explanation="Et burndown chart viser gjenstående arbeid (Y-akse) i forhold til tid (X-akse). Det er IKKE det samme som prosjektfremdrift eller velocity."
        source="Eksamen 2023, oppgave 3.9"
      />

      <QuizQuestion
        id={9}
        question="Hvilken verdi er IKKE blant de fire fra det agile manifestet?"
        options={[
          { label: "a", text: "Individer og samspill fremfor prosesser og verktøy" },
          { label: "b", text: "Fungerende programvare fremfor omfattende dokumentasjon" },
          { label: "c", text: "Strukturert planlegging foran tilpasset planlegging" },
          { label: "d", text: "Å respondere på endring fremfor å følge en plan" },
        ]}
        correctIndex={2}
        explanation="«Strukturert planlegging foran tilpasset planlegging» er det STIKK MOTSATTE av hva det agile manifestet sier. Manifestet verdsetter å reagere på endringer FREMFOR å følge en plan."
        source="Eksamen 2023, oppgave 3.10"
      />

      <QuizQuestion
        id={10}
        question="Hva er parprogrammering?"
        options={[
          { label: "a", text: "To personer jobber sammen for å kode på én datamaskin" },
          { label: "b", text: "To team jobber parallelt på samme prosjekt" },
          { label: "c", text: "En utvikler koder, en annen tester etterpå" },
          { label: "d", text: "To utviklere jobber på hver sin del av koden" },
        ]}
        correctIndex={0}
        explanation="Parprogrammering betyr at to utviklere sitter ved SAMME maskin. En skriver kode (driver), den andre ser over og tenker strategisk (navigator). De bytter roller jevnlig."
        source="Eksamen 2023, oppgave 3.11"
      />

      <QuizQuestion
        id={11}
        question="Hva beskriver CI (Continuous Integration) best?"
        options={[
          { label: "a", text: "En teknikk for kontinuerlig testing og distribusjon av kode" },
          { label: "b", text: "Et verktøy for prosjektplanlegging" },
          { label: "c", text: "En metode for kravinnsamling" },
          { label: "d", text: "En prosess for å evaluere teamets ytelse" },
        ]}
        correctIndex={0}
        explanation="CI er en teknikk der utviklere integrerer kode ofte med automatisk bygging og testing. «Kontinuerlig testing og distribusjon» er det beste alternativet blant de gitte."
        source="Eksamen 2023, oppgave 3.12"
      />

      <QuizQuestion
        id={12}
        question="Hvilket lag får prioritet i DevOps?"
        options={[
          { label: "a", text: "Utviklingslaget" },
          { label: "b", text: "Driftslaget" },
          { label: "c", text: "Både utviklingslag og driftslag" },
          { label: "d", text: "Prosjektledelsen" },
        ]}
        correctIndex={2}
        explanation="Hele poenget med DevOps er at utviklere og drift har LIK prioritet og jobber sammen. Ingen av dem er viktigere enn den andre."
        source="Eksamen 2023, oppgave 3.14"
      />

      <QuizQuestion
        id={13}
        question="Hvilken aktivitet er IKKE tidsbokset i Scrum?"
        options={[
          { label: "a", text: "Sprint Planning" },
          { label: "b", text: "Daily Scrum" },
          { label: "c", text: "Gjennomgang av produktkø (Backlog Refinement)" },
          { label: "d", text: "Sprint Review" },
        ]}
        correctIndex={2}
        explanation="Backlog Refinement (Product Backlog Grooming) er IKKE en formell Scrum-hendelse og er derfor ikke tidsbokset. Alle de andre aktivitetene har faste tidsbokser."
        source="Eksamen 2023, oppgave 3.15"
      />

      <QuizQuestion
        id={14}
        question="Hvilken er IKKE et prinsipp i smidige metoder?"
        options={[
          { label: "a", text: "Lever fungerende programvare hyppig" },
          { label: "b", text: "Ønsk endringer velkommen" },
          { label: "c", text: "Planlegging og design er de mest kritiske fasene" },
          { label: "d", text: "Selvstyrte team gir best resultat" },
        ]}
        correctIndex={2}
        explanation="«Planlegging og design er de mest kritiske fasene» er fossefalls-tenkning. I smidige metoder er FUNGERENDE PROGRAMVARE det primære målet på fremdrift."
        source="Eksamen 2024, oppgave 3b"
      />

      <QuizQuestion
        id={15}
        question="Hva er en Scrum Master?"
        options={[
          { label: "a", text: "Den som leder prosjektet" },
          { label: "b", text: "Den som planlegger sprintene" },
          { label: "c", text: "Den som er ansvarlig for å fjerne hindringer for laget" },
          { label: "d", text: "Den som bestemmer hva som skal bygges" },
        ]}
        correctIndex={2}
        explanation="Scrum Master er en servant leader som fjerner hindringer. Ikke prosjektleder (mer POs domene), ikke den som planlegger sprinter (teamet sammen), og ikke den som bestemmer hva som bygges (det er PO)."
        source="Eksamen 2024, oppgave 3c"
      />

      <div className="mt-8 rounded-xl border-2 border-dashed border-amber-400/60 bg-amber-50/50 dark:bg-amber-950/20 p-6">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Mer drilling kommer</h3>
        <p className="text-sm">~17 unike flervalgsoppgaver fra V2024 (om milestones, Scrum-faser, TDD-flyt, Kanban, kundeinvolvering, DevOps-mål, CI-fordeler, parprogrammering osv.) fylles inn i prompt 4.</p>
      </div>
    </div>
  );
}
