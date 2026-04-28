# Introduksjon

## Kjernen

Modellering er arbeidet med å bestemme hvilken informasjon databasen skal lagre, og hvordan informasjonen henger sammen. I DAT107 er dette en egen eksamensdel: du skal kunne gå fra tekstbeskrivelse til ER-modell, videre til tabeller, og til slutt kontrollere at tabellene er normalisert.

En god modell svarer på tre spørsmål:

- hvilke ting domenet består av
- hvilke opplysninger som hører til hver ting
- hvilke regler som gjelder mellom tingene

## Dette må du kunne

- forklare relasjonsmodellen som teorien bak tabeller, nøkler og SQL
- identifisere entiteter, attributter, identifikatorer og forhold fra tekst
- angi minimums- og maksimumskardinalitet i ER/UML
- skille 1:1, 1:N og M:N, og se når en relasjon trenger egne attributter
- mappe ER-modell til tabeller med primærnøkler og fremmednøkler
- bruke funksjonelle avhengigheter til å argumentere for 1NF, 2NF og 3NF

## Arbeidsflyten

1. Les kravteksten og marker substantiver, hendelser, regler og tallord.
2. Lag en begrepsmessig modell: entiteter, attributter og forhold.
3. Sett kardinalitet og obligatorisk/frivillig deltakelse.
4. Oversett modellen til en logisk tabellstruktur.
5. Sjekk normalformer med funksjonelle avhengigheter.

På eksamen bør du vise nok mellomregning til at sensor ser hvorfor tabellene dine ble som de ble. En ferdig tabelliste uten begrunnelse er svakere enn en løsning som viser valg av nøkler, koblingstabeller og normaliseringsargumenter.

## Modellering versus SQL

SQL handler om å bruke en tabellstruktur. Modellering handler om å lage tabellstrukturen. Hvis modellen er feil, kan SQL-spørringene bli kompliserte, misvisende eller umulige å skrive korrekt.

Eksempel: medlemsavgift per år bør ikke bli kolonnene `avgift2024`, `avgift2025` og `avgift2026`. Det er historiske data og bør normalt modelleres som egen tabell, for eksempel `Medlemsavgift(medlemsnr, aar, belop)`.

## Typiske eksamensoppgaver

- tegn ER-modell fra en tekstlig beskrivelse
- forklar kardinalitet og identifikatorer
- mapp en ER-modell til tabeller
- vis at tabellene er i 3NF, eller pek på bruddet og fiks det
- drøft om noe bør være attributt, entitet eller egen historikktabell

## Vanlige feil

- begynne med SQL før du har bestemt modellen
- gjøre M:N direkte med fremmednøkkel på én side
- glemme minimumskardinalitet, for eksempel om noe er valgfritt
- påstå 3NF uten å skrive funksjonelle avhengigheter
- blande ER-modell og fysisk SQL-tabellstruktur uten å være tydelig

## Hva du bør øve på

- ta en kort tekst og finne entiteter, relasjoner og kardinalitet på fem minutter
- forklare forskjellen på entitet, attributt og forhold med egne eksempler
- skrive tabellskjemaer med `PK` og `FK`
- normalisere små tabeller ved hjelp av `X -> Y`
