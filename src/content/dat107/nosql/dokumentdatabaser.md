# Dokumentdatabaser og valg

## Kjernen

Dette er den mest eksamensnære drøftingsdelen i NoSQL-stoffet: når bør du velge dokumentmodell, når bør du velge relasjonsmodell, og hva taper eller vinner du på valget?

## Dette må du kunne

- forklare forskjellen på relasjonell og dokumentorientert modell
- forklare hvorfor data kan bli duplisert i dokumentdatabaser
- begrunne når innebygde dokumenter er naturlige
- forklare fordeler og ulemper ved nøkkel-verdi og dokumentdatabaser
- forklare PostgreSQL som objektrelasjonell/hybrid database
- koble XML/JSON til webtjenester

## Hvorfor rene tabeller ikke alltid passer

Relasjonsdatabaser egner seg mindre godt for noen komplekse datastrukturer:

- geografiske informasjonssystemer
- tekniske tegninger
- multimedia
- semistrukturerte dokumenter
- sosiale medier
- stordata fra IoT

Poenget er ikke at SQL ikke kan modellere dette, men at modellen kan bli tung og unaturlig for domenet og operasjonene.

## Objektrelasjonell bro

PostgreSQL er en relasjonsdatabase, men støtter også flere objektrelasjonelle trekk:

- brukerdefinerte datatyper
- arrays
- enum
- composite types
- range types
- XML- og JSON-datatyper
- PostGIS for geografiske data

Eksempel på composite type:

```sql
create type AdresseType as (
  Gate varchar(50),
  Nummer integer
);

create table student (
  id integer primary key,
  fornavn varchar(25),
  adresse AdresseType
);
```

Slike typer er nyttige å kjenne til, men strukturert materiale advarer mot å bruke dem ukritisk i ordinær modellering. Vanlige datatyper og normalisering er ofte bedre.

## Dokumentmodell

En dokumentdatabase lagrer ofte JSON/BSON-dokumenter i samlinger.

Eksempel:

```json
{
  "kundeId": 42,
  "navn": "Kari",
  "ordre": [
    {
      "ordreNr": 1001,
      "linjer": [
        { "varenr": "A1", "antall": 2 },
        { "varenr": "B7", "antall": 1 }
      ]
    }
  ]
}
```

Dette kan være naturlig hvis applikasjonen ofte leser hele kunde-/ordrestrukturen samlet.

## Typiske drøftingspunkter

| Relasjonsmodell | Dokumentmodell |
| --- | --- |
| Sterk på integritet og constraints | Sterk når aggregater leses samlet |
| Fleksible joins og ad hoc-spørringer | Færre joins, ofte enklere lesing |
| Normalisering reduserer duplisering | Kan duplisere data for leseytelse |
| Transaksjoner og referanseintegritet er modne | Konsistens kan bli mer applikasjonsansvar |

En god eksamensdrøfting bør alltid koble valget til domenet: Hva leses samlet? Hva oppdateres ofte? Hvor viktig er referanseintegritet? Trengs fleksible spørringer?

## Nøkkel-verdi

Nøkkel-verdi-databaser organiserer data som unike nøkler med tilhørende verdi.

```text
"Elev:1:Fornavn" = "Bill"
"player:1:profil" = {"navn":"Lasse", "rating":950}
```

De passer for enkle oppslag med høy ytelse og god horisontal skalering, men ikke for komplekse joins eller ad hoc-spørringer.

## DynamoDB og single-table-tankegang

![DynamoDB single-table-modell](/content/dat107/assets/nosql/dynamodb-single-table.png)

DynamoDB bruker ofte partition key og sort key for å modellere flere tilgangsmønstre i én eller få tabeller.

| PK | SK | Verdi |
| --- | --- | --- |
| `K-001` | `profile` | Kundeprofil |
| `K-001` | `order::draft` | Handlekurv |
| `K-001` | `order::history::2023-10-21` | Historisk ordre |

Dette er relevant som kontrast til relasjonsmodellens normalisering og joins.

## Redis

Redis er en nøkkel-verdi-database som ofte brukes som in-memory cache.

Typiske bruksområder:

- caching
- sesjoner
- midlertidige data
- køer og pub/sub
- real-time applikasjoner

Begrensningene er de samme hovedsakelig: ikke komplekse joins, RAM-kostnad og mindre naturlig som generell langtidslagring.

## Webtjenester-koblingen

Webtjenester er operasjoner en applikasjon kan kalle over internett. De bygger på åpne protokoller og formater.

| Teknologi | Typisk format | Kommentar |
| --- | --- | --- |
| SOAP | XML, WSDL | Mer formell/protokollorientert webtjenestestil |
| REST | JSON, HTTP | Ressursorientert stil mye brukt i moderne web-API-er |

Dette forklarer hvorfor XML og JSON både er utvekslingsformater og aktuelle lagringsformater.

## Vanlige feil

- skrive ren synsing uten å knytte argumentene til domenet i oppgaven
- glemme å nevne duplisering og konsistensutfordringer
- bare snakke om teknologi, ikke om datamodell
- si at dokumentmodell alltid er raskere
- anbefale composite types, arrays eller enum i PostgreSQL uten begrunnelse

## Typiske eksamensoppgaver

- lag forslag til dokumentdatabase for et gitt domene
- sammenlign dokumentdatabase og relasjonsdatabase
- begrunn hvilken løsning du mener passer best
- forklar nøkkel-verdi-database på overordnet nivå
- forklar SOAP/XML og REST/JSON-koblingen

## Hva du bør øve på

- ta et relasjonelt case og beskrive det som ett eller flere dokumenter
- skrive korte, balanserte drøftinger med både fordeler og ulemper
- starte drøftingen med bruksmønster, ikke teknologinavn
