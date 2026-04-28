# JSON og PostgreSQL

## Kjernen

JSON brukes til å lagre og overføre semistrukturerte data. I PostgreSQL er skillet mellom `json` og `jsonb` et viktig eksamenspunkt.

## Dette må du kunne

- forklare hva JSON er
- skrive JSON-objekter og arrays
- forklare forskjellen på `json` og `jsonb`
- bruke eller forklare `->` og `->>`
- forstå `jsonb_path_query`, `jsonb_path_exists` og `jsonb_set`
- forklare hvordan JSON kan genereres fra relasjonelle data

## Hva er JSON?

JSON står for JavaScript Object Notation. Det er et tekstlig dataformat som brukes mye i web-løsninger og REST-API-er.

| Komponent | Eksempel |
| --- | --- |
| Nøkkel/verdi-par | `"fornavn": "Ola"` |
| Objekt | `{ "fornavn": "Ola" }` |
| Array | `[1, 2, 3]` |
| Boolean | `true`, `false` |
| Tall | `42`, `66.50` |
| Tekst | `"tekst"` |
| Null | `null` |

JSON slipper skillet mellom XML-elementer og XML-attributter.

## JSONB i PostgreSQL

```sql
create table personer (
  person_no integer,
  json_data jsonb
);
```

Eksempel:

```sql
insert into personer (person_no, json_data)
values (
  1,
  '{
    "pnr": "001",
    "fornavn": "Ola",
    "etternavn": "Nordmann",
    "barn": 1,
    "fodselsdato": "1980-01-01"
  }'
);
```

## `json` vs `jsonb`

| Type | Egenskaper | Velg når |
| --- | --- | --- |
| `json` | Lagrer tekst i original form. Bevarer whitespace, nøkkelrekkefølge og dupliserte nøkler. Dyrere å søke i. | Du vil bevare eksakt original, eller bare lagre og hente. |
| `jsonb` | Lagrer parset binær representasjon. Normaliserer nøkler, ignorerer whitespace og fjerner dupliserte nøkler. Egnet for indeksering og spørringer. | Du skal søke, filtrere, aggregere eller oppdatere deler av dokumentet. |

I praktiske applikasjoner er `jsonb` ofte riktig valg når data skal brukes aktivt i databasen.

## Operatorene `->` og `->>`

| Operator | Returnerer | Bruk |
| --- | --- | --- |
| `->` | JSON/JSONB-verdi | Når du skal fortsette å navigere i JSON |
| `->>` | Tekst | Når verdien skal brukes som SQL-tekst |

Eksempel:

```sql
select json_data -> 'person' ->> 'etternavn' as etternavn
from personer;
```

## JSON path og oppdatering

```sql
select jsonb_path_query(json_data, '$.person.fornavn') as fornavn
from personer
where jsonb_path_exists(json_data, '$.person.barn');
```

Oppdatere del av dokument:

```sql
update personer
set json_data = jsonb_set(json_data, '{person,fornavn}', '"Neil"')
where person_no = 3;
```

Sammenlignet med XML-støtten er dette et viktig poeng: JSONB har praktiske funksjoner for å oppdatere deler av dokumentet.

## Tabeller som JSON

Array med radobjekter:

```json
[
  {
    "Studentnr": "12345",
    "Fornavn": "Kari"
  },
  {
    "Studentnr": "12347"
  }
]
```

Rotobjekt med tabellnavn:

```json
{
  "Studenter": [
    {
      "Studentnr": "12345",
      "Fornavn": "Kari"
    }
  ]
}
```

## Generere JSON fra PostgreSQL

`json_build_object()`:

```sql
select json_build_object('navn', 'Ola', 'alder', 30, 'aktiv', true);
```

`json_agg()`:

```sql
select json_agg(navn)
from personer;
```

Eksempel med tabellverdier:

```sql
select json_build_object(
         'person',
         json_object(array['fornavn', 'etternavn'],
                     array[p.fornavn, p.etternavn])
       )
from personer p
where p.person_no = 1;
```

## Øvingsmønster

I `studenter-json.sql`-øvingen skal du blant annet:

- hente `fornavn`, `etternavn` og `studieprogram` med JSONB-operatorer
- lage en utledet kolonne `navn`
- bruke `jsonb_path_query()`
- filtrere med `jsonb_path_exists()`
- oppdatere felt med `jsonb_set()`
- eventuelt pakke ut arrays med `jsonb_array_elements(...) with ordinality`

## SOAP og REST-koblingen

I DAT107-konteksten er dette hovedpoenget:

- SOAP forbindes ofte med XML
- REST forbindes ofte med JSON

Dette forklarer hvorfor JSON dukker opp både som dataformat og som lagringsformat.

## Vanlige feil

- si at `json` og `jsonb` er det samme
- glemme at `->` og `->>` returnerer ulike typer
- bruke `->` når resultatet skal sammenlignes som tekst
- fokusere bare på lagring, ikke på søk og oppdatering

## Typiske eksamensoppgaver

- sammenlign `json` og `jsonb`
- vis hvordan JSON kan lagres i PostgreSQL
- forklar `->`, `->>`, `jsonb_path_exists` og `jsonb_set`
- vis hvordan relasjonelle data kan bygges om til JSON

## Hva du bør øve på

- lese `studenter-json.sql`
- forklare når `jsonb_set()` er nyttig
- skrive kort drøfting av hvorfor JSONB ofte er bedre til aktiv bruk i databasen
