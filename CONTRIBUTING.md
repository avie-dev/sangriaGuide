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

## Adding a page

1. Find the page in [`docs/coverage.yaml`](docs/coverage.yaml). Every page the wiki will have is listed there; add an entry if it is genuinely missing.
2. Create `src/content/docs/<slug>.mdx`.
3. In `coverage.yaml`, set `built: published` (and `writing`, `verified` as they progress).
4. Run `npm run coverage` to regenerate the tracker.

## Article frontmatter

```yaml
---
title: Meditation
description: One or two sentences; also used in search results.
summary: Optional. A one-line summary; used for link previews instead of the description.
status: draft            # planned | draft | written | verified
lastVerified: 2026-11-22 # the day you checked every claim against the sources
sources:                 # ids from src/data/official-sources.json
  - meditacao
  - auto-prestigio
labels: [official, vip]  # official | community | rpg04 | verify | vip | purchase
---
```

Added automatically, with no component needed: breadcrumbs, the labels, a work-in-progress notice (unless `status: verified`), *Before you read* and *Related guides* links (from `needs` in `coverage.yaml`), and the official sources with the last-verified date. Unknown source ids fail the build, and so do broken internal links and anchors.

## Components

Import from `src/components/`. Copy-paste examples are under [Component examples](#component-examples) below.

| Component | Use it for |
|---|---|
| `QuickFacts` | The quick-facts box near the top |
| `Requirements` | What you need before you can use a system |
| `PlayModes` | Steps that differ with and without the interface (two tabs; the reader's choice is remembered) |
| `Command` | A copyable chat command with its description |
| `Currency` | An amount like 15,000 Ourosangue, formatted consistently |
| `CostTable` | A cost table from `src/data/cost-tables.yaml` |
| `ClassCard`, `ClassGrid` | Class summaries from `src/data/classes.yaml`; the grid can filter by damage type |
| `ClassBonusSummary` | Every class's Evolution III totals side by side |
| `CommandTable` | The full command list from `src/data/commands.json` (or one system's, with `source="pets"`) |
| `NpcTable` | NPCs from `src/data/npcs.yaml` (`beginner` for the new-player subset) |
| `ClassEvolutions`, `ClassAttributes`, `ClassDefaults` | A class's evolution table, per-grade attribute bonuses and default mastery/blood attributes, from `src/data/class-details.json` |
| `ProgressionPath` | A vertical progression diagram |
| `Checklist` | A tickable checklist, saved in the reader's browser |
| `FilterTable` | Wraps a Markdown table and adds a text filter |
| `Label` | A label on one claim |
| `Unverified` | A claim the sources don't settle, linked to its open question |

## Component examples

Copy-paste examples for each component. Import from `src/components/` at the top of the `.mdx` file (see any article for the import lines).

### Quick facts

```mdx
<QuickFacts facts={[['Cost', '0.35 Sangricoin per minute per path'], ['XP per hour', '630,000 (945,000 with VIP)'], ['Where', 'Meditation Chamber']]} />
```

### Requirements

```mdx
<Requirements items={['Starter tutorial finished', 'A meditation path selected', 'Sangricoins in the Bank (at least 0.35)']} />
```

### With and without the interface

```mdx
<PlayModes>
  <Fragment slot="interface">Press **F10**. The MEDITATION panel opens anywhere on the map.</Fragment>
  <Fragment slot="chat">Type `.meditate` in chat. A numbered menu appears; type a number to choose, `0` to exit.</Fragment>
</PlayModes>
```

### Commands

```mdx
<Command cmd=".meditate panel">Opens the meditation panel (with the interface).</Command>
```

### Currency amounts

```mdx
Switching class costs <Currency id="ourosangue" amount={3000} />.
```

### Cost tables

```mdx
<CostTable id="class-evolution" />
```

### Class cards

```mdx
<ClassCard id="sangrael" />
<ClassGrid />
```

### Progression diagrams

```mdx
<ProgressionPath steps={[
  { title: 'Level 90', detail: 'XP stops counting until you prestige' },
  { title: 'Prestige 1–20', detail: '75 to 4,467 Ourosangue each' },
  { title: 'Prestige 20', detail: 'Schools open; Prestige becomes Give Pulse' },
]} />
```

### Checklists

```mdx
<Checklist id="example" items={['Finish The Path of Blood', 'Choose your first class', 'Open the Bank with F5']} />
```

### Filterable tables

```mdx
<FilterTable placeholder="Filter currencies…">
| Currency | Used for |
|---|---|
| Ourosangue | Everyday purchases, prestige, evolutions |
</FilterTable>
```

### Labels and unverified claims

```mdx
Double Meditation is a separate unlock. <Label type="purchase" />

<Unverified q="Q-006">Whether friendly fire is on inside dungeons is not documented.</Unverified>
```

## Game data

Numbers and lists used in more than one place live in `src/data/` and are validated when the site builds:

- `currencies.yaml`: the five Bank balances.
- `classes.yaml`: classes, weapons, Masters, evolutions and prerequisites. Prerequisites must name a real class.
- `cost-tables.yaml`: cost tables. A stated `total` must equal the sum of its rows; a cost the sources don't publish is `null` and shows as "Not published".
- `official-sources.json`: generated by `npm run research`; don't edit by hand.
- `class-details.json`: generated by `research/class-data.mjs` from the official (Portuguese) class pages: evolutions, attribute tables, default attributes, commands. Don't edit by hand. The script also lists every published total that doesn't match the sum of its grades; `ClassAttributes` flags those cells and fails the build unless the page passes the open question that tracks them (`q="Q-018"`).
- `commands.json`: generated by `research/commands-data.mjs` from the official commands page (309 commands, Portuguese descriptions) plus English descriptions where an English chat-only guide lists the same command. Don't edit by hand.
- `npcs.yaml`: every NPC the guides name, with sources. Shared by the Important NPCs and NPC reference pages.
- `constants.yaml`: every single number the calculators use, each with its source. `derived: true` marks values this wiki computed.
- `dungeon-keys.yaml`, `buffs.yaml`, `lost-book.yaml`: key recipes and fusions, prestige and achievement bonuses, and the sealed chapter transfusions.
- `attribute-names.ts`: English names for the Portuguese attribute names. A missing name fails the build.

Every entry has `sources`. Change a number only together with its source.

## Calculators

Calculator logic is pure TypeScript in `src/lib/calc/`, with no Astro imports, so Node can test it. The UI components in `src/components/tools/` read the data at build time and pass it to the logic in the browser. **Never add a number to a calculator that isn't in a data file with a source**, and never fit a curve or guess a rate or chance. If something isn't published, the calculator should say so. Add a test in `tests/calc.test.ts` for every new formula, ideally reproducing an official example.

## Before you open a pull request

```powershell
npm run coverage
npm run check
npm test
npm run build
```

`npm run check:external` (after a build) checks external links; run it when you add or change links to outside sites.

`npm run audit` checks every number and command on every page against the official snapshots in `research/text/`, which come from `npm run research`. Run it after editing articles. A number you calculated yourself (a total, a per-hour figure) goes in `docs/audit-allowlist.yaml` with its formula. A number from a guide your page doesn't cite means you should add that guide to the page's `sources`.
