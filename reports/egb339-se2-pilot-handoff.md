# EGB339: fase 0–1, historikk

Oppdatert 10. september 2026. **Den tidligere EPERM-blokkeringen er løst i den nye kjøreøkten.** Lokal Next-server og Playwright/Chrome starter og fungerer. Det skal ikke brukes mer tid på den gamle diagnosen.

Brukeren endret deretter arbeidsflyten: implementer fase 1–3 uten omfattende visuell QA mellom fasene, rapporter, og ta en separat samlet QA-runde etterpå.

Gjeldende status, endringer, kilder og kontroller finnes i [samlet fase 1–3-rapport](egb339-phases-1-3-handoff.md).

## Hva piloten etablerte

- Kronologisk kursstruktur for 31 leksjoner i uke 1–8; fem referansetemaer og to tidligere fagkart beholdt separat. Alle 38 temaer er representert.
- Vedvarende desktop-sidebar med aktiv side og progresjon.
- Komplett SE(2)-leksjon med teori, homogen matrise, punkt/retningsvektor, invers, komposisjon, QUT-regneeksempel og prøv-selv.
- Assessment 1.1 med eksisterende krav og fem uendrede løsningsdeler; direkte Q4/Q5-lenker åpner riktig del.
- Fullføringskontroll etter lesingen og kuratert Forrige/Neste.
- EGB339-avgrenset papir/blekk-design uten hero-kort, gradienter eller tutor-puls.

## Kilder

QUT Week 2, *Tutorial – Linear Algebra and 2D Pose*, PDF-side 17, tilfelle 1: p_B=(2,3), θ=π/4, t=(1,2) gir p_A≈(0.2929,5.5355). Eksisterende oppgave `w2-pose` er kontrollert mot QUT-fasit.

Corke, *Robotics, Vision and Control*, tredje utgave, Python (2023), kapittel 2.2, trykt s. 37 / PDF-side 61.

## Tidlig visuell kontroll

Tidligere skjermbilder finnes i `output/playwright/egb339-pilot/`, ved 1440×1000 og 1280×900, begge temaer. De viste konkrete feil som ble rettet: punkt utenfor figuren ved ytterverdier, manglende pilspiss på en akse, etikettkollisjon, aktiv/fullført-status, sidebarhøyde og fargeovergang mellom temaene.

Bildene er **ikke sluttbilder av fase 1–3**. Den nye kjøreøkten kunne gjenta pilotkjøringen, men fullstendig resultatlogg ble ikke bevart før arbeidsflyten ble endret. Ingen full visuell godkjenning påstås.

## QA-skriptene

`setup.js` bruker en lokalt signert testsesjon og en isolert progresjonsfixture i minnet. Ingen bruker-/produksjonsprogresjon er endret. Den beviser ikke lagring i databasen.

`audit.js` og `state-audit.js` er historiske pilotskript. Spesielt forventningen om at øvrige ruter **ikke** har studieshell er nå utdatert. Oppdater dem før samlet QA; ikke tolk den forventningen som en applikasjonsregresjon.

`phase3-sanity.js` er den nye, avgrensede implementeringskontrollen uten screenshots eller progresjonsskriving. Resultat og begrensninger er dokumentert i den samlede rapporten.

Ingen commit eller push er gjort.
