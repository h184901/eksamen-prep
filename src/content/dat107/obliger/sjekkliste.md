# Kortversjon og sjekkliste

## Oblig 1: SQL

- Kan du lage `Bil` og `Passering` med riktige nøkler?
- Kan modellen lagre passering uten lest skilt?
- Kan du forklare `NULL`/`NOT NULL`-valgene?
- Kan du skrive `LEFT JOIN` som tar med passeringer uten bil?
- Kan du skrive `INNER JOIN`/vanlig join for bare kjente biler?
- Kan du telle per registreringsnummer med `GROUP BY`?
- Kan du finne siste passering for én bil?

## Oblig 2: Modellering og normalisering

- Kan du identifisere `Medlem`, `Lokallag` og betaling per år?
- Kan du modellere at hvert medlem tilhører nøyaktig ett lokallag?
- Kan du modellere leder som medlem?
- Kan du forklare hvorfor medlemsavgift per år er historiske data?
- Kan du vise min/maks-kardinalitet?
- Kan du forklare 1NF, 2NF og 3NF konkret?
- Kan du skrive funksjonelle avhengigheter for modellen?

## Oblig 3: JPA

- Kan du få en minimal `Ansatt`-entitet til å virke med `find()`?
- Kan du forklare hva `persistence.xml` må inneholde?
- Kan du skrive en DAO-metode med transaksjon?
- Kan du mappe `Ansatt` og `Avdeling` med riktig owning side?
- Kan du forklare høna-og-egget-problemet med sjef og avdeling?
- Kan du modellere `Prosjektdeltagelse` som egen entitet?
- Kan du forklare hvorfor ren `@ManyToMany` ikke holder når rolle og timer finnes?

## Oblig 4: NoSQL

- Kan du opprette XML-kolonner i PostgreSQL?
- Kan du hente verdier med `xpath()`?
- Kan du filtrere med `xpath_exists()`?
- Kan du forklare `XMLAGG` for nested ordrelinjer?
- Kan du lage JSON-dokument for `kunde`, `vare` og `ordre`?
- Kan du forklare hvorfor ordrelinjer kan være embedded i ordre?
- Kan du forklare forskjellen på migrering og datamodellvalg?
- Kan du beskrive CRUD-metodene i `KundeRepository`?

## Hurtigsjekk på tvers

- Kan du forklare valgene dine?
- Kan du gå fra domene til modell?
- Kan du peke ut spesialtilfellet i caset?
- Kan du lage testdata som dekker spesialtilfellet?
- Kan du løse små variantoppgaver uten originalobligene?
- Kan du skrive en kort drøfting, ikke bare kode?

## Siste repetisjon

Bruk denne kjeden:

```text
kravtekst -> modellvalg -> nøkler/constraints -> operasjon/spørring -> begrunnelse
```

Hvis du kan gjøre dette for alle fire obligene, dekker du mye av eksamensformen i DAT107.
