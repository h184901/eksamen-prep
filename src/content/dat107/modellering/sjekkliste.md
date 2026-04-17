# Kortversjon Og Sjekkliste

## Hurtigsjekk for ER-modell

- Er alle entiteter selvstendige ting, ikke bare attributter?
- Har hver entitet en tydelig identifikator?
- Er kardinaliteten (1:1, 1:N, M:N) begrunnet i teksten?
- Finnes svake entiteter som må pekes ut?
- Har relasjonen egne attributter som må modelleres?

## Hurtigsjekk for mapping til tabeller

- Har hver tabell en tydelig primærnøkkel?
- Er 1:N mappet med fremmednøkkel på N-siden?
- Er M:N løst som egen koblingstabell?
- Finnes historiske data som krever egen tabell (f.eks. medlemsavgift per år)?

## Hurtigsjekk for 3NF

- 1NF: én verdi per celle, ingen repeterende grupper?
- 2NF: ingen delvis avhengighet av bare del av sammensatt nøkkel?
- 3NF: ingen transitiv avhengighet mellom ikke-nøkkelattributter?
- Har du transitive avhengigheter som `postnr -> poststed`?

## Ord du må kunne forklare

- entitet
- relasjon (ER-forstand)
- kardinalitet
- svak entitet
- primærnøkkel
- kandidatnøkkel
- fremmednøkkel
- funksjonell avhengighet
- 1NF, 2NF, 3NF
- transitiv avhengighet

## Vanlige eksamensfeller

- påstå 3NF uten å vise funksjonelle avhengigheter
- modellere historiske data som vanlige felter
- glemme egen tabell for M:N
- blande ER-modell og tabellstruktur i samme figur uten å være tydelig
