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

export interface DAT107Area {
  slug: DAT107AreaSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  kind: DAT107AreaKind;
  icon: string;
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
