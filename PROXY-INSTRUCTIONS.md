Local proxy for live RA FAQs

What I added
- A lightweight Node/Express proxy at /proxy/server.js that fetches https://www.ra.org.na/faqs and returns the raw HTML with permissive CORS.
- The client script (`script.js`) now tries to fetch the proxy endpoint first (and falls back to direct fetch and then bundled `assets/faqs.json`).

How to run locally
1. Ensure Node.js (>=18) is installed.
2. In a terminal run:
   cd proxy
   npm install
   npm start

3. By default the proxy listens on http://localhost:5050/faqs. When running a static file server from the same host you can configure a reverse proxy or call http://localhost:5050/faqs directly.

Notes
- If you serve your static site from a different port or host, either:
  - Proxy requests from /proxy/faqs to http://localhost:5050/faqs in your dev server, or
  - Edit `script.js` and change the proxy URL to point at your running proxy.
- This is meant for development & testing. For production, set up a secure cached proxy on your server infrastructure.

Additional notes (Dec 23, 2025):
- The site now includes a 500-entry local FAQ bundle at `assets/faqs-500.json`. The client-side loader in `script.js` will prefer this file when present and fall back to `assets/faqs.json`.
- The chat match threshold has been tuned to **0.50** for better precision; adjust `CHAT_MATCH_THRESHOLD` in `script.js` if you need different precision/recall behavior.
- Use `tools/faq_test.ps1` to validate matching quality and verify the FAQ count locally.
