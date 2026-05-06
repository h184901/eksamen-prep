"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ============================================================
 *  Inline SVG-komponenter
 * ============================================================
 *  Alle diagrammer er rene SVG-komponenter — ingen avhengigheter.
 *  Designet for å være pedagogiske: fargekodet, beskrivende labels,
 *  fungerer i både lyst og mørkt tema.
 * ============================================================ */

/** Generisk 5-lags arkitektur for en webapplikasjon (Sommerville Figur 4.10) */
function FiveLayerArchitectureSVG() {
  const layers: { name: string; desc: string; fill: string; stroke: string }[] = [
    {
      name: "Brukergrensesnitt",
      desc: "Nettleser eller mobil-app — HTML, JavaScript",
      fill: "#dbeafe",
      stroke: "#3b82f6",
    },
    {
      name: "Autentisering og UI-håndtering",
      desc: "Innlogging, sesjon, sideoppbygging, skjemaer",
      fill: "#e9d5ff",
      stroke: "#a855f7",
    },
    {
      name: "Applikasjonsspesifikk funksjonalitet",
      desc: "«Forretningslogikken» — selve produktets særpreg",
      fill: "#fef3c7",
      stroke: "#f59e0b",
    },
    {
      name: "Felles delte tjenester",
      desc: "Logging, søk, e-post, varsling — gjenbrukt på tvers",
      fill: "#dcfce7",
      stroke: "#22c55e",
    },
    {
      name: "Database og transaksjonshåndtering",
      desc: "Persistering, ACID, gjenoppretting",
      fill: "#fee2e2",
      stroke: "#ef4444",
    },
  ];
  const w = 540;
  const h = 60;
  const gap = 8;
  return (
    <svg
      viewBox={`0 0 ${w} ${(h + gap) * layers.length}`}
      className="w-full h-auto max-w-3xl mx-auto"
      role="img"
      aria-label="Generisk 5-lags arkitektur for en webapplikasjon"
    >
      {layers.map((l, i) => (
        <g key={l.name} transform={`translate(0, ${i * (h + gap)})`}>
          <rect
            x={0}
            y={0}
            width={w}
            height={h}
            rx={8}
            fill={l.fill}
            stroke={l.stroke}
            strokeWidth={2}
          />
          <text
            x={16}
            y={26}
            fontSize={15}
            fontWeight="700"
            fill="#111827"
          >
            {`Lag ${i + 1}: ${l.name}`}
          </text>
          <text x={16} y={46} fontSize={12} fill="#374151">
            {l.desc}
          </text>
        </g>
      ))}
      {/* Pil som viser top-down kontrollflyt */}
      <g transform={`translate(${w - 30}, 10)`}>
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={(h + gap) * layers.length - 30}
          stroke="#6b7280"
          strokeWidth={2}
          markerEnd="url(#arrowDown)"
        />
        <text x={-6} y={-2} fontSize={10} fill="#6b7280" textAnchor="end">
          kontrollflyt
        </text>
      </g>
      <defs>
        <marker
          id="arrowDown"
          viewBox="0 0 10 10"
          refX={5}
          refY={5}
          markerWidth={6}
          markerHeight={6}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
        </marker>
      </defs>
    </svg>
  );
}

/** Klassisk klient-tjener med MVC (Sommerville Figur 4.12 + 4.13) */
function ClientServerMVCSVG() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="w-full h-auto max-w-3xl mx-auto"
      role="img"
      aria-label="Klient-tjener-arkitektur med MVC-mønster"
    >
      {/* Klienter */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(20, ${30 + i * 80})`}>
          <rect width={120} height={50} rx={8} fill="#dbeafe" stroke="#3b82f6" strokeWidth={2} />
          <text x={60} y={24} fontSize={13} textAnchor="middle" fontWeight="600" fill="#111827">
            {`Klient ${i + 1}`}
          </text>
          <text x={60} y={40} fontSize={11} textAnchor="middle" fill="#374151">
            (View + Controller)
          </text>
        </g>
      ))}

      {/* Lastbalanserer */}
      <g transform="translate(200, 130)">
        <rect width={100} height={60} rx={8} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
        <text x={50} y={28} fontSize={12} textAnchor="middle" fontWeight="600" fill="#111827">
          Lastbalanserer
        </text>
        <text x={50} y={44} fontSize={10} textAnchor="middle" fill="#374151">
          (Load balancer)
        </text>
      </g>

      {/* Server-sett */}
      <g transform="translate(370, 60)">
        <rect width={210} height={210} rx={10} fill="#f3f4f6" stroke="#6b7280" strokeWidth={2} strokeDasharray="4 3" />
        <text x={105} y={20} fontSize={12} textAnchor="middle" fontWeight="700" fill="#374151">
          Servere
        </text>

        {/* Modell-blokk */}
        <g transform="translate(20, 35)">
          <rect width={170} height={50} rx={6} fill="#dcfce7" stroke="#22c55e" strokeWidth={2} />
          <text x={85} y={22} fontSize={12} textAnchor="middle" fontWeight="600" fill="#111827">
            Model
          </text>
          <text x={85} y={38} fontSize={10} textAnchor="middle" fill="#374151">
            data + forretningslogikk
          </text>
        </g>

        {/* Pil ned */}
        <line x1={105} y1={88} x2={105} y2={108} stroke="#6b7280" strokeWidth={2} markerEnd="url(#arrow1)" />

        {/* DB */}
        <g transform="translate(40, 110)">
          <rect width={130} height={45} rx={6} fill="#fee2e2" stroke="#ef4444" strokeWidth={2} />
          <text x={65} y={20} fontSize={12} textAnchor="middle" fontWeight="600" fill="#111827">
            Database
          </text>
          <text x={65} y={35} fontSize={10} textAnchor="middle" fill="#374151">
            ACID, persistering
          </text>
        </g>

        {/* MVC info */}
        <text x={105} y={185} fontSize={10} textAnchor="middle" fill="#6b7280">
          MVC: Model på server,
        </text>
        <text x={105} y={198} fontSize={10} textAnchor="middle" fill="#6b7280">
          View og Controller på klient
        </text>
      </g>

      {/* Piler fra klienter til lastbalanserer */}
      {[55, 135, 215].map((y, i) => (
        <line
          key={i}
          x1={140}
          y1={y}
          x2={200}
          y2={160}
          stroke="#3b82f6"
          strokeWidth={1.5}
          markerEnd="url(#arrow1)"
        />
      ))}

      {/* Pil fra lastbalanserer til servere */}
      <line x1={300} y1={160} x2={370} y2={160} stroke="#f59e0b" strokeWidth={2} markerEnd="url(#arrow1)" />

      <defs>
        <marker id="arrow1" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
        </marker>
      </defs>
    </svg>
  );
}

/** Multi-tier-arkitektur (Sommerville Figur 4.14) */
function MultiTierSVG() {
  return (
    <svg
      viewBox="0 0 640 240"
      className="w-full h-auto max-w-3xl mx-auto"
      role="img"
      aria-label="Multi-tier klient-tjener-arkitektur"
    >
      {/* Klienter */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(20, ${30 + i * 60})`}>
          <ellipse cx={50} cy={20} rx={48} ry={18} fill="#dbeafe" stroke="#3b82f6" strokeWidth={2} />
          <text x={50} y={25} fontSize={12} textAnchor="middle" fontWeight="600" fill="#111827">
            {`Klient ${i + 1}`}
          </text>
        </g>
      ))}

      {/* Web-server */}
      <g transform="translate(180, 90)">
        <rect width={120} height={60} rx={8} fill="#e9d5ff" stroke="#a855f7" strokeWidth={2} />
        <text x={60} y={28} fontSize={13} textAnchor="middle" fontWeight="700" fill="#111827">
          Web-server
        </text>
        <text x={60} y={46} fontSize={10} textAnchor="middle" fill="#374151">
          HTTP, statiske sider
        </text>
      </g>

      {/* App-server */}
      <g transform="translate(340, 90)">
        <rect width={120} height={60} rx={8} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
        <text x={60} y={28} fontSize={13} textAnchor="middle" fontWeight="700" fill="#111827">
          App-server
        </text>
        <text x={60} y={46} fontSize={10} textAnchor="middle" fill="#374151">
          forretningslogikk
        </text>
      </g>

      {/* DB-server */}
      <g transform="translate(500, 90)">
        <rect width={120} height={60} rx={8} fill="#fee2e2" stroke="#ef4444" strokeWidth={2} />
        <text x={60} y={28} fontSize={13} textAnchor="middle" fontWeight="700" fill="#111827">
          DB-server
        </text>
        <text x={60} y={46} fontSize={10} textAnchor="middle" fill="#374151">
          persistering
        </text>
      </g>

      {/* Piler */}
      {[50, 110, 170].map((y) => (
        <line key={y} x1={120} y1={y} x2={180} y2={120} stroke="#6b7280" strokeWidth={1.5} markerEnd="url(#arrow2)" />
      ))}
      <line x1={300} y1={120} x2={340} y2={120} stroke="#6b7280" strokeWidth={2} markerEnd="url(#arrow2)" />
      <line x1={460} y1={120} x2={500} y2={120} stroke="#6b7280" strokeWidth={2} markerEnd="url(#arrow2)" />

      {/* Tier-labels */}
      <text x={60} y={210} fontSize={11} textAnchor="middle" fontWeight="600" fill="#6b7280">
        Presentasjons-tier
      </text>
      <text x={240} y={210} fontSize={11} textAnchor="middle" fontWeight="600" fill="#6b7280">
        Web-tier
      </text>
      <text x={400} y={210} fontSize={11} textAnchor="middle" fontWeight="600" fill="#6b7280">
        Logikk-tier
      </text>
      <text x={560} y={210} fontSize={11} textAnchor="middle" fontWeight="600" fill="#6b7280">
        Data-tier
      </text>

      <defs>
        <marker id="arrow2" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
        </marker>
      </defs>
    </svg>
  );
}

/** Tjenesteorientert / mikrotjeneste-arkitektur (Sommerville Figur 4.15) */
function MicroservicesSVG() {
  const services = ["Bruker", "Bestilling", "Betaling", "Katalog", "Varsling", "Søk"];
  return (
    <svg
      viewBox="0 0 640 320"
      className="w-full h-auto max-w-3xl mx-auto"
      role="img"
      aria-label="Mikrotjeneste-arkitektur med API-gateway"
    >
      {/* Klienter */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(20, ${50 + i * 70})`}>
          <ellipse cx={50} cy={20} rx={48} ry={18} fill="#dbeafe" stroke="#3b82f6" strokeWidth={2} />
          <text x={50} y={25} fontSize={12} textAnchor="middle" fontWeight="600" fill="#111827">
            {`Klient ${i + 1}`}
          </text>
        </g>
      ))}

      {/* API-gateway */}
      <g transform="translate(190, 130)">
        <rect width={120} height={60} rx={8} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
        <text x={60} y={28} fontSize={13} textAnchor="middle" fontWeight="700" fill="#111827">
          API-gateway
        </text>
        <text x={60} y={46} fontSize={10} textAnchor="middle" fill="#374151">
          ruting, auth
        </text>
      </g>

      {/* Tjenester */}
      {services.map((s, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 380 + col * 130;
        const y = 30 + row * 90;
        return (
          <g key={s} transform={`translate(${x}, ${y})`}>
            <rect width={110} height={70} rx={8} fill="#dcfce7" stroke="#22c55e" strokeWidth={2} />
            <text x={55} y={26} fontSize={12} textAnchor="middle" fontWeight="600" fill="#111827">
              {s}
            </text>
            <text x={55} y={42} fontSize={10} textAnchor="middle" fill="#374151">
              tjeneste
            </text>
            {/* Egen DB pr tjeneste */}
            <rect x={20} y={50} width={70} height={14} rx={3} fill="#fee2e2" stroke="#ef4444" strokeWidth={1} />
            <text x={55} y={60} fontSize={9} textAnchor="middle" fill="#111827">
              egen DB
            </text>
          </g>
        );
      })}

      {/* Piler klient → gateway */}
      {[70, 140, 210].map((y) => (
        <line key={y} x1={120} y1={y} x2={190} y2={160} stroke="#6b7280" strokeWidth={1.5} markerEnd="url(#arrow3)" />
      ))}

      {/* Piler gateway → tjenester */}
      {services.map((_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const tx = 380 + col * 130;
        const ty = 30 + row * 90 + 35;
        return (
          <line
            key={i}
            x1={310}
            y1={160}
            x2={tx}
            y2={ty}
            stroke="#a855f7"
            strokeWidth={1.2}
            markerEnd="url(#arrow3)"
          />
        );
      })}

      <defs>
        <marker id="arrow3" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
        </marker>
      </defs>
    </svg>
  );
}

/** Trade-off-stjerne — viser at du ikke kan maksimere alle attributter samtidig */
function TradeoffStarSVG() {
  const attrs = [
    { label: "Sikkerhet", angle: -90 },
    { label: "Ytelse", angle: -30 },
    { label: "Tilgjengelighet", angle: 30 },
    { label: "Vedlikeholdbarhet", angle: 90 },
    { label: "Brukbarhet", angle: 150 },
    { label: "Pålitelighet", angle: 210 },
  ];
  const cx = 200;
  const cy = 180;
  const r = 110;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const points = attrs
    .map((a) => {
      const x = cx + r * Math.cos(toRad(a.angle));
      const y = cy + r * Math.sin(toRad(a.angle));
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      viewBox="0 0 400 360"
      className="w-full h-auto max-w-md mx-auto"
      role="img"
      aria-label="Trade-off-stjerne — kvalitetsattributter trekker i ulike retninger"
    >
      {/* Bakgrunns-sirkler */}
      {[0.33, 0.66, 1].map((f) => (
        <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="#e5e7eb" strokeWidth={1} />
      ))}
      {/* Akser */}
      {attrs.map((a) => {
        const x = cx + r * Math.cos(toRad(a.angle));
        const y = cy + r * Math.sin(toRad(a.angle));
        return (
          <line key={a.label} x1={cx} y1={cy} x2={x} y2={y} stroke="#d1d5db" strokeWidth={1} />
        );
      })}
      {/* Eksempel-polygon */}
      <polygon points={points} fill="#a855f7" fillOpacity={0.18} stroke="#a855f7" strokeWidth={2} />
      {/* Labels */}
      {attrs.map((a) => {
        const x = cx + (r + 30) * Math.cos(toRad(a.angle));
        const y = cy + (r + 30) * Math.sin(toRad(a.angle));
        return (
          <text
            key={a.label}
            x={x}
            y={y}
            fontSize={12}
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#374151"
          >
            {a.label}
          </text>
        );
      })}
      <text x={cx} y={cy + 4} fontSize={10} textAnchor="middle" fill="#6b7280">
        balansér
      </text>
    </svg>
  );
}

/* ============================================================
 *  Hovedkomponent
 * ============================================================ */

export default function ArkitekturPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/utviklingsmetode" className="hover:text-[var(--accent)]">Utviklingsmetode</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Arkitektur</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 mb-2 inline-block">
          NY · Sommerville kap 4
        </span>
        <h1 className="text-3xl font-bold mb-2">Software arkitektur</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Hvordan organiseringen av et programvareprodukt avgjør om det blir
          påliteligt, sikkert, raskt og lett å vedlikeholde — eller om det dør i
          møte med virkeligheten. Bygget på Sommervilles{" "}
          <em>Engineering Software Products</em>, kapittel 4.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  1. Hva er software arkitektur?                              */}
      {/* ============================================================ */}
      <section id="hva-er" className="scroll-mt-32">
        <TheorySummary
          title="1 · Hva er software arkitektur — og hvorfor er det viktig?"
          mustKnow={[
            "IEEE-definisjonen: «Architecture is the fundamental organization of a software system embodied in its components, their relationships to each other and to the environment, and the principles guiding its design and evolution.»",
            "Arkitekturen avgjør de IKKE-funksjonelle egenskapene: ytelse, sikkerhet, tilgjengelighet, vedlikeholdbarhet.",
            "Et produkt med flotte funksjoner men dårlig arkitektur feiler — fordi brukerne dømmer på pålitelighet og responsivitet, ikke funksjonsliste.",
            "Smidig betyr IKKE «ingen arkitektur». Tidlig arkitekturdesign er forenlig med Scrum (gjerne en egen sprint).",
          ]}
        >
          <p>
            Sommerville bruker den offisielle <strong>IEEE-definisjonen</strong> (standard
            1471) av software arkitektur, og den er verdt å lære utenat:
          </p>

          <blockquote className="border-l-4 border-sysdev-500 pl-4 my-4 italic text-[var(--foreground)] bg-sysdev-50 dark:bg-sysdev-950/30 py-3 rounded-r">
            «Architecture is the fundamental organization of a software system
            embodied in its components, their relationships to each other and to
            the environment, and the principles guiding its design and
            evolution.»
            <br />
            <span className="not-italic text-xs text-[var(--muted)] block mt-2">
              — IEEE 1471, sitert i Sommerville s. 93
            </span>
          </blockquote>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvorfor MÅ vi tenke arkitektur?</h3>
          <p>
            En prototype trenger ikke god arkitektur — målet er bare å validere
            ideen. Men når du skal bygge et <strong>ekte produkt</strong>, dukker det
            opp en serie egenskaper som <em>ikke</em> kan «klistres på» etterpå:
            sikkerhet, ytelse, vedlikeholdbarhet, tilgjengelighet. Disse kalles
            <strong> ikke-funksjonelle krav</strong> (NFR — non-functional
            requirements), og det er <strong>arkitekturen som avgjør om de innfris</strong>.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Den store sammenhengen — bygg ↔ bro</p>
            <p className="text-sm">
              En bro kan ha vakkert design, men hvis fundamentet er dårlig
              kollapser den. Software-arkitektur er fundamentet. Brukerne ser bare
              «brua» (funksjonene), men det er <em>fundamentet</em> som bestemmer om
              produktet står når det blir trykk på det. Et hvilket som helst antall
              fancy features kan ikke redde et produkt som krasjer hver dag.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">«Ingen arkitektur» er en myte</h3>
          <p>
            Tidlige smidige slagord som <em>YAGNI</em> («You Ain&apos;t Gonna Need
            It») og kritikken av <em>BDUF</em> («Big Design Up Front») fikk noen til
            å tro at smidige team ikke skal designe arkitektur. Sommerville er klar:
            det er feil tolkning. Smidige metoder anbefaler at planlegging skal være
            <strong> minimal, ikke fraværende</strong>. Et team kan godt bruke en hel
            Scrum-sprint på arkitekturdesign — leveransen er en uformell
            arkitekturbeskrivelse som hele teamet forstår.
          </p>

          <p className="text-sm text-[var(--muted)] mt-3">
            Sommerville understreker at hele teamet bør være involvert i arkitekturdesign.
            En enslig &laquo;arkitekt&raquo; gir effektiv design, men teamet forstår ikke
            beslutningene — og nye medlemmer mister mulighet til å bringe inn ny teknologi.
          </p>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  2. Quality attributes                                       */}
      {/* ============================================================ */}
      <section id="quality-attributes" className="scroll-mt-32">
        <TheorySummary
          title="2 · Quality attributes — kvalitetsattributter"
          mustKnow={[
            "De sju attributtene fra Sommerville Tabell 4.2: responsiveness, reliability, availability, security, usability, maintainability, resilience.",
            "Availability måles i prosent oppetid (99,9 % = ~86 sek nedetid per dag).",
            "Maintainability oppnås ved finkornede komponenter — men det går ut over ytelse.",
            "Det er UMULIG å maksimere alle samtidig — du må gjøre trade-offs.",
          ]}
        >
          <p>
            Sommerville samler de viktige <strong>ikke-funksjonelle egenskapene</strong> i
            sju attributter (Tabell 4.2 på s. 95). Lær både norsk navn og det engelske
            begrepet — eksamen kan bruke begge.
          </p>

          {/* Tabell over attributter */}
          <div className="my-5 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sysdev-100 dark:bg-sysdev-900/30">
                  <th className="text-left p-2 border border-[var(--card-border)]">Attributt</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Sentralt spørsmål</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Hvordan oppnås?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    no: "Responsivitet",
                    en: "Responsiveness",
                    q: "Returnerer systemet svar innen rimelig tid?",
                    how: "Caching, lokal validering, minimere antall nettverkskall",
                  },
                  {
                    no: "Pålitelighet",
                    en: "Reliability",
                    q: "Oppfører systemet seg som forventet for både utviklere og brukere?",
                    how: "Testing, defensiv programmering, redundans",
                  },
                  {
                    no: "Tilgjengelighet",
                    en: "Availability",
                    q: "Kan systemet levere tjenestene sine når brukeren ber om dem?",
                    how: "Redundante komponenter, sensor + bryter, lastbalansering",
                  },
                  {
                    no: "Sikkerhet",
                    en: "Security",
                    q: "Beskyttes systemet og brukerdataene mot uautoriserte angrep?",
                    how: "Lagdelt forsvar (auth, kryptering), input-validering",
                  },
                  {
                    no: "Brukbarhet",
                    en: "Usability",
                    q: "Får brukerne tilgang til funksjonene raskt og uten feil?",
                    how: "God UX-design, færre sikkerhetsbarrierer, hjelpefunksjoner",
                  },
                  {
                    no: "Vedlikeholdbarhet",
                    en: "Maintainability",
                    q: "Kan systemet enkelt oppdateres og utvides uten store kostnader?",
                    how: "Finkornede, uavhengige komponenter; stabile grensesnitt",
                  },
                  {
                    no: "Motstandskraft",
                    en: "Resilience",
                    q: "Fortsetter systemet å levere tjenester ved delvis feil eller angrep?",
                    how: "Failover, sirkelbrytere, distribuert lagring",
                  },
                ].map((row) => (
                  <tr key={row.no} className="hover:bg-[var(--card)]">
                    <td className="p-2 border border-[var(--card-border)] align-top">
                      <strong className="text-sysdev-700 dark:text-sysdev-400">{row.no}</strong>
                      <br />
                      <span className="text-xs text-[var(--muted)]">({row.en})</span>
                    </td>
                    <td className="p-2 border border-[var(--card-border)] align-top">{row.q}</td>
                    <td className="p-2 border border-[var(--card-border)] align-top text-xs">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Eksempel: hva betyr 99,9 % tilgjengelighet?</h3>
          <p>
            Det høres ut som «nesten alltid», men la oss regne på det:
          </p>
          <ul>
            <li>Et døgn = 86&nbsp;400 sekunder.</li>
            <li>99,9 % oppetid betyr at systemet skal være tilgjengelig 86&nbsp;313 sekunder per døgn.</li>
            <li>Det betyr <strong>ca. 87 sekunder nedetid per døgn</strong> — eller ~8,8 timer per år.</li>
            <li>Krever du 99,99 %? Da har du bare 53 minutter nedetid per år. Krever du 99,999 % («five nines»)? 5 minutter per år. Det blir <em>fort dyrt</em>.</li>
          </ul>

          <p className="text-sm text-[var(--muted)] mt-3">
            Sommerville sier rett ut at de fleste produkter <em>ikke</em> bruker
            komponent-omkobling ved feil — det er for komplekst og dyrt. I stedet
            satser man på pålitelig programmering (kap. 8) for å forhindre at feil
            skjer i utgangspunktet.
          </p>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  3. Trade-offs                                               */}
      {/* ============================================================ */}
      <section id="trade-offs" className="scroll-mt-32">
        <TheorySummary
          title="3 · Trade-offs — det er umulig å maksimere alt"
          mustKnow={[
            "Vedlikehold ↔ ytelse: finkornede komponenter er lette å endre, men trege å eksekvere.",
            "Sikkerhet ↔ brukbarhet: hvert auth-lag du legger på reduserer brukervennligheten.",
            "Tilgjengelighet ↔ kostnad: redundans koster penger og øker kompleksitet.",
            "Tre eksempler fra Sommerville s. 98: maintainability vs performance, security vs usability, availability vs time-to-market and cost.",
          ]}
        >
          <p>
            Sommerville sier det rett ut (s. 97):{" "}
            <em>«It is impossible to optimize all of the non-functional attributes
            in the same system. Optimizing one attribute, such as security,
            inevitably affects other attributes, such as system usability and
            efficiency.»</em>
          </p>

          <p>
            Arkitekturdesign handler derfor om å gjøre <strong>bevisste
            kompromisser</strong>. Her er de tre eksemplene Sommerville løfter fram:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Vedlikehold ↔ ytelse</p>
              <p className="text-sm">
                Finkornede mikrotjenester er superlette å endre — men hver
                tjeneste-til-tjeneste-kall koster nettverkstid. Monolitten er
                rask, men du må deploye HELE applikasjonen ved hver lille
                endring.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">Sikkerhet ↔ brukbarhet</p>
              <p className="text-sm">
                Lagdelt sikkerhet (passord + 2FA + biometri + kapcha) gir et
                solid forsvar — men brukerne blir frustrerte og finner
                snarveier (deler passord, lar seg være innlogget, velger
                «123456»).
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Tilgjengelighet ↔ kostnad</p>
              <p className="text-sm">
                99,99 % uptime krever redundante servere, multi-region
                deployment, automatisk failover. Det dobler eller tredobler
                infrastrukturkostnaden. Trenger du virkelig dette for et
                hobbyprosjekt?
              </p>
            </div>
          </div>

          {/* Trade-off-stjerne */}
          <div className="my-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-center mb-2">Trade-off-stjernen</h4>
            <p className="text-sm text-center text-[var(--muted)] mb-3">
              Du kan ikke stivne alle attributtene helt ut samtidig — den lilla
              flaten må «velges». Trekker du ett hjørne ut, må noe annet inn.
            </p>
            <TradeoffStarSVG />
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvordan velger du?</h3>
          <ol>
            <li>
              <strong>Forstå brukerne dine</strong> — bankkunde og spillkunde har vidt
              forskjellige forventninger. Bankkunden vil ha sikkerhet og pålitelighet
              over alt annet; spillkunden vil ha ytelse.
            </li>
            <li>
              <strong>Vurder forretningskonteksten</strong> — er produktet i tidlig
              vekstfase (time-to-market dominerer) eller i en moden bransje
              (pålitelighet dominerer)?
            </li>
            <li>
              <strong>Ranger attributtene</strong> — bestem hvilke 2-3 som er
              viktigst. Aksepter at de andre må gi etter.
            </li>
            <li>
              <strong>Dokumenter kompromissene</strong> — slik at fremtidige
              utviklere forstår <em>hvorfor</em> arkitekturen ser ut som den gjør.
            </li>
          </ol>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  4. System decomposition                                     */}
      {/* ============================================================ */}
      <section id="decomposition" className="scroll-mt-32">
        <TheorySummary
          title="4 · System decomposition — hvordan dekomponere et system"
          mustKnow={[
            "Tre design-retningslinjer fra Sommerville Figur 4.8: Separation of concerns · Implement once · Stable interfaces.",
            "Lokaliser relasjoner og reduser delte avhengigheter for å kontrollere kompleksitet.",
            "Cross-cutting concerns (sikkerhet, ytelse, pålitelighet) angår ALLE lag — ikke bare ett.",
            "Komponentrelasjoner: part-of, uses, is-located-with, shares-data-with.",
          ]}
        >
          <p>
            Når du har bestemt deg for hvilke kvalitetsattributter som er viktigst,
            må du svare på tre spørsmål (Sommerville s. 101):
          </p>

          <ol>
            <li><strong>Hvordan organiserer vi systemet i komponenter?</strong></li>
            <li><strong>Hvordan distribueres og kommuniserer komponentene?</strong></li>
            <li><strong>Hvilke teknologier skal vi bruke og gjenbruke?</strong></li>
          </ol>

          <p>
            <strong>Decomposition</strong> handler om spørsmål 1: bryte ned store
            arkitektoniske komponenter i finere komponenter, der hver komponent har
            ett klart ansvar.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De tre design-retningslinjene</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="rounded-lg border-2 border-sysdev-300 dark:border-sysdev-700 bg-sysdev-50 dark:bg-sysdev-950/30 p-4">
              <p className="font-bold text-sysdev-700 dark:text-sysdev-400 mb-2">
                Separation of concerns
              </p>
              <p className="text-sm mb-2">
                Hver komponent fokuserer på <strong>ÉN ting</strong>. Eksempel: én
                komponent for autentisering, én for fakturering — ikke en stor
                klump som gjør begge.
              </p>
              <p className="text-xs text-[var(--muted)]">
                Hvorfor: lettere å forstå, teste, bytte ut og gjenbruke.
              </p>
            </div>

            <div className="rounded-lg border-2 border-sysdev-300 dark:border-sysdev-700 bg-sysdev-50 dark:bg-sysdev-950/30 p-4">
              <p className="font-bold text-sysdev-700 dark:text-sysdev-400 mb-2">
                Implement once
              </p>
              <p className="text-sm mb-2">
                Funksjonalitet skal bygges <strong>kun ett sted</strong>. Hvis to
                komponenter trenger samme oppgave (f.eks. e-postvalidering), lag en
                tredje, delt modul.
              </p>
              <p className="text-xs text-[var(--muted)]">
                Hvorfor: duplisering = bug-magnet. Endring må gjøres flere steder
                = du glemmer ett sted = silent bug.
              </p>
            </div>

            <div className="rounded-lg border-2 border-sysdev-300 dark:border-sysdev-700 bg-sysdev-50 dark:bg-sysdev-950/30 p-4">
              <p className="font-bold text-sysdev-700 dark:text-sysdev-400 mb-2">
                Stable interfaces
              </p>
              <p className="text-sm mb-2">
                Komponentens <strong>API skal endres sjelden</strong>. Skjul
                implementasjonsdetaljer bak grensesnittet — så kan du bytte ut alt
                bak kulissene uten å påvirke andre komponenter.
              </p>
              <p className="text-xs text-[var(--muted)]">
                Hvorfor: brytende endringer i et grensesnitt forplanter seg til
                alle som bruker det.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Komponentrelasjoner (Sommerville Figur 4.7)</h3>
          <p>Sommerville beskriver fire typer relasjoner mellom komponenter:</p>
          <ul>
            <li><strong>Part-of</strong> — én komponent er DEL av en annen (f.eks. en metode i et objekt).</li>
            <li><strong>Uses</strong> — én komponent BRUKER funksjonaliteten til en annen (kaller metoder på den).</li>
            <li><strong>Is-located-with</strong> — komponentene er definert i samme modul/objekt.</li>
            <li><strong>Shares-data-with</strong> — komponentene deler data (f.eks. en felles database).</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">Cross-cutting concerns — det som angår ALT</h3>
          <p>
            Noen bekymringer kan ikke isoleres i ett lag. Sommerville løfter fram tre
            <strong> cross-cutting concerns</strong>:
          </p>
          <ul>
            <li><strong>Sikkerhet</strong> — angriperen prøver å utnytte sårbarheter på <em>alle</em> lag (browser, server, database). Du må ha forsvar overalt.</li>
            <li><strong>Ytelse</strong> — en treg komponent på ett lag drar ned hele systemet.</li>
            <li><strong>Pålitelighet</strong> — én buggy komponent kan kræsje andre.</li>
          </ul>
          <p className="text-sm text-[var(--muted)] mt-3">
            Dette er grunnen til at sikkerhet ikke skal samles i én «sikkerhetsmodul» —
            du må tenke sikkerhet i hvert lag, fra input-validering i nettleseren til
            ACL-er i databasen.
          </p>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  5. Layered architecture                                     */}
      {/* ============================================================ */}
      <section id="layered" className="scroll-mt-32">
        <TheorySummary
          title="5 · Layered architecture — det vanligste mønsteret"
          mustKnow={[
            "Sommervilles 5-lags arkitektur for webapplikasjoner (Figur 4.10): UI · Auth+UI-håndtering · Applikasjon · Felles tjenester · Database.",
            "Regelen: lag X kommuniserer KUN med lag X-1 (laget under). Kontrollflyten er top-down, dataflyten bottom-up.",
            "Fordeler: lettere å forstå, modulært, kan bytte ut hvert lag uavhengig.",
            "Ulemper: kan bli tregt (mange lag = mange kall), og cross-cutting concerns må håndteres på tvers.",
          ]}
        >
          <p>
            For webapplikasjoner foreslår Sommerville en <strong>5-lags
            arkitektur</strong> (s. 109, Figur 4.10) som et godt utgangspunkt. Dette
            er ikke en lov, men en mal som dekker svært mange produkter.
          </p>

          <div className="my-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-center mb-3">Generisk 5-lags arkitektur for webapp</h4>
            <FiveLayerArchitectureSVG />
            <p className="text-xs text-center text-[var(--muted)] mt-3">
              Brukerhandlinger trigger kontrollflyt nedover; data flyter oppover
              fra databasen til skjermen.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hver lag forklart</h3>
          <ul>
            <li>
              <strong>Lag 1 — Brukergrensesnitt:</strong> HTML/JS i nettleser eller
              en mobil-app. Innholdet brukeren ser. Lokal validering hører hjemme her
              (av ytelseshensyn).
            </li>
            <li>
              <strong>Lag 2 — Autentisering og UI-håndtering:</strong> Innlogging,
              sesjonshåndtering, generering av websider, formhåndtering. Skiller
              sikkerhet og presentasjonslogikk fra forretningslogikken.
            </li>
            <li>
              <strong>Lag 3 — Applikasjonsspesifikk funksjonalitet:</strong>{" "}
              «Forretningslogikken». Det som gjør produktet ditt unikt — bestillinger,
              regler, beregninger.
            </li>
            <li>
              <strong>Lag 4 — Felles delte tjenester:</strong> Logging, søk, e-post,
              varsling, betaling. Komponenter som er nyttige på tvers av forskjellige
              applikasjonsfunksjoner.
            </li>
            <li>
              <strong>Lag 5 — Database og transaksjonshåndtering:</strong>{" "}
              Persistering, ACID-transaksjoner, gjenoppretting ved feil.
            </li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">Den gylne regelen</h3>
          <div className="rounded-lg border border-sysdev-300 dark:border-sysdev-700 bg-sysdev-50 dark:bg-sysdev-950/30 p-4 my-3">
            <p className="text-sm">
              <strong>Lag X bruker kun lag X-1.</strong> Brukergrensesnittet snakker
              ikke direkte med databasen — det går gjennom autentiserings- og
              applikasjonslagene. Slik unngår du at en endring i database-skjemaet
              forplantes opp til presentasjonslaget.
            </p>
            <p className="text-xs text-[var(--muted)] mt-2">
              Sommerville innrømmer at denne regelen i praksis er vanskelig å holde
              100 % — av effektivitetsgrunner kan høyere lag noen ganger snakke
              direkte med lavere lag. Men det skal være unntaket, ikke regelen.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Fordeler og ulemper</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-3">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2 text-sm">+ Fordeler</p>
              <ul className="text-sm space-y-1">
                <li>Lett å forstå strukturen</li>
                <li>Hvert lag kan testes og byttes ut isolert</li>
                <li>Skiller bekymringer (separation of concerns)</li>
                <li>Hele teamet kan tegne arkitekturen på en whiteboard</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-3">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2 text-sm">− Ulemper</p>
              <ul className="text-sm space-y-1">
                <li>Mange lag = mange kall = lavere ytelse</li>
                <li>Cross-cutting concerns (sikkerhet) må håndteres separat</li>
                <li>Kan bli stiv hvis du holder regelen for strengt</li>
                <li>Lett å lage et «fett» applikasjonslag som vokser ut av kontroll</li>
              </ul>
            </div>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  6. Distribution architecture                                */}
      {/* ============================================================ */}
      <section id="distribution" className="scroll-mt-32">
        <TheorySummary
          title="6 · Distribution architecture — hvor kjører komponentene?"
          mustKnow={[
            "Klient-tjener med MVC: Modellen er på serveren, View og Controller på klienten.",
            "Multi-tier separerer web-server, app-server og DB-server (Figur 4.14).",
            "Service-oriented (SOA) / mikrotjenester: hver tjeneste er statless og kan replikeres (Figur 4.15).",
            "Skytrenden: SOA blir dominerende fordi det er enkelt å skalere på sky.",
          ]}
        >
          <p>
            <strong>Distribution architecture</strong> handler om hvordan
            komponentene fysisk fordeles mellom maskiner — vanligvis mellom klient og
            ett eller flere serversystemer.
          </p>

          {/* --- Klient-tjener med MVC --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">Klient-tjener med MVC</h3>
          <p>
            Den klassiske webarkitekturen: brukeren bruker en nettleser eller
            mobil-app (klienten), og forretningslogikk + data ligger på en eller
            flere servere. <strong>Lastbalanseren</strong> fordeler trafikken over
            flere serverinstanser.
          </p>

          <div className="my-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-center mb-3">Klient-tjener med MVC-mønster</h4>
            <ClientServerMVCSVG />
          </div>

          <p>
            Sommerville understreker at klient-tjener i moderne web bruker
            <strong> Model-View-Controller (MVC)</strong>:
          </p>
          <ul>
            <li><strong>Model</strong> — systemets data + forretningslogikk. Ligger på serveren.</li>
            <li><strong>View</strong> — hvordan dataene presenteres for brukeren (HTML, UI-komponenter). På klienten.</li>
            <li><strong>Controller</strong> — håndterer brukerens input og oversetter til kall mot Model. På klienten (eller delt).</li>
          </ul>
          <p className="text-sm text-[var(--muted)] mt-2">
            Kommunikasjonen går vanligvis over <strong>HTTP</strong> med data
            representert som <strong>JSON</strong> (kompakt, raskt å parse) eller
            XML (eldre, mer ordrik).
          </p>

          {/* --- Multi-tier --- */}
          <h3 className="text-lg font-bold mt-8 mb-3">Multi-tier-arkitektur</h3>
          <p>
            En videreutvikling der serveren splittes i flere spesialiserte servere —
            typisk <strong>web-server</strong>, <strong>app-server</strong> og{" "}
            <strong>database-server</strong>. Hver tier kan skaleres uavhengig.
          </p>

          <div className="my-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-center mb-3">Multi-tier klient-tjener</h4>
            <MultiTierSVG />
          </div>

          <p>
            <strong>Når bruker du dette?</strong> Når du har et forretningssystem som
            kjører på egne servere, og du har relativt stabil last. Sommerville sier
            (s. 118) at dette har vært den dominerende arkitekturen for
            forretningssystemer — men at den nå mister terreng til
            tjenesteorientert/mikrotjeneste-arkitektur.
          </p>

          {/* --- Service-oriented / microservices --- */}
          <h3 className="text-lg font-bold mt-8 mb-3">Tjenesteorientert (SOA) / mikrotjenester</h3>
          <p>
            I stedet for én stor app-server splittes funksjonaliteten i mange
            <strong> stateless tjenester</strong>, hver med sin egen database. En
            <strong> API-gateway</strong> ruter forespørsler til riktig tjeneste.
          </p>

          <div className="my-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-center mb-3">Mikrotjeneste-arkitektur</h4>
            <MicroservicesSVG />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-3">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1 text-sm">+ Fordeler</p>
              <ul className="text-sm space-y-1">
                <li>Skaleres enkelt — replikér tjenesten som er overbelastet</li>
                <li>Motstandskraftig — én tjeneste ned tar ikke ned alt</li>
                <li>Team kan jobbe parallelt på hver tjeneste</li>
                <li>Bytt ut språk og teknologi per tjeneste</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-3">
              <p className="font-bold text-red-700 dark:text-red-400 mb-1 text-sm">− Ulemper</p>
              <ul className="text-sm space-y-1">
                <li>Mer kompleks distribuert systemhåndtering</li>
                <li>Vanskeligere å holde data konsistente på tvers</li>
                <li>Nettverkskall = latens</li>
                <li>Krever DevOps-modenhet</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hvordan velger du distribusjon?</h3>
          <p>Sommerville (s. 118) lister tre faktorer:</p>
          <ol>
            <li>
              <strong>Datatype og oppdateringsfrekvens:</strong> Strukturerte data med
              transaksjoner = én delt SQL-database (multi-tier). Distribuerte data =
              SOA, men du må håndtere konsistens.
            </li>
            <li>
              <strong>Endringsfrekvens:</strong> Mye endring i bestemte komponenter? Isolér
              dem som egne tjenester for enklere deploy.
            </li>
            <li>
              <strong>Plattform:</strong> På sky med uforutsigbar last? SOA er nesten alltid
              riktig. På egne servere med stabil last? Multi-tier holder.
            </li>
          </ol>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  7. Database — SQL vs NoSQL                                  */}
      {/* ============================================================ */}
      <section id="database" className="scroll-mt-32">
        <TheorySummary
          title="7 · Database — SQL vs NoSQL"
          mustKnow={[
            "SQL (relasjonell): strukturerte tabeller, ACID-transaksjoner, sterk konsistens. Eksempel: PostgreSQL, MySQL, Oracle.",
            "NoSQL: fleksibel struktur, horisontalt skalerbar, ofte eventual consistency. Eksempel: MongoDB, Cassandra, DynamoDB.",
            "Bruk SQL når data er strukturerte og konsistens er kritisk (bank, regnskap).",
            "Bruk NoSQL når data er ustrukturerte og du trenger skala (sosiale feeds, big data, dokumenter).",
          ]}
        >
          <p>
            Sommerville (avsnitt 4.5.1) sier at databasen <strong>«has a huge influence
            on how your system is implemented»</strong>. Beslutningen tas tidlig og er
            dyr å reversere.
          </p>

          <div className="my-5 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sysdev-100 dark:bg-sysdev-900/30">
                  <th className="text-left p-2 border border-[var(--card-border)]">Aspekt</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">SQL (relasjonell)</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">NoSQL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Datastruktur", "Faste tabeller med skjema", "Fleksibel — dokumenter, key-value, graf"],
                  ["Eksempler", "PostgreSQL, MySQL, Oracle, SQL Server", "MongoDB, Cassandra, DynamoDB, Redis"],
                  ["Transaksjoner", "ACID — sterk konsistens", "Vanligvis BASE — eventual consistency"],
                  ["Skalering", "Vertikal (kraftigere maskin)", "Horisontal (flere maskiner)"],
                  ["Spørrespråk", "SQL — mektig, standardisert", "Per-database (Mongo Query Language osv.)"],
                  ["Når bruke?", "Bank, regnskap, ERP — der konsistens dominerer", "Feeds, IoT, big data, dokumenthåndtering"],
                ].map(([asp, sql, nosql]) => (
                  <tr key={asp}>
                    <td className="p-2 border border-[var(--card-border)] font-semibold">{asp}</td>
                    <td className="p-2 border border-[var(--card-border)]">{sql}</td>
                    <td className="p-2 border border-[var(--card-border)]">{nosql}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hybrid: PostgreSQL med JSON</h3>
          <p>
            Sommerville antyder (s. 120) at framtiden er en miks: PostgreSQL og andre
            relasjonsdatabaser har fått inn JSON-felt, slik at du kan lagre
            ustrukturert data i en relasjonell base. Du får ACID-transaksjoner OG
            fleksibilitet — det beste av begge verdener for mange applikasjoner.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips</p>
            <p className="text-sm">
              Hvis spørsmålet dreier seg om <em>finansielle data, bestillinger,
              regnskap</em> — svar SQL/relasjonell. Hvis det dreier seg om <em>
              social media, sensor-data, dokumenter, brukergenerert innhold i
              skala</em> — svar NoSQL. Hvis spørsmålet er åpent, nevn hybrid-løsningen
              som en moderne tilnærming.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  8. Cloud vs on-premise                                      */}
      {/* ============================================================ */}
      <section id="cloud" className="scroll-mt-32">
        <TheorySummary
          title="8 · Cloud vs on-premise — hvor skal serverne stå?"
          mustKnow={[
            "Cloud (AWS, Azure, GCP): elastisk skalering, pay-as-you-go, men risiko for vendor lock-in.",
            "On-premise: full kontroll, viktig for sensitive data og strenge compliance-krav, men dyrt.",
            "For forbrukerprodukter er sky nesten alltid riktig (Sommerville s. 121).",
            "For forretningsprodukter kan on-prem fortsatt ha sin plass — predikerbar last, sensitive data.",
          ]}
        >
          <p>
            Sommerville (avsnitt 4.5.3) sier at <em>«Cloud computing is now ubiquitous»</em>{" "}
            — beslutningen er ikke lenger «sky eller ikke», men «hvilken sky og hvor mye».
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Cloud</p>
              <ul className="text-sm space-y-1">
                <li><strong>+</strong> Elastisk — skaler opp/ned i sekunder</li>
                <li><strong>+</strong> Ingen forhåndsinvestering i hardware</li>
                <li><strong>+</strong> Innebygd resilience (multi-region)</li>
                <li><strong>+</strong> Managed services (DB, kø, ML)</li>
                <li><strong>−</strong> Vendor lock-in (AWS-API ≠ Azure-API)</li>
                <li><strong>−</strong> Trafikk- og lagringskostnader vokser med suksess</li>
                <li><strong>−</strong> Sikkerhetsbekymringer for sensitive data</li>
              </ul>
            </div>
            <div className="rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">On-premise</p>
              <ul className="text-sm space-y-1">
                <li><strong>+</strong> Full kontroll over hardware og data</li>
                <li><strong>+</strong> Bedre for sensitive data og compliance (helse, militær)</li>
                <li><strong>+</strong> Forutsigbar månedlig kostnad ved stabil last</li>
                <li><strong>+</strong> Ingen vendor lock-in</li>
                <li><strong>−</strong> Stor forhåndsinvestering</li>
                <li><strong>−</strong> Du må selv håndtere drift, oppgradering, redundans</li>
                <li><strong>−</strong> Langsom å skalere ved plutselig vekst</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Når velger man hva?</h3>
          <ul>
            <li>
              <strong>Sky-først</strong> for forbrukerprodukter, oppstartsbedrifter, og
              alt med uforutsigbar trafikk.
            </li>
            <li>
              <strong>On-premise</strong> for sensitive data (helsejournaler, finans),
              strenge compliance-krav, eller når dataene IKKE skal forlate landet.
            </li>
            <li>
              <strong>Hybrid</strong> — sensitive data on-prem, resten i sky — er
              veldig vanlig i bedrifter.
            </li>
          </ul>

          <p className="text-sm text-[var(--muted)] mt-3">
            Et viktig poeng fra Sommerville: hvis du vil ha <em>full</em> nytte av sky,
            må du designe arkitekturen som tjenesteorientert (SOA). Det holder ikke
            å «løfte og flytte» en gammel monolittisk on-prem-app til AWS — du må
            re-arkitektere.
          </p>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  9. Open source                                              */}
      {/* ============================================================ */}
      <section id="open-source" className="scroll-mt-32">
        <TheorySummary
          title="9 · Open source-vurderinger"
          mustKnow={[
            "Tre vurderingskriterier: modnehet, støtte (kommersiell?), lisens.",
            "GPL er restriktiv (smitter — du må også åpne din kode hvis du distribuerer).",
            "MIT og Apache er friere — du kan bruke koden i kommersielle, lukkede produkter.",
            "Open source sparer tid OG begrenser arkitekturvalg (du må passe inn med biblioteket).",
          ]}
        >
          <p>
            Sommerville (avsnitt 4.5.4) er klar: open source <em>kan</em> spare deg
            mye tid, men du betaler en pris i fleksibilitet og lisensjuridikk.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Tre ting du må sjekke</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="rounded-lg border border-sysdev-200 dark:border-sysdev-800 bg-sysdev-50 dark:bg-sysdev-950/30 p-4">
              <p className="font-bold text-sysdev-700 dark:text-sysdev-400 mb-2">1 · Modenhet</p>
              <p className="text-sm">
                Hvor lenge har prosjektet eksistert? Når kom siste commit? Er det
                aktivt vedlikehold? Et halvferdig bibliotek med 50 åpne security-issues
                er en tidsbombe.
              </p>
            </div>
            <div className="rounded-lg border border-sysdev-200 dark:border-sysdev-800 bg-sysdev-50 dark:bg-sysdev-950/30 p-4">
              <p className="font-bold text-sysdev-700 dark:text-sysdev-400 mb-2">2 · Støtte</p>
              <p className="text-sm">
                Finnes det kommersiell støtte du kan kjøpe (f.eks. Red Hat for Linux)?
                Et stort community? Eller står prosjektet på skuldrene til én
                hobbyutvikler som kan slutte i morgen?
              </p>
            </div>
            <div className="rounded-lg border border-sysdev-200 dark:border-sysdev-800 bg-sysdev-50 dark:bg-sysdev-950/30 p-4">
              <p className="font-bold text-sysdev-700 dark:text-sysdev-400 mb-2">3 · Lisens</p>
              <p className="text-sm">
                Sjekk lisensen FØR du tar inn biblioteket. Noen lisenser smitter til
                din egen kode hvis du distribuerer produktet ditt.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Lisensoversikt</h3>
          <div className="my-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sysdev-100 dark:bg-sysdev-900/30">
                  <th className="text-left p-2 border border-[var(--card-border)]">Lisens</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Restriktivitet</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Konsekvens for deg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-[var(--card-border)] font-semibold">GPL / AGPL</td>
                  <td className="p-2 border border-[var(--card-border)] text-red-600 dark:text-red-400">Høy (copyleft)</td>
                  <td className="p-2 border border-[var(--card-border)]">
                    Hvis du distribuerer (eller kjører som tjeneste, AGPL), må DIN kode
                    også slippes som GPL. Brukes sjelden i kommersielle produkter.
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-[var(--card-border)] font-semibold">LGPL</td>
                  <td className="p-2 border border-[var(--card-border)] text-amber-600 dark:text-amber-400">Middels</td>
                  <td className="p-2 border border-[var(--card-border)]">
                    Du kan lenke biblioteket dynamisk uten at koden din må slippes.
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-[var(--card-border)] font-semibold">MIT / Apache 2.0 / BSD</td>
                  <td className="p-2 border border-[var(--card-border)] text-green-600 dark:text-green-400">Lav (permissive)</td>
                  <td className="p-2 border border-[var(--card-border)]">
                    Du kan bruke koden i et lukket, kommersielt produkt. Bare ta vare
                    på copyright-noticen.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-[var(--muted)] mt-3">
            Sommerville: «There&apos;s often a mismatch between the &lsquo;ideal&rsquo;
            open-source software and the expertise that you have available.» Det
            ideelle biblioteket er ubrukelig hvis teamet ditt ikke kan det.
          </p>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  10. Eksamensrelevans                                        */}
      {/* ============================================================ */}
      <section id="eksamen" className="scroll-mt-32">
        <TheorySummary
          title="10 · Eksamensrelevans og sjekkliste"
          mustKnow={[
            "Du MÅ kunne IEEE-definisjonen av software arkitektur.",
            "Du MÅ kunne navngi de 7 kvalitetsattributtene og forklare minst én trade-off mellom dem.",
            "Du MÅ kunne tegne 5-lags arkitektur for en webapp og forklare lagene.",
            "Du MÅ kunne forskjellen på multi-tier og service-oriented architecture.",
            "Du MÅ kunne velge SQL vs NoSQL og argumentere for valget.",
          ]}
        >
          <p>
            Software-arkitektur er <strong>nytt på pensum</strong> i forhold til
            tidligere år, men Sommerville kap. 4 er en fast del av semesterplanen i
            DAT109. Forventede eksamensspørsmål kan se slik ut:
          </p>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-semibold mb-1">Type 1 — Definisjons-/listingsspørsmål</p>
              <p className="text-sm text-[var(--muted)]">
                «Hvilke kvalitetsattributter nevnes i Sommervilles diskusjon av software
                arkitektur? Forklar minst tre.» Lær listen utenat.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-semibold mb-1">Type 2 — Trade-off-spørsmål</p>
              <p className="text-sm text-[var(--muted)]">
                «Forklar et eksempel på et arkitektonisk trade-off og hvilke
                kvalitetsattributter det involverer.» Bruk vedlikehold ↔ ytelse, eller
                sikkerhet ↔ brukbarhet.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-semibold mb-1">Type 3 — Anbefal en arkitektur</p>
              <p className="text-sm text-[var(--muted)]">
                «Hvilken distribusjonsarkitektur ville du anbefalt for [system X], og
                hvorfor?» Argumenter ut fra brukerantall, datatype, endringsfrekvens og
                plattform.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-semibold mb-1">Type 4 — Tegne et lagdelt diagram</p>
              <p className="text-sm text-[var(--muted)]">
                «Tegn en lagdelt arkitektur for en webapp og forklar hvert lag.» Bruk
                Sommervilles 5-lags modell.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Sjekkliste — slik forklarer du arkitekturvalget ditt</h3>
          <ol className="space-y-2">
            <li>
              <strong>1. Hva er kvalitetskravene?</strong> Ranger de 2-3 viktigste
              kvalitetsattributtene for systemet (sikkerhet, ytelse, tilgjengelighet,
              osv.).
            </li>
            <li>
              <strong>2. Hvilke trade-offs aksepterer jeg?</strong> Vær eksplisitt om
              hva du gir opp.
            </li>
            <li>
              <strong>3. Hvordan dekomponeres systemet?</strong> Bruk
              separation-of-concerns, implement-once og stable-interfaces. Tegn
              lag/komponenter.
            </li>
            <li>
              <strong>4. Hvor distribueres komponentene?</strong> Multi-tier eller
              SOA? På sky eller on-prem? Begrunn.
            </li>
            <li>
              <strong>5. Hvilke teknologier?</strong> SQL eller NoSQL? Hvilke
              open-source-komponenter passer? Hvilke lisenser tillater bruken jeg
              planlegger?
            </li>
          </ol>

          <div className="bg-sysdev-50 dark:bg-sysdev-950/30 border border-sysdev-300 dark:border-sysdev-700 p-4 my-5 rounded-lg">
            <p className="font-semibold text-sysdev-700 dark:text-sysdev-400 mb-2">Erlend — siste råd</p>
            <p className="text-sm">
              Hvis du klarer å sitere IEEE-definisjonen, navngi de 7 attributtene,
              tegne 5-lags-arkitekturen og forklare ÉN konkret trade-off — så har du
              dekket 80 % av det som kan komme på eksamen om dette temaet. Resten er
              å vise at du kan resonnere om hvilken arkitektur som passer en gitt
              situasjon, og det handler om å bruke argumenter fra punktene ovenfor.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* Kilder */}
      <section className="mt-10 mb-12">
        <h2 className="text-xl font-bold mb-3">Kilder</h2>
        <ul className="text-sm text-[var(--muted)] space-y-1">
          <li>
            Sommerville, I. (2021). <em>Engineering Software Products: An Introduction
            to Modern Software Engineering</em>, Global Edition. Pearson — kapittel 4
            «Software Architecture» (s. 92–125).
          </li>
          <li>IEEE-standard 1471 — definisjon av software arkitektur.</li>
          <li>
            Tidligereoppsummeringer i materialmappa (oppsummeringavagileosv.txt) — kort
            utkast til arkitekturtemaet.
          </li>
        </ul>
      </section>
    </div>
  );
}
