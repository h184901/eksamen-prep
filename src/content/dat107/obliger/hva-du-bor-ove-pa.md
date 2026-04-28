# Hva du bør øve på

## Kort oppsummering

Obligene trener ikke fire isolerte fag. De trener samme kjernemønster på ulike nivåer:

1. Gå fra tekstkrav til datastruktur.
2. Velg nøkler og constraints.
3. Skriv eller forklar operasjoner på modellen.
4. Begrunn valgene faglig.

## Mønsteret på tvers

| Oblig | Case | Kjerneferdighet |
| --- | --- | --- |
| Oblig 1 | Bompenger | SQL-design, `NULL`, joins og testdata |
| Oblig 2 | Forening | ER, kardinalitet, historikk og 3NF |
| Oblig 3 | Firma | JPA-mapping, DAO og relasjoner |
| Oblig 4 | Hobbyhuset | XML/JSON, migrering og dokumentmodell |

## Dette må du kunne etter obligene samlet

- gå fra tekst til tabeller eller dokumentstruktur
- velge og begrunne nøkler
- håndtere spesialtilfeller som manglende skilt, historikk og sjefskrav
- se når en relasjon må bli egen tabell eller entitet
- skrive kort, faglig begrunnelse for valgene dine
- lage testdata som faktisk avslører modellfeil
- forklare forskjellen på relasjonsmodell, JPA-objektmodell og dokumentmodell

## Spesialtilfeller du bør kjenne igjen

| Spesialtilfelle | Fra oblig | Eksamensmønster |
| --- | --- | --- |
| Passering uten lest skilt | Oblig 1 | `NULL`, ytre join, modellvalg |
| Medlemsavgift per år | Oblig 2 | historiske data, sammensatt nøkkel |
| Leder er også medlem/ansatt | Oblig 2/3 | relasjon med ekstra regel |
| Prosjektdeltagelse med rolle/timer | Oblig 3 | M:N med assosiasjonsentitet |
| Ordre med ordrelinjer | Oblig 4 | embedded dokument eller relasjonstabeller |

## Hvordan bruke obligene som repetisjon

Ikke les obligene som gamle innleveringer. Bruk dem som mønsterbank:

1. Skriv kravene med egne ord.
2. Tegn eller skisser modellen.
3. Finn nøkler, fremmednøkler og obligatoriske felter.
4. Skriv én representativ spørring/metode.
5. Skriv to setninger som begrunner designvalget.

Dette er nærmere eksamen enn å lese en ferdig løsning passivt.

## Hva du bør øve mest på

- løse små deloppgaver uten hjelpemidler
- forklare hvorfor du velger én modell fremfor en annen
- skrive `LEFT JOIN` når manglende kobling skal med
- vise 3NF med funksjonelle avhengigheter
- skrive JPA-relasjoner med owning side og `mappedBy`
- beskrive samme data som relasjonstabeller og JSON-dokument

## Mini-drill

Velg ett case og svar på disse uten notater:

1. Hva er hovedentitetene?
2. Hvilke regler må modellen håndheve?
3. Hvilken relasjon er lett å modellere feil?
4. Hvilken SQL/JPA/JSON-teknikk tester caset?
5. Hva ville du skrevet som begrunnelse på eksamen?

## Vanlige helhetsfeil

- starte med teknologi før du forstår kravene
- lage modell uten testdata
- forklare syntaks, men ikke designvalg
- bruke samme modell uansett om data skal leses samlet eller kobles fleksibelt
- glemme at eksamen ofte tester små varianter av obligmønstrene
