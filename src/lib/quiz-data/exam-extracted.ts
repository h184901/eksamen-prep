/**
 * Ekte flervalg-spørsmål hentet ordrett fra DAT109-eksamenene 2020-2024.
 * Disse er de mest relevante siden eksamen vår 2024+ har samme stil.
 *
 * Alle spørsmål her er VERIFIED mot fasit / fra agent-analyse i prompt 1.
 * Ikke endre ordlyd uten å sjekke originalen.
 */

import type { QuizQuestion } from "@/lib/quiz-types";

export const EXAM_QUESTIONS: QuizQuestion[] = [
  // ════════════════════════════════════════════════════════════════
  // V2023 — Oppgave 2 (OOA/OOD) — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "v2023-2.1",
    topic: "solid",
    source: "V2023",
    question:
      "Et moderne rammeverk bruker MVC (Model-View-Controller). Hva er den viktigste fordelen med denne arkitekturen i sammenheng med SOLID-prinsippene?",
    options: [
      "Modellen kan kjøre raskere fordi den er uavhengig av visningen",
      "Kontrolleren garanterer at alle feil blir håndtert",
      "Visningen kan aldri endre data i modellen",
      "Hver seksjon (Model, View, Controller) følger Single Responsibility Principle",
    ],
    correctIndex: 3,
    explanation:
      "MVC deler systemet i tre deler der hver har ETT ansvar: Model = data, View = visning, Controller = input. Dette er SRP i praksis — hver del har én grunn til å endre seg.",
    pensumRef: "V2023 oppg 2.1",
  },
  {
    id: "v2023-2.2",
    topic: "grasp",
    source: "V2023",
    question: "Hvilken av følgende er IKKE et GRASP-prinsipp?",
    options: ["Creator", "Information Expert", "Controller", "Motivator"],
    correctIndex: 3,
    explanation:
      "'Motivator' finnes ikke i GRASP. De 9 GRASP-prinsippene er: Information Expert, Creator, Controller, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations.",
    pensumRef: "V2023 oppg 2.2",
  },
  {
    id: "v2023-2.3",
    topic: "grasp",
    source: "V2023",
    question: "Hva er 'Informasjonsekspert' (Information Expert) fra GRASP?",
    options: [
      "Et verktøy for å dokumentere informasjonsflyt i et system",
      "Et designmønster for å kapsle inn informasjon i en database",
      "Et prinsipp for å tildele ansvar til objekt",
      "En metode for å sikre informasjonssikkerhet i software",
    ],
    correctIndex: 2,
    explanation:
      "Information Expert handler om å tildele ansvar til det objektet som har informasjonen som trengs. F.eks. Brettet har rutene → Brettet er eksperten for å finne ruter.",
    pensumRef: "V2023 oppg 2.3",
  },
  {
    id: "v2023-2.4",
    topic: "grasp",
    source: "V2023",
    question: "Hva er en 'Skaper' (Creator) fra GRASP?",
    options: [
      "En klasse som er ansvarlig for å designe grensesnittet til en applikasjon",
      "Hvem som skal være ansvarlig for å lage en ny forekomst av en klasse",
      "Et designmønster som skaper en kopi av eksisterende objekter for å unngå kostbar initialisering",
      "Hvem som skal være ansvarlig for å lage en ny forekomst av et objekt",
    ],
    correctIndex: 1,
    explanation:
      "Creator handler om hvem som skal opprette (lage en forekomst av) en KLASSE — ikke et objekt. Du lager forekomst av en klasse, som da blir et objekt.",
    pensumRef: "V2023 oppg 2.4",
  },
  {
    id: "v2023-2.5",
    topic: "solid",
    source: "V2023",
    question:
      "Et selskaps HR-system har blitt stadig mer komplekst. Når nye funksjoner skal legges til, for eksempel nye typer feriepenger, kreves det betydelige endringer i eksisterende moduler. Hvilket SOLID-prinsipp brytes her?",
    options: [
      "Open/Closed Principle",
      "Single Responsibility Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
    ],
    correctIndex: 0,
    explanation:
      "OCP sier at kode skal være åpen for utvidelse, men lukket for endring. Når du MÅ endre eksisterende moduler for å legge til nye typer feriepenger, bryter du OCP. Løsning: bruk grensesnitt slik at nye typer kan legges til uten å røre eksisterende kode.",
    pensumRef: "V2023 oppg 2.5",
  },
  {
    id: "v2023-2.6",
    topic: "solid",
    source: "V2023",
    question:
      "En utledet klasse overskriver (override) en arvet metode ved å kaste en UnsupportedOperationException. Hvilket SOLID-prinsipp brytes?",
    options: [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Dependency Inversion Principle",
    ],
    correctIndex: 2,
    explanation:
      "LSP sier at subklasser skal kunne erstatte superklasser uten feil. Når en subklasse kaster UnsupportedOperationException, bryter den løftet superklassen gir — kode som forventer superklassen vil krasje med subklassen. Klassisk LSP-brudd.",
    pensumRef: "V2023 oppg 2.6",
  },
  {
    id: "v2023-2.7",
    topic: "solid",
    source: "V2023",
    question:
      "En utvikler finner at en av klassene har mange utføringsstier (execution paths) og er vanskelig å teste. Hvilket SOLID-prinsipp er sannsynligvis brutt?",
    options: [
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
      "Single Responsibility Principle",
    ],
    correctIndex: 3,
    explanation:
      "Mange utføringsstier = klassen gjør mange forskjellige ting = for mange grunner til å endre seg. Dette er SRP-brudd. En klasse med ett ansvar har færre utføringsstier og er enklere å teste.",
    pensumRef: "V2023 oppg 2.7",
  },
  {
    id: "v2023-2.8",
    topic: "solid",
    source: "V2023",
    question:
      "Et grensesnitt 'StudentLife' har følgende metoder: drink(), eat(), move(), rent(), block(), run(), purchase(), packForTrip(). Hvilket SOLID-prinsipp brytes mest åpenbart?",
    options: [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Dependency Inversion Principle",
      "Interface Segregation Principle",
    ],
    correctIndex: 4,
    explanation:
      "ISP sier at klienter ikke skal tvinges til å avhenge av grensesnitt de ikke bruker. StudentLife har 8 urelaterte metoder — en klasse som bare trenger eat() og drink() tvinges til å implementere alt. Løsning: del opp i flere små grensesnitt.",
    pensumRef: "V2023 oppg 2.8",
  },
  {
    id: "v2023-2.9",
    topic: "solid",
    source: "V2023",
    question:
      "Hvilket av disse følger Dependency Inversion Principle? Driveable er et grensesnitt med metodene steerLeft(), steerRight(), accelerate(), brake().",
    options: [
      "Driver har separate felt for Motorcycle, Car og Truck og velger med if/else",
      "Driver arver fra Motorcycle og overstyrer kjøremetodene",
      "Driver har et felt 'private Driveable vehicle' og kaller vehicle.steerLeft() osv.",
      "MultiDriver har en metode som tar inn en String og lager riktig kjøretøy med switch/case",
    ],
    correctIndex: 2,
    explanation:
      "DIP: avheng av abstraksjoner, ikke konkrete klasser. Alternativ c) har Driver med 'private Driveable vehicle' — Driver avhenger av grensesnittet Driveable, ikke konkrete klasser. De andre alternativene avhenger direkte av konkrete klasser.",
    pensumRef: "V2023 oppg 2.9",
  },
  {
    id: "v2023-2.10",
    topic: "solid",
    source: "V2023",
    question:
      "Et spill bruker grensesnittet 'Rollable' med metoden roll(). Klassen 'Game' bruker Rollable. Hvilket design følger Open/Closed Principle?",
    options: [
      "Game oppretter Die direkte inne i seg selv",
      "Game arver fra Die og overstyrer roll()",
      "Die og TestWith6 implementerer begge Rollable — Game bruker Rollable",
      "MyGame extends Game og oppretter en Die direkte",
    ],
    correctIndex: 2,
    explanation:
      "OCP: åpen for utvidelse, lukket for endring. Når Die og TestWith6 begge implementerer Rollable, kan du lage nye implementasjoner (f.eks. LoadedDie) uten å endre Game. Game er lukket for endring, men åpen for utvidelse via grensesnittet.",
    pensumRef: "V2023 oppg 2.10",
  },

  // ════════════════════════════════════════════════════════════════
  // V2023 — Oppgave 3 (Utviklingsmetode) — 15 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "v2023-3.1",
    topic: "scrum",
    source: "V2023",
    question: "I Scrum, hvilken av følgende artefakter leveres på slutten av hver sprint?",
    options: [
      "Et dokument som inneholder test-tilfeller for gjeldende sprint",
      "En arkitektonisk utforming av løsningen",
      "Ett inkrement mot ferdig produkt",
      "Trådmodeller som viser utforming av brukergrensesnitt",
    ],
    correctIndex: 2,
    explanation:
      "Et inkrement = fungerende, potensielt leverbar programvare. Det er det eneste artefaktet som leveres i slutten av hver sprint. Dokumenter, tegninger og wireframes er ikke et inkrement.",
    pensumRef: "V2023 oppg 3.1",
  },
  {
    id: "v2023-3.2",
    topic: "scrum",
    source: "V2023",
    question: "På hvilket grunnlag bør oppgavene i produktkøen prioriteres?",
    options: [
      "Verdien av oppgavene som leveres",
      "Kompleksiteten til oppgavene som leveres",
      "Størrelsen på oppgavene som leveres",
      "Risikoen forbundet med oppgavene",
      "Basert på Scrum-lagets valg",
    ],
    correctIndex: 0,
    explanation:
      "Scrum prioriterer alltid etter forretningsmessig verdi. Produkteieren bestemmer rekkefølgen — det viktigste skal leveres først, slik at kunden får mest mulig verdi tidlig.",
    pensumRef: "V2023 oppg 3.2",
  },
  {
    id: "v2023-3.4",
    topic: "scrum",
    source: "V2023",
    question: "Har Scrum en test-rolle?",
    options: ["Ja", "Nei"],
    correctIndex: 1,
    explanation:
      "Scrum har KUN tre roller: Produkteier, Scrum Master og Utviklingsteam. Testing er en del av teamets felles ansvar — det er ikke en separat rolle. Dette er en klassisk eksamensfelle.",
    pensumRef: "V2023 oppg 3.4",
  },
  {
    id: "v2023-3.5",
    topic: "scrum",
    source: "V2023",
    question:
      "Hva bør et utviklingslag gjøre under et planleggingsmøte for neste iterasjon når de innser at de må gjøre flere oppgaver enn de kan fullføre i iterasjonen?",
    options: [
      "Få flere utviklere om bord (utvide laget)",
      "Søke hjelp fra de andre lagmedlemmene",
      "Jobbe overtid",
      "Diskutere utfordringene med kunden for å endre produktkøen",
    ],
    correctIndex: 3,
    explanation:
      "Når laget ikke kan fullføre alt, snakker man med produkteieren (kunden) for å re-prioritere produktkøen. Aldri overtid (bryter prinsipp om bærekraftig tempo), aldri utvide laget midt i en sprint.",
    pensumRef: "V2023 oppg 3.5",
  },
  {
    id: "v2023-3.6",
    topic: "scrum",
    source: "V2023",
    question: "Når er en Sprint ferdig i Scrum?",
    options: [
      "Når alle oppgavene i Sprint-køen er fullført",
      "Når produkteieren foreslår det",
      "Når de endelige testene for sprinten er fullført",
      "Når tidsboksen utløper",
    ],
    correctIndex: 3,
    explanation:
      "Sprinten er ferdig når TIDSBOKSEN utløper — uavhengig av om alle oppgavene er gjort. Uferdig arbeid flyttes tilbake til Product Backlog. Tidsbokset = fast varighet er hele poenget.",
    pensumRef: "V2023 oppg 3.6",
  },
  {
    id: "v2023-3.7",
    topic: "xp",
    source: "V2023",
    question: "Ekstremprogrammering har 5 verdier, hvilken av følgende er ikke en av dem?",
    options: ["Enkelhet", "Mot", "Dokumentasjon", "Respekt", "Tilbakemelding", "Kommunikasjon"],
    correctIndex: 2,
    explanation:
      "De 5 XP-verdiene er: Enkelhet, Kommunikasjon, Tilbakemelding, Respekt og Mot. Dokumentasjon er IKKE en XP-verdi — XP fokuserer på fungerende kode med tester som dokumentasjon.",
    pensumRef: "V2023 oppg 3.7",
  },
  {
    id: "v2023-3.8",
    topic: "scrum",
    source: "V2023",
    question: "Hva mener vi med et tverrfunksjonelt utviklingslag?",
    options: [
      "Hvert medlem i utviklingslaget bør være tverrfunksjonelt",
      "Utviklerne skal være i stand til å lage tester og å utføre dem",
      "Utviklingslaget må samarbeide med de andre medlemmene",
      "Utviklingslaget består av utviklere og testere",
      "Utviklingslaget bør ha all kompetanse som er nødvendig for å levere det ferdige inkrementet",
    ],
    correctIndex: 4,
    explanation:
      "Tverrfunksjonelt = TEAMET som helhet har all kompetanse — IKKE at hvert individ må være eksperter på alt. Hovedpoenget er at teamet skal kunne levere et ferdig inkrement uten å være avhengig av eksterne ressurser.",
    pensumRef: "V2023 oppg 3.8",
  },
  {
    id: "v2023-3.9",
    topic: "scrum",
    source: "V2023",
    question: "Hva viser et nedbrenningsdiagram (burndown chart)?",
    options: [
      "Prosjektfremdrift",
      "Mengde gjenstående arbeid i forhold til tid",
      "Hastigheten til laget",
      "Kapasiteten til lagmedlemmene",
      "Hvor mange flere oppgaver som kan gjøres i en Sprint",
    ],
    correctIndex: 1,
    explanation:
      "Burndown chart har Y-akse = gjenstående arbeid (story points) og X-akse = tid (dager). Den viser om laget brenner ned arbeid i et passende tempo. Hastighet (velocity) er noe annet.",
    pensumRef: "V2023 oppg 3.9",
  },
  {
    id: "v2023-3.10",
    topic: "scrum",
    source: "V2023",
    question: "Hvilken verdi er IKKE blant de fire fra det agile manifestet?",
    options: [
      "Personer og samspill fremfor prosesser og verktøy",
      "Samarbeid med kunden fremfor kontraktsforhandlinger",
      "Strukturert planlegging foran tilpasset planlegging",
      "Å reagere på endringer fremfor å følge en plan",
      "Programvare som virker fremfor omfattende dokumentasjon",
    ],
    correctIndex: 2,
    explanation:
      "'Strukturert planlegging foran tilpasset planlegging' er det STIKK MOTSATTE av agile-manifestet, som verdsetter 'å reagere på endringer fremfor å følge en plan'. Dette er en klassisk felle.",
    pensumRef: "V2023 oppg 3.10",
  },
  {
    id: "v2023-3.11",
    topic: "xp",
    source: "V2023",
    question: "Hva er parprogrammering?",
    options: [
      "To personer jobber sammen for å kode på en datamaskin",
      "En person koder på to datamaskiner",
      "To personer som jobber på to datamaskiner",
      "Et par av personer som jobber med koding alene",
    ],
    correctIndex: 0,
    explanation:
      "Parprogrammering = TO personer, ÉN datamaskin. Den ene er driver (skriver), den andre navigator (tenker strategisk). De bytter roller jevnlig.",
    pensumRef: "V2023 oppg 3.11",
  },
  {
    id: "v2023-3.12",
    topic: "ci-cd-devops",
    source: "V2023",
    question: "Hvilket av følgende utsagn beskriver kontinuerlig integrasjon best?",
    options: [
      "En teknikk for kontinuerlig testing og distribusjon av kode",
      "En teknikk for kontinuerlig integrering av data fra ulike kilder",
      "En teknikk for kontinuerlig overvåking av tjenerytelse",
      "En teknikk for kontinuerlig optimalisering av kode med hensyn på ytelse",
    ],
    correctIndex: 0,
    explanation:
      "CI = utviklere integrerer kode ofte (minst daglig) i et felles repo, og automatiserte tester kjøres ved hver innsjekking. Det handler om kontinuerlig testing av integrasjonen.",
    pensumRef: "V2023 oppg 3.12",
  },
  {
    id: "v2023-3.14",
    topic: "ci-cd-devops",
    source: "V2023",
    question: "Hvilket av følgende lag får prioritet i DevOps?",
    options: ["Driftslag", "Utviklingslag", "Både a) og b)", "Ingen av ovennevnte"],
    correctIndex: 2,
    explanation:
      "Hele poenget med DevOps er at Dev og Ops har LIKE STOR betydning og samarbeider gjennom hele livssyklusen. Ingen av dem prioriteres over den andre.",
    pensumRef: "V2023 oppg 3.14",
  },
  {
    id: "v2023-3.15",
    topic: "scrum",
    source: "V2023",
    question: "I Scrum, hvilken av følgende aktiviteter er IKKE tidsbokset?",
    options: ["Sprint retrospektiv", "Sprint", "Gjennomgang av produktkø", "Daglig Scrum", "Gjennomgang av Sprint"],
    correctIndex: 2,
    explanation:
      "Gjennomgang av produktkø (Backlog Refinement / Grooming) er ikke en formell Scrum-hendelse og er derfor ikke tidsbokset. Alle de andre aktivitetene har faste tidsbokser i Scrum Guide.",
    pensumRef: "V2023 oppg 3.15",
  },

  // ════════════════════════════════════════════════════════════════
  // V2024 — Oppgave 2 (OOA/OOD + OOP-fundamenter)
  // ════════════════════════════════════════════════════════════════
  {
    id: "v2024-2a",
    topic: "oop-fundamenter",
    source: "V2024",
    question: "Hva er forskjellen mellom en klasse og et objekt?",
    options: [
      "En klasse er en spesifikk instans av et objekt",
      "En klasse beskriver en samling av objekter som har like egenskaper og atferd, mens et objekt er en spesifikk instans av en klasse",
      "En klasse er en metode for å initialisere et objekt",
      "En klasse er en referanse til et objekt",
    ],
    correctIndex: 1,
    explanation:
      "En klasse er malen/typen — den definerer hvilke attributter og metoder objekter av denne typen skal ha. Et objekt er en konkret forekomst av klassen. Eksempel: `Spiller s = new Spiller(\"Erlend\")` — Spiller er klassen, s er objektet.",
    pensumRef: "V2024 oppg 2a",
  },
  {
    id: "v2024-2b",
    topic: "oop-fundamenter",
    source: "V2024",
    question:
      "\"Allows us to consider complex ideas while ignoring irrelevant detail that would confuse us.\" Hvilket OOP-prinsipp beskriver dette?",
    options: ["Abstraction", "Encapsulation", "Generalisation", "Polymorphism", "Object"],
    correctIndex: 0,
    explanation:
      "Dette er definisjonen av abstraksjon. Vi modellerer det viktige (f.eks. at en bil har hastighet og kan akselerere) og ignorerer detaljer (motorens indre kjemi). Abstraksjon = mental modell på riktig nivå.",
    pensumRef: "V2024 oppg 2b",
  },
  {
    id: "v2024-2c",
    topic: "oop-fundamenter",
    source: "V2024",
    question:
      "\"Allows us to focus on what something does without considering the complexities of how it works.\" Hvilket OOP-prinsipp beskriver dette?",
    options: ["Abstraction", "Encapsulation", "Generalisation", "Polymorphism", "Object"],
    correctIndex: 1,
    explanation:
      "Encapsulation (innkapsling) skjuler implementasjonen bak et grensesnitt — vi BRUKER en metode uten å vite hvordan den fungerer internt. Derfor: 'fokus på HVA, ikke HVORDAN'.",
    pensumRef: "V2024 oppg 2c",
  },
  {
    id: "v2024-2d",
    topic: "oop-fundamenter",
    source: "V2024",
    question: "Which among the following is NOT one of the essential principles of OOP?",
    options: ["Abstraction", "Inheritance", "Polymorphism", "Generalization"],
    correctIndex: 3,
    explanation:
      "De 4 essensielle OOP-prinsippene er: Abstraction, Encapsulation, Inheritance, Polymorphism. Generalization er en RELASJON (er-en) — ikke et grunnprinsipp.",
    pensumRef: "V2024 oppg 2d",
  },
  {
    id: "v2024-2e",
    topic: "oop-fundamenter",
    source: "V2024",
    question: "An object has _________.",
    options: ["Attributes", "Behaviour", "State", "All of these"],
    correctIndex: 3,
    explanation:
      "Et objekt har TILSTAND (attributter/state), OPPFØRSEL (metoder/behaviour) og IDENTITET (referanse i minne). Alle tre er essensielle. F16 slide 6 beskriver dette eksplisitt.",
    pensumRef: "V2024 oppg 2e",
  },
  {
    id: "v2024-2f",
    topic: "uml",
    source: "V2024",
    question: "Hva er formålet med et sekvensdiagram i UML?",
    options: [
      "Å vise strukturen til et system",
      "Å vise hvordan objekter samhandler over tid",
      "Å vise brukerinteraksjoner",
      "Å vise organisasjonsstrukturen i et system",
    ],
    correctIndex: 1,
    explanation:
      "Sekvensdiagram viser objektsamhandling over tid — livslinjer + meldinger mellom objekter. Klassediagram viser STRUKTUR. Brukstilfellediagram viser brukerinteraksjon på høyt nivå.",
    pensumRef: "V2024 oppg 2f",
  },
  {
    id: "v2024-2g",
    topic: "uml",
    source: "V2024",
    question: "Hvilke av følgende er en fordel med å bruke UML?",
    options: [
      "Enklere kommunikasjon mellom utviklere",
      "Bedre forståelse av systemets struktur og funksjonalitet",
      "Hjelp til å identifisere feil og problemer tidlig i utviklingsfasen",
      "Alle de ovennevnte",
    ],
    correctIndex: 3,
    explanation:
      "Alle tre er reelle fordeler ved UML — det er et standardisert visuelt språk som forbedrer kommunikasjon, forståelse og feildeteksjon.",
    pensumRef: "V2024 oppg 2g",
  },
  {
    id: "v2024-2h",
    topic: "uml",
    source: "V2024",
    question: "Hva er formålet med et klassediagram i UML?",
    options: [
      "Å vise strukturen til et system og relaterte klasser",
      "Å vise sekvensen av interaksjoner mellom objekter",
      "Å vise brukergrensesnittet i et system",
      "Å vise hvordan data flyter gjennom et system",
    ],
    correctIndex: 0,
    explanation:
      "Klassediagram viser KLASSER og deres relasjoner (struktur). Sekvensdiagram viser interaksjoner over tid. Et klassediagram brukes både i analyse (domenemodell) og design (utformingsmodell).",
    pensumRef: "V2024 oppg 2h",
  },
  {
    id: "v2024-solid-srp",
    topic: "solid",
    source: "V2024",
    question: "Du må ofte endre en klasse fordi den gjør for mange forskjellige ting. Hvilket SOLID-prinsipp er sannsynligvis brutt?",
    options: [
      "Interface Segregation Principle (ISP)",
      "Dependency Inversion Principle (DIP)",
      "Liskov Substitution Principle (LSP)",
      "Single Responsibility Principle (SRP)",
    ],
    correctIndex: 3,
    explanation:
      "For mange grunner til å endre en klasse = klassen gjør for mye = SRP-brudd. SRP sier at en klasse skal ha ETT ansvarsområde og dermed bare én grunn til å endre seg.",
    pensumRef: "V2024 oppg 2 SOLID",
  },
  {
    id: "v2024-solid-dip",
    topic: "solid",
    source: "V2024",
    question:
      "Hvilket prinsipp ville du bruke som veiledning for å unngå sterk avhengighet mellom konkrete klasser og foretrekke abstraksjoner?",
    options: [
      "Liskov Substitution Principle (LSP)",
      "Open-Closed Principle (OCP)",
      "Dependency Inversion Principle (DIP)",
      "Interface Segregation Principle (ISP)",
    ],
    correctIndex: 2,
    explanation:
      "DIP handler nettopp om dette: avheng av abstraksjoner (grensesnitt), ikke konkrete klasser. Nøkkelordet 'foretrekke abstraksjoner' peker direkte på DIP.",
    pensumRef: "V2024 oppg 2 SOLID",
  },
  {
    id: "v2024-solid-isp",
    topic: "solid",
    source: "V2024",
    question:
      "Dette prinsippet sier at man ikke bør tvinges til å avhenge av grensesnitt de ikke bruker. Hvilket SOLID-prinsipp er det?",
    options: [
      "Single Responsibility Principle (SRP)",
      "Liskov Substitution Principle (LSP)",
      "Open-Closed Principle (OCP)",
      "Interface Segregation Principle (ISP)",
    ],
    correctIndex: 3,
    explanation:
      "ISP handler om at grensesnitt skal være små og fokuserte. 'Tvinges til å avhenge av grensesnitt de ikke bruker' er nesten ordrett definisjonen av ISP.",
    pensumRef: "V2024 oppg 2 SOLID",
  },
  {
    id: "v2024-solid-lsp",
    topic: "solid",
    source: "V2024",
    question:
      "Hvilket prinsipp oppfordrer til at subklasser bør kunne erstatte deres supertyper uten å forandre programmets korrekthet?",
    options: [
      "Interface Segregation Principle (ISP)",
      "Single Responsibility Principle (SRP)",
      "Dependency Inversion Principle (DIP)",
      "Liskov Substitution Principle (LSP)",
    ],
    correctIndex: 3,
    explanation:
      "LSP: subklasser skal kunne brukes overalt der superklassen brukes, uten at programmet oppfører seg feil. 'Erstatte supertyper uten å forandre korrekthet' er definisjonen av LSP.",
    pensumRef: "V2024 oppg 2 SOLID",
  },
  {
    id: "v2024-solid-ocp",
    topic: "solid",
    source: "V2024",
    question:
      "Når du designer moduler og klasser, og du ønsker å sørge for at de er lett utbyttbare, hvilket prinsipp er mest relevant?",
    options: [
      "Single Responsibility Principle (SRP)",
      "Open-Closed Principle (OCP)",
      "Liskov Substitution Principle (LSP)",
      "Interface Segregation Principle (ISP)",
    ],
    correctIndex: 1,
    explanation:
      "OCP: åpen for utvidelse, lukket for endring. 'Lett utbyttbare' = du kan legge til nye implementasjoner uten å endre eksisterende kode — det er definisjonen av OCP.",
    pensumRef: "V2024 oppg 2 SOLID",
  },
  {
    id: "v2024-solid-srp2",
    topic: "solid",
    source: "V2024",
    question:
      "Om du lager en ny klasse som håndterer alle detaljer rundt logging i systemet ditt, hvilket SOLID-prinsipp følger du da?",
    options: [
      "Single Responsibility Principle (SRP)",
      "Open-Closed Principle (OCP)",
      "Liskov Substitution Principle (LSP)",
      "Dependency Inversion Principle (DIP)",
    ],
    correctIndex: 0,
    explanation:
      "Ved å samle alt logging-relatert i ÉN klasse, gir du den ETT ansvar — det er SRP. (Fra GRASP-perspektiv kunne det også vært Pure Fabrication, men spørsmålet spør om SOLID.)",
    pensumRef: "V2024 oppg 2 SOLID",
  },
  {
    id: "v2024-grasp-cohesion",
    topic: "grasp",
    source: "V2024",
    question:
      "Dersom en klasse har mange metoder og instansvariabler relatert til mange ulike oppgaver, hvilket GRASP-prinsipp er da blitt brutt?",
    options: ["High Cohesion", "Low Coupling", "Controller", "Polymorphism"],
    correctIndex: 0,
    explanation:
      "Mange metoder relatert til mange ulike oppgaver = lav samhørighet = High Cohesion brutt. NB: spørsmålet spør om GRASP, ikke SOLID. Hadde det vært SOLID ville svaret vært SRP (som er nesten det samme).",
    pensumRef: "V2024 oppg 2 GRASP",
  },

  // ════════════════════════════════════════════════════════════════
  // V2024 — Oppgave 3 (Utviklingsmetode) — ~17 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "v2024-3a",
    topic: "scrum",
    source: "V2024",
    question: "Hva er hovedmålet med smidige utviklingsmetoder?",
    options: [
      "Å oppnå høy kvalitet på produktet",
      "Å minimere risikoen i prosjektet",
      "Å forbedre kundetilfredsheten",
      "Alle de nevnte punktene",
    ],
    correctIndex: 3,
    explanation:
      "Smidige metoder sikter mot ALLE disse målene samtidig: høy kvalitet (gjennom kontinuerlig testing), lavere risiko (gjennom korte sykluser), og kundetilfredshet (gjennom hyppige leveranser).",
    pensumRef: "V2024 oppg 3a",
  },
  {
    id: "v2024-3b",
    topic: "scrum",
    source: "V2024",
    question: "Hvilket av følgende er IKKE et prinsipp i smidige utviklingsmetoder?",
    options: [
      "Møte ansikt til ansikt er den mest effektive formen for kommunikasjon",
      "Fungerende programvare er det viktigste målet",
      "Å reagere raskt på en endring er prioritert fremfor kontraktsforhandlinger",
      "Planlegging og design er de mest kritiske fasene",
    ],
    correctIndex: 3,
    explanation:
      "'Planlegging og design er de mest kritiske fasene' er FOSSEFALL-tenkning, ikke smidig. Smidige metoder verdsetter inkrementell utvikling og tilpasning over fast planlegging.",
    pensumRef: "V2024 oppg 3b",
  },
  {
    id: "v2024-3c",
    topic: "scrum",
    source: "V2024",
    question: "Hva er en scrum-master?",
    options: [
      "Den som eier prosjektet",
      "Den som leder prosjektet",
      "Den som er ansvarlig for å fjerne hindringer for laget",
      "Den som er ansvarlig for å planlegge og koordinere sprints",
    ],
    correctIndex: 2,
    explanation:
      "Scrum Master er en SERVANT LEADER som fjerner hindringer for teamet og sørger for at Scrum-prosessen følges. Ikke en sjef, ikke en prosjektleder. PO eier produktet, Team planlegger sprintene sammen.",
    pensumRef: "V2024 oppg 3c",
  },
  {
    id: "v2024-sprint",
    topic: "scrum",
    source: "V2024",
    question: "Hva er en sprint i Scrum?",
    options: [
      "En lengre planleggingsperiode",
      "En kort utviklingssyklus",
      "En fase der testing utføres",
      "En periode der teamet ikke gjør noe arbeid",
    ],
    correctIndex: 1,
    explanation:
      "Sprint = en kort, tidsbokset utviklingssyklus (typisk 2-4 uker) der teamet leverer et fungerende inkrement. Inkluderer alt: planlegging, design, koding, testing og demo.",
    pensumRef: "V2024 oppg 3",
  },
  {
    id: "v2024-3d",
    topic: "kanban",
    source: "V2024",
    question: "Hva er en kanban-tavle i en smidig utviklingsprosess?",
    options: [
      "En tavle der man visuelt kan se arbeidet som skal gjøres, pågår og er ferdig",
      "En tavle der man visuelt kan se fremtidig prioriterte oppgaver",
      "En tavle der man visuelt kan se teammedlemmenes ferieplaner",
      "En tavle der man visuelt kan se konkurrentenes strategier",
    ],
    correctIndex: 0,
    explanation:
      "En kanban-tavle visualiserer arbeidsflyt med kolonner (typisk To Do | Doing | Done). Den viser hva som skal gjøres, pågår og er ferdig.",
    pensumRef: "V2024 oppg 3d",
  },
  {
    id: "v2024-3e",
    topic: "scrum",
    source: "V2024",
    question: "Hvilken metode bruker 'Burndown chart' (nedbrenningsdiagram)?",
    options: ["Scrum", "Kanban", "Lean", "Extreme programming (XP)", "Agile Unified Process (AUP)"],
    correctIndex: 0,
    explanation:
      "Burndown chart er Scrums verktøy for å vise gjenstående arbeid per dag i en sprint. Kanban bruker Cumulative Flow Diagram i stedet.",
    pensumRef: "V2024 oppg 3e",
  },
  {
    id: "v2024-3f",
    topic: "scrum",
    source: "V2024",
    question: "Hvor mange faser er det i Scrum?",
    options: ["2", "3", "5", "Uendelig", "Scrum er en smidig metode, noe som betyr at den ikke har faser"],
    correctIndex: 4,
    explanation:
      "Scrum har INGEN FASER — det er en iterativ metode med sprinter. Hver sprint inneholder samme aktiviteter (planlegging, koding, testing, demo). 'Faser' tilhører fossefall og AUP.",
    pensumRef: "V2024 oppg 3f",
  },
  {
    id: "v2024-3g",
    topic: "scrum",
    source: "V2024",
    question: "Hvordan måler man fremdrift i en smidig utviklingsprosess?",
    options: [
      "Gjennom å telle antall linjer kode",
      "Gjennom antall møter per uke",
      "Gjennom å følge opp antall fullførte oppgaver",
      "Gjennom tid brukt på kravspesifikasjoner",
    ],
    correctIndex: 2,
    explanation:
      "Smidig fremdrift måles med fullført arbeid (story points eller oppgaver). Linjer kode er meningsløst (mer kode kan være dårligere). Møter og kravspec er ikke fremdrift.",
    pensumRef: "V2024 oppg 3g",
  },
  {
    id: "v2024-3h",
    topic: "tdd",
    source: "V2024",
    question: "Hva er et typisk flyt for å implementere TDD?",
    options: [
      "Skrive test → Skrive kode → Kjøre test → Fikse feil",
      "Skrive kode → Skrive test → Kjøre test → Fikse feil",
      "Kjøre test → Skrive kode → Skrive test → Fikse feil",
      "Skrive plan → Skrive kode → Skrive test → Bli ferdig",
    ],
    correctIndex: 0,
    explanation:
      "TDD = Test First. Skriv testen FØRST (Red), deretter koden som får testen til å passere (Green), så refaktorer (Refactor). Kent Beck: 'Kode uten test eksisterer ikke.'",
    pensumRef: "V2024 oppg 3h",
  },
  {
    id: "v2024-3i",
    topic: "scrum",
    source: "V2024",
    question: "Hvordan fungerer et 'burndown chart' i en smidig utviklingsprosess?",
    options: [
      "Det viser hvor mye arbeid som gjenstår i løpet av en sprint",
      "Det viser hvor mange timer som er gjort i løpet av en sprint",
      "Det viser hvor mye tid som er brukt på et prosjekt",
      "Det viser hvem som har gjort mest arbeid i løpet av en sprint",
    ],
    correctIndex: 0,
    explanation:
      "Burndown chart har Y-akse = gjenstående arbeid (story points), X-akse = tid (dager). Det viser om laget brenner ned arbeid i et passende tempo.",
    pensumRef: "V2024 oppg 3i",
  },
  {
    id: "v2024-3j",
    topic: "aup",
    source: "V2024",
    question: "Hva er en 'milestone'?",
    options: [
      "En tung stein",
      "Et viktig tidspunkt, steg eller begivenhet",
      "En viktig oppgave i starten",
      "Ekstra tid gitt i løpet av prosjektet",
    ],
    correctIndex: 1,
    explanation:
      "En milestone er et viktig tidspunkt, steg eller begivenhet i et prosjekt — typisk slutten av en fase i AUP eller en større leveranse.",
    pensumRef: "V2024 oppg 3j",
  },
  {
    id: "v2024-sprint-review",
    topic: "scrum",
    source: "V2024",
    question: "Hva er hensikten med en sprint review i smidige utviklingsmetoder?",
    options: [
      "Å evaluere teamets prestasjon i sprinten",
      "Å vise frem og demonstrere det som er blitt utviklet i løpet av sprinten",
      "Å feire ferdigstillelsen av en sprint",
      "Å diskutere og lage en plan for neste sprint",
    ],
    correctIndex: 1,
    explanation:
      "Sprint Review = demo av inkrementet til produkteier og interessenter. Sprint Retrospective er der teamet evaluerer sin egen prestasjon. Sprint Planning er der man planlegger neste.",
    pensumRef: "V2024 oppg 3 sprint review",
  },
  {
    id: "v2024-3k",
    topic: "ci-cd-devops",
    source: "V2024",
    question: "Hva er hovedmålet med DevOps?",
    options: [
      "Fremskynde programvareutviklingsprosessen",
      "Reduserer programvarekompleksiteten",
      "Maksimerer serveroppetiden",
      "Eliminerer behovet for programvareoppdateringer",
    ],
    correctIndex: 0,
    explanation:
      "DevOps har som hovedmål å fremskynde utviklings- og leveranseprosessen ved å bryte ned siloer mellom Dev og Ops. Server uptime og kompleksitet er sekundære mål.",
    pensumRef: "V2024 oppg 3k",
  },
  {
    id: "v2024-3l",
    topic: "ci-cd-devops",
    source: "V2024",
    question: "Hva er fordelene med continuous integration?",
    options: [
      "Redusert behov for programvarelevering",
      "Større fleksibilitet og hurtig utvikling",
      "Fjerning av behovet for manuell testing",
      "Alle de andre",
    ],
    correctIndex: 1,
    explanation:
      "CI gir fleksibilitet og rask utvikling fordi feil oppdages tidlig. Manuell testing trengs fortsatt (særlig brukertesting), og det reduserer ikke behovet for levering — tvert imot, det støtter hyppigere leveranser.",
    pensumRef: "V2024 oppg 3l",
  },
  {
    id: "v2024-3m",
    topic: "xp",
    source: "V2024",
    question: "Hva er hovedprinsippet bak parprogrammering i ekstremprogrammering?",
    options: [
      "To utviklere arbeider sammen for å skrive kode samtidig",
      "En utvikler arbeider mens den andre observerer og gir veiledning",
      "En utvikler skriver koden, mens den andre utfører kodegjennomgangen",
      "To utviklere jobber med forskjellige deler av kodebasen samtidig",
    ],
    correctIndex: 0,
    explanation:
      "Parprogrammering = TO utviklere som JOBBER SAMMEN på samme kode samtidig. Ikke 'en jobber, en observerer' (det er code review). Begge er aktive — driver skriver, navigator tenker strategisk.",
    pensumRef: "V2024 oppg 3m",
  },
  {
    id: "v2024-3n",
    topic: "scrum",
    source: "V2024",
    question: "Hvordan involveres kundene i en smidig utviklingsprosess?",
    options: [
      "Kundene er aktive deltakere gjennom hele prosessen",
      "Kundene gir kun tilbakemeldinger etter hver iterasjon",
      "Kundene har ingen rolle i en smidig utviklingsprosess",
      "Kundene er kun involvert i kravspesifikasjonsfasen",
    ],
    correctIndex: 0,
    explanation:
      "Smidige metoder krever AKTIV kundeinvolvering gjennom hele prosessen — agile manifest sier 'samarbeid med kunden fremfor kontraktsforhandlinger'. XP har on-site customer som praksis.",
    pensumRef: "V2024 oppg 3n",
  },
  {
    id: "v2024-3o",
    topic: "scrum",
    source: "V2024",
    question: "Hvordan blir teamet i en smidig utviklingsprosess organisert?",
    options: [
      "Hierarkisk med en prosjektleder på toppen",
      "Hierarkisk med en scrum master på toppen",
      "Horisontalt med likeverdige teammedlemmer",
      "Med en produktansvarlig som har det endelige ordet",
      "Med utviklere som har ansvar for hver sin del av programvaren",
    ],
    correctIndex: 2,
    explanation:
      "Smidige team er HORISONTALT organisert — selvorganiserte, likeverdige medlemmer. Ingen sjef-hierarki. Scrum Master er servant leader, ikke en sjef.",
    pensumRef: "V2024 oppg 3o",
  },
  {
    id: "v2024-3p",
    topic: "scrum",
    source: "V2024",
    question: "Hva er hensikten med daglige standup-møter i smidige utviklingsmetoder?",
    options: [
      "Å gi en oppdatering på status og planer",
      "Å diskutere forbedringsmuligheter",
      "Å avdekke flaskehalser og hindringer",
      "Alle de andre",
    ],
    correctIndex: 3,
    explanation:
      "Daily Standup har 3 mål: oppdatering på status, koordinering av planer, og avdekke hindringer. Maks 15 minutter, alle deltar.",
    pensumRef: "V2024 oppg 3p",
  },
  {
    id: "v2024-3q",
    topic: "scrum",
    source: "V2024",
    question: "Hva er hensikten med en produkt-backlog i smidige utviklingsmetoder?",
    options: [
      "Å holde oversikt over alle funksjonene som skal implementeres",
      "Å identifisere og prioritere kravene i prosjektet",
      "Å lagre gamle versjoner av programvaren",
      "Å planlegge sprintene i prosjektet",
    ],
    correctIndex: 0,
    explanation:
      "Product Backlog = prioritert liste over ALT som skal bygges. Den eies av produkteier og inneholder alle features, bugs og forbedringer.",
    pensumRef: "V2024 oppg 3q",
  },
  {
    id: "v2024-3r",
    topic: "scrum",
    source: "V2024",
    question: "Hvordan håndteres endringer i kravene i Scrum?",
    options: [
      "Kravene kan endres når som helst i prosjektet",
      "Kravene kan kun endres mellom sprints",
      "Kravendringer må godkjennes av et styringsråd før de kan implementeres",
      "Kravendringer er ikke tillatt i smidige utviklingsmetoder",
    ],
    correctIndex: 0,
    explanation:
      "Scrum velkommer endringer — Product Backlog kan justeres når som helst. Innenfor en aktiv sprint er det best å unngå store endringer, men prinsipielt er endringer alltid tillatt.",
    pensumRef: "V2024 oppg 3r",
  },
];
