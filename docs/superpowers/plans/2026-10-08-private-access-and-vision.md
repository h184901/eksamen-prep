# Private access and vision assessments — approved implementation

Goal: publish EGB339 2.3/2.4 and self-coding plan; permanent personal six-digit codes, separate admin login, private GitHub and protected course content.

Architecture: additive Postgres access/session/rate tables preserve existing user IDs and progress. Native login HTML needs no course JS. Middleware gates content/assets; endpoints enforce server authorization. Explicit query allowlist exports only the reviewed study plan. Bilingual teaching layer follows the existing EGB339 design.

Constraints: no local Next build/server, TypeScript only. Preserve .opencode and stash. No secrets in Git/logs; Vercel builds on push. Production uses code login; Standard Protection gates previews/old generated URLs.

- [x] Write remote regression tests; inspect existing public login (public username list and no code field reproduced).
- [x] Add idempotent schema and bootstrap; preserve progress, generate secrets in ignored private files.
- [x] Implement code/session/admin/rate/CSRF controls and protect JS/image/RSC/API.
- [x] Export reviewed Obsidian 2.3/2.4 and allowlisted plan; bilingual content, diagram, curriculum links.
- [x] Review changes and typecheck; patch Node24/Next16.3.8, reserve retired codes, handle logout DB failures.
- [x] Configure sensitive Vercel secrets for production/preview and Standard Deployment Protection; revoke temporary automation bypass after QA.
- [x] Remote preview build and 11 security regression tests; eight bilingual mobile content checks.
- [x] Production CLI deployment READY; verify canonical native login, admin, assessments, bundle protection and logout.
- [x] Push reviewed changes and verify Git-triggered deployment; the user explicitly approved pushing before GitHub visibility is changed.
- [ ] Owner makes GitHub private later (deferred by user; not a deployment blocker).

Verified deployment status: authentication commit ccae4ba and documentation commit 02f95e3 were pushed to main. Git-triggered production dpl_FWTMqJwbbJh82KtSoMcrPZG8w4cE is READY with the correct Git SHA and canonical alias; GitHub reports success. The production runtime checks were rerun and passed, including native admin login, assessments 2.3/2.4, JS authorization and logout. A separate anonymous browser was redirected to the code-only login. Earlier final preview QA passed 11/11 access tests plus 8/8 mobile content checks. Native form Referrer-Policy was corrected to same-origin after a real browser reproduced Origin:null; CSRF checks remain enforced. On 8 October the user explicitly authorized finishing and pushing while the repository remains public, superseding the previous privacy prerequisite. Only the owner's deferred visibility change remains outside the completed implementation/deployment work. See docs/private-access-status.md for evidence and verification limits.
