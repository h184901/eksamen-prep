"use client";

import Link from "next/link";
import { useState } from "react";

export default function CN6_1Page() {
  const [showNIC, setShowNIC] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.1 Introduksjon til linklaget</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">6.1 Introduksjon til linklaget</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Linklaget er det nederste programvare-laget i TCP/IP-stakken og er ansvarlig for overføring av rammer mellom to naboenheter på samme nettverk. Her lærer du hva linklaget gjør, hvilke tjenester det tilbyr, og hvem som implementerer det.
        </p>
      </div>

      {/* Protokollstakken — kontekst */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Linklaget i protokollstakken</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6">
          <p className="text-sm text-[var(--muted)] mb-4">
            TCP/IP-protokollstakken har fem lag. Linklaget (lag 2) sitter mellom nettverkslaget (IP) over og det fysiske laget under.
          </p>
          {/* Visuell stakk */}
          <div className="flex flex-col items-center gap-1 font-mono text-sm max-w-xs mx-auto">
            {[
              { lag: "5 — Applikasjonslag", farve: "bg-purple-500/20 border-purple-500/40", label: "HTTP, DNS, SMTP" },
              { lag: "4 — Transportlag", farve: "bg-blue-500/20 border-blue-500/40", label: "TCP, UDP" },
              { lag: "3 — Nettverkslag", farve: "bg-green-500/20 border-green-500/40", label: "IP, ICMP" },
              { lag: "2 — Linklaget ★", farve: "bg-amber-500/20 border-amber-500/40 ring-2 ring-amber-500/60", label: "Ethernet, WiFi" },
              { lag: "1 — Fysisk lag", farve: "bg-gray-500/20 border-gray-500/40", label: "Bits på kabelen" },
            ].map((l) => (
              <div key={l.lag} className={`w-full border rounded px-4 py-2 text-center ${l.farve}`}>
                <div className="font-semibold">{l.lag}</div>
                <div className="text-xs text-[var(--muted)]">{l.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)] mt-4 text-center">
            ★ = Vi er her i kapittel 6
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Analogien: Reise Bergen → Oslo</p>
          <p className="text-sm text-[var(--muted)]">
            Tenk på IP-laget som reiseplanen din (Oslo som destinasjon). Linklaget er som hvert enkelt transportmiddel på turen — buss til flyplassen, fly til Gardermoen, tog til Oslo S. Hver "lenke" er én etappe, og linklaget håndterer den etappen.
          </p>
        </div>
      </section>

      {/* Noder og linker */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Noder og lenker</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Noder (nodes)</h3>
            <p className="text-sm text-[var(--muted)]">
              En node er enhver enhet som kjører linklaget — det vil si verter (hosts) og rutere. En node har ett eller flere nettverksgrensesnitt (NIC).
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Lenker (links)</h3>
            <p className="text-sm text-[var(--muted)]">
              En lenke er kommunikasjonskanalen som kobler to naboenheter. Pakker kalles <strong>rammer (frames)</strong> på linklaget. En ramme innkapsler en IP-datagram.
            </p>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">To typer lenker</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-[var(--card-border)] rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Punkt-til-punkt (point-to-point)</h4>
              <p className="text-sm text-[var(--muted)]">Én sender, én mottaker. Eksempler: PPP (telefonlinje), dedikert Ethernet-kabel mellom to rutere.</p>
              <div className="mt-2 flex items-center gap-2 font-mono text-xs">
                <span className="bg-blue-500/20 px-2 py-1 rounded">A</span>
                <span>———</span>
                <span className="bg-blue-500/20 px-2 py-1 rounded">B</span>
              </div>
            </div>
            <div className="border border-[var(--card-border)] rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Kringkasting (broadcast)</h4>
              <p className="text-sm text-[var(--muted)]">Delt medium — mange sendere og mottakere på samme kanal. Eksempler: Ethernet LAN, WiFi. Krever MAC-protokoller!</p>
              <div className="mt-2 flex items-center gap-4 font-mono text-xs">
                <div className="flex flex-col gap-1">
                  <span className="bg-green-500/20 px-2 py-1 rounded">A</span>
                  <span className="bg-green-500/20 px-2 py-1 rounded">B</span>
                  <span className="bg-green-500/20 px-2 py-1 rounded">C</span>
                </div>
                <span>— delt kanal —</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tjenester linklaget tilbyr */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Tjenester linklaget tilbyr</h2>
        <p className="text-sm text-[var(--muted)]">
          Linklaget er ikke ett protokoll, men en familie av protokoller. Alle tilbyr noen av disse tjenestene:
        </p>
        <div className="space-y-3">
          {[
            {
              navn: "1. Innramming (Framing)",
              farge: "border-blue-500/40 bg-blue-500/5",
              tittel: "Pakker data inn i rammer",
              beskrivelse: "Linklaget pakker nettverks-datagrammet inn i en ramme (frame) ved å legge til header og trailer. Header inneholder typisk kilde- og destinasjons-MAC-adresser. Trailer inneholder CRC-sjekksummen for feildeteksjon.",
            },
            {
              navn: "2. Linkaksess (Link Access / MAC)",
              farge: "border-green-500/40 bg-green-500/5",
              tittel: "Hvem får sende og når?",
              beskrivelse: "Medium Access Control (MAC)-protokollen bestemmer hvem som får sende på den delte kanalen. For punkt-til-punkt-linker er dette enkelt. For kringkastingslinker (Ethernet/WiFi) trengs avanserte protokoller som CSMA/CD.",
            },
            {
              navn: "3. Pålitelig levering (Reliable Delivery)",
              farge: "border-amber-500/40 bg-amber-500/5",
              tittel: "Valgfri — bare på koblinger med høy feilrate",
              beskrivelse: "Noen linklaget-protokoller (f.eks. WiFi) tilbyr pålitelig levering mellom to naboenheter med ACK og retransmisjoner. Ethernet tilbyr IKKE pålitelig levering — den stoler på at kabelen er god nok. Pålitelighet over hele ruten håndteres av TCP.",
            },
            {
              navn: "4. Feildeteksjon og korreksjon",
              farge: "border-red-500/40 bg-red-500/5",
              tittel: "Oppdage og rette bitfeil",
              beskrivelse: "Mottakernoden sjekker om rammer er mottatt korrekt. Teknikker: paritetsbits (enkel), CRC (Cyclic Redundancy Check). Defekte rammer droppes stiltiende — IP/TCP forventer at dette kan skje.",
            },
          ].map((t) => (
            <div key={t.navn} className={`border rounded-xl p-5 ${t.farge}`}>
              <h3 className="font-bold text-sm mb-1">{t.navn}</h3>
              <p className="font-semibold text-base mb-1">{t.tittel}</p>
              <p className="text-sm text-[var(--muted)]">{t.beskrivelse}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NIC */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">NIC — Network Interface Card</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6">
          <p className="text-sm text-[var(--muted)] mb-4">
            Linklaget er implementert i <strong>NIC (Network Interface Card)</strong> — nettverkskortet. NIC-en er et chip på datamaskinen din som håndterer all linklaget-logikk i maskinvare og mikrokode.
          </p>
          <button
            onClick={() => setShowNIC(!showNIC)}
            className="text-sm text-[var(--accent)] hover:underline mb-4"
          >
            {showNIC ? "▲ Skjul detaljer" : "▼ Vis NIC-arkitektur"}
          </button>
          {showNIC && (
            <div className="space-y-3 border-t border-[var(--card-border)] pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Hva NIC-en gjør (avsender):</h4>
                  <ol className="text-sm text-[var(--muted)] space-y-1 list-decimal list-inside">
                    <li>Mottar datagram fra nettverkslaget (IP)</li>
                    <li>Lager en ramme (innramming)</li>
                    <li>Legger til feildeteksjonskode (CRC)</li>
                    <li>Sender bits på mediet</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Hva NIC-en gjør (mottaker):</h4>
                  <ol className="text-sm text-[var(--muted)] space-y-1 list-decimal list-inside">
                    <li>Mottar bits fra mediet</li>
                    <li>Sjekker CRC — forkast hvis feil</li>
                    <li>Ekstraherer datagrammet fra rammen</li>
                    <li>Sender datagrammet opp til IP-laget</li>
                  </ol>
                </div>
              </div>
              <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-3 mt-3">
                <p className="text-xs text-[var(--muted)]">
                  <strong>Viktig:</strong> Linklaget er delvis implementert i maskinvare (NIC) og delvis i programvare (enhetsdrivere i OS). Dette gjør det raskere enn lag 3 og 4 som kjører i software.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Hva du MÅ kunne til eksamen</h2>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
          <ul className="space-y-2 text-sm">
            {[
              "Hva linklaget generelt tilbyr: unreliable transmission of frames across ONE communication link (ikke multi-hop — det er IP sin jobb).",
              "De fire tjenestene: innramming, linkaksess (MAC), pålitelig levering, feildeteksjon.",
              "Forskjellen mellom punkt-til-punkt og kringkastingslenker.",
              "At NIC implementerer linklaget i maskinvare.",
              "At rammer innkapsler datagrammer (datagram er nettverkslaget, ramme er linklaget).",
              "At Ethernet IKKE tilbyr pålitelig levering — det gjør TCP på transportlaget.",
            ].map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">✓</span>
                <span className="text-[var(--muted)]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Vanlige feil studenter gjør</h2>
        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">Feil: "Linklaget sender pakker fra host til host"</p>
            <p className="text-sm text-[var(--muted)]">Riktig: Linklaget sender rammer mellom <strong>naboenheter</strong> (one hop). Multi-hop er nettverkslagets jobb. Quizspørsmål: "What service does the link-layer provide?" — Svar: Unreliable transmission of frames across ONE communication link.</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">Feil: Forveksle "pakke" og "ramme"</p>
            <p className="text-sm text-[var(--muted)]">Pakke (packet/datagram) er nettverkslaget. Ramme (frame) er linklaget. En ramme innkapsler en pakke.</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/cn-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          6.2 Feildeteksjon og korreksjon →
        </Link>
      </div>
    </div>
  );
}
