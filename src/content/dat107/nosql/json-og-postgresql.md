# JSON Og PostgreSQL

## Kjernen

JSON brukes til å lagre semistrukturerte data. I PostgreSQL er skillet mellom `json` og `jsonb` et viktig eksamenspunkt.

## Dette må du kunne

- forklare hva JSON er
- forklare forskjellen på `json` og `jsonb`
- bruke eller forklare `->` og `->>`
- forstå funksjoner som `jsonb_path_query`, `jsonb_path_exists` og `jsonb_set`
- forklare hvordan JSON kan genereres fra relasjonelle data

## Hovedskille

- `json`: lagrer original tekstform
- `jsonb`: lagrer intern representasjon som er bedre for søk, filtrering og oppdatering

I praktiske applikasjoner er `jsonb` ofte det riktige valget.

## Vanlige feil

- si at `json` og `jsonb` er det samme
- glemme at `->` og `->>` returnerer ulike typer
- fokusere bare på lagring, ikke på søk og oppdatering

## Typiske eksamensoppgaver

- sammenlign `json` og `jsonb`
- vis hvordan JSON kan lagres i PostgreSQL
- vis hvordan relasjonelle data kan bygges om til JSON

## Hva du bør øve på

- lese `studenter-json.sql`
- forklare når `jsonb_set` er nyttig
- skrive kort drøfting av hvorfor JSONB ofte er bedre til aktiv bruk i databasen
