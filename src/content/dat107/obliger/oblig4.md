# Oblig 4: NoSQL

## Kjernen

Oblig 4 bruker Hobbyhuset-databasen til å trene to alternative datamodeller: XML i PostgreSQL og dokumentdata i MongoDB. Målet er å forstå migrering, spørring og modellvalg, ikke bare å få syntaks til å kjøre.

## Hva denne obligen trener

- XML i PostgreSQL som hybrid løsning
- migrering fra relasjonelle tabeller til XML
- XPath-spørringer mot XML-kolonner
- `XMLAGG` for å bygge nested XML
- JSON-generering fra SQL
- dokumenttenkning i MongoDB
- embedded ordrelinjer i ordredokumenter
- enkel CRUD i Java over MongoDB

## Case

Hobbyhuset AS vil teste andre datamodeller:

1. PostgreSQL-løsning med XML-kolonner.
2. MongoDB-løsning med JSON-dokumenter og Java-repository.

PostgreSQL-delen bruker schema `oblig4`. MongoDB-delen bruker samlingene:

| Samling | Innhold |
| --- | --- |
| `kunde` | Data fra `KUNDE` og `POSTSTED` |
| `vare` | Data fra `VARE`, eventuelt også `KATEGORI` |
| `ordre` | Data fra `ORDRE` og embedded `ORDRELINJE` |

## Oppgave 1: Opprette Hobbyhuset

Du skal opprette schema og tabeller fra `hobbyhuset.sql`.

Dette er ikke bare administrasjon. Det sikrer at du har et relasjonelt utgangspunkt før du lager XML- og dokumentvarianter.

```sql
create schema oblig4;
set search_path to oblig4;
```

Husk `COMMIT` hvis databasen/verktøyet krever det.

## Oppgave 2: XML og XPath

Første del lager `KUNDE_NY`:

```text
KUNDE_NY(knr, kunde_xml)
```

Deretter migreres data fra `KUNDE` inn i XML-kolonnen.

Du skal kunne:

- opprette tabell med `xml`-kolonne
- migrere relasjonelle data til XML
- hente alle kunder med `xpath()`
- filtrere kunder der etternavn starter på `A`

![Kunde-resultater hentet fra XML-kolonne](/content/dat107/assets/obliger/oblig4-kunde-xml-resultat.png)

Neste del lager `ORDRE_NY`:

```text
ORDRE_NY(ordrenr, kundenr, ordre_xml)
```

`kundenr` skal ha FK mot `KUNDE_NY`.

Ordrelinjer bør bygges inn i `ordre_xml`:

```xml
<ordre>
  <ordredato>2019-11-17</ordredato>
  <sendtdato>2019-11-22</sendtdato>
  <betaltdato>2019-12-03</betaltdato>
  <ordrelinjer>
    <ordrelinje>
      <vnr>32069</vnr>
      <prisprenhet>177.00</prisprenhet>
      <antall>2</antall>
    </ordrelinje>
  </ordrelinjer>
</ordre>
```

Nøkkelideen er at flere ordrelinjer må aggregeres inn i én ordre. Strukturert kilde peker på dette mønsteret:

```sql
from ordre
left join (
  select ordrenr, xmlagg(...) as ordrelinjer
  from ordrelinje
  group by ordrenr
) linjer on linjer.ordrenr = ordre.ordrenr
```

![Ordrelinje-resultat fra XML-spørring](/content/dat107/assets/obliger/oblig4-ordrelinje-resultat.png)

## Oppgave 3: MongoDB

Du skal lage dokumentmodeller for `kunde`, `vare` og `ordre`.

Viktig poeng: `ordre` passer godt som dokument fordi ordrelinjene ofte leses sammen med ordren.

Eksempelskisse:

```json
{
  "ordrenr": 12345,
  "kundenr": 5643,
  "ordredato": "2019-08-12",
  "ordrelinjer": [
    {
      "vnr": 32069,
      "prisprenhet": 177.00,
      "antall": 2
    }
  ]
}
```

SQL-ene i oppgave 3b skal lage ett JSON-dokument per rad. Ikke lag én stor JSON-array hvis Java-koden forventer linjebaserte dokumenter.

Filene som skal produseres:

```text
kunde.json
vare.json
ordre.json
```

Disse skal ligge i `data`-mappen i Java-prosjektet.

## Oppgave 4: MongoDB og Java

Du skal fullføre template-prosjektet, særlig:

- `MongoDbOblig4.java`
- `KundeRepository.java`

Data lastes inn slik:

```java
LoadDataDao.loadCollection("<collection>", "<filename>");
```

Repository-funksjonene trener klassisk CRUD:

| Del | Metode |
| --- | --- |
| 4d | `findByKnr` |
| 4e | `save` |
| 4f | `delete` |
| 4g | `update` |

Eksempler:

```java
Kunde kunde = repoKunde.findByKnr(5002);
```

```java
Kunde nyKunde = repoKunde.save(aKunde);
```

```java
Kunde slettetKunde = repoKunde.delete(5007);
```

```java
Kunde endretKunde = repoKunde.update(kunde.getId(), kunde);
```

## Teori som brukes

| Tema | I oppgaven |
| --- | --- |
| XML i PostgreSQL | Oppgave 2 |
| XPath | Oppgave 2e, 2f, 2m |
| `XMLAGG` | Oppgave 2k |
| Hybrid database | XML-kolonner i PostgreSQL |
| JSON-generering fra SQL | Oppgave 3b |
| Embedded dokumenter | Ordrelinje inni ordre |
| MongoDB collections | `kunde`, `vare`, `ordre` |
| Java repository / CRUD | Oppgave 4 |

## Vanlige feil

- glemme `COMMIT` i PostgreSQL
- levere SQL/JSON som screenshot når oppgaven ber om tekst
- ikke bruke schema `oblig4`
- lage `ORDRE_NY.kundenr` uten FK mot `KUNDE_NY`
- migrere ordrelinjer uten `XMLAGG` og gruppering
- ikke slette gamle rader i `ORDRE_NY` før ny migrering
- lage JSON-array for hele samlingen når Java-koden forventer ett dokument per rad
- glemme å kopiere JSON-filene til `data`-mappen
- fokusere bare på syntaks i stedet for å forklare modellvalget

## Typiske eksamensoppgaver

- lag dokumentdatabase for et domene
- vis eksempel på JSON- eller XML-dokument
- hent verdier ut av XML/JSON i PostgreSQL
- drøft dokumentdatabase versus relasjonsdatabase
- forklar embedded dokumenter og trade-offs

## Hva du bør øve på

- beskrive samme case både relasjonelt og dokumentorientert
- forklare hvorfor ordrelinjer passer som embedded dokumenter i ordre
- skrive en kort begrunnelse for XML-kolonne versus normaliserte tabeller
- forklare forskjellen på teknisk migrering og reelt datamodellvalg

## Sjekkliste

- Schema `oblig4` finnes i PostgreSQL.
- `KUNDE_NY` og `ORDRE_NY` er opprettet og fylt.
- SQL for XML/XPath står som tekst.
- `ORDRE_NY` har FK mot `KUNDE_NY`.
- Ordrelinjer aggregeres inn i ordre med `XMLAGG` eller tilsvarende.
- JSON-eksempler og SQL for JSON-eksport står som tekst.
- `kunde.json`, `vare.json` og `ordre.json` finnes i `data`-mappen.
- MongoDB-samlingene `kunde`, `vare` og `ordre` er lastet.
- `findByKnr`, `save`, `delete` og `update` er implementert.
