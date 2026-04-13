"use client";

import { useState, useMemo } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 4)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Kraftdekomponering ─── */
function KraftDekomponering() {
  const [F, setF] = useState(250);
  const [angle, setAngle] = useState(53);

  const rad = (angle * Math.PI) / 180;
  const Fx = F * Math.cos(rad);
  const Fy = F * Math.sin(rad);
  const Fmag = Math.sqrt(Fx * Fx + Fy * Fy);

  const cx = 200, cy = 160;
  const scale = 0.4;
  const tipX = cx + Fx * scale;
  const tipY = cy - Fy * scale;
  const compXtip = cx + Fx * scale;
  const compYtip = cy - Fy * scale;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">
        Kraftdekomponering — Splitt en kraft i komponenter
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Kraftens størrelse F (N)
          </label>
          <input
            type="range" min={10} max={500} step={10} value={F}
            onChange={(e) => setF(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{F} N</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Vinkel med x-aksen (grader)
          </label>
          <input
            type="range" min={0} max={90} step={1} value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <svg viewBox="0 0 400 320" className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <defs>
            <marker id="arr-f" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#f97316" />
            </marker>
            <marker id="arr-fx" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
            </marker>
            <marker id="arr-fy" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
            </marker>
          </defs>
          {/* Axes */}
          <line x1="30" y1={cy} x2="380" y2={cy} stroke="var(--muted)" strokeWidth="1" />
          <line x1={cx} y1="10" x2={cx} y2="310" stroke="var(--muted)" strokeWidth="1" />
          <text x="385" y={cy + 4} fontSize="12" fill="var(--muted)">x</text>
          <text x={cx + 4} y="14" fontSize="12" fill="var(--muted)">y</text>

          {/* Fx component (blue, dashed) */}
          <line x1={cx} y1={cy} x2={compXtip} y2={cy}
            stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#arr-fx)" />
          <text x={(cx + compXtip) / 2} y={cy + 20} fontSize="11" fill="#3b82f6" textAnchor="middle">
            Fx = {Fx.toFixed(0)} N
          </text>

          {/* Fy component (green, dashed) */}
          <line x1={compXtip} y1={cy} x2={compXtip} y2={compYtip}
            stroke="#22c55e" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#arr-fy)" />
          <text x={compXtip + 15} y={(cy + compYtip) / 2} fontSize="11" fill="#22c55e">
            Fy = {Fy.toFixed(0)} N
          </text>

          {/* F vector (orange) */}
          <line x1={cx} y1={cy} x2={tipX} y2={tipY}
            stroke="#f97316" strokeWidth="3" markerEnd="url(#arr-f)" />
          <text x={(cx + tipX) / 2 - 30} y={(cy + tipY) / 2 - 5} fontSize="12" fill="#f97316" fontWeight="bold">
            F = {Fmag.toFixed(0)} N
          </text>

          {/* Angle arc */}
          {angle > 0 && (
            <>
              <path
                d={`M ${cx + 40} ${cy} A 40 40 0 0 0 ${cx + 40 * Math.cos(rad)} ${cy - 40 * Math.sin(rad)}`}
                fill="none" stroke="var(--muted)" strokeWidth="1"
              />
              <text x={cx + 50} y={cy - 10} fontSize="11" fill="var(--muted)">{angle}°</text>
            </>
          )}
        </svg>

        <div className="space-y-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-2">Komponenter</p>
            <p className="font-mono text-sm">Fx = F cos({angle}°) = <strong>{Fx.toFixed(1)} N</strong></p>
            <p className="font-mono text-sm">Fy = F sin({angle}°) = <strong>{Fy.toFixed(1)} N</strong></p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-2">Verifisering</p>
            <p className="font-mono text-sm">
              |F| = √(Fx² + Fy²) = √({Fx.toFixed(0)}² + {Fy.toFixed(0)}²) = <strong>{Fmag.toFixed(1)} N</strong>
            </p>
            <p className="font-mono text-sm">
              θ = tan⁻¹(Fy/Fx) = tan⁻¹({Fy.toFixed(0)}/{Fx.toFixed(0)}) = <strong>{(Math.atan2(Fy, Fx) * 180 / Math.PI).toFixed(1)}°</strong>
            </p>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Dra i sliderne for å endre kraft og vinkel. Legg merke til hvordan komponentene endres.
            Ved 0° er all kraft langs x-aksen. Ved 90° er all kraft langs y-aksen.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: Tyngde på jord vs. måne ─── */
function TyngdeKalkulator() {
  const [masse, setMasse] = useState(75);
  const gJord = 9.81;
  const gMaane = 1.6;
  const Gj = masse * gJord;
  const Gm = masse * gMaane;

  const maxG = 120 * gJord;
  const barJord = (Gj / maxG) * 200;
  const barMaane = (Gm / maxG) * 200;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Masse vs. tyngde — Jorda og månen</h3>
      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1">Masse (kg)</label>
        <input
          type="range" min={1} max={120} step={1} value={masse}
          onChange={(e) => setMasse(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <p className="text-center text-sm font-mono mt-1">{masse} kg</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Jorda (g = 9,81 m/s²)</p>
          <svg viewBox="0 0 220 120" className="w-full max-w-[220px] mx-auto">
            <rect x="10" y="80" width={barJord} height="30" fill="#f97316" rx="4" />
            <text x={Math.max(barJord / 2 + 10, 40)} y="100" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
              {Gj.toFixed(0)} N
            </text>
            {/* Person icon */}
            <circle cx="110" cy="30" r="12" fill="var(--muted)" opacity="0.5" />
            <line x1="110" y1="42" x2="110" y2="65" stroke="var(--muted)" strokeWidth="2" opacity="0.5" />
            {/* Weight arrow */}
            <line x1="110" y1="65" x2="110" y2="78" stroke="#f97316" strokeWidth="2.5" />
            <polygon points="105,78 115,78 110,85" fill="#f97316" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Månen (g = 1,6 m/s²)</p>
          <svg viewBox="0 0 220 120" className="w-full max-w-[220px] mx-auto">
            <rect x="10" y="80" width={barMaane} height="30" fill="#3b82f6" rx="4" />
            <text x={Math.max(barMaane / 2 + 10, 40)} y="100" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
              {Gm.toFixed(0)} N
            </text>
            <circle cx="110" cy="30" r="12" fill="var(--muted)" opacity="0.5" />
            <line x1="110" y1="42" x2="110" y2="65" stroke="var(--muted)" strokeWidth="2" opacity="0.5" />
            <line x1="110" y1="65" x2="110" y2="78" stroke="#3b82f6" strokeWidth="2.5" />
            <polygon points="105,78 115,78 110,85" fill="#3b82f6" />
          </svg>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm text-center">
        <p>Massen er den <strong>samme</strong> overalt: <strong>{masse} kg</strong></p>
        <p>Tyngden er <strong>forskjellig</strong>: {Gj.toFixed(0)} N på jorda vs. {Gm.toFixed(0)} N på månen</p>
        <p className="text-[var(--muted)]">Tyngden på månen er bare {((Gm / Gj) * 100).toFixed(0)}% av tyngden på jorda!</p>
      </div>
    </div>
  );
}

/* ─── Interactive: Fritt-legeme-diagram ─── */
function FrittLegemeDiagram() {
  const [scenario, setScenario] = useState<"ro" | "akselererer" | "skraaplan">("ro");

  const scenarios = {
    ro: {
      label: "Kloss i ro på bord",
      forces: [
        { name: "N", x: 0, y: -60, color: "#3b82f6", desc: "Normalkraft (fra bordet)" },
        { name: "G", x: 0, y: 60, color: "#ef4444", desc: "Tyngdekraft (fra jorda)" },
      ],
      eq: "\\sum F_y = N - G = 0 \\;\\Rightarrow\\; N = G = mg",
      info: "Klossen er i ro → ΣF = 0. Normalkraften balanserer tyngden.",
    },
    akselererer: {
      label: "Kloss dyttes horisontalt",
      forces: [
        { name: "N", x: 0, y: -60, color: "#3b82f6", desc: "Normalkraft" },
        { name: "G", x: 0, y: 60, color: "#ef4444", desc: "Tyngdekraft" },
        { name: "F", x: 70, y: 0, color: "#f97316", desc: "Dyttekraft" },
      ],
      eq: "\\sum F_x = F = ma, \\quad \\sum F_y = N - mg = 0",
      info: "Klossen akselererer mot høyre. Vertikalt er det likevekt.",
    },
    skraaplan: {
      label: "Kloss på skråplan (friksjonsløst)",
      forces: [
        { name: "N", x: -42, y: -42, color: "#3b82f6", desc: "Normalkraft (vinkelrett på planet)" },
        { name: "G", x: 0, y: 60, color: "#ef4444", desc: "Tyngdekraft (loddrett ned)" },
      ],
      eq: "\\sum F_x = mg\\sin\\alpha = ma, \\quad \\sum F_y = N - mg\\cos\\alpha = 0",
      info: "Aksene roteres langs planet. Tyngden dekomponeres i to komponenter.",
    },
  };

  const s = scenarios[scenario];

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Fritt-legeme-diagram — Velg scenario</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
          <button key={key} onClick={() => setScenario(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              scenario === key
                ? "bg-[var(--accent)] text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-[var(--foreground)] hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {scenarios[key].label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <svg viewBox="0 0 300 260" className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <defs>
            <marker id="fbd-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="context-stroke" />
            </marker>
          </defs>

          {/* Object */}
          <rect x="125" y="105" width="50" height="50" fill="var(--card-border)" stroke="var(--muted)" strokeWidth="1.5" rx="4" />
          <text x="150" y="135" fontSize="12" fill="var(--foreground)" textAnchor="middle">m</text>

          {/* Forces */}
          {s.forces.map((f, i) => {
            const ox = 150, oy = 130;
            return (
              <g key={i}>
                <line x1={ox} y1={oy} x2={ox + f.x} y2={oy + f.y}
                  stroke={f.color} strokeWidth="3" markerEnd="url(#fbd-arr)" />
                <text x={ox + f.x * 1.25} y={oy + f.y * 1.25 + 4}
                  fontSize="14" fill={f.color} fontWeight="bold" textAnchor="middle">
                  {f.name}
                </text>
              </g>
            );
          })}

          {/* Ground or incline */}
          {scenario !== "skraaplan" ? (
            <line x1="50" y1="156" x2="250" y2="156" stroke="var(--muted)" strokeWidth="2" />
          ) : (
            <line x1="50" y1="220" x2="250" y2="100" stroke="var(--muted)" strokeWidth="2" />
          )}
        </svg>

        <div className="space-y-3">
          <div className="space-y-1">
            {s.forces.map((f, i) => (
              <p key={i} className="text-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                <strong>{f.name}</strong>: {f.desc}
              </p>
            ))}
          </div>
          <FormulaBox latex={s.eq} variant="blue" />
          <p className="text-sm text-[var(--muted)]">{s.info}</p>
        </div>
      </div>
    </div>
  );
}

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ══════════════════════════════════════════════
          1. TEORISAMMENDRAG
          ══════════════════════════════════════════════ */}
      <div id="teorisammendrag">
        <h2 className="text-2xl font-bold mt-10 mb-6">Teorisammendrag</h2>

        {/* 4.1 Kraft og vekselvirkning */}
        <TheorySummary
          title="4.1 Kraft og vekselvirkning"
          mustKnow={[
            "Kraft er en vektorstørrelse — har både verdi (N) og retning",
            "Kontaktkrefter virker ved kontakt, fjernkrefter virker over avstand",
            "Krefter dekomponeres i x-, y- og z-komponenter",
            "Summen av alle krefter: ΣF = F₁ + F₂ + ... + Fₙ (vektorsum)",
          ]}
        >
          <p>
            Krefter kan være <strong>tiltrekkende</strong> eller <strong>frastøtende</strong> (trekke/skyve).
            Siden krefter har både verdi og retning, er de <strong>vektorer</strong> og adderes som vektorer.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">To typer krefter</p>
            <p><strong>Kontaktkrefter:</strong> Virker ved direkte kontakt mellom legemer (normalkraft, friksjon, snordrag).</p>
            <p className="mt-1"><strong>Fjernkrefter:</strong> Virker over avstand uten kontakt (tyngdekraft, elektrisk kraft, magnetisk kraft).</p>
          </div>

          <p>
            Måleenheten for kraft er <strong>Newton</strong> (N). Krefter dekomponerer vi ofte i x-, y-
            og z-komponenter:
          </p>
          <FormulaBox
            latex="\vec{F} = F_x\,\hat{x} + F_y\,\hat{y}, \quad F_x = F\cos\theta, \quad F_y = F\sin\theta"
            title="Kraftdekomponering"
            variant="gold"
            description="θ er vinkelen mellom kraftvektoren og x-aksen."
          />
        </TheorySummary>

        {/* 4.2 Newtons første lov */}
        <TheorySummary
          title="4.2 Newtons første lov (treghetsloven)"
          mustKnow={[
            "ΣF = 0 ⟹ legemet har konstant fart (inkludert v = 0)",
            "Treghet: et legemes motstand mot å endre bevegelsestilstand",
            "Gjelder i inertialreferanserammer (ikke-akselererende)",
            "Ingen kraft trengs for å opprettholde konstant fart!",
          ]}
        >
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Newtons 1. lov</p>
            <p>
              Når kraftsummen på et legeme er null, vil legemet bevege seg med
              rettlinjet konstant fart (ingen akselerasjon). Farten kan også være null.
            </p>
          </div>

          <p>
            Denne egenskapen kalles <strong>treghet</strong> — et legemes manglende evne til å endre fart
            uten at det virker en netto kraft på det.
          </p>

          <p className="mt-3">
            <strong>Eksempel:</strong> En hockeypuck på friksjonsløs is. Ligger den i ro, forblir den i ro
            (<InlineLatex latex="N = G" />, ingen netto kraft). Beveger den seg med konstant fart{" "}
            <InlineLatex latex="v" />, fortsetter den med samme fart i samme retning.
          </p>

          <p className="mt-3">
            <strong>Eksempel:</strong> Du kjører rettlinjet med konstant fart 100 km/h på motorveien.
            Hvor stor er kraftsummen på bilen? Svar: <InlineLatex latex="\sum\vec{F} = 0" />.
            Og på sjåføren? Også <InlineLatex latex="\sum\vec{F} = 0" />.
            Motorkraften balanserer friksjon og luftmotstand eksakt.
          </p>

          <FormulaBox
            latex="\sum \vec{F} = 0 \;\Longleftrightarrow\; \vec{v} = \text{konstant}"
            title="Newtons 1. lov"
            variant="gold"
          />
        </TheorySummary>

        {/* 4.3 Newtons andre lov */}
        <TheorySummary
          title="4.3 Newtons andre lov"
          mustKnow={[
            "ΣF = ma — kraftsummen er proporsjonal med akselerasjonen",
            "1 N = 1 kg · m/s² (kraften som gir 1 kg en akselerasjon på 1 m/s²)",
            "På komponentform: ΣFx = max, ΣFy = may, ΣFz = maz",
            "Gjelder bare når massen er konstant",
          ]}
        >
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Newtons 2. lov</p>
            <p>
              Når kraftsummen på et legeme er <em>ikke</em> null, vil legemet akselerere.
              Kraftsummen er proporsjonal med akselerasjonen.
            </p>
          </div>

          <FormulaBox
            latex="\sum \vec{F} = m\vec{a}"
            title="Newtons 2. lov"
            variant="gold"
            description="Den viktigste likningen i mekanikk! m er legemets masse (konstant)."
          />

          <p className="mt-3">
            Masse er et mål for hvor mye stoff et legeme inneholder. Måles i <strong>kg</strong>.
          </p>

          <p className="mt-3">
            <strong>På komponentform</strong> (dette er slik vi løser oppgaver!):
          </p>
          <FormulaBox
            latex="\sum F_x = ma_x, \qquad \sum F_y = ma_y, \qquad \sum F_z = ma_z"
            title="Komponentform"
            variant="gold"
            description="Vi setter opp én likning for hver retning. Dette er nøkkelen til å løse alle Newton-oppgaver."
          />

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Viktig begrensning</p>
            <p className="text-sm">
              <InlineLatex latex="\sum\vec{F} = m\vec{a}" /> gjelder bare når massen er <strong>konstant</strong>.
              Moteksempler: vannvåpe, rakett (massen endres fordi masse forlater systemet).
            </p>
          </div>
        </TheorySummary>

        {/* 4.4 Masse og tyngde */}
        <TheorySummary
          title="4.4 Masse og tyngde"
          mustKnow={[
            "Masse (m, kg) er en egenskap — lik overalt i universet",
            "Tyngde (G, N) er gravitasjonskraften — avhenger av hvor du er",
            "G = mg, der g = 9,81 m/s² ved havoverflaten",
            "Tyngde varierer med sted (breddegrad, høyde), masse gjør det ikke",
          ]}
        >
          <p>
            <strong>Masse</strong> er en egenskap som forteller noe om et legemes treghet. Måles i kg.
          </p>
          <p className="mt-2">
            <strong>Tyngde</strong> er tyngdekraften som virker på et legeme. Måles i N.
            Den virker på alle legemer med masse, uansett om de er i ro eller i bevegelse.
          </p>

          <FormulaBox
            latex="G = mg"
            title="Tyngdekraft"
            variant="gold"
            description="G er tyngdekraften (N), m er massen (kg), g er tyngdeakselerasjonen (m/s²)."
          />

          <p className="mt-3">
            Ved havoverflaten: <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" />.
            Varierer noe med breddegrad. <InlineLatex latex="g" /> blir mindre når vi beveger oss oppover
            i atmosfæren. På månen er <InlineLatex latex="g = 1{,}6\;\text{m/s}^2" />.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Masse vs. tyngde — Nøkkelforskjell</p>
            <p className="text-sm">
              Tyngden til et legeme varierer fra sted til sted.
              Massen til et legeme er den <strong>samme alle steder</strong>.
            </p>
            <p className="text-sm mt-1">
              Eksempel: &ldquo;Alle&rdquo; kan på månen løfte en person på 100 kg.
              Men det å <em>viste</em> (akselerere) personen er like slitsomt på månen som på jorda — treghet avhenger av masse, ikke tyngde!
            </p>
          </div>
        </TheorySummary>

        {/* 4.5 Newtons tredje lov */}
        <TheorySummary
          title="4.5 Newtons tredje lov (kraft–motkraft)"
          mustKnow={[
            "F_AB = −F_BA — kraft og motkraft er like store og motsatt rettet",
            "Kraft og motkraft virker på ULIKE legemer (aldri på samme!)",
            "Kraft og motkraft er alltid av samme type (gravitasjon↔gravitasjon, kontakt↔kontakt)",
            "Et legeme kan ikke utøve kraft på seg selv",
          ]}
        >
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Newtons 3. lov</p>
            <p>
              Når legeme A virker på legeme B med en kraft, vil B virke tilbake på
              legeme A med en like stor, motsatt rettet kraft. Kreftene virker på <em>hvert sitt legeme</em>.
            </p>
          </div>

          <FormulaBox
            latex="\vec{F}_{AB} = -\vec{F}_{BA}"
            title="Newtons 3. lov (kraft–motkraft-par)"
            variant="gold"
            description="F_AB = kraften fra A på B. F_BA = kraften fra B på A. De er like store, men motsatt rettet."
          />

          <p className="mt-3">
            <strong>Eksempel:</strong> Når du sparker en fotball, virker skoen med en kraft på ballen (<InlineLatex latex="\vec{F}_{AB}" />).
            Samtidig virker ballen med en like stor kraft tilbake på skoen (<InlineLatex latex="\vec{F}_{BA}" />).
          </p>

          <p className="mt-3">
            <strong>Eksempel (eple og jord):</strong> Jorda drar eplet ned med tyngdekraften (<InlineLatex latex="\vec{F}_{BA}" />).
            Eplet drar jorda opp med en like stor kraft (<InlineLatex latex="\vec{F}_{AB}" />).
            Jorda akselererer bare umerkelig fordi dens masse er enorm.
          </p>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Typisk feil: &ldquo;N = mg er N3L&rdquo;</p>
            <p className="text-sm">
              Normalkraft <InlineLatex latex="N" /> og tyngde <InlineLatex latex="G = mg" /> er IKKE et kraft-motkraft-par!
              De virker begge på <em>samme</em> legeme. Kraft-motkraft virker alltid på <em>ulike</em> legemer.
            </p>
            <p className="text-sm mt-1">
              At <InlineLatex latex="N = mg" /> på en flat overflate følger fra N1L (<InlineLatex latex="\sum F_y = 0" />), ikke N3L.
            </p>
          </div>
        </TheorySummary>

        {/* 4.6 Fritt-legeme-diagrammer */}
        <TheorySummary
          title="4.6 Fritt-legeme-diagrammer"
          mustKnow={[
            "N1L og N2L gjelder for ETT legeme om gangen",
            "Tegn legemet isolert med ALLE krefter som virker PÅ det",
            "Velg koordinatsystem, dekomponer krefter, anvend ΣF = ma",
            "Flere legemer → ett FBD per legeme, koble med N3L",
          ]}
        >
          <p>
            Newtons første og andre lov gjelder for <strong>ett legeme</strong> om gangen.
            Ved å tegne dette legemet isolert sammen med alle kreftene som virker på det,
            blir det lettere å løse oppgaven. Vi har da tegnet et <strong>fritt-legeme-diagram</strong> (FBD).
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Oppskrift for fritt-legeme-diagram</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Tegn figur av situasjonen</li>
              <li>Velg legemet du vil studere — tegn det isolert</li>
              <li>Tegn inn <strong>alle krefter</strong> som virker <em>på</em> legemet</li>
              <li>Velg koordinatsystem, dekomponer kreftene</li>
              <li>Anvend <InlineLatex latex="\sum F_x = ma_x" /> og <InlineLatex latex="\sum F_y = ma_y" /></li>
              <li>Løs likningene</li>
              <li>Vurder svaret — er det rimelig?</li>
            </ol>
          </div>
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaBox
            latex="\sum \vec{F} = m\vec{a}"
            title="Newtons 2. lov"
            variant="gold"
            description="Den fundamentale likningen i mekanikk"
          />
          <FormulaBox
            latex="G = mg"
            title="Tyngdekraft"
            variant="gold"
            description="g = 9,81 m/s² ved havoverflaten"
          />
          <FormulaBox
            latex="\sum F_x = ma_x, \quad \sum F_y = ma_y"
            title="Komponentform"
            variant="gold"
            description="Slik løser vi oppgavene i praksis"
          />
          <FormulaBox
            latex="\vec{F}_{AB} = -\vec{F}_{BA}"
            title="Newtons 3. lov"
            variant="gold"
            description="Kraft og motkraft — like store, motsatt rettet, på ulike legemer"
          />
        </div>

        <FormulaBox
          latex="F_x = F\cos\theta, \quad F_y = F\sin\theta, \quad F = \sqrt{F_x^2 + F_y^2}"
          title="Kraftdekomponering og sammensetning"
          variant="blue"
          description="θ er vinkelen med x-aksen. Brukes til å splitte en kraft i komponenter, eller finne resultanten."
        />

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-4">
          <h3 className="font-semibold text-lg mb-3">Når bruker du hva?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Situasjon</th>
                  <th className="text-left py-2">Nøkkellikning</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Legeme i ro eller konstant fart</td>
                  <td className="py-2"><InlineLatex latex="\sum F = 0" /> (N1L)</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Legeme akselererer</td>
                  <td className="py-2"><InlineLatex latex="\sum F = ma" /> (N2L)</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Finne tyngdekraft</td>
                  <td className="py-2"><InlineLatex latex="G = mg" /></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Koble krefter mellom to legemer</td>
                  <td className="py-2"><InlineLatex latex="\vec{F}_{AB} = -\vec{F}_{BA}" /> (N3L)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. INTERAKTIVE VISUALISERINGER
          ══════════════════════════════════════════════ */}
      <div id="visualiseringer">
        <h2 className="text-2xl font-bold mt-12 mb-6">Interaktive visualiseringer</h2>
        <KraftDekomponering />
        <TyngdeKalkulator />
        <FrittLegemeDiagram />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eks 1: Kraftdekomponering */}
        <ExerciseCard
          number={1}
          title="Resultantkraft fra tre krefter"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Tre krefter virker på et legeme: <InlineLatex latex="F_1 = 250\;\text{N}" /> i en vinkel 53° over positiv x-akse,{" "}
                <InlineLatex latex="F_2 = 50\;\text{N}" /> langs positiv x-akse, og{" "}
                <InlineLatex latex="F_3 = 120\;\text{N}" /> langs negativ y-akse.
              </p>
              <p className="mt-2">Finn summen <InlineLatex latex="\sum\vec{F}" /> (verdi og retning).</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Dekomponer F₁ i x- og y-komponenter. F₂ og F₃ har bare én komponent hver.</p> },
            { label: "Hint 2", content: <p>Summer x- og y-komponentene separat, finn deretter resultanten med Pythagoras.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1: Dekomponer og summer</strong></p>
              <FormulaBox latex="\sum F_x = F_2 - F_1\cos 53° = 50 - 250\cos 53° = -100\;\text{N}" variant="blue" />
              <FormulaBox latex="\sum F_y = F_1\sin 53° - F_3 = 250\sin 53° - 120 = 80\;\text{N}" variant="blue" />

              <p><strong>Steg 2: Resultantens størrelse</strong></p>
              <FormulaBox latex="\sum F = \sqrt{(-100)^2 + 80^2} = \sqrt{16400} = \underline{\underline{128\;\text{N}}}" variant="gold" />

              <p><strong>Steg 3: Retning</strong></p>
              <FormulaBox latex="\tan\alpha = \frac{80}{100} = 0{,}8 \;\Rightarrow\; \alpha = \underline{\underline{39°}}" variant="gold" />
              <p className="text-sm">Resultanten peker 39° over negativ x-akse (2. kvadrant).</p>
            </div>
          }
        />

        {/* Eks 2: N2L — ishockeypuck */}
        <ExerciseCard
          number={2}
          title="Ishockeypuck — F = ma"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ishockeypuck med masse <InlineLatex latex="m = 0{,}2\;\text{kg}" /> dyttes horisontalt med en kraft{" "}
                <InlineLatex latex="F = 100\;\text{N}" /> på friksjonsløs is. Finn akselerasjonen.
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Vertikalt: N = G (likevekt). Horisontalt: bare F virker.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong> F = 100 N, m = 0,2 kg, friksjonsløs → kun F horisontalt.</p>
              <p><strong>FBD:</strong> N (opp), G (ned), F (til høyre). N = G → likevekt vertikalt.</p>
              <FormulaBox latex="\sum F_x = F = ma \;\Rightarrow\; a = \frac{F}{m} = \frac{100}{0{,}2} = \underline{\underline{500\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm"><strong>Hva lærte vi?</strong> Små masse + stor kraft = enorm akselerasjon. Sjekk: enheten N/kg = m/s² stemmer.</p>
            </div>
          }
        />

        {/* Eks 3: N2L — bil akselererer */}
        <ExerciseCard
          number={3}
          title="Bil akselererer"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En bil med masse <InlineLatex latex="m = 1200\;\text{kg}" /> akselererer med{" "}
                <InlineLatex latex="a = 1{,}3\;\text{m/s}^2" />. Finn kraftsummen på bilen.
              </p>
            </div>
          }
          solution={
            <div className="space-y-3">
              <FormulaBox latex="\sum F = ma = 1200 \cdot 1{,}3 = \underline{\underline{1560\;\text{N}}}" variant="gold" />
              <p className="text-sm">
                <strong>FBD:</strong> N (opp), G (ned), drivkraft R (fremover). N = G vertikalt.
                Kraftsummen er horisontalt fremover.
              </p>
            </div>
          }
        />

        {/* Eks 4: Masse og tyngde */}
        <ExerciseCard
          number={4}
          title="Tyngde på jord og måne"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                Fysikklæreren har masse 75 kg. Hva er tyngden på jorda? På månen
                (<InlineLatex latex="g_{\text{m}} = 1{,}6\;\text{m/s}^2" />)?
              </p>
            </div>
          }
          solution={
            <div className="space-y-3">
              <FormulaBox latex="G_{\text{jord}} = mg = 75 \cdot 9{,}81 = \underline{\underline{736\;\text{N}}}" variant="gold" />
              <FormulaBox latex="G_{\text{måne}} = mg_{\text{m}} = 75 \cdot 1{,}6 = \underline{\underline{120\;\text{N}}}" variant="gold" />
              <p className="text-sm">Massen er 75 kg begge steder. Tyngden på månen er bare 16% av tyngden på jorda.</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          5. OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <div id="strategier">
        <h2 className="text-2xl font-bold mt-12 mb-6">Oppgavestrategier</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Generell oppskrift — Newtons lover</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Tegn figur</strong> av den fysiske situasjonen</li>
              <li><strong>Fritt-legeme-diagram</strong> for hvert legeme</li>
              <li><strong>Tegn inn alle krefter</strong> som virker på legemet</li>
              <li><strong>Velg koordinatsystem</strong> — gjerne langs bevegelsesretningen</li>
              <li><strong>Dekomponer</strong> krefter i x- og y-komponenter</li>
              <li><strong>Sett opp</strong> <InlineLatex latex="\sum F_x = ma_x" /> og <InlineLatex latex="\sum F_y = ma_y" /></li>
              <li><strong>Løs likningene</strong></li>
              <li><strong>Vurder svaret</strong> — er fortegn, enhet og størrelsesorden rimelig?</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Glemmer krefter i FBD (spesielt normalkraft eller tyngdekraft)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Tegner inn &ldquo;ma&rdquo; som en kraft i diagrammet — akselerasjon er IKKE en kraft!</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Tror N = mg alltid. Det gjelder bare på flatt underlag uten vertikale ekstra-krefter</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Blander kraft-motkraft (virker på ulike legemer) med likevekt (på samme legeme)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Glemmer å velge koordinatsystem og definere positiv retning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Inkluderer krefter som virker på <em>andre</em> legemer i FBD-et</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 md:col-span-2">
            <h3 className="font-semibold text-lg mb-3">Sjekkliste: Krafttyper du bør lete etter</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1">Kontaktkrefter:</p>
                <ul className="space-y-1">
                  <li>• <strong>Normalkraft N</strong> — vinkelrett på kontaktflaten</li>
                  <li>• <strong>Friksjon R</strong> — langs kontaktflaten, mot bevegelsesretningen</li>
                  <li>• <strong>Snordrag S</strong> — langs snoren/tauet</li>
                  <li>• <strong>Dyttekraft / Trekkraft F</strong> — påført utenfra</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">Fjernkrefter:</p>
                <ul className="space-y-1">
                  <li>• <strong>Tyngdekraft G = mg</strong> — alltid loddrett ned</li>
                  <li>• Elektrisk kraft (kap. 21+)</li>
                  <li>• Magnetisk kraft (kap. 27+)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. ØVINGSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="ovingsoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Øvingsoppgaver</h2>

        {/* Oblig-oppgave */}
        <ExerciseCard
          number={1}
          title="Vogn på skinne — FBD og maks akselerasjon"
          difficulty="middels"
          source="Oblig 1, Oppgave 3c–d"
          problem={
            <div>
              <p>
                Vi bruker et tau til å trekke en vogn med masse 1000 kg. Vogna
                ruller med neglisjerbar friksjon på en horisontal skinnegang.
              </p>
              <p className="mt-2">c) Tegn et fritt-legeme-diagram for vogna og sett navn på alle kreftene. Regn ut verdier du har nok opplysninger til.</p>
              <p>d) Tauet vil ryke dersom snordraget overskrider 3500 N. Hvilken akselerasjon kan vi maksimalt gi vogna uten at tauet ryker?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Tre krefter virker på vogna: N (opp), mg (ned), S (horisontalt fra tauet).</p> },
            { label: "Hint 2", content: <p>Vertikalt likevekt gir N. Horisontalt: ΣF = ma → S = ma.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>c) Fritt-legeme-diagram:</strong></p>
              <p className="text-sm">Krefter på vogna: Normalkraft <InlineLatex latex="N" /> (opp), tyngde <InlineLatex latex="mg" /> (ned), snordrag <InlineLatex latex="S" /> (horisontalt).</p>
              <FormulaBox latex="\sum F_y = 0: \quad N - mg = 0 \;\Rightarrow\; N = mg = 1000 \cdot 9{,}81 = \underline{\underline{9810\;\text{N}}}" variant="blue" />
              <p className="text-sm">Vi kan ikke finne S uten å vite akselerasjonen.</p>

              <p><strong>d) Maks akselerasjon:</strong></p>
              <FormulaBox latex="\sum F_x = ma: \quad S = ma \;\Rightarrow\; a_{\max} = \frac{S_{\max}}{m} = \frac{3500}{1000} = \underline{\underline{3{,}5\;\text{m/s}^2}}" variant="gold" />
            </div>
          }
        />

        {/* Selvlaget: Heiskraft */}
        <ExerciseCard
          number={2}
          title="Person i heis"
          difficulty="middels"
          problem={
            <div>
              <p>
                En person med masse 70 kg står på en vekt i en heis. Heisen akselererer oppover med{" "}
                <InlineLatex latex="a = 2{,}0\;\text{m/s}^2" />.
              </p>
              <p className="mt-2">a) Tegn FBD for personen.</p>
              <p>b) Hva viser vekten?</p>
              <p>c) Hva viser vekten når heisen akselererer nedover med 2,0 m/s²?</p>
              <p>d) Hva viser vekten i fritt fall?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Vekten viser normalkraften N, ikke tyngden mg.</p> },
            { label: "Hint 2", content: <p>Sett opp ΣFy = may med positiv retning oppover.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) FBD:</strong> N (opp fra vekten), mg (ned). To krefter.</p>

              <p><strong>b) Akselerasjon oppover (a = +2,0 m/s²):</strong></p>
              <FormulaBox latex="\sum F_y = ma_y: \quad N - mg = ma" variant="blue" />
              <FormulaBox latex="N = m(g + a) = 70(9{,}81 + 2{,}0) = \underline{\underline{827\;\text{N}}}" variant="gold" />
              <p className="text-sm">Vekten viser mer enn tyngden — du føler deg &ldquo;tyngre&rdquo;.</p>

              <p><strong>c) Akselerasjon nedover (a = −2,0 m/s²):</strong></p>
              <FormulaBox latex="N = m(g - a) = 70(9{,}81 - 2{,}0) = \underline{\underline{547\;\text{N}}}" variant="gold" />
              <p className="text-sm">Vekten viser mindre enn tyngden — du føler deg &ldquo;lettere&rdquo;.</p>

              <p><strong>d) Fritt fall (a = g):</strong></p>
              <FormulaBox latex="N = m(g - g) = \underline{\underline{0\;\text{N}}}" variant="gold" />
              <p className="text-sm">Vektløshet! Vekten viser null. Du svever fritt.</p>
            </div>
          }
        />

        {/* Selvlaget: N3L */}
        <ExerciseCard
          number={3}
          title="To kloss på friksjonsløst underlag"
          difficulty="middels"
          problem={
            <div>
              <p>
                To klosser med masser <InlineLatex latex="m_1 = 4{,}0\;\text{kg}" /> og{" "}
                <InlineLatex latex="m_2 = 6{,}0\;\text{kg}" /> står inntil hverandre på et friksjonsløst underlag.
                En kraft <InlineLatex latex="F = 30\;\text{N}" /> dyttes mot <InlineLatex latex="m_1" />.
              </p>
              <p className="mt-2">a) Finn akselerasjonen til systemet.</p>
              <p>b) Finn kontaktkraften mellom klossene.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Begge klossene har samme akselerasjon (beveger seg som ett system).</p> },
            { label: "Hint 2", content: <p>For å finne kontaktkraften: tegn FBD for m₂ alene.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) System som helhet:</strong></p>
              <FormulaBox latex="F = (m_1 + m_2)a \;\Rightarrow\; a = \frac{F}{m_1 + m_2} = \frac{30}{10} = \underline{\underline{3{,}0\;\text{m/s}^2}}" variant="gold" />

              <p><strong>b) FBD for m₂ alene:</strong></p>
              <p className="text-sm">Eneste horisontale kraft på m₂ er kontaktkraften K fra m₁:</p>
              <FormulaBox latex="K = m_2 a = 6{,}0 \cdot 3{,}0 = \underline{\underline{18\;\text{N}}}" variant="gold" />
              <p className="text-sm"><strong>Sjekk med m₁:</strong> <InlineLatex latex="F - K = m_1 a \Rightarrow 30 - 18 = 12 = 4{,}0 \cdot 3{,}0" /> ✓</p>
              <p className="text-sm"><strong>N3L-sjekk:</strong> m₂ dytter tilbake på m₁ med 18 N (like stor, motsatt rettet). ✓</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          7. EKSAMENSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="eksamensoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Eksamensoppgaver</h2>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 4</p>
          <ul className="space-y-1 text-sm">
            <li>• Newtons lover dukker opp i nesten ALLE mekanikkoppgaver — vær trygg på FBD</li>
            <li>• Start alltid med FBD og velg koordinatsystem FØR du skriver likninger</li>
            <li>• Husk: &ldquo;ma&rdquo; er IKKE en kraft — det er resultatet av kraftsummen</li>
            <li>• Ved sammenkoblede legemer: ett FBD per legeme, koble med N3L</li>
          </ul>
        </div>

        <ExerciseCard
          number={1}
          title="Bremsende bil — Newtons 2. lov"
          difficulty="middels"
          source="Eksamen Høst 2023, Oppgave 2b"
          problem={
            <div>
              <p>
                En bil med masse 1500 kg kjører med fart 72 km/h når motoren kobles ut.
                Bilen stopper etter 50 m pga. friksjon.
              </p>
              <p className="mt-2">a) Hvor stor er friksjonskraften?</p>
              <p>b) Hvor lang tid tok nedbremsingen?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Regn ut akselerasjonen fra kinematikk: v² = v₀² + 2as med v = 0.</p> },
            { label: "Hint 2", content: <p>Bruk deretter ΣF = ma for å finne friksjonskraften.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong> m = 1500 kg, v₀ = 72 km/h = 20 m/s, v = 0, s = 50 m.</p>

              <p><strong>a) Finn akselerasjon og friksjonskraft:</strong></p>
              <FormulaBox latex="v^2 = v_0^2 + 2as \;\Rightarrow\; a = \frac{v^2 - v_0^2}{2s} = \frac{0 - 400}{100} = -4{,}0\;\text{m/s}^2" variant="blue" />
              <FormulaBox latex="R = |\sum F| = m|a| = 1500 \cdot 4{,}0 = \underline{\underline{6{,}0\;\text{kN}}}" variant="gold" />

              <p><strong>b) Tid:</strong></p>
              <FormulaBox latex="v = v_0 + at \;\Rightarrow\; t = \frac{v - v_0}{a} = \frac{0 - 20}{-4{,}0} = \underline{\underline{5{,}0\;\text{s}}}" variant="gold" />

              <p className="text-sm"><strong>Hva lærte vi?</strong> Kombinasjonen av kinematikk (kap. 2) og Newtons 2. lov (kap. 4) er svært vanlig på eksamen.</p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Pakke i tau — likevekt"
          difficulty="middels"
          source="Eksamensrelevant"
          problem={
            <div>
              <p>
                En pakke med masse <InlineLatex latex="m = 50\;\text{kg}" /> henger i et masseløst tau
                fra taket. Under pakken henger et nytt tau ned til en krok i gulvet.
              </p>
              <p className="mt-2">a) Finn snordraget i begge tauene.</p>
              <p>b) Hva hvis det øvre tauet har masse 12 kg? Finn snordraget i topp og bunn av tauet.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>FBD for pakken: S₁ (oppover), G (nedover). Det nedre tauet har null drag (henger fritt).</p> },
            { label: "Hint 2", content: <p>Når tauet har masse: tegn FBD for tauet og bruk N3L mellom tau og pakke.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Masseløst tau:</strong></p>
              <p className="text-sm">Nedre tau henger fritt med slakk → snordrag S₂ = 0 N (ingen belastning nedenfra).</p>
              <p className="text-sm">FBD for pakken: S₁ (opp) − G (ned) = 0</p>
              <FormulaBox latex="S_1 = G = mg = 50 \cdot 9{,}81 = \underline{\underline{491\;\text{N}}}" variant="gold" />
              <p className="text-sm">I et masseløst tau er snordraget likt overalt i tauet: S = 491 N.</p>

              <p><strong>b) Tau med masse m₂ = 12 kg:</strong></p>
              <p className="text-sm">FBD for tauet: S₂ (opp) − S₁ (ned fra pakke via N3L) − m₂g (ned) = 0</p>
              <FormulaBox latex="S_2 = S_1 + m_2 g = 491 + 12 \cdot 9{,}81 = \underline{\underline{609\;\text{N}}}" variant="gold" />
              <p className="text-sm"><strong>Hva lærte vi?</strong> I et tau med masse er snordraget størst øverst og minst nederst. Det øvre festepunktet bærer både pakken og tauets vekt.</p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
