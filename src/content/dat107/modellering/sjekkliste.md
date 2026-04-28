# Kortversjon Og Sjekkliste

## Før du tegner ER-modell

- Hva er oppgaven egentlig ute etter?
- Hvilke ting må databasen huske over tid?
- Hvilke ting er bare beskrivelser, og hvilke er egne objekter?
- Finnes hendelser som bør modelleres, for eksempel utlån, betaling eller bestilling?
- Finnes historikk, for eksempel pris per dato eller medlemsavgift per år?

## Hurtigsjekk for ER-modell

- Er alle entiteter selvstendige ting, ikke bare attributter?
- Har hver entitet en tydelig identifikator?
- Er kardinaliteten begrunnet i teksten?
- Har du både minimum og maksimum der det er relevant?
- Finnes svake entiteter som må pekes ut?
- Har relasjonen egne attributter som må modelleres?
- Er M:N markert slik at den kan løses opp senere?
- Har egenforhold tydelige roller?

## Kråkefot du må kunne lese

| Symbolidé | Betydning |
| --- | --- |
| sirkel | valgfri deltakelse, minimum 0 |
| strek | obligatorisk deltakelse, minimum 1 |
| kråkefot | maksimum mange |
| dobbel strek | nøyaktig 1 |

## Hurtigsjekk for mapping til tabeller

- Har hver tabell en primærnøkkel?
- Er 1:N mappet med fremmednøkkel på N-siden?
- Er obligatoriske fremmednøkler `not null` i tankegangen?
- Er M:N løst som egen koblingstabell?
- Har koblingstabeller fått egne attributter der relasjonen har egenskaper?
- Er svake entiteter håndtert med sammensatt nøkkel eller begrunnet surrogatnøkkel?
- Er subtyper mappet med en bevisst strategi?

## Hurtigsjekk for normalisering

- 1NF: én verdi per celle, ingen lister eller repeterende grupper?
- 2NF: ingen delvis avhengighet av bare del av sammensatt nøkkel?
- 3NF: ingen ikke-nøkkel som bestemmer en annen ikke-nøkkel?
- Har du skrevet funksjonelle avhengigheter eksplisitt?
- Har du samlet flere attributter med samme determinant i samme nye tabell?
- Har du unngått denormalisering med mindre oppgaven ber om det?

## Ord du må kunne forklare

- relasjon, attributt, tuppel og domene
- entitet, entitetsforekomst og forhold
- kardinalitet og minimum/maksimum
- svak entitet og identifiserende forhold
- assosiativ entitet
- primærnøkkel, kandidatnøkkel, supernøkkel og fremmednøkkel
- funksjonell avhengighet
- 1NF, 2NF, 3NF og BCNF
- fan trap og chasm trap

## Eksamenstaktikk

- Start med kravene, ikke SQL.
- Skriv antakelser hvis teksten er uklar.
- Begrunn kardinalitet med konkrete formuleringer fra oppgaven.
- Vis `PK` og `FK` tydelig i tabellskjemaet.
- Ved normalisering: skriv `X -> Y` før du deler tabellen.
- Hvis noe endrer seg over tid, vurder historikktabell med dato/år som del av nøkkelen.

## Vanlige eksamensfeller

- påstå 3NF uten funksjonelle avhengigheter
- modellere historikk som mange årskolonner
- glemme egen tabell for M:N
- bruke fremmednøkkel på feil side av 1:N
- bruke samme navn på flere roller i et egenforhold
- blande ER-figuren og tabellstrukturen slik at løsningen motsier seg selv
