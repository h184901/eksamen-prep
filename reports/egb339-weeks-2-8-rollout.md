# EGB339 Week 2–8: implementation and QA

Status: **Week 2–8 implementation complete; consolidated browser QA pending.** No commit or push performed. Checks and remaining work are recorded below.

The user's later instruction, “Unngå å bruke playwright. Vi kan heller ta en test når alt er implementert”, supersedes the original requirement for browser testing during rollout. No Playwright was used after that instruction. This handoff does not claim desktop, runtime or production approval.

## Direction contract

THESIS: A week is the primary learning document. Theory, figures, existing labs, worked examples, exercises and assessment walkthroughs live in one chronological article, not a dashboard of topic cards.

OWN-WORLD: Extend the approved Week 1 system documented in egb339-week-one-design.md. Keep its readable article measure, compact expanded syllabus, small control corners, labelled blue/purple frame identities and explicit green/red/amber status semantics. No new site-wide design system.

STORY: Locate the current week and topic, follow a geometric explanation into its mathematics, inspect or manipulate a relevant model, attempt an existing exercise, reveal the single-source solution and record completion with the existing key.

FIRST VIEWPORT: Persistent syllabus at left; breadcrumb, week title and concise purpose at right; compact sticky section links lead into the first substantive explanation and figure. Each week's subject determines its visual emphasis.

FORM: User-pinned extension of the approved engineering article. Native anchors and document scrolling, no concept tournament, decorative animation or new dependencies. Week 2 emphasises transformations; 3 spatial orientation; 4–5 the existing arm lab; 6 velocity; 7 paths and timing; 8 images and array operations.

FINISH: implementation stops after Week 8, source/provenance documentation and non-browser checks. The consolidated desktop screenshot, interaction and independent visual finish review are deferred to the next QA round at the user's request. No commit, push or subsequent redesign.

## Preservation boundary

- Keep the 38 exercises and 12 assessments / 51 solution parts in their existing authoritative data modules.
- Keep topic and assessment routes, existing problem anchors, mathematical engines and progress keys.
- Week pages add topic anchors and namespaced assessment solution anchors; navigation points to the primary week document without removing legacy routes.
- Preserve source caveats and distinguish curriculum association from submission week.
- Leave pre-existing unrelated changes in .gitignore, StudyPlanRoadmap.tsx, study-plan.ts, output and unrelated reports untouched.

## 1. Implemented weeks

All routes `/egb339/uker/uke-2` through `/egb339/uker/uke-8` now render a complete weekly document. The approved Week 1 article is preserved, with the shared expanded navigation. Each weekly document includes its mapped topics, relevant figures/models, practical direction, all existing weekly exercises, associated assessment walkthroughs and original completion controls.

| Week | Subject-specific presentation | Existing work retained |
| --- | --- | --- |
| 2 | Q15 row–column matrix explorer near the explanation; real RTB frame figure; SO(2) and complete SE(2) lesson inline | SE(2) lab, transform/inverse/composition worked examples, Python practical direction, tutorial and assessment solutions |
| 3 | Two 90° spatial rotation orders; selectable matrix columns tied to labeled frame axes; real RTB 3D frame figure | NumPy, SO(3), SE(3), pose graphs, all source equations and solutions |
| 4 | Original, source-grounded RPR chain diagram; embedded FK lesson/lab; CoppeliaSim practical inline | Ordered transform mathematics, tutorial RPR problem, Dobot assessment and its distinct parameters |
| 5 | Embedded IK lesson/lab plus an unreachable-target numerical-optimization example | Both IK branches, QUT presets, reachability/singularity handling, all validated calculations |
| 6 | Jacobian columns visualized as separate velocity contributions at the tool; regular/singular poses and joint-velocity controls | Partial derivatives, local linearization, tutorial solutions and documented QUT corrections |
| 7 | Joint-space versus Cartesian path comparison with the five QUT samples; actual velocity-profile figure and integrated distance example; point–segment diagram | Motion-planning equations, clearance edge cases, tutorial and associated assessment solutions |
| 8 | Actual highway image, interactive pixel/threshold grid, QUT spatula/histogram and subtraction figures, full numeric homography example | Image operations, dtype caveats, chromaticity, shape measures, practical tasks and associated assessments |

### Navigation and preservation

- All course topics remain visible in the sidebar without week dropdowns. Course/week/topic completion uses the existing keys; assessment completion is shared with the standalone assessment route.
- Local navigation includes each topic plus Practical, Oppgaver and Assessment. Each topic uses its existing slug as a stable anchor; Week 1 retains its existing section map.
- Plain topic links in weekly content and syllabus map to their primary week anchor. Existing URLs with fragments or query strings are preserved rather than guessed or redirected.
- Compatibility anchors remain, including `#leksjoner`, `#ukeinnhold`, `#oppgaver`, `#vurderinger` and Week 2–5 `#laboratorium`. Inline assessment answer IDs are namespaced; the original assessment `#solution-*` links still work on their original routes.
- No diff in canonical EGB339 vault data, exercise/assessment solution modules, progress provider, SE(2)/2R engines or original lab components. All **38 exercises, 12 assessments / 51 solution parts, 31 ordered topic keys** remain. Assessment association is explicitly distinguished from submission week.

## 2. Sources and figures

### Textbook and QUT mapping

Book: Peter Corke, *Robotics, Vision and Control*, third edition, Python, 2023.

- Markdown: `/home/skjold/ObsidianVault/EGB339/books/Robotics, Vision and Control - MARKDOWN.md`
- Original PDF: `/home/skjold/ObsidianVault/EGB339/books/Robotics, Vision and Control - ORIGINAL.pdf`

Markdown was used for chapter text and notation; rendered original PDF pages were inspected for geometry, figure labels, matrices and conversion losses. References below use printed book pages unless explicitly marked PDF. No copyrighted textbook figures were copied into public assets.

| Week | Supplied QUT material inspected | Relevant Corke material |
| --- | --- | --- |
| 2 | Linear Algebra and 2D Pose tutorial, pp. 3–17; supplied solutions; Python Refresher practical, pp. 2–9 | 2.2.1–2.2.2, pp. 33–38: planar rotations and homogeneous transformations |
| 3 | 3D Pose tutorial, pp. 2–15 and solutions; NumPy Basics practical, pp. 2–10 | 2.1.3 pose graphs; 2.3.1.1, pp. 45–48; 2.3.2.1, pp. 61–62 |
| 4 | Forward Kinematics (1) tutorial, including chain figure p. 9; Week 4 practical, 7 September 2026, pp. 1–3 | 7.1.1, pp. 257–259, especially ETS2 chain and figure 7.4 |
| 5 | IK tutorial, pp. 2–18, especially targets p. 17; lecture notes and Python example | 7.2.1.1–7.2.1.2, pp. 278–281: analytic branches, numerical error and FK check |
| 6 | Robot Jacobian tutorial, pp. 4–11; supplied solution sheet; board and lecture Python | 8.1.1, pp. 308–310, and 8.3.1: Jacobian columns and singularity |
| 7 | Motion Planning tutorial, pp. 3–13, solutions pp. 1–2; board and lecture Python | 3.3.1–3.3.2, especially pp. 100–101; p. 106 distinguishes path and time profile |
| 8 | Lecture slides 4–16; Working with Images practical, pp. 1–3; existing assessment 1.5–1.7 sources | 11.1.1, 11.2–11.4, 10.2.5, 12.1.3; 14.8.1 pp. 643–645, original PDF pp. 661–663, for homography/perspective correction |

Source limitations are retained: no separate official Week 5 tutorial answer sheet was available; IK was checked by forward substitution. Existing missing-start-file warnings in assessment walkthroughs remain visible instead of being replaced with invented exact results.

### Shipping raster figures

| Asset | Source | Placement and purpose |
| --- | --- | --- |
| `rtb-transforms2d.png` | RTB `docs/source/figs/transforms2d.png`, MIT | Week 2 reference frames: different origins versus different axis directions |
| `rtb-transforms3d.png` | RTB `docs/source/figs/transforms3d.png`, MIT | Week 3 SE(3): three basis directions plus an origin |
| `qut-week7-velocity-profile.png` | QUT Motion Planning tutorial, PDF p. 9 | Week 7: actual piecewise velocity curve; area gives 16.5 m at 8 s and 14.5 m at 6 s |
| `qut-week8-spatula-histogram.png` | QUT Week 8 lecture, PDF p. 10 | Week 8: connect the dark object to its intensity peak and source threshold of 50 |
| `qut-week8-image-subtraction.png` | QUT Week 8 lecture, PDF p. 15 | Week 8: matching input pixels, background subtraction and signed arithmetic |

The existing highway photograph is reused with its QUT practical attribution: Mapillary user vagrant42, CC BY-SA 4.0. Its actual 2048×1536 dimensions and pixel data remain validated. Week 1's existing Panda image is untouched.

Provenance, treatment and licensing boundaries are recorded in `public/egb339/study-figures/provenance.json`; the RTB MIT licence is included. QUT excerpts have **no stated open licence**: attribution does not grant general redistribution rights. Existing authenticated access must remain. `StudyFigure` uses unoptimized image requests so the browser's authenticated request reaches the protected asset directly. No stock images, copied Corke illustrations, source-PDF publication or alteration of the source figures' data.

`scripts/export-egb339-study-figures.py` reproduces the bounded PDF excerpts with PyMuPDF. Rendered PDFs were inspected locally; this is source inspection, not browser QA.

### Robotics Toolbox and tools actually used

The repository's AGENTS.md and referenced ecosystem instructions were followed. Relevant source implementations were read, not copied as Python frontend widgets:

1. `models/ETS/Planar2.py`, `ets/ETS2.py` and `robot/DHRobot.py`: ordered transforms, forward kinematics, world-frame Jacobian and model conventions. The actual Planar2 chain, not its stale docstring, was used.
2. SpatialMath `SO3.Rx/Ry` and `SE3`: 90° rotation-order fixtures and matrix-column interpretation. RTB `ETS2.jacob0` was independently executed for the QUT 5/7 arm and compared with the frontend model.
3. `tools/trajectory.py`: `trapezoidal`, `trapezoidal_func`, `jtraj`. QUT's linear joint interpolation is explicitly not described as the quintic `jtraj` algorithm.
4. Taste Skill, Impeccable and Diagram Design were used for article composition, restrained controls, semantic object identities and geometric SVG design. PDF tools supported source figure/notation inspection. Existing Markdown made a new document-to-Markdown conversion unnecessary.
5. No new runtime dependencies, Blender assets or 3D rendering stack. No external MCP service was needed for this local implementation. Impeccable's installed launcher was used for context and its code-only detector; manual documentation fallback is recorded in the design handoff because the documentation agent hit a usage limit.

## 3. Components and design changes

### Reused

- `SE2Explorer`, `PlanarArmExplorer`, the existing mathematical engines and source-checked lesson calculations.
- `WeekOneMatrixExplorer`, `WeekOneDisclosure`, `Egb339Markdown`, existing problem diagrams and progress components.
- Existing course order/loaders and all authoritative problem/assessment solution data.

### New subject-specific components

- `SpatialRotationExample`: two exact rotation orders; selected matrix column highlights its frame axis; reset and accessible pressed states.
- `JacobianExample`: joint-velocity sliders, individual contributions, vector sum and angular velocity; source pose and singular pose. Matrix values and vectors share one model.
- `MotionComparison`: selected sample, joint/Cartesian comparison modes, consistent geometry and five QUT samples over a 101-point plotted path.
- `ImageArrayExample`: exact 10×10 practical array, coordinate selection, intensity versus mask, strict threshold and reset. No 100-item keyboard tab trap.
- Source-grounded static/stepwise illustrations: RPR chain, unreachable IK optimization, actual velocity-profile integration, histogram/subtraction and homography calculations.

### Removed or simplified patterns

Sidebar accordions and the link-only weekly landing layout are replaced by visible hierarchy and one study document. Generic repeated section headings/callout labels are suppressed in the weekly presentation, not by deleting canonical text. Topic, exercise and assessment headings are nested appropriately. Equations and diagrams provide visual variation; no repeated decorative card template, badge set, glow or gradient was added.

The existing top-level syllabus may still expand/collapse: it is an overview, not the persistent sidebar. The rollout does not redesign every legacy topic/reference route.

Implementation evidence and the manual Impeccable documentation pass: `reports/egb339-study-weeks-design-handoff.md`.

## 4. Checks, fixes and remaining QA

### Problems found and corrected during implementation

| Finding | Correction | Retest evidence |
| --- | --- | --- |
| Generic opening text delayed the useful Week 2 mathematical example | Matrix explorer placed after the lead; repetitive generic labels suppressed in weekly presentation | Source review and successful SSR; final appearance pending |
| Nested lesson/assessment headings were at the wrong document level | Optional embedded headings and Markdown offsets; namespaced assessment answer IDs | TypeScript, validators, one H1/no duplicate IDs in all eight weekly SSR responses |
| Malformed percent encoding in URL fragments could throw | Guarded hash decoding with a raw-fragment fallback | Added static regression assertion; browser deep-link test pending |
| Wrapped jump navigation invalidated a fixed anchor offset | Measure actual jump height; preserve route history state and existing compatibility anchors | HTTP anchor audit passed; scroll position/Back behavior still requires browser QA |
| New optimization formula produced a KaTeX Unicode warning | Replaced the non-math Norwegian symbol label with a math-safe label; numbers unchanged | Math validator rerun without that warning |
| Extreme negative joint velocities could put an arrow into the Jacobian footer | Adjusted diagram origin/velocity scale, retained equal scale and updated the caption | Automated bounds tests for both poses and all velocity extremes pass |
| Weekly disclosure presentation could affect the standalone FK/IK topic styling | New button disclosure limited to the embedded lesson; original standalone disclosure preserved | Final source diff and math/type/build checks |

### Automated verification

All following commands completed successfully on the final implementation.

| Command | Result |
| --- | --- |
| `npx tsc --noEmit --incremental false` | PASS after the final implementation adjustment |
| `npm run validate:egb339` | PASS: 62 entries, 4 track themes, 38 exercises, 12 assessments / 51 parts, 1136 math expressions, routes and anchors |
| `node scripts/validate-egb339-solutions.mjs` | PASS: 133 numeric checks, original task/walkthrough coverage, actual highway pixels and documented QUT corrections |
| `node scripts/validate-egb339-pilot.mjs` | PASS: 31 ordered topics, 7 reference/archive entries, 5776 SE(2) configurations, static TeX/links and existing token-contrast checks |
| `node scripts/validate-egb339-study.mjs` | PASS: 18 independent RTB/DH fixtures; 12,321 FK/IK configurations; 333,185 numeric assertions; singular/unreachable/free-shoulder cases; 69 addressable pages |
| `node scripts/validate-egb339-week-one.mjs` | PASS: 9 sections, compatibility anchors, original keys, all 15 warmup parts, Q15 and 45 pose round trips |
| `node scripts/validate-egb339-study-weeks.mjs` | PASS: 8 section maps, 31 original topic keys, single-source preservation, 1168 numeric assertions, velocity figure bounds, 101 path samples, threshold edge cases and 5 sourced figures |
| `npm run build` | PASS after the final implementation adjustment; all 618 static pages generated, including Week 1–8 |
| `git diff --check` | PASS; final tracked diff has no whitespace errors; a separate check also covers new delivery text files |

Build warnings observed: Next.js's existing `middleware` → `proxy` deprecation, and a broad NFT trace through `next.config.ts` → `src/lib/akseptert-source.ts` → the Akseptert webhooks page. These non-EGB339 files were not changed. No new EGB339 build error was observed.

The Impeccable code-only detector was run once across the changed EGB339 UI/CSS and returned `[]` (no findings). This is a static check, not a visual or accessibility certification.

### Read-only HTTP / structural checks

All eight weekly routes returned HTTP 200 on the local server with an isolated synthetic session. Checks found exactly one H1 per response, no duplicate IDs, no missing same-page anchor targets and no missing cross-week anchor targets. No real account or progress record was used or mutated.

This checks server-rendered structure only. It does **not** execute the browser's JavaScript, scroll behavior, progress API writes or hydration.

The final production-build HTML was also inspected directly, without a browser: **69 EGB339 pages, 9682 local page links and 8 direct image references checked; no missing routes/anchors/images, duplicate IDs or incorrect H1 counts found.** This includes the final standalone-disclosure preservation adjustment. Image-reference counts refer to direct `/egb339/` image URLs, not a network test of every Next.js asset.

The uncompressed development responses for Weeks 2–8 were approximately 1.5–3.7 MB, because the complete source solutions and mathematical markup are included in long-form documents. This is a concrete performance risk to measure in the production-browser QA, not a measured load-time regression. Do not claim performance clearance yet.

### Screenshots and browser status

Before the later no-Playwright instruction, one initial Week 2 light screenshot at 1440×1000 was inspected (`output/playwright/egb339-weeks-qa/week2-initial.png`). It informed the opening-content adjustment. It is not an after screenshot or final approval.

After the instruction, no Playwright or browser screenshot testing was performed. Consequently:

1. **Visual review pending:** all Week 1–8 pages, 1440×1000 and 1280×900, light/dark, figure captions, density, equation overflow and final Taste/Impeccable review.
2. **Navigation/progress pending:** active section, sticky offset, deep-link solution reveal, Previous/Next, browser Back, independently scrolling sidebar and mocked completion success/failure persistence.
3. **Interaction/accessibility pending:** keyboard focus/order, buttons/ranges, SE(2) limits and composition, both FK/IK branches, pointer/keyboard target movement, reachability, singularities, matrix highlighting, reset and QUT presets.
4. **Runtime/network pending:** full browser console warnings/errors, hydration errors, failed requests, protected image loading and production-load performance. SSR 200 responses do not establish a clean browser console/network.

No real user/production progress data was changed. The earlier local browser fixture used an isolated session and in-memory mocked progress. Existing unrelated browser sessions/artifacts were not removed.

## 5. Exact delivery file manifest

Only the files listed below belong to this delivery. No staging, commit or push has been performed. Existing unrelated changes remain outside this set.

Final manifest check: **38 files = 10 modified tracked files + 28 new files**, all present in the working tree, no unlisted EGB339 delivery file, no staged file. Unrelated existing modifications were not included.

### Modified tracked files (10)

```text
scripts/validate-egb339-week-one.mjs
src/app/egb339/layout.tsx
src/app/egb339/uker/[slug]/page.tsx
src/app/egb339/week-one.css
src/components/egb339/Egb339Markdown.tsx
src/components/egb339/Egb339WeekProblems.tsx
src/components/egb339/pilot/Egb339CourseNavigation.tsx
src/components/egb339/pilot/PlanarKinematicsLesson.tsx
src/components/egb339/pilot/SE2Lesson.tsx
src/components/egb339/week-one/WeekOneNavigation.tsx
```

### New implementation files (17)

```text
src/app/egb339/study-weeks.css
src/components/egb339/study-week/ImageArrayExample.tsx
src/components/egb339/study-week/JacobianExample.tsx
src/components/egb339/study-week/KinematicChainFigure.tsx
src/components/egb339/study-week/MotionComparison.tsx
src/components/egb339/study-week/SpatialRotationExample.tsx
src/components/egb339/study-week/StudyFigure.tsx
src/components/egb339/study-week/StudyTopicText.tsx
src/components/egb339/study-week/StudyWeekAssessments.tsx
src/components/egb339/study-week/StudyWeekNavigation.tsx
src/components/egb339/study-week/StudyWeekPage.tsx
src/components/egb339/study-week/UnreachableOptimizationExample.tsx
src/components/egb339/study-week/WeekSourceExamples.tsx
src/lib/egb339-spatial-example.ts
src/lib/egb339-study-weeks.ts
src/lib/egb339-week-learning.ts
src/lib/egb339-week-models.ts
```

### New assets and provenance (7)

```text
public/egb339/study-figures/provenance.json
public/egb339/study-figures/qut-week7-velocity-profile.png
public/egb339/study-figures/qut-week8-image-subtraction.png
public/egb339/study-figures/qut-week8-spatula-histogram.png
public/egb339/study-figures/robotics-toolbox-LICENSE.txt
public/egb339/study-figures/rtb-transforms2d.png
public/egb339/study-figures/rtb-transforms3d.png
```

### New checks and reports (4)

```text
scripts/export-egb339-study-figures.py
scripts/validate-egb339-study-weeks.mjs
reports/egb339-study-weeks-design-handoff.md
reports/egb339-weeks-2-8-rollout.md
```

The existing dirty `.gitignore`, `src/components/home/StudyPlanRoadmap.tsx`, `src/lib/study-plan.ts`, `.playwright-cli/`, unrelated reports and pre-existing `output/` tree do not belong to this delivery. The early local `output/playwright/egb339-weeks-qa/` scratch fixture/screenshot is QA evidence, not shipping code; do not stage the entire output directory.

## Readiness

**ER WEEK 2–8 KLAR FOR COMMIT OG DEPLOY? Nei — implementeringen er ferdig, men den avtalte samlede nettleser-QA-en gjenstår.**

No additional redesign phase is started. The next bounded action is to request/start the consolidated browser QA; it should test the completed implementation and fix concrete regressions before any deploy decision.
