# Oblig 3: JPA

## Kjernen

Oblig 3 er en praktisk JPA-øvelse med ansatte, avdelinger, prosjekter og prosjektdeltagelse. Den trener hele kjeden fra relasjonsmodell til JPA-entiteter, DAO-klasser, transaksjoner og et enkelt program.

## Hva denne obligen trener

- iterativ utvikling av et JPA-prosjekt
- SQL-skript og databaseoppsett
- `persistence.xml`
- entiteter, relasjoner og annotasjoner
- DAO-struktur og transaksjoner
- høna-og-egget-problemer mellom avdeling og sjef
- mange-til-mange med rolle og timer som koblingsentitet
- praktisk dokumentasjon av hva som virker

## Case

Programmet skal holde orden på ansatte, avdelinger og prosjekter.

En ansatt har:

- automatisk generert ansatt-id
- unikt brukernavn med initialer
- fornavn og etternavn
- ansettelsesdato
- stilling
- månedslønn
- avdeling
- prosjektdeltagelser med rolle og timer

En avdeling har:

- automatisk generert avdeling-id
- navn
- sjef, som er en ansatt i avdelingen

Et prosjekt har:

- automatisk generert prosjekt-id
- navn
- beskrivelse
- ansatte som deltar eller har deltatt, med rolle og timer

## Integritetsregler som styrer modellen

| Regel | Konsekvens |
| --- | --- |
| En ansatt må jobbe i en avdeling | `Ansatt` må ha avdeling |
| En avdeling må ha sjef | `Avdeling` må peke til en ansatt |
| Sjefen jobber i samme avdeling | Krever konsistent kode eller ekstra kontroll |
| Avdeling med ansatte bør ikke slettes | FK-regler eller kodekontroll |
| Ansatt som er sjef bør ikke slettes | FK-regler eller kodekontroll |
| Ansatt kan delta i flere prosjekter | M:N |
| Prosjektdeltagelse har rolle og timer | M:N må bli egen entitet |

## Anbefalt arbeidsmåte

Obligen anbefaler iterativ og inkrementell utvikling. Ikke vent med testing til alt er modellert. Få en liten ende-til-ende-løsning til å virke først.

## Iterasjon 1: Kontakt med databasen

Mål: få Java, JPA og PostgreSQL til å snakke sammen.

Start bare med `Ansatt`.

Dette skal virke:

- Maven-prosjekt med riktige avhengigheter
- SQL-skript for `Ansatt`
- `persistence.xml` med riktig databaseinfo
- `Ansatt` som entitetsklasse
- `Main` som henter én ansatt med `find()`

Nøkkelord:

```text
EntityManagerFactory, EntityManager, try, find(), finally, close()
```

## Iterasjon 2: DAO og menyprogram

Lag en DAO-klasse:

```java
public class AnsattDAO {
    public Ansatt finnAnsattMedId(int id) { ... }
}
```

Første funksjoner:

- søke etter ansatt på id
- søke etter ansatt på brukernavn
- liste alle ansatte
- oppdatere stilling og lønn
- legge inn ny ansatt

Bruk tid på databaselogikk før brukergrensesnitt. Det er greit at input først er enkel eller delvis hardkodet.

## Iterasjon 3: Avdeling

Utvid med `Avdeling` og relasjonen mellom `Ansatt` og `Avdeling`.

Det finnes to koblinger:

1. Ansatt jobber i avdeling.
2. Avdeling har sjef som er ansatt.

Du må oppdatere:

- SQL-skript
- entitetsklassene
- `persistence.xml`
- DAO-laget
- testdata

## Høna-og-egget-problemet

Avdeling og sjef kan skape sirkulære avhengigheter:

- ansatt må ha avdeling
- avdeling må ha sjef
- sjef er en ansatt i samme avdeling

Praktiske løsninger:

- opprett rader først og sett sjef med `UPDATE` etterpå
- legg til én FK med `ALTER TABLE` etter at begge tabeller finnes
- tillat `NULL` midlertidig der det er faglig forsvarlig
- styr rekkefølgen i JPA-koden og test databaseconstraints tidlig

## Iterasjon 4: Flere funksjoner

Når grunnmodellen virker, utvid med:

- søk på ansatt-id og brukernavn
- liste alle ansatte
- oppdatere stilling/lønn
- legge inn ny ansatt med avdeling
- søke etter avdeling
- liste ansatte i avdeling og markere sjef
- flytte ansatt til ny avdeling, men ikke hvis ansatt er sjef
- legge inn ny avdeling med eksisterende ansatt som sjef

## Iterasjon 5: Prosjekt og prosjektdeltagelse

`Ansatt` og `Prosjekt` er M:N, men forholdet har egne attributter:

- rolle
- antall timer

Derfor skal `Prosjektdeltagelse` være egen entitet.

Typisk struktur:

```text
Ansatt 1:N Prosjektdeltagelse N:1 Prosjekt
```

Programmet bør kunne:

- legge inn nytt prosjekt
- registrere prosjektdeltagelse
- føre timer
- skrive ut prosjektinfo med deltagere, roller, timer og totalt timetall

## Hva er viktigst hvis du ikke rekker alt?

En uferdig løsning kan fortsatt vise god forståelse hvis du dokumenterer hva som virker. Prioriter:

1. Fungerende databaseoppsett.
2. Riktige entiteter og relasjoner.
3. DAO-metoder med transaksjoner.
4. Tydelig dokumentasjon av begrensninger.

Ikke bruk tiden på et polert menyprogram før database- og JPA-kjernen virker.

## Vanlige feil

- bruke for mye energi på brukergrensesnitt
- hoppe rett til full modell uten fungerende første iterasjon
- glemme entitetsklasser i `persistence.xml`
- ha feil database, bruker eller passord ved levering
- ikke håndtere høna-og-egget mellom ansatt og avdeling
- la sjef bytte avdeling uten å ivareta sjefskravet
- modellere prosjektdeltagelse som ren `@ManyToMany`
- levere uten SQL-skriptet som oppretter databasen

## Typiske eksamensoppgaver

- JPA-entiteter med 1:N og 1:1
- DAO-metoder i liten skala
- transaksjoner rundt `persist`, `merge` og `remove`
- kobling mellom modellering og JPA-annotasjoner
- M:N med assosiasjonsentitet

## Hva du bør øve på

- beskrive én iterativ framgangsmåte for et lite JPA-prosjekt
- skrive entiteter for `Ansatt`, `Avdeling`, `Prosjekt` og `Prosjektdeltagelse`
- forklare høna-og-egget-problemet muntlig
- skrive én DAO-metode med transaksjon

## Sjekkliste

- Databasen finnes og inneholder nødvendige data.
- `persistence.xml` peker til riktig database.
- SQL-skriptet kan opprette tabeller og testdata.
- Maven-prosjektet kan åpnes og kjøres.
- `Ansatt` og `Avdeling` er dokumentert.
- Prosjekt/prosjektdeltagelse er modellert som egen koblingsentitet dersom det er med.
- Det er tydelig hva som virker og hva som eventuelt mangler.
