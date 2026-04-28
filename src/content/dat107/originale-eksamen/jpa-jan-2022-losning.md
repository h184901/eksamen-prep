# DAT107 JPA januar 2022 - løsning

Kildetro sideutdrag fra original PDF. Oppgaverekkefølge, delspørsmål og løsningsforslag er bevart som originaltekst der uttrekket har tekst. Utvalgte figurer er lagt inn etter siden de hører til.

## Side 1

```text
side 1 
 
Løsningsforslag 
Oppgave n (20%~48 minutter) – ORM/JPA 
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
```

## Side 2

```text
side 2 
 
Vi ønsker å jobbe med denne databasen i et Java-program. 
a) (10% ~ 24 min) Skriv Java-klassene for entitetstypene Land og By som tilsvarer 
databasetabellene vist over. Du trenger ikke å skrive metoder, kun instans-
/objektvariabler og JPA-annoteringer. Vi ønsker toveis forbindelse mellom 
entitetene for enklere å kunne liste opp byer i et gitt land.  
 
Løsningsforslag: 
 
@Entity 
public class Land { 
 
 
    @Id private String navn; 
    private int areal_km2; 
    private int folketall; 
     
1    @OneToOne 
1    @JoinColumn(name = "hovedstad") 
1    private By hovedstad; 
     
1    @OneToMany(mappedBy="land") 
1    List<By> byer; 
 
    ... 
} 
 
1 @Entity 
public class By { 
 
1    @Id private String navn; 
    private int grunnlagt_aar; 
    private int folketall; 
     
1    @ManyToOne 
1    @JoinColumn(name = "land") 
1    private Land land; 
 
    ... 
}
```

## Side 3

```text
side 3 
 
Vi antar at vi har en hjelpeklasse GeografiDAO. Du skal lage et par metoder i denne. 
Du kan anta at det er opprettet og at du har tilgang til en EntityManagerFactory kalt 
emf. 
 
b) (3,3% ~ 8 min) Skriv en metode i GeografiDAO som henter ut et land med et gitt 
navn fra databasen. 
Løsningsforslag: 
 
2 public Land finnLandMedNavn(String navn) { 
 
2 
EntityManager em = emf.createEntityManager(); 
 
 
Land land = null; 
 
try { 
2 
 
land = em.find(Land.class, navn); 
 
} finally { 
2 
 
em.close(); 
 
} 
2 
return land; 
} 
 
 
 
c) (3,3% ~ 8 min) Skriv en main-metode som bruker metoden du laget i b) til å få 
skrevet ut info om hovedstaden i Norge. Du kan anta at Land og By har get-, og 
toString-metoder du kan bruke. 
Løsningsforslag: 
 
Løsningen forutsetter at Land inneholder en korrekt kobling slik: 
    @OneToOne 
    @JoinColumn(name = "hovedstad") 
    private By hovedstad; 
 
public static void main(String[] args) { 
 
    GeografiDAO fagDAO = new GeografiDAO(); 
 
    Land norge = fagDAO.finnLandMedNavn("Norge"); 
    By hovedstad = norge.getHovedstad(); 
    System.out.println(hovedstad); 
 
    //De tre siste setningene kan også skrives som én setning slik: 
    System.out.println(fagDAO.finnLandMedNavn("Norge").getHovedstad()); 
}
```

## Side 4

```text
side 4 
 
d) (3,3% ~ 8 min) Skriv en metode i GeografiDAO som oppdaterer folketallet i en gitt 
by. Parametere til metoden skal være navn på byen og nytt folketall. Hvis ingen by 
med det gitte navnet finnes, skal metoden ikke gjøre noe. 
Løsningsforslag: 
 
public void oppdaterFolketallIBy(String navn, int nyttFolketall) { 
 
 
EntityManager em = emf.createEntityManager(); 
 
EntityTransaction tx = em.getTransaction(); 
 
 
try { 
 
 
tx.begin(); 
 
 
 
 
 
By by = em.find(By.class, navn); 
 
 
if (by != null) { 
 
 
 
by.setFolketall(nyttFolketall); 
 
 
} 
 
 
 
 
 
tx.commit(); 
 
} catch (Throwable e) { 
 
 
e.printStackTrace(); 
 
 
if (tx.isActive()) { 
 
 
 
tx.rollback(); 
 
 
} 
 
} finally { 
 
 
em.close(); 
 
} 
}
```
