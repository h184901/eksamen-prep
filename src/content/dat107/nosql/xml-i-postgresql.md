# XML i PostgreSQL

## Kjernen

PostgreSQL kan brukes som en hybrid løsning der en rad har både vanlige kolonner og en XML-kolonne med dokumentdata.

## Dette må du kunne

- forklare hvorfor noen ville lagre XML i PostgreSQL
- lage en tabell med `xml`-kolonne
- bruke `xmlparse(document ...)` ved innsetting
- hente ut verdier med `xpath()`
- filtrere med `xpath_exists()`
- forklare hva `xmltable()` kan brukes til
- forklare hvordan PostgreSQL kan generere XML fra relasjonelle data

## Hvorfor XML i databasen?

XML kan brukes som:

- semistrukturert dokumentdata
- dataoverføringsformat
- del av web services/SOAP
- hybrid mellom normalisert tabellstruktur og dokumentmodell

Dette er ikke det samme som en full XML-database. Det er en relasjonell database med XML-støtte.

## Typisk tabell

```sql
create table personer (
    person_no integer,
    xml_data xml
);
```

Insetting:

```sql
insert into personer (person_no, xml_data)
values (
  1,
  xmlparse(document
    '<person>
       <fornavn>Ola</fornavn>
       <etternavn>Nordmann</etternavn>
       <barn>1</barn>
       <fodselsdato>1980-01-01</fodselsdato>
     </person>')
);
```

## Spørre mot XML

Nyttige funksjoner:

| Funksjon | Bruk |
| --- | --- |
| `xpath()` | Hente noder/verdier fra XML |
| `xpath_exists()` | Teste om XPath-uttrykk matcher |
| `xmltable()` | Pakke XML ut til relasjonelle rader/kolonner |

Eksempel:

```sql
select person_no,
       xpath('/person/fornavn/text()', xml_data) as fornavn,
       xpath('/person/etternavn/text()', xml_data) as etternavn
from personer
where xpath_exists('/person[fornavn="Nils"]', xml_data);
```

`xpath()` returnerer XML-resultater/arrays i PostgreSQL, så i praktiske oppgaver må du ofte pakke ut eller caste for å få ren tekst.

## PostgreSQL oppdaterer ikke deler av XML like enkelt

PostgreSQL har ikke en like direkte standardmåte for å oppdatere én liten del av et XML-dokument som `jsonb_set()` gjør for JSONB. Ofte må du lage ny XML-verdi og lagre hele dokumentet på nytt.

```sql
update personer
set xml_data = '<person><pnr>003</pnr><fornavn>Nilsi</fornavn></person>'
where person_no = 3;
```

## Generere XML fra relasjonelle tabeller

`xmlelement()`:

```sql
select xmlelement(name "fornavn", p.fornavn) as navn
from personer p;
```

`xmlforest()`:

```sql
select xmlforest(p.person_no, p.fornavn, p.etternavn) as person
from personer p
where p.person_no = 1;
```

`xmlagg()`:

```sql
select xmlelement(name "personer",
         xmlagg(
           xmlelement(name "person",
             xmlforest(p.person_no as "pno",
                       p.fornavn as "fornavn",
                       p.etternavn as "etternavn")
           )
         )
       )
from personer p;
```

`xmlagg()` samler flere rader til ett XML-resultat.

## Øvingsmønster

I `studenter-xml.sql`-øvingen skal du blant annet:

- kjøre setup-scriptet
- hente studentnummer og navn uten XML-tagger
- filtrere på fornavn som starter på `N`
- liste fag per student
- bruke `xmltable()` til å pakke fag ut som egne rader

## Fordeler og ulemper

Fordeler:

- fleksibelt for semistrukturerte data
- kan kombineres med vanlige relasjonelle kolonner
- mulig å bruke XPath direkte i databasen

Ulemper:

- kan bli tungvint å oppdatere deler av dokumenter
- dårligere enn normaliserte tabeller hvis du trenger mange joins og constraints
- mindre naturlig enn dokumentdatabase hvis hele løsningen er dokumentorientert

## Vanlige feil

- beskrive XML i PostgreSQL som det samme som full dokumentdatabase
- ikke forklare hvorfor en hybrid løsning velges
- fokusere bare på syntaks uten å forklare modellgevinsten
- glemme at XML-uttrekk ofte må pakkes ut eller castes før det blir ren tekst

## Typiske eksamensoppgaver

- vis hvordan et XML-dokument kan lagres i PostgreSQL
- forklar fordeler og ulemper ved XML i PostgreSQL
- skriv eller forklar spørring som henter ut data fra XML-kolonne
- forklar `xpath()`, `xpath_exists()` og `xmltable()`

## Hva du bør øve på

- forklare når XML i PostgreSQL er nyttig og når det blir tungvint
- lese `studenter-xml.sql` og beskrive strukturen i dokumentene
- skrive XPath-uttrykket før du skriver SQL rundt det
