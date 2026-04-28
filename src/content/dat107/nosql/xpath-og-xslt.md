# XPath og XSLT

## Kjernen

XPath brukes til å navigere i XML-trær. XSLT brukes til å transformere XML til en annen struktur, ofte HTML.

![DOM-noder i XML-dokument](/content/dat107/assets/nosql/dom-noder.png)

## Dette må du kunne

- forklare XML som trestruktur
- forklare DOM som tre av noder
- skrive enkle og mellomnivå XPath-uttrykk
- filtrere med predikater
- hente attributter og tekstverdier
- bruke funksjoner som `count`, `contains`, `starts-with`, `position` og `last`
- forklare hovedidéen i en enkel XSLT-transformasjon

## XML som trestruktur

XML-dokumenter er trestrukturer. Det er nyttig når du skal:

- beskrive lovlig dokumentstruktur
- referere til deler av dokumentet
- skrive XPath
- transformere XML med XSLT

DOM står for Document Object Model. DOM representerer XML og HTML som et tre av noder: dokument, elementer, attributter, tekst, namespace, processing instructions og kommentarer.

## XPath-grunnmønster

Eksempel-XML:

```xml
<tavle>
  <melding id="1" tid="07.12.2019 22:10:32">
    <avsender>Kari Lie</avsender>
    <innhold>Møte om 5 min!</innhold>
  </melding>
</tavle>
```

XPath:

```xpath
/tavle/melding/avsender
```

Dette henter `avsender` direkte under `melding` direkte under `tavle`.

## Navigering

![XPath-navigering i trestruktur](/content/dat107/assets/nosql/xpath-navigering.png)

Viktige tegn:

| XPath-del | Betydning |
| --- | --- |
| `/` | Start fra rot eller gå ett nivå ned |
| `//` | Søk nedover på vilkårlig nivå |
| `@` | Attributt |
| `..` | Forelder |
| `text()` | Tekstnode |
| `[]` | Predikat/filter |

## Vanlige XPath-uttrykk

| XPath | Betydning |
| --- | --- |
| `/tavle/melding` | Alle `melding` direkte under `tavle` |
| `/tavle/melding[3]` | Tredje `melding` direkte under `tavle` |
| `/tavle//etternavn` | Alle `etternavn` under `tavle`, direkte eller indirekte |
| `/tavle//*` | Alle elementer under `tavle` |
| `/tavle/melding/@mId` | `mId`-attributter på `melding` |
| `/tavle//etternavn/..` | Foreldre til `etternavn`-elementer |
| `//avsender[@aId="1001"]` | Avsendere med attributt `aId` lik `1001` |
| `//fornavn/text()` | Tekstinnholdet i `fornavn` |

## Funksjoner og operatorer

| XPath | Betydning |
| --- | --- |
| `count(/tavle/melding)` | Antall meldinger |
| `//melding[position() <= 3]` | De tre første meldingene |
| `//melding[last()]` | Den siste meldingen |
| `//melding[contains(@mld, 'XML')]` | Meldinger der attributtet inneholder `XML` |
| `//avsender[starts-with(fornavn, 'L')]` | Avsendere med fornavn som starter på `L` |
| `//avsender | //mottaker` | Union av avsendere og mottakere |

I XPath 1.0 returnerer enkelte funksjoner på nodesett bare første relevante node. Java sitt standardbibliotek støtter primært XPath 1.0.

## XQuery

XQuery er et spørre- og programmeringsspråk for XML. Strukturert materiale beskriver det slik:

```text
XQuery is to XML what SQL is to databases
```

Du bør kjenne igjen FLWOR-prinsippet:

```text
for, let, where, order, return
```

Du forventes normalt ikke å skrive større XQuery-programmer i DAT107, men du bør vite hva det er.

## XSLT

XSLT står for XSL Transformations. Det brukes til å transformere XML til:

- HTML
- annen XML
- andre tekstlige formater

XSLT bruker XPath både for å matche noder og hente verdier.

```xml
<xsl:template match="//person">
  <h3>Person - <xsl:value-of select="pnr"/></h3>
  <p>
    <xsl:value-of select="fornavn"/>
    <xsl:text> </xsl:text>
    <xsl:value-of select="etternavn"/>
  </p>
</xsl:template>
```

## `xsl:for-each` og `xsl:choose`

Iterasjon:

```xml
<xsl:for-each select="person">
  <tr>
    <td><xsl:value-of select="pnr"/></td>
    <td><xsl:value-of select="fornavn"/></td>
  </tr>
</xsl:for-each>
```

Betingelser:

```xml
<xsl:choose>
  <xsl:when test="$snitt > 90">A</xsl:when>
  <xsl:when test="$snitt > 85">B</xsl:when>
  <xsl:otherwise>F</xsl:otherwise>
</xsl:choose>
```

I øvingene brukes dette blant annet til å presentere studenter og beregne snitt:

```xpath
sum(<xpath>) div count(<xpath>)
```

## Vanlige feil

- feil bruk av absolutt og relativ sti
- glemme `@` foran attributt
- blande XPath-spørring og vanlig tekst uten å tenke på nodekontekst
- tro at `//` alltid er best; det kan bli for bredt
- glemme at XSLT bruker XPath i `select` og `match`

## Typiske eksamensoppgaver

- skriv XPath som finner bestemte noder eller teller forekomster
- forklar hva et XPath-uttrykk returnerer
- forklar kort hva en gitt XSLT gjør
- bruk `count`, `contains`, `starts-with`, `position`, `last` eller union

## Hva du bør øve på

- skrive egne XPath-uttrykk før du ser på løsning
- forklare forskjellen på element, attributt og tekstnode
- lese en enkel XSLT og markere hvor XPath brukes
