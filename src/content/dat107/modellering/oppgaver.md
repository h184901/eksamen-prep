# Øvingsoppgaver

## Del 1: Relasjonsmodellen

1. Forklar med egne ord hvorfor rekkefølgen på rader ikke betyr noe i relasjonsmodellen.
2. Gi et eksempel på en tabell som bryter kravet om atomære verdier, og normaliser den.
3. Finn kandidatnøkler i `Student(studentnr, fodselsnr, epost, navn)` når alle tre første kolonner er unike.
4. Skriv tre funksjonelle avhengigheter for `Vare(vnr, betegnelse, katnr, katnavn, pris)`.
5. Forklar forskjellen på seleksjon og projeksjon, og gi SQL-ekvivalent.

## Del 2: ER-modellering

6. Les teksten: "En forening har medlemmer. Hvert medlem tilhører ett lokallag. Lokallagene har et navn og en adresse." Tegn ER-modell med kardinaliteter.
7. Utvid forrige oppgave: "Medlemmer betaler medlemsavgift hvert år. Beløpet kan variere fra år til år." Hvordan endrer dette ER-modellen?
8. Modellér et bibliotek der en bok kan lånes ut mange ganger til ulike lånere. Vis hvorfor `Utlån` bør være egen entitet.
9. Gi et eksempel på en svak entitet og forklar hvorfor den er svak.
10. Modellér ansatte der en ansatt kan være leder for flere andre ansatte. Vis roller i egenforholdet.
11. Lag et eksempel der noe først ser ut som et attributt, men bør være egen entitet.

## Del 3: Mapping til tabeller

12. Mapp en 1:N-relasjon mellom `Avdeling` og `Ansatt` til tabeller. Hvor plasseres fremmednøkkelen, og hvorfor?
13. Mapp en M:N-relasjon mellom `Student` og `Emne` til tabeller. Legg til `karakter` og `eksamensdato`.
14. Mapp `Kino` og svak entitet `Kinosal`, der salnummer bare er unikt innen én kino.
15. Vis to ulike måter å mappe en 1:1-relasjon mellom `Ansatt` og `Kontor`.
16. Velg en strategi for subtypene `Kjoretoy`, `Personbil` og `Lastebil`, og begrunn valget.

## Del 4: Normalisering

17. Forklar 1NF, 2NF og 3NF med egne ord og ett eksempel per nivå.
18. Normaliser `Ansatt(ansattnr, navn, postnr, poststed)` når `postnr -> poststed`.
19. Normaliser `ProsjektDeltakelse(ansnr, prosjektnr, ant_timer, ansattnavn)` når `(ansnr, prosjektnr) -> ant_timer` og `ansnr -> ansattnavn`.
20. Finn bruddet: `Vare(vnr, betegnelse, katnr, katnavn)`. Hvilken normalform brytes, og hvordan fikser du det?
21. Forklar hvorfor `Kommune1(kommunenr, navn)` og `Kommune2(kommunenr, areal)` er svakere enn én samlet `Kommune`-tabell.
22. Forklar hvorfor medlemsavgift per år ofte krever en egen tabell, og koble forklaringen til normalisering.

## Del 5: Eksamensdrilling

23. Bruk en valgfri tekstbeskrivelse fra en tidligere eksamensoppgave. Lag først ER-modell, deretter tabeller med `PK` og `FK`.
24. Skriv antakelser for en oppgave der kardinaliteten ikke er helt tydelig.
25. Finn én mulig fan trap eller chasm trap i en modell du har tegnet selv, og forklar hvordan du ville forbedret den.
