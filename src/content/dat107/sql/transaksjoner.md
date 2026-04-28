# Transaksjoner

## Kjernen

En transaksjon er en logisk arbeidsenhet som enten skal fullføres helt eller ikke i det hele tatt. Transaksjoner beskytter databasen mot delvise oppdateringer, systemfeil og samtidige brukere som forstyrrer hverandre.

## Dette må du kunne

- forklare `start transaction`, `commit` og `rollback`
- forklare ACID
- beskrive transaksjonsloggen på idé-nivå
- kjenne tapt oppdatering, dirty read og inkonsistent analyse
- forklare leselås, skrivelås og tofaselåsing
- forstå serialiserbarhet og vranglås
- kjenne isolasjonsnivåer på overordnet nivå

## Hvorfor transaksjoner?

En ordrebestilling kan kreve flere endringer:

- sett inn rad i `ordre`
- sett inn rader i `ordrelinje`
- oppdater lagerantall i `vare`

Hvis bare noen av endringene gjennomføres, kan databasen havne i en inkonsistent tilstand.

## SQL-mønster

```sql
start transaction;

insert into ordre(ordrenr, knr, ansnr)
values (2020, 1003, 22);

insert into ordrelinje(ordrenr, vnr, antall)
values (2020, '4034', 5);

update vare
set antall = antall - 5
where vnr = '4034';

commit;
```

`commit` bekrefter. `rollback` avbryter og ruller endringene tilbake. Mange DBMS-er bruker auto-commit som standard, så eksplisitte transaksjoner er viktige når flere setninger hører sammen.

## ACID

| Egenskap | Betydning |
| --- | --- |
| Atomicity | alt eller ingenting |
| Consistency | lovlig tilstand før og etter |
| Isolation | samtidige transaksjoner skal ikke se/ødelegge mellomresultater |
| Durability | bekreftede endringer skal overleve feil |

Koble alltid `commit` og `rollback` til ACID når du forklarer transaksjoner.

## Transaksjonslogg

DBMS-et logger endringer før de skrives permanent. Loggen gjør det mulig å:

- rulle tilbake en avbrutt transaksjon
- gjenopprette bekreftede endringer etter feil
- avgjøre hvilke transaksjoner som hadde skrevet `commit`

![Livsløpet til en transaksjon](/content/dat107/assets/sql/transaksjon-livslop.png)

## Samtidighetsproblemer

### Tapt oppdatering

To transaksjoner leser samme verdi, beregner hver sin nye verdi og skriver tilbake. Den siste skrivingen overskriver den første.

![Tapt oppdatering](/content/dat107/assets/sql/tapt-oppdatering.png)

Hvis verdien starter på 120, og én transaksjon trekker fra 10 mens en annen legger til 20, skal sluttverdien være 130. Feil fletting kan gi 140 eller 110.

### Dirty read

En transaksjon leser data som en annen transaksjon har skrevet, men ikke bekreftet. Hvis den andre transaksjonen rulles tilbake, har den første brukt data som aldri skulle eksistert.

### Inkonsistent analyse

En rapport leser noen gamle og noen nye verdier mens en annen transaksjon oppdaterer. Resultatet blir en blanding som ikke tilsvarer en gyldig databasetilstand.

## Låser

Låser brukes for å styre samtidighet.

| Lås | Også kalt | Bruk |
| --- | --- | --- |
| Leselås | shared lock | flere kan lese samtidig |
| Skrivelås | exclusive lock | én transaksjon får skrive |

Låser kan gjelde database, tabell, rad eller i noen systemer enda finere nivå.

## Serialiserbarhet

Et forløp er rekkefølgen operasjoner fra flere transaksjoner flettes sammen. Et forløp er serialiserbart hvis sluttresultatet er det samme som om transaksjonene hadde kjørt én etter én i en eller annen rekkefølge.

Dette er idealet for korrekt samtidighet.

## Tofaselåsing

En transaksjon følger tofaselåsing hvis:

1. den tar alle låser før den frigir noen
2. etter første opplåsing tar den ingen nye låser

Hvis alle transaksjoner følger tofaselåsing, blir forløpene serialiserbare. Ulempen er at vranglås kan oppstå.

## Vranglås

Vranglås oppstår når transaksjoner venter på hverandre i sirkel.

Eksempel:

- T1 holder lås på A og venter på B.
- T2 holder lås på B og venter på A.

DBMS-et kan oppdage dette med ventegraf og rulle tilbake én transaksjon, eller prøve å forebygge med tidsstempler.

## Isolasjonsnivåer

Lavere isolasjon gir mer ytelse, men åpner for flere fenomener:

| Fenomen | Forklaring |
| --- | --- |
| Dirty read | lese ubekreftede data |
| Ikke-repeterbar lesing | samme rad leses to ganger og har endret seg |
| Fantomer | nye rader dukker opp mellom to spørringer |

Til eksamen holder det ofte å forklare hva problemet er og hvorfor høyere isolasjon/låsing kan hjelpe.

## Pessimistisk og optimistisk låsing

Pessimistisk låsing antar at konflikter kan skje og låser tidlig. Optimistisk låsing lar transaksjoner jobbe mer fritt, men validerer ved `commit` at ingen konflikt har skjedd.

Optimistisk låsing passer best når de fleste bare leser og konflikter er sjeldne.

## Vanlige feil

- beskrive transaksjon som bare "flere SQL-setninger"
- glemme `rollback`
- ikke kunne forklare hvorfor delvis oppdatering er farlig
- blande sammen tapt oppdatering, dirty read og inkonsistent analyse
- tro at låser alene alltid er nok uten å nevne serialiserbarhet/tofaselåsing

## Typiske eksamensoppgaver

- forklar hva en transaksjon er
- forklar ACID
- gjenkjenn samtidighetsproblem i et scenario
- skriv en kort transaksjon med `commit` og mulig `rollback`
- forklar hvordan låsing eller isolasjon kan hjelpe

## Hva du bør øve på

- skrive ett kort eksempel på transaksjon med overføring eller ordre
- forklare med egne ord hva som går galt uten transaksjon
- tegne en enkel tidslinje for tapt oppdatering
