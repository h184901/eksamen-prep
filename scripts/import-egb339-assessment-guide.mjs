#!/usr/bin/env node
/** Build-time import of the explicitly supplied guide. Never executes Python or changes the vault. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import katex from 'katex';

const vault = process.argv[2] ?? '/home/skjold/ObsidianVault/EGB339';
const input = path.join(vault, 'queries');
const assets = 'public/egb339/assessment-2-1';
const content = 'src/content/egb339/assessment-2-1';
const components = 'src/components/egb339/assessment-guide';
for (const dir of [assets, content, components]) fs.mkdirSync(dir, { recursive: true });
const original = fs.readFileSync(path.join(input, 'assessment-2-1-complete-visual-guide.html'), 'utf8');
const rawData = fs.readFileSync(path.join(input, 'assessment-2-1-guide-assets/guide-data.js'), 'utf8');
const data = JSON.parse(rawData.slice(rawData.indexOf('=') + 1).trim().replace(/;$/, ''));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(data.source), data.sourceHash);
assert.equal(data.source, fs.readFileSync(path.join(vault, 'assignment_2_1_robotics/wordTypingRobot.py'), 'utf8'));
assert.equal(data.events.length, 2137);
assert.equal(data.commands.length, 15);

const provenance = { sourceHash: data.sourceHash, source: 'User-supplied Assessment 2.1 HTML/JS and recorded test-robot trace; no simulator connection.', files: [] };
function asset(name, bytes, source) {
  fs.writeFileSync(path.join(assets, name), bytes);
  provenance.files.push({ file: name, source, sha256: hash(bytes), treatment: 'Original bytes; no image editing or document rewriting.' });
}
asset('oral-presentation-guide.docx', fs.readFileSync(path.join(input, data.wordName)), 'queries/' + data.wordName);
asset('keyboard_marked.jpeg', fs.readFileSync(path.join(vault, 'assignment_2_1_robotics/keyboard_marked.jpeg')), 'assignment_2_1_robotics/keyboard_marked.jpeg');
let figure = 0;
for (const chapter of data.wordChapters) {
  chapter.html = chapter.html.replace(/src="data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)"/g, (_, type, encoded) => {
    const name = `word-figure-${++figure}.${type === 'jpeg' ? 'jpg' : type}`;
    asset(name, Buffer.from(encoded, 'base64'), `${data.wordName}, embedded figure ${figure} (supplied HTML extraction)`);
    return `loading="lazy" src="/egb339/assessment-2-1/${name}"`;
  });
}
assert.equal(figure, 6);
// Two brief annotations added to the DOCX after the supplied extraction; preserve them explicitly.
data.wordChapters.push({ title: 'Tillegg i det leverte Word-dokumentet', html: '<p>4x4 matrise, pixel to keyboard_point, getPositionForLetter,</p><p>De tre øverste elementene i kolonne 3: translasjonen., forward kinematics r-, x-, y- og z-likningene, hva er pose?, radial variable?,</p><p>Disse to notatene finnes i den leverte DOCX-filen, men ikke i det eldre HTML-uttrekket. Originalformuleringen er beholdt.</p>' });

let html = original.match(/<main class="page">([\s\S]*?)<\/main>/)[1];
html = html.replace(/<div class="eyebrow">[^<]*<\/div>/g, '')
  .replaceAll('../assignment_2_1_robotics/keyboard_marked.jpeg', '/egb339/assessment-2-1/keyboard_marked.jpeg')
  .replace('href="EGB339%20Assessment%202.1%20Oral%20Presentation%20Guide.docx"', 'download href="/egb339/assessment-2-1/oral-presentation-guide.docx"')
  .replace('Åpne det opprinnelige Word-dokumentet ↗', 'Last ned originalen (Word)')
  .replace('<h3>Trykk sikkert</h3>', '<h3>ABOVE, PRESS og løft</h3>')
  .replace('↶ Start', 'Til start').replace('▶ Spill av', 'Spill av');
html = html.replace(/<tr><td>([1-8])<\/td>/g, '<tr><td><a href="/egb339/uker/uke-$1">Week $1</a></td>');
html = html.replace(/<section id="/g, '<section data-egb-week-section id="');
// Preserve numbers/notation while letting the site's existing renderer lay out key matrices.
const displayMath = tex => katex.renderToString(tex, { displayMode: true, throwOnError: true, strict: 'error' });
html = html.replace(/<div class="formula">Rz\(ψ\)[\s\S]*?<\/div>/, displayMath(String.raw`R_z(\psi)=\begin{bmatrix}\cos\psi&-\sin\psi&0\\\sin\psi&\cos\psi&0\\0&0&1\end{bmatrix},\quad\psi=-135^\circ`));
html = html.replace(/<div class="formula">ᴮTₖ[\s\S]*?<\/div>/, displayMath(String.raw`{}^BT_K=\begin{bmatrix}-0.7071&0.7071&0&175\\-0.7071&-0.7071&0&-150\\0&0&1&2\\0&0&0&1\end{bmatrix}`));
html = html.replace(/<div class="formula">ᴮp = ᴮTₖ[\s\S]*?<\/div>/, displayMath(String.raw`\begin{bmatrix}x^B\\y^B\\z^B\\1\end{bmatrix}=\begin{bmatrix}R_{11}&R_{12}&R_{13}&t_x\\R_{21}&R_{22}&R_{23}&t_y\\R_{31}&R_{32}&R_{33}&t_z\\0&0&0&1\end{bmatrix}\begin{bmatrix}x^K\\y^K\\z^K\\1\end{bmatrix}`));
html = html.replace('<div id="trace-code" class="trace-code"', '<div id="trace-code" tabindex="0" class="trace-code"');
html = html.replace('<div id="word-qa"', '<p id="word-question-count" role="status"></p><div id="word-qa"');
assert(!/<script|\son\w+=|file:\/\/|\/Users\//i.test(html));
fs.writeFileSync(path.join(content, 'guide.html'), html);
fs.writeFileSync(path.join(assets, 'guide-data.json'), JSON.stringify(data));
fs.writeFileSync(path.join(assets, 'provenance.json'), JSON.stringify(provenance, null, 2) + '\n');

// Adapt scripts mechanically: no eval/new Function, global DATA, or global DOM queries.
const inline = original.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const trace = fs.readFileSync(path.join(input, 'assessment-2-1-guide-assets/guide.js'), 'utf8');
let runtime = inline + '\n' + trace;
runtime = runtime.replaceAll('window.EGB_GUIDE_DATA', 'data')
  .replace('window.EGB_GUIDE={', 'controller={')
  .replace('Ⅱ Pause', 'Pause').replace('▶ Spill av', 'Spill av')
  .replace('href="../assignment_2_1_robotics/wordTypingRobot.py"', 'href="#code"')
  .replace('Behold assessment-2-1-guide-assets ved siden av HTML-filen.', 'Last siden på nytt eller bruk Word-nedlastingen.');
// Stable full-source anchors; no executed event is invented for comments or blank lines.
runtime = runtime.replace("tr.dataset.line=n;", "tr.dataset.line=n; tr.id='code-line-'+n;");
runtime = runtime.replace("['press','Trykk'],['lift','Løft']", "['press','Trykk'],['dwell','Hold'],['lift','Løft']")
  .replace("(b.dataset.phase===e.phase||(e.phase==='dwell'&&b.dataset.phase==='press'))", "b.dataset.phase===e.phase")
  .replace("e.phase===b.dataset.phase&&e.fn==='_ik_candidates'", "e.phase===b.dataset.phase&&(b.dataset.phase==='dwell'?e.kind==='wait':e.fn==='_ik_candidates')");
runtime = runtime.replace('<summary>${escape(q.q)}</summary>', '<summary lang="en">${escape(q.q)}</summary>');
runtime = runtime.replace('Gå til IK-beregningen for ${key} ${name}', '${phase === "dwell" ? "Vis fullført holdepause for" : "Gå til IK-beregningen for"} ${key} ${name}');
runtime = runtime.replace('const chapterEls=[...document.querySelectorAll(\'.word-chapter\')];', 'document.querySelectorAll(".word-table-wrap").forEach(el=>{el.tabIndex=0;el.setAttribute("role","region");el.setAttribute("aria-label","Tabell fra Word – kan rulles vannrett")});\n    const chapterEls=[...document.querySelectorAll(\'.word-chapter\')];');
runtime = runtime.replace('/^(3 |6 |7 |10 |17 |22 )/', '/^(3 |6 |7 |10 |12 |17 |22 )/')
  .replace('Originaltekst fra Word: se presiseringene øverst om funksjonsnavn, høydeargument, ordlengde og rekkefølgen for FK-kontrollen.', 'Originaltekst fra Word er bevart nedenfor. I innleveringen kontrollerer <code>_ik_candidates</code> først kandidatene med FK; deretter filtrerer <code>ikine</code> på leddgrenser og velger gren. API-kallet heter <code>move_arm</code>. <code>getPositionForLetter</code> tar bare bokstaven og gir PRESS; <code>jumpToPos</code> legger til høyden. Ordet trenger ikke ha fem bokstaver.');
// Native MathML italic Greek falls back to a missing glyph on this host. Reuse
// the course's self-hosted KaTeX fonts for the same three equations, unchanged.
const derivationMath = [
  String.raw`R_z(\psi)=\begin{bmatrix}\cos\psi&-\sin\psi&0\\\sin\psi&\cos\psi&0\\0&0&1\end{bmatrix}`,
  String.raw`{}^BT_K=\begin{bmatrix}R&t\\0\;0\;0&1\end{bmatrix}`,
  String.raw`\cos\delta=\frac{d^2-L_1^2-L_2^2}{2L_1L_2}`,
];
let derivationIndex = 0;
runtime = runtime.replace(/<math display="block">.*?<\/math>/g, () => displayMath(derivationMath[derivationIndex++]).replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${'));
assert.equal(derivationIndex, derivationMath.length);
// Searchable regions remain understandable when nothing matches.
runtime = runtime.replace("document.querySelectorAll('#word-qa>details').forEach(d=>d.hidden=!d.dataset.search.includes(query))", "document.querySelectorAll('#word-qa>details').forEach(d=>d.hidden=!d.dataset.search.includes(query)); $('word-question-count').textContent=Array.from(document.querySelectorAll('#word-qa>details')).filter(d=>!d.hidden).length+' av 43 spørsmål'");
runtime = runtime.replace("$('word-qa').innerHTML=items.map", "$('word-question-count').textContent=items.length+' spørsmål på engelsk · øvingsforslag, ikke en garanti for sensors spørsmål'; $('word-qa').innerHTML=items.map");
runtime = runtime.replace("const SOURCE = (data?.source || document.getElementById('source-code').value)", 'const SOURCE = data.source');
// Preserve the source explanation, but do not claim sensor-confirmed arrival or a test we did not run.
runtime = runtime.replace('Programmet venter ett sekund etter hvert leddmål slik at roboten rekker å komme fram.', 'Programmet venter fast ett sekund etter hvert leddmål. Det leser ikke tilbake om armen har kommet fram.')
  .replace('Venter etter kommandoen slik at armen rekker å bevege seg.', 'Venter fast ett sekund etter kommandoen, uten måling av ankomst.')
  .replace('Til slutt kjørte jeg hele SPACE-sekvensen i prac.ttt og observerte at roboten traff tastene.', 'En faktisk kjøring i prac.ttt må demonstreres og dokumenteres separat; opptaket på denne siden verifiserer ikke simulatorens treff.');
const wrapper = `/* Adapted from the user's offline teaching guide. Generated by scripts/import-egb339-assessment-guide.mjs. */
export function mountGuide(root, data) {
  const realDocument = root.ownerDocument;
  const document = {
    getElementById: id => root.querySelector('#' + CSS.escape(id)),
    querySelector: selector => root.querySelector(selector),
    querySelectorAll: selector => root.querySelectorAll(selector),
    createElement: (...args) => realDocument.createElement(...args),
    createElementNS: (...args) => realDocument.createElementNS(...args),
  };
  const frames = new Set(), timers = new Set(), observers = [];
  const requestAnimationFrame = fn => { const id = window.requestAnimationFrame(t => { frames.delete(id); fn(t); }); frames.add(id); return id; };
  const cancelAnimationFrame = id => { frames.delete(id); window.cancelAnimationFrame(id); };
  const setTimeout = (fn, delay) => { const id = window.setTimeout(() => { timers.delete(id); fn(); }, delay); timers.add(id); return id; };
  const clearTimeout = id => { timers.delete(id); window.clearTimeout(id); };
  const ResizeObserver = class extends window.ResizeObserver { constructor(callback) { super(callback); observers.push(this); } };
  let controller;
  const dispose = () => { for (const id of frames) window.cancelAnimationFrame(id); for (const id of timers) window.clearTimeout(id); observers.forEach(o => o.disconnect()); root.replaceChildren(); };
  try {
${runtime}
  } catch (error) { dispose(); throw error; }
  return { dispose, controller };
}
`;
fs.writeFileSync(path.join(components, 'guide-runtime.js'), wrapper);
console.log(`Imported guide: ${data.events.length} events, ${data.commands.length} commands, ${figure} Word figures; original source hash verified. No Python executed.`);
