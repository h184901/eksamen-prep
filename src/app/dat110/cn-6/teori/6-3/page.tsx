"use client";

import Link from "next/link";
import { useState } from "react";

const CSMA_CD_TIMELINE = [
  { tid: "t=0", hendelse: "Node A sjekker kanalen. Kanalen er ledig.", status: "ledig", forklaring: "Carrier Sense: A lytter på kanalen og hører ingenting. Kanalen virker fri." },
  { tid: "t=1", hendelse: "Node A begynner å sende ramme X.", status: "sender", forklaring: "A starter overføringen av ramme X. Signalet brer seg ut i mediet." },
  { tid: "t=2", hendelse: "Node B lytter — kanalen virker ledig (As signal er ikke fremme ennå).", status: "ledig", forklaring: "Signalet fra A har ikke nådd B ennå. B ser kanalen som ledig (propagasjonsforsinkelse!)." },
  { tid: "t=3", hendelse: "B begynner å sende ramme Y — KOLLISJON!", status: "kollisjon", forklaring: "B starter sending. Kollisjon oppstår fordi to noder sender samtidig." },
  { tid: "t=4", hendelse: "A og B oppdager kollisjon (CD). Sender JAM-signal (48 bits).", status: "kollisjon", forklaring: "Collision Detection: Begge detekterer kollisjonen ved å sammenligne sendt/mottatt signal. JAM-signal varsler alle om kollisjonen." },
  { tid: "t=5", hendelse: "A og B avbryter sending. Trekker tilbake-off tid fra Binary Exponential Backoff.", status: "venter", forklaring: "Binary Exponential Backoff: Første gang → venter 0 eller 1 slot. Andre gang → 0,1,2 eller 3. Osv." },
  { tid: "t=6", hendelse: "A venter 1 slot, B venter 3 slots. A sjekker kanalen — ledig. A sender igjen.", status: "sender", forklaring: "A 'vant' tilbake-off og sender igjen. B venter fremdeles. Nå er det bare A på kanalen." },
  { tid: "t=7", hendelse: "Ramme X leveres korrekt! Ingen ny kollisjon.", status: "suksess", forklaring: "Overføringen lykkes. CSMA/CD gjør at kollisjoner ikke ødelegger kommunikasjonen permanent." },
];

export default function CN6_3Page() {
  const [csmaStep, setCsmaStep] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const statusFarge = (s: string) => {
    if (s === "kollisjon") return "bg-red-500/20 border-red-500/40";
    if (s === "sender") return "bg-green-500/20 border-green-500/40";
    if (s === "venter") return "bg-amber-500/20 border-amber-500/40";
    if (s === "suksess") return "bg-blue-500/20 border-blue-500/40";
    return "bg-[var(--card)] border-[var(--card-border)]";
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.3 Multiple-access-protokoller</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">6.3 Multiple-access-protokoller</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Mange noder deler én kanal. Hvem sender når? Multiple-access-protokoller løser dette. De deles i tre kategorier: kanalpartisjonering, random access og "taking-turns".
        </p>
      </div>

      {/* Problemet */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Problemet med delt medium</h2>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
          <p className="text-sm text-[var(--muted)]">
            Tenk på en klasseromssamtale der alle prater samtidig — det blir kaos. På samme måte vil kollisjon av rammer på et delt nettverkmedium ødelegge all kommunikasjon. Multiple-access-protokoller er "reglene" for hvem som har lov til å snakke og når.
          </p>
          <p className="text-sm text-[var(--muted)] mt-2">
            Et ideelt protokoll for en kringkastingskanal med hastighet R bps: Når N noder ønsker å sende, sender hver med gjennomsnittlig R/N bps. Ingen sentralisert koordinering, ingen synkronisering.
          </p>
        </div>
      </section>

      {/* Oversikt */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Tre kategorier</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              tittel: "1. Kanalpartisjonering",
              farge: "border-purple-500/40 bg-purple-500/5",
              desc: "Del kanalen inn i biter (tidslots, frekvenser). Garantert kapasitet, men sløseri når noden ikke sender.",
              eks: "TDMA, FDMA",
            },
            {
              tittel: "2. Random Access",
              farge: "border-red-500/40 bg-red-500/5",
              desc: "Send når du vil! Kollisjon kan oppstå — protokollen håndterer gjenopphenting. Effektivt ved lav last.",
              eks: "ALOHA, CSMA, CSMA/CD",
            },
            {
              tittel: "3. Taking-Turns",
              farge: "border-green-500/40 bg-green-500/5",
              desc: "Noder tar tur. Unngår kollisjon og sløseri, men overhead ved koordinering.",
              eks: "Polling, Token Ring",
            },
          ].map((k) => (
            <div key={k.tittel} className={`border rounded-xl p-5 ${k.farge}`}>
              <h3 className="font-bold mb-2">{k.tittel}</h3>
              <p className="text-sm text-[var(--muted)] mb-2">{k.desc}</p>
              <div className="text-xs font-mono bg-[var(--card)] border border-[var(--card-border)] rounded px-2 py-1 inline-block">{k.eks}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kanalpartisjonering */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Kategori 1: Kanalpartisjonering</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-2">TDMA — Time Division Multiple Access</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Kanalen deles opp i tidssykler. Hver node får et fast tidslot per syklus. Ubrukte slots er bortkastet.
            </p>
            <div className="font-mono text-xs bg-[var(--card)] border border-[var(--card-border)] rounded p-2">
              <div className="flex gap-1 mb-1">
                {["A","B","C","D","A","B","C","D"].map((n, i) => (
                  <div key={i} className={`px-2 py-1 rounded text-center flex-1 ${n === "A" ? "bg-blue-500/30" : n === "B" ? "bg-green-500/30" : n === "C" ? "bg-purple-500/30" : "bg-amber-500/30"}`}>{n}</div>
                ))}
              </div>
              <div className="text-[var(--muted)]">← en syklus →</div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Eks: 6-stations LAN med 1Mbps → hver node max 167 kbps, selv om bare 1 node vil sende.</p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-2">FDMA — Frequency Division Multiple Access</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Kanalbåndbredden deles i frekvenssbånd. Hver node tildeles ett fast bånd. Analogt med FM-radiostasjoner.
            </p>
            <div className="font-mono text-xs bg-[var(--card)] border border-[var(--card-border)] rounded p-2">
              <div className="flex gap-1">
                {[
                  { n: "A", f: "100-200 MHz" },
                  { n: "B", f: "200-300 MHz" },
                  { n: "C", f: "300-400 MHz" },
                ].map((b) => (
                  <div key={b.n} className={`px-2 py-1 rounded text-center flex-1 ${b.n === "A" ? "bg-blue-500/30" : b.n === "B" ? "bg-green-500/30" : "bg-purple-500/30"}`}>
                    <div>{b.n}</div>
                    <div className="text-[10px] text-[var(--muted)]">{b.f}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Brukes i GSM-mobilnett, kabel-TV.</p>
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4">
          <p className="text-sm font-semibold mb-1">Problem med kanalpartisjonering:</p>
          <p className="text-sm text-[var(--muted)]">Sløser kapasitet! Hvis bare 1 node vil sende, kan den bare bruke sin andel (R/N) av kanalen — aldri hele R bps. Random access-protokoller fikser dette.</p>
        </div>
      </section>

      {/* Random Access */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Kategori 2: Random Access-protokoller</h2>

        {/* ALOHA */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-2">Pure ALOHA</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Send når du vil! Hvis kollisjon, vent en tilfeldig tid og prøv igjen. Enkelt, men ineffektivt. Maksimal effektivitet: <strong>1/(2e) ≈ 18%</strong>.
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-2">Slotted ALOHA</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Tid er delt i like store slots. Noder kan bare starte sending ved begynnelsen av en slot. Halverer sannsynligheten for kollisjon. Maksimal effektivitet: <strong>1/e ≈ 37%</strong>.
          </p>
          <div className="font-mono text-xs bg-[var(--card)] border border-[var(--card-border)] rounded p-3 mb-2">
            <div>Slot 1: A sender OK ✓</div>
            <div>Slot 2: B og C sender → KOLLISJON ✗</div>
            <div>Slot 3: tom (ingen sender)</div>
            <div>Slot 4: B sender igjen OK ✓</div>
            <div>Slot 5: C sender igjen OK ✓</div>
          </div>
          <p className="text-xs text-[var(--muted)]">Brukt i historiske systemer. Viktig å kjenne til for eksamen pga effektivitetsdiskusjon.</p>
        </div>

        {/* CSMA */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-2">CSMA — Carrier Sense Multiple Access</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            <strong>Lyst etter (listen before talking):</strong> Sjekk kanalen før du sender. Om den er opptatt, utsett sending. Men det er fremdeles mulig å kollidere pga propagasjonsforsinkelse!
          </p>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-[var(--muted)]">
            <strong>Analogien:</strong> Er som å høre etter om noen snakker i et rom. Men om du og en annen begynner å snakke akkurat samtidig fra to kanter av rommet, hører dere ikke hverandre på grunn av lydhastigheten.
          </div>
        </div>

        {/* CSMA/CD — med interaktiv timeline */}
        <div className="bg-[var(--card)] border-2 border-blue-500/40 rounded-xl p-6">
          <h3 className="font-bold mb-1">CSMA/CD — Collision Detection</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            CSMA/CD legger til <strong>kollisjondeteksjon</strong>: hvis kollisjon oppdages under sending, avbryt umiddelbart og prøv igjen etter tilbake-off. Brukt i klassisk Ethernet (802.3). Reduserer sløseri drastisk.
          </p>

          <div className={`border rounded-xl p-4 mb-4 ${statusFarge(CSMA_CD_TIMELINE[csmaStep].status)}`}>
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono font-bold text-lg">{CSMA_CD_TIMELINE[csmaStep].tid}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                CSMA_CD_TIMELINE[csmaStep].status === "kollisjon" ? "bg-red-500 text-white" :
                CSMA_CD_TIMELINE[csmaStep].status === "sender" ? "bg-green-500 text-white" :
                CSMA_CD_TIMELINE[csmaStep].status === "suksess" ? "bg-blue-500 text-white" :
                "bg-amber-500 text-white"
              }`}>
                {CSMA_CD_TIMELINE[csmaStep].status.toUpperCase()}
              </span>
            </div>
            <p className="font-semibold text-sm mb-2">{CSMA_CD_TIMELINE[csmaStep].hendelse}</p>
            <p className="text-sm text-[var(--muted)]">{CSMA_CD_TIMELINE[csmaStep].forklaring}</p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setCsmaStep(Math.max(0, csmaStep - 1))}
              disabled={csmaStep === 0}
              className="px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm disabled:opacity-40"
            >
              ← Forrige
            </button>
            <span className="text-sm text-[var(--muted)]">{csmaStep + 1}/{CSMA_CD_TIMELINE.length}</span>
            <button
              onClick={() => setCsmaStep(Math.min(CSMA_CD_TIMELINE.length - 1, csmaStep + 1))}
              disabled={csmaStep === CSMA_CD_TIMELINE.length - 1}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-40"
            >
              Neste →
            </button>
          </div>

          <div className="flex gap-1 mt-3">
            {CSMA_CD_TIMELINE.map((s, i) => (
              <button
                key={i}
                onClick={() => setCsmaStep(i)}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s.status === "kollisjon" ? (i === csmaStep ? "bg-red-500" : "bg-red-500/30") :
                  s.status === "sender" ? (i === csmaStep ? "bg-green-500" : "bg-green-500/30") :
                  s.status === "suksess" ? (i === csmaStep ? "bg-blue-500" : "bg-blue-500/30") :
                  (i === csmaStep ? "bg-amber-500" : "bg-amber-500/30")
                }`}
              />
            ))}
          </div>
        </div>

        {/* Binary Exponential Backoff */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-2">Binary Exponential Backoff</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Etter n-te kollisjon: velg K tilfeldig fra {"{0, 1, ..., 2ⁿ - 1}"}. Vent K · 512 bit-tider. Etter 10 kollisjoner fryses utvalget ved 2¹⁰ = 1024. Etter 16 kollisjoner — feil rapporteres.
          </p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse w-full">
              <thead>
                <tr className="bg-[var(--card)]">
                  <th className="border border-[var(--card-border)] px-3 py-2">Kollisjon nr.</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">K velges fra</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Maks ventetid</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [1, "{0, 1}", "1 slot"],
                  [2, "{0, 1, 2, 3}", "3 slots"],
                  [3, "{0...7}", "7 slots"],
                  [4, "{0...15}", "15 slots"],
                  ["...", "...", "..."],
                  [10, "{0...1023}", "1023 slots"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[var(--card)]">
                    <td className="border border-[var(--card-border)] px-3 py-2 text-center">{r[0]}</td>
                    <td className="border border-[var(--card-border)] px-3 py-2 font-mono text-xs">{r[1]}</td>
                    <td className="border border-[var(--card-border)] px-3 py-2">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Taking-Turns */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Kategori 3: Taking-Turns-protokoller</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-2">Polling</h3>
            <p className="text-sm text-[var(--muted)]">
              En master-node "poller" (inviterer) slave-noder til å sende, én om gangen. Eliminerer kollisjon og tomme slots. Problemet: polling-overhead, og master er single point of failure. Brukes i Bluetooth.
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-2">Token-passing</h3>
            <p className="text-sm text-[var(--muted)]">
              Et spesielt token (ramme) sirkulerer rundt ringen. En node kan bare sende når den holder tokenet. Eliminerer kollisjon, men token overhead og single point of failure (tapt token). Brukt i Token Ring (eldre).
            </p>
          </div>
        </div>
      </section>

      {/* Sammenligning */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Sammenligning av alle protokoller</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Protokoll</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Kollisjon</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Effektivitet</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Brukt i</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["TDMA/FDMA", "Nei", "Max R/N (sløser)", "GSM, kabel-TV"],
                ["Pure ALOHA", "Ja", "18%", "Historisk"],
                ["Slotted ALOHA", "Ja (men sjeldnere)", "37%", "Satellitt"],
                ["CSMA", "Ja", "Bedre enn ALOHA", "Eldre trådløst"],
                ["CSMA/CD", "Oppdages, avbrytes", "~35-50%", "Klassisk Ethernet"],
                ["Polling", "Nei", "Høy (overhead)", "Bluetooth"],
                ["Token Ring", "Nei", "Høy (overhead)", "Eldre LAN"],
              ].map((r) => (
                <tr key={r[0]} className="hover:bg-[var(--card)]">
                  {r.map((c, i) => (
                    <td key={i} className={`border border-[var(--card-border)] px-3 py-2 ${i === 0 ? "font-semibold" : "text-[var(--muted)]"}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Eksamenstips */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Eksamentips</h2>
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-5">
          <ul className="space-y-2 text-sm">
            {[
              "Fra Oppgave 1 jan 2025: 'For which type of medium access protocol may collision occur?' — Svar: CSMA (random access). Ikke TDMA/FDM.",
              "CSMA/CD brukes i Ethernet. WiFi bruker CSMA/CA (collision avoidance — kan ikke detektere kollisjon trådløst).",
              "Binary exponential backoff: Etter n kollisjoner, velg K fra {0,...,2ⁿ-1}.",
              "Husk: Ethernet-NIC kan detect kollisjon fordi de kan lytte og sende simultant på kabelen.",
              "Slotted ALOHA max effektivitet = 1/e ≈ 0.37 (37%). Pure ALOHA = 1/(2e) ≈ 0.18 (18%).",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 font-bold shrink-0">★</span>
                <span className="text-[var(--muted)]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          ← 6.2 Feildeteksjon og korreksjon
        </Link>
        <Link href="/dat110/cn-6/teori/6-4" className="hover:text-[var(--accent)] text-sm">
          6.4 Ethernet, MAC, ARP og switch →
        </Link>
      </div>
    </div>
  );
}
