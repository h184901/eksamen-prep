---
date: 2026-05-28
status: QA REPORT — manual browser QA, no code changes
target: deployed site https://eksamen-prep.vercel.app (origin/main v1)
tester_session: Mac, Claude in Chrome MCP, logged in as "haavard"
scope: Full manual browser QA of the DAT110 experience (15 QA areas)
constraints:
  - no code changes
  - no commits
  - no pushes
  - no vault changes
  - testing/reporting only
---

# DAT110 Browser QA Report

## Summary
- **Overall verdict: mostly ready.** Hele den pedagogiske loopen fungerer (quiz, flashcards, matching, regneøving, eksamenssim, eksamener, gjengangere, begreper, temaer, diagrammer). Ingen blockers, ingen 404 på aktive ruter, ingen scoring-feil, ingen copyright-/local-only-lekkasje. De gjenværende problemene er **stale "kommer i P1/P2"-tekster** og interne prosjekt-termer som har lekket til brukervendt tekst — irriterende, men ikke ødeleggende.
- **Testet mot deployed site** (`https://eksamen-prep.vercel.app`), ikke lokal dev-server.
- **Browser/viewport:** Claude in Chrome MCP, macOS. Vinduet var **låst til 855px CSS-bredde** (DPR 2) — resize til både 1600 og 390 ga fortsatt innerWidth 855. Ekte mobil (<640) og wide-desktop (>855) kunne derfor ikke testes via resize.
- **Login:** innlogget som `haavard` (persistert gjennom hele økten).

## Git/local status
- `git status`: 1 untracked fil (`reports/dat110-ux-visual-handoff.md` fra forrige økt) + denne rapporten. Ingen andre endringer.
- **Local `main` (2935322) er 23 commits BAK `origin/main` (81e41b2).** Debian-sessionen pushet hele v1 til origin; Vercel bygger fra origin/main, så deployed site har v1. Local Mac-repo er ikke pullet (ikke bedt om det).
- origin/main-loggen bekrefter v1: P0c quiz, 6 eksamener, 5 øvingsmoduser, 23 begreper, 8 temaer, diagrammer, homepage-redesign, responsiv nav-fix.

## Routes tested
`/` · `/dat110` · `/dat110/oving` · `/dat110/oving/quiz` · `/dat110/oving/flashcards` · `/dat110/oving/matching` · `/dat110/oving/beregning` · `/dat110/oving/eksamen-sim` · `/dat110/oving/eksamen-sim/dat110-eksamen-05-2024` · `/dat110/eksamen` · alle 6 `/dat110/eksamen/dat110-eksamen-*` (alle 200) · `/dat110/eksamen/gjengangere` · `/dat110/begreper` · `/dat110/begreper/{rpc,chord-ring,fault-models,...}` · `/dat110/temaer` · `/dat110/temaer/fault-tolerance` · learnMore-mål (alle 200).

## Blockers
Ingen.

## High severity issues
Ingen funksjonelle HIGH-feil funnet. Quiz-scoring, solution-accordions, learnMore-lenker, multiple-answer-bekreftelse, matching, flashcards-flip og eksamen-anchors fungerer alle korrekt.

## Medium severity issues
1. **Stale "Aktiv øving"-banner på `/dat110`.** Teksten sier «Eksamenssim, flashcards, matching, regneøving og eksamensdrill **kommer i P1/P2**» — men alle 6 modusene er LIVE (verifisert på `/dat110/oving`, alle merket «AKTIV»). Misvisende.
2. **Stale "Tidligere eksamener"-tekst på `/dat110` (Referansemateriell).** Sier «V2024 ligger ute … Flere år **kommer i P1**» — men 6 eksamener er live.
3. **Stale nøkkeltema-labels på `/dat110`.** «Vector clocks og consistency» og «Fault tolerance» viser «📚 Konseptside kommer i P1», men sidene finnes nå (`/begreper/vector-clocks`, `/begreper/consistency-models`, `/begreper/fault-models`, `/temaer/fault-tolerance` → alle 200). Bør lenkes i stedet for «kommer».
4. **"Øv på dette →"-CTA-er på nøkkeltema-kortene mangler topic-filter.** Alle peker til bare `/dat110/oving/quiz` uten `?topic=`. CTA-en lover temaspesifikk øving men forhåndsvelger ikke temaet.
5. **Duplikat/stale eksamen-card.** På `/dat110/eksamen` ligger «KOMMER SENERE — Juni 2025 (rekonstruert) — Kommer i P1.C» rett under den allerede aktive «REKONSTRUERT Juni 2025»-cardet. Den rekonstruerte eksamenen er live, så placeholderen er utdatert.
6. **Quiz-teller ignorerer kilde-filter.** Med kun «Tidligere DAT110-eksamener» (6) valgt viste selectoren «av **85** tilgjengelige» og «Start quiz (**10** spørsmål)». Selve quizen klampet korrekt til 6 («Spørsmål 1 av 6»), så det er en **kosmetisk** teller-/knappetekst-bug, ikke en motor-feil.
7. **Interne prosjekt-termer lekker til brukervendt tekst.** «P0a», «P1-kandidat», «P1.C», «P1/P2» dukker opp i: 05-2024-sim figur-merknader, eksamen-listing-card, aktiv-øving-banner og nøkkeltema-labels. En student forstår ikke disse.
8. **Manglende figurer i enkelte eksamensoppgaver.** Oppg 3 (nettverksdiagram), oppg 8 (overlay-topologi), oppg 9 (RPC/data-store), oppg 10 (DHT-ring) refererer figurer som ikke er rendret. Figur-merknadene forklarer i tekst, men **oppg 8a («draw the overlay graph») kan ikke løses fullt uten topologi-figuren**.

## Low severity issues
- **Manglende mellomrom** i listing-intro: «Alle 23**Tier** 1-begreper» og «8**Tier** 1-temaer» (delt komponent på `/begreper` + `/temaer`).
- **Vault-note-navn inline** i konsept-tekstene, f.eks. «(dat110-rpc-intro s. 2)», «(dat110-l9-naming-i s. 18)», «(dat110-project1-spec)». Provenance, men reads som rot for en student (samme prinsipp som «ikke rotete sourceRefs» — her gjelder det konsept-sidene, ikke quiz).
- **Flashcard-tekst** «alle nodeIDer» — litt klønete sammensetning.
- **06-2025 reconstructed-banner** er gul ⚠️ full-bredde — ordlyden er riktig, men litt mer prominent enn «liten nøktern merknad» (fortsatt akseptabelt; gul, ikke rød).
- **Tutor-CTA overlapper footer.** Den flytende «Spør tutoren»-knappen dekker fag-nav-teksten («DAT110 · DAT10[7]») nederst på homepage.

## Visual/design issues
- Homepage-redesignen (studio notebook) ser **profesjonell** ut og betydelig mindre «vibe coded»: eyebrow-labels, rene cards med aksent-border per fag, monokrom mørk base. DAT110-kortet er tydelig (først, blått, flest pills).
- **Liten ubalanse:** DAT107-fagkortet har ingen quick-pills (tommere enn DAT110/DAT109/ING164).
- **Eksamenformat-stripen er «Alltid synlig»** (ikke collapse) på `/dat110` — matcher anbefalingen fra UX-handoffen. 10 oppgaver i ryddig 5×2-grid.
- **Diagrammer (keep):** Chord ring-diagrammet er et custom SVG med ID-rom-sirkel (0–31), noder N1/N8/N14/N21/N28, nøkkel k18 (oransje), uthevet successor-sti (blå), legende og caption — faglig nyttig, ikke en bok-kopi. RPC-kall-flyt-SVG finnes også. Begge har aria-label.

## Dark mode issues
Ingen. Dark mode er gjennomgående sterk: kort-bakgrunner, gradienter, quiz answer-states (grønn/rosa), source-tags, learnMore-lenker (blå, lesbare), accordions og diagrammer har god kontrast. Chord-diagrammet bytter node-fyll (mørk→hvit) korrekt mellom mørk/lys. Light mode er også ren med god kontrast.

## Responsive issues
**Begrenset testing:** vinduet var fysisk låst til 855px CSS-bredde på denne maskinen — kunne ikke krympe til mobil eller utvide til wide-desktop. Ved 855px:
- Ingen horisontal scroll (`scrollWidth === innerWidth`).
- Grids reflower til 2 kolonner; nav kollapser til hamburger (fungerer: Hjem/ING164/DAT109/DAT110/DAT107).
- Ingen knekte overskrifter.

**Ikke verifisert:** ekte iPhone-bredde (<640px) og bred desktop (>855px). Bør testes på ekte enhet/responsivt verktøy før eksamen.

## Quiz QA
- **Testet ~14 spørsmål** på tvers av kilder: full miks (single-answer Canvas), kun-eksamen (6 single), kun-generert (multiple-answer).
- **Source filters testet:** exam (6), canvas (61), generated (18), kombinasjoner. Tellere stemmer (sum 85).
- **Single-answer:** låser ved klikk, grønn rett / rosa feil + ✗, forklaring + whyWrong («Hvorfor dine valg var feil: B. Dette beskriver ARP, ikke DNS»).
- **Multiple-answer:** «VELG ALLE SOM PASSER»-badge, checkbox-er, krever «Bekreft svar (N valgt)», alt-eller-ingenting-scoring (A+B+C rett → 1/1).
- **learnMore:** blå pill-lenker, peker til ekte sider (verifisert 200: `/begreper/fault-models`, `/temaer/fault-tolerance` osv.).
- **Source tags rene:** «📋 Canvas Task 9», «📋 Mai 2024 oppg 1», «✏️ Generert (pensum)» — ingen Obsidian-paths inline.
- **Distraktorer plausible:** riktig svar ikke alltid lengst; gode feller (CIDR /23 «23 adresser», forwarding vs routing). Ikke for åpenbare.
- **Resultatside:** karakter «A», score, %, «Prøv samme quiz igjen», «Tilbake til temavalg», utvidbar «Gjennomgang» per spørsmål. («Drill bare feil» dukket ikke opp ved 100 % — sannsynligvis betinget av feilsvar.)
- **Feil funnet:** kun den kosmetiske teller-bugen (Medium #6).

## Flashcards QA
8 tema-filtre med tellere (sum 48). Kort viser spørsmål først; «Vis svar» flipper (3D-animasjon) til SVAR + blå LES MER-lenker; «Marker som kan» aktiveres etter flip; Forrige/Neste fungerer (reset til spørsmål-side per kort). Innhold godt og eksamen-rettet. Ingen interaksjonsfeil.

## Matching QA
10 tema (sum 48), kuratert rundt confusables (Lamport vs vector, primary-backup vs quorum, TCP vs UDP, ARP vs DNS). Riktig par → grønn «✓ Riktig — [begrep]», teller +1. Feil par → rød «✗ Ikke helt — prøv en annen kombinasjon», ✗ på begge celler, teller uendret, auto-reset. Par er ekte forvekslinger (ikke trivielle). Layout: feedback-banneret skyver kolonnene litt ned (kortvarig), ellers ryddig.

## Regneøving QA
25 drills · «Selvgradert (ingen autograder)». TEMA- + VANSKELIGHET-filtre (begge sum 25). «Vis løsning» skjult by default → ekspanderer til «Forventede steg» (nummerert) + «Fasit»-boks. Verifisert Chord-successor-drill: stegene og fasiten `{1→1, 12→15, 17→19, 20→29, 31→1 (wrap)}` er korrekte. Matematikk (≥, →, mengder) lesbar. LES MER-lenker til stede.

## Eksamenssim QA
Alle 6 eksamener tilgjengelige som «Start 4-timers økt». Juni 2025 har distinkt **«REKONSTRUERT»**-badge (oransje), de andre «SIM-MODUS». Direkte rute `/dat110/oving/eksamen-sim/dat110-eksamen-05-2024` fungerer (10 oppgaver, alle «Vis løsning» lukket, Q1–Q10-nav, lenke til full eksamen-side, «lagrer ingenting»). Forskjellen sim vs full eksamen er forklart eksplisitt. **Issue:** 05-2024-sim figur-merknadene lekker «P0a/P1-kandidat»-termer (Medium #7).

## Eksamener QA
Listing viser 6 eksamener: 5 «OFFISIELL» (grønn) + Juni 2025 «REKONSTRUERT» (oransje). Alle 6 detalj-sider returnerer 200. Solution-accordion verifisert: «Vis løsning» → «SVAR: 2. Three.» + «KORT BEGRUNNELSE» (lukket by default, korrekt innhold). «Kilder og grunnlag» expandable noterer at sensor-PDF er lokal (ingen lekkasje). **06-2025 er korrekt merket** — gul «⚠️ Rekonstruert eksamen — ikke offisiell … Bruk som øvingskilde, ikke som autoritativ eksamen». Eksamen-anchors (`#oppg-3`, `#oppg-10`) scroller korrekt. **Issues:** stale duplikat-card (Medium #5) + manglende figurer (Medium #8).

## Gjengangere QA
Sterk og nyttig side. Q-slot-tabell (Oppg/Tema/Vekt/Stabilitet/Eksempler) med stabilitets-vurdering («5/5 ÅR», «HØY 4/5», «MIDDELS — roterer») og klikkbare år-eksempler. Pattern-cards med «Se eksempel» (→ ekte eksamen-anchors, verifisert) og «Øv på dette» (▶ expand-toggle, ikke quiz-lenke). Ikke for teksttungt. Lenket både fra øving-hub (som «Eksamensdrill») og fra eksamen — fornuftig.

## Begreper/temaer/diagrammer QA
- **Begreper:** 23 begreper gruppert per 9 tema. Inkluderer `vector-clocks`, `consistency-models`, `fault-models` (→ bekrefter stale landing-labels, Medium #3).
- **Temaer:** 8 temaer (overlay-and-gossip, chord-dht, transport-layer, logical-clocks, consistency-and-replication, fault-tolerance, network-layer, routing).
- **Konsept-sider:** rik markdown (callouts, kodefremheving, anchor-lenker, «Relatert»-pills, «Kilder og grunnlag» collapsed by default). Innhold faglig solid.
- **Diagrammer (verdict):**
  - **keep:** Chord ring (custom SVG, profesjonelt, lesbart, dark/light-ok, aria-label).
  - **keep:** RPC kall-flyt (SVG, aria-label «RPC kall-flyt med klient-stub, server-stub og nettverk»).
  - **ikke verifisert visuelt:** TCP/IP-vs-OSI og Delay-komponenter — bekreft at de holder samme kvalitet (sannsynlig, gitt de to jeg så).

## Link crawl findings
- Ingen 404 på aktive lenker. Alle 6 eksamen-ruter, learnMore-mål (begreper/temaer) og eksamen-anchors → 200.
- «Se i eksamen»/«Se eksempel» → V2024-anchors fungerer (scroller til riktig oppgave).
- **Eneste "lenke-lover-noe-annet"-problem:** nøkkeltema «Øv på dette» → bare quiz uten topic-filter (Medium #4), og de stale «kommer i P1»-labels som egentlig peker til eksisterende innhold (Medium #1–3).

## Content spot-check findings
Faglig stikkprøve — alt korrekt:
- Quiz: DNS=host→IP (D), ARP=IP→MAC, iterativ server (B), CIDR /23=512 (B), Chord succ(19) i {0,9,17,30}=30 (D), quorum-basert (C), forwarding vs routing (B). Gode distraktorer.
- Regneøving: Chord-successor-mapping korrekt.
- Eksamen-løsning (06-2025 1a): ruter med 3 lenker → 3 link-layer-instanser. Korrekt.
- Matching: confusable-par av god kvalitet.
- **Terminologi-notat (ikke feil):** Chord-spørsmål bruker «server-replikaer»/«servere» der pensum vanligvis sier «noder» — internt konsekvent valg, men avviker fra Kurose/Van Steen-ordbruk; verdt en bevisst beslutning.

## Suggested quick fixes before exam
1. **Oppdater de 3 stale «kommer i P1/P2»-tekstene på `/dat110`** (aktiv-øving-banner, tidligere-eksamener, vector-clocks/fault-tolerance nøkkeltema) til å reflektere at modusene/eksamenene/konseptsidene er live — og lenk dem. (Medium #1–3)
2. **Fjern duplikat-cardet** «KOMMER SENERE — Juni 2025 (rekonstruert)» på `/dat110/eksamen`. (Medium #5)
3. **Erstatt interne termer** («P0a», «P1.C», «P1/P2», «P1-kandidat») i all brukervendt tekst med studentvennlig språk eller fjern dem. (Medium #7)
4. **Legg `?topic=`-param på «Øv på dette»-CTA-ene** så de forhåndsvelger temaet i quiz. (Medium #4)
5. **Fiks teller** så «av N tilgjengelige» + Start-knappens antall respekterer kilde-filteret. (Medium #6)
6. **Fiks «23Tier»/«8Tier»** manglende mellomrom. (Low)

## Suggested later polish
- Legg til diagram for oppg 8 (overlay-topologi) — kreves for å løse 8a; vurder også oppg 3/9/10-figurer. (Medium #8)
- Vurder å dempe inline vault-note-navn på konsept-sidene (flytt til «Kilder og grunnlag») for renere lesning.
- Gi DAT107-fagkortet quick-pills for visuell balanse på homepage.
- Juster z-index/posisjon så «Spør tutoren» ikke dekker footer-nav.
- Bekreft TCP/IP- og delay-diagrammene visuelt; verifiser responsiv layout på ekte mobil + wide-desktop (ikke testbart her pga. låst vindusbredde).

## Final recommendation
**Mostly ready — trygg å bruke til eksamensøving nå.** Hele den pedagogiske loopen er funksjonell og innholdet er faglig korrekt i stikkprøvene. Før eksamen bør de seks quick-fixene over gjøres (særlig de stale «kommer i P1»-tekstene og de interne prosjekt-termene, som er det mest synlige tegnet på «uferdig»). Mobil- og wide-desktop-responsivitet bør verifiseres på ekte enhet siden testmiljøet var låst til 855px. Ingen blockers eller HIGH-feil hindrer bruk.
