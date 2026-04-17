# XML I PostgreSQL

## Kjernen

PostgreSQL kan brukes som en hybrid løsning der en rad har både vanlig ID-kolonne og en XML-kolonne med dokumentdata.

## Dette må du kunne

- forklare hvorfor noen ville lagre XML i PostgreSQL
- lese et eksempel med `xml`-kolonne
- forklare hvordan verdier kan hentes ut igjen med XML-funksjoner
- forstå at dette er en mellomløsning mellom ren relasjonell modell og ren dokumentdatabase

## Typisk mønster

```sql
create table studenter (
  student_no integer,
  xml_info xml,
  constraint studenter_pk primary key (student_no)
);
```

## Vanlige feil

- beskrive XML i PostgreSQL som det samme som full dokumentdatabase
- ikke forklare hvorfor en hybrid løsning velges
- fokusere bare på syntaks uten å forklare modellgevinsten

## Typiske eksamensoppgaver

- vis hvordan et XML-dokument kan lagres i PostgreSQL
- forklar fordeler og ulemper ved XML i PostgreSQL
- skriv eller forklar spørring som henter ut data fra XML-kolonne

## Hva du bør øve på

- forklare når XML i PostgreSQL er nyttig og når det blir tungvint
- lese `studenter-xml.sql` og beskrive strukturen i dokumentene
