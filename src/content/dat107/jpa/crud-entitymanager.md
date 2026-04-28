# CRUD og EntityManager

## Kjernen

CRUD i JPA handler om `persist`, `find`, `merge` og `remove`, men det viktigste er å forstå entitetens livssyklus og når et objekt er knyttet til en aktiv persistence context.

![JPA entity lifecycle](/content/dat107/assets/jpa/entity-lifecycle.png)

## Dette må du kunne

- forklare tilstandene transient, managed, detached og removed
- bruke transaksjon rundt `persist`, `merge` og `remove`
- vite når `find()` er nok og når JPQL trengs
- forklare forskjellen på å oppdatere managed objekt og detached objekt
- håndtere tomt resultat for `getSingleResult()` når oppgaven krever det

## EntityManager og persistence context

En `EntityManager` er knyttet til en persistence context. Innenfor samme context finnes det én unik entitetsinstans for en gitt persistent identitet.

| Tilstand | Forklaring |
| --- | --- |
| New / transient | Objektet er opprettet i Java, men ikke lagret i databasen. |
| Managed | Objektet er koblet til en aktiv persistence context. Endringer kan synkes til databasen. |
| Detached | Objektet finnes i Java, men `EntityManager` er lukket eller objektet er koblet fra. |
| Removed | Entiteten er markert for sletting. |

I enkle DAT107-eksempler opprettes ofte en `EntityManager` per DAO-operasjon. Da blir objektene ofte detached etter at metoden er ferdig.

## CRUD-mønstrene

Create:

```java
EntityTransaction tx = em.getTransaction();
tx.begin();
em.persist(person);
tx.commit();
```

Read med primærnøkkel:

```java
Person person = em.find(Person.class, id);
```

Read med JPQL:

```java
String jpql = "select p from Person p where p.navn = :navn";
TypedQuery<Person> query = em.createQuery(jpql, Person.class);
query.setParameter("navn", navn);
List<Person> personer = query.getResultList();
```

Update av detached entitet:

```java
tx.begin();
em.merge(detachedPerson);
tx.commit();
```

Update av managed entitet:

```java
tx.begin();
Person managedPerson = em.find(Person.class, id);
managedPerson.setNavn(nyttNavn);
tx.commit();
```

Delete:

```java
tx.begin();
Person managedPerson = em.find(Person.class, id);
em.remove(managedPerson);
tx.commit();
```

`remove()` krever en managed entitet. Hvis du bare har et detached objekt, må du først finne eller merge objektet.

## `persist()` vs `merge()`

| Metode | Bruk |
| --- | --- |
| `persist()` | Ny entitet som ikke finnes i databasen. |
| `merge()` | Kopiere tilstand fra detached entitet inn i en managed entitet. |
| `find()` | Hente én entitet med primærnøkkel. |
| `remove()` | Slette managed entitet. |

`merge()` returnerer en managed instans. Det detached objektet du sendte inn blir ikke automatisk managed.

## JPQL

JPQL spør mot entiteter og felter:

```java
select p from Person p
```

Ikke skriv JPQL som om det var SQL:

```sql
select * from person
```

Det første spør mot klassen `Person`. Det andre er SQL mot tabellen `person`.

## Vanlige feil

- bruke `remove()` på detached objekt
- glemme transaksjon rundt `persist`, `merge` og `remove`
- bruke SQL-navn inne i JPQL
- tro at endringer på detached objekter automatisk lagres
- ikke håndtere `NoResultException` når `getSingleResult()` brukes

## Typiske eksamensoppgaver

- skriv en DAO-metode som henter én entitet på primærnøkkel
- skriv en metode som oppdaterer et felt på en entitet
- forklar forskjellen på managed og detached
- forklar hvorfor `remove()` må få en managed entitet

## Hva du bør øve på

- skrive én DAO-metode per CRUD-operasjon
- forklare når `merge()` er naturlig
- forklare hvorfor `find()` er bedre enn JPQL når du allerede har primærnøkkel
