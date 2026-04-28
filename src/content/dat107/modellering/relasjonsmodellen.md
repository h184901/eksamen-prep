# Relasjonsmodellen

## Kjernen

Relasjonsmodellen er teorigrunnlaget for relasjonsdatabaser. Den sier at data kan beskrives som relasjoner, altså tabeller, og at vi kan behandle tabellene med presise regler for nøkler, integritet og spørringer.

Modellen består av tre deler:

| Del | Handler om | I praksis |
| --- | --- | --- |
| Datastruktur | Hvordan data representeres | tabeller, rader og kolonner |
| Integritetsregler | Hva som er lovlige data | primærnøkler og fremmednøkler |
| Datamanipulering | Hvordan data hentes og endres | relasjonsalgebra og SQL |

Et viktig poeng er representasjonsuavhengighet: programmer skal beskrive hva de vil ha, ikke hvordan databasen fysisk finner dataene.

## Hva er en relasjon?

En relasjon kan tenkes som en tabell med disse egenskapene:

- kolonnenavn er unike innen tabellen
- rekkefølgen på kolonnene betyr ikke noe
- rekkefølgen på radene betyr ikke noe
- ingen rader skal være helt like
- hver verdi skal være atomær

Atomær betyr at én celle inneholder én verdi, ikke en liste eller en ny tabell. Dette bryter 1NF:

| ProsjektNr | Ansatte |
| ---: | --- |
| 1001 | 1 |
| 1002 | 4, 8, 13, 20 |

Det bør heller modelleres med en egen koblingstabell, for eksempel `ProsjektDeltakelse(prosjektnr, ansattnr)`.

## Viktige begreper

- **Relasjon**: tabell i relasjonsmodellen.
- **Attributt**: kolonne.
- **Tuppel**: rad.
- **Domene**: mengden lovlige verdier for et attributt.
- **Supernøkkel**: kolonner som bestemmer hele raden.
- **Kandidatnøkkel**: minimal supernøkkel.
- **Primærnøkkel**: valgt kandidatnøkkel.
- **Fremmednøkkel**: kolonne(r) som peker til primærnøkkel i en annen tabell.

Alle tabeller bør ha en primærnøkkel. Det kan finnes flere kandidatnøkler, men designeren velger én av dem som primærnøkkel.

## Funksjonelle avhengigheter

En funksjonell avhengighet `A -> B` betyr at samme verdi i `A` alltid gir samme verdi i `B`.

Eksempler:

- `postnr -> poststed`
- `ansattnr -> fornavn, etternavn, stilling`
- `varenr -> betegnelse, pris, katnr`

Funksjonelle avhengigheter er ikke bare noe du kan lese ut av eksempeldata. Du må kjenne betydningen av dataene. Hvis to rader tilfeldigvis har samme verdi, betyr ikke det automatisk at en avhengighet gjelder.

## Nøkler med avhengigheter

En supernøkkel `X` bestemmer alle attributter i tabellen:

```text
X -> alle kolonner
```

En kandidatnøkkel er en supernøkkel uten overflødige kolonner. Hvis `Ansatt(ansnr, personnr, navn)` har både `ansnr -> navn` og `personnr -> navn`, kan både `ansnr` og `personnr` være kandidatnøkler.

I en tabell med sammensatt nøkkel må hele nøkkelen være nødvendig. Hvis en ikke-nøkkelkolonne avhenger av bare én del av nøkkelen, har du et 2NF-problem.

## Relasjonsalgebra

Relasjonsalgebra er et formelt spørrespråk. SQL er bygd rundt de samme ideene.

| Relasjonsalgebra | Betydning | SQL-idé |
| --- | --- | --- |
| seleksjon | velge rader | `where` |
| projeksjon | velge kolonner | `select kolonner` |
| kryssprodukt | alle kombinasjoner | tabeller uten join-betingelse |
| likekobling | koble på lik verdi | `join ... on ...` |
| union | rader fra begge | `union` |
| differanse | rader i den ene, ikke den andre | `except`/`minus` |

Eksempel:

```text
π navn, lønn (σ lønn > 600000 (Ansatt))
```

Tilsvarer:

```sql
select navn, lonn
from ansatt
where lonn > 600000;
```

## Vanlige feil

- si at en tabell er en relasjon uten å nevne rad- og kolonnerekkefølge
- glemme kravet om atomære verdier
- blande kandidatnøkkel og primærnøkkel
- bruke funksjonelle avhengigheter som bare er tilfeldige i eksempeldata
- ignorere relasjonsalgebra fordi den ser teoretisk ut

## Typiske eksamensoppgaver

- forklar forskjellen på supernøkkel, kandidatnøkkel og primærnøkkel
- finn funksjonelle avhengigheter i en tabell
- bruk `postnr -> poststed` til å forklare et normaliseringsproblem
- oversett enkel relasjonsalgebra til SQL eller omvendt

## Hva du bør øve på

- skrive `X -> Y` fra en tekstbeskrivelse
- identifisere kandidatnøkler i små tabeller
- forklare seleksjon, projeksjon og join uten SQL-syntaks
