# Eksamensoppgave

**Emnekode:** DAT107  
**Emnenavn:** Databaser  
**Dato:** 05.01.2023  
**Eksamensform:** Skriftlig digital hjemmeeksamen  
**Eksamenstid:** 09:00–13:00  
**Antall eksamensoppgaver:** 7

## Oppgave 1 – flervalg

Velg nøyaktig ett av alternativene for hver oppgave.

Temaene i flervalgsdelen omfatter blant annet:

1. tofaselåsing  
2. indekser  
3. XML  
4. datatypen `decimal`  
5. mange-til-mange-forhold  
6. NoSQL  
7. XML Schema  
8. normalisering  
9. ER-modeller  
10. relasjonsalgebra  
11. indre forening  
12. UML-kardinalitet  
13. primærnøkler  
14. tabeller  
15. views

## Oppgave 2 – SQL

Utgangspunkt:

- `Ansatt(ansattnummer, navn, kontor, telefon, epost, overordnet, avdeling*)`
- `Avdeling(avdelingskode, avdelingsnavn, budsjett, avdelingsleder*)`

Delspørsmål:

a) Opprett tabellen `Ansatt`.  
b) Vis all informasjon om alle ansatte, samt navn på avdeling.  
c) Vis all informasjon om alle avdelinger, samt navn på lederen.  
d) Vis ansatte, avdeling og avdelingsleder samlet.  
e) Diskuter om det er mulig å ha ansatte uten avdeling.  
f) Diskuter om en tidligere spørring inkluderer ansatte uten avdeling.  
g) Skriv spørring som relasjonsalgebra.  
h) Finn antall ansatte i hver avdeling.

## Oppgave 3 – normalisering

Tabell:

`Kontorplass(bygning, etasje, rom, plass, bygningsansvarlig, fasttelefon, ansattnummer, navn, fødselsdato, overordnet)`

Delspørsmål:

a) Diskuter kandidatnøkler.  
b) 1NF.  
c) 2NF.  
d) 3NF.

## Oppgave 4 – modellering

Database for ansatte og prosjekt i en bedrift.

Oppgaven ber om:

- ansatte med leder, avdeling og kontor
- prosjekt med prosjektleder, oppstart og slutt
- timer per ansatt på prosjekt
- full ER-modell med nøkler, kardinalitet og entitetstyper

## Oppgave 5 – ORM/JPA

Database for biler og bileiere.

Tabeller:

- `bil`
- `person`
- `eierskap`

Delspørsmål:

a) Skriv Java-klassene `Bil`, `Person` og `Eierskap`.  
b) Skriv metode i `BileierDAO` som søker opp bil på registreringsnummer.  
c) Skriv `main` som skriver ut bilen `SU 12345` med eierhistorikk.  
d) Skriv metode som registrerer eierskifte.

## Oppgave 6 – datamining

### a)

Bruk Apriori-algoritmen på gitt transaksjonstabell med:

- minimum support `0,2`
- confidence `0,7`

og finn:

- frequent k-itemsets
- association rules

### b)

Forklar hvorfor high utility itemset mining er interessant, og hvorfor utility ikke er monotonisk eller anti-monotonisk.

## Oppgave 7 – NoSQL

a) Skriv en rad fra hver tabell som XML.  
b) Skriv en rad fra hver tabell som JSON.  
c) Sammenlign XML og JSON og begrunn hvilket format du ville valgt for serialisering av database i tekstform.
