# Øvinger og eksempler

## Kjernen

NoSQL-stoffet sitter best når du trener på konkrete filer: XML/XSD, XPath, XSLT, XML i PostgreSQL og JSONB i PostgreSQL. Bruk øvingene aktivt, ikke bare som lesestoff.

## Viktigste øvingsfiler

| Fil / oppgave | Trener |
| --- | --- |
| `video03-oving` | XML-feil, XML-dokument og XSD |
| `video05-oving` | XPath og XSLT til HTML |
| `studenter-xml.sql` | XML i PostgreSQL |
| `studenter-json.sql` | JSONB i PostgreSQL |
| `birken-paamelding.xsd` | XSD, datatyper, mønstre og referanser |
| `birken-paamelding.json` | realistisk JSON med nested struktur |

## Video 03-øvingen: XML og XSD

Du skal kunne finne feil i XML:

- feil XML-deklarasjon
- flere rot-elementer
- start- og slutt-tagger som ikke matcher
- overlappende elementer
- elementer som ikke lukkes
- verdier som ikke passer skjemaet

Du skal også kunne lage `bøker.xml` og `bøker.xsd`, med krav som:

- ISBN som attributt på `bok`
- tittel med maks lengde
- forfattere som struktur
- format som enumeration
- utgivelsesår med nedre grense
- språk som enumeration

Dette trener akkurat det eksamen ofte spør om: velformethet, gyldighet og XSD-restriksjoner.

## Video 05-øvingen: XSLT og XPath

Oppgavene trener transformasjon fra XML til HTML.

Viktige XSLT-elementer:

```xml
<xsl:template match="...">
<xsl:for-each select="...">
<xsl:value-of select="..."/>
<xsl:choose>
```

Du bør kunne forklare hvordan XPath brukes i `select` og `match`, og hvordan `sum(...) div count(...)` kan brukes til beregninger.

## Video 06-øvingen: XML i PostgreSQL

Setup:

```text
studenter-xml.sql
```

Viktige oppgavetyper:

- hent studentnummer og navn fra XML-kolonnen
- filtrer med `xpath_exists()`
- bruk `starts-with()` i XPath
- hent fag per student
- bruk `xmltable()` for å pakke XML ut til rader

## Video 07-øvingen: JSON i PostgreSQL

Setup:

```text
studenter-json.sql
```

Viktige oppgavetyper:

- konverter XML-data til JSON-struktur
- hent JSONB-felter med `->>` 
- bygg utledet navn med `||`
- bruk `jsonb_path_query()`
- filtrer med `jsonb_path_exists()`
- oppdater med `jsonb_set()`
- bruk `jsonb_array_elements(...) with ordinality` for arrays

## Slik bruker du øvingene

1. Skriv uttrykket selv først.
2. Sjekk mot løsning eller forelesningskode.
3. Forklar med ord hva uttrykket returnerer.
4. Endre én ting i data eller uttrykk og forutsi resultatet.

Dette gjør deg bedre på eksamen enn å bare lese ferdige løsninger.

## Vanlige feil

- bruke øvingsfilene passivt i stedet for å skrive egne uttrykk først
- stole blindt på eksempeldata uten å vurdere om noe er bevisst lagt inn som øvingsfeil
- kopiere XPath uten å forstå nodekontekst
- ikke teste JSONB-operatorer med både `->` og `->>`

## Typiske eksamensoppgaver

- små XPath-uttrykk
- forslag til JSON- eller XML-struktur
- forklare XSD-regler
- hente felt fra XML/JSON i PostgreSQL
- drøfting av dokumentvalg versus relasjonelt valg

## Hva du bør øve på

- velge én fil og lage tre egne spørsmål til den
- forklare hva filen trener og hvorfor den er relevant til eksamen
- skrive XPath/SQL før du ser på løsningsforslaget
