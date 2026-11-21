# Master prompt — Sangria Falls Wiki

> The user supplied this brief for the `sangria` project on 2026-11-22. It defines what the project is.

## Context from the user

Build an **English-first, unofficial Sangria Falls Wiki** for players who want to understand the server from their first login all the way to endgame. The official website currently has 49 guides. This wiki should go further than documenting individual systems: connect them into a complete progression walkthrough, explain what players should prioritize, and give practical builds and farming strategies.

Assumptions: the site is unofficial and maintained independently, and English is its primary language. RPG 04-specific mechanics that aren't publicly documented need confirmation from players or server staff.

### Recommended technology

| Component           | Technology        |
| ------------------- | ----------------- |
| Wiki framework      | Astro + Starlight |
| Article content     | Markdown / MDX    |
| Game mechanics data | JSON / YAML       |
| Styling             | CSS / Tailwind    |
| Calculators         | TypeScript        |
| Search              | Pagefind          |
| Version control     | GitHub            |
| Hosting             | Cloudflare Pages  |

Use a documentation framework rather than building everything from scratch. It makes maintaining hundreds of articles, updating mechanics and accepting community contributions much easier.

### What makes this wiki different

The official site mostly explains individual systems. This wiki should answer the questions players actually run into while progressing:

- What should I do next?
- Which upgrade makes me stronger?
- Which systems should I prioritize?
- How much currency do I need?
- Which class suits my playstyle?
- How long should I meditate?
- How do I prepare for Nightmare dungeons?
- What is worth farming?

Documentation explains how a system works. A walkthrough explains how to use that system well. This wiki should provide both.

---

## Master prompt

```
Act as a senior technical writer, MMORPG game systems analyst, experienced V Rising player, UX/UI designer, and full-stack web developer.

PROJECT NAME:
Sangria Falls Wiki

PROJECT OBJECTIVE:
Create a comprehensive, English-first, community-driven wiki and progression guide for Sangria Falls, a heavily customized MMORPG-style V Rising server.

The primary target is [GLOBAL] Sangria Falls [RPG 04] [2X], but the wiki should also be useful to players on other Sangria Falls servers wherever the mechanics are shared.

This must not simply be a copy or translation of the official documentation. It should explain how the systems work together, what players should prioritize, how to become stronger efficiently, and how to progress from a complete beginner to an optimized endgame character.

==================================================
1. RESEARCH AND SOURCE MATERIAL
==================================================

Primary sources:

Official website:
https://www.sangriafalls.com/en/

Complete English guide directory:
https://www.sangriafalls.com/en/guias/

Original Portuguese documentation:
https://www.sangriafalls.com/guias/

Class documentation:
https://www.sangriafalls.com/en/classes/

Interface installation:
https://www.sangriafalls.com/en/interface/

Community guides:
https://www.sangriafalls.com/en/guias/comunidade/

Research ALL available official guides, class pages, mechanics, tables, commands, updates and linked documentation.

Inspect the actual contents of each page, including tabs, expandable sections, interface instructions and chat-only instructions.

Use the Portuguese documentation to clarify missing or inconsistent English translations.

RESEARCH RULES:

- Do not invent mechanics, NPC locations, commands, prices, percentages or requirements.
- Do not assume vanilla V Rising or Bloodcraft mechanics apply to Sangria Falls.
- Distinguish official server mechanics from community recommendations.
- Distinguish global Sangria Falls mechanics from RPG 04-specific settings.
- Verify all calculations.
- Include source links on every relevant article.
- Include a last-verified date.
- Mark undocumented information as unverified.
- Do not fabricate DPS rankings or best-in-slot builds.
- Do not claim to have accessed private Discord channels unless access is actually available.
- Write original explanations rather than reproducing entire official articles.
- Maintain a list of unresolved questions requiring staff or community confirmation.

==================================================
2. TARGET AUDIENCE
==================================================

The wiki should accommodate:

- Complete V Rising beginners.
- Experienced vanilla V Rising players.
- Bloodcraft players migrating to Sangria Falls.
- Casual and solo players.
- Groups and clans.
- Free-to-play players.
- VIP players.
- Returning players.
- Endgame players optimizing their builds.

Use simple, natural English.

Explain unfamiliar terminology before using it extensively.

Every article should be understandable without requiring players to read several other pages first.

==================================================
3. COMPLETE WIKI STRUCTURE
==================================================

Create the following main categories and their corresponding subpages.

A. GETTING STARTED

- What is Sangria Falls?
- Sangria Falls vs Vanilla V Rising
- Sangria Falls vs Bloodcraft
- How to join RPG 04
- Server selection
- Installing the custom interface
- Setting the language to English
- Interface troubleshooting
- Understanding the HUD
- The Path of Blood tutorial
- Choosing your first class
- Navigating Sangria Falls City
- Teleport hubs
- Important NPCs
- Building your first castle
- First-day checklist
- First-week progression roadmap
- Common beginner mistakes

B. COMPLETE PROGRESSION WALKTHROUGH

Create a practical chronological walkthrough:

Stage 1: First login and tutorial
Stage 2: First class and starter equipment
Stage 3: Early leveling and boss progression
Stage 4: First professions and income
Stage 5: Weapon mastery and blood lineage
Stage 6: First pet and companion progression
Stage 7: Character Prestige 1-10
Stage 8: Character Prestige 11-20
Stage 9: Class evolutions
Stage 10: Endgame gear
Stage 11: Vampiric Schools
Stage 12: Pulses and Transfusions
Stage 13: Advanced equipment enhancement
Stage 14: Master and Nightmare dungeons
Stage 15: Endgame optimization

For every stage explain:

- Main objectives
- Prerequisites
- Exact steps
- Recommended equipment
- Recommended activities
- Relevant NPCs
- Currency requirements
- Expected rewards
- Common mistakes
- What to prioritize next
- What can safely be postponed

Do not treat this suggested order as a mandatory unlock sequence. Adapt it to the actual dependencies discovered during research.

C. CHARACTER PROGRESSION

- Character levels and experience
- Prestige system
- Complete prestige cost table
- Permanent prestige bonuses
- Experience sources
- XP penalties and multipliers
- Chitin/Quitina
- Beginner XP bonuses
- Server XP events
- Weapon mastery
- Weapon attributes
- Blood lineage
- Blood attributes
- Character statistics
- Damage scaling
- Physical vs magical damage
- Critical chance and critical damage
- Attack speed and ability speed
- Damage resistance
- Healing and life leech

Explain the difference between character progression and equipment progression.

D. MEDITATION AND AFK PROGRESSION

Create a particularly detailed section for meditation.

Cover:

- How meditation works
- How to unlock the Meditation Chamber
- How to enter and exit
- F10 interface
- Character meditation
- Weapon mastery meditation
- Bloodline meditation
- Pet meditation
- Single meditation
- Double Meditation
- How to enable and disable each track
- Sangricoin consumption
- XP gained per minute
- Normal vs VIP XP rates
- Server-wide XP multipliers
- Which XP buffs work in meditation
- Which XP buffs do not work
- Online reward income
- What happens when coins run out
- What happens at maximum level
- What happens without an active pet
- Automatic prestige
- Automatic Pulse
- Prestige target configuration
- Currency spending limits
- Recommended AFK settings
- Troubleshooting

Create detailed examples for:

- AFK leveling for beginners
- Overnight meditation
- Reaching character Prestige 20
- Maximizing weapon mastery
- Maximizing blood lineage
- Pet Prestige 20
- Farming Pulses

Clearly distinguish Sangricoin meditation costs from Ourosangue prestige costs.

E. CLASS ENCYCLOPEDIA

Create a dedicated page for all 11 classes:

1. Mortak
2. Noctarin
3. Bastien
4. Carmesyne
5. Skarn
6. Sepulkros
7. Draekhar
8. Umbrellis
9. Sangrael
10. La Muerte
11. General

Also explain the starting Awakened state.

Each class page must include:

- Class overview
- Combat role
- Playstyle
- Supported weapons
- Physical or magical scaling
- Basic attacks
- Modified Q and E abilities
- Passive abilities
- Base attributes
- Strengths and weaknesses
- Class unlock quest
- Class master and location
- Specializations and variants
- Evolution I, II and III
- Evolution requirements
- Evolution costs
- Cumulative bonuses
- Recommended weapon mastery attributes
- Recommended blood lineage attributes
- Suggested spells
- Suggested equipment
- Profession synergy
- School spell synergy
- Plasma recommendations
- Solo gameplay
- Group gameplay
- Dungeon gameplay
- Boss fighting
- Suggested combat rotations
- Beginner, intermediate and endgame builds

Pay particular attention to:

Draekhar:
Explain how a regular spear becomes a magical staff.
Document all six elemental Currents individually.

Sepulkros:
Explain the differences between Reaper and Summoner variants.
Document collectible minions, summon limits, minion scaling and Minion Collectors.

Sangrael:
Explain healing, resurrection and support mechanics.

La Muerte and General:
Explain all prerequisite classes and evolutions.

Create comparison tables to help players select a class according to their preferred playstyle.

Do not publish an objective class tier list without reliable testing data.

F. EQUIPMENT AND BUILDS

- Weapon progression
- Armor progression
- Jewelry progression
- Ancestral weapons
- Rare weapons
- Epic weapons
- Legendary weapons
- Unique weapon effects
- How to obtain legendary weapons
- Weapon affinity
- Equipment fortification
- Equipment refinement
- Refinement materials
- Spell jewels
- Perfect Gems
- Equipment upgrade priorities
- Physical DPS builds
- Magical DPS builds
- Tank builds
- Healer builds
- Summoner builds
- Hybrid builds

Explain which equipment bonuses actually benefit each class.

Separate confirmed Sangria Falls loot sources from vanilla V Rising loot sources that may have been disabled or modified.

G. PETS AND COMPANIONS

- How pets work
- How to capture bosses
- Pet capture probability
- Eligible and ineligible bosses
- Boss Souls
- Act Souls
- Pet levels
- Pet prestige
- Pet tiers
- Pet attributes
- Pet variants
- Pet damage scaling
- Pet meditation
- Pet commands
- Summoning and dismissing pets
- Pet management
- Recommended pets by role
- How to farm pet souls
- Pet upgrade priorities

CRYSTAL SYSTEM:

- Crystal acquisition
- Dungeon requirements
- Attribute selection
- Tier restrictions
- Upgrade limits
- Upgrade success rates
- Failed upgrade mechanics
- Reset costs
- Refunded crystals
- Recommended attribute combinations
- Total upgrade requirements

Explain the difference between pets, class summons and Sangrulhos.

H. SANGRULHOS

- Introduction
- Obtaining eggs
- Resonators
- Incubation
- Rarities
- Collection system
- Fusion
- Duplicate management
- Equipping Sangrulhos
- Attribute bonuses
- Recommended progression

I. PROFESSIONS

Explain all six professions individually.

Crafting:
- Blacksmith
- Tailor
- Enchanter

Gathering:
- Miner
- Fisher
- Woodcutter

For every profession include:

- How to unlock
- NPC and location
- Experience sources
- Level requirements
- Prestige requirements
- Prestige costs
- Bonuses per prestige
- Currency generation
- Additional materials
- Daily orders
- Special rewards
- Recommended farming routes

Also include:

- Profession switching
- Fortification
- Refinement
- Profession services
- Offline service sales
- Aquarium mechanics
- Gathering and crafting synergy

IMPORTANT:
Do not automatically describe Miner as the best gathering profession.

Compare gathering professions using:
- Income per gathering action
- Measured or estimated income per hour
- Resource availability
- Farming convenience
- Refinement materials
- Actual combat benefits

Explain that gathering professions primarily provide income and resources, while crafting professions directly enhance equipment.

J. ECONOMY AND CURRENCIES

Document every available server currency.

For each currency explain:

- What it is
- How to earn it
- Where to spend it
- How valuable it is
- Which activities provide it
- Recommended spending priorities

Include:

- Ourosangue
- Sangricoins
- Chitin/Quitina
- Crystals
- Other documented currencies
- Bank system
- Transaction history
- Vault
- Player marketplace
- Opening a shop
- Offline sales
- Shadow Merchant
- Selling raw materials
- Selling refined materials
- Contracts
- Player contracts
- Profession services
- Online rewards

Create farming guides for:

- Beginner income
- Daily income
- Weekly income
- Active farming
- Passive income
- Gathering profession income
- Selling surplus resources

Include example budgets for character prestige, class evolutions and Transfusions.

K. DUNGEONS

Create a comprehensive dungeon encyclopedia.

Cover all four documented dungeons:

- Sanctuary of Redemption
- Grove of Disenchantment
- Blood Dominion
- Corrupted Temple

Difficulty levels:

- Adventurer
- Veteran
- Master
- Nightmare

Explain:

- Dungeon unlock requirements
- Events Hub location
- Mark NPC
- Dungeon keys
- Key crafting recipes
- Party formation
- Group finder
- Party size
- Time limits
- Enemy scaling
- Difficulty modifiers
- Room mechanics
- Boss mechanics
- Death and revival
- Party wipes
- Inventory loss risks
- Friendly fire and PvP behavior
- Pet restrictions
- Class summon restrictions
- Reward distribution
- Weapon affinity
- Reward probabilities
- Reward mail
- Key material refunds

Loot encyclopedia:

- Legendary weapons
- Epic weapons
- Rare weapons
- Perfect Gems
- Crystals
- Resonators
- Minion Collectors
- Crafting materials

Create preparation guides for each difficulty.

Create recommended party compositions and explain the roles of tanks, healers, magical DPS and physical DPS.

If PvP or friendly-fire behavior is not documented, flag it for community verification instead of guessing.

L. EVENTS AND ACTIVITIES

Create individual walkthroughs for:

- Illusory Arena
- Tower of the Immortals
- Reality Ruptures
- Goreswine's Judgment
- Rift Incursions
- V Blood Hunt
- Group Board
- Other documented seasonal events

For each event include:

- Location
- Schedule and timezone
- Entry requirements
- Party size
- Encounter mechanics
- Difficulty
- Rewards
- Failure conditions
- Recommended strategies
- Progression prerequisites
- Relevant commands

M. OUTPOSTS AND QUESTS

- Every outpost and location
- Outpost commanders
- Daily missions
- Weekly missions
- Reputation ranks
- Reputation bonuses
- Specialized rewards
- Mission restrictions
- Main tutorial quest
- Class unlock quests
- Evolution quests
- Endgame quests
- The Lost Book
- Nyxaris and the laboratory
- Quest tracking
- How to find NPCs
- Troubleshooting quests

N. VAMPIRIC SCHOOLS

- How to unlock schools
- How to enroll
- Enrollment NPC
- School headquarters
- All four schools
- School ranks
- School points
- Daily missions
- School events
- School spells
- Spell tiers
- Spell cooldowns
- School bonuses
- Sunday bonuses
- Changing schools
- Recommended spells by class

Explain whether choosing a particular school changes combat power.

O. ENDGAME PROGRESSION

- Character Prestige 20
- Pulses
- Transfusions
- Plasmas
- Pulse requirements
- Pulse costs
- Automatic Pulse
- Transfusion costs
- VIP discounts
- Plasma allocation
- Plasma reset mechanics
- All available Plasma attributes
- Diminishing returns, if applicable
- Recommended Plasma investment by class
- Long-term progression
- Endgame optimization

Create clear examples showing how to calculate meditation costs for Pulses and how much Ourosangue is needed for Transfusions.

P. BATTLE PASS

- How Battle Pass works
- Free reward track
- Bloody reward track
- How to unlock Bloody Pass
- Seasonal progression
- Battle Pass experience
- Boss XP rewards
- Event XP rewards
- Reward claiming
- Retroactive premium rewards
- Season expiration
- Efficient Battle Pass farming

Do not invent donation prices.

Q. VIP AND OPTIONAL PURCHASES

- VIP benefits
- VIP duration
- Meditation bonuses
- Automatic prestige
- Automatic Pulse
- Double Meditation
- Bloody Battle Pass
- Available donation options
- Free vs VIP progression comparison

Clearly identify which systems require separate purchases.

Explain what free players can accomplish without spending real money.

R. WORLD AND COMMUNITY

- Castle systems
- Castle storage
- Castle search
- Castle building limits
- Furniture
- Teleportation
- Clan mechanics
- Prisoner market
- Marriage
- Mail
- Rankings
- Achievements
- Feats
- Fame
- Titles
- How to equip or hide titles
- Community rules
- Frequently asked questions

S. COMPLETE REFERENCE SECTION

- All keyboard shortcuts
- All player commands
- NPC directory
- Item directory
- Currency directory
- Boss directory
- Terminology glossary
- Upgrade cost tables
- Drop rate tables
- Progression requirements
- Server mechanics FAQ
- Troubleshooting encyclopedia

Include Portuguese command names and English descriptions.

Do not translate the literal syntax of commands.

==================================================
4. INTERACTIVE TOOLS AND CALCULATORS
==================================================

Create functional calculators with verified formulas.

1. Meditation Calculator

Inputs:
- Current Sangricoin balance
- Meditation type
- Current level
- Target level
- Current prestige
- Target prestige
- VIP status
- Server XP multiplier
- Single or double meditation
- Online rewards

Outputs:
- Available AFK duration
- Total experience gained
- Estimated progression
- Total Sangricoin cost
- Total Ourosangue cost
- Remaining balance

2. Prestige Calculator

Calculate the total currency required to reach a chosen prestige.

3. Pulse and Transfusion Calculator

Calculate:
- Additional Pulses
- Meditation duration
- Sangricoin requirements
- Transfusion requirements
- Ourosangue requirements
- Plasma rewards

4. Profession Income Calculator

Compare Miner, Fisher and Woodcutter using user-configurable farming rates.

5. Class Evolution Calculator

Calculate costs and prerequisites for individual classes and advanced class unlocks.

6. Pet Upgrade Calculator

Calculate:
- Required Boss Souls
- Required sacrifice souls
- Pet tier costs
- Crystal requirements
- Expected upgrade attempts where probabilities are verified

7. Dungeon Key Calculator

Calculate materials needed for a selected difficulty, party size and number of runs.

8. Build Planner

Allow users to configure:
- Class
- Evolution
- Weapon
- Equipment
- Weapon mastery
- Blood lineage
- Profession enhancements
- School spell
- Pet
- Sangrulho
- Plasma attributes

Display calculated attributes only when the underlying stacking rules are verified.

Do not invent XP curves, scaling formulas or probability tables to make calculators work.

==================================================
5. ARTICLE FORMAT
==================================================

Use a consistent structure for all articles:

- Page title
- Short explanation
- Quick facts
- Requirements
- How to unlock
- Step-by-step walkthrough
- Detailed mechanics
- Rewards and costs
- Recommended strategies
- Common mistakes
- Frequently asked questions
- Commands and shortcuts
- Related guides
- Official sources
- Last verified date

Include appropriate labels:

OFFICIALLY CONFIRMED
COMMUNITY RECOMMENDATION
RPG 04 SPECIFIC
REQUIRES VERIFICATION
VIP FEATURE
OPTIONAL PURCHASE

Use tables where they make information easier to understand.

Avoid unnecessary filler, repetition and overly technical language.

==================================================
6. WEBSITE DESIGN
==================================================

Create a polished, premium dark-fantasy wiki inspired by V Rising and gothic vampire aesthetics.

Visual direction:

- Dark charcoal backgrounds
- Deep crimson accents
- Muted gold highlights
- Subtle gothic borders
- Highly readable typography
- Fantasy-inspired headings
- Clean documentation layouts

The website should feel like a professional MMORPG encyclopedia, not a generic blog.

Required features:

- Responsive desktop and mobile layouts
- Persistent sidebar navigation
- Global search
- Searchable game mechanics
- Breadcrumb navigation
- Table of contents
- Collapsible categories
- Related article recommendations
- Copyable commands
- Interactive calculators
- Filterable comparison tables
- Progression checklists
- Class selection guide
- Dark mode by default
- Accessible contrast
- Clear keyboard navigation
- Direct links to article sections
- Discord-friendly article summaries

Do not use excessive animations or visual effects that reduce readability.

Use licensed, original or permission-granted game imagery.

==================================================
7. HOMEPAGE
==================================================

Create a homepage with the following sections:

WELCOME TO SANGRIA FALLS WIKI

Your complete guide from awakening to endgame.

Main navigation cards:

- Start Your Journey
- Complete Beginner Walkthrough
- Explore All Classes
- Character Progression
- Meditation Calculator
- Professions and Economy
- Gear and Legendary Weapons
- Pets and Summons
- Dungeons and Events
- Endgame Builds

Additional sections:

- New Player Roadmap
- Popular Guides
- Class Overview
- Essential Commands
- Latest Verified Updates
- Frequently Asked Questions

Include an obvious disclaimer that this is an unofficial community wiki and is not operated by Sangria Falls staff.

==================================================
8. TECHNICAL IMPLEMENTATION
==================================================

If building the actual website, use a documentation-first architecture.

Preferred stack:
- Astro with Starlight
- TypeScript
- Markdown and MDX
- Static site generation
- Client-side interactive calculators
- Local search indexing

If an existing project uses another suitable framework, preserve its architecture rather than unnecessarily replacing it.

Use reusable components for:
- Class cards
- Stat tables
- Requirements
- Currency displays
- Command blocks
- Source citations
- Warning notices
- Progression diagrams
- Calculators

Store verified game data separately from presentation components.

Use Markdown or MDX files for articles and structured JSON or YAML for reusable game data.

Make it easy for contributors to update mechanics without editing website components.

Include:
- README
- Local development instructions
- Deployment instructions
- Content contribution guide
- Source registry
- Data validation
- Broken link checking
- Version history
- Sitemap
- SEO metadata

Avoid unnecessary backend infrastructure.

==================================================
9. QUALITY ASSURANCE
==================================================

Before considering the wiki finished:

- Audit every official guide.
- Check every mechanic against its source.
- Validate every command.
- Verify all currency calculations.
- Check all internal and external links.
- Test calculators with multiple scenarios.
- Test mobile responsiveness.
- Verify navigation completeness.
- Check for duplicated or contradictory information.
- Identify outdated mechanics.
- Clearly label unverified content.
- Ensure all 11 classes have complete articles.

Do not present placeholder pages as finished content.

Do not claim completeness while major sections remain unwritten.

==================================================
10. EXECUTION PLAN
==================================================

Execute the project in the following order:

Phase 1:
Research and create a complete source inventory.

Phase 2:
Build the information architecture and article coverage matrix.

Phase 3:
Create the website structure and reusable components.

Phase 4:
Write the complete beginner walkthrough.

Phase 5:
Write all progression, class and meditation guides.

Phase 6:
Write economy, professions, pets and equipment guides.

Phase 7:
Write dungeon, event and endgame guides.

Phase 8:
Implement calculators and interactive reference tools.

Phase 9:
Complete source verification and quality assurance.

Phase 10:
Prepare the wiki for deployment and community contributions.

Maintain a persistent progress tracker showing:
- Article name
- Source links
- Research status
- Writing status
- Verification status
- Implementation status
- Missing information

Save completed work as you progress.

If output or context limits are encountered, continue through separate files and phases instead of compressing the remaining wiki into shallow summaries.

==================================================
FINAL INSTRUCTION
==================================================

Do not merely provide a proposal, sample homepage, outline or a few example articles.

Begin researching and creating the actual wiki.

The final result should be a comprehensive, interconnected Sangria Falls knowledge base containing practical guides, detailed walkthroughs, verified game mechanics, class builds, calculators and reference material.

Prioritize accuracy and usefulness over visual decoration.

A new player should be able to follow this wiki from their first login through advanced endgame without constantly needing to ask other players how the server works.
```
