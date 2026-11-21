# Progress tracker

The persistent tracker the brief asks for. Update it in the same commit as the work it describes.

**Sources** use the source ids from the registry: `meditacao` means `https://www.sangriafalls.com/en/guias/meditacao/` (and its Portuguese and chat-only variants); `class-draekhar` means `/en/classes/draekhar/`. The full list with URLs is in [`research/sources.json`](../research/sources.json) and [`research/source-inventory.md`](../research/source-inventory.md). Open questions are numbered `Q-xxx` in [`research/open-questions.md`](../research/open-questions.md).

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
| 2 | Information architecture and article coverage matrix | Not started | This tracker is the seed of the coverage matrix |
| 3 | Site structure and reusable components | In progress | Done: Astro 7 + Starlight 0.43 scaffold, dark-default charcoal/crimson/gold theme, sidebar for all 18 sections (each with a "planned" overview page), frontmatter schema (status, lastVerified, sources, labels), Label, Sources, StatusNotice, SourceRegistry, About/Labels/Source registry pages, Pagefind, sitemap. To do: command block, class card, stat/cost tables, currency display, progression diagram, interface/chat tabs pattern, data validation, link checking. |
| 4 | Beginner walkthrough | Not started | |
| 5 | Progression, class and meditation guides | Not started | Class pages need translation from Portuguese |
| 6 | Economy, professions, pets, equipment | Not started | |
| 7 | Dungeons, events, endgame | Not started | |
| 8 | Calculators and interactive tools | Not started | |
| 9 | Source verification and QA | Not started | |
| 10 | Deployment and contribution readiness | Not started | Do not deploy until the user asks |

## A. Getting started

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| What is Sangria Falls? | primeiros-passos, home | sources found | — | — | — | |
| Sangria Falls vs vanilla V Rising | all guides (derived) | — | — | — | — | No official comparison; claims must each cite an SF guide |
| Sangria Falls vs Bloodcraft | all guides (derived) | — | — | — | — | No official comparison; must not assume Bloodcraft mechanics |
| How to join RPG 04 | primeiros-passos | sources found | — | — | — | Q-001, Q-002 |
| Server selection | — | — | — | — | — | Q-001 |
| Installing the custom interface | interface | sources found | — | — | — | Page is in Portuguese |
| Setting the language to English | primeiros-passos, painel-do-site | sources found | — | — | — | |
| Interface troubleshooting | interface | sources found | — | — | — | |
| Understanding the HUD | primeiros-passos, nivel-e-prestigio, atalhos | sources found | — | — | — | |
| The Path of Blood tutorial | classes, missoes, primeiros-passos | sources found | — | — | — | |
| Choosing your first class | classes, class pages, sala-de-treinamento | sources found | — | — | — | |
| Navigating Sangria Falls City | primeiros-passos, teleportes | sources found | — | — | — | |
| Teleport hubs | teleportes | sources found | — | — | — | |
| Important NPCs | all guides (compiled) | — | — | — | — | |
| Building your first castle | castelo | sources found | — | — | — | Castle basics are vanilla; mark which parts are SF-specific |
| First-day checklist | derived | — | — | — | — | |
| First-week roadmap | derived | — | — | — | — | |
| Common beginner mistakes | derived + guide warnings | — | — | — | — | |

## B. Progression walkthrough (stages 1–15)

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Stage 1: First login and tutorial | primeiros-passos, interface, missoes | sources found | — | — | — | |
| Stage 2: First class and starter equipment | classes, class pages | sources found | — | — | — | |
| Stage 3: Early levelling and bosses | nivel-e-prestigio, cacada-de-v-bloods, passe-de-batalha | sources found | — | — | — | |
| Stage 4: First professions and income | profissoes, coleta-…, oficios-…, contratos, mercador-sombrio | sources found | — | — | — | |
| Stage 5: Weapon mastery and blood lineage | maestria-de-arma, linhagem-de-sangue | sources found | — | — | — | |
| Stage 6: First pet | pets | sources found | — | — | — | |
| Stage 7: Character Prestige 1–10 | nivel-e-prestigio, meditacao | sources found | — | — | — | |
| Stage 8: Character Prestige 11–20 | nivel-e-prestigio, meditacao, auto-prestigio | sources found | — | — | — | |
| Stage 9: Class evolutions | classes, class pages | sources found | — | — | — | |
| Stage 10: Endgame gear | masmorras, oficios-… | sources found | — | — | — | Q-008 |
| Stage 11: Vampiric Schools | escolas | sources found | — | — | — | |
| Stage 12: Pulses and Transfusions | transfusao-e-plasmas | sources found | — | — | — | |
| Stage 13: Advanced equipment enhancement | oficios-…, servicos-de-profissao | sources found | — | — | — | |
| Stage 14: Master and Nightmare dungeons | masmorras, quadro-de-grupos | sources found | — | — | — | Q-006 |
| Stage 15: Endgame optimisation | derived | — | — | — | — | Q-009, Q-013 |

## C. Character progression

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Levels and experience | nivel-e-prestigio | sources found | — | — | — | Q-011 |
| Prestige system and cost table | nivel-e-prestigio | sources found | — | — | — | |
| Permanent prestige bonuses | nivel-e-prestigio | sources found | — | — | — | |
| Experience sources, penalties and multipliers | nivel-e-prestigio, meditacao, banco | sources found | — | — | — | Q-001 |
| Quitina (Chitin) | banco, postos-avancados, passe-de-batalha | sources found | — | — | — | |
| Beginner XP bonuses | banco, nivel-e-prestigio | sources found | — | — | — | Q-016 |
| Server XP events | nivel-e-prestigio, meditacao | sources found | — | — | — | |
| Weapon mastery and attributes | maestria-de-arma | sources found | — | — | — | |
| Blood lineage and attributes | linhagem-de-sangue | sources found | — | — | — | |
| Character statistics (profile) | perfil | sources found | — | — | — | |
| Damage, crit, speed, resistance, healing | perfil, class pages | sources found | — | — | — | Q-009 |

## D. Meditation and AFK progression

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Meditation guide (all subtopics) | meditacao, auto-prestigio, recompensa-online, vip, transfusao-e-plasmas | read | — | — | — | Q-010, Q-011 |
| Worked AFK examples (7 scenarios) | meditacao, nivel-e-prestigio, transfusao-e-plasmas | sources found | — | — | — | |

## E. Class encyclopedia

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Classes overview and comparison | classes, class hub | sources found | — | — | — | Portuguese source |
| Awakened (Despertado) | class-despertado | sources found | — | — | — | Portuguese source |
| Mortak | class-mortak | sources found | — | — | — | Portuguese source |
| Noctarin | class-noctarin | sources found | — | — | — | Portuguese source |
| Bastien | class-bastien | sources found | — | — | — | Portuguese source |
| Carmesyne | class-carmesyne | sources found | — | — | — | Portuguese source |
| Skarn | class-skarn | sources found | — | — | — | Portuguese source |
| Sepulkros | class-sepulkros, classes (Minion Collectors) | sources found | — | — | — | Portuguese source |
| Draekhar | class-draekhar | read | — | — | — | Q-004, Q-005 |
| Umbrellis | class-umbrellis | sources found | — | — | — | Portuguese source |
| Sangrael | class-sangrael | sources found | — | — | — | Portuguese source |
| La Muerte | class-lamuerte | sources found | — | — | — | Portuguese source |
| General | class-general | sources found | — | — | — | Portuguese source |
| Training Room | sala-de-treinamento | sources found | — | — | — | |

## F. Equipment and builds

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Weapon, armour and jewellery progression | masmorras, mercado, oficios-… | sources found | — | — | — | Q-008 |
| Dungeon weapons (rare, epic, legendary) and affinity | masmorras | sources found | — | — | — | |
| Fortification and refinement | oficios-ferreiro-alfaiate-encantador, servicos-de-profissao | sources found | — | — | — | |
| Perfect Gems | masmorras | sources found | — | — | — | |
| Spell jewels | — | — | — | — | — | Q-007 |
| Build archetypes (physical, magical, tank, healer, summoner, hybrid) | class pages | — | — | — | — | No testing data; community recommendations only |

## G. Pets, H. Sangrulhos

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Pets (capture, souls, tiers, levels, prestige, commands) | pets | read | — | — | — | |
| Crystal system | pets | sources found | — | — | — | |
| Pets vs class summons vs Sangrulhos | pets, sangrulhos, class pages | sources found | — | — | — | |
| Sangrulhos | sangrulhos | sources found | — | — | — | |

## I. Professions

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Professions overview and switching | profissoes | sources found | — | — | — | |
| Blacksmith, Tailor, Enchanter | oficios-ferreiro-alfaiate-encantador | sources found | — | — | — | |
| Miner, Fisher, Woodcutter (and comparison) | coleta-minerador-pescador-lenhador | sources found | — | — | — | Q-012 |
| Profession services | servicos-de-profissao | sources found | — | — | — | |
| Aquarium | aquario | sources found | — | — | — | |

## J. Economy and currencies

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Currencies (all five) | banco | sources found | — | — | — | |
| Bank and transaction history | banco | sources found | — | — | — | |
| Vault | cofre | sources found | — | — | — | |
| Player market and shops | mercado | sources found | — | — | — | |
| Contracts | contratos | sources found | — | — | — | |
| Shadow Merchant | mercador-sombrio | sources found | — | — | — | |
| Casino | cassino | sources found | — | — | — | |
| Online reward | recompensa-online | sources found | — | — | — | |
| Prisoner market | prisioneiros | sources found | — | — | — | |
| Income guides and example budgets | derived | — | — | — | — | |

## K. Dungeons, L. Events

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Dungeons (overview, keys, difficulties, loot) | masmorras | sources found | — | — | — | Q-006 |
| Each of the four dungeons | masmorras | sources found | — | — | — | Per-room mechanics not documented |
| Group board | quadro-de-grupos | sources found | — | — | — | |
| Illusory Arena | arena-ilusional | sources found | — | — | — | |
| Tower of the Immortals | torre-dos-imortais | sources found | — | — | — | |
| Reality Rupture | ruptura-da-realidade | sources found | — | — | — | Q-003 |
| Goreswine's Judgment | julgamento-de-goreswine | sources found | — | — | — | |
| Rift Incursions | incursoes | sources found | — | — | — | |
| V Blood Hunt | cacada-de-v-bloods | sources found | — | — | — | |

## M. Outposts and quests, N. Schools, O. Endgame

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Outposts | postos-avancados | sources found | — | — | — | |
| Quests | missoes | sources found | — | — | — | |
| The Lost Book and Nyxaris | livro-perdido | sources found | — | — | — | |
| Vampiric Schools | escolas | sources found | — | — | — | Q-003 |
| Pulses, Transfusions and Plasmas | transfusao-e-plasmas | sources found | — | — | — | Q-013 |
| Auto-Prestige | auto-prestigio | sources found | — | — | — | |

## P. Battle Pass, Q. VIP, R. World and community

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| Battle Pass | passe-de-batalha | sources found | — | — | — | |
| VIP and optional purchases | vip, home `/en/vip/` | sources found | — | — | — | No prices published (by design) |
| Castle helpers | castelo | sources found | — | — | — | |
| Furniture | moveis | sources found | — | — | — | |
| Clan | clan | sources found | — | — | — | |
| Marriage | casamento | sources found | — | — | — | |
| Mail | correio | sources found | — | — | — | |
| Rankings | rankings | sources found | — | — | — | |
| Achievements | conquistas | sources found | — | — | — | |
| Feats, Fame and titles | facanhas | sources found | — | — | — | |
| Profile | perfil | sources found | — | — | — | |
| Website panel | painel-do-site | sources found | — | — | — | |
| Community rules | — | — | — | — | — | Q-014 |

## S. Reference

| Article | Sources | Research | Writing | Verification | Implementation | Missing information |
|---|---|---|---|---|---|---|
| All player commands (309) | comandos | sources found | — | — | — | Portuguese descriptions; syntax stays literal |
| Interface shortcuts | atalhos | sources found | — | — | — | Portuguese source |
| NPC, item, currency, boss directories | all guides (compiled) | — | — | — | — | |
| Glossary (PT ↔ EN terms) | all guides | — | — | — | — | |
| Upgrade cost and drop-rate tables | nivel-e-prestigio, pets, masmorras, classes | sources found | — | — | — | |
| FAQ and troubleshooting | guide FAQ sections | — | — | — | — | |

## Interactive tools

| Tool | Sources for formulas | Research | Implementation | Missing information |
|---|---|---|---|---|
| Meditation calculator | meditacao, recompensa-online, vip | read | — | Q-010, Q-011 |
| Prestige calculator | nivel-e-prestigio | sources found | — | |
| Pulse and Transfusion calculator | transfusao-e-plasmas | sources found | — | |
| Profession income calculator | coleta-minerador-pescador-lenhador | sources found | — | Q-012 (user-supplied rates) |
| Class evolution calculator | classes | read | — | |
| Pet upgrade calculator | pets | read | — | |
| Dungeon key calculator | masmorras | sources found | — | |
| Build planner | class pages, perfil | — | — | Q-009: show computed stats only when stacking is verified |
