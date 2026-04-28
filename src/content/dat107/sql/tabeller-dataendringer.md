# Tabeller Og Dataendringer

## Kjernen

Denne delen handler om å definere databasestrukturen og endre innholdet i tabellene på en kontrollert måte. Riktig valg av datatyper, nøkler og begrensninger er en del av datakvaliteten.

![Logisk datamodell for Hobbyhuset](/content/dat107/assets/sql/hobbyhuset-logisk-modell.png)

Figuren viser en logisk modell med flere tabeller. Hver boks blir en tabell, `PK` markerer primærnøkkel og `FK` markerer fremmednøkkel.

## Dette må du kunne

- skrive `create table` med passende kolonner og datatyper
- definere primærnøkkel, fremmednøkkel, `unique`, `not null` og `default`
- forstå naturlige nøkler og surrogatnøkler
- velge referansehandlinger som `on update cascade` og `on delete set null`
- bruke `insert`, `update`, `delete` og `alter table`
- forklare hvorfor `update` og `delete` uten `where` er farlig

## Nøkler

En primærnøkkel identifiserer hver rad entydig. Den kan bestå av én eller flere kolonner og skal ikke ha `null`.

En kandidatnøkkel er en mulig primærnøkkel. En naturlig nøkkel finnes i domenet, for eksempel ISBN eller fødselsnummer. En surrogatnøkkel er et kunstig løpenummer.

En fremmednøkkel peker til en primærnøkkel i en annen tabell. Dette gir referanseintegritet: du kan ikke registrere en ordrelinje for en vare som ikke finnes.

## Datatyper

| Type | Bruk |
| --- | --- |
| `integer`, `bigint` | heltall |
| `numeric(p, s)` | eksakte desimaltall, for eksempel penger |
| `varchar(n)` | tekst med variabel lengde |
| `char(n)` | tekst med fast lengde |
| `date` | dato |
| `timestamp` | dato og klokkeslett |
| `boolean` | sann/usann |

Velg datatype ut fra betydning. Telefonnummer og postnummer bør ofte være tekst, selv om de består av sifre, fordi du vanligvis ikke skal regne med dem.

## Opprette tabeller

```sql
create table kategori (
    katnr integer primary key,
    navn varchar(40) unique not null
);

create table vare (
    vnr char(5) primary key,
    betegnelse varchar(80) not null,
    pris numeric(8, 2) not null check (pris >= 0),
    katnr integer references kategori(katnr),
    antall integer not null default 0,
    hylle varchar(5)
);
```

For sammensatte nøkler må nøkkelen normalt defineres separat:

```sql
create table ordrelinje (
    ordrenr integer,
    vnr char(5),
    pris_pr_enhet numeric(8, 2) not null,
    antall integer not null check (antall > 0),
    primary key (ordrenr, vnr),
    foreign key (ordrenr) references ordre(ordrenr),
    foreign key (vnr) references vare(vnr)
);
```

## Null, `unique` og standardverdi

- `not null` betyr at verdien må fylles ut.
- `unique` hindrer duplikater.
- `default` gir standardverdi når ingen verdi oppgis.
- `check` uttrykker en enkel forretningsregel.

En `unique not null`-kolonne kan være kandidatnøkkel, men er ikke automatisk primærnøkkelen.

## Oppslagstabeller

Hvis en verdi skal kontrolleres og gjenbrukes, bør den ofte ligge i en egen tabell.

```text
Kategori(katnr, navn)
Vare(vnr, betegnelse, pris, katnr*)
```

Dette unngår skrivefeil som `Hobbymaling`, `Hobby maling` og `hobby-maling` i varetabellen.

## Referansehandlinger

```sql
constraint ansatt_campus_fk
    foreign key (campus)
    references campus(navn)
    on update cascade
    on delete set null
```

Vanlige valg:

- `restrict` nekter sletting eller endring hvis rader peker dit
- `cascade` lar endringen følge videre
- `set null` fjerner koblingen, men beholder raden
- `set default` setter standardverdi

Velg ut fra domenet. Hvis en ansatt kan mangle campus midlertidig, kan `on delete set null` være rimelig. Hvis en ordrelinje ikke gir mening uten ordre, bør sletting ofte nektes eller kaskaderes bevisst.

## Endre innhold

Sett inn rad:

```sql
insert into ansatt (ansattnr, etternavn, stilling)
values (14, 'Hansen', 'Selger');
```

Sett inn fra spørring:

```sql
insert into gamle_prosjekter
select *
from prosjekt
where sluttdato <= date '2025-12-31';
```

Oppdater rader:

```sql
update ansatt
set lonn = lonn * 1.05
where stilling = 'Sekretaer';
```

Slett rader:

```sql
delete from vare
where katnr = 2;
```

Uten `where` gjelder `update` og `delete` alle rader.

## Endre struktur

```sql
alter table ansatt
add column epost varchar(120);
```

```sql
drop table vare;
```

`drop table` sletter tabellstrukturen. Hvis andre tabeller har fremmednøkler til tabellen, kan sletting feile eller kreve at avhengigheter håndteres.

## Skript og metadata

Et SQL-skript er en fil med SQL-setninger som kan kjøres samlet. Det er nyttig for å bygge opp testdatabaser på nytt.

Metadata er data om databasen: tabellnavn, kolonner, datatyper, nøkler og begrensninger. DBMS-et lagrer dette i systemkatalogen.

## Vanlige feil

- bruke upraktiske eller for vide datatyper uten begrunnelse
- glemme fremmednøkkel når domenet tydelig krever kobling
- velge `not null` der oppgaven åpner for manglende verdi
- glemme `where` ved `update` eller `delete`
- bruke surrogatnøkkel uten å bevare naturlige unikhetsregler
- skrive sammensatt nøkkel som to separate primærnøkler

## Typiske eksamensoppgaver

- skriv full SQL for å opprette tabeller
- legg inn testdata
- skriv `update`, `delete` eller `alter table`
- begrunn nøkkelvalg, datatyper og referanseintegritet

## Hva du bør øve på

- opprette små tabeller fra tekstbeskrivelse uten hjelp
- sammenligne naturlig nøkkel og surrogatnøkkel
- forklare når `on delete set null` er bedre enn `restrict`
