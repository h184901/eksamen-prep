# Site Computer Use QA Report

## Verdict

**mostly ready** — Ingen blockers eller high-funn. Nettstedet er gjennomgående solid, raskt og pedagogisk gjennomarbeidet. To Medium-funn (matching-duplikater i DAT102-øving og én faglig misvisende quiz-formulering) bør fikses, pluss en håndfull små språk-/polish-saker.

## Test environment

- **Browser:** Google Chrome på macOS (styrt via Claude in Chrome-utvidelsen, ekte nettleser — ikke headless)
- **Dato/tid:** 2026-06-10 (dagtid, Europe/Oslo)
- **Innlogget bruker:** `haavard` (eksisterende sesjon gjenbrukt; ikke logget ut, ingen data endret)
- **Viewport(s):** Desktop ~855 px CSS-bredde (brukerens standardzoom 64 % i et 546 pt-vindu); mobil **390 px** testet via same-origin iframe (gir ekte breakpoints/media queries). Merk: OS-vinduets minimumsbredde hindret ekte vindus-resize til 390 px; iframe-metoden er likeverdig for layout/breakpoints, men touch-targets ble vurdert visuelt.
- **Production URL:** https://eksamen-prep.vercel.app
- **Modus:** Både mørk (primær) og lys modus testet. NO/EN testet på DAT110.
- **Metode:** Manuell visuell/interaktiv gjennomgang i nettleser + programmatisk red-flag-skanning (fetch av SSR-HTML, samme origin/innlogget cookie) for 404/typo/lekkasje-mønstre på >160 URL-er.

## Executive summary

Nettstedet fremstår produksjonsklart for sitt formål. Hjemmesiden er en korrekt studieplan-roadmap (1.–3. år, riktige semestre, DAT110 ikke lenger overprioritert). DAT102 er imponerende komplett: alle fire quiz-typer fungerer med forklaring og «les mer»-lenker begge veier, flashcards/matching/drills fungerer, obliger og eksamenssett har ærlige statuser (FULLTEKST/DELVIS/MANGLER KILDE, KOMPLETT/KUN SKANNET), og AI-tutoren svarer DAT102-spesifikt uten lekkasjer. DAT110 har fått ryddet alle gamle æøå-feil (0 treff på mA/spørsmAl/køtegori/pakkebrylning/Koforsinkelse/Eksamensoving), 06-2025 viser ikke lenger dobbel oppgavetekst, og språkbytte midt i quiz beholder all state — meget bra. DAT107 (58 temasider + 45 bilder), DAT109 og ING164 (KaTeX + interaktive visualiseringer) er alle uten 404, brutte bilder eller mojibake. Mobil 390 px har null horisontal overflow på alle testede sider.

Hovedfunnene som bør prioriteres: (1) matching-runder kan inneholde to høyrekort med identisk tekst som ikke er ombyttbare — brukeren straffes for et 50/50-valg; (2) én quiz-forklaring kaller mest effektiv kjøretid «raskest vekst» (faglig feil formulering); (3) en systematisk «s. s.»-dobling i kilde-accordions og noen små språkfeil.

## Critical findings

### Blocker

_Ingen._

### High

_Ingen._

### Medium

**M1 — Matching: identiske høyrekort er ikke ombyttbare**
- URL: https://eksamen-prep.vercel.app/dat102/oving/matching
- Steps to reproduce: Start matching (Alle). I runden testet inneholdt høyresiden to kort med identisk tekst «O(log n)» (fasit for hhv. «Fjerning av rot (fjernMaks/fjernMin) fra haug» og «Søk i balansert binært søketre»). Velg «Søk i balansert binært søketre» + det øverste «O(log n)»-kortet.
- Expected: Match godtas — kortene er visuelt identiske og faglig likeverdige.
- Actual: Avvist som feil (rød flash). Kun det interne kort-ID-bundne kortet godtas («Fjerning av rot» + samme kort ble grønt). Brukeren kan umulig vite hvilket «O(log n)» som «tilhører» hvilket venstrekort.
- Screenshot ref: ss_3582ruven (riktig par), ss_4349qawqo (avvist identisk tekst), ss_8506tv9pv (samme kort godtatt for annet venstrekort)
- Suggested fix: Ved match-sjekk, sammenlign på normalisert tekst i stedet for kort-ID (godta alle kort med identisk tekst), eller dedupliser runden slik at to like tekster aldri vises samtidig.

**M2 — Quiz-forklaring: «mest effektiv (raskest vekst)» er faglig misvisende**
- URL: https://eksamen-prep.vercel.app/dat102/oving/quiz (spørsmål 2 i «I rekkefølge», tema Asymptotisk analyse: «Ranger følgende kjøretider …»)
- Steps to reproduce: Start quiz i rekkefølge, svar på spørsmål 2, les forklaringen.
- Expected: Mest effektiv = lavest/tregest voksende kjøretid.
- Actual: Forklaringen sier «Den korrekte rekkefølgen fra mest effektiv (raskest vekst) til minst effektiv er: O(1) < O(log n) < …». O(1) har *lavest* vekst — «(raskest vekst)» står på feil ende og kan forvirre nøyaktig de studentene spørsmålet skal hjelpe.
- Screenshot ref: ss_2721na0rg
- Suggested fix: Endre til «(lavest vekst)» / «(tregest vekst)», eller drop parentesen.

### Low

**L1 — Footer-påstand utdatert:** «Lokalt lagret framgang · Ingen tracking» på forsiden — framgang lagres nå i Postgres (server), ikke lokalt. URL: `/`. Fix: oppdater teksten (f.eks. «Framgang lagres på din bruker»).

**L2 — «1 begreper» (entallsfeil):** `/dat102/temaer`, tema 5 «Enhetstesting med JUnit» viser «1 begreper · 7 øvingsoppgaver». «1 oblig» håndteres riktig andre steder. Fix: entallsform for «begrep».

**L3 — «det vanligste notasjonen»:** `/dat102/temaer/asymptotic-analysis`, under Sentrale begreper → Stor-O-notasjon. Skal være «den vanligste notasjonen».

**L4 — Systematisk «s. s.»-dobling i kilder:** «Kilder og grunnlag»-accordions viser «F04 LenketBag og Analyse — s. s. 14–24», «F05 Stabel — s. s. 5–8». Sett på `/dat102/begreper/big-o-notation` (og mønsteret går trolig igjen). Fix: ikke prepend «s. » når verdien allerede starter med «s. ».

**L5 — Manglende mellomrom etter kolon:** `/dat102/pensum` infoboks: «Om boka:kapittelnumrene refererer …». Fix: «Om boka: kapittelnumrene …».

**L6 — Rå eksamens-IDer med ASCII-å i brødtekst:** Temasider (DAT102) skriver «I 2025-jan og 2023-vaar finnes spørsmål …», «2024-vaar, 2025-jan, 2026-vaar inneholder BST-oppgaver» — interne IDer («vaar») vises for bruker; pen form står først i parentesen etterpå. Sett på `/dat102/temaer/asymptotic-analysis`, `/dat102/temaer/dictionaries-and-hashing`, `/dat102/temaer/binary-search-trees`, `/dat102/temaer/heaps-and-priority-queues`. Fix: render visningsnavn («Vår 2023») i prosa.

**L7 — Rå backticks i drill-tekst:** `/dat102/oving/drills`, drill 1: «Beskriv en rekursiv metode \`antallBlad(BinaerTreNode<T> t)\` …» — backticks vises bokstavelig (inline-kode rendres ikke i oppgaveteksten, men gjør det i løsningen). Fix: render inline-kode også i drill-/oppgavetekst.

**L8 — Klikk svelges under feil-flash i matching:** Etter et feil par ignoreres klikk i ~1 s mens rød flash pågår; raske brukere mister input (observert gjentatte ganger). Fix: tillat ny seleksjon umiddelbart, eller kort ned flashen.

**L9 — Dokumenttitler på DAT110 i norsk modus:** `<title>` bruker engelsk prefiks/generisk tittel: «Topic: Chord DHT — DAT110 temaer», «Concept: Chord Ring — DAT110 begreper», og `/dat110` + `/dat110/oppsummering` har generisk «Eksamensøving — Dataingeniør HVL» (DAT102-sidene har spesifikke titler). Fix: norske/spesifikke titler.

**L10 — Standard engelsk 404:** `/dat108` (og andre ukjente ruter) gir Next.js-standard «404 | This page could not be found.» Hjemmesidens kommer-senere-kort er ikke klikkbare, så normaltrafikk treffer den ikke — men en norsk 404 med «Tilbake til studieløpet» ville vært bedre.

**L11 — Hamburgermenyen mangler Utveksling:** Menyen har Hjem + 5 fag; `/utveksling` nås kun via kortet på forsiden.

**L12 — Nynorsk flertall på utvekslingssiden:** `/utveksling` bruker «Planlagte Australia-emne» og «AKTUELLE EMNE» (nynorsk flertall), mens forsiden sier «Se planlagte emner» (bokmål). Velg én form (bokmål: «emner»).

**L13 — Fokusindikator utydelig (begrenset testet):** Tab-navigering på forsiden ga ingen tydelig synlig fokusring på de første elementene. Bør verifiseres og ev. styrkes (`:focus-visible`).

### Polish

**P1 — F11b-chips ser duplisert ut:** «F11a F11b F11b» (uke 8 på `/dat102` og tema 3 på `/dat102/temaer`). Datatro — det finnes to F11b-forelesninger («Kø (før timen)» / «Kø (med tegninger, etter timen)», ankre `#f11b`/`#f11b-2`) — men identiske chips ser ut som en bug. Forslag: «F11b·1 / F11b·2» eller tooltip.

**P2 — «✏️Pensum» uten mellomrom** etter emoji i kildelinje (quiz, flashcards, drills, begrepssider).

**P3 — Rå oppgave-slugs som lenketekst:** «Relevante oppgaver» på temasider viser «oppgave-uke03-oppvarming» o.l. (beskrivelsen står heldigvis etter tankestrek).

**P4 — RPC-figuren har trange labels:** `/dat110/begreper/rpc` — «1. call(args)» og «2. request» overlapper pil/boks marginalt. Lesbart, men kunne hatt mer luft.

**P5 — Rå tema-slug i eksamensbadge:** «tema: 02-protocol-layering-og-sockets» på DAT110-eksamenssider. Vis visningsnavn.

**P6 — Mørke PNG-er i lys modus:** DAT107-diagrammene (f.eks. `er-bibliotek.png`) har innbakt svart bakgrunn — gir en tung svart blokk på hvit side. Fungerer, men transparent/nytral bakgrunn ville vært penere. I samme figur: caption sier «entiteter som Bok…», mens figuren viser «EBok» — liten inkonsistens.

**P7 — Dobbel `/api/auth/me`** ved sidelast på forsiden (to identiske GET).

**P8 — Vekstkurve-legend:** O(1) og O(log n) har nesten samme grønnfarge (`/dat102/begreper/big-o-notation`, `/dat102/oppsummering`).

**P9 — «Kjeda overløp» vs «Kjedet overløp»** brukes om hverandre på `/dat102/temaer/dictionaries-and-hashing`.

**P10 — Chip-rekkefølge:** «F17 F18b F18» (uke 12) og «F17 F18b F19 F19b F18» (tema 9) ser uryddig ut selv om det er datatro (F18 = Haugesund-variant).

**P11 — «skalérbart»** med aksent i DAT110-quizens norske oversettelse (standard: «skalerbart»).

**P12 — Tutor-knappen på mobil** (390 px) dekker nederste kort i matching-listen og nedre del av lange lister. Innholdet kan scrolles forbi, men en mindre knapp/safe-area-padding på mobil ville hjulpet.

**P13 — Menynavn vs offisielle navn:** Menyen sier «DAT102 Algoritmer» (bokmål kortform) mens kort/offisielt navn er nynorsk «Algoritmar og datastrukturar». Kosmetisk.

## Homepage/study-plan findings

- ✅ Hjemmesiden er studieplan-roadmap; DAT110 er ikke visuelt prioritert.
- ✅ 1./2./3. år tydelige; semestre korrekt under år. DAT102 + DAT107 i Semester 2, DAT108 i Semester 3 (kommer senere), DAT109/DAT110/ING164 i Semester 4 (aktive).
- ✅ Coming-soon-kort (stiplet, «KOMMER SENERE») ser bevisste ut og er ikke klikkbare.
- ✅ Aktive kort ruter riktig (`/dat102`, `/dat107`, `/dat109`, `/dat110`, `/ing164`).
- ✅ Utvekslingskort «Australia · Gardens Point» PLANLAGT → `/utveksling`.
- ✅ Ingen mobil-overflow; hero og kort stables pent på 390 px.
- ⚠️ L1 (footer-tekst), L11 (meny mangler Utveksling), P7 (dobbel auth-request).

## Exchange page findings

- ✅ `/utveksling` laster (200). Badge PLANLAGT, «UTVEKSLING · AUSTRALIA», tilbake-lenke.
- ✅ Stats: År 2026 · Semester 2 · Gardens Point · 12 per emne · Planlagt.
- ✅ Alle fire emner med riktige koder/navn/poeng: CAB432 Cloud Computing (12 cp), DSB102 Introduction to Machine Learning (12 cp), EGB339 Introduction to Robotics (12 cp), IFB240 Cyber Security (12 cp) — alle «Kommer senere».
- ✅ Ærlig: «Innhold, quiz og eksamensøving kan legges til senere» + «Basert på foreløpig Unit Swap-oversikt». Later ikke som noe finnes.
- ✅ Design matcher (grønn aksent), mørk + mobil OK.
- ⚠️ L12 ([]«emne» som flertall).

## DAT102 findings

- ✅ Forside: 6 nav-kort med korrekte tall (14 temaer · 60 begreper · 109 quiz · 80 kort · 60 par · 42 drills · 8 sett · 260 deloppgaver), faglig løype (8 steg), uke-for-uke, læringsmål, obliger, eksamenschips.
- ✅ `/dat102/temaer`: alle 14 temaer med beskrivelser, F-chips og kapittelreferanser.
- ✅ 5 temadetaljsider inspisert (bag-adt, asymptotic-analysis, dictionaries-and-hashing, binary-search-trees, heaps-and-priority-queues): konsistent struktur, tabeller, eksamensrelevans. Ingen lekkasjer.
- ✅ `/dat102/begreper`: søk («hash» → 5 treff, ×-knapp) og temafilter (Grafer → 8) fungerer; «Viser X av 60» oppdateres.
- ✅ Alle 52 testbare begrepssider: 200, ingen `undefined`/`[object Object]`/mojibake/`[[`-wikilinks/raw paths/`libgen`/`Carrano`-lekkasje.
- ✅ `/dat102/pensum`: ukeplan med forelesninger, kapittler, lysark-antall, LAB-rader, obligbadges; ærlig bok-disclaimer («ingen bokutdrag eller bokfigurer»).
- ✅ `/dat102/oppsummering`: Big-O-tabeller, stabel/kø-SVG, «Når bruker du hva?», siste-uke-plan.
- ✅ Eksamen: oversikt (8 sett; 240 komplette / 17 delvise / 3 kun skannet / 0 mangler løsning), per-sett badges KOMPLETT/DELVIS, 2020-sett ærlig «KUN SKANNET» med 🔒-notis, gjengangere med sesjon×tema-matrise. Alle 8 sett + gjengangere fetch-skannet rent.
- ✅ Wikilinks/kryssreferanser oppløses til pene lenker (Relatert-chips, LES MER); ingen rå `[[ ]]` funnet.
- ⚠️ M1, M2, L2–L8, P1–P3, P8–P10 (se over).

## DAT110 findings

- ✅ Alle 26 ruter (forside, temaer, begreper, oppsummering, øving×6, eksamen×6 + gjengangere, temasider×8) fetch-skannet: 200, **ingen gamle æøå-feil** (mA/spørsmAl/Apnet/køtegori/pakkebrylning/Koforsinkelse/Eksamensoving: 0 treff), ingen mojibake.
- ✅ NO/EN-toggle: fungerer; EN-modus med ærlig banner «English mode is being built gradually …» — ingen halvt-oversatte eksamensdetaljer.
- ✅ Quiz: språkbytte midt i økt beholder score/svar/feedback og oversetter alt live. Imponerende.
- ✅ 06-2025: «Rekonstruert eksamen — ikke offisiell»-advarsel, REKONSTRUERT-badge, figur-merknader per oppgave; **ingen dobbel oppgavetekst** (0 dupliserte linjer >80 tegn, programmatisk); ingen «tenk gjerne først»-repetisjon. Q1 på engelsk er forklart i merknad.
- ✅ 05-2022 (eldre): OFFISIELL · KOMPLETT, norsk, løsnings-accordions fungerer.
- ✅ Eksamen-sim (6 sett m/ 4-timers veiledning) og Regneøving (25 drills m/ «Forventede steg») fungerer.
- ✅ Figurer: Chord-ring (lookup-sti, legend, caption), delay-komponenter (4 fargekodede bokser + formel), RPC-sekvensdiagram. Alle fine i mørk modus.
- ⚠️ L9, P4, P5, P11 (se over). Tutor-knappen dekker ikke kritisk innhold på desktop.

## DAT107 findings

- ✅ Alle 58 temasider på tvers av 7 områder: 200 og rene.
- ✅ Alle 45 refererte bilder (`/content/dat107/assets/...`): HTTP 200; lazy-loading fungerer (lastes ved scroll og rendres korrekt).
- ✅ Dashbord, områdesider («Dette må du kunne», faser, eksamensformat-kort) og temasider ser riktige ut i mørk + lys modus.
- ✅ Shortcode-diagrammer (kardinalitet i ER-modellering) rendres pent.
- ⚠️ P6 (mørke PNG-er i lys modus; «EBok» vs «Bok»-caption).

## DAT108 findings

- Ruten finnes ikke (faget er «kommer senere» — korrekt). `/dat108` gir standard engelsk 404 (L10). Kortet på forsiden er ikke klikkbart, så ingen naturlig vei dit.

## DAT109 findings

- ✅ Forside med eksamensformat (40/20/20/20), emnekort med faktisk fremgang (5/5 modellering), alle 8 hovedruter 200 og rene.
- ✅ `/dat109/modellering`: subnav (Oversikt/Brukstilfelle/Domenemodell/Sekvensdiagram/Case-studier NY/Sjekkliste), OOA→OOD→OOP-oversikt, pedagogisk sterkt. Mobil uten overflow.

## ING164 findings

- ✅ Forside med formelark- og eksamenskort + kapittelgrupper (Bevegelse/Mekanikk/Rotasjon/E&M) og fremgang.
- ✅ `/ing164/kapittel-9/formler`: KaTeX rendres perfekt; formel-modal med «Variabler og enheter», «Bruk denne når», «Ikke bruk når», «Vanlige feil», «Forklar med AI».
- ✅ `/ing164/kapittel-9/visualiseringer`: lineær↔rotasjon-analogtabell (KaTeX) + interaktiv treghetsmoment-visualisering — geometrivalg oppdaterer SVG og formel, beregner riktig (M=2,0 kg, R=0,5 m → I = MR² = 0,500 kg·m²).
- ✅ Alle skannede ING164-ruter (formelark, eksamen, kapittel 2/9/21/29) 200 og rene.

## Interactive feature findings

- **Quiz (DAT102):** Alle 4 typer testet. Flervalg: feil svar → rødt kryss + grønn fasit + «Ikke helt — riktig: C» + per-alternativ «Hvorfor dine valg var feil» + LES MER-lenker; riktig svar → «✓ Riktig!» + forklaring + lenker. Sant/usant OK. Selvsjekk: «Vis fasit» → «Forventet svar» → «Jeg klarte den»/«Må øve mer». Flere riktige: checkboxes m/ deaktivert submit til valg er gjort. Tellere/progress oppdateres. Filtre med korrekte tall (31+62+16=109; 17+64+20+8=109).
- **Quiz (DAT110):** Temavalg/Select all, EN/NO midt i økt uten state-tap, feedback + LES MER.
- **Flashcards:** Flip, «Kan denne»/«Må øve mer», teller, temafilter (sum 80), LES MER på baksiden. Ingen egen shuffle/reset-knapp utover Avbryt (kortstokken virker stokket ved start).
- **Matching:** Riktig/feil par fungerer, runde 6/6 → «Neste runde (54 par igjen)». M1 + L8 over.
- **Drills:** Hint → stegvis løsning (nummererte steg + kodeformatert svar) → selvvurdering. L7 over.
- **Exam accordions:** «Vis løsning» (SVAR / KORT BEGRUNNELSE / VANLIGE FEIL) åpner/lukker korrekt på både DAT102 og DAT110; «Kilder og grunnlag»-accordions fungerer.
- **Tutor:** Åpnet på `/dat102/temaer/dictionaries-and-hashing`. Kontekstbevisst («DAT102 Algoritmer og datastrukturer • Teori», hilser på haavard). Spørsmål «Hva bør jeg kunne om hashing i DAT102?» ga strukturert, faglig korrekt, DAT102-spesifikt svar (λ, divisjons-/MAD-metoden, sondering vs kjeding, rehashing, eksamenskrav). Programmatisk verifisert: ingen «DAT110», ingen rå paths, ingen libgen/Carrano/boktekst. Forslags-chips, kopier-knapp, stopp under streaming. Tutor-knappen dekker ikke viktig innhold på desktop (flyter over whitespace/padding).

## Visual/assets findings

- **SVG:** Vekstkurver (DAT102), stabel/kø-figurer, Chord-ring, delay-komponenter, RPC-sekvens, ER-kardinalitet (DAT107), treghetsmoment (ING164) — alle rendres riktig i mørk modus med labels og captions. P4 (RPC trange labels), P8 (legend-farger).
- **PNG/JPG:** 45/45 DAT107-bilder OK (200 + rendrer). Lazy-loading. P6 (svart bakgrunn i lys modus).
- **Excalidraw/React-diagrammer:** Shortcode-diagrammene (kardinalitet) og React-visualiseringene (ING164) fungerer og er interaktive.
- Ingen brutte bildeikoner funnet noe sted.

## Typo/æøå findings

- Ingen mojibake (Ã/â€/�) på noen av de >160 skannede sidene.
- Ingen av de gamle DAT110-feilene (mA, spørsmAl, Apnet, køtegori, pakkebrylning, Koforsinkelse, «Eksamensoving») igjen i user-facing tekst.
- Ingen «Hahing»/«Dictonaries»/«Imlementasjon».
- Funn: L2 («1 begreper»), L3 («det vanligste notasjonen»), L4 («s. s.»), L5 («Om boka:kapittelnumrene»), L6 («2023-vaar» i prosa), L12 («emne» som flertall), P9 («Kjeda/Kjedet»), P11 («skalérbart»). Detaljer med URL og forslag over.

## Mobile/responsive findings

- 390 px testet på: `/`, `/utveksling`, `/dat102`, `/dat102/pensum`, `/dat102/begreper`, `/dat102/oving/quiz`, `/dat102/oving/matching` (aktiv runde), `/dat110`, `/dat110/eksamen/dat110-eksamen-06-2025`, `/dat110/oving/beregning`, `/dat109/modellering`, `/dat107/modellering/er-modellering`, `/ing164/kapittel-9/formler`.
- **Null horisontal overflow på samtlige.** Kort stables, chips wrapper, subnav blir scrollbar, header komprimeres (brukernavn skjules, NO/EN kompakt).
- Matching på mobil beholder to kolonner og er brukbar.
- P12: tutor-knappen er relativt stor på 390 px og ligger over nederste kort/listeelementer ved scroll.

## Dark/light mode findings

- Toggle fungerer begge veier, persisteres (localStorage) og overlever navigasjon. Ikon/aria-label skifter korrekt («Bytt til lyst/mørkt tema»).
- Mørk modus (primær): gjennomgående god kontrast — stats-kort, tabeller, accordions, badges og figurer lesbare. Ingen «svart tekst på mørk bakgrunn»-tilfeller observert.
- Lys modus: hjemmeside, DAT110-oppsummering, DAT107-temasider og quiz-sider rene og lesbare. P6: DAT107-PNG-er med innbakt svart bakgrunn ser tunge ut på hvitt.

## Link/navigation findings

- Ingen uventede 404 på >160 skannede URL-er (alle 200). `/dat108` 404 er forventet (L10).
- Breadcrumbs konsistente og klikkbare på alle fag.
- Interne kryss-lenker (LES MER, Relatert, «Øv på dette», footer-faglenker, eksamens-ankerchips) ruter riktig.
- L11: Utveksling mangler i hamburgermenyen.

## Positive observations

1. **Ærlighetskulturen i innholdet er forbilledlig:** KUN SKANNET/REKONSTRUERT/MANGLER KILDE/DELVIS-merking overalt; EN-modus sier ærlig at den bygges gradvis; ingen «coming soon» som later som innhold finnes.
2. **Quiz-feedback i DAT102 er over forventning:** per-alternativ forklaring på feil svar + kildelenker begge veier.
3. **Språkbytte i DAT110-quiz uten state-tap** er sjeldent godt gjennomført.
4. **Egenproduserte figurer** (Chord, delays, RPC, vekstkurver, ER-kardinalitet, treghetsmoment) er pedagogiske, labelet og dark-mode-tilpasset — ikke pynt.
5. **Konsoll og nettverk er rent** (0 errors, alle 2xx) gjennom hele økten.
6. **Mobil-disiplin:** null horisontal overflow på alt som ble testet.
7. **Tutoren er kontekstbevisst** (fag + side + brukernavn) og holder seg til riktig fag uten lekkasje.
8. Fremgangssporing vises konsistent (DAT109 5/5-seksjoner, ING164 0/8-kapitler osv.) per innlogget bruker.

## Recommended fix order

1. **M1** — Matching: godta identisk tekst / dedupliser runde (ødelegger øvingsflyt og straffer riktig kunnskap).
2. **M2** — Rett «(raskest vekst)»-formuleringen i quiz-forklaringen (faglig presisjon i kjernetema).
3. **L4 + L5 + L2 + L3** — Småtypoer som er raske å fikse og synlige ofte (s. s.-dobling, manglende mellomrom, entallsfeil, «det/den»).
4. **L6 + P5 + P3** — Render visningsnavn i stedet for interne IDer/slugs i prosa, badges og oppgavelenker.
5. **L1** — Oppdater footer-påstanden om lokal lagring.
6. **L9** — Norske/spesifikke `<title>` på DAT110-sider.
7. **L8 + P12** — Matching-flash som svelger klikk; mindre tutor-knapp på mobil.
8. **L10–L13, P-sakene** — resten ved anledning.

## Pages tested checklist

Interaktivt i nettleser (visuelt + klikk):
- [x] /
- [x] /utveksling
- [x] /dat102
- [x] /dat102/temaer
- [x] /dat102/temaer/bag-adt
- [x] /dat102/temaer/asymptotic-analysis
- [x] /dat102/temaer/dictionaries-and-hashing
- [x] /dat102/temaer/binary-search-trees
- [x] /dat102/temaer/heaps-and-priority-queues
- [x] /dat102/begreper (+ søk og filter)
- [x] /dat102/begreper/big-o-notation (10+ øvrige begrepssider skannet — se under)
- [x] /dat102/pensum
- [x] /dat102/oppsummering
- [x] /dat102/oving
- [x] /dat102/oving/quiz (alle 4 spørsmålstyper)
- [x] /dat102/oving/flashcards
- [x] /dat102/oving/matching
- [x] /dat102/oving/drills
- [x] /dat102/oving/obliger
- [x] /dat102/eksamen
- [x] /dat102/eksamen/gjengangere
- [x] /dat102/eksamen/2022-vaar (komplett, accordions)
- [x] /dat102/eksamen/2020-vaar (skannet-status)
- [x] /dat110
- [x] /dat110/oppsummering
- [x] /dat110/oving/quiz (m/ NO/EN-bytte)
- [x] /dat110/oving/beregning
- [x] /dat110/oving/eksamen-sim
- [x] /dat110/eksamen/dat110-eksamen-06-2025
- [x] /dat110/eksamen/dat110-eksamen-05-2022
- [x] /dat110/temaer/chord-dht
- [x] /dat110/begreper/chord-ring
- [x] /dat110/begreper/delays
- [x] /dat110/begreper/rpc
- [x] /dat107
- [x] /dat107/modellering
- [x] /dat107/modellering/er-modellering (mørk + lys)
- [x] /dat108 (404 som forventet)
- [x] /dat109
- [x] /dat109/modellering
- [x] /ing164
- [x] /ing164/kapittel-9/formler (+ formel-modal)
- [x] /ing164/kapittel-9/visualiseringer (interaktiv)
- [x] AI-tutor (DAT102-kontekst, hashing-spørsmål)

Programmatisk skannet (status + red-flag-regex på rendret HTML, innlogget):
- [x] Alle 52 tilgjengelige /dat102/begreper/* (200, rene)
- [x] Alle 8 /dat102/eksamen/* + gjengangere (200, rene)
- [x] 26 DAT110-ruter inkl. alle temaer/begreper/eksamenssett (200, rene, 0 æøå-feil)
- [x] Alle 58 /dat107/<area>/<topic> (200, rene) + alle 45 bilde-assets (200)
- [x] /dat109/* (8 ruter) og /ing164/* (formelark, eksamen, kapittel 2/9/21/29) (200, rene)

Mobil 390 px (iframe-viewport): 13 sider — se Mobile-seksjonen.

## Appendix

**Screenshots taken (i sesjonen, referert med ID):** ss_2721iflwe (hjem topp), ss_1109uvtrh (utveksling), ss_3233elcyv (dat102 forside), ss_4369quvsi/ss_5482et9i6 (quiz Q1 feil-flyt), ss_2270xxgi1 (sant/usant), ss_3505h8o33 (selvsjekk), ss_4635z8ek0 (flere riktige), ss_1099o0d99 (flashcard bakside), ss_3582ruven/ss_4349qawqo/ss_8506tv9pv/ss_1198rl8fs (matching-bug + fullført runde), ss_2317pvkg2 (drill løsning), ss_5092ujr0v/ss_013355owz (eksamen 2022 + accordion), ss_4422zfvha (2020 kun skannet), ss_3433p7hjg/ss_52176ssy2 (tutor-svar), ss_4553wh8gv (06-2025 advarsel), ss_5213z4js7 (EN-modus), ss_626294a31/ss_8451ldoh6 (quiz språkbytte m/ state), ss_1812teamp (Chord-figur), ss_0056txmdp (delay-figur), ss_269967yds (RPC-figur), ss_66041pjj4/ss_9402b9neu (dat107), ss_706516ozh (ER-PNG mørk), ss_8118ayd2s (ER-PNG lys), ss_1566i9d3v/ss_4154wim5m (dat109), ss_3214t6y8s/ss_7600oy6vo (ing164 + KaTeX), ss_30608a59e (treghetsmoment interaktiv), ss_7921h3q4x/ss_6453cje0v/ss_08212azb3/ss_590026zks/ss_92719w27f (mobil 390 px), ss_924294z12/ss_2266fn8zn (lys modus). Skjermbildene er tatt i økten og ikke arkivert som filer.

**Notes:**
- Viewporten på desktop var 855 CSS-px pga. brukerens standard­zoom (64 %); dette er en vanlig laptop-bredde og påvirker ikke funn.
- Ekte vindus-resize til 390 px var ikke mulig (OS-minimumsbredde + zoom); iframe-metoden gir korrekte breakpoints, men hover/touch-fysikk på ekte mobil er ikke testet.
- Ingen data ble endret: quiz/flashcards/matching/drills lagrer øvingsfremgang i localStorage (egen nettleser), ikke i brukerens Postgres-fremgang. Ingen sider ble markert fullført manuelt; DAT109 auto-markering kan ha registrert besøk på /dat109/modellering (oversikt) — siden sto allerede som 5/5.
- Tutor ble stilt ett ufarlig spørsmål; samtalen kan slettes/ignoreres.

**Unanswered questions:**
1. Er to F11b-oppføringer (før/etter timen) ønsket som separate chips, eller skal de slås sammen i visning?
2. Skal «Godkjent prøve (resit)» få kilde når den foreligger, eller fjernes fra listen?
3. Er fokus-ringer bevisst nedtonet (design), eller mangler `:focus-visible`-stiler?
4. DAT110-titler/badges på engelsk («Topic:», «Concept:») — bevisst til EN-modus er ferdig, eller forglemmelse?
