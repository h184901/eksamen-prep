# Mange-Til-Mange Og Nøkler

## Kjernen

Mange-til-mange er ofte enkelt i teorien, men eksamensoppgavene blir fort vanskelige når relasjonen har egne attributter.

## Dette må du kunne

- forklare når ren `@ManyToMany` er nok
- forklare når relasjonen må bli egen entitet
- sammenligne sammensatt nøkkel og kunstig nøkkel
- modellere relasjonsfelt som rolle og timer riktig

## Hovedregel

Hvis relasjonen har egne data, som rolle eller timetall, bør du normalt lage en egen entitet for koblingen.

## Viktig kursmønster

I `Prosjektdeltagelse` fra kursmaterialet bygges koblingen opp og begge sider oppdateres samtidig:

```java
public Prosjektdeltagelse(Ansatt ansatt, Prosjekt prosjekt, int timer) {
    this.ansatt = ansatt;
    this.prosjekt = prosjekt;
    this.timer = timer;
    ansatt.leggTilProsjektdeltagelse(this);
    prosjekt.leggTilProsjektdeltagelse(this);
}
```

## Vanlige feil

- bruke ren `@ManyToMany` når relasjonen har egne felter
- ikke kunne begrunne nøkkelvalget
- modellere M:N direkte i SQL og annerledes i JPA uten forklaring

## Typiske eksamensoppgaver

- tegn eller skriv entiteter for M:N med ekstra felter
- forklar hvorfor koblingen er egen entitet
- skriv metode som registrerer ny deltagelse

## Hva du bør øve på

- sammenligne ren `@ManyToMany` med assosiasjonsentitet
- forklare fordeler og ulemper ved sammensatt kontra kunstig nøkkel
