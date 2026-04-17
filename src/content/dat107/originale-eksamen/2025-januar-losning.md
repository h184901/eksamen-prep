# DAT107 2025 januar eksamen - løsningsforslag

## Oppgave 1 – Modellering

Restaurantcase med:

- matrett
- kategori
- allergen
- kobling mellom rett og allergen

Løsningsforslaget viser håndtegnet ER-modell. OCR av figuren er delvis uklar, men antyder blant annet tabellene:

- `RETT`
- `KATEGORI`
- `ALLERGEN`
- `RETTALLERGEN`

## Oppgave 2 – SQL

Utgangspunkt:

- `Rett(navn, pris, kategori*)`
- `Kategori(kategori)`

Delspørsmål:

a) Opprett `Rett`  
b) Legg til `Antall_bestilt`  
c) Fjern `Antall_bestilt`  
d) Legg inn ny rett  
e) Slett retten igjen  
f) Finn alle retter av kategorien `Hovedrett`  
g) Relasjonsalgebra  
h) Antall retter av hver kategori  
i) Kategorier uten retter  
j) Forklar `inner`, `left outer`, `right outer` og `full outer join`

Løsningsforslaget inneholder tilsvarende SQL for alle delspørsmål.

## Oppgave 3 – ORM/JPA

Kafé med:

- `matrett`
- `ingrediens`
- `matrett_har_ingrediens`

Oppgaven bruker mange-til-mange-forhold og ber om:

- Java-klasser og annotasjoner
- metode for å hente allergener i matrett
- metode for å hente matretter i kategori
- metode for å lagre ny ingrediens

## Oppgave 4 – XML, JSON og NoSQL

### 4.1 XML og JSON – flervalgsoppgaver

Temaer:

- XML Schema
- velformet XML
- navnerom
- innebygde typer i XML Schema

### 4.2 XML og JSON – tenk selv

Oppgaver om:

- hva velformet og gyldig betyr
- lage gyldig XML etter `menu.xsd`
- utvide XML Schema med prisgrenser og lovlige allergener
- skrive XML om til JSON

### 4.3 NoSQL

Flervalg og korte spørsmål om:

- sharding
- replikering
- CAP-teoremet
- Cassandra, MongoDB, Neo4J, DynamoDB og PostgreSQL
