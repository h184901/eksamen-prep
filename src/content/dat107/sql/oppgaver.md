# Øvingsoppgaver

## Del 1: Spørringer

1. Skriv en SQL-spørring som henter alle ansatte med lønn under 500000, sortert på etternavn.
2. Skriv en SQL-spørring som finner antall ansatte per stilling.
3. Skriv en SQL-spørring som finner stillinger med gjennomsnittslønn over 600000.
4. Forklar forskjellen på disse to:
   - filtrering med `where`
   - filtrering med `having`

## Del 2: Tabeller og nøkler

5. Lag `create table` for `Campus(navn, telefonnr)` og `Ansatt(ansattnr, navn, campus)` der `campus` er fremmednøkkel.
6. Begrunn om `campus` i `Ansatt` bør være `null` eller `not null` i to ulike scenarier.
7. Skriv SQL som legger inn tre campuser og fem ansatte.

## Del 3: Joins

8. Skriv en spørring som viser alle ansatte med telefonnummer til campus.
9. Skriv samme idé med `left join` og forklar hva som endres.
10. Lag et eksempel på en feil join som gir kartesisk produkt, og forklar hvorfor den er feil.

## Del 4: Indekser og transaksjoner

11. Skriv SQL for å opprette en indeks på `navn` i `Ansatt`.
12. Forklar når en slik indeks er nyttig, og når den ikke er det.
13. Beskriv et scenario som kan gi lost update.
14. Skriv en kort transaksjon for pengeoverføring eller ordreinnlegging og forklar hvorfor `commit` og `rollback` er viktige.
