const fs = require('fs');
const path = require('path');

function readJson(p){
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, '..', p), 'utf8')); }
  catch(e){ console.error('Failed to parse', p, e.message); process.exit(2); }
}

const faqs = readJson('assets/faqs-500.json');
const meta = readJson('assets/faqs-500.json.meta.json');

if (!Array.isArray(faqs)) { console.error('faqs is not an array'); process.exit(2); }
if (faqs.length !== 500) { console.error(`Expected 500 FAQ entries, found ${faqs.length}`); process.exit(2); }
if (!meta || meta.count !== faqs.length) { console.error(`Meta count mismatch: meta.count=${meta && meta.count} vs faqs.length=${faqs.length}`); process.exit(2); }

function scoreMatch(a,b){
  a = (a||'').toLowerCase(); b = (b||'').toLowerCase();
  const words = b.split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  let hits=0; words.forEach(w=>{ if (a.includes(w)) hits++; });
  return hits/words.length;
}

const queries = [
  'How do I apply for a road access permit?',
  'How long do permits take to process?',
  'Where can I book a NATIS appointment?',
  'How do I report a pothole with photos?',
  'How do I apply for a temporary road closure for an event?'
];

const requiredThreshold = 0.5; // should match CHAT_MATCH_THRESHOLD
let ok = true;
for (const q of queries){
  let best = {score:0, idx:-1};
  faqs.forEach((f,i)=>{
    const s = Math.max(scoreMatch(f.question, q), scoreMatch(f.answer, q));
    if (s > best.score) { best = {score:s, idx:i}; }
  });
  const item = faqs[best.idx];
  console.log(`Query: ${q}`);
  console.log(` Best score: ${best.score.toFixed(3)}`);
  console.log(` Matched Q: ${item ? item.question : 'NONE'}`);
  if (best.score < requiredThreshold) {
    console.error(`LOW SCORE: query '${q}' best score ${best.score.toFixed(3)} < required ${requiredThreshold}`);
    ok = false;
  }
}

if (!ok) { console.error('One or more queries failed to meet the required match threshold.'); process.exit(3); }

console.log('FAQ validation passed: JSON valid, 500 entries, meta ok, sample matching meets threshold.');
process.exit(0);
