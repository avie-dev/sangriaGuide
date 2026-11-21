# Contributing

Thanks for helping. This wiki's value is accuracy, so the rules below matter more than style.

## Research rules

- **Don't invent anything.** No mechanics, NPC locations, commands, prices, percentages or requirements that an official Sangria Falls page doesn't state.
- **Vanilla V Rising and Bloodcraft are not sources.** Sangria Falls changes a lot. Only state a mechanic if a Sangria Falls source confirms it.
- **Separate fact from advice.** Official facts get the `official` label; tips and strategies get `community`.
- **Separate global from RPG 04.** Anything that only applies to RPG 04 gets the `rpg04` label.
- **Unsure? Say so.** Mark it `verify` and add it to [`research/open-questions.md`](research/open-questions.md).
- **No tier lists or "best in slot" claims** without real testing data.
- **Paraphrase.** Explain in your own words and link the official page; don't paste official articles.
- **Never translate command syntax.** `.meditate panel` stays as it is; only the description is translated.

## Article frontmatter

```yaml
---
title: Meditation
description: One or two sentences; also used in search results and link previews.
status: draft            # planned | draft | written | verified
lastVerified: 2026-11-22 # the day you checked every claim against the sources
sources:                 # ids from src/data/official-sources.json
  - meditacao
  - auto-prestigio
labels: [official, vip]  # official | community | rpg04 | verify | vip | purchase
---
```

The page title, labels, a work-in-progress notice (unless `status: verified`) and the official sources with the last-verified date are added automatically. Source ids are checked at build time: an unknown id fails the build.

To label a single claim inside an article:

```mdx
import Label from '../../components/Label.astro';

Double Meditation is unlocked separately. <Label type="purchase" />
```

## Article structure

Use the sections that apply, in this order: short explanation, quick facts, requirements, how to unlock, step-by-step walkthrough, detailed mechanics, rewards and costs, recommended strategies, common mistakes, FAQ, commands and shortcuts, related guides. Sources and the last-verified date are appended automatically.

Where a guide differs for players with and without the ScarletInterface, show both (for example with Starlight's `<Tabs>`).

## Before you open a pull request

```powershell
npm run check
npm run build
```

Then update the article's row in [`docs/progress.md`](docs/progress.md).
