# Eksamensoppgave

**Emnekode:** DAT107  
**Emnenavn:** Databaser  
**Dato:** 04.01.2024  
**Eksamensform:** Skriftlig digital  
**Eksamenstid:** 09:00–13:00  
**Antall eksamensoppgaver:** 4

## Oppgave 1 – ORM/JPA

Database med oversikt over filmer og personer med tilknytning til filmene.

Tabeller:

- `film`
- `person`
- senere også `skuespiller`

Delspørsmål:

a) Skriv Java-klassene som trengs for `film` og `person`, med toveis navigering mellom film og regissør.  
b) Skriv `hentFilmerRegissertAv(int personId)`.  
c) Skriv `hentFilmerISjanger(String sjanger)`.  
d) Skriv `leggInnSkuespiller(Integer filmId, Integer personId, String rolle)`.

## Oppgave 2 – modellering/normalisering

Problembeskrivelse om høgskole med:

- flere campus
- flere fakultet
- ansatte
- dekan som ansatt
- ansatte knyttet til campus og fakultet

Oppgaven ber om:

- hensiktsmessige tabeller
- full ER-modell
- visning av minst 3NF

## Oppgave 3 – SQL

Utgangspunkt:

- `Ansatt(Ansattnr, navn, campus*)`
- `Campus(Navn, telefonnr)`

Delspørsmål omfatter blant annet:

- opprettelse av `Ansatt`
- innlegging av ansatt
- uthenting av ansatte med campusdata
- relasjonsalgebra
- antall ansatte per campus
- sortering
- indeks på `Navn`

## Oppgave 4 – NoSQL

Ta utgangspunkt i problembeskrivelsen fra oppgave 2 og lag en dokumentdatabase.

Oppgaven ber om:

- dokumenttyper
- eksempel på JSON eller XML per type
- eksempel på lagring i PostgreSQL med `ID` og `DATA`
- drøfting av fordeler og ulemper med dokumentdatabase versus relasjonsdatabase
