# DAT107 2025 mai eksamen - løsningsforslag

## Oppgave 1 – Modellering

Flygninger og passasjerer.

Problembeskrivelsen omfatter blant annet:

- flygning med unik kode
- avgang og landing på flyplasser
- person med navn, fødselsdato, telefon og epost
- passasjer som kobling mellom person og flygning på bestemt dag

Løsningsforslaget beskriver en modell med blant annet:

- `Flygning`
- `Person`
- `Passasjer`

og forklarer hvorfor `Passasjer` blir koblingstabell med sammensatt primærnøkkel.

## Oppgave 2 – SQL

Utgangspunkt:

- `Flygning(flygning_kode, avgang_flyplass, avgang_klokkeslett)`
- `Passasjer(navn, fødselsdato, flygning_kode*, flygning_dato, telefonnr)`

Delspørsmålene omfatter:

- opprettelse av `Passasjer`
- indeks på `telefonnr`
- sletting av kolonne
- innlegging av passasjer
- spørringer på fødselsdato, flygninger og aggregering
- relasjonsalgebra
- hvem som har flydd mer enn en gang samme dag

## Oppgave 3 – ORM/JPA

Avinor-case med:

- `Flyavgang`
- `Flyplass`

To ulike en-til-mange-forhold:

- `fra_flyplass`
- `til_flyplass`

Oppgaven ber om:

- entitetsklasser
- `finnFlyplass`
- `finnFlyavgangerMellom`
- `endreTiderForFlyavgang`

## Oppgave 4 – XML, JSON og NoSQL

### 4.1 XML og XPath

XPath-uttrykk over `biler.xml`, blant annet for:

- alle biler
- registreringsnumre
- biler i klassen `SUV`
- biler produsert i 2018 eller senere
- biler med alarm
- biler med adaptiv cruise-kontroll

### 4.2 MongoDB Query API

Oppgaver om `updateOne`, `upsert`, `matchedCount`, `modifiedCount` og `upsertedCount`.

### 4.3 MongoDB & Java

Oppgaver om:

- hvorfor `setOnInsert` ikke virker uten `upsert(true)`
- `create`
- `read`

### Vedlegg 4.1

XML-filen `biler.xml` er gjengitt i løsningsforslaget.
