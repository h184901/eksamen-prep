export type DAT107AreaSlug =
  | "sql"
  | "modellering"
  | "jpa"
  | "nosql"
  | "obliger"
  | "eksamen-gjengangere"
  | "originale-eksamen";

export type DAT107AreaKind = "teori" | "praksis" | "eksamen-bearbeidet" | "eksamen-original";

export interface DAT107Topic {
  slug: string;
  title: string;
  description: string;
  file: string;
}

export interface DAT107AreaIntroSection {
  title: string;
  body: string;
  accent?: "purple" | "sky" | "emerald" | "amber" | "fuchsia";
}

export interface DAT107AreaPhase {
  title: string;
  description?: string;
  topicSlugs: string[];
}

export type DAT107Accent = "purple" | "amber" | "red";

export interface DAT107Area {
  slug: DAT107AreaSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  kind: DAT107AreaKind;
  icon: string;
  weight?: string;
  mustKnow?: string[];
  examFocus?: string[];
  intro?: DAT107AreaIntroSection[];
  phases?: DAT107AreaPhase[];
  accent?: DAT107Accent;
  trackLabel?: string;
  topics: DAT107Topic[];
}

export const dat107Areas: DAT107Area[] = [
  {
    slug: "sql",
    title: "SQL",
    shortTitle: "SQL",
    description:
      "Spørringer, tabeller, joins, views, indekser og transaksjoner.",
    longDescription:
      "SQL-delen bygger den praktiske SQL-ferdigheten i DAT107. Her lærer du spørringer mot én og flere tabeller, opprettelse og endring av tabeller, joins og avanserte spørringer, filer og indekser samt transaksjoner med ACID. Modelleringsteorien ligger i egen hoveddel.",
    kind: "teori",
    icon: "database",
    weight: "~25%",
    mustKnow: [
      "Spørringsrekkefølge: select → from → where → group by → having → order by",
      "Join vs. left join, og når null dukker opp i resultatet",
      "Views, vindusfunksjoner og delspørringer",
      "Indekser: når de hjelper og når de ikke gjør det",
      "Transaksjoner og ACID, typiske samtidighetsproblemer",
    ],
    examFocus: [
      "Skrive korrekt spørring med join/group by/having fra tekstlig beskrivelse",
      "Forklare forskjellen på where og having og på join og left join",
      "Lese en enkel B+-tre-figur og si når en indeks hjelper",
      "Diskutere ACID og typiske samtidighetsproblemer i transaksjoner",
    ],
    intro: [
      {
        title: "Hvorfor SQL teller",
        body: "SQL er ferdighetsdelen av DAT107. Eksamen gir deg en tekstlig oppgave — du skal oversette den direkte til en spørring. Feil i rekkefølgen på select-delene eller i join-logikken er den klassiske karaktertyvende feilen.",
        accent: "purple",
      },
      {
        title: "Hvordan denne delen er bygget opp",
        body: "Først grunnmønsteret og mengdefunksjoner. Deretter hvordan du bygger opp og endrer tabeller. Så joins og avanserte konstruksjoner (null, case, views, vindusfunksjoner). Til slutt det som ligger under motoren: filer og indekser, og transaksjoner med ACID.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Gå gjennom Grunnleggende i rekkefølge — du må kunne skrive enkle spørringer i søvne. I Praktisk SQL trener du det som faktisk kommer på eksamen: joins og avanserte spørringer. Avslutt med sjekkliste og oppgaver, som er tett repetisjon før eksamensdagen.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Grunnleggende",
        description: "Grunnmønsteret og det du må kunne i søvne.",
        topicSlugs: ["introduksjon", "sporringer-en-tabell", "tabeller-dataendringer"],
      },
      {
        title: "Praktisk SQL",
        description: "Det som faktisk skiller god og middels besvarelse på eksamen.",
        topicSlugs: ["joins", "avanserte-sporringer", "filer-indekser", "transaksjoner"],
      },
      {
        title: "Repetisjon og trening",
        description: "Tett sjekkliste og oppgaver i eksamensstil.",
        topicSlugs: ["sjekkliste", "oppgaver"],
      },
    ],
    topics: [
      {
        slug: "introduksjon",
        title: "Introduksjon",
        description: "Hva SQL er og hvordan det henger sammen med modellering.",
        file: "introduksjon.md",
      },
      {
        slug: "sporringer-en-tabell",
        title: "Spørringer mot én tabell",
        description: "select, where, group by, having, order by og mengdefunksjoner.",
        file: "sporringer-en-tabell.md",
      },
      {
        slug: "tabeller-dataendringer",
        title: "Tabeller og dataendringer",
        description: "create table, datatyper, nøkler, insert, update, delete, alter.",
        file: "tabeller-dataendringer.md",
      },
      {
        slug: "joins",
        title: "Joins og flere tabeller",
        description: "join, left join, aliaser og flertabellssøk.",
        file: "joins.md",
      },
      {
        slug: "avanserte-sporringer",
        title: "Avanserte spørringer",
        description: "null, case, delspørringer, exists, views og vindusfunksjoner.",
        file: "avanserte-sporringer.md",
      },
      {
        slug: "filer-indekser",
        title: "Filer og indekser",
        description: "Blokker, B+-tre og når indekser hjelper.",
        file: "filer-indekser.md",
      },
      {
        slug: "transaksjoner",
        title: "Transaksjoner",
        description: "commit, rollback, ACID, låsing og samtidighetsproblemer.",
        file: "transaksjoner.md",
      },
      {
        slug: "sjekkliste",
        title: "Kortversjon og sjekkliste",
        description: "Tett repetisjonsark før eksamen.",
        file: "sjekkliste.md",
      },
      {
        slug: "oppgaver",
        title: "Øvingsoppgaver",
        description: "Praktiske oppgaver i eksamensstil.",
        file: "oppgaver.md",
      },
    ],
  },
  {
    slug: "modellering",
    title: "Modellering",
    shortTitle: "Modellering",
    description:
      "Relasjonsmodellen, ER-modellering, mapping til tabeller og normalisering til 3NF.",
    longDescription:
      "Modellering er egen hoveddel og teller rundt 25 % av eksamen. Her lærer du relasjonsmodellen som teori, ER-modellering fra tekst, mapping til tabeller med riktige nøkler, og normalisering til 1NF, 2NF og 3NF med funksjonelle avhengigheter.",
    kind: "teori",
    icon: "diagram",
    weight: "~25%",
    mustKnow: [
      "Skille relasjonsmodellen (teori) fra tabell-SQL (syntaks)",
      "Finne entiteter, attributter og relasjoner fra tekst",
      "Kardinalitet (1:1, 1:N, M:N) og svake entiteter",
      "Mappe ER til tabeller med riktige nøkler og fremmednøkler",
      "Vise 1NF, 2NF og 3NF med funksjonelle avhengigheter",
    ],
    examFocus: [
      "Tegne ER-diagram fra tekstlig beskrivelse med riktig kardinalitet",
      "Mappe ER til tabeller med korrekte primær- og fremmednøkler",
      "Argumentere for 3NF ved hjelp av funksjonelle avhengigheter",
      "Drøfte svake entiteter og sammensatte nøkler",
    ],
    intro: [
      {
        title: "Hvorfor modellering er egen del",
        body: "Modellering er ikke SQL-syntaks. Det er selve tenkemåten for hvordan data struktureres. Rundt 25 % av eksamen er ren modellering, og det er her sensor leter etter om du har forstått faget eller bare pugget spørringer.",
        accent: "purple",
      },
      {
        title: "Prosessen i tre steg",
        body: "Først relasjonsmodellen som teori (nøkler, funksjonelle avhengigheter). Så ER-modellen som visuelt verktøy fra tekst. Til slutt mapping til tabeller og normalisering til 3NF — dette er selve eksamensleveransen.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Start med introduksjon og relasjonsmodellen — teorien må sitte. Deretter ER-modellering og mapping, som er det du faktisk tegner og skriver på eksamen. Avslutt med sjekkliste og oppgaver for målrettet trening.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Teori",
        description: "Relasjonsmodellen og funksjonelle avhengigheter — grunnmuren.",
        topicSlugs: ["introduksjon", "relasjonsmodellen"],
      },
      {
        title: "Praktisk modellering",
        description: "Det du faktisk tegner og skriver på eksamen.",
        topicSlugs: ["er-modellering", "fra-modell-til-database"],
      },
      {
        title: "Repetisjon og trening",
        description: "Sjekkliste og oppgaver i eksamensstil.",
        topicSlugs: ["sjekkliste", "oppgaver"],
      },
    ],
    topics: [
      {
        slug: "introduksjon",
        title: "Introduksjon",
        description: "Hva modellering er og hvordan delen henger sammen med SQL og JPA.",
        file: "introduksjon.md",
      },
      {
        slug: "relasjonsmodellen",
        title: "Relasjonsmodellen",
        description: "Relasjon, attributt, kandidatnøkkel og funksjonelle avhengigheter.",
        file: "relasjonsmodellen.md",
      },
      {
        slug: "er-modellering",
        title: "ER-modellering",
        description: "Entiteter, relasjoner, kardinalitet og svake entiteter.",
        file: "er-modellering.md",
      },
      {
        slug: "fra-modell-til-database",
        title: "Fra modell til database",
        description: "Mapping av 1:N og M:N, og normalisering til 3NF.",
        file: "fra-modell-til-database.md",
      },
      {
        slug: "sjekkliste",
        title: "Kortversjon og sjekkliste",
        description: "Tett repetisjonsark for ER, mapping og 3NF.",
        file: "sjekkliste.md",
      },
      {
        slug: "oppgaver",
        title: "Øvingsoppgaver",
        description: "Modell- og normaliseringsoppgaver i eksamensstil.",
        file: "oppgaver.md",
      },
    ],
  },
  {
    slug: "jpa",
    title: "JPA",
    shortTitle: "JPA",
    description:
      "ORM med JPA: entiteter, CRUD, relasjoner, mange-til-mange og arv.",
    longDescription:
      "JPA-delen lærer deg å koble Java og relasjonsdatabase via ORM. Du går gjennom oppsett, EntityManager og CRUD, 1:N og 1:1-relasjoner, mange-til-mange med assosiasjonsentitet, cascade og orphanRemoval, og arvstrategier.",
    kind: "teori",
    icon: "code",
    weight: "~25%",
    mustKnow: [
      "ORM-tankegang: Java-klasse ↔ tabell, felt ↔ kolonne",
      "EntityManager-metodene: persist, find, merge, remove",
      "Owning side og mappedBy i 1:N og 1:1",
      "Mange-til-mange med assosiasjonsentitet",
      "Cascade og orphanRemoval, samt arvstrategier",
    ],
    examFocus: [
      "Skrive entitetsklasse fra tabellskisse med riktige annotasjoner",
      "Velge owning side og bruke mappedBy riktig i 1:N",
      "Lage assosiasjonsentitet for M:N med ekstra attributter",
      "Begrunne valg mellom JOINED, SINGLE_TABLE og TABLE_PER_CLASS",
    ],
    intro: [
      {
        title: "Hvorfor JPA står sentralt",
        body: "JPA er broen mellom Java-koden og relasjonsdatabasen. På eksamen får du typisk en tabellskisse eller klassediagram og skal skrive tilsvarende entitetsklasser med riktige annotasjoner. Du må forstå begge sider samtidig.",
        accent: "purple",
      },
      {
        title: "Hvordan delen er bygget opp",
        body: "Først grunnleggende oppsett og CRUD via EntityManager. Deretter relasjonene — 1:N, 1:1, og det vanskelige M:N med assosiasjonsentitet. Til slutt arvstrategier og mønstre fra forelesningsprosjektene.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Grunnleggende + CRUD må sitte før du går videre. Relasjoner er kjernen i eksamensoppgavene. Arv og subtyper er ofte begrunnelsesspørsmål. Sjekkliste og oppgaver til slutt.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Grunnleggende",
        description: "ORM-tankegang, entiteter og CRUD via EntityManager.",
        topicSlugs: ["grunnleggende", "crud-entitymanager"],
      },
      {
        title: "Relasjoner og avanserte mønstre",
        description: "Det eksamen oftest tester — relasjoner og arv.",
        topicSlugs: ["relasjoner", "mange-til-mange", "arv-og-subtyper", "praktiske-monstre"],
      },
      {
        title: "Repetisjon og trening",
        description: "Sjekkliste og oppgaver i eksamensstil.",
        topicSlugs: ["sjekkliste", "oppgaver"],
      },
    ],
    topics: [
      {
        slug: "grunnleggende",
        title: "Grunnleggende JPA",
        description: "ORM-tankegang, oppsett, @Entity, @Id og EntityManager.",
        file: "grunnleggende.md",
      },
      {
        slug: "crud-entitymanager",
        title: "CRUD og EntityManager",
        description: "persist, find, merge, remove, livssyklus og JPQL.",
        file: "crud-entitymanager.md",
      },
      {
        slug: "relasjoner",
        title: "Relasjoner 1:N og 1:1",
        description: "Owning side, mappedBy, lastestrategier og bidireksjonalitet.",
        file: "relasjoner.md",
      },
      {
        slug: "mange-til-mange",
        title: "Mange-til-mange og nøkler",
        description: "Ren @ManyToMany vs. assosiasjonsentitet, sammensatt vs. kunstig nøkkel.",
        file: "mange-til-mange.md",
      },
      {
        slug: "arv-og-subtyper",
        title: "Arv og subtyper",
        description: "cascade, orphanRemoval, JOINED, SINGLE_TABLE og TABLE_PER_CLASS.",
        file: "arv-og-subtyper.md",
      },
      {
        slug: "praktiske-monstre",
        title: "Øvinger og praktiske mønstre",
        description: "Hvilke eksempelprosjekter trener hva.",
        file: "praktiske-monstre.md",
      },
      {
        slug: "sjekkliste",
        title: "Kortversjon og sjekkliste",
        description: "Tett repetisjonsark for annotasjoner og relasjoner.",
        file: "sjekkliste.md",
      },
      {
        slug: "oppgaver",
        title: "Øvingsoppgaver",
        description: "Praktiske JPA-oppgaver i eksamensstil.",
        file: "oppgaver.md",
      },
    ],
  },
  {
    slug: "nosql",
    title: "NoSQL",
    shortTitle: "NoSQL",
    description:
      "XML, XSD, XPath, XSLT, XML/JSON i PostgreSQL og dokumentmodeller.",
    longDescription:
      "NoSQL-delen dekker semistrukturerte data. Du lærer XML og XML Schema, XPath og XSLT, hvordan XML og JSON lagres i PostgreSQL som hybrid, og hvordan man drøfter valg mellom relasjonsmodell og dokumentmodell.",
    kind: "teori",
    icon: "document",
    weight: "~25%",
    mustKnow: [
      "XML: well-formed vs. valid, XSD med key/unique/keyref",
      "XPath-navigering og XSLT-transformasjon",
      "json vs. jsonb i PostgreSQL, operatorene -> og ->>",
      "Hybrid lagring: relasjonstabell med xml- eller jsonb-kolonne",
      "Drøfte når dokumentmodell passer bedre enn relasjonsmodell",
    ],
    examFocus: [
      "Lese og skrive XSD-skjema med key/unique/keyref",
      "Skrive XPath-uttrykk og enkle XSLT-transformasjoner",
      "Hente verdier ut av jsonb-kolonne med -> og ->>",
      "Begrunne valg mellom relasjons- og dokumentmodell",
    ],
    intro: [
      {
        title: "Hvorfor NoSQL er en egen del",
        body: "NoSQL i DAT107 handler ikke om å erstatte relasjonsdatabasen, men om hvordan semistrukturerte data (XML og JSON) lagres og hentes. Eksamen tester både syntaks (XPath, XSD) og forståelse (når passer hva).",
        accent: "purple",
      },
      {
        title: "Hvordan delen er bygget opp",
        body: "Først XML-familien: well-formed, XSD, XPath, XSLT. Deretter hvordan XML og JSON lever som kolonner i PostgreSQL. Til slutt den bredere drøftingen: dokumentdatabaser mot relasjonsmodell.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Start med introduksjon og XML/XSD — dette er teknisk tyngst. XPath og XSLT er rene syntaksoppgaver. PostgreSQL-delene er praktiske, og dokumentdatabaser er drøftingen. Avslutt med sjekkliste og oppgaver.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Grunnleggende",
        description: "XML-familien: well-formed, valid og skjemavalidering.",
        topicSlugs: ["introduksjon", "xml-og-xsd"],
      },
      {
        title: "Praktisk NoSQL",
        description: "Syntaks du må kunne skrive, og hybrid lagring i PostgreSQL.",
        topicSlugs: [
          "xpath-og-xslt",
          "xml-i-postgresql",
          "json-og-postgresql",
          "dokumentdatabaser",
          "eksempler",
        ],
      },
      {
        title: "Repetisjon og trening",
        description: "Sjekkliste og oppgaver i eksamensstil.",
        topicSlugs: ["sjekkliste", "oppgaver"],
      },
    ],
    topics: [
      {
        slug: "introduksjon",
        title: "Introduksjon til NoSQL",
        description: "Hva NoSQL er, hovedfamilier og forholdet til relasjonsdatabase.",
        file: "introduksjon.md",
      },
      {
        slug: "xml-og-xsd",
        title: "XML og XML Schema",
        description: "well-formed vs. valid, XSD, key, unique og keyref.",
        file: "xml-og-xsd.md",
      },
      {
        slug: "xpath-og-xslt",
        title: "XPath og XSLT",
        description: "Navigering i XML-trær og transformasjon av dokumenter.",
        file: "xpath-og-xslt.md",
      },
      {
        slug: "xml-i-postgresql",
        title: "XML i PostgreSQL",
        description: "Hybrid lagring med xml-kolonne og uthenting.",
        file: "xml-i-postgresql.md",
      },
      {
        slug: "json-og-postgresql",
        title: "JSON i PostgreSQL",
        description: "json vs. jsonb, -> og ->>, jsonb_path_query og jsonb_set.",
        file: "json-og-postgresql.md",
      },
      {
        slug: "dokumentdatabaser",
        title: "Dokumentdatabaser og valg",
        description: "Når dokumentmodell passer bedre enn relasjonsmodell.",
        file: "dokumentdatabaser.md",
      },
      {
        slug: "eksempler",
        title: "Øvinger og eksempler",
        description: "Hvilke øvingsfiler trener hva.",
        file: "eksempler.md",
      },
      {
        slug: "sjekkliste",
        title: "Kortversjon og sjekkliste",
        description: "Kompakt repetisjon av XML, XPath, JSON og NoSQL-valg.",
        file: "sjekkliste.md",
      },
      {
        slug: "oppgaver",
        title: "Øvingsoppgaver",
        description: "Praktiske oppgaver og drøftinger i eksamensstil.",
        file: "oppgaver.md",
      },
    ],
  },
  {
    slug: "obliger",
    title: "Obliger",
    shortTitle: "Obliger",
    description:
      "Obligatoriske innleveringer som trener SQL, modellering, JPA og NoSQL.",
    longDescription:
      "Obligene brukes her som aktive øvingsressurser. Fokus er ikke bare oppgavetekst, men hvilke faglige mønstre hver oblig trener og hvordan de kobler tilbake til eksamensoppgaver.",
    kind: "praksis",
    icon: "clipboard",
    accent: "purple",
    trackLabel: "Praktisk treningsspor",
    mustKnow: [
      "Oblig 1 (SQL): joins og null-håndtering i bompengecaset",
      "Oblig 2 (Modellering): ER og 3NF for forening med medlemsavgift per år",
      "Oblig 3 (JPA): ansatt, avdeling, prosjekt og prosjektdeltagelse",
      "Oblig 4 (NoSQL): XML i PostgreSQL, JSON og MongoDB",
    ],
    examFocus: [
      "Kjenne igjen oblig-mønstre i eksamensoppgaver",
      "Null-håndtering i joins (bompengeoppgaven)",
      "ER og 3NF i forening-caset",
      "Assosiasjonsentitet mellom ansatt og prosjekt",
    ],
    intro: [
      {
        title: "Hvorfor obligene teller",
        body: "Obligene er den mest konkrete forberedelsen til eksamen. Hver oblig trener ett fagområde med én case som går igjen — bompenger for SQL, forening for modellering, ansatt/prosjekt for JPA og hobbyhus for NoSQL. Mønstrene kommer tilbake på eksamen.",
        accent: "purple",
      },
      {
        title: "Hvordan delen er bygget opp",
        body: "Én side per oblig med case, hva den trener og hva du bør se etter. Deretter en samlet treningsblikk-side som kobler obligene tilbake til eksamensmønstre. Til slutt sjekkliste og små oppgaver inspirert av obligene.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Les gjennom hver oblig først for å friske opp caset. Gå deretter til samlet treningsblikk for å se mønstrene på tvers. Sjekklisten er siste repetisjon, og oppgavene er små dryppende øvelser du kan ta under tidspress.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Gjennomgang per oblig",
        description: "Hva hver oblig trener og hvilket mønster den bygger.",
        topicSlugs: ["oblig1", "oblig2", "oblig3", "oblig4"],
      },
      {
        title: "Samlet treningsblikk",
        description: "Mønstre på tvers av obligene som kommer tilbake på eksamen.",
        topicSlugs: ["hva-du-bor-ove-pa"],
      },
      {
        title: "Repetisjon og trening",
        description: "Sjekkliste og små oppgaver inspirert av obligene.",
        topicSlugs: ["sjekkliste", "oppgaver"],
      },
    ],
    topics: [
      {
        slug: "oblig1",
        title: "Oblig 1 — SQL",
        description: "Bompengecaset: tabellvalg, null-håndtering, join/left join.",
        file: "oblig1.md",
      },
      {
        slug: "oblig2",
        title: "Oblig 2 — Modellering og normalisering",
        description: "Forening, lokallag og medlemsavgift per år: ER og 3NF.",
        file: "oblig2.md",
      },
      {
        slug: "oblig3",
        title: "Oblig 3 — JPA",
        description: "Ansatt, avdeling, prosjekt og prosjektdeltagelse.",
        file: "oblig3.md",
      },
      {
        slug: "oblig4",
        title: "Oblig 4 — NoSQL",
        description: "Hobbyhuset: XML i PostgreSQL, JSON og MongoDB.",
        file: "oblig4.md",
      },
      {
        slug: "hva-du-bor-ove-pa",
        title: "Hva du bør øve på",
        description: "Samlet blikk på hva obligene trener som helhet.",
        file: "hva-du-bor-ove-pa.md",
      },
      {
        slug: "sjekkliste",
        title: "Kortversjon og sjekkliste",
        description: "Rask oversikt over hva hver oblig trener.",
        file: "sjekkliste.md",
      },
      {
        slug: "oppgaver",
        title: "Øvingsoppgaver",
        description: "Små praktiske oppgaver inspirert av obligene.",
        file: "oppgaver.md",
      },
    ],
  },
  {
    slug: "eksamen-gjengangere",
    title: "Eksamen gjengangere",
    shortTitle: "Gjengangere",
    description:
      "Bearbeidet eksamensanalyse: mønstre, oppgavetyper, strategier og treningsfiler.",
    longDescription:
      "Dette er det bearbeidede eksamenssporet. Her finner du hvilke oppgavetyper som går igjen, hvordan sensor leser besvarelsene dine, praktisk strategi per fagområde og øvelser i eksamensstil. Bruk dette sporet til siste målrettede repetisjon.",
    kind: "eksamen-bearbeidet",
    icon: "target",
    accent: "amber",
    trackLabel: "Bearbeidet eksamensspor",
    mustKnow: [
      "Firedelingen: JPA, Modellering, SQL, NoSQL (~25 % hver)",
      "Vanlige oppgavetyper og klassiske feller per fagområde",
      "Hvordan lese kommandordene (skriv, forklar, modellér, begrunn)",
      "Tidsstrategi i selve eksamenen",
    ],
    examFocus: [
      "Gjenkjenne oppgavetyper før du begynner å skrive",
      "Svare direkte på kommandordet (skriv / forklar / begrunn)",
      "Unngå klassiske feller per fagområde",
      "Disponere tiden så du rekker alle fire oppgavetyper",
    ],
    intro: [
      {
        title: "Dette er det bearbeidede sporet",
        body: "Her er eksamen analysert for deg: hvilke oppgavetyper som går igjen, hva sensor leter etter, hvilke feller som går igjen. Språket er forklarende og strategisk — dette er ikke originale eksamenstekster, men mønstre og strategi destillert ut av dem.",
        accent: "amber",
      },
      {
        title: "Hvordan delen er bygget opp",
        body: "Først oversikt og strategi. Deretter mønsteranalyse per fagområde: JPA, SQL, NoSQL og Modellering. Til slutt sjekkliste og eksamensnære oppgaver i bearbeidet form.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Bruk dette til siste målrettede repetisjon. Les oversikt og strategi først for å få eksamensoversikten. Gå deretter tilbake til det fagområdet du er svakest på. Se gjengangere for originaltekster når du vil trene under tidspress.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Oversikt og strategi",
        description: "Les dette først — gir deg eksamenskartet og tidsstrategi.",
        topicSlugs: ["oversikt", "strategi"],
      },
      {
        title: "Mønsteranalyse per fagområde",
        description: "Typiske oppgavetyper og klassiske feller per fagområde.",
        topicSlugs: ["jpa", "sql", "nosql", "modellering"],
      },
      {
        title: "Repetisjon og trening",
        description: "Sjekkliste og blandede eksamensnære oppgaver.",
        topicSlugs: ["sjekkliste", "oppgaver"],
      },
    ],
    topics: [
      {
        slug: "oversikt",
        title: "Oversikt",
        description: "Hvilke eksamenssett som finnes og hva de egner seg til.",
        file: "oversikt.md",
      },
      {
        slug: "jpa",
        title: "JPA-gjengangere",
        description: "Vanlige JPA-oppgavetyper og klassiske mønstre.",
        file: "jpa.md",
      },
      {
        slug: "sql",
        title: "SQL-gjengangere",
        description: "Vanlige SQL-oppgavetyper og klassiske eksamensfeller.",
        file: "sql.md",
      },
      {
        slug: "nosql",
        title: "NoSQL-gjengangere",
        description: "Vanlige NoSQL-oppgavetyper og eksamensforventninger.",
        file: "nosql.md",
      },
      {
        slug: "modellering",
        title: "Modellering og normalisering",
        description: "Typiske modell- og 3NF-oppgaver.",
        file: "modellering.md",
      },
      {
        slug: "strategi",
        title: "Oppgavetyper og eksamensstrategi",
        description: "Hvordan du leser kommandordene og prioriterer tiden.",
        file: "strategi.md",
      },
      {
        slug: "sjekkliste",
        title: "Kortversjon og sjekkliste",
        description: "Siste repetisjon før eksamen.",
        file: "sjekkliste.md",
      },
      {
        slug: "oppgaver",
        title: "Øvingsoppgaver",
        description: "Blandede eksamensnære oppgaver.",
        file: "oppgaver.md",
      },
    ],
  },
  {
    slug: "originale-eksamen",
    title: "Originale Eksamen",
    shortTitle: "Originale",
    description:
      "Kildetro Markdown-versjoner av eksamenssett og løsningsforslag.",
    longDescription:
      "Dette er det kildetro eksamenssporet. Hver fil er én original PDF konvertert til Markdown med bevart oppgaverekkefølge og deloppgaver. Dette er IKKE bearbeidede notater — bruk gjengangersporet for mønsteranalyse. Bruk dette sporet til å lese eller løse originale sett.",
    kind: "eksamen-original",
    icon: "archive",
    accent: "red",
    trackLabel: "Kildetro eksamensspor",
    mustKnow: [
      "Kjenne stilen og språket i originale eksamenssett",
      "Bruke løsningsforslagene som fasit, ikke som oppsummering",
      "Øve full gjennomkjøring under tidspress før eksamen",
    ],
    examFocus: [
      "Gjenkjenne språket og stilen i originale eksamenstekster",
      "Øve full gjennomkjøring under tidspress på originale sett",
      "Sammenligne egen løsning med originalt løsningsforslag",
      "Lese løsningsforslag som fasit, ikke som læringsnotat",
    ],
    intro: [
      {
        title: "Dette er det kildetro sporet",
        body: "Her er originale eksamenssett og løsningsforslag bevart så tett som mulig til originalteksten. Språket er formelt og eksamensnært. Dette er IKKE bearbeidede notater — bruk gjengangersporet for mønsteranalyse og strategi. Bruk dette sporet for å lese, løse og sammenligne.",
        accent: "purple",
      },
      {
        title: "Hvordan delen er bygget opp",
        body: "Temaene er gruppert fra nyeste og nedover. De siste eksamenssettene er viktigst — de reflekterer det faktiske nivået du vil møte. Løsningsforslagene er sortert side om side med de tilhørende settene der vi har begge deler.",
        accent: "sky",
      },
      {
        title: "Slik bruker du sporet",
        body: "Start med de nyeste settene. Løs oppgaven først selv under tidspress, sammenlign deretter mot løsningsforslag. Når flere eksamenssett er gjennomført, se mønstrene i bearbeidet gjengangerspor.",
        accent: "emerald",
      },
    ],
    phases: [
      {
        title: "Nyeste — les først",
        description: "De siste eksamenssettene og løsningsforslagene. Disse er mest representative.",
        topicSlugs: [
          "2026-januar-losning",
          "2025-mai-losning",
          "2025-januar-losning",
        ],
      },
      {
        title: "Komplette eksamenssett",
        description: "Originaltekster uten fasit — bruk disse til full gjennomkjøring under tidspress.",
        topicSlugs: ["2024-januar", "2023-januar", "2022-januar"],
      },
      {
        title: "Løsningsforslag",
        description: "Sammenlign med egne svar etter du har løst oppgaven selv.",
        topicSlugs: [
          "2024-mai-losning",
          "2023-mai-losning",
          "2022-mai-losning",
          "2021-mai-losning",
        ],
      },
      {
        title: "Temaspesifikk eksamensøving",
        description: "Utvalgte fagområder bevart i originalform.",
        topicSlugs: ["jpa-jan-2022-losning"],
      },
    ],
    topics: [
      {
        slug: "2026-januar-losning",
        title: "2026 januar — løsningsforslag",
        description: "Nyeste lokale løsningsgrunnlag.",
        file: "2026-januar-losning.md",
      },
      {
        slug: "2025-mai-losning",
        title: "2025 mai — løsningsforslag",
        description: "Ekstra mønstertrening på nyere nivå.",
        file: "2025-mai-losning.md",
      },
      {
        slug: "2025-januar-losning",
        title: "2025 januar — løsningsforslag",
        description: "Nyere forventet nivå.",
        file: "2025-januar-losning.md",
      },
      {
        slug: "2024-mai-losning",
        title: "2024 mai — løsningsforslag",
        description: "Repetisjon med fasitpreg.",
        file: "2024-mai-losning.md",
      },
      {
        slug: "2024-januar",
        title: "2024 januar — eksamenssett",
        description: "Tydelig firedeling JPA / modellering / SQL / NoSQL.",
        file: "2024-januar.md",
      },
      {
        slug: "2023-mai-losning",
        title: "2023 mai — løsningsforslag",
        description: "Mønstre i løsningsteknikk.",
        file: "2023-mai-losning.md",
      },
      {
        slug: "2023-januar",
        title: "2023 januar — eksamenssett",
        description: "Eldre bredde i emnet.",
        file: "2023-januar.md",
      },
      {
        slug: "2022-mai-losning",
        title: "2022 mai — løsningsforslag",
        description: "Sammenligning av struktur og begrunnelser.",
        file: "2022-mai-losning.md",
      },
      {
        slug: "2022-januar",
        title: "2022 januar — eksamenssett",
        description: "Full gjennomkjøring uten fasit.",
        file: "2022-januar.md",
      },
      {
        slug: "2021-mai-losning",
        title: "2021 mai — løsningsforslag",
        description: "Svarstil og faglig nivå.",
        file: "2021-mai-losning.md",
      },
      {
        slug: "jpa-jan-2022-losning",
        title: "JPA januar 2022 — løsning",
        description: "Temaløsning for JPA-spesifikk eksamensøving.",
        file: "jpa-jan-2022-losning.md",
      },
    ],
  },
];

export function getDAT107Area(slug: string): DAT107Area | undefined {
  return dat107Areas.find((a) => a.slug === slug);
}

export function getDAT107Topic(
  areaSlug: string,
  topicSlug: string,
): { area: DAT107Area; topic: DAT107Topic } | undefined {
  const area = getDAT107Area(areaSlug);
  if (!area) return undefined;
  const topic = area.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { area, topic };
}
