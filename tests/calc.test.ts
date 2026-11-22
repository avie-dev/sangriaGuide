// Calculator tests: several scenarios per calculator, checked against the official figures.
// Run with `npm test` (Node's built-in test runner; Node 22 runs TypeScript directly).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'yaml';
import { prestigeCost, prestigePlan } from '../src/lib/calc/prestige.ts';
import { simulateMeditation, onlineRewardValue, type MeditationInput } from '../src/lib/calc/meditation.ts';
import { pulsePlan } from '../src/lib/calc/pulses.ts';
import { payPerAction, gatheringIncome } from '../src/lib/calc/professions.ts';
import { tierCost, crystalPlan } from '../src/lib/calc/pets.ts';
import { keyRoutes, dungeonPlan, type KeyTier } from '../src/lib/calc/dungeons.ts';
import { classPlan, type ClassInfo } from '../src/lib/calc/classes.ts';

const read = (p: string) => parse(fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const C: Record<string, number> = Object.fromEntries(read('src/data/constants.yaml').map((e: { id: string; value: number }) => [e.id, e.value]));
const CHAPTERS: number[] = read('src/data/lost-book.yaml').map((e: { transfusion: number }) => e.transfusion);
const KEYS: KeyTier[] = read('src/data/dungeon-keys.yaml');
const details = JSON.parse(fs.readFileSync(new URL('../src/data/class-details.json', import.meta.url), 'utf8'));
const CLASSES: ClassInfo[] = read('src/data/classes.yaml').map((x: any) => ({
	id: x.id,
	name: x.name,
	tributes: (details[x.id]?.evolutions ?? []).map((e: { tribute: number }) => e.tribute),
	requires: x.requires ?? [],
	starting: x.starting,
}));

// ---------- Prestige ----------
test('prestige: all 20 is the published total', () => {
	// Exact even though the 18 middle prestiges' individual costs aren't published.
	assert.deepEqual(prestigeCost(C, 0, 20), { exact: 22760, min: 22760, max: 22760, unknown: 18 });
});
test('prestige: first and last are exact', () => {
	assert.equal(prestigeCost(C, 0, 1).exact, 75);
	assert.equal(prestigeCost(C, 19, 20).exact, 4467);
	assert.equal(prestigeCost(C, 5, 5).exact, 0);
});
test('prestige: free first prestige drops 75', () => {
	assert.equal(prestigeCost(C, 0, 20, true).exact, 22685);
	assert.equal(prestigeCost(C, 0, 1, true).exact, 0);
});
test('prestige: partial ranges give bounds that contain the truth', () => {
	const avg = 18218 / 18;
	const r = prestigeCost(C, 0, 10); // prestige 1 + the 9 lowest unpublished
	assert.equal(r.exact, null);
	assert.equal(r.unknown, 9);
	assert.equal(r.max, 75 + Math.floor(Math.min(9 * 4467, 18218 - 9 * 75, 9 * avg)));
	assert.equal(r.min, 75 + Math.ceil(Math.max(9 * 75, 18218 - 9 * 4467, 18 * avg - 9 * 4467)));
	assert.ok(r.min < r.max);
	// Any increasing sequence of 18 costs between 75 and 4,467 summing to 18,218 must fall inside the bounds.
	const samples = [
		Array.from({ length: 18 }, () => avg), // flat
		Array.from({ length: 18 }, (_, i) => 75 + (i * (2 * avg - 150)) / 17), // linear
		(() => { const g = Array.from({ length: 18 }, (_, i) => 1.24 ** i); const f = 18218 / g.reduce((a, b) => a + b); return g.map((x) => x * f); })(), // geometric
	];
	for (const seq of samples)
		for (let from = 0; from <= 20; from++)
			for (let to = from; to <= 20; to++) {
				let truth = 0;
				for (let p = from + 1; p <= to; p++) truth += p === 1 ? 75 : p === 20 ? 4467 : seq[p - 2];
				const b = prestigeCost(C, from, to);
				assert.ok(b.min <= Math.round(truth) + 1 && Math.round(truth) - 1 <= b.max, `${from}→${to}: ${truth} not in [${b.min}, ${b.max}]`);
			}
	// The cheap end is now tightly bounded: 0 → 6 can't exceed 75 + 5 × the average.
	assert.equal(prestigeCost(C, 0, 6).max, 75 + Math.floor(5 * avg));
});
test('prestige: plan sums three tracks', () => {
	const p = prestigePlan(C, { from: 0, to: 20 }, { from: 0, to: 20 }, { from: 0, to: 20 });
	assert.equal(p.total.exact, 22760 + 22685 + 22685);
	assert.throws(() => prestigeCost(C, 3, 2));
	assert.throws(() => prestigeCost(C, 0, 21));
});

// ---------- Meditation ----------
const base: MeditationInput = { balance: 21, paths: 1, vip: false, serverBonusPct: 0, minutes: null, onlineReward: false, streakDay: 1, onlineToday: 0, minutesToMidnight: null };
test('meditation: 21 Sangricoins buy exactly one hour on one path', () => {
	const r = simulateMeditation(C, base);
	assert.equal(r.minutes, 60);
	assert.equal(r.stoppedBecause, 'balance');
	assert.equal(r.sangricoinsSpent, 21);
	assert.deepEqual(r.xpPerPath, { single: 630000 });
});
test('meditation: VIP gives 945,000 per hour at the same cost', () => {
	const r = simulateMeditation(C, { ...base, vip: true });
	assert.deepEqual(r.xpPerPath, { single: 945000 });
	assert.equal(r.sangricoinsSpent, 21);
});
test('meditation: 8 hours cost 168 (336 double), as published', () => {
	assert.equal(simulateMeditation(C, { ...base, balance: 1000, minutes: 480 }).sangricoinsSpent, 168);
	assert.equal(simulateMeditation(C, { ...base, balance: 1000, minutes: 480, paths: 2 }).sangricoinsSpent, 336);
});
test('meditation: one climb is ~74 minutes', () => {
	const r = simulateMeditation(C, { ...base, balance: 1000, minutes: 74 });
	assert.ok('single' in r.climbs && Math.abs(r.climbs.single - 1) < 1e-9);
	assert.equal(r.climbXp, 777000);
});
test('meditation: VIP + server bonus is shown both ways', () => {
	const r = simulateMeditation(C, { ...base, balance: 1000, minutes: 60, vip: true, serverBonusPct: 100 });
	assert.ok('additive' in r.xpPerPath);
	if ('additive' in r.xpPerPath) {
		assert.equal(r.xpPerPath.additive, 60 * 10500 * 2.5);
		assert.equal(r.xpPerPath.multiplicative, 60 * 15750 * 2);
	}
});
test('meditation: below 0.35 nothing runs', () => {
	const r = simulateMeditation(C, { ...base, balance: 0.3 });
	assert.equal(r.minutes, 0);
	assert.equal(r.stoppedBecause, 'balance');
});
test('online reward: published examples', () => {
	assert.equal(onlineRewardValue(C, 1), 0.4);
	assert.equal(onlineRewardValue(C, 7), 0.7);
	assert.equal(onlineRewardValue(C, 30), 0.7);
	// 1 hour online on day 1: 3 rewards = 1.20 (official example)
	const day1 = simulateMeditation(C, { ...base, balance: 1000, minutes: 60, onlineReward: true });
	assert.equal(day1.onlineRewards, 3);
	assert.equal(day1.onlineRewardEarned, 1.2);
	// 2 hours with a 7-day streak: 7 rewards = 4.90 (official example)
	const day7 = simulateMeditation(C, { ...base, balance: 1000, minutes: 120, onlineReward: true, streakDay: 7 });
	assert.equal(day7.onlineRewards, 7);
	assert.equal(day7.onlineRewardEarned, 4.9);
});
test('online reward: time already online today counts', () => {
	// 40 minutes already online: the next reward comes at 45 (official example)
	const r = simulateMeditation(C, { ...base, balance: 1000, minutes: 5, onlineReward: true, onlineToday: 40 });
	assert.equal(r.onlineRewards, 1);
});
test('online reward: midnight resets the day', () => {
	// Start at 23:00 with 0 minutes today: 60 minutes to midnight, then 30 more after midnight.
	const r = simulateMeditation(C, { ...base, balance: 1000, minutes: 90, onlineReward: true, minutesToMidnight: 60 });
	// Before midnight: rewards at 30, 45, 60 (3 × 0.40); after: reward at 30 of the new day (streak 2: 0.45).
	assert.equal(r.onlineRewards, 4);
	assert.equal(r.onlineRewardEarned, 1.65);
});

// ---------- Pulses ----------
test('pulses: one transfusion from zero', () => {
	const r = pulsePlan(C, CHAPTERS, { transfusionsDone: 0, targetTransfusions: 1, storedPulses: 0, vip: false });
	assert.equal(r.pulsesNeeded, 10);
	assert.equal(r.ourosangue, 10000);
	assert.equal(r.plasmas, 10);
	assert.deepEqual(r.sealed, [1]);
	assert.equal(r.meditationMinutes, 740);
	assert.equal(r.meditationSangricoins, 259);
});
test('pulses: all 250 with VIP', () => {
	const r = pulsePlan(C, CHAPTERS, { transfusionsDone: 0, targetTransfusions: 250, storedPulses: 0, vip: true });
	assert.equal(r.ourosangue, 2000000);
	assert.equal(r.totalPlasmasAfter, 2500);
	assert.equal(r.sealed.length, 24); // transfusion 1 + 23 chapters
	assert.deepEqual(r.milestones.map((m) => m.at), [10, 30, 250]);
});
test('pulses: stored pulses and the 250 cap', () => {
	const r = pulsePlan(C, CHAPTERS, { transfusionsDone: 248, targetTransfusions: 400, storedPulses: 25, vip: false });
	assert.equal(r.transfusions, 2);
	assert.equal(r.pulsesNeeded, 0);
	assert.equal(r.pulsesLeftOver, 5);
	assert.deepEqual(r.sealed, [250]);
});

// ---------- Professions ----------
test('gathering: published pay at prestige 0 and 10', () => {
	assert.equal(payPerAction(C, 'miner', 0), 25);
	assert.equal(payPerAction(C, 'miner', 10), 50);
	assert.equal(payPerAction(C, 'fisher', 10), 175);
	assert.equal(payPerAction(C, 'woodcutter', 10), 20);
	assert.equal(payPerAction(C, 'woodcutter', 99), 20); // capped at prestige 10
});
test('gathering: hourly income uses the player’s own rate', () => {
	const r = gatheringIncome(C, 'fisher', 4, 30);
	assert.equal(r.payPerAction, 112);
	assert.equal(r.perHour, 3360);
	assert.match(r.extra, /\+2 fish/);
	assert.equal(gatheringIncome(C, 'miner', 3, 0).perHour, 0);
});

// ---------- Pets ----------
test('pets: T0 → T5 needs 5 own souls and 15 sacrificed', () => {
	const r = tierCost(C, 0, 5);
	assert.equal(r.ownSouls, 5);
	assert.equal(r.sacrificedSouls, 15);
	assert.deepEqual(tierCost(C, 2, 4).perTier.map((t) => t.sacrificedSouls), [2, 4]);
	assert.throws(() => tierCost(C, 4, 2));
});
test('pets: Cristais are capped by tier', () => {
	const r = crystalPlan(C, 3, [0, 2], [10, 6]);
	assert.equal(r.cap, 6);
	assert.deepEqual(r.targets, [6, 6]);
	assert.equal(r.cappedAttributes, 1);
	assert.equal(r.minimumCristais, 6 + 4);
	assert.equal(crystalPlan(C, 0, [0], [5]).minimumCristais, 0); // T0 can't evolve
	assert.throws(() => crystalPlan(C, 5, [], [1, 1, 1, 1, 1, 1]));
});

// ---------- Dungeons ----------
test('keys: direct and fusion routes', () => {
	const routes = keyRoutes(KEYS, 'master', 1);
	assert.equal(routes.length, 3); // Master, via 3 Veteran, via 15 Adventurer
	assert.deepEqual(routes[0].materials, { 'Greater Stygian Shard': 500, 'Dark Silver Ingot': 15 });
	assert.deepEqual(routes[1].materials, { 'Stygian Shard': 2250, 'Reinforced Plank': 60 });
	assert.deepEqual(routes[2].materials, { 'Stygian Shard': 7500, 'Copper Ingot': 2250 });
	assert.equal(keyRoutes(KEYS, 'nightmare', 2).length, 1); // no fusion into Nightmare
	assert.equal(keyRoutes(KEYS, 'adventurer', 4).length, 1);
});
test('keys: plan for a party, returns and rifts', () => {
	const p = dungeonPlan(C, KEYS, 'adventurer', 10, 4);
	assert.equal(p.keys, 40);
	assert.deepEqual(p.routes[0].materials, { 'Stygian Shard': 20000, 'Copper Ingot': 6000 });
	assert.deepEqual(p.returnedIfAllWon, { 'Stygian Shard': 4000, 'Copper Ingot': 1200 });
	assert.deepEqual(p.riftsForShards, [{ item: 'Stygian Shard', amount: 20000, fullRifts: 134 }]);
});

// ---------- Classes ----------
const none = Object.fromEntries(CLASSES.map((x) => [x.id, -1]));
test('classes: evolving your first class fully costs 90,000', () => {
	const r = classPlan(C, CLASSES, { ...none, mortak: 0 }, 'mortak', 'mortak', 3);
	assert.equal(r.tributes, 90000);
	assert.equal(r.switchCost, 0);
	assert.equal(r.unlocks, 0);
});
test('classes: General from scratch (with Mortak active at 0)', () => {
	const r = classPlan(C, CLASSES, { ...none, mortak: 0 }, 'mortak', 'general', 0);
	// Umbrellis II (45,000) + Mortak III (90,000) + Bastien III (90,000)
	assert.equal(r.tributes, 225000);
	assert.equal(r.unlocks, 3); // Umbrellis, Bastien, General
	assert.equal(r.switches, 0); // Mortak first (already active), then each unlock makes the next class active
	assert.equal(r.steps[0].class, 'mortak');
	assert.ok(r.steps.at(-1)!.class === 'general');
});
test('classes: La Muerte needs Draekhar III, Sepulkros III, Carmesyne II', () => {
	const r = classPlan(C, CLASSES, { ...none, noctarin: 1 }, 'noctarin', 'la-muerte', 1);
	assert.equal(r.tributes, 90000 + 90000 + 45000 + 15000);
	assert.equal(r.switchCost, 0);
});
test('classes: an owned but inactive class costs one switch', () => {
	const r = classPlan(C, CLASSES, { ...none, draekhar: 0, mortak: 0 }, 'mortak', 'sangrael', 0);
	assert.equal(r.tributes, 15000);
	assert.equal(r.switches, 1);
	assert.equal(r.total, 18000);
});
test('classes: already done means nothing to do', () => {
	const r = classPlan(C, CLASSES, { ...none, draekhar: 3 }, 'draekhar', 'draekhar', 2);
	assert.equal(r.steps.length, 0);
	assert.equal(r.total, 0);
});

// ---------- Build planner ----------
import { sumWithinSource, classBonus, classBonusOfficial, overlaps, unusedByClass, type ClassGroup } from '../src/lib/calc/build.ts';
test('build: within-source sums match the published class totals', () => {
	const mortak = details.mortak.attributes[1]; // Relentless: its published totals add up
	const group: ClassGroup = {
		name: 'Relentless',
		stages: ['Base', 'I', 'II', 'III'].map((st) => ({ stage: st, attrs: mortak.stages.find((s: any) => s.stage === st).attrs.map((a: any) => ({ name: a.name, value: a.flag ? '✓' : a.value })) })),
	};
	const total = Object.fromEntries(mortak.stages.find((s: any) => s.stage === 'Total').attrs.map((a: any) => [a.name, a.flag ? '✓' : a.value]));
	for (const a of classBonus(group, 3)) assert.equal(a.value, total[a.name], a.name);
	assert.deepEqual(classBonus(group, 0).find((a) => a.name === 'Poder Físico'), { name: 'Poder Físico', value: '+16' });
});
test('build: sums keep flat and percent apart, and flags stay flags', () => {
	const r = sumWithinSource([[{ name: 'Movement Speed', value: '+0.5' }], [{ name: 'Movement Speed', value: '+5%' }, { name: 'No Crit', value: '✓' }], [{ name: 'Movement Speed', value: '+0.5' }]]);
	assert.deepEqual(r, [{ name: 'Movement Speed', value: '+1' }, { name: 'Movement Speed', value: '+5%' }, { name: 'No Crit', value: '✓' }]);
});
test('build: overlaps are listed across sources, never summed', () => {
	const o = overlaps([
		{ source: 'Class', attrs: [{ name: 'Physical Power', value: '+20' }] },
		{ source: 'Prestige', attrs: [{ name: 'Physical Power', value: '+2' }, { name: 'Max Health', value: '+40' }] },
	]);
	assert.deepEqual(o, [{ name: 'Physical Power', from: [{ source: 'Class', value: '+20' }, { source: 'Prestige', value: '+2' }] }]);
});
test('build: flags stats the class does not use', () => {
	const cls = { id: 'x', name: 'X', groups: [], benefitsFrom: [], doesNotUse: ['Spell Power'], defaults: { mastery: [], blood: [] } };
	assert.deepEqual(unusedByClass(cls, [{ source: 'P', attrs: [{ name: 'Spell Power', value: '+2' }, { name: 'Spell Life Leech', value: '+4%' }] }]), ['Spell Power']);
});
test('build: Evolution III shows the official total and reports page inconsistencies', () => {
	const m = details.mortak.attributes[0]; // Unshakable: Max Health total +25%, grades add up to +26% (Q-018)
	const toAttrs = (st: any) => st.attrs.map((a: any) => ({ name: a.name, value: a.flag ? '✓' : a.value }));
	const group: ClassGroup = {
		name: 'Unshakable',
		stages: ['Base', 'I', 'II', 'III'].map((st) => ({ stage: st, attrs: toAttrs(m.stages.find((s: any) => s.stage === st)) })),
		total: toAttrs(m.stages.find((s: any) => s.stage === 'Total')),
	};
	const r = classBonusOfficial(group, 3);
	assert.equal(r.attrs.find((a) => a.name === 'Vida Máxima')!.value, '+25%');
	assert.deepEqual(r.mismatches, [{ name: 'Vida Máxima', published: '+25%', summed: '+26%' }]);
	assert.deepEqual(classBonusOfficial(group, 2).mismatches, []);
});
