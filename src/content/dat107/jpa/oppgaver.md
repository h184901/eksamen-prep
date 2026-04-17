# Øvingsoppgaver

## Del 1: Grunnoppsett

1. Skriv en enkel entitetsklasse `Person` med `id`, `fornavn` og `etternavn`.
2. Forklar hva `persistence.xml` må inneholde for at prosjektet skal kunne koble til databasen.

## Del 2: CRUD og DAO

3. Skriv en DAO-metode som henter en `Ansatt` på primærnøkkel.
4. Skriv en DAO-metode som oppdaterer stilling og lønn for en ansatt.
5. Forklar når `merge` er naturlig å bruke.

## Del 3: Relasjoner

6. Modellér `Avdeling` og `Ansatt` som 1:N i JPA.
7. Forklar hvilken side som er owning side, og hvorfor.
8. Skriv en metode som henter alle ansatte i en avdeling.

## Del 4: Mange-til-mange

9. Modellér `Ansatt`, `Prosjekt` og `Prosjektdeltagelse` der deltagelse har feltene `rolle` og `timer`.
10. Forklar hvorfor dette ikke bør være ren `@ManyToMany`.

## Del 5: Arv og helhet

11. Forklar kort forskjellen på `JOINED`, `SINGLE_TABLE` og `TABLE_PER_CLASS`.
12. Skriv helper-metoder for å legge til og fjerne barn i en `@OneToMany`-relasjon.
