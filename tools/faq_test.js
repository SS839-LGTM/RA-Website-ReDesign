const fs = require('fs');
const path = require('path');
const faqs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assets', 'faqs-500.json'), 'utf8'));

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
  'What documents to register a vehicle?',
  'How do I get a weighbridge certificate?',
  'How do I arrange a site inspection?',
  'Can I request traffic data for my area?',
  'How do I apply for a temporary road closure for an event?',
  'How can I report a damaged bridge?'
];

queries.forEach(q=>{
  let best = {score:0, idx:-1};
  faqs.forEach((f,i)=>{
    const s = Math.max(scoreMatch(f.question, q), scoreMatch(f.answer, q));
    if (s > best.score) best = {score:s, idx:i};
  });
  const item = faqs[best.idx];
  console.log('Query:', q);
  console.log('Best score:', best.score.toFixed(3));
  console.log('Matched Q:', item ? item.question : 'NONE');
  console.log('Matched A:', item ? item.answer : '');
  console.log('---');
});
