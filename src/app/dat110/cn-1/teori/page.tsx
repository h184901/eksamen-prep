"use client";

import { useState } from "react";

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">*</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function CN1TeoriPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Teori: Nettverksintroduksjon og metrikker</h2>
      <p className="text-[var(--muted)] max-w-2xl mb-4">
        Dette kapittelet er fundamentet for hele faget. Her laerer du hva internett er,
        hvordan protokollstakken fungerer, og de kritiske formlene for forsinkelse
        og gjennomstromning som alltid kommer pa eksamen.
      </p>

      {/* Delkapittel-navigasjon */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "1.1", title: "Hva er internett?" },
          { id: "1.2", title: "Nettverkskanten" },
          { id: "1.3", title: "Nettverkskjernen" },
          { id: "1.4", title: "Forsinkelse og gjennomstromning" },
          { id: "1.5", title: "Protokolllag" },
          { id: "1.6", title: "Angrep pa nettverk" },
          { id: "1.7", title: "Historikk" },
        ].map((ch) => (
          <span
            key={ch.id}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)]"
            title={ch.title}
          >
            <span className="font-bold text-network-600 dark:text-network-400">{ch.id}</span>
            <span className="ml-1.5 text-xs text-[var(--muted)] hidden sm:inline">{ch.title}</span>
          </span>
        ))}
      </div>

      <MustKnow items={[
        "TCP/IP 5-lagsmodell med eksempler pa protokoller per lag",
        "Forskjellen mellom pakkeswitching og kretsswitching",
        "Alle fire forsinkelsestyper og formlene d_trans = L/R og d_prop = d/s",
        "Trafikkintensitet La/R og hva som skjer nar den narmer seg 1",
        "Ende-til-ende forsinkelse over flere hopp",
        "Gjennomstromning og flaskehals-konseptet",
      ]} />

      <Section title="1. Hva er internett?" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)]">
          Internett kan forstAs pA to mAter:
        </p>
        <Card color="blue">
          <h4 className="font-bold mb-2">Nott-og-bolt-perspektivet (teknisk)</h4>
          <div className="text-sm space-y-2">
            <p>Internett er et <strong>nettverk av nettverk</strong> som kobler milliarder av enheter.</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-blue-700 dark:text-blue-400">Hosts (endesystemer)</p>
                <p className="text-xs text-[var(--muted)]">PCer, mobiler, servere, IoT-enheter. Kjorer nettverksapplikasjoner.</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-blue-700 dark:text-blue-400">Kommunikasjonslinker</p>
                <p className="text-xs text-[var(--muted)]">Fiber, kobberkabel, radio, satellitt. Overforingshastighet = bandbredde (bits/s).</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-blue-700 dark:text-blue-400">Pakkeswitcher</p>
                <p className="text-xs text-[var(--muted)]">Rutere og link-layer-switcher. Videresender pakker mot mAlet.</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-blue-700 dark:text-blue-400">ISP-er</p>
                <p className="text-xs text-[var(--muted)]">Internet Service Providers. Hierarki: Tier 1, Tier 2, aksess-ISPer.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Tjenesteperspektivet</h4>
          <p className="text-sm">Internett er en <strong>infrastruktur som tilbyr tjenester til applikasjoner</strong>. Applikasjoner (web, e-post, streaming) kjorer pa endesystemer og kommuniserer via socket-APIet.</p>
        </Card>
      </Section>

      <Section title="2. Nettverkskanten vs nettverkskjernen">
        <Card color="blue">
          <h4 className="font-bold mb-2">Nettverkskanten (edge)</h4>
          <div className="text-sm space-y-1">
            <p><strong>Hosts</strong> = endesystemer som kjorer applikasjoner</p>
            <p><strong>Aksessnettverk</strong> kobler hosts til forste ruter (edge router):</p>
            <ul className="list-disc list-inside ml-4 text-[var(--muted)]">
              <li>DSL (Digital Subscriber Line) — via telefonlinje</li>
              <li>Kabel/HFC — via kabel-TV-nett, delt medium</li>
              <li>Fiber (FTTH) — raskt, dedikert</li>
              <li>WiFi/mobilt — tradlost aksess</li>
              <li>Ethernet — typisk i bedrifter/campus</li>
            </ul>
          </div>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Nettverkskjernen (core)</h4>
          <div className="text-sm space-y-2">
            <p>Et nett av rutere som videresender pakker. To hovedmetoder:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 border border-green-300 dark:border-green-700">
                <p className="font-bold text-xs text-green-700 dark:text-green-400">Pakkeswitching</p>
                <p className="text-xs text-[var(--muted)]">Data deles i pakker. Hver pakke sendes uavhengig. <strong>Store-and-forward</strong>: hele pakken mA mottas for den videresendes. Statistisk multipleksing = deling av bandbredde.</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 border border-red-300 dark:border-red-700">
                <p className="font-bold text-xs text-red-700 dark:text-red-400">Kretsswitching</p>
                <p className="text-xs text-[var(--muted)]">Dedikert krets for hele sesjonen (telefonnett). Ressurser reserveres, ingen deling. FDM eller TDM multipleksing.</p>
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-2 text-sm text-amber-800 dark:text-amber-300 mt-2">
              <span className="font-bold">Eksamensfavoritt: </span>Pakkeswitching er mer effektivt enn kretsswitching for bursty trafikk (typisk for internett). Kretsswitching garanterer ytelse men sloser med kapasitet.
            </div>
          </div>
        </Card>
      </Section>

      <Section title="3. Protokollstakken (TCP/IP 5-lagsmodell)" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">
          Protokollstakken er en <strong>lagdelt arkitektur</strong> der hvert lag kun kommuniserer
          med laget over og under. Dette gir modularitet — du kan bytte ut ett lag uten a
          pAvirke de andre.
        </p>

        <Card color="gold">
          <h4 className="font-bold mb-3">De fem lagene</h4>
          <div className="space-y-2">
            {[
              { lag: "5. Applikasjon", pdu: "Melding", proto: "HTTP, DNS, FTP, SMTP", hva: "Applikasjonsdata mellom prosesser. Bruker portnummer." },
              { lag: "4. Transport", pdu: "Segment", proto: "TCP, UDP", hva: "Prosess-til-prosess levering. Multipleksing via porter. TCP gir palitelig levering." },
              { lag: "3. Nettverk", pdu: "Datagram", proto: "IP, ICMP", hva: "Hopp-for-hopp rutevalg med IP-adresser. Fragmentering. Beste-innsats levering." },
              { lag: "2. Link", pdu: "Ramme (frame)", proto: "Ethernet, WiFi", hva: "Overfoering over en enkelt link. MAC-adresser. Feildeteksjon." },
              { lag: "1. Fysisk", pdu: "Bits", proto: "Kobber, fiber, radio", hva: "Selve bitoverforingen pA det fysiske mediet." },
            ].map(({ lag, pdu, proto, hva }) => (
              <div key={lag} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-sm text-amber-700 dark:text-amber-400">{lag}</span>
                  <span className="text-xs font-mono bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">{pdu}</span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1"><strong>Protokoller:</strong> {proto}</p>
                <p className="text-xs text-[var(--muted)]">{hva}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card color="blue">
          <h4 className="font-bold mb-2">Kapsling og dekapsling</h4>
          <div className="text-sm space-y-1">
            <p><strong>Kapsling (sending):</strong> Hvert lag legger til sin header foran dataen fra laget over.</p>
            <p className="font-mono text-xs">App-data &#8594; [TCP-hdr | data] &#8594; [IP-hdr | TCP-hdr | data] &#8594; [Eth-hdr | IP-hdr | TCP-hdr | data | Eth-trail]</p>
            <p className="mt-2"><strong>Dekapsling (mottak):</strong> Hvert lag fjerner sin header og sender dataen oppover.</p>
          </div>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Hvem implementerer hvilke lag?</h4>
          <div className="text-sm space-y-1">
            <p><strong>Vert (host):</strong> Alle 5 lag</p>
            <p><strong>Ruter:</strong> Lag 1, 2 og 3 (fysisk, link, nettverk)</p>
            <p><strong>Switch:</strong> Lag 1 og 2 (fysisk og link)</p>
          </div>
        </Card>
      </Section>

      <Section title="4. Forsinkelse — KRITISK for eksamen" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">
          Forsinkelsesberegning er den oppgavetypen som kommer <strong>pa ALLE eksamener</strong>
          (oppgave 3). Du mA kunne alle fire typer og vite nAr hver brukes.
        </p>

        <Card color="gold">
          <h4 className="font-bold mb-3">Fire forsinkelsestyper</h4>
          <div className="space-y-3">
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-red-200 dark:border-red-800 p-3">
              <p className="font-bold text-sm text-red-700 dark:text-red-400">1. Behandlingsforsinkelse (d_proc)</p>
              <p className="text-xs text-[var(--muted)]">Tid til a sjekke bitfeil og bestemme utgangslink. Typisk mikrosekunder. Ofte neglisjerbar.</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-orange-200 dark:border-orange-800 p-3">
              <p className="font-bold text-sm text-orange-700 dark:text-orange-400">2. Koforsinkelse (d_queue)</p>
              <p className="text-xs text-[var(--muted)]">Tid pakken venter i utgangskoen. Avhenger av trafikk. Beskrives med trafikkintensitet La/R.</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-sm text-blue-700 dark:text-blue-400">3. Sendingsforsinkelse (d_trans = L/R)</p>
              <p className="text-xs text-[var(--muted)]">Tid til a presse alle bits ut pA linken. L = pakkelengde (bits), R = linjekapasitet (bits/s).</p>
              <p className="font-mono text-sm mt-1 font-bold">d_trans = L / R</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-green-200 dark:border-green-800 p-3">
              <p className="font-bold text-sm text-green-700 dark:text-green-400">4. Forplantningsforsinkelse (d_prop = d/s)</p>
              <p className="text-xs text-[var(--muted)]">Tid for en bit a reise fysisk fra A til B. d = avstand (m), s = signalhastighet i mediet.</p>
              <p className="font-mono text-sm mt-1 font-bold">d_prop = d / s</p>
              <p className="text-xs text-[var(--muted)] mt-1">Typisk: kopper ~2x10^8 m/s, fiber ~2x10^8 m/s, luft ~3x10^8 m/s</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3">
            <p className="font-bold text-sm">Total nodalforsinkelse:</p>
            <p className="font-mono text-sm mt-1">d_nodal = d_proc + d_queue + d_trans + d_prop</p>
          </div>
        </Card>

        <Card color="red">
          <h4 className="font-bold mb-2 text-red-700 dark:text-red-400">Vanlig feil!</h4>
          <div className="text-sm space-y-1">
            <p>Mange blander <strong>sendingsforsinkelse</strong> og <strong>forplantningsforsinkelse</strong>:</p>
            <p>d_trans = L/R handler om <strong>linkekapasiteten</strong> (hvor fort bits pumpes ut)</p>
            <p>d_prop = d/s handler om <strong>fysisk avstand</strong> (hvor langt bits ma reise)</p>
            <p className="mt-2 font-bold">Analogi: En karavane pa motorvei.</p>
            <p className="text-[var(--muted)]">d_trans = tiden det tar for alle biler a kjore gjennom bomstasjonen (avhenger av antall biler og hastigheten bomstasjonen betjener dem). d_prop = tiden det tar en bil a kjore fra A til B (avhenger av avstand og fart).</p>
          </div>
        </Card>
      </Section>

      <Section title="5. Trafikkintensitet og gjennomstromning">
        <Card color="gold">
          <h4 className="font-bold mb-2">Trafikkintensitet</h4>
          <div className="text-sm space-y-2">
            <div className="font-mono bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-center">
              Trafikkintensitet = La/R
            </div>
            <p>L = gjennomsnittlig pakkelengde (bits), a = gjennomsnittlig ankomstrate (pakker/s), R = linjekapasitet (bits/s)</p>
            <div className="space-y-1 mt-2">
              <p><strong>La/R &lt; 1:</strong> Forsinkelse liten, men oker eksponentielt nAr den narmer seg 1</p>
              <p><strong>La/R = 1:</strong> Gjennomsnittlig ko vokser uten grense</p>
              <p><strong>La/R &gt; 1:</strong> Pakketap! Flere bits ankommer enn det som kan sendes.</p>
            </div>
          </div>
        </Card>

        <Card color="blue">
          <h4 className="font-bold mb-2">Gjennomstromning (throughput)</h4>
          <div className="text-sm space-y-2">
            <p><strong>Gjennomstromning</strong> = rate (bits/s) som data leveres fra sender til mottaker.</p>
            <div className="font-mono bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-center">
              Gjennomstromning = min(R_1, R_2, ..., R_n)
            </div>
            <p>Gjennomstromningen bestemmes av den <strong>smaleste linken</strong> pA hele stien — flaskehalsen.</p>
            <p className="mt-2"><strong>Ende-til-ende gjennomstromning</strong> gjennom et delt nettverk:</p>
            <p className="text-[var(--muted)]">Hvis N tilkoblinger deler en kjernelink med kapasitet R, fAr hver tilkobling R/N (forutsatt rettferdig deling).</p>
          </div>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Ende-til-ende forsinkelse</h4>
          <div className="text-sm space-y-1">
            <p>Over N linker (N-1 rutere):</p>
            <div className="font-mono bg-network-100 dark:bg-network-900/30 p-2 rounded-lg text-center">
              d_e2e = N * (d_proc + d_queue + d_trans + d_prop)
            </div>
            <p className="text-[var(--muted)]">Husk: d_trans og d_prop kan vare ulike pA hver link!</p>
            <p className="mt-2"><strong>Store-and-forward:</strong> En pakke pA L bits over N linker (uten ko/prosessering):</p>
            <div className="font-mono bg-network-100 dark:bg-network-900/30 p-2 rounded-lg text-center">
              d_e2e = N * (L/R) + (N-1) * d_prop_per_link ... (forenklet)
            </div>
          </div>
        </Card>
      </Section>

      <Section title="6. Pakkeswitching vs kretsswitching — klassisk eksamenstemne">
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Egenskap</th>
                <th className="px-3 py-2 text-left text-green-700 dark:text-green-400">Pakkeswitching</th>
                <th className="px-3 py-2 text-left text-red-700 dark:text-red-400">Kretsswitching</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Ressursallokering", "Delt (statistisk multipleksing)", "Dedikert (reservert)"],
                ["Effektivitet", "Hoy (utnytter kapasitet bedre)", "Lav (sloser med stille perioder)"],
                ["Garanti", "Ingen QoS-garanti", "Garantert bandbredde"],
                ["Ko/forsinkelse", "Variabel (kolorsinkelse)", "Ingen ko (dedikert)"],
                ["Skalerbarhet", "God (stotter mange brukere)", "Darlig (begrenset av reservasjoner)"],
                ["Eksempel", "Internett", "Tradisjonelt telefonnett"],
              ].map(([egenskap, pakke, krets], i) => (
                <tr key={egenskap} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{egenskap}</td>
                  <td className="px-3 py-2 text-xs">{pakke}</td>
                  <td className="px-3 py-2 text-xs">{krets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Klassisk regneoppgave</h4>
          <div className="text-sm space-y-1">
            <p>En link pA 1 Mbps. 10 brukere, hver aktiv 10% av tiden, trenger 100 kbps nAr aktiv.</p>
            <p><strong>Kretsswitching:</strong> Kun 10 samtidige brukere (1Mbps / 100kbps = 10)</p>
            <p><strong>Pakkeswitching:</strong> Med 35 brukere er P(mer enn 10 aktive) &lt; 0.004 — nesten aldri problem!</p>
            <p className="text-[var(--muted)] mt-1">Pakkeswitching stotter 3.5x flere brukere med minimal risiko for overbelastning.</p>
          </div>
        </Card>
      </Section>
    </div>
  );
}
