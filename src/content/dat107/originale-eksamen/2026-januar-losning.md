# DAT107 2026 januar eksamen – løsningsforslag

Merk: Dette er et originaltro utkast basert på PDF/OCR. Noe håndskrift og enkelte linjer er uklare; der OCR var usikker er det markert i teksten i stedet for å gjette.

## Oppgave 1 – modellering

Case om ansatte og kontor.

En ansatt kan ha:

- ingen kontor
- ett kontor
- flere kontor

Et kontor kan være:

- ubrukt
- brukt av én ansatt
- delt av flere ansatte

Løsningsforslaget viser håndtegnet ER-modell. OCR antyder tabellene:

- `Ansatt`
- `Kontor`
- `Tilordning`

## Oppgave 2 – SQL

Utgangspunkt:

- `Ansatt(ansattnummer, navn)`
- `Tilordning(ansattnummer*, kontornummer)`

Delspørsmålene omfatter blant annet:

- opprettelse av `Ansatt`
- legge til og fjerne `Telefonnummer`
- indeks på `Telefonnummer`
- ansatte på kontor `E408`
- relasjonsalgebra
- antall ansatte per kontor
- kontor med flest ansatte
- ansatte uten kontor

Løsningsforslaget inneholder konkrete SQL-forslag for alle delene.

## Oppgave 3 – ORM/JPA

Database for personer, telefoner og poststed.

Tabeller/entiteter:

- `Poststed`
- `Telefon`
- `Person`

Oppgaven ber om:

- entitetsklasser og annotasjoner
- `finnPerson`
- `finnPersonerMedPostnr`
- `leggTilTelefon`

Løsningsforslaget bruker blant annet:

- `@ManyToOne` mellom `Person` og `Poststed`
- `@OneToMany` mellom `Person` og `Telefon`

## Oppgave 4 – XML, JSON og NoSQL

### 4.1 XML, XPath og JSON

Oppgaver over `tvguide.xml`:

- alle `program`-elementer
- programmer i kategori `Reality`
- programmer på kanal `TV2`
- titler i kategori `Krim`
- programmer som går i reprise
- skriv om de to første programmene til JSON

### 4.2 XML og XSLT

Oppgaver om hvordan nettleseren vet at `tvguide.xml` skal transformeres med `tvguide.xslt`, og hva som faktisk vises etter transformasjon.

### 4.3 NoSQL

Match ulike databaser mot fakta-setninger:

- MongoDB
- Amazon DynamoDB
- PostgreSQL
- Cassandra
- Neo4j
- Oracle

### 4.4 MongoDB

Oppgaver om `tvguide`-samling i MongoDB:

- `insertOne`
- `find`
- telling av programmer på kanal og dato

OCR-merknad: Utdraget jeg kunne lese stopper før det fullstendige løsningsforslaget til siste deloppgave i 4.4 blir synlig. Jeg lar derfor den delen stå uten utfylling i stedet for å gjette.
