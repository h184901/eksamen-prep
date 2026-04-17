# Relasjoner En-Til-Mange Og En-Til-En

## Kjernen

Denne delen er sentral på eksamen fordi den tester om du forstår både relasjonstype, owning side og hvordan objektgrafen holdes konsistent.

## Dette må du kunne

- forklare owning side og inverse side
- bruke `mappedBy` riktig
- forstå at `@ManyToOne` ofte er owning side i 1:N
- forklare når begge sider må oppdateres i Java
- kjenne forskjellen på `LAZY` og `EAGER`

## Viktig kursmønster

Når en ny kobling lages, må ofte begge sider oppdateres:

```java
Karakter nyK = new Karakter(emnekode, eksdato, bokstav, vm);
vm.getKarakterer().add(nyK);
em.persist(nyK);
```

## `flush()`-poenget

I kurskoden brukes `em.flush()` når gammel barn-rad må være slettet i databasen før ny rad med samme unike kombinasjon kan legges inn.

Dette er et klassisk tegn på at du må forstå databasebegrensninger, ikke bare JPA-syntaks.

## Vanlige feil

- feil owning side
- glemme å oppdatere begge sider i bidireksjonal relasjon
- bruke feil lastestrategi uten begrunnelse
- tro at JPA automatisk rydder all objektlogikk for deg

## Typiske eksamensoppgaver

- skriv entiteter for 1:N og 1:1
- forklar hvilken side som er owning side
- skriv metode som henter eller oppdaterer relaterte objekter

## Hva du bør øve på

- forklare én bidireksjonal relasjon med ord, Java og database samtidig
- lese en JPA-relasjon og peke ut hvor fremmednøkkelen ligger
