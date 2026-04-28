# Kortversjon og sjekkliste

## Begreper du må kunne forklare

- ORM: mapping mellom objekter og relasjonstabeller
- JPA: Jakarta Persistence API, en spesifikasjon
- EclipseLink: JPA-provider/implementasjon
- JDBC-driver: lavnivå databasekobling
- persistence unit: navngitt konfigurasjon i `persistence.xml`
- persistence context: entitetene en `EntityManager` håndterer

## Annotasjoner du må kunne

| Annotasjon | Bruk |
| --- | --- |
| `@Entity` | Klassen er persistent. |
| `@Table` | Angir tabell/schema når standardnavn ikke er nok. |
| `@Id` | Primærnøkkel. |
| `@GeneratedValue` | Databasen eller JPA genererer nøkkelverdi. |
| `@ManyToOne` | Mange forekomster peker til én. Ofte owning side. |
| `@OneToMany` | Én forekomst har mange. Ofte reverse side med `mappedBy`. |
| `@OneToOne` | Én-til-én-relasjon. |
| `@ManyToMany` | Ren M:N uten egne attributter. |
| `@JoinColumn` | Fremmednøkkelkolonnen på owning side. |
| `@Inheritance` | Arvstrategi for klassehierarki. |
| `@DiscriminatorColumn` | Typekolonne ved for eksempel `SINGLE_TABLE`. |

## Fire livssyklustilstander

| Tilstand | Betydning |
| --- | --- |
| transient | Nytt Java-objekt, ikke persistent. |
| managed | Knyttet til aktiv persistence context. |
| detached | Har databaseidentitet, men er ikke managed nå. |
| removed | Markert for sletting. |

## CRUD-hurtigsjekk

| Operasjon | Mønster |
| --- | --- |
| Create | `tx.begin(); em.persist(obj); tx.commit();` |
| Read med PK | `em.find(Klasse.class, id)` |
| Read med søk | JPQL med `TypedQuery` |
| Update detached | `tx.begin(); em.merge(obj); tx.commit();` |
| Delete | Finn managed objekt, så `em.remove(obj)` |

Endringer krever transaksjon. Lesing med `find()` gjør normalt ikke det i disse enkle kursmønstrene.

## Hurtigsjekk for relasjoner

- Hvilken tabell har fremmednøkkelen?
- Hvilken Java-side er owning side?
- Trengs `mappedBy` på reverse side?
- Må begge sider oppdateres i Java?
- Er relasjonen ren M:N, eller har koblingen egne attributter?
- Bør M:N bli koblingsentitet?

## Nøkler og datatyper

- Naturlig nøkkel har domenebetydning.
- Surrogatnøkkel er kunstig id, ofte `serial`/identity.
- `GenerationType.IDENTITY` passer når databasen genererer nøkkelverdien.
- Bruk `LocalDate` for `DATE`, `LocalTime` for `TIME`, `LocalDateTime` for `TIMESTAMP`.
- Bruk `BigDecimal` for `NUMERIC`/`DECIMAL` når nøyaktighet betyr noe.

## Arvstrategier

| Strategi | Husk |
| --- | --- |
| `JOINED` | Ryddig og normalisert, men krever joins. |
| `SINGLE_TABLE` | Én tabell, ofte diskriminator og mange `NULL`-felter. |
| `TABLE_PER_CLASS` | Ofte minst anbefalt. |

## Vanlige eksamensfeller

- feil owning side
- `remove()` på detached objekt
- `@ManyToMany` brukt når forholdet har egne attributter
- JPA-navn og SQL-navn blandes i JPQL
- glemme at toveis relasjoner må holdes konsistente i Java
- bruke cascade uten å forklare hvorfor operasjonen skal forplantes

## Siste repetisjon

Før eksamen bør du kunne forklare denne kjeden uten notater:

```text
tabell -> entitetsklasse -> persistence.xml -> EntityManager -> CRUD -> relasjon -> databasekonsekvens
```
