# Progress tracker

The persistent tracker the brief asks for. Update it in the same commit as the work it describes.

The article list lives in [`docs/coverage.yaml`](coverage.yaml); the tables below are generated from it with `npm run coverage`, which also validates source ids, open-question ids, reading-order links and that every page file has an entry. How the list was designed is in [`docs/information-architecture.md`](information-architecture.md).

**Sources** are ids from the registry: `meditacao` means `https://www.sangriafalls.com/en/guias/meditacao/` (plus its Portuguese and chat-only variants), `class-draekhar` means `/en/classes/draekhar/`. The full list is in [`research/source-inventory.md`](../research/source-inventory.md). Open questions are numbered `Q-xxx` in [`research/open-questions.md`](../research/open-questions.md).

**Status values**
- Research: `—` not started · `sources found` · `read` · `done`
- Writing: `—` · `draft` · `written`
- Verification: `—` · `partly checked` · `verified` (every claim checked against its source, with a last-verified date)
- Implementation: `—` · `page stub` · `published` (page exists in the site with real content) · for tools: `built` · `tested`

A page stub is never counted as finished content.

## Phases

| Phase | Scope | Status | Notes |
|---|---|---|---|
| 1 | Research and source inventory | Done (2026-11-22) | 51 guides, 48 chat variants, 63 Portuguese originals, 12 class pages, 7 hubs captured. See source inventory. |
| 2 | Information architecture and article coverage matrix | Done (2026-11-22) | 191 pages in 18 sections, every brief item mapped (`docs/coverage.yaml`); URL scheme, page types, label rules, unlock-dependency graph and audience paths (`docs/information-architecture.md`); `npm run coverage` validates the matrix and regenerates this tracker; section overviews list their pages from the matrix. |
| 3 | Site structure and reusable components | Done (2026-11-22) | Components: QuickFacts, Requirements, PlayModes (interface/chat tabs), Command, Currency, CostTable, ClassCard, ClassGrid (filterable), ProgressionPath, Checklist, FilterTable, Label, Unverified, plus automatic breadcrumbs, Before you read, Related guides, Sources, Discord summary and link previews. Validated data collections in `src/data/` (currencies, classes, cost tables; source ids, class references and totals checked at build). Open questions page. Internal link and anchor checking at build (starlight-links-validator); `npm run check:external` for outside links. Component reference at /about/components/. |
| 4 | Beginner walkthrough | Done (2026-11-22) | 36 pages written: the 20 Getting started pages (what Sangria Falls is, vs vanilla, vs Bloodcraft, joining, interface install and troubleshooting, chat-only play, language, HUD, website panel, tutorial, first class, city, teleports, NPCs, first castle, first-day and first-week checklists, beginner mistakes) and the walkthrough overview plus Stages 1–15. Every claim is checked against the official guides; none is confirmed in game yet (`verified: partly checked`). Open questions Q-001, Q-002, Q-006, Q-008, Q-009, Q-012, Q-013 and Q-017 are flagged inline where they apply. |
| 5 | Progression, class and meditation guides | Done (2026-11-22) | 33 pages: Character (9: levels and XP, prestige with all 20 buffs, XP bonuses, Quitina, weapon mastery, blood lineage, statistics with an attribute glossary, profile), Meditation (8: how it works, costs and rates, Double Meditation, Auto-Prestige, AFK settings, worked examples, troubleshooting) and Classes (16: all 11 classes plus the Awakened translated from the Portuguese class pages, choosing a class, evolutions, Training Room). Class tables (evolutions, per-grade attributes, defaults) come from `src/data/class-details.json`, which `research/class-data.mjs` parses from the official pages; it found 5 published totals that don't add up (Q-018, Q-019), which the pages flag. New open questions Q-018 to Q-021. |
| 6 | Economy, professions, pets, equipment | Done (2026-11-22) | 49 pages. Economy (12: currencies, Bank, Vault, Market, contracts, Shadow Merchant, Casino, Online Reward, Prisoners, an earning guide of official payouts and limits, budgets totalled from official prices). Professions (11: orders, each trade, a gathering comparison, services, aquarium). Companions (10: pets, capture, souls and tiers, levels, Cristais, recommendations, Sangrulhos, eggs, fusion). Equipment (16: weapons, affinity, armour and jewellery, fortification, refinement, Perfect gems, spell jewels, bonuses by class, upgrade priorities, six build-archetype frameworks with no claimed optimum). New cost tables (vault, chest expansion, Mobile Depot, profession prestige, fortification) and a ClassBonusSummary component. New open question Q-022. |
| 7 | Dungeons, events, endgame | Done (2026-11-22) | 61 pages, covering every remaining section. Dungeons (11, including four per-dungeon pages whose rooms are undocumented, Q-023), Events (9), Quests (6), Schools (3), Endgame (6), Support (6), World (10) and Reference (10: all 309 commands, shortcuts, NPCs, items, bosses, a Portuguese–English glossary, every cost table, every published chance, progression requirements). New data: `src/data/commands.json` (parsed by `research/commands-data.mjs`, with English descriptions where an English guide gives the same command) and `src/data/npcs.yaml` (a validated collection shared by two pages). New components: CommandTable and NpcTable. Corrections: the Marriage Joint Account is an exception to "no transfers between players"; Q-006 is partly answered (Rupture and Judgment groups can't hurt each other). New open question Q-023. |
| 8 | Calculators and interactive tools | Done (2026-11-22) | Eight tools on /tools/: meditation, prestige, Pulses and Transfusions, gathering income, class evolutions, pet upgrades, dungeon keys and a build planner. The logic lives in `src/lib/calc/` as pure TypeScript, covered by 32 tests (`npm test`) that check the official examples. Every number comes from validated data files (`src/data/constants.yaml`, `dungeon-keys.yaml`, `buffs.yaml`, `lost-book.yaml`). No curves, rates or chances are invented: prestige costs show exact values or firm bounds (Q-017), gathering needs your own rates (Q-012), Cristal attempts show only the minimum, and the build planner lists sources without adding them (Q-009). Inputs are kept in the URL, so calculations can be shared. |
| 9 | Source verification and QA | Not started | |
| 10 | Deployment and contribution readiness | Not started | Do not deploy until the user asks |

## Articles and tools

<!-- coverage:start -->
_Generated from `docs/coverage.yaml` by `npm run coverage`. Edit the YAML, not these tables._

**191 pages planned** · written: 188 · drafts: 0 · verified: 0 · published: 188 · page stubs: 0

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
| Getting started <br>`/getting-started/` · phase 4 | `primeiros-passos` | read | written | partly checked | published |  |
| What is Sangria Falls? <br>`/getting-started/what-is-sangria-falls/` · phase 4 | `primeiros-passos`, `home` | read | written | partly checked | published |  |
| Sangria Falls vs vanilla V Rising <br>`/getting-started/vs-vanilla/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `classes`, `profissoes`, `banco` | read | written | partly checked | published | No official comparison: every difference must cite an SF guide |
| Sangria Falls vs Bloodcraft <br>`/getting-started/vs-bloodcraft/` · phase 4 | `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue`, `classes`, `profissoes`, `pets` | read | written | partly checked | published | No official comparison; Bloodcraft is not a source for SF mechanics |
| Joining the server <br>`/getting-started/joining/` · phase 4 | `primeiros-passos` | read | written | partly checked | published | Q-001; Q-002 |
| Installing the interface <br>`/getting-started/interface/` · phase 4 | `interface`, `primeiros-passos` | read | written | partly checked | published | Source page is in Portuguese |
| Interface troubleshooting <br>`/getting-started/interface-troubleshooting/` · phase 4 | `interface` | read | written | partly checked | published |  |
| Playing without the interface <br>`/getting-started/playing-without-the-interface/` · phase 4 | `primeiros-passos`, `comandos` | read | written | partly checked | published | Derived from the 48 chat-only guide variants |
| Setting the language to English <br>`/getting-started/language/` · phase 4 | `primeiros-passos`, `painel-do-site` | read | written | partly checked | published |  |
| Understanding the HUD <br>`/getting-started/hud/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `atalhos` | read | written | partly checked | published |  |
| The website panel <br>`/getting-started/website-panel/` · phase 4 | `painel-do-site` | read | written | partly checked | published |  |
| The Path of Blood tutorial <br>`/getting-started/path-of-blood/` · phase 4 | `missoes`, `classes`, `primeiros-passos` | read | written | partly checked | published |  |
| Choosing your first class <br>`/getting-started/first-class/` · phase 4 | `classes`, `class-hub`, `sala-de-treinamento` | read | written | partly checked | published |  |
| Navigating Sangria Falls City <br>`/getting-started/city/` · phase 4 | `primeiros-passos`, `teleportes` | read | written | partly checked | published |  |
| Teleports and teleport hubs <br>`/getting-started/teleports/` · phase 4 | `teleportes` | read | written | partly checked | published |  |
| Important NPCs <br>`/getting-started/important-npcs/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `profissoes`, `masmorras`, `escolas`, `sangrulhos`, `transfusao-e-plasmas` | read | written | partly checked | published | Compiled from mentions across guides |
| Building your first castle <br>`/getting-started/first-castle/` · phase 4 | `castelo`, `teleportes` | read | written | partly checked | published | Castle building itself is base-game; only SF additions are sourced |
| First-day checklist <br>`/getting-started/first-day/` · phase 4 | `primeiros-passos`, `missoes`, `classes` | read | written | partly checked | published |  |
| First-week roadmap <br>`/getting-started/first-week/` · phase 4 | `nivel-e-prestigio`, `profissoes`, `meditacao`, `pets` | read | written | partly checked | published |  |
| Common beginner mistakes <br>`/getting-started/beginner-mistakes/` · phase 4 | `primeiros-passos`, `nivel-e-prestigio`, `meditacao`, `profissoes` | read | written | partly checked | published |  |

### Progression walkthrough

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Progression walkthrough <br>`/walkthrough/` · phase 4 | `primeiros-passos` | read | written | partly checked | published |  |
| Stage 1: First login and tutorial <br>`/walkthrough/01-first-login/` · phase 4 | `primeiros-passos`, `missoes`, `interface` | read | written | partly checked | published |  |
| Stage 2: First class and starter equipment <br>`/walkthrough/02-first-class/` · phase 4 | `classes`, `class-hub` | read | written | partly checked | published |  |
| Stage 3: Early levelling and bosses <br>`/walkthrough/03-early-levelling/` · phase 4 | `nivel-e-prestigio`, `cacada-de-v-bloods`, `passe-de-batalha`, `pets` | read | written | partly checked | published |  |
| Stage 4: First professions and income <br>`/walkthrough/04-professions-and-income/` · phase 4 | `profissoes`, `coleta-minerador-pescador-lenhador`, `contratos`, `mercador-sombrio`, `recompensa-online` | read | written | partly checked | published |  |
| Stage 5: Weapon mastery and blood lineage <br>`/walkthrough/05-mastery-and-blood/` · phase 4 | `maestria-de-arma`, `linhagem-de-sangue` | read | written | partly checked | published |  |
| Stage 6: Your first pet <br>`/walkthrough/06-first-pet/` · phase 4 | `pets` | read | written | partly checked | published |  |
| Stage 7: Character Prestige 1–10 <br>`/walkthrough/07-prestige-1-10/` · phase 4 | `nivel-e-prestigio`, `meditacao`, `banco` | read | written | partly checked | published |  |
| Stage 8: Character Prestige 11–20 <br>`/walkthrough/08-prestige-11-20/` · phase 4 | `nivel-e-prestigio`, `meditacao`, `auto-prestigio` | read | written | partly checked | published |  |
| Stage 9: Class evolutions <br>`/walkthrough/09-class-evolutions/` · phase 4 | `classes`, `class-hub` | read | written | partly checked | published |  |
| Stage 10: Endgame gear <br>`/walkthrough/10-endgame-gear/` · phase 4 | `masmorras`, `oficios-ferreiro-alfaiate-encantador`, `mercado` | read | written | partly checked | published | Q-008 |
| Stage 11: Vampiric Schools <br>`/walkthrough/11-schools/` · phase 4 | `escolas` | read | written | partly checked | published |  |
| Stage 12: Pulses and Transfusions <br>`/walkthrough/12-pulses-and-transfusions/` · phase 4 | `transfusao-e-plasmas`, `livro-perdido` | read | written | partly checked | published |  |
| Stage 13: Advanced equipment enhancement <br>`/walkthrough/13-advanced-enhancement/` · phase 4 | `oficios-ferreiro-alfaiate-encantador`, `coleta-minerador-pescador-lenhador`, `servicos-de-profissao` | read | written | partly checked | published |  |
| Stage 14: Master and Nightmare dungeons <br>`/walkthrough/14-master-and-nightmare/` · phase 4 | `masmorras`, `quadro-de-grupos`, `incursoes` | read | written | partly checked | published | Q-006 |
| Stage 15: Endgame optimisation <br>`/walkthrough/15-endgame-optimisation/` · phase 4 | `transfusao-e-plasmas`, `rankings`, `torre-dos-imortais` | read | written | partly checked | published | Q-009; Q-013 |

### Character progression

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Character progression <br>`/character/` · phase 5 | `nivel-e-prestigio`, `perfil` | read | written | partly checked | published |  |
| Levels and experience <br>`/character/levels-and-xp/` · phase 5 | `nivel-e-prestigio`, `arena-ilusional` | read | written | partly checked | published | Q-011 |
| Character prestige <br>`/character/prestige/` · phase 5 | `nivel-e-prestigio` | read | written | partly checked | published |  |
| XP bonuses, multipliers and events <br>`/character/xp-bonuses/` · phase 5 | `nivel-e-prestigio`, `banco`, `meditacao`, `vip` | read | written | partly checked | published | Q-001; Q-016 |
| Quitina (Chitin) <br>`/character/quitina/` · phase 5 | `banco`, `postos-avancados`, `passe-de-batalha` | read | written | partly checked | published |  |
| Weapon mastery <br>`/character/weapon-mastery/` · phase 5 | `maestria-de-arma` | read | written | partly checked | published |  |
| Blood lineage <br>`/character/blood-lineage/` · phase 5 | `linhagem-de-sangue` | read | written | partly checked | published |  |
| Character statistics <br>`/character/stats/` · phase 5 | `perfil`, `classes`, `class-hub` | read | written | partly checked | published | Q-009 |
| The profile sheet <br>`/character/profile/` · phase 5 | `perfil` | read | written | partly checked | published |  |

### Meditation

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Meditation <br>`/meditation/` · phase 5 | `meditacao` | read | written | partly checked | published |  |
| How meditation works <br>`/meditation/how-it-works/` · phase 5 | `meditacao` | read | written | partly checked | published |  |
| Costs and XP rates <br>`/meditation/costs-and-rates/` · phase 5 | `meditacao`, `vip`, `nivel-e-prestigio` | read | written | partly checked | published | Q-010; Q-021 |
| Double Meditation <br>`/meditation/double-meditation/` · phase 5 | `meditacao`, `vip-page` | read | written | partly checked | published |  |
| Auto-Prestige and Auto-Pulse <br>`/meditation/auto-prestige/` · phase 5 | `auto-prestigio`, `transfusao-e-plasmas`, `vip` | read | written | partly checked | published |  |
| Recommended AFK settings <br>`/meditation/recommended-settings/` · phase 5 | `meditacao`, `auto-prestigio`, `recompensa-online` | read | written | partly checked | published |  |
| Worked meditation examples <br>`/meditation/examples/` · phase 5 | `meditacao`, `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue`, `pets`, `transfusao-e-plasmas` | read | written | partly checked | published | Q-010; Q-011; Q-021 |
| Meditation troubleshooting <br>`/meditation/troubleshooting/` · phase 5 | `meditacao` | read | written | partly checked | published |  |

### Classes

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Classes <br>`/classes/` · phase 5 | `classes`, `class-hub` | read | written | partly checked | published |  |
| Choosing a class <br>`/classes/choosing-a-class/` · phase 5 | `classes`, `class-hub`, `sala-de-treinamento` | read | written | partly checked | published | No tier list without testing data |
| Class evolutions and advanced classes <br>`/classes/evolutions/` · phase 5 | `classes`, `class-hub` | read | written | partly checked | published |  |
| Awakened (Despertado) <br>`/classes/awakened/` · phase 5 | `class-despertado`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| Mortak <br>`/classes/mortak/` · phase 5 | `class-mortak`, `classes` | read | written | partly checked | published | Source page is in Portuguese; Q-018; Q-020 |
| Noctarin <br>`/classes/noctarin/` · phase 5 | `class-noctarin`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| Bastien <br>`/classes/bastien/` · phase 5 | `class-bastien`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| Carmesyne <br>`/classes/carmesyne/` · phase 5 | `class-carmesyne`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| Skarn <br>`/classes/skarn/` · phase 5 | `class-skarn`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| Sepulkros <br>`/classes/sepulkros/` · phase 5 | `class-sepulkros`, `classes` | read | written | partly checked | published | Source page is in Portuguese; Q-020 |
| Draekhar <br>`/classes/draekhar/` · phase 5 | `class-draekhar`, `classes` | read | written | partly checked | published | Q-004; Q-005; Q-020 |
| Umbrellis <br>`/classes/umbrellis/` · phase 5 | `class-umbrellis`, `classes` | read | written | partly checked | published | Source page is in Portuguese; Q-019; Q-020 |
| Sangrael <br>`/classes/sangrael/` · phase 5 | `class-sangrael`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| La Muerte <br>`/classes/la-muerte/` · phase 5 | `class-lamuerte`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| General <br>`/classes/general/` · phase 5 | `class-general`, `classes` | read | written | partly checked | published | Source page is in Portuguese |
| Training Room <br>`/classes/training-room/` · phase 5 | `sala-de-treinamento` | read | written | partly checked | published |  |

### Equipment and builds

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Equipment and builds <br>`/equipment/` · phase 6 | `masmorras`, `oficios-ferreiro-alfaiate-encantador` | read | written | partly checked | published |  |
| Weapon progression <br>`/equipment/weapons/` · phase 6 | `masmorras`, `mercado`, `mercador-sombrio` | read | written | partly checked | published | Q-008; Q-022 |
| Weapon affinity <br>`/equipment/weapon-affinity/` · phase 6 | `masmorras`, `comandos` | read | written | partly checked | published |  |
| Armour and jewellery <br>`/equipment/armour-and-jewellery/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `mercado` | read | written | partly checked | published | Q-008 |
| Fortification <br>`/equipment/fortification/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `servicos-de-profissao` | read | written | partly checked | published |  |
| Refinement <br>`/equipment/refinement/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `coleta-minerador-pescador-lenhador`, `conquistas` | read | written | partly checked | published |  |
| Perfect Gems <br>`/equipment/perfect-gems/` · phase 6 | `masmorras` | read | written | partly checked | published |  |
| Spell jewels <br>`/equipment/spell-jewels/` · phase 6 | — | read | written | partly checked | published | Q-007 |
| Which bonuses help which class <br>`/equipment/bonuses-by-class/` · phase 6 | `classes`, `class-hub` | read | written | partly checked | published |  |
| Upgrade priorities <br>`/equipment/upgrade-priorities/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `masmorras` | read | written | partly checked | published | Community recommendation |
| Physical DPS builds <br>`/equipment/builds-physical/` · phase 6 | `classes` | read | written | partly checked | published | Community recommendation; no testing data yet |
| Magical DPS builds <br>`/equipment/builds-magical/` · phase 6 | `classes`, `class-draekhar` | read | written | partly checked | published | Community recommendation; no testing data yet |
| Tank builds <br>`/equipment/builds-tank/` · phase 6 | `classes`, `class-mortak` | read | written | partly checked | published | Community recommendation; no testing data yet |
| Healer builds <br>`/equipment/builds-healer/` · phase 6 | `classes`, `class-sangrael` | read | written | partly checked | published | Community recommendation; no testing data yet |
| Summoner builds <br>`/equipment/builds-summoner/` · phase 6 | `classes`, `class-sepulkros`, `class-lamuerte` | read | written | partly checked | published | Community recommendation; no testing data yet |
| Hybrid builds <br>`/equipment/builds-hybrid/` · phase 6 | `classes` | read | written | partly checked | published | Community recommendation; no testing data yet |

### Pets and Sangrulhos

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Pets and Sangrulhos <br>`/companions/` · phase 6 | `pets`, `sangrulhos`, `classes` | read | written | partly checked | published |  |
| How pets work <br>`/companions/pets/` · phase 6 | `pets` | read | written | partly checked | published |  |
| Capturing pets <br>`/companions/pet-capture/` · phase 6 | `pets`, `escolas` | read | written | partly checked | published |  |
| Pet souls <br>`/companions/pet-souls/` · phase 6 | `pets`, `coleta-minerador-pescador-lenhador`, `arena-ilusional` | read | written | partly checked | published |  |
| Pet tiers, levels and prestige <br>`/companions/pet-progression/` · phase 6 | `pets`, `meditacao` | read | written | partly checked | published |  |
| Pet crystals <br>`/companions/pet-crystals/` · phase 6 | `pets`, `masmorras` | read | written | partly checked | published |  |
| Recommended pets and upgrade priorities <br>`/companions/pet-recommendations/` · phase 6 | `pets` | read | written | partly checked | published | Community recommendation |
| Sangrulhos <br>`/companions/sangrulhos/` · phase 6 | `sangrulhos` | read | written | partly checked | published |  |
| Sangrulho eggs and incubation <br>`/companions/sangrulho-eggs/` · phase 6 | `sangrulhos`, `masmorras`, `arena-ilusional` | read | written | partly checked | published |  |
| Sangrulho fusion and duplicates <br>`/companions/sangrulho-fusion/` · phase 6 | `sangrulhos` | read | written | partly checked | published |  |

### Professions

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Professions <br>`/professions/` · phase 6 | `profissoes` | read | written | partly checked | published |  |
| Daily orders and profession XP <br>`/professions/orders/` · phase 6 | `profissoes` | read | written | partly checked | published |  |
| Blacksmith <br>`/professions/blacksmith/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `profissoes` | read | written | partly checked | published |  |
| Tailor <br>`/professions/tailor/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `profissoes` | read | written | partly checked | published |  |
| Enchanter <br>`/professions/enchanter/` · phase 6 | `oficios-ferreiro-alfaiate-encantador`, `profissoes` | read | written | partly checked | published |  |
| Miner <br>`/professions/miner/` · phase 6 | `coleta-minerador-pescador-lenhador`, `profissoes` | read | written | partly checked | published |  |
| Fisher <br>`/professions/fisher/` · phase 6 | `coleta-minerador-pescador-lenhador`, `profissoes`, `aquario` | read | written | partly checked | published |  |
| Woodcutter <br>`/professions/woodcutter/` · phase 6 | `coleta-minerador-pescador-lenhador`, `profissoes` | read | written | partly checked | published |  |
| Comparing the gathering professions <br>`/professions/gathering-comparison/` · phase 6 | `coleta-minerador-pescador-lenhador`, `oficios-ferreiro-alfaiate-encantador` | read | written | partly checked | published | Q-012 |
| Profession services <br>`/professions/services/` · phase 6 | `servicos-de-profissao` | read | written | partly checked | published |  |
| Aquarium <br>`/professions/aquarium/` · phase 6 | `aquario` | read | written | partly checked | published |  |

### Economy

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Economy <br>`/economy/` · phase 6 | `banco` | read | written | partly checked | published |  |
| Currencies <br>`/economy/currencies/` · phase 6 | `banco`, `recompensa-online`, `pets`, `sangrulhos` | read | written | partly checked | published |  |
| Bank <br>`/economy/bank/` · phase 6 | `banco` | read | written | partly checked | published |  |
| Vault <br>`/economy/vault/` · phase 6 | `cofre` | read | written | partly checked | published |  |
| Player market and shops <br>`/economy/market/` · phase 6 | `mercado` | read | written | partly checked | published |  |
| Contracts <br>`/economy/contracts/` · phase 6 | `contratos` | read | written | partly checked | published |  |
| Shadow Merchant <br>`/economy/shadow-merchant/` · phase 6 | `mercador-sombrio` | read | written | partly checked | published |  |
| Casino <br>`/economy/casino/` · phase 6 | `cassino` | read | written | partly checked | published |  |
| Online reward <br>`/economy/online-reward/` · phase 6 | `recompensa-online` | read | written | partly checked | published |  |
| Prisoner market <br>`/economy/prisoners/` · phase 6 | `prisioneiros` | read | written | partly checked | published |  |
| How to earn currency <br>`/economy/earning-guide/` · phase 6 | `coleta-minerador-pescador-lenhador`, `contratos`, `mercador-sombrio`, `postos-avancados`, `recompensa-online`, `ruptura-da-realidade`, `torre-dos-imortais` | read | written | partly checked | published | Income rates are not published; use ranges labelled as estimates |
| Example budgets <br>`/economy/budgets/` · phase 6 | `nivel-e-prestigio`, `classes`, `transfusao-e-plasmas`, `maestria-de-arma`, `linhagem-de-sangue` | read | written | partly checked | published |  |

### Dungeons

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Dungeons <br>`/dungeons/` · phase 7 | `masmorras` | read | written | partly checked | published |  |
| Dungeon keys <br>`/dungeons/keys/` · phase 7 | `masmorras`, `incursoes` | read | written | partly checked | published |  |
| Forming a party <br>`/dungeons/forming-a-party/` · phase 7 | `masmorras`, `quadro-de-grupos` | read | written | partly checked | published |  |
| Difficulties and preparation <br>`/dungeons/difficulties/` · phase 7 | `masmorras` | read | written | partly checked | published |  |
| Death, wipes and dungeon rules <br>`/dungeons/rules-and-risks/` · phase 7 | `masmorras`, `pets` | read | written | partly checked | published | Q-006 |
| Dungeon rewards and loot <br>`/dungeons/rewards/` · phase 7 | `masmorras`, `correio` | read | written | partly checked | published | Q-022 |
| Party roles and compositions <br>`/dungeons/party-roles/` · phase 7 | `masmorras`, `classes` | read | written | partly checked | published | Community recommendation |
| Sanctuary of Redemption <br>`/dungeons/sanctuary-of-redemption/` · phase 7 | `masmorras` | read | written | partly checked | published | Room and boss mechanics are not documented officially; Q-023 |
| Grove of Disenchantment <br>`/dungeons/grove-of-disenchantment/` · phase 7 | `masmorras` | read | written | partly checked | published | Room and boss mechanics are not documented officially; Q-023 |
| Blood Dominion <br>`/dungeons/blood-dominion/` · phase 7 | `masmorras` | read | written | partly checked | published | Room and boss mechanics are not documented officially; Q-023 |
| Corrupted Temple <br>`/dungeons/corrupted-temple/` · phase 7 | `masmorras` | read | written | partly checked | published | Room and boss mechanics are not documented officially; Q-023 |

### Events

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Events <br>`/events/` · phase 7 | `quadro-de-grupos`, `ruptura-da-realidade` | read | written | partly checked | published |  |
| Illusory Arena <br>`/events/illusory-arena/` · phase 7 | `arena-ilusional` | read | written | partly checked | published | Q-006 |
| Tower of the Immortals <br>`/events/tower-of-the-immortals/` · phase 7 | `torre-dos-imortais` | read | written | partly checked | published | Q-003 |
| Reality Rupture <br>`/events/reality-rupture/` · phase 7 | `ruptura-da-realidade` | read | written | partly checked | published |  |
| Goreswine's Judgment <br>`/events/goreswines-judgment/` · phase 7 | `julgamento-de-goreswine` | read | written | partly checked | published |  |
| Rift Incursions <br>`/events/rift-incursions/` · phase 7 | `incursoes` | read | written | partly checked | published |  |
| V Blood Hunt <br>`/events/v-blood-hunt/` · phase 7 | `cacada-de-v-bloods` | read | written | partly checked | published |  |
| Group board <br>`/events/group-board/` · phase 7 | `quadro-de-grupos` | read | written | partly checked | published |  |
| Seasonal events <br>`/events/seasonal/` · phase 7 | `facanhas`, `pets`, `passe-de-batalha` | read | written | partly checked | published | Only Sangrisween 2026 medals and event pets are documented |

### Outposts and quests

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Outposts and quests <br>`/quests/` · phase 7 | `missoes`, `postos-avancados` | read | written | partly checked | published |  |
| Outposts <br>`/quests/outposts/` · phase 7 | `postos-avancados` | read | written | partly checked | published |  |
| Quests and quest tracking <br>`/quests/quests/` · phase 7 | `missoes` | read | written | partly checked | published |  |
| Class unlock and evolution quests <br>`/quests/class-quests/` · phase 7 | `classes`, `class-hub` | read | written | partly checked | published |  |
| Nyxaris and the endgame quests <br>`/quests/nyxaris/` · phase 7 | `transfusao-e-plasmas`, `livro-perdido`, `missoes` | read | written | partly checked | published |  |
| The Lost Book <br>`/quests/lost-book/` · phase 7 | `livro-perdido` | read | written | partly checked | published |  |

### Vampiric Schools

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Vampiric Schools <br>`/schools/` · phase 7 | `escolas` | read | written | partly checked | published |  |
| School ranks and points <br>`/schools/ranks-and-points/` · phase 7 | `escolas` | read | written | partly checked | published |  |
| School spells <br>`/schools/spells/` · phase 7 | `escolas`, `classes` | read | written | partly checked | published |  |

### Endgame

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Endgame <br>`/endgame/` · phase 7 | `transfusao-e-plasmas`, `nivel-e-prestigio` | read | written | partly checked | published |  |
| Pulses <br>`/endgame/pulses/` · phase 7 | `transfusao-e-plasmas`, `auto-prestigio` | read | written | partly checked | published |  |
| Transfusions <br>`/endgame/transfusions/` · phase 7 | `transfusao-e-plasmas`, `livro-perdido` | read | written | partly checked | published |  |
| Plasmas <br>`/endgame/plasmas/` · phase 7 | `transfusao-e-plasmas` | read | written | partly checked | published | Q-013 |
| Plasma investment by class <br>`/endgame/plasmas-by-class/` · phase 7 | `transfusao-e-plasmas`, `classes` | read | written | partly checked | published | Community recommendation |
| After 250 transfusions <br>`/endgame/after-250-transfusions/` · phase 7 | `transfusao-e-plasmas`, `rankings` | read | written | partly checked | published |  |

### Battle Pass and VIP

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Battle Pass and VIP <br>`/support/` · phase 7 | `vip`, `vip-page` | read | written | partly checked | published |  |
| Battle Pass <br>`/support/battle-pass/` · phase 7 | `passe-de-batalha` | read | written | partly checked | published |  |
| Farming Battle Pass XP <br>`/support/battle-pass-farming/` · phase 7 | `passe-de-batalha`, `cacada-de-v-bloods`, `ruptura-da-realidade` | read | written | partly checked | published | Community recommendation |
| VIP <br>`/support/vip/` · phase 7 | `vip`, `vip-page`, `auto-prestigio`, `meditacao` | read | written | partly checked | published |  |
| Optional purchases <br>`/support/optional-purchases/` · phase 7 | `vip-page`, `meditacao`, `passe-de-batalha`, `clan` | read | written | partly checked | published | No prices are published; do not invent them |
| Free vs VIP progression <br>`/support/free-vs-vip/` · phase 7 | `vip`, `meditacao`, `transfusao-e-plasmas`, `sangrulhos`, `teleportes` | read | written | partly checked | published |  |

### World and community

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| World and community <br>`/world/` · phase 7 | `castelo`, `clan` | read | written | partly checked | published |  |
| Castle helpers <br>`/world/castle/` · phase 7 | `castelo` | read | written | partly checked | published |  |
| Furniture <br>`/world/furniture/` · phase 7 | `moveis` | read | written | partly checked | published |  |
| Clan <br>`/world/clan/` · phase 7 | `clan` | read | written | partly checked | published |  |
| Marriage <br>`/world/marriage/` · phase 7 | `casamento` | read | written | partly checked | published |  |
| Mail <br>`/world/mail/` · phase 7 | `correio` | read | written | partly checked | published |  |
| Rankings <br>`/world/rankings/` · phase 7 | `rankings` | read | written | partly checked | published |  |
| Achievements <br>`/world/achievements/` · phase 7 | `conquistas` | read | written | partly checked | published |  |
| Feats, Fame and titles <br>`/world/feats-fame-titles/` · phase 7 | `facanhas`, `conquistas`, `casamento` | read | written | partly checked | published |  |
| Community rules <br>`/world/community-rules/` · phase 7 | — | read | written | partly checked | published | Q-014 |
| Frequently asked questions <br>`/world/faq/` · phase 9 | `primeiros-passos` | sources found | — | — | — | Compiled from every guide FAQ |

### Reference

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Reference <br>`/reference/` · phase 7 | `comandos`, `atalhos` | read | written | partly checked | published |  |
| Player commands <br>`/reference/commands/` · phase 7 | `comandos` | read | written | partly checked | published | 309 commands; descriptions are in Portuguese; Q-020 |
| Keyboard shortcuts <br>`/reference/shortcuts/` · phase 7 | `atalhos` | read | written | partly checked | published | Source page is in Portuguese |
| NPC directory <br>`/reference/npcs/` · phase 7 | `primeiros-passos`, `profissoes`, `masmorras`, `escolas`, `sangrulhos`, `transfusao-e-plasmas`, `postos-avancados` | read | written | partly checked | published | Compiled across guides |
| Item directory <br>`/reference/items/` · phase 7 | `masmorras`, `banco`, `pets`, `sangrulhos`, `oficios-ferreiro-alfaiate-encantador` | read | written | partly checked | published | Compiled across guides |
| Boss directory <br>`/reference/bosses/` · phase 7 | `pets`, `cacada-de-v-bloods`, `ruptura-da-realidade`, `julgamento-de-goreswine` | read | written | partly checked | published | Compiled across guides |
| Glossary <br>`/reference/glossary/` · phase 7 | `comandos` | read | written | partly checked | published | Portuguese–English term map compiled across guides |
| Upgrade cost tables <br>`/reference/cost-tables/` · phase 7 | `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue`, `classes`, `pets`, `oficios-ferreiro-alfaiate-encantador`, `transfusao-e-plasmas` | read | written | partly checked | published |  |
| Drop rates <br>`/reference/drop-rates/` · phase 7 | `pets`, `masmorras`, `arena-ilusional`, `coleta-minerador-pescador-lenhador` | read | written | partly checked | published |  |
| Progression requirements <br>`/reference/progression-requirements/` · phase 7 | `classes`, `escolas`, `transfusao-e-plasmas`, `julgamento-de-goreswine`, `ruptura-da-realidade`, `oficios-ferreiro-alfaiate-encantador` | read | written | partly checked | published |  |
| Server mechanics FAQ <br>`/reference/mechanics-faq/` · phase 9 | `nivel-e-prestigio`, `meditacao` | sources found | — | — | — |  |
| Troubleshooting <br>`/reference/troubleshooting/` · phase 9 | `interface`, `meditacao`, `missoes`, `painel-do-site` | sources found | — | — | — |  |

### Tools

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Tools <br>`/tools/` · phase 8 | `meditacao` | read | written | partly checked | published |  |
| Meditation calculator <br>`/tools/meditation-calculator/` · phase 8 | `meditacao`, `nivel-e-prestigio`, `recompensa-online`, `vip` | read | written | partly checked | tested | Q-010; Q-011; Q-021 |
| Prestige calculator <br>`/tools/prestige-calculator/` · phase 8 | `nivel-e-prestigio`, `maestria-de-arma`, `linhagem-de-sangue` | read | written | partly checked | tested | Q-017 |
| Pulse and Transfusion calculator <br>`/tools/pulse-calculator/` · phase 8 | `transfusao-e-plasmas`, `meditacao` | read | written | partly checked | tested |  |
| Profession income calculator <br>`/tools/profession-income-calculator/` · phase 8 | `coleta-minerador-pescador-lenhador` | read | written | partly checked | tested | Q-012 |
| Class evolution calculator <br>`/tools/class-evolution-calculator/` · phase 8 | `classes` | read | written | partly checked | tested |  |
| Pet upgrade calculator <br>`/tools/pet-upgrade-calculator/` · phase 8 | `pets` | read | written | partly checked | tested |  |
| Dungeon key calculator <br>`/tools/dungeon-key-calculator/` · phase 8 | `masmorras` | read | written | partly checked | tested |  |
| Build planner <br>`/tools/build-planner/` · phase 8 | `classes`, `perfil`, `maestria-de-arma`, `linhagem-de-sangue`, `escolas`, `pets`, `sangrulhos`, `transfusao-e-plasmas` | read | written | partly checked | tested | Q-009 |
<!-- coverage:end -->
