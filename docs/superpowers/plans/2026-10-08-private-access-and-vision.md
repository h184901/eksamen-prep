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
- [ ] Confirm GitHub Private using account with owner/admin permission, then commit/push reviewed changes and verify Git-triggered deployment.

Current deployment status: Vercel production dpl_3N7mUGqkfWvQGQsDLaaEn4jCP5Wv is READY and serving the verified native code/admin login on eksamen-prep.vercel.app. Final preview QA passed 11/11 access tests plus 8/8 mobile content checks. Native form Referrer-Policy was corrected to same-origin after a real browser reproduced Origin:null; CSRF checks remain enforced. Production runtime checks also pass. GitHub CLI has push but no admin permission; visibility is still public pending the owner's change, so authentication has not been pushed. See docs/private-access-status.md for evidence, limits and remaining work.
