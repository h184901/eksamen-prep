# Privat tilgang

`/login` bruker bare personens sekssifrede kode. `/admin/login` bruker separat admin-brukernavn og sterkt passord. `/admin` utsteder koder og sperrer tilganger. Eksisterende brukernavn beholder sin fremgang. Koder utløper ikke; økter varer 30 dager. Sperring eller ny kode invaliderer gamle økter umiddelbart.

## Klargjøring før deploy

1. Kjør `node scripts/provision-private-access.mjs` med lokal Postgres-konfigurasjon. Tabeller legges til uten å slette brukere/fremgang. Scriptet oppretter admin for `erlend` og genererer et sterkt passord i Git-ignorert `.private-access/admin-credentials.txt` (chmod 600). Gjentatt kjøring bytter ikke passord.
2. Legg `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` og `ACCESS_CODE_PEPPER` fra `.private-access/vercel-env.json` inn som Sensitive Vercel-variabler i production/preview. Aldri rått admin-passord i Vercel, Git eller chat.
3. Vercel Deployment Protection: **Standard Protection** beskytter previews og genererte deploy-URL-er; produksjonsdomenet bruker kodeinnlogging. Dette beskytter også gamle deployer med åpen innlogging.
4. Repoets **eier/admin** setter GitHub-repoet til **Private**. Innlogging beskytter ikke et offentlig GitHub-repo.
5. Deploy og remote QA. Ingen lokal Next-server/build på Mac-en.

## Sikkerhet og drift

- Tilfeldige koder med HMAC-hash; alle utstedte digests beholdes i `issued_access_codes`, slik at en gammel kode aldri gjenbrukes. Admin-passord med saltet scrypt. Ingen hemmeligheter logges.
- Opaque 256-bit token; SHA-256 lagres i DB. HTTP-only, secure, same-site cookie. Gamle username-only cookies avvises.
- Vedvarende rategrenser per IP, credential og globalt i 15-minutters vinduer. Manglende DB/hemmelighet stenger tilgang.
- Grensene teller også vellykkede innlogginger: fem per IP per 15 minutter. Flere personer bak samme skole-/hjemmenett kan måtte vente. Ikke fjern grensen uten ny vurdering av risikoen ved bare seks sifre.
- Native login-HTML uten JS. Kurs-HTML, API, RSC, bilder og JS krever aktiv DB-økt. CSS/fonter er unntatt; legg aldri kursinnhold i disse.
- Admin/progress/tutor sjekker økt på serveren. Skjulte knapper er ikke tilgangskontroll.
- Seks sifre er ikke MFA/høy-sikkerhets SSO. Bruk bare for den betrodde studiegruppen. Innloggede personer kan kopiere materialet.
- Rydd utløpte `auth_sessions`/`auth_rate_buckets` ved behov. Ikke slett brukere/fremgang for å sperre tilgang.
- Passordrotasjon: ny scrypt-hash og økning av adminens `generation` for å logge ut eksisterende økter.
- Utlogging fjerner alltid nettleserens cookie. DB-feil gir eksplisitt varsel om at serverens tilbakekalling ikke ble bekreftet.

Remote regresjonstester: `tests/e2e/private-access.spec.ts`. Ekte DB-økter kreves; den gamle syntetiske HMAC-QA-cookien er ikke gyldig. Ingen produksjonsbypass for tester.

Testene som utsteder/sperrer en disponibel QA-bruker eller fyller ratebegrensninger krever `PRIVATE_ACCESS_QA_ALLOW_WRITES=staging`. Oppgi en egen staging-admins token i `PRIVATE_ACCESS_QA_ADMIN_TOKEN`; positiv passordtest bruker `PRIVATE_ACCESS_QA_ADMIN_USERNAME` og `PRIVATE_ACCESS_QA_ADMIN_PASSWORD`. Ingen av disse verdiene skal lagres i Git. Testbrukeren blir sperret etter testen, men beholdes i DB med sin QA-fremgang. Ratevinduet må være ledig før positive innloggingstester. Testspor er slått av for å unngå å lagre credentials.

Før produksjonsgodkjenning: kjør full remote QA, inkludert ekte kursbundle, RSC/prefetch, innlogget oppvarming av bilder etterfulgt av anonyme/sperrede kall, admin-/medlemsroller, kodebytte/sperring og bevart fremgang. Kontroller tidligere deploy-URL-er separat. TypeScript er ikke runtime- eller sikkerhetstesting.
