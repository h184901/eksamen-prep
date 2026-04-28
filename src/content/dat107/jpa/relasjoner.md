# Relasjoner 1:N og 1:1

## Kjernen

Relasjoner er sentralt på eksamen fordi de tester om du forstår både relasjonstype, fremmednøkkel, owning side og hvordan objektgrafen holdes konsistent i Java.

::jpa-relationship-diagram::

## Dette må du kunne

- forklare owning side og reverse side
- bruke `mappedBy` riktig
- forstå at `@ManyToOne` ofte er owning side i 1:N
- plassere `@JoinColumn` der fremmednøkkelen ligger
- forklare når begge sider må oppdateres i Java
- kjenne forskjellen på `LAZY` og `EAGER`
- forklare hva `flush()` kan brukes til

## Vitnemål og karakterer

Forelesningseksempelet bruker en forenklet modell der ett vitnemål kan ha mange karakterer.

![ER-modell for Vitnemal og Karakter](/content/dat107/assets/jpa/vitnemal-er.png)

![Relasjonsmodell for Vitnemal og Karakter](/content/dat107/assets/jpa/vitnemal-relasjonsmodell.png)

I relasjonsmodellen ligger fremmednøkkelen på mange-siden:

```text
Karakter.StudNr -> Vitnemal.StudNr
```

Dette gjør `Karakter` til owning side i JPA.

## `@ManyToOne` på owning side

```java
@Entity
@Table(schema = "forelesning3")
public class Karakter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int karNr;

    private String emnekode;
    private LocalDate eksDato;
    private String bokstav;

    @ManyToOne
    @JoinColumn(name = "studnr")
    private Vitnemal vitnemal;
}
```

`@JoinColumn` peker på fremmednøkkelkolonnen i tabellen for `Karakter`.

## `@OneToMany(mappedBy = "...")` på reverse side

```java
@Entity
@Table(schema = "forelesning3")
public class Vitnemal {
    @Id
    private int studNr;

    private LocalDate studiestart;
    private LocalDate studieslutt;

    @OneToMany(mappedBy = "vitnemal", fetch = FetchType.EAGER)
    private List<Karakter> karakterer;
}
```

`mappedBy = "vitnemal"` betyr: denne listen eier ikke databasekoblingen. Koblingen eies av feltet `vitnemal` i `Karakter`.

## Objektmodell vs database

I databasen lagres fremmednøkkelverdi. I Java bruker du objektreferanse.

```java
private Vitnemal vitnemal;
```

Og eventuelt samling andre veien:

```java
private List<Karakter> karakterer;
```

JPA oversetter dette til fremmednøkler, men JPA oppdaterer ikke automatisk begge sider av objektmodellen for deg.

## Vedlikehold av toveis relasjoner

Når en ny kobling lages, må ofte begge sider oppdateres:

```java
Karakter nyKarakter = new Karakter(emnekode, eksDato, bokstav);
nyKarakter.setVitnemal(vitnemal);
vitnemal.getKarakterer().add(nyKarakter);
em.persist(nyKarakter);
```

Dette er ikke dobbeltlagring i databasen. Det er nødvendig for at Java-objektene skal være konsistente mens programmet kjører.

## Lazy og eager loading

| Relasjonstype | Standard | Kommentar |
| --- | --- | --- |
| Samlinger, for eksempel `List<Karakter>` | `LAZY` | Listen hentes først når den trengs. |
| Enkle referanser, for eksempel `Karakter.vitnemal` | `EAGER` | Referansen hentes ofte sammen med objektet. |

Hvis `EntityManager` er lukket og en lazy liste ikke er hentet ennå, kan du få problemer når listen aksesseres.

## `flush()`-poenget

JPA bestemmer ofte selv når SQL sendes til databasen. Hvis databaseconstraints krever at én endring skjer før en annen, kan `flush()` tvinge pending endringer til databasen:

```java
em.flush();
```

Dette er et tegn på at du må forstå databasebegrensninger, ikke bare JPA-syntaks.

## En-til-en

I en 1:1-relasjon kan fremmednøkkelen ligge på ulike sider, eller relasjonen kan modelleres med koblingstabell. JPA-mappingen skal følge hvor fremmednøkkelen faktisk ligger.

```java
@OneToOne
@JoinColumn(name = "kontor")
private Rom kontor;
```

Reverse side:

```java
@OneToOne(mappedBy = "kontor")
private Ansatt ansatt;
```

`mappedBy = "kontor"` betyr at koblingen eies av feltet `kontor` i `Ansatt`.

## Høna-og-egget-problemer

Hvis to tabeller peker på hverandre med fremmednøkler, kan `CREATE TABLE` eller `INSERT` bli vanskelig fordi én rad eller tabell må finnes før den andre.

Typiske løsninger:

- opprett tabeller først og legg til én constraint med `ALTER TABLE`
- tillat `NULL` midlertidig på én fremmednøkkel
- sett inn rader i flere steg og oppdater etterpå
- bruk `em.flush()` i JPA når rekkefølge må tvinges

## Vanlige feil

- feil owning side
- glemme å oppdatere begge sider i bidireksjonal relasjon
- bruke feil lastestrategi uten begrunnelse
- sette `mappedBy` på feil felt
- tro at JPA automatisk rydder all objektlogikk for deg

## Typiske eksamensoppgaver

- skriv entiteter for 1:N og 1:1
- forklar hvilken side som er owning side
- peke ut hvor fremmednøkkelen ligger
- skriv metode som henter eller oppdaterer relaterte objekter

## Hva du bør øve på

- forklare én bidireksjonal relasjon med ord, Java og database samtidig
- lese en JPA-relasjon og peke ut hvor fremmednøkkelen ligger
- skrive `@ManyToOne`, `@OneToMany(mappedBy = "...")` og `@OneToOne`
