# Fra Modell Til Database

## Kjernen

Denne delen handler om å oversette en modell til konkrete tabeller, nøkler og fremmednøkler, og samtidig få en løsning som er minst i 3NF.

## Dette må du kunne

- mappe 1:N til fremmednøkkel på N-siden
- mappe M:N til egen koblingstabell
- se når historiske data krever egen tabell
- forklare 1NF, 2NF og 3NF med ord og med eksempel

## Normalisering i kortform

- 1NF: én verdi per celle, ingen repeterende grupper
- 2NF: ingen delvis avhengighet av bare del av sammensatt nøkkel
- 3NF: ingen transitiv avhengighet mellom ikke-nøkkelattributter

Klassisk eksempel:

- `postnr -> poststed`

Da er det et faresignal hvis `poststed` kopieres mange steder uten god grunn.

## Vanlige feil

- hevde 3NF uten å vise hvilke avhengigheter man bruker
- glemme egen tabell for M:N
- glemme historikk som går over flere år eller hendelser
- blande modell og tabellstruktur slik at besvarelsen blir inkonsistent

## Typiske eksamensoppgaver

- bestem tabeller fra modell eller tekst
- vis at tabellene er i 3NF
- forklar hvorfor et attributt må skilles ut i egen tabell

## Hva du bør øve på

- gjøre en rask 3NF-sjekk med funksjonelle avhengigheter
- forklare hvorfor en medlemsavgift per år ikke bør ligge som mange kolonner i samme tabell
