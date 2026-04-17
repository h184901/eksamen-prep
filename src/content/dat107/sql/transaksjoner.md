# Transaksjoner

## Kjernen

En transaksjon er en arbeidsenhet som enten skal fullføres helt eller ikke i det hele tatt.

## Dette må du kunne

- forklare `start transaction`, `commit` og `rollback`
- forklare ACID
- kjenne samtidighetsproblemene lost update, dirty read og incorrect summary
- forstå hvorfor låsing og isolasjon finnes

## Typisk mønster

```sql
start transaction;

update konto
set saldo = saldo - 500
where knr = 1;

update konto
set saldo = saldo + 500
where knr = 2;

commit;
```

## ACID

- Atomicity: alt eller ingenting
- Consistency: gyldig tilstand før og etter
- Isolation: samtidige transaksjoner skal ikke ødelegge for hverandre
- Durability: bekreftede endringer skal overleve feil

## Vanlige feil

- beskrive transaksjon som bare "flere SQL-setninger"
- ikke kunne forklare hvorfor delvis oppdatering er farlig
- blande sammen samtidighetsproblemene

## Typiske eksamensoppgaver

- forklar hva en transaksjon er
- forklar ACID
- gjenkjenn et samtidighetsproblem i et scenario
- forklar hvordan låsing eller isolasjon kan hjelpe

## Hva du bør øve på

- skrive ett kort eksempel på transaksjon med overføring eller ordre
- forklare med egne ord hva som går galt uten transaksjon
