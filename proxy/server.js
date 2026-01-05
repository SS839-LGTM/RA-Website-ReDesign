/* Simple FAQ proxy server
 * Usage: node server.js
 * This fetches https://www.ra.org.na/faqs and returns the HTML with permissive CORS for the static site.
 */
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const app = express();
const PORT = process.env.PORT || 5050;

let cache = { html: null, ts: 0 };
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

app.use((req, res, next) => {
  // Allow requests from local file:// based dev servers and local host origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/faqs', async (req, res) => {
  try {
    const now = Date.now();
    if (cache.html && (now - cache.ts) < CACHE_TTL) {
      res.setHeader('X-Proxy-Cache', 'HIT');
      return res.send(cache.html);
    }

    const upstream = await fetch('https://www.ra.org.na/faqs', { method: 'GET' });
    if (!upstream.ok) return res.status(502).send('Upstream fetch failed');
    const html = await upstream.text();
    cache = { html, ts: now };
    res.setHeader('X-Proxy-Cache', 'MISS');
    res.send(html);
  } catch (e) {
    console.error('Proxy error', e);
    res.status(500).send('Proxy error');
  }
});

app.get('/', (req,res)=> res.send('RA FAQ proxy running. Endpoint: /faqs'));

app.listen(PORT, () => console.log(`RA FAQ proxy listening on http://localhost:${PORT}/ (endpoint: /faqs)`));
