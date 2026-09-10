import Image from "next/image";
import type { Egb339ProblemVisual as VisualKind } from "@/lib/egb339-problems";

interface Props {
  kind: VisualKind;
}

const axis = "stroke-[var(--egb-muted)]";
const line = "stroke-[var(--egb-accent)]";
const accent = "stroke-[var(--egb-point)]";
const label = "fill-[var(--egb-ink)] text-[10px] font-semibold";
const joint = "fill-[var(--egb-paper)] stroke-[var(--egb-accent)]";
const endpoint = "fill-[var(--egb-point)]";

function StaticFrames() {
  return (
    <svg viewBox="0 0 420 190" role="img" aria-label="Referanserammene A, B og C">
      <path d="M40 150H390M40 150V25" className={`${axis} fill-none`} strokeWidth="1.5" />
      <path d="M40 150H195M195 150V45" className={`${line} fill-none`} strokeWidth="3" />
      <path d="M195 45H90" className={`${accent} fill-none`} strokeWidth="3" />
      <circle cx="40" cy="150" r="5" className="fill-[var(--egb-ink)]" />
      <circle cx="195" cy="150" r="5" className="fill-[var(--egb-accent)]" />
      <circle cx="195" cy="45" r="5" className={endpoint} />
      <text x="24" y="172" className={label}>A</text>
      <text x="198" y="171" className={label}>B</text>
      <text x="201" y="39" className={label}>C</text>
      <text x="104" y="142" className={label}>10</text>
      <text x="202" y="102" className={label}>15</text>
      <text x="96" y="36" className={label}>x_C</text>
    </svg>
  );
}

function Week4Arm() {
  return (
    <svg viewBox="0 0 420 190" role="img" aria-label="Plan kinematisk kjede med tre ledd">
      <path d="M25 158H400M45 175V20" className={`${axis} fill-none`} strokeWidth="1.5" />
      <path d="M45 158L105 158L205 78L330 52" className={`${line} fill-none`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="105" cy="158" r="11" className={joint} strokeWidth="4" />
      <circle cx="205" cy="78" r="11" className={joint} strokeWidth="4" />
      <circle cx="330" cy="52" r="8" className={endpoint} />
      <text x="64" y="151" className={label}>8</text>
      <text x="118" y="122" className={label}>5 + q₂</text>
      <text x="259" y="55" className={label}>4</text>
      <text x="91" y="181" className={label}>q₁</text>
      <text x="194" y="61" className={label}>q₃</text>
      <text x="338" y="48" className={label}>E</text>
    </svg>
  );
}

function TwoLinkArm() {
  return (
    <svg viewBox="0 0 420 190" role="img" aria-label="Plan robotarm med to rotasjonsledd">
      <path d="M35 160H395M55 175V22" className={`${axis} fill-none`} strokeWidth="1.5" />
      <path d="M55 160L190 65L345 105" className={`${line} fill-none`} strokeWidth="9" strokeLinecap="round" />
      <circle cx="55" cy="160" r="11" className={joint} strokeWidth="4" />
      <circle cx="190" cy="65" r="11" className={joint} strokeWidth="4" />
      <circle cx="345" cy="105" r="8" className={endpoint} />
      <path d="M88 160A33 33 0 0 0 80 140M226 74A38 38 0 0 0 222 49" className={`${accent} fill-none`} strokeWidth="3" />
      <text x="90" y="112" className={label}>L₁</text>
      <text x="264" y="76" className={label}>L₂</text>
      <text x="77" y="154" className={label}>q₁</text>
      <text x="224" y="44" className={label}>q₂</text>
      <text x="354" y="101" className={label}>p</text>
    </svg>
  );
}

function MixedJointArm() {
  return (
    <svg viewBox="0 0 420 190" role="img" aria-label="Robot med prismatisk og roterende ledd">
      <path d="M30 160H395M45 175V22" className={`${axis} fill-none`} strokeWidth="1.5" />
      <path d="M60 155L210 55" className={`${line} fill-none`} strokeWidth="12" strokeLinecap="round" />
      <path d="M165 85L210 55L342 96" className={`${accent} fill-none`} strokeWidth="8" strokeLinecap="round" />
      <rect x="143" y="79" width="44" height="24" rx="5" transform="rotate(-34 165 91)" className={joint} strokeWidth="3" />
      <circle cx="210" cy="55" r="10" className="fill-[var(--egb-paper)] stroke-[var(--egb-point)]" strokeWidth="4" />
      <circle cx="342" cy="96" r="8" className={endpoint} />
      <text x="118" y="127" className={label}>q₁</text>
      <text x="222" y="47" className={label}>q₂</text>
      <text x="275" y="67" className={label}>7</text>
      <text x="68" y="150" className={label}>45°</text>
    </svg>
  );
}

function MotionProfile() {
  return (
    <svg viewBox="0 0 420 190" role="img" aria-label="Stykkevis akselerasjonsprofil">
      <path d="M40 100H395M55 165V25" className={`${axis} fill-none`} strokeWidth="1.5" />
      <path d="M55 55H140V100H270V135H385" className={`${line} fill-none`} strokeWidth="4" strokeLinejoin="round" />
      <path d="M140 30V165M270 30V165" className="fill-none stroke-[var(--egb-line)]" strokeDasharray="5 5" />
      <text x="91" y="48" className={label}>a = 1.5</text>
      <text x="182" y="91" className={label}>a = 0</text>
      <text x="306" y="153" className={label}>a = −1</text>
      <text x="132" y="180" className={label}>2 s</text>
      <text x="262" y="180" className={label}>5 s</text>
      <text x="377" y="180" className={label}>8 s</text>
      <text x="21" y="35" className={label}>a</text>
    </svg>
  );
}

function PointSegment() {
  // Project O onto AB in the drawing's coordinates, just as in the solution.
  const a = [55, 150], b = [350, 40], o = [215, 150];
  const vx = b[0] - a[0], vy = b[1] - a[1];
  const t = ((o[0] - a[0]) * vx + (o[1] - a[1]) * vy) / (vx * vx + vy * vy);
  const c = [a[0] + t * vx, a[1] + t * vy];
  const length = Math.hypot(vx, vy), distance = Math.hypot(o[0] - c[0], o[1] - c[1]);
  const u = [10 * vx / length, 10 * vy / length];
  const n = [10 * (o[0] - c[0]) / distance, 10 * (o[1] - c[1]) / distance];
  const point = (x: number, y: number) => `${x.toFixed(6)},${y.toFixed(6)}`;
  return (
    <svg viewBox="0 0 420 190" role="img" aria-label="Korteste avstand fra punkt til linjesegment">
      <path d="M55 150L350 40" className={`${line} fill-none`} strokeWidth="6" strokeLinecap="round" />
      <circle cx="55" cy="150" r="7" className="fill-[var(--egb-accent)]" />
      <circle cx="350" cy="40" r="7" className="fill-[var(--egb-accent)]" />
      <circle cx="215" cy="150" r="10" className={endpoint} />
      <path data-perpendicular d={`M215 150L${point(c[0], c[1])}`} className={`${accent} fill-none`} strokeWidth="3" strokeDasharray="6 5" />
      <polyline points={[point(c[0] + u[0], c[1] + u[1]), point(c[0] + u[0] + n[0], c[1] + u[1] + n[1]), point(c[0] + n[0], c[1] + n[1])].join(" ")} className={`${accent} fill-none`} strokeWidth="2" />
      <text x="38" y="170" className={label}>A</text>
      <text x="357" y="38" className={label}>B</text>
      <text x="226" y="157" className={label}>O</text>
      <text x="216" y="126" className={label}>d</text>
      <text x={c[0] - 14} y={c[1] - 10} className={label}>C</text>
    </svg>
  );
}

export default function Egb339ProblemVisual({ kind }: Props) {
  if (kind === "highway") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--egb-hover)]">
        {/* The source is session-protected; Next's optimizer does not forward auth cookies. */}
        <Image src="/egb339/week8/highway.jpg" alt="Highway-bildet brukt i uke 8-practicalen" fill unoptimized sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
      </div>
    );
  }

  return (
    <figure className="egb-study-diagram">
      {kind === "static-frames" && <StaticFrames />}
      {kind === "week4-arm" && <Week4Arm />}
      {kind === "two-link-arm" && <TwoLinkArm />}
      {kind === "mixed-joint-arm" && <MixedJointArm />}
      {kind === "motion-profile" && <MotionProfile />}
      {kind === "point-segment" && <PointSegment />}
      {kind === "point-segment" && <figcaption>Prinsippskisse: C er projeksjonen av O på segmentet AB. OC står vinkelrett på AB. Koordinatene i oppgaven regnes ut nedenfor.</figcaption>}
    </figure>
  );
}
