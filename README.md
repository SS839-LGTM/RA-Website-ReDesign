# Roads Authority Website ReDesign

![Validate FAQs](https://github.com/<OWNER>/<REPO>/actions/workflows/validate-faqs.yml/badge.svg)

Notes
- Replace `<OWNER>/<REPO>` in the badge URL above with your repository owner and name to show the real workflow status on GitHub.
- CI validates `assets/faqs-500.json` (JSON validity, count == 500, meta consistency) and runs matching tests in both Ubuntu (Node) and Windows (PowerShell) environments.

See `docs/DEVNOTES.md` for developer details on the FAQ dataset and validation.

## Maps & NATIS centres
- An interactive NATIS centres map has been added to `index.html#natis` using Leaflet (OpenStreetMap tiles). The dataset is at `assets/natis-centres.json`.
- Markers immediately open Google Maps directions when clicked. A "Find Nearest NATIS" button will detect the user's location and open Google Maps directions to the nearest centre.
- To enable the Google Maps Embed API for the contact page, copy `assets/google-maps-config.js.example` to `assets/google-maps-config.js` and set your API key in that file (do not commit your API key to public repos).
