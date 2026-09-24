---
date: 2026-05-27
status: DEFERRED — DO NOT IMPLEMENT YET
priority: deferred until DAT110 P1.B/C/D/E/F/G content is complete
authorized_to_start: NO
---

> **DEFERRED — IKKE IMPLEMENTER NÅ.** Dette dokumentet beskriver et planlagt visuelt redesign av eksamen-prep ("Studio Notebook"-retningen). Det skal **ikke** påbegynnes før DAT110-eksamen er ute av veien og resterende P1-leveranser (B, C, D, E, F, G) er ferdige. Hvis du leser dette og vurderer å starte D1, **stopp og spør først**.

# Eksamen-prep design overhaul plan

## Background

DAT110 P0 og P1.A er pushet til origin/main. Faglig funksjonalitet begynner å bli god, men hjemmesiden og den overordnede visuelle stilen ser "vibe-coded" ut: mye tomrom, lite tydelig layout-system, cards føles tilfeldige, mangler sterkere visuell identitet. Dette dokumentet er resultatet av en designanalyse mot `/home/skjold/dev/git/awesome-design-md`-repoet (71 DESIGN.md-eksempler).

## Recommended design direction: "Studio Notebook"

En hybrid av Mintlify's reading-optimized typografi, Linear's surface-/spacing-system, og Notion's tinted-card-paradigme — kalibrert for et norsk eksamensøvings-nettsted.

**Kjernebeskrivelse**:
- **Atmosfære**: studie-notebook. Rolig, lesbart, hierarkisk. Føles som en velorganisert digital notatbok hvor hvert fag har sin farge-tab.
- **Canvas**: lys-modus default `#fafafa` (varm-grå paper-tone). Dark-modus `#0a0a0a` med `surface-1: #141414` til `surface-3: #1a1a1a` for kort-dybde-hierarki.
- **Aksent-system**: hver fag har én primær farge (allerede etablert: physics-orange, network-blue, sysdev-green, dat107-amber, akseptert-purple). Ingen "global" aksent — fag-fargen er brand-signalet på fag-spesifikke sider, og **kontekst-skifter** når brukeren navigerer.
- **Typografi**: **Inter** for UI/prose (gratis, web-optimert, nordisk-vennlig), **JetBrains Mono** for kode + tabular-figures (delay-beregning, CIDR, vekt-prosent). Display-headers fontWeight 600, body fontWeight 400, captions fontWeight 500. Negativ letter-spacing kun på H1-H2 (-0.5 til -1 px).
- **Spacing-skala**: Linear-inspirert 8-trinns: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 96 px`.
- **Surface-hierarki**: 3 nivåer i lys-modus, 4 nivåer i dark-modus. Hairlines i stedet for tunge 2 px borders der det er innholds-grupperinger.

**Hvorfor det passer eksamen-prep**:
- Bevarer eksisterende fag-farge-system (ingen visuell omskoling for brukeren).
- Reading-optimized for konsept-/eksamen-sider hvor lange tekster må være lesbare.
- Card-hierarki klargjør hva som er primær (start quiz) vs sekundær (hurtigtilgang) vs tertiær (kapitler).
- Gratis fonter, ingen lisens-trøbbel.
- Dark mode ikke en ettertanke — bygget inn i surface-systemet fra grunn.

**Hva vi bør unngå**:
- Globalt brand-aksentfarge som overskriver fag-farger.
- Tunge gradient-cards på tvers.
- Display-fonts som krever lisens (Sohne, Geist Display, Notion Sans).
- Hero-sliders, animated heroes, parallax-effekter.
- Skygger sterkere enn `shadow-sm` på standard cards.
- Notion-aktig pastell på utviklerinformasjon.

## Implementation checkpoints (D1–D6)

| # | Checkpoint | Scope | Deliverable | Estimat |
|---|---|---|---|---|
| **D1** | Design audit + tokens | `tailwind.config.js`-utvidelse med typography-, spacing-, surface-, shadow-tokens. CSS-variabler i `globals.css`. Last inn Inter + JetBrains Mono via `next/font/google` (display: 'swap', preload: true). Skap `<Container>`-primitive. | Tokens + font-loading + Container. Ingen UI-endringer ennå. | ~150 linjer |
| **D2** | Homepage redesign | Ny `/`-side: kompakt hero (venstre 2/3 tekst, høyre 1/3 eksamen-countdown hvis innen 30 dager), redesignet subject-grid, "Fortsett der du sluttet"-rail, "Dagens øving"-banner, AI tutor-card, footer-stripe. Bevar `getSession` + `isAkseptertUser`-logikk. | `src/app/page.tsx` rewrite + ev. nye komponenter. | ~300 linjer |
| **D3** | Subject-card-komponent | `<SubjectCard>` med tint-band (fag-farge), progress, CTA-rad. Brukes i `/` (D2) + klar for fremtidige fag-undersider. Definér `SubjectCardProps`-type i `src/lib/subjects.ts`. | Komponent + types. | ~200 linjer |
| **D4** | DAT110 diagram system | `<DiagramFrame>` + `<DiagramSlot>` + `<InlineSVG>`. Sett opp `public/dat110/diagrams/`-mappe og `src/components/dat110/diagrams/`-strukturen. Sjekkliste-README for navngiving og bygging. | System uten faktiske diagrammer. | ~150 linjer |
| **D5** | First DAT110 diagrams (round 1) | Implementer ChordRing, DelayComponents, OSIStack, Encapsulation (4 diagrammer, lav-kompleksitet). Integrér i tilhørende concept-page-layouts. Dark-mode + a11y verifisert. | 4 SVG-komponenter + integrasjon. | ~400 linjer SVG totalt |
| **D6** | QA + polish | Mobile-test (375 px → 1440 px), dark-mode-test alle sider, tab-fokus-ringer, font-loading-FOUT, regressjons-sjekk i DAT109/ING164/DAT107. | Polish-pass + regression-rapport. | ~50 linjer |

**Etter D6**: visual-asset-mengden kan utvides løpende (round 2 + 3 av diagrammene) uten å være blokkerende.

## Design system notes

**Typography-tokens** (fra Mintlify-mønsteret, justert for norsk lesbarhet):

| Token | Family | Size (px) | Weight | LH | LS |
|---|---|---:|---:|---:|---:|
| hero-display | Inter | 48 | 600 | 1.10 | -1.0 |
| heading-1 | Inter | 32 | 600 | 1.15 | -0.5 |
| heading-2 | Inter | 24 | 600 | 1.25 | -0.3 |
| heading-3 | Inter | 20 | 600 | 1.30 | -0.1 |
| body | Inter | 16 | 400 | 1.55 | 0 |
| body-sm | Inter | 14 | 400 | 1.50 | 0 |
| caption | Inter | 13 | 500 | 1.40 | 0 |
| button | Inter | 14 | 500 | 1.20 | 0 |
| mono | JetBrains Mono | 14 | 400 | 1.50 | 0 |
| tabular | Inter (font-feature: tnum) | — | 400 | — | — |

**Spacing-tokens** (8-base): `space-1: 4`, `space-2: 8`, `space-3: 12`, `space-4: 16`, `space-6: 24`, `space-8: 32`, `space-12: 48`, `space-16: 64`, `space-24: 96`

**Surface-tokens** (lys / dark):
- canvas: `#fafafa` / `#0a0a0a`
- surface-1 (default card): `#ffffff` / `#141414`
- surface-2 (nested card): `#f4f4f4` / `#1a1a1a`
- surface-3 (subtle highlight): `#ededed` / `#202020`
- hairline: `#e5e5e5` / `#262626`

**Border-radius**: 4 / 8 / 12 (default) / 16 / 24 px

**Skygger**:
- `shadow-sm` (default cards): `0 1px 2px rgba(0,0,0,0.04)`
- `shadow-md` (hovered cards): `0 4px 12px rgba(0,0,0,0.08)`
- `shadow-lg` (modals/overlays): `0 12px 32px rgba(0,0,0,0.12)`
- Dark-modus: skygger reduseres til lavere intensitet.

## Subject-card-design (D3)

Per-card-spesifikasjon (anvendt på alle 5 fag inkl. Akseptert):

```
┌─────────────────────────────────────────────┐
│ [Tint-band: fag-farge 100/dark:900-tone]    │ 12 px høyt
│ DAT110                                ▍▍▍▍▍ │ kode-prefix + emoji/ikon
├─────────────────────────────────────────────┤
│ Nettverksteknologi                          │ H3 (22 px / 600)
│ Distribuerte systemer, Chord DHT,           │ Body-sm (14 px / 400)
│ delay-beregning og protokoller.             │ 2-linjer max
│                                              │
│ ──────────────────────────────────────────  │ hairline
│                                              │
│ ▰▰▰▰▰▰▰▱▱▱  60%                            │ progress bar
│ 13 kapitler · Sist åpnet: 3 dager siden    │ caption
│                                              │
│ [Fortsett →]              [Quiz]            │ primary + secondary CTAs
└─────────────────────────────────────────────┘
```

## Visual assets / diagram-strategi (D4 + D5)

| Asset-type | Lokasjon | Når brukes |
|---|---|---|
| **Inline React SVG** (komponent) | `src/components/dat110/diagrams/ChordRing.tsx`, etc. | Default for pedagogiske diagrammer. Dark-mode-vennlig via currentColor. Kan ta props for highlight/animasjon. |
| **Public SVG-fil** | `public/dat110/diagrams/*.svg` | Når ferdig SVG leveres manuelt og ikke trenger props/interaksjon. Brukes via `<InlineSVG src="…" />`. |
| **Public PNG-fil** | `public/dat110/diagrams/*.png` | Bare for håndtegnet/eksportert som ikke vektoriseres lett. Krever både `light` og `dark`-variant. |

**Komponent-struktur**:
```
src/components/dat110/diagrams/
  ├── DiagramFrame.tsx       ← wrapper (caption + alt + container)
  ├── DiagramSlot.tsx        ← "kommer snart"-placeholder
  ├── ChordRing.tsx          ← #1
  ├── ChordFingerLookup.tsx  ← #2
  ├── OSIStack.tsx           ← #3
  ├── Encapsulation.tsx      ← #4
  ├── DelayComponents.tsx    ← #5
  ├── ThroughputBottleneck.tsx ← #6
  └── index.ts
```

**Prioritert diagram-liste** (round 1 først):

| # | Diagram | Side | Format | Round |
|---|---|---|---|---|
| 1 | Chord ring (m=5, 5 noder) | `/dat110/begreper/chord-ring` | Inline React SVG | 1 |
| 2 | Finger table lookup | `/dat110/begreper/key-resolution` | Inline React SVG | 2 |
| 3 | OSI/TCP-IP stakk-sammenligning | `/dat110/temaer/protocol-layering` (P1) | Inline React SVG | 1 |
| 4 | Encapsulation/decapsulation | `/dat110/temaer/protocol-layering` | Inline React SVG | 1 |
| 5 | Delay components (4) | `/dat110/begreper/delays` | Inline React SVG | 1 |
| 6 | Throughput bottleneck | `/dat110/begreper/throughput` | Inline React SVG | 2 |
| 7 | Overlay multicast tree | `/dat110/begreper/application-layer-multicast` | Inline React SVG | 3 |
| 8 | IP forwarding longest-prefix | `/dat110/begreper/subnetting` | Inline React SVG | 3 |
| 9 | ARP request/reply + switch learning | `/dat110/begreper/arp-and-mac-addressing` | Inline React SVG | 3 |
| 10 | Vector clocks timeline | `/dat110/begreper/vector-clocks` | Inline React SVG | 2 |
| 11 | Causal consistency violation | `/dat110/begreper/consistency-models` | Inline React SVG | 3 |
| 12 | Quorum read/write | `/dat110/begreper/quorum` | Inline React SVG | 3 |
| 13 | Fault tolerance 2k+1 / 3k+1 | `/dat110/begreper/fault-models` | Inline React SVG | 2 |
| 14 | RPC call flow (sync) | `/dat110/begreper/rpc` | Inline React SVG | 3 |
| 15 | Sync vs async RPC | `/dat110/begreper/rpc` | Inline React SVG | 3 |

**Diagram-policy**:
- Lag selv pedagogisk forenklede SVG-er. Aldri kopier fra lærebøker/slides.
- `stroke="currentColor"` + `fill="currentColor"` der mulig — dark-mode-tilpasning gratis.
- Aldri rene `fill="#000"` / `fill="#fff"` — bryter dark mode.
- `aria-label` på `<svg>` + `<title>` inni for skjermlesere.
- Komplekse diagrams: lever wireframe-skisse først (tekstbasert boks-tekst-pil-format), implementer SVG etter gjennomgang.

## Homepage layout (D2)

Ny `/`-struktur top-til-bunn:

1. **Top-bar / navigation** — beholdes uendret.
2. **Hero** — kompakt og kontekstuell (ikke sentrert blokk). Venstre 2/3 tekst, høyre 1/3 eksamen-countdown hvis fag har eksamen innen 30 dager.
3. **Subject grid** — redesignet card-system. 4-bred på lg+, 2-bred på sm, 1-bred mobile. 24 px gap.
4. **«Fortsett der du sluttet»-rail** — 3 siste besøkte sider (fra ProgressProvider) eller "Foreslått start" som fallback.
5. **«Dagens øving»-banner** — én fremtredende CTA med dynamisk innhold.
6. **AI tutor CTA** — sekundær card i hero-row, ikke kun floating.
7. **Footer-stripe** — eksamensdatoer, hurtig-aksjon-lenker, kreditering.

## Risks

| # | Risk | Mitigation |
|---|---|---|
| 1 | Overdesign | Hold på "Studio Notebook"-tonen: alt visuelt skal tjene leselighet eller informasjon. Kan-tas-vekk-test per element. |
| 2 | Inkonsistens med DAT109 | D3 introduserer `<SubjectCard>` som alle fag-landing-pages refaktoreres til (etter D6). |
| 3 | For mye layout-arbeid før innhold | Skarp tidsbegrensning: D1+D2 i én PR, D3+D4 i én PR, D5+D6 i én PR. Tre PRs ≤ 1 uke. |
| 4 | Dark mode-regresjoner | Per checkpoint: visuell sjekk av minst `/`, `/dat109`, `/dat110`, `/dat110/oving/quiz`, `/dat110/eksamen/dat110-eksamen-05-2024` i dark mode. |
| 5 | Mobile regresjoner | Per checkpoint: 375 px + 414 px viewport-test obligatorisk. |
| 6 | Font-loading FOUT | `next/font/google` med `display: 'swap'` og `preload: true`. System-font-stack som fallback. |
| 7 | Diagram-kvalitet under konsept-kvalitet | Lever wireframe-skisse FØR endelig SVG. `<DiagramSlot>` i stedet for å publisere svakt arbeid. |
| 8 | Tailwind-config-endringer kan bryte eksisterende klasser | D1 utvider, fjerner ikke. Eksisterende `bg-network-500` etc. beholdes intakt. |

## Responsive typography & nav (mid-breakpoint regression — flagged 2026-05-27)

Brukerinnspill: smale/cropped Chrome-vinduer skalerer overskrifter og topnav dårlig. Header/nav blir trang og tekst bryter visuelt rart. DAT110 hero + eksamenformat-strip får for stor typografisk tyngde når viewporten er smal (rundt 1000–1250 px). Mobile (375–414 px) er stort sett OK, men "tablet-til-laptop"-zonen er ikke testet i dagens layout.

**Tiltak som skal håndteres i D1/D2** (ikke implementeres nå — deferred sammen med resten av designoverhauls):

- **Fluid typography med `clamp()`**: erstatt faste px-størrelser på H1/H2/eksamenformat-overskrifter med `clamp(min, preferred, max)`-uttrykk slik at typografien skalerer kontinuerlig mellom breakpoints, ikke i hopp.
- **Kontrollerte heading-sizes**: maks H1-størrelse på lg-breakpoint bør ikke gå over `clamp(28px, 4vw, 40px)` (illustrasjonsverdier — finjusteres i D1).
- **Tidligere nav-breakpoint**: dagens topnav switcher først ved `md` (768 px). Vurder å introdusere et **compact-nav-modus** allerede ved `lg`-breakpoint (1024 px) hvor lange fagnavn forkortes til koder (DAT110, DAT109, ING164, DAT107) i stedet for full beskrivelse.
- **Eksplisitt testing av 1000–1250 px-zonen**: legg til viewport-bredder 1024, 1100, 1200 i obligatorisk QA-sjekkliste — i dag testes bare ~375 px og ~1440 px.
- **Eksamenformat-strip (DAT110 landing)**: 5×2-grid på `xl` (1280 px+) blir trang på 1100–1250 px. Vurder å bytte breakpoint fra `xl:grid-cols-5` til `xl:grid-cols-4` med jevn 4×2 + 1×2-wrap, ELLER bruk `auto-fit minmax()`-CSS-grid for naturlig vekst.
- **Title-truncation i smale cards**: lange titler som "Eksamenssimulering" eller "Anbefalt studieplan" bryter visuelt — bør få `text-balance` eller `line-clamp-2` for å unngå skjev wrapping.

**Test-cases (legges til D6 QA-sjekkliste)**:
- 1024 px (iPad landscape)
- 1100 px (small laptop)
- 1200 px (medium laptop)
- 1250 px (rett før xl-breakpoint slår inn)

Disse testes typisk dårlig med kun mobile + desktop. Skal eksplisitt dekkes i D6 visual QA-pass.

**Implementeres i**: D1 (typography-tokens med clamp), D2 (nav-breakpoint-justering), D6 (mid-viewport-QA).

## Recommendation

**Start med D1 (tokens + primitives).**

1. Lavest risiko, høyest gevinst-per-linje: ~150 linjer som låser opp resten uten å bryte UI.
2. D2-D6 kan deretter implementeres trygt med tokens på plass.
3. Reversibilitet: hvis "Studio Notebook"-retningen ikke føles riktig etter D1, kan tilbake-rulles med 1 git-revert.
4. **D1 + D2 i én PR** er fortsatt akseptabel størrelse (~450 linjer) og leverer en visuelt forbedret hjemmeside som umiddelbar tilbakemelding.

**Anbefalt rekkefølge**: D1 + D2 → D3 + D4 → D5 → D6. Fire push-runder totalt.

## Activation criteria

Dette dokumentet skal **kun** aktiveres etter at:
- ✅ DAT110-eksamen er ute av veien (etter mai/juni 2026)
- ✅ P1.B.1 + P1.B.2 (alle 4 resterende offisielle eksamener) er pushet
- ✅ P1.C (reconstructed 06-2025) er pushet
- ✅ P1.D (parent listings) er pushet
- ✅ P1.E (gjengangere) er pushet
- ✅ P1.F (Canvas-quiz) er pushet
- ✅ P1.G (pensum) er pushet
- ✅ Brukeren eksplisitt sier "start design overhaul"

Inntil alle disse er sant: **ikke implementer D1–D6**.
