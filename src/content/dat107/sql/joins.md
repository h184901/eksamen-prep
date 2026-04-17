# Joins Og Spørringer Mot Flere Tabeller

## Kjernen

Når databasen er normalisert, ligger data ofte i flere tabeller. Da må du kunne koble dem sammen igjen med joins.

## Dette må du kunne

- bruke `join ... on ...`
- forstå forskjellen på `join` og `left join`
- bruke aliaser ryddig
- følge fremmednøkler riktig gjennom flere tabeller
- oppdage kartesisk produkt

## Typiske mønstre

```sql
select a.navn, c.telefonnr
from ansatt a
join campus c on a.campus = c.navn;
```

```sql
select a.navn, c.telefonnr
from ansatt a
left join campus c on a.campus = c.navn;
```

## `JOIN` versus `LEFT JOIN`

- `join` tar bare med rader som har treff på begge sider
- `left join` tar også med rader fra venstre side uten treff

Dette går igjen i oppgaver med manglende koblinger, for eksempel passering uten skilt eller ansatt uten campus.

## Vanlige feil

- glemme join-betingelsen
- skrive feil koblingskolonner
- velge `join` der oppgaven egentlig krever at rader uten treff også skal med
- tro at flere tabeller automatisk betyr flere joins uten å sjekke modellen

## Typiske eksamensoppgaver

- hent info fra to eller tre tabeller samtidig
- vis også rader uten treff
- tell antall per gruppe etter join
- skriv en selv-join eller forklar hva som er nødvendig for det

## Hva du bør øve på

- omskrive én oppgave både med `join` og `left join` og forklare forskjellen
- lese en ER-modell og peke ut hvilke joins en spørring trenger
- oppdage kartesisk produkt i en bevisst feilspørring
