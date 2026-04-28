# Spørringer Mot Én Tabell

## Kjernen

Dette er grunnmønsteret for en utvalgsspørring:

```sql
select kolonner_og_uttrykk
from tabell
where radbetingelse
group by grupperingskolonner
having gruppebetingelse
order by sorteringskolonner;
```

Ikke alle delene brukes hver gang, men du må vite hva de gjør og hvilken type problem de løser.

## Dette må du kunne

- bruke `select`, `from`, `where`, `order by`, `group by` og `having`
- velge kolonner og rader korrekt
- bruke `distinct`
- sortere stigende og synkende
- bruke `and`, `or`, `not` og parenteser
- bruke `like`, `between`, `is null` og vanlige funksjoner
- bruke `count`, `avg`, `sum`, `min` og `max`
- skille klart mellom `where` og `having`

## Velge kolonner

```sql
select ansattnr, etternavn
from ansatt0;
```

`select *` er nyttig når du utforsker tabellen, men i eksamenssvar bør du normalt velge kolonnene oppgaven spør etter.

Fjern duplikater:

```sql
select distinct stilling
from ansatt0;
```

`distinct` gjelder hele raden i resultatet, ikke bare én kolonne isolert.

## Velge rader med `WHERE`

```sql
select *
from ansatt0
where lonn < 480000;
```

En `where`-betingelse evalueres for hver rad. Rader der betingelsen er sann, blir med.

Sammensatte betingelser:

```sql
select *
from ansatt0
where lonn > 480000
  and (stilling = 'Selger' or stilling = 'Sekretaer');
```

Bruk parenteser når du blander `and` og `or`. Uten parenteser er det lett å få en annen logikk enn du mente.

## Sortering

```sql
select etternavn, stilling, lonn
from ansatt0
order by stilling asc, lonn desc;
```

`asc` er standard. `desc` gir synkende rekkefølge. Sortering skjer bare i resultatet, ikke i selve tabellen.

## Jokersøk og intervall

```sql
select *
from ansatt0
where etternavn like 'F%';
```

`%` betyr vilkårlig tekststreng. `like 'F%'` betyr at verdien starter med `F`.

Intervall:

```sql
select *
from ansatt0
where lonn between 450000 and 600000;
```

`between` inkluderer vanligvis begge endepunktene.

## Uttrykk, alias og funksjoner

```sql
select ansattnr,
       etternavn,
       lonn / 12 as manedslonn
from ansatt0;
```

Alias med `as` gjør resultatet lettere å lese.

Funksjoner:

```sql
select ansattnr, upper(etternavn) as etternavn_store
from ansatt0;
```

Datofunksjoner varierer mer mellom DBMS-er enn enkel `select`-syntaks. I PostgreSQL kan du for eksempel bruke `extract`.

## Mengdefunksjoner

| Funksjon | Betydning |
| --- | --- |
| `count(*)` | teller alle rader |
| `count(kolonne)` | teller ikke-null verdier |
| `avg(kolonne)` | gjennomsnitt |
| `sum(kolonne)` | sum |
| `min(kolonne)` | minste verdi |
| `max(kolonne)` | største verdi |

Eksempel:

```sql
select avg(lonn) as snittlonn
from ansatt0;
```

Viktig felle: `count(*)` og `count(kolonne)` er ikke alltid like, fordi `count(kolonne)` hopper over `null`.

## `GROUP BY`

```sql
select stilling, avg(lonn) as snittlonn
from ansatt0
group by stilling;
```

Når du grupperer, skal vanlige kolonner i `select` normalt også stå i `group by`. Mengdefunksjoner beregnes per gruppe.

## `WHERE` versus `HAVING`

- `where` filtrerer enkeltrader før gruppering
- `having` filtrerer grupper etter gruppering

```sql
select stilling, avg(lonn) as snittlonn, count(*) as antall
from ansatt0
where lonn < 800000
group by stilling
having avg(lonn) > 500000;
```

`where lonn < 800000` fjerner rader før gruppering. `having avg(lonn) > 500000` fjerner grupper etter at gjennomsnittet er regnet ut.

## Logisk rekkefølge

SQL skrives som:

```text
select -> from -> where -> group by -> having -> order by
```

Men mentalt kan du lese den slik:

```text
from -> where -> group by -> having -> select -> order by
```

Det forklarer hvorfor alias fra `select` ikke alltid kan brukes i `where`.

## Vanlige feil

- bruke `having` når du egentlig mener `where`
- glemme `group by` når du blander vanlig kolonne og mengdefunksjon
- blande `and` og `or` uten parenteser
- bruke `=` i stedet for `like` ved jokersøk
- tro at `count(kolonne)` teller alle rader
- teste `kolonne = null` i stedet for `kolonne is null`

## Typiske eksamensoppgaver

- finn rader som oppfyller en betingelse
- finn gjennomsnitt, antall eller sum per gruppe
- finn grupper som oppfyller en betingelse
- skriv spørring med sortering og alias
- forklar forskjellen på `where` og `having`

## Hva du bør øve på

- skrive samme oppgave først med bare `where`, deretter med `group by` og `having`
- forklare hvorfor parenteser kan endre resultatet
- bruke `like`, `is null` og mengdefunksjoner sikkert
