# ER-Modellering

## Kjernen

ER-modellering beskriver hvilke entiteter som finnes, hvilke attributter de har, og hvilke forhold som kobler dem sammen. Modellen skal være nær domenet og kravteksten, ikke bare en forhåndstegnet SQL-tabell.

![ER-diagram for bibliotek](/content/dat107/assets/modellering/er-bibliotek.png)

Figuren viser typiske ER-elementer: entiteter som `Bok`, `Låner` og `Utlån`, attributter med `PK`/`FK`, og forhold med kardinalitet.

## Dette må du kunne

- finne entiteter og attributter fra tekst
- skille entitetstype fra entitetsforekomst
- gi hver entitet en tydelig identifikator
- angi 1:1, 1:N og M:N
- lese kråkefotnotasjon med minimum og maksimum
- modellere svake entiteter og assosiative entiteter når det trengs
- kjenne igjen subtyper, komposisjon, aggregering og egenforhold

## Entitet, attributt eller forhold?

En entitet er en ting vi vil lagre informasjon om. Et attributt er en egenskap ved en entitet. Et forhold er en sammenheng mellom entiteter.

Spørsmål som hjelper:

- Trenger vi å lagre flere opplysninger om dette? Da kan det være en entitet.
- Kan verdien gjentas for mange rader og ha egne regler? Da kan det være egen entitet eller kodetabell.
- Har koblingen egne egenskaper, for eksempel dato, rolle eller antall timer? Da bør forholdet ofte bli en egen assosiativ entitet.

Eksempel: `Kommune` kan være attributt hvis du bare trenger navnet. Hvis du også skal lagre kommunenummer, fylke og areal, bør `Kommune` være egen entitet.

## Kardinalitet

Kardinalitet beskriver hvor mange forekomster som kan delta i et forhold.

| Notasjon | Betydning |
| --- | --- |
| `1:1` | én forekomst kobles til høyst én på den andre siden |
| `1:N` | én forekomst kan kobles til mange på den andre siden |
| `M:N` | mange på begge sider |

![Minimums- og maksimumskardinalitet](/content/dat107/assets/modellering/kardinalitet-min-maks.png)

I kråkefotnotasjon viser symbolet nærmest entiteten maksimum: strek betyr én, kråkefot betyr mange. Symbolet innenfor viser minimum: sirkel betyr valgfri, strek betyr obligatorisk.

## Svake entiteter

En svak entitet kan ikke identifiseres uten en annen entitet. Den arver derfor hele eller deler av identifikatoren.

Eksempel: `Kinosal` kan være svak under `Kino` hvis salnummer bare er unikt innen én kino. Da kan nøkkelen bli `(kinonr, salnr)`.

Vær kritisk: svak entitet er faglig riktig når identiteten faktisk avhenger av eieren, men utstrakt bruk kan gi lange sammensatte nøkler. I praktiske systemer brukes ofte surrogatnøkler.

## Mange-til-mange

Et M:N-forhold bør normalt løses opp før databasen bygges. Hvis forholdet har egne attributter, er løsningen en assosiativ entitet.

Eksempel:

```text
Ansatt --< ProsjektDeltakelse >-- Prosjekt
ProsjektDeltakelse(ansattnr, prosjektnr, ant_timer, rolle)
```

Dette er bedre enn å legge en liste med ansatte inn i `Prosjekt`, eller en liste med prosjekter inn i `Ansatt`.

## UML, subtyper og del-av

UML-klassediagram kan brukes som datamodell. Kardinalitet skrives ofte som `1..1`, `0..*`, `1..*` osv.

Subtyper brukes når noe er en spesialisering:

- `Personbil` er et `Kjøretøy`
- `Lastebil` er et `Kjøretøy`

Aggregering og komposisjon brukes for "del-av". Komposisjon er sterkest: delen eksisterer ikke uten helheten, for eksempel kinosal under kino.

## Modelleringsmønstre

Vanlige mønstre:

- hode/linje, for eksempel `Ordre` og `Ordrelinje`
- historikk, for eksempel `PrisHistorikk(vnr, dato, gammel_pris)`
- egenforhold, for eksempel ansatt som leder for ansatt
- hierarki, for eksempel kategori og underkategori
- stjerneskjema, ofte i analyse/datavarehus

Historikk er en vanlig eksamensfelle. Hvis oppgaven sier at en verdi endrer seg over tid og gamle verdier er relevante, trenger du som regel en egen historikktabell.

## Fan trap og chasm trap

![Fan trap](/content/dat107/assets/modellering/fan-trap.png)

Fan trap oppstår når modellen ser koblet ut, men en nødvendig direkte forbindelse mangler. Du kan ende med å kombinere rader som ikke egentlig hører sammen.

![Chasm trap](/content/dat107/assets/modellering/chasm-trap.png)

Chasm trap oppstår når en valgfri forbindelse gjør at informasjon forsvinner. Hvis en medlem-til-klubb-kobling er valgfri, kan en vei via klubb miste medlemmer uten klubb.

## Vanlige feil

- modellere historiske data som vanlige felter i samme tabell
- overse at en relasjon har egne attributter
- tegne M:N uten å planlegge hvordan den skal løses opp
- sette kardinalitet ut fra magefølelse i stedet for tekstkrav
- gjøre alt til entiteter selv om noen ting bare er attributter
- glemme roller i egenforhold, for eksempel `leder` og `ansatt`

## Typiske eksamensoppgaver

- tegn logisk ER-modell for et domene
- bestem kardinalitet og identifikatorer
- forklar hvorfor en relasjon må modelleres på en bestemt måte
- vis hvordan M:N blir en assosiativ entitet
- finn en modelleringsfelle i et gitt diagram

## Hva du bør øve på

- markere entiteter, relasjoner og regler før du tegner
- forklare muntlig hvorfor en kobling er 1:N eller M:N
- lage minst ett eksempel på svak entitet, egenforhold og historikktabell
