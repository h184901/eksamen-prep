# Kortversjon Og Sjekkliste

## Annotasjoner du må kunne

- `@Entity`
- `@Table`
- `@Id`
- `@GeneratedValue`
- `@ManyToOne`
- `@OneToMany`
- `@OneToOne`
- `@ManyToMany`
- `@JoinColumn`
- `@Inheritance`

## Fire ord du må forstå

- transient
- managed
- detached
- removed

## Hurtigsjekk for relasjoner

- Hvem er owning side?
- Hvor ligger fremmednøkkelen?
- Må begge sider oppdateres i Java?
- Har relasjonen egne felter som krever egen entitet?

## Hurtigsjekk for DAO-metoder

- er det transaksjon rundt endring?
- passer `find` eller trengs JPQL?
- hva skal skje hvis ingenting finnes?

## Vanlige eksamensfeller

- feil owning side
- `remove` på detached objekt
- `@ManyToMany` brukt for bredt
- JPA-navn og SQL-navn blandes i JPQL
