export interface DAT110Chapter {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: "cn" | "ds";
  bookRef: string;
  examWeight?: string;
  sectionCount?: number;
}

export const SECTIONS_PER_CHAPTER = 4;

export const dat110Chapters: DAT110Chapter[] = [
  // ── CN: Computer Networking ──
  {
    id: 1,
    slug: "cn-1",
    title: "Nettverksintroduksjon og metrikker",
    description:
      "Internett-arkitektur, protokollstakken, forsinkelser, gjennomstrømning og trafikkintensitet",
    category: "cn",
    bookRef: "CN 1.1–1.7",
    examWeight: "Oppg 3–4 (~20%)",
    sectionCount: 4,
  },
  {
    id: 2,
    slug: "cn-2",
    title: "Applikasjonslaget",
    description:
      "HTTP, DNS, FTP, SMTP, sockets, klient-server vs P2P og webteknologi",
    category: "cn",
    bookRef: "CN 2.1–2.7",
    examWeight: "Oppg 3–4 (~20%)",
    sectionCount: 4,
  },
  {
    id: 3,
    slug: "cn-3",
    title: "Transportlaget",
    description:
      "UDP, TCP, pålitelig dataoverføring, flytkontroll, metningskontroll og 3-veis handshake",
    category: "cn",
    bookRef: "CN 3.1–3.5",
    examWeight: "Oppg 3–4 (~20%)",
    sectionCount: 4,
  },
  {
    id: 4,
    slug: "cn-4",
    title: "Nettverkslaget",
    description:
      "IPv4-datagram, CIDR, longest-prefix match, NAT, avstandsvektor og link-state ruting",
    category: "cn",
    bookRef: "CN 4–5",
    examWeight: "Oppg 5–6 (~20%)",
    sectionCount: 4,
  },
  {
    id: 5,
    slug: "cn-6",
    title: "Linklaget",
    description:
      "MAC-adresser, ARP, Ethernet, switch-læringsalgoritme og DHCP",
    category: "cn",
    bookRef: "CN 6.1–6.8",
    examWeight: "Oppg 5–6 (~20%)",
    sectionCount: 4,
  },
  {
    id: 6,
    slug: "cn-8",
    title: "Sikkerhet",
    description:
      "Kryptering, integritet, autentisering, digitale signaturer og nettverkssikkerhet",
    category: "cn",
    bookRef: "CN 8 + DS 9",
    examWeight: "Oppg 1 (flervalg)",
    sectionCount: 4,
  },

  // ── DS: Distributed Systems ──
  {
    id: 7,
    slug: "ds-1",
    title: "Introduksjon til distribuerte systemer",
    description:
      "Definisjoner, transparens, skalerbarhet, arkitekturtyper og design-mål",
    category: "ds",
    bookRef: "DS 1",
    examWeight: "Oppg 1 (flervalg)",
    sectionCount: 4,
  },
  {
    id: 8,
    slug: "ds-3",
    title: "Prosesser og tråder",
    description:
      "Prosesser vs tråder, virtualisering, klient/server-design og kode-migrasjon",
    category: "ds",
    bookRef: "DS 3",
    examWeight: "Oppg 7–8 (~15%)",
    sectionCount: 4,
  },
  {
    id: 9,
    slug: "ds-4",
    title: "Kommunikasjon: RPC og MQTT",
    description:
      "Remote Procedure Call, MQTT og QoS, publish-subscribe, overlay-nettverk og RDP",
    category: "ds",
    bookRef: "DS 4",
    examWeight: "Oppg 7–8 (~15%)",
    sectionCount: 4,
  },
  {
    id: 10,
    slug: "ds-5",
    title: "Koordinering",
    description:
      "Logiske klokker, Lamport-klokker, vektorklokker, mutex-algoritmer og ledervalg",
    category: "ds",
    bookRef: "DS 5",
    examWeight: "Oppg 9 (~10%)",
    sectionCount: 4,
  },
  {
    id: 11,
    slug: "ds-6",
    title: "Navngiving og Chord DHT",
    description:
      "Flat navngiving, DHT, Chord-ring, fingertabeller, nøkkelansvar og O(log N) oppslag",
    category: "ds",
    bookRef: "DS 6",
    examWeight: "Oppg 10 (~15%)",
    sectionCount: 4,
  },
  {
    id: 12,
    slug: "ds-7",
    title: "Konsistens og replikering",
    description:
      "Data-sentrerte og klient-sentrerte konsistensmodeller, primary-based og quorum-replikering",
    category: "ds",
    bookRef: "DS 7",
    examWeight: "Oppg 9 (~10%)",
    sectionCount: 4,
  },
  {
    id: 13,
    slug: "ds-8",
    title: "Feiltoleranse",
    description:
      "Byzantine-feil, 3k+1-regelen, RPC-feilklasser, flat vs hierarkisk gruppe og pålitelighet",
    category: "ds",
    bookRef: "DS 8",
    examWeight: "Oppg 9 (~10%)",
    sectionCount: 4,
  },
];

export const categoryLabels: Record<DAT110Chapter["category"], string> = {
  cn: "Computer Networking",
  ds: "Distributed Systems",
};

export const categoryDescriptions: Record<DAT110Chapter["category"], string> = {
  cn: "Kurose & Ross: Internett-protokoller, lagmodellen, ruting, adressering og sikkerhet.",
  ds: "Van Steen & Tanenbaum: Distribuerte systemer, RPC, konsistens, Chord DHT og feiltoleranse.",
};

export const categoryChapterRange: Record<DAT110Chapter["category"], string> = {
  cn: "CN 1–8",
  ds: "DS 1–8",
};
