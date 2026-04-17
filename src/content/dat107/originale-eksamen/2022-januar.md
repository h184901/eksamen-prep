# Eksamensoppgave

**Emnekode:** DAT107  
**Emnenavn:** Databasar / Databaser  
**Dato:** 05.01.2022  
**Eksamensform:** Skriftleg digital heimeeksamen / Skriftlig digital hjemmeeksamen  
**Eksamenstid:** 09:00–13:00  
**Antall eksamensoppgaver:** 7  
**Antall sider:** 22  
**Tillatte hjelpemidler:** Alle bortsett fra samarbeid

## Nynorskdel

### Oppgåve 1 – Fleirval

Vel nøyaktig eitt av alternativa for kvar oppgåve.

1. Kva er riktig om nøkkelordet `primary key` i SQL?
2. Kva er riktig om SQL?
3. To tabellar skal “joines” saman i SQL. Det er ønskeleg at alle rader i den venstre tabellen skal vere med uavhengig av eventuelle null-verdiar i framandnøkkelen. Kva bruker vi?
4. To tabellar skal “joines” saman i SQL. Det er ønskeleg at berre rader i den høgre tabellen skal vere med dersom det ikkje er null-verdiar i framandnøkkelen.
5. Kva gjer `left outer join`?
6. Kva er referanseintegritet?
7. Kva er ikkje sant om primærnøkkel?
8. Kva er ein sterk entitetstype?
9. Korleis lages ein ein-til-mange-relasjon mellom to tabellar?
10. Korleis lager man eit hierarki i ein database?
11. En tabell har en en-til-mange-relasjon ... Korleis skriv vi dette i UML-notasjon?
12. Kva er hovudbruken/hensikta for ein surrogatnøkkel?
13. Kva er riktig om indekser?
14. Kva datatype er mest hensiktsmessig for antall eksemplar av ein vare på lager?
15. Kvifor blir det brukt låser når data skal endrast i ein tabell?

### Oppgåve 2 – SQL

Utgangspunkt:

- `Passering(ID, registreringsnummer*, tidspunkt, sted)`
- `Bil(registreringsnummer*, eigar, epost)`

Delspørsmål:

a) Opprett tabellen `Passering` med datatypar, PK/FK, `on update/delete` og eventuelle `null`-/`not null`-val.  
b) Endre namn på kolonnen `Sted` til `Bod` i tabellen `Passering`.  
c) Vis all informasjon, inkludert eigar og epost, for alle passeringar. Også passeringar utan registrert registreringsnummer skal vere med.  
d) Vis all informasjon, inkludert eigar og epost, berre for passeringar som har registrert registreringsnummer.  
e) Skriv same spørjing som i delspørsmål d) som relasjonsalgebra.  
f) Vis tal på passeringar for ulike registreringsnummer.  
g) Finn siste passering for bil med registreringsnummer `AA10000`.  
h) Finn tal på passeringar utan registrert registreringsnummer.

### Oppgåve 3 – normalisering

Gitt tabellen:

`Tilsett(namn, fødselsdato, kontor, telefon, epost, prosjekt, tilsettdato, lønn)`

Der `prosjekt` er ei liste med ID-kodar.

Delspørsmål:

a) Diskuter moglege kandidatnøklar og vel primærnøkkel.  
b) Er tabellen på 1NF?  
c) Er tabellen på 2NF?  
d) Er tabellen på 3NF?

### Oppgåve 4 – modellering

Ei foreining har behov for eit system for å administrere medlemmer, lokallag og medlemsavgift per år.

Oppgåva ber om ER-diagram og kommentarar til vala.

### Oppgåve 5 – ORM/JPA

Geografi-database med tabellene `land` og `by`.

Delspørsmål:

a) Skriv Java-klassene `Land` og `By`.  
b) Skriv metode i `GeografiDAO` som hentar ut eit land med eit gitt namn.  
c) Skriv `main` som skriv ut info om hovudstaden i Noreg.  
d) Skriv metode i `GeografiDAO` som oppdaterer folketalet i ein gitt by.

### Oppgåve 6 – datamining

Bygg FP-tre og B sitt kondisjonelle FP-tre frå gitt transaksjonstabell.

### Oppgåve 7 – NoSQL

a) Skriv ein rad frå kvar tabell som XML.  
b) Skriv ein rad frå kvar tabell som JSON.  
c) Diskuter kva databasesystem som passar best for bompengepasseringar.

## Bokmålsdel

Merk: Bokmålsdelen i PDF-en er innholdsmessig den samme eksamenen som nynorskdelen, men med bokmålsformuleringer. Oppgaverekkefølge og faglig innhold er de samme:

1. Flervalg  
2. SQL om `Passering` og `Bil`  
3. Normalisering av `Ansatt`-tabell med prosjektliste  
4. Modellering av forening, lokallag og medlemsavgift  
5. ORM/JPA med `Land` og `By`  
6. Datamining  
7. NoSQL med XML/JSON og drøfting
