"use client";

import Link from "next/link";

const tidslinje = [
  {
    ar: "1961–1972",
    tittel: "Pakkeswitching oppstAr",
    farge: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-300 dark:border-purple-700",
    hendelser: [
      "1961: Kleinrock viser at pakkeswitching er effektivt (koskingsteori)",
      "1964: Baran foreslAr pakkeswitchet nettverk for militaer kommunikasjon",
      "1967: ARPA (US Defense) planlegger ARPAnet",
      "1969: Forste ARPAnet-melding sendt mellom UCLA og Stanford. Systemet krasjet etter 'LO' (forsok pA 'LOGIN')",
      "1972: Forste offentlige demo av ARPAnet. NCP (Network Control Protocol) er forste host-to-host-protokoll",
    ],
  },
  {
    ar: "1972–1980",
    tittel: "Proprietary nettverk og internettarbeid",
    farge: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-300 dark:border-blue-700",
    hendelser: [
      "1972: E-post oppfunnet av Ray Tomlinson",
      "1973: Cerf og Kahn utvikler TCP/IP-protokollen (internetworking)",
      "1974: 'A Protocol for Packet Network Interconnection' publiseres (TCP/IP-bibelen)",
      "1979: ARPAnet har 200 noder",
      "Diverse proprietary nettverk: ALOHAnet, Telenet, Cyclades, SNA, DECnet",
    ],
  },
  {
    ar: "1980–1990",
    tittel: "Ny protokollstandard og vekst",
    farge: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-300 dark:border-green-700",
    hendelser: [
      "1983: TCP/IP erstatter NCP pA ARPAnet. 'Flag Day' - alle hopper over samtidig",
      "1983: DNS (Domain Name System) oppfunnet av Mockapetris",
      "1985: NSFnet etableres for A kople amerikansdke universiteter",
      "1988: TCP-kop-kontrollmekanismer lagt til etter Internets forste storkolaps",
      "Slutten av 80-tall: ~100 000 hosts pA internett",
    ],
  },
  {
    ar: "1990–2000",
    tittel: "Kommersialiseringen og WWW",
    farge: "bg-orange-500",
    lightBg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-300 dark:border-orange-700",
    hendelser: [
      "1991: Tim Berners-Lee ved CERN lager World Wide Web (HTML, HTTP, URL)",
      "1993: Mosaic-nettleseren (forste grafiske nettleser) utgis",
      "1994: Netscape Navigator lanseres. Netthandel begynner",
      "1995: NSFnet privatiseres. Internett Apnes for kommersiell bruk",
      "1996: ~40 millioner hosts. Internett-boomen er i gang",
      "1999: ~200 millioner brukere",
    ],
  },
  {
    ar: "2000–2010",
    tittel: "BredbAndseksplosjon og nye tjenester",
    farge: "bg-yellow-500",
    lightBg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-300 dark:border-yellow-700",
    hendelser: [
      "2000: Dot-com-boblen sprekker, men internett fortsetter A vokse",
      "2001: Wikipedia lanseres",
      "2004: Facebook, Gmail, VoIP-tjenester (Skype) masseutbredt",
      "2005: YouTube, Reddit, Ajax-teknologier",
      "2007: iPhone lanseres. Mobile internett vokser eksplosivt",
      "2008: Android lanseres. Google Chrome nettleser",
      "Rundt 2010: ~1 milliard internettbrukere",
    ],
  },
  {
    ar: "2010–2025",
    tittel: "Mobilt internett, sky og IoT",
    farge: "bg-red-500",
    lightBg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-300 dark:border-red-700",
    hendelser: [
      "2011: IPv4-adresser offisielt oppbrukt (IANA). IPv6-utrulling begynner",
      "2013: ~2,7 milliarder internettbrukere. Edward Snowden-avsloringene",
      "2016: ~3,5 milliarder brukere. IoT (Internet of Things) eksploderer",
      "2020: COVID-19 tvinger historisk vekst i videokonferanse (Zoom, Teams)",
      "2023: ChatGPT og AI-tjenester driver ny b\u00f8lge av internettbruk",
      "2025: ~5 milliarder+ brukere. 5G, edge computing, AI-infrastruktur",
    ],
  },
];

export default function CN1_7Page() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.7 Historikk</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.7 Internettets historie</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Fra et lite militaert forskningsprosjekt pA 1960-tallet til en global infrastruktur
          med 5 milliarder brukere. Historien er fascinerende og gir kontekst for
          hvorfor internett er designet slik det er i dag.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Vite at ARPAnet (1969) var forgjengeren til internett",
            "Vite at TCP/IP ble standardisert i 1983 ('flag day')",
            "Vite at World Wide Web ble skapt av Tim Berners-Lee i 1991",
            "Forklare overordnet utvikling: ARPA &rarr; kommersielt internett &rarr; mobilt &rarr; IoT",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Tidslinje */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Tidslinje: fra ARPAnet til i dag
        </h2>

        <div className="relative">
          {/* Vertikal linje */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[var(--card-border)]" />

          <div className="space-y-6">
            {tidslinje.map((periode) => (
              <div key={periode.ar} className="flex gap-4 sm:gap-6 relative">
                {/* Dot pA tidslinjen */}
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${periode.farge} flex items-center justify-center shrink-0 z-10 ring-4 ring-[var(--background)]`}>
                  <span className="text-white text-xs font-bold hidden sm:block">{periode.ar.split('–')[0].slice(-2)}</span>
                  <span className="text-white text-xs font-bold sm:hidden">&#9679;</span>
                </div>

                {/* Innhold */}
                <div className={`flex-1 rounded-xl border-2 p-4 ${periode.lightBg} ${periode.border} mb-2`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--muted)]">{periode.ar}</span>
                    <h3 className="font-bold text-sm">{periode.tittel}</h3>
                  </div>
                  <ul className="space-y-1">
                    {periode.hendelser.map((h) => (
                      <li key={h} className="text-xs text-[var(--muted)] flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">&#8226;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nokkelperoner */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Nokkelperoner
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { navn: "Leonard Kleinrock", bidrag: "Pakkeswitching-teori (1961). Professor ved UCLA. Sendte den forste ARPAnet-meldingen i 1969." },
            { navn: "Vint Cerf & Bob Kahn", bidrag: "Skapte TCP/IP-protokollen (1973). Kjent som 'grunnleggerne av internett'. Kahn var ved DARPA, Cerf ved Stanford." },
            { navn: "Tim Berners-Lee", bidrag: "Oppfant World Wide Web ved CERN i 1991. Skapte HTML, HTTP og URL. Ga bort alt gratis." },
          ].map(({ navn, bidrag }) => (
            <div key={navn} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm">
              <p className="font-bold text-network-600 dark:text-network-400">{navn}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{bidrag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Viktige designbeslutninger */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Viktige designbeslutninger og konsekvenser
        </h2>
        <div className="space-y-2 text-sm">
          {[
            {
              beslutning: "Beste-innsats (best-effort) levering",
              konsekvens: "Internett ble enkelt og skalerbart, men uten innebygde QoS-garantier. Apnet for mange applikasjoner men krevde at applikasjonene hAndterte feil selv (TCP).",
            },
            {
              beslutning: "Ingen innebygd sikkerhet i IP",
              konsekvens: "Rask utvikling men Apnet for DoS, spoofing og avlytting. Sikkerhet mAtte legges til som tillegg (TLS, HTTPS, VPN).",
            },
            {
              beslutning: "IPv4 med 32-bit adresser",
              konsekvens: "Maks ~4,3 milliarder unike adresser. Oppbrukt i 2011. Krever IPv6-overgAng (128-bit adresser) som fortsatt pAgAr.",
            },
            {
              beslutning: "Apne standarder via IETF",
              konsekvens: "Internett ble tilgjengelig for alle, ikke bAret av ett selskap. Fremmet innovasjon og global vekst.",
            },
          ].map(({ beslutning, konsekvens }) => (
            <div key={beslutning} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3">
              <p className="font-bold text-xs text-network-600 dark:text-network-400">Beslutning: {beslutning}</p>
              <p className="text-xs text-[var(--muted)] mt-1"><strong>Konsekvens:</strong> {konsekvens}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Warriors of the Net */}
      <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 text-sm">
        <h3 className="font-bold text-network-600 dark:text-network-400 mb-2">
          Anbefalt ressurs: "Warriors of the Net"
        </h3>
        <p className="text-[var(--muted)]">
          Professoren anbefaler denne korte animasjonsfilmen (11 min) som illustrerer
          TCP/IP-internetworking-konsepter pA en morsom mAte. Se den pA YouTube:
          <strong> "Warriors of the Net"</strong> (Telia 1999). En klassiker i nettverksfaget.
        </p>
        <p className="text-xs text-[var(--muted)] mt-2">
          youtu.be/PBWhzz_Gn10
        </p>
      </div>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Historikk er sjelden direkte eksamenstema i oppgave 3, men flervalg kan sporre om
          ARPAnet, TCP/IP-standardiseringen, eller IPv4-utmattingen.
          Prioriter forsinkelsesberegning (1.4) og protokolllag (1.5) foran historikk.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori/1-6"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          &larr; 1.6 Angrep pA nettverk
        </Link>
        <Link
          href="/dat110/cn-1/teori"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          Tilbake til oversikt &rarr;
        </Link>
      </div>
    </div>
  );
}
