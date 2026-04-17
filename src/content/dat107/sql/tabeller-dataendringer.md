# Tabeller Og Dataendringer

## Kjernen

Denne delen handler om å definere databasen og endre innholdet i den på en kontrollert måte.

## Dette må du kunne

- skrive `create table` med riktige kolonner og datatyper
- velge `null` eller `not null`
- definere primærnøkkel, `unique` og fremmednøkkel
- velge passende `on update` og `on delete`
- bruke `insert`, `update`, `delete` og `alter table`

## Typisk mønster

```sql
create table campus (
    navn varchar(50) primary key,
    telefonnr varchar(20) not null
);

create table ansatt (
    ansattnr integer primary key,
    navn varchar(100) not null,
    campus varchar(50),
    constraint ansatt_campus_fk
        foreign key (campus)
        references campus(navn)
        on update cascade
        on delete set null
);
```

## Datatyper du bør beherske

- `integer`
- `numeric(p,s)`
- `varchar(n)`
- `date`
- `timestamp`
- `boolean`

## Vanlige feil

- bruke upraktiske eller for vide datatyper uten begrunnelse
- glemme fremmednøkkel når domenet tydelig krever kobling
- velge `not null` der oppgaven uttrykkelig åpner for manglende verdi
- slette eller oppdatere uten `where`

## Typiske eksamensoppgaver

- skriv full SQL for å opprette tabell
- skriv kode for å legge inn testdata
- skriv SQL for å fjerne eller legge til kolonne
- begrunn nøkkelvalg og referanseintegritet

## Hva du bør øve på

- opprette små tabeller fra tekstbeskrivelse uten hjelp
- sammenligne naturlig nøkkel og surrogatnøkkel
- forklare når `on delete set null` er bedre enn `restrict`
