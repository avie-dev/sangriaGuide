# Sangria Falls Wiki

An unofficial, English-first community wiki and progression guide for [Sangria Falls](https://www.sangriafalls.com/en/), a heavily customised MMORPG-style V Rising server. The main target is **[GLOBAL] Sangria Falls [RPG 04] [2X]**.

It is not operated or endorsed by the Sangria Falls staff. Every article links to the official pages it is based on.

The full project brief is in [`docs/master-prompt.md`](docs/master-prompt.md). Progress is tracked in [`docs/progress.md`](docs/progress.md).

## Stack

- [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/), static output
- Articles in Markdown/MDX under `src/content/docs/`
- Game data as JSON/TypeScript under `src/data/`, kept apart from components
- Search with Pagefind (built into Starlight), sitemap included
- Planned hosting: Cloudflare Pages (not deployed yet)

## Local development

Requires Node.js 22 or later.

```powershell
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/, with the search index
npm run preview    # serve the built site
npm run check      # type-check, and fail if docs/progress.md is out of date
npm test           # calculator tests (src/lib/calc)
npm run audit      # check every number and command against the official sources (needs npm run research)
npm run coverage   # validate docs/coverage.yaml and regenerate docs/progress.md
npm run check:external  # after a build: check links to outside sites
```

## Project layout

```
docs/
  master-prompt.md        the project brief
  information-architecture.md  sections, URL scheme, page types, unlock dependencies
  coverage.yaml           every planned page: brief items, sources, reading order, status
  progress.md             tracker (article tables generated from coverage.yaml)
scripts/
  coverage.mjs            validates coverage.yaml, regenerates the tracker
  check-external-links.mjs  checks outside links in the built site
research/                 source research (Phase 1)
  fetch.mjs               downloads official pages into research/raw/ (gitignored)
  extract.mjs             converts them to plain text in research/text/ (gitignored)
  inventory.mjs           builds the source inventory and the site's source registry
  source-inventory.md     generated: every official page, what it covers, coverage gaps
  open-questions.md       things that need staff or community confirmation
src/
  content/docs/           wiki articles, one folder per sidebar section
  components/             article components (see /about/components/ on the site)
  components/overrides/   Starlight overrides (dark default, labels, sources, footer)
  data/                   game data (currencies, classes, cost tables), source registry, labels
  lib/coverage.ts         build-time access to the page plan and open questions
  styles/theme.css        charcoal, crimson and gold theme
```

To refresh the research snapshots and source registry: `npm run research`.

## Writing an article

See [`CONTRIBUTING.md`](CONTRIBUTING.md).
