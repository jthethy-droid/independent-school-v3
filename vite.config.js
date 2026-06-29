# UK Independent Schools — Browser & AI Advisor

A React app for browsing UK independent schools by fee, results, sport, location,
and scholarship type, with an AI-powered "School Advisor" that matches a child's
profile to schools and builds an admissions roadmap.

## What's inside

- **45 schools** across Berkshire, Buckinghamshire, Surrey, London, Kent,
  Hampshire, Wiltshire, Gloucestershire, and Cambridgeshire
- **Search & filter** by name, sport, subject, scholarship type, county, gender,
  age group, and fee
- **Distance search** — enter a UK postcode (via the free postcodes.io API) and
  filter schools within a chosen radius
- **Three views** — list, split (list + map), and full map, using Leaflet/OpenStreetMap
- **Shortlist & compare** — star up to 4 schools and compare them side by side
  on fees, results, scholarships, and more
- **School Advisor** — a short questionnaire about a child's age, interests, and
  preferences that calls the Claude API to generate personalised top-5 matches
  and a scholarship/admissions roadmap

## Data accuracy — please read

Fees for **Eton College, Wycombe Abbey, and Lambrook School** have been checked
against each school's own published 2025/26 fee schedule and are marked
"verified" in the app.

**Every other school's fee is an estimate.** UK independent school fees rose
roughly 15–20% in January 2025 when the government removed the VAT exemption
for private education. The figures in this dataset were collected before that
change, so all unverified fees have been adjusted upward by an approximate,
uniform 17% to reflect that shift — they are **not** individually confirmed
against each school's current price list. Exam results, pupil numbers, and
"known for" facts throughout the dataset are illustrative sample data, not
verified against current school records or inspection reports.

**Before making any decision based on this app, check fees and facts directly
with the school.** The in-app disclaimer banner and the per-school "verified" /
"estimated" labels are there to make this clear as you browse.

## Running it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## Using the AI School Advisor outside claude.ai

The School Advisor calls the Claude API directly from your browser. Inside
claude.ai's artifact environment this works automatically. Running this project
on your own machine, you'll need to supply your own Anthropic API key:

1. Get a key from [console.anthropic.com](https://console.anthropic.com)
2. Click the ⚙ settings icon in the app's top-right corner
3. Paste your key in — it's kept only in memory for that browser tab and is
   never saved to disk or sent anywhere except directly to `api.anthropic.com`

Note this will use your own API credits/billing. The request sends the child's
profile and a summary of all 45 schools' public data (fees, sports, subjects,
results) to the API — no other personal data leaves your browser.

## Project structure

```
.
├── index.html          entry HTML (loads Google Fonts: Fraunces + Source Sans 3)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         React root
    └── App.jsx          the entire app (data + all components)
```

Everything — the school dataset, every UI component, the map, the advisor — lives
in `src/App.jsx` as a single file, matching how it was originally built as a
Claude artifact. Feel free to split it into multiple files if you extend it.

## Known limitations

- The map (Leaflet) and postcode lookup (postcodes.io) require an internet
  connection and load from public CDNs/APIs at runtime.
- The School Advisor needs either claude.ai's environment or your own Anthropic
  API key — it has no offline fallback.
- This is a prototype with sample/estimated data, not a production admissions
  tool. See the data accuracy section above.

## License / attribution

Built as a prototype. No school logos, trademarks, or proprietary data are
included — addresses, fee bands, and facts are illustrative or drawn from
public sources as noted above.
