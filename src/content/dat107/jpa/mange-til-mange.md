# Mange-til-mange og nøkler

## Kjernen

Mange-til-mange er ofte enkelt i teorien, men eksamensoppgavene blir fort vanskelige når relasjonen har egne attributter. Hovedregelen er: hvis koblingen har egne data, bør koblingen bli en egen entitet.

## Dette må du kunne

- forklare hvorfor relasjonsdatabaser bruker koblingstabell for M:N
- forklare når ren `@ManyToMany` er nok
- forklare når relasjonen må bli egen entitet
- sammenligne sammensatt nøkkel og kunstig nøkkel
- modellere relasjonsfelt som rolle og timer riktig
- holde objektmodellen konsistent på begge sider

## N:M i relasjonsdatabaser

Relasjonsdatabaser representerer ikke mange-til-mange direkte. Man bruker en koblingstabell mellom de to entitetstabellene.

Eksempel: `Ansatt` og `Prosjekt`.

- Én ansatt kan delta i mange prosjekter.
- Ett prosjekt kan ha mange ansatte.
- Koblingstabellen kan hete `Prosjektdeltagelse`.

## Variant 1: ren kobling uten attributter

![Mange-til-mange uten attributter](/content/dat107/assets/jpa/mn-uten-attributter.png)

Hvis vi bare trenger å vite at en ansatt deltar i et prosjekt, kan `@ManyToMany` være akseptabelt.

```java
@ManyToMany
@JoinTable(
    name = "prosjektdeltagelse",
    joinColumns = @JoinColumn(name = "ansatt_id"),
    inverseJoinColumns = @JoinColumn(name = "prosjekt_id"))
private List<Prosjekt> prosjekter;
```

Dette er minst kode, men har en viktig begrensning: relasjonen har ikke et eget sted å lagre data som `rolle`, `timer` eller `startdato`.

## Variant 2: koblingen har egne attributter

![Mange-til-mange med attributter](/content/dat107/assets/jpa/mn-med-attributter.png)

Hvis forholdet har egne data, er ikke forholdet bare en kobling lenger. Da bør `Prosjektdeltagelse` bli en egen entitet.

Modellen blir to en-til-mange-forhold:

- `Ansatt` 1:N `Prosjektdeltagelse`
- `Prosjekt` 1:N `Prosjektdeltagelse`

```java
@Entity
public class Prosjektdeltagelse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ansatt_id")
    private Ansatt ansatt;

    @ManyToOne
    @JoinColumn(name = "prosjekt_id")
    private Prosjekt prosjekt;

    private int timer;
    private String rolle;
}
```

## Sammensatt nøkkel

Med sammensatt primærnøkkel bruker man for eksempel kombinasjonen ansatt-id og prosjekt-id som primærnøkkel.

```text
Prosjektdeltagelse(ansatt_id, prosjekt_id, timer, rolle)
PK = (ansatt_id, prosjekt_id)
```

Fordel: datamodellen uttrykker at én ansatt bare kan ha én deltagelsesrad per prosjekt.

Ulempe: JPA-mappingen blir mer krevende, fordi du trenger nøkkelklasse og mer annotering.

## Kunstig nøkkel

![Mange-til-mange med kunstig primærnøkkel](/content/dat107/assets/jpa/mn-kunstig-pk.png)

Med kunstig primærnøkkel får koblingsentiteten egen id.

```text
Prosjektdeltagelse(id, ansatt_id, prosjekt_id, timer, rolle)
PK = id
UNIQUE(ansatt_id, prosjekt_id) kan brukes ved behov
```

Fordel: enklere entitet og DAO-kode.

Ulempe: naturlig unikhet på ansatt/prosjekt må eventuelt sikres med egen `UNIQUE`-constraint.

## Sammenligning

| Modell | Fordel | Ulempe |
| --- | --- | --- |
| Direkte `@ManyToMany` | Lite kode for ren kobling | Håndterer ikke egne attributter godt |
| Koblingsentitet med sammensatt PK | Uttrykker naturlig identitet | Mer krevende JPA-mapping |
| Koblingsentitet med kunstig PK | Enklere entitet og DAO-kode | Krever ofte ekstra `UNIQUE` for naturlig unikhet |

## Viktig kursmønster

Når en deltagelse opprettes, bør objektmodellen oppdateres på begge sider:

```java
public Prosjektdeltagelse(Ansatt ansatt, Prosjekt prosjekt, int timer) {
    this.ansatt = ansatt;
    this.prosjekt = prosjekt;
    this.timer = timer;

    ansatt.leggTilProsjektdeltagelse(this);
    prosjekt.leggTilProsjektdeltagelse(this);
}
```

Dette gjør Java-objektene konsistente før og etter JPA synker mot databasen.

## Vanlige feil

- bruke ren `@ManyToMany` når relasjonen har egne felter
- ikke kunne begrunne nøkkelvalget
- glemme `UNIQUE(ansatt_id, prosjekt_id)` når kunstig PK brukes, men kombinasjonen fortsatt skal være unik
- modellere M:N direkte i SQL og annerledes i JPA uten forklaring

## Typiske eksamensoppgaver

- tegn eller skriv entiteter for M:N med ekstra felter
- forklar hvorfor koblingen er egen entitet
- sammenlign sammensatt nøkkel og kunstig nøkkel
- skriv metode som registrerer ny prosjektdeltagelse

## Hva du bør øve på

- forklare ren `@ManyToMany` kontra assosiasjonsentitet
- bruke prosjektdeltagelse som standardeksempel
- begrunne nøkkelvalg tydelig og kort
