# CRUD Og EntityManager

## Kjernen

CRUD i JPA handler om `persist`, `find`, `merge` og `remove`, men det viktigste er å forstå entitetens livssyklus.

## Dette må du kunne

- forklare tilstandene transient, managed, detached og removed
- bruke transaksjon rundt `persist`, `merge` og `remove`
- vite når `find` er nok og når JPQL trengs
- håndtere tomt resultat for `getSingleResult()`

## Viktige mønstre

```java
tx.begin();
em.persist(p);
tx.commit();
```

```java
Person p = em.find(Person.class, id);
```

```java
tx.begin();
em.merge(p);
tx.commit();
```

```java
tx.begin();
Person p = em.find(Person.class, id);
em.remove(p);
tx.commit();
```

## JPQL

JPQL skrives mot entiteter og felt, ikke direkte mot tabell- og kolonnenavn.

## Vanlige feil

- bruke `remove` på detached objekt
- glemme transaksjon rundt oppdatering og sletting
- bruke SQL-navn inne i JPQL
- ikke håndtere `NoResultException` når oppgaven krever `null` eller tom liste

## Typiske eksamensoppgaver

- skriv en DAO-metode som henter én entitet på primærnøkkel
- skriv en JPQL-spørring som returnerer liste
- forklar forskjellen på managed og detached

## Hva du bør øve på

- skrive én CRUD-metode per operasjon
- forklare når `merge` er naturlig
- forklare hvorfor `find` er bedre enn JPQL når du allerede har PK
