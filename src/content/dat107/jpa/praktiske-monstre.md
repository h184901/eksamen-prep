# Øvinger og praktiske mønstre

## Kjernen

JPA må trenes praktisk. Det er ikke nok å pugge annotasjoner. Du bør kunne gå fra SQL-tabell til entitetsklasse, `persistence.xml`, `EntityManager` og en liten DAO-metode.

## Dette må du kunne

- finne riktig eksempelprosjekt til riktig teoriemne
- bruke kurskoden som mønster, ikke bare som kopi
- kjenne igjen gode DAO-mønstre og relasjonsmønstre
- forklare hvordan en minimal JPA-kjede henger sammen

## Første praktiske JPA-kjede

Øvingen "Komme i gang med JPA" trener hele minimumskjeden:

1. Lag en tabell i PostgreSQL.
2. Lag et Maven-prosjekt med JPA-avhengigheter.
3. Legg `persistence.xml` under `src/main/resources/META-INF`.
4. Lag en entitetsklasse.
5. Bruk `em.find(...)` til å hente én rad som Java-objekt.

Tabellen `ansatt` kan ha:

| Attributt | Kommentar |
| --- | --- |
| `brukernavn` | Primærnøkkel, for eksempel initialer |
| `fornavn` | Tekst |
| `etternavn` | Tekst |
| `ansettelsesdato` | `date` i SQL, `LocalDate` i Java |
| `stilling` | Tekst |
| `maanedslonn` | Heltall eller `numeric` |

## Minimal entitet

```java
@Entity
@Table(schema = "oving_jpa", name = "ansatt")
public class Ansatt {
    @Id
    private String brukernavn;

    private String fornavn;
    private String etternavn;
    private LocalDate ansettelsesdato;
    private String stilling;
    private int maanedslonn;
}
```

Husk at entitetsklassen også må registreres i `persistence.xml`:

```xml
<class>no.hvl.dat107.Ansatt</class>
```

## Minimal testkode

```java
EntityManagerFactory emf =
    Persistence.createEntityManagerFactory("ovingJpaPersistenceUnit");
EntityManager em = emf.createEntityManager();

try {
    Ansatt ansatt = em.find(Ansatt.class, brukernavn);
    System.out.println(ansatt);
} finally {
    em.close();
}
```

Dette er det enkleste mønsteret du bør kunne skrive uten å se i fasit.

## Beste kodeprogresjon

Hvis du vil repetere JPA praktisk, er denne rekkefølgen mest nyttig:

1. `f1-2-personer-jpa/` - grunnleggende entitet og `find()`
2. `f2-1-personer-crud-mvn/` - Maven, CRUD og DAO
3. `f2-2-todos-losning-mvn/` - mer komplett CRUD-flyt
4. `f3-3-vitnemal-one-to-many-losning/` - 1:N
5. `f4-kontor-one-to-one/` - 1:1
6. `f5c-prosjekt-kunstig-pk/` - M:N med koblingsentitet
7. `f6-1-todoliste-losning/` - cascade, orphan removal og hjelpemetoder
8. `f6b-person-subtyper-single-table/` - arvstrategi

## Praktiske sjekkpunkter

- Maven-prosjektet har små bokstaver og bindestrek i prosjektnavnet.
- `pom.xml` har Jakarta Persistence API, EclipseLink og PostgreSQL-driver.
- `persistence.xml` ligger i riktig mappe.
- Database-URL, bruker, passord og persistence unit stemmer.
- Entitetsklassen har `@Entity`, `@Table` og `@Id`.
- `EntityManager` lukkes i `finally`.

## Vanlige feil

- bruke for mye tid på menyer og brukergrensesnitt
- hoppe rett til kompleks modell uten å få første iterasjon til å virke
- ikke teste entiteter og relasjoner mot ekte database tidlig
- glemme at `@Id` må matche primærnøkkelen i tabellen
- registrere feil klassenavn i `persistence.xml`

## Typiske eksamensoppgaver

- små kodeutdrag som ligner kursprosjektene
- relasjonsmapping som bygger direkte på mønstre fra `f3`, `f5` og `f6`
- forklare hva som mangler i et ufullstendig JPA-oppsett

## Hva du bør øve på

- lese én DAO-klasse og forklare hva som skjer steg for steg
- åpne ett prosjekt per tema og finne annotasjonene som løser akkurat det temaet
- bygge en minimal `Ansatt`-entitet og hente den med `find()`
