# Deployment

The wiki is a static site: `npm run build` writes everything, including the Pagefind search index and the sitemap, to `dist/`. There's no server or database.

It's published on **GitHub Pages** at **https://avie-dev.github.io/sangriaGuide/**, from the repository [github.com/avie-dev/sangriaGuide](https://github.com/avie-dev/sangriaGuide).

## How publishing works

Every push to `main` runs [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml):

1. `npm ci`, `npm run check` (types and tracker) and `npm test` (calculators).
2. `npm run build`. This fails on broken internal links or invalid game data, and nothing is published if it does.
3. The `dist/` folder is uploaded and published to GitHub Pages.

You can also run it by hand from the repository's **Actions** tab (**Deploy to GitHub Pages → Run workflow**).

**One-time setup:** under **Settings → Pages**, set **Source** to **GitHub Actions**.

## The address and the sub-path

A GitHub Pages project site lives under a sub-path (`/sangriaGuide/`). [`astro.config.mjs`](../astro.config.mjs) sets:

| Setting | Default | Override at build time |
|---|---|---|
| `SITE`, the origin | `https://avie-dev.github.io` | `SITE_URL` |
| `BASE`, the sub-path | `/sangriaGuide` | `BASE_PATH` (use `/` for a custom domain or root hosting) |
| `REPO`, the repository (Edit-page links, issue templates) | `https://github.com/avie-dev/sangriaGuide` | `REPO_URL` (empty turns the links off) |

**Articles keep writing internal links from the site root**, like `[Classes](/classes/)` or `<LinkCard href="/classes/" />`. At build time, [`src/lib/base-links.mjs`](../src/lib/base-links.mjs) adds the base path to every one, and the components use `import.meta.env.BASE_URL`. The link checker runs after that, so a missing page still fails the build.

The local dev server follows the same base: open http://localhost:4321/sangriaGuide/.

### Moving to a custom domain later

1. In **Settings → Pages → Custom domain**, add the domain and follow GitHub's DNS instructions.
2. Change the defaults in `astro.config.mjs`: `SITE` to `https://your-domain` and `BASE` to `/`.
3. Push. Nothing in the articles needs to change.

## Checks

`deploy.yml` is the only workflow. It runs `npm run check`, `npm test` and `npm run build` before every publish, and a failure stops the publish. For other people's pull requests, run the same checks locally before merging (see below).

The source audit (`npm run audit`) isn't automated, because it needs the official snapshots (`npm run research`). Those are copies of official text and are never committed. Run it before a release, or when the official site changes.

## Before a release

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

## Still to decide

- **Licence:** there's no `LICENSE` file yet, for the code or the article text. The articles paraphrase the official guides with attribution. They don't copy them.

## Other hosts

Any static host works. Build with `npm ci && npm run build` (set `SITE_URL`, and `BASE_PATH=/` if it serves from the root) and publish `dist/`.
