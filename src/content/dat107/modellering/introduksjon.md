# Introduksjon

## Kjernen

Modellering er egen hoveddel av DAT107 og teller rundt 25 % av eksamen. Her lærer du å gå fra en tekstbeskrivelse av et domene til en ER-modell, og videre til en tabellstruktur som er minst i 3NF.

## Dette må du kunne

- skille relasjonsmodellen (teori) fra tabell-SQL (syntaks)
- identifisere entiteter, attributter og relasjoner fra tekst
- angi kardinalitet (1:1, 1:N, M:N) og svake entiteter
- mappe modellen til tabeller med riktige nøkler og fremmednøkler
- vise at tabellene er i 1NF, 2NF og 3NF med funksjonelle avhengigheter

## Forholdet til de andre delene

- **SQL** bruker resultatet av modelleringen: tabellene du har laget.
- **JPA** annoterer Java-klasser som speiler modellen.
- **NoSQL** er et alternativ når relasjonsmodellen ikke passer.

## Hva skiller modellering fra SQL

SQL handler om syntaks og spørringer mot en ferdig tabellstruktur. Modellering handler om å lage strukturen riktig i utgangspunktet. En oppgave kan be deg tegne ER-modell, vise 3NF, eller forklare hvorfor en relasjon må bli en egen tabell — uten å skrive én linje SQL.

## Typiske eksamensoppgaver

- tegn ER-modell av et domene ut fra en tekstbeskrivelse
- mapp ER-modell til tabeller og begrunn valg av nøkler
- vis at tabellene er i 3NF, eller pek på bruddet og fiks det
- forklar hvorfor historiske data krever egen tabell

## Hva du bør øve på

- lese tekst og raskt finne entiteter, relasjoner og regler
- begrunne 1:N vs. M:N med konkrete eksempler fra teksten
- skrive opp funksjonelle avhengigheter og bruke dem i 3NF-argumentasjon
