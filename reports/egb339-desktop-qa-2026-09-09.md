# EGB339 – desktop-QA og rettelser

Dato: 9. september 2026. Rapporten dokumenterer desktop-QA før commit og push. Produksjonsmålingene under «før» gjelder versjonen før rettelsene; etterkontrollene gjelder den lokale koden.

Lenkene til `output/playwright/` viser lokale QA-artefakter som ikke inngår i committen.

[Komplett kodediff](../output/playwright/egb339-qa-review.diff) · [Før: feil Pose-kort](../output/playwright/egb339-qa-before-kinematics-1440.png) · [Etter: fire konsistente spor](../output/playwright/egb339-qa-final-tracks-dark-1440.png)

## Rotårsaken til Pose-fargen

Reprodusert med Playwright på `https://eksamen-prep.vercel.app/egb339`, innlogget med den eksisterende brukeren `qa-check`, ved 1440 × 1000 og aktiv mørkmodus.

`EGB339_TRACKS` i `src/lib/egb339.ts` inneholder klassene som brukes både av oversiktskortene og overskriftsflatene i kunnskapskartet. Tailwind-konfigurasjonen skannet bare `src/pages`, `src/components` og `src/app`. Dermed ble klasser som bare forekom i spordataene, utelatt fra CSS-en.

For Pose og kinematikk fantes `dark:bg-robotics-950/30` i DOM-ens klasseliste, men ikke i produksjonens CSS. Den lyse klassen `bg-robotics-50/70` forekom også i andre komponenter og ble generert. Derfor vant den også i mørkmodus. De øvrige sporenes mørke bakgrunnsklasser forekom tilfeldigvis i skannede filer og virket.

| Flate | Før, computed background | Etter, computed background |
| --- | --- | --- |
| Verktøy og grunnlag | `rgba(8, 47, 73, 0.25)` | Samme |
| Pose og kinematikk | `rgba(236, 254, 255, 0.7)` | `rgba(8, 51, 68, 0.3)` |
| Bevegelsesplanlegging | `rgba(69, 26, 3, 0.25)` | Samme |
| Robot vision | `rgba(74, 4, 78, 0.25)` | Samme |

Rettelsen legger den konkrete metadatafilen til Tailwinds `content`-liste. Ingen tilfeldig mørk farge eller CSS-overstyring er lagt på Pose-kortet. En regresjonskontroll bekreftet også at originalkonfigurasjonen fortsatt utelater klassen, mens den korrigerte konfigurasjonen genererer den.

## Andre funn og endringer

| Funn | Endring |
| --- | --- |
| Seksjonsmenyens `scrollIntoView()` kunne flytte dokumentet etter navigasjon og overstyre `#kinematics`. | Menyen scroller nå bare sin egen horisontale akse, og bare når innholdet faktisk er bredere enn menyen. |
| Fire spor, men generisk turkis identitet på alle temadetaljer og hover på temakort. | Temahoder bruker sporets eksisterende bakgrunn/accent. Kort har tilsvarende hover-borders. Nummerering og kortstruktur er konsekvent. |
| Svakt eller ujevnt tastaturfokus. | Felles, tydelig fokusmarkering innen EGB339, også for sliders og løsningspaneler. |
| Lang vei mellom spor og fra uketeori til oppgavene. | Fire sporlenker øverst i kunnskapskartet, tilbake-lenke til riktig spor i temasidens brødsmuler, og ukesnarveier til innhold, oppgaver og relevant laboratorium. |
| `[!definition]` i 16 temasammendrag. | Markøren fjernes ved visning via sammendragsfunksjonen. Kildedata og fagtekst er bevart. |
| Fire KaTeX-feil i uke 3–6; feil avgrensning kunne også sluke påfølgende tekst. | Fem flerlinjers formelblokker har nå `$$` på egne linjer. Matematikken og svarverdiene er uendret. |
| Løsningspanel sa «Vis» også når det var åpent. | Viser «Skjul løsning og fasit» når panelet er åpent. |
| Formelmodal slapp Tab-fokus ut på siden bak og hadde gjennomskinnelig mørk bakgrunn. | Fokus holdes i dialogen. Escape, lukkeknapp, bakgrunnsklikk og fokusretur beholdes. Tidligere scrollstil gjenopprettes. Mørk modal har nå ugjennomsiktig nøytral temaflate. |
| Gyldige sliderverdier kunne flytte robotledd eller transformasjonspunkt utenfor SVG-utsnittet. | Felles utsnittsberegning holder geometrien synlig og bevarer diagrammets sideforhold og layouthøyde. |
| Dempet tekst på lys sidebakgrunn målte 4,35:1. Små hvite tekster på turkis 600 var også for svake. | EGB339 bruker nøytral 600 for dempet tekst i lyst tema og beholder nøytral 400 i mørkt tema. Emnebadge og ukenumre bruker turkis 700. |
| Native skjemakontroller brukte lyse spor i mørkmodus. | `color-scheme: dark` er satt innen EGB339. |
| Hurtigarkets primærlenke manglet synlig fargeendring ved dark-mode-hover. | Samme mørkmodus-hover som oversiktens primærhandling. |

## Testdekning

Produksjonsgjennomgangen besøkte alle **68 ruter** ved 1440 × 1000. Den endelige lokale gjennomgangen besøkte de samme 68 rutene ved **1440 × 1000 og 1280 × 900**, totalt **136 side-/breddekontroller**:

- `/egb339`, `/egb339/temaer`, `/egb339/uker`, `/egb339/vurderinger`, `/egb339/ressurser`, `/egb339/oppsummering`.
- Alle 8 ukesider, inkludert oppgaver og løsningsforslag.
- Alle 38 temadetaljer: 6 grunnlag, 20 kinematikk, 4 bevegelse og 8 vision.
- Alle 12 vurderingsdetaljer og 4 praktiske guider.

For hver side kontrollerte nettlesertesten HTTP-status, aktiv seksjonsnavigasjon, hovedoverskrift, dokumentbredde, utstikkende innhold, utilsiktede lyse flater, KaTeX-feil, lastede bilder og interne EGB339-lenker. Viktige sider og de fire sporene ble også kontrollert visuelt med screenshots.

Interaksjonskontroller:

- Alle fire kunnskapskort: hover, tastaturfokus, Enter-navigasjon og riktig ankerlandingspunkt ved begge desktopbredder.
- Alle 36 løsningspaneler åpnet og lukket; ingen KaTeX-feil eller sideoverflow i åpne løsninger ved 1280 × 900.
- Alle ni formelmodaler: tastaturåpning, Tab, Shift+Tab, Escape, fokusretur og gjenopprettet scrolling. Lukkeknapp og bakgrunnsklikk ble også kontrollert.
- Sliders: fire kombinasjoner for rammetransformasjon og 15 kombinasjoner for robotarm, inkludert ytterverdier. Alle målte punkter og ledd holdes innenfor utsnittet.
- Progresjon på uke, tema, vurdering og praktisk guide: faktisk lagring, reload og angring. Forsidens fremdrift og «Fortsett med uke 2» oppdaterte seg etter fullført uke 1.
- QA-brukerens komplette sett av progresjonsnøkler er identisk før og etter testen. Ingen QA-markeringer står igjen.
- Alle seks seksjonsfaner, aktiv tilstand, forrige/neste og nettleserens tilbake/frem ble testet. Temasidens tilbake-lenke lander på riktig spor.
- Tutor-panelet åpner og lukker uten at en melding sendes. Formelmodalen ble også kontrollert i lyst tema og som delt komponent på `/ing164/kapittel-3/formler`.
- En kort responsivitetskontroll på 390 × 844 bekreftet at kunnskapskartet ikke får sideoverflow og at menyen bevarer ankerposisjonen. Ingen omfattende mobil-QA.

Minste målte tekstkontrast i kunnskapskortene: **10,88:1 i mørkt tema og 4,75:1 i lyst tema**, ved begge bredder. Dette er målinger for kortenes tekst, ikke en påstand om en full WCAG-sertifisering av nettstedet.

Detaljerte testresultater:

- [Produksjon før rettelser](../output/playwright/egb339-qa-before-audit.json)
- [Endelig rutegjennomgang](../output/playwright/egb339-qa-final-audit.json)
- [Løsninger, modaler, spor og progresjon](../output/playwright/egb339-qa-interactions.json)
- [Kontrast og diagramkontroller](../output/playwright/egb339-qa-visual-controls.json)
- [Navigasjon og avgrenset regresjonstest](../output/playwright/egb339-qa-navigation-smoke.json)

## Automatiske checks

| Kontroll | Resultat |
| --- | --- |
| `npx tsc --noEmit --incremental false` | Bestått |
| Eksisterende `validate-egb339-vault.mjs` | Bestått, 62 publiserte innholdsoppføringer og interne innholdslenker |
| Ny `validate-egb339-ui.mjs`, inngår i `npm run validate:egb339` | Bestått, 4 genererte sporpaletter, 62 sammendrag, 36 oppgaver, 292 matematikkuttrykk og oppgavelenker |
| `npm run validate:learnmore` | Bestått, 448 lenker over 14 datafiler; eksisterende DAT110-kontroll |
| `node --check scripts/validate-egb339-ui.mjs` | Bestått |
| `git diff --check` | Bestått |
| `npm run lint` | Eksisterende script feiler: `next lint` støttes ikke av den installerte Next 16.2.3, som tolker `lint` som en prosjektmappe. Ingen fungerende prosjektkonfigurert ESLint-kontroll er tilgjengelig. |

## Console, network og testmiljø

- Produksjon: ingen console warnings/errors, runtime-/hydration-feil eller HTTP-feil i rutegjennomgangen. Fire bakgrunnsprefetcher fra Next ble avbrutt ved sidenavigasjon (`ERR_ABORTED`); ingen av dem var mislykkede sidebesøk.
- Endelig lokal rutegjennomgang: **0 warnings, 0 console errors, 0 runtime errors, 0 HTTP-feil og 0 failed requests**.
- Endelig interaksjonstest og navigasjonstest: samme feilfrie resultat.
- Next skriver en eksisterende serveradvarsel om at `middleware` bør migreres til `proxy`. Dette er ikke en EGB339-feil og er ikke endret.
- Én mellomliggende lokal kjøring fikk avbrutt dev-serverforbindelse. Serveren ble startet igjen og sluttkjøringene fullført.
- Lokal optimalisering av uke 8-bildet returnerte 400. Direkte bildefil lokalt, direkte bildefil i produksjon og optimalisert bilde i produksjon ble alle kontrollert med HTTP 200. Sluttkjøringen bruker produksjonens eksisterende bilde-endepunkt gjennom Playwrights request-routing. Lokal bildeoptimalisering er derfor **ikke** verifisert som fungerende; produksjonsbildet er det.
- Den lokale koden ble kjørt på `127.0.0.1:3100` med 4 GB Node-heapgrense. Dette Linux-miljøet har 24 GB RAM; repoets eldre lokale serveradvarsel beskriver en Mac med 8 GB. Ingen full produksjonsbuild eller deploy er kjørt.
- Lokalt testmiljø mangler databasekonfigurasjon. Playwright videresendte progresjonskall til den uendrede produksjons-API-en med eksisterende `qa-check`-sesjon. Det brukes ingen mock-lagring, og ingen produksjonshemmeligheter er kopiert inn i kildekoden.

## Endrede kilde- og valideringsfiler

| Fil | Formål |
| --- | --- |
| `tailwind.config.ts` | Skann EGB339s spordata |
| `package.json` | Koble UI-validatoren til eksisterende EGB339-kommando |
| `scripts/validate-egb339-ui.mjs` (ny) | Regresjonsvern for generert CSS, sammendrag, matematikk og lenker |
| `src/lib/egb339.ts` | Spor-hover og rene sammendrag |
| `src/lib/egb339-problems.ts` | Rett formelavgrensning |
| `src/app/egb339/egb339.css` (ny) | Lokale tema-, kontrast-, fokus- og matematikkscrollregler |
| `src/app/egb339/layout.tsx` | Last og avgrens kursstylingen |
| `src/app/egb339/page.tsx` | Konsistente sporkort og badge-kontrast |
| `src/app/egb339/temaer/page.tsx` | Sporlenker, nummerering, hover og sammendrag |
| `src/app/egb339/temaer/[slug]/page.tsx` | Sporidentitet og tilbake-navigasjon |
| `src/app/egb339/uker/page.tsx` | Kontrast på ukenumre |
| `src/app/egb339/uker/[slug]/page.tsx` | Ankerlenker til ukens sentrale deler |
| `src/app/egb339/oppsummering/page.tsx` | Dark-mode-hover på primærlenken |
| `src/components/egb339/Egb339Nav.tsx` | Bevar ankerlandingspunkt ved sidenavigasjon |
| `src/components/egb339/Egb339EntryNav.tsx` | Navngitt forrige/neste-navigasjon |
| `src/components/egb339/Egb339WeekProblems.tsx` | Oppgaveanker og korrekt åpen/lukket-label |
| `src/components/egb339/FrameTransformExplorer.tsx` | Synlig transformert geometri |
| `src/components/egb339/PlanarArmExplorer.tsx` | Synlige robotledd og endepunkt |
| `src/components/egb339/explorer-viewport.ts` (ny) | Felles utsnittsberegning |
| `src/components/FormulaDetailModal.tsx` | Dialogfokus, scrollretur og ugjennomsiktig mørk flate |

I tillegg kommer denne rapporten og lokalt QA-materiale under `output/playwright/`. Diff-filen omfatter alle 20 kilde-/valideringsfiler, inkludert nye filer; rapport og testartefakter er ikke del av kodediffen.

## Bevisste avgrensninger

- Ingen faglig omskriving, oversettelsesrunde, nye oppgaver eller endringer i matematikkens innhold. Eksisterende blanding av norsk og engelsk fra kursmaterialet er bevart.
- Ingen endring av progresjonsnøkler, database/API, vurderingsvekter eller eksisterende URL-er.
- Ingen full mobilgjennomgang eller redesign av resten av nettstedet.
- Ingen endring av generell auth/middleware, lokal bildeoptimalisering eller prosjektets lint-oppsett.
- Eksisterende lokale endringer i `.gitignore`, `StudyPlanRoadmap.tsx`, `study-plan.ts`, tidligere rapporter og tidligere `output/`-materiale er ikke redigert eller staged.
- Full Vercel-build og smoke-test av en ny deploy inngår ikke i denne rapportens lokale valideringsresultater.
