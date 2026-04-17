# DAT107 løsningsforslag eksamen mai 2021

## Oppgave 1 – flervalg

a)  
Gitt to tabeller. Hvilke rader blir tatt med i resultatet av en «full ytre kobling» mellom dem?

- A Bare rader fra høyre tabell
- B Alle rader fra både høyre og venstre tabell
- C Bare koblede rader fra både høyre og venstre tabell
- D Alle rader fra høyre tabell, samt koblede rader fra venstre tabell

b)  
Gitt to tabeller. Hvilke rader blir tatt med i resultatet av en «høyre ytre kobling» mellom dem?

- A Alle rader fra høyre tabell, samt koblede rader fra venstre tabell
- B Alle rader fra både høyre og venstre tabell
- C Bare koblede rader fra både høyre og venstre tabell
- D Bare rader fra høyre tabell

c)  
Gitt to tabeller. Hvilke rader blir tatt med i resultatet av en «likekobling» mellom dem?

- A Alle rader fra høyre tabell, samt koblede rader fra venstre tabell
- B Bare koblede rader fra både høyre og venstre tabell
- C Alle rader fra både høyre og venstre tabell
- D Bare rader fra høyre tabell

d)  
Tabell «A» har ett «en-til-mange-forhold» til tabell «B». Hvilken tabell skal lagre fremmednøkkelen?

- A A
- B B
- C Må bruke koblingstabell som lagrer fremmednøkler til både A og B
- D Både A og B

e)  
En tabell har en fremmednøkkel til en annen tabell. Dette kan angis i SQL ved hjelp av nøkkelordene `constraint` og `foreign key` når vi oppretter en tabell. Hva er hensikten med å bruke dette?

- A Det gjør det mulig å spesifisere ytterligere krav for databasens integritet
- B Uten dette vil det ikke være mulig å koble disse tabellene sammen
- C Kobling blir utført automatisk, og det er ikke behov for å «manuelt» bruke kobling i utvalgsspørringer mellom tabellene
- D Har ikke betydning utover å synliggjøre at det er en fremmednøkkel

f)  
I en tabell er det behov for en kolonne som lagrer en monetær verdi (penger). Hvilken datatype er som regel mest hensiktsmessig for dette?

- A Integer
- B Char(n)
- C Numeric(p,s)
- D Double

g)  
Når kan en dokumentdatabase være ett godt alternativ til en relasjonsdatabase?

- A Vi ikke har behov for å koble sammen data («tabeller»)
- B Når datastrukturen ikke er kjent på forhånd og det kan være behov for å endre dette underveis
- C Egentlig ingen forskjell – bare to likeverdige måter å løse ett vilkårlig behov for å lagre data
- D Dokumentdatabaser er alltid enklere å håndtere siden de er mindre stringente

h)  
Hva er riktig om primærnøkler?

- A Må være en numerisk verdi
- B Blir alltid generert automatisk av databasesystemet
- C Kan bestå av flere kolonner (verdier)
- D Kan utelates

i)  
Kan to tabeller ha flere forhold mellom seg (dvs. flere fremmednøkler)?

- A Ja, men bare dersom alle er av samme type
- B Ja
- C Nei
- D Ja, men bare dersom alle er av forskjellige typer

j)  
Tabell «A» har ett «mange-til-mange-forhold» til tabell «B». Hvilken tabell skal lagre fremmednøkkelen?

- A Er ikke behov for fremmednøkler for «mange-til-mange-forhold»
- B Må bruke koblingstabell som lagrer fremmednøkler til både A og B
- C Enten A eller B
- D Både A og B

k)  
Hva er forskjellen på en dokumentdatabase og en nøkkel/verdidatabase?

- A Dokumentdatabase brukes til JSON-data, mens nøkkel/verdidatabase brukes til XML-data
- B En dokumentdatabase kan enklere lagre mer komplekse datastrukturer enn nøkkel/verdidatabase
- C Egentlig ingen forskjell, bare forskjellig navn
- D Nøkkel/verdidatabaser var forgjengeren til dokumentdatabaser

l)  
Hva er riktig om indekser?

- A En indeks på en kolonne betyr at en tabell blir sortert på denne kolonnen før den blir skrevet til fil/disk
- B En indeks vil alltid føre til bedre ytelse, og bør opprettes for alle kolonner
- C En tabell kan bare ha indeks for en kolonne
- D En indeks på en kolonne betyr at det er opprettet ett «innholdsregister» for denne kolonnen

m)  
Hva er riktig om transaksjoner?

- A Sikrer at vi ikke får inkonsistente data
- B Bedrer databasens ytelse
- C Det samme som en enkelt lese/skrive-operasjon mot en eller flere tabeller
- D Kan bare inneholde en lese/skriveoperasjon

n)  
Hva er riktig om bruk av isolasjonsnivåer?

- A Bedrer ytelsen uten potensielt negative sideeffekter
- B Garantert samme «endelig» resultat som uten
- C Samme som tofaselås
- D Kan gi forskjellig «endelig» resultat som uten, men gir bedre ytelse

o)  
Hva er riktig om tofaselås?

- A Samme som optimistisk låsing
- B Garanterer serialiserbare forløp
- C Garanterer at vranglås ikke kan oppstå
- D Algoritme for håndtering av ventegraf

## Oppgave 2 – SQL

### a)

Skriv SQL-kode for å opprette tabellen for personer ovenfor.

```sql
create table person (
personid integer primary key,
navn varchar(50) not null,
postnummer char(4) references poststed (postnummer)
on update cascade on delete set null,
adresse varchar(50),
telefonnummer char(8));
```

Forklaring i løsningsforslaget: tabellen opprettes med alle kolonner fra figuren. Det kommenteres at enkelte datatypevalg kan diskuteres, og at `navn` er satt med `not null`, mens postnummer, adresse og telefonnummer kan være `null`.

### b)

Legg til kolonnen `epost-adresse`.

```sql
alter table person add epostadresse varchar(50);
```

### c)

Fjern kolonnen `telefonnummer`.

```sql
alter table person drop column telefonnummer;
```

### d)

Vis navn, postnummer og poststed for alle personer, uavhengig av om postnummer finnes i tabellen for poststed.

```sql
select navn, postnummer, poststed
from person left outer join poststed
on person.postnummer=poststed.postnummer;
```

### e)

Vis navn, postnummer og poststed bare for personer hvor postnummer finnes i tabellen for poststed.

```sql
select navn, postnummer, poststed
from person inner join poststed
on person.postnummer=poststed.postnummer;
```

### f)

Skriv forrige SQL-spørring om til relasjonsalgebra.

Merk: OCR er uklar her og ser ut til å ha feil tabellnavn i uttrykket. Utkastet nedenfor følger teksten som ble lest:

```text
πnavn, postnummer, poststed (Observasjon ⋈person.postnummer=poststed.postnummer Fartoy)
```

Forklaringsteksten under sier at løsningen skal være en `inner join` mellom `Person` og `Poststed` på `person.postnummer=poststed.postnummer`, fulgt av projeksjon på `navn`, `postnummer`, `poststed`.

### g)

Vis postnummer, poststed og antall personer for hvert postnummer/poststed.

```sql
select navn, postnummer, poststed, count(*)
from person left outer join poststed
on person.postnummer=poststed.postnummer
group by postnummer, poststed;
```

## Oppgave 3 – normalisering

Gitt tabellen:

`Navn, kjønn, telefonnummer, postnummer, poststed, adresse, årskull, fordypningskode og fordypningsnavn`

Eksempeldata:  
`Kari Nordmann, k, {45678901;98765432}, 5063, Bergen, Inndalsveien 28, 2020, DATA, Dataingeniør`

### a)

Diskuter kandidatnøkler og velg primærnøkkel.

Løsningsforslaget konkluderer med at ingen enkeltkolonner alene er gode kandidatnøkler, og velger kombinasjonen `Navn`, `Årskull` og `Fordypningskode` som primærnøkkel.

### b)

Er tabellen på 1NF?

Løsningsforslaget sier nei, fordi `Telefonnummer` ikke er atomær verdi. Tabellen deles derfor opp i en hovedtabell og en egen tabell for telefonnummer.

### c)

Er tabellen på 2NF?

Løsningsforslaget sier nei, fordi `Fordypningsnavn` har partiell avhengighet av `Fordypningskode`. Dette skilles ut i egen tabell.

### d)

Er tabellen på 3NF?

Løsningsforslaget sier nei, fordi `Poststed` har transitiv avhengighet av `Postnummer`. Dette skilles ut i egen tabell.

## Oppgave 4 – modellering

Det er behov for et nytt system for håndtering av studenter ved en høgskole.

Oppgaven beskriver blant annet:

- flere campus
- flere fordypninger
- fag med ansvarlige personer
- personer med ulike roller
- ansatte og studenter

Oppgaven ber om logisk datamodell (ER-diagram) med primærnøkler, fremmednøkler, identifiserende/ikke-identifiserende forhold og minimum/maksimum-verdier.

Merk: selve ER-diagrammet ligger som bilde i PDF-en.

## Oppgave 5 – ORM/JPA

Vi skal jobbe med en fagdatabase med `fag` og `person`.

### a)

Skriv Java-klassene for entitetstypene `Fag` og `Person`.

Løsningsforslaget bruker blant annet:

```java
@Entity
public class Fag {
 @Id
 private String kode;

 private String navn;
 private int stp;
 private String semester;

 @ManyToOne
 @JoinColumn(name = "ansvarlig_id", referencedColumnName = "id")
 private Person ansvarlig;

 @ManyToMany
 @JoinTable(
   name = "undervisning",
   joinColumns = @JoinColumn(name="fag_kode"),
   inverseJoinColumns = @JoinColumn(name="laerer_id"))
 private List<Person> laerere;
}
```

```java
@Entity
public class Person {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int id;

 private String fornavn;
 private String etternavn;
 private LocalDate fodselsdato;

 @OneToMany(mappedBy="ansvarlig")
 private List<Fag> fagMedAnsvarFor;

 @ManyToMany(mappedBy="laerere")
 private List<Fag> fagUnderviser;
}
```

### b)

Lag en metode i `FagDAO` som lagrer nytt fag.

Løsningsforslaget:

```java
public class FagDAO {
 public void lagreNyttFag(String kode, String navn, int stp,
String semester, int ansvarligId) {
EntityManager em = emf.createEntityManager();
EntityTransaction tx = em.getTransaction();
try {
tx.begin();
Person fagansvarlig = em.find(Person.class, ansvarligId);
if (fagansvarlig == null) {
//Returnere uten å gjøre noe
} else {
Fag nyttFag
 = new Fag(kode, navn, stp, semester, fagansvarlig);
fagansvarlig.leggTilFagansvarFor(nyttFag);
if (em.find(Fag.class, kode) == null) {
em.persist(nyttFag);
} else {
em.merge(nyttFag);
}
}
tx.commit();
} catch (Throwable e) {
e.printStackTrace();
if (tx.isActive()) {
tx.rollback();
}
} finally {
em.close();
}
 }
}
```

### c)

Forklar hvilke utvidelser databasen trenger for å lagre lærere i fag.

Løsningsforslaget bruker koblingstabell:

```sql
CREATE TABLE undervisning
(
 fag_kode CHAR(6),
 laerer_id INTEGER,
 CONSTRAINT undervisning_pk PRIMARY KEY (fag_kode, laerer_id),
 CONSTRAINT laerer_fk FOREIGN KEY (laerer_id) REFERENCES Person(id),
 CONSTRAINT fag_fk FOREIGN KEY (fag_kode) REFERENCES Fag(kode)
);
```

### d)

Utvid JPA-løsningen tilsvarende. Løsningsforslaget viser til a).

## Oppgave 6 – k-means

Bruk k-means-algoritme til å finne 3 kluster-sentre.

Merk: Punktsettet ligger i figur i PDF-en. OCR fra bildet viser disse punktene:

```text
(0,3), (1,3), (2,3), (1,2), (2,2),
(4,5), (4,4), (5,4), (4,3), (4,1),
(7,5), (8,6), (9,6), (9,3), (10,7), (10,5)
```

Videre viser figuren disse centroidene tydeligst:

- Cluster 1: `(1.2000000000000002, 2.6)`
- Cluster 0: `(4.2, 3.4000000000000004)`
- Cluster 2: `(8.833333333333332, 5.333333333333333)`

## Oppgave 7 – NoSQL

### a)

Skriv en rad fra hver av tabellene som XML.

```xml
<?xml version=«1.0» encoding=«utf-8» ?>
<data>
 <personer>
 <person id=«0» navn=«Kari Nordmann» postnummer=«5063» adresse=«Inndalsveien 28»
telefonnummer=«55667788»/>
 </personer>
 <poststeder>
 <poststed nr=«5063» sted=«Bergen» />
 </poststeder>
</data>
```

### b)

Skriv en rad fra hver av tabellene som JSON.

```json
{
 «personer»:
 [
 {
 «person»:
 {
 «id»: 0,
 «navn»: «Kari Nordmann»,
 «postnummer»: «5063»,
 «adresse»: «Inndalsveien 28»,
 «telefonnummer»: «55667788»
 }
 }
 ]
 «poststeder»:
 [
 «poststed»:
 {
 «nr»: «5063»,
 «sted»: «Bergen»
 }
 ]
}
```

### c)

Redegjør for egenskaper ved relasjonsdatabaser vs. nøkkel/verdidatabaser vs. dokumentdatabaser vs. grafdatabaser.

Løsningsforslaget beskriver kort:

- relasjonsdatabaser som godt egnet for velstrukturerte data
- nøkkel/verdidatabaser som egnet for enkle oppslag
- dokumentdatabaser som semistrukturerte databaser, ofte med JSON
- grafdatabaser som nyttige der relasjoner i nettverk er det viktigste
