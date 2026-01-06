// scripts/capture_screenshots.js
// Capture responsive screenshots for review (desktop/tablet/mobile)
// Usage: node scripts/capture_screenshots.js

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outDir = path.resolve(__dirname, '..', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { url: 'http://localhost:5500/index.html#natis', name: 'index-natis' },
  { url: 'http://localhost:5500/contact.html', name: 'contact' }
];

const viewports = [
  { name: 'desktop', width: 1366, height: 768 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 375, height: 812 }
];

(async () => {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // If we're running without an HTTP server, inject the local NATIS dataset into the page
  // and monkey-patch fetch so the index map can obtain the centres data even when opened via file://.
  try {
    const natisJsonPath = path.resolve(__dirname, '..', 'assets', 'natis-centres.json');
    if (fs.existsSync(natisJsonPath)) {
      const natisRaw = fs.readFileSync(natisJsonPath, 'utf8');
      let natisData = {};
      try { natisData = JSON.parse(natisRaw); } catch (e) { console.warn('Could not parse natis-centres.json:', e.message); }
      await page.evaluateOnNewDocument((data) => {
        // expose dataset
        window.__INJECTED_NATIS = data;
        // preserve native fetch
        if (!window._origFetch) window._origFetch = window.fetch;
        window.fetch = function(input, init) {
          const url = (typeof input === 'string') ? input : (input && input.url) ? input.url : '';
          if (url && (url.endsWith('/assets/natis-centres.json') || url.indexOf('assets/natis-centres.json') !== -1)) {
            return Promise.resolve(new Response(JSON.stringify(window.__INJECTED_NATIS), { status: 200, headers: { 'Content-Type': 'application/json' } }));
          }
          return window._origFetch.apply(this, arguments);
        };
      }, natisData);
      console.log('Injected local NATIS dataset for file:// testing.');
    }
  } catch (e) { console.warn('NATIS injection failed', e); }

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const p of pages) {
      console.log(`Loading ${p.url} at ${vp.name} (${vp.width}x${vp.height})`);
      try {
        await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 30000 });
      } catch (err) {
        console.warn('Page load warning:', err.message);
      }

      // Wait for map or relevant section to appear (graceful)
      if (p.name === 'index-natis') {
        try {
          await page.waitForSelector('#natis-map .leaflet-pane, .natis-visual', { timeout: 8000 });
        } catch (_) { console.warn('NATIS map did not fully initialize in time.'); }
      }

      if (p.name === 'contact') {
        try {
          await page.waitForSelector('#contact-map-iframe, #contact-map-wrap iframe', { timeout: 8000 });
        } catch (_) { console.warn('Contact map iframe not visible yet.'); }
      }

      // Full page screenshot
      const fullPath = path.join(outDir, `${p.name}-${vp.name}-full.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      console.log('Saved', fullPath);

      // Region screenshot: the section of interest
      let selector = p.name === 'index-natis' ? '.natis-section' : '#contact-map-wrap';
      const el = await page.$(selector);
      if (el) {
        const box = await el.boundingBox();
        if (box) {
          const padding = 12;
          const clip = {
            x: Math.max(0, box.x - padding),
            y: Math.max(0, box.y - padding),
            width: Math.min(page.viewport().width, box.width + padding * 2),
            height: Math.min(page.viewport().height, box.height + padding * 2)
          };
          const regionPath = path.join(outDir, `${p.name}-${vp.name}-region.png`);
          await page.screenshot({ path: regionPath, clip });
          console.log('Saved region', regionPath);
        } else {
          console.warn('Could not determine bounding box for', selector);
        }
      } else {
        console.warn('Selector not found on page:', selector);
      }

      // Small pause between pages
      await page.waitForTimeout(600);
    }
  }

  await browser.close();
  console.log('Screenshots complete. Files are in:', outDir);
})();