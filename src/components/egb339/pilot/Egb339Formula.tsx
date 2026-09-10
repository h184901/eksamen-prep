import MathText from "./Egb339Math";
interface Props {
  title?: string; latex: string; description?: string; conceptExplanation?: string;
  whenToUse?: string; commonMistakes?: string[]; variant?: "gold" | "blue";
}
/** EGB339 reference variant: explanations are inline, never hidden behind a modal. */
export default function Egb339Formula({ title, latex, description, conceptExplanation, whenToUse, commonMistakes }: Props) {
  return <section className="egb-study-formula">
    <h3>{title}</h3><MathText>{latex}</MathText>{description && <p>{description}</p>}
    <details className="egb-pilot-solution"><summary>Forklaring og kontroll</summary>
      {conceptExplanation && <p>{conceptExplanation}</p>}
      {whenToUse && <p>{whenToUse}</p>}
      {commonMistakes && <><h4>Vanlige feil</h4><ul className="egb-study-link-list">{commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul></>}
    </details>
  </section>;
}
