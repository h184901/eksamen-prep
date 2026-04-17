# JPA-Gjengangere

## Vanlige oppgavetyper

- skriv entitetsklasser med annoteringer
- modeller 1:N eller M:N i Java
- skriv DAO-metoder for oppslag
- skriv JPQL-spørring med parameter
- registrer eller oppdater kobling mellom entiteter

## Det sensor ofte vil se

- riktige JPA-annotasjoner
- tydelig owning side
- konsistent toveis navigering når oppgaven ber om det
- bruk av `EntityManager` og transaksjon der det trengs
- håndtering av tomt resultat på en fornuftig måte

## Klassiske mønstre

### Hente liste basert på relasjon

Eksempeltype:

- hent filmer regissert av person
- hent ansatte i en avdeling
- hent prosjektdeltagelser for en ansatt

Her må du tenke på om du vil:

- navigere via objektgraf
- eller skrive JPQL direkte

### Mange-til-mange med egne felter

Hvis koblingen har rolle, timer eller lignende, er det ofte dette som skiller en sterk besvarelse fra en svak. Da bør du normalt modellere koblingen som egen entitet.

### `find` versus JPQL

- `find` passer for oppslag på primærnøkkel
- JPQL passer når du søker etter andre kriterier eller vil hente lister

## Typiske feil

- bruke tabell- eller kolonnenavn i stedet for entitets- og feltnavn i JPQL
- glemme `mappedBy` på inverse side
- bruke ren `@ManyToMany` når relasjonen har egne attributter
- glemme transaksjon rundt innlegging eller sletting

## Hva du bør øve på

- skrive én entitet fra tekstbeskrivelse uten hjelp
- skrive én DAO-metode med JPQL og parameter
- forklare forskjellen på `persist`, `merge` og `remove`

## Siste eksamenstips

Hvis relasjonen har egne felter, stopp opp og vurder om oppgaven egentlig vil ha en egen koblingsentitet.
