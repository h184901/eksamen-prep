"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { eksamenPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Solution, MCQ } from "@/components/dat109/EksamenComponents";

export default function Oppgave3UtviklingsmetodePage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.eksamen} pages={eksamenPages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <Link
          href="/dat109/eksamen"
          className="hover:text-[var(--accent)]"
        >
          Eksamen
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">
          Oppgave 3 — Utviklingsmetode
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Oppgave 3 — Utviklingsmetode
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Eksamensoppgaver om Scrum, XP, TDD, CI/CD, DevOps og smidige
          prinsipper. Flervalg fra 2023+, åpne spørsmål 2020–2022. ~20 % av
          eksamen.
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
            To formater på eksamen
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
            <div>
              <strong>2023–2024: Flervalg</strong> — 9–22 spørsmål om Scrum,
              XP, CI/CD, TDD, DevOps, burndown charts. Mange spørsmål =
              enkle svar.
            </div>
            <div>
              <strong>2020–2022: Åpne spørsmål</strong> — Forklar Scrum, TDD,
              CI. Relatér til eget prosjekt. 3–4 delspørsmål.
            </div>
          </div>
        </div>

        {/* 2024 flervalg */}
        <Section title="Eksamen vår 2024 — Flervalg" badge="Nyeste" badgeColor="red" defaultOpen={true}>
          <div className="space-y-3">
            <MCQ
              q="Hva er hovedmålet med smidige utviklingsmetoder?"
              options={[
                "Høy kvalitet på produktet",
                "Minimere risiko",
                "Forbedre kundetilfredshet",
                "Alle de nevnte punktene",
              ]}
              correct={3}
            />
            <MCQ
              q="Hvilket av følgende er IKKE et prinsipp i smidige utviklingsmetoder?"
              options={[
                "Kontinuerlig forbedring",
                "Samarbeid med kunden",
                "Planlegging og design er de mest kritiske fasene",
                "Respons på endring",
              ]}
              correct={2}
              explanation="Smidig: endring > plan. Fossefallsmetoden vektlegger planlegging og design."
            />
            <MCQ
              q="Hva er en Scrum Master?"
              options={[
                "Prosjektlederen som tildeler oppgaver",
                "Den som er ansvarlig for å fjerne hindringer for laget",
                "Kunden som prioriterer produktkøen",
                "Utvikleren med mest erfaring",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er en sprint i Scrum?"
              options={[
                "Et langt planleggingsmøte",
                "En kort utviklingssyklus",
                "En type testing",
                "En leveranse til kunden",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er en Kanban-tavle?"
              options={[
                "En tavle der man visuelt ser arbeid som skal gjøres, pågår og er ferdig",
                "Et burndown chart",
                "En produktkø",
                "Et Gantt-diagram",
              ]}
              correct={0}
            />
            <MCQ
              q="Hvilken metode bruker Burndown Chart?"
              options={[
                "Fossefallsmetoden",
                "Scrum",
                "Kanban",
                "Lean",
              ]}
              correct={1}
            />
            <MCQ
              q="Hvor mange faser er det i Scrum?"
              options={[
                "3 faser",
                "5 faser",
                "Scrum er smidig og har ikke faser",
                "Det avhenger av prosjektet",
              ]}
              correct={2}
              explanation="Scrum har sprinter, ikke faser"
            />
            <MCQ
              q="Hvordan måler man fremdrift i en smidig utviklingsprosess?"
              options={[
                "Gjennom Gantt-diagrammer",
                "Gjennom å følge opp antall fullførte oppgaver",
                "Gjennom kodedekningsrapporter",
                "Gjennom møtereferater",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er et typisk flyt for TDD?"
              options={[
                "Skrive kode → Skrive test → Kjøre test",
                "Skrive test → Skrive kode → Kjøre test → Fikse feil",
                "Planlegge → Kode → Teste → Levere",
                "Designe → Implementere → Validere",
              ]}
              correct={1}
              explanation="TDD: Red → Green → Refactor"
            />
            <MCQ
              q="Hvordan fungerer et burndown chart?"
              options={[
                "Viser total arbeidsmengde over prosjektets levetid",
                "Viser hvor mye arbeid som gjenstår i løpet av en sprint",
                "Viser antall feil over tid",
                "Viser teamets hastighet",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er en milestone?"
              options={[
                "En sprint review",
                "Et viktig tidspunkt, steg eller begivenhet",
                "En leveranse",
                "Et møte med kunden",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er hensikten med en sprint review?"
              options={[
                "Å planlegge neste sprint",
                "Å evaluere teamets prosess",
                "Å vise frem det som er utviklet i sprinten",
                "Å oppdatere produktkøen",
              ]}
              correct={2}
            />
            <MCQ
              q="Hva er hovedmålet med DevOps?"
              options={[
                "Øke sikkerheten",
                "Fremskynde programvareutviklingsprosessen",
                "Redusere kostnader",
                "Forbedre dokumentasjon",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er fordelene med Continuous Integration?"
              options={[
                "Bedre dokumentasjon",
                "Større fleksibilitet og hurtig utvikling",
                "Lavere kostnader",
                "Bedre sikkerhet",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er hovedprinsippet bak parprogrammering i XP?"
              options={[
                "To utviklere jobber på separate deler",
                "En utvikler arbeider mens den andre observerer og gir veiledning",
                "En utvikler koder, den andre tester",
                "To utviklere gjennomgår kode etterpå",
              ]}
              correct={1}
            />
            <MCQ
              q="Hvordan involveres kundene i en smidig prosess?"
              options={[
                "Kun i starten og slutten",
                "Kundene er aktive deltakere gjennom hele prosessen",
                "Kun gjennom skriftlig kommunikasjon",
                "Kundene er ikke involvert",
              ]}
              correct={1}
            />
            <MCQ
              q="Hvordan organiseres teamet i smidig utvikling?"
              options={[
                "Hierarkisk med prosjektleder",
                "Horisontalt med likeverdige teammedlemmer",
                "Matrise-organisering",
                "Avhenger av organisasjonen",
              ]}
              correct={1}
            />
            <MCQ
              q="Hva er hensikten med daglige standup-møter?"
              options={[
                "Gi statusoppdatering",
                "Identifisere forbedringsmuligheter",
                "Avdekke flaskehalser",
                "Alle de nevnte",
              ]}
              correct={3}
            />
            <MCQ
              q="Hva er hensikten med en produkt-backlog?"
              options={[
                "Å dokumentere arkitekturen",
                "Å identifisere og prioritere kravene i prosjektet",
                "Å planlegge sprinter",
                "Å logge feil",
              ]}
              correct={1}
            />
            <MCQ
              q="Hvordan håndteres endringer i kravene i Scrum?"
              options={[
                "Kravene kan endres når som helst",
                "Kravene kan kun endres mellom sprinter",
                "Kravene kan ikke endres",
                "Kravene endres i sprint review",
              ]}
              correct={1}
              explanation="Produktkøen oppdateres mellom sprinter, ikke under en pågående sprint"
            />
          </div>
        </Section>

        {/* 2023 vår flervalg */}
        <Section
          title="Eksamen vår 2023 — Flervalg"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <div className="space-y-3">
            <MCQ
              q="3.1: I Scrum, hva leveres på slutten av hver sprint?"
              options={[
                "Et dokument med test-tilfeller",
                "En arkitektonisk utforming",
                "Ett inkrement mot ferdig produkt",
                "Trådmodeller for brukergrensesnittet",
              ]}
              correct={2}
            />
            <MCQ
              q="3.2: Hvordan bør oppgavene i produktkøen prioriteres?"
              options={[
                "Verdien av oppgavene som leveres",
                "Kompleksiteten",
                "Størrelsen",
                "Risikoen",
                "Scrum-lagets valg",
              ]}
              correct={0}
            />
            <MCQ
              q="3.3: Hva er oppgavene og målet med testing?"
              options={[
                "Lage test-scenarier",
                "Finne feil",
                "Lage automatiserte tester",
                "Dele testrapporter",
                "Alle de fire første",
                "Ingen av de fire første",
              ]}
              correct={4}
            />
            <MCQ
              q="3.4: Har Scrum en test-rolle?"
              options={["Ja", "Nei"]}
              correct={1}
              explanation="Scrum har bare 3 roller: Product Owner, Scrum Master, Developers"
            />
            <MCQ
              q="3.5: Utviklingslaget innser at de har for mange oppgaver for neste sprint. Hva gjøres?"
              options={[
                "Få flere utviklere",
                "Søke hjelp fra andre",
                "Jobbe overtid",
                "Diskutere med kunden for å endre produktkøen",
              ]}
              correct={3}
            />
            <MCQ
              q="3.6: Når er en Sprint ferdig i Scrum?"
              options={[
                "Når alle oppgavene er fullført",
                "Når produkteieren foreslår det",
                "Når testene er fullført",
                "Når tidsboksen utløper",
              ]}
              correct={3}
              explanation="Sprinten er time-boxed — den slutter når tiden er ute, uansett"
            />
            <MCQ
              q="3.7: XP har 5 verdier. Hvilken er IKKE en av dem?"
              options={[
                "Enkelhet",
                "Mot",
                "Dokumentasjon",
                "Respekt",
                "Tilbakemelding",
                "Kommunikasjon",
              ]}
              correct={2}
              explanation="XP-verdier: Kommunikasjon, Enkelhet, Tilbakemelding, Mot, Respekt"
            />
            <MCQ
              q="3.8: Hva mener vi med et tverrfunksjonelt utviklingslag?"
              options={[
                "Hvert medlem er tverrfunksjonelt",
                "Utviklerne kan lage tester",
                "Laget samarbeider med andre",
                "Laget har utviklere og testere",
                "Laget har all nødvendig kompetanse for å levere",
              ]}
              correct={4}
            />
            <MCQ
              q="3.9: Hva viser et nedbrenningsdiagram?"
              options={[
                "Prosjektfremdrift",
                "Mengde gjenstående arbeid i forhold til tid",
                "Lagets hastighet",
                "Kapasiteten til lagmedlemmene",
                "Antall oppgaver i en sprint",
              ]}
              correct={1}
            />
          </div>
        </Section>

        {/* 2021 åpen */}
        <Section
          title="Eksamen vår 2021 — Åpne spørsmål"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <div className="space-y-3">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm">
              <p className="font-medium mb-2">
                a) Forklar hva test-drevet utvikling (TDD) er og hvor den
                benyttes i DevOps.
              </p>
              <p className="font-medium mb-2">
                b) Forklar hvordan kontinuerlig integrasjon (CI) kan
                kombineres med Scrum.
              </p>
              <p className="font-medium">
                c) Forklar hvorfor smidige metoder har overtatt.
              </p>
            </div>
            <Solution>
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 text-sm space-y-3">
                <p>
                  <strong>a) TDD:</strong> Lag testen først basert på
                  kravene, deretter koden som oppfyller testen. I DevOps
                  inngår TDD i Dev-delen (plan→kode→test). Testene kjøres
                  også i Ops som del av CI/CD-pipelinen.
                </p>
                <p>
                  <strong>b) CI + Scrum:</strong> I hver sprint kjører CI
                  automatiserte tester ved hver commit. Sprintens inkrement
                  bygges og testes kontinuerlig. Product backlog-oppgaver
                  integreres løpende gjennom sprinten.
                </p>
                <p>
                  <strong>c) Smidig overtok fordi:</strong> Krav endres
                  underveis (fossefallsmetoden takler ikke dette). Raskere
                  tilbakemelding fra kunder. Lavere risiko (leverer
                  inkrementelt). Utviklere trives bedre med autonomi.
                </p>
              </div>
            </Solution>
          </div>
        </Section>

        {/* 2022 åpen */}
        <Section title="Eksamen vår 2022 — Åpne spørsmål">
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2">
            <p className="font-medium">
              a) Forklar TDD. Diskuter fordeler og ulemper.
            </p>
            <p className="font-medium">
              b) Brukte du smidig tilnærming i prosjektet? Forklar.
            </p>
            <p className="font-medium">
              c) Forklar hva det smidige manifestet prøver å bidra med.
            </p>
          </div>
          <Solution label="Vis nøkkelpunkter">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
              <p>
                <strong>TDD fordeler:</strong> Bedre testdekning, kode
                designes for testbarhet, dokumentasjon via tester.
              </p>
              <p>
                <strong>TDD ulemper:</strong> Tar lengre tid initialt, ikke
                alt kan testes automatisk, krever disiplin.
              </p>
              <p>
                <strong>Smidig manifest (4 verdier):</strong> Individer og
                interaksjon {`>`} prosesser og verktøy. Fungerende programvare {`>`}
                {" "}omfattende dokumentasjon. Kundesamarbeid {`>`} kontraktsforhandling.
                Respons på endring {`>`} følge en plan.
              </p>
            </div>
          </Solution>
        </Section>

        {/* 2020 åpen */}
        <Section title="Eksamen høst 2020 — Åpne spørsmål">
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2">
            <p className="font-medium">
              a) Forklar hva det vil si at en utviklingsmetode er smidig.
            </p>
            <p className="font-medium">
              b) Forklar hvorfor Scrum er smidig.
            </p>
            <p className="font-medium">
              c) Forklar hvordan AgileUP og Scrum kan kombineres.
            </p>
            <p className="font-medium">
              d) Forklar hvorfor smidige metoder har overtatt.
            </p>
          </div>
          <Solution label="Vis nøkkelpunkter">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
              <p>
                <strong>Smidig =</strong> iterativ, inkrementell, tilpasser
                seg endring, leverer verdi tidlig og ofte.
              </p>
              <p>
                <strong>Scrum er smidig fordi:</strong> Korte sprinter
                (1–4 uker), daglig synkronisering, retrospektiv, tilpasning
                mellom sprinter.
              </p>
              <p>
                <strong>AgileUP + Scrum:</strong> AgileUP gir fasene
                (inception, elaboration, construction, transition) mens Scrum
                gir rammeverket for hver sprint innenfor fasene. UML fra
                AgileUP, prosesstyring fra Scrum.
              </p>
            </div>
          </Solution>
        </Section>
      </div>
    </div>
  );
}
