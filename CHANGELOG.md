# Changelog

The version history of the Sangria Falls Wiki. Newest first. Dates are when the work was done. The
wiki is published at https://avie-dev.github.io/sangriaGuide/. Each entry's details are in the git history and in
`docs/progress.md`.

## 2026-11-22: Deployment and contribution readiness (Phase 10)

- Homepage with the roadmap, popular guides, class overview, essential commands, latest updates and FAQ.
- Published on GitHub Pages (https://avie-dev.github.io/sangriaGuide/), deployed from `main` by GitHub Actions after the checks pass. Internal links get the `/sangriaGuide` sub-path at build time. `robots.txt` points to the sitemap. See `docs/deployment.md`.
- One GitHub Actions workflow (`deploy.yml`) checks, tests, builds and publishes on every push to `main`.
- Issue and pull request templates, and a "How to contribute" page on the site.
- Previous and next page links on every article.
- Removed the copy-summary-for-Discord button from pages.
- Connected to the GitHub repository (`avie-dev/sangriaGuide`): every page has an "Edit page" link, and the contribute page links to the issue templates.

## 2026-11-22: Source verification and QA (Phase 9)

- Source audit (`npm run audit`): every number and command on every page is checked against the official guides. 0 unexplained numbers, 0 unknown commands.
- FAQ, server mechanics FAQ and troubleshooting pages.
- Fixes: removed unsourced claims, added the marriage Joint Account exception, added 10 missing citations.
- All 191 planned pages verified against the sources. See `docs/qa-report.md`.

## 2026-11-22: Calculators (Phase 8)

- Eight tools: meditation, prestige, Pulses and Transfusions, gathering income, class evolutions, pet upgrades, dungeon keys and a build planner.
- 33 automated tests. No invented formulas: ranges or "not published" where the guides are silent.

## 2026-11-22: Dungeons, events, endgame, world and reference (Phase 7)

- 61 pages: dungeons, events, quests, schools, endgame, Battle Pass and VIP, world systems and the reference section (all 309 commands, NPCs, items, bosses, glossary, cost tables, drop chances).

## 2026-11-22: Economy, professions, pets and equipment (Phase 6)

- 49 pages, including the earning guide and budgets, every profession, pets and Sangrulhos, fortification and refinement, and build frameworks.

## 2026-11-22: Character, meditation and classes (Phase 5)

- 33 pages. All 11 classes and the Awakened translated from the Portuguese class pages, with attribute tables generated from the official pages (5 published totals that don't add up are flagged).

## 2026-11-22: Beginner walkthrough (Phase 4)

- 36 pages: getting started and the 15-stage progression walkthrough.

## 2026-11-22: Foundations (Phases 1–3)

- Research and source inventory of the official site (51 guides, 12 class pages, 7 hubs).
- Information architecture and the 191-page coverage plan.
- Astro + Starlight site, reusable components, validated game data and link checking.
