# Kortversjon og sjekkliste

## NoSQL-grunnidé

- NoSQL betyr "Not Only SQL".
- NoSQL erstatter ikke relasjonsdatabaser generelt.
- Valg av database bør begrunnes med datamodell, spørremønster, integritet og skaleringsbehov.
- Hovedfamilier: nøkkel-verdi, dokument, kolonne og graf.

## XML du må kunne

- XML har ett rot-element.
- Elementer må lukkes og nøstes riktig.
- Attributter ligger i starttaggen.
- Velformet betyr syntaktisk korrekt XML.
- Gyldig betyr velformet og validert mot DTD/XSD.
- XML Schema har datatyper, DTD er svakere.

## XSD du må kunne

| XSD-del | Betydning |
| --- | --- |
| `xs:simpleType` | Definerer enkel datatype med restriksjoner |
| `xs:complexType` | Definerer struktur med elementer/attributter |
| `xs:sequence` | Elementene må komme i rekkefølge |
| `minOccurs` / `maxOccurs` | Antall forekomster |
| `xs:enumeration` | Lovlige verdier |
| `xs:pattern` | Mønster/regex |
| `xs:unique` | Unik verdi |
| `xs:key` | Nøkkel |
| `xs:keyref` | Referanse til nøkkel |

## XPath du må kunne

| XPath | Betydning |
| --- | --- |
| `/rot/barn` | Absolutt sti |
| `//node` | Node på vilkårlig nivå |
| `@attributt` | Attributt |
| `text()` | Tekstnode |
| `..` | Forelder |
| `[betingelse]` | Predikat/filter |
| `count(...)` | Teller noder |
| `contains(...)` | Inneholder tekst |
| `starts-with(...)` | Starter med tekst |
| `position()` / `last()` | Posisjon i nodesett |

## XSLT du må kunne forklare

- XSLT transformerer XML til HTML, XML eller annet format.
- XSLT bruker XPath i `match` og `select`.
- `xsl:value-of` henter verdi.
- `xsl:for-each` itererer over noder.
- `xsl:choose` brukes som if/else.

## XML i PostgreSQL

- Bruk datatype `xml`.
- Bruk `xpath()` for å hente verdier.
- Bruk `xpath_exists()` for filter.
- Bruk `xmltable()` for å pakke XML ut som relasjonelle rader.
- XML er nyttig som hybrid, men kan være tungvint å deloppdatere.

## JSON du må kunne

- JSON består av objekter, arrays og nøkkel/verdi-par.
- `json` lagrer tekstlig original.
- `jsonb` lagrer parset binær representasjon og er bedre for spørringer.
- `->` returnerer JSON.
- `->>` returnerer tekst.
- `jsonb_path_query()` henter matcher.
- `jsonb_path_exists()` tester matcher.
- `jsonb_set()` oppdaterer del av dokument.

## Hurtigsjekk for NoSQL-drøfting

- Hva leses oftest samlet?
- Hvor mye duplisering tåles?
- Hvor viktig er referanseintegritet?
- Trenger du fleksible joins?
- Trenger du ad hoc-spørringer?
- Er dataene semistrukturerte?
- Passer hybrid løsning i PostgreSQL?

## Vanlige eksamensfeller

- bare beskrive syntaks uten å forklare datamodell
- ikke knytte valg til oppgavens domene
- glemme ulemper ved dokumentmodellen
- bruke "NoSQL er raskere" som generell påstand
- blande `json` og `jsonb`
- blande `->` og `->>`
- tro at velformet XML automatisk er gyldig XML

## Siste repetisjon

Før eksamen bør du kunne forklare denne kjeden:

```text
XML/XSD -> XPath/XSLT -> XML i PostgreSQL -> JSONB i PostgreSQL -> dokumentmodell vs relasjonsmodell
```
