# QA report (Phase 9)

Date: 2026-11-22. Sources: the official site snapshots taken on the same date (`research/text/`, from `npm run research`).

This report walks through the quality checklist in section 9 of [`master-prompt.md`](master-prompt.md). Each item gives the result and how it was checked. The machine-generated details are in [`audit-report.md`](audit-report.md).

## What "verified" means here

A page's **verified** status in [`coverage.yaml`](coverage.yaml) means:

1. Every number and every command on it passes the source audit (`npm run audit`).
2. Its prose was written from, and reviewed against, the official sources it cites.

It does **not** mean confirmed in game. Pages still carry `status: written`, and the on-page notice says "Checked against the official guides, but not yet confirmed in game". Anything the sources leave open is marked `verify` and linked to an [open question](../research/open-questions.md).

## Checklist

| Brief item | Result | How |
|---|---|---|
| Audit every official guide | ✅ All 70 sources (51 guides, 12 class pages, 7 hubs) are cited by at least one page | `npm run audit` (uncited sources: 0) |
| Check every mechanic against its source | ✅ 1,275 numbers on 197 pages checked against each page's cited sources; 0 unexplained | `npm run audit`. Numbers this wiki computed are listed with their formulas in [`audit-allowlist.yaml`](audit-allowlist.yaml) |
| Validate every command | ✅ 337 command uses checked; 0 unknown. 309 official commands in the reference, parsed straight from the source | `npm run audit`, `research/commands-data.mjs` |
| Verify all currency calculations | ✅ Cost tables total-checked at build time; 33 calculator tests reproduce the official examples | `npm run build`, `npm test` |
| Check all internal and external links | ✅ Internal links and anchors pass at build time; 189 external links reachable | starlight-links-validator, `npm run check:external` |
| Test calculators with multiple scenarios | ✅ 33 automated tests plus manual browser scenarios for all 8 tools | `npm test`; prestige bounds checked against 3 possible cost curves over all 231 ranges |
| Test mobile responsiveness | ✅ All 197 pages at 375 px wide: no horizontal overflow | Browser scan |
| Verify navigation completeness | ✅ All 196 content pages are in the sidebar; 0 planned pages left | Sidebar vs built pages; `npm run coverage` |
| Check for duplicated or contradictory information | ✅ Key repeated facts consistent; contradictions found and fixed (below) | grep sweeps of repeated figures; audit |
| Identify outdated mechanics | ✅ Documented where the guides say something changed (below) | Source review |
| Clearly label unverified content | ✅ Every page with an `<Unverified>` block has the `verify` label (checked automatically) | `npm run audit` |
| Ensure all 11 classes have complete articles | ✅ 11 classes + Awakened, each with abilities, evolutions, attribute tables, default attributes and commands | Class pages; tables generated from the official class pages |

## Fixed during QA

- **Commands:** four class pages showed `.class testar <class>`, which is an extension of the English guide's single example (`.class testar noctarin`). They now quote only the official forms and point to Q-020.
- **Unsourced claims removed:**
  - that VIP doesn't change drop chances (the summary said "everything else is the same")
  - that weapon and blood XP is lost at level 100
  - a sentence about Nyxaris
- **Contradiction fixed:** "no transfers between players" (Bank guide) vs the married couple's Joint Account (Marriage guide). The economy pages now state the exception.
- **Citations added:** 10 pages used a fact from a guide they didn't cite. For example, the Joint Account's 50,000 daily limit on the Bank page now cites the Marriage guide.
- **Build planner:** it showed the sum of a class's grades where the official total differs (Mortak Unshakable Max Health). It now shows the official total and names the inconsistency.
- **Prestige calculator:** its bounds now use the guide's "costs rise with each prestige", narrowing for example 0→6 from 450–17,318 to 450–5,135.

## Outdated or changed mechanics the guides mention

These are already reflected in the articles:

- **Pillar achievements** are no longer quests. The echo is bought for 200,000, and old in-progress missions were removed.
- The **old launcher** and the **old interfaces** (Eclipse, SangrisInterface) are discontinued. The official install video still shows them.
- The **Greater Essence** currency item is retired; each converts to 1,000 Ourosangue.
- **Soul Shards** no longer drop on the ground. They come by mail.
- **Profession services** have had price floors, ceilings and weekly slots since 30/09/2026.
- **Feats** converted pre-existing history into medals at first login.

## Known limits (open questions)

23 open questions remain in [`research/open-questions.md`](../research/open-questions.md). The ones that most affect players:

- **Q-001 / Q-002:** RPG 04's own settings and how to join it specifically.
- **Q-009:** how stat bonuses stack. This blocks combined totals in the build planner.
- **Q-011 / Q-017:** the XP curve and prestige costs 2–19. These block exact meditation and prestige figures.
- **Q-018 / Q-019:** published class totals that don't add up (Mortak, Umbrellis).
- **Q-023:** individual dungeon rooms and bosses aren't documented.

None of these can be answered from the official site. They need in-game checks or answers from the staff.

## Re-running

```powershell
npm run research   # refresh the official snapshots (network)
npm run audit      # numbers, commands, labels → docs/audit-report.md
npm run check      # types + tracker
npm test           # calculators
npm run build      # internal links
npm run check:external
```
