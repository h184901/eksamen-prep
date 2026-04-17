# Dokumentdatabaser Og Valg

## Kjernen

Dette er den mest eksamensnære drøftingsdelen i NoSQL-stoffet: når bør du velge dokumentmodell, når bør du velge relasjonsmodell, og hva taper eller vinner du på valget?

## Dette må du kunne

- forklare forskjellen på relasjonell og dokumentorientert modell
- forklare hvorfor data kan bli duplisert i dokumentdatabaser
- begrunne når innebygde dokumenter er naturlige
- forklare fordeler og ulemper ved nøkkel-verdi og dokumentdatabaser

## Typiske drøftingspunkter

- relasjonsmodell er sterk på integritet og fleksible joins
- dokumentmodell er ofte sterk når hele objektgrafen leses samlet
- dokumentmodell kan gjøre noen lesemønstre enkle, men oppdatering og konsistens mer krevende
- hybrid lagring i PostgreSQL kan være et mellomtrinn

## Webtjenester-koblingen

- SOAP forbindes ofte med XML
- REST forbindes ofte med JSON

Dette forklarer hvorfor formatvalg også påvirker lagring og systemdesign.

## Vanlige feil

- skrive ren synsing uten å knytte argumentene til domenet i oppgaven
- glemme å nevne duplisering og konsistensutfordringer
- bare snakke om teknologi, ikke om datamodell

## Typiske eksamensoppgaver

- lag forslag til dokumentdatabase for et gitt domene
- sammenlign dokumentdatabase og relasjonsdatabase
- begrunn hvilken løsning du mener passer best

## Hva du bør øve på

- ta et relasjonelt case og beskrive det som ett eller flere dokumenter
- skrive korte, balanserte drøftinger med både fordeler og ulemper
