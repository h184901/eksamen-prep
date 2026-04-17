# Filer Og Indekser

## Kjernen

Denne delen forklarer hvorfor databasen kan finne noen ting raskt og andre ting tregt.

## Dette må du kunne

- forklare at disklesing skjer i blokker
- forklare hvorfor indekser kan gjøre oppslag raskere
- kjenne idéen bak B+-tre
- vite at indekser også har en kostnad ved oppdatering og lagring

## Typiske poenger

- heap-fil er enkel, men gir ofte tregt søk
- sortert fil hjelper noen oppslag, men gjør innsetting dyrere
- indeks er en ekstra struktur som peker inn i dataene

Typisk SQL:

```sql
create index ansatt_navn_idx on ansatt(navn);
```

## Vanlige feil

- tro at indeks alltid hjelper
- glemme at små tabeller ofte ikke trenger indeks
- lage indeks uten tanke på faktisk søkemønster

## Typiske eksamensoppgaver

- forklar når indeks er nyttig
- opprett indeks på gitt kolonne
- sammenlign sekvensielt søk og indeksbasert søk på et overordnet nivå

## Hva du bør øve på

- begrunne hvorfor en gitt kolonne bør eller ikke bør indekseres
- skille mellom teoriforklaring og SQL-syntaks for indeks
