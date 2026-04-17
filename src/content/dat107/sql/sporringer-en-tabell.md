# Spørringer Mot Én Tabell

## Kjernen

Dette er grunnmønsteret for en utvalgsspørring:

```sql
select kolonner
from tabell
where radbetingelse
group by grupperingskolonner
having gruppebetingelse
order by sortering;
```

Ikke alle delene brukes hver gang, men du må forstå hva hver del gjør og i hvilken logisk rekkefølge de virker.

## Dette må du kunne

- bruke `select`, `from`, `where`, `order by`, `group by`, `having`
- velge kolonner og rader korrekt
- bruke `distinct`
- sortere stigende og synkende
- bruke mengdefunksjoner som `count`, `avg`, `sum`, `min`, `max`
- skille klart mellom `where` og `having`

## Typiske mønstre

```sql
select ansattnr, etternavn
from ansatt0;
```

```sql
select *
from ansatt0
where lønn < 480000;
```

```sql
select stilling, avg(lønn) as snittlønn
from ansatt0
group by stilling;
```

```sql
select stilling, avg(lønn) as snittlønn
from ansatt0
where lønn < 800000
group by stilling
having avg(lønn) > 500000;
```

## `WHERE` versus `HAVING`

- `where` filtrerer enkeltrader før gruppering
- `having` filtrerer grupper etter gruppering

Dette er en av de vanligste eksamensfellene i SQL-delen.

## Vanlige feil

- bruke `having` når du egentlig mener `where`
- glemme `group by` når du har både vanlig kolonne og mengdefunksjon i resultatet
- blande `and` og `or` uten parenteser
- tro at `count(kolonne)` og `count(*)` alltid gir samme resultat

## Typiske eksamensoppgaver

- finn rader som oppfyller en betingelse
- finn gjennomsnitt, antall eller sum per gruppe
- finn grupper som oppfyller en betingelse
- skriv spørring med sortering og alias

## Hva du bør øve på

- skrive samme oppgave først med bare `where`, deretter med `group by` og `having`
- forklare hvorfor parenteser kan endre resultatet
- bruke `like`, `is null` og mengdefunksjoner sikkert
