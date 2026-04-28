# Øvingsoppgaver

## Del 1: Grunnleggende spørringer

1. Skriv en SQL-spørring som henter alle ansatte med lønn under 500000, sortert på etternavn.
2. Hent bare `ansattnr`, `fornavn`, `etternavn` og månedslønn.
3. Finn alle ansatte der etternavn begynner på `H`.
4. Finn alle ansatte som enten er `Selger` eller `Sekretaer`, og som tjener over 480000. Bruk parenteser.
5. Forklar forskjellen på `count(*)` og `count(lonn)`.

## Del 2: Gruppering

6. Finn antall ansatte per stilling.
7. Finn gjennomsnittslønn per stilling.
8. Finn stillinger med gjennomsnittslønn over 600000.
9. Skriv en spørring som bruker både `where`, `group by` og `having`.
10. Forklar hvorfor en vanlig kolonne i `select` ofte må stå i `group by`.

## Del 3: Tabeller og nøkler

11. Lag `create table` for `Campus(navn, telefonnr)` og `Ansatt(ansattnr, navn, campus)`, der `campus` er fremmednøkkel.
12. Begrunn om `campus` i `Ansatt` bør være `null` eller `not null` i to ulike scenarier.
13. Lag `Ordre` og `Ordrelinje` med sammensatt primærnøkkel i `Ordrelinje`.
14. Skriv SQL som legger inn tre campuser og fem ansatte.
15. Skriv en `update` som øker lønnen med 3 prosent for én stilling.
16. Skriv en `delete` som sletter utvalgte rader, og forklar hva som skjer uten `where`.

## Del 4: Joins

17. Skriv en spørring som viser alle ansatte med telefonnummer til campus.
18. Skriv samme idé med `left join` og forklar hva som endres.
19. Lag et eksempel på en feil join som gir kartesisk produkt, og forklar hvorfor den er feil.
20. Finn kunder som har ordre, ved hjelp av `join`.
21. Finn kunder som ikke har ordre, ved hjelp av `left join` eller `not exists`.
22. Skriv en egenkobling for ansatte og ledere.

## Del 5: Avanserte spørringer

23. Bruk `case` til å dele varer i `Billig`, `Middels` og `Dyr`.
24. Lag et view som viser ordrelinjer med varenavn og kategori.
25. Finn ansatte som tjener mer enn gjennomsnittet.
26. Finn ansatte som tjener mer enn gjennomsnittet i sin egen stilling.
27. Skriv en spørring med `exists`.
28. Skriv en enkel vindusfunksjon som viser løpende sum per dato.

## Del 6: Filer og indekser

29. Skriv SQL for å opprette en indeks på `Ansatt(etternavn, fornavn)`.
30. Forklar når en slik indeks er nyttig.
31. Forklar når en slik indeks ikke er verdt kostnaden.
32. Forklar forskjellen på sekvensielt søk og indeksbasert søk.
33. Forklar hva en blokk er, og hvorfor disk-I/O er viktig.
34. Forklar hovedideen i et B+-tre.

## Del 7: Transaksjoner

35. Beskriv et scenario som kan gi tapt oppdatering.
36. Forklar dirty read med et konkret eksempel.
37. Skriv en kort transaksjon for pengeoverføring eller ordreinnlegging.
38. Forklar hvorfor `commit` og `rollback` er viktige.
39. Forklar ACID med én setning per bokstav.
40. Forklar hvordan låsing kan hindre tapt oppdatering, og hvorfor vranglås kan oppstå.
