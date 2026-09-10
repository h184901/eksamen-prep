# EGB339 — samlet desktop-QA etter fase 1–3

10. september 2026. Lokal produksjonsbuild, Chromium / Google Chrome. Ingen commit, push eller utrulling til produksjon.

**Sluttgodkjent for avgrenset commit og deploy av fase 1–3. Ingen kjente blokkerende EGB339-feil gjenstår. Ingen commit eller push er gjort.**

## Omfang og testmiljø

Kun EGB339 er gjennomgått og videreutviklet. Desktop: **1440×1000 og 1280×900, begge i mørkt og lyst tema**. Alle 69 ruter er åpnet i alle fire kombinasjoner: 276 rutevisninger, i tillegg til førbilder og særskilte interaksjonstester.

| Rutegruppe | Dekning |
|---|---|
| Hovedside, studieplan, uke-/tema-/assessment-/ressursregister, hurtigark | 7 sider |
| Ukeoversikter | Uke 1–8, inklusive alle 38 oppgaver i uke 2–8 |
| Temaer | Alle 38: 31 primærleksjoner og 7 referanse-/arkivsider |
| Assessments | Alle 12 sider, alle 51 løsningsdeler |
| Praktiske ressurser | Alle 4 guider |

Full ruteliste og maskinlesbar dokumentasjon ligger i [QA-mappen](../output/playwright/egb339-final-qa/). `after-1440-dark.json`, `after-1440-light.json`, `after-1280-dark.json` og `after-1280-light.json` registrerer HTTP-status, overskrifter, tema, sidebar, ankere, bilder, matematikk og overflow per side. Løsninger og formelforklaringer ble åpnet før layoutkontrollen.

Etter rutesveipet ble de siste rettelsene av matrisekontroller og tutor-knapp validert på en ny produksjonsbuild med hele labtesten, målrettet presentasjons-/tilgjengelighetstest, nye screenshots og Lighthouse. Rutesveipet er altså supplert med målrettet retest av siste endring, ikke rapportert som et nytt fullstendig sveip.

Produksjonsserveren kjørte på localhost med en uttrykkelig lokal testhemmelighet. Progresjonstester brukte et isolert in-memory API og syntetisk bruker −339. Ingen ekte bruker ble markert fullført. Testene rydder alle egne markeringer i `finally`, og tom fixture er kontrollert.

## Konkrete feil og rettelser

| Funn | Rettelse og kontroll |
|---|---|
| SE(2), «Bare rotasjon»: figuren utelot translasjon, mens matrise, regnestykke og koordinater fortsatt tok den med | Én effektiv transformasjon brukes i figur, matrise, invers og resultat. Translasjonskontrollene er deaktivert med forklaring i rotasjonssteget; innstilte verdier bevares når translasjon aktiveres igjen. |
| SE(2)-pilspisser fikk feil farge i Chromium ved `context-stroke` | Egne markører med de faktiske EGB339-tokenene. Kroppsrammens y-akse er også stiplet; mening bæres ikke av farge alene. |
| IK-målet sakket omtrent 12 px etter pekeren utenfor arbeidsrommet | Figurens målestokk er stabil gjennom drag og etter slipp. Kontrollendring/preset kan tilpasse utsnittet igjen. Faktisk pointer-drag følger nå markøren innen 1 px. |
| Fremgang kunne fremstå som «ikke fullført» etter mislykket lesing, også etter mottatt lagring | Provider eksponerer lesefeil og bekreftelse fra refresh. EGB339 viser utilgjengelig status og lesebasert retry, ikke falsk nullstilling eller en ekstra toggle. Pending/dobbeltklikk er sperret. |
| Progresjons-API skjulte databasefeil som HTTP 200 med tom liste | Reell lagringsfeil gir nå HTTP 503. Validatoren kjører den faktiske GET-handleren med isolerte lagringsstubber og skiller tom, gyldig liste fra utilgjengelig lagring. |
| Sidebar kunne skjule referanselenkene og klippe aktivt tema etter lasting | Ukelisten har eget scrollområde; referanser forblir synlige. Aktivt tema avdekkes ved navigasjon, statuslasting, fontlasting og resize, uten å flytte leksjonens deep-link-posisjon. |
| Farge alene identifiserte lenker i brødtekst | Tekstlenker er understreket. Separate navigasjonsrader beholder rolig typografi. |
| Navngitte kontrollgrupper manglet semantisk rolle | Relevante SE(2)-, komposisjons-, robot- og syllabusgrupper har `role="group"`. |
| Temabytte ga kort kontrastglimt; eldre fokusregler overstyrte EGB339 | Samtidig bytte av papir/blekk, ingen arvet fargefade i leksjonsnavigasjonen og tydelig EGB339-fokusmarkering. Headerens tekst-/aksenttokens er tilpasset EGB339s papir, kun på EGB339. |
| Jacobian-matriser med tegnsetting falt tilbake til tett inline-kodenotasjon | Formatteringen behandler avsluttende punktum/komma/semikolon/kolon korrekt. Regresjonskontroller er lagt til. Ukjente uttrykk og programkode omskrives ikke. |
| Ukens løsningssteg hadde samme overskriftsnivå som oppgaven | Løsningsrenderer har avgrenset heading-offset; steg ligger under oppgaven i dokumenthierarkiet. |
| Enkelte temasider gjentok samme definisjon i header og artikkel | Bare den redundante, rene headerkopien er utelatt; den fullstendige definisjonen med faglenker er bevart. |
| Hurtigark og statiske oppgavefigurer beholdt gamle cyan/lilla flater og innramming | Nøytrale EGB339-tokens, enklere tabell og oppslag, færre doble skillelinjer; figurer står på leseflaten uten dekorative kort. |
| Punkt–segment-figuren viste en feil «normal» som ikke var vinkelrett på AB | Projeksjonspunkt og rettvinkelmarkering beregnes fra samme geometri. Skissen er uttrykkelig merket prinsippskisse; oppgavens tall og fasit er ikke endret. Vinkelrettheten er også kontrollert i nettleserens faktiske SVG. |
| Highway-bildet i uke 8 ga HTTP 400 når det faktisk ble scrollet inn | Nexts bildeoptimalisering videresender ikke sesjonscookie til den beskyttede kildefilen. Dette bildet leveres derfor direkte med `unoptimized`, med fortsatt reservert bildeplass og lazy loading. Faktisk dekodet bredde: 2048 px. Ingen endring i autentisering/middleware. |
| Tilgjengelig navn overstyrte innholdet i klikkbare matriser | Matematisk innhold og tydelig, synlig fremhevingsknapp er skilt. Hover på selve matrisen bevares; tastatur bruker knappnavnet. MathML forblir tilgjengelig. |
| Tutor-knappens synlige og tilgjengelige navn var forskjellige | Bare EGB339-varianten heter nå «Spør tutoren, åpne AI-tutor». Andre fag beholder eksisterende navn og utseende. |

Matrisekontrollene ble ikke avfeid som en falsk positiv: W3C fremhever at også matematiske uttrykk som kontrolltekst må behandles særskilt. Den valgte løsningen gir kontrollen en ordinær synlig tekst og lar matrisen være matematisk innhold. [W3C: Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name).

## Interaksjoner og matematikk

- Navigasjon: **408 beståtte kontroller**. Alle 31 leksjoner ble fulgt via Neste, med kontroll av motsvarende Forrige og overgang over ukegrenser. Ingen falsk Neste etter siste leksjon.
- Syllabus: vis/lukk alle uker, native Enter-aktivering, direkte ukehash, aktiv uke, sidebar-scroll og faste referanselenker. Skip-lenken får synlig fokus og flytter fokus til leksjonen.
- Alle 38 ukeløsninger ble åpnet med klikk og lukket med tastatur ved begge desktopbredder.
- Alle 51 assessment-ankere ble testet med direkte lasting, gjenåpning ved samme hash og tilbake/frem mellom deler. Ankere åpner riktig panel og havner under headeren.
- **1 588 interne lenkeforekomster, hvorav 382 med fragment**, ble kontrollert mot faktisk rendret rute og DOM-id: ingen brutte lenker eller ankere. Dette inkluderer pensum-/assessment-koblingene. Ingen eksterne HTTP-lenker ble funnet i det rendrede EGB339-innholdet.
- SE(2): alle fem sliders ved Home/End, deaktivert translasjon, bevart innstilling, A/B-koordinatbytte uten geometrisk flytting, invers, QUT-reset, 90°-kontroll (−2,4), matrise-hover/fokus og SVG-grenser.
- Komposisjon: AB/BA, bokas numeriske eksempel, mellom-/sluttramme, åtte sliders ved begge grenser, reset, punkt/matrise-samsvar og figurgrenser.
- FK/IK: begge ledd og lengder, målkoordinater, alle tre QUT-mål i begge grener, stiplet alternativ arm, utilgjengelige mål uten projisering til kanten, inner-/yttergrenser, singulariteter, like lenker i origo, alle piltaster, Enter/Space, ekte drag, pointercancel, hover/fokus/klikk og reset. IK-resultater ble sendt tilbake gjennom FK; feilgrensen i testen er 10⁻⁸.
- Siste samlede labkjøring: **254/254 bestått**, inkludert de nye matriseknappene. Dokumentert i `labs-release-result.json`.
- Progresjon: **28 beståtte kontroller**. Tema, uke, assessment og ressurs lagres separat og overlever reload i fixture. Retry etter 500/503/offline/ugyldig svar, 401, doble klikk, mislykket readback og angre er prøvd. **0 databasewrites; fixture tom ved avslutning.**
- Tutor-dialogen ble åpnet og lukket etter navnrettelsen: ingen feil eller chat-requests, ingen meldinger sendt og ingen endrede progresjonsdata.
- Kort 390 px sanity viste ingen dokument-overflow i IK. Mobil er ikke design- eller sluttgodkjent i denne runden.

## Taste / Impeccable / screenshot-review

Førbilder: 28 fullsidebilder i to konfigurasjoner samt konkrete feilbilder. Etterbilder: 56 fullsidebilder (14 representative sider × fire konfigurasjoner), i tillegg til viewport-bilder av laber, worked examples, Assessment 1.1, hurtigark, statisk figur og uke 8.

Manuelt visuelt vurdert: hovedside/studieplan, fagregister, SE(2) og komposisjon, FK/IK, Jacobian, homografier, uke-/løsningssider, Assessment 1.1 og 1.7, hurtigark og highway-bildet. Fullsidebilder ble supplert med faktiske viewport-bilder, slik at lesbarhet ikke ble bedømt utelukkende fra nedskalerte lange sider.

- **Studieklarhet:** kronologisk kursplan er primær; fagspor er oppslag, ikke konkurrerende dashboard. «Hvor er jeg?» og «Hva kommer etterpå?» har faste plasseringer.
- **Typografi:** 17 px artikkeltekst, ca. 740 px lesebredde, tydelig overskriftshierarki. Laben får større bredde fordi modell og geometri skal kunne sees samtidig.
- **Tetthet:** få kontrollgrupper, ingen badges for innhold som kan forklares i en setning. Matematikk har luft; større utledninger gjemmes ikke i modal.
- **Visuell identitet:** dempet papir/blekk, grønn aksent og funksjonell diagramfarge. Ingen dekorativ glow, gradient-hero eller kort inni kort i den aktive leksjonsflaten.
- **Presisering:** tomrommet til høyre for ordinære artikler er bevisst lesebredde, ikke plassholder for en tredje arbeidsflate.

Impeccable-launcheren ble brukt til context og én avgrenset detector-scan av aktiv EGB339-kode: **ingen primærfunn**. Dette er ikke brukt som erstatning for manuell review. Taste Skill styrte fargekonsistens, innramming, innholdstetthet og Lighthouse-kontroll. Diagram Design styrte semantiske farger, akser, etiketter og geometrisk riktighet; robotgeometri ble ikke tvunget inn i regler for ortogonale flytdiagrammer.

## Tilgjengelighet og drift

20 representative EGB339-visninger ble kontrollert med axe/WCAG 2/2.1/2.2 A/AA: ingen regelbrudd etter rettelsene. Supplerende fullside-audit inkluderer den delte headeren i begge temaer. Symboler og matematikk som verktøyet ikke kan kontrastmåle automatisk, ble vurdert visuelt og mot tokens; dette er ikke en påstand om full skjermlesersertifisering.

Den siste presentasjonskjøringen bestod **31/31 kontroller**, tok 14 nye viewport-bilder og fant ingen axe-brudd i noen av de to fullside-auditene. Lange uttrykk ble åpnet og kontrollert ved desktopbreddene; den målrettede testen fant ingen overflytende matematikk som trengte horisontal tastaturscrolling. Slik scrolling er derfor ikke påstått funksjonstestet.

Alle fire rutesveip: **0 console errors/warnings, 0 hydration-/runtime-feil, 0 HTTP 4xx/5xx, 0 feil på EGB339-bilder eller andre nødvendige assets**. Dokumentet holder viewportbredden også med løsningene åpne; ingen KaTeX-feil, doble id-er eller manglende bilder.

Det finnes kansellerte Next-prefetch-requests til nettstedets globale `/` med `?_rsc=...`: 128 / 123 / 130 / 123 i de fire sveipene, alle `net::ERR_ABORTED`. Samme mønster fantes før endringene. Ingen var EGB339-data/assets, og ingen ga konsoll- eller HTTP-feil. De er ikke feilaktig rapportert som «alle nettverksrequests lyktes». De bevisst injiserte API-feilene er logget separat i progresjonstesten.

Lighthouse 12.8.2 brukes fra npm-cache, ikke som prosjektavhengighet. Versjon 13 krever nyere Node enn prosjektets lokale Node 20. Den endelige profilen er desktop 1440×1000 med isolert progresjon. En første kjøring uten fixture viste den lokale, utilgjengelige lagringstjenesten som 503; den ble ikke feiltolket som et CSS-/hydration-problem eller brukt som ren sluttmåling. Ingen databasemarkeringer ble skrevet.

| Endelig Lighthouse-kjøring | Performance | Accessibility | Best practices | LCP | CLS |
|---|---:|---:|---:|---:|---:|
| SE(2)-leksjonen | 100 | 100 | 100 | 608 ms | 0,0055 |
| IK-leksjonen | 100 | 100 | 100 | 625 ms | 0,0045 |

Resultater: `lhSe2Release-result.json` og `lhIkRelease-result.json`. Ingen run warnings, konsollfeil eller gjenværende knappnavn-funn. Kategoripoengene betyr ikke at alle diagnostiske anbefalinger er løst: ubrukt global CSS/JS, legacy-JS, fontlasting og KaTeX-DOM er fortsatt optimeringsmuligheter utenfor denne avgrensede feilrettingen.

## Automatiske sluttkontroller

| Kontroll | Resultat |
|---|---|
| `npx tsc --noEmit --incremental false` | Bestått på sluttkoden |
| `npm run validate:egb339` | 62 entries; fire track-tokenfamilier; 38 oppgaver; 12 assessments / 51 deler; 1 136 matteuttrykk; ruter/ankere |
| `node scripts/validate-egb339-solutions.mjs` | 133 numeriske kontroller og faktiske highway-piksler |
| `node scripts/validate-egb339-pilot.mjs` | Kursdekning; 5 776 SE(2)-konfigurasjoner; 34 statiske TeX-uttrykk; tokenkontrast minst 5,99:1; reell GET-handler med isolert databasefeil |
| `node scripts/validate-egb339-study.mjs` | 18 RTB/DH-fixtures; 12 321 FK/IK-konfigurasjoner; 333 185 numeriske assertions; grenser/ugyldige mål; 36 formatteringer; 52 TeX-uttrykk; 69 ruter |
| RTB-fixtures regenerert i referanse-venv | Alle 18 og SE(2)-komposisjonen samsvarer med lagret referanse |
| `npm run build` | Bestått på sluttkoden; 618/618 sider |
| `git diff --check` | Bestått |

Eksisterende `npm run lint` er ikke en fungerende kontroll i denne Next-versjonen (`next lint`); den er ikke rapportert som grønn. Build har to kjente, ikke-blokkerende varsler: middleware→proxy-konvensjon og bred filsporing via `akseptert-source.ts`. Ingen av dem er reparert ved å endre andre fag.

## Faglige kilder og verktøy faktisk brukt

- Lest/følgt RTB-repoets AGENTS.md og den refererte felles RVC-instruksen. Kontrollert Planar2s ordnede `R(q1) Tx(L1) R(q2) Tx(L2)`; regenerert ETS-/DH-fixtures og SE2-komposisjon i isolert Python-miljø. RTB 1.4.2, SpatialMath 1.1.17, NumPy 2.5.3. Referanserepoet er uendret.
- Corke, *Robotics, Vision and Control*, tredje Python-utgave (2023). Markdown: `/home/skjold/ObsidianVault/EGB339/books/Robotics, Vision and Control - MARKDOWN.md`. PDF: samme mappe, `Robotics, Vision and Control - ORIGINAL.pdf`. Kap. 2.2.2.1 (komposisjon/invers), 7.1.1 og 7.2.1 (2R-kjede og IK). Markdown brukt for innhold; originale figurer/ligningslayout kontrollert i PDF.
- QUT Week 2 tutorial / eksisterende fasitkontrollert poseeksempel; Week 5 tutorial side 17 (L1=5, L2=7, tre mål); Week 7 tutorial side 12 og eksisterende punkt–segment-utledning. Ingen ny «offisiell QUT-fasit» er oppfunnet der separat fasit mangler.
- Playwright-skill/CLI, Taste Skill, Impeccable, Diagram Design og PDF-skill brukt. W3Cs primærdokumentasjon brukt ved kontroll av tilgjengelige knappnavn.
- `codex mcp list --json` kontrollert uten å logge hemmelige argumenter. 21st, Context7, GitHub og OpenAI Developer Docs er konfigurert. Ingen MCP-connector ble faktisk brukt i denne QA-runden; lokal nettleser, kildefiler og referansemiljø dekket behovet. Context7-bruk i implementeringsfasen er dokumentert separat.

## Diff, filer og avgrensning

Denne QA-runden retter `src/app/egb339/pilot.css`, hurtigark og tema-rendering; `SE2Explorer`, `SE2Composition`, `PlanarArmExplorer`, kursnavigasjon, EGB339-progresjonskontroll, `PilotAssessment`, Markdown-/oppgaverenderer, statiske oppgavefigurer, matteformatterer og pilot-/studievalidatorene. QA-scripts, resultater og screenshots ligger i den EGB339-spesifikke output-mappen.

Tre nødvendige delte berøringspunkter:

1. `src/components/ProgressProvider.tsx`: eksplisitt status ved lesefeil og bekreftet refresh.
2. `src/app/api/progress/route.ts`: korrekt HTTP-feil ved utilgjengelig database; vellykket API og lagringsnøkler er uendret.
3. `src/components/AITutor/TutorButton.tsx`: tilgjengelig navn endres **bare** når `context.subject === "egb339"`; et data-attributt avkobler EGB339-styling fra tekstetiketten.

Innholdssnapshots, eksisterende oppgave-/assessment-data, bok/QUT/Obsidian og RTB-kode er ikke omskrevet. Ingen nye frontend-dependencies, ingen global CSS-endring, ingen fase 4. Nye 3D-, Jacobian-, motion-planning- og vision-laber er uttrykkelig ikke startet.

Eksisterende unrelated endringer i `.gitignore`, `StudyPlanRoadmap.tsx`, `study-plan.ts` og de fem andre fagenes/designrapportene er bevart, kontrollert med SHA-256. Ikke bruk `git add .` ved senere commit; gamle blandede output-/rapportfiler skal ikke følge med. Git-status/diff må gjennomgås ved commit. Ingen filer er staged, committet eller pushet i QA-runden.

## Kjente begrensninger

- Progresjons-UI, request-kontrakt og feiltilstander er verifisert isolert, men **ekte databasevarighet og Vercel-deploy er ikke testet**. En kort smoke etter autorisert deploy gjenstår som normal releasekontroll.
- Dette er Chromium-desktop-QA, ikke sertifisering for Safari/Firefox, alle skjermlesere, fysisk robot eller alle mulige tilstander.
- Eksisterende kildebegrensninger i åpne/praktiske assessments er beholdt. De er ikke fylt med konstruert fasit.
- Lighthouse på localhost er en syntetisk måling, ikke feltdata/Core Web Vitals fra produksjon. KaTeX gir et betydelig DOM-tre; global legacy-/ubrukt CSS/JS er ikke ryddet ved å endre resten av nettstedet.
- De tidligere dokumenterte build-/lint-varslene og kansellert global prefetch er ikke EGB339-blokkere.

## Sluttstatus

**Ja — EGB339 fase 1–3 er klar for commit og deploy.** Alle påkrevde TypeScript-/validator-/build-kontroller består. Siste retest består med 254 labkontroller, 408 navigasjonskontroller, 28 isolerte progresjonskontroller og 31 presentasjonskontroller; de endelige Lighthouse-kjøringene har 100/100/100.

Git-status og diff er gjennomgått, `git diff --check` består, og ingen filer er staged. Unrelated eksisterende endringer er bevart. Ved en senere autorisert commit må EGB339-filene og de tre nødvendige delte rettelsene velges eksplisitt; ikke stage hele arbeidsområdet.

Ingen kjent EGB339-feil blokkerer commit/deploy. Etter autorisert deploy gjenstår en kort production smoke og kontroll av ekte, vedvarende progresjon med en egnet testbruker. Implementeringen er stoppet etter fase 3; ingen fase 4, commit, push eller utrulling er utført.
