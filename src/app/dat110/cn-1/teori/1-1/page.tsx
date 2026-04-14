"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function CN1_1Page() {
  const [showProtocolExample, setShowProtocolExample] = useState(false);
  const [showServiceExample, setShowServiceExample] = useState(false);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.1 Hva er internett?</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.1 Hva er internett?</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Internett kan beskrives fra to perspektiver: den tekniske nott-og-bolt-beskrivelsen
          (hva er det laget av?) og tjenesteperspektivet (hva gjor det for applikasjoner?).
          Begge er viktige for eksamen.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Forklare internett fra nott-og-bolt-perspektivet: hosts, pakkeswitcher, linker, ISPer",
            "Forklare tjenesteperspektivet: internett som API for distribuerte applikasjoner",
            "Definere hva en protokoll er og hva den spesifiserer",
            "Forklare hvorfor standarder er viktig (IETF, IEEE, RFC)",
            "Kjenne til de ulike nettverkstypene i ISP-hierarkiet",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nott og bolt */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Nott-og-bolt-perspektivet
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Tenk pa internett som et enormt sett med fysiske komponenter koblet sammen.
          Dette perspektivet svarer pa: <em>hva er internett faktisk laget av?</em>
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              tittel: "Hosts (endesystemer)",
              farge: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
              tittelfarge: "text-blue-700 dark:text-blue-400",
              innhold: [
                "PCer, mobiltelefoner, servere, nettbrett, IoT-enheter (termostater, biler, osv.)",
                "Kj\u00f8rer nettverksapplikasjoner ved kanten av internett (nettverkskanten)",
                "Produserer og konsumerer data \u2014 de er de egentlige brukerne av nettverket",
                "Kalt 'endesystemer' fordi de sitter i kantene av nettverket, ikke i midten",
              ],
            },
            {
              tittel: "Pakkesvitsjere (pakkeswitcher)",
              farge: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
              tittelfarge: "text-green-700 dark:text-green-400",
              innhold: [
                "Rutere (routers): videresender pakker mellom nettverk (lag 3)",
                "Link-layer-svitsjer (switches): kobler enheter innenfor et nettverk (lag 2)",
                "Bruker videresendingstabeller (routing/forwarding tables) for a bestemme veien",
                "Implementerer store-and-forward: pakken ma mottas i sin helhet f\u00f8r den sendes videre",
              ],
            },
            {
              tittel: "Kommunikasjonslinker",
              farge: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
              tittelfarge: "text-purple-700 dark:text-purple-400",
              innhold: [
                "Fiber (optisk): sv\u00e6rt hoy hastighet, typisk i ryggraden av internett",
                "Kobberkabel (twisted pair, koaks): i hjemmet og kontorer",
                "Radiob\u00f8lger: WiFi, 4G/5G, satellitt",
                "\u00d8verforing shastighet = b\u00e5ndbredde, m\u00e5les i bits per sekund (bps/Mbps/Gbps)",
              ],
            },
            {
              tittel: "ISPer og nettverk",
              farge: "border-orange-400/60 bg-orange-50 dark:bg-orange-950/20",
              tittelfarge: "text-orange-700 dark:text-orange-400",
              innhold: [
                "ISP = Internet Service Provider (f.eks. Telenor, Altibox)",
                "Hierarki: Tier-1 (globale ryggrads-ISPer) > regionale ISPer > aksess-ISPer",
                "Internett = nettverk av nettverk, sammenkoblet via ISP-hierarkiet",
                "Innholdsleverandorer (Google, Netflix) har egne private nettverk",
              ],
            },
          ].map((kort) => (
            <div key={kort.tittel} className={`rounded-xl border-2 p-4 ${kort.farge}`}>
              <h3 className={`font-bold mb-2 ${kort.tittelfarge}`}>{kort.tittel}</h3>
              <ul className="space-y-1">
                {kort.innhold.map((punkt) => (
                  <li key={punkt} className="text-sm flex items-start gap-2">
                    <span className="shrink-0 mt-1">&#8226;</span>
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ISP hierarki diagram */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h3 className="font-bold mb-3 text-sm">ISP-hierarkiet (forenklet)</h3>
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 px-6 py-2 font-bold text-orange-800 dark:text-orange-300">
              Tier-1 ISPer (globale ryggrader: AT&amp;T, NTT)
            </div>
            <div className="text-[var(--muted)] text-xs">&#8597; peering / transit</div>
            <div className="flex gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 px-4 py-2 text-blue-800 dark:text-blue-300">
                Regional ISP
              </div>
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 px-4 py-2 text-blue-800 dark:text-blue-300">
                Innholdsleverantor (Google, Netflix)
              </div>
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 px-4 py-2 text-blue-800 dark:text-blue-300">
                Regional ISP
              </div>
            </div>
            <div className="text-[var(--muted)] text-xs">&#8597; tilkobling</div>
            <div className="flex gap-3">
              {["Aksess-ISP 1", "Aksess-ISP 2", "Aksess-ISP 3", "IXP"].map((n) => (
                <div key={n} className="rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 px-3 py-1.5 text-xs text-green-800 dark:text-green-300">
                  {n}
                </div>
              ))}
            </div>
            <div className="text-[var(--muted)] text-xs">&#8597;</div>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs text-gray-700 dark:text-gray-300">
              Sluttbrukere: hjem, bedrift, mobil
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3">
            IXP = Internet Exchange Point. Et noytralt punkt der ISPer kobler seg direkte til hverandre
            for a sende trafikk uten a gA gjennom en tredje ISP. Bergen har <strong>NIX</strong> (Norwegian Internet Exchange).
          </p>
        </div>
      </section>

      {/* Tjenesteperspektivet */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Tjenesteperspektivet
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Fra applikasjonsutviklerens perspektiv er internett en <strong>infrastruktur som leverer tjenester
          til applikasjoner</strong>. Dette perspektivet svarer pa: <em>hva kan internett gj\u00f8re for meg?</em>
        </p>

        <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4">
          <h3 className="font-bold text-network-600 dark:text-network-400 mb-3">
            Internett som applikasjons-API
          </h3>
          <div className="text-sm space-y-3">
            <p>
              Distribuerte applikasjoner (web, e-post, video, IoT, sosiale medier) kj\u00f8rer pa
              <strong> endesystemer</strong> og kommuniserer med hverandre via internett.
              Internett gir disse applikasjonene et <strong>socket-API</strong> &mdash; et
              programmeringsgrensesnitt som lar applikasjoner sende og motta data.
            </p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs">
              <p className="text-green-600 dark:text-green-400">// Applikasjonsutvikler bruker socket-APIet:</p>
              <p>Socket s = new Socket("www.example.com", 80);</p>
              <p>s.send("GET / HTTP/1.1\r\nHost: www.example.com\r\n\r\n");</p>
              <p>String respons = s.receive();</p>
            </div>
            <p className="text-[var(--muted)]">
              Internett tilbyr to transporttjenester: <strong>pAlitelig</strong> (TCP &mdash; garantert
              levering, riktig rekkefolge) og <strong>upAlitelig</strong> (UDP &mdash; raskere, men ingen
              garanti). Applikasjonen velger selv hvilken den vil bruke.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowServiceExample(!showServiceExample)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Eksempel: HTTP-kommunikasjon mellom nettleser og server</span>
          <span>{showServiceExample ? "▲" : "▼"}</span>
        </button>
        {showServiceExample && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-2">
            <p><strong>Scenario:</strong> Du skriver inn www.example.com i nettleseren din.</p>
            <ol className="list-decimal list-inside space-y-1 text-[var(--muted)] ml-2">
              <li>Nettleseren (klient-app) lager en TCP-socket til port 80 pa serveren</li>
              <li>Sender en HTTP GET-foresp\u00f8rsel via socket-APIet</li>
              <li>Internett transporterer foresp\u00f8rselen fra din PC til webserveren</li>
              <li>Webserveren mottar foresp\u00f8rselen, finner siden, sender HTTP-svar</li>
              <li>Nettleseren din mottar HTML-koden og viser siden</li>
            </ol>
            <p className="text-[var(--muted)]">
              Applikasjonene (nettleser og webserver) trenger ikke vite <em>hvordan</em> pakkene
              reiser gjennom internett &mdash; det er internetts jobb. Det er nettopp derfor
              lagdelingen er s\u00e5 viktig!
            </p>
          </div>
        )}
      </section>

      {/* Protokoller */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Protokoller og standarder
        </h2>

        <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
          <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
            Hva er en protokoll?
          </h3>
          <p className="text-sm mb-3">
            En protokoll definerer <strong>reglene for kommunikasjon</strong> mellom nettverksenheter.
            Den spesifiserer:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { felt: "Meldingstyper", forklaring: "Hvilke typer meldinger som kan sendes (request, response, error)" },
              { felt: "Syntaks (format)", forklaring: "Strukturen og feltene i meldingene" },
              { felt: "Semantikk (mening)", forklaring: "Hva meldingsfeltene betyr" },
              { felt: "Prosesseringslogikk", forklaring: "NAt og i hvilken rekkef\u00f8lge meldinger sendes/behandles" },
            ].map(({ felt, forklaring }) => (
              <div key={felt} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-3">
                <p className="font-bold text-amber-700 dark:text-amber-400 text-xs">{felt}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{forklaring}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Standardiseringsorganer</h3>
          <div className="text-sm space-y-2">
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 dark:text-blue-400 shrink-0 w-16">IETF</span>
              <span>Internet Engineering Task Force &mdash; standardiserer internettprotokoller (TCP, IP, HTTP, DNS). Publiserer RFC-er (Request for Comments). HTTP er spesifisert i RFC 2616.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 dark:text-blue-400 shrink-0 w-16">IEEE</span>
              <span>Institute of Electrical and Electronics Engineers &mdash; standardiserer nettverksutstyr og link-layer-protokoller (802.3 Ethernet, 802.11 WiFi).</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 dark:text-blue-400 shrink-0 w-16">W3C</span>
              <span>World Wide Web Consortium &mdash; standardiserer webteknologier (HTML, CSS, HTTP/2).</span>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3">
            Apen standardisering er kritisk for interoperabilitet: et program skrevet i Java
            skal kunne snakke med et program skrevet i Python, pa en iPhone til en Android-telefon.
          </p>
        </div>

        <button
          onClick={() => setShowProtocolExample(!showProtocolExample)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Analogi: protokoll som menneskelig samtale</span>
          <span>{showProtocolExample ? "▲" : "▼"}</span>
        </button>
        {showProtocolExample && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-3">
            <p className="font-bold">Menneskelig protokoll vs. nettverksprotokoll:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-sm mb-1">Menneskelig protokoll:</p>
                <div className="space-y-1 text-xs text-[var(--muted)] font-mono">
                  <p>A: "Hei!"</p>
                  <p>B: "Hei!"</p>
                  <p>A: "Har du tid til overs?"</p>
                  <p>B: "Ja, hva vil du?"</p>
                  <p>A: "Kan du forklare TCP?"</p>
                  <p>B: "Ja, det handler om..."</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">HTTP-protokoll:</p>
                <div className="space-y-1 text-xs text-[var(--muted)] font-mono">
                  <p>Client: TCP SYN</p>
                  <p>Server: TCP SYN-ACK</p>
                  <p>Client: TCP ACK</p>
                  <p>Client: GET /index.html HTTP/1.1</p>
                  <p>Server: HTTP/1.1 200 OK</p>
                  <p>Server: &lt;data&gt;</p>
                </div>
              </div>
            </div>
            <p className="text-[var(--muted)] text-xs">
              Begge protokollene spesifiserer hvem som sender f\u00f8rst, hva som er gyldige svar,
              og hva man gj\u00f8r hvis noe gAr galt. Nettverksprotokoller er bare strengere og mer presise.
            </p>
          </div>
        )}
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Oppgave 1 (flervalg) kan sporre om hva trafikkintensitet mAler, hvilken tjeneste
          link-laget gir, eller hva transportlaget bruker for A identifisere endepunkter.
          Fra jan 2025: trafikkintensitet = forholdet mellom ankomstrate og sendekapasitet (La/R).
          Link-laget gir upAlit elig overf\u00f8ring av rammer over <em>en</em> link.
          Transportlaget bruker IP-adresse + portnummer.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          &larr; Oversikt
        </Link>
        <Link
          href="/dat110/cn-1/teori/1-2"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          1.2 Nettverkskanten &rarr;
        </Link>
      </div>
    </div>
  );
}
