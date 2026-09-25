// Source-content audit. Analyse prose, never mathematical expressions or code.
// Deliberately use independent function-word evidence in addition to a small
// heading glossary: a translation can exist and still contain the wrong language.
const ENGLISH = new Set(`the this that these those with when where which from into than their they them there because therefore while without before after between through would could should must also each every another instead using used only first second one how why what does different change changes show shows provides provide means mean following based other again not then its were was are is can we you your and but for of in by`.split(" "));
const NORWEGIAN = new Set(`det dette disse denne med hvis når hvor hvilken hvilke fra mellom deres derfor mens uten før etter gjennom ville kunne skal må også hver annet istedenfor bruker brukt bare først andre viser gir betyr følgende samme basert igjen ikke slik være som på ved til av og eller kan du deg din ditt den har blir er en et de vi for`.split(" "));
const ENGLISH_HEADINGS = /^(?:week\s+\d+\b.*|why it is local|verification|related content|how it works|practical consequence|required model|tasks|open questions|common mistakes|further reading|sources and further reading|assessment relevance|learning goals|the velocity relationship is|value|physical robot|simulation\s*\+\s*oral demonstration|environment|source path|learning path|construction|singularity)$/i;
const NORWEGIAN_HEADINGS = /^(?:slik virker det|hvorfor det er viktig|videre lesning|videre koblinger|vanlige feil|kilder og videre lesing|oppgaver og løsninger|gjennomgang|fremgangsmåte|verifisering|læringsmål|sentrale begreper|relatert innhold|kilder|bruk i kurset|eksempel|vurdering|oppgavekrav)$/i;

function plainText(value) {
  return value.replace(/`[^`]*`|\$\$[\s\S]*?\$\$|\$[^$]*\$/g, " ")
    .replace(/«[^»]*»|“[^”]*”/g, " ")
    .replace(/\[([^\]]+)\]\((?:\/|https?:)[^)]+\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/^>\s*\[![^\]]+\]\s*/gm, "")
    .replace(/^\s*(?:#{1,6}|[-*+>]|\d+[.)])\s*/gm, "")
    .replace(/\*\*|__|\|/g, " ").replace(/\s+/g, " ").trim();
}

export function scanLanguage(text, language) {
  if (language !== "no" && language !== "en") throw new Error("Expected no or en");
  const findings = [];
  let fence = null;
  for (const [index, line] of text.split("\n").entries()) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      continue;
    }
    if (fence || /^\s*\|[- :|]+\|?\s*$/.test(line)) continue;
    for (const cell of line.includes("|") && /^\s*\|/.test(line) ? line.split("|") : [line]) {
      const textOnly = plainText(cell);
      // Official document titles and attribution are source material;
      // explanatory text elsewhere is still scanned, including callouts.
      if (/^(?:QUT\s*[:,-]|Corke\s*[:,-]|Robotics Toolbox\s*[:,-]|RTB\s*[:,-]|EGB339 Assessment\b)/i.test(textOnly)) continue;
      if (/^(?:Kilde|Source): Week 8 Prac - Working with images in Python · PDF-(?:side|page) \d+$/i.test(textOnly)) continue;
      if (/^Kildegrunnlag: EGB339 Assessment \d+\.\d+ .*PDF-side \d+/i.test(textOnly)) continue;
      if (/^Week 4 Prac \(\d{4}-\d\d-\d\d\), side \d/i.test(textOnly)) continue;
      for (const segment of textOnly.split(/(?<=[.!?;])\s+(?=[A-ZÆØÅ])/)) {
        const clean = segment.trim();
        const words = clean.toLowerCase().match(/[a-zæøå]+(?:'[a-z]+)?/g) ?? [];
        const es = words.filter(word => ENGLISH.has(word)).length;
        const ns = words.filter(word => NORWEGIAN.has(word)).length;
        const wrong = language === "no" ? es : ns;
        const right = language === "no" ? ns : es;
        const glossary = (language === "no" ? ENGLISH_HEADINGS : NORWEGIAN_HEADINGS).test(clean);
        const englishLinkPrompt = language === "no" && /^see\s/i.test(clean);
        if (glossary || englishLinkPrompt || (words.length >= 6 && wrong >= 2 && (right === 0 || wrong >= 3 && wrong >= right * 1.75))) {
          findings.push({ line: index + 1, text: clean, wrong, right });
        }
      }
    }
  }
  return findings;
}
