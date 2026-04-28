# Øvingsoppgaver

## Del 1: XML og XSD

1. Forklar forskjellen på velformet og gyldig XML.
2. Finn minst seks feil i et lite XML-dokument med feil deklarasjon, manglende slutt-tagger og overlappende elementer.
3. Lag et XML-dokument for bøker der ISBN ligger som attributt på `bok`.
4. Lag XSD-regler for tittel, forfatter, format, utgivelsesår, språk og ISBN.
5. Forklar når du ville brukt `xs:unique`, `xs:key` og `xs:keyref`.

## Del 2: XPath

6. Skriv XPath som finner alle `person`-elementer.
7. Skriv XPath som finner alle personer med attributtet `medlem="true"`.
8. Skriv XPath som teller antall `melding`-elementer.
9. Skriv XPath som finner avsendere der fornavn starter på `K`.
10. Forklar forskjellen på `/tavle/melding`, `//melding` og `melding`.

## Del 3: XSLT

11. Forklar hva `xsl:template`, `xsl:for-each` og `xsl:value-of` gjør.
12. Skriv et lite XSLT-fragment som lager én HTML-rad per `student`.
13. Forklar hvordan `sum(...) div count(...)` kan brukes til snittberegning.
14. Forklar hva `xsl:choose` brukes til i karakterberegning.

## Del 4: XML i PostgreSQL

15. Vis hvordan du ville lagret ett XML-dokument i PostgreSQL med ID-kolonne og XML-kolonne.
16. Forklar hva `xpath()` returnerer.
17. Skriv eller forklar en spørring med `xpath_exists()`.
18. Forklar hvorfor `xmltable()` er nyttig når XML skal bli rader.
19. Forklar en ulempe ved å lagre XML i en relasjonsdatabase.

## Del 5: JSON i PostgreSQL

20. Skriv et JSON-dokument for en student med navn, studieprogram og liste med emner.
21. Forklar hvorfor `jsonb` ofte er bedre enn `json`.
22. Forklar forskjellen på `->` og `->>`.
23. Skriv en spørringsskisse som henter `fornavn` fra en `jsonb`-kolonne.
24. Forklar hva `jsonb_set()` gjør.
25. Forklar hva `jsonb_array_elements(...) with ordinality` kan brukes til.

## Del 6: Dokumentmodell og drøfting

26. Et system har kunder, ordre og ordrelinjer. Når passer relasjonsmodell best?
27. Når kan dokumentmodell være mer naturlig?
28. Hvilke data kan bli duplisert i dokumentmodellen?
29. Hvilke constraints eller joins mister du eller flytter ut i applikasjonslogikk?
30. Skriv en kort drøfting der du veier fordeler og ulemper før du velger løsning.

## Del 7: Nøkkel-verdi

31. Forklar hva en nøkkel-verdi-database er.
32. Gi to bruksområder for Redis.
33. Forklar hvorfor DynamoDB ofte modellerer med partition key og sort key.
34. Forklar hvorfor nøkkel-verdi passer dårlig for komplekse ad hoc-spørringer.

## Del 8: Eksamensdrilling

35. Forklar NoSQL uten å si at det er "bedre enn SQL".
36. Ta et XML/XSD-eksempel og marker hva som er syntaksregel og hva som er valideringsregel.
37. Ta et JSONB-eksempel og marker hva som returnerer JSON, og hva som returnerer tekst.
38. Ta et case og skriv tre argumenter for relasjonsmodell og tre argumenter for dokumentmodell.
