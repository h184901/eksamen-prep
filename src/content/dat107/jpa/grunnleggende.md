# Grunnleggende JPA

## Kjernen

JPA brukes for å jobbe med relasjonsdata som Java-objekter. I DAT107 må du forstå både objektmodellen og databasen samtidig.

## Dette må du kunne

- forklare hva ORM er
- sette opp et enkelt JPA-prosjekt med `pom.xml` og `persistence.xml`
- lage en enkel entitetsklasse med `@Entity`, `@Table` og `@Id`
- bruke `EntityManagerFactory` og `EntityManager` riktig

## Typisk minimumseksempel

```java
@Entity
@Table(schema = "forelesning1")
public class Person {
    @Id
    private int id;
    private String navn;
}
```

## Hva kursopplegget bygger på

- først få kontakt mellom Java og databasen
- deretter hente én entitet med `find`
- så bygge DAO-er og mer logikk gradvis

## Vanlige feil

- tro at JPA fjerner behovet for å forstå databasen
- glemme `persistence.xml`
- blande oppsett for Maven, JDBC og JPA uten struktur

## Typiske eksamensoppgaver

- skriv en entitetsklasse ut fra en enkel tabellskisse
- forklar hva `@Entity` og `@Id` gjør
- forklar hva som må til for å få JPA-oppsett til å virke

## Hva du bør øve på

- lage en minimal entitet fra bunnen av
- forklare forskjellen på JDBC-tenkning og JPA-tenkning
