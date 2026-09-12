# EGB339 Week 1 pilot — QA and handoff

Scope: /egb339/uker/uke-1. Local production build, Chrome/Playwright, 2026-09-12. No commit, push, deployment, or Week 2–8 rollout.

## Implemented

1. One long study page with nine stable sections: Introduction, Robotics, Coordinate frames, Vectors and matrices, Python, Public/private tests, Practical preparation, Exercises, Assessment.
2. Expanded, independently scrollable syllabus; week grouping, active section, original completion status; compact sticky local navigation and native anchors. Only Week 1 uses the new sidebar.
3. Actual Robotics Toolbox Panda/Swift image, original feedback-system and 2R-chain diagrams, frame explorer, Q15 row/column matrix explorer, and a small Python boundary check.
4. Inline theory and worked calculations. Both existing Week 1 topic bodies and all 15 warmup walkthroughs are reused, not duplicated. Buttons reveal solutions and reset/load examples.
5. Scoped semantic colors, labeled A/B identities, restrained borders/radii, existing typography and light/dark themes. The existing tutor action has a reserved desktop sidebar slot.

The pilot replaces the link-only week index and collapsed week groups with a readable study sequence. No new card grid, nested-card layout, gradient, glow, decorative badge system, or animation layer.

## Source checks and preservation

- QUT Week 1 lecture: pages 11, 13, 14 and 53; tutorials/practicals start in Week 2. The pilot does not invent an official Week 1 practical.
- Corke, Robotics, Vision and Control, third Python edition (2023): chapter 1 and sections 2.1.1–2.1.2. Markdown searched; original PDF figures 2.4–2.6 inspected.
- QUT warmup, PDF pages 1–6: preserves corrected Q15 product [19,22;43,50], missing assignment1_0.py caveat for Q1/Q4/Q10, and ambiguous Q3 lower boundary.
- Robotics Toolbox repository/ecosystem AGENTS followed. References: models/ETS/Planar2.py, examples/teach.py, docs/source/intro.rst, docs/figs/swift.png. SpatialMath SE(2) and NumPy independently checked the numeric examples.
- Image pixels are the existing RTB documentation model render, with MIT licence and provenance. It is not presented as a photo or QUT's Dobot. QUT/book figures without a verified republication licence were not copied into public assets.

Existing SE(2)/2R lab mathematics, 38 weekly problems, 51 assessment solution parts, assessment associations and old topic routes are untouched. Topic, week and warmup completion retain their original separate keys.

## Browser coverage

| Coverage | Method |
|---|---|
| 1440×1000 and 1280×900, light and dark | Production HTML; wait for fonts/image and active state; top/full page/frames/matrices captures |
| Nine sections and sidebar | Native anchors, active state, incremental scroll across section gaps, keyboard, history |
| Compatibility/example anchors | leksjoner, ukeinnhold, oppgaver, vurderinger, frame-example, matrix-example, position-and-orientation |
| All 15 warmup solutions | Open/close by click and keyboard, Q15 direct load and same-hash reopen, math/overflow checks |
| Frame explorer | Keyboard sliders, extrema/corners, A/B readout, fixed/moving point, inverse, reset, figure-label bounds |
| Matrix/check components | Four cells and row/column highlights, products, step wrap, alternate example, QUT reset, @ versus *, correct/incorrect feedback |
| Progress | Both topic keys, warmup and week: save/reload/undo; failed write/read, retry without unintended write |
| Navigation destinations | 58 unique same-origin targets fetched in browser: HTTP 200, no redirects or missing referenced anchors |
| Week 2 regression sanity | Next opens existing Week 2; Back restores pilot. Other linked pages received route checks, not a new full visual audit |

Progress uses a synthetic local session and intercepted in-memory /api/progress fixture. Other API writes are blocked. No production account, database writes, login-created user, or real completion state is used. Fixture ends empty.

## Concrete defects found and fixed

1. **Robot image returned 400.** Next optimization fetched the protected asset without a session cookie, received login HTML and rejected it. Only this 95 KB source image uses unoptimized, allowing the authenticated browser to request it. Middleware/login behavior is unchanged.
2. **Closed solution did not reopen from the same hash.** A second click emits no hashchange. The direct link now also opens the disclosure.
3. **Current section lagged during slow scrolling.** Whole-section intersection events skipped the reading line across section gaps. A passive, animation-frame-bounded update reads nine section boundaries.
4. **Back showed the wrong lesson body.** Native fragment entries had null history state, which the installed Next router ignores on Back after client navigation. The pilot preserves opaque route state without accessing private fields and restores the fragment section after remount.
5. **Tutor covered the y control at 1280×900.** The existing tutor component now occupies a reserved pilot sidebar slot on desktop. No global tutor behavior or other lesson layout was redesigned.
6. **Color-only inline links.** Figure/source and practical-preparation links now retain underlines. Dedicated accessibility audit: no findings.

## Screenshots and design review

Evidence directory: output/playwright/egb339-week-one-qa/.

- Initial: four size/theme combinations, top/full page/frames/matrices; supplemental system, worked example and solution captures.
- Final: final-{1440,1280}-{light,dark}-{top,full,coordinate-frames,foundations}.png.
- Supplemental final 1440 light: system, chain, frame-model, worked, practical, assessment.
- Taste Skill guided article measure, composition, density, spacing and removal of decorative UI. Diagram Design guided geometric labels, line styles and feedback/chain structure.
- Impeccable context/craft workflow used; detector ran once with no findings. Raster provenance scan: one raster, none missing.

A fresh independent Impeccable reviewer checked all 16 primary and six supplemental captures. Initial disposition: fix, limited to history restoration, tutor overlap and practical-link identity. No broader visual redesign was requested.

Final independent verdict: ship for the three scored fixes; all resolved, with no regressions observed from that correction batch. This was a fix-verdict pass, not a new claim of whole-site approval. The two EGB339-scoped design records were completed by a separate fresh documenter.

Harness has generic agents but no selectable shipped Impeccable agent type. Fresh reviewer/documenter agents used equivalent role instructions. Design records remain EGB339-scoped, not root-wide. Configured MCPs were inventoried; local sources, PDF tools and Playwright CLI supplied the evidence, without an external MCP call or new dependency.

## Automated checks

Passed following the implementation and QA correction batch:

1. npx tsc --noEmit --incremental false
2. npm run validate:egb339
3. node scripts/validate-egb339-solutions.mjs; node scripts/validate-egb339-pilot.mjs
4. node scripts/validate-egb339-study.mjs; node scripts/validate-egb339-week-one.mjs
5. npm run build; git diff --check

Validator evidence: 62 entries, four track themes, 38 problems, 12 assessments/51 parts, 1,136 math expressions; 133 calculation checks; 5,776 SE(2) states; 12,321 FK/IK configurations and 333,185 numerical assertions. New validator checks nine sections, seven compatibility/example anchors, two original topic keys, 15 reused walkthroughs, Q15, 45 pose round trips and provenance.

Build generates 618 pages. Existing warnings outside scope: deprecated Next middleware convention; broad tracing through next.config.ts → akseptert-source.ts → /akseptert/magi/webhooks. No package/dependency or global build-config changes.

## Runtime and limitations

- Clean pilot captures/interactions: no console errors/warnings, runtime/hydration errors or HTTP errors.
- Failed-request events are cancelled Next homepage RSC prefetches (net::ERR_ABORTED) when navigation supersedes them, not failed page/assets. They remain in raw logs.
- Two deliberate HTTP 500 responses test progress failures, recorded separately from the clean audit.
- Final automated browser runs: 136/136 checks at 1440×1000 light and 136/136 at 1280×900 dark; 34/34 additional checks including tutor open/close and isolated error recovery. All four size/theme capture runs passed. Four anchor → Week 2 → Back → Forward cases restored matching lesson, section and solution state.
- Same-document browser-history tests explicitly wait for the destination hash: Playwright's navigation promise can return before the client transition settles. Transient URL sampling was corrected in the test, not hidden as a passing assertion.
- Four viewports: no document overflow, duplicate IDs, KaTeX errors or broken pilot images. Lighthouse after image repair: performance 99, best practices 100. Dedicated accessibility after link repair: 100, no findings. These are local measurements, not deployment guarantees.
- Shared JS/CSS size, KaTeX DOM size and original-image optimization opportunities remain. No broad performance rewrite or mobile audit was undertaken.

## Files and handoff boundary

Modified integration points:

- src/app/egb339/layout.tsx
- src/app/egb339/uker/[slug]/page.tsx
- src/components/egb339/pilot/Egb339CourseNavigation.tsx

Added pilot files:

- src/components/egb339/week-one/: WeekOnePage.tsx, WeekOneNavigation.tsx, WeekOneExplorers.tsx, WeekOneDiagrams.tsx, WeekOneDisclosure.tsx
- src/app/egb339/week-one.css; src/lib/egb339-week-one.ts
- public/egb339/week-1/: Panda image, provenance JSON, MIT licence
- scripts/validate-egb339-week-one.mjs
- EGB339 Week 1 design/QA reports; local browser scripts, logs and screenshots under the evidence directory

Pre-existing unrelated .gitignore, home roadmap, study-plan.ts, other subject reports and other output files remain untouched. Nothing staged or committed.

## Final disposition

Week 1 is implemented and ready for the user's pilot review. No known blocking pilot regression remains in the tested desktop flows. Source limitations and the two pre-existing build warnings above remain explicit.

This is local production-build validation, not verification of a deployed release. No commit or push. Week 2–8 rollout still requires the user's review of Week 1. The isolated browser/test server are closed after QA; no test completion remains.
