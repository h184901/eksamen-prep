# Oblig 1: SQL

## Kjernen

Oblig 1 trener praktisk og teoretisk SQL-forståelse gjennom et bompengecase. Den viktigste læringen er ikke bare å skrive SQL, men å gjøre konsistente designvalg og forklare konsekvensene av dem.

## Hva denne obligen trener

- tabellutforming fra tekstbeskrivelse
- primærnøkler, fremmednøkler, datatyper og `NULL`
- testdata som dekker spesialtilfeller
- `ALTER TABLE`
- `JOIN` versus `LEFT JOIN`
- relasjonsalgebra
- `GROUP BY`, `COUNT` og siste registrerte hendelse
- kort skriftlig begrunnelse for modellvalg

## Case

Systemet skal registrere bompengepasseringer.

For hver bil skal det lagres:

- registreringsnummer
- eier
- eiers adresse
- epost
- telefonnummer

For hver passering skal det registreres:

- hvilken bil som passerte
- tidspunkt
- hvilken bompengebod som ble passert

Det sentrale spesialtilfellet er passeringer der skiltet ikke kunne leses. Modellen må enten tillate passering uten kjent bil, eller bruke en annen bevisst løsning som forklares.

## Deloppgavene som faglige mønstre

| Del | Hva du egentlig trener |
| --- | --- |
| a | `CREATE TABLE`, nøkler, datatyper og `NULL`/`NOT NULL` |
| b | Testdata som faktisk tester modellen |
| c | `ALTER TABLE` og konsekvens av strukturendring |
| d | Designbegrunnelse for passering uten registreringsnummer |
| e | `LEFT JOIN` eller annen ytre kobling |
| f | `INNER JOIN` / bare kjente biler |
| g | Relasjonsalgebra for samme idé som SQL |
| h | `GROUP BY` og `COUNT` |
| i | Siste passering for bestemt registreringsnummer |
| j | Antall passeringer uten registreringsnummer |
| k | Utenlandske registreringsnummer og domeneantakelser |
| l | Drøfting av om flere tabeller kunne vært nyttige |

## Modelleringstanken

Oppgaven peker mot minst to tabeller:

```text
Bil(regnr, eier, adresse, epost, telefon)
Passering(id, regnr*, tidspunkt, bompengebod)
```

Hvis `Passering.regnr` kan være `NULL`, kan du lagre en passering uten lest skilt. Da blir forskjellen på `LEFT JOIN` og `INNER JOIN` faglig viktig.

Alternativer kan også være riktige, men de må forklares. For eksempel kan man bruke egen statuskolonne, egen hendelsestype eller en mer normalisert eier-/bilmodell. Sensor ser etter konsistens, ikke bare én bestemt fasit.

## SQL-mønstre du bør kunne

Passeringer med bilinformasjon, også når bil mangler:

```sql
select p.*, b.eier, b.epost
from passering p
left join bil b on b.regnr = p.regnr;
```

Bare passeringer med kjent bil:

```sql
select p.*, b.eier, b.epost
from passering p
join bil b on b.regnr = p.regnr;
```

Antall per registreringsnummer:

```sql
select regnr, count(*) as antall
from passering
group by regnr;
```

Passeringer uten registreringsnummer:

```sql
select count(*) as antall_uten_skilt
from passering
where regnr is null;
```

## Besvarelsesstrategi

Skriv SQL som tekst, ikke som skjermbilde. Forklar hvorfor kolonner kan eller ikke kan være `NULL`, og lag testdata som viser begge situasjoner:

- minst én passering med kjent registreringsnummer
- minst én passering uten lest skilt
- minst én bil med flere passeringer

Hvis du fjerner telefonnummer i del c, må senere tekst og spørringer ikke forutsette at telefonnummer fortsatt finnes.

## Vanlige feil

- ikke modellere spesialtilfellet med manglende registreringsnummer tydelig nok
- bruke `INNER JOIN` i oppgaven som skal ta med passeringer uten skilt
- tillate eller forby `NULL` uten å forklare konsekvensen
- lage testdata som ikke dekker spesialtilfellet
- velge registreringsnummerformat uten å diskutere utenlandske skilt
- svare punktvis med SQL, men uten redegjørelse for valgene

## Typiske eksamensoppgaver

- SQL-spørringer med `NULL`
- `JOIN` versus `LEFT JOIN`
- telling per gruppe
- siste rad/hendelse per valgt objekt
- kombinasjon av DDL, DML og spørring i samme case
- kort drøfting av en modellbeslutning

## Hva du bør øve på

- lag egne testdata med minst én passering uten skilt
- skriv både SQL og relasjonsalgebra for samme idé
- forklar muntlig forskjellen på deloppgave e og f
- begrunn `NULL`/`NOT NULL` for hver fremmednøkkel

## Sjekkliste

- Tabellopprettelse og testdata kan kjøres i riktig rekkefølge.
- Primærnøkler og fremmednøkler er tydelige.
- Passering uten lest skilt er håndtert.
- Deloppgave e tar med passeringer uten registreringsnummer.
- Deloppgave f tar bare med passeringer med registreringsnummer.
- Relasjonsalgebraen samsvarer med SQL-en.
- Designvalg er forklart og konsistente.
