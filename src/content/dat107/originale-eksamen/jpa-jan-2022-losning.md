# Løsningsforslag

## Oppgave n (20%~48 minutter) – ORM/JPA

Vi skal jobbe litt med en geografi-database med oversikt over land og byer.

### Tabell `land`

| navn (PK) | areal_km2 | folketall | hovedstad (FK) |
| --- | ---: | ---: | --- |
| `Norge` | 385207 | 5391000 | `Oslo` |

### Tabell `by`

| navn (PK) | grunnlagt_aar | folketall | land (FK) |
| --- | ---: | ---: | --- |
| `Bergen` | 1070 | 284000 | `Norge` |
| `Oslo` | 1048 | 693000 | `Norge` |

Vi ønsker å jobbe med denne databasen i et Java-program.

### a)

Skriv Java-klassene `Land` og `By` med toveis forbindelse.

```java
@Entity
public class Land {
    @Id private String navn;
    private int areal_km2;
    private int folketall;

    @OneToOne
    @JoinColumn(name = "hovedstad")
    private By hovedstad;

    @OneToMany(mappedBy = "land")
    List<By> byer;
}

@Entity
public class By {
    @Id private String navn;
    private int grunnlagt_aar;
    private int folketall;

    @ManyToOne
    @JoinColumn(name = "land")
    private Land land;
}
```

### b)

Metode i `GeografiDAO` som finner land med gitt navn:

```java
public Land finnLandMedNavn(String navn) {
    EntityManager em = emf.createEntityManager();
    Land land = null;
    try {
        land = em.find(Land.class, navn);
    } finally {
        em.close();
    }
    return land;
}
```

### c)

`main`-metode som skriver ut info om hovedstaden i Norge:

```java
public static void main(String[] args) {
    GeografiDAO fagDAO = new GeografiDAO();
    Land norge = fagDAO.finnLandMedNavn("Norge");
    By hovedstad = norge.getHovedstad();
    System.out.println(hovedstad);

    System.out.println(fagDAO.finnLandMedNavn("Norge").getHovedstad());
}
```

### d)

Metode som oppdaterer folketallet i en gitt by:

```java
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

> Merk: Oppgavenummeret er OCR-lest som `n`, og kan være uklart i originalen.
