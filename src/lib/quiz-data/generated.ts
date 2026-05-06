/**
 * GENERERTE flervalgsspørsmål — laget basert på pensum (forelesninger, Sommerville-bok).
 * Disse er IKKE fra ekte eksamener, men dekker temaer som er pensum og kan komme.
 *
 * ~10 spørsmål per topic, V2024-flervalg-stil.
 *
 * Format: samme som exam-extracted.ts. source: "generated".
 */

import type { QuizQuestion } from "@/lib/quiz-types";

export const GENERATED_QUESTIONS: QuizQuestion[] = [
  // ════════════════════════════════════════════════════════════════
  // MODELLERING — 10 spørsmål (Pensum: F02-F08)
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-modellering-1",
    topic: "modellering",
    source: "generated",
    question:
      "Du modellerer Stigespill og er fristet til å lage brukstilfeller for 'Trill terning', 'Flytt brikke' og 'Sjekk vinner'. Hva er problemet med denne tilnærmingen?",
    options: [
      "Det blir et flytdiagram, ikke en brukstilfellemodell",
      "Det er for få brukstilfeller — du burde ha flere",
      "Brukstilfellene må navngis med substantiver",
      "Det er ingen problemer — dette er korrekt modellering",
    ],
    correctIndex: 0,
    explanation:
      "Hvert steg i et flytforløp er IKKE et eget brukstilfelle. Stigespill er et simulert spill og trenger typisk bare 1-2 brukstilfeller (f.eks. 'Initier spill' og 'Spill spill'). Atle understreker at brukstilfellediagrammet aldri skal være et flytdiagram.",
    whyWrong: [
      "",
      "Tvert imot — for mange brukstilfeller er problemet",
      "Brukstilfeller navngis med verb-fraser, men det er ikke hovedproblemet her",
      "Feil — dette er en klassisk modelleringsfeil",
    ],
    difficulty: "easy",
    pensumRef: "F08 Stigespill",
  },
  {
    id: "gen-modellering-2",
    topic: "modellering",
    source: "generated",
    question:
      "I et klassediagram ser du multiplisitet '1..*' mellom Ordre og Ordrelinje. Hva betyr dette?",
    options: [
      "En ordre kan ha 0 eller flere ordrelinjer",
      "En ordre må ha minst én ordrelinje, og kan ha mange",
      "En ordre har nøyaktig én ordrelinje",
      "En ordre kan ha mellom 1 og 8 ordrelinjer",
    ],
    correctIndex: 1,
    explanation:
      "'1..*' betyr 'minst 1, opptil mange'. Det modellerer en forretningsregel: en ordre uten linjer gir ingen mening. Dette er strengere enn '0..*' (kan være tom) og mer fleksibelt enn '1' (nøyaktig én).",
    difficulty: "easy",
    pensumRef: "F03 multiplisitet",
  },
  {
    id: "gen-modellering-3",
    topic: "modellering",
    source: "generated",
    question:
      "Hvilket fragment i et sekvensdiagram brukes for å vise gjentatt utførelse?",
    options: ["alt", "opt", "loop", "par"],
    correctIndex: 2,
    explanation:
      "'loop' er fragmentet for løkker/iterasjon i sekvensdiagrammer. 'alt' = alternativer (if/else), 'opt' = valgfri (if uten else), 'par' = parallell utførelse.",
    whyWrong: [
      "alt = alternative paths (if/else)",
      "opt = optional (if uten else)",
      "",
      "par = parallell kjøring",
    ],
    difficulty: "medium",
    pensumRef: "F06 sekvensdiagram-fragmenter",
  },
  {
    id: "gen-modellering-4",
    topic: "modellering",
    source: "generated",
    question:
      "En medstudent har laget en domenemodell der klassen 'Konto' har metoden settInn(beløp). Hva er feilen?",
    options: [
      "Beløp burde vært en parameter med type",
      "Domenemodellen skal aldri inneholde metoder",
      "Metoden skal hete 'innskudd' i stedet",
      "Det er ingen feil — domenemodellen skal vise oppførsel",
    ],
    correctIndex: 1,
    explanation:
      "Domenemodellen er et analyseartefakt som viser BEGREPER, attributter og relasjoner — ikke metoder. Metoder kommer først i utformingsmodellen (designfasen). Atle er tydelig: domenemodell = ALDRI metoder.",
    difficulty: "easy",
    pensumRef: "F04 domenemodell",
  },
  {
    id: "gen-modellering-5",
    topic: "modellering",
    source: "generated",
    question:
      "Hva er forskjellen mellom spesialisering og aggregering i en domenemodell?",
    options: [
      "Spesialisering er 'er-en'-relasjon, aggregering er 'har-en'-relasjon",
      "Spesialisering brukes i utformingsmodell, aggregering i domenemodell",
      "Spesialisering og aggregering er det samme",
      "Spesialisering vises med diamant, aggregering med pil",
    ],
    correctIndex: 0,
    explanation:
      "Spesialisering ('er-en') er arv: Hund er-en Dyr. Aggregering ('har-en') er en svak helhet-del-relasjon: Universitet har-en Fakultet. Dette er to fundamentalt forskjellige relasjonstyper.",
    difficulty: "medium",
    pensumRef: "F04 relasjonstyper",
  },
  {
    id: "gen-modellering-6",
    topic: "modellering",
    source: "generated",
    question:
      "I et brukstilfellediagram vises 'aktør'. Hva representerer en aktør?",
    options: [
      "En klasse i systemet",
      "En metode i koden",
      "En rolle som samhandler med systemet (person eller annet system)",
      "En sekvens av handlinger inne i systemet",
    ],
    correctIndex: 2,
    explanation:
      "En aktør er noen/noe UTENFOR systemet som samhandler med det — typisk en bruker i en bestemt rolle (f.eks. Kunde, Administrator), men også eksterne systemer (f.eks. Betalingstjeneste).",
    difficulty: "easy",
    pensumRef: "F03 brukstilfellediagram",
  },
  {
    id: "gen-modellering-7",
    topic: "modellering",
    source: "generated",
    question:
      "Et brukstilfelle 'Bestill bok' inneholder alltid 'Logg inn'. Hvilken relasjon brukes?",
    options: ["<<extend>>", "<<include>>", "<<inherit>>", "<<use>>"],
    correctIndex: 1,
    explanation:
      "<<include>> brukes når et brukstilfelle ALLTID inkluderer et annet. <<extend>> brukes for VALGFRI utvidelse. Når 'Logg inn' alltid skjer som del av 'Bestill bok', er det <<include>>.",
    whyWrong: [
      "extend = valgfri/betinget utvidelse",
      "",
      "ikke en gyldig UML-stereotype her",
      "ikke standard UML — vanlig misforståelse",
    ],
    difficulty: "medium",
    pensumRef: "F03 brukstilfellerelasjoner",
  },
  {
    id: "gen-modellering-8",
    topic: "modellering",
    source: "generated",
    question:
      "Hva skal sekvensdiagrammet samsvare med?",
    options: [
      "Klassediagrammet i utformingsmodellen",
      "Brukstilfellebeskrivelsen",
      "Use case-diagrammet",
      "Domenemodellen",
    ],
    correctIndex: 1,
    explanation:
      "Sekvensdiagrammet realiserer trinnene i brukstilfellebeskrivelsen — hver setning i hovedflyten blir typisk en melding mellom objekter. Atle er tydelig på at sekvensdiagrammet skal kunne 'leses sammen med' brukstilfelleteksten.",
    difficulty: "medium",
    pensumRef: "F06 sekvensdiagram",
  },
  {
    id: "gen-modellering-9",
    topic: "modellering",
    source: "generated",
    question:
      "Du modellerer et system og finner begrepene 'Bestilling', 'Bestillingslinje' og 'Produkt'. Hva er typisk multiplisitet mellom Bestilling og Bestillingslinje?",
    options: [
      "Bestilling 1 — 1..* Bestillingslinje",
      "Bestilling 1 — 0..* Bestillingslinje",
      "Bestilling * — * Bestillingslinje",
      "Bestilling 1 — 1 Bestillingslinje",
    ],
    correctIndex: 0,
    explanation:
      "En bestilling må ha minst én linje for å gi mening (1..*), og en bestillingslinje hører til nøyaktig én bestilling (1). Mange-til-mange er feil siden en linje er en 'del av' bare én bestilling.",
    difficulty: "medium",
    pensumRef: "F03 multiplisitet i praksis",
  },
  {
    id: "gen-modellering-10",
    topic: "modellering",
    source: "generated",
    question:
      "Hvilket fragment brukes for å vise et if-else valg i et sekvensdiagram?",
    options: ["opt", "alt", "loop", "ref"],
    correctIndex: 1,
    explanation:
      "'alt' (alternative) gir flere alternative grener separert med stiplet linje. 'opt' har bare én gren (if uten else). 'loop' = iterasjon, 'ref' = referanse til annet diagram.",
    difficulty: "medium",
    pensumRef: "F06 sekvensdiagram-fragmenter",
  },

  // ════════════════════════════════════════════════════════════════
  // OOP-FUNDAMENTER — 10 spørsmål (Pensum: F02, F06, F16)
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-oop-fundamenter-1",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Booch identifiserer 7 egenskaper ved objektorienterte språk. Hvilken av disse er IKKE en av dem?",
    options: ["Abstraksjon", "Innkapsling", "Hierarki", "Refaktorering"],
    correctIndex: 3,
    explanation:
      "Booch sine 7 egenskaper er: Abstraksjon, Innkapsling, Modularitet, Hierarki, Typing, Samtidighet (Concurrency) og Persistens. Refaktorering er en aktivitet, ikke en språkegenskap.",
    difficulty: "medium",
    pensumRef: "F02 Boochs 7 egenskaper",
  },
  {
    id: "gen-oop-fundamenter-2",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Et objekt har tre fundamentale egenskaper. Hvilke er det?",
    options: [
      "State, behaviour, identity",
      "Class, instance, reference",
      "Public, private, protected",
      "Abstract, concrete, final",
    ],
    correctIndex: 0,
    explanation:
      "Et objekt har TILSTAND (verdier i attributter), OPPFØRSEL (det det kan gjøre, dvs. metoder) og IDENTITET (unikt referansepunkt i minne — to objekter med like attributter er fortsatt forskjellige). F16 slide 6.",
    difficulty: "easy",
    pensumRef: "F16 objektets egenskaper",
  },
  {
    id: "gen-oop-fundamenter-3",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Hva betyr 'persistens' som en av Boochs egenskaper?",
    options: [
      "At objekter eksisterer over lang tid, også etter at programmet avsluttes",
      "At metoder må kalles gjentatte ganger",
      "At klasser ikke kan endres etter at de er definert",
      "At feil må håndteres til de er løst",
    ],
    correctIndex: 0,
    explanation:
      "Persistens betyr at objekter kan lagres slik at de overlever programkjøringen — typisk via database eller fil. Et persistent objekt 'lever' lengre enn prosessen som opprettet det.",
    difficulty: "medium",
    pensumRef: "F02 persistens",
  },
  {
    id: "gen-oop-fundamenter-4",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Hva er forskjellen mellom en klasse og et objekt?",
    options: [
      "En klasse er en konkret instans, et objekt er en mal",
      "En klasse er en mal/type, et objekt er en konkret instans av klassen",
      "Klasse og objekt er to ord for det samme",
      "En klasse må være abstrakt, et objekt må være konkret",
    ],
    correctIndex: 1,
    explanation:
      "Klassen er MALEN — den definerer hvilke attributter og metoder objekter av denne typen har. Objektet er en konkret forekomst som lever i minnet og har egne verdier. Eksempel: `Hund h = new Hund(\"Fido\")` — Hund er klassen, h er objektet.",
    difficulty: "easy",
    pensumRef: "F02 klasse vs objekt",
  },
  {
    id: "gen-oop-fundamenter-5",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Du designer en bilmodell og bestemmer at en Bil har egenskapene fart, drivstoff og posisjon, men ikke detaljer om motorkjemien. Hvilken Booch-egenskap har du brukt?",
    options: ["Hierarki", "Abstraksjon", "Persistens", "Samtidighet"],
    correctIndex: 1,
    explanation:
      "Abstraksjon = å fokusere på det relevante og ignorere detaljer som ikke er viktige for problemet. Du modellerer Bil på et nivå som passer formålet, uten å bli fanget i irrelevante detaljer.",
    difficulty: "easy",
    pensumRef: "F02 abstraksjon",
  },
  {
    id: "gen-oop-fundamenter-6",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Hva er hovedforskjellen mellom innkapsling og abstraksjon?",
    options: [
      "Innkapsling skjuler implementasjonen, abstraksjon fokuserer på det relevante",
      "Innkapsling er for klasser, abstraksjon er for objekter",
      "Det er ingen forskjell — det er to ord for samme prinsipp",
      "Abstraksjon krever arv, innkapsling krever ikke",
    ],
    correctIndex: 0,
    explanation:
      "Abstraksjon = HVA som er viktig (mental modell). Innkapsling = HVORDAN det skjules (implementasjon bak grensesnitt). To beslektede, men distinkte prinsipper. V2024 oppg 2b og 2c illustrerer forskjellen.",
    difficulty: "medium",
    pensumRef: "F02 abstraksjon vs innkapsling",
  },
  {
    id: "gen-oop-fundamenter-7",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Hva er IKKE en av de 4 essensielle OOP-prinsippene?",
    options: ["Inheritance", "Encapsulation", "Composition", "Polymorphism"],
    correctIndex: 2,
    explanation:
      "De 4 essensielle OOP-prinsippene er Abstraction, Encapsulation, Inheritance og Polymorphism. Composition er et DESIGNPRINSIPP (foretrekk komposisjon over arv), ikke et grunnprinsipp.",
    difficulty: "medium",
    pensumRef: "F02 essensielle OOP-prinsipper",
  },
  {
    id: "gen-oop-fundamenter-8",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Hva betyr 'modularitet' som en Booch-egenskap?",
    options: [
      "At programmet kan kjøre på flere plattformer",
      "At systemet er delt opp i sammenhengende, løst koblede enheter",
      "At alle metoder må returnere en verdi",
      "At klasser må være under 100 linjer",
    ],
    correctIndex: 1,
    explanation:
      "Modularitet handler om å dele systemet i moduler (pakker/klasser) som er HØY samhørighet internt og LAV kobling mellom hverandre. Dette gir vedlikeholdbarhet og gjenbruk.",
    difficulty: "medium",
    pensumRef: "F02 modularitet",
  },
  {
    id: "gen-oop-fundamenter-9",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Hva er polymorfi i objektorientert programmering?",
    options: [
      "At en metode kan ha flere implementasjoner avhengig av objekttype",
      "At en klasse kan ha flere konstruktører",
      "At et objekt kan eksistere i flere systemer samtidig",
      "At en variabel kan endre type under kjøring",
    ],
    correctIndex: 0,
    explanation:
      "Polymorfi (mange former) betyr at samme metodekall kan oppføre seg ulikt avhengig av den faktiske typen til objektet. F.eks. dyr.lag() kan gi 'voff' for Hund og 'mjau' for Katt.",
    difficulty: "easy",
    pensumRef: "F02 polymorfi",
  },
  {
    id: "gen-oop-fundamenter-10",
    topic: "oop-fundamenter",
    source: "generated",
    question:
      "Booch-egenskapen 'typing' handler om hva?",
    options: [
      "Tastaturbruk i koding",
      "At objekter har en bestemt type som begrenser hva de kan gjøre",
      "Hvor raskt en utvikler kan skrive kode",
      "Skrivestil i kommentarer",
    ],
    correctIndex: 1,
    explanation:
      "Typing handler om at objekter har en TYPE (klasse), og typesystemet hindrer ulovlige operasjoner (f.eks. å sende en tekst til en metode som forventer et tall). Sterk typing vs svak typing.",
    difficulty: "medium",
    pensumRef: "F02 typing",
  },

  // ════════════════════════════════════════════════════════════════
  // UML — 10 spørsmål (Pensum: F02)
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-uml-1",
    topic: "uml",
    source: "generated",
    question:
      "Hva er hovedformålet med et aktivitetsdiagram i UML?",
    options: [
      "Å vise statiske relasjoner mellom klasser",
      "Å modellere arbeidsflyt og prosesser med beslutninger",
      "Å vise hvilke objekter som finnes i systemet",
      "Å beskrive tilstander til ett enkelt objekt",
    ],
    correctIndex: 1,
    explanation:
      "Aktivitetsdiagram viser flyt av aktiviteter — likner et flytdiagram med svømmebaner, beslutninger (rombe) og parallelle gafler. Brukes for å modellere prosesser eller algoritmer.",
    difficulty: "medium",
    pensumRef: "F02 aktivitetsdiagram",
  },
  {
    id: "gen-uml-2",
    topic: "uml",
    source: "generated",
    question:
      "I et UML klassediagram betyr symbolet '+' foran en attributt:",
    options: [
      "Privat synlighet",
      "Beskyttet synlighet",
      "Offentlig (public) synlighet",
      "Pakke-synlighet",
    ],
    correctIndex: 2,
    explanation:
      "UML-synligheter: + = public, - = private, # = protected, ~ = package. Public betyr at attributten er tilgjengelig for alle klasser.",
    difficulty: "easy",
    pensumRef: "F02 UML-synligheter",
  },
  {
    id: "gen-uml-3",
    topic: "uml",
    source: "generated",
    question:
      "Hva viser et tilstandsdiagram i UML?",
    options: [
      "Hvilke metoder en klasse har",
      "Tilstander et objekt kan være i og overganger mellom dem",
      "Strukturen til hele systemet",
      "Rekkefølgen meldinger sendes mellom objekter",
    ],
    correctIndex: 1,
    explanation:
      "Tilstandsdiagram (state machine) viser hvilke tilstander ETT objekt kan være i, og hvilke hendelser som utløser overganger. F.eks. en Ordre kan være Opprettet → Bekreftet → Sendt → Levert.",
    difficulty: "medium",
    pensumRef: "F02 tilstandsdiagram",
  },
  {
    id: "gen-uml-4",
    topic: "uml",
    source: "generated",
    question:
      "Hva er forskjellen mellom et komponentdiagram og et klassediagram?",
    options: [
      "Komponentdiagram viser fysiske kjørbare enheter, klassediagram viser logiske klasser",
      "Komponentdiagram er for analyse, klassediagram er for design",
      "De er det samme — to navn på samme diagram",
      "Komponentdiagram brukes bare i hardware-prosjekter",
    ],
    correctIndex: 0,
    explanation:
      "Komponentdiagram viser FYSISKE programvarekomponenter (.jar, .dll, mikrotjenester) og deres avhengigheter. Klassediagram viser LOGISKE klasser. Komponenter er typisk grupper av klasser pakket sammen.",
    difficulty: "hard",
    pensumRef: "F02 komponentdiagram",
  },
  {
    id: "gen-uml-5",
    topic: "uml",
    source: "generated",
    question:
      "Hvilket UML-diagram brukes for å vise interaksjonen mellom systemet og brukerne på et høyt nivå?",
    options: [
      "Sekvensdiagram",
      "Klassediagram",
      "Brukstilfellediagram",
      "Tilstandsdiagram",
    ],
    correctIndex: 2,
    explanation:
      "Brukstilfellediagram (use case) viser aktører (brukere/eksterne systemer) og brukstilfellene de utfører — på et høyt, brukerorientert nivå. Sekvensdiagram viser meldingsutveksling mellom objekter (lavere nivå).",
    difficulty: "easy",
    pensumRef: "F02 brukstilfellediagram",
  },
  {
    id: "gen-uml-6",
    topic: "uml",
    source: "generated",
    question:
      "Hvilke av disse er IKKE et standard UML-diagram?",
    options: ["Klassediagram", "Sekvensdiagram", "Datamodelldiagram", "Aktivitetsdiagram"],
    correctIndex: 2,
    explanation:
      "'Datamodelldiagram' er ikke et UML-diagram — det er typisk et ER-diagram (databasedesign). UML har 14 standarddiagrammer, inkludert klasse-, sekvens-, aktivitets-, brukstilfelle-, tilstands-, komponent- og distribusjonsdiagram.",
    difficulty: "medium",
    pensumRef: "F02 UML-diagrammer",
  },
  {
    id: "gen-uml-7",
    topic: "uml",
    source: "generated",
    question:
      "Hva betyr en åpen pilspiss (med trekant, ikke fylt) i UML klassediagram?",
    options: [
      "Aggregering",
      "Komposisjon",
      "Generalisering (arv)",
      "Avhengighet",
    ],
    correctIndex: 2,
    explanation:
      "Åpen trekant peker fra subklasse mot superklasse = generalisering/arv ('er-en'). Diamant (åpen=aggregering, fylt=komposisjon) brukes for helhet-del. Stiplet pil = avhengighet.",
    difficulty: "medium",
    pensumRef: "F02 UML-relasjoner",
  },
  {
    id: "gen-uml-8",
    topic: "uml",
    source: "generated",
    question:
      "Hvilken fordel gir UML i en utviklingsprosess?",
    options: [
      "UML genererer ferdig kode automatisk",
      "UML gir et felles visuelt språk som forbedrer kommunikasjon mellom utviklere",
      "UML erstatter behovet for testing",
      "UML hindrer alle programfeil",
    ],
    correctIndex: 1,
    explanation:
      "UML er et standardisert visuelt språk. Hovedverdien er KOMMUNIKASJON — utviklere, arkitekter og kunder kan diskutere design ved hjelp av samme symboler og semantikk.",
    difficulty: "easy",
    pensumRef: "F02 UML-fordeler",
  },
  {
    id: "gen-uml-9",
    topic: "uml",
    source: "generated",
    question:
      "Hva viser en livslinje i et sekvensdiagram?",
    options: [
      "Hvor lenge en metode tar å kjøre",
      "Et objekts eksistens og aktive perioder gjennom interaksjonen",
      "Den gjennomsnittlige levetiden til et system",
      "Avstanden mellom to klasser",
    ],
    correctIndex: 1,
    explanation:
      "En livslinje (vertikal stiplet linje) representerer ett objekts eksistens i tid. Tykke rektangler på linjen = aktiveringsbokser (når objektet utfører en metode). Tid går nedover.",
    difficulty: "medium",
    pensumRef: "F06 sekvensdiagram",
  },
  {
    id: "gen-uml-10",
    topic: "uml",
    source: "generated",
    question:
      "Hva representerer en stiplet linje med åpen pilspiss i et sekvensdiagram?",
    options: [
      "Et synkront kall (vanlig metodekall)",
      "En returmelding fra et metodekall",
      "Et asynkront kall",
      "En selvkalling (metoden kaller seg selv)",
    ],
    correctIndex: 1,
    explanation:
      "Stiplet linje + åpen pil = returmelding (svar på et metodekall). Heltrukket pil med fylt spiss = synkront kall. Heltrukket pil med åpen spiss = asynkront kall.",
    difficulty: "hard",
    pensumRef: "F06 sekvensdiagram-meldinger",
  },

  // ════════════════════════════════════════════════════════════════
  // SOLID — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-solid-1",
    topic: "solid",
    source: "generated",
    question:
      "En klasse 'Rapport' både genererer rapporten OG sender den på e-post. Hvilket SOLID-prinsipp brytes?",
    options: [
      "Liskov Substitution Principle",
      "Single Responsibility Principle",
      "Interface Segregation Principle",
      "Open/Closed Principle",
    ],
    correctIndex: 1,
    explanation:
      "To ulike ansvarsområder (generere rapport, sende e-post) i samme klasse = to grunner til endring = SRP-brudd. Splitt i RapportGenerator og EpostSender.",
    difficulty: "easy",
    pensumRef: "SRP",
  },
  {
    id: "gen-solid-2",
    topic: "solid",
    source: "generated",
    question:
      "Du har en klasse Fugl med metoden fly(). Du arver Pingvin fra Fugl, og må kaste UnsupportedOperationException i fly() siden pingviner ikke kan fly. Hvilket prinsipp brytes?",
    options: [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Dependency Inversion Principle",
    ],
    correctIndex: 2,
    explanation:
      "LSP: subklasser skal kunne erstatte superklasser. Pingvin BRYTER kontrakten Fugl gir (alle fugler kan fly). Klassisk LSP-brudd. Løsning: redesign — kanskje 'Fugl' og 'FlygendeFugl', eller fly() er ikke i Fugl i det hele tatt.",
    difficulty: "medium",
    pensumRef: "LSP",
  },
  {
    id: "gen-solid-3",
    topic: "solid",
    source: "generated",
    question:
      "Hva betyr 'Open' i Open/Closed Principle?",
    options: [
      "Åpen for endring (eksisterende kode kan endres fritt)",
      "Åpen kildekode må brukes",
      "Åpen for utvidelse (ny funksjonalitet kan legges til via nye klasser)",
      "Åpen for inspeksjon (alle attributter er public)",
    ],
    correctIndex: 2,
    explanation:
      "OCP: åpen for UTVIDELSE (du kan legge til nye klasser/implementasjoner), lukket for ENDRING (du trenger ikke endre eksisterende kode). Oppnås ofte med grensesnitt og polymorfi.",
    difficulty: "easy",
    pensumRef: "OCP",
  },
  {
    id: "gen-solid-4",
    topic: "solid",
    source: "generated",
    question:
      "En servicelag-klasse bruker `new MySQLDatabase()` direkte i konstruktøren. Hvilket SOLID-prinsipp er sannsynligvis brutt?",
    options: [
      "Dependency Inversion Principle",
      "Liskov Substitution Principle",
      "Single Responsibility Principle",
      "Open/Closed Principle",
    ],
    correctIndex: 0,
    explanation:
      "DIP: avheng av abstraksjoner, ikke konkrete klasser. Når servicelaget binder seg direkte til MySQLDatabase, blir det umulig å bytte database eller bruke en mock i tester. Bruk grensesnittet `Database` og injiser implementasjonen.",
    difficulty: "medium",
    pensumRef: "DIP",
  },
  {
    id: "gen-solid-5",
    topic: "solid",
    source: "generated",
    question:
      "Hvilket SOLID-prinsipp tilsier at man skal foretrekke flere små grensesnitt fremfor ett stort?",
    options: [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Interface Segregation Principle",
      "Liskov Substitution Principle",
    ],
    correctIndex: 2,
    explanation:
      "ISP: klienter skal ikke tvinges til å avhenge av metoder de ikke bruker. Mange små, fokuserte grensesnitt er bedre enn ett 'fat interface' som tvinger implementasjoner til å lage tom-metoder.",
    difficulty: "easy",
    pensumRef: "ISP",
  },
  {
    id: "gen-solid-6",
    topic: "solid",
    source: "generated",
    question:
      "Hva står 'D' for i SOLID?",
    options: [
      "Decoupling Principle",
      "Domain Driven Principle",
      "Dependency Inversion Principle",
      "Data Integrity Principle",
    ],
    correctIndex: 2,
    explanation:
      "S=Single Responsibility, O=Open/Closed, L=Liskov Substitution, I=Interface Segregation, D=Dependency Inversion. DIP sier 'avheng av abstraksjoner, ikke konkrete klasser'.",
    difficulty: "easy",
    pensumRef: "SOLID-akronymet",
  },
  {
    id: "gen-solid-7",
    topic: "solid",
    source: "generated",
    question:
      "Et grensesnitt 'Worker' har metodene work(), eat() og sleep(). En Robot-klasse skal implementere det, men har ingen mening for eat() og sleep(). Hvilket prinsipp brytes?",
    options: [
      "Single Responsibility Principle",
      "Interface Segregation Principle",
      "Liskov Substitution Principle",
      "Open/Closed Principle",
    ],
    correctIndex: 1,
    explanation:
      "ISP: Robot tvinges til å implementere metoder den ikke bruker. Splitt i `Workable`, `Feedable`, `Sleepable` så Robot bare implementerer Workable.",
    difficulty: "medium",
    pensumRef: "ISP",
  },
  {
    id: "gen-solid-8",
    topic: "solid",
    source: "generated",
    question:
      "Hvilket av disse er IKKE et SOLID-prinsipp?",
    options: [
      "Liskov Substitution Principle",
      "Don't Repeat Yourself",
      "Open/Closed Principle",
      "Interface Segregation Principle",
    ],
    correctIndex: 1,
    explanation:
      "DRY (Don't Repeat Yourself) er et viktig prinsipp, men det er IKKE en del av SOLID. SOLID = SRP, OCP, LSP, ISP, DIP.",
    difficulty: "easy",
    pensumRef: "SOLID",
  },
  {
    id: "gen-solid-9",
    topic: "solid",
    source: "generated",
    question:
      "Du har en metode `private String formatDate(Date d)` i en klasse `OrderProcessor`. Klassen er ellers full av ordre-logikk. Hva er en typisk code smell-indikasjon?",
    options: [
      "Det er ingen code smell — private hjelpemetoder er ok",
      "SRP-brudd: dato-formatering hører ikke hjemme her, flytt til DateUtils",
      "OCP-brudd: metoden burde være public",
      "LSP-brudd: dato burde være LocalDate",
    ],
    correctIndex: 1,
    explanation:
      "Selv om dette ikke er katastrofalt, er det et tegn på at klassen påtar seg sekundære ansvar. SRP tilsier at dato-formatering hører til en hjelpeklasse. Klassen blir mer fokusert og dato-formatering kan gjenbrukes.",
    difficulty: "hard",
    pensumRef: "SRP code smell",
  },
  {
    id: "gen-solid-10",
    topic: "solid",
    source: "generated",
    question:
      "Hvilket prinsipp får man typisk 'gratis' når man følger Dependency Inversion?",
    options: [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
    ],
    correctIndex: 1,
    explanation:
      "DIP og OCP henger tett sammen. Når koden avhenger av abstraksjoner (DIP), kan nye implementasjoner legges til uten endring i eksisterende kode (OCP). DIP er ofte mekanismen som realiserer OCP.",
    difficulty: "hard",
    pensumRef: "SOLID-sammenheng",
  },

  // ════════════════════════════════════════════════════════════════
  // GRASP — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-grasp-1",
    topic: "grasp",
    source: "generated",
    question:
      "Du skal velge hvilket objekt som skal beregne totalprisen for en Ordre. Ordre har en liste av Ordrelinjer, og hver linje har en pris. Hvilket GRASP-prinsipp peker mot at Ordre selv burde gjøre dette?",
    options: [
      "Controller",
      "Information Expert",
      "Creator",
      "Pure Fabrication",
    ],
    correctIndex: 1,
    explanation:
      "Information Expert: tildel ansvar til den som har INFORMASJONEN. Ordre har listen av linjer og kan be hver linje om sin pris. Ordre er informasjonseksperten for total.",
    difficulty: "medium",
    pensumRef: "GRASP Information Expert",
  },
  {
    id: "gen-grasp-2",
    topic: "grasp",
    source: "generated",
    question:
      "Hvilket GRASP-prinsipp veileder hvem som skal opprette en ny instans av en klasse?",
    options: [
      "Information Expert",
      "Controller",
      "Creator",
      "High Cohesion",
    ],
    correctIndex: 2,
    explanation:
      "Creator: B bør opprette A hvis B inneholder A, har dataene som trengs for å lage A, eller er nært knyttet til A. F.eks. Ordre lager Ordrelinjer.",
    difficulty: "easy",
    pensumRef: "GRASP Creator",
  },
  {
    id: "gen-grasp-3",
    topic: "grasp",
    source: "generated",
    question:
      "Du har et UI som direkte kaller domeneobjekter for hver knapp som trykkes. Domenet endres ofte. Hvilket GRASP-prinsipp er brutt?",
    options: [
      "Low Coupling",
      "Pure Fabrication",
      "Polymorphism",
      "Indirection",
    ],
    correctIndex: 0,
    explanation:
      "Direkte kall fra UI til mange domeneobjekter = HØY kobling. Hver gang domenet endres, må UI også endres. Løsning: introduser en Controller som UI snakker med (også et GRASP-mønster), reduserer koblingen.",
    difficulty: "medium",
    pensumRef: "GRASP Low Coupling",
  },
  {
    id: "gen-grasp-4",
    topic: "grasp",
    source: "generated",
    question:
      "Du oppretter en LoggingService som ikke representerer noe i domenet, men som trengs for å løse et teknisk problem. Hvilket GRASP-prinsipp bruker du?",
    options: [
      "Information Expert",
      "Creator",
      "Pure Fabrication",
      "Indirection",
    ],
    correctIndex: 2,
    explanation:
      "Pure Fabrication: oppfinn en klasse som ikke har et 'naturlig' domenebegrep, men som hjelper deg å oppnå høy samhørighet og lav kobling. Typiske eksempler: LoggingService, DatabaseAdapter, EmailSender.",
    difficulty: "medium",
    pensumRef: "GRASP Pure Fabrication",
  },
  {
    id: "gen-grasp-5",
    topic: "grasp",
    source: "generated",
    question:
      "Hvilket GRASP-prinsipp bruker man når en operasjon kan ha ulik implementasjon avhengig av type, og man bruker arv/grensesnitt for å la riktig versjon kjøre?",
    options: [
      "Polymorphism",
      "Pure Fabrication",
      "Information Expert",
      "Controller",
    ],
    correctIndex: 0,
    explanation:
      "Polymorphism (GRASP): bruk polymorfi for å la ulike typer respondere på samme melding på sin egen måte. F.eks. Skatt.beregn() har én implementasjon for Person og en annen for Bedrift.",
    difficulty: "medium",
    pensumRef: "GRASP Polymorphism",
  },
  {
    id: "gen-grasp-6",
    topic: "grasp",
    source: "generated",
    question:
      "Hvilket GRASP-prinsipp brukes når du legger en mellomklasse mellom to klasser for å redusere direkte kobling?",
    options: [
      "Pure Fabrication",
      "Indirection",
      "Polymorphism",
      "Controller",
    ],
    correctIndex: 1,
    explanation:
      "Indirection: tildel ansvar til en mellomenhet (mellomliggende objekt) for å koble fra to direkte koblede komponenter. Eksempel: Adapter-mønster, MVC's controller mellom view og model.",
    difficulty: "medium",
    pensumRef: "GRASP Indirection",
  },
  {
    id: "gen-grasp-7",
    topic: "grasp",
    source: "generated",
    question:
      "Hvilket GRASP-prinsipp tilsier at en klasse ikke bør ha for mange ulike ansvar?",
    options: [
      "Low Coupling",
      "High Cohesion",
      "Controller",
      "Creator",
    ],
    correctIndex: 1,
    explanation:
      "High Cohesion: en klasse bør ha sammenhengende, fokusert ansvar. Lav samhørighet = klassen gjør for mange ulike ting og er vanskelig å vedlikeholde. Sterkt beslektet med SOLID's SRP.",
    difficulty: "easy",
    pensumRef: "GRASP High Cohesion",
  },
  {
    id: "gen-grasp-8",
    topic: "grasp",
    source: "generated",
    question:
      "Hvilket GRASP-prinsipp omhandler design som beskytter elementer mot fremtidige endringer i andre elementer?",
    options: [
      "Protected Variations",
      "Indirection",
      "Pure Fabrication",
      "Controller",
    ],
    correctIndex: 0,
    explanation:
      "Protected Variations: identifiser punkter der endring sannsynligvis vil skje, og pakk inn med stabile grensesnitt. Klienter bryr seg ikke om implementasjonsendringer bak grensesnittet. Speiler OCP fra SOLID.",
    difficulty: "hard",
    pensumRef: "GRASP Protected Variations",
  },
  {
    id: "gen-grasp-9",
    topic: "grasp",
    source: "generated",
    question:
      "Hvor mange GRASP-prinsipper er det totalt?",
    options: ["5", "7", "9", "11"],
    correctIndex: 2,
    explanation:
      "9 GRASP-prinsipper: Information Expert, Creator, Controller, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations.",
    difficulty: "easy",
    pensumRef: "GRASP-oversikt",
  },
  {
    id: "gen-grasp-10",
    topic: "grasp",
    source: "generated",
    question:
      "Hvilket GRASP-prinsipp anbefaler å gi systemoperasjoner til en klasse som representerer et helt system, et bruksscenario eller en fasade?",
    options: [
      "Creator",
      "Information Expert",
      "Controller",
      "Pure Fabrication",
    ],
    correctIndex: 2,
    explanation:
      "Controller: tildel ansvar for å håndtere en systemhendelse til en klasse som representerer hele systemet (Fasade) eller en use case-handler. Forhindrer at UI direkte snakker med domeneobjekter.",
    difficulty: "medium",
    pensumRef: "GRASP Controller",
  },

  // ════════════════════════════════════════════════════════════════
  // UTFORMINGSPRINSIPPER — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-utformingsprinsipper-1",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hva betyr KISS-prinsippet?",
    options: [
      "Keep It Strictly Synchronized",
      "Keep It Simple, Stupid",
      "Know It Step by Step",
      "Keep Identifiers Short and Simple",
    ],
    correctIndex: 1,
    explanation:
      "KISS = Keep It Simple, Stupid. Lag den enkleste løsningen som løser problemet — ikke overdesign. Kompleks kode = mer feil og vanskeligere vedlikehold.",
    difficulty: "easy",
    pensumRef: "KISS",
  },
  {
    id: "gen-utformingsprinsipper-2",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hva betyr YAGNI?",
    options: [
      "Yet Another Generic Naming Initiative",
      "You Aren't Gonna Need It",
      "Your Application Generates New Issues",
      "Yes, Always Generate New Implementation",
    ],
    correctIndex: 1,
    explanation:
      "YAGNI = You Aren't Gonna Need It. Ikke implementer funksjonalitet før du faktisk trenger den. Spekulative funksjoner blir ofte feil og må uansett endres når faktiske krav kommer.",
    difficulty: "easy",
    pensumRef: "YAGNI",
  },
  {
    id: "gen-utformingsprinsipper-3",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Atle (DAT109) understreker at en domenemodell skal bruke spesialisering, ikke komposisjon, mellom Spiller og spesifikke spillere. Hvorfor?",
    options: [
      "Komposisjon krever metoder, som domenemodellen ikke har",
      "Spesialisering uttrykker 'er-en' mens komposisjon uttrykker 'består-av' — modellen viser typer av spillere",
      "Komposisjon er forbudt i norsk modelleringspraksis",
      "Spesialisering er enklere å vise i UML",
    ],
    correctIndex: 1,
    explanation:
      "I domenemodellen viser vi BEGREPER og deres relasjoner. En MenneskeligSpiller ER-EN Spiller (spesialisering). Hvis vi sa Spiller 'består av' MenneskeligSpiller, ville det betydd at Spiller har en MenneskeligSpiller som DEL — meningsløst. Atles regel.",
    difficulty: "medium",
    pensumRef: "Atle: spesialisering vs komposisjon",
  },
  {
    id: "gen-utformingsprinsipper-4",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hva er forskjellen mellom aggregering og komposisjon?",
    options: [
      "Det er ingen forskjell",
      "Aggregering: delene kan eksistere uavhengig av helheten. Komposisjon: delene dør med helheten",
      "Aggregering brukes i analyse, komposisjon i design",
      "Aggregering er for én-til-mange, komposisjon for mange-til-mange",
    ],
    correctIndex: 1,
    explanation:
      "Komposisjon = STERK helhet-del-relasjon: når Hus slettes, slettes Rom (rommene har ikke mening uten huset). Aggregering = SVAK helhet-del: når Universitet slettes, lever Student videre.",
    difficulty: "medium",
    pensumRef: "Aggregering vs komposisjon",
  },
  {
    id: "gen-utformingsprinsipper-5",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hvilket prinsipp uttrykker 'foretrekk komposisjon over arv'?",
    options: [
      "Composition Over Inheritance",
      "Liskov Substitution Principle",
      "Single Responsibility Principle",
      "Pure Fabrication",
    ],
    correctIndex: 0,
    explanation:
      "'Favor composition over inheritance' (CoI) advarer mot dyp arv. Komposisjon er ofte mer fleksibelt: du kan bytte komponenter ved kjøring og unngå tett kobling som arv gir.",
    difficulty: "medium",
    pensumRef: "Komposisjon over arv",
  },
  {
    id: "gen-utformingsprinsipper-6",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hvilken vanlig fallgruve brytes ofte ved spesialisering?",
    options: [
      "Å lage subklasser uten gyldig 'er-en' relasjon (f.eks. Stack arver fra ArrayList)",
      "Å bruke arv mellom interface og klasse",
      "Å lage to subklasser av samme superklasse",
      "Å bruke abstrakte klasser",
    ],
    correctIndex: 0,
    explanation:
      "Klassisk feil: Stack arver fra ArrayList for 'gjenbruk' — men en stack ER IKKE en liste. Konsekvens: brukere kan kalle insert(0, x) som bryter stack-semantikken (LSP-brudd). Bruk komposisjon i stedet.",
    difficulty: "hard",
    pensumRef: "Spesialisering misbruk",
  },
  {
    id: "gen-utformingsprinsipper-7",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Du modellerer et brettspill der en rute kan inneholde en stige eller en slange (men ikke begge). I domenemodellen — hvilken modellering er best?",
    options: [
      "Rute har attributtene erStige og erSlange",
      "Rute er superklassen, Stige og Slange er spesialiseringer (subklasser)",
      "Rute har en liste av Element-objekter",
      "Stige og Slange arver fra hverandre",
    ],
    correctIndex: 1,
    explanation:
      "Spesialisering modellerer 'er-en'-forholdet eksplisitt og åpner for polymorfi i utformingsmodellen. Boolean-flagg er en code smell og bryter med begrepsklarheten i domenet.",
    difficulty: "medium",
    pensumRef: "F08 Stigespill modellering",
  },
  {
    id: "gen-utformingsprinsipper-8",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hva er DRY-prinsippet?",
    options: [
      "Don't Repeat Yourself — unngå duplisering av kunnskap i koden",
      "Do Reuse Yearly — gjenbruk koden hvert år",
      "Define Result Yields — definer resultater før utførelse",
      "Direct Reference Yields — bruk direkte referanser",
    ],
    correctIndex: 0,
    explanation:
      "DRY: hver kunnskapsbit bør ha én autoritativ representasjon i systemet. Duplisering = vanskelig vedlikehold (du må endre flere steder, og glemmer ofte ett).",
    difficulty: "easy",
    pensumRef: "DRY",
  },
  {
    id: "gen-utformingsprinsipper-9",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "I et spill har du en Spiller-klasse som kan være i tilstand AKTIV, VENTER, FERDIG. Hva er en god utformingstilnærming hvis oppførselen avhenger sterkt av tilstand?",
    options: [
      "Lag en stor switch på et 'tilstand'-felt overalt",
      "Bruk State-mønsteret med et tilstandshierarki",
      "Lag separate Spiller-klasser for hver tilstand uten arv",
      "Bruk if-else i hver metode",
    ],
    correctIndex: 1,
    explanation:
      "State-mønsteret: lag et tilstandshierarki (f.eks. SpillerTilstand med subklasser AktivTilstand, VenterTilstand). Spiller delegerer atferd til sin nåværende tilstand. Følger OCP — nye tilstander legges til uten å endre Spiller.",
    difficulty: "hard",
    pensumRef: "State-mønster / tilstandshierarki",
  },
  {
    id: "gen-utformingsprinsipper-10",
    topic: "utformingsprinsipper",
    source: "generated",
    question:
      "Hvilket av disse er IKKE et velkjent utformingsprinsipp?",
    options: ["KISS", "YAGNI", "DRY", "SLOC"],
    correctIndex: 3,
    explanation:
      "SLOC = Source Lines Of Code, en metrikk for kodemengde, ikke et utformingsprinsipp. KISS, YAGNI og DRY er tre kjente utformingsprinsipper.",
    difficulty: "easy",
    pensumRef: "Utformingsprinsipper",
  },

  // ════════════════════════════════════════════════════════════════
  // SCRUM — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-scrum-1",
    topic: "scrum",
    source: "generated",
    question:
      "Hvilke tre roller finnes i Scrum?",
    options: [
      "Product Owner, Scrum Master, Development Team",
      "Project Manager, Tech Lead, Developer",
      "Product Manager, Architect, QA",
      "Scrum Master, Sprint Master, Backlog Master",
    ],
    correctIndex: 0,
    explanation:
      "Scrum har tre roller: Product Owner (ansvarlig for produktet og backloggen), Scrum Master (servant leader, fjerner hindringer), Development Team (selvorganisert, leverer inkrement).",
    difficulty: "easy",
    pensumRef: "Scrum-roller",
  },
  {
    id: "gen-scrum-2",
    topic: "scrum",
    source: "generated",
    question:
      "Hvilken Scrum-seremoni har som mål å reflektere over hvordan teamet kan jobbe bedre?",
    options: [
      "Sprint Planning",
      "Daily Scrum",
      "Sprint Review",
      "Sprint Retrospective",
    ],
    correctIndex: 3,
    explanation:
      "Retrospective fokuserer på PROSESSEN: hva fungerte, hva fungerte ikke, hva endrer vi. Review fokuserer på PRODUKTET (demo for stakeholders). Daily Scrum er statusmøte for teamet.",
    difficulty: "easy",
    pensumRef: "Scrum-seremonier",
  },
  {
    id: "gen-scrum-3",
    topic: "scrum",
    source: "generated",
    question:
      "Hvilke tre artefakter har Scrum?",
    options: [
      "Product Backlog, Sprint Backlog, Inkrement",
      "User Stories, Tasks, Bugs",
      "Roadmap, Plan, Status",
      "Requirements, Design, Code",
    ],
    correctIndex: 0,
    explanation:
      "De tre Scrum-artefaktene: Product Backlog (prioritert liste av alt), Sprint Backlog (det teamet tar inn i sprinten), Inkrement (fungerende programvare ved sprint-slutt).",
    difficulty: "easy",
    pensumRef: "Scrum-artefakter",
  },
  {
    id: "gen-scrum-4",
    topic: "scrum",
    source: "generated",
    question:
      "Hvor lang er en typisk Daily Scrum?",
    options: ["5 minutter", "15 minutter", "30 minutter", "60 minutter"],
    correctIndex: 1,
    explanation:
      "Daily Scrum er tidsbokset til MAKS 15 minutter. Formålet er kort statusoppdatering: hva gjorde jeg i går, hva gjør jeg i dag, hindringer. Dypere diskusjoner tas etter møtet.",
    difficulty: "easy",
    pensumRef: "Daily Scrum",
  },
  {
    id: "gen-scrum-5",
    topic: "scrum",
    source: "generated",
    question:
      "Hvem prioriterer Product Backlog?",
    options: [
      "Scrum Master",
      "Development Team",
      "Product Owner",
      "Stakeholderne sammen",
    ],
    correctIndex: 2,
    explanation:
      "Product Owner er eneste person som prioriterer Product Backlog. PO maksimerer verdien teamet leverer, basert på input fra stakeholders, men beslutningen er PO sin alene.",
    difficulty: "easy",
    pensumRef: "Product Owner",
  },
  {
    id: "gen-scrum-6",
    topic: "scrum",
    source: "generated",
    question:
      "Hva er IKKE en del av Scrum?",
    options: [
      "Sprint",
      "Daily Scrum",
      "Gantt-diagram",
      "Sprint Retrospective",
    ],
    correctIndex: 2,
    explanation:
      "Gantt-diagram er et tradisjonelt prosjektplanleggingsverktøy (foss-fall-stil). Scrum bruker ikke Gantt — det baserer seg på adaptiv planlegging via backlog og sprinter.",
    difficulty: "medium",
    pensumRef: "Scrum hva er IKKE Scrum",
  },
  {
    id: "gen-scrum-7",
    topic: "scrum",
    source: "generated",
    question:
      "Hva skjer i Sprint Review?",
    options: [
      "Teamet planlegger neste sprint",
      "Teamet demonstrerer inkrementet for stakeholders og henter feedback",
      "Teamet diskuterer interne arbeidsprosesser",
      "Teamet estimerer tid for nye oppgaver",
    ],
    correctIndex: 1,
    explanation:
      "Sprint Review = produkt-demo for stakeholders. Formål: vis hva som er bygget, få feedback, juster Product Backlog. Skiller seg fra Retrospective (intern prosess).",
    difficulty: "easy",
    pensumRef: "Sprint Review",
  },
  {
    id: "gen-scrum-8",
    topic: "scrum",
    source: "generated",
    question:
      "Hvilken Scrum-rolle er en 'servant leader' som hjelper teamet med å fjerne hindringer?",
    options: [
      "Product Owner",
      "Scrum Master",
      "Tech Lead",
      "Project Manager",
    ],
    correctIndex: 1,
    explanation:
      "Scrum Master er servant leader: tjener teamet, beskytter mot ytre forstyrrelser, fjerner hindringer (impediments) og coacher teamet i Scrum-prosessen. Ikke en sjef.",
    difficulty: "easy",
    pensumRef: "Scrum Master",
  },
  {
    id: "gen-scrum-9",
    topic: "scrum",
    source: "generated",
    question:
      "Hva er en typisk lengde på en sprint?",
    options: [
      "1 dag",
      "1-2 timer",
      "2-4 uker",
      "3-6 måneder",
    ],
    correctIndex: 2,
    explanation:
      "Sprinter er typisk 2-4 uker. Maks 1 måned ifølge Scrum Guide. Kortere sprinter = raskere feedback, men mer overhead. Lengden bør være KONSTANT for samme team.",
    difficulty: "easy",
    pensumRef: "Sprint-lengde",
  },
  {
    id: "gen-scrum-10",
    topic: "scrum",
    source: "generated",
    question:
      "Hva betyr 'tidsboks' i Scrum?",
    options: [
      "En boks der teamet legger sine arbeidstimer",
      "En forhåndsbestemt maksimal varighet på et møte eller en aktivitet",
      "En kalender som viser hele sprinten",
      "Et verktøy for å logge bugs",
    ],
    correctIndex: 1,
    explanation:
      "Tidsboks (timebox) = forhåndsbestemt maks-varighet. F.eks. Daily Scrum = 15 min, Sprint Planning for 2-ukers sprint = 4 timer. Hindrer at møter sklir ut.",
    difficulty: "easy",
    pensumRef: "Tidsboks",
  },

  // ════════════════════════════════════════════════════════════════
  // XP (Extreme Programming) — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-xp-1",
    topic: "xp",
    source: "generated",
    question:
      "Hvilke er XP sine 5 verdier?",
    options: [
      "Communication, Simplicity, Feedback, Courage, Respect",
      "Speed, Quality, Cost, Scope, Time",
      "Trust, Honesty, Loyalty, Diligence, Pride",
      "Plan, Build, Test, Deploy, Monitor",
    ],
    correctIndex: 0,
    explanation:
      "XP sine 5 verdier: Communication, Simplicity, Feedback, Courage, Respect. Disse ligger til grunn for de 12 praksisene.",
    difficulty: "medium",
    pensumRef: "XP-verdier",
  },
  {
    id: "gen-xp-2",
    topic: "xp",
    source: "generated",
    question:
      "Hva er parprogrammering?",
    options: [
      "To utviklere bytter kode med hverandre via e-post",
      "To utviklere jobber sammen ved samme datamaskin på samme oppgave",
      "To utviklere jobber på hver sin del av samme klasse",
      "En utvikler programmerer mens en annen tegner UI",
    ],
    correctIndex: 1,
    explanation:
      "Parprogrammering: to utviklere ved samme tastatur. En 'driver' (skriver) og en 'navigator' (tenker strategisk, ser feil). Bytt roller jevnlig. Resultat: bedre kode, mindre feil, kunnskapsspredning.",
    difficulty: "easy",
    pensumRef: "XP parprogrammering",
  },
  {
    id: "gen-xp-3",
    topic: "xp",
    source: "generated",
    question:
      "Hva er 'On-site Customer' i XP?",
    options: [
      "En kunde som besøker teamet en gang i måneden",
      "En kunderepresentant som er fysisk tilgjengelig for teamet hele tiden",
      "En automatisk customer service-chatbot",
      "En supportperson som tar imot bug-rapporter",
    ],
    correctIndex: 1,
    explanation:
      "On-site Customer: kunden (eller en representant med beslutningsmyndighet) sitter sammen med teamet, besvarer spørsmål, prioriterer og avklarer krav i sanntid. Reduserer feiltolkninger.",
    difficulty: "medium",
    pensumRef: "XP on-site customer",
  },
  {
    id: "gen-xp-4",
    topic: "xp",
    source: "generated",
    question:
      "Hvilken praksis er IKKE en XP-praksis?",
    options: [
      "Test-Driven Development",
      "Continuous Integration",
      "Pair Programming",
      "Big Design Up Front",
    ],
    correctIndex: 3,
    explanation:
      "Big Design Up Front (BDUF) er det MOTSATTE av XP. XP foretrekker simple design (KISS) som utvikles iterativt. BDUF er klassisk fossefall-tilnærming.",
    difficulty: "medium",
    pensumRef: "XP-praksiser",
  },
  {
    id: "gen-xp-5",
    topic: "xp",
    source: "generated",
    question:
      "Hva betyr 'kollektivt eierskap' i XP?",
    options: [
      "Hver utvikler eier sin egen del av koden",
      "Alle utviklere kan og skal endre all kode i prosjektet",
      "Selskapet eier all kode juridisk",
      "Open source-lisensiering av all kode",
    ],
    correctIndex: 1,
    explanation:
      "Collective Code Ownership: ingen 'eier' en spesifikk klasse — alle har rett og plikt til å forbedre/endre all kode. Forutsetter god testdekning og parprogrammering for å fungere trygt.",
    difficulty: "medium",
    pensumRef: "XP collective code ownership",
  },
  {
    id: "gen-xp-6",
    topic: "xp",
    source: "generated",
    question:
      "Hva er 'planning game' i XP?",
    options: [
      "Et brettspill teamet spiller for moro",
      "Estimering og prioritering av user stories sammen med kunden",
      "Sjakk for å trene strategisk tenkning",
      "Et videospill som simulerer prosjektplanlegging",
    ],
    correctIndex: 1,
    explanation:
      "Planning Game: kunden skriver user stories og bestemmer FORRETNINGSVERDI/prioritet. Utviklerne ESTIMERER tid. Sammen velger de hvilke stories som kommer i neste iterasjon.",
    difficulty: "medium",
    pensumRef: "XP planning game",
  },
  {
    id: "gen-xp-7",
    topic: "xp",
    source: "generated",
    question:
      "Hvor mange XP-praksiser er det totalt?",
    options: ["5", "9", "12", "15"],
    correctIndex: 2,
    explanation:
      "12 XP-praksiser, gruppert i fire områder (fine scale feedback, continuous process, shared understanding, programmer welfare). Inkluderer TDD, pair programming, CI, refactoring, simple design, m.fl.",
    difficulty: "medium",
    pensumRef: "XP-praksiser",
  },
  {
    id: "gen-xp-8",
    topic: "xp",
    source: "generated",
    question:
      "XP fremmer 'sustainable pace' — hva betyr det?",
    options: [
      "At teamet bør jobbe overtid jevnlig for å holde fremgang",
      "At teamet jobber i et tempo som kan opprettholdes over tid uten å brenne ut",
      "At alle skal jobbe like raskt",
      "At kjøretid (runtime) på systemet er lav",
    ],
    correctIndex: 1,
    explanation:
      "Sustainable Pace (40-timersuke): utbrenthet gir dårligere kode og mer feil. XP sier nei til konstant overtid — bedre å levere mindre stabilt enn å overarbeide og krasje.",
    difficulty: "easy",
    pensumRef: "XP sustainable pace",
  },
  {
    id: "gen-xp-9",
    topic: "xp",
    source: "generated",
    question:
      "Hvilken av XP sine verdier handler om å våge å kaste eller refaktorere kode som ikke fungerer?",
    options: [
      "Communication",
      "Simplicity",
      "Courage",
      "Respect",
    ],
    correctIndex: 2,
    explanation:
      "Courage (mot): mot til å refaktorere stor kode, kaste dårlige løsninger, fortelle sannheter (f.eks. at estimat er urealistisk), prøve nye tilnærminger.",
    difficulty: "medium",
    pensumRef: "XP courage",
  },
  {
    id: "gen-xp-10",
    topic: "xp",
    source: "generated",
    question:
      "Hva er 'simple design' i XP?",
    options: [
      "Designet skal kun ha én skjerm",
      "Lag det enkleste designet som tilfredsstiller dagens krav, ikke spekulative fremtidige krav",
      "Bruk bare ett designmønster",
      "Skriv så få linjer kode som mulig",
    ],
    correctIndex: 1,
    explanation:
      "Simple Design (relatert til YAGNI): designet skal være så enkelt som mulig for dagens krav. Refaktorer når nye krav kommer. Spekulativt design er ofte feil.",
    difficulty: "medium",
    pensumRef: "XP simple design",
  },

  // ════════════════════════════════════════════════════════════════
  // TDD — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-tdd-1",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er rekkefølgen i TDD-syklusen?",
    options: [
      "Refactor → Red → Green",
      "Green → Red → Refactor",
      "Red → Green → Refactor",
      "Code → Test → Deploy",
    ],
    correctIndex: 2,
    explanation:
      "Red-Green-Refactor: 1) Skriv en feilende test (RED). 2) Skriv minimumskode for å få den grønn (GREEN). 3) Refaktorer mens testen fortsatt er grønn (REFACTOR). Gjenta.",
    difficulty: "easy",
    pensumRef: "TDD-syklus",
  },
  {
    id: "gen-tdd-2",
    topic: "tdd",
    source: "generated",
    question:
      "Hvilket av disse er en 'Mock' i testing?",
    options: [
      "En tom implementasjon som returnerer null/0/false",
      "Et objekt som returnerer forhåndsdefinerte verdier",
      "Et objekt som verifiserer at det blir kalt på riktig måte",
      "En full implementasjon i minne (in-memory)",
    ],
    correctIndex: 2,
    explanation:
      "Mock = registrerer kall og lar testen verifisere at metoder ble kalt riktig. Stub = returnerer forhåndsdefinerte verdier. Dummy = bare for å fylle parameter. Simulator/Fake = lettvektsimplementasjon.",
    difficulty: "medium",
    pensumRef: "Test doubles",
  },
  {
    id: "gen-tdd-3",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er en 'Stub' i testing?",
    options: [
      "Et objekt som verifiserer kall",
      "Et objekt som returnerer hardkodede verdier på kall, uten verifikasjon",
      "Et objekt som bare brukes for å fylle parameterlister",
      "En ekte implementasjon brukt i tester",
    ],
    correctIndex: 1,
    explanation:
      "Stub: gir 'kanned' svar — du programmerer den til å returnere bestemte verdier. Forskjell fra Mock: Stub VERIFISERER ikke at den blir kalt; den bare svarer.",
    difficulty: "medium",
    pensumRef: "Test doubles - Stub",
  },
  {
    id: "gen-tdd-4",
    topic: "tdd",
    source: "generated",
    question:
      "I test-pyramiden — hvilket nivå skal det være FLEST tester på?",
    options: [
      "End-to-end / UI-tester",
      "Integrasjonstester",
      "Enhetstester (unit tests)",
      "Manuelle tester",
    ],
    correctIndex: 2,
    explanation:
      "Test-pyramiden: bred bunn av enhetstester (raske, billige, mange), mindre integrasjonstester i midten, få E2E-tester på toppen. Motsatt = 'iskremkjegle' = sakte, dyrt og skjørt.",
    difficulty: "medium",
    pensumRef: "Test-pyramiden",
  },
  {
    id: "gen-tdd-5",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er ekvivalenspartisjonering (equivalence partitioning)?",
    options: [
      "Å dele inn input i grupper der man forventer samme oppførsel, og teste én verdi fra hver",
      "Å skrive like mange tester for hver klasse",
      "Å splitte testkode i flere filer",
      "Å kjøre samme test på flere maskiner",
    ],
    correctIndex: 0,
    explanation:
      "Ekvivalenspartisjonering: del inputrommet i klasser der oppførselen er ekvivalent. F.eks. for alder: <0 (ugyldig), 0-17 (mindreårig), 18+ (voksen). Test én verdi i hver klasse — du trenger ikke teste alle.",
    difficulty: "medium",
    pensumRef: "Ekvivalenspartisjonering",
  },
  {
    id: "gen-tdd-6",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er forskjellen mellom alpha- og beta-testing?",
    options: [
      "Alpha er internt hos utvikler, beta er hos utvalgte eksterne brukere",
      "Alpha er automatisert, beta er manuelt",
      "Alpha er for ytelse, beta er for funksjonalitet",
      "Alpha er for backend, beta er for frontend",
    ],
    correctIndex: 0,
    explanation:
      "Alpha = INTERN testing hos utvikler, ofte i kontrollerte forhold. Beta = EKSTERN testing hos utvalgte ekte brukere før full release. Begge er aksepttester før produksjonslansering.",
    difficulty: "easy",
    pensumRef: "Alpha vs beta",
  },
  {
    id: "gen-tdd-7",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er en 'Dummy' i testing?",
    options: [
      "Et objekt som ikke brukes, men trengs for å fylle parameter",
      "En testklasse som ikke gjør noe",
      "En forenkling for begynnere",
      "Et alternativ til assertions",
    ],
    correctIndex: 0,
    explanation:
      "Dummy: et objekt som SENDES INN, men ALDRI BRUKES av testen. Trengs typisk fordi en metodesignatur krever det. Dummy = 'fyllmasse'.",
    difficulty: "medium",
    pensumRef: "Test doubles - Dummy",
  },
  {
    id: "gen-tdd-8",
    topic: "tdd",
    source: "generated",
    question:
      "Hvorfor refaktorerer man i 'refactor'-steget av TDD?",
    options: [
      "For å gjøre testen grønn",
      "For å forbedre kodens struktur uten å endre oppførsel — testene fungerer som sikkerhetsnett",
      "For å legge til nye funksjoner",
      "For å skrive mer kode",
    ],
    correctIndex: 1,
    explanation:
      "Etter at testen er grønn, kan du trygt forbedre kode-struktur (DRY, klarhet, ytelse) — testene varsler hvis du ødelegger noe. Dette er hjertet i TDD: trygg refaktorering.",
    difficulty: "easy",
    pensumRef: "TDD refactor",
  },
  {
    id: "gen-tdd-9",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er en 'Simulering' (Simulator/Fake) i testing?",
    options: [
      "En lettvektsimplementasjon av en ekte komponent (f.eks. in-memory database)",
      "En manuell test utført av et menneske",
      "En tilfeldig generator for testdata",
      "En kopi av produksjonsmiljøet",
    ],
    correctIndex: 0,
    explanation:
      "Fake/Simulator: ekte arbeidsimplementasjon som brukes i test, men er for enkel for produksjon. Eksempel: HashMap-basert in-memory 'database' som matcher samme grensesnitt som ekte DB.",
    difficulty: "medium",
    pensumRef: "Test doubles - Fake",
  },
  {
    id: "gen-tdd-10",
    topic: "tdd",
    source: "generated",
    question:
      "Hva er hovedfordelen med TDD?",
    options: [
      "Det er raskere å skrive kode",
      "Designet blir bedre, koden er testbar fra start, og man har trygghet for refaktorering",
      "Det erstatter behov for kodegjennomgang",
      "Programmet får færre linjer kode",
    ],
    correctIndex: 1,
    explanation:
      "TDD tvinger frem testbar design (løs kobling), gir høy testdekning som sikkerhetsnett, og dokumenterer intendert oppførsel. Trade-off: koden tar lengre tid å skrive innledningsvis, men færre bugs over tid.",
    difficulty: "medium",
    pensumRef: "TDD-fordeler",
  },

  // ════════════════════════════════════════════════════════════════
  // CI/CD/DevOps — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-ci-cd-devops-1",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hva er forskjellen mellom Continuous Delivery og Continuous Deployment?",
    options: [
      "Det er to navn på samme ting",
      "Continuous Delivery: produktet er klart for produksjon, men deploy er manuelt. Continuous Deployment: hver endring deployes automatisk",
      "Continuous Delivery er for backend, Continuous Deployment for frontend",
      "Continuous Delivery krever Docker, Continuous Deployment krever Kubernetes",
    ],
    correctIndex: 1,
    explanation:
      "CD (Delivery) = alltid klar for produksjon, men siste steg trigges manuelt (typisk en menneskelig 'go'). CD (Deployment) = hver commit som passerer alle tester går automatisk til produksjon. Deployment er strengere/mer automatisert.",
    difficulty: "medium",
    pensumRef: "CD vs Continuous Deployment",
  },
  {
    id: "gen-ci-cd-devops-2",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hva er Continuous Integration (CI)?",
    options: [
      "Kontinuerlig integrasjon av nye personer i teamet",
      "Praksisen med at utviklere ofte (flere ganger daglig) merger kode til en felles main-branch, med automatisk bygg og test",
      "En type integrasjonstest mellom systemer",
      "Et CI-rammeverk for spillutvikling",
    ],
    correctIndex: 1,
    explanation:
      "CI: hyppige merger til hovedgren med automatisert bygg + test. Hindrer 'merge hell' og fanger feil tidlig. Forutsetning for CD.",
    difficulty: "easy",
    pensumRef: "CI",
  },
  {
    id: "gen-ci-cd-devops-3",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hva er Infrastructure as Code (IaC)?",
    options: [
      "Å skrive kode på serverhardware",
      "Å definere infrastruktur (servere, nettverk, etc.) i tekstfiler som versjoneres som kode",
      "En programmerings-paradigme",
      "Å kjøre kode i hardware FPGA",
    ],
    correctIndex: 1,
    explanation:
      "IaC: definer infrastruktur deklarativt (Terraform, CloudFormation, Ansible) i versjonskontrollerte filer. Reproduserbart, sporbart, kan kodegjennomgås. Erstatter manuelle 'klikkeoperasjoner' i kontrollpaneler.",
    difficulty: "medium",
    pensumRef: "IaC",
  },
  {
    id: "gen-ci-cd-devops-4",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "DevOps fokuserer på samarbeid mellom hvilke to grupper?",
    options: [
      "Designere og programmerere",
      "Utvikling (Dev) og drift (Operations)",
      "Front-end og back-end",
      "Tech og marketing",
    ],
    correctIndex: 1,
    explanation:
      "DevOps = Dev + Ops. Bryter ned siloen mellom utviklere og driftspersonell — felles ansvar for hele leveransekjeden, fra kode til produksjon.",
    difficulty: "easy",
    pensumRef: "DevOps",
  },
  {
    id: "gen-ci-cd-devops-5",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hvilken av disse er IKKE en bærebjelke i DevOps?",
    options: [
      "Automation",
      "Continuous improvement",
      "Measurement",
      "Manual quality assurance",
    ],
    correctIndex: 3,
    explanation:
      "DevOps-bærebjelker (CALMS): Culture, Automation, Lean, Measurement, Sharing. Manuell QA er IKKE en DevOps-bærebjelke — DevOps fokuserer på automatisert testing.",
    difficulty: "hard",
    pensumRef: "DevOps CALMS",
  },
  {
    id: "gen-ci-cd-devops-6",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hva måles i en typisk CI/CD-pipeline?",
    options: [
      "Bare antall linjer kode",
      "Bygg-tid, testtid, deploy-frekvens, lead time, change failure rate",
      "Kun kostnad",
      "Bare hvor mange utviklere som er aktive",
    ],
    correctIndex: 1,
    explanation:
      "DORA-metrics og lignende: deployment frequency (hvor ofte deployes?), lead time for changes (idé til produksjon), change failure rate (hvor ofte feiler deploys?), MTTR (mean time to recovery).",
    difficulty: "medium",
    pensumRef: "DevOps måling",
  },
  {
    id: "gen-ci-cd-devops-7",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hvorfor er automatiserte tester essensielle for Continuous Deployment?",
    options: [
      "Fordi det er regelverk-krav",
      "Fordi du ikke kan deploye automatisk uten tillit til at koden fungerer — automatiserte tester gir den tilliten",
      "Fordi det reduserer kodemengden",
      "Fordi det er gratis",
    ],
    correctIndex: 1,
    explanation:
      "Continuous Deployment betyr at hver commit kan ende i produksjon. Uten automatiske tester som sikkerhetsnett ville hver endring være Russian roulette. Tester = tillit = trygt å deploye.",
    difficulty: "medium",
    pensumRef: "CD og automatiserte tester",
  },
  {
    id: "gen-ci-cd-devops-8",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hva er 'shift left' i testing-kontekst?",
    options: [
      "Å bytte tastaturlayout",
      "Å gjøre testing tidligere i utviklingsprosessen",
      "Å migrere fra Windows til Linux",
      "Å flytte fra agile til fossefall",
    ],
    correctIndex: 1,
    explanation:
      "'Shift left' = flytt testing/QA tidligere ('venstre' i en tradisjonell tidslinje). Tidlig feildeteksjon er billigere — feil oppdaget i produksjon koster 100x mer enn under utvikling.",
    difficulty: "medium",
    pensumRef: "Shift left testing",
  },
  {
    id: "gen-ci-cd-devops-9",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Hva er hovedfordelen med å bruke containere (f.eks. Docker) i CI/CD?",
    options: [
      "Containere gjør koden raskere",
      "Konsistent miljø — koden kjører likt på utviklerens maskin, i CI og i produksjon",
      "Containere er gratis",
      "Containere fjerner behov for tester",
    ],
    correctIndex: 1,
    explanation:
      "Containere pakker app + avhengigheter. Eliminerer 'works on my machine'-problemet. Samme image kjører i alle miljøer, noe som gir reproduserbarhet i hele pipelinen.",
    difficulty: "medium",
    pensumRef: "Containere CI/CD",
  },
  {
    id: "gen-ci-cd-devops-10",
    topic: "ci-cd-devops",
    source: "generated",
    question:
      "Et team merger til main bare en gang i måneden. Hvilket DevOps/CI-prinsipp bryter de?",
    options: [
      "Continuous Integration",
      "Infrastructure as Code",
      "Test-Driven Development",
      "Pair Programming",
    ],
    correctIndex: 0,
    explanation:
      "CI krever HYPPIG integrasjon (minst daglig). En måneds-merger gir 'merge hell', vanskelig konfliktløsning og sen feildeteksjon. Hele poenget med CI er å unngå dette.",
    difficulty: "easy",
    pensumRef: "CI",
  },

  // ════════════════════════════════════════════════════════════════
  // AUP — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-aup-1",
    topic: "aup",
    source: "generated",
    question:
      "Hva er de 4 fasene i AUP?",
    options: [
      "Plan, Design, Code, Deploy",
      "Inception, Elaboration, Construction, Transition",
      "Analysis, Design, Implementation, Maintenance",
      "Sprint 1, Sprint 2, Sprint 3, Sprint 4",
    ],
    correctIndex: 1,
    explanation:
      "AUP-fasene (arvet fra RUP): Inception (idé/scope), Elaboration (arkitektur/risiko), Construction (bygging), Transition (lansering). Hver fase ender med en milestone.",
    difficulty: "easy",
    pensumRef: "AUP-faser",
  },
  {
    id: "gen-aup-2",
    topic: "aup",
    source: "generated",
    question:
      "Hva er hovedmålet med Inception-fasen i AUP?",
    options: [
      "Skrive ferdig all kode",
      "Etablere prosjektets visjon, scope og forretningssak — er dette verdt å gjøre?",
      "Lansere produktet",
      "Designe arkitekturen i detalj",
    ],
    correctIndex: 1,
    explanation:
      "Inception svarer på 'skal vi gjøre dette?' — etabler scope, gi en grov estimat, vurder forretningsverdi. Slutter med 'Lifecycle Objectives Milestone'.",
    difficulty: "medium",
    pensumRef: "AUP Inception",
  },
  {
    id: "gen-aup-3",
    topic: "aup",
    source: "generated",
    question:
      "Hvor mange disipliner har AUP?",
    options: ["4", "5", "7", "9"],
    correctIndex: 2,
    explanation:
      "AUP har 7 disipliner: Model, Implementation, Test, Deployment, Configuration Management, Project Management, Environment.",
    difficulty: "medium",
    pensumRef: "AUP-disipliner",
  },
  {
    id: "gen-aup-4",
    topic: "aup",
    source: "generated",
    question:
      "I hvilken AUP-fase fokuserer man hovedsakelig på arkitektur og å redusere de største risikoene?",
    options: [
      "Inception",
      "Elaboration",
      "Construction",
      "Transition",
    ],
    correctIndex: 1,
    explanation:
      "Elaboration = utdypning. Bygg en kjørende arkitektur som beviser at løsningen er teknisk gjennomførbar. Risikoreduksjon er hovedfokus. Slutter med 'Lifecycle Architecture Milestone'.",
    difficulty: "medium",
    pensumRef: "AUP Elaboration",
  },
  {
    id: "gen-aup-5",
    topic: "aup",
    source: "generated",
    question:
      "Hva skjer i Transition-fasen?",
    options: [
      "Idé-fase: hva skal vi bygge?",
      "Brorparten av koding skjer her",
      "Lansering, deploy, opplæring, og overlevering til drift",
      "Risikoanalyse av arkitekturen",
    ],
    correctIndex: 2,
    explanation:
      "Transition = overgang til produksjon. Beta-testing, deploy, brukeropplæring, dokumentasjon, support-overlevering. Slutter med 'Product Release Milestone'.",
    difficulty: "easy",
    pensumRef: "AUP Transition",
  },
  {
    id: "gen-aup-6",
    topic: "aup",
    source: "generated",
    question:
      "Hva er hovedforskjellen mellom AUP og RUP?",
    options: [
      "AUP er enklere/lettere — har færre artefakter og disipliner enn RUP",
      "AUP er for android, RUP for iOS",
      "AUP bruker UML, RUP gjør ikke",
      "RUP er agile, AUP er fossefall",
    ],
    correctIndex: 0,
    explanation:
      "AUP (Agile Unified Process) er en STRIPPET, agile versjon av RUP. RUP har mange artefakter og disipliner; AUP har bare det essensielle. Mer pragmatisk og tilpasset agile-arbeid.",
    difficulty: "medium",
    pensumRef: "AUP vs RUP",
  },
  {
    id: "gen-aup-7",
    topic: "aup",
    source: "generated",
    question:
      "Hvordan kan AUP og Scrum kombineres?",
    options: [
      "De er inkompatible",
      "AUP gir overordnet rammeverk (faser, milestones), Scrum brukes til iterativ utvikling i Construction",
      "Scrum erstatter AUP fullstendig",
      "AUP brukes kun til Inception, Scrum til alt etterpå",
    ],
    correctIndex: 1,
    explanation:
      "Vanlig kombinasjon: AUP gir struktur på prosjektnivå (faser/milestones), mens Scrum brukes inni hver fase (særlig Construction) for iterativ levering. Bryter ikke noen av rammeverkene.",
    difficulty: "hard",
    pensumRef: "AUP + Scrum",
  },
  {
    id: "gen-aup-8",
    topic: "aup",
    source: "generated",
    question:
      "Hvilken disiplin i AUP handler om å sikre at riktig versjon av artefakter brukes?",
    options: [
      "Configuration Management",
      "Project Management",
      "Implementation",
      "Test",
    ],
    correctIndex: 0,
    explanation:
      "Configuration Management: versjonskontroll, branch-strategi, build-management, sporing av endringer. Sikrer integritet over tid.",
    difficulty: "medium",
    pensumRef: "AUP disipliner - CM",
  },
  {
    id: "gen-aup-9",
    topic: "aup",
    source: "generated",
    question:
      "I hvilken fase blir mesteparten av funksjonaliteten faktisk kodet?",
    options: [
      "Inception",
      "Elaboration",
      "Construction",
      "Transition",
    ],
    correctIndex: 2,
    explanation:
      "Construction = byggefasen. Funksjonalitet utvikles iterativt og inkrementelt, ofte med Scrum-sprinter. Inception er for vision, Elaboration for arkitektur, Transition for utrulling.",
    difficulty: "easy",
    pensumRef: "AUP Construction",
  },
  {
    id: "gen-aup-10",
    topic: "aup",
    source: "generated",
    question:
      "Hva avslutter Construction-fasen?",
    options: [
      "Lifecycle Objectives Milestone",
      "Lifecycle Architecture Milestone",
      "Initial Operational Capability Milestone",
      "Product Release Milestone",
    ],
    correctIndex: 2,
    explanation:
      "Construction avsluttes med Initial Operational Capability (IOC) Milestone — produktet er funksjonelt klart for beta. Transition slutter med Product Release Milestone (faktisk lansering).",
    difficulty: "hard",
    pensumRef: "AUP milestones",
  },

  // ════════════════════════════════════════════════════════════════
  // KANBAN — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-kanban-1",
    topic: "kanban",
    source: "generated",
    question:
      "Hva er en WIP-limit?",
    options: [
      "Maks antall personer på et team",
      "Maks antall oppgaver som kan være under arbeid (Work In Progress) samtidig i en kolonne",
      "Maks antall sprinter i et prosjekt",
      "Maks antall bugs som tillates",
    ],
    correctIndex: 1,
    explanation:
      "WIP-limit (Work In Progress limit) begrenser hvor mange oppgaver som kan være i én kolonne (f.eks. 'In Progress' max 3). Tvinger teamet til å fullføre før de starter nytt — reduserer multitasking og flaskehalser.",
    difficulty: "easy",
    pensumRef: "Kanban WIP-limit",
  },
  {
    id: "gen-kanban-2",
    topic: "kanban",
    source: "generated",
    question:
      "Hva er forskjellen mellom 'pull'- og 'push'-system?",
    options: [
      "Push: arbeid skyves til neste steg når forrige er ferdig. Pull: neste steg henter arbeid når det har kapasitet",
      "Push og pull er det samme",
      "Push gjelder Git, pull gjelder Kanban",
      "Push er agile, pull er fossefall",
    ],
    correctIndex: 0,
    explanation:
      "Kanban er PULL-basert: når en utvikler er ferdig, HENTER de neste oppgave. Push-systemer (klassisk fossefall) DYTTER arbeid videre uansett om mottakeren har kapasitet — fører til opphopninger.",
    difficulty: "medium",
    pensumRef: "Kanban pull-system",
  },
  {
    id: "gen-kanban-3",
    topic: "kanban",
    source: "generated",
    question:
      "Hva viser et Cumulative Flow Diagram (CFD)?",
    options: [
      "Antall arbeidsoppgaver i hver kolonne over tid, som lagvise kurver",
      "Total antall personer i teamet over tid",
      "Tid hver person bruker per dag",
      "Total kostnad i prosjektet",
    ],
    correctIndex: 0,
    explanation:
      "CFD: x-akse = tid, y-akse = antall oppgaver, ulike farger viser hver kolonne (Backlog, In Progress, Done). Visualiserer flyt — flaskehalser ses som bredere bånd.",
    difficulty: "hard",
    pensumRef: "Kanban CFD",
  },
  {
    id: "gen-kanban-4",
    topic: "kanban",
    source: "generated",
    question:
      "Hva er en STOR forskjell mellom Scrum og Kanban?",
    options: [
      "Kanban har sprinter, Scrum har ikke",
      "Scrum har tidsboksete iterasjoner, Kanban har kontinuerlig flyt",
      "Scrum har ingen roller, Kanban har Scrum Master",
      "Kanban krever daglige møter, Scrum gjør ikke",
    ],
    correctIndex: 1,
    explanation:
      "Scrum: tidsboksete sprinter med fast scope per sprint. Kanban: kontinuerlig flyt, ny arbeid trekkes inn løpende, fokus på gjennomstrømning og WIP-limits. Kanban har færre forskrevne roller.",
    difficulty: "medium",
    pensumRef: "Kanban vs Scrum",
  },
  {
    id: "gen-kanban-5",
    topic: "kanban",
    source: "generated",
    question:
      "Hva er hovedmål med å sette en WIP-limit?",
    options: [
      "Å redusere antall ansatte",
      "Å avsløre flaskehalser og forbedre flyt",
      "Å øke tidspresset",
      "Å begrense antall releases",
    ],
    correctIndex: 1,
    explanation:
      "Når WIP-limit nås, kan ingen starte nytt — flaskehalsen blir synlig. Teamet må samarbeide om å løse den (f.eks. hjelpe i testkolonnen). Resultat: jevnere, raskere flyt.",
    difficulty: "medium",
    pensumRef: "WIP-limit formål",
  },
  {
    id: "gen-kanban-6",
    topic: "kanban",
    source: "generated",
    question:
      "Hvilke kolonner er typiske på en enkel Kanban-tavle?",
    options: [
      "Sprint 1, Sprint 2, Sprint 3",
      "To Do, In Progress, Done",
      "Bugs, Features, Epics",
      "Frontend, Backend, Database",
    ],
    correctIndex: 1,
    explanation:
      "En enkel tavle: To Do (skal gjøres), In Progress (under arbeid), Done (ferdig). Mer komplekse tavler kan ha flere kolonner (Code Review, Test, Deploy) for å speile reell arbeidsflyt.",
    difficulty: "easy",
    pensumRef: "Kanban-tavle",
  },
  {
    id: "gen-kanban-7",
    topic: "kanban",
    source: "generated",
    question:
      "Hva er 'lead time' i Kanban?",
    options: [
      "Tiden teamlederen bruker per dag",
      "Tiden fra en oppgave kommer inn i systemet til den er fullført",
      "Tiden mellom to releases",
      "Tiden møter tar",
    ],
    correctIndex: 1,
    explanation:
      "Lead time: total tid fra request → ferdig. Cycle time: tid fra arbeid STARTER → ferdig. Kortere lead time = bedre responstid for kunden.",
    difficulty: "medium",
    pensumRef: "Kanban metrics",
  },
  {
    id: "gen-kanban-8",
    topic: "kanban",
    source: "generated",
    question:
      "Hvilken roller er PÅKREVD i Kanban?",
    options: [
      "Product Owner, Scrum Master, Development Team",
      "Kanban Master og Flow Manager",
      "Ingen forhåndsdefinerte roller — Kanban legges over eksisterende organisasjon",
      "Project Manager og QA Lead",
    ],
    correctIndex: 2,
    explanation:
      "Kanban har INGEN påkrevde roller. Det er en metode for å forbedre eksisterende arbeidsflyt — ingen omorganisering kreves. Dette skiller det skarpt fra Scrum.",
    difficulty: "medium",
    pensumRef: "Kanban-roller",
  },
  {
    id: "gen-kanban-9",
    topic: "kanban",
    source: "generated",
    question:
      "Hva betyr 'visualize the workflow' som Kanban-prinsipp?",
    options: [
      "Lag en pen presentasjon av prosessen",
      "Synliggjør alt arbeid og dets tilstand på en tavle alle kan se",
      "Bruk Powerpoint i alle møter",
      "Lag UML-diagrammer av systemet",
    ],
    correctIndex: 1,
    explanation:
      "Et grunnprinsipp i Kanban: alt arbeid SYNLIG på en (fysisk eller digital) tavle. Da kan teamet se hvor flaskehalser oppstår, hvor mye som er på gang, og hva neste skal være.",
    difficulty: "easy",
    pensumRef: "Kanban-prinsipper",
  },
  {
    id: "gen-kanban-10",
    topic: "kanban",
    source: "generated",
    question:
      "I Kanban — hva skjer hvis WIP-limit i 'Test'-kolonnen er nådd og en utvikler vil flytte en oppgave dit?",
    options: [
      "WIP-limit ignoreres siden det haster",
      "Utvikleren må vente — eller hjelpe testere så de blir ferdig (frigjør plass)",
      "Oppgaven kastes",
      "Limit økes automatisk",
    ],
    correctIndex: 1,
    explanation:
      "Kjernen i Kanban: WIP-limit må respekteres. Hvis 'Test' er full, må utvikleren enten finne annet arbeid ELLER hjelpe testkolonnen videre (cross-team kollaborasjon). Slik avsløres og løses flaskehalsen.",
    difficulty: "medium",
    pensumRef: "WIP-limit i praksis",
  },

  // ════════════════════════════════════════════════════════════════
  // ARKITEKTUR — 10 spørsmål (Pensum: Sommerville kap 4)
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-arkitektur-1",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hvilken kvalitetsattributt handler om hvor raskt et system svarer på brukerinput?",
    options: [
      "Reliability",
      "Responsiveness",
      "Maintainability",
      "Security",
    ],
    correctIndex: 1,
    explanation:
      "Responsiveness = systemets responstid på brukerinteraksjon. Reliability = pålitelighet (gir riktig svar). Availability = oppetid. Maintainability = lett å vedlikeholde.",
    difficulty: "easy",
    pensumRef: "Sommerville kap 4 - quality attributes",
  },
  {
    id: "gen-arkitektur-2",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva er en typisk trade-off mellom security og responsiveness?",
    options: [
      "Det er ingen trade-off",
      "Mer sikkerhet (kryptering, autentisering) gir typisk lavere responsiveness pga overhead",
      "Mer sikkerhet gir høyere responsiveness",
      "Begge krever samme ressurser",
    ],
    correctIndex: 1,
    explanation:
      "Trade-offs er kjernen i arkitekturbeslutninger. Kryptering, autentiseringssjekk og logging tar tid og ressurser → tregere responstid. Arkitekt må balansere kvalitetsattributter mot hverandre.",
    difficulty: "medium",
    pensumRef: "Sommerville kap 4 - trade-offs",
  },
  {
    id: "gen-arkitektur-3",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva er hovedmønsteret i en lagdelt arkitektur (layered architecture)?",
    options: [
      "Hver lag kommuniserer kun med laget rett under (eller rett over)",
      "Alle lag kommuniserer fritt med alle andre",
      "Det er bare ett lag",
      "Lag er separate fysiske maskiner",
    ],
    correctIndex: 0,
    explanation:
      "Lagdelt arkitektur: f.eks. Presentation → Business Logic → Data Access → Database. Hvert lag avhenger bare av laget under. Gir lav kobling og høy gjenbruk, men kan gi ytelseskostnad.",
    difficulty: "easy",
    pensumRef: "Sommerville kap 4 - layered",
  },
  {
    id: "gen-arkitektur-4",
    topic: "arkitektur",
    source: "generated",
    question:
      "I MVC-arkitektur, hva er Controller sin rolle?",
    options: [
      "Lagre data",
      "Vise data til brukeren",
      "Motta brukerinput og koordinere mellom Model og View",
      "Inneholde forretningslogikk",
    ],
    correctIndex: 2,
    explanation:
      "Controller mottar brukerhandlinger (klikk, input), oppdaterer Model basert på dem, og oppdaterer View. Model = data + forretningslogikk. View = visning. Controller = limen.",
    difficulty: "medium",
    pensumRef: "MVC",
  },
  {
    id: "gen-arkitektur-5",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva karakteriserer en mikroservice-arkitektur?",
    options: [
      "Én stor monolittisk applikasjon",
      "Mange små, uavhengige tjenester som kommuniserer via nettverk (typisk HTTP/REST)",
      "All kode i én klasse",
      "Bare brukbar i hardware-systemer",
    ],
    correctIndex: 1,
    explanation:
      "Mikrotjenester: liten, fokusert tjeneste med eget data-eierskap, deployable uavhengig. Mange tjenester samarbeider over nett. Trade-off: mer kompleks distribusjon, lavere kobling.",
    difficulty: "medium",
    pensumRef: "Sommerville kap 4 - microservices",
  },
  {
    id: "gen-arkitektur-6",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva er en typisk ulempe med multi-tier (flerlags-distribuert) arkitektur?",
    options: [
      "Kan ikke skalere",
      "Mer kompleksitet og potensielle ytelsesproblemer pga nettverkskall mellom lag",
      "Krever bare én server",
      "Kan ikke bruke databaser",
    ],
    correctIndex: 1,
    explanation:
      "Multi-tier (f.eks. klient + applikasjonsserver + databaseserver) gir skalerbarhet og separasjon, MEN nettverkskall mellom lag gir latency, kompleksitet i feilhåndtering og deploy.",
    difficulty: "medium",
    pensumRef: "Sommerville kap 4 - multi-tier",
  },
  {
    id: "gen-arkitektur-7",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva er en typisk fordel med NoSQL fremfor SQL?",
    options: [
      "Strengere skjemavalidering",
      "Bedre transaksjonsgarantier",
      "Fleksibelt skjema og bedre horisontal skalerbarhet",
      "Bedre standardisering",
    ],
    correctIndex: 2,
    explanation:
      "NoSQL (dokument, key-value, graf) tillater fleksibelt skjema (greit for endringer over tid) og er typisk lettere å skalere horisontalt (legge til flere noder). SQL har sterkere konsistens og strengere skjema.",
    difficulty: "medium",
    pensumRef: "SQL vs NoSQL",
  },
  {
    id: "gen-arkitektur-8",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva er en sentral fordel med cloud over on-premise?",
    options: [
      "Lavere total kompleksitet",
      "Skalerbarhet på etterspørsel og pay-as-you-go-pris",
      "Alltid raskere ytelse",
      "Bedre datakontroll",
    ],
    correctIndex: 1,
    explanation:
      "Cloud: skalere opp/ned basert på behov, betal kun for det du bruker, mindre forhåndsinvestering. On-premise gir mer kontroll og kan være billigere ved konstant, høy belastning.",
    difficulty: "easy",
    pensumRef: "Cloud vs on-premise",
  },
  {
    id: "gen-arkitektur-9",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hva er en typisk client-server-arkitektur?",
    options: [
      "To uavhengige programmer som ikke kommuniserer",
      "En klient sender forespørsler til en server som behandler og returnerer svar",
      "Bare én maskin",
      "Server uten klienter",
    ],
    correctIndex: 1,
    explanation:
      "Client-server: forespørsel/respons-modell. Klient (browser, mobil-app) sender request → server prosesserer → returnerer respons. Grunnstrukturen for det meste av web og mobil i dag.",
    difficulty: "easy",
    pensumRef: "Sommerville kap 4 - client-server",
  },
  {
    id: "gen-arkitektur-10",
    topic: "arkitektur",
    source: "generated",
    question:
      "Hvilken kvalitetsattributt handler om hvor enkelt det er å endre eller legge til funksjonalitet?",
    options: [
      "Maintainability",
      "Reliability",
      "Security",
      "Usability",
    ],
    correctIndex: 0,
    explanation:
      "Maintainability = vedlikeholdbarhet. Påvirkes av kobling, samhørighet, kvalitet på tester, dokumentasjon. Usability = brukervennlighet. Reliability = at systemet gir riktige resultater.",
    difficulty: "easy",
    pensumRef: "Sommerville kap 4 - maintainability",
  },

  // ════════════════════════════════════════════════════════════════
  // OOP-JAVA — 10 spørsmål
  // ════════════════════════════════════════════════════════════════
  {
    id: "gen-oop-java-1",
    topic: "oop-java",
    source: "generated",
    question:
      "Et UML-klassediagram viser Bestilling 1 — 1..* Bestillingslinje. Hvordan implementeres dette typisk i Java?",
    options: [
      "Bestilling har én Bestillingslinje-attributt",
      "Bestilling har en `List<Bestillingslinje>` som er ikke-tom",
      "Bestilling arver fra Bestillingslinje",
      "Det implementeres som to uavhengige klasser uten referanse",
    ],
    correctIndex: 1,
    explanation:
      "1..* multiplisitet = en samling med minst ett element. Typisk `private List<Bestillingslinje> linjer = new ArrayList<>()` med en sjekk i konstruktør/add-metode for at den ikke kan være tom.",
    difficulty: "medium",
    pensumRef: "UML→Java multiplisitet",
  },
  {
    id: "gen-oop-java-2",
    topic: "oop-java",
    source: "generated",
    question:
      "Hva betyr en abstrakt klasse i Java?",
    options: [
      "En klasse som ikke har noen metoder",
      "En klasse som ikke kan instansieres direkte og kan ha abstrakte (ikke-implementerte) metoder",
      "En klasse som ikke kan arves fra",
      "En klasse uten attributter",
    ],
    correctIndex: 1,
    explanation:
      "Abstract: kan ikke lages direkte med `new`. Kan inneholde både implementerte og abstrakte metoder. Subklasser MÅ implementere alle abstrakte metoder (eller være abstract selv).",
    difficulty: "easy",
    pensumRef: "Java abstrakt klasse",
  },
  {
    id: "gen-oop-java-3",
    topic: "oop-java",
    source: "generated",
    question:
      "Hva er forskjellen mellom et interface og en abstrakt klasse i Java?",
    options: [
      "Interfaces kan ha implementasjoner, abstrakte klasser kan ikke",
      "Abstrakte klasser kan ha tilstand (felt) og konstruktør, interfaces kan ikke (bortsett fra konstanter og default-metoder)",
      "Det er ingen forskjell",
      "Interfaces krever multiarv, abstrakte klasser ikke",
    ],
    correctIndex: 1,
    explanation:
      "Abstract class: kan ha instansvariabler, konstruktører, hvilken som helst tilgangsmodifikator. Interface: ingen tilstand (kun konstanter), ingen konstruktør, alle metoder er public. Java tillater multi-implements men ikke multi-extends.",
    difficulty: "medium",
    pensumRef: "Interface vs abstract Java",
  },
  {
    id: "gen-oop-java-4",
    topic: "oop-java",
    source: "generated",
    question:
      "Hvorfor må man overstyre BÅDE equals() og hashCode() når man overstyrer en av dem?",
    options: [
      "Det er tilfeldig konvensjon",
      "Java krever det syntaktisk",
      "Kontrakten sier: hvis a.equals(b), så MÅ a.hashCode() == b.hashCode() — ellers svikter HashMap/HashSet",
      "For å øke ytelsen",
    ],
    correctIndex: 2,
    explanation:
      "HashMap/HashSet bruker hashCode() for å finne 'bøtte', deretter equals() for å sammenligne. Hvis kontrakten brytes, kan to 'like' objekter havne i forskjellige bøtter — set inneholder duplikater, map mister oppslag.",
    difficulty: "hard",
    pensumRef: "Java equals/hashCode",
  },
  {
    id: "gen-oop-java-5",
    topic: "oop-java",
    source: "generated",
    question:
      "Hva er en enum i Java best egnet for?",
    options: [
      "Variable som endrer seg ofte",
      "Et fast sett med konstante verdier som er semantisk relaterte (f.eks. ukedager, ordrestatus)",
      "Generiske typeparametere",
      "Annotasjoner",
    ],
    correctIndex: 1,
    explanation:
      "Enum gir typesikkerhet for et fast, kjent sett med verdier. F.eks. `enum Status { OPPRETTET, BEKREFTET, SENDT, LEVERT }` — kompilator fanger feilskriving og du kan switche på verdien.",
    difficulty: "easy",
    pensumRef: "Java enum",
  },
  {
    id: "gen-oop-java-6",
    topic: "oop-java",
    source: "generated",
    question:
      "Du ser et sekvensdiagram der `Bestilling.beregnTotal()` kaller `Linje.beregnPris()` for hver linje. Hvordan implementeres dette i Java?",
    options: [
      "En for-løkke i beregnTotal() som iterer over linjene og summerer linje.beregnPris()",
      "En statisk metode i Linje",
      "En global variabel som lagrer totalen",
      "En rekursiv metode i Bestilling",
    ],
    correctIndex: 0,
    explanation:
      "Sekvensdiagrammet viser delegering: Bestilling spør hver Linje. Implementasjon: `for (Linje l : linjer) total += l.beregnPris();`. Dette følger Information Expert (Linje vet sin pris).",
    difficulty: "medium",
    pensumRef: "Sekvens→Java",
  },
  {
    id: "gen-oop-java-7",
    topic: "oop-java",
    source: "generated",
    question:
      "Hva betyr UML-multiplisitet 1:1 mellom Person og Pass i Java-kode?",
    options: [
      "Person har en `List<Pass>` med ett element",
      "Person har en `Pass`-attributt (referanse til ett objekt)",
      "Person og Pass er samme klasse",
      "Person arver fra Pass",
    ],
    correctIndex: 1,
    explanation:
      "1:1 = én Person har nøyaktig ett Pass. Implementeres som direkte referanse: `private Pass pass`. Hvis det skulle være 1:0..1 (valgfri), ville det være samme felt med mulighet for null.",
    difficulty: "easy",
    pensumRef: "UML→Java 1:1",
  },
  {
    id: "gen-oop-java-8",
    topic: "oop-java",
    source: "generated",
    question:
      "Hva er en typisk fallgruve med å bruke arv i Java?",
    options: [
      "Arv tar mye minne",
      "Tett kobling mellom subklasse og superklasse — endring i superklassen kan bryte subklassen ('fragile base class')",
      "Java tillater ikke arv",
      "Subklasser må ha samme navn som superklassen",
    ],
    correctIndex: 1,
    explanation:
      "'Fragile base class problem': subklasser avhenger av superklassens implementasjon. Endring i superklassen kan utilsiktet bryte subklasser. Derfor: foretrekk komposisjon, eller design eksplisitt for arv.",
    difficulty: "hard",
    pensumRef: "Java arv-fallgruver",
  },
  {
    id: "gen-oop-java-9",
    topic: "oop-java",
    source: "generated",
    question:
      "Hvilket modifikatorsynlighet i Java tilsvarer UML-symbolet `#`?",
    options: [
      "public",
      "private",
      "protected",
      "package-private (default)",
    ],
    correctIndex: 2,
    explanation:
      "UML: + = public, - = private, # = protected, ~ = package. Protected = synlig for klassen selv, subklasser, og samme pakke.",
    difficulty: "easy",
    pensumRef: "UML→Java synligheter",
  },
  {
    id: "gen-oop-java-10",
    topic: "oop-java",
    source: "generated",
    question:
      "Hvorfor er det god praksis å gjøre felt private og bruke getters/setters i Java?",
    options: [
      "Det går raskere",
      "Innkapsling: skjul intern representasjon, kontroll over endring (validering, sideeffekter), enklere å endre senere",
      "Java krever det",
      "Det er bare for testing",
    ],
    correctIndex: 1,
    explanation:
      "Innkapsling: private felt + public metoder gir kontroll. Kan validere input i setter, beregne i getter, eller bytte intern representasjon uten å endre klienter. Følger SOLID/GRASP.",
    difficulty: "easy",
    pensumRef: "Java innkapsling",
  },
];
