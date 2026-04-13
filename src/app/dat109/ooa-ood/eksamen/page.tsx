"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Sub-navigation ── */
function SubNav() {
  return (
    <div className="sticky top-0 z-20 -mx-4 px-4 py-2 mb-6 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide text-sm">
        {[
          { href: "/dat109/ooa-ood", label: "Oversikt" },
          { href: "/dat109/ooa-ood/solid", label: "SOLID" },
          { href: "/dat109/ooa-ood/grasp", label: "GRASP" },
          { href: "/dat109/ooa-ood/eksamen", label: "Eksamen", active: true },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              tab.active
                ? "bg-sysdev-500 text-white"
                : "text-[var(--muted)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Quiz question component ── */
function QuizQuestion({
  number,
  question,
  options,
  correctIndex,
  explanation,
  principle,
}: {
  number: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  principle: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (i: number) => {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
  };

  const reset = () => {
    setSelected(null);
    setShowAnswer(false);
  };

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 text-sm font-bold shrink-0">
            {number}
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            {principle}
          </span>
        </div>
        {showAnswer && (
          <button
            onClick={reset}
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Prøv igjen
          </button>
        )}
      </div>

      <p className="text-sm font-medium mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((opt, i) => {
          let classes = "rounded-lg border p-3 text-sm cursor-pointer transition-all ";

          if (!showAnswer) {
            classes +=
              "border-neutral-200 dark:border-neutral-700 hover:border-sysdev-400 hover:bg-sysdev-50 dark:hover:bg-sysdev-950/20";
          } else if (i === correctIndex) {
            classes +=
              "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/20";
          } else if (i === selected && i !== correctIndex) {
            classes +=
              "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/20";
          } else {
            classes +=
              "border-neutral-200 dark:border-neutral-700 opacity-50";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`${classes} w-full text-left flex items-start gap-3`}
              disabled={showAnswer}
            >
              <span className="font-bold text-[var(--muted)] shrink-0 w-5">
                {String.fromCharCode(97 + i)})
              </span>
              <span>{opt}</span>
              {showAnswer && i === correctIndex && (
                <span className="ml-auto text-green-600 dark:text-green-400 shrink-0">{"\u2713"}</span>
              )}
              {showAnswer && i === selected && i !== correctIndex && (
                <span className="ml-auto text-red-600 dark:text-red-400 shrink-0">{"\u2717"}</span>
              )}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">
            Forklaring
          </h4>
          <p className="text-sm text-[var(--muted)]">{explanation}</p>
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function EksamenPage() {
  const [score2023, setScore2023] = useState({ correct: 0, total: 0 });
  const [score2024, setScore2024] = useState({ correct: 0, total: 0 });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/ooa-ood" className="hover:text-[var(--accent)]">OOA og OOD</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamen</span>
      </div>

      <SubNav />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Eksamensdrilling — SOLID og GRASP</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle flervalgsoppgaver fra eksamen 2023 og 2024 (oppgave 2). Klikk på svaret
          du tror er riktig — du får umiddelbart tilbakemelding med forklaring.
        </p>
      </div>

      {/* Mental checklist */}
      <div className="rounded-xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-5 mb-8">
        <h2 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">
          Mental sjekkliste — bruk denne mens du svarer
        </h2>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {[
            ["Klasse gjør for mange ting?", "SRP / High Cohesion"],
            ["Kode endres for ny funksjonalitet?", "OCP"],
            ["Override → UnsupportedOperationException?", "LSP"],
            ["Mange urelaterte metoder i grensesnitt?", "ISP"],
            ["Avhenger av konkrete klasser?", "DIP"],
            ["if/else for å sjekke typer?", "Polymorphism"],
            ["Hvem har dataene for oppgaven?", "Information Expert"],
            ["Hvem eier/inneholder objektet?", "Creator"],
          ].map(([q, a]) => (
            <div key={q} className="flex items-start gap-2 rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200/60 dark:border-amber-800/40 px-3 py-2">
              <span className="text-amber-500 mt-0.5 shrink-0">{"\u2192"}</span>
              <div>
                <span className="text-[var(--muted)]">{q}</span>{" "}
                <span className="font-bold text-amber-700 dark:text-amber-400">{a}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ Eksamen vår 2023 ═══════ */}
      <h2 className="text-2xl font-bold mb-2">Eksamen vår 2023 — Oppgave 2</h2>
      <p className="text-sm text-[var(--muted)] mb-4">10 flervalgsoppgaver om SOLID og GRASP</p>

      <QuizQuestion
        number="2.1"
        question="Et moderne rammeverk bruker MVC (Model-View-Controller). Hva er den viktigste fordelen med denne arkitekturen i sammenheng med SOLID-prinsippene?"
        options={[
          "Modellen kan kjøre raskere fordi den er uavhengig av visningen",
          "Kontrolleren garanterer at alle feil blir håndtert",
          "Visningen kan aldri endre data i modellen",
          "Hver seksjon (Model, View, Controller) følger Single Responsibility Principle",
        ]}
        correctIndex={3}
        explanation="MVC deler systemet i tre deler der hver har ETT ansvar: Model håndterer data, View håndterer visning, Controller håndterer input. Dette er SRP i praksis — hver seksjon har én grunn til å endre seg."
        principle="SRP"
      />

      <QuizQuestion
        number="2.2"
        question="Hvilken av følgende er IKKE et GRASP-prinsipp?"
        options={[
          "Creator",
          "Information Expert",
          "Controller",
          "Motivator",
        ]}
        correctIndex={3}
        explanation="'Motivator' finnes ikke i GRASP. De 9 GRASP-prinsippene er: Information Expert, Creator, Controller, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations."
        principle="GRASP"
      />

      <QuizQuestion
        number="2.3"
        question="Hva er 'Informasjonsekspert' (Information Expert) fra GRASP?"
        options={[
          "Et verktøy for å dokumentere informasjonsflyt i et system",
          "Et designmønster for å kapsle inn informasjon i en database",
          "Et prinsipp for å tildele ansvar til objekt",
          "En metode for å sikre informasjonssikkerhet i software",
        ]}
        correctIndex={2}
        explanation="Information Expert handler om å tildele ansvar til det objektet som har informasjonen som trengs. Eksempel: Brettet har rutene → Brettet er eksperten for å finne ruter."
        principle="Information Expert"
      />

      <QuizQuestion
        number="2.4"
        question="Hva er en 'Skaper' (Creator) fra GRASP?"
        options={[
          "En klasse som er ansvarlig for å designe grensesnittet til en applikasjon",
          "Hvem som skal være ansvarlig for å lage en ny forekomst av en klasse",
          "Et designmønster som skaper en kopi av eksisterende objekter for å unngå kostbar initialisering",
          "Hvem som skal være ansvarlig for å lage en ny forekomst av et objekt",
        ]}
        correctIndex={1}
        explanation="Creator handler om hvem som skal opprette (lage en forekomst av) en klasse. Alternativ d) sier 'forekomst av et objekt' — men det er upresist. Du lager forekomst av en klasse, som da blir et objekt."
        principle="Creator"
      />

      <QuizQuestion
        number="2.5"
        question="Et selskaps HR-system har blitt stadig mer komplekst. Når nye funksjoner skal legges til, for eksempel nye typer feriepenger, kreves det betydelige endringer i eksisterende moduler. Hvilket SOLID-prinsipp brytes her?"
        options={[
          "Open/Closed Principle",
          "Single Responsibility Principle",
          "Liskov Substitution Principle",
          "Interface Segregation Principle",
        ]}
        correctIndex={0}
        explanation="OCP sier at kode skal være åpen for utvidelse, men lukket for endring. Når du MÅ endre eksisterende moduler for å legge til ny funksjonalitet (nye typer feriepenger), bryter du OCP. Løsning: bruk grensesnitt, slik at nye typer kan legges til uten å røre eksisterende kode."
        principle="OCP"
      />

      <QuizQuestion
        number="2.6"
        question="En utledet klasse overskriver (override) en arvet metode ved å kaste en UnsupportedOperationException. Hvilket SOLID-prinsipp brytes?"
        options={[
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Dependency Inversion Principle",
        ]}
        correctIndex={2}
        explanation="LSP sier at subklasser skal kunne erstatte superklasser uten feil. Når en subklasse kaster UnsupportedOperationException, bryter den løftet superklassen gir — kode som forventer superklassen vil krasje med subklassen."
        principle="LSP"
      />

      <QuizQuestion
        number="2.7"
        question="En utvikler finner at en av klassene har mange utføringsstier (execution paths) og er vanskelig å teste. Hvilket SOLID-prinsipp er sannsynligvis brutt?"
        options={[
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Interface Segregation Principle",
          "Single Responsibility Principle",
        ]}
        correctIndex={3}
        explanation="Mange utføringsstier = klassen gjør mange forskjellige ting = for mange grunner til å endre seg. Dette er SRP-brudd. En klasse med ett ansvar har færre utføringsstier og er enklere å teste."
        principle="SRP"
      />

      <QuizQuestion
        number="2.8"
        question={'Et grensesnitt "StudentLife" har følgende metoder: drink(), eat(), move(), rent(), block(), run(), purchase(), packForTrip(). Hvilket SOLID-prinsipp brytes mest åpenbart?'}
        options={[
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Dependency Inversion Principle",
          "Interface Segregation Principle",
        ]}
        correctIndex={4}
        explanation="ISP sier at klienter ikke skal tvinges til å avhenge av grensesnitt de ikke bruker. StudentLife har 8 urelaterte metoder — en klasse som bare trenger eat() og drink() tvinges til å implementere alt. Løsning: del opp i flere små grensesnitt."
        principle="ISP"
      />

      <QuizQuestion
        number="2.9"
        question="Hvilket av disse følger Dependency Inversion Principle? (Driveable er et grensesnitt med metodene steerLeft(), steerRight(), accelerate(), brake())"
        options={[
          "Driver har separate felt for Motorcycle, Car og Truck og velger med if/else",
          "Driver arver fra Motorcycle og overstyrer kjøremetodene",
          "Driver har et felt 'private Driveable vehicle' og kaller vehicle.steerLeft() osv.",
          "MultiDriver har en metode som tar inn en String og lager riktig kjøretøy med switch/case",
        ]}
        correctIndex={2}
        explanation="DIP: avheng av abstraksjoner, ikke konkrete klasser. Alternativ c) har Driver med 'private Driveable vehicle' — Driver avhenger av grensesnittet Driveable, ikke konkrete klasser. Alternativ a) og d) avhenger direkte av konkrete klasser."
        principle="DIP"
      />

      <QuizQuestion
        number="2.10"
        question="Et spill bruker grensesnittet 'Rollable' med metoden roll(). Klassen 'Game' bruker Rollable. Hvilket design følger Open/Closed Principle?"
        options={[
          "Game oppretter Die direkte inne i seg selv",
          "Game arver fra Die og overstyrer roll()",
          "Die og TestWith6 implementerer begge Rollable — Game bruker Rollable",
          "MyGame extends Game og oppretter en Die direkte",
        ]}
        correctIndex={2}
        explanation="OCP: åpen for utvidelse, lukket for endring. Når Die og TestWith6 begge implementerer Rollable, kan du lage nye implementasjoner (f.eks. LoadedDie) uten å endre Game. Game er lukket for endring, men åpen for utvidelse via grensesnittet."
        principle="OCP"
      />

      {/* ═══════ Eksamen vår 2024 ═══════ */}
      <h2 className="text-2xl font-bold mb-2 mt-10">Eksamen vår 2024 — Oppgave 2</h2>
      <p className="text-sm text-[var(--muted)] mb-4">Flervalgsoppgaver om SOLID og GRASP</p>

      <QuizQuestion
        number="2a"
        question="Du oppdager at du ofte må endre en klasse fordi den gjør for mange forskjellige ting. Hvilket prinsipp bør du vurdere for å forbedre designet?"
        options={[
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Single Responsibility Principle",
          "Interface Segregation Principle",
        ]}
        correctIndex={2}
        explanation="Klassen gjør 'for mange forskjellige ting' = for mange grunner til å endre = SRP-brudd. Løsning: del opp klassen slik at hver del har ett ansvarsområde."
        principle="SRP"
      />

      <QuizQuestion
        number="2b"
        question="Hvilket prinsipp ville du bruke for å unngå sterk avhengighet mellom konkrete klasser, og foretrekke abstraksjoner?"
        options={[
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Dependency Inversion Principle",
        ]}
        correctIndex={3}
        explanation="DIP handler nettopp om dette: avheng av abstraksjoner (grensesnitt), ikke konkrete klasser. Nøkkelordet 'foretrekke abstraksjoner' peker direkte på DIP."
        principle="DIP"
      />

      <QuizQuestion
        number="2c"
        question="Hvilket prinsipp handler om at klienter ikke skal tvinges til å avhenge av grensesnitt de ikke bruker?"
        options={[
          "Single Responsibility Principle",
          "Interface Segregation Principle",
          "Dependency Inversion Principle",
          "Open/Closed Principle",
        ]}
        correctIndex={1}
        explanation="ISP handler om at grensesnitt skal være små og fokuserte. 'Tvinges til å avhenge av grensesnitt de ikke bruker' er nesten ordrett definisjonen av ISP."
        principle="ISP"
      />

      <QuizQuestion
        number="2d"
        question="Hvilket prinsipp oppfordrer til at subklasser bør kunne erstatte deres supertyper uten å forandre programmets korrekthet?"
        options={[
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Dependency Inversion Principle",
        ]}
        correctIndex={2}
        explanation="LSP: subklasser skal kunne brukes overalt der superklassen brukes, uten at programmet oppfører seg feil. 'Erstatte supertyper uten å forandre korrekthet' er definisjonen av LSP."
        principle="LSP"
      />

      <QuizQuestion
        number="2e"
        question="Når du designer moduler og klasser, og du ønsker å sørge for at de er lett utbyttbare, hvilket prinsipp er mest relevant?"
        options={[
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Interface Segregation Principle",
        ]}
        correctIndex={1}
        explanation="'Lett utbyttbare' = du kan legge til nye moduler uten å endre eksisterende. OCP: åpen for utvidelse (nye moduler), lukket for endring (eksisterende kode røres ikke)."
        principle="OCP"
      />

      <QuizQuestion
        number="2f"
        question="Om du lager en ny klasse som håndterer alle detaljer rundt logging for applikasjonen, hvilket prinsipp følger du da?"
        options={[
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Dependency Inversion Principle",
        ]}
        correctIndex={0}
        explanation="Ved å lage en egen klasse for logging, gir du logging-ansvaret ETT sted. Det er SRP: én klasse, én jobb. (Det kan også sees som GRASP Pure Fabrication, men spørsmålet spør om SOLID.)"
        principle="SRP"
      />

      <QuizQuestion
        number="2g"
        question="Dersom en klasse har mange metoder og instansvariabler relatert til mange ulike oppgaver, hvilket GRASP-prinsipp er da blitt brutt?"
        options={[
          "High Cohesion",
          "Low Coupling",
          "Information Expert",
          "Controller",
        ]}
        correctIndex={0}
        explanation="Mange metoder om mange ulike oppgaver = lav samhørighet = High Cohesion er brutt. NB: Spørsmålet spør om GRASP spesifikt. I SOLID ville svaret vært SRP (som er nesten det samme)."
        principle="High Cohesion"
      />

      {/* Ekstra drilling: Eldre eksamener */}
      <h2 className="text-2xl font-bold mb-2 mt-10">Bonusoppgaver — Eldre eksamener (2020-2022)</h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        Disse eksamenene hadde skriftlige oppgaver, ikke flervalg. Her er spørsmålene omformulert til quiz-format.
      </p>

      <QuizQuestion
        number="B1"
        question="I et UML-diagram bruker klassen 'StudentListe' grensesnittet 'OrdnetListe<E>' istedenfor den konkrete klassen 'TabellOrdnetListe<E>'. Hvilket GRASP-prinsipp demonstreres her?"
        options={[
          "Information Expert",
          "Creator",
          "Indirection",
          "Polymorphism",
        ]}
        correctIndex={2}
        explanation="Grensesnittet OrdnetListe fungerer som et mellomledd (indireksjon) mellom StudentListe og den konkrete TabellOrdnetListe. StudentListe avhenger av abstraksjonen, ikke av den konkrete implementasjonen."
        principle="Indirection"
      />

      <QuizQuestion
        number="B2"
        question="I Monopol-spillet har Rute en abstrakt metode 'landetPå(Spiller)', og subklassene StartRute, InntektsskattRute og SkjøteRute implementerer hver sin versjon. Hvilket GRASP-prinsipp er dette?"
        options={[
          "Information Expert",
          "Polymorphism",
          "Creator",
          "Pure Fabrication",
        ]}
        correctIndex={1}
        explanation="Når oppførselen varierer basert på type (StartRute gjør noe annet enn InntektsskattRute), og dette løses med overstyrte metoder istedenfor if/else — det er Polymorphism."
        principle="Polymorphism"
      />

      <QuizQuestion
        number="B3"
        question="I et e-postsystem er det et grensesnitt 'EPostTjeneste' med metodene kopleTil(), send() og motta(). Konkrete klasser TelenorEPost og HvlEPost implementerer grensesnittet. Hvilket GRASP-prinsipp brukes?"
        options={[
          "Creator",
          "Controller",
          "Protected Variations",
          "High Cohesion",
        ]}
        correctIndex={2}
        explanation="Protected Variations: identifiser punkter som kan endre seg (e-postleverandøren), og beskytt resten av systemet med et grensesnitt. Når leverandøren byttes, trenger bare den konkrete klassen å endres."
        principle="Protected Variations"
      />

      {/* Tips */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mt-10 mb-4">
        <h2 className="font-bold text-lg mb-3 text-sysdev-700 dark:text-sysdev-400">
          Tips for eksamensdagen
        </h2>
        <ul className="text-sm space-y-2">
          <li>
            <strong>Les spørsmålet nøye:</strong> Spør det om SOLID eller GRASP? Svaret avhenger av dette.
            &quot;Klasse gjør for mye&quot; = SRP (SOLID) eller High Cohesion (GRASP) avhengig av hva som spørres.
          </li>
          <li>
            <strong>Se etter nøkkelord:</strong> Bruk den mentale sjekklisten øverst på denne siden.
            Nøkkelord som &quot;UnsupportedOperationException&quot;, &quot;konkrete klasser&quot;, &quot;mange metoder i grensesnitt&quot; peker mot spesifikke prinsipper.
          </li>
          <li>
            <strong>Eliminer åpenbart feil svar først:</strong> Ofte er 2 av alternativene klart feil.
            Da står du igjen med 2 kandidater — les nøye og se hva spørsmålet egentlig spør om.
          </li>
          <li>
            <strong>Husk overlappene:</strong> SRP ≈ High Cohesion. DIP ≈ Indirection ≈ Protected Variations.
            OCP ≈ Polymorphism. Hvis du er usikker, se om konteksten er SOLID eller GRASP.
          </li>
          <li>
            <strong>Ikke overtenk:</strong> Flervalg er designet for å teste om du kjenner prinsippet.
            Det enkleste, mest opplagte svaret er nesten alltid riktig.
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Link
          href="/dat109/ooa-ood/grasp"
          className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          GRASP-mønstrene
        </Link>
        <Link
          href="/dat109/ooa-ood"
          className="flex items-center gap-2 text-sm font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline"
        >
          Tilbake til oversikt
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
