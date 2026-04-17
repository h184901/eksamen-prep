# Arv Og Subtyper

## Kjernen

Den siste JPA-delen i kurset handler både om håndtering av objektgraf med barnelister og om arvstrategier i databasen.

## Dette må du kunne

- forklare `cascade` og `orphanRemoval`
- forklare hvorfor helper-metoder holder begge sider i synk
- sammenligne `JOINED`, `SINGLE_TABLE` og `TABLE_PER_CLASS`
- forklare hva diskriminatorkolonne brukes til

## Viktig todoliste-mønster

```java
public void leggTil(Todo todo) {
    todos.add(todo);
    todo.setListe(this);
}

public void fjern(Todo todo) {
    todos.remove(todo);
    todo.setListe(null);
}
```

Dette er et mønster du bør kjenne igjen med én gang.

## Viktig arvseksempel

```java
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "persontype")
```

## Vanlige feil

- kunne annotasjonene uten å forstå databasekonsekvensen
- glemme at `SINGLE_TABLE` ofte gir mange `null`-kolonner
- undervurdere hvorfor helper-metoder er nyttige i praksis

## Typiske eksamensoppgaver

- forklar forskjellen på arvstrategiene
- skriv overtype og undertype med relevante annotasjoner
- forklar hva `orphanRemoval` gjør

## Hva du bør øve på

- gi en kort trade-off-forklaring på hver arvstrategi
- forklare når `cascade` hjelper og når det må brukes med omtanke
