# Øvingsoppgaver

## Del 1: Grunnoppsett

1. Skriv en enkel entitetsklasse `Person` med `id`, `fornavn` og `etternavn`.
2. Forklar hva `persistence.xml` må inneholde for at prosjektet skal kunne koble til databasen.
3. Forklar forskjellen på JPA, EclipseLink og PostgreSQL JDBC-driver.
4. Skriv et minimalt `EntityManagerFactory`-oppsett og et `find()`-oppslag.

## Del 2: Ansatt-øvingen

5. Lag en tabell `ansatt` med `brukernavn`, `fornavn`, `etternavn`, `ansettelsesdato`, `stilling` og `maanedslonn`.
6. Skriv entitetsklassen `Ansatt` med riktige Java-typer.
7. Forklar hvorfor `LocalDate` passer for `ansettelsesdato`.
8. Skriv et program som henter `Ansatt` med `em.find(Ansatt.class, brukernavn)`.

## Del 3: CRUD og DAO

9. Skriv en DAO-metode som henter en `Ansatt` på primærnøkkel.
10. Skriv en DAO-metode som oppdaterer stilling og lønn for en ansatt.
11. Forklar når `merge()` er naturlig å bruke.
12. Forklar hvorfor `remove()` krever managed entitet.

## Del 4: Relasjoner

13. Modellér `Vitnemal` og `Karakter` som 1:N i JPA.
14. Forklar hvilken side som er owning side, og hvorfor.
15. Skriv `@ManyToOne`-feltet på `Karakter`.
16. Skriv `@OneToMany(mappedBy = "...")`-feltet på `Vitnemal`.
17. Forklar forskjellen på fremmednøkkel i databasen og objektreferanse i Java.

## Del 5: En-til-en og `flush()`

18. Modellér `Ansatt` og `Rom` som 1:1 der `Ansatt` har fremmednøkkelen.
19. Forklar hvorfor sirkulære fremmednøkler kan skape høna-og-egget-problemer.
20. Forklar hva `em.flush()` gjør og når det kan være nyttig.

## Del 6: Mange-til-mange

21. Modellér `Ansatt`, `Prosjekt` og `Prosjektdeltagelse` der deltagelse har feltene `rolle` og `timer`.
22. Forklar hvorfor dette ikke bør være ren `@ManyToMany`.
23. Sammenlign sammensatt primærnøkkel og kunstig primærnøkkel for `Prosjektdeltagelse`.
24. Skriv en hjelpemetode eller konstruktør som oppdaterer begge sider av relasjonen.

## Del 7: Arv og helhet

25. Forklar kort forskjellen på `JOINED`, `SINGLE_TABLE` og `TABLE_PER_CLASS`.
26. Forklar hvorfor `SINGLE_TABLE` ofte gir mange `NULL`-kolonner.
27. Skriv hjelpemetoder for å legge til og fjerne barn i en `@OneToMany`-relasjon.
28. Forklar `cascade = { PERSIST, MERGE }` og `orphanRemoval = true` i todoliste-eksempelet.

## Del 8: Eksamensdrilling

29. Ta en tabellskisse og skriv entitetsklasse uten å se i notatene.
30. Ta et klassediagram med relasjoner og pek ut owning side for hver relasjon.
31. Forklar muntlig hvorfor en M:N-relasjon med attributter blir egen entitet.
32. Skriv tre vanlige JPA-feil og hvordan du oppdager dem i kode.
