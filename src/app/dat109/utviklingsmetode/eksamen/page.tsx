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
        Alle flervalgsoppgaver fra eksamen 2023 og 2024 (oppgave 3) om smidige metoder, Scrum, XP, TDD,
        DevOps og continuous integration. Klikk på svaret du tror er riktig — du får umiddelbart tilbakemelding.
      </p>

      {/* ═══════ Eksamen vår 2023 ═══════ */}
      <h2 className="text-2xl font-bold mb-2 mt-2">Eksamen vår 2023 — Oppgave 3</h2>
      <p className="text-sm text-[var(--muted)] mb-4">Flervalgsoppgaver om Scrum, XP, smidige verdier, burndown, CI og DevOps.</p>

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

      {/* ═══════ Eksamen vår 2024 ═══════ */}
      <h2 className="text-2xl font-bold mb-2 mt-10">Eksamen vår 2024 — Oppgave 3</h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        ~20 flervalgsoppgaver om smidige metoder, Scrum-roller og -hendelser, Kanban, TDD, DevOps,
        continuous integration, parprogrammering og kundeinvolvering.
      </p>

      <QuizQuestion
        id={101}
        question="Hva er hovedmålet med smidige utviklingsmetoder?"
        options={[
          { label: "a", text: "Å levere fungerende programvare hyppig" },
          { label: "b", text: "Å tilpasse seg endrede krav" },
          { label: "c", text: "Å fremme samarbeid mellom utviklere og kunder" },
          { label: "d", text: "Alle de nevnte punktene" },
        ]}
        correctIndex={3}
        explanation="Smidige metoder har flere likestilte mål: hyppige leveranser, tilpasningsdyktighet og tett kundesamarbeid. Dette er kjernen i det agile manifestet — alle tre punktene er sentrale."
        source="Eksamen 2024, oppgave 3a"
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

      <QuizQuestion
        id={104}
        question="Hva er en sprint i Scrum?"
        options={[
          { label: "a", text: "En kort utviklingssyklus" },
          { label: "b", text: "Et møte for å diskutere fremgang" },
          { label: "c", text: "En type teamstruktur" },
          { label: "d", text: "En milepæl i prosjektet" },
        ]}
        correctIndex={0}
        explanation="En sprint er en tidsbokset utviklingssyklus (typisk 1-4 uker) der teamet leverer et potensielt utgivbart inkrement. Det er IKKE et møte og IKKE en milepæl — selve syklusen er sprinten."
        source="Eksamen 2024, oppgave 3d"
      />

      <QuizQuestion
        id={105}
        question="Hva er en kanban-tavle?"
        options={[
          { label: "a", text: "En tavle der man visuelt kan se arbeidet som skal gjøres, pågår og er ferdig" },
          { label: "b", text: "En tavle for å følge med på teamets ytelse" },
          { label: "c", text: "En tavle for prosjektplanlegging" },
          { label: "d", text: "En tavle for å holde oversikt over møter" },
        ]}
        correctIndex={0}
        explanation="Kanban-tavlen visualiserer arbeidsflyten i kolonner (typisk: To Do, In Progress, Done). Hele poenget er å se status på alle oppgaver med ett blikk og begrense pågående arbeid (WIP)."
        source="Eksamen 2024, oppgave 3e"
      />

      <QuizQuestion
        id={106}
        question="Hvilken metode bruker Burndown chart?"
        options={[
          { label: "a", text: "Scrum" },
          { label: "b", text: "Kanban" },
          { label: "c", text: "Lean" },
          { label: "d", text: "Waterfall" },
        ]}
        correctIndex={0}
        explanation="Burndown chart er et signaturverktøy i Scrum — det viser gjenstående arbeid mot tid i sprinten. Kanban bruker oftere kumulativ flyt-diagram (cumulative flow diagram)."
        source="Eksamen 2024, oppgave 3f"
      />

      <QuizQuestion
        id={107}
        question="Hvor mange faser er det i Scrum?"
        options={[
          { label: "a", text: "3" },
          { label: "b", text: "4" },
          { label: "c", text: "5" },
          { label: "d", text: "Scrum er en smidig metode, noe som betyr at den ikke har faser" },
        ]}
        correctIndex={3}
        explanation="Scrum har IKKE tradisjonelle faser (som fossefall har: krav → design → koding → test). Scrum er iterativ — hver sprint inneholder alle aktiviteter. Dette er en lurespørsmål-favoritt på eksamen."
        source="Eksamen 2024, oppgave 3g"
      />

      <QuizQuestion
        id={108}
        question="Hvordan måler man fremdrift i et smidig prosjekt?"
        options={[
          { label: "a", text: "Gjennom å følge opp antall fullførte oppgaver" },
          { label: "b", text: "Gjennom antall linjer kode skrevet" },
          { label: "c", text: "Gjennom antall møter holdt" },
          { label: "d", text: "Gjennom antall dokumenter produsert" },
        ]}
        correctIndex={0}
        explanation="Fremdrift måles ved fullført, fungerende programvare — typisk antall ferdige user stories eller story points. Linjer kode, møter og dokumenter er ANTI-mål i smidige metoder."
        source="Eksamen 2024, oppgave 3h"
      />

      <QuizQuestion
        id={109}
        question="Hva er typisk flyt for å implementere TDD (Test-Driven Development)?"
        options={[
          { label: "a", text: "Skrive test → Skrive kode → Kjøre test → Fikse feil" },
          { label: "b", text: "Skrive kode → Skrive test → Kjøre test" },
          { label: "c", text: "Skrive kode → Kjøre test → Fikse feil" },
          { label: "d", text: "Skrive test → Kjøre test → Skrive kode" },
        ]}
        correctIndex={0}
        explanation="TDD følger Red-Green-Refactor: 1) Skriv en test som feiler (Red), 2) Skriv minimal kode for å få den til å passere (Green), 3) Kjør testen og verifiser, 4) Refaktorér/fiks. Test ALLTID først."
        source="Eksamen 2024, oppgave 3i"
      />

      <QuizQuestion
        id={110}
        question="Hvordan fungerer et burndown chart?"
        options={[
          { label: "a", text: "Det viser hvor mye arbeid som gjenstår i løpet av en sprint" },
          { label: "b", text: "Det viser hvor mye arbeid som er fullført" },
          { label: "c", text: "Det viser teamets ytelse over tid" },
          { label: "d", text: "Det viser antall feil funnet i koden" },
        ]}
        correctIndex={0}
        explanation="Burndown viser GJENSTÅENDE arbeid (Y-akse) over tid (X-akse). Linjen 'brenner ned' mot null mot slutten av sprinten. Det er IKKE fullført arbeid (det ville vært et burnup chart)."
        source="Eksamen 2024, oppgave 3j"
      />

      <QuizQuestion
        id={111}
        question="Hva er en milestone?"
        options={[
          { label: "a", text: "Et viktig tidspunkt, steg eller begivenhet" },
          { label: "b", text: "Et møte i prosjektet" },
          { label: "c", text: "En type oppgave i en sprint" },
          { label: "d", text: "Et sprint-mål" },
        ]}
        correctIndex={0}
        explanation="En milestone (milepæl) er et viktig kontrollpunkt i prosjektet — f.eks. fullført MVP, lansering av beta, eller fullført integrasjon. Det er IKKE et møte eller en oppgave."
        source="Eksamen 2024, oppgave 3k"
      />

      <QuizQuestion
        id={112}
        question="Hva er hensikten med en sprint review?"
        options={[
          { label: "a", text: "Å vise frem og demonstrere det som er blitt utviklet i løpet av sprinten" },
          { label: "b", text: "Å diskutere kommende oppgaver" },
          { label: "c", text: "Å evaluere teamets ytelse" },
          { label: "d", text: "Å diskutere kundens krav" },
        ]}
        correctIndex={0}
        explanation="Sprint review er DEMOEN på slutten av sprinten — produkteier og interessenter får se det fungerende inkrementet. Retrospektivet (separat møte) er der teamet evaluerer egen ytelse."
        source="Eksamen 2024, oppgave 3l"
      />

      <QuizQuestion
        id={113}
        question="Hva er hovedmålet med DevOps?"
        options={[
          { label: "a", text: "Fremskynde programvareutviklingsprosessen" },
          { label: "b", text: "Forbedre kundekommunikasjonen" },
          { label: "c", text: "Redusere kostnader" },
          { label: "d", text: "Øke antall ansatte" },
        ]}
        correctIndex={0}
        explanation="DevOps eksisterer for å akselerere leveranse — bryte ned siloer mellom utvikling og drift, automatisere bygg/test/deploy, og levere oftere. Kostnader og bemanning er bivirkninger, ikke målet."
        source="Eksamen 2024, oppgave 3m"
      />

      <QuizQuestion
        id={114}
        question="Hva er fordelene med continuous integration (CI)?"
        options={[
          { label: "a", text: "Større fleksibilitet og hurtig utvikling" },
          { label: "b", text: "Mindre behov for testing" },
          { label: "c", text: "Færre møter" },
          { label: "d", text: "Større team" },
        ]}
        correctIndex={0}
        explanation="CI gir fleksibilitet (raske tilbakemeldinger på endringer) og hurtig utvikling (automatisert bygg/test). Det øker faktisk testing (alle endringer testes automatisk) — alternativ b) er feil."
        source="Eksamen 2024, oppgave 3n"
      />

      <QuizQuestion
        id={115}
        question="Hva er hovedprinsippet bak parprogrammering?"
        options={[
          { label: "a", text: "To utviklere arbeider sammen for å skrive kode samtidig" },
          { label: "b", text: "To team jobber parallelt på samme prosjekt" },
          { label: "c", text: "En utvikler koder, en annen tester etterpå" },
          { label: "d", text: "To utviklere jobber på hver sin del av koden" },
        ]}
        correctIndex={0}
        explanation="Parprogrammering: to utviklere ved SAMME maskin og SAMME kode. Driver skriver, navigator ser strategisk fremover. Kontinuerlig kodegjennomgang i sanntid — XP-praksis."
        source="Eksamen 2024, oppgave 3o"
      />

      <QuizQuestion
        id={116}
        question="Hvordan involveres kundene i smidige metoder?"
        options={[
          { label: "a", text: "Kundene er aktive deltakere gjennom hele prosessen" },
          { label: "b", text: "Kundene involveres bare i begynnelsen" },
          { label: "c", text: "Kundene involveres bare i slutten" },
          { label: "d", text: "Kundene involveres ikke" },
        ]}
        correctIndex={0}
        explanation="«Customer collaboration over contract negotiation» er en av de fire kjerneverdiene i det agile manifestet. Kunden deltar gjennom hele prosjektet — i sprint reviews, prioritering av backlog osv."
        source="Eksamen 2024, oppgave 3p"
      />

      <QuizQuestion
        id={117}
        question="Hvordan organiseres team i smidige metoder?"
        options={[
          { label: "a", text: "Horisontalt med likeverdige teammedlemmer" },
          { label: "b", text: "Hierarkisk med tydelig ledelse" },
          { label: "c", text: "I store team for bedre samarbeid" },
          { label: "d", text: "I små grupper med spesialiserte oppgaver" },
        ]}
        correctIndex={0}
        explanation="Smidige team er selvstyrte og flate — alle medlemmer er likeverdige. Det er ingen tydelig ledelseshierarki innenfor teamet (Scrum Master er en fasilitator, ikke leder). Tverrfunksjonelt og horisontalt."
        source="Eksamen 2024, oppgave 3q"
      />

      <QuizQuestion
        id={118}
        question="Hva er hensikten med daglige standup-møter (Daily Scrum)?"
        options={[
          { label: "a", text: "Å gi en kort oppdatering om hva hver person jobber med" },
          { label: "b", text: "Å diskutere forbedringsmuligheter" },
          { label: "c", text: "Å identifisere og løse hindringer i arbeidsflyten" },
          { label: "d", text: "Alle de andre" },
        ]}
        correctIndex={3}
        explanation="Daily Scrum (15 min) tjener flere formål samtidig: 1) synkronisere på fremdrift, 2) identifisere hindringer, 3) planlegge dagen og løse problemer raskt. Alle de tre andre alternativene er sanne."
        source="Eksamen 2024, oppgave 3r"
      />

      <QuizQuestion
        id={119}
        question="Hva er hensikten med en produkt-backlog?"
        options={[
          { label: "a", text: "Å holde oversikt over alle funksjonene som skal implementeres" },
          { label: "b", text: "Å holde oversikt over teamets ytelse" },
          { label: "c", text: "Å holde oversikt over møter" },
          { label: "d", text: "Å holde oversikt over feil" },
        ]}
        correctIndex={0}
        explanation="Product Backlog er den prioriterte listen over ALT som skal lages — funksjoner, forbedringer, feilrettinger, krav. Den eies av Produkteier og er alltid sortert etter verdi."
        source="Eksamen 2024, oppgave 3s"
      />

      <QuizQuestion
        id={120}
        question="Hvordan håndteres endringer i krav i Scrum?"
        options={[
          { label: "a", text: "Kravene kan endres når som helst i prosjektet" },
          { label: "b", text: "Kravene kan ikke endres" },
          { label: "c", text: "Kravene kan bare endres i begynnelsen av prosjektet" },
          { label: "d", text: "Kravene kan bare endres i slutten av prosjektet" },
        ]}
        correctIndex={0}
        explanation="Scrum omfavner endring — Product Backlog kan oppdateres når som helst. MEN: en aktiv sprint er beskyttet (sprint backlog endres ikke midt i sprinten). Mellom sprinter er alt åpent for re-prioritering."
        source="Eksamen 2024, oppgave 3t"
      />

      {/* Tips */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mt-10 mb-4">
        <h2 className="font-bold text-lg mb-3 text-sysdev-700 dark:text-sysdev-400">
          Tips for eksamensdagen
        </h2>
        <ul className="text-sm space-y-2">
          <li>
            <strong>Scrum har ikke faser:</strong> Klassisk lurespørsmål — Scrum er iterativ, ikke fase-basert.
            Hver sprint inneholder all aktivitet.
          </li>
          <li>
            <strong>Burndown vs burnup:</strong> Burndown viser GJENSTÅENDE arbeid (mest brukt i Scrum).
            Burnup viser FULLFØRT arbeid.
          </li>
          <li>
            <strong>TDD-flyt:</strong> Test FØRST, så kode. Red → Green → Refactor.
          </li>
          <li>
            <strong>Roller i Scrum:</strong> Bare tre — Produkteier (hva), Scrum Master (fasilitator),
            Utviklingsteam (hvordan). Ingen prosjektleder, ingen testleder.
          </li>
          <li>
            <strong>«Alle de nevnte»:</strong> Hvis flere alternativer ser riktige ut, er svaret ofte
            «Alle de andre». Dette gjelder spesielt smidige fordeler/prinsipper.
          </li>
        </ul>
      </div>
    </div>
  );
}
