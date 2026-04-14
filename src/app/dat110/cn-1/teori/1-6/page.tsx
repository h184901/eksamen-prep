"use client";

import { useState } from "react";
import Link from "next/link";

export default function CN1_6Page() {
  const [activeAngrep, setActiveAngrep] = useState<string | null>(null);

  const angrep = [
    {
      id: "malware",
      navn: "Malware (skadelig programvare)",
      type: "Kompromittering",
      farge: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
      tfarge: "text-red-700 dark:text-red-400",
      kortbeskrivelse: "Virus, ormer, ransomware, spyware som infiserer enheter.",
      detaljer: `Malware er programvare designet for A skade, stjele data eller ta kontroll over en maskin.

Typer:
- Virus: krevet menneskelig interaksjon for A spre seg (e-postvedlegg, USB)
- Orm (worm): sprer seg automatisk over nettverk uten brukerinteraksjon
- Trojan: ser ut som legitim programvare men skjuler skadelig kode
- Ransomware: krypterer filer og krever betaling for A gjenopprette dem
- Spyware/botnet: overvAker eller kontrollerer enheten eksternt

Forsvar: antivirusprogramvare, brannmurer, oppdaterte systemer, brukeropplaering.`,
    },
    {
      id: "dos",
      navn: "DoS og DDoS-angrep",
      type: "Tilgjengelighetssabotasje",
      farge: "border-orange-400/60 bg-orange-50 dark:bg-orange-950/20",
      tfarge: "text-orange-700 dark:text-orange-400",
      kortbeskrivelse: "Overvelmer tjenester med trafikk sA legitime brukere ikke kommer inn.",
      detaljer: `DoS (Denial of Service) = ett angrepspunkt sender enorme mengder trafikk for A overbelaste et mAl.

DDoS (Distributed DoS) = tusenvis av infiserte maskiner (botnet) koordinerer angrep mot ett mAl.

Typer:
- Bandwidth flooding: sender sA mye trafikk at linken til mAlet mettes
- Connection flooding: fyller opp TCP-tilkoblingstabellen med halvferdige forbindelser (SYN flood)
- Application-layer attacks: sender gyldige foresp\u00f8rsler som er dyre A behandle

Forsvar: trafikkfiltrering, rate limiting, CDN, anycast routing.

Internett gir INGEN innebygd forsvar mot DoS. IP spesifiserer beste-innsats og har ingen autentisering.`,
    },
    {
      id: "sniff",
      navn: "Pakkebrylning (Packet Sniffing)",
      type: "Avlytting",
      farge: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
      tfarge: "text-blue-700 dark:text-blue-400",
      kortbeskrivelse: "Passiv avlytting av nettverkstrafikk pA delt medium.",
      detaljer: `En pakkebrylner (sniffer) fanger opp og leser alle pakker som passerer et nettverkspunkt.

Mulig fordi:
- WiFi og Ethernet (i eldre huber) er delt medium: alle enheter ser all trafikk
- Wireshark er et populaert (legitimt) verktoy for nettverksanalyse og feilsoking

Risiko:
- Ukrypterte protokoller (HTTP, Telnet, FTP) sender passord i klartekst
- En angriper i samme WiFi-nettverk kan lese all ukryptert trafikk

Forsvar:
- Bruk kryptering: HTTPS, TLS, SSH, VPN
- Svitsjer (i stedet for huber) begrenser trafikken til riktig port
- WPA3-kryptering for WiFi`,
    },
    {
      id: "spoof",
      navn: "IP Spoofing",
      type: "Identitetsforfalskelse",
      farge: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
      tfarge: "text-purple-700 dark:text-purple-400",
      kortbeskrivelse: "Sender pakker med forfalsket kilde-IP-adresse.",
      detaljer: `IP Spoofing = en angriper sender pakker der kilde-IP-adressen er byttet ut med en annen adresse.

Mulig fordi:
- IP-protokollen har ingen autentiseringsmekanisme for kildeadressen
- Hvem som helst kan konstruere en IP-pakke med vilkArlig kildeadresse

Bruksomrader:
- DoS-amplifikasjon: send foresp\u00f8rsler med offer-IP som kilde, svar sendes til offeret
- Blind spoofing: omgA IP-baserte tilgangskontroller
- Refleksjonsangrep: bruk internettservere som forsterker angrepsvolum

Forsvar:
- Ingress filtering: ISPer bor blokkere pakker med umulige kildeadresser
- Autentisering pA hoyere lag (TCP syn-cookies, TLS)`,
    },
    {
      id: "mitm",
      navn: "Man-in-the-Middle (MitM)",
      type: "Mellommann-angrep",
      farge: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
      tfarge: "text-green-700 dark:text-green-400",
      kortbeskrivelse: "Angriper plasserer seg mellom to kommuniserende parter.",
      detaljer: `En MitM-angriper avlytter og potensielt modifiserer trafikk mellom to parter.

Teknikker:
- ARP-forgiftning: lokalt nett, angriper sender falske ARP-svar
- DNS-forgiftning: omdirigerer ofre til falske nettsider
- SSL-stripping: nedgraderer HTTPS til HTTP

Forsvar:
- TLS/SSL med sertifikatverifisering
- HSTS (HTTP Strict Transport Security)
- VPN i upAlitige nettverk (offentlig WiFi)`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.6 Angrep pA nettverk</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.6 Angrep pA nettverk</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Internett ble designet uten sikkerhet som grunnleggende krav &mdash; det var et
          liten, tillitsbasert forskningsmiljo. I dag er sikkerhet et kritisk tema.
          Dette delkapittelet gir en oversikt over de viktigste angrepstypene.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Forklare hva malware er og de ulike typene (virus, orm, ransomware)",
            "Forklare DoS og DDoS og hvorfor de er mulige",
            "Forklare pakkebrylning og hvorfor kryptering er nodvendig",
            "Forklare IP spoofing og hvorfor IP ikke er autentisert",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Grunnleggende utfordring */}
      <div className="rounded-xl border-2 border-red-400/60 bg-red-50 dark:bg-red-950/20 p-4 text-sm space-y-2">
        <h3 className="font-bold text-red-700 dark:text-red-400">Grunnleggende sikkerhetstemaer</h3>
        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          {[
            { tema: "Konfidensialitet", forklaring: "Kun avsender og mottaker skal lese dataen. Losning: kryptering (TLS, VPN)." },
            { tema: "Integritet", forklaring: "Data skal ikke kunne endres under transport. Losning: digital signatur, MAC." },
            { tema: "Tilgjengelighet", forklaring: "Tjenester skal vare tilgjengelige. Trussel: DoS/DDoS." },
          ].map(({ tema, forklaring }) => (
            <div key={tema} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
              <p className="font-bold text-xs text-red-700 dark:text-red-400">{tema}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{forklaring}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">
          Internett ble opprinnelig designet uten disse kravene. Sikkerhet er retroaktivt lagt til
          pA hoyre lag (TLS, HTTPS, VPN) &mdash; ikke innebygd i IP-protokollen.
        </p>
      </div>

      {/* Angrepsoversikt */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Angrepsoversikt
        </h2>
        <p className="text-sm text-[var(--muted)]">Klikk pA et angrep for A se detaljer.</p>

        {angrep.map((a) => (
          <div key={a.id}>
            <button
              onClick={() => setActiveAngrep(activeAngrep === a.id ? null : a.id)}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all ${a.farge} ${activeAngrep === a.id ? "ring-2 ring-network-400" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold ${a.tfarge}`}>{a.navn}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/60 dark:bg-neutral-900/40 text-[var(--muted)]">{a.type}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-1">{a.kortbeskrivelse}</p>
                </div>
                <span className="text-xs text-[var(--muted)] shrink-0 ml-2">{activeAngrep === a.id ? "▲" : "▼"}</span>
              </div>
            </button>
            {activeAngrep === a.id && (
              <div className="mt-1 rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)] whitespace-pre-wrap leading-relaxed">
                {a.detaljer}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Sikkerhet i CN-1 er vanligvis bare flervalg (oppgave 1). Typiske sp\u00f8rsmAl:
          hva er en orm (sprer seg automatisk), hva beskytter mot pakkebrylning (kryptering),
          hva er IP spoofing (forfalsket kilde-IP). Sikkerhetsemnet dekkes mer grundig
          i CN kapittel 8 (ikke del av dette kurset).
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori/1-5"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          &larr; 1.5 Protokolllag
        </Link>
        <Link
          href="/dat110/cn-1/teori/1-7"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          1.7 Historikk &rarr;
        </Link>
      </div>
    </div>
  );
}
