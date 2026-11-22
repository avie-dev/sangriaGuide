// Dungeon key calculator. Published: each tier's forging recipe, fusions (5 Adventurer → 1 Veteran,
// 3 Veteran → 1 Master; Nightmare can't be fused), 1 key per player per run, a win returns 20% of
// the key's materials, and Rift Incursions pay 50 fragments per portal or gate (3 in a full rift).
import { k, type Constants } from './constants.ts';

export interface KeyTier {
	id: string;
	name: string;
	order: number;
	materials: { item: string; qty: number }[];
	fuseFrom: number | null;
}

export type Materials = Record<string, number>;

const add = (a: Materials, b: Materials, times = 1): Materials => {
	const out = { ...a };
	for (const [item, qty] of Object.entries(b)) out[item] = (out[item] ?? 0) + qty * times;
	return out;
};
const recipe = (t: KeyTier): Materials => Object.fromEntries(t.materials.map((m) => [m.item, m.qty]));

export interface KeyRoute {
	label: string;
	materials: Materials;
	/** Lower-tier keys forged along the way, by tier name. */
	keysForged: Record<string, number>;
}

/** Every way to make `count` keys of `tierId`: forging directly, or fusing from lower tiers. */
export function keyRoutes(tiers: KeyTier[], tierId: string, count: number): KeyRoute[] {
	const sorted = [...tiers].sort((a, b) => a.order - b.order);
	const i = sorted.findIndex((t) => t.id === tierId);
	if (i < 0) throw new Error(`Unknown key tier "${tierId}"`);
	const n = Math.max(0, Math.floor(count));
	const routes: KeyRoute[] = [];
	// Fuse down the chain as far as fusions allow: route d forges keys d tiers below and fuses up.
	let multiplier = 1;
	for (let d = 0; i - d >= 0; d++) {
		const base = sorted[i - d];
		const keys = n * multiplier;
		routes.push({
			label: d === 0 ? `Forge ${base.name} keys` : `Forge ${base.name} keys and fuse up`,
			materials: add({}, recipe(base), keys),
			keysForged: { [base.name]: keys },
		});
		const step = sorted[i - d].fuseFrom;
		if (step === null) break;
		multiplier *= step;
	}
	return routes;
}

export interface DungeonPlan {
	keysPerPlayer: number;
	keys: number;
	routes: KeyRoute[];
	/** Materials returned if every run is won (20% of each used key's direct recipe). */
	returnedIfAllWon: Materials;
	/** Full Rift Incursions needed for the shards of the cheapest-shard route, if any. */
	riftsForShards: { item: string; amount: number; fullRifts: number }[];
}

export function dungeonPlan(c: Constants, tiers: KeyTier[], tierId: string, runs: number, playersYouSupply: number): DungeonPlan {
	const maxP = k(c, 'dungeon-max-party');
	const players = Math.min(maxP, Math.max(1, Math.floor(playersYouSupply)));
	const keysPerPlayer = Math.max(0, Math.floor(runs));
	const keys = keysPerPlayer * players;
	const routes = keyRoutes(tiers, tierId, keys);
	const tier = tiers.find((t) => t.id === tierId)!;
	const ret = k(c, 'dungeon-material-return');
	const returned = Object.fromEntries(tier.materials.map((m) => [m.item, Math.floor(m.qty * ret * keys)]));
	return { keysPerPlayer, keys, routes, returnedIfAllWon: returned, riftsForShards: riftsFor(c, routes[0].materials) };
}

/** Full Rift Incursions (every portal and the gate) needed for the shards in a set of materials. */
export function riftsFor(c: Constants, materials: Materials): { item: string; amount: number; fullRifts: number }[] {
	const perRift = k(c, 'incursion-fragments-per-structure') * k(c, 'incursion-structures-per-rift');
	return Object.entries(materials)
		.filter(([item]) => /Stygian Shard/.test(item))
		.map(([item, amount]) => ({ item, amount, fullRifts: Math.ceil(amount / perRift) }));
}
