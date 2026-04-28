# Fra Modell Til Database

## Kjernen

Denne delen handler om å oversette en ER/UML-modell til konkrete tabeller, kolonner, primærnøkler og fremmednøkler. Etterpå bruker du normalisering til å kontrollere at tabellene ikke har unødvendig redundans.

En god eksamensbesvarelse viser både:

- mapping-reglene du bruker
- funksjonelle avhengigheter som begrunner normalformene

## Dette må du kunne

- mappe entiteter til tabeller og attributter til kolonner
- mappe 1:N med fremmednøkkel på N-siden
- mappe M:N med egen koblingstabell
- vurdere 1:1 med færrest mulig nullmerker
- håndtere svake entiteter, subtyper og flerverdiattributter
- forklare 1NF, 2NF, 3NF og hovedideen i BCNF

## Grunnregler for mapping

| Modell | Relasjonell database |
| --- | --- |
| Entitet | tabell |
| Attributt | kolonne |
| Identifikator | primærnøkkel |
| 1:N-forhold | fremmednøkkel på N-siden |
| M:N-forhold | koblingstabell |
| Flerverdiattributt | ekstra tabell |

## En-til-mange

![Mapping av 1:N](/content/dat107/assets/modellering/mapping-1n.png)

I et 1:N-forhold kopieres primærnøkkelen fra én-siden til mange-siden som fremmednøkkel.

Eksempel:

```text
Avdeling(avdnr, navn)
Ansatt(ansnr, navn, avdnr*)
```

`Ansatt.avdnr` peker til `Avdeling.avdnr`. Hvis alle ansatte må tilhøre en avdeling, bør fremmednøkkelen være `not null`.

## Mange-til-mange

![Mapping av M:N](/content/dat107/assets/modellering/mapping-mn.png)

M:N kan ikke lagres direkte med én fremmednøkkel. Lag en koblingstabell:

```text
Student(studentnr, navn)
Emne(emnekode, navn)
Eksamen(studentnr*, emnekode*, karakter)
```

Vanlig nøkkel i koblingstabellen er sammensatt: `(studentnr, emnekode)`. Hvis samme student kan ta samme emne flere ganger, må du legge til noe som skiller forsøkene, for eksempel `semester`.

## En-til-en

Ved 1:1 kan fremmednøkkelen legges i den ene eller den andre tabellen. Velg plassering ut fra:

- hvilken side som er obligatorisk
- hvor du får færrest nullmerker
- om entitetene egentlig bør slås sammen

Noen ganger er koblingstabell best, særlig hvis få forekomster på begge sider deltar.

## Svake entiteter

En svak entitet får fremmednøkkel til eieren, og denne fremmednøkkelen blir ofte del av primærnøkkelen.

Eksempel:

```text
Kino(kinonr, navn)
Kinosal(kinonr*, salnr, antall_plasser)
PK: (kinonr, salnr)
```

Dette viser både avhengigheten og at `salnr` bare er unikt innen én kino.

## Subtyper

Relasjonsdatabaser har ikke subtyper direkte. Tre vanlige løsninger:

| Variant | Fordel | Ulempe |
| --- | --- | --- |
| Supertype + subtypetabeller | tydelig arv, lite null | flere joins |
| Bare supertype | enkel spørring mot alle | mange nullmerker |
| Bare subtyper | få nullmerker | vanskelig å spørre etter alle samlet |

På eksamen er det viktigere å forklare konsekvensene enn å pugge én "riktig" variant.

## Ikke-atomære attributter

- Sammensatt attributt kan deles, for eksempel `navn` til `fornavn` og `etternavn`.
- Avledet attributt bør normalt beregnes, for eksempel alder fra fødselsdato.
- Flerverdiattributt bør bli egen tabell, for eksempel flere telefonnummer per person.

Dette henger direkte sammen med 1NF.

## Normalisering i kortform

![Normalformer](/content/dat107/assets/modellering/normalformer.png)

| Normalform | Ser etter | Typisk fiks |
| --- | --- | --- |
| 1NF | lister, repeterende grupper, ikke-atomære verdier | del opp i flere rader/tabeller |
| 2NF | avhengighet av bare del av sammensatt nøkkel | flytt ut attributtet |
| 3NF | ikke-nøkkel bestemmer annen ikke-nøkkel | lag egen tabell |
| BCNF | determinant som ikke er kandidatnøkkel | vurder videre oppdeling |

## 1NF

Alle verdier skal være atomære.

Brudd:

```text
Ansatt(ansnr, navn, telefoner)
telefoner = '12345678, 87654321'
```

Fiks:

```text
Ansatt(ansnr, navn)
AnsattTelefon(ansnr*, telefonnr)
```

## 2NF

2NF gjelder når primærnøkkelen er sammensatt. Ingen ikke-nøkkelattributter skal avhenge av bare en del av nøkkelen.

Brudd:

```text
ProsjektDeltakelse(ansnr, prosjektnr, ant_timer, ansattnavn)
FD: ansnr -> ansattnavn
```

`ansattnavn` avhenger bare av `ansnr`, ikke av hele nøkkelen `(ansnr, prosjektnr)`.

Fiks:

```text
ProsjektDeltakelse(ansnr*, prosjektnr*, ant_timer)
Ansatt(ansnr, ansattnavn)
```

## 3NF

3NF fjerner transitive avhengigheter mellom ikke-nøkkelattributter.

Klassisk eksempel:

```text
Ansatt(ansnr, navn, postnr, poststed)
FD: ansnr -> navn, postnr, poststed
FD: postnr -> poststed
```

`poststed` bestemmes av `postnr`, ikke direkte av ansatt som konsept.

Fiks:

```text
Ansatt(ansnr, navn, postnr*)
Poststed(postnr, poststed)
```

## Views i design

Views kan brukes for å gi brukere et enklere bilde av databasen, skjule intern struktur eller bevare et gammelt grensesnitt når tabellstrukturen endres. Et view er vanligvis ikke en ny lagret kopi, men en definert spørring som oppfører seg som en virtuell tabell.

## Vanlige feil

- hevde 3NF uten å vise funksjonelle avhengigheter
- glemme egen tabell for M:N
- splitte samme determinant i flere unødvendige tabeller
- lagre avledede verdier uten grunn
- denormalisere på eksamen uten at oppgaven ber om det
- blande konseptuell modell, logisk modell og fysisk SQL-syntaks

## Typiske eksamensoppgaver

- bestem tabeller fra modell eller tekst
- vis nøkler og fremmednøkler for 1:N og M:N
- vis at tabellene er i 3NF
- forklar hvorfor et attributt må skilles ut i egen tabell
- velg subtype-strategi og begrunn valget

## Hva du bør øve på

- gjøre en rask 3NF-sjekk med funksjonelle avhengigheter
- normalisere tabeller med sammensatt nøkkel
- forklare hvorfor historikk per år eller per dato krever egen tabell
