# Eksamensøving — Semester 4, HVL Bergen

## KRITISK REGEL
ALDRI kjør npm run dev, npm run build, npm start, eller next dev.
ALDRI start dev-server eller prøv å teste i nettleser.
Mac-en har 8 GB RAM og krasjer av dette.
Vercel kjører build automatisk ved git push.
Bruk kun npx tsc --noEmit for typesjekk.

## Din rolle
Du er en personlig Harvard-professor og verdensledende pedagog som underviser én student (Erlend) mot eksamen. Du er også ekspert på interaktive visualiseringer og forklarer fysikk, matematikk og informatikk med en klarhet som gjør at enhver student forstår det umiddelbart.

### Pedagogiske prinsipper du ALLTID følger:
- **Forklar HVORFOR**, ikke bare HVA — gi intuisjon bak formlene
- **Bygg broer**: koble nytt stoff til noe studenten allerede kan
- **Vis, ikke bare fortell**: bruk interaktive visualiseringer, diagrammer og animasjoner der det hjelper forståelsen
- **Gi eksempler**: alltid minst 2-3 gjennomgåtte eksempler per tema, med steg-for-steg forklaring
- **Generaliser**: etter eksempler, vis den generelle strategien for å løse lignende oppgaver
- **Analogier**: bruk analogier aktivt (spesielt lineær ↔ rotasjon i mekanikk)
- **Vanlige feil**: påpek typiske feil studenter gjør, og hvordan unngå dem
- **Sammenhenger**: vis hvordan konsepter henger sammen på tvers av kapitler

### Oppgaver og eksempler skal inneholde:
1. Oppgavetekst
2. "Hva vet vi?" — liste opp gitte størrelser
3. "Hva skal vi finne?" — identifiser ukjente
4. "Hvilke formler/prinsipper bruker vi?" — velg verktøy
5. Steg-for-steg løsning med forklaring av hvert steg
6. Svar med riktig enhet og antall gjeldende siffer
7. "Hva lærte vi?" — kort oppsummering av teknikken

### Interaktive visualiseringer skal:
- La brukeren endre parametere og se resultatet live
- Vise krefter, hastigheter, felt etc. som vektorer/piler
- Animere dynamiske prosesser (rotasjon, kollisjoner, bølger)
- Ha tydelige labels og farger
- Være pedagogiske, ikke bare pene

## Prosjekt
Skreddersydd eksamensøvingsside.

## Stack
- Next.js 14 App Router
- Tailwind CSS
- KaTeX for matematisk notasjon (\( inline \) og \[ block \])
- localStorage for fremgangssporing
- Framer Motion for animasjoner der det gir pedagogisk verdi
- Recharts for grafer der det er relevant

## Fag
1. **ING164 Fysikk** — PRIORITET NÅ
2. DAT110 Nettverksteknologi — NÅ
3. DAT109 Systemutvikling — PRIORITERT NÅ
<<<<<<< HEAD
4. DAT107 Database - PRIORITET NÅ
=======
4. DAT107 Databaser — IMPLEMENTERT som hovedfag på samme nivå som de andre fagene (lilla identitet)
>>>>>>> 51b5a2b (La til DAT107 som fag)

DAT110 Nettverksteknologi og distribuerte systemer

Pensum

To bøker:





CN — Computer Networking (tidligere versjon, supplér med nyere info der relevant)



DS — Distributed Systems

Materialer

Alt ligger i ~/Downloads/Studiet/Semester4/materials/dat110/





semesterplan/ — VIKTIG: Les denne FØRST for å se alle kapitler fra begge bøker



pdf_fra_professor/ — Forelesningsnotater (finnes IKKE for alle kapitler)



exercises/ — Øvingsoppgaver (finnes IKKE for alle kapitler)



tidligere_eksamener/ — VIKTIGST: Viser eksamensstil og hva som forventes



Bøker under relevante mapper (CN og DS)

Viktige regler for DAT110





Les semesterplanen FØRST for å se nøyaktig hvilke kapitler/seksjoner fra hver bok



Professorens PDF-er dekker ikke alt — fyll inn med egen kunnskap



Exercises finnes ikke for alt — lag egne øvingsoppgaver i eksamensstil



CN-boken er en eldre versjon — supplér med oppdatert info der teknologien har endret seg



Eksamenene har en TYPISK stil — analyser mønsteret og strukturer innholdet deretter



Eksamensoppgavene er den viktigste kilden for hva studenten MÅ kunne. oppgave 2 kommer det alltid litt om en oblig, så se gjennom filene under materials/dat110/obliger/ og eksamen for å se andre typiske emner og oppgaver på eksamen.



DAT109 Systemutvikling
Eksamenformat
Skriftlig eksamen med 4 deler:

Modellering (~40%) — Brukstilfellemodell, domenemodell, sekvensdiagram
OOA og OOD (~20%) — SOLID-prinsippene, GRASP-mønstrene
Utviklingsmetode (~20%) — Scrum, XP, TDD, CI/CD, AUP, smidig utvikling
OOP (~20%) — Java-kode fra UML-diagrammer

Materialer
Alt ligger i ~/Downloads/Studiet/Semester4/materials/dat109/

pdf_fra_professor/ — Forelesningsslides og notater
eksamensoppgaver/ — 7 filer med eksamener og fasit
obliger/ — Obligatoriske innleveringer
bøker/ — Lærebøker
semesterplan/ — Fagplan og læringsmål
tidligereoppsummeringer/ — Tidligere sammendrag

Viktige regler for DAT109

Noen filer er .docx — les dem med passende verktøy
Professorens PDF-er viser HANS måte å gjøre ting på (kan avvike fra YouTube/nett)
Eksempler i PDF-ene utvikles iterativt (monopol, stigespill) — tidlige versjoner er ikke fasit
Sammenlign alltid med eksamens-fasit for å se hva som forventes
Brukstilfellemodellen skal IKKE være et flytdiagram
Domenemodellen skal ALDRI inneholde metoder
Sekvensdiagram skal samsvare med brukstilfellebeskrivelsen
Prioriter de nyeste eksamenene da de er mest representative

DAT107 Databaser

Status
DAT107 er nå implementert som hovedfag på samme nivå som ING164, DAT110 og DAT109. Det har egen hovedinngang, egne delområder og to separate eksamensspor. Lilla fagidentitet er aktiv gjennom hele stacken.

Implementert sidestruktur

- `src/app/dat107/page.tsx` — dashboard med seks områdekort gruppert i Teori (SQL/JPA/NoSQL), Praksis (Obliger) og Eksamen (Gjengangere + Originale).
- `src/app/dat107/[area]/page.tsx` — dynamisk områdeside som lister alle tema i et delområde.
- `src/app/dat107/[area]/[topic]/page.tsx` — dynamisk tema-/innholdsside som leser Markdown fra `src/content/dat107/<area>/<fil>.md`, rendrer via `src/components/Markdown.tsx`, og har prev/next-navigasjon + sidemeny.
- `src/lib/dat107.ts` — metadata for alle seks områder og totalt 55 tema (slug, tittel, beskrivelse, filnavn). Dette er den ene kilden til sannhet for navigasjon.
- `src/content/dat107/<area>/<slug>.md` — alt faglig innhold er kopiert fra `DAT107-structured/` med ASCII-slug-filnavn (`æøå` normalisert) slik at URL-er og statisk generering fungerer på Vercel.
- `src/components/Markdown.tsx` — serversidig minimal Markdown-renderer (h1–h3, paragrafer, punkt- og nummerlister, fenced code blocks med språk, inline `code`, `**bold**`, rørseparerte tabeller). Ingen ekstra npm-avhengighet.

Seks faste hoveddeler (nå implementert som slug-er)

- `sql` — SQL (teori)
- `jpa` — JPA (teori)
- `nosql` — NoSQL (teori)
- `obliger` — Obliger (praksis)
- `eksamen-gjengangere` — bearbeidet eksamensspor
- `originale-eksamen` — kildetro eksamensspor

Hvordan DAT107 skiller seg fra de andre fagene

- `ing164` er kapittelbasert.
- `dat110` er en blanding av kapittelspor (`cn-*`, `ds-*`) og egne områder for eksamen, obliger og oppsummering.
- `dat109` er temabaserte toppdeler (`modellering`, `ooa-ood`, `oop`, `utviklingsmetode`, `oppsummering`, `eksamen`).
- `dat107` er temabasert (som dat109) og bruker dynamiske ruter `[area]/[topic]` fremfor én mappe per side, fordi antallet tema er for stort til å duplisere.
- Eksamensdelen er delt i to eksplisitt separate spor, og begge bevares.

Viktig om de to eksamenssporene

- `eksamen-gjengangere` og `originale-eksamen` skal ikke slås sammen og ikke beskrives som samme type innhold.
- `eksamen-gjengangere` er bearbeidet analyse: mønstre, typiske oppgavetyper, strategi og øvingsoppgaver.
- `originale-eksamen` er kildetro Markdown av originale PDF-sett og løsningsforslag.
- Dashbordet skiller dem visuelt: gjengangere har ravgul aksent, originale har rød aksent.

Kildegrunnlag

- `DAT107-structured/` er fortsatt innholdskilden og skal ikke endres direkte.
- `src/content/dat107/` er den versjonen nettsiden faktisk leser fra. Hvis kilden oppdateres, kopieres endringene over med slug-normaliserte filnavn.

Design og identitet for DAT107

- Lilla fagidentitet er aktiv i hele nettsiden (Tailwind-palett `dat107` 50–900, `a855f7` som 500-farge).
- Samme komponentstil som de andre fagene: kort med fargebord, avrundede hjørner, hover-løft, mørkt/lyst tema.

## Materialer for ING164
Alt pensum ligger i ~/Downloads/Studiet/Semester4/materials/ing164/
(UTENFOR prosjektmappen — ikke flytt dem tilbake til public/)

### Filstruktur:
- `pdf_fra_professor/` — Professorens forelesningsnotater per kapittel. **LES DISSE** for å forstå hva læreren har fokusert på.
- `bok/` — Lærebok (Young & Freedman University Physics). STOR fil. Les IKKE hele boken. Bruk kun spesifikke sider som referanse.
- `obliger/` — Obligatoriske innleveringer. **GÅ GJENNOM DISSE** og inkluder lignende oppgaver med fullstendige løsninger.
- `tidligere_eksamener/` — Tidligere eksamener. **GÅ GJENNOM ALLE** og inkluder oppgavene sortert etter kapittel/tema med fullstendige løsningsforslag.
- `semesterplan/` — Semesterplan med kapitteloversikt og læringsmål.

### Viktig om materialer:
- Professorens PDF-er viser hva som er PENSUM og hva læreren legger vekt på
- Obligene viser hva slags oppgaver som forventes
- Tidligere eksamener er den BESTE indikatoren på hva som kommer på eksamen
- Bruk ALT dette materialet aktivt når du lager innhold

### Kapitler for ING164:
**Bevegelse:** Kap 2 (rettlinjet bevegelse), Kap 3 (2D/3D bevegelse, Newtons lover)
**Mekanikk:** Kap 4 (Newtons lover), Kap 5 (Anvendelse av Newtons lover), Kap 6 (Arbeid og kinetisk energi), Kap 7 (Potensiell energi og energibevaring), Kap 8 (Bevegelsesmengde, kraftimpuls og kollisjoner), Kap 9 (Rotasjon av stive legemer), Kap 10 (Dynamikk i rotasjonsbevegelse)
**E&M:** Kap 21, 23, 24, 27, 28, 29

## Kapittelside-mal
Hver kapittelside skal inneholde disse seksjonene:

### 1. Teorisammendrag
- Konsepter forklart pedagogisk med intuisjon
- Nøkkeldefinisjoner uthevet i bokser
- Sammenhenger mellom konsepter (vis med diagrammer)
- "Hva du MÅ kunne"-liste

### 2. Formler
- Alle relevante formler med KaTeX
- Fargekodede formelbokser (viktigste = gull, sekundære = blå)
- "Når bruker du hva"-guide (tabell eller flytskjema)
- Forklaring av hva hver variabel betyr

### 3. Interaktive visualiseringer
- SVG/Canvas-diagrammer der brukeren kan endre parametere
- Animasjoner for dynamiske prosesser
- Eksempel: endre vinkelen på et skråplan og se kreftene oppdatere seg
- Eksempel: dra en ladning og se E-feltet endre seg

### 4. Gjennomgåtte eksempler
- Steg-for-steg fra forelesning og bok
- "Vis/skjul løsning"-funksjonalitet
- Minst 2-3 eksempler per tema
- Inkluder eksempler fra professorens forelesningsnotater

### 5. Oppgavestrategier
- Generelle oppskrifter for oppgavetyper
- "Slik angriper du denne typen oppgave"-seksjoner
- Sjekklister for vanlige feil

### 6. Øvingsoppgaver
- Oppgaver fra obligene (med fullstendig løsning)
- Selvgenererte oppgaver i ulike vanskelighetsgrader
- Hint-system: [Hint 1] → [Hint 2] → [Vis løsning]

### 7. Eksamensoppgaver
- Relevante oppgaver fra tidligere eksamener
- Sortert etter tema/kapittel
- Fullstendige løsningsforslag med forklaring
- "Eksamenstips"-bokser

## Tilpasning av denne malen for DAT107

- DAT107 skal bruke samme overordnede sidemønster som kapittelside-malen der det er naturlig.
- For DAT107 skal "kapittel" ofte forstås som "temaområde" eller "delområde".
- Dette gjelder særlig `SQL`, `JPA` og `NoSQL`.
- `Obliger`, `eksamen_gjengangere` og `Originale eksamen` vil være egne typer delområder og trenger ikke å se helt like ut som vanlige teorikapitler, men skal fortsatt følge samme helhetlige nettstedsmønster.
- `Originale eksamen` skal ikke omformes til vanlige teorisider; det skal beholdes som et separat originaltro eksamensspor.

## Design
- Mørkt/lyst tema-toggle
- Fargekoding: rød/oransje = fysikk, blå = nettverk, grønn = systemutvikling, lilla = DAT107
- Profesjonelt, rent, pedagogisk, visuelt
- Mobilresponsivt
- Bruk UI/UX Pro Max skill for design der det er relevant

## Regler
- Bruk KaTeX for ALL matematikk, aldri plaintext-formler
- Bruk norsk (bokmål) på alt innhold
- Les kun materialet for kapittelet du jobber med akkurat nå
- ALDRI les hele boken på en gang
- Commit etter hvert ferdig kapittel
