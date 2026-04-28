# Introduksjon

## Kjernen

SQL er språket vi bruker for å definere, endre og spørre mot relasjonsdatabaser. I DAT107 er poenget ikke bare syntaks, men å forstå hvordan SQL henger sammen med tabeller, nøkler, datamodellering, indekser og transaksjoner.

SQL brukes til å:

- opprette tabeller, nøkler, begrensninger og indekser
- legge inn, endre og slette data
- hente ut og kombinere data
- styre transaksjoner
- administrere rettigheter i større systemer

## Dette må du kunne

- forklare forskjellen på database, DBMS og RDBMS
- skille strukturerte og ustrukturerte data
- bruke begrepene tabell, rad, kolonne, verdi, nøkkel og skjema presist
- skille DDL, DML og DCL
- forstå hvorfor PostgreSQL/SQL passer best når data har fast struktur
- se hvilke tabeller og koblinger som trengs før du skriver spørringen

## Database, DBMS og RDBMS

En database er en samling data. Et DBMS er programvaren som lagrer, beskytter og gjør data tilgjengelig. Et RDBMS er et DBMS for relasjonsdatabaser, der data organiseres i tabeller.

Et DBMS gir mer enn lagring:

- flerbrukertilgang
- tilgangskontroll
- integritetsregler
- transaksjoner
- standardisert grensesnitt, typisk SQL
- verktøy og drivere for applikasjoner

I DAT107 brukes PostgreSQL som hoved-RDBMS.

## Strukturerte data

Strukturerte data har faste egenskaper som passer som kolonner:

```text
tidspunkt, temperatur, nedbor, vindstyrke
```

Ustrukturerte eller semistrukturerte data kan være tekst, bilder, XML eller JSON der strukturen varierer mer. SQL-databaser er sterkest når du vet hvilke data som skal lagres og hvilke regler som gjelder.

## Terminologi

| Begrep | Forklaring | Eksempel |
| --- | --- | --- |
| Entitetstype | type ting vi lagrer om | `Ansatt` |
| Entitet/forekomst | én konkret ting | én ansatt |
| Attributt | egenskap | `etternavn` |
| Attributtverdi | konkret verdi | `'Hansen'` |
| Tabell | samling av like forekomster | `ansatt` |
| Rad | én forekomst i tabellen | én ansattrad |
| Kolonne | samme attributt for alle rader | `lonn` |
| Skjema | definisjon av tabeller og regler | databasestruktur |

## SQL-deler

| Del | Bruk | Eksempler |
| --- | --- | --- |
| DDL | definere struktur | `create table`, `alter table`, `drop table` |
| DML | behandle data | `select`, `insert`, `update`, `delete` |
| DCL | styre tilgang | `grant`, `revoke` |
| TCL | styre transaksjoner | `commit`, `rollback` |

Kurset legger mest vekt på DDL, DML og transaksjoner.

## Første SQL-eksempel

```sql
create table ansatt (
    ansattnr integer primary key,
    etternavn varchar(40) not null,
    fornavn varchar(40) not null,
    ansattdato date,
    stilling varchar(40),
    lonn numeric(8, 2)
);
```

```sql
select etternavn, fornavn, lonn
from ansatt
where lonn > 600000
order by etternavn;
```

Lysarkene bruker av og til æ, ø og å i eksempler. I egne SQL-skript er ASCII-navn ofte tryggere, særlig hvis løsningen skal flyttes mellom verktøy og databaser.

## Forholdet til andre deler av DAT107

- **Modellering** bestemmer tabellene, nøklene og relasjonene.
- **SQL** bruker tabellene til å lagre og hente data.
- **JPA** lar Java-objekter speile tabeller og relasjoner.
- **NoSQL** brukes når relasjonsmodellen ikke er beste valg.

## Vanlige feil

- skrive SQL uten å forstå modellen
- blande database og DBMS
- omtale en fremmednøkkel som en "kobling" uten å si hva den peker til
- bruke `select *` i oppgaver som ber om bestemte kolonner
- velge datatyper ut fra utseende i stedet for betydning

## Typiske eksamensoppgaver

- forklar sentrale databasebegreper
- gå fra tekst til tabeller og nøkler
- velg passende datatype og begrunn valget
- skriv enkel `create table` og enkel `select`

## Hva du bør øve på

- forklare med egne ord hva primærnøkkel og fremmednøkkel gjør
- skille strukturkommandoer fra datakommandoer
- skissere tabeller og koblinger før du skriver SQL
