# EGB339 Week 2–8: design handoff

Status: implemented extension of the approved Week 1 system; browser finish review pending. This is not a new global design specification.

## Overview

The user approved extending **course navigation + visual engineering textbook + interactive robotics notebook** to Weeks 2–8. Study clarity remains the governing constraint. The existing `egb339-week-one-design.md` and `.json` are preserved as the historical pilot specification; their former pilot-only rollout restriction is superseded by this explicit approval, not silently rewritten.

This ordinary extension preserves the incumbent palette, typography, control shapes and article structure. Each week's subject determines its inline figures and interactions. No root `PRODUCT.md`, `DESIGN.md`, sidecar or unrelated course was changed.

## Colors

The reused Week 1 light/dark tokens are defined in `src/app/egb339/week-one.css`. Blue is technical information/frame A; purple is a second mathematical object/frame B; green is completion/validity; red is invalidity; amber is a caveat, boundary or singularity. Labels, line styles, marker shapes and explicit result text supplement color.

Original QUT/RTB raster plots retain their source colors and white paper, with captions distinguishing their axis colors from application status colors. These are documents, not accidental light-theme panels. No new decorative palette or gradient was introduced.

## Typography

The article inherits the approved 17px/1.7 body and mathematical renderer. Week titles remain `clamp(30px, 2.6vw, 38px)`, topic headings 27px and subheadings 20px. Prose caps at 740px/72ch; figures may use the wider content column. Assessment part headings are 17px and nested calculation headings 16px. Captions remain 13px/1.65.

Markdown heading offsets accommodate topic → exercise/assessment → calculation nesting without changing canonical mathematical content. Repeated generic headings and callout labels are removed only from the weekly presentation; the explanatory text and original source data remain intact.

## Layout

The expanded sidebar is now shared across EGB339, not limited to Week 1. It uses a 260px column and 40px gap, reducing to 244px/32px at 1300px. Week/topic/status grouping remains visible without accordions; the list itself scrolls independently.

Jump navigation sticks below the 64px site header. A ResizeObserver measures its actual wrapped height for anchor offsets. Reading position uses native scroll measurements, bounded to one animation frame, while completion remains explicit and independent. Current-week reveal moves only the sidebar on route entry.

Weekly topics use 56px top spacing and a 24px separator inset. Inline figure/explanation grids use a 28px gap; interactive pairs use 32px and stack at 1050px. Ordinary prose returns to the reading measure between these blocks. These are observed implementation values, not a claim that final desktop spacing has passed screenshot review.

## Elevation & Depth

The new weekly content uses paper, whitespace and thin rules. No dashboard grid, card nesting, glow, decorative shadows or entrance animation was added. Selected controls and semantic feedback use restrained tonal fills. The existing tutor action occupies the sidebar's reserved desktop slot.

## Shapes

Controls retain 4px corners; source images and compact feedback retain 2px corners. Topics are document sections, not rounded containers. SVG diagrams use labeled geometry, consistent scale and accessible titles/descriptions. No stock illustration or decorative asset was introduced.

## Components

1. **Shared navigation:** visible Week → Topic hierarchy, active reading location, original completion keys and cross-week anchors. Previous/Next uses week documents. Legacy topic routes remain available.
2. **Reading and answers:** server-rendered theory, worked examples and existing solution content; real reveal buttons and stable namespaced answer links on weekly pages. Existing standalone lesson disclosure presentation is preserved where it has separate styles.
3. **Existing labs:** embedded SE(2), FK and IK explanations reuse their mathematical engines and original worked examples. No copied alternative implementation of those engines.
4. **Subject-specific additions:** spatial rotation order and matrix-column identity; geometric Jacobian contributions; joint-space versus Cartesian path; image coordinates and a strict-threshold mask. Source-based RPR and unreachable-IK diagrams, velocity-profile and homography calculations supplement these bounded interactions.
5. **Sources:** bounded QUT excerpts, licensed RTB plots and the existing attributed highway image appear beside relevant explanations. Provenance records source page, treatment, purpose and licensing limitation.

## Do's and Don'ts

- Keep the course sidebar persistent and learning content calm; let mathematical objects and source figures supply visual interest.
- Keep the existing completion keys and authoritative exercise/assessment data; reading location is not completion.
- Preserve source model distinctions: the RPR chain, QUT 2R lab and Dobot are different robots.
- Do not interpret static detector success as screenshot, interaction, accessibility or runtime approval.
- Do not normalize any remaining visual defect into the design system before the deferred review.

### Documentation pass

Impeccable's documenter role was performed manually after the requested documentation agent hit its usage limit. Sources checked: `week-one.css`, `study-weeks.css`, the existing pilot design reports, navigation, weekly renderer, figures and disclosure components. No incumbent system file was rewritten.

Five-line system summary:

1. Palette: inherited semantic light/dark colors; labeled blue/purple mathematical identities.
2. Type: inherited article scale; 740px prose with wider technical figures.
3. Navigation rule: all week topics visible; native anchors and separate completion status.
4. Content rule: subject-specific inline figures and calculations, not repeating cards.
5. Interaction rule: actions are controls; navigation is links; source answers remain single-source.

Not canonized or repaired here: possible wrapped-label collisions, final typography/spacing drift and long-page performance; these require the browser review explicitly deferred by the user. The code-only Impeccable detector returned no findings; there is no independent screenshot finish-review verdict for this rollout yet.
