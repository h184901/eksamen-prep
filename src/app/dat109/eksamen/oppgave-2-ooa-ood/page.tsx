"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { eksamenPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Solution, MCQ } from "@/components/dat109/EksamenComponents";

export default function Oppgave2OoaOodPage() {
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
          Oppgave 2 — OOA/OOD
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Oppgave 2 — OOA/OOD
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Eksamensoppgaver om SOLID, GRASP og utformingsprinsipper. Flervalg
          fra 2023+, åpen analyse 2020–2022. ~20 % av eksamen.
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
            To formater på eksamen
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
            <div>
              <strong>2023–2024: Flervalg</strong> — 9–10 spørsmål, ett riktig
              svar per spørsmål. Dekker SOLID (5) + GRASP (noen) + OOP-grunnlag.
            </div>
            <div>
              <strong>2020–2022: Åpne spørsmål</strong> — Analyse av gitt
              UML-diagram mht. SOLID/GRASP. Forklar prinsipper, vis i modell,
              foreslå forbedring.
            </div>
          </div>
        </div>

        {/* 2024 flervalg */}
        <Section title="Eksamen vår 2024 — Flervalg" badge="Nyeste" badgeColor="red" defaultOpen={true}>
          <div className="space-y-3">
            <MCQ
              q="Du må ofte endre en klasse fordi den gjør for mange forskjellige ting. Hvilket prinsipp brytes?"
              options={[
                "Open/Closed Principle (OCP)",
                "Liskov Substitution Principle (LSP)",
                "Single Responsibility Principle (SRP)",
                "Dependency Inversion Principle (DIP)",
              ]}
              correct={2}
              explanation="Klassen har mer enn ett ansvar → SRP"
            />
            <MCQ
              q="Hvilket prinsipp bruker du for å unngå sterk avhengighet mellom konkrete klasser og foretrekke abstraksjoner?"
              options={[
                "Single Responsibility Principle (SRP)",
                "Open/Closed Principle (OCP)",
                "Interface Segregation Principle (ISP)",
                "Dependency Inversion Principle (DIP)",
              ]}
              correct={3}
              explanation="Avheng av abstraksjoner, ikke konkrete klasser → DIP"
            />
            <MCQ
              q="Man skal ikke tvinges til å avhenge av grensesnitt de ikke bruker. Hvilket prinsipp?"
              options={[
                "Single Responsibility Principle (SRP)",
                "Liskov Substitution Principle (LSP)",
                "Interface Segregation Principle (ISP)",
                "Dependency Inversion Principle (DIP)",
              ]}
              correct={2}
              explanation="For brede grensesnitt → ISP"
            />
            <MCQ
              q="Subklasser bør kunne erstatte deres supertyper uten å forandre programmets korrekthet. Hvilket prinsipp?"
              options={[
                "Open/Closed Principle (OCP)",
                "Liskov Substitution Principle (LSP)",
                "Single Responsibility Principle (SRP)",
                "Interface Segregation Principle (ISP)",
              ]}
              correct={1}
              explanation="Substituerbarhet → LSP"
            />
            <MCQ
              q="Du lager en ny klasse som håndterer alle detaljer rundt logging. Hvilket prinsipp følger du?"
              options={[
                "Open/Closed Principle (OCP)",
                "Single Responsibility Principle (SRP)",
                "Dependency Inversion Principle (DIP)",
                "Liskov Substitution Principle (LSP)",
              ]}
              correct={1}
              explanation="Én klasse, ett ansvar = logging → SRP"
            />
            <MCQ
              q="Når du designer moduler og klasser og vil sørge for at de er lett utbyttbare. Hvilket prinsipp?"
              options={[
                "Single Responsibility Principle (SRP)",
                "Open/Closed Principle (OCP)",
                "Liskov Substitution Principle (LSP)",
                "Dependency Inversion Principle (DIP)",
              ]}
              correct={1}
              explanation="Åpen for utvidelse, lukket for modifikasjon → OCP"
            />
            <MCQ
              q="Dersom en klasse har mange metoder og instansvariabler relatert til mange ulike oppgaver, hvilket GRASP-prinsipp brytes?"
              options={[
                "Low Coupling",
                "High Cohesion",
                "Information Expert",
                "Creator",
              ]}
              correct={1}
              explanation="For mange ulike ting = lav kohesjon → bryter High Cohesion"
            />
            <MCQ
              q="Hva er formålet med et sekvensdiagram i UML?"
              options={[
                "Å vise strukturen til et system",
                "Å vise hvordan objekter samhandler over tid",
                "Å definere testtilfeller",
                "Å modellere databaseskjema",
              ]}
              correct={1}
              explanation="Sekvensdiagram viser objekt-interaksjon over tid"
            />
            <MCQ
              q="Hva er forskjellen mellom en klasse og et objekt?"
              options={[
                "En klasse er en instans av et objekt",
                "De er det samme",
                "En klasse beskriver en samling av objekter med like egenskaper, et objekt er en instans",
                "Et objekt er en abstrakt beskrivelse",
              ]}
              correct={2}
              explanation="Klasse = mal/oppskrift, objekt = konkret instans"
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
              q="2.1: Hva er en fordel ved å bruke MVC (Modell Visning Kontroller)?"
              options={[
                "Modellinformasjon kan bare nås og manipuleres av visningen",
                "Visningsobjekter bestemmes ved substantivene i brukstilfellebeskrivelsen",
                "Avhengighetsinversjon er garantert automatisk mellom modellobjekter",
                "Hver seksjon følger prinsippet om ett enkelt ansvar",
                "Systemer kan bygges på kortere tid og halve kostnaden",
              ]}
              correct={3}
              explanation="MVC: Modell, Visning og Kontroller har hvert sitt ansvar → SRP"
            />
            <MCQ
              q="2.2: Hva er IKKE et prinsipp fra GRASP?"
              options={[
                "Skaper (Creator)",
                "Kontroller (Controller)",
                "Lav kobling (Low Coupling)",
                "Motivator",
              ]}
              correct={3}
              explanation="Motivator er ikke et GRASP-prinsipp"
            />
            <MCQ
              q="2.3: Hva er Informasjonsekspert fra GRASP?"
              options={[
                "Et prinsipp for å tildele ansvar til klasse",
                "Et prinsipp for å tildele ansvar til arrangement",
                "Et prinsipp for å tildele ansvar til objekt",
                "Et prinsipp for å tildele ansvar til beregninger",
              ]}
              correct={2}
              explanation="GRASP handler om objekter, ikke klasser direkte"
            />
            <MCQ
              q="2.4: Hva er en Skaper (Creator) fra GRASP?"
              options={[
                "Hvem skal lage en ny forekomst av beregninger",
                "Hvem skal lage en ny forekomst av en klasse",
                "Hvem skal lage en ny forekomst av en hendelse",
                "Hvem skal lage en ny forekomst av et objekt",
              ]}
              correct={1}
              explanation="Creator: hvem skal ha ansvaret for å opprette nye klasser"
            />
            <MCQ
              q="2.5: HR-system må utvides med ny feriepenger-type. Originalkoden må endres betydelig. Hvilket SOLID-prinsipp brytes?"
              options={[
                "Open/Closed (OCP)",
                "Dependency Inversion (DIP)",
                "Liskov Substitution (LSP)",
                "Single Responsibility (SRP)",
                "Interface Segregation (ISP)",
              ]}
              correct={0}
              explanation="Koden er ikke lukket for modifikasjon → bryter OCP"
            />
            <MCQ
              q="2.6: En utledet klasse overskriver en arvet metode ved å kaste UnsupportedOperationException. Hvilket prinsipp brytes?"
              options={[
                "Open/Closed (OCP)",
                "Dependency Inversion (DIP)",
                "Liskov Substitution (LSP)",
                "Single Responsibility (SRP)",
                "Interface Segregation (ISP)",
              ]}
              correct={2}
              explanation="Subklassen kan ikke erstatte superklassen uten å krasje → bryter LSP"
            />
            <MCQ
              q="2.7: Metode med mange mulige utføringsstier er vanskelig å teste. Hvilket prinsipp brytes?"
              options={[
                "Open/Closed (OCP)",
                "Dependency Inversion (DIP)",
                "Liskov Substitution (LSP)",
                "Single Responsibility (SRP)",
                "Interface Segregation (ISP)",
              ]}
              correct={3}
              explanation="For mange stier = for mange ansvar → bryter SRP"
            />
            <MCQ
              q="2.8: interface StudentLife { void drink(); void eat(); void move(); void rent(); void block(); void run(); void purchase(); void packForTrip(); } — Hvilket prinsipp brytes?"
              options={[
                "Open/Closed (OCP)",
                "Dependency Inversion (DIP)",
                "Liskov Substitution (LSP)",
                "Single Responsibility (SRP)",
                "Interface Segregation (ISP)",
              ]}
              correct={4}
              explanation="Grensesnittet har for mange urelaterte metoder → bryter ISP"
            />
            <MCQ
              q="2.9: Hvilken kode implementerer Driveable-grensesnittet med avhengighetsinversjon?"
              options={[
                "Driver med konkret Car-felt",
                "Driver med konkret Truck-felt",
                "Driver med Driveable-felt (grensesnitt)",
                "Driver uten felt",
              ]}
              correct={2}
              explanation="Avheng av abstraksjonen Driveable, ikke Car/Truck → DIP"
            />
            <MCQ
              q="2.10: Fullfør Open/Closed — gitt: interface Rollable { Integer roll(); } og class Game { private Rollable r; }"
              options={[
                "Game implementerer Rollable direkte",
                "Rollable har konkrete metoder",
                "Die og TestWith6 implementerer Rollable hver for seg",
                "Game arver fra Die",
              ]}
              correct={2}
              explanation="Nye implementasjoner av Rollable (Die, TestWith6) uten å endre Game → OCP"
            />
          </div>
        </Section>

        {/* 2021 åpen */}
        <Section
          title="Eksamen vår 2021 — Åpen analyse"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2 mb-3">
            <p>
              <strong>Oppgave:</strong> Gitt et UML-diagram med
              Liste&lt;E&gt;-grensesnitt og implementasjoner
              (TabellListe, KjedetListe, TabellOrdnetListe,
              KjedetOrdnetListe). StudentListe bruker OrdnetListe&lt;E&gt;.
            </p>
            <p>
              Forklar to utformingsprinsipper som er brukt. Kunne løsningen
              blitt forbedret ytterligere?
            </p>
          </div>
          <Solution>
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 text-sm space-y-3">
              <h4 className="font-bold text-emerald-700 dark:text-emerald-400">
                Professorens fasit
              </h4>
              <div className="space-y-2">
                <p>
                  <strong>SRP / High Cohesion + Low Coupling:</strong> Klassene
                  gjør én og kun én ting.
                </p>
                <p>
                  <strong>LSP + DIP / Indirection + Low Coupling:</strong>{" "}
                  Grensesnitt brukt som indireksjoner — implementasjoner kan
                  lett byttes.
                </p>
                <p>
                  <strong>ISP:</strong> Grensesnittet er delt opp (Liste vs.
                  OrdnetListe) slik at klasser slipper å implementere metoder
                  som ikke gir mening.
                </p>
                <p>
                  <strong>Svakhet:</strong> StudentListen må opprette den
                  konkrete listen selv. Løsning: Factory-mønster eller
                  Dependency Injection.
                </p>
              </div>
            </div>
          </Solution>
        </Section>

        {/* 2022 åpen */}
        <Section title="Eksamen vår 2022 — Åpen analyse">
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2 mb-3">
            <p>
              <strong>Oppgave:</strong> Gitt UML for e-postklient med
              EPostKlient, EPostOppsett, EPostTjeneste (abstrakt),
              HvlEPostTjeneste og TelenorEPostTjeneste. Forklar tre
              utformingsprinsipper fra SOLID og GRASP.
            </p>
          </div>
          <Solution label="Vis foreslått analyse">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
              <p>
                <strong>DIP:</strong> EPostKlient avhenger av abstraksjonen
                EPostTjeneste, ikke HvlEPost/TelenorEPost direkte.
              </p>
              <p>
                <strong>OCP:</strong> Ny e-posttjeneste legges til uten å endre
                EPostKlient — bare lag ny klasse som implementerer
                EPostTjeneste.
              </p>
              <p>
                <strong>SRP / High Cohesion:</strong> Hver klasse har ett
                ansvar (oppsett, tjeneste, klient).
              </p>
              <p>
                <strong>GRASP Indirection:</strong> EPostTjeneste fungerer som
                mellomledd mellom klient og konkrete tjenester.
              </p>
            </div>
          </Solution>
        </Section>

        {/* 2020 åpen */}
        <Section title="Eksamen høst 2020 — Åpen diskusjon">
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2">
            <p>
              <strong>a)</strong> Forklar hva som menes med høy kvalitet av
              programkode og hvorfor erfaringer hjelper oss oppnå det.
            </p>
            <p>
              <strong>b)</strong> Trekk frem to mønstre/praksiser/prinsipper
              du brukte (eller burde brukt) i prosjektet. Diskuter fordeler
              og ulemper.
            </p>
          </div>
          <Solution label="Vis tips til besvarelse">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm">
              <p>
                <strong>Kvalitet:</strong> Lesbarhet, vedlikeholdbarhet,
                testbarhet, lav kobling, høy kohesjon. Erfaringer fra
                SOLID/GRASP gir gjenbrukbare løsninger.
              </p>
              <p className="mt-2">
                <strong>Eksempler:</strong> SRP (skilte ansvar i prosjektet),
                Creator (hvem oppretter objekter), Low Coupling (løse
                avhengigheter mellom moduler).
              </p>
            </div>
          </Solution>
        </Section>
      </div>
    </div>
  );
}
