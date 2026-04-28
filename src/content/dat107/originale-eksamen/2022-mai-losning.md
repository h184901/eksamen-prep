# DAT107 2022 mai eksamen - løsningsforslag

Kildetro sideutdrag fra original PDF. Oppgaverekkefølge, delspørsmål og løsningsforslag er bevart som originaltekst der uttrekket har tekst. Løsningsforslag er skjult bak en knapp ('Vis løsningsforslag') så du kan løse oppgavene først.

## Side 1

```text
Eksamen DAT107 databaser v2022 
Oppgave 1 – flervalg (30% ~72 min.) 
Spørsmål a 
Hva er forskjellen på å bruke dokumenttypedefinisjon (DTD) eller "XLM Schema" for å 
beskrive lovlig struktur for et XML-dokument? 
• DTD er mer gir flere muligheter 
• XML Schema gir flere muligheter 
• DTD og XML Schema er to helt forskjellige ting, og brukes uavhengig av hverandre 
• Ingen forskjell 
Spørsmål b 
Hva er sant om "lovlig struktur" og "velformet" for XML-dokument? 
• "Lovlig struktur" og "velformet" er akkurat det samme 
• "Velformet" betyr at XML-filen er skrevet med riktig innrykk for å bedre lesbarhet 
• Et XML-dokument vil automatisk ha lovlig struktur dersom det er velformet 
• Et XML-dokument kan være velformet uten å ha lovlig struktur 
Spørsmål c 
Tabellene A og B skal koples sammen i SQL. Vi ønsker bare rader i tabell A som har 
matchende verdi i tabell B. Hvilken type join brukes for å oppnå dette? 
• full outer join 
• inner join 
• left outer join 
• right outer join 
Spørsmål d 
Tabellene A og B skal koples sammen i SQL. Vi ønsker alle rader i tabell B uavhengig om de 
har matchende verdi i tabell A. Vi ønsker ikke rader i tabell A som ikke har matchende rader 
i tabell B. Hvilken type join brukes for å oppnå dette? 
• inner join 
• left outer join 
• full outer join 
• right outer join 
Spørsmål e 
Hvordan kan hierarkier enklest implementeres i SQL? 
• Tabellen kan ha en fremmednøkkel til seg selv. 
• Dersom vi bare skal ha et hierarki på et nivå, kan tabellen ha fremmednøkkel til seg 
selv. Ellers må man bruke koplingstabell. 
• Er ikke mulig å implementere i SQL 
• Man må bruke en koplingstabell 
Spørsmål f 
Hvilken datatype egner seg typisk ikke for kolonner med indeks? 
• char
```

## Side 2

```text
• integer 
• date 
• boolean 
Spørsmål g 
Hvorfor kan det være nødvendig med leselåser i transaksjoner? 
• Ikke sant - leselåser er aldri nødvendig 
• Har egentlig ingen betydning, men forteller databasesystemet at vi kommer til å 
bruke denne verdien 
• Bedre databasens ytelse 
• Verdien vi ønsker å lese kan bli endret av en annen transaksjon 
Spørsmål h 
En del SQL-databasesystemer kan også direkte behandle XML/JSON-dokumenter lagret i 
kolonner i en tabell. Hva er riktig om dette? 
• Kan være nyttig dersom vi har behov for å lagre "ekstra" informasjon som ikke 
brukes direkte i spørringer 
• Dersom vi setter indeks på en kolonne med XML/JSON-dokument, så er det det 
samme som å sette indeks på alle kolonnene det "erstatter" 
• Vi kan uten videre erstatte øvrige kolonner med verdier i XML/JSON-dokumentet 
• Dokumentdatabase er et moderne navn for relasjonsdatabase 
Spørsmål i 
Hva er sant om indekser? 
• Øker søkeytelsen på kolonner 
• Nødvendig for å bruke kolonnen i en spørring som inngår i en transaksjon 
• Forhindrer vranglås 
• Det samme som tofaselås 
Spørsmål j 
Hva er hensikten med NoSQL-databaser? 
• SQL-databaser er "gammaldags" og ikke lenger relevant  
• Enkelte problemer kan løses mer effektivt/enklere med en annen tilnærming enn 
relasjonsmodellen 
• "Smak og behag" - noen foretrekker SQL, andre foretrekker andre typer databaser 
• SQL er for komplisert å lære/bruke 
Spørsmål k 
Hva menes med representasjonsuavhengighet? 
• Resultat av dårlig programvareutviklingsmetodikk 
• Databasesystemet har ikke "sterke datatyper", dvs. skiller ikke mellom verdien 
"12345" lagret som tall eller tekst 
• Informasjon lagres/behandles uavhengig av programenes interne struktur 
• Det spiller ingen rolle hvilken type database (relasjonsdatabase, dokumentdatabase, 
grafdatabase, osv.) som brukes
```

## Side 3

```text
Spørsmål l 
Hvilken operator i relasjonsalgebra brukes for left outer join? 
• ⋈ 
• × 
• ⋉ 
• ⋊ 
Spørsmål m 
Hvilken operator i relasjonsalgebra er "motsatt" av × (kryssprodukt)?  
• - 
• ∩ 
• ∪ 
• ÷ 
Spørsmål n 
Gitt to tabeller Student og Kurs. Hva er "fornuftig" forhold mellom disse? 
• En-til-en 
• Mange-til-en 
• En-til-mange 
• Mange-til-mange 
Spørsmål o 
Hva er prinsippet for tofaselås? 
• Man har to faser - først bare låse, deretter bare låse opp 
• Man har to faser (låse/låse opp) som man stadig veksler mellom 
• Man har to transaksjoner som alltid er i "motsatte" faser - den ene låser mens den 
andre låser opp (og omvendt) 
• Man har to faser - først bare låse opp, deretter bare låse 
Oppgave 2 – SQL (10% ~24 min.) 
Spørsmål a 
Ta utgangspunkt i følgende tabeller: 
Student(studentnummer, fornavn, etternavn, telefonnummer, fødselsdato, studiekode*, 
årskull) 
Studium(studiekode, studienavn, ansvarlig, campus) 
Velg datatype for de ulike kolonnene i tabellen Student ovenfor, Grunngi svarene dine. 
 
Studentnummer: hvis vi antar at studentnummer alltid har f.eks. 6 siffer, kan char(6) være 
et greit valg. Ellers er også int en mulighet. 
Fornavn: en tekstreng med variabel lengde. Muligens opp til 25 tegn. I så fall varchar(25). 
Etternavn: som for fornavn. Muligens en annen lengde. 
Telefonnummer: spørs om man bare vil tillate norske telefonnummer, eller om utenlandske 
også skal være mulig. Char(8) for norske, kanskje varchar(12) for utenlandske. 
Fødselsdato: date. Egentlig ikke så mange andre alternativer. 
Studiekode: hvis vi antar at de har fast lengde på opp til 7 tegn, så kan char(7) være greit. 
Ellers kanskje varchar(10).
```

## Side 4

```text
Årskull: trolig char(4). Kunne også bruk int, men er ikke opplagt at det er noen fordeler med 
dette. 
 
Spørsmål b 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Velg begrensninger (on update/on 
delete) for fremmednøkkelen Studiekode i tabellen Student. Grunngi svarene dine. 
 
For fremmednøkler har man for hver av on update og on delete har fire valg: restrict 
(endringer ikke lov, må slette referende kolonner), cascade (endringer propageres), set null 
(sett til null ved endring) og set default (sett til default verdi ved endring (hvis man har satt 
dette til annet enn null). 
For delete bør vi ikke bruke cascade. Da vil alle studenter som har tatt en studiekode også 
bli slettet. Det ønsker vi neppe. Set null eller default er for så vidt mulig, men ønsker vi 
egentlig å slette en studieretning? Selv om vi ikke lenger vil tilby den, bør den trolig 
beholdes i «systemet» for historiske data. Trolig er restrict det beste her. 
For update kan derimot cascade være et greit valg. Da vil en endring av studiekoden bli 
oppdatert for studenter som har denne koden. Set null/default er ganske sikkert en verre 
løsning enn cascade. Restrict er også en mulighet, men kanskje det er greit å kunne tillate 
endringer. 
Vi lander dermed på on update cascae on delete restrict. 
Også andre valg enn dette kan være OK dersom man har argumentert godt for valgene, og 
man har fått frem at man forstår konsekvensene av de valgene man tar. 
 
Spørsmål c 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Velg null/not null for kolonnene i 
tabellen Student. Grunngi svarene dine. 
Studentnummer: not null. Kan ikke se noen gode grunner til at vi ikke skal gi 
studentnumemr til alle studenter. 
Fornavn: not null. Ellers vet vi ikke hvem studenten egentlig er. 
Etternavn: not null. Ellers vet vi ikke hvem studenten egentlig er. 
Telefonnummer: null. De fleste har nok telefonnummer, men det bør ikke være krav for å 
være student. 
Fødselsdato: not null. not null. Ellers vet vi ikke hvem studenten egentlig er. 
Studiekode: not null. Antar at alle studenter er tatt opp på et studium (kan lage studiekode 
for studenter som bare tar ett fag). 
Årskull: not null. Antar at man har begynt på studium (studiekode) et bestemt år. 
Som sagt er andre svar mulig dersom man argumenterer godt for dette, og man får frem at 
man vet konsekvensene av de valgene man tar. 
 
Spørsmål d 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Skriv fullstendig SQL-kode for å 
opprette tabellen Student. 
 
create table student( 
studentnummer char(6) primary key, 
fornavn varchar(25) not null, 
etternavn varchar(25) not null,
```

## Side 5

```text
telefonnummer char(8), 
fødselsdato date not null, 
studiekode varchar(10) not null, 
årskull char(4) not null, 
foreign key (studiekode) references stadium(studiekode); 
 
Også andre valg enn dette kan være OK dersom man har argumentert godt for valgene, og 
man har fått frem at man forstår konsekvensene av de valgene man tar. 
 
Oppgave e 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Skriv fullstendig SQL-kode for å legge 
til en kolonne Epost til den eksisterende tabellen Student. 
 
alter table student add column epost varchar(25); 
 
Oppgave f 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Skriv fullstendig SQL-kode for å slette 
studium "DATAING" fra tabellen Studium. Koden skal kunne faktisk slette studiet gitt 
tidligere valg for begrensinger for fremmednøkkel i spørsmål b. (Hvis behov, er det tillatt å 
bruke flere SQL-instuksjoner.) 
 
delete from student where studiekode="DATAING"; 
delete from studium where studiekode="DATAING"; 
 
Siden vi tidligere har valgt on delete restrict, må vi selv først slette alle studenter som har 
denne koden. Vi kan ikke endre til null siden vi har valgt å ikke tillate null-merke for studie-
koden. Så eneste alternativ da er å slette studentene. Man kan kanskje bli fristet til å spørre 
om dette da var gode valg. På den annen side vil man som regel ikke slette et studium slik vi 
gjør i denne oppgaven. 
 
Oppgave g 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Skriv fullstendig SQL-kode for å finne 
antall studenter på hvert studium. 
 
select studiekode, count(*) 
from student 
group by studiekode; 
Man kan diskutere om "studium" skal tolkes som studiekode eller studienavn. Hvis man 
istedenfor bruker studienavn, vil man måtte joine studietabellen. Begge deler er riktig. 
 
Oppgave h 
Ta utgangspunkt i besvarelsene for tidligere spørsmål. Skriv fullstendig SQL-kode for å finne 
all informasjon (inkludert info om deres studium) for alle studenter på studium "INF". 
 
select * from 
student inner join studium
```

## Side 6

```text
on student.studiekode=studium.studiekode 
where student.studiekode="INF"; 
 
Oppgave i 
Ta utgangspunkt i besvarelsen for spørsmål h. Skriv SQL-koden om til relasjonsalgebra. 
 
studium⋈student.studiekode=studium.studiekodeσstudiekode="INF"(student) 
 
Vi velger først ut studenter med studiekode INF ved hjelp av en seleksjon. Det er mer 
effektivt å gjøre dette før joiningen enn etter. Deretter har vi en inner join på studiekoden. 
Siden vi ønsker all informasjon, trenger vi ikke en projeksjon for å velge ut kolonner. 
 
Oppgave j 
Ta utgangspunkt i besvarelsene for spørsmål h og i. Forklar hvorfor du brukte "inner join", 
"left outer join", "right outer join" eller "full outer join". 
 
Det holder med inner join siden vi uansett bare skal ha info for en kjent studiekode. Ellers 
måtte man brukt left outer join (eventuelt right outer join hvis rekkefølgen er omvendt) for 
å også få med studenter med null-merke for studiekode (dersom vi har tillatt dette). En full 
outer join brukes veldig sjeldent, og gir neppe så mye mening her. 
 
Oppgave 3 – modellering (~10% ~24 min.) 
Et sykehus har behov for en database for et (enkelt) journalsystem. 
Personer har ulike roller, hovedsakelig lege og pasient. Men lege kan også være pasient (og 
omvendt). Alle personer har fødselsnummer, fornavn, etternavn, gate, husnummer, 
postnummer, poststed, telefonnummer, samt epost. Lege har spesialiseringer (det er en 
liste over mulige spesialiseringer). Lege har også overordnet leder/sjef. Pasienter har 
fastlege. 
En time (konsultasjon/behandling) har pasient, lege, dato/tidspunkt, samt lengde. Det skal 
også være en oppsummering/beskrivelse («journal») av det som kom ut av timen. 
På bakgrunn av en time skal en lege kunne skrive ut en eller flere resepter for medisiner for 
pasienten. En resept skal således ha informasjon om lege som skriver den ut, pasient den er 
for, hvilken time som ligger til grunn, samt en liste over medisiner. For hver medisin skal det 
angis medisinnavn og mengde. 
Tegn et ER-diagram (i en av notasjonene som har vært brukt i kurset) for denne databasen. 
Få med all relevant informasjon (primærnøkler, fremmednøkler, kardinalitet, sterke/svake 
entiteter, osv.). 
Kommenter valgene du tar for å klargjøre hvordan du tenker/resonerer.
```

## Side 7

```text
Dette er en mulig måte ER-diagrammet kan utformes på. Andre er også mulig, og kan være 
like riktige dersom man har argumentert godt for valgene, og man har fått frem at man 
forstår konsekvensene av de valgene man tar. Det er vise tolkningsmuligheter med tanke på 
hvor vidt det skal kunne være mulig for lege å skrive ut resept uten at det har vært en time, 
og hvorvidt en time skal kunne resultere i mer enn en time. Denne løsningen tillater begge
```

![Sykehusmodell](/content/dat107/assets/originale-eksamen/2022-mai-sykehusmodell.png)

## Side 8

```text
deler. En løsning som ikke tillater dette vil kunne være en del enklere, og ikke nødvendigvis 
mindre riktig ut fra oppgaven. Generelt sett er 0..* koplinger brukt med mindre det er klart 
at det er et krav med minimum 1, og at vi dermed får 1..* kopling.  
 
Oppgave 4 – normalisering (24%) 
Spørsmål a 
Ta utgangspunkt i følgende (unormalisert) tabell: 
Bilforsikring(fornavn, etternavn, gate, husnummer, postnummer, poststed, epost, 
forsikringsnummer, registreringsnummer, merke, årsmodell, nypris, forsikringstype, 
forsikringspris, rabatt) 
Eksempeldata: 
«Kari», «Sørkvinne», «Inndalsveien», «28», «5063», «Bergen», «kari@sørkvinne.no», 
987654, «AA12345», «Troll», 1956, «Ansvar», 500, 90% 
«Kari», «Sørkvinne», «Inndalsveien», «28», «5063», «Bergen», «kari@sørkvinne.no», 
987654, «AA12345», «Troll», 1956, «Kasko», 1000, 90% 
Diskuter mulige kandidatnøkler (eventuelt sammensatt) ut fra eksisterende kolonner (ikke 
surrogatnøkkel/løpenummer) slik tabellen er nå. Kommenter mulige «problemer» med ulike 
kandidatnøkler, og velg til slutt primærnøkkel fra kandidatnøklene. Skriv opp tabellen på 
nytt med primærnøkkel indikert. 
 
Vi kan begynne med å se på eksempeldataene som er inkludert i oppgaven. Vi ser at den 
eneste forskjellen mellom disse er Forsikringstype, som i første linjen er «Ansvar», mens i 
andre linjen er «Kasko». Ellers er linjene helt like, inkludert Forsikringsnummer. Fra dette 
forstår vi at begge linjene tydeligvis egentlig er samme forsikringsavtale 
(Forsikringsnummer), og at hver linje viser hvilke «dekninger» forsikringen har. Fra dette kan 
vi konkludere at trolig både Forsikringsnummer og Forsikringsavtale må inngå i 
primærnøkkelen. Er det andre kolonner som kan være aktuelle? Registreringsnummer? I så 
fall ville det bety at flere biler kan være inkludert i samme forsikringsavtale. Det er kanskje 
mulig, men vi antar at dette ikke er tilfelle. Kolonner som identifiserer forsikringstakeren 
(fornavn, etternavn, adresse, osv.)? Dersom noe av dette inngår i primærnøkkelen, ville det 
bety at forsikringen involverer flere personer (flere personer forsikrer samme bil sammen)? 
Kanskje ikke umulig, men det virker usannsynlig. Det er også en del kolonner med detaljer 
om bilen: merke og årsmodell. Dette vil uansett være bestemt fra registreringsnummer, så 
det hadde i så fall vært bedre å bruke registreringsnummer. 
 
Ut fra disse betraktningene, kommer vi frem til at den eneste kandidatnøklene som synes å 
gi mening er Forsikringsnummer og Forsikringstype, som da også blir vår valge 
primærnøkkel. V får da: 
 
Bilforsikring(forsikringsnummer, forsikringstype, fornavn, etternavn, gate, husnummer, 
postnummer, poststed, epost, registreringsnummer, merke, årsmodell, nypris, 
forsikringspris, rabatt) 
 
Spørsmål b 
Med utgangspunkt i besvarelsen fra a), er tabellen nå på 1NF? Hvorfor/hvorfor ikke? Hvis 
ikke, modifiser den slik at den er på 1NF. Skriv opp alle tabeller slik databasen er nå. Få med 
eventuelle primær/fremmednøkler.
```

## Side 9

```text
1NF krever at alle kolonner skal være atomære, dvs. at vi ikke skal ha kolonner som 
inneholder «lister». F.eks. telefonnummer e.l. Det har vi ikke, så tabellen er på 1NF. Vi har 
da fortsatt: 
Bilforsikring(forsikringsnummer, forsikringstype, fornavn, etternavn, gate, husnummer, 
postnummer, poststed, epost, registreringsnummer, merke, årsmodell, nypris, 
forsikringspris, rabatt) 
 
Spørsmål c 
Med utgangspunkt i besvarelsen fra b), er tabellen nå på 2NF? Hvorfor/hvorfor ikke? Hvis 
ikke, modifiser den slik at den er på 2NF. Skriv opp alle tabeller slik databasen er nå. Få med 
eventuelle primær/fremmednøkler. 
 
2NF krever at ingen kolonner skal avhenge av en annen kolonne som er «del av» 
primærnøkkel. Dvs., ingen kolonner skal avhenge «bare» av Forsikringsnummer eller «bare» 
av Forsikringstype. (Kolonner skal avhenge av «hele» kombinasjonen av Forsikringsnummer 
og Forsikringstype.) 
Gitt at Forsikringsnummeret identifiserer selve forsikringsavtalen, slik vi har forstått 
oppgaven, så avhenger alle kolonner med informasjon om forsikringstakeren og kjøretøyet 
bare av Forsikringsnummer. Tydeligvis er det bare Forsikringspris og Rabatt som kan 
avhenge av forsikringstype. Vi deler da opp i to tabeller: 
Bilforsikring(forsikringsnummer, fornavn, etternavn, gate, husnummer, postnummer, 
poststed, epost, registreringsnummer, merke, årsmodell, nypris) 
 
Forsikringsdekning(forsikringsnummer*, forsikringstype, forsikringspris, rabatt) 
 
Spørsmål d 
Med utgangspunkt i besvarelsen fra c), er tabellen nå på 3NF? Hvorfor/hvorfor ikke? Hvis 
ikke, modifiser den slik at den er på 3NF. Skriv opp alle tabeller slik databasen er nå. Få med 
eventuelle primær/fremmednøkler. 
 
3NF krever at ingen kolonner skal avhenge av en annen kolonne enn primærnøkkel. Vi ser at 
mange av kolonnene i tabellen Bilforsikring inneholder informasjon enten om en person 
som er forsikringstaker (som kan ha flere forsikringer), eller bil som er forsikret. Dette kan 
da bli egnene tabeller. For forsikringstaker kan det være naturlig å velge Fornavn, Etternavn, 
Postnummer som primærnøkkel. Trolig vil det være rimelig å anta at vi ikke vil ha flere enn 
en forsikringstaker med samme navn som bor på samme poststed (Postnummer). Eventuelt 
kunne man brukt Epost som primærnøkkel, men vi da ville vi også implisitt kreve at alle 
forsikringstakere har epost. Som kanskje eller kanskje ikke er rimelig. Begge deler er for så 
vidt mulig dersom man argumenterer for det på en fornuftig måte. For Bil er nok 
registreringsnummer en grei naturlig primærnøkkel. I tillegg bør Postnummer/Poststed 
legges ut som egen tabell. 
Er det da andre avhengigheter som bryter med 3NF? Muligens vil Forsikringspris og Rabatt 
avhenge av Årsmodell og/eller Nypris, samt Forsikringstype. Men ut fra det som står i 
oppgaven er ikke dette opplagt. Vi antar derfor at det ikke er noen sikker avhengighet her. 
Tabellene våre blir da:
```

## Side 10

```text
Bilforsikring(forsikringsnummer, fornavn, etternavn*, postnummer*, poststed*, 
registreringsnummer*) 
 
Forsikringsdekning(forsikringsnummer*, forsikringstype, forsikringspris, rabatt) 
 
Forsikringstaker(fornavn, etternavn, postnummer*, gate, husnummer) 
 
Poststed(postnr, poststed) 
 
Bil(registreringsnummer, merke, årsmodell, nypris) 
 
Oppgave 5 – JPA/ORM (20% ~28 min.) 
Vi skal jobbe litt med en database med oversikt over personer, adresser og telefonnumre. 
En person må ha nøyaktig én adresse. Flere personer kan bo på samme adresse. 
En person kan ha flere telefoner, men trenger ikke å ha telefon. En telefon tilhører én person. 
Vi tenker oss følgende tabeller. Det er tatt med eksempeldata for å illustrere mulig innhold. 
person 
id (PK) Kunstig nøkkel 
fornavn 
etternavn 
adresse_id (FK) 
1 
'Arne' 
'Arnesen' 
1 
2 
… 
… 
… 
 
adresse 
id (PK) Kunstig nøkkel 
gateadresse 
postnummer 
1 
'Kirkegaten 1' 
5036 
2 
… 
… 
 
telefon 
nummer (PK) 
alias 
person_id (FK) 
98765432 
'Privat mobil' 
1 
87654321 
'Jobbmobil' 
1 
76543210 
… 
… 
 
Vi ønsker å jobbe med denne databasen i et Java-program. 
a) (8% ~ 20 min) Skriv Java-klassene for entitetstypene person, adresse og telefon som 
tilsvarer databasetabellene vist over. Du trenger ikke å skrive metoder, kun instans-
/objektvariabler og JPA-annoteringer. Du kan videre anta at klassene inneholder de 
nødvendige konstruktører og get- og set-metoder. 
Vi ønsker IKKE toveis forbindelse mellom person og adresse, men vi ønsker det mellom 
person og telefon. (Det blir poengtrekk om du annoterer "for mye" her)
```

## Side 11

<details>
<summary>Vis løsningsforslag</summary>

```text
1  @Entity 
   public class Person { 
 
1 
@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
 
private Integer id; 
 
private String fornavn; 
 
private String etternavn; 
 
1 
@ManyToOne @JoinColumn(name = "adresse_id") 
1 
private Adresse adresse; 
 
1 
@OneToMany(mappedBy = "eier", fetch = FetchType.EAGER) 
1 
private List<Telefon> telefoner; 
   } 
 
   @Entity 
1  public class Adresse { 
 
 
@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
 
private Integer id; 
 
private String gateadresse; 
 
private Integer postnummer; 
 
-1 
//Trekk hvis den under er med! 
 
@OneToMany(mappedBy = "adresse", fetch = FetchType.EAGER) 
 
private List<Person> beboere; 
   } 
 
   @Entity 
   public class Telefon { 
 
 
1 
@Id 
 
private Integer nummer; 
 
private String alias; 
 
1 
@ManyToOne @JoinColumn(name = "person_id") 
1 
private Person eier; 
   } 
 
Vi antar at vi har en hjelpeklasse PersonDAO. Du skal lage et par metoder i denne. Du kan 
anta at en EntityManagerFactory kalt emf er opprettet og tilgjengelig.
```

</details>

```text
b) (3,5% ~ 8 min) Skriv en metode hentUtPersonMedId(int id) i PersonDAO som henter 
ut en person med en gitt id. Hvis ingen finnes skal det returneres null.
```

<details>
<summary>Vis løsningsforslag</summary>

```text
2 public Person hentUtPersonMedId(int id) { 
 
1 
EntityManager em = emf.createEntityManager(); 
1 
try { 
4 
 
return em.find(Person.class, id); 
1 
} finally { 
1 
 
em.close();
```

</details>

## Side 12

<details>
<summary>Vis løsningsforslag (fortsetter)</summary>

```text
} 
  }
```

</details>

```text
c) (3,5% ~ 8 min) Skriv en metode hentUtAlleSomBorPaaAdresseId(int id) i PersonDAO 
som henter ut en liste av personer som bor på adressen med en gitt id.
```

<details>
<summary>Vis løsningsforslag</summary>

```text
2 public List<Person> hentUtAlleSomBorPaaAdresseId(int id) { 
 
 
EntityManager em = emf.createEntityManager(); 
 
try { 
 
 
String queryString =  
2                    "SELECT p FROM Person p WHERE p.adresse.id = :adresse_id"; 
 
2 
 
TypedQuery<Person> query = em.createQuery(queryString, 
Person.class); 
 
2 
 
query.setParameter("adresse_id", id); 
 
2 
 
return query.getResultList(); 
 
} finally { 
 
 
em.close(); 
 
} 
  } 
 
Merknad: Siden Person har en Adresse, og denne adressen har en id (og ikke som i 
databasen, at Person har en fremmdnøkkel adresse_id), må vi i JPQL skrive 
p.adresse.id, ikke p.adresse_id. 
 
Merknad: Siden Adresse ikke inneholder en liste av Personer, jfr. oppgavetekst i 
a), kan vi ikke gjøre en find() på adresse, og deretter hente listen derfra med 
getBeboere(). Hvis man har valgt denne løsningen gis maks 5 poeng.
```

</details>

```text
d) (5% ~ 12 min) Skriv en metode personFlytterTilAdresse(int personId, String 
gateadresse, int postnummer) i PersonDAO som registrerer flytting til ny adresse for 
person med gitt personId. Hvis adressen finnes fra før i databasen skal denne brukes. Hvis 
adressen ikke finnes fra før skal den opprettes. Du kan anta at PersonDAO har en 
hjelpemetode hentUtAdresse(String gateadresse, int postnummer) som søker 
opp og evt. returner en adresse om den finnes.
```

<details>
<summary>Vis løsningsforslag</summary>

```text
public void personFlytterTilAdresse( 
    int personId, String gateadresse, int postnummer) { 
 
 
EntityManager em = emf.createEntityManager(); 
 
EntityTransaction tx = em.getTransaction(); 
 
 
try { 
1 
 
tx.begin();
```

</details>

## Side 13

<details>
<summary>Vis løsningsforslag (fortsetter)</summary>

```text
Adresse adresse = hentUtAdresse(gateadresse, postnummer); 
 
 
 
if (adresse == null) { 
1 
 
 
adresse = new Adresse(gateadresse, postnummer); 
2 
 
 
em.persist(adresse); 
 
 
} 
 
 
  
/* Antar at denne finnes. Ellers måtte vi sjekket med if ... */ 
1 
 
Person p = em.find(Person.class, personId); 
 
 
  
/* Siden vi kun har enveis forbindelse her holder det å oppdatere 
 
  
 * p sin adresse. Hadde vi hatt toveis forbindelse måtte vi også 
 
  
 * slettet p fra beboerlisten på evt. gammel adresse (måtte sjekket 
  
 * om den fantes først) og lagt p til i beboerlisten for ny adresse. 
 * Vi måtte også passet på at den nye adressen var "managed" før 
  
 
 * eller etter oppdateringer. 
 
  
 * NB! Hvis p er hentet med hentUtPersonMedId() må p merges! 
 
  
 */ 
2 
 
p.setAdresse(adresse); 
 
1 
 
tx.commit(); 
 
 
} catch (Throwable e) { 
 
 
e.printStackTrace(); 
 
 
tx.rollback(); 
 
} finally { 
 
 
em.close(); 
 
} 
}
```

</details>

```text
Oppgave 6 – data mining (10% ~24 min.) 
Spørsmål a 
Beskriv stegene for "k-item" set (k>=1) for å finne "the association rules" ved å benytte 
Apriori-algoritme basert på følgende tabell. "Minimum support" er 50% (s=2) og 
"confidence" er 80%. 
Transaction Table 
Transaction 
ID 
A 
B 
C 
D 
E 
1 
1 
0 
1 
1 
0 
2 
0 
1 
1 
0 
1 
3 
1 
1 
1 
0 
1 
4 
1 
1 
1 
0 
1 
5 
0 
1 
0 
0 
1 
Support Count. 
Itemset Support 
A 
2 
B 
3 
C 
3 
D 
1 
E 
3
```

## Side 14

```text
Solution  
 
Figure 1: Step 1 - Frequent Item 
 
 
Figure 2: Steps 2 - Find Combinations 
 
Figure 3: Step 3-Rules 
5: excellent answers with steps 
4: good answer (one wrong solution, not output) 
3: fair solutions (2 wrong solutions but others seem all right) 
2: descent solutions (candidates generation step correct) 
1: Something correct but no iterations
```

![Apriori-beregninger 1](/content/dat107/assets/originale-eksamen/2022-mai-apriori-1.png)

![Apriori-beregninger 2](/content/dat107/assets/originale-eksamen/2022-mai-apriori-2.png)

![Apriori-beregninger 3](/content/dat107/assets/originale-eksamen/2022-mai-apriori-3.png)

## Side 15

```text
0: No solution or completely wrong 
 
Spørsmål b 
Hvorfor er problemet med "high utility itemset mining" interessant? Hvorfor er "utility 
measure" verken monotonisk eller anti-monotonisk? Ta utgangspunkt i figuren nedenfor for 
å forklare svarene dine. Dvs., "minimum utility" er 36, da er U(b, d, e) = 36$, U(b, c, d, e) = 
40$, og U(a, b, c, d, e, f) = 30$. 
Utility measure 
 
 
Solution: 
If a function increases and decreases, then it’s not a monotonic function or an anti-monotonic 
function. The problem of high utility itemset mining is more challenging. Infrequent itemset 
mining is a well-known property of the frequency (support) of itemsets that states that given 
an itemset, all its supersets must have lower or equal support. This is often called the “Apriori 
property” or “anti-monotonicity” property and is very powerful in pruning the search space 
because if an itemset is infrequent, then we know that all its supersets are also infrequent 
and may be pruned. In high utility itemset mining, there is no such property. If we set the 
utility threshold to 38$, the itemset (b, d, e) would not be discovered.  
 
5: excellent answer with example reason 
4: good answer (reason only) 
3: fair solutions (Monotonic and ani-monotonic properties) 
2: descent solutions (concept explanation) 
1: Something correct but no reason and example. 
0: No solution or completely wrong 
 
Oppgave 7 – NoSQL (10% ~24 min.) 
Spørsmål a 
Ta utgangspunkt i oppgave 2 (SQL). Det er behov for å eksportere data fra denne databasen 
til en XML-fil. Skriv et eksempel på en slik fil som inkluderer data fra en «rad» fra hver av 
tabellene. Det skal i prinsippet være mulig å lagre et vilkårlig antall rader fra alle tabellene i 
filen. 
 
<?xml version=«1.0» encoding=«utf-8» ?> 
<data xmlns:xsi="http://hvl.no" xsi:noNamespaceSchemaLocation="data.xsd" > 
  <studier> 
    <studium studiekode="DATAING" studienavn="Dataingeniør" ansvarlig="Ola Nordmann" 
campus="Bergen" /> 
  </studier> 
  <studenter>
```

![Data mining-figur](/content/dat107/assets/originale-eksamen/2022-mai-data-mining-figur.png)

## Side 16

```text
<student studentnummer="0" fornavn="Kari" etternavn="Sørkvinne" 
telefonnummer="98765432" fødselsdato="2000-01-01" studiekode="DATAING" 
årskull="2020"/> 
  </studenter> 
</data> 
 
Skal være <?xml … ?> prolog som første linje. Bare et rot-element tillatt (f.eks. <data>). Når 
det er flere studenter, bør disse ligge en liste med <studenter>. Samme for studier. Man 
kunne også brukt tagger istedenfor elementer flere steder. Kunne også hatt studium som 
sammensatt attributt på student, men siden dette er en eksport fra en SQL-database, er det 
nok riktigst å beholde dette som en egen «tabell». 
 
Spørsmål b 
Ta utgangspunkt i spørsmål a. Skriv et egnet «XML Schema» for denne XML-filen. 
 
<?xml version="1.0" encoding="UTF-8" ?> 
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"> 
 
<xs:simpleType name="navntype"> 
  <xs:restriction base="xs:string"> 
    <xs:maxLength value="25"/> 
  </xs:restriction> 
</xs:simpleType> 
 
<xs:simpleType name="telefonnummertype"> 
  <xs:restriction base="xs:string"> 
    <xs:pattern value="[0-9]{8}"/> 
  </xs:restriction> 
</xs:simpleType> 
 
<xs:simpleType name="studiekodetype"> 
  <xs:restriction base="xs:string"> 
    <xs:maxLength value="10"/> 
  </xs:restriction> 
</xs:simpleType> 
 
<xs:simpleType name="studienavntype"> 
  <xs:restriction base="xs:string"> 
    <xs:maxLength value="20"/> 
  </xs:restriction> 
</xs:simpleType> 
 
<xs:simpleType name="ansvarligtype"> 
  <xs:restriction base="xs:string"> 
    <xs:maxLength value="50"/> 
  </xs:restriction> 
</xs:simpleType>
```

## Side 17

```text
<xs:simpleType name="campustype"> 
  <xs:restriction base="xs:string"> 
    <xs:maxLength value="15"/> 
  </xs:restriction> 
</xs:simpleType> 
 
<xs:complexType name="studenttype"> 
  <xs:attribute name="studentnummer" type=" xs:positiveInteger" use="required"/> 
  <xs:attribute name="fornavn" type="navntype" use="required"/> 
  <xs:attribute name="etternavn" type="navntype" use="required"/> 
  <xs:attribute name="telefonnummer" type="telefonnummertype"/> 
  <xs:attribute name="fødselsdato" type="xs:date" use="required"/> 
  <xs:attribute name="studiekode" type="studiekodetype" use="required"/> 
  <xs:attribute name="årskull" type="xs:gyear" use="required"/> 
</xs:complexType> 
 
<xs:complexType name="studiumtype"> 
  <xs:attribute name="studiekode" type="studiekodetype" use="required"/> 
  <xs:attribute name="studienavn" type="studienavntype" use="required"/> 
  <xs:attribute name="ansvarlig" type="ansvarligtype" use="required"/> 
  <xs:attribute name="campus" type="campustype" use="required"/> 
</xs:complexType> 
 
<xs:complexType name="studentertype"> 
  <xs:sequence> 
    <xs:element name="student" type="studenttype"/> 
  </xs:sequence> 
</xs:complexType> 
 
<xs:complexType name="studiertype"> 
  <xs:sequence> 
    <xs:element name="studium" type="studiumtype"/> 
  </xs:sequence> 
</xs:complexType> 
 
<xs:complexType name="datatype"> 
  <xs:sequence> 
    <xs:element name="studenter" maxOccurs="1" type="studenttype"/> 
    <xs:element name="studier" maxOccurs="1" type="studiertype"/> 
  </xs:sequence> 
</xs:complexType> 
 
<xs:element name="data" type="datatype"/> 
 
</xs:schema>
```

## Side 18

```text
Det er flere måter å skrive XML-schema. Her er det valgt å dele det opp for å gjøre det mer 
oversiktlig, men det er også mulig å skrive det uten å dele opp, som i utgangspunktet kan 
være like riktig. Det er ikke forventet at en besvarelse skal kunne gå igjennom en validator 
uten feil. Det er også tatt en del valg ovenfor, f.eks. med tanke på om use skal være 
requires, valg av datatyper og lengde på tekst. Det er ikke de eneste riktige valgene, andre 
valg kan også være mulige så lenge de er rimelige. Generelt sett bør valgene her samsvare 
med valg tatt i oppgave 2, siden XML-filen er ment å være for eksport fra denne databasen. 
 
Spørsmål c 
Det skal utvikles et nytt nett-basert sosialt nettverk. Dette skal inkludere mulighet for 
brukere å «chatte» med hverandre. Det er foreslått å bruke en graf-database til dette. 
Vurder om en graf-database er egnet til dette. Hvorfor/hvorfor ikke? Foreslå eventuelt en 
annen databasetype om du synes dette vil fungere bedre. Grunngi svaret. 
 
Hensikten med denne oppgaven er å se om kandidaten har en forståelse av egenskaper og 
fordeler/ulemper ved ulike typer databaser. Oppgaven kan besvares noe forskjellig, og det 
er ikke nødvendigvis elementer som «må» være med i besvarelsen. Det er selvsagt heller 
ikke meningen at besvarelsen skal kunne skaleres opp til et sosialt nettverk av størrelsen til 
Facebook. 
Selve det sosiale nettverket kan implementeres ved hjelp av en graf-database. Som regel vil 
en graf-database ha støtte for å utføre spørringer som kan gjøre det enklere å studere 
strukturer i nettverket. Det er kanskje ikke gitt at det vil være den mest effektive måten å 
implementere dette, men en detaljert diskusjon av dette ligger noe utenfor oppgaven. 
For chatte-funksjonen derimot, vil nok en graf-database være veldig lite egent. Dersom man 
tenker seg at en melding ville bli representert som en kant mellom to noder (personer), så 
ville man fått enorme mengder med kanter. Trolig ville en chatte-løsning hvor meldingene 
er laget i JSON-dokumenter fungert bedre. (Dette kan kombineres med f.eks. en graf-
database for selve det sosiale nettverket.)
```
