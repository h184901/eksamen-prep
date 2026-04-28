# Grunnleggende JPA

## Kjernen

JPA brukes for å jobbe med relasjonsdata som Java-objekter. I DAT107 må du forstå begge modellene samtidig: Java-klasser og objektreferanser på den ene siden, tabeller og fremmednøkler på den andre.

![Java og relasjonsdatabaser modellerer data ulikt](/content/dat107/assets/jpa/orm-to-verdener.png)

## Dette må du kunne

- forklare hva ORM og "object-relational impedance mismatch" betyr
- forklare forskjellen på JPA, EclipseLink og JDBC-driver
- sette opp et enkelt JPA-prosjekt med `pom.xml` og `persistence.xml`
- lage en enkel entitetsklasse med `@Entity`, `@Table` og `@Id`
- bruke `EntityManagerFactory` og `EntityManager`
- skrive et enkelt `find()`-oppslag og en enkel JPQL-spørring

## Hvorfor JPA trengs

Java og relasjonsdatabaser passer ikke direkte sammen:

| Java / objektorientert | Relasjonsdatabase |
| --- | --- |
| Klasser | Tabeller |
| Objekter | Rader |
| Referanser til objekter | Fremmednøkler |
| Sammensatte objekter | Data fordelt på flere tabeller |
| Arv | Må modelleres med tabellstrategi |

ORM betyr Object Relational Mapping. Poenget er at rammeverket mapper mellom Java-objekter og relasjonstabeller, slik at programmet kan jobbe mer objektorientert enn ved ren JDBC.

## Verktøy og oppsett

Kurset bruker typisk:

| Del | Rolle |
| --- | --- |
| PostgreSQL | Databasetjener |
| Maven | Henter avhengigheter og bygger prosjektet |
| Jakarta Persistence API | JPA-spesifikasjonen |
| EclipseLink | JPA-provider/implementasjon |
| PostgreSQL JDBC-driver | Faktisk databasekobling |

Viktig eksamenspoeng: JPA er en spesifikasjon, mens EclipseLink er en implementasjon/provider.

## Maven og prosjektstruktur

I et Maven-prosjekt ligger Java-kode og ressurser normalt slik:

| Innhold | Plassering |
| --- | --- |
| Java-kode | `src/main/java` |
| Ressurser, blant annet `persistence.xml` | `src/main/resources` |
| `persistence.xml` | `src/main/resources/META-INF/persistence.xml` |
| Prosjektoppsett | `pom.xml` |

Typiske avhengigheter:

```xml
<dependency>
    <groupId>jakarta.persistence</groupId>
    <artifactId>jakarta.persistence-api</artifactId>
    <version>3.1.0</version>
</dependency>

<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>eclipselink</artifactId>
    <version>4.0.2</version>
</dependency>

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.2</version>
</dependency>
```

## `persistence.xml`

`persistence.xml` beskriver persistence unit, entitetsklasser og databaseoppkobling.

```xml
<persistence-unit name="personPersistenceUnit" transaction-type="RESOURCE_LOCAL">
    <class>no.hvl.dat107.Person</class>
    <properties>
        <property name="jakarta.persistence.jdbc.driver" value="org.postgresql.Driver"/>
        <property name="jakarta.persistence.jdbc.url" value="jdbc:postgresql://server:5432/database"/>
        <property name="jakarta.persistence.jdbc.user" value="brukernavn"/>
        <property name="jakarta.persistence.jdbc.password" value="passord"/>
    </properties>
</persistence-unit>
```

Navnet på persistence unit brukes i Java:

```java
EntityManagerFactory emf =
    Persistence.createEntityManagerFactory("personPersistenceUnit");
```

## Typisk minimumseksempel

```java
@Entity
@Table(schema = "forelesning1")
public class Person {
    @Id
    private Integer id;

    private String navn;
}
```

`@Entity` gjør klassen persistent. `@Table` angir tabell eller schema når navnet ikke skal tas direkte fra klassen. `@Id` markerer primærnøkkelen.

## EntityManager

`EntityManager` brukes til å finne, lagre, endre, slette og spørre etter entiteter.

```java
EntityManager em = emf.createEntityManager();

try {
    Person person = em.find(Person.class, id);
} finally {
    em.close();
}
```

`find()` brukes når du kjenner primærnøkkelen. JPQL brukes når du skal spørre etter noe annet enn primærnøkkel.

```java
String jpql = "select p from Person p";
TypedQuery<Person> query = em.createQuery(jpql, Person.class);
List<Person> personer = query.getResultList();
```

JPQL skrives mot entitetsklasser og feltnavn, ikke tabellnavn og kolonnenavn.

## Vanlige feil

- tro at JPA fjerner behovet for å forstå databasen
- glemme at `persistence.xml` må ligge under `META-INF`
- blande SQL-navn og Java-navn når du skriver JPQL
- si at JPA er en implementasjon i stedet for en spesifikasjon
- glemme å lukke `EntityManager`

## Typiske eksamensoppgaver

- skriv en entitetsklasse ut fra en enkel tabellskisse
- forklar hva `@Entity`, `@Table` og `@Id` gjør
- forklar hva `persistence.xml` må inneholde
- forklar forskjellen på JDBC-tenkning og JPA/ORM-tenkning

## Hva du bør øve på

- lage en minimal entitet fra bunnen av
- forklare Java-klasse, objekt, tabell og rad i samme eksempel
- skrive et `find()`-oppslag og forklare hvorfor det bruker primærnøkkel
