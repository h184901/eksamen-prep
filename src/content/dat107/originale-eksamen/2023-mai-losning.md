# Løsningsforslag eksamen DAT107 v2023

## Oppgave 1 – JPA/ORM (20% - 48 min)

Database med oversikt over låter og spillelister.

Tabeller:

- `laat`
- `spilleliste`
- `laat_i_liste`

### a)

Skriv Java-klasser og annotasjoner for løsning med mange-til-mange mellom `Laat` og `Spilleliste`.

Løsningsforslaget viser to alternativer:

- Alt.1: bare `Laat` og `Spilleliste`
- Alt.2: egen koblingsklasse `LaatIListe`

Alt.1 fremheves som den enkleste og beste løsningen.

### b)

Metode `hentSpillelisteMedId(int id)` i `LaatDAO`.

### c)

Metode `hentAlleLaaterForArtist(String artist)` i `LaatDAO`.

### d)

Metode `opprettSpilleliste(String navn, String beskrivelse, List<Laat> laater)`.

## Oppgave 2 – Modellering (20% - 48 min)

Database for skole og eksamener.

Krav:

- fag
- student
- eksamen med historikk for flere forsøk
- karakter per forsøk

Løsningsforslaget beskriver blant annet:

- `Student(studentnummer, fornavn, etternavn, epost)`
- `Fag(fagkode, fagnavn, beskrivelse)`
- `Eksamen(studentnummer, fagkode, dato, karakter)`

## Oppgave 3 – Normalisering (20% - 48 min)

Utgangspunkt:

`Eksamen(fagkode, fagnavn, beskrivelse, studentnummer, fornavn, etternavn, epost, karakter, dato)`

Løsningsforslaget går gjennom:

- valg av primærnøkkel
- 1NF
- 2NF
- 3NF

og ender med tabellene `Student`, `Fag` og `Eksamen`.

## Oppgave 4 – SQL (20% - 48 min)

Utgangspunkt:

- `Student(studentnummer, navn)`
- `Eksamen(studentnummer*, fagkode, karakter)`

Løsningsforslaget inneholder blant annet:

- opprettelse av `Eksamen`
- innlegging av ny eksamen
- sletting av student 42
- ny kolonne `epost`
- join mellom `student` og `eksamen`
- relasjonsalgebra
- `group by`
- `cube`
- indeks på `fagkode`

## Oppgave 5 – NoSQL (20% - 48 min)

Oppgaven ber om en flat NoSQL-implementasjon av samme database, og løsningsforslaget bruker JSON i PostgreSQL:

```sql
Create table eksamen(
id serial primary key,
data jsonb);
```

Løsningsforslaget viser videre eksempel på:

- innlegging av nytt JSON-dokument
- sletting basert på JSON-felt
- ny “kolonne” ved nytt dokument
- uthenting av fagkode, karakter og navn
- aggregering per fagkode og navn
