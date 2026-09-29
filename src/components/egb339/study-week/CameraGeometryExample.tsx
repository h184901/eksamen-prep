"use client";

import { useId, useState } from "react";
import MathText from "../pilot/Egb339Math";
import { useEgb339Lang } from "@/lib/egb339-language/store";

/** Illustrates a virtual pinhole plane; sensor dimensions and pixel pitch are unknown. */
export default function CameraGeometryExample() {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [focalMm, setFocalMm] = useState(1.8);
  const [heightM, setHeightM] = useState(2);
  const worldY = 230 - heightM * 38;
  const sensorY = 230 + focalMm * 10;
  const projection = (95 * focalMm * 10) / (heightM * 38);
  const offsetMm = focalMm / heightM;

  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-camera-geometry-example>
    <h3 id={`${id}-heading`}>{lang === "en" ? "Focal length and depth move a projected corner" : "Brennvidde og avstand flytter et hjørne i bildet"}</h3>
    <p>{lang === "en" ? "An ideal pinhole view of a 2 × 2 m square centred under a downward-looking camera. Adjust focal length and camera height. The drawing shows physical position on a virtual image plane, not pixels." : "Ideelt hullkamera over et 2 × 2 m kvadrat. Endre brennvidde og kamerahøyde. Figuren viser fysisk posisjon på et virtuelt bildeplan, ikke piksler."}</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 480 380" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{lang === "en" ? "Camera projection from opposite corners" : "Kameraprojeksjon fra motsatte hjørner"}</title>
          <desc id={`${id}-desc`}>{lang === "en" ? "Two rays from a ground square cross at the optical centre and meet a virtual image plane. The span varies with focal length and depth." : "To stråler fra kvadratet krysser optisk sentrum og møter et virtuelt bildeplan. Utslaget varierer med brennvidde og dybde."}</desc>
          <path d={`M145 ${worldY}H335`} stroke="var(--egb-muted)" strokeWidth="5" />
          <text x="240" y={worldY - 10} textAnchor="middle" fill="currentColor">{lang === "en" ? "World plane, 2 m across" : "Verdensplan, 2 m bredt"}</text>
          <path d={`M145 ${worldY}L240 230L${240 + projection} ${sensorY}M335 ${worldY}L240 230L${240 - projection} ${sensorY}`} fill="none" stroke="var(--week-info)" strokeWidth="2" />
          <circle cx="240" cy="230" r="5" fill="var(--week-info)" />
          <line x1="45" y1={sensorY} x2="435" y2={sensorY} stroke="var(--egb-muted)" strokeWidth="3" />
          <circle cx={240 - projection} cy={sensorY} r="5" fill="var(--week-info)" />
          <circle cx={240 + projection} cy={sensorY} r="5" fill="var(--week-info)" />
          <text x="240" y={sensorY + 23} textAnchor="middle" fill="currentColor">{lang === "en" ? "Virtual image plane (not calibrated)" : "Virtuelt bildeplan (ikke kalibrert)"}</text>
        </svg>
        <figcaption>{lang === "en" ? "Rays invert left/right at the camera centre. The drawing's vertical scale is illustrative; it assumes no Raspberry Pi sensor dimensions." : "Strålene bytter venstre/høyre ved kamerasenteret. Tegningens vertikale skala er illustrativ; ingen Raspberry Pi-sensormål er antatt."}</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        <label>{lang === "en" ? `Focal length: ${focalMm.toFixed(1)} mm` : `Brennvidde: ${focalMm.toFixed(1).replace(".", ",")} mm`}
          <input type="range" min="1.8" max="8" step="0.1" value={focalMm} onChange={(event) => setFocalMm(Number(event.target.value))} aria-label={lang === "en" ? "Focal length in millimetres" : "Brennvidde i millimeter"} />
        </label>
        <label>{lang === "en" ? `Camera height: ${heightM.toFixed(1)} m` : `Kamerahøyde: ${heightM.toFixed(1).replace(".", ",")} m`}
          <input type="range" min="1" max="5" step="0.1" value={heightM} onChange={(event) => setHeightM(Number(event.target.value))} aria-label={lang === "en" ? "Camera height in metres" : "Kamerahøyde i meter"} />
        </label>
        <MathText>{String.raw`|x_{\mathrm{sensor}}|=\frac{f|X_C|}{Z_C}`}</MathText>
        <div role="status" aria-live="polite" aria-atomic="true"><p>{lang === "en" ? `A corner 1 m from the centre projects ${offsetMm.toFixed(2)} mm from the optical axis.` : `Et hjørne 1 m fra midten projiseres ${offsetMm.toFixed(2).replace(".", ",")} mm fra optisk akse.`}</p></div>
        <p>{lang === "en" ? "To get pixels, pixel pitch and principal point are needed; the local task pages do not give them. The shortest focal length gives the widest ideal field of view." : "Pikselkoordinater krever pikselstørrelse og principal point; de lokale oppgavesidene oppgir dem ikke. Kortest brennvidde gir størst ideelt synsfelt."}</p>
      </div>
    </div>
  </section>;
}
