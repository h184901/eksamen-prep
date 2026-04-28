# Øvingsoppgaver

## Del 1: Oblig 1 SQL

1. Lag et minimalt SQL-design for bompenger med `Bil` og `Passering`.
2. Legg inn testdata med minst én passering uten lest skilt.
3. Skriv en spørring som viser alle passeringer, også de uten bil.
4. Skriv en spørring som viser bare passeringer med kjent bil.
5. Forklar hvorfor disse to spørringene ikke bør bruke samme join-type.
6. Skriv en spørring som teller passeringer per registreringsnummer.
7. Forklar hvordan du ville håndtert utenlandske registreringsnummer.

## Del 2: Oblig 2 modellering

8. Tegn en tekstskisse for `Medlem`, `Lokallag` og `Medlemsavgift`.
9. Forklar hvorfor `Medlemsavgift(medlemsnr, aar, betalt)` er bedre enn `betalt2019`, `betalt2020`, `betalt2021`.
10. Skriv tre funksjonelle avhengigheter fra foreningscaset.
11. Forklar hvordan du modellerer leder når leder også er medlem.
12. Forklar 1NF, 2NF og 3NF for betalingshistorikken.
13. Finn ett sted der modellen kan bli inkonsistent hvis teksten og figuren ikke stemmer.

## Del 3: Oblig 3 JPA

14. Skriv en minimal `Ansatt`-entitet med `@Entity`, `@Table`, `@Id` og `@GeneratedValue`.
15. Skriv en DAO-metode `finnAnsattMedId(int id)`.
16. Forklar hva som må stå i `persistence.xml`.
17. Skisser `Ansatt` og `Avdeling` med JPA-annotasjoner.
18. Forklar høna-og-egget-problemet med ansatt, avdeling og sjef.
19. Modellér `Ansatt`, `Prosjekt` og `Prosjektdeltagelse` der deltagelse har `rolle` og `timer`.
20. Forklar hvorfor `Prosjektdeltagelse` er egen entitet.

## Del 4: Oblig 4 NoSQL

21. Skriv en tabellskisse for `KUNDE_NY(knr, kunde_xml)`.
22. Skriv et lite XML-dokument for én kunde.
23. Forklar hvordan `xpath()` kan hente fornavn fra XML-kolonnen.
24. Forklar hvorfor ordrelinjer må aggregeres når de bygges inn i `ordre_xml`.
25. Skriv et JSON-dokument for én ordre med to ordrelinjer.
26. Forklar hvorfor `ordre` passer bedre som embedded dokument enn `kunde` med alle ordre embedded.
27. Forklar hva `findByKnr`, `save`, `delete` og `update` gjør i et repository.

## Del 5: Tverrgående eksamensdrill

28. Velg én av obligene og skriv tre deloppgaver du tror kunne dukket opp på eksamen i nesten samme form.
29. Ta ett spesialtilfelle fra hver oblig og forklar hvordan modellen håndterer det.
30. Skriv en kort drøfting av relasjonsmodell versus dokumentmodell for Hobbyhuset.
31. Skriv en kort drøfting av naturlig nøkkel versus surrogatnøkkel i ett obligcase.
32. Forklar hvordan du ville dokumentert en delvis uferdig løsning på en faglig ryddig måte.
