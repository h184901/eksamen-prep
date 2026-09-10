# EGB339 — implementering fase 1–3

Dato: 10. september 2026. Status: implementeringen er stoppet etter fase 3. **Samlet desktop-QA er fullført; klar for avgrenset commit og deploy. Ingen commit eller push.**

Fase 1–3 ble først fullført med TypeScript/build/validatorer og enkle funksjonssjekker. Den avtalte separate Playwright-, screenshot-, Taste- og regresjonsrunden er nå også fullført. Se [samlet slutt-QA](egb339-final-desktop-qa-2026-09-10.md) for rettelser, retest, screenshots og kjente begrensninger. Implementeringsloggen nedenfor skiller tidlig sanity fra den senere slutt-QA-en. Den gamle EPERM-blokkeringen er løst og er ikke en gjenstående oppgave.

## Fase 1 — komplett studiepilot

Piloten etablerte persistent kurs-sidebar, Week → Topic-hierarki, separat uke-/temaprogresjon, rolig leksjon, teori, matematikk, QUT-regneeksempel, prøv-selv, assessment-kobling, Forrige/Neste og reverserbar fullføring.

SE(2)-leksjonen bruker p_B=(2,3), θ=45°, t=(1,2), med R p_B, translasjon, p_A≈(0.2929,5.5355) og inverskontroll. Assessment 1.1 beholder krav og alle fem løsningsdeler, med direkte lenker til Q4/Q5.

Tidligere konkrete pilotrettelser er beholdt: figurutsnitt ved ytterverdier, separate aksepiler, B-etikett, uavhengig aktiv/fullført-status, sidebarhøyde og samtidig bytte av papir/blekk ved temabytte. Tidlige screenshots er ikke sluttbilder av denne leveransen.

## Fase 2 — kursstruktur og rolig leseflate på hele EGB339

- Studieshell ligger nå én gang i EGB339s layout og gjelder alle 69 adresserbare EGB339-sider.
- Hovedsiden er en kronologisk syllabus med utvidbare uker, temaer, assessments og progresjon. `/egb339/studieplan` er beholdt som egen inngang til samme kursplan.
- Sidebaren viser alle ukene og deres pensumkoblede assessments. Aktiv uke åpnes, aktuell side markeres, og fullføring vises separat. Ved assessment med flere pensumuker åpnes første relevante uke, ikke alle samtidig.
- 31 primærleksjoner følger kuratert rekkefølge, også over ukegrenser. Fem referansesider og to tidligere fagkart er beholdt i fagregisteret; ingen av de 38 temaene er slettet.
- Ukeartiklene har ukens leksjoner, originalt ukeinnhold, oppgaver/løsninger, laboratorium og assessment-lenker. Den generiske ekstra «Arbeidsmåte»-sidekolonnen er fjernet.
- Tema-, assessment- og ressursartikler bruker breadcrumb, lesebredde, tydelig hovedoverskrift og fullføringskontroll etter innholdet.
- Alle 38 oppgaver og 12 assessment-gjennomganger / 51 løsningsdeler er beholdt. Løsningsankere og progresjonsnøkler er uendret. Alle assessment-deler bruker samme åpningsbare løsninger og deep-link-håndtering.
- Hurtigarket bruker EGB339s egen formelkomponent med forklaring og vanlige feil inline i en disclosure, ikke en modal. Alle eksisterende formler og forklaringsdata i hurtigarket er bevart.
- En eksplisitt liste med 36 matematiske uttrykk gjør viktig kodenotasjon om til KaTeX. Den genererte vault-dataen endres ikke; ukjent notasjon og Python-kode/fences beholdes.
- Kursplanens hash-lenker åpner aktuell uke. Ferdig leseløp får en tydelig sluttstatus i stedet for en forsvunnet «neste»-melding.

### PoseLab 2D

Én gjenbrukbar lab med to forsøk:

1. Punkt og ramme: QUT-presettet, rotasjon, translasjon, matrise, punktkoordinater og separat A/B-koordinatbeskrivelse. A/B-knappene holder geometrien fast; rammekontrollene flytter faktisk geometrien.
2. Komposisjon: bokas T_A=(30°,1,2) og T_B=(0°,2,1), begge operatorer kan endres. T_A T_B og T_B T_A viser forskjellig mellomramme/sluttramme, matriser, rotasjon av relativ translasjon og høyre-faktor-først på et punkt. Bokas origoresultater er (2.2320508,3.8660254) og (3,3).

Samme SE(2)-lab brukes i leksjonen og uke 2–3. Uke 3s lab er eksplisitt merket som 2D-grunnlag, ikke en 3D-visualisering.

## Fase 3 — én parameterisert 2R-robot for FK og IK

Den gamle fastdimensjonerte FK-widgeten er erstattet med ett samlet laboratorium:

- Endre begge leddvinklene og begge lenkelengdene.
- Se lenker, verdensramme 0, albueramme 1 og enderamme 2=E.
- T01, T12 og T0E oppdateres fra samme modell. Hover på matrisen eller fokus/klikk på den tilhørende, navngitte knappen fremhever relevant lenke/ramme. Kontrollen og det tilgjengelige matematiske innholdet er skilt etter slutt-QA.
- FK viser både matriseprodukt, trigonometriske formler, lenkebidrag og numerisk posisjon/orientering.
- IK har flyttbart mål, tastaturstyring, koordinatkontroller, begge grener og en stiplet alternativ arm.
- Arbeidsrommet er ringen |L1−L2| ≤ r ≤ L1+L2. Utilgjengelige mål blir stående og merkes som uløselige; armen beholder siste gyldige konfigurasjon.
- Rett/foldet grensekonfigurasjon merkes singulær. Like lenker med mål i origo behandles som uendelig mange skuldervinkler, ikke en tilfeldig atan2(0,0)-fasit.
- QUTs tre mål (5,7), (5.347,10.297), (10.508,−2.925) kan lastes inn.
- FK/IK-leksjonene har teori → modell → lab → fullstendig regneeksempel → prøv-selv/løsning → kurs-/assessment-kobling.
- Uke 4–5 bruker samme lab, med FK henholdsvis IK som startmodus.

Modellen bruker høyrehendte rammer, kolonnevektorer og radianer internt. Kontrollene viser grader. q2 er relativ til lenke 1. Det er **posisjons-IK**, ikke samtidig fritt valg av posisjon og orientering. Ingen kollisjoner, motorgrenser eller Dobot-sikkerhetsmodell påstås.

QUT uke 4s RPR-kjede og ulike Dobot-modeller beholdes separat. 2R-eksemplet er en FK-kontroll av uke 5s kildeoppgave, ikke feilaktig merket som uke 4s offisielle robot.

## Sider som fikk ny presentasjon

- `/egb339`, `/egb339/studieplan`, `/egb339/uker`
- Alle åtte `/egb339/uker/uke-N`
- `/egb339/temaer` og alle 38 temasider; SE(2), FK og IK har den mest omfattende pedagogiske utvidelsen
- `/egb339/vurderinger` og alle 12 vurderingssider
- `/egb339/ressurser` og alle fire ressursguider
- `/egb339/oppsummering`

## UI-mønstre som er fjernet eller redusert

- Stor gradient-hero og oversiktsdashboard → kort innledning og kronologisk syllabus.
- Like kort med ikon/heading/tekst → skannbare rader eller sammenhengende artikkel.
- Oppgavekort inni løsningskort inni fasitkort → nummerert oppgave med én disclosure og tydelig fasit.
- Assessment-badges, tykke fargekanter og generiske «Øv aktivt»/«Forstå fremgangsmåten»-overskrifter → faglige overskrifter og korte metadata.
- Dekorative callout-bokser → ordinær tekst. Spesifikke titler, kildeavvik og nødvendige advarsler beholdes.
- Formelmodaler på hurtigarket → inline forklaring. Shared FormulaBox er ikke endret.
- Primær progresjonsboks før lesingen → status i navigasjon og fullføring ved slutten.
- Kortaktig Forrige/Neste → to tydelige tekstlenker.
- Tutor-puls/glød på EGB339 → rolig knapp; tutorfunksjonen er bevart.

Gamle ubrukte EGB339-nav-/demo-komponenter ligger foreløpig i repoet, men rendres ikke av de nye sidene. Kildespesifikke statiske oppgavefigurer er beholdt. Det er ikke gjennomført en unødvendig totalomtegning av hver figur.

## Design- og CSS-avgrensning

`src/app/egb339/pilot.css` beholder navnet fra piloten, men er nå EGB339s studiesystem. `.egb339-pilot` og `.egb-pilot-*`/scopede `.egb-study-*` avgrenser reglene.

- Papir: #f7f8f7 / #151817; blekk: #202824 / #e5ebe7.
- Aksent: #24654c / #91cbb0; sekundær diagramfarge: #914612 / #ebb382.
- 740 px normal lesebredde, 17 px artikkeltekst, linjehøyde 1.7, 4 px kontrollradius.
- Desktop-shell opptil 1440 px; bred matematikk/figur-blokk er det bevisste unntaket fra artikkelbredden.
- Farge er ikke eneste bærer av mening: aksenavn, heltrukken/stiplet geometri, aktiv side og tekststatus.
- Ingen ny frontend-dependency, 3D-motor, ekstern fonttjeneste eller nye bildeassets.

Andre fags sider, global CSS og package.json/package-lock er ikke endret. Slutt-QA krevde tre avgrensede delte rettelser: lesefeilstatus i ProgressProvider, HTTP 503 ved utilgjengelig progresjonsdatabase og EGB339-spesifikt tilgjengelig navn på tutor-knappen. Headerens kontrast justeres bare gjennom EGB339-scopede tokens. Header- og tutorfunksjonen beholdes.

## Faktisk kildebruk

### Robotics Toolbox

Lest og fulgt repoets AGENTS.md og den refererte felles RVC-AGENTS.md. Ingen endringer i RTB-repoet.

Checkout: `/home/skjold/dev/git/robotics-toolbox-python`, commit `2d24e0d8f75c15bd7937f78347b876b0d51d7cf4`.

Brukt aktivt:
- `src/roboticstoolbox/models/ETS/Planar2.py`
- `src/roboticstoolbox/models/DH/Planar2.py`
- `src/roboticstoolbox/ets/ETS2.py`: fkine/eval, ordnet ET-produkt
- `src/roboticstoolbox/robot/DHRobot.py`: fkine og rammetransformer
- `src/roboticstoolbox/backends/PyPlot/PyPlot2.py`: like aksemål, robot/endeframe-oppdatering
- SpatialMath SE2: komposisjon kontrollert ved faktisk kjøring

Den lokale checkouten ble bygget som pure-Python wheel og installert **kun** i `/tmp/egb339-reference-ztQoFD/venv`. Versjoner: RTB 1.4.2, SpatialMath 1.1.17, NumPy 2.5.3. Ingen frontend-avhengighet eller RTB-kildeendring.

`scripts/egb339-rtb-reference.py` genererer 18 testtilfeller med ET2-kjeden, kryssjekket mot en separat DHRobot-modell, og kontrollerer begge leverte Planar2-modellene. Resultatene er lagret i `scripts/fixtures/egb339-rtb-reference.json`; JavaScript-validatoren sammenligner frontendens tre matriser med dem.

### Bok

Peter Corke, *Robotics, Vision and Control*, tredje utgave, Python (2023).

- Markdown: `/home/skjold/ObsidianVault/EGB339/books/Robotics, Vision and Control - MARKDOWN.md`
- PDF: `/home/skjold/ObsidianVault/EGB339/books/Robotics, Vision and Control - ORIGINAL.pdf`

Brukt kap. 2.2.2.1, trykt s. 37–40 / PDF 61–64, særlig figur 2.12 og komposisjon; kap. 7.1.1, s. 257–259, figur 7.4/7.5 og R(q) Tx(l)-kjeden; kap. 7.2.1, s. 278–281, to IK-grener og FK-verifikasjon. Markdown var søke-/tekstgrunnlag; PDF-figurer og ligningslayout ble visuelt kontrollert. Sidenummer fra tidligere skjermbilder ble kontrollert mot trykt sidenummer, ikke ukritisk beregnet med ett offset for hele boka.

### QUT og eksisterende innhold

- Week 2 tutorial PDF-side 17 og den eksisterende fasitkontrollerte `w2-pose`.
- `sources/Week 4 - Forward kinematics.md`, tilhørende tutorial/practical/fasit og nettstedets eksisterende `w4-planar-chain`/Dobot-utledninger.
- `sources/Week 5 - Inverse kinematics.md`, `raw/week5-inverse-kinematics/Tutorial - Inverse Kinematics.pdf`, særlig side 16–17. Side 17 ble lest og figuren kontrollert visuelt: relative q1/q2, L1=5, L2=7 og de tre målene.
- Eksisterende `w5-two-link-ik`, `w5-two-link-targets` og assessment 1.1/1.3/1.4.
- Ingen separat offisiell uke 5-fasit funnet lokalt. Den nye mellomregningen er merket egen utledning og kontrollert via FK, ikke feilaktig presentert som QUT-fasit.

## Skills og MCP-er i implementeringsfasen

Dette er implementeringsloggen. Den senere aktive Taste-/Impeccable-/Diagram Design-reviewen med screenshots og full Playwright-dekning er dokumentert i slutt-QA-rapporten.

- Taste Skill: brukt på implementeringsvalg — leseflate, innholdstetthet, typografi, lav visuell støy og fjerning av kort-/gradientmønstre. De markedsføringsrettede reglene er ikke brukt som mal for et kursverktøy.
- Impeccable: context-launcher, new-work/craft-floor og avgrenset statisk detector. Detectoren fant én gjenværende `border-l-4` i Markdown-rendereren; den er fjernet. Ingen sluttgodkjenning fra visuell reviewer påstås.
- Diagram Design: semantiske roller/tokens, like målestokker, rammenavn, entydig retning, lesbare etiketter og identifikasjon utover farge. Geometriske robotlinjer følger matematikken, ikke et ortogonalt flytdiagramrutenett.
- PDF-skill: kontroll av originale figurer og matematisk layout; PyMuPDF i det isolerte referansemiljøet, siden pdftoppm ikke var installert. Ingen Markdown-konvertering nødvendig.
- Playwright-skill/CLI: kun kort implementerings-sanity etter brukerens endrede arbeidsflyt; ingen ny screenshotrunde.
- `codex mcp list --json`: 21st, context7, github, openaiDeveloperDocs er konfigurert. Output ble begrenset til navn/status uten hemmelige argumenter.
- Context7 MCP ble faktisk brukt til offisiell React-dokumentasjon for pointer events/capture i målpunktstyringen.
- Ingen Blender-, 21st-generering eller ny 3D-integrasjon: SVG løser fase 1–3 uten at dekorative robotassets eller WebGL gir ekstra faglig verdi.

## Automatiske kontroller

| Kontroll | Resultat |
|---|---|
| TypeScript, `npx tsc --noEmit --incremental false` | Bestått |
| `npm run validate:egb339` | Bestått: 62 oppføringer, fire track-tokenfamilier, 38 oppgaver, 12 assessments / 51 deler, 1 136 eksisterende matteuttrykk, ruter og ankere |
| `node scripts/validate-egb339-solutions.mjs` | Bestått: 133 eksisterende numeriske kontroller |
| `node scripts/validate-egb339-pilot.mjs` | Bestått: kursdekning, 5 776 SE(2)-konfigurasjoner, scoped CSS og teksttokenkontrast minst 5,99:1 |
| `node scripts/validate-egb339-study.mjs` | Bestått: 18 uavhengige RTB/DH-fixtures, 12 321 FK/IK-konfigurasjoner, 333 185 numeriske assertions, grense-/ugyldighetskontroller, 36 formatteringer, 52 statiske TeX-uttrykk og 69 adresserbare sider |
| `git diff --check` | Bestått |
| `npm run lint` | Eksisterende script er ikke brukbart: `next lint` tolkes som prosjektmappen «lint» i denne Next-versjonen. Ikke rapportert som bestått |
| `npm run build` | Bestått med vanlig Turbopack: kompilering, TypeScript og generering av 618/618 statiske sider |
| Generert produksjons-HTML | Alle 69 EGB339-sider har én H1 og én sidebar, ingen KaTeX-feil; alle 51 assessment-løsningsankere finnes. DAT107/DAT109/DAT110 har ikke EGB339-shell. Dette er en statisk kontroll, ikke nettleser-QA |

## Enkel funksjonssjekk — ikke slutt-QA

`output/playwright/egb339-pilot/phase3-sanity.js` / `phase3-sanity-result.json`:

- Hovedside, IK, SE(2) og Assessment 1.3 svarte HTTP 200.
- Én H1 og én kurs-sidebar per side; ingen KaTeX-feil eller dokument-overflow i de fire kontrollerte visningene.
- IK kontrollert ved 1280×900, øvrige sider ved 1440×1000.
- Andre IK-gren, alternativ stiplet arm, utilgjengelig mål, reset, matrise-fokus og FK-slider fungerte.
- FK-residual for den andre IK-grenen: ca. 8,9×10⁻¹⁶.
- SE(2)-komposisjon ga forventet x=2.2320508 for AB og x=3 for BA.
- Ingen page errors, mislykkede requests eller HTTP-feil i den vellykkede avgrensede kjøringen. Loggen hadde heller ingen console errors/warnings i dette intervallet.
- En første kjøring avdekket siste-bit-forskjell mellom Node og Chrome i SVG-polyline-koordinater. Tegningskoordinater avrundes nå til seks desimaler, mens robotmatematikken beholder full presisjon. Ny kjøring hadde ikke hydration-advarselen.
- Stop av devserver for produksjonsbygg ga forventede HMR-disconnects etter testen; de er ikke applikasjonsfeil.
- Ingen progresjonsskriving i sanity-kjøringen. Tidligere progresjonstester brukte kun in-memory-fixture.

## Slutt-QA og kjente begrensninger

1. **Samlet desktop-QA er fullført:** alle 69 ruter ved 1440×1000 og 1280×900, begge temaer; alle 38 oppgaver og 51 assessment-løsningsdeler, navigasjon, deep links, overflow og progresjon. Feil ble rettet og retestet. Ingen kjente blokkerende EGB339-feil gjenstår.
2. SE(2), komposisjon og FK/IK har 254 beståtte labkontroller, inklusive drag/pointercancel, tastatur, slidergrenser, begge IK-grener, singulariteter og FK-verifikasjon. Dette er systematisk edge-case-dekning, ikke en påstand om testing av alle kontinuerlige tilstander.
3. Progresjonens faktiske databasevarighet er ikke verifisert lokalt. UI, request-kontrakt og feiltilstander er testet i isolert fixture uten ekte bruker-/produksjonsmarkeringer. Feilet refresh og databasefeil håndteres nå eksplisitt, uten falsk tom fremgang.
4. Nye samlede QA-scripts, resultater og screenshots ligger i `output/playwright/egb339-final-qa/`. Taste/Impeccable-review og sluttstatus er dokumentert i den separate slutt-QA-rapporten; de gamle pilot-auditene er historikk, ikke gjeldende akseptansekriterier.
5. Det finnes kildebegrensninger/åpne praktiske oppgaver i eksisterende assessments. Merknadene er bevart; ikke fylt med oppdiktet fasit.
6. SO(3)/SE(3) har forbedret artikkelpresentasjon, men ny interaktiv 3D-pose, Jacobian-hastighetsvisning, motion planning og vision-workbenches tilhører senere faser og er ikke startet.
7. Et matematisk 2R-arbeidsrom er ikke et sikkerhetsløfte for fysisk robot.
8. Lint-scriptet ligger utenfor EGB339 og er ikke endret. Builden har to ikke-blokkerende varsler: eksisterende `middleware` → `proxy`-konvensjon, og Turbopacks brede NFT-filsporing via `next.config.ts` → `akseptert-source.ts` → `/akseptert/magi/webhooks`. Ingen av dem er en EGB339-kompileringsfeil; de er ikke rettet ved å endre andre deler av prosjektet.

## Filer og vern av eksisterende arbeid

Endret: EGB339s route-layout/oversikter/detaljsider/hurtigark; EGB339Markdown, Egb339WeekProblems, Egb339AssessmentSolutions, Egb339EntryNav og PlanarArmExplorer. Den tidligere pilotendringen i Egb339Nav er beholdt.

Nye: pilot.css, studieplan-rute, pilot-komponenter (shell, nav, progress, math, formeloppslag, SE2, komposisjon, FK/IK-leksjon), kursmetadata/-loader, SE2-/2R-matematikk, matteformatteringer, validatorer, RTB-fixturegenerator/-data og disse rapportene/QA-artefaktene.

Uendret: alle fire genererte EGB339-innholdsfiler, faglige eksisterende problem-/assessment-datamoduler, shared FormulaBox, global CSS, avhengighetsfiler, Obsidian og RTB-repoet.

Unrelated eksisterende endringer i `.gitignore`, `src/components/home/StudyPlanRoadmap.tsx`, `src/lib/study-plan.ts` og andre rapporter er ikke rørt. De skal ikke tas med i en senere EGB339-commit.

**Implementeringen går ikke videre til fase 4. Neste steg er avgrenset commit/deploy når brukeren ber om det, deretter kort production smoke — ikke bredere funksjonsutvikling.**
