# DAT107 2022 januar eksamenssett

Kildetro sideutdrag fra original PDF. Oppgaverekkefølge, delspørsmål og løsningsforslag er bevart som originaltekst der uttrekket har tekst. Utvalgte figurer er lagt inn etter siden de hører til.

## Side 1

```text
1/22 
 
 
 
 
EKSAMENSOPPGÅVE 
 
Emnekode: 
 
 
 
DAT107 
Emnenamn: 
 
 
 
Databasar 
Dato: 
 
 
 
 
05.01.2022 
 
Eksamensform:  
 
 
Skriftleg digital heimeeksamen 
Eksamenstid: 
 
 
 
09:00 – 13:00 
Tal på eksamensoppgåver: 
 
7 
Tal på sider (medrekna denne): 
22 (for både nynorsk/bokmål) 
Tal på vedlegg: 
 
 
 
0 
Tillatne hjelpemiddel:  
 
Alle bortsett frå samarbeide 
Emneansvarleg:  
 
 
Jerry Chun-Wei Lin 
Kjem til eksamenslokalet: 
 
Nei – heimeeksamen 
Telefonnummer ein kan nå emneansvarleg på under eksamen: 
Jerry Chun-Wei Lin: 
 
406 44 087  
Lars-Petter Helland:   
928 28 046  
Dag Toppe Larsen:  
 
483 07 293  
Merknader: 
Eg stadfestar at arbeidet er sjølvstendig utarbeida, og at eg kjenner til kva Forskrift om studium og eksamen ved Høgskulen 
på Vestlandet, seier om fusk og forsøk på fusk i § 12-1.
```

## Side 2

```text
2/22 
 
Oppgåve 1 – Fleirval (30 poeng, ~72 min.) 
 
Vel nøyaktig eit av alternativa for kvar oppgåve. 
 
1) Kva er riktig om nøkkelordet “primary key” i SQL? 
a) Vi må også bruke “unique” for å unngå fleire rader med same 
primærnøkkel. 
b) Det betyr eigentleg ingenting for databasesystemet – blir berre tatt med 
som informasjon 
c) Databasesystemet vil sørge for at det ikkje blir duplikat av verdiar i 
denne kolonnen 
d) Nyttast på alle kolonnar vi vil indeksere 
 
2) Kva er riktig om SQL? 
a) SQL er et språk for å manipulere data og metadata i relasjonsdatabasar 
b) Eit filformat på same måte som XML og JSON 
c) Om vi skal endre nokke ved hjelp av SQL, må vi først slette hele 
tabellen, så lage en ny og legge alle data inn på nytt 
d) SQL er et språk berre for PostgreSQL-databasar 
 
3) To tabellar skal “joines” samen i SQL. Det er ønskeleg at alle rader i den 
venstre tabellen skal være med uavhengig av eventuelle null-verdiar i 
framandnøkkelen. Dette oppnår vi med? 
a) Inner join 
b) Left outer join 
c) Right outer join 
d) Full outer join 
 
4) To tabellar skal “joines” samen i SQL. Det er ønskeleg at berre rader i den 
høyre tabellen skal være med dersom det ikkje er null-verdiar i 
framandnøkkelen. Dette oppnår vi med? 
a) Inner join 
b) Left outer join 
c) Right outer join 
d) Full outer join
```

## Side 3

```text
3/22 
 
5) Kva gjer left outer join? 
a) Viser alle linjer i begge tabellane. 
b) Viser alle linjer frå første tabell, samen med matchende data frå andre 
tabell. 
c) Viser alle linjer frå andre tabell, samen med matchende data frå første 
tabell. 
d) Viser berre linjer frå begge tabellar som matcher kvarandre. 
 
6) Kva er referanseintegritet? 
a) Et felt i en tabell refererer til et felt i en annan tabell. 
b) Et felt i en tabell refererer til et felt i en annan tabell, og verdiane i den 
refererande tabellen må eksistere i den refererte tabellen. 
c) To tabellar kan ha fleire referansar til kvarandre.  
d) Betyr det same som inner join. 
 
7) Kva er ikkje sant om primærnøkkel? 
a) Den må ikkje være null. 
b) Den må bestå av berre eit felt. 
c) Den må være unik. 
d) Den kan være vilkårleg datatype. 
 
8) Kva er en sterk entitetstype?  
a) Den modellerer et fysisk objekt.  
b) Den er eksistensuavhengig av andre entitetar.  
c) Den har relasjonar til minst to andre entitetar.  
d) Den kan identifiserast unikt. 
 
9) Korleis lages ein ein-til-mange–relasjon mellom to tabellar? 
a) I begge tabellane opprettar man en framandnøkkel som refererer til den 
andre tabellen. 
b) I ein av tabellane (spiller ingen rolle kva for) opprettar man ein 
framandnøkkel som refererer til den andre tabellen.  
c) Man opprettar ein ny tabell som har framandnøklar til begge de andre 
tabellane. 
d) Man opprettar kolonne i tabellen på “mange-sidan”, som lagrar ein 
framandnøkkel til tabellen på “ein-sidan”
```

## Side 4

```text
4/22 
 
10) Korleis lager man eit hierarki i en database? 
a) Man opprettar ein ny tabell. Den eksisterande tabellen har en 
framandnøkkel til den nye tabellen, og den nye tabellen har ein 
framandnøkkel til den eksisterande tabellen. 
b) Det er ikkje mogleg å lage hierarki i SQL-databasar; man kan eventuelt 
kopiere data over i en ny tabell og lage framandnøkkel til denne. 
c) Tabellen refererer seg sjølv. 
d) Man lager ein ny tabell med to framandnøklar til den eksisterande 
tabellen. 
 
11) En tabell har en en-til-mange–relasjon til ein annan tabell. Den er også 
eksistensavhengig av den andre tabellen. Den andre tabellen er derimot ikkje 
eksistensavhengig av den første tabellen. Korleis skriv vi dette i UML-
notasjon? 
a) 0..1—1..* 
b) 1..1—1..* 
c) 0..1—0..* 
d) 1..1—0..* 
 
12) Kva er hovudbruka/hensikta for ein surrogatnøkkel? 
a) Da behøver man ikkje vurdere om andre attributt egner seg som 
primærnøkkel. 
b) Det finnes situasjonar kor det er vanskeleg å garantere at en 
kombinasjon av eksisterande attributt alltid vil være unike og ikkje null. 
c) Surrogatnøkkel er synonymt med primærnøkkel. 
d) Det er ikkje mogleg å opprette primærnøkkel for meir enn ein attributt – 
er det fleire må man bruke surrogatnøkkel. 
 
13) Kva er riktig om indekser?  
a) Ein indeks på en kolonne betyr at en tabell blir sortert på denne 
kolonnen før den blir skrevet til fil/disk  
b) Ein indeks på en kolonne betyr at det er oppretta eit «innhaldsregister» 
for ein tabell  
c) Ein indeks vil alltid føre til betre yting, og bør opprettast for alle kolonnar  
d) Ein tabell kan berre ha indeks for en kolonne
```

## Side 5

```text
5/22 
 
14) I ein tabell er det behov for en kolonne som lagrar tal på eksemplar av ein gitt 
vare på lager.  Kva for datatype er som regel mest hensiktsmessig for dette? 
(Du treng ikkje ta stilling til kor store verdiar det er behov for å lagre.)  
a) Integer 
b) Float/double 
c) Numeric(p,s) 
d) Char(n) 
 
15) Kvifor blir det brukt låser når data skal endrast i ein tabell? 
a) Gjer at databasesystemet kan oppdatere tabellane raskare 
b) Låser nyttast til å gjere ein kunde i t.d. ein nettbutikk oppmerksam på at 
varen han/hun tenker å bestille kan plutseleg bli kjøpt av en annan 
kunde 
c) Sikrar at det ikkje blir ukorrekt resultat når fleire transaksjonar bruker 
same data samtidig 
d) Låser sikrar referanseintegritet
```

## Side 6

```text
6/22 
 
Oppgåve 2 – SQL (14 poeng, ~33,6 min.) 
 
Ta utgangspunkt i følgande tabellar for registrering av biler som passerer en 
automatisk “bompengebod”: 
Passering(ID, registreringsnummer*, tidspunkt, sted) 
Bil(registreringsnummer*, eigar, epost) 
a) Skriv SQL-kode for å opprette tabellen Passering. Du kan anta at tabellen Bil 
allereie eksisterer. Få med datatypar, primærnøklar, framandnøklar, on 
update/delete, eventuelt ikkje tillat null-merke. Du må sjølv vurdere kva som er 
hensiktsmessig. Kommenter/forklar vala du tar. 
 
b) Det er behov for å endre namn på kolonnen Sted til Bod i tabellen Passering. 
Skriv SQL-kode for dette. 
 
c) Skriv ein SQL-spørjing som lister ut all informasjon, inkludert eigar og epost for 
alle passeringar. Også passeringar som ikkje har registrert 
registreringsnummer skal bli tatt med. (Dvs. skiltet kunne ikkje bli lest.) 
 
d) Skriv en SQL-spørjing som lister ut all informasjon, inkludert eigar og epost for 
alle passeringar. Berre passeringar som har registrert registreringsnummer 
skal bli tatt med. (Dvs. skiltet kunne bli lest og vi kan sende faktura.) 
 
e) Skriv same spørjing som i delspørsmål e) som relasjonsalgebra. 
 
f) Skriv ein SQL-spørjing som viser tal på passeringar som er registrert på ulike 
registreringsnummer. 
 
g) Skriv ein SQL-spørjing som finner siste passering for bil med 
registreringsnummer AA10000. 
 
h) Skriv ein SQL-spørjing som viser tal på passeringar utan registrert 
registreringsnummer (dvs., tal på passeringar vi ikkje får betalt for.)
```

## Side 7

```text
7/22 
 
Oppgåve 3 – normalisering (10 poeng, ~24 min.) 
 
En database har følgande tabell: 
Tilsett(namn, fødselsdato, kontor, telefon, epost, prosjekt, tilsettdato, lønn) 
Eksempeldata (ein rad frå tabellen): 
“Kari Nordmann”, 2000-01-01, “F419”, “55667788”, “kari@bedrift.no”, {“NRV34”, 
“STR78”, “H78I”}, 2020-02-01, 500000 
“Prosjekt” er ein liste med ID-koder for prosjekt som ein tilsett er involvert i. Det kan 
vere eit vilkårleg tall på. 
a) Diskuter moglege kandidatnøklar (eventuelt samansett) ut frå eksisterande 
kolonnar (ikkje surrogatnøkkel/løpenummer). Kommenter moglege «problem» 
med ulike kandidatnøklar, og vel til slutt primærnøkkel frå kandidatnøklane. 
 
b) Med utgangspunkt i svaret frå a), er tabellen nå på 1NF? Kvifor/kvifor ikkje? 
Om ikkje, modifiser den slik at den er på 1NF. 
 
c) Med utgangspunkt i svaret frå b), er tabellen nå på 2NF? Kvifor/kvifor ikkje? 
Om ikkje, modifiser den slik at den er på 2NF. 
 
d) Med utgangspunkt i svaret frå c), er tabellen nå på 3NF? Kvifor/kvifor ikkje? 
Om ikkje, modifiser den slik at den er på 3NF.
```

## Side 8

```text
8/22 
 
Oppgåve 4 – modellering (10 poeng, ~24 min.) 
 
Ei foreining har behov for et system for å administrere medlemmer. Eit medlem har 
medlemsnummer, fornamn, etternamn, eit telefonnummer, ein epost-adresse, 
postnummer/sted, gatenamn/husnummer, samt om personen framleis er medlem 
(ikkje utmeldt) 
 
Foreininga har også ei rekke lokallag. Alle medlemmer er med i nøyaktig eit lokallag. 
Lokallag har lag-namn, person som er leder (som også er medlem), 
postnummer/sted, gatenamn/husnummer for møtelokale. 
 
For kvart medlem skal det lagrast om medlemsavgift har blitt betalt for kvart år. 
Historiske data skal lagrast, dvs., det skal være mogleg å sjekke at avgift har blitt 
betalt for t.d. 2019, 2020, 2021, osv. 
 
Teikn eit ER-diagram (i en av notasjonane som har vært brukt i kurset) for denne 
databasen. Få med all relevant informasjon (primærnøklar, framandnøklar, 
kardinalitet, sterke/svake entitetar, osv.). 
 
Kommenter vala du tar for å klargjere korleis du tenker/resonerar.
```

## Side 9

```text
9/22 
 
Oppgåve 5 - ORM/JPA (20 poeng, ~48 min.) 
 
Vi skal jobbe litt med ein geografi-database med oversyn over land og byar. Vi tenker 
oss at data om land er lagra i tabellen land: 
navn (PK) 
areal_km2 
folketall 
hovedstad (FK) 
'Norge' 
385207 
5391000 
'Oslo' 
'Danmark' 
… 
… 
… 
 
Vi tenker oss at data om byar er lagra i tabellen by: 
navn (PK) 
grunnlagt_aar 
folketall 
land (FK) 
'Bergen' 
1070 
284000 
'Norge' 
'Oslo' 
1048 
693000 
'Norge' 
… 
... 
... 
... 
 
Vi ønsker å jobbe med denne databasen i eit Java-program. 
a) (10% ~ 24 min) Skriv Java-klassane for entitetstypane Land og By som tilsvarer 
databasetabellane vist over. Du treng ikkje å skrive metodar, berre instans-/ 
objektvariablar og JPA-annoteringer. Vi ønsker tovegs samband mellom 
entitetane for enklare å kunne liste opp byar i eit gitt land.  
 
Vi antar at vi har ein hjelpeklasse GeografiDAO. Du skal lage eit par metodar i denne. 
Du kan anta at det er oppretta og at du har tilgang til ein EntityManagerFactory kalla 
emf. 
 
b) (3,3% ~ 8 min) Skriv ein metode i GeografiDAO som hentar ut eit land med eit 
gitt namn frå databasen. 
 
c) (3,3% ~ 8 min) Skriv ein main-metode som bruker metoden du laget i b) til å få 
skrive ut info om hovudstaden i Noreg. Du kan anta at Land og By har get-, og 
toString-metodar du kan bruke.
```

## Side 10

```text
10/22 
 
 
d) (3,3% ~ 8 min) Skriv ein metode i GeografiDAO som oppdaterer folketalet i ein 
gitt by. Parametrar til metoden skal vera namn på byen og nytt folketal. Viss 
ingen by med det gitte namnet finst, skal metoden ikkje gjera noko. 
 
Oppgave 6 - datamining (10 poeng, ~24 min.) 
 
Ein database er gitt nedanfor, venlegast gi detaljerte steg for løysningen. 
 
TID Kjøpte einingar 
1 
a, b, c, d, e, g, h 
2 
a, b, f, h 
3 
b, d, e, f, g 
4 
a, b, f, g, h 
5 
b, f, i, j 
6 
a, c, d, e, g, h, i, j 
7 
a, b, f, h, i, j 
8 
b, c, d, f, g, h 
9 
a, b, f, h, j 
10 
a, b, g, f, h, i 
 
a) Bygg “frequent-pattern (FP)”-tre når det miste “support threshold” er 0,7. 
 
b) Bygg “B’s conditional FP”-tre og list “B’s relevant patterns” med deira “frequency 
values” under “B’s conditional FP”-tre.
```

## Side 11

```text
11/22 
 
Oppgåve 7 – NoSQL (6 poeng, - ~14,4 min.) 
 
a) Ta utgangspunkt i oppgåve 2 (SQL). Skriv ein "rad" frå kvar av tabellane som 
XML. 
 
b) Ta utgangspunkt i oppgåve 2 (SQL). Skriv ein "rad" frå kvar av tabellane som 
JSON. 
 
c) I tillegg til relasjonsdatabasar, finnes det også blant annet 
dokumentdatabasar, grafdatabasar og nøkkel/verdi-databasar. For eit system 
for registrering av bompengepasseringer som i oppgåve 2, kva for 
databasesystem passer best? Diskuter/grunngi svaret.
```

## Side 12

```text
12/22 
 
 
 
EKSAMENSOPPGAVE 
 
Emnekode: 
 
 
 
DAT107 
Emnenavn: 
 
 
 
Databaser 
Dato: 
 
 
 
 
05.01.2022 
 
Eksamensform:  
 
 
Skriftlig digital hjemmeeksamen 
Eksamenstid: 
 
 
 
09:00 – 13:00 
Antall eksamensoppgaver:   
7 
Antall sider (inkludert denne): 
22 (for både bokmål/nynorsk) 
Antall vedlegg: 
 
 
 
0 
Tillatte hjelpemidler:  
 
Alle bortsett fra samarbeid 
Emneansvarlig:  
 
 
Jerry Chun-Wei Lin 
Kommer til eksamenslokalet: 
Nei – hjemmeeksamen 
Telefonnummer emneansvarlig kan nås på under eksamen: 
Jerry Chun-Wei Lin: 
 
406 4 087 
Lars-Petter Helland:  
 928 28 046 
Dag Toppe Larsen:  
 
483 07 293 
Merknader: 
Jeg bekrefter at arbeidet er selvstendig utarbeidet, og at jeg kjenner til hva Forskrift om studium og eksamen ved Høgskulen 
på Vestlandet, sier om fusk og forsøk på fusk i § 12-1.
```

## Side 13

```text
13/22 
 
Oppgave 1 – Flervalg (30 poeng, ~72 min.) 
 
Velg nøyaktig et av alternativene for hver oppgave. 
 
1) Hva er riktig om nøkkelordet “primary key” i SQL? 
a) Vi må også bruke “unique” for å unngå flere rader med samme 
primærnøkkel. 
b) Det betyr egentlig ingenting for databasesystemet – blir bare tatt med 
som informasjon 
c) Databasesystemet vil sørge for at det ikke blir duplikater av verdier i 
denne kolonnen 
d) Brukes på alle kolonner vi vil indeksere 
 
2) Hva er riktig om SQL? 
a) SQL er et språk for å manipulere data og metadata i relasjonsdatabaser 
b) Et filformat på samme måte som XML og JSON 
c) Hvis vi skal endre noe ved hjelp av SQL, må vi først slette hele tabellen, 
så lage en ny og legge alle data inn på nytt 
d) SQL er et språk bare for PostgreSQL-databaser 
 
3) To tabeller skal “joines” sammen i SQL. Det er ønskelig at alle rader i den 
venstre tabellen skal være med uavhengig av eventuelle null-verdier i 
fremmednøkkelen. Dette oppnår vi med? 
a) Inner join 
b) Left outer join 
c) Right outer join 
d) Full outer join 
 
4) To tabeller skal “joines” sammen i SQL. Det er ønskelig at bare rader i den 
høyre tabellen skal være med dersom det ikke er null-verdier i 
fremmednøkkelen. Dette oppnår vi med? 
a) Inner join 
b) Left outer join 
c) Right outer join 
d) Full outer join
```

## Side 14

```text
14/22 
 
5) Hva gjør left outer join? 
a) Viser alle linjer i begge tabellene. 
b) Viser alle linjer fra første tabell, sammen med matchende data fra andre 
tabell. 
c) Viser alle linjer fra andre tabell, sammen med matchende data fra første 
tabell. 
d) Viser bare linjer fra begge tabeller som matcher hverandre. 
 
6) Hva er referanseintegritet? 
a) Et felt i en tabell refererer til et felt i en annen tabell. 
b) Et felt i en tabell refererer til et felt i en annen tabell, og verdiene i den 
refererende tabellen må eksistere i den refererte tabellen. 
c) To tabeller kan ha flere referanser til hverandre.  
d) Betyr det samme som inner join. 
 
7) Hva er ikke sant om primærnøkkel? 
a) Den må ikke være null. 
b) Den må bestå av bare ett felt. 
c) Den må være unik. 
d) Den kan være vilkårlig datatype. 
 
8) Hva er en sterk entitetstype?  
a) Den modellerer et fysisk objekt.  
b) Den er eksistensuavhengig av andre entiteter.  
c) Den har relasjoner til minst to andre entiteter.  
d) Den kan identifiseres unikt. 
 
9) Hvordan lages en en-til-mange–relasjon mellom to tabeller? 
a) I begge tabellene oppretter man en fremmednøkkel som refererer til 
den andre tabellen. 
b) I én av tabellene (spiller ingen rolle hvilken) oppretter man en 
fremmednøkkel som refererer til den andre tabellen.  
c) Man oppretter en ny tabell som har fremmednøkler til begge de andre 
tabellene. 
d) Man oppretter kolonne i tabellen på “mange-siden”, som lagrer en 
fremmednøkkel til tabellen på “en-siden”
```

## Side 15

```text
15/22 
 
10) Hvordan lager man et hierarki i en database? 
a) Man oppretter en ny tabell. Den eksisterende tabellen har en 
fremmednøkkel til den nye tabellen, og den nye tabellen har en 
fremmednøkkel til den eksiterende tabellen. 
b) Det er ikke mulig å lage hierarkier i SQL-databaser; man kan eventuelt 
kopiere data over i en ny tabell og lage fremmednøkkel til denne. 
c) Tabellen refererer seg selv. 
d) Man lager en ny tabell med to fremmednøkler til den eksiterende 
tabellen. 
 
11) En tabell har en en-til-mange–relasjon til en annen tabell. Den er også 
eksistensavhengig av den andre tabellen. Den andre tabellen er derimot ikke 
eksistensavhengig av den første tabellen. Hvordan skriver vi dette i UML-
notasjon? 
a) 0..1—1..* 
b) 1..1—1..* 
c) 0..1—0..* 
d) 1..1—0..* 
 
12) Hva er hovedbruken/hensikten for en surrogatnøkkel? 
a) Da behøver man ikke vurdere om andre attributter egner seg som 
primærnøkkel. 
b) Det finnes situasjoner hvor det er vanskelig å garantere at en 
kombinasjon av eksisterende attributter alltid vil være unike og ikke null. 
c) Surrogatnøkkel er synonymt med primærnøkkel. 
d) Det er ikke mulig å opprette primærnøkkel for mer enn én attributt – er 
det flere må man bruke surrogatnøkkel. 
 
13) Hva er riktig om indekser?  
a) En indeks på en kolonne betyr at en tabell blir sortert på denne 
kolonnen før den blir skrevet til fil/disk  
b) En indeks på en kolonne betyr at det er opprettet ett «innholdsregister» 
for en tabell  
c) En indeks vil alltid føre til bedre ytelse, og bør opprettes for alle 
kolonner  
d) En tabell kan bare ha indeks for en kolonne
```

## Side 16

```text
16/22 
 
14) I en tabell er det behov for en kolonne som lagrer antall eksemplarer av en gitt 
vare på lager.  Hvilken datatype er som regel mest hensiktsmessig for dette? 
(Du trenger ikke ta stilling til hvor store verdier det er behov for å lagre.)  
a) Integer  
b) Float/double  
c) Numeric(p,s)  
d) Char(n) 
 
15) Hvorfor blir det brukt låser når data skal endres i en tabell? 
a) Gjør at databasesystemet kan oppdatere tabellene raskere 
b) Låser brukes til å gjøre en kunde i f.eks. en nettbutikk oppmerksom på 
at varen han/hun tenker å bestille kan plutselig bli kjøpt av en annen 
kunde 
c) Sikrer at det ikke blir ukorrekt resultat når flere transaksjoner bruker 
samme data samtidig 
d) Låser sikrer referanseintegritet
```

## Side 17

```text
17/22 
 
Oppgave 2 – SQL (14 poeng, ~33,6 min.) 
 
Ta utgangspunkt i følgende tabeller for registrering av biler som passerer en 
automatisk “bompengebod”: 
Passering(ID, registreringsnummer*, tidspunkt, sted) 
Bil(registreringsnummer*, eier, epost) 
a) Skriv SQL-kode for å opprette tabellen Passering. Du kan anta at tabellen Bil 
allerede eksisterer. Få med datatyper, primærnøkler, fremmednøkler, on 
update/delete, eventuelt ikke tillatt null-merke. Du må selv vurdere hva som er 
hensiktsmessig. Kommenter/forklar valgene du tar. 
 
b) Det er behov for å endre navn på kolonnen Sted til Bod i tabellen Passering. 
Skriv SQL-kode for dette. 
 
c) Skriv en SQL-spørring som lister ut all informasjon, inkludert eier og epost for 
alle passeringer. Også passeringer som ikke har registrert 
registreringsnummer skal bli tatt med. (Dvs. skiltet kunne ikke bli lest.) 
 
d) Skriv en SQL-spørring som lister ut all informasjon, inkludert eier og epost for 
alle passeringer. Bare passeringer som har registrert registreringsnummer 
skal bli tatt med. (Dvs. skiltet kunne bli lest og vi kan sende faktura.) 
 
e) Skriv samme spørring som i delspørsmål e) som relasjonsalgebra. 
 
f) Skriv en SQL-spørring som viser antall passeringer som er registrert på ulike 
registreringsnummer. 
 
g) Skriv en SQL-spørring som finner siste passering for bil med 
registreringsnummer AA10000. 
 
h) Skriv en SQL-spørring som viser antall passeringer uten registrert 
registreringsnummer (dvs., antall passeringer vi ikke får betalt for.)
```

## Side 18

```text
18/22 
 
Oppgave 3 – normalisering (10 poeng, ~24 min.) 
 
En database har følgende tabell: 
Ansatt(navn, fødselsdato, kontor, telefon, epost, prosjekt, ansattdato, lønn) 
Eksempeldata (en rad fra tabellen): 
“Kari Nordmann”, 2000-01-01, “F419”, “55667788”, “kari@bedrift.no”, {“NRV34”, 
“STR78”, “H78I”}, 2020-02-01, 500000 
“Prosjekt” er en liste med ID-koder for prosjekt som en ansatt er involvert i. Det kan 
være et vilkårlig antall. 
a) Diskuter mulige kandidatnøkler (eventuelt sammensatt) ut fra eksisterende 
kolonner (ikke surrogatnøkkel/løpenummer). Kommenter mulige «problemer» 
med ulike kandidatnøkler, og velg til slutt primærnøkkel fra kandidatnøklene. 
 
b) Med utgangspunkt i besvarelsen fra a), er tabellen nå på 1NF? Hvorfor/hvorfor 
ikke? Hvis ikke, modifiser den slik at den er på 1NF. 
 
c) Med utgangspunkt i besvarelsen fra b), er tabellen nå på 2NF? Hvorfor/hvorfor 
ikke? Hvis ikke, modifiser den slik at den er på 2NF. 
 
d) Med utgangspunkt i besvarelsen fra c), er tabellen nå på 3NF? Hvorfor/hvorfor 
ikke? Hvis ikke, modifiser den slik at den er på 3NF.
```

## Side 19

```text
19/22 
 
Oppgave 4 – modellering (10 poeng, ~24 min.) 
 
En forening har behov for et system for å administrere medlemmer. Et medlem har 
medlemsnummer, fornavn, etternavn, et telefonnummer, en epost-adresse, 
postnummer/sted, gatenavn/husnummer, samt om personen fortsatt er medlem (ikke 
utmeldt) 
 
Foreningen har også en rekke lokallag. Alle medlemmer er med i nøyaktig et lokallag. 
Lokallag har lag-navn, person som er leder (som også er medlem), 
postnummer/sted, gatenavn/husnummer for møtelokale. 
 
For hvert medlem skal det lagres hvorvidt medlemsavgift har blitt betalt for hvert år. 
Historiske data skal lagres, dvs., det skal være mulig å sjekke at avgift har blitt betalt 
for f.eks. 2019, 2020, 2021, osv. 
 
Tegn et ER-diagram (i en av notasjonene som har vært brukt i kurset) for denne 
databasen. Få med all relevant informasjon (primærnøkler, fremmednøkler, 
kardinalitet, sterke/svake entiteter, osv.). 
 
Kommenter valgene du tar for å klargjøre hvordan du tenker/resonerer.
```

## Side 20

```text
20/22 
 
Oppgave 5 - ORM/JPA (20 poeng, ~48 min.) 
 
Vi skal jobbe litt med en geografi-database med oversikt over land og byer. 
Vi tenker oss at data om land er lagret i tabellen land: 
navn (PK) 
areal_km2 
folketall 
hovedstad (FK) 
'Norge' 
385207 
5391000 
'Oslo' 
'Danmark' 
… 
… 
… 
 
Vi tenker oss at data om byer er lagret i tabellen by: 
navn (PK) 
grunnlagt_aar 
folketall 
land (FK) 
'Bergen' 
1070 
284000 
'Norge' 
'Oslo' 
1048 
693000 
'Norge' 
… 
... 
... 
... 
 
Vi ønsker å jobbe med denne databasen i et Java-program. 
a) (10% ~ 24 min) Skriv Java-klassene for entitetstypene Land og By som 
tilsvarer databasetabellene vist over. Du trenger ikke å skrive metoder, kun 
instans-/ objektvariabler og JPA-annoteringer. Vi ønsker toveis forbindelse 
mellom entitetene for enklere å kunne liste opp byer i et gitt land.  
 
Vi antar at vi har en hjelpeklasse GeografiDAO. Du skal lage et par metoder i denne. 
Du kan anta at det er opprettet og at du har tilgang til en EntityManagerFactory kalt 
emf. 
 
b) (3,3% ~ 8 min) Skriv en metode i GeografiDAO som henter ut et land med et 
gitt navn fra databasen. 
 
c) (3,3% ~ 8 min) Skriv en main-metode som bruker metoden du laget i b) til å få 
skrevet ut info om hovedstaden i Norge. Du kan anta at Land og By har get-, 
og toString-metoder du kan bruke.
```

## Side 21

```text
21/22 
 
d) (3,3% ~ 8 min) Skriv en metode i GeografiDAO som oppdaterer folketallet i en 
gitt by. Parametere til metoden skal være navn på byen og nytt folketall. Hvis 
ingen by med det gitte navnet finnes, skal metoden ikke gjøre noe. 
 
Oppgave 6 - datamining (10 poeng, ~24 min.) 
 
En database er gitt nedenfor, vennligst gi detaljerte steg for løsningen. 
 
TID Kjøpte enheter 
1 
a, b, c, d, e, g, h 
2 
a, b, f, h 
3 
b, d, e, f, g 
4 
a, b, f, g, h 
5 
b, f, i, j 
6 
a, c, d, e, g, h, i, j 
7 
a, b, f, h, i, j 
8 
b, c, d, f, g, h 
9 
a, b, f, h, j 
10 
a, b, g, f, h, i 
 
a) Bygg “frequent-pattern (FP)”-tre når det miste “support threshold” er 0,7. 
 
 
b) Bygg “B’s conditional FP”-tre og list “B’s relevant patterns” med deres 
“frequency values” under “B’s conditional FP”-tre.
```

## Side 22

```text
22/22 
 
Oppgave 7 – NoSQL (6 poeng, - ~14,4 min.) 
 
a) Ta utgangspunkt i oppgave 2 (SQL). Skriv en "rad" fra hver av tabellene som 
XML. 
 
b) Ta utgangspunkt i oppgave 2 (SQL). Skriv en "rad" fra hver av tabellene som 
JSON. 
 
c) I tillegg til relasjonsdatabaser, finnes det også blant annet 
dokumentdatabaser, grafdatabaser og nøkkel/verdi-databaser. For et system 
for registrering av bompengepasseringer som i oppgave 2, hvilket 
databasesystem passer best? Diskuter/grunngi svaret.
```
