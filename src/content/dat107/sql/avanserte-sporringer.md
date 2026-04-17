# Avanserte Spørringer

## Kjernen

Her flytter SQL seg fra grunnleggende uthenting til mer presis logikk med delspørringer, `null`, views og mer avansert analyse.

## Dette må du kunne

- håndtere `null` med `is null` og `is not null`
- bruke `case`
- skrive delspørringer med `in`, `exists` og skalar delspørring
- forklare hva et view er
- kjenne idéen bak vindusfunksjoner

## Typiske mønstre

```sql
select navn, lønn
from ansatt
where lønn > (
    select avg(lønn)
    from ansatt
);
```

```sql
select k.knr, k.etternavn
from kunde k
where exists (
    select 1
    from ordre o
    where o.kundenr = k.knr
);
```

## Vanlige feil

- teste `kolonne = null`
- bruke delspørring uten å forstå om den er korrelert eller ikke
- tro at `in` og `exists` alltid betyr det samme i praksis
- beskrive views som ekte lagrede kopier av data uten å presisere hva som menes

## Typiske eksamensoppgaver

- finn rader over gjennomsnitt
- finn rader som mangler eller som har kobling til noe annet
- bruk `case` til å dele inn data i grupper
- forklar hva et view brukes til

## Hva du bør øve på

- løse samme oppgave både med join og delspørring
- forklare når `exists` er naturlig
- håndtere `null` presist i SQL og i forklaringsteksten
