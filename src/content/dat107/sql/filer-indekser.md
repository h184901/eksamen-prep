# Filer Og Indekser

## Kjernen

Denne delen forklarer hvorfor databasen finner noen ting raskt og andre ting tregt. Hovedideen er at disk-I/O er dyrt, og at DBMS-et prøver å lese færrest mulig blokker.

## Dette må du kunne

- forklare at data flyttes mellom disk og minne i blokker
- skille tabell, fil, post og felt
- forklare heap-fil, sortert fil og sekvensielt søk
- forklare hva en indeks er
- lage enkel og sammensatt indeks med SQL
- kjenne tett, ikke-tett og flernivå-indeks
- forstå hovedideen bak B+-tre
- begrunne når indeks hjelper og når den ikke gjør det

## Minne, disk og blokker

Databasen er vanligvis større enn minnet. Derfor må DBMS-et lese data fra disk til minne og skrive endringer tilbake.

En blokk er minste enhet som overføres mellom disk og minne. Typisk blokkstørrelse er noen KB, og én blokk inneholder mange poster.

![Fil delt inn i blokker](/content/dat107/assets/sql/blokker-fil.png)

Målet er å redusere antall blokker som må leses.

## Fra SQL til filbegreper

| SQL | Relasjonsmodellen | ER | Filer |
| --- | --- | --- | --- |
| tabell | relasjon | entitetstype | fil |
| rad | tuppel | entitetsforekomst | post |
| kolonne | attributt | attributt | felt |

Dette er samme data sett fra ulike nivåer.

## Fast og variabel postlengde

Fast postlengde gjør det lett å beregne hvor en post ligger. Variabel postlengde krever mer administrasjon, fordi `varchar`, store tekster eller ulike posttyper gjør at postene ikke er like lange.

Dette er ikke vanlig SQL-syntaksstoff, men det forklarer hvorfor datatypevalg påvirker lagring.

## Filstrukturer og søk

En heap-fil er usortert. Nye poster legges ofte til der det er plass. Søk uten indeks må i verste fall lese mange blokker.

En sortert fil er sortert på et felt. Da kan binærsøk brukes på sorteringsfeltet, men innsetting og sletting blir dyrere.

Eksempelidé:

| Søk | Forutsetning | Kostnad |
| --- | --- | --- |
| Sekvensielt søk | ingen sortering/indeks | mange blokker |
| Binærsøk | fil sortert på søkefelt | omtrent `log2(blokker)` |
| Indeks | passende indeks finnes | få blokker |

## Indekser

En indeks er en ekstra datastruktur som gjør søk raskere. Tenk på registeret bakerst i en bok: søkeordet peker til stedet der innholdet finnes.

```sql
create index ansatt_navn_idx
on ansatt(etternavn, fornavn);
```

Sammensatt indeks på `(etternavn, fornavn)` hjelper også for søk på `etternavn` alene, fordi `etternavn` er første del av indeksen. Den hjelper ikke like godt for søk bare på `fornavn`.

Unik indeks:

```sql
create unique index ansatt_epost_idx
on ansatt(epost);
```

## Kostnaden ved indeks

Indekser er ikke gratis:

- de tar lagringsplass
- de må oppdateres ved `insert`, `update` og `delete`
- de kan være unødvendige på små tabeller
- de hjelper lite på kolonner med få ulike verdier, for eksempel `boolean`

Ikke anbefal indeks bare fordi en kolonne finnes. Begrunn med faktisk søk, sortering eller join.

## Tett og ikke-tett indeks

| Type | Forklaring |
| --- | --- |
| Tett indeks | én indekspost per post i datafilen |
| Ikke-tett indeks | én indekspost per blokk |

Ikke-tett indeks krever at datafilen er sortert på samme felt. Derfor kan en fil i praksis bare ha én ikke-tett indeks.

## B+-tre

For store indekser brukes flernivå-indekser. B+-tre er en vanlig struktur: søket går fra rot til blad, og alle søk har omtrent samme lengde fordi treet er balansert.

![B+-tre-indeks](/content/dat107/assets/sql/bpluss-tre.png)

Figuren viser et søk som følger pekere gjennom indeksnivåene før datafilen leses.

## Valg av datatyper

Datatypevalg påvirker både korrekthet og lagring:

- bruk `char(n)` for faste koder, for eksempel landkode
- bruk `varchar(n)` for tekst med variabel lengde
- bruk heltall når verdien er et antall eller en identifikator
- bruk `numeric(p, s)` for eksakte desimaltall
- bruk tekst for verdier du ikke skal regne med, for eksempel postnummer
- velg dato/tid etter om du trenger dato, klokkeslett eller begge

## Vanlige feil

- tro at indeks alltid hjelper
- glemme at små tabeller ofte ikke trenger indeks
- indeksere kolonner som nesten aldri brukes i søk
- lage sammensatt indeks i feil kolonnerekkefølge
- forklare ytelse bare som "raskere" uten å nevne I/O/blokker

## Typiske eksamensoppgaver

- forklar når indeks er nyttig
- opprett indeks på gitt kolonne
- sammenlign sekvensielt søk og indeksbasert søk
- forklar hva et B+-tre gjør på overordnet nivå
- begrunn datatypevalg

## Hva du bør øve på

- begrunne hvorfor en gitt kolonne bør eller ikke bør indekseres
- skille datafil, blokk, post og felt
- forklare indekskostnad ved oppdateringer
