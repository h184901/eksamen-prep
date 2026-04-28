# XML og XML Schema

## Kjernen

XML brukes til å beskrive hierarkiske data. I DAT107 er skillet mellom velformet og gyldig XML helt sentralt.

## Dette må du kunne

- skrive et velformet XML-dokument
- forklare rot-element, element, attributt og prolog
- forklare forskjellen på velformet og gyldig XML
- lese og forstå enkel DTD og XSD
- forklare `xs:sequence`, `minOccurs`, `maxOccurs`, `xs:key`, `xs:unique` og `xs:keyref`
- forstå namespaces på et grunnleggende nivå

## XML-grunnstruktur

```xml
<?xml version="1.0" encoding="UTF-8"?>
<melding dato="07.12.2019" rom="5-116">
  <avsender fnavn="Kari" enavn="Lie"/>
  <beskjed>Møte om 5 min!</beskjed>
</melding>
```

| Del | Forklaring |
| --- | --- |
| XML-deklarasjon | Prolog med versjon og tegnsett |
| Rot-element | Ytterste element, her `melding` |
| Underelement | Element inni rot-elementet |
| Attributt | Metadata i starttaggen |

## HTML vs XML

HTML beskriver presentasjon med forhåndsdefinerte elementer. XML beskriver data med egendefinerte elementer som applikasjonen må forstå.

XML er et metaspråk: et språk for å definere nye språk. Eksempler er SOAP, GML og mange domenespesifikke utvekslingsformater.

## Velformet XML

Et XML-dokument er velformet når det følger syntaksreglene:

- dokumentet har ett og bare ett rot-element
- alle elementer har starttagg og slutt-tagg, eller er selv-lukkende
- et element kan ha attributter, men ikke to attributter med samme navn
- elementer kan nøstes, men ikke overlappe

Gyldig nøsting:

```xml
<body><h1></h1><h2></h2></body>
```

Ugyldig overlapp:

```xml
<body><h1><h2></h1></h2></body>
```

## Velformet vs gyldig

| Begrep | Betydning |
| --- | --- |
| Velformet | Følger XML-syntaksreglene |
| Gyldig | Er velformet og tilfredsstiller DTD eller XML Schema |

En fil kan altså være velformet uten å være gyldig.

## DTD og XSD

DTD kan beskrive lovlig struktur, men har svakheter:

| DTD-svakhet | XML Schema-fordel |
| --- | --- |
| Svake datatyper | Rikt datatypesystem |
| Særegen syntaks | XML-basert syntaks |
| Begrenset validering | Støtter nøkler, unikhet og mønstre |
| Svak namespace-støtte | Bedre namespace-støtte |

XML Schema kalles XSD og har filending `.xsd`.

## XSD-struktur

```xml
<xs:schema
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    targetNamespace="http://www.hvl.no"
    xmlns="http://www.hvl.no"
    elementFormDefault="qualified">
    <!-- typedefinisjoner -->
    <!-- elementdefinisjoner -->
</xs:schema>
```

`xmlns:xs` importerer XSD-elementer og -typer. `targetNamespace` angir navnerommet for egne elementer og typer.

## Innebygde og egendefinerte typer

```xml
<xs:element name="navn" type="xs:string"/>
<xs:element name="fdato" type="xs:date"/>
<xs:element name="medlem" type="xs:boolean"/>
<xs:element name="saldo" type="xs:decimal"/>
```

Lengderestriksjon:

```xml
<xs:simpleType name="fornavnType">
  <xs:restriction base="xs:string">
    <xs:maxLength value="20"/>
  </xs:restriction>
</xs:simpleType>
```

Mønster:

```xml
<xs:simpleType name="idType">
  <xs:restriction base="xs:ID">
    <xs:pattern value="[H,D]{1}[0-9]{5}"/>
  </xs:restriction>
</xs:simpleType>
```

## ComplexType, forekomster og attributter

```xml
<xs:complexType name="personType">
  <xs:sequence>
    <xs:element name="pnr" type="pnrType"/>
    <xs:element name="fornavn" type="fornavnType"/>
    <xs:element name="etternavn" type="xs:string"/>
  </xs:sequence>
</xs:complexType>
```

Forekomster:

```xml
<xs:element name="person" type="personType"
            minOccurs="0"
            maxOccurs="unbounded"/>
```

Attributt:

```xml
<xs:attribute name="pnr" type="xs:ID" use="required"/>
```

Regel fra lysarkene: Bruk elementer for å beskrive data. Bruk attributter for metadata.

## Unikhet og nøkler

```xml
<xs:unique name="fnrUnique">
  <xs:selector xpath="person"/>
  <xs:field xpath="fnr"/>
</xs:unique>
```

```xml
<xs:key name="idKey">
  <xs:selector xpath="person"/>
  <xs:field xpath="@id"/>
</xs:key>
```

`xs:keyref` brukes når én del av dokumentet skal referere til en nøkkel definert et annet sted.

## Viktig kursfil

`birken-paamelding.xsd` er en nøkkelfil fordi den viser datatyper, mønstre og referanseintegritet i XML-verdenen.

## Vanlige feil

- blande element og attributt uten tanke
- tro at velformet automatisk betyr gyldig
- overse namespaces
- glemme at XML Schema har datatyper, mens DTD i praksis ikke har det
- bruke typografiske anførselstegn i faktisk XML-kode

## Typiske eksamensoppgaver

- forklar hvordan et XSD begrenser lovlige XML-dokumenter
- les en XSD og si hva som må være unikt
- forklar hva en `keyref` gjør
- finn feil i et XML-dokument

## Hva du bør øve på

- lese små XML-dokumenter opp mot et skjema
- forklare hvilke feil som er syntaksfeil og hvilke som er valideringsfeil
- lage en enkel XSD med `simpleType`, `complexType`, `sequence` og `maxOccurs`
