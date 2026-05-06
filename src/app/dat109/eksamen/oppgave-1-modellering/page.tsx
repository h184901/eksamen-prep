"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { eksamenPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Solution } from "@/components/dat109/EksamenComponents";

export default function Oppgave1ModelleringPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.eksamen} pages={eksamenPages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <Link
          href="/dat109/eksamen"
          className="hover:text-[var(--accent)]"
        >
          Eksamen
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">
          Oppgave 1 — Modellering
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Oppgave 1 — Modellering
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Eksamensoppgaver om brukstilfellemodell, domenemodell og
          sekvensdiagram. Alltid basert på et spill. ~40 % av eksamen.
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
            Hva sensor ser etter i oppgave 1
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-[var(--muted)]">
            <div>
              <strong className="text-blue-700 dark:text-blue-400">
                a) Brukstilfellemodell
              </strong>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                <li>Riktige aktører identifisert</li>
                <li>Brukstilfeller som funksjoner, IKKE flyt</li>
                <li>Tekstlig beskrivelse av hovedflyt</li>
                <li>Include/extend brukt riktig</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-700 dark:text-blue-400">
                b) Domenemodell
              </strong>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                <li>Fornuftige konseptuelle klasser</li>
                <li>Attributter som passer problemet</li>
                <li>Assosiasjoner med multiplisitet</li>
                <li>INGEN metoder</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-700 dark:text-blue-400">
                c) Sekvensdiagram
              </strong>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                <li>Samsvarer med brukstilfellebeskrivelse</li>
                <li>Logisk korrekt meldingsflyt</li>
                <li>Kun aktive objekter sender meldinger</li>
                <li>Loop/alt/opt brukt riktig</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2024 */}
        <Section title="Eksamen vår 2024 — Skyjo" badge="Nyeste" badgeColor="red">
          <p className="text-sm text-[var(--muted)]">
            Kortspill for 2–8 spillere. Spilles over flere omganger. Målet er å
            få minst mulig poeng. Spillet avsluttes når en spiller har 100 poeng
            eller mer.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
            <p>
              <strong>Innhold:</strong> 150 kort med poeng (-2 til 12).
              En blokk for å notere poeng per omgang.
            </p>
            <p>
              <strong>Før start:</strong> Hver spiller mottar 12 kort med
              poengsiden ned i 3x4 rutenett. Snur to kort valgfritt.
              Resterende kort i bunke + kastehaugen (øverste kort snudd).
            </p>
            <p>
              <strong>Tur:</strong> Trekk kort fra kastehaugen (åpent) eller
              bunken (skjult). Åpent kort MÅ byttes med ett av dine. Skjult
              kort KAN byttes — ellers legg tilbake og åpne et skjult kort.
              Byttet kort legges åpent på kastehaugen.
            </p>
            <p>
              <strong>Omgang slutter:</strong> Når en spiller har åpnet alle
              kort. Alle andre får én tur til. Spilleren som avsluttet MÅ ha
              lavest poeng — ellers dobles hans poeng. Spillet slutter ved
              100+ poeng.
            </p>
          </div>
          <Solution label="Vis modelleringstips">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">
                Foreslått tilnærming
              </h4>
              <div className="text-sm space-y-2">
                <p>
                  <strong>Aktører:</strong> Spiller (primær).
                </p>
                <p>
                  <strong>Brukstilfeller:</strong> &quot;Start spill&quot;
                  (inkluderer &quot;Del ut kort&quot;), &quot;Spill tur&quot;,
                  &quot;Avslutt omgang&quot;.
                </p>
                <p>
                  <strong>Konseptuelle klasser:</strong> Skyjo, Spiller, Kort,
                  Kortstokk, Kastehaugen, Spillebrett (3x4 rutenett),
                  Poengblokk.
                </p>
                <p>
                  <strong>Viktige assosiasjoner:</strong> Skyjo 1—2..8
                  Spiller, Skyjo 1—1 Kortstokk, Skyjo 1—1 Kastehaugen,
                  Spiller 1—1 Spillebrett, Spillebrett 1—12 Kort, Kortstokk
                  1—* Kort.
                </p>
                <p>
                  <strong>Attributter:</strong> Kort: verdi, synlig. Spiller:
                  navn, totalPoeng. Skyjo: antallOmganger.
                </p>
              </div>
            </div>
          </Solution>
        </Section>

        {/* 2023 vår */}
        <Section
          title="Eksamen vår 2023 — Max Mümmelmann"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <p className="text-sm text-[var(--muted)]">
            Kaninspill for 2–4 spillere. Samle en komplett kaninfamilie (6 kort
            med ulike nummer 1–6). 25 kaninkort + 1 kaninbrikke + 1 terning +
            spillebrett med 8 plasser.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
            <p>
              <strong>Oppsett:</strong> Brikke på rødt merke. Kort stokkes
              (uten Max Mümmelmann). Deles ut i 8 bunker à 3 kort. Max
              Mümmelmann legges oppå en bunke.
            </p>
            <p>
              <strong>Tur:</strong> Trill terning → flytt brikke (venstre
              ELLER høyre) → ta øverste kort fra bunken → behold hvis du
              mangler nummeret, ellers legg tilbake i bunnen. 6-er = ny tur.
            </p>
            <p>
              <strong>Max Mümmelmann (hvit kanin):</strong> Ta vilkårlig kort
              fra en annen spiller. Legges tilbake oppå en bunke etterpå.
            </p>
          </div>
          <Solution label="Vis professorens fasit">
            <div className="space-y-4">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  Brukstilfellemodell (fasit)
                </h4>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Aktører:</strong> Spiller, Admin.
                  </p>
                  <p>
                    <strong>Brukstilfeller:</strong> &quot;Start spill&quot;
                    (inkluderer &quot;Init spill&quot;), &quot;Spill tur&quot;.
                  </p>
                  <p>
                    <strong>Brukstilfellebeskrivelse — &quot;Spill tur&quot;:</strong>
                  </p>
                  <ol className="list-decimal list-inside text-xs space-y-1 ml-2">
                    <li>Trill terning</li>
                    <li>Flytt kaninbrikken det antall plasser terningen viser (venstre eller høyre)</li>
                    <li>Ta øverste kort i bunken</li>
                    <li>Hvis kort mangler: behold kortet</li>
                    <li>Ellers: legg tilbake i bunnen</li>
                    <li>Hvis terningen viser 6: spill ny tur</li>
                  </ol>
                  <p>
                    <strong>Brukstilfellebeskrivelse — &quot;Start spill&quot;:</strong>
                  </p>
                  <ol className="list-decimal list-inside text-xs space-y-1 ml-2">
                    <li>&quot;Init spill&quot; (del ut kort, plasser brikke)</li>
                    <li>For alle spillerne: &quot;Spill tur&quot;</li>
                    <li>Hvis full familie: vinner — avslutt</li>
                    <li>Ellers: fortsett fra 2</li>
                  </ol>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  Domenemodell (fasit)
                </h4>
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs leading-relaxed">
                  <pre>{`MaxMummelmann 1──1 Brett       MaxMummelmann 1──1 Terning
MaxMummelmann 1──1 Brikke      MaxMummelmann 1──2..4 Spiller(+navn)
Brett 1──8 Rute                Brikke 1──1 Rute (nåværende)
Spiller 0..6──* Kort(+nummer)  Rute *──* Kort`}</pre>
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">
                  Merk: Ingen metoder. Konseptet &quot;bunke&quot; kan legges
                  til i utformingsmodellen. Kort har nummer (1–6).
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  Sekvensdiagram — &quot;Spill tur&quot; (fasit)
                </h4>
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs leading-relaxed">
                  <pre>{`:Spiller → :MaxMummelmann
  trill() → :Terning
  verdi = getVerdi() → :Terning
  flyttBrikke(verdi) → :Brikke → flytt(verdi) [via :Brett]
  kort = visKort() → :Brett → :Rute → visØversteKort()
  alt [kort mangler i samlingen]:
    kort = taKort() → :Rute → taØversteKort()
    leggTilKort(kort) → :Spiller
  [else]:
    leggTilbake(kort) → :Rute`}</pre>
                </div>
              </div>
            </div>
          </Solution>
        </Section>

        {/* Høst 2023 konte */}
        <Section title="Konteeksamen høst 2023 — Ganz Schön Clever">
          <p className="text-sm text-[var(--muted)]">
            Terningspill for 2–4 spillere. 5 terninger med farger (gul, rød,
            grønn, blå) og symboler (ballong, lys, presang, søtsak) + 3
            jokersider. Kryss av symboler på personlig spillebrett.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
            <p>
              <strong>Tur:</strong> Trill alle terninger → velg én → kryss av
              symboler. Kan også ta alle med samme bakgrunnsfarge + jokere.
              Andre spillere velger fra gjenværende terninger.
            </p>
            <p>
              <strong>Avkryssingsregler:</strong> Ballonger: venstre→høyre.
              Lys: venstre→høyre, flere samtidig. Presanger: vilkårlig.
              Søtsaker: krever 2 terninger, alle 3 typer før neste rad.
            </p>
            <p>
              <strong>Slutt:</strong> Når noen har fylt et fargeområde. Flest
              regnbuestjerner vinner.
            </p>
          </div>
          <Solution label="Vis modelleringstips">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
              <p>
                <strong>Konseptuelle klasser:</strong> Spill, Spiller,
                Spillebrett, Terning (+farge, +symbol, +erJoker), Rute
                (+farge, +symbol, +avkrysset), Runde.
              </p>
              <p className="mt-2">
                <strong>Viktig:</strong> Avkryssingsreglene er komplekse —
                beskriv dem i brukstilfellebeskrivelsen, IKKE i
                domenemodellen. Domenemodellen viser bare strukturen.
              </p>
            </div>
          </Solution>
        </Section>

        {/* 2022 */}
        <Section title="Eksamen vår 2022 — KIMBO">
          <p className="text-sm text-[var(--muted)]">
            Brettspill (DAMM 1962) for 2–4 spillere. Brett med rutenett, 2
            terninger, 4 brikker + 6 stengsler per spiller. Mål: få alle 4
            brikker i sentrum først.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
            <p>
              <strong>Tur:</strong> (Valgfritt) flytt et stengsel → trill 2
              terninger → flytt 1 brikke fullt antall ELLER 2 brikker
              fordelt. Kun horisontalt/vertikalt, stengsel/streker = 90°
              sving. Landing på annen brikke = slå ut.
            </p>
            <p>
              <strong>Mål:</strong> Riktig retning + riktig antall øyne for å
              nå sentrum.
            </p>
          </div>
          <Solution label="Vis modelleringstips">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
              <p>
                <strong>Konseptuelle klasser:</strong> Kimbo, Brett, Rute,
                Spiller, Brikke, Stengsel, Terning.
              </p>
              <p className="mt-2">
                <strong>Tricky:</strong> Stengsler plasseres i &quot;hull&quot;
                mellom ruter — dette kan modelleres som en egen klasse
                (Plassering) eller som assosiasjon mellom Ruter.
              </p>
            </div>
          </Solution>
        </Section>

        {/* Jan 2023 konte */}
        <Section title="Konteeksamen jan 2023 — Magiske øyne">
          <p className="text-sm text-[var(--muted)]">
            Terningspill med 6 RPG-terninger (4, 6, 8, 10, 12, 20 sider) +
            en vanlig terning. 1–4 spillere, 10 runder. Vanlig terning
            bestemmer hvilken RPG-terning du triller.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm">
            <p>
              <strong>Mekanikk:</strong> Trill vanlig terning → 1=4-sider,
              2=6-sider, ..., 6=20-sider. Poeng = antall øyne på
              RPG-terningen. Høyest poengsum etter 10 runder vinner.
            </p>
          </div>
          <Solution label="Vis modelleringstips">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
              <p>
                <strong>Konseptuelle klasser:</strong> Spill, Spiller, Terning
                (+antallSider), Poengskjema, Runde.
              </p>
              <p className="mt-2">
                <strong>Tips:</strong> En Terning-klasse med attributt
                antallSider dekker alle 7 terningene. Poengskjemaet kan
                modelleres som egen klasse med assosiasjoner til Spiller og
                Runde.
              </p>
            </div>
          </Solution>
        </Section>

        {/* 2021 */}
        <Section
          title="Eksamen vår 2021 — Hungry Cats"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <p className="text-sm text-[var(--muted)]">
            Kattespill for 2–4 spillere. 5x5 rutenett med matbrikker,
            kaninbrikke per spiller. Samle sett og sekvenser av mat for poeng.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
            <p>
              <strong>Oppsett:</strong> Bland 88 matbrikker. Legg ut 5x5
              rutenett. Plasser kattebrikker på utsiden.
            </p>
            <p>
              <strong>Matbrikker:</strong> Matretter (reker, kylling, ost,
              bacon, pizza, pasta, fisk, is) + spesialbrikker (lokkemat,
              kattesekk/joker, knust tallerken/minuspoeng).
            </p>
            <p>
              <strong>Tur:</strong> Flytt katten 2 felt (horisontalt/vertikalt)
              — skyv matbrikker ut i bevegelsesretning. Samle inn utkastede
              brikker. Fyll på nye brikker.
            </p>
          </div>
          <Solution label="Vis sensors kommentarer">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 text-sm space-y-2">
              <h4 className="font-bold text-amber-700 dark:text-amber-400">
                Sensors evaluering (2021)
              </h4>
              <p>
                <strong>Brukstilfellemodell:</strong> &quot;Forventet en
                brukstilfellemodell i UML. I dette spillet behøver den ikke
                inneholde mange brukstilfeller — det er stadig noen som faller
                i fellen og beskriver flyten ved å benytte mange
                brukstilfeller som en sekvens av handlinger.&quot;
              </p>
              <p>
                <strong>Domenemodell:</strong> &quot;Måtte gi fornuftige
                konseptuelle klasser. Konseptuelle klasser skal ha et godt
                navn, attributter og assosiasjoner som samsvarer med
                problembeskrivelse. Det er ingen metoder i
                domenemodellen.&quot;
              </p>
              <p>
                <strong>Sekvensdiagram:</strong> &quot;En melding kan kun
                sendes fra et objekt som er aktivt, og ettersom vi
                programmerer sekvensielt må metodekallene komme i en sekvens —
                de kan ikke plutselig dukke opp.&quot;
              </p>
            </div>
          </Solution>
        </Section>

        {/* 2020 */}
        <Section
          title="Eksamen høst 2020 — Eksamenssystem"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <p className="text-sm text-[var(--muted)]">
            Automatisert system for å avvikle eksamen. Lærer lager oppgaver
            og definerer eksamen. Kandidater logger inn, svarer og leverer.
            System regner ut karakter.
          </p>
          <Solution label="Vis professorens fasit">
            <div className="space-y-4">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  Aktører og brukstilfeller
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Aktører:</strong> Student, Lærer.
                  </p>
                  <p>
                    <strong>Brukstilfeller:</strong> Lag oppgave, Definer
                    eksamen, Besvar eksamen (inkl. Lever besvarelse), Godkjenn
                    karakter.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  Domenemodell
                </h4>
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs leading-relaxed">
                  <pre>{`Lærer 1──* Oppgave ──* Spørsmål ──* Svaralternativ(+riktig: boolean)
Eksamen(+tid, +varighet) ──* Student(+brukernavn, +passord)
Student ──* Besvarelse(+karakter) ──* Svar(+kryss: boolean)`}</pre>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  Brukstilfellebeskrivelse — &quot;Lag oppgave&quot;
                </h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Opprett ny oppgave med informasjon</li>
                  <li>Lag spørsmål</li>
                  <li>Lag svaralternativ</li>
                  <li>Oppgi om alternativ er riktig</li>
                  <li>Gjenta 3–4 til alle alternativ er lagd</li>
                  <li>Gjenta fra 2 til alle spørsmål er lagd</li>
                  <li>Lagre oppgave</li>
                </ol>
              </div>
            </div>
          </Solution>
        </Section>
      </div>
    </div>
  );
}
