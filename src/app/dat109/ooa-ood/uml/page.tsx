"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import TheorySummary from "@/components/TheorySummary";
import { MCQ } from "@/components/dat109/EksamenComponents";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ──────────────────────────────────────────────────────────────────
   Inline SVG-eksempler for hver UML-diagramtype
   Forenklet, illustrative — ikke fullt komplekse case-studier.
   ────────────────────────────────────────────────────────────────── */

function ClassDiagramSVG() {
  return (
    <svg
      viewBox="0 0 480 240"
      className="w-full max-w-xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Klassediagram med Spiller, Brikke og Brett"
    >
      {/* Spiller */}
      <g>
        <rect x="20" y="20" width="140" height="120" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="20" y1="48" x2="160" y2="48" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="20" y1="92" x2="160" y2="92" stroke="#a855f7" strokeWidth="1.5" />
        <text x="90" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#581c87">Spiller</text>
        <text x="28" y="64" fontSize="11" fontFamily="monospace" fill="#1f2937">- navn: String</text>
        <text x="28" y="80" fontSize="11" fontFamily="monospace" fill="#1f2937">- penger: int</text>
        <text x="28" y="108" fontSize="11" fontFamily="monospace" fill="#1f2937">+ kastTerning()</text>
        <text x="28" y="124" fontSize="11" fontFamily="monospace" fill="#1f2937">+ flyttBrikke()</text>
      </g>

      {/* Brikke */}
      <g>
        <rect x="320" y="20" width="140" height="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="320" y1="48" x2="460" y2="48" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="320" y1="76" x2="460" y2="76" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="390" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">Brikke</text>
        <text x="328" y="64" fontSize="11" fontFamily="monospace" fill="#1f2937">- posisjon: int</text>
        <text x="328" y="92" fontSize="11" fontFamily="monospace" fill="#1f2937">+ flyttTil(int)</text>
        <text x="328" y="108" fontSize="11" fontFamily="monospace" fill="#1f2937">+ hentPosisjon()</text>
      </g>

      {/* Brett */}
      <g>
        <rect x="170" y="180" width="140" height="50" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="170" y1="208" x2="310" y2="208" stroke="#22c55e" strokeWidth="1.5" />
        <text x="240" y="200" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">Brett</text>
        <text x="178" y="223" fontSize="11" fontFamily="monospace" fill="#1f2937">- ruter: List</text>
      </g>

      {/* Assosiasjon Spiller —— Brikke (1..1) */}
      <g>
        <line x1="160" y1="80" x2="320" y2="60" stroke="#525252" strokeWidth="1.5" />
        <text x="170" y="74" fontSize="10" fill="#525252">1</text>
        <text x="305" y="54" fontSize="10" fill="#525252">1</text>
        <text x="225" y="58" fontSize="10" fill="#525252" fontStyle="italic">eier</text>
      </g>

      {/* Brikke står på Brett (mange brikker, ett brett) */}
      <g>
        <line x1="370" y1="120" x2="280" y2="180" stroke="#525252" strokeWidth="1.5" />
        <text x="365" y="135" fontSize="10" fill="#525252">*</text>
        <text x="285" y="175" fontSize="10" fill="#525252">1</text>
      </g>

      {/* Spiller flytter brikke på brett */}
      <g>
        <line x1="90" y1="140" x2="200" y2="180" stroke="#525252" strokeWidth="1.5" />
        <text x="100" y="160" fontSize="10" fill="#525252">1</text>
        <text x="200" y="176" fontSize="10" fill="#525252">1</text>
      </g>
    </svg>
  );
}

function SequenceDiagramSVG() {
  return (
    <svg
      viewBox="0 0 520 280"
      className="w-full max-w-2xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Sekvensdiagram for kjøp av eiendom i Monopol"
    >
      {/* Aktør / objekt-rektangler */}
      {[
        { x: 50, label: ":Spiller" },
        { x: 200, label: ":Bank" },
        { x: 350, label: ":Eiendom" },
      ].map((o) => (
        <g key={o.label}>
          <rect x={o.x} y="10" width="100" height="30" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
          <text x={o.x + 50} y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
            {o.label}
          </text>
          {/* Livslinje */}
          <line x1={o.x + 50} y1="40" x2={o.x + 50} y2="270" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      ))}

      {/* Aktiveringsbokser */}
      <rect x="96" y="70" width="8" height="180" fill="#a855f7" opacity="0.3" />
      <rect x="246" y="90" width="8" height="120" fill="#a855f7" opacity="0.3" />
      <rect x="396" y="130" width="8" height="60" fill="#a855f7" opacity="0.3" />

      {/* Melding 1: kjøp() */}
      <line x1="100" y1="80" x2="246" y2="80" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="173" y="74" textAnchor="middle" fontSize="11" fill="#1f2937">kjøp(eiendom)</text>

      {/* Melding 2: trekkPenger() */}
      <line x1="254" y1="110" x2="100" y2="110" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
      <text x="173" y="104" textAnchor="middle" fontSize="11" fill="#525252" fontStyle="italic">trekkPenger(pris)</text>

      {/* Melding 3: registrerEier() */}
      <line x1="254" y1="140" x2="396" y2="140" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="325" y="134" textAnchor="middle" fontSize="11" fill="#1f2937">registrerEier(spiller)</text>

      {/* Returnerer */}
      <line x1="396" y1="180" x2="254" y2="180" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
      <text x="325" y="174" textAnchor="middle" fontSize="11" fill="#525252" fontStyle="italic">ok</text>

      {/* Bekreft til spiller */}
      <line x1="246" y1="240" x2="100" y2="240" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
      <text x="173" y="234" textAnchor="middle" fontSize="11" fill="#525252" fontStyle="italic">bekreftet</text>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#1f2937" />
        </marker>
      </defs>
    </svg>
  );
}

function UseCaseDiagramSVG() {
  return (
    <svg
      viewBox="0 0 500 260"
      className="w-full max-w-xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Brukstilfellediagram for et nettbankssystem"
    >
      {/* System-grense */}
      <rect x="170" y="20" width="290" height="220" fill="none" stroke="#a855f7" strokeWidth="1.5" rx="6" />
      <text x="315" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">Nettbank</text>

      {/* Aktør (strekfigur) */}
      <g stroke="#1f2937" strokeWidth="1.5" fill="none">
        <circle cx="60" cy="80" r="12" />
        <line x1="60" y1="92" x2="60" y2="135" />
        <line x1="40" y1="105" x2="80" y2="105" />
        <line x1="60" y1="135" x2="40" y2="165" />
        <line x1="60" y1="135" x2="80" y2="165" />
      </g>
      <text x="60" y="185" textAnchor="middle" fontSize="12" fill="#1f2937">Kunde</text>

      {/* Brukstilfeller (ovaler) */}
      {[
        { y: 70, label: "Logg inn" },
        { y: 120, label: "Overfør penger" },
        { y: 170, label: "Vis saldo" },
        { y: 220, label: "Endre passord" },
      ].map((u) => (
        <g key={u.label}>
          <ellipse cx="320" cy={u.y} rx="90" ry="20" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
          <text x="320" y={u.y + 4} textAnchor="middle" fontSize="12" fill="#1f2937">{u.label}</text>
        </g>
      ))}

      {/* Linjer aktør → brukstilfeller */}
      {[70, 120, 170, 220].map((y) => (
        <line key={y} x1="80" y1="120" x2="230" y2={y} stroke="#525252" strokeWidth="1" />
      ))}
    </svg>
  );
}

function ActivityDiagramSVG() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="w-full max-w-md mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Aktivitetsdiagram for innlogging"
    >
      {/* Start */}
      <circle cx="180" cy="25" r="10" fill="#1f2937" />
      <line x1="180" y1="35" x2="180" y2="55" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#a-arr)" />

      {/* Aktivitet 1 */}
      <rect x="120" y="60" width="120" height="36" rx="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="180" y="83" textAnchor="middle" fontSize="12" fill="#1e3a8a">Skriv inn brukernavn</text>
      <line x1="180" y1="96" x2="180" y2="116" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#a-arr)" />

      {/* Aktivitet 2 */}
      <rect x="120" y="120" width="120" height="36" rx="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="180" y="143" textAnchor="middle" fontSize="12" fill="#1e3a8a">Skriv inn passord</text>
      <line x1="180" y1="156" x2="180" y2="180" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#a-arr)" />

      {/* Beslutning (rhombe) */}
      <polygon points="180,180 230,215 180,250 130,215" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="180" y="219" textAnchor="middle" fontSize="11" fill="#92400e">Gyldig?</text>

      {/* Ja-grein */}
      <line x1="230" y1="215" x2="290" y2="215" stroke="#1f2937" strokeWidth="1.5" />
      <text x="245" y="210" fontSize="10" fill="#1f2937">[ja]</text>
      <line x1="290" y1="215" x2="290" y2="290" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#a-arr)" />
      <rect x="230" y="290" width="120" height="36" rx="18" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
      <text x="290" y="313" textAnchor="middle" fontSize="12" fill="#166534">Vis hovedside</text>

      {/* Nei-grein */}
      <line x1="130" y1="215" x2="70" y2="215" stroke="#1f2937" strokeWidth="1.5" />
      <text x="80" y="210" fontSize="10" fill="#1f2937">[nei]</text>
      <line x1="70" y1="215" x2="70" y2="120" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#a-arr)" />

      {/* Slutt — dobbelsirkel */}
      <line x1="290" y1="326" x2="290" y2="345" stroke="#1f2937" strokeWidth="1.5" />
      <circle cx="290" cy="345" r="11" fill="none" stroke="#1f2937" strokeWidth="1.5" />
      <circle cx="290" cy="345" r="6" fill="#1f2937" />

      <defs>
        <marker id="a-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#1f2937" />
        </marker>
      </defs>
    </svg>
  );
}

function StateDiagramSVG() {
  return (
    <svg
      viewBox="0 0 520 200"
      className="w-full max-w-2xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Tilstandsdiagram for et bestillingssystem"
    >
      {/* Start */}
      <circle cx="30" cy="100" r="9" fill="#1f2937" />
      <line x1="40" y1="100" x2="80" y2="100" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#s-arr)" />

      {/* Tilstand: Opprettet */}
      <rect x="80" y="80" width="100" height="40" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="130" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">Opprettet</text>

      {/* Tilstand: Betalt */}
      <line x1="180" y1="100" x2="240" y2="100" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#s-arr)" />
      <text x="210" y="93" textAnchor="middle" fontSize="10" fill="#525252">betal()</text>
      <rect x="240" y="80" width="100" height="40" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
      <text x="290" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">Betalt</text>

      {/* Tilstand: Sendt */}
      <line x1="340" y1="100" x2="400" y2="100" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#s-arr)" />
      <text x="370" y="93" textAnchor="middle" fontSize="10" fill="#525252">send()</text>
      <rect x="400" y="80" width="100" height="40" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="450" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">Sendt</text>

      {/* Tilbake til opprettet ved kansellering */}
      <path d="M 240,80 Q 200,30 130,80" fill="none" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#s-arr)" />
      <text x="190" y="38" textAnchor="middle" fontSize="10" fill="#525252">kanseller()</text>

      {/* Slutt — dobbelsirkel */}
      <line x1="450" y1="120" x2="450" y2="160" stroke="#1f2937" strokeWidth="1.5" markerEnd="url(#s-arr)" />
      <circle cx="450" cy="175" r="11" fill="none" stroke="#1f2937" strokeWidth="1.5" />
      <circle cx="450" cy="175" r="6" fill="#1f2937" />

      <defs>
        <marker id="s-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#1f2937" />
        </marker>
      </defs>
    </svg>
  );
}

function CommunicationDiagramSVG() {
  return (
    <svg
      viewBox="0 0 500 200"
      className="w-full max-w-2xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Kommunikasjonsdiagram"
    >
      {/* Tre objekter */}
      <rect x="40" y="80" width="100" height="40" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="90" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">:Spiller</text>

      <rect x="200" y="20" width="100" height="40" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="250" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">:Bank</text>

      <rect x="360" y="80" width="100" height="40" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="410" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">:Eiendom</text>

      {/* Linjer */}
      <line x1="140" y1="100" x2="200" y2="60" stroke="#1f2937" strokeWidth="1.5" />
      <line x1="300" y1="60" x2="360" y2="100" stroke="#1f2937" strokeWidth="1.5" />
      <line x1="140" y1="120" x2="360" y2="120" stroke="#1f2937" strokeWidth="1.5" />

      {/* Nummererte meldinger */}
      <text x="160" y="76" fontSize="11" fill="#1f2937">1: kjøp()</text>
      <text x="305" y="76" fontSize="11" fill="#1f2937">2: registrer()</text>
      <text x="200" y="140" fontSize="11" fill="#1f2937">3: bekreft()</text>
    </svg>
  );
}

function VisibilityNotationSVG() {
  return (
    <svg
      viewBox="0 0 480 220"
      className="w-full max-w-xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="Klassediagram med ulike synligheter"
    >
      <rect x="60" y="20" width="360" height="180" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="60" y1="48" x2="420" y2="48" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="60" y1="120" x2="420" y2="120" stroke="#a855f7" strokeWidth="1.5" />

      <text x="240" y="38" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#581c87">Konto</text>

      <text x="72" y="68" fontSize="12" fontFamily="monospace" fill="#1f2937">- saldo: double</text>
      <text x="72" y="86" fontSize="12" fontFamily="monospace" fill="#1f2937">+ kontonr: String</text>
      <text x="72" y="104" fontSize="12" fontFamily="monospace" fill="#1f2937"># renteSats: double</text>

      <text x="72" y="140" fontSize="12" fontFamily="monospace" fill="#1f2937">+ settInn(beløp: double)</text>
      <text x="72" y="158" fontSize="12" fontFamily="monospace" fill="#1f2937">- beregnRente(): double</text>
      <text x="72" y="176" fontSize="12" fontFamily="monospace" fill="#1f2937">~ logTransaksjon()</text>
      <text x="72" y="194" fontSize="12" fontFamily="monospace" fill="#1f2937" textDecoration="underline">+ antallKontoer: int</text>
    </svg>
  );
}

function DiagramHierarchySVG() {
  return (
    <svg
      viewBox="0 0 720 320"
      className="w-full max-w-3xl mx-auto rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-900"
      role="img"
      aria-label="UML-diagramhierarkiet"
    >
      {/* Rot */}
      <rect x="290" y="10" width="140" height="40" rx="8" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
      <text x="360" y="35" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#581c87">UML-diagram</text>

      {/* To grener */}
      <line x1="360" y1="50" x2="180" y2="90" stroke="#525252" strokeWidth="1.5" />
      <line x1="360" y1="50" x2="540" y2="90" stroke="#525252" strokeWidth="1.5" />

      {/* Strukturell */}
      <rect x="100" y="90" width="160" height="40" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="180" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">Strukturell</text>

      {[
        { x: 20, label: "Klasse" },
        { x: 100, label: "Objekt" },
        { x: 180, label: "Pakke" },
        { x: 260, label: "Komponent" },
      ].map((b, i) => (
        <g key={b.label}>
          <line x1="180" y1="130" x2={b.x + 50} y2="180" stroke="#525252" strokeWidth="1" />
          <rect x={b.x} y="180" width="100" height="34" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
          <text x={b.x + 50} y="201" textAnchor="middle" fontSize="11" fill="#1e3a8a">{b.label}</text>
        </g>
      ))}
      <line x1="180" y1="130" x2="180" y2="240" stroke="#525252" strokeWidth="1" />
      <rect x="130" y="240" width="100" height="34" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
      <text x="180" y="261" textAnchor="middle" fontSize="11" fill="#1e3a8a">Utrullings</text>

      {/* Atferd */}
      <rect x="460" y="90" width="160" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="540" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">Atferd</text>

      {[
        { x: 380, label: "Brukstilfelle" },
        { x: 460, label: "Aktivitet" },
        { x: 540, label: "Sekvens" },
        { x: 620, label: "Tilstand" },
      ].map((b) => (
        <g key={b.label}>
          <line x1="540" y1="130" x2={b.x + 50} y2="180" stroke="#525252" strokeWidth="1" />
          <rect x={b.x} y="180" width="100" height="34" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.2" />
          <text x={b.x + 50} y="201" textAnchor="middle" fontSize="11" fill="#166534">{b.label}</text>
        </g>
      ))}
      <line x1="540" y1="130" x2="540" y2="240" stroke="#525252" strokeWidth="1" />
      <rect x="490" y="240" width="100" height="34" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.2" />
      <text x="540" y="261" textAnchor="middle" fontSize="11" fill="#166534">Kommunikasjon</text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Hovedside
   ────────────────────────────────────────────────────────────────── */

export default function UmlPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/ooa-ood" className="hover:text-[var(--accent)]">OOA og OOD</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">UML-grunnlag</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">UML — grunnlag, formål og fordeler</h1>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            NY — testet i V2024
          </span>
        </div>
        <p className="text-[var(--muted)] max-w-3xl leading-relaxed">
          Hva er UML, hvilke diagrammer finnes, hva viser hvert av dem, og hvorfor
          bruker vi UML i det hele tatt? V2024 testet flere av disse spørsmålene
          direkte. Atle viet hele forelesning F02 (22 slides) til UML — så dette
          er pensum-stoff på toppnivå.
        </p>
      </div>

      {/* Eksamens-callout */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-5 mb-6">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2 text-sm uppercase tracking-wide">
          Hvorfor denne siden er kritisk
        </h3>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
          På V2024 dukket det opp tre flervalg-spørsmål om UML i oppgave 2 — ordrett
          om <em>formålet med klassediagram</em>, <em>formålet med sekvensdiagram</em>,
          og <em>fordeler med UML</em>. Disse er &quot;gratis-poeng&quot; hvis du har
          definisjonene på plass. Lær dem ordrett — du blir spurt igjen.
        </p>
      </div>

      {/* ──── Seksjon 1: Hva er UML? ──── */}
      <TheorySummary
        title="1. Hva er UML — og hvorfor finnes det?"
        mustKnow={[
          "UML = Unified Modeling Language — et standardisert visuelt språk for å modellere programvare",
          "Standardisert av OMG (Object Management Group) i 1997; nåværende versjon er UML 2.x",
          "Programmeringsspråk-uavhengig — fungerer for Java, C#, Python, C++ osv.",
          "Hovedformål: kommunisere designet på tvers av utviklere, kunder og team",
        ]}
      >
        <h3>Den korte historien</h3>
        <p>
          På 90-tallet konkurrerte tre rivaliserende objektorienterte modelleringsmetoder:
          Booch (Grady Booch), OMT (Rumbaugh) og OOSE (Jacobson). De tre &quot;amigos&quot;
          slo seg sammen, og resultatet ble <strong>UML — Unified Modeling Language</strong>,
          standardisert av <strong>OMG (Object Management Group)</strong> i 1997.
          I dag bruker vi <strong>UML 2.x</strong>, som har 14 ulike diagramtyper.
        </p>

        <h3>Hva er UML egentlig?</h3>
        <p>
          UML er et <strong>visuelt språk</strong> — ikke et programmeringsspråk. Du
          kan ikke kjøre UML. Det du kan, er å <em>tegne</em> hvordan systemet henger
          sammen, slik at andre forstår det uten å lese koden.
        </p>

        <div className="not-prose my-4 grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mb-1">
              UML er
            </div>
            <ul className="text-sm space-y-1 text-neutral-800 dark:text-neutral-100">
              <li>• Et visuelt notasjonsspråk</li>
              <li>• Standardisert av OMG</li>
              <li>• Programmeringsspråk-uavhengig</li>
              <li>• Et kommunikasjonsverktøy mellom utviklere</li>
              <li>• Et designverktøy — ikke bare dokumentasjon</li>
            </ul>
          </div>
          <div className="rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-400 mb-1">
              UML er IKKE
            </div>
            <ul className="text-sm space-y-1 text-neutral-800 dark:text-neutral-100">
              <li>• Et programmeringsspråk (kan ikke kjøres)</li>
              <li>• Bundet til et bestemt språk eller verktøy</li>
              <li>• En metodikk/prosess (det er Scrum, XP osv.)</li>
              <li>• Bare for &quot;diagrammer på vegg&quot;</li>
              <li>• Pålagt — du velger diagrammene som hjelper deg</li>
            </ul>
          </div>
        </div>

        <h3>Hvorfor trenger vi det?</h3>
        <p>
          Tenk på et byggeprosjekt: arkitekten lager tegninger før de støper grunnmuren.
          Tegningene bruker en standardisert notasjon — alle entreprenører forstår
          symbolene. UML er det samme for programvare. Før du skriver én linje Java,
          kan du tegne klassediagram og sekvensdiagram, vise dem til kunden og
          medstudentene, og finne feil <em>før</em> du har brukt 100 timer på å
          implementere noe galt.
        </p>
      </TheorySummary>

      {/* ──── Seksjon 2: Strukturelle vs atferdsmessige ──── */}
      <TheorySummary
        title="2. Strukturelle vs atferdsmessige diagrammer"
        mustKnow={[
          "Strukturelle: viser hva systemet ER (statisk struktur) — klasse, objekt, pakke, komponent, utrullings",
          "Atferd: viser hva systemet GJØR (dynamisk oppførsel) — brukstilfelle, aktivitet, sekvens, tilstand, kommunikasjon",
          "Tommelfingerregel: hvis det er piler/tid involvert → atferd. Hvis det er klasser/strukturer → strukturell.",
        ]}
      >
        <p>
          UML 2 deler de 14 diagramtypene inn i to hovedfamilier — det er den viktigste
          sorteringen Atle bruker i F02:
        </p>

        <div className="not-prose">
          <DiagramHierarchySVG />
        </div>

        <div className="not-prose grid md:grid-cols-2 gap-3 my-4">
          <div className="rounded-lg border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
            <div className="font-bold text-blue-700 dark:text-blue-400 mb-2">Strukturelle diagrammer</div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-2">
              Viser <strong>hva systemet er</strong> — den statiske oppbygningen.
              Hva slags klasser, hvilke pakker, hvilke komponenter, hvilke fysiske
              servere. Som et <em>fotografi</em> av systemet.
            </p>
            <ul className="text-sm space-y-1 text-neutral-800 dark:text-neutral-100">
              <li>• <strong>Klassediagram</strong> — klasser og relasjoner</li>
              <li>• <strong>Objektdiagram</strong> — øyeblikksbilde av objekter</li>
              <li>• <strong>Pakkediagram</strong> — pakker og avhengigheter</li>
              <li>• <strong>Komponentdiagram</strong> — programvare-komponenter</li>
              <li>• <strong>Utrullingsdiagram</strong> — fysisk plassering</li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
            <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Atferdsmessige diagrammer</div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-2">
              Viser <strong>hva systemet gjør</strong> — den dynamiske oppførselen
              over tid. Hvilke meldinger sendes, hvilke tilstander objekter har,
              hvilke aktiviteter som utføres. Som en <em>film</em> av systemet.
            </p>
            <ul className="text-sm space-y-1 text-neutral-800 dark:text-neutral-100">
              <li>• <strong>Brukstilfellediagram</strong> — krav fra bruker</li>
              <li>• <strong>Aktivitetsdiagram</strong> — arbeidsflyt</li>
              <li>• <strong>Sekvensdiagram</strong> — meldinger over tid</li>
              <li>• <strong>Tilstandsdiagram</strong> — objekt-tilstander</li>
              <li>• <strong>Kommunikasjonsdiagram</strong> — alternativ til sekvens</li>
            </ul>
          </div>
        </div>

        <h3>Hvilke bruker DAT109 i praksis?</h3>
        <p>
          Av de 14 diagramtypene er det <strong>fem</strong> du må kunne godt for
          DAT109-eksamen:
        </p>
        <ol>
          <li><strong>Brukstilfellediagram</strong> + brukstilfellebeskrivelse (oppgave 1a)</li>
          <li><strong>Klassediagram</strong> som domenemodell (oppgave 1b) og som utformingsmodell (oppgave 4)</li>
          <li><strong>Sekvensdiagram</strong> (oppgave 1c og 4b)</li>
          <li><strong>Aktivitetsdiagram</strong> (alternativ til tekstlig brukstilfellebeskrivelse)</li>
          <li><strong>Tilstandsdiagram</strong> (forekommer i teorispørsmål)</li>
        </ol>
      </TheorySummary>

      {/* ──── Seksjon 3: Hvert diagram — formål og når ──── */}
      <h2 className="text-2xl font-bold mt-12 mb-2">3. Hvert diagram — formål og når brukes det</h2>
      <p className="text-[var(--muted)] mb-6">
        For hver diagramtype: definisjon (V2024-stil), når den brukes, og et lite
        visuelt eksempel inline. Lær formuleringene ordrett — V2024 testet to av
        disse direkte.
      </p>

      {/* 3.1 Klassediagram */}
      <TheorySummary
        title="3.1 Klassediagram — strukturen til systemet"
        mustKnow={[
          "FORMÅL: viser strukturen til et system og relaterte klasser (V2024 ordrett)",
          "Hver klasse: navn, attributter (med type), operasjoner (metoder med parametere)",
          "Relasjoner: assosiasjon, aggregering (åpen rombe), komposisjon (fylt rombe), arv (åpen pil), realisering (stiplet pil)",
          "Multiplisitet: 1, 0..1, *, 1..*, 0..* — sier hvor mange instanser som er knyttet sammen",
          "Brukes BÅDE i analyse (domenemodell — uten metoder) og design (utformingsmodell — med metoder)",
        ]}
      >
        <p>
          <strong>Definisjon (lær ordrett):</strong> Et klassediagram viser
          <em> strukturen til et system og de klassene det består av</em>, samt
          <em> hvordan klassene henger sammen (relasjoner)</em>.
        </p>

        <h3>Når bruker du det?</h3>
        <ul>
          <li>
            <strong>I analyse</strong>: som <em>domenemodell</em>. Da viser klassene
            begreper fra problemområdet (Spiller, Brett, Brikke) — UTEN metoder, kun
            attributter og relasjoner. Husk regelen: <strong>domenemodellen skal
            ALDRI ha metoder</strong>.
          </li>
          <li>
            <strong>I design</strong>: som <em>utformingsmodell</em>. Da legger du
            til metoder, synligheter (+/-/#), og du tar med design-klasser som
            kontroll- og grenseobjekter.
          </li>
        </ul>

        <h3>Eksempel</h3>
        <p>Forenklet utdrag fra Stigespill — Spiller, Brikke og Brett:</p>

        <div className="not-prose">
          <ClassDiagramSVG />
        </div>

        <div className="not-prose mt-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 p-4 text-sm">
          <strong className="text-neutral-700 dark:text-neutral-200">Les diagrammet:</strong>{" "}
          <span className="text-neutral-700 dark:text-neutral-300">
            Hver Spiller eier akkurat én Brikke (1..1). Brikken står på Brettet
            (mange brikker kan stå på ett brett: *..1). Spilleren har metoder for å
            kaste terningen og flytte brikken.
          </span>
        </div>
      </TheorySummary>

      {/* 3.2 Sekvensdiagram */}
      <TheorySummary
        title="3.2 Sekvensdiagram — interaksjon over tid"
        mustKnow={[
          "FORMÅL: viser hvordan objekter samhandler over tid (V2024 ordrett)",
          "Tid går NEDOVER på loddrett akse",
          "Objekt-rektangler øverst, livslinjer (stiplet) går ned",
          "Heltrukken pil = synkron melding/metode-kall, stiplet pil = retur",
          "Aktiveringsboks (smal rektangel) viser når objektet er aktivt",
          "På DAT109-eksamen: oppgave 1c (analyse-sekvens) og oppgave 4b (design-sekvens)",
        ]}
      >
        <p>
          <strong>Definisjon (lær ordrett):</strong> Et sekvensdiagram viser
          <em> hvordan objekter samhandler over tid</em> — hvilke meldinger som
          sendes mellom objekter og i hvilken rekkefølge.
        </p>

        <h3>Når bruker du det?</h3>
        <ul>
          <li>
            <strong>Analyse-sekvensdiagram</strong> (oppgave 1c): viser meldinger
            mellom <em>aktør</em> og <em>:System</em> som ett samlet svart-boks-objekt.
            Bruker brukstilfellebeskrivelsen som kilde for meldingene.
          </li>
          <li>
            <strong>Design-sekvensdiagram</strong> (oppgave 4b): viser meldinger
            mellom <em>spesifikke design-objekter</em> — kontroller, modell-objekter,
            grenseobjekter. Skal samsvare med utformingsmodellen.
          </li>
        </ul>

        <h3>Eksempel</h3>
        <p>Spiller kjøper en eiendom i Monopol — meldingsflyten:</p>

        <div className="not-prose">
          <SequenceDiagramSVG />
        </div>

        <div className="not-prose mt-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 p-4 text-sm">
          <strong className="text-neutral-700 dark:text-neutral-200">Les diagrammet:</strong>{" "}
          <span className="text-neutral-700 dark:text-neutral-300">
            Spiller sender <code>kjøp(eiendom)</code> til Bank. Bank trekker penger
            (retur), sender <code>registrerEier(spiller)</code> til Eiendom, får ok,
            og bekrefter til Spiller. Tid går nedover.
          </span>
        </div>
      </TheorySummary>

      {/* 3.3 Brukstilfellediagram */}
      <TheorySummary
        title="3.3 Brukstilfellediagram — funksjonelle krav"
        mustKnow={[
          "FORMÅL: modellerer funksjonelle krav fra BRUKERS perspektiv",
          "Aktør (strekfigur) — bruker eller eksternt system",
          "Brukstilfelle (oval) — én ting brukeren vil oppnå",
          "System-grense (rektangel) — hva er innenfor systemet",
          "KRITISK: Et brukstilfellediagram er IKKE et flytdiagram!",
          "Se egen side /dat109/modellering/brukstilfelle for full dybde",
        ]}
      >
        <p>
          <strong>Definisjon:</strong> Et brukstilfellediagram viser hvilke
          <em> brukstilfeller (use cases)</em> et system har, og hvilke
          <em> aktører</em> som bruker dem. Det modellerer funksjonelle krav fra
          brukerens perspektiv.
        </p>

        <h3>Vanligste feil — pass på!</h3>
        <div className="not-prose my-3 rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-400 mb-1">
            Felle: brukstilfellediagram er IKKE et flytdiagram
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">
            Studenter blander ofte sammen brukstilfellediagram (oversikt over
            HVA systemet gjør) med aktivitetsdiagram (HVORDAN det gjøres). I et
            brukstilfellediagram er det <strong>ingen rekkefølge, ingen piler
            mellom brukstilfeller</strong>, ingen valg-rhomber. Bare aktører,
            ovaler og systemgrense. Tegner du piler mellom &quot;Logg inn&quot;
            og &quot;Vis saldo&quot; så har du laget et flytdiagram — det er
            feil.
          </p>
        </div>

        <h3>Eksempel</h3>
        <p>Et minimalt nettbanksystem:</p>

        <div className="not-prose">
          <UseCaseDiagramSVG />
        </div>
      </TheorySummary>

      {/* 3.4 Aktivitetsdiagram */}
      <TheorySummary
        title="3.4 Aktivitetsdiagram — arbeidsflyt"
        mustKnow={[
          "FORMÅL: viser arbeidsflyten i en prosess — som et flytdiagram, men UML-standardisert",
          "Brukes ofte som ALTERNATIV til tekstlig brukstilfellebeskrivelse",
          "Symboler: aktivitet (avrundet rektangel), valg (rhombe), start (fylt sirkel), slutt (dobbelsirkel)",
          "Vakter: [betingelse] settes på utgående piler fra rhomben",
          "Kan ha parallelle baner (kombinasjonsstreker — synkroniseringsbarrer)",
        ]}
      >
        <p>
          <strong>Definisjon:</strong> Et aktivitetsdiagram viser flyten av
          aktiviteter i en prosess — hva som skjer, i hvilken rekkefølge, og
          hvilke valg som tas underveis. Det er som et flytdiagram, men med
          standardiserte UML-symboler.
        </p>

        <h3>Symbolene du trenger</h3>
        <ul>
          <li><strong>Fylt sirkel</strong> = start</li>
          <li><strong>Avrundet rektangel</strong> = aktivitet (en handling som tar tid)</li>
          <li><strong>Rhombe (diamant)</strong> = beslutning/valg</li>
          <li><strong>[vakt]</strong> på utgående pil = betingelse</li>
          <li><strong>Dobbelsirkel</strong> (sirkel inni sirkel) = slutt</li>
          <li><strong>Tykk strek</strong> = synkronisering (parallelle baner deles/forenes)</li>
        </ul>

        <h3>Eksempel — innlogging</h3>
        <div className="not-prose">
          <ActivityDiagramSVG />
        </div>

        <div className="not-prose mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 text-sm text-neutral-700 dark:text-neutral-200">
          <strong className="text-blue-700 dark:text-blue-300">Tips:</strong>{" "}
          Atle har sagt at aktivitetsdiagram <em>kan</em> brukes i stedet for
          tekstlig brukstilfellebeskrivelse på oppgave 1a. Det er fullstendig OK
          eksamenssvar.
        </div>
      </TheorySummary>

      {/* 3.5 Tilstandsdiagram */}
      <TheorySummary
        title="3.5 Tilstandsdiagram — objektets tilstander"
        mustKnow={[
          "FORMÅL: viser hvilke tilstander et objekt kan være i, og hvilke hendelser som forårsaker overganger",
          "Bokser med avrundede hjørner = tilstander",
          "Piler = overganger; merket med 'hendelse [vakt] / handling'",
          "Brukes typisk for objekter som har et tydelig livsløp (Bestilling: Opprettet → Betalt → Sendt → Mottatt)",
          "Mindre vanlig på DAT109-eksamen, men kan dukke opp som teorispørsmål",
        ]}
      >
        <p>
          <strong>Definisjon:</strong> Et tilstandsdiagram beskriver
          <em> alle tilstander et objekt kan være i</em>, og
          <em> hvilke hendelser som flytter det fra én tilstand til en annen</em>.
        </p>

        <h3>Eksempel — Bestilling</h3>
        <div className="not-prose">
          <StateDiagramSVG />
        </div>

        <p className="text-sm text-[var(--muted)] mt-3">
          En bestilling starter som &quot;Opprettet&quot;. Når kunden ringer
          <code> betal()</code>, går den til &quot;Betalt&quot;. Hvis butikken
          ringer <code>send()</code>, går den til &quot;Sendt&quot; og deretter til
          slutt-tilstanden. Fra &quot;Betalt&quot; kan kunden også
          <code> kanseller()</code> tilbake til &quot;Opprettet&quot;.
        </p>
      </TheorySummary>

      {/* 3.6 Kommunikasjonsdiagram */}
      <TheorySummary
        title="3.6 Kommunikasjonsdiagram — alternativ til sekvens"
        mustKnow={[
          "FORMÅL: viser SAMME informasjon som et sekvensdiagram, men med fokus på relasjonene mellom objektene",
          "Objekter som rektangler, linjer mellom dem, meldinger NUMMERERT (1:, 2:, 3:) langs linjene",
          "Sjelden brukt i praksis — sekvensdiagram dominerer på eksamen",
          "Bra å vite at det FINNES og at det er ekvivalent",
        ]}
      >
        <p>
          <strong>Definisjon:</strong> Et kommunikasjonsdiagram (tidligere
          &quot;collaboration diagram&quot;) viser samme informasjon som et
          sekvensdiagram — hvilke meldinger sendes mellom hvilke objekter — men
          legger vekt på <em>relasjonene</em> i stedet for tidsaksen. Meldingene
          nummereres i stedet for å plasseres ovenfra og ned.
        </p>

        <div className="not-prose">
          <CommunicationDiagramSVG />
        </div>

        <p className="text-sm text-[var(--muted)] mt-3">
          Samme scenario som sekvensdiagrammet i 3.2 — men du ser strukturen
          (hvem snakker med hvem) tydeligere, og tidsaspektet svakere.
        </p>
      </TheorySummary>

      {/* ──── Seksjon 4: Synligheter ──── */}
      <TheorySummary
        title="4. Synligheter og notasjon i klassediagram"
        mustKnow={[
          "+ public — alle kan se det",
          "- private — bare klassen selv",
          "# protected — klassen og subklasser",
          "~ package/default — alle i samme pakke",
          "Statiske medlemmer UNDERSTREKES i UML",
          "Notasjonen mappes 1:1 til Java-modifikatorer",
        ]}
      >
        <p>
          Hvert attributt og hver metode i en klasse har en <strong>synlighet</strong>
          som styrer hvem som kan bruke det. Atle viser denne notasjonen direkte i F02.
        </p>

        <div className="not-prose my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-800 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Symbol</th>
                <th className="px-3 py-2 font-semibold">UML-navn</th>
                <th className="px-3 py-2 font-semibold">Java</th>
                <th className="px-3 py-2 font-semibold">Hvem kan se det?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr>
                <td className="px-3 py-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">+</td>
                <td className="px-3 py-2">public</td>
                <td className="px-3 py-2 font-mono">public</td>
                <td className="px-3 py-2">Alle</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-bold text-rose-600 dark:text-rose-400">-</td>
                <td className="px-3 py-2">private</td>
                <td className="px-3 py-2 font-mono">private</td>
                <td className="px-3 py-2">Bare denne klassen</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-bold text-amber-600 dark:text-amber-400">#</td>
                <td className="px-3 py-2">protected</td>
                <td className="px-3 py-2 font-mono">protected</td>
                <td className="px-3 py-2">Klassen + subklasser</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-bold text-blue-600 dark:text-blue-400">~</td>
                <td className="px-3 py-2">package/default</td>
                <td className="px-3 py-2 font-mono">(uten modifikator)</td>
                <td className="px-3 py-2">Alle i samme pakke</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Eksempel</h3>
        <div className="not-prose">
          <VisibilityNotationSVG />
        </div>

        <p className="text-sm text-[var(--muted)] mt-3">
          <strong>Konto</strong> har private saldo (skjult fra omverdenen),
          public kontonummer, protected rentesats (subklasser kan se den), og en
          understreket statisk teller for antall kontoer. Operasjonene følger
          samme mønster — <code>settInn</code> er public, mens <code>beregnRente</code>
          er en privat hjelpemetode.
        </p>

        <div className="not-prose mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-sm text-neutral-700 dark:text-neutral-200">
          <strong className="text-amber-700 dark:text-amber-400">Hvorfor private felter?</strong>{" "}
          Innkapsling (encapsulation) — ett av OOPs grunnprinsipper. Private
          felter tvinger andre klasser til å bruke offentlige metoder, slik at du
          kan endre <em>hvordan</em> noe er lagret uten å brekke kall fra utsiden.
          Se også <Link href="/dat109/ooa-ood/oop-fundamenter" className="text-sysdev-600 dark:text-sysdev-400 underline">OOP-fundamenter</Link>.
        </div>
      </TheorySummary>

      {/* ──── Seksjon 5: Fordeler ved UML ──── */}
      <TheorySummary
        title="5. Hvorfor bruke UML — fordelene"
        mustKnow={[
          "V2024 spurte om dette ordrett — svaret var 'Alle de ovennevnte'",
          "1) Enklere kommunikasjon mellom utviklere",
          "2) Bedre forståelse av systemets struktur og funksjonalitet",
          "3) Hjelp til å identifisere feil og problemer tidlig",
          "Standardisert notasjon = ingen tvetydighet, fungerer på tvers av team",
        ]}
      >
        <p>
          V2024 oppgave 2 hadde et spørsmål med fire alternativer der riktig svar
          var <strong>&quot;Alle de ovennevnte&quot;</strong>. De tre fordelene
          oppgitt var:
        </p>

        <div className="not-prose my-4 grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mb-1">
              Fordel 1
            </div>
            <div className="font-bold text-base text-neutral-800 dark:text-neutral-100 mb-2">
              Enklere kommunikasjon
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              Standardisert notasjon. Et UML-diagram tegnet av en student i
              Bergen forstås av en utvikler i Tokyo. Du slipper hjemmesnekrede
              notasjonssystemer.
            </p>
          </div>

          <div className="rounded-lg border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-1">
              Fordel 2
            </div>
            <div className="font-bold text-base text-neutral-800 dark:text-neutral-100 mb-2">
              Bedre forståelse
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              Strukturen og funksjonaliteten blir synlig. Et komplekst system
              som er &quot;klart i hodet&quot; viser seg ofte å være rotete når
              det tegnes. Diagrammet avslører tankegangen.
            </p>
          </div>

          <div className="rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-1">
              Fordel 3
            </div>
            <div className="font-bold text-base text-neutral-800 dark:text-neutral-100 mb-2">
              Tidlig feildeteksjon
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              Det er 100x billigere å rette en feil i et klassediagram enn i
              produksjonskode. Manglende relasjon, sirkulære avhengigheter,
              dårlig ansvarsfordeling — alt synes på papiret.
            </p>
          </div>
        </div>

        <h3>Bonus-fordeler (gode å nevne om åpent spørsmål)</h3>
        <ul>
          <li>
            <strong>Programmeringsspråk-uavhengig</strong> — samme klassediagram
            kan bli til Java, C# eller Python.
          </li>
          <li>
            <strong>Dokumentasjon som varer</strong> — diagrammene blir lest av
            framtidige utviklere som tar over koden.
          </li>
          <li>
            <strong>Designdiskusjon før implementasjon</strong> — du oppdager
            problemer i designfasen, ikke i debugging-fasen.
          </li>
          <li>
            <strong>Kobling til kravspesifikasjonen</strong> — brukstilfeller og
            domenemodell sporer direkte til hva kunden ba om.
          </li>
        </ul>
      </TheorySummary>

      {/* ──── Seksjon 6: Vanlige misforståelser ──── */}
      <TheorySummary
        title="6. Vanlige misforståelser om UML"
        mustKnow={[
          "UML er IKKE bare dokumentasjon — det er først og fremst et designverktøy",
          "Du trenger IKKE bruke alle 14 diagramtyper — velg det som hjelper",
          "UML er IKKE bundet til Java — det er språkuavhengig",
          "UML er IKKE en metodikk (Scrum/XP er metodikk) — UML er bare notasjon",
        ]}
      >
        <div className="not-prose my-4 space-y-3">
          <div className="rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
            <div className="font-bold text-rose-700 dark:text-rose-400 mb-1">
              Misforståelse 1: &quot;UML er bare for dokumentasjon&quot;
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              <strong>Feil.</strong> UML brukes først og fremst til å
              <em> designe</em> systemet — i analyse- og designfasen, før
              implementasjonen starter. Dokumentasjon er et bonus-bruksområde,
              ikke hovedformålet.
            </p>
          </div>

          <div className="rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
            <div className="font-bold text-rose-700 dark:text-rose-400 mb-1">
              Misforståelse 2: &quot;Alle UML-diagrammer må være med&quot;
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              <strong>Feil.</strong> UML 2.x har 14 diagramtyper, men du velger
              bare de som faktisk hjelper deg å kommunisere designet. På DAT109
              brukes typisk 4–5 diagramtyper. Tilstandsdiagram er ofte unødvendig
              for enkle CRUD-systemer.
            </p>
          </div>

          <div className="rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
            <div className="font-bold text-rose-700 dark:text-rose-400 mb-1">
              Misforståelse 3: &quot;UML er bundet til Java&quot;
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              <strong>Feil.</strong> UML er programmeringsspråk-uavhengig. Et
              klassediagram kan implementeres i Java, C#, Python, C++, Kotlin
              eller TypeScript — UML beskriver <em>strukturen</em>, ikke
              syntaksen.
            </p>
          </div>

          <div className="rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
            <div className="font-bold text-rose-700 dark:text-rose-400 mb-1">
              Misforståelse 4: &quot;UML er en utviklingsmetodikk&quot;
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              <strong>Feil.</strong> UML er bare et <em>notasjonsspråk</em>.
              Utviklingsmetodikker som Scrum, XP, AUP og kanban beskriver
              <em> hvordan</em> du jobber. UML beskriver <em>hva</em> du tegner.
              Du kan bruke UML i hvilken som helst metodikk.
            </p>
          </div>

          <div className="rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4">
            <div className="font-bold text-rose-700 dark:text-rose-400 mb-1">
              Misforståelse 5: &quot;Brukstilfellediagram er et flytdiagram&quot;
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              <strong>Klassisk eksamensfelle.</strong> Brukstilfellediagram har
              <em> ingen rekkefølge</em>, <em>ingen piler mellom brukstilfeller</em>,
              <em> ingen valg-rhomber</em>. Det er en oversikt over hva systemet kan
              gjøre — ikke et flytdiagram. Bruk aktivitetsdiagram hvis du trenger
              flyt.
            </p>
          </div>
        </div>
      </TheorySummary>

      {/* ──── Seksjon 7: Mini-quiz med V2024-spørsmål ──── */}
      <h2 className="text-2xl font-bold mt-12 mb-2">7. Mini-quiz — V2024-stil</h2>
      <p className="text-[var(--muted)] mb-6">
        Disse tre spørsmålene er ordrett (eller nesten ordrett) fra V2024-eksamen.
        De andre er bygget i samme stil. Klikk &quot;Vis svar&quot; etter at du
        har valgt selv mentalt.
      </p>

      <div className="space-y-3 mb-8">
        <MCQ
          q="Hva er formålet med et sekvensdiagram?"
          options={[
            "Å vise strukturen til et system",
            "Å vise hvordan objekter samhandler over tid",
            "Å definere testtilfeller",
            "Å modellere databaseskjema",
          ]}
          correct={1}
          explanation="V2024-spørsmål. Sekvensdiagram = objekt-interaksjon over tid. Tid går nedover, meldinger sendes som piler mellom livslinjer."
        />

        <MCQ
          q="Hva er formålet med et klassediagram?"
          options={[
            "Å vise hvordan objekter samhandler over tid",
            "Å beskrive arbeidsflyt og beslutninger",
            "Å vise strukturen til et system og relaterte klasser",
            "Å beskrive fysisk plassering av servere",
          ]}
          correct={2}
          explanation="V2024-spørsmål. Klassediagram = strukturen til systemet og klassene det består av."
        />

        <MCQ
          q="Hvilke av følgende er en fordel med å bruke UML?"
          options={[
            "Enklere kommunikasjon mellom utviklere",
            "Bedre forståelse av systemets struktur og funksjonalitet",
            "Hjelp til å identifisere feil og problemer tidlig",
            "Alle de ovennevnte",
          ]}
          correct={3}
          explanation="V2024-spørsmål. Alle tre er ekte fordeler — riktig svar er 'Alle de ovennevnte'."
        />

        <MCQ
          q="Hva er det riktige UML-symbolet for 'private' synlighet?"
          options={["+", "-", "#", "~"]}
          correct={1}
          explanation="Minus (-) = private. Pluss (+) = public, hash (#) = protected, tilde (~) = package/default."
        />

        <MCQ
          q="I et brukstilfellediagram, hva representerer en oval?"
          options={[
            "En aktør (bruker)",
            "Et brukstilfelle (use case)",
            "En beslutning",
            "Systemgrensen",
          ]}
          correct={1}
          explanation="Oval = brukstilfelle. Aktør = strekfigur, beslutning hører ikke hjemme i brukstilfellediagram (det er aktivitetsdiagram), systemgrense = rektangel rundt brukstilfellene."
        />

        <MCQ
          q="Hvilke to hovedkategorier deles UML-diagrammene inn i?"
          options={[
            "Statiske og dynamiske",
            "Strukturelle og atferdsmessige",
            "Analyse og design",
            "Klasse og objekt",
          ]}
          correct={1}
          explanation="UML 2.x deler i strukturelle (klasse, objekt, pakke, komponent, utrullings) og atferdsmessige (brukstilfelle, aktivitet, sekvens, tilstand, kommunikasjon)."
        />

        <MCQ
          q="Hvilket diagram er BEST egnet for å vise hva en bruker kan gjøre med systemet?"
          options={[
            "Klassediagram",
            "Sekvensdiagram",
            "Brukstilfellediagram",
            "Tilstandsdiagram",
          ]}
          correct={2}
          explanation="Brukstilfellediagram modellerer funksjonelle krav fra brukerens perspektiv — akkurat det spørsmålet beskriver."
        />

        <MCQ
          q="I et aktivitetsdiagram, hva betyr en rhombe (diamant)?"
          options={[
            "En aktivitet",
            "En beslutning/valg",
            "Start av flyten",
            "Et objekt",
          ]}
          correct={1}
          explanation="Rhombe = beslutning, med [vakter] på utgående piler. Avrundet rektangel = aktivitet, fylt sirkel = start, dobbelsirkel = slutt."
        />

        <MCQ
          q="Hvilket diagram viser objektets livssyklus — alle tilstander det kan være i?"
          options={[
            "Sekvensdiagram",
            "Tilstandsdiagram",
            "Klassediagram",
            "Komponentdiagram",
          ]}
          correct={1}
          explanation="Tilstandsdiagram viser tilstander og overganger — typisk for objekter med tydelig livsløp (Bestilling: Opprettet → Betalt → Sendt)."
        />

        <MCQ
          q="Et klassediagram brukt som domenemodell skal IKKE inneholde:"
          options={[
            "Klassenavn",
            "Attributter",
            "Relasjoner mellom klasser",
            "Metoder/operasjoner",
          ]}
          correct={3}
          explanation="Domenemodellen er en analyse-artefakt. Den viser begreper, attributter og relasjoner — IKKE metoder. Metoder kommer først i utformingsmodellen (design)."
        />
      </div>

      {/* Relaterte sider */}
      <div className="mt-12 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h3 className="font-bold text-lg mb-3">Gå videre</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/dat109/modellering"
            className="block rounded-lg border border-[var(--card-border)] p-3 hover:border-sysdev-400 transition-colors"
          >
            <div className="font-medium">Modellering — bruk UML i praksis</div>
            <div className="text-sm text-[var(--muted)]">Brukstilfelle, domenemodell, sekvensdiagram steg-for-steg</div>
          </Link>
          <Link
            href="/dat109/ooa-ood/oop-fundamenter"
            className="block rounded-lg border border-[var(--card-border)] p-3 hover:border-sysdev-400 transition-colors"
          >
            <div className="font-medium">OOP-fundamenter</div>
            <div className="text-sm text-[var(--muted)]">De 7 OO-egenskapene, klasse vs objekt</div>
          </Link>
          <Link
            href="/dat109/oop/uml-til-java"
            className="block rounded-lg border border-[var(--card-border)] p-3 hover:border-sysdev-400 transition-colors"
          >
            <div className="font-medium">UML → Java</div>
            <div className="text-sm text-[var(--muted)]">Hvordan oversette klassediagram til Java-kode</div>
          </Link>
          <Link
            href="/dat109/eksamen/oppgave-2-ooa-ood"
            className="block rounded-lg border border-[var(--card-border)] p-3 hover:border-sysdev-400 transition-colors"
          >
            <div className="font-medium">Eksamen — Oppgave 2 OOA/OOD</div>
            <div className="text-sm text-[var(--muted)]">Flere V2024-spørsmål med fasit</div>
          </Link>
        </div>
      </div>

      {/* Pensum-kilder */}
      <div className="mt-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)]/50 p-5 text-sm">
        <div className="font-bold text-[var(--muted)] uppercase tracking-wide text-xs mb-2">
          Pensum-kilder
        </div>
        <ul className="space-y-1 text-[var(--muted)]">
          <li>• F02 2025 — UML.pptx (22 slides, dedikert hele forelesningen, Atle Geitung)</li>
          <li>• Eksamen V2024 oppgave 2 — flervalg om sekvens-/klassediagram-formål, UML-fordeler</li>
          <li>• uml-diagrams.org (lenket fra semesterplan)</li>
          <li>• Sommerville — Software Engineering, kap. om UML-modellering</li>
        </ul>
      </div>
    </div>
  );
}
