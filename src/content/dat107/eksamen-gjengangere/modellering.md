# Modellering Og Normalisering-Gjengangere

## Vanlige oppgavetyper

- tegn logisk ER-modell
- bestem hensiktsmessige tabeller
- angi PK, FK og datatyper
- forklar min/maks-kardinalitet
- vis at løsningen er i minst 3NF

## Hva som går igjen i tekstbeskrivelsene

- én hovedorganisasjon med underenheter
- personer som både kan være medlemmer, ansatte eller ledere
- historiske data som går over år eller hendelser
- mange-til-mange-relasjoner som må løses eksplisitt

## Typiske steder kandidater bommer

- historiske data legges som repeterende kolonner i samme tabell
- M:N-relasjoner blir ikke løst som egen tabell
- lederrelasjon blandes sammen med vanlig medlemskap eller ansettelse
- normalisering hevdes uten å vise reelle avhengigheter

## Hva en sterk besvarelse viser

- konsistent modell fra start til slutt
- tydelige begrunnelser for nøkler
- eksplisitt forklaring på 1NF, 2NF og 3NF
- forståelse for at normalisering handler om avhengigheter, ikke bare antall tabeller

## Hva du bør øve på

- identifisere funksjonelle avhengigheter fra tekst
- oppdage når en detalj egentlig krever egen entitet
- forklare hvorfor `postnr -> poststed` er relevant for 3NF-tenkning

## Siste eksamenstips

Ikke skriv bare at løsningen er i 3NF. Skriv hvilke avhengigheter som gjør at den er det.
