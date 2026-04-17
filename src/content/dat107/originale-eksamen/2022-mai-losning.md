# DAT107 2022 mai eksamen løsningsforslag

## Eksamen DAT107 databaser v2022

## Oppgave 1 – flervalg (30% ~72 min.)

### Spørsmål a
Hva er forskjellen på å bruke dokumenttypedefinisjon (DTD) eller `XML Schema` for å beskrive lovlig struktur for et XML-dokument?

- DTD gir flere muligheter
- XML Schema gir flere muligheter
- DTD og XML Schema er to helt forskjellige ting
- Ingen forskjell

### Spørsmål b
Hva er sant om «lovlig struktur» og «velformet» for XML-dokument?

- «Lovlig struktur» og «velformet» er akkurat det samme
- «Velformet» betyr riktig innrykk
- Et XML-dokument vil automatisk ha lovlig struktur dersom det er velformet
- Et XML-dokument kan være velformet uten å ha lovlig struktur

### Spørsmål c–o
Spørsmålene dekker blant annet:

- `inner join`, `right outer join`
- hierarki i SQL
- datatyper og indekser
- leselåser og tofaselås
- NoSQL og representasjonsuavhengighet
- relasjonsalgebra og mange-til-mange

## Oppgave 2 – SQL (10% ~24 min.)

Utgangspunkt:

`Student(studentnummer, fornavn, etternavn, telefonnummer, fødselsdato, studiekode*, årskull)`  
`Studium(studiekode, studienavn, ansvarlig, campus)`

### a) Datatyper for `Student`

Løsningsforslaget diskuterer blant annet:

- `studentnummer`: `char(6)` eller `int`
- `fornavn`, `etternavn`: `varchar(...)`
- `telefonnummer`: `char(8)` eller `varchar(...)`
- `fødselsdato`: `date`
- `studiekode`: `char(...)` eller `varchar(...)`
- `årskull`: `char(4)` eller `int`

### b) `on update` / `on delete`

Løsningsforslaget lander på:

```text
on update cascade on delete restrict
```

### c) `null` / `not null`

Løsningsforslaget setter blant annet `telefonnummer` til `null`, mens resten normalt er `not null`.

### d) Opprett tabellen `Student`

```sql
create table student(
  studentnummer char(6) primary key,
  fornavn varchar(25) not null,
  etternavn varchar(25) not null,
  telefonnummer char(8),
  fødselsdato date not null,
  studiekode varchar(10) not null,
  årskull char(4) not null,
  foreign key (studiekode) references stadium(studiekode)
);
```

Merk: `stadium(studiekode)` ser ut til å være OCR-feil for `studium(studiekode)`.

### e)

```sql
alter table student add column epost varchar(25);
```

### f)

```sql
delete from student where studiekode="DATAING";
delete from studium where studiekode="DATAING";
```

### g)

```sql
select studiekode, count(*)
from student
group by studiekode;
```

### h)

```sql
select * from
student inner join studium
on student.studiekode=studium.studiekode
where student.studiekode="INF";
```

### i)

```text
studium ⋈ student.studiekode=studium.studiekode σ studiekode="INF"(student)
```

### j)

Løsningsforslaget forklarer at `inner join` holder fordi man bare ønsker info for kjent studiekode.

## Oppgave 3 – modellering

Sykehus og journalsystem med:

- personer med roller som lege og pasient
- spesialiseringer
- time/konsultasjon
- resepter og medisiner

Merk: selve ER-diagrammet i originalen er håndtegnet og OCR på figuren er delvis uklar.

## Oppgave 4 – normalisering

Tabell:

`Bilforsikring(fornavn, etternavn, gate, husnummer, postnummer, poststed, epost, forsikringsnummer, registreringsnummer, merke, årsmodell, nypris, forsikringstype, forsikringspris, rabatt)`

Løsningsforslaget går gjennom:

- valg av kandidatnøkler
- 1NF
- 2NF
- 3NF
- oppdeling i blant annet `Bilforsikring`, `Forsikringsdekning`, `Forsikringstaker`, `Poststed` og `Bil`
