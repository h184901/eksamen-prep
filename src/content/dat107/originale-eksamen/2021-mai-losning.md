# DAT107 2021 mai eksamen - løsningsforslag

Kildetro sideutdrag fra original PDF. Oppgaverekkefølge, delspørsmål og løsningsforslag er bevart som originaltekst der uttrekket har tekst. Utvalgte figurer er lagt inn etter siden de hører til.

## Side 1

```text
1 
 
DAT107 løsningsforslag eksamen mai 2021 
Oppgave 1 – flervalg 
a) 
Gitt to tabeller. Hvilke rader blir tatt med i resultatet av en «full ytre kobling» mellom dem? 
A 
Bare rader fra høyre tabell 
B 
Alle rader fra både høyre og venstre tabell 
C 
Bare koblede rader fra både høyre og venstre tabell 
D 
Alle rader fra høyre tabell, samt koblede rader fra venstre tabell 
b) 
Gitt to tabeller. Hvilke rader blir tatt med i resultatet av en «høyre ytre kobling» mellom dem? 
A 
Alle rader fra høyre tabell, samt koblede rader fra venstre tabell 
B 
Alle rader fra både høyre og venstre tabell 
C 
Bare koblede rader fra både høyre og venstre tabell 
D 
Bare rader fra høyre tabell 
c) 
Gitt to tabeller. Hvilke rader blir tatt med i resultatet av en «likekobling» mellom dem 
A 
Alle rader fra høyre tabell, samt koblede rader fra venstre tabell 
B 
Bare koblede rader fra både høyre og venstre tabell 
C 
Alle rader fra både høyre og venstre tabell 
D 
Bare rader fra høyre tabell 
d) 
Tabell «A» har ett «en-til-mange-forhold» til tabell «B». Hvilken tabell skal lagre fremmednøkkelen? 
A 
A 
B 
B 
C 
Må bruke koblingstabell som lagrer fremmednøkler til både A og B 
D 
Både A og B 
e) 
En tabell har en fremmednøkkel til en annen tabell. Dette kan angis i SQL ved hjelp av nøkkelordene 
«constraint» og «foreign key» når vi oppretter en tabell.  Hva er hensikten med å bruke dette? 
A 
Det gjør det mulig å spesifisere ytterligere krav for databasens integritet 
B 
Uten dette vil det ikke være mulig å koble disse tabellene sammen 
C 
Kobling blir utført automatisk, og det er ikke behov for å «manuelt» bruke kobling i 
utvalgsspørringer mellom tabellene
```

## Side 2

```text
2 
 
D 
Har ikke betydning utover å synliggjøre at det er en fremmednøkkel 
f) 
I en tabell er det behov for en kolonne som lagrer en monetær verdi (penger). Hvilken datatype er 
som regel mest hensiktsmessig for dette? (Du trenger ikke ta stilling til hvor store verdier det er 
behov for å lagre.) 
A 
Integer (eller tilsvarende) 
B 
Char(n) (eller tilsvarende) 
C 
Numeric(p,s) (eller tilsvarende) 
D 
Double (eller tilsvarende) 
g) 
Når kan en dokumentdatabase være ett godt alternativ til en relasjonsdatabase? 
A 
Vi ikke har behov for å koble sammen data («tabeller») 
B 
Når datastrukturen ikke er kjent på forhånd og det kan være behov for å endre dette 
underveis 
C 
Egentlig ingen forskjell – bare to likeverdige måter å løse ett vilkårlig behov for å lagre data 
D 
Dokumentdatabaser er alltid enklere å håndtere siden er mindre stringente 
h) 
Hva er riktig om primærnøkler? 
A 
Må være en numerisk verdi 
B 
Blir alltid generert automatisk av databasesystemet 
C 
Kan bestå av flere kolonner (verdier) 
D 
Kan utelates 
i) 
Kan to tabeller ha flere forhold mellom seg (dvs. flere "fremmednøkler")? 
A 
Ja, men bare dersom alle er av samme type, dvs. alle av f.eks. «en-til-mange» 
B 
Ja 
C 
Nei 
D 
Ja, men bare dersom alle er av forskjellige typer, f.eks. «en-til-mange» og «en-til-en» 
j) 
Tabell «A» har ett «mange-til-mange-forhold» til tabell «B». Hvilken tabell skal lagre 
fremmednøkkelen? 
A 
Er ikke behov for fremmednøkler for «mange-til-mange-forhold» 
B 
Må bruke koblingstabell som lagrer fremmednøkler til både A og B 
C 
Enten A eller B, spiller ingen rolle hvilken
```

## Side 3

```text
3 
 
D 
Både A og B 
k) 
Hva er forskjellen på en dokumentdatabase og en nøkkel/verdidatabase? 
A 
Dokumentdatabase brukes til JSON-data, mens nøkkel/verdidatabase brukes til XML-data 
B 
En dokumentdatabase kan enklere lagre mer komplekse datastrukturer enn 
nøkkel/verdidatabase 
C 
Egentlig ingen forskjell, bare forskjellig navn 
D 
Nøkkel/verdidatabaser var forgjengeren til dokumentdatabaser, og er ikke lenger relevant 
l) 
Hva er riktig om indekser? 
A 
En indeks på en kolonne betyr at en tabell blir sortert på denne kolonnen før den blir skrevet 
til fil/disk 
B 
En indeks vil alltid føre til bedre ytelse, og bør opprettes for alle kolonner 
C 
En tabell kan bare ha indeks for en kolonne 
D 
En indeks på en kolonne betyr at det er opprettet ett «innholdsregister» for denne kolonnen 
m) 
Hva er riktig om transaksjoner? 
A 
Sikrer at vi ikke får inkonsistente data 
B 
Bedrer databasens ytelse 
C 
Det samme som en enkelt lese/skrive-operasjoner mot en eller flere tabeller 
D 
Kan bare inneholde en lese/skriveoperasjon 
n) 
Hva er riktig om bruk av isolasjonsnivåer? 
A 
Bedrer ytelsen uten potensielt negative sideeffekter 
B 
Garantert samme «endelig» resultat som uten, men kan ta noe tid før databasen blir 
konsistent 
C 
Samme som tofaselås 
D 
Kan gi forskjellig «endelig» resultat som uten, men gir bedre ytelse 
o) 
Hva er riktig om tofaselås? 
A 
Samme som optimistisk låsing 
B 
Garanterer serialiserbare forløp 
C 
Garanterer at vranglås ikke kan oppstå
```

## Side 4

```text
4 
 
D 
Algoritme for håndtering av ventegraf 
Oppgave 2 – SQL 
 
a) 
Skriv SQL-kode for å opprette tabellen for personer ovenfor. Ta med primærnøkkel og eventuelle 
fremmednøkler. Inkluder da "hensiktsmessig" bruk av «on update/delete». 
create table person ( 
personid integer primary key, 
navn varchar(50) not null, 
postnummer char(4) references poststed (postnummer) 
on update cascade on delete set null, 
adresse varchar(50), 
telefonnummer char(8)); 
Vi oppretter tabellen med alle kolonner fra figuren. En del av valgene for datatyper kan diskuteres, 
og andre valg kan være like riktige dersom er «hensiktsmessige». For eksempel bruk av char(n) vs. 
numeric(n,0) for postnummer og telefonnummer. Problematikk angående utenlandske post- og 
telefonnummer går vi ikke inn på. Men selvsagt ikke feil om man tar valg som tar hensyn til dette. 
Navn er satt med not null siden man vanskelig kan snakke om en «person» uten denne 
grunnleggende informasjonen. Postnummer, adresse og telefonnummer er tillatt med null siden det 
kan være at denne informasjonen ikke er tilgjengelig. Fremmednøkkel og primærnøkkel kan også 
legges inn som egne linjer til slutt. Valg for on update og on delete kan diskuteres. Her er «rimelige» 
valg tatt, men andre er også mulig. 
b) 
Det er behov for å legge til en kolonne «epost-adresse» til tabellen. Skriv SQL-kode for å legge til 
dette. 
alter table person add epostadresse varchar(50); 
c) 
Det er ikke lenger ønskelig å lagre kolonnen «telefonnummer» for tabellen. Skriv SQL-kode for å 
fjerne dette. 
alter table person drop column telefonnummer; 
d) 
Skriv en SQL-spørring som viser navn, postnummer og poststed for alle personer, uavhengig av om 
postnummer finnes i tabellen for poststed.
```

![Oppgave 2-tabeller](/content/dat107/assets/originale-eksamen/2021-mai-oppgave-2-tabeller.png)

## Side 5

```text
5 
 
select navn, postnummer, poststed 
from person left outer join poststed 
on person.postnummer=poststed.postnummer; 
Her må vi bruke en left outer join for også å få med personer med postnummer som ikke ligger i 
poststed-tabellen (null-verdi). 
e) 
Skriv en SQL-spørring som viser navn, postnummer og poststed bare for personer hvor postnummer 
finnes i tabellen for poststed. 
select navn, postnummer, poststed 
from person inner join poststed 
on person.postnummer=poststed.postnummer; 
Her må vi bruke en inner join for bare å få med personer med postnummer som ligger i poststed-
tabellen (ikke null-verdi). Likekobling uten eksplisitt bruk av join er selvsagt også greit. 
f) 
Skriv forrige SQL-spørring om til relasjonsalgebra. 
navn, postnummer, poststed (Observasjon⋈person.postnummer=poststed.postnummer Fartoy) 
Enklest å ta utgangspunkt i SQL-kode fra forrige spørring og «oversette» denne til relasjonsalgebra. 
Vi begynner med en inner join mellom Person og Poststed på 
person.postnummer=poststed.postnummer, og følger så opp med en projeksjon på navn, 
postnummer, poststed. 
g) 
Skriv en SQL-spørring som gir postnummer, poststed, og antall personer for hvert 
postnummer/poststed. 
select navn, postnummer, poststed, count(*) 
from person left outer join poststed 
on person.postnummer=poststed.postnummer 
group by postnummer, poststed; 
Kunne også brukt en inner join; ville da ikke fått telt opp observasjoner hvor postnummer har null-
merke. Men like rett det siden oppgaven ikke er spesifikk på det. 
Oppgave 3 - normalisering 
Gitt en tabell med følgende kolonner: 
Navn, kjønn, telefonnummer, poststed, adresse, årskull, fordypningskode og fordypningsnavn. 
Eksempeldata: 
Kari Nordmann, k, {45678901;98765432}, 5063, Bergen, Inndalsveien 28, 2020, DATA, 
Dataingeniør. 
Merk at to telefonnummer er listet opp, men det kan også være flere enn to. 
a) 
Ta stilling til mulige kandidatnøkler, og velg primærnøkkel (eventuelt sammensatt) ut fra 
eksisterende kolonner. Kommenter mulige «problemer» med ulike kandidatn økler.
```

## Side 6

```text
6 
 
Innledningsvis kan vi nevne at postnummer ved ett uhell ble utlatt fra listen over kolonner. Skulle 
vært: 
Navn, kjønn, telefonnummer, postnummer, poststed, adresse, årskull, fordypningskode, 
fordypningsnavn. 
Vi vil i det videre ta utgangspunkt i dette, men besvarelser som har håndtert dette på en annen 
måte vil selvsagt ikke få feil på dette. 
Vi begynner med å vurdere om noen av kolonnene aleine kan være gode kandidatnøkler: 
- Navn: det er sannsynlig at det vil kunne være flere personer med samme navn. Aleine er den 
derfor trolig ikke noen god kandidatnøkkel. 
- Kjønn: bare to alternativer. Definitivt ikke noen god kandidatnøkkel. 
- Telefonnummer: for mobiltelefoner er det nå ganske vanlig med «personlige» telefonnummer 
som ikke deles med andre. Og de «fleste» har nå mobiltelefon. Man kan allikevel innvende at 
dette ikke er «garantert». Det kan være en mulig kandidatnøkkel, men har svakheter. Siden det 
også er lagt opp til at en person kan ha flere telefonnummer, vil vi som en del av normaliseringen 
bli nødt til å legge dette ut som en egen tabell. Bruk av telefonnummer som primærnøkkel kan da 
gjøre dette noe mer komplisert. 
- Postnummer: meget sannsynlig at flere personer kan ha samme postnummer. Aleine er den 
derfor trolig ikke noen god kandidatnøkkel 
- Poststed: samme som ovenstående. 
- Adresse: godt mulig at flere personer i databasen bor på samme adresse. Aleine er den derfor 
trolig ikke noen god kandidatnøkkel 
- Årskull: lite sannsynlig at det bare er en person på ett årskull. Aleine er den derfor trolig ikke 
noen god kandidatnøkkel. 
- Fordypningskode: lite sannsynlig at det bare er en person på en fordypning. Aleine er den 
derfor trolig ikke noen god kandidatnøkkel. 
- Fordypningsnavn: samme som ovenstående. 
Vi har nå konkludert at ingen av kolonnene aleine er gode kandidatnøkler. Vi må derfor se på 
mulige sammensatte kandidatnøkler. Det er for mange kombinasjoner til å vurdere alle, så vi 
prøver derfor å resonere oss frem til mulige gode sammensatte nøkler. 
Siden dette er en tabell over personer (studenter), så virker det naturlig at navn inngår i mulige 
kandidatnøkler. Men hvilke andre kolonner kan være aktuelle? Kjønn er lite aktuelt. Vi har 
diskutert mulige problemer med telefonnummer. Postnummer, adresse, årskull og 
fordypningskode virker mest aktuelle. Strengt tatt er det vanskelig å garantere at det ikke kan 
være to personer med samme verdier for alle disse kolonnene. Men i praksis er sannsynligheten 
forsvinnende liten. Vi velger å kombinere Navn, Årskull og Fordypning som vår primærnøkkel. 
Andre kombinasjoner av disse nevnte kolonnene kan også være mulige kandidatnøkler. 
Vi får dermed følgende tabell: 
Navn, årskull. fordypningskode, kjønn, telefonnummer, postnummer, poststed, adresse, årskull, 
fordypningsnavn.
```

## Side 7

```text
7 
 
b) 
Er tabellen på 1NF? Hvorfor/hvorfor ikke? Hvis ikke, modifiser den slik at den er på 1NF. 
Tabellen er ikke på 1NF fordi kolonnen Telefonnummer ikke består av en atomær verdi. Vi må derfor 
dele den opp i en egen tabell. Det er også mulig å argumentere for at kolonnen Navn også ikke er 
atomær, siden den kan deles opp i fornavn or etternavn. Imidlertid pleier vi å regne slike tilfeller som 
atomære. 
Vi får dermed følgende tabeller: 
Navn, årskull. fordypningskode, kjønn, postnummer, poststed, adresse, årskull, fordypningsnavn. 
Navn*, årskull*, fordypningskode*, telefonnummer 
c) 
Er tabellen på 2NF? Hvorfor/hvorfor ikke? Hvis ikke, modifiser den slik at den er på 2NF. 
Svaret på dette vil avhenge av hva man valgte som primærnøkkel tidligere. Vi tar her utgangspunkt i 
det vi tidligere har valgt i løsningsforslaget, men det vil selvsagt bli rettet i henhold til det man har 
valgt. 
Tabellen er ikke på 2NF fordi kolonnen Fordypningsnavn har en partiell avhengighet fra kolonnen 
Fordypningskode. Formodentlig er også det motsatte sant, slik at det alltid svarer en forkortelse til 
ett navn, og ett navn til en forkortelse. Vi velger dermed å dele opp i egen tabell, og bruke 
forkortelsen som primærnøkkel og fremmednøkkel. 
Vi får dermed følgende tabeller: 
Navn, årskull. fordypningskode*, kjønn, postnummer, poststed, adresse, årskull. 
Navn*, årskull*, fordypningskode*, telefonnummer 
Fordypningskode, fordypningsnavn 
d) 
Er tabellen på 3NF? Hvorfor/hvorfor ikke? Hvis ikke, modifiser den slik at den er på 3NF. 
Svaret på dette vil avhenge av hva man valgte som primærnøkkel tidligere. Vi tar her utgangspunkt i 
det vi tidligere har valgt i løsningsforslaget, men det vil selvsagt bli rettet i henhold til det man har 
valgt. 
Tabellen er ikke på 3NF fordi kolonnen Poststed har en transitiv avhengighet fra kolonnen 
Postnummer. Vi velger dermed å dele opp i egen tabell, og bruke postnummer som primærnøkkel og 
fremmednøkkel. 
Vi får dermed følgende tabeller: 
Navn, årskull. fordypningskode*, kjønn, postnummer*, adresse, årskull. 
Navn*, årskull*, fordypningskode*, telefonnummer 
Fordypningskode, fordypningsnavn 
Postnummer, poststed
```

## Side 8

```text
8 
 
Oppgave 4 – modellering 
Det er behov for et nytt system for håndtering av studenter ved en høgskole. 
Det er flere campus (ulike studiesteder). Hver har et navn og en unik forkortelse. Hver har også en 
adresse, telefonnummer og epostadresse. Hver campus har flere fordypninger. Hver campus har en 
ansvarlig person. 
Hver fordypning har et navn og en unik forkortelse. Det er ikke garantert at en forkortelse er unik for 
alle campus (dvs., det er tenkelig at samme/tilsvarende fordypning finnes ved flere campus). Hver 
fordypning har en ansvarlig person. Hver fordypning har en fast sammensetting av flere fag. 
Hvert fag har et navn og en forkortelse. Hvert fag har en ansvarlig person. Samme fag kan finnes ved 
flere campus og har da samme innhold og navn/kode, men forskjellig ansvarlig person. Hvert fag kan 
ha flere studenter. Samme fag kan være del av flere fordypninger. 
Det er mange personer tilknyttet høgskolen. Dette kan f.eks. være studenter, ansatte, lærere, 
administratorer, teknikere, osv. Alle personer har navn, fødselsdato, kjønn, adresse, telefonnummer, 
epostadresser, status (aktiv/ikke aktiv), overordnet/leder, og er tilordnet en (og bare en) campus. 
Ansatte har lønn og overordnet (med unntak av rektor som er øverste leder). Studenter har årskull 
og fordypning. 
Tegn logisk datamodell (ER-diagram) for databasen. Du kan selv velge notasjon. Ta med 
primærnøkler, fremmednøkler, identifiserende/ikke-identifiserende forhold og 
minimum/maksimum-verdier for forbindelser mellom tabeller. Kommenter valgene i den grad dette 
er nødvendig for å klargjøre hvordan du tenker. 
 
Dette er en mulig løsning, og antageligvis den «greieste».  Det er også mulig å løse på andre måter, 
og disse vill være like riktige dersom de tilfredsstiller kravene i oppgaven på en fornuftig måte.
```

![Modelleringsforslag](/content/dat107/assets/originale-eksamen/2021-mai-modelleringsforslag.png)

## Side 9

```text
9 
 
Imidlertid bør ikke andre løsninger medføre en mer «komplisert» struktur uten at det er gode 
grunner til dette. Det er brukt UML-notasjon her siden det støtter subtyper bedre enn kråkefot-
notasjon. Begge disse notasjonene, samt Chen-notasjon kan bli brukt til å besvare oppgaven. 
Oppgave 5- ORM/JPA 
Vi skal jobbe litt med en fag-database med fag og personer involvert i fagene (enten 
som fagansvarlig eller som lærer). 
Vi tenker oss at data om fag er lagret i tabellen fag: 
kode 
navn 
stp 
semester ansvarlig_id 
DAT100 
'Grunnleggende programmering' 
10 
'H' 
1 
DAT107 
‘Databaser’ 
10 
'V' 
2 
... 
… 
… 
… 
… 
 
Vi tenker oss at data om personer er lagret i tabellen person: 
id 
fornavn 
etternavn 
fodselsdato 
1 
‘Atle’ 
‘Patle’ 
‘1970-12-20’ 
2 
‘Per’ 
‘Viskeler’ 
‘1974-10-28’ 
… 
 
 
 
 
id-attributten for person er en automatisk generert primærnøkkel. 
I tillegg til koblingen dere ser over mellom fag og person (via fremmednøkkelen 
ansvarlig_id), inneholder også databasen en oversikt over hvilke personer som er 
lærer(e) i hvilke fag (ikke vist her). Dette kommer vi tilbake til senere. 
Vi ønsker å jobbe med denne databasen i et Java-program. 
Skriv Java-klassene for entitetstypene Fag og Person som svarer til 
databasetabellene vist over. Du trenger ikke å skrive metoder, kun instansvariabler 
og JPA-annoteringer. Vi ønsker toveis forbindelse mellom entitetene for enklere 
navigasjon fra Java.  
 
Løsningsforslag a) og d) med blå 
Poenggiving er antydet. 10 poeng totalt på a)+d) er maks og tilsvarer 100% score. 
 
@Entity 0,5p 
public class Fag { 
 
 
    @Id 0,5p 
    private String kode; 
     
    private String navn; 
    private int stp; 
    private String semester; 
     
    @ManyToOne 1p 
    @JoinColumn(name = "ansvarlig_id", referencedColumnName = "id") 
    private Person ansvarlig; 0,5p
```

## Side 10

```text
10 
 
    @ManyToMany 1p (NB! Denne er symmetrisk og kan også settes opp andre veien) 
    @JoinTable( 
            name = "undervisning", 
            joinColumns = @JoinColumn(name="fag_kode"), 0,5p 
            inverseJoinColumns = @JoinColumn(name="laerer_id")) 0,5p 
    private List<Person> laerere; 1p 
 
} 
 
@Entity 
public class Person { 
 
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 0,5p 
    private int id; 
     
    private String fornavn; 
    private String etternavn; 
    private LocalDate fodselsdato; 0,5p 
     
    @OneToMany(mappedBy="ansvarlig") 0,5p 
    private List<Fag> fagMedAnsvarFor; 1p 
 
 
    @ManyToMany(mappedBy="laerere") 1p 
    private List<Fag> fagUnderviser; 1p 
     
}
```

## Side 11

```text
11 
 
 
En del besvarelser hadde brukt en alternativ løsning på d) med koblingsklasse og to 
en-til-mange-forhold i stedet for ett mange-til-mange-forhold. 
 
Denne løsningen gir ikke full score, da den er unødig komplisert: 
   # Det må lages en egen klasse i Java for koblingstabellen Undervisning 
   # Det må enten lages en primærnøkkelklasse eller en surragatnøkkel for denne 
   # Kode for navigering fra Fag og Person blir mer kronglete, f.eks. getLaerere() 
 
 
@Entity 
public class Undervisning { 
 
 
@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY) 
private int undervisning_id; 
 
@ManyToOne 
@JoinColumn(name = "laerer_id", referencedColumnName = "id") 
private Person laerer; 
 
@ManyToOne 
@JoinColumn(name = "fag_kode", referencedColumnName = "kode") 
private Fag fag; 
} 
 
public class Fag { 
 
... 
 
@OneToMany(mappedBy="fag") 
private List<Undervisning> undervisning; 
 
//Eksempel på noe vi slipper med @ManyToMany, men må gjøre her 
public List<Person> getLaerere() { 
 
List<Person> laerere = new ArrayList<>(); 
 
for (Undervisning u : undervisning) { 
 
 
laerere.add(u.getLearer()); 
 
} 
 
return laerere; 
} 
} 
 
public class Person { 
 
 
... 
 
@OneToMany(mappedBy="laerer") 
private List<Undervisning> undervisning; 
} 
 
PS! Denne alternative løsningen er ikke kvalitetssjekket ved kjøring, men kun 
skrevet inn som tekst i Word. Jeg tar forbehold om feil/bugs!
```

## Side 12

```text
12 
 
a) Vi ønsker å kunne lagre et nytt fag i databasen. Brukeren av programmet gir inn 
faget sin kode, navn, studiepoeng (stp), semester, og fagansvarlig sin id (den siste 
f.eks. via valg fra nedtrekksliste). 
 
Vi antar at vi har en hjelpeklasse FagDAO. Her skal du lage en metode som tar inn 
fagdataene nevnt over som parametre, og som (ved hjelp av JPA) får lagret et nytt 
fag med disse dataene i databasen. 
 
Det finnes noen feilsituasjoner vi kan ta høyde for i FagDAO-et. Du får ekstrapoeng 
om du også løser disse: 
• Hvis det ikke finnes en person i databasen med id-en brukeren har gitt (til 
tross for at den er valgt fra en nedtrekksliste), bør vi returnere uten å gjøre 
noe. 
• Hvis et fag med gitt kode allerede finnes i databasen, oppdaterer vi dette 
faget med de dataene brukeren har gitt i stedet for å opprette et nytt fag. 
Løsningsforslag b): 
 
public class FagDAO { 
  public void lagreNyttFag(String kode, String navn, int stp,  
 
 
 
String semester, int ansvarligId) { 1p 
 
 
EntityManager em = emf.createEntityManager(); 
 
EntityTransaction tx = em.getTransaction(); 
 
 
try { 
 
 
tx.begin(); 1p 
 
 
 
Person fagansvarlig = em.find(Person.class, ansvarligId); 1p 
 
 
 
 
 
if (fagansvarlig == null) { 
 
 
 
//Returnere uten å gjøre noe 1p 
 
 
} else { 
 
 
 
Fag nyttFag  
                          = new Fag(kode, navn, stp, semester, fagansvarlig); 1p 
 
 
 
fagansvarlig.leggTilFagansvarFor(nyttFag); 1p 
 
 
 
 
if (em.find(Fag.class, kode) == null) { 
 
 
 
 
//Opprette nytt fag med nye data 
 
 
 
 
em.persist(nyttFag); 1p 
 
 
 
} else { 
 
 
 
 
//Oppdatere eksisterende fag med nye data 
 
 
 
 
em.merge(nyttFag); 1p - Ser her bort fra oppg c) og d) 
 
 
 
} 
 
 
} 
 
 
tx.commit(); 1p 
 
 
 
 
 
 
} catch (Throwable e) { 
 
 
e.printStackTrace(); 
 
 
if (tx.isActive()) { 
 
 
 
tx.rollback(); 
 
 
} 
 
} finally { 
 
 
em.close(); 1p 
 
} 
  } 
}
```

## Side 13

```text
13 
 
b) Nå tilbake til dette med lærere i fag. Et fag kan ha flere lærere, og en lærer kan 
undervise i flere fag. 
 
For å kunne lagre data om dette må databasen utvides litt. Foreslå hvilke utvidelser 
vi må gjøre i forhold til tabellene som er vist i starten av oppgaven. Vær konkret / 
nøyaktig når du svarer. 
 
Løsningsforslag c): 
 
Merknad: Noen student-besvarelser foreslår også å lage en ny tabell for lærer som 
en spesialisering av person. Det er ikke antydet i oppgaveteksten at en lærer har 
data ut over det som finnes i person-tabellen, og dette var ikke tenkt at skulle 
gjøres.  
Det at personen er lærer er tenkt mer som en rolle på linje med fagansvarlig, og på 
samme måte som at en ansatt kan være en prosjektdeltager (uten at vi lager en egen 
tabell for prosjektdeltager av den grunn). 
 
 
Det sentrale i c) er at man har et mange-til-mange-forhold og det må brukes en 
koblingstabell. 
 
-- Koblingstabell 
CREATE TABLE undervisning 
( 
  fag_kode CHAR(6), 
  laerer_id INTEGER, 
  CONSTRAINT undervisning_pk PRIMARY KEY (fag_kode, laerer_id), 
  CONSTRAINT laerer_fk FOREIGN KEY (laerer_id) REFERENCES Person(id), 
  CONSTRAINT fag_fk FOREIGN KEY (fag_kode) REFERENCES Fag(kode)   
); 
 
Her er et eksempel på et studentsvar som gir full score: 
 
"Dette er nå mange til mange forhold mellom fag og person og da må vi utvide 
databasen med en ekstra koblingstabell, feks lærer_i_fag(kode, ansattid) 
der kode er en fremmednøkkel som peker på kode i fag, og ansattid er en 
fremmednøkkel som peker på id i person." 
 
Merknad: Mange studenter har ikke svart på denne oppgaven! Hmm? 
 
 
 
c) Utvid JPA-løsningen tilsvarende, altså at den inneholder at personer underviser i 
fag. (Du kan skrive svaret sammen med det du skreiv i a) slik at a)+d) er samlet.) 
 
Løsningsforslag d): 
Se a) 
 
Oppgave 6 
Bruk "k-means"-algoritme til å finne 3 kluster-sentre (k er satt som 3). Vær oppmerksom på 
at du må oppgi detaljerte steg for utregningene for å få full poengsum.
```

## Side 14

```text
14 
 
 
 
Solutions 
3: excellent answers with steps 
2.5: good answer (one wrong solution, not output the final results but equation and steps are ok) 
2: fair solutions (2 wrong solutions but others seem all right) 
1.5: descent solutions (showed 3 circles for the clusters but totally wrong solutions) 
1:  Something correct but no iterations
```

![K-means-figur 1](/content/dat107/assets/originale-eksamen/2021-mai-k-means-figur-1.png)

![K-means-figur 2](/content/dat107/assets/originale-eksamen/2021-mai-k-means-figur-2.png)

## Side 15

```text
15 
 
0: no answers 
Steps for calculation 
7: excellent answers (detailed steps, don’t need to make all detailed progress but the idea is ok with 
three important components) 
- 
Euclidean equation 
- 
Iteration  
- 
Update center 
6: good answer but something wrong (detailed steps but wrong equations/-1 component)  
5: descent (steps are correct/-2 components) 
4: some correct elements (some details/-3 components) 
2-3: something relevant to the calculation (no equations) 
1: some descriptions 
0: no answers  
Oppgave 7 
a) 
Ta utgangspunkt i oppgave 2 (SQL). Skriv en "rad" fra hver av tabellene som XML. 
<?xml version=«1.0» encoding=«utf-8» ?> 
<data> 
  <personer> 
    <person id=«0» navn=«Kari Nordmann» postnummer=«5063» adresse=«Inndalsveien 28» 
telefonnummer=«55667788»/> 
  </personer> 
  <poststeder> 
    <poststed nr=«5063» sted=«Bergen» /> 
  </poststeder> 
</data> 
Skal være <?xml … ?> prolog som første linje. Bare ett rot-element tillatt (f.eks. <data>). Når det er 
flere personer, bør disse ligge en liste med <personer>. Samme for poststeder. Man kunne også 
brukt tagger istedenfor elementer flere steder. Kunne også hatt postnummer/sted som sammensatt 
attributt på person. 
b) 
Ta utgangspunkt i oppgave 2 (SQL). Skriv en "rad" fra hver av tabellene som JSON. 
{ 
  «personer»: 
  [ 
    { 
      «person»: 
      { 
        «id»: 0, 
        «navn»: «Kari Nordmann», 
        «postnummer»: «5063»,
```

## Side 16

```text
16 
 
        «adresse»: «Inndalsveien 28», 
        «telefonnummer»: «55667788» 
      } 
    } 
  ] 
  «poststeder»: 
  [ 
    «poststed»: 
    { 
      «nr»: «5063», 
      «sted»: «Bergen» 
    } 
  ] 
} 
Skal være lister av personer og poststeder. Poststed kunne vært sammensatt verdi under 
person. 
c) 
Redegjør for egenskaper ved relasjonsdatabaser vs. nøkkel/verdidatabaser vs. 
dokumentdatabaser vs. grafdatabaser, og gi eksempler på oppgaver hvor hver av disse kan 
være ett hensiktsmessig valg. 
En fullstendig sammenligning av egenskaper ved disse ulike typene databaser er selvsagt for 
omfattende til å ta i detalj på ett slikt spørsmål. Men noe kortfattet kan man si at 
relasjonsdatabaser egner seg spesielt godt for velstrukturerte data. Dataenes struktur er kjent på 
forhånd, og endrer seg ikke veldig ofte. Eksempler på dette kan være systemer for booking av 
billetter, håndtering av karakterinformasjon og kjøp av varer. Entitetene har veldefinerte forhold til 
hverandre, og vi vet stort sett hvilken informasjon vi har behov for å lagre og hente ut. 
Nøkkel/verdidatabaser er i praksis et assosiativt oppslag på nøkkelverdier. Det kan være noe 
utfordrende å lagre data med komplekse strukturer i en slik database. Derimot er de veldig 
velegnet når man har mulighet for å bruke «enkle» oppslagsnøkler, f.eks. kunde:1:navn, og man 
trenger å håndtere verdier for dette. 
Dokumentdatabaser er det man kaller semistrukturerte databaser. Mer strukturerte enn 
nøkkel/verdidatabaser, men mindre enn relasjonsdatabaser. Dokumentdatabaser bruker ikke 
skjema for å definere en struktur slik som en relasjonsdatabase; strukturen blir definert ut fra 
dokumentene i seg selv. Ofte brukes JSON-formatet til å legge data inn i og hente data ut fra 
dokumentdatabaser. Strukturen i en dokumentbatabase kan fortløpende utvides på samme måte 
som ett JSON-dokument. Dokumentdatabaser er generelt enklere å distribuere og parallellisere 
enn relasjonsdatabaser, men for en del oppgaver kan ytelsen bli lavere. Egner seg godt f.eks. til 
å lagre logg fra chat og lignende. 
Oppgaven har ikke klare krav for hvilke momenter som må være med, men søker å se om man 
viser forståelse for når ulike typer databaser kan være hensiktsmessig.
```
