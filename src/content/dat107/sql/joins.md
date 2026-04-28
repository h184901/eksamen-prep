# Joins Og Spørringer Mot Flere Tabeller

## Kjernen

Normaliserte databaser lagrer data i flere tabeller. Joins brukes for å koble radene sammen igjen når et spørsmål trenger data fra flere steder.

![Modell med flere tabeller](/content/dat107/assets/sql/flere-tabeller-modell.png)

Figuren viser hvorfor du må lese modellen før du skriver SQL. Noen spørsmål går direkte fra kunde til ordre, mens andre må via ordrelinje og vare.

## Dette må du kunne

- forklare kryssprodukt
- skrive `inner join ... on ...`
- bruke tabellalias ryddig
- følge fremmednøkler gjennom flere tabeller
- bruke `left join` når rader uten match også skal med
- skrive egenkobling med alias
- kombinere join med `group by`
- kjenne `union`, `intersect` og `except`

## Kryssprodukt

Hvis du skriver flere tabeller uten koblingsbetingelse, får du alle kombinasjoner:

```sql
select *
from ordre, kunde;
```

Hvis `kunde` har 100 rader og `ordre` har 500 rader, får du 50 000 kombinasjoner. Dette er nesten alltid feil i vanlige oppgaver.

## Indre kobling

```sql
select k.knr, k.etternavn, o.ordrenr
from kunde as k
join ordre as o
  on o.knr = k.knr;
```

`join` uten ekstra ord betyr vanligvis `inner join`. Bare rader med match på begge sider blir med.

Koblingskolonnene må ha samme betydning, ikke bare samme datatype. `ansatt.ansnr = ordre.ordrenr` er meningsløst selv om begge er tall.

## Flere tabeller

Hvilke kunder har kjøpt vare `10820`?

```sql
select distinct k.knr, k.etternavn
from kunde as k
join ordre as o
  on o.knr = k.knr
join ordrelinje as ol
  on ol.ordrenr = o.ordrenr
where ol.vnr = '10820';
```

Du må ta med mellomtabellene som binder dataene sammen. Her finnes ikke varenummer direkte i `kunde` eller `ordre`.

## `JOIN` versus `LEFT JOIN`

```sql
select k.knr, k.etternavn, o.ordrenr
from kunde as k
left join ordre as o
  on o.knr = k.knr;
```

- `join` tar bare med kunder som har ordre
- `left join` tar med alle kunder, også de uten ordre
- kolonnene fra høyre tabell blir `null` når det ikke finnes match

Dette går igjen i oppgaver med "vis også de som ikke har ...".

## Join og gruppering

```sql
select k.knr, k.etternavn, count(o.ordrenr) as antall_ordrer
from kunde as k
left join ordre as o
  on o.knr = k.knr
group by k.knr, k.etternavn;
```

Hvis du bruker `left join` her, får også kunder uten ordre være med, med antall 0 hvis du teller riktig kolonne. `count(*)` ville telt den venstre raden også.

## Egenkobling

En tabell kan kobles med seg selv. Da må du bruke ulike alias:

```sql
select a.navn as ansatt, l.navn as leder
from ansatt as a
left join ansatt as l
  on a.leder_ansnr = l.ansnr;
```

Dette brukes når en fremmednøkkel peker til samme tabell, for eksempel leder/ansatt eller kategori/underkategori.

## Generelle koblinger

Koblinger trenger ikke alltid være likhet. Eksempel: finn varer som har kostet mer før:

```sql
select distinct v.vnr, v.betegnelse
from vare as v
join prishistorikk as h
  on h.vnr = v.vnr
where v.pris < h.gammelpris;
```

Først kobles vare mot prishistorikk. Deretter sammenlignes nåpris og gammel pris.

## Mengdeoperatorer

```sql
select knr from ordre_2024
union
select knr from ordre_2025;
```

`union` fjerner duplikater. `union all` beholder dem.

Andre operatorer:

- `intersect`: rader som finnes i begge
- `except`: rader som finnes i den første, men ikke den andre

Begge spørringene må ha samme antall kolonner og kompatible datatyper.

## Vanlige feil

- glemme join-betingelsen
- koble på kolonner med lik datatype, men ulik betydning
- velge `join` der oppgaven krever rader uten treff
- innføre alias og så bruke tabellnavnet videre
- glemme mellomtabeller i en M:N-struktur
- bruke `count(*)` etter `left join` når du egentlig skal telle matcher

## Typiske eksamensoppgaver

- hent info fra to eller tre tabeller samtidig
- vis også rader uten treff
- tell antall per gruppe etter join
- skriv en egenkobling
- forklar hva som skjer ved kartesisk produkt

## Hva du bør øve på

- peke ut join-veien i en ER/logisk modell før du skriver SQL
- omskrive samme oppgave med `join` og `left join`
- finne feilen i en spørring som gir altfor mange rader
