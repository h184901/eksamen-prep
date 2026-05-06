/**
 * Matching-sett for DAT109. Drag/klikk for å koble begreper til definisjoner.
 *
 * Mål: ~12 sett (et per tema), hver med 5-10 par.
 */

import type { MatchingSet } from "@/lib/quiz-types";

export const MATCHING_SETS: MatchingSet[] = [
  // 1. SOLID-prinsippene
  {
    id: "match-solid",
    topic: "solid",
    title: "SOLID-prinsippene",
    description: "Koble hvert SOLID-prinsipp til riktig definisjon.",
    pairs: [
      {
        id: "match-solid-s",
        left: "Single Responsibility (S)",
        right: "En klasse skal ha kun én grunn til å endre seg",
        whyMatch: "SRP handler om at én klasse skal ha ett ansvarsområde — én aktør som kan kreve endring.",
      },
      {
        id: "match-solid-o",
        left: "Open/Closed (O)",
        right: "Åpen for utvidelse, lukket for endring",
        whyMatch: "Du legger til ny oppførsel via nye klasser/subtyper uten å endre eksisterende, testet kode.",
      },
      {
        id: "match-solid-l",
        left: "Liskov Substitution (L)",
        right: "Subtyper må kunne erstatte sin supertype uten at programmet feiler",
        whyMatch: "Subklassen må respektere supertypens kontrakt — ingen sterkere preconditions eller svakere postconditions.",
      },
      {
        id: "match-solid-i",
        left: "Interface Segregation (I)",
        right: "Klienter skal ikke tvinges til å avhenge av metoder de ikke bruker",
        whyMatch: "Bedre med flere små, fokuserte grensesnitt enn ett stort 'fat interface'.",
      },
      {
        id: "match-solid-d",
        left: "Dependency Inversion (D)",
        right: "Avheng av abstraksjoner, ikke konkrete klasser",
        whyMatch: "Høynivå-moduler og lavnivå-moduler skal begge avhenge av et grensesnitt mellom seg.",
      },
    ],
  },

  // 2. GRASP-mønstrene
  {
    id: "match-grasp",
    topic: "grasp",
    title: "GRASP-mønstrene",
    description: "Koble hvert GRASP-mønster til riktig definisjon eller bruksområde.",
    pairs: [
      {
        id: "match-grasp-expert",
        left: "Information Expert",
        right: "Tildel ansvar til klassen som har informasjonen som trengs for å utføre det",
        whyMatch: "Den som har dataene er best egnet til å gjøre jobben — minimerer datatrafikk.",
      },
      {
        id: "match-grasp-creator",
        left: "Creator",
        right: "B oppretter A hvis B inneholder, bruker eller har dataene for å initialisere A",
        whyMatch: "Skaper-ansvar bør ligge nær der det opprettede objektet brukes eller eies.",
      },
      {
        id: "match-grasp-controller",
        left: "Controller",
        right: "Førstemottaker av systemhendelser fra UI — delegerer videre til domeneobjekter",
        whyMatch: "Kontrolleren skiller presentasjonslag fra domenelag og holder UI-logikk ute av domenet.",
      },
      {
        id: "match-grasp-low-coupling",
        left: "Low Coupling",
        right: "Reduser avhengigheter mellom klasser slik at endringer ikke forplanter seg",
        whyMatch: "Færre koblinger gir mer gjenbrukbar og endringsvennlig kode.",
      },
      {
        id: "match-grasp-high-cohesion",
        left: "High Cohesion",
        right: "Hold relaterte ansvar samlet i én klasse — én tydelig oppgave",
        whyMatch: "Samhørig kode er lettere å forstå, vedlikeholde og gjenbruke.",
      },
      {
        id: "match-grasp-polymorphism",
        left: "Polymorphism",
        right: "Bruk polymorfi når oppførsel varierer på typen — ikke if/else på type",
        whyMatch: "Erstatter typebaserte forgreninger med dynamisk dispatch på subtyper.",
      },
      {
        id: "match-grasp-pure-fabrication",
        left: "Pure Fabrication",
        right: "Lag en kunstig klasse uten domenemotpart for å bevare lav kobling og høy samhørighet",
        whyMatch: "Eksempel: en DAO/repository — finnes ikke i domenet, men løser et teknisk ansvar rent.",
      },
      {
        id: "match-grasp-indirection",
        left: "Indirection",
        right: "Sett inn en mellomklasse for å unngå direkte kobling mellom to komponenter",
        whyMatch: "Adapter, proxy og fasade er klassiske eksempler — frikobler partene.",
      },
      {
        id: "match-grasp-protected-variations",
        left: "Protected Variations",
        right: "Skjerm stabile deler fra ustabile ved å definere et stabilt grensesnitt mot variasjonspunktet",
        whyMatch: "Identifiser hva som vil endre seg, og legg en abstraksjon foran det.",
      },
    ],
  },

  // 3. De 7 OO-egenskapene (Booch)
  {
    id: "match-booch",
    topic: "oop-fundamenter",
    title: "De 7 OO-egenskapene (Booch)",
    description: "Koble hver Booch-egenskap til riktig forklaring.",
    pairs: [
      {
        id: "match-booch-abstraksjon",
        left: "Abstraksjon",
        right: "Trekk ut det vesentlige ved et fenomen og ignorer detaljer som ikke er relevante",
        whyMatch: "Bygger en forenklet, formålstjenlig modell av virkeligheten.",
      },
      {
        id: "match-booch-innkapsling",
        left: "Innkapsling",
        right: "Skjul intern tilstand bak et grensesnitt slik at den bare endres via egne metoder",
        whyMatch: "Beskytter invarianter ved å gjøre felter private og eksponere kontrollert API.",
      },
      {
        id: "match-booch-modularitet",
        left: "Modularitet",
        right: "Del systemet i selvstendige moduler med tydelige grenser og oppgaver",
        whyMatch: "Hver modul kan utvikles, testes og forstås for seg selv.",
      },
      {
        id: "match-booch-hierarki",
        left: "Hierarki",
        right: "Organiser klasser i over- og underklasser via spesialisering eller inneholderforhold",
        whyMatch: "Generelle begreper toppes, spesialiserte subtyper arver og presiserer.",
      },
      {
        id: "match-booch-typing",
        left: "Typing",
        right: "Håndhev at objekter brukes i samsvar med sin type — fanger feil på kompileringstid",
        whyMatch: "Sterkt typede språk hindrer at man sender feil objekt inn et sted.",
      },
      {
        id: "match-booch-samtidighet",
        left: "Samtidighet",
        right: "Aktive objekter med egen tråd som kan utføre handlinger parallelt",
        whyMatch: "Et aktivt objekt har egen kontrollflyt — i motsetning til passive objekter.",
      },
      {
        id: "match-booch-persistens",
        left: "Persistens",
        right: "Objekter som overlever programmet sin levetid ved å lagres til varig medium",
        whyMatch: "Lagring i fil eller database lar objekttilstand bestå mellom kjøringer.",
      },
    ],
  },

  // 4. UML-diagram til formål
  {
    id: "match-uml",
    topic: "uml",
    title: "UML-diagram til formål",
    description: "Koble hvert UML-diagram til hva det først og fremst viser.",
    pairs: [
      {
        id: "match-uml-klasse",
        left: "Klassediagram",
        right: "Statisk struktur: klasser, attributter, operasjoner og relasjoner mellom dem",
        whyMatch: "Klassediagrammet er domenets/designets statiske skjelett.",
      },
      {
        id: "match-uml-sekvens",
        left: "Sekvensdiagram",
        right: "Meldingsutveksling mellom objekter i tidsrekkefølge for ett scenario",
        whyMatch: "Tidsaksen går nedover, livslinjer viser objekters levetid og kall.",
      },
      {
        id: "match-uml-brukstilfelle",
        left: "Brukstilfellediagram",
        right: "Aktører og hvilke tjenester (use case) systemet tilbyr dem — på et høyt nivå",
        whyMatch: "Viser hvem som bruker systemet og hva de oppnår, ikke flyt.",
      },
      {
        id: "match-uml-aktivitet",
        left: "Aktivitetsdiagram",
        right: "Arbeidsflyt og forgreninger gjennom en prosess — gjerne på tvers av aktører",
        whyMatch: "Liknende et flytdiagram, med swimlanes og parallelle aktiviteter.",
      },
      {
        id: "match-uml-tilstand",
        left: "Tilstandsdiagram",
        right: "Hvilke tilstander ett objekt kan være i og hvilke hendelser som utløser overganger",
        whyMatch: "Modellerer livssyklusen til ett enkelt objekt.",
      },
      {
        id: "match-uml-komponent",
        left: "Komponentdiagram",
        right: "Fysiske/logiske komponenter og grensesnittene de tilbyr og krever",
        whyMatch: "Viser deploybare enheter og hvordan de henger sammen via porter/interfaces.",
      },
    ],
  },

  // 5. Scrum-roller og artefakter
  {
    id: "match-scrum-roller",
    topic: "scrum",
    title: "Scrum-roller og artefakter",
    description: "Koble Scrum-rolle eller artefakt til riktig beskrivelse.",
    pairs: [
      {
        id: "match-scrum-po",
        left: "Product Owner",
        right: "Eier produktverdi og prioriterer Product Backlog — én person",
        whyMatch: "PO er den eneste som prioriterer hva teamet skal jobbe med.",
      },
      {
        id: "match-scrum-sm",
        left: "Scrum Master",
        right: "Tjenende leder som fjerner hindringer og sørger for at Scrum følges",
        whyMatch: "SM coacher teamet og PO, men bestemmer ikke innholdet i sprinten.",
      },
      {
        id: "match-scrum-team",
        left: "Utviklingsteamet",
        right: "Selvorganisert, tverrfaglig gruppe som leverer Inkrement hver sprint",
        whyMatch: "Teamet bestemmer selv hvordan arbeidet skal gjøres innenfor Sprint Goal.",
      },
      {
        id: "match-scrum-pb",
        left: "Product Backlog",
        right: "Prioritert, dynamisk liste over alt som kanskje skal gjøres med produktet",
        whyMatch: "Eies av PO og er aldri ferdig — endres etter hvert som man lærer.",
      },
      {
        id: "match-scrum-sb",
        left: "Sprint Backlog",
        right: "Utvalgte backlog-elementer pluss plan for hvordan teamet leverer dem i sprinten",
        whyMatch: "Eies av teamet og oppdateres daglig basert på fremdrift.",
      },
      {
        id: "match-scrum-inkrement",
        left: "Inkrement",
        right: "Summen av alle ferdigstilte backlog-elementer som oppfyller Definition of Done",
        whyMatch: "Skal være potensielt leverbart ved slutten av hver sprint.",
      },
      {
        id: "match-scrum-burndown",
        left: "Burndown-diagram",
        right: "Graf som viser gjenstående arbeid mot tid i sprinten",
        whyMatch: "Verktøy for å se om teamet er i rute mot Sprint Goal.",
      },
    ],
  },

  // 6. Scrum-seremonier
  {
    id: "match-scrum-seremonier",
    topic: "scrum",
    title: "Scrum-seremonier",
    description: "Koble hver seremoni til formålet.",
    pairs: [
      {
        id: "match-scrum-planning",
        left: "Sprint Planning",
        right: "Velg hva som skal leveres i sprinten og lag en plan for hvordan",
        whyMatch: "Resultatet er Sprint Goal og en Sprint Backlog som teamet forplikter seg til.",
      },
      {
        id: "match-scrum-daily",
        left: "Daily Scrum",
        right: "15-minutters daglig synking der teamet justerer planen mot Sprint Goal",
        whyMatch: "Ikke en statusrapport — handler om hvordan teamet kommer i mål i dag.",
      },
      {
        id: "match-scrum-review",
        left: "Sprint Review",
        right: "Vis frem inkrementet for interessenter og samle tilbakemelding på produktet",
        whyMatch: "Inspiserer produktet og oppdaterer Product Backlog deretter.",
      },
      {
        id: "match-scrum-retro",
        left: "Sprint Retrospective",
        right: "Teamet inspiserer egen prosess og finner forbedringspunkter til neste sprint",
        whyMatch: "Fokus på samarbeid, verktøy og praksis — ikke på produktet.",
      },
      {
        id: "match-scrum-refinement",
        left: "Backlog Refinement",
        right: "Detaljer, estimer og rangér backlog-elementer slik at de blir klare for fremtidig sprint",
        whyMatch: "Pågår løpende gjennom sprinten — typisk 10 % av tiden.",
      },
    ],
  },

  // 7. XP-praksiser
  {
    id: "match-xp",
    topic: "xp",
    title: "XP-praksiser",
    description: "Koble XP-praksis til riktig forklaring.",
    pairs: [
      {
        id: "match-xp-pair",
        left: "Parprogrammering",
        right: "To utviklere ved én tastatur — én skriver, én navigerer og reviewer kontinuerlig",
        whyMatch: "Gir levende kodegjennomgang, kunnskapsdeling og færre feil.",
      },
      {
        id: "match-xp-tdd",
        left: "Testdrevet utvikling",
        right: "Skriv en feilende test først, deretter minst mulig kode for å bestå den",
        whyMatch: "Tester driver designet og fungerer som regresjonsnett.",
      },
      {
        id: "match-xp-ci",
        left: "Kontinuerlig integrasjon",
        right: "Slå sammen kode til hovedgrenen flere ganger om dagen og kjør automatiske tester",
        whyMatch: "Holder integrasjonsproblemer små og fanger dem tidlig.",
      },
      {
        id: "match-xp-refactoring",
        left: "Refaktorering",
        right: "Forbedre kodens struktur uten å endre dens ytre oppførsel",
        whyMatch: "Holder designet rent etter hvert som funksjonaliteten vokser.",
      },
      {
        id: "match-xp-simple-design",
        left: "Enkelt design",
        right: "Det enkleste designet som virker akkurat nå — ingen spekulative abstraksjoner",
        whyMatch: "YAGNI-aktig: bygg for dagens krav, refaktorer når nye krav kommer.",
      },
      {
        id: "match-xp-collective",
        left: "Felles kodeeierskap",
        right: "Hvem som helst på teamet kan endre hvilken som helst del av koden",
        whyMatch: "Reduserer flaskehalser og knowledge silos.",
      },
      {
        id: "match-xp-onsite",
        left: "Kunde på laget",
        right: "En reell kunde er tilgjengelig for å avklare krav og prioritere fortløpende",
        whyMatch: "Korte svartider på spørsmål gir riktigere produkt.",
      },
      {
        id: "match-xp-small-releases",
        left: "Hyppige leveranser",
        right: "Slipp små, fungerende versjoner ofte til kunden i stedet for ett stort slipp",
        whyMatch: "Gir tidlig verdi og raskere læring fra ekte bruk.",
      },
    ],
  },

  // 8. TDD og testdoubles
  {
    id: "match-tdd",
    topic: "tdd",
    title: "TDD-syklus og testdoubles",
    description: "Koble TDD-fase eller testdouble til riktig beskrivelse.",
    pairs: [
      {
        id: "match-tdd-red",
        left: "Red",
        right: "Skriv en automatisk test for ny oppførsel — testen skal feile først",
        whyMatch: "En feilende test bekrefter at vi faktisk tester det vi tror.",
      },
      {
        id: "match-tdd-green",
        left: "Green",
        right: "Skriv minst mulig produksjonskode som får testen til å bestå",
        whyMatch: "Får oss raskt til arbeidende kode — vi optimerer ikke ennå.",
      },
      {
        id: "match-tdd-refactor",
        left: "Refactor",
        right: "Rydd opp i koden uten å endre oppførsel mens alle tester fortsatt er grønne",
        whyMatch: "Designet forbedres gradvis under nettet av tester.",
      },
      {
        id: "match-tdd-dummy",
        left: "Dummy",
        right: "Objekt som sendes inn kun for å fylle en parameterliste — brukes aldri",
        whyMatch: "Ingen oppførsel; eksisterer bare for at signaturen skal stemme.",
      },
      {
        id: "match-tdd-stub",
        left: "Stub",
        right: "Returnerer hardkodede svar på kall — gir testen kontrollert input",
        whyMatch: "Mater systemet under test med forutsigbare verdier.",
      },
      {
        id: "match-tdd-mock",
        left: "Mock",
        right: "Objekt med forhåndsprogrammerte forventninger om hvilke kall som skal skje",
        whyMatch: "Verifiserer interaksjon — at riktig metode ble kalt med riktige argumenter.",
      },
    ],
  },

  // 9. CI/CD-konsepter
  {
    id: "match-cicd",
    topic: "ci-cd-devops",
    title: "CI/CD og DevOps",
    description: "Koble begrep til riktig definisjon.",
    pairs: [
      {
        id: "match-cicd-ci",
        left: "Continuous Integration",
        right: "Hyppig sammenslåing til hovedgren med automatisk bygg og testkjøring",
        whyMatch: "Fanger integrasjonsfeil tidlig — ingen 'merge hell' på fredag.",
      },
      {
        id: "match-cicd-cd-delivery",
        left: "Continuous Delivery",
        right: "Hver bestått build er klar for produksjon — utrulling skjer manuelt på knappetrykk",
        whyMatch: "Teknisk klar når som helst, men forretningen velger når.",
      },
      {
        id: "match-cicd-cd-deploy",
        left: "Continuous Deployment",
        right: "Hver bestått build rulles automatisk ut til produksjon uten manuell godkjenning",
        whyMatch: "Krever sterk testdekning og rask rollback-mekanisme.",
      },
      {
        id: "match-cicd-iac",
        left: "Infrastructure as Code",
        right: "Definer servere, nettverk og miljø som versjonskontrollert kode",
        whyMatch: "Reproduserbare miljøer — verktøy som Terraform eller Ansible.",
      },
      {
        id: "match-cicd-devops",
        left: "DevOps",
        right: "Kultur og praksis som visker ut skillet mellom utvikling og drift",
        whyMatch: "Felles ansvar for hele livssyklusen, ikke bare 'kast over gjerdet'.",
      },
      {
        id: "match-cicd-pipeline",
        left: "Pipeline",
        right: "Automatisert kjede av steg fra commit via bygg og test til utrulling",
        whyMatch: "Hvert steg er en port koden må passere før den når neste miljø.",
      },
    ],
  },

  // 10. AUP-faser
  {
    id: "match-aup",
    topic: "aup",
    title: "AUP-faser og deres mål",
    description: "Koble hver AUP-fase til hovedmålet for fasen.",
    pairs: [
      {
        id: "match-aup-inception",
        left: "Inception",
        right: "Etablér prosjektets forretningsverdi, omfang og overordnede risiko",
        whyMatch: "Avgjør om prosjektet i det hele tatt skal gjennomføres — vision og scope.",
      },
      {
        id: "match-aup-elaboration",
        left: "Elaboration",
        right: "Etablér en eksekverbar arkitektur og adresser de største risikoene",
        whyMatch: "Resultatet er en arkitekturskisse som beviser at de kritiske valgene holder.",
      },
      {
        id: "match-aup-construction",
        left: "Construction",
        right: "Bygg det meste av funksjonaliteten i iterasjoner — produktet vokser frem",
        whyMatch: "Hovedfasen tidsmessig — tyngden av kode skrives her.",
      },
      {
        id: "match-aup-transition",
        left: "Transition",
        right: "Overlever systemet til sluttbrukerne — beta, opplæring, feilretting og driftsetting",
        whyMatch: "Fokus på utrulling og finpuss, ikke ny funksjonalitet.",
      },
    ],
  },

  // 11. Quality attributes (arkitektur — Sommerville)
  {
    id: "match-quality-attributes",
    topic: "arkitektur",
    title: "Kvalitetsegenskaper (quality attributes)",
    description: "Koble hver kvalitetsegenskap til en god arbeidsdefinisjon.",
    pairs: [
      {
        id: "match-qa-responsiveness",
        left: "Responsiveness",
        right: "Hvor raskt systemet svarer på en forespørsel fra brukeren",
        whyMatch: "Måles typisk i svartid eller latens for typiske operasjoner.",
      },
      {
        id: "match-qa-reliability",
        left: "Reliability",
        right: "Sannsynligheten for at systemet leverer korrekt resultat over tid uten feil",
        whyMatch: "Handler om at systemet gjør det riktige — ikke bare at det er oppe.",
      },
      {
        id: "match-qa-availability",
        left: "Availability",
        right: "Andelen tid systemet er tilgjengelig for bruk når brukerne trenger det",
        whyMatch: "Måles ofte i prosent oppetid eller 'antall niere'.",
      },
      {
        id: "match-qa-security",
        left: "Security",
        right: "Systemets evne til å motstå ondsinnede angrep og beskytte data",
        whyMatch: "Inkluderer konfidensialitet, integritet og tilgjengelighet av data.",
      },
      {
        id: "match-qa-usability",
        left: "Usability",
        right: "Hvor lett det er for målgruppen å lære og bruke systemet effektivt",
        whyMatch: "Måles via læringstid, feilrate og brukertilfredshet.",
      },
      {
        id: "match-qa-maintainability",
        left: "Maintainability",
        right: "Hvor lett det er å rette feil og legge til ny funksjonalitet senere",
        whyMatch: "Påvirkes sterkt av modularitet, kobling, samhørighet og tester.",
      },
      {
        id: "match-qa-resilience",
        left: "Resilience",
        right: "Systemets evne til å fortsette å levere tjenester selv når noe feiler",
        whyMatch: "Tåler feil og angrep — degraderer gradvis i stedet for å kollapse.",
      },
    ],
  },

  // 12. Java fra UML
  {
    id: "match-java-uml",
    topic: "oop-java",
    title: "Java fra UML — notasjon",
    description: "Koble UML-notasjon til riktig Java-konstruksjon.",
    pairs: [
      {
        id: "match-java-public",
        left: "+ foran et medlem",
        right: "public — synlig fra alle klasser",
        whyMatch: "Plusstegnet er UML-notasjon for offentlig synlighet.",
      },
      {
        id: "match-java-private",
        left: "- foran et medlem",
        right: "private — kun synlig inne i klassen selv",
        whyMatch: "Minustegnet markerer det mest restriktive synlighetsnivået i UML.",
      },
      {
        id: "match-java-protected",
        left: "# foran et medlem",
        right: "protected — synlig for klassen, subklasser og samme pakke",
        whyMatch: "Firkanttegnet er UML-konvensjonen for beskyttet synlighet.",
      },
      {
        id: "match-java-interface",
        left: "<<interface>> over klassenavnet",
        right: "Java-interface — definerer bare signaturer som implementerende klasser må følge",
        whyMatch: "Stereotype <<interface>> markerer at det er et grensesnitt, ikke en klasse.",
      },
      {
        id: "match-java-abstract",
        left: "Klassenavn skrevet i kursiv",
        right: "abstract class — kan ikke instansieres direkte; arvinger fyller inn",
        whyMatch: "Kursiv navn (eller {abstract}) er UMLs måte å vise at klassen er abstrakt.",
      },
      {
        id: "match-java-multiplicity",
        left: "Multiplisitet 1..* mot annen klasse",
        right: "Felt typet som List<Klasse> i Java",
        whyMatch: "Mange-siden av en assosiasjon implementeres som en samling — typisk List eller Set.",
      },
    ],
  },
];
