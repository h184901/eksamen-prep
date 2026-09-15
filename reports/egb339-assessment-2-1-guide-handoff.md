# Assessment 2.1 guide integration

Status: complete and locally validated, 2026-09-15. Ready for user review and explicit commit/deploy approval. No commit, push or deployment performed.

## Direction contract

THESIS: Extend the existing Assessment 2.1 document into a source-faithful study guide. One recorded Python event links the robot, code, stack, values and mathematics; this is not a live simulator.

OWN-WORLD: Preserve EGB339's expanded course navigation, readable engineering article, light/dark tokens, restrained borders and labeled technical colors. Remove the supplied standalone hero badges, gradients and card nesting.

STORY: Locate Assessment 2.1, follow SPACE, inspect a line and its calculations, compare IK candidates, then rehearse using the original Word chapters and corrected oral answers.

FIRST VIEWPORT: Existing breadcrumb and assessment title, short recording caveat and Word download, local jump navigation, then playback controls and the robot/code explanation. Desktop pairs robot and code; mobile stacks them without document overflow.

FORM: Precisely specified extension of an established Read surface; no new identity, duplicate guide route, iframe, simulator backend or source-code mutation. Reuse the supplied recorded data and drawing code within a lifecycle-managed component.

FINISH: Source/provenance and numeric checks, desktop/mobile screenshot and interaction tests, bounded Impeccable review and final handoff; preserve incumbent design documents and all pre-existing work. No push/deploy.

## Ownership

The previous Week 2–8 changes and unrelated dirty files were already present. This task must not revert or stage them. Original vault HTML, DOCX, generator and assignment code are read-only.

## Delivered integration

Route: `/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration`.

The existing assessment route now contains the supplied teaching guide, not an iframe or duplicate standalone page. Entry links were added to the EGB339 overview, robot-word-typing practical and keyboard-coordinate-mapping topic. Existing assessment requirements, six solution sections, progress key and adjacent-assessment links remain.

1. Recorded SPACE execution: 2137 events, 15 commands, 17.5 seconds of fixed pauses, three projections, labeled geometry/frames/target, joint readouts, code, stack, variables and calculations. Explicit hold-phase buttons supplement ABOVE/PRESS/lift.
2. Full 457-line source lookup with explanations, search, filtering, code↔execution jumps and stable `#code-line-N` anchors. Comments/blank lines remain explanations, not executed events.
3. Original Word download, 24 extracted chapters plus an explicitly labeled appendix preserving two newer DOCX annotations, 15 tables, 26 equations and six embedded figures. Searchable 43 English oral questions/answers and Norwegian practice material remain.
4. Scoped engineering-article CSS, inherited light/dark semantic tokens, local jump navigation, keyboard controls, horizontally scrollable tables/code/math, readable stacked mobile layout. No new dependency or simulator backend.

The importer is an explicit build-time maintenance tool. Normal build/runtime uses checked-in website assets; it does not access the vault or execute Python. `guide-runtime.js` is generated from the supplied scripts inside a lifecycle-managed DOM island. Timers, animation frames and observers are disposed, fetches aborted, playback paused when the document is hidden. React owns the host and does not rewrite the imperative descendants on cached-route navigation.

## Source and mathematical fidelity

Read-only inputs are the files named in `IMPLEMENT-ON-DEBIAN.txt`: supplied HTML/JS/CSS/data, original DOCX, `wordTypingRobot.py`, `testWordTypingRobot.py` and keyboard image. No Python execution or simulator connection took place. No assignment files or vault files were changed.

Source SHA-256: `a88c4efe7a4f0b124825929c7f821002487132b2010a31785196cb6582e43064`.

The new validator independently evaluates FK for every command; maximum error is `4.263256414560601e-14 mm` (required ≤ `1e-6 mm`). It also verifies joint limits, fixed waits, phase coverage, finite event coordinates, command-only changes of the commanded pose, source hash, Word content counts and original asset hashes.

Downloaded DOCX SHA-256: `792a50e005a94d45a4bed6ccd1513f86970fe846006e659f1e1ffce02767e98f`, identical to the supplied original. `public/egb339/assessment-2-1/provenance.json` records the source/treatment/hash for each of the eight binary assets. Word figure 2 is a JPEG; the other five are PNGs. Images are the supplied originals, not generated decorations.

Preserved corrections distinguish `move_arm`, PRESS-only `getPositionForLetter(letter)`, height in `jumpToPos`, arbitrary supported word length, and FK checks before limits/branch selection. Original Word passages are retained with local corrections in affected chapters, including chapter 12. Fixed pauses do not measure arrival; interpolated display motion is illustrative, not a claimed simulator trajectory. The drawn `[0,0,0]` start is not a `home()` command.

## QA and concrete corrections

1. Empty-fragment initialization: an empty selector could throw after initialization. Empty hashes now return immediately and failed loads reset readiness correctly.
2. Mobile overflow: selector specificity kept derivations in desktop columns at 390 px. Responsive rules now win; expanded Word tables/math do not widen the document.
3. Active navigation: the shared EGB339 hook retained detached nodes after lazy markup replacement. It now measures live sections on scheduled updates. The guide emits a scoped sections-ready event so the initial marker updates before any user scroll. An optional accessible label names this assessment rather than calling it a week page.
4. Native MathML could omit italic ψ on the host. Three unchanged derivation equations now use the existing KaTeX renderer/fonts. The Word chapter-12 correction is visible beside its original text.
5. Cached-route remount could overwrite initialized descendants with SSR markup. React now owns only the host; the runtime owns its children. This also avoids the observed Fast Refresh variant of the same problem.

Functional browser coverage: reset, previous/next, all three step modes, all speed options, play/pause, keyboard slider Home/End, every SPACE key and all 20 key/phase combinations, hold timing, candidate visibility, animation control, all five numeric examples, code search/filter/empty state, Norwegian question search/categories, English search/empty state and all 43 answers, Word search/empty state, six decoded figures, table overflow, code/execution/math/oral jumps and DOCX download.

All 2137 events were rendered sequentially in iso/top/arm-plane views with invalid-geometry and arm-presence assertions. The long CLI call detached before its result was printed; subsequent browser inspection confirmed it reached event 2137 in the final view without invalid geometry or console errors. Geometry/trace data were not changed by the later font/correction/lifecycle fixes.

Progress was tested only with a synthetic local session and an intercepted in-memory `/api/progress`. Complete and undo used the original assessment key; no real DB/progress writes occurred. Original 38 tasks and 12 assessments/51 solution parts remain validator-covered.

## Visual evidence and review

Local QA evidence: `output/playwright/egb339-assessment21/` (not shipping source).

- Initial and final captures at 1440×1000 and 390×844, light/dark: overview, robot/code, mathematics and Word chapters; extra 1280×900 dark robot capture.
- `verified-{1440,390}-{light,dark}-{rotation,word}.png` are the bounded correction recaptures.
- Impeccable context/playbook/craft-floor informed the restrained article integration. The detector returned `[]` for the changed CSS/component/HTML targets. The fresh finish reviewer accepted all 17 original final captures and requested exactly the ψ and chapter-12 fixes. Its subsequent verdict on all eight correction captures was `ship`: both material fixes resolved, no visible regressions.
- DOC skill informed original-file verification. Existing supplied Word extraction avoided unnecessary conversion. No document conversion, image generation, Blender, Robotics Toolbox or external MCP was needed for this source-specific integration.

## Checks

Passed again after all final corrections, including the initial-marker notification:

- `npx tsc --noEmit --incremental false`
- `npm run validate:egb339`
- `node scripts/validate-egb339-solutions.mjs`
- `node scripts/validate-egb339-pilot.mjs`
- `node scripts/validate-egb339-study.mjs`
- `node scripts/validate-egb339-week-one.mjs`
- `node scripts/validate-egb339-study-weeks.mjs`
- `node scripts/validate-egb339-assessment-guide.mjs`
- `npm run build` (618 static pages generated)
- `node --check src/components/egb339/assessment-guide/guide-runtime.js`
- `git diff --check`

The study validator now accepts verified existing public-file links as well as page routes, consistently with its adjacent literal-link check. The new guide validator also covers the chapter-12 notice, KaTeX derivations and runtime-owned DOM boundary.

Local production-build browser checks passed: navigate away during playback and return (457 source rows and working controls restored; no playback leak), five entry routes and 20 unique guide links return HTTP 200, original assessment-solution and Word-chapter deep links open their content, and a deliberately injected data HTTP 503 produces a readable error with successful Retry recovery. No normal console warnings/errors or hydration errors were found. Navigation canceled two Next RSC prefetch requests with `net::ERR_ABORTED`; these were cancellations, not server/asset failures. The intentionally injected 503 appears in the separate error-test log. Development Strict Mode also canceled a data fetch during lifecycle testing as expected.

Final production retest after the ready-notification fix: at 1440×1000 and 390×844, the initial section is `Følg SPACE`, all 457 code rows exist, keyboard Enter advances the timeline, and document width equals viewport width. No console errors/warnings occurred. The test session expired during the user pause and was renewed using only the synthetic local secret; this was not an application authentication regression.

`npm run lint` is not functional in the existing project: it invokes removed `next lint` under Next 16, which treats `lint` as a nonexistent project directory. No unrelated tooling change was made. Build warnings remain the existing middleware→proxy deprecation and broad NFT tracing from `src/lib/akseptert-source.ts`/`next.config.ts`, outside EGB339.

## Remaining boundaries

- This verifies a recorded test-robot trace, not simulator motion, collision avoidance, hardware or a real oral examination.
- Original DOCX was preserved and its download verified, not rewritten or visually re-rendered in Word/LibreOffice.
- Shared site navigation contains two independent theme-button instances; resizing across desktop/mobile after changing theme can leave the other button stale until reload. Both EGB339 themes render correctly after normal initialization. The global component is deliberately untouched.
- No Vercel/deployed-production test, deployment, commit, push or staging was performed. Production-build tests were local only.
- Temporary local test servers and the task's isolated browser session were stopped after verification; no background service was installed.

## Exact delivery files

Existing files changed for this integration:

```text
scripts/validate-egb339-study.mjs
src/app/egb339/page.tsx
src/app/egb339/ressurser/[slug]/page.tsx
src/app/egb339/temaer/[slug]/page.tsx
src/app/egb339/vurderinger/[slug]/page.tsx
src/components/egb339/study-week/StudyWeekNavigation.tsx
```

The final file already belonged to the uncommitted Week 2–8 rollout. Only live section lookup, the ready-notification listener and the optional jump-nav label were changed here; its earlier work is preserved.

New integration files:

```text
reports/egb339-assessment-2-1-guide-handoff.md
scripts/import-egb339-assessment-guide.mjs
scripts/validate-egb339-assessment-guide.mjs
src/app/egb339/assessment-guide.css
src/components/egb339/assessment-guide/Assessment21Guide.tsx
src/components/egb339/assessment-guide/AssessmentGuideClient.tsx
src/components/egb339/assessment-guide/guide-runtime.js
src/components/egb339/assessment-guide/guide-runtime.d.ts
src/content/egb339/assessment-2-1/guide.html
public/egb339/assessment-2-1/guide-data.json
public/egb339/assessment-2-1/provenance.json
public/egb339/assessment-2-1/oral-presentation-guide.docx
public/egb339/assessment-2-1/keyboard_marked.jpeg
public/egb339/assessment-2-1/word-figure-1.png
public/egb339/assessment-2-1/word-figure-2.jpg
public/egb339/assessment-2-1/word-figure-3.png
public/egb339/assessment-2-1/word-figure-4.png
public/egb339/assessment-2-1/word-figure-5.png
public/egb339/assessment-2-1/word-figure-6.png
```

The remaining dirty files belong to previous EGB339 work or unrelated tasks and are not part of this integration. Browser scratch files/downloads/screenshots are local evidence only. Do not use `git add .`.

## Design documentation check

Documentation fallback: the separate Impeccable documenter hit its usage limit. The main agent completed the bounded check using the installed `degraded/documenter.md` and full `document.md`. No root design artifacts were created or changed for this ordinary extension.

Evidence checked: `pilot.css`, `week-one.css`, `assessment-guide.css`, the assessment server/client components, generated runtime, original asset provenance and desktop/mobile light/dark correction captures.

1. Palette: existing paper/ink/muted/border tokens are inherited; blue identifies commands/information, purple dashed geometry identifies candidates, amber identifies targets/caveats, with textual labels and stroke differences.
2. Typography: inherited course heading family; guide body 16px/1.7, section titles 27px, subheadings 20px, source/code values in monospace. Existing KaTeX fonts render mathematical notation.
3. Layout: article foundation with 75ch prose measure; 28px paired-panel gap, stacked at the scoped breakpoint. Sidebar/jump-nav/progress remain the established course components.
4. Controls: real buttons/selects/ranges/details, 4px control radii, 44px principal action targets, semantic hover/pressed/focus states; no new card/glow/gradient system.
5. Assets/identity: all eight shipping binaries have source/hash/treatment records; original diagrams and recording provide the visual interest. No brand or site-wide token change.

Not canonized or repaired: pre-existing global theme-button desynchronization on viewport-class changes and global decorative tutor/header elements. They are outside this integration's scope, not design rules to propagate.
