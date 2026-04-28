# Arv og subtyper

## Kjernen

Den siste JPA-delen handler både om håndtering av objektgrafer med barnelister og om arvstrategier. Java har arv direkte. Relasjonsdatabaser har ikke arv som direkte begrep, så arven må representeres med tabeller.

## Dette må du kunne

- forklare `cascade` og `orphanRemoval`
- forklare hvorfor hjelpemetoder holder begge sider i synk
- bruke `@OrderBy` eller JPQL-sortering
- sammenligne `JOINED`, `SINGLE_TABLE` og `TABLE_PER_CLASS`
- forklare hva diskriminatorkolonne brukes til

## Cascade og orphan removal

Eksempel fra todoliste:

```java
@OneToMany(
    mappedBy = "liste",
    fetch = FetchType.EAGER,
    cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    },
    orphanRemoval = true)
private List<Todo> todos;
```

| Del | Betydning |
| --- | --- |
| `mappedBy = "liste"` | `Todo.liste` eier koblingen. |
| `CascadeType.PERSIST` | `persist()` på todolisten forplantes til todos. |
| `CascadeType.MERGE` | `merge()` på todolisten forplantes til todos. |
| `orphanRemoval = true` | Barn som fjernes fra listen og ikke lenger har forelder, slettes. |

Cascade brukes når operasjoner på forelder naturlig skal gjelde barna. Det skal ikke brukes ukritisk på alle relasjoner.

## Toveisforbindelsen må oppdateres i Java

JPA oppdaterer ikke automatisk begge sider av objektmodellen. Bruk hjelpemetoder:

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

Dette holder både listen i `Todoliste` og referansen i `Todo` konsistente.

## Sortering

Sortering ved relasjonshenting kan gjøres med `@OrderBy`:

```java
@OrderBy("tekst ASC")
private List<Todo> todos;
```

Ved JPQL-spørring sorteres eksplisitt:

```java
String jpql = """
    select t from Todo t
    where t.liste.id = :listeid
    order by t.tekst asc
    """;
```

## Arvstrategi A: `JOINED`

![JOINED arvstrategi](/content/dat107/assets/jpa/arv-joined.png)

`JOINED` bruker tabell for supertype og tabeller for subtyper.

```java
@Inheritance(strategy = InheritanceType.JOINED)
```

Fordeler:

- normalisert og ryddig representasjon
- felles felter ligger i supertypetabellen
- subtypespesifikke felter ligger i subtypetabeller

Ulempe:

- spørringer må ofte bruke `JOIN`

Dette er ofte den faglig ryddigste strategien.

## Arvstrategi B: `SINGLE_TABLE`

![SINGLE_TABLE arvstrategi](/content/dat107/assets/jpa/arv-single-table.png)

`SINGLE_TABLE` legger hele hierarkiet i én tabell.

```java
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "persontype")
```

Fordeler:

- én tabell
- enkle spørringer uten join mellom subtype-tabeller

Ulemper:

- mange `NULL`-verdier for felter som bare gjelder noen subtyper
- svakere `NOT NULL`-constraints for subtypespesifikke felter
- trenger ofte diskriminatorkolonne, for eksempel `persontype`

## Arvstrategi C: `TABLE_PER_CLASS`

![TABLE_PER_CLASS arvstrategi](/content/dat107/assets/jpa/arv-table-per-class.png)

`TABLE_PER_CLASS` bruker tabell per konkret klasse.

```java
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
```

Ulemper fra forelesningen:

- ikke anbefalt
- kan gi dårlig ytelse
- vanskeligere å referere til alle subtyper med én felles nøkkel
- ikke like godt støttet av alle JPA-providere

## Sammenligning

| Strategi | Kort forklart | Typisk vurdering |
| --- | --- | --- |
| `JOINED` | Supertype + subtypetabeller | Ryddig og normalisert, men krever joins |
| `SINGLE_TABLE` | Hele hierarkiet i én tabell | Enkelt og raskt, men mange nullfelter |
| `TABLE_PER_CLASS` | Én tabell per konkret klasse | Ofte minst anbefalt |

## Vanlige feil

- kunne annotasjonene uten å forstå databasekonsekvensen
- glemme at `SINGLE_TABLE` ofte gir mange `NULL`-kolonner
- skrive `cascade = ALL` uten å begrunne hvorfor alle operasjoner skal forplantes
- undervurdere hvorfor hjelpemetoder er nyttige i praksis

## Typiske eksamensoppgaver

- forklar forskjellen på arvstrategiene
- skriv overtype og undertype med relevante annotasjoner
- forklar hva `orphanRemoval` gjør
- forklar hvorfor Java-arv må modelleres indirekte i databasen

## Hva du bør øve på

- gi en kort trade-off-forklaring på hver arvstrategi
- forklare når `cascade` hjelper og når det må brukes med omtanke
- skrive hjelpemetoder for en toveis 1:N-relasjon
