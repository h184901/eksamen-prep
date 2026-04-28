# Introduksjon til NoSQL

## Kjernen

I DAT107 betyr NoSQL først og fremst at vi ser på datamodeller som ikke er rent relasjonelle, og på situasjoner der semistrukturerte dokumenter er mer naturlige enn mange normaliserte tabeller.

NoSQL betyr:

```text
Not Only SQL
```

Poenget er ikke at relasjonsdatabaser er utdaterte. Poenget er å velge riktig datamodell til riktig problem.

## Dette må du kunne

- forklare hva NoSQL betyr i praksis
- forklare hvorfor NoSQL vokste frem med internett, sosiale medier, smarttelefoner og Big Data
- nevne hovedfamilier som nøkkel-verdi, dokument, kolonne og graf
- forklare hvorfor XML og JSON er relevante i et databasekurs
- forstå at PostgreSQL også kan brukes som hybrid løsning med XML/JSON-kolonner

## Hvorfor NoSQL?

Internett, e-handel, smarttelefoner og sosiale medier ga kraftig vekst i datamengder og datavariasjon. Tradisjonelle relasjonsdatabaser er fortsatt viktige, men noen behov passer bedre med andre databasemodeller.

Typiske behov:

- komplekse datastrukturer
- semistrukturerte data
- distribuerte løsninger
- løsere krav til transaksjonshåndtering
- svært store datamengder

## Big Data

Big Data beskrives ofte med fem V-er:

| V | Betydning |
| --- | --- |
| Volume | Datamengde |
| Velocity | Hastighet på innsamling og behandling |
| Variety | Variasjon i data og struktur |
| Veracity | Pålitelighet og kvalitet |
| Value | Verdien man kan hente ut |

## Hovedfamilier

![NoSQL-familier](/content/dat107/assets/nosql/nosql-familier.png)

| Type | Modell | Eksempel |
| --- | --- | --- |
| Nøkkel-verdi | Nøkkel/verdi-par | Redis, DynamoDB |
| Kolonne | Kolonnefamilier | Cassandra, HBase |
| Dokument | JSON/BSON-dokumenter i samlinger | MongoDB, CouchDB |
| Graf | Noder og kanter | Neo4J |

Vektordatabaser nevnes i strukturert materiale, men er utenfor DAT107-pensumet her.

## XML og JSON i NoSQL-delen

NoSQL-delen i DAT107 handler mye om semistrukturerte data:

- XML og XML Schema for struktur og validering
- XPath og XSLT for å hente og transformere XML
- XML i PostgreSQL som hybrid mellom tabell og dokument
- JSON og JSONB i PostgreSQL
- drøfting av relasjonsmodell, dokumentmodell og nøkkel-verdi-modell

## Viktig poeng

Relasjonsmodell er sterk på integritet, constraints, transaksjoner og fleksible spørringer. Dokument- og nøkkel-verdi-modeller kan være sterke når data leses samlet, når strukturen varierer, eller når skaleringsmønsteret er enkelt.

## Vanlige feil

- framstille NoSQL som "bedre" i stedet for annerledes
- forklare NoSQL som "No SQL" i stedet for "Not Only SQL"
- glemme at relasjonelle løsninger fortsatt er sterke på integritet og fleksible spørringer
- fokusere for mye på verktøy og for lite på datamodell

## Typiske eksamensoppgaver

- forklar hva NoSQL er
- sammenlign relasjonell modell og dokumentmodell
- nevn hovedfamilier av NoSQL-databaser
- begrunn hvorfor en hybrid løsning i PostgreSQL kan være fornuftig

## Hva du bør øve på

- skrive korte sammenligninger mellom relasjonsdatabase og dokumentdatabase
- forklare hvorfor et domene kan passe dårlig i bare vanlige tabeller
- knytte argumentene dine til datamengde, struktur, integritet og spørremønster
