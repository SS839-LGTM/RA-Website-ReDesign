# Developer Notes — FAQ dataset & Chatbot

Summary
- The project now includes a 500-entry Roads Authority FAQ bundle at `assets/faqs-500.json`.
- The chat widget prefers `assets/faqs-500.json` when present; fallback to `assets/faqs.json` remains.
- Chat matching threshold has been tuned to `0.50` (see `script.js`).
- Visual update: the site navbar was *briefly* modernized to a glass/glow 'futuristic' style but was reverted at the user's request; site uses the core navbar styles.
- Added two page slide transitions (type A = Home/Contact/Privacy/Terms/Accessibility; type B = tab pages) with JS hooks to play a short exit animation before navigation and an enter animation on load.
- Added a small in-page preview control (floating button at bottom-left) to quickly demo both transition types without navigating; click the icon then choose “Preview Home/Contact (A)” or “Preview Tab (B)”.
- Search UI: removed page paths from results, added a subtle fade-in animation and yellow/blue accents for snippets (ensures reduced-motion support and accessible contrast).

Quick preview notes
- To try it locally: open any page, click the small 🔁 button in the lower-left to reveal the preview panel, then click a preview button.
- The transition duration is ~260ms; `--page-transition-duration` can be tuned in `style.css`.

Files added/updated
- `assets/faqs-500.json` — 500 Q/A pairs (primary, machine-generated dataset)
- `assets/faqs-500.json.meta.json` — metadata: count, timestamp, generator
- `script.js` — `loadFAQs()` now prefers `assets/faqs-500.json`; `CHAT_MATCH_THRESHOLD` tuned to 0.50
- `tools/faq_test.ps1` — PowerShell test harness to simulate queries and check match scores
- `PROXY-INSTRUCTIONS.md` — updated with note about the preferred local bundle

How to verify locally
1. Verify JSON count (PowerShell):
   (Get-Content -Raw 'assets/faqs-500.json' | ConvertFrom-Json).Count

2. Run quick matching tests (PowerShell):
   powershell -NoProfile -ExecutionPolicy Bypass -File tools\faq_test.ps1

3. Run the CI validation locally (Node):
   node tools/ci_validate_faqs.js

4. Manual QA checklist (recommended cross-browser checks):
   - Open `index.html` and confirm chat widget opens and shows greeting.
   - Ask sample questions (see `tools/faq_test.ps1`) and confirm accurate matches.
   - Confirm UI behavior on desktop, tablet and mobile (chat panel responsive; suggestions visible; input accessible via keyboard).
   - Verify search overlay and results render properly (no page path shown in results; title + snippet visible). 

Notes for maintainers
- To regenerate the FAQ bundle, update the generator script (not included) and replace `assets/faqs-500.json`, then update `assets/faqs-500.json.meta.json` with new timestamp and count.
- Keep `tools/faq_test.ps1` up-to-date with representative queries when tuning `CHAT_MATCH_THRESHOLD`.

Contact
- For questions about the chatbot or FAQ generation process, contact the web team and reference this DEVNOTES entry.