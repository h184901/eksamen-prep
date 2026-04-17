# XPath Og XSLT

## Kjernen

XPath brukes til å navigere i XML-trær. XSLT brukes til å transformere XML til annen struktur, ofte HTML.

## Dette må du kunne

- skrive enkle og mellomnivå XPath-uttrykk
- filtrere med predikater
- hente attributter og tekstverdier
- bruke funksjoner som `count`, `contains`, `starts-with`, `last`
- forklare hovedidéen i en enkel XSLT-transformasjon

## Typiske XPath-mønstre

```xpath
//person
//pulje[@pId='3']
//person[medlem='true']
count(//person)
//person[contains(navn, 'ens')]
```

## Hva XSLT-eksemplene viser

I kursmaterialet brukes XSLT til å:

- iterere over studenter
- beregne snitt med `sum(...) div count(...)`
- velge farge eller karakter med `xsl:choose`

## Vanlige feil

- feil bruk av absolutt og relativ sti
- glemme `@` foran attributt
- blande XPath-spørring og vanlig tekst uten å tenke på nodekontekst

## Typiske eksamensoppgaver

- skriv XPath som finner bestemte noder eller teller forekomster
- forklar hva et XPath-uttrykk returnerer
- forklar kort hva en gitt XSLT gjør

## Hva du bør øve på

- bruke `ovinger-med-løsningsforslag.md` aktivt som drill
- skrive egne XPath-uttrykk før du ser på løsning
