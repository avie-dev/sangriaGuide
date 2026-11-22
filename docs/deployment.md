# Deployment

The wiki is a static site: `npm run build` writes everything, including the Pagefind search index and the sitemap, to `dist/`. There's no server or database. The planned host is **Cloudflare Pages**. Any static host works.

> Nothing has been deployed yet. Choose the domain first (see "Before the first deploy").

## Before the first deploy

1. **Choose the address.** Set `SITE` in [`astro.config.mjs`](../astro.config.mjs), or the `SITE_URL` environment variable at build time. It's currently the placeholder `https://sangria-falls-wiki.pages.dev`. The sitemap, canonical URLs, social previews and `robots.txt` all use it.
2. **Repository:** [github.com/avie-dev/sangriaGuide](https://github.com/avie-dev/sangriaGuide) (the `origin` remote). `REPO` in `astro.config.mjs` points at it, which adds an "Edit page" link to every page and points the links on `/about/contributing/` at the issue templates. The `REPO_URL` environment variable overrides it.
3. **Choose a licence** for the code and the article text, and add a `LICENSE` file. The articles paraphrase the official guides with attribution. They don't copy them.

## Cloudflare Pages (Git integration)

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, then select the repository.

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | from `.node-version` (22); or set the `NODE_VERSION=22` environment variable |
| Environment variables (optional) | `SITE_URL`, `REPO_URL` |

Every push to `main` deploys, and pull requests get preview URLs. `public/_headers` sets security headers and long caching for hashed assets.

**Custom domain:** in the Pages project, go to **Custom domains** and add the domain. Then set `SITE_URL` to it and redeploy, so the sitemap and canonical URLs match.

## Other hosts

Build with `npm ci && npm run build` and serve `dist/`. `_headers` is Cloudflare-specific (Netlify reads the same format). Elsewhere, set equivalent headers in the host's own configuration.

## Checks

| Where | What |
|---|---|
| Every push and pull request (`.github/workflows/ci.yml`) | `npm run check` (types and tracker), `npm test` (calculators), `npm run build` (fails on broken internal links or invalid game data) |
| Weekly (`.github/workflows/source-drift.yml`) | Downloads the official guides (`npm run research`), runs `npm run audit` and the external link check. A failure means the official site changed. Read the attached `audit-report` and update the wiki. |

The official snapshots (`research/raw/`, `research/text/`) are copies of official text, so they're never committed. They're recreated with `npm run research`.

## Before each release

```powershell
npm ci
npm run research
npm run audit
npm run check
npm test
npm run build
npm run check:external
```

Then add an entry to [`CHANGELOG.md`](../CHANGELOG.md). It's shown on the site at `/about/changelog/`.
