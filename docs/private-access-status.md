# Privat innlogging — produksjonsstatus, 8. oktober 2026

Produksjon på **https://eksamen-prep.vercel.app** har nå native innlogging med personlig permanent sekssifret kode og separat sterk admininnlogging. Assessment 2.3/2.4 og den tilhørende planen er tilgjengelige etter innlogging. Gjester trenger ikke Vercel-konto.

**GitHub-repoet er fortsatt offentlig ved siste API-kontroll.** Eier har varslet at det settes privat; CLI-kontoen har push, men ikke adminrettighet. Innloggingsendringene er ikke pushet. Ikke push disse før API-et bekrefter `private: true`.

## Publisering og bygg

- Kursinnholdet ble tidligere pushet som `2e5f32d`. Det opprinnelige Vercel-bygget feilet fordi prosjektets `engines.node` var låst til den avviklede Node 20-versjonen.
- Prosjektet er oppdatert til Node 24 og Next.js 16.3.8. Ingen lokal Next-server eller lokalt Next-bygg er kjørt.
- Innloggingen ble bygget og testet i en isolert kopi uten `.env`, `.private-access/`, `.opencode/` eller lokale kursråfiler, og deretter deployet med Vercel CLI.
- Endelig beskyttet preview: `dpl_HiTm2MVWpY4dnj5iWH8xamLdGzAH`, status **READY**.
- Produksjon: `dpl_3N7mUGqkfWvQGQsDLaaEn4jCP5Wv`, status **READY**, med aliaset `eksamen-prep.vercel.app`.
- Sensitive autentiseringsvariabler er konfigurert for production og preview. Standard Deployment Protection er aktiv med `all_except_custom_domains`; en tidligere generert deploy-URL ble kontrollert og krevde Vercel-innlogging. Det ordinære domenet bruker appens egen kodeinnlogging.
- Den midlertidige automation-bypass-hemmeligheten er tilbakekalt; prosjektets bypass-liste er tom.

## Verifisert

- `npx tsc --noEmit --incremental false` og `git diff --check`: **PASS**.
- Separat sikkerhetsgjennomgang av kildekoden: ingen gjenstående Important/Critical-funn i gjennomgangen. Dette er ikke en garanti mot alle sårbarheter.
- **11/11 remote tilgangstester PASS** på den beskyttede previewen: native kode-/admininnlogging, ugyldige og gamle cookies, CSRF, roller, personlige koder, kodebytte/sperring, bevaring av fremgang, faktisk JS-bundle, RSC, bilder og vedvarende rategrenser.
- **8/8 autentiserte mobilkontroller PASS**: Assessment 2.3, 2.4, selvkodingsplan og uke 11, hver på norsk og engelsk. Ingen KaTeX-feil, sidefeil eller horisontal overflow i disse kontrollene.
- På det faktiske produksjonsdomenet: native admininnlogging, tilgangsadministrasjon, begge assessments, innlogget JS-bundle og utlogging **PASS**. Uinnloggede forespørsler til kurs, API, bilde, RSC og samme JS-bundle ble avvist.
- Remote bygget på Vercel passerte. Hele den eksisterende kurs-E2E-suiten er ikke kjørt i denne runden; mobilkontrollene ovenfor er avgrensede.
- `npm audit --omit=dev`: ingen high/critical-funn, men **4 low og 2 moderate** gjenstår. Full audit inkludert utviklingsavhengigheter har fortsatt high-funn; ikke presenter prosjektet som fritt for avhengighetssårbarheter.

## Tilgang og bevarte data

- Admin bruker `/admin/login`, og `/admin` utsteder, erstatter og sperrer medlemskoder. Koder utløper ikke automatisk; nettleserøkter varer opptil 30 dager og opphører ved sperring eller kodebytte.
- Brukere og fremgang er beholdt. Tilgangstabellene er additive. Historiske kodehashes reserveres permanent, slik at en pensjonert kode ikke blir utstedt på nytt.
- Bootstraphemmeligheter ligger bare i Git-ignorert `.private-access/` med begrensede filrettigheter. Ikke skriv verdier til chat, logger eller Git. Adminopplysningene finnes lokalt i `.private-access/admin-credentials.txt`.
- Tester opprettet bare egne midlertidige medlemsprofiler. Disse er sperret etter testene; testprofilene og deres fremgang er beholdt for sporbarhet. Ingen ekte medlemskoder er utdelt.
- `.opencode/` og `stash@{0}` er bevart. Ingen reset eller stash-pop er utført.

## Gjenstår

1. Bekreft at GitHub-eier har satt `h184901/eksamen-prep` privat.
2. Commit/push kun de gjennomgåtte innloggings-, bygg-, dokumentasjons- og testfilene; ingen hemmeligheter eller ignorerte lokale oppsett.
3. Kontroller Git-utløst Vercel-deploy etter push. Den direkte CLI-deployen er allerede aktiv og verifisert.
4. Admin kan deretter utstede én egen kode per person. Seks sifre med ratebegrensning passer en betrodd studiegruppe, ikke høy-sikkerhets SSO/MFA. Tidligere offentlig tilgjengelige kopier av kursinnhold kan ikke trekkes tilbake ved å endre repoets synlighet.
