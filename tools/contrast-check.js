// Simple WCAG contrast checker
const colors = [
  {name:'tile1-top', hex:'#00a7e6'},
  {name:'tile1-bottom', hex:'#008fcf'},
  {name:'tile2-top', hex:'#0096d6'},
  {name:'tile2-bottom', hex:'#0082be'},
  {name:'tile3-top', hex:'#0078c1'},
  {name:'tile3-bottom', hex:'#006aa8'},
  {name:'tile4-top', hex:'#0062a8'},
  {name:'tile4-bottom', hex:'#00528f'},
  {name:'tile5-top', hex:'#005092'},
  {name:'tile5-bottom', hex:'#003f72'},
];

function hexToRgb(hex){
  const h = hex.replace('#','');
  return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)];
}

function srgbToLin(c){
  c = c/255;
  return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4);
}

function luminance(hex){
  const [r,g,b] = hexToRgb(hex);
  return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b);
}

function contrast(hexA, hexB){
  const L1 = luminance(hexA); const L2 = luminance(hexB);
  const light = Math.max(L1,L2); const dark = Math.min(L1,L2);
  return (light+0.05)/(dark+0.05);
}

const fg = '#ffffff';
console.log('Contrast report vs white ('+fg+')');
console.log('Thresholds: AA normal >=4.5, AA large >=3.0');
console.log('---');
colors.forEach(c => {
  const ratio = contrast(c.hex, fg);
  console.log(`${c.name} ${c.hex} — contrast ${ratio.toFixed(2)} :1` + (ratio>=4.5 ? ' ✅ AA normal' : (ratio>=3.0 ? ' ⚠️ AA large only' : ' ❌ Fails AA')));
});
