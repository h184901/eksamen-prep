# Kortversjon Og Sjekkliste

## Spørringsrekkefølge du må huske

`select -> from -> where -> group by -> having -> order by`

## Hurtigsjekk for SQL-oppgaver

- Hva er tabellene?
- Hva er koblingene?
- Trenger du `join` eller `left join`?
- Er betingelsen på rader eller grupper?
- Må noe telles eller summeres?
- Skal resultatet sorteres?

## Hurtigsjekk for modell og 3NF

- Har hver tabell en tydelig PK?
- Er M:N løst som egen tabell?
- Finnes det historiske data som trenger egen tabell?
- Har du transitive avhengigheter som `postnr -> poststed`?

## Ord du må kunne forklare

- primærnøkkel
- fremmednøkkel
- kandidatnøkkel
- funksjonell avhengighet
- 1NF, 2NF, 3NF
- `join`, `left join`
- `where`, `having`
- indeks
- transaksjon
- ACID

## Vanlige eksamensfeller

- feil join-betingelse
- `where` i stedet for `having`
- glemme `group by`
- påstå 3NF uten begrunnelse
- glemme `null`-tilfeller
