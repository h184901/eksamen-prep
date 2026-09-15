#!/usr/bin/env node
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const base='public/egb339/assessment-2-1/';
const data=JSON.parse(fs.readFileSync(base+'guide-data.json','utf8'));
const provenance=JSON.parse(fs.readFileSync(base+'provenance.json','utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
assert.equal(hash(data.source),data.sourceHash);
assert.equal(data.events.length,2137);
assert.equal(data.commands.length,15);
assert.equal(data.questions.length+4,43);
assert.deepEqual(data.wordStats,{paragraphs:398,tables:15,equations:26,images:6});
const fk=q=>{const[a,b,c]=q,r=135*Math.sin(b)+147*Math.cos(c)+60;return[r*Math.cos(a),r*Math.sin(a),138+135*Math.cos(b)-147*Math.sin(c)-80];};
const limits=[[-90,90],[0,85],[-10,75]].map(p=>p.map(d=>d*Math.PI/180));
let maxError=0,wait=0,count=0,previousQ=[0,0,0];
for(const e of data.events){
  assert(e.q.length===3&&e.q.every(Number.isFinite));assert(fk(e.q).every(Number.isFinite));
  assert(Number.isFinite(e.time));
  if(e.kind==='command'){
    const check=data.checks[count++];
    assert.equal(e.key,check.key);assert.equal(e.phase,check.phase);
    const error=Math.hypot(...fk(e.q).map((v,i)=>v-check.target[i]));
    maxError=Math.max(error,maxError);assert(error<=1e-6);
    assert(e.q.every((v,i)=>v>=limits[i][0]-1e-9&&v<=limits[i][1]+1e-9));
    previousQ=e.q;
  } else assert.deepEqual(e.q,previousQ,'Only a command changes the commanded pose');
  if(e.kind==='wait')wait+=e.duration;
  if(e.kind==='line'){
    const line=(e.file==='runner'?data.runner:data.source).split('\n')[e.line-1].trim();
    assert(line&&!line.startsWith('#'),'Comments and blank lines are not executed events');
  }
}
assert.equal(wait,17.5);assert.equal(count,15);
for(const key of 'SPACE'){
  assert.deepEqual(data.commands.filter(c=>c.key===key).map(c=>c.phase),['above','press','lift']);
  assert(data.events.some(e=>e.key===key&&e.kind==='wait'&&e.phase==='dwell'&&e.duration===.5));
}
for(const item of provenance.files)assert.equal(hash(fs.readFileSync(base+item.file)),item.sha256);
const chapters=data.wordChapters.map(c=>c.html).join('');
assert.equal((chapters.match(/<table/g)||[]).length,15);
assert.equal((chapters.match(/<img/g)||[]).length,6);
assert.equal((chapters.match(/class="word-equation"/g)||[]).length,26);
for(const text of [chapters,fs.readFileSync('src/content/egb339/assessment-2-1/guide.html','utf8')]) assert(!/<script|\son\w+=|file:\/\/|\/Users\/|\/home\//i.test(text));
const runtime=fs.readFileSync('src/components/egb339/assessment-guide/guide-runtime.js','utf8');
assert(!runtime.includes('window.EGB_GUIDE'));
assert(runtime.includes('observers.forEach(o => o.disconnect())'));
assert(runtime.includes("['dwell','Hold']"));
assert(runtime.includes("tr.id='code-line-'+n"));
assert(runtime.includes('/^(3 |6 |7 |10 |12 |17 |22 )/'),'Word chapter 12 also needs the source correction');
assert(!runtime.includes('<math display="block">'),'Derivation equations use the existing KaTeX renderer');
const client=fs.readFileSync('src/components/egb339/assessment-guide/AssessmentGuideClient.tsx','utf8');
assert(!client.includes('dangerouslySetInnerHTML'),'React must not overwrite the runtime-owned descendants on navigation');
assert(client.includes('egb339:sections-ready'),'Lazy lesson notifies navigation on first initialization');
const navigation=fs.readFileSync('src/components/egb339/study-week/StudyWeekNavigation.tsx','utf8');
assert(navigation.includes('addEventListener("egb339:sections-ready", schedule)'));
assert(navigation.includes('removeEventListener("egb339:sections-ready", schedule)'));
console.log(`Assessment 2.1 PASS: 2137 finite events, 15 commands with FK max error ${maxError} mm, 17.5 s fixed waits, 43 English questions, all Word tables/equations/figures and asset hashes. Browser rendering is a separate check.`);
