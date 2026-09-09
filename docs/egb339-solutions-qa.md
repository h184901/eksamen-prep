# EGB339 – løsningsforslag og QA

Dato: 2026-09-09. Rapporten dokumenterer lokal QA før commit og push.

## Omfang og resultat

Alle 36 eksisterende oppgavekort for uke 2–8 er gjennomgått og utvidet med
fremgangsmåte, mellomregninger, begrunnelser og kontrollpunkter. To practical-kort
gjenbruker warmup-gjennomgangen, slik at uke 2 og 3 også dekker sine practicals.
Totalt: 38 ukekort. Alle 12 eksisterende vurderingssider har fått en gjennomgang,
med totalt 51 deler. Delspørsmål er beholdt inne i de opprinnelige oppgavekortene.

| Uke | Kort | Dekning |
|---|---:|---|
| 2 | 8 | Skalarprodukt, matriseprodukt, transponering, invers, 2D-rotasjon/pose og practical Q1–Q7 |
| 3 | 4 | 3D-rotasjoner, homogene transformasjoner, posegraf og practical Q8–Q15 |
| 4 | 6 | Kinematiske kjeder, plan FK og fire simulator-practicaloppgaver |
| 5 | 3 | Utledning av 2R-IK, alle mål/grener og prismatisk–roterende IK |
| 6 | 4 | Derivasjon, Jacobian, differensiell bevegelse og singularitet |
| 7 | 5 | Kartesiske/leddveipunkter, hastighetsprofil og avstand til lenker |
| 8 | 8 | Alle åtte bilde-practicaloppgaver, med kjørbare Python-eksempler |

Assessment 1.0–1.7, 2.1, 2.2 og de to vurderingsoversiktene er inkludert.
Vurderingsuke og relevante pensumuker vises separat. De senere vurderingene 1.6
og 1.7 er tatt med fordi de bygger på uke 3/8; dette er uttrykkelig merket.
Oversiktene forklarer arbeidsflyt, kontroll og vekting, ikke fiktive regneoppgaver.

Løsningene bruker eksisterende Markdown/KaTeX-komponent, farger og native
`details`-kontroller. Ny vurderingskomponent gir deloverskrifter, pensumlenker,
kildegrunnlag og markering av manglende kildedetaljer. Ukeoversikten peker til
relevante vurderingsgjennomganger. Eksisterende progresjonsnøkler er uendret.

## Kildegrunnlag og faglig kontroll

Originalmaterialet er lest fra `EGB339/raw` i det lokale Obsidian-hvelvet, uten
å endre hvelvet eller publisere PDF-er, arkiver eller studentinnleveringer.
Matematiske figurer og bildeflater er også kontrollert visuelt i renderte PDF-er.
Oppgavetekst, QUT-fasit, offentlig test og egen utledning skilles fra hverandre.

- Uke 2–4: tutorial-PDF-er med QUT-løsningsark, Python-/NumPy-practical og
  Week 4 Prac. Grader/radianer og callback er kontrollert i det opprinnelige
  `assignment_2_1_robotics.zip`, ikke brukt som en simulator-runtime-test.
- Uke 5: tutorialens oppgavetekster/figurer. Ingen egen QUT-løsnings-PDF funnet;
  begge IK-grener er regnet ut og satt tilbake i FK.
- Uke 6–7: tutorial-PDF-er og QUT-løsningsark. Derivater er i tillegg kontrollert
  med numeriske differanser; Jacobian mot FK-differanser.
- Uke 8: original practical-PDF og det utdelte `highway.jpg`. Bildestørrelse,
  pikseltall, histogram og profiler er målt, ikke anslått fra en skjermdump.
- Assessments: de enkelte oppgave-PDF-ene samt tilgjengelige originale
  startfiler/offentlige tester. 2.1 bruker oppdatert oppgavetekst fra 2026-09-07.
  2.2 bruker både tastaturfoto og målsatt figur; dette er et annet tastatur enn
  simulatorens QWERTY-bilde. Offentlige type-/formtester er ikke kalt tallfasit.

API-detaljer er kontrollert mot primærdokumentasjon:
[Machine Vision Toolbox-indeksering](https://petercorke.github.io/machinevision-toolbox-python/stubs/machinevisiontoolbox.Image.__getitem__.html)
bruker `(u,v)`, mens NumPy bruker `[v,u]`;
[SciPy fmin](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.fmin.html)
dokumenterer full returstatus og toleranser. Testavhengigheter er installert i
en isolert `/tmp`-venv, ikke i nettstedets avhengigheter.

### Rettelser og viktige presiseringer

| Sted | Kontrollert resultat / presisering |
|---|---|
| Uke 2, transponering e | QUT-arket har feil i ett element. Riktig midtrad er `[1,2]`. Nettstedets korrekte svar er beholdt, avviket forklart. |
| Uke 3, rotasjon del 5 | QUTs vinkeletikett og matrise er inkonsistente. Matrisen stemmer med oppgavens positive pi/4. |
| Uke 4, plan kjede | To rotasjonsledd og ett prismatisk ledd, ikke «tre rotasjonsledd q1,q3». |
| Uke 4, teach | PDF sier bevegelse ved slipp; startarkivet har verdiendrings-callback. Forklarer versjonsavviket og grader → radianer før FK/API. |
| Uke 5, PR-mål `(0,9.899)` | Avrundingen gir to reelle løsninger, omtrent `(6.929654,1.560797)` og `(7.069646,1.580796)`. Idealmålet `(0,7√2)` gir den sammenfalte løsningen. |
| Uke 5, 2R-mål 3 | Korrigert avrunding av andre skuldervinkel til 0.2426. |
| Uke 6, derivasjon | Retter manglende faktor 2 i kjerneregelen og manglende x² i `36x²+16` i QUT-arket. |
| Uke 6, differensiell FK | Eksakt posisjon er `(1.77422122,10.73130144)`, ikke QUTs `(1.114,10.731)` eller nettstedets tidligere 1.1137. Lineær tilnærming vises separat. |
| Uke 6, invers Jacobian | Riktig leddhastighet er `(0.28284271,-0.42569986)` rad/s; QUTs trykte verdier er faktor 10 for små. |
| Uke 8 | Presise sidehenvisninger, histogramtopp 100 med 47 729 piksler, kopiering før redigering, eksplisitt uint8-konvertering og originalformelen `(u²+v²)/200`. |
| Dobot-assessments | Separate offsetkonvensjoner for 1.3, 1.4, simulator og fysisk robot. Ingen blind gjenbruk av L3/L4. |

Feil i QUT-løsningsark er synlig merket «QUT-fasit med forklart rettelse».
Korrekte eksisterende svar er ellers beholdt og forklart mer grundig.

## Automatiske kontroller

| Kontroll | Resultat |
|---|---|
| `npm run validate:egb339` | Bestått: 62 publiserbare poster, fire temaer, 38 oppgaver, 12 vurderinger / 51 deler, 1136 matematiske uttrykk, ruter og løsningsankre. |
| `node scripts/validate-egb339-solutions.mjs` | Bestått: 133 numeriske kontroller, inkludert faktiske bildepiksler. |
| `npx tsc --noEmit --incremental false` | Bestått. |
| `git diff --check` | Bestått. |
| Python-kontroll av faktiske kodeblokker | 50 blokker syntakskontrollert; 436 numeriske assertions samt funksjons-/returtypekontroller bestått. |
| Faktisk Machine Vision Toolbox-kjøring | Alle åtte uke-8-blokker kjørte; bildeinnlesing, utsnitt, histogram, kopibevaring, metning og syntetiske bilder kontrollert. |
| `npm run lint` | Ikke bestått: prosjektets eksisterende `next lint` tolkes som en prosjektmappe av installert Next-versjon. Lint-oppsettet er ikke endret i denne oppgaven. |

Python-kontrollen omfatter blant annet tilfeldige FK/mapping-stillinger, 32
geometriske IK-mål, åtte fmin-løsninger, QUTs fargebilde `(42,34,52)`, homografier
med ulike skalaer og alle 27 fysiske tastmål i to høyder (kun geometri).
Den isolerte bildekjøringen bruker Machine Vision Toolbox 2.4.0 med Matplotlib
Agg. GUI-vinduer og interaktiv bildeinspeksjon i Python er ikke testet.

Regresjonsskriptet kontrollerer utvalgte publiserte tall med uavhengige
beregninger; det er ikke et bevis for hvert naturlig språkutsagn eller QUTs
private tester. Kildegjennomgang og visuell kontroll kommer i tillegg.

## Playwright og manuell visuell kontroll

Chromium via Playwright CLI, lokal Next-server på `127.0.0.1:3100`, desktop
1440×1000 og 1280×900. Det finnes ikke en X-server i miljøet; derfor ble headless
Chromium brukt og skjermbildene deretter inspisert visuelt.

- Alle sju ukesider og alle tolv vurderingssider: 38 side/bredde-kombinasjoner.
- Alle 89 løsningskontroller åpnet og lukket i begge bredder: 178 sykluser.
- 75 unike lenkemål over 61 destinasjonsruter: HTTP 200 og gyldige ankre.
- Ingen KaTeX-feil, horisontal sideoverflow, hydration- eller runtime-feil.
- 38 hovedskjermbilder samt ekstra interaksjonsbilder. Representativ visuell
  kontroll av alle sju uker, 3D-matriser, geometrisk IK, warmup-kildevarsel,
  fysisk tastatur, simulatorgeometri og bildekode.
- Faktisk klikk fra uke 5 til vurdering 1.4s løsningsanker. Enter åpner og
  mellomrom lukker; fokusramme er synlig i både mørkt og lyst tema.
- Progresjon på uke 6 og assessment 1.4: merk fullført, reload, angre, reload.
  Eksisterende `qa-check`-konto brukt; alle testmarkeringer fjernet. Hele
  progresjonsresponsen er sammenlignet med baseline og er identisk etterpå.

### Console/network og miljøbegrensninger

Første gjennomgang fant én HTTP 400 fra lokal `/_next/image` for det uendrede
highway-bildet, med tilhørende console error. Autentisert lokal bildefil og
produksjonens optimaliserte bilde svarer begge 200. Dette samsvarer med at den
lokale optimizerens interne forespørsel til en beskyttet bildefil ikke får en
gyldig brukersesjon; middleware og bildekomponent er uendret i denne oppgaven.

I oppfølgingskontrollen ble bare dette bildeoptimizer-kallet routet til den
fungerende produksjonsvarianten. Bildet dekoder og vises korrekt. Dette er en
testtilpasning, **ikke en implementert løsning på den lokale HTTP-feilen**.
Slutt-auditen gjentok alle 19 sider / 178 sykluser med denne tilpasningen og
rapporterte null console-, runtime-, HTTP-, request-, layout-, matte- eller
lenkefeil. Advarslene i den separate interaksjonskontrollen er beskrevet nedenfor.
Progresjonskall gikk mot det eksisterende produksjons-API-et med QA-kontoen;
innhold og komponenter ble servert lokalt. Ingen produksjonshemmeligheter ble
kopiert til prosjektet.

Ved tvungen scrolling til highway-bildet kommer en utviklingsadvarsel om LCP og
`loading="eager"`. Bildet er normalt langt under folden, så det er ikke endret
til eager bare for å fjerne advarselen. Next-serveren har også sin eksisterende
deprecation-advarsel for `middleware` → `proxy`. Ingen app-runtime- eller
hydration-feil ble funnet. Dette er ikke en null-advarsler-rapport.

Lokale testfiler og bilder ligger under `output/playwright/egb339-solutions-*`.
Første audit, oppfølgingsinteraksjoner og slutt-audit beholdes som separate
resultater. De er QA-artefakter, ikke publiserbart kursinnhold.

## Det som fortsatt krever kilder / annen verifikasjon

- **Warmup Q1, Q4 og Q10:** PDF-en mangler henholdsvis uttrykk, samlingskrav og
  NumPy-uttrykk fra docstringen. `assignment1_0.py` / `assessment1-0.zip` ble ikke
  funnet. Mekanismen forklares, men en eksakt oppgaveløsning kan ikke ferdigstilles
  uten startfilen. Q3 har i tillegg uklar grenseordlyd; begge tolkninger er forklart.
- Det finnes ikke fullstendige lokale detaljer for de senere prosjektdelene 2.3
  og 2.4. Oversikten og forbindelsen til pensum er forklart, ikke oppdiktet kode.
- Ingen private QUT-tester, fysisk robot, CoppeliaSim-kjøring, kollisjonskontroll
  eller fysisk kalibrering er utført. Praktiske løsninger sier hva studenten må
  måle og kontrollere; de påstår ikke at et bestemt sceneoppsett er verifisert.
- Full produksjonsbuild/deploy, mobil-QA, ny lint-konfigurasjon og generell
  shared-theme/auth-opprydding er bevisst utenfor denne innholdsrunden.

## Filer i endringen

- `src/lib/egb339-problems.ts`
- `src/lib/egb339-assessment-solutions.ts` (ny)
- `src/components/egb339/Egb339WeekProblems.tsx`
- `src/components/egb339/Egb339AssessmentSolutions.tsx` (ny)
- `src/app/egb339/uker/[slug]/page.tsx`
- `src/app/egb339/vurderinger/[slug]/page.tsx`
- `scripts/validate-egb339-ui.mjs`
- `scripts/validate-egb339-solutions.mjs` (ny)
- `scripts/lib/egb339-content-loader.mjs` (ny)
- `docs/egb339-content-workflow.md`
- `docs/egb339-solutions-qa.md` (ny)

Generert vault-JSON, progresjonslagring, annen fagkode og eksisterende lokale
endringer i `.gitignore`, `StudyPlanRoadmap.tsx`, `study-plan.ts` og øvrige
rapporter er ikke endret av denne oppgaven.
