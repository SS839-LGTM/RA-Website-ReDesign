RA FAQ Proxy

Purpose
- Provide a simple local proxy endpoint (/faqs) that fetches the live https://www.ra.org.na/faqs HTML and returns it with permissive CORS headers so client-side scripts can parse it (useful for the chat widget).

Usage (local development)
1. Install dependencies:
   cd proxy
   npm install

2. Run the proxy server:
   npm start

3. In your browser, the FAQ proxy will be available at http://localhost:5050/faqs

Notes
- The proxy caches results for 15 minutes (in-memory) to reduce load on the upstream site.
- In production, run this behind a proper server and secure access as appropriate.
- The static site will attempt to fetch /proxy/faqs first; when running locally you can either:
    - Serve the proxy on the same host (e.g., reverse proxy from your dev server), or
    - Update the client script to point to http://localhost:5050/faqs when you are testing locally.
