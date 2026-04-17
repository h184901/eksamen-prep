# Øvingsoppgaver

## Del 1: ER-modellering

1. Les teksten: "En forening har medlemmer. Hvert medlem tilhører ett lokallag. Lokallagene har et navn og en adresse." Tegn ER-modell med kardinaliteter.
2. Utvid forrige oppgave: "Medlemmer betaler medlemsavgift hvert år. Beløpet kan variere fra år til år." Hvordan endrer dette ER-modellen?
3. Gi et eksempel på en svak entitet og forklar hvorfor den er svak.
4. Modellér et bibliotek der en bok kan lånes ut mange ganger til ulike lånere. Vis hvilke entiteter og relasjoner du velger.

## Del 2: Mapping til tabeller

5. Mapp en 1:N-relasjon mellom `Avdeling` og `Ansatt` til tabeller. Hvor plasseres fremmednøkkelen, og hvorfor?
6. Mapp en M:N-relasjon mellom `Student` og `Emne` til tabeller. Hva heter koblingstabellen, og hvilke nøkler har den?
7. Modellér et system for medlemmer, lokallag og medlemsavgift per år. Skriv hvilke tabeller du ville laget og hvilke nøkler hver tabell har.

## Del 3: Normalisering

8. Forklar 1NF, 2NF og 3NF med egne ord og ett eksempel per nivå.
9. Gi et eksempel på en transitiv avhengighet og forklar hvordan du ville normalisert bort problemet.
10. Forklar hvorfor medlemsavgift per år ofte krever en egen tabell, og koble forklaringen til 2NF eller 3NF.
11. Finn bruddet: En tabell `Ansatt(ansattnr, navn, avdelingsnr, avdelingsnavn)` — hvilken normalform bryter den, og hvordan fikser du det?

## Del 4: Begreper

12. Forklar forskjellen på kandidatnøkkel og primærnøkkel.
13. Gi et eksempel på en funksjonell avhengighet, og forklar hvorfor den er funksjonell.
14. Når bør en relasjon mellom to entiteter bli en egen tabell selv om den er 1:N?
