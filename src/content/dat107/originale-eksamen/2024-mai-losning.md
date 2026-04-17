# DAT107 2024 mai eksamen løsningsforslag

Merk: Dette er en Markdown-kladd basert på PDF-en `DAT107_2024_mai_eksamen_løsningsforslag.pdf`.

Enkelte små OCR-detaljer i PDF-en er uklare. Der teksten ikke er helt sikker, er dette kort merket i stedet for å gjette.

## Oppgave 1 – ORM/JPA

Database for bibliotek med tabellene:

- `bok`
- `medlem`
- `utlaan`

### a)

Skriv Java-klassene `Bok`, `Medlem` og `Utlaan`.

Løsningsforslaget viser blant annet:

- `Medlem` med toveis navigering mot `Utlaan`
- `Bok` uten ønsket toveis navigering mot `Utlaan`

### b)

Metode `finnMedlemMedNr(int medlemnr)`.

### c)

Metode `finnBokerPaaForfatter(String forfatter)`.

### d)

Metode `leverTilbakeBok(int bokid)` med håndtering av:

- ingen ikke-returnert utlån
- flere ikke-returnerte utlån

Løsningsforslaget bruker `getSingleResult()` og fanger `NoResultException` og `NonUniqueResultException`.

## Oppgave 2 – modellering/normalisering

Nettbutikkcase med:

- kunde
- ordre
- varer/ordrelinjer
- postnummer og poststed

Løsningsforslaget beskriver blant annet:

- `Kunde`
- `Ordre`
- `Vare` brukt som ordrelinje
- `Poststed`

og forklarer hvorfor løsningen tilfredsstiller 1NF, 2NF og 3NF.

## Oppgave 3 – SQL

Utgangspunkt:

- `Kunde(kunde_id, navn, epost)`
- `Ordre(ordre_id, kunde_id*)`

Løsningsforslaget inneholder:

- `create table kunde`
- `insert`
- `alter table`
- `create index`
- sortert utskrift av ordrer
- join mellom `ordre` og `kunde`
- relasjonsalgebra
- `group by` og outer join
- enkelt plassoverslag

OCR-merknad: Fasitteksten sier selv at én deloppgave egentlig skulle brukt telefonnummer, men at oppgaveteksten ved en feil brukte `epost`.

## Oppgave 4 – XML, JSON og NoSQL

### 4.1 XML og JSON

Oppgaver om:

- hva velformet og gyldig XML betyr
- lage gyldig XML etter gitt XSD
- skrive om til JSON

Løsningsforslaget inkluderer et fullt XML-eksempel og et JSON-eksempel for ordredata.

### 4.2 NoSQL

Oppgaver om:

- sharding
- replikering
- CAP-teoremet
- kobling av databasesystemer til egenskaper

Løsningsforslaget diskuterer blant annet:

- MongoDB som `CP`
- Cassandra som kolonnedatabase
- Amazon DynamoDB som nøkkel-verdi-database
- PostgreSQL som relasjonsdatabase

### Vedlegg 4.1

`kunde-ordre.xsd` er gjengitt i løsningsforslaget som XML Schema.
