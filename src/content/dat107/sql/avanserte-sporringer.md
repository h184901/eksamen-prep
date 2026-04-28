# Avanserte Spørringer

## Kjernen

Her flytter SQL seg fra grunnleggende uthenting til mer presis logikk med `case`, `null`, views, delspørringer, avansert aggregering og vindusfunksjoner. Dette er typisk der eksamensoppgaver blir mer enn "velg rader fra én tabell".

## Dette må du kunne

- skrive `case`-uttrykk
- håndtere `null` med `is null` og `is not null`
- forklare treverdilogikk
- lage og bruke views
- skrive delspørringer med `in`, `exists`, `all` og `some`
- skille vanlig og korrelert delspørring
- kjenne `group by cube`/`rollup` på idé-nivå
- skrive en enkel vindusfunksjon

## `CASE`

```sql
select vnr, betegnelse, pris,
       case
         when pris < 100 then 'Billig'
         when pris <= 500 then 'Middels'
         else 'Dyr'
       end as prisklasse
from vare;
```

`case` lager en beregnet verdi i resultatet. Det endrer ikke tabellen.

## `NULL` og treverdilogikk

SQL har `true`, `false` og ukjent. `null` betyr manglende eller ukjent verdi, ikke tallet 0 og ikke tom tekst.

Riktig:

```sql
where sendt_dato is null
```

Feil:

```sql
where sendt_dato = null
```

Sammenligninger med `null` blir ukjent. Dette påvirker særlig `not in`, ytre koblinger og sammensatte betingelser.

## Views

Et view er en virtuell tabell definert av en spørring.

```sql
create view stillinger_i_bruk as
select distinct stilling
from ansatt;

select count(*) as antall
from stillinger_i_bruk;
```

Views brukes til å:

- lagre en nyttig spørring i databasen
- skjule kompliserte joins
- gi ulike brukergrupper et enklere bilde
- bevare et gammelt grensesnitt etter intern omstrukturering

Sorter i spørringen mot viewet, ikke inne i view-definisjonen, hvis du vil ha bestemt rekkefølge.

## Oppdaterbare views

Noen views kan oppdateres, men ikke alle. Views med `group by`, mengdefunksjoner eller kompliserte joins er ofte ikke oppdaterbare.

```sql
create view dyre_varer as
select *
from vare
where pris > 1000
with check option;
```

`with check option` hindrer at du oppdaterer en rad slik at den ikke lenger hører hjemme i viewet.

## Delspørringer

Finn ansatte som tjener mer enn gjennomsnittet:

```sql
select *
from ansatt
where lonn > (
    select avg(lonn)
    from ansatt
);
```

Her må delspørringen returnere én verdi, fordi den sammenlignes med `>`.

Delspørring i `from`:

```sql
select count(*) as antall_stillinger
from (
    select distinct stilling
    from ansatt
) as stillinger_i_bruk;
```

Da fungerer delspørringen som en midlertidig tabell.

## Korrelert delspørring

En korrelert delspørring refererer til raden i hovedspørringen.

Finn ansatte som tjener mer enn gjennomsnittet i sin egen stilling:

```sql
select a1.*
from ansatt as a1
where a1.lonn > (
    select avg(a2.lonn)
    from ansatt as a2
    where a2.stilling = a1.stilling
);
```

Hovedspørringen prøver én ansatt om gangen, og delspørringen beregner relevant gjennomsnitt for akkurat den stillingen.

## `IN`, `ALL`, `SOME` og `EXISTS`

`in` tester om en verdi finnes i en mengde:

```sql
select *
from kunde
where knr in (
    select knr
    from ordre
);
```

`exists` tester om delspørringen gir minst én rad:

```sql
select k.*
from kunde as k
where exists (
    select 1
    from ordre as o
    where o.knr = k.knr
);
```

`all` betyr at sammenligningen må gjelde for alle verdier i delspørringen. `some` betyr at det holder med minst én.

## Vindusfunksjoner

Vindusfunksjoner lar deg vise enkeltrader sammen med beregninger over et vindu av rader.

![Vindusfunksjon med glidende vindu](/content/dat107/assets/sql/vindusfunksjon-vindu.png)

Kumulativ sum:

```sql
select dato, nedbor,
       sum(nedbor) over (
           order by dato
           rows between unbounded preceding and current row
       ) as akkumulert
from daglig_nedbor;
```

Glidende gjennomsnitt:

```sql
select dato, nedbor,
       avg(nedbor) over (
           order by dato
           rows between 3 preceding and 3 following
       ) as ukesnitt
from daglig_nedbor;
```

Forskjellen fra `group by` er at radene ikke slås sammen.

## Avansert aggregering

`group by cube` og `group by rollup` brukes til subtotaler i analyse:

```sql
select vnr, fylkenr, sum(antall) as samlet
from salgstall
group by cube(vnr, fylkenr);
```

Dette er mer OLAP/datavarehus enn grunnleggende transaksjons-SQL. Til eksamen bør du kjenne ideen, selv om vanlige `group by`-oppgaver er viktigere.

## Grenser for SQL

Noen problemer passer dårlig som ren SQL, for eksempel vilkårlig dype hierarkier. Da kombinerer man ofte SQL med programmeringskode, eller bruker rekursive SQL-muligheter dersom DBMS-et støtter det.

## Vanlige feil

- teste `kolonne = null`
- bruke delspørring uten å vite om den returnerer én verdi, én kolonne eller flere rader
- tro at `in` og `exists` alltid betyr det samme
- glemme at `not in` kan bli farlig sammen med `null`
- beskrive views som alltid lagrede kopier
- bruke vindusfunksjon når vanlig `group by` er nok, eller motsatt

## Typiske eksamensoppgaver

- finn rader over gjennomsnitt
- finn rader som mangler eller har kobling til noe annet
- bruk `case` til å dele data i grupper
- forklar hva et view brukes til
- skriv eller forklar en enkel vindusfunksjon

## Hva du bør øve på

- løse samme oppgave både med join og delspørring
- forklare når `exists` er naturlig
- håndtere `null` presist i SQL og i forklaringsteksten
