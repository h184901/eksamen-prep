# XML Og XML Schema

## Kjernen

XML brukes til å beskrive hierarkiske data. I kurset er skillet mellom well-formed og valid XML helt sentralt.

## Dette må du kunne

- forklare forskjellen på well-formed og valid XML
- lese og forstå et XSD-skjema
- forklare `xs:sequence`, `minOccurs`, `maxOccurs`, `xs:key`, `xs:unique` og `xs:keyref`
- forstå namespaces på et grunnleggende nivå

## Viktig kursfil

`birken-paamelding.xsd` er en nøkkelfil fordi den viser både datatyper, mønstre og referanseintegritet i XML-verdenen.

## Hva XSD brukes til

- strukturkontroll
- datatypekontroll
- unikhet
- referanser mellom deler av dokumentet

## Vanlige feil

- blande element og attributt uten tanke
- tro at well-formed automatisk betyr valid
- ikke lese namespace-delene nøye nok

## Typiske eksamensoppgaver

- forklar hvordan et XSD begrenser lovlige XML-dokumenter
- les en XSD og si hva som må være unikt
- forklar hva en `keyref` gjør

## Hva du bør øve på

- lese små XML-dokumenter opp mot et skjema
- forklare hvilke feil som er syntaksfeil og hvilke som er valideringsfeil
