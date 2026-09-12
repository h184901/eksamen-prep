/** Original geometry, not reproductions of QUT/Corke artwork. */
export function RobotSystemDiagram() {
  return <figure className="egb-week-figure">
    <svg viewBox="0 0 760 300" role="img" aria-labelledby="week-system-title week-system-desc">
      <title id="week-system-title">Robotens måle- og styringssløyfe</title>
      <desc id="week-system-desc">Et mål sendes til styringen. Aktuatorene beveger roboten, sensorer måler resultatet og sender informasjon tilbake til styringen.</desc>
      <defs><marker id="week-system-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 8 4 0 8Z" fill="var(--week-info)" /></marker></defs>
      <g fill="none" stroke="var(--week-info)" strokeWidth="2" markerEnd="url(#week-system-arrow)">
        <path d="M152 80H236" /><path d="M416 80H504" /><path d="M612 116V196" />
        <path d="M504 232H420" /><path d="M324 196V116" />
      </g>
      <g className="egb-week-diagram-label">
        <text x="460" y="60" textAnchor="middle">signal</text><text x="628" y="156">bevegelse</text>
        <text x="460" y="212" textAnchor="middle">måling</text><text x="308" y="160" textAnchor="end">tilbakekobling</text>
      </g>
      <rect x="24" y="44" width="128" height="72" rx="4" className="egb-week-diagram-node" />
      <rect x="240" y="44" width="176" height="72" rx="4" className="egb-week-diagram-node" />
      <rect x="508" y="44" width="208" height="72" rx="4" className="egb-week-diagram-node" />
      <rect x="240" y="196" width="176" height="72" rx="4" className="egb-week-diagram-node" />
      <rect x="508" y="196" width="208" height="72" rx="4" className="egb-week-diagram-node" />
      <g className="egb-week-diagram-name" textAnchor="middle">
        <text x="88" y="76">Mål</text><text x="328" y="76">Styring</text><text x="612" y="76">Aktuatorer</text>
        <text x="328" y="228">Sensorer</text><text x="612" y="228">Robot + omgivelser</text>
      </g>
      <g className="egb-week-diagram-label" textAnchor="middle">
        <text x="88" y="100">ønsket pose</text><text x="328" y="100">beregn handling</text><text x="612" y="100">motorer og griper</text>
        <text x="328" y="252">kamera, leddsensor</text><text x="612" y="252">fysisk resultat</text>
      </g>
    </svg>
    <figcaption>Egen systemskisse basert på QUT Week 1 og Corke kapittel 1. Kamera og leddsensorer gir ulike målinger; et kamera alene måler ikke nødvendigvis alle leddvinklene.</figcaption>
  </figure>;
}

export function KinematicChainDiagram() {
  return <figure className="egb-week-figure">
    <svg viewBox="0 0 720 328" role="img" aria-labelledby="week-chain-title week-chain-desc">
      <title id="week-chain-title">Fra base til end-effector</title>
      <desc id="week-chain-desc">En skjematisk plan robot har to roterende ledd og to stive lenker. Base A står stille. End-effector og den tilknyttede rammen B følger leddbevegelsen.</desc>
      <defs>{["a", "b"].map((frame) => <marker key={frame} id={`week-chain-${frame}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 8 4 0 8Z" fill={`var(--week-frame-${frame})`} /></marker>)}</defs>
      <path d="M132 264H220M176 264V240" stroke="var(--egb-muted)" strokeWidth="4" fill="none" />
      <path d="M176 240 336 96 528 164" stroke="var(--egb-line)" strokeWidth="20" strokeLinecap="round" fill="none" />
      <path d="M176 240 336 96 528 164" stroke="var(--egb-ink)" strokeWidth="2" fill="none" />
      <g fill="var(--egb-paper)" stroke="var(--egb-ink)" strokeWidth="3"><circle cx="176" cy="240" r="12" /><circle cx="336" cy="96" r="12" /></g>
      <g className="egb-week-diagram-name"><text x="200" y="252">ledd 1</text><text x="352" y="80">ledd 2</text><text x="208" y="148">lenke 1</text><text x="416" y="108">lenke 2</text></g>
      <g stroke="var(--week-frame-a)" fill="none" strokeWidth="2" markerEnd="url(#week-chain-a)"><path d="M176 240H272" /><path d="M176 240V144" strokeDasharray="5 4" /></g>
      <g className="egb-week-frame-a"><text x="132" y="296">Base A</text><text x="280" y="244">x<tspan baselineShift="sub">A</tspan></text><text x="152" y="132">y<tspan baselineShift="sub">A</tspan></text></g>
      <g stroke="var(--week-frame-b)" fill="none" strokeWidth="2" markerEnd="url(#week-chain-b)"><path d="M528 164 620 197" /><path d="M528 164 560 72" strokeDasharray="5 4" /></g>
      <circle cx="528" cy="164" r="5" fill="var(--week-frame-b)" />
      <g className="egb-week-frame-b"><text x="568" y="64">y<tspan baselineShift="sub">B</tspan></text><text x="632" y="204">x<tspan baselineShift="sub">B</tspan></text><text x="492" y="252">End-effector B</text></g>
    </svg>
    <figcaption>To roterende ledd (2R), ikke en modell av Dobot eller Panda. Egen skisse; kjedestrukturen følger Robotics Toolbox <code>models.ETS.Planar2</code>. Heltrukket x-akse, stiplet y-akse.</figcaption>
  </figure>;
}
