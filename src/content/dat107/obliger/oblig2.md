# Oblig 2: Modellering og normalisering

## Kjernen

Oblig 2 trener datamodellering og normalisering. Leveransen er en logisk ER-modell for et medlemssystem og en konkret forklaring på at tabellene minst tilfredsstiller 3NF.

## Hva denne obligen trener

- ER-modellering fra tekst
- historiske data som medlemsavgift per år
- min/maks-kardinalitet
- leder som medlem og lederforhold som relasjon
- sterke/svake entiteter eller UML-aggregering
- 1NF, 2NF og 3NF
- skriftlig begrunnelse for designvalg

## Case

En forening trenger et system for medlemmer og lokallag.

Et medlem har:

- medlemsnummer
- fornavn og etternavn
- telefonnummer
- epost
- postnummer og poststed
- gatenavn og husnummer
- informasjon om personen fortsatt er medlem

Et lokallag har:

- lagnavn
- møtelokale med adresse
- medlemmer
- en leder som også er medlem

Medlemsavgift må lagres historisk per medlem per år.

## De viktigste designvalgene

| Tema | Hva du må ta stilling til |
| --- | --- |
| Medlem og lokallag | Hvert medlem er med i nøyaktig ett lokallag |
| Leder | Leder er også medlem, ikke en separat persontype |
| Medlemsavgift | Betaling per medlem per år bør være egen historisk struktur |
| Adresse/poststed | Velg om postnummer/poststed modelleres som attributter eller egen tabell |
| Kardinalitet | Min/maks må vises tydelig |
| Normalisering | Vis 1NF, 2NF og 3NF med konkrete avhengigheter |

## Historiske data

Ikke lag én kolonne per år:

```text
betalt2019, betalt2020, betalt2021
```

Dette bryter med god modellering fordi nye år krever nye kolonner. Bruk heller en historikktabell:

```text
Medlemsavgift(medlemsnr*, aar, betalt)
PK = (medlemsnr, aar)
```

Da kan modellen håndtere nye år uten strukturendring.

## Lederforholdet

Leder er en relasjon mellom `Lokallag` og `Medlem`, ikke en ny personkopi.

Et vanlig mønster:

```text
Medlem(medlemsnr, ..., lokallag_id*)
Lokallag(lokallag_id, ..., leder_medlemsnr*)
```

Du må forklare regelen: lederen for et lokallag skal også være medlem i samme lokallag. Denne regelen kan være vanskelig å uttrykke med bare en enkel fremmednøkkel, så den bør beskrives eksplisitt.

## Normalisering

Besvarelsen må vise normalformene, ikke bare påstå dem.

| Normalform | Konkret forklaring |
| --- | --- |
| 1NF | Attributter er atomære. Ingen lister eller repeterende grupper i én celle. |
| 2NF | Ikke-nøkkelattributter avhenger av hele primærnøkkelen, spesielt ved sammensatte nøkler. |
| 3NF | Ingen transitive avhengigheter fra nøkkel via ikke-nøkkelattributter. |

Eksempel: Hvis `postnr -> poststed`, kan det være en transitiv avhengighet dersom poststed lagres sammen med medlem uten begrunnelse. Du kan enten normalisere til en `Poststed`-tabell eller begrunne hvorfor du holder det enkelt.

## Besvarelsesstrategi

Start med kravene, ikke tabellene. Marker substantiver og regler:

- Medlem
- Lokallag
- Betaling per år
- Leder
- Nøyaktig ett lokallag per medlem

Tegn modellen før du skriver tabeller. Deretter skriv tabellskjema med PK/FK, og bruk skjemaet til å forklare normalisering.

## Vanlige feil

- legge historiske år som mange kolonner i samme tabell
- blande lokallagsleder og vanlig medlemstilknytning
- ikke vise min/maks-kardinalitet tydelig
- glemme at leder også er medlem
- la medlem ha flere lokallag uten at det stemmer med kravet
- påstå 3NF uten funksjonelle avhengigheter eller konkret forklaring
- ha én figur og én tabellbeskrivelse som ikke stemmer overens

## Typiske eksamensoppgaver

- organisasjon, campus, fakultet, medlem, lokallag og lignende domener
- modellering + 3NF i samme oppgave
- historiske data som pris, medlemskap, betaling eller status per periode
- leder/ansvarlig/rolle som egentlig er en relasjon

## Hva du bør øve på

- tegn modellen før du tenker SQL
- forklar hvorfor en egen avgiftstabell er naturlig
- skriv tre funksjonelle avhengigheter fra modellen
- vis hvorfor en tabell med sammensatt nøkkel er i 2NF

## Sjekkliste

- ER-modellen er logisk og fullstendig.
- Alle entiteter, attributter, nøkler og forhold er lesbare.
- Min/maks-kardinalitet er synlig.
- Leder, lokallagstilhørighet og betaling per år er modellert.
- Tabellene er forklart med PK, FK og datatyper.
- 1NF, 2NF og 3NF er forklart konkret for modellen.
- Modellen og teksten sier det samme.
