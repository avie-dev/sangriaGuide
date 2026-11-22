# Progress tracker

The persistent tracker the brief asks for. Update it in the same commit as the work it describes.

The article list lives in [`docs/coverage.yaml`](coverage.yaml); the tables below are generated from it with `npm run coverage`, which also validates source ids, open-question ids, reading-order links and that every page file has an entry. How the list was designed is in [`docs/information-architecture.md`](information-architecture.md).

**Sources** are ids from the registry: `meditacao` means `https://www.sangriafalls.com/en/guias/meditacao/` (plus its Portuguese and chat-only variants), `class-draekhar` means `/en/classes/draekhar/`. The full list is in [`research/source-inventory.md`](../research/source-inventory.md). Open questions are numbered `Q-xxx` in [`research/open-questions.md`](../research/open-questions.md).

**Status values**
- Research: `—` not started · `sources found` · `read` · `done`
- Writing: `—` · `draft` · `written`
- Verification: `—` · `partly checked` · `verified` (every number and command passes `npm run audit` against the cited official sources, and the prose was reviewed against them; **not** the same as confirmed in game; see [`qa-report.md`](qa-report.md))
- Implementation: `—` · `page stub` · `published` (page exists in the site with real content) · for tools: `built` · `tested`

A page stub is never counted as finished content.

## Phases

| Phase | Scope | Status | Notes |
|---|---|---|---|
| 1 | Research and source inventory | Done (2026-11-22) | 51 guides, 48 chat variants, 63 Portuguese originals, 12 class pages, 7 hubs captured. See source inventory. |
| 2 | Information architecture and article coverage matrix | Done (2026-11-22) | 191 pages in 18 sections, every brief item mapped (`docs/coverage.yaml`); URL scheme, page types, label rules, unlock-dependency graph and audience paths (`docs/information-architecture.md`); `npm run coverage` validates the matrix and regenerates this tracker; section overviews list their pages from the matrix. |
| 3 | Site structure and reusable components | Done (2026-11-22) | Components: QuickFacts, Requirements, PlayModes (interface/chat tabs), Command, Currency, CostTable, ClassCard, ClassGrid (filterable), ProgressionPath, Checklist, FilterTable, Label, Unverified, plus automatic breadcrumbs, Before you read, Related guides, Sources and link previews (a copy-for-Discord button was added here and removed in Phase 10). Validated data collections in `src/data/` (currencies, classes, cost tables; source ids, class references and totals checked at build). Open questions page. Internal link and anchor checking at build (starlight-links-validator); `npm run check:external` for outside links. Component reference at /about/components/. |
| 4 | Beginner walkthrough | Done (2026-11-22) | 36 pages written: the 20 Getting started pages (what Sangria Falls is, vs vanilla, vs Bloodcraft, joining, interface install and troubleshooting, chat-only play, language, HUD, website panel, tutorial, first class, city, teleports, NPCs, first castle, first-day and first-week checklists, beginner mistakes) and the walkthrough overview plus Stages 1–15. Every claim is checked against the official guides; none is confirmed in game yet (`verified: partly checked`). Open questions Q-001, Q-002, Q-006, Q-008, Q-009, Q-012, Q-013 and Q-017 are flagged inline where they apply. |
| 5 | Progression, class and meditation guides | Done (2026-11-22) | 33 pages: Character (9: levels and XP, prestige with all 20 buffs, XP bonuses, Quitina, weapon mastery, blood lineage, statistics with an attribute glossary, profile), Meditation (8: how it works, costs and rates, Double Meditation, Auto-Prestige, AFK settings, worked examples, troubleshooting) and Classes (16: all 11 classes plus the Awakened translated from the Portuguese class pages, choosing a class, evolutions, Training Room). Class tables (evolutions, per-grade attributes, defaults) come from `src/data/class-details.json`, which `research/class-data.mjs` parses from the official pages; it found 5 published totals that don't add up (Q-018, Q-019), which the pages flag. New open questions Q-018 to Q-021. |
| 6 | Economy, professions, pets, equipment | Done (2026-11-22) | 49 pages. Economy (12: currencies, Bank, Vault, Market, contracts, Shadow Merchant, Casino, Online Reward, Prisoners, an earning guide of official payouts and limits, budgets totalled from official prices). Professions (11: orders, each trade, a gathering comparison, services, aquarium). Companions (10: pets, capture, souls and tiers, levels, Cristais, recommendations, Sangrulhos, eggs, fusion). Equipment (16: weapons, affinity, armour and jewellery, fortification, refinement, Perfect gems, spell jewels, bonuses by class, upgrade priorities, six build-archetype frameworks with no claimed optimum). New cost tables (vault, chest expansion, Mobile Depot, profession prestige, fortification) and a ClassBonusSummary component. New open question Q-022. |
| 7 | Dungeons, events, endgame | Done (2026-11-22) | 61 pages, covering every remaining section. Dungeons (11, including four per-dungeon pages whose rooms are undocumented, Q-023), Events (9), Quests (6), Schools (3), Endgame (6), Support (6), World (10) and Reference (10: all 309 commands, shortcuts, NPCs, items, bosses, a Portuguese–English glossary, every cost table, every published chance, progression requirements). New data: `src/data/commands.json` (parsed by `research/commands-data.mjs`, with English descriptions where an English guide gives the same command) and `src/data/npcs.yaml` (a validated collection shared by two pages). New components: CommandTable and NpcTable. Corrections: the Marriage Joint Account is an exception to "no transfers between players"; Q-006 is partly answered (Rupture and Judgment groups can't hurt each other). New open question Q-023. |
| 8 | Calculators and interactive tools | Done (2026-11-22) | Eight tools on /tools/: meditation, prestige, Pulses and Transfusions, gathering income, class evolutions, pet upgrades, dungeon keys and a build planner. The logic lives in `src/lib/calc/` as pure TypeScript, covered by 32 tests (`npm test`) that check the official examples. Every number comes from validated data files (`src/data/constants.yaml`, `dungeon-keys.yaml`, `buffs.yaml`, `lost-book.yaml`). No curves, rates or chances are invented: prestige costs show exact values or firm bounds (Q-017), gathering needs your own rates (Q-012), Cristal attempts show only the minimum, and the build planner lists sources without adding them (Q-009). Inputs are kept in the URL, so calculations can be shared. |
| 9 | Source verification and QA | Done (2026-11-22) | New source audit (`npm run audit`, `scripts/audit.mjs`): 1,275 numbers and 337 commands on 197 pages checked against the cited official snapshots. 0 unexplained numbers (computed ones are listed with formulas in `docs/audit-allowlist.yaml`), 0 unknown commands, 0 missing `verify` labels, every official source cited. Also: 189 external links working; all 197 pages pass at 375 px; all pages in the sidebar; 33 calculator tests passing. Several fixes along the way (unsourced claims removed, the Joint Account exception, 10 missing citations, class command wording). Added the FAQ, mechanics FAQ and troubleshooting pages. All 191 planned pages marked verified. Full results: `docs/qa-report.md`. |
| 10 | Deployment and contribution readiness | Done (2026-11-22) | Homepage rebuilt with every section in the brief (roadmap, popular guides, class overview, essential commands, latest verified updates, FAQ). Published on GitHub Pages (https://avie-dev.github.io/sangriaGuide/) via `.github/workflows/deploy.yml`, which checks, tests and builds before publishing. Internal links get the `/sangriaGuide` sub-path at build time (`src/lib/base-links.mjs`). Deployment guide in `docs/deployment.md`; `robots.txt` and sitemap; original favicon. Repository github.com/avie-dev/sangriaGuide, with Edit-page links and issue templates. The deploy workflow is the only GitHub Actions workflow; the source audit runs locally (`npm run audit`). Issue and PR templates, `/about/contributing/`, `CHANGELOG.md` at `/about/changelog/`. Next/previous page links on. Removed the copy-for-Discord button. Still to decide: a licence. |

## Articles and tools

<!-- coverage:start -->
_Generated from `docs/coverage.yaml` by `npm run coverage`. Edit the YAML, not these tables._

**191 pages planned** · written: 191 · drafts: 0 · verified: 191 · published: 191 · page stubs: 0

| Phase | Pages |
|---|---|
| 4 | 36 |
| 5 | 33 |
| 6 | 49 |
| 7 | 61 |
| 8 | 9 |
| 9 | 3 |

### Getting started

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Getting started <br>`/getting-started/` · phase 4 | `primeiros-passos` | read | written | verified | published |  |
| What is Sangria Falls? <br>`/getting-started/what-is-sangria-falls/` · phase 4 | `primeiros-passos`, `home` | read | written | verified | published |  |
| Sangria Falls vs vanilla V Rising <br>`/getting-started/vs-vanilla/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `classes`, `profissoes`, `banco` | read | written | verified | published | No official comparison: every difference must cite an SF guide |
| Sangria Falls vs Bloodcraft <br>`/getting-started/vs-bloodcraft/` · phase 4 | `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue`, `classes`, `profissoes`, `pets` | read | written | verified | published | No official comparison; Bloodcraft is not a source for SF mechanics |
| Joining the server <br>`/getting-started/joining/` · phase 4 | `primeiros-passos` | read | written | verified | published | Q-001; Q-002 |
| Installing the interface <br>`/getting-started/interface/` · phase 4 | `interface`, `primeiros-passos` | read | written | verified | published | Source page is in Portuguese |
| Interface troubleshooting <br>`/getting-started/interface-troubleshooting/` · phase 4 | `interface` | read | written | verified | published |  |
| Playing without the interface <br>`/getting-started/playing-without-the-interface/` · phase 4 | `primeiros-passos`, `comandos` | read | written | verified | published | Derived from the 48 chat-only guide variants |
| Setting the language to English <br>`/getting-started/language/` · phase 4 | `primeiros-passos`, `painel-do-site` | read | written | verified | published |  |
| Understanding the HUD <br>`/getting-started/hud/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `atalhos` | read | written | verified | published |  |
| The website panel <br>`/getting-started/website-panel/` · phase 4 | `painel-do-site` | read | written | verified | published |  |
| The Path of Blood tutorial <br>`/getting-started/path-of-blood/` · phase 4 | `missoes`, `classes`, `primeiros-passos` | read | written | verified | published |  |
| Choosing your first class <br>`/getting-started/first-class/` · phase 4 | `classes`, `class-hub`, `sala-de-treinamento` | read | written | verified | published |  |
| Navigating Sangria Falls City <br>`/getting-started/city/` · phase 4 | `primeiros-passos`, `teleportes` | read | written | verified | published |  |
| Teleports and teleport hubs <br>`/getting-started/teleports/` · phase 4 | `teleportes` | read | written | verified | published |  |
| Important NPCs <br>`/getting-started/important-npcs/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `profissoes`, `masmorras`, `escolas`, `sangrulhos`, `transfusao-e-plasmas` | read | written | verified | published | Compiled from mentions across guides |
| Building your first castle <br>`/getting-started/first-castle/` · phase 4 | `castelo`, `teleportes` | read | written | verified | published | Castle building itself is base-game; only SF additions are sourced |
| First-day checklist <br>`/getting-started/first-day/` · phase 4 | `primeiros-passos`, `missoes`, `classes` | read | written | verified | published |  |
| First-week roadmap <br>`/getting-started/first-week/` · phase 4 | `nivel-e-prestigio`, `profissoes`, `meditacao`, `pets` | read | written | verified | published |  |
| Common beginner mistakes <br>`/getting-started/beginner-mistakes/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `meditacao`, `profissoes` | read | written | verified | published |  |

### Progression walkthrough

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Progression walkthrough <br>`/walkthrough/` · phase 4 | `primeiros-passos` | read | written | verified | published |  |
| Stage 1: First login and tutorial <br>`/walkthrough/01-first-login/` · phase 4 | `primeiros-passos`, `missoes`, `interface` | read | written | verified | published |  |
| Stage 2: First class and starter equipment <br>`/walkthrough/02-first-class/` · phase 4 | `classes`, `class-hub` | read | written | verified | published |  |
| Stage 3: Early levelling and bosses <br>`/walkthrough/03-early-levelling/` · phase 4 | `nivel-e-prestigio`, `cacada-de-v-bloods`, `passe-de-batalha`, `pets` | read | written | verified | published |  |
| Stage 4: First professions and income <br>`/walkthrough/04-professions-and-income/` · phase 4 | `profissoes`, `coleta-minerador-pescador-lenhador`, `contratos`, `mercador-sombrio`, `recompensa-online` | read | written | verified | published |  |
| Stage 5: Weapon mastery and blood lineage <br>`/walkthrough/05-mastery-and-blood/` · phase 4 | `maestria-de-arma`, `linhagem-de-sangue` | read | written | verified | published |  |
| Stage 6: Your first pet <br>`/walkthrough/06-first-pet/` · phase 4 | `pets` | read | written | verified | published |  |
| Stage 7: Character Prestige 1–10 <br>`/walkthrough/07-prestige-1-10/` · phase 4 | `nivel-e-prestigio`, `meditacao`, `banco` | read | written | verified | published |  |
| Stage 8: Character Prestige 11–20 <br>`/walkthrough/08-prestige-11-20/` · phase 4 | `nivel-e-prestigio`, `meditacao`, `auto-prestigio` | read | written | verified | published |  |
| Stage 9: Class evolutions <br>`/walkthrough/09-class-evolutions/` · phase 4 | `classes`, `class-hub` | read | written | verified | published |  |
| Stage 10: Endgame gear <br>`/walkthrough/10-endgame-gear/` · phase 4 | `masmorras`, `oficios-ferreiro-alfaiate-encantador`, `mercado` | read | written | verified | published | Q-008 |
| Stage 11: Vampiric Schools <br>`/walkthrough/11-schools/` · phase 4 | `escolas` | read | written | verified | published |  |
| Stage 12: Pulses and Transfusions <br>`/walkthrough/12-pulses-and-transfusions/` · phase 4 | `transfusao-e-plasmas`, `livro-perdido` | read | written | verified | published |  |
| Stage 13: Advanced equipment enhancement <br>`/walkthrough/13-advanced-enhancement/` · phase 4 | `oficios-ferreiro-alfaiate-encantador`, `coleta-minerador-pescador-lenhador`, `servicos-de-profissao` | read | written | verified | published |  |
| Stage 14: Master and Nightmare dungeons <br>`/walkthrough/14-master-and-nightmare/` · phase 4 | `masmorras`, `quadro-de-grupos`, `incursoes` | read | written | verified | published | Q-006 |
| Stage 15: Endgame optimisation <br>`/walkthrough/15-endgame-optimisation/` · phase 4 | `transfusao-e-plasmas`, `rankings`, `torre-dos-imortais` | read | written | verified | published | Q-009; Q-013 |

### Character progression

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Character progression <br>`/character/` · phase 5 | `nivel-e-prestigio`, `perfil` | read | written | verified | published |  |
| Levels and experience <br>`/character/levels-and-xp/` · phase 5 | `nivel-e-prestigio`, `arena-ilusional` | read | written | verified | published | Q-011 |
| Character prestige <br>`/character/prestige/` · phase 5 | `nivel-e-prestigio` | read | written | verified | published |  |
| XP bonuses, multipliers and events <br>`/character/xp-bonuses/` · phase 5 | `nivel-e-prestigio`, `banco`, `meditacao`, `vip` | read | written | verified | published | Q-001; Q-016 |
| Quitina (Chitin) <br>`/character/quitina/` · phase 5 | `banco`, `postos-avancados`, `passe-de-batalha` | read | written | verified | published |  |
| Weapon mastery <br>`/character/weapon-mastery/` · phase 5 | `maestria-de-arma` | read | written | verified | published |  |
| Blood lineage <br>`/character/blood-lineage/` · phase 5 | `linhagem-de-sangue` | read | written | verified | published |  |
| Character statistics <br>`/character/stats/` · phase 5 | `perfil`, `classes`, `class-hub` | read | written | verified | published | Q-009 |
| The profile sheet <br>`/character/profile/` · phase 5 | `perfil` | read | written | verified | published |  |

### Meditation

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Meditation <br>`/meditation/` · phase 5 | `meditacao` | read | written | verified | published |  |
| How meditation works <br>`/meditation/how-it-works/` · phase 5 | `meditacao` | read | written | verified | published |  |
| Costs and XP rates <br>`/meditation/costs-and-rates/` · phase 5 | `meditacao`, `vip`, `nivel-e-prestigio` | read | written | verified | published | Q-010; Q-021 |
| Double Meditation <br>`/meditation/double-meditation/` · phase 5 | `meditacao`, `vip-page` | read | written | verified | published |  |
| Auto-Prestige and Auto-Pulse <br>`/meditation/auto-prestige/` · phase 5 | `auto-prestigio`, `transfusao-e-plasmas`, `vip` | read | written | verified | published |  |
| Recommended AFK settings <br>`/meditation/recommended-settings/` · phase 5 | `meditacao`, `auto-prestigio`, `recompensa-online` | read | written | verified | published |  |
| Worked meditation examples <br>`/meditation/examples/` · phase 5 | `meditacao`, `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue`, `pets`, `transfusao-e-plasmas` | read | written | verified | published | Q-010; Q-011; Q-021 |
| Meditation troubleshooting <br>`/meditation/troubleshooting/` · phase 5 | `meditacao` | read | written | verified | published |  |

### Classes

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Classes <br>`/classes/` · phase 5 | `classes`, `class-hub` | read | written | verified | published |  |
| Choosing a class <br>`/classes/choosing-a-class/` · phase 5 | `classes`, `class-hub`, `sala-de-treinamento` | read | written | verified | published | No tier list without testing data |
| Class evolutions and advanced classes <br>`/classes/evolutions/` · phase 5 | `classes`, `class-hub` | read | written | verified | published |  |
| Awakened (Despertado) <br>`/classes/awakened/` · phase 5 | `class-despertado`, `classes` | read | written | verified | published | Source page is in Portuguese |
| Mortak <br>`/classes/mortak/` · phase 5 | `class-mortak`, `classes` | read | written | verified | published | Source page is in Portuguese; Q-018; Q-020 |
| Noctarin <br>`/classes/noctarin/` · phase 5 | `class-noctarin`, `classes` | read | written | verified | published | Source page is in Portuguese |
| Bastien <br>`/classes/bastien/` · phase 5 | `class-bastien`, `classes` | read | written | verified | published | Source page is in Portuguese |
| Carmesyne <br>`/classes/carmesyne/` · phase 5 | `class-carmesyne`, `classes` | read | written | verified | published | Source page is in Portuguese |
| Skarn <br>`/classes/skarn/` · phase 5 | `class-skarn`, `classes` | read | written | verified | published | Source page is in Portuguese |
| Sepulkros <br>`/classes/sepulkros/` · phase 5 | `class-sepulkros`, `classes` | read | written | verified | published | Source page is in Portuguese; Q-020 |
| Draekhar <br>`/classes/draekhar/` · phase 5 | `class-draekhar`, `classes` | read | written | verified | published | Q-004; Q-005; Q-020 |
| Umbrellis <br>`/classes/umbrellis/` · phase 5 | `class-umbrellis`, `classes` | read | written | verified | published | Source page is in Portuguese; Q-019; Q-020 |
| Sangrael <br>`/classes/sangrael/` · phase 5 | `class-sangrael`, `classes` | read | written | verified | published | Source page is in Portuguese |
| La Muerte <br>`/classes/la-muerte/` · phase 5 | `class-lamuerte`, `classes` | read | written | verified | published | Source page is in Portuguese |
| General <br>`/classes/general/` · phase 5 | `class-general`, `classes` | read | written | verified | published | Source page is in Portuguese |
| Training Room <br>`/classes/training-room/` · phase 5 | `sala-de-treinamento` | read | written | verified | published |  |

### Equipment and builds

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Equipment and builds <br>`/equipment/` · phase 6 | `masmorras`, `oficios-ferreiro-alfaiate-encantador` | read | written | verified | published |  |
| Weapon progression <br>`/equipment/weapons/` · phase 6 | `masmorras`, `mercado`, `mercador-sombrio` | read | written | verified | published | Q-008; Q-022 |
| Weapon affinity <br>`/equipment/weapon-affinity/` · phase 6 | `masmorras`, `comandos` | read | written | verified | published |  |
| Armour and jewellery <br>`/equipment/armour-and-jewellery/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `mercado` | read | written | verified | published | Q-008 |
| Fortification <br>`/equipment/fortification/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `servicos-de-profissao` | read | written | verified | published |  |
| Refinement <br>`/equipment/refinement/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `coleta-minerador-pescador-lenhador`, `conquistas` | read | written | verified | published |  |
| Perfect Gems <br>`/equipment/perfect-gems/` · phase 6 | `masmorras` | read | written | verified | published |  |
| Spell jewels <br>`/equipment/spell-jewels/` · phase 6 | — | read | written | verified | published | Q-007 |
| Which bonuses help which class <br>`/equipment/bonuses-by-class/` · phase 6 | `classes`, `class-hub` | read | written | verified | published |  |
| Upgrade priorities <br>`/equipment/upgrade-priorities/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `masmorras` | read | written | verified | published | Community recommendation |
| Physical DPS builds <br>`/equipment/builds-physical/` · phase 6 | `classes` | read | written | verified | published | Community recommendation; no testing data yet |
| Magical DPS builds <br>`/equipment/builds-magical/` · phase 6 | `classes`, `class-draekhar` | read | written | verified | published | Community recommendation; no testing data yet |
| Tank builds <br>`/equipment/builds-tank/` · phase 6 | `classes`, `class-mortak` | read | written | verified | published | Community recommendation; no testing data yet |
| Healer builds <br>`/equipment/builds-healer/` · phase 6 | `classes`, `class-sangrael` | read | written | verified | published | Community recommendation; no testing data yet |
| Summoner builds <br>`/equipment/builds-summoner/` · phase 6 | `classes`, `class-sepulkros`, `class-lamuerte` | read | written | verified | published | Community recommendation; no testing data yet |
| Hybrid builds <br>`/equipment/builds-hybrid/` · phase 6 | `classes` | read | written | verified | published | Community recommendation; no testing data yet |

### Pets and Sangrulhos

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Pets and Sangrulhos <br>`/companions/` · phase 6 | `pets`, `sangrulhos`, `classes` | read | written | verified | published |  |
| How pets work <br>`/companions/pets/` · phase 6 | `pets` | read | written | verified | published |  |
| Capturing pets <br>`/companions/pet-capture/` · phase 6 | `pets`, `escolas` | read | written | verified | published |  |
| Pet souls <br>`/companions/pet-souls/` · phase 6 | `pets`, `coleta-minerador-pescador-lenhador`, `arena-ilusional` | read | written | verified | published |  |
| Pet tiers, levels and prestige <br>`/companions/pet-progression/` · phase 6 | `pets`, `meditacao` | read | written | verified | published |  |
| Pet crystals <br>`/companions/pet-crystals/` · phase 6 | `pets`, `masmorras` | read | written | verified | published |  |
| Recommended pets and upgrade priorities <br>`/companions/pet-recommendations/` · phase 6 | `pets` | read | written | verified | published | Community recommendation |
| Sangrulhos <br>`/companions/sangrulhos/` · phase 6 | `sangrulhos` | read | written | verified | published |  |
| Sangrulho eggs and incubation <br>`/companions/sangrulho-eggs/` · phase 6 | `sangrulhos`, `masmorras`, `arena-ilusional` | read | written | verified | published |  |
| Sangrulho fusion and duplicates <br>`/companions/sangrulho-fusion/` · phase 6 | `sangrulhos` | read | written | verified | published |  |

### Professions

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Professions <br>`/professions/` · phase 6 | `profissoes` | read | written | verified | published |  |
| Daily orders and profession XP <br>`/professions/orders/` · phase 6 | `profissoes` | read | written | verified | published |  |
| Blacksmith <br>`/professions/blacksmith/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `profissoes` | read | written | verified | published |  |
| Tailor <br>`/professions/tailor/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `profissoes` | read | written | verified | published |  |
| Enchanter <br>`/professions/enchanter/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `profissoes` | read | written | verified | published |  |
| Miner <br>`/professions/miner/` · phase 6 | `coleta-minerador-pescador-lenhador`, `profissoes` | read | written | verified | published |  |
| Fisher <br>`/professions/fisher/` · phase 6 | `coleta-minerador-pescador-lenhador`, `profissoes`, `aquario` | read | written | verified | published |  |
| Woodcutter <br>`/professions/woodcutter/` · phase 6 | `coleta-minerador-pescador-lenhador`, `profissoes` | read | written | verified | published |  |
| Comparing the gathering professions <br>`/professions/gathering-comparison/` · phase 6 | `coleta-minerador-pescador-lenhador`, `oficios-ferreiro-alfaiate-encantador` | read | written | verified | published | Q-012 |
| Profession services <br>`/professions/services/` · phase 6 | `servicos-de-profissao` | read | written | verified | published |  |
| Aquarium <br>`/professions/aquarium/` · phase 6 | `aquario` | read | written | verified | published |  |

### Economy

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Economy <br>`/economy/` · phase 6 | `banco` | read | written | verified | published |  |
| Currencies <br>`/economy/currencies/` · phase 6 | `banco`, `recompensa-online`, `pets`, `sangrulhos` | read | written | verified | published |  |
| Bank <br>`/economy/bank/` · phase 6 | `banco` | read | written | verified | published |  |
| Vault <br>`/economy/vault/` · phase 6 | `cofre` | read | written | verified | published |  |
| Player market and shops <br>`/economy/market/` · phase 6 | `mercado` | read | written | verified | published |  |
| Contracts <br>`/economy/contracts/` · phase 6 | `contratos` | read | written | verified | published |  |
| Shadow Merchant <br>`/economy/shadow-merchant/` · phase 6 | `mercador-sombrio` | read | written | verified | published |  |
| Casino <br>`/economy/casino/` · phase 6 | `cassino` | read | written | verified | published |  |
| Online reward <br>`/economy/online-reward/` · phase 6 | `recompensa-online` | read | written | verified | published |  |
| Prisoner market <br>`/economy/prisoners/` · phase 6 | `prisioneiros` | read | written | verified | published |  |
| How to earn currency <br>`/economy/earning-guide/` · phase 6 | `coleta-minerador-pescador-lenhador`, `contratos`, `mercador-sombrio`, `postos-avancados`, `recompensa-online`, `ruptura-da-realidade`, `torre-dos-imortais` | read | written | verified | published | Income rates are not published; use ranges labelled as estimates |
| Example budgets <br>`/economy/budgets/` · phase 6 | `nivel-e-prestigio`, `classes`, `transfusao-e-plasmas`, `maestria-de-arma`, `linhagem-de-sangue` | read | written | verified | published |  |

### Dungeons

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Dungeons <br>`/dungeons/` · phase 7 | `masmorras` | read | written | verified | published |  |
| Dungeon keys <br>`/dungeons/keys/` · phase 7 | `masmorras`, `incursoes` | read | written | verified | published |  |
| Forming a party <br>`/dungeons/forming-a-party/` · phase 7 | `masmorras`, `quadro-de-grupos` | read | written | verified | published |  |
| Difficulties and preparation <br>`/dungeons/difficulties/` · phase 7 | `masmorras` | read | written | verified | published |  |
| Death, wipes and dungeon rules <br>`/dungeons/rules-and-risks/` · phase 7 | `masmorras`, `pets` | read | written | verified | published | Q-006 |
| Dungeon rewards and loot <br>`/dungeons/rewards/` · phase 7 | `masmorras`, `correio` | read | written | verified | published | Q-022 |
| Party roles and compositions <br>`/dungeons/party-roles/` · phase 7 | `masmorras`, `classes` | read | written | verified | published | Community recommendation |
| Sanctuary of Redemption <br>`/dungeons/sanctuary-of-redemption/` · phase 7 | `masmorras` | read | written | verified | published | Room and boss mechanics are not documented officially; Q-023 |
| Grove of Disenchantment <br>`/dungeons/grove-of-disenchantment/` · phase 7 | `masmorras` | read | written | verified | published | Room and boss mechanics are not documented officially; Q-023 |
| Blood Dominion <br>`/dungeons/blood-dominion/` · phase 7 | `masmorras` | read | written | verified | published | Room and boss mechanics are not documented officially; Q-023 |
| Corrupted Temple <br>`/dungeons/corrupted-temple/` · phase 7 | `masmorras` | read | written | verified | published | Room and boss mechanics are not documented officially; Q-023 |

### Events

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Events <br>`/events/` · phase 7 | `quadro-de-grupos`, `ruptura-da-realidade` | read | written | verified | published |  |
| Illusory Arena <br>`/events/illusory-arena/` · phase 7 | `arena-ilusional` | read | written | verified | published | Q-006 |
| Tower of the Immortals <br>`/events/tower-of-the-immortals/` · phase 7 | `torre-dos-imortais` | read | written | verified | published | Q-003 |
| Reality Rupture <br>`/events/reality-rupture/` · phase 7 | `ruptura-da-realidade` | read | written | verified | published |  |
| Goreswine's Judgment <br>`/events/goreswines-judgment/` · phase 7 | `julgamento-de-goreswine` | read | written | verified | published |  |
| Rift Incursions <br>`/events/rift-incursions/` · phase 7 | `incursoes` | read | written | verified | published |  |
| V Blood Hunt <br>`/events/v-blood-hunt/` · phase 7 | `cacada-de-v-bloods` | read | written | verified | published |  |
| Group board <br>`/events/group-board/` · phase 7 | `quadro-de-grupos` | read | written | verified | published |  |
| Seasonal events <br>`/events/seasonal/` · phase 7 | `facanhas`, `pets`, `passe-de-batalha` | read | written | verified | published | Only Sangrisween 2026 medals and event pets are documented |

### Outposts and quests

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Outposts and quests <br>`/quests/` · phase 7 | `missoes`, `postos-avancados` | read | written | verified | published |  |
| Outposts <br>`/quests/outposts/` · phase 7 | `postos-avancados` | read | written | verified | published |  |
| Quests and quest tracking <br>`/quests/quests/` · phase 7 | `missoes` | read | written | verified | published |  |
| Class unlock and evolution quests <br>`/quests/class-quests/` · phase 7 | `classes`, `class-hub` | read | written | verified | published |  |
| Nyxaris and the endgame quests <br>`/quests/nyxaris/` · phase 7 | `transfusao-e-plasmas`, `livro-perdido`, `missoes` | read | written | verified | published |  |
| The Lost Book <br>`/quests/lost-book/` · phase 7 | `livro-perdido` | read | written | verified | published |  |

### Vampiric Schools

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Vampiric Schools <br>`/schools/` · phase 7 | `escolas` | read | written | verified | published |  |
| School ranks and points <br>`/schools/ranks-and-points/` · phase 7 | `escolas` | read | written | verified | published |  |
| School spells <br>`/schools/spells/` · phase 7 | `escolas`, `classes` | read | written | verified | published |  |

### Endgame

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Endgame <br>`/endgame/` · phase 7 | `transfusao-e-plasmas`, `nivel-e-prestigio` | read | written | verified | published |  |
| Pulses <br>`/endgame/pulses/` · phase 7 | `transfusao-e-plasmas`, `auto-prestigio` | read | written | verified | published |  |
| Transfusions <br>`/endgame/transfusions/` · phase 7 | `transfusao-e-plasmas`, `livro-perdido` | read | written | verified | published |  |
| Plasmas <br>`/endgame/plasmas/` · phase 7 | `transfusao-e-plasmas` | read | written | verified | published | Q-013 |
| Plasma investment by class <br>`/endgame/plasmas-by-class/` · phase 7 | `transfusao-e-plasmas`, `classes` | read | written | verified | published | Community recommendation |
| After 250 transfusions <br>`/endgame/after-250-transfusions/` · phase 7 | `transfusao-e-plasmas`, `rankings` | read | written | verified | published |  |

### Battle Pass and VIP

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Battle Pass and VIP <br>`/support/` · phase 7 | `vip`, `vip-page` | read | written | verified | published |  |
| Battle Pass <br>`/support/battle-pass/` · phase 7 | `passe-de-batalha` | read | written | verified | published |  |
| Farming Battle Pass XP <br>`/support/battle-pass-farming/` · phase 7 | `passe-de-batalha`, `cacada-de-v-bloods`, `ruptura-da-realidade` | read | written | verified | published | Community recommendation |
| VIP <br>`/support/vip/` · phase 7 | `vip`, `vip-page`, `auto-prestigio`, `meditacao` | read | written | verified | published |  |
| Optional purchases <br>`/support/optional-purchases/` · phase 7 | `vip-page`, `meditacao`, `passe-de-batalha`, `clan` | read | written | verified | published | No prices are published; do not invent them |
| Free vs VIP progression <br>`/support/free-vs-vip/` · phase 7 | `vip`, `meditacao`, `transfusao-e-plasmas`, `sangrulhos`, `teleportes` | read | written | verified | published |  |

### World and community

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| World and community <br>`/world/` · phase 7 | `castelo`, `clan` | read | written | verified | published |  |
| Castle helpers <br>`/world/castle/` · phase 7 | `castelo` | read | written | verified | published |  |
| Furniture <br>`/world/furniture/` · phase 7 | `moveis` | read | written | verified | published |  |
| Clan <br>`/world/clan/` · phase 7 | `clan` | read | written | verified | published |  |
| Marriage <br>`/world/marriage/` · phase 7 | `casamento` | read | written | verified | published |  |
| Mail <br>`/world/mail/` · phase 7 | `correio` | read | written | verified | published |  |
| Rankings <br>`/world/rankings/` · phase 7 | `rankings` | read | written | verified | published |  |
| Achievements <br>`/world/achievements/` · phase 7 | `conquistas` | read | written | verified | published |  |
| Feats, Fame and titles <br>`/world/feats-fame-titles/` · phase 7 | `facanhas`, `conquistas`, `casamento` | read | written | verified | published |  |
| Community rules <br>`/world/community-rules/` · phase 7 | — | read | written | verified | published | Q-014 |
| Frequently asked questions <br>`/world/faq/` · phase 9 | `primeiros-passos` | read | written | verified | published | Compiled from every guide FAQ |

### Reference

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Reference <br>`/reference/` · phase 7 | `comandos`, `atalhos` | read | written | verified | published |  |
| Player commands <br>`/reference/commands/` · phase 7 | `comandos` | read | written | verified | published | 309 commands; descriptions are in Portuguese; Q-020 |
| Keyboard shortcuts <br>`/reference/shortcuts/` · phase 7 | `atalhos` | read | written | verified | published | Source page is in Portuguese |
| NPC directory <br>`/reference/npcs/` · phase 7 | `primeiros-passos`, `profissoes`, `masmorras`, `escolas`, `sangrulhos`, `transfusao-e-plasmas`, `postos-avancados` | read | written | verified | published | Compiled across guides |
| Item directory <br>`/reference/items/` · phase 7 | `masmorras`, `banco`, `pets`, `sangrulhos`, `oficios-ferreiro-alfaiate-encantador` | read | written | verified | published | Compiled across guides |
| Boss directory <br>`/reference/bosses/` · phase 7 | `pets`, `cacada-de-v-bloods`, `ruptura-da-realidade`, `julgamento-de-goreswine` | read | written | verified | published | Compiled across guides |
| Glossary <br>`/reference/glossary/` · phase 7 | `comandos` | read | written | verified | published | Portuguese–English term map compiled across guides |
| Upgrade cost tables <br>`/reference/cost-tables/` · phase 7 | `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue`, `classes`, `pets`, `oficios-ferreiro-alfaiate-encantador`, `transfusao-e-plasmas` | read | written | verified | published |  |
| Drop rates <br>`/reference/drop-rates/` · phase 7 | `pets`, `masmorras`, `arena-ilusional`, `coleta-minerador-pescador-lenhador` | read | written | verified | published |  |
| Progression requirements <br>`/reference/progression-requirements/` · phase 7 | `classes`, `escolas`, `transfusao-e-plasmas`, `julgamento-de-goreswine`, `ruptura-da-realidade`, `oficios-ferreiro-alfaiate-encantador` | read | written | verified | published |  |
| Server mechanics FAQ <br>`/reference/mechanics-faq/` · phase 9 | `nivel-e-prestigio`, `meditacao` | read | written | verified | published |  |
| Troubleshooting <br>`/reference/troubleshooting/` · phase 9 | `interface`, `meditacao`, `missoes`, `painel-do-site` | read | written | verified | published |  |

### Tools

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Tools <br>`/tools/` · phase 8 | `meditacao` | read | written | verified | published |  |
| Meditation calculator <br>`/tools/meditation-calculator/` · phase 8 | `meditacao`, `nivel-e-prestigio`, `recompensa-online`, `vip` | read | written | verified | tested | Q-010; Q-011; Q-021 |
| Prestige calculator <br>`/tools/prestige-calculator/` · phase 8 | `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue` | read | written | verified | tested | Q-017 |
| Pulse and Transfusion calculator <br>`/tools/pulse-calculator/` · phase 8 | `transfusao-e-plasmas`, `meditacao` | read | written | verified | tested |  |
| Profession income calculator <br>`/tools/profession-income-calculator/` · phase 8 | `coleta-minerador-pescador-lenhador` | read | written | verified | tested | Q-012 |
| Class evolution calculator <br>`/tools/class-evolution-calculator/` · phase 8 | `classes` | read | written | verified | tested |  |
| Pet upgrade calculator <br>`/tools/pet-upgrade-calculator/` · phase 8 | `pets` | read | written | verified | tested |  |
| Dungeon key calculator <br>`/tools/dungeon-key-calculator/` · phase 8 | `masmorras` | read | written | verified | tested |  |
| Build planner <br>`/tools/build-planner/` · phase 8 | `classes`, `perfil`, `maestria-de-arma`, `linhagem-de-sangue`, `escolas`, `pets`, `sangrulhos`, `transfusao-e-plasmas` | read | written | verified | tested | Q-009 |
<!-- coverage:end -->
