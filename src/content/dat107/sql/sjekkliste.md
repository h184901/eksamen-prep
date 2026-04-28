# Kortversjon Og Sjekkliste

## Spørringsrekkefølge

Skriverekkefølge:

```text
select -> from -> where -> group by -> having -> order by
```

Tenkerekkefølge:

```text
from -> where -> group by -> having -> select -> order by
```

## Hurtigsjekk for SQL-oppgaver

- Hvilke tabeller trengs?
- Hvilke fremmednøkler viser join-veien?
- Skal rader uten match også være med?
- Er betingelsen på enkeltrader eller grupper?
- Trengs aggregering?
- Skal resultatet sorteres?
- Skal du vise alle kolonner eller bare bestemte?
- Kan `null` påvirke svaret?

## `WHERE` eller `HAVING`

- Bruk `where` for radfilter før gruppering.
- Bruk `having` for gruppefilter etter `group by`.
- Ikke bruk mengdefunksjoner i `where`.

Eksempel:

```sql
select stilling, avg(lonn)
from ansatt
where lonn < 800000
group by stilling
having avg(lonn) > 500000;
```

## Join-sjekk

- Har hver join en `on`-betingelse?
- Kobler du på kolonner med samme betydning?
- Trenger du `left join` fordi oppgaven sier "også de uten ..."?
- Har du tatt med mellomtabeller i M:N-forhold?
- Teller du riktig kolonne etter `left join`?

## Tabeller og nøkler

- Hver tabell bør ha primærnøkkel.
- Fremmednøkkel peker til primærnøkkel i annen tabell.
- `not null` brukes når verdien er obligatorisk.
- `unique` uttrykker kandidatnøkkel eller unik forretningsregel.
- `check` kan uttrykke enkle forretningsregler.
- `update` og `delete` uten `where` gjelder alle rader.

## Avanserte spørringer

- `case` lager beregnede kategorier.
- `is null` og `is not null` brukes for nulltester.
- View er en virtuell tabell definert av en spørring.
- Delspørring må returnere riktig form: én verdi, én kolonne eller tabell.
- `exists` handler om om delspørringen returnerer rader.
- Vindusfunksjoner beregner over rader uten å slå dem sammen.

## Filer og indekser

- DBMS leser og skriver blokker, ikke enkeltrader direkte.
- Indeks hjelper når den reduserer antall blokker som må leses.
- Indeks koster lagringsplass og vedlikehold ved oppdatering.
- Sammensatt indeks hjelper best fra venstre mot høyre i kolonnerekkefølgen.
- B+-tre er en balansert flernivå-indeks.

## Transaksjoner

- `commit` gjør endringer permanente.
- `rollback` angrer transaksjonen.
- ACID: atomicity, consistency, isolation, durability.
- Tapt oppdatering: én oppdatering overskrives av en annen.
- Dirty read: leser ubekreftede data.
- Inkonsistent analyse: rapport blander gamle og nye verdier.
- Tofaselåsing gir serialiserbarhet, men kan gi vranglås.

## Ord du må kunne forklare

- database, DBMS, RDBMS
- DDL, DML, DCL
- primærnøkkel, kandidatnøkkel, fremmednøkkel
- `join`, `left join`, egenkobling
- `where`, `having`
- `null`
- view
- indeks, blokk, B+-tre
- transaksjon, ACID, lås, serialiserbarhet

## Vanlige eksamensfeller

- feil join-betingelse
- kartesisk produkt
- `where` i stedet for `having`
- glemme `group by`
- `= null` i stedet for `is null`
- bruke `count(*)` feil etter `left join`
- indeksere uten å begrunne søkemønster
- forklare transaksjoner uten å nevne `commit`/`rollback`
